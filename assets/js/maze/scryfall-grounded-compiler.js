import { DEFAULT_DICTIONARY } from "./scryfall-dictionary.js";

let activeGrounding = null;
let activeSemanticRegistry = null;
let activeDictionary = DEFAULT_DICTIONARY;

const COLOR_ORDER = ["w", "u", "b", "r", "g"];
const COLOR_NAMES = {
  w: "white",
  u: "blue",
  b: "black",
  r: "red",
  g: "green",
  c: "colorless"
};
const GLUE_WORDS = new Set([
  "a", "an", "all", "also", "and", "any", "are", "be", "but", "card", "cards",
  "deck", "decks", "don", "dont", "for", "from", "give", "gives", "have", "has",
  "in", "include", "includes", "including", "into", "is", "make", "me", "my", "no", "non", "not", "of", "or", "set",
  "sets", "that", "the", "to", "with", "without", "who", "which"
]);
const BLOCKED_FUZZY_TYPE_WORDS = new Set(["trigger", "triggers", "support", "payoff", "payoffs", "legal"]);
const REQUEST_WORDS = new Set(["all", "any", "show", "find", "search", "cards", "card"]);
const TOKEN_MAKER_VERBS = new Set([
  "create",
  "creates",
  "created",
  "creating",
  "make",
  "makes",
  "made",
  "making",
  "produce",
  "produces",
  "produced",
  "producing",
  "generate",
  "generates",
  "generated",
  "generating"
]);
const TYPE_CATALOG_PRIORITY = [
  "cardTypes",
  "supertypes",
  "creatureTypes",
  "artifactTypes",
  "enchantmentTypes",
  "landTypes",
  "planeswalkerTypes",
  "spellTypes"
];
const CATALOG_KIND_LABELS = {
  cardTypes: "type",
  supertypes: "type",
  creatureTypes: "type",
  artifactTypes: "type",
  enchantmentTypes: "type",
  landTypes: "type",
  planeswalkerTypes: "type",
  spellTypes: "type",
  keywordAbilities: "keyword",
  keywordActions: "keyword action",
  abilityWords: "ability word"
};
const MORPHOLOGY = new Map(Object.entries({
  cantrips: "cantrip",
  creates: "create",
  created: "create",
  creating: "create",
  dies: "die",
  died: "die",
  dying: "die",
  draws: "draw",
  drawing: "draw",
  drew: "draw",
  enters: "enter",
  entered: "enter",
  entering: "enter",
  flies: "flying",
  fly: "flying",
  mills: "mill",
  milled: "mill",
  milling: "mill",
  sacrifices: "sacrifice",
  sacrificed: "sacrifice",
  sacrificing: "sacrifice",
  tutors: "tutor",
  tutored: "tutor",
  tutoring: "tutor"
}));
const FIELD_NEGATION_ALLOWED = new Set([
  "type",
  "keyword",
  "oracle",
  "functional",
  "color",
  "identity",
  "format",
  "rarity",
  "predicate",
  "query"
]);
const CATEGORY_ORDER = [
  "explicit",
  "type",
  "identity",
  "color",
  "oracle",
  "keyword",
  "functional",
  "commander",
  "format",
  "rarity",
  "stats",
  "price",
  "artist",
  "language",
  "frame",
  "finish",
  "predicate",
  "query",
  "game",
  "set",
  "preference",
  "other"
];
const VM483_UMBRELLA_SET_FAMILIES = {
  marvel: {
    id: "vm483-marvel-umbrella",
    name: "Marvel umbrella product families",
    mainSetCode: "msh",
    setCodes: ["msh", "amsh", "msc", "tmsh", "spm", "spe", "aspm", "pspm", "tspm", "fmsc", "tmsc", "mar", "lmar", "omb"]
  },
  tarkir: {
    id: "vm483-tarkir-umbrella",
    name: "Tarkir umbrella product families",
    mainSetCode: "dtk",
    setCodes: ["dtk", "pdtk", "ptkdf", "tdtk", "ttdc", "tdm", "atdm", "ptdm", "tdc", "ttdm", "ytdm"]
  }
};
const ATTACK_WITH_TOKENS_BOUND_FRAGMENT = "o:/attack(s|ing)?[^.\\n]*token|token[^.\\n]*attack(s|ing)?/";

/**
 * Replaces the active local Scryfall grounding artifact used by the compiler.
 * @param {object|null} grounding - Parsed grounding artifact.
 */
export function setScryfallGrounding(grounding) {
  activeGrounding = grounding && grounding.schemaVersion ? grounding : null;
}

/**
 * Replaces the active curated Plain Reading semantics registry.
 * @param {object|null} registry - Parsed semantics registry.
 */
export function setPlainReadingSemanticRegistry(registry) {
  activeSemanticRegistry = registry && registry.schemaVersion === 1 ? normalizeSemanticRegistry(registry) : null;
}

/**
 * Replaces the seed-expanded parser dictionary used as migration data.
 * @param {object|null} dictionary - Seed-expanded parser dictionary.
 */
export function setPlainReadingDictionary(dictionary) {
  activeDictionary = dictionary || DEFAULT_DICTIONARY;
}

/**
 * Loads the checked-in grounding artifact from the app host.
 * @param {string} url - Root-relative or absolute artifact URL.
 * @returns {Promise<object>} Parsed grounding artifact.
 */
export async function loadScryfallGroundingFromUrl(url) {
  const response = await fetch(resolveArtifactUrl(url), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load Scryfall grounding artifact: ${response.status}`);
  }
  const grounding = await response.json();
  if (!grounding || grounding.schemaVersion !== 1) {
    throw new Error("Scryfall grounding artifact has an unsupported schema.");
  }
  return grounding;
}

/**
 * Loads the checked-in curated semantics registry from the app host.
 * @param {string} url - Root-relative or absolute registry URL.
 * @returns {Promise<object>} Parsed semantics registry.
 */
export async function loadPlainReadingSemanticRegistryFromUrl(url) {
  const response = await fetch(resolveArtifactUrl(url), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load Plain Reading semantics registry: ${response.status}`);
  }
  const registry = await response.json();
  if (!registry || registry.schemaVersion !== 1 || !Array.isArray(registry.entries)) {
    throw new Error("Plain Reading semantics registry has an unsupported schema.");
  }
  return registry;
}

/**
 * Normalizes a Plain Reading input string without destroying explicit syntax terms.
 * @param {string} input - Raw user input.
 * @returns {string} Normalized input.
 */
export function normalizePlainReadingInput(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, "\"")
    .replace(/&/g, " and ")
    .replace(/([a-z])[-\u2013\u2014]([a-z])/g, "$1 $2")
    .replace(/([a-z])\/([a-z])/g, "$1 $2")
    .replace(/\baso\b/g, "also")
    .replace(/\bcomandr\b/g, "commander")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Compiles Plain Reading input into deterministic Scryfall syntax.
 * @param {string} input - Natural-language search text.
 * @param {object} [options] - Optional compiler dependencies.
 * @param {object} [options.grounding] - Explicit grounding artifact for tests.
 * @param {object} [options.semanticRegistry] - Explicit semantic registry for tests.
 * @param {object} [options.dictionary] - Seed-expanded migration dictionary.
 * @param {object} [options.modeContext] - UI/product context for future routing.
 * @returns {object|null} Parser-compatible result, or null when no compiler data exists.
 */
export function compileGroundedScryfallQuery(input, options = {}) {
  const rawInput = String(input || "").trim();
  const normalizedInput = normalizePlainReadingInput(rawInput);
  const dictionary = options.dictionary || activeDictionary || DEFAULT_DICTIONARY;
  const grounding = options.grounding || activeGrounding;
  const semanticRegistry = normalizeSemanticRegistry(options.semanticRegistry || activeSemanticRegistry || { schemaVersion: 1, entries: [] });

  if (!normalizedInput) {
    const emptyModel = createQueryModel(rawInput, normalizedInput, dictionary, grounding, semanticRegistry, options.modeContext);
    emptyModel.confidence = 0.1;
    return finalizeGroundedResult(emptyModel, "");
  }

  if (!grounding && !dictionary && !semanticRegistry.entries.length) return null;

  const model = createQueryModel(rawInput, normalizedInput, dictionary, grounding, semanticRegistry, options.modeContext);
  detectExplicitSyntax(model);
  if (model.explicitSyntax.length && hasOnlyExplicitSyntaxAndGlue(model)) {
    model.confidence = 0.96;
    model.finalQuery = buildScryfallQuery(model);
    return finalizeGroundedResult(model, model.finalQuery);
  }

  detectFieldSearches(model);
  detectArtistName(model);
  detectTokenObjectIntent(model);
  resolveSetIntent(model);
  refineTokenObjectSetIntent(model);
  detectCommanderIntent(model);
  detectGenericCardPartnerOracleIntent(model);
  detectManaProduction(model);
  detectSemanticRegistry(model);
  detectDictionaryQueryPhrases(model);
  detectDictionaryOraclePhrases(model);
  detectFormats(model);
  detectRarity(model);
  detectPrices(model);
  detectSorting(model);
  resolveColorGrammar(model);
  detectGenericFourColorCommanderIntent(model);
  detectOracleNegation(model);
  resolveKeywordTerms(model, { allowFuzzy: false });
  resolveTypeLineTerms(model);
  resolveKeywordTerms(model);
  resolveKeywordActionsAndAbilityWords(model);
  detectManaValue(model);
  detectPowerToughness(model);
  groupSameFieldBooleanOr(model);
  resolveIgnoredGlue(model);
  model.unresolved.push(...detectUnresolvedTerms(model));
  materializePendingAlternatives(model);
  addSetAlternatives(model);
  addColorAlternatives(model);
  model.finalQuery = buildScryfallQuery(model) || "*";
  model.validationPlan = buildValidationPlan(model);
  model.confidence = scoreGroundedModel(model);
  return finalizeGroundedResult(model, model.finalQuery);
}

/**
 * Serializes a query model into readable Scryfall syntax.
 * @param {object} model - Grounded query model.
 * @param {object} [options] - Serialization options.
 * @param {Set<string>} [options.omitCategories] - Categories to omit.
 * @returns {string} Scryfall query string.
 */
export function buildScryfallQuery(model, options = {}) {
  const omitCategories = options.omitCategories || new Set();
  const clauses = model.clauses
    .filter((clause) => clause?.query && !clause.disabled && !omitCategories.has(clause.category))
    .sort((left, right) => CATEGORY_ORDER.indexOf(left.category) - CATEGORY_ORDER.indexOf(right.category) || left.order - right.order)
    .map((clause) => clause.query);
  return unique(clauses).join(" ").trim();
}

/**
 * Provides an inspectable plan surface for tests and UI work.
 * @param {object} model - Grounded query model.
 * @returns {object} Public explanation model.
 */
export function explainPlainReadingPlan(model) {
  return {
    rawInput: model.rawInput,
    normalizedInput: model.normalizedInput,
    tokens: model.tokens.map((token) => token.value),
    resolvedSpans: model.resolvedSpans.map((span) => ({ ...span })),
    expression: model.expression,
    slots: {
      typeLine: model.slots.typeLine.map((slot) => ({ ...slot })),
      colors: model.slots.colors.map((slot) => ({ ...slot })),
      oracle: model.slots.oracle.map((slot) => ({ ...slot })),
      keywords: model.slots.keywords.map((slot) => ({ ...slot })),
      sets: model.slots.sets.map((slot) => ({ ...slot })),
      formats: model.slots.formats.map((slot) => ({ ...slot }))
    },
    recognized: [...model.recognized],
    ignored: [...model.ignored],
    unresolved: [...model.unresolved],
    ambiguous: model.ambiguous.map(serializeAmbiguity),
    appliedDefaults: [...model.appliedDefaults],
    api: { ...model.api },
    warnings: [...model.warnings],
    confidence: model.confidence,
    alternatives: [...model.alternatives],
    validationPlan: model.validationPlan || { relaxations: [] },
    finalQuery: model.finalQuery
  };
}

function createQueryModel(rawInput, normalizedInput, dictionary, grounding, semanticRegistry, modeContext) {
  return {
    rawInput,
    normalizedInput,
    dictionary,
    grounding,
    semanticRegistry,
    modeContext: modeContext || {},
    tokens: tokenizeWithPositions(normalizedInput),
    explicitSyntax: [],
    clauses: [],
    slots: {
      typeLine: [],
      colors: [],
      oracle: [],
      keywords: [],
      sets: [],
      formats: [],
      metadata: []
    },
    expression: null,
    setCodes: [],
    setFamily: null,
    pendingSetAmbiguity: null,
    pendingSetFamilyAlternatives: [],
    commanderRole: "",
    commanderIdentityMode: "",
    tokenObjectIntent: false,
    recognized: [],
    ignored: [],
    appliedDefaults: [],
    assumptions: [],
    unresolved: [],
    ambiguous: [],
    warnings: [],
    alternatives: [],
    pendingAlternatives: [],
    resolvedSpans: [],
    consumed: [],
    api: { endpoint: "/cards/search", unique: "cards", order: "name" },
    confidence: 0.5,
    finalQuery: "",
    validationPlan: { relaxations: [] },
    suppressFormatDefault: true,
    orderCounter: 0
  };
}

function resolveArtifactUrl(url) {
  const value = String(url || "");
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  return `/${value.replace(/^\/+/, "")}`;
}

function normalizeSemanticRegistry(registry) {
  const source = registry && registry.schemaVersion === 1 ? registry : { schemaVersion: 1, entries: [] };
  return {
    ...source,
    entries: (source.entries || []).map((entry) => ({
      ...entry,
      normalizedTriggers: unique([...(entry.normalizedTriggers || []), ...(entry.triggers || []).map(normalizeAlias)]).filter(Boolean)
    }))
  };
}

function detectExplicitSyntax(model) {
  const pattern = /(^|\s)(-?[a-z][a-z0-9_-]*(?:(?:<=|>=|<|>|=)|:)(?:"[^"]+"|'[^']+'|\/[^/\s]+\/|\{[^}]+\}|[^\s)]+))/gi;
  for (const match of String(model.rawInput || "").matchAll(pattern)) {
    const term = match[2];
    if (!term || model.explicitSyntax.includes(term)) continue;
    model.explicitSyntax.push(term);
    addClause(model, term, {
      category: "explicit",
      kind: "explicit",
      field: inferExplicitField(term),
      source: "explicit",
      confidence: 0.98,
      rawSpan: term,
      normalizedSpan: normalizePlainReadingInput(term),
      recognized: `${term} -> explicit Scryfall syntax`
    });
  }
}

function inferExplicitField(term) {
  const match = String(term || "").match(/^-?([a-z][a-z0-9_-]*)/i);
  return match?.[1]?.toLowerCase() || "explicit";
}

function hasOnlyExplicitSyntaxAndGlue(model) {
  let residual = model.normalizedInput;
  model.explicitSyntax.forEach((term) => {
    residual = removeConsumedPhrase(residual, normalizePlainReadingInput(term));
  });
  return residual
    .replace(/[()"']/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => GLUE_WORDS.has(token));
}

function detectFieldSearches(model) {
  const original = model.rawInput;
  const fields = [
    {
      kind: "art",
      label: "artwork",
      re: /\b(?:art|artwork)\s*:?\s*(?:search\s+)?(?:for|with|of|depicting|showing)?\s+(.+)$/i,
      prefix: "art:"
    },
    {
      kind: "flavor",
      label: "flavor text",
      re: /\b(?:flavo[u]?r\s+text|flavo[u]?r|ft)\s*:?\s*(?:search\s+)?(?:for|with|that says|says)?\s+(.+)$/i,
      prefix: "ft:"
    },
    {
      kind: "artist",
      label: "artist",
      re: /\b(?:artist\s*:?\s*(?:is|by)?\s+|a\s*:\s*)(.+)$/i,
      prefix: "a:"
    },
    {
      kind: "set",
      label: "set",
      re: /\b(?:set\s*:?\s*|s\s*:\s*)([a-z0-9]{2,6})$/i,
      prefix: "s:",
      raw: true
    }
  ];

  for (const field of fields) {
    if (field.kind === "art" && (hasPhrase(model.normalizedInput, "alternate art") || hasPhrase(model.normalizedInput, "full art"))) continue;
    const match = original.match(field.re);
    if (!match?.[1]) continue;
    const value = cleanupFieldValue(match[1]);
    if (!value) continue;
    const query = field.raw ? `${field.prefix}${value.toLowerCase()}` : `${field.prefix}${quoteIfNeededPreserve(value)}`;
    addClause(model, query, {
      category: field.kind === "artist" ? "artist" : "query",
      kind: field.kind,
      field: field.kind,
      source: "explicit",
      confidence: 0.92,
      rawSpan: match[0],
      normalizedSpan: normalizePlainReadingInput(match[0]),
      recognized: `${field.label}: ${value}`
    });
    break;
  }
}

function detectArtistName(model) {
  const firstPrinting = model.rawInput.match(/\bfirst\s+printing\b.*\b(?:illustrated by|artist by|by)\s+([A-Za-z][A-Za-z .'-]+)$/i);
  if (firstPrinting?.[1]) {
    const artist = cleanupFieldValue(firstPrinting[1]);
    addClause(model, `a:${quoteIfNeededPreserve(artist)}`, {
      category: "artist",
      kind: "artist",
      field: "artist",
      source: "inferred",
      confidence: 0.9,
      rawSpan: firstPrinting[0],
      normalizedSpan: normalizePlainReadingInput(firstPrinting[0]),
      recognized: `artist: ${artist}`
    });
    addClause(model, "is:firstprinting", {
      category: "predicate",
      kind: "predicate",
      field: "is",
      source: "inferred",
      confidence: 0.88,
      rawSpan: "first printing",
      normalizedSpan: "first printing",
      recognized: "first printing -> is:firstprinting"
    });
    return;
  }

  const artist = model.rawInput.match(/\b(?:illustrated by|artist by|by)\s+([A-Za-z][A-Za-z .'-]+)$/i);
  if (!artist?.[1]) return;
  const value = cleanupFieldValue(artist[1]);
  addClause(model, `a:${quoteIfNeededPreserve(value)}`, {
    category: "artist",
    kind: "artist",
    field: "artist",
    source: "inferred",
    confidence: 0.88,
    rawSpan: artist[0],
    normalizedSpan: normalizePlainReadingInput(artist[0]),
    recognized: `artist: ${value}`
  });
}

function resolveSetIntent(model) {
  const text = model.normalizedInput;
  const grounding = model.grounding;
  if (!grounding) return;

  const allSets = text.match(/\ball\s+sets?\b/);
  if (allSets) {
    addRecognized(model, "all sets -> no set constraint");
    addIgnored(model, "all");
    addIgnored(model, "sets");
    consumePhrase(model, allSets[0], "glue", "ignored");
    return;
  }

  const patterns = [
    /\b(?:from|in|within)\s+(?:the\s+)?(.+?)\s+sets?\b/,
    /\b(?:from|in|within)\s+(?:the\s+)?([a-z0-9' ]{2,40})\b/
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match?.[1]) continue;
    const phrase = cleanupSetPhrase(match[1]);
    if (!phrase || isLikelyNonSetPhrase(phrase, model.dictionary)) continue;
    const resolution = resolveSetPhrase(phrase, grounding);
    if (!resolution) continue;
    consumePhrase(model, match[0], "set", resolution.kind);
    ["from", "in", "within", "the", "set", "sets"].forEach((word) => {
      if (hasPhrase(match[0], word)) addIgnored(model, word);
    });
    applySetResolution(model, resolution, phrase);
    return;
  }
}

function cleanupSetPhrase(value) {
  return normalizePlainReadingInput(value)
    .replace(/\b(the|a|an)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isLikelyFormatPhrase(phrase, dictionary) {
  const clean = normalizeAlias(phrase);
  return Boolean(dictionary?.formats?.[clean] || ["commander", "modern", "standard", "pioneer", "legacy", "vintage", "pauper", "brawl"].includes(clean));
}

function isLikelyNonSetPhrase(phrase, dictionary) {
  const clean = normalizeAlias(phrase);
  if (/^(?:all|any) colou?rs?$/.test(clean)) return true;
  if (/\bidentity\b/.test(clean)) return true;
  if (dictionary?.colors?.[clean]) return true;
  if (dictionary?.identities?.[clean]) return true;
  if (dictionary?.identityAliases?.[clean]) return true;
  return isLikelyFormatPhrase(phrase, dictionary);
}

function resolveSetPhrase(phrase, grounding) {
  const normalized = normalizeAlias(phrase);
  if (grounding.sets?.byCode?.[normalized]) {
    return { kind: "set", set: grounding.sets.byCode[normalized], matchLabel: phrase, source: "catalog", confidence: 0.98 };
  }

  const exactNamedSets = Object.values(grounding.sets?.byCode || {})
    .filter((set) => normalizeAlias(set.name) === normalized);
  if (exactNamedSets.length === 1) {
    return { kind: "set", set: exactNamedSets[0], matchLabel: phrase, source: "catalog", confidence: 0.96 };
  }

  const byName = grounding.sets?.byNormalizedName?.[normalized] || [];
  if (byName.length === 1 && grounding.sets?.byCode?.[byName[0]]) {
    return { kind: "set", set: grounding.sets.byCode[byName[0]], matchLabel: phrase, source: "catalog", confidence: 0.94 };
  }
  if (byName.length > 1) {
    return {
      kind: "ambiguous",
      phrase,
      families: uniqueBy(byName.map((code) => setToFamily(grounding.sets.byCode[code], grounding)).filter(Boolean), (family) => family.id),
      matchLabel: phrase,
      source: "catalog",
      confidence: 0.72
    };
  }

  const aliasCandidates = (grounding.aliases?.[normalized] || []).filter((candidate) => candidate.kind === "setFamily" || candidate.kind === "set");
  const familyCandidates = uniqueBy(aliasCandidates.filter((candidate) => candidate.kind === "setFamily"), (candidate) => candidate.id)
    .map((candidate) => grounding.setFamilies?.[candidate.id])
    .filter(Boolean);
  if (familyCandidates.length > 1) {
    return { kind: "ambiguous", phrase, families: familyCandidates, matchLabel: phrase, source: "set-family", confidence: 0.7 };
  }
  if (familyCandidates.length === 1) {
    return { kind: "setFamily", family: familyCandidates[0], matchLabel: phrase, source: "set-family", confidence: 0.95 };
  }

  const setCandidates = uniqueBy(aliasCandidates.filter((candidate) => candidate.kind === "set"), (candidate) => candidate.id)
    .map((candidate) => grounding.sets?.byCode?.[candidate.id])
    .filter(Boolean);
  if (setCandidates.length === 1) {
    return { kind: "set", set: setCandidates[0], matchLabel: phrase, source: "catalog", confidence: 0.94 };
  }
  if (setCandidates.length > 1) {
    return {
      kind: "ambiguous",
      phrase,
      families: uniqueBy(setCandidates.map((set) => setToFamily(set, grounding)).filter(Boolean), (family) => family.id),
      matchLabel: phrase,
      source: "catalog",
      confidence: 0.7
    };
  }

  const prefixFamilyCandidates = uniqueBy(Object.values(grounding.setFamilies || {})
    .filter((family) => (family.aliases || []).some((alias) => normalizeAlias(alias).startsWith(`${normalized} `)))
    .filter(Boolean), (family) => family.id);
  if (prefixFamilyCandidates.length === 1) {
    const family = prefixFamilyCandidates[0];
    const mainSet = grounding.sets?.byCode?.[family.mainSetCode];
    if (mainSet) return { kind: "set", set: mainSet, matchLabel: family.displayName || family.name, source: "fuzzy-set", confidence: 0.86 };
    return { kind: "setFamily", family, matchLabel: family.displayName || family.name, source: "fuzzy-set", confidence: 0.86 };
  }
  if (prefixFamilyCandidates.length > 1) {
    return { kind: "ambiguous", phrase, families: prefixFamilyCandidates, matchLabel: phrase, source: "fuzzy-set", confidence: 0.7 };
  }

  return fuzzyResolveSetPhrase(phrase, grounding);
}

function fuzzyResolveSetPhrase(phrase, grounding) {
  const needle = normalizeAlias(phrase);
  const candidates = [];
  Object.keys(grounding.sets?.byNormalizedName || {}).forEach((name) => {
    candidates.push({ kind: "setName", key: name });
  });
  Object.values(grounding.setFamilies || {}).forEach((family) => {
    (family.aliases || []).forEach((alias) => candidates.push({ kind: "familyAlias", key: alias, family }));
  });

  const ranked = candidates
    .map((candidate) => ({ ...candidate, score: similarity(needle, normalizeAlias(candidate.key)) }))
    .filter((candidate) => candidate.score >= 0.78)
    .sort((left, right) => right.score - left.score || left.key.localeCompare(right.key));

  if (!ranked.length) return null;
  const best = ranked[0];
  const second = ranked.find((candidate) => candidate.key !== best.key && !candidate.key.startsWith(`${best.key} `) && !best.key.startsWith(`${candidate.key} `));
  if (second && second.score > best.score - 0.05) return null;

  if (best.kind === "familyAlias") {
    return { kind: "setFamily", family: best.family, matchLabel: best.key, source: "fuzzy-set", confidence: Number(best.score.toFixed(2)) };
  }

  const codes = grounding.sets?.byNormalizedName?.[best.key] || [];
  if (codes.length === 1 && grounding.sets?.byCode?.[codes[0]]) {
    return { kind: "set", set: grounding.sets.byCode[codes[0]], matchLabel: best.key, source: "fuzzy-set", confidence: Number(best.score.toFixed(2)) };
  }
  if (codes.length > 1) {
    const exactMain = codes
      .map((code) => grounding.sets?.byCode?.[code])
      .find((set) => set && normalizeAlias(set.name) === best.key);
    if (exactMain) return { kind: "set", set: exactMain, matchLabel: best.key, source: "fuzzy-set", confidence: Number(best.score.toFixed(2)) };
    const families = uniqueBy(codes.map((code) => setToFamily(grounding.sets?.byCode?.[code], grounding)).filter(Boolean), (family) => family.id);
    if (families.length === 1) return { kind: "setFamily", family: families[0], matchLabel: best.key, source: "fuzzy-set", confidence: Number(best.score.toFixed(2)) };
  }
  return null;
}

function applySetResolution(model, resolution, phrase) {
  if (resolution.kind === "ambiguous") {
    const umbrella = scopedUmbrellaSetFamily(phrase, model, resolution);
    if (umbrella) {
      (resolution.families || []).forEach((family) => {
        model.pendingSetFamilyAlternatives.push({
          label: `Use ${family.name}`,
          setCodes: [...family.setCodes]
        });
      });
      applySetFamily(model, umbrella, phrase, { ...resolution, source: "vm483-umbrella-set", confidence: 0.9 });
      model.assumptions.push(`Interpreted ${phrase} set as the current ${umbrella.name}.`);
      return;
    }
    model.pendingSetAmbiguity = resolution;
    model.ambiguous.push({
      kind: "set-family",
      field: "set",
      blocking: true,
      rawSpan: `${phrase} set`,
      normalizedSpan: normalizeAlias(`${phrase} set`),
      message: `${phrase} set -> multiple set families`,
      choices: resolution.families.map((family) => ({
        id: family.id,
        label: `Use ${family.name}`,
        name: family.name,
        mainSetCode: family.mainSetCode,
        setCodes: [...family.setCodes]
      }))
    });
    model.warnings.push(`Maze could not choose one set family for "${phrase}". Pick a specific set family instead.`);
    return;
  }

  if (resolution.kind === "setFamily") {
    applySetFamily(model, resolution.family, phrase, resolution);
  } else if (resolution.kind === "set") {
    applySetCode(model, resolution.set, phrase, resolution);
  }
}

function scopedUmbrellaSetFamily(phrase, model, resolution) {
  const normalized = normalizeAlias(phrase);
  const umbrella = VM483_UMBRELLA_SET_FAMILIES[normalized];
  if (!umbrella) return null;
  const knownCodes = new Set(Object.keys(model.grounding?.sets?.byCode || {}).map((code) => code.toLowerCase()));
  const surfacedCodes = new Set((resolution.families || []).flatMap((family) => family.setCodes || []).map((code) => code.toLowerCase()));
  if (!umbrella.setCodes.every((code) => knownCodes.has(code.toLowerCase()) || surfacedCodes.has(code.toLowerCase()))) return null;
  return {
    ...umbrella,
    setCodes: [...umbrella.setCodes]
  };
}

function applySetFamily(model, family, phrase, resolution) {
  model.setFamily = {
    id: family.id,
    name: family.name,
    mainSetCode: family.mainSetCode,
    setCodes: [...family.setCodes]
  };
  model.setCodes = [...family.setCodes];
  model.slots.sets.push({ kind: "setFamily", value: family.id, label: family.name, setCodes: [...family.setCodes] });
  addClause(model, `(game:paper)`, {
    category: "game",
    kind: "game",
    field: "game",
    source: "inferred",
    confidence: 0.9,
    rawSpan: phrase,
    normalizedSpan: normalizeAlias(phrase),
    appliedDefault: "game:paper"
  });
  addClause(model, `(${family.setCodes.map((code) => `set:${code}`).join(" OR ")})`, {
    category: "set",
    kind: "setFamily",
    field: "set",
    source: resolution.source || "set-family",
    confidence: resolution.confidence || 0.95,
    rawSpan: phrase,
    normalizedSpan: normalizeAlias(phrase),
    recognized: `${phrase} set -> ${family.name}`,
    slot: "sets"
  });
  addRecognized(model, `${family.name} set family`);
  addClause(model, "prefer:best", {
    category: "preference",
    kind: "preference",
    field: "prefer",
    source: "inferred",
    confidence: 0.9,
    rawSpan: phrase,
    normalizedSpan: normalizeAlias(phrase),
    appliedDefault: "prefer:best"
  });
  if (resolution.matchLabel && normalizeAlias(resolution.matchLabel) !== normalizeAlias(phrase)) {
    model.assumptions.push(`Did you mean ${resolution.matchLabel}?`);
    addRecognized(model, `${phrase} -> ${resolution.matchLabel}`);
  }
}

function applySetCode(model, set, phrase, resolution) {
  model.setCodes = [set.code];
  model.slots.sets.push({ kind: "set", value: set.code, label: set.name, setCodes: [set.code] });
  addClause(model, `s:${set.code}`, {
    category: "set",
    kind: "set",
    field: "set",
    source: resolution.source || "catalog",
    confidence: resolution.confidence || 0.94,
    rawSpan: phrase,
    normalizedSpan: normalizeAlias(phrase),
    recognized: `${phrase} set -> ${set.name} (${set.code})`,
    slot: "sets"
  });
  if (resolution.matchLabel && normalizeAlias(resolution.matchLabel) !== normalizeAlias(phrase)) {
    model.assumptions.push(`Did you mean ${resolution.matchLabel}?`);
    addRecognized(model, `${phrase} -> ${resolution.matchLabel}`);
  }
  const family = setToFamily(set, model.grounding);
  if (family && family.setCodes?.length > 1) {
    model.pendingSetFamilyAlternatives.push({
      label: `Search the full ${family.name}`,
      setCodes: [...family.setCodes]
    });
  }
}

function setToFamily(set, grounding) {
  if (!set || !grounding?.setFamilies) return null;
  const familyId = set.parentSetCode || set.code;
  return grounding.setFamilies[familyId] || null;
}

function refineTokenObjectSetIntent(model) {
  if (!model.tokenObjectIntent || !model.grounding) return;

  refineTokenOnlySetAlternatives(model);
  if (!model.setCodes.length) return;

  const resolvedSets = model.setCodes
    .map((code) => model.grounding.sets?.byCode?.[code])
    .filter(Boolean);
  if (resolvedSets.length === 1 && resolvedSets[0].setType === "token") return;

  const tokenSetCodes = tokenSetCodesFor(model.setCodes, model.grounding);
  if (!tokenSetCodes.length) return;

  replaceSetClausesWithTokenSets(model, tokenSetCodes);
  refineTokenOnlySetAlternatives(model);
}

function tokenSetCodesFor(setCodes, grounding) {
  const setsByCode = grounding?.sets?.byCode || {};
  const allSets = Object.values(setsByCode);
  const tokenCodes = [];
  (setCodes || []).forEach((code) => {
    const set = setsByCode[code];
    if (!set) return;
    if (isTokenObjectSet(set)) addUnique(tokenCodes, set.code);
    allSets
      .filter((candidate) => isTokenObjectSet(candidate) && candidate.parentSetCode === set.code)
      .sort((left, right) => left.code.localeCompare(right.code))
      .forEach((candidate) => addUnique(tokenCodes, candidate.code));
  });
  return tokenCodes;
}

function isTokenObjectSet(set) {
  return set?.setType === "token" && !/substitute cards?/i.test(set.name || "");
}

function replaceSetClausesWithTokenSets(model, tokenSetCodes) {
  const activeSetClauses = model.clauses.filter((clause) => !clause.disabled && clause.category === "set");
  if (!activeSetClauses.length) return;
  const rawSpan = activeSetClauses[0].rawSpan || "token set";
  const normalizedSpan = activeSetClauses[0].normalizedSpan || normalizeAlias(rawSpan);
  const replaceFamilyDefaults = Boolean(model.setFamily);

  model.clauses = model.clauses.filter((clause) => {
    if (clause.category === "set") return false;
    if (!replaceFamilyDefaults) return true;
    return !(["game", "preference"].includes(clause.category) && clause.normalizedSpan === normalizedSpan);
  });
  model.resolvedSpans = model.resolvedSpans.filter((span) => {
    if (span.field === "set") return false;
    if (!replaceFamilyDefaults) return true;
    return !(["game", "prefer"].includes(span.field) && span.normalizedSpan === normalizedSpan);
  });
  model.slots.sets = [];
  model.setCodes = [...tokenSetCodes];
  if (model.setFamily) {
    model.setFamily = {
      ...model.setFamily,
      mainSetCode: tokenSetCodes[0],
      setCodes: [...tokenSetCodes]
    };
    model.appliedDefaults = model.appliedDefaults.filter((value) => !["game:paper", "prefer:best"].includes(value));
  }

  if (tokenSetCodes.length === 1) {
    const set = model.grounding.sets?.byCode?.[tokenSetCodes[0]];
    addClause(model, `s:${tokenSetCodes[0]}`, {
      category: "set",
      kind: "tokenSet",
      field: "set",
      source: "token-set-child",
      confidence: 0.95,
      rawSpan,
      normalizedSpan,
      recognized: `token object set -> ${set?.name || tokenSetCodes[0]} (${tokenSetCodes[0]})`,
      slot: "sets"
    });
    return;
  }

  addClause(model, "(game:paper)", {
    category: "game",
    kind: "game",
    field: "game",
    source: "inferred",
    confidence: 0.9,
    rawSpan,
    normalizedSpan,
    appliedDefault: "game:paper"
  });
  addClause(model, `(${tokenSetCodes.map((code) => `set:${code}`).join(" OR ")})`, {
    category: "set",
    kind: "tokenSetFamily",
    field: "set",
    source: "token-set-child",
    confidence: 0.94,
    rawSpan,
    normalizedSpan,
    recognized: `token object set -> ${tokenSetCodes.join(", ")}`,
    slot: "sets"
  });
  addClause(model, "prefer:best", {
    category: "preference",
    kind: "preference",
    field: "prefer",
    source: "inferred",
    confidence: 0.9,
    rawSpan,
    normalizedSpan,
    appliedDefault: "prefer:best"
  });
}

function refineTokenOnlySetAlternatives(model) {
  model.pendingSetFamilyAlternatives = (model.pendingSetFamilyAlternatives || [])
    .map((family) => {
      const tokenCodes = tokenSetCodesFor(family.setCodes, model.grounding);
      return tokenCodes.length ? { ...family, setCodes: tokenCodes } : family;
    })
    .filter((family) => family.setCodes.join("|") !== model.setCodes.join("|"));

  if (!model.pendingSetAmbiguity?.families?.length) return;
  model.pendingSetAmbiguity = {
    ...model.pendingSetAmbiguity,
    families: model.pendingSetAmbiguity.families.map((family) => {
      const tokenCodes = tokenSetCodesFor(family.setCodes, model.grounding);
      if (!tokenCodes.length) return family;
      return { ...family, mainSetCode: tokenCodes[0], setCodes: tokenCodes };
    })
  };
}

function detectCommanderIntent(model) {
  const text = model.normalizedInput;
  const candidatePhrases = [
    "can be commanders",
    "can be a commander",
    "commander cards",
    "commander card",
    "commander that",
    "commanders that",
    "commander with",
    "commanders with",
    "commander without",
    "commanders without",
    "is commander",
    "is a commander"
  ];
  const matchedPhrase = candidatePhrases.find((phrase) => hasPhrase(text, phrase)) || (/\bcommanders\b/.test(text) ? "commanders" : "");
  const candidate = Boolean(matchedPhrase);
  if (candidate) {
    model.commanderRole = "candidate";
    addClause(model, "is:commander", {
      category: "commander",
      kind: "commander",
      field: "is",
      source: "inferred",
      confidence: 0.94,
      rawSpan: matchedPhrase,
      normalizedSpan: matchedPhrase,
      recognized: `${matchedPhrase} -> is:commander legal:commander`
    });
    addClause(model, "legal:commander", {
      category: "format",
      kind: "legality",
      field: "legal",
      source: "inferred",
      confidence: 0.94,
      rawSpan: matchedPhrase,
      normalizedSpan: matchedPhrase,
      slot: "formats"
    });
    consumePhrase(model, matchedPhrase, "commander", "inferred");
    consumeCommanderLegalityPhrases(model);
    return;
  }

  const support = /\bfor\s+(?:my|a|an|your)\b(?=.{0,48}\bcommander\b)/.test(text)
    || /\b(?:commander\s+decks?|edh\s+decks?|brawl\s+decks?)\b/.test(text);
  if (support) {
    model.commanderRole = "support";
    addClause(model, "legal:commander", {
      category: "format",
      kind: "legality",
      field: "legal",
      source: "inferred",
      confidence: 0.9,
      rawSpan: "commander deck",
      normalizedSpan: "commander deck",
      recognized: "commander deck -> legal:commander",
      slot: "formats"
    });
    ["for my", "for a", "for an", "for your", "commander deck", "commander decks", "edh deck", "edh decks", "brawl deck", "brawl decks"].forEach((phrase) => {
      if (hasPhrase(text, phrase)) consumePhrase(model, phrase, "commander", "inferred");
    });
  }

  if (/\blegal\s+in\s+commander\b/.test(text) || /\bcommander\s+legal\b/.test(text)) {
    if (model.tokenObjectIntent) {
      model.warnings.push("Token objects are not Commander deck-legal cards; Maze kept token-object intent and did not add commander legality.");
    } else {
      addClause(model, "legal:commander", {
        category: "format",
        kind: "legality",
        field: "legal",
        source: "inferred",
        confidence: 0.92,
        rawSpan: "legal in commander",
        normalizedSpan: "legal in commander",
        recognized: "legal in commander -> legal:commander",
        slot: "formats"
      });
    }
    consumeCommanderLegalityPhrases(model);
  }
}

function consumeCommanderLegalityPhrases(model) {
  ["legal in commander", "commander legal"].forEach((phrase) => {
    if (hasPhrase(model.normalizedInput, phrase)) consumePhrase(model, phrase, "format", "inferred");
  });
}

function detectGenericCardPartnerOracleIntent(model) {
  if (model.commanderRole || /\bpartner\s+with\b/.test(model.normalizedInput)) return;
  const match = model.normalizedInput.match(/\bcards?\s+with\s+partner\b/);
  if (!match) return;
  addClause(model, "o:partner", {
    category: "oracle",
    kind: "oracle",
    field: "oracle",
    source: "inferred",
    confidence: 0.9,
    rawSpan: match[0],
    normalizedSpan: normalizeAlias(match[0]),
    recognized: `${match[0]} -> o:partner`,
    slot: "oracle"
  });
}

function detectTokenObjectIntent(model) {
  const tokenObjectPhrase = ["token objects", "token object", "token cards", "token card", "token prints", "token print"]
    .find((phrase) => hasPhrase(model.normalizedInput, phrase) && !isConsumed(model, phrase));
  if (tokenObjectPhrase) {
    addGenericTokenObjectClause(model, tokenObjectPhrase);
    return;
  }

  for (let index = 0; index < model.tokens.length - 1; index += 1) {
    const subtypeToken = model.tokens[index];
    const tokenToken = model.tokens[index + 1];
    if (subtypeToken.consumed || tokenToken.consumed || tokenToken.value !== "tokens") continue;
    if (isTokenMakerContext(model, index)) continue;
    const resolution = resolveTypeAlias(subtypeToken.value, model.grounding, model.dictionary);
    if (!resolution) continue;
    addTokenObjectClauses(model, `${subtypeToken.value} tokens`, resolution.value, resolution.source, resolution.confidence);
    return;
  }

  const subtypeEntries = Object.entries(model.dictionary.subtypes || {})
    .sort((left, right) => right[0].length - left[0].length);

  for (const [subtypePhrase, query] of subtypeEntries) {
    const phrase = `${subtypePhrase} tokens`;
    if (!hasPhrase(model.normalizedInput, phrase) || isConsumed(model, phrase)) continue;
    const subtypeValue = extractTypeValue(query);
    if (!subtypeValue) continue;
    addTokenObjectClauses(model, phrase, subtypeValue, "registry", 0.9);
    return;
  }
}

function isTokenMakerContext(model, subtypeIndex) {
  const start = Math.max(0, subtypeIndex - 3);
  return model.tokens
    .slice(start, subtypeIndex + 1)
    .some((token) => TOKEN_MAKER_VERBS.has(token.value) || TOKEN_MAKER_VERBS.has(lemmatize(token.value)));
}

function addGenericTokenObjectClause(model, phrase) {
  model.tokenObjectIntent = true;
  addClause(model, "type:token", {
    category: "type",
    kind: "typeLine",
    field: "type",
    source: "inferred",
    confidence: 0.9,
    rawSpan: phrase,
    normalizedSpan: normalizeAlias(phrase),
    recognized: `${phrase} -> type:token`,
    slot: "typeLine"
  });
  consumePhrase(model, phrase, "typeLine", "inferred");
}

function addTokenObjectClauses(model, phrase, subtypeValue, source, confidence) {
  const subtypeQuery = `type:${quoteIfNeeded(normalizeScryfallTerm(subtypeValue))}`;
  model.tokenObjectIntent = true;
  addClause(model, subtypeQuery, {
    category: "type",
    kind: "typeLine",
    field: "type",
    source,
    confidence,
    rawSpan: phrase,
    normalizedSpan: normalizeAlias(phrase),
    recognized: `${phrase} -> ${subtypeQuery}`,
    slot: "typeLine"
  });
  addClause(model, "type:token", {
    category: "type",
    kind: "typeLine",
    field: "type",
    source: "inferred",
    confidence,
    rawSpan: phrase,
    normalizedSpan: normalizeAlias(phrase),
    recognized: `${phrase} -> type:token`,
    slot: "typeLine"
  });
}

function detectManaProduction(model) {
  const text = model.normalizedInput;
  const colorWords = Object.keys(model.dictionary.colors || {}).filter((word) => word !== "colorless");
  const colorPattern = colorWords.join("|");
  const colorMatch = text.match(new RegExp(`\\bproduces\\s+((?:(?:${colorPattern})\\s*(?:and\\s*)?)+)\\s+mana\\b`));
  if (colorMatch?.[1]) {
    const colors = colorWords
      .filter((word) => hasPhrase(colorMatch[1], word))
      .map((word) => model.dictionary.colors[word])
      .join("");
    if (colors) {
      addClause(model, `produces:${sortColors(colors)}`, {
        category: "query",
        kind: "mana",
        field: "produces",
        source: "inferred",
        confidence: 0.9,
        rawSpan: colorMatch[0],
        normalizedSpan: normalizeAlias(colorMatch[0]),
        recognized: "mana production"
      });
      return;
    }
  }

  const symbolMatch = text.match(/\bproduces\s+([wubrgc]{1,5})\s+mana\b/);
  if (symbolMatch?.[1]) {
    addClause(model, `produces:${sortColors(symbolMatch[1]) || symbolMatch[1]}`, {
      category: "query",
      kind: "mana",
      field: "produces",
      source: "inferred",
      confidence: 0.9,
      rawSpan: symbolMatch[0],
      normalizedSpan: normalizeAlias(symbolMatch[0]),
      recognized: "mana production"
    });
    return;
  }

  if (/\bproduces\s+mana\b/.test(text)) {
    addClause(model, "produces:any", {
      category: "query",
      kind: "mana",
      field: "produces",
      source: "inferred",
      confidence: 0.88,
      rawSpan: "produces mana",
      normalizedSpan: "produces mana",
      recognized: "mana production"
    });
  }
}

function detectSemanticRegistry(model) {
  const entries = [...(model.semanticRegistry.entries || [])]
    .sort((left, right) => longestListItem(right.normalizedTriggers) - longestListItem(left.normalizedTriggers));
  for (const entry of entries) {
    const trigger = findTrigger(model, entry.normalizedTriggers || []);
    if (!trigger) continue;
    addRegistryEntry(model, entry, trigger);
  }
}

function addRegistryEntry(model, entry, trigger) {
  const negated = isNegatedPhrase(model.normalizedInput, trigger);
  const hasNegatedFragments = negated && Array.isArray(entry.negatedFragments) && entry.negatedFragments.length;
  const fragments = registryFragmentsForEntry(entry, { negated, hasNegatedFragments });
  if (!fragments.length) return;
  const category = categoryForRegistryKind(entry.kind, fragments[0]);
  const confidence = Number.isFinite(entry.confidence) ? entry.confidence : 0.78;
  const clauseFragments = negated && !hasNegatedFragments ? fragments.map(negateQueryFragment) : fragments;
  const addedClauses = [];
  if (entry.operator === "OR" && fragments.length > 1 && !negated) {
    const clause = addClause(model, `(${fragments.join(" OR ")})`, {
      category,
      kind: entry.kind || "registry",
      field: category,
      source: "registry",
      confidence,
      rawSpan: trigger,
      normalizedSpan: normalizeAlias(trigger),
      recognized: `${trigger} -> ${fragments.join(" OR ")}`,
      slot: slotForCategory(category)
    });
    if (clause) addedClauses.push(clause);
  } else {
    clauseFragments.forEach((fragment) => {
      const cleanFragment = fragment.replace(/^-/, "");
      const fragmentCategory = categoryForRegistryKind(entry.kind, cleanFragment);
      const clause = addClause(model, fragment, {
        category: fragmentCategory,
        kind: entry.kind || "registry",
        field: fragmentCategory,
        source: "registry",
        confidence,
        polarity: negated ? "exclude" : undefined,
        rawSpan: trigger,
        normalizedSpan: normalizeAlias(trigger),
        recognized: `${trigger} -> ${fragment}`,
        slot: slotForCategory(fragmentCategory)
      });
      if (clause) addedClauses.push(clause);
    });
  }
  consumePhrase(model, trigger, entry.kind || "registry", "registry");
  const replaceOrders = addedClauses.map((clause) => clause.order);
  (entry.alternatives || []).forEach((alternative) => {
    if (alternative?.query && !negated) {
      queueAlternativeReplacement(model, {
        label: alternative.label || entry.label || "Alternative",
        query: alternative.query,
        replaceOrders
      });
    }
  });
  if (/counter/.test(entry.id || "") && trigger === "counter") {
    model.warnings.push("Counters can mean +1/+1 counters, counters of any kind, or counterspells; Maze used broad Oracle text and kept alternatives available.");
  }
}

function registryFragmentsForEntry(entry, { negated = false, hasNegatedFragments = false } = {}) {
  if (!negated && entry.id === "attack-with-tokens") return [ATTACK_WITH_TOKENS_BOUND_FRAGMENT];
  return unique(hasNegatedFragments ? entry.negatedFragments : entry.fragments || []);
}

function detectDictionaryQueryPhrases(model) {
  const entries = [...(model.dictionary.queryPhrases || [])]
    .sort((left, right) => longestTriggerLength(right) - longestTriggerLength(left));
  for (const entry of entries) {
    const trigger = findTrigger(model, entry.triggers || []);
    if (!trigger) continue;
    const query = normalizeDictionaryQuery(entry.query, model);
    addRecognized(model, entry.label ? `filter: ${entry.label}` : `filter: ${trigger}`);
    addFragmentClauses(model, query, {
      category: categoryFromQuery(query),
      kind: "query",
      field: categoryFromQuery(query),
      source: "registry",
      confidence: 0.78,
      rawSpan: trigger,
      normalizedSpan: normalizeAlias(trigger),
      recognized: entry.label ? `filter: ${entry.label}` : `filter: ${trigger}`
    });
    consumePhrase(model, trigger, "query", "registry");
  }
}

function detectDictionaryOraclePhrases(model) {
  const matches = [];
  const seenTriggers = new Set();
  [...(model.dictionary.oraclePhrases || [])]
    .sort((left, right) => longestTriggerLength(right) - longestTriggerLength(left))
    .forEach((entry) => {
      const trigger = findTrigger(model, entry.triggers || []);
      if (!trigger) return;
      if ([...seenTriggers].some((seen) => seen.includes(trigger))) return;
      seenTriggers.add(trigger);
      matches.push({ ...entry, trigger });
    });

  if (!matches.length) return;
  const shouldGroupAsOr = /\b(or|also any|but also|either)\b/.test(model.normalizedInput) && matches.length > 1;
  if (shouldGroupAsOr) {
    const group = `(${unique(matches.map((match) => match.query)).join(" OR ")})`;
    addClause(model, group, {
      category: "oracle",
      kind: "oracle",
      field: "oracle",
      source: "registry",
      confidence: 0.8,
      rawSpan: matches.map((match) => match.trigger).join(" "),
      normalizedSpan: matches.map((match) => normalizeAlias(match.trigger)).join(" "),
      recognized: "oracle alternatives",
      slot: "oracle"
    });
    model.assumptions.push("Grouped multiple text intents with OR because the request used alternate wording.");
    matches.forEach((match) => {
      addRecognized(model, `text: ${match.label}`);
      consumePhrase(model, match.trigger, "oracle", "registry");
    });
    return;
  }

  matches.forEach((match) => {
    const clauses = addFragmentClauses(model, match.query, {
      category: categoryFromQuery(match.query),
      kind: "oracle",
      field: "oracle",
      source: "registry",
      confidence: 0.8,
      rawSpan: match.trigger,
      normalizedSpan: normalizeAlias(match.trigger),
      recognized: `text: ${match.label}`,
      slot: "oracle"
    });
    consumePhrase(model, match.trigger, "oracle", "registry");
    addFunctionalAlternative(model, match, clauses.map((clause) => clause.order));
  });
}

function detectFormats(model) {
  Object.entries(model.dictionary.formats || {})
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([phrase, query]) => {
      if (!hasPhrase(model.normalizedInput, phrase) || isConsumed(model, phrase)) return;
      const normalizedQuery = phrase === "commander" || phrase === "edh" ? "legal:commander" : query;
      addFragmentClauses(model, normalizedQuery, {
        category: "format",
        kind: "format",
        field: "format",
        source: "registry",
        confidence: 0.84,
        rawSpan: phrase,
        normalizedSpan: normalizeAlias(phrase),
        recognized: normalizedQuery === "legal:commander" ? "format: commander legal" : `format: ${phrase}`,
        slot: "formats"
      });
      consumePhrase(model, phrase, "format", "registry");
    });
}

function detectRarity(model) {
  Object.entries(model.dictionary.rarities || {})
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([phrase, query]) => {
      if (!hasPhrase(model.normalizedInput, phrase) || isConsumed(model, phrase)) return;
      addClause(model, query, {
        category: "rarity",
        kind: "rarity",
        field: "rarity",
        source: "registry",
        confidence: 0.86,
        rawSpan: phrase,
        normalizedSpan: normalizeAlias(phrase),
        recognized: `rarity: ${phrase}`
      });
    });
}

function detectPrices(model) {
  const text = model.normalizedInput;
  const tix = text.match(/\b(?:under|less than|below)\s*(\d+)\s+tix\b/);
  if (tix) {
    addClause(model, `tix<=${tix[1]}`, {
      category: "price",
      kind: "price",
      field: "tix",
      source: "inferred",
      confidence: 0.88,
      rawSpan: tix[0],
      normalizedSpan: normalizeAlias(tix[0]),
      recognized: `tix <= ${tix[1]}`
    });
    return;
  }

  const dollar = text.match(/\b(?:under|less than|below)\s*\$?(\d+)\s*(?:dollars?|usd|bucks)\b|\b(?:under|less than|below)\s*\$(\d+)\b/);
  if (dollar) {
    const amount = dollar[1] || dollar[2];
    addClause(model, `usd<=${amount}`, {
      category: "price",
      kind: "price",
      field: "usd",
      source: "inferred",
      confidence: 0.88,
      rawSpan: dollar[0],
      normalizedSpan: normalizeAlias(dollar[0]),
      recognized: `price <= $${amount}`
    });
    return;
  }

  const maxDollar = text.match(/\b\$?(\d+)\s*(?:dollars?|usd|bucks)\s*(?:or less|or cheaper|and under)?\b|\$(\d+)\s*(?:or less|or cheaper|and under)\b/);
  if (maxDollar && /\b(?:dollars?|usd|bucks|\$)/.test(maxDollar[0])) {
    const amount = maxDollar[1] || maxDollar[2];
    addClause(model, `usd<=${amount}`, {
      category: "price",
      kind: "price",
      field: "usd",
      source: "inferred",
      confidence: 0.86,
      rawSpan: maxDollar[0],
      normalizedSpan: normalizeAlias(maxDollar[0]),
      recognized: `price <= $${amount}`
    });
    return;
  }

  Object.entries(model.dictionary.pricePhrases || {})
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([phrase, query]) => {
      if (!hasPhrase(model.normalizedInput, phrase) || isConsumed(model, phrase)) return;
      addClause(model, query, {
        category: "price",
        kind: "price",
        field: "price",
        source: "registry",
        confidence: 0.76,
        rawSpan: phrase,
        normalizedSpan: normalizeAlias(phrase),
        recognized: `price: ${phrase}`
      });
    });
}

function detectSorting(model) {
  Object.entries(model.dictionary.sorting || {})
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([phrase, query]) => {
      if (!hasPhrase(model.normalizedInput, phrase) || isConsumed(model, phrase)) return;
      applyApiMetadata(model, parseApiMetadataFromQueryFragment(query));
      addRecognized(model, `sort: ${phrase}`);
      consumePhrase(model, phrase, "sorting", "registry");
    });
}

function resolveColorGrammar(model) {
  const text = model.normalizedInput;
  const dictionary = model.dictionary;
  const allColors = text.match(/\ball\s+colou?rs?\b/);
  if (allColors && !isConsumed(model, allColors[0])) {
    addRecognized(model, "all colors -> no color constraint");
    consumePhrase(model, allColors[0], "color", "inferred");
  }
  const commanderColorMode = resolveCommanderColorMode(model);
  model.commanderIdentityMode = commanderColorMode;
  const exactColorIntent = hasExactColorIntent(text);
  const colorMap = dictionary.colors || DEFAULT_DICTIONARY.colors;
  const positives = [];
  const negatives = [];

  const identityMatch = resolveIdentityAlias(model, commanderColorMode, exactColorIntent);
  if (identityMatch) {
    identityMatch.colors.split("").forEach((symbol) => addUnique(positives, symbol));
  }

  const colorWords = Object.keys(colorMap);
  colorWords.forEach((word) => {
    const negatedColor = isNegatedColorPhrase(text, word);
    const forceColorlessCommanderIdentity = word === "colorless" && hasColorlessCommanderIdentityIntent(text);
    if ((isConsumed(model, word) && !negatedColor && !forceColorlessCommanderIdentity) || isProtectionTargetColor(text, word)) return;
    const present = hasPhrase(text, word) || fuzzyTokenPresent(model, word, 0.79);
    if (!present) return;
    const symbol = colorMap[word];
    if (negatedColor) {
      addUnique(negatives, symbol);
      consumePhrase(model, present.rawSpan || word, "color", "catalog");
      return;
    }
    if (word === "colorless") {
      const colorlessQuery = commanderColorMode === "fit" || commanderColorMode === "exact" ? "id:c" : "c:c";
      const colorlessCategory = colorlessQuery.startsWith("id") ? "identity" : "color";
      addClause(model, colorlessQuery, {
          category: colorlessCategory,
          kind: colorlessCategory,
          field: colorlessCategory === "identity" ? "id" : "c",
          source: present.source || "catalog",
          confidence: present.confidence || 0.86,
          rawSpan: present.rawSpan || word,
          normalizedSpan: normalizeAlias(present.rawSpan || word),
          recognized: `colorless -> ${colorlessQuery}`,
          slot: "colors"
      });
      consumePhrase(model, present.rawSpan || word, "color", present.source || "catalog");
      return;
    }
    addUnique(positives, symbol);
    consumePhrase(model, present.rawSpan || word, "color", present.source || "catalog");
  });

  const shorthand = detectColorSymbolShorthand(model);
  if (shorthand) {
    shorthand.colors.split("").forEach((symbol) => addUnique(positives, symbol));
    consumePhrase(model, shorthand.rawSpan, "color", "catalog");
  }

  const sortedPositive = sortColors(positives.join(""));
  if (sortedPositive && !hasColorClause(model, sortedPositive)) {
    let colorOp = colorOperatorForMode(identityMatch?.mode || commanderColorMode, exactColorIntent, text, model.dictionary);
    if (!commanderColorMode && hasCommanderLegalityText(text) && hasActualCardTypeIntent(model)) {
      if (identityMatch && sortedPositive.length > 1 && colorOp === "c:") colorOp = "c<=";
      if (!identityMatch && sortedPositive.length === 1 && colorOp === "c:") colorOp = "c=";
    }
    const category = colorOp.startsWith("id") ? "identity" : "color";
    addClause(model, `${colorOp}${sortedPositive}`, {
      category,
      kind: category,
      field: colorOp.replace(/[<>=:]/g, ""),
      source: identityMatch?.source || "catalog",
      confidence: identityMatch?.confidence || 0.88,
      rawSpan: identityMatch?.rawSpan || sortedPositive.split("").map(colorName).join(" "),
      normalizedSpan: identityMatch?.normalizedSpan || sortedPositive.split("").map(colorName).join(" "),
      recognized: `${sortedPositive.split("").map(colorName).join(" ")} -> ${colorOp}${sortedPositive}`,
      slot: "colors"
    });
    if (exactColorIntent && !colorOp.startsWith("id")) {
      ["only", "exactly", "just", "no other color", "no other colors"].forEach((phrase) => {
        if (hasPhrase(text, phrase)) consumePhrase(model, phrase, "color", "inferred");
      });
      model.assumptions.push("Interpreted the color phrase as exact card colors because the request said only/exactly.");
    } else if (colorOp === "id=" && hasPhrase(text, "mono")) {
      consumePhrase(model, "mono", "identity", "inferred");
    } else if (positives.length > 1 && !colorOp.startsWith("id") && !hasColorPoolIntentForColors(text, model.dictionary)) {
      model.assumptions.push("Interpreted multiple color words as cards containing every listed color.");
    }
    if (colorOp.startsWith("id")) {
      ["color identity", "identity", "include", "includes", "including"].forEach((phrase) => {
        if (hasPhrase(text, phrase)) consumePhrase(model, phrase, "identity", "inferred");
      });
    }
  }

  negatives.forEach((symbol) => {
    addClause(model, `-c:${symbol}`, {
      category: "color",
      kind: "color",
      field: "c",
      source: "catalog",
      confidence: 0.86,
      polarity: "exclude",
      rawSpan: `not ${colorName(symbol)}`,
      normalizedSpan: `not ${colorName(symbol)}`,
      recognized: `not ${colorName(symbol)} -> -c:${symbol}`,
      slot: "colors"
    });
  });

  if (sortedPositive) {
    consumePhrase(model, "all 3", "color", "inferred");
    consumePhrase(model, "all three", "color", "inferred");
  }
}

function resolveIdentityAlias(model, commanderColorMode, exactColorIntent) {
  const dictionary = model.dictionary;
  const aliases = [];
  Object.entries(dictionary.identityAliases || {}).forEach(([alias, key]) => {
    const identity = dictionary.identities?.[key];
    if (identity) aliases.push({ alias, key, identity });
  });
  Object.entries(dictionary.identities || {}).forEach(([key, identity]) => {
    aliases.push({ alias: key, key, identity });
  });
  aliases.sort((left, right) => {
    const colorCountDelta = sortColors(right.identity.colors).length - sortColors(left.identity.colors).length;
    return colorCountDelta || right.alias.length - left.alias.length;
  });

  for (const candidate of aliases) {
    if (!hasPhrase(model.normalizedInput, candidate.alias) || isConsumed(model, candidate.alias)) continue;
    const colors = sortColors(candidate.identity.colors);
    const mode = identityModeForAlias(model, commanderColorMode);
    let op = colorOperatorForMode(mode, exactColorIntent, model.normalizedInput, model.dictionary);
    const useActualCardColorPool = shouldUseNamedMulticolorActualCardPool(model, colors, mode, exactColorIntent);
    if (useActualCardColorPool) {
      op = "c<=";
    } else if (!commanderColorMode && !mode && colors.length > 1 && op === "c:" && hasCommanderLegalityText(model.normalizedInput) && hasActualCardTypeIntent(model)) {
      op = "c<=";
    }
    const category = op.startsWith("id") ? "identity" : "color";
    addClause(model, `${op}${colors}`, {
      category,
      kind: category,
      field: op.replace(/[<>=:]/g, ""),
      source: "registry",
      confidence: 0.9,
      rawSpan: candidate.alias,
      normalizedSpan: normalizeAlias(candidate.alias),
      recognized: `${candidate.identity.label} identity -> ${op}${colors}`,
      slot: "colors"
    });
    if (useActualCardColorPool) {
      addClause(model, "-c:c", {
        category: "color",
        kind: "color",
        field: "c",
        source: "inferred",
        confidence: 0.9,
        polarity: "exclude",
        rawSpan: candidate.alias,
        normalizedSpan: normalizeAlias(candidate.alias),
        recognized: `${candidate.identity.label} actual-card pool excludes colorless cards`,
        slot: "colors"
      });
    }
    consumePhrase(model, candidate.alias, "identity", "registry");
    consumeEquivalentIdentityAliases(model, candidate);
    candidate.alias.split(/\s+/).forEach((word) => {
      if (dictionary.colors?.[word]) consumePhrase(model, word, "color", "registry");
    });
    if (exactColorIntent && !op.startsWith("id")) {
      ["only", "exactly", "just", "no other color", "no other colors"].forEach((phrase) => {
        if (hasPhrase(model.normalizedInput, phrase)) consumePhrase(model, phrase, "color", "inferred");
      });
      model.assumptions.push("Interpreted the color phrase as exact card colors because the request said only/exactly.");
    }
    if (op.startsWith("id")) {
      ["color identity", "identity", "include", "includes", "including"].forEach((phrase) => {
        if (hasPhrase(model.normalizedInput, phrase)) consumePhrase(model, phrase, "identity", "inferred");
      });
    }
    if (mode) model.commanderIdentityMode = mode;
    return { colors, rawSpan: candidate.alias, normalizedSpan: normalizeAlias(candidate.alias), source: "registry", confidence: 0.9, mode };
  }
  return null;
}

function shouldUseNamedMulticolorActualCardPool(model, colors, mode, exactColorIntent) {
  return colors.length > 1
    && !model.tokenObjectIntent
    && !model.commanderRole
    && !mode
    && !exactColorIntent
    && hasActualCardTypeIntent(model);
}

function detectGenericFourColorCommanderIntent(model) {
  const text = model.normalizedInput;
  if (model.commanderRole !== "candidate" || !hasGenericFourColorCommanderIntent(text)) return;

  consumeGenericFourColorPhrases(model);
  if (hasIdentityClause(model)) return;

  addClause(model, "id=4", {
    category: "identity",
    kind: "identity",
    field: "id",
    source: "inferred",
    confidence: 0.9,
    rawSpan: "four color commanders",
    normalizedSpan: "four color commanders",
    recognized: "four color commanders -> id=4",
    slot: "colors"
  });
}

function hasGenericFourColorCommanderIntent(text) {
  return /\b(?:four|4)\s+colou?rs?\b.*\bcommanders?\b/.test(text)
    || /\bcommanders?\b.*\b(?:four|4)\s+colou?rs?\b/.test(text);
}

function consumeGenericFourColorPhrases(model) {
  [
    "four color",
    "four colors",
    "four colour",
    "four colours",
    "4 color",
    "4 colors",
    "4 colour",
    "4 colours"
  ].forEach((phrase) => {
    if (hasPhrase(model.normalizedInput, phrase)) consumePhrase(model, phrase, "identity", "inferred");
  });
}

function hasIdentityClause(model) {
  return model.clauses.some((clause) => !clause.disabled && clause.category === "identity" && /^id[<>=:]?/.test(clause.query));
}

function consumeEquivalentIdentityAliases(model, candidate) {
  const dictionary = model.dictionary || {};
  const aliases = [
    ...Object.entries(dictionary.identityAliases || {})
      .filter(([, key]) => key === candidate.key)
      .map(([alias]) => alias),
    ...Object.entries(dictionary.identities || {})
      .filter(([key, identity]) => key === candidate.key || sortColors(identity.colors) === sortColors(candidate.identity.colors))
      .map(([key]) => key)
  ];
  aliases
    .filter((alias) => alias !== candidate.alias && hasPhrase(model.normalizedInput, alias))
    .forEach((alias) => consumePhrase(model, alias, "identity", "registry"));
}

function hasActualCardTypeIntent(model) {
  if (model.tokenObjectIntent) return true;
  return model.tokens.some((token) => {
    if (token.consumed) return false;
    return Boolean(resolveTypeAlias(token.value, model.grounding, model.dictionary));
  });
}

function resolveTypeLineTerms(model) {
  const grounding = model.grounding;
  const dictionary = model.dictionary;
  const tokens = model.tokens;
  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].consumed) continue;
    for (let size = Math.min(6, tokens.length - index); size >= 1; size -= 1) {
      const window = tokens.slice(index, index + size);
      if (window.some((token) => token.consumed)) continue;
      const phrase = window.map((token) => token.value).join(" ");
      if (shouldSkipTypePhrase(phrase)) continue;
      const resolution = resolveTypeAlias(phrase, grounding, dictionary);
      if (!resolution) continue;
      const polarity = isNegatedPhrase(model.normalizedInput, phrase) ? "exclude" : "include";
      const query = `${polarity === "exclude" ? "-" : ""}type:${quoteIfNeeded(normalizeScryfallTerm(resolution.value))}`;
      addClause(model, query, {
        category: "type",
        kind: "typeLine",
        field: "type",
        source: resolution.source,
        confidence: resolution.confidence,
        polarity,
        rawSpan: phrase,
        normalizedSpan: normalizeAlias(phrase),
        recognized: `${phrase} -> ${query}`,
        slot: "typeLine"
      });
      markTokenWindowConsumed(model, index, size, "typeLine", resolution.source);
      break;
    }
  }
}

function shouldSkipTypePhrase(phrase) {
  const clean = normalizeAlias(phrase);
  if (!clean || GLUE_WORDS.has(clean)) return true;
  if (BLOCKED_FUZZY_TYPE_WORDS.has(clean)) return true;
  if (clean === "card" || clean === "cards") return true;
  if (/^\d+$/.test(clean)) return true;
  return false;
}

function resolveTypeAlias(phrase, grounding, dictionary) {
  const variants = phraseVariants(phrase);
  const exact = [];
  variants.forEach((variant) => {
    (grounding?.aliases?.[variant] || [])
      .filter((candidate) => candidate.kind === "typeLine")
      .forEach((candidate) => exact.push(candidate));
  });
  if (exact.length) {
    const candidate = exact.sort((left, right) => TYPE_CATALOG_PRIORITY.indexOf(left.catalog) - TYPE_CATALOG_PRIORITY.indexOf(right.catalog))[0];
    return { value: candidate.value, catalog: candidate.catalog, source: "catalog", confidence: 0.94 };
  }

  const dictQuery = dictionaryLookup(dictionary.types, variants) || dictionaryLookup(dictionary.subtypes, variants);
  if (dictQuery) {
    const value = extractTypeValue(dictQuery.query);
    if (value) return { value, catalog: "dictionary", source: "registry", confidence: 0.84 };
  }

  const fuzzyAllowed = normalizeAlias(phrase).split(/\s+/).length <= 2 && !normalizeAlias(phrase).split(/\s+/).some((token) => GLUE_WORDS.has(token));
  const fuzzy = fuzzyAllowed ? fuzzyResolveAlias(phrase, grounding, "typeLine", normalizeAlias(phrase).length >= 6 ? 0.75 : 0.84) : null;
  if (fuzzy) return fuzzy;
  return null;
}

function resolveKeywordTerms(model, options = {}) {
  const grounding = model.grounding;
  const dictionary = model.dictionary;
  const tokens = model.tokens;
  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].consumed) continue;
    for (let size = Math.min(4, tokens.length - index); size >= 1; size -= 1) {
      const window = tokens.slice(index, index + size);
      if (window.some((token) => token.consumed)) continue;
      const phrase = window.map((token) => token.value).join(" ");
      if (!phrase || GLUE_WORDS.has(phrase)) continue;
      const resolution = resolveKeywordAlias(phrase, grounding, dictionary, options);
      if (!resolution) continue;
      if (resolution.value === "protection" && /\bprotection from\b/.test(model.normalizedInput)) continue;
      const value = quoteIfNeeded(normalizeScryfallTerm(resolution.value));
      const polarity = isNegatedPhrase(model.normalizedInput, phrase) ? "exclude" : "include";
      const query = `${polarity === "exclude" ? "-" : ""}kw:${value}`;
      addClause(model, query, {
        category: "keyword",
        kind: "keyword",
        field: "kw",
        source: resolution.source,
        confidence: resolution.confidence,
        polarity,
        rawSpan: phrase,
        normalizedSpan: normalizeAlias(phrase),
        recognized: `${phrase} -> ${query}`,
        slot: "keywords"
      });
      markTokenWindowConsumed(model, index, size, "keyword", resolution.source);
      break;
    }
  }
}

function resolveKeywordAlias(phrase, grounding, dictionary, options = {}) {
  const variants = phraseVariants(phrase);
  const exact = [];
  variants.forEach((variant) => {
    (grounding?.aliases?.[variant] || [])
      .filter((candidate) => candidate.kind === "keyword" && candidate.catalog === "keywordAbilities")
      .forEach((candidate) => exact.push(candidate));
  });
  if (exact.length) {
    return { value: exact[0].value, catalog: exact[0].catalog, source: "catalog", confidence: 0.94 };
  }

  const dictQuery = dictionaryLookup(dictionary.keywords, variants);
  if (dictQuery) {
    const value = extractKeywordValue(dictQuery.query);
    if (value) return { value, catalog: "dictionary", source: "registry", confidence: 0.84 };
  }

  const fuzzyAllowed = options.allowFuzzy !== false
    && normalizeAlias(phrase).split(/\s+/).length <= 2
    && !normalizeAlias(phrase).split(/\s+/).some((token) => GLUE_WORDS.has(token));
  const fuzzy = fuzzyAllowed ? fuzzyResolveAlias(phrase, grounding, "keyword", 0.8) : null;
  if (fuzzy) return fuzzy;
  return null;
}

function resolveKeywordActionsAndAbilityWords(model) {
  const grounding = model.grounding;
  if (!grounding?.catalogs) return;
  const actionRows = [
    ...(grounding.catalogs.keywordActions || []).map((value) => ({ value, source: "catalog", kind: "keyword action" })),
    ...(grounding.catalogs.abilityWords || []).map((value) => ({ value, source: "catalog", kind: "ability word" }))
  ];
  actionRows
    .sort((left, right) => normalizeAlias(right.value).length - normalizeAlias(left.value).length)
    .forEach((row) => {
      const phrase = normalizeAlias(row.value);
      if (!phrase || isConsumed(model, phrase) || !hasPhrase(model.normalizedInput, phrase)) return;
      if (phrase === "tap" && /tap\s+for\s+mana/.test(model.normalizedInput)) return;
      if (phrase === "discard" && /do(?:n't| not|nt)\s+discard/.test(model.normalizedInput)) return;
      addClause(model, `o:${quoteIfNeeded(phrase)}`, {
        category: "oracle",
        kind: row.kind,
        field: "oracle",
        source: "catalog",
        confidence: 0.82,
        rawSpan: phrase,
        normalizedSpan: phrase,
        recognized: `${phrase} -> o:${quoteIfNeeded(phrase)}`,
        slot: "oracle"
      });
      consumePhrase(model, phrase, row.kind, "catalog");
    });
}

function fuzzyResolveAlias(phrase, grounding, kind, threshold) {
  if (!grounding?.aliases) return null;
  const needleVariants = phraseVariants(phrase);
  const candidates = [];
  Object.entries(grounding.aliases).forEach(([alias, rows]) => {
    rows
      .filter((row) => row.kind === kind)
      .filter((row) => kind !== "keyword" || row.catalog === "keywordAbilities")
      .forEach((row) => candidates.push({ alias, row }));
  });
  const ranked = [];
  needleVariants.forEach((needle) => {
    candidates.forEach((candidate) => {
      ranked.push({ ...candidate, score: similarityStrict(needle, candidate.alias), needle });
    });
  });
  ranked.sort((left, right) => right.score - left.score || left.alias.localeCompare(right.alias));
  const best = ranked.find((candidate) => candidate.score >= threshold);
  if (!best) return null;
  const second = ranked.find((candidate) => candidate.alias !== best.alias && candidate.row.value !== best.row.value && candidate.score >= threshold);
  if (second && second.score > best.score - 0.05) return null;
  return {
    value: best.row.value,
    catalog: best.row.catalog,
    source: kind === "keyword" ? "fuzzy-catalog" : "fuzzy-catalog",
    confidence: Number(best.score.toFixed(2))
  };
}

function detectManaValue(model) {
  const text = model.normalizedInput;
  const range = text.match(/\b(?:cmc|mana value|mv)\s+between\s+(\d+)\s+and\s+(\d+)\b/);
  if (range) {
    addClause(model, `mv>=${range[1]}`, { category: "stats", kind: "mana", field: "mv", source: "inferred", confidence: 0.9, rawSpan: range[0], normalizedSpan: normalizeAlias(range[0]), recognized: `mana value >=${range[1]}` });
    addClause(model, `mv<=${range[2]}`, { category: "stats", kind: "mana", field: "mv", source: "inferred", confidence: 0.9, rawSpan: range[0], normalizedSpan: normalizeAlias(range[0]), recognized: `mana value <=${range[2]}` });
    return;
  }

  const patterns = [
    { re: /\b(?:mv|mana value|cmc|cost|costs?)\s*(\d+)\s*(?:or less|or fewer|and under|or under|<=|less)\b/, op: "<=" },
    { re: /\b(?:mv|mana value|cmc|cost|costs?)\s*(\d+)\s*(?:or more|or greater|and up|\+|>=)\b/, op: ">=" },
    { re: /\b(?:under|less than)\s*(\d+)\s*(?:mana|mv|cmc)\b/, op: "<" },
    { re: /\b(?:at least|more than)\s*(\d+)\s*(?:mana|mv|cmc)\b/, op: ">=" },
    { re: /\b(?:exactly)\s*(\d+)\s*(?:mana|mv|cmc)?\b/, op: "=" },
    { re: /\b(?:cost|costs?)\s+(\d+)\b/, op: ":" }
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern.re);
    if (!match) continue;
    if (isConsumed(model, match[0])) continue;
    addClause(model, `mv${pattern.op}${match[1]}`, {
      category: "stats",
      kind: "mana",
      field: "mv",
      source: "inferred",
      confidence: 0.86,
      rawSpan: match[0],
      normalizedSpan: normalizeAlias(match[0]),
      recognized: `mana value ${pattern.op}${match[1]}`
    });
    return;
  }
}

function detectPowerToughness(model) {
  detectStatConstraint(model, "power", "pow");
  detectStatConstraint(model, "toughness", "tou");
}

function detectStatConstraint(model, word, field) {
  const patterns = [
    { re: new RegExp(`\\b${word}\\s*(<=|>=|<|>|=|:)\\s*(\\d+)\\b`), opIndex: 1, valueIndex: 2 },
    { re: new RegExp(`\\b${word}\\s+(\\d+)\\s*(or less|or fewer|or lower|or under|at most)\\b`), op: "<=", valueIndex: 1 },
    { re: new RegExp(`\\b${word}\\s+(\\d+)\\s*(or more|or greater|or higher|and up|\\+)\\b`), op: ">=", valueIndex: 1 },
    { re: new RegExp(`\\b${word}\\s+(?:under|less than|below)\\s*(\\d+)\\b`), op: "<", valueIndex: 1 },
    { re: new RegExp(`\\b${word}\\s+(?:over|greater than|more than|above)\\s*(\\d+)\\b`), op: ">", valueIndex: 1 },
    { re: new RegExp(`\\b${word}\\s+(\\d+)\\b`), op: "=", valueIndex: 1 }
  ];
  for (const pattern of patterns) {
    const match = model.normalizedInput.match(pattern.re);
    if (!match) continue;
    const op = pattern.op || normalizeComparator(match[pattern.opIndex]);
    const value = match[pattern.valueIndex];
    addClause(model, `${field}${op}${value}`, {
      category: "stats",
      kind: "stats",
      field,
      source: "inferred",
      confidence: 0.88,
      rawSpan: match[0],
      normalizedSpan: normalizeAlias(match[0]),
      recognized: `${word} ${op}${value}`
    });
    return;
  }
}

function detectOracleNegation(model) {
  const patterns = [
    { re: /\b(?:don't|do not|dont)\s+discard\b/, query: "-o:discard", label: "do not discard" },
    { re: /\b(?:don't|do not|dont)\s+tap\s+for\s+mana\b/, query: "-o:\"{T}: add\"", label: "do not tap for mana" }
  ];
  patterns.forEach((pattern) => {
    const match = model.normalizedInput.match(pattern.re);
    if (!match) return;
    addClause(model, pattern.query, {
      category: "oracle",
      kind: "oracle",
      field: "oracle",
      source: "inferred",
      confidence: 0.86,
      polarity: "exclude",
      rawSpan: match[0],
      normalizedSpan: normalizeAlias(match[0]),
      recognized: `${pattern.label} -> ${pattern.query}`,
      slot: "oracle"
    });
  });
}

function groupSameFieldBooleanOr(model) {
  const candidates = model.clauses.filter((clause) => !clause.disabled && ["type", "keyword"].includes(clause.category));
  for (let i = 0; i < candidates.length; i += 1) {
    for (let j = i + 1; j < candidates.length; j += 1) {
      const left = candidates[i];
      const right = candidates[j];
      if (left.disabled || right.disabled) continue;
      if (left.category !== right.category || left.polarity === "exclude" || right.polarity === "exclude") continue;
      if (!hasBooleanOrBetween(model.normalizedInput, left.normalizedSpan, right.normalizedSpan)) continue;
      left.disabled = true;
      right.disabled = true;
      addClause(model, `(${left.query} OR ${right.query})`, {
        category: left.category,
        kind: "boolean",
        field: left.field,
        source: "inferred",
        confidence: Math.min(left.confidence || 0.8, right.confidence || 0.8),
        rawSpan: `${left.rawSpan} or ${right.rawSpan}`,
        normalizedSpan: `${left.normalizedSpan} or ${right.normalizedSpan}`,
        recognized: `${left.rawSpan} or ${right.rawSpan} -> (${left.query} OR ${right.query})`,
        slot: slotForCategory(left.category)
      });
      model.expression = { op: "OR", children: [left.query, right.query] };
    }
  }
}

function resolveIgnoredGlue(model) {
  model.tokens.forEach((token) => {
    if (GLUE_WORDS.has(token.value) || REQUEST_WORDS.has(token.value)) addIgnored(model, token.value);
  });
}

function detectUnresolvedTerms(model) {
  return unique(model.tokens
    .filter((token) => !token.consumed)
    .map((token) => normalizeAlias(token.value))
    .filter((token) => token.length > 2 && !GLUE_WORDS.has(token) && !/^\d+$/.test(token)));
}

function addSetAlternatives(model) {
  (model.pendingSetFamilyAlternatives || []).forEach((family) => {
    if (!family?.setCodes?.length) return;
    model.alternatives.push({
      label: family.label || "Search the full set family",
      query: buildSetAlternativeQuery(model, family.setCodes),
      api: model.api
    });
  });
  if (model.pendingSetAmbiguity?.families?.length) {
    const ambiguity = model.ambiguous.find((item) => item?.kind === "set-family" && item.blocking);
    const choices = model.pendingSetAmbiguity.families.map((family) => {
      const alternative = {
        label: `Use ${family.name}`,
        query: buildSetAlternativeQuery(model, family.setCodes),
        api: model.api
      };
      model.alternatives.push(alternative);
      return {
        id: family.id,
        label: alternative.label,
        name: family.name,
        mainSetCode: family.mainSetCode,
        setCodes: [...family.setCodes],
        query: alternative.query,
        api: alternative.api
      };
    });
    if (ambiguity) ambiguity.choices = choices;
  }
}

function buildSetAlternativeQuery(model, setCodes) {
  const clone = cloneModelForSerialization(model);
  clone.clauses = clone.clauses.filter((clause) => clause.category !== "set" && clause.category !== "game" && clause.category !== "preference");
  addClause(clone, "(game:paper)", { category: "game", kind: "game", field: "game", source: "inferred", confidence: 0.9, rawSpan: "", normalizedSpan: "" });
  addClause(clone, `(${setCodes.map((code) => `set:${code}`).join(" OR ")})`, { category: "set", kind: "set", field: "set", source: "set-family", confidence: 0.9, rawSpan: "", normalizedSpan: "" });
  addClause(clone, "prefer:best", { category: "preference", kind: "preference", field: "prefer", source: "inferred", confidence: 0.9, rawSpan: "", normalizedSpan: "" });
  return buildScryfallQuery(clone);
}

function addColorAlternatives(model) {
  const colorClause = model.clauses.find((clause) => !clause.disabled && clause.category === "color" && /^c:[wubrg]{2,}$/.test(clause.query));
  if (!colorClause) return;
  const colors = colorClause.query.slice(2);
  const names = colors.split("").map(colorName);
  model.alternatives.push(
    {
      label: `${joinHuman(names)} cards, no outside colors`,
      query: buildWithClauseReplacement(model, colorClause, `c<=${colors}`),
      api: model.api
    },
    {
      label: `${joinHuman(names)} Commander identity`,
      query: buildWithClauseReplacement(model, colorClause, `id<=${colors}`),
      api: model.api
    },
    {
      label: `Exactly ${joinHuman(names)} multicolor`,
      query: buildWithClauseReplacement(model, colorClause, `c=${colors}`),
      api: model.api
    }
  );
}

function buildWithClauseReplacement(model, target, replacement) {
  const clone = cloneModelForSerialization(model);
  const clause = clone.clauses.find((item) => item.order === target.order);
  if (clause) clause.query = replacement;
  return buildScryfallQuery(clone);
}

function buildValidationPlan(model) {
  const relaxations = [];
  const abilityCategories = ["oracle", "functional", "keyword"]
    .filter((category) => model.clauses.some((clause) => !clause.disabled && clause.category === category));
  const categories = [
    { category: "set", label: "Drop set constraint" },
    { category: "price", label: "Drop price constraint" },
    { category: "stats", label: "Drop numeric/stat constraint" },
    { category: "oracle", label: "Drop rules-text constraint" },
    { category: "functional", label: "Drop functional-tag constraint" },
    { category: "keyword", label: "Drop keyword constraint" },
    { category: "color", label: "Drop color constraint" },
    { category: "identity", label: "Drop color-identity constraint" },
    { category: "type", label: "Drop type/subtype constraint" }
  ];
  for (const { category, label } of categories) {
    if (model.clauses.some((clause) => !clause.disabled && clause.category === category)) {
      const query = buildScryfallQuery(model, { omitCategories: new Set([category]) }) || "*";
      if (query && query !== model.finalQuery) relaxations.push({ label, query, api: model.api, category });
    }
    if (category !== "keyword" || abilityCategories.length < 2) continue;
    const query = buildScryfallQuery(model, { omitCategories: new Set(abilityCategories) }) || "*";
    if (!query || query === model.finalQuery || relaxations.some((relaxation) => relaxation.query === query)) continue;
    relaxations.push({
      label: model.commanderRole === "candidate" ? "Use any matching commander" : "Drop all ability constraints",
      query,
      api: model.api,
      category: "abilities"
    });
  }
  return { source: "search-response-total_cards", relaxations };
}

function serializeAmbiguity(ambiguity) {
  if (!ambiguity || typeof ambiguity !== "object") {
    return { kind: "ambiguous", message: String(ambiguity || ""), blocking: false, choices: [] };
  }
  return {
    ...ambiguity,
    choices: (ambiguity.choices || []).map((choice) => ({ ...choice, api: choice.api ? { ...choice.api } : undefined }))
  };
}

function formatAmbiguityMessage(ambiguity) {
  if (!ambiguity || typeof ambiguity !== "object") return String(ambiguity || "");
  return ambiguity.message || `${ambiguity.rawSpan || ambiguity.normalizedSpan || "Input"} is ambiguous`;
}

function finalizeGroundedResult(model, query) {
  const finalQuery = query || model.finalQuery || buildScryfallQuery(model) || (model.normalizedInput ? "*" : "");
  const ambiguityMessages = unique(model.ambiguous.map(formatAmbiguityMessage));
  const warnings = unique([...model.warnings]);
  if (model.pendingSetAmbiguity) warnings.push("Ambiguous set family: review the alternate family queries below.");
  if (model.unresolved.length) warnings.push(`Unresolved terms: ${model.unresolved.join(", ")}. These were not passed into the Scryfall query.`);
  if (finalQuery === "*" && model.normalizedInput) warnings.push("Low-confidence deterministic parse. Review or edit the generated query.");
  if (model.alternatives.length) warnings.push("Ambiguous parse: review the alternate query interpretations below.");

  return {
    mode: "search",
    input: model.rawInput,
    query: finalQuery,
    confidence: Number((model.confidence || scoreGroundedModel(model)).toFixed(2)),
    reason: "Grounded Plain Reading compiled typed spans into Scryfall fields.",
    recognized: unique(model.recognized),
    ignored: unique(model.ignored),
    appliedDefaults: unique(model.appliedDefaults),
    assumptions: unique(model.assumptions),
    unresolved: unique(model.unresolved),
    ambiguous: ambiguityMessages,
    alternatives: dedupeAlternatives(model.alternatives.filter((alternative) => alternative.query)),
    warnings: unique(warnings),
    api: model.api,
    queryModel: explainPlainReadingPlan({ ...model, finalQuery }),
    validationPlan: model.validationPlan || { relaxations: [] },
    suppressFormatDefault: true
  };
}

function scoreGroundedModel(model) {
  if (!model.normalizedInput) return 0.1;
  if (model.pendingSetAmbiguity) return 0.72;
  const resolved = model.clauses.filter((clause) => !clause.disabled && clause.query).length;
  if (!resolved && model.recognized.length) return model.unresolved.length ? 0.4 : 0.42;
  if (!resolved) return model.unresolved.length ? 0.35 : 0.25;
  let score = 0.54 + Math.min(resolved * 0.08, 0.36);
  if (model.clauses.some((clause) => clause.source === "catalog")) score += 0.1;
  if (model.clauses.some((clause) => clause.source === "fuzzy-set")) score += 0.16;
  if (model.clauses.some((clause) => clause.source === "fuzzy-catalog")) score += 0.08;
  if (model.clauses.some((clause) => clause.source === "registry")) score += 0.04;
  if (!model.unresolved.length) score += 0.1;
  if (model.assumptions.length) score -= 0.04;
  if (model.alternatives.length) score -= 0.06;
  if (model.unresolved.length) score -= Math.min(model.unresolved.length * 0.07, 0.28);
  return Math.max(0.25, Math.min(0.96, score));
}

function addClause(model, query, opts = {}) {
  const normalizedQuery = normalizeDictionaryQuery(query, model);
  const api = parseApiMetadataFromQueryFragment(normalizedQuery);
  applyApiMetadata(model, api);
  const cleanQuery = stripApiMetadataFromQuery(normalizedQuery);
  if (!cleanQuery || cleanQuery === "implicit AND") return null;
  if (model.clauses.some((clause) => clause.query === cleanQuery && clause.category === (opts.category || "other") && !clause.disabled)) {
    if (opts.rawSpan) consumePhrase(model, opts.rawSpan, opts.kind, opts.source);
    return null;
  }
  const clause = {
    query: cleanQuery,
    category: opts.category || categoryFromQuery(cleanQuery),
    kind: opts.kind || "query",
    field: opts.field || "",
    source: opts.source || "inferred",
    confidence: Number.isFinite(opts.confidence) ? opts.confidence : 0.75,
    polarity: opts.polarity || (cleanQuery.startsWith("-") ? "exclude" : "include"),
    rawSpan: opts.rawSpan || "",
    normalizedSpan: opts.normalizedSpan || normalizeAlias(opts.rawSpan || ""),
    order: model.orderCounter += 1,
    disabled: false
  };
  model.clauses.push(clause);
  if (opts.recognized) addRecognized(model, opts.recognized);
  if (opts.appliedDefault) addAppliedDefault(model, opts.appliedDefault);
  if (opts.rawSpan) consumePhrase(model, opts.rawSpan, opts.kind, opts.source);
  model.resolvedSpans.push({
    kind: clause.kind,
    value: cleanQuery,
    field: clause.field,
    source: clause.source,
    confidence: clause.confidence,
    polarity: clause.polarity,
    rawSpan: clause.rawSpan,
    normalizedSpan: clause.normalizedSpan
  });
  const slot = opts.slot || slotForCategory(clause.category);
  if (slot && Array.isArray(model.slots[slot])) {
    model.slots[slot].push({
      query: cleanQuery,
      kind: clause.kind,
      source: clause.source,
      confidence: clause.confidence,
      polarity: clause.polarity,
      rawSpan: clause.rawSpan,
      normalizedSpan: clause.normalizedSpan
    });
  }
  return clause;
}

function addFragmentClauses(model, query, opts = {}) {
  return splitTopLevelFragments(query)
    .map((fragment) => addClause(model, fragment, { ...opts, category: opts.category || categoryFromQuery(fragment) }))
    .filter(Boolean);
}

function negateQueryFragment(fragment) {
  const clean = String(fragment || "").trim();
  if (!clean || clean.startsWith("-")) return clean;
  return `-${clean}`;
}

function splitTopLevelFragments(query) {
  const value = String(query || "").trim();
  if (!value) return [];
  const fragments = [];
  let current = "";
  let depth = 0;
  let inQuote = false;
  let inRegex = false;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    const prev = value[index - 1];
    if (char === "\"" && !inRegex && prev !== "\\") inQuote = !inQuote;
    if (char === "/" && !inQuote && prev !== "\\" && /(?:^|\s|:)$/.test(value.slice(0, index).slice(-1))) inRegex = !inRegex;
    if (!inQuote && !inRegex && char === "(") depth += 1;
    if (!inQuote && !inRegex && char === ")") depth = Math.max(0, depth - 1);
    if (!inQuote && !inRegex && depth === 0 && /\s/.test(char)) {
      if (current.trim()) fragments.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) fragments.push(current.trim());
  return fragments;
}

function normalizeDictionaryQuery(query, model) {
  const value = String(query || "").trim();
  if (!value) return "";
  if (value === "f:commander" && model?.commanderRole) return "legal:commander";
  return value
    .replace(/\bb:modern\b/g, "banned:modern")
    .replace(/\botag:wrath\b/g, "otag:board-wipe")
    .replace(/\botag:ramp-mana-rock\b/g, "otag:mana-rock")
    .replace(/\bis:alt-?art\b/g, "is:alternate");
}

function categoryForRegistryKind(kind, fragment) {
  if (kind === "functional-tag") return "functional";
  if (kind === "oracle" || /^o:|^-o:|^fo:|^-fo:/.test(fragment)) return "oracle";
  if (kind === "predicate" || /^is:|^-is:|^not:/.test(fragment)) return "predicate";
  if (kind === "frame") return "frame";
  return categoryFromQuery(fragment);
}

function categoryFromQuery(query) {
  const clean = String(query || "").replace(/^\(/, "");
  if (/^-?(?:type|t):/.test(clean)) return "type";
  if (/^-?kw:/.test(clean)) return "keyword";
  if (/^-?(?:o|fo):/.test(clean)) return "oracle";
  if (/^-?otag:/.test(clean)) return "functional";
  if (/^-?id[<>=:]/.test(clean)) return "identity";
  if (/^-?c[<>=:]/.test(clean)) return "color";
  if (/^(?:f|format|legal|banned|restricted):/.test(clean)) return "format";
  if (/^r:/.test(clean)) return "rarity";
  if (/^(?:mv|pow|tou|loy)[<>=:]/.test(clean)) return "stats";
  if (/^(?:usd|eur|tix)[<>=:]/.test(clean)) return "price";
  if (/^a:/.test(clean)) return "artist";
  if (/^lang:/.test(clean)) return "language";
  if (/^frame:/.test(clean)) return "frame";
  if (/^(?:is|not):/.test(clean)) return "predicate";
  if (/^\(?game:/.test(clean)) return "game";
  if (/^(?:set|s):|\(set:/.test(clean)) return "set";
  if (/^prefer:/.test(clean)) return "preference";
  return "query";
}

function slotForCategory(category) {
  return {
    type: "typeLine",
    color: "colors",
    identity: "colors",
    oracle: "oracle",
    functional: "oracle",
    keyword: "keywords",
    set: "sets",
    format: "formats"
  }[category] || "";
}

function findTrigger(model, triggers) {
  for (const trigger of triggers.sort((left, right) => right.length - left.length)) {
    if (!trigger || isConsumed(model, trigger)) continue;
    if (hasPhrase(model.normalizedInput, trigger)) return trigger;
    const variant = phraseVariants(trigger).find((item) => hasPhrase(model.normalizedInput, item) && !isConsumed(model, item));
    if (variant) return variant;
  }
  return "";
}

function dictionaryLookup(map = {}, variants = []) {
  for (const variant of variants) {
    const query = map?.[variant];
    if (query) return { trigger: variant, query };
  }
  return null;
}

function extractTypeValue(query) {
  const match = String(query || "").match(/\b(?:type|t):(?:"([^"]+)"|'([^']+)'|([^\s()]+))/i);
  return match ? (match[1] || match[2] || match[3]) : "";
}

function extractKeywordValue(query) {
  const match = String(query || "").match(/\bkw:(?:"([^"]+)"|'([^']+)'|([^\s()]+))/i);
  return match ? (match[1] || match[2] || match[3]) : "";
}

function hasExactColorIntent(text) {
  return /\b(only|exactly|just)\b/.test(text) || /\bno other colou?rs?\b/.test(text);
}

function resolveCommanderColorMode(model) {
  const text = model.normalizedInput;
  if (model.commanderRole === "support") return hasMonoCommanderDeckSupportIntent(text, model.dictionary) ? "exact" : "fit";
  if (model.commanderRole !== "candidate") return "";
  if (hasColorlessCommanderIdentityIntent(text)) return "exact";
  if (hasCommanderIncludesColorIntent(text, model.dictionary)) return "includes";
  if (hasMonoCommanderIdentityIntent(text, model.dictionary)) return "exact";
  if (hasFiveColorCommanderIdentityIntent(text)) return "exact";
  if (hasExactColorIntent(text) && /\b(?:identity|commanders?)\b/.test(text)) return "exact";
  if (hasColorPoolIntentForColors(text, model.dictionary)) return "fit";
  return "";
}

function identityModeForAlias(model, commanderColorMode) {
  if (commanderColorMode === "includes" || commanderColorMode === "fit") return commanderColorMode;
  if (model.commanderRole === "candidate") return "exact";
  return "";
}

function colorOperatorForMode(mode, exactColorIntent, text, dictionary) {
  if (mode === "exact") return "id=";
  if (mode === "includes") return "id>=";
  if (mode === "fit") return "id<=";
  if (exactColorIntent) return "c=";
  if (hasColorPoolIntentForColors(text, dictionary)) return "c<=";
  return "c:";
}

function hasCommanderIncludesColorIntent(text, dictionary) {
  const colors = Object.keys(dictionary.colors || DEFAULT_DICTIONARY.colors).filter((word) => word !== "colorless");
  const colorPattern = colors.map(escapeRegExp).join("|");
  const colorRun = `(?:(?:${colorPattern})\\b(?:\\s+(?:and|or)\\s+)?)+`;
  return new RegExp(`\\bcommanders?\\s+(?:that\\s+)?(?:include|includes|including)\\s+${colorRun}`).test(text)
    || new RegExp(`\\bcommanders?\\s+with\\s+${colorRun}`).test(text)
    || new RegExp(`\\b${colorRun}\\s+in\\s+the\\s+colou?r\\s+identity\\b`).test(text)
    || new RegExp(`\\bcolou?r\\s+identity\\s+(?:include|includes|including|with)\\s+${colorRun}`).test(text);
}

function hasMonoCommanderIdentityIntent(text, dictionary) {
  const colors = Object.keys(dictionary.colors || DEFAULT_DICTIONARY.colors).filter((word) => word !== "colorless");
  const colorPattern = colors.map(escapeRegExp).join("|");
  return new RegExp(`\\bmono\\s+(?:${colorPattern})\\s+commanders?\\b`).test(text)
    || new RegExp(`\\bmono\\s+(?:${colorPattern})\\b.*\\bcommanders?\\b`).test(text);
}

function hasMonoCommanderDeckSupportIntent(text, dictionary) {
  const colors = Object.keys(dictionary.colors || DEFAULT_DICTIONARY.colors).filter((word) => word !== "colorless");
  const colorPattern = colors.map(escapeRegExp).join("|");
  return new RegExp(`\\bmono\\s+(?:${colorPattern})\\b.*\\bcommander\\s+decks?\\b`).test(text);
}

function hasColorlessCommanderIdentityIntent(text) {
  return /\bcolorless\b.*\bcommanders?\b/.test(text) || /\bcommanders?\b.*\bcolorless\b/.test(text);
}

function hasCommanderLegalityText(text) {
  return /\blegal\s+in\s+commander\b/.test(text) || /\bcommander\s+legal\b/.test(text);
}

function hasFiveColorCommanderIdentityIntent(text) {
  return /\b(?:five|5)\s+colou?rs?\b.*\bcommanders?\b/.test(text) || /\bwubrg\b.*\bcommanders?\b/.test(text);
}

function hasColorPoolIntent(text) {
  return /\b(?:or|either)\b/.test(text) || /\ball\s+(?:3|three|five|5)\b/.test(text);
}

function hasColorPoolIntentForColors(text, dictionary) {
  if (/\ball\s+(?:3|three|five|5)\b/.test(text)) return true;
  const words = Object.keys(dictionary.colors || DEFAULT_DICTIONARY.colors).filter((word) => word !== "colorless");
  const colorPattern = words.map(escapeRegExp).join("|");
  return new RegExp(`\\b(?:${colorPattern})\\b(?:\\s+\\w+){0,2}\\s+or\\s+(?:all\\s+(?:3|three)|\\b(?:${colorPattern})\\b)`).test(text);
}

function isNegatedColorPhrase(text, word) {
  const clean = normalizeAlias(word);
  return new RegExp(`\\b(?:not|no|without|excluding|but not|non)\\s+(?:${escapeRegExp(clean)})\\b`).test(text)
    || new RegExp(`\\bnot\\s+(?:[a-z]+\\s+)?(?:or\\s+)?${escapeRegExp(clean)}\\b`).test(text)
    || new RegExp(`\\bnon\\s*${escapeRegExp(clean)}\\b`).test(text);
}

function isNegatedPhrase(text, phrase) {
  const clean = normalizePlainReadingInput(phrase);
  return new RegExp(`\\b(?:not|no|without|excluding|but not)\\s+${escapeRegExp(clean)}\\b`).test(text);
}

function isProtectionTargetColor(text, colorWord) {
  return new RegExp(`\\b(?:protection from|protected from|pro)\\s+${escapeRegExp(colorWord)}\\b`).test(text);
}

function hasColorClause(model, colors) {
  return model.clauses.some((clause) => !clause.disabled && /^(?:c|id)[<>=:]?/.test(clause.query) && clause.query.endsWith(colors));
}

function fuzzyTokenPresent(model, target, threshold) {
  const ranked = model.tokens
    .filter((token) => !token.consumed && /^[a-z]+$/.test(token.value) && !GLUE_WORDS.has(token.value))
    .map((token) => ({ token, score: similarityStrict(token.value, target) }))
    .filter((item) => item.score >= threshold)
    .sort((left, right) => right.score - left.score);
  const best = ranked[0];
  if (!best) return null;
  const second = ranked[1];
  if (second && second.score > best.score - 0.05) return null;
  return { rawSpan: best.token.value, source: "fuzzy-catalog", confidence: Number(best.score.toFixed(2)) };
}

function detectColorSymbolShorthand(model) {
  const token = model.tokens.find((item) => !item.consumed && /^[wubrg]{2,5}$/.test(item.value));
  if (!token) return null;
  return { colors: sortColors(token.value), rawSpan: token.value };
}

function hasBooleanOrBetween(text, left, right) {
  if (!left || !right) return false;
  const a = escapeRegExp(left);
  const b = escapeRegExp(right);
  const between = String.raw`(?:\s+(?:cards?|that|with|have|has|gives?|give|me))*\s+(?:or|either)\s+(?:cards?\s+)?`;
  return new RegExp(`\\b${a}${between}${b}\\b`).test(text) || new RegExp(`\\b${b}${between}${a}\\b`).test(text);
}

function addFunctionalAlternative(model, match, replaceOrders = []) {
  const alternatives = {
    "otag:board-wipe": {
      label: "Broader Oracle text board wipes",
      query: "(o:\"destroy all creatures\" OR o:\"exile all creatures\" OR o:\"destroy all nonland permanents\")"
    },
    "otag:mana-rock": {
      label: "Broader artifact mana text",
      query: "t:artifact (o:\"add {\" OR produces:any)"
    },
    "otag:tutor": {
      label: "Broader library-search text",
      query: "o:\"search your library\""
    },
    "otag:removal": {
      label: "Broader Oracle text removal",
      query: "(o:\"destroy target\" OR o:\"exile target\" OR o:\"return target\" OR o:\"counter target\")"
    },
    "otag:removal-creature": {
      label: "Broader creature-removal Oracle text",
      query: "(o:\"destroy target creature\" OR o:\"exile target creature\")"
    },
    "otag:mana-ramp": {
      label: "Broader ramp Oracle text",
      query: "(o:\"search your library for a land\" OR o:\"add {\")"
    },
    "otag:card-advantage": {
      label: "Broader card advantage text",
      query: "(o:draw OR o:\"return target\" OR o:\"from your graveyard\")"
    }
  };
  const alternative = alternatives[match.query];
  if (alternative) {
    queueAlternativeReplacement(model, {
      label: alternative.label,
      query: alternative.query,
      replaceOrders
    });
  }
}

function queueAlternativeReplacement(model, alternative) {
  if (!alternative?.query) return;
  model.pendingAlternatives.push({
    label: alternative.label || "Alternative",
    query: alternative.query,
    replaceOrders: [...(alternative.replaceOrders || [])]
  });
}

function materializePendingAlternatives(model) {
  (model.pendingAlternatives || []).forEach((alternative) => {
    const materialized = buildWithAlternativeReplacement(model, alternative);
    if (materialized.query) {
      model.alternatives.push({
        label: alternative.label,
        query: materialized.query,
        api: materialized.api
      });
    }
  });
}

function buildWithAlternativeReplacement(model, alternative) {
  const clone = cloneModelForSerialization(model);
  const replaceOrders = new Set(alternative.replaceOrders || []);
  if (replaceOrders.size) {
    clone.clauses.forEach((clause) => {
      if (replaceOrders.has(clause.order)) clause.disabled = true;
    });
  }
  addFragmentClauses(clone, alternative.query, { kind: "alternative", field: "", source: "registry", confidence: 0.7 });
  return {
    query: buildScryfallQuery(clone),
    api: clone.api
  };
}

function cloneModelForSerialization(model) {
  return {
    ...model,
    clauses: model.clauses.map((clause) => ({ ...clause })),
    orderCounter: model.orderCounter
  };
}

function applyApiMetadata(model, api = {}) {
  const normalized = normalizeApiMetadata(api);
  if (normalized.unique) model.api.unique = normalized.unique;
  if (normalized.order) model.api.order = normalized.order;
  if (normalized.dir) model.api.dir = normalized.dir;
}

function parseApiMetadataFromQueryFragment(fragment) {
  const api = {};
  const pattern = /\b(order|unique|direction|dir):([a-z0-9_-]+)\b/gi;
  for (const match of String(fragment || "").matchAll(pattern)) {
    const key = match[1].toLowerCase();
    const value = match[2].toLowerCase();
    if (key === "order") api.order = value;
    else if (key === "unique") {
      const uniqueValue = normalizeUnique(value);
      if (uniqueValue) api.unique = uniqueValue;
    } else {
      const dir = normalizeSortDirection(value);
      if (dir) api.dir = dir;
    }
  }
  return api;
}

function stripApiMetadataFromQuery(fragment) {
  return String(fragment || "")
    .replace(/\b(?:order|unique|direction|dir|display):[a-z0-9_-]+\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeApiMetadata(api = {}) {
  const normalized = {};
  const uniqueValue = normalizeUnique(api.unique);
  const dir = normalizeSortDirection(api.dir);
  if (uniqueValue) normalized.unique = uniqueValue;
  if (api.order) normalized.order = String(api.order).toLowerCase().trim();
  if (dir) normalized.dir = dir;
  return normalized;
}

function normalizeUnique(value) {
  const clean = String(value || "").toLowerCase().trim();
  return ["cards", "art", "prints"].includes(clean) ? clean : undefined;
}

function normalizeSortDirection(value) {
  const clean = String(value || "").toLowerCase().trim();
  if (["asc", "ascending", "up"].includes(clean)) return "asc";
  if (["desc", "descending", "down"].includes(clean)) return "desc";
  if (clean === "auto") return "auto";
  return undefined;
}

function normalizeComparator(value) {
  const clean = String(value || "").trim();
  if (clean === ":") return "=";
  return clean || "=";
}

function cleanupFieldValue(value) {
  return String(value || "").replace(/[?.!]+$/g, "").trim();
}

function tokenizeWithPositions(value) {
  return normalizeAlias(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((token, index) => ({ value: token, index, start: index, end: index + token.length, consumed: false }));
}

function phraseVariants(phrase) {
  const clean = normalizeAlias(phrase);
  if (!clean) return [];
  const tokens = clean.split(/\s+/);
  const variants = new Set([clean]);
  variants.add(tokens.map((token, index) => (index === tokens.length - 1 ? singularize(token) : token)).join(" "));
  variants.add(tokens.map(lemmatize).join(" "));
  variants.add(tokens.map((token) => singularize(lemmatize(token))).join(" "));
  return [...variants].filter(Boolean);
}

function normalizeAlias(value) {
  return normalizePlainReadingInput(value)
    .replace(/['`]/g, "")
    .replace(/[^a-z0-9+/:{}]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singularize(value) {
  const clean = normalizeAlias(value);
  if (MORPHOLOGY.has(clean)) return MORPHOLOGY.get(clean);
  if (clean.endsWith("ies") && clean.length > 4) return `${clean.slice(0, -3)}y`;
  if (clean.endsWith("ves") && clean.length > 4) return `${clean.slice(0, -3)}f`;
  if (clean.endsWith("es") && clean.length > 3) return clean.slice(0, -2);
  if (clean.endsWith("s") && clean.length > 3) return clean.slice(0, -1);
  return clean;
}

function lemmatize(value) {
  const clean = normalizeAlias(value);
  if (MORPHOLOGY.has(clean)) return MORPHOLOGY.get(clean);
  if (clean.endsWith("ing") && clean.length > 5) return clean.slice(0, -3);
  if (clean.endsWith("ed") && clean.length > 4) return clean.slice(0, -2);
  return clean;
}

function consumePhrase(model, phrase, kind = "", source = "") {
  const clean = normalizePlainReadingInput(phrase);
  if (!clean) return;
  if (!model.consumed.some((item) => item.phrase === clean)) model.consumed.push({ phrase: clean, kind, source });
  markTokensForPhrase(model, clean);
  if (clean.includes("'")) markTokensForPhrase(model, clean.replace(/'/g, " "));
  const alias = normalizeAlias(phrase);
  if (alias.startsWith("dont ")) markTokensForPhrase(model, alias.replace(/^dont /, "don t "));
}

function markTokensForPhrase(model, phrase) {
  const parts = normalizeAlias(phrase).split(/\s+/).filter(Boolean);
  if (!parts.length) return;
  for (let index = 0; index <= model.tokens.length - parts.length; index += 1) {
    const slice = model.tokens.slice(index, index + parts.length);
    if (slice.map((token) => token.value).join(" ") !== parts.join(" ")) continue;
    slice.forEach((token) => { token.consumed = true; });
  }
}

function markTokenWindowConsumed(model, index, size, kind, source) {
  const phrase = model.tokens.slice(index, index + size).map((token) => token.value).join(" ");
  model.tokens.slice(index, index + size).forEach((token) => { token.consumed = true; });
  consumePhrase(model, phrase, kind, source);
}

function isConsumed(model, phrase) {
  const clean = normalizePlainReadingInput(phrase);
  const alias = normalizeAlias(phrase);
  return model.consumed.some((item) => item.phrase === clean || normalizeAlias(item.phrase).includes(alias));
}

function addIgnored(model, word) {
  const clean = normalizeAlias(word);
  if (clean && !model.ignored.includes(clean)) model.ignored.push(clean);
}

function addAppliedDefault(model, value) {
  if (value && !model.appliedDefaults.includes(value)) model.appliedDefaults.push(value);
}

function addRecognized(model, value) {
  if (value && !model.recognized.includes(value)) model.recognized.push(value);
}

function hasPhrase(text, phrase) {
  const clean = normalizePlainReadingInput(phrase);
  if (!clean) return false;
  const boundaryStart = /^[a-z0-9]/.test(clean) ? "\\b" : "";
  const boundaryEnd = /[a-z0-9}]$/.test(clean) ? "\\b" : "";
  return new RegExp(`${boundaryStart}${escapeRegExp(clean)}${boundaryEnd}`).test(text);
}

function removeConsumedPhrase(text, phrase) {
  const clean = normalizePlainReadingInput(phrase);
  if (!clean) return text;
  const boundaryStart = /^[a-z0-9]/.test(clean) ? "\\b" : "";
  const boundaryEnd = /[a-z0-9}]$/.test(clean) ? "\\b" : "";
  return text.replace(new RegExp(`${boundaryStart}${escapeRegExp(clean)}${boundaryEnd}`, "g"), " ");
}

function quoteIfNeeded(value) {
  const clean = normalizeScryfallTerm(value);
  return /\s/.test(clean) ? `"${clean.replace(/"/g, "\\\"")}"` : clean;
}

function quoteIfNeededPreserve(value) {
  const clean = String(value || "").trim().replace(/^["']|["']$/g, "");
  return /\s/.test(clean) ? `"${clean.replace(/"/g, "\\\"")}"` : clean;
}

function normalizeScryfallTerm(value) {
  return String(value || "").toLowerCase().trim();
}

function sortColors(colors) {
  const set = new Set(String(colors || "").toLowerCase().split(""));
  if (set.has("c") && set.size === 1) return "c";
  return COLOR_ORDER.filter((color) => set.has(color)).join("");
}

function colorName(color) {
  return COLOR_NAMES[color] || color;
}

function similarity(left, right) {
  const a = normalizeAlias(left);
  const b = normalizeAlias(right);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const distance = levenshtein(a, b);
  const edit = 1 - distance / Math.max(a.length, b.length);
  const trigram = trigramSimilarity(a, b);
  const winkler = jaroWinkler(a, b);
  return Math.max(edit, trigram, winkler);
}

function similarityStrict(left, right) {
  const a = normalizeAlias(left);
  const b = normalizeAlias(right);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const distance = levenshtein(a, b);
  const edit = 1 - distance / Math.max(a.length, b.length);
  const trigram = trigramSimilarity(a, b);
  return Math.max(edit, trigram);
}

function levenshtein(left, right) {
  const rows = Array.from({ length: left.length + 1 }, (_, index) => [index]);
  for (let column = 1; column <= right.length; column += 1) rows[0][column] = column;
  for (let row = 1; row <= left.length; row += 1) {
    for (let column = 1; column <= right.length; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      rows[row][column] = Math.min(
        rows[row - 1][column] + 1,
        rows[row][column - 1] + 1,
        rows[row - 1][column - 1] + cost
      );
    }
  }
  return rows[left.length][right.length];
}

function trigramSimilarity(left, right) {
  const a = trigrams(left);
  const b = trigrams(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((item) => b.has(item)).length;
  return (2 * intersection) / (a.size + b.size);
}

function jaroWinkler(left, right) {
  if (left === right) return 1;
  const matchDistance = Math.max(Math.floor(Math.max(left.length, right.length) / 2) - 1, 0);
  const leftMatches = new Array(left.length).fill(false);
  const rightMatches = new Array(right.length).fill(false);
  let matches = 0;

  for (let i = 0; i < left.length; i += 1) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, right.length);
    for (let j = start; j < end; j += 1) {
      if (rightMatches[j] || left[i] !== right[j]) continue;
      leftMatches[i] = true;
      rightMatches[j] = true;
      matches += 1;
      break;
    }
  }

  if (!matches) return 0;
  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < left.length; i += 1) {
    if (!leftMatches[i]) continue;
    while (!rightMatches[k]) k += 1;
    if (left[i] !== right[k]) transpositions += 1;
    k += 1;
  }
  const jaro = (
    matches / left.length
    + matches / right.length
    + (matches - transpositions / 2) / matches
  ) / 3;
  const prefixLength = Math.min(4, [...left].findIndex((char, index) => char !== right[index]));
  const prefix = prefixLength < 0 ? Math.min(4, left.length, right.length) : prefixLength;
  return jaro + prefix * 0.1 * (1 - jaro);
}

function trigrams(value) {
  const padded = `  ${value}  `;
  const grams = new Set();
  for (let index = 0; index < padded.length - 2; index += 1) grams.add(padded.slice(index, index + 3));
  return grams;
}

function longestTriggerLength(entry) {
  return longestListItem(entry.triggers || []);
}

function longestListItem(values = []) {
  return values.reduce((longest, value) => Math.max(longest, String(value || "").length), 0);
}

function joinHuman(values) {
  const list = values.filter(Boolean);
  if (list.length <= 1) return list[0] || "";
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

function dedupeAlternatives(alternatives) {
  const seen = new Set();
  return alternatives.filter((alternative) => {
    const key = `${alternative.label}|${alternative.query}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function addUnique(array, value) {
  if (value && !array.includes(value)) array.push(value);
}

function uniqueBy(values, keyFn) {
  const seen = new Set();
  return values.filter((value) => {
    const key = keyFn(value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

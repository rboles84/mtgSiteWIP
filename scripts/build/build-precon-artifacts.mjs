import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

const SOURCE_PATH = path.join(repoRoot, "data", "precons", "vox-mana-precons.source.json");
const TAXONOMY_PATH = path.join(repoRoot, "data", "taxonomy", "vox-mana-precon-themes.json");
const CATALOG_PATH = path.join(repoRoot, "data", "precons", "vox-mana-precon-catalog.json");
const CATALOG_SCHEMA_PATH = path.join(repoRoot, "data", "precons", "vox-mana-precon-catalog.schema.json");

const SOURCE_SCHEMA_VERSION = "vox-mana-precons-source-v2.1";
const TAXONOMY_VERSION = "vox-mana-precon-themes-v1";
const CATALOG_SCHEMA_VERSION = "vox-mana-precon-catalog-v2.1";
const GENERATED_BY = "scripts/build/build-precon-artifacts.mjs";

const ACTIVE_FACTION_KEYS = [
  "W",
  "U",
  "B",
  "R",
  "G",
  "WU",
  "UB",
  "BR",
  "RG",
  "WG",
  "WB",
  "UR",
  "BG",
  "UG",
  "WR",
  "LOREHOLD",
  "PRISMARI",
  "QUANDRIX",
  "SILVERQUILL",
  "WITHERBLOOM",
  "TEMUR",
  "ABZAN",
  "JESKAI",
  "MARDU",
  "SULTAI",
];
const ACTIVE_FACTION_KEY_SET = new Set(ACTIVE_FACTION_KEYS);

const COLOR_TO_CODE = new Map([
  ["White", "W"],
  ["Blue", "U"],
  ["Black", "B"],
  ["Red", "R"],
  ["Green", "G"],
  ["Colorless", "C"],
]);

const CODE_TO_COLOR = new Map(
  Array.from(COLOR_TO_CODE.entries()).map(([name, code]) => [code, name])
);

const COLOR_ORDER = ["W", "U", "B", "R", "G", "C"];
const SCORE_KEYS = [
  "beginnerFriendly",
  "complexity",
  "politicalSocialPlay",
  "combatFocus",
  "comboPotential",
  "graveyardFocus",
  "tokenFocus",
  "artifactFocus",
  "enchantmentFocus",
  "spellslingerFocus",
  "rampFocus",
  "controlFocus",
  "aggression",
  "valueEngine",
];

const PRECON_CATALOG_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Vox Mana Precon Catalog",
  type: "object",
  required: ["_meta", "precons"],
  properties: {
    _meta: {
      type: "object",
      required: [
        "schema_version",
        "generated_by",
        "source_schema_version",
        "theme_taxonomy_version",
        "record_count",
      ],
    },
    precons: {
      type: "array",
      minItems: 1,
      items: { $ref: "#/$defs/precon" },
    },
  },
  $defs: {
    normalizedTheme: {
      type: "object",
      required: ["key", "displayName", "family", "tablePerception", "sourceText", "matched"],
      properties: {
        key: { type: "string" },
        displayName: { type: "string" },
        family: { type: "string", enum: ["core", "specialist"] },
        tablePerception: { type: "string" },
        sourceText: { type: "string" },
        matched: { type: "boolean" },
      },
      additionalProperties: false,
    },
    scoreSet: {
      type: "object",
      required: SCORE_KEYS,
      properties: Object.fromEntries(
        SCORE_KEYS.map((key) => [key, { type: "integer", minimum: 1, maximum: 5 }])
      ),
      additionalProperties: false,
    },
    recommendationProfile: {
      type: "object",
      required: ["recommendedFor", "notRecommendedFor", "voxManaPlacementFit"],
      properties: {
        recommendedFor: { type: "string" },
        notRecommendedFor: { type: "string" },
        voxManaPlacementFit: { type: "string" },
      },
      additionalProperties: false,
    },
    learningProfile: {
      type: "object",
      required: [
        "colorPhilosophySummary",
        "whatThisDeckTeachesAboutItsColors",
        "beginnerLesson",
        "strategyLesson",
        "voxManaBasicsPageUse",
        "relatedArchetypes",
        "relatedMechanics",
      ],
      properties: {
        colorPhilosophySummary: { type: "string" },
        whatThisDeckTeachesAboutItsColors: { type: "string" },
        beginnerLesson: { type: "string" },
        strategyLesson: { type: "string" },
        voxManaBasicsPageUse: { type: "string" },
        relatedArchetypes: { type: "array", items: { type: "string" } },
        relatedMechanics: { type: "array", items: { type: "string" } },
      },
      additionalProperties: false,
    },
    precon: {
      type: "object",
      required: [
        "slug",
        "sourceIndex",
        "sourcePage",
        "productSection",
        "deckName",
        "deckSearchQuery",
        "mainCommander",
        "commanderSearchQuery",
        "secondaryCommanders",
        "factionRefs",
        "colors",
        "colorIdentityKey",
        "colorCount",
        "rawTheme",
        "rawPrimaryTheme",
        "rawSecondaryTheme",
        "normalizedThemes",
        "deckDescription",
        "mainStrategy",
        "notesMechanicsMentioned",
        "iconicCards",
        "playstyleTags",
        "mechanics",
        "creatureTypeFocus",
        "scores",
        "recommendationProfile",
        "learningProfile",
        "matchTerms",
        "matchWords",
        "searchTerms",
      ],
      properties: {
        slug: { type: "string" },
        sourceIndex: { type: "integer", minimum: 1 },
        sourcePage: { type: "string" },
        productSection: { type: "string" },
        deckName: { type: "string" },
        deckSearchQuery: { type: "string" },
        mainCommander: { type: "string" },
        commanderSearchQuery: { type: "string" },
        secondaryCommanders: { type: "array", items: { type: "string" } },
        factionRefs: {
          type: "array",
          items: { type: "string", enum: ACTIVE_FACTION_KEYS },
        },
        colors: {
          type: "array",
          minItems: 1,
          items: { type: "string", enum: ["White", "Blue", "Black", "Red", "Green", "Colorless"] },
        },
        colorIdentityKey: { type: "string" },
        colorCount: { type: "integer", minimum: 1 },
        rawTheme: { type: "string" },
        rawPrimaryTheme: { type: "string" },
        rawSecondaryTheme: { type: "string" },
        normalizedThemes: {
          type: "object",
          required: ["primary", "secondary"],
          properties: {
            primary: { $ref: "#/$defs/normalizedTheme" },
            secondary: {
              anyOf: [
                { $ref: "#/$defs/normalizedTheme" },
                { type: "null" },
              ],
            },
          },
          additionalProperties: false,
        },
        deckDescription: { type: "string" },
        mainStrategy: { type: "string" },
        notesMechanicsMentioned: { type: "string" },
        iconicCards: { type: "array", items: { type: "string" } },
        playstyleTags: { type: "array", items: { type: "string" } },
        mechanics: { type: "array", items: { type: "string" } },
        creatureTypeFocus: {
          anyOf: [
            { type: "string" },
            { type: "null" },
          ],
        },
        scores: { $ref: "#/$defs/scoreSet" },
        recommendationProfile: { $ref: "#/$defs/recommendationProfile" },
        learningProfile: { $ref: "#/$defs/learningProfile" },
        matchTerms: { type: "array", items: { type: "string" } },
        matchWords: { type: "array", items: { type: "string" } },
        searchTerms: { type: "array", items: { type: "string" } },
      },
      additionalProperties: false,
    },
  },
};

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9+/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return normalizeText(value)
    .replace(/[+/]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values = []) {
  return [...new Set((values || []).filter(Boolean))];
}

function sanitizeText(value, pathLabel = "value") {
  const text = String(value || "");
  invariant(
    !text.includes("\uFFFD"),
    `${pathLabel} contains replacement characters. Fix the canonical precon source text before rebuilding artifacts.`
  );
  return text
    .replace(/\s+/g, " ")
    .trim();
}

function toStringList(value, pathLabel) {
  invariant(Array.isArray(value), `${pathLabel} must be an array.`);
  return value
    .map((entry, index) => {
      invariant(typeof entry === "string", `${pathLabel}[${index}] must be a string.`);
      return sanitizeText(entry, `${pathLabel}[${index}]`);
    })
    .filter(Boolean);
}

function toNonEmptyString(value, pathLabel) {
  invariant(typeof value === "string", `${pathLabel} must be a string.`);
  const trimmed = sanitizeText(value, pathLabel);
  invariant(trimmed.length > 0, `${pathLabel} must not be empty.`);
  return trimmed;
}

function toOptionalString(value, pathLabel) {
  invariant(typeof value === "string" || value == null, `${pathLabel} must be a string when present.`);
  return sanitizeText(value, pathLabel);
}

function toFactionRefs(value, pathLabel) {
  if (value == null) {
    return [];
  }

  invariant(Array.isArray(value), `${pathLabel} must be an array when present.`);
  const refs = value.map((entry, index) => {
    const ref = toNonEmptyString(entry, `${pathLabel}[${index}]`).toUpperCase();
    invariant(ACTIVE_FACTION_KEY_SET.has(ref), `${pathLabel}[${index}] must use a current Vox Mana expression key.`);
    return ref;
  });

  invariant(new Set(refs).size === refs.length, `${pathLabel} must not contain duplicate faction refs.`);
  return refs;
}

function toScoreSet(scores, pathLabel) {
  invariant(scores && typeof scores === "object" && !Array.isArray(scores), `${pathLabel} must be an object.`);
  const normalized = {};
  SCORE_KEYS.forEach((key) => {
    const value = scores[key];
    invariant(Number.isInteger(value), `${pathLabel}.${key} must be an integer.`);
    invariant(value >= 1 && value <= 5, `${pathLabel}.${key} must be between 1 and 5.`);
    normalized[key] = value;
  });
  return normalized;
}

function toRecommendationProfile(profile, pathLabel) {
  invariant(profile && typeof profile === "object" && !Array.isArray(profile), `${pathLabel} must be an object.`);
  return {
    recommendedFor: toNonEmptyString(profile.recommendedFor, `${pathLabel}.recommendedFor`),
    notRecommendedFor: toNonEmptyString(profile.notRecommendedFor, `${pathLabel}.notRecommendedFor`),
    voxManaPlacementFit: toNonEmptyString(profile.voxManaPlacementFit, `${pathLabel}.voxManaPlacementFit`),
  };
}

function toLearningProfile(profile, pathLabel) {
  invariant(profile && typeof profile === "object" && !Array.isArray(profile), `${pathLabel} must be an object.`);
  return {
    colorPhilosophySummary: toNonEmptyString(profile.colorPhilosophySummary, `${pathLabel}.colorPhilosophySummary`),
    whatThisDeckTeachesAboutItsColors: toNonEmptyString(profile.whatThisDeckTeachesAboutItsColors, `${pathLabel}.whatThisDeckTeachesAboutItsColors`),
    beginnerLesson: toNonEmptyString(profile.beginnerLesson, `${pathLabel}.beginnerLesson`),
    strategyLesson: toNonEmptyString(profile.strategyLesson, `${pathLabel}.strategyLesson`),
    voxManaBasicsPageUse: toNonEmptyString(profile.voxManaBasicsPageUse, `${pathLabel}.voxManaBasicsPageUse`),
    relatedArchetypes: toStringList(profile.relatedArchetypes, `${pathLabel}.relatedArchetypes`),
    relatedMechanics: toStringList(profile.relatedMechanics, `${pathLabel}.relatedMechanics`),
  };
}

const UNSUPPORTED_PRECON_AUTHORITY_RULES = [
  {
    label: "popularity or power ranking",
    pattern: /\b(?:(?:one of the\s+)?(?:strongest|most popular)|one of the\s+most powerful)\b/i,
  },
  {
    label: "unsupported broad consensus",
    pattern: /\b(?:widely|generally)\s+(?:regarded|considered|praised|preferred)\b/i,
  },
  {
    label: "unsupported preferred-commander consensus",
    pattern: /\bpreferred\b[^.!?]{0,48}\bcommander\b[^.!?]{0,24}\b(?:for many|overall)\b/i,
  },
  {
    label: "entity-level primacy claim",
    pattern: /\b(?:best|most aggressive|most versatile|most beloved|most iconic)\b(?:\s+[\w'-]+){0,7}\s+\b(?:commander|precon|deck|product|support)\b/i,
  },
  {
    label: "entity-level reverse primacy claim",
    pattern: /\b(?:commander|precon|deck|product|support)\b[^.!?]{0,32}\b(?:is|are|remains|as|among)\s+(?:the\s+)?(?:best|most aggressive|most versatile|most beloved|most iconic)\b/i,
  },
  {
    label: "editorial product primacy",
    pattern: /\b(?:standout|quintessential|definitive|landmark)\b[^.!?]{0,72}\b(?:commander|precon|deck|product|support|example|archetype)\b/i,
  },
  {
    label: "unsupported considered-status claim",
    pattern: /\bconsidered\b[^.!?]{0,72}\b(?:commander|precon|deck|product|archetype)\b/i,
  },
  {
    label: "six-color misconception",
    pattern: /\btechnically\s+six\b/i,
  },
];

const BASICS_PAGE_PRIMACY_PATTERN = /\b(?:best|definitive|perfect|clearest|strongest|most)\b/i;

function preconEditorialFields(record) {
  return [
    ["deckDescription", record.deckDescription],
    ["mainStrategy", record.mainStrategy],
    ["recommendationProfile.recommendedFor", record.recommendationProfile?.recommendedFor],
    ["recommendationProfile.notRecommendedFor", record.recommendationProfile?.notRecommendedFor],
    ["recommendationProfile.voxManaPlacementFit", record.recommendationProfile?.voxManaPlacementFit],
    ["learningProfile.colorPhilosophySummary", record.learningProfile?.colorPhilosophySummary],
    ["learningProfile.whatThisDeckTeachesAboutItsColors", record.learningProfile?.whatThisDeckTeachesAboutItsColors],
    ["learningProfile.beginnerLesson", record.learningProfile?.beginnerLesson],
    ["learningProfile.strategyLesson", record.learningProfile?.strategyLesson],
    ["learningProfile.voxManaBasicsPageUse", record.learningProfile?.voxManaBasicsPageUse],
  ];
}

function assertNoUnsupportedPreconAuthority(record, pathLabel) {
  const violations = [];

  preconEditorialFields(record).forEach(([fieldPath, value]) => {
    const text = String(value || "");
    UNSUPPORTED_PRECON_AUTHORITY_RULES.forEach(({ label, pattern }) => {
      if (pattern.test(text)) {
        violations.push(`${pathLabel}.${fieldPath}: ${label}`);
      }
    });

    if (fieldPath === "learningProfile.voxManaBasicsPageUse" && BASICS_PAGE_PRIMACY_PATTERN.test(text)) {
      violations.push(`${pathLabel}.${fieldPath}: unsupported basics-page primacy`);
    }
  });

  invariant(
    violations.length === 0,
    `Canonical precon source contains unsupported authority language:\n- ${violations.join("\n- ")}`
  );
}

export function normalizeColorIdentity(colors, pathLabel = "colors") {
  const names = toStringList(colors, pathLabel);
  invariant(names.length > 0, `${pathLabel} must contain at least one color.`);
  const codes = unique(names.map((color) => {
    const code = COLOR_TO_CODE.get(color);
    invariant(code, `${pathLabel} contains unsupported color "${color}".`);
    return code;
  }));
  invariant(codes.length === names.length, `${pathLabel} must not contain duplicate colors.`);
  invariant(!(codes.includes("C") && codes.length > 1), `${pathLabel} cannot mix Colorless with colored mana.`);

  const orderedCodes = COLOR_ORDER.filter((code) => codes.includes(code));
  return {
    names: orderedCodes.map((code) => CODE_TO_COLOR.get(code)),
    codes: orderedCodes,
    key: orderedCodes.join(""),
    count: orderedCodes.length,
  };
}

function normalizeThemeEntry(entry, index) {
  const pathLabel = `themes[${index}]`;
  invariant(entry && typeof entry === "object" && !Array.isArray(entry), `${pathLabel} must be an object.`);
  return {
    key: toNonEmptyString(entry.key, `${pathLabel}.key`),
    displayName: toNonEmptyString(entry.display_name, `${pathLabel}.display_name`),
    family: (() => {
      const family = toNonEmptyString(entry.family, `${pathLabel}.family`);
      invariant(["core", "specialist"].includes(family), `${pathLabel}.family must be "core" or "specialist".`);
      return family;
    })(),
    aliases: toStringList(entry.aliases, `${pathLabel}.aliases`),
    matchTerms: toStringList(entry.match_terms, `${pathLabel}.match_terms`),
    readingTags: toStringList(entry.reading_tags, `${pathLabel}.reading_tags`),
    tablePerception: toOptionalString(entry.table_perception, `${pathLabel}.table_perception`),
  };
}

function buildThemeLookup(taxonomy) {
  invariant(taxonomy && typeof taxonomy === "object" && !Array.isArray(taxonomy), "Theme taxonomy must be an object.");
  invariant(taxonomy._meta?.version === TAXONOMY_VERSION, `Theme taxonomy version must be ${TAXONOMY_VERSION}.`);
  const themes = (taxonomy.themes || []).map(normalizeThemeEntry);
  invariant(themes.length > 0, "Theme taxonomy must include at least one theme.");

  const byKey = new Map();
  const exact = new Map();
  const searchable = [];

  themes.forEach((theme) => {
    byKey.set(theme.key, theme);
    const terms = unique([
      theme.key,
      theme.displayName,
      ...theme.aliases,
      ...theme.matchTerms,
    ]).map(normalizeText).filter(Boolean);

    terms.forEach((term) => {
      if (!exact.has(term)) {
        exact.set(term, theme);
      }
    });

    searchable.push({
      theme,
      terms: terms.sort((left, right) => right.length - left.length),
    });
  });

  return { byKey, exact, searchable };
}

function createResolvedTheme(theme, sourceText, matched) {
  return {
    key: theme.key,
    displayName: theme.displayName,
    family: theme.family,
    tablePerception: theme.tablePerception,
    sourceText,
    matched,
  };
}

export function resolveNormalizedTheme(rawValue, themeLookup) {
  const sourceText = String(rawValue || "").trim();
  if (!sourceText) {
    return null;
  }

  const normalized = normalizeText(sourceText);
  if (!normalized) {
    return null;
  }

  if (themeLookup.exact.has(normalized)) {
    return createResolvedTheme(themeLookup.exact.get(normalized), sourceText, true);
  }

  let best = null;
  themeLookup.searchable.forEach(({ theme, terms }) => {
    let score = 0;
    let longest = 0;
    terms.forEach((term) => {
      if (!term) return;
      if (normalized === term) {
        score += 4;
        longest = Math.max(longest, term.length);
      } else if (normalized.includes(term) || term.includes(normalized)) {
        score += 2;
        longest = Math.max(longest, term.length);
      }
    });

    if (score > 0 && (!best || score > best.score || (score === best.score && longest > best.longest))) {
      best = { theme, score, longest };
    }
  });

  if (best) {
    return createResolvedTheme(best.theme, sourceText, true);
  }

  return {
    key: slugify(sourceText),
    displayName: sourceText,
    family: "specialist",
    tablePerception: "",
    sourceText,
    matched: false,
  };
}

function sanitizeCreatureTypeFocus(value, pathLabel) {
  invariant(typeof value === "string" || value == null, `${pathLabel} must be a string or null.`);
  if (value == null) {
    return null;
  }

  const text = sanitizeText(value, pathLabel);
  if (!text || normalizeText(text) === "unclear from source") {
    return null;
  }

  return text;
}

function collectPhraseTerms(values = []) {
  return unique((values || []).map((value) => normalizeText(value)).filter((value) => value.length > 1));
}

function collectWordTerms(phrases = []) {
  return unique(
    (phrases || [])
      .flatMap((phrase) => phrase.split(/\s+/))
      .map((part) => part.trim())
      .filter((part) => part.length > 2)
  );
}

function buildMatchTerms(record, primaryTheme, secondaryTheme) {
  const phrases = collectPhraseTerms([
    record.theme,
    record.primaryTheme,
    record.secondaryTheme,
    primaryTheme?.displayName || "",
    secondaryTheme?.displayName || "",
    ...record.playstyleTags,
    ...record.mechanics,
    ...record.learningProfile.relatedArchetypes,
    ...record.learningProfile.relatedMechanics,
    record.creatureTypeFocus,
  ]);

  return {
    matchTerms: phrases,
    matchWords: collectWordTerms(phrases),
  };
}

function buildSearchTerms(record, primaryTheme, secondaryTheme) {
  const phrases = collectPhraseTerms([
    record.deckName,
    record.mainCommander,
    ...record.secondaryCommanders,
    record.productSection,
    record.theme,
    record.primaryTheme,
    record.secondaryTheme,
    primaryTheme?.displayName || "",
    secondaryTheme?.displayName || "",
    ...record.playstyleTags,
    ...record.mechanics,
    record.creatureTypeFocus,
  ]);
  return phrases;
}

export function normalizePreconSourceRecord(record, index, themeLookup) {
  const pathLabel = `precons[${index}]`;
  invariant(record && typeof record === "object" && !Array.isArray(record), `${pathLabel} must be an object.`);

  const normalizedSource = {
    sourcePage: toNonEmptyString(record.sourcePage, `${pathLabel}.sourcePage`),
    productSection: toNonEmptyString(record.productSection, `${pathLabel}.productSection`),
    deckName: toNonEmptyString(record.deckName, `${pathLabel}.deckName`),
    mainCommander: toNonEmptyString(record.mainCommander, `${pathLabel}.mainCommander`),
    secondaryCommanders: toStringList(record.secondaryCommanders, `${pathLabel}.secondaryCommanders`),
    factionRefs: toFactionRefs(record.factionRefs, `${pathLabel}.factionRefs`),
    colors: normalizeColorIdentity(record.colors, `${pathLabel}.colors`),
    theme: toNonEmptyString(record.theme, `${pathLabel}.theme`),
    deckDescription: toNonEmptyString(record.deckDescription, `${pathLabel}.deckDescription`),
    iconicCards: toStringList(record.iconicCards, `${pathLabel}.iconicCards`),
    notesMechanicsMentioned: toNonEmptyString(record.notesMechanicsMentioned, `${pathLabel}.notesMechanicsMentioned`),
    playstyleTags: toStringList(record.playstyleTags, `${pathLabel}.playstyleTags`),
    primaryTheme: toNonEmptyString(record.primaryTheme, `${pathLabel}.primaryTheme`),
    secondaryTheme: toOptionalString(record.secondaryTheme, `${pathLabel}.secondaryTheme`),
    mainStrategy: toNonEmptyString(record.mainStrategy, `${pathLabel}.mainStrategy`),
    mechanics: toStringList(record.mechanics, `${pathLabel}.mechanics`),
    creatureTypeFocus: sanitizeCreatureTypeFocus(record.creatureTypeFocus, `${pathLabel}.creatureTypeFocus`),
    scores: toScoreSet(record.scores, `${pathLabel}.scores`),
    recommendationProfile: toRecommendationProfile(record.recommendationProfile, `${pathLabel}.recommendationProfile`),
    learningProfile: toLearningProfile(record.learningProfile, `${pathLabel}.learningProfile`),
  };

  assertNoUnsupportedPreconAuthority(normalizedSource, pathLabel);

  const primaryTheme = resolveNormalizedTheme(normalizedSource.primaryTheme, themeLookup);
  invariant(primaryTheme, `${pathLabel}.primaryTheme could not be normalized.`);
  const secondaryTheme = resolveNormalizedTheme(normalizedSource.secondaryTheme, themeLookup);
  const { matchTerms, matchWords } = buildMatchTerms(normalizedSource, primaryTheme, secondaryTheme);
  const searchTerms = buildSearchTerms(normalizedSource, primaryTheme, secondaryTheme);

  return {
    slug: slugify(`${normalizedSource.deckName}-${normalizedSource.mainCommander}`),
    sourceIndex: index + 1,
    sourcePage: normalizedSource.sourcePage,
    productSection: normalizedSource.productSection,
    deckName: normalizedSource.deckName,
    deckSearchQuery: normalizedSource.deckName,
    mainCommander: normalizedSource.mainCommander,
    commanderSearchQuery: normalizedSource.mainCommander,
    secondaryCommanders: normalizedSource.secondaryCommanders,
    factionRefs: normalizedSource.factionRefs,
    colors: normalizedSource.colors.names,
    colorIdentityKey: normalizedSource.colors.key,
    colorCount: normalizedSource.colors.count,
    rawTheme: normalizedSource.theme,
    rawPrimaryTheme: normalizedSource.primaryTheme,
    rawSecondaryTheme: normalizedSource.secondaryTheme,
    normalizedThemes: {
      primary: primaryTheme,
      secondary: secondaryTheme,
    },
    deckDescription: normalizedSource.deckDescription,
    mainStrategy: normalizedSource.mainStrategy,
    notesMechanicsMentioned: normalizedSource.notesMechanicsMentioned,
    iconicCards: normalizedSource.iconicCards,
    playstyleTags: normalizedSource.playstyleTags,
    mechanics: normalizedSource.mechanics,
    creatureTypeFocus: normalizedSource.creatureTypeFocus,
    scores: normalizedSource.scores,
    recommendationProfile: normalizedSource.recommendationProfile,
    learningProfile: normalizedSource.learningProfile,
    matchTerms,
    matchWords,
    searchTerms,
  };
}

export function buildPreconCatalog(sourceCatalog, themeTaxonomy) {
  invariant(sourceCatalog && typeof sourceCatalog === "object" && !Array.isArray(sourceCatalog), "Precon source catalog must be an object.");
  invariant(sourceCatalog._meta?.schema_version === SOURCE_SCHEMA_VERSION, `Source schema version must be ${SOURCE_SCHEMA_VERSION}.`);
  invariant(Array.isArray(sourceCatalog.precons), "Precon source catalog must expose a precons array.");
  invariant(
    Number(sourceCatalog._meta?.record_count) === sourceCatalog.precons.length,
    "Precon source catalog record_count must match precons length."
  );

  const themeLookup = buildThemeLookup(themeTaxonomy);
  const precons = sourceCatalog.precons.map((record, index) => normalizePreconSourceRecord(record, index, themeLookup));

  return {
    _meta: {
      schema_version: CATALOG_SCHEMA_VERSION,
      generated_by: GENERATED_BY,
      source_schema_version: SOURCE_SCHEMA_VERSION,
      theme_taxonomy_version: TAXONOMY_VERSION,
      record_count: precons.length,
    },
    precons,
  };
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

export async function buildPreconArtifacts() {
  const [sourceCatalog, themeTaxonomy] = await Promise.all([
    readJson(SOURCE_PATH),
    readJson(TAXONOMY_PATH),
  ]);
  const catalog = buildPreconCatalog(sourceCatalog, themeTaxonomy);

  await writeJson(CATALOG_PATH, catalog);
  await writeJson(CATALOG_SCHEMA_PATH, PRECON_CATALOG_SCHEMA);

  console.log(`Built ${catalog.precons.length} precon recommendation records.`);
  console.log(`Wrote ${path.relative(repoRoot, CATALOG_PATH)}`);
  console.log(`Wrote ${path.relative(repoRoot, CATALOG_SCHEMA_PATH)}`);

  return catalog;
}

async function main() {
  await buildPreconArtifacts();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

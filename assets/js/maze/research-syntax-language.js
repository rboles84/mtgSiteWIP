const COLOR_NAMES = { w: "white", u: "blue", b: "black", r: "red", g: "green", c: "colorless" };
const RARITY_NAMES = { c: "common", u: "uncommon", r: "rare", m: "mythic" };
const COLOR_IDENTITY_ORDER = ["w", "u", "b", "r", "g", "c"];
const DISPLAY_CONTROL_FIELDS = new Set(["game", "prefer", "unique", "order", "sort", "display", "direction", "include"]);
const FUNCTIONAL_TAG_FIELDS = new Set(["otag", "function", "oracletag"]);
const FAMILY_FIELDS = new Set(["g", "group"]);
const IN_SCOPE_FALLBACK_FIELDS = new Set([
  "t",
  "type",
  "c",
  "color",
  "id",
  "ci",
  "identity",
  "s",
  "e",
  "set",
  "edition",
  "g",
  "group",
  "is",
  "legal",
  "f",
  "format",
  "game",
  "prefer",
  "unique",
  "order",
  "sort",
  "display",
  "direction",
  "include",
  "otag",
  "function",
  "oracletag"
]);
const FUNCTIONAL_TAG_NAMES = new Map([
  ["board-wipe", "board wipes"],
  ["counterspell", "counterspells"],
  ["draw", "card draw"],
  ["graveyard-recursion", "graveyard recursion effects"],
  ["mana-rock", "mana rock effects"],
  ["ramp", "ramp"],
  ["treasure", "treasure effects"]
]);
const IDENTITY_NAMES = new Map([
  ["w", "white"],
  ["u", "blue"],
  ["b", "black"],
  ["r", "red"],
  ["g", "green"],
  ["c", "colorless"],
  ["wu", "Azorius"],
  ["ub", "Dimir"],
  ["br", "Rakdos"],
  ["rg", "Gruul"],
  ["wg", "Selesnya"],
  ["wb", "Orzhov"],
  ["ur", "Izzet"],
  ["bg", "Golgari"],
  ["ug", "Simic"],
  ["wr", "Boros"],
  ["wug", "Bant"],
  ["wub", "Esper"],
  ["ubr", "Grixis"],
  ["brg", "Jund"],
  ["wrg", "Naya"],
  ["wbg", "Abzan"],
  ["ubg", "Sultai"],
  ["urg", "Temur"],
  ["wur", "Jeskai"],
  ["wbr", "Mardu"],
  ["wubr", "Yore"],
  ["ubrg", "Glint"],
  ["wbrg", "Dune"],
  ["wurg", "Ink"],
  ["wubg", "Witch"],
  ["wubrg", "Five-Color"]
]);
const DEFAULT_SET_DISPLAY = new Map([
  ["blb", "Bloomburrow"],
  ["fin", "Final Fantasy"]
]);
const DEFAULT_SET_FAMILIES = [
  {
    label: "Bloomburrow product family",
    codes: ["blb", "ablb", "blc", "pblb", "tblb", "yblb"],
    aliases: ["blb"]
  },
  {
    label: "Final Fantasy product family",
    codes: ["fin", "afin", "fca", "fic", "pfin", "pss5", "rfin", "tfin", "wfin"],
    aliases: ["fin"]
  }
];

let setDisplayByCode = new Map();
let familyDisplayByCodeKey = new Map();
let familyDisplayByCode = new Map();

resetSyntaxDisplayLookup();

/**
 * Seeds syntax display labels from Scryfall grounding data.
 * @param {object|null} grounding - Checked-in Scryfall grounding artifact.
 */
export function setScryfallSyntaxDisplayLookup(grounding) {
  resetSyntaxDisplayLookup();
  if (!grounding || typeof grounding !== "object") return;

  const setsByCode = grounding.sets?.byCode || {};
  Object.entries(setsByCode).forEach(([code, set]) => {
    registerSetDisplay(code, set?.name);
  });

  const families = grounding.setFamilies || {};
  Object.entries(families).forEach(([key, family]) => {
    const codes = Array.isArray(family?.setCodes) ? family.setCodes : [];
    const label = family?.name || (family?.displayName ? `${family.displayName} product family` : "");
    registerFamilyDisplay(codes, label, [
      key,
      family?.id,
      family?.code,
      family?.mainSetCode,
      family?.baseSetCode
    ]);
  });
}

/**
 * Translates common Scryfall syntax into plain Smart Search text.
 * @param {string} query - Raw Scryfall query.
 * @returns {object} Translation result.
 */
export function translateScryfallSyntaxToPlainText(query) {
  const terms = splitTopLevelTerms(query);
  if (!terms.length) return { text: "", translated: false };

  const parts = createPhraseParts();
  const unhandled = [];
  terms.forEach((term) => {
    if (!applyTerm(term, parts)) unhandled.push(term);
  });

  const text = assemblePhrase(parts, unhandled);
  return {
    text: text || String(query || "").trim(),
    translated: Boolean(text),
    unhandled
  };
}

/**
 * Creates the phrase buckets used during syntax translation.
 * @returns {object} Empty phrase buckets.
 */
function createPhraseParts() {
  return {
    colors: [],
    types: [],
    keywords: [],
    formats: [],
    rarities: [],
    mana: [],
    printings: [],
    sets: [],
    functional: [],
    oracle: [],
    flavor: [],
    exclusions: [],
    other: []
  };
}

/**
 * Applies one query term to translation buckets.
 * @param {string} term - Scryfall query term.
 * @param {object} parts - Mutable phrase buckets.
 * @returns {boolean} True when the term was translated.
 */
function applyTerm(term, parts) {
  if (isOrGroup(term)) return applyOrGroup(term, parts);

  const parsed = parseSimpleTerm(term);
  if (!parsed) return false;
  if (parsed.omit) return true;
  pushUnique(parts[parsed.kind], parsed.text);
  return true;
}

/**
 * Translates a parenthesized OR group when the grouped terms share one kind.
 * @param {string} term - Parenthesized OR group.
 * @param {object} parts - Mutable phrase buckets.
 * @returns {boolean} True when the group was translated.
 */
function applyOrGroup(term, parts) {
  const inner = term.slice(1, -1);
  const setFamily = parseSetFamilyGroup(inner);
  if (setFamily) {
    pushUnique(parts[setFamily.kind], setFamily.text);
    return true;
  }

  const parsed = splitOrTerms(inner).map(parseSimpleTerm);
  if (!parsed.length || parsed.some((item) => !item)) return false;
  if (parsed.every((item) => item.omit)) return true;
  if (parsed.some((item) => item.omit)) return false;

  const kinds = [...new Set(parsed.map((item) => item.kind))];
  if (kinds.length !== 1) return false;

  const kind = kinds[0];
  const phrase = joinOrHuman(parsed.map((item) => item.text));
  pushUnique(parts[kind], phrase);
  return true;
}

/**
 * Parses one simple Scryfall term into a phrase bucket item.
 * @param {string} term - Scryfall query term.
 * @returns {object|null} Parsed term or null.
 */
function parseSimpleTerm(term) {
  const clean = unwrapSingleGroup(String(term || "").trim());
  const negated = clean.startsWith("-");
  const value = negated ? clean.slice(1) : clean;

  const color = parseColorTerm(value, negated);
  if (color) return color;

  const identity = parseIdentityTerm(value, negated);
  if (identity) {
    return identity;
  }

  const type = value.match(/^(?:t|type):(.+)$/i);
  if (type) {
    const typeText = humanizeFieldValue(type[1]);
    return { kind: negated ? "exclusions" : "types", text: negated ? `excluding ${typeText}` : typeText };
  }

  const isTerm = value.match(/^is:(.+)$/i);
  if (isTerm) {
    return describeIsTerm(isTerm[1], negated);
  }

  const setTerm = parseSetTerm(value, negated);
  if (setTerm) return setTerm;

  const legalOrFormat = parseLegalOrFormatTerm(value, negated);
  if (legalOrFormat) return legalOrFormat;

  const printing = parsePrintingTerm(value, negated);
  if (printing) return printing;

  const displayControl = parseDisplayControlTerm(value);
  if (displayControl) return displayControl;

  const functionalTag = parseFunctionalTagTerm(value, negated);
  if (functionalTag) return functionalTag;

  const negatedPrintedIn = parseNegatedPrintedInTerm(value, negated);
  if (negatedPrintedIn) return negatedPrintedIn;

  const keyword = value.match(/^kw:(.+)$/i);
  if (keyword) {
    return { kind: "keywords", text: humanizeFieldValue(keyword[1]) };
  }

  const rarity = value.match(/^r:(\w+)$/i);
  if (rarity) {
    return { kind: "rarities", text: RARITY_NAMES[rarity[1].toLowerCase()] || rarity[1].toLowerCase() };
  }

  const mana = value.match(/^mv(<=|>=|=|<|>|:)(\d+)$/i);
  if (mana) {
    return { kind: "mana", text: `mana value ${operatorToWords(mana[1], mana[2])}` };
  }

  const oracle = value.match(/^o:(.+)$/i);
  if (oracle) {
    return describeOracleTerm(oracle[1], negated);
  }

  const flavor = value.match(/^ft:(.+)$/i);
  if (flavor) {
    return describeFlavorTerm(flavor[1], negated);
  }

  return null;
}

/**
 * Parses Commander color identity terms.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the original term was negated.
 * @returns {object|null} Parsed identity item or null.
 */
function parseIdentityTerm(value, negated) {
  const identity = value.match(/^(?:id|ci|identity)(<=|>=|=|:)([wubrgc]+)$/i);
  if (!identity) return null;

  const op = identity[1];
  const code = normalizeIdentityCode(identity[2]);
  const identityName = describeIdentityName(code);
  if (negated) {
    const negativeText = op === "<="
      ? `outside ${identityName} color identity`
      : `not ${identityName} color identity`;
    return { kind: "exclusions", text: negativeText };
  }
  if (op === "<=") return { kind: "colors", text: `within ${identityName} color identity` };
  if (op === ">=") return { kind: "colors", text: `including ${describeIdentityColors(code)}` };
  return { kind: "colors", text: `${identityName} color identity` };
}

/**
 * Describes an `is:` Scryfall predicate.
 * @param {string} rawValue - Raw predicate value.
 * @param {boolean} negated - Whether the predicate is negated.
 * @returns {{kind: string, text: string}} Translation bucket entry.
 */
function describeIsTerm(rawValue, negated) {
  const value = unquote(rawValue).toLowerCase();
  if (value === "commander") {
    return {
      kind: negated ? "exclusions" : "types",
      text: negated ? "excluding commander candidates" : "commander candidates"
    };
  }
  if (value === "firstprinting") {
    return {
      kind: negated ? "exclusions" : "printings",
      text: negated ? "excluding cards in their first printing" : "in their first printing"
    };
  }
  return {
    kind: negated ? "exclusions" : "other",
    text: negated ? `excluding ${value}` : value
  };
}

/**
 * Parses card color terms.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the original term was negated.
 * @returns {object|null} Parsed color item or null.
 */
function parseColorTerm(value, negated) {
  const color = value.match(/^(?:c|color)(:|=|<=|>=)([wubrgc]+)$/i);
  if (!color) return null;

  const op = color[1];
  const words = colorsToWords(color[2]);
  if (negated) return { kind: "exclusions", text: `not ${words}` };
  if (op === "=") return { kind: "colors", text: `exactly ${words}` };
  if (op === "<=") return { kind: "colors", text: `${colorsToWords(color[2], "or")} with no outside colors` };
  if (op === ">=") return { kind: "colors", text: `at least ${words}` };
  return { kind: "colors", text: words };
}

/**
 * Parses known set, edition, and product-family fields.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the original term was negated.
 * @returns {object|null} Parsed set/family item or null.
 */
function parseSetTerm(value, negated) {
  const setTerm = value.match(/^(s|e|set|edition|g|group):([a-z0-9_-]+)$/i);
  if (!setTerm) return null;

  const field = setTerm[1].toLowerCase();
  const code = normalizeSetCode(setTerm[2]);
  if (!code) return null;

  if (FAMILY_FIELDS.has(field)) {
    const label = getFamilyLabelByCode(code);
    return {
      kind: negated ? "exclusions" : "sets",
      text: describeFamilyLabel(label, code, negated)
    };
  }

  const label = getSetLabelByCode(code);
  return {
    kind: negated ? "exclusions" : "sets",
    text: describeSetLabel(label, code, negated)
  };
}

/**
 * Parses legal and format fields.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the original term was negated.
 * @returns {object|null} Parsed legality item or null.
 */
function parseLegalOrFormatTerm(value, negated) {
  const legal = value.match(/^(legal|f|format):([a-z0-9_-]+)$/i);
  if (!legal) return null;

  const format = humanizeFieldValue(legal[2]);
  const phrase = `${format} legal`;
  return {
    kind: negated ? "exclusions" : "formats",
    text: negated ? `not ${phrase}` : phrase
  };
}

/**
 * Parses release-year and printing-artwork terms into Plain Reading language.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the term is negated.
 * @returns {{kind: string, text: string}|null} Printing phrase, or null.
 */
function parsePrintingTerm(value, negated) {
  const year = value.match(/^year(?::|=)(\d{4})$/i);
  if (year) {
    return {
      kind: negated ? "exclusions" : "printings",
      text: negated ? `excluding cards printed in ${year[1]}` : `printed in ${year[1]}`
    };
  }

  if (/^new:art$/i.test(value)) {
    return {
      kind: negated ? "exclusions" : "printings",
      text: negated ? "excluding cards that introduced new art" : "that introduced new art"
    };
  }

  return null;
}

/**
 * Omits display-only control fields from Plain Reading.
 * @param {string} value - Non-negated query term.
 * @returns {object|null} Omit marker or null.
 */
function parseDisplayControlTerm(value) {
  const display = value.match(/^([a-z]+):(.+)$/i);
  if (!display) return null;
  if (!DISPLAY_CONTROL_FIELDS.has(display[1].toLowerCase())) return null;
  return { omit: true };
}

/**
 * Parses functional Oracle-tag aliases into human display phrases.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the original term was negated.
 * @returns {object|null} Parsed functional-tag item or null.
 */
function parseFunctionalTagTerm(value, negated) {
  const functionalTag = value.match(/^(otag|function|oracletag):([a-z0-9_-]+)$/i);
  if (!functionalTag) return null;
  const phrase = describeFunctionalTag(functionalTag[2]);
  return {
    kind: negated ? "exclusions" : "functional",
    text: negated ? `excluding ${phrase}` : phrase
  };
}

/**
 * Handles the only printed-in negation currently in scope.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the original term was negated.
 * @returns {object|null} Parsed exclusion item or null.
 */
function parseNegatedPrintedInTerm(value, negated) {
  if (!negated) return null;
  const printedIn = value.match(/^in:([a-z0-9_-]+)$/i);
  if (!printedIn) return null;
  const code = normalizeSetCode(printedIn[1]);
  const label = getSetLabelByCode(code);
  return { kind: "exclusions", text: describeSetLabel(label, code, true) };
}

/**
 * Parses set/family OR groups and collapses exact known families.
 * @param {string} inner - Parenthesized OR group content.
 * @returns {object|null} Parsed set group or null.
 */
function parseSetFamilyGroup(inner) {
  const terms = splitOrTerms(inner);
  if (!terms.length) return null;

  const parsed = terms.map(parseSetGroupTerm);
  if (parsed.some((item) => !item)) return null;

  const codes = parsed.flatMap((item) => item.codes);
  const familyLabel = getFamilyLabelByCodeSet(codes);
  if (familyLabel) {
    return { kind: "sets", text: describeFamilyLabel(familyLabel, "", false) };
  }

  return { kind: "sets", text: joinOrHuman(parsed.map((item) => item.text)) };
}

/**
 * Parses one set/family term inside an OR group.
 * @param {string} term - OR group term.
 * @returns {object|null} Parsed set group term or null.
 */
function parseSetGroupTerm(term) {
  const clean = unwrapSingleGroup(String(term || "").trim());
  if (!clean || clean.startsWith("-")) return null;
  const match = clean.match(/^(s|e|set|edition|g|group):([a-z0-9_-]+)$/i);
  if (!match) return null;

  const field = match[1].toLowerCase();
  const code = normalizeSetCode(match[2]);
  if (!code) return null;

  if (FAMILY_FIELDS.has(field)) {
    const familyLabel = getFamilyLabelByCode(code);
    return {
      codes: familyCodesByLabel(familyLabel) || [code],
      text: describeFamilyLabel(familyLabel, code, false)
    };
  }

  return {
    codes: [code],
    text: describeSetLabel(getSetLabelByCode(code), code, false)
  };
}

/**
 * Describes a positive or negated Oracle text term in plain English.
 * @param {string} rawValue - Raw Oracle value.
 * @param {boolean} negated - Whether the term was negated.
 * @returns {{kind: string, text: string}} Normalized translation bucket entry.
 */
function describeOracleTerm(rawValue, negated) {
  const phrase = describeOraclePhrase(rawValue);
  return {
    kind: negated ? "exclusions" : "oracle",
    text: negated ? `excluding ${phrase}` : phrase
  };
}

/**
 * Describes a flavor text term in plain English.
 * @param {string} rawValue - Raw flavor text value.
 * @param {boolean} negated - Whether the term was negated.
 * @returns {{kind: string, text: string}} Normalized translation bucket entry.
 */
function describeFlavorTerm(rawValue, negated) {
  const phrase = describeFlavorPhrase(rawValue);
  return {
    kind: negated ? "exclusions" : "flavor",
    text: negated ? `excluding ${phrase}` : phrase
  };
}

/**
 * Describes flavor text or regex text in plain English.
 * @param {string} rawValue - Raw flavor payload.
 * @returns {string} Human-readable flavor text description.
 */
function describeFlavorPhrase(rawValue) {
  const value = unquote(String(rawValue || "").trim());
  const clean = cleanOracleSnippet(/^\/.+\/$/.test(value) ? value.slice(1, -1) : value);
  return clean ? `flavor text containing ${clean}` : "flavor text";
}

/**
 * Describes Oracle text or regex text in plain English.
 * @param {string} rawValue - Raw Oracle payload.
 * @returns {string} Human-readable Oracle description.
 */
function describeOraclePhrase(rawValue) {
  const value = unquote(String(rawValue || "").trim());
  if (!value) return "oracle text";
  if (/^\/.+\/$/.test(value)) return describeOracleRegexPhrase(value.slice(1, -1));
  return describeOraclePlainPhrase(value);
}

/**
 * Describes literal Oracle text in plain English.
 * @param {string} value - Literal Oracle text.
 * @returns {string} Human-readable Oracle description.
 */
function describeOraclePlainPhrase(value) {
  const clean = cleanOracleSnippet(value);
  if (!clean) return "oracle text";
  return `oracle text containing ${clean}`;
}

/**
 * Describes Oracle regex in plain English.
 * @param {string} pattern - Regex body without slashes.
 * @returns {string} Human-readable Oracle regex description.
 */
function describeOracleRegexPhrase(pattern) {
  const body = String(pattern || "");
  const normalized = body.toLowerCase();

  if (/\bnamed\s+\(\?!lands\)/i.test(body)) {
    return "Oracle text matching named cards while avoiding lands";
  }
  if (/search your\s+\(hand\|library\)/i.test(body)) {
    return "Oracle text matching search your hand or library";
  }
  if (/destroy.*creature/i.test(body)) {
    return "Oracle text matching destroy creature";
  }
  if (/^draft$/i.test(cleanOracleSnippet(body))) {
    return "oracle text containing draft";
  }
  if (/a deck can have/i.test(body)) {
    return "oracle text matching deck-construction exception wording";
  }
  if (/named ~ in your graveyard/i.test(body)) {
    return "oracle text matching named-card graveyard loops";
  }
  if (/creatures named .*can't attack or block/i.test(body)) {
    return "oracle text matching named-creature attack or block restrictions";
  }
  if (/named/.test(normalized) && /\|/.test(body)) {
    return "oracle text matching common named-card false positives";
  }
  if (/search your/.test(normalized) && /\|/.test(body)) {
    return "oracle text matching search your hand or library";
  }

  const clean = cleanOracleSnippet(body);
  return clean ? `oracle text matching ${clean}` : "oracle text matching a regex";
}

/**
 * Normalizes Oracle text snippets for readable prose.
 * @param {string} value - Raw text or regex body.
 * @returns {string} Cleaned text.
 */
function cleanOracleSnippet(value) {
  return String(value || "")
    .replace(/\(\?!lands\)/gi, " avoiding lands ")
    .replace(/\(\?:/g, "(")
    .replace(/\|/g, " or ")
    .replace(/\.\*/g, " any text ")
    .replace(/\\\//g, "/")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\?/g, "?")
    .replace(/\\\./g, ".")
    .replace(/\\\+/g, "+")
    .replace(/\\x20/g, " ")
    .replace(/[{}[\]^$]/g, " ")
    .replace(/[:]/g, " ")
    .replace(/[<>=]/g, " ")
    .replace(/[^A-Za-z0-9'’/+-]+/g, " ")
    .replace(/\bcan t\b/gi, "can't")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Assembles translated phrase buckets into one readable query.
 * @param {object} parts - Phrase buckets.
 * @param {string[]} unhandled - Terms that could not be translated.
 * @returns {string} Plain-language search phrase.
 */
function assemblePhrase(parts, unhandled) {
  const exactCommander = exactCommanderPhrase(parts);
  if (exactCommander && !unhandled.length) return exactCommander;

  const segments = [];
  if (parts.colors.length) segments.push(joinHuman(parts.colors));
  if (parts.types.length) segments.push(joinTypePhrases(parts.types));
  if (parts.functional.length) segments.push(functionalPhrase(parts.functional, segments.length > 0));
  if (parts.sets.length) segments.push(joinHuman(parts.sets));
  if (parts.oracle.length) segments.push(joinHuman(parts.oracle));
  if (parts.flavor.length) segments.push(joinHuman(parts.flavor));
  if (parts.exclusions.length) segments.push(joinHuman(parts.exclusions));
  if (parts.formats.length) segments.push(joinHuman(parts.formats));
  if (parts.rarities.length) segments.push(joinHuman(parts.rarities));
  if (parts.mana.length) segments.push(joinHuman(parts.mana));
  if (parts.printings.length) segments.push(`cards ${parts.printings.join(" ")}`);
  if (parts.keywords.length) segments.push(`with ${joinHuman(parts.keywords)}`);
  if (!segments.length && unhandled.length) return "";
  if (unhandled.length) {
    const describedUnhandled = unhandled.map(describeUnhandledTerm).filter(Boolean);
    if (describedUnhandled.length) segments.push(`plus ${describedUnhandled.join(" ")}`);
  }
  return segments.join(" ").replace(/\s+/g, " ").trim();
}

/**
 * Joins type-like descriptors without turning "legendary creature" into a list.
 * @param {string[]} values - Type descriptors.
 * @returns {string} Human type phrase.
 */
function joinTypePhrases(values) {
  const clean = values.filter(Boolean);
  if (clean.length <= 1) return clean[0] || "";
  if (clean.every((value) => !/\bor\b|,/i.test(value))) return clean.join(" ");
  return joinHuman(clean);
}

/**
 * Adds a non-empty value once to a phrase bucket.
 * @param {string[]} bucket - Mutable phrase bucket.
 * @param {string} value - Value to add.
 */
function pushUnique(bucket, value) {
  const text = String(value || "").trim();
  if (!text || bucket.includes(text)) return;
  bucket.push(text);
}

function functionalPhrase(values, hasLeadingContext) {
  const text = joinHuman(values);
  if (!text) return "";
  return hasLeadingContext ? `with ${text}` : text;
}

function resetSyntaxDisplayLookup() {
  setDisplayByCode = new Map(DEFAULT_SET_DISPLAY);
  familyDisplayByCodeKey = new Map();
  familyDisplayByCode = new Map();
  DEFAULT_SET_FAMILIES.forEach((family) => {
    registerFamilyDisplay(family.codes, family.label, family.aliases);
  });
}

function registerSetDisplay(code, name) {
  const normalizedCode = normalizeSetCode(code);
  const normalizedName = String(name || "").trim();
  if (!normalizedCode || !normalizedName) return;
  setDisplayByCode.set(normalizedCode, normalizedName);
}

function registerFamilyDisplay(codes, label, aliases = []) {
  const normalizedCodes = normalizeCodeList(codes);
  const normalizedLabel = normalizeFamilyLabel(label);
  if (!normalizedCodes.length || !normalizedLabel) return;

  familyDisplayByCodeKey.set(normalizeCodeSetKey(normalizedCodes), normalizedLabel);
  [...normalizedCodes, ...aliases].forEach((code) => {
    const normalizedCode = normalizeSetCode(code);
    if (normalizedCode) familyDisplayByCode.set(normalizedCode, normalizedLabel);
  });
}

function getSetLabelByCode(code) {
  return setDisplayByCode.get(normalizeSetCode(code)) || "";
}

function getFamilyLabelByCode(code) {
  return familyDisplayByCode.get(normalizeSetCode(code)) || "";
}

function getFamilyLabelByCodeSet(codes) {
  return familyDisplayByCodeKey.get(normalizeCodeSetKey(codes)) || "";
}

function familyCodesByLabel(label) {
  const normalizedLabel = normalizeFamilyLabel(label);
  if (!normalizedLabel) return null;
  for (const [codeKey, familyLabel] of familyDisplayByCodeKey.entries()) {
    if (familyLabel === normalizedLabel) return codeKey.split("|");
  }
  return null;
}

function describeSetLabel(label, code, negated) {
  if (label) {
    return negated ? `excluding the ${label} set` : `from the ${label} set`;
  }
  const fallback = normalizeSetCode(code);
  return negated ? `excluding set ${fallback}` : `from set ${fallback}`;
}

function describeFamilyLabel(label, code, negated) {
  if (label) {
    const familyName = normalizeFamilyLabel(label).replace(/\s+product family$/i, "");
    return negated ? `excluding the ${familyName} product family` : `from the ${familyName} product family`;
  }
  const fallback = normalizeSetCode(code);
  return negated ? `excluding set ${fallback}` : `from set ${fallback}`;
}

function normalizeFamilyLabel(label) {
  return String(label || "").replace(/\s+/g, " ").trim();
}

function normalizeSetCode(code) {
  return String(code || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeCodeList(codes) {
  return [...new Set((Array.isArray(codes) ? codes : [])
    .map(normalizeSetCode)
    .filter(Boolean))];
}

function normalizeCodeSetKey(codes) {
  return normalizeCodeList(codes).sort().join("|");
}

function normalizeIdentityCode(colors) {
  const clean = String(colors || "").toLowerCase().replace(/[^wubrgc]/g, "");
  if (clean.includes("c") && clean.length === 1) return "c";
  const unique = [...new Set(clean.split("").filter((color) => color !== "c"))];
  return COLOR_IDENTITY_ORDER
    .filter((color) => unique.includes(color))
    .join("");
}

function describeIdentityName(code) {
  const normalized = normalizeIdentityCode(code);
  const named = IDENTITY_NAMES.get(normalized);
  if (named) return named;
  return colorsToWords(normalized);
}

function describeIdentityColors(code) {
  const normalized = normalizeIdentityCode(code);
  const named = IDENTITY_NAMES.get(normalized);
  if (named && normalized.length > 1) return `${named} colors`;
  return colorsToWords(normalized);
}

function describeFunctionalTag(rawValue) {
  const tag = String(rawValue || "").toLowerCase().replace(/_/g, "-");
  const known = FUNCTIONAL_TAG_NAMES.get(tag);
  if (known) return known;
  const phrase = humanizeFieldValue(tag);
  if (!phrase) return "functional effects";
  if (/\beffects?\b$/i.test(phrase)) return phrase;
  return `${phrase} effects`;
}

function humanizeFieldValue(value) {
  return unquote(String(value || ""))
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function unwrapSingleGroup(value) {
  const clean = String(value || "").trim();
  if (!/^\(.+\)$/.test(clean) || /\sOR\s/i.test(clean)) return clean;
  return clean.slice(1, -1).trim();
}

function exactCommanderPhrase(parts) {
  if (parts.colors.length !== 1 || parts.types.length !== 1) return "";
  if (!/^exactly .+ commander identity$/i.test(parts.colors[0])) return "";
  if (parts.types[0] !== "commander candidates") return "";

  const identityWords = hyphenatedIdentityWords(parts.colors[0]
    .replace(/^exactly\s+/i, "")
    .replace(/\s+commander identity$/i, ""));
  const identityName = shardNameForIdentityWords(identityWords);
  const commanderText = identityName
    ? `${identityName} commanders with exactly ${identityWords} identity`
    : `Commanders with exactly ${identityWords} identity`;
  const tail = [
    parts.oracle.length ? joinHuman(parts.oracle) : "",
    parts.flavor.length ? joinHuman(parts.flavor) : "",
    parts.exclusions.length ? joinHuman(parts.exclusions) : "",
    parts.formats.length ? joinHuman(parts.formats) : "",
    parts.rarities.length ? joinHuman(parts.rarities) : "",
    parts.mana.length ? joinHuman(parts.mana) : "",
    parts.keywords.length ? `with ${joinHuman(parts.keywords)}` : "",
  ].filter(Boolean).join(" ");
  return [commanderText, tail].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function hyphenatedIdentityWords(identityWords) {
  return String(identityWords || "")
    .toLowerCase()
    .replace(/,\s+and\s+/g, "-")
    .replace(/\s+and\s+/g, "-")
    .replace(/,\s*/g, "-");
}

function shardNameForIdentityWords(identityWords) {
  return ({
    "white-blue-green": "Bant",
    "white-blue-black": "Esper",
    "blue-black-red": "Grixis",
    "black-red-green": "Jund",
    "white-red-green": "Naya",
  })[String(identityWords || "").toLowerCase()] || "";
}

/**
 * Splits query terms on spaces while keeping quoted text and groups intact.
 * @param {string} query - Raw Scryfall syntax.
 * @returns {string[]} Top-level query terms.
 */
function splitTopLevelTerms(query) {
  const terms = [];
  let current = "";
  let inQuote = false;
  let inRegex = false;
  let regexEscaped = false;
  let depth = 0;
  let regexStartsField = false;

  for (const char of String(query || "").trim()) {
    if (inRegex) {
      current += char;
      if (regexEscaped) {
        regexEscaped = false;
        continue;
      }
      if (char === "\\") {
        regexEscaped = true;
        continue;
      }
      if (char === "/") {
        inRegex = false;
        regexStartsField = false;
      }
      continue;
    }

    if (char === '"') inQuote = !inQuote;
    if (!inQuote && char === "(") depth += 1;
    if (!inQuote && char === ")") depth = Math.max(depth - 1, 0);

    if (!inQuote && depth === 0 && char === "/" && /:$/.test(current)) {
      inRegex = true;
      regexEscaped = false;
      regexStartsField = true;
      current += char;
      continue;
    }

    if (!inQuote && depth === 0 && /\s/.test(char)) {
      if (current.trim()) terms.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) terms.push(current.trim());
  return terms;
}

/**
 * Checks whether a term is a parenthesized OR group.
 * @param {string} term - Query term.
 * @returns {boolean} True when term is an OR group.
 */
function isOrGroup(term) {
  return /^\(.+\)$/.test(term) && /\sOR\s/i.test(term);
}

/**
 * Splits terms within a parenthesized OR group.
 * @param {string} value - Parenthesized group content.
 * @returns {string[]} OR terms.
 */
function splitOrTerms(value) {
  return value.split(/\s+OR\s+/i).map((item) => item.trim()).filter(Boolean);
}

/**
 * Converts color symbols to color names.
 * @param {string} colors - Scryfall color symbols.
 * @returns {string} Human color phrase.
 */
function colorsToWords(colors, conjunction = "and") {
  const names = String(colors || "")
    .toLowerCase()
    .split("")
    .map((color) => COLOR_NAMES[color] || color);
  return conjunction === "or" ? joinOrHuman(names) : joinHuman(names);
}

/**
 * Converts a mana comparison to words.
 * @param {string} operator - Scryfall comparison operator.
 * @param {string} amount - Numeric amount.
 * @returns {string} Human comparison phrase.
 */
function operatorToWords(operator, amount) {
  return ({
    "<=": `${amount} or less`,
    ">=": `${amount} or greater`,
    "<": `less than ${amount}`,
    ">": `greater than ${amount}`,
    "=": amount,
    ":": amount
  })[operator] || amount;
}

/**
 * Removes surrounding quotes from Scryfall values.
 * @param {string} value - Raw syntax value.
 * @returns {string} Unquoted value.
 */
function unquote(value) {
  return String(value || "").replace(/^"|"$/g, "");
}

/**
 * Joins terms with human-readable punctuation.
 * @param {string[]} values - Values to join.
 * @returns {string} Human phrase.
 */
function joinHuman(values) {
  const clean = values.filter(Boolean);
  if (clean.length <= 1) return clean[0] || "";
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, and ${clean.at(-1)}`;
}

/**
 * Joins terms with human-readable OR punctuation.
 * @param {string[]} values - Values to join.
 * @returns {string} Human phrase.
 */
function joinOrHuman(values) {
  const clean = values.filter(Boolean);
  if (clean.length <= 1) return clean[0] || "";
  if (clean.length === 2) return `${clean[0]} or ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, or ${clean.at(-1)}`;
}

/**
 * Describes unhandled syntax fragments in a cleaner fallback form.
 * @param {string} term - Unhandled query term.
 * @returns {string} Human-readable fallback text.
 */
function describeUnhandledTerm(term) {
  const clean = unwrapSingleGroup(String(term || "").trim());
  if (!clean) return "";
  const parsed = parseSimpleTerm(clean);
  if (parsed?.omit) return "";
  if (parsed?.text) return parsed.text;
  const inScopeField = clean.match(/^-?([a-z]+)(?::|=|<=|>=)/i);
  if (inScopeField && IN_SCOPE_FALLBACK_FIELDS.has(inScopeField[1].toLowerCase())) return "";
  if (/^-?o:/i.test(clean)) {
    return describeOraclePhrase(clean.replace(/^-?o:/i, "")).replace(/^oracle text /i, "");
  }
  return clean
    .replace(/[:/|()*?\\^$]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

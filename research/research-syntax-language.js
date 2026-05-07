const COLOR_NAMES = { w: "white", u: "blue", b: "black", r: "red", g: "green", c: "colorless" };
const RARITY_NAMES = { c: "common", u: "uncommon", r: "rare", m: "mythic" };

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
    oracle: [],
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
  parts[parsed.kind].push(parsed.text);
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
  const parsed = splitOrTerms(inner).map(parseSimpleTerm);
  if (!parsed.length || parsed.some((item) => !item)) return false;

  const kinds = [...new Set(parsed.map((item) => item.kind))];
  if (kinds.length !== 1) return false;

  const kind = kinds[0];
  const phrase = joinOrHuman(parsed.map((item) => item.text));
  parts[kind].push(phrase);
  return true;
}

/**
 * Parses one simple Scryfall term into a phrase bucket item.
 * @param {string} term - Scryfall query term.
 * @returns {object|null} Parsed term or null.
 */
function parseSimpleTerm(term) {
  const clean = String(term || "").trim();
  const negated = clean.startsWith("-");
  const value = negated ? clean.slice(1) : clean;

  const color = parseColorTerm(value, negated);
  if (color) return color;

  const identity = value.match(/^id(?:<=|:)([wubrgc]+)$/i);
  if (identity) {
    return { kind: "colors", text: `${colorsToWords(identity[1])} commander identity` };
  }

  const type = value.match(/^t:(.+)$/i);
  if (type) {
    return { kind: "types", text: `${unquote(type[1])} cards` };
  }

  const keyword = value.match(/^kw:(.+)$/i);
  if (keyword) {
    return { kind: "keywords", text: unquote(keyword[1]) };
  }

  const format = value.match(/^f:(\w+)$/i);
  if (format) {
    return { kind: "formats", text: `${format[1].toLowerCase()} legal` };
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
    return { kind: "oracle", text: `mentioning ${unquote(oracle[1])}` };
  }

  return null;
}

/**
 * Parses card color terms.
 * @param {string} value - Non-negated query term.
 * @param {boolean} negated - Whether the original term was negated.
 * @returns {object|null} Parsed color item or null.
 */
function parseColorTerm(value, negated) {
  const color = value.match(/^c(:|=|<=|>=)([wubrgc]+)$/i);
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
 * Assembles translated phrase buckets into one readable query.
 * @param {object} parts - Phrase buckets.
 * @param {string[]} unhandled - Terms that could not be translated.
 * @returns {string} Plain-language search phrase.
 */
function assemblePhrase(parts, unhandled) {
  const segments = [];
  if (parts.colors.length) segments.push(joinHuman(parts.colors));
  if (parts.exclusions.length) segments.push(joinHuman(parts.exclusions));
  if (parts.types.length) segments.push(joinHuman(parts.types));
  if (parts.formats.length) segments.push(joinHuman(parts.formats));
  if (parts.rarities.length) segments.push(joinHuman(parts.rarities));
  if (parts.mana.length) segments.push(joinHuman(parts.mana));
  if (parts.keywords.length) segments.push(`with ${joinHuman(parts.keywords)}`);
  if (parts.oracle.length) segments.push(joinHuman(parts.oracle));
  if (!segments.length && unhandled.length) return "";
  if (unhandled.length) segments.push(`plus ${unhandled.join(" ")}`);
  return segments.join(" ").replace(/\s+/g, " ").trim();
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
  let depth = 0;

  for (const char of String(query || "").trim()) {
    if (char === '"') inQuote = !inQuote;
    if (!inQuote && char === "(") depth += 1;
    if (!inQuote && char === ")") depth = Math.max(depth - 1, 0);

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

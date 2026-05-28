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

  const identity = parseIdentityTerm(value, negated);
  if (identity) {
    return identity;
  }

  const type = value.match(/^t:(.+)$/i);
  if (type) {
    const typeText = `${unquote(type[1])} cards`;
    return { kind: negated ? "exclusions" : "types", text: negated ? `excluding ${typeText}` : typeText };
  }

  const isTerm = value.match(/^is:(.+)$/i);
  if (isTerm) {
    return describeIsTerm(isTerm[1], negated);
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
  const identity = value.match(/^(?:id|ci)(:|=|<=|>=)([wubrgc]+)$/i);
  if (!identity) return null;

  const op = identity[1];
  const words = colorsToWords(identity[2]);
  if (negated) {
    const negativeText = op === "<="
      ? `outside ${words} commander identity`
      : `not ${words} commander identity`;
    return { kind: "exclusions", text: negativeText };
  }
  if (op === "=") return { kind: "colors", text: `exactly ${words} commander identity` };
  if (op === ">=") return { kind: "colors", text: `at least ${words} commander identity` };
  return { kind: "colors", text: `${words} commander identity` };
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
  const segments = [];
  if (parts.colors.length) segments.push(joinHuman(parts.colors));
  if (parts.types.length) segments.push(joinHuman(parts.types));
  if (parts.oracle.length) segments.push(joinHuman(parts.oracle));
  if (parts.flavor.length) segments.push(joinHuman(parts.flavor));
  if (parts.exclusions.length) segments.push(joinHuman(parts.exclusions));
  if (parts.formats.length) segments.push(joinHuman(parts.formats));
  if (parts.rarities.length) segments.push(joinHuman(parts.rarities));
  if (parts.mana.length) segments.push(joinHuman(parts.mana));
  if (parts.keywords.length) segments.push(`with ${joinHuman(parts.keywords)}`);
  if (!segments.length && unhandled.length) return "";
  if (unhandled.length) segments.push(`plus ${unhandled.map(describeUnhandledTerm).join(" ")}`);
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
  const clean = String(term || "").trim();
  if (!clean) return "";
  if (/^-?o:/i.test(clean)) {
    return describeOraclePhrase(clean.replace(/^-?o:/i, "")).replace(/^oracle text /i, "");
  }
  return clean
    .replace(/[:/|()*?\\^$]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

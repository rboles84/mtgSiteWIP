const COLOR_ORDER = ["w", "u", "b", "r", "g"];
const CARD_FACT_CACHE = new WeakMap();
const ATOM_RESULT_CACHE = new Map();
const CARD_EVIDENCE_CACHE = new WeakMap();

const OTAG_PATTERNS = {
  counterspell: /\bcounter target\b[^.\n]*\bspell\b|\bcounter all spells\b|\bcounter that spell\b/i,
  "board-wipe": /\b(?:destroy|exile) all\b[^.\n]*(?:creatures|permanents|artifacts|enchantments)|\ball creatures\b[^.\n]*\bget -\d+\/-\d+|\breturn all\b[^.\n]*(?:creatures|permanents)|\beach player sacrifices all\b/i,
  "sacrifice-outlet": /(?:^|\n)[^:\n]*\bsacrifice\b[^:\n]*:/i,
  "death-trigger": /\b(?:when|whenever)\b[^.\n]*\bdies\b/i,
  ramp: /\bsearch your library for\b[^.\n]*\bland\b[^.\n]*\b(?:battlefield|put it onto)|\badd\b[^.\n]*\bmana\b|\badd \{[wubrgc]\}/i,
  draw: /\bdraw\b[^.\n]*\bcards?\b/i,
  tutor: /\bsearch your library for\b[^.\n]*\bcard\b/i,
};

export const VM547_LOCAL_OTAG_MODELS = Object.freeze(Object.keys(OTAG_PATTERNS));

export function tokenizeLocalScryfallQuery(query = "") {
  const tokens = [];
  const source = String(query || "").trim();
  let current = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"') {
      quoted = !quoted;
      current += character;
      continue;
    }
    if (!quoted && (character === "(" || character === ")")) {
      if (current.trim()) tokens.push(current.trim());
      tokens.push(character);
      current = "";
      continue;
    }
    if (!quoted && /\s/.test(character)) {
      if (current.trim()) tokens.push(current.trim());
      current = "";
      continue;
    }
    current += character;
  }
  if (quoted) throw new Error(`Unclosed quote in local Scryfall query: ${query}`);
  if (current.trim()) tokens.push(current.trim());
  return tokens;
}

export function parseLocalScryfallQuery(query = "") {
  const tokens = tokenizeLocalScryfallQuery(query);
  let cursor = 0;

  function parseOr() {
    let node = parseAnd();
    const children = [node];
    while (/^OR$/i.test(tokens[cursor] || "")) {
      cursor += 1;
      children.push(parseAnd());
    }
    return children.length === 1 ? node : { type: "or", children };
  }

  function parseAnd() {
    let node = parsePrimary();
    const children = [node];
    while (cursor < tokens.length && tokens[cursor] !== ")" && !/^OR$/i.test(tokens[cursor])) {
      if (/^AND$/i.test(tokens[cursor])) cursor += 1;
      children.push(parsePrimary());
    }
    return children.length === 1 ? node : { type: "and", children };
  }

  function parsePrimary() {
    const token = tokens[cursor];
    if (!token) throw new Error(`Unexpected end of local Scryfall query: ${query}`);
    if (token === "(") {
      cursor += 1;
      const node = parseOr();
      if (tokens[cursor] !== ")") throw new Error(`Unclosed group in local Scryfall query: ${query}`);
      cursor += 1;
      return node;
    }
    if (token === ")" || /^(?:AND|OR)$/i.test(token)) {
      throw new Error(`Unexpected token ${token} in local Scryfall query: ${query}`);
    }
    cursor += 1;
    return parseAtom(token, query);
  }

  if (!tokens.length) throw new Error("Cannot parse an empty local Scryfall query.");
  const result = parseOr();
  if (cursor !== tokens.length) throw new Error(`Unexpected trailing token ${tokens[cursor]} in local Scryfall query: ${query}`);
  return result;
}

export function evaluateLocalScryfallQuery(card, queryOrAst) {
  const ast = typeof queryOrAst === "string" ? parseLocalScryfallQuery(queryOrAst) : queryOrAst;
  if (ast.type === "and") return ast.children.every((child) => evaluateLocalScryfallQuery(card, child));
  if (ast.type === "or") return ast.children.some((child) => evaluateLocalScryfallQuery(card, child));
  if (ast.type !== "atom") throw new Error(`Unsupported local Scryfall AST node: ${ast.type}`);
  const matched = evaluateCachedAtom(card, ast);
  return ast.negated ? !matched : matched;
}

export function compileLocalScryfallQuery(query) {
  const ast = typeof query === "string" ? parseLocalScryfallQuery(query) : query;
  return compileNode(ast);
}

export function filterLocalScryfallCards(cards, query) {
  const ast = parseLocalScryfallQuery(query);
  return cards.filter((card) => evaluateLocalScryfallQuery(card, ast));
}

export function localCardEvidence(card = {}) {
  let evidence = CARD_EVIDENCE_CACHE.get(card);
  if (evidence) return evidence;
  evidence = {
    oracle_id: String(card.oracle_id || ""),
    name: String(card.name || ""),
    color_identity: normalizeIdentity(card.color_identity || []),
    type_line: allTypeText(card),
    oracle_excerpt: excerpt(allOracleText(card), 260),
    flavor_excerpt: excerpt(allFlavorText(card), 180),
  };
  CARD_EVIDENCE_CACHE.set(card, evidence);
  return evidence;
}

export function isLocalCommanderCandidate(card = {}) {
  if (["not_legal", "banned"].includes(String(card.legalities?.commander || ""))) return false;
  const type = allTypeText(card);
  const oracle = allOracleText(card);
  return (/\blegendary\b/i.test(type) && /\bcreature\b/i.test(type)) ||
    /\bcan be your commander\b|\bpartner\b|\bfriends forever\b|\bchoose a background\b|\bdoctor's companion\b/i.test(oracle);
}

export function toDisjunctiveBranches(ast) {
  if (ast.type === "atom") return [[ast]];
  if (ast.type === "or") return ast.children.flatMap((child) => toDisjunctiveBranches(child));
  if (ast.type === "and") {
    return ast.children.reduce((branches, child) => {
      const childBranches = toDisjunctiveBranches(child);
      return branches.flatMap((branch) => childBranches.map((childBranch) => [...branch, ...childBranch]));
    }, [[]]);
  }
  throw new Error(`Unsupported local Scryfall AST node: ${ast.type}`);
}

function parseAtom(token, query) {
  const match = token.match(/^(-?)([a-z]+)(:|<=|>=|=|<|>)(.+)$/i);
  if (!match) throw new Error(`Unsupported token ${token} in local Scryfall query: ${query}`);
  const [, negation, rawField, operator, rawValue] = match;
  return {
    type: "atom",
    token,
    negated: negation === "-",
    field: rawField.toLowerCase(),
    operator,
    value: unquote(rawValue).toLowerCase(),
  };
}

function evaluateAtom(card, atom) {
  const facts = cardFacts(card);
  switch (atom.field) {
    case "id":
    case "ci":
      return compareIdentity(facts.identity, atom.value, atom.operator);
    case "is":
      if (atom.value !== "commander") throw unsupported(atom);
      return isLocalCommanderCandidate(card);
    case "f":
      if (atom.value !== "commander") throw unsupported(atom);
      return !["not_legal", "banned"].includes(String(card.legalities?.commander || ""));
    case "t":
    case "type":
      return containsTerm(facts.type, atom.value);
    case "o":
    case "oracle":
      return containsTerm(facts.oracle, atom.value);
    case "ft":
    case "flavor":
      return containsTerm(facts.flavor, atom.value);
    case "kw":
    case "keyword":
      return facts.keywords.some((keyword) => keyword === atom.value || keyword.includes(atom.value));
    case "otag": {
      const pattern = OTAG_PATTERNS[atom.value];
      if (!pattern) throw new Error(`No governed local model for otag:${atom.value}`);
      return pattern.test(facts.oracle);
    }
    case "produces":
      return (card.produced_mana || []).some((symbol) => String(symbol).toLowerCase() === atom.value);
    case "mv":
    case "cmc":
      return compareNumber(Number(card.cmc), Number(atom.value), atom.operator);
    case "pow":
      return compareNumber(parsePower(card.power), Number(atom.value), atom.operator);
    default:
      throw unsupported(atom);
  }
}

function compileNode(ast) {
  if (ast.type === "and") {
    const predicates = ast.children.map(compileNode);
    return (card) => predicates.every((predicate) => predicate(card));
  }
  if (ast.type === "or") {
    const predicates = ast.children.map(compileNode);
    return (card) => predicates.some((predicate) => predicate(card));
  }
  if (ast.type !== "atom") throw new Error(`Unsupported local Scryfall AST node: ${ast.type}`);
  return (card) => {
    const matched = evaluateCachedAtom(card, ast);
    return ast.negated ? !matched : matched;
  };
}

function evaluateCachedAtom(card, atom) {
  const cacheKey = `${atom.field}${atom.operator}${atom.value}`;
  let cache = ATOM_RESULT_CACHE.get(cacheKey);
  if (!cache) {
    cache = new WeakMap();
    ATOM_RESULT_CACHE.set(cacheKey, cache);
  }
  if (cache.has(card)) return cache.get(card);
  const result = evaluateAtom(card, atom);
  cache.set(card, result);
  return result;
}

function cardFacts(card) {
  let facts = CARD_FACT_CACHE.get(card);
  if (facts) return facts;
  facts = {
    identity: normalizeIdentity(card.color_identity || []),
    oracle: allOracleText(card).toLowerCase(),
    flavor: allFlavorText(card).toLowerCase(),
    type: allTypeText(card).toLowerCase(),
    keywords: allKeywords(card).map((value) => value.toLowerCase()),
  };
  CARD_FACT_CACHE.set(card, facts);
  return facts;
}

function compareIdentity(cardIdentity, queryIdentity, operator) {
  const card = new Set(cardIdentity === "c" ? [] : cardIdentity.split(""));
  const query = new Set(queryIdentity === "c" ? [] : normalizeIdentity(queryIdentity.split("")).split(""));
  if (operator === "=") return card.size === query.size && [...card].every((symbol) => query.has(symbol));
  if (operator === "<=") return [...card].every((symbol) => query.has(symbol));
  throw new Error(`Unsupported color-identity operator ${operator}`);
}

function compareNumber(actual, expected, operator) {
  if (!Number.isFinite(actual) || !Number.isFinite(expected)) return false;
  if (operator === "=") return actual === expected;
  if (operator === ">=") return actual >= expected;
  if (operator === "<=") return actual <= expected;
  if (operator === ">") return actual > expected;
  if (operator === "<") return actual < expected;
  return false;
}

function containsTerm(text, value) {
  return text.includes(String(value || "").replaceAll("\\\"", '"').toLowerCase());
}

function normalizeIdentity(colors) {
  const symbols = Array.isArray(colors) ? colors : String(colors || "").split("");
  const normalized = [...new Set(symbols.map((color) => String(color).toLowerCase()).filter((color) => COLOR_ORDER.includes(color)))];
  return normalized.length ? normalized.sort((left, right) => COLOR_ORDER.indexOf(left) - COLOR_ORDER.indexOf(right)).join("") : "c";
}

function allOracleText(card) {
  return [card.oracle_text, ...(card.card_faces || []).map((face) => face.oracle_text)].filter(Boolean).join("\n");
}

function allFlavorText(card) {
  return [card.flavor_text, ...(card.card_faces || []).map((face) => face.flavor_text)].filter(Boolean).join("\n");
}

function allTypeText(card) {
  return [card.type_line, ...(card.card_faces || []).map((face) => face.type_line)].filter(Boolean).join(" // ");
}

function allKeywords(card) {
  return [...new Set([...(card.keywords || []), ...(card.card_faces || []).flatMap((face) => face.keywords || [])])];
}

function parsePower(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : Number.NaN;
}

function excerpt(value, limit) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  return normalized.length <= limit ? normalized : `${normalized.slice(0, limit - 1).trimEnd()}…`;
}

function unquote(value) {
  const text = String(value || "");
  return text.startsWith('"') && text.endsWith('"') ? text.slice(1, -1) : text;
}

function unsupported(atom) {
  return new Error(`Unsupported local Scryfall atom: ${atom.token}`);
}

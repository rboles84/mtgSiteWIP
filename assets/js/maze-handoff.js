const DEFAULT_MAZE_PATH_LABEL = "Maze path";
const MANA_SYMBOL_ORDER = ["w", "u", "b", "r", "g", "c"];
const MANA_SYMBOL_NAMES = {
  w: "white",
  u: "blue",
  b: "black",
  r: "red",
  g: "green",
  c: "colorless"
};
const DEFAULT_ORACLE_TERMS = ["draw", "token", "graveyard", "sacrifice"];
const DEFAULT_FLAVOR_TERMS = ["death", "secret", "growth", "law"];

/**
 * Resolves a Maze operator query from a link or a URL-bearing object.
 * @param {object} link - Maze link or handoff object.
 * @param {string} [origin] - Browser origin used to parse relative URLs.
 * @returns {string} Executable Scryfall query.
 */
export function resolveMazeOperatorQuery(link = {}, origin = defaultOrigin()) {
  if (link.operatorQuery) return link.operatorQuery;
  try {
    const parsed = new URL(link.url || "", origin);
    const operatorQuery = parsed.searchParams.get("operatorQuery") || "";
    if (operatorQuery) return operatorQuery;
    const urlQ = parsed.searchParams.get("q") || "";
    return isMazeOperatorQuery(urlQ) ? urlQ : "";
  } catch (_) {
    return "";
  }
}

/**
 * Checks whether a URL `q` parameter is explicit Scryfall syntax.
 * @param {string} query - Candidate URL query value.
 * @returns {boolean} True when the value contains operator syntax.
 */
export function isMazeOperatorQuery(query = "") {
  const value = String(query || "").trim();
  if (!value) return false;
  const operatorFieldPattern = /\b(?:id|ci|c|o|t|is|f|type|oracle|color|otag|atag|art|artist|flavor|ft|kw|keyword|r|rarity|set|e|in|cn|number|lang|usd|eur|tix|pow|tou|loy|mv|cmc|mana)\s*(?::|[<>=]=?)/i;
  const parenthesizedOperatorPattern = /\([^)]*\b(?:id|ci|c|o|t|is|f|type|oracle|color|otag|ft|kw|mv|cmc)\s*(?::|[<>=]=?)[^)]*\)/i;
  return operatorFieldPattern.test(value) || parenthesizedOperatorPattern.test(value);
}

/**
 * Resolves a stable Maze path type from the link label or existing metadata.
 * @param {object} link - Maze link or handoff object.
 * @returns {string} Path slug.
 */
export function resolveMazePathType(link = {}) {
  return link.pathType || String(link.label || DEFAULT_MAZE_PATH_LABEL)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Resolves the visible plain-reading label for a Maze path.
 * @param {object} link - Maze link or handoff object.
 * @param {object} [context] - Optional reader context.
 * @returns {string} Human-readable label.
 */
export function resolveMazePlainReadingQuery(link = {}, context = {}) {
  if (link.plainReadingQuery) return link.plainReadingQuery;
  const label = link.label || context.pathLabel || DEFAULT_MAZE_PATH_LABEL;
  const factionName = context.factionName || "the reading";
  return `${label} from ${factionName}`;
}

/**
 * Creates a Maze search link with stable path and query metadata.
 * @param {object} input - Link label, query, and optional overrides.
 * @returns {object} Maze link payload.
 */
export function mazeSearchLink({ label, query, service = "maze", pathType = "", plainReadingQuery = "" } = {}) {
  return {
    service,
    label,
    pathType: pathType || resolveMazePathType({ label }),
    plainReadingQuery: plainReadingQuery || label || DEFAULT_MAZE_PATH_LABEL,
    operatorQuery: query,
    url: `/maze/?q=${encodeURIComponent(query || "")}`,
  };
}

/**
 * Builds stable dossier-shaped Maze paths shared by Archscry and Maze.
 * @param {object} input - Dossier path input.
 * @param {string} input.identity - Commander color identity symbols.
 * @param {string} [input.factionName] - Dossier or reading display name.
 * @param {string} [input.identityHint] - Optional visible identity hint for the sidebar.
 * @param {string[]} [input.oracleTerms] - Oracle terms or prebuilt `o:` query terms.
 * @param {string[]} [input.flavorTerms] - Flavor terms or prebuilt `ft:` query terms.
 * @param {boolean} [input.includeOutsideColorStretch] - Whether to include the stretch commander lane.
 * @returns {object[]} Stable Maze path entries.
 */
export function buildDossierMazePathEntries({
  identity = "",
  factionName = "this reading",
  identityHint = "",
  oracleTerms = [],
  flavorTerms = [],
  includeOutsideColorStretch = true
} = {}) {
  const normalizedIdentity = normalizeMazeIdentity(identity);
  if (!normalizedIdentity) return [];

  const oracleGroup = groupQueryTerms(oracleTerms, "o", DEFAULT_ORACLE_TERMS);
  const flavorGroup = groupQueryTerms(flavorTerms, "ft", DEFAULT_FLAVOR_TERMS);
  const identityLabel = String(identityHint || "").trim() || normalizedIdentity.toUpperCase();
  const identityText = identityToWords(normalizedIdentity);
  const readingName = String(factionName || "this reading").trim() || "this reading";

  const entries = [
    {
      label: "commanders that fit",
      sidebarLabel: "Commanders that fit this reading",
      hint: identityLabel,
      pathType: "commanders-that-fit",
      query: `id=${normalizedIdentity} is:commander f:commander ${oracleGroup}`,
      plainReadingQuery: `${readingName} commanders with exactly ${identityText} identity`
    },
    {
      label: "cards that support this shape",
      sidebarLabel: "Cards that support this shape",
      hint: "noncommander support",
      pathType: "support-cards",
      query: `id<=${normalizedIdentity} f:commander -is:commander -t:land ${oracleGroup}`,
      plainReadingQuery: `${readingName} noncommander support cards in ${identityText} Commander identity`
    },
    {
      label: "flavor echoes",
      sidebarLabel: "Flavor echoes",
      hint: "card-story texture",
      pathType: "flavor-echoes",
      query: `id<=${normalizedIdentity} f:commander ${flavorGroup}`,
      plainReadingQuery: `${readingName} flavor and story echoes in ${identityText} Commander identity`
    }
  ];

  if (includeOutsideColorStretch) {
    entries.push({
      label: "outside-color commander stretch",
      sidebarLabel: "Outside-color commander stretch",
      hint: "stretch lane",
      pathType: "weird-stretch-commanders",
      query: `-id<=${normalizedIdentity} is:commander f:commander ${oracleGroup}`,
      plainReadingQuery: `${readingName} commander stretch outside ${identityText} identity`
    });
  }

  return entries;
}

/**
 * Resolves launch state for Maze when Archscry-originated URLs land on the page.
 * @param {URLSearchParams} urlParams - Current page query parameters.
 * @param {object} [existing] - Previously saved handoff state.
 * @returns {object} Normalized Maze launch fields.
 */
export function resolveMazeLaunchState(urlParams, existing = {}) {
  const urlQ = urlParams.get("q") || "";
  const explicitOperatorQuery = urlParams.get("operatorQuery") || "";
  const operatorStyleQ = isMazeOperatorQuery(urlQ) ? urlQ : "";
  const existingOperatorQuery = !urlQ ? existing.operatorQuery || "" : "";
  const from = urlParams.get("from") || "";
  return {
    from,
    urlQ,
    operatorQuery: explicitOperatorQuery || operatorStyleQ || existingOperatorQuery,
    plainReadingQuery: urlParams.get("plainReadingQuery") || existing.plainReadingQuery || "",
    pathType: urlParams.get("pathType") || existing.pathType || "",
    returnUrl: urlParams.get("returnUrl") || existing.returnUrl || ""
  };
}

function defaultOrigin() {
  return globalThis?.location?.origin || "http://localhost";
}

function normalizeMazeIdentity(identity) {
  const rawIdentity = String(identity || "").toLowerCase().replace(/[^wubrgc]/g, "");
  if (rawIdentity === "rgw") return "rgw";
  if (rawIdentity === "rwb") return "rwb";
  const symbols = rawIdentity.match(/[wubrgc]/g) || [];
  if (!symbols.length) return "";
  if (symbols.includes("c") && symbols.every((symbol) => symbol === "c")) return "c";
  const colored = symbols.filter((symbol) => symbol !== "c");
  return [...new Set(colored)].sort(sortManaSymbols).join("") || "c";
}

function sortManaSymbols(left, right) {
  return MANA_SYMBOL_ORDER.indexOf(left) - MANA_SYMBOL_ORDER.indexOf(right);
}

function identityToWords(identity) {
  return String(identity || "")
    .toLowerCase()
    .split("")
    .map((symbol) => MANA_SYMBOL_NAMES[symbol] || symbol)
    .join("-");
}

function groupQueryTerms(terms, field, fallbackTerms) {
  const normalized = [...new Set((terms?.length ? terms : fallbackTerms)
    .map((term) => normalizeQueryTerm(term, field))
    .filter(Boolean))];
  return `(${normalized.join(" OR ")})`;
}

function normalizeQueryTerm(term, field) {
  const value = String(term || "").trim();
  if (!value) return "";
  if (/^[a-z]+:/i.test(value) || /^\(.+\)$/.test(value)) return value;
  const cleaned = value.toLowerCase().replace(/"/g, "").trim();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned}"` : `${field}:${cleaned}`;
}

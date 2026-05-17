const DEFAULT_MAZE_PATH_LABEL = "Maze path";

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
    return parsed.searchParams.get("operatorQuery") || parsed.searchParams.get("q") || "";
  } catch (_) {
    return "";
  }
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
 * Resolves launch state for Maze when Archscry-originated URLs land on the page.
 * @param {URLSearchParams} urlParams - Current page query parameters.
 * @param {object} [existing] - Previously saved handoff state.
 * @returns {object} Normalized Maze launch fields.
 */
export function resolveMazeLaunchState(urlParams, existing = {}) {
  const urlQ = urlParams.get("q") || "";
  const from = urlParams.get("from") || "";
  return {
    from,
    urlQ,
    operatorQuery: urlParams.get("operatorQuery") || urlQ || existing.operatorQuery || "",
    plainReadingQuery: urlParams.get("plainReadingQuery") || existing.plainReadingQuery || "",
    pathType: urlParams.get("pathType") || existing.pathType || "",
    returnUrl: urlParams.get("returnUrl") || existing.returnUrl || ""
  };
}

function defaultOrigin() {
  return globalThis?.location?.origin || "http://localhost";
}

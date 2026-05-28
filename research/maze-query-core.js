import { buildDossierMazePathEntries, resolveMazeLaunchState } from "../assets/js/maze-handoff.js";
import { buildVisualBuilderQuery } from "./research-builder.js";
import { normalizeSortDirection, parseScryfallNaturalLanguage } from "./scryfall-parser.js";

export const MAZE_QUERY_MODES = ["ai", "raw", "builder"];
export const MAZE_QUERY_ORIGINS = ["maze", "archscry", "path", "placement", "dossier"];
export const MAZE_PARSER_MODES = ["plain_reading", "raw", "exact_name", "builder"];
export const MAZE_DOSSIER_PATH_TYPES = [
  "commanders-that-fit",
  "support-cards",
  "flavor-echoes",
  "weird-stretch-commanders"
];

const DEFAULT_SEARCH_API = {
  endpoint: "/cards/search",
  unique: "cards",
  order: "name"
};

/**
 * Resolves a Maze query request into the v1 contract result shape.
 * @param {object} request - MazeQueryRequest.
 * @returns {object} MazeQueryResult plus adapter diagnostics for current UI consumers.
 */
export function resolveMazeQueryRequest(request = {}) {
  const mode = normalizeMazeMode(request.mode);
  const input = normalizeInput(request.input);
  const options = request.options || {};
  const sourceContext = normalizeMazeSourceContext({
    origin: request.origin,
    launchContext: request.launchContext,
    placementContext: request.placementContext
  });

  if (mode === "builder") {
    const query = buildVisualBuilderQuery(request.builderFilters || {});
    return buildContractResult({
      query,
      mode,
      parserMode: "builder",
      reason: query ? "Generated from the active Loom filters." : "",
      api: normalizeMazeQueryApiMetadata(options),
      sourceContext,
      normalized: Boolean(query && query !== input),
      diagnostics: [],
      adapterDiagnostics: null
    });
  }

  if (mode === "raw") {
    const prepared = prepareRawSyntaxQuery(input);
    const formatted = applyMazeFormatToQuery(prepared.query, {
      format: options.format,
      useFormatDefault: options.useFormatDefault
    });
    const reason = appendReason(
      prepared.reason,
      formatted.changed ? `Applied ${formatLabel(formatted.format)} format.` : ""
    );
    return buildContractResult({
      query: formatted.query,
      mode,
      parserMode: "raw",
      reason,
      api: normalizeMazeQueryApiMetadata(options),
      sourceContext,
      normalized: prepared.changed || formatted.changed,
      diagnostics: legacyDiagnosticsToMazeDiagnostics(prepared.diagnostics, "raw"),
      adapterDiagnostics: prepared.diagnostics
    });
  }

  const parserResult = parseScryfallNaturalLanguage(input);
  const parserMode = parserResult.mode === "exact_name" ? "exact_name" : "plain_reading";
  if (parserMode === "exact_name") {
    return buildContractResult({
      query: parserResult.query,
      plainReadingQuery: input,
      reason: parserResult.reason || "",
      mode,
      parserMode,
      diagnostics: legacyDiagnosticsToMazeDiagnostics(parserResult, "parser"),
      api: normalizeMazeQueryApiMetadata(parserResult.api || {}, { endpoint: "/cards/named" }),
      sourceContext,
      normalized: parserResult.query !== input,
      adapterDiagnostics: parserResult
    });
  }

  const formatted = applyMazeFormatToQuery(parserResult.query, {
    format: options.format,
    useFormatDefault: options.useFormatDefault
  });
  const reason = appendReason(
    parserResult.reason || "",
    formatted.changed ? `Applied ${formatLabel(formatted.format)} format.` : ""
  );
  return buildContractResult({
    query: formatted.query,
    plainReadingQuery: input,
    reason,
    mode,
    parserMode,
    diagnostics: legacyDiagnosticsToMazeDiagnostics(parserResult, "parser"),
    api: normalizeMazeQueryApiMetadata(parserResult.api || {}, options),
    sourceContext,
    normalized: formatted.changed || parserResult.query !== input,
    adapterDiagnostics: parserResult
  });
}

/**
 * Normalizes common plain-English glue accidentally pasted into raw syntax.
 * @param {string} input - Raw Scryfall syntax field value.
 * @returns {object} Prepared query with optional legacy inspector diagnostics.
 */
export function prepareRawSyntaxQuery(input) {
  const andParts = splitRawSyntaxOnStandaloneAnd(input);
  if (andParts.length <= 1) {
    return { query: input, reason: "", changed: false, diagnostics: null };
  }

  const query = andParts.join(" ").replace(/\s+/g, " ").trim();
  const alternativeQuery = andParts.map((part) => `(${part})`).join(" OR ");
  return {
    query,
    reason: "Removed plain-language AND from raw syntax; Scryfall combines filters with spaces.",
    changed: query !== input,
    diagnostics: {
      reason: "Raw syntax normalized before searching.",
      recognized: ["raw Scryfall syntax", "plain-language AND"],
      assumptions: [
        "Spaces already mean AND in Scryfall syntax.",
        "This still searches for cards matching every remaining filter."
      ],
      unresolved: [],
      alternatives: [
        {
          label: "Treat pasted snippets as alternatives",
          query: alternativeQuery
        }
      ]
    }
  };
}

/**
 * Applies the active Maze format filter when the query has no format term.
 * @param {string} query - Executable Scryfall query.
 * @param {object} opts - Format options.
 * @returns {object} Formatted query metadata.
 */
export function applyMazeFormatToQuery(query, opts = {}) {
  const format = opts.format || "";
  const cleanQuery = String(query || "").trim();
  if (!cleanQuery || !format || queryHasFormat(cleanQuery)) {
    return { query: cleanQuery, changed: false, format: "" };
  }
  return {
    query: `${cleanQuery} f:${format}`.trim(),
    changed: true,
    format
  };
}

/**
 * Normalizes launch/source context without treating origin as a search mode.
 * @param {object} input - Origin and context fragments.
 * @returns {object} MazeSourceContext.
 */
export function normalizeMazeSourceContext({ origin = "maze", launchContext = {}, placementContext = {} } = {}) {
  const normalizedOrigin = MAZE_QUERY_ORIGINS.includes(origin) ? origin : "maze";
  const launch = launchContext && typeof launchContext === "object" ? launchContext : {};
  const placement = placementContext && typeof placementContext === "object" ? placementContext : {};
  const sourceContext = { origin: normalizedOrigin };

  [
    "readingId",
    "fit",
    "pathType",
    "returnUrl",
    "plainReadingQuery",
    "operatorQuery",
    "factionName",
    "readingTitle"
  ].forEach((field) => {
    const value = launch[field] ?? placement[field];
    if (value !== undefined && value !== null && value !== "") sourceContext[field] = value;
  });

  if (launch.from && !sourceContext.from) sourceContext.from = launch.from;
  if (launch.urlQ) sourceContext.urlQ = launch.urlQ;
  return sourceContext;
}

/**
 * Builds stable dossier/path entries through the shared handoff factory.
 * @param {object} placementContext - Placement/path input.
 * @returns {object[]} MazePathEntry records.
 */
export function buildMazePathEntries(placementContext = {}) {
  return buildDossierMazePathEntries({
    identity: placementContext.identity,
    factionName: placementContext.factionName || placementContext.fit || "this reading",
    oracleTerms: placementContext.oracleTerms || [],
    flavorTerms: placementContext.flavorTerms || []
  });
}

/**
 * Keeps only the Scryfall API metadata currently used by Maze.
 * @param {object} api - Preferred API metadata.
 * @param {object} fallback - Fallback API metadata.
 * @returns {object} Normalized API metadata.
 */
export function normalizeMazeQueryApiMetadata(api = {}, fallback = {}) {
  const endpoint = api.endpoint || fallback.endpoint || DEFAULT_SEARCH_API.endpoint;
  const normalized = { endpoint };
  const unique = normalizeUnique(api.unique || fallback.unique || DEFAULT_SEARCH_API.unique);
  const order = api.order || fallback.order || DEFAULT_SEARCH_API.order;
  const dir = normalizeSortDirection(api.dir || fallback.dir);

  if (endpoint === "/cards/search") {
    if (unique) normalized.unique = unique;
    if (order) normalized.order = String(order).toLowerCase();
    if (dir) normalized.dir = dir;
  }

  return normalized;
}

export { resolveMazeLaunchState };

function buildContractResult({
  query,
  plainReadingQuery,
  reason,
  mode,
  parserMode,
  diagnostics,
  api,
  sourceContext,
  normalized,
  adapterDiagnostics
}) {
  const result = {
    query,
    mode,
    parserMode,
    diagnostics,
    api,
    sourceContext,
    normalized
  };
  if (plainReadingQuery) result.plainReadingQuery = plainReadingQuery;
  if (reason) result.reason = reason;
  if (adapterDiagnostics) result.adapterDiagnostics = adapterDiagnostics;
  return result;
}

function legacyDiagnosticsToMazeDiagnostics(result, source) {
  if (!result) return [];
  const diagnostics = [];
  (result.warnings || []).forEach((message, index) => diagnostics.push({
    level: "warning",
    code: source === "raw" ? "raw_warning" : `parser_warning_${index + 1}`,
    message,
    source
  }));
  (result.unresolved || []).forEach((term) => diagnostics.push({
    level: "warning",
    code: "parser_unresolved_term",
    message: `Unresolved term: ${term}`,
    source,
    field: "input",
    details: { term }
  }));
  (result.alternatives || []).forEach((alternative) => diagnostics.push({
    level: "info",
    code: source === "raw" ? "raw_alternative" : "parser_alternative",
    message: alternative.label || "Alternative query available.",
    source,
    details: { query: alternative.query, api: alternative.api || {} }
  }));
  return diagnostics;
}

function normalizeMazeMode(mode) {
  return MAZE_QUERY_MODES.includes(mode) ? mode : "ai";
}

function normalizeInput(value) {
  return String(value || "").trim();
}

function queryHasFormat(query) {
  return /(^|\s)(?:f|format):[a-z0-9_-]+\b/i.test(String(query || ""));
}

function splitRawSyntaxOnStandaloneAnd(query) {
  const parts = [];
  let current = "";
  let inQuote = false;
  const value = String(query || "");

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (char === '"') {
      inQuote = !inQuote;
      current += char;
      continue;
    }

    if (!inQuote && isStandaloneWordAt(value, i, "AND")) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      i += 2;
      continue;
    }

    current += char;
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
}

function isStandaloneWordAt(value, index, word) {
  const slice = value.slice(index, index + word.length);
  if (slice.toLowerCase() !== word.toLowerCase()) return false;
  const before = index === 0 ? "" : value[index - 1];
  const after = value[index + word.length] || "";
  return !/[A-Za-z0-9_]/.test(before) && !/[A-Za-z0-9_]/.test(after);
}

function normalizeUnique(value) {
  const clean = String(value || "").toLowerCase().trim();
  return ["cards", "art", "prints"].includes(clean) ? clean : undefined;
}

function appendReason(reason, addition) {
  return [reason, addition].filter(Boolean).join(" ");
}

function formatLabel(format) {
  if (!format) return "selected";
  return format.charAt(0).toUpperCase() + format.slice(1);
}

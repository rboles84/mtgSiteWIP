const COLOR_ORDER = ["W", "U", "B", "R", "G", "C"];

/**
 * Converts Visual Builder state into Scryfall syntax.
 * @param {object} filters - Visual Builder filter state.
 * @param {string[]} [filters.colors] - Selected color symbols.
 * @param {string} [filters.colorOp] - Color operator from the builder select.
 * @param {string[]} [filters.types] - Selected card types.
 * @param {string} [filters.format] - Selected format legality.
 * @param {string[]} [filters.rarities] - Selected rarities.
 * @param {string} [filters.cmcMin] - Minimum mana value.
 * @param {string} [filters.cmcMax] - Maximum mana value.
 * @param {string[]} [filters.keywords] - Selected keyword abilities.
 * @returns {string} Built Scryfall query.
 */
export function buildVisualBuilderQuery(filters = {}) {
  const parts = [];
  const colorQuery = buildColorFilterQuery(filters.colors || [], filters.colorOp || "c");
  if (colorQuery) parts.push(colorQuery);

  const types = normalizeList(filters.types);
  if (types.length) parts.push(types.length === 1 ? `t:${types[0]}` : `(${types.map((type) => `t:${type}`).join(" OR ")})`);

  if (filters.format) parts.push(`f:${filters.format}`);

  const rarities = normalizeList(filters.rarities);
  if (rarities.length) parts.push(rarities.length === 1 ? `r:${rarities[0]}` : `(${rarities.map((rarity) => `r:${rarity}`).join(" OR ")})`);

  if (filters.cmcMin) parts.push(`mv>=${filters.cmcMin}`);
  if (filters.cmcMax) parts.push(`mv<=${filters.cmcMax}`);

  const keywords = normalizeList(filters.keywords);
  if (keywords.length) {
    const keywordQueries = keywords.map(formatKeywordQuery);
    parts.push(keywordQueries.length === 1 ? keywordQueries[0] : `(${keywordQueries.join(" OR ")})`);
  }

  return parts.join(" ");
}

/**
 * Splits pasted keyword text into clean keyword tokens.
 * @param {string} value - Raw keyword field text.
 * @param {string[]} knownKeywords - Supported keyword phrases for phrase detection.
 * @returns {string[]} Keyword tokens.
 */
export function parseKeywordInput(value, knownKeywords = []) {
  const normalized = String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const keywords = [...knownKeywords].sort((a, b) => b.length - a.length);
  const pieces = normalized.split(/\s*(?:,|;|\band\b)\s*/).filter(Boolean);
  const found = [];

  pieces.forEach((piece) => {
    if (keywords.includes(piece)) {
      found.push(piece);
      return;
    }

    const matches = keywords.filter((keyword) => hasStandaloneKeyword(piece, keyword));
    if (matches.length) {
      found.push(...matches);
      return;
    }

    const fallback = piece.replace(/[^a-z0-9 -]/g, "").trim();
    if (fallback) found.push(fallback);
  });

  return [...new Set(found)];
}

/**
 * Builds the Scryfall color filter for the Visual Builder operator state.
 * @param {string[]} colors - Selected color symbols.
 * @param {string} colorOp - Color operator from the builder select.
 * @returns {string} Scryfall color or identity query fragment.
 */
function buildColorFilterQuery(colors, colorOp) {
  if (!colors.length) return "";
  const colorText = sortBuilderColors(colors).toLowerCase();

  if (colorText === "c") return colorOp === "id" ? "id:c" : "c:c";
  if (colorOp === "c") return `c=${colorText}`;
  if (colorOp === "id") return `id<=${colorText}`;
  return `${colorOp}${colorText}`;
}

/**
 * Sorts selected builder colors into canonical WUBRGC order.
 * @param {string[]} colors - Selected color symbols.
 * @returns {string} Ordered color symbols.
 */
function sortBuilderColors(colors) {
  const selected = new Set(colors.map((color) => String(color).toUpperCase()));
  return COLOR_ORDER.filter((color) => selected.has(color)).join("");
}

/**
 * Formats one keyword for Scryfall syntax, quoting multi-word keywords.
 * @param {string} keyword - Keyword ability.
 * @returns {string} Scryfall keyword query.
 */
function formatKeywordQuery(keyword) {
  const clean = String(keyword || "").trim().toLowerCase();
  return /\s/.test(clean) ? `kw:"${clean}"` : `kw:${clean}`;
}

/**
 * Normalizes an array of builder values into clean lowercase strings.
 * @param {Array<string>} values - Raw values.
 * @returns {string[]} Clean values.
 */
function normalizeList(values = []) {
  return values.map((value) => String(value || "").trim().toLowerCase()).filter(Boolean);
}

/**
 * Checks whether a keyword appears as a complete phrase.
 * @param {string} value - Text to inspect.
 * @param {string} keyword - Keyword phrase.
 * @returns {boolean} True when the keyword appears as a standalone phrase.
 */
function hasStandaloneKeyword(value, keyword) {
  return new RegExp(`(^|\\s)${escapeRegExp(keyword)}($|\\s)`).test(value);
}

/**
 * Escapes a string for safe regular-expression construction.
 * @param {string} value - Raw string.
 * @returns {string} Escaped string.
 */
function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Calls Scryfall's search endpoint with a compiled query.
 * @param {string} query - Raw Scryfall query syntax.
 * @param {object} [opts] - Search options.
 * @returns {Promise<object>} Scryfall response JSON.
 */
export async function scryfallSearch(query, opts = {}) {
  try {
    const url = buildScryfallApiSearchUrl(query, opts);
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return { object: "error", details: error.message };
  }
}

/**
 * Builds a Scryfall API search URL with query and display metadata separated.
 * @param {string} query - Raw Scryfall query syntax.
 * @param {object} [opts] - Search options.
 * @param {string} [opts.unique] - Scryfall unique mode.
 * @param {string} [opts.order] - Scryfall result order.
 * @param {string} [opts.dir] - Scryfall sort direction.
 * @param {string} [opts.page] - Existing Scryfall next_page URL.
 * @returns {string} Scryfall API URL.
 */
export function buildScryfallApiSearchUrl(query, opts = {}) {
  if (opts.page) return opts.page;
  const { order = "name", unique = "cards", dir } = opts;
  const url = new URL("https://api.scryfall.com/cards/search");
  url.searchParams.set("q", query);
  url.searchParams.set("unique", unique);
  url.searchParams.set("order", order);
  if (dir) url.searchParams.set("dir", dir);
  return url.toString();
}

/**
 * Calls Scryfall's fuzzy named-card endpoint.
 * @param {string} name - Candidate card name.
 * @returns {Promise<object>} Scryfall card response or error object.
 */
export async function scryfallExact(name) {
  try {
    const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`);
    return await response.json();
  } catch (error) {
    return { error: true, details: error.message };
  }
}

/**
 * Calls Scryfall's random card endpoint with an optional query.
 * @param {string} query - Optional Scryfall query.
 * @returns {Promise<object>} Random Scryfall card response or error object.
 */
export async function scryfallRandom(query = "") {
  try {
    const suffix = query ? `?q=${encodeURIComponent(query)}` : "";
    const response = await fetch(`https://api.scryfall.com/cards/random${suffix}`);
    return await response.json();
  } catch (error) {
    return { object: "error", details: error.message };
  }
}

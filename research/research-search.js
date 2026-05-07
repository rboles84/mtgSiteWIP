/**
 * Calls Scryfall's search endpoint with a compiled query.
 * @param {string} query - Raw Scryfall query syntax.
 * @param {object} [opts] - Search options.
 * @returns {Promise<object>} Scryfall response JSON.
 */
export async function scryfallSearch(query, opts = {}) {
  const { order = "name", unique = "cards", page = null } = opts;
  try {
    const url = page || `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=${unique}&order=${order}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return { object: "error", details: error.message };
  }
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

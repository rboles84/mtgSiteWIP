/**
 * Calls Scryfall's search endpoint with a compiled query.
 * @param {string} query - Raw Scryfall query syntax.
 * @param {object} [opts] - Search options.
 * @returns {Promise<object>} Scryfall response JSON.
 */
export async function scryfallSearch(query, opts = {}) {
  try {
    const url = buildScryfallApiSearchUrl(query, opts);
    const cached = readScryfallCache(url);
    if (cached) return cached;
    return await withInFlightDedupe(url, async () => {
      const cachedNow = readScryfallCache(url);
      if (cachedNow) return cachedNow;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data?.object === "list") {
        writeScryfallCache(url, data);
      }
      return data;
    });
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
    const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`;
    const cached = readScryfallCache(url);
    if (cached) return cached;
    return await withInFlightDedupe(url, async () => {
      const cachedNow = readScryfallCache(url);
      if (cachedNow) return cachedNow;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data?.name) {
        writeScryfallCache(url, data);
      }
      return data;
    });
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

const SCRYFALL_CACHE_PREFIX = "vm_scryfall_api_v1:";
const SCRYFALL_IN_FLIGHT_REQUESTS = new Map();

function getScryfallStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (_) {
    return null;
  }
}

function readScryfallCache(url) {
  const storage = getScryfallStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(`${SCRYFALL_CACHE_PREFIX}${url}`);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function writeScryfallCache(url, data) {
  const storage = getScryfallStorage();
  if (!storage) return;
  try {
    storage.setItem(`${SCRYFALL_CACHE_PREFIX}${url}`, JSON.stringify(data));
  } catch (_) {}
}

function withInFlightDedupe(cacheKey, fetcher) {
  if (SCRYFALL_IN_FLIGHT_REQUESTS.has(cacheKey)) {
    return SCRYFALL_IN_FLIGHT_REQUESTS.get(cacheKey);
  }

  const request = Promise.resolve()
    .then(fetcher)
    .finally(() => {
      SCRYFALL_IN_FLIGHT_REQUESTS.delete(cacheKey);
    });

  SCRYFALL_IN_FLIGHT_REQUESTS.set(cacheKey, request);
  return request;
}

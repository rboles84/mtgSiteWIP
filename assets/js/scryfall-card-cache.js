export const SCRYFALL_NAMED_CACHE_SCHEMA_VERSION = 2;
export const SCRYFALL_NAMED_CACHE_KEY = "vm_scryfall_named_cache_v2";
export const SCRYFALL_SUCCESS_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const SCRYFALL_NEGATIVE_TTL_MS = 6 * 60 * 60 * 1000;
export const SCRYFALL_BACKOFF_TTL_MS = 15 * 60 * 1000;
export const SCRYFALL_CACHE_MAX_RECORDS = 200;

export function normalizeScryfallCardName(value = "") {
  return String(value)
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en-US");
}

function emptyCache() {
  return {
    version: SCRYFALL_NAMED_CACHE_SCHEMA_VERSION,
    records: {},
    backoff: null,
  };
}

function safeStorageRead(storage) {
  if (!storage?.getItem) return emptyCache();
  try {
    const parsed = JSON.parse(storage.getItem(SCRYFALL_NAMED_CACHE_KEY) || "null");
    if (
      parsed?.version !== SCRYFALL_NAMED_CACHE_SCHEMA_VERSION ||
      !parsed.records ||
      typeof parsed.records !== "object" ||
      Array.isArray(parsed.records)
    ) {
      return emptyCache();
    }
    return {
      version: SCRYFALL_NAMED_CACHE_SCHEMA_VERSION,
      records: { ...parsed.records },
      backoff: parsed.backoff && typeof parsed.backoff === "object" ? { ...parsed.backoff } : null,
    };
  } catch (_) {
    return emptyCache();
  }
}

function safeStorageWrite(storage, cache) {
  if (!storage?.setItem) return;
  try {
    storage.setItem(SCRYFALL_NAMED_CACHE_KEY, JSON.stringify(cache));
  } catch (_) {}
}

function imageUrisFor(record = {}) {
  const imageUris = record.image_uris && typeof record.image_uris === "object"
    ? record.image_uris
    : record.image_uri
      ? { normal: record.image_uri }
      : null;
  if (!imageUris) return null;
  const clean = {};
  for (const size of ["small", "normal", "large", "png", "art_crop", "border_crop"]) {
    if (typeof imageUris[size] === "string" && /^https:\/\//i.test(imageUris[size])) {
      clean[size] = imageUris[size];
    }
  }
  return Object.keys(clean).length ? clean : null;
}

function sanitizeFace(face = {}) {
  const image_uris = imageUrisFor(face);
  return {
    name: typeof face.name === "string" ? face.name : "",
    type_line: typeof face.type_line === "string" ? face.type_line : "",
    ...(image_uris ? { image_uris } : {}),
  };
}

export function sanitizeScryfallCardRecord(record) {
  if (!record || typeof record !== "object" || typeof record.name !== "string" || !record.name.trim()) {
    return null;
  }
  const image_uris = imageUrisFor(record);
  const scryfall_uri = typeof record.scryfall_uri === "string" && /^https:\/\/scryfall\.com\/card\//i.test(record.scryfall_uri)
    ? record.scryfall_uri
    : "";
  const card_faces = Array.isArray(record.card_faces)
    ? record.card_faces.map(sanitizeFace).filter((face) => face.name || face.type_line || face.image_uris)
    : [];
  if (!image_uris && !card_faces.some((face) => face.image_uris) && !scryfall_uri) return null;
  return {
    name: record.name.trim(),
    ...(record.id ? { id: String(record.id) } : {}),
    ...(record.oracle_id ? { oracle_id: String(record.oracle_id) } : {}),
    ...(image_uris ? { image_uris } : {}),
    ...(scryfall_uri ? { scryfall_uri } : {}),
    ...(typeof record.type_line === "string" ? { type_line: record.type_line } : {}),
    ...(Array.isArray(record.color_identity) ? { color_identity: [...record.color_identity] } : {}),
    ...(record.legalities && typeof record.legalities === "object" ? { legalities: { ...record.legalities } } : {}),
    ...(card_faces.length ? { card_faces } : {}),
  };
}

function recordExpiryMs(record) {
  return record?.status === "success" ? SCRYFALL_SUCCESS_TTL_MS : SCRYFALL_NEGATIVE_TTL_MS;
}

function pruneCache(cache, now) {
  for (const [key, record] of Object.entries(cache.records)) {
    const timestamp = Number(record?.timestamp || 0);
    if (!timestamp || now - timestamp >= recordExpiryMs(record)) delete cache.records[key];
  }
  if (cache.backoff && now >= Number(cache.backoff.until || 0)) cache.backoff = null;
  const entries = Object.entries(cache.records);
  if (entries.length > SCRYFALL_CACHE_MAX_RECORDS) {
    entries
      .sort(([, left], [, right]) => Number(left?.last_accessed || left?.timestamp || 0) - Number(right?.last_accessed || right?.timestamp || 0))
      .slice(0, entries.length - SCRYFALL_CACHE_MAX_RECORDS)
      .forEach(([key]) => delete cache.records[key]);
  }
  return cache;
}

export function createScryfallNamedCardLookup({
  storage = null,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  localResolver = () => null,
  now = () => Date.now(),
} = {}) {
  const inFlight = new Map();
  const failedThisPage = new Set();

  function readCache() {
    const current = pruneCache(safeStorageRead(storage), now());
    safeStorageWrite(storage, current);
    return current;
  }

  function writeRecord(key, record) {
    const current = readCache();
    current.records[key] = record;
    pruneCache(current, now());
    safeStorageWrite(storage, current);
  }

  async function lookup(name, { recordType = "CARD" } = {}) {
    const requestedName = String(name || "").trim();
    const key = normalizeScryfallCardName(requestedName);
    if (recordType !== "CARD" || !key) return null;

    const local = sanitizeScryfallCardRecord(localResolver(requestedName));
    if (local) return local;

    const cached = readCache();
    const cachedRecord = cached.records[key];
    if (cachedRecord?.status === "success") {
      const card = sanitizeScryfallCardRecord(cachedRecord.card);
      if (card) {
        cachedRecord.last_accessed = now();
        safeStorageWrite(storage, cached);
        return card;
      }
      delete cached.records[key];
      safeStorageWrite(storage, cached);
    }
    if (cachedRecord?.status === "not_found") return null;
    if (cached.backoff && now() < Number(cached.backoff.until || 0)) return null;
    if (failedThisPage.has(key)) return null;
    if (!fetchImpl) return null;

    if (inFlight.has(key)) return inFlight.get(key);
    const request = (async () => {
      const latest = readCache();
      if (latest.records[key]?.status === "success") {
        return sanitizeScryfallCardRecord(latest.records[key].card);
      }
      if (latest.records[key]?.status === "not_found") return null;
      if (latest.backoff && now() < Number(latest.backoff.until || 0)) return null;

      const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(requestedName)}`;
      let response;
      try {
        response = await fetchImpl(url);
      } catch (_) {
        failedThisPage.add(key);
        return null;
      }
      const timestamp = now();
      if (response.status === 429) {
        const current = readCache();
        current.backoff = { status: 429, timestamp, until: timestamp + SCRYFALL_BACKOFF_TTL_MS };
        safeStorageWrite(storage, current);
        return null;
      }
      if (response.status === 404) {
        writeRecord(key, { status: "not_found", canonical_name: requestedName, timestamp, last_accessed: timestamp });
        return null;
      }
      if (!response.ok) {
        failedThisPage.add(key);
        return null;
      }
      let payload;
      try {
        payload = await response.json();
      } catch (_) {
        failedThisPage.add(key);
        return null;
      }
      const card = sanitizeScryfallCardRecord(payload);
      if (!card) {
        failedThisPage.add(key);
        return null;
      }
      writeRecord(key, {
        status: "success",
        canonical_name: card.name,
        timestamp,
        last_accessed: timestamp,
        image_uri: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "",
        scryfall_uri: card.scryfall_uri || "",
        card,
      });
      return card;
    })().finally(() => inFlight.delete(key));
    inFlight.set(key, request);
    return request;
  }

  return {
    lookup,
    clear() {
      try {
        storage?.removeItem?.(SCRYFALL_NAMED_CACHE_KEY);
      } catch (_) {}
      inFlight.clear();
      failedThisPage.clear();
    },
    inspect: readCache,
  };
}

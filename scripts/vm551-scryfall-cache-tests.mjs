import assert from "node:assert/strict";
import {
  SCRYFALL_BACKOFF_TTL_MS,
  SCRYFALL_CACHE_MAX_RECORDS,
  SCRYFALL_NAMED_CACHE_KEY,
  SCRYFALL_NEGATIVE_TTL_MS,
  SCRYFALL_SUCCESS_TTL_MS,
  createScryfallNamedCardLookup as createRawScryfallNamedCardLookup,
  mergeScryfallCardRecords,
} from "../assets/js/scryfall-card-cache.js";

const createScryfallNamedCardLookup = (options = {}) => createRawScryfallNamedCardLookup({
  wait: async () => {},
  ...options,
});

class MemoryStorage {
  #values = new Map();
  getItem(key) { return this.#values.has(key) ? this.#values.get(key) : null; }
  setItem(key, value) { this.#values.set(key, String(value)); }
  removeItem(key) { this.#values.delete(key); }
}

const card = (name) => ({
  id: `${name.toLowerCase().replace(/\s+/g, "-")}-id`,
  name,
  image_uris: { normal: `https://cards.scryfall.io/normal/${encodeURIComponent(name)}.jpg` },
  scryfall_uri: `https://scryfall.com/card/test/1/${name.toLowerCase().replace(/\s+/g, "-")}`,
  mana_cost: "{2}",
  type_line: "Land",
  oracle_text: "Add one mana of any color.",
  color_identity: [],
  legalities: { commander: "legal" },
});
const response = (status, payload = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  async json() { return payload; },
});

let clock = 1_800_000_000_000;
const now = () => clock;
const storage = new MemoryStorage();
let calls = [];
const payloads = new Map([
  ["Exotic Orchard", card("Exotic Orchard")],
  ["Myriad Landscape", card("Myriad Landscape")],
]);
const fetchImpl = async (url) => {
  calls.push(url);
  const name = decodeURIComponent(new URL(url).searchParams.get("fuzzy"));
  return response(200, payloads.get(name) || card(name));
};

const firstPage = createScryfallNamedCardLookup({ storage, fetchImpl, now });
const [exoticFirst, exoticConcurrent] = await Promise.all([
  firstPage.lookup("Exotic Orchard"),
  firstPage.lookup("Exotic Orchard"),
]);
assert.equal(calls.length, 1, "The first valid lookup may use the network.");
assert.equal(exoticFirst.name, "Exotic Orchard");
assert.equal(exoticConcurrent.name, "Exotic Orchard", "Concurrent same-card lookups must share one in-flight request.");
assert.match(exoticFirst.scryfall_uri, /^https:\/\/scryfall\.com\/card\//);
const exoticSamePage = await firstPage.lookup("Exotic Orchard");
assert.equal(calls.length, 1, "A repeated same-page lookup must use the cache.");
assert.equal(exoticSamePage.image_uris.normal, exoticFirst.image_uris.normal);

const reloadedPage = createScryfallNamedCardLookup({ storage, fetchImpl, now });
const exoticAfterReload = await reloadedPage.lookup("Exotic Orchard");
assert.equal(calls.length, 1, "Exotic Orchard must survive a simulated page reload without another request.");
assert.equal(exoticAfterReload.scryfall_uri, exoticFirst.scryfall_uri, "The cached Scryfall action must remain visible-capable.");
await reloadedPage.lookup("Myriad Landscape");
assert.equal(calls.length, 2);
const secondReload = createScryfallNamedCardLookup({ storage, fetchImpl, now });
const myriadAfterReload = await secondReload.lookup("Myriad Landscape");
assert.equal(calls.length, 2, "Myriad Landscape must survive a simulated page reload without another request.");
assert.match(myriadAfterReload.image_uris.normal, /Myriad%20Landscape/);

const cacheEnvelope = JSON.parse(storage.getItem(SCRYFALL_NAMED_CACHE_KEY));
assert.deepEqual(Object.keys(cacheEnvelope.records).sort(), ["exotic orchard", "myriad landscape"]);
assert.equal(cacheEnvelope.records["exotic orchard"].status, "success");
assert.ok(cacheEnvelope.records["exotic orchard"].timestamp);
assert.ok(cacheEnvelope.records["exotic orchard"].image_uri);

let notFoundCalls = 0;
const negativeStorage = new MemoryStorage();
const negativeLookup = createScryfallNamedCardLookup({
  storage: negativeStorage,
  now,
  fetchImpl: async () => { notFoundCalls += 1; return response(404); },
});
assert.equal(await negativeLookup.lookup("Definitely Not A Card"), null);
assert.equal(await negativeLookup.lookup("Definitely Not A Card"), null);
const negativeReload = createScryfallNamedCardLookup({
  storage: negativeStorage,
  now,
  fetchImpl: async () => { notFoundCalls += 1; return response(404); },
});
assert.equal(await negativeReload.lookup("Definitely Not A Card"), null);
assert.equal(notFoundCalls, 1, "A 404 must be negatively cached across reloads.");
clock += SCRYFALL_NEGATIVE_TTL_MS + 1;
await negativeReload.lookup("Definitely Not A Card");
assert.equal(notFoundCalls, 2, "An expired negative entry must be refreshed.");

let rateLimitCalls = 0;
const backoffStorage = new MemoryStorage();
const backoffLookup = createScryfallNamedCardLookup({
  storage: backoffStorage,
  now,
  fetchImpl: async () => { rateLimitCalls += 1; return response(429); },
});
assert.equal(await backoffLookup.lookup("Exotic Orchard"), null);
assert.equal(await backoffLookup.lookup("Myriad Landscape"), null);
assert.equal(rateLimitCalls, 2, "A 429 may receive one bounded retry before opening shared backoff.");
const backoffReload = createScryfallNamedCardLookup({
  storage: backoffStorage,
  now,
  fetchImpl: async () => { rateLimitCalls += 1; return response(429); },
});
assert.equal(await backoffReload.lookup("Command Tower"), null);
assert.equal(rateLimitCalls, 2, "The 429 backoff must survive reloads.");
clock += SCRYFALL_BACKOFF_TTL_MS + 1;
await backoffReload.lookup("Command Tower");
assert.equal(rateLimitCalls, 4, "The temporary backoff must expire and again permit one bounded retry.");

const expiredStorage = new MemoryStorage();
let expiryCalls = 0;
const expiringLookup = createScryfallNamedCardLookup({
  storage: expiredStorage,
  now,
  fetchImpl: async () => { expiryCalls += 1; return response(200, card("Command Tower")); },
});
await expiringLookup.lookup("Command Tower");
clock += SCRYFALL_SUCCESS_TTL_MS + 1;
await expiringLookup.lookup("Command Tower");
assert.equal(expiryCalls, 2, "Expired successful entries must refresh.");

const corruptStorage = new MemoryStorage();
corruptStorage.setItem(SCRYFALL_NAMED_CACHE_KEY, "{not-json");
let corruptCalls = 0;
const corruptLookup = createScryfallNamedCardLookup({
  storage: corruptStorage,
  now,
  fetchImpl: async () => { corruptCalls += 1; return response(200, card("Arcane Signet")); },
});
assert.equal((await corruptLookup.lookup("Arcane Signet")).name, "Arcane Signet");
assert.equal(corruptCalls, 1, "Corrupt cache data must be ignored safely.");

const localStorage = new MemoryStorage();
let localCalls = 0;
const localLookup = createScryfallNamedCardLookup({
  storage: localStorage,
  now,
  localResolver: (name) => name === "Local Card" ? card("Local Card") : null,
  fetchImpl: async () => { localCalls += 1; return response(500); },
});
assert.equal((await localLookup.lookup("Local Card")).name, "Local Card");
assert.equal(localCalls, 0, "Committed local card data must precede persistent cache and network.");

const slimLocalCard = {
  id: "slim-local-card-id",
  name: "Slim Local Card",
  image_uris: { normal: "https://cards.scryfall.io/normal/slim-local-card.jpg" },
  scryfall_uri: "https://scryfall.com/card/test/2/slim-local-card",
  type_line: "Creature — Test",
  oracle_excerpt: "A committed canonical excerpt.",
};
let detailCalls = 0;
const detailLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  now,
  localResolver: (name) => name === "Slim Local Card" ? slimLocalCard : null,
  fetchImpl: async () => {
    detailCalls += 1;
    return response(200, { ...card("Slim Local Card"), oracle_text: "The complete canonical Oracle text." });
  },
});

const mergedLocalRecord = mergeScryfallCardRecords(
  { name: "Merged Card", type_line: "Creature — Test", image_uris: { normal: "preferred.jpg" }, card_faces: [] },
  { name: "Merged Card", mana_cost: "{3}", oracle_excerpt: "Retained canonical excerpt.", image_uris: { art_crop: "fallback.jpg" } },
);
assert.equal(mergedLocalRecord.image_uris.normal, "preferred.jpg");
assert.equal(mergedLocalRecord.image_uris.art_crop, "fallback.jpg");
assert.equal(mergedLocalRecord.mana_cost, "{3}");
assert.equal(mergedLocalRecord.oracle_excerpt, "Retained canonical excerpt.", "A later slim index must not erase canonical detail fields from another local index.");
const completeDetail = await detailLookup.lookup("Slim Local Card", { requireDetails: true });
assert.equal(detailCalls, 0, "A committed Oracle excerpt is a sufficient offline detail and must not trigger unnecessary enrichment.");
assert.equal(completeDetail.oracle_excerpt, "A committed canonical excerpt.");

let enrichmentCalls = 0;
const enrichmentLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  now,
  localResolver: (name) => name === "Undetailed Local Card" ? { ...slimLocalCard, name, oracle_excerpt: "" } : null,
  fetchImpl: async () => {
    enrichmentCalls += 1;
    return response(200, { ...card("Undetailed Local Card"), oracle_text: "The complete canonical Oracle text." });
  },
});
const enrichedDetail = await enrichmentLookup.lookup("Undetailed Local Card", { requireDetails: true });
assert.equal(enrichmentCalls, 1, "A local card without Oracle text or excerpt should request canonical detail.");
assert.equal(enrichedDetail.mana_cost, "{2}");
assert.equal(enrichedDetail.oracle_text, "The complete canonical Oracle text.");

let fallbackCalls = 0;
const fallbackDetailLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  now,
  localResolver: (name) => name === "Undetailed Local Card" ? { ...slimLocalCard, name, oracle_excerpt: "" } : null,
  fetchImpl: async () => {
    fallbackCalls += 1;
    return response(500);
  },
});
const fallbackDetail = await fallbackDetailLookup.lookup("Undetailed Local Card", { requireDetails: true });
assert.equal(fallbackCalls, 2, "A transient enrichment failure receives one isolated retry.");
assert.equal(fallbackDetail.type_line, "Creature — Test", "A failed enrichment may still return the verified local facts without generated copy.");

const flavorStorage = new MemoryStorage();
let flavorCalls = 0;
const flavorLookup = createScryfallNamedCardLookup({
  storage: flavorStorage,
  now,
  fetchImpl: async () => {
    flavorCalls += 1;
    return response(200, card("Flavor Signal Card"));
  },
});
assert.equal((await flavorLookup.lookup("Flavor Signal Card")).name, "Flavor Signal Card");
assert.equal(flavorCalls, 1, "A first unresolved flavor-card image may use the named-card endpoint.");
const flavorReload = createScryfallNamedCardLookup({
  storage: flavorStorage,
  now,
  fetchImpl: async () => {
    flavorCalls += 1;
    return response(500);
  },
});
const cachedFlavorCard = await flavorReload.lookup("Flavor Signal Card");
assert.equal(flavorCalls, 1, "A flavor-card image must reuse the existing persistent cache after reload.");
assert.match(cachedFlavorCard.image_uris.normal, /Flavor%20Signal%20Card/);
assert.match(cachedFlavorCard.scryfall_uri, /^https:\/\/scryfall\.com\/card\//, "Cached flavor art must preserve its visible Scryfall action.");

const frontFaceRecord = {
  id: "0f6e668d-2502-4e82-b4c2-ef34c9afa27e",
  name: "Jerren, Corrupted Bishop // Ormendahl, the Corrupter",
  scryfall_uri: "https://scryfall.com/card/mid/109/jerren-corrupted-bishop-ormendahl-the-corrupter",
  card_faces: [{
    name: "Jerren, Corrupted Bishop",
    image_uris: { normal: "https://cards.scryfall.io/normal/front/0/f/0f6e668d-2502-4e82-b4c2-ef34c9afa27e.jpg" },
  }],
};
let frontFaceCalls = 0;
const frontFaceLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  now,
  localResolver: (name) => name === "Jerren, Corrupted Bishop" ? frontFaceRecord : null,
  fetchImpl: async () => { frontFaceCalls += 1; return response(500); },
});
const localFrontFace = await frontFaceLookup.lookup("Jerren, Corrupted Bishop");
assert.match(localFrontFace.card_faces[0].image_uris.normal, /\/front\//);
assert.equal(frontFaceCalls, 0, "A canonical local front-face record must avoid a decorative combined-label network lookup.");

const productStorage = new MemoryStorage();
let productCalls = 0;
const productLookup = createScryfallNamedCardLookup({
  storage: productStorage,
  now,
  fetchImpl: async () => { productCalls += 1; return response(200, card("First Flight")); },
});
assert.equal(await productLookup.lookup("First Flight", { recordType: "PRECON" }), null);
assert.equal(productCalls, 0, "Precon and product labels must never reach the card endpoint.");
assert.deepEqual(productLookup.inspect().records, {}, "Precon labels must never become cache keys.");

const malformedStorage = new MemoryStorage();
let malformedCalls = 0;
const malformedLookup = createScryfallNamedCardLookup({
  storage: malformedStorage,
  now,
  fetchImpl: async () => { malformedCalls += 1; return response(200, { name: "Malformed without locators" }); },
});
assert.equal(await malformedLookup.lookup("Malformed without locators"), null);
assert.equal(await malformedLookup.lookup("Malformed without locators"), null);
assert.equal(malformedCalls, 2, "Malformed responses remain retryable and are not cached as authoritative misses.");
assert.deepEqual(malformedLookup.inspect().records, {});
const malformedReload = createScryfallNamedCardLookup({
  storage: malformedStorage,
  now,
  fetchImpl: async () => { malformedCalls += 1; return response(200, { name: "Malformed without locators" }); },
});
assert.equal(await malformedReload.lookup("Malformed without locators"), null);
assert.equal(malformedCalls, 3, "Malformed responses must not enter persistent cache; a later reload may recover.");

const boundedStorage = new MemoryStorage();
const boundedLookup = createScryfallNamedCardLookup({
  storage: boundedStorage,
  now: () => ++clock,
  fetchImpl: async (url) => {
    const name = decodeURIComponent(new URL(url).searchParams.get("fuzzy"));
    return response(200, card(name));
  },
});
for (let index = 0; index < SCRYFALL_CACHE_MAX_RECORDS + 5; index += 1) {
  await boundedLookup.lookup(`Bounded Card ${index}`);
}
assert.equal(Object.keys(boundedLookup.inspect().records).length, SCRYFALL_CACHE_MAX_RECORDS, "The persistent cache must remain bounded.");

console.log("PASS VM-551 reload-persistent Scryfall cache checks");

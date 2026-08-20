import assert from "node:assert/strict";
import { createScryfallNamedCardLookup } from "../assets/js/archscry/scryfall-card-cache.js";

class MemoryStorage {
  #values = new Map();
  getItem(key) { return this.#values.has(key) ? this.#values.get(key) : null; }
  setItem(key, value) { this.#values.set(key, String(value)); }
  removeItem(key) { this.#values.delete(key); }
}

const card = (name) => ({
  id: `${name.toLowerCase().replace(/\s+/g, "-")}-printing`,
  oracle_id: `${name.toLowerCase().replace(/\s+/g, "-")}-oracle`,
  name,
  image_uris: { normal: `https://cards.scryfall.io/normal/${encodeURIComponent(name)}.jpg` },
  image_candidates: [
    { kind: "normal", url: `https://cards.scryfall.io/normal/${encodeURIComponent(name)}.jpg` },
    { kind: "large", url: `https://cards.scryfall.io/large/${encodeURIComponent(name)}.jpg` },
  ],
  scryfall_uri: `https://scryfall.com/card/test/1/${name.toLowerCase().replace(/\s+/g, "-")}`,
  type_line: "Land",
});

const response = (status, payload = {}, retryAfter = null) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: (name) => name.toLowerCase() === "retry-after" ? retryAfter : null },
  async json() { return payload; },
});

const projectionCard = card("Swamp");
let networkCalls = 0;
const authoredLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  authoredResolver: (name) => name === "Swamp" ? projectionCard : null,
  localResolver: () => null,
  fetchImpl: async () => { networkCalls += 1; return response(200, card("Unexpected")); },
  wait: async () => {},
  minRequestIntervalMs: 0,
});

const authoredHit = await authoredLookup.lookupResult("Swamp", { policy: "authored_projection" });
assert.equal(authoredHit.status, "resolved");
assert.equal(authoredHit.source, "authored-projection");
assert.equal(authoredHit.card.id, projectionCard.id);
assert.equal(authoredHit.card.oracle_id, projectionCard.oracle_id);
assert.deepEqual(authoredHit.card.image_candidates, projectionCard.image_candidates, "Projection candidate order must survive sanitization.");

const authoredMiss = await authoredLookup.lookupResult("Missing Authored Card", { policy: "authored_projection" });
assert.equal(authoredMiss.status, "projection_missing");
assert.equal(authoredMiss.card, null);
assert.equal(networkCalls, 0, "Governed projection misses must never call api.scryfall.com.");

let staleCalls = 0;
const staleLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  fetchImpl: async () => { staleCalls += 1; return response(200, card("Stale")); },
  wait: async () => {},
  minRequestIntervalMs: 0,
});
const staleResult = await staleLookup.lookupResult("Stale", {
  policy: "dynamic_fallback",
  shouldDispatch: () => false,
});
assert.equal(staleResult.status, "deferred");
assert.equal(staleResult.source, "superseded");
assert.equal(staleCalls, 0, "Superseded work must be discarded before consuming fallback capacity.");

let transientCalls = 0;
const transientLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  fetchImpl: async () => { transientCalls += 1; return response(500); },
  wait: async () => {},
  minRequestIntervalMs: 0,
});
const transient = await transientLookup.lookupResult("Transient Card");
assert.equal(transient.status, "transient_error");
assert.equal(transientCalls, 2, "Transient work receives exactly one isolated retry.");
assert.deepEqual(transientLookup.inspect().records, {}, "Transient failures must not poison the authoritative cache.");

let limitedCalls = 0;
const limitedStorage = new MemoryStorage();
const limitedLookup = createScryfallNamedCardLookup({
  storage: limitedStorage,
  fetchImpl: async () => { limitedCalls += 1; return response(429, {}, "0"); },
  wait: async () => {},
  minRequestIntervalMs: 0,
});
const limited = await limitedLookup.lookupResult("Rate Limited");
assert.equal(limited.status, "transient_error");
assert.equal(limitedCalls, 2);
const deferred = await limitedLookup.lookupResult("Another Card");
assert.equal(deferred.status, "deferred");
assert.equal(limitedCalls, 2, "Circuit-breaker deferral must isolate later slots from a request storm.");

let queuedLimitCalls = 0;
const queuedLimitLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  fetchImpl: async () => { queuedLimitCalls += 1; return response(429, {}, "0"); },
  wait: async () => {},
  minRequestIntervalMs: 0,
});
const queuedLimitResults = await Promise.all([
  queuedLimitLookup.lookupResult("Queued One"),
  queuedLimitLookup.lookupResult("Queued Two"),
  queuedLimitLookup.lookupResult("Queued Three"),
]);
assert.equal(queuedLimitCalls, 2, "Queued work must recheck shared backoff before dispatch.");
assert.deepEqual(queuedLimitResults.map((result) => result.status), ["transient_error", "deferred", "deferred"]);

let notFoundCalls = 0;
const notFoundLookup = createScryfallNamedCardLookup({
  storage: new MemoryStorage(),
  fetchImpl: async () => { notFoundCalls += 1; return response(404); },
  wait: async () => {},
  minRequestIntervalMs: 0,
});
const notFound = await notFoundLookup.lookupResult("Authoritative Miss");
assert.equal(notFound.status, "not_found");
assert.equal((await notFoundLookup.lookupResult("Authoritative Miss")).status, "not_found");
assert.equal(notFoundCalls, 1, "Only authoritative 404 outcomes may receive persistent negative caching.");

console.log("PASS VM-559 projection-only and isolated fallback resolver checks");

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const registry = JSON.parse(await readFile(new URL("../data/scryfall/grounding/plain-reading-semantics.json", import.meta.url), "utf8"));

assert.equal(registry.schemaVersion, 1, "semantic registry schemaVersion must be 1");
assert.ok(Array.isArray(registry.entries), "semantic registry entries must be an array");
assert.ok(registry.entries.length >= 20, "semantic registry should contain the Phase 1 concept base");

const ids = new Set();
for (const entry of registry.entries) {
  assert.ok(entry.id && typeof entry.id === "string", "registry entry missing id");
  assert.ok(!ids.has(entry.id), `duplicate registry entry id: ${entry.id}`);
  ids.add(entry.id);
  assert.ok(entry.label && typeof entry.label === "string", `${entry.id} missing label`);
  assert.ok(entry.kind && typeof entry.kind === "string", `${entry.id} missing kind`);
  assert.ok(Array.isArray(entry.triggers) && entry.triggers.length, `${entry.id} missing triggers`);
  assert.ok(Array.isArray(entry.fragments) && entry.fragments.length, `${entry.id} missing fragments`);
  assert.ok(Number.isFinite(entry.confidence), `${entry.id} missing numeric confidence`);
  assert.ok(entry.confidence >= 0.5 && entry.confidence <= 1, `${entry.id} confidence out of range`);
  for (const trigger of entry.triggers) {
    assert.equal(trigger, trigger.toLowerCase(), `${entry.id} trigger should be lowercase: ${trigger}`);
    assert.ok(!/[<>]/.test(trigger), `${entry.id} trigger contains markup-like characters`);
  }
  for (const fragment of entry.fragments) {
    assert.ok(
      /^(?:-?(?:o|fo|otag|kw|type|t|is|not|c|id|mv|pow|tou|usd|eur|tix|produces|r|f|legal|banned|restricted|lang|frame)[<>=:]|\(|\))/i.test(fragment),
      `${entry.id} fragment does not look like Scryfall syntax: ${fragment}`
    );
  }
  for (const alternative of entry.alternatives || []) {
    assert.ok(alternative.label && alternative.query, `${entry.id} alternative must include label and query`);
  }
}

for (const required of [
  "board-wipe",
  "card-draw",
  "counterspell",
  "counter-any",
  "sacrifice-outlet",
  "tokens",
  "treasure",
  "ramp",
  "blink",
  "mill"
]) {
  assert.ok(ids.has(required), `required semantic entry missing: ${required}`);
}

console.log("Plain Reading semantic registry validation passed.");

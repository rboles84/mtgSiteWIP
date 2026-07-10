import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const grounding = JSON.parse(await readFile(new URL("../data/scryfall/grounding/scryfall-grounding.json", import.meta.url), "utf8"));

assert.equal(grounding.schemaVersion, 1, "grounding schemaVersion must be 1");
assert.ok(grounding.sources?.apiBase === "https://api.scryfall.com", "grounding source must be Scryfall API");
assert.ok(Array.isArray(grounding.catalogs?.creatureTypes), "creatureTypes catalog missing");
assert.ok(Array.isArray(grounding.catalogs?.keywordAbilities), "keywordAbilities catalog missing");
assert.ok(grounding.sets?.byCode && Object.keys(grounding.sets.byCode).length > 0, "set code index missing");
assert.ok(grounding.aliases?.villain?.some((candidate) => candidate.kind === "typeLine"), "Villain type alias missing");
assert.ok(grounding.aliases?.insect?.some((candidate) => candidate.kind === "typeLine"), "Insect type alias missing");
assert.ok(grounding.aliases?.haste?.some((candidate) => candidate.kind === "keyword"), "haste keyword alias missing");

const spider = grounding.setFamilies?.spm;
assert.ok(spider, "Spider-Man product family missing");
assert.deepEqual(spider.setCodes, ["spm", "spe", "aspm", "pspm", "tspm"], "Spider-Man family code order changed");
assert.equal(spider.source, "manual-override", "Spider-Man family should document manual override source");
for (const code of spider.setCodes) {
  assert.ok(grounding.sets.byCode[code], `Spider-Man family code ${code} missing from Scryfall set index`);
}

const marvelFamilies = new Set((grounding.aliases.marvel || [])
  .filter((candidate) => candidate.kind === "setFamily")
  .map((candidate) => candidate.id));
assert.ok(marvelFamilies.size > 1, "Marvel alias should remain ambiguous across multiple product families");

console.log("Scryfall grounding artifact validation passed.");

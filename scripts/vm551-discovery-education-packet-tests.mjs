import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const source = await readJson("data/dossier/discovery-education-authority.source.json");
const ids = source.records.map((record) => record.record_id);
assert.equal(new Set(ids).size, ids.length, "record IDs must be unique");

const terms = source.records.filter((record) => record.record_type === "GLOSSARY_TERM");
const normalized = new Set(terms.flatMap((record) => [record.term, ...record.aliases].map((value) => value.toLowerCase())));
const required = [
  "control", "tempo", "spellslinger", "tokens", "big spell storm", "spell copying",
  "protection", "aristocrats", "storm", "convoke", "populate", "goad", "voltron",
  "blink/flicker", "wastes", "colorless mana", "generic mana", "devoid", "mana rocks",
];
for (const term of required) assert(normalized.has(term), `missing required glossary term: ${term}`);

const formal = new Set(["glossary_protection", "glossary_convoke", "glossary_populate", "glossary_goad", "glossary_wastes", "glossary_colorless_mana", "glossary_generic_mana", "glossary_devoid"]);
for (const record of source.records.filter((item) => formal.has(item.record_id))) {
  assert.equal(record.provenance.role, "official_game_rule");
  assert.match(record.provenance.locator, /^(https:\/\/magic\.wizards\.com\/|docs\/research\/colorless\/source-material\/official\/)/);
  assert.equal(record.disposition, "REVIEW_REQUIRED");
}

const review = source.records.filter((record) => record.disposition === "REVIEW_REQUIRED");
assert.equal(review.length, 23);
assert(review.every((record) => record.owner_decision === null));
assert(review.every((record) => record.proposed_copy.trim() && record.limitations.trim() && record.provenance.locator.trim()));

const runtime = await readFile("assets/js/index.js", "utf8");
for (const record of review) assert(!runtime.includes(record.record_id), `${record.record_id} leaked into runtime`);

console.log(JSON.stringify({
  records: source.records.length,
  baseline: source.records.filter((record) => record.disposition === "APPROVED_PUBLIC").length,
  reviewRequired: review.length,
  requiredTerms: required.length,
  formalRuleTerms: formal.size,
  runtimeLeaks: 0,
}, null, 2));

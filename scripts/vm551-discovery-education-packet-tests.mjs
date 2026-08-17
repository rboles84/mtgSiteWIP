import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const source = await readJson("data/dossier/discovery-education-authority.source.json");
const adjudication = await readJson("data/dossier/discovery-education-automatic-adjudication.source.json");
const catalog = await readJson("data/dossier/discovery-education-catalog.json");
const ids = source.records.map((record) => record.record_id);
assert.equal(new Set(ids).size, ids.length, "record IDs must be unique");

const terms = source.records.filter((record) => record.record_type === "GLOSSARY_TERM");
const normalized = new Set(terms.flatMap((record) => [record.term, ...record.aliases].map((value) => value.toLowerCase())));
const required = [
  "control", "tempo", "spellslinger", "tokens", "big spell storm", "spell copying",
  "protection", "aristocrats", "storm", "convoke", "populate", "goad", "voltron",
  "blink/flicker", "wastes", "colorless mana", "generic mana", "devoid", "mana rocks",
  "aggro", "counters matter", "sacrifice", "graveyard value", "devour", "equipment",
  "big mana", "landfall", "trample", "afterlife", "artifacts", "bgx midrange", "burn",
  "dredge", "enchantments", "enchantress", "exalted", "go-wide", "group hug", "haste",
  "heroic", "historic", "impulse draw", "land denial", "lifegain", "mill", "politics",
  "reanimator", "surveil", "theft", "treasure", "typal",
];
for (const term of required) assert(normalized.has(term), `missing required glossary term: ${term}`);

assert(!normalized.has("counters"), "ordinary bare 'counters' must not be decorated as a specialist term");

const formal = new Set(["glossary_protection", "glossary_convoke", "glossary_populate", "glossary_goad", "glossary_trample", "glossary_wastes", "glossary_colorless_mana", "glossary_generic_mana", "glossary_devoid"]);
for (const record of source.records.filter((item) => formal.has(item.record_id))) {
  assert.equal(record.provenance.role, "official_game_rule");
  assert.match(record.provenance.locator, /^(https:\/\/magic\.wizards\.com\/|docs\/research\/colorless\/source-material\/official\/)/);
  assert.equal(record.disposition, "PENDING_AUTOMATIC_VALIDATION");
}

const review = source.records.filter((record) => record.disposition === "PENDING_AUTOMATIC_VALIDATION");
assert.ok(review.length > 0);
assert(review.every((record) => record.owner_decision === null));
assert(review.every((record) => record.proposed_copy.trim() && record.limitations.trim() && record.provenance.locator.trim()));

assert.equal(adjudication.records.filter((record) => record.disposition === "REVIEW_REQUIRED").length, 0);
assert.equal(adjudication.records.filter((record) => record.disposition === "APPROVED_PUBLIC").length, source.records.length);
assert.equal(adjudication.records.filter((record) => record.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC").length, review.length);
assert.equal(catalog.glossary.length, terms.length);
assert.equal(catalog.microcopy.length, 4);
assert.equal(catalog.glossary.length, 65, "expected VM-565's curated 65-record glossary");
assert.equal(catalog.glossary.filter((record) => record.teaching_policy?.mode === "EXPLICIT_TARGETS").length, 23);
assert.equal(catalog.glossary.filter((record) => record.teaching_policy?.mode === "LEGACY_WITH_OVERRIDES").length, 7);
assert.equal(catalog.glossary.reduce((sum, record) => sum + (record.teaching_policy?.targets?.length || 0), 0), 41);
assert.equal(catalog.glossary.find((record) => record.record_id === "glossary_mana_rocks")?.definition, "Artifacts that produce mana, helping a deck accelerate or fix its mana.");
const runtime = await readFile("assets/js/index.js", "utf8");
assert.match(runtime, /discovery-education-catalog\.json/);
assert.doesNotMatch(runtime, /const ARCHSCRY_TERM_HELP/);
assert.match(runtime, /policy\?\.mode === "EXPLICIT_TARGETS"/);
assert.match(runtime, /renderEducationalText\(item\.name, "what-to-look-for-title"/);
assert.match(runtime, /renderEducationalText\(presentation\.mechanical_expression, "how-this-plays", "mechanical-expression"\)/);
assert.match(runtime, /"mana-notes", "rocks-and-sources"/);

console.log(JSON.stringify({
  records: source.records.length,
  baseline: source.records.filter((record) => record.disposition === "APPROVED_PUBLIC").length,
  automaticValidationInput: review.length,
  requiredTerms: required.length,
  formalRuleTerms: formal.size,
  approvedRuntimeGlossary: catalog.glossary.length,
  approvedRuntimeMicrocopy: catalog.microcopy.length,
  ownerExceptions: 0,
}, null, 2));

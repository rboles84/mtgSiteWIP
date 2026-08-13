import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), "utf8"));
const [packet, rationales, rationaleCatalog, voices, voiceCatalog] = await Promise.all([
  readJson("data/dossier/card-content-review-proposals.source.json"),
  readJson("data/dossier/card-rationale-relationships.source.json"),
  readJson("data/dossier/card-rationale-catalog.json"),
  readJson("data/dossier/card-voice-relationships.source.json"),
  readJson("data/dossier/card-voice-catalog.json"),
]);

assert.equal(packet.proposals.filter((row) => row.disposition === "REVIEW_REQUIRED").length, 0);
assert.equal(packet.proposals.filter((row) => row.disposition === "EVIDENCE_NEEDED").length, 0);
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_RATIONALE" && row.disposition === "APPROVED_PUBLIC").length, 25);
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE" && row.disposition === "APPROVED_PUBLIC").length, 37);
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE" && row.disposition === "REJECTED").length, 81);
assert.equal(new Set(rationales.records.filter((row) => row.review_status === "APPROVED_PUBLIC").map((row) => row.identity_key)).size, 37);
assert.equal(new Set(rationaleCatalog.records.map((row) => row.identity_key)).size, 37);
assert.equal(voices.records.length, 37);
assert.equal(voiceCatalog.records.length, 37);
assert.equal(new Set(voices.records.map((row) => row.identity_key)).size, 37);
for (const row of [...packet.proposals.filter((record) => record.disposition === "APPROVED_PUBLIC"), ...rationales.records.filter((record) => record.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC"), ...voices.records]) {
  assert.equal(row.approval_basis, "EVIDENCE_VALIDATED_AUTOMATIC");
  assert.equal(row.validation?.passed, true);
  assert.equal(row.validation?.validator_version, "vm551-evidence-validator-v1");
  assert.equal(row.owner_decision ?? null, null);
}
for (const row of voices.records) {
  assert.notEqual(row.relationship_class, "GENERIC_THEMATIC_ANALOGY");
  assert(row.certified_identity_claim_ids.length);
  assert(row.relationship_bridge);
  assert(row.false_positive_analysis);
  assert(row.adjacent_identity_confusion_risk);
}

console.log(JSON.stringify({
  status: "PASS",
  rationale_source_records: rationales.records.length,
  rationale_runtime_records: rationaleCatalog.records.length,
  rationale_identity_coverage: 37,
  voice_source_records: voices.records.length,
  voice_runtime_records: voiceCatalog.records.length,
  voice_identity_coverage: 37,
  unresolved: 0,
}, null, 2));

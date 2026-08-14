import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const readJson = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), "utf8"));
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const [packet, rationales, rationaleCatalog, voices, voiceCatalog, printings] = await Promise.all([
  readJson("data/dossier/card-content-review-proposals.source.json"),
  readJson("data/dossier/card-rationale-relationships.source.json"),
  readJson("data/dossier/card-rationale-catalog.json"),
  readJson("data/dossier/card-voice-relationships.source.json"),
  readJson("data/dossier/card-voice-catalog.json"),
  readJson("data/dossier/card-voice-printings.source.json"),
]);

assert.equal(packet.proposals.filter((row) => row.disposition === "REVIEW_REQUIRED").length, 0);
assert.equal(packet.proposals.filter((row) => row.disposition === "EVIDENCE_NEEDED").length, 0);
assert.equal(new Set(packet.proposals.map((row) => row.proposal_id)).size, packet.proposals.length, "Packet 1 proposal IDs must remain unique across supersession rebuilds");
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_RATIONALE" && row.disposition === "APPROVED_PUBLIC").length, 26);
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE" && row.disposition === "APPROVED_PUBLIC").length, 37);
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE" && row.disposition === "REJECTED").length, 84);
assert.equal(new Set(rationales.records.filter((row) => row.review_status === "APPROVED_PUBLIC").map((row) => row.identity_key)).size, 37);
assert.equal(new Set(rationaleCatalog.records.map((row) => row.identity_key)).size, 37);
assert.equal(voices.records.length, 37);
assert.equal(voiceCatalog.records.length, 37);
assert.equal(new Set(voices.records.map((row) => row.identity_key)).size, 37);
assert.equal(printings.records.length, 37);
assert.equal(new Set(printings.records.map((row) => row.identity_key)).size, 37);
const printingByIdentity = new Map(printings.records.map((row) => [row.identity_key, row]));
for (const row of packet.proposals.filter((proposal) => proposal.proposal_type === "CARD_VOICE" && proposal.disposition === "APPROVED_PUBLIC")) {
  assert.equal(row.copy_sha256, digest(row.proposed_copy), `${row.identity_key} voice copy hash is stale`);
}
for (const row of [...packet.proposals.filter((record) => record.disposition === "APPROVED_PUBLIC"), ...rationales.records.filter((record) => record.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC"), ...voices.records]) {
  assert.equal(row.approval_basis, "EVIDENCE_VALIDATED_AUTOMATIC");
  assert.equal(row.validation?.passed, true);
  assert.equal(row.validation?.validator_version, "vm551-evidence-validator-v1");
  assert.equal(row.owner_decision ?? null, null);
}
for (const row of voices.records) {
  const printing = printingByIdentity.get(row.identity_key);
  assert.notEqual(row.relationship_class, "GENERIC_THEMATIC_ANALOGY");
  assert(row.certified_identity_claim_ids.length);
  assert(row.relationship_bridge);
  assert(row.false_positive_analysis);
  assert(row.adjacent_identity_confusion_risk);
  assert(printing, `missing printing authority: ${row.identity_key}`);
  assert.equal(row.canonical_card_name, printing.canonical_card_name);
  assert.equal(row.canonical_card_id, printing.oracle_id);
  assert.equal(row.scryfall_id, printing.scryfall_id);
  assert.equal(row.exact_excerpt, printing.exact_flavor_text);
  assert.equal(row.printing.set, printing.set);
  assert.equal(row.printing.collector_number, printing.collector_number);
  assert(!row.exact_excerpt.includes("..."), `${row.identity_key} retained a truncated flavor excerpt`);
  assert(!/[â€ï¿½\uFFFD]/.test(row.exact_excerpt), `${row.identity_key} retained mojibake`);
}

const wubrg = voices.records.find((row) => row.identity_key === "WUBRG");
assert.equal(wubrg.canonical_card_name, "Call the Spirit Dragons");
assert.equal(wubrg.canonical_card_id, "3ceb23f5-abb1-4569-a1e4-1eed9a9babcf");
assert.equal(wubrg.scryfall_id, "b1ad91db-5f16-4392-baf1-f8400ec11e0a");
assert.equal(wubrg.printing.set, "tdm");
assert.equal(wubrg.printing.collector_number, "174");
assert.equal(wubrg.exact_excerpt, "The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.");
assert(packet.proposals.some((row) => row.canonical_card_name === "Coalition Victory" && row.disposition === "REJECTED" && row.proposal_id.endsWith("_superseded")));

const witherbloom = voices.records.find((row) => row.identity_key === "WITHERBLOOM");
assert.equal(witherbloom.canonical_card_name, "Witherbloom Campus");
assert.equal(witherbloom.canonical_card_id, "6cd58a88-6434-4c55-bf93-a739b5ed9bc1");
assert.equal(witherbloom.scryfall_id, "e5af06c8-86ab-4731-aa4a-2eec2c664488");
assert.equal(witherbloom.relationship_class, "NATIVE_FIGURE_OR_LOCATION");
assert.equal(witherbloom.printing.set, "soc");
assert.equal(witherbloom.printing.collector_number, "423");
assert.equal(witherbloom.exact_excerpt, "Mage-students fascinated by the energies of life and death choose Witherbloom, the college of essence studies.");
assert(packet.proposals.some((row) => row.canonical_card_name === "Death Begets Life" && row.disposition === "REJECTED" && row.validation?.failures?.includes("SELF_DISQUALIFYING_RELATIONSHIP")));

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

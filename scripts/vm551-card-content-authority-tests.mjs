import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const readJson = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), "utf8"));
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const [packet, rationales, rationaleCatalog, voices, voiceCatalog, printings, flavorIndex, factions] = await Promise.all([
  readJson("data/dossier/card-content-review-proposals.source.json"),
  readJson("data/dossier/card-rationale-relationships.source.json"),
  readJson("data/dossier/card-rationale-catalog.json"),
  readJson("data/dossier/card-voice-relationships.source.json"),
  readJson("data/dossier/card-voice-catalog.json"),
  readJson("data/dossier/card-voice-printings.source.json"),
  readJson("data/scryfall/indexes/card-flavor-index.json"),
  readJson("data/factions.json"),
]);

assert.equal(packet.proposals.filter((row) => row.disposition === "REVIEW_REQUIRED").length, 0);
assert.equal(packet.proposals.filter((row) => row.disposition === "EVIDENCE_NEEDED").length, 0);
assert.equal(new Set(packet.proposals.map((row) => row.proposal_id)).size, packet.proposals.length, "Packet 1 proposal IDs must remain unique across supersession rebuilds");
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_RATIONALE" && row.disposition === "APPROVED_PUBLIC").length, 26);
assert.equal(packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE" && row.disposition === "APPROVED_PUBLIC").length, 37);
const rejectedVoiceProposalCount = packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE" && row.disposition === "REJECTED").length;
assert.equal(rejectedVoiceProposalCount, 85);
assert.equal(packet.voice_adjudication.rejected, rejectedVoiceProposalCount, "Packet 1 rejected-voice metadata must match the retained audit trail");
assert.equal(new Set(rationales.records.filter((row) => row.review_status === "APPROVED_PUBLIC").map((row) => row.identity_key)).size, 37);
assert.equal(new Set(rationaleCatalog.records.map((row) => row.identity_key)).size, 37);

const approvedVoices = voices.records.filter((row) => row.review_status === "APPROVED_PUBLIC");
const reviewRequiredVoices = voices.records.filter((row) => row.review_status === "REVIEW_REQUIRED");
const anchors = approvedVoices.filter((row) => row.slot === 1);
const complements = approvedVoices.filter((row) => row.slot === 2);
assert.equal(voices.records.length, 73);
assert.equal(approvedVoices.length, 73);
assert.equal(reviewRequiredVoices.length, 0);
assert.equal(anchors.length, 37);
assert.equal(complements.length, 36);
assert.equal(voiceCatalog.records.length, 73);
assert.equal(printings.records.length, 73);
assert.equal(new Set(approvedVoices.map((row) => row.identity_key)).size, 37);
assert.equal(new Set(complements.map((row) => row.identity_key)).size, 36);
assert.equal(complements.some((row) => row.identity_key === "COLORLESS"), false);

const printingByRelationship = new Map(printings.records.map((row) => [row.relationship_id, row]));
const voiceSourceByRelationship = new Map(voices.records.map((row) => [row.relationship_id, row]));
for (const row of packet.proposals.filter((proposal) => proposal.proposal_type === "CARD_VOICE" && proposal.disposition === "APPROVED_PUBLIC")) {
  assert.equal(row.copy_sha256, digest(row.proposed_copy), `${row.identity_key} voice copy hash is stale`);
}
for (const row of [...packet.proposals.filter((record) => record.disposition === "APPROVED_PUBLIC"), ...rationales.records.filter((record) => record.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC")]) {
  assert.equal(row.approval_basis, "EVIDENCE_VALIDATED_AUTOMATIC");
  assert.equal(row.validation?.passed, true);
  assert.equal(row.validation?.validator_version, "vm551-evidence-validator-v1");
  assert.equal(row.owner_decision ?? null, null);
}

for (const row of anchors) {
  assert.equal(row.pair_role, "ANCHOR");
  assert.equal(row.approval_basis, "EVIDENCE_VALIDATED_AUTOMATIC");
  assert.equal(row.validation?.validator_version, "vm551-evidence-validator-v1");
  assert.equal(row.owner_decision ?? null, null);
}
for (const row of complements) {
  assert.equal(row.pair_role, "COMPLEMENT");
  assert.equal(row.approval_basis, "OWNER_SEMANTIC_APPROVAL");
  assert.equal(row.owner_decision, "APPROVE");
  assert.equal(row.public_eligible, true);
  assert.equal(row.structural_validation?.passed, true);
  assert.equal(row.validation?.passed, true);
  assert.equal(row.validation?.validator_version, "vm558-owner-semantic-approval-v1");
  const anchor = voiceSourceByRelationship.get(row.complements_relationship_id);
  assert(anchor && anchor.identity_key === row.identity_key && anchor.slot === 1, `broken voice pair: ${row.relationship_id}`);
}

for (const [identityKey] of Object.entries(factions.factions)) {
  const identityRows = approvedVoices.filter((row) => row.identity_key === identityKey);
  assert.equal(identityRows.length, identityKey === "COLORLESS" ? 1 : 2, `unexpected public voice count: ${identityKey}`);
  assert.deepEqual(identityRows.map((row) => row.slot), identityKey === "COLORLESS" ? [1] : [1, 2], `unexpected public slot order: ${identityKey}`);
}

for (const row of approvedVoices) {
  const printing = printingByRelationship.get(row.relationship_id);
  assert.notEqual(row.relationship_class, "GENERIC_THEMATIC_ANALOGY");
  assert(row.certified_identity_claim_ids.length);
  assert(row.relationship_bridge);
  assert(row.false_positive_analysis);
  assert(row.adjacent_identity_confusion_risk);
  assert(printing, `missing printing authority: ${row.identity_key} / slot ${row.slot}`);
  assert.equal(row.canonical_card_name, printing.canonical_card_name);
  assert.equal(row.canonical_card_id, printing.oracle_id);
  assert.equal(row.scryfall_id, printing.scryfall_id);
  assert.equal(row.exact_excerpt, printing.exact_flavor_text);
  assert.equal(row.printing.set, printing.set);
  assert.equal(row.printing.collector_number, printing.collector_number);
  assert.equal(row.slot, printing.slot);
  assert(!row.exact_excerpt.includes("..."), `${row.identity_key} retained a truncated flavor excerpt`);
  assert(!/[Ã¢â‚¬Ã¯Â¿Â½\uFFFD]/.test(row.exact_excerpt), `${row.identity_key} retained mojibake`);
}

for (const row of voiceCatalog.records) {
  const sourceRecord = voiceSourceByRelationship.get(row.relationship_id);
  assert(sourceRecord, `voice runtime relationship must resolve: ${row.relationship_id}`);
  assert.ok(row.modal_explanation, `${row.identity_key} voice must have player-facing modal context`);
  assert.notEqual(row.modal_explanation, row.excerpt, `${row.identity_key} voice modal cannot merely repeat the flavor excerpt`);
  assert.doesNotMatch(row.modal_explanation, /\b(?:exact excerpt|bounded voice echo|approved relationship|provenance|claim[_ -]?id|source[_ -]?id|evidence status)\b/i, `${row.identity_key} voice modal leaks methodology`);
  assert.equal(row.slot, sourceRecord.slot);
  assert.equal(row.pair_role, sourceRecord.pair_role);
  assert.deepEqual(row.provenance?.claim_ids, sourceRecord.certified_identity_claim_ids);
  assert.equal(row.provenance?.validator_version, sourceRecord.validation?.validator_version);
  assert.equal(row.provenance?.approval_basis, sourceRecord.approval_basis);
}

const wubrgAnchor = anchors.find((row) => row.identity_key === "WUBRG");
assert.equal(wubrgAnchor.canonical_card_name, "Call the Spirit Dragons");
assert.equal(wubrgAnchor.canonical_card_id, "3ceb23f5-abb1-4569-a1e4-1eed9a9babcf");
assert.equal(wubrgAnchor.scryfall_id, "b1ad91db-5f16-4392-baf1-f8400ec11e0a");
assert.equal(wubrgAnchor.printing.set, "tdm");
assert.equal(wubrgAnchor.printing.collector_number, "174");
assert.equal(wubrgAnchor.exact_excerpt, "The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.");
const wubrgComplement = complements.find((row) => row.identity_key === "WUBRG");
assert.equal(wubrgComplement.canonical_card_name, "Child of Alara");
assert.equal(voiceCatalog.records.find((row) => row.relationship_id === wubrgComplement.relationship_id)?.modal_explanation, wubrgComplement.proposed_modal_explanation);
assert(packet.proposals.some((row) => row.canonical_card_name === "Coalition Victory" && row.disposition === "REJECTED" && row.proposal_id.endsWith("_superseded")));

const witherbloom = anchors.find((row) => row.identity_key === "WITHERBLOOM");
assert.equal(witherbloom.canonical_card_name, "Blossoming Bogbeast");
assert.equal(witherbloom.canonical_card_id, "30f3c3be-0fe9-463d-a245-e44701aec7f2");
assert.equal(witherbloom.scryfall_id, "764054f1-e848-4cee-b623-4861ce15c370");
assert.equal(witherbloom.relationship_class, "EXPLICIT_IDENTITY_REFERENCE");
assert.equal(witherbloom.printing.set, "soc");
assert.equal(witherbloom.printing.collector_number, "264");
assert.equal(witherbloom.exact_excerpt, "As subtle as a bogbeast\n—Witherbloom expression meaning \"crude and clumsy\"");
assert.match(flavorIndex.cards.find((row) => row.oracle_id === witherbloom.canonical_card_id)?.type_line || "", /^Creature\b/);
assert(packet.proposals.some((row) => row.canonical_card_name === "Witherbloom Campus" && row.disposition === "REJECTED" && row.proposal_id.endsWith("_superseded")));
assert(packet.proposals.some((row) => row.canonical_card_name === "Death Begets Life" && row.disposition === "REJECTED" && row.validation?.failures?.includes("SELF_DISQUALIFYING_RELATIONSHIP")));
assert.equal(
  voiceCatalog.records.find((row) => row.relationship_id === witherbloom.relationship_id)?.modal_explanation,
  "This earthy proverb turns a bog creature into everyday Witherbloom shorthand for clumsiness. It reflects a culture whose language is rooted in bodies, living essence, and natural components."
);

console.log(JSON.stringify({
  status: "PASS",
  rationale_source_records: rationales.records.length,
  rationale_runtime_records: rationaleCatalog.records.length,
  rationale_identity_coverage: 37,
  voice_source_records: voices.records.length,
  voice_approved_slot_1_records: anchors.length,
  voice_owner_approved_slot_2_records: complements.length,
  voice_review_required_records: reviewRequiredVoices.length,
  voice_printing_records: printings.records.length,
  voice_runtime_records: voiceCatalog.records.length,
  voice_identity_coverage: 37,
  unresolved: 0,
}, null, 2));

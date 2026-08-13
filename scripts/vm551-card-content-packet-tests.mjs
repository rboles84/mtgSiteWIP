import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const [packet, adjudication, catalog, relationships, snippets, commanderIndex, flavorIndex, factions] = await Promise.all([
  readJson("data/dossier/card-content-review-proposals.source.json"),
  readJson("data/dossier/card-rationale-candidate-adjudication.source.json"),
  readJson("data/dossier/card-rationale-catalog.json"),
  readJson("data/dossier/card-rationale-relationships.source.json"),
  readJson("data/archscry-flavor-snippets.json"),
  readJson("data/scryfall/indexes/commander-index.json"),
  readJson("data/scryfall/indexes/card-flavor-index.json"),
  readJson("data/factions.json"),
]);
const ownerView = await readFile(path.join(root, "docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-owner-review.md"), "utf8");

assert.equal(packet.schema_version, "vm551-card-content-approval-packet-v1");
assert.equal(packet.status, "AUTOMATIC_ADJUDICATION_COMPLETE");
assert.equal(adjudication.schema_version, "vm551-card-rationale-candidate-adjudication-v1");
assert.equal(adjudication.records.length, 125);
assert.equal(adjudication.records.filter((row) => /EVIDENCE_NEEDED|REVIEW_REQUIRED/.test(row.final_research_disposition)).length, 0);
assert.equal(adjudication.records.filter((row) => row.final_research_disposition === "APPROVED_PUBLIC").length, 26);
assert.equal(adjudication.records.filter((row) => row.final_research_disposition === "REJECTED").length, 99);

const identities = Object.keys(factions.factions).sort();
assert.equal(identities.length, 37);
const ids = packet.proposals.map((row) => row.proposal_id);
assert.equal(new Set(ids).size, ids.length);
assert.ok(packet.proposals.every((row) => ["APPROVED_PUBLIC", "REJECTED"].includes(row.disposition) && row.owner_decision === null));

const rationales = packet.proposals.filter((row) => row.proposal_type === "CARD_RATIONALE");
const voices = packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE");
const reviewVoices = voices.filter((row) => row.disposition === "APPROVED_PUBLIC");
const rejectedVoices = voices.filter((row) => row.disposition === "REJECTED");
assert.equal(rationales.length, 25);
assert.equal(createHash("sha256").update(JSON.stringify(rationales.map((row) => ({ id: row.proposal_id, copy: row.proposed_copy, hash: row.copy_sha256 })))).digest("hex"), "110a9448ebb9b157f262c588c3cf8b01a501fa334215d9764745ef7dc4793766", "the 25 rationale proposal copy changed");
assert.equal(packet.voice_adjudication.original_candidates, 111);
assert.equal(packet.voice_adjudication.replacement_candidates, 7);
assert.equal(voices.length, 118);
assert.equal(reviewVoices.length, 37);
assert.equal(rejectedVoices.length, 81);
assert.equal(new Set(reviewVoices.map((row) => row.identity_key)).size, 37);
for (const identity of identities) {
  assert.equal(reviewVoices.filter((row) => row.identity_key === identity).length, 1, `${identity} must have exactly one source-complete owner-review voice`);
  assert(ownerView.includes(`(\`${identity}\`)`), `${identity} owner section is missing`);
}

for (const expected of [
  "Automatically approved rationale proposals: **25**",
  "Previously approved rationale relationships retained: **26**",
  "Approved rationale identity coverage: **37/37**",
  "Automatically approved voice relationships: **37**",
  "Approved voice identity coverage: **37/37**",
  "Rejected voice candidates retained in audit trail: **81**",
  "Owner exceptions: **0**",
]) assert(ownerView.includes(expected), `owner summary is missing: ${expected}`);

assert.equal((ownerView.match(/^### Source-complete voice proposal\(s\)$/gm) || []).length, 37);
assert.equal((ownerView.match(/^### Automatic disposition$/gm) || []).length, 37);
assert.equal((ownerView.match(/owner exception: none\./g) || []).length, 37);
assert.equal((ownerView.match(/^### Existing approved rationale\(s\)$/gm) || []).length, 37);
assert.equal((ownerView.match(/^### Other candidates considered and terminal disposition$/gm) || []).length, 37);

const canonicalCards = new Map([
  ...(flavorIndex.cards || []),
  ...(commanderIndex.commanders || []),
].map((card) => [card.oracle_id, card]));
for (const row of rationales) {
  assert.ok(row.proposed_copy.trim().length >= 40, `${row.proposal_id} copy is too thin`);
  assert.ok(row.verified_card_observation?.trim(), `${row.proposal_id} lacks verified card observation`);
  assert.ok(row.provenance.certified_identity_claims?.length, `${row.proposal_id} lacks certified claims`);
  assert.equal(row.provenance.evidence_roles.identity_ownership, "certified_identity_claims");
  assert.equal(row.provenance.evidence_roles.card_behavior, "canonical_card_data");
  assert.ok(canonicalCards.has(row.canonical_card_id), `${row.proposal_id} card does not resolve`);
  assert.ok(!/operator texture|support row|official decklist identifies|exact color|color match/i.test(row.proposed_copy), `${row.proposal_id} leaks source methodology or color-as-proof phrasing`);
}

for (const row of voices) {
  const sourceEntries = snippets.snippets[row.identity_key] || [];
  const isOriginal = sourceEntries.some((entry) => entry.card_name === row.canonical_card_name && entry.flavor_excerpt === row.proposed_copy);
  const isReplacement = row.proposal_id.endsWith("_replacement") && canonicalCards.get(row.canonical_card_id)?.flavor_excerpt === row.proposed_copy;
  assert.ok(isOriginal || isReplacement, `${row.proposal_id} is not exact committed voice text`);
  assert.ok(canonicalCards.has(row.canonical_card_id), `${row.proposal_id} card does not resolve`);
  assert.ok(["EXPLICIT_IDENTITY_REFERENCE", "NATIVE_FIGURE_OR_LOCATION", "CERTIFIED_SEMANTIC_ECHO", "GENERIC_THEMATIC_ANALOGY"].includes(row.relationship_class));
  assert.equal(row.agent_recommendation, row.disposition);
  assert.ok(row.why_voice_belongs.trim() && row.relationship_bridge.trim() && row.false_positive_analysis.trim() && row.adjacent_identity_confusion_risk.trim());
}
for (const row of reviewVoices) {
  assert.notEqual(row.relationship_class, "GENERIC_THEMATIC_ANALOGY", `${row.proposal_id} generic analogy reached owner review`);
  assert.ok(row.certified_identity_claim_ids.length >= 1, `${row.proposal_id} lacks authorizing claim IDs`);
  assert.deepEqual(row.certified_identity_claim_ids, row.certified_identity_claims.map((claim) => claim.claim_id));
  assert.ok(row.certified_identity_claims.every((claim) => claim.statement?.trim()), `${row.proposal_id} has an unresolved certified statement`);
}
for (const row of rejectedVoices) {
  assert.equal(row.relationship_class, "GENERIC_THEMATIC_ANALOGY");
  assert.deepEqual(row.certified_identity_claim_ids, []);
  assert.deepEqual(row.certified_identity_claims, []);
}

const approvedPairs = new Set(relationships.records
  .filter((row) => row.review_status === "APPROVED_PUBLIC")
  .map((row) => `${row.identity_key}|${row.canonical_card_id}`));
assert.equal(approvedPairs.size, 51);
assert.equal(catalog.records.length, 49);
assert.ok(catalog.records.every((row) => approvedPairs.has(`${row.identity_key}|${row.card.oracle_id}`)));
for (const row of rationales) {
  assert.ok(catalog.records.some((record) =>
    record.identity_key === row.identity_key &&
    record.card.oracle_id === row.canonical_card_id
  ) || catalog.records.filter((record) => record.identity_key === row.identity_key).length === 3, `${row.proposal_id} was neither published nor excluded by the three-card display maximum`);
  assert.equal(row.approval_basis, "EVIDENCE_VALIDATED_AUTOMATIC");
  assert.equal(row.validation?.validator_version, "vm551-evidence-validator-v1");
  assert.equal(row.validation?.passed, true);
}

console.log(JSON.stringify({
  status: "PASS",
  identities: identities.length,
  historical_candidates: adjudication.records.length,
  historical_unresolved: 0,
  rationale_automatic_rows: rationales.length,
  original_voice_candidates: 111,
  replacement_voice_candidates: 7,
  voice_automatic_rows: reviewVoices.length,
  voice_rejected_rows: rejectedVoices.length,
  runtime_approved_rows: catalog.records.length,
  unresolved_rows: 0,
  owner_view_identity_sections: 37,
  owner_view_automatic_dispositions: 37,
}, null, 2));

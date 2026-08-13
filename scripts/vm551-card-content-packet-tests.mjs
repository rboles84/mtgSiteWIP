import assert from "node:assert/strict";
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

assert.equal(packet.schema_version, "vm551-card-content-approval-packet-v1");
assert.equal(packet.status, "OWNER_REVIEW_REQUIRED");
assert.equal(adjudication.schema_version, "vm551-card-rationale-candidate-adjudication-v1");
assert.equal(adjudication.records.length, 125);
assert.equal(adjudication.records.filter((row) => /EVIDENCE_NEEDED|REVIEW_REQUIRED/.test(row.final_research_disposition)).length, 0);
assert.equal(adjudication.records.filter((row) => row.final_research_disposition === "APPROVED_PUBLIC").length, 26);
assert.equal(adjudication.records.filter((row) => row.final_research_disposition === "REJECTED").length, 99);

const identities = Object.keys(factions.factions).sort();
assert.equal(identities.length, 37);
const ids = packet.proposals.map((row) => row.proposal_id);
assert.equal(new Set(ids).size, ids.length);
assert.ok(packet.proposals.every((row) => row.disposition === "REVIEW_REQUIRED" && row.owner_decision === null));

const rationales = packet.proposals.filter((row) => row.proposal_type === "CARD_RATIONALE");
const voices = packet.proposals.filter((row) => row.proposal_type === "CARD_VOICE");
assert.equal(rationales.length, 25);
assert.equal(voices.length, 111);
assert.equal(new Set(voices.map((row) => row.identity_key)).size, 37);
for (const identity of identities) {
  assert.equal(voices.filter((row) => row.identity_key === identity).length, 3, `${identity} must have exactly three voice review candidates`);
}

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
  assert.ok(sourceEntries.some((entry) =>
    entry.card_name === row.canonical_card_name &&
    entry.flavor_excerpt === row.proposed_copy
  ), `${row.proposal_id} is not an exact committed voice excerpt`);
  assert.ok(canonicalCards.has(row.canonical_card_id), `${row.proposal_id} card does not resolve`);
}

const approvedPairs = new Set(relationships.records
  .filter((row) => row.review_status === "APPROVED_PUBLIC")
  .map((row) => `${row.identity_key}|${row.canonical_card_id}`));
assert.equal(approvedPairs.size, 26);
assert.equal(catalog.records.length, 24);
assert.ok(catalog.records.every((row) => approvedPairs.has(`${row.identity_key}|${row.card.oracle_id}`)));
for (const row of rationales) {
  assert.ok(!catalog.records.some((record) =>
    record.identity_key === row.identity_key &&
    record.card.oracle_id === row.canonical_card_id
  ), `${row.proposal_id} entered runtime before owner approval`);
}

console.log(JSON.stringify({
  status: "PASS",
  identities: identities.length,
  historical_candidates: adjudication.records.length,
  historical_unresolved: 0,
  rationale_review_rows: rationales.length,
  voice_review_rows: voices.length,
  runtime_approved_rows: catalog.records.length,
  review_rows_in_runtime: 0,
}, null, 2));

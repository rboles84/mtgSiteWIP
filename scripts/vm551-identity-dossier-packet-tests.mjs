import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FACTION_PRESENTATION } from "../assets/js/archscry-presentation.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const [packet, adjudication, factions, identityCatalog, comparisonCatalog] = await Promise.all([
  readJson("data/dossier/identity-dossier-review-proposals.source.json"),
  readJson("data/dossier/identity-dossier-automatic-adjudication.source.json"),
  readJson("data/factions.json"),
  readJson("data/dossier/identity-dossier-content.catalog.json"),
  readJson("data/dossier/public-comparisons.catalog.json"),
]);

assert.equal(packet.schema_version, "vm551-identity-dossier-approval-packet-v1");
assert.equal(packet.status, "AUTOMATIC_VALIDATION_INPUT");
assert.equal(adjudication.status, "AUTOMATIC_ADJUDICATION_COMPLETE");
assert.equal(packet.identity_records.length, 37);
assert.equal(packet.comparison_records.length, 123);

const knownIdentities = new Set(Object.keys(factions.factions));
assert.equal(knownIdentities.size, 37);
const allRecords = [...packet.identity_records, ...packet.comparison_records];
assert.equal(new Set(allRecords.map((row) => row.record_id)).size, allRecords.length);
assert.ok(allRecords.every((row) => row.disposition === "PENDING_AUTOMATIC_VALIDATION" && row.owner_decision === null));
assert.ok([...adjudication.identity_records, ...adjudication.comparison_records].every((row) => row.disposition === "APPROVED_PUBLIC" && row.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC" && row.validation?.passed === true && row.owner_decision === null));
assert.equal(identityCatalog.records.length, 37);
assert.equal(comparisonCatalog.records.length, 123);

for (const row of packet.identity_records) {
  assert.ok(knownIdentities.has(row.identity_key));
  assert.deepEqual(Object.keys(row.proposed_public_copy.test_the_fit).sort(), [
    "certified_boundary_self_check", "positive_self_check", "tension_failure_mode",
  ]);
  assert.deepEqual(Object.keys(row.proposed_public_copy.how_this_plays).sort(), [
    "emotional_pressure", "how_opponents_read_it", "lore_role",
    "mechanical_expression", "role", "table_experience",
  ]);
  assert.ok(row.proposed_public_copy.what_to_look_for.length >= 3);
  assert.ok(row.proposed_public_copy.what_to_look_for.length <= 4);
  assert.ok(row.provenance.certified_claims.length > 0);
  assert.ok(row.provenance.certified_claims.every((claim) => claim.claim_id && claim.statement));
  for (const copy of [
    ...Object.values(row.proposed_public_copy.test_the_fit),
    ...Object.values(row.proposed_public_copy.how_this_plays),
    ...row.proposed_public_copy.what_to_look_for.flatMap((entry) => [entry.title, entry.copy]),
  ]) assert.ok(String(copy).trim(), `${row.identity_key} contains empty public copy`);
}

const pairKeys = new Set();
for (const row of packet.comparison_records) {
  assert.ok(knownIdentities.has(row.identity_a));
  assert.ok(knownIdentities.has(row.identity_b));
  assert.notEqual(row.identity_a, row.identity_b);
  assert.equal(row.pair_key, `${row.identity_a}::${row.identity_b}`);
  assert.ok(!pairKeys.has(row.pair_key));
  pairKeys.add(row.pair_key);
  assert.ok(row.proposed_public_copy.a_to_b.includes(factions.factions[row.identity_a].name));
  assert.ok(row.proposed_public_copy.a_to_b.includes(factions.factions[row.identity_b].name));
  assert.ok(row.proposed_public_copy.b_to_a.includes(factions.factions[row.identity_a].name));
  assert.ok(row.proposed_public_copy.b_to_a.includes(factions.factions[row.identity_b].name));
  assert.ok(row.provenance.instrument_boundary.observable_behavioral_distinction);
  assert.ok(row.provenance.certified_claims_a.length && row.provenance.certified_claims_b.length);
}

const runtimeMissingPresentation = [...knownIdentities].filter((key) => !FACTION_PRESENTATION[key]).sort();
assert.deepEqual(runtimeMissingPresentation, ["B", "G", "R", "U"]);
for (const key of runtimeMissingPresentation) {
  const proposal = packet.identity_records.find((row) => row.identity_key === key);
  assert.ok(proposal);
  assert.notEqual(proposal.proposed_public_copy.how_this_plays.role, "The pilot");
}

console.log(JSON.stringify({
  status: "PASS",
  identities: packet.identity_records.length,
  test_the_fit_roles: 111,
  how_this_plays_fields: 222,
  what_to_look_for_items: packet.identity_records.reduce((sum, row) => sum + row.proposed_public_copy.what_to_look_for.length, 0),
  comparison_pairs: pairKeys.size,
  known_runtime_generic_mono_fallbacks: runtimeMissingPresentation,
  packet_replacements_for_generic_mono_fallbacks: 4,
  approved_identity_rows_in_runtime: identityCatalog.records.length,
  approved_comparison_rows_in_runtime: comparisonCatalog.records.length,
  owner_exceptions: 0,
}, null, 2));

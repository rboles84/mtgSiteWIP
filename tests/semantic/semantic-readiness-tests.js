import assert from "node:assert/strict";
import { buildProvenanceManifest, collectClaimReferenceSites, contentHash, pointerGet, validateSemanticPacket } from "../../scripts/lib/semantic-readiness-lib.mjs";
import { renderLedgerMarkdown, updateLedgerComputed } from "../../scripts/audit/audit-semantic-readiness.mjs";
import { validateFixture, validateIdentityFixtures } from "../../scripts/validate/validate-semantic-readiness.mjs";

const invalidErrors = await validateFixture("invalid-discovery-chain.json");
assert.ok(invalidErrors.some((error) => error.includes("no substantive claim")), "discovery-only support must fail semantic readiness");

const validErrors = await validateFixture("valid-substantive-chain.json");
assert.deepEqual(validErrors, [], "bounded substantive evidence must pass semantic readiness");

assert.notEqual(contentHash({ value: "before" }), contentHash({ value: "after" }), "content changes must invalidate provenance hashes");
assert.equal(pointerGet({ a: [{ b: "ok" }] }, "/a/0/b"), "ok", "JSON Pointer resolution must be stable");

const defaultSemanticSite = collectClaimReferenceSites({ field: { claim_ids: ["claim"] } }, "fixture.json")[0];
assert.equal(defaultSemanticSite.evidence_use, undefined, "implicit semantic evidence must not churn generated provenance");
const explicitDiscoverySite = collectClaimReferenceSites({ field: { claim_ids: ["claim"], evidence_use: "discovery_metadata" } }, "fixture.json")[0];
assert.equal(explicitDiscoverySite.evidence_use, "discovery_metadata", "explicit non-semantic evidence use must survive provenance collection");

const supportBypassErrors = validateSemanticPacket({
  key: "BYPASS",
  rawId: "bypass",
  claimsFile: { claims: [{ claim_id: "support", semantic_role: "support_record", source_ids: ["source"] }] },
  sourcesFile: { sources: [{ source_id: "source" }] },
  profile: { core_identity: { summary: "Authoritative identity meaning", claim_ids: ["support"], evidence_use: "auxiliary_support" } },
  placement: {},
  provenance: null,
});
assert.ok(supportBypassErrors.some((error) => error.includes("not allowed at this canonical field")), "authoritative identity fields cannot relabel support evidence as auxiliary");

const invalidLocationErrors = validateSemanticPacket({
  key: "LOCATION",
  rawId: "location",
  claimsFile: { claims: [{
    claim_id: "claim",
    semantic_role: "substantive_claim",
    source_ids: ["source"],
    evidence_locations: [{ source_id: "missing", locator_type: "section", locator: "A", bounded_paraphrase: "Bounded.", evidence_scope: "identity-wide", interpretation_level: "direct-fact" }],
  }] },
  sourcesFile: { sources: [{ source_id: "source" }] },
  profile: {},
  placement: {},
  provenance: null,
});
assert.ok(invalidLocationErrors.some((error) => error.includes("exactly match claim source_ids")), "locator sources must equal the declared claim source chain");
assert.ok(invalidLocationErrors.some((error) => error.includes("missing source missing")), "locator source IDs must resolve in the source inventory");

const ledger = {
  current_contract_version: "v0",
  program: { active_identity: null, next_identity: "X", wip_limit: 1 },
  identities: [{
    identity: { key: "X", name: "Example", card: "VM-X", cohort: "fixture" },
    computed: {},
    workflow: { status: "active", current_gate: "audit", blocked_reason: "preserve me" },
    semantic_review: { required_neighbors: ["Y"], residual_findings: ["preserve"] },
    certification: { reviewer: "Robert", review_cycles: 2 },
  }],
};
const inventory = [{
  identity_key: "X", structural_fingerprint: ["low-volume-pattern"], semantic_role_counts: { substantive_claim: 0, discovery_record: 1, support_record: 0, unclassified: 0 },
  source_count: 1, source_role_counts: { "discovery-only": 1 }, claim_bearing_source_count: 0, claim_bearing_source_rate: 0,
  reference_site_count: 1, missing_references: [], potential_role_invalid_support_links: [], raw_question_count: 0,
  unique_question_claim_ids: [], neighbor_references: [], recruiter_context_size: 0, creation_commit: null, readiness_mentions: [],
  provisional_coverage_risk_indicators: ["low-record-volume"], provisional_neighbor_risk_indicators: ["no-explicit-neighbor-reference"], template_cohort_pattern: false,
}];
const updated = updateLedgerComputed(ledger, inventory, "2026-07-11T00:00:00.000Z");
assert.deepEqual(updated.identities[0].workflow, ledger.identities[0].workflow, "computed updates must preserve workflow fields");
assert.deepEqual(updated.identities[0].semantic_review, ledger.identities[0].semantic_review, "computed updates must preserve semantic-review fields");
assert.deepEqual(updated.identities[0].certification, ledger.identities[0].certification, "computed updates must preserve certification fields");
assert.match(renderLedgerMarkdown(updated), /low-volume-pattern/);

const stableRerun = updateLedgerComputed(updated, inventory, "2026-07-12T00:00:00.000Z");
assert.deepEqual(stableRerun, updated, "unchanged ledger regeneration must preserve computed values and timestamps exactly");
const cohortChanged = updateLedgerComputed(updated, [{ ...inventory[0], template_cohort_pattern: true, structural_fingerprint: ["template-cohort-pattern"] }], "2026-07-12T00:00:00.000Z");
assert.match(cohortChanged.identities[0].computed.template_cohort_change_explanation, /false -> true/, "template-cohort changes require a durable explanation");

const provenance = buildProvenanceManifest({
  rawRecords: {
    fixture: {
      claims: { claims: [{ claim_id: "claim", source_ids: ["source"] }] },
      profile: { field: { claim_ids: ["claim"] } },
      placement: {},
    },
  },
  rawToKey: { fixture: "FIXTURE" },
  ledger: { current_contract_version: "v1.1", identities: [] },
});
assert.ok(provenance.entries[0].generated_consumers.includes("data/factions.json#/factions/FIXTURE"), "public faction output must be present in generated provenance consumers");

const nativeIdProvenance = buildProvenanceManifest({
  rawRecords: {
    fixture: {
      claims: { claims: [{ claim_id: "claim", source_ids: ["source"] }] },
      profile: { key_figures: [{ character_id: "char_fixture", claim_ids: ["claim"] }] },
      placement: {},
    },
  },
  rawToKey: { fixture: "FIXTURE" },
  ledger: { current_contract_version: "v1.1", identities: [] },
});
assert.equal(nativeIdProvenance.entries[0].canonical_id, "char_fixture", "existing native IDs must be retained in provenance");

const chainClaim = {
  claim_id: "fixture_chain_claim",
  semantic_role: "substantive_claim",
  source_ids: ["fixture_chain_source"],
};
const chainFixture = (fixture_id, fixture_type, extra = {}) => ({
  fixture_id,
  fixture_type,
  scenario: "A bounded semantic scenario.",
  intended_interpretation: "Only the declared evidence chain is asserted.",
  evidence_claim_ids: ["fixture_chain_claim"],
  evidence_source_ids: ["fixture_chain_source"],
  ...extra,
});
const fixtureDocument = {
  identity_key: "FIXTURE_CHAIN",
  runtime_assertions: false,
  fixtures: [
    chainFixture("core", "core_inclusion"),
    chainFixture("pressure", "mature_or_pressure_behavior"),
    chainFixture("neighbor", "required_neighbor_exclusion", { neighbor: "NEIGHBOR" }),
    chainFixture("ambiguous", "nearest_collision_ambiguity", { neighbor: "NEIGHBOR" }),
    chainFixture("provenance", "provenance", { scenario: undefined, canonical_file: "fixture.json", canonical_pointer: "/field" }),
  ],
};
const chainProvenance = {
  entries: [{
    identity_key: "FIXTURE_CHAIN",
    canonical_file: "fixture.json",
    canonical_pointer: "/field",
    evidence_claim_ids: ["fixture_chain_claim"],
    evidence_source_ids: ["fixture_chain_source"],
  }],
};
const chainErrors = await validateIdentityFixtures({
  key: "FIXTURE_CHAIN",
  rawId: "fixture_chain",
  claimsFile: { claims: [chainClaim] },
  provenance: chainProvenance,
  ledgerRow: { semantic_review: { required_neighbors: ["NEIGHBOR"] } },
  fixtureDocument,
});
assert.deepEqual(chainErrors, [], "complete declared fixture evidence chains must pass");
const incompleteFixtureDocument = structuredClone(fixtureDocument);
incompleteFixtureDocument.fixtures[0].evidence_source_ids = ["wrong_source"];
const incompleteErrors = await validateIdentityFixtures({
  key: "FIXTURE_CHAIN",
  rawId: "fixture_chain",
  claimsFile: { claims: [chainClaim] },
  provenance: chainProvenance,
  ledgerRow: { semantic_review: { required_neighbors: ["NEIGHBOR"] } },
  fixtureDocument: incompleteFixtureDocument,
});
assert.ok(incompleteErrors.some((error) => error.includes("complete claim source chain")), "incomplete fixture evidence chains must fail");

console.log("Semantic readiness contract tests passed.");

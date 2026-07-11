import assert from "node:assert/strict";
import { contentHash, pointerGet } from "./semantic-readiness-lib.mjs";
import { renderLedgerMarkdown, updateLedgerComputed } from "./audit-semantic-readiness.mjs";
import { validateFixture } from "./validate-semantic-readiness.mjs";

const invalidErrors = await validateFixture("invalid-discovery-chain.json");
assert.ok(invalidErrors.some((error) => error.includes("no substantive claim")), "discovery-only support must fail semantic readiness");

const validErrors = await validateFixture("valid-substantive-chain.json");
assert.deepEqual(validErrors, [], "bounded substantive evidence must pass semantic readiness");

assert.notEqual(contentHash({ value: "before" }), contentHash({ value: "after" }), "content changes must invalidate provenance hashes");
assert.equal(pointerGet({ a: [{ b: "ok" }] }, "/a/0/b"), "ok", "JSON Pointer resolution must be stable");

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

console.log("Semantic readiness contract tests passed.");

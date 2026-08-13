import assert from "node:assert/strict";
import {
  VM551_AUTOMATIC_APPROVAL_BASIS,
  VM551_EVIDENCE_VALIDATOR_VERSION,
  validateAutomaticApproval,
} from "../research/vm551-evidence-approval.mjs";

const valid = {
  identity_claim_ids: ["example_claim_001"],
  identity_source_locators: ["data/raw-factions/example/example.claims.json#example_claim_001"],
  fact_source_locators: ["data/scryfall/indexes/commander-index.json#oracle_id=example"],
  relationship_bridge: "The verified card action directly instantiates the behavior named by the certified claim.",
  public_copy: "This card turns the certified behavior into a visible game action.",
  false_positive_analysis: "Color, tag, and product membership are not used as proof.",
  neighbor_analysis: "The named behavior is specific; adjacent identities center a different method.",
  source_conflict: false,
  generated_fallback: false,
  creates_new_identity_meaning: false,
  genuinely_interpretive: false,
  changes_placement_semantics: false,
  unresolved_material_interpretations: 0,
};

const pass = validateAutomaticApproval(valid);
assert.equal(pass.passed, true);
assert.equal(pass.approval_basis, VM551_AUTOMATIC_APPROVAL_BASIS);
assert.equal(pass.validator_version, VM551_EVIDENCE_VALIDATOR_VERSION);

const certifiedRestatement = validateAutomaticApproval({
  ...valid,
  content_class: "CERTIFIED_IDENTITY_RESTATEMENT",
  fact_source_locators: [],
  relationship_bridge: "The public wording is a bounded restatement of the cited certified identity claims and adds no external fact.",
});
assert.equal(certifiedRestatement.passed, true);
assert.equal(validateAutomaticApproval({ ...valid, fact_source_locators: [] }).passed, false);

for (const [field, value, failure] of [
  ["identity_claim_ids", [], "NO_CERTIFIED_IDENTITY_CLAIMS"],
  ["identity_source_locators", ["https://example.com/wiki"], "INVALID_IDENTITY_AUTHORITY"],
  ["fact_source_locators", ["https://example.com/wiki"], "INVALID_FACT_AUTHORITY"],
  ["relationship_bridge", "It feels like the identity.", "MISSING_OR_VAGUE_RELATIONSHIP_BRIDGE"],
  ["false_positive_analysis", "", "MISSING_FALSE_POSITIVE_ANALYSIS"],
  ["neighbor_analysis", "", "MISSING_NEIGHBOR_ANALYSIS"],
  ["source_conflict", true, "UNRESOLVED_SOURCE_CONFLICT"],
  ["generated_fallback", true, "GENERATED_FALLBACK"],
  ["creates_new_identity_meaning", true, "NEW_IDENTITY_MEANING"],
  ["genuinely_interpretive", true, "INTERPRETIVE_RELATIONSHIP"],
  ["changes_placement_semantics", true, "PLACEMENT_SEMANTICS_CHANGE"],
  ["unresolved_material_interpretations", 2, "MULTIPLE_MATERIAL_INTERPRETATIONS"],
]) {
  const result = validateAutomaticApproval({ ...valid, [field]: value });
  assert.equal(result.passed, false, `${field} should fail`);
  assert(result.failures.includes(failure), `${field} should report ${failure}`);
}

console.log(JSON.stringify({ status: "PASS", validator_version: VM551_EVIDENCE_VALIDATOR_VERSION, negative_cases: 12 }, null, 2));

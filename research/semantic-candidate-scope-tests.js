import assert from "node:assert/strict";
import {
  findForbiddenFieldChanges,
  findMissingNativeIds,
  findMissingProvenanceNativeIds,
  isFrozenSharedPath,
  validateGeneratedConsumerCoverage,
} from "./validate-semantic-candidate-scope.mjs";

assert.equal(isFrozenSharedPath("docs/reference/semantic-readiness-contract.md"), true, "contract is frozen for identity candidates");
assert.equal(isFrozenSharedPath("research/semantic-readiness-lib.mjs"), true, "shared validator library is frozen for identity candidates");
assert.equal(isFrozenSharedPath("package.json"), true, "identity candidates cannot change shared test wiring");
assert.equal(isFrozenSharedPath("research/fixtures/semantic-readiness/prismari.semantic-fixtures.json"), false, "identity fixture remains identity-scoped");

assert.deepEqual(
  findForbiddenFieldChanges({ collision: { lateral_inhibition: false } }, { collision: { lateral_inhibition: true } }),
  ["/collision/lateral_inhibition"],
  "lateral inhibition changes must be rejected"
);

assert.deepEqual(
  findMissingProvenanceNativeIds({
    documents: { key_figures: [{ character_id: "char_brodd_scaldbreath", claim_ids: ["claim"] }] },
    provenance: { entries: [{ identity_key: "PRISMARI", canonical_id: null }] },
    identityKey: "PRISMARI",
  }),
  ["char_brodd_scaldbreath"],
  "native IDs on evidence-bearing objects must survive into provenance"
);
assert.deepEqual(
  findForbiddenFieldChanges({ summary: "before" }, { summary: "after" }),
  [],
  "identity semantic prose is not a prohibited runtime field"
);

assert.deepEqual(
  findMissingNativeIds({ character: { character_id: "char_brodd_scaldbreath" } }, { character: { name: "Brodd" } }),
  ["character_id:char_brodd_scaldbreath"],
  "removing an existing native canonical ID must fail"
);

const provenance = {
  entries: [{
    identity_key: "PRISMARI",
    generated_consumers: ["data/placement-model.json#/factions/PRISMARI"],
  }],
};
assert.deepEqual(
  validateGeneratedConsumerCoverage({
    identityKey: "PRISMARI",
    changedConsumers: ["data/factions.json#/factions/PRISMARI", "data/placement-model.json#/factions/PRISMARI"],
    provenance,
  }),
  ["missing generated provenance consumer data/factions.json#/factions/PRISMARI"],
  "every changed generated semantic consumer must be declared"
);

console.log("Semantic candidate scope tests passed.");

import assert from "node:assert/strict";
import {
  findForbiddenFieldChanges,
  findForbiddenPlacementBehaviorChanges,
  findMissingNativeIds,
  findMissingProvenanceNativeIds,
  isAllowedIdentityCandidatePath,
  isFrozenSharedPath,
  validateGeneratedConsumerCoverage,
  validateUnrelatedGeneratedIsolation,
} from "./validate-semantic-candidate-scope.mjs";
import { buildLateralInhibitionTargets } from "./build-faction-artifacts.mjs";

assert.equal(isFrozenSharedPath("docs/reference/semantic-readiness-contract.md"), true, "contract is frozen for identity candidates");
assert.equal(isFrozenSharedPath("research/semantic-readiness-lib.mjs"), true, "shared validator library is frozen for identity candidates");
assert.equal(isFrozenSharedPath("package.json"), true, "identity candidates cannot change shared test wiring");
assert.equal(isFrozenSharedPath("research/fixtures/semantic-readiness/prismari.semantic-fixtures.json"), false, "identity fixture remains identity-scoped");
assert.equal(isFrozenSharedPath("research/build-faction-artifacts.mjs"), true, "global faction builder is frozen for identity candidates");
assert.equal(isFrozenSharedPath("assets/js/adaptive-placement.js"), true, "browser placement runtime is frozen for identity candidates");
assert.equal(isFrozenSharedPath("supabase/functions/guild-recruiter/index.ts"), true, "global recruiter runtime is frozen for identity candidates");
assert.equal(isAllowedIdentityCandidatePath("data/raw-factions/prismari/prismari.profile.json", "prismari"), true, "active raw packet is allowed");
assert.equal(isAllowedIdentityCandidatePath("data/raw-factions/lorehold/lorehold.profile.json", "prismari"), false, "another identity packet is forbidden");

assert.deepEqual(
  findForbiddenFieldChanges({ collision: { lateral_inhibition: false } }, { collision: { lateral_inhibition: true } }),
  ["/collision/lateral_inhibition"],
  "lateral inhibition changes must be rejected"
);
assert.deepEqual(
  buildLateralInhibitionTargets({
    key: "TEST_IDENTITY",
    normalizedCollisionGuidance: [
      { entry: { lateral_inhibition: false }, target: "UR" },
      { entry: {}, target: "WB" },
      { entry: { lateral_inhibition: true }, target: "BR" },
    ],
    rawQuestions: [{ collision_targets: ["azorius_senate"] }],
  }),
  ["WB", "BR", "WU"],
  "explicit non-inhibiting collision guidance must not feed generated lateral inhibition targets"
);
assert.deepEqual(
  findForbiddenPlacementBehaviorChanges({
    beforePlacement: { collision_guidance: [] },
    afterPlacement: { collision_guidance: [{ against: "izzet_league", lateral_inhibition: false }] },
    beforeGeneratedFaction: { lateral_inhibition_targets: ["WU"] },
    afterGeneratedFaction: { lateral_inhibition_targets: ["WU"] },
  }),
  [],
  "candidate scope allows explicit false only when generated inhibition behavior is unchanged"
);
assert.deepEqual(
  findForbiddenPlacementBehaviorChanges({
    beforePlacement: { collision_guidance: [] },
    afterPlacement: { collision_guidance: [{ against: "izzet_league", lateral_inhibition: true }] },
    beforeGeneratedFaction: { lateral_inhibition_targets: ["WU"] },
    afterGeneratedFaction: { lateral_inhibition_targets: ["WU", "UR"] },
  }),
  ["/collision_guidance/0/lateral_inhibition", "/generated/lateral_inhibition_targets"],
  "candidate scope still rejects true lateral inhibition behavior"
);
assert.deepEqual(
  findForbiddenPlacementBehaviorChanges({
    beforePlacement: { collision_guidance: [] },
    afterPlacement: { collision_guidance: [] },
    beforeGeneratedFaction: { lateral_inhibition_targets: ["WU"] },
    afterGeneratedFaction: { lateral_inhibition_targets: ["WU", "UR"] },
  }),
  ["/generated/lateral_inhibition_targets"],
  "candidate scope detects generated lateral target expansion even without a canonical lateral_inhibition field"
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
  findForbiddenFieldChanges({ overall_confidence: "Medium", calibration_tuning: { status: "old" } }, { overall_confidence: "High", calibration_tuning: { status: "new" } }),
  ["/calibration_tuning", "/overall_confidence"],
  "complete calibration and confidence surfaces must be frozen"
);

assert.deepEqual(
  findMissingNativeIds({ character: { character_id: "char_brodd_scaldbreath" } }, { character: { name: "Brodd" } }),
  ["character_id:char_brodd_scaldbreath"],
  "removing an existing native canonical ID must fail"
);
assert.deepEqual(
  findMissingNativeIds({ claim: { claim_id: "claim" }, source: { source_id: "source" } }, { claim: {}, source: {} }),
  ["claim_id:claim", "source_id:source"],
  "claim and source native IDs must be retained"
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

const isolationBase = {
  PRISMARI: { value: "before" },
  LOREHOLD: { value: "stable" },
};
assert.deepEqual(
  validateUnrelatedGeneratedIsolation({
    identityKey: "PRISMARI",
    beforeFactions: { factions: isolationBase },
    afterFactions: { factions: { ...isolationBase, PRISMARI: { value: "after" } } },
    beforePlacement: { factions: isolationBase },
    afterPlacement: { factions: isolationBase },
    beforeContext: isolationBase,
    afterContext: isolationBase,
    beforeContextMeta: { version: 1 },
    afterContextMeta: { version: 1 },
    beforeProvenance: { contract_version: "v1.1", entries: [{ identity_key: "LOREHOLD", value: "stable" }] },
    afterProvenance: { contract_version: "v1.1", entries: [{ identity_key: "LOREHOLD", value: "stable" }] },
  }),
  [],
  "selected identity generated changes may pass when global and unrelated content is identical"
);
assert.ok(
  validateUnrelatedGeneratedIsolation({
    identityKey: "PRISMARI",
    beforeFactions: { factions: isolationBase },
    afterFactions: { factions: { ...isolationBase, LOREHOLD: { value: "drift" } } },
    beforePlacement: { factions: isolationBase },
    afterPlacement: { factions: isolationBase },
    beforeContext: isolationBase,
    afterContext: isolationBase,
    beforeContextMeta: { version: 1 },
    afterContextMeta: { version: 1 },
    beforeProvenance: { contract_version: "v1.1", entries: [] },
    afterProvenance: { contract_version: "v1.1", entries: [] },
  }).some((error) => error.includes("data/factions")),
  "unrelated generated identity drift must fail"
);

console.log("Semantic candidate scope tests passed.");

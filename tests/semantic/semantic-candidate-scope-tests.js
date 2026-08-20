import assert from "node:assert/strict";
import {
  findForbiddenFieldChanges,
  findForbiddenPlacementBehaviorChanges,
  findEvidenceLocationSourceInconsistencies,
  findInvalidSemanticClaimReferences,
  findMissingNativeIds,
  findMissingProvenanceNativeIds,
  isAllowedIdentityCandidatePath,
  isFrozenSharedPath,
  normalizeCollisionGuidanceForCandidateScope,
  validateIdentityLayerPreviewChange,
  validateCollisionGuidancePreservation,
  validateGeneratedConsumerCoverage,
  validateGeneratedKeyFigureProofChains,
  validateRequiredProvenanceFields,
  validateUnrelatedGeneratedIsolation,
} from "../../scripts/validate/validate-semantic-candidate-scope.mjs";
import { buildLateralInhibitionTargets } from "../../scripts/build/build-faction-artifacts.mjs";

assert.equal(isFrozenSharedPath("docs/reference/semantic-readiness-contract.md"), true, "contract is frozen for identity candidates");
assert.equal(isFrozenSharedPath("scripts/lib/semantic-readiness-lib.mjs"), true, "shared validator library is frozen for identity candidates");
assert.equal(isFrozenSharedPath("package.json"), true, "identity candidates cannot change shared test wiring");
assert.equal(isFrozenSharedPath("research/fixtures/semantic-readiness/prismari.semantic-fixtures.json"), false, "identity fixture remains identity-scoped");
assert.equal(isFrozenSharedPath("scripts/build/build-faction-artifacts.mjs"), true, "global faction builder is frozen for identity candidates");
assert.equal(isFrozenSharedPath("assets/js/archscry/adaptive-placement.js"), true, "browser placement runtime is frozen for identity candidates");
assert.equal(isFrozenSharedPath("supabase/functions/guild-recruiter/index.ts"), true, "global recruiter runtime is frozen for identity candidates");
assert.equal(isAllowedIdentityCandidatePath("data/raw-factions/prismari/prismari.profile.json", "prismari"), true, "active raw packet is allowed");
assert.equal(isAllowedIdentityCandidatePath("data/raw-factions/lorehold/lorehold.profile.json", "prismari"), false, "another identity packet is forbidden");
assert.equal(isAllowedIdentityCandidatePath("data/identity-layers.json", "jund"), true, "identity-layer source file is conditionally allowed after object-level preview validation");

const baseIdentityLayers = {
  version: 1,
  expressions: {
    JUND: {
      preview_label: "Jund",
      preview_title: "Jund - Feeling as First Signal",
      preview_text: "Jund treats feeling as a compass.",
      preview_scores: { impulse: 5 },
    },
    NAYA: {
      preview_label: "Naya",
      preview_text: "Naya gathers around abundance.",
    },
  },
};
assert.deepEqual(
  validateIdentityLayerPreviewChange({
    identityKey: "JUND",
    beforeIdentityLayers: baseIdentityLayers,
    afterIdentityLayers: {
      ...baseIdentityLayers,
      expressions: {
        ...baseIdentityLayers.expressions,
        JUND: {
          ...baseIdentityLayers.expressions.JUND,
          preview_text: "Jund trusts feeling as the first signal.",
        },
      },
    },
  }),
  [],
  "target identity preview_text is the only allowed identity-layer source change"
);
assert.deepEqual(
  validateIdentityLayerPreviewChange({
    identityKey: "JUND",
    beforeIdentityLayers: baseIdentityLayers,
    afterIdentityLayers: JSON.parse(JSON.stringify(baseIdentityLayers)),
  }),
  [],
  "formatting-neutral identity-layer serialization must not create a false violation"
);
for (const [label, afterIdentityLayers] of [
  ["another identity preview", {
    ...baseIdentityLayers,
    expressions: {
      ...baseIdentityLayers.expressions,
      NAYA: { ...baseIdentityLayers.expressions.NAYA, preview_text: "Naya changed." },
    },
  }],
  ["two identity previews", {
    ...baseIdentityLayers,
    expressions: {
      ...baseIdentityLayers.expressions,
      JUND: { ...baseIdentityLayers.expressions.JUND, preview_text: "Jund changed." },
      NAYA: { ...baseIdentityLayers.expressions.NAYA, preview_text: "Naya changed." },
    },
  }],
  ["target non-preview field", {
    ...baseIdentityLayers,
    expressions: {
      ...baseIdentityLayers.expressions,
      JUND: { ...baseIdentityLayers.expressions.JUND, preview_title: "Changed title" },
    },
  }],
  ["target added field", {
    ...baseIdentityLayers,
    expressions: {
      ...baseIdentityLayers.expressions,
      JUND: { ...baseIdentityLayers.expressions.JUND, preview_extra: "not allowed" },
    },
  }],
  ["deleted target expression", {
    ...baseIdentityLayers,
    expressions: { NAYA: baseIdentityLayers.expressions.NAYA },
  }],
  ["replaced expressions object", {
    ...baseIdentityLayers,
    expressions: { JUND: { preview_text: "Jund changed." } },
  }],
  ["root metadata change", {
    ...baseIdentityLayers,
    version: 2,
  }],
  ["array structural mutation", {
    ...baseIdentityLayers,
    expressions: {
      ...baseIdentityLayers.expressions,
      JUND: { ...baseIdentityLayers.expressions.JUND, preview_scores: ["not", "an", "object"] },
    },
  }],
]) {
  assert.ok(
    validateIdentityLayerPreviewChange({ identityKey: "JUND", beforeIdentityLayers: baseIdentityLayers, afterIdentityLayers }).length > 0,
    `${label} must fail identity-layer preview scope`
  );
}

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

const roleFixtureClaims = {
  claims: [
    { claim_id: "claim_substantive", semantic_role: "substantive_claim" },
    { claim_id: "claim_discovery", semantic_role: "discovery_record" },
    { claim_id: "claim_support", semantic_role: "support_record" },
  ],
};
assert.deepEqual(
  findInvalidSemanticClaimReferences({
    document: { generated: { claim_ids: ["claim_substantive", "claim_discovery", "claim_support", "claim_missing"] } },
    claimsFile: roleFixtureClaims,
    label: "generated.json#/factions/TEST",
  }),
  [
    "generated.json#/factions/TEST#/generated/claim_ids references claim_discovery as semantic proof but role is discovery_record",
    "generated.json#/factions/TEST#/generated/claim_ids references claim_support as semantic proof but role is support_record",
    "generated.json#/factions/TEST#/generated/claim_ids references claim_missing as semantic proof but role is missing",
  ],
  "generated authoritative proof chains must not use discovery, support, or missing claim roles"
);
assert.deepEqual(
  findInvalidSemanticClaimReferences({
    document: { bibliography: { claim_ids: ["claim_discovery"], evidence_use: "discovery_metadata" } },
    claimsFile: roleFixtureClaims,
    label: "generated.json#/factions/TEST",
  }),
  [],
  "explicit non-authoritative discovery metadata may retain discovery claim references"
);
assert.ok(
  validateGeneratedKeyFigureProofChains({
    identityKey: "TEST",
    faction: { raw_enrichment: { key_figures: [{ character_id: "char_test", claim_ids: ["claim_discovery"] }] } },
    claimsFile: roleFixtureClaims,
  })[0].includes("generated key-figure proof chain contamination"),
  "generated key-figure proof chains must not present discovery records as source-backed faction proof"
);
assert.deepEqual(
  validateRequiredProvenanceFields({
    identityKey: "TEST",
    provenance: { entries: [{ identity_key: "TEST", evidence_claim_ids: ["claim_substantive"], generated_consumers: [] }] },
  }),
  [
    "data/semantic-readiness-provenance.json#/entries/0 missing canonical_file",
    "data/semantic-readiness-provenance.json#/entries/0 missing canonical_pointer",
    "data/semantic-readiness-provenance.json#/entries/0 missing canonical_content_hash",
    "data/semantic-readiness-provenance.json#/entries/0 missing generated_consumers",
    "data/semantic-readiness-provenance.json#/entries/0 missing evidence_source_ids for declared evidence_claim_ids",
  ],
  "semantic provenance entries must retain required non-null traceability fields"
);
assert.deepEqual(
  findEvidenceLocationSourceInconsistencies({
    claimsFile: {
      claims: [{
        claim_id: "claim_locator",
        source_ids: ["src_gatecrash"],
        evidence_locations: [{ source_id: "src_gatecrash", locator: "A Flavorful Guide to the Guilds of Ravnica - reviewed source record" }],
      }],
    },
    sourcesFile: {
      sources: [
        { source_id: "src_gatecrash", title: "The Boros Legion" },
        { source_id: "src_flavorful", title: "A Flavorful Guide to the Guilds of Ravnica" },
      ],
    },
  }),
  ["claim_locator/evidence_locations/0 locator names A Flavorful Guide to the Guilds of Ravnica but source_id is src_gatecrash"],
  "evidence locators must not name a different source record than their source_id"
);
assert.deepEqual(
  validateCollisionGuidancePreservation({
    identityKey: "WR",
    placement: { collision_guidance: [{ collision_id: "collision_kept", against: "azorius_senate" }, { collision_id: "collision_dropped", against: "cult_of_rakdos" }] },
    generatedFaction: { lateral_inhibition_targets: [], collision_guidance: [{ collision_id: "collision_kept", against: "WU" }] },
  }),
  ["generated collision guidance dropped collision_dropped for WR"],
  "candidate scope must detect generated collision-guidance drops"
);
const arrayGuidance = [
  { collision_id: "array_first", against: "azorius_senate" },
  { collision_id: "array_second", against: "cult_of_rakdos" },
];
assert.deepEqual(
  normalizeCollisionGuidanceForCandidateScope({
    identityKey: "WR",
    file: "data/raw-factions/boros_legion/boros_legion.placement.json",
    guidance: arrayGuidance,
  }).entries.map(({ entry, pointer }) => [entry.collision_id, pointer]),
  [
    ["array_first", "#/collision_guidance/0"],
    ["array_second", "#/collision_guidance/1"],
  ],
  "array-shaped collision guidance must preserve existing order and pointer shape"
);
assert.deepEqual(
  validateCollisionGuidancePreservation({
    identityKey: "WR",
    placement: { collision_guidance: arrayGuidance },
    generatedFaction: {
      lateral_inhibition_targets: [],
      collision_guidance: [
        { collision_id: "array_first", against: "WU" },
        { collision_id: "array_second", against: "BR" },
      ],
    },
  }),
  [],
  "existing array-shaped collision guidance still validates unchanged generated comparisons"
);
assert.deepEqual(
  validateCollisionGuidancePreservation({
    identityKey: "WR",
    placement: { collision_guidance: arrayGuidance },
    generatedFaction: {
      lateral_inhibition_targets: [],
      collision_guidance: [
        { collision_id: "array_first", against: "WU" },
        { collision_id: "array_second", against: "BG" },
      ],
    },
  }),
  ["generated collision guidance target mismatch for array_second: expected BR, got BG"],
  "array-shaped collision guidance still reports changed generated targets"
);

const whiteObjectGuidance = {
  rule: "Preserve metadata without treating it as a pair.",
  review_triggers: ["metadata stays metadata"],
  pairs: [
    { collision_id: "white_vs_black", against: "B" },
    { collision_id: "white_vs_red", against: "R" },
  ],
};
assert.deepEqual(
  normalizeCollisionGuidanceForCandidateScope({
    identityKey: "W",
    file: "data/raw-factions/white/white.placement.json",
    guidance: whiteObjectGuidance,
  }).entries.map(({ entry, pointer }) => [entry.collision_id, pointer]),
  [
    ["white_vs_black", "#/collision_guidance/pairs/0"],
    ["white_vs_red", "#/collision_guidance/pairs/1"],
  ],
  "object-with-pairs collision guidance must preserve pair order and ignore object metadata as pairs"
);
assert.deepEqual(
  validateCollisionGuidancePreservation({
    identityKey: "W",
    placement: { collision_guidance: whiteObjectGuidance },
    generatedFaction: {
      lateral_inhibition_targets: ["WU", "WB", "WG", "WR"],
      collision_guidance: [
        { collision_id: "white_vs_black", against: "B" },
        { collision_id: "white_vs_red", against: "R" },
      ],
    },
    placementFile: "data/raw-factions/white/white.placement.json",
  }),
  [],
  "White object-with-pairs collision guidance validates without crashing"
);
assert.deepEqual(
  validateCollisionGuidancePreservation({
    identityKey: "W",
    placement: { collision_guidance: whiteObjectGuidance },
    generatedFaction: {
      lateral_inhibition_targets: [],
      collision_guidance: [
        { collision_id: "white_vs_black", against: "B" },
        { collision_id: "white_vs_red", against: "U" },
      ],
    },
    placementFile: "data/raw-factions/white/white.placement.json",
  }),
  ["generated collision guidance target mismatch for white_vs_red: expected R, got U"],
  "object-with-pairs collision guidance still detects changed generated targets"
);

for (const [label, guidance, expected] of [
  ["object without pairs", { rule: "missing pairs" }, "object-shaped collision_guidance must provide pairs as an array"],
  ["pairs is not array", { pairs: { collision_id: "too_broad" } }, "object-shaped collision_guidance must provide pairs as an array"],
  ["unsupported primitive", "not guidance", "collision_guidance must be present and contain ordered collision pair data"],
  ["null guidance", null, "collision_guidance must be present and contain ordered collision pair data"],
]) {
  const errors = validateCollisionGuidancePreservation({
    identityKey: "W",
    placement: { collision_guidance: guidance },
    generatedFaction: { lateral_inhibition_targets: [], collision_guidance: [] },
    placementFile: "data/raw-factions/white/white.placement.json",
  });
  assert.equal(errors.length, 1, `${label} must fail closed with one diagnostic`);
  assert.ok(errors[0].includes("collision guidance validation cannot continue for W"), `${label} diagnostic includes identity`);
  assert.ok(errors[0].includes("data/raw-factions/white/white.placement.json"), `${label} diagnostic includes file`);
  assert.ok(errors[0].includes("supported shapes are Array"), `${label} diagnostic includes supported shapes`);
  assert.ok(errors[0].includes(expected), `${label} diagnostic includes precise reason`);
}
{
  const errors = validateCollisionGuidancePreservation({
    identityKey: "W",
    placement: { collision_guidance: { pairs: [{ collision_id: "valid", against: "B" }, null] } },
    generatedFaction: { lateral_inhibition_targets: [], collision_guidance: [{ collision_id: "valid", against: "B" }] },
    placementFile: "data/raw-factions/white/white.placement.json",
  });
  assert.equal(errors.length, 1, "malformed pair element must fail closed with one diagnostic");
  assert.ok(errors[0].includes("#/collision_guidance/pairs/1"), "malformed pair diagnostic includes pair path");
  assert.ok(errors[0].includes("collision pair entries must be objects"), "malformed pair diagnostic includes precise reason");
}

const isolationBase = {
  PRISMARI: { value: "before" },
  LOREHOLD: { value: "stable" },
};
const generatedPreviewBase = {
  factions: isolationBase,
  identity_layers: {
    expressions: {
      PRISMARI: { preview_text: "Prismari before.", preview_title: "Prismari" },
      LOREHOLD: { preview_text: "Lorehold stable.", preview_title: "Lorehold" },
    },
  },
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
assert.deepEqual(
  validateUnrelatedGeneratedIsolation({
    identityKey: "PRISMARI",
    beforeFactions: generatedPreviewBase,
    afterFactions: {
      ...generatedPreviewBase,
      identity_layers: {
        expressions: {
          ...generatedPreviewBase.identity_layers.expressions,
          PRISMARI: {
            ...generatedPreviewBase.identity_layers.expressions.PRISMARI,
            preview_text: "Prismari after.",
          },
        },
      },
    },
    beforePlacement: { factions: isolationBase },
    afterPlacement: { factions: isolationBase },
    beforeContext: isolationBase,
    afterContext: isolationBase,
    beforeContextMeta: { version: 1 },
    afterContextMeta: { version: 1 },
    beforeProvenance: { contract_version: "v1.1", entries: [] },
    afterProvenance: { contract_version: "v1.1", entries: [] },
  }),
  [],
  "target embedded identity-layer preview change in generated factions may pass"
);
assert.ok(
  validateUnrelatedGeneratedIsolation({
    identityKey: "PRISMARI",
    beforeFactions: generatedPreviewBase,
    afterFactions: {
      ...generatedPreviewBase,
      identity_layers: {
        expressions: {
          ...generatedPreviewBase.identity_layers.expressions,
          LOREHOLD: {
            ...generatedPreviewBase.identity_layers.expressions.LOREHOLD,
            preview_text: "Lorehold drift.",
          },
        },
      },
    },
    beforePlacement: { factions: isolationBase },
    afterPlacement: { factions: isolationBase },
    beforeContext: isolationBase,
    afterContext: isolationBase,
    beforeContextMeta: { version: 1 },
    afterContextMeta: { version: 1 },
    beforeProvenance: { contract_version: "v1.1", entries: [] },
    afterProvenance: { contract_version: "v1.1", entries: [] },
  }).some((error) => error.includes("data/factions")),
  "another identity embedded identity-layer preview change must fail"
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

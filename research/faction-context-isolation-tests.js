import assert from "node:assert/strict";

import {
  assertOnlyContextTargetsChanged,
  mergeFactionContextEntries,
  parseBuildFactionArtifactsArgs,
  parseFactionContextModule,
  renderFactionContextModule,
} from "./build-faction-artifacts.mjs";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const baseContext = {
  WU: {
    name: "Azorius Senate",
    tagline: "Order, commas, and careful boundaries.",
    placement_axes: {
      required_positive_evidence_terms: ["law", "procedure"],
    },
  },
  YORE: {
    name: "Yore",
    tagline: "Old machines remember the future.",
    nested: {
      text: "literal as const; inside a string should not stop parsing",
      braces: "safe { inside } quoted text",
    },
  },
  DUNE: {
    name: "Dune",
    poor_fit_indicators: ["generic combat"],
  },
  GLINT: {
    name: "Glint",
    inhibitor_traps: ["generic chaos"],
  },
  INK: {
    name: "Ink",
    discriminator_questions: [
      {
        id: "ink_disc_001",
        supports: "protected commons",
      },
    ],
  },
};

const baseMeta = {
  model_version: "old-meta",
  nested: {
    preserved: true,
  },
};

const rendered = renderFactionContextModule({
  factionContext: baseContext,
  placementModelMeta: baseMeta,
});

{
  const parsed = parseFactionContextModule(rendered);
  assert.deepEqual(parsed.factionContext, baseContext, "parses FACTION_CONTEXT");
  assert.deepEqual(parsed.placementModelMeta, baseMeta, "parses PLACEMENT_MODEL_META");
}

{
  const freshContext = clone(baseContext);
  freshContext.YORE = {
    ...freshContext.YORE,
    tagline: "Updated Yore context",
  };
  freshContext.WU = {
    ...freshContext.WU,
    tagline: "This non-target drift must not be accepted",
  };
  const merged = mergeFactionContextEntries({
    existingContext: baseContext,
    freshContext,
    targets: ["YORE"],
  });
  assert.equal(merged.YORE.tagline, "Updated Yore context", "replaces one target entry");
  assert.deepEqual(merged.WU, baseContext.WU, "preserves non-target entry");
}

{
  const freshContext = clone(baseContext);
  freshContext.YORE.name = "Yore Repaired";
  freshContext.DUNE.name = "Dune Repaired";
  const merged = mergeFactionContextEntries({
    existingContext: baseContext,
    freshContext,
    targets: ["YORE", "DUNE"],
  });
  assert.equal(merged.YORE.name, "Yore Repaired", "replaces first target");
  assert.equal(merged.DUNE.name, "Dune Repaired", "replaces second target");
  assert.deepEqual(merged.GLINT, baseContext.GLINT, "preserves unrelated target neighbor");
}

{
  const freshContext = clone(baseContext);
  freshContext.INK.name = "Ink Repaired";
  freshContext.GLINT.name = "Glint Repaired";
  const merged = mergeFactionContextEntries({
    existingContext: baseContext,
    freshContext,
    targets: "INK,GLINT",
  });
  assert.deepEqual(Object.keys(merged), Object.keys(baseContext), "preserves current object key order");
}

{
  const drifted = clone(baseContext);
  drifted.WU.name = "Changed non-target";
  assert.throws(
    () => assertOnlyContextTargetsChanged(baseContext, drifted, ["YORE"]),
    /non-target FACTION_CONTEXT entry WU/,
    "detects non-target drift"
  );
}

{
  const reordered = {
    YORE: baseContext.YORE,
    WU: baseContext.WU,
    DUNE: baseContext.DUNE,
    GLINT: baseContext.GLINT,
    INK: baseContext.INK,
  };
  assert.throws(
    () => assertOnlyContextTargetsChanged(baseContext, reordered, ["YORE"]),
    /key order or key set/,
    "detects key order drift"
  );
}

{
  const parsed = parseFactionContextModule(rendered);
  const rerendered = renderFactionContextModule(parsed);
  assert.deepEqual(parseFactionContextModule(rerendered), parsed, "render/parse round trip handles commas and boundaries");
}

{
  assert.throws(
    () => parseFactionContextModule("export const FACTION_CONTEXT = {} as const;"),
    /Missing PLACEMENT_MODEL_META/,
    "rejects missing context structures"
  );
  assert.throws(
    () => parseFactionContextModule("export const FACTION_CONTEXT = { as const;\n\nexport const PLACEMENT_MODEL_META = {} as const;"),
    /incomplete|parse|mismatched|must/,
    "rejects malformed context structures"
  );
}

{
  const freshContext = clone(baseContext);
  delete freshContext.YORE;
  assert.throws(
    () => mergeFactionContextEntries({ existingContext: baseContext, freshContext, targets: ["YORE"] }),
    /missing from fresh FACTION_CONTEXT/,
    "rejects missing fresh target"
  );
  const existingContext = clone(baseContext);
  delete existingContext.YORE;
  assert.throws(
    () => mergeFactionContextEntries({ existingContext, freshContext: baseContext, targets: ["YORE"] }),
    /missing from existing FACTION_CONTEXT/,
    "rejects missing existing target"
  );
}

{
  assert.deepEqual(parseBuildFactionArtifactsArgs([]), { contextTargets: null }, "full mode remains available");
  assert.deepEqual(
    parseBuildFactionArtifactsArgs(["--context-targets=YORE,DUNE,GLINT,INK"]),
    { contextTargets: ["YORE", "DUNE", "GLINT", "INK"] },
    "parses targeted mode"
  );
}

console.log("Faction context isolation helper tests passed.");

import assert from "node:assert/strict";

import {
  SNAPSHOT_SCHEMA_VERSION,
  buildPresentationSnapshotPayload,
  flattenSnapshotCase,
  renderPresentationSnapshotCsv,
} from "./presentation-snapshot-runner.mjs";

const payload = await buildPresentationSnapshotPayload();
const secondPayload = await buildPresentationSnapshotPayload();

assert.deepEqual(payload, secondPayload, "presentation snapshots should be deterministic across repeated builds.");
assert.equal(payload.schema_version, SNAPSHOT_SCHEMA_VERSION);
assert.equal(payload.case_count, 16);

const expectedCaseIds = [
  "mono-white-golden",
  "mono-blue-golden",
  "mono-black-golden",
  "mono-red-golden",
  "mono-green-golden",
  "mono-white-boundary",
  "mono-blue-boundary",
  "mono-black-boundary",
  "mono-red-boundary",
  "mono-green-boundary",
  "guild-azorius-golden",
  "guild-dimir-golden",
  "guild-rakdos-golden",
  "guild-golgari-golden",
  "college-lorehold-golden",
  "college-witherbloom-golden",
];
assert.deepEqual(
  payload.cases.map((entry) => entry.case_id),
  expectedCaseIds,
  "presentation snapshot fixture library should expose the 16-case baseline in stable order."
);

const monoWhite = payload.cases.find((entry) => entry.case_id === "mono-white-boundary");
assert.ok(monoWhite, "Expected mono White snapshot case.");
assert.equal(monoWhite.placement_result.faction, "W");
const expectedWhiteBoundaryAdjacencies = [
  { key: "LOREHOLD", family: "WR" },
  { key: "BANT", family: "WUG" },
];
const whiteBoundaryAdjacency = expectedWhiteBoundaryAdjacencies.find(({ key }) =>
  monoWhite.raw_adjacent_labels.some((entry) => entry.key === key)
);
assert.ok(
  whiteBoundaryAdjacency,
  "White boundary case should preserve a raw Lorehold or Bant adjacent label."
);
assert.ok(
  monoWhite.adjacent_debug_family_grouping.some((entry) =>
    entry.raw_key === whiteBoundaryAdjacency.key && entry.family_color_identity === whiteBoundaryAdjacency.family
  ),
  "White boundary case should include debug-only family grouping for its raw adjacent label."
);
assert.ok(monoWhite.presentation.hero_thesis.length > 80);
assert.ok(monoWhite.presentation.why_rose_first.copy.includes("These signals help explain why White appeared here"));
assert.ok(monoWhite.presentation.why_rose_first.copy.includes("do not define your personality"));
assert.ok(monoWhite.presentation.commander_recommendation_names.length >= 3);
assert.ok(monoWhite.presentation.maze_paths.every((path) => path.plainReadingQuery && path.operatorQuery));
assert.match(monoWhite.authored_vs_fallback.summary, /commander_compass/);

const monoBoundaryFamilies = {
  "mono-white-boundary": ["R", "WU", "WB", "WG", "WR", "WUG", "RGW"],
  "mono-blue-boundary": ["B", "WU", "UB", "UR", "UG", "WUG", "UBR"],
  "mono-black-boundary": ["WB", "UB", "BR", "BG", "UBR", "BRG"],
  "mono-red-boundary": ["WR", "UR", "BR", "RG", "UBR", "BRG", "RGW"],
  "mono-green-boundary": ["WG", "UG", "BG", "RG", "WUG", "BRG", "RGW"],
};
Object.entries(monoBoundaryFamilies).forEach(([caseId, expectedFamilies]) => {
  const entry = payload.cases.find((item) => item.case_id === caseId);
  assert.ok(entry, `Expected ${caseId}.`);
  const allowed = new Set(expectedFamilies);
  assert.ok(
    entry.adjacent_debug_family_grouping.every((item) => allowed.has(item.family_color_identity)),
    `${caseId} should keep adjacent debug families inside ${expectedFamilies.join(", ")}.`
  );
});

const pairCase = payload.cases.find((entry) => entry.case_id === "guild-golgari-golden");
assert.ok(pairCase, "Expected Golgari pair snapshot case.");
assert.equal(pairCase.placement_result.faction, "BG");
assert.equal(pairCase.presentation.adjacent_or_fork.adjacent_key, "", "an unqualified numerical neighbor must not become a public adjacent identity");
assert.equal(pairCase.presentation.adjacent_or_fork.copy, "", "the snapshot must not manufacture comparison copy when no public alternative qualified");

const csv = renderPresentationSnapshotCsv(payload);
const header = csv.split(/\r?\n/)[0].split(",");
[
  "case_id",
  "case_name",
  "answers_json",
  "primary_key",
  "primary_name",
  "primary_expression_kind",
  "adjacent_1_key",
  "adjacent_1_name",
  "adjacent_2_key",
  "adjacent_2_name",
  "core_identity",
  "secondary_identity",
  "expression_key",
  "expression_name",
  "purity",
  "signal_strength",
  "edhrec_link",
  "mtgdecks_link",
  "commander_1",
  "commander_2",
  "commander_3",
  "maze_path_count",
  "authored_vs_fallback_summary",
  "warning_count",
].forEach((column) => assert.ok(header.includes(column), `Missing CSV column ${column}.`));

const flattened = flattenSnapshotCase(monoWhite);
assert.equal(flattened.primary_key, "W");
assert.ok(
  [flattened.adjacent_1_key, flattened.adjacent_2_key].some((key) => ["LOREHOLD", "BANT"].includes(key)),
  "White boundary flattened row should preserve Lorehold or Bant as a raw adjacent value."
);
assert.equal(flattened.maze_path_count, "4");

console.log(`PASS presentation snapshot tests: ${payload.case_count} fixed cases`);

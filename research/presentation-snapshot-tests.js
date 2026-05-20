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
assert.ok(
  monoWhite.raw_adjacent_labels.some((entry) => entry.key === "LOREHOLD"),
  "White boundary case should preserve raw Lorehold adjacent label."
);
assert.ok(
  monoWhite.adjacent_debug_family_grouping.some((entry) =>
    entry.raw_key === "LOREHOLD" && entry.family_color_identity === "WR"
  ),
  "White boundary case should include debug-only WR family grouping for Lorehold."
);
assert.ok(monoWhite.presentation.hero_thesis.length > 80);
assert.ok(monoWhite.presentation.why_rose_first.copy.includes("White led with a"));
assert.ok(monoWhite.presentation.commander_recommendation_names.length >= 3);
assert.ok(monoWhite.presentation.maze_paths.every((path) => path.plainReadingQuery && path.operatorQuery));
assert.match(monoWhite.authored_vs_fallback.summary, /commander_compass/);

const monoBoundaryFamilies = {
  "mono-white-boundary": ["WU", "WB", "WG", "WR"],
  "mono-blue-boundary": ["WU", "UB", "UR", "UG"],
  "mono-black-boundary": ["WB", "UB", "BR", "BG"],
  "mono-red-boundary": ["WR", "UR", "BR", "RG"],
  "mono-green-boundary": ["WG", "UG", "BG", "RG"],
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
assert.ok(pairCase.presentation.adjacent_or_fork.copy.length > 40);

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
  [flattened.adjacent_1_key, flattened.adjacent_2_key].includes("LOREHOLD"),
  "White boundary flattened row should preserve Lorehold as a raw adjacent value."
);
assert.equal(flattened.maze_path_count, "4");

console.log(`PASS presentation snapshot tests: ${payload.case_count} fixed cases`);

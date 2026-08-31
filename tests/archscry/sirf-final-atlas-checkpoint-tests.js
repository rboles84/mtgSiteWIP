import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const arraysEqual = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const groupRank = { nativeExact: 0, otherExact: 1, stretch: 2 };

const expectedIdentityKeys = [
  "W", "U", "B", "R", "G",
  "WU", "WR", "BR", "BG", "RG", "UB", "UR", "WB", "WG", "UG",
  "LOREHOLD", "PRISMARI", "QUANDRIX", "SILVERQUILL", "WITHERBLOOM",
  "BANT", "ESPER", "GRIXIS", "JUND", "NAYA",
  "ABZAN", "JESKAI", "MARDU", "SULTAI", "TEMUR",
  "DUNE", "GLINT", "INK", "WITCH", "YORE", "COLORLESS", "WUBRG",
];

const expectedContractKeys = [
  "W", "U", "B", "R", "G",
  "WU", "WR", "BR", "BG", "RG", "UB", "UR", "WB", "WG", "UG",
  "PRISMARI", "QUANDRIX", "SILVERQUILL", "WITHERBLOOM",
  "BANT", "ESPER", "GRIXIS", "JUND", "NAYA",
  "ABZAN", "JESKAI", "MARDU", "SULTAI",
  "DUNE", "GLINT", "INK", "WITCH", "YORE", "COLORLESS",
];

const checkpoint = readJson("docs/sirf/checkpoints/2026-08-30-final-all-37-atlas-checkpoint.json");
const collection = readJson(checkpoint.rendered_collection);
const vm595 = readJson("docs/research/placement-language-trust-audit.json");
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const providerValidation = readJson("data/placement/commander-provider-validation.json");
const wubrgSurfaceRole = readJson(checkpoint.wubrg_surface_role_contract);

assert.equal(checkpoint.status, "PASS");
assert.equal(checkpoint.checkpoint_phase, "FINAL_ATLAS_CLOSEOUT");
assert.equal(checkpoint.baseline_sha, "216a0355673beb086830db21029446d1d9bf120d");
assert.equal(checkpoint.identity_count, 37);
assert.equal(checkpoint.rendered_record_count, 74);
assert.equal(checkpoint.screenshot_count, 74);
assert.equal(checkpoint.accepted_contract_count, 34);
assert.equal(checkpoint.golden_control_count, 3);
assert.equal(collection.identity_count, 37);
assert.equal(collection.view_count, 74);
assert.equal(collection.desktop.length, 37);
assert.equal(collection.mobile.length, 37);
assert.deepEqual(collection.desktop.map((record) => record.identity_key), expectedIdentityKeys);
assert.deepEqual(collection.mobile.map((record) => record.identity_key), expectedIdentityKeys);
assert.deepEqual(Object.keys(checkpoint.taxonomy_inventory), expectedIdentityKeys);
assert.equal(checkpoint.section_role_matrix.length, 5);
assert.equal(checkpoint.section_role_matrix_identity_coverage, 37);
assert.ok(checkpoint.section_role_matrix.every((row) => row.redundancy_result === "PASS"));

for (const desktop of collection.desktop) {
  const mobile = collection.mobile.find((record) => record.identity_key === desktop.identity_key);
  assert.ok(mobile, `${desktop.identity_key} must have a mobile render.`);
  assert.ok(desktop.sections.every((section) => section.present), `${desktop.identity_key} desktop must contain all five sections.`);
  assert.ok(mobile.sections.every((section) => section.present), `${desktop.identity_key} mobile must contain all five sections.`);
  assert.equal(desktop.geometry.horizontal_overflow, false, `${desktop.identity_key} desktop must not overflow.`);
  assert.equal(mobile.geometry.horizontal_overflow, false, `${desktop.identity_key} mobile must not overflow.`);
  assert.deepEqual(desktop.duplicate_product_names, [], `${desktop.identity_key} desktop products must be unique.`);
  assert.deepEqual(mobile.duplicate_product_names, [], `${desktop.identity_key} mobile products must be unique.`);
  assert.deepEqual(mobile.start_here_taxonomy, desktop.start_here_taxonomy, `${desktop.identity_key} Start Here must match at both widths.`);
  assert.deepEqual(mobile.what_to_look_for_taxonomy, desktop.what_to_look_for_taxonomy, `${desktop.identity_key} What to Look For must match at both widths.`);
  assert.deepEqual(mobile.precon_cards, desktop.precon_cards, `${desktop.identity_key} product names, commanders, and lanes must match at both widths.`);
  assert.deepEqual(mobile.group_order, desktop.group_order, `${desktop.identity_key} relationship order must match at both widths.`);
  assert.ok(desktop.group_order.every((group, index, groups) => index === 0 || groupRank[groups[index - 1]] < groupRank[group]), `${desktop.identity_key} must render Native before Exact before Stretch.`);
  assert.equal(new Set(desktop.precon_cards.map((entry) => entry.product)).size, desktop.precon_cards.length, `${desktop.identity_key} product membership must be exclusive.`);
  assert.ok(fs.existsSync(desktop.screenshot), `${desktop.identity_key} desktop screenshot must exist.`);
  assert.ok(fs.existsSync(mobile.screenshot), `${desktop.identity_key} mobile screenshot must exist.`);
  const inventory = checkpoint.taxonomy_inventory[desktop.identity_key];
  if (desktop.identity_key === "WUBRG") {
    assert.deepEqual(desktop.start_here_taxonomy, inventory.start_here);
    assert.deepEqual(desktop.what_to_look_for_taxonomy, inventory.what_to_look_for);
    assert.equal(desktop.taxonomy_sets_equal, false);
  } else {
    assert.deepEqual(desktop.start_here_taxonomy, inventory);
    assert.deepEqual(desktop.what_to_look_for_taxonomy, inventory);
    assert.equal(desktop.taxonomy_sets_equal, true);
  }
}

const contractFiles = fs.readdirSync("docs/sirf/contracts").filter((file) => file.endsWith(".json")).sort();
const contracts = contractFiles.map((file) => readJson(`docs/sirf/contracts/${file}`));
assert.equal(contracts.length, 34, "final checkpoint must contain exactly 34 promoted contracts");
assert.deepEqual(contracts.map((contract) => contract.identity_key).sort(), [...expectedContractKeys].sort());
for (const contract of contracts) {
  const rendered = collection.desktop.find((record) => record.identity_key === contract.identity_key);
  assert.equal(contract.schema_version, "sirf-v0.2-contract-v1");
  assert.equal(contract.status, "ACCEPTED");
  assert.ok(rendered, `${contract.identity_key} must render.`);
  assert.deepEqual(contract.start_here_taxonomy, contract.what_to_look_for_taxonomy, `${contract.identity_key} accepted contract sets must match exactly.`);
  assert.deepEqual(rendered.start_here_taxonomy, contract.start_here_taxonomy, `${contract.identity_key} rendered Start Here must equal its contract.`);
  assert.deepEqual(rendered.what_to_look_for_taxonomy, contract.what_to_look_for_taxonomy, `${contract.identity_key} rendered What to Look For must equal its contract.`);
  const products = {
    native: rendered.precon_cards.filter((entry) => entry.group === "nativeExact").map((entry) => entry.product),
    exact: rendered.precon_cards.filter((entry) => entry.group === "otherExact").map((entry) => entry.product),
    stretch: rendered.precon_cards.filter((entry) => entry.group === "stretch").map((entry) => entry.product),
  };
  assert.deepEqual([...products.native].sort(), [...contract.precon_contract.native].sort(), `${contract.identity_key} Native set must equal its contract.`);
  for (const required of contract.precon_contract.exact_color_required) {
    assert.ok(products.exact.includes(required), `${contract.identity_key} must render required Exact product ${required}.`);
  }
  if (!contract.precon_contract.stretch_allowed) assert.deepEqual(products.stretch, [], `${contract.identity_key} must exclude Stretch products.`);
}

const taxonomyExceptions = collection.desktop.filter((record) => !arraysEqual(record.start_here_taxonomy, record.what_to_look_for_taxonomy));
assert.deepEqual(taxonomyExceptions.map((record) => record.identity_key), ["WUBRG"], "WUBRG must remain the only accepted golden-specific taxonomy shape.");
assert.equal(checkpoint.accepted_taxonomy_result.unexpected_exception_count, 0);
assert.ok(["TEMUR", "LOREHOLD"].every((key) => collection.desktop.find((record) => record.identity_key === key)?.taxonomy_sets_equal));

const wubrg = collection.desktop.find((record) => record.identity_key === "WUBRG");
assert.equal(wubrgSurfaceRole.status, "ACCEPTED");
assert.equal(wubrgSurfaceRole.identity_key, "WUBRG");
assert.match(wubrgSurfaceRole.default_rule_preserved, /Every promoted non-golden SIRF contract must retain exact Start Here \/ What to Look For taxonomy equality/);
assert.deepEqual(wubrg.start_here_taxonomy, wubrgSurfaceRole.start_here.accepted_exact_set);
assert.deepEqual(wubrg.what_to_look_for_taxonomy, wubrgSurfaceRole.what_to_look_for.accepted_exact_set);
assert.equal(wubrgSurfaceRole.start_here.identity_specific_item, "Fixing & Ramp");
assert.equal(wubrgSurfaceRole.what_to_look_for.identity_specific_item, "Five-Color Typal");
assert.equal(wubrgSurfaceRole.redundancy_result, "PASS_ACCEPTED_IDENTITY_SPECIFIC_SURFACE_ROLE_DISTINCTION");
const turtle = wubrg.precon_cards.find((entry) => entry.product === "Turtle Power!");
assert.equal(turtle?.group, "otherExact");
assert.equal(turtle?.commander, "Leonardo, the Balance");
const turtleSource = preconSource.precons.find((entry) => entry.deckName === "Turtle Power!");
const turtleCatalog = preconCatalog.precons.find((entry) => entry.deckName === "Turtle Power!");
assert.equal(turtleSource?.mainCommander, "Leonardo, the Balance");
assert.deepEqual(turtleSource?.secondaryCommanders, ["Heroes in a Half Shell"]);
assert.equal(turtleCatalog?.mainCommander, "Leonardo, the Balance");
assert.deepEqual(turtleCatalog?.secondaryCommanders, ["Heroes in a Half Shell"]);
assert.ok(providerValidation.commanders["Leonardo, the Balance"]?.links?.length === 1);
assert.equal(providerValidation.commanders["Heroes in a Half Shell"], undefined);

const jund = collection.desktop.find((record) => record.identity_key === "JUND");
assert.ok(jund.precon_cards.some((entry) => entry.product === "Power Hungry" && entry.group === "otherExact"));
const colorless = collection.desktop.find((record) => record.identity_key === "COLORLESS");
assert.deepEqual(colorless.precon_cards.map((entry) => [entry.group, entry.product, entry.commander]), [["nativeExact", "Eldrazi Unbound", "Zhulodok, Void Gorger"]]);
assert.ok(!colorless.precon_cards.some((entry) => entry.product === "Eldrazi Incursion"));

assert.equal(vm595.current_production_baseline_sha, checkpoint.baseline_sha);
assert.equal(vm595.rendered_evidence_baseline_sha, checkpoint.baseline_sha);
assert.equal(vm595.rendered_evidence_path, checkpoint.vm_595_evidence);
assert.equal(vm595.population.prose_unit_count, checkpoint.vm_595.enriched_final.prose_unit_count);
assert.equal(vm595.population.sentence_count, checkpoint.vm_595.enriched_final.sentence_count);
assert.equal(vm595.population.word_count, checkpoint.vm_595.enriched_final.word_count);
for (const [metric, expected] of Object.entries(checkpoint.vm_595.enriched_final)) {
  if (["method", "prose_unit_count", "sentence_count", "word_count"].includes(metric)) continue;
  assert.equal(vm595.quantitative.summary[metric], expected, `VM-595 ${metric} must match the checkpoint.`);
}
assert.deepEqual(checkpoint.vm_595.normalized_comparison.wave_09, checkpoint.vm_595.normalized_comparison.final, "normalized Wave 09 and final corpora must be apples-to-apples equal");
assert.ok(Object.values(checkpoint.vm_595.normalized_comparison.delta).every((value) => value === 0));
assert.equal(checkpoint.vm_595.candidate_dispositions.length, vm595.quantitative.summary.within_dossier_redundancy_candidate_count);
assert.deepEqual(checkpoint.vm_595.candidate_dispositions.map((entry) => [entry.identity_key, entry.similarity]), vm595.quantitative.within_dossier_redundancy_candidates.map((entry) => [entry.left.identity_key, entry.similarity]));
assert.deepEqual(checkpoint.vm_595.candidate_dispositions.map((entry) => entry.classification), ["accepted golden overlap", "accepted golden overlap", "intentional information reuse"]);
assert.equal(checkpoint.vm_595.unresolved_semantic_redundancy_count, 0);
assert.equal(checkpoint.vm_595.deferred_candidate_count, 0);

const dimirContract = contracts.find((contract) => contract.identity_key === "UB");
const dimirDesktop = collection.desktop.find((record) => record.identity_key === "UB");
const dimirMobile = collection.mobile.find((record) => record.identity_key === "UB");
assert.deepEqual(dimirDesktop.start_here_taxonomy, dimirContract.start_here_taxonomy);
assert.deepEqual(dimirDesktop.what_to_look_for_taxonomy, dimirContract.what_to_look_for_taxonomy);
assert.ok(dimirDesktop.sections.every((section) => section.present) && dimirMobile.sections.every((section) => section.present));
const dimirDebtOwnedDiff = execFileSync("git", ["diff", "--name-only", checkpoint.baseline_sha, "--", ...checkpoint.unrelated_non_sirf_test_debt.owned_paths_checked], { encoding: "utf8" }).trim();
assert.equal(dimirDebtOwnedDiff, "", "VM-610 must not own the historical Dimir Card Signal References assertion or its data/artifact inputs.");
assert.deepEqual(checkpoint.unrelated_non_sirf_test_debt.candidate_owned_path_diff, []);
assert.equal(checkpoint.unrelated_non_sirf_test_debt.dimir_rendered_contract, "PASS");
assert.equal(checkpoint.unrelated_non_sirf_test_debt.disposition, "RECORDED_UNRELATED_NON_SIRF_TEST_DEBT");
assert.deepEqual(checkpoint.owner_packet.unresolved_exceptions, []);
assert.match(checkpoint.owner_packet.final_launch_disposition, /^PASS/);
assert.equal(checkpoint.engine_reconciliation.pass_match, 36);
assert.equal(checkpoint.engine_reconciliation.no_result, 1);
assert.equal(checkpoint.engine_reconciliation.bounded_no_result_identity, "YORE");
assert.deepEqual(checkpoint.remaining_queued_identities, []);

console.log("SIRF final all-37 atlas checkpoint tests passed: 37 identities, 74 renders, 34 contracts, three goldens, and no remaining queue.");

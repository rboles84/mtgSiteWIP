import assert from "node:assert/strict";
import fs from "node:fs";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));

const expectedIdentityKeys = [
  "W", "U", "B", "R", "G",
  "WU", "WR", "BR", "BG", "RG", "UB", "UR", "WB", "WG", "UG",
  "LOREHOLD", "PRISMARI", "QUANDRIX", "SILVERQUILL", "WITHERBLOOM",
  "BANT", "ESPER", "GRIXIS", "JUND", "NAYA",
  "ABZAN", "JESKAI", "MARDU", "SULTAI", "TEMUR",
  "DUNE", "GLINT", "INK", "WITCH", "YORE", "COLORLESS", "WUBRG",
];

const expectedAcceptedContractKeys = [
  "W", "U", "B", "R", "G",
  "WU", "WR", "BR", "BG", "RG", "UB", "UR", "WB", "WG", "UG",
  "PRISMARI", "QUANDRIX", "SILVERQUILL", "WITHERBLOOM",
  "BANT", "ESPER", "GRIXIS", "JUND", "NAYA",
  "ABZAN", "JESKAI", "MARDU", "SULTAI",
];

const checkpoint = readJson("docs/sirf/checkpoints/2026-08-30-post-wave-07-all-37-rendered-checkpoint.json");
const renderedCollection = readJson(checkpoint.rendered_collection);
const currentState = readJson("docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/manifest.json");
const vm595 = checkpoint.vm_595;
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const providerValidation = readJson("data/placement/commander-provider-validation.json");

assert.equal(checkpoint.checkpoint_phase, "POST_WAVE_07");
assert.equal(checkpoint.identity_count, 37);
assert.equal(checkpoint.rendered_record_count, 74);
assert.equal(checkpoint.screenshot_count, 74);
assert.equal(checkpoint.accepted_contract_count, 28);
assert.equal(renderedCollection.views.length, 74);
assert.deepEqual(checkpoint.records.map((record) => record.identity_key), expectedIdentityKeys);
assert.deepEqual(
  checkpoint.scoped_sections,
  ["Start Here", "Test the Fit", "How This Plays", "Precon Starting Points", "What to Look For"],
);
assert.equal(checkpoint.owner_supplied_correction.classification, "OWNER_SUPPLIED_AUTHORED_SOURCE_CORRECTION");
assert.equal(checkpoint.owner_supplied_correction.authored_source, "data/precons/vox-mana-precons.source.json");
assert.equal(checkpoint.owner_supplied_correction.product, "Turtle Power!");
assert.equal(checkpoint.owner_supplied_correction.main_commander, "Leonardo, the Balance");
assert.deepEqual(checkpoint.owner_supplied_correction.alternate_commanders, ["Heroes in a Half Shell"]);
assert.equal(checkpoint.owner_supplied_correction.producer_path_result, "PASS");

for (const record of checkpoint.records) {
  const desktopView = renderedCollection.views.find((view) => view.identity_key === record.identity_key && view.view === "desktop");
  const mobileView = renderedCollection.views.find((view) => view.identity_key === record.identity_key && view.view === "mobile");
  assert.ok(desktopView && mobileView, `${record.identity_key} must have fresh desktop and mobile rendered evidence.`);
  assert.ok(record.taxonomy.length >= 3, `${record.identity_key} must expose a rendered taxonomy.`);
  assert.ok(record.desktop_capture.width <= 1280, `${record.identity_key} desktop capture must not overflow its viewport.`);
  assert.ok(record.mobile_capture.width <= 375, `${record.identity_key} mobile capture must not overflow its viewport.`);
  assert.ok(record.desktop_capture.height > 0 && record.mobile_capture.height > 0, `${record.identity_key} captures must be non-empty.`);
  for (const group of ["native", "exact", "stretch"]) {
    assert.ok(Number.isInteger(record.precon_groups[group]) && record.precon_groups[group] >= 0, `${record.identity_key} ${group} count must be valid.`);
  }
  assert.deepEqual(desktopView.precon_groups, record.precon_groups, `${record.identity_key} checkpoint groups must match the fresh desktop render.`);
  assert.deepEqual(mobileView.precon_groups, record.precon_groups, `${record.identity_key} checkpoint groups must match the fresh mobile render.`);
  assert.deepEqual(mobileView.precon_products, desktopView.precon_products, `${record.identity_key} product names and lanes must match across viewports.`);
  assert.deepEqual(desktopView.duplicate_product_names, [], `${record.identity_key} desktop render must not duplicate a precon product.`);
  assert.deepEqual(mobileView.duplicate_product_names, [], `${record.identity_key} mobile render must not duplicate a precon product.`);
  assert.equal(desktopView.horizontal_overflow, false, `${record.identity_key} desktop render must not overflow.`);
  assert.equal(mobileView.horizontal_overflow, false, `${record.identity_key} mobile render must not overflow.`);
  assert.ok(desktopView.sections.every((section) => section.present) && mobileView.sections.every((section) => section.present), `${record.identity_key} must render all five scoped sections at both widths.`);
}

const contractFiles = fs.readdirSync("docs/sirf/contracts").filter((file) => file.endsWith(".json")).sort();
const acceptedContracts = contractFiles
  .map((file) => readJson(`docs/sirf/contracts/${file}`))
  .filter((contract) => expectedAcceptedContractKeys.includes(contract.identity_key));
assert.equal(acceptedContracts.length, 28, "checkpoint must validate every promoted SIRF contract");
assert.deepEqual(acceptedContracts.map((contract) => contract.identity_key).sort(), [...expectedAcceptedContractKeys].sort());

for (const contract of acceptedContracts) {
  const rendered = checkpoint.records.find((record) => record.identity_key === contract.identity_key);
  assert.equal(contract.schema_version, "sirf-v0.2-contract-v1");
  assert.equal(contract.status, "ACCEPTED");
  assert.ok(rendered, `${contract.identity_key} must exist in the 37/37 rendered checkpoint.`);
  assert.deepEqual(contract.start_here_taxonomy, contract.what_to_look_for_taxonomy, `${contract.identity_key} accepted taxonomy sets must be equal.`);
  assert.deepEqual(rendered.taxonomy, contract.start_here_taxonomy, `${contract.identity_key} rendered taxonomy must equal its accepted contract.`);
  assert.equal(rendered.precon_groups.native, contract.precon_contract.native.length, `${contract.identity_key} rendered Native count must equal its contract.`);
  assert.ok(rendered.precon_groups.exact >= contract.precon_contract.exact_color_required.length, `${contract.identity_key} must render every required Exact-color product.`);
  const renderedProducts = renderedCollection.views.find((view) => view.identity_key === contract.identity_key && view.view === "desktop").precon_products;
  assert.deepEqual([...renderedProducts.native].sort(), [...contract.precon_contract.native].sort(), `${contract.identity_key} rendered Native product set must equal its contract.`);
  for (const required of contract.precon_contract.exact_color_required) {
    assert.ok(renderedProducts.exact.includes(required), `${contract.identity_key} required Exact product must survive the final composer: ${required}`);
  }
  if (contract.precon_contract.stretch_allowed) {
    assert.ok(rendered.precon_groups.stretch > 0, `${contract.identity_key} must retain a Stretch lane.`);
  }
}

assert.equal(checkpoint.status, "PASS", "checkpoint may only pass after every accepted rendered contract passes");

assert.equal(currentState.exact_product_baseline_sha, checkpoint.baseline_sha);
assert.equal(currentState.identity_authority.actual_count, 37);
assert.deepEqual(currentState.identity_authority.ordered_keys, expectedIdentityKeys);
assert.equal(currentState.dossier.counts.collected, 37);
assert.equal(currentState.dossier.counts.screenshots, 37);
assert.equal(currentState.dossier.counts.blocker, 0);
assert.equal(currentState.dossier.counts.major, 0);
assert.equal(currentState.engine.counts.pass_match, 36);
assert.equal(currentState.engine.counts.no_result, 1);
assert.equal(currentState.engine.counts.mismatch, 0);
assert.equal(currentState.engine.counts.engine_error, 0);
assert.equal(currentState.engine.witness_inventory.intentional_bounded_witnesses, 1);
assert.deepEqual(currentState.repository_state.expected_product_runtime_diff, [
  "assets/js/archscry/runtime/content.js",
  "assets/js/archscry/runtime/dossier-view.js",
]);
assert.deepEqual(currentState.repository_state.product_runtime_diff_from_baseline, currentState.repository_state.expected_product_runtime_diff);

assert.equal(vm595.baseline_sha, checkpoint.baseline_sha);
assert.equal(vm595.prose_unit_count, 1383);
assert.equal(vm595.sentence_count, 1642);
assert.equal(vm595.word_count, 26736);
assert.equal(vm595.exact_cross_identity_duplicate_group_count, 53);
assert.equal(vm595.exact_cross_identity_duplicate_occurrence_count, 702);
assert.equal(vm595.substitution_normalized_duplicate_group_count, 17);
assert.equal(vm595.within_dossier_redundancy_candidate_count, 8);

const turtleSource = preconSource.precons.find((precon) => precon.deckName === "Turtle Power!");
const turtleCatalog = preconCatalog.precons.find((precon) => precon.deckName === "Turtle Power!");
assert.equal(turtleSource?.mainCommander, "Leonardo, the Balance");
assert.deepEqual(turtleSource?.secondaryCommanders, ["Heroes in a Half Shell"]);
assert.equal(turtleCatalog?.mainCommander, "Leonardo, the Balance");
assert.deepEqual(turtleCatalog?.secondaryCommanders, ["Heroes in a Half Shell"]);
assert.ok(providerValidation.commanders["Leonardo, the Balance"]?.links?.length === 1);
assert.equal(providerValidation.commanders["Heroes in a Half Shell"], undefined, "alternate commander must not occupy the face-commander provider matrix");

console.log("SIRF post-Wave 07 all-37 checkpoint tests passed: 37 identities, 74 renders, 28 accepted contracts, and bounded Yore NO_RESULT.");

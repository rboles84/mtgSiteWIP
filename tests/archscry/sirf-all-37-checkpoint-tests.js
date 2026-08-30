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
  "W", "U", "B", "R", "G", "WU", "WR", "BR", "BG", "RG", "UB", "UR", "WB", "WG", "UG", "ESPER",
];

const checkpoint = readJson("docs/sirf/checkpoints/2026-08-30-all-37-rendered-checkpoint.json");
const currentState = readJson("docs/audits/sirf-all-37-checkpoint-2026-08-30/manifest.json");
const vm595 = readJson("docs/research/placement-language-trust-audit.json");
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const providerValidation = readJson("data/placement/commander-provider-validation.json");

assert.equal(checkpoint.status, "PASS");
assert.equal(checkpoint.identity_count, 37);
assert.equal(checkpoint.rendered_record_count, 74);
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
  assert.ok(record.taxonomy.length >= 3, `${record.identity_key} must expose a rendered taxonomy.`);
  assert.ok(record.desktop_capture.width <= 1280, `${record.identity_key} desktop capture must not overflow its viewport.`);
  assert.ok(record.mobile_capture.width <= 375, `${record.identity_key} mobile capture must not overflow its viewport.`);
  assert.ok(record.desktop_capture.height > 0 && record.mobile_capture.height > 0, `${record.identity_key} captures must be non-empty.`);
  for (const group of ["native", "exact", "stretch"]) {
    assert.ok(Number.isInteger(record.precon_groups[group]) && record.precon_groups[group] >= 0, `${record.identity_key} ${group} count must be valid.`);
  }
}

const contractFiles = fs.readdirSync("docs/sirf/contracts").filter((file) => file.endsWith(".json")).sort();
const acceptedContracts = contractFiles.map((file) => readJson(`docs/sirf/contracts/${file}`));
assert.equal(acceptedContracts.length, 16, "checkpoint must validate every promoted SIRF contract");
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
  if (contract.precon_contract.stretch_allowed) {
    assert.ok(rendered.precon_groups.stretch > 0, `${contract.identity_key} must retain a Stretch lane.`);
  }
}

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
assert.deepEqual(currentState.repository_state.product_runtime_diff_from_baseline, []);

assert.equal(vm595.current_production_baseline_sha, checkpoint.baseline_sha);
assert.equal(vm595.rendered_evidence_baseline_sha, checkpoint.baseline_sha);
assert.equal(vm595.population.expected_identities, 37);
assert.equal(vm595.population.analyzed_identities, 37);
assert.equal(vm595.population.prose_unit_count, 1376);
assert.equal(vm595.population.sentence_count, 1653);
assert.equal(vm595.population.word_count, 26644);
assert.equal(vm595.quantitative.summary.exact_cross_identity_duplicate_group_count, 57);
assert.equal(vm595.quantitative.summary.exact_cross_identity_duplicate_occurrence_count, 724);
assert.equal(vm595.quantitative.summary.substitution_normalized_duplicate_group_count, 17);
assert.equal(vm595.quantitative.summary.within_dossier_redundancy_candidate_count, 11);

const turtleSource = preconSource.precons.find((precon) => precon.deckName === "Turtle Power!");
const turtleCatalog = preconCatalog.precons.find((precon) => precon.deckName === "Turtle Power!");
assert.equal(turtleSource?.mainCommander, "Leonardo, the Balance");
assert.deepEqual(turtleSource?.secondaryCommanders, ["Heroes in a Half Shell"]);
assert.equal(turtleCatalog?.mainCommander, "Leonardo, the Balance");
assert.deepEqual(turtleCatalog?.secondaryCommanders, ["Heroes in a Half Shell"]);
assert.ok(providerValidation.commanders["Leonardo, the Balance"]?.links?.length === 1);
assert.equal(providerValidation.commanders["Heroes in a Half Shell"], undefined, "alternate commander must not occupy the face-commander provider matrix");

console.log("SIRF all-37 checkpoint tests passed: 37 identities, 74 renders, 16 accepted contracts, and bounded Yore NO_RESULT.");

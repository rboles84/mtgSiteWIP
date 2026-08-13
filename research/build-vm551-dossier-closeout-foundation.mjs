import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "docs", "audits", "vm551-all-37-dossier-closeout");
const JSON_PATH = path.join(OUT_DIR, "surface-completion-matrix.json");
const TSV_PATH = path.join(OUT_DIR, "surface-completion-matrix.tsv");
const CHECK = process.argv.includes("--check");

const SURFACES = Object.freeze([
  "placement_witness_or_bounded_state",
  "why_this_fit",
  "test_the_fit",
  "nearby_comparison",
  "how_this_plays",
  "cards_that_sound_like_this",
  "why_these_cards_echo",
  "precon_starting_points",
  "browse_builds_provider",
  "what_to_look_for",
  "card_signal_references",
  "start_here_glossary",
  "mana_notes",
  "maze_paths",
  "modal_hover_behavior",
  "responsive_behavior",
  "copy_entity_casing_integrity",
]);

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(ROOT, relativePath), "utf8"));
}

function fail(reason) {
  return { status: "FAIL", evidence: [], reason };
}

function pass(evidence, reason) {
  return { status: "PASS", evidence, reason };
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function tsvCell(cell) {
  const evidence = cell.evidence.join(" | ");
  return `${cell.status}: ${cell.reason}${evidence ? ` [${evidence}]` : ""}`.replaceAll("\t", " ").replaceAll("\n", " ");
}

async function build() {
  const factions = (await readJson("data/factions.json")).factions;
  const identityLayers = (await readJson("data/identity-layers.json")).expressions;
  const rationaleAuthority = await readJson("data/dossier/card-rationale-relationships.source.json");
  const keys = Object.keys(identityLayers).filter((key) => identityLayers[key]?.active !== false);
  assert.equal(keys.length, 37, "The completion matrix requires exactly 37 active identities.");

  const identities = keys.map((identityKey) => {
    const cells = Object.fromEntries(SURFACES.map((surface) => [
      surface,
      fail("Not yet certified by the VM-551 all-37 closeout program."),
    ]));
    const coverage = rationaleAuthority.coverage_adjudication?.[identityKey];
    if (coverage?.classification === "Full" && coverage?.meaningful_unresolved_defect === false) {
      cells.why_these_cards_echo = pass(
        [coverage.decision_locator, ...coverage.approved_relationship_ids],
        "Existing owner-approved rationale authority is useful and records no meaningful unresolved defect."
      );
    }
    return {
      identity_key: identityKey,
      identity_name: factions[identityKey]?.name || identityLayers[identityKey]?.name || identityKey,
      cells,
    };
  });

  return {
    schema_version: "1.0.0",
    status_policy: "PASS requires exact evidence; NOT_APPLICABLE requires a product-contract reason; missing work is FAIL.",
    surfaces: SURFACES,
    identities,
  };
}

function validate(matrix) {
  assert.equal(matrix.identities.length, 37);
  assert.equal(new Set(matrix.identities.map((row) => row.identity_key)).size, 37);
  for (const row of matrix.identities) {
    assert.deepEqual(Object.keys(row.cells), [...SURFACES]);
    for (const [surface, cell] of Object.entries(row.cells)) {
      assert(["PASS", "NOT_APPLICABLE", "FAIL"].includes(cell.status), `${row.identity_key}/${surface} has an illegal status.`);
      assert(typeof cell.reason === "string" && cell.reason.trim(), `${row.identity_key}/${surface} requires a reason.`);
      assert(Array.isArray(cell.evidence), `${row.identity_key}/${surface} requires evidence locators.`);
      if (cell.status === "PASS") assert(cell.evidence.length > 0, `${row.identity_key}/${surface} cannot pass without evidence.`);
      if (cell.status === "NOT_APPLICABLE") assert(/product-contract/i.test(cell.reason), `${row.identity_key}/${surface} N/A needs a product-contract reason.`);
    }
  }
}

async function expectedOutputs() {
  const matrix = await build();
  validate(matrix);
  const header = ["identity_key", "identity_name", ...SURFACES].join("\t");
  const rows = matrix.identities.map((row) => [
    row.identity_key,
    row.identity_name,
    ...SURFACES.map((surface) => tsvCell(row.cells[surface])),
  ].join("\t"));
  return { json: stableJson(matrix), tsv: `${header}\n${rows.join("\n")}\n`, matrix };
}

const expected = await expectedOutputs();
if (CHECK) {
  assert.equal(await readFile(JSON_PATH, "utf8"), expected.json, "JSON completion matrix is stale.");
  assert.equal(await readFile(TSV_PATH, "utf8"), expected.tsv, "TSV completion matrix is stale.");
} else {
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(JSON_PATH, expected.json);
  await writeFile(TSV_PATH, expected.tsv);
}

const counts = Object.fromEntries(["PASS", "NOT_APPLICABLE", "FAIL"].map((status) => [
  status,
  expected.matrix.identities.flatMap((row) => Object.values(row.cells)).filter((cell) => cell.status === status).length,
]));
console.log(JSON.stringify({ status: "PASS", mode: CHECK ? "check" : "write", identities: 37, surfaces: SURFACES.length, cells: 37 * SURFACES.length, counts }, null, 2));

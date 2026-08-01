import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const read = (name) => fs.readFileSync(path.join(scriptDir, name), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { cell += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { row.push(cell); cell = ""; }
    else if (character === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

const contract = read("downstream-compatibility-contract.md");
const plan = read("bounded-mvp-repair-plan.md");
const requirements = parseCsv(read("requirements-traceability-matrix.csv"));
const consumers = parseCsv(read("result-field-consumer-map.csv"));
const criticalExtract = read("owner-review-critical-extract.md");

for (const phrase of [
  "changes public interpretation and rendering only",
  "accumulated identity scores",
  "Existing serialized field names and shapes remain stable",
  "New public state fields must be additive",
  "Authored Mana Alignment Matrix",
  "Placement-result mana alignment payload",
  "Gate A implementation planning is prohibited",
  "UNRESOLVED-BLOCKER",
  "Legacy missing confidence remains unknown",
]) assert(contract.includes(phrase), `Compatibility contract missing: ${phrase}`);

for (const phrase of [
  "public numeric confidence",
  "preserve accumulated scores",
  "serialized field names/shapes",
  "New public states are additive",
  "result-field-consumer-map.csv",
  "No destructive removal or rename belongs in Gate A",
]) assert(plan.includes(phrase), `Bounded plan missing: ${phrase}`);

const gateA = requirements.filter((row) => row.gate === "Gate A");
assert(gateA.length === 5, `Gate A count changed: ${gateA.length}`);
const reqA2 = requirements.find((row) => row.requirement_id === "REQ-A-002");
assert(reqA2, "REQ-A-002 missing");
for (const phrase of [
  "public numeric confidence",
  "preserve internal scores",
  "serialized field names/shapes",
  "cache/profile/saved/legacy/OAuth/dossier/recommendation/deck-link/adjacent/Maze consumers",
  "authored Matrix values",
  "additive bounded public result states",
  "consumer map is independently reviewed",
]) assert(reqA2.requirement.includes(phrase), `REQ-A-002 requirement missing: ${phrase}`);
for (const phrase of [
  "Compatibility validator",
  "field-shape",
  "cache/profile/OAuth round trips",
  "saved legacy reading",
  "authored Matrix",
  "placement-result mana alignment",
  "Maze handoff",
  "return-to-dossier",
  "no fabricated numeric fallback",
  "no public numeric confidence output",
]) assert(reqA2.validation.includes(phrase), `REQ-A-002 validation missing: ${phrase}`);

const requiredColumns = [
  "field_or_family", "canonical_writer", "additional_writers", "computation_source", "semantic_role",
  "serialized_location", "normalizers", "cache_consumers", "saved_profile_consumers", "legacy_consumers",
  "ranking_consumers", "stopping_consumers", "dossier_consumers", "presentation_consumers", "graph_or_matrix_consumers",
  "recommendation_consumers", "deck_link_consumers", "adjacent_view_consumers", "maze_handoff_consumers", "test_consumers",
  "gate_a_public_treatment", "gate_a_internal_treatment", "compatibility_rule", "migration_required", "evidence_paths",
  "unresolved_consumer_risk", "compatibility_disposition",
];
for (const column of requiredColumns) assert(consumers.every((row) => Object.prototype.hasOwnProperty.call(row, column)), `Consumer map column missing: ${column}`);

const requiredFamilies = [
  "identity_scores", "softmax_share_probability", "confidence", "confidence_gap", "mana_scores",
  "decree", "color_weights", "authored_preview_scores", "authored_matrix_component_averages", "top_matches", "adjacent_matches",
  "primary_identity_id_name", "result_status", "evidence_trail", "stage_trail", "selected_answers",
  "question_ids", "answer_ids", "model_version", "result_schema_version", "source_evidence_version", "source_mode",
  "session_cache", "profile_persistence", "saved_reading", "legacy_result_normalization", "oauth_return_state",
  "recommendation_context", "deck_link_context", "matrix_radar_input", "placement_result_mana_alignment",
  "maze_placement_context", "return_to_dossier_context",
];
const familySet = new Set(consumers.map((row) => row.field_or_family));
for (const family of requiredFamilies) assert(familySet.has(family), `Consumer map family missing: ${family}`);
assert(consumers.length === 37, `Consumer map must contain 37 material field records: ${consumers.length}`);

const consumerFor = (family) => consumers.find((row) => row.field_or_family === family);
const decree = consumerFor("decree");
for (const [column, phrase] of [
  ["canonical_writer", "buildAdaptiveDecree"],
  ["additional_writers", "buildQuickDecree"],
  ["additional_writers", "guild-recruiter/index.ts"],
  ["normalizers", "normalizePlacementResult"],
  ["saved_profile_consumers", "profiles.decree"],
  ["dossier_consumers", "decreeCopy"],
  ["presentation_consumers", "result reveal"],
  ["maze_handoff_consumers", "Maze handoff"],
]) assert(decree?.[column]?.includes(phrase), `Decree consumer chain missing ${column}: ${phrase}`);
assert(decree.cache_consumers.includes("vm_saveWithGoogle()"), "Decree cache/OAuth chain missing vm_saveWithGoogle()");
assert(decree.cache_consumers.includes("vm_checkPendingSave()"), "Decree cache/OAuth chain missing vm_checkPendingSave()");
assert(!/vm_beginGoogleSave|vm_finishPendingSave/.test(JSON.stringify(decree)), "Decree row retains nonexistent save-function references");
assert(decree.dossier_consumers.includes("no current dossier text export or audit consumption located"), "Decree dossier scope overstates text/export/audit consumption");
assert(decree.presentation_consumers.includes("no current dossier decreeCopy presentation located"), "Decree presentation scope must distinguish object carry-through from rendering");
assert(decree.gate_a_public_treatment && decree.gate_a_internal_treatment, "Decree Gate A treatments must be explicit");
assert(decree.compatibility_disposition === "PRESERVE-UNCHANGED", "Decree must preserve its existing field and shape");

const colorWeights = consumerFor("color_weights");
assert(colorWeights.canonical_writer === "NONE-IN-CURRENT-LOCAL-QUICK-PATH", "color_weights must record no current local quick-path writer");
assert(colorWeights.additional_writers.includes("EXTERNAL-OR-ARCHIVED-PRODUCER-UNRESOLVED"), "color_weights unresolved producer status missing");
assert(colorWeights.normalizers.includes("normalizePlacementResult"), "color_weights normalizer missing");
assert(colorWeights.gate_a_public_treatment.trim(), "color_weights public treatment must be independently nonempty");
assert(colorWeights.gate_a_internal_treatment.trim(), "color_weights internal treatment must be independently nonempty");
assert(/Do not fabricate|without manufacturing a default/.test(`${colorWeights.gate_a_public_treatment} ${colorWeights.gate_a_internal_treatment}`), "color_weights non-fabrication treatment missing");
assert(colorWeights.compatibility_disposition === "PRESERVE-UNCHANGED", "color_weights must preserve supplied optional values");

const authoredPreview = consumerFor("authored_preview_scores");
assert(authoredPreview.canonical_writer === "data/identity-layers.json:expressions.*.preview_scores", "authored_preview_scores canonical source direction is wrong");
assert(authoredPreview.additional_writers.includes("research/build-faction-artifacts.mjs:readJson(identityLayersPath)"), "authored preview downstream builder/propagator missing");
assert(!authoredPreview.canonical_writer.includes("build-faction-artifacts"), "Faction builder must not be identified as the authored preview canonical writer");
assert(authoredPreview.evidence_paths.includes("data/identity-layers.json:expressions.*.preview_scores"), "Authored preview source evidence is not resolvable");

for (const family of ["decree", "color_weights", "authored_preview_scores"]) {
  assert(criticalExtract.includes(`### ${family}`), `Owner critical extract missing complete consumer record: ${family}`);
}
assert(criticalExtract.includes('"canonical_writer": "data/identity-layers.json:expressions.*.preview_scores"'), "Owner critical extract does not preserve authored preview canonical source direction");
assert(criticalExtract.includes("research/build-faction-artifacts.mjs:readJson(identityLayersPath)"), "Owner critical extract does not identify the faction builder as downstream reader/propagator");

const allowed = new Set(["PRESERVE-UNCHANGED", "PRESERVE-INTERNAL-HIDE-PUBLICLY", "ADDITIVE-EXTENSION", "VERSIONED-MIGRATION-LATER", "UNRESOLVED-BLOCKER"]);
assert(consumers.every((row) => allowed.has(row.compatibility_disposition)), "Invalid compatibility disposition");
assert(consumers.every((row) => row.evidence_paths && row.unresolved_consumer_risk), "Consumer evidence or unresolved-risk field blank");

const requiredConsumerColumns = ["cache_consumers", "saved_profile_consumers", "legacy_consumers", "dossier_consumers", "recommendation_consumers", "deck_link_consumers", "adjacent_view_consumers", "maze_handoff_consumers"];
for (const column of requiredConsumerColumns) assert(consumers.some((row) => row[column] && row[column] !== "None"), `Consumer category not addressed: ${column}`);
assert(familySet.has("matrix_radar_input") && familySet.has("placement_result_mana_alignment"), "Both Matrix numeric paths are required");

const controllingNarratives = [
  "VM-551-full-placement-system-audit.md",
  "placement-system-architecture-map.md",
  "requirements-specification.md",
  "bounded-mvp-repair-plan.md",
  "README.md",
];
for (const name of controllingNarratives) {
  const text = read(name);
  assert(text.includes("downstream-compatibility-contract.md"), `Narrative lacks compatibility authority: ${name}`);
  assert(!/Gate A\s+(?:removes?|deletes?|renames?)\s+(?:internal scores|existing serialized fields|mana_scores)/i.test(text), `Narrative contradicts additive Gate A boundary: ${name}`);
}

const allChangedDocs = fs.existsSync(path.join(repoRoot, ".git"));
assert(allChangedDocs, "Repository root could not be resolved");

console.log(JSON.stringify({
  result: "PASS",
  gate_a_requirements: gateA.length,
  result_field_rows: consumers.length,
  matrix_paths: ["authored_preview_or_component_average", "placement_result_mana_scores_to_dossier_manaAlignment"],
  compatibility_dispositions: Object.fromEntries([...allowed].map((value) => [value, consumers.filter((row) => row.compatibility_disposition === value).length])),
  production_behavior_inspected_or_changed: false,
}, null, 2));

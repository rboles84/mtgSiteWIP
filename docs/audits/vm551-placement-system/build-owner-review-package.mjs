import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const rejectedCandidate = "bc2b5a764569ab79fae04b72695097cafc6bd4e8";
const workflowStart = "dbf67b97515550b0ceac2bf711facacd7acc0701";

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

const readText = (name) => fs.readFileSync(path.join(scriptDir, name), "utf8");
const readCsv = (name) => parseCsv(readText(name));
const readJson = (name) => JSON.parse(readText(name));
const hash = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");

function startingBuffer(relativePath) {
  const result = spawnSync("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "show", `${workflowStart}:${relativePath}`], { cwd: repoRoot, encoding: null });
  if (result.status !== 0) return null;
  return result.stdout;
}

function rowCount(name, parsed) {
  if (name.endsWith(".csv")) return `${parsed.length} data rows`;
  if (name.endsWith(".md")) return `${String(parsed).split(/\r?\n/).length} lines`;
  if (Array.isArray(parsed)) return `${parsed.length} records`;
  if (name === "audit-input-manifest.json") return `1 manifest; ${parsed.runtime_inputs.length} runtime inputs; ${parsed.preserved_artifacts.length} preserved artifacts`;
  if (name === "question-disposition-summary.json") return `${parsed.question_total} questions; ${parsed.answer_total} answers`;
  if (name === "sensitivity-dependency-collision-analysis.json") return `${parsed.terminal_paths} terminal paths; ${parsed.matched_one_answer_terminal_pairs} matched comparisons; ${parsed.non_monotonic_support_observations.length} non-monotonic rows`;
  if (name === "remediation-analysis-summary.json") return `1 summary; ${parsed.preserved_counts.identities} identities; ${parsed.preserved_counts.questions} questions; ${parsed.preserved_counts.answers} answers`;
  return `${Object.keys(parsed).length} top-level fields`;
}

const manifestSpecs = [
  ["audit-input-manifest.json", "Immutable input authority, hashes, and preserved-artifact pins", "Pins inputs; does not validate semantic correctness."],
  ["cecos-conclusion-adjudication.csv", "Major-conclusion classification under exact CECOS draft.4", "Classification is audit adjudication, not implementation approval."],
  ["question-quality-adjudication.csv", "Complete 113-question quality dispositions", "Deterministic documentation review; no player-response validation."],
  ["answer-quality-adjudication.csv", "Complete 356-answer quality dispositions", "Most answer IDs/provenance are absent in production source."],
  ["question-disposition-summary.json", "Reconciled question/answer totals and risk counts", "Summarizes the detailed adjudication; does not replace it."],
  ["identity-distinctiveness-matrix.csv", "All-37 distinctiveness, opportunity, boundary, and evidence status", "Mechanical/lexical audit only; no empirical confusion rates."],
  ["profile-scenario-matrix.csv", "All-37 profile scoring outputs, origins, and completeness", "All probes are golden-path-derived and incomplete."],
  ["profile-scenario-details.json", "Full exact-answer and rendered-output profile records", "Target-seeking reachability evidence, not independent profiles."],
  ["adversarial-scenario-matrix.csv", "Nine representational stress tests with reconciled dispositions", "Synthetic audit cases, not player prevalence or accuracy evidence."],
  ["sensitivity-dependency-collision-analysis.json", "Terminal-path sensitivity, ties, dependencies, dead coverage, and collisions", "Combinatorial frequencies are not empirical player frequencies."],
  ["repeated-signal-dependency-audit.csv", "Eleven repeated-construct/dependency groups", "Potential double-count; no empirical statistical correlation is claimed."],
  ["evidence-integration-matrix.csv", "Permitted roles for ten evidence families across fourteen product uses", "Role classification requires owner/independent review before implementation."],
  ["explanation-trace-audit.json", "Representative answer-to-output explanation traces", "Representative traces are not exhaustive player-path validation."],
  ["defect-register-remediated.csv", "Authoritative 40-defect register with reproduction and traceability", "Severity is audit judgment; no fix is authorized."],
  ["requirements-traceability-matrix.csv", "Authoritative finding-to-risk-to-requirement-to-validation Gate map", "Implementation boundary only; no implementation authorization."],
  ["remediation-analysis-summary.json", "Reconciled quantitative audit summary", "Summary must be read with detailed sources and limitations."],
  ["downstream-compatibility-contract.md", "Controlling Gate A public/internal compatibility and planning boundary", "Documentation contract only; no implementation or migration is authorized."],
  ["result-field-consumer-map.csv", "Field-level writer/reader, persistence, rendering, and handoff compatibility inventory", "Static local inspection; unresolved indirect or external consumers remain explicitly marked."],
];

const manifestRows = manifestSpecs.map(([name, purpose, limitation]) => {
  const relativePath = `docs/audits/vm551-placement-system/${name}`;
  const fileBuffer = fs.readFileSync(path.join(scriptDir, name));
  const parsed = name.endsWith(".csv")
    ? parseCsv(fileBuffer.toString("utf8"))
    : name.endsWith(".json")
      ? JSON.parse(fileBuffer.toString("utf8"))
      : fileBuffer.toString("utf8");
  const priorBuffer = startingBuffer(relativePath);
  return {
    relativePath,
    size: fileBuffer.length,
    sha256: hash(fileBuffer),
    count: rowCount(name, parsed),
    purpose,
    limitation,
    reconciliation: priorBuffer === null ? "ADDED" : hash(fileBuffer) === hash(priorBuffer) ? "UNCHANGED" : "MODIFIED",
  };
});

const escapeTable = (value) => String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const manifest = [
  "# VM-551 Owner-Review Evidence Manifest",
  "",
  `Exact independently rejected audit-content candidate reconciled: \`${rejectedCandidate}\`.`,
  "",
  `Exact workflow-record starting HEAD: \`${workflowStart}\`.`,
  "",
  "The compatibility-reconciliation content SHA is necessarily assigned after this file is written; the dated reconciliation handoff and final response record that exact SHA. Hashes below cover the exact files in the reconciliation worktree and are validated before commit.",
  "",
  "This manifest identifies the bounded owner-review evidence package. It does not duplicate, replace, or upgrade the authority of the listed artifacts.",
  "",
  "| Relative path | Bytes | SHA-256 | Rows / records | Controlling purpose | Known limitation | Reconciliation state |",
  "|---|---:|---|---|---|---|---|",
  ...manifestRows.map((row) => `| ${escapeTable(row.relativePath)} | ${row.size} | \`${row.sha256}\` | ${escapeTable(row.count)} | ${escapeTable(row.purpose)} | ${escapeTable(row.limitation)} | ${row.reconciliation} |`),
  "",
  "Boundary precedence: `bounded-mvp-repair-plan.md` and `requirements-traceability-matrix.csv` govern Gate A/B1/B2. Narrative summaries must agree with them.",
  "",
  "No production implementation, merge, push, deployment, integration, or certification is authorized by this package.",
  "",
].join("\n");

function decodeCell(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try { return JSON.parse(trimmed); } catch { return value; }
  }
  return value;
}

function decodedRecord(row) {
  return Object.fromEntries(Object.entries(row).map(([key, value]) => [key, decodeCell(value)]));
}

function recordBlock(title, row) {
  return [`### ${title}`, "", "```json", JSON.stringify(decodedRecord(row), null, 2), "```", ""].join("\n");
}

const questions = readCsv("question-quality-adjudication.csv");
const identities = readCsv("identity-distinctiveness-matrix.csv");
const profiles = readCsv("profile-scenario-matrix.csv");
const adversarial = readCsv("adversarial-scenario-matrix.csv");
const repeated = readCsv("repeated-signal-dependency-audit.csv");
const defects = readCsv("defect-register-remediated.csv");
const requirements = readCsv("requirements-traceability-matrix.csv");
const consumers = readCsv("result-field-consumer-map.csv");
const sensitivity = readJson("sensitivity-dependency-collision-analysis.json");
const consumerDispositionCounts = Object.fromEntries([...new Set(consumers.map((row) => row.compatibility_disposition))].sort().map((value) => [value, consumers.filter((row) => row.compatibility_disposition === value).length]));
const criticalConsumerKeys = new Set(["decree", "color_weights", "authored_preview_scores"]);
const criticalConsumers = consumers.filter((row) => criticalConsumerKeys.has(row.field_or_family));

const selectedQuestions = new Map();
const addQuestion = (row) => selectedQuestions.set(row.question_id, row);
questions.filter((row) => ["KEEP", "KEEP-BUT-REWORD", "NEEDS-EVIDENCE"].includes(row.final_disposition)).forEach(addQuestion);
questions.filter((row) => row.phase === "gate").forEach(addQuestion);
for (const [phase, disposition] of [["hall", "RETUNE"], ["hall", "REPLACE"], ["crucible", "RETUNE"], ["crucible", "REPLACE"]]) {
  questions.filter((row) => row.phase === phase && row.final_disposition === disposition).slice(0, 5).forEach(addQuestion);
}

const identityKeys = new Set([
  "BANT", "GRIXIS", "SULTAI", "TEMUR", "COLORLESS", "ESPER", "INK", "JESKAI", "LOREHOLD", "UR", "YORE",
  "PRISMARI", "BG", "WITHERBLOOM", "WR", "UG", "QUANDRIX", "WB", "SILVERQUILL",
  "GLINT", "DUNE", "WITCH", "WUBRG",
]);
const selectedIdentities = identities.filter((row) => identityKeys.has(row.identity));
const representativeProfileKeys = new Set(["U", "UR", "PRISMARI", "BANT", "YORE"]);
const representativeProfiles = profiles.filter((row) => representativeProfileKeys.has(row.expected_identity));
const materiallyChallengedProfiles = profiles.filter((row) => !String(row.neighboring_challenge_status).startsWith("INCOMPLETE") && !String(row.mixed_or_uncertain_challenge_status).startsWith("INCOMPLETE"));
const selectedDefectIds = new Set(["VM551-D001", "VM551-D002", "VM551-D003", "VM551-D004", "VM551-D035", "VM551-D036", "VM551-D038", "VM551-D039", "VM551-D040"]);
const selectedDefects = defects.filter((row) => selectedDefectIds.has(row.defect_id));
const selectedRequirements = requirements.filter((row) => ["Gate A", "Gate B1"].includes(row.gate));

const familyCategoryRows = Object.entries(sensitivity.different_family_flip_categories).map(([category, count]) => `| ${escapeTable(category)} | ${count} |`).join("\n");
const nonMonotonicRows = sensitivity.non_monotonic_support_observations.map((row) => `| ${row.question_id} | ${row.answer_index + 1} | ${row.identity} | ${row.observations} | ${row.probability_worsened} | ${row.rank_worsened} |`).join("\n");

const extract = [
  "# VM-551 Owner-Review Critical Extract",
  "",
  "This bounded extract reproduces selected complete records from the authoritative machine artifacts for human inspection. The source CSV/JSON files remain authoritative; this file does not replace them or introduce new severity analysis.",
  "",
  `Reconciled extract counts: question records ${selectedQuestions.size}; identity records ${selectedIdentities.length}; representative profiles ${representativeProfiles.length}; materially challenging profiles ${materiallyChallengedProfiles.length}; adversarial records ${adversarial.length}; representative flips ${sensitivity.representative_primary_flips.length}; different-family categories ${Object.keys(sensitivity.different_family_flip_categories).length}; repeated constructs ${repeated.length}; non-monotonic rows ${sensitivity.non_monotonic_support_observations.length}; defect records ${selectedDefects.length}; Gate A/B1 requirements ${selectedRequirements.length}.`,
  "",
  "## Gate A downstream compatibility",
  "",
  "`downstream-compatibility-contract.md` changes public interpretation/rendering only. It preserves internal scores/softmax/gaps and existing serialized fields for ranking, stopping, replay, storage, dossier, recommendation, deck-link, adjacent-view, Matrix, and Maze compatibility. Additive bounded result states are permitted only after independent consumer-map review; destructive field removal/rename is outside Gate A.",
  "",
  `Consumer-map records: ${consumers.length}. Compatibility dispositions: ${JSON.stringify(consumerDispositionCounts)}.`,
  "",
  "The authored Matrix path (`identity-layers.preview_scores` or `vm-radar.js` component averages) is an identity visualization. The separate placement-result path (`placementResult.mana_scores` -> dossier `manaAlignment`) is placement-derived, normalized, cached, serialized, and rendered. Neither is public confidence, and the two paths are not interchangeable.",
  "",
  "Gate A implementation planning is prohibited until the map is independently reviewed and no material field classified `UNRESOLVED-BLOCKER` enters planning. This extract does not replace the complete map.",
  "",
  "### Corrected field-level compatibility records",
  "",
  "These complete records expose the three independently reviewed correction surfaces. `result-field-consumer-map.csv` remains authoritative.",
  "",
  ...criticalConsumers.map((row) => recordBlock(`${row.field_or_family} — ${row.compatibility_disposition}`, row)),
  "## Question adjudication",
  "",
  "Selection includes every KEEP, KEEP-BUT-REWORD, and NEEDS-EVIDENCE row; all four Gate rows; and the first five source-order Hall RETUNE, Hall REPLACE, Crucible RETUNE, and Crucible REPLACE rows. No KEEP rows exist.",
  "",
  ...[...selectedQuestions.values()].map((row) => recordBlock(`${row.question_id} — ${row.final_disposition}`, row)),
  "## Identity distinctiveness",
  "",
  "Complete records cover the eleven owner-named risk identities, both members of every same-color guild/college pair (Izzet/Prismari, Golgari/Witherbloom, Boros/Lorehold, Simic/Quandrix, Orzhov/Silverquill), all five four-color identities, and WUBRG. `UR` is the canonical Izzet key.",
  "",
  ...selectedIdentities.map((row) => recordBlock(`${row.identity} — ${row.canonical_name}`, row)),
  "## Scenario review",
  "",
  "All 37 profile scenarios are `GOLDEN-PATH-DERIVED`: the generator calls `runAdaptiveGoldenPath` with the expected identity as target. None was independently selected, none includes a material neighboring/mixed challenge, all 37 score `EXACT-PRIMARY`, and all 37 have final review disposition `INCOMPLETE`.",
  "",
  "The five representative records below cover mono-color, guild, college, shard, and four-color structures. Profiles with a material neighboring/mixed challenge: none.",
  "",
  ...representativeProfiles.map((row) => recordBlock(`${row.expected_identity} — ${row.scoring_outcome} / ${row.final_disposition}`, row)),
  "### All nine adversarial records",
  "",
  ...adversarial.map((row) => recordBlock(`${row.scenario} — ${row.final_disposition}`, row)),
  "## Sensitivity and dependency",
  "",
  `Matched comparison definition: ${sensitivity.matched_one_answer_comparison_definition}`,
  "",
  `Denominator construction: ${sensitivity.denominator_construction}`,
  "",
  `Same later questions: ${sensitivity.compared_paths_have_same_later_questions}. Branching changes included: ${sensitivity.branching_changes_included}. ${sensitivity.branching_exclusion_reason}`,
  "",
  `Observed denominator: ${sensitivity.matched_one_answer_terminal_pairs}; primary flips: ${sensitivity.one_answer_primary_flips}; different-family flips: ${sensitivity.one_answer_primary_to_different_family_flips}.`,
  "",
  "### Five representative primary flips",
  "",
  ...sensitivity.representative_primary_flips.map((row, index) => recordBlock(`Flip ${index + 1}: ${row.left_primary} → ${row.right_primary}`, row)),
  "### Complete different-family flip categories",
  "",
  "| Family transition | Count |",
  "|---|---:|",
  familyCategoryRows,
  "",
  "### Dead questions and answers",
  "",
  "```json",
  JSON.stringify({ dead_questions: sensitivity.dead_questions, dead_answers: sensitivity.dead_answers }, null, 2),
  "```",
  "",
  "### All eleven repeated-construct groups",
  "",
  ...repeated.map((row) => recordBlock(row.construct_name, row)),
  "### All 28 non-monotonic observations",
  "",
  "| Question | Answer index (1-based) | Identity | Observations | Probability worsened | Rank worsened |",
  "|---|---:|---|---:|---:|---:|",
  nonMonotonicRows,
  "",
  "## Defects and traceability",
  "",
  "### Required Critical and High-interest defect rows",
  "",
  ...selectedDefects.map((row) => recordBlock(`${row.defect_id} — ${row.severity}`, row)),
  "### Every Gate A and Gate B1 requirement",
  "",
  ...selectedRequirements.map((row) => recordBlock(`${row.requirement_id} — ${row.gate}`, row)),
  "Boundary precedence: `bounded-mvp-repair-plan.md` and `requirements-traceability-matrix.csv` govern the repair boundary. Narrative summaries must agree with them.",
  "",
].join("\n");

fs.writeFileSync(path.join(scriptDir, "owner-review-evidence-manifest.md"), manifest, "utf8");
fs.writeFileSync(path.join(scriptDir, "owner-review-critical-extract.md"), extract, "utf8");

console.log(JSON.stringify({
  manifest_artifacts: manifestRows.length,
  question_records: selectedQuestions.size,
  identity_records: selectedIdentities.length,
  representative_profiles: representativeProfiles.length,
  materially_challenging_profiles: materiallyChallengedProfiles.length,
  adversarial_records: adversarial.length,
  representative_flips: sensitivity.representative_primary_flips.length,
  different_family_categories: Object.keys(sensitivity.different_family_flip_categories).length,
  repeated_constructs: repeated.length,
  non_monotonic_rows: sensitivity.non_monotonic_support_observations.length,
  defect_records: selectedDefects.length,
  gate_a_b1_requirements: selectedRequirements.length,
  result_field_consumers: consumers.length,
  critical_result_field_records: criticalConsumers.length,
  compatibility_dispositions: consumerDispositionCounts,
}, null, 2));

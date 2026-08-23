import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../..");
const RUN_SLUG = "archscry-current-state-2026-08-22";
const AUDIT_DIR = path.join(ROOT, "docs/audits", RUN_SLUG);
const MANIFEST_PATH = path.join(AUDIT_DIR, "manifest.json");
const QA_PATH = path.join(AUDIT_DIR, "workbook-qa.json");
const SELF_QA_PATH = path.join(AUDIT_DIR, "robdev-self-qa.md");
const BASELINE = "db9a16a40c2bfb7d0d493eacef348f19d70bb05a";
const EXPECTED_FORMULAS = {
  dossier: {
    A4: "=COUNTA(B8:B44)",
    D4: '=COUNTIF(E8:E44,"PASS")',
    G4: '=COUNTIF(M8:M44,"YES")',
    J4: "=COUNTA(L8:L44)"
  },
  engine: {
    A4: "=COUNTA(B8:B44)",
    D4: '=COUNTIF(G8:G44,"PASS_MATCH")',
    G4: '=COUNTIF(G8:G44,"MISMATCH")',
    J4: '=COUNTIF(G8:G44,"NO_RESULT")'
  }
};

const readJson = (target) => JSON.parse(fs.readFileSync(target, "utf8"));
const rel = (target) => path.relative(ROOT, target).replaceAll("\\", "/");
const resolveRepoPath = (target) => path.resolve(ROOT, ...String(target).split("/"));
const sha256 = (target) => crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex");
const argValue = (name) => process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1) ?? null;

const manifest = readJson(MANIFEST_PATH);
const qa = readJson(QA_PATH);
const selfQa = fs.readFileSync(SELF_QA_PATH, "utf8");
assert.equal(manifest.exact_product_baseline_sha, BASELINE, "Manifest baseline drifted.");
assert.match(selfQa, /ROBDEV SELF-QA — PASS FOR INDEPENDENT ROBQA/, "RobDev self-QA pass marker is missing.");

manifest.robdev_self_qa = { status: "COMPLETE", path: rel(SELF_QA_PATH) };
manifest.completion_status = manifest.completion_status ?? {};
manifest.completion_status.robdev_self_qa = "COMPLETE";

const reviewPathArg = argValue("--independent-review");
const reviewedSha = argValue("--reviewed-sha");
assert.equal(Boolean(reviewPathArg), Boolean(reviewedSha), "Independent review path and reviewed SHA must be supplied together.");
if (reviewPathArg && reviewedSha) {
  assert.match(reviewedSha, /^[0-9a-f]{40}$/, "Reviewed SHA must be an exact 40-character commit SHA.");
  const reviewPath = resolveRepoPath(reviewPathArg);
  assert.ok(fs.existsSync(reviewPath), `Independent review handoff does not exist: ${reviewPathArg}`);
  const review = fs.readFileSync(reviewPath, "utf8");
  assert.ok(review.includes(reviewedSha), "Independent review handoff does not name the supplied reviewed SHA.");
  assert.match(review, /PASS — Owner Review Ready/, "Independent review handoff does not contain the required pass disposition.");
  manifest.independent_robqa = { status: "PASS — Owner Review Ready", reviewed_sha: reviewedSha, handoff: rel(reviewPath) };
  manifest.completion_status.independent_robqa = "PASS — Owner Review Ready";
}

assert.equal(manifest.workbooks?.status, "COMPLETE", "Workbook top-level status is not COMPLETE.");
assert.equal(manifest.red_team?.status, "COMPLETE", "Red-team top-level status is not COMPLETE.");
assert.equal(manifest.completion_status.collection, "COMPLETE", "Collection completion status is not COMPLETE.");
assert.equal(manifest.completion_status.workbooks, manifest.workbooks.status, "Workbook status fields disagree.");
assert.equal(manifest.completion_status.red_team_reconciliation, manifest.red_team.status, "Red-team status fields disagree.");
assert.equal(manifest.completion_status.robdev_self_qa, manifest.robdev_self_qa.status, "RobDev self-QA status fields disagree.");
assert.equal(manifest.dossier.workbook, manifest.workbooks.dossier.path, "Dossier workbook paths disagree.");
assert.equal(manifest.engine.workbook, manifest.workbooks.engine.path, "Engine workbook paths disagree.");

const requiredPaths = [
  manifest.dossier.combined_json,
  manifest.dossier.summary_csv,
  manifest.dossier.exceptions_markdown,
  manifest.dossier.raw_root,
  manifest.dossier.screenshot_root,
  manifest.dossier.workbook,
  manifest.engine.combined_json,
  manifest.engine.summary_csv,
  manifest.engine.exceptions_markdown,
  manifest.engine.trace_root,
  manifest.engine.workbook,
  manifest.red_team.source_inventory,
  manifest.red_team.reconciliation_markdown,
  manifest.red_team.reconciliation_csv,
  manifest.red_team.owner_review_queue,
  manifest.workbooks.qa,
  manifest.workbooks.previews,
  manifest.robdev_self_qa.path
];
for (const target of requiredPaths) {
  assert.ok(target, "Manifest contains an empty required path.");
  assert.ok(fs.existsSync(resolveRepoPath(target)), `Manifest path does not exist: ${target}`);
}

assert.equal(fs.readdirSync(resolveRepoPath(manifest.dossier.raw_root)).filter((name) => name.endsWith(".json")).length, 37, "Raw dossier count is not 37.");
assert.equal(fs.readdirSync(resolveRepoPath(manifest.dossier.screenshot_root)).filter((name) => name.endsWith(".png")).length, 37, "Dossier screenshot count is not 37.");
assert.equal(fs.readdirSync(resolveRepoPath(manifest.engine.trace_root)).filter((name) => name.endsWith(".json")).length, 37, "Engine trace count is not 37.");

for (const kind of ["dossier", "engine"]) {
  const exported = qa[kind]?.exported;
  assert.equal(exported?.required_formulas_preserved, true, `${kind} formula-preservation invariant did not pass.`);
  assert.equal(exported?.required_formula_count, 4, `${kind} required formula count is not 4.`);
  assert.deepEqual(exported?.required_formula_cells, EXPECTED_FORMULAS[kind], `${kind} exported formula inventory differs.`);
  assert.equal(qa[kind].path, manifest.workbooks[kind].path, `${kind} QA and manifest workbook paths disagree.`);
  assert.equal(qa[kind].sha256, manifest.workbooks[kind].sha256, `${kind} QA and manifest workbook hashes disagree.`);
  assert.equal(sha256(resolveRepoPath(qa[kind].path)), qa[kind].sha256, `${kind} workbook binary hash differs from QA.`);
}

const productExceptionCount = (manifest.dossier.counts.blocker ?? 0) + (manifest.dossier.counts.major ?? 0) + (manifest.dossier.counts.minor ?? 0);
const readme = [
  "# Archscry Current-State Evidence & Red-Team Reconciliation",
  "",
  `- Exact product baseline: \`${BASELINE}\``,
  `- Identity authority: \`${manifest.identity_authority.path}\` (${manifest.identity_authority.actual_count})`,
  `- Dossiers collected: ${manifest.dossier.counts.collected}/${manifest.dossier.counts.expected}`,
  `- Screenshots generated: ${manifest.dossier.counts.screenshots}/${manifest.dossier.counts.expected}`,
  `- Dossier product exceptions: ${productExceptionCount}`,
  `- Dossier environment/product-choice notes: ${manifest.dossier.counts.note}`,
  `- Engine named matches: ${manifest.engine.counts.pass_match}/${manifest.identity_authority.actual_count}`,
  `- Engine intentional bounded no-result cases: ${manifest.engine.counts.no_result} (\`YORE\`)`,
  `- Engine mismatches/errors: ${(manifest.engine.counts.mismatch ?? 0) + (manifest.engine.counts.engine_error ?? 0)}`,
  `- Red-team findings reconciled: ${manifest.red_team.finding_count}`,
  `- Bounded owner-review decisions: ${manifest.red_team.owner_review_count}`,
  "",
  "Dossier evidence records current rendered identity content only. Every row is `DIRECT_DOSSIER_REVIEW` and `NOT_ASSERTED` for placement reachability.",
  "",
  "Engine evidence replays the current legitimate witness sequences through the current production engine. Expected identity is used only as an external post-run assertion.",
  "",
  "## Review Entry Points",
  "",
  "- `manifest.json` — exact baseline, source hashes, browser limits, artifact paths, counts, workbook hashes, and phase states.",
  "- `dossier/dossier-review-current-state.json` — 37 structured records with complete rendered text and raw/screenshot references.",
  "- `engine/engine-validation-current-state.json` — 37 current-engine results with exact witness/model/trace hashes.",
  "- `reconciliation/red-team-source-inventory.md` — actual relevant sources, chronology, authority class, and checksums.",
  "- `reconciliation/red-team-reconciliation.md` — current dispositions with evidence, confidence, action, and owner-review status.",
  "- `reconciliation/owner-review-queue.md` — eight dossiers, five engine journeys, and seven decisions; no all-37 owner collection.",
  "- `workbook-qa.json` — both 42-sheet inventories, eight exact exported formulas, zero formula errors, and all-sheet preview references.",
  "- `robdev-self-qa.md` — changed/protected contracts, browser/workbook sampling, deterministic tests, known baseline-only failures, and readiness.",
  "",
  "## Workbooks and Large Evidence",
  "",
  `- \`${manifest.workbooks.dossier.path}\``,
  `- \`${manifest.workbooks.engine.path}\``,
  `- \`${manifest.dossier.screenshot_root}/\` — 37 full-page PNGs.`,
  `- \`${manifest.dossier.raw_root}/\` — 37 full raw render records including HTML.`,
  `- \`${manifest.engine.trace_root}/\` — 37 detailed answer-by-answer traces.`,
  `- \`${manifest.workbooks.previews}/\` — 84 rendered sheet previews plus contact sheets.`,
  "",
  "The workbooks are review artifacts, not product sources of truth. Large repeatable screenshots, raw records, traces, and previews remain local/ignored but are checksum-bound by the manifest and summary evidence. Optional Scryfall card media was blocked in the collection sandbox; this is the sole repeated dossier note and is not a product defect."
].join("\n");
fs.writeFileSync(path.join(AUDIT_DIR, "README.md"), `${readme}\n`, "utf8");
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  status: "PASS",
  baseline: BASELINE,
  required_paths: requiredPaths.length,
  dossier_formulas: qa.dossier.exported.required_formula_cells,
  engine_formulas: qa.engine.exported.required_formula_cells,
  completion_status: manifest.completion_status
}, null, 2));

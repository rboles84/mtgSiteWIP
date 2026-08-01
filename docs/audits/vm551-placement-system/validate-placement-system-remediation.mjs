import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const controlRoot = "C:\\dev\\voxmana.io";
const base = "2b4058ff4c769f03d52070204b3ce973e51decbd";
const rejected = "c62c7e1b43421359488537457804698a77656952";
const requiredCecosHash = "dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3";
const allowedDispositions = new Set(["KEEP", "KEEP-BUT-REWORD", "RETUNE", "REPLACE", "REMOVE", "NEEDS-EVIDENCE", "UNCLEAR-AUTHORITY"]);

function run(command, args, cwd = repoRoot) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")}\n${result.stderr}`);
  return result.stdout.trim();
}

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

const readJson = (name) => JSON.parse(fs.readFileSync(path.join(scriptDir, name), "utf8"));
const readCsv = (name) => parseCsv(fs.readFileSync(path.join(scriptDir, name), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const manifest = readJson("audit-input-manifest.json");
const summary = readJson("remediation-analysis-summary.json");
const questions = readCsv("question-quality-adjudication.csv");
const answers = readCsv("answer-quality-adjudication.csv");
const identities = readCsv("identity-distinctiveness-matrix.csv");
const profiles = readCsv("profile-scenario-matrix.csv");
const adversarial = readCsv("adversarial-scenario-matrix.csv");
const defects = readCsv("defect-register-remediated.csv");
const requirements = readCsv("requirements-traceability-matrix.csv");

const cecos = spawnSync("git", ["-C", "C:\\dev\\Commander_Questions_Corpus", "-c", "safe.directory=C:/dev/Commander_Questions_Corpus", "show", "947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md"], { encoding: null });
assert(cecos.status === 0, "CECOS exact Git object could not be read");
assert(crypto.createHash("sha256").update(cecos.stdout).digest("hex") === requiredCecosHash, "CECOS checksum mismatch");
assert(manifest.cecos.commit === "947bf45bf6a191839b5fb4fa6c65980ed9d5737e", "CECOS manifest SHA mismatch");

assert(questions.length === 113 && new Set(questions.map((row) => row.question_id)).size === 113, "Question coverage mismatch");
assert(answers.length === 356 && new Set(answers.map((row) => row.audit_answer_id)).size === 356, "Answer coverage mismatch");
assert(questions.every((row) => allowedDispositions.has(row.final_disposition)), "Invalid question disposition");
assert(answers.every((row) => allowedDispositions.has(row.final_disposition)), "Invalid answer disposition");
assert(identities.length === 37 && new Set(identities.map((row) => row.identity)).size === 37, "Identity coverage mismatch");
assert(profiles.length === 37 && new Set(profiles.map((row) => row.expected_identity)).size === 37, "Profile coverage mismatch");
assert(adversarial.length === 9 && new Set(adversarial.map((row) => row.scenario)).size === 9, "Adversarial coverage mismatch");
assert(summary.preserved_counts.terminal_paths === 26891, "Terminal-path reproduction mismatch");
assert(summary.preserved_counts.exact_top_ties === 333, "Exact-tie reproduction mismatch");

for (const artifact of manifest.preserved_artifacts) {
  const observed = crypto.createHash("sha256").update(fs.readFileSync(path.join(repoRoot, artifact.path))).digest("hex");
  assert(observed === artifact.sha256, `Preserved artifact hash mismatch: ${artifact.path}`);
}

assert(defects.filter((row) => ["Critical", "High"].includes(row.severity)).every((row) => row.exact_reproduction && row.machine_readable_evidence_reference && row.user_facing_impact && row.severity_rationale && row.requirement_ids && row.validation_required), "Critical/High defect trace is incomplete");
assert(requirements.filter((row) => ["Gate A", "Gate B1"].includes(row.gate)).every((row) => row.finding_ids && row.evidence && row.risk && row.requirement && row.validation), "Gate A/B1 requirement trace is incomplete");

const changedSinceRejected = run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "diff", "--name-only", rejected, "--"]);
const statusPaths = run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "status", "--porcelain=v1", "-uall"]);
const changedPaths = [...new Set([
  ...(changedSinceRejected ? changedSinceRejected.split(/\r?\n/).filter(Boolean) : []),
  ...(statusPaths ? statusPaths.split(/\r?\n/).filter(Boolean).map((line) => line.replace(/^.{1,2}\s/, "").replace(/^"|"$/g, "")) : []),
])];
assert(changedPaths.every((name) => name.startsWith("docs/")), `Non-documentation path changed: ${changedPaths.filter((name) => !name.startsWith("docs/")).join(", ")}`);
assert(!changedPaths.some((name) => /(^|\/)(assets|data|research|scripts|tests?|archscry)(\/|$)/.test(name) && !name.startsWith("docs/")), "Production/test path changed");
assert(run("git", ["-C", controlRoot, "-c", "safe.directory=C:/dev/voxmana.io", "status", "--porcelain"]) === "", "Control worktree is dirty");
assert(run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "rev-parse", "--abbrev-ref", "HEAD"]) === "codex/vm551-placement-system-audit", "Audit branch mismatch");
assert(run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "merge-base", "HEAD", base]) === base, "Original-base merge-base mismatch");
const upstream = run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "for-each-ref", "--format=%(upstream:short)", "refs/heads/codex/vm551-placement-system-audit"]);
assert(upstream === "", "Audit branch unexpectedly has an upstream");
const remoteTracking = run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "for-each-ref", "--format=%(refname:short)", "refs/remotes/origin/codex/vm551-placement-system-audit"]);
assert(remoteTracking === "", "Local remote-tracking audit branch exists; no-push proof is no longer local-only");

console.log(JSON.stringify({
  cecos_sha: manifest.cecos.commit,
  cecos_sha256: requiredCecosHash,
  questions: questions.length,
  answers: answers.length,
  identities: identities.length,
  profiles: profiles.length,
  adversarial: adversarial.length,
  terminal_paths: summary.preserved_counts.terminal_paths,
  exact_ties: summary.preserved_counts.exact_top_ties,
  defects: summary.remediated_defects,
  gate_a_b1_requirements: requirements.filter((row) => ["Gate A", "Gate B1"].includes(row.gate)).length,
  changed_paths_since_rejected: changedPaths.length,
  production_or_test_paths_changed: 0,
  control_clean: true,
  branch: "codex/vm551-placement-system-audit",
  upstream: null,
  local_remote_tracking_branch: null,
  result: "PASS",
}, null, 2));

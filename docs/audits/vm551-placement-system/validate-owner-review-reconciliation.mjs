import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const controlRoot = "C:\\dev\\voxmana.io";
const base = "2b4058ff4c769f03d52070204b3ce973e51decbd";
const startingHead = "dbf67b97515550b0ceac2bf711facacd7acc0701";
const requiredCecosHash = "dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3";

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

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const read = (name) => fs.readFileSync(path.join(scriptDir, name), "utf8");
const csv = (name) => parseCsv(read(name));
const json = (name) => JSON.parse(read(name));
const hashFile = (relativePath) => crypto.createHash("sha256").update(fs.readFileSync(path.join(repoRoot, relativePath))).digest("hex");

const cecos = spawnSync("git", ["-C", "C:\\dev\\Commander_Questions_Corpus", "-c", "safe.directory=C:/dev/Commander_Questions_Corpus", "show", "947bf45bf6a191839b5fb4fa6c65980ed9d5737e:docs/standards/cecos/CECOS-v1.0.0-draft.4.md"], { encoding: null });
assert(cecos.status === 0, "CECOS exact Git object could not be read");
assert(crypto.createHash("sha256").update(cecos.stdout).digest("hex") === requiredCecosHash, "CECOS checksum mismatch");

const inputManifest = json("audit-input-manifest.json");
for (const artifact of inputManifest.preserved_artifacts) assert(hashFile(artifact.path) === artifact.sha256, `Original preserved artifact changed: ${artifact.path}`);
const intentionallyCorrectedArtifacts = inputManifest.preserved_artifacts.filter((artifact) => artifact.sha256 !== artifact.starting_workflow_sha256);
assert(intentionallyCorrectedArtifacts.length === 1 && intentionallyCorrectedArtifacts[0].path.endsWith("identity-reachability-opportunity-matrix.csv"), "Preserved-artifact correction scope mismatch");
assert(inputManifest.preserved_artifacts.filter((artifact) => artifact.sha256 === artifact.starting_workflow_sha256).length === 5, "Five untouched preserved artifacts were not byte-identical");
assert(intentionallyCorrectedArtifacts[0].byte_reproduction.startsWith("INTENTIONAL RECONCILIATION CORRECTION"), "Reachability artifact correction is not explicitly classified");

const profiles = csv("profile-scenario-matrix.csv");
assert(profiles.length === 37, "Profile count mismatch");
assert(profiles.every((row) => row.scenario_origin === "GOLDEN-PATH-DERIVED"), "Profile origin reconciliation mismatch");
assert(profiles.every((row) => row.scoring_outcome === "EXACT-PRIMARY"), "Profile scoring outcome mismatch");
assert(profiles.every((row) => row.final_disposition === "INCOMPLETE"), "Incomplete profile disposition mismatch");
assert(profiles.every((row) => row.neighboring_challenge_status.startsWith("INCOMPLETE") && row.mixed_or_uncertain_challenge_status.startsWith("INCOMPLETE")), "Profile challenge completeness mismatch");

const adversarial = csv("adversarial-scenario-matrix.csv");
const adversarialCounts = Object.fromEntries([...new Set(adversarial.map((row) => row.final_disposition))].map((value) => [value, adversarial.filter((row) => row.final_disposition === value).length]));
assert(adversarial.length === 9, "Adversarial count mismatch");
assert(adversarialCounts["QUESTIONNAIRE-CANNOT-REPRESENT"] === 5, "Literal non-representation total mismatch");
assert(adversarialCounts["PARTIALLY-REPRESENTABLE-BUT-CONFLATED"] === 2, "Partial/conflated total mismatch");
assert(adversarialCounts["REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE"] === 2, "Unsupported-inference total mismatch");
assert(adversarial.every((row) => row.available_answer_coverage && row.disposition_rationale), "Adversarial rationale missing");

const requirements = csv("requirements-traceability-matrix.csv");
assert(requirements.filter((row) => row.gate === "Gate A").map((row) => row.requirement_id).join("|") === "REQ-A-001|REQ-A-002|REQ-A-003|REQ-A-004|REQ-A-005", "Gate A requirement boundary mismatch");
assert(requirements.filter((row) => row.gate === "Gate B1").map((row) => row.requirement_id).join("|") === "REQ-B1-001|REQ-B1-002|REQ-B1-003|REQ-B1-004|REQ-B1-005|REQ-B1-006", "Gate B1 requirement boundary mismatch");
assert(requirements.filter((row) => row.gate === "Gate B2").map((row) => row.requirement_id).join("|") === "REQ-B2-001", "Gate B2 requirement boundary mismatch");
assert(!requirements.find((row) => row.requirement_id === "REQ-A-003").finding_ids.includes("D008"), "Question refit remains assigned to Gate A");
assert(requirements.find((row) => row.requirement_id === "REQ-B1-001").finding_ids.includes("D008"), "Forced-directional-answer repair is not assigned to Gate B1");
const defects = csv("defect-register-remediated.csv");
assert(defects.find((row) => row.defect_id === "VM551-D008").repair_gate === "Gate B1", "D008 defect gate mismatch");

const precedenceSentence = "downstream-compatibility-contract.md";
for (const relativePath of [
  "docs/audits/vm551-placement-system/VM-551-full-placement-system-audit.md",
  "docs/audits/vm551-placement-system/requirements-specification.md",
  "docs/audits/vm551-placement-system/bounded-mvp-repair-plan.md",
  "docs/audits/vm551-placement-system/validation-record.md",
  "docs/audits/vm551-placement-system/README.md",
  "docs/kanban/done/VM-551-full-placement-system-audit.md",
]) assert(fs.readFileSync(path.join(repoRoot, relativePath), "utf8").includes(precedenceSentence), `Missing boundary precedence: ${relativePath}`);

const stalePattern = /zero[- ]evidence|without (?:direct |any )?(?:positive|affirmative) evidence|no affirmative evidence|suppression[- ]only|(?:win|wins|winning|winner)[^\n]{0,80}zero[^\n]{0,40}positive evidence|every identity can win without affirmative evidence/i;
const scanPaths = [
  ...fs.readdirSync(scriptDir).filter((name) => /\.(md|csv|json|mjs)$/.test(name) && name !== "validate-owner-review-reconciliation.mjs").map((name) => path.join(scriptDir, name)),
  path.join(repoRoot, "docs/handoffs/2026-08-01-0900-codex-vm551-placement-system-audit.md"),
  path.join(repoRoot, "docs/handoffs/2026-08-01-1002-codex-vm551-owner-rejection-remediation.md"),
  path.join(repoRoot, "docs/kanban/done/VM-551-full-placement-system-audit.md"),
];
const staleViolations = [];
for (const filePath of scanPaths) fs.readFileSync(filePath, "utf8").split(/\r?\n/).forEach((line, index) => {
  if (!stalePattern.test(line)) return;
  const normalized = line.toLowerCase();
  if (!(normalized.includes("withdrawn historical claim") || normalized.includes("withdrawn historical conclusion"))) staleViolations.push(`${path.relative(repoRoot, filePath)}:${index + 1}`);
});
assert(staleViolations.length === 0, `Unqualified stale evidence conclusion remains: ${staleViolations.join(", ")}`);

const manifestText = read("owner-review-evidence-manifest.md");
const manifestMatches = [...manifestText.matchAll(/^\| (docs\/audits\/vm551-placement-system\/[^|]+) \| (\d+) \| `([a-f0-9]{64})` \|/gm)];
assert(manifestMatches.length === 18, `Owner manifest artifact count mismatch: ${manifestMatches.length}`);
for (const match of manifestMatches) {
  const relativePath = match[1].trim();
  assert(fs.statSync(path.join(repoRoot, relativePath)).size === Number(match[2]), `Owner manifest size mismatch: ${relativePath}`);
  assert(hashFile(relativePath) === match[3], `Owner manifest hash mismatch: ${relativePath}`);
}

const extract = read("owner-review-critical-extract.md");
const countMatch = extract.match(/question records (\d+); identity records (\d+); representative profiles (\d+); materially challenging profiles (\d+); adversarial records (\d+); representative flips (\d+); different-family categories (\d+); repeated constructs (\d+); non-monotonic rows (\d+); defect records (\d+); Gate A\/B1 requirements (\d+)/);
assert(countMatch, "Owner extract reconciliation count line missing");
const observedCounts = countMatch.slice(1).map(Number);
const sensitivity = json("sensitivity-dependency-collision-analysis.json");
const questionRows = csv("question-quality-adjudication.csv");
const expectedQuestionIds = new Set();
questionRows.filter((row) => ["KEEP", "KEEP-BUT-REWORD", "NEEDS-EVIDENCE"].includes(row.final_disposition)).forEach((row) => expectedQuestionIds.add(row.question_id));
questionRows.filter((row) => row.phase === "gate").forEach((row) => expectedQuestionIds.add(row.question_id));
for (const [phase, disposition] of [["hall", "RETUNE"], ["hall", "REPLACE"], ["crucible", "RETUNE"], ["crucible", "REPLACE"]]) {
  questionRows.filter((row) => row.phase === phase && row.final_disposition === disposition).slice(0, 5).forEach((row) => expectedQuestionIds.add(row.question_id));
}
const expectedCounts = [
  expectedQuestionIds.size,
  23, 5, 0, 9, 5, Object.keys(sensitivity.different_family_flip_categories).length, 11, 28, 9, 11,
];
assert(observedCounts.every((value, index) => value === expectedCounts[index]), `Owner extract counts mismatch: observed ${observedCounts.join(",")}; expected ${expectedCounts.join(",")}`);

const changed = run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "diff", "--name-only", startingHead, "--"]);
const status = run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "status", "--porcelain=v1", "-uall"]);
const changedPaths = [...new Set([...(changed ? changed.split(/\r?\n/) : []), ...(status ? status.split(/\r?\n/).map((line) => line.replace(/^.{1,2}\s/, "").replace(/^"|"$/g, "")) : [])])].filter(Boolean);
assert(changedPaths.every((name) => name.startsWith("docs/")), `Non-documentation path changed: ${changedPaths.filter((name) => !name.startsWith("docs/")).join(", ")}`);
assert(run("git", ["-C", controlRoot, "-c", "safe.directory=C:/dev/voxmana.io", "status", "--porcelain"]) === "", "Control worktree is dirty");
assert(run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "merge-base", "HEAD", base]) === base, "Original merge-base mismatch");
assert(run("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "for-each-ref", "--format=%(upstream:short)", "refs/heads/codex/vm551-placement-system-audit"]) === "", "Unexpected upstream");

console.log(JSON.stringify({
  cecos_sha: "947bf45bf6a191839b5fb4fa6c65980ed9d5737e",
  cecos_sha256: requiredCecosHash,
  original_preserved_artifacts: { total: inputManifest.preserved_artifacts.length, byte_identical: 5, intentionally_corrected: 1 },
  profiles: { total: 37, origin: { "GOLDEN-PATH-DERIVED": 37 }, scoring_outcome: { "EXACT-PRIMARY": 37 }, final_disposition: { INCOMPLETE: 37 } },
  adversarial: adversarialCounts,
  gate_requirements: { A: 5, B1: 6, B2: 1 },
  owner_manifest_artifacts: manifestMatches.length,
  owner_extract_counts: observedCounts,
  stale_evidence_violations: 0,
  production_or_test_paths_changed: 0,
  result: "PASS",
}, null, 2));

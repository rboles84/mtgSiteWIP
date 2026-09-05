import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const modulePath = fileURLToPath(import.meta.url);

function runGit(repoRoot, args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

function resolveCommit(repoRoot, revision) {
  return runGit(repoRoot, ["rev-parse", `${revision}^{commit}`]);
}

export function gitChangeSet(repoRoot, fromRevision, toRevision) {
  const output = runGit(repoRoot, [
    "diff",
    "--name-status",
    "--find-renames",
    `${fromRevision}..${toRevision}`,
  ]);
  const entries = output
    ? output.split(/\r?\n/).map((line) => {
        const fields = line.split("\t");
        const status = fields[0];
        const changedPath = /^[RC]/.test(status) ? fields[2] : fields[1];
        if (!status || !changedPath) throw new Error(`Unrecognized git name-status row: ${line}`);
        return { status, path: changedPath.replaceAll("\\", "/"), raw: line };
      })
    : [];
  return { entries, count: entries.length, paths: entries.map((entry) => entry.path) };
}

function markdownSection(markdown, heading, level = 2) {
  const marker = "#".repeat(level);
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim().toLowerCase() === `${marker} ${heading}`.toLowerCase());
  if (start < 0) return null;
  const end = lines.findIndex((line, index) => index > start && new RegExp(`^#{1,${level}}\\s+`).test(line));
  return lines.slice(start + 1, end < 0 ? lines.length : end).join("\n");
}

function metadataValue(section, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return section?.match(new RegExp(`^-\\s+${escaped}:\\s+\`([^\`]+)\`\\s*$`, "im"))?.[1] ?? null;
}

function listedPaths(section) {
  if (section === null) return null;
  return section
    .split(/\r?\n/)
    .map((line) => line.match(/^-\s+`([^`]+)`\s*$/)?.[1]?.replaceAll("\\", "/"))
    .filter(Boolean);
}

function comparePaths(label, expected, actual, errors) {
  if (actual === null) {
    errors.push(`Missing ${label} path section.`);
    return;
  }
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missing = expected.filter((item) => !actualSet.has(item));
  const extra = actual.filter((item) => !expectedSet.has(item));
  const duplicates = actual.filter((item, index) => actual.indexOf(item) !== index);
  if (missing.length) errors.push(`${label} omits: ${missing.join(", ")}`);
  if (extra.length) errors.push(`${label} includes non-Git paths: ${extra.join(", ")}`);
  if (duplicates.length) errors.push(`${label} repeats: ${[...new Set(duplicates)].join(", ")}`);
}

export function validateChangeReport({ repoRoot, baseline, candidate, evidenceHead = candidate, markdown }) {
  const errors = [];
  const baselineSha = resolveCommit(repoRoot, baseline);
  const candidateSha = resolveCommit(repoRoot, candidate);
  const evidenceSha = resolveCommit(repoRoot, evidenceHead);
  const material = gitChangeSet(repoRoot, baselineSha, candidateSha);
  const evidence = gitChangeSet(repoRoot, candidateSha, evidenceSha);
  const finalBranch = gitChangeSet(repoRoot, baselineSha, evidenceSha);

  const materialSection = markdownSection(markdown, "Material candidate");
  if (materialSection === null) errors.push("Missing ## Material candidate section.");
  const reportBaseline = metadataValue(materialSection, "Baseline");
  const reportCandidate = metadataValue(materialSection, "Candidate");
  const reportCount = metadataValue(materialSection, "Changed paths");
  if (!reportBaseline || resolveCommit(repoRoot, reportBaseline) !== baselineSha) errors.push("Reported baseline does not match the supplied Git baseline.");
  if (!reportCandidate || resolveCommit(repoRoot, reportCandidate) !== candidateSha) errors.push("Reported candidate does not match the supplied Git candidate.");
  if (reportCount === null || Number(reportCount) !== material.count) errors.push(`Reported material count ${reportCount ?? "<missing>"} does not match Git count ${material.count}.`);
  comparePaths("Files changed", material.paths, listedPaths(markdownSection(markdown, "Files changed")), errors);

  const evidenceSection = markdownSection(markdown, "Evidence delta");
  const evidencePathsSection = markdownSection(markdown, "Evidence-only paths");
  if (candidateSha !== evidenceSha) {
    if (evidenceSection === null) {
      errors.push("Missing ## Evidence delta section for commits after the material candidate.");
    } else {
      const reportEvidenceCandidate = metadataValue(evidenceSection, "Material candidate");
      const reportEvidenceHead = metadataValue(evidenceSection, "Evidence head");
      const reportEvidenceCount = metadataValue(evidenceSection, "Additional evidence-only paths");
      if (!reportEvidenceCandidate || resolveCommit(repoRoot, reportEvidenceCandidate) !== candidateSha) errors.push("Evidence delta material candidate does not match Git.");
      if (!reportEvidenceHead || resolveCommit(repoRoot, reportEvidenceHead) !== evidenceSha) errors.push("Reported evidence head does not match Git.");
      if (reportEvidenceCount === null || Number(reportEvidenceCount) !== evidence.count) errors.push(`Reported evidence count ${reportEvidenceCount ?? "<missing>"} does not match Git count ${evidence.count}.`);
      if (!/not the full task diff/i.test(evidenceSection)) errors.push("Evidence delta must say it is not the full task diff.");
    }
    comparePaths("Evidence-only paths", evidence.paths, listedPaths(evidencePathsSection), errors);
  } else if (evidenceSection !== null || evidencePathsSection !== null) {
    errors.push("Report contains an evidence delta although evidence head equals the material candidate.");
  }

  return { errors, material, evidence, finalBranch, baselineSha, candidateSha, evidenceSha };
}

function parseArgs(argv) {
  const options = { baseline: null, candidate: null, evidenceHead: null, report: null };
  for (const arg of argv) {
    if (arg.startsWith("--baseline=")) options.baseline = arg.slice(11);
    else if (arg.startsWith("--candidate=")) options.candidate = arg.slice(12);
    else if (arg.startsWith("--evidence-head=")) options.evidenceHead = arg.slice(16);
    else if (arg.startsWith("--report=")) options.report = arg.slice(9);
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!options.baseline || !options.candidate || !options.report) {
    throw new Error("Usage: node scripts/validate/validate-change-report.mjs --baseline=<sha> --candidate=<sha> --report=<markdown-path> [--evidence-head=<sha>]");
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const repoRoot = runGit(process.cwd(), ["rev-parse", "--show-toplevel"]);
  const reportPath = path.resolve(process.cwd(), options.report);
  const result = validateChangeReport({
    repoRoot,
    baseline: options.baseline,
    candidate: options.candidate,
    evidenceHead: options.evidenceHead ?? options.candidate,
    markdown: fs.readFileSync(reportPath, "utf8"),
  });
  if (result.errors.length) {
    for (const error of result.errors) console.error(`FAIL: ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS material change set: ${result.material.count} path(s) from ${result.baselineSha} to ${result.candidateSha}`);
  if (result.candidateSha !== result.evidenceSha) console.log(`PASS evidence delta: ${result.evidence.count} path(s) to ${result.evidenceSha}; not the full task diff`);
  console.log(`PASS final branch delta: ${result.finalBranch.count} path(s) from baseline to evidence head`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) main();

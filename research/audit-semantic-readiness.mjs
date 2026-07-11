import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import {
  claimId,
  claimsArray,
  collectClaimReferenceSites,
  evidenceUseAllowed,
  inferSemanticRole,
  sourcesArray,
} from "./semantic-readiness-lib.mjs";

const execFileAsync = promisify(execFile);
const modulePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(modulePath), "..");
const rawRoot = path.join(repoRoot, "data", "raw-factions");
const ledgerPath = path.join(repoRoot, "docs", "incidents", "CRIT-001-identity-recovery-ledger.json");
const ledgerMarkdownPath = path.join(repoRoot, "docs", "incidents", "CRIT-001-identity-recovery-ledger.md");

const RAW_TO_KEY = {
  abzan: "ABZAN", azorius_senate: "WU", black: "B", bant: "BANT", blue: "U",
  boros_legion: "WR", colorless: "COLORLESS", cult_of_rakdos: "BR", dune: "DUNE",
  esper: "ESPER", glint: "GLINT", golgari_swarm: "BG", green: "G", grixis: "GRIXIS",
  gruul_clans: "RG", house_dimir: "UB", ink: "INK", izzet_league: "UR", jeskai: "JESKAI",
  jund: "JUND", lorehold: "LOREHOLD", mardu: "MARDU", naya: "NAYA",
  orzhov_syndicate: "WB", prismari: "PRISMARI", quandrix: "QUANDRIX", red: "R",
  selesnya_conclave: "WG", silverquill: "SILVERQUILL", simic_combine: "UG", sultai: "SULTAI",
  temur: "TEMUR", witch: "WITCH", witherbloom: "WITHERBLOOM", wubrg: "WUBRG",
  white: "W", yore: "YORE",
};

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function parseArgs(argv) {
  const options = { updateLedger: false, targets: null, help: false };
  for (const arg of argv) {
    if (arg === "--update-ledger") options.updateLedger = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg.startsWith("--targets=")) options.targets = new Set(arg.slice(10).split(",").map((v) => v.trim().toUpperCase()).filter(Boolean));
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function parseFactionContext(source) {
  const match = source.match(/export const FACTION_CONTEXT = ([\s\S]*?) as const;/);
  return match ? JSON.parse(match[1]) : {};
}

function roleCounts(claims) {
  const counts = { substantive_claim: 0, discovery_record: 0, support_record: 0, unclassified: 0 };
  for (const claim of claims) counts[inferSemanticRole(claim)] += 1;
  return counts;
}

function sourceRoleCounts(sources) {
  const counts = {};
  for (const source of sources) {
    const role = String(source.source_role || "unclassified");
    counts[role] = (counts[role] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function collectNeighborReferences(value, results = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((child) => collectNeighborReferences(child, results));
    return results;
  }
  if (!value || typeof value !== "object") return results;
  for (const [key, child] of Object.entries(value)) {
    if (["related_factions_to_compare", "lateral_inhibition_targets"].includes(key) && Array.isArray(child)) {
      child.forEach((item) => results.add(String(item)));
    } else if (["against", "collision_target", "target_faction"].includes(key) && child) {
      results.add(String(child));
    }
    collectNeighborReferences(child, results);
  }
  return results;
}

function fingerprintLabels({ claimCount, roles, sourceRoles, missingReferences, templateCohort }) {
  const labels = [];
  if (claimCount <= 20) labels.push("low-volume-pattern");
  if (claimCount >= 80) labels.push("high-volume-pattern");
  const representedRoles = Object.values(roles).filter((count) => count > 0).length;
  if (representedRoles > 1) labels.push("mixed-role-pattern");
  if (roles.discovery_record > 0 && roles.discovery_record >= Math.max(roles.substantive_claim, roles.unclassified)) labels.push("discovery-heavy-pattern");
  const supportSources = (sourceRoles["support-only"] || 0) + (sourceRoles["shaping-only"] || 0);
  if (roles.support_record > 0 || supportSources > 0) labels.push("support-heavy-pattern");
  if (missingReferences.length) labels.push("invalid-reference-pattern");
  if (templateCohort) labels.push("template-cohort-pattern");
  return labels.length ? labels : ["unknown"];
}

function templateSignature({ claims, sources, placement }) {
  const claimTypes = claims.map((claim) => String(claim.claim_type || "")).sort();
  const sourceRoles = sources.map((source) => String(source.source_role || "")).sort();
  return JSON.stringify({ claimTypes, sourceRoles, questions: placement?.discriminator_questions?.length || 0 });
}

async function creationCommit(rawId) {
  try {
    const { stdout } = await execFileAsync("git", ["log", "--diff-filter=A", "--format=%H", "--", `data/raw-factions/${rawId}`], { cwd: repoRoot });
    return stdout.trim().split(/\r?\n/).filter(Boolean).at(-1) || null;
  } catch {
    return null;
  }
}

async function readinessMentions(key, name, rawId) {
  const files = [
    "docs/reference/strixhaven-college-source-readiness-matrix.md",
    "docs/reference/ravnica-guild-source-readiness-matrix.md",
    "docs/reference/shard-clan-source-readiness-matrix.md",
    "docs/reference/four-color-source-readiness-matrix.md",
    "docs/reference/colorless-source-readiness-matrix.md",
    "docs/research/wubrg/wubrg-depth-readiness-matrix.md",
  ];
  const names = [name, rawId.replaceAll("_", " ")].map((v) => v.toLowerCase()).filter((v) => v.length > 2);
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const keyPattern = new RegExp(`(^|[\\s|\`])${escapedKey}($|[\\s|\`])`, "i");
  const matches = [];
  for (const relative of files) {
    const text = await readFile(path.join(repoRoot, relative), "utf8").catch(() => "");
    text.split(/\r?\n/).forEach((line, index) => {
      const lower = line.toLowerCase();
      if (lower.includes("ready") && (names.some((needle) => lower.includes(needle)) || keyPattern.test(line))) {
        matches.push(`${relative}:${index + 1}`);
      }
    });
  }
  return matches;
}

export async function auditRepository({ targets = null } = {}) {
  const contextSource = await readFile(path.join(repoRoot, "supabase", "functions", "guild-recruiter", "faction-context.ts"), "utf8");
  const context = parseFactionContext(contextSource);
  const records = [];
  for (const [rawId, key] of Object.entries(RAW_TO_KEY)) {
    if (targets && !targets.has(key)) continue;
    const base = path.join(rawRoot, rawId, rawId);
    const [claimsFile, sourcesFile, profile, placement] = await Promise.all([
      readJson(`${base}.claims.json`), readJson(`${base}.sources.json`), readJson(`${base}.profile.json`), readJson(`${base}.placement.json`),
    ]);
    const claims = claimsArray(claimsFile);
    const sources = sourcesArray(sourcesFile);
    const roles = roleCounts(claims);
    const claimById = new Map(claims.map((claim) => [claimId(claim), claim]));
    const sites = [
      ...collectClaimReferenceSites(profile, `data/raw-factions/${rawId}/${rawId}.profile.json`),
      ...collectClaimReferenceSites(placement, `data/raw-factions/${rawId}/${rawId}.placement.json`),
    ];
    const missingReferences = [];
    const potentialRoleInvalid = [];
    for (const site of sites) {
      const resolvedRoles = [];
      for (const id of site.evidence_claim_ids) {
        const claim = claimById.get(id);
        if (!claim) missingReferences.push({ pointer: `${site.canonical_file}#${site.canonical_pointer}`, claim_id: id });
        else resolvedRoles.push(inferSemanticRole(claim));
      }
      const evidenceUse = site.evidence_use || "semantic";
      if (!evidenceUseAllowed(site.canonical_file, site.canonical_pointer, evidenceUse) || (evidenceUse === "semantic" && resolvedRoles.length && !resolvedRoles.includes("substantive_claim") && resolvedRoles.some((role) => role !== "unclassified"))) {
        potentialRoleInvalid.push({ pointer: `${site.canonical_file}#${site.canonical_pointer}`, roles: [...new Set(resolvedRoles)] });
      }
    }
    const questions = Array.isArray(placement.discriminator_questions) ? placement.discriminator_questions : [];
    const questionClaimIds = [...new Set(questions.flatMap((question) => [...(question.claim_ids || []), ...(question.evidence_claim_ids || [])]).map(String))];
    const neighbors = [...collectNeighborReferences(placement)].sort();
    const sourceRoles = sourceRoleCounts(sources);
    records.push({
      identity_key: key,
      raw_id: rawId,
      name: String(profile.faction_name || placement.faction_name || key),
      claim_count: claims.length,
      semantic_role_counts: roles,
      source_count: sources.length,
      source_role_counts: sourceRoles,
      claim_bearing_source_count: sourceRoles["claim-bearing"] || 0,
      claim_bearing_source_rate: sources.length ? Number(((sourceRoles["claim-bearing"] || 0) / sources.length).toFixed(4)) : 0,
      reference_site_count: sites.length,
      missing_references: missingReferences,
      potential_role_invalid_support_links: potentialRoleInvalid,
      raw_question_count: questions.length,
      unique_question_claim_ids: questionClaimIds,
      neighbor_references: neighbors,
      recruiter_context_size: JSON.stringify(context[key] || {}).length,
      creation_commit: await creationCommit(rawId),
      readiness_mentions: await readinessMentions(key, String(profile.faction_name || placement.faction_name || key), rawId),
      template_signature: templateSignature({ claims, sources, placement }),
    });
  }
  const signatures = new Map();
  for (const record of records) signatures.set(record.template_signature, (signatures.get(record.template_signature) || 0) + 1);
  return records.map((record) => {
    const templateCohort = (signatures.get(record.template_signature) || 0) > 1;
    const structuralFingerprint = fingerprintLabels({
      claimCount: record.claim_count,
      roles: record.semantic_role_counts,
      sourceRoles: record.source_role_counts,
      missingReferences: record.missing_references,
      templateCohort,
    });
    const coverageIndicators = [];
    if (record.claim_count <= 20) coverageIndicators.push("low-record-volume");
    if (record.semantic_role_counts.discovery_record >= Math.max(1, record.claim_count / 2)) coverageIndicators.push("discovery-record-majority");
    if (record.semantic_role_counts.substantive_claim === 0) coverageIndicators.push("no-explicit-substantive-role");
    const neighborIndicators = [];
    if (!record.neighbor_references.length) neighborIndicators.push("no-explicit-neighbor-reference");
    return {
      ...record,
      structural_fingerprint: structuralFingerprint,
      provisional_coverage_risk_indicators: coverageIndicators,
      provisional_neighbor_risk_indicators: neighborIndicators,
      template_cohort_pattern: templateCohort,
    };
  });
}

export function updateLedgerComputed(ledger, inventory, updatedAt) {
  const byKey = new Map(inventory.map((record) => [record.identity_key, record]));
  const result = structuredClone(ledger);
  for (const row of result.identities || []) {
    const record = byKey.get(row.identity.key);
    if (!record) continue;
    const nextComputed = {
      structural_fingerprint: record.structural_fingerprint,
      semantic_role_counts: record.semantic_role_counts,
      source_count: record.source_count,
      source_role_counts: record.source_role_counts,
      claim_bearing_source_count: record.claim_bearing_source_count,
      claim_bearing_source_rate: record.claim_bearing_source_rate,
      reference_site_count: record.reference_site_count,
      missing_references: record.missing_references,
      potential_role_invalid_support_links: record.potential_role_invalid_support_links,
      raw_question_count: record.raw_question_count,
      unique_question_claim_ids: record.unique_question_claim_ids,
      neighbor_references: record.neighbor_references,
      recruiter_context_size: record.recruiter_context_size,
      creation_commit: record.creation_commit,
      readiness_mentions: record.readiness_mentions,
      provisional_risk_indicators: {
        coverage: record.provisional_coverage_risk_indicators,
        neighbors: record.provisional_neighbor_risk_indicators,
      },
      template_cohort_pattern: record.template_cohort_pattern,
    };
    const previousComparable = { ...(row.computed || {}) };
    delete previousComparable.inventory_updated_at;
    delete previousComparable.template_cohort_change_explanation;
    if (JSON.stringify(previousComparable) === JSON.stringify(nextComputed)) continue;
    if (row.computed && row.computed.template_cohort_pattern !== record.template_cohort_pattern) {
      nextComputed.template_cohort_change_explanation = `Recomputed from the all-37 structural template-signature cohort: ${row.computed.template_cohort_pattern} -> ${record.template_cohort_pattern}.`;
    }
    row.computed = { ...nextComputed, inventory_updated_at: updatedAt };
  }
  return result;
}

export function renderLedgerMarkdown(ledger) {
  const lines = [
    "# CRIT-001 Identity Recovery Ledger",
    "",
    "Generated from `CRIT-001-identity-recovery-ledger.json`. The JSON file is authoritative.",
    "",
    `- Contract: \`${ledger.current_contract_version}\``,
    `- Active identity: \`${ledger.program?.active_identity || "none"}\``,
    `- Next identity: \`${ledger.program?.next_identity || "none"}\``,
    `- WIP limit: ${ledger.program?.wip_limit || 1}`,
    "",
    "| Card | Identity | Cohort | Gate | Status | Structural fingerprint | Contract | Recovery | Certification |",
    "|---|---|---|---|---|---|---|---|---|",
  ];
  for (const row of ledger.identities || []) {
    lines.push(`| ${row.identity.card} | ${row.identity.key} — ${row.identity.name} | ${row.identity.cohort} | ${row.workflow.current_gate} | ${row.workflow.status} | ${(row.computed?.structural_fingerprint || ["unknown"]).join(", ")} | ${row.certification.contract_version || "—"} | ${row.certification.recovery_commit || "—"} | ${row.certification.certification_commit || "—"} |`);
  }
  lines.push("", "Fingerprint labels are structural triage only. They do not establish semantic readiness, semantic failure, maturity, sufficiency, stereotype risk, or entailment.", "");
  return lines.join("\n");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log("Usage: node research/audit-semantic-readiness.mjs [--targets=UR,PRISMARI] [--update-ledger]");
    return;
  }
  const inventory = await auditRepository({ targets: options.targets });
  if (!options.updateLedger) {
    console.log(JSON.stringify({ schema_version: "1.0.0", generated_at: new Date().toISOString(), records: inventory }, null, 2));
    return;
  }
  if (options.targets) throw new Error("--update-ledger requires a complete all-identity inventory");
  const ledger = await readJson(ledgerPath);
  const updated = updateLedgerComputed(ledger, inventory, new Date().toISOString());
  await writeFile(ledgerPath, `${JSON.stringify(updated, null, 2)}\n`);
  await writeFile(ledgerMarkdownPath, renderLedgerMarkdown(updated));
  console.log(`Updated ${path.relative(repoRoot, ledgerPath)} with ${inventory.length} structural fingerprints.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

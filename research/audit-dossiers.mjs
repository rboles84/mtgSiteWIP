import {
  DOSSIER_SNAPSHOT_DIR,
  auditDossierCases,
  buildAuditReport,
  generateDossierCases,
  loadDossierInputs,
} from "./dossier-runner.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const inputs = await loadDossierInputs();
const cases = generateDossierCases(inputs);
const auditResults = auditDossierCases(cases);

await mkdir(DOSSIER_SNAPSHOT_DIR, { recursive: true });
await writeFile(new URL("dossier-audit-report.md", DOSSIER_SNAPSHOT_DIR), buildAuditReport(auditResults), "utf8");

const primaryCount = cases.filter((entry) => entry.dossier.isPrimary).length;
const adjacentCount = cases.filter((entry) => !entry.dossier.isPrimary).length;
const failing = auditResults.filter((result) => result.failures.length);
const warnings = auditResults.filter((result) => !result.failures.length && result.warnings.length);
const expectedPrimaryCount = Number(inputs.placementModel?._meta?.faction_count || primaryCount);

console.log(`Audited ${primaryCount} primary Commander dossiers and ${adjacentCount} adjacent dossiers.`);
console.log(`Pass: ${auditResults.length - failing.length - warnings.length}; warnings: ${warnings.length}; failures: ${failing.length}.`);
console.log("Wrote artifacts/dossier-snapshots/dossier-audit-report.md.");

if (primaryCount !== expectedPrimaryCount) {
  throw new Error(`Expected ${expectedPrimaryCount} primary dossiers, generated ${primaryCount}.`);
}

if (failing.length) {
  process.exitCode = 1;
}

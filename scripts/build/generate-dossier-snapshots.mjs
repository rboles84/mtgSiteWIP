import {
  auditDossierCases,
  generateDossierCases,
  loadDossierInputs,
  writeDossierSnapshotFiles,
} from "../lib/dossier-runner.mjs";

const inputs = await loadDossierInputs();
const cases = generateDossierCases(inputs);
const auditResults = auditDossierCases(cases);

await writeDossierSnapshotFiles(cases, auditResults);

const primaryCount = cases.filter((entry) => entry.dossier.isPrimary).length;
const adjacentCount = cases.filter((entry) => !entry.dossier.isPrimary).length;
const failing = auditResults.filter((result) => result.failures.length);
const expectedPrimaryCount = Number(inputs.placementModel?._meta?.faction_count || primaryCount);

console.log(`Generated ${primaryCount} primary Commander dossiers and ${adjacentCount} adjacent dossiers.`);
console.log("Wrote artifacts/dossier-snapshots/index.md and dossier-audit-report.md.");

if (primaryCount !== expectedPrimaryCount) {
  throw new Error(`Expected ${expectedPrimaryCount} primary dossiers, generated ${primaryCount}.`);
}

if (failing.length) {
  console.error(`Dossier audit failures: ${failing.length}. See artifacts/dossier-snapshots/dossier-audit-report.md.`);
  process.exitCode = 1;
}

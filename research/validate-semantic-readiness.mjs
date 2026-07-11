import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildProvenanceManifest, validateSemanticPacket } from "./semantic-readiness-lib.mjs";
import { RAW_TO_KEY } from "./build-semantic-readiness-provenance.mjs";

const modulePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(modulePath), "..");

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function parseArgs(argv) {
  const options = { fixtures: false, targets: [], allCertified: false };
  for (const arg of argv) {
    if (arg === "--fixtures") options.fixtures = true;
    else if (arg === "--all-certified") options.allCertified = true;
    else if (arg.startsWith("--targets=")) options.targets.push(...arg.slice(10).split(","));
    else if (arg.startsWith("--target=")) options.targets.push(arg.slice(9));
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!options.fixtures && !options.targets.length && !options.allCertified) options.fixtures = true;
  options.targets = [...new Set(options.targets.map((value) => value.trim().toUpperCase()).filter(Boolean))];
  return options;
}

export async function validateFixture(fileName) {
  const fixture = await readJson(path.join(repoRoot, "research", "fixtures", "semantic-readiness", fileName));
  const rawRecords = {
    [fixture.raw_id]: {
      claims: fixture.claims,
      sources: fixture.sources,
      profile: fixture.profile,
      placement: fixture.placement,
    },
  };
  const ledger = { current_contract_version: "v0", identities: [] };
  const provenance = buildProvenanceManifest({ rawRecords, rawToKey: { [fixture.raw_id]: fixture.identity_key }, ledger });
  return validateSemanticPacket({
    key: fixture.identity_key,
    rawId: fixture.raw_id,
    profile: fixture.profile,
    placement: fixture.placement,
    claimsFile: fixture.claims,
    sourcesFile: fixture.sources,
    provenance,
    requireAllRoles: true,
  });
}

async function validateTarget(key, provenance) {
  const rawId = Object.entries(RAW_TO_KEY).find(([, value]) => value === key)?.[0];
  if (!rawId) return [`Unknown identity target ${key}`];
  const base = path.join(repoRoot, "data", "raw-factions", rawId, rawId);
  const [claimsFile, sourcesFile, profile, placement] = await Promise.all([
    readJson(`${base}.claims.json`), readJson(`${base}.sources.json`), readJson(`${base}.profile.json`), readJson(`${base}.placement.json`),
  ]);
  return validateSemanticPacket({ key, rawId, profile, placement, claimsFile, sourcesFile, provenance, requireAllRoles: true });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const errors = [];
  if (options.fixtures) {
    const invalidErrors = await validateFixture("invalid-discovery-chain.json");
    if (!invalidErrors.some((error) => error.includes("no substantive claim"))) {
      errors.push("Invalid discovery fixture did not fail for role-invalid semantic support");
    }
    const validErrors = await validateFixture("valid-substantive-chain.json");
    if (validErrors.length) errors.push(...validErrors.map((error) => `Valid fixture: ${error}`));
  }
  let targets = options.targets;
  if (options.allCertified) {
    const ledger = await readJson(path.join(repoRoot, "docs", "incidents", "CRIT-001-identity-recovery-ledger.json"));
    targets = ledger.identities.filter((row) => row.workflow.status === "semantically_ready").map((row) => row.identity.key);
  }
  if (targets.length) {
    const provenance = await readJson(path.join(repoRoot, "data", "semantic-readiness-provenance.json"));
    for (const target of targets) errors.push(...(await validateTarget(target, provenance)));
  }
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log(`Semantic readiness validation passed${targets.length ? ` for ${targets.join(", ")}` : " for contract fixtures"}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

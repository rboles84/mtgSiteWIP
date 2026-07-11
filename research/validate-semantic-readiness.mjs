import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildProvenanceManifest, claimEvidenceSourceIds, claimId, claimsArray, inferSemanticRole, validateSemanticPacket } from "./semantic-readiness-lib.mjs";
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

function sameStringSet(left, right) {
  return JSON.stringify([...new Set(left.map(String))].sort()) === JSON.stringify([...new Set(right.map(String))].sort());
}

export async function validateIdentityFixtures({ key, rawId, claimsFile, provenance, ledgerRow, fixtureDocument = null }) {
  const errors = [];
  let document = fixtureDocument;
  if (!document) {
    const fixturePath = path.join(repoRoot, "research", "fixtures", "semantic-readiness", `${rawId}.semantic-fixtures.json`);
    try {
      document = await readJson(fixturePath);
    } catch (error) {
      if (error?.code === "ENOENT") return [`${key}: missing identity semantic fixtures`];
      throw error;
    }
  }
  if (document.identity_key !== key) errors.push(`${key}: semantic fixture identity_key mismatch`);
  if (document.runtime_assertions !== false) errors.push(`${key}: semantic fixtures must explicitly disable runtime assertions`);
  const fixtures = Array.isArray(document.fixtures) ? document.fixtures : [];
  const fixtureIds = fixtures.map((fixture) => fixture.fixture_id).filter(Boolean);
  if (new Set(fixtureIds).size !== fixtureIds.length) errors.push(`${key}: semantic fixture IDs must be unique`);
  for (const requiredType of ["core_inclusion", "mature_or_pressure_behavior", "nearest_collision_ambiguity", "provenance"]) {
    if (!fixtures.some((fixture) => fixture.fixture_type === requiredType)) errors.push(`${key}: missing ${requiredType} semantic fixture`);
  }
  for (const neighbor of ledgerRow?.semantic_review?.required_neighbors || []) {
    if (!fixtures.some((fixture) => fixture.fixture_type === "required_neighbor_exclusion" && fixture.neighbor === neighbor)) {
      errors.push(`${key}: missing exclusion semantic fixture for required neighbor ${neighbor}`);
    }
  }
  const claims = new Map(claimsArray(claimsFile).map((claim) => [claimId(claim), claim]));
  for (const fixture of fixtures) {
    if (!fixture.fixture_id || !fixture.fixture_type || (!fixture.scenario && fixture.fixture_type !== "provenance")) {
      errors.push(`${key}: incomplete semantic fixture ${fixture.fixture_id || "<missing-id>"}`);
    }
    if (!Array.isArray(fixture.evidence_claim_ids) || !fixture.evidence_claim_ids.length) {
      errors.push(`${key} ${fixture.fixture_id}: complete evidence_claim_ids are required`);
      continue;
    }
    if (!Array.isArray(fixture.evidence_source_ids) || !fixture.evidence_source_ids.length) {
      errors.push(`${key} ${fixture.fixture_id}: complete evidence_source_ids are required`);
    }
    const chainSources = [];
    for (const evidenceId of fixture.evidence_claim_ids) {
      const claim = claims.get(String(evidenceId));
      if (!claim) errors.push(`${key} ${fixture.fixture_id}: missing evidence claim ${evidenceId}`);
      else {
        if (inferSemanticRole(claim) !== "substantive_claim") errors.push(`${key} ${fixture.fixture_id}: evidence claim ${evidenceId} is not substantive`);
        chainSources.push(...claimEvidenceSourceIds(claim));
      }
    }
    if (Array.isArray(fixture.evidence_source_ids) && !sameStringSet(fixture.evidence_source_ids, chainSources)) {
      errors.push(`${key} ${fixture.fixture_id}: declared evidence_source_ids do not equal the complete claim source chain`);
    }
    if (fixture.fixture_type === "provenance") {
      const match = provenance.entries?.find((entry) =>
        entry.identity_key === key &&
        entry.canonical_file === fixture.canonical_file &&
        entry.canonical_pointer === fixture.canonical_pointer
      );
      if (!match) errors.push(`${key} ${fixture.fixture_id}: generated provenance entry is missing`);
      else {
        if (!sameStringSet(match.evidence_claim_ids || [], fixture.evidence_claim_ids)) {
          errors.push(`${key} ${fixture.fixture_id}: provenance claim chain differs from the complete declared chain`);
        }
        if (!sameStringSet(match.evidence_source_ids || [], fixture.evidence_source_ids || [])) {
          errors.push(`${key} ${fixture.fixture_id}: provenance source chain differs from the complete declared chain`);
        }
      }
    }
  }
  return errors;
}

async function validateTarget(key, provenance, ledger) {
  const rawId = Object.entries(RAW_TO_KEY).find(([, value]) => value === key)?.[0];
  if (!rawId) return [`Unknown identity target ${key}`];
  const base = path.join(repoRoot, "data", "raw-factions", rawId, rawId);
  const [claimsFile, sourcesFile, profile, placement] = await Promise.all([
    readJson(`${base}.claims.json`), readJson(`${base}.sources.json`), readJson(`${base}.profile.json`), readJson(`${base}.placement.json`),
  ]);
  return [
    ...validateSemanticPacket({ key, rawId, profile, placement, claimsFile, sourcesFile, provenance, requireAllRoles: true }),
    ...(await validateIdentityFixtures({
      key,
      rawId,
      claimsFile,
      provenance,
      ledgerRow: ledger.identities.find((row) => row.identity.key === key),
    })),
  ];
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
    const [provenance, ledger] = await Promise.all([
      readJson(path.join(repoRoot, "data", "semantic-readiness-provenance.json")),
      readJson(path.join(repoRoot, "docs", "incidents", "CRIT-001-identity-recovery-ledger.json")),
    ]);
    for (const target of targets) errors.push(...(await validateTarget(target, provenance, ledger)));
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

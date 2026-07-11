import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFactionContextModule } from "./build-faction-artifacts.mjs";
import { RAW_TO_KEY } from "./build-semantic-readiness-provenance.mjs";
import { stableStringify } from "./semantic-readiness-lib.mjs";

const modulePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(modulePath), "..");

const NATIVE_ID_KEYS = new Set([
  "question_id",
  "collision_id",
  "axis_id",
  "indicator_id",
  "guidance_id",
  "character_id",
  "event_id",
  "claim_id",
  "id",
]);

const FORBIDDEN_FIELD_KEYS = new Set([
  "lateral_inhibition",
  "lateral_inhibition_targets",
  "broad_match_penalty",
  "required_positive_min_hits",
  "calibration_tuning",
  "scoring_guardrail",
  "score_delta",
  "scoring_weights",
  "confidence_formula",
  "confidence_weight",
  "tie_order",
  "scheduling",
  "hall",
  "crucible",
]);

export function isFrozenSharedPath(file) {
  const normalized = file.replaceAll("\\", "/");
  if ([
    "docs/reference/semantic-readiness-contract.md",
    "data/raw-factions/semantic-readiness.schema.json",
    "package.json",
  ].includes(normalized)) return true;
  if (/^research\/(audit-semantic-readiness|build-semantic-readiness-provenance|semantic-readiness-lib|semantic-readiness-tests|semantic-candidate-scope-tests|validate-semantic-candidate-scope|validate-semantic-readiness)\.(?:mjs|js)$/.test(normalized)) return true;
  return [
    "research/fixtures/semantic-readiness/invalid-discovery-chain.json",
    "research/fixtures/semantic-readiness/valid-substantive-chain.json",
  ].includes(normalized);
}

function collectFieldValues(value, keys, pointer = "", results = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((child, index) => collectFieldValues(child, keys, `${pointer}/${index}`, results));
    return results;
  }
  if (!value || typeof value !== "object") return results;
  for (const [key, child] of Object.entries(value)) {
    const childPointer = `${pointer}/${key.replaceAll("~", "~0").replaceAll("/", "~1")}`;
    if (keys.has(key)) results.set(childPointer, child);
    collectFieldValues(child, keys, childPointer, results);
  }
  return results;
}

export function findForbiddenFieldChanges(before, after) {
  const left = collectFieldValues(before, FORBIDDEN_FIELD_KEYS);
  const right = collectFieldValues(after, FORBIDDEN_FIELD_KEYS);
  const changes = [];
  for (const pointer of new Set([...left.keys(), ...right.keys()])) {
    if (stableStringify(left.get(pointer)) !== stableStringify(right.get(pointer))) changes.push(pointer);
  }
  return changes.sort();
}

export function collectNativeIds(value, results = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((child) => collectNativeIds(child, results));
    return results;
  }
  if (!value || typeof value !== "object") return results;
  for (const [key, child] of Object.entries(value)) {
    if (NATIVE_ID_KEYS.has(key) && (typeof child === "string" || typeof child === "number")) results.add(`${key}:${child}`);
    collectNativeIds(child, results);
  }
  return results;
}

export function findMissingNativeIds(beforeDocuments, afterDocuments) {
  const before = collectNativeIds(beforeDocuments);
  const after = collectNativeIds(afterDocuments);
  return [...before].filter((entry) => !after.has(entry)).sort();
}

export function collectReferencedNativeIds(value, results = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((child) => collectReferencedNativeIds(child, results));
    return results;
  }
  if (!value || typeof value !== "object") return results;
  const hasEvidence = Array.isArray(value.claim_ids) || Array.isArray(value.evidence_claim_ids);
  if (hasEvidence) {
    for (const [key, child] of Object.entries(value)) {
      if (NATIVE_ID_KEYS.has(key) && (typeof child === "string" || typeof child === "number")) results.add(String(child));
    }
  }
  Object.values(value).forEach((child) => collectReferencedNativeIds(child, results));
  return results;
}

export function findMissingProvenanceNativeIds({ documents, provenance, identityKey }) {
  const expected = collectReferencedNativeIds(documents);
  const declared = new Set((provenance.entries || []).filter((entry) => entry.identity_key === identityKey).map((entry) => entry.canonical_id).filter(Boolean).map(String));
  return [...expected].filter((id) => !declared.has(id)).sort();
}

export function validateGeneratedConsumerCoverage({ identityKey, changedConsumers, provenance }) {
  const declared = new Set(
    (provenance.entries || [])
      .filter((entry) => entry.identity_key === identityKey)
      .flatMap((entry) => entry.generated_consumers || [])
  );
  return changedConsumers.filter((consumer) => !declared.has(consumer)).map((consumer) => `missing generated provenance consumer ${consumer}`);
}

function parseArgs(argv) {
  const options = { base: null, target: "HEAD", identity: null };
  for (const arg of argv) {
    if (arg.startsWith("--base=")) options.base = arg.slice(7);
    else if (arg.startsWith("--target=")) options.target = arg.slice(9);
    else if (arg.startsWith("--identity=")) options.identity = arg.slice(11).toUpperCase();
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!options.base || !options.identity) throw new Error("Usage: --base=<accepted-sha> --target=<candidate-sha> --identity=<KEY>");
  return options;
}

function gitText(ref, file) {
  return execFileSync("git", ["show", `${ref}:${file}`], { cwd: repoRoot, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function gitJson(ref, file) {
  return JSON.parse(gitText(ref, file));
}

function changedFiles(base, target) {
  return execFileSync("git", ["diff", "--name-only", base, target], { cwd: repoRoot, encoding: "utf8" })
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function identityValue(document, key) {
  return document?.factions?.[key] ?? document?.[key];
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const rawId = Object.entries(RAW_TO_KEY).find(([, key]) => key === options.identity)?.[0];
  if (!rawId) throw new Error(`Unknown identity ${options.identity}`);
  const files = changedFiles(options.base, options.target);
  const errors = [];
  for (const file of files) {
    if (isFrozenSharedPath(file)) errors.push(`identity candidate modified frozen shared file ${file}`);
    if (file.startsWith("data/raw-factions/") && !file.startsWith(`data/raw-factions/${rawId}/`)) {
      errors.push(`identity candidate modified another raw packet or shared raw schema ${file}`);
    }
  }

  const placementFile = `data/raw-factions/${rawId}/${rawId}.placement.json`;
  const profileFile = `data/raw-factions/${rawId}/${rawId}.profile.json`;
  const beforePlacement = gitJson(options.base, placementFile);
  const afterPlacement = gitJson(options.target, placementFile);
  for (const pointer of findForbiddenFieldChanges(beforePlacement, afterPlacement)) errors.push(`forbidden placement field changed ${placementFile}#${pointer}`);

  const beforeProfile = gitJson(options.base, profileFile);
  const afterProfile = gitJson(options.target, profileFile);
  const missingIds = findMissingNativeIds(
    { profile: beforeProfile, placement: beforePlacement },
    { profile: afterProfile, placement: afterPlacement }
  );
  for (const id of missingIds) errors.push(`native canonical ID was not retained: ${id}`);

  const targetProvenance = gitJson(options.target, "data/semantic-readiness-provenance.json");
  for (const id of findMissingProvenanceNativeIds({ documents: { profile: afterProfile, placement: afterPlacement }, provenance: targetProvenance, identityKey: options.identity })) {
    errors.push(`native canonical ID is absent from generated provenance: ${id}`);
  }

  const expectedConsumers = [
    ["data/factions.json", `data/factions.json#/factions/${options.identity}`],
    ["data/placement-model.json", `data/placement-model.json#/factions/${options.identity}`],
  ];
  const changedConsumers = [];
  for (const [file, consumer] of expectedConsumers) {
    if (stableStringify(identityValue(gitJson(options.base, file), options.identity)) !== stableStringify(identityValue(gitJson(options.target, file), options.identity))) changedConsumers.push(consumer);
  }
  const contextFile = "supabase/functions/guild-recruiter/faction-context.ts";
  const beforeContext = parseFactionContextModule(gitText(options.base, contextFile)).factionContext;
  const afterContext = parseFactionContextModule(gitText(options.target, contextFile)).factionContext;
  if (stableStringify(beforeContext[options.identity]) !== stableStringify(afterContext[options.identity])) {
    changedConsumers.push(`supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/${options.identity}`);
  }
  errors.push(...validateGeneratedConsumerCoverage({
    identityKey: options.identity,
    changedConsumers,
    provenance: targetProvenance,
  }));

  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log(`Semantic candidate scope passed for ${options.identity}: ${options.base}..${options.target}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

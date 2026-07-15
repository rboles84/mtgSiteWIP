import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFactionContextModule } from "./build-faction-artifacts.mjs";
import { RAW_TO_KEY } from "./build-semantic-readiness-provenance.mjs";
import { stableStringify } from "./semantic-readiness-lib.mjs";

const modulePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(modulePath), "..");

export function isNativeIdKey(key) {
  return key === "id" || key.endsWith("_id");
}

export function isForbiddenPlacementKey(key) {
  return /(lateral_inhibition|inhibition|calibrat|scor|confidence|tie_order|schedul|hall|crucible|broad_match_penalty|required_positive_min_hits)/i.test(key);
}

export function isFrozenSharedPath(file) {
  const normalized = file.replaceAll("\\", "/");
  if ([
    "docs/reference/semantic-readiness-contract.md",
    "data/raw-factions/semantic-readiness.schema.json",
    "package.json",
  ].includes(normalized)) return true;
  if (normalized.startsWith("research/") && !/^research\/fixtures\/semantic-readiness\/[^/]+\.semantic-fixtures\.json$/.test(normalized)) return true;
  if (normalized.startsWith("assets/js/") || normalized.startsWith("scripts/")) return true;
  if (normalized.startsWith("supabase/functions/") && normalized !== "supabase/functions/guild-recruiter/faction-context.ts") return true;
  if (/\.(?:js|mjs|ts|html|css)$/.test(normalized) && normalized !== "supabase/functions/guild-recruiter/faction-context.ts") return true;
  if (normalized.startsWith("docs/incidents/templates/") || normalized === "docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md" || normalized === "docs/incidents/CRIT-001-contract-v1.1-amendment.md" || normalized === "docs/incidents/CRIT-001-VM-501-prerequisite-correction.md") return true;
  if (normalized.includes("VM-501-faction-semantic-readiness-recovery.md")) return true;
  return [
    "research/fixtures/semantic-readiness/invalid-discovery-chain.json",
    "research/fixtures/semantic-readiness/valid-substantive-chain.json",
  ].includes(normalized);
}

export function isAllowedIdentityCandidatePath(file, rawId) {
  const normalized = file.replaceAll("\\", "/");
  if (isFrozenSharedPath(normalized)) return false;
  if (normalized.startsWith(`data/raw-factions/${rawId}/`)) return true;
  if (normalized === `research/fixtures/semantic-readiness/${rawId}.semantic-fixtures.json`) return true;
  if ([
    "data/factions.json",
    "data/placement-model.json",
    "data/semantic-readiness-provenance.json",
    "supabase/functions/guild-recruiter/faction-context.ts",
  ].includes(normalized)) return true;
  return normalized.startsWith("docs/");
}

function collectFieldValues(value, predicate, pointer = "", results = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((child, index) => collectFieldValues(child, predicate, `${pointer}/${index}`, results));
    return results;
  }
  if (!value || typeof value !== "object") return results;
  for (const [key, child] of Object.entries(value)) {
    const childPointer = `${pointer}/${key.replaceAll("~", "~0").replaceAll("/", "~1")}`;
    if (predicate(key)) results.set(childPointer, child);
    collectFieldValues(child, predicate, childPointer, results);
  }
  return results;
}

export function findForbiddenFieldChanges(before, after) {
  const left = collectFieldValues(before, isForbiddenPlacementKey);
  const right = collectFieldValues(after, isForbiddenPlacementKey);
  const changes = [];
  for (const pointer of new Set([...left.keys(), ...right.keys()])) {
    if (stableStringify(left.get(pointer)) !== stableStringify(right.get(pointer))) changes.push(pointer);
  }
  return changes.sort();
}

function valueAtPointer(value, pointer) {
  if (!pointer) return value;
  return pointer
    .slice(1)
    .split("/")
    .reduce((current, part) => {
      if (current === undefined || current === null) return undefined;
      const key = part.replaceAll("~1", "/").replaceAll("~0", "~");
      return current[key];
    }, value);
}

function isExplicitNonInhibitingAddition(before, after, pointer) {
  return pointer.endsWith("/lateral_inhibition") && valueAtPointer(before, pointer) === undefined && valueAtPointer(after, pointer) === false;
}

export function findForbiddenPlacementBehaviorChanges({ beforePlacement, afterPlacement, beforeGeneratedFaction = null, afterGeneratedFaction = null }) {
  const beforeTargets = beforeGeneratedFaction?.lateral_inhibition_targets || [];
  const afterTargets = afterGeneratedFaction?.lateral_inhibition_targets || [];
  const generatedTargetsChanged = stableStringify(beforeTargets) !== stableStringify(afterTargets);
  const changes = [];
  if (generatedTargetsChanged) changes.push("/generated/lateral_inhibition_targets");
  for (const pointer of findForbiddenFieldChanges(beforePlacement, afterPlacement)) {
    if (isExplicitNonInhibitingAddition(beforePlacement, afterPlacement, pointer) && !generatedTargetsChanged) continue;
    changes.push(pointer);
  }
  return [...new Set(changes)].sort();
}
export function collectNativeIds(value, results = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((child) => collectNativeIds(child, results));
    return results;
  }
  if (!value || typeof value !== "object") return results;
  for (const [key, child] of Object.entries(value)) {
    if (isNativeIdKey(key) && (typeof child === "string" || typeof child === "number")) results.add(`${key}:${child}`);
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
      if (isNativeIdKey(key) && (typeof child === "string" || typeof child === "number")) results.add(String(child));
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

function withoutIdentity(document, identityKey) {
  const copy = structuredClone(document);
  if (copy?.factions && Object.prototype.hasOwnProperty.call(copy.factions, identityKey)) delete copy.factions[identityKey];
  else if (copy && Object.prototype.hasOwnProperty.call(copy, identityKey)) delete copy[identityKey];
  return copy;
}

export function validateUnrelatedGeneratedIsolation({ identityKey, beforeFactions, afterFactions, beforePlacement, afterPlacement, beforeContext, afterContext, beforeContextMeta, afterContextMeta, beforeProvenance, afterProvenance }) {
  const errors = [];
  if (stableStringify(withoutIdentity(beforeFactions, identityKey)) !== stableStringify(withoutIdentity(afterFactions, identityKey))) errors.push("unrelated or global data/factions.json content changed");
  if (stableStringify(withoutIdentity(beforePlacement, identityKey)) !== stableStringify(withoutIdentity(afterPlacement, identityKey))) errors.push("unrelated or global data/placement-model.json content changed");
  if (stableStringify(withoutIdentity(beforeContext, identityKey)) !== stableStringify(withoutIdentity(afterContext, identityKey)) || stableStringify(beforeContextMeta) !== stableStringify(afterContextMeta)) errors.push("unrelated or global recruiter context content changed");
  const beforeOtherProvenance = { ...beforeProvenance, entries: (beforeProvenance.entries || []).filter((entry) => entry.identity_key !== identityKey) };
  const afterOtherProvenance = { ...afterProvenance, entries: (afterProvenance.entries || []).filter((entry) => entry.identity_key !== identityKey) };
  if (stableStringify(beforeOtherProvenance) !== stableStringify(afterOtherProvenance)) errors.push("unrelated or global semantic provenance content changed");
  return errors;
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
    if (!isAllowedIdentityCandidatePath(file, rawId)) errors.push(`identity candidate modified non-identity path ${file}`);
    if (file.startsWith("data/raw-factions/") && !file.startsWith(`data/raw-factions/${rawId}/`)) {
      errors.push(`identity candidate modified another raw packet or shared raw schema ${file}`);
    }
  }

  const placementFile = `data/raw-factions/${rawId}/${rawId}.placement.json`;
  const profileFile = `data/raw-factions/${rawId}/${rawId}.profile.json`;
  const claimsFile = `data/raw-factions/${rawId}/${rawId}.claims.json`;
  const sourcesFile = `data/raw-factions/${rawId}/${rawId}.sources.json`;
  const beforePlacement = gitJson(options.base, placementFile);
  const afterPlacement = gitJson(options.target, placementFile);
  const beforePlacementModel = gitJson(options.base, "data/placement-model.json");
  const afterPlacementModel = gitJson(options.target, "data/placement-model.json");
  for (const pointer of findForbiddenPlacementBehaviorChanges({
    beforePlacement,
    afterPlacement,
    beforeGeneratedFaction: identityValue(beforePlacementModel, options.identity),
    afterGeneratedFaction: identityValue(afterPlacementModel, options.identity),
  })) {
    if (pointer === "/generated/lateral_inhibition_targets") errors.push(`generated lateral inhibition targets changed data/placement-model.json#/factions/${options.identity}/lateral_inhibition_targets`);
    else errors.push(`forbidden placement field changed ${placementFile}#${pointer}`);
  }

  const beforeProfile = gitJson(options.base, profileFile);
  const afterProfile = gitJson(options.target, profileFile);
  const missingIds = findMissingNativeIds(
    { claims: gitJson(options.base, claimsFile), sources: gitJson(options.base, sourcesFile), profile: beforeProfile, placement: beforePlacement },
    { claims: gitJson(options.target, claimsFile), sources: gitJson(options.target, sourcesFile), profile: afterProfile, placement: afterPlacement }
  );
  for (const id of missingIds) errors.push(`native canonical ID was not retained: ${id}`);

  const targetProvenance = gitJson(options.target, "data/semantic-readiness-provenance.json");
  for (const id of findMissingProvenanceNativeIds({ documents: { profile: afterProfile, placement: afterPlacement }, provenance: targetProvenance, identityKey: options.identity })) {
    errors.push(`native canonical ID is absent from generated provenance: ${id}`);
  }

  const beforeFactions = gitJson(options.base, "data/factions.json");
  const afterFactions = gitJson(options.target, "data/factions.json");
  const expectedConsumers = [
    ["data/factions.json", `data/factions.json#/factions/${options.identity}`],
    ["data/placement-model.json", `data/placement-model.json#/factions/${options.identity}`],
  ];
  const changedConsumers = [];
  if (stableStringify(identityValue(beforeFactions, options.identity)) !== stableStringify(identityValue(afterFactions, options.identity))) changedConsumers.push(expectedConsumers[0][1]);
  if (stableStringify(identityValue(beforePlacementModel, options.identity)) !== stableStringify(identityValue(afterPlacementModel, options.identity))) changedConsumers.push(expectedConsumers[1][1]);
  const contextFile = "supabase/functions/guild-recruiter/faction-context.ts";
  const beforeContextDocument = parseFactionContextModule(gitText(options.base, contextFile));
  const afterContextDocument = parseFactionContextModule(gitText(options.target, contextFile));
  const beforeContext = beforeContextDocument.factionContext;
  const afterContext = afterContextDocument.factionContext;
  if (stableStringify(beforeContext[options.identity]) !== stableStringify(afterContext[options.identity])) {
    changedConsumers.push(`supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/${options.identity}`);
  }
  errors.push(...validateGeneratedConsumerCoverage({
    identityKey: options.identity,
    changedConsumers,
    provenance: targetProvenance,
  }));
  errors.push(...validateUnrelatedGeneratedIsolation({
    identityKey: options.identity,
    beforeFactions,
    afterFactions,
    beforePlacement: beforePlacementModel,
    afterPlacement: afterPlacementModel,
    beforeContext,
    afterContext,
    beforeContextMeta: beforeContextDocument.placementModelMeta,
    afterContextMeta: afterContextDocument.placementModelMeta,
    beforeProvenance: gitJson(options.base, "data/semantic-readiness-provenance.json"),
    afterProvenance: targetProvenance,
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

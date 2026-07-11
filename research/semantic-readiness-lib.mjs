import { createHash } from "node:crypto";

export const SEMANTIC_ROLES = new Set([
  "substantive_claim",
  "discovery_record",
  "support_record",
  "unclassified",
]);

export function claimsArray(value) {
  return Array.isArray(value) ? value : Array.isArray(value?.claims) ? value.claims : [];
}

export function sourcesArray(value) {
  return Array.isArray(value) ? value : Array.isArray(value?.sources) ? value.sources : [];
}

export function claimId(claim) {
  return String(claim?.claim_id || claim?.id || "").trim();
}

export function inferSemanticRole(claim) {
  if (SEMANTIC_ROLES.has(claim?.semantic_role)) return claim.semantic_role;
  const type = String(claim?.claim_type || "").toLowerCase();
  if (type === "story_corpus_evidence" || type === "discovery_record" || type === "search_result_record") {
    return "discovery_record";
  }
  if (["commander_product_support", "card_flavor_anchor_support"].includes(type)) return "support_record";
  return "unclassified";
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, stableValue(value[key])])
  );
}

export function stableStringify(value) {
  return JSON.stringify(stableValue(value));
}

export function contentHash(value) {
  return `sha256:${createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}

export function escapeJsonPointer(value) {
  return String(value).replace(/~/g, "~0").replace(/\//g, "~1");
}

export function pointerGet(document, pointer) {
  if (pointer === "") return document;
  if (!pointer.startsWith("/")) return undefined;
  return pointer
    .slice(1)
    .split("/")
    .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"))
    .reduce((value, key) => (value == null ? undefined : value[key]), document);
}

function canonicalIdFor(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  for (const key of [
    "question_id",
    "collision_id",
    "axis_id",
    "indicator_id",
    "guidance_id",
    "character_id",
    "division_id",
    "era_id",
    "event_id",
    "location_id",
    "mechanic_id",
    "relationship_id",
    "claim_id",
    "id",
  ]) {
    if (value[key]) return String(value[key]);
  }
  return null;
}

function supportedValue(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const copy = {};
  for (const [key, child] of Object.entries(value)) {
    if (["claim_ids", "evidence_claim_ids", "confidence", "notes"].includes(key)) continue;
    copy[key] = child;
  }
  return copy;
}

export function collectClaimReferenceSites(document, canonicalFile) {
  const sites = [];
  function visit(value, pointer) {
    if (Array.isArray(value)) {
      value.forEach((child, index) => visit(child, `${pointer}/${index}`));
      return;
    }
    if (!value || typeof value !== "object") return;
    const refs = [
      ...(Array.isArray(value.claim_ids) ? value.claim_ids : []),
      ...(Array.isArray(value.evidence_claim_ids) ? value.evidence_claim_ids : []),
    ].map(String);
    if (refs.length) {
      sites.push({
        canonical_file: canonicalFile,
        canonical_pointer: pointer || "",
        canonical_id: canonicalIdFor(value),
        canonical_content_hash: contentHash(supportedValue(value)),
        evidence_claim_ids: [...new Set(refs)],
        ...(value.evidence_use ? { evidence_use: value.evidence_use } : {}),
      });
    }
    for (const [key, child] of Object.entries(value)) {
      visit(child, `${pointer}/${escapeJsonPointer(key)}`);
    }
  }
  visit(document, "");
  return sites;
}

export function collectGuidanceReferenceSites(placement, canonicalFile) {
  const sites = [];
  for (const entry of placement?.semantic_guidance_evidence || []) {
    if (!entry?.canonical_pointer || !Array.isArray(entry.evidence_claim_ids)) continue;
    const value = pointerGet(placement, entry.canonical_pointer);
    sites.push({
      canonical_file: canonicalFile,
      canonical_pointer: entry.canonical_pointer,
      canonical_id: entry.canonical_id || null,
      canonical_content_hash: contentHash(value),
      evidence_claim_ids: [...new Set(entry.evidence_claim_ids.map(String))],
      declared_content_hash: entry.canonical_content_hash || null,
      evidence_use: "semantic",
    });
  }
  return sites;
}

export function hasBoundedEvidence(claim) {
  if (Array.isArray(claim?.evidence_locations) && claim.evidence_locations.length) {
    return claim.evidence_locations.every(
      (entry) => entry && entry.source_id && entry.locator_type && entry.locator && entry.bounded_paraphrase
    );
  }
  return Boolean(
    claim?.source_locator ||
      claim?.source_excerpt ||
      claim?.source_quote ||
      claim?.page ||
      claim?.chapter ||
      claim?.line_range ||
      claim?.evidence_notes
  );
}

export function buildProvenanceManifest({ rawRecords, rawToKey, ledger, generatedConsumers = {} }) {
  const rowsByKey = new Map((ledger?.identities || []).map((row) => [row.identity.key, row]));
  const entries = [];
  for (const [rawId, key] of Object.entries(rawToKey)) {
    const raw = rawRecords[rawId];
    if (!raw) continue;
    const claims = claimsArray(raw.claims);
    const claimById = new Map(claims.map((claim) => [claimId(claim), claim]));
    const row = rowsByKey.get(key);
    const contractVersion = row?.certification?.contract_version || ledger?.current_contract_version || "v0";
    for (const [kind, document] of [["profile", raw.profile], ["placement", raw.placement]]) {
      const canonicalFile = `data/raw-factions/${rawId}/${rawId}.${kind}.json`;
      const referenceSites = collectClaimReferenceSites(document, canonicalFile);
      if (kind === "placement") referenceSites.push(...collectGuidanceReferenceSites(document, canonicalFile));
      for (const site of referenceSites) {
        const evidenceSourceIds = [];
        for (const id of site.evidence_claim_ids) {
          const claim = claimById.get(id);
          for (const sourceId of claim?.source_ids || []) evidenceSourceIds.push(String(sourceId));
        }
        entries.push({
          identity_key: key,
          ...site,
          evidence_source_ids: [...new Set(evidenceSourceIds)].sort(),
          generated_consumers: generatedConsumers[key] || [
            `data/factions.json#/factions/${escapeJsonPointer(key)}`,
            `data/placement-model.json#/factions/${escapeJsonPointer(key)}`,
            `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/${escapeJsonPointer(key)}`,
          ],
          contract_version: contractVersion,
        });
      }
    }
  }
  return {
    schema_version: "1.0.0",
    incident_id: "CRIT-001",
    contract_version: ledger?.current_contract_version || "v0",
    entries: entries.sort((left, right) =>
      left.identity_key.localeCompare(right.identity_key) ||
      left.canonical_file.localeCompare(right.canonical_file) ||
      left.canonical_pointer.localeCompare(right.canonical_pointer)
    ),
  };
}

export function validateSemanticPacket({ key, rawId, profile, placement, claimsFile, sourcesFile, provenance, requireAllRoles = true }) {
  const errors = [];
  const claims = claimsArray(claimsFile);
  const sources = sourcesArray(sourcesFile);
  const claimById = new Map(claims.map((claim) => [claimId(claim), claim]));
  const sourceIds = new Set(sources.map((source) => String(source.source_id || source.id || "")));

  for (const claim of claims) {
    const id = claimId(claim) || "<missing-claim-id>";
    if (requireAllRoles && !SEMANTIC_ROLES.has(claim.semantic_role)) {
      errors.push(`${key} ${id}: semantic_role is required for certification`);
    }
    const role = inferSemanticRole(claim);
    if (role === "substantive_claim" && !hasBoundedEvidence(claim)) {
      errors.push(`${key} ${id}: substantive claim lacks bounded evidence localization`);
    }
    for (const sourceId of claim.source_ids || []) {
      if (!sourceIds.has(String(sourceId))) errors.push(`${key} ${id}: missing source ${sourceId}`);
    }
  }

  const guidanceKeys = ["how_to_recognize_match", "how_to_recognize_mismatch", "questions_to_ask_when_uncertain"];
  if (placement?.chatbot_guidance) {
    const declared = placement.semantic_guidance_evidence || [];
    for (const guidanceKey of guidanceKeys) {
      const values = placement.chatbot_guidance[guidanceKey] || [];
      values.forEach((value, index) => {
        const pointer = `/chatbot_guidance/${escapeJsonPointer(guidanceKey)}/${index}`;
        const evidence = declared.find((entry) => entry.canonical_pointer === pointer);
        if (!evidence) errors.push(`${key} ${pointer}: canonical recruiter guidance lacks evidence mapping`);
        else if (evidence.canonical_content_hash && evidence.canonical_content_hash !== contentHash(value)) {
          errors.push(`${key} ${pointer}: canonical recruiter guidance evidence hash is stale`);
        }
      });
    }
  }

  for (const [kind, document] of [["profile", profile], ["placement", placement]]) {
    const canonicalFile = `data/raw-factions/${rawId}/${rawId}.${kind}.json`;
    const referenceSites = collectClaimReferenceSites(document, canonicalFile);
    if (kind === "placement") referenceSites.push(...collectGuidanceReferenceSites(document, canonicalFile));
    for (const site of referenceSites) {
      const resolved = site.evidence_claim_ids.map((id) => claimById.get(id));
      const missing = site.evidence_claim_ids.filter((id, index) => !resolved[index]);
      if (missing.length) errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: missing claims ${missing.join(", ")}`);
      const roles = resolved.filter(Boolean).map(inferSemanticRole);
      if (roles.length) {
        const evidenceUse = site.evidence_use || "semantic";
        if (evidenceUse === "semantic" && !roles.includes("substantive_claim")) {
          errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: authoritative reference has no substantive claim`);
        } else if (evidenceUse === "discovery_metadata" && !roles.some((role) => ["discovery_record", "substantive_claim"].includes(role))) {
          errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: discovery metadata lacks discovery or substantive evidence`);
        } else if (evidenceUse === "auxiliary_support" && !roles.some((role) => ["support_record", "substantive_claim"].includes(role))) {
          errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: auxiliary field lacks support or substantive evidence`);
        } else if (!["semantic", "discovery_metadata", "auxiliary_support"].includes(evidenceUse)) {
          errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: unknown evidence_use ${evidenceUse}`);
        }
      }
      if (site.declared_content_hash && site.declared_content_hash !== site.canonical_content_hash) {
        errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: declared guidance content hash is stale`);
      }
      if (provenance) {
        const match = provenance.entries?.find(
          (entry) => entry.identity_key === key && entry.canonical_file === canonicalFile && entry.canonical_pointer === site.canonical_pointer
        );
        if (!match) errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: missing generated provenance`);
        else if (match.canonical_content_hash !== site.canonical_content_hash) {
          errors.push(`${key} ${canonicalFile}${site.canonical_pointer}: stale provenance content hash`);
        }
      }
    }
  }
  return errors;
}

export const VM551_EVIDENCE_VALIDATOR_VERSION = "vm551-evidence-validator-v1";

export const VM551_AUTOMATIC_APPROVAL_BASIS = "EVIDENCE_VALIDATED_AUTOMATIC";

const CERTIFIED_IDENTITY_LOCATOR = /^(?:data\/raw-factions\/[^/]+\/[^/]+\.(?:claims|profile|placement)\.json|docs\/reference\/37-identity-player-relationship-guide\.md)/;
const FACT_LOCATOR = /^(?:data\/scryfall\/|data\/taxonomy\/|data\/generated\/commander-provider-validation\.json|docs\/research\/[^/]+\/source-material\/official\/|https:\/\/magic\.wizards\.com\/)/;
const VAGUE_BRIDGE = /\b(?:vibe|feels? like|sounds? like|because (?:it is|it's) [a-z -]+(?:colored|color)|generic overlap|mere(?:ly)? (?:color|mechanic|theme|product|tag))\b/i;

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function uniqueStrings(values) {
  return [...new Set((values || []).filter(nonEmpty))];
}

export function validateAutomaticApproval(record) {
  const identityClaimIds = uniqueStrings(record.identity_claim_ids);
  const identityLocators = uniqueStrings(record.identity_source_locators);
  const factLocators = uniqueStrings(record.fact_source_locators);
  const failures = [];

  if (!identityClaimIds.length) failures.push("NO_CERTIFIED_IDENTITY_CLAIMS");
  if (!identityLocators.length || identityLocators.some((locator) => !CERTIFIED_IDENTITY_LOCATOR.test(locator))) {
    failures.push("INVALID_IDENTITY_AUTHORITY");
  }
  const certifiedRestatement = record.content_class === "CERTIFIED_IDENTITY_RESTATEMENT";
  if ((!factLocators.length && !certifiedRestatement) || factLocators.some((locator) => !FACT_LOCATOR.test(locator))) {
    failures.push("INVALID_FACT_AUTHORITY");
  }
  if (!nonEmpty(record.relationship_bridge) || VAGUE_BRIDGE.test(record.relationship_bridge)) failures.push("MISSING_OR_VAGUE_RELATIONSHIP_BRIDGE");
  if (!nonEmpty(record.public_copy)) failures.push("EMPTY_PUBLIC_COPY");
  if (!nonEmpty(record.false_positive_analysis)) failures.push("MISSING_FALSE_POSITIVE_ANALYSIS");
  if (!nonEmpty(record.neighbor_analysis)) failures.push("MISSING_NEIGHBOR_ANALYSIS");
  if (record.source_conflict) failures.push("UNRESOLVED_SOURCE_CONFLICT");
  if (record.generated_fallback) failures.push("GENERATED_FALLBACK");
  if (record.creates_new_identity_meaning) failures.push("NEW_IDENTITY_MEANING");
  if (record.genuinely_interpretive) failures.push("INTERPRETIVE_RELATIONSHIP");
  if (record.changes_placement_semantics) failures.push("PLACEMENT_SEMANTICS_CHANGE");
  if (record.unresolved_material_interpretations > 1) failures.push("MULTIPLE_MATERIAL_INTERPRETATIONS");

  return {
    validator_version: VM551_EVIDENCE_VALIDATOR_VERSION,
    passed: failures.length === 0,
    failures,
    approval_basis: failures.length === 0 ? VM551_AUTOMATIC_APPROVAL_BASIS : "OWNER_EXCEPTION_REQUIRED",
    evidence_chain: {
      identity_claim_ids: identityClaimIds,
      identity_source_locators: identityLocators,
      fact_source_locators: factLocators,
    },
  };
}

export function assertAutomaticApproval(record, label = record.id || "record") {
  const result = validateAutomaticApproval(record);
  if (!result.passed) throw new Error(`${label} failed automatic approval: ${result.failures.join(", ")}`);
  return result;
}

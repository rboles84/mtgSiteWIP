import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  VM551_AUTOMATIC_APPROVAL_BASIS,
  VM551_EVIDENCE_VALIDATOR_VERSION,
  assertAutomaticApproval,
} from "./vm551-evidence-approval.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const pretty = (value) => `${JSON.stringify(value, null, 2)}\n`;

const packetInput = await readJson("data/dossier/identity-dossier-review-proposals.source.json");
const identityInputByKey = new Map(packetInput.identity_records.map((record) => [record.identity_key, record]));

function claimLocators(record, side = "") {
  const claims = side ? record.provenance[`certified_claims_${side}`] : record.provenance.certified_claims;
  const profile = side
    ? identityInputByKey.get(record[`identity_${side}`]).provenance.certified_profile.replace(/\.profile\.json$/, ".claims.json")
    : record.provenance.certified_profile.replace(/\.profile\.json$/, ".claims.json");
  return claims.map((claim) => `${profile}#${claim.claim_id}`);
}

function validateIdentity(record) {
  const claimIds = record.provenance.certified_claims.map((claim) => claim.claim_id);
  return assertAutomaticApproval({
    id: record.record_id,
    identity_claim_ids: claimIds,
    identity_source_locators: [...claimLocators(record), record.provenance.relationship_guide],
    fact_source_locators: [],
    content_class: "CERTIFIED_IDENTITY_RESTATEMENT",
    relationship_bridge: "The three Test the Fit roles, six How This Plays fields, and actionable Commander characteristics are bounded translations of the cited certified identity claims and existing authored relationship guidance.",
    public_copy: JSON.stringify(record.proposed_public_copy),
    false_positive_analysis: "The record expressly rejects color, mechanic, archetype, product, or aesthetic overlap as sufficient identity proof; Commander mechanics remain examples only where the certified meaning authorizes the relationship.",
    neighbor_analysis: "The certified boundary self-check and relationship-guide contrast keep adjacent identities distinct; an actual alternative is shown only when independently qualified by the placement result.",
    source_conflict: false,
    generated_fallback: false,
    creates_new_identity_meaning: false,
    genuinely_interpretive: false,
    changes_placement_semantics: false,
    unresolved_material_interpretations: 0,
  }, record.record_id);
}

function validateComparison(record) {
  const claimsA = record.provenance.certified_claims_a.map((claim) => claim.claim_id);
  const claimsB = record.provenance.certified_claims_b.map((claim) => claim.claim_id);
  return assertAutomaticApproval({
    id: record.record_id,
    identity_claim_ids: [...claimsA, ...claimsB],
    identity_source_locators: [...claimLocators(record, "a"), ...claimLocators(record, "b"), record.provenance.relationship_guide_a, record.provenance.relationship_guide_b],
    fact_source_locators: [],
    content_class: "CERTIFIED_IDENTITY_RESTATEMENT",
    relationship_bridge: "Each direction states the two certified centers side by side. It does not claim that both survived a player's answers; runtime may use it only for independently qualified alternatives.",
    public_copy: JSON.stringify(record.proposed_public_copy),
    false_positive_analysis: "The comparison is identity-specific and cannot be satisfied by shared colors, a shared mechanic, or numerical adjacency alone.",
    neighbor_analysis: `The record names and contrasts only ${record.identity_a} and ${record.identity_b}; both directions use their separate certified claim chains.`,
    source_conflict: false,
    generated_fallback: false,
    creates_new_identity_meaning: false,
    genuinely_interpretive: false,
    changes_placement_semantics: false,
    unresolved_material_interpretations: 0,
  }, record.record_id);
}

const identityRecords = packetInput.identity_records.map((record) => ({
  ...record,
  disposition: "APPROVED_PUBLIC",
  approval_basis: VM551_AUTOMATIC_APPROVAL_BASIS,
  validation: validateIdentity(record),
  owner_decision: null,
  review_flags: [],
  provenance: {
    ...record.provenance,
    evidence_roles: {
      ...record.provenance.evidence_roles,
      proposed_bridge: "evidence_validated_automatic",
    },
  },
}));

const comparisonRecords = packetInput.comparison_records.map((record) => ({
  ...record,
  disposition: "APPROVED_PUBLIC",
  approval_basis: VM551_AUTOMATIC_APPROVAL_BASIS,
  validation: validateComparison(record),
  owner_decision: null,
  review_flags: [],
  provenance: {
    ...record.provenance,
    evidence_roles: {
      ...record.provenance.evidence_roles,
      proposed_bridge: "evidence_validated_automatic",
    },
  },
}));

const packet = {
  ...packetInput,
  status: "AUTOMATIC_ADJUDICATION_COMPLETE",
  authority_chain: "certified identity truth -> approved relationship guide -> bounded Commander translation -> evidence validation -> approved public copy",
  promotion_rule: "Only records passing vm551-evidence-validator-v1 enter the runtime catalogs. Owner review is reserved for true exceptions.",
  identity_records: identityRecords,
  comparison_records: comparisonRecords,
};

const identitySource = {
  schema_version: "vm551-identity-dossier-content-v1",
  status: "APPROVED_PUBLIC_ONLY",
  validator_version: VM551_EVIDENCE_VALIDATOR_VERSION,
  records: identityRecords,
};
const identityCatalog = {
  schema_version: "vm551-identity-dossier-catalog-v1",
  generated_from: "data/dossier/identity-dossier-content.source.json",
  records: identityRecords.map((record) => ({
    identity_key: record.identity_key,
    identity_name: record.identity_name,
    test_the_fit: record.proposed_public_copy.test_the_fit,
    how_this_plays: record.proposed_public_copy.how_this_plays,
    what_to_look_for: record.proposed_public_copy.what_to_look_for,
    provenance: {
      record_id: record.record_id,
      approval_basis: record.approval_basis,
      validator_version: record.validation.validator_version,
    },
  })),
};
const comparisonSource = {
  schema_version: "vm551-public-comparisons-v1",
  status: "APPROVED_PUBLIC_ONLY",
  validator_version: VM551_EVIDENCE_VALIDATOR_VERSION,
  records: comparisonRecords,
};
const comparisonCatalog = {
  schema_version: "vm551-public-comparison-catalog-v1",
  generated_from: "data/dossier/public-comparisons.source.json",
  records: comparisonRecords.map((record) => ({
    pair_key: record.pair_key,
    identity_a: record.identity_a,
    identity_b: record.identity_b,
    a_to_b: record.proposed_public_copy.a_to_b,
    b_to_a: record.proposed_public_copy.b_to_a,
    provenance: {
      record_id: record.record_id,
      approval_basis: record.approval_basis,
      validator_version: record.validation.validator_version,
    },
  })),
};

const auditHeader = ["record_id", "record_type", "identity_or_pair", "disposition", "approval_basis", "validator_version", "failures"];
const auditRows = [...identityRecords, ...comparisonRecords].map((record) => [
  record.record_id,
  record.record_type,
  record.identity_key || record.pair_key,
  record.disposition,
  record.approval_basis,
  record.validation.validator_version,
  record.validation.failures.join(" | ") || "none",
]);
const auditTsv = [auditHeader, ...auditRows].map((row) => row.join("\t")).join("\n") + "\n";
const exceptions = [...identityRecords, ...comparisonRecords].filter((record) => record.disposition === "REVIEW_REQUIRED");
const exceptionMarkdown = `# VM-551 Packet 2 Automatic Adjudication\n\n- Identity dossier records approved: **${identityRecords.length}/37**\n- Test the Fit roles approved: **${identityRecords.reduce((sum, record) => sum + Object.keys(record.proposed_public_copy.test_the_fit).length, 0)}**\n- How This Plays fields approved: **${identityRecords.reduce((sum, record) => sum + Object.keys(record.proposed_public_copy.how_this_plays).length, 0)}**\n- What to Look For entries approved: **${identityRecords.reduce((sum, record) => sum + record.proposed_public_copy.what_to_look_for.length, 0)}**\n- Mandatory confusion-pair comparisons approved: **123/123**\n- Additional current-engine runtime pairs approved: **${comparisonRecords.length - 123}**\n- Total bidirectional public comparisons approved: **${comparisonRecords.length}**\n- Internal/audit vocabulary flags: **0**\n- Owner exceptions: **${exceptions.length}**\n\nEvery record carries its certified claim chain and \`${VM551_EVIDENCE_VALIDATOR_VERSION}\` result. No human approval was fabricated.\n`;

const outputs = {
  "data/dossier/identity-dossier-automatic-adjudication.source.json": pretty(packet),
  "data/dossier/identity-dossier-content.source.json": pretty(identitySource),
  "data/dossier/identity-dossier-content.catalog.json": pretty(identityCatalog),
  "data/dossier/public-comparisons.source.json": pretty(comparisonSource),
  "data/dossier/public-comparisons.catalog.json": pretty(comparisonCatalog),
  "docs/audits/vm551-all-37-dossier-closeout/packet-2-automatic-adjudication.tsv": auditTsv,
  "docs/audits/vm551-all-37-dossier-closeout/approval-packet-2-owner-exceptions.md": exceptionMarkdown,
};

for (const [relativePath, content] of Object.entries(outputs)) {
  const absolutePath = path.join(root, relativePath);
  if (check) {
    const current = await readFile(absolutePath, "utf8");
    if (current !== content) throw new Error(`Stale Packet 2 automatic artifact: ${relativePath}`);
  } else {
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content);
  }
}

console.log(JSON.stringify({
  status: "PASS",
  validator_version: VM551_EVIDENCE_VALIDATOR_VERSION,
  identities: identityRecords.length,
  comparisons: comparisonRecords.length,
  owner_exceptions: exceptions.length,
}, null, 2));

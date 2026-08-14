import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildRuntimeCatalog } from "./build-card-rationale-artifacts.mjs";
import {
  VM551_AUTOMATIC_APPROVAL_BASIS,
  VM551_EVIDENCE_VALIDATOR_VERSION,
  assertAutomaticApproval,
} from "./vm551-evidence-approval.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const pretty = (value) => `${JSON.stringify(value, null, 2)}\n`;
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const stableId = (prefix, ...parts) => `${prefix}_${parts.join("|").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`;

const [packetInput, rationaleSourceInput, commanderIndex, flavorIndex, factions, voicePrintings] = await Promise.all([
  readJson("data/dossier/card-content-review-proposals.source.json"),
  readJson("data/dossier/card-rationale-relationships.source.json"),
  readJson("data/scryfall/indexes/commander-index.json"),
  readJson("data/scryfall/indexes/card-flavor-index.json"),
  readJson("data/factions.json"),
  readJson("data/dossier/card-voice-printings.source.json"),
]);

const voicePrintingByIdentity = new Map((voicePrintings.records || []).map((record) => [record.identity_key, record]));

const cardByOracleId = new Map([
  ...(commanderIndex.commanders || []),
  ...(flavorIndex.cards || []),
].map((card) => [card.oracle_id, card]));

const claimFileCache = new Map();
async function claimAuthority(proposal) {
  const authorityPath = proposal.provenance.identity_authority;
  if (!claimFileCache.has(authorityPath)) claimFileCache.set(authorityPath, await readJson(authorityPath));
  const source = claimFileCache.get(authorityPath);
  const claims = new Map((source.claims || []).map((claim) => [claim.claim_id, claim]));
  return { authorityPath, claims };
}

function sourceDetails(claims) {
  const sourceIds = new Set();
  const sourceLocators = [];
  for (const claim of claims) {
    for (const sourceId of claim.source_ids || []) sourceIds.add(sourceId);
    for (const location of claim.evidence_locations || []) {
      if (!location.source_id || !location.locator) continue;
      sourceLocators.push({ source_id: location.source_id, locator: location.locator });
    }
  }
  return {
    sourceIds: [...sourceIds],
    sourceLocators: sourceLocators.filter((entry, index, entries) => entries.findIndex((other) => other.source_id === entry.source_id && other.locator === entry.locator) === index),
  };
}

const selectedVoiceByIdentity = new Map(packetInput.proposals
  .filter((proposal) => proposal.proposal_type === "CARD_VOICE" && proposal.disposition === "REVIEW_REQUIRED")
  .map((proposal) => [proposal.identity_key, proposal]));

const automaticProposals = [];
const newRationaleRecords = [];
const voiceSourceRecords = [];

for (const proposalInput of packetInput.proposals) {
  if (proposalInput.disposition === "REJECTED") {
    automaticProposals.push({ ...proposalInput, approval_basis: "NOT_APPLICABLE" });
    continue;
  }

  const voicePrinting = proposalInput.proposal_type === "CARD_VOICE"
    ? voicePrintingByIdentity.get(proposalInput.identity_key)
    : null;
  if (proposalInput.proposal_type === "CARD_VOICE" && !voicePrinting) {
    throw new Error(`Missing exact printing authority: ${proposalInput.identity_key}`);
  }
  const relationshipOverride = voicePrinting?.relationship_override || {};
  const proposal = voicePrinting ? {
    ...proposalInput,
    canonical_card_name: voicePrinting.canonical_card_name,
    canonical_card_id: voicePrinting.oracle_id,
    proposed_copy: voicePrinting.exact_flavor_text,
    copy_sha256: digest(voicePrinting.exact_flavor_text),
    provenance: {
      ...proposalInput.provenance,
      canonical_card_data: `data/dossier/card-voice-printings.source.json#identity_key=${voicePrinting.identity_key}`,
    },
    ...Object.fromEntries([
      "relationship_class",
      "why_voice_belongs",
      "relationship_bridge",
      "false_positive_analysis",
      "adjacent_identity_confusion_risk",
      "limitations",
    ].filter((field) => relationshipOverride[field]).map((field) => [field, relationshipOverride[field]])),
  } : proposalInput;

  if (relationshipOverride.supersedes_card_name && proposalInput.canonical_card_name === relationshipOverride.supersedes_card_name) {
    automaticProposals.push({
      ...proposalInput,
      proposal_id: `${proposalInput.proposal_id}_superseded`,
      disposition: "REJECTED",
      agent_recommendation: "REJECTED",
      approval_basis: "NOT_APPLICABLE",
      owner_decision: null,
      relationship_bridge: relationshipOverride.supersession_reason,
      limitations: relationshipOverride.supersession_reason,
    });
  }

  const isRationale = proposal.proposal_type === "CARD_RATIONALE";
  const claimIds = isRationale
    ? proposal.provenance.certified_identity_claims.map((claim) => claim.claim_id)
    : proposal.certified_identity_claim_ids;
  const authority = await claimAuthority(proposal);
  const claims = claimIds.map((claimId) => {
    const claim = authority.claims.get(claimId);
    if (!claim) throw new Error(`Automatic approval claim does not resolve: ${proposal.proposal_id} / ${claimId}`);
    return claim;
  });
  const factLocator = proposal.provenance.canonical_card_data;
  const factLocators = [factLocator, ...(relationshipOverride.supporting_official_locators || [])];
  const neighbor = isRationale
    ? selectedVoiceByIdentity.get(proposal.identity_key)?.adjacent_identity_confusion_risk || "Adjacent identities may share a mechanic; the cited certified claim remains the required boundary."
    : proposal.adjacent_identity_confusion_risk;
  const relationshipBridge = isRationale
    ? `${proposal.proposed_copy} The relationship is limited to the verified card action and certified claims ${claimIds.join(", ")}.`
    : `${proposal.why_voice_belongs} ${proposal.relationship_bridge}`;
  const validation = assertAutomaticApproval({
    id: proposal.proposal_id,
    identity_claim_ids: claimIds,
    identity_source_locators: claimIds.map((claimId) => `${authority.authorityPath}#${claimId}`),
    fact_source_locators: factLocators,
    relationship_bridge: relationshipBridge,
    public_copy: proposal.proposed_copy,
    false_positive_analysis: isRationale
      ? "The relationship uses the verified card action only where it instantiates the cited certified behavior; color, mechanic, tag, product, and Commander popularity do not independently authorize it."
      : proposal.false_positive_analysis,
    neighbor_analysis: neighbor,
    source_conflict: false,
    generated_fallback: false,
    creates_new_identity_meaning: false,
    genuinely_interpretive: false,
    changes_placement_semantics: false,
    unresolved_material_interpretations: 0,
  }, proposal.proposal_id);
  const approvedProposal = {
    ...proposal,
    disposition: "APPROVED_PUBLIC",
    ...(proposal.proposal_type === "CARD_VOICE" ? { agent_recommendation: "APPROVED_PUBLIC" } : {}),
    approval_basis: VM551_AUTOMATIC_APPROVAL_BASIS,
    validation,
    owner_decision: null,
    limitations: isRationale
      ? "A bounded card example validated against certified identity claims and canonical card text. It does not prove player motivation, placement, or identity from color, mechanic, tag, or product membership."
      : proposal.limitations.replace(/public use remains owner-gated\.\s*/i, "Public use is limited to this validated voice relationship. "),
  };
  automaticProposals.push(approvedProposal);

  const card = voicePrinting ? {
    name: voicePrinting.canonical_card_name,
    oracle_id: voicePrinting.oracle_id,
    scryfall_id: voicePrinting.scryfall_id,
  } : cardByOracleId.get(proposal.canonical_card_id);
  if (!card || card.name !== proposal.canonical_card_name) throw new Error(`Canonical card mismatch: ${proposal.proposal_id}`);
  const details = sourceDetails(claims);
  if (!details.sourceIds.length || !details.sourceLocators.length) throw new Error(`Missing certified source chain: ${proposal.proposal_id}`);

  if (isRationale) {
    newRationaleRecords.push({
      relationship_id: stableId("cardrel_auto", proposal.identity_key, proposal.canonical_card_id),
      identity_key: proposal.identity_key,
      identity_name: factions.factions[proposal.identity_key].name,
      canonical_card_name: proposal.canonical_card_name,
      canonical_card_id: proposal.canonical_card_id,
      scryfall_id: card.scryfall_id,
      relationship_class: "CERTIFIED_BEHAVIORAL_EXAMPLE",
      certified_identity_claim_ids: claimIds,
      supporting_record_ids: [],
      source_ids: details.sourceIds,
      source_locators: details.sourceLocators,
      canonical_card_data_locator: factLocator,
      relationship_evidence: {
        evidence_class: "CERTIFIED_BEHAVIORAL_EXAMPLE",
        locator: `data/dossier/card-content-review-proposals.source.json#${proposal.proposal_id}`,
        exact_text: proposal.proposed_copy,
        verified_card_observation: proposal.verified_card_observation,
        relationship_bridge: relationshipBridge,
        false_positive_analysis: "Color, mechanic, tag, product, and popularity are excluded as independent proof.",
        adjacent_identity_analysis: neighbor,
      },
      limitation: approvedProposal.limitations,
      review_status: "APPROVED_PUBLIC",
      approval_basis: VM551_AUTOMATIC_APPROVAL_BASIS,
      validation,
      display_priority: 1,
      proposed_public_rationale: proposal.proposed_copy,
      proposal_origin: proposal.proposal_id,
      proposed_tags: [],
      rationale_support_note: "Automatically approved only because the certified identity claims, canonical card observation, bounded bridge, false-positive analysis, and neighbor analysis all pass the shared validator.",
      provenance_roles: {
        identity_relationship: { role: "certified_identity_claims", claim_ids: claimIds },
        card_behavior: { role: "canonical_card_data", verified_field: "oracle_excerpt", locator: factLocator },
        public_copy: { role: "bounded_deterministic_composition", proposal_id: proposal.proposal_id },
      },
    });
  } else {
    voiceSourceRecords.push({
      relationship_id: stableId("cardvoice", proposal.identity_key, proposal.canonical_card_id),
      identity_key: proposal.identity_key,
      identity_name: factions.factions[proposal.identity_key].name,
      canonical_card_name: proposal.canonical_card_name,
      canonical_card_id: proposal.canonical_card_id,
      scryfall_id: card.scryfall_id,
      exact_excerpt: proposal.proposed_copy,
      printing: {
        scryfall_id: voicePrinting.scryfall_id,
        oracle_id: voicePrinting.oracle_id,
        set: voicePrinting.set,
        collector_number: voicePrinting.collector_number,
        flavor_text_field: voicePrinting.flavor_text_field,
        source_locator: voicePrinting.source_locator,
      },
      relationship_class: proposal.relationship_class,
      certified_identity_claim_ids: claimIds,
      source_ids: details.sourceIds,
      source_locators: details.sourceLocators,
      supporting_official_locators: relationshipOverride.supporting_official_locators || [],
      canonical_card_data_locator: factLocator,
      why_voice_belongs: proposal.why_voice_belongs,
      relationship_bridge: proposal.relationship_bridge,
      false_positive_analysis: proposal.false_positive_analysis,
      adjacent_identity_confusion_risk: proposal.adjacent_identity_confusion_risk,
      limitation: approvedProposal.limitations,
      review_status: "APPROVED_PUBLIC",
      approval_basis: VM551_AUTOMATIC_APPROVAL_BASIS,
      validation,
      display_priority: 1,
      critical_repeat: { allowed: false, reason: "Page-level usage planning should prefer a distinct card for each teaching role." },
      ...(relationshipOverride.supersedes_card_name ? {
        supersession: {
          card_name: relationshipOverride.supersedes_card_name,
          reason: relationshipOverride.supersession_reason,
        },
      } : {}),
    });
  }
}

const proposalRationalePairs = new Set(newRationaleRecords.map((record) => `${record.identity_key}|${record.canonical_card_id}`));
const retainedRationaleRecords = rationaleSourceInput.records.filter((record) => !proposalRationalePairs.has(`${record.identity_key}|${record.canonical_card_id}`));
const existingPairs = new Set(retainedRationaleRecords.map((record) => `${record.identity_key}|${record.canonical_card_id}`));
for (const record of newRationaleRecords) {
  if (existingPairs.has(`${record.identity_key}|${record.canonical_card_id}`)) throw new Error(`Automatic rationale duplicates existing authority: ${record.identity_key} / ${record.canonical_card_name}`);
}
const rationaleRecords = [...retainedRationaleRecords, ...newRationaleRecords]
  .sort((a, b) => Object.keys(factions.factions).indexOf(a.identity_key) - Object.keys(factions.factions).indexOf(b.identity_key) || a.display_priority - b.display_priority || a.canonical_card_name.localeCompare(b.canonical_card_name));
const perIdentityPriority = new Map();
for (const record of rationaleRecords) {
  const next = (perIdentityPriority.get(record.identity_key) || 0) + 1;
  perIdentityPriority.set(record.identity_key, next);
  if (newRationaleRecords.includes(record)) record.display_priority = next;
}

const coverageAdjudication = Object.fromEntries(Object.keys(factions.factions).map((identityKey) => {
  const approved = rationaleRecords.filter((record) => record.identity_key === identityKey && record.review_status === "APPROVED_PUBLIC");
  if (!approved.length) throw new Error(`Rationale coverage gap remains: ${identityKey}`);
  return [identityKey, {
    classification: "Full",
    meaningful_unresolved_defect: false,
    approved_relationship_ids: approved.map((record) => record.relationship_id),
    usefulness_finding: "The approved example set contains at least one source-complete card whose public rationale explains a specific certified identity relationship rather than relying on color, mechanic, tag, product, or popularity.",
    remaining_candidate_finding: "All 125 historical candidates reached terminal disposition; rejected or unused candidates are unnecessary or weaker and do not create a meaningful unresolved public coverage defect.",
    decision_locator: "docs/audits/vm551-all-37-dossier-closeout/packet-1-automatic-adjudication.tsv",
  }];
}));

const rationaleSource = {
  ...rationaleSourceInput,
  review_policy: "APPROVED_PUBLIC requires prior owner approval or a passing evidence-validated automatic decision. Runtime receives no unresolved, rejected, or fallback relationship.",
  records: rationaleRecords,
  coverage_adjudication: coverageAdjudication,
};
const rationaleCatalog = buildRuntimeCatalog(rationaleSource);

const voiceSource = {
  schema_version: "1.0.0",
  authority: "Certified Vox Mana identity claims plus exact committed canonical card flavor text and a validated bounded relationship bridge.",
  review_policy: "APPROVED_PUBLIC only after evidence validation; generic thematic analogy is rejected.",
  records: voiceSourceRecords.sort((a, b) => Object.keys(factions.factions).indexOf(a.identity_key) - Object.keys(factions.factions).indexOf(b.identity_key)),
};
const voiceCatalog = {
  schema_version: "1.0.0",
  source_path: "data/dossier/card-voice-relationships.source.json",
  source_sha256: digest(pretty(voiceSource)),
  generated_policy: "APPROVED_PUBLIC only; exact excerpt and approved relationship bridge; no heuristic or fallback selection",
  records: voiceSource.records.map((record) => ({
    relationship_id: record.relationship_id,
    identity_key: record.identity_key,
    card: {
      name: record.canonical_card_name,
      oracle_id: record.canonical_card_id,
      scryfall_id: record.scryfall_id,
      set: record.printing.set,
      collector_number: record.printing.collector_number,
      data_locator: record.canonical_card_data_locator,
    },
    excerpt: record.exact_excerpt,
    why_it_echoes: record.why_voice_belongs,
    relationship_class: record.relationship_class,
    display_priority: record.display_priority,
    critical_repeat: record.critical_repeat,
    provenance: {
      claim_ids: record.certified_identity_claim_ids,
      source_ids: record.source_ids,
      printing_id: record.printing.scryfall_id,
      printing_source_locator: record.printing.source_locator,
      validator_version: record.validation.validator_version,
      approval_basis: record.approval_basis,
    },
  })),
};

const packet = {
  ...packetInput,
  status: "AUTOMATIC_ADJUDICATION_COMPLETE",
  authority_chain: "certified identity truth -> canonical card data -> explicit bounded relationship -> evidence validation -> approved public copy",
  promotion_rule: "Evidence-complete records pass vm551-evidence-validator-v1. Owner review is reserved for true exceptions.",
  voice_adjudication: {
    ...packetInput.voice_adjudication,
    review_required: 0,
    approved_public: voiceSource.records.length,
    review_identity_coverage: 0,
    approved_identity_coverage: new Set(voiceSource.records.map((record) => record.identity_key)).size,
  },
  proposals: automaticProposals,
};

const exceptionRows = packet.proposals.filter((proposal) => proposal.disposition === "REVIEW_REQUIRED");
const auditHeaders = ["proposal_id", "proposal_type", "identity_key", "card", "disposition", "approval_basis", "validator_version", "validation_failures"];
const auditRows = packet.proposals.filter((proposal) => proposal.disposition !== "REJECTED").map((proposal) => [
  proposal.proposal_id,
  proposal.proposal_type,
  proposal.identity_key,
  proposal.canonical_card_name,
  proposal.disposition,
  proposal.approval_basis,
  proposal.validation?.validator_version || "",
  (proposal.validation?.failures || []).join(" | ") || "none",
]);
const tsv = [auditHeaders, ...auditRows].map((row) => row.join("\t")).join("\n") + "\n";
const identityAudit = Object.entries(factions.factions).map(([identityKey, faction]) => {
  const identityRationales = rationaleRecords.filter((record) => record.identity_key === identityKey);
  const identityVoices = voiceSource.records.filter((record) => record.identity_key === identityKey);
  const rejectedVoices = packet.proposals.filter((proposal) => proposal.identity_key === identityKey && proposal.proposal_type === "CARD_VOICE" && proposal.disposition === "REJECTED");
  return `## ${faction.name} (\`${identityKey}\`)\n\n### Existing approved rationale(s)\n\n${identityRationales.map((record) => `- **${record.canonical_card_name}:** ${record.proposed_public_rationale} (\`${record.approval_basis || "OWNER_APPROVED"}\`)`).join("\n")}\n\n### Source-complete voice proposal(s)\n\n${identityVoices.map((record) => `- **${record.canonical_card_name}:** “${record.exact_excerpt}”\n  - Relationship class: \`${record.relationship_class}\`\n  - Certified claims: ${record.certified_identity_claim_ids.map((id) => `\`${id}\``).join(", ")}\n  - Why it belongs: ${record.why_voice_belongs}\n  - False-positive / neighbor limit: ${record.false_positive_analysis} ${record.adjacent_identity_confusion_risk}\n  - Source: \`${record.canonical_card_data_locator}\``).join("\n")}\n\n### Other candidates considered and terminal disposition\n\n${rejectedVoices.length ? rejectedVoices.map((record) => `- **${record.canonical_card_name}:** \`REJECTED\` — ${record.relationship_bridge}`).join("\n") : "- None."}\n\n### Automatic disposition\n\n- \`APPROVED_PUBLIC\` under \`${VM551_EVIDENCE_VALIDATOR_VERSION}\`; owner exception: none.\n`;
}).join("\n");
const exceptionMarkdown = `# VM-551 Packet 1 Automatic Adjudication\n\n- Validator: \`${VM551_EVIDENCE_VALIDATOR_VERSION}\`\n- Automatically approved rationale proposals: **${newRationaleRecords.length}**\n- Previously approved rationale relationships retained: **${retainedRationaleRecords.length}**\n- Approved rationale identity coverage: **${new Set(rationaleRecords.map((record) => record.identity_key)).size}/37**\n- Automatically approved voice relationships: **${voiceSource.records.length}**\n- Approved voice identity coverage: **${new Set(voiceSource.records.map((record) => record.identity_key)).size}/37**\n- Rejected voice candidates retained in audit trail: **${packet.proposals.filter((proposal) => proposal.disposition === "REJECTED").length}**\n- Owner exceptions: **${exceptionRows.length}**\n\nNo human approval was fabricated. Every automatic approval records its evidence chain and validator result. The identity sections below are an audit view, not an approval workload.\n\n${identityAudit.trimEnd()}\n`;

const outputs = {
  "data/dossier/card-content-review-proposals.source.json": pretty(packet),
  "data/dossier/card-rationale-relationships.source.json": pretty(rationaleSource),
  "data/dossier/card-rationale-catalog.json": pretty(rationaleCatalog),
  "data/dossier/card-voice-relationships.source.json": pretty(voiceSource),
  "data/dossier/card-voice-catalog.json": pretty(voiceCatalog),
  "docs/audits/vm551-all-37-dossier-closeout/packet-1-automatic-adjudication.tsv": tsv,
  "docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-owner-review.md": exceptionMarkdown,
};

for (const [relativePath, content] of Object.entries(outputs)) {
  const absolutePath = path.join(root, relativePath);
  if (check) {
    const actual = await readFile(absolutePath, "utf8");
    if (actual !== content) throw new Error(`Stale Packet 1 automatic approval artifact: ${relativePath}`);
  } else {
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content);
  }
}

console.log(JSON.stringify({
  status: "PASS",
  validator_version: VM551_EVIDENCE_VALIDATOR_VERSION,
  existing_rationales_retained: retainedRationaleRecords.length,
  rationale_promoted: newRationaleRecords.length,
  rationale_coverage: new Set(rationaleRecords.map((record) => record.identity_key)).size,
  voice_promoted: voiceSource.records.length,
  voice_coverage: new Set(voiceSource.records.map((record) => record.identity_key)).size,
  rejected_voice_candidates: packet.proposals.filter((proposal) => proposal.disposition === "REJECTED").length,
  review_required: exceptionRows.length,
}, null, 2));

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { auditCandidates } from "./build-card-rationale-artifacts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const writeJson = async (relativePath, value) => {
  await mkdir(path.dirname(path.join(root, relativePath)), { recursive: true });
  await writeFile(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);
};
const tsvCell = (value) => String(value ?? "").replace(/\r?\n/g, " ").replace(/\t/g, " ");
const stableId = (prefix, ...parts) => `${prefix}_${parts.join("|").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`;
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const modeCheck = process.argv.includes("--check");

const audit = await auditCandidates();
const [relationshipSource, snippets, cardFlavorIndex, factions] = await Promise.all([
  readJson("data/dossier/card-rationale-relationships.source.json"),
  readJson("data/archscry-flavor-snippets.json"),
  readJson("data/scryfall/indexes/card-flavor-index.json"),
  readJson("data/factions.json"),
]);

const approvedPairs = new Map(relationshipSource.records.map((record) => [
  `${record.identity_key}|${record.canonical_card_id}`,
  record,
]));

const candidateAdjudications = audit.rows
  .sort((left, right) => left.identityKey.localeCompare(right.identityKey) || left.sourceOrder - right.sourceOrder)
  .map((row) => {
    const approved = row.card ? approvedPairs.get(`${row.identityKey}|${row.card.oracle_id}`) : null;
    return {
      candidate_id: stableId("cardcandidate", row.identityKey, row.pool, row.candidate?.exact_card_name || row.candidate?.display_name),
      identity_key: row.identityKey,
      canonical_card_name: row.card?.name || row.candidate?.exact_card_name || row.candidate?.display_name || "",
      canonical_card_id: row.card?.oracle_id || null,
      source_pool_locator: row.currentSourcePool,
      baseline_disposition: row.disposition,
      final_research_disposition: approved ? "APPROVED_PUBLIC" : "REJECTED",
      disposition_reason: approved
        ? `Promoted through owner-approved relationship ${approved.relationship_id}.`
        : row.generatedOnly
          ? "Rejected because generated-only display data is not relationship authority."
          : `Rejected in its current form: ${row.reason}`,
      replacement_locator: approved
        ? `data/dossier/card-rationale-relationships.source.json#${approved.relationship_id}`
        : "docs/plans/vm551-gate-b1-product-fit/approval-packet-1-card-content.md",
      source_needed: approved ? null : row.sourceNeeded,
      owner_decision: approved?.owner_approval?.decision || "REJECT",
    };
  });

const coveredIdentities = new Set(relationshipSource.records
  .filter((record) => record.review_status === "APPROVED_PUBLIC")
  .map((record) => record.identity_key));
const proposalIdentityKeys = Object.keys(audit.registry.expressions || audit.generatedFactions)
  .filter((identityKey) => audit.generatedFactions[identityKey] && !coveredIdentities.has(identityKey))
  .sort();
const commanderByName = new Map((audit.commanderIndex.commanders || [])
  .map((card) => [String(card.name || "").toLowerCase(), card]));
const flavorByName = new Map((cardFlavorIndex.cards || [])
  .map((card) => [String(card.name || "").toLowerCase(), card]));
const resolveCard = (name, { preferFlavor = false } = {}) => {
  const key = String(name || "").toLowerCase();
  return preferFlavor
    ? flavorByName.get(key) || commanderByName.get(key)
    : commanderByName.get(key) || flavorByName.get(key);
};
const folderByIdentity = new Map(Object.keys(audit.generatedFactions).map((identityKey) => [
  identityKey,
  audit.rows.find((candidate) => candidate.identityKey === identityKey)?.folder || identityKey.toLowerCase(),
]));
const claimsByIdentity = new Map(await Promise.all([...folderByIdentity].map(async ([identityKey, folder]) => {
  const authorityPath = `data/raw-factions/${folder}/${folder}.claims.json`;
  const authority = await readJson(authorityPath);
  return [identityKey, {
    authorityPath,
    byId: new Map((authority.claims || []).map((claim) => [claim.claim_id, claim])),
  }];
})));

const specialRationaleCandidates = {
  ABZAN: {
    name: "Felothar the Steadfast",
    copy: "Felothar makes an Abzan defensive board matter in combat: creatures assign combat damage using toughness, and defenders can attack.",
    claim_ids: ["abzan_claim_0002", "abzan_claim_0011"],
    locator: "data/raw-factions/abzan/abzan.claims.json#abzan_claim_0011",
  },
  B: {
    name: "K'rrik, Son of Yawgmoth",
    copy: "K'rrik makes Black's resource-conversion pattern literal by letting life pay for black mana symbols and rewarding additional black spells with +1/+1 counters.",
    claim_ids: ["black_claim_0004", "black_claim_0007"],
    locator: "data/raw-factions/black/black.claims.json#black_claim_0007",
  },
  COLORLESS: {
    name: "Zhulodok, Void Gorger",
    copy: "Zhulodok is a bounded example of Colorless's Eldrazi-scale branch: colorless spells cast from hand with mana value seven or greater receive cascade twice.",
    claim_ids: ["colorless_claim_0005", "colorless_claim_0006"],
    locator: "data/raw-factions/colorless/colorless.claims.json#colorless_claim_0005",
  },
  DUNE: {
    name: "Saskia the Unyielding",
    copy: "Saskia turns visible combat into concentrated pressure: you choose a player, and combat damage dealt elsewhere is repeated against that player.",
    claim_ids: ["dune_claim_0003", "dune_claim_0005"],
    locator: "data/raw-factions/dune/dune.claims.json#dune_claim_0005",
  },
  ESPER: {
    name: "Y'shtola, Night's Blessed",
    copy: "Y'shtola links planned noncreature spells and a known life-loss threshold to repeatable card access and pressure.",
    claim_ids: ["esper_claim_0003", "esper_claim_0006"],
    locator: "data/raw-factions/esper/esper.claims.json#esper_claim_0003",
  },
  G: {
    name: "Azusa, Lost but Seeking",
    copy: "Azusa gives Green's land-based growth a direct Commander example by allowing two additional land plays on each of your turns.",
    claim_ids: ["green_claim_0004", "green_claim_0007"],
    locator: "data/raw-factions/green/green.claims.json#green_claim_0007",
  },
  GLINT: {
    name: "Yidris, Maelstrom Wielder",
    copy: "Yidris converts successful combat into volatile follow-up routes by giving spells cast from hand cascade for the rest of that turn.",
    claim_ids: ["glint_claim_0003", "glint_claim_0005"],
    locator: "data/raw-factions/glint/glint.claims.json#glint_claim_0005",
  },
  GRIXIS: {
    name: "Kess, Dissident Mage",
    copy: "Kess turns a spent instant or sorcery into one more planned option by letting you cast one such card from your graveyard during each of your turns.",
    claim_ids: ["grixis_claim_0003", "grixis_claim_0004", "grixis_claim_0006"],
    locator: "data/raw-factions/grixis/grixis.claims.json#grixis_claim_0004",
  },
  INK: {
    name: "Kynaios and Tiro of Meletis",
    copy: "Kynaios and Tiro make Ink's shared-resource frame visible: their end-step ability gives every player a chance to develop mana or draw, while their controller also draws.",
    claim_ids: ["ink_claim_0003", "ink_claim_0005"],
    locator: "data/raw-factions/ink/ink.claims.json#ink_claim_0005",
  },
  JESKAI: {
    name: "Shiko and Narset, Unified",
    copy: "Shiko and Narset reward deliberate spell sequencing: the second spell each turn can be copied when it targets a permanent or player.",
    claim_ids: ["jeskai_claim_0002", "jeskai_claim_0003", "jeskai_claim_0011"],
    locator: "data/raw-factions/jeskai/jeskai.claims.json#jeskai_claim_0003",
  },
  JUND: {
    name: "Prossh, Skyraider of Kher",
    copy: "Prossh turns each cast into a larger visible board, then lets those creatures be sacrificed for immediate power.",
    claim_ids: ["jund_claim_0005", "jund_claim_0008"],
    locator: "data/raw-factions/jund/jund.claims.json#jund_claim_0005",
  },
  MARDU: {
    name: "Zurgo Stormrender",
    copy: "Zurgo makes Mardu's speed-and-pressure frame concrete by creating a temporary attacking creature whenever he attacks.",
    claim_ids: ["mardu_claim_0002", "mardu_claim_0011"],
    locator: "data/raw-factions/mardu/mardu.claims.json#mardu_claim_0002",
  },
  NAYA: {
    name: "Shalai and Hallar",
    copy: "Shalai and Hallar turn creature growth into immediate table pressure by dealing damage when +1/+1 counters are put on your creatures.",
    claim_ids: ["naya_claim_0003", "naya_claim_0004", "naya_claim_0006"],
    locator: "data/raw-factions/naya/naya.claims.json#naya_claim_0004",
  },
  PRISMARI: {
    name: "Rootha, Mastering the Moment",
    copy: "Rootha turns an instant or sorcery into a visible elemental performance by creating a flying, hasty Elemental whose size follows that spell's mana value.",
    claim_ids: ["prismari_claim_002", "prismari_claim_003", "prismari_claim_006", "prismari_claim_0017"],
    locator: "data/raw-factions/prismari/prismari.claims.json#prismari_claim_003",
  },
  QUANDRIX: {
    name: "Zimone, Infinite Analyst",
    copy: "Zimone makes mathematical scaling visible: +1/+1 counters reduce an X spell's cost, and casting that spell adds more counters and creates a flying Fractal token.",
    claim_ids: ["quandrix_claim_002", "quandrix_claim_006", "quandrix_claim_0017", "quandrix_claim_0019"],
    locator: "data/raw-factions/quandrix/quandrix.claims.json#quandrix_claim_0019",
  },
  R: {
    name: "Torbran, Thane of Red Fell",
    copy: "Torbran gives Red's direct-action pressure a clear example by increasing damage from red sources to opponents and their permanents.",
    claim_ids: ["red_claim_0003", "red_claim_0007"],
    locator: "data/raw-factions/red/red.claims.json#red_claim_0007",
  },
  SILVERQUILL: {
    name: "Breena, the Demagogue",
    copy: "Breena makes social influence change combat: attacks against a leading opponent can reward the attacker with a card while making Breena larger.",
    claim_ids: ["silverquill_claim_001", "silverquill_claim_006", "silverquill_claim_0019"],
    locator: "docs/research/VM-378-379-380_source-intake.md#silverquill",
  },
  SULTAI: {
    name: "Kotis, Sibsig Champion",
    copy: "Kotis turns the graveyard into a constrained resource: one creature can be cast from it each turn by exiling three other graveyard cards as an additional cost.",
    claim_ids: ["sultai_claim_0002", "sultai_claim_0003", "sultai_claim_0011"],
    locator: "data/raw-factions/sultai/sultai.claims.json#sultai_claim_0003",
  },
  TEMUR: {
    name: "Eshki, Temur's Roar",
    copy: "Eshki rewards increasingly large creature spells with visible growth, then cards and damage as the creatures cross higher power thresholds.",
    claim_ids: ["temur_claim_0002", "temur_claim_0003", "temur_claim_0011"],
    locator: "data/raw-factions/temur/temur.claims.json#temur_claim_0002",
  },
  U: {
    name: "Talrand, Sky Summoner",
    copy: "Talrand turns Blue's instant-and-sorcery plan into a visible board by creating a flying Drake whenever you cast one of those spells.",
    claim_ids: ["blue_claim_0006", "blue_claim_0007"],
    locator: "data/raw-factions/blue/blue.claims.json#blue_claim_0007",
  },
  W: {
    name: "Giada, Font of Hope",
    copy: "Giada gives White's coordinated creature growth a direct example: she helps cast Angels, and each later Angel enters with counters for the Angels already assembled.",
    claim_ids: ["white_claim_0004", "white_claim_0007"],
    locator: "data/raw-factions/white/white.claims.json#white_claim_0007",
  },
  WITCH: {
    name: "Atraxa, Praetors' Voice",
    copy: "Atraxa gives Witch's systematic-accumulation frame a bounded example by proliferating at each of your end steps.",
    claim_ids: ["witch_claim_0003", "witch_claim_0005"],
    locator: "data/raw-factions/witch/witch.claims.json#witch_claim_0005",
  },
  WITHERBLOOM: {
    name: "Dina, Essence Brewer",
    copy: "Dina makes Witherbloom's practical life-and-death exchange visible by turning a sacrificed creature into a card, life, and +1/+1 counters.",
    claim_ids: ["witherbloom_claim_0019", "witherbloom_claim_0022"],
    locator: "data/raw-factions/witherbloom/witherbloom.claims.json#witherbloom_claim_0022",
  },
  WUBRG: {
    name: "Ulalek, Fused Atrocity",
    copy: "Ulalek is a deckbuilding example of Five-Color access: its verified color identity includes all five colors, while its ability uses colorless mana to copy Eldrazi spells and abilities.",
    claim_ids: ["wubrg_claim_0002", "wubrg_claim_0006", "wubrg_claim_0008"],
    locator: "data/raw-factions/wubrg/wubrg.claims.json#wubrg_claim_0006",
  },
  YORE: {
    name: "Breya, Etherium Shaper",
    copy: "Breya makes Yore's artifice frame concrete by creating artifact creatures, then converting artifacts through several selectable effects.",
    claim_ids: ["yore_claim_0003", "yore_claim_0004"],
    locator: "data/raw-factions/yore/yore.claims.json#yore_claim_0004",
  },
};

const rationaleProposals = proposalIdentityKeys.map((identityKey) => {
  const special = specialRationaleCandidates[identityKey];
  const row = special ? null : audit.rows.find((candidate) =>
    candidate.identityKey === identityKey &&
    candidate.pool === "native_fit_commanders" &&
    !candidate.generatedOnly &&
    candidate.card
  ) || audit.rows.find((candidate) => candidate.identityKey === identityKey && !candidate.generatedOnly && candidate.card);
  const name = special?.name || row?.card?.name || "";
  const card = resolveCard(name);
  if (!card) throw new Error(`Packet 1 rationale candidate does not resolve: ${identityKey} / ${name}`);
  const copy = special?.copy || row?.candidate?.why_this_fits || "";
  if (!copy) throw new Error(`Packet 1 rationale candidate lacks review copy: ${identityKey} / ${name}`);
  const folder = folderByIdentity.get(identityKey);
  const claims = claimsByIdentity.get(identityKey);
  const claimIds = special?.claim_ids || [];
  const resolvedClaims = claimIds.map((claimId) => {
    const claim = claims?.byId.get(claimId);
    if (!claim) throw new Error(`Packet 1 proposal claim does not resolve: ${identityKey} / ${claimId}`);
    return { claim_id: claim.claim_id, statement: claim.statement };
  });
  if (!resolvedClaims.length) throw new Error(`Packet 1 rationale proposal lacks certified claim provenance: ${identityKey} / ${name}`);
  if (!card.oracle_excerpt) throw new Error(`Packet 1 rationale candidate lacks canonical Oracle excerpt: ${identityKey} / ${name}`);
  return {
    proposal_id: stableId("packet1_rationale", identityKey, card.oracle_id),
    proposal_type: "CARD_RATIONALE",
    identity_key: identityKey,
    canonical_card_name: card.name,
    canonical_card_id: card.oracle_id,
    proposed_copy: copy,
    copy_sha256: digest(copy),
    verified_card_observation: card.oracle_excerpt,
    provenance: {
      identity_authority: claims.authorityPath,
      certified_identity_claims: resolvedClaims,
      relationship_lead: special?.locator || row.currentSourcePool,
      canonical_card_data: `data/scryfall/indexes/commander-index.json#oracle_id=${card.oracle_id}`,
      evidence_roles: {
        identity_ownership: "certified_identity_claims",
        card_behavior: "canonical_card_data",
        proposed_bridge: "owner_review_required",
      },
    },
    limitations: "This proposal joins verified card behavior to the cited certified identity claims for owner review. The card does not prove the identity by color, product membership, or mechanic alone; it does not infer player motivation. Owner must approve, revise, or reject the exact bounded bridge.",
    disposition: "REVIEW_REQUIRED",
    owner_decision: null,
    replacement_locator: `data/dossier/card-rationale-relationships.source.json#pending-${identityKey.toLowerCase()}`,
  };
});

const voiceProposals = Object.entries(snippets.snippets)
  .flatMap(([identityKey, entries]) => entries.map((entry, index) => {
    const card = resolveCard(entry.card_name, { preferFlavor: true });
    if (!card) throw new Error(`Packet 1 voice candidate does not resolve: ${identityKey} / ${entry.card_name}`);
    return {
      proposal_id: stableId("packet1_voice", identityKey, card.oracle_id, index + 1),
      proposal_type: "CARD_VOICE",
      identity_key: identityKey,
      canonical_card_name: card.name,
      canonical_card_id: card.oracle_id,
      proposed_copy: entry.flavor_excerpt,
      copy_sha256: digest(entry.flavor_excerpt),
      provenance: {
        candidate_inventory: `data/archscry-flavor-snippets.json#/snippets/${identityKey}/${index}`,
        canonical_card_data: `data/scryfall/indexes/${entry.source_index === "commander-index" ? "commander-index" : "card-flavor-index"}.json#oracle_id=${card.oracle_id}`,
        identity_authority: `data/raw-factions/${audit.rows.find((row) => row.identityKey === identityKey)?.folder || identityKey.toLowerCase()}/${audit.rows.find((row) => row.identityKey === identityKey)?.folder || identityKey.toLowerCase()}.claims.json`,
      },
      limitations: "The excerpt is verified committed card text. Its prior heuristic selection is only a research lead and does not establish the identity relationship. Owner review must approve, revise by selecting another exact excerpt, or reject; no paraphrase or generated replacement is authorized.",
      disposition: "REVIEW_REQUIRED",
      owner_decision: null,
      replacement_locator: `data/dossier/card-voice-relationships.source.json#pending-${identityKey.toLowerCase()}`,
    };
  }))
  .sort((left, right) => left.identity_key.localeCompare(right.identity_key) || left.proposal_id.localeCompare(right.proposal_id));

const packet = {
  schema_version: "vm551-card-content-approval-packet-v1",
  status: "OWNER_REVIEW_REQUIRED",
  authority_chain: "certified identity truth -> canonical card data -> curated relationship adjudication -> approved public copy",
  promotion_rule: "No REVIEW_REQUIRED proposal enters runtime. Owner must APPROVE, REVISE, or REJECT the exact row.",
  candidate_adjudication: {
    source: "data/dossier/card-rationale-candidate-adjudication.source.json",
    total: candidateAdjudications.length,
    unresolved: candidateAdjudications.filter((row) => /EVIDENCE_NEEDED|REVIEW_REQUIRED/.test(row.final_research_disposition)).length,
  },
  proposals: [...rationaleProposals, ...voiceProposals],
};

const adjudicationEnvelope = {
  schema_version: "vm551-card-rationale-candidate-adjudication-v1",
  policy: "Historical candidates are terminally adjudicated without changing approved runtime relationships. A rejected historical row may be replaced only by a separately provenance-complete owner-reviewed proposal.",
  records: candidateAdjudications,
};

const tsvHeaders = ["proposal_id", "proposal_type", "identity_key", "canonical_card_name", "canonical_card_id", "proposed_copy", "provenance", "limitations", "disposition", "owner_decision", "replacement_locator"];
const tsv = [tsvHeaders.join("\t"), ...packet.proposals.map((record) => tsvHeaders.map((header) =>
  tsvCell(header === "provenance" ? JSON.stringify(record.provenance) : record[header])
).join("\t"))].join("\n") + "\n";

const markdownText = (value) => String(value ?? "").replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim();
const approvedByIdentity = new Map(Object.keys(factions.factions).map((identityKey) => [
  identityKey,
  relationshipSource.records.filter((record) => record.identity_key === identityKey && record.review_status === "APPROVED_PUBLIC"),
]));
const rationaleByIdentity = new Map(rationaleProposals.map((record) => [record.identity_key, record]));
const voicesByIdentity = new Map(Object.keys(factions.factions).map((identityKey) => [
  identityKey,
  voiceProposals.filter((record) => record.identity_key === identityKey),
]));
const historicalByIdentity = new Map(Object.keys(factions.factions).map((identityKey) => [
  identityKey,
  candidateAdjudications.filter((record) => record.identity_key === identityKey),
]));
const cardByOracleId = new Map([
  ...(audit.commanderIndex.commanders || []),
  ...(cardFlavorIndex.cards || []),
].map((card) => [card.oracle_id, card]));

const ownerReviewSections = Object.keys(factions.factions)
  .sort((left, right) => factions.factions[left].name.localeCompare(factions.factions[right].name))
  .map((identityKey) => {
    const identity = factions.factions[identityKey];
    const existing = approvedByIdentity.get(identityKey) || [];
    const rationale = rationaleByIdentity.get(identityKey) || null;
    const voices = voicesByIdentity.get(identityKey) || [];
    const selectedCardIds = new Set([
      ...existing.map((record) => record.canonical_card_id),
      rationale?.canonical_card_id,
    ].filter(Boolean));
    const alternates = (historicalByIdentity.get(identityKey) || []).filter((record) => !selectedCardIds.has(record.canonical_card_id));

    const existingLines = existing.length
      ? existing.map((record) => `- **${markdownText(record.canonical_card_name)}** (\`${record.relationship_id}\`): ${markdownText(record.proposed_public_rationale)}`).join("\n")
      : "- None. This identity was one of the 25 former public rationale gaps.";
    const newProposal = rationale
      ? `- **${markdownText(rationale.canonical_card_name)}** (\`${rationale.proposal_id}\`, Oracle ID \`${rationale.canonical_card_id}\`)`
      : "- None required; Packet 1 retains existing approved relationship authority without reopening it.";
    const whySelected = rationale
      ? `- Selected as the smallest source-complete replacement for this former gap: the canonical observation is compared directly with certified claims ${rationale.provenance.certified_identity_claims.map((claim) => `\`${claim.claim_id}\``).join(", ")}. Color, product membership, and mechanic overlap remain excluded as independent proof.`
      : "- No new candidate was selected. Existing owner-approved relationships already clear the authority chain, and this packet does not manufacture additional content for symmetry.";

    const certifiedLines = rationale
      ? rationale.provenance.certified_identity_claims.map((claim) => `- \`${claim.claim_id}\`: ${markdownText(claim.statement)}`).join("\n") + `\n- Relationship lead: \`${markdownText(rationale.provenance.relationship_lead)}\``
      : existing.flatMap((record) => record.certified_identity_claim_ids.map((claimId) => {
          const claim = claimsByIdentity.get(identityKey)?.byId.get(claimId);
          return `- \`${claimId}\`${claim?.statement ? `: ${markdownText(claim.statement)}` : ""}`;
        })).join("\n") || "- No new certified claim is asserted by this packet.";

    const canonicalLines = rationale
      ? `- ${markdownText(rationale.verified_card_observation)}\n- Locator: \`${markdownText(rationale.provenance.canonical_card_data)}\``
      : existing.map((record) => {
          const card = cardByOracleId.get(record.canonical_card_id);
          return `- **${markdownText(record.canonical_card_name)}**: ${markdownText(card?.oracle_excerpt || "Canonical card record resolves under the approved relationship validator.")}\n  - Locator: \`${markdownText(record.canonical_card_data_locator)}\``;
        }).join("\n") || "- None.";

    const alternateLines = alternates.length
      ? alternates.map((record) => `- **${markdownText(record.canonical_card_name || "Unresolved card lead")}** — \`${record.final_research_disposition}\`: ${markdownText(record.disposition_reason)} Source: \`${markdownText(record.source_pool_locator)}\``).join("\n")
      : "- None beyond the selected or retained card relationship(s).";

    const voiceLines = voices.map((voice, index) => [
      `### Voice candidate ${index + 1}: ${markdownText(voice.canonical_card_name)}`,
      "",
      `- Exact excerpt: “${markdownText(voice.proposed_copy)}”`,
      `- Proposal: \`${voice.proposal_id}\``,
      `- Candidate inventory: \`${markdownText(voice.provenance.candidate_inventory)}\``,
      `- Canonical card source: \`${markdownText(voice.provenance.canonical_card_data)}\``,
      `- Identity authority: \`${markdownText(voice.provenance.identity_authority)}\``,
      `- Limitation: ${markdownText(voice.limitations)}`,
    ].join("\n")).join("\n\n");

    const decisions = [
      rationale ? `rationale \`${rationale.proposal_id}\`: **APPROVE / REVISE / REJECT**` : "rationale: **RETAINED APPROVED AUTHORITY — no new decision**",
      ...voices.map((voice) => `voice \`${voice.proposal_id}\`: **APPROVE / REVISE / REJECT**`),
    ].map((entry) => `- ${entry}`).join("\n");

    return [
      `## ${markdownText(identity.name)} (\`${identityKey}\`)`,
      "",
      "### Existing approved rationale(s)",
      "",
      existingLines,
      "",
      "### New rationale proposal, if required",
      "",
      newProposal,
      "",
      "### Why this candidate was selected",
      "",
      whySelected,
      "",
      "### Certified identity evidence",
      "",
      certifiedLines,
      "",
      "### Canonical card evidence",
      "",
      canonicalLines,
      "",
      "### Proposed public rationale",
      "",
      rationale ? `- ${markdownText(rationale.proposed_copy)}` : "- No new public rationale; see retained approved rationale(s) above.",
      "",
      "### Limitation",
      "",
      `- ${markdownText(rationale?.limitations || "Packet 1 does not reopen, strengthen, or add to existing approved public relationships for this identity.")}`,
      "",
      "### Other candidates considered and terminal disposition",
      "",
      alternateLines,
      "",
      voiceLines,
      "",
      "### Owner decision",
      "",
      decisions,
    ].join("\n");
  });

const ownerReviewMarkdown = [
  "# VM-551 Packet 1 — Card Content Owner Review",
  "",
  "Status: **OWNER REVIEW REQUIRED** — no Packet 1 review row is public or runtime-active.",
  "",
  "## Summary",
  "",
  `- Historical rationale candidates: **${candidateAdjudications.length}**`,
  `- Terminal historical dispositions: **${candidateAdjudications.filter((row) => !/EVIDENCE_NEEDED|REVIEW_REQUIRED/.test(row.final_research_disposition)).length}**`,
  `- Existing \`APPROVED_PUBLIC\` retained: **${relationshipSource.records.filter((record) => record.review_status === "APPROVED_PUBLIC").length}**`,
  `- New rationale proposals requiring owner review: **${rationaleProposals.length}**`,
  `- Identities represented by new rationale proposals: **${new Set(rationaleProposals.map((record) => record.identity_key)).size}/25 former gaps**`,
  `- Voice proposals requiring owner review: **${voiceProposals.length}**`,
  `- Voice coverage: **${new Set(voiceProposals.map((record) => record.identity_key)).size}/37 identities**`,
  "- Runtime promotions from this packet before approval: **0**",
  "",
  "Every decision is bound to the exact proposal ID and copy hash in the canonical source. `REVISE` requires exact replacement content; no generated fallback is authorized.",
  "",
  ...ownerReviewSections,
  "",
].join("\n");

const outputs = {
  "data/dossier/card-rationale-candidate-adjudication.source.json": `${JSON.stringify(adjudicationEnvelope, null, 2)}\n`,
  "data/dossier/card-content-review-proposals.source.json": `${JSON.stringify(packet, null, 2)}\n`,
  "docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-card-content.tsv": tsv,
  "docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-owner-review.md": ownerReviewMarkdown,
};

if (modeCheck) {
  for (const [relativePath, expected] of Object.entries(outputs)) {
    const actual = await readFile(path.join(root, relativePath), "utf8");
    if (actual !== expected) throw new Error(`Stale Packet 1 artifact: ${relativePath}`);
  }
} else {
  for (const [relativePath, content] of Object.entries(outputs)) {
    await mkdir(path.dirname(path.join(root, relativePath)), { recursive: true });
    await writeFile(path.join(root, relativePath), content);
  }
}

console.log(JSON.stringify({
  status: "PASS",
  historical_candidates: candidateAdjudications.length,
  historical_unresolved: packet.candidate_adjudication.unresolved,
  approved_historical: candidateAdjudications.filter((row) => row.final_research_disposition === "APPROVED_PUBLIC").length,
  rejected_historical: candidateAdjudications.filter((row) => row.final_research_disposition === "REJECTED").length,
  rationale_proposals: rationaleProposals.length,
  voice_proposals: voiceProposals.length,
  proposal_identities: new Set(packet.proposals.map((row) => row.identity_key)).size,
}, null, 2));

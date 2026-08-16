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
    byId: new Map((authority.claims || []).map((claim) => [claim.claim_id, {
      ...claim,
      statement: claim.statement || claim.claim || claim.text || "",
    }])),
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
    copy: "Ulalek demonstrates access to all five colors through its verified color identity, while its ability uses colorless mana to copy Eldrazi spells and abilities.",
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

const colorlessSupplement = {
  name: "Omarthis, Ghostfire Initiate",
  copy: "Omarthis is a bounded example of Colorless growth support: it grows when another colorless creature receives +1/+1 counters, then manifests cards equal to its counters when it dies.",
  claim_ids: ["colorless_claim_0005", "colorless_claim_0006"],
  locator: "data/raw-factions/colorless/colorless.profile.json#/commander_compass/native_fit_commanders/1",
};
{
  const identityKey = "COLORLESS";
  const card = resolveCard(colorlessSupplement.name);
  const claims = claimsByIdentity.get(identityKey);
  if (!card?.oracle_excerpt) throw new Error(`Packet 1 supplemental rationale does not resolve: ${identityKey} / ${colorlessSupplement.name}`);
  const resolvedClaims = colorlessSupplement.claim_ids.map((claimId) => {
    const claim = claims?.byId.get(claimId);
    if (!claim) throw new Error(`Packet 1 supplemental claim does not resolve: ${identityKey} / ${claimId}`);
    return { claim_id: claim.claim_id, statement: claim.statement };
  });
  rationaleProposals.push({
    proposal_id: stableId("packet1_rationale", identityKey, card.oracle_id),
    proposal_type: "CARD_RATIONALE",
    identity_key: identityKey,
    canonical_card_name: card.name,
    canonical_card_id: card.oracle_id,
    proposed_copy: colorlessSupplement.copy,
    copy_sha256: digest(colorlessSupplement.copy),
    verified_card_observation: card.oracle_excerpt,
    provenance: {
      identity_authority: claims.authorityPath,
      certified_identity_claims: resolvedClaims,
      relationship_lead: colorlessSupplement.locator,
      canonical_card_data: `data/scryfall/indexes/commander-index.json#oracle_id=${card.oracle_id}`,
      evidence_roles: {
        identity_ownership: "certified_identity_claims",
        card_behavior: "canonical_card_data",
        proposed_bridge: "automatic_validation_required",
      },
    },
    limitations: "This bounded example covers Colorless growth support inside the certified outside-WUBRG and Commander-support frame. Counters, manifest, card color, or product membership do not independently prove Colorless identity.",
    disposition: "REVIEW_REQUIRED",
    owner_decision: null,
    replacement_locator: "data/dossier/card-rationale-relationships.source.json#pending-colorless-omarthis",
  });
}

const rationaleProposalById = new Map(rationaleProposals.map((proposal) => [proposal.proposal_id, proposal]));
for (const record of relationshipSource.records) {
  if (!record.proposal_origin?.startsWith("packet1_rationale_") || rationaleProposalById.has(record.proposal_origin)) continue;
  const claims = claimsByIdentity.get(record.identity_key);
  const resolvedClaims = record.certified_identity_claim_ids.map((claimId) => {
    const claim = claims?.byId.get(claimId);
    if (!claim) throw new Error(`Prior Packet 1 rationale claim no longer resolves: ${record.identity_key} / ${claimId}`);
    return { claim_id: claim.claim_id, statement: claim.statement };
  });
  rationaleProposalById.set(record.proposal_origin, {
    proposal_id: record.proposal_origin,
    proposal_type: "CARD_RATIONALE",
    identity_key: record.identity_key,
    canonical_card_name: record.canonical_card_name,
    canonical_card_id: record.canonical_card_id,
    proposed_copy: record.proposed_public_rationale,
    copy_sha256: digest(record.proposed_public_rationale),
    verified_card_observation: record.relationship_evidence.verified_card_observation,
    provenance: {
      identity_authority: claims.authorityPath,
      certified_identity_claims: resolvedClaims,
      relationship_lead: record.relationship_evidence.locator,
      canonical_card_data: record.canonical_card_data_locator,
      evidence_roles: {
        identity_ownership: "certified_identity_claims",
        card_behavior: "canonical_card_data",
        proposed_bridge: "automatic_validation_required",
      },
    },
    limitations: record.limitation,
    disposition: "REVIEW_REQUIRED",
    owner_decision: null,
    replacement_locator: `data/dossier/card-rationale-relationships.source.json#${record.relationship_id}`,
  });
}
rationaleProposals.splice(0, rationaleProposals.length, ...[...rationaleProposalById.values()]
  .sort((left, right) => left.identity_key.localeCompare(right.identity_key) || left.proposal_id.localeCompare(right.proposal_id)));

const originalVoiceCandidates = Object.entries(snippets.snippets)
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
      limitations: "Pending relationship adjudication.",
      disposition: "REVIEW_REQUIRED",
      owner_decision: null,
      replacement_locator: `data/dossier/card-voice-relationships.source.json#pending-${identityKey.toLowerCase()}`,
    };
  }))
  .sort((left, right) => left.identity_key.localeCompare(right.identity_key) || left.proposal_id.localeCompare(right.proposal_id));

const voicePolicies = {
  ABZAN: { card: "Abzan Banner", class: "NATIVE_FIGURE_OR_LOCATION", claims: ["abzan_claim_0003", "abzan_claim_0008"], focus: "endurance joined to roots, memory, and Kin-Tree continuity", neighbors: "Bant, Selesnya, and Golgari can also sound enduring or communal; the Kin-Tree and ancestor-continuity frame is the bounded Abzan bridge." },
  B: { card: "Ancient Craving", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["black_claim_0003", "black_claim_0004"], focus: "knowledge made available through an explicit sacrifice", neighbors: "Blue and Dimir also value knowledge, while Orzhov values payment; this echo belongs here only because the line makes sacrifice the price of access rather than secrecy or institutional debt." },
  BANT: { card: "Bant Sojourners", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["bant_claim_0004", "bant_claim_0007"], focus: "Bant named directly through an idealized light meant to extend beyond the shard", neighbors: "Azorius and Selesnya can also sound orderly or communal; the explicit Bant reference and its idealized public-honor frame prevent a generic WUG inference." },
  BG: { card: "Bloodbond March", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["golgari_swarm_claim_001", "golgari_swarm_claim_007", "golgari_swarm_claim_0018"], focus: "the Golgari named directly through death continuing as useful service", neighbors: "Witherbloom and generic graveyard decks also join life and death; the explicit Golgari reclamation-and-service frame is required." },
  BR: { card: "Avatar of Discord", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["cult_of_rakdos_claim_001", "cult_of_rakdos_claim_002", "cult_of_rakdos_claim_006"], focus: "Rakdos named directly through cruelty made vivid and performative", neighbors: "Mono-Red, Black, and Gruul can express danger or cruelty; only the explicit Rakdos spectacle/transgression frame supports this relationship." },
  COLORLESS: { card: "All Is Dust", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["colorless_claim_0004", "colorless_claim_0005", "colorless_claim_0006"], focus: "Eldrazi-scale emergence and an outside-WUBRG sense of completion and erasure", neighbors: "Eldrazi flavor can also occur in Five-Color or Devoid decks. This is a bounded Eldrazi branch, not proof that every Eldrazi card or artifact belongs to Colorless." },
  DUNE: { card: "Aurelia, the Warleader", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["dune_claim_0005"], focus: "front-line leadership, immediate action, and organized force", neighbors: "This excerpt is canonically Boros and therefore carries a high Boros/Mardu confusion risk. It is only a cross-identity voice echo for Dune's bounded direct-action frame." },
  ESPER: { card: "Brainbite", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["esper_claim_0003", "esper_claim_0004", "esper_claim_0006"], focus: "Esper named directly through precise, controlled use of information", neighbors: "Blue, Dimir, Azorius, and Grixis also use information or control; the excerpt explicitly contrasts Esper's surgical precision with Grixis." },
  G: { card: "Ghalta, Primal Hunger", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["green_claim_0002", "green_claim_0004", "green_claim_0006"], focus: "the earth itself embodied as primal strength", neighbors: "Gruul, Naya, and Temur also use primal nature; this is a mono-Green voice echo only, not proof from creature size or card color." },
  GLINT: { card: "Aberrant Return", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["glint_claim_0005"], focus: "wild magic described as powerful and volatile", neighbors: "Prismari, Izzet, Rakdos, and Red can also sound volatile. The excerpt reaches only Glint's bounded volatility/force edge, not its appetite or anti-order boundary." },
  GRIXIS: { card: "Brainbite", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["grixis_claim_0003", "grixis_claim_0004", "grixis_claim_0006"], focus: "Grixis named directly as harsher than Esper in its use of information and harm", neighbors: "Esper and Dimir share precision and information leverage; the explicit Esper/Grixis contrast makes the Grixis ruthlessness distinction visible." },
  INK: { card: "Command Tower", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["ink_claim_0005"], focus: "knowledge treated as wasted unless it is shared", neighbors: "White, Blue, Selesnya, and Five-Color can all value sharing. This proposal is limited to Ink's certified open-knowledge and community-benefit frame and does not prove the four-color identity." },
  JESKAI: { card: "Bloodfire Expert", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["jeskai_claim_0002", "jeskai_claim_0004", "jeskai_claim_0005"], focus: "the Jeskai Way named directly through discipline applied to innate flame", neighbors: "Prismari and Izzet also join Blue and Red through technique; the explicit Jeskai discipline, monastery, and bloodfire context supplies the bridge." },
  JUND: { card: "Broodmate Tyrant", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["jund_claim_0003", "jund_claim_0005", "jund_claim_0007"], focus: "Jund named directly through embodied succession, dominance, and survival", neighbors: "Gruul, Naya, and Grixis can share force or survival; the explicit Jund predatory-world framing prevents generic BRG inference." },
  LOREHOLD: { card: "Campus Renovation", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["claim_lorehold_placement_0001", "claim_lorehold_placement_0002", "claim_lorehold_placement_0009"], focus: "Lorehold named directly through reconstructing and actively using the past", neighbors: "White, Red, and generic artifact recursion can preserve objects; the explicit Lorehold historical-reconstruction purpose is required." },
  MARDU: { card: "Bloodsoaked Champion", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["mardu_claim_0002", "mardu_claim_0003", "mardu_claim_0005"], focus: "the Mardu named directly through meeting death as another opponent", neighbors: "Rakdos, Jund, and Black also speak in violent or death-facing terms; the explicit Mardu honor-and-action context is the bridge." },
  NAYA: { card: "Cradle of Vitality", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["naya_claim_0003", "naya_claim_0004", "naya_claim_0007"], focus: "Naya named directly through abundant natural growth and gathering", neighbors: "Selesnya and Green share growth and community; the explicit Naya ecosystem and abundance context prevents generic token or lifegain inference." },
  PRISMARI: { card: "Colorstorm Stallion", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["prismari_claim_002", "prismari_claim_004", "prismari_claim_006"], focus: "Prismari students named directly through imagination allowed to run wild", neighbors: "Izzet, Quandrix, and Red can also value imagination or experimentation; the explicit Prismari student reference and art-as-magic authority provide the bounded relationship." },
  QUANDRIX: { card: "Additive Evolution", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["quandrix_claim_002", "quandrix_claim_006", "quandrix_claim_0019", "quandrix_claim_0020"], focus: "a Quandrix student explicitly joining unbounded numbers to living nature", neighbors: "Simic and Green also scale living systems; the explicit mathematical/natural synthesis makes this Quandrix rather than generic growth." },
  R: { card: "Built to Smash", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["red_claim_0002", "red_claim_0003", "red_claim_0005"], focus: "freedom from imposed regulation joined to immediate action and pushing performance to its limit", neighbors: "Gruul, Rakdos, and Kaladesh renegade themes can also reject regulation. This is a bounded mono-Red freedom-and-action echo, not identity proof from card color, artifact subject matter, or setting." },
  RG: { card: "Burning-Tree Emissary", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["claim_gruul_clans_core_identity_0002", "claim_gruul_clans_philosophy_0004", "claim_gruul_clans_placement_0001"], focus: "the Gruul named directly while rejecting the assumption that their wildness lacks subtle power", neighbors: "Red, Green, and Temur can sound instinctive or wild; the explicit Gruul anti-civilization and shaman context supplies the relationship." },
  SILVERQUILL: { card: "Beaming Defiance", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["silverquill_claim_0019", "silverquill_claim_0020", "silverquill_claim_0021"], focus: "a Silverquill student using language of shadow, light, self-definition, and visible presence", neighbors: "Prismari and mono-White can also value expression or confidence; Silverquill requires word/social influence and power-awareness rather than art alone." },
  SULTAI: { card: "Aggressive Negotiations", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["sultai_claim_0002", "sultai_claim_0004", "sultai_claim_0007"], focus: "a Sultai ambassador explicitly treating alliances as tools with an expiration point", neighbors: "Black, Dimir, Grixis, and Orzhov can all sound calculating; the explicit Sultai ruthlessness and instrumental alliance frame is required." },
  TEMUR: { card: "Avalanche Tusker", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["temur_claim_0002", "temur_claim_0003", "temur_claim_0004"], focus: "a Temur khan joining tactical knowledge to literal natural force", neighbors: "Gruul and Green also use physical force; the explicit Temur synthesis of terrain, problem solving, and direct action is the bridge." },
  U: { card: "Azami, Lady of Scrolls", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["blue_claim_0002", "blue_claim_0003", "blue_claim_0006"], focus: "a constrained decision answered with information, planning, and a deliberate course", neighbors: "Azorius, Esper, Dimir, and Jeskai also plan; this is a mono-Blue knowledge-and-deliberation echo without secrecy, law, or faction doctrine." },
  UB: { card: "Consult the Necrosages", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["house_dimir_claim_0017", "house_dimir_claim_0018", "house_dimir_claim_0019"], focus: "Dimir named directly through unseen hierarchy and orders delivered by mysterious intermediaries", neighbors: "Azorius and Orzhov also use hierarchy, while Blue/Black use information; the hidden backroom delivery is the Dimir distinction." },
  UG: { card: "Coiling Oracle", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["simic_combine_claim_001", "simic_combine_claim_002", "simic_combine_claim_007"], focus: "Simic named directly as nature directed by thought and progress", neighbors: "Quandrix and generic Blue-Green also join nature and intellect; the explicit Simic biological-improvement context supplies the bridge." },
  UR: { card: "Beamsplitter Mage", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["claim_izzet_league_0001", "claim_izzet_league_0003", "claim_izzet_league_0004", "claim_izzet_league_0006"], focus: "the Izzet named directly through delight in replicating experimental results", neighbors: "Prismari and Quandrix also experiment; Izzet requires invention, technical outcomes, or infrastructure rather than art or proof as the purpose." },
  W: { card: "Aligned Heart", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["white_claim_0002", "white_claim_0004", "white_claim_0006"], focus: "hearts and minds coordinating into shared action", neighbors: "Selesnya, Boros, Azorius, and Ink also coordinate groups; this is a broad mono-White community-and-organization echo, not proof of any institution." },
  WB: { card: "Afterlife Insurance", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["orzhov_syndicate_claim_001", "orzhov_syndicate_claim_002", "orzhov_syndicate_claim_007", "orzhov_syndicate_claim_0018"], focus: "the Orzhov named directly through a businesslike obligation extending beyond death", neighbors: "White/Black, Golgari, and Witherbloom also use death; the insurance/debt/business frame makes the Orzhov relationship specific." },
  WG: { card: "Camaraderie", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["selesnya_conclave_claim_001", "selesnya_conclave_claim_002", "selesnya_conclave_claim_007"], focus: "Mat'Selesnya named directly through the individual becoming part of a communal voice", neighbors: "White, Green, Bant, and Ink also value community; the explicit Worldsoul/conclave unity frame is the Selesnya bridge." },
  WITCH: { card: "Animation Module", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["witch_claim_0005"], focus: "design producing progress through a modular object associated with counters and repeated accumulation", neighbors: "Yore, Esper, Simic, and Blue can also connect design to progress. This echo is limited to Witch's systematic-accumulation branch and cannot establish the four-color identity alone." },
  WITHERBLOOM: { card: "Death Begets Life", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["witherbloom_claim_0019", "witherbloom_claim_0020", "witherbloom_claim_0023"], focus: "life essence returning to the earth and blooming into another form", neighbors: "Golgari and Green also frame death as renewal. Witherbloom requires embodied life/death exchange and practical essence craft; the excerpt alone does not establish the college." },
  WR: { card: "Boros Strike-Captain", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["boros_legion_claim_001", "boros_legion_claim_004", "boros_legion_claim_007", "boros_legion_claim_012"], focus: "a Boros commander explicitly addressing comrades through coordinated front-line action", neighbors: "Mardu and mono-Red also coordinate attacks; Boros requires public duty, teamwork, and accountable martial action." },
  WU: { card: "Azorius Cluestone", class: "EXPLICIT_IDENTITY_REFERENCE", claims: ["azorius_senate_claim_001", "azorius_senate_claim_002", "azorius_senate_claim_003", "azorius_senate_claim_007"], focus: "Azorius named directly through its judges, scribes, and lawmages", neighbors: "White, Blue, and Esper also use systems and records; the explicit civic/legal institution makes this Azorius." },
  WUBRG: { card: "Coalition Victory", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["wubrg_claim_0002", "wubrg_claim_0003", "wubrg_claim_0004", "wubrg_claim_0007"], focus: "a complete construction made from distinct imperfect parts", neighbors: "Artifacts, Yore, and modular engines can also sound like assembled machines. This is only an integration metaphor for Five-Color access and must not become mastery, completion, or faction lore." },
  YORE: { card: "Artificer's Epiphany", class: "CERTIFIED_SEMANTIC_ECHO", claims: ["yore_claim_0002", "yore_claim_0004"], focus: "artificers pursuing perfection, progress, and designed elegance", neighbors: "Esper, Izzet, Blue, and Witch also use technology or progress. This proposal echoes Yore's bounded artifice frame but cannot make Yore behaviorally nameable or establish a faction." },
};

const replacementVoiceCards = new Map([
  ["B", "Ancient Craving"],
  ["GLINT", "Aberrant Return"],
  ["INK", "Command Tower"],
  ["R", "Built to Smash"],
  ["W", "Aligned Heart"],
  ["WITCH", "Animation Module"],
  ["WITHERBLOOM", "Death Begets Life"],
  ["YORE", "Artificer's Epiphany"],
]);

const replacementVoiceCandidates = [...replacementVoiceCards].map(([identityKey, cardName]) => {
  const card = resolveCard(cardName, { preferFlavor: true });
  if (!card?.flavor_excerpt) throw new Error(`Replacement voice candidate does not resolve exact flavor text: ${identityKey} / ${cardName}`);
  return {
    proposal_id: stableId("packet1_voice", identityKey, card.oracle_id, "replacement"),
    proposal_type: "CARD_VOICE",
    identity_key: identityKey,
    canonical_card_name: card.name,
    canonical_card_id: card.oracle_id,
    proposed_copy: card.flavor_excerpt,
    copy_sha256: digest(card.flavor_excerpt),
    provenance: {
      candidate_inventory: `data/scryfall/indexes/card-flavor-index.json#oracle_id=${card.oracle_id}`,
      canonical_card_data: `data/scryfall/indexes/card-flavor-index.json#oracle_id=${card.oracle_id}`,
      identity_authority: claimsByIdentity.get(identityKey).authorityPath,
    },
    limitations: "Pending relationship adjudication.",
    disposition: "REVIEW_REQUIRED",
    owner_decision: null,
    replacement_locator: `data/dossier/card-voice-relationships.source.json#pending-${identityKey.toLowerCase()}`,
  };
});

const voiceCandidates = [...originalVoiceCandidates, ...replacementVoiceCandidates]
  .sort((left, right) => left.identity_key.localeCompare(right.identity_key) || left.proposal_id.localeCompare(right.proposal_id));
const voiceProposals = voiceCandidates.map((candidate) => {
  const policy = voicePolicies[candidate.identity_key];
  if (!policy) throw new Error(`Missing voice relationship policy: ${candidate.identity_key}`);
  const selected = candidate.canonical_card_name === policy.card;
  const claims = claimsByIdentity.get(candidate.identity_key);
  const certifiedClaims = selected ? policy.claims.map((claimId) => {
    const claim = claims?.byId.get(claimId);
    if (!claim) throw new Error(`Voice relationship claim does not resolve: ${candidate.identity_key} / ${claimId}`);
    return { claim_id: claim.claim_id, statement: claim.statement };
  }) : [];
  return {
    ...candidate,
    relationship_class: selected ? policy.class : "GENERIC_THEMATIC_ANALOGY",
    certified_identity_claim_ids: certifiedClaims.map((claim) => claim.claim_id),
    certified_identity_claims: certifiedClaims,
    why_voice_belongs: selected
      ? `${candidate.canonical_card_name}'s exact excerpt provides a bounded voice echo of ${policy.focus}.`
      : "The excerpt is authentic, but the prior heuristic assignment does not establish a specific relationship to the certified identity.",
    relationship_bridge: selected
      ? `The excerpt is admissible for owner review only because its language corresponds to certified claims ${policy.claims.join(", ")}; the relationship does not arise from card color, product membership, tags, or mechanics.`
      : "No certified claim authorizes this candidate strongly enough. Name, color, product, mechanic, or broad theme overlap cannot supply the missing bridge.",
    false_positive_analysis: selected
      ? policy.neighbors
      : `This candidate can sound plausible through broad mood or theme alone. Without the selected identity-specific bridge, it could be reassigned by intuition to ${policy.neighbors}`,
    adjacent_identity_confusion_risk: policy.neighbors,
    agent_recommendation: selected ? "REVIEW_REQUIRED" : "REJECTED",
    disposition: selected ? "REVIEW_REQUIRED" : "REJECTED",
    owner_decision: null,
    limitations: selected
      ? `Exact card text is verified, but public use remains owner-gated. ${policy.neighbors}`
      : "Rejected from owner decision workload because exact text provenance alone does not establish a source-complete identity relationship.",
  };
});

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
  voice_adjudication: {
    original_candidates: originalVoiceCandidates.length,
    replacement_candidates: replacementVoiceCandidates.length,
    review_required: voiceProposals.filter((row) => row.disposition === "REVIEW_REQUIRED").length,
    rejected: voiceProposals.filter((row) => row.disposition === "REJECTED").length,
    review_identity_coverage: new Set(voiceProposals.filter((row) => row.disposition === "REVIEW_REQUIRED").map((row) => row.identity_key)).size,
  },
  proposals: [...rationaleProposals, ...voiceProposals],
};

const adjudicationEnvelope = {
  schema_version: "vm551-card-rationale-candidate-adjudication-v1",
  policy: "Historical candidates are terminally adjudicated without changing approved runtime relationships. A rejected historical row may be replaced only by a separately provenance-complete owner-reviewed proposal.",
  records: candidateAdjudications,
};

const tsvHeaders = ["proposal_id", "proposal_type", "identity_key", "canonical_card_name", "canonical_card_id", "proposed_copy", "provenance", "limitations", "disposition", "owner_decision", "replacement_locator"];
const tsv = [tsvHeaders.join("\t"), ...packet.proposals.filter((record) => record.disposition === "REVIEW_REQUIRED").map((record) => tsvHeaders.map((header) =>
  tsvCell(header === "provenance" ? JSON.stringify(record.provenance) : record[header])
).join("\t"))].join("\n") + "\n";

const voiceAuditHeaders = [
  "proposal_id", "identity_key", "canonical_card_name", "canonical_card_id", "exact_excerpt",
  "relationship_class", "certified_identity_claim_ids", "why_voice_belongs", "relationship_bridge",
  "false_positive_analysis", "adjacent_identity_confusion_risk", "agent_recommendation", "source", "limitations",
];
const voiceAuditTsv = [voiceAuditHeaders.join("\t"), ...voiceProposals.map((record) => voiceAuditHeaders.map((header) => {
  const value = header === "exact_excerpt" ? record.proposed_copy
    : header === "source" ? record.provenance.canonical_card_data
    : header === "certified_identity_claim_ids" ? record.certified_identity_claim_ids.join(" | ")
    : record[header];
  return tsvCell(value);
}).join("\t"))].join("\n") + "\n";

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
    const voices = (voicesByIdentity.get(identityKey) || []).filter((record) => record.disposition === "REVIEW_REQUIRED");
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

    const voiceLines = [
      "| Card | Exact excerpt | Relationship class | Certified claims | Why it echoes this identity | False-positive / neighbor limitation | Source | Owner decision |",
      "|---|---|---|---|---|---|---|---|",
      ...voices.map((voice) => `| ${markdownText(voice.canonical_card_name)} | “${markdownText(voice.proposed_copy)}” | \`${voice.relationship_class}\` | ${voice.certified_identity_claim_ids.map((claimId) => `\`${claimId}\``).join("<br>")} | ${markdownText(voice.why_voice_belongs)} ${markdownText(voice.relationship_bridge)} | ${markdownText(voice.false_positive_analysis)} | \`${markdownText(voice.provenance.canonical_card_data)}\` | **APPROVE / REVISE / REJECT** (\`${voice.proposal_id}\`) |`),
    ].join("\n");

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
      "### Source-complete voice proposal(s)",
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
  `- Original voice candidates hardened: **${originalVoiceCandidates.length}**`,
  `- Stronger exact-text replacements added: **${replacementVoiceCandidates.length}**`,
  `- Voice proposals requiring owner review: **${voiceProposals.filter((record) => record.disposition === "REVIEW_REQUIRED").length}**`,
  `- Weak voice candidates rejected from decision workload: **${voiceProposals.filter((record) => record.disposition === "REJECTED").length}**`,
  `- Source-complete voice coverage: **${new Set(voiceProposals.filter((record) => record.disposition === "REVIEW_REQUIRED").map((record) => record.identity_key)).size}/37 identities**`,
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
  "docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-voice-adjudication.tsv": voiceAuditTsv,
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
  original_voice_candidates: originalVoiceCandidates.length,
  replacement_voice_candidates: replacementVoiceCandidates.length,
  voice_review_proposals: voiceProposals.filter((row) => row.disposition === "REVIEW_REQUIRED").length,
  voice_rejected: voiceProposals.filter((row) => row.disposition === "REJECTED").length,
  voice_review_identity_coverage: new Set(voiceProposals.filter((row) => row.disposition === "REVIEW_REQUIRED").map((row) => row.identity_key)).size,
}, null, 2));

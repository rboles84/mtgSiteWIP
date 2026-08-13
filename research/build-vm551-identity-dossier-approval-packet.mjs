import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FACTION_PRESENTATION } from "../assets/js/archscry-presentation.js";
import { auditCandidates } from "./build-card-rationale-artifacts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const readText = async (relativePath) => readFile(path.join(root, relativePath), "utf8");
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const stableId = (prefix, ...parts) => `${prefix}_${parts.join("|").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`;
const tsvCell = (value) => String(value ?? "").replace(/\r?\n/g, " ").replace(/\t/g, " ");
const modeCheck = process.argv.includes("--check");

const identityOrder = [
  "WU", "UB", "BR", "RG", "WG", "WB", "UR", "BG", "UG", "WR",
  "LOREHOLD", "PRISMARI", "WITHERBLOOM", "QUANDRIX", "SILVERQUILL",
  "W", "U", "B", "R", "G",
  "BANT", "ESPER", "GRIXIS", "JUND", "NAYA",
  "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI",
  "YORE", "GLINT", "DUNE", "INK", "WITCH", "COLORLESS", "WUBRG",
];

const [factionRegistry, guideText, pairTsv, audit] = await Promise.all([
  readJson("data/factions.json"),
  readText("docs/reference/37-identity-player-relationship-guide.md"),
  readText("docs/plans/vm551-gate-b1-placement-instrument/confusion-pair-coverage.tsv"),
  auditCandidates(),
]);

const folderByIdentity = new Map(identityOrder.map((identityKey) => [
  identityKey,
  audit.rows.find((row) => row.identityKey === identityKey)?.folder || identityKey.toLowerCase(),
]));

const guideEntries = [];
const guideLines = guideText.split(/\r?\n/);
for (let index = 0; index < guideLines.length; index += 1) {
  const heading = guideLines[index].match(/^(\d+)\. \*\*(.+?)\*\*$/);
  if (!heading) continue;
  const number = Number(heading[1]);
  const fields = {};
  for (let cursor = index + 1; cursor < guideLines.length && !/^\d+\. \*\*/.test(guideLines[cursor]); cursor += 1) {
    const field = guideLines[cursor].match(/^\s+- \*\*(Resonates|Connects|Pushes back|Rejects):\*\*\s+(.+)$/);
    if (field) fields[field[1]] = field[2].trim();
  }
  guideEntries.push({
    number,
    heading: heading[2],
    line: index + 1,
    ...fields,
  });
}
if (guideEntries.length !== 37) throw new Error(`Expected 37 relationship-guide entries, found ${guideEntries.length}`);
const guideByIdentity = new Map(identityOrder.map((identityKey, index) => [identityKey, guideEntries[index]]));

const profileByIdentity = new Map(await Promise.all(identityOrder.map(async (identityKey) => {
  const folder = folderByIdentity.get(identityKey);
  const profilePath = `data/raw-factions/${folder}/${folder}.profile.json`;
  const claimsPath = `data/raw-factions/${folder}/${folder}.claims.json`;
  const [profile, claims] = await Promise.all([readJson(profilePath), readJson(claimsPath)]);
  const claimMap = new Map((claims.claims || []).map((claim) => [claim.claim_id, claim]));
  return [identityKey, { folder, profilePath, claimsPath, profile, claimMap }];
})));

function dedupe(values) {
  return [...new Set(values.filter(Boolean))];
}

function certifiedClaimIds(profile) {
  return dedupe([
    ...(profile.core_identity?.claim_ids || []),
    ...(profile.core_identity?.evidence_claim_ids || []),
    ...(profile.great_tension?.claim_ids || []),
    ...(profile.great_tension?.evidence_claim_ids || []),
    ...(profile.mechanics?.claim_ids || []),
    ...(profile.mechanics?.evidence_claim_ids || []),
    ...(profile.site_surface?.claim_ids || []),
    ...(profile.site_surface?.evidence_claim_ids || []),
    ...(profile.profile?.claim_ids || []),
  ]);
}

function resolveClaims(identityKey, ids) {
  const authority = profileByIdentity.get(identityKey);
  return ids.map((claimId) => {
    const claim = authority.claimMap.get(claimId);
    if (!claim) throw new Error(`Packet 2 claim does not resolve: ${identityKey} / ${claimId}`);
    return { claim_id: claimId, statement: claim.statement || claim.claim };
  });
}

function lowerLead(text) {
  const trimmed = String(text || "").trim().replace(/^The person\s+/i, "");
  return trimmed ? trimmed.charAt(0).toLowerCase() + trimmed.slice(1) : "";
}

function secondPersonLead(text) {
  return lowerLead(text)
    .replace(/\btrusts\b/g, "trust")
    .replace(/\bobserves\b/g, "observe")
    .replace(/\bcontrols\b/g, "control")
    .replace(/\bvalues\b/g, "value")
    .replace(/\bprefers\b/g, "prefer")
    .replace(/\bwants\b/g, "want")
    .replace(/\btreats\b/g, "treat")
    .replace(/\bfollows\b/g, "follow")
    .replace(/\benjoys\b/g, "enjoy")
    .replace(/\bfinds\b/g, "find")
    .replace(/\bstudies\b/g, "study")
    .replace(/\biterates\b/g, "iterate")
    .replace(/\blearns\b/g, "learn")
    .replace(/\bleads\b/g, "lead")
    .replace(/\bpersuades\b/g, "persuade")
    .replace(/\binspires\b/g, "inspire")
    .replace(/\bcriticizes\b/g, "criticize")
    .replace(/\bpressures\b/g, "pressure")
    .replace(/\baccepts\b/g, "accept")
    .replace(/\bbuilds\b/g, "build")
    .replace(/\bpractices\b/g, "practice")
    .replace(/\brefuses\b/g, "refuse")
    .replace(/\bconverts\b/g, "convert")
    .replace(/\bacts\b/g, "act");
}

function playerFacingCopy(text) {
  return String(text || "")
    .replace(/Surveil Texture/g, "Information Filtering")
    .replace(/Public-Surface Guardrail/g, "Visible-Plan Boundary")
    .replace(/source-backed/gi, "verified")
    .replace(/scenario mapping/gi, "scenario planning")
    .replace(/Commander-facing support texture/gi, "Commander-facing examples")
    .replace(/Commander support texture/gi, "Commander examples")
    .replace(/support texture/gi, "supporting play patterns")
    .replace(/table texture/gi, "recognizable table pattern")
    .replace(/combat texture/gi, "combat patterns")
    .replace(/proliferate texture/gi, "proliferate play")
    .replace(/adaptive creature texture/gi, "adaptive creature play")
    .replace(/shared-resource texture/gi, "shared-resource play")
    .replace(/aristocrats texture/gi, "sacrifice-and-death-trigger play")
    .replace(/combo texture/gi, "combo structure")
    .replace(/\btexture\b/gi, "play pattern")
    .replace(/\bguardrail\b/gi, "boundary");
}

const auditTerms = /\b(texture|source-backed|public-surface|guardrail|evidence-required|naming|mapping|boundary-only|routing|taxonomy|support lane|operator)\b/i;
const genericCopy = /^(The pilot|Opponents experience the deck through its repeated play patterns|Pressure through the mechanics, resources, and table behavior|Commander mechanics that make the faction plan visible|a recognizable Commander table role)$/i;

const monoPresentationCandidates = {
  U: {
    shortName: "Blue",
    tableRole: "The patient planner",
    opponentRead: "Opponents see cards held back, information gathered, and answers used at the moment they matter.",
    emotionalPressure: "Pressure through open mana, card selection, and flexible answers that keep several routes available.",
    loreRole: "knowledge, information, education, experimentation, tools, and deliberate improvement",
    mechanics: "Card draw and filtering, counterspells, copying, bounce, theft, flying, artifacts, and instant-and-sorcery play",
    tableExperience: "held mana, careful selection, flexible interaction, and turns shaped by timing rather than raw force",
    forkQuestion: "What becomes possible when you understand the position before committing?",
    direction: "moves toward knowledge, preparation, and flexible control",
  },
  B: {
    shortName: "Black",
    tableRole: "The resource converter",
    opponentRead: "Opponents see life, cards, creatures, and the graveyard treated as resources whose costs are chosen deliberately.",
    emotionalPressure: "Pressure through sacrifice, life payment, removal, recursion, and the willingness to pay for leverage.",
    loreRole: "agency, opportunity, calculated cost, self-advocacy, and resource conversion",
    mechanics: "Creature destruction, discard, sacrifice, reanimation, graveyard use, life as a cost, drain, and paid card draw",
    tableExperience: "costs converted into options, lost pieces returned to use, and leverage preserved through difficult exchanges",
    forkQuestion: "What are you willing to spend to keep the choice yours?",
    direction: "moves toward agency, cost, and chosen advantage",
  },
  R: {
    shortName: "Red",
    tableRole: "The first mover",
    opponentRead: "Opponents see damage, haste, and temporary openings turned into action before the table can settle.",
    emotionalPressure: "Pressure through immediacy, direct damage, speed, impulse access, and short windows that demand an answer now.",
    loreRole: "freedom, emotion, impulse, authenticity, and direct action",
    mechanics: "Direct damage, haste, temporary mana and power, impulse draw, attack pressure, and effects that matter immediately",
    tableExperience: "fast commitment, visible momentum, and turns that use the available opening before it closes",
    forkQuestion: "What has to move now because the feeling is already true?",
    direction: "moves toward freedom, immediacy, and direct action",
  },
  G: {
    shortName: "Green",
    tableRole: "The rooted grower",
    opponentRead: "Opponents see lands, creatures, and an established board turn patient development into larger threats.",
    emotionalPressure: "Pressure through mana growth, efficient creatures, trample, counters, and a board that becomes harder to contain over time.",
    loreRole: "nature, growth, interdependence, instinct, ancestry, and acceptance of the living system",
    mechanics: "Mana and lands, efficient creatures, +1/+1 counters, fight and bite effects, reach, trample, and creature-or-land-based card flow",
    tableExperience: "land-fed development, creature-centered value, and patient growth becoming visible board strength",
    forkQuestion: "What are you already becoming when you stop fighting your nature?",
    direction: "moves toward organic growth, patience, and embodied strength",
  },
};

const identityRecords = identityOrder.map((identityKey) => {
  const faction = factionRegistry.factions[identityKey];
  const presentation = FACTION_PRESENTATION[identityKey] || monoPresentationCandidates[identityKey];
  const guide = guideByIdentity.get(identityKey);
  const authority = profileByIdentity.get(identityKey);
  if (!faction || !presentation || !guide || !authority) throw new Error(`Packet 2 identity input missing: ${identityKey}`);
  const claimIds = certifiedClaimIds(authority.profile);
  if (!claimIds.length) throw new Error(`Packet 2 identity has no certified claim chain: ${identityKey}`);
  const whatToLookFor = (faction.archetypes || []).slice(0, 4).map((entry, index) => ({
    item_id: stableId("lookfor", identityKey, index + 1, entry.name),
    title: playerFacingCopy(entry.name),
    copy: playerFacingCopy(entry.desc),
    source_locator: `data/factions.json#/factions/${identityKey}/archetypes/${index}`,
    source_role: "existing_authored_commander_guidance",
  }));
  if (whatToLookFor.length < 3) throw new Error(`Packet 2 What to Look For has fewer than three rows: ${identityKey}`);

  const testTheFit = {
    positive_self_check: playerFacingCopy(presentation.selfCheck || `This may fit if you ${secondPersonLead(guide.Resonates)}`),
    tension_failure_mode: playerFacingCopy(`Watch for this tension: ${guide["Pushes back"]}`),
    certified_boundary_self_check: playerFacingCopy(`This is less likely to fit when ${lowerLead(guide.Rejects)}`),
  };
  const howThisPlays = {
    role: playerFacingCopy(presentation.tableRole),
    how_opponents_read_it: playerFacingCopy(presentation.opponentRead),
    emotional_pressure: playerFacingCopy(presentation.emotionalPressure),
    lore_role: playerFacingCopy(presentation.loreRole),
    mechanical_expression: playerFacingCopy(presentation.mechanics),
    table_experience: playerFacingCopy(presentation.tableExperience),
  };
  const allCopy = [
    ...Object.values(testTheFit),
    ...Object.values(howThisPlays),
    ...whatToLookFor.flatMap((entry) => [entry.title, entry.copy]),
  ];
  const reviewFlags = dedupe([
    ...allCopy.filter((copy) => auditTerms.test(copy)).map(() => "INTERNAL_OR_AUDIT_VOCABULARY"),
    ...Object.values(howThisPlays).filter((copy) => genericCopy.test(copy)).map(() => "GENERIC_FALLBACK"),
    !presentation.selfCheck ? "NEW_TEST_THE_FIT_COMPOSITION" : "",
    "EVIDENCE_VALIDATION_REQUIRED",
  ]);

  const proposedCopy = { test_the_fit: testTheFit, how_this_plays: howThisPlays, what_to_look_for: whatToLookFor };
  return {
    record_id: stableId("packet2_identity", identityKey),
    record_type: "IDENTITY_DOSSIER",
    identity_key: identityKey,
    identity_name: faction.name,
    proposed_public_copy: proposedCopy,
    copy_sha256: digest(JSON.stringify(proposedCopy)),
    provenance: {
      certified_profile: authority.profilePath,
      certified_claims: resolveClaims(identityKey, claimIds),
      relationship_guide: `docs/reference/37-identity-player-relationship-guide.md#L${guide.line}`,
      existing_presentation_lead: `assets/js/archscry-presentation.js#FACTION_PRESENTATION.${identityKey}`,
      existing_archetype_lead: `data/factions.json#/factions/${identityKey}/archetypes`,
      evidence_roles: {
        identity_meaning: "certified_claims_and_relationship_guide",
        commander_translation: "existing_authored_copy_bounded_by_certified_claims",
        proposed_bridge: "evidence_validation_required",
      },
    },
    limitations: "The packet preserves or deterministically reframes existing authored material for owner review. It does not claim that a player has these motives, that mechanics prove identity, or that an opponent will react in one fixed way.",
    review_flags: reviewFlags,
    disposition: "PENDING_AUTOMATIC_VALIDATION",
    owner_decision: null,
    replacement_locator: `data/dossier/identity-dossier-content.source.json#pending-${identityKey.toLowerCase()}`,
  };
});

const pairHeaders = pairTsv.split(/\r?\n/)[0].split("\t");
const pairRows = pairTsv.trim().split(/\r?\n/).slice(1).map((line) => {
  const cells = line.split("\t");
  return Object.fromEntries(pairHeaders.map((header, index) => [header, cells[index] || ""]));
});
if (pairRows.length !== 123) throw new Error(`Expected 123 confusion pairs, found ${pairRows.length}`);

const liveEmittablePairRows = [
  {
    identity_a: "BR",
    identity_b: "R",
    observable_behavioral_distinction: "Rakdos's paired spectacle-and-cost posture versus Red's broader commitment to immediate self-directed action.",
  },
  {
    identity_a: "G",
    identity_b: "WITHERBLOOM",
    observable_behavioral_distinction: "Green's acceptance of the living world's existing order versus Witherbloom's deliberate use of life, death, and renewal as an exchange.",
  },
  {
    identity_a: "JUND",
    identity_b: "RG",
    observable_behavioral_distinction: "Jund's predatory resource hierarchy versus Gruul's resistance to imposed structure through direct, unrestrained action.",
  },
];

const publicPairRows = [
  ...pairRows.map((pair) => ({ ...pair, authority_role: "MANDATORY_CONFUSION_PAIR" })),
  ...liveEmittablePairRows.map((pair) => ({ ...pair, authority_role: "LIVE_RUNTIME_PAIR" })),
];

const comparisonRecords = publicPairRows.map((pair) => {
  const a = factionRegistry.factions[pair.identity_a];
  const b = factionRegistry.factions[pair.identity_b];
  const guideA = guideByIdentity.get(pair.identity_a);
  const guideB = guideByIdentity.get(pair.identity_b);
  if (!a || !b || !guideA || !guideB) throw new Error(`Packet 2 pair identity missing: ${pair.identity_a} / ${pair.identity_b}`);
  const copy = {
    a_to_b: `${a.name} centers a path that ${lowerLead(guideA.Resonates)} By contrast, ${b.name} centers a path that ${lowerLead(guideB.Resonates)}`,
    b_to_a: `${b.name} centers a path that ${lowerLead(guideB.Resonates)} By contrast, ${a.name} centers a path that ${lowerLead(guideA.Resonates)}`,
  };
  return {
    record_id: stableId("packet2_comparison", pair.identity_a, pair.identity_b),
    record_type: "PUBLIC_COMPARISON",
    pair_key: `${pair.identity_a}::${pair.identity_b}`,
    identity_a: pair.identity_a,
    identity_b: pair.identity_b,
    proposed_public_copy: copy,
    copy_sha256: digest(JSON.stringify(copy)),
    provenance: {
      relationship_guide_a: `docs/reference/37-identity-player-relationship-guide.md#L${guideA.line}`,
      relationship_guide_b: `docs/reference/37-identity-player-relationship-guide.md#L${guideB.line}`,
      instrument_boundary: {
        locator: pair.authority_role === "MANDATORY_CONFUSION_PAIR"
          ? `docs/plans/vm551-gate-b1-placement-instrument/confusion-pair-coverage.tsv#${pair.identity_a}::${pair.identity_b}`
          : `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json#${pair.identity_a}::${pair.identity_b}`,
        observable_behavioral_distinction: pair.observable_behavioral_distinction,
        use_restriction: pair.authority_role === "MANDATORY_CONFUSION_PAIR"
          ? "Routing and overlap context only; it cannot independently authorize public identity meaning."
          : "Current-engine result reachability only; it cannot independently authorize public identity meaning.",
      },
      certified_claims_a: resolveClaims(pair.identity_a, certifiedClaimIds(profileByIdentity.get(pair.identity_a).profile)),
      certified_claims_b: resolveClaims(pair.identity_b, certifiedClaimIds(profileByIdentity.get(pair.identity_b).profile)),
      evidence_roles: {
        identity_meaning: "certified_claims_and_relationship_guide",
        overlap_context: pair.authority_role === "MANDATORY_CONFUSION_PAIR"
          ? "approved_b1_confusion_pair"
          : "current_engine_runtime_pair",
        proposed_bridge: "evidence_validation_required",
      },
    },
    limitations: "This pair copy states distinct identity centers but does not claim that both survived a particular player's answers. A future co-leader introduction must add only the actual shared answer-derived observations.",
    review_flags: ["EVIDENCE_VALIDATION_REQUIRED", "NO_GENERIC_RUNTIME_FALLBACK_ALLOWED"],
    disposition: "PENDING_AUTOMATIC_VALIDATION",
    owner_decision: null,
    replacement_locator: `data/dossier/public-comparisons.source.json#pending-${pair.identity_a.toLowerCase()}-${pair.identity_b.toLowerCase()}`,
  };
});

const packet = {
  schema_version: "vm551-identity-dossier-approval-packet-v1",
  status: "AUTOMATIC_VALIDATION_INPUT",
  authority_chain: "certified identity truth -> approved player relationship guide -> bounded Commander translation -> owner-approved public copy",
  promotion_rule: "No input record enters runtime. A separate automatic adjudication must pass the shared evidence validator; owner review is reserved for true exceptions.",
  identity_records: identityRecords,
  comparison_records: comparisonRecords,
};

const tsvHeaders = ["record_id", "record_type", "identity_or_pair", "proposed_public_copy", "provenance", "limitations", "review_flags", "disposition", "owner_decision", "replacement_locator"];
const tsvRows = [
  ...identityRecords.map((row) => ({
    ...row,
    identity_or_pair: row.identity_key,
  })),
  ...comparisonRecords.map((row) => ({
    ...row,
    identity_or_pair: row.pair_key,
  })),
];
const tsv = [tsvHeaders.join("\t"), ...tsvRows.map((row) => tsvHeaders.map((header) => {
  const value = header === "proposed_public_copy" || header === "provenance"
    ? JSON.stringify(row[header])
    : header === "review_flags"
      ? row.review_flags.join(";")
      : row[header];
  return tsvCell(value);
}).join("\t"))].join("\n") + "\n";

const outputs = {
  "data/dossier/identity-dossier-review-proposals.source.json": `${JSON.stringify(packet, null, 2)}\n`,
  "docs/audits/vm551-all-37-dossier-closeout/approval-packet-2-identity-dossier.tsv": tsv,
};

if (modeCheck) {
  for (const [relativePath, expected] of Object.entries(outputs)) {
    const actual = await readFile(path.join(root, relativePath), "utf8");
    if (actual !== expected) throw new Error(`Stale Packet 2 artifact: ${relativePath}`);
  }
} else {
  for (const [relativePath, content] of Object.entries(outputs)) {
    await mkdir(path.dirname(path.join(root, relativePath)), { recursive: true });
    await writeFile(path.join(root, relativePath), content);
  }
}

console.log(JSON.stringify({
  status: "PASS",
  identities: identityRecords.length,
  test_the_fit_roles: identityRecords.reduce((sum, row) => sum + Object.keys(row.proposed_public_copy.test_the_fit).length, 0),
  how_this_plays_fields: identityRecords.reduce((sum, row) => sum + Object.keys(row.proposed_public_copy.how_this_plays).length, 0),
  what_to_look_for_items: identityRecords.reduce((sum, row) => sum + row.proposed_public_copy.what_to_look_for.length, 0),
  comparisons: comparisonRecords.length,
  internal_vocabulary_flags: identityRecords.filter((row) => row.review_flags.includes("INTERNAL_OR_AUDIT_VOCABULARY")).length,
  runtime_promotions: 0,
}, null, 2));

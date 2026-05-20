import {
  getColorIdentity,
  getCommanderFactionGuidance,
} from "./commander-dossier.js";
import {
  mazeSearchLink as buildMazeSearchLink,
  resolveMazeOperatorQuery,
  resolveMazePathType,
  resolveMazePlainReadingQuery,
} from "./maze-handoff.js";

export const MAZE_PATH_LABELS = {
  "commanders-that-fit": "Commanders That Fit",
  "support-cards": "Support Cards",
  "flavor-echoes": "Flavor Echoes",
  "weird-stretch-commanders": "Weird Stretch Commanders",
  ramp: "Ramp",
  draw: "Draw",
  interaction: "Interaction",
  lands: "Lands",
  "win-conditions": "Win Conditions",
};

export const FACTION_PRESENTATION = {
  W: {
    shortName: "White",
    tableRole: "The shelter-builder",
    opponentRead: "Opponents feel the deck as a standard made tangible: removal, protection, and board presence all answer the same question of safety.",
    emotionalPressure: "Pressure through protection, structure, and the feeling that someone thought about what happens after the hit lands.",
    loreRole: "shelter, duty, standards, and collective protection",
    mechanics: "Board wipes, token makers, protection spells, taxes, and equipment that turns safety into enforceable tempo",
    tableExperience: "reliable protection, disciplined pressure, and structure that keeps returning to the board",
    thesis: "White read you as someone who does not confuse kindness with drift. It wants protection to become structure, and structure to remain trustworthy when the room gets dangerous.",
    closeReason: "safety, duty, and standards that hold under pressure",
    forkQuestion: "What structure still protects people when goodwill is not enough?",
    direction: "moves upward into shelter and enforceable duty",
  },
  WU: {
    shortName: "Azorius",
    tableRole: "The arbiter",
    opponentRead: "Opponents experience the deck as procedure with teeth: every shortcut must answer to the record.",
    emotionalPressure: "Pressure through permission, timing, and the feeling that the table has entered court.",
    loreRole: "senate, judiciary, and lawkeeping bureaucracy",
    mechanics: "Detain, taxation, permission, sweepers, tempo, and rule-setting permanents",
    tableExperience: "restricted action, procedural leverage, and clean enforcement",
    thesis: "Azorius read you as someone who protects the table by defining what is allowed to happen. White supplies the standard; blue supplies timing, documentation, and restraint. Together, the deck becomes law made playable: patient, exacting, and difficult to slip past.",
    closeReason: "procedure, restraint, and enforceable standards",
    forkQuestion: "What rule keeps the table from collapsing?",
    direction: "moves upward into order and precedent",
  },
  UB: {
    shortName: "Dimir",
    tableRole: "The concealed hand",
    opponentRead: "Opponents rarely know which card matters until it has already taken their best line away.",
    emotionalPressure: "Pressure through uncertainty, hidden leverage, and delayed reveal.",
    loreRole: "couriers, archivists, spies, and memory manipulators",
    mechanics: "Surveil, mill, discard, theft, evasive threats, and control",
    tableExperience: "hidden pressure, information advantage, and wins that arrive before the table understands them",
    thesis: "Dimir read you as someone who values the move no one can see yet. Blue gathers the pattern; black keeps the leverage private. Together, the deck wins by letting the table misread what matters.",
    closeReason: "secrecy, patience, and information leverage",
    forkQuestion: "What can be won before anyone realizes it was contested?",
    direction: "moves inward into secrecy and timing",
  },
  BR: {
    shortName: "Rakdos",
    tableRole: "The spectacle engine",
    opponentRead: "Opponents feel the deck as a dare: life totals, resources, and caution all become part of the show.",
    emotionalPressure: "Pressure through risk, damage, sacrifice, and ecstatic escalation.",
    loreRole: "performance cult, riotous stage, and thrill economy",
    mechanics: "Spectacle, sacrifice, impulse draw, menace, damage triggers, and reckless advantage",
    tableExperience: "volatile pressure, public risk, and turns that make the room react",
    thesis: "Rakdos read you as someone who would rather make the truth loud than make it polite. Black is willing to spend the piece; red is willing to light the fuse. Together, the deck turns danger into entertainment the table cannot ignore.",
    closeReason: "spectacle, risk, and emotional force",
    forkQuestion: "What if the honest answer is the one that breaks the room open?",
    direction: "moves outward into spectacle and risk",
  },
  RG: {
    shortName: "Gruul",
    tableRole: "The breaker of gates",
    opponentRead: "Opponents see the deck as pressure from outside the city walls: fast, physical, and hard to civilize.",
    emotionalPressure: "Pressure through instinct, oversized threats, and refusal of imposed order.",
    loreRole: "clans, wild places, razed boundaries, and anti-civilized resistance",
    mechanics: "Riot, bloodrush, ramp, trample, fight spells, and creature pressure",
    tableExperience: "immediate combat, land-fed force, and damage that refuses delay",
    thesis: "Gruul read you as someone who trusts the body of the answer before the paperwork of the answer. Green brings the world that keeps growing; red brings the refusal to wait. Together, the deck asks whether the table can survive what it tried to fence in.",
    closeReason: "anger, wildness, and direct force",
    forkQuestion: "What boundary deserves to be broken?",
    direction: "moves forward into impact and refusal",
  },
  WG: {
    shortName: "Selesnya",
    tableRole: "The chorus",
    opponentRead: "Opponents feel the deck as a board that becomes a community before it becomes a threat.",
    emotionalPressure: "Pressure through belonging, protection, and many small pieces becoming one large promise.",
    loreRole: "conclave, communal faith, and living civic body",
    mechanics: "Convoke, populate, tokens, anthem effects, lifegain, and board protection",
    tableExperience: "collective momentum, shared growth, and combat math that multiplies",
    thesis: "Selesnya read you as someone who trusts strength that is held together. White protects the bond; green lets it grow. Together, the deck makes a battlefield where the whole is more frightening than any single body.",
    closeReason: "community, protection, and shared growth",
    forkQuestion: "What becomes possible when the answer is held by many hands?",
    direction: "moves outward into belonging and scale",
  },
  WB: {
    shortName: "Orzhov",
    tableRole: "The creditor",
    opponentRead: "Opponents feel the deck as a ledger: every attack, death, and favor creates a debt that comes due.",
    emotionalPressure: "Pressure through obligation, drain, taxation, and deals that keep their receipts.",
    loreRole: "church-bank hierarchy, contracts, afterlife debt, and inherited power",
    mechanics: "Extort, afterlife, aristocrats, lifedrain, sacrifice, taxes, and recursion",
    tableExperience: "transactional pressure, slow drain, and resource exchanges that stop being equal",
    thesis: "Orzhov read you as someone who notices what is owed. White gives the institution; black gives the leverage. Together, the deck turns every exchange into a contract the table did not read closely enough.",
    closeReason: "obligation, debt, and consequence",
    forkQuestion: "What is owed, and who pays when the bill arrives?",
    direction: "moves downward into debt and permanence",
  },
  UR: {
    shortName: "Izzet",
    tableRole: "The live experiment",
    opponentRead: "Opponents feel the deck accelerating in public, where every cantrip might become the turn that matters.",
    emotionalPressure: "Pressure through velocity, improvisation, and spell sequences that refuse to sit still.",
    loreRole: "inventors, engineers, experimenters, and dangerous civic infrastructure",
    mechanics: "Jump-start, overload, spellslinger, copying, cantrips, artifacts, and tempo",
    tableExperience: "spell velocity, explosive pivots, and the sense that the device is running while it is built",
    thesis: "Izzet read you as someone who learns by putting the spell on the stack. Blue asks what the pattern can do; red asks what happens if it happens now. Together, the deck turns curiosity into acceleration.",
    closeReason: "curiosity, velocity, and experimental risk",
    forkQuestion: "What happens if the question is tested at full speed?",
    direction: "moves upward into acceleration and iteration",
  },
  BG: {
    shortName: "Golgari",
    tableRole: "The survivor",
    opponentRead: "Opponents learn that removal is not an ending; it is the next material the deck will use.",
    emotionalPressure: "Pressure through endurance, reclamation, and the certainty that nothing is wasted.",
    loreRole: "waste, agriculture, rot, undercity survival, and reclamation",
    mechanics: "Dredge, scavenge, undergrowth, recursion, sacrifice, and graveyard value",
    tableExperience: "loss converted into future pressure and a board that keeps returning",
    thesis: "Golgari read you as someone who does not confuse loss with disappearance. Black accepts the cost; green makes the remains useful. Together, the deck turns every dead thing into future leverage.",
    closeReason: "endurance, grievance, rot, and reclamation",
    forkQuestion: "What can be reclaimed from what was lost?",
    direction: "moves downward into endurance and recursion",
  },
  UG: {
    shortName: "Simic",
    tableRole: "The adapter",
    opponentRead: "Opponents see the deck changing shape until yesterday's answer no longer fits today's board.",
    emotionalPressure: "Pressure through adaptation, counters, ramp, and creatures that keep improving.",
    loreRole: "biomancers, laboratories, evolutionary projects, and living infrastructure",
    mechanics: "Graft, evolve, adapt, counters, ramp, card draw, and creature upgrades",
    tableExperience: "incremental growth, biological scaling, and threats that outgrow old answers",
    thesis: "Simic read you as someone who expects a living plan to change. Green supplies the organism; blue supplies the method. Together, the deck asks what the next version can become.",
    closeReason: "adaptation, growth, and biological change",
    forkQuestion: "What form survives because it can change?",
    direction: "moves forward into adaptation and upgrade",
  },
  WR: {
    shortName: "Boros",
    tableRole: "The responder",
    opponentRead: "Opponents see the deck coming. That is part of the point: the line is public, and crossing it has consequences.",
    emotionalPressure: "Pressure through action, retaliation, combat, and visible protection.",
    loreRole: "security force, constabulary, and army",
    mechanics: "Battalion, mentor, tactical combat, equipment, burn, and protection",
    tableExperience: "coordinated pressure, righteous retaliation, and visible action",
    thesis: "Boros did not read you as a passive defender. It read you as someone who moves when the line is crossed. White gives the instinct to protect the table, the team, or the principle. Red gives the spark that refuses to wait. Together, that becomes righteous retaliation: a shield with fire behind it.",
    closeReason: "protection, grievance, and immediate action",
    forkQuestion: "What line was crossed, and who must answer for it?",
    direction: "moves outward into intervention",
  },
  LOREHOLD: {
    shortName: "Lorehold",
    tableRole: "The field historian",
    opponentRead: "Opponents feel the deck turning old material into present danger: relics, spirits, and remembered battles.",
    emotionalPressure: "Pressure through history, evidence, artifact recursion, and memory that refuses to stay still.",
    loreRole: "archaeologists, spirit scholars, and combat historians",
    mechanics: "Spirit tokens, artifact recursion, graveyard artifacts, combat value, and historic payoffs",
    tableExperience: "history fighting back and old resources becoming live pressure",
    thesis: "Lorehold read you as someone who goes into the ruins because the past is still active. White gives testimony and duty; red gives motion and heat. Together, the deck turns memory into a battlefield resource.",
    closeReason: "history, artifacts, memory, and active investigation",
    forkQuestion: "What does the past prove when it is allowed to fight back?",
    direction: "moves backward into evidence, then forward into action",
  },
  PRISMARI: {
    shortName: "Prismari",
    tableRole: "The crescendo",
    opponentRead: "Opponents feel the deck building toward a visible turn where expression and impact become the same thing.",
    emotionalPressure: "Pressure through spectacle, spellcraft, and large expressive turns.",
    loreRole: "artists, elemental performers, and spellcraft prodigies",
    mechanics: "Magecraft, big instants and sorceries, treasures, copying, and expressive spell turns",
    tableExperience: "performance pressure, elemental swing turns, and spells that announce themselves",
    thesis: "Prismari read you as someone who cares how the win feels when it lands. Blue shapes the composition; red releases the force. Together, the deck makes the decisive turn a performance with consequences.",
    closeReason: "expression, spectacle, and emotional force",
    forkQuestion: "What does the spell need to say when everyone is watching?",
    direction: "moves outward into performance and impact",
  },
  QUANDRIX: {
    shortName: "Quandrix",
    tableRole: "The pattern engine",
    opponentRead: "Opponents feel the deck scaling from small proofs into board states that become hard to calculate.",
    emotionalPressure: "Pressure through structure, doubling, counters, and math that becomes physical.",
    loreRole: "mathematicians, theorists, fractal mages, and pattern seekers",
    mechanics: "Fractals, doubling, counters, ramp, tokens, and exponential scaling",
    tableExperience: "mathematical inevitability and advantages that compound past ordinary answers",
    thesis: "Quandrix read you as someone who trusts the hidden structure beneath the board. Blue finds the proof; green gives it mass. Together, the deck turns an elegant pattern into something the table has to block.",
    closeReason: "patterns, proof, scale, and abstraction",
    forkQuestion: "What structure is already growing under the visible game?",
    direction: "moves upward into proof and multiplication",
  },
  SILVERQUILL: {
    shortName: "Silverquill",
    tableRole: "The table speaker",
    opponentRead: "Opponents feel the deck turning attacks, deals, and words into leverage.",
    emotionalPressure: "Pressure through rhetoric, politics, counters, and social combat.",
    loreRole: "orators, duelists, poets, and social power brokers",
    mechanics: "Inkling tokens, counters, combat negotiation, goad-like pressure, and life-drain politics",
    tableExperience: "public leverage, sharpened alliances, and words that become damage",
    thesis: "Silverquill read you as someone who knows a sentence can change the room. White gives the form; black gives the edge. Together, the deck turns social pressure into a combat plan.",
    closeReason: "language, politics, ambition, and public leverage",
    forkQuestion: "Who moves when the right words land?",
    direction: "moves sideways into influence and pressure",
  },
  WITHERBLOOM: {
    shortName: "Witherbloom",
    tableRole: "The life-exchanger",
    opponentRead: "Opponents feel the deck converting bodies, pests, and life totals into a working engine.",
    emotionalPressure: "Pressure through life exchange, sacrifice, drain, and practical survival.",
    loreRole: "pest mages, essence workers, bog naturalists, and life-cycle scholars",
    mechanics: "Pest tokens, sacrifice, lifegain, lifedrain, recursion, and essence exchange",
    tableExperience: "metabolic pressure where every gain, loss, and small body feeds the engine",
    thesis: "Witherbloom read you as someone who studies life by touching the exchange directly. Green supplies growth and bodies; black supplies cost and appetite. Together, the deck turns survival into a craft.",
    closeReason: "life exchange, pests, sacrifice, and practical ecology",
    forkQuestion: "What must be spent so the living engine keeps working?",
    direction: "moves downward into essence, body, and exchange",
  },
};

function normalizeCardName(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function uniqueTagRefs(refs = []) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = `${ref.category}:${ref.tag}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function taxonomyEntry(taxonomy, category, tag) {
  return (taxonomy?.tags || []).find((entry) => entry.category === category && entry.tag === tag) || null;
}

function textIncludesTag(text, entry) {
  const haystack = normalizeCardName(text);
  const paddedHaystack = haystack ? ` ${haystack} ` : "";
  return [entry.tag, entry.display_name, ...(entry.aliases || [])]
    .map(normalizeCardName)
    .filter(Boolean)
    .some((needle) => haystack === needle || paddedHaystack.includes(` ${needle} `));
}

function queryTerm(value, field = "o") {
  const cleaned = String(value || "").trim().toLowerCase();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned.replace(/"/g, "")}"` : `${field}:${cleaned}`;
}

function queryTermsForTags(tagRefs = [], taxonomy = null, field = "o") {
  const terms = [];
  uniqueTagRefs(tagRefs).slice(0, 4).forEach((ref) => {
    const entry = taxonomyEntry(taxonomy, ref.category, ref.tag);
    if (!entry) return;
    terms.push(queryTerm(entry.tag, field));
    (entry.aliases || []).slice(0, 1).forEach((alias) => terms.push(queryTerm(alias, field)));
  });
  return [...new Set(terms)].filter(Boolean);
}

function groupedOr(terms = []) {
  return terms.length ? `(${terms.join(" OR ")})` : "";
}

function getFaction(factions, key) {
  return factions?.[key] || null;
}

export function presentationForFaction(factionOrKey) {
  const key = typeof factionOrKey === "string" ? factionOrKey : factionOrKey?.key;
  const faction = typeof factionOrKey === "string" ? null : factionOrKey;
  const guidance = getCommanderFactionGuidance(faction || key);
  return FACTION_PRESENTATION[key] || {
    shortName: faction?.name || key || "This path",
    tableRole: "The pilot",
    opponentRead: "Opponents experience the deck through its repeated play patterns and the choices it forces.",
    emotionalPressure: "Pressure through the mechanics, resources, and table behavior this reading selected.",
    loreRole: guidance?.ownedThemes?.slice(0, 3).join(", ") || faction?.philosophy || "faction identity",
    mechanics: guidance?.spellcraftIdentity || "Commander mechanics that make the faction plan visible",
    tableExperience: guidance?.commanderPlan || "a recognizable Commander table role",
    thesis: `${faction?.name || "This faction"} read your answers as a playable pattern, not a personality label. The deck should make that pattern visible through its cards, combat, resources, and table pressure.`,
    closeReason: guidance?.ownedThemes?.slice(0, 3).join(", ") || "a nearby Commander pressure",
    forkQuestion: "What does this path do with the same tension?",
    direction: "moves toward its own Commander expression",
  };
}

export function confidencePercent(confidence) {
  const value = Number(confidence || 0);
  return value ? `${Math.round(value * 100)}%` : "unscored";
}

function confidenceBand(confidence) {
  const value = Number(confidence || 0);
  if (value >= 0.6) return "strong";
  if (value >= 0.3) return "moderate";
  return "emerging";
}

export function matchForFaction(result, factionKey) {
  return [...(result?.top_matches || []), ...(result?.adjacent_matches || [])]
    .find((match) => match?.faction === factionKey) || null;
}

export function primaryMatch(result) {
  return matchForFaction(result, result?.faction) || result?.top_matches?.[0] || null;
}

export function adjacentMatchForSummary(result, activeKey) {
  const matches = result?.adjacent_matches || [];
  if (activeKey && activeKey !== result?.faction) {
    return primaryMatch(result);
  }
  return matches[0] || null;
}

function factionDisplayName(factions, key) {
  return getFaction(factions, key)?.name || key || "the neighboring path";
}

export function buildContrastCopy(primaryFaction, adjacentFaction) {
  if (!primaryFaction || !adjacentFaction) return "";
  const primary = presentationForFaction(primaryFaction);
  const adjacent = presentationForFaction(adjacentFaction);

  if (primaryFaction.key === "WR" && adjacentFaction.key === "BG") {
    return "Both recognize harm and grievance. Boros asks: \"What line was crossed, and who must answer for it?\" Golgari asks: \"What can be reclaimed from what was lost?\" Boros moves outward into intervention. Golgari moves downward into endurance and recursion.";
  }

  return `Both paths recognized the same tension, but they solve it differently. ${primary.shortName} asks: "${primary.forkQuestion}" ${adjacent.shortName} asks: "${adjacent.forkQuestion}" ${primary.shortName} ${primary.direction}; ${adjacent.shortName} ${adjacent.direction}.`;
}

export function buildHeroNarrative({ dossier, faction, result, factions = {} }) {
  const presentation = presentationForFaction(faction);
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const adjacentFaction = adjacent?.faction ? getFaction(factions, adjacent.faction) : null;

  if (dossier.isPrimary && faction.key === "WR" && adjacentFaction?.key === "BG") {
    return `${presentation.thesis} Golgari stayed close because your answers carried grievance, endurance, and the memory of harm. But Golgari absorbs pain and turns it into survival. Boros turns harm into action.`;
  }

  if (!dossier.isPrimary) {
    const primaryFaction = getFaction(factions, dossier.primaryFactionKey);
    return `${presentation.thesis} This is an adjacent reading from your original ${primaryFaction?.name || "primary"} result, so it should feel related rather than disconnected. ${buildContrastCopy(primaryFaction, faction)}`;
  }

  const closeCopy = adjacentFaction
    ? ` ${adjacentFaction.name} stayed close because your answers also carried ${presentationForFaction(adjacentFaction).closeReason}. The deciding difference was how ${presentation.shortName} turns that pressure into ${presentation.tableExperience}.`
    : "";
  return `${presentation.thesis}${closeCopy}`;
}

export function technicalSignalCopy(result, activeKey) {
  const match = matchForFaction(result, activeKey) || primaryMatch(result);
  return `Signal strength: ${confidencePercent(match?.confidence || result?.confidence)}`;
}

export function buildReadingSignalCopy({ dossier, faction, result, factions = {} }) {
  const activeMatch = matchForFaction(result, dossier.targetFactionKey) || primaryMatch(result);
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const band = confidenceBand(activeMatch?.confidence || result?.confidence);
  const presentation = presentationForFaction(faction);

  if (!dossier.isPrimary) {
    const primaryName = dossier.primaryFaction?.name || factionDisplayName(factions, dossier.primaryFactionKey);
    return `${faction.name} remained close to your ${primaryName} reading with a ${band} signal. It is not a new diagnosis; it is the neighboring fork where the same answers become ${presentation.tableExperience}.`;
  }

  if (!adjacent?.faction) {
    return `${faction.name} led with a ${band} signal. The result points toward ${presentation.tableExperience}, then asks you to turn that identity into a Commander plan.`;
  }

  const adjacentFaction = getFaction(factions, adjacent.faction);
  const adjacentPresentation = presentationForFaction(adjacentFaction);
  return `${faction.name} led with a ${band} signal. The reading was not one-note; ${adjacentFaction?.name || adjacent.faction_name} remained nearby, which suggests your answers carried both ${presentation.closeReason} and ${adjacentPresentation.closeReason}. The deciding difference was motion: this result chose the path that ${presentation.direction}.`;
}

export function selectReadingTagRefs({ dossier, faction, result, taxonomy }) {
  const evidenceText = (result?.evidence_trail || [])
    .flatMap((entry) => [entry.signal, entry.answer_title, entry.prompt])
    .filter(Boolean)
    .join(" ");
  const text = [
    dossier?.decreeCopy,
    dossier?.commanderPath?.copy,
    dossier?.commanderPath?.spellcraft,
    faction?.tagline,
    faction?.philosophy,
    ...(dossier?.archetypes || []).flatMap((item) => [item.name, item.desc]),
    evidenceText,
  ].filter(Boolean).join(" ");

  const categoryOrder = new Map([
    ["mechanical", 0],
    ["playstyle", 1],
    ["identity", 2],
    ["lore-tone", 3],
  ]);

  return uniqueTagRefs((taxonomy?.tags || [])
    .filter((entry) => textIncludesTag(text, entry))
    .map((entry) => ({ category: entry.category, tag: entry.tag })))
    .sort((left, right) =>
      (categoryOrder.get(left.category) ?? 9) - (categoryOrder.get(right.category) ?? 9) ||
      left.tag.localeCompare(right.tag)
    )
    .slice(0, 9);
}

export function buildTagExplanationSummaries({ tagRefs = [], faction, taxonomy, limit = 4 }) {
  const refs = uniqueTagRefs(tagRefs).slice(0, limit);
  const presentation = presentationForFaction(faction);
  if (!refs.length) {
    return [{
      title: `${presentation.shortName} pressure`,
      meaning: presentation.tableExperience,
      copy: "This reading was driven by faction identity and Commander table role more than a single mechanical tag.",
      helper: "",
    }];
  }

  return refs.map((ref) => {
    const entry = taxonomyEntry(taxonomy, ref.category, ref.tag);
    if (!entry) return null;
    const actions = (entry.typical_actions || []).slice(0, 2).join(" and ");
    const actionCopy = actions ? ` In deck terms, that often means ${actions}.` : "";
    return {
      category: ref.category,
      tag: ref.tag,
      title: entry.display_name,
      meaning: entry.vox_mana_interpretation,
      copy: `${entry.table_feel || entry.player_fantasy || entry.vox_mana_interpretation} In this ${presentation.shortName} reading, it points toward ${presentation.tableExperience}.${actionCopy}`,
      helper: entry.new_player_note || "",
    };
  }).filter(Boolean);
}

function readingIdForResult(result) {
  return [
    result?.model_version || result?.version || "reading",
    result?.source_mode || "archscry",
    result?.faction || "unknown",
    confidencePercent(result?.confidence).replace(/[^0-9a-z]+/gi, ""),
  ].filter(Boolean).join("-").toLowerCase();
}

function appendUrlParams(url, params, origin = "http://localhost") {
  const parsed = new URL(url, origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      parsed.searchParams.set(key, value);
    }
  });
  return parsed.origin === origin
    ? `${parsed.pathname}${parsed.search}${parsed.hash}`
    : parsed.toString();
}

export function buildArchscryMazeContext({ result, dossier, faction }) {
  const readingId = readingIdForResult(result);
  const returnUrl = `/archscry/?from=maze&view=${encodeURIComponent(dossier.targetFactionKey)}&readingId=${encodeURIComponent(readingId)}#maze-discovery-paths`;
  return {
    from: "archscry",
    readingId,
    guild: result?.faction || dossier.primaryFactionKey,
    fit: dossier.targetFactionKey,
    factionName: faction?.name || dossier.faction?.name || dossier.targetFactionKey,
    readingTitle: `${faction?.name || "Vox Mana"} dossier`,
    pathType: "",
    plainReadingQuery: "",
    operatorQuery: "",
    returnUrl,
  };
}

export function withArchscryMazeContext(links = [], context, origin = "http://localhost") {
  return (links || []).map((link) => {
    const isMaze = link?.service === "maze" || String(link?.url || "").startsWith("/maze/");
    if (!isMaze) return link;
    const operatorQuery = resolveMazeOperatorQuery(link, origin);
    const pathType = resolveMazePathType(link);
    const plainReadingQuery = resolveMazePlainReadingQuery(link, {
      factionName: context.factionName,
      pathLabel: MAZE_PATH_LABELS[pathType] || "Maze path",
    });
    return {
      ...link,
      pathType,
      plainReadingQuery,
      operatorQuery,
      url: appendUrlParams(link.url, {
        from: "archscry",
        readingId: context.readingId,
        guild: context.guild,
        fit: context.fit,
        factionName: context.factionName,
        readingTitle: context.readingTitle,
        pathType,
        plainReadingQuery,
        operatorQuery,
        returnUrl: context.returnUrl,
      }, origin),
    };
  });
}

export function buildPersonalizedMazePaths({ faction, tagRefs, taxonomy }) {
  const identity = getColorIdentity(faction?.colors || faction?.key || "").toLowerCase() || "c";
  const oracleGroup = groupedOr(queryTermsForTags(tagRefs, taxonomy, "o"));
  const flavorTerms = groupedOr([
    ...queryTermsForTags(tagRefs.filter((ref) => ref.category === "identity" || ref.category === "lore-tone"), taxonomy, "ft"),
  ]);
  const supportGroup = oracleGroup || "(o:draw OR o:token OR o:graveyard OR o:sacrifice OR o:return)";
  const flavorGroup = flavorTerms || "(ft:death OR ft:secret OR ft:fire OR ft:growth OR ft:law)";

  return [
    buildMazeSearchLink({
      label: "commanders that fit",
      query: `ci<=${identity} t:legendary t:creature f:commander ${supportGroup}`,
      pathType: "commanders-that-fit",
      plainReadingQuery: `${faction?.name || "this reading"} commanders that fit the same table identity`,
    }),
    buildMazeSearchLink({
      label: "cards that support this shape",
      query: `ci<=${identity} f:commander -t:legendary ${supportGroup}`,
      pathType: "support-cards",
      plainReadingQuery: `${faction?.name || "this reading"} support cards for the deck shape`,
    }),
    buildMazeSearchLink({
      label: "flavor echoes",
      query: `ci<=${identity} ${flavorGroup}`,
      pathType: "flavor-echoes",
      plainReadingQuery: `${faction?.name || "this reading"} flavor echoes and story motifs`,
    }),
    buildMazeSearchLink({
      label: "weird stretch commanders",
      query: `f:commander t:legendary t:creature -ci<=${identity} ${supportGroup}`,
      pathType: "weird-stretch-commanders",
      plainReadingQuery: `strange commanders that echo ${faction?.name || "this reading"} from outside the color identity`,
    }),
  ];
}

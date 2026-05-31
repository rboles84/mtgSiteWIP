import {
  getCommanderFactionGuidance,
  getExternalDeckRoutingAlias,
} from "./commander-dossier.js";
import {
  buildDossierMazePathEntries,
  mazeSearchLink as buildMazeSearchLink,
  resolveMazeOperatorQuery,
  resolveMazePathType,
  resolveMazePlainReadingQuery,
} from "./maze-handoff.js";

export const MAZE_PATH_LABELS = {
  "commanders-that-fit": "Commanders That Fit",
  "support-cards": "Support Cards",
  "flavor-echoes": "Flavor Echoes",
  "weird-stretch-commanders": "Outside-Color Commander Stretch",
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
  BANT: {
    shortName: "Bant",
    tableRole: "The supported champion",
    opponentRead: "Opponents feel the deck choosing one line, protecting it carefully, and making every support piece look like public trust made visible.",
    emotionalPressure: "Pressure through honor, refinement, protection, and the question of whether strength can remain worthy while others stand behind it.",
    loreRole: "Alara shard context read through source-grounded White-centered order, Blue refinement, Green belonging, sigils, exalted support, and communal honor",
    mechanics: "Exalted, auras, equipment, blink, ETB value, enchantress, Clues, counters, and protection as Commander support texture, not new lore-canon claims",
    tableExperience: "one protected champion, refined support, living order, and communal trust becoming visible pressure",
    thesis: "Bant read your answers as strength that wants to stay answerable. White sets the public standard, Blue refines the line of action, and Green keeps that line alive through belonging and support.",
    closeReason: "public honor, refined protection, living support, communal trust, and champion responsibility",
    forkQuestion: "What strength remains worthy when a whole community stands behind it?",
    direction: "moves toward protected excellence, public trust, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that chooses a worthy threat or board plan, surrounds it with support, protects it carefully, and makes excellence feel accountable to the whole.",
  },
  ESPER: {
    shortName: "Esper",
    tableRole: "The system refiner",
    opponentRead: "Opponents feel the deck making the future smaller and cleaner: cards turn into options, options turn into answers, and answers arrive exactly when the table thought it had room.",
    emotionalPressure: "Pressure through precision, planning, information advantage, and the sense that the game is being redesigned while it is still happening.",
    loreRole: "Alara shard context read through source-grounded Blue-centered perfectibility, White ordered improvement, and Black focused control",
    mechanics: "Control, card advantage, library setup, artifacts, lifegain, reanimation value, tokens, and evasive pressure as Commander support texture for planned refinement and controlled change",
    tableExperience: "careful setup, protected engines, clean answers, and a future that narrows as Esper understands the table",
    thesis: "Esper read your answers as potential waiting for a better design. Blue looks for the pattern, White gives improvement a structure, and Black makes information useful enough to control the outcome.",
    closeReason: "perfectibility, planning, structured optimization, information advantage, and designed control",
    forkQuestion: "What would change if the system became legible enough to redesign?",
    direction: "moves toward planned refinement, controlled change, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that sets up carefully, keeps answers ready, and turns knowledge into advantage before the table realizes its best line has narrowed.",
  },
  GRIXIS: {
    shortName: "Grixis",
    tableRole: "The survival strategist",
    opponentRead: "Opponents feel the deck measuring weak points, preserving the answer that matters, and taking the opening before the table can close it.",
    emotionalPressure: "Pressure through scarcity, calculation, urgency, and the feeling that every delayed answer becomes someone else's leverage.",
    loreRole: "Alara shard context read through source-grounded Black-centered survival, Blue calculation, and Red immediacy",
    mechanics: "Removal, discard, sacrifice, recursion, card draw, and spell pressure as Commander support texture, not lore-canon proof or the whole identity",
    tableExperience: "survival control, calculated leverage, and urgent openings that make each answer feel spent for a reason",
    thesis: "Grixis read you as someone who survives by seeing the weak point before the room admits it exists. Black keeps the self alive, Blue finds the leverage, and Red moves before the opening closes.",
    closeReason: "survival, self-advocacy, calculated leverage, urgency, and volatility under pressure",
    forkQuestion: "What opening must be taken before it closes?",
    direction: "moves toward survival, leverage, and immediate Commander expression",
    selfCheck: "This may fit if you want a Commander deck that treats removal, discard, recursion, sacrifice, and spell pressure as tools for staying alive and converting one narrow opening into control of the table.",
  },
  JUND: {
    shortName: "Jund",
    tableRole: "The appetite engine",
    opponentRead: "Opponents feel the deck as pressure made visible: the board asks what they can survive before they know which piece matters most.",
    emotionalPressure: "Pressure through instinct, appetite, survival, and consequences that arrive before the table finishes bargaining.",
    loreRole: "Alara shard, Red-centered self-truth, Black appetite, Green instinct, and consequence under pressure",
    mechanics: "Combat, sacrifice, graveyard value, counters, damage, and resource conversion as mechanical echoes, not lore-canon examples",
    tableExperience: "pressure becoming visible through attacks, spent resources, graveyards, and consequences that force the table to show what it can survive",
    thesis: "The blood knows before the mind can bargain. Jund treats feeling as a compass: Red supplies self-truth and action, Black honors appetite and self-interest, and Green strips away overthinking until instinct can move.",
    closeReason: "instinct, appetite, self-truth, survival, pressure, and consequence",
    forkQuestion: "What instinct is worth feeding?",
    direction: "moves toward appetite, consequence, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that acts from pressure instead of waiting for permission: attacking, feeding resources, forcing blocks, using the graveyard, and accepting consequences as part of the plan.",
  },
  NAYA: {
    shortName: "Naya",
    tableRole: "The living-world guardian",
    opponentRead: "Opponents feel the deck as a protected board becoming a habitat: mana grows, creatures gather, and scale turns belonging into pressure.",
    emotionalPressure: "Pressure through abundance, instinct, protection, and the sense that the whole living world is moving at once.",
    loreRole: "Alara shard, Green-centered living abundance, White care for the whole, Red instinct, and belonging inside a larger natural world",
    mechanics: "Ramp, protection, creature engines, tokens, counters, lands, and combat texture as support-only ways to show abundance, instinct, and creature-forward scale",
    tableExperience: "grow mana, guard the living whole, build a protected board, and let creature-forward scale make the table answer abundance",
    thesis: "Naya read your answers as life becoming relation before it becomes force. Green supplies growth and place, White keeps the larger whole in view, and Red makes protection immediate enough to move when the bond is threatened.",
    closeReason: "abundance, living world belonging, protected board growth, creature-forward scale, instinct, and care for the whole",
    forkQuestion: "When growth becomes immense, what keeps it faithful to the living whole?",
    direction: "moves toward belonging, instinctive care, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that grows mana, protects a living board, and turns creature-forward scale into pressure without losing the bond that holds the whole together.",
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

  if (primaryFaction.key === "JUND" && adjacentFaction.key === "RG") {
    return "Both paths recognize pressure, instinct, and refusal, but they solve them differently. Jund asks: \"What instinct is worth feeding?\" Gruul asks: \"What boundary deserves to be broken?\" Jund moves toward appetite, consequence, and Commander expression. Gruul moves toward impact, refusal, and the force of breaking through.";
  }

  if (primaryFaction.key === "RG" && adjacentFaction.key === "JUND") {
    return "Both paths recognize pressure, instinct, and refusal, but they solve them differently. Gruul asks: \"What boundary deserves to be broken?\" Jund asks: \"What instinct is worth feeding?\" Gruul moves toward impact, refusal, and the force of breaking through. Jund moves toward appetite, consequence, and Commander expression.";
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

export function selectReadingTagRefs({ dossier, result, taxonomy, modelMechanics = "" }) {
  const evidenceText = (result?.evidence_trail || [])
    .flatMap((entry) => [entry.signal, entry.answer_title, entry.prompt])
    .filter(Boolean)
    .join(" ");
  const commanderText = [
    dossier?.commanderPath?.copy,
    dossier?.commanderPath?.spellcraft,
    dossier?.commanderPath?.deckFooting,
    dossier?.commanderPath?.tableCautionText,
  ].filter(Boolean).join(" ");
  const archetypeText = (dossier?.archetypes || [])
    .flatMap((item) => [item.name, item.desc])
    .filter(Boolean)
    .join(" ");
  const mechanicsText = [modelMechanics].filter(Boolean).join(" ");
  const sourceTexts = {
    evidence: evidenceText,
    commander: commanderText,
    archetype: archetypeText,
    mechanics: mechanicsText,
  };

  const categoryOrder = new Map([
    ["mechanical", 0],
    ["playstyle", 1],
    ["identity", 2],
    ["lore-tone", 3],
  ]);

  return uniqueTagRefs((taxonomy?.tags || [])
    .map((entry) => {
      const matchedSources = Object.entries(sourceTexts)
        .filter(([, text]) => text && textIncludesTag(text, entry))
        .map(([source]) => source);
      if (!matchedSources.length) return null;

      const include = matchedSources.includes("evidence") || matchedSources.length >= 2;
      if (!include) return null;

      return { category: entry.category, tag: entry.tag };
    })
    .filter(Boolean))
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
      copy: "This reading points more clearly to a Commander table role and first deck plan than to one repeated mechanical tag.",
      helper: "",
    }];
  }

  return refs.map((ref) => {
    const entry = taxonomyEntry(taxonomy, ref.category, ref.tag);
    if (!entry) return null;
    const actions = (entry.typical_actions || []).slice(0, 2).join(" and ");
    const actionCopy = actions ? ` One common deck expression here is to ${actions}.` : "";
    const groundingCopy = entry.table_feel || entry.player_fantasy || entry.canonical_definition || entry.vox_mana_interpretation;
    const groundedSentence = /[.!?]$/.test(groundingCopy) ? groundingCopy : `${groundingCopy}.`;
    return {
      category: ref.category,
      tag: ref.tag,
      title: entry.display_name,
      meaning: entry.vox_mana_interpretation,
      copy: `${groundedSentence} In this ${presentation.shortName} reading, the result leans toward ${presentation.tableExperience}.${actionCopy}`,
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

function normalizeUrlBase(base = "http://localhost") {
  if (!base || base === "null") {
    return "http://localhost/";
  }
  return /^https?:\/\/[^/]+$/i.test(base) ? `${base}/` : base;
}

function appendUrlParams(url, params, origin = "http://localhost") {
  const base = normalizeUrlBase(
    typeof window !== "undefined" ? window.location.href : origin
  );
  const parsed = new URL(url, base);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      parsed.searchParams.set(key, value);
    }
  });
  if (parsed.protocol === "file:") {
    return parsed.href;
  }
  const baseUrl = new URL(base);
  return parsed.origin === baseUrl.origin
    ? `${parsed.pathname}${parsed.search}${parsed.hash}`
    : parsed.toString();
}

export function buildArchscryMazeContext({ result, dossier, faction }) {
  const readingId = readingIdForResult(result);
  const returnBase = "../archscry/index.html";
  const returnUrl = `${returnBase}?from=maze&view=${encodeURIComponent(dossier.targetFactionKey)}&readingId=${encodeURIComponent(readingId)}#maze-discovery-paths`;
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
    const rawUrl = String(link?.url || "");
    const mazeUrl = rawUrl.replace(/^\/maze\//, "../maze/index.html");
    const isMaze =
      link?.service === "maze" ||
      rawUrl.startsWith("/maze/") ||
      rawUrl.startsWith("../maze/");
    if (!isMaze) return link;
    const operatorQuery = resolveMazeOperatorQuery({ ...link, url: mazeUrl }, origin);
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
      url: appendUrlParams(mazeUrl, {
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
  const identity = getExternalDeckRoutingAlias(faction).colorIdentity.toLowerCase() || "c";
  const oracleTerms = queryTermsForTags(tagRefs, taxonomy, "o");
  const flavorTerms = [
    ...queryTermsForTags(tagRefs.filter((ref) => ref.category === "identity" || ref.category === "lore-tone"), taxonomy, "ft"),
  ];
  const factionKey = String(faction?.key || "").toUpperCase();

  return buildDossierMazePathEntries({
    identity,
    factionName: faction?.name || "this reading",
    oracleTerms,
    flavorTerms,
    identityHint: factionKey === "JUND" ? "Jund" : factionKey === "NAYA" ? "Naya" : "",
    includeOutsideColorStretch: !["GRIXIS", "JUND", "NAYA"].includes(factionKey)
  }).map((entry) => buildMazeSearchLink({
    label: entry.label,
    query: entry.query,
    pathType: entry.pathType,
    plainReadingQuery: entry.plainReadingQuery,
  }));
}

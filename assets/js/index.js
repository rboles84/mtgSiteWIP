import {
  DEFAULT_STARTER_PROFILE,
  MANA_ORDER,
  RESULT_VERSION,
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  getStageLabel,
  replayAdaptiveSelections,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
} from "./adaptive-placement.js";
import {
  buildCommanderDossier,
  createArchidektTagCatalog,
  buildMtgDecksCommanderUrl,
  getExternalDeckRoutingAlias,
  getColorIdentity,
  getCommanderFactionGuidance,
  getServiceChipMeta,
} from "./commander-dossier.js";
import {
  mazeSearchLink as buildMazeSearchLink,
  resolveMazeOperatorQuery,
  resolveMazePathType,
  resolveMazePlainReadingQuery,
} from "./maze-handoff.js";

const SESSION = VM_SESSION;
const COLOR_META = {
  W: { label: "White", fill: "#ede8d4" },
  U: { label: "Blue", fill: "#2a7ac8" },
  B: { label: "Black", fill: "linear-gradient(90deg,#08060b 0%,#291b3d 48%,#0f0c12 100%)" },
  R: { label: "Red", fill: "#d04030" },
  G: { label: "Green", fill: "#2a8a30" },
};

const APP_STATE = {
  factions: {},
  placementModel: null,
  quickIndex: 0,
  quickAnswers: [],
  quickSelections: [],
  adaptiveState: null,
  currentQuickQuestion: null,
  activeResult: null,
  activeViewKey: null,
  resultSource: "quick",
  returnSection: null,
  interviewState: "idle",
  starterProfile: { ...DEFAULT_STARTER_PROFILE },
  deckTagCatalog: null,
  tagTaxonomy: null,
  tagTaxonomyByKey: new Map(),
  scryfallFlavorIndex: null,
  scryfallCommanderIndex: null,
  scryfallCommanderByName: new Map(),
  scryfallColorThemeIndex: null,
  scryfallMechanicThemeIndex: null,
  previousViewKey: null,
  mazeReturnUrl: "",
  mazeReturnAnchor: "",
};

const ARCHSCRY_MAZE_HANDOFF_KEY = "vm_archscry_maze_handoff_v1";
const MAZE_PATH_LABELS = {
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
const HELPER_COPY_VARIANTS = {
  flavorLead: [
    "Why it echoes",
    "Where it resonates",
    "What it carries forward",
  ],
  mazeTitle: [
    "Live paths through the Maze",
    "Threads to follow in the Maze",
    "Searchable echoes from this reading",
  ],
};
function systemCopyPattern(words, flags = "gi") {
  return new RegExp(`\\b${words.join("\\s+")}\\b`, flags);
}
const SYSTEM_COPY_REPLACEMENTS = [
  { pattern: systemCopyPattern(["product", "fit"]), replacement: "deck fit" },
  { pattern: systemCopyPattern(["model", "fit"]), replacement: "reading fit" },
  { pattern: systemCopyPattern(["generated", "candidate"]), replacement: "candidate" },
  { pattern: systemCopyPattern(["scored", "result"]), replacement: "reading result" },
  { pattern: systemCopyPattern(["confidence", "signal"]), replacement: "reading signal" },
  { pattern: systemCopyPattern(["specific", "grievance"]), replacement: "specific pressure" },
  { pattern: /\bCI\s+([WUBRG]{1,5})\b/g, replacement: "Color Identity: $1" },
  { pattern: systemCopyPattern(["Read", "In", "Apocrypha"], "g"), replacement: "Read in the source library" },
];
const MANA_SYMBOL_NAMES = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
  C: "Colorless",
};

const FACTION_PRESENTATION = {
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

/**
 * Returns true when the Scrying Terminal should be shown and wired up.
 *
 * @returns {boolean} True when the terminal is enabled.
 */
function isScryingTerminalEnabled() {
  return globalThis.VM_SITE_FLAGS?.SCRYING_TERMINAL_ENABLED === true;
}

/**
 * Applies the feature flag to terminal-only UI already in the DOM.
 */
function applyTerminalVisibility() {
  const enabled = isScryingTerminalEnabled();

  document.querySelectorAll("[data-vm-terminal-only]").forEach((node) => {
    node.hidden = !enabled;
  });

  const interviewSection = document.getElementById("interview");
  if (interviewSection) {
    interviewSection.hidden = !enabled;
  }
}

/**
 * Loads the canonical faction data file used by both quick mode and result rendering.
 *
 * @returns {Promise<object>} Canonical faction map keyed by faction code.
 */
async function loadFactionData() {
  const response = await fetch("/data/factions.json");
  if (!response.ok) {
    throw new Error("Could not load faction data.");
  }
  const json = await response.json();
  APP_STATE.factions = json.factions || {};
  return APP_STATE.factions;
}

/**
 * Loads the adaptive placement model used by the Gate -> Hall -> Crucible flow.
 *
 * @returns {Promise<object>} Generated placement model.
 */
async function loadPlacementModel() {
  const response = await fetch("/data/placement-model.json");
  if (!response.ok) {
    throw new Error("Could not load placement model.");
  }
  APP_STATE.placementModel = await response.json();
  return APP_STATE.placementModel;
}

/**
 * Loads the expanded Archidekt tag catalog used to build validated deck searches.
 *
 * @returns {Promise<object>} Resolved tag catalog.
 */
async function loadDeckTagCatalog() {
  const response = await fetch("/data/deck-tags_expanded.json");
  if (!response.ok) {
    throw new Error("Could not load Commander deck tags.");
  }
  APP_STATE.deckTagCatalog = createArchidektTagCatalog(await response.json());
  return APP_STATE.deckTagCatalog;
}

/**
 * Loads optional discovery indexes used to enrich Archscry results.
 *
 * The placement experience should still work when these files are absent.
 *
 * @returns {Promise<void>} Resolves after optional data has been attempted.
 */
async function loadDiscoveryData() {
  const [
    taxonomy,
    flavorIndex,
    commanderIndex,
    colorThemeIndex,
    mechanicThemeIndex,
  ] = await Promise.all([
    loadOptionalJson("/data/taxonomy/vox-mana-tags.json", "tag taxonomy"),
    loadOptionalJson("/data/scryfall/indexes/card-flavor-index.json", "Scryfall flavor index"),
    loadOptionalJson("/data/scryfall/indexes/commander-index.json", "Scryfall commander index"),
    loadOptionalJson("/data/scryfall/indexes/color-theme-index.json", "Scryfall color theme index"),
    loadOptionalJson("/data/scryfall/indexes/mechanic-theme-index.json", "Scryfall mechanic theme index"),
  ]);

  APP_STATE.tagTaxonomy = taxonomy;
  APP_STATE.tagTaxonomyByKey = buildTaxonomyLookup(taxonomy);
  APP_STATE.scryfallFlavorIndex = flavorIndex;
  APP_STATE.scryfallCommanderIndex = commanderIndex;
  APP_STATE.scryfallColorThemeIndex = colorThemeIndex;
  APP_STATE.scryfallMechanicThemeIndex = mechanicThemeIndex;
  APP_STATE.scryfallCommanderByName = new Map(
    (commanderIndex?.commanders || []).map((card) => [normalizeCardName(card.name), card])
  );
}

/**
 * Fetches optional JSON without failing the main page boot.
 *
 * @param {string} path Data path.
 * @param {string} label Human-readable label for warnings.
 * @returns {Promise<object|null>} Parsed JSON or null.
 */
async function loadOptionalJson(path, label) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Optional ${label} unavailable.`, error);
    return null;
  }
}

function buildTaxonomyLookup(taxonomy) {
  const map = new Map();
  (taxonomy?.tags || []).forEach((entry) => {
    map.set(`${entry.category}:${entry.tag}`, entry);
  });
  return map;
}

/**
 * Returns the canonical faction entry for a given key.
 *
 * @param {string} key Faction key.
 * @returns {object|null} Faction record when present.
 */
function getFaction(key) {
  return APP_STATE.factions[key] || null;
}

/**
 * Returns the user-facing label for a faction's institution type.
 *
 * @param {object} faction Faction record.
 * @returns {string} "Guild" or "College".
 */
function getInstitutionLabel(faction) {
  return faction?.institution_type === "college" ? "College" : "Guild";
}

function colorIdentityNames(colors) {
  const identity = Array.isArray(colors) ? colors : String(colors || "").split("");
  const names = identity
    .filter(Boolean)
    .map((color) => MANA_SYMBOL_NAMES[color.toUpperCase()] || color.toUpperCase());
  return names.length ? names.join(" + ") : "Colorless";
}

function basicLandNamesForColors(colors) {
  const basicNames = {
    W: "Plains",
    U: "Islands",
    B: "Swamps",
    R: "Mountains",
    G: "Forests",
  };
  return (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => basicNames[color.toUpperCase()])
    .filter(Boolean);
}

function basicLandGuidanceCopy(colors) {
  const colorSymbols = (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => color.toUpperCase())
    .filter((color) => MANA_SYMBOL_NAMES[color]);
  const basics = basicLandNamesForColors(colorSymbols);
  if (!basics.length) {
    return "After choosing your nonbasic lands, fill the rest with basics or colorless utility lands based on your early mana needs.";
  }
  if (basics.length === 1) {
    return `After choosing your nonbasic lands, fill the rest with ${basics[0]} unless your utility lands need more room.`;
  }
  const firstColor = (MANA_SYMBOL_NAMES[colorSymbols[0]] || basics[0]).toLowerCase();
  const secondColor = (MANA_SYMBOL_NAMES[colorSymbols[1]] || basics[1]).toLowerCase();
  return `After choosing your nonbasic lands, fill the rest with ${basics.join(" and ")} based on your early colored mana needs. If most early spells need ${firstColor}, lean ${basics[0]}. If your early interaction needs ${secondColor}, lean ${basics[1]}.`;
}

function presentationForFaction(factionOrKey) {
  const key = typeof factionOrKey === "string" ? factionOrKey : factionOrKey?.key;
  const faction = typeof factionOrKey === "string" ? getFaction(factionOrKey) : factionOrKey;
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

function confidenceBand(confidence) {
  const value = Number(confidence || 0);
  if (value >= 0.6) return "strong";
  if (value >= 0.3) return "moderate";
  return "emerging";
}

function confidencePercent(confidence) {
  const value = Number(confidence || 0);
  return value ? `${Math.round(value * 100)}%` : "unscored";
}

function matchForFaction(result, factionKey) {
  return [...(result?.top_matches || []), ...(result?.adjacent_matches || [])]
    .find((match) => match?.faction === factionKey) || null;
}

function primaryMatch(result) {
  return matchForFaction(result, result?.faction) || result?.top_matches?.[0] || null;
}

function adjacentMatchForSummary(result, activeKey) {
  const matches = result?.adjacent_matches || [];
  if (activeKey && activeKey !== result?.faction) {
    return primaryMatch(result);
  }
  return matches[0] || null;
}

function factionDisplayName(key) {
  return getFaction(key)?.name || key || "the neighboring path";
}

function buildContrastCopy(primaryFaction, adjacentFaction) {
  if (!primaryFaction || !adjacentFaction) return "";
  const primary = presentationForFaction(primaryFaction);
  const adjacent = presentationForFaction(adjacentFaction);

  if (primaryFaction.key === "WR" && adjacentFaction.key === "BG") {
    return "Both recognize harm and grievance. Boros asks: \"What line was crossed, and who must answer for it?\" Golgari asks: \"What can be reclaimed from what was lost?\" Boros moves outward into intervention. Golgari moves downward into endurance and recursion.";
  }

  return `Both paths recognized the same tension, but they solve it differently. ${primary.shortName} asks: "${primary.forkQuestion}" ${adjacent.shortName} asks: "${adjacent.forkQuestion}" ${primary.shortName} ${primary.direction}; ${adjacent.shortName} ${adjacent.direction}.`;
}

function buildHeroNarrative({ dossier, faction, result }) {
  const presentation = presentationForFaction(faction);
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const adjacentFaction = adjacent?.faction ? getFaction(adjacent.faction) : null;

  if (dossier.isPrimary && faction.key === "WR" && adjacentFaction?.key === "BG") {
    return `${presentation.thesis} Golgari stayed close because your answers carried grievance, endurance, and the memory of harm. But Golgari absorbs pain and turns it into survival. Boros turns harm into action.`;
  }

  if (!dossier.isPrimary) {
    const primaryFaction = getFaction(dossier.primaryFactionKey);
    return `${presentation.thesis} This is an adjacent reading from your original ${primaryFaction?.name || "primary"} result, so it should feel related rather than disconnected. ${buildContrastCopy(primaryFaction, faction)}`;
  }

  const closeCopy = adjacentFaction
    ? ` ${adjacentFaction.name} stayed close because your answers also carried ${presentationForFaction(adjacentFaction).closeReason}. The deciding difference was how ${presentation.shortName} turns that pressure into ${presentation.tableExperience}.`
    : "";
  return `${presentation.thesis}${closeCopy}`;
}

function technicalSignalCopy(result, activeKey) {
  const match = matchForFaction(result, activeKey) || primaryMatch(result);
  return `Signal strength: ${confidencePercent(match?.confidence || result?.confidence)}`;
}

function buildReadingSignalCopy({ dossier, faction, result }) {
  const activeMatch = matchForFaction(result, dossier.targetFactionKey) || primaryMatch(result);
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const band = confidenceBand(activeMatch?.confidence || result?.confidence);
  const presentation = presentationForFaction(faction);

  if (!dossier.isPrimary) {
    const primaryName = dossier.primaryFaction?.name || factionDisplayName(dossier.primaryFactionKey);
    return `${faction.name} remained close to your ${primaryName} reading with a ${band} signal. It is not a new diagnosis; it is the neighboring fork where the same answers become ${presentation.tableExperience}.`;
  }

  if (!adjacent?.faction) {
    return `${faction.name} led with a ${band} signal. The result points toward ${presentation.tableExperience}, then asks you to turn that identity into a Commander plan.`;
  }

  const adjacentFaction = getFaction(adjacent.faction);
  const adjacentPresentation = presentationForFaction(adjacentFaction);
  return `${faction.name} led with a ${band} signal. The reading was not one-note; ${adjacentFaction?.name || adjacent.faction_name} remained nearby, which suggests your answers carried both ${presentation.closeReason} and ${adjacentPresentation.closeReason}. The deciding difference was motion: this result chose the path that ${presentation.direction}.`;
}

function buildTableIdentityCardHtml(faction) {
  const presentation = presentationForFaction(faction);
  return `
    <div class="starter-card">
      <div class="starter-title">How The Deck Sits At The Table</div>
      <div class="table-identity-list">
        <div><span>Role</span>${escapeHtml(presentation.tableRole)}</div>
        <div><span>How opponents read it</span>${escapeHtml(presentation.opponentRead)}</div>
        <div><span>Emotional pressure</span>${escapeHtml(presentation.emotionalPressure)}</div>
      </div>
    </div>`;
}

function buildLoreToMechanicCardHtml(faction) {
  const presentation = presentationForFaction(faction);
  return `
    <div class="starter-card">
      <div class="starter-title">How The Lore Becomes Play</div>
      <div class="table-identity-list">
        <div><span>Lore role</span>${escapeHtml(presentation.loreRole)}</div>
        <div><span>Mechanical expression</span>${escapeHtml(presentation.mechanics)}</div>
        <div><span>Table experience</span>${escapeHtml(presentation.tableExperience)}</div>
      </div>
    </div>`;
}

function buildAdjacentContextHtml({ dossier, result }) {
  return "";
}

/**
 * Shows a single application section and scrolls back to the top of the page.
 *
 * @param {string} id Section id to reveal.
 */
function showSection(id) {
  if (id === "interview" && !isScryingTerminalEnabled()) {
    id = "landing";
  }

  ["landing", "quick", "interview", "result"].forEach((sectionId) => {
    const node = document.getElementById(sectionId);
    if (node) {
      node.classList.toggle("hidden", sectionId !== id);
    }
  });
  window.scrollTo(0, 0);
}

/**
 * Updates the topbar based on the current session and saved-placement state.
 */
function updateTopbar() {
  const bar = document.getElementById("topbar");
  const identity = document.getElementById("tb-identity");
  const signOut = document.getElementById("tb-signout");
  const retake = document.getElementById("tb-retake");
  const avatar = document.getElementById("tb-avatar");
  const name = document.getElementById("tb-name");
  const placement = document.getElementById("tb-placement");
  const profileResult = SESSION.profile?.placementResult || null;
  const activeResult = APP_STATE.activeResult || profileResult;
  const faction = getFaction(activeResult?.faction);

  bar.classList.remove("hidden");

  if (!SESSION.username) {
    identity.classList.add("hidden");
    signOut.classList.add("hidden");
    retake.classList.add("hidden");
    return;
  }

  identity.classList.remove("hidden");
  signOut.classList.remove("hidden");
  retake.classList.toggle("hidden", !activeResult);
  name.textContent = SESSION.username;
  placement.textContent = faction ? `${faction.name}` : "Signed in";

  if (SESSION.avatarUrl) {
    avatar.innerHTML = `<img src="${SESSION.avatarUrl}" alt="${SESSION.username}">`;
  } else {
    avatar.innerHTML = `<span class="tb-avatar-fallback">${(SESSION.username[0] || "?").toUpperCase()}</span>`;
  }
}

/**
 * Opens the research page.
 */
function openResearch() {
  window.location = "/maze/";
}

/**
 * Opens Apocrypha.
 */
function openLibrary() {
  window.location = "/apocrypha/";
}

/**
 * Resets local quick-path state and interview UI back to a neutral state.
 */
function resetLocalFlow() {
  APP_STATE.quickIndex = 0;
  APP_STATE.quickAnswers = [];
  APP_STATE.quickSelections = [];
  APP_STATE.adaptiveState = APP_STATE.placementModel
    ? createInitialAdaptiveState(APP_STATE.placementModel)
    : null;
  APP_STATE.currentQuickQuestion = null;
  APP_STATE.activeResult = null;
  APP_STATE.activeViewKey = null;
  APP_STATE.interviewState = "idle";
  vm_resetInterview();
  const output = document.getElementById("terminal-output");
  const decree = document.getElementById("decree-container");
  if (output) {
    output.innerHTML = "";
    output.style.opacity = "1";
  }
  if (decree) {
    decree.classList.remove("visible");
  }
  document.getElementById("terminal-error").textContent = "";
  document.getElementById("terminal-status").textContent = "";
  document.getElementById("terminal-input").value = "";
  updateInterviewControls("idle");
}

/**
 * Clears the saved placement when needed and returns the app to the landing page.
 */
async function handleRetake() {
  if (SESSION.username) {
    await vm_clearPlacement();
  }
  resetLocalFlow();
  updateTopbar();
  showSection("landing");
}

/**
 * Signs the user out and returns to the landing page.
 */
async function handleSignOut() {
  await vm_signOut();
  resetLocalFlow();
  updateTopbar();
  showSection("landing");
}

/**
 * Starts the adaptive Gate -> Hall -> Crucible quick reading flow.
 */
function startQuickFlow() {
  if (!APP_STATE.placementModel) {
    alert("The placement model is still loading. Try again in a moment.");
    return;
  }

  APP_STATE.adaptiveState = createInitialAdaptiveState(APP_STATE.placementModel);
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickSelections = [];
  APP_STATE.quickAnswers = [];
  APP_STATE.quickIndex = 0;
  showSection("quick");
  renderQuickQuestion();
}

/**
 * Starts the deep interview flow using the current starter-profile preferences.
 */
async function startInterviewFlow() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  showSection("interview");
  resetInterviewDossier();
  await beginInterview();
}

/**
 * Returns to the previous quick question when possible.
 */
function goBackQuickQuestion() {
  if (!APP_STATE.quickSelections.length) {
    showSection("landing");
    return;
  }

  APP_STATE.quickSelections.pop();
  APP_STATE.quickAnswers.pop();
  APP_STATE.adaptiveState = replayAdaptiveSelections(
    APP_STATE.placementModel,
    APP_STATE.quickSelections
  );
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;
  renderQuickQuestion();
}

/**
 * Renders the active adaptive question and answer cards.
 */
function renderQuickQuestion() {
  const question = APP_STATE.currentQuickQuestion;
  const progressFill = document.getElementById("progress-fill");
  const progressCopy = document.getElementById("progress-copy");
  const backButton = document.getElementById("quick-back-btn");

  if (!question) {
    finalizeQuickReading();
    return;
  }

  const stageLabel = getStageLabel(question.stage);
  const stageCounts = APP_STATE.adaptiveState?.stage_counts || {};
  const stageQuestionNumber = (stageCounts[question.stage] || 0) + 1;
  const questionNumber = APP_STATE.quickSelections.length + 1;
  const maxQuestions = APP_STATE.placementModel?.stages?.max_total_questions || 8;

  document.getElementById("question-eyebrow").textContent =
    question.eyebrow || `${stageLabel} ${stageQuestionNumber}`;
  document.getElementById("question-title").textContent = question.prompt;
  document.getElementById("answer-grid").innerHTML = question.answers
    .map((answer, index) => {
      return `
        <div class="answer-card">
          <button type="button" onclick="answerQuickQuestion(${index})">
            <div class="answer-title">${answer.title}</div>
            <div class="answer-copy">${answer.copy}</div>
          </button>
        </div>`;
    })
    .join("");

  progressCopy.textContent = `${stageLabel} ${stageQuestionNumber} - Question ${questionNumber} of up to ${maxQuestions}`;
  progressFill.style.width = `${Math.min(100, (questionNumber / maxQuestions) * 100)}%`;
  backButton.textContent = APP_STATE.quickSelections.length === 0 ? "Return to landing" : "Back";
}

/**
 * Records the selected answer for the current quick question and advances the flow.
 *
 * @param {number} answerIndex Selected answer index.
 */
function answerQuickQuestion(answerIndex) {
  const question = APP_STATE.currentQuickQuestion;
  const answer = question?.answers?.[answerIndex];
  if (!answer) {
    return;
  }

  APP_STATE.quickSelections.push({ question, answer, answerIndex });
  APP_STATE.quickAnswers.push(answer);
  APP_STATE.adaptiveState = applyAdaptiveAnswer({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    question,
    answer,
    answerIndex,
  });
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;

  if (shouldFinishAdaptiveReading(APP_STATE.adaptiveState, APP_STATE.placementModel)) {
    finalizeQuickReading();
    return;
  }

  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  renderQuickQuestion();
}

/**
 * Creates a normalized starter profile for use in result payloads.
 *
 * @returns {{format_interest:string,budget_band:string,experience_level:string}} Current starter profile.
 */
function getStarterProfile() {
  return {
    format_interest: APP_STATE.starterProfile.format_interest,
    budget_band: APP_STATE.starterProfile.budget_band,
    experience_level: APP_STATE.starterProfile.experience_level,
  };
}

/**
 * Finalizes the adaptive quick reading, stores the normalized result locally, and opens the dossier.
 */
function finalizeQuickReading() {
  const result = buildAdaptivePlacementResult({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    factions: APP_STATE.factions,
    starterProfile: getStarterProfile(),
    version: RESULT_VERSION,
  });

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
  APP_STATE.resultSource = "quick";
  APP_STATE.returnSection = null;
  SESSION.interviewResult = result;
  vm_cachePlacementResult(result);
  renderResult();
}

/**
 * Updates the interview controls to reflect the current terminal state.
 *
 * @param {"idle"|"loading"|"interviewing"|"decided"} state Interview UI state.
 * @param {number=} turn Current turn number when known.
 */
function updateInterviewControls(state, turn) {
  APP_STATE.interviewState = state;
  const input = document.getElementById("terminal-input");
  const submit = document.getElementById("terminal-submit");
  const status = document.getElementById("terminal-status");
  const loading = state === "loading";
  const decided = state === "decided";

  input.disabled = loading || decided;
  submit.disabled = loading || decided || input.value.trim().length < 3;
  status.textContent = turn ? `Interviewing... Turn ${turn} of 5` : "";
}

/**
 * Appends a line to the Scrying Terminal transcript.
 *
 * @param {"recruiter"|"user"} role Speaker role.
 * @param {string} content Text content to append.
 * @param {boolean=} loading True when the line is a loading placeholder.
 * @returns {HTMLElement} Appended message element.
 */
function appendTerminalMessage(role, content, loading) {
  const output = document.getElementById("terminal-output");
  const line = document.createElement("div");
  line.className = `terminal-message ${role}${loading ? " loading" : ""}`;
  line.textContent = content;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
  return line;
}

/**
 * Resets the decree panel before a new interview begins.
 */
function resetInterviewDossier() {
  document.getElementById("terminal-output").innerHTML = "";
  document.getElementById("decree-container").classList.remove("visible");
  document.getElementById("terminal-error").textContent = "";
  document.getElementById("terminal-status").textContent = "";
  document.getElementById("terminal-input").value = "";
  updateInterviewControls("idle");
}

/**
 * Starts the terminal interview and loads the opening recruiter prompt.
 *
 * @returns {Promise<void>} Resolves once the opening prompt is rendered.
 */
async function beginInterview() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  resetInterviewDossier();
  updateInterviewControls("loading", 1);
  const loader = appendTerminalMessage("recruiter", "The scrying glass hums.", true);

  try {
    const data = await vm_startInterview({
      starter_profile: getStarterProfile(),
      current_result: APP_STATE.activeResult || null,
    });
    loader.remove();
    appendTerminalMessage("recruiter", data.response || "Speak, and be weighed.");
    updateInterviewControls("interviewing", data.turn || 1);
    document.getElementById("terminal-input").focus();
  } catch (error) {
    loader.remove();
    document.getElementById("terminal-error").textContent =
      "The Scrying Terminal failed to open cleanly. Wait a breath, then try again.";
    updateInterviewControls("idle");
  }
}

/**
 * Submits the user's next interview reply to the edge function.
 *
 * @returns {Promise<void>} Resolves once the response is rendered.
 */
async function submitInterview() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  const input = document.getElementById("terminal-input");
  const text = input.value.trim();
  if (text.length < 3 || APP_STATE.interviewState === "loading" || APP_STATE.interviewState === "decided") {
    return;
  }

  document.getElementById("terminal-error").textContent = "";
  appendTerminalMessage("user", text);
  input.value = "";
  updateInterviewControls("loading");
  const loader = appendTerminalMessage("recruiter", "Interpreting your answer", true);

  try {
    const data = await vm_conductInterview(text);
    loader.remove();
    appendTerminalMessage("recruiter", data.response || "The glass stills.");

    if (data.decided && data.result) {
      await revealDecree(data.result);
      updateInterviewControls("decided", data.turn || 5);
    } else {
      updateInterviewControls("interviewing", data.turn || undefined);
      input.focus();
    }
  } catch (error) {
    loader.remove();
    document.getElementById("terminal-error").textContent =
      "The terminal lost the thread. Try one concrete answer about what you would do next.";
    updateInterviewControls("interviewing");
    input.focus();
  }
}

/**
 * Renders the interview decree and caches the active result for the dossier page.
 *
 * @param {object} result Normalized interview result.
 * @returns {Promise<void>} Resolves after the reveal animation has completed.
 */
function revealDecree(result) {
  return new Promise((resolve) => {
    const decree = document.getElementById("decree-container");
    const rule = document.getElementById("decree-rule");
    const faction = getFaction(result.faction) || {};

    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = result.faction;
    APP_STATE.resultSource = "interview";
    APP_STATE.returnSection = "interview";
    vm_cachePlacementResult(result);

    setTimeout(() => {
      document.getElementById("terminal-output").style.opacity = "0.4";
      document.getElementById("decree-title").textContent = result.faction_name || result.faction || "Unbound Order";
      document.getElementById("decree-tagline").textContent = faction.tagline || "The scrying glass has spoken.";
      document.getElementById("decree-text").textContent = result.decree || "The decree remains unwritten.";
      document.getElementById("decree-runner").textContent =
        result.adjacent_matches?.[0]?.faction_name
          ? `The reading also noted an affinity for ${result.adjacent_matches[0].faction_name}.`
          : "";
      rule.style.background = faction.accent || "var(--gold-d)";
      decree.classList.add("visible");
      resolve();
    }, 1200);
  });
}

/**
 * Opens the full dossier from an interview result without requiring a save first.
 */
function openInterviewDossier() {
  if (!APP_STATE.activeResult) {
    return;
  }
  APP_STATE.resultSource = "interview";
  APP_STATE.returnSection = "interview";
  if (!history.state?.vmDossier) {
    history.pushState({ vmDossier: true, returnSection: "interview" }, "", "#dossier");
  }
  renderResult();
}

/**
 * Returns from an interview-sourced dossier to the Scrying Terminal context.
 */
function returnToInterviewSource() {
  APP_STATE.returnSection = null;
  showSection("interview");
  updateTopbar();
}

/**
 * Saves the current active placement using Google OAuth when needed.
 *
 * @returns {Promise<void>} Resolves when the save flow has been started or completed.
 */
async function handleSavePlacement() {
  const button = document.getElementById("save-placement-btn");
  const result = APP_STATE.activeResult || SESSION.interviewResult;
  if (!result) {
    return;
  }

  button.disabled = true;
  button.textContent = "Saving...";

  try {
    const sb = getSupabase();
    const {
      data: { session },
    } = await sb.auth.getSession();

    if (session?.user) {
      const saved = await vm_savePlacementResult(result);
      APP_STATE.activeResult = saved;
      APP_STATE.activeViewKey = saved.faction;
      button.textContent = "Saved to Google";
      renderResult();
      return;
    }

    await vm_saveWithGoogle(result);
  } catch (error) {
    button.disabled = false;
    button.textContent = "Retry Save";
    document.getElementById("terminal-error").textContent =
      error.message || "Could not save placement.";
  }
}

/**
 * Builds the external deck-link buttons for a deck card.
 *
 * @param {object[]} links Link descriptors.
 * @param {string=} className Additional anchor class.
 * @returns {string} Link button HTML.
 */
function buildLinkButtons(links, className = "") {
  return (links || [])
    .map((link) => {
      const service = getServiceChipMeta(link);
      const classes = ["deck-link", "service-chip", `service-${service.key}`, className].filter(Boolean).join(" ");
      const targetAttrs = service.key === "maze" ? "" : ' target="_blank" rel="noopener"';
      return `
        <a class="${classes}" href="${escapeHtml(link.url)}"${targetAttrs} data-service="${service.key}" style="--service-color:${service.color};--service-glow:${service.glow}">
          <span class="service-mark" aria-hidden="true">${service.mark}</span>
          <span class="service-copy">
            <span class="service-name">${service.label}</span>
            <span class="service-label">${escapeHtml(link.label)}</span>
          </span>
        </a>`;
    })
    .join("");
}

function dedupeLinks(links = []) {
  const seen = new Set();
  return (links || []).filter((link) => {
    const key = `${link?.service || ""}:${link?.url || ""}:${link?.label || ""}`;
    if (!link?.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function searchSlug(value) {
  return normalizeCardName(value).replace(/\s+/g, "-");
}

function siteSearchUrl(service, query) {
  const encoded = encodeURIComponent(query);
  // Source search patterns are intentionally conservative where stable deep links are uncertain.
  if (service === "moxfield") return `https://www.moxfield.com/decks/public/advanced?format=commander&filter=${encoded}`;
  if (service === "mtgdecks") return `https://mtgdecks.net/Commander?search=${encoded}`;
  return `https://www.google.com/search?q=${encoded}`;
}

function buildCommanderSpecificLinks(candidates = [], service) {
  return (candidates || []).slice(0, 2).map((candidate) => {
    const name = candidate?.name || candidate?.display_name || "";
    if (!name) return null;
    if (service === "edhrec" && candidate.edhrec) {
      return { service, label: name, url: candidate.edhrec };
    }
    if (service === "scryfall" && candidate.scryfall) {
      return { service, label: name, url: candidate.scryfall };
    }
    if (service === "edhrec") {
      return { service, label: name, url: `https://edhrec.com/commanders/${searchSlug(name)}` };
    }
    if (service === "mtgdecks") {
      return { service, label: name, url: buildMtgDecksCommanderUrl(name) };
    }
    return { service, label: name, url: siteSearchUrl(service, `${name} Commander`) };
  }).filter(Boolean);
}

function buildDeckDiscoveryGroups({
  faction,
  archidektLinks,
  commanderDirectoryLinks,
  commanderCandidates,
  tagRefs,
}) {
  const identity = getColorIdentity(faction?.colors || faction?.key || "");
  const identityLabel = `${identity} Commander`;
  const topTag = uniqueTagRefs(tagRefs)[0];
  const tagEntry = topTag ? taxonomyEntry(topTag.category, topTag.tag) : null;
  const routingAlias = getExternalDeckRoutingAlias(faction);

  return [
    {
      service: "edhrec",
      name: "EDHREC",
      desc: "Browse commanders and theme pages by color identity, then compare common packages before choosing a list.",
      links: dedupeLinks([
        ...commanderDirectoryLinks.filter((link) => getServiceChipMeta(link).key === "edhrec"),
        { service: "edhrec", label: `${routingAlias.label} commanders`, url: routingAlias.edhrecUrl },
        ...buildCommanderSpecificLinks(commanderCandidates, "edhrec"),
      ]).slice(0, 4),
    },
    {
      service: "archidekt",
      name: "Archidekt",
      desc: "Use color and catalog-tag lanes when you want deckbuilder-native filtering.",
      links: dedupeLinks(archidektLinks).slice(0, 4),
    },
    {
      service: "mtgdecks",
      name: "MTGDecks",
      desc: "Start with the color lane, then search commander names when you want tournament-adjacent deck examples.",
      links: dedupeLinks([
        ...commanderDirectoryLinks.filter((link) => getServiceChipMeta(link).key === "mtgdecks"),
        ...buildCommanderSpecificLinks(commanderCandidates, "mtgdecks"),
      ]).slice(0, 4),
    },
  ].filter((group) => group.links.length);
}

function buildDeckDiscoveryHtml(groups = []) {
  return groups.map((group) => `
    <div class="deck-card deck-source-${escapeHtml(group.service)}">
      <div class="deck-format">${escapeHtml(group.name)}</div>
      <div class="deck-name">${escapeHtml(group.name)} starting points</div>
      <div class="deck-desc">${escapeHtml(group.desc)}</div>
      <div class="deck-links">${buildLinkButtons(group.links)}</div>
    </div>`).join("");
}

function readingIdForResult(result) {
  return [
    result?.model_version || result?.version || "reading",
    result?.source_mode || "archscry",
    result?.faction || "unknown",
    confidencePercent(result?.confidence).replace(/[^0-9a-z]+/gi, ""),
  ].filter(Boolean).join("-").toLowerCase();
}

function appendUrlParams(url, params) {
  const parsed = new URL(url, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      parsed.searchParams.set(key, value);
    }
  });
  return parsed.origin === window.location.origin
    ? `${parsed.pathname}${parsed.search}${parsed.hash}`
    : parsed.toString();
}

function buildArchscryMazeContext({ result, dossier, faction }) {
  const readingId = readingIdForResult(result);
  const returnUrl = `/archscry/?from=maze&view=${encodeURIComponent(dossier.targetFactionKey)}&readingId=${encodeURIComponent(readingId)}#maze-discovery-paths`;
  return {
    from: "archscry",
    readingId,
    guild: result?.faction || dossier.primaryFactionKey,
    fit: dossier.targetFactionKey,
    factionName: faction?.name || factionDisplayName(dossier.targetFactionKey),
    readingTitle: `${faction?.name || "Vox Mana"} dossier`,
    pathType: "",
    plainReadingQuery: "",
    operatorQuery: "",
    returnUrl,
  };
}

function queryFromMazeLink(link = {}) {
  return resolveMazeOperatorQuery(link, window.location.origin);
}

function pathTypeForMazeLink(link = {}) {
  return resolveMazePathType(link);
}

function withArchscryMazeContext(links = [], context) {
  return (links || []).map((link) => {
    const isMaze = getServiceChipMeta(link).key === "maze" || String(link?.url || "").startsWith("/maze/");
    if (!isMaze) return link;
    const operatorQuery = queryFromMazeLink(link);
    const pathType = pathTypeForMazeLink(link);
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
      }),
    };
  });
}

function writeArchscryDossierHandoff(result, context) {
  try {
    localStorage.setItem(ARCHSCRY_MAZE_HANDOFF_KEY, JSON.stringify({
      ...context,
      placementResult: result,
      updatedAt: new Date().toISOString(),
    }));
  } catch (_) {}
}

function readArchscryDossierHandoff() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ARCHSCRY_MAZE_HANDOFF_KEY) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_) {
    return null;
  }
}

function requestedDossierViewKey() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("view") || params.get("fit") || params.get("guild") || "").toUpperCase();
}

function captureMazeReturnUrl() {
  const params = new URLSearchParams(window.location.search);
  APP_STATE.mazeReturnUrl = params.get("mazeReturnUrl") || "";
  APP_STATE.mazeReturnAnchor = params.get("from") === "maze" && window.location.hash === "#maze-discovery-paths"
    ? "maze-discovery-paths"
    : "";
}

function escapeHtml(value) {
  return sanitizeUserFacingCopy(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeUserFacingCopy(value) {
  return SYSTEM_COPY_REPLACEMENTS.reduce(
    (copy, rule) => copy.replace(rule.pattern, rule.replacement),
    String(value ?? "")
  );
}

function normalizeCardName(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function taxonomyEntry(category, tag) {
  return APP_STATE.tagTaxonomyByKey.get(`${category}:${tag}`) || null;
}

function tagRefsForRecord(record = {}) {
  return [
    ...(record.detected_tags?.mechanical || []).map((tag) => ({ category: "mechanical", tag })),
    ...(record.detected_tags?.playstyle || []).map((tag) => ({ category: "playstyle", tag })),
    ...(record.detected_tags?.identity || []).map((tag) => ({ category: "identity", tag })),
    ...(record.lore_tones || []).map((tag) => ({ category: "lore-tone", tag })),
  ];
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

function textIncludesTag(text, entry) {
  const haystack = String(text || "").toLowerCase();
  return [entry.tag, entry.display_name, ...(entry.aliases || [])]
    .filter(Boolean)
    .some((needle) => haystack.includes(String(needle).toLowerCase()));
}

function selectReadingTagRefs({ dossier, faction, result }) {
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

  return uniqueTagRefs((APP_STATE.tagTaxonomy?.tags || [])
    .filter((entry) => textIncludesTag(text, entry))
    .map((entry) => ({ category: entry.category, tag: entry.tag })))
    .sort((left, right) =>
      (categoryOrder.get(left.category) ?? 9) - (categoryOrder.get(right.category) ?? 9) ||
      left.tag.localeCompare(right.tag)
    )
    .slice(0, 9);
}

function renderTagChips(tagRefs = [], limit = 6) {
  return uniqueTagRefs(tagRefs)
    .slice(0, limit)
    .map((ref) => {
      const entry = taxonomyEntry(ref.category, ref.tag);
      if (!entry) return "";
      return `<span class="vm-tag-chip" title="${escapeHtml(entry.canonical_definition)}">${escapeHtml(entry.display_name)}</span>`;
    })
    .join("");
}

function renderTagInterpretations(tagRefs = [], limit = 3) {
  return uniqueTagRefs(tagRefs)
    .slice(0, limit)
    .map((ref) => {
      const entry = taxonomyEntry(ref.category, ref.tag);
      if (!entry) return "";
      const note = entry.new_player_note || entry.table_feel || entry.canonical_definition;
      return `
        <div class="tag-interpretation">
          <div class="tag-interpretation-name">${escapeHtml(entry.display_name)}</div>
          <div class="starter-copy">${escapeHtml(entry.vox_mana_interpretation)}</div>
          <div class="tag-helper">${escapeHtml(note)}</div>
        </div>`;
    })
    .join("");
}

function tagWhyFitsCopy(entry, faction) {
  const presentation = presentationForFaction(faction);
  const actions = (entry.typical_actions || []).slice(0, 2).join(" and ");
  const actionCopy = actions ? ` In deck terms, that often means ${actions}.` : "";
  return `${entry.table_feel || entry.player_fantasy || entry.vox_mana_interpretation} In this ${presentation.shortName} reading, it points toward ${presentation.tableExperience}.${actionCopy}`;
}

function buildTagExplanationCards(tagRefs = [], faction, limit = 4) {
  const refs = uniqueTagRefs(tagRefs).slice(0, limit);
  if (!refs.length) {
    const presentation = presentationForFaction(faction);
    return `
      <div class="starter-card">
        <div class="starter-title">${escapeHtml(presentation.shortName)} pressure</div>
        <div class="tag-meaning">${escapeHtml(presentation.tableExperience)}</div>
        <div class="starter-copy">This reading was driven by faction identity and Commander table role more than a single mechanical tag.</div>
      </div>`;
  }

  return refs.map((ref) => {
    const entry = taxonomyEntry(ref.category, ref.tag);
    if (!entry) return "";
    return `
      <div class="starter-card tag-explainer-card">
        <div class="starter-title">${escapeHtml(entry.display_name)}</div>
        <div class="tag-meaning">${escapeHtml(entry.vox_mana_interpretation)}</div>
        <div class="starter-copy">${escapeHtml(tagWhyFitsCopy(entry, faction))}</div>
        ${entry.new_player_note ? `<div class="tag-helper">${escapeHtml(entry.new_player_note)}</div>` : ""}
      </div>`;
  }).join("");
}

function isColorIdentitySubset(cardIdentity = [], factionColors = []) {
  const allowed = new Set(factionColors || []);
  return (cardIdentity || []).every((color) => allowed.has(color));
}

function wordExcerpt(value, maxWords = 18) {
  const words = String(value || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function stablePhrase(kind, key) {
  const variants = HELPER_COPY_VARIANTS[kind] || [];
  if (!variants.length) return "";
  const hash = String(key || kind)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return variants[hash % variants.length];
}

function flavorExcerptForCard(card) {
  return card.flavor_excerpt || (card.card_faces || []).find((face) => face.flavor_excerpt)?.flavor_excerpt || "";
}

function selectFlavorEchoes({ faction, tagRefs }) {
  const desired = new Set(uniqueTagRefs(tagRefs).map((ref) => `${ref.category}:${ref.tag}`));
  const cards = APP_STATE.scryfallFlavorIndex?.cards || [];
  const factionColors = faction?.colors || [];

  return cards
    .map((card) => {
      const refs = tagRefsForRecord(card);
      const identityFits = isColorIdentitySubset(card.color_identity || [], factionColors);
      const tagMatches = refs.filter((ref) => desired.has(`${ref.category}:${ref.tag}`));
      const toneMatches = tagMatches.filter((ref) => ref.category === "identity" || ref.category === "lore-tone");
      const score =
        (identityFits ? 5 : 0) +
        tagMatches.length * 3 +
        toneMatches.length * 2 +
        (flavorExcerptForCard(card) ? 1 : 0) +
        ((card.image_uris?.art_crop || card.image_uris?.normal) ? 1 : 0);
      return { card, refs, tagMatches, score };
    })
    .filter((item) => item.score > 4 && flavorExcerptForCard(item.card))
    .sort((left, right) => right.score - left.score || left.card.name.localeCompare(right.card.name))
    .slice(0, 3);
}

function queryTerm(value, field = "o") {
  const cleaned = String(value || "").trim().toLowerCase();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned.replace(/"/g, "")}"` : `${field}:${cleaned}`;
}

function queryTermsForTags(tagRefs = [], field = "o") {
  const terms = [];
  uniqueTagRefs(tagRefs).slice(0, 4).forEach((ref) => {
    const entry = taxonomyEntry(ref.category, ref.tag);
    if (!entry) return;
    terms.push(queryTerm(entry.tag, field));
    (entry.aliases || []).slice(0, 1).forEach((alias) => terms.push(queryTerm(alias, field)));
  });
  return [...new Set(terms)].filter(Boolean);
}

function groupedOr(terms = []) {
  return terms.length ? `(${terms.join(" OR ")})` : "";
}

function mazeSearchLink(label, query, service = "maze", pathType = "", plainReadingQuery = "") {
  return buildMazeSearchLink({ label, query, service, pathType, plainReadingQuery });
}

function buildPersonalizedMazePaths({ faction, tagRefs, flavorEchoes }) {
  const identity = getColorIdentity(faction?.colors || faction?.key || "").toLowerCase() || "c";
  const oracleGroup = groupedOr(queryTermsForTags(tagRefs, "o"));
  const flavorTerms = groupedOr([
    ...queryTermsForTags(tagRefs.filter((ref) => ref.category === "identity" || ref.category === "lore-tone"), "ft"),
  ]);
  const supportGroup = oracleGroup || "(o:draw OR o:token OR o:graveyard OR o:sacrifice OR o:return)";
  const flavorGroup = flavorTerms || "(ft:death OR ft:secret OR ft:fire OR ft:growth OR ft:law)";

  return [
    mazeSearchLink(
      "commanders that fit",
      `ci<=${identity} t:legendary t:creature f:commander ${supportGroup}`,
      "maze",
      "commanders-that-fit",
      `${faction?.name || "this reading"} commanders that fit the same table identity`
    ),
    mazeSearchLink(
      "cards that support this shape",
      `ci<=${identity} f:commander -t:legendary ${supportGroup}`,
      "maze",
      "support-cards",
      `${faction?.name || "this reading"} support cards for the deck shape`
    ),
    mazeSearchLink(
      "flavor echoes",
      `ci<=${identity} ${flavorGroup}`,
      "maze",
      "flavor-echoes",
      `${faction?.name || "this reading"} flavor echoes and story motifs`
    ),
    mazeSearchLink(
      "weird stretch commanders",
      `f:commander t:legendary t:creature -ci<=${identity} ${supportGroup}`,
      "maze",
      "weird-stretch-commanders",
      `strange commanders that echo ${faction?.name || "this reading"} from outside the color identity`
    ),
  ];
}

function buildDiscoverySummaryHtml({ dossier, faction, result, tagRefs }) {
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const adjacentFaction = adjacent?.faction ? getFaction(adjacent.faction) : null;
  const signalCopy = buildReadingSignalCopy({ dossier, faction, result });

  return `
    <div class="starter-section">
      <div class="section-label">The Shape of the Reading</div>
      <div class="starter-grid">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${escapeHtml(dossier.isPrimary ? `Why ${faction.name} Rose First` : `${faction.name} As Adjacent Fit`)}</div>
          <div class="starter-copy">${escapeHtml(signalCopy)}</div>
          <div class="signal-technical">${escapeHtml(technicalSignalCopy(result, dossier.targetFactionKey))}</div>
        </div>
      </div>
    </div>`;
}

function buildDossierInterpretationHtml({ dossier, faction, result, tagRefs }) {
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const adjacentFaction = adjacent?.faction ? getFaction(adjacent.faction) : null;
  const contrastCopy = adjacentFaction
    ? buildContrastCopy(dossier.isPrimary ? faction : getFaction(dossier.primaryFactionKey), dossier.isPrimary ? adjacentFaction : faction)
    : "";
  const forkHtml = contrastCopy
    ? `<div class="starter-section">
        <div class="section-label">Faction Fork</div>
        <div class="starter-grid">
          <div class="starter-card starter-card-wide">
            <div class="starter-title">Where This Path Divides</div>
            <div class="starter-copy">${escapeHtml(contrastCopy)}</div>
          </div>
        </div>
      </div>`
    : "";

  return `
    ${forkHtml}
    <div class="starter-section">
      <div class="section-label">Table Identity</div>
      <div class="starter-grid">${buildTableIdentityCardHtml(faction)}</div>
    </div>
    <div class="starter-section">
      <div class="section-label">Lore To Mechanic</div>
      <div class="starter-grid">${buildLoreToMechanicCardHtml(faction)}</div>
    </div>
    <div class="starter-section">
      <div class="section-label">Why This Fits You</div>
      <div class="starter-grid">${buildTagExplanationCards(tagRefs, faction, 4)}</div>
    </div>`;
}

function buildFlavorEchoWhy({ card, tagMatches, faction }) {
  const presentation = presentationForFaction(faction);
  const bestRef = tagMatches.find((ref) => ref.category === "identity" || ref.category === "lore-tone") || tagMatches[0];
  const entry = bestRef ? taxonomyEntry(bestRef.category, bestRef.tag) : null;
  const lead = stablePhrase("flavorLead", `${faction?.key || faction?.name}:${card?.name}:${bestRef?.tag || ""}`);
  if (entry) {
    return `${lead}: ${entry.vox_mana_interpretation} Here, that card moment supports ${presentation.shortName}'s ${presentation.tableExperience}.`;
  }
  return `${lead}: this card belongs to the same emotional shape as the reading: ${presentation.tableExperience}.`;
}

function buildFlavorEchoesHtml(flavorEchoes = [], faction = {}) {
  if (!flavorEchoes.length) return "";
  return `
    <div class="starter-section">
      <div class="section-label">Flavor Echoes</div>
      <div class="flavor-echo-grid">
        ${flavorEchoes.map(({ card, tagMatches }) => {
          const excerpt = wordExcerpt(flavorExcerptForCard(card), 18);
          const image = card.image_uris?.art_crop || card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.art_crop || "";
          const why = buildFlavorEchoWhy({ card, tagMatches, faction });
          return `
            <a class="flavor-echo-card" href="${escapeHtml(card.scryfall_uri || "#")}" target="_blank" rel="noopener">
              ${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : ""}
              <span class="flavor-echo-body">
                <span class="flavor-echo-name">${escapeHtml(card.name)}</span>
                <span class="flavor-echo-kicker">Card moment</span>
                <span class="flavor-echo-text">${escapeHtml(excerpt)}</span>
                <span class="flavor-echo-why">${escapeHtml(why)}</span>
                <span class="vm-tag-row">${renderTagChips(tagMatches, 3)}</span>
              </span>
            </a>`;
        }).join("")}
      </div>
    </div>`;
}

function buildMazeDiscoveryHtml(paths = []) {
  if (!paths.length) return "";
  const title = stablePhrase("mazeTitle", paths.map((path) => path.pathType || path.label).join("|"));
  return `
    <div class="starter-section" id="maze-discovery-paths">
      <div class="section-label">Maze Discovery Paths</div>
      <div class="starter-grid">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${escapeHtml(title)}</div>
          <div class="starter-copy">Open live searchable paths shaped by this dossier. Each thread keeps a way back here, so discoveries can wander through Scryfall without losing the reading that began them.</div>
          <div class="starter-links">${buildLinkButtons(paths)}</div>
        </div>
      </div>
    </div>`;
}

function scrollToAnchorOnce(anchor) {
  const hash = anchor || APP_STATE.mazeReturnAnchor;
  if (!hash) return;
  const target = document.getElementById(hash);
  if (!target) return;

  window.requestAnimationFrame(() => {
    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
  });
}

function buildApocryphaHtml(faction) {
  return "";
}

function indexedCommanderForCandidate(candidate) {
  return APP_STATE.scryfallCommanderByName.get(normalizeCardName(candidate?.name || "")) || null;
}

function commanderMetaHtml(indexed) {
  if (!indexed) return "";
  return [
    indexed.type_line ? `<span>${escapeHtml(indexed.type_line)}</span>` : "",
  ].filter(Boolean).join("");
}

/**
 * Returns the active placement result and viewing key for result rendering.
 *
 * @returns {{result:object|null,viewKey:string|null}} Active result context.
 */
function getActiveResultContext() {
  return {
    result: APP_STATE.activeResult || SESSION.profile?.placementResult || vm_getCachedPlacementResult(),
    viewKey: APP_STATE.activeViewKey || APP_STATE.activeResult?.faction || SESSION.profile?.placementResult?.faction || null,
  };
}

/**
 * Renders the main dossier view for the active placement result.
 *
 * @param {string=} viewKey Optional faction key to view inside the current result.
 */
function renderResult(viewKey) {
  const context = getActiveResultContext();
  const result = context.result;
  const activeKey = viewKey || context.viewKey;
  const terminalEnabled = isScryingTerminalEnabled();

  if (!result || !activeKey) {
    document.getElementById("result-inner").innerHTML = `
      <div class="empty-state">
        <h2>No reading yet.</h2>
        <p>Start with the quick path, then come back here for the full dossier.</p>
        <div class="landing-actions" style="justify-content:center;margin-top:1.5rem">
          <button class="btn-primary" type="button" onclick="showSection('landing')">Go to landing</button>
        </div>
      </div>`;
    showSection("result");
    updateTopbar();
    return;
  }

  const starterProfile = result.starter_profile || getStarterProfile();
  const dossier = buildCommanderDossier({
    factions: APP_STATE.factions,
    placementModel: APP_STATE.placementModel,
    deckTagCatalog: APP_STATE.deckTagCatalog,
    placementResult: result,
    targetFactionKey: activeKey,
    starterProfile,
  });
  const faction = dossier.faction.record;
  const institutionLabel = getInstitutionLabel(faction);
  const isPrimary = dossier.isPrimary;
  const archidektSearchLinks = dossier.links.archidekt || [];
  const commanderLane = dossier.commanderLane;
  const commanderDirectoryLinks = dossier.links.commanderStart || [];
  const commanderPreviewCandidates = dossier.commanderRecommendations || [];
  const landRecommendations = dossier.landRecommendations || {};
  const readingTagRefs = selectReadingTagRefs({ dossier, faction, result });
  const flavorEchoes = selectFlavorEchoes({ faction, tagRefs: readingTagRefs });
  const mazeContext = buildArchscryMazeContext({ result, dossier, faction });
  writeArchscryDossierHandoff(result, mazeContext);
  const personalizedMazePaths = withArchscryMazeContext(
    buildPersonalizedMazePaths({ faction, tagRefs: readingTagRefs, flavorEchoes }),
    mazeContext
  );
  const discoverySummaryHtml = buildDiscoverySummaryHtml({ dossier, faction, result, tagRefs: readingTagRefs });
  const dossierInterpretationHtml = buildDossierInterpretationHtml({ dossier, faction, result, tagRefs: readingTagRefs });
  const flavorEchoesHtml = buildFlavorEchoesHtml(flavorEchoes, faction);
  const mazeDiscoveryHtml = buildMazeDiscoveryHtml(personalizedMazePaths);
  const apocryphaHtml = buildApocryphaHtml(faction);
  const heroNarrative = buildHeroNarrative({ dossier, faction, result });
  const adjacentContextHtml = buildAdjacentContextHtml({ dossier, result });
  const scoreBarsHtml = dossier.manaAlignment.map(({ color, value }) => {
    const target = Math.min(100, value * 10);
    return `<div class="score-row score-row-${color}"><span class="score-label">${COLOR_META[color].label}</span><div class="score-track"><div class="score-fill score-fill-${color}" style="width:0;background:${COLOR_META[color].fill}" data-target="${target}"></div></div><span class="score-val">${value}</span></div>`;
  }).join("");

  const archetypeHtml = (dossier.archetypes || [])
    .map((item) => `<div class="arch-card"><div class="arch-name">${item.name}</div><div class="arch-desc">${item.desc}</div></div>`)
    .join("");

  function cardSlots(items, prefix, placeholderClass, imageClass) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="staple-wrap"><div class="${placeholderClass}" id="${id}">${name}</div><div class="staple-name">${name}</div></div>`;
      })
      .join("");
  }

  function landSlots(items, prefix) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="land-wrap"><div class="land-placeholder" id="${id}">${name}</div><div class="land-name">${name}</div></div>`;
      })
      .join("");
  }

  function commanderPreviewSlots(items) {
    return (items || [])
      .map((candidate, index) => {
        const id = `cmd_${index}`;
        const indexed = indexedCommanderForCandidate(candidate);
        const meta = commanderMetaHtml(indexed);
        const tagChips = indexed ? renderTagChips(tagRefsForRecord(indexed), 3) : "";
        return `
          <div class="commander-preview-card" data-commander-card>
            <div class="commander-art-shell">
              <div class="commander-placeholder" id="${id}">${candidate.name}</div>
            </div>
            <div class="commander-preview-body">
              <div class="commander-name">${candidate.name}</div>
              ${meta ? `<div class="commander-meta">${meta}</div>` : ""}
              <div class="commander-desc">${candidate.desc}</div>
              ${tagChips ? `<div class="commander-tags">${tagChips}</div>` : ""}
            </div>
          </div>`;
      })
      .join("");
  }

  const commanderFallbackClass = commanderPreviewCandidates.length ? "" : " is-visible";
  const commanderPreviewHtml = `
    <div class="commander-preview-block">
      <div class="commander-preview-label">Commander starting points</div>
      ${commanderPreviewCandidates.length ? `<div class="commander-preview-grid" id="commander-preview-grid">${commanderPreviewSlots(commanderPreviewCandidates)}</div>` : ""}
      <div class="commander-preview-fallback${commanderFallbackClass}" id="commander-preview-fallback">
        ${buildLinkButtons(commanderDirectoryLinks)}
      </div>
    </div>`;

  const adjacentMatches = dossier.adjacentFits || [];
  const adjacentHtml = adjacentMatches.length
    ? adjacentMatches
        .map((fit) => {
          return `
            <div class="adjacent-card ${fit.factionKey === activeKey ? "active" : ""}">
              <div class="adjacent-label">${fit.world}</div>
              <div class="adjacent-name">${fit.name}</div>
              <div class="adjacent-copy">${fit.reason || fit.tagline}</div>
              <div class="adjacent-actions">
                <button class="adjacent-btn" type="button" onclick="switchAdjacentView('${fit.factionKey}')">View this fit</button>
              </div>
            </div>`;
        })
        .join("")
    : terminalEnabled
      ? `<div class="adjacent-card"><div class="adjacent-name">No adjacent fits saved yet.</div><div class="adjacent-copy">Retake or use the Scrying Terminal to generate a fuller read.</div></div>`
      : `<div class="adjacent-card"><div class="adjacent-name">No adjacent fits saved yet.</div><div class="adjacent-copy">Retake the quick reading to generate a fuller read.</div></div>`;
  const adjacentSectionHtml = `
    <div class="adjacent-section" id="adjacent-fits">
      <div class="section-label">Adjacent Fits</div>
      <div class="adjacent-grid">${adjacentHtml}</div>
    </div>`;
  const resultStatus = dossier.resultStatus;
  const returnToPrimaryButton = !isPrimary
    ? `<div class="footer-button-row"><button class="btn-secondary" type="button" onclick="returnToPrimaryReading()">Back to Primary Reading</button></div>`
    : "";
  const primaryPlacementHtml = isPrimary
    ? adjacentSectionHtml
    : `
      <div class="result-status">
        <strong>${resultStatus}</strong>
        ${SESSION.username ? ` Saved under ${SESSION.username}.` : ""}
      </div>`;

  const saveButtonLabel = SESSION.username ? "Save this reading" : "Save with Google";
  const returnToTerminalButton =
    terminalEnabled && APP_STATE.resultSource === "interview"
      ? `<button class="btn-secondary" type="button" onclick="returnToInterviewSource()">Return to the Terminal</button>`
      : "";
  const decreeCopy = dossier.decreeCopy;
  const readingOmens = dossier.readingOmens || [];
  const manaSectionLabel = isPrimary
    ? "Mana Alignment"
    : `Reading Mana Alignment - Commander Colors: ${colorIdentityNames(faction.colors || dossier.faction.colorIdentity || getColorIdentity(faction.colors))}`;
  const evidenceHtml = readingOmens.length
    ? readingOmens
        .map((omen) => `
          <div class="starter-card omen-card">
            <div class="omen-index">${omen.title}</div>
            <div class="starter-title">${omen.answerTitle}</div>
            <div class="starter-copy">${omen.copy}</div>
          </div>`)
        .join("")
    : "";

  const pipsHtml = (faction.colors || []).map((color) => `<div class="pip pip-${color}"></div>`).join("");
  const decksHtml = buildDeckDiscoveryHtml(buildDeckDiscoveryGroups({
    faction,
    archidektLinks: archidektSearchLinks,
    commanderDirectoryLinks,
    commanderCandidates: commanderPreviewCandidates,
    tagRefs: readingTagRefs,
  }));
  const landLaneCopy = {
    premium: "Best when you want speed, consistency, and fewer tapped lands.",
    midrange: "Good first upgrade lane: stronger fixing without chasing every premium land.",
    budget: "Playable entry point. Expect more tapped lands, but the deck will still function.",
    utility: "Adds Commander flexibility beyond color fixing.",
  };
  const basicLandCopy = basicLandGuidanceCopy(faction.colors || []);
  const utilityTierHtml = (landRecommendations.utility || []).length
    ? `
        <div class="land-tier tier-utility">
          <div class="land-tier-label">Utility</div>
          <div class="land-tier-copy">${landLaneCopy.utility}</div>
          <div class="land-cards-row">${landSlots(landRecommendations.utility, "lu")}</div>
        </div>`
    : "";

  document.getElementById("result-inner").innerHTML = `
    ${adjacentContextHtml}

    <div class="guild-banner" style="background:${faction.banner}">
      <div class="guild-eyebrow">${isPrimary ? `Your ${institutionLabel}` : `Adjacent ${institutionLabel} Fit`}</div>
      <div class="guild-name" style="color:${faction.accent}">${faction.name}</div>
      <div class="guild-tagline">${faction.tagline}</div>
      <div class="mana-pips">${pipsHtml}</div>
      <div class="guild-philosophy">${escapeHtml(heroNarrative)}</div>
      <div class="guild-lore-summary">${faction.philosophy}</div>
    </div>

    ${primaryPlacementHtml}
    ${returnToPrimaryButton}

    <div class="scores-section">
      <div class="section-label">${manaSectionLabel}</div>
      <div class="score-bars">${scoreBarsHtml}</div>
    </div>

    ${discoverySummaryHtml}

    ${dossierInterpretationHtml}

    ${evidenceHtml ? `
      <div class="starter-section">
        <div class="section-label">Reading Omens</div>
        <div class="starter-grid">${evidenceHtml}</div>
      </div>` : ""}

    ${!isPrimary ? adjacentSectionHtml : ""}

    <div class="starter-section">
      <div class="section-label">Start Here</div>
      <div class="starter-grid starter-grid-start">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${commanderLane.title}</div>
          <div class="starter-copy">${commanderLane.copy}</div>
          <div class="starter-notes">
            ${commanderLane.details.map((detail) => `
              <div class="starter-note">
                <div class="starter-note-label">${detail.label}</div>
                <div class="starter-copy">${detail.copy}</div>
              </div>`).join("")}
          </div>
          <div class="starter-links">${buildLinkButtons(commanderDirectoryLinks)}</div>
          ${commanderPreviewHtml}
        </div>
      </div>
    </div>

    ${flavorEchoesHtml}
    <div class="decks-section">
      <div class="section-label">Commander Deck Starts</div>
      <div class="decks-grid">${decksHtml}</div>
    </div>
    <div class="archetypes-section">
      <div class="section-label">Playstyle Archetypes</div>
      <div class="archetypes-grid">${archetypeHtml}</div>
    </div>
    <div class="staples-section">
      <div class="section-label">${institutionLabel} Starter Card References</div>
      <div class="staples-category">
        <div class="staple-cat-label">Creatures</div>
        <div class="staple-row">${cardSlots(dossier.starterCards?.creatures, "sc", "staple-placeholder", "staple-img")}</div>
      </div>
      <div class="staples-category">
        <div class="staple-cat-label">Instants and Sorceries</div>
        <div class="staple-row">${cardSlots(dossier.starterCards?.spells, "ss", "staple-placeholder", "staple-img")}</div>
      </div>
      <div class="staples-category">
        <div class="staple-cat-label">Enchantments and Artifacts</div>
        <div class="staple-row">${cardSlots(dossier.starterCards?.permanents, "sp", "staple-placeholder", "staple-img")}</div>
      </div>
    </div>
    <div class="lands-section">
      <div class="section-label">Mana Base Starting Map</div>
      <div class="lands-tiers">
        <div class="land-tier tier-basics">
          <div class="land-tier-label">Basics</div>
          <div class="land-tier-copy">${basicLandCopy}</div>
        </div>
        <div class="land-tier tier-premium">
          <div class="land-tier-label">Premium</div>
          <div class="land-tier-copy">${landLaneCopy.premium}</div>
          <div class="land-cards-row">${landSlots(landRecommendations.premium, "lp")}</div>
        </div>
        <div class="land-tier tier-midrange">
          <div class="land-tier-label">Midrange</div>
          <div class="land-tier-copy">${landLaneCopy.midrange}</div>
          <div class="land-cards-row">${landSlots(landRecommendations.midrange, "lm")}</div>
        </div>
        <div class="land-tier tier-budget">
          <div class="land-tier-label">Budget</div>
          <div class="land-tier-copy">${landLaneCopy.budget}</div>
          <div class="land-cards-row">${landSlots(landRecommendations.budget, "lb")}</div>
        </div>
        ${utilityTierHtml}
      </div>
    </div>

    ${mazeDiscoveryHtml}
    ${apocryphaHtml}

    <p class="decree-footer">
      The atlas is still opening: fifteen paths are lit now — ten Ravnican guilds and five Strixhaven colleges. Wedges, families, and stranger color-shapes wait beyond the next veil.
    </p>

    <div class="footer-actions">
      <div class="footer-note">Card and land images via Scryfall API. Starter references are curated from faction data; deck links route out to EDHREC, Archidekt, and MTGDecks, while Maze stays inside the reading flow.</div>
      <div class="footer-button-row">
        <button class="btn-primary" type="button" onclick="saveCurrentResult()">${saveButtonLabel}</button>
        ${returnToTerminalButton}
        ${terminalEnabled ? `<button class="btn-secondary" type="button" data-vm-terminal-only onclick="startInterviewFlow()">Try the deeper reading</button>` : ""}
        <button class="btn-secondary" type="button" onclick="handleRetake()">Begin Again</button>
      </div>
    </div>`;

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = activeKey;
  showSection("result");
  applyTerminalVisibility();
  updateTopbar();
  animateScoreBars();
  loadResultCardArt(faction, commanderPreviewCandidates, dossier.starterCards, landRecommendations);
}

/**
 * Switches the dossier view to an adjacent faction while keeping the same saved reading.
 *
 * @param {string} factionKey Adjacent faction key to render.
 */
function switchAdjacentView(factionKey) {
  APP_STATE.previousViewKey = APP_STATE.activeResult?.faction || APP_STATE.activeViewKey;
  APP_STATE.activeViewKey = factionKey;
  renderResult(factionKey);
}

/**
 * Returns from an adjacent fit to the original primary reading.
 */
function returnToPrimaryReading() {
  const primaryViewKey = APP_STATE.activeResult?.faction || APP_STATE.previousViewKey;
  if (!primaryViewKey) {
    return;
  }

  APP_STATE.activeViewKey = primaryViewKey;
  renderResult(primaryViewKey);
}

/**
 * Animates the mana bars after the result page has been injected.
 */
function animateScoreBars() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".score-fill[data-target]").forEach((node) => {
      setTimeout(() => {
        node.style.width = `${node.getAttribute("data-target")}%`;
      }, 180);
    });
  });
}

/**
 * Loads Scryfall images for Commander previews, staples, and lands after the result HTML has rendered.
 *
 * @param {object} faction Canonical faction record being displayed.
 * @param {object[]=} commanderCandidates Commander preview candidates to verify.
 * @param {object=} starterCards Dossier starter card groups.
 * @param {object=} landRecommendations Dossier land recommendation tiers.
 * @returns {Promise<void>} Resolves after all visible slots have been attempted.
 */
async function loadResultCardArt(faction, commanderCandidates = [], starterCards = {}, landRecommendations = {}) {
  const factionIdentity = new Set(faction?.colors || []);
  let verifiedCommanders = 0;
  const commanderCards = (commanderCandidates || []).map((candidate, index) => ({
    ...candidate,
    id: `cmd_${index}`,
    imageClass: "commander-img",
    commanderPreview: true,
  }));
  const allCards = [
    ...commanderCards,
    ...(starterCards.creatures || []).map((name, index) => ({ name, id: `sc_${index}`, imageClass: "staple-img" })),
    ...(starterCards.spells || []).map((name, index) => ({ name, id: `ss_${index}`, imageClass: "staple-img" })),
    ...(starterCards.permanents || []).map((name, index) => ({ name, id: `sp_${index}`, imageClass: "staple-img" })),
    ...(landRecommendations.premium || []).map((name, index) => ({ name, id: `lp_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.midrange || []).map((name, index) => ({ name, id: `lm_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.budget || []).map((name, index) => ({ name, id: `lb_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.utility || []).map((name, index) => ({ name, id: `lu_${index}`, imageClass: "land-img" })),
  ];

  for (const card of allCards) {
    const slot = document.getElementById(card.id);
    if (!slot) {
      continue;
    }

    try {
      const data = await loadCachedScryfallNamedCard(card.name);
      const imageUrl =
        data.image_uris?.normal ||
        data.card_faces?.[0]?.image_uris?.normal ||
        null;
      const linkUrl = data.scryfall_uri || "#";
      const typeLine = [
        data.type_line || "",
        ...(data.card_faces || []).map((face) => face.type_line || ""),
      ].join(" ");
      const cardIdentity = data.color_identity || [];
      const identityFits = cardIdentity.every((color) => factionIdentity.has(color));
      const isCommanderCreature =
        /legendary/i.test(typeLine) &&
        /creature/i.test(typeLine) &&
        data.legalities?.commander === "legal" &&
        identityFits;

      if (card.commanderPreview && !isCommanderCreature) {
        slot.closest("[data-commander-card]")?.remove();
        continue;
      }

      if (imageUrl) {
        slot.closest("[data-commander-card]")?.classList.add("is-verified");
        slot.outerHTML = `<a href="${linkUrl}" target="_blank" rel="noopener"><img class="${card.imageClass}" src="${imageUrl}" alt="${data.name}" loading="lazy"></a>`;
        if (card.commanderPreview) {
          verifiedCommanders += 1;
        }
      } else if (card.commanderPreview) {
        slot.closest("[data-commander-card]")?.remove();
      } else {
        slot.textContent = card.name;
      }
    } catch (_) {
      const fallback = document.getElementById(card.id);
      if (card.commanderPreview) {
        fallback?.closest("[data-commander-card]")?.remove();
      } else if (fallback) {
        fallback.textContent = card.name;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 90));
  }

  const previewGrid = document.getElementById("commander-preview-grid");
  const fallback = document.getElementById("commander-preview-fallback");
  if (commanderCandidates.length && verifiedCommanders < 1) {
    previewGrid?.remove();
    fallback?.classList.add("is-visible");
  }
}

export async function loadCachedScryfallNamedCard(name) {
  const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`;
  const storage = getScryfallNamedCardStorage();
  if (storage) {
    try {
      const cached = storage.getItem(`vm_scryfall_named_v1:${url}`);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (_) {}
  }

  return await withNamedCardInFlightDedupe(url, async () => {
    const cachedNow = storage ? readScryfallNamedCardCache(storage, url) : null;
    if (cachedNow) return cachedNow;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok && data?.name && storage) {
      try {
        storage.setItem(`vm_scryfall_named_v1:${url}`, JSON.stringify(data));
      } catch (_) {}
    }
    return data;
  });
}

function getScryfallNamedCardStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (_) {
    return null;
  }
}

function readScryfallNamedCardCache(storage, url) {
  try {
    const cached = storage.getItem(`vm_scryfall_named_v1:${url}`);
    return cached ? JSON.parse(cached) : null;
  } catch (_) {
    return null;
  }
}

const ScryfallNamedCardInFlightRequests = new Map();

function withNamedCardInFlightDedupe(cacheKey, fetcher) {
  if (ScryfallNamedCardInFlightRequests.has(cacheKey)) {
    return ScryfallNamedCardInFlightRequests.get(cacheKey);
  }

  const request = Promise.resolve()
    .then(fetcher)
    .finally(() => {
      ScryfallNamedCardInFlightRequests.delete(cacheKey);
    });

  ScryfallNamedCardInFlightRequests.set(cacheKey, request);
  return request;
}

/**
 * Saves the current active result through Google OAuth or a live signed-in session.
 *
 * @returns {Promise<void>} Resolves after the save flow has started or completed.
 */
async function saveCurrentResult() {
  const result = APP_STATE.activeResult;
  if (!result) {
    return;
  }

  try {
    const sb = getSupabase();
    const {
      data: { session },
    } = await sb.auth.getSession();

    if (session?.user) {
      const saved = await vm_savePlacementResult(result);
      APP_STATE.activeResult = saved;
      APP_STATE.activeViewKey = saved.faction;
      renderResult(saved.faction);
      return;
    }

    await vm_saveWithGoogle(result);
  } catch (error) {
    alert(error.message || "Could not save this reading yet.");
  }
}

/**
 * Restores the best available placement view after page load.
 *
 * @param {boolean} savedFromOAuth True when the current load just completed an OAuth save.
 */
function restoreInitialView(savedFromOAuth) {
  const profileResult = SESSION.profile?.placementResult || null;
  const cached = vm_getCachedPlacementResult();
  const handoff = readArchscryDossierHandoff();
  const result = profileResult || cached || handoff?.placementResult || null;
  const requestedView = requestedDossierViewKey();
  const viewKey = requestedView && APP_STATE.factions[requestedView] ? requestedView : result?.faction;
  captureMazeReturnUrl();
  const mazeReturnAnchor = APP_STATE.mazeReturnAnchor;
  APP_STATE.mazeReturnAnchor = "";

  if (savedFromOAuth && result) {
    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = viewKey;
    APP_STATE.resultSource = "saved";
    APP_STATE.returnSection = null;
    renderResult(viewKey);
    if (mazeReturnAnchor) {
      scrollToAnchorOnce(mazeReturnAnchor);
    }
    return;
  }

  if (result) {
    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = viewKey;
    APP_STATE.resultSource = profileResult ? "saved" : "cached";
    APP_STATE.returnSection = null;
    vm_cachePlacementResult(result);
    renderResult(viewKey);
    if (mazeReturnAnchor) {
      scrollToAnchorOnce(mazeReturnAnchor);
    }
    return;
  }

  showSection("landing");
}

document.addEventListener("vm_placementSaved", (event) => {
  const result = event.detail || SESSION.profile?.placementResult || vm_getCachedPlacementResult();
  if (!result) {
    return;
  }
  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
  APP_STATE.resultSource = "saved";
  APP_STATE.returnSection = null;
  renderResult(result.faction);
});

window.addEventListener("popstate", () => {
  const resultVisible = !document.getElementById("result")?.classList.contains("hidden");
  if (resultVisible && APP_STATE.returnSection === "interview") {
    returnToInterviewSource();
  }
});

/**
 * Exposes page handlers used by existing inline HTML buttons after moving this file
 * to an ES module.
 */
Object.assign(window, {
  answerQuickQuestion,
  goBackQuickQuestion,
  handleRetake,
  handleSavePlacement,
  handleSignOut,
  openInterviewDossier,
  openLibrary,
  openResearch,
  returnToInterviewSource,
  returnToPrimaryReading,
  saveCurrentResult,
  showSection,
  startInterviewFlow,
  startQuickFlow,
  submitInterview,
  switchAdjacentView,
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadFactionData();
    await loadPlacementModel();
    await loadDeckTagCatalog();
    await loadDiscoveryData();
  } catch (error) {
    document.body.innerHTML = `<div class="section"><div class="empty-state"><h2>Placement data missing.</h2><p>${error.message}</p></div></div>`;
    return;
  }

  applyTerminalVisibility();

  const input = document.getElementById("terminal-input");
  input.addEventListener("input", () => {
    updateInterviewControls(APP_STATE.interviewState);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitInterview();
    }
  });

  const resumed = await vm_resumeSession();
  const savedFromOAuth = await vm_checkPendingSave();
  if (resumed || savedFromOAuth) {
    updateTopbar();
  }
  restoreInitialView(savedFromOAuth);
});

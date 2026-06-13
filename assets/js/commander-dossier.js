export const ARCHIDEKT_SEARCH_BASE = "https://archidekt.com/search/decks";
import {
  getExpressionKindLabel,
  getExpressionKindLabelLower,
  normalizeLayeredIdentity,
} from "./identity-layers.js";

export const DEFAULT_COMMANDER_DECK_FORMAT = 3;

const MANA_ORDER = ["W", "U", "B", "R", "G"];
const PRECON_COLOR_TO_CODE = new Map([
  ["white", "W"],
  ["blue", "U"],
  ["black", "B"],
  ["red", "R"],
  ["green", "G"],
  ["colorless", "C"],
]);
const PRECON_CODE_TO_COLOR = new Map([
  ["W", "White"],
  ["U", "Blue"],
  ["B", "Black"],
  ["R", "Red"],
  ["G", "Green"],
  ["C", "Colorless"],
]);
const COLOR_IDENTITY_SLUGS = new Map([
  ["W", "mono-white"],
  ["U", "mono-blue"],
  ["B", "mono-black"],
  ["R", "mono-red"],
  ["G", "mono-green"],
  ["WU", "azorius"],
  ["UB", "dimir"],
  ["BR", "rakdos"],
  ["RG", "gruul"],
  ["GW", "selesnya"],
  ["WG", "selesnya"],
  ["WB", "orzhov"],
  ["UR", "izzet"],
  ["BG", "golgari"],
  ["UG", "simic"],
  ["GU", "simic"],
  ["WR", "boros"],
  ["GUR", "temur"],
  ["GRU", "temur"],
  ["UGR", "temur"],
  ["URG", "temur"],
  ["RGU", "temur"],
  ["RUG", "temur"],
]);

const EXTERNAL_ROUTING_FALLBACKS = [
  { aliases: ["W", "WHITE"], guild: "mono-white", colorIdentity: "W", label: "White" },
  { aliases: ["U", "BLUE"], guild: "mono-blue", colorIdentity: "U", label: "Blue" },
  { aliases: ["B", "BLACK"], guild: "mono-black", colorIdentity: "B", label: "Black" },
  { aliases: ["R", "RED"], guild: "mono-red", colorIdentity: "R", label: "Red" },
  { aliases: ["G", "GREEN"], guild: "mono-green", colorIdentity: "G", label: "Green" },
  { aliases: ["WU", "AZORIUS"], guild: "azorius", colorIdentity: "WU", label: "Azorius" },
  { aliases: ["UB", "DIMIR"], guild: "dimir", colorIdentity: "UB", label: "Dimir" },
  { aliases: ["BR", "RAKDOS"], guild: "rakdos", colorIdentity: "BR", label: "Rakdos" },
  { aliases: ["RG", "GRUUL"], guild: "gruul", colorIdentity: "RG", label: "Gruul" },
  { aliases: ["WG", "GW", "SELESNYA"], guild: "selesnya", colorIdentity: "WG", label: "Selesnya" },
  { aliases: ["WB", "ORZHOV", "SILVERQUILL"], guild: "orzhov", colorIdentity: "WB", label: "Orzhov" },
  { aliases: ["UR", "IZZET", "PRISMARI"], guild: "izzet", colorIdentity: "UR", label: "Izzet" },
  { aliases: ["BG", "GOLGARI", "WITHERBLOOM"], guild: "golgari", colorIdentity: "BG", label: "Golgari" },
  { aliases: ["UG", "GU", "SIMIC", "QUANDRIX"], guild: "simic", colorIdentity: "UG", label: "Simic" },
  { aliases: ["WR", "RW", "BOROS", "LOREHOLD"], guild: "boros", colorIdentity: "WR", label: "Boros" },
  { aliases: ["ABZAN"], guild: "wbg", colorIdentity: "WBG", label: "Abzan" },
  { aliases: ["TEMUR"], guild: "temur", colorIdentity: "GUR", label: "Temur" },
  { aliases: ["SULTAI"], guild: "sultai", colorIdentity: "BGU", label: "Sultai" },
  { aliases: ["MARDU"], guild: "mardu", colorIdentity: "RWB", label: "Mardu" },
  { aliases: ["JESKAI"], guild: "jeskai", colorIdentity: "URW", label: "Jeskai" },
];

// Temporary string-only fallback until dossier routing receives the registry alias index directly.
const EXTERNAL_ROUTING_ALIASES = new Map(
  EXTERNAL_ROUTING_FALLBACKS.flatMap(({ aliases, ...routing }) =>
    aliases.map((alias) => [alias, routing])
  )
);

export const SERVICE_CHIP_META = {
  archidekt: {
    key: "archidekt",
    label: "Archidekt",
    mark: "A",
    color: "#c89bff",
    glow: "rgba(200,155,255,0.35)",
  },
  edhrec: {
    key: "edhrec",
    label: "EDHREC",
    mark: "E",
    color: "#79d6d0",
    glow: "rgba(121,214,208,0.32)",
  },
  maze: {
    key: "maze",
    label: "Maze",
    mark: "M",
    color: "#d8b45f",
    glow: "rgba(216,180,95,0.38)",
  },
  moxfield: {
    key: "moxfield",
    label: "Moxfield",
    mark: "X",
    color: "#f09a64",
    glow: "rgba(240,154,100,0.34)",
  },
  mtgdecks: {
    key: "mtgdecks",
    label: "MTGDecks",
    mark: "D",
    color: "#7fb8ff",
    glow: "rgba(127,184,255,0.32)",
  },
  scryfall: {
    key: "scryfall",
    label: "Scryfall",
    mark: "S",
    color: "#8ed27b",
    glow: "rgba(142,210,123,0.32)",
  },
  generic: {
    key: "generic",
    label: "Link",
    mark: "V",
    color: "#b8954a",
    glow: "rgba(184,149,74,0.3)",
  },
};

const CANONICAL_ALIAS_OVERRIDES = new Map([
  ["ramp", "Ramp"],
  ["big mana", "Big Mana"],
  ["stax", "Stax"],
  ["prison", "Prison"],
]);

const ARCHETYPE_TEXT_RULES = [
  { patterns: ["ramp big threats", "ramp / big threats", "big mana", "big threats"], tag: "Big Mana" },
  { patterns: ["+1/+1 counters", "counters matter", "counters"], tag: "Counters Matter" },
  { patterns: ["spells-matter", "spells matter", "spellslinger", "spellslinging", "spells"], tag: "Spellslinger" },
  { patterns: ["go-wide", "go wide", "tokens", "token"], tag: "Tokens" },
  { patterns: ["flicker", "blink"], tag: "Blink" },
  { patterns: ["sacrifice"], tag: "Sacrifice" },
  { patterns: ["aristocrats"], tag: "Aristocrats" },
  { patterns: ["reanimator"], tag: "Reanimator" },
  { patterns: ["graveyard"], tag: "Graveyard" },
  { patterns: ["equipment"], tag: "Equipment" },
  { patterns: ["lifegain", "life gain"], tag: "Lifegain" },
  { patterns: ["control"], tag: "Control" },
  { patterns: ["prison"], tag: "Prison" },
  { patterns: ["stax"], tag: "Stax" },
  { patterns: ["tempo"], tag: "Tempo" },
  { patterns: ["aggro"], tag: "Aggro" },
  { patterns: ["ramp"], tag: "Ramp" },
  { patterns: ["voltron"], tag: "Voltron" },
  { patterns: ["mill"], tag: "Mill" },
];

const EVIDENCE_TEXT_RULES = [
  { patterns: ["process/order", "fairness through process", "procedure", "process", "order", "rules", "precedent", "protocol"], tag: "Control" },
  { patterns: ["reclamation/recursion", "survival through reclamation", "reclamation", "recursion", "graveyard", "life-death"], tag: "Graveyard" },
  { patterns: ["expression/spells", "truth through expression", "elemental expression", "expression", "spells", "spell"], tag: "Spellslinger" },
  { patterns: ["community/go-wide", "communal", "community", "belonging", "harmony", "go-wide", "go wide"], tag: "Tokens" },
  { patterns: ["adaptation/counters", "adaptive", "adaptation", "+1/+1 counter", "+1/+1 counters", "counters"], tag: "Counters Matter" },
  { patterns: ["direct pressure", "pressure", "protective action", "immediate rescue", "righteous action"], tag: "Aggro" },
];

const EVIDENCE_EXPLANATIONS = [
  { pattern: /procedure|process|order|rules|precedent|protocol/i, phrase: "you treated procedure as protection" },
  { pattern: /reclamation|recursion|graveyard|life-death|rot|survival/i, phrase: "you turned loss into fuel for the next move" },
  { pattern: /expression|spells|performance|spectacle|artistry/i, phrase: "you cared about how the move expressed itself" },
  { pattern: /community|communal|belonging|harmony|shared|shelter/i, phrase: "you kept the wider table or community in view" },
  { pattern: /adapt|counters|biology|improvement|transform/i, phrase: "you leaned toward growth through adaptation" },
  { pattern: /pressure|action|rescue|intervention|protect/i, phrase: "you favored immediate pressure over waiting" },
  { pattern: /information|secret|hidden|leverage|discretion/i, phrase: "you valued timing and hidden information" },
  { pattern: /history|evidence|legacy|warning|field/i, phrase: "you looked for guidance in evidence and history" },
  { pattern: /pattern|proof|math|abstract|structure/i, phrase: "you trusted proof, pattern, and structure" },
  { pattern: /debt|obligation|contract|ledger/i, phrase: "you tracked obligations and leverage" },
  { pattern: /speech|rhetoric|language|verbal/i, phrase: "you saw language as a tool with force" },
];

const OMEN_COPY_RULES = [
  {
    pattern: /ancestor|ancestral|memory|stewardship|perennation|kin-tree|kin tree|spirit/i,
    phrase: "You let memory become stewardship, carrying the living house without turning duty into nostalgia.",
  },
  {
    pattern: /family|house|lineage|family line|\bline\b|next generation|outlast|alive|kinship/i,
    phrase: "You measured survival by whether the house could carry its family duty forward.",
  },
  {
    pattern: /endurance|endure|survive|survival|defensive patience|duty/i,
    phrase: "You trusted patience that keeps the next generation alive after the first pressure breaks.",
  },
  {
    pattern: /\b(graveyard|reclamation|recursion|rot|death|life-death|return|returns|reanimate|survival)\b/i,
    phrase: "You were willing to turn the graveyard into a second hand.",
  },
  {
    pattern: /information|secret|hidden|shadow|leverage|discretion|unobserved|unknown/i,
    phrase: "You kept value in what the table could not yet see.",
  },
  {
    pattern: /procedure|process|order|rules|precedent|protocol|fairness/i,
    phrase: "You chose clean answers, patient sequencing, and a table where every spell has to earn its place.",
  },
  {
    pattern: /expression|spells|performance|spectacle|artistry|storm|elemental/i,
    phrase: "You wanted the winning line to feel unmistakable, not merely efficient.",
  },
  {
    pattern: /community|communal|belonging|harmony|shared|shelter|wide|tokens/i,
    phrase: "You made room for the board to become stronger together than any single card alone.",
  },
  {
    pattern: /adapt|counters|biology|improvement|transform|growth|proof|math|fractal|pattern/i,
    phrase: "You trusted a small edge to compound until the table could no longer ignore it.",
  },
  {
    pattern: /pressure|action|rescue|intervention|protect|combat|justice|direct/i,
    phrase: "You preferred making the table answer you before comfort became a plan.",
  },
  {
    pattern: /debt|obligation|contract|ledger|tax|sacrifice|aristocrat/i,
    phrase: "You counted every exchange, then made the table pay for thinking it was even.",
  },
  {
    pattern: /speech|rhetoric|language|verbal|politic|goad|influence/i,
    phrase: "You treated words, attacks, and alliances as resources to be spent carefully.",
  },
  {
    pattern: /history|evidence|legacy|warning|relic|artifact|spirit/i,
    phrase: "You looked backward without slowing down, turning old material into a live threat.",
  },
  {
    pattern: /chaos|risk|pain|drama|impulse|freedom|riot|rage/i,
    phrase: "You accepted volatility when it meant the table had to react on your terms.",
  },
];

const COMMANDER_PATH_RULES = [
  {
    patterns: ["hidden", "information", "secret", "mill", "discard", "shadow", "control"],
    plan: "wins from the shadows: leave mana open, trade resources carefully, and let the table realize too late which card mattered",
    spellcraft: "Countermagic, discard, graveyard theft, and evasive finishers that reward patience over noise.",
    caution: "Do not spend answers just to prove you have them; wait for the turn where one card changes the room.",
  },
  {
    patterns: ["process", "order", "rules", "prison", "taxes", "control", "tempo"],
    plan: "turns patience into inevitability: keep mana open, tax greedy lines, and win once everyone else is topdecking",
    spellcraft: "Sweepers, counterspells, flash threats, and rule-setting permanents that make the table play fair on your terms.",
    caution: "Answer what matters, not what is merely annoying; Commander rewards restraint as much as precision.",
  },
  {
    patterns: ["sacrifice", "aristocrats", "life", "debt", "drain", "obligation"],
    plan: "makes every exchange expensive: sacrifice small pieces, drain the table, and turn attrition into a clock",
    spellcraft: "Death triggers, recursion, lifegain payoffs, and sacrifice outlets that make ordinary trades lopsided.",
    caution: "Keep a payoff and a rebuild plan; a sacrifice deck without either one is just feeding the table free removal.",
  },
  {
    patterns: ["graveyard", "reclamation", "recursion", "reanimator", "history", "artifact", "spirit"],
    plan: "uses the discard pile like a second hand: stock the graveyard, buy cards back, and make removal feel temporary",
    spellcraft: "Self-mill, artifact recursion, death triggers, and resilient threats that are comfortable being used twice.",
    caution: "Respect graveyard hate early; pack ways to win when the first cemetery door gets locked.",
  },
  {
    patterns: ["spells", "spellslinger", "storm", "expression", "artistry", "elemental", "instant", "sorcery"],
    plan: "turns spell sequencing into spectacle: sculpt the hand, protect the key turn, and make one stack become the story",
    spellcraft: "Cantrips, treasure or artifact mana, copy effects, and payoffs that reward casting several spells in one turn.",
    caution: "Do not fire the finale into open shields unless you can protect it or profit from the attempt.",
  },
  {
    patterns: ["tokens", "go wide", "community", "harmony", "inkling", "fractal", "counter"],
    plan: "wins by making one permanent become many: build a board, multiply its value, and force combat math to break",
    spellcraft: "Token makers, anthem effects, counter engines, and protection that turn a humble board into inevitability.",
    caution: "Keep a recovery piece in hand; board wipes are the tax every go-wide deck pays.",
  },
  {
    patterns: ["ramp", "big mana", "big threats", "adaptation", "growth", "simic", "gruul"],
    plan: "gets ahead on mana and asks bigger questions than the table can answer cleanly",
    spellcraft: "Land ramp, mana creatures, scalable threats, and draw engines that make extra mana become extra cards.",
    caution: "Ramp with a destination; acceleration is only frightening when the next play changes combat or cards.",
  },
  {
    patterns: ["aggro", "combat", "equipment", "voltron", "burn", "pressure", "heroic"],
    plan: "puts pressure on the table early: present a must-answer threat, protect it, and make combat do honest work",
    spellcraft: "Efficient attackers, equipment, combat tricks, and protection that let one turn of damage matter.",
    caution: "Choose your enemy carefully; in Commander, the loudest start often becomes the table's first shared project.",
  },
];

const CURATED_LEGENDARY_CREATURE_STAPLES = new Set([
  "adrix and nev twincasters",
  "alesha who smiles at death",
  "anafenza the foremost",
  "animar soul of elements",
  "aurelia the warleader",
  "beledros witherbloom",
  "breya etherium shaper",
  "breena the demagogue",
  "chulane teller of tales",
  "dina soul steeper",
  "doran the siege tower",
  "elsha of the infinite",
  "galazeth prismari",
  "hofri ghostforge",
  "kaalia of the vast",
  "kalamax the stormsire",
  "karador ghost chieftain",
  "killian ink duelist",
  "kroxa titan of death s hunger",
  "kynaios and tiro of meletis",
  "lavinia of the tenth",
  "lazav dimir mastermind",
  "marath will of the wild",
  "muldrotha the gravetide",
  "narset enlightened master",
  "pantlaza sun favored",
  "prime speaker zegana",
  "quintorius field historian",
  "rafiq of the many",
  "rootha mercurial artist",
  "saskia the unyielding",
  "shalai and hallar",
  "shadrix silverquill",
  "sidisi brood tyrant",
  "surrak dragonclaw",
  "tanazir quandrix",
  "the mimeoplasm",
  "thalia guardian of thraben",
  "trostani selesnya s voice",
  "tuvasa the sunlit",
  "uro titan of nature s wrath",
  "veyran voice of duality",
  "vito thorn of the dusk rose",
  "willowdusk essence seer",
  "yidris maelstrom wielder",
  "zurgo helmsmasher",
  "zimone quandrix prodigy",
]);

const COMMANDER_PREVIEW_DEDUPE_ALIASES = new Map([
  ["adrix and nev", "adrix and nev twincasters"],
  ["adrix and nev twincasters", "adrix and nev twincasters"],
]);

const PACKAGE_QUERIES = [
  {
    key: "commanders-that-fit",
    label: "commanders",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} commanders with exact Commander identity`,
    query: (identity) => `id=${identity} is:commander f:commander`,
  },
  {
    key: "ramp",
    label: "ramp",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} ramp for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"search your library for a land" OR o:"add {")`,
  },
  {
    key: "draw",
    label: "draw",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} card draw for this Commander path`,
    query: (identity) => `id<=${identity} f:commander o:draw`,
  },
  {
    key: "interaction",
    label: "interaction",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} interaction for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"destroy target" OR o:"exile target" OR o:"counter target" OR o:"return target")`,
  },
  {
    key: "lands",
    label: "lands",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} lands for this Commander path`,
    query: (identity) => `id<=${identity} f:commander t:land`,
  },
  {
    key: "win-conditions",
    label: "win conditions",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} win conditions for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"you win the game" OR o:"each opponent loses" OR o:"combat damage")`,
  },
];

const ACTION_CUE_PATTERN = /\b(slow down|rebuild|hold|protect|buy time|draw|remove|wait|sequence|set up|convert|commit|develop|keep|spend)\b/i;
const LAND_COUNT_PATTERNS = [
  /\b[2-9]x\s+/i,
  /\bx\s*[2-9]\b/i,
  /\b\d+\s+(Forest|Forests|Island|Islands|Swamp|Swamps|Mountain|Mountains|Plains)\b/i,
];
const LAND_QUANTITY_PATTERN = /^\s*(\d+)\s*x?\s+(.+?)\s*$/i;
const LAND_SUFFIX_QUANTITY_PATTERN = /^\s*(.+?)\s*x\s*([2-9])\s*$/i;
const BASIC_LAND_PLACEHOLDERS = new Set([
  "plains",
  "island",
  "swamp",
  "mountain",
  "forest",
  "basic",
  "basics",
  "basic land",
  "basic lands",
]);
const CARD_DISPLAY_NAME_OVERRIDES = new Map([
  ["adrix and nev", "Adrix and Nev, Twincasters"],
  ["adrix and nev twincasters", "Adrix and Nev, Twincasters"],
  ["breena the demagogue", "Breena, the Demagogue"],
  ["dina soul steeper", "Dina, Soul Steeper"],
  ["esix fractal bloom", "Esix, Fractal Bloom"],
  ["killian ink duelist", "Killian, Ink Duelist"],
  ["rootha mercurial artist", "Rootha, Mercurial Artist"],
  ["veyran voice of duality", "Veyran, Voice of Duality"],
  ["willowdusk essence seer", "Willowdusk, Essence Seer"],
  ["zimone quandrix prodigy", "Zimone, Quandrix Prodigy"],
]);
const CARD_DISPLAY_TEXT_OVERRIDES = [
  { pattern: /\bAdrix\s+and\s+Nev\b(?!\s*,|\s+Twincasters)/gi, displayName: "Adrix and Nev, Twincasters" },
  { pattern: /\bAdrix\s+and\s+Nev\s+Twincasters\b/gi, displayName: "Adrix and Nev, Twincasters" },
  { pattern: /\bBreena\s+the\s+Demagogue\b/gi, displayName: "Breena, the Demagogue" },
  { pattern: /\bDina\s+Soul\s+Steeper\b/gi, displayName: "Dina, Soul Steeper" },
  { pattern: /\bEsix\s+Fractal\s+Bloom\b/gi, displayName: "Esix, Fractal Bloom" },
  { pattern: /\bKillian\s+Ink\s+Duelist\b/gi, displayName: "Killian, Ink Duelist" },
  { pattern: /\bRootha\s+Mercurial\s+Artist\b/gi, displayName: "Rootha, Mercurial Artist" },
  { pattern: /\bVeyran\s+Voice\s+of\s+Duality\b/gi, displayName: "Veyran, Voice of Duality" },
  { pattern: /\bWillowdusk\s+Essence\s+Seer\b/gi, displayName: "Willowdusk, Essence Seer" },
  { pattern: /\bZimone\s+Quandrix\s+Prodigy\b/gi, displayName: "Zimone, Quandrix Prodigy" },
];

export const COMMANDER_FACTION_GUIDANCE = {
  W: {
    key: "W",
    shortName: "White",
    ownedThemes: ["safety", "structure", "protection", "duty", "shared standards", "shelter", "collective defense"],
    allowedPhrases: ["safety through structure", "shared duty", "protect the vulnerable", "fairness through standards"],
    bannedPhrases: ["private leverage", "chaotic spectacle", "reckless self-prioritization"],
    bleedWarningTerms: ["airtight procedure", "urgent intervention", "shared belonging without standards", "private debt"],
    bleedWarnings: ["avoid collapsing White into Azorius procedure, Boros urgency, or Selesnya belonging"],
    preferredArchetypeTags: ["Tokens", "Stax", "Equipment"],
    commanderPlan: "builds protection into the table state: widen the board, defend the key piece, and let structure turn survival into pressure",
    spellcraftIdentity: "Token makers, protection spells, taxes, clean removal, and equipment lines that make safety feel enforceable instead of decorative.",
    tableCautionText: "Protect the engine, keep the standards clear, and do not spend your last shield before the table commits its real threat.",
    tableCautionReviewRule: "If the text sounds purely procedural, check whether it should be Azorius instead of White.",
  },
  U: {
    key: "U",
    shortName: "Blue",
    ownedThemes: ["knowledge", "information", "card draw", "counterspells", "tempo", "bounce", "copy", "clones", "artifacts", "options", "control", "spellslinger"],
    allowedPhrases: ["information as resource", "act after understanding", "optimize through knowledge", "control through prediction"],
    bannedPhrases: ["reckless spectacle", "natural destiny above improvement", "power without a model"],
    bleedWarningTerms: ["airtight procedure", "hidden leverage", "volatile experiment", "biological adaptation"],
    bleedWarnings: ["avoid collapsing Blue into Azorius procedure, Dimir secrecy, Izzet volatility, or Simic biology"],
    preferredArchetypeTags: ["Control", "Spellslinger", "Artifacts"],
    commanderPlan: "turns knowledge into control: draw cards, preserve options, answer key spells, and let information become inevitability",
    spellcraftIdentity: "Card draw, counterspells, bounce, copy effects, artifact engines, and spellslinger lines that make every option feel planned.",
    tableCautionText: "Hold mana for the important spell, draw before committing, and keep one clean answer for the table's real threat.",
    tableCautionReviewRule: "If text sounds like secrecy alone, check whether it should be Dimir instead of Blue.",
  },
  B: {
    key: "B",
    shortName: "Black",
    ownedThemes: ["cost", "agency", "life payment", "sacrifice", "graveyard", "resource conversion", "leverage", "reanimation", "aristocrats"],
    allowedPhrases: ["power at a cost", "life as a resource", "graveyard as resource", "self-preservation through agency"],
    bannedPhrases: ["shared duty above self", "procedure above leverage", "wild release for its own sake"],
    bleedWarningTerms: ["airtight procedure", "public spectacle", "cycle of renewal", "binding obligation"],
    bleedWarnings: ["avoid collapsing Black into Dimir secrecy, Rakdos release, Golgari cycle, or Orzhov debt"],
    preferredArchetypeTags: ["Aristocrats", "Reanimator", "Control"],
    commanderPlan: "turns cost into agency: spend life, cash in creatures, and make the graveyard or hand become a resource engine before the table can stabilize",
    spellcraftIdentity: "Life payment, tutors, sacrifice outlets, removal, reanimation, and graveyard recursion that make every spent resource feel recoverable.",
    tableCautionText: "Hold a sacrifice outlet, spend life deliberately, and rebuild from the graveyard before the engine runs dry.",
    tableCautionReviewRule: "If text sounds like secrecy alone, check whether it should be Dimir instead of Black.",
  },
  R: {
    key: "R",
    shortName: "Red",
    ownedThemes: ["immediacy", "freedom", "impulse", "emotion", "spark", "ignition", "direct action", "haste", "burn", "damage", "temporary momentum", "treasures"],
    allowedPhrases: ["emotion into action", "freedom through motion", "direct pressure", "act while the spark is alive"],
    bannedPhrases: ["sacrifice for value", "crafted experiment", "primal belonging", "pain as spectacle"],
    bleedWarningTerms: ["transgressive spectacle", "wild belonging", "spell technique", "pain spectacle"],
    bleedWarnings: ["avoid collapsing Red into Rakdos transgression, Gruul wildness, Izzet technique, or Prismari performance"],
    preferredArchetypeTags: ["Burn", "Aggro", "Treasures"],
    commanderPlan: "turns impulse into damage and momentum: commit early, keep mana and cards moving, and let the next spark become direct pressure before the table settles",
    spellcraftIdentity: "Burn spells, haste threats, impulse draw, treasure bursts, and temporary damage windows that make action feel immediate instead of ornamental.",
    tableCautionText: "Sequence the burst while it matters, remove the piece that changes combat, and keep one reload spell for the turn after the table answers.",
    tableCautionReviewRule: "If text needs cruelty, wild belonging, or crafted technique to make sense, check whether it should be Rakdos, Gruul, Izzet, or Prismari instead of Red.",
  },
  G: {
    key: "G",
    shortName: "Green",
    ownedThemes: ["organic growth", "natural order", "acceptance", "patience", "instinct", "land", "roots", "ramp", "big mana", "creatures", "natural flourishing"],
    allowedPhrases: ["organic growth", "accept natural role", "patience through roots", "natural flourishing"],
    bannedPhrases: ["communal token mobilization", "engineered adaptation", "mathematical optimization", "rot reclamation", "rage and smash"],
    bleedWarningTerms: ["community identity", "biological adaptation", "mathematical pattern", "decay economy", "wild refusal", "pressure through force"],
    bleedWarnings: ["avoid collapsing Green into Selesnya community, Simic or Quandrix optimization, Golgari or Witherbloom decay economy, or Gruul wild pressure"],
    preferredArchetypeTags: ["Ramp", "Big Mana", "Lands"],
    commanderPlan: "turns patience into natural scale: develop lands, keep the creature engine alive, and let organic growth become too large for the table to ignore",
    spellcraftIdentity: "Ramp spells, landfall engines, creature-based card draw, protection, trample, and big mana lines that make natural flourishing feel inevitable.",
    tableCautionText: "Develop mana first, protect the living engine, and commit the largest creature after the table spends its clean answer.",
    tableCautionReviewRule: "If text sounds like community mobilization, engineered adaptation, decay economy, or wild-force pressure, check Selesnya, Simic, Golgari, Witherbloom, or Gruul before Green.",
  },
  WU: {
    key: "WU",
    shortName: "Azorius",
    ownedThemes: ["law", "control", "tempo", "taxation", "permission", "order", "rule-setting permanents"],
    allowedPhrases: ["rule setting", "permission mechanics", "tempo enforcement", "detain and taxation"],
    bannedPhrases: ["chaotic spectacle", "reckless sacrifice", "theatrical performance"],
    bleedWarningTerms: ["stalling", "violent spectacle", "life as currency", "raw aggression"],
    bleedWarnings: ["avoid passive stall framing"],
    preferredArchetypeTags: ["Control", "Stax", "Tempo"],
    commanderPlan: "turns order into inevitability: keep mana open, tax greedy lines, and let rule-setting permanents decide which spells matter",
    spellcraftIdentity: "Countermagic, sweepers, tempo enforcement, detain effects, and taxation pieces that make the table play through law instead of impulse.",
    tableCautionText: "Wait for the spell that breaks parity, hold interaction, and remove the key piece before the table slips around your rules.",
    tableCautionReviewRule: "If text reads like stalling, reframe as rule enforcement",
  },
  UB: {
    key: "UB",
    shortName: "Dimir",
    ownedThemes: ["hidden information", "control", "mill", "discard", "surveil", "delayed leverage", "winning once the table understands too late", "information asymmetry"],
    allowedPhrases: ["secrets and leverage", "information economy", "delayed payoff", "stealth tactics"],
    bannedPhrases: ["open spectacle", "communal tokens", "blunt aggression"],
    bleedWarningTerms: ["violent spectacle", "strength in numbers", "raw aggression", "spell spectacle"],
    bleedWarnings: ["mill must not appear without secrecy context"],
    preferredArchetypeTags: ["Control", "Mill", "Tempo"],
    commanderPlan: "wins once the table understands too late: trade in hidden information, mill or discard the right resources, and convert delayed leverage into a protected finish",
    spellcraftIdentity: "Surveil, discard, mill, evasive threats, theft, and control tools that reward patience and secrecy over noise.",
    tableCautionText: "Wait until shields drop, hold interaction, and draw cards before revealing the card that actually wins.",
    tableCautionReviewRule: "If mill is the only theme, require secrecy or conditional reveal language",
  },
  BR: {
    key: "BR",
    shortName: "Rakdos",
    ownedThemes: ["spectacle", "sacrifice", "pressure", "chaos", "damage", "reckless advantage", "the table paying for entertainment"],
    allowedPhrases: ["violent spectacle", "pay for entertainment", "hellbent commitment", "risky payoff"],
    bannedPhrases: ["methodical aristocracy", "legal taxation", "academic study"],
    bleedWarningTerms: ["disciplined combat", "debt as leverage", "bureaucratic law", "obligation"],
    bleedWarnings: ["avoid Boros discipline or Orzhov debt framing"],
    preferredArchetypeTags: ["Aggro", "Sacrifice", "Aristocrats"],
    commanderPlan: "makes entertainment expensive: push damage, cash in reckless advantage, and turn spectacle into a pressure engine the table has to respect",
    spellcraftIdentity: "Damage triggers, sacrifice outlets, impulse draw, menace threats, and chaos payoffs that make opponents pay for every seat in the room.",
    tableCautionText: "Sequence smaller threats first, make the table spend removal, then turn the damage engine loose.",
    tableCautionReviewRule: "If contractual or tax metaphors appear, flag for Orzhov review",
  },
  RG: {
    key: "RG",
    shortName: "Gruul",
    ownedThemes: ["pressure", "combat", "ramp", "trample", "oversized threats", "land pressure", "direct aggression", "refusing civilized pacing"],
    allowedPhrases: ["smash first", "raw aggression", "land dominance", "oversized threats"],
    bannedPhrases: [
      "bureaucratic order",
      "subtle manipulation",
      "long-game attrition",
      "turns spell sequencing into spectacle",
      "sculpt the hand",
      "one stack become the story",
      "Cantrips, treasure or artifact mana, copy effects",
    ],
    bleedWarningTerms: ["disciplined combat", "violent spectacle", "spell sequencing", "sculpt the hand", "one stack"],
    bleedWarnings: ["avoid Boros discipline or Rakdos spectacle"],
    preferredArchetypeTags: ["Aggro", "Ramp", "Big Mana"],
    commanderPlan: "attacks the table before it can settle: ramp hard, present oversized trampling threats, and make everyone answer creatures on your pace",
    spellcraftIdentity: "Land ramp, mana creatures, trample payoffs, fight spells, and direct aggression that turns fast board development into immediate combat pressure.",
    tableCautionText: "Ramp with a destination, sequence smaller threats first, and protect the one oversized creature that makes blocks impossible.",
    tableCautionReviewRule: "If tactical discipline appears, flag for Boros review",
  },
  WG: {
    key: "WG",
    shortName: "Selesnya",
    ownedThemes: ["go-wide", "tokens", "community", "collective strength", "board building", "protection through numbers"],
    allowedPhrases: ["strength in numbers", "communal growth", "anthem and convoke effects"],
    bannedPhrases: ["lone heroism", "chaotic spectacle", "secretive manipulation"],
    bleedWarningTerms: ["political rhetoric", "disciplined combat", "repartee", "taxation"],
    bleedWarnings: ["avoid Boros tactical tone or Silverquill rhetorical framing"],
    preferredArchetypeTags: ["Tokens", "Counters Matter"],
    commanderPlan: "builds safety through numbers: make tokens, grow the board together, and turn collective strength into attacks that survive one-for-one answers",
    spellcraftIdentity: "Convoke, token makers, anthem effects, protection, and board-building engines that make the whole table calculate your community at once.",
    tableCautionText: "Protect the engine, rebuild after wipes, and keep drawing cards so the table cannot answer every token wave.",
    tableCautionReviewRule: "If rhetoric or negotiation appears, flag for Silverquill review",
  },
  WB: {
    key: "WB",
    shortName: "Orzhov",
    ownedThemes: ["obligation", "taxes", "aristocrats", "debt", "afterlife", "life drain", "leverage"],
    allowedPhrases: ["contracts and consequence", "extort and afterlife", "debt as leverage"],
    bannedPhrases: ["communal altruism", "chaotic revelry", "experimental spectacle"],
    bleedWarningTerms: ["strength in numbers", "communal growth", "violent spectacle", "experimental spellcraft"],
    bleedWarnings: ["avoid Selesnya community tone or Rakdos spectacle"],
    preferredArchetypeTags: ["Aristocrats", "Lifegain", "Stax"],
    commanderPlan: "makes every exchange a debt: tax resources, drain life, sacrifice small pieces, and turn obligation into leverage no opponent can ignore",
    spellcraftIdentity: "Afterlife bodies, aristocrats engines, extort-style drains, taxes, and recursion that make death and payment part of the same ledger.",
    tableCautionText: "Hold a sacrifice outlet, buy time with drains, and remove the key piece before debts turn into a board wipe.",
    tableCautionReviewRule: "If community or go-wide appears, require Selesnya confirmation",
  },
  UR: {
    key: "UR",
    shortName: "Izzet",
    ownedThemes: ["experiments", "tempo", "spellslinger", "storm", "spell recursion", "volatile advantage", "velocity", "cantrip density"],
    allowedPhrases: ["creative chaos", "velocity of spells", "experimental spellcraft", "jump-start recursion"],
    bannedPhrases: ["methodical bureaucracy", "slow attrition", "communal token play"],
    bleedWarningTerms: ["performative magic", "art as arcana", "elemental spectacle", "debt as leverage"],
    bleedWarnings: ["avoid Prismari performance metaphors"],
    preferredArchetypeTags: ["Spellslinger", "Tempo", "Storm"],
    commanderPlan: "turns velocity into advantage: chain experiments, recur the right spell, and use tempo to make the table answer your storm before it stabilizes",
    spellcraftIdentity: "Cantrips, spellslinger payoffs, jump-start style recursion, storm lines, and cheap interaction that make volatile advantage repeatable.",
    tableCautionText: "Wait for shields to drop, hold interaction, and protect the engine before you commit the storm turn.",
    tableCautionReviewRule: "If art or performance language appears, check for Prismari overlap",
  },
  BG: {
    key: "BG",
    shortName: "Golgari",
    ownedThemes: ["recursion", "graveyard value", "sacrifice", "attrition", "reclamation", "resource loops", "death becoming future value"],
    allowedPhrases: ["death is currency", "graveyard as resource", "reclaim and reuse", "sacrifice for value"],
    bannedPhrases: ["benevolent healing", "flashy spectacle", "mathematical inevitability"],
    bleedWarningTerms: ["artifact archaeology", "metabolic loops", "infusion", "pest sacrifice", "fractal growth"],
    bleedWarnings: ["avoid Lorehold artifact-scholar tone or Witherbloom metabolic framing"],
    preferredArchetypeTags: ["Graveyard", "Sacrifice", "Reanimator"],
    commanderPlan: "turns death into future value: fill the graveyard, sacrifice expendable bodies, and grind through resource loops until every trade becomes reclamation",
    spellcraftIdentity: "Self-mill, recursion, sacrifice outlets, attrition engines, and resilient threats that make the graveyard a resource without needing a fair exchange.",
    tableCautionText: "If graveyard hate appears early, slow down, rebuild through value creatures, and hold your recursion until the table spends its answers.",
    tableCautionReviewRule: "If text mentions archaeology or artifacts, require Lorehold disambiguation",
  },
  UG: {
    key: "UG",
    shortName: "Simic",
    ownedThemes: ["adaptation", "evolve/adapt", "counters", "ramp", "flash value", "biological upgrades", "scaling organisms"],
    allowedPhrases: ["living progress", "evolve and adapt", "incremental upgrades", "scaling organisms"],
    bannedPhrases: [
      "theatrical spectacle",
      "political rhetoric",
      "pure doubling math",
      "uses the discard pile like a second hand",
      "stock the graveyard",
      "buy cards back",
      "make removal feel temporary",
    ],
    bleedWarningTerms: ["mathematical inevitability", "fractal growth", "increment rewards", "graveyard as resource"],
    bleedWarnings: ["avoid Quandrix deterministic scaling language"],
    preferredArchetypeTags: ["Counters Matter", "Ramp", "Flash"],
    commanderPlan: "adapts in motion: ramp, evolve through counters, and turn biological upgrades into flash-value pressure that improves whenever the game changes",
    spellcraftIdentity: "Adapt and evolve creatures, counter engines, ramp, flash threats, and card draw that turn each upgrade into a larger organism.",
    tableCautionText: "Protect the engine, draw cards after each upgrade, and rebuild with counters when removal interrupts the experiment.",
    tableCautionReviewRule: "If fractal or doubling language appears, require Quandrix confirmation",
  },
  WR: {
    key: "WR",
    shortName: "Boros",
    ownedThemes: ["combat discipline", "justice", "equipment", "attacks", "tactical pressure", "clean decisive action"],
    allowedPhrases: ["orderly aggression", "disciplined combat", "decisive strikes", "battalion tactics"],
    bannedPhrases: ["reckless hedonism", "secret manipulation", "passive stalling"],
    bleedWarningTerms: ["raw aggression", "violent spectacle", "chaos payoff", "land dominance"],
    bleedWarnings: ["avoid Gruul anarchy or Rakdos spectacle"],
    preferredArchetypeTags: ["Aggro", "Equipment", "Voltron"],
    commanderPlan: "turns attacks into clean decisions: build one disciplined combat line, protect it, and use equipment or coordinated pressure to end hesitation",
    spellcraftIdentity: "Equipment, Battalion and Mentor-style pressure, protection, combat tricks, and efficient removal that reward tactical attacks over chaos.",
    tableCautionText: "Sequence attacks carefully, protect your key threat, and remove the blocker that makes the clean strike fail.",
    tableCautionReviewRule: "If chaos or spectacle appears, require Rakdos check",
  },
  LOREHOLD: {
    key: "LOREHOLD",
    shortName: "Lorehold",
    ownedThemes: ["history", "graveyard artifacts", "spirits", "combat archaeology", "recursion through memory", "artifacts and lessons from the past"],
    allowedPhrases: ["history fights back", "flashback and memory recursion", "artifact archaeology", "spirit summons"],
    bannedPhrases: ["biological rot", "metabolic life exchange", "pure doubling math"],
    bleedWarningTerms: ["pest sacrifice", "biological reclamation", "death is currency", "slow rot", "infusion"],
    bleedWarnings: ["avoid Golgari rot or Witherbloom metabolic language"],
    preferredArchetypeTags: ["Artifacts", "Graveyard", "Tokens"],
    commanderPlan: "makes history attack back: recur artifacts, rally spirits, and turn lessons from the past into combat pressure the table cannot keep buried",
    spellcraftIdentity: "Flashback, artifact recursion, Spirit tokens, graveyard artifacts, and combat archaeology that make memory into material advantage.",
    tableCautionText: "Buy time with blockers, hold a recursion piece, and rebuild from artifacts or spirits after the first wipe.",
    tableCautionReviewRule: "If pests or biological reclamation appear, require Golgari or Witherbloom disambiguation",
  },
  PRISMARI: {
    key: "PRISMARI",
    shortName: "Prismari",
    ownedThemes: ["spell spectacle", "big instants/sorceries", "performance", "spell copying", "elemental payoff", "treasure", "expressive big turns", "Prepare mechanic", "Prepared"],
    allowedPhrases: ["art as arcana", "performative magic", "expressive turns", "elemental spectacle", "Prepare", "Prepared", "Opus"],
    bannedPhrases: ["clinical experimentation", "bureaucratic law", "life-drain economy"],
    bleedWarningTerms: ["experimental spellcraft", "jump-start recursion", "violent spectacle", "storm count"],
    bleedWarnings: ["avoid Izzet scientific tone or Rakdos depravity"],
    preferredArchetypeTags: ["Spellslinger", "Big Mana"],
    commanderPlan: "turns expression into the main event: build toward a big spell, copy the performance, and let elemental payoff make the table remember the turn",
    spellcraftIdentity: "Prepare and Prepared setup, Opus-scale instants and sorceries, spell copying, treasure, and elemental rewards that make one expressive turn matter.",
    tableCautionText: "Wait for shields to drop, hold protection, and make the big spell turn draw cards even if it gets answered.",
    tableCautionReviewRule: "If experiment metaphors appear, check for Izzet overlap",
  },
  QUANDRIX: {
    key: "QUANDRIX",
    shortName: "Quandrix",
    ownedThemes: ["scaling", "doubling", "counters", "fractals", "ramp", "mathematical inevitability", "token multiplication", "Increment mechanic"],
    allowedPhrases: ["mathematical inevitability", "exponential scaling", "fractal growth", "increment rewards", "Increment"],
    bannedPhrases: [
      "theatrical performance",
      "communal tokenism",
      "biological grafting",
      "turns spell sequencing into spectacle",
      "one stack become the story",
      "sculpt the hand",
      "uses the discard pile like a second hand",
      "stock the graveyard",
      "buy cards back",
      "make removal feel temporary",
    ],
    bleedWarningTerms: ["evolve and adapt", "mutation", "biological upgrades", "graveyard as resource", "spell sequencing"],
    bleedWarnings: ["avoid Simic organic evolution metaphors"],
    preferredArchetypeTags: ["Counters Matter", "Tokens", "Ramp"],
    commanderPlan: "makes numbers outrun answers: ramp, double counters or tokens, and let each growth pattern become too large for the table to calculate",
    spellcraftIdentity: "Increment rewards, fractal tokens, counter doubling, ramp, and token multiplication that turn small inputs into mathematical inevitability.",
    tableCautionText: "Protect the doubler, draw cards before overextending, and rebuild with ramp when the table removes the key piece.",
    tableCautionReviewRule: "If evolution or mutation appears, require Simic confirmation",
  },
  SILVERQUILL: {
    key: "SILVERQUILL",
    shortName: "Silverquill",
    ownedThemes: ["political pressure", "go-wide", "counters", "table influence", "words-as-power", "combat negotiation", "visible social leverage"],
    allowedPhrases: ["words wound", "repartee and rhetoric effects", "social leverage", "conditional persuasion", "Repartee"],
    bannedPhrases: ["raw physical spectacle", "metabolic sacrifice", "mathematical inevitability"],
    bleedWarningTerms: ["disciplined combat", "violent spectacle", "battalion tactics", "pure combat buffs"],
    bleedWarnings: ["avoid Boros discipline or Rakdos spectacle"],
    preferredArchetypeTags: ["Politics", "Tokens", "Counters Matter"],
    commanderPlan: "makes language into leverage: pressure life totals, negotiate attacks, and turn counters or go-wide boards into visible social force",
    spellcraftIdentity: "Repartee, political pressure, combat negotiation, counters, evasive bodies, and table-influence tools that make every word part of the attack.",
    tableCautionText: "Sequence smaller threats first, hold a political answer, and protect the speaker that turns attacks into leverage.",
    tableCautionReviewRule: "If pure combat buffs appear without rhetoric, require Boros or Selesnya check",
  },
  WITHERBLOOM: {
    key: "WITHERBLOOM",
    shortName: "Witherbloom",
    ownedThemes: ["life exchange", "pests", "sacrifice", "drain", "biology", "healing/harm", "life and death as one economy", "Infusion mechanic", "metabolic loops"],
    allowedPhrases: ["life as currency", "infusion and pest sacrifice", "metabolic loops", "drain for power", "Infusion"],
    bannedPhrases: ["archaeological artifact focus", "theatrical performance", "legal taxation"],
    bleedWarningTerms: ["slow rot", "reclamation metaphors", "graveyard as resource", "artifact archaeology"],
    bleedWarnings: ["avoid Golgari rot framing"],
    preferredArchetypeTags: ["Lifegain", "Sacrifice", "Aristocrats"],
    commanderPlan: "treats life and death as one economy: spend life, feed Pests, drain the table, and use Infusion lines to turn biology into power",
    spellcraftIdentity: "Infusion, Pest sacrifice, drain engines, life gain, and metabolic loops that make healing and harm fuel the same Commander plan.",
    tableCautionText: "Protect the drain engine, buy time with life gain, and rebuild through Pests when the table removes your outlet.",
    tableCautionReviewRule: "If slow rot or reclamation metaphors appear, require Golgari or Lorehold disambiguation",
  },
  ESPER: {
    key: "ESPER",
    shortName: "Esper",
    ownedThemes: ["perfectibility", "planning", "information advantage", "structured optimization", "controlled change", "library setup", "artifact-oriented value"],
    allowedPhrases: ["planned refinement", "information advantage", "structured optimization", "controlled change", "knowledge before action", "designed control"],
    bannedPhrases: ["Exact WUB", "generic three-color goodstuff", "artifact deck as canon", "Azorius-only procedure", "Dimir-only secrecy", "Orzhov-only obligation", "etherium lore proof", "named-location lore proof"],
    bleedWarningTerms: ["civic procedure alone", "hidden leverage alone", "debt obligation alone", "generic artifacts", "unbounded etherium", "unsupported figure lore", "living communal order"],
    bleedWarnings: ["avoid collapsing Esper into Azorius procedure, Dimir secrecy, Orzhov obligation, generic artifact value, Bant living order, or unsupported Esper lore"],
    preferredArchetypeTags: ["Control", "Artifacts", "Enchantments"],
    starterSearchTags: ["Control", "Artifacts", "Enchantments"],
    commanderPlan: "turns knowledge into a controlled future: set up the library, keep answers ready, convert cards into advantage, and let structure make the table's options narrower",
    spellcraftIdentity: "Use control, card advantage, library setup, artifact value, lifegain engines, reanimation value, tokens, and evasive pressure as gameplay texture for planned refinement and controlled change.",
    tableCautionText: "Hold the answer until it changes the outcome, protect the engine that turns knowledge into advantage, and avoid making the table feel locked out before your plan is ready.",
    tableCautionReviewRule: "If text sounds like generic artifacts, color-code goodstuff, or mechanics-as-canon, rebind it to VM-163/VM-166/VM-171 source limits.",
  },
  BANT: {
    key: "BANT",
    shortName: "Bant",
    ownedThemes: ["supported champion", "public honor", "communal trust", "disciplined belonging", "living order", "protection", "refinement", "exalted support", "sigil texture"],
    allowedPhrases: ["supported champion", "public trust", "living order", "refined protection", "communal support", "worthy line of action"],
    bannedPhrases: ["Exact WUG", "generic three-color goodstuff", "Asha founded Bant", "Elspeth governed Bant", "Asha created Bant's angels", "post-Phyrexia certainty", "sigil caste expansion"],
    bleedWarningTerms: ["Azorius prison", "Selesnya-only belonging", "Simic adaptation", "Naya aggression", "generic angels", "generic knights", "hard-lock stax"],
    bleedWarnings: ["avoid collapsing Bant into Azorius prison, Selesnya belonging alone, Simic adaptation, Naya aggression, or unsupported Asha/Elspeth lore"],
    preferredArchetypeTags: ["Voltron", "Counters Matter", "Enchantments"],
    starterSearchTags: ["Voltron", "Counters Matter", "Enchantments"],
    commanderPlan: "protects one worthy line of action: choose the champion, refine the support around it, and let the living community make that pressure honorable",
    spellcraftIdentity: "Use exalted, auras, equipment, blink, ETB value, enchantress, Clues, counters, and protection as Commander support texture for public trust and refined communal order. They are not new Bant canon claims.",
    tableCautionText: "Protect the line that carries the table's trust, keep interaction for the answer that breaks your support, and avoid turning order into a prison.",
    tableCautionReviewRule: "If text sounds like color-code goodstuff, Asha-founder lore, Elspeth governance, prison control, or mechanics-as-canon, rebind it to VM-159A/VM-168 source limits.",
  },
  GRIXIS: {
    key: "GRIXIS",
    shortName: "Grixis",
    ownedThemes: ["survival", "self-advocacy", "adaptation", "calculated leverage", "urgent action", "volatility", "hostile-condition resource pressure"],
    allowedPhrases: ["survive first", "find the weakness", "take the opening", "calculated pressure", "urgent action", "survival control", "leverage engine"],
    bannedPhrases: ["generic evil UBR", "Maestros interchangeability", "Bolas rules Grixis", "Sedris rules all of Grixis", "unearth as whole identity"],
    bleedWarningTerms: ["generic villainy", "death-world shorthand", "Maestros glamour", "pure secrecy", "spectacle appetite", "experiment for its own sake", "perfected artifact control", "public honor"],
    bleedWarnings: ["avoid collapsing Grixis into generic evil UBR, Maestros, Bolas/Sedris rulership, unearth-as-whole-identity, Dimir, Rakdos, Izzet, Esper, or Bant"],
    preferredArchetypeTags: ["Control", "Spellslinger", "Aristocrats"],
    starterSearchTags: ["Control", "Spellslinger", "Aristocrats"],
    commanderPlan: "survives first, studies the weakness, then takes the opening before the table can close it: trade resources deliberately, keep interaction ready, and turn pressure into leverage",
    spellcraftIdentity: "Removal, discard, sacrifice, spell recursion, card draw, and pressure pieces are Commander support texture for survival, calculation, and urgency. They are not proof that any one mechanic is the whole Grixis identity.",
    tableCautionText: "Hold the answer that keeps you alive, spend resources only when they create leverage, and take the narrow opening before the table closes it.",
    tableCautionReviewRule: "If text sounds like generic villainy, Maestros style, Bolas or Sedris rule, or unearth as the whole identity, rebind it to the VM-164 evidence floor.",
  },
  JUND: {
    key: "JUND",
    shortName: "Jund",
    ownedThemes: ["instinct", "appetite", "pressure", "survival", "sacrifice", "attrition", "drain", "graveyard value", "combat pressure", "consequence"],
    allowedPhrases: ["instinct worth feeding", "appetite into consequence", "pressure sets the clock", "survival after impact"],
    bannedPhrases: ["generic savage nature", "devour as total identity", "Modern Jund midrange as canon", "Exact BRG match"],
    bleedWarningTerms: ["communal behemoth ecology", "death-world necromancy", "civilization rejection", "performance cruelty", "lifecycle rot"],
    bleedWarnings: ["avoid collapsing Jund into Naya, Grixis, Gruul, Rakdos, Golgari, Witherbloom, Riveteers, or Modern Jund shorthand"],
    preferredArchetypeTags: ["Midrange", "Aggro", "Counters Matter"],
    starterSearchTags: ["Midrange", "Aggro", "Counters Matter"],
    commanderPlan: "makes every exchange expensive: pressure sets the clock, sacrifice pays the cost, attrition narrows the table, and drain turns appetite into consequence",
    spellcraftIdentity: "Use devour, sacrifice, graveyard value, lands, counters, tokens, combat pressure, and value engines as mechanical echoes of appetite, survival, and consequence. They are Commander support texture, not lore-canon proof.",
    tableCautionText: "Wait for the table to spend its answers, hold interaction, and rebuild before committing your last engine.",
    tableCautionReviewRule: "If text sounds like generic savagery, Modern Jund, or mechanics-as-canon, rebind it to VM-176/VM-179 support-only limits.",
  },
  NAYA: {
    key: "NAYA",
    shortName: "Naya",
    ownedThemes: ["abundance", "living world", "belonging", "growth", "creature-forward scale", "instinct", "protection", "larger natural whole", "ramp", "tokens", "counters"],
    allowedPhrases: ["living abundance", "guard the living whole", "grow mana", "protected board", "creature-forward scale", "instinctive care"],
    bannedPhrases: ["generic big-creature-only framing", "generic RGW goodstuff", "Cabaretti as Naya canon", "Jund pressure", "Bant hierarchy"],
    bleedWarningTerms: ["generic big creatures", "goodstuff", "drain", "attrition", "sacrifice small pieces", "spellslinger", "party style"],
    bleedWarnings: ["avoid collapsing Naya into generic big creatures, generic tokens, Cabaretti, Selesnya-with-red, Gruul-with-white, Bant-with-red, or Jund pressure"],
    preferredArchetypeTags: ["Ramp", "Big Mana", "Tokens"],
    starterSearchTags: ["Ramp", "Big Mana", "Tokens"],
    commanderPlan: "can grow mana into a protected board, lets creature-forward scale carry the pressure, and turns instinct, belonging, and abundance into a shared push",
    spellcraftIdentity: "Ramp, protection, creature engines, tokens, counters, land support, and combat texture can all help Naya guard the living whole. Treat them as support texture for abundance, instinct, belonging, and scale, not as new canon claims.",
    tableCautionText: "Develop mana first, protect the living board, and commit the largest swing after the cleanest answer is spent.",
    tableCautionReviewRule: "If text sounds like generic RGW goodstuff, pure big-creature shorthand, Cabaretti style, or Jund pressure, rebind it to VM-181/VM-184 support-only limits.",
  },
  ABZAN: {
    key: "ABZAN",
    shortName: "Abzan",
    ownedThemes: ["family endurance", "ancestor obligation", "perennation", "house continuity", "defensive patience", "Kin-Tree memory", "counters", "tokens", "lifegain", "sacrifice"],
    allowedPhrases: ["family endurance", "house continuity", "ancestor obligation", "perennation", "defensive patience", "guard the next generation"],
    bannedPhrases: ["generic three-color goodstuff", "Dromoka's brood as Abzan continuity", "Commander products as canon", "generic graveyard value"],
    bleedWarningTerms: ["Dromoka brood", "generic graveyard value", "generic lifegain", "Sultai cruelty", "Mardu raid pressure", "Jeskai discipline-only", "Temur frontier endurance"],
    bleedWarnings: ["avoid collapsing Abzan into generic same-color goodstuff, Dromoka's brood, Sultai, Mardu, Jeskai, Temur, Orzhov, Selesnya, Golgari, or Commander-product canon"],
    preferredArchetypeTags: ["Counters Matter", "Lifegain", "Tokens"],
    starterSearchTags: ["Counters Matter", "Lifegain", "Tokens"],
    commanderPlan: "endures through layered defenses: grow counters, preserve life totals, spend bodies carefully, and let family-duty texture become a long-game board",
    spellcraftIdentity: "Defenders, toughness matters, counters, tokens, sacrifice, keyword counters, graveyard enchantments, Food, life gain, poison, corrupted, and proliferate can all support Abzan's endurance and ancestor-duty texture. Treat them as Commander support, not canon proof.",
    tableCautionText: "Build the defensive base, protect the piece that carries the counters or life engine, and let the table spend answers before committing the next generation of value.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Dromoka continuity, or mechanics-as-canon, rebind it to VM-197 through VM-201 support-only limits.",
  },
  TEMUR: {
    key: "TEMUR",
    shortName: "Temur",
    ownedThemes: ["survival", "instinct", "mental fortitude", "shamanic listening", "elemental memory", "Qal Sisma", "dragons", "ramp", "copying", "energy", "counters"],
    allowedPhrases: ["listen before moving", "survival through attunement", "earned strength", "elemental memory", "mental fortitude", "harsh-terrain instinct"],
    bannedPhrases: ["generic GUR goodstuff", "Atarka Clan as Temur continuity", "Commander products as canon", "Dragonstorm backfill", "generic dragon ramp copy identity"],
    bleedWarningTerms: ["Atarka continuity", "generic dragons", "generic ramp", "generic copying", "Commander canon", "Sultai pragmatism", "Jeskai discipline-only", "Naya abundance"],
    bleedWarnings: ["avoid collapsing Temur into generic same-color goodstuff, Atarka Clan continuity, Commander-product canon, Dragonstorm backfill, Naya, Sultai, Jeskai, Mardu, Abzan, Gruul, Simic, or Izzet"],
    preferredArchetypeTags: ["Ramp", "Big Mana", "Spellslinger"],
    starterSearchTags: ["Ramp", "Big Mana", "Spellslinger"],
    commanderPlan: "listens for the right opening, grows resources, and lets dragons, copying, counters, or huge force become table texture for survival through attunement",
    spellcraftIdentity: "Dragons, ramp, energy, artifacts, copying spells and creatures, instants matter, non-hand casting, artifact tokens, counters, X-spells, and ravenous lines can give Commander table texture to Temur's survival, instinct, and elemental-force plan. They are deck expression, not the source of the clan's lore.",
    tableCautionText: "Develop mana and board texture first, hold the copying or force multiplier until the table exposes the right signal, and avoid treating raw size as the whole identity.",
    tableCautionReviewRule: "If text sounds like generic GUR goodstuff, Atarka continuity, Dragonstorm backfill, Commander products as canon, or mechanics-as-canon, rebind it to VM-203 through VM-207 support-only limits.",
  },
  SULTAI: {
    key: "SULTAI",
    shortName: "Sultai",
    ownedThemes: ["ruthlessness", "opportunity", "resource conversion", "necromancy", "Sidisi-era ambition", "graveyard value", "theft", "self-mill", "morph", "mutate", "recursion"],
    allowedPhrases: ["ruthless opportunity", "resource conversion", "keep the dead useful", "calculated advantage", "no advantage unclaimed", "source-bound Sultai Brood"],
    bannedPhrases: ["generic same-color goodstuff", "Silumgar continuity", "Dragonstorm backfill", "Commander products as canon", "mechanics-as-canon", "generic graveyard value"],
    bleedWarningTerms: ["generic same-color", "Silumgar continuity", "Dragonstorm backfill", "Commander canon", "generic theft", "generic mill", "generic morph", "generic mutate", "Abzan ancestry", "Temur attunement"],
    bleedWarnings: ["avoid collapsing Sultai into generic same-color goodstuff, Silumgar continuity, Dragonstorm backfill, Commander-product canon, Dimir, Golgari, Simic, Abzan, Temur, Grixis, Jund, or Witherbloom"],
    preferredArchetypeTags: ["Graveyard", "Theft", "Self-Mill"],
    starterSearchTags: ["Graveyard", "Theft", "Self-Mill"],
    commanderPlan: "turns graveyards, stolen resources, and hidden information into table advantage while keeping that play texture anchored to source-bound Sultai Brood identity",
    spellcraftIdentity: "Graveyard value, theft, self-mill, mill, morph, mutate, recursion, hidden information, and complex creature value can give Commander table texture to Sultai's ruthless resource-conversion plan. They are table texture, not Tarkir setting evidence.",
    tableCautionText: "Set up graveyard and hand-resource engines early, convert the first discarded option into leverage, and keep enough interaction to make the stolen or returned resource matter.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Silumgar continuity, Dragonstorm backfill, Commander products as canon, or mechanics-as-canon, rebind it to VM-209 through VM-213 support-only limits.",
  },
  MARDU: {
    key: "MARDU",
    shortName: "Mardu",
    ownedThemes: ["speed", "total commitment", "martial order", "war names", "raid momentum", "ruthless opportunity", "combat pressure", "tokens", "sacrifice", "recursion"],
    allowedPhrases: ["Red-centered speed", "take the opening", "war-name oath", "coordinated attack", "ruthless opportunity", "source-bound Mardu Horde"],
    bannedPhrases: ["generic same-color goodstuff", "Kolaghan continuity", "Dragonstorm backfill", "Commander products as canon", "mechanics-as-canon", "generic attack deck"],
    bleedWarningTerms: ["generic same-color", "Kolaghan continuity", "Dragonstorm backfill", "Commander canon", "generic attack", "generic sacrifice", "Abzan endurance", "Temur attunement", "Sultai resource conversion"],
    bleedWarnings: ["avoid collapsing Mardu into generic same-color goodstuff, Kolaghan continuity, Dragonstorm backfill, Commander-product canon, Boros, Orzhov, Rakdos, Abzan, Temur, Sultai, Naya, or Jund"],
    preferredArchetypeTags: ["Aggro", "Tokens", "Sacrifice"],
    starterSearchTags: ["Aggro", "Tokens", "Sacrifice"],
    commanderPlan: "turns early pressure, attack triggers, expendable bodies, and removal into a coordinated charge while keeping that play texture anchored to source-bound Mardu Horde identity",
    spellcraftIdentity: "Combat pressure, tokens, sacrifice, recursion, aristocrats texture, attack triggers, and removal can give Commander table texture to Mardu's speed, martial oath, and ruthless-opening plan. They are table texture, not Tarkir setting evidence.",
    tableCautionText: "Commit pressure early, keep the key attack lane protected, and spend sacrifice or removal pieces only when they keep the charge named and moving.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Kolaghan continuity, Dragonstorm backfill, Commander products as canon, or mechanics-as-canon, rebind it to VM-223 through VM-227 support-only limits.",
  },
  JESKAI: {
    key: "JESKAI",
    shortName: "Jeskai",
    ownedThemes: ["discipline", "cunning", "martial practice", "monastery training", "tempo", "spells", "protection", "copies", "artifacts", "energy", "cycling"],
    allowedPhrases: ["Blue-centered cunning", "trained insight", "disciplined action", "monastery practice", "precision and restraint", "source-bound Jeskai Way"],
    bannedPhrases: ["generic same-color goodstuff", "Ojutai continuity", "Dragonstorm backfill", "Commander products as canon", "mechanics-as-canon", "generic spellslinger deck"],
    bleedWarningTerms: ["generic same-color", "Ojutai continuity", "Dragonstorm backfill", "Commander canon", "generic spells", "generic prowess", "Mardu speed", "Temur attunement", "Sultai resource conversion"],
    bleedWarnings: ["avoid collapsing Jeskai into generic same-color goodstuff, Ojutai continuity, Dragonstorm backfill, Commander-product canon, Izzet, Azorius, Boros, Temur, Mardu, Sultai, Naya, Esper, or Grixis"],
    preferredArchetypeTags: ["Spellslinger", "Tempo", "Control"],
    starterSearchTags: ["Spellslinger", "Tempo", "Control"],
    commanderPlan: "turns timing, protection, copies, and disciplined pressure into table texture for trained insight becoming action",
    spellcraftIdentity: "Tempo play, protection, copies, spells, prowess-like pressure, artifacts, energy, cycling, and time counters can give Commander table texture to Jeskai's discipline, cunning, and martial-practice plan. They are table texture, not Tarkir setting evidence.",
    tableCautionText: "Develop the stance first, keep interaction ready, and spend the decisive spell only when it lets insight become action without losing restraint.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Ojutai continuity, Dragonstorm backfill, Commander products as canon, or mechanics-as-canon, rebind it to VM-229 through VM-233 source boundaries.",
  },
  YORE: {
    key: "YORE",
    shortName: "Yore",
    ownedThemes: ["engineered agency", "artifice", "civilization", "technology", "progress", "constructed continuity", "refusal of natural surrender", "artifact engines", "recursion texture"],
    allowedPhrases: ["four-color without Green", "engineered agency", "artifice", "civilization", "technology", "progress", "refusal of natural surrender", "constructed continuity"],
    bannedPhrases: ["official MTG faction", "official universal WUBR name", "Cult of Yore equivalence", "Breya proves Yore lore", "cEDH proof", "Commander legality proof", "generic WUBR goodstuff", "generic artifact deck"],
    bleedWarningTerms: ["generic artifacts", "generic recursion", "generic WUBR", "Breya-only", "Cult of Yore", "Thran", "Phyrexia", "Esper perfection", "Sultai resource conversion"],
    bleedWarnings: ["avoid collapsing Yore into generic artifacts, generic recursion, Breya-only artifacts, Cult of Yore, Thran, Phyrexia, Esper, Grixis, Jeskai, Mardu, Sultai, or WUBR goodstuff"],
    preferredArchetypeTags: ["Artifacts", "Aristocrats", "Control"],
    starterSearchTags: ["Artifacts", "Aristocrats", "Control"],
    commanderPlan: "turns artifacts, sacrifice, recursion, and controlled engines into table texture for engineered agency against natural surrender",
    spellcraftIdentity: "Use artifacts, sacrifice, recursion, control, value engines, and precise combo texture as Commander-facing ways to show artifice and constructed continuity. They are table texture, not the source of the name or identity.",
    tableCautionText: "Build the engine carefully, protect the piece that keeps agency online, and avoid treating every artifact or graveyard line as Yore unless it carries the four-color without Green worldview.",
    tableCautionReviewRule: "If text sounds like generic WUBR goodstuff, Breya as lore proof, Cult of Yore equivalence, cEDH proof, or mechanics-as-canon, rebind it to VM-240 through VM-244 source boundaries.",
  },
  GLINT: {
    key: "GLINT",
    shortName: "Glint",
    ownedThemes: ["adaptive appetite", "volatility", "living force", "missing White pressure", "improvisation", "storm-fed growth", "predatory current", "maelstrom texture"],
    allowedPhrases: ["four-color without White", "adaptive appetite", "living force under pressure", "storm-fed growth", "volatility with intelligence", "source-bound Glint / Chaos"],
    bannedPhrases: ["official MTG faction", "official universal UBRG name", "Chaos proves a universal name", "Yidris proves Glint lore", "Commander legality proof", "generic UBRG goodstuff", "generic chaos deck"],
    bleedWarningTerms: ["generic UBRG", "generic chaos", "generic cascade", "Yidris-only", "Glint-Eye institution", "Grixis cruelty", "Jund appetite", "Temur experimentation", "Sultai exploitation", "Omnath value shell"],
    bleedWarnings: ["avoid collapsing Glint into generic UBRG goodstuff, generic chaos, generic cascade, Yidris-only shells, Glint-Eye institutional claims, Grixis, Jund, Temur, Sultai, or Omnath/non-Black four-color value"],
    preferredArchetypeTags: ["Spellslinger", "Aggro", "Midrange"],
    starterSearchTags: ["Spellslinger", "Aggro", "Midrange"],
    commanderPlan: "turns volatility, pressure, living-force adaptation, and opportunistic bursts into table texture for a storm-fed identity that refuses White-style civic restraint",
    spellcraftIdentity: "Cascade-adjacent turns, combat-damage spell momentum, volatile sequencing, pressure-based value, and adaptive creature or spell engines can give Commander table texture to Glint's appetite, intelligence, ignition, and living-force plan. They are table texture, not the source of the name or identity.",
    tableCautionText: "Keep the pressure alive, but do not mistake every high-variance or cascade shell for Glint unless the full non-White frame, adaptive appetite, and living-force pressure are all present.",
    tableCautionReviewRule: "If text sounds like generic UBRG goodstuff, generic chaos or cascade, Yidris as lore proof, Glint-Eye as an institution, or mechanics-as-canon, rebind it to VM-246 through VM-250 source boundaries.",
  },
  DUNE: {
    key: "DUNE",
    shortName: "Dune",
    ownedThemes: ["organized territorial pressure", "force-backed solidarity", "missing Blue pressure", "common front", "cost-bearing conquest", "survival-minded multiplication", "line pressure"],
    allowedPhrases: ["four-color without Blue", "organized territorial pressure", "force-backed solidarity", "common-front force", "missing-Blue pressure", "source-bound Dune"],
    bannedPhrases: ["official MTG faction", "official universal BRGW name", "Aggression as public alias", "Saskia proves Dune lore", "Commander legality proof", "generic BRGW goodstuff", "generic combat shell"],
    bleedWarningTerms: ["generic BRGW", "generic go-wide", "generic tokens", "generic combat", "Saskia-only", "Dune-Brood institution", "Jund appetite", "Naya belonging", "Mardu raid-speed", "Abzan endurance", "Glint adaptation"],
    bleedWarnings: ["avoid collapsing Dune into generic BRGW goodstuff, generic go-wide or combat shells, Saskia-only shells, Dune-Brood institutional claims, Jund, Naya, Mardu, Abzan, Glint, or Blue-present four-color value piles"],
    preferredArchetypeTags: ["Aggro", "Tokens", "Midrange"],
    starterSearchTags: ["Aggro", "Tokens", "Midrange"],
    commanderPlan: "turns coordinated combat pressure, cost-bearing aggression, survival-minded multiplication, and multi-front force into table texture for organized territorial pressure without Blue-style distance",
    spellcraftIdentity: "Go-wide pressure, multi-front combat, token-like multiplication, attack triggers, and disciplined threat sequencing can give Commander table texture to Dune's line, cost, ignition, and persistence. They are table texture, not the source of the name or identity.",
    tableCautionText: "Keep the line moving, but do not mistake every combat shell, token deck, or same-color pile for Dune unless the full non-Blue territorial frame and force-backed solidarity are both present.",
    tableCautionReviewRule: "If text sounds like generic BRGW goodstuff, Aggression as a public alias, Saskia as lore proof, Dune-Brood as an institution, or mechanics-as-canon, rebind it to VM-252 through VM-256 source boundaries.",
  },
  INK: {
    key: "INK",
    shortName: "Ink",
    ownedThemes: ["protected public abundance", "open knowledge", "guarded generosity", "public commons", "community benefit", "anti-hoarding boundary", "group-hug table texture"],
    allowedPhrases: ["four-color without Black", "protected public abundance", "open knowledge", "guarded generosity", "public commons", "community benefit", "Ink / Altruism display framing"],
    bannedPhrases: ["official MTG faction", "official universal same-color name", "Altruism as public alias", "Kynaios proves Ink lore", "Ink-Treader institution", "Commander legality proof", "generic same-color goodstuff", "generic group-hug deck"],
    bleedWarningTerms: ["generic same-color", "generic group-hug", "generic public archive", "Kynaios-only", "Stalwart Unity", "Ink-Treader-only", "Bant order", "Jeskai discipline", "Naya belonging", "Temur attunement", "Dune force", "Glint appetite"],
    bleedWarnings: ["avoid collapsing Ink into generic same-color goodstuff, generic group-hug, generic public-archive shells, Kynaios-only texture, Ink-Treader-only texture, Bant, Jeskai, Naya, Temur, Dune, Glint, or Altruism as a public alias"],
    preferredArchetypeTags: ["Group Hug", "Politics", "Ramp"],
    starterSearchTags: ["Group Hug", "Politics", "Ramp"],
    commanderPlan: "turns shared resources, politics, ramp, draw, and table reciprocity into Commander texture for guarded public abundance without letting the gift become private leverage",
    spellcraftIdentity: "Group-hug exchanges, political incentives, shared-card or shared-mana texture, ramp, and carefully guarded reciprocity can give Commander table texture to Ink's open knowledge and public commons plan. They are table texture, not the source of the name or identity.",
    tableCautionText: "Keep the commons guarded, but do not mistake every group-hug, Kynaios, Ink-Treader, or same-color pile for Ink unless the full non-Black anti-hoarding frame and protected public-abundance boundary are both present.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Altruism as a public alias, Kynaios as lore proof, Ink-Treader as an institution, or mechanics-as-canon, rebind it to VM-258 through VM-262 source boundaries.",
  },
  WITCH: {
    key: "WITCH",
    shortName: "Witch",
    ownedThemes: ["patient cultivation", "calculated expansion", "protected growth", "systematic accumulation", "missing Red pressure", "ambition under structure", "proliferate texture", "counter scaling"],
    allowedPhrases: ["four-color without Red", "patient cultivation", "calculated expansion", "protected growth", "systematic accumulation", "Witch / Growth display framing"],
    bannedPhrases: ["official MTG faction", "official universal GWUB name", "Growth as public alias", "Atraxa proves Witch lore", "Witch-Maw institution", "Commander legality proof", "generic GWUB goodstuff", "generic counters deck"],
    bleedWarningTerms: ["generic GWUB", "generic counters", "generic proliferate", "Atraxa-only", "Breed Lethality", "Witch-Maw-only", "infect-only", "superfriends-only", "Phyrexia-only", "Bant order", "Esper control", "Sultai ambition", "Abzan endurance"],
    bleedWarnings: ["avoid collapsing Witch into generic GWUB goodstuff, generic counters or proliferate, Atraxa-only texture, Breed Lethality, Witch-Maw-only texture, infect-only, superfriends-only, Phyrexia-only, Bant, Esper, Sultai, Abzan, Growth as public alias, or same-color piles"],
    preferredArchetypeTags: ["Counters Matter", "Midrange", "Control"],
    starterSearchTags: ["Counters Matter", "Midrange", "Control"],
    commanderPlan: "turns protected counters, proliferate texture, value engines, and long-horizon resource growth into table texture for calculated inevitability without Red-style impulse",
    spellcraftIdentity: "Counters, proliferate texture, protected engines, recursion-adjacent value, and scaling board development can give Commander table texture to Witch's cultivation, structure, calculation, and ambition. They are table texture, not the source of the name or identity.",
    tableCautionText: "Cultivate patiently, protect the engine, and do not mistake every Atraxa, counter, proliferate, infect, superfriends, or same-color pile for Witch unless the full non-Red protected-growth worldview is present.",
    tableCautionReviewRule: "If text sounds like generic GWUB goodstuff, Growth as a public alias, Atraxa as lore proof, Witch-Maw as an institution, Breed Lethality as naming authority, or mechanics-as-canon, rebind it to VM-264 through VM-268 source boundaries.",
  },
  COLORLESS: {
    key: "COLORLESS",
    shortName: "Colorless",
    ownedThemes: ["outside-WUBRG precision", "chosen restriction", "true colorless mana", "Wastes", "artifact engines", "utility lands", "Eldrazi scale", "generic/colorless separation", "five-color Eldrazi separator"],
    allowedPhrases: ["outside WUBRG", "chosen restriction", "true {C}", "Wastes", "artifact engines", "colorless finishers", "limits become the plan"],
    bannedPhrases: ["sixth color", "superior to WUBRG", "generic mana is colorless", "artifact equals Colorless", "five-color Eldrazi proves Colorless", "discard pile like a second hand", "stock the graveyard", "buy cards back", "make removal feel temporary", "The pilot", "recognizable Commander table role"],
    bleedWarningTerms: ["generic mana", "devoid", "five-color Eldrazi", "Ulalek", "Eldrazi Incursion", "Phyrexia", "colored artifacts", "all artifacts"],
    bleedWarnings: ["avoid collapsing true {C}, generic mana, artifacts, Eldrazi, Wastes, Devoid, Phyrexia, or five-color Eldrazi into one Colorless identity"],
    preferredArchetypeTags: ["Artifacts", "Big Mana", "Ramp"],
    starterSearchTags: ["Artifacts", "Big Mana", "Ramp"],
    commanderPlan: "starts with the outside-WUBRG constraint: build reliable {C}, then make mana rocks, utility lands, and colorless finishers prove why the limit was chosen",
    spellcraftIdentity: "Wastes, true {C} sources, mana rocks, utility lands, artifact engines, and colorless finishers create strict Colorless footing while generic costs, Devoid, artifacts, and five-color Eldrazi stay separate.",
    tableCautionText: "Develop Wastes, true {C} sources, and mana rocks first, keep generic costs separate, and verify artifacts, Devoid, Eldrazi, or five-color Eldrazi before calling them native Colorless.",
    tableCautionReviewRule: "If text treats Colorless as a sixth color, WUBRG mastery, generic mana, all artifacts, Devoid, Phyrexia, or five-color Eldrazi, rebind it to VM-324, VM-326, VM-334, and VM-337 source boundaries.",
  },
};

const SUMMARY_STRIP_LABELS = Object.freeze({
  adjacentFit: "Adjacent fit",
  whereThisLeads: "Where this leads",
  playPattern: "Play pattern",
});

const SUMMARY_PLACEHOLDER_RE = /\b(todo|tbd|placeholder|missing)\b/i;
const SUMMARY_COMPARE_WORD_RE = /[a-z0-9+]+/gi;
const SUMMARY_GENERIC_OPPONENT_READ =
  "Opponents experience the deck through its repeated play patterns and the choices it forces.";

// Display fallbacks only. These values protect the summary strip from going blank;
// they are not packet truth, canon, or source authority.
const SUMMARY_STRIP_DISPLAY_OVERRIDES = new Map([
  ["YORE", {
    whereThisLeadsHeading: "Rebuild the engine",
    playPatternHeading: "Keep agency online",
  }],
  ["GLINT", {
    whereThisLeadsHeading: "Feed the opening",
    playPatternHeading: "Keep the pressure live",
  }],
  ["DUNE", {
    whereThisLeadsHeading: "Take the field early",
    playPatternHeading: "Hold the line in public",
  }],
  ["INK", {
    whereThisLeadsHeading: "Guard the commons",
    playPatternHeading: "Keep the gift moving",
  }],
  ["WITCH", {
    whereThisLeadsHeading: "Cultivate the engine",
    playPatternHeading: "Let advantage root",
  }],
  ["COLORLESS", {
    whereThisLeadsHeading: "Build outside the wheel",
    playPatternHeading: "Make limits into structure",
    tags: ["Artifacts", "Big Mana", "Ramp"],
  }],
]);

// Display fallbacks only. These entries keep mocked or incomplete reads renderable
// and should never be treated as source authority.
const SUMMARY_STRIP_FALLBACKS = Object.freeze({});

function normalizeTagText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9+/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function displayList(values = []) {
  return (values || []).filter(Boolean).join(", ");
}

function normalizeDisplayName(value) {
  return normalizeTagText(value).replace(/\s+/g, " ").trim();
}

function cardDisplayName(value) {
  const name = String(value || "").trim();
  return CARD_DISPLAY_NAME_OVERRIDES.get(normalizeDisplayName(name)) || name;
}

function applyCardDisplayNames(value) {
  return CARD_DISPLAY_TEXT_OVERRIDES.reduce(
    (text, entry) => text.replace(entry.pattern, entry.displayName),
    String(value || "")
  );
}

function uniqueByDisplayName(values = []) {
  const seen = new Set();
  const result = [];

  (values || []).forEach((value) => {
    const name = cardDisplayName(value);
    const key = normalizeDisplayName(name);
    if (!name || seen.has(key)) {
      return;
    }
    seen.add(key);
    result.push(name);
  });

  return result;
}

function uniqueObjectsBy(items = [], keyFn) {
  const seen = new Set();
  const result = [];

  (items || []).forEach((item) => {
    const key = keyFn(item);
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    result.push(item);
  });

  return result;
}

function dedupeLinks(links = []) {
  return uniqueObjectsBy(links, (link) => {
    const url = String(link?.url || "").trim();
    const label = normalizeDisplayName(link?.label || "");
    const service = normalizeDisplayName(link?.service || "");
    return url || `${service}:${label}`;
  });
}

function getCommanderGuidanceKey(faction) {
  const key = faction?.key || faction;
  if (COMMANDER_FACTION_GUIDANCE[key]) {
    return key;
  }

  const name = normalizeDisplayName(faction?.name || "");
  return Object.keys(COMMANDER_FACTION_GUIDANCE).find((candidate) => {
    const guidance = COMMANDER_FACTION_GUIDANCE[candidate];
    return name.includes(normalizeDisplayName(guidance.shortName));
  }) || "";
}

export function getCommanderFactionGuidance(faction) {
  return COMMANDER_FACTION_GUIDANCE[getCommanderGuidanceKey(faction)] || null;
}

function containsPhrase(text, phrase) {
  const normalizedText = normalizeDisplayName(text);
  const normalizedPhrase = normalizeDisplayName(phrase);
  return Boolean(normalizedPhrase && normalizedText.includes(normalizedPhrase));
}

function countOwnedThemeHits(text, guidance) {
  return (guidance?.ownedThemes || []).filter((theme) => containsPhrase(text, theme)).length;
}

function commanderLaneDetail(details = [], labelPattern) {
  return (details || []).find((detail) => labelPattern.test(detail.label || ""))?.copy || "";
}

function commanderStapleDescription(name, faction) {
  const guidance = getCommanderFactionGuidance(faction);
  const themes = (guidance?.ownedThemes || []).slice(0, 3).join(", ");
  const displayName = cardDisplayName(name);
  const specific = {
    "Adrix and Nev, Twincasters": "Token doubling gives Quandrix a clean route from one small equation to a board state the table can no longer calculate.",
    "Alesha, Who Smiles at Death": "Turns Mardu attack pressure into recursion for small creatures, keeping speed, war-name commitment, and ruthless opportunity on the same line.",
    "Anafenza, the Foremost": "Puts Abzan counters, family endurance, and graveyard denial on one aggressive body while staying anchored to house continuity.",
    "Animar, Soul of Elements": "Makes Temur's earned strength visible through creature growth and cost reduction, rewarding a board that listens before it becomes huge.",
    "Breya, Etherium Shaper": "Gives Yore a conservative support-only face for artifact engines, constructed continuity, and engineered agency without making Breya the source of Yore lore.",
    "Breena, the Demagogue": "Turns table politics into cards and counters, exactly where Silverquill wants its social leverage to become visible.",
    "Chulane, Teller of Tales": "Turns Bant creature casts into cards, lands, and reusable support, keeping refinement and living order attached to a visible board.",
    "Dina, Soul Steeper": "Converts life gain into table-wide drain, giving Witherbloom a simple engine for life and death as one economy.",
    "Doran, the Siege Tower": "Lets Abzan endurance become pressure by turning toughness and defensive patience into a practical way to end the game.",
    "Elsha of the Infinite": "Keeps Jeskai spellcraft disciplined by turning the top of the library into a trained noncreature-spell line with flash timing.",
    "Kaalia of the Vast": "Converts Mardu's decisive opening into immediate combat pressure, with a clear caveat that the line is swingy and removal-prone.",
    "Kalamax, the Stormsire": "Lets Temur copy the instant that matters, turning patience, signal-reading, and elemental force into one explosive turn.",
    "Karador, Ghost Chieftain": "Keeps Abzan's dead useful for the house by turning graveyard recursion into long-game continuity instead of generic value.",
    "Killian, Ink Duelist": "Rewards targeted pressure and cheap interaction, giving Silverquill a focused combat-negotiation commander.",
    "Kynaios and Tiro of Meletis": "Gives Ink a conservative support-only face for guarded public abundance, shared resources, and political generosity without making the card the source of Ink lore.",
    "Marath, Will of the Wild": "Gives Naya a flexible creature-forward mana sink where counters, bodies, and damage stay tied to living-board pressure.",
    "Muldrotha, the Gravetide": "Turns Sultai resource conversion into repeatable graveyard access, making every spent permanent a calculated future advantage.",
    "Narset, Enlightened Master": "Lets Jeskai trained insight become action through combat-triggered spellcasting, with a caveat against turning the path into extra-turns autopilot.",
    "Pantlaza, Sun-Favored": "Turns creature-forward scale into fresh momentum, letting Naya grow mana and keep the living board moving through Dinosaur pressure.",
    "Rafiq of the Many": "Focuses Bant support behind one honorable champion, making exalted pressure and public trust visible in combat.",
    "Rootha, Mercurial Artist": "Copies the expressive spell that matters, letting Prismari make one big performance echo twice.",
    "Saskia the Unyielding": "Gives Dune a conservative support-only face for coordinated combat pressure and force-backed solidarity without making Saskia the source of Dune lore.",
    "Shalai and Hallar": "Makes counters visible as protective pressure, giving Naya a clean support line from growth to table impact.",
    "Sidisi, Brood Tyrant": "Turns Sultai self-mill into bodies and leverage, keeping necromantic utility tied to Sidisi-era ambition.",
    "Surrak Dragonclaw": "Gives Temur a clean ferocious face: uncounterable creature pressure, flash timing, and earned strength in one support line.",
    "The Mimeoplasm": "Makes Sultai graveyards into selective material, turning dead creatures into one calculated threat.",
    "Tuvasa the Sunlit": "Offers Bant an enchantress champion whose growth stays tied to refinement, protection, and visible support.",
    "Veyran, Voice of Duality": "Doubles magecraft-style triggers so Prismari and Izzet spell turns become louder without losing velocity.",
    "Willowdusk, Essence Seer": "Turns life-total swings into counters, making Witherbloom's healing and harm visible in combat.",
    "Yidris, Maelstrom Wielder": "Gives Glint a conservative support-only face for cascade pressure, volatility, and storm-fed adaptation without making Yidris the source of Glint lore.",
    "Zurgo Helmsmasher": "Turns Mardu speed and total commitment into a direct commander plan that asks the table to answer the charge immediately.",
    "Zimone, Quandrix Prodigy": "Rewards land drops and card flow, giving Quandrix ramp decks a steady way to keep the math moving.",
  };

  return specific[displayName] ||
    `${displayName} already appears in ${faction?.name || "this faction"} starter references and supports ${themes || "the faction's Commander plan"}.`;
}

function splitLandSource(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return String(value || "")
    .split(/\s*\/\s*|\s*\n\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanLandPick(value, sourceTier, suppressedQuantities) {
  const original = String(value || "").trim();
  if (!original) {
    return "";
  }

  let name = original;
  const prefixMatch = name.match(LAND_QUANTITY_PATTERN);
  const suffixMatch = name.match(LAND_SUFFIX_QUANTITY_PATTERN);

  if (prefixMatch && Number(prefixMatch[1]) > 1) {
    name = prefixMatch[2].trim();
    suppressedQuantities.push({ sourceTier, original, renderedName: name });
  } else if (suffixMatch) {
    name = suffixMatch[1].trim();
    suppressedQuantities.push({ sourceTier, original, renderedName: name });
  }

  name = name.replace(/\s+/g, " ").trim();
  return BASIC_LAND_PLACEHOLDERS.has(normalizeDisplayName(name)) ? "" : name;
}

function canonicalLandKeys(value) {
  const displayName = cardDisplayName(value);
  return unique([
    normalizeDisplayName(displayName),
    ...displayName.split(/\s*\/\/\s*/).map((face) => normalizeDisplayName(face)),
  ]).filter(Boolean);
}

function addUniqueLandPick({ output, seen, value, sourceTier, suppressedDuplicates }) {
  const displayName = cardDisplayName(value);
  const keys = canonicalLandKeys(displayName);
  if (!displayName || !keys.length) return;

  const duplicateKey = keys.find((key) => seen.has(key));
  if (duplicateKey) {
    suppressedDuplicates.push({
      sourceTier,
      original: value,
      renderedName: displayName,
      duplicateOf: seen.get(duplicateKey),
    });
    return;
  }

  keys.forEach((key) => seen.set(key, displayName));
  output.push(displayName);
}

function normalizeLandTierAcrossSources(sources, sourceTier, seen, suppressedQuantities, suppressedDuplicates) {
  const output = [];
  (sources || []).forEach((source) => {
    splitLandSource(source)
      .map((value) => cleanLandPick(value, sourceTier, suppressedQuantities))
      .filter(Boolean)
      .forEach((value) => addUniqueLandPick({
        output,
        seen,
        value,
        sourceTier,
        suppressedDuplicates,
      }));
  });
  return output;
}

function basicLandGuidance(colors = []) {
  const colorSet = new Set(colors || []);
  const labels = {
    W: "Plains",
    U: "Islands",
    B: "Swamps",
    R: "Mountains",
    G: "Forests",
  };
  const basics = MANA_ORDER.filter((color) => colorSet.has(color)).map((color) => labels[color]);
  if (!basics.length) {
    return "Start with Wastes, true {C} sources, and mana rocks before utility lands. Generic costs are not colorless mana, Command Tower cannot choose colorless, and Reflecting Pool-style effects need another {C} source before they help.";
  }
  return `Tune ${basics.join(" and ")} to your early pips after the nonbasic shell, ramp package, and utility lands are chosen.`;
}

export function buildCommanderLandRecommendations(faction) {
  const landBase = faction?.land_base || {};
  const suppressedQuantities = [];
  const suppressedDuplicates = [];
  const seenLandKeys = new Map();
  const premium = normalizeLandTierAcrossSources(
    [landBase.premium, landBase.optimal],
    "premium",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);
  const midrange = normalizeLandTierAcrossSources(
    [landBase.midrange, landBase.mid],
    "midrange",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);
  const budget = normalizeLandTierAcrossSources(
    [landBase.budget, landBase.budget_line],
    "budget",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);
  const utility = normalizeLandTierAcrossSources(
    [landBase.utility, landBase.utility_line],
    "utility",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);

  return {
    premium,
    midrange,
    budget,
    utility,
    basicGuidance: basicLandGuidance(faction?.colors || []),
    suppressedQuantities,
    suppressedDuplicates,
  };
}

export function hasRenderableLandTier(landRecommendations = {}, tier) {
  if (tier === "basics") {
    return true;
  }
  return Array.isArray(landRecommendations?.[tier]) && landRecommendations[tier].length > 0;
}

function includesRulePattern(text, pattern) {
  const normalizedText = normalizeTagText(text);
  const normalizedPattern = normalizeTagText(pattern);

  if (!normalizedPattern) {
    return false;
  }

  if (/^[a-z0-9 ]+$/.test(normalizedPattern)) {
    const escaped = normalizedPattern
      .split(" ")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("\\s+");
    return new RegExp(`(^|\\s)${escaped}(\\s|$)`).test(normalizedText);
  }

  return normalizedText.includes(normalizedPattern);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function sentenceCase(value) {
  const text = String(value || "").trim();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
}

function compactSentence(value) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (!text) {
    return "";
  }
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function cleanSentenceFragment(value) {
  return compactSentence(value).replace(/[.;:!?]+$/g, "");
}

function lowerInitial(value) {
  const text = cleanSentenceFragment(value);
  if (!text) {
    return "";
  }
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

function edhrecCommanderSlug(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const commanderIndex = parts.indexOf("commanders");
    return commanderIndex >= 0 ? parts[commanderIndex + 1] || "" : "";
  } catch (_) {
    return "";
  }
}

function genericCommanderSlugs(faction) {
  const identity = getColorIdentity(faction?.colors || faction?.key || "");
  return new Set([
    faction?.research_links?.edhrec_slug || "",
    COLOR_IDENTITY_SLUGS.get(identity) || "",
    normalizeTagText(faction?.name || "").replace(/\s+/g, "-"),
  ].filter(Boolean));
}

function isGenericCommanderDeck(deck, faction) {
  const name = normalizeTagText(deck?.name || "");
  const slug = edhrecCommanderSlug(deck?.edhrec);

  if (!deck || String(deck.fmt || "").toLowerCase() !== "commander") {
    return true;
  }

  if (!name || /\bcommanders?\b/.test(name) || /\bcommander\s+decks?\b/.test(name)) {
    return true;
  }

  return Boolean(slug && genericCommanderSlugs(faction).has(slug));
}

function pathRuleForText(text) {
  const normalized = normalizeTagText(text);
  return COMMANDER_PATH_RULES.find((rule) =>
    rule.patterns.some((pattern) => includesRulePattern(normalized, pattern))
  ) || COMMANDER_PATH_RULES[0];
}

function omenPhraseForEntry(entry) {
  const text = [entry?.signal, entry?.answer_title, entry?.prompt]
    .filter(Boolean)
    .join(" ");
  const rule = OMEN_COPY_RULES.find((item) => item.pattern.test(text));
  return rule?.phrase || "You chose the line that made the table reveal itself before you committed your best card.";
}

function positiveFactionNames(entry, factions = {}, activeFactionKey = "") {
  const ranked = (entry?.deltas || [])
    .filter((delta) => delta.delta > 0)
    .sort((left, right) => {
      if (left.faction === activeFactionKey) {
        return -1;
      }
      if (right.faction === activeFactionKey) {
        return 1;
      }
      return right.delta - left.delta;
    });
  const filtered = activeFactionKey === "ABZAN" && ranked.some((delta) => delta.faction === activeFactionKey)
    ? ranked.filter((delta) => delta.faction === activeFactionKey)
    : ranked;
  const names = filtered
    .map((delta) => factions[delta.faction]?.name || delta.faction)
    .filter(Boolean);

  return unique(names).slice(0, 2);
}

function ensureCatalogTag(catalog, tagName) {
  const normalized = normalizeTagText(tagName);
  return catalog?.nameByNormalized?.get(normalized) || null;
}

function resolveRuleTag(catalog, value, rules) {
  const text = normalizeTagText(value);
  if (!text) {
    return null;
  }

  const rule = rules.find((entry) => entry.patterns.some((pattern) => includesRulePattern(text, pattern)));
  return rule ? ensureCatalogTag(catalog, rule.tag) : null;
}

function getTagCategory(catalog, tagName) {
  return catalog?.categoryByName?.get(tagName) || "other";
}

function tagLaneLabel(lane, tagName, category, factionKey = "") {
  if (lane === "budget") {
    if (tagName === "Budget") return "Budget-friendly Commander builds";
    return String(factionKey || "").toUpperCase() === "COLORLESS"
      ? `${tagName} deckbuilder lane`
      : "Midrange Commander shells";
  }

  const categoryLabels = {
    archetype: "archetype",
    mechanic: "mechanic",
    "creature-type": "typal",
    theme: "theme",
    other: "utility",
  };
  return `${tagName} ${categoryLabels[category] || "utility"} lane`;
}

function addTagLane(lanes, seen, catalog, tagName, lane, source, priority, factionKey = "") {
  const canonical = ensureCatalogTag(catalog, tagName);
  if (!canonical || seen.has(canonical)) {
    return;
  }

  const category = getTagCategory(catalog, canonical);
  lanes.push({
    lane,
    tagName: canonical,
    category,
    source,
    priority,
    label: tagLaneLabel(lane, canonical, category, factionKey),
  });
  seen.add(canonical);
}

function summarizeRecentEvidence(evidenceTrail = [], limit = 2) {
  return unique(
    evidenceTrail
      .slice(-4)
      .map((entry) => entry?.signal || entry?.answer_title)
  ).slice(0, limit);
}

function evidenceSupportForFaction(evidenceTrail = [], factionKey) {
  return evidenceTrail
    .filter((entry) => entry?.deltas?.some((delta) => delta.faction === factionKey && delta.delta > 0))
    .map((entry) => entry.signal || entry.answer_title)
    .filter(Boolean);
}

function toPlainEvidencePhrases(signals = []) {
  const phrases = [];
  signals.forEach((signal) => {
    const match = EVIDENCE_EXPLANATIONS.find((entry) => entry.pattern.test(signal));
    if (match && !phrases.includes(match.phrase)) {
      phrases.push(match.phrase);
    }
  });
  return phrases;
}

/**
 * Validates the expanded deck-tag catalog shape.
 *
 * @param {object} data Parsed deck-tags_expanded.json data.
 * @returns {{valid:boolean,errors:string[],warnings:string[]}} Validation report.
 */
export function validateDeckTagData(data) {
  const errors = [];
  const warnings = [];
  const archidekt = data?.archidekt;
  const tags = archidekt?.tags;

  if (!archidekt || typeof archidekt !== "object") {
    errors.push("Missing archidekt tag catalog.");
    return { valid: false, errors, warnings };
  }

  if (!Number.isInteger(archidekt.deckFormatCommander)) {
    errors.push("archidekt.deckFormatCommander must be an integer.");
  }

  if (!Array.isArray(tags)) {
    errors.push("archidekt.tags must be an array.");
    return { valid: false, errors, warnings };
  }

  const names = new Set();
  const aliases = new Map();

  tags.forEach((tag, index) => {
    if (!tag || typeof tag !== "object") {
      errors.push(`Tag ${index} must be an object.`);
      return;
    }

    if (typeof tag.name !== "string" || !tag.name.trim()) {
      errors.push(`Tag ${index} is missing a non-empty name.`);
    }
    if (!Array.isArray(tag.aliases)) {
      errors.push(`Tag ${tag.name || index} is missing aliases.`);
    }
    if (typeof tag.category !== "string" || !tag.category.trim()) {
      errors.push(`Tag ${tag.name || index} is missing category.`);
    }

    const nameKey = normalizeTagText(tag.name);
    if (nameKey) {
      if (names.has(nameKey)) {
        errors.push(`Duplicate canonical tag name: ${tag.name}.`);
      }
      names.add(nameKey);
    }

    (tag.aliases || []).forEach((alias) => {
      if (typeof alias !== "string" || !alias.trim()) {
        errors.push(`Tag ${tag.name || index} has an empty alias.`);
        return;
      }

      const aliasKey = normalizeTagText(alias);
      const existing = aliases.get(aliasKey);
      if (existing && existing !== tag.name) {
        warnings.push(`Alias "${alias}" appears on both ${existing} and ${tag.name}; explicit conflict rules decide it.`);
      } else {
        aliases.set(aliasKey, tag.name);
      }
    });
  });

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Builds a resolver-friendly Archidekt tag catalog from the expanded JSON.
 *
 * @param {object} data Parsed deck-tags_expanded.json data.
 * @returns {object} Tag catalog with canonical name and alias maps.
 */
export function createArchidektTagCatalog(data) {
  const validation = validateDeckTagData(data);
  if (!validation.valid) {
    throw new Error(`Invalid Archidekt tag catalog: ${validation.errors.join(" ")}`);
  }

  const archidekt = data.archidekt;
  const nameByNormalized = new Map();
  const aliasToName = new Map();
  const categoryByName = new Map();
  const tags = archidekt.tags.map((tag) => ({
    name: tag.name,
    aliases: tag.aliases.slice(),
    category: tag.category,
  }));

  tags.forEach((tag) => {
    nameByNormalized.set(normalizeTagText(tag.name), tag.name);
    categoryByName.set(tag.name, tag.category);
    tag.aliases.forEach((alias) => {
      const aliasKey = normalizeTagText(alias);
      if (!aliasToName.has(aliasKey)) {
        aliasToName.set(aliasKey, tag.name);
      }
    });
  });

  CANONICAL_ALIAS_OVERRIDES.forEach((tagName, alias) => {
    const canonical = nameByNormalized.get(normalizeTagText(tagName));
    if (canonical) {
      aliasToName.set(normalizeTagText(alias), canonical);
    }
  });

  return {
    deckFormatCommander: archidekt.deckFormatCommander || DEFAULT_COMMANDER_DECK_FORMAT,
    tags,
    tagNames: tags.map((tag) => tag.name),
    nameByNormalized,
    aliasToName,
    categoryByName,
    validation,
  };
}

/**
 * Resolves a user-facing or internal tag phrase to a canonical catalog name.
 *
 * @param {object} catalog Archidekt tag catalog.
 * @param {string} value Text to resolve.
 * @returns {string|null} Canonical tag name when present.
 */
export function resolveArchidektTagName(catalog, value) {
  const text = normalizeTagText(value);
  if (!text) {
    return null;
  }

  const mapped = resolveRuleTag(catalog, text, ARCHETYPE_TEXT_RULES) ||
    resolveRuleTag(catalog, text, EVIDENCE_TEXT_RULES);
  if (mapped) {
    return mapped;
  }

  return catalog.nameByNormalized.get(text) || catalog.aliasToName.get(text) || null;
}

/**
 * Returns a WUBRG-ordered color identity code for external deck-search sites.
 *
 * @param {string[]|string} colors Faction colors or color code.
 * @returns {string} Color identity code.
 */
export function getColorIdentity(colors) {
  const colorSet = new Set(Array.isArray(colors) ? colors : String(colors || "").toUpperCase().split(""));
  return MANA_ORDER.filter((color) => colorSet.has(color)).join("");
}

function normalizeRoutingKey(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/\b(COLLEGE|GUILD|SENATE|HOUSE|CULT|CLANS|LEGION|SWARM|COMBINE|CONCLAVE)\b/g, "")
    .replace(/[^A-Z0-9]+/g, "")
    .trim();
}

function routingAliasFromColors(colors) {
  const identity = getColorIdentity(colors);
  const slug = COLOR_IDENTITY_SLUGS.get(identity) || identity.toLowerCase();
  return {
    guild: slug,
    colorIdentity: identity,
    label: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : identity,
  };
}

/**
 * Resolves the reliable guild/color-pair alias used by external Commander directories.
 *
 * @param {object|string|string[]} source Faction record, faction key, or colors.
 * @returns {{guild:string,colorIdentity:string,label:string,edhrecUrl:string,mtgDecksUrl:string}} Alias routing metadata.
 */
export function getExternalDeckRoutingAlias(source) {
  const keyCandidates = [];
  let routedIdentity = null;
  if (source && typeof source === "object" && !Array.isArray(source)) {
    keyCandidates.push(
      source.key,
      source.name,
      source.identity?.expression_key,
      source.identity?.routing?.label,
      source.research_links?.edhrec_slug,
      ...(source.aliases || [])
    );
    routedIdentity = source.identity?.routing || source.layered_identity?.routing || null;
  } else {
    keyCandidates.push(source);
  }

  if (routedIdentity?.edhrec_slug || routedIdentity?.mtgdecks_slug) {
    const guild = routedIdentity.edhrec_slug || routedIdentity.mtgdecks_slug;
    const colorIdentity = routedIdentity.color_identity || getColorIdentity(
      source && typeof source === "object" && !Array.isArray(source) ? (source.colors || source.key) : source
    );
    return {
      guild,
      colorIdentity,
      label: routedIdentity.label || guild,
      edhrecUrl: `https://edhrec.com/commanders/${routedIdentity.edhrec_slug || guild}`,
      mtgDecksUrl: `https://mtgdecks.net/Commander/${routedIdentity.mtgdecks_slug || guild}-commanders`,
    };
  }
  if (routedIdentity?.suppress_directory_links) {
    return {
      guild: "",
      colorIdentity: routedIdentity.color_identity || getColorIdentity(
        source && typeof source === "object" && !Array.isArray(source) ? (source.colors || source.key) : source
      ),
      label: routedIdentity.label || "Commander",
      edhrecUrl: "",
      mtgDecksUrl: "",
      suppressDirectoryLinks: true,
    };
  }

  const matched = keyCandidates
    .map(normalizeRoutingKey)
    .map((key) => EXTERNAL_ROUTING_ALIASES.get(key))
    .find(Boolean);
  const alias = matched || routingAliasFromColors(
    source && typeof source === "object" && !Array.isArray(source) ? (source.colors || source.key) : source
  );

  return {
    ...alias,
    edhrecUrl: `https://edhrec.com/commanders/${alias.guild}`,
    mtgDecksUrl: `https://mtgdecks.net/Commander/${alias.guild}-commanders`,
  };
}

export function buildMtgDecksCommanderUrl(name) {
  const slug = String(name || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `https://mtgdecks.net/Commander/${slug}`;
}

/**
 * Builds an Archidekt deck search URL using URLSearchParams.
 *
 * @param {object} options URL options.
 * @param {string[]|string} options.colors Color identity.
 * @param {number=} options.deckFormatCommander Archidekt Commander format id.
 * @param {string=} options.deckTagName Canonical Archidekt tag name.
 * @param {string=} options.commanderName Optional curated commander name.
 * @returns {string} Search URL.
 */
export function buildArchidektDeckSearchUrl({
  colors,
  colorIdentity = "",
  deckFormatCommander = DEFAULT_COMMANDER_DECK_FORMAT,
  deckTagName = "",
  commanderName = "",
}) {
  const params = new URLSearchParams();
  params.set("colors", String(colorIdentity || getColorIdentity(colors) || "").toUpperCase());
  params.set("deckFormat", String(deckFormatCommander));
  if (deckTagName) {
    params.set("deckTagName", deckTagName);
  }
  if (commanderName) {
    params.set("commanderName", commanderName);
  }
  params.set("orderBy", "-updatedAt");
  params.set("page", "1");
  return `${ARCHIDEKT_SEARCH_BASE}?${params.toString()}`;
}

/**
 * Builds an MTGDecks format URL using the faction color identity.
 *
 * @param {object} deck Faction deck entry.
 * @param {string[]|string} colors Faction colors.
 * @returns {string} MTGDecks URL.
 */
export function buildMtgDecksUrl(deck, colors) {
  return getExternalDeckRoutingAlias(colors || deck?.colors || deck?.name || deck?.fmt || "Commander").mtgDecksUrl;
}

/**
 * Infers service-chip presentation metadata for a deck-search link.
 *
 * @param {object} link Link descriptor.
 * @returns {object} Service chip metadata.
 */
export function getServiceChipMeta(link) {
  const text = `${link?.service || ""} ${link?.kind || ""} ${link?.label || ""} ${link?.url || ""}`.toLowerCase();
  const key = Object.keys(SERVICE_CHIP_META).find((serviceKey) => serviceKey !== "generic" && text.includes(serviceKey)) ||
    (text.includes("mtgdecks") ? "mtgdecks" : "");
  return SERVICE_CHIP_META[key] || SERVICE_CHIP_META.generic;
}

/**
 * Returns the directory links that belong in the first Commander guidance card.
 *
 * @param {object} faction Faction display record.
 * @returns {object[]} EDHREC and MTGDecks links for Commander discovery.
 */
export function buildCommanderDirectoryLinks(faction) {
  const alias = getExternalDeckRoutingAlias(faction);
  const links = [];
  if (alias.suppressDirectoryLinks) {
    return links;
  }

  links.push({
    service: "edhrec",
    label: `${alias.label} commanders`,
    url: alias.edhrecUrl,
  });

  links.push({
    service: "mtgdecks",
    label: `${alias.label} Commander decks`,
    url: alias.mtgDecksUrl,
  });

  return dedupeLinks(links);
}

const COMMANDER_COMPASS_RECOMMENDATION_PRIORITY = [
  "native_fit_commanders",
  "iconic_lore_forward_commanders",
  "budget_friendly_commanders",
  "advanced_complexity_commanders",
  "weird_stretch_commanders",
];

function isScryfallCardPageUrl(value) {
  return /^https:\/\/scryfall\.com\/card\//i.test(String(value || "")) && !/\/search\b/i.test(String(value || ""));
}

function isValidCommanderCompassCandidate(candidate) {
  return Boolean(
    (candidate?.exact_card_name || candidate?.display_name) &&
    candidate?.commander_legal === true &&
    isScryfallCardPageUrl(candidate?.scryfall_uri) &&
    Array.isArray(candidate?.color_identity) &&
    candidate.color_identity.length &&
    candidate?.why_this_fits &&
    candidate?.skip_if &&
    candidate?.gameplay_summary
  );
}

function cleanSkipIfText(value) {
  return String(value || "").replace(/^skip if\s*:?\s*/i, "").trim();
}

function commanderCompassCandidateDescription(candidate) {
  const skipIf = cleanSkipIfText(candidate.skip_if);
  return [
    candidate.why_this_fits,
    skipIf ? `Skip if: ${skipIf}` : "",
  ].filter(Boolean).join(" ");
}

function sourceLabelForCandidateSource(source) {
  if (source === "commander_compass") return "commander_compass";
  if (source === "deck-link") return "named Commander deck link";
  if (source === "colorless-orientation") return "strict Colorless orientation";
  if (source === "staple") return "starter legendary whitelist";
  return "fallback";
}

function commanderCandidateSourceSummary(candidates = []) {
  if (!candidates.length) {
    return "fallback";
  }

  const counts = new Map();
  candidates.forEach((candidate) => {
    const label = sourceLabelForCandidateSource(candidate.source);
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  return [...counts.entries()].map(([label, count]) => `${label} (${count})`).join(", ");
}

/**
 * Collects Commander preview candidates from curated faction data.
 *
 * Commander Compass recommendations come first, followed by named Commander
 * deck links and locally curated legendary creature staples. The browser image
 * loader still verifies each card with Scryfall before displaying it.
 *
 * @param {object} faction Faction display record.
 * @param {{limit?:number}=} options Selection options.
 * @returns {object[]} Ordered commander preview candidates.
 */
export function collectCommanderPreviewCandidates(faction, options = {}) {
  const limit = options.limit || 3;
  const candidates = [];
  const seen = new Set();
  const addCandidate = ({
    name,
    desc = "",
    source = "faction",
    edhrec = "",
    mtgd = "",
    scryfall = "",
    recommendationType = "",
    skipIf = "",
    whyThisFits = "",
    displayTags = [],
  }) => {
    const displayName = cardDisplayName(name);
    const key = normalizeTagText(displayName);
    const slugKey = normalizeTagText(edhrecCommanderSlug(edhrec).replace(/-/g, " "));
    const dedupeKeys = unique([
      key,
      slugKey,
      COMMANDER_PREVIEW_DEDUPE_ALIASES.get(key),
      COMMANDER_PREVIEW_DEDUPE_ALIASES.get(slugKey),
    ]);

    if (!displayName || !key || dedupeKeys.some((dedupeKey) => seen.has(dedupeKey))) {
      return;
    }

    candidates.push({
      name: displayName,
      desc: applyCardDisplayNames(desc),
      source,
      sourceLabel: sourceLabelForCandidateSource(source),
      edhrec,
      mtgd,
      scryfall,
      recommendationType,
      skipIf,
      whyThisFits,
      displayTags: Array.isArray(displayTags) ? displayTags.filter(Boolean) : [],
    });
    dedupeKeys.forEach((dedupeKey) => seen.add(dedupeKey));
  };

  COMMANDER_COMPASS_RECOMMENDATION_PRIORITY.forEach((category) => {
    (faction?.commander_compass?.[category] || [])
      .filter(isValidCommanderCompassCandidate)
      .forEach((candidate) => {
        addCandidate({
          name: candidate.exact_card_name || candidate.display_name,
          desc: commanderCompassCandidateDescription(candidate),
          source: "commander_compass",
          edhrec: candidate.edhrec_uri || "",
          scryfall: candidate.scryfall_uri || "",
          recommendationType: candidate.recommendation_type || "",
          skipIf: candidate.skip_if || "",
          whyThisFits: candidate.why_this_fits || "",
        });
      });
  });

  (faction?.deck_links || [])
    .filter((deck) => String(deck.fmt || "").toLowerCase() === "commander")
    .filter((deck) => !isGenericCommanderDeck(deck, faction))
    .forEach((deck) => {
      addCandidate({
        name: deck.name,
        desc: deck.desc,
        source: "deck-link",
        edhrec: deck.edhrec || "",
        mtgd: buildMtgDecksUrl(deck, faction?.colors || faction?.key || ""),
      });
    });

  if (String(faction?.key || "").toUpperCase() === "COLORLESS") {
    [
      {
        name: "Zhulodok, Void Gorger",
        desc: "Strict Colorless orientation: shows the Eldrazi Unbound lane for Wastes, true {C}, mana rocks, and expensive colorless spells without making five-color Eldrazi native support.",
        displayTags: ["Strict Colorless", "Wastes + {C}", "Eldrazi Scale"],
      },
      {
        name: "Omarthis, Ghostfire Initiate",
        desc: "Strict Colorless orientation: a second official Colorless support example for the same boundary, useful when comparing artifact-engine growth to Eldrazi-scale payoffs.",
        displayTags: ["Strict Colorless", "Colorless Growth", "Boundary Example"],
      },
    ].forEach((candidate) => {
      addCandidate({
        ...candidate,
        source: "colorless-orientation",
      });
    });
  }

  (faction?.staples?.creatures || []).forEach((name) => {
    if (CURATED_LEGENDARY_CREATURE_STAPLES.has(normalizeTagText(name))) {
      addCandidate({
        name,
        desc: commanderStapleDescription(name, faction),
        source: "staple",
      });
    }
  });

  return candidates.slice(0, limit);
}

/**
 * Collects validated Archidekt tag lanes from the result context.
 *
 * @param {object} options Lane options.
 * @returns {object[]} Ordered tag lanes, capped to three.
 */
export function collectArchidektTagLanes({
  catalog,
  faction,
  placementResult,
  starterProfile,
  modelFaction,
}) {
  const lanes = [];
  const seen = new Set();
  const budget = normalizeTagText(starterProfile?.budget_band || "");
  const factionKey = String(faction?.key || "").toUpperCase();

  if (budget === "budget") {
    addTagLane(lanes, seen, catalog, "Budget", "budget", "starter profile", 10, factionKey);
  } else if (["mid", "mid-range", "midrange"].includes(budget)) {
    addTagLane(lanes, seen, catalog, factionKey === "COLORLESS" ? "Big Mana" : "Midrange", "budget", "starter profile", 10, factionKey);
  }

  (faction?.archetypes || []).forEach((item, index) => {
    [item.name, item.desc].forEach((text) => {
      const tag = resolveRuleTag(catalog, text, ARCHETYPE_TEXT_RULES) || resolveArchidektTagName(catalog, text);
      addTagLane(lanes, seen, catalog, tag, "archetype", item.name, 20 + index, factionKey);
    });
  });

  const mechanicsText = modelFaction?.identity?.mechanics || "";
  ARCHETYPE_TEXT_RULES.forEach((rule, index) => {
    if (rule.patterns.some((pattern) => includesRulePattern(mechanicsText, pattern))) {
      addTagLane(lanes, seen, catalog, rule.tag, "mechanic", "mechanics summary", 40 + index, factionKey);
    }
  });

  (placementResult?.evidence_trail || []).slice(-5).forEach((entry, index) => {
    const evidenceText = [entry.signal, entry.answer_title, entry.prompt].filter(Boolean).join(" ");
    const tag = resolveRuleTag(catalog, evidenceText, EVIDENCE_TEXT_RULES);
    addTagLane(lanes, seen, catalog, tag, "evidence", entry.signal || entry.answer_title, 60 + index, factionKey);
  });

  return lanes
    .sort((left, right) => {
      if (left.priority !== right.priority) {
        return left.priority - right.priority;
      }
      return left.tagName.localeCompare(right.tagName);
    })
    .slice(0, 3);
}

/**
 * Builds the one base Archidekt search and up to three validated tag searches.
 *
 * @param {object} options Link options.
 * @returns {object[]} Link descriptors.
 */
export function buildArchidektSearchLinks({
  catalog,
  faction,
  placementResult,
  starterProfile,
  modelFaction,
  commanderName = "",
}) {
  const colors = faction?.colors || faction?.key || "";
  const deckRouting = getExternalDeckRoutingAlias(faction);
  const technicalColorIdentity = deckRouting.colorIdentity || getColorIdentity(colors) || "";
  const deckSearchLabel = deckRouting.label || getColorIdentity(colors) || "Commander";
  const deckFormatCommander = catalog?.deckFormatCommander || DEFAULT_COMMANDER_DECK_FORMAT;
  const tagLanes = collectArchidektTagLanes({
    catalog,
    faction,
    placementResult,
    starterProfile,
    modelFaction,
  });

  return dedupeLinks([
    {
      kind: "archidekt-base",
      service: "archidekt",
      label: `${deckSearchLabel} Commander decks`,
      url: buildArchidektDeckSearchUrl({ colors, colorIdentity: technicalColorIdentity, deckFormatCommander, commanderName }),
    },
    ...tagLanes.map((lane) => ({
      kind: "archidekt-tag",
      service: "archidekt",
      tagName: lane.tagName,
      category: lane.category,
      label: lane.label,
      url: buildArchidektDeckSearchUrl({
        colors,
        colorIdentity: technicalColorIdentity,
        deckFormatCommander,
        deckTagName: lane.tagName,
        commanderName,
      }),
    })),
  ]);
}

/**
 * Builds paired Maze and Scryfall package links for Commander deck construction.
 *
 * @param {object} faction Faction display record.
 * @returns {{maze:object[],scryfall:object[]}} Link groups.
 */
export function buildCommanderPackageLinks(faction) {
  const identity = getExternalDeckRoutingAlias(faction).colorIdentity.toLowerCase();
  const links = PACKAGE_QUERIES.map((entry) => {
    const query = entry.query(identity);
    return {
      key: entry.key,
      label: entry.label,
      query,
      pathType: entry.key,
      operatorQuery: query,
      plainReadingQuery: entry.plain(identity),
      mazeUrl: `/maze/?q=${encodeURIComponent(query)}`,
      scryfallUrl: `https://scryfall.com/search?q=${encodeURIComponent(query)}`,
    };
  });

  return {
    maze: links.map((link) => ({
      service: "maze",
      label: link.label,
      pathType: link.pathType,
      plainReadingQuery: link.plainReadingQuery,
      operatorQuery: link.operatorQuery,
      url: link.mazeUrl,
    })).filter((link, index, all) => all.findIndex((item) => item.url === link.url) === index),
    scryfall: links.map((link) => ({
      service: "scryfall",
      label: link.label,
      url: link.scryfallUrl,
    })).filter((link, index, all) => all.findIndex((item) => item.url === link.url) === index),
  };
}

/**
 * Turns raw evidence entries into flavorful result omens.
 *
 * @param {object} options Omen options.
 * @param {object[]} options.evidenceTrail Placement evidence trail entries.
 * @param {object=} options.factions Faction display records by key.
 * @param {string=} options.activeFactionKey Current faction view.
 * @param {number=} options.limit Maximum omens to return.
 * @returns {{title:string,answerTitle:string,copy:string}[]} Signal cards.
 */
export function buildReadingOmens({
  evidenceTrail = [],
  factions = {},
  activeFactionKey = "",
  limit = 4,
} = {}) {
  const activeKey = String(activeFactionKey || "").toUpperCase();
  const sourceEntries = (evidenceTrail || [])
    .slice(-limit)
    .map((entry, index) => ({ entry, index }));
  const omens = sourceEntries
    .map(({ entry, index }) => {
      const answerTitle = entry?.answer_title || "A table choice";
      const names = positiveFactionNames(entry, factions, activeFactionKey);
      const echo = names.length
        ? ` It ${names.length > 1 ? "echoed" : "was answered by"} ${names.join(" and ")}.`
        : "";
      const copy = activeKey === "COLORLESS"
        ? colorlessOmenCopy(entry)
        : `${omenPhraseForEntry(entry)}${echo}`;

      return {
        title: `Signal ${index + 1}`,
        answerTitle,
        copy,
      };
    });
  if (activeKey !== "COLORLESS") return omens;

  const seen = new Set();
  return omens.filter((omen) => {
    const key = normalizeDisplayName(`${omen.answerTitle} ${omen.copy}`);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((omen, index) => ({ ...omen, title: `Signal ${index + 1}` }));
}

function colorlessOmenCopy(entry = {}) {
  const text = [
    entry.signal,
    entry.answer_title,
    entry.prompt,
  ].filter(Boolean).join(" ").toLowerCase();
  if (/wastes?|true \{?c\}?|colorless mana|clean mana/.test(text)) {
    return "This signal pointed toward true {C} discipline: Wastes, clean colorless sources, and deck limits that become structure instead of generic mana looseness.";
  }
  if (/artifact|engine|machinery|utility|infrastructure|ramp|big mana/.test(text)) {
    return "This signal pointed toward infrastructure first: artifact engines, utility lands, ramp, and ahead-of-schedule threats rather than a normal color curve.";
  }
  if (/eldrazi|void|cosmic|waste|devoid|five-color|ulalek/.test(text)) {
    return "This signal needed Colorless boundary work: Eldrazi scale can matter, but Devoid and five-color Eldrazi stay separate from strict Colorless identity.";
  }
  if (/limit|restriction|constraint|outside|wheel|wubrg/.test(text)) {
    return "This signal favored the chosen limit itself: a deck plan that becomes sharper because the five colors are not available as shortcuts.";
  }
  if (/structure|patience|order|discipline|precision/.test(text)) {
    return "This signal pointed toward precision under constraint: every slot has to justify itself because Colorless cannot lean on normal color access.";
  }
  return "This signal treated absence as a rule, not a blank: the appeal was building a whole Commander plan from what the color wheel leaves outside.";
}

/**
 * Builds copy for the Commander starting-lane result card.
 *
 * @param {object} options Lane options.
 * @returns {{title:string,copy:string,details:{label:string,copy:string}[]}} Starting lane copy.
 */
export function buildCommanderStartingLane({
  faction,
  placementResult,
  starterProfile,
  modelFaction,
  tagLanes = [],
}) {
  const colorIdentity = getColorIdentity(faction?.colors || faction?.key || "");
  const archetypes = (faction?.archetypes || []).slice(0, 2).map((item) => item.name);
  const mechanics = modelFaction?.identity?.mechanics || "";
  const budget = starterProfile?.budget_band || "mid";
  const experience = starterProfile?.experience_level || "returning";
  const guidance = getCommanderFactionGuidance(faction);
  const laneTags = guidance?.starterSearchTags?.length
    ? guidance.starterSearchTags
    : tagLanes.map((lane) => lane.tagName);
  const institutionWord = getExpressionKindLabel(faction);
  const deckCenter = archetypes.length
    ? `Start with ${archetypes.join(" or ")}`
    : `Start with the ${colorIdentity || "chosen"} color identity`;
  const researchLanes = laneTags.length
    ? `Your first searches should orbit ${laneTags.join(", ")}.`
    : "Your first searches should favor cards that make the main plan repeatable, protected, and easy to see in an opening hand.";
  const spellcraft = guidance?.spellcraftIdentity || compactSentence(mechanics) || pathRuleForText([
    faction?.name,
    faction?.tagline,
    faction?.philosophy,
    mechanics,
    archetypes.join(" "),
    summarizeRecentEvidence(placementResult?.evidence_trail || [], 3).join(" "),
  ].join(" ")).spellcraft;
  const plan = guidance?.commanderPlan || pathRuleForText([
    faction?.name,
    faction?.tagline,
    faction?.philosophy,
    mechanics,
    archetypes.join(" "),
  ].join(" ")).plan;
  const tableCaution = guidance?.tableCautionText ||
    "Wait for the table to spend its answers, hold interaction, and rebuild before committing your last engine.";

  const copy = `${faction?.name || "This path"} wants a Commander deck that ${plan}. ${deckCenter}, then tune the 99 so your best turns feel like your reading did.`;

  return {
    title: "Start With This Commander Plan",
    copy,
    details: [
      {
        label: "Deck footing",
        copy: `Budget and experience: ${budget} budget, ${experience} pilot. ${researchLanes}`,
      },
      {
        label: `${institutionWord} spellcraft`,
        copy: compactSentence(spellcraft),
      },
      {
        label: "Table caution",
        copy: tableCaution,
      },
    ].filter(Boolean),
  };
}

/**
 * Explains why an adjacent fit appeared in plain language.
 *
 * @param {object} options Explanation options.
 * @returns {string} User-facing explanation.
 */
export function explainAdjacentFit({
  match,
  matchFaction,
  primaryFaction,
  placementResult,
  modelFaction,
}) {
  const signals = evidenceSupportForFaction(placementResult?.evidence_trail || [], match?.faction);
  const phrases = toPlainEvidencePhrases(signals);
  const guidance = getCommanderFactionGuidance(matchFaction);
  const targetThemes = (guidance?.ownedThemes || []).slice(0, 4).join(", ");

  if (phrases.length) {
    return `${matchFaction.name} appeared because ${phrases.slice(0, 2).join(" and ")}. Through ${matchFaction.name}, that pressure becomes ${targetThemes || "a target-faction Commander plan"}.`;
  }

  const expression = modelFaction?.biological_expression?.archetype;
  if (expression) {
    return `${matchFaction.name} stayed nearby because the ${withoutLeadingArticle(expression).toLowerCase()} pattern overlaps with the way your reading approached the table, then translates it into ${targetThemes || "the target faction's Commander identity"}.`;
  }

  return `${matchFaction.name} stayed nearby because the same reading can translate into ${targetThemes || "another Commander identity"} without replacing ${primaryFaction.name}.`;
}

function activeMatchForResult(result, activeKey) {
  return (
    (result?.top_matches || []).find((match) => match.faction === activeKey) ||
    (result?.adjacent_matches || []).find((match) => match.faction === activeKey) ||
    null
  );
}

function buildStarterCards(faction) {
  return {
    creatures: uniqueByDisplayName(faction?.staples?.creatures || []),
    spells: uniqueByDisplayName(faction?.staples?.spells || []),
    permanents: uniqueByDisplayName(faction?.staples?.permanents || []),
  };
}

function hasStarterCardReferences(starterCards = {}) {
  return ["creatures", "spells", "permanents"].some((group) => (starterCards[group] || []).length);
}

/**
 * Commander dossier audit contract:
 * - always required: core faction identity, Commander path, land recommendations, and package-search surfaces
 * - capability-gated: starter cards only when authored; public Commander directory links only when not intentionally suppressed
 * - intentionally suppressible: empty starter-card panels and four-color public Commander directory links
 */
function buildDossierAuditSectionContract({
  faction,
  starterCards = {},
  commanderStartLinks = [],
  archidektLinks = [],
} = {}) {
  const routingAlias = getExternalDeckRoutingAlias(faction);
  const starterCardsRenderable = hasStarterCardReferences(starterCards);
  const directoryLinksSuppressed = Boolean(routingAlias.suppressDirectoryLinks);

  return {
    starterCards: {
      required: starterCardsRenderable,
      starterCardsRenderable,
    },
    commanderDirectoryLinks: {
      required: !directoryLinksSuppressed,
      suppressed: directoryLinksSuppressed,
      hasLinks: Boolean((commanderStartLinks || []).length),
    },
    alternativeCommanderDiscovery: {
      required: directoryLinksSuppressed,
      hasArchidektLinks: Boolean((archidektLinks || []).length),
    },
  };
}

const NON_COMMANDER_ARCHETYPE_RE = /\b(ponza|land denial|zoo|delver|phoenix|company hatebears)\b/i;
const SIXTY_CARD_ANCHOR_RE = /\b(Wild Nacatl|Bloodbraid Elf|Stone Rain|Collected Company)\b/i;

function isCommanderCredibleArchetype(item) {
  const text = [item?.name, item?.desc].filter(Boolean).join(" ");
  if (!text.trim()) {
    return false;
  }
  return !NON_COMMANDER_ARCHETYPE_RE.test(text) && !SIXTY_CARD_ANCHOR_RE.test(text);
}

function buildArchetypes(faction) {
  return uniqueObjectsBy(faction?.archetypes || [], (item) => normalizeDisplayName(item?.name || ""))
    .filter((item) => isCommanderCredibleArchetype(item))
    .map((item) => ({
      name: applyCardDisplayNames(item.name),
      desc: applyCardDisplayNames(item.desc || ""),
    }));
}

function buildManaAlignment(placementResult = {}) {
  return MANA_ORDER.map((color) => ({
    color,
    value: Number(placementResult?.mana_scores?.[color] || 1),
  }));
}

function adjacentFitsForResult({ result, factions, primaryFaction, placementModel, activeKey, isPrimary }) {
  return (result?.adjacent_matches || [])
    .filter((match) => isPrimary || match.faction !== activeKey)
    .map((match) => {
      const matchFaction = factions?.[match.faction];
      if (!matchFaction) {
        return null;
      }
      const modelFaction = placementModel?.factions?.[match.faction] || null;
      return {
        factionKey: match.faction,
        name: matchFaction.name,
        tagline: matchFaction.tagline,
        institutionType: matchFaction.institution_type,
        world: matchFaction.world,
        reason: explainAdjacentFit({
          match,
          matchFaction,
          primaryFaction,
          placementResult: result,
          modelFaction,
        }) || match.reason || matchFaction.tagline,
      };
    })
    .filter(Boolean);
}

function targetEvidenceTrail(evidenceTrail = [], targetFactionKey) {
  return (evidenceTrail || []).filter((entry) =>
    (entry?.deltas || []).some((delta) => delta.faction === targetFactionKey && Number(delta.delta) > 0)
  );
}

function fallbackAdjacentOmen(faction, guidance, reasonItStayedClose, index = 1) {
  const themes = (guidance?.ownedThemes || []).slice(0, 3).join(", ");
  return {
    title: `Adjacent Signal ${index}`,
    answerTitle: index === 1 ? "A neighboring Commander lens" : "Target identity translation",
    copy: index === 1
      ? (reasonItStayedClose ||
          `${faction.name} stayed near the reading because ${themes || "its Commander identity"} offered a neighboring way to build the same pressure.`)
      : `${faction.name} translates this lens through ${themes || "its Commander identity"}, so the deck path belongs to the adjacent target rather than the primary result.`,
  };
}

function buildDossierReadingOmens({ placementResult, factions, activeKey, faction, guidance, isPrimary, reasonItStayedClose }) {
  if (isPrimary) {
    return buildReadingOmens({
      evidenceTrail: placementResult.evidence_trail || [],
      factions,
      activeFactionKey: activeKey,
    });
  }

  const targetTrail = targetEvidenceTrail(placementResult.evidence_trail || [], activeKey);
  const omens = buildReadingOmens({
    evidenceTrail: targetTrail,
    factions,
    activeFactionKey: activeKey,
  });
  if (omens.length > 1) {
    return omens;
  }
  if (omens.length === 1) {
    return [...omens, fallbackAdjacentOmen(faction, guidance, reasonItStayedClose, 2)];
  }
  return [
    fallbackAdjacentOmen(faction, guidance, reasonItStayedClose, 1),
    fallbackAdjacentOmen(faction, guidance, reasonItStayedClose, 2),
  ];
}

function buildAdjacentReason({ adjacentReason, activeMatch, faction, primaryFaction, placementResult, placementModel, activeKey }) {
  if (adjacentReason) {
    return adjacentReason;
  }

  const explained = explainAdjacentFit({
    match: activeMatch || { faction: activeKey },
    matchFaction: faction,
    primaryFaction,
    placementResult,
    modelFaction: placementModel?.factions?.[activeKey] || null,
  });

  if (explained) {
    return explained;
  }

  const guidance = getCommanderFactionGuidance(faction);
  const targetThemes = (guidance?.ownedThemes || []).slice(0, 4).join(", ");
  return `${faction.name} stayed close to the same reading because it can translate those choices into ${targetThemes || "a neighboring Commander plan"}.`;
}

function summaryStripOverride(key) {
  return SUMMARY_STRIP_DISPLAY_OVERRIDES.get(String(key || "").toUpperCase()) || null;
}

function summaryStripFallback(key) {
  return SUMMARY_STRIP_FALLBACKS[String(key || "").toUpperCase()] || null;
}

function extractFirstSentence(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

function normalizeSummaryCompareText(value) {
  return (String(value || "").toLowerCase().match(SUMMARY_COMPARE_WORD_RE) || []).join(" ").trim();
}

function hasPlaceholderSummaryText(value) {
  return SUMMARY_PLACEHOLDER_RE.test(String(value || ""));
}

function hasUsableSummaryText(value) {
  const text = String(value || "").trim();
  return Boolean(text) && !hasPlaceholderSummaryText(text);
}

function isGenericContrastCopy(value) {
  const normalized = normalizeDisplayName(value);
  return normalized.includes(normalizeDisplayName("What does this path do with the same tension?")) &&
    normalized.includes(normalizeDisplayName("moves toward its own Commander expression"));
}

function summaryTextsOverlap(left, right) {
  const leftText = normalizeSummaryCompareText(left);
  const rightText = normalizeSummaryCompareText(right);
  if (!leftText || !rightText) {
    return false;
  }
  if (leftText === rightText || leftText.includes(rightText) || rightText.includes(leftText)) {
    return true;
  }

  const leftWords = new Set(leftText.split(" ").filter((word) => word.length >= 5));
  const rightWords = new Set(rightText.split(" ").filter((word) => word.length >= 5));
  if (!leftWords.size || !rightWords.size) {
    return false;
  }

  let shared = 0;
  leftWords.forEach((word) => {
    if (rightWords.has(word)) {
      shared += 1;
    }
  });
  return shared / Math.min(leftWords.size, rightWords.size) >= 0.6;
}

function factionColorList(faction) {
  if (Array.isArray(faction?.colors) && faction.colors.length) {
    return faction.colors.map((color) => String(color || "").toUpperCase()).filter(Boolean);
  }
  const identity = getColorIdentity(faction?.colors || faction?.key || "");
  return identity.split("").filter((color) => MANA_ORDER.includes(color));
}

function selectColorFallbackAdjacentKey({ activeKey, activeFaction, factions = {} }) {
  const colors = factionColorList(activeFaction);
  const candidates = Object.values(factions || {})
    .filter((entry) => entry?.key && entry.key !== activeKey)
    .map((entry) => {
      const candidateColors = factionColorList(entry);
      const sharedColors = candidateColors.filter((color) => colors.includes(color)).length;
      const countGap = Math.abs(candidateColors.length - colors.length);
      const sameInstitution = entry.institution_type === activeFaction?.institution_type ? 0.25 : 0;
      return {
        key: entry.key,
        sharedColors,
        countGap,
        sameInstitution,
      };
    })
    .filter((entry) => entry.sharedColors > 0)
    .sort((left, right) =>
      right.sharedColors - left.sharedColors ||
      left.countGap - right.countGap ||
      right.sameInstitution - left.sameInstitution ||
      String(left.key).localeCompare(String(right.key))
    );

  return candidates[0]?.key || "";
}

function safeSummaryPresentation(faction, presentForFaction) {
  if (typeof presentForFaction !== "function") {
    return null;
  }
  try {
    return presentForFaction(faction);
  } catch {
    return null;
  }
}

function buildWhereThisLeadsFallbackBody({ faction, guidance }) {
  const plan = compactSentence(guidance?.commanderPlan || "");
  if (plan) {
    return sentenceCase(cleanSentenceFragment(plan));
  }
  return `${faction?.name || "This identity"} usually points toward a Commander plan that makes its pressure visible early and repeatable over a full table.`;
}

function buildPlayPatternFallbackBody({ faction, guidance, tableCautionText }) {
  const caution = compactSentence(tableCautionText || guidance?.tableCautionText || "");
  if (caution) {
    return caution;
  }
  return `Opponents usually read ${faction?.name || "this identity"} through the pressure it keeps visible, so the pilot wants a clear engine and a plan for the table's first answer.`;
}

function buildTableExperienceSentence(factionName, tableExperience) {
  const fragment = cleanSentenceFragment(tableExperience);
  if (!fragment) {
    return "";
  }
  if (/^infrastructure first\b/i.test(fragment)) {
    return `In play, ${factionName} wants to build ${lowerInitial(fragment)}.`;
  }
  if (/^(a|an|the)\b/i.test(fragment)) {
    return `${factionName} feels like ${lowerInitial(fragment)}.`;
  }
  if (/^(turns|builds|keeps|takes|makes|listens|survives|endures|measures|learns|assembles|grows|feeds|forces|protects|treats|adapts|commits|chooses)\b/i.test(fragment)) {
    return `${factionName} ${fragment}.`;
  }
  return `In play, ${factionName} wants to ${lowerInitial(fragment)}.`;
}

function buildAdjacentFallbackCopy({ activeFaction, targetName, isPrimary, fallback }) {
  if (hasUsableSummaryText(fallback?.adjacentRelationshipCopy)) {
    return compactSentence(fallback.adjacentRelationshipCopy);
  }
  if (isPrimary) {
    return `${targetName} stayed nearby because the same reading can bend toward ${targetName}'s Commander texture without replacing ${activeFaction?.name || "the primary path"}.`;
  }
  return `${targetName} is the comparison point because this adjacent view should stay tied to the original reading instead of drifting into a disconnected result.`;
}

function cleanWhereThisLeadsBody({ text, faction, guidance, fallback }) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "";
  }

  const exactPrefixes = [
    `${faction?.name || ""} wants a Commander deck that `,
    `${guidance?.shortName || ""} wants a Commander deck that `,
    "This path wants a Commander deck that ",
  ].filter(Boolean);
  const prefix = exactPrefixes.find((candidate) => normalized.startsWith(candidate)) || "";
  const stripped = prefix ? normalized.slice(prefix.length).trim() : normalized;
  const sentence = sentenceCase(cleanSentenceFragment(extractFirstSentence(stripped)));

  if (
    !hasUsableSummaryText(sentence) ||
    sentence.length < 24 ||
    /^[,.;:!?-]/.test(sentence) ||
    /^(And|But|Or)\b/i.test(sentence)
  ) {
    return hasUsableSummaryText(fallback?.whereThisLeadsBody)
      ? compactSentence(fallback.whereThisLeadsBody)
      : "";
  }

  return compactSentence(sentence);
}

function summaryTags({ guidance, override }) {
  return unique([
    ...(override?.tags || []),
    ...((guidance?.starterSearchTags || []).length ? guidance.starterSearchTags : guidance?.preferredArchetypeTags || []),
  ]).filter(Boolean).slice(0, 3);
}

export function resolveSignalBand(score) {
  const numeric = typeof score === "number" ? score : Number(score);
  if (!Number.isFinite(numeric) || numeric < 0 || numeric > 1) {
    return {
      signalBand: "related",
      signalLabel: "Related adjacent signal",
    };
  }
  if (numeric >= 0.6) {
    return {
      signalBand: "strong",
      signalLabel: "Strong adjacent signal",
    };
  }
  if (numeric >= 0.3) {
    return {
      signalBand: "moderate",
      signalLabel: "Moderate adjacent signal",
    };
  }
  if (numeric > 0) {
    return {
      signalBand: "emerging",
      signalLabel: "Emerging adjacent signal",
    };
  }
  return {
    signalBand: "related",
    signalLabel: "Related adjacent signal",
  };
}

export function resolveSummaryAdjacentFit({
  factions = {},
  placementModel = null,
  placementResult = null,
  activeKey = "",
  primaryKey = "",
  activeFaction = null,
  primaryFaction = null,
  isPrimary = true,
  reasonItStayedClose = "",
  buildContrastCopy = null,
} = {}) {
  const activeFactionRecord = activeFaction?.record || activeFaction || factions?.[activeKey] || null;
  const primaryFactionRecord = primaryFaction?.record || primaryFaction || factions?.[primaryKey] || activeFactionRecord || null;
  const override = summaryStripOverride(activeKey);
  const fallback = summaryStripFallback(activeKey);
  const adjacentMatches = placementResult?.adjacent_matches || [];

  let targetMatch = null;
  if (isPrimary) {
    targetMatch = adjacentMatches.find((match) => match?.faction && match.faction !== activeKey) || null;
  } else if (primaryKey && primaryKey !== activeKey) {
    targetMatch = activeMatchForResult(placementResult, primaryKey);
  }

  if (!targetMatch) {
    targetMatch = adjacentMatches
      .filter((match) => match?.faction && match.faction !== activeKey)
      .sort((left, right) =>
        Number(left?.rank || Number.MAX_SAFE_INTEGER) - Number(right?.rank || Number.MAX_SAFE_INTEGER) ||
        Number(right?.confidence || 0) - Number(left?.confidence || 0) ||
        Number(right?.score || 0) - Number(left?.score || 0)
      )[0] || null;
  }

  let targetKey = String(targetMatch?.faction || "").toUpperCase();
  if (!targetKey || targetKey === activeKey) {
    targetKey = String(
      override?.adjacentTargetKey ||
      (primaryKey && primaryKey !== activeKey ? primaryKey : "") ||
      selectColorFallbackAdjacentKey({ activeKey, activeFaction: activeFactionRecord, factions })
    ).toUpperCase();
  }
  if (!targetKey || targetKey === activeKey) {
    targetKey = String(fallback?.adjacentTargetKey || "").toUpperCase();
  }

  const targetFaction = factions?.[targetKey] || null;
  const targetName = targetFaction?.name || targetMatch?.faction_name || override?.adjacentTargetName || targetKey || "Related path";
  const signal = resolveSignalBand(targetMatch?.confidence);
  const modelFaction = targetKey ? placementModel?.factions?.[targetKey] || null : null;
  const contrastCopy = typeof buildContrastCopy === "function" && primaryFactionRecord && activeFactionRecord
    ? (isPrimary
        ? buildContrastCopy(activeFactionRecord, targetFaction || targetMatch || { key: targetKey, name: targetName })
        : buildContrastCopy(primaryFactionRecord, activeFactionRecord))
    : "";
  const explainedCopy = targetKey && targetKey !== activeKey && targetFaction
    ? explainAdjacentFit({
        match: targetMatch || { faction: targetKey },
        matchFaction: targetFaction,
        primaryFaction: primaryFactionRecord || activeFactionRecord || targetFaction,
        placementResult,
        modelFaction,
      })
    : "";
  const relationshipCopy = [
    isGenericContrastCopy(contrastCopy) ? "" : contrastCopy,
    isPrimary ? explainedCopy : reasonItStayedClose,
    targetMatch?.reason,
    buildAdjacentFallbackCopy({
      activeFaction: activeFactionRecord,
      targetName,
      isPrimary,
      fallback,
    }),
  ].map(compactSentence).find(hasUsableSummaryText) || buildAdjacentFallbackCopy({
    activeFaction: activeFactionRecord,
    targetName,
    isPrimary,
    fallback,
  });

  return {
    label: SUMMARY_STRIP_LABELS.adjacentFit,
    heading: targetName,
    signalBand: signal.signalBand,
    signalLabel: signal.signalLabel,
    relationshipCopy,
    targetKey: targetKey || "RELATED",
    targetName,
  };
}

export function buildWhereThisLeadsSummary({
  faction = null,
  dossier = null,
  commanderLane = null,
  guidance = null,
} = {}) {
  const activeFaction = faction?.record || faction || dossier?.faction?.record || dossier?.faction || {};
  const key = String(activeFaction?.key || dossier?.targetFactionKey || "").toUpperCase();
  const override = summaryStripOverride(key);
  const fallback = summaryStripFallback(key);
  const heading = override?.whereThisLeadsHeading || `${guidance?.shortName || activeFaction?.name || "This path"} deck direction`;
  const bodySource = commanderLane?.copy || dossier?.commanderPath?.copy || "";
  const cleanedBody = cleanWhereThisLeadsBody({
    text: bodySource,
    faction: activeFaction,
    guidance,
    fallback,
  });
  const body = hasUsableSummaryText(cleanedBody)
    ? cleanedBody
    : (hasUsableSummaryText(fallback?.whereThisLeadsBody)
        ? compactSentence(fallback.whereThisLeadsBody)
        : buildWhereThisLeadsFallbackBody({ faction: activeFaction, guidance }));
  return {
    label: SUMMARY_STRIP_LABELS.whereThisLeads,
    heading,
    body,
    tags: summaryTags({ guidance, override }),
  };
}

export function buildPlayPatternSummary({
  faction = null,
  dossier = null,
  guidance = null,
  whereThisLeads = null,
  presentationForFaction = null,
} = {}) {
  const activeFaction = faction?.record || faction || dossier?.faction?.record || dossier?.faction || {};
  const key = String(activeFaction?.key || dossier?.targetFactionKey || "").toUpperCase();
  const override = summaryStripOverride(key);
  const fallback = summaryStripFallback(key);
  const presentation = safeSummaryPresentation(activeFaction, presentationForFaction);
  const tableCautionText = dossier?.commanderPath?.tableCautionText || guidance?.tableCautionText || "";
  const tableExperience = cleanSentenceFragment(presentation?.tableExperience || "");
  const opponentRead = String(presentation?.opponentRead || "").trim();
  const bodyCandidates = [
    tableExperience && normalizeDisplayName(tableExperience) !== normalizeDisplayName("a recognizable Commander table role")
      ? buildTableExperienceSentence(activeFaction?.name || "This identity", tableExperience)
      : "",
    opponentRead && normalizeDisplayName(opponentRead) !== normalizeDisplayName(SUMMARY_GENERIC_OPPONENT_READ)
      ? compactSentence(opponentRead)
      : "",
    compactSentence(tableCautionText),
  ].filter(hasUsableSummaryText);
  let body = compactSentence(bodyCandidates.slice(0, 2).join(" ").trim());

  if (!hasUsableSummaryText(body) || summaryTextsOverlap(whereThisLeads?.body, body)) {
    body = hasUsableSummaryText(fallback?.playPatternBody)
      ? compactSentence(fallback.playPatternBody)
      : buildPlayPatternFallbackBody({ faction: activeFaction, guidance, tableCautionText });
  }

  if (summaryTextsOverlap(whereThisLeads?.body, body)) {
    body = buildPlayPatternFallbackBody({ faction: activeFaction, guidance, tableCautionText });
  }

  return {
    label: SUMMARY_STRIP_LABELS.playPattern,
    heading: override?.playPatternHeading || `${guidance?.shortName || activeFaction?.name || "This path"} at the table`,
    body,
  };
}

export function buildResultSummaryStrip({
  factions = {},
  placementModel = null,
  placementResult = null,
  dossier = null,
  activeKey = "",
  primaryKey = "",
  presentationForFaction = null,
  buildContrastCopy = null,
} = {}) {
  const activeFaction = dossier?.faction?.record || dossier?.faction || factions?.[activeKey] || null;
  const primaryFaction = dossier?.primaryFaction?.record || factions?.[primaryKey] || activeFaction || null;
  const guidance = dossier?.commanderPath?.guidance || getCommanderFactionGuidance(activeFaction) || getCommanderFactionGuidance(primaryFaction) || null;
  const adjacentFit = resolveSummaryAdjacentFit({
    factions,
    placementModel,
    placementResult,
    activeKey,
    primaryKey,
    activeFaction,
    primaryFaction,
    isPrimary: dossier?.isPrimary !== false,
    reasonItStayedClose: dossier?.reasonItStayedClose || "",
    buildContrastCopy,
  });
  const whereThisLeads = buildWhereThisLeadsSummary({
    faction: activeFaction,
    dossier,
    commanderLane: dossier?.commanderLane,
    guidance,
  });
  const playPattern = buildPlayPatternSummary({
    faction: activeFaction,
    dossier,
    guidance,
    whereThisLeads,
    presentationForFaction,
  });

  return {
    adjacentFit,
    whereThisLeads,
    playPattern,
  };
}

function withoutLeadingArticle(value) {
  return String(value || "").replace(/^\s*(the|a|an)\s+/i, "").trim();
}

export function buildCommanderDossier({
  factions = {},
  placementModel = null,
  deckTagCatalog = null,
  placementResult,
  targetFactionKey = "",
  starterProfile,
  adjacentReason = "",
  summaryPresentationForFaction = null,
  summaryContrastCopyBuilder = null,
} = {}) {
  if (!placementResult) {
    throw new Error("buildCommanderDossier requires a placementResult.");
  }

  const primaryKey = placementResult.faction;
  const activeKey = targetFactionKey || primaryKey;
  const faction = factions[activeKey];
  const primaryFaction = factions[primaryKey] || faction;

  if (!faction) {
    throw new Error(`Cannot build Commander dossier for missing faction ${activeKey}.`);
  }

  const isPrimary = activeKey === primaryKey;
  const activeMatch = activeMatchForResult(placementResult, activeKey);
  const modelFaction = placementModel?.factions?.[activeKey] || null;
  const normalizedStarterProfile = starterProfile || placementResult.starter_profile || {};
  const archidektSearchLinks = deckTagCatalog
    ? buildArchidektSearchLinks({
        catalog: deckTagCatalog,
        faction,
        placementResult,
        starterProfile: normalizedStarterProfile,
        modelFaction,
      })
    : [];
  const archidektTagLanes = archidektSearchLinks.filter((link) => link.kind === "archidekt-tag");
  const commanderLane = buildCommanderStartingLane({
    faction,
    placementResult,
    starterProfile: normalizedStarterProfile,
    modelFaction,
    tagLanes: archidektTagLanes,
  });
  const packageLinks = buildCommanderPackageLinks(faction);
  const commanderStartLinks = buildCommanderDirectoryLinks(faction);
  const starterCards = buildStarterCards(faction);
  const auditContract = buildDossierAuditSectionContract({
    faction,
    starterCards,
    commanderStartLinks,
    archidektLinks: packageLinks.archidekt,
  });
  const commanderRecommendations = uniqueObjectsBy(
    collectCommanderPreviewCandidates(faction, { limit: 3 }),
    (candidate) => normalizeDisplayName(candidate?.name || "")
  );
  const commanderRecommendationSource = commanderCandidateSourceSummary(commanderRecommendations);
  const guidance = getCommanderFactionGuidance(faction);
  const deckFooting = commanderLaneDetail(commanderLane.details, /^Deck footing$/i);
  const spellcraft = commanderLaneDetail(commanderLane.details, /spellcraft|gameplay/i);
  const tableCautionText = commanderLaneDetail(commanderLane.details, /^Table caution$/i) || guidance?.tableCautionText || "";
  const resultStatus = isPrimary
    ? `This is your primary ${getExpressionKindLabelLower(faction)} fit.`
    : "You are viewing an adjacent fit built from the same reading.";
  const reasonItStayedClose = isPrimary
    ? ""
    : buildAdjacentReason({
        adjacentReason,
        activeMatch,
        faction,
        primaryFaction,
        placementResult,
        placementModel,
        activeKey,
      });
  const decreeCopy = isPrimary
    ? placementResult.decree
    : reasonItStayedClose;
  const readingOmens = buildDossierReadingOmens({
    placementResult,
    factions,
    activeKey,
    faction,
    guidance,
    isPrimary,
    reasonItStayedClose,
  });

  const baseDossier = {
    version: "commander-dossier-v1",
    sourceModelVersion: placementResult.model_version || "",
    mode: isPrimary ? "primary" : "adjacent",
    isPrimary,
    primaryFactionKey: primaryKey,
    targetFactionKey: activeKey,
    adjacentLabel: isPrimary ? "" : `Adjacent ${getExpressionKindLabel(faction)} Fit`,
    faction: {
      key: activeKey,
      name: faction.name,
      tagline: faction.tagline,
      institutionType: faction.institution_type,
      world: faction.world,
      colors: faction.colors || [],
      colorIdentity: getColorIdentity(faction.colors || faction.key || ""),
      accent: faction.accent || "",
      banner: faction.banner || "",
      philosophy: faction.philosophy || "",
      identity: normalizeLayeredIdentity(
        activeMatch?.identity || placementResult?.identity || faction.identity || {},
        {
          key: activeKey,
          name: faction.name,
          institution_type: faction.institution_type,
          colors: faction.colors || [],
          expression_kind: faction.identity?.expression_kind || faction.institution_type,
        }
      ),
      record: faction,
    },
    primaryFaction: primaryFaction
      ? {
          key: primaryKey,
          name: primaryFaction.name,
          tagline: primaryFaction.tagline,
          institutionType: primaryFaction.institution_type,
          world: primaryFaction.world,
          identity: normalizeLayeredIdentity(
            primaryFaction.identity || placementResult?.identity || {},
            {
              key: primaryKey,
              name: primaryFaction.name,
              institution_type: primaryFaction.institution_type,
            }
          ),
        }
      : null,
    resultStatus,
    decreeCopy,
    reasonItStayedClose,
    manaAlignment: buildManaAlignment(placementResult),
    readingOmens,
    commanderLane,
    commanderPath: {
      title: commanderLane.title,
      copy: commanderLane.copy,
      deckFooting,
      spellcraft,
      tableCautionText,
      tableCautionReviewRule: guidance?.tableCautionReviewRule || "",
      guidance,
    },
    archetypes: buildArchetypes(faction),
    starterCards,
    landRecommendations: buildCommanderLandRecommendations(faction),
    commanderRecommendations,
    commanderRecommendationSource,
    auditContract,
    links: {
      commanderStart: commanderStartLinks,
      archidekt: archidektSearchLinks,
      maze: packageLinks.maze,
      scryfall: packageLinks.scryfall,
    },
    adjacentFits: adjacentFitsForResult({
      result: placementResult,
      factions,
      primaryFaction: primaryFaction || faction,
      placementModel,
      activeKey,
      isPrimary,
    }),
  };

  return {
    ...baseDossier,
    resultSummaryStrip: buildResultSummaryStrip({
      factions,
      placementModel,
      placementResult,
      dossier: baseDossier,
      activeKey,
      primaryKey,
      presentationForFaction: summaryPresentationForFaction,
      buildContrastCopy: summaryContrastCopyBuilder,
    }),
  };
}

function preconIdentityKey(value) {
  if (Array.isArray(value)) {
    const codes = unique(
      value
        .map((color) => {
          const text = normalizeDisplayName(color);
          if (!text) return "";
          if (text.length === 1 && PRECON_CODE_TO_COLOR.has(text.toUpperCase())) {
            return text.toUpperCase();
          }
          return PRECON_COLOR_TO_CODE.get(text) || "";
        })
        .filter(Boolean)
    );

    if (codes.includes("C") && codes.length > 1) {
      return "";
    }

    return ["W", "U", "B", "R", "G", "C"].filter((code) => codes.includes(code)).join("");
  }

  const text = String(value || "").toUpperCase().trim();
  if (!text) return "";
  if (text === "COLORLESS") return "C";
  return ["W", "U", "B", "R", "G", "C"].filter((code) => text.includes(code)).join("");
}

function activePreconIdentityKey(faction, dossier) {
  const explicit = [
    faction?.routing?.color_identity,
    faction?.identity?.routing?.color_identity,
    faction?.display_code,
    faction?.colorIdentity,
    dossier?.faction?.colorIdentity,
  ].map(preconIdentityKey).find(Boolean);
  if (explicit) {
    return explicit;
  }

  const key = activePreconFactionKey(faction, dossier);
  if (key === "COLORLESS") {
    return "C";
  }

  return preconIdentityKey(faction?.colors || dossier?.faction?.colors || "");
}

function identitySet(identityKey) {
  return new Set(String(identityKey || "").split("").filter(Boolean));
}

function isExactPreconMatch(activeIdentity, candidateIdentity) {
  return Boolean(activeIdentity && activeIdentity === candidateIdentity);
}

function isStretchPreconMatch(activeIdentity, candidateIdentity) {
  if (!activeIdentity || !candidateIdentity || activeIdentity === "C" || activeIdentity.length >= 5) {
    return false;
  }
  const active = identitySet(activeIdentity);
  const candidate = identitySet(candidateIdentity);
  if (!active.size || candidate.size !== active.size + 1) {
    return false;
  }
  if (candidate.has("C")) {
    return false;
  }
  return [...active].every((color) => candidate.has(color));
}

function extraStretchColors(activeIdentity, candidateIdentity) {
  const active = identitySet(activeIdentity);
  return [...identitySet(candidateIdentity)]
    .filter((color) => !active.has(color))
    .map((color) => PRECON_CODE_TO_COLOR.get(color) || color);
}

function preconThemeMap(taxonomy = null) {
  const themes = Array.isArray(taxonomy?.themes) ? taxonomy.themes : [];
  return new Map(
    themes.map((theme) => [
      normalizeDisplayName(theme?.key || ""),
      {
        key: String(theme?.key || ""),
        displayName: String(theme?.display_name || ""),
        aliases: (theme?.aliases || []).map((entry) => normalizeDisplayName(entry)).filter(Boolean),
        matchTerms: (theme?.match_terms || []).map((entry) => normalizeDisplayName(entry)).filter(Boolean),
        readingTags: (theme?.reading_tags || []).map((entry) => normalizeDisplayName(entry)).filter(Boolean),
        tablePerception: String(theme?.table_perception || "").trim(),
      },
    ])
  );
}

function collectSignalPhrases(dossier, readingTagRefs = []) {
  return unique([
    dossier?.commanderLane?.title,
    dossier?.commanderLane?.copy,
    dossier?.commanderPath?.copy,
    dossier?.commanderPath?.deckFooting,
    dossier?.commanderPath?.spellcraft,
    dossier?.commanderPath?.tableCautionText,
    ...(dossier?.archetypes || []).flatMap((item) => [item?.name, item?.desc]),
    ...readingTagRefs.map((ref) => ref?.tag),
  ].map((entry) => normalizeDisplayName(entry)).filter(Boolean));
}

function collectSignalWords(phrases = []) {
  return unique(
    (phrases || [])
      .flatMap((phrase) => String(phrase || "").split(/\s+/))
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 2)
  );
}

function experienceFitScore(scores = {}, starterProfile = {}) {
  const level = normalizeDisplayName(starterProfile?.experience_level || "returning");
  const targets = {
    beginner: { beginnerFriendly: 5, complexity: 2 },
    returning: { beginnerFriendly: 3, complexity: 3 },
    experienced: { beginnerFriendly: 2, complexity: 4 },
    advanced: { beginnerFriendly: 2, complexity: 4 },
  };
  const target = targets[level] || targets.returning;
  return Math.max(
    0,
    12 -
      (Math.abs(Number(scores.beginnerFriendly || 0) - target.beginnerFriendly) * 2) -
      (Math.abs(Number(scores.complexity || 0) - target.complexity) * 2)
  );
}

function preconThemeSignals(precon, themeLookup, signalTags, signalPhrases) {
  const matchedThemes = [];
  let score = 0;

  [precon?.normalizedThemes?.primary, precon?.normalizedThemes?.secondary].filter(Boolean).forEach((theme, index) => {
    const meta = themeLookup.get(normalizeDisplayName(theme?.key || ""));
    const readingTags = new Set(meta?.readingTags || []);
    const themeTerms = unique([
      normalizeDisplayName(theme?.displayName || ""),
      normalizeDisplayName(theme?.sourceText || ""),
      ...(meta?.aliases || []),
      ...(meta?.matchTerms || []),
    ]).filter(Boolean);
    const tagMatches = [...readingTags].filter((tag) => signalTags.has(tag));
    const phraseMatches = themeTerms.filter((term) => signalPhrases.includes(term));

    if (tagMatches.length || phraseMatches.length) {
      score += (index === 0 ? 20 : 10) + (tagMatches.length * 6) + (phraseMatches.length * 3);
      matchedThemes.push(theme.displayName);
    }
  });

  return {
    score,
    matchedThemes: unique(matchedThemes),
  };
}

const JUND_PRECON_FIT_SUMMARIES = new Map([
  [
    "world shaper",
    "Exact Jund color fit with lands, graveyard value, and resource-conversion lines. This is the feed the engine, rebuild from what was spent version of Jund.",
  ],
  [
    "power hungry",
    "Exact Jund color fit with token creation, sacrifice, and death-trigger pressure. This is the clearest appetite/consequence precon: bodies become resources, resources become pressure.",
  ],
  [
    "blight curse",
    "Exact Jund color fit with -1/-1 counters, sacrifice, and attrition play. This is Jund as careful pressure: weaken the board, manage the cost, and turn decay into leverage.",
  ],
  [
    "graveyard overdrive",
    "Exact Jund color fit with graveyard value, self-mill, discard, and combat pressure. This is Jund as survival-after-impact: what dies, gets discarded, or gets milled can still come back as force.",
  ],
]);

const BANT_PRECON_FIT_SUMMARIES = new Map([
  [
    "counter blitz",
    "Bant support fit with counter movement, proliferate, and combat value: refine the board's growth so one supported line can carry pressure cleanly.",
  ],
  [
    "peace offering",
    "Bant support fit with group-hug politics and counters: share resources carefully, then turn public trust and planning into the advantage that matters.",
  ],
  [
    "deep clue sea",
    "Bant support fit with Clues, card draw, and token value: structure the investigation, turn knowledge into resources, and keep the engine inside a living board.",
  ],
  [
    "adaptive enchantment",
    "Bant support fit with enchantress, auras, ramp, and card flow: make the support network visible without turning the enchantment shell into prison-first control.",
  ],
  [
    "evasive maneuvers",
    "Bant support fit with evasive creatures and tap-untap tempo: use disciplined combat and timing as pressure, not hard-lock table denial.",
  ],
  [
    "aura of courage",
    "Bant support fit with Auras, Equipment, and protected-threat play: elevate one creature through refined support while avoiding generic voltron shorthand.",
  ],
  [
    "blast from the past",
    "Bant support fit with historic spells, artifacts, Sagas, and companion texture: treat the product as deck support, not Alaran Bant canon.",
  ],
  [
    "bedecked brokers",
    "Bant support fit with counter diversity, shield counters, and protected voltron texture: make many kinds of support gather around the champion.",
  ],
]);

const NAYA_PRECON_FIT_SUMMARIES = new Map([
  [
    "limit break",
    "Naya support fit with equipment and power-threshold combat texture: build one protected threat, then let creature-forward scale make the turn matter.",
  ],
  [
    "desert bloom",
    "Naya support fit with lands, graveyard-land texture, and resilient rebuilding: grow mana, use the land base as a living resource, and protect the board that follows.",
  ],
  [
    "scrappy survivors",
    "Naya support fit with Auras and Equipment as protective board texture: make the bond visible on creatures without treating the product as Naya canon.",
  ],
  [
    "deadly disguise",
    "Naya support fit with face-down creature play and timing texture: keep the board creature-forward while the table learns which body matters.",
  ],
  [
    "primal genesis",
    "Naya support fit with populate and token texture: turn one living board into many bodies while keeping abundance tied to the whole.",
  ],
  [
    "nature of the beast",
    "Naya support fit with Marath, Beasts, and counters: use flexible creature-forward scale so growth can become pressure, protection, or a wider board.",
  ],
  [
    "land s wrath",
    "Naya support fit with landfall and animated-land pressure: grow mana first, then let the land itself join the protected board.",
  ],
  [
    "veloci ramp tor",
    "Naya support fit with Dinosaur ramp and creature-forward scale: make abundance huge without flattening Naya into generic big-creature-only play.",
  ],
  [
    "call for backup",
    "Naya support fit with counters and Backup texture: spread growth across the board so protection, instinct, and scale move together.",
  ],
  [
    "cabaretti cacophony",
    "Same-color support/style comparator only: go-wide and goad texture can overlap Naya deckbuilding, but Cabaretti is not Naya canon, not Alara canon, and not a Naya lore source.",
  ],
]);

const ABZAN_PRECON_FIT_SUMMARIES = new Map([
  [
    "abzan armor",
    "Abzan support fit with counters and defensive board texture: make endurance visible through protected growth while keeping the house identity source-bound.",
  ],
  [
    "counterpunch",
    "Abzan support fit with counters and board resilience: turn survival into a long-game shield without treating the product as Tarkir canon.",
  ],
  [
    "symbiotic swarm",
    "Abzan support fit with sacrifice, bodies, and recursion: let resources carry family-duty texture while avoiding generic graveyard value.",
  ],
  [
    "enduring enchantments",
    "Abzan support fit with graveyard enchantments and resilient permanents: make continuity feel perennial without adding new lore claims.",
  ],
  [
    "food and fellowship",
    "Abzan support fit with Food, life gain, and protective bodies: use care and endurance as table texture, not as setting proof.",
  ],
  [
    "corrupting influence",
    "Abzan support fit with poison, corrupted, and proliferate: treat the counters as survival pressure only, not as an Abzan canon claim.",
  ],
]);

const TEMUR_PRECON_FIT_SUMMARIES = new Map([
  [
    "temur roar",
    "Temur Commander fit with dragons and forceful scale: make strength visible while keeping the table story anchored in attunement, not raw size.",
  ],
  [
    "living energy",
    "Temur Commander fit with energy and adaptive resource texture: turn stored force into timing while keeping the table story centered on listening for the right signal.",
  ],
  [
    "mirror mastery",
    "Temur Commander fit with copying spells and creatures: let the right signal echo into pressure while keeping attunement ahead of spectacle.",
  ],
  [
    "arcane maelstrom",
    "Temur Commander fit with instants, big spells, and reactive timing: wait for the opening, then let the storm of choices carry the turn.",
  ],
  [
    "paradox power",
    "Temur Commander fit with non-hand casting and spell momentum: make possibility feel wild and forceful while the clan identity stays survival through attunement.",
  ],
  [
    "tinker time",
    "Temur Commander fit with artifacts and tokens as adaptive table texture: build the tool, then let timing and force decide the swing.",
  ],
  [
    "tyranid swarm",
    "Temur Commander fit with ravenous, counters, and X-spell scale: let huge growth read as earned pressure, not the whole identity.",
  ],
]);

const SULTAI_PRECON_FIT_SUMMARIES = new Map([
  [
    "sultai arisen",
    "Sultai Commander fit with graveyard value and recursion: make the dead useful as table texture while keeping Sultai Brood identity source-bound.",
  ],
  [
    "grand larceny",
    "Sultai Commander fit with theft and exile-casting: turn stolen resources into leverage without treating the product as Tarkir canon.",
  ],
  [
    "mutant menace",
    "Sultai Commander fit with mill, rad counters, and creature mutation texture: use transformation and graveyards as support-only play language.",
  ],
  [
    "faceless menace",
    "Sultai Commander fit with morph and hidden information: make secrecy visible at the table without converting morph into a Sultai lore claim.",
  ],
  [
    "devour for power",
    "Sultai Commander fit with graveyard construction and recursion: let the graveyard become leverage while keeping the pressure distinctly Sultai.",
  ],
  [
    "enhanced evolution",
    "Sultai Commander fit with mutate and creature-value engines: treat adaptation as support texture, not as proof of Tarkir Sultai canon.",
  ],
]);

const ESPER_PRECON_FIT_SUMMARIES = new Map([
  [
    "scions spellcraft",
    "Esper color fit with control, card draw, protection, and removal: keep the table's options narrow while each answer becomes another piece of advantage.",
  ],
  [
    "eternal might",
    "Esper color fit with Zombies, looting, and graveyard value: use card selection to choose what matters, then turn the graveyard into a planned resource.",
  ],
  [
    "miracle worker",
    "Esper color fit with enchantments, miracles, and library setup: arrange the top of the deck so the decisive answer arrives at the cleanest moment.",
  ],
  [
    "subjective reality",
    "Esper color fit with top-of-library setup, blink value, and miracle timing: make the next draw feel designed before the table sees it.",
  ],
  [
    "eternal bargain",
    "Esper color fit with lifegain, card draw, and artifact value: convert time and life totals into a slow engine of controlled inevitability.",
  ],
  [
    "dungeons of death",
    "Esper color fit with dungeon progression, graveyard value, and reanimation: make each step through the plan unlock the next resource.",
  ],
  [
    "cavalry charge",
    "Esper color fit with Knights, tactical combat, and command-zone pressure: turn order, planning, and ambition into a disciplined attack.",
  ],
  [
    "urza s iron alliance",
    "Esper color fit with artifact creatures, tokens, and artifact-count pressure: build the machine carefully, then make every piece contribute to the clock.",
  ],
  [
    "forces of the imperium",
    "Esper color fit with tokens, Squad, and card draw from bodies entering: make formation and information advantage reinforce the same board.",
  ],
  [
    "obscura operation",
    "Esper color fit with evasive attackers, connive, and card selection: make one precise threat connect while each hit improves the next decision.",
  ],
]);

const GRIXIS_PRECON_FIT_SUMMARIES = new Map([
  [
    "arcane wizardry",
    "Exact Grixis color fit with Wizard tribal, ETB copying, and creature-based control. Product-support only: sequencing and value illustrate survival-control gameplay, not Grixis canon lore.",
  ],
  [
    "mind seize",
    "Exact Grixis color fit with Jeleva, exile-casting, and high-cost instant/sorcery pressure. Product-support only: opponents' spells become gameplay leverage, not a new lore claim.",
  ],
  [
    "ahoy mateys",
    "Exact Grixis color fit with Pirate tribal, graveyard setup, and tapped-and-attacking reanimation. Product-support only: the graveyard is a deck resource here, not Grixis source doctrine.",
  ],
  [
    "masters of evil",
    "Exact Grixis color fit with artifacts and forced-choice control. Product-support only: villain branding stays product context, not the definition of Grixis.",
  ],
  [
    "the hosts of mordor",
    "Exact Grixis color fit with control, attrition, and graveyard backup. Product-support only: crossover story material is not Alaran Grixis canon.",
  ],
  [
    "mishra s burnished banner",
    "Exact Grixis color fit with artifact copy/sacrifice and combat conversion. Product-support only: artifact sacrifice is deck texture, not the whole identity.",
  ],
  [
    "the ruinous powers",
    "Exact Grixis color fit with cascade, life-loss setup, and Demon-tribal backup. Product-support only: demons and cascade do not define Grixis canon.",
  ],
  [
    "maestros massacre",
    "Exact Grixis color fit with casualty and spell copying. Product-support only: New Capenna Maestros is same-color comparator material, not Alaran Grixis evidence.",
  ],
]);

const GLINT_PRECON_FIT_SUMMARIES = new Map([
  [
    "entropic uprising",
    "Exact Glint color fit with combat-damage spell momentum, cascade pressure, and Yidris-led volatility. Product-support only: this deck shows one storm-fed Commander texture for Glint, not a universal definition.",
  ],
  [
    "draconic domination",
    "Stretch option that explores dragon-led pressure through a neighboring five-color lane. It can rhyme with Glint's appetite and volatility, but adding White makes it broader than Glint.",
  ],
  [
    "painbow",
    "Stretch option that explores domain-style overflow through a neighboring five-color lane. It can echo Glint's pressure, but adding White makes it a broader five-color frame rather than preserved Glint.",
  ],
]);

const GLINT_PRECON_RECOMMENDED_FOR_OVERRIDES = new Map([
  [
    "entropic uprising",
    "Players who want storm-fed sequencing, combat-damage spell momentum, and a volatile four-color deck that still feels intentional.",
  ],
]);

function buildPreconRecommendedForOverride({ precon, activeFactionKey = "" }) {
  const factionKey = String(activeFactionKey || "").toUpperCase();
  if (factionKey === "GLINT") {
    return GLINT_PRECON_RECOMMENDED_FOR_OVERRIDES.get(normalizeDisplayName(precon?.deckName || "")) || "";
  }
  if (factionKey === "COLORLESS" && normalizeDisplayName(precon?.deckName || "") === "eldrazi unbound") {
    return "Players who want strict Colorless constraint, Wastes and true {C} discipline, artifact engines, and Eldrazi-scale finishers without five-color Eldrazi bleed.";
  }
  return "";
}

function buildPreconFitSummary({ precon, lane, factionName, matchedThemes, stretchColors, activeFactionKey = "" }) {
  const themeList = matchedThemes.length
    ? matchedThemes
    : [precon?.normalizedThemes?.primary?.displayName || precon?.rawPrimaryTheme || "theme-forward"];
  const themeText = themeList.join(" and ").toLowerCase();
  const factionKey = String(activeFactionKey || "").toUpperCase();
  if (factionKey === "GLINT") {
    const glintOverride = GLINT_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || ""));
    if (glintOverride) {
      return glintOverride;
    }
    if (lane === "stretch") {
      const stretchText = stretchColors.length ? stretchColors.join(" and ") : "an extra color";
      return `Stretch option that explores ${themeText} through a neighboring lane. It can rhyme with Glint's pressure, but adding ${stretchText} makes it broader than Glint itself.`;
    }
    return `Exact Glint color fit with ${themeText} lines that reinforce storm-fed pressure and adaptive appetite as product-support Commander texture.`;
  }
  if (factionKey === "COLORLESS") {
    if (normalizeDisplayName(precon?.deckName || "") === "eldrazi unbound") {
      return "Strict Colorless support fit: Eldrazi Unbound offers Zhulodok, Void Gorger as a colorless Commander starting point while keeping Eldrazi Incursion and Ulalek in five-color comparator territory.";
    }
    return `Strict Colorless support fit with ${themeText} lines that must preserve true {C}, Wastes, artifacts, Eldrazi, and five-color Eldrazi as separate checks.`;
  }
  if (lane === "stretch") {
    const stretchText = stretchColors.length ? stretchColors.join(" and ") : "an extra color";
    return `Stretch option that keeps ${factionName}'s core identity intact while adding ${stretchText} for ${themeText} lines.`;
  }
  if (factionKey === "BANT") {
    return BANT_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Bant support fit with ${themeText} lines that reinforce public trust, refined protection, living order, and a worthy supported line of action.`;
  }
  if (factionKey === "ESPER") {
    return ESPER_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Esper color fit with ${themeText} lines that reinforce planning, information advantage, structured optimization, and controlled change.`;
  }
  if (factionKey === "GRIXIS") {
    return GRIXIS_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Exact Grixis color fit with ${themeText} lines that reinforce survival, calculation, and urgent leverage as product-support gameplay.`;
  }
  if (factionKey === "JUND") {
    return JUND_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Exact Jund color fit with ${themeText} lines that reinforce Jund's appetite/consequence plan.`;
  }
  if (factionKey === "NAYA") {
    return NAYA_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Naya support fit with ${themeText} lines that reinforce abundance, protected board growth, creature-forward scale, and instinctive care.`;
  }
  if (factionKey === "ABZAN") {
    return ABZAN_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Abzan support fit with ${themeText} lines that reinforce family endurance, ancestor obligation, perennation, defensive patience, and house continuity.`;
  }
  if (factionKey === "TEMUR") {
    return TEMUR_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Temur Commander fit with ${themeText} lines that reinforce survival, instinct, mental fortitude, shamanic listening, elemental memory, and earned strength.`;
  }
  if (factionKey === "SULTAI") {
    return SULTAI_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Sultai support fit with ${themeText} lines that reinforce ruthless opportunity, graveyard/resource conversion, necromantic utility, and calculated advantage as support-only table texture.`;
  }
  if (factionKey === "MARDU") {
    return `Mardu support fit with ${themeText} lines that reinforce speed, martial order, coordinated attack, sacrifice pressure, and ruthless openings as Commander table texture.`;
  }
  if (factionKey === "JESKAI") {
    return `Jeskai support fit with ${themeText} lines that reinforce disciplined timing, trained insight, protective interaction, and precise action as Commander table texture.`;
  }
  return `Exact ${precon.colorIdentityKey} match with ${themeText} lines that reinforce ${factionName}'s Commander plan.`;
}

function activePreconFactionKey(faction, dossier) {
  return String(
    faction?.key ||
    dossier?.faction?.key ||
    dossier?.targetFactionKey ||
    ""
  ).trim().toUpperCase();
}

function preconFactionShortName(faction, dossier, activeIdentity) {
  const guidance = getCommanderFactionGuidance(faction || dossier?.faction || {});
  if (guidance?.shortName) {
    return guidance.shortName;
  }

  const name = String(faction?.name || dossier?.faction?.name || "").trim();
  if (name) {
    return name
      .replace(/\s+(College|Senate|Syndicate|Conclave|Combine|Swarm|Legion|League|Clans)$/i, "")
      .trim();
  }

  return activeIdentity || "Faction";
}

export const PRECON_PREVIEW_LIMIT = 4;

const PRECON_PREVIEW_GROUP_ORDER = ["nativeExact", "otherExact", "stretch"];

export function selectPreconPreviewRecommendations(preconRecommendations = {}, limit = PRECON_PREVIEW_LIMIT) {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : PRECON_PREVIEW_LIMIT;
  const ordered = PRECON_PREVIEW_GROUP_ORDER.flatMap((group) => {
    const items = Array.isArray(preconRecommendations?.[group]) ? preconRecommendations[group] : [];
    return items.map((precon) => ({
      ...precon,
      previewGroup: group,
    }));
  });
  const totalCount = ordered.length;
  const visible = ordered.slice(0, safeLimit);
  const remaining = ordered.slice(safeLimit);

  return {
    visible,
    remaining,
    totalCount,
    limit: safeLimit,
    hasOverflow: totalCount > safeLimit,
  };
}

export function buildCommanderDeckStartFallbackCandidates(preconRecommendations = {}, limit = 2) {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 2;
  const exactPrecons = ["nativeExact", "otherExact"].flatMap((group) =>
    Array.isArray(preconRecommendations?.[group]) ? preconRecommendations[group] : []
  );
  const seen = new Set();
  const candidates = [];

  exactPrecons.forEach((precon) => {
    if (candidates.length >= safeLimit) return;
    const name = cardDisplayName(precon?.mainCommander || precon?.commanderSearchQuery || "");
    const key = normalizeTagText(name);
    if (!name || !key || seen.has(key)) return;
    seen.add(key);
    candidates.push({
      name,
      desc: `${precon?.deckName || "This exact-color precon"} offers ${name} as a commander-first starting point for this dossier.`,
      source: "precon-exact-fallback",
      preconDeckName: precon?.deckName || "",
    });
  });

  return candidates;
}

export function buildPreconRecommendations({
  faction,
  dossier,
  readingTagRefs = [],
  starterProfile = {},
  preconCatalog = null,
  preconThemeTaxonomy = null,
} = {}) {
  const precons = Array.isArray(preconCatalog?.precons) ? preconCatalog.precons : [];
  const activeFactionKey = activePreconFactionKey(faction, dossier);
  const activeIdentity = activePreconIdentityKey(faction, dossier);
  if (!precons.length || !activeIdentity) {
    return { nativeExact: [], otherExact: [], stretch: [], hasAny: false };
  }

  const signalPhrases = collectSignalPhrases(dossier, readingTagRefs);
  const signalWords = new Set(collectSignalWords(signalPhrases));
  const signalTags = new Set(readingTagRefs.map((ref) => normalizeDisplayName(ref?.tag || "")).filter(Boolean));
  const themeLookup = preconThemeMap(preconThemeTaxonomy);
  const groupOrder = { nativeExact: 0, otherExact: 1, stretch: 2 };

  const ranked = precons
    .map((precon) => {
      const candidateIdentity = preconIdentityKey(precon?.colors || precon?.colorIdentityKey || "");
      const lane = isExactPreconMatch(activeIdentity, candidateIdentity)
        ? "exact"
        : (isStretchPreconMatch(activeIdentity, candidateIdentity) ? "stretch" : "");
      if (!lane) {
        return null;
      }

      const themeSignals = preconThemeSignals(precon, themeLookup, signalTags, signalPhrases);
      const phraseMatches = (precon?.matchTerms || []).filter((term) => signalPhrases.includes(normalizeDisplayName(term)));
      const wordMatches = (precon?.matchWords || []).filter((word) => signalWords.has(normalizeDisplayName(word)));
      const experienceScore = experienceFitScore(precon?.scores || {}, starterProfile);
      const score =
        themeSignals.score +
        Math.min(12, phraseMatches.length * 3) +
        Math.min(8, wordMatches.length) +
        experienceScore;
      const stretchColors = lane === "stretch" ? extraStretchColors(activeIdentity, candidateIdentity) : [];
      const primaryTheme = precon?.normalizedThemes?.primary || null;
      const primaryThemeMeta = primaryTheme
        ? themeLookup.get(normalizeDisplayName(primaryTheme.key || ""))
        : null;
      const colorlessNativeExact = lane === "exact" &&
        activeFactionKey === "COLORLESS" &&
        candidateIdentity === "C" &&
        normalizeDisplayName(precon?.deckName || "") === "eldrazi unbound";
      const nativeExact = colorlessNativeExact || (lane === "exact" &&
        activeFactionKey &&
        Array.isArray(precon?.factionRefs) &&
        precon.factionRefs.includes(activeFactionKey));
      const group = lane === "stretch" ? "stretch" : (nativeExact ? "nativeExact" : "otherExact");

      return {
        ...precon,
        lane,
        group,
        score,
        fitSummary: buildPreconFitSummary({
          precon,
          lane,
          factionName: faction?.name || dossier?.faction?.name || "this reading",
          matchedThemes: themeSignals.matchedThemes,
          stretchColors,
          activeFactionKey,
        }),
        recommendedForOverride: buildPreconRecommendedForOverride({
          precon,
          activeFactionKey,
        }),
        skipSummary: precon?.recommendationProfile?.notRecommendedFor || "",
        tablePerception:
          primaryTheme?.tablePerception ||
          primaryThemeMeta?.tablePerception ||
          precon?.normalizedThemes?.secondary?.tablePerception ||
          "",
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      const groupDelta = (groupOrder[left.group] ?? 99) - (groupOrder[right.group] ?? 99);
      if (groupDelta !== 0) {
        return groupDelta;
      }
      return right.score - left.score || left.sourceIndex - right.sourceIndex;
    });

  const nativeExact = ranked.filter((entry) => entry.group === "nativeExact");
  const otherExact = ranked.filter((entry) => entry.group === "otherExact");
  const stretch = ranked.filter((entry) => entry.group === "stretch").slice(0, 2);
  const activeFactionShortName = preconFactionShortName(faction, dossier, activeIdentity);

  return {
    nativeExact,
    otherExact,
    stretch,
    hasAny: nativeExact.length > 0 || otherExact.length > 0 || stretch.length > 0,
    activeIdentity,
    activeFactionKey,
    activeFactionShortName,
    nativeLaneTitle: `${activeFactionShortName} Precons`,
    otherExactTitle: `Other ${activeFactionShortName} Exact Matches`,
  };
}

function renderLinkList(links = []) {
  return dedupeLinks(links)
    .map((link) => `- [${link.label}](${link.url})`)
    .join("\n");
}

function renderNamedList(items = []) {
  return uniqueByDisplayName(items).map((item) => `- ${item}`).join("\n");
}

function renderArchetypeList(items = []) {
  return (items || [])
    .map((item) => `- ${item.name}${item.desc ? `: ${item.desc}` : ""}`)
    .join("\n");
}

function renderCommanderRecommendation(candidate) {
  const label = candidate.recommendationType
    ? `${candidate.name} (${candidate.recommendationType})`
    : candidate.name;
  const copy = candidate.source === "commander_compass"
    ? [
        candidate.whyThisFits || candidate.desc,
        candidate.skipIf ? `Skip if: ${cleanSkipIfText(candidate.skipIf)}` : "",
      ].filter(Boolean).join(" ")
    : candidate.desc || "";
  const links = [
    candidate.scryfall ? `[Scryfall](${candidate.scryfall})` : "",
    candidate.edhrec ? `[EDHREC](${candidate.edhrec})` : "",
  ].filter(Boolean).join(" / ");

  return `- ${label}${copy ? `: ${copy}` : ""}${links ? ` ${links}` : ""}`;
}

function renderCommanderRecommendations(candidates = []) {
  return (candidates || []).map(renderCommanderRecommendation).join("\n");
}

function renderLandRecommendationsText(landRecommendations = {}) {
  const sections = [
    ["Premium picks", landRecommendations.premium || []],
    ["Midrange picks", landRecommendations.midrange || []],
    ["Budget picks", landRecommendations.budget || []],
    ["Utility picks", landRecommendations.utility || []],
  ];
  return [
    ...sections.map(([label, values]) => `### ${label}\n${renderNamedList(values) || "- None listed"}`),
    `### Basic land guidance\n${landRecommendations.basicGuidance || "Tune basics to your color pips after the nonbasic shell is chosen."}`,
  ].join("\n\n");
}

export function renderCommanderDossierText(dossier) {
  const faction = dossier?.faction || {};
  const commanderPath = dossier?.commanderPath || {};
  const mana = (dossier?.manaAlignment || [])
    .map((entry) => `${entry.color}: ${entry.value}`)
    .join(", ");
  const manaLabel = dossier.isPrimary ? "Mana alignment" : "Reading mana alignment";
  const omens = (dossier?.readingOmens || [])
    .map((omen) => `- ${omen.title}: ${omen.answerTitle} - ${omen.copy}`)
    .join("\n");
  const starterCards = dossier?.starterCards || {};
  const adjacentFits = (dossier?.adjacentFits || [])
    .map((fit) => `- ${fit.name}: ${fit.reason}`)
    .join("\n");

  return [
    `# ${faction.name} Commander Dossier`,
    dossier.isPrimary ? "**Dossier type:** Primary" : `**Dossier type:** Adjacent\n**Adjacent label:** ${dossier.adjacentLabel}\n**Primary result:** ${dossier.primaryFaction?.name || dossier.primaryFactionKey}\n**Reason it stayed close:** ${dossier.reasonItStayedClose}`,
    `**Expression name:** ${faction.name}`,
    `**Tagline:** ${faction.tagline}`,
    `**${manaLabel}:** ${mana}`,
    dossier.isPrimary ? "" : `**Commander color identity:** ${faction.colorIdentity || getColorIdentity(faction.colors || faction.key || "")}`,
    "## Signals From Your Answers",
    omens || "- No reading omens were available.",
    "## Commander Path",
    commanderPath.copy || "- Missing Commander path.",
    "## Deck Footing",
    commanderPath.deckFooting || "- Missing deck footing.",
    "## Spellcraft / Gameplay Identity",
    commanderPath.spellcraft || "- Missing spellcraft identity.",
    "## Table Caution",
    commanderPath.tableCautionText || "- Missing table caution.",
    "## Archetypes",
    renderArchetypeList(dossier.archetypes) || "- No archetypes listed.",
    "## Starter Cards",
    "### Creatures",
    renderNamedList(starterCards.creatures) || "- None listed",
    "### Instants and Sorceries",
    renderNamedList(starterCards.spells) || "- None listed",
    "### Enchantments and Artifacts",
    renderNamedList(starterCards.permanents) || "- None listed",
    "## Land Recommendations",
    renderLandRecommendationsText(dossier.landRecommendations),
    "## Commander Recommendations",
    renderCommanderRecommendations(dossier.commanderRecommendations) || "- Use the deck-start links below for commander discovery.",
    "## Commander Deck-start Links",
    renderLinkList(dossier.links?.commanderStart) || "- None listed",
    "## Archidekt Validated Search Links",
    renderLinkList(dossier.links?.archidekt) || "- None listed",
    "## Maze Package Searches",
    renderLinkList(dossier.links?.maze) || "- None listed",
    "## Scryfall Package Searches",
    renderLinkList(dossier.links?.scryfall) || "- None listed",
    dossier.isPrimary ? "## Adjacent Fits" : "## Other Nearby Fits From Your Primary Reading",
    adjacentFits || "- No adjacent fits listed.",
  ].filter((part) => part !== "").join("\n\n");
}

function duplicateValues(values = []) {
  const seen = new Set();
  const duplicates = new Set();
  values.forEach((value) => {
    const key = normalizeDisplayName(value);
    if (!key) {
      return;
    }
    if (seen.has(key)) {
      duplicates.add(value);
    }
    seen.add(key);
  });
  return [...duplicates];
}

function duplicateLinks(links = []) {
  return duplicateValues((links || []).map((link) => link?.url || `${link?.service || ""}:${link?.label || ""}`));
}

function primaryOwnedAuditText(dossier) {
  const commanderPath = dossier.commanderPath || {};
  return [
    commanderPath.copy,
    commanderPath.deckFooting,
    commanderPath.spellcraft,
    commanderPath.tableCautionText,
    ...(dossier.archetypes || []).flatMap((item) => [item.name, item.desc]),
    ...(dossier.commanderRecommendations || []).flatMap((candidate) => [candidate.name, candidate.desc]),
  ].filter(Boolean).join(" ");
}

function adjacentFitAuditEntries(dossier) {
  return (dossier.adjacentFits || []).map((fit) => ({
    targetFactionKey: fit.factionKey,
    targetFactionName: fit.name,
    text: [fit.name, fit.reason].filter(Boolean).join(" "),
  }));
}

function auditTextAgainstGuidance({ guidance, text, label, failures, warnings, requireOwnedThemes = false }) {
  if (!guidance) {
    failures.push(`Missing Commander guidance for ${label}.`);
    return;
  }

  (guidance.bannedPhrases || []).forEach((phrase) => {
    if (containsPhrase(text, phrase)) {
      failures.push(`Banned phrase for ${guidance.shortName} in ${label}: "${phrase}".`);
    }
  });

  (guidance.bleedWarningTerms || []).forEach((term) => {
    if (containsPhrase(text, term)) {
      warnings.push(`Possible language bleed for ${guidance.shortName} in ${label}: "${term}". Review rule: ${guidance.tableCautionReviewRule}`);
    }
  });

  if (requireOwnedThemes) {
    const ownedHits = countOwnedThemeHits(text, guidance);
    if (ownedHits < 1) {
      failures.push(`Commander path for ${guidance.shortName} does not include an owned theme.`);
    } else if (ownedHits < 2) {
      warnings.push(`Commander path for ${guidance.shortName} includes only one owned theme.`);
    }
  }
}

function auditAdjacentFitLanguage(dossier, failures, warnings) {
  const golgariThesisTerms = [
    "uses the discard pile like a second hand",
    "graveyard into a second hand",
    "stock the graveyard",
    "buy cards back",
    "make removal feel temporary",
  ];
  const graveyardThesisAllowed = new Set(["BG", "WITHERBLOOM", "LOREHOLD"]);

  adjacentFitAuditEntries(dossier).forEach((entry) => {
    const guidance = getCommanderFactionGuidance(entry.targetFactionKey);
    auditTextAgainstGuidance({
      guidance,
      text: entry.text,
      label: `adjacent fit ${entry.targetFactionName || entry.targetFactionKey}`,
      failures,
      warnings,
    });

    if (!graveyardThesisAllowed.has(entry.targetFactionKey)) {
      golgariThesisTerms.forEach((term) => {
        if (containsPhrase(entry.text, term)) {
          warnings.push(`Possible adjacent-fit language bleed for ${entry.targetFactionName || entry.targetFactionKey}: "${term}" belongs to Golgari-style graveyard thesis copy.`);
        }
      });
    }
  });
}

function auditRequiredSections(dossier, failures, warnings) {
  const commanderPath = dossier.commanderPath || {};
  const starterCards = dossier.starterCards || {};
  const lands = dossier.landRecommendations || {};
  const auditContract = dossier.auditContract || buildDossierAuditSectionContract({
    faction: dossier.faction?.record || dossier.faction,
    starterCards,
    commanderStartLinks: dossier.links?.commanderStart || [],
    archidektLinks: dossier.links?.archidekt || [],
  });
  const required = [
    ["expression name", dossier.faction?.name],
    ["tagline", dossier.faction?.tagline],
    ["mana alignment", dossier.manaAlignment?.length],
    ["reading omens", dossier.readingOmens?.length],
    ["Commander path", commanderPath.copy],
    ["deck footing", commanderPath.deckFooting],
    ["spellcraft/gameplay identity", commanderPath.spellcraft],
    ["table caution", commanderPath.tableCautionText],
    ["archetypes", dossier.archetypes?.length],
    ["land recommendations", ["premium", "midrange", "budget", "utility"].some((tier) => lands[tier]?.length)],
    ["Maze package searches", dossier.links?.maze?.length],
    ["Scryfall package searches", dossier.links?.scryfall?.length],
  ];

  if (auditContract.starterCards?.required) {
    required.push(["starter cards", hasStarterCardReferences(starterCards)]);
  } else {
    warnings.push("Advisory content gap: starter cards are not authored for this dossier, so the runtime hides the starter-card panel.");
  }

  if (auditContract.commanderDirectoryLinks?.required) {
    required.push(["Commander deck-start links", dossier.links?.commanderStart?.length]);
  }

  if (auditContract.alternativeCommanderDiscovery?.required) {
    required.push(["alternative Commander discovery surface", dossier.links?.archidekt?.length]);
  }

  if (dossier.isPrimary) {
    required.push(["adjacent fits where configured", Array.isArray(dossier.adjacentFits)]);
  } else {
    required.push(["adjacent label", dossier.adjacentLabel]);
    required.push(["target expression name", dossier.faction?.name]);
    required.push(["target expression tagline", dossier.faction?.tagline]);
    required.push(["reason it stayed close", dossier.reasonItStayedClose]);
  }

  required.forEach(([label, value]) => {
    if (!value) {
      failures.push(`Missing required section: ${label}.`);
    }
  });
}

function auditTableCaution(dossier, failures, warnings) {
  const text = dossier.commanderPath?.tableCautionText || "";
  if (!text) {
    failures.push("Missing tableCautionText.");
    return;
  }
  if (text.length > 220) {
    warnings.push("tableCautionText is longer than expected for player-facing copy.");
  }
  if (/(\.,|\.\.|;;|;.*;)/.test(text) || text.includes(";")) {
    failures.push(`tableCautionText has awkward punctuation: "${text}".`);
  }
  if (!ACTION_CUE_PATTERN.test(text)) {
    failures.push(`tableCautionText lacks a practical action cue: "${text}".`);
  }
}

function auditResultSummaryStrip(dossier, failures) {
  const strip = dossier.resultSummaryStrip || null;
  if (!strip) {
    failures.push("Missing resultSummaryStrip.");
    return;
  }

  const adjacent = strip.adjacentFit || {};
  const direction = strip.whereThisLeads || {};
  const pattern = strip.playPattern || {};
  const requiredFields = [
    ["resultSummaryStrip.adjacentFit.label", adjacent.label],
    ["resultSummaryStrip.adjacentFit.heading", adjacent.heading],
    ["resultSummaryStrip.adjacentFit.signalBand", adjacent.signalBand],
    ["resultSummaryStrip.adjacentFit.signalLabel", adjacent.signalLabel],
    ["resultSummaryStrip.adjacentFit.relationshipCopy", adjacent.relationshipCopy],
    ["resultSummaryStrip.adjacentFit.targetName", adjacent.targetName],
    ["resultSummaryStrip.whereThisLeads.label", direction.label],
    ["resultSummaryStrip.whereThisLeads.heading", direction.heading],
    ["resultSummaryStrip.whereThisLeads.body", direction.body],
    ["resultSummaryStrip.playPattern.label", pattern.label],
    ["resultSummaryStrip.playPattern.heading", pattern.heading],
    ["resultSummaryStrip.playPattern.body", pattern.body],
  ];

  requiredFields.forEach(([label, value]) => {
    if (!hasUsableSummaryText(value)) {
      failures.push(`Missing result summary field: ${label}.`);
    }
  });

  if (adjacent.targetKey && adjacent.targetKey === dossier.targetFactionKey) {
    failures.push("resultSummaryStrip.adjacentFit.targetKey matched the current dossier faction.");
  }

  requiredFields.forEach(([label, value]) => {
    if (hasPlaceholderSummaryText(value)) {
      failures.push(`Placeholder summary-strip copy remained in ${label}: "${value}".`);
    }
  });
}

function auditLandCounts(dossier, failures, warnings) {
  const landText = renderLandRecommendationsText(dossier.landRecommendations);
  LAND_COUNT_PATTERNS.forEach((pattern) => {
    landText.split(/\n/).forEach((line) => {
      if (pattern.test(line)) {
        failures.push(`Commander land count formatting remains in land output: ${line}`);
      }
    });
  });
  (dossier.landRecommendations?.suppressedQuantities || []).forEach((entry) => {
    warnings.push(`Suppressed source land quantity (${entry.sourceTier}): ${entry.original} -> ${entry.renderedName}`);
  });
}

function auditDuplicates(dossier, warnings) {
  Object.entries(dossier.starterCards || {}).forEach(([group, values]) => {
    duplicateValues(values).forEach((name) => {
      warnings.push(`Duplicate starter card in ${group}: ${name}`);
    });
  });

  duplicateValues((dossier.commanderRecommendations || []).map((candidate) => candidate.name)).forEach((name) => {
    warnings.push(`Duplicate commander recommendation: ${name}`);
  });

  (dossier.landRecommendations?.suppressedDuplicates || []).forEach((entry) => {
    warnings.push(`Suppressed duplicate land (${entry.sourceTier}): ${entry.original} -> ${entry.duplicateOf}`);
  });

  [
    ["Commander deck-start", dossier.links?.commanderStart || []],
    ["Archidekt validated search", dossier.links?.archidekt || []],
    ["Maze package", dossier.links?.maze || []],
    ["Scryfall package", dossier.links?.scryfall || []],
  ].forEach(([label, links]) => {
    duplicateLinks(links).forEach((url) => {
      warnings.push(`Duplicate ${label} link: ${url}`);
    });
  });
}

function auditFactionLanguage(dossier, failures, warnings) {
  const guidance = dossier.commanderPath?.guidance || getCommanderFactionGuidance(dossier.faction);
  const ownedText = primaryOwnedAuditText(dossier);

  const commanderText = [
    dossier.commanderPath?.copy || "",
    dossier.commanderPath?.spellcraft || "",
  ].join(" ");
  auditTextAgainstGuidance({
    guidance,
    text: ownedText,
    label: `${guidance?.shortName || dossier.targetFactionKey} primary-owned sections`,
    failures,
    warnings,
  });

  if (!guidance) {
    return;
  }

  const ownedHits = countOwnedThemeHits(commanderText, guidance);
  if (ownedHits < 1) {
    failures.push(`Commander path for ${guidance.shortName} does not include an owned theme.`);
  } else if (ownedHits < 2) {
    warnings.push(`Commander path for ${guidance.shortName} includes only one owned theme.`);
  }

  auditAdjacentFitLanguage(dossier, failures, warnings);
}

function auditSpecificRegressions(dossier, text, failures) {
  const target = dossier.targetFactionKey;
  const primary = dossier.primaryFactionKey;
  const graveyardThesis = [
    "uses the discard pile like a second hand",
    "graveyard into a second hand",
    "turn the graveyard into a second hand",
    "stock the graveyard",
    "buy cards back",
    "make removal feel temporary",
    "build from the rot",
    "reclaimed remains",
  ];

  if (target === "RG") {
    [
      "turns spell sequencing into spectacle",
      "sculpt the hand",
      "one stack become the story",
      "Cantrips, treasure or artifact mana, copy effects",
    ].forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Gruul regression phrase present: "${phrase}".`);
      }
    });
  }

  if (target === "QUANDRIX") {
    [
      "turns spell sequencing into spectacle",
      "one stack become the story",
      "sculpt the hand",
      ...graveyardThesis,
    ].forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Quandrix regression phrase present: "${phrase}".`);
      }
    });
  }

  if (target === "UG") {
    graveyardThesis.forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Simic regression phrase present: "${phrase}".`);
      }
    });
  }

  if (primary === "BG" && target === "QUANDRIX") {
    graveyardThesis.forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Golgari -> Quandrix adjacent uses Golgari graveyard thesis: "${phrase}".`);
      }
    });
  }

  if (primary === "QUANDRIX" && target === "WB") {
    ["obligation", "tax", "aristocrat", "debt", "afterlife", "life drain", "leverage"].some((phrase) => containsPhrase(text, phrase)) ||
      failures.push("Quandrix -> Orzhov adjacent does not contain Orzhov obligation/tax/aristocrats identity.");
  }
}

function auditPolishWarnings(dossier, text, warnings) {
  if (/because\s+its\s+the/i.test(text)) {
    warnings.push('Adjacent copy contains awkward grammar: "because its the".');
  }

  if (
    dossier.isPrimary &&
    !(dossier.commanderRecommendations || []).length &&
    /Use the deck-start links below for commander discovery\./i.test(text)
  ) {
    warnings.push("Primary dossier has only the generic commander recommendation fallback.");
  }

  (dossier.commanderRecommendations || []).forEach((candidate) => {
    if (/A legendary creature already present in this faction's starter references\./i.test(candidate.desc || "")) {
      warnings.push(`Commander recommendation for ${candidate.name} uses the generic starter-reference fallback.`);
    }
  });
}

function classifyAuditMessage(message, severity = "warning") {
  if (/^Advisory content gap:/i.test(message)) {
    return "advisoryWarnings";
  }
  if (/banned phrase|regression phrase|graveyard thesis/i.test(message)) {
    return "contentRegressions";
  }
  if (severity === "failure") {
    return "contractFailures";
  }
  return "otherWarnings";
}

function summarizeAuditBuckets(failures = [], warnings = []) {
  const buckets = {
    contentRegressions: [],
    contractFailures: [],
    advisoryWarnings: [],
    otherWarnings: [],
  };

  failures.forEach((message) => {
    buckets[classifyAuditMessage(message, "failure")].push(message);
  });
  warnings.forEach((message) => {
    buckets[classifyAuditMessage(message, "warning")].push(message);
  });

  return buckets;
}

export function auditCommanderDossier(dossier) {
  const failures = [];
  const warnings = [];
  const text = renderCommanderDossierText(dossier);

  auditRequiredSections(dossier, failures, warnings);
  auditTableCaution(dossier, failures, warnings);
  auditResultSummaryStrip(dossier, failures);
  auditLandCounts(dossier, failures, warnings);
  auditDuplicates(dossier, warnings);
  auditFactionLanguage(dossier, failures, warnings);
  auditSpecificRegressions(dossier, text, failures);
  auditPolishWarnings(dossier, text, warnings);
  const auditBuckets = summarizeAuditBuckets(failures, warnings);

  return {
    id: `${dossier.primaryFactionKey}.${dossier.mode}.${dossier.targetFactionKey}`,
    factionKey: dossier.targetFactionKey,
    primaryFactionKey: dossier.primaryFactionKey,
    mode: dossier.mode,
    commanderRecommendationSource: dossier.commanderRecommendationSource || "fallback",
    commanderRecommendationCount: (dossier.commanderRecommendations || []).length,
    status: failures.length ? "fail" : warnings.length ? "warning" : "pass",
    failures,
    warnings,
    auditBuckets,
    sourceLandWarnings: (dossier.landRecommendations?.suppressedQuantities || []).map((entry) => ({
      sourceFactionKey: dossier.targetFactionKey,
      sourceFactionName: dossier.faction?.name || dossier.targetFactionKey,
      tier: entry.sourceTier,
      original: entry.original,
      renderedName: entry.renderedName,
    })),
    tableCautionReviewRule: dossier.commanderPath?.tableCautionReviewRule || "",
  };
}

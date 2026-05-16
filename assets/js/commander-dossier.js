export const ARCHIDEKT_SEARCH_BASE = "https://archidekt.com/search/decks";
export const DEFAULT_COMMANDER_DECK_FORMAT = 3;

const MANA_ORDER = ["W", "U", "B", "R", "G"];
const COLOR_IDENTITY_SLUGS = new Map([
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
]);

const EXTERNAL_ROUTING_ALIASES = new Map([
  ["WU", { guild: "azorius", colorIdentity: "WU", label: "Azorius" }],
  ["AZORIUS", { guild: "azorius", colorIdentity: "WU", label: "Azorius" }],
  ["UB", { guild: "dimir", colorIdentity: "UB", label: "Dimir" }],
  ["DIMIR", { guild: "dimir", colorIdentity: "UB", label: "Dimir" }],
  ["BR", { guild: "rakdos", colorIdentity: "BR", label: "Rakdos" }],
  ["RAKDOS", { guild: "rakdos", colorIdentity: "BR", label: "Rakdos" }],
  ["RG", { guild: "gruul", colorIdentity: "RG", label: "Gruul" }],
  ["GRUUL", { guild: "gruul", colorIdentity: "RG", label: "Gruul" }],
  ["WG", { guild: "selesnya", colorIdentity: "WG", label: "Selesnya" }],
  ["GW", { guild: "selesnya", colorIdentity: "WG", label: "Selesnya" }],
  ["SELESNYA", { guild: "selesnya", colorIdentity: "WG", label: "Selesnya" }],
  ["WB", { guild: "orzhov", colorIdentity: "WB", label: "Orzhov" }],
  ["ORZHOV", { guild: "orzhov", colorIdentity: "WB", label: "Orzhov" }],
  ["UR", { guild: "izzet", colorIdentity: "UR", label: "Izzet" }],
  ["IZZET", { guild: "izzet", colorIdentity: "UR", label: "Izzet" }],
  ["BG", { guild: "golgari", colorIdentity: "BG", label: "Golgari" }],
  ["GOLGARI", { guild: "golgari", colorIdentity: "BG", label: "Golgari" }],
  ["UG", { guild: "simic", colorIdentity: "UG", label: "Simic" }],
  ["GU", { guild: "simic", colorIdentity: "UG", label: "Simic" }],
  ["SIMIC", { guild: "simic", colorIdentity: "UG", label: "Simic" }],
  ["WR", { guild: "boros", colorIdentity: "WR", label: "Boros" }],
  ["RW", { guild: "boros", colorIdentity: "WR", label: "Boros" }],
  ["BOROS", { guild: "boros", colorIdentity: "WR", label: "Boros" }],
  ["LOREHOLD", { guild: "boros", colorIdentity: "WR", label: "Boros" }],
  ["PRISMARI", { guild: "izzet", colorIdentity: "UR", label: "Izzet" }],
  ["QUANDRIX", { guild: "simic", colorIdentity: "UG", label: "Simic" }],
  ["SILVERQUILL", { guild: "orzhov", colorIdentity: "WB", label: "Orzhov" }],
  ["WITHERBLOOM", { guild: "golgari", colorIdentity: "BG", label: "Golgari" }],
]);

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
  "aurelia the warleader",
  "beledros witherbloom",
  "breena the demagogue",
  "dina soul steeper",
  "galazeth prismari",
  "hofri ghostforge",
  "killian ink duelist",
  "kroxa titan of death s hunger",
  "lavinia of the tenth",
  "lazav dimir mastermind",
  "prime speaker zegana",
  "quintorius field historian",
  "rootha mercurial artist",
  "shadrix silverquill",
  "tanazir quandrix",
  "thalia guardian of thraben",
  "trostani selesnya s voice",
  "uro titan of nature s wrath",
  "veyran voice of duality",
  "vito thorn of the dusk rose",
  "willowdusk essence seer",
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
    plain: (identity) => `${identity.toUpperCase()} commanders that fit this reading`,
    query: (identity) => `(t:legendary t:creature) id<=${identity} f:commander`,
  },
  {
    key: "ramp",
    label: "ramp",
    plain: (identity) => `${identity.toUpperCase()} ramp for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"search your library for a land" OR o:"add {")`,
  },
  {
    key: "draw",
    label: "draw",
    plain: (identity) => `${identity.toUpperCase()} card draw for this Commander path`,
    query: (identity) => `id<=${identity} f:commander o:draw`,
  },
  {
    key: "interaction",
    label: "interaction",
    plain: (identity) => `${identity.toUpperCase()} interaction for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"destroy target" OR o:"exile target" OR o:"counter target" OR o:"return target")`,
  },
  {
    key: "lands",
    label: "lands",
    plain: (identity) => `${identity.toUpperCase()} lands for this Commander path`,
    query: (identity) => `id<=${identity} f:commander t:land`,
  },
  {
    key: "win-conditions",
    label: "win conditions",
    plain: (identity) => `${identity.toUpperCase()} win conditions for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"you win the game" OR o:"each opponent loses" OR o:"combat damage")`,
  },
];

const ACTION_CUE_PATTERN = /\b(slow down|rebuild|hold|protect|buy time|draw|remove|wait|sequence)\b/i;
const LAND_COUNT_PATTERNS = [
  /\b[2-9]x\s+/i,
  /\bx\s*[2-9]\b/i,
  /\b\d+\s+(Forest|Forests|Island|Islands|Swamp|Swamps|Mountain|Mountains|Plains)\b/i,
];
const LAND_QUANTITY_PATTERN = /^\s*(\d+)\s*x?\s+(.+?)\s*$/i;
const LAND_SUFFIX_QUANTITY_PATTERN = /^\s*(.+?)\s*x\s*([2-9])\s*$/i;
const BASIC_LANDS = new Set(["plains", "island", "swamp", "mountain", "forest"]);
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
};

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
    "Breena, the Demagogue": "Turns table politics into cards and counters, exactly where Silverquill wants its social leverage to become visible.",
    "Dina, Soul Steeper": "Converts life gain into table-wide drain, giving Witherbloom a simple engine for life and death as one economy.",
    "Killian, Ink Duelist": "Rewards targeted pressure and cheap interaction, giving Silverquill a focused combat-negotiation commander.",
    "Rootha, Mercurial Artist": "Copies the expressive spell that matters, letting Prismari make one big performance echo twice.",
    "Veyran, Voice of Duality": "Doubles magecraft-style triggers so Prismari and Izzet spell turns become louder without losing velocity.",
    "Willowdusk, Essence Seer": "Turns life-total swings into counters, making Witherbloom's healing and harm visible in combat.",
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
  return BASIC_LANDS.has(normalizeDisplayName(name)) ? "" : name;
}

function normalizeLandTier(values, sourceTier, suppressedQuantities) {
  return uniqueByDisplayName(
    splitLandSource(values)
      .map((value) => cleanLandPick(value, sourceTier, suppressedQuantities))
      .filter(Boolean)
  );
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
    return "Tune basics to your color pips after the nonbasic shell is chosen.";
  }
  return `Tune ${basics.join(" and ")} to your early pips after the nonbasic shell, ramp package, and utility lands are chosen.`;
}

export function buildCommanderLandRecommendations(faction) {
  const landBase = faction?.land_base || {};
  const suppressedQuantities = [];
  const premium = uniqueByDisplayName([
    ...normalizeLandTier(landBase.premium, "premium", suppressedQuantities),
    ...normalizeLandTier(landBase.optimal, "optimal", suppressedQuantities),
  ]).slice(0, 5);
  const midrange = uniqueByDisplayName([
    ...normalizeLandTier(landBase.midrange, "midrange", suppressedQuantities),
    ...normalizeLandTier(landBase.mid, "mid", suppressedQuantities),
  ]).slice(0, 5);
  const budget = uniqueByDisplayName([
    ...normalizeLandTier(landBase.budget, "budget", suppressedQuantities),
    ...normalizeLandTier(landBase.budget_line, "budget_line", suppressedQuantities),
  ]).slice(0, 5);
  const utility = normalizeLandTier(landBase.utility, "utility", suppressedQuantities).slice(0, 5);

  return {
    premium,
    midrange,
    budget,
    utility,
    basicGuidance: basicLandGuidance(faction?.colors || []),
    suppressedQuantities,
  };
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
  const names = (entry?.deltas || [])
    .filter((delta) => delta.delta > 0)
    .sort((left, right) => {
      if (left.faction === activeFactionKey) {
        return -1;
      }
      if (right.faction === activeFactionKey) {
        return 1;
      }
      return right.delta - left.delta;
    })
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

function tagLaneLabel(lane, tagName, category) {
  if (lane === "budget") {
    return tagName === "Budget" ? "Budget-friendly Commander builds" : "Midrange Commander shells";
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

function addTagLane(lanes, seen, catalog, tagName, lane, source, priority) {
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
    label: tagLaneLabel(lane, canonical, category),
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
  if (source && typeof source === "object" && !Array.isArray(source)) {
    keyCandidates.push(source.key, source.name, source.research_links?.edhrec_slug);
  } else {
    keyCandidates.push(source);
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
  deckFormatCommander = DEFAULT_COMMANDER_DECK_FORMAT,
  deckTagName = "",
  commanderName = "",
}) {
  const params = new URLSearchParams();
  params.set("colors", getColorIdentity(colors));
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

  if (budget === "budget") {
    addTagLane(lanes, seen, catalog, "Budget", "budget", "starter profile", 10);
  } else if (["mid", "mid-range", "midrange"].includes(budget)) {
    addTagLane(lanes, seen, catalog, "Midrange", "budget", "starter profile", 10);
  }

  (faction?.archetypes || []).forEach((item, index) => {
    [item.name, item.desc].forEach((text) => {
      const tag = resolveRuleTag(catalog, text, ARCHETYPE_TEXT_RULES) || resolveArchidektTagName(catalog, text);
      addTagLane(lanes, seen, catalog, tag, "archetype", item.name, 20 + index);
    });
  });

  const mechanicsText = modelFaction?.identity?.mechanics || "";
  ARCHETYPE_TEXT_RULES.forEach((rule, index) => {
    if (rule.patterns.some((pattern) => includesRulePattern(mechanicsText, pattern))) {
      addTagLane(lanes, seen, catalog, rule.tag, "mechanic", "mechanics summary", 40 + index);
    }
  });

  (placementResult?.evidence_trail || []).slice(-5).forEach((entry, index) => {
    const evidenceText = [entry.signal, entry.answer_title, entry.prompt].filter(Boolean).join(" ");
    const tag = resolveRuleTag(catalog, evidenceText, EVIDENCE_TEXT_RULES);
    addTagLane(lanes, seen, catalog, tag, "evidence", entry.signal || entry.answer_title, 60 + index);
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
      label: `${getColorIdentity(colors)} Commander decks`,
      url: buildArchidektDeckSearchUrl({ colors, deckFormatCommander, commanderName }),
    },
    ...tagLanes.map((lane) => ({
      kind: "archidekt-tag",
      service: "archidekt",
      tagName: lane.tagName,
      category: lane.category,
      label: lane.label,
      url: buildArchidektDeckSearchUrl({
        colors,
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
  const identity = getColorIdentity(faction?.colors || faction?.key || "").toLowerCase();
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
 * @returns {{title:string,answerTitle:string,copy:string}[]} Omen cards.
 */
export function buildReadingOmens({
  evidenceTrail = [],
  factions = {},
  activeFactionKey = "",
  limit = 4,
} = {}) {
  return (evidenceTrail || [])
    .slice(-limit)
    .map((entry, index) => {
      const answerTitle = entry?.answer_title || "A table choice";
      const names = positiveFactionNames(entry, factions, activeFactionKey);
      const echo = names.length
        ? ` It ${names.length > 1 ? "echoed" : "was answered by"} ${names.join(" and ")}.`
        : "";

      return {
        title: `Omen ${index + 1}`,
        answerTitle,
        copy: `${omenPhraseForEntry(entry)}${echo}`,
      };
    });
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
  const laneTags = tagLanes.map((lane) => lane.tagName);
  const budget = starterProfile?.budget_band || "mid";
  const experience = starterProfile?.experience_level || "returning";
  const guidance = getCommanderFactionGuidance(faction);
  const institutionWord = faction?.institution_type === "college" ? "College" : "Guild";
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
    title: "Your First Commander Path",
    copy,
    details: [
      {
        label: "Deck footing",
        copy: `${colorIdentity} Commander, ${budget} budget, ${experience} pilot. ${researchLanes}`,
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

function buildArchetypes(faction) {
  return uniqueObjectsBy(faction?.archetypes || [], (item) => normalizeDisplayName(item?.name || ""))
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
    ? `This is your primary ${faction.institution_type === "college" ? "college" : "guild"} fit.`
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

  return {
    version: "commander-dossier-v1",
    sourceModelVersion: placementResult.model_version || "",
    mode: isPrimary ? "primary" : "adjacent",
    isPrimary,
    primaryFactionKey: primaryKey,
    targetFactionKey: activeKey,
    adjacentLabel: isPrimary ? "" : `Adjacent ${faction.institution_type === "college" ? "College" : "Guild"} Fit`,
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
      record: faction,
    },
    primaryFaction: primaryFaction
      ? {
          key: primaryKey,
          name: primaryFaction.name,
          tagline: primaryFaction.tagline,
          institutionType: primaryFaction.institution_type,
          world: primaryFaction.world,
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
    starterCards: buildStarterCards(faction),
    landRecommendations: buildCommanderLandRecommendations(faction),
    commanderRecommendations,
    commanderRecommendationSource,
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
    `**Faction/college name:** ${faction.name}`,
    `**Tagline:** ${faction.tagline}`,
    `**${manaLabel}:** ${mana}`,
    dossier.isPrimary ? "" : `**Commander color identity:** ${faction.colorIdentity || getColorIdentity(faction.colors || faction.key || "")}`,
    "## Reading Omens",
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

function auditRequiredSections(dossier, failures) {
  const commanderPath = dossier.commanderPath || {};
  const starterCards = dossier.starterCards || {};
  const lands = dossier.landRecommendations || {};
  const required = [
    ["faction/college name", dossier.faction?.name],
    ["tagline", dossier.faction?.tagline],
    ["mana alignment", dossier.manaAlignment?.length],
    ["reading omens", dossier.readingOmens?.length],
    ["Commander path", commanderPath.copy],
    ["deck footing", commanderPath.deckFooting],
    ["spellcraft/gameplay identity", commanderPath.spellcraft],
    ["table caution", commanderPath.tableCautionText],
    ["archetypes", dossier.archetypes?.length],
    ["starter cards", Object.values(starterCards).some((items) => items?.length)],
    ["land recommendations", ["premium", "midrange", "budget", "utility"].some((tier) => lands[tier]?.length)],
    ["Commander deck-start links", dossier.links?.commanderStart?.length],
    ["Maze package searches", dossier.links?.maze?.length],
    ["Scryfall package searches", dossier.links?.scryfall?.length],
  ];

  if (dossier.isPrimary) {
    required.push(["adjacent fits where configured", Array.isArray(dossier.adjacentFits)]);
  } else {
    required.push(["adjacent label", dossier.adjacentLabel]);
    required.push(["target faction/college name", dossier.faction?.name]);
    required.push(["target faction/college tagline", dossier.faction?.tagline]);
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

export function auditCommanderDossier(dossier) {
  const failures = [];
  const warnings = [];
  const text = renderCommanderDossierText(dossier);

  auditRequiredSections(dossier, failures);
  auditTableCaution(dossier, failures, warnings);
  auditLandCounts(dossier, failures, warnings);
  auditDuplicates(dossier, warnings);
  auditFactionLanguage(dossier, failures, warnings);
  auditSpecificRegressions(dossier, text, failures);
  auditPolishWarnings(dossier, text, warnings);

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

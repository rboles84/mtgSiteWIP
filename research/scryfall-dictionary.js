/**
 * Built-in parser dictionary used when the seed JSON cannot be loaded.
 * The seed artifact expands these tables at runtime; this keeps local file
 * previews and parser tests useful without network or app hosting.
 */
export const DEFAULT_DICTIONARY = {
  colorOrder: ["w", "u", "b", "r", "g"],
  colors: {
    white: "w",
    blue: "u",
    black: "b",
    red: "r",
    green: "g",
    colorless: "c"
  },
  identities: {
    azorius: { colors: "wu", label: "Azorius" },
    dimir: { colors: "ub", label: "Dimir" },
    rakdos: { colors: "br", label: "Rakdos" },
    gruul: { colors: "rg", label: "Gruul" },
    selesnya: { colors: "gw", label: "Selesnya" },
    orzhov: { colors: "wb", label: "Orzhov" },
    izzet: { colors: "ur", label: "Izzet" },
    golgari: { colors: "bg", label: "Golgari" },
    boros: { colors: "wr", label: "Boros" },
    simic: { colors: "gu", label: "Simic" },
    lorehold: { colors: "wr", label: "Lorehold" },
    prismari: { colors: "ur", label: "Prismari" },
    quandrix: { colors: "gu", label: "Quandrix" },
    silverquill: { colors: "wb", label: "Silverquill" },
    witherbloom: { colors: "bg", label: "Witherbloom" },
    bant: { colors: "wug", label: "Bant" },
    esper: { colors: "wub", label: "Esper" },
    grixis: { colors: "ubr", label: "Grixis" },
    jund: { colors: "brg", label: "Jund" },
    naya: { colors: "wrg", label: "Naya" },
    abzan: { colors: "wbg", label: "Abzan" },
    jeskai: { colors: "wur", label: "Jeskai" },
    sultai: { colors: "ubg", label: "Sultai" },
    mardu: { colors: "wbr", label: "Mardu" },
    temur: { colors: "urg", label: "Temur" },
    chaos: { colors: "ubrg", label: "Chaos" },
    aggression: { colors: "wbrg", label: "Aggression" },
    altruism: { colors: "wurg", label: "Altruism" },
    growth: { colors: "wubg", label: "Growth" },
    artifice: { colors: "wubr", label: "Artifice" }
  },
  identityAliases: {
    "white blue": "azorius",
    "blue white": "azorius",
    "blue black": "dimir",
    "black blue": "dimir",
    "black red": "rakdos",
    "red black": "rakdos",
    "red green": "gruul",
    "green red": "gruul",
    "green white": "selesnya",
    "white green": "selesnya",
    "white black": "orzhov",
    "black white": "orzhov",
    "blue red": "izzet",
    "red blue": "izzet",
    "black green": "golgari",
    "green black": "golgari",
    "red white": "boros",
    "white red": "boros",
    "green blue": "simic",
    "blue green": "simic"
  },
  types: {
    creature: "t:creature",
    creatures: "t:creature",
    instant: "t:instant",
    instants: "t:instant",
    sorcery: "t:sorcery",
    sorceries: "t:sorcery",
    artifact: "t:artifact",
    artifacts: "t:artifact",
    enchantment: "t:enchantment",
    enchantments: "t:enchantment",
    planeswalker: "t:planeswalker",
    planeswalkers: "t:planeswalker",
    walker: "t:planeswalker",
    walkers: "t:planeswalker",
    land: "t:land",
    lands: "t:land",
    battle: "t:battle",
    battles: "t:battle",
    legendary: "t:legendary",
    basic: "t:basic",
    spell: "is:spell",
    spells: "is:spell",
    permanent: "is:permanent",
    permanents: "is:permanent"
  },
  subtypes: {
    angel: "t:angel",
    angels: "t:angel",
    advisor: "t:advisor",
    advisors: "t:advisor",
    aura: "t:aura",
    auras: "t:aura",
    bird: "t:bird",
    birds: "t:bird",
    beast: "t:beast",
    beasts: "t:beast",
    cat: "t:cat",
    cats: "t:cat",
    cleric: "t:cleric",
    clerics: "t:cleric",
    druid: "t:druid",
    druids: "t:druid",
    demon: "t:demon",
    demons: "t:demon",
    dinosaur: "t:dinosaur",
    dinosaurs: "t:dinosaur",
    dino: "t:dinosaur",
    dinos: "t:dinosaur",
    dog: "t:dog",
    dogs: "t:dog",
    dragon: "t:dragon",
    dragons: "t:dragon",
    elemental: "t:elemental",
    elementals: "t:elemental",
    elf: "t:elf",
    elves: "t:elf",
    giant: "t:giant",
    giants: "t:giant",
    goblin: "t:goblin",
    goblins: "t:goblin",
    human: "t:human",
    humans: "t:human",
    merfolk: "t:merfolk",
    horror: "t:horror",
    horrors: "t:horror",
    knight: "t:knight",
    knights: "t:knight",
    ninja: "t:ninja",
    ninjas: "t:ninja",
    orc: "t:orc",
    orcs: "t:orc",
    pirate: "t:pirate",
    pirates: "t:pirate",
    rat: "t:rat",
    rats: "t:rat",
    rogue: "t:rogue",
    rogues: "t:rogue",
    soldier: "t:soldier",
    soldiers: "t:soldier",
    spirit: "t:spirit",
    spirits: "t:spirit",
    squirrel: "t:squirrel",
    squirrels: "t:squirrel",
    shaman: "t:shaman",
    shamans: "t:shaman",
    slug: "t:slug",
    slugs: "t:slug",
    snake: "t:snake",
    snakes: "t:snake",
    vampire: "t:vampire",
    vampires: "t:vampire",
    wolf: "t:wolf",
    wolves: "t:wolf",
    wall: "t:wall",
    walls: "t:wall",
    warrior: "t:warrior",
    warriors: "t:warrior",
    vehicle: "t:vehicle",
    vehicles: "t:vehicle",
    wizard: "t:wizard",
    wizards: "t:wizard",
    zombie: "t:zombie",
    zombies: "t:zombie",
    bear: "t:bear",
    bears: "t:bear",
    fish: "t:fish",
    fishes: "t:fish"
  },
  keywords: {
    flying: "kw:flying",
    haste: "kw:haste",
    ward: "kw:ward",
    menace: "kw:menace",
    deathtouch: "kw:deathtouch",
    lifelink: "kw:lifelink",
    vigilance: "kw:vigilance",
    trample: "kw:trample",
    reach: "kw:reach",
    hexproof: "kw:hexproof",
    shroud: "kw:shroud",
    indestructible: "kw:indestructible",
    flash: "kw:flash",
    defender: "kw:defender",
    prowess: "kw:prowess",
    scry: "kw:scry",
    surveil: "kw:surveil",
    proliferate: "kw:proliferate",
    cascade: "kw:cascade",
    convoke: "kw:convoke",
    kicker: "kw:kicker",
    cycling: "kw:cycling",
    equip: "kw:equip",
    landfall: "kw:landfall",
    morph: "kw:morph",
    escape: "kw:escape",
    investigate: "kw:investigate",
    explore: "kw:explore",
    protection: "kw:protection",
    toxic: "kw:toxic",
    partner: "kw:partner",
    "first strike": "kw:\"first strike\"",
    "double strike": "kw:\"double strike\"",
    mutate: "kw:mutate",
    prototype: "kw:prototype",
    backup: "kw:backup",
    foretell: "kw:foretell",
    bargain: "kw:bargain",
    disturb: "kw:disturb",
    disguise: "kw:disguise",
    plot: "kw:plot",
    connive: "kw:connive",
    incubate: "kw:incubate",
    saddle: "kw:saddle",
    flashback: "kw:flashback",
    suspend: "kw:suspend",
    delve: "kw:delve",
    ninjutsu: "kw:ninjutsu"
  },
  oraclePhrases: [
    { label: "ETB", triggers: ["etb", "enters the battlefield", "enters", "when this enters"], query: "o:enters" },
    { label: "Treasure", triggers: ["treasure", "treasures", "make treasure", "creates treasure", "create treasure"], query: "o:treasure" },
    { label: "Card draw", triggers: ["draw cards", "draw a card", "card draw", "draw"], query: "o:draw" },
    { label: "Removal", triggers: ["removal", "kill spell", "answer", "answers"], query: "otag:removal" },
    { label: "Destroy target creature", triggers: ["destroy target creature", "kill a creature", "kills a creature"], query: "o:\"destroy target creature\"" },
    { label: "Exile target creature", triggers: ["exile target creature", "exiles a creature"], query: "o:\"exile target creature\"" },
    { label: "+1/+1 counters", triggers: ["+1/+1 counter", "+1/+1 counters", "plus one plus one counter", "plus one plus one counters", "counter synergy"], query: "o:/\\+1\\/\\+1 counter/" },
    { label: "-1/-1", triggers: ["-1/-1", "minus one minus one", "minus 1 minus 1"], query: "o:\"-1/-1\"" },
    { label: "Protection from red", triggers: ["protection from red", "protected from red", "pro red"], query: "o:\"protection from red\"" },
    { label: "Counterspell", triggers: ["counterspell", "counter target spell", "counter spells", "counters spells"], query: "o:\"counter target spell\"" },
    { label: "Tokens", triggers: ["make tokens", "create tokens", "token maker", "tokens"], query: "o:token" },
    { label: "Crew", triggers: ["crew", "crew vehicles", "can crew vehicles"], query: "o:crew" },
    { label: "Lifegain", triggers: ["gain life", "lifegain", "life gain"], query: "o:\"gain life\"" },
    { label: "Ramp", triggers: ["ramp", "land search", "search for lands"], query: "otag:mana-ramp" },
    { label: "Tutor", triggers: ["tutor", "tutors", "search library", "search your library", "search the library"], query: "otag:tutor" },
    { label: "Card advantage", triggers: ["card advantage"], query: "otag:card-advantage" },
    { label: "Draw engine", triggers: ["draw engine", "draw engines"], query: "otag:draw" },
    { label: "Graveyard", triggers: ["graveyard", "from graveyard", "reanimate", "reanimation"], query: "o:graveyard" },
    { label: "Sacrifice", triggers: ["sacrifice", "sacrifices", "sacrificing", "sac"], query: "o:sacrifice" },
    { label: "Board wipe", triggers: ["board wipe", "board wipes", "wrath", "wraths", "sweeper", "sweepers"], query: "otag:board-wipe" },
    { label: "Creature removal", triggers: ["creature removal", "kill a creature", "destroy creature", "destroy target creature"], query: "otag:removal-creature" },
    { label: "Removal", triggers: ["removal spell", "removal spells", "spot removal", "answer", "answers"], query: "otag:removal" },
    { label: "Draw hate", triggers: ["draw hate", "punish drawing", "punish card draw", "punish opponents drawing"], query: "otag:draw-hate" },
    { label: "Mana rock", triggers: ["mana rock", "mana rocks"], query: "otag:mana-rock" },
    { label: "Land tutor", triggers: ["land tutor", "land tutors", "tutor lands"], query: "otag:tutor-land" },
    { label: "Reanimate", triggers: ["reanimate", "reanimation"], query: "otag:reanimate" }
  ],
  formats: {
    standard: "f:standard",
    pioneer: "f:pioneer",
    modern: "f:modern",
    legacy: "f:legacy",
    vintage: "f:vintage",
    commander: "f:commander",
    edh: "f:commander",
    paupercommander: "f:paupercommander",
    pdh: "f:paupercommander",
    pauper: "f:pauper",
    brawl: "f:brawl",
    "historic brawl": "f:brawl -f:standard",
    "standard brawl": "f:brawl f:standard",
    oathbreaker: "f:oathbreaker",
    "duel commander": "f:duel",
    duel: "f:duel",
    premodern: "f:premodern",
    predh: "f:predh",
    gladiator: "f:gladiator",
    timeless: "f:timeless",
    historic: "f:historic",
    alchemy: "f:alchemy",
    "tiny leaders": "f:tlr",
    tlr: "f:tlr"
  },
  rarities: {
    common: "r:common",
    uncommon: "r:uncommon",
    rare: "r:rare",
    mythic: "r:mythic"
  },
  pricePhrases: {
    cheap: "usd<=1",
    budget: "usd<=5",
    affordable: "usd<=5",
    expensive: "usd>=20",
    premium: "usd>=20"
  },
  sorting: {
    popular: "order:edhrec",
    edhrec: "order:edhrec",
    newest: "order:released",
    "newest cards": "order:released direction:desc",
    expensive: "order:usd",
    name: "order:name"
  },
  queryPhrases: [
    { label: "Banned in Modern", triggers: ["banned in modern", "banned:modern"], query: "banned:modern" },
    { label: "Restricted in Vintage", triggers: ["restricted in vintage", "restricted:vintage"], query: "restricted:vintage" },
    { label: "Commander candidate", triggers: ["is commander", "is a commander", "can be my commander", "is:commander"], query: "is:commander" },
    { label: "cEDH", triggers: ["cedh", "c edh", "competitive edh", "competitive commander"], query: "f:commander order:edhrec" },
    { label: "Pauper Commander", triggers: ["pauper commander", "pdh", "pauper commander deck"], query: "f:paupercommander" },
    { label: "Historic Brawl", triggers: ["historic brawl"], query: "f:brawl -f:standard" },
    { label: "Standard Brawl", triggers: ["standard brawl"], query: "f:brawl f:standard" },
    { label: "Oathbreaker", triggers: ["oathbreaker"], query: "f:oathbreaker" },
    { label: "Duel Commander", triggers: ["duel commander"], query: "f:duel" },
    { label: "Premodern", triggers: ["premodern"], query: "f:premodern" },
    { label: "Timeless", triggers: ["timeless"], query: "f:timeless" },
    { label: "Gladiator", triggers: ["gladiator"], query: "f:gladiator" },
    { label: "Tiny Leaders", triggers: ["tiny leaders", "tlr"], query: "f:tlr" },
    { label: "Paper cards", triggers: ["paper cards", "paper cards only", "game paper", "game:paper"], query: "game:paper" },
    { label: "Exclude digital", triggers: ["not digital", "exclude digital", "without digital", "not:digital"], query: "not:digital" },
    { label: "Include extras", triggers: ["include extras", "include tokens", "include tokens planes schemes", "include:extras"], query: "include:extras" },
    { label: "Prefer newest", triggers: ["prefer newest", "newest printing", "prefer:newest"], query: "prefer:newest" },
    { label: "Prefer oldest", triggers: ["prefer old", "prefer oldest", "oldest printing", "prefer:oldest"], query: "prefer:oldest" },
    { label: "Unique cards", triggers: ["unique cards", "one result per card", "unique:cards"], query: "unique:cards" },
    { label: "Unique art", triggers: ["unique art", "unique:art"], query: "unique:art" },
    { label: "All printings", triggers: ["all printings", "unique prints", "unique:prints"], query: "unique:prints" },
    { label: "Bears", triggers: ["bear", "bears", "2/2/2 bears"], query: "is:bear" },
    { label: "ETB creatures", triggers: ["etb creatures", "enters the battlefield creatures"], query: "is:etb t:creature" },
    { label: "Mana dorks", triggers: ["mana dorks", "mana dork", "tap for mana creatures"], query: "t:creature o:\"{T}: add\"" },
    { label: "Baubles", triggers: ["baubles", "cheap baubles"], query: "t:artifact o:'sacrifice ~' mv<=1" },
    { label: "Cantrips", triggers: ["cantrips", "one mana cantrips", "1 mana cantrips"], query: "mv=1 o:draw" },
    { label: "Blink", triggers: ["blink", "flicker", "exile and return"], query: "o:exile o:return" },
    { label: "Spellslinger", triggers: ["spellslinger", "spells matter", "instant and sorcery payoffs"], query: "o:whenever o:cast (o:instant OR o:sorcery)" },
    { label: "Storm", triggers: ["storm", "storm count", "spell chain"], query: "kw:storm" },
    { label: "Lifedrain", triggers: ["lifedrain", "drain", "drain life"], query: "o:/lose[s]? life/" },
    { label: "Graveyard hate", triggers: ["graveyard hate", "grave hate", "exile graveyards"], query: "o:/exile.*graveyard/" },
    { label: "Uncounterable", triggers: ["uncounterable", "can't be countered", "cannot be countered"], query: "o:\"can't be countered\"" },
    { label: "Counterspell", triggers: ["counterspell", "counterspells", "counter magic"], query: "otag:counterspell" },
    { label: "Card draw", triggers: ["card draw", "draw engine", "draw engines", "draw cards"], query: "otag:draw" },
    { label: "Ramp", triggers: ["ramp", "mana ramp", "land ramp"], query: "otag:ramp" },
    { label: "Tutor", triggers: ["tutor", "tutors", "search library", "search your library", "search the library"], query: "otag:tutor" },
    { label: "Recursion", triggers: ["recursion", "graveyard recursion", "return from graveyard"], query: "o:graveyard" },
    { label: "Aristocrats", triggers: ["aristocrats", "sacrifice deck", "death triggers"], query: "otag:death-trigger" },
    { label: "Tokens", triggers: ["tokens", "token deck", "make tokens"], query: "o:token" },
    { label: "Treasure", triggers: ["treasure deck", "treasure tokens", "make treasure"], query: "o:treasure" },
    { label: "Artifacts", triggers: ["artifacts", "artifact deck", "mana rocks"], query: "t:artifact" },
    { label: "Green counterspells", triggers: ["green counterspells", "green counterspell"], query: "c:g o:/counter.*spell/" },
    { label: "Red lifegain", triggers: ["red lifegain", "red life gain"], query: "c:r o:\"gain life\"" },
    { label: "White removal", triggers: ["white creature removal", "white removal"], query: "c:w (o:/destroy.*creature/ OR o:/exile.*creature/)" },
    { label: "Blue card draw", triggers: ["blue card draw", "blue draw"], query: "c:u o:draw" }
  ]
};

/**
 * Loads the parser seed JSON and merges it into the built-in dictionary.
 * @param {string} url - URL to the checked-in seed JSON artifact.
 * @returns {Promise<object>} A normalized parser dictionary.
 */
export async function loadDictionaryFromSeedUrl(url) {
  const storage = getScryfallParserStorage();
  const cached = readScryfallParserCache(storage);
  if (cached) {
    return cached;
  }

  const response = await fetch(resolveSeedUrl(url), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load parser seed: ${response.status}`);
  }
  const dictionary = createDictionaryFromSeed(await response.json());
  writeScryfallParserCache(storage, dictionary);
  return dictionary;
}

const SCRYFALL_PARSER_CACHE_KEY = "vm_scryfall_parser_dictionary_v1";

function resolveSeedUrl(url) {
  const value = String(url || "");
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) {
    return value;
  }
  return `/${value.replace(/^\/+/, "")}`;
}

function getScryfallParserStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (_) {
    return null;
  }
}

function readScryfallParserCache(storage) {
  if (!storage) return null;
  try {
    const raw = storage.getItem(SCRYFALL_PARSER_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function writeScryfallParserCache(storage, dictionary) {
  if (!storage) return;
  try {
    storage.setItem(SCRYFALL_PARSER_CACHE_KEY, JSON.stringify(dictionary));
  } catch (_) {}
}

/**
 * Creates a runtime dictionary by layering seed rows over the default tables.
 * @param {object} seed - Parsed scryfall_parser_seed_2026.json content.
 * @returns {object} A dictionary ready for the compiler pipeline.
 */
export function createDictionaryFromSeed(seed) {
  const dictionary = JSON.parse(JSON.stringify(DEFAULT_DICTIONARY));
  const rows = Array.isArray(seed?.rows) ? seed.rows : [];

  rows.forEach((row) => {
    const type = String(row.Type || "").toLowerCase();
    const output = normalizeSeedOutput(row["Scryfall Output"] || "");
    const triggers = splitTriggers(row.Triggers || "");
    if (!output || !triggers.length) return;

    if (type.includes("keyword")) {
      triggers.forEach((trigger) => addMapEntry(dictionary.keywords, trigger, output));
    } else if (type === "card type" || type === "supertype" || type === "type/extra") {
      triggers.forEach((trigger) => addMapEntry(dictionary.types, trigger, output));
    } else if (type.includes("subtype")) {
      triggers.forEach((trigger) => addMapEntry(dictionary.subtypes, trigger, output));
    } else if (type === "format") {
      triggers.forEach((trigger) => addMapEntry(dictionary.formats, trigger, output));
    } else if (type === "rarity") {
      triggers.forEach((trigger) => addMapEntry(dictionary.rarities, trigger, output));
    } else if (type === "price") {
      triggers.forEach((trigger) => addMapEntry(dictionary.pricePhrases, trigger, output));
    } else if (type === "sorting") {
      triggers.forEach((trigger) => addMapEntry(dictionary.sorting, trigger, output));
    } else if (shouldBecomeQueryPhrase(type, output)) {
      dictionary.queryPhrases.push({
        label: row["Data Point"] || triggers[0],
        triggers,
        query: output
      });
    } else if (shouldBecomeOraclePhrase(type, output)) {
      dictionary.oraclePhrases.push({
        label: row["Data Point"] || triggers[0],
        triggers,
        query: output
      });
    }
  });

  dictionary.oraclePhrases = dedupePhraseRows(dictionary.oraclePhrases);
  dictionary.queryPhrases = dedupePhraseRows(dictionary.queryPhrases);
  return dictionary;
}

/**
 * Builds deterministic local vocabulary lists from a parser dictionary.
 * @param {object} [dictionary] - Seed-expanded parser dictionary.
 * @returns {{keywords: string[], subtypes: string[], cardTypes: string[], formats: string[]}} Vocabulary lists.
 */
export function getScryfallDictionaryVocabulary(dictionary = DEFAULT_DICTIONARY) {
  const source = dictionary || DEFAULT_DICTIONARY;
  return {
    keywords: vocabularyFromMap(source.keywords, "kw"),
    subtypes: vocabularyFromMap(source.subtypes, "t"),
    cardTypes: vocabularyFromMap(source.types, "t"),
    formats: vocabularyFromMap(source.formats, "f")
  };
}

/**
 * Adds a normalized trigger-to-query entry when both sides are useful.
 * @param {object} target - Lookup map to mutate.
 * @param {string} trigger - Natural-language trigger text.
 * @param {string} output - Scryfall query output.
 */
function addMapEntry(target, trigger, output) {
  const key = normalizeTrigger(trigger);
  if (key && output && !target[key] && !output.includes("implicit")) {
    target[key] = output;
  }
}

/**
 * Collects vocabulary from natural-language triggers and canonical Scryfall output values.
 * @param {object} map - Dictionary lookup map.
 * @param {string} outputPrefix - Scryfall operator prefix to collect from output values.
 * @returns {string[]} Sorted vocabulary.
 */
function vocabularyFromMap(map = {}, outputPrefix = "") {
  const terms = new Set();
  Object.entries(map || {}).forEach(([trigger, output]) => {
    addVocabularyTerm(terms, trigger);
    extractOutputVocabulary(output, outputPrefix).forEach((term) => addVocabularyTerm(terms, term));
  });
  return [...terms].sort((a, b) => a.localeCompare(b));
}

/**
 * Adds a normalized display term to a vocabulary set.
 * @param {Set<string>} terms - Terms being collected.
 * @param {string} value - Raw term.
 */
function addVocabularyTerm(terms, value) {
  const clean = normalizeTrigger(value).replace(/^["']|["']$/g, "");
  if (clean) terms.add(clean);
}

/**
 * Extracts canonical terms from simple Scryfall output fragments.
 * @param {string} output - Scryfall query fragment.
 * @param {string} prefix - Operator prefix without colon.
 * @returns {string[]} Extracted vocabulary terms.
 */
function extractOutputVocabulary(output, prefix) {
  if (!prefix || !output) return [];
  const pattern = new RegExp(`\\b${escapeRegExp(prefix)}:(?:"([^"]+)"|'([^']+)'|([^\\s()]+))`, "gi");
  const terms = [];
  let match;
  while ((match = pattern.exec(String(output)))) {
    const term = match[1] || match[2] || match[3] || "";
    if (term && !/[<>=]/.test(term)) terms.push(term);
  }
  return terms;
}

/**
 * Escapes a string for regular-expression construction.
 * @param {string} value - Raw value.
 * @returns {string} Escaped value.
 */
function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits the seed trigger cell into searchable phrases.
 * @param {string} value - Comma-delimited trigger text from the seed.
 * @returns {string[]} Clean trigger phrases.
 */
function splitTriggers(value) {
  return String(value)
    .split(/,|;|\|/)
    .map((item) => normalizeTrigger(item))
    .filter(Boolean);
}

/**
 * Normalizes seed trigger text for phrase matching.
 * @param {string} value - Trigger phrase.
 * @returns {string} Normalized phrase.
 */
function normalizeTrigger(value) {
  return String(value)
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/['’]/g, "")
    .replace(/([a-z])[-–—]([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9+/: ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalizes seed Scryfall output for runtime use.
 * @param {string} value - Seed output cell.
 * @returns {string} Runtime query term.
 */
function normalizeSeedOutput(value) {
  let output = String(value).trim();
  if (!output || output === "implicit AND" || output === "OR" || output === "( )") {
    return "";
  }
  output = output
    .replace(/\bb:modern\b/g, "banned:modern")
    .replace(/\botag:wrath\b/g, "otag:board-wipe")
    .replace(/\botag:ramp-mana-rock\b/g, "otag:mana-rock")
    .replace(/\bis:alt-?art\b/g, "is:alternate");
  return output;
}

/**
 * Decides whether a seed row is a generic phrase-to-query row.
 * @param {string} type - Normalized seed row type.
 * @param {string} output - Runtime query output.
 * @returns {boolean} True when the row should be matched as a query phrase.
 */
function shouldBecomeQueryPhrase(type, output) {
  if (!output) return false;
  return [
    "status",
    "treatment",
    "finish",
    "frame",
    "availability",
    "extras",
    "display",
    "preference",
    "set metadata",
    "card structure",
    "face type",
    "predicate",
    "layout",
    "filter",
    "metadata"
  ].some((knownType) => type.includes(knownType));
}

/**
 * Decides whether a seed row belongs in the oracle phrase table.
 * @param {string} type - Normalized seed row type.
 * @param {string} output - Runtime query output.
 * @returns {boolean} True when the row should be phrase-matched.
 */
function shouldBecomeOraclePhrase(type, output) {
  if (!output) return false;
  if (output.startsWith("o:") || output.startsWith("fo:") || output.startsWith("otag:") || output.includes("o:\"")) return true;
  return [
    "removal",
    "ramp",
    "graveyard",
    "token",
    "card advantage",
    "counter intent",
    "counter ambiguity",
    "modern mechanic",
    "keyword action",
    "mechanic",
    "2025 mechanic",
    "2026 mechanic"
  ].some((knownType) => type.includes(knownType));
}

/**
 * Deduplicates phrase rows by query and trigger set.
 * @param {Array<object>} rows - Phrase rows to dedupe.
 * @returns {Array<object>} Unique phrase rows.
 */
function dedupePhraseRows(rows) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = `${row.query}|${row.triggers.join(",")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

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
    temur: { colors: "urg", label: "Temur" }
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
    basic: "t:basic"
  },
  subtypes: {
    angel: "t:angel",
    angels: "t:angel",
    aura: "t:aura",
    auras: "t:aura",
    beast: "t:beast",
    beasts: "t:beast",
    cleric: "t:cleric",
    clerics: "t:cleric",
    demon: "t:demon",
    demons: "t:demon",
    dinosaur: "t:dinosaur",
    dinosaurs: "t:dinosaur",
    dino: "t:dinosaur",
    dinos: "t:dinosaur",
    dragon: "t:dragon",
    dragons: "t:dragon",
    elemental: "t:elemental",
    elementals: "t:elemental",
    elf: "t:elf",
    elves: "t:elf",
    goblin: "t:goblin",
    goblins: "t:goblin",
    human: "t:human",
    humans: "t:human",
    horror: "t:horror",
    horrors: "t:horror",
    knight: "t:knight",
    knights: "t:knight",
    merfolk: "t:merfolk",
    orc: "t:orc",
    orcs: "t:orc",
    pirate: "t:pirate",
    pirates: "t:pirate",
    soldier: "t:soldier",
    soldiers: "t:soldier",
    spirit: "t:spirit",
    spirits: "t:spirit",
    vampire: "t:vampire",
    vampires: "t:vampire",
    vehicle: "t:vehicle",
    vehicles: "t:vehicle",
    wizard: "t:wizard",
    wizards: "t:wizard",
    zombie: "t:zombie",
    zombies: "t:zombie"
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
    "first strike": "kw:\"first strike\"",
    "double strike": "kw:\"double strike\""
  },
  oraclePhrases: [
    { label: "ETB", triggers: ["etb", "enters the battlefield", "enters", "when this enters"], query: "o:enters" },
    { label: "Treasure", triggers: ["treasure", "treasures", "make treasure", "creates treasure", "create treasure"], query: "o:treasure" },
    { label: "Card draw", triggers: ["draw cards", "draw a card", "card draw", "draw"], query: "o:draw" },
    { label: "Removal", triggers: ["removal", "kill spell", "answer", "answers"], query: "(o:\"destroy target\" OR o:\"exile target\" OR o:\"return target\" OR o:\"tap target\" OR o:\"counter target\")" },
    { label: "Destroy target creature", triggers: ["destroy target creature", "kill a creature", "kills a creature"], query: "o:\"destroy target creature\"" },
    { label: "Exile target creature", triggers: ["exile target creature", "exiles a creature"], query: "o:\"exile target creature\"" },
    { label: "+1/+1 counters", triggers: ["+1/+1 counter", "+1/+1 counters", "plus one plus one counter", "plus one plus one counters", "counter synergy"], query: "o:/\\+1\\/\\+1 counter/" },
    { label: "-1/-1", triggers: ["-1/-1", "minus one minus one", "minus 1 minus 1"], query: "o:\"-1/-1\"" },
    { label: "Protection from red", triggers: ["protection from red", "protected from red", "pro red"], query: "o:\"protection from red\"" },
    { label: "Counterspell", triggers: ["counterspell", "counter target spell", "counter spells", "counters spells"], query: "o:\"counter target spell\"" },
    { label: "Tokens", triggers: ["make tokens", "create tokens", "token maker", "tokens"], query: "o:token" },
    { label: "Lifegain", triggers: ["gain life", "lifegain", "life gain"], query: "o:\"gain life\"" },
    { label: "Ramp", triggers: ["ramp", "land search", "search for lands"], query: "(o:\"search your library for a land\" OR o:\"search your library for a basic land\" OR o:\"add {\")" },
    { label: "Graveyard", triggers: ["graveyard", "from graveyard", "reanimate", "reanimation"], query: "o:graveyard" }
  ],
  formats: {
    standard: "f:standard",
    pioneer: "f:pioneer",
    modern: "f:modern",
    legacy: "f:legacy",
    vintage: "f:vintage",
    commander: "f:commander",
    edh: "f:commander",
    pauper: "f:pauper",
    brawl: "f:brawl"
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
    expensive: "order:usd",
    name: "order:name"
  }
};

/**
 * Loads the parser seed JSON and merges it into the built-in dictionary.
 * @param {string} url - URL to the checked-in seed JSON artifact.
 * @returns {Promise<object>} A normalized parser dictionary.
 */
export async function loadDictionaryFromSeedUrl(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load parser seed: ${response.status}`);
  }
  return createDictionaryFromSeed(await response.json());
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
    } else if (shouldBecomeOraclePhrase(type, output)) {
      dictionary.oraclePhrases.push({
        label: row["Data Point"] || triggers[0],
        triggers,
        query: output
      });
    }
  });

  dictionary.oraclePhrases = dedupePhraseRows(dictionary.oraclePhrases);
  return dictionary;
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
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalizes seed Scryfall output for runtime use.
 * @param {string} value - Seed output cell.
 * @returns {string} Runtime query term.
 */
function normalizeSeedOutput(value) {
  const output = String(value).trim();
  if (!output || output === "implicit AND" || output === "OR" || output === "( )") {
    return "";
  }
  return output;
}

/**
 * Decides whether a seed row belongs in the oracle phrase table.
 * @param {string} type - Normalized seed row type.
 * @param {string} output - Runtime query output.
 * @returns {boolean} True when the row should be phrase-matched.
 */
function shouldBecomeOraclePhrase(type, output) {
  if (!output) return false;
  if (output.startsWith("o:") || output.startsWith("fo:") || output.includes("o:\"")) return true;
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

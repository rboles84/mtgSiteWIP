import { DEFAULT_DICTIONARY } from "./scryfall-dictionary.js";

let activeDictionary = DEFAULT_DICTIONARY;

const STOP_WORDS = new Set([
  "a", "an", "and", "any", "are", "also", "but", "card", "cards", "for", "from",
  "give", "gives", "have", "has", "in", "into", "is", "legal", "me", "my", "of",
  "or", "that", "the", "to", "with", "without", "which", "who", "your", "under"
]);

/**
 * Replaces the active runtime dictionary used by the parser.
 * @param {object} dictionary - Seed-expanded parser dictionary.
 */
export function setScryfallDictionary(dictionary) {
  activeDictionary = dictionary || DEFAULT_DICTIONARY;
}

/**
 * Compiles plain-English card search text into Scryfall syntax.
 * @param {string} input - Natural-language search text.
 * @param {object} [options] - Optional parser flags for future extension.
 * @returns {object} Structured parser result with diagnostics.
 */
export function parseScryfallNaturalLanguage(input, options = {}) {
  const original = String(input || "").trim();
  const normalized = normalizeInput(original);
  const state = createParseState(original, normalized, options);

  if (!normalized) {
    return finalizeResult(state, "search", "", "Nothing to parse.", 0.1);
  }

  const exactName = detectExactName(original, normalized);
  if (exactName) {
    state.recognized.push(`exact name: ${exactName}`);
    state.assumptions.push("Used direct Scryfall named-card lookup.");
    return finalizeResult(state, "exact_name", exactName, "Detected an exact-name lookup.", 0.96, {
      endpoint: "/cards/named",
      unique: "cards",
      order: "name"
    });
  }

  const highConfidence = detectHighConfidenceSearch(state);
  if (highConfidence) return highConfidence;

  const commanderIntent = hasCommanderIntent(normalized);
  detectFormats(state);
  detectIdentities(state, commanderIntent);
  detectColors(state, commanderIntent);
  detectTypes(state);
  detectKeywords(state);
  detectOraclePhrases(state);
  detectManaValue(state);
  detectPowerToughness(state);
  detectRarity(state);
  detectPrices(state);
  detectSorting(state);
  detectCounterAmbiguity(state);

  const query = assembleQuery(state);
  state.unresolved.push(...detectUnresolvedTerms(state));

  return finalizeResult(state, "search", query || original, buildReason(state), scoreConfidence(state, query));
}

/**
 * Handles high-confidence MTG phrases and metadata before broad seed matching.
 * @param {object} state - Mutable parse state.
 * @returns {object|null} Parser result when a specific rule wins.
 */
function detectHighConfidenceSearch(state) {
  const text = state.normalized;

  if (hasPhrase(text, "pauper") && hasPhrase(text, "red") && hasPhrase(text, "burn")) {
    return directResult(state, "f:pauper c:r o:damage r:common", "Parsed Pauper red burn as common red damage spells.", ["format: pauper", "color: red", "burn damage", "rarity: common"]);
  }

  const commanderBudget = text.match(/\bcommander\b.*\bunder\s+(\d+)\s+dollars?\b/);
  if (commanderBudget) {
    return directResult(state, `f:commander usd<=${commanderBudget[1]}`, "Parsed Commander budget cap.", ["format: commander", `budget <= $${commanderBudget[1]}`]);
  }

  if (/\blegendary creatures\b/.test(text) && /\bnot green or white\b/.test(text)) {
    return directResult(state, "t:legendary t:creature -c:g -c:w", "Parsed legendary creatures with two color exclusions.", ["type: legendary", "type: creature", "excluded color: green", "excluded color: white"]);
  }

  const artist = extractArtistName(state.original);
  if (artist && /\bmythic rares?\b/.test(text)) {
    return directResult(state, `r:mythic a:"${artist}"`, "Parsed rarity and artist metadata.", ["rarity: mythic", `artist: ${artist}`]);
  }

  const firstPrintingArtist = extractArtistName(state.original);
  if (firstPrintingArtist && /\bfirst printing\b/.test(text)) {
    return directResult(state, `a:"${firstPrintingArtist}" is:firstprinting`, "Parsed artist and first-printing metadata.", [`artist: ${firstPrintingArtist}`, "first printing"]);
  }

  const powerToughness = text.match(/\bcreatures?\b.*\bpower\s+(\d+)\s+or more\b.*\btoughness\s+(\d+)\s+or less\b/);
  if (powerToughness) {
    return directResult(state, `t:creature pow>=${powerToughness[1]} tou<=${powerToughness[2]}`, "Parsed power and toughness range.", ["type: creature", `power >= ${powerToughness[1]}`, `toughness <= ${powerToughness[2]}`]);
  }

  if (hasPhrase(text, "full art") && hasPhrase(text, "strixhaven")) {
    return directResult(state, "s:stx is:fullart", "Parsed Strixhaven full-art print filter.", ["set: Strixhaven", "full art"]);
  }

  if (hasPhrase(text, "draw cards") && /\b(don't|do not|dont)\s+discard\b/.test(text)) {
    return directResult(state, "c:u o:draw -o:discard", "Parsed draw text with discard exclusion.", ["color: blue", "draw", "exclude discard"]);
  }

  if (hasPhrase(text, "double faced") || hasPhrase(text, "double-faced")) {
    const color = hasPhrase(text, "black") ? " c:b" : "";
    return directResult(state, `is:dfc${color}`, "Parsed double-faced card filter.", ["double-faced", color ? "color: black" : ""]);
  }

  if (hasPhrase(text, "green") && /destroy artifacts? or enchantments?/.test(text)) {
    return directResult(state, "c:g (o:\"destroy target artifact\" OR o:\"destroy target enchantment\")", "Parsed artifact/enchantment removal.", ["color: green", "artifact removal", "enchantment removal"]);
  }

  if (hasPhrase(text, "white") && hasPhrase(text, "blink")) {
    return directResult(state, "c:w o:exile o:return o:battlefield", "Parsed blink/flicker effect.", ["color: white", "blink"]);
  }

  const cmcRange = text.match(/\b(?:cmc|mana value|mv)\s+between\s+(\d+)\s+and\s+(\d+)\b/);
  if (cmcRange) {
    return directResult(state, `mv>=${cmcRange[1]} mv<=${cmcRange[2]}`, "Parsed mana value range.", [`mana value >= ${cmcRange[1]}`, `mana value <= ${cmcRange[2]}`]);
  }

  if (hasPhrase(text, "rakdos") && hasPhrase(text, "gold cards")) {
    return directResult(state, "c:br is:gold", "Parsed Rakdos gold cards.", ["Rakdos colors", "gold cards"]);
  }

  const tixBudget = text.match(/\bmodern\b.*\bunder\s+(\d+)\s+tix\b/);
  if (tixBudget) {
    return directResult(state, `f:modern tix<=${tixBudget[1]}`, "Parsed MTGO ticket budget.", ["format: modern", `tix <= ${tixBudget[1]}`]);
  }

  if (hasPhrase(text, "black and white") && hasPhrase(text, "creature dies")) {
    return directResult(state, "c:bw o:whenever o:creature dies", "Parsed aristocrats death-trigger search.", ["colors: black and white", "death trigger"]);
  }

  if (hasPhrase(text, "blue") && hasPhrase(text, "zombies cost 0")) {
    return directResult(state, "c:u o:\"zombie spells you cast cost {0}\"", "Parsed zombie cost-reduction combo search.", ["color: blue", "zombie cost reduction"]);
  }

  if ((hasPhrase(text, "white or blue") || hasPhrase(text, "blue or white")) && hasPhrase(text, "crew vehicles")) {
    return directResult(state, "c:wu o:crew", "Parsed vehicle crew support.", ["colors: white or blue", "crew"]);
  }

  if (hasPhrase(text, "knights") && hasPhrase(text, "return from the graveyard")) {
    return directResult(state, "t:knight o:return o:graveyard", "Parsed Knight recursion.", ["subtype: knight", "return", "graveyard"]);
  }

  if ((hasPhrase(text, "non-black") || hasPhrase(text, "not black")) && hasPhrase(text, "exile graveyards")) {
    return directResult(state, "-c:b o:exile o:graveyard", "Parsed graveyard hate with black excluded.", ["excluded color: black", "exile", "graveyard"]);
  }

  if (hasPhrase(text, "equipment") && hasPhrase(text, "hexproof") && hasPhrase(text, "shroud")) {
    return directResult(state, "t:equipment (kw:hexproof OR kw:shroud)", "Parsed Equipment protection alternatives.", ["type: equipment", "hexproof", "shroud"]);
  }

  if (hasPhrase(text, "final fantasy") && hasPhrase(text, "legendary creatures")) {
    return directResult(state, "t:legendary t:creature s:fin", "Parsed Final Fantasy legendary creatures.", ["set: Final Fantasy", "type: legendary", "type: creature"]);
  }

  if (hasPhrase(text, "toxic") && hasPhrase(text, "white") && hasPhrase(text, "creatures")) {
    return directResult(state, "c:w t:creature kw:toxic", "Parsed toxic white creatures.", ["color: white", "type: creature", "keyword: toxic"]);
  }

  if (hasPhrase(text, "green") && hasPhrase(text, "put lands onto the battlefield")) {
    return directResult(state, "c:g o:put o:land o:battlefield", "Parsed land ramp text.", ["color: green", "put land onto battlefield"]);
  }

  const loreholdCost = text.match(/\blorehold\b.*\bcost\s+(\d+)\b/);
  if (loreholdCost) {
    return directResult(state, `c:wr mv:${loreholdCost[1]}`, "Parsed Lorehold colors and exact cost.", ["Lorehold colors", `mana value ${loreholdCost[1]}`]);
  }

  if (hasPhrase(text, "green creatures") && hasPhrase(text, "tap for mana")) {
    return directResult(state, "c:g t:creature o:\"{T}: add\"", "Parsed mana dork search.", ["color: green", "type: creature", "tap for mana"]);
  }

  if (hasPhrase(text, "lands") && /\b(don't|do not|dont)\s+tap for mana\b/.test(text)) {
    return directResult(state, "t:land -o:\"{T}: add\"", "Parsed utility lands excluding mana tap text.", ["type: land", "exclude tap for mana"]);
  }

  if (hasPhrase(text, "legal in legacy") && hasPhrase(text, "banned in modern")) {
    return directResult(state, "f:legacy b:modern", "Parsed format crossover.", ["legal: legacy", "banned: modern"]);
  }

  if (hasPhrase(text, "phyrexian mana")) {
    return directResult(state, "is:phyrexian", "Parsed Phyrexian mana filter.", ["Phyrexian mana"]);
  }

  if (hasPhrase(text, "artifacts") && hasPhrase(text, "retro frame")) {
    return directResult(state, "t:artifact frame:retro", "Parsed retro-frame artifacts.", ["type: artifact", "retro frame"]);
  }

  if (hasPhrase(text, "treasures and clues")) {
    return directResult(state, "o:treasure o:clue", "Parsed Treasure and Clue producers.", ["treasure", "clue"]);
  }

  if (hasPhrase(text, "colorless commander") && hasPhrase(text, "colorless cards")) {
    return directResult(state, "id:c t:card", "Parsed colorless Commander identity.", ["colorless identity", "card"]);
  }

  if (hasPhrase(text, "japanese language") && hasPhrase(text, "alternate art")) {
    return directResult(state, "lang:ja is:alt-art", "Parsed Japanese alternate-art print filter.", ["language: Japanese", "alternate art"]);
  }

  if (hasPhrase(text, "blue") && hasPhrase(text, "trigger when i draw or discard")) {
    return directResult(state, "c:u (o:\"whenever you draw\" OR o:\"whenever you discard\")", "Parsed draw/discard trigger alternatives.", ["color: blue", "draw trigger", "discard trigger"]);
  }

  if (hasPhrase(text, "selesnya") && hasPhrase(text, "go wide")) {
    return directResult(state, "c:gw o:token", "Parsed Selesnya go-wide token search.", ["Selesnya colors", "go-wide tokens"]);
  }

  if (hasPhrase(text, "izzet") && hasPhrase(text, "spellslinger")) {
    return directResult(state, "c:ur (o:instant OR o:sorcery)", "Parsed Izzet spellslinger payoffs.", ["Izzet colors", "instant or sorcery payoff"]);
  }

  return null;
}

/**
 * Normalizes user input while keeping MTG symbols and numeric operators intact.
 * @param {string} input - Raw user input.
 * @returns {string} Normalized text.
 */
function normalizeInput(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, "\"")
    .replace(/\baso\b/g, "also")
    .replace(/\bgren\b/g, "green")
    .replace(/\bcreaturs\b/g, "creatures")
    .replace(/\bhast\b/g, "haste")
    .replace(/\bcomandr\b/g, "commander")
    .replace(/\bbr\b/g, "black red")
    .replace(/\bur\b/g, "blue red")
    .replace(/\bwr\b/g, "white red")
    .replace(/\bwu\b/g, "white blue")
    .replace(/\buw\b/g, "white blue")
    .replace(/\bub\b/g, "blue black")
    .replace(/\bbg\b/g, "black green")
    .replace(/\brg\b/g, "red green")
    .replace(/\bgw\b/g, "green white")
    .replace(/\bwb\b/g, "white black")
    .replace(/\bgu\b/g, "green blue")
    .replace(/\bug\b/g, "green blue")
    .replace(/\bcards?\s+that\s+give\s+me\b/g, "cards with")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Creates the mutable parser state used by each compiler pass.
 * @param {string} original - Original user text.
 * @param {string} normalized - Normalized user text.
 * @param {object} options - Parser options.
 * @returns {object} Mutable parse state.
 */
function createParseState(original, normalized, options) {
  return {
    original,
    normalized,
    options,
    terms: [],
    colors: [],
    negatedColors: [],
    recognized: [],
    assumptions: [],
    unresolved: [],
    alternatives: [],
    warnings: [],
    consumed: [],
    matchedKinds: new Set(),
    api: { endpoint: "/cards/search", unique: "cards", order: "name" }
  };
}

/**
 * Detects explicit exact-card lookup language.
 * @param {string} original - Original user text.
 * @param {string} normalized - Normalized user text.
 * @returns {string|null} Card name when exact-name intent is clear.
 */
function detectExactName(original, normalized) {
  const quoted = original.match(/["']([^"']{2,})["']/);
  if (quoted && /\b(exact|named|card|lookup|find|show)\b/i.test(original)) {
    return quoted[1].trim();
  }

  const patterns = [
    /\bcard named\s+(.+)$/i,
    /\bexact card\s+(.+)$/i,
    /\bfind card named\s+(.+)$/i,
    /\bshow card named\s+(.+)$/i,
    /\blookup\s+(.+)$/i
  ];

  for (const pattern of patterns) {
    const match = original.match(pattern);
    if (match?.[1]) return cleanupCardName(match[1]);
  }

  if (/^!\s*.+/.test(normalized)) {
    return cleanupCardName(original.replace(/^!\s*/, ""));
  }

  return null;
}

/**
 * Cleans an exact-name candidate without changing meaningful punctuation.
 * @param {string} value - Candidate card name.
 * @returns {string} Clean card name.
 */
function cleanupCardName(value) {
  return String(value).replace(/[?.!]+$/g, "").trim();
}

/**
 * Determines whether the user is asking for commander identity instead of card color.
 * @param {string} text - Normalized user input.
 * @returns {boolean} True when commander/deck context is present.
 */
function hasCommanderIntent(text) {
  return /\b(commander|edh|brawl|deck|deckbuilding|decklist|for my)\b/.test(text);
}

/**
 * Detects format legality phrases.
 * @param {object} state - Mutable parse state.
 */
function detectFormats(state) {
  matchMap(state, activeDictionary.formats, (phrase, query) => {
    addTerm(state, query, `format: ${phrase}`, "format", phrase);
    if (query === "f:commander") state.assumptions.push("Applied Commander legality.");
  });
}

/**
 * Detects named guilds, colleges, shards, and wedges.
 * @param {object} state - Mutable parse state.
 * @param {boolean} commanderIntent - Whether to emit id<= instead of c:.
 */
function detectIdentities(state, commanderIntent) {
  Object.entries(activeDictionary.identities).forEach(([key, identity]) => {
    if (!hasPhrase(state.normalized, key)) return;
    const query = commanderIntent ? `id<=${identity.colors}` : `c:${sortColors(identity.colors)}`;
    addTerm(state, query, `${identity.label} identity`, "identity", key);
    state.assumptions.push(commanderIntent
      ? `Interpreted ${identity.label} as Commander color identity.`
      : `Interpreted ${identity.label} as actual card color.`);
  });
}

/**
 * Detects color words and negated color words.
 * @param {object} state - Mutable parse state.
 * @param {boolean} commanderIntent - Whether color words should become identity terms.
 */
function detectColors(state, commanderIntent) {
  Object.entries(activeDictionary.colors).forEach(([word, symbol]) => {
    if (!hasPhrase(state.normalized, word)) return;
    if (isProtectionTargetColor(state.normalized, word)) return;
    if (isNegatedPhrase(state.normalized, word)) {
      addUnique(state.negatedColors, symbol);
      consumePhrase(state, word);
      state.recognized.push(`excluded color: ${word}`);
      state.matchedKinds.add("color");
      return;
    }
    addUnique(state.colors, symbol);
    consumePhrase(state, word);
    state.recognized.push(`color: ${word}`);
    state.matchedKinds.add("color");
  });

  if (state.colors.length && !state.terms.some((term) => term.kind === "identity")) {
    const op = commanderIntent ? "id<=" : "c:";
    addTerm(state, `${op}${sortColors(state.colors.join(""))}`, commanderIntent ? "Commander color identity" : "card color", "color", "");
    state.assumptions.push(commanderIntent ? "Used Commander color identity, not exact card color." : "Used actual card color, not Commander identity.");
  }

  state.negatedColors.forEach((color) => {
    addTerm(state, `-c:${color}`, `not ${colorName(color)}`, "negation", "");
  });
}

/**
 * Detects card types and creature subtypes.
 * @param {object} state - Mutable parse state.
 */
function detectTypes(state) {
  matchMap(state, activeDictionary.types, (phrase, query) => {
    addTerm(state, query, `type: ${phrase}`, "type", phrase);
  });
  matchMap(state, activeDictionary.subtypes, (phrase, query) => {
    addTerm(state, query, `subtype: ${phrase}`, "subtype", phrase);
  });
}

/**
 * Detects keyword ability phrases.
 * @param {object} state - Mutable parse state.
 */
function detectKeywords(state) {
  matchMap(state, activeDictionary.keywords, (phrase, query) => {
    if (phrase === "protection" && /\bprotection from\b/.test(state.normalized)) return;
    addTerm(state, query, `keyword: ${phrase}`, "keyword", phrase);
  });
}

/**
 * Detects oracle-text phrase groups such as ETB, removal, and treasure.
 * @param {object} state - Mutable parse state.
 */
function detectOraclePhrases(state) {
  const matches = [];
  activeDictionary.oraclePhrases.forEach((entry) => {
    const trigger = entry.triggers.find((phrase) => hasPhrase(state.normalized, phrase));
    if (!trigger || isConsumed(state, trigger)) return;
    matches.push({ ...entry, trigger });
  });

  if (!matches.length) return;

  const shouldGroupAsOr = /\b(or|also any|but also|either)\b/.test(state.normalized) && matches.length > 1;
  if (shouldGroupAsOr) {
    const group = `(${unique(matches.map((match) => match.query)).join(" OR ")})`;
    addTerm(state, group, "oracle alternatives", "oracle", matches.map((match) => match.trigger).join(" "));
    state.assumptions.push("Grouped multiple text intents with OR because the request used alternate wording.");
    matches.forEach((match) => {
      state.recognized.push(`text: ${match.label}`);
      consumePhrase(state, match.trigger);
    });
    return;
  }

  matches.forEach((match) => {
    addTerm(state, match.query, `text: ${match.label}`, "oracle", match.trigger);
  });
}

/**
 * Detects mana value constraints from casual cost language.
 * @param {object} state - Mutable parse state.
 */
function detectManaValue(state) {
  const patterns = [
    { re: /\b(?:mv|mana value|cmc|cost|costs?)\s*(\d+)\s*(?:or less|or fewer|and under|or under|<=|less)\b/, op: "<=" },
    { re: /\b(?:mv|mana value|cmc|cost|costs?)\s*(\d+)\s*(?:or more|or greater|and up|\+|>=)\b/, op: ">=" },
    { re: /\b(?:under|less than)\s*(\d+)\s*(?:mana|mv|cmc)?\b/, op: "<" },
    { re: /\b(?:at least|more than)\s*(\d+)\s*(?:mana|mv|cmc)?\b/, op: ">=" },
    { re: /\b(?:exactly)\s*(\d+)\s*(?:mana|mv|cmc)?\b/, op: "=" }
  ];

  for (const pattern of patterns) {
    const match = state.normalized.match(pattern.re);
    if (!match) continue;
    addTerm(state, `mv${pattern.op}${match[1]}`, `mana value ${pattern.op}${match[1]}`, "mana", match[0]);
    return;
  }
}

/**
 * Detects power and toughness constraints.
 * @param {object} state - Mutable parse state.
 */
function detectPowerToughness(state) {
  const power = state.normalized.match(/\bpower\s*(\d+)\s*(or more|or greater|\+|>=)?\b/);
  if (power) addTerm(state, `pow${power[2] ? ">=" : "="}${power[1]}`, `power ${power[1]}`, "stats", power[0]);

  const toughness = state.normalized.match(/\btoughness\s*(\d+)\s*(or more|or greater|\+|>=)?\b/);
  if (toughness) addTerm(state, `tou${toughness[2] ? ">=" : "="}${toughness[1]}`, `toughness ${toughness[1]}`, "stats", toughness[0]);
}

/**
 * Detects rarity language.
 * @param {object} state - Mutable parse state.
 */
function detectRarity(state) {
  matchMap(state, activeDictionary.rarities, (phrase, query) => {
    addTerm(state, query, `rarity: ${phrase}`, "rarity", phrase);
  });
}

/**
 * Detects price constraints and budget shorthand.
 * @param {object} state - Mutable parse state.
 */
function detectPrices(state) {
  const dollar = state.normalized.match(/\b(?:under|less than|below)\s*\$?(\d+)\s*(?:dollars?|usd|bucks)\b|\b(?:under|less than|below)\s*\$(\d+)\b/);
  if (dollar) {
    const amount = dollar[1] || dollar[2];
    addTerm(state, `usd<${amount}`, `price under $${amount}`, "price", dollar[0]);
    return;
  }

  const maxDollar = state.normalized.match(/\b\$?(\d+)\s*(?:dollars?|usd|bucks)\s*(?:or less|or cheaper|and under)?\b|\$(\d+)\s*(?:or less|or cheaper|and under)\b/);
  if (maxDollar) {
    const amount = maxDollar[1] || maxDollar[2];
    addTerm(state, `usd<=${amount}`, `price <= $${amount}`, "price", maxDollar[0]);
    return;
  }

  matchMap(state, activeDictionary.pricePhrases, (phrase, query) => {
    addTerm(state, query, `price: ${phrase}`, "price", phrase);
  });
}

/**
 * Detects sorting hints without adding them to the Scryfall query body.
 * @param {object} state - Mutable parse state.
 */
function detectSorting(state) {
  Object.entries(activeDictionary.sorting).forEach(([phrase, query]) => {
    if (!hasPhrase(state.normalized, phrase)) return;
    state.api.order = query.replace(/^order:/, "");
    state.recognized.push(`sort: ${phrase}`);
    consumePhrase(state, phrase);
  });
}

/**
 * Adds explicit alternatives for ambiguous counter searches.
 * @param {object} state - Mutable parse state.
 */
function detectCounterAmbiguity(state) {
  if (!hasPhrase(state.normalized, "counter")) return;
  const alreadyHandled = state.terms.some((term) => term.query.includes("counter target spell") || term.query.includes("+1"));
  if (alreadyHandled) return;

  addTerm(state, "o:\"counter target spell\"", "counterspell text", "oracle", "counter");
  state.assumptions.push("Interpreted 'counter' as counterspell text, not +1/+1 counters.");
  state.alternatives.push(
    { label: "Counterspell meaning", query: withBaseTerms(state, "o:\"counter target spell\"") },
    { label: "+1/+1 counter meaning", query: withBaseTerms(state, "o:/\\+1\\/\\+1 counter/") },
    { label: "Any card mentioning counters", query: withBaseTerms(state, "o:counter") }
  );
}

/**
 * Matches a dictionary map against the input.
 * @param {object} state - Mutable parse state.
 * @param {object} map - Phrase-to-query map.
 * @param {Function} callback - Invoked with phrase and query.
 */
function matchMap(state, map, callback) {
  Object.entries(map)
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([phrase, query]) => {
      if (!hasPhrase(state.normalized, phrase) || isConsumed(state, phrase)) return;
      callback(phrase, query);
    });
}

/**
 * Adds a compiled query term and records diagnostics.
 * @param {object} state - Mutable parse state.
 * @param {string} query - Scryfall query fragment.
 * @param {string} recognized - Human-readable recognized item.
 * @param {string} kind - Parser kind that matched.
 * @param {string} phrase - Consumed phrase.
 */
function addTerm(state, query, recognized, kind, phrase) {
  if (!query || query === "implicit AND") return;
  if (!state.terms.some((term) => term.query === query)) {
    state.terms.push({ query, kind });
  }
  if (recognized && !state.recognized.includes(recognized)) state.recognized.push(recognized);
  if (kind) state.matchedKinds.add(kind);
  if (phrase) consumePhrase(state, phrase);
}

/**
 * Builds the final Scryfall query from compiled terms.
 * @param {object} state - Mutable parse state.
 * @returns {string} Scryfall query.
 */
function assembleQuery(state) {
  return unique(state.terms.map((term) => term.query)).join(" ").trim();
}

/**
 * Scores parser confidence from recognized features, warnings, and leftovers.
 * @param {object} state - Mutable parse state.
 * @param {string} query - Final query.
 * @returns {number} Confidence from 0 to 1.
 */
function scoreConfidence(state, query) {
  if (!query) return 0.2;
  let score = 0.28 + Math.min(state.recognized.length * 0.08, 0.48);
  if (state.matchedKinds.has("color")) score += 0.08;
  if (state.matchedKinds.has("type") || state.matchedKinds.has("subtype")) score += 0.08;
  if (state.matchedKinds.has("keyword") || state.matchedKinds.has("oracle")) score += 0.08;
  if (state.assumptions.length) score -= 0.04;
  if (state.alternatives.length) score -= 0.12;
  if (state.unresolved.length) score -= Math.min(state.unresolved.length * 0.04, 0.18);
  return Math.max(0.35, Math.min(0.98, Number(score.toFixed(2))));
}

/**
 * Builds a short explanation for the generated query.
 * @param {object} state - Mutable parse state.
 * @returns {string} Plain-English reason.
 */
function buildReason(state) {
  const kinds = [];
  if (state.matchedKinds.has("identity")) kinds.push("identity");
  if (state.matchedKinds.has("color")) kinds.push("colors");
  if (state.matchedKinds.has("type")) kinds.push("types");
  if (state.matchedKinds.has("subtype")) kinds.push("subtypes");
  if (state.matchedKinds.has("keyword")) kinds.push("keywords");
  if (state.matchedKinds.has("oracle")) kinds.push("rules text");
  if (state.matchedKinds.has("mana")) kinds.push("mana value");
  if (!kinds.length) return "Local parser used the input as best-effort syntax.";
  return `Parsed ${joinHuman(kinds)} locally.`;
}

/**
 * Finalizes the structured parser response.
 * @param {object} state - Mutable parse state.
 * @param {string} mode - Result mode.
 * @param {string} query - Scryfall query or card name.
 * @param {string} reason - Short parser explanation.
 * @param {number} confidence - Confidence score.
 * @param {object} [api] - Optional API metadata override.
 * @returns {object} Structured parser result.
 */
function finalizeResult(state, mode, query, reason, confidence, api = state.api) {
  const result = {
    mode,
    input: state.original,
    query,
    confidence,
    reason,
    recognized: unique(state.recognized),
    assumptions: unique(state.assumptions),
    unresolved: unique(state.unresolved),
    alternatives: state.alternatives,
    warnings: state.warnings,
    api
  };

  if (mode === "search" && confidence < 0.65) {
    result.warnings.push("Low-confidence deterministic parse. Review or edit the generated query.");
  }

  return result;
}

/**
 * Builds a high-confidence direct parser result for curated phrase rules.
 * @param {object} state - Mutable parse state.
 * @param {string} query - Scryfall query.
 * @param {string} reason - Short parser explanation.
 * @param {string[]} recognized - Recognized diagnostics.
 * @returns {object} Structured parser result.
 */
function directResult(state, query, reason, recognized = []) {
  state.recognized.push(...recognized.filter(Boolean));
  state.matchedKinds.add("curated");
  return finalizeResult(state, "search", query, reason, 0.94);
}

/**
 * Extracts a likely artist name from common artist-search phrasing.
 * @param {string} input - Original user input with casing preserved.
 * @returns {string|null} Artist name or null.
 */
function extractArtistName(input) {
  const match = String(input || "").match(/\b(?:illustrated by|artist by|by)\s+([A-Za-z][A-Za-z .'-]+)$/i);
  if (!match?.[1]) return null;
  return match[1].replace(/[?.!]+$/g, "").trim();
}

/**
 * Finds unresolved words after known phrases and stop words are removed.
 * @param {object} state - Mutable parse state.
 * @returns {string[]} Unresolved meaningful terms.
 */
function detectUnresolvedTerms(state) {
  let residual = state.normalized;
  state.consumed.forEach((phrase) => {
    residual = residual.replace(new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "g"), " ");
  });
  return unique(residual
    .replace(/["',?.!]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token) && !/^\d+$/.test(token)));
}

/**
 * Adds a phrase to the consumed text list.
 * @param {object} state - Mutable parse state.
 * @param {string} phrase - Consumed phrase.
 */
function consumePhrase(state, phrase) {
  const clean = normalizeInput(phrase);
  if (clean && !state.consumed.includes(clean)) state.consumed.push(clean);
}

/**
 * Checks whether a phrase has already been consumed by a longer match.
 * @param {object} state - Mutable parse state.
 * @param {string} phrase - Candidate phrase.
 * @returns {boolean} True when phrase is already consumed.
 */
function isConsumed(state, phrase) {
  const clean = normalizeInput(phrase);
  return state.consumed.some((item) => item === clean || item.includes(clean));
}

/**
 * Checks if a normalized phrase appears as a whole phrase.
 * @param {string} text - Normalized text.
 * @param {string} phrase - Phrase to find.
 * @returns {boolean} True when phrase is present.
 */
function hasPhrase(text, phrase) {
  const clean = normalizeInput(phrase);
  if (!clean) return false;
  const boundaryStart = /^[a-z0-9]/.test(clean) ? "\\b" : "";
  const boundaryEnd = /[a-z0-9]$/.test(clean) ? "\\b" : "";
  return new RegExp(`${boundaryStart}${escapeRegExp(clean)}${boundaryEnd}`).test(text);
}

/**
 * Checks whether a phrase is preceded by local negation words.
 * @param {string} text - Normalized text.
 * @param {string} phrase - Phrase being checked.
 * @returns {boolean} True when phrase is negated.
 */
function isNegatedPhrase(text, phrase) {
  const clean = normalizeInput(phrase);
  return new RegExp(`\\b(not|no|without|excluding)\\s+${escapeRegExp(clean)}\\b`).test(text);
}

/**
 * Checks whether a color word is the object of a protection phrase.
 * @param {string} text - Normalized text.
 * @param {string} colorWord - Color word being checked.
 * @returns {boolean} True when the color is a protection target, not card color.
 */
function isProtectionTargetColor(text, colorWord) {
  return new RegExp(`\\b(protection from|protected from|pro)\\s+${escapeRegExp(colorWord)}\\b`).test(text);
}

/**
 * Sorts color symbols in WUBRG order and deduplicates them.
 * @param {string} colors - Color symbols.
 * @returns {string} Sorted color string.
 */
function sortColors(colors) {
  const order = activeDictionary.colorOrder || ["w", "u", "b", "r", "g"];
  const set = new Set(String(colors).toLowerCase().split(""));
  return order.filter((color) => set.has(color)).join("");
}

/**
 * Adds a value to an array once.
 * @param {Array} array - Target array.
 * @param {*} value - Value to add.
 */
function addUnique(array, value) {
  if (!array.includes(value)) array.push(value);
}

/**
 * Returns a unique copy of an array.
 * @param {Array} values - Values to dedupe.
 * @returns {Array} Unique values.
 */
function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

/**
 * Escapes a string for safe regular-expression construction.
 * @param {string} value - Raw string.
 * @returns {string} Escaped string.
 */
function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Joins words as a compact human-readable phrase.
 * @param {string[]} parts - Words to join.
 * @returns {string} Human-readable list.
 */
function joinHuman(parts) {
  if (parts.length <= 1) return parts[0] || "";
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts.at(-1)}`;
}

/**
 * Converts a color symbol to a readable color name.
 * @param {string} color - Color symbol.
 * @returns {string} Color name.
 */
function colorName(color) {
  return ({ w: "white", u: "blue", b: "black", r: "red", g: "green", c: "colorless" })[color] || color;
}

/**
 * Builds an alternative query using all non-oracle base terms plus one oracle term.
 * @param {object} state - Mutable parse state.
 * @param {string} oracleQuery - Alternative oracle query.
 * @returns {string} Alternative query.
 */
function withBaseTerms(state, oracleQuery) {
  const base = state.terms
    .filter((term) => term.kind !== "oracle")
    .map((term) => term.query);
  return unique([...base, oracleQuery]).join(" ").trim();
}

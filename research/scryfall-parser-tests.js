import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createDictionaryFromSeed } from "./scryfall-dictionary.js";
import { parseScryfallNaturalLanguage, setScryfallDictionary } from "./scryfall-parser.js";

const seed = JSON.parse(await readFile(new URL("./scryfall-parser-seed-2026.json", import.meta.url), "utf8"));
setScryfallDictionary(createDictionaryFromSeed(seed));

const cases = [
  {
    // Tests basic multi-color and type mapping
    name: "red and black orcs",
    input: "red and black orcs",
    expected: "c:br t:orc"
  },
  {
    // Tests exact color intent with symbolic Oracle text
    name: "only izzet plus one counters",
    input: "only red and blue with +1/+1 counters",
    expected: "c=ur o:/\\+1\\/\\+1 counter/",
    expectedAssumptions: ["exact card colors"],
    expectedUnresolvedExact: []
  },
  {
    // Tests exact color intent without a guild alias
    name: "exactly blue red creatures",
    input: "exactly blue red creatures",
    expected: "c=ur t:creature",
    expectedAssumptions: ["exact card colors"]
  },
  {
    // Tests keyword mapping (kw:) for basic abilities
    name: "green haste",
    input: "green haste",
    expected: "c:g kw:haste"
  },
  {
    // Tests multi-color searches provide alternate color-pool interpretations
    name: "red green deathtouch ambiguity",
    input: "red and green with deathtouch",
    expected: "c:rg kw:deathtouch",
    expectedAlternatives: 3,
    expectedAlternativeIncludes: [
      "(c:r OR c:g) c<=rg kw:deathtouch",
      "id<=rg kw:deathtouch",
      "c=rg kw:deathtouch"
    ],
    expectedAssumptions: ["multiple color words"],
    minConfidence: 0.55
  },
  {
    // Tests mapping generic concepts (removal) to specific Oracle text strings
    name: "blue removal",
    input: "blue removal",
    expectedIncludes: ["c:u", "otag:removal"],
    expectedAlternativeIncludes: ["destroy target", "exile target"]
  },
  {
    // Tests mapping slang (ETB) to official game terms (enters)
    name: "red blue elemental ETB",
    input: "any red and blue elemental with an ETB",
    expected: "c:ur t:elemental o:enters"
  },
  {
    // Tests handling of logical OR within Oracle text queries
    name: "black -1/-1 or protection from red",
    input: "Black cards that give me -1/-1 but aso any protection from red",
    expected: "c:b (o:\"-1/-1\" OR o:\"protection from red\")"
  },
  {
    // Tests color identity (id) and format filters for specific archetypes
    name: "rakdos commander treasure",
    input: "cards for my rakdos commander deck that make treasure",
    expectedIncludes: ["id<=br", "f:commander", "o:treasure"]
  },
  {
    // Tests mana value (mv) comparison operators
    name: "modern blue creatures cost 2 or less",
    input: "modern legal blue creatures that cost 2 or less",
    expected: "f:modern c:u t:creature mv<=2"
  },
  {
    // Tests the negation operator (-) for colors
    name: "not blue creatures with flying",
    input: "not blue creatures with flying",
    expected: "-c:u t:creature kw:flying"
  },
  {
    // Tests finding multiple alternative query structures for a single intent
    name: "counter cards in black",
    input: "counter cards in black",
    expectedIncludes: ["c:b", "o:\"counter target spell\""],
    expectedAlternatives: 3
  },
  {
    // Tests specific logic for exact card name resolution
    name: "exact named card lookup",
    input: "card named Lightning Bolt",
    expectedMode: "exact_name",
    expected: "Lightning Bolt",
    expectedApi: { endpoint: "/cards/named" },
    expectedApiAbsent: ["unique", "order", "dir"]
  },
  {
    // Tests format legality and rarity constraints common in Pauper
    name: "pauper legal red burn",
    input: "pauper legal red burn spells",
    expectedIncludes: ["f:pauper", "c:r", "o:damage", "r:common"]
  },
  {
    // Tests currency mapping and budget constraint logic
    name: "budget commander staples",
    input: "commander staples under 150 dollars",
    expected: "f:commander usd<=150"
  },
  {
    // Tests keyword mapping within specific format constraints
    name: "pioneer white creatures with ward",
    input: "white creatures in pioneer with ward",
    expected: "f:pioneer c:w t:creature kw:ward"
  },
  {
    // Tests multiple negations and type conjunctions
    name: "legendary creatures not green or white",
    input: "legendary creatures that are not green or white",
    expected: "t:legendary t:creature -c:g -c:w"
  },
  {
    // Tests artist (a:) and rarity (r:) field mapping
    name: "specific artist and rarity",
    input: "mythic rares illustrated by Magali Villeneuve",
    expected: "r:mythic a:\"Magali Villeneuve\""
  },
  {
    // Tests complex numeric comparison for Power (pow) and Toughness (tou)
    name: "power and toughness range",
    input: "creatures with power 4 or more and toughness 2 or less",
    expected: "t:creature pow>=4 tou<=2"
  },
  {
    // Tests specific set codes (s:) and card frame attributes
    name: "cards with specific set and frame",
    input: "full art cards from Strixhaven",
    expected: "s:stx is:fullart"
  },
  {
    // Tests inclusion of one term while strictly negating another
    name: "complex oracle text negation",
    input: "blue cards that draw cards but don't discard",
    expectedIncludes: ["c:u", "o:draw", "-o:discard"]
  },
  {
    // Tests identification of double-faced card (dfc) attributes
    name: "transformed or double-faced",
    input: "double faced black cards",
    expected: "is:dfc c:b"
  },
  {
    // Tests handling of logical groups across different card types
    name: "artifact or enchantment removal in green",
    input: "green cards that destroy artifacts or enchantments",
    expected: "c:g (o:\"destroy target artifact\" OR o:\"destroy target enchantment\")"
  },
  {
    // Tests handling of strict budget constraints
    name: "commander budget cap",
    input: "commander staples under 150 dollars",
    expected: "f:commander usd<=150"
  },
  {
    // Tests format-specific rarity constraints common in Pauper
    name: "pauper legal red burn",
    input: "pauper legal red burn spells",
    expectedIncludes: ["f:pauper", "c:r", "o:damage", "r:common"]
  },
  {
    // Tests handling of multi-word quoted strings and artist searches
    name: "specific artist and rarity",
    input: "mythic rares by Magali Villeneuve",
    expected: "r:mythic a:\"Magali Villeneuve\""
  },
  {
    // Tests complex numeric ranges for Power and Toughness
    name: "power and toughness range",
    input: "creatures with power 4 or more and toughness 2 or less",
    expected: "t:creature pow>=4 tou<=2"
  },
  {
    // Tests "implicit" terms that map to complex Oracle text (e.g., 'Blink' or 'Flicker')
    name: "implicit blink effect",
    input: "white blink spells",
    expectedIncludes: ["c:w", "o:exile", "o:return", "o:battlefield"]
  },
  {
    // Tests negation of multiple color identities
    name: "non-green non-white legendary",
    input: "legendary creatures that are not green or white",
    expected: "t:legendary t:creature -c:g -c:w"
  },
  {
    // Tests handling of mana value (CMC) ranges
    name: "mana value range",
    input: "cards with cmc between 3 and 5",
    expected: "mv>=3 mv<=5"
  },
  {
    // Tests specific card attributes like "Full Art" or "Extended Art"
    name: "full art strixhaven cards",
    input: "full art cards from Strixhaven",
    expected: "s:stx is:fullart"
  },
  {
    // Tests handling of hybrid mana symbols or gold cards
    name: "rakdos gold cards",
    input: "rakdos gold cards",
    expected: "c:br is:gold"
  },
  {
    // Tests price filtering using MTGO "Tix" instead of USD
    name: "mtgo budget",
    input: "modern cards under 5 tix",
    expected: "f:modern tix<=5"
  },
  {
    // Tests "Aristocrats" theme: maps a community archetype to mechanical triggers (sac + drain)
    name: "aristocrats synergy",
    input: "black and white cards that trigger when a creature dies",
    expectedIncludes: ["c:bw", "o:whenever", "o:creature dies"]
  },
  {
    // Tests "Infinite Combo" enablers: specifically looking for pieces like Rooftop Storm
    name: "zombie combo enabler",
    input: "blue cards that make zombies cost 0",
    expected: "c:u o:\"zombie spells you cast cost {0}\""
  },
  {
    // Tests "Vehicle" archetype: specific support for Shorikai or Pilot strategies
    name: "vehicle support",
    input: "white or blue cards that can crew vehicles",
    expectedIncludes: ["c:wu", "o:crew"]
  },
  {
    // Tests "Knight Tribal": specifically for Eminence or discard/recursion synergies
    name: "knight recursion",
    input: "knights that return from the graveyard",
    expectedIncludes: ["t:knight", "o:return", "o:graveyard"]
  },
  {
    // Tests "Graveyard Hate": mapping a strategy to multiple mechanical keywords
    name: "graveyard hate",
    input: "non-black cards that exile graveyards",
    expectedIncludes: ["-c:b", "o:exile", "o:graveyard"]
  },
  {
    // Tests "Protection": finding specific defensive keywords for high-value targets
    name: "commander protection",
    input: "equipment that gives hexproof or shroud",
    expected: "t:equipment (kw:hexproof OR kw:shroud)"
  },
  {
    // Tests "Final Fantasy" flavor: mapping "Final Fantasy" to the specific set code
    name: "final fantasy set search",
    input: "legendary creatures from the Final Fantasy set",
    expected: "t:legendary t:creature s:fin" 
  },
  {
    // Tests "Phyrexian" flavor: specific keyword 'Toxic' or 'Poison'
    name: "phyrexian toxic",
    input: "white creatures with toxic",
    expected: "c:w t:creature kw:toxic"
  },
  {
    // Tests "Ramp": mapping utility to specific land-to-battlefield mechanics
    name: "green ramp",
    input: "green cards that put lands onto the battlefield",
    expectedIncludes: ["c:g", "o:put", "o:land", "o:battlefield"]
  },
  {
    // Tests "Strixhaven School" logic: mapping a school name to its color pair
    name: "strixhaven lorehold",
    input: "Lorehold cards that cost 3",
    expected: "c:wr mv:3"
  },
  {
    // Tests "Mana Dorks": mapping community slang to specific mechanical utility
    name: "mana dorks",
    input: "green creatures that tap for mana",
    expectedIncludes: ["c:g", "t:creature", "o:\"{T}: add\""]
  },
  {
    // Tests "Utility Lands": filtering by non-mana production utility
    name: "utility lands",
    input: "lands that don't tap for mana but have abilities",
    expectedIncludes: ["t:land", "-o:\"{T}: add\""]
  },
  {
    // Tests "Print History": finding original printings versus reprints
    name: "original printings",
    input: "first printing of cards illustrated by RK Post",
    expected: "a:\"RK Post\" is:firstprinting"
  },
  {
    // Tests "Restricted Logic": finding cards that are legal in one format but banned in another
    name: "format crossover",
    input: "cards legal in legacy but banned in modern",
    expected: "f:legacy banned:modern"
  },
  {
    // Tests "Complex Cost Symbols": identifying specific mana requirements like Phyrexian or Hybrid
    name: "phyrexian mana search",
    input: "cards with phyrexian mana in their cost",
    expected: "is:phyrexian"
  },
  {
    // Tests "Border/Frame variation": for collectors looking for specific aesthetics
    name: "retro frame artifacts",
    input: "artifacts with the retro frame",
    expected: "t:artifact frame:retro"
  },
  {
    // Tests "Token Producers": mapping specific token types to oracle text
    name: "treasure and clue producers",
    input: "cards that make treasures and clues",
    expectedIncludes: ["o:treasure", "o:clue"]
  },
  {
    // Tests "Colorless identity": distinguishing between colorless cards and colorless identity
    name: "true colorless identity",
    input: "colorless cards for a colorless commander",
    expected: "id:c t:card"
  },
  {
    // Tests "Language/Region": finding specific localized versions
    name: "japanese alt art",
    input: "japanese language cards with alternate art",
    // Scryfall resolves is:alternate narrowly for Japanese alternate-art printings; is:alt-art remains broader.
    expected: "lang:ja is:alternate"
  },
  {
    // Tests "Nested Logic": complex parenthetical grouping for specific triggers
    name: "draw or discard triggers",
    input: "blue cards that trigger when I draw or discard",
    expected: "c:u (o:\"whenever you draw\" OR o:\"whenever you discard\")"
  },
  {
    // Tests typo tolerance for common color/type/keyword misspellings
    name: "typo haste",
    input: "gren creaturs with hast",
    expected: "c:g t:creature kw:haste"
  },
  {
    // Tests typo tolerance around Commander intent
    name: "misspelled commander",
    input: "rakdos comandr cards that make treasure",
    expectedIncludes: ["f:commander", "id<=br", "o:treasure"]
  },
  {
    // Tests shorthand color pair parsing
    name: "common MTG shorthand",
    input: "br orcs with menace",
    expected: "c:br t:orc kw:menace"
  },
  {
    // Tests ambiguity diagnostics for counter/counters meaning
    name: "blue counter ambiguity",
    input: "blue counter cards",
    expectedIncludes: ["c:u", "o:\"counter target spell\""],
    expectedAlternatives: 3,
    expectedAssumptions: ["counterspell text"]
  },
  {
    // Tests unresolved diagnostics for vague support language
    name: "token support ambiguity",
    input: "white soldier support",
    expectedIncludes: ["c:w", "t:soldier"],
    expectedUnresolved: ["support"],
    minConfidence: 0.45
  },
  {
    // Tests fuzzy budget shorthand without a precise dollar amount
    name: "cheap commander removal",
    input: "cheap commander removal",
    expectedIncludes: ["f:commander", "usd<=1", "otag:removal"],
    expectedAlternativeIncludes: ["destroy target"],
    expectedRecognized: ["price: cheap"]
  },
  {
    // Tests player slang around Selesnya token strategies
    name: "go wide tokens",
    input: "selesnya go wide token cards",
    expectedIncludes: ["c:gw", "o:token"]
  },
  {
    // Tests player slang around Izzet instant/sorcery payoffs
    name: "spellslinger payoff",
    input: "izzet spellslinger payoffs",
    expected: "c:ur (o:instant OR o:sorcery)"
  },
  {
    name: "banned in modern",
    input: "banned in modern",
    expected: "banned:modern"
  },
  {
    name: "restricted in vintage",
    input: "restricted in vintage",
    expected: "restricted:vintage"
  },
  {
    name: "board wipe functional tag",
    input: "board wipes",
    expected: "otag:board-wipe",
    expectedAlternativeIncludes: ["destroy all creatures"]
  },
  {
    name: "mana rock functional tag",
    input: "mana rocks",
    expected: "otag:mana-rock",
    expectedAlternativeIncludes: ["t:artifact", "produces:any"]
  },
  {
    name: "free sacrifice outlet functional tag",
    input: "free sacrifice outlet",
    expected: "otag:free-sacrifice-outlet",
    expectedAlternativeIncludes: ["otag:sacrifice-outlet"]
  },
  {
    name: "exclude digital",
    input: "exclude digital cards",
    expected: "not:digital"
  },
  {
    name: "paper cards",
    input: "paper cards",
    expected: "game:paper"
  },
  {
    name: "art search",
    input: "art: goblin warrior",
    expected: "art:\"goblin warrior\"",
    minConfidence: 0.4
  },
  {
    name: "flavor text search",
    input: "flavor text to be",
    expected: "ft:\"to be\"",
    minConfidence: 0.4
  },
  {
    name: "artist search",
    input: "artist Magali Villeneuve",
    expected: "a:\"Magali Villeneuve\"",
    minConfidence: 0.4
  },
  {
    name: "a search",
    input: "a: Magali Villeneuve",
    expected: "a:\"Magali Villeneuve\"",
    minConfidence: 0.4
  },
  {
    name: "set search",
    input: "set stx",
    expected: "s:stx",
    minConfidence: 0.4
  },
  {
    name: "s search",
    input: "s:fin",
    expected: "s:fin",
    minConfidence: 0.4
  },
  {
    name: "produces mana",
    input: "produces mana",
    expected: "produces:any"
  },
  {
    name: "produces red green mana",
    input: "produces red and green mana",
    expected: "produces:rg"
  },
  {
    name: "unique cards metadata",
    input: "unique cards",
    expected: "*",
    expectedApi: { unique: "cards" },
    minConfidence: 0.4
  },
  {
    name: "include extras",
    input: "include extras",
    expected: "include:extras"
  },
  {
    name: "prefer newest",
    input: "prefer newest",
    expected: "prefer:newest",
    expectedApi: { order: "name" }
  },
  {
    name: "prefer old",
    input: "prefer old",
    expected: "prefer:oldest"
  },
  {
    name: "newest cards sorting metadata",
    input: "newest cards",
    expected: "*",
    expectedApi: { order: "released", dir: "desc" },
    minConfidence: 0.4
  },
  {
    name: "is commander",
    input: "is commander",
    expected: "is:commander"
  },
  {
    name: "commander legal",
    input: "commander legal",
    expected: "f:commander",
    minConfidence: 0.45
  },
  {
    name: "power 2 or less",
    input: "power 2 or less",
    expected: "pow<=2"
  },
  {
    name: "toughness 3 or less",
    input: "toughness 3 or less",
    expected: "tou<=3"
  },
  {
    name: "power less than strict",
    input: "power < 3",
    expected: "pow<3"
  },
  {
    name: "power greater than strict",
    input: "power > 4",
    expected: "pow>4"
  },
  {
    name: "toughness explicit less or equal",
    input: "toughness <= 3",
    expected: "tou<=3"
  },
  {
    name: "toughness explicit greater or equal",
    input: "toughness >= 5",
    expected: "tou>=5"
  },
  {
    name: "no duplicate oracle or terms",
    input: "draw or draw cards",
    expected: "o:draw",
    expectedNotIncludes: ["(o:draw)"],
    minConfidence: 0.4
  },
  {
    // Tests lifegain payoff phrasing
    name: "lifegain payoff",
    input: "white black cards whenever I gain life",
    expected: "c:wb o:\"gain life\""
  },
  {
    // Tests total nonsense should not pretend to be a confident query
    name: "garbage input",
    input: "banana chair lightning friendship",
    maxConfidence: 0.45,
    expectedUnresolved: ["banana", "chair", "lightning", "friendship"],
    expectedWarnings: ["Low-confidence deterministic parse"]
  },
  {
    // Tests empty input as a graceful low-confidence no-op
    name: "empty input",
    input: "",
    expected: "",
    maxConfidence: 0.2
  },
  {
    // Tests punctuation-only input as graceful low confidence
    name: "punctuation only",
    input: "??? !!!",
    maxConfidence: 0.3,
    expectedWarnings: ["Low-confidence deterministic parse"]
  },
  {
    // Tests one valid token mixed with nonsense should remain cautious
    name: "nonsense with one valid term",
    input: "blue spaghetti volcano",
    expectedIncludes: ["c:u"],
    expectedUnresolved: ["spaghetti", "volcano"],
    maxConfidence: 0.6
  }
];

let failures = 0;

for (const testCase of cases) {
  const result = parseScryfallNaturalLanguage(testCase.input);
  try {
    if (testCase.expectedMode) assert.equal(result.mode, testCase.expectedMode);
    if (testCase.expected) assert.equal(result.query, testCase.expected);
    if (testCase.expectedIncludes) {
      for (const expected of testCase.expectedIncludes) {
        assert.ok(result.query.includes(expected), `${testCase.name}: missing ${expected} in ${result.query}`);
      }
    }
    if (testCase.expectedNotIncludes) {
      for (const expected of testCase.expectedNotIncludes) {
        assert.ok(!result.query.includes(expected), `${testCase.name}: unexpected ${expected} in ${result.query}`);
      }
    }
    if (testCase.expectedApi) {
      for (const [key, expected] of Object.entries(testCase.expectedApi)) {
        assert.equal(result.api?.[key], expected, `${testCase.name}: expected api.${key} ${expected}, got ${result.api?.[key]}`);
      }
    }
    if (testCase.expectedApiAbsent) {
      for (const key of testCase.expectedApiAbsent) {
        assert.ok(!Object.prototype.hasOwnProperty.call(result.api || {}, key), `${testCase.name}: unexpected api.${key} ${result.api?.[key]}`);
      }
    }
    if (testCase.expectedAlternatives) assert.equal(result.alternatives.length, testCase.expectedAlternatives);
    if (testCase.expectedAlternativeIncludes) {
      const queries = result.alternatives.map((alternative) => alternative.query).join(" | ");
      for (const expected of testCase.expectedAlternativeIncludes) {
        assert.ok(queries.includes(expected), `${testCase.name}: missing alternative ${expected} in ${queries}`);
      }
    }
    if (Object.prototype.hasOwnProperty.call(testCase, "expectedUnresolvedExact")) {
      assert.deepEqual(result.unresolved, testCase.expectedUnresolvedExact);
    }
    if (testCase.expectedUnresolved) {
      for (const expected of testCase.expectedUnresolved) {
        assert.ok(result.unresolved.includes(expected), `${testCase.name}: missing unresolved ${expected} in ${result.unresolved.join(", ")}`);
      }
    }
    if (testCase.expectedAssumptions) {
      for (const expected of testCase.expectedAssumptions) {
        assert.ok(result.assumptions.some((item) => item.includes(expected)), `${testCase.name}: missing assumption ${expected} in ${result.assumptions.join(", ")}`);
      }
    }
    if (testCase.expectedWarnings) {
      for (const expected of testCase.expectedWarnings) {
        assert.ok(result.warnings.some((item) => item.includes(expected)), `${testCase.name}: missing warning ${expected} in ${result.warnings.join(", ")}`);
      }
    }
    if (testCase.expectedRecognized) {
      for (const expected of testCase.expectedRecognized) {
        assert.ok(result.recognized.some((item) => item.includes(expected)), `${testCase.name}: missing recognized ${expected} in ${result.recognized.join(", ")}`);
      }
    }
    if (Number.isFinite(testCase.maxConfidence)) {
      assert.ok(result.confidence <= testCase.maxConfidence, `${testCase.name}: confidence too high (${result.confidence})`);
    } else {
      const minimum = Number.isFinite(testCase.minConfidence) ? testCase.minConfidence : 0.5;
      assert.ok(result.confidence >= minimum, `${testCase.name}: confidence too low (${result.confidence})`);
    }
    console.log(`PASS ${testCase.name}: ${result.query}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${testCase.name}`);
    console.error(`  input: ${testCase.input}`);
    console.error(`  query: ${result.query}`);
    console.error(`  confidence: ${result.confidence}`);
    console.error(`  error: ${error.message}`);
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`\n${cases.length} parser cases passed.`);
}

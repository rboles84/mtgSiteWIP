import assert from "node:assert/strict";
import fs from "node:fs";
import { resolveModeInputValue } from "./research-mode.js";
import {
  setScryfallSyntaxDisplayLookup,
  translateScryfallSyntaxToPlainText
} from "./research-syntax-language.js";

const grounding = JSON.parse(fs.readFileSync(
  new URL("../data/scryfall/grounding/scryfall-grounding.json", import.meta.url),
  "utf8"
));
setScryfallSyntaxDisplayLookup(grounding);

const knownSetCodes = new Set(Object.keys(grounding.sets?.byCode || {}).map((code) => code.toLowerCase()));
const bloomburrowFamilyQuery = "type:legendary type:creature c:w is:commander legal:commander (game:paper) (set:blb OR set:ablb OR set:blc OR set:pblb OR set:tblb OR set:yblb) prefer:best f:commander";
const functionalTagQuery = "otag:counterspell otag:draw is:commander legal:commander f:commander";

const cases = [
  {
    name: "smart to raw shows compiled query",
    state: {
      previousMode: "ai",
      nextMode: "raw",
      currentValue: "red and green with deathtouch",
      lastSmartInput: "red and green with deathtouch",
      lastSmartQuery: "c:rg kw:deathtouch"
    },
    expected: { value: "c:rg kw:deathtouch", changed: true }
  },
  {
    name: "raw to smart restores smart phrase",
    state: {
      previousMode: "raw",
      nextMode: "ai",
      currentValue: "c:rg kw:deathtouch",
      lastSmartInput: "red and green with deathtouch",
      lastSmartQuery: "c:rg kw:deathtouch"
    },
    expected: { value: "red and green with deathtouch", changed: true }
  },
  {
    name: "raw syntax paste reverse translates",
    state: {
      previousMode: "raw",
      nextMode: "ai",
      currentValue: "c<=rg kw:deathtouch",
      lastSmartInput: "red and green with deathtouch",
      lastSmartQuery: "c:rg kw:deathtouch"
    },
    expected: { value: "red or green with no outside colors with deathtouch", changed: true }
  },
  {
    name: "raw syntax complex translation is clean",
    state: {
      previousMode: "raw",
      nextMode: "ai",
      currentValue: "t:creature o:/destroy.*creature/ -o:/search your (hand|library)/",
      lastSmartInput: "creatures that remove creatures",
      lastSmartQuery: "c:u o:draw"
    },
    expected: {
      value: "creature Oracle text matching destroy creature excluding Oracle text matching search your hand or library",
      changed: true
    }
  },
  {
    name: "raw syntax Bloomburrow family translation hides syntax",
    state: {
      previousMode: "raw",
      nextMode: "ai",
      currentValue: bloomburrowFamilyQuery,
      lastSmartInput: "",
      lastSmartQuery: ""
    },
    expected: {
      value: "white legendary creature commander candidates from the Bloomburrow product family commander legal",
      changed: true
    },
    assertNoLeakage: true,
    expectedText: [
      "white",
      "legendary",
      "creature",
      "commander candidates",
      "from the Bloomburrow product family",
      "commander legal"
    ],
    rejectedText: ["blb", "ablb", "blc", "pblb", "tblb", "yblb", "set:", "prefer best", "game paper"]
  },
  {
    name: "smart to raw preserves executable Operator syntax",
    state: {
      previousMode: "ai",
      nextMode: "raw",
      currentValue: "white legendary creatures from the Bloomburrow set that can be a commander",
      lastSmartInput: "white legendary creatures from the Bloomburrow set that can be a commander",
      lastSmartQuery: bloomburrowFamilyQuery
    },
    expected: { value: bloomburrowFamilyQuery, changed: true },
    assertOperatorSyntax: true
  },
  {
    name: "smart to raw preserves token-object query without format",
    state: {
      previousMode: "ai",
      nextMode: "raw",
      currentValue: "Silverquill inkling tokens from the strixhaven set legal in commander",
      lastSmartInput: "Silverquill inkling tokens from the strixhaven set legal in commander",
      lastSmartQuery: "type:inkling type:token c<=wb s:tstx"
    },
    expected: { value: "type:inkling type:token c<=wb s:tstx", changed: true }
  },
  {
    name: "smart to raw preserves unscoped Partner Oracle query",
    state: {
      previousMode: "ai",
      nextMode: "raw",
      currentValue: "cards with partner in all colors",
      lastSmartInput: "cards with partner in all colors",
      lastSmartQuery: "o:partner"
    },
    expected: { value: "o:partner", changed: true }
  },
  {
    name: "smart to raw preserves bare card-name search syntax",
    state: {
      previousMode: "ai",
      nextMode: "raw",
      currentValue: "captain america",
      lastSmartInput: "captain america",
      lastSmartQuery: "name:\"captain america\""
    },
    expected: { value: "name:\"captain america\"", changed: true }
  },
  {
    name: "raw functional tags translate without leakage",
    state: {
      previousMode: "raw",
      nextMode: "ai",
      currentValue: functionalTagQuery,
      lastSmartInput: "",
      lastSmartQuery: ""
    },
    expected: {
      value: "commander candidates with counterspells and card draw commander legal",
      changed: true
    },
    assertNoLeakage: true,
    expectedText: ["commander candidates", "counterspells", "card draw", "commander legal"],
    rejectedText: ["otag:", "otag counterspell", "otag draw", "function draw", "oracletag draw"]
  },
  {
    name: "smart to raw preserves executable functional tag syntax",
    state: {
      previousMode: "ai",
      nextMode: "raw",
      currentValue: "mono blue commanders that draw cards and counter spells",
      lastSmartInput: "mono blue commanders that draw cards and counter spells",
      lastSmartQuery: functionalTagQuery
    },
    expected: { value: functionalTagQuery, changed: true },
    assertFunctionalOperatorSyntax: true
  },
  {
    name: "unsent smart text is not overwritten by stale query",
    state: {
      previousMode: "ai",
      nextMode: "raw",
      currentValue: "new search text",
      lastSmartInput: "red and green with deathtouch",
      lastSmartQuery: "c:rg kw:deathtouch"
    },
    expected: { value: "new search text", changed: false }
  }
];

let failures = 0;

for (const testCase of cases) {
  try {
    const actual = resolveModeInputValue(testCase.state);
    assert.deepEqual(actual, testCase.expected);
    if (testCase.assertNoLeakage) {
      assertNoPlainReadingLeakage(actual.value);
      for (const expectedText of testCase.expectedText || []) {
        assert.ok(actual.value.includes(expectedText), `${testCase.name}: missing "${expectedText}"`);
      }
      for (const rejectedText of testCase.rejectedText || []) {
        assert.equal(actual.value.toLowerCase().includes(rejectedText.toLowerCase()), false, `${testCase.name}: leaked "${rejectedText}"`);
      }
    }
    if (testCase.assertOperatorSyntax) {
      assert.ok(actual.value.includes("type:legendary"), `${testCase.name}: raw type syntax should remain executable`);
      assert.ok(actual.value.includes("set:blb"), `${testCase.name}: raw set syntax should remain executable`);
      assert.ok(actual.value.includes("prefer:best"), `${testCase.name}: raw display-control syntax should remain executable`);
    }
    if (testCase.assertFunctionalOperatorSyntax) {
      assert.ok(actual.value.includes("otag:counterspell"), `${testCase.name}: raw counterspell functional tag should remain executable`);
      assert.ok(actual.value.includes("otag:draw"), `${testCase.name}: raw draw functional tag should remain executable`);
      assert.ok(actual.value.includes("f:commander"), `${testCase.name}: raw format syntax should remain executable`);
    }
    console.log(`PASS ${testCase.name}: ${testCase.expected.value}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${testCase.name}`);
    console.error(`  error: ${error.message}`);
  }
}

const translationCases = [
  {
    name: "single known set code uses display label",
    query: "s:blb",
    includes: ["from the Bloomburrow set"],
    rejects: ["blb", "s:"]
  },
  {
    name: "shuffled family OR group uses product label",
    query: "(set:yblb OR s:blc OR edition:ablb OR e:pblb OR set:tblb OR s:blb)",
    includes: ["from the Bloomburrow product family"],
    rejects: ["blb", "ablb", "blc", "pblb", "tblb", "yblb", "set:", "edition"]
  },
  {
    name: "group code uses product label",
    query: "g:fin",
    includes: ["from the Final Fantasy product family"],
    rejects: ["g fin", "g:"]
  },
  {
    name: "unknown set fallback is intentional",
    query: "type:creature set:vmx999",
    includes: ["creature", "from set vmx999"],
    allowedUnknownSetCodes: ["vmx999"]
  },
  {
    name: "negated in-scope fields are human",
    query: "-type:creature -set:blb c:w",
    includes: ["white", "excluding creature", "excluding the Bloomburrow set"],
    rejects: ["type creature", "set blb", "c w", "blb"]
  },
  {
    name: "exact identity operator preserves meaning",
    query: "id=br is:commander legal:commander",
    includes: ["Rakdos color identity", "commander candidates", "commander legal"],
    rejects: ["id=br", "id br", "legal commander"]
  },
  {
    name: "within identity operator preserves meaning",
    query: "id<=br f:commander",
    includes: ["within Rakdos color identity", "commander legal"],
    rejects: ["id<=br", "id br", "f commander"]
  },
  {
    name: "includes identity operator preserves meaning",
    query: "id>=br format:commander",
    includes: ["including Rakdos colors", "commander legal"],
    rejects: ["id>=br", "identity equals br", "format commander"]
  },
  {
    name: "display controls are omitted",
    query: "c:w game:paper prefer:best order:name unique:cards",
    includes: ["white"],
    rejects: ["game paper", "prefer best", "order name", "unique cards"]
  },
  {
    name: "functional tag aliases are human",
    query: "otag:counterspell function:draw oracletag:graveyard-recursion",
    includes: ["counterspells", "card draw", "graveyard recursion effects"],
    rejects: ["otag:", "function:", "oracletag:", "otag counterspell", "function draw", "oracletag graveyard"]
  },
  {
    name: "unknown functional tags are human",
    query: "otag:spell-copy function:treasure oracletag:mana-rock",
    includes: ["spell copy effects", "treasure effects", "mana rock effects"],
    rejects: ["otag spell", "function treasure", "oracletag mana"]
  },
  {
    name: "negated functional tag aliases are human",
    query: "-otag:counterspell -function:ramp -oracletag:board-wipe",
    includes: ["excluding counterspells", "excluding ramp", "excluding board wipes"],
    rejects: ["otag counterspell", "function ramp", "oracletag board"]
  }
];

for (const testCase of translationCases) {
  try {
    const result = translateScryfallSyntaxToPlainText(testCase.query);
    assertNoPlainReadingLeakage(result.text, {
      allowedUnknownSetCodes: testCase.allowedUnknownSetCodes || []
    });
    for (const expectedText of testCase.includes || []) {
      assert.ok(result.text.includes(expectedText), `${testCase.name}: missing "${expectedText}" in "${result.text}"`);
    }
    for (const rejectedText of testCase.rejects || []) {
      assert.equal(result.text.toLowerCase().includes(rejectedText.toLowerCase()), false, `${testCase.name}: leaked "${rejectedText}" in "${result.text}"`);
    }
    console.log(`PASS ${testCase.name}: ${result.text}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${testCase.name}`);
    console.error(`  error: ${error.message}`);
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`\n${cases.length} mode cases and ${translationCases.length} leakage cases passed.`);
}

function assertNoPlainReadingLeakage(text, {
  allowedUnknownSetCodes = []
} = {}) {
  const value = String(text || "");
  const allowedUnknowns = new Set(allowedUnknownSetCodes.map((code) => code.toLowerCase()));
  assert.equal(
    /\b-?(?:t|type|c|color|id|identity|s|e|set|edition|g|group|is|legal|f|format|game|prefer|unique|order|sort|display|direction|include|otag|function|oracletag):[^\s)]+|\bid(?:<=|>=|=)[a-z0-9]+\b/i.test(value),
    false,
    `Plain Reading leaked raw field syntax: ${value}`
  );

  const leakagePatterns = [
    /\btype\s+legendary\b/i,
    /\bt\s+creature\b/i,
    /\bc\s+w\b/i,
    /\bid\s*=?\s*br\b/i,
    /\bidentity\s+equals\s+br\b/i,
    /\bset\s+blb\b/i,
    /\bedition\s+blb\b/i,
    /\bg\s+fin\b/i,
    /\blegal\s+commander\b/i,
    /\bf\s+commander\b/i,
    /\bgame\s+paper\b/i,
    /\bprefer\s+best\b/i,
    /\border\s+name\b/i,
    /\bunique\s+cards\b/i,
    /\botag\s+draw\b/i,
    /\bfunction\s+draw\b/i,
    /\boracletag\s+draw\b/i
  ];
  for (const pattern of leakagePatterns) {
    assert.equal(pattern.test(value), false, `Plain Reading leaked display-normalized syntax: ${value}`);
  }

  const fallbackMatches = [...value.toLowerCase().matchAll(/\bfrom set ([a-z0-9]+)\b/g)];
  for (const match of fallbackMatches) {
    const code = match[1];
    assert.equal(knownSetCodes.has(code), false, `Known set code used unknown fallback: ${value}`);
    assert.ok(allowedUnknowns.has(code), `Unexpected unknown set fallback "${code}" in: ${value}`);
  }
}

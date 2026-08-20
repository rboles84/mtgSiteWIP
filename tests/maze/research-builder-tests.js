import assert from "node:assert/strict";
import { buildVisualBuilderQuery, parseKeywordInput } from "../../assets/js/maze/research-builder.js";

const KEYWORDS = [
  "cascade", "convoke", "cycling", "deathtouch", "defender", "double strike",
  "equip", "escape", "explore", "first strike", "flash", "flying", "haste",
  "hexproof", "indestructible", "investigate", "kicker", "landfall", "lifelink",
  "menace", "morph", "proliferate", "protection", "prowess", "reach", "scry",
  "shroud", "surveil", "trample", "vigilance", "ward"
].sort();

const cases = [
  {
    name: "screenshot builder combo",
    filters: {
      colors: ["W"],
      colorOp: "c",
      types: ["instant", "enchantment", "artifact"],
      format: "pioneer",
      rarities: ["c"],
      keywords: parseKeywordInput("menace, deathtouch", KEYWORDS)
    },
    expected: "c=w (t:instant OR t:enchantment OR t:artifact) f:pioneer r:c (kw:menace OR kw:deathtouch)"
  },
  {
    name: "comma and text splits into separate keywords",
    input: "menace, deathtouch and flying",
    expectedKeywords: ["menace", "deathtouch", "flying"]
  },
  {
    name: "multi-word keyword is quoted",
    filters: {
      colors: ["U", "W"],
      colorOp: "c<=",
      keywords: ["first strike", "ward"]
    },
    expected: "c<=wu (kw:\"first strike\" OR kw:ward)"
  },
  {
    name: "commander identity colors",
    filters: {
      colors: ["R", "G"],
      colorOp: "id",
      types: ["creature"]
    },
    expected: "id<=rg t:creature"
  },
  {
    name: "colorless stays colorless syntax",
    filters: {
      colors: ["C"],
      colorOp: "c",
      types: ["artifact"]
    },
    expected: "c:c t:artifact"
  },
  {
    name: "mana value range",
    filters: {
      colors: ["B"],
      colorOp: "c>=",
      cmcMin: "2",
      cmcMax: "5"
    },
    expected: "c>=b mv>=2 mv<=5"
  }
];

let failures = 0;

for (const testCase of cases) {
  try {
    if (testCase.input) {
      assert.deepEqual(parseKeywordInput(testCase.input, KEYWORDS), testCase.expectedKeywords);
      console.log(`PASS ${testCase.name}: ${testCase.expectedKeywords.join(", ")}`);
      continue;
    }

    const query = buildVisualBuilderQuery(testCase.filters);
    assert.equal(query, testCase.expected);
    console.log(`PASS ${testCase.name}: ${query}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${testCase.name}`);
    console.error(`  error: ${error.message}`);
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`\n${cases.length} builder cases passed.`);
}

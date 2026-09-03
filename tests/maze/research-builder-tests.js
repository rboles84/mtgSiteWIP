import assert from "node:assert/strict";
import {
  buildVisualBuilderQuery,
  parseKeywordInput,
  validateVisualBuilderFilters
} from "../../assets/js/maze/research-builder.js";

const KEYWORDS = [
  "cascade", "convoke", "cycling", "deathtouch", "defender", "double strike",
  "equip", "escape", "explore", "first strike", "flash", "flying", "haste",
  "hexproof", "indestructible", "investigate", "kicker", "landfall", "lifelink",
  "menace", "morph", "proliferate", "protection", "prowess", "reach", "scry",
  "shroud", "surveil", "trample", "vigilance", "ward"
].sort();

const cases = [
  {
    name: "Commander-first WU default",
    filters: {
      colors: ["U", "W"],
      format: "commander"
    },
    expected: "id<=wu f:commander"
  },
  {
    name: "printed exact colors stay semantically distinct",
    filters: {
      colors: ["W", "U"],
      colorOp: "c",
      format: "commander"
    },
    expected: "c=wu f:commander"
  },
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
    name: "colorless identity stays exact when selected alone",
    filters: {
      colors: ["C"],
      colorOp: "id",
      format: "commander"
    },
    expected: "id:c f:commander"
  },
  {
    name: "Commander colors can exclude exact colorless identity",
    filters: {
      colors: ["B", "R"],
      colorOp: "id",
      excludeColorless: true,
      format: "commander"
    },
    expected: "id<=br -id:c f:commander"
  },
  {
    name: "haste commits as a keyword query",
    filters: {
      keywords: parseKeywordInput("haste", KEYWORDS)
    },
    expected: "kw:haste"
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
  },
  {
    name: "release year only",
    filters: {
      format: "commander",
      releaseYear: "2015"
    },
    expected: "f:commander year=2015"
  },
  {
    name: "release year first printing",
    filters: {
      colors: ["W", "U"],
      format: "commander",
      releaseYear: "2015",
      printingScope: "first-printing"
    },
    expected: "id<=wu f:commander year=2015 is:firstprinting"
  },
  {
    name: "release year introduced new art",
    filters: {
      format: "commander",
      releaseYear: "2015",
      printingScope: "new-art"
    },
    expected: "f:commander year=2015 new:art"
  }
];

assert.deepEqual(
  validateVisualBuilderFilters({ cmcMin: "5", cmcMax: "2" }),
  {
    valid: false,
    code: "builder_invalid_mana_value_range",
    field: "cmcMin",
    message: "Minimum mana value cannot be greater than maximum mana value. Adjust either value before searching."
  },
  "minimum mana value above maximum must block locally"
);

assert.equal(
  validateVisualBuilderFilters({ colors: ["W", "C"], colorOp: "id" }).code,
  "builder_mixed_colorless_unresolved",
  "mixed colorless Commander-fit state must fail closed pending Owner Review"
);

assert.equal(
  validateVisualBuilderFilters({ colors: ["W", "C"], colorOp: "c" }).code,
  "builder_mixed_colorless_unresolved",
  "mixed colorless and colored state must fail closed for alternate relations too"
);

for (const value of ["201", "20x5", "2015.5", "1992", "20155"]) {
  assert.deepEqual(
    validateVisualBuilderFilters({ releaseYear: value }),
    {
      valid: false,
      code: "builder_invalid_release_year",
      field: "releaseYear",
      message: "Enter a four-digit release year from 1993 onward."
    },
    `${value} must block Loom delivery as an invalid release year`
  );
}

assert.equal(validateVisualBuilderFilters({ releaseYear: "" }).valid, true, "blank release year must remain optional");
assert.equal(validateVisualBuilderFilters({ releaseYear: "1993" }).valid, true, "Magic's first release year must be accepted");

assert.doesNotMatch(
  buildVisualBuilderQuery({ colors: ["W", "C"], colorOp: "id" }),
  /id<=wc/,
  "unresolved mixed colorless state must never generate id<=wc"
);

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

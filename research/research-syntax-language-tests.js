import assert from "node:assert/strict";
import { translateScryfallSyntaxToPlainText } from "./research-syntax-language.js";

const cases = [
  {
    name: "color and keyword syntax",
    query: "c:rg kw:deathtouch",
    expected: "red and green with deathtouch"
  },
  {
    name: "exact color with type and rarity",
    query: "c=w t:creature f:pioneer r:c kw:menace",
    expected: "exactly white creature pioneer legal common with menace"
  },
  {
    name: "keyword or group",
    query: "c=w (kw:menace OR kw:deathtouch)",
    expected: "exactly white with menace or deathtouch"
  },
  {
    name: "type or group",
    query: "c=w (t:instant OR t:enchantment OR t:artifact)",
    expected: "exactly white instant, enchantment, or artifact"
  },
  {
    name: "commander identity and mana",
    query: "id<=br t:creature mv<=2",
    expected: "within Rakdos color identity creature mana value 2 or less"
  },
  {
    name: "operator hand fixture",
    query: "t:creature o:/named (?!lands)/ -o:/search your (hand|library)/ -o:draft -o:/(spells|another card|token( with .*)?|returns? (a|all|target) card(s)?|exiled with cards|differently|noted for cards|not|lands? you control|reveal a card you own|cycled a card|choose a) named/ -o:meld -o:/a deck can have/ -o:/named ~ in your graveyard/ -o:/creatures named .* can't attack or block/",
    expectedIncludes: [
      "creature",
      "Oracle text matching named cards while avoiding lands",
      "excluding Oracle text matching search your hand or library",
      "excluding oracle text containing draft",
      "excluding oracle text matching common named-card false positives",
      "excluding oracle text containing meld",
      "excluding oracle text matching deck-construction exception wording",
      "excluding oracle text matching named-card graveyard loops",
      "excluding oracle text matching named-creature attack or block restrictions"
    ],
    assertSanitized: true
  },
  {
    name: "negated oracle and regex",
    query: "t:creature o:/destroy.*creature/ -o:/search your (hand|library)/",
    expected: "creature Oracle text matching destroy creature excluding Oracle text matching search your hand or library"
  },
  {
    name: "commander identity format rarity and mana",
    query: "id<=br t:creature mv<=2 r:c f:commander",
    expected: "within Rakdos color identity creature commander legal common mana value 2 or less"
  },
  {
    name: "dossier exact Grixis commander candidates",
    query: "id=ubr is:commander f:commander (o:discard OR o:\"hand attack\" OR o:sacrifice OR o:\"sac outlets\" OR o:aggro OR o:aggressive OR o:control OR o:permission)",
    expected: "Grixis color identity commander candidates oracle text containing discard, oracle text containing hand attack, oracle text containing sacrifice, oracle text containing sac outlets, oracle text containing aggro, oracle text containing aggressive, oracle text containing control, or oracle text containing permission commander legal"
  },
  {
    name: "dossier support excludes commanders and lands",
    query: "id<=r f:commander -is:commander -t:land (o:graveyard OR o:sacrifice OR o:draw OR o:token)",
    expected: "within red color identity oracle text containing graveyard, oracle text containing sacrifice, oracle text containing draw, or oracle text containing token excluding commander candidates and excluding land commander legal"
  },
  {
    name: "dossier flavor echoes",
    query: "id<=r f:commander (ft:death OR ft:secret OR ft:growth OR ft:law)",
    expected: "within red color identity flavor text containing death, flavor text containing secret, flavor text containing growth, or flavor text containing law commander legal"
  },
  {
    name: "dossier outside identity stretch",
    query: "-id<=r is:commander f:commander (o:graveyard OR o:sacrifice)",
    expected: "commander candidates oracle text containing graveyard or oracle text containing sacrifice outside red color identity commander legal"
  },
  {
    name: "legacy ci identity and negated type",
    query: "ci<=r f:commander -t:legendary (o:graveyard OR o:sacrifice)",
    expected: "within red color identity oracle text containing graveyard or oracle text containing sacrifice excluding legendary commander legal"
  },
  {
    name: "Bloomburrow product family syntax display",
    query: "type:legendary type:creature c:w is:commander legal:commander (game:paper) (set:blb OR set:ablb OR set:blc OR set:pblb OR set:tblb OR set:yblb) prefer:best f:commander",
    expected: "white legendary creature commander candidates from the Bloomburrow product family commander legal",
    assertSanitized: true
  },
  {
    name: "identity operator meanings",
    query: "id=br id<=br id>=br legal:commander",
    expected: "Rakdos color identity, within Rakdos color identity, and including Rakdos colors commander legal"
  },
  {
    name: "known set and family fields",
    query: "s:blb g:fin",
    expected: "from the Bloomburrow set and from the Final Fantasy product family"
  },
  {
    name: "unknown set fallback",
    query: "type:creature set:vmx999",
    expected: "creature from set vmx999"
  },
  {
    name: "functional tag commander display",
    query: "otag:counterspell otag:draw is:commander legal:commander",
    expected: "commander candidates with counterspells and card draw commander legal"
  },
  {
    name: "functional tag aliases display",
    query: "function:draw oracletag:draw",
    expected: "card draw"
  },
  {
    name: "known and unknown functional tag display",
    query: "otag:mana-rock function:treasure oracletag:graveyard-recursion otag:spell-copy",
    expected: "mana rock effects, treasure effects, graveyard recursion effects, and spell copy effects"
  },
  {
    name: "negated functional tag aliases",
    query: "-otag:counterspell -function:ramp -oracletag:board-wipe",
    expected: "excluding counterspells, excluding ramp, and excluding board wipes"
  },
  {
    name: "unhandled raw syntax is preserved",
    query: "name:/^ajani/",
    expected: "name:/^ajani/",
    translated: false
  }
];

let failures = 0;

for (const testCase of cases) {
  try {
    const result = translateScryfallSyntaxToPlainText(testCase.query);
    if (testCase.expectedIncludes) {
      for (const expected of testCase.expectedIncludes) {
        assert.ok(result.text.includes(expected), `${testCase.name}: missing "${expected}"`);
      }
    }
    if (testCase.expected) {
      assert.equal(result.text, testCase.expected);
    }
    if (testCase.assertSanitized) {
      assertPlainTextSanitized(result.text, testCase.name);
    }
    if (Object.prototype.hasOwnProperty.call(testCase, "translated")) {
      assert.equal(result.translated, testCase.translated);
    } else {
      assert.equal(result.translated, true);
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
  console.log(`\n${cases.length} syntax translation cases passed.`);
}

function assertPlainTextSanitized(text, name) {
  assert.equal(text, text.trim(), `${name}: output should be trimmed`);
  assert.equal(/\s{2,}/.test(text), false, `${name}: output should not contain double spaces`);
  assert.equal(/[\/\\|()[\]{}]/.test(text), false, `${name}: output should not leak syntax punctuation`);
  assert.equal(/\b(?:c|o|otag|function|oracletag|kw|mv|id|r|f|t|order|unique|dir|banned|restricted):/i.test(text), false, `${name}: output should not leak operator prefixes`);
}

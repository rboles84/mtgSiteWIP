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
    expected: "exactly white creature cards pioneer legal common with menace"
  },
  {
    name: "keyword or group",
    query: "c=w (kw:menace OR kw:deathtouch)",
    expected: "exactly white with menace or deathtouch"
  },
  {
    name: "type or group",
    query: "c=w (t:instant OR t:enchantment OR t:artifact)",
    expected: "exactly white instant cards, enchantment cards, or artifact cards"
  },
  {
    name: "commander identity and mana",
    query: "id<=br t:creature mv<=2",
    expected: "black and red commander identity creature cards mana value 2 or less"
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
    assert.equal(result.text, testCase.expected);
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

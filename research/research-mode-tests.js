import assert from "node:assert/strict";
import { resolveModeInputValue } from "./research-mode.js";

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
      value: "creature cards Oracle text matching destroy creature excluding Oracle text matching search your hand or library",
      changed: true
    }
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
    assert.deepEqual(resolveModeInputValue(testCase.state), testCase.expected);
    console.log(`PASS ${testCase.name}: ${testCase.expected.value}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${testCase.name}`);
    console.error(`  error: ${error.message}`);
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`\n${cases.length} mode cases passed.`);
}

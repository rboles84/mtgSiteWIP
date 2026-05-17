import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const indexSource = await readFile(new URL("../assets/js/index.js", import.meta.url), "utf8");

const resultStatusIndex = indexSource.indexOf("const resultStatus = dossier.resultStatus;");
const primaryPlacementIndex = indexSource.indexOf("const primaryPlacementHtml =");

assert.ok(resultStatusIndex >= 0, "expected renderResult to define resultStatus");
assert.ok(primaryPlacementIndex >= 0, "expected renderResult to define primaryPlacementHtml");
assert.ok(
  resultStatusIndex < primaryPlacementIndex,
  "resultStatus should be declared before primaryPlacementHtml is built"
);

assert.match(
  indexSource,
  /function returnToPrimaryReading\(\)\s*\{/,
  "expected an explicit return helper for adjacent-fit views"
);
assert.match(
  indexSource,
  /Back to Primary Reading/,
  "expected the adjacent-fit return button label"
);
assert.match(
  indexSource,
  /onclick="returnToPrimaryReading\(\)"/,
  "expected the return control to call the helper"
);

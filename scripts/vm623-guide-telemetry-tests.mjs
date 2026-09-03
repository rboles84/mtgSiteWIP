import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [overview, reading, maze, introWalkthrough, readingWalkthrough, mazeWalkthrough, sharedWalkthrough, guideTelemetry] = await Promise.all([
  read("guide/index.html"),
  read("guide/reading/index.html"),
  read("guide/maze/index.html"),
  read("assets/js/guide/intro-walkthrough.js"),
  read("assets/js/guide/reading-walkthrough.js"),
  read("assets/js/guide/maze-walkthrough.js"),
  read("assets/js/shared/guide-walkthrough.js"),
  read("assets/js/guide/guide-telemetry.js"),
]);

assert.match(introWalkthrough, /bootGuideTelemetry\(\{ guideSurface: "overview", walkthroughId: INTRO_WALKTHROUGH\.id \}\)/);
assert.match(readingWalkthrough, /bootGuideTelemetry\(\{ guideSurface: "reading", walkthroughId: READING_WALKTHROUGH\.id \}\)/);
assert.match(mazeWalkthrough, /bootGuideTelemetry\(\{ guideSurface: "maze", walkthroughId: MAZE_WALKTHROUGH\.id \}\)/);
assert.match(sharedWalkthrough, /trackVoxGuideWalkthrough/);
assert.match(sharedWalkthrough, /state: "started"/);
assert.match(sharedWalkthrough, /state: exitReason === "done" \? "completed" : "closed"/);

for (const [html, expectedDestinations] of [
  [overview, ["archscry", "maze", "strategium", "apocrypha"]],
  [reading, ["archscry", "maze"]],
  [maze, ["maze"]],
]) {
  for (const destination of expectedDestinations) {
    assert.match(html, new RegExp(`data-guide-cta="${destination}"`));
  }
}

assert.match(guideTelemetry, /\[data-guide-cta\]/);
assert.doesNotMatch(guideTelemetry, /posthog\s*\.\s*capture/i);
assert.doesNotMatch(sharedWalkthrough, /posthog\s*\.\s*capture/i);
console.log("VM-623 Guide telemetry wiring tests passed.");

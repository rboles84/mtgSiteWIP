import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [archscryHtml, archscryCss, dossierView, readingGuideHtml, readingGuideCss] = await Promise.all([
  readFile("archscry/index.html", "utf8"),
  readFile("assets/css/archscry.css", "utf8"),
  readFile("assets/js/archscry/runtime/dossier-view.js", "utf8"),
  readFile("guide/reading/index.html", "utf8"),
  readFile("assets/css/guide-reading.css", "utf8"),
]);

const count = (source, pattern) => [...source.matchAll(pattern)].length;

assert.match(archscryHtml, /assets\/css\/archscry\.css\?v=vm625f/);
assert.equal(count(dossierView, /class="[^"]*\bdossier-orientation-guide\b[^"]*"/g), 1);
assert.match(dossierView, /How to read your dossier/);
assert.match(dossierView, /href="\.\.\/guide\/reading\/\?guided=dossier-reading"/);
assert.match(dossierView, /What do you want from this result\?/);
assert.match(dossierView, /You do not need to read every section\./);

const orientationSource = dossierView.match(/const dossierOrientationHtml[\s\S]*?const primaryName/)?.[0] || "";
assert.equal(count(orientationSource, /buildActionAttrs\("set-dossier-panel"/g), 4);
for (const mapping of [
  ["Understand the result", "placement"],
  ["Choose a first deck direction", "start"],
  ["Compare Commander starting points", "commander-deck-starts"],
  ["Keep exploring with cards", "maze-discovery"],
]) {
  assert.match(orientationSource, new RegExp(`${mapping[0]}[\\s\\S]*?panelId: "${mapping[1]}"|panelId: "${mapping[1]}"[\\s\\S]*?${mapping[0]}`));
}

assert.match(dossierView, /`Current best fit: \$\{primaryName\}`/);
assert.match(dossierView, /Close result: \$\{primaryName\}, with \$\{alternativeName\} also supported/);
assert.match(dossierView, /Legacy reading — evidence detail unavailable/);
assert.match(dossierView, /These are places to begin browsing this direction, not a definitive ranking\./);
assert.doesNotMatch(orientationSource, /score|percentage|confidence/i);

assert.match(archscryCss, /\.dossier-orientation\s*\{/);
assert.match(archscryCss, /\.dossier-orientation-actions button:focus-visible/);
assert.match(archscryCss, /@media \(max-width: 940px\)[\s\S]*?\.dossier-orientation/);
assert.match(archscryCss, /@media \(max-width: 560px\)[\s\S]*?\.dossier-orientation-actions/);

assert.equal(count(readingGuideHtml, /<h1\b/gi), 1);
assert.match(readingGuideHtml, /<h1 id="reading-guide-title" tabindex="-1">Read the result\. Choose one next step\.<\/h1>/);
assert.match(readingGuideHtml, /Your result is a direction to inspect, not a verdict to obey\./);
assert.doesNotMatch(readingGuideHtml, /Your reading is a direction to inspect, not a verdict to obey\./);
assert.match(readingGuideHtml, /data-vm-current="guide"/);
assert.match(readingGuideHtml, /href="\.\.\/index\.html" data-vm-nav="guide">Guide<\/a>/);
assert.match(readingGuideHtml, /id="dossier-map"/);
assert.match(readingGuideHtml, /Reading[\s\S]*?Supported direction[\s\S]*?Dossier/);
assert.match(readingGuideHtml, /Supported direction<\/small><strong>The direction those answers support<\/strong>/);
assert.doesNotMatch(readingGuideHtml, /The result those answers favor/);
assert.match(readingGuideHtml, /I \/\/ What placement means/);
assert.match(readingGuideHtml, /II \/\/ Where to start/);
assert.match(readingGuideHtml, /III \/\/ Dossier anatomy/);
assert.match(readingGuideHtml, /IV \/\/ What next/);
assert.ok(
  readingGuideHtml.indexOf("I // What placement means") < readingGuideHtml.indexOf("II // Where to start") &&
    readingGuideHtml.indexOf("II // Where to start") < readingGuideHtml.indexOf("III // Dossier anatomy") &&
    readingGuideHtml.indexOf("III // Dossier anatomy") < readingGuideHtml.indexOf("IV // What next")
);
for (const label of [
  "Placement",
  "Start Here",
  "Why This Fits",
  "Commander Browsing Starts",
  "Card Signals",
  "Mana Notes",
  "Maze Discovery",
]) {
  assert.match(readingGuideHtml, new RegExp(`>${label}<`));
}
assert.doesNotMatch(readingGuideHtml, /placement score|confidence percentage|personality verdict/i);
assert.doesNotMatch(readingGuideHtml, /\/guide\/(?:maze|reference)\//);
assert.match(readingGuideCss, /\.reading-guide-meaning/);
assert.match(readingGuideCss, /@media \(max-width: 700px\)/);

console.log("VM-615 reading and dossier onboarding checks passed.");

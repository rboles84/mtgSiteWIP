import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readOptional = async path => readFile(path, "utf8").catch(() => "");

const [
  homeHtml,
  dossierView,
  guideHtml,
  readingHtml,
  introConfig,
  readingConfig,
  sharedLifecycle,
  walkthroughCss,
] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("assets/js/archscry/runtime/dossier-view.js", "utf8"),
  readFile("guide/index.html", "utf8"),
  readFile("guide/reading/index.html", "utf8"),
  readOptional("assets/js/guide/intro-walkthrough.js"),
  readOptional("assets/js/guide/reading-walkthrough.js"),
  readFile("assets/js/shared/guide-walkthrough.js", "utf8"),
  readFile("assets/css/guide-walkthrough.css", "utf8"),
]);

assert.match(homeHtml, /data-guide-beacon-id="home-guide-entry"[\s\S]*?href="\.\/guide\/\?guided=vox-mana-intro"|href="\.\/guide\/\?guided=vox-mana-intro"[\s\S]*?data-guide-beacon-id="home-guide-entry"/);
assert.match(dossierView, /data-guide-beacon-id="dossier-reading-help"[\s\S]*?href="\.\.\/guide\/reading\/\?guided=dossier-reading"|href="\.\.\/guide\/reading\/\?guided=dossier-reading"[\s\S]*?data-guide-beacon-id="dossier-reading-help"/);

// Owner-locked Home copy: recorded answers retain their meaning, and the relationship step stays concise.
assert.ok(introConfig.includes('description: "Archscry uses your answers about Commander table moments to surface a supported direction you can inspect in a dossier."'));
assert.ok(introConfig.includes('description: "See how readings, dossiers, and card discovery connect, with Strategium and Apocrypha supporting table learning and source checking."'));
assert.doesNotMatch(introConfig, /\bguesses\b/i);
assert.ok(introConfig.includes('title: "Find your Commander direction"'));
assert.ok(introConfig.includes('title: "See how Vox Mana fits together"'));

for (const [source, id, modulePath, targets, focusTargets] of [
  [introConfig, "vox-mana-intro", "../assets/js/guide/intro-walkthrough.js", ["#guide-archscry", "#guide-maze", "#guide-strategium", "#how-vox-connects"], ["#guide-archscry-title", "#guide-maze-title", "#guide-strategium-title", "#guide-relationship-title"]],
  [readingConfig, "dossier-reading", "../../assets/js/guide/reading-walkthrough.js", ["#reading-placement-meaning", "#reading-where-to-start", "#dossier-map", "#reading-next"], ["#placement-meaning-title", "#where-to-start-title", "#dossier-map-title", "#reading-next-title"]],
]) {
  assert.ok(source, `${id} should have a route configuration`);
  assert.match(source, new RegExp(`id: "${id}"`));
  assert.equal((source.match(/target: "#/g) || []).length, 4, `${id} should have exactly four step targets`);
  assert.equal((source.match(/focusTarget: "#/g) || []).length, 4, `${id} should have exactly four focus targets`);
  for (const target of targets) assert.ok(source.includes(`target: "${target}"`), `${id} should target ${target}`);
  for (const target of focusTargets) assert.ok(source.includes(`focusTarget: "${target}"`), `${id} should focus ${target}`);
  assert.match(source, /startGuideWalkthrough/);
  assert.match(source, /driverjs\/1\.8\.0\/driver\.js\.iife\.js/);
  assert.match(source, /guide-walkthrough\.css/);
  const html = id === "vox-mana-intro" ? guideHtml : readingHtml;
  assert.ok(html.includes(`src="${modulePath}"`), `${id} static Guide should load only its small route adapter`);
  assert.doesNotMatch(html, /driver\.js\.iife\.js|driver\.css|guide-walkthrough\.css/);
}

for (const [html, required] of [
  [guideHtml, ["guide-title", "guide-archscry", "guide-maze", "guide-strategium", "how-vox-connects", "guide-archscry-title", "guide-maze-title", "guide-strategium-title", "guide-relationship-title"]],
  [readingHtml, ["reading-guide-title", "reading-placement-meaning", "reading-where-to-start", "dossier-map", "reading-next", "placement-meaning-title", "where-to-start-title", "dossier-map-title", "reading-next-title"]],
]) {
  for (const id of required) assert.match(html, new RegExp(`id="${id}"`), `Guide markup should expose #${id}`);
}

assert.match(guideHtml, /<h1 id="guide-title" tabindex="-1">/);
assert.match(readingHtml, /<h1 id="reading-guide-title" tabindex="-1">/);
for (const heading of ["guide-archscry-title", "guide-maze-title", "guide-strategium-title", "guide-relationship-title"]) {
  assert.match(guideHtml, new RegExp(`<h2 id="${heading}" tabindex="-1">`));
}
for (const heading of ["placement-meaning-title", "where-to-start-title", "dossier-map-title", "reading-next-title"]) {
  assert.match(readingHtml, new RegExp(`<h2 id="${heading}" tabindex="-1">`));
}

assert.match(sharedLifecycle, /readGuidedRequest\(config\.id\)/);
assert.match(sharedLifecycle, /resolvedSteps\.length !== 4/);
assert.match(sharedLifecycle, /removeGuidedParameter/);
assert.match(sharedLifecycle, /disableActiveInteraction: true/);
assert.match(sharedLifecycle, /prefersReducedMotion/);
assert.doesNotMatch(`${introConfig}\n${readingConfig}\n${sharedLifecycle}`, /localStorage|sessionStorage|cookie|telemetry/i);
assert.match(walkthroughCss, /#guide-title:focus/);
assert.match(walkthroughCss, /#reading-guide-title:focus/);

console.log("VM-621 Home and dossier guided-reading static contracts passed.");

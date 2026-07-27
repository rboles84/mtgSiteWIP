import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const review = await readFile(path.join(root, "assets/js/strategium-review.js"), "utf8");
const consoleRuntime = await readFile(path.join(root, "assets/js/strategium.js"), "utf8");
const hubHtml = await readFile(path.join(root, "strategium/index.html"), "utf8");
const reviewHtml = await readFile(path.join(root, "strategium/review/index.html"), "utf8");
const consoleHtml = await readFile(path.join(root, "strategium/console/index.html"), "utf8");
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const openingChoices = [
  "I lost",
  "I won, but I'm not sure why",
  "I couldn't follow what was happening",
  "The game felt one-sided or unwinnable",
  "The table experience felt bad",
  "I'm not sure what I should take from it",
];
const lossChoices = [
  "My deck never got going",
  "My opening hand may have been wrong",
  "I drew too many or too few lands",
  "I think I played things in the wrong order",
  "My important cards kept getting stopped",
  "I didn't understand another deck's plan",
  "Everyone seemed to focus on me",
  "The other decks seemed much stronger",
  "I was doing things, but none of them mattered",
  "I honestly don't know",
];

for (const choice of [...openingChoices, ...lossChoices]) {
  expect(review.includes(choice), `Missing required diagnostic choice: ${choice}`);
}

for (const heading of [
  "What may have happened",
  "What to look for next time",
  "One thing to try",
  "Learn more",
]) {
  expect(review.includes(heading), `Result renderer is missing required section: ${heading}`);
}

for (const choice of ["Yes", "Partly", "No", "Something was missing"]) {
  expect(review.includes(`"${choice}"`), `Feedback control is missing: ${choice}`);
}

const happenedCopy = [...review.matchAll(/happened:\s*"([^"]+)"/g)].map(match => match[1]);
expect(happenedCopy.length === 14, `Expected 14 authored result patterns, found ${happenedCopy.length}`);
for (const copy of happenedCopy) {
  expect(
    /\b(may|might|possibility|can happen|cannot prove|cannot decide)\b/i.test(copy),
    `Result explanation should remain qualified: ${copy}`
  );
}

for (const lesson of [
  "command-zone",
  "pod-readiness",
  "archetype-signal",
  "threat-reading",
  "heat-management",
  "beyond-wubrg",
]) {
  expect(consoleRuntime.includes(`"${lesson}"`), `Console runtime is missing lesson ${lesson}`);
  expect(review.includes(`lesson: "${lesson}"`), `Review routing is missing Console lesson ${lesson}`);
}

expect(consoleHtml.includes("Commander Readiness Checklist"), "Console should retain the Commander Readiness Checklist");
expect(consoleHtml.includes("How Your Colors Look to the Pod"), "Console should retain color-to-pod expectations");
expect(hubHtml.includes("Help Me Understand") && hubHtml.includes("Learn the Commander Table"), "Hub should expose both Strategium experiences");
expect(reviewHtml.includes('id="strategiumReview"'), "Review route should expose the diagnostic mount");
expect(review.includes("window.addEventListener(\"popstate\""), "Review should handle browser back/forward");
expect(review.includes("updateUrl(\"replace\")"), "Review should normalize refresh/deep-link state safely");
expect(!review.includes("fetch("), "Review MVP should not submit feedback to a backend");
expect(review.includes("Actual power") && review.includes("Visible power") && review.includes("Expected future power") && review.includes("Remembered power") && review.includes("Social pressure"), "Targeting result should distinguish all five required signals");

for (const file of [
  "strategium/index.html",
  "strategium/review/index.html",
  "strategium/console/index.html",
]) {
  await access(path.join(root, file));
}

async function checkInternalLinks(file, source) {
  const baseHref = source.match(/<base\b[^>]*\bhref="([^"]+)"/i)?.[1] || "";
  const pageDirectory = path.dirname(path.join(root, file));
  const linkBase = baseHref ? path.resolve(pageDirectory, baseHref) : pageDirectory;
  const hrefs = [...source.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(match => match[1]);

  for (const href of hrefs) {
    if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
    const cleanHref = href.split(/[?#]/, 1)[0];
    const resolved = path.resolve(linkBase, cleanHref);
    const target = path.extname(resolved) ? resolved : path.join(resolved, "index.html");
    try {
      await access(target);
    } catch {
      failures.push(`${file} has a broken internal link: ${href}`);
    }
  }
}

await checkInternalLinks("strategium/index.html", hubHtml);
await checkInternalLinks("strategium/review/index.html", reviewHtml);
await checkInternalLinks("strategium/console/index.html", consoleHtml);

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log("Strategium review checks passed: 6 opening choices, 10 loss choices, and 14 qualified result patterns.");

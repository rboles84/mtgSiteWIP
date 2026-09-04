import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

globalThis.VM_SESSION = { profile: {} };
globalThis.window = {
  addEventListener() {},
  location: { href: "http://localhost/archscry/", search: "", hash: "" },
  history: { replaceState() {} },
};
globalThis.document = {
  addEventListener() {},
  querySelectorAll() { return []; },
  querySelector() { return null; },
  getElementById() { return null; },
  body: {},
};
const {
  buildIdentityDirectoryEntries,
} = await import("../../assets/js/archscry/runtime/identity-directory.js");
const {
  buildIdentityAtlasHtml,
  buildIdentityAtlasSigilHtml,
  resolveIdentityExploreRequest,
} = await import("../../assets/js/archscry/runtime/identity-atlas.js");

const root = process.cwd();
const host = "127.0.0.1";
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const identityLayers = JSON.parse(fs.readFileSync(path.join(root, "data", "identity-layers.json"), "utf8"));
const livePlacementWitnesses = JSON.parse(fs.readFileSync(
  path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"),
  "utf8"
));
const savedAzoriusPlacement = livePlacementWitnesses.rows.find((entry) => entry.identity_key === "WU")?.result;
const entries = buildIdentityDirectoryEntries({ identityLayers, factions });

assert.equal(entries.length, 37, "Atlas must expose exactly 37 active registry destinations");
assert.equal(entries.filter((entry) => !entry.isStrixhavenExpression).length, 32);
assert.equal(entries.filter((entry) => entry.isStrixhavenExpression).length, 5);
assert.equal(new Set(entries.map((entry) => entry.slug)).size, 37, "Atlas slugs must be unique");
assert.deepEqual(
  entries.map((entry) => entry.kind),
  [
    ...Array(5).fill("color"),
    ...Array(10).fill("guild"),
    ...Array(5).fill("college"),
    ...Array(5).fill("shard"),
    ...Array(5).fill("wedge"),
    ...Array(5).fill("four_color"),
    "colorless",
    "five_color",
  ],
  "Atlas must preserve the VM-579 canonical taxonomy order"
);
assert.deepEqual(entries.slice(0, 5).map((entry) => entry.key), ["W", "U", "B", "R", "G"]);
assert.deepEqual(entries.slice(-2).map((entry) => entry.key), ["COLORLESS", "WUBRG"]);

const expectedCases = [
  { key: "JUND", name: "Jund", slug: "jund", code: "B · R · G" },
  { key: "WR", name: "Boros", slug: "boros", code: "R · W" },
  { key: "LOREHOLD", name: "Lorehold", slug: "lorehold", code: "R · W" },
  { key: "COLORLESS", name: "Colorless", slug: "colorless", code: "C" },
  { key: "WUBRG", name: "Five-Color", slug: "wubrg", code: "W · U · B · R · G" },
];
for (const expected of expectedCases) {
  const entry = entries.find((candidate) => candidate.key === expected.key);
  assert.ok(entry, `missing ${expected.key} Atlas entry`);
  assert.equal(entry.name, expected.name);
  assert.equal(entry.slug, expected.slug);
  assert.equal(entry.colorCode, expected.code);
}
const boros = entries.find((entry) => entry.key === "WR");
const lorehold = entries.find((entry) => entry.key === "LOREHOLD");
assert.deepEqual(boros.colors, lorehold.colors, "Boros and Lorehold must share their RW color basis");
assert.notEqual(boros.slug, lorehold.slug, "Boros and Lorehold must remain separate destinations");
assert.notEqual(boros.key, lorehold.key, "Boros and Lorehold must retain separate semantic registries");

const atlasHtml = buildIdentityAtlasHtml(entries, { hasSavedReading: true });
assert.equal((atlasHtml.match(/<a class="identity-atlas-card idcard"/g) || []).length, 37);
assert.doesNotMatch(atlasHtml, /aria-pressed=/, "Atlas cards are navigation, not selection controls");
assert.match(atlasHtml, /Browse all 32 Commander color identities plus five Strixhaven expressions/);
assert.match(atlasHtml, /Return to your saved reading/);
assert.equal((buildIdentityAtlasSigilHtml(["W", "U"]).match(/r="12"/g) || []).length, 2);
assert.equal((buildIdentityAtlasSigilHtml(["W", "U"]).match(/<path /g) || []).length, 1);
assert.equal((buildIdentityAtlasSigilHtml(["B", "R", "G"]).match(/r="12"/g) || []).length, 3);
assert.equal((buildIdentityAtlasSigilHtml(["W", "U", "B", "R", "G"]).match(/<path /g) || []).length, 5);
assert.equal(resolveIdentityExploreRequest("?explore=jund", entries).entry?.key, "JUND");
assert.equal(resolveIdentityExploreRequest("?explore=atlas", entries).type, "atlas");
assert.deepEqual(resolveIdentityExploreRequest("?explore=not-real", entries), {
  type: "atlas",
  requestedSlug: "not-real",
  invalidSlug: "not-real",
  entry: null,
});

assert.equal(savedAzoriusPlacement?.faction, "WU", "saved-reading isolation test requires the accepted Azorius witness");

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || host}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const resolved = path.resolve(root, `.${pathname}`);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": mimeTypes.get(path.extname(resolved).toLowerCase()) || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, host, resolve));
const port = server.address().port;
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter((candidate) => candidate && fs.existsSync(candidate));
assert.ok(browserCandidates.length, "Identity Atlas browser test requires Edge or LIGHTHOUSE_CHROME_PATH");

let launchedChrome;
let browser;
try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: browserCandidates[0],
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    logLevel: "silent",
  });
  browser = await puppeteer.connect({ browserURL: `http://${host}:${launchedChrome.port}` });

  async function newPage(url, { savedPlacement = null, fresh = false, width = 1280, height = 900 } = {}) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument((placement, shouldClear) => {
      globalThis.__vmVisualRegressionDisableCardArt = true;
      if (!sessionStorage.getItem("vm625-seeded")) {
        sessionStorage.clear();
        if (shouldClear) localStorage.clear();
        if (placement) {
          localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(placement));
          sessionStorage.setItem("vm_profile", JSON.stringify({ sentinel: "vm625-profile" }));
          localStorage.setItem("vm_archscry_maze_handoff_v1", JSON.stringify({
            sentinel: "vm625-stale-azorius-handoff",
            placementResult: placement,
            fit: placement.faction,
          }));
        }
        localStorage.setItem("vm625-owner-state", "preserve-me");
        sessionStorage.setItem("vm625-seeded", "1");
      }
      globalThis.supabase = {
        createClient() {
          return {
            auth: {
              getSession: async () => ({ data: { session: null }, error: null }),
              signInWithOAuth: async () => ({ data: null, error: null }),
              signOut: async () => ({ error: null }),
            },
          };
        },
      };
    }, savedPlacement, fresh);
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const requestUrl = request.url();
      if (requestUrl.startsWith(`http://${host}:${port}`)) {
        request.continue();
        return;
      }
      if (requestUrl.startsWith("https://api.scryfall.com/cards/search")) {
        request.respond({
          status: 200,
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ object: "list", total_cards: 0, has_more: false, data: [] }),
        });
        return;
      }
      request.abort();
    });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    return { page, errors };
  }

  const atlasSession = await newPage(`http://${host}:${port}/archscry/?explore=atlas`, {
    savedPlacement: savedAzoriusPlacement,
  });
  const atlasPage = atlasSession.page;
  await atlasPage.waitForSelector("[data-identity-atlas]", { timeout: 15000 });
  const savedStateBaseline = await atlasPage.evaluate(() => ({
    savedReading: localStorage.getItem("vm_archscry_saved_reading_v1"),
    legacyResult: sessionStorage.getItem("vm_last_result"),
    profile: sessionStorage.getItem("vm_profile"),
    handoff: localStorage.getItem("vm_archscry_maze_handoff_v1"),
    owner: localStorage.getItem("vm625-owner-state"),
  }));
  const atlasState = await atlasPage.evaluate(() => ({
    cards: document.querySelectorAll("a.identity-atlas-card[href*='?explore=']").length,
    buttons: document.querySelectorAll("button.identity-atlas-card,[aria-pressed].identity-atlas-card").length,
    commanderCount: document.querySelector("[data-identity-atlas]")?.dataset.commanderIdentityCount,
    expressionCount: document.querySelector("[data-identity-atlas]")?.dataset.strixhavenExpressionCount,
    savedLink: document.querySelector(".identity-atlas-saved-link")?.textContent?.trim(),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  assert.deepEqual(atlasState, {
    cards: 37,
    buttons: 0,
    commanderCount: "32",
    expressionCount: "5",
    savedLink: "Return to your saved reading",
    overflow: false,
  });
  const cardFocus = await atlasPage.$eval("a.identity-atlas-card[href='?explore=jund']", (card) => {
    card.focus();
    const styles = getComputedStyle(card);
    return { label: card.getAttribute("aria-label"), outlineStyle: styles.outlineStyle, outlineWidth: styles.outlineWidth };
  });
  assert.match(cardFocus.label, /Explore the Jund dossier, B · R · G/);
  assert.notEqual(cardFocus.outlineStyle, "none", "Atlas card focus must remain visible");
  assert.notEqual(cardFocus.outlineWidth, "0px", "Atlas card focus must remain visible");

  await atlasPage.click("a.identity-atlas-card[href='?explore=jund']");
  await atlasPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']", { timeout: 15000 });
  const jundBrowse = await atlasPage.evaluate(() => ({
    url: location.search,
    eyebrow: document.querySelector(".guild-banner[data-identity-explore='true'] .guild-eyebrow")?.textContent?.trim(),
    placementPanels: document.querySelectorAll("[data-dossier-panel='placement']").length,
    text: document.getElementById("result-inner")?.innerText || "",
    allIdentitiesHref: document.querySelector(".identity-explore-nav a[href*='explore=atlas']")?.getAttribute("href"),
    savedReturn: [...document.querySelectorAll(".identity-explore-nav a")].find((link) => /saved reading/i.test(link.textContent || ""))?.textContent?.trim(),
  }));
  assert.match(jundBrowse.url, /explore=jund/);
  assert.equal(jundBrowse.eyebrow, "Identity dossier - browsing");
  assert.equal(jundBrowse.placementPanels, 0);
  assert.equal(jundBrowse.allIdentitiesHref, "?explore=atlas");
  assert.equal(jundBrowse.savedReturn, "Return to your saved reading");
  assert.doesNotMatch(jundBrowse.text, /your identity|your placement|your result|we placed you|based on your answers|your reading found|your strongest match/i);
  assert.deepEqual(await atlasPage.evaluate(() => ({
    savedReading: localStorage.getItem("vm_archscry_saved_reading_v1"),
    legacyResult: sessionStorage.getItem("vm_last_result"),
    profile: sessionStorage.getItem("vm_profile"),
    handoff: localStorage.getItem("vm_archscry_maze_handoff_v1"),
    owner: localStorage.getItem("vm625-owner-state"),
  })), savedStateBaseline, "opening a browsed dossier must preserve saved-reading storage byte-for-byte");

  await atlasPage.goBack({ waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-identity-atlas]");
  await atlasPage.goForward({ waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']");
  await atlasPage.reload({ waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']");

  const jundMazeLaunch = await atlasPage.$eval(
    "[data-dossier-panel='maze-discovery'] a[data-service='maze']",
    (link) => ({ href: link.href, params: Object.fromEntries(new URL(link.href).searchParams) })
  );
  assert.equal(jundMazeLaunch.params.contextMode, "identity-explore");
  assert.equal(jundMazeLaunch.params.exploreIdentity, "JUND");
  assert.equal(jundMazeLaunch.params.fit, "JUND");
  assert.match(jundMazeLaunch.params.returnUrl, /explore=jund/);
  await atlasPage.goto(jundMazeLaunch.href, { waitUntil: "domcontentloaded", timeout: 30000 });
  await atlasPage.waitForSelector("#maze-return-banner.is-visible", { timeout: 15000 });
  await atlasPage.waitForSelector("#reading-path-list .sb-btn", { timeout: 15000 });
  const mazeState = await atlasPage.evaluate(() => ({
    returnCopy: document.getElementById("maze-return-copy")?.textContent?.replace(/\s+/g, " ").trim(),
    returnLabel: document.getElementById("maze-return-link")?.textContent?.trim(),
    returnHref: document.getElementById("maze-return-link")?.getAttribute("href"),
    disclosure: document.getElementById("maze-reading-context")?.innerText || "",
    queries: [...document.querySelectorAll("#reading-path-list .sb-btn")].map((button) => button.dataset.query || ""),
    savedReading: localStorage.getItem("vm_archscry_saved_reading_v1"),
    legacyResult: sessionStorage.getItem("vm_last_result"),
    profile: sessionStorage.getItem("vm_profile"),
    handoff: localStorage.getItem("vm_archscry_maze_handoff_v1"),
    owner: localStorage.getItem("vm625-owner-state"),
  }));
  assert.match(mazeState.returnCopy, /Exploring Jund/);
  assert.equal(mazeState.returnLabel, "Return to Jund dossier");
  assert.match(mazeState.returnHref, /explore=jund/);
  assert.match(mazeState.disclosure, /Jund dossier/i);
  assert.doesNotMatch(mazeState.disclosure, /your dossier|your reading/i);
  assert.ok(mazeState.queries.some((query) => /\bid=brg\b/i.test(query)), "From Your Dossier must use Jund queries");
  assert.deepEqual({
    savedReading: mazeState.savedReading,
    legacyResult: mazeState.legacyResult,
    profile: mazeState.profile,
    handoff: mazeState.handoff,
    owner: mazeState.owner,
  }, savedStateBaseline, "Maze exploration must preserve saved-reading storage byte-for-byte");

  await atlasPage.goto(`http://${host}:${port}/archscry/?explore=boros`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-identity-key='WR'][data-identity-explore='true']");
  const borosLaunch = await atlasPage.$eval("[data-dossier-panel='maze-discovery'] a[data-service='maze']", (link) => Object.fromEntries(new URL(link.href).searchParams));
  await atlasPage.goto(`http://${host}:${port}/archscry/?explore=lorehold`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-identity-key='LOREHOLD'][data-identity-explore='true']");
  const loreholdLaunch = await atlasPage.$eval("[data-dossier-panel='maze-discovery'] a[data-service='maze']", (link) => Object.fromEntries(new URL(link.href).searchParams));
  assert.equal(borosLaunch.exploreIdentity, "WR");
  assert.equal(loreholdLaunch.exploreIdentity, "LOREHOLD");
  assert.notEqual(borosLaunch.factionName, loreholdLaunch.factionName);

  await atlasPage.goto(`http://${host}:${port}/archscry/?explore=not-real`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-identity-atlas]");
  assert.match(await atlasPage.$eval(".identity-atlas-recovery", (node) => node.textContent || ""), /requested identity was unavailable/i);
  assert.equal(await atlasPage.$("[data-dossier-console]"), null, "invalid exploration must recover to Atlas instead of a saved result");

  await atlasPage.goto(`http://${host}:${port}/archscry/`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-console][data-dossier-identity-key='WU']:not([data-identity-explore='true'])", { timeout: 15000 });
  assert.deepEqual(await atlasPage.evaluate(() => ({
    placement: JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null")?.faction,
    profile: sessionStorage.getItem("vm_profile"),
    owner: localStorage.getItem("vm625-owner-state"),
  })), {
    placement: "WU",
    profile: savedStateBaseline.profile,
    owner: "preserve-me",
  }, "clean Archscry must still restore the separately saved Azorius reading");
  assert.deepEqual(atlasSession.errors, [], `Identity Atlas browser errors: ${atlasSession.errors.join(" | ")}`);
  await atlasPage.close();

  const freshSession = await newPage(`http://${host}:${port}/archscry/?explore=jund`, { fresh: true, width: 390, height: 844 });
  const freshPage = freshSession.page;
  await freshPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']", { timeout: 15000 });
  assert.equal(await freshPage.evaluate(() => localStorage.getItem("vm_archscry_saved_reading_v1")), null, "direct exploration must not create a reading");
  assert.equal(await freshPage.$eval(".identity-explore-nav a[href='./index.html']", (link) => link.textContent?.trim()), "Take the reading");
  await freshPage.goto(`http://${host}:${port}/archscry/?explore=atlas`, { waitUntil: "networkidle0", timeout: 30000 });
  await freshPage.waitForSelector("[data-identity-atlas]");
  assert.equal(await freshPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, "mobile Atlas must not overflow horizontally");
  assert.equal(await freshPage.$(".identity-atlas-saved-link"), null);
  assert.deepEqual(freshSession.errors, [], `fresh Identity Atlas browser errors: ${freshSession.errors.join(" | ")}`);
  await freshPage.close();
} finally {
  if (browser) await browser.close();
  if (launchedChrome) {
    try {
      await launchedChrome.kill();
    } catch (error) {
      if (error?.code !== "EPERM") throw error;
    }
  }
  await new Promise((resolve) => server.close(resolve));
}

console.log("Identity Atlas tests passed.");

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { stat } from "node:fs/promises";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const chromeProfileDirectory = path.join(root, "outputs", "vm547-owner-review", `chrome-profile-${process.pid}`);
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data", "dossier", "maze-discovery-profiles.catalog.json"), "utf8"));
const profiles = [...catalog.profiles].sort((left, right) => left.identity_key.localeCompare(right.identity_key));
const representativeKeys = ["WITHERBLOOM", "WU", "TEMUR", "G", "COLORLESS", "YORE", "WUBRG", "BG"];
const returnKeys = ["WITHERBLOOM", "WU", "TEMUR"];
const returnSlugs = { WITHERBLOOM: "witherbloom", WU: "azorius", TEMUR: "temur" };
const viewports = {
  desktop: { width: 1440, height: 1000 },
  narrow: { width: 820, height: 1000 },
  mobile: { width: 390, height: 844 },
};
const fixtureCard = {
  object: "card",
  id: "54700000-0000-4000-8000-000000000001",
  oracle_id: "54710000-0000-4000-8000-000000000001",
  name: "VM-547 Semantic Witness",
  mana_cost: "{2}",
  cmc: 2,
  type_line: "Artifact Creature — Construct",
  oracle_text: "When this creature enters, draw a card.",
  color_identity: [],
  colors: [],
  legalities: { commander: "legal" },
  rarity: "uncommon",
  set: "tst",
  set_name: "VM-547 Browser Witnesses",
  collector_number: "547",
  scryfall_uri: "https://scryfall.com/",
};

assert.equal(profiles.length, 37, "VM-547 browser harness requires exactly 37 profiles");

function startServer() {
  const mime = new Map([
    [".html", "text/html; charset=utf-8"],
    [".js", "text/javascript; charset=utf-8"],
    [".css", "text/css; charset=utf-8"],
    [".json", "application/json; charset=utf-8"],
    [".svg", "image/svg+xml"],
    [".png", "image/png"],
    [".jpg", "image/jpeg"],
    [".webp", "image/webp"],
    [".woff", "font/woff"],
    [".woff2", "font/woff2"],
  ]);
  const server = http.createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
      const relative = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const resolved = path.resolve(root, `.${relative}`);
      if (!resolved.startsWith(root)) throw new Error("outside workspace");
      const body = fs.readFileSync(resolved);
      response.writeHead(200, {
        "content-type": mime.get(path.extname(resolved).toLowerCase()) || "application/octet-stream",
        "cache-control": "no-store",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve(server));
  });
}

async function browserPath() {
  for (const candidate of [
    process.env.LIGHTHOUSE_CHROME_PATH,
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean)) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next installed Chromium browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for VM-547 validation.");
}

async function configurePage(browser, baseUrl, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith("https://api.scryfall.com/cards/search")) {
      request.respond({
        status: 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ object: "list", total_cards: 1, has_more: false, data: [fixtureCard] }),
      });
      return;
    }
    if (url.startsWith("https://api.scryfall.com/cards/random")) {
      request.respond({
        status: 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(fixtureCard),
      });
      return;
    }
    if (url.startsWith(baseUrl)) request.continue();
    else request.abort();
  });
  return page;
}

function archscryUrl(baseUrl, identityKey) {
  return `${baseUrl}/archscry/?vm-dev-review=1&reviewIdentity=${encodeURIComponent(identityKey)}&panel=maze-discovery#maze-discovery-paths`;
}

async function waitForArchscry(page, identityKey) {
  await page.waitForSelector("#maze-discovery-paths .deck-link[data-service='maze']", { timeout: 30000 });
  await page.waitForFunction((key) => (
    document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") === key
  ), { timeout: 30000 }, identityKey);
}

async function inspectArchscry(page, profile) {
  return page.evaluate((identityKey) => {
    const section = document.getElementById("maze-discovery-paths");
    const links = [...section.querySelectorAll(".deck-link[data-service='maze']")];
    const rect = section.getBoundingClientRect();
    return {
      identityKey: document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") || "",
      links: links.map((link) => ({
        label: link.querySelector(".service-label")?.textContent?.trim() || "",
        href: link.href,
        pathType: new URL(link.href).searchParams.get("pathType") || "",
      })),
      text: section.innerText,
      details: section.querySelectorAll("details").length,
      height: rect.height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  }, profile.identity_key);
}

async function waitForMaze(page, profile) {
  await page.waitForSelector("#dossier-discovery-panel:not(.hidden)", { timeout: 30000 });
  await page.waitForFunction((name) => document.getElementById("dossier-discovery-title")?.textContent?.includes(name), { timeout: 30000 }, profile.identity_name);
}

async function inspectMaze(page) {
  return page.evaluate(() => {
    const panel = document.getElementById("dossier-discovery-panel");
    const threadButtons = [...panel.querySelectorAll(".dossier-thread-search")];
    const threadDetails = [...panel.querySelectorAll(".dossier-thread-query")];
    return {
      title: document.getElementById("dossier-discovery-title")?.textContent?.trim() || "",
      identity: document.getElementById("dossier-discovery-identity")?.textContent?.trim() || "",
      reading: document.getElementById("dossier-discovery-reading")?.textContent?.trim() || "",
      lane: document.getElementById("dossier-discovery-lane-title")?.textContent?.trim() || "",
      laneCopy: document.getElementById("dossier-discovery-lane-copy")?.textContent?.trim() || "",
      laneQuery: document.getElementById("dossier-discovery-lane-code")?.textContent?.trim() || "",
      sidebarPaths: [...document.querySelectorAll("#reading-path-list [data-dossier-path='true']")].map((button) => ({
        label: button.childNodes[0]?.textContent?.trim() || button.textContent.trim(),
        pathType: button.dataset.pathType,
        current: button.getAttribute("aria-current"),
      })),
      threadLabels: [...panel.querySelectorAll(".dossier-thread-card h4")].map((node) => node.textContent.trim()),
      threadInterpretations: [...panel.querySelectorAll(".dossier-thread-card p")].map((node) => node.textContent.trim()),
      threadCards: [...panel.querySelectorAll(".dossier-thread-card")].map((card) => ({
        unavailable: card.classList.contains("is-unavailable"),
        text: card.textContent.trim(),
        buttons: card.querySelectorAll(".dossier-thread-search").length,
        details: card.querySelectorAll(".dossier-thread-query").length,
      })),
      threadButtons: threadButtons.map((button) => ({
        tag: button.tagName,
        height: button.getBoundingClientRect().height,
        label: button.textContent.trim(),
      })),
      detailOpenStates: [document.getElementById("dossier-discovery-lane-query"), ...threadDetails].map((details) => details.open),
      detailSummaryHeights: [...panel.querySelectorAll(".dossier-query-details summary")].map((summary) => summary.getBoundingClientRect().height),
      boundary: document.getElementById("dossier-stretch-boundary")?.textContent?.trim() || "",
      boundaryHidden: document.getElementById("dossier-stretch-boundary")?.classList.contains("hidden"),
      returnBanner: document.querySelector(".maze-return-copy")?.textContent?.trim() || "",
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      panelOverflow: panel.scrollWidth - panel.clientWidth,
    };
  });
}

async function selectMazePath(page, pathType) {
  await page.$eval(`#reading-path-list [data-path-type="${pathType}"]`, (button) => button.click());
  await page.waitForFunction((expected) => document.querySelector(`#reading-path-list [data-path-type="${expected}"]`)?.getAttribute("aria-current") === "true", {}, pathType);
}

const server = await startServer();
const { port } = server.address();
const baseUrl = `http://${host}:${port}`;
let browser;
let launchedChrome;
const pageErrors = [];
let desktopArchscryCases = 0;
let desktopMazeCases = 0;
let narrowBrowserCases = 0;
let mobileBrowserCases = 0;
let accessibilityChecks = 0;
let returnNavigationTests = 0;
let unavailableProjectionUiChecks = 0;
const representativeThreads = new Map();

try {
  fs.mkdirSync(chromeProfileDirectory, { recursive: true });
  launchedChrome = await ChromeLauncher.launch({
    chromePath: await browserPath(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    logLevel: "silent",
    userDataDir: chromeProfileDirectory,
  });
  browser = await puppeteer.connect({ browserURL: `http://${host}:${launchedChrome.port}` });
  const page = await configurePage(browser, baseUrl, viewports.desktop);
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const profile of profiles) {
    await page.goto(archscryUrl(baseUrl, profile.identity_key), { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForArchscry(page, profile.identity_key);
    const archscry = await inspectArchscry(page, profile);
    const expectedPathCount = profile.identity_key === "WUBRG" ? 3 : 4;
    assert.equal(archscry.identityKey, profile.identity_key, `${profile.identity_key}: Archscry rendered the wrong dossier`);
    assert.equal(archscry.links.length, expectedPathCount, `${profile.identity_key}: Archscry path count mismatch`);
    assert.equal(archscry.details, 0, `${profile.identity_key}: Archscry should remain a compact handoff without query panels`);
    assert(!archscry.text.includes("Scryfall query"), `${profile.identity_key}: Archscry exposed query syntax controls`);
    assert(archscry.height < 500, `${profile.identity_key}: Archscry handoff grew beyond the compact bound`);
    assert(archscry.overflow <= 1, `${profile.identity_key}: Archscry overflowed at desktop width`);
    desktopArchscryCases += 1;

    await page.goto(archscry.links[0].href, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForMaze(page, profile);
    const maze = await inspectMaze(page);
    assert.equal(maze.sidebarPaths.length, expectedPathCount, `${profile.identity_key}: Maze path count mismatch`);
    assert.equal(maze.threadLabels.length, 3, `${profile.identity_key}: commander lane must expose three semantic threads`);
    const expectedUnavailableCommanderThreads = profile.mechanical_threads.filter((thread) => thread.lane_overrides?.commander?.availability === "unavailable").length;
    assert.equal(maze.threadCards.filter((card) => card.unavailable).length, expectedUnavailableCommanderThreads, `${profile.identity_key}: commander unavailable-state count mismatch`);
    assert(maze.threadCards.filter((card) => card.unavailable).every((card) => card.buttons === 0 && card.details === 0 && /unavailable/i.test(card.text)), `${profile.identity_key}: unavailable commander projection exposed an action or hid its explanation`);
    unavailableProjectionUiChecks += expectedUnavailableCommanderThreads;
    assert.match(maze.laneCopy, /broad set/i, `${profile.identity_key}: Maze broad lane is not transparent`);
    assert.match(maze.laneCopy, /not a Vox Mana fit ranking/i, `${profile.identity_key}: Maze broad lane claims fit`);
    assert.doesNotMatch(maze.returnBanner, /Commanders That Fit/i, `${profile.identity_key}: return banner mislabeled a broad identity pool as fit`);
    assert.match(maze.returnBanner, profile.identity_key === "COLORLESS" ? /Colorless Identity/i : /Commanders in this identity/i, `${profile.identity_key}: return banner lost the truthful broad-pool label`);
    assert(maze.detailOpenStates.every((open) => open === false), `${profile.identity_key}: operator syntax should be secondary by default`);
    assert(maze.overflow <= 1 && maze.panelOverflow <= 1, `${profile.identity_key}: Maze overflowed at desktop width`);
    if (profile.identity_key === "WUBRG") {
      assert.equal(maze.boundaryHidden, false, "WUBRG must expose its outside-color boundary explanation");
      assert.match(maze.boundary, /no truthful outside-color commander space/i);
    }
    desktopMazeCases += 1;
  }

  for (const [viewportName, viewport] of [["narrow", viewports.narrow], ["mobile", viewports.mobile]]) {
    await page.setViewport(viewport);
    for (const identityKey of representativeKeys) {
      const profile = profiles.find((candidate) => candidate.identity_key === identityKey);
      await page.goto(archscryUrl(baseUrl, identityKey), { waitUntil: "domcontentloaded", timeout: 30000 });
      await waitForArchscry(page, identityKey);
      const archscry = await inspectArchscry(page, profile);
      assert(archscry.overflow <= 1, `${identityKey}: Archscry overflowed at ${viewportName} width`);
      const supportPathType = identityKey === "COLORLESS" ? "colorless-noncommander-support" : "support-cards";
      const supportHref = archscry.links.find((link) => link.pathType === supportPathType)?.href;
      assert(supportHref, `${identityKey}: missing support route at ${viewportName} width`);
      await page.goto(supportHref, { waitUntil: "domcontentloaded", timeout: 30000 });
      await waitForMaze(page, profile);
      let maze = await inspectMaze(page);
      assert.equal(maze.lane, "Cards that support this shape", `${identityKey}: support lane did not rehydrate`);
      assert.equal(maze.threadLabels.length, 3, `${identityKey}: support lane lost semantic threads at ${viewportName} width`);
      assert(maze.threadInterpretations.every(Boolean), `${identityKey}: support lane omitted a plain-English interpretation`);
      assert(maze.overflow <= 1 && maze.panelOverflow <= 1, `${identityKey}: Maze overflowed at ${viewportName} width`);
      const expectedUnavailableSupportThreads = profile.mechanical_threads.filter((thread) => thread.lane_overrides?.support?.availability === "unavailable").length;
      assert.equal(maze.threadCards.filter((card) => card.unavailable).length, expectedUnavailableSupportThreads, `${identityKey}: support unavailable-state count mismatch at ${viewportName} width`);
      representativeThreads.set(`${viewportName}:${identityKey}`, maze.threadLabels.join(" | "));

      if (identityKey !== "WUBRG") {
        const stretchPathType = identityKey === "COLORLESS" ? "outside-color-stretch" : "weird-stretch-commanders";
        await selectMazePath(page, stretchPathType);
        maze = await inspectMaze(page);
        assert.match(maze.laneCopy, /preserve named mechanical parts/i, `${identityKey}: stretch lost dossier substance at ${viewportName} width`);
        assert.equal(maze.threadLabels.length, 3, `${identityKey}: stretch must expose the three governed threads`);
        const expectedUnavailableStretchThreads = profile.mechanical_threads.filter((thread) => thread.lane_overrides?.stretch?.availability === "unavailable").length;
        assert.equal(maze.threadCards.filter((card) => card.unavailable).length, expectedUnavailableStretchThreads, `${identityKey}: stretch unavailable-state count mismatch at ${viewportName} width`);
        assert(maze.threadCards.filter((card) => card.unavailable).every((card) => card.buttons === 0 && card.details === 0 && /unavailable/i.test(card.text)), `${identityKey}: unavailable stretch projection exposed an action or hid its explanation at ${viewportName} width`);
        unavailableProjectionUiChecks += expectedUnavailableStretchThreads;
      } else {
        assert.equal(maze.sidebarPaths.some((entry) => /stretch/.test(entry.pathType)), false, "WUBRG must not manufacture a stretch path");
        assert.match(maze.boundary, /no truthful outside-color commander space/i);
      }

      if (viewportName === "mobile") {
        assert(maze.threadButtons.every((button) => button.tag === "BUTTON"), `${identityKey}: thread actions must use native buttons`);
        accessibilityChecks += 1;
        assert(maze.threadButtons.every((button) => button.height >= 44), `${identityKey}: thread touch target is below 44px`);
        accessibilityChecks += 1;
        assert(maze.detailSummaryHeights.every((height) => height >= 44), `${identityKey}: query-detail target is below 44px`);
        accessibilityChecks += 1;
        assert.equal(maze.sidebarPaths.filter((entry) => entry.current === "true").length, 1, `${identityKey}: active path lacks a single aria-current`);
        accessibilityChecks += 1;
        assert(maze.overflow <= 1 && maze.panelOverflow <= 1, `${identityKey}: accessible mobile layout has horizontal overflow`);
        accessibilityChecks += 1;
        assert(maze.threadButtons.every((button) => button.label === "Search this thread"), `${identityKey}: thread actions lack consistent accessible text`);
        accessibilityChecks += 1;
        mobileBrowserCases += 1;
      } else {
        narrowBrowserCases += 1;
      }
    }
  }

  for (const viewportName of ["narrow", "mobile"]) {
    const witherbloom = representativeThreads.get(`${viewportName}:WITHERBLOOM`);
    const azorius = representativeThreads.get(`${viewportName}:WU`);
    const temur = representativeThreads.get(`${viewportName}:TEMUR`);
    const golgari = representativeThreads.get(`${viewportName}:BG`);
    assert.notEqual(witherbloom, azorius, `${viewportName}: Azorius must feel semantically different from Witherbloom`);
    assert.notEqual(witherbloom, temur, `${viewportName}: Temur must feel semantically different from Witherbloom`);
    assert.notEqual(witherbloom, golgari, `${viewportName}: Witherbloom and Golgari must not collapse into shared BG semantics`);
  }

  await page.setViewport(viewports.desktop);
  for (const identityKey of returnKeys) {
    const profile = profiles.find((candidate) => candidate.identity_key === identityKey);
    const identitySlug = returnSlugs[identityKey];
    const startUrl = `${baseUrl}/archscry/?explore=${identitySlug}&panel=maze-discovery#maze-discovery-paths`;
    await page.goto(startUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForArchscry(page, identityKey);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
      page.$eval("#maze-discovery-paths .deck-link[href*='pathType=support-cards']", (link) => link.click()),
    ]);
    await waitForMaze(page, profile);
    await page.click(".dossier-thread-search");
    await page.waitForSelector(".card-item", { timeout: 30000 });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
      page.click("#maze-return-link"),
    ]);
    await waitForArchscry(page, identityKey);
    const returned = await page.evaluate((expected) => {
      const sectionRect = document.getElementById("maze-discovery-paths")?.getBoundingClientRect();
      return {
        identity: document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") || "",
        sectionVisible: Boolean(sectionRect && sectionRect.bottom > 0 && sectionRect.top < window.innerHeight),
        exploreIdentity: new URL(location.href).searchParams.get("explore"),
        expected,
      };
    }, identityKey);
    assert.equal(returned.identity, identityKey, `${identityKey}: return navigation opened the wrong dossier`);
    assert.equal(returned.exploreIdentity, identitySlug, `${identityKey}: return navigation lost dossier context`);
    assert.equal(returned.sectionVisible, true, `${identityKey}: return navigation lost the Maze Discovery section context`);
    await page.goBack({ waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForMaze(page, profile);
    assert.match(new URL(page.url()).pathname, /^\/maze\/(?:index\.html)?$/, `${identityKey}: browser back did not return to Maze`);
    await page.goBack({ waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForArchscry(page, identityKey);
    assert.equal(new URL(page.url()).searchParams.get("explore"), identitySlug, `${identityKey}: browser history formed a duplicate loop`);
    returnNavigationTests += 1;
  }

  assert.deepEqual(pageErrors, [], `Browser page errors: ${pageErrors.join(" | ")}`);
  assert.equal(desktopArchscryCases, 37);
  assert.equal(desktopMazeCases, 37);
  assert.equal(narrowBrowserCases, 8);
  assert.equal(mobileBrowserCases, 8);
  assert.equal(accessibilityChecks, 48);
  assert.equal(returnNavigationTests, 3);
  assert.equal(unavailableProjectionUiChecks, 14);

  console.log(JSON.stringify({
    desktopBrowserTests: {
      archscry: desktopArchscryCases,
      maze: desktopMazeCases,
      total: desktopArchscryCases + desktopMazeCases,
    },
    narrowBrowserTests: narrowBrowserCases,
    mobileBrowserTests: mobileBrowserCases,
    accessibilityChecks,
    returnNavigationTests,
    unavailableProjectionUiChecks,
    representativeDossiers: representativeKeys,
    pageErrors: pageErrors.length,
    status: "PASS",
  }, null, 2));
} finally {
  await browser?.disconnect();
  await launchedChrome?.kill();
  await new Promise((resolve) => server.close(resolve));
}

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { stat } from "node:fs/promises";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

import { buildDossierMazePathEntries } from "../assets/js/maze/maze-handoff.js";

const root = process.cwd();
const host = "127.0.0.1";
const chromeProfileDirectory = path.join(root, "outputs", "vm547-owner-review", `chrome-profile-${process.pid}`);
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data", "dossier", "maze-discovery-profiles.catalog.json"), "utf8"));
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
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

function publicDossierLabel(profile) {
  const faction = factions[profile.identity_key] || {};
  const expressionKind = String(faction.identity?.expression_kind || "").toLowerCase();
  return profile.identity_key === "WUBRG"
    ? "Five-Color"
    : expressionKind === "college"
      ? String(faction.name || profile.identity_name).replace(/\s+College$/i, "").trim()
      : String(faction.identity?.routing?.label || faction.name || profile.identity_name).trim();
}

function archscryReadingName(profile) {
  const faction = factions[profile.identity_key] || {};
  return ["YORE", "GLINT", "DUNE", "INK", "WITCH", "WUBRG"].includes(profile.identity_key)
    ? publicDossierLabel(profile)
    : String(faction.name || profile.identity_name).trim();
}

const identitySlugs = new Map(profiles.map((profile) => {
  const displayLabel = publicDossierLabel(profile);
  const slug = profile.identity_key === "WUBRG"
    ? "wubrg"
    : displayLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return [profile.identity_key, slug];
}));

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

async function configurePage(browser, baseUrl, viewport, { blockDiscoveryCatalog = false } = {}) {
  const page = await browser.newPage();
  page.vm547ExecutedQueries = [];
  await page.setViewport(viewport);
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (blockDiscoveryCatalog && url.startsWith(baseUrl) && url.includes("/data/dossier/maze-discovery-profiles.catalog.json")) {
      request.respond({ status: 404, contentType: "application/json", body: "{}" });
      return;
    }
    if (url.startsWith("https://api.scryfall.com/cards/search")) {
      page.vm547ExecutedQueries.push(new URL(url).searchParams.get("q") || "");
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
  const slug = identitySlugs.get(identityKey);
  assert(slug, `${identityKey}: no public Archscry dossier slug`);
  return `${baseUrl}/archscry/?explore=${encodeURIComponent(slug)}&panel=maze-discovery#maze-discovery-paths`;
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
      profile: section.dataset.vm547Profile || "",
      runtimeRevision: section.dataset.vm547Runtime || "",
      catalogFingerprint: section.dataset.vm547Catalog || "",
      links: links.map((link) => ({
        label: link.querySelector(".service-label")?.textContent?.trim() || "",
        href: link.href,
        pathType: new URL(link.href).searchParams.get("pathType") || "",
        operatorQuery: new URL(link.href).searchParams.get("operatorQuery") || "",
        plainReadingQuery: new URL(link.href).searchParams.get("plainReadingQuery") || "",
        profile: link.dataset.vm547Profile || new URL(link.href).searchParams.get("vm547Profile") || "",
        runtimeRevision: link.dataset.vm547Runtime || new URL(link.href).searchParams.get("vm547Runtime") || "",
        catalogFingerprint: link.dataset.vm547Catalog || new URL(link.href).searchParams.get("vm547Catalog") || "",
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
      profile: panel.dataset.vm547Profile || "",
      runtimeRevision: panel.dataset.vm547Runtime || "",
      catalogFingerprint: panel.dataset.vm547Catalog || "",
      documentProfile: document.documentElement.dataset.vm547Profile || "",
      incomingDisposition: document.documentElement.dataset.vm547IncomingDisposition || "",
      executedQuery: (() => {
        const action = document.getElementById("search-scryfall-link");
        try {
          return action?.getAttribute("aria-disabled") === "false"
            ? new URL(action.href).searchParams.get("q") || ""
            : document.getElementById("qi-query")?.textContent?.trim() || "";
        } catch {
          return document.getElementById("qi-query")?.textContent?.trim() || "";
        }
      })(),
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
      threads: [...panel.querySelectorAll(".dossier-thread-card")].map((card) => ({
        label: card.querySelector("h4")?.textContent?.trim() || "",
        interpretation: card.querySelector("p")?.textContent?.trim() || "",
        query: card.querySelector(".dossier-thread-search")?.dataset.query || "",
        plainReadingQuery: card.querySelector(".dossier-thread-search")?.dataset.plainReadingQuery || "",
      })),
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

async function clickArchscryPath(page, pathType) {
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
    page.$eval(`#maze-discovery-paths .deck-link[href*="pathType=${pathType}"]`, (link) => link.click()),
  ]);
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
let canonicalFallbackChecks = 0;
const representativeThreads = new Map();
const ownerRouteWitnesses = [];

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
    const expectedProfilePaths = buildDossierMazePathEntries({
      identity: profile.color_identity,
      factionName: archscryReadingName(profile),
      discoveryProfile: profile,
    });
    assert.equal(archscry.identityKey, profile.identity_key, `${profile.identity_key}: Archscry rendered the wrong dossier`);
    assert.equal(archscry.profile, profile.identity_key, `${profile.identity_key}: Archscry did not load its canonical VM-547 profile`);
    assert.equal(archscry.runtimeRevision, catalog.runtime_revision, `${profile.identity_key}: Archscry runtime revision mismatch`);
    assert.equal(archscry.catalogFingerprint, catalog.catalog_fingerprint, `${profile.identity_key}: Archscry catalog fingerprint mismatch`);
    assert.equal(archscry.links.length, expectedPathCount, `${profile.identity_key}: Archscry path count mismatch`);
    assert.deepEqual(archscry.links.map((link) => link.label), expectedProfilePaths.map((path) => path.label), `${profile.identity_key}: Archscry displayed legacy path labels`);
    assert.deepEqual(archscry.links.map((link) => link.operatorQuery), expectedProfilePaths.map((path) => path.query), `${profile.identity_key}: Archscry embedded legacy query payloads`);
    assert.deepEqual(archscry.links.map((link) => link.plainReadingQuery), expectedProfilePaths.map((path) => path.plainReadingQuery), `${profile.identity_key}: Archscry embedded legacy plain-language payloads`);
    assert(archscry.links.every((link) => link.profile === profile.identity_key), `${profile.identity_key}: Archscry link profile provenance mismatch`);
    assert(archscry.links.every((link) => link.runtimeRevision === catalog.runtime_revision), `${profile.identity_key}: Archscry link runtime provenance mismatch`);
    assert(archscry.links.every((link) => link.catalogFingerprint === catalog.catalog_fingerprint), `${profile.identity_key}: Archscry link catalog provenance mismatch`);
    assert.equal(archscry.details, 0, `${profile.identity_key}: Archscry should remain a compact handoff without query panels`);
    assert(!archscry.text.includes("Scryfall query"), `${profile.identity_key}: Archscry exposed query syntax controls`);
    assert(archscry.height < 500, `${profile.identity_key}: Archscry handoff grew beyond the compact bound`);
    assert(archscry.overflow <= 1, `${profile.identity_key}: Archscry overflowed at desktop width`);
    desktopArchscryCases += 1;

    page.vm547ExecutedQueries.length = 0;
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
      page.$eval("#maze-discovery-paths .deck-link[data-service='maze']", (link) => link.click()),
    ]);
    await waitForMaze(page, profile);
    try {
      await page.waitForFunction((query) => {
        const action = document.getElementById("search-scryfall-link");
        if (action?.getAttribute("aria-disabled") === "false") {
          return new URL(action.href).searchParams.get("q") === query;
        }
        return document.getElementById("qi-query")?.textContent?.trim() === query;
      }, { timeout: 5000 }, archscry.links[0].operatorQuery);
    } catch {
      const launchState = await page.evaluate(() => ({
        query: document.getElementById("qi-query")?.textContent?.trim() || "",
        input: document.getElementById("search-input")?.value || "",
        mode: document.body.dataset.mazeMode || "",
        error: document.getElementById("error-msg")?.textContent?.trim() || "",
      }));
      assert.equal(launchState.query, archscry.links[0].operatorQuery, `${profile.identity_key}: canonical commander launch state ${JSON.stringify(launchState)} pageErrors=${JSON.stringify(pageErrors)}`);
    }
    const maze = await inspectMaze(page);
    assert.equal(maze.profile, profile.identity_key, `${profile.identity_key}: Maze did not rehydrate its canonical profile`);
    assert.equal(maze.documentProfile, profile.identity_key, `${profile.identity_key}: Maze document provenance lost the canonical profile`);
    assert.equal(maze.runtimeRevision, catalog.runtime_revision, `${profile.identity_key}: Maze runtime revision mismatch`);
    assert.equal(maze.catalogFingerprint, catalog.catalog_fingerprint, `${profile.identity_key}: Maze catalog fingerprint mismatch`);
    assert.equal(maze.incomingDisposition, "matched-current", `${profile.identity_key}: current Owner click did not preserve matching canonical payload provenance`);
    assert.equal(maze.executedQuery, archscry.links[0].operatorQuery, `${profile.identity_key}: initial Owner click did not execute the canonical commander query`);
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
  console.error("VM-547 browser phase: 37 public dossier clicks passed");

  for (const identityKey of representativeKeys) {
    const profile = profiles.find((candidate) => candidate.identity_key === identityKey);
    const supportPathType = identityKey === "COLORLESS" ? "colorless-noncommander-support" : "support-cards";
    await page.goto(archscryUrl(baseUrl, identityKey), { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForArchscry(page, identityKey);
    const archscry = await inspectArchscry(page, profile);
    const supportLink = archscry.links.find((link) => link.pathType === supportPathType);
    assert(supportLink, `${identityKey}: public Owner route did not expose the support lane`);
    await clickArchscryPath(page, supportPathType);
    await waitForMaze(page, profile);
    const maze = await inspectMaze(page);
    const selectedThread = maze.threads.find((thread) => thread.query);
    assert(selectedThread, `${identityKey}: support lane did not expose an executable semantic thread`);
    assert.equal(maze.profile, identityKey, `${identityKey}: clicked support route loaded the wrong canonical profile`);
    assert.equal(maze.runtimeRevision, catalog.runtime_revision, `${identityKey}: clicked support route runtime revision mismatch`);
    assert.equal(maze.catalogFingerprint, catalog.catalog_fingerprint, `${identityKey}: clicked support route fingerprint mismatch`);
    assert.equal(maze.incomingDisposition, "matched-current", `${identityKey}: clicked support route did not arrive with current provenance`);
    await page.$eval(".dossier-thread-search", (button) => button.click());
    await page.waitForFunction((query) => {
      const action = document.getElementById("search-scryfall-link");
      return action?.getAttribute("aria-disabled") === "false" && new URL(action.href).searchParams.get("q") === query;
    }, { timeout: 5000 }, selectedThread.query);
    const executedQuery = await page.$eval("#search-scryfall-link", (node) => new URL(node.href).searchParams.get("q") || "");
    assert.equal(executedQuery, selectedThread.query, `${identityKey}: selected thread did not execute its exact canonical query`);
    ownerRouteWitnesses.push({
      dossier: identityKey,
      colorIdentity: profile.color_identity,
      archscryTopLevelLabel: supportLink.label,
      loadedCanonicalProfile: maze.profile,
      runtimeRevision: maze.runtimeRevision,
      catalogFingerprint: maze.catalogFingerprint,
      selectedSemanticThread: selectedThread.label,
      plainEnglishInterpretation: selectedThread.interpretation,
      plainReadingQuery: selectedThread.plainReadingQuery,
      finalOperatorQuery: executedQuery,
    });

    const genericSupportQuery = `id<=${profile.color_identity} f:commander -is:commander -t:land`;
    if (["WU", "TEMUR", "G", "YORE"].includes(identityKey)) {
      assert.notEqual(supportLink.operatorQuery, genericSupportQuery, `${identityKey}: Owner support route collapsed to an identity-only query`);
    }
    if (identityKey === "WITHERBLOOM") {
      assert.doesNotMatch(supportLink.operatorQuery, /o:death\s+OR\s+o:mortality/i, "Witherbloom: legacy death/mortality support behavior survived");
      assert.deepEqual(maze.threadLabels, profile.mechanical_threads.map((thread) => thread.label), "Witherbloom: rendered threads do not match the revised catalog");
    }
    if (identityKey === "COLORLESS") {
      assert.doesNotMatch(selectedThread.query, /^.*\(t:artifact\s+OR/i, "Colorless: remediated thread fell back to the broad legacy artifact primitive");
    }
    if (identityKey === "WUBRG") {
      assert.equal(maze.sidebarPaths.some((entry) => /stretch/.test(entry.pathType)), false, "WUBRG: clicked Owner flow manufactured an impossible stretch lane");
      assert.match(maze.boundary, /no truthful outside-color commander space/i);
    }
  }
  console.error("VM-547 browser phase: eight support-thread witnesses passed");

  const witherbloomWitness = ownerRouteWitnesses.find((entry) => entry.dossier === "WITHERBLOOM");
  const golgariWitness = ownerRouteWitnesses.find((entry) => entry.dossier === "BG");
  assert.equal(witherbloomWitness.colorIdentity, "bg", "Witherbloom: expected BG color identity");
  assert.equal(golgariWitness.colorIdentity, "bg", "Golgari: expected BG color identity");
  assert.notEqual(witherbloomWitness.loadedCanonicalProfile, golgariWitness.loadedCanonicalProfile, "Witherbloom and Golgari resolved the same canonical profile");
  assert.notEqual(witherbloomWitness.selectedSemanticThread, golgariWitness.selectedSemanticThread, "Witherbloom and Golgari collapsed to one semantic thread");
  assert.notEqual(witherbloomWitness.finalOperatorQuery, golgariWitness.finalOperatorQuery, "Witherbloom and Golgari executed the same thread query");

  await page.goto(archscryUrl(baseUrl, "WITHERBLOOM"), { waitUntil: "domcontentloaded", timeout: 30000 });
  await waitForArchscry(page, "WITHERBLOOM");
  await page.$eval("#maze-discovery-paths .deck-link[href*='pathType=support-cards']", (link) => {
    const staleUrl = new URL(link.href);
    const staleQuery = 'id<=bg f:commander -is:commander -t:land (o:death OR o:mortality)';
    staleUrl.searchParams.set("q", staleQuery);
    staleUrl.searchParams.set("operatorQuery", staleQuery);
    staleUrl.searchParams.set("plainReadingQuery", "legacy death or mortality support");
    staleUrl.searchParams.set("vm547Runtime", "vm547-runtime-v2");
    staleUrl.searchParams.set("vm547Catalog", "0".repeat(64));
    link.href = staleUrl.href;
  });
  page.vm547ExecutedQueries.length = 0;
  await clickArchscryPath(page, "support-cards");
  await waitForMaze(page, profiles.find((profile) => profile.identity_key === "WITHERBLOOM"));
  const staleRouteMaze = await inspectMaze(page);
  assert.equal(staleRouteMaze.incomingDisposition, "rehydrated-current", "Witherbloom: stale URL payload was not explicitly replaced by canonical rehydration");
  assert.deepEqual(staleRouteMaze.threadLabels, profiles.find((profile) => profile.identity_key === "WITHERBLOOM").mechanical_threads.map((thread) => thread.label));
  assert.doesNotMatch(staleRouteMaze.laneQuery, /o:death\s+OR\s+o:mortality/i, "Witherbloom: stale URL support query reached the rendered lane");
  assert.doesNotMatch(staleRouteMaze.executedQuery, /o:death\s+OR\s+o:mortality/i, "Witherbloom: stale URL support query was executed");
  canonicalFallbackChecks += 1;
  console.error("VM-547 browser phase: stale payload replacement passed");

  const blockedCatalogPage = await configurePage(browser, baseUrl, viewports.desktop, { blockDiscoveryCatalog: true });
  await blockedCatalogPage.goto(archscryUrl(baseUrl, "WITHERBLOOM"), { waitUntil: "domcontentloaded", timeout: 30000 });
  await blockedCatalogPage.waitForFunction(() => document.body?.innerText?.includes("could not be loaded") || document.querySelectorAll("#maze-discovery-paths .deck-link[data-service='maze']").length === 0, { timeout: 30000 });
  const blockedCatalogLinks = await blockedCatalogPage.$$eval("#maze-discovery-paths .deck-link[data-service='maze']", (links) => links.length);
  assert.equal(blockedCatalogLinks, 0, "canonical Archscry dossier silently used the legacy fallback when its catalog was unavailable");
  canonicalFallbackChecks += 1;
  await blockedCatalogPage.close();
  console.error("VM-547 browser phase: canonical fallback fail-closed passed");

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
  console.error("VM-547 browser phase: responsive and accessibility checks passed");

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
  console.error("VM-547 browser phase: return navigation checks passed");

  assert.deepEqual(pageErrors, [], `Browser page errors: ${pageErrors.join(" | ")}`);
  assert.equal(desktopArchscryCases, 37);
  assert.equal(desktopMazeCases, 37);
  assert.equal(narrowBrowserCases, 8);
  assert.equal(mobileBrowserCases, 8);
  assert.equal(accessibilityChecks, 48);
  assert.equal(returnNavigationTests, 3);
  assert.equal(unavailableProjectionUiChecks, 14);
  assert.equal(canonicalFallbackChecks, 2);

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
    canonicalFallbackChecks,
    catalogProvenance: {
      runtimeRevision: catalog.runtime_revision,
      catalogFingerprint: catalog.catalog_fingerprint,
    },
    ownerRouteWitnesses,
    representativeDossiers: representativeKeys,
    pageErrors: pageErrors.length,
    status: "PASS",
  }, null, 2));
} finally {
  await browser?.disconnect();
  await launchedChrome?.kill();
  await new Promise((resolve) => server.close(resolve));
}

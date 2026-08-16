import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { stat } from "node:fs/promises";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";

import { finalizeReading, replaySelections } from "../assets/js/gate-b1-placement-engine.js";
import { withGateAPublicState } from "../assets/js/archscry-presentation.js";

const root = process.cwd();
const host = "127.0.0.1";
const viewportName = (process.argv.find((arg) => arg.startsWith("--viewport=")) || "--viewport=desktop").split("=")[1];
const identityFilter = (process.argv.find((arg) => arg.startsWith("--identity=")) || "").split("=")[1] || "";
const transientDeliveryMode = process.argv.includes("--transient-delivery");
const reviewMode = process.argv.includes("--review");
const viewports = {
  desktop: { width: 1440, height: 1100 },
  mobile: { width: 390, height: 900 },
};
const viewport = viewports[viewportName];
assert.ok(viewport, `Unknown viewport ${viewportName}`);

const witnesses = JSON.parse(fs.readFileSync(path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"), "utf8")).rows
  .filter((row) => !identityFilter || row.identity_key === identityFilter);
assert.ok(witnesses.length, `No VM-559 witness matched ${identityFilter || "the governed inventory"}`);
if (reviewMode) assert.equal(witnesses.length, 1, "VM-559 owner review opens one identity at a time; pass --identity");
const model = JSON.parse(fs.readFileSync(path.join(root, "data", "gate-b1-placement-model.json"), "utf8"));
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const mediaIndex = JSON.parse(fs.readFileSync(path.join(root, "data", "scryfall", "indexes", "archscry-media-index.json"), "utf8"));
const mediaByKey = new Map(mediaIndex.records.map((record) => [record.resolver_key, record]));
const normalize = (value) => String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const displayLabel = (faction) => {
  if (String(faction.key || "").toUpperCase() === "WUBRG") return "WUBRG";
  if (String(faction.identity?.expression_kind || "").toLowerCase() === "college") return String(faction.name || "").replace(/\s+College$/i, "").trim();
  return String(faction.identity?.routing?.label || faction.name || faction.key || "").trim();
};

const png = new PNG({ width: 63, height: 88 });
for (let index = 0; index < png.data.length; index += 4) {
  png.data[index] = 33;
  png.data[index + 1] = 48;
  png.data[index + 2] = 56;
  png.data[index + 3] = 255;
}
const imageFixture = PNG.sync.write(png);
const mime = new Map([[".html", "text/html"], [".js", "text/javascript"], [".css", "text/css"], [".json", "application/json"], [".svg", "image/svg+xml"], [".png", "image/png"], [".jpg", "image/jpeg"], [".woff2", "font/woff2"]]);

function deterministicResult(witness) {
  const certified = withGateAPublicState({
    result: finalizeReading({ state: replaySelections(model, witness.selections), model, factions }),
    placementModel: model,
    factions,
  });
  if (witness.identity_key !== "YORE") {
    assert.equal(certified.faction, witness.identity_key, `${witness.identity_key} witness no longer opens its governed dossier`);
    return certified;
  }
  const faction = factions.YORE;
  const candidate = (certified.internal_candidate_order || []).find((entry) => entry.identity === "YORE");
  assert.ok(faction && candidate, "Yore presentation fixture lost its certified candidate evidence");
  return {
    ...certified,
    faction: "YORE",
    faction_name: faction.name,
    institution_type: faction.institution_type,
    world: faction.world,
    identity: faction.identity,
    result_state: "primary",
    public_confidence_state: "current-best-fit",
    alternative_state: "none",
    top_matches: [{ ...candidate, faction: "YORE", rank: 1 }],
    adjacent_matches: [],
    alternatives: [],
    model_kind: "vm559-media-presentation-fixture",
  };
}

function startServer() {
  const server = http.createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
      const relative = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const resolved = path.resolve(root, `.${relative}`);
      if (!resolved.startsWith(root)) throw new Error("outside workspace");
      const body = fs.readFileSync(resolved);
      response.writeHead(200, { "content-type": mime.get(path.extname(resolved)) || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
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
  ].filter(Boolean)) {
    try { await stat(candidate); return candidate; } catch { /* continue */ }
  }
  return undefined;
}

async function waitForVisibleMedia(page, scopeSelector = "#result-inner") {
  await page.$eval(scopeSelector, (node) => node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }));
  try {
    await page.waitForFunction((scope, allowedTransientName) => {
    const rootNode = document.querySelector(scope);
    if (!rootNode) return false;
    const visible = (node) => {
      for (let current = node; current instanceof HTMLElement; current = current.parentElement) {
        if (current.hidden && !current.matches("[data-commander-preview-block]")) return false;
      }
      return true;
    };
    const slots = [...rootNode.querySelectorAll('[id^="cmd_"], [id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"]')]
      .filter(visible);
    return slots.every((slot) => slot.dataset.cardArtStatus === "resolved" || (
      slot.dataset.cardArtStatus === "transient_error" && slot.dataset.cardArtName === allowedTransientName
    ));
    }, { timeout: 30000 }, scopeSelector, transientDeliveryMode ? "Swamp" : "");
  } catch (error) {
    const state = await page.evaluate((scope) => {
      const rootNode = document.querySelector(scope);
      return [...(rootNode?.querySelectorAll('[id^="cmd_"], [id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"]') || [])]
        .map((slot) => ({ id: slot.id, name: slot.dataset.cardArtName || "", status: slot.dataset.cardArtStatus || "", hidden: Boolean(slot.closest("[hidden]")), text: slot.textContent.trim() }));
    }, scopeSelector);
    throw new Error(`Visible media did not settle in ${scopeSelector}: ${JSON.stringify(state)}`, { cause: error });
  }
}

async function exerciseIdentity(page, origin, witness) {
  const result = deterministicResult(witness);
  const apiRequests = [];
  const cdnRequests = [];
  const consoleErrors = [];
  const swamp = mediaByKey.get(normalize("Swamp"));
  const failFirstCandidate = witness.identity_key === "MARDU" && !transientDeliveryMode && !reviewMode ? swamp?.image_candidates?.[0]?.url : "";
  const transientCandidateUrls = new Set(transientDeliveryMode && witness.identity_key === "MARDU" ? swamp?.image_candidates?.map((candidate) => candidate.url) : []);
  let failedCandidateOnce = false;

  await page.evaluateOnNewDocument((savedResult) => {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem("vm_last_result", JSON.stringify(savedResult));
    window.supabase = { createClient: () => ({ auth: { getSession: async () => ({ data: { session: null }, error: null }) } }) };
  }, result);
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith(origin) || url.startsWith("data:") || url.startsWith("blob:")) return request.continue();
    if (/^https:\/\/api\.scryfall\.com\//.test(url)) {
      apiRequests.push(url);
      return request.abort();
    }
    if (/^https:\/\/cards\.scryfall\.io\//.test(url)) {
      cdnRequests.push(url);
      if (reviewMode) return request.continue();
      if (transientCandidateUrls.has(url)) {
        return request.respond({ status: 503, contentType: "text/plain", body: "transient delivery outage" });
      }
      if (failFirstCandidate && url === failFirstCandidate && !failedCandidateOnce) {
        failedCandidateOnce = true;
        return request.respond({ status: 503, contentType: "text/plain", body: "candidate unavailable" });
      }
      return request.respond({ status: 200, contentType: "image/png", body: imageFixture });
    }
    return request.abort();
  });

  await page.goto(`${origin}/archscry/`, { waitUntil: "networkidle0", timeout: 30000 });
  await page.waitForSelector("#result:not(.hidden)", { timeout: 20000 });
  await page.waitForFunction(() => document.getElementById("result-inner")?.dataset.cardArtState === "ready", { timeout: 30000 });

  const heading = await page.$eval("body", () => document.querySelector(".staples-section .section-label")?.textContent?.trim() || "");
  const hasAuthoredSignals = Object.values(factions[witness.identity_key].staples || {}).some((cards) => Array.isArray(cards) && cards.length);
  if (hasAuthoredSignals) {
    assert.equal(heading, `${displayLabel(factions[witness.identity_key])} Card Signals`, `${witness.identity_key} exposed an implementation-family Card Signals heading`);
  } else {
    assert.equal(heading, "", `${witness.identity_key} rendered a Card Signals heading without authored signals`);
  }

  const initialSuppression = await page.evaluate(() => [...document.querySelectorAll("[data-dossier-segment-panel][hidden]")].every((panel) =>
    !panel.querySelector("img.staple-img, img.land-img") &&
    ![...panel.querySelectorAll('[id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"]')]
      .some((slot) => slot.dataset.cardArtStatus)
  ));
  assert.equal(initialSuppression, true, `${witness.identity_key} hydrated an inactive tier before selection`);

  const panelIds = await page.$$eval("[data-dossier-tab]", (tabs) => [...new Set(tabs.map((tab) => tab.getAttribute("data-dossier-tab")).filter(Boolean))]);
  for (const panelId of panelIds) {
    console.log(`  panel ${panelId}`);
    await page.$eval(`[data-dossier-tab="${panelId}"]`, (button) => button.click());
    await page.waitForFunction((id) => document.querySelector(`[data-dossier-panel="${id}"]`)?.hidden === false, {}, panelId);
    const segments = await page.$$eval(`[data-dossier-panel="${panelId}"] [data-dossier-segment]`, (buttons) => buttons.map((button) => button.getAttribute("data-dossier-segment")).filter(Boolean));
    if (!segments.length) {
      await waitForVisibleMedia(page, `[data-dossier-panel="${panelId}"]`);
      continue;
    }
    for (const segment of segments) {
      await page.$eval(`[data-dossier-segment="${segment}"]`, (button) => button.click());
      await page.waitForFunction((value) => document.querySelector(`[data-dossier-segment-panel="${value}"]`)?.hidden === false, {}, segment);
      await waitForVisibleMedia(page, `[data-dossier-segment-panel="${segment}"]`);
    }
    const requestsBeforeRevisit = cdnRequests.length;
    await page.$eval(`[data-dossier-segment="${segments[0]}"]`, (button) => button.click());
    await waitForVisibleMedia(page, `[data-dossier-segment-panel="${segments[0]}"]`);
    assert.equal(cdnRequests.length, requestsBeforeRevisit, `${witness.identity_key} repeated successful media work on segment revisit`);
  }

  await page.$eval(".dossier-view-toggle", (button) => button.click());
  await page.waitForFunction(() => document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-layout") === "all");
  await waitForVisibleMedia(page);

  const finalState = await page.evaluate(() => ({
    unavailable: [...document.querySelectorAll("#result-inner .is-unavailable")].map((node) => node.getAttribute("data-card-art-name") || node.textContent.trim()),
    retryable: [...document.querySelectorAll("#result-inner .is-retryable")].map((node) => node.getAttribute("data-card-art-name") || node.textContent.trim()),
    projectionMissing: [...document.querySelectorAll('#result-inner [data-card-art-status="projection_missing"]')].map((node) => node.getAttribute("data-card-art-name")),
    invalidImages: [...document.querySelectorAll("#result-inner img")].filter((image) => image.complete && (!image.naturalWidth || !image.naturalHeight)).map((image) => image.alt),
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));
  assert.deepEqual(finalState.unavailable, [], `${witness.identity_key} rendered Image unavailable`);
  if (transientDeliveryMode) assert.deepEqual(finalState.retryable, ["Swamp"], `${witness.identity_key} did not isolate transient delivery to Swamp`);
  else assert.deepEqual(finalState.retryable, [], `${witness.identity_key} exhausted image candidates under successful CDN delivery`);
  assert.deepEqual(finalState.projectionMissing, [], `${witness.identity_key} missed the governed projection`);
  assert.deepEqual(finalState.invalidImages, [], `${witness.identity_key} rendered invalid image dimensions`);
  assert.equal(finalState.overflow, false, `${witness.identity_key} introduced horizontal overflow at ${viewportName}`);

  const governedDetailSelector = 'button.card-detail-image-trigger[data-card-art-status="resolved"]:is([id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"])';
  const detailTrigger = await page.$(governedDetailSelector);
  assert.ok(detailTrigger, `${witness.identity_key} has no resolved governed card-detail trigger`);
  await detailTrigger.evaluate((button) => button.click());
  try {
    await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 15000 });
  } catch (error) {
    const detailState = await page.evaluate(() => ({
      trigger: document.querySelector('button.card-detail-image-trigger[data-card-art-status="resolved"]:is([id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"])')?.getAttribute("data-card-name") || "",
      dialogOpen: Boolean(document.querySelector(".archscry-card-dialog")?.open),
      dialogText: document.querySelector(".archscry-card-dialog")?.textContent?.trim() || "",
    }));
    throw new Error(`${witness.identity_key} card detail did not resolve: ${JSON.stringify(detailState)}`, { cause: error });
  }
  await page.$eval('[data-action="close-card-detail"]', (button) => button.click());

  assert.deepEqual(apiRequests, [], `${witness.identity_key} made an authored api.scryfall.com lookup`);
  if (witness.identity_key === "MARDU" && !transientDeliveryMode && !reviewMode) {
    assert.equal(failedCandidateOnce, true, "Mardu Swamp did not exercise first-candidate failure");
    assert.ok(swamp.image_candidates.slice(1).some((candidate) => cdnRequests.includes(candidate.url)), "Mardu Swamp did not advance to an ordered fallback candidate");
  }
  if (witness.identity_key === "MARDU" && transientDeliveryMode) {
    const transientRequests = cdnRequests.filter((url) => transientCandidateUrls.has(url));
    assert.equal(transientRequests.length, transientCandidateUrls.size * 2, "Swamp transient delivery must receive one bounded later-activation retry only");
    const attemptCount = await page.$eval('[data-card-art-name="Swamp"]', (slot) => Number(slot.dataset.cardArtDeliveryAttempts || 0));
    assert.equal(attemptCount, 2, "Swamp transient delivery retry bound drifted");
  }
  assert.deepEqual(consoleErrors.filter((message) => !/favicon|ERR_FAILED|Failed to load resource/i.test(message)), []);
  return { identity_key: witness.identity_key, heading, cdn_request_count: cdnRequests.length };
}

const server = await startServer();
const address = server.address();
const origin = `http://${host}:${address.port}`;
let chrome;
let browser;
try {
  chrome = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: [...(!reviewMode ? ["--headless=new"] : []), "--no-sandbox", "--disable-gpu"], logLevel: "silent" });
  browser = await puppeteer.connect({ browserURL: `http://${host}:${chrome.port}` });
  const rows = [];
  for (const witness of witnesses) {
    console.log(`VM-559 media replay ${witness.identity_key} at ${viewportName}`);
    const page = await browser.newPage();
    await page.setViewport(viewport);
    try {
      rows.push(await exerciseIdentity(page, origin, witness));
      if (reviewMode) {
        console.log(`VM-559 owner review ready for ${witness.identity_key} at ${viewportName}. Press Enter to close.`);
        await new Promise((resolve) => process.stdin.once("data", resolve));
      }
    }
    finally { await page.close(); }
  }
  console.log(JSON.stringify({ status: "PASS", viewport: viewportName, identities: rows.length, rows }, null, 2));
} finally {
  if (browser) {
    if (reviewMode) browser.disconnect();
    else await browser.close().catch(() => browser.disconnect());
  }
  if (chrome) await Promise.resolve().then(() => chrome.kill()).catch(() => {});
  server.closeIdleConnections?.();
  server.closeAllConnections?.();
  if (reviewMode) server.close();
  else await new Promise((resolve) => server.close(resolve));
}
if (reviewMode) process.exit(0);

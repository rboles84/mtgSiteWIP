import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { stat } from "node:fs/promises";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const viewportName = (process.argv.find((arg) => arg.startsWith("--viewport=")) || "--viewport=desktop").split("=")[1];
const viewports = {
  desktop: { width: 1440, height: 1100 },
  intermediate: { width: 820, height: 1000 },
  mobile: { width: 390, height: 900 },
};
const viewport = viewports[viewportName];
assert.ok(viewport, `unknown viewport ${viewportName}`);
const identityFilter = (process.argv.find((arg) => arg.startsWith("--identity=")) || "").split("=")[1] || "";
const caseFilter = (process.argv.find((arg) => arg.startsWith("--case=")) || "").split("=")[1] || "";
const reviewMode = process.argv.includes("--review");
const collectFailures = process.argv.includes("--collect-failures");
const witnessPath = path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json");
const reportPath = path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-ui-witness-replay.json");
const witnessArtifact = JSON.parse(fs.readFileSync(witnessPath, "utf8"));
const reviewManifestPath = path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "visual-review-manifest.json");
const reviewManifest = fs.existsSync(reviewManifestPath) ? JSON.parse(fs.readFileSync(reviewManifestPath, "utf8")) : { cases: [] };
const witnesses = caseFilter
  ? { rows: reviewManifest.cases.filter((row) => row.case_id === caseFilter) }
  : identityFilter
    ? { ...witnessArtifact, rows: witnessArtifact.rows.filter((row) => row.identity_key === identityFilter) }
    : witnessArtifact;
assert.ok(witnesses.rows.length, `No replay case matched ${caseFilter || identityFilter || "the witness inventory"}`);
if (reviewMode) assert.equal(witnesses.rows.length, 1, "Visual review mode opens one deterministic case at a time");
const model = JSON.parse(fs.readFileSync(path.join(root, "data", "gate-b1-placement-model.json"), "utf8"));
const questions = Object.values(model.question_bank).flatMap((rows) => Array.isArray(rows) ? rows : []);
const questionById = new Map(questions.map((question) => [question.id, question]));
const mime = new Map([[".html", "text/html"], [".js", "text/javascript"], [".css", "text/css"], [".json", "application/json"], [".svg", "image/svg+xml"], [".png", "image/png"], [".jpg", "image/jpeg"], [".woff2", "font/woff2"]]);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const transparentPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");

function startServer() {
  const server = http.createServer(async (request, response) => {
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

async function clickTransitionIfVisible(page, expectedKind = "") {
  const transition = await page.$("#quick-transition:not(.hidden)");
  if (!transition) return false;
  if (expectedKind) {
    const text = await page.$eval("#quick-transition-title", (node) => node.textContent || "");
    assert.match(text, expectedKind === "hall" ? /next question responds/i : /Building your reading/i);
  }
  await page.$eval("#quick-transition-action", (button) => button.click());
  return true;
}

async function replay(page, origin, witness) {
  await page.evaluateOnNewDocument((enableDesktopHover) => {
    localStorage.clear();
    window.supabase = { createClient: () => ({ auth: { getSession: async () => ({ data: { session: null }, error: null }) } }) };
    if (enableDesktopHover) {
      const nativeMatchMedia = window.matchMedia.bind(window);
      window.matchMedia = (query) => {
        const result = nativeMatchMedia(query);
        if (query !== "(hover: hover) and (pointer: fine)") return result;
        return new Proxy(result, {
          get(target, property) {
            if (property === "matches") return true;
            const value = Reflect.get(target, property, target);
            return typeof value === "function" ? value.bind(target) : value;
          },
        });
      };
    }
  }, viewportName === "desktop");
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto(`${origin}/archscry/`, { waitUntil: "networkidle0", timeout: 30000 });
  try {
    await page.waitForSelector('[data-action="start-quick-flow"]', { visible: true, timeout: 20000 });
  } catch (error) {
    const runtimeState = await page.evaluate(() => ({
      title: document.querySelector("h2")?.textContent || "",
      body: document.body?.innerText?.slice(0, 1000) || "",
    }));
    throw new Error(`Archscry did not reach its ready landing state: ${JSON.stringify(runtimeState)}; console=${JSON.stringify(consoleErrors)}`, { cause: error });
  }
  await page.$eval('[data-action="start-quick-flow"]', (button) => button.click());

  for (let index = 0; index < witness.selections.length; index += 1) {
    const selection = witness.selections[index];
    const question = questionById.get(selection.question_id);
    assert.ok(question, `${witness.identity_key} missing question ${selection.question_id}`);
    if (selection.refinement) {
      await page.waitForSelector('[data-action="start-result-refinement"]', { visible: true, timeout: 15000 });
      await page.$eval('[data-action="start-result-refinement"]', (button) => button.click());
    }
    await page.waitForFunction((prompt) => document.getElementById("question-title")?.textContent === prompt, { timeout: 15000 }, question.prompt);
    const answerIndex = question.answers.findIndex((answer) => answer.id === selection.answer_id);
    assert.ok(answerIndex >= 0);
    const buttons = await page.$$("#answer-grid button");
    assert.ok(buttons[answerIndex], `${witness.identity_key} missing rendered answer ${selection.answer_id}`);
    await buttons[answerIndex].evaluate((button) => button.click());
    await delay(10);
    const next = witness.selections[index + 1];
    const transitionKind = await page.evaluate(() => document.querySelector("#quick-transition:not(.hidden)")?.dataset ? window.document.getElementById("quick-transition-title")?.textContent || "" : "");
    if (/next question responds/i.test(transitionKind)) await clickTransitionIfVisible(page, "hall");
    else if (/Building your reading/i.test(transitionKind)) {
      await clickTransitionIfVisible(page, "reading");
      if (next && !next.refinement) throw new Error(`${witness.identity_key} stopped before expected main question ${next.question_id}`);
    }
  }
  await clickTransitionIfVisible(page, "reading");
  await page.waitForSelector("#result:not(.hidden)", { timeout: 20000 });
  await page.waitForFunction(() => {
    const state = document.getElementById("result-inner")?.dataset.cardArtState;
    return !state || state === "ready" || state === "failed";
  }, { timeout: 45000 });
  const cardArtState = await page.$eval("#result-inner", (node) => ({
    state: node.dataset.cardArtState || "not-requested",
    unavailable: [...node.querySelectorAll(".is-unavailable[data-card-art-name]")]
      .map((slot) => slot.getAttribute("data-card-art-name"))
      .filter(Boolean),
  }));
  if (witness.expected_public_contract === "NAMED_DOSSIER") {
    assert.equal(cardArtState.state, "ready", `${witness.identity_key} card-art resolver did not complete`);
    if (reviewMode) assert.deepEqual(cardArtState.unavailable, [], `${witness.identity_key} review card art unresolved`);
    const whyTab = await page.$('[data-dossier-tab="why"]');
    if (whyTab) {
      await whyTab.evaluate((button) => button.click());
      await page.waitForFunction(() => document.querySelector('[data-dossier-panel="why"]')?.hidden === false);
    }
    const rationaleTrigger = await page.$('[data-card-rationale-section] .flavor-echo-image-trigger');
    assert.ok(rationaleTrigger, `${witness.identity_key} has no rationale-card detail trigger`);
    const rationalePanel = await rationaleTrigger.evaluate((node) => node.closest("[data-dossier-panel]")?.getAttribute("data-dossier-panel") || "");
    if (rationalePanel) {
      const rationaleTab = await page.$(`[data-dossier-tab="${rationalePanel}"]`);
      if (rationaleTab) {
        await rationaleTab.evaluate((button) => button.click());
        await page.waitForFunction((panelId) => document.querySelector(`[data-dossier-panel="${panelId}"]`)?.hidden === false, {}, rationalePanel);
      }
    }
    const tileRationale = await page.$eval('[data-card-rationale-section] .flavor-echo-why', (node) => node.textContent?.trim() || "");
    if (viewportName === "desktop") {
      await page.evaluate(() => {
        window.__vmHoverEvents = [];
        for (const type of ["pointerover", "pointerout", "pointermove"]) {
          document.addEventListener(type, (event) => window.__vmHoverEvents.push({ type, target: event.target?.className || event.target?.tagName || "" }), { capture: true });
        }
        window.addEventListener("scroll", () => window.__vmHoverEvents.push({ type: "scroll" }), { capture: true });
      });
      await rationaleTrigger.evaluate((node) => {
        document.documentElement.style.scrollBehavior = "auto";
        node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
        const rect = node.getBoundingClientRect();
        const topbarBottom = document.querySelector(".vm-topbar")?.getBoundingClientRect().bottom || 0;
        if (rect.top < topbarBottom + 24) window.scrollBy(0, rect.top - topbarBottom - 32);
      });
      await delay(300);
      let realHoverReached = false;
      for (let attempt = 0; attempt < 3 && !realHoverReached; attempt += 1) {
        const pointerTarget = await rationaleTrigger.evaluate((node) => {
          const rect = node.getBoundingClientRect();
          const topbarBottom = document.querySelector(".vm-topbar")?.getBoundingClientRect().bottom || 0;
          const top = Math.max(rect.top + 4, topbarBottom + 12);
          const bottom = Math.min(rect.bottom - 4, window.innerHeight - 12);
          return { x: rect.left + rect.width / 2, y: top < bottom ? (top + bottom) / 2 : rect.top + rect.height / 2 };
        });
        await page.mouse.move(1, 1);
        await delay(50);
        await page.mouse.move(pointerTarget.x, pointerTarget.y);
        await delay(250);
        realHoverReached = await page.evaluate(() => Boolean(document.querySelector('[data-card-rationale-section] .flavor-echo-image-trigger:hover')));
        if (!realHoverReached) await rationaleTrigger.evaluate((node) => node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }));
      }
      const hoverState = await page.evaluate(() => ({
        hoverCapable: matchMedia("(hover: hover) and (pointer: fine)").matches,
        triggerHovered: Boolean(document.querySelector('[data-card-rationale-section] .flavor-echo-image-trigger:hover')),
        overlayExists: Boolean(document.querySelector(".card-preview-overlay")),
        overlayVisible: Boolean(document.querySelector(".card-preview-overlay")?.classList.contains("is-visible")),
        triggerRect: (() => {
          const rect = document.querySelector('[data-card-rationale-section] [data-action="open-card-detail"]')?.getBoundingClientRect();
          return rect ? { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height } : null;
        })(),
        topbarRect: (() => {
          const rect = document.querySelector(".vm-topbar")?.getBoundingClientRect();
          return rect ? { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height } : null;
        })(),
        scrollY: window.scrollY,
        events: window.__vmHoverEvents,
      }));
      assert.equal(hoverState.hoverCapable, true, `${witness.identity_key} desktop pointer capability was not active`);
      assert.equal(realHoverReached && hoverState.triggerHovered, true, `${witness.identity_key} rationale trigger did not receive a real hover: ${JSON.stringify(hoverState)}`);
      assert.equal(hoverState.overlayVisible, true, `${witness.identity_key} hover handler did not open the full-card preview: ${JSON.stringify({ hoverState, consoleErrors })}`);
      const previewSource = await page.$eval(".card-preview-overlay img", (image) => image.getAttribute("src") || "");
      assert.ok(previewSource && !/art_crop/i.test(previewSource), `${witness.identity_key} rationale hover did not use a full-card source`);
      const copyHoverTarget = await page.$('[data-card-rationale-section] .flavor-echo-why');
      await copyHoverTarget.hover();
      await delay(80);
      const copyOpenedPreview = await page.evaluate(() => document.querySelector(".card-preview-overlay")?.classList.contains("is-visible") || false);
      assert.equal(copyOpenedPreview, false, `${witness.identity_key} rationale copy incorrectly triggered a card preview`);
      if (witness.identity_key === "WU") {
        const rapidTargets = await page.evaluate(() => {
          const triggers = [...document.querySelectorAll("[data-card-preview-name]")]
            .filter((node, index, rows) => rows.findIndex((candidate) => candidate.dataset.cardPreviewName === node.dataset.cardPreviewName) === index)
            .slice(0, 3);
          if (triggers.length < 3) return [];
          for (const trigger of triggers) trigger.dispatchEvent(new PointerEvent("pointerover", { bubbles: true, pointerType: "mouse" }));
          const overlay = document.querySelector(".card-preview-overlay");
          if (overlay?.classList.contains("is-visible") || overlay?.querySelector("img")?.getAttribute("src")) {
            throw new Error("Rapid target change retained stale visible card content.");
          }
          return triggers.map((trigger) => trigger.dataset.cardPreviewName);
        });
        assert.equal(rapidTargets.length, 3, "rapid-hover regression requires three distinct card targets");
        await page.waitForFunction((expected) => {
          const overlay = document.querySelector(".card-preview-overlay");
          return !overlay?.classList.contains("is-visible") || overlay.dataset.previewResolvedTarget === expected;
        }, { timeout: 15000 }, rapidTargets.at(-1));
        const rapidState = await page.evaluate(() => {
          const overlay = document.querySelector(".card-preview-overlay");
          return {
            target: overlay?.dataset.previewTarget || "",
            resolved: overlay?.dataset.previewResolvedTarget || "",
            visible: overlay?.classList.contains("is-visible") || false,
          };
        });
        assert.equal(rapidState.target, rapidTargets.at(-1));
        if (rapidState.visible) assert.equal(rapidState.resolved, rapidTargets.at(-1));
      }
    }
    await rationaleTrigger.evaluate((button) => button.click());
    await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 15000 });
    const modalRationale = await page.$eval(".archscry-card-dialog-why span", (node) => node.textContent?.trim() || "");
    assert.equal(modalRationale, tileRationale, `${witness.identity_key} tile/modal rationale drift`);
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector(".archscry-card-dialog")?.open);
    await delay(50);
    const restored = await page.evaluate(() => document.activeElement?.matches?.('[data-card-rationale-section] .flavor-echo-image-trigger') || false);
    assert.equal(restored, true, `${witness.identity_key} modal did not restore focus`);
  }
  const ui = await page.evaluate(() => {
    const text = document.getElementById("result-inner")?.innerText || "";
    const cardName = (node) => (node?.getAttribute("data-card-preview-name") || node?.getAttribute("data-card-name") || node?.textContent || "").trim().toLowerCase();
    const groups = {
      precon: [...document.querySelectorAll(".precon-commander-trigger")].map(cardName),
      rationale: [...document.querySelectorAll("[data-card-rationale-section] [data-card-preview-name]")].map(cardName),
      voice: [...document.querySelectorAll("[data-card-voice-section] [data-card-preview-name]")].map(cardName),
      signals: [...document.querySelectorAll(".staples-section .staple-name")].map(cardName),
    };
    const all = Object.values(groups).flat().filter(Boolean);
    const guildName = document.querySelector(".guild-name")?.textContent?.trim() || "";
    const normalizeNarrative = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
    const heroNarrative = normalizeNarrative(document.querySelector(".guild-philosophy")?.textContent);
    const loreSummary = normalizeNarrative(document.querySelector(".guild-lore-summary")?.textContent);
    return {
      state: guildName ? "named" : document.querySelector("[data-result-state]")?.getAttribute("data-result-state") || "unknown",
      publicResultState: document.querySelector('[data-summary-card="co-leader"]')
        ? "tied"
        : document.querySelector("[data-result-state]")?.getAttribute("data-result-state") || (guildName ? "primary" : "unknown"),
      guildName,
      whyCount: document.querySelectorAll("[data-public-fit-reasons] .omen-card").length,
      whyFitRefinementAvailable: Boolean(document.querySelector('[data-public-fit-reasons] [data-action="start-result-refinement"]')),
      testFitCount: document.querySelectorAll("[data-test-the-fit] .identity-story-card").length,
      rationaleCount: document.querySelectorAll("[data-card-rationale-section] .flavor-echo-card").length,
      voiceCount: document.querySelectorAll("[data-card-voice-section] .flavor-echo-card").length,
      whatToLookForCount: document.querySelectorAll(".archetypes-grid .arch-card").length,
      preconCount: document.querySelectorAll(".precon-card").length,
      browseBuildCount: document.querySelectorAll(".precon-provider-menu a[href]").length,
      signalCount: document.querySelectorAll(".staples-section .staple-name").length,
      manaNotesPresent: Boolean(document.querySelector(".lands-section")),
      glossaryHelpCount: document.querySelectorAll(".archscry-term-help[data-gloss]").length,
      glossaryTerms: [...document.querySelectorAll(".archscry-term-help[data-gloss]")].map((node) => node.textContent?.trim() || ""),
      duplicateCards: [...new Set(all.filter((name, index) => all.indexOf(name) !== index))],
      cardGroups: groups,
      internalLeaks: text.match(/\b(?:SIG_|DG_|MAPPING_|naming qualification|mapping hypothesis|bounded observation)\S*/gi) || [],
      auditLanguageLeaks: text.match(/\b(?:Commander support texture|lore-canon proof|approved relationship|approved card-to-identity explanation|source-backed|public-surface|guardrail|evidence-required|mapping|routing|taxonomy|bounded interpretation)\b/gi) || [],
      entityLeaks: text.match(/&(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]+);/gi) || [],
      knownCopyDefects: [
        /volatility Theater/gi,
        /spell magnitide/gi,
        /No&#x20;/gi,
      ].flatMap((pattern) => text.match(pattern) || []),
      literalColorless: text.includes("{C}"),
      literalColorlessNodes: [...document.querySelectorAll("#result-inner *")]
        .filter((node) => [...node.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.textContent.includes("{C}")))
        .map((node) => ({ className: node.className || node.tagName, text: node.textContent.trim() })),
      heroNarrativeDuplicate: Boolean(heroNarrative && loreSummary && (heroNarrative === loreSummary || heroNarrative.includes(loreSummary) || loreSummary.includes(heroNarrative))),
      documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });
  if (witness.expected_public_contract === "NAMED_DOSSIER") {
    assert.equal(ui.state, "named", `${witness.identity_key} did not render a named dossier`);
    assert.ok(ui.guildName, `${witness.identity_key} omitted the dossier hero`);
    assert.ok(ui.whyCount >= 2 && ui.whyCount <= 3, `${witness.identity_key} Why This Fit count ${ui.whyCount}`);
    assert.equal(ui.whyFitRefinementAvailable, false, `${witness.identity_key} put a retake action inside Why This Fit`);
    assert.equal(ui.testFitCount, 3, `${witness.identity_key} Test the Fit incomplete`);
    assert.ok(ui.rationaleCount >= 1, `${witness.identity_key} rationale section missing`);
    assert.ok(ui.voiceCount >= 1, `${witness.identity_key} voice section missing`);
    assert.ok(ui.whatToLookForCount >= 3, `${witness.identity_key} What to Look For incomplete`);
    assert.ok(ui.preconCount >= 1, `${witness.identity_key} precon starting points missing`);
    assert.ok(ui.browseBuildCount >= ui.preconCount, `${witness.identity_key} displayed a precon without Browse Builds`);
    assert.ok(ui.glossaryHelpCount >= 1, `${witness.identity_key} rendered no Start Here teaching help`);
    assert.equal(ui.manaNotesPresent, true, `${witness.identity_key} omitted Mana Notes`);
    assert.deepEqual(ui.duplicateCards, [], `${witness.identity_key} repeated cards across public page roles: ${JSON.stringify(ui.cardGroups)}`);
    assert.deepEqual(ui.auditLanguageLeaks, [], `${witness.identity_key} leaked reviewer or implementation language`);
    assert.equal(ui.heroNarrativeDuplicate, false, `${witness.identity_key} repeated its hero thesis in the adjacent lore summary`);
  } else {
    assert.notEqual(ui.state, "named", "Yore must retain a bounded public state");
  }
  if (witness.expected_state) assert.equal(ui.publicResultState, witness.expected_state, `${witness.case_id || witness.identity_key} result-state drift`);
  assert.deepEqual(ui.internalLeaks, []);
  assert.deepEqual(ui.entityLeaks, [], `${witness.identity_key} leaked encoded entities`);
  assert.deepEqual(ui.knownCopyDefects, [], `${witness.identity_key} retained a known copy defect`);
  if (witness.identity_key === "COLORLESS" && ui.state === "named") assert.equal(ui.literalColorless, false, `literal Colorless token remained in ${JSON.stringify(ui.literalColorlessNodes)}`);
  assert.equal(ui.documentOverflow, false);
  assert.deepEqual(consoleErrors.filter((message) => !/favicon|ERR_FAILED|Failed to load resource/i.test(message)), []);
  return { identity_key: witness.identity_key, ...ui, console_errors: consoleErrors.filter((message) => !/favicon|ERR_BLOCKED_BY_CLIENT/i.test(message)) };
}

const server = await startServer();
const address = server.address();
const origin = `http://${host}:${address.port}`;
let chrome;
let browser;
try {
  chrome = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: [...(reviewMode ? [] : ["--headless=new"]), "--no-sandbox", "--disable-gpu"], logLevel: "silent" });
  browser = await puppeteer.connect({ browserURL: `http://${host}:${chrome.port}` });
  const rows = [];
  const failures = [];
  for (const witness of witnesses.rows) {
    console.log(`Replaying ${witness.identity_key} at ${viewportName}`);
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      if (url.startsWith(origin) || url.startsWith("data:") || url.startsWith("blob:")) request.continue();
      else if (/^https:\/\/api\.scryfall\.com\/cards\/named(?:\?|$)/.test(url) && reviewMode) request.continue();
      else if (/^https:\/\/cards\.scryfall\.io\//.test(url)) reviewMode ? request.continue() : request.respond({ status: 200, contentType: "image/png", body: transparentPng });
      else request.abort();
    });
    try {
      rows.push(await replay(page, origin, witness));
      if (reviewMode) {
        console.log(`Visual review ready for ${witness.case_id || witness.identity_key}. Press Enter in this terminal to close it.`);
        await new Promise((resolve) => process.stdin.once("data", resolve));
      }
    }
    catch (error) {
      if (!collectFailures) throw error;
      failures.push({ identity_key: witness.identity_key, message: error.message });
      console.error(`${witness.identity_key} failed: ${error.message}`);
    }
    finally { await page.close(); }
  }
  if (!reviewMode && !identityFilter && !caseFilter) {
    const previous = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, "utf8")) : { schema_version: "1.0.0", viewports: {} };
    previous.viewports[viewportName] = { width: viewport.width, height: viewport.height, status: failures.length ? "FAIL" : "PASS", rows, failures };
    fs.writeFileSync(reportPath, `${JSON.stringify(previous, null, 2)}\n`);
  }
  console.log(JSON.stringify({ status: failures.length ? "FAIL" : "PASS", viewport: viewportName, identities: rows.length, named: rows.filter((row) => row.state === "named").length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  if (browser) await browser.close().catch(() => browser.disconnect());
  if (chrome) {
    try { await chrome.kill(); } catch { /* browser already closed */ }
  }
  await new Promise((resolve) => server.close(resolve));
}

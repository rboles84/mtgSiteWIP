import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer-core";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");
const host = "127.0.0.1";
const port = 4174;
const previewUrl = `http://${host}:${port}/docs/prototypes/vm551-gate-b1-production-fidelity-preview/`;
const productionUrl = `http://${host}:${port}/archscry/`;
const prototypeData = JSON.parse(fs.readFileSync(path.join(here, "../vm551-gate-b1-owner-experience/prototype-data.json"), "utf8"));
const branchingMap = JSON.parse(fs.readFileSync(path.join(here, "branching-map.json"), "utf8"));
const reviewRoutes = branchingMap.reviewJourneys.map(({ id }) => {
  const route = prototypeData.walkthroughs.find((candidate) => candidate.id === id);
  if (!route) throw new Error(`Missing authored walkthrough ${id}.`);
  return route;
});
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const executablePath = browserCandidates.find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error("No Chromium browser was found for preview validation.");

const contentTypes = new Map([
  [".css", "text/css"], [".html", "text/html"], [".js", "text/javascript"], [".json", "application/json"],
  [".mjs", "text/javascript"], [".png", "image/png"], [".svg", "image/svg+xml"], [".webp", "image/webp"],
  [".woff2", "font/woff2"],
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function staticServer() {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
    const relative = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    const target = path.resolve(root, `.${relative}`);
    if (!target.startsWith(root)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    fs.readFile(target, (error, body) => {
      if (error) {
        response.writeHead(404).end("Not found");
        return;
      }
      response.writeHead(200, { "Content-Type": contentTypes.get(path.extname(target)) || "application/octet-stream" });
      response.end(body);
    });
  });
}

const storageSentinelScript = `
  (() => {
    const local = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key !== null) local[key] = localStorage.getItem(key);
    }
    sessionStorage.setItem("vm_last_result", JSON.stringify({ sentinel: "vm551-last-result" }));
    sessionStorage.setItem("vm_profile", JSON.stringify({ sentinel: "vm551-profile" }));
    Object.defineProperty(window, "__vm551StorageBaseline", {
      value: {
        local,
        session: {
          vm_last_result: sessionStorage.getItem("vm_last_result"),
          vm_profile: sessionStorage.getItem("vm_profile"),
        },
      },
      configurable: false,
    });
  })();
`;

async function assertStorageUnchanged(page, label) {
  const result = await page.evaluate(() => {
    const local = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key !== null) local[key] = localStorage.getItem(key);
    }
    return {
      localMatches: JSON.stringify(local) === JSON.stringify(window.__vm551StorageBaseline.local),
      changedLocalKeys: [...new Set([...Object.keys(local), ...Object.keys(window.__vm551StorageBaseline.local)])].filter((key) => local[key] !== window.__vm551StorageBaseline.local[key]),
      lastMatches: sessionStorage.getItem("vm_last_result") === window.__vm551StorageBaseline.session.vm_last_result,
      profileMatches: sessionStorage.getItem("vm_profile") === window.__vm551StorageBaseline.session.vm_profile,
      previewKeys: Object.keys(sessionStorage).filter((key) => key.startsWith("vm551_gate_b1_preview")),
    };
  });
  assert(result.localMatches, `${label}: localStorage changed at ${result.changedLocalKeys.join(", ") || "an unknown key"}.`);
  assert(result.lastMatches, `${label}: vm_last_result sentinel changed.`);
  assert(result.profileMatches, `${label}: vm_profile sentinel changed.`);
  assert(result.previewKeys.length === 0, `${label}: preview-only session payload was not deleted or invalidated.`);
}

async function clickAnswer(page, answerId) {
  await page.locator(`[data-answer-id="${answerId}"]`).click();
  await new Promise((resolve) => setTimeout(resolve, 230));
}

async function newPreviewPage(browser, viewport = { width: 1440, height: 1050 }) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport(viewport);
  await page.evaluateOnNewDocument(storageSentinelScript);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (text.includes("net::ERR_NO_BUFFER_SPACE")) return;
    errors.push(text);
  });
  await page.goto(previewUrl, { waitUntil: "networkidle0" });
  return { context, page, errors };
}

async function startFree(page) {
  await page.locator("#start-free").click();
}

async function openReviewRoute(page, routeId) {
  await page.locator("#reviewer-toggle").click();
  await page.select("#journey-select", routeId);
  await page.locator("#start-review-case").click();
}

async function answerGateAndContinue(page, answerIds) {
  for (const answerId of answerIds) await clickAnswer(page, answerId);
  await page.waitForSelector("#transition-action");
  await page.locator("#transition-action").click();
}

async function openReading(page, verifyPlayerPacing = true) {
  await page.waitForFunction(() => document.querySelector("#transition-action")?.textContent === "Open my reading");
  if (verifyPlayerPacing) {
    await new Promise((resolve) => setTimeout(resolve, 1300));
    assert(await page.$eval("#transition-action", (node) => Boolean(node.offsetWidth || node.offsetHeight || node.getClientRects().length)), "Result transition advanced without player action.");
  }
  await page.locator("#transition-action").click();
  await page.waitForSelector("[data-preview-b1-summary]");
}

function questionForRouteStep(step) {
  return [...prototypeData.questions, ...(prototypeData.lensQuestions || [])].find((question) => question.id === step.questionId);
}

async function completeAuthoredRoute(page, route, answerOverride = new Map()) {
  for (let index = 0; index < route.steps.length; index += 1) {
    const step = route.steps[index];
    await page.waitForFunction((questionId) => document.querySelector("#question-card")?.dataset.questionId === questionId, {}, step.questionId);
    const target = await page.$eval('[data-authored-target="true"]', (node) => ({
      answerId: node.querySelector("[data-answer-id]")?.dataset.answerId,
      cue: node.querySelector("[data-authored-target-cue]")?.textContent || "",
    }));
    assert(target.answerId === step.selectedAnswerId, `${route.id} step ${index + 1}: reviewer target ${target.answerId} did not match ${step.selectedAnswerId}.`);
    const expectedAnswer = questionForRouteStep(step)?.answers?.find((answer) => answer.id === step.selectedAnswerId);
    assert(target.cue.includes(`Authored review selection: ${expectedAnswer?.title}`) && target.cue.includes(step.selectedAnswerId), `${route.id} step ${index + 1}: reviewer target cue is incomplete.`);
    await clickAnswer(page, answerOverride.get(step.questionId) || step.selectedAnswerId);
    if (index === 3) {
      await page.waitForFunction(() => document.querySelector("#transition-action")?.textContent === "Continue into the Hall");
      await page.locator("#transition-action").click();
    }
  }
  await openReading(page, false);
}

async function assertAuthoredState(page, route) {
  await page.waitForSelector(`[data-result-state="${route.state}"]`);
  assert(await page.$eval(`[data-result-state="${route.state}"]`, (node) => Boolean(node.offsetWidth || node.offsetHeight || node.getClientRects().length)), `${route.id}: authored ${route.state} state is not visible.`);
}

async function beginAgainFromResult(page) {
  const selector = await page.evaluate(() => {
    const bounded = document.querySelector('.bounded-result-shell [data-action="start-quick-flow"]');
    if (bounded && (bounded.offsetWidth || bounded.offsetHeight || bounded.getClientRects().length)) return '.bounded-result-shell [data-action="start-quick-flow"]';
    const dossier = document.querySelector('.dossier-rail [data-action="retake"]');
    if (dossier && (dossier.offsetWidth || dossier.offsetHeight || dossier.getClientRects().length)) return '.dossier-rail [data-action="retake"]';
    return "";
  });
  assert(selector, "No production Begin Again action was available.");
  await page.locator(selector).click();
  await page.waitForSelector("#start-free");
}

async function dossierContract(page) {
  return page.evaluate(() => ({
    tabs: [...document.querySelectorAll(".dossier-rail-tabs [data-dossier-tab]")].map((node) => ({
      id: node.dataset.dossierTab,
      controls: node.getAttribute("aria-controls"),
      role: node.getAttribute("role"),
    })),
    panels: [...document.querySelectorAll("[data-dossier-panel]")].map((node) => ({
      id: node.dataset.dossierPanel,
      role: node.getAttribute("role"),
      labelledby: node.getAttribute("aria-labelledby"),
    })),
  }));
}

async function runAdaptiveA(browser) {
  const { context, page, errors } = await newPreviewPage(browser);
  try {
    await startFree(page);
    const q1Rects = await page.$$eval("#answer-grid .answer-card", (nodes) => nodes.map((node) => node.getBoundingClientRect()).map(({ x, y, width }) => ({ x, y, width })));
    assert(q1Rects.length === 4 && q1Rects[0].y === q1Rects[1].y && q1Rects[2].y === q1Rects[3].y && q1Rects[2].y > q1Rects[0].y, "Desktop four-answer Gate is not 2×2.");
    await clickAnswer(page, "b1.gate.initiative.v1.advance");
    await clickAnswer(page, "b1.gate.visibility.v1.board");
    const q3Text = await page.$eval("#question-card", (node) => node.innerText);
    assert((q3Text.match(/board wipe/gi) || []).length === 1, "Q3 repeats the board-wipe definition.");
    await clickAnswer(page, "b1.gate.disruption.v1.recover");
    await clickAnswer(page, "b1.gate.tempo.v1.small");
    await new Promise((resolve) => setTimeout(resolve, 1300));
    assert(await page.$eval("#transition-action", (node) => Boolean(node.offsetWidth || node.offsetHeight || node.getClientRects().length)), "Hall transition advanced without player action.");
    await page.locator("#transition-action").click();
    assert((await page.$eval("#question-title", (node) => node.innerText)).includes("how much do you want the path to your main plan to repeat"), "Run A did not select C09 Repeatability.");
    const threeRects = await page.$$eval("#answer-grid .answer-card", (nodes) => nodes.map((node) => node.getBoundingClientRect()).map(({ y, width }) => ({ y, width })));
    assert(threeRects.length === 3 && threeRects.every((rect) => rect.y === threeRects[0].y), "Desktop three-answer Hall is not one balanced row.");
    await page.locator("#reviewer-toggle").click();
    assert((await page.$eval("#question-reviewer-content", (node) => node.textContent)).includes("visible-recovery-growth"), "Run A reviewer branch is not visible-recovery-growth.");
    assert(errors.length === 0, `Run A console errors: ${errors.join(" | ")}`);
    await assertStorageUnchanged(page, "Run A");
  } finally { await context.close(); }
}

async function runAdaptiveB(browser) {
  const { context, page, errors } = await newPreviewPage(browser);
  try {
    await startFree(page);
    await clickAnswer(page, "b1.gate.initiative.v1.advance");
    await clickAnswer(page, "b1.gate.visibility.v1.board");
    await clickAnswer(page, "b1.gate.disruption.v1.limit");
    await clickAnswer(page, "b1.gate.tempo.v1.burst");
    await page.locator("#transition-action").click();
    assert((await page.$eval("#question-title", (node) => node.innerText)).includes("Which kind of progress makes your deck feel like it’s doing its job"), "Run B did not select C07 Pressure.");
    await page.locator("#reviewer-toggle").click();
    assert((await page.$eval("#question-reviewer-content", (node) => node.textContent)).includes("visible-burst-pressure"), "Run B reviewer branch is not visible-burst-pressure.");
    assert(errors.length === 0, `Run B console errors: ${errors.join(" | ")}`);
    await assertStorageUnchanged(page, "Run B");
  } finally { await context.close(); }
}

async function runEsperAndParity(browser) {
  const { context, page, errors } = await newPreviewPage(browser);
  try {
    await openReviewRoute(page, "esper-information-to-plan");
    await answerGateAndContinue(page, [
      "b1.gate.initiative.v1.balance", "b1.gate.visibility.v1.held", "b1.gate.disruption.v1.protect", "b1.gate.tempo.v1.small",
    ]);
    await clickAnswer(page, "b1.hall.mana-window.v1.split");
    await clickAnswer(page, "b1.hall.engine-shape.v1.central");
    await clickAnswer(page, "b1.hall.information-to-plan.v1.exploit");
    await openReading(page);
    const summary = await page.$eval("[data-preview-b1-summary]", (node) => node.innerText);
    assert(summary.includes("USE THE OPENING NOW"), "Esper summary omitted the selected C16 answer.");
    assert(!summary.includes("route consolidation after new information"), "Esper summary retained stale route-consolidation prose.");
    assert(summary.includes("diverged from the authored review path"), "Esper mismatch was not bounded.");
    const statePresentation = await page.$eval(".result-state-banner", (node) => `${node.dataset.resultState}|${node.textContent}`);
    assert(statePresentation.startsWith("close|") && statePresentation.includes("Close result"), `Esper authored close-state presentation was not preserved: ${statePresentation}`);
    const previewContract = await dossierContract(page);
    const expectedPanels = ["placement", "start", "why", "commander-deck-starts", "starter-cards", "mana-base", "maze-discovery"];
    assert(JSON.stringify(previewContract.tabs.map((tab) => tab.id)) === JSON.stringify(expectedPanels), "Preview directory does not match the production section set.");
    for (const panelId of expectedPanels) {
      await page.locator(`.dossier-rail-tabs [data-dossier-tab="${panelId}"]`).click();
      assert(await page.$eval(`[data-dossier-panel="${panelId}"]`, (node) => Boolean(node.offsetWidth || node.offsetHeight || node.getClientRects().length)), `Preview dossier section ${panelId} is not reachable.`);
    }
    const endcaps = await page.$$eval(".footer-actions", (nodes) => nodes.length);
    assert(endcaps === 1, `Expected one production endcap, found ${endcaps}.`);

    const productionContext = await browser.createBrowserContext();
    const productionPage = await productionContext.newPage();
    try {
      await productionPage.setRequestInterception(true);
      productionPage.on("request", (request) => request.url().includes("cdn.jsdelivr.net/npm/@supabase") ? request.abort() : request.continue());
      await productionPage.evaluateOnNewDocument((result) => {
        window.__vmVisualRegressionDisableCardArt = true;
        window.supabase = { createClient: () => ({ auth: { getSession: async () => ({ data: { session: null } }) } }) };
        sessionStorage.setItem("vm_last_result", JSON.stringify(result));
      }, {
        version: "vm551-parity-v1", source_mode: "preview-authored-non-scoring", faction: "ESPER", faction_name: "Esper",
        top_matches: [{ faction: "ESPER", faction_name: "Esper" }], starter_profile: { budget: "mid", experience: "returning" },
      });
      await productionPage.goto(productionUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
      await productionPage.waitForSelector("[data-dossier-console]", { timeout: 30000 });
      const productionContract = await dossierContract(productionPage);
      assert(JSON.stringify(previewContract) === JSON.stringify(productionContract), "Named preview dossier diverges from the production section/DOM contract.");
    } finally { await productionContext.close(); }

    await page.locator('.dossier-rail [data-action="retake"]').click();
    await page.waitForSelector("#start-free");
    await assertStorageUnchanged(page, "Esper result and Begin Again");
    assert(errors.length === 0, `Esper console errors: ${errors.join(" | ")}`);
  } finally { await context.close(); }
}

async function runColorlessTruth(browser) {
  const { context, page, errors } = await newPreviewPage(browser);
  try {
    await openReviewRoute(page, "colorless");
    await answerGateAndContinue(page, [
      "b1.gate.initiative.v1.balance", "b1.gate.visibility.v1.held", "b1.gate.disruption.v1.recover", "b1.gate.tempo.v1.small",
    ]);
    await clickAnswer(page, "b1.hall.repeatability.v1.same");
    await clickAnswer(page, "b1.hall.engine-shape.v1.replace");
    await clickAnswer(page, "b1.hall.theme.v1.theme");
    await clickAnswer(page, "b1.crucible.colorless-wubrg.v1.constraint");
    await openReading(page);
    const summary = await page.$eval("[data-preview-b1-summary]", (node) => node.innerText);
    assert(summary.includes("KEEP THE ON-THEME CARD"), "Colorless summary omitted the selected theme answer.");
    assert(!summary.includes("conditional theme tradeoff"), "Colorless summary retained stale conditional-theme prose.");
    assert(await page.$eval(".bounded-result-shell[data-result-state=insufficient]", (node) => Boolean(node.offsetWidth || node.offsetHeight || node.getClientRects().length)), "Colorless did not preserve the production insufficient shell.");
    await page.locator('.bounded-result-shell [data-action="start-quick-flow"]').click();
    await page.waitForSelector("#start-free");
    await assertStorageUnchanged(page, "Colorless result and Begin Again");
    assert(errors.length === 0, `Colorless console errors: ${errors.join(" | ")}`);
  } finally { await context.close(); }
}

async function runAuthoredRoutePositive(browser, route) {
  const { context, page, errors } = await newPreviewPage(browser);
  try {
    await openReviewRoute(page, route.id);
    await completeAuthoredRoute(page, route);
    const summary = await page.$eval("[data-preview-b1-summary]", (node) => node.innerText);
    assert(await page.$eval('[data-route-match="true"]', (node) => node.textContent.trim() === "true"), `${route.id}: exact authored selections did not report a match.`);
    assert(await page.$eval("[data-route-audit-summary]", (node) => node.textContent).then((text) => text.includes(`Every expected question/answer pair matched (${route.steps.length} of ${route.steps.length}).`)), `${route.id}: exact-match audit summary is missing.`);
    assert((await page.$$('[data-route-mismatches]')).length === 0, `${route.id}: exact route rendered mismatch diagnostics.`);
    assert(!summary.includes("This run diverged from the authored review path"), `${route.id}: exact route rendered a divergence warning.`);
    assert(summary.includes(route.routeSupportedDistinction), `${route.id}: exact route withheld its authored context.`);
    await assertAuthoredState(page, route);
    await beginAgainFromResult(page);
    await assertStorageUnchanged(page, `${route.id} exact authored route and Begin Again`);
    assert(errors.length === 0, `${route.id} positive console errors: ${errors.join(" | ")}`);
  } finally { await context.close(); }
}

async function runAuthoredRouteNegative(browser, route) {
  const firstStep = route.steps[0];
  const question = questionForRouteStep(firstStep);
  const alternate = question?.answers?.find((answer) => answer.id !== firstStep.selectedAnswerId);
  assert(alternate, `${route.id}: no valid alternate answer exists for negative testing.`);
  const { context, page, errors } = await newPreviewPage(browser);
  try {
    await openReviewRoute(page, route.id);
    await completeAuthoredRoute(page, route, new Map([[firstStep.questionId, alternate.id]]));
    const summary = await page.$eval("[data-preview-b1-summary]", (node) => node.innerText);
    assert(await page.$eval('[data-route-match="false"]', (node) => node.textContent.trim() === "false"), `${route.id}: one-answer divergence did not report false.`);
    const mismatches = await page.$$eval("[data-route-mismatches] li", (nodes) => nodes.map((node) => node.textContent));
    assert(mismatches.length === 1, `${route.id}: expected one exact mismatch, found ${mismatches.length}.`);
    assert(mismatches[0].includes(firstStep.questionId) && mismatches[0].includes(firstStep.selectedAnswerId) && mismatches[0].includes(alternate.id), `${route.id}: mismatch diagnostic omitted the question, expected answer, or actual answer.`);
    assert(summary.includes("This run diverged from the authored review path"), `${route.id}: genuine divergence warning is missing.`);
    assert(!summary.includes(route.routeSupportedDistinction), `${route.id}: route-supported context survived a genuine divergence.`);
    await assertAuthoredState(page, route);
    await beginAgainFromResult(page);
    await assertStorageUnchanged(page, `${route.id} one-answer divergence and Begin Again`);
    assert(errors.length === 0, `${route.id} negative console errors: ${errors.join(" | ")}`);
  } finally { await context.close(); }
}

async function runAllAuthoredRouteTruth(browser) {
  for (const route of reviewRoutes) {
    await runAuthoredRoutePositive(browser, route);
    await runAuthoredRouteNegative(browser, route);
  }
}

async function runMobileLayout(browser) {
  const { context, page, errors } = await newPreviewPage(browser, { width: 390, height: 844 });
  try {
    await startFree(page);
    const rects = await page.$$eval("#answer-grid .answer-card", (nodes) => nodes.map((node) => node.getBoundingClientRect()).map(({ x, y }) => ({ x, y })));
    assert(rects.every((rect) => rect.x === rects[0].x) && new Set(rects.map((rect) => rect.y)).size === rects.length, "Mobile answers did not collapse to one column.");
    assert(errors.length === 0, `Mobile console errors: ${errors.join(" | ")}`);
    await assertStorageUnchanged(page, "Mobile layout");
  } finally { await context.close(); }
}

const server = staticServer();
await new Promise((resolve) => server.listen(port, host, resolve));
const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] });
try {
  await runAdaptiveA(browser);
  await runAdaptiveB(browser);
  await runEsperAndParity(browser);
  await runColorlessTruth(browser);
  await runAllAuthoredRouteTruth(browser);
  await runMobileLayout(browser);
  console.log("VM-551 Gate B1 production-fidelity browser validation: PASS");
  console.log("Adaptive: visible-recovery-growth -> C09; visible-burst-pressure -> C07.");
  console.log("Truth: Esper and Colorless summaries derive from selected answers; bounded states remain bounded.");
  console.log(`Authored routes: ${reviewRoutes.length} exact paths and ${reviewRoutes.length} one-answer divergences passed with per-step diagnostics and unchanged result states.`);
  console.log("Parity: named preview dossier matches production section/DOM contracts; intentional section omissions: none.");
  console.log("Storage: vm_last_result, vm_profile, and all pre-existing localStorage keys/values remained byte-identical in every preview case.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

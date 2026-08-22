import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

import {
  buildCommanderDossier,
} from "../../assets/js/archscry/dossier/reading.js";

import {
  isArchscryDevReviewLocation,
} from "../../assets/js/archscry/runtime/dev-review-gate.js";

const root = process.cwd();
const host = "127.0.0.1";
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const identityLayers = JSON.parse(fs.readFileSync(path.join(root, "data", "identity-layers.json"), "utf8"));
const placementModel = JSON.parse(fs.readFileSync(path.join(root, "data", "gate-b1-placement-model.json"), "utf8"));
const reviewManifest = JSON.parse(fs.readFileSync(path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "visual-review-manifest.json"), "utf8"));
const livePlacementWitnesses = JSON.parse(fs.readFileSync(path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"), "utf8"));
const jundClose = reviewManifest.cases.find((entry) => entry.case_id === "identity-jund");
const savedWhitePlacement = livePlacementWitnesses.rows.find((entry) => entry.identity_key === "W")?.result;
const activeIdentities = Object.entries(identityLayers.expressions)
  .filter(([, expression]) => expression?.active !== false)
  .map(([key]) => key);

assert.equal(isArchscryDevReviewLocation({ protocol: "http:", hostname: "localhost", search: "?vm-dev-review=1" }), true);
assert.equal(isArchscryDevReviewLocation({ protocol: "https:", hostname: "127.0.0.1", search: "?vm-dev-review=1" }), true);
assert.equal(isArchscryDevReviewLocation({ protocol: "http:", hostname: "::1", search: "?vm-dev-review=1" }), true);
assert.equal(isArchscryDevReviewLocation({ protocol: "http:", hostname: "localhost", search: "" }), false);
assert.equal(isArchscryDevReviewLocation({ protocol: "file:", hostname: "", search: "?vm-dev-review=1" }), false);
assert.equal(isArchscryDevReviewLocation({ protocol: "https:", hostname: "voxmana.test", search: "?vm-dev-review=1" }), false);

assert.equal(activeIdentities.length, 37, "authoritative active identity registry must currently expose 37 entries");
assert.deepEqual(new Set(activeIdentities), new Set(Object.keys(factions)), "direct review authority must align with current faction records");
for (const identityKey of activeIdentities) {
  const dossier = buildCommanderDossier({
    factions,
    placementModel,
    identityKey,
  });
  assert.equal(dossier.mode, "identity-review", `${identityKey} must use the existing composer's direct-review contract`);
  assert.equal(dossier.targetFactionKey, identityKey, `${identityKey} direct review resolved the wrong identity`);
  assert.equal(dossier.readingOmens.length, 0, `${identityKey} direct review fabricated answer observations`);
  assert.equal(dossier.resultSummaryStrip, null, `${identityKey} direct review fabricated a placement summary`);
  assert.equal(dossier.adjacentFits.length, 0, `${identityKey} direct review fabricated placement alternatives`);
  assert.doesNotMatch(JSON.stringify(dossier.commanderLane), /saved starter preference/i, `${identityKey} direct review fabricated a saved starter profile`);
}
assert.throws(
  () => buildCommanderDossier({ factions, placementModel }),
  /placementResult or identityKey/,
  "normal composer misuse must still fail closed"
);

assert.ok(jundClose, "focused boundary journey requires the current Jund close witness");
assert.equal(jundClose.expected_state, "close");
assert.equal(savedWhitePlacement?.faction, "W", "state-preservation coverage requires a certified saved White placement");
const normalWhiteDossier = buildCommanderDossier({
  factions,
  placementModel,
  placementResult: savedWhitePlacement,
});
assert.equal(normalWhiteDossier.mode, "primary", "normal placement dossiers must retain their production mode");
assert.ok(normalWhiteDossier.resultSummaryStrip, "normal placement dossiers must retain their placement summary");
assert.match(JSON.stringify(normalWhiteDossier.commanderLane), /saved starter preference/i, "normal placement dossiers must retain saved starter context");

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
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
assert.ok(browserCandidates.length, "focused dev-review browser test requires Edge or LIGHTHOUSE_CHROME_PATH");

let launchedChrome;
let browser;
try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: browserCandidates[0],
    chromeFlags: [
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--host-resolver-rules=MAP voxmana.test 127.0.0.1",
    ],
    logLevel: "silent",
  });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launchedChrome.port}` });

  async function newPage(url, { savedPlacement = null, errors = null } = {}) {
    const page = await browser.newPage();
    if (errors) page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument((placement) => {
      globalThis.__vmVisualRegressionDisableCardArt = true;
      if (placement && new URLSearchParams(location.search).get("vm-dev-review") === "1") {
        sessionStorage.setItem("vm_last_result", JSON.stringify(placement));
        sessionStorage.setItem("vm_profile", JSON.stringify({ sentinel: "vm579-profile" }));
        localStorage.setItem("vm_archscry_maze_handoff_v1", JSON.stringify({ sentinel: "vm579-maze" }));
        localStorage.setItem("vm579-owner-state", "preserve-me");
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
    }, savedPlacement);
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (request.url().startsWith(`http://${host}:${port}`) || request.url().startsWith(`http://voxmana.test:${port}`)) request.continue();
      else request.abort();
    });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    return page;
  }

  const unflagged = await newPage(`http://${host}:${port}/archscry/`);
  assert.equal(await unflagged.$("[data-vm-dev-review]"), null, "unflagged local Archscry must remain unchanged");
  await unflagged.close();

  const nonlocal = await newPage(`http://voxmana.test:${port}/archscry/?vm-dev-review=1`);
  assert.equal(await nonlocal.$("[data-vm-dev-review]"), null, "production-style host must remain inert even with the flag");
  await nonlocal.close();

  const pageErrors = [];
  const page = await newPage(`http://${host}:${port}/archscry/?vm-dev-review=1&vox_telemetry=mock`, {
    savedPlacement: savedWhitePlacement,
    errors: pageErrors,
  });
  await page.waitForSelector("[data-vm-dev-review]", { timeout: 15000 });
  assert.equal(await page.$$eval("[data-dev-review-identity] option", (options) => options.length), 37);
  assert.equal(await page.evaluate(() => window.__VOX_TELEMETRY_EVENTS__?.length), 0);
  const storageBaseline = await page.evaluate(() => ({
    session: Object.fromEntries(Object.entries(sessionStorage)),
    local: Object.fromEntries(Object.entries(localStorage)),
  }));

  for (const identityKey of activeIdentities) {
    await page.select("[data-dev-review-identity]", identityKey);
    await page.click("[data-dev-review-render]");
    await page.waitForFunction((expected) => (
      document.querySelector("[data-dossier-console][data-direct-review='true']")?.dataset.dossierIdentityKey === expected
    ), {}, identityKey);
    const rendered = await page.evaluate(() => ({
      label: document.querySelector(".guild-banner[data-direct-review='true'] .guild-eyebrow")?.textContent?.trim(),
      placementPanels: document.querySelectorAll("[data-dossier-panel='placement']").length,
      resultBanners: document.querySelectorAll(".result-state-banner,[data-public-fit-reasons],[data-result-refinement-purpose]").length,
      visibleText: document.getElementById("result-inner")?.innerText || "",
    }));
    assert.equal(rendered.label, "REVIEW MODE — direct identity render", `${identityKey} review label drifted`);
    assert.equal(rendered.placementPanels, 0, `${identityKey} review rendered a placement panel`);
    assert.equal(rendered.resultBanners, 0, `${identityKey} review rendered journey-derived result content`);
    assert.doesNotMatch(rendered.visibleText, /Your answers|Historical saved identity|Current best fit/i, `${identityKey} review fabricated journey language`);
  }

  assert.deepEqual(await page.evaluate(() => ({
    session: Object.fromEntries(Object.entries(sessionStorage)),
    local: Object.fromEntries(Object.entries(localStorage)),
    telemetry: window.__VOX_TELEMETRY_EVENTS__?.length,
  })), {
    ...storageBaseline,
    telemetry: 0,
  }, "direct review must not pollute session, profile, Maze, owner local state, or telemetry");

  assert.equal(await page.evaluate(async () => {
    const { APP_STATE } = await import("/assets/js/archscry/runtime/state.js");
    return APP_STATE.activeResult?.faction;
  }), "W", "direct review must not replace the restored production placement in memory");

  assert.equal(await page.evaluate(async () => {
    const { renderIdentityDossier } = await import("/assets/js/archscry/runtime/dossier-view.js");
    try {
      renderIdentityDossier("NOT_AN_IDENTITY");
      return false;
    } catch {
      return true;
    }
  }), true, "invalid direct-review identity must fail closed");

  await page.goto(`http://${host}:${port}/archscry/`, { waitUntil: "networkidle0", timeout: 30000 });
  await page.waitForSelector("[data-dossier-console]:not([data-direct-review='true'])", { timeout: 15000 });
  assert.equal(await page.$("[data-vm-dev-review]"), null, "normal reload must not initialize the development panel");
  assert.equal(await page.evaluate(async () => {
    const { APP_STATE } = await import("/assets/js/archscry/runtime/state.js");
    return APP_STATE.activeResult?.faction;
  }), "W", "normal reload must restore the original real placement");
  assert.deepEqual(await page.evaluate(() => {
    const handoff = JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "null");
    return {
      savedPlacement: sessionStorage.getItem("vm_last_result"),
      profile: sessionStorage.getItem("vm_profile"),
      ownerState: localStorage.getItem("vm579-owner-state"),
      handoffFaction: handoff?.placementResult?.faction,
    };
  }), {
    savedPlacement: storageBaseline.session.vm_last_result,
    profile: storageBaseline.session.vm_profile,
    ownerState: storageBaseline.local["vm579-owner-state"],
    handoffFaction: "W",
  }, "normal reload after direct review must restore the exact saved placement without disturbing profile or owner state");
  await page.close();

  const enginePageErrors = [];
  const enginePage = await newPage(`http://${host}:${port}/archscry/?vm-dev-review=1&vox_telemetry=mock`, {
    errors: enginePageErrors,
  });
  await enginePage.waitForSelector("[data-vm-dev-review]", { timeout: 15000 });

  await enginePage.select("[data-dev-review-identity]", "UB");
  await enginePage.click("[data-dev-review-render]");
  await enginePage.click("[data-dev-review-mode='engine']");
  await enginePage.click("[data-dev-engine-start]");

  for (const selection of jundClose.selections) {
    const question = Object.values(placementModel.question_bank).flat().find((entry) => entry.id === selection.question_id);
    assert.ok(question, `missing witness question ${selection.question_id}`);
    try {
      await enginePage.waitForFunction((questionId, prompt) => {
        const snapshot = JSON.parse(document.querySelector("[data-dev-engine-inspector]")?.textContent || "{}");
        const questionCard = document.getElementById("question-card");
        return snapshot.currentQuestion?.id === questionId &&
          !questionCard?.classList.contains("hidden") &&
          document.getElementById("question-title")?.textContent?.trim() === prompt;
      }, { timeout: 10000 }, selection.question_id, question.prompt);
    } catch (_) {
      const liveQuestion = await enginePage.evaluate(() => ({
        inspector: document.querySelector("[data-dev-engine-inspector]")?.textContent || "",
        prompt: document.getElementById("question-title")?.textContent?.trim() || "",
      }));
      assert.fail(`engine inspector did not expose ${selection.question_id}: ${JSON.stringify(liveQuestion)}`);
    }
    const answerIndex = question.answers.findIndex((answer) => answer.id === selection.answer_id);
    assert.ok(answerIndex >= 0, `missing witness answer ${selection.answer_id}`);
    await enginePage.click(`[data-action='answer-quick-question'][data-answer-index='${answerIndex}']`);
    const transitionVisible = await enginePage.$eval("#quick-transition", (node) => !node.classList.contains("hidden"));
    if (transitionVisible) await enginePage.click("[data-action='continue-quick-transition']");
  }

  await enginePage.waitForFunction(() => {
    const snapshot = JSON.parse(document.querySelector("[data-dev-engine-inspector]")?.textContent || "{}");
    return snapshot.finalResult?.faction === "JUND";
  });
  const engineSnapshot = await enginePage.$eval("[data-dev-engine-inspector]", (node) => JSON.parse(node.textContent));
  assert.equal(engineSnapshot.finalResult.faction, "JUND", "direct-review Dimir selection leaked into the real engine result");
  assert.equal(engineSnapshot.stopping.state, "close");
  assert.ok(engineSnapshot.evidenceLedger.length >= jundClose.selections.length);
  assert.ok(engineSnapshot.candidates.length >= 2);
  assert.equal(typeof engineSnapshot.candidates[0].qualified, "boolean");
  assert.equal(typeof engineSnapshot.candidates[0].qualification.approved_naming_rule, "boolean");
  assert.ok(engineSnapshot.refinement, "close journey must expose the real refinement state");
  assert.ok((await enginePage.evaluate(() => window.__VOX_TELEMETRY_EVENTS__?.length)) > 0, "real production questionnaire must retain telemetry behavior in explicit mock mode");

  await enginePage.click("[data-dev-review-mode='dossier']");
  await enginePage.select("[data-dev-review-identity]", "GRIXIS");
  await enginePage.click("[data-dev-review-render]");
  const reverseIsolation = await enginePage.evaluate(async () => {
    const { APP_STATE } = await import("/assets/js/archscry/runtime/state.js");
    return {
      retainedEngineResult: APP_STATE.activeResult?.faction,
      renderedIdentity: document.querySelector("[data-dossier-console][data-direct-review='true']")?.dataset.dossierIdentityKey,
      journeyClaims: document.querySelectorAll(".result-state-banner,[data-public-fit-reasons],[data-result-refinement-purpose]").length,
    };
  });
  assert.deepEqual(reverseIsolation, {
    retainedEngineResult: "JUND",
    renderedIdentity: "GRIXIS",
    journeyClaims: 0,
  }, "engine result and direct dossier selection must remain semantically isolated");
  assert.deepEqual(pageErrors, [], `dev-review browser errors: ${pageErrors.join(" | ")}`);
  assert.deepEqual(enginePageErrors, [], `engine-validation browser errors: ${enginePageErrors.join(" | ")}`);
  await enginePage.close();
} finally {
  if (browser) await browser.close().catch(() => {});
  if (launchedChrome) {
    try {
      await launchedChrome.kill();
    } catch (_) {}
  }
  await new Promise((resolve) => server.close(resolve));
}

const devReviewSource = fs.readFileSync(path.join(root, "assets", "js", "archscry", "runtime", "dev-review.js"), "utf8");
assert.doesNotMatch(devReviewSource, /targetIdentity|forcedWinner|preferredIdentity|expectedIdentity/i, "Engine Validation must have no target-identity seam");
assert.match(devReviewSource, /startQuickFlow\(\)/, "Engine Validation must invoke the production questionnaire path");
assert.match(devReviewSource, /rankCandidates\(state, model\)/, "inspector must reuse production ranking");
assert.match(devReviewSource, /getNamingQualification\(candidate, model\)/, "inspector must reuse production qualification");
assert.match(devReviewSource, /evaluateStopping\(state, model, ranked\)/, "inspector must reuse production stopping");

console.log("Archscry dev-review gating, all-37 direct rendering, isolation, and real-engine validation tests passed.");

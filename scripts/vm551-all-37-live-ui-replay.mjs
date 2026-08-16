import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { stat } from "node:fs/promises";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

import { finalizeReading, replaySelections } from "../assets/js/gate-b1-placement-engine.js";
import { withGateAPublicState } from "../assets/js/archscry-presentation.js";

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
const vm558ReviewMode = process.argv.includes("--vm558-review");
const reviewCheckMode = process.argv.includes("--review-check");
const reviewMode = process.argv.includes("--review") || vm558ReviewMode;
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
const vm558ReviewIdentityKeys = new Set(["DUNE", "WITCH", "WUBRG", "YORE"]);
if (vm558ReviewMode) {
  assert.ok(identityFilter, "VM-558 owner review requires --identity");
  assert.ok(vm558ReviewIdentityKeys.has(identityFilter), `VM-558 owner review does not define ${identityFilter}`);
  assert.ok(!caseFilter, "VM-558 owner review uses certified identity witnesses, not general review cases");
}
const model = JSON.parse(fs.readFileSync(path.join(root, "data", "gate-b1-placement-model.json"), "utf8"));
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const cardVoiceCatalog = JSON.parse(fs.readFileSync(path.join(root, "data", "dossier", "card-voice-catalog.json"), "utf8"));
const cardVoicePrintings = JSON.parse(fs.readFileSync(path.join(root, "data", "dossier", "card-voice-printings.source.json"), "utf8"));
const cardRationaleCatalog = JSON.parse(fs.readFileSync(path.join(root, "data", "dossier", "card-rationale-catalog.json"), "utf8"));
const scryfallFlavorIndex = JSON.parse(fs.readFileSync(path.join(root, "data", "scryfall", "indexes", "card-flavor-index.json"), "utf8"));
const questions = Object.values(model.question_bank).flatMap((rows) => Array.isArray(rows) ? rows : []);
const questionById = new Map(questions.map((question) => [question.id, question]));
const mime = new Map([[".html", "text/html"], [".js", "text/javascript"], [".css", "text/css"], [".json", "application/json"], [".svg", "image/svg+xml"], [".png", "image/png"], [".jpg", "image/jpeg"], [".woff2", "font/woff2"]]);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const transparentPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
const vm558ArtFixtureDirectory = path.join(root, "docs", "audits", "vm558-card-voice-owner-review", "art-fixtures");
const normalizeCopy = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const copyOverlap = (left, right) => {
  const leftTokens = new Set(normalizeCopy(left).split(" ").filter((token) => token.length > 2));
  const rightTokens = new Set(normalizeCopy(right).split(" ").filter((token) => token.length > 2));
  const denominator = Math.min(leftTokens.size, rightTokens.size);
  return denominator ? [...leftTokens].filter((token) => rightTokens.has(token)).length / denominator : 0;
};

const normalizeCardName = (value) => String(value || "").normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
const indexedCardByScryfallId = new Map((scryfallFlavorIndex.cards || []).map((card) => [card.scryfall_id, card]));
const vm558PrintingIds = new Set(vm558ReviewMode
  ? cardVoiceCatalog.records
      .filter((record) => vm558ReviewIdentityKeys.has(record.identity_key))
      .map((record) => record.card?.scryfall_id)
      .filter(Boolean)
  : []);
const vm558RawCardByName = new Map();
const vm558ArtFixtureByUrl = new Map();
if (vm558ReviewMode) {
  const rawCards = JSON.parse(fs.readFileSync(path.join(root, "data", "scryfall", "raw", "oracle-cards.json"), "utf8"));
  for (const card of rawCards) {
    if (!vm558PrintingIds.has(card.id)) continue;
    vm558RawCardByName.set(normalizeCardName(card.name), card);
    for (const face of card.card_faces || []) vm558RawCardByName.set(normalizeCardName(face.name), card);
  }
  assert.equal(vm558RawCardByName.size >= vm558PrintingIds.size, true, "Committed Scryfall records do not cover the VM-558 review cards");
  const manifest = JSON.parse(fs.readFileSync(path.join(vm558ArtFixtureDirectory, "manifest.json"), "utf8"));
  for (const record of manifest.records || []) {
    assert.ok(vm558PrintingIds.has(record.scryfall_id), `Unexpected printing ${record.scryfall_id} in VM-558 art fixtures`);
    for (const variant of Object.values(record.images || {})) {
      const fixture = path.join(vm558ArtFixtureDirectory, variant.file);
      const body = fs.readFileSync(fixture);
      assert.equal(createHash("sha256").update(body).digest("hex"), variant.sha256, `VM-558 art fixture checksum drifted for ${variant.file}`);
      vm558ArtFixtureByUrl.set(variant.source_url, body);
    }
  }
  assert.equal(vm558ArtFixtureByUrl.size, vm558PrintingIds.size * 2, "VM-558 exact art fixture inventory is incomplete");
}

function vm558ReviewCards(identityKey) {
  const records = cardVoiceCatalog.records
    .filter((record) => record.identity_key === identityKey)
    .sort((left, right) => Number(left.slot) - Number(right.slot));
  assert.equal(records.length, 2, `${identityKey} must expose exactly two approved Sound cards for VM-558 review`);
  assert.deepEqual(records.map((record) => record.slot), [1, 2], `${identityKey} VM-558 review slots drifted`);
  return records.map((record) => {
    const printing = cardVoicePrintings.records.find((candidate) => candidate.relationship_id === record.relationship_id);
    assert.ok(printing, `${identityKey} ${record.card.name} lacks exact printing authority`);
    assert.equal(printing.scryfall_id, record.card.scryfall_id, `${identityKey} ${record.card.name} printing id drifted`);
    const indexed = indexedCardByScryfallId.get(printing.scryfall_id) || {};
    const merged = {
      ...indexed,
      ...printing,
      image_uris: { ...(indexed.image_uris || {}), ...(printing.image_uris || {}) },
      card_faces: printing.card_faces?.length ? printing.card_faces : indexed.card_faces || [],
    };
    const tileImage = merged.image_uris?.art_crop || merged.image_uris?.normal || merged.card_faces?.[0]?.image_uris?.art_crop || merged.card_faces?.[0]?.image_uris?.normal || "";
    const modalCard = vm558RawCardByName.get(normalizeCardName(record.card.name));
    assert.ok(tileImage && vm558ArtFixtureByUrl.has(tileImage), `${identityKey} ${record.card.name} lacks exact review art`);
    assert.equal(modalCard?.id, printing.scryfall_id, `${identityKey} ${record.card.name} lacks committed exact modal detail`);
    return { record, printing, tileImage, modalCard };
  });
}

function vm558ArtFixtureForUrl(url) {
  return vm558ReviewMode ? vm558ArtFixtureByUrl.get(String(url)) || null : null;
}

function vm558YorePresentationFixture(result) {
  assert.equal(result.result_state, "insufficient", "Yore bounded placement state drifted before presentation review");
  assert.equal(result.faction, "UB", "Yore bounded witness direction drifted before presentation review");
  const faction = factions.YORE;
  const candidate = (result.internal_candidate_order || []).find((entry) => entry.identity === "YORE");
  assert.ok(faction && candidate, "Yore presentation fixture cannot be grounded in the certified witness and faction record");
  return {
    ...result,
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
    model_kind: "vm558-review-presentation-fixture",
    vm558_review_context: {
      purpose: "approved-card-voice-presentation-only",
      placement_contract: "INTENTIONAL_BOUNDED_STATE",
      source_result_state: result.result_state,
      source_faction: result.faction,
    },
  };
}

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

async function reviewVm558CardVoiceSurface(page, witness, cardArtState, consoleErrors) {
  const expectedCards = vm558ReviewCards(witness.identity_key);
  assert.equal(cardArtState.state, "not-requested", `${witness.identity_key} VM-558 review started the unrelated dossier-art resolver`);
  assert.deepEqual(cardArtState.unavailable, [], `${witness.identity_key} VM-558 review inherited unrelated unavailable-art state`);

  if (witness.identity_key === "YORE") {
    const context = await page.evaluate(() => JSON.parse(sessionStorage.getItem("vm_last_result") || "null")?.vm558_review_context || null);
    assert.deepEqual(context, {
      purpose: "approved-card-voice-presentation-only",
      placement_contract: "INTENTIONAL_BOUNDED_STATE",
      source_result_state: "insufficient",
      source_faction: "UB",
    }, "Yore review fixture lost its bounded placement context");
    await page.evaluate(() => {
      const result = document.getElementById("result-inner");
      if (!result || document.querySelector("[data-vm558-review-context]")) return;
      const notice = document.createElement("div");
      notice.dataset.vm558ReviewContext = "yore-presentation-only";
      notice.setAttribute("role", "note");
      notice.textContent = "VM-558 presentation fixture: Yore remains an intentionally bounded placement. This view opens only its approved card-voice dossier surface.";
      Object.assign(notice.style, {
        margin: "0 0 1rem",
        padding: "0.8rem 1rem",
        border: "1px solid rgba(214, 183, 104, 0.45)",
        borderRadius: "0.7rem",
        background: "rgba(12, 14, 18, 0.96)",
        color: "#e5cf92",
        font: "600 0.82rem/1.45 system-ui, sans-serif",
      });
      result.prepend(notice);
    });
  }

  const voicePanel = await page.$eval("[data-card-voice-section]", (section) => section.closest("[data-dossier-panel]")?.getAttribute("data-dossier-panel") || "");
  if (voicePanel) {
    const tab = await page.$(`[data-dossier-tab="${voicePanel}"]`);
    if (tab) await tab.evaluate((button) => button.click());
    await page.waitForFunction((panelId) => document.querySelector(`[data-dossier-panel="${panelId}"]`)?.hidden === false, {}, voicePanel);
  }
  await page.$eval("[data-card-voice-section]", (section) => section.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" }));
  await page.waitForFunction(() => [...document.querySelectorAll("[data-card-voice-section] .vm-card-voice-image")]
    .every((image) => image.complete && image.naturalWidth > 0), { timeout: 30000 });

  const rendered = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("[data-card-voice-section] .vm-card-voice-card")];
    const rect = (node) => {
      const box = node.getBoundingClientRect();
      return { top: box.top, left: box.left, right: box.right, bottom: box.bottom, width: box.width, height: box.height };
    };
    return {
      identityKey: document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") || "",
      identityName: document.querySelector(".guild-name")?.textContent?.trim() || "",
      notice: document.querySelector("[data-vm558-review-context]")?.textContent?.trim() || "",
      cards: cards.map((card) => ({
        name: card.querySelector(".flavor-echo-name")?.textContent?.trim() || "",
        image: card.querySelector(".vm-card-voice-image")?.getAttribute("src") || "",
        provenance: JSON.parse(card.getAttribute("data-card-voice-provenance") || "{}"),
        rect: rect(card),
      })),
      grid: rect(document.querySelector("[data-card-voice-section] .flavor-echo-grid")),
      documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      viewportWidth: window.innerWidth,
    };
  });
  assert.equal(rendered.identityKey, witness.identity_key, `${witness.identity_key} review opened the wrong dossier focus`);
  assert.deepEqual(rendered.cards.map((card) => card.name), expectedCards.map(({ record }) => record.card.name), `${witness.identity_key} approved card pair drifted`);
  assert.deepEqual(rendered.cards.map((card) => card.provenance.printing_id), expectedCards.map(({ printing }) => printing.scryfall_id), `${witness.identity_key} exact printing provenance drifted`);
  assert.deepEqual(rendered.cards.map((card) => card.image), expectedCards.map(({ tileImage }) => tileImage), `${witness.identity_key} exact card art drifted`);
  assert.equal(rendered.documentOverflow, false, `${witness.identity_key} VM-558 review surface overflowed the viewport`);
  assert.ok(rendered.grid.left >= -1 && rendered.grid.right <= rendered.viewportWidth + 1, `${witness.identity_key} card grid escaped the viewport`);
  if (viewport.width <= 700) assert.ok(rendered.cards[1].rect.top > rendered.cards[0].rect.bottom - 1, `${witness.identity_key} mobile pair did not stack`);
  else assert.ok(rendered.cards[1].rect.left > rendered.cards[0].rect.left && Math.abs(rendered.cards[1].rect.top - rendered.cards[0].rect.top) < 2, `${witness.identity_key} desktop pair did not form two complementary columns`);
  if (witness.identity_key === "YORE") assert.match(rendered.notice, /intentionally bounded placement/i, "Yore presentation review did not disclose its bounded placement semantics");

  const modalAudits = [];
  for (let index = 0; index < expectedCards.length; index += 1) {
    const triggers = await page.$$("[data-card-voice-section] .flavor-echo-image-trigger");
    assert.equal(triggers.length, 2, `${witness.identity_key} card-voice modal triggers drifted`);
    await triggers[index].evaluate((button) => button.click());
    await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 15000 });
    const modal = await page.evaluate(() => ({
      card: document.querySelector(".archscry-card-dialog[open] h2")?.textContent?.trim() || "",
      image: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-image")?.getAttribute("src") || "",
      context: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context span")?.textContent?.trim() || "",
      contextKind: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context")?.getAttribute("data-card-identity-context") || "",
      hasOracleBlock: Boolean(document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-rules")),
    }));
    const expected = expectedCards[index];
    const modalImage = expected.modalCard.image_uris?.normal || expected.modalCard.card_faces?.[0]?.image_uris?.normal || "";
    assert.ok(vm558ArtFixtureByUrl.has(modalImage), `${witness.identity_key} ${expected.record.card.name} lacks exact modal art fixture`);
    assert.equal(modal.card, expected.modalCard.name, `${witness.identity_key} modal opened the wrong exact card`);
    assert.equal(modal.image, modalImage, `${witness.identity_key} modal art drifted from the exact printing`);
    assert.equal(modal.context, expected.record.modal_explanation, `${witness.identity_key} modal teaching explanation drifted`);
    assert.equal(modal.contextKind, "voice", `${witness.identity_key} modal lost Sound-versus-Play isolation`);
    assert.equal(modal.hasOracleBlock, false, `${witness.identity_key} voice modal repeated Oracle rules text`);
    modalAudits.push(modal);
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector(".archscry-card-dialog")?.open);
    await delay(50);
    assert.equal(await page.evaluate((triggerIndex) => document.activeElement === document.querySelectorAll("[data-card-voice-section] .flavor-echo-image-trigger")[triggerIndex], index), true, `${witness.identity_key} modal did not restore focus`);
  }
  const expectedPlayCardNames = {
    DUNE: "Saskia the Unyielding",
    WITCH: "Atraxa, Praetors' Voice",
    WUBRG: "Ulalek, Fused Atrocity",
    YORE: "Breya, Etherium Shaper",
  };
  const expectedPlayRecord = cardRationaleCatalog.records.find((record) => record.identity_key === witness.identity_key && record.card?.name === expectedPlayCardNames[witness.identity_key]);
  assert.ok(expectedPlayRecord, `${witness.identity_key} lacks its expected approved play-card record`);
  const playTrigger = await page.$(`[data-card-rationale-section] .flavor-echo-image-trigger[data-card-name="${expectedPlayRecord.card.name}"]`);
  assert.ok(playTrigger, `${witness.identity_key} did not render ${expectedPlayRecord.card.name}`);
  const playPanel = await playTrigger.evaluate((node) => node.closest("[data-dossier-panel]")?.getAttribute("data-dossier-panel") || "");
  if (playPanel) {
    const tab = await page.$(`[data-dossier-tab="${playPanel}"]`);
    if (tab) await tab.evaluate((button) => button.click());
    await page.waitForFunction((panelId) => document.querySelector(`[data-dossier-panel="${panelId}"]`)?.hidden === false, {}, playPanel);
  }
  const playTile = await playTrigger.evaluate((node) => node.closest(".flavor-echo-card")?.querySelector(".flavor-echo-why")?.textContent?.trim() || "");
  await playTrigger.evaluate((button) => button.click());
  await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 15000 });
  const playModal = await page.evaluate(() => ({
    card: document.querySelector(".archscry-card-dialog[open] h2")?.textContent?.trim() || "",
    context: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context span")?.textContent?.trim() || "",
    contextKind: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context")?.getAttribute("data-card-identity-context") || "",
    heading: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context strong")?.textContent?.trim() || "",
    hasOracleBlock: Boolean(document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-rules")),
  }));
  assert.equal(playModal.card, expectedPlayRecord.card.name, `${witness.identity_key} opened the wrong play card`);
  assert.equal(playModal.context, expectedPlayRecord.modal_explanation, `${witness.identity_key} rendered stale play-modal copy`);
  assert.equal(normalizeCopy(playModal.context).includes(normalizeCopy(playTile)), false, `${witness.identity_key} play modal retained the complete normalized tile rationale`);
  assert.equal(playModal.contextKind, "play", `${witness.identity_key} play modal lost Sound-versus-Play isolation`);
  assert.match(playModal.heading, /^Why .+ helps explain .+ in play$/);
  assert.equal(playModal.hasOracleBlock, false, `${witness.identity_key} play modal repeated Oracle rules text`);
  const rationaleModalAudit = { card: playModal.card, tile: playTile, context_heading: playModal.heading, context: playModal.context };
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector(".archscry-card-dialog")?.open);
  await delay(50);
  assert.equal(await playTrigger.evaluate((node) => document.activeElement === node), true, `${witness.identity_key} play modal did not restore focus`);
  await page.$eval("[data-card-voice-section]", (section) => section.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" }));
  assert.deepEqual(consoleErrors.filter((message) => !/favicon|ERR_FAILED|Failed to load resource/i.test(message)), []);
  return {
    identity_key: witness.identity_key,
    state: "vm558-owner-review",
    guildName: rendered.identityName,
    voiceCount: rendered.cards.length,
    exactPrintingIds: rendered.cards.map((card) => card.provenance.printing_id),
    modalAudits,
    rationaleModalAudit,
    boundedPlacementPreserved: witness.identity_key === "YORE",
    documentOverflow: rendered.documentOverflow,
    console_errors: consoleErrors.filter((message) => !/favicon|ERR_BLOCKED_BY_CLIENT/i.test(message)),
  };
}

async function replay(page, origin, witness) {
  const certifiedResult = withGateAPublicState({
    result: finalizeReading({ state: replaySelections(model, witness.selections), model, factions }),
    placementModel: model,
    factions,
  });
  if (vm558ReviewMode && witness.identity_key !== "YORE") {
    assert.equal(certifiedResult.faction, witness.identity_key, `${witness.identity_key} certified review witness no longer opens its identity`);
    assert.ok(["primary", "close", "tied"].includes(certifiedResult.result_state), `${witness.identity_key} certified review witness is no longer named`);
  }
  const preloadedResult = vm558ReviewMode
    ? witness.identity_key === "YORE" ? vm558YorePresentationFixture(certifiedResult) : certifiedResult
    : witness.preload_saved_result
      ? certifiedResult
      : null;
  await page.evaluateOnNewDocument((enableDesktopHover, cachedResult, lockReviewInput, disableAncillaryCardArt) => {
    localStorage.clear();
    sessionStorage.clear();
    if (cachedResult) sessionStorage.setItem("vm_last_result", JSON.stringify(cachedResult));
    if (disableAncillaryCardArt) window.__vmVisualRegressionDisableCardArt = true;
    window.supabase = { createClient: () => ({ auth: { getSession: async () => ({ data: { session: null }, error: null }) } }) };
    if (lockReviewInput) {
      document.addEventListener("DOMContentLoaded", () => {
        const guard = document.createElement("div");
        guard.id = "vm-review-preparing";
        guard.setAttribute("role", "status");
        guard.textContent = "Preparing deterministic review...";
        Object.assign(guard.style, {
          position: "fixed",
          inset: "0",
          zIndex: "2147483647",
          display: "grid",
          placeItems: "center",
          background: "#07090d",
          color: "#d6b768",
          font: "600 16px/1.4 system-ui, sans-serif",
          letterSpacing: "0.08em",
        });
        document.documentElement.append(guard);
      }, { once: true });
    }
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
  }, viewportName === "desktop", preloadedResult, reviewMode, vm558ReviewMode);
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  const initialFocus = String(witness.initial_focus_identity_key || "").trim();
  const reviewUrl = `${origin}/archscry/${initialFocus ? `?view=${encodeURIComponent(initialFocus)}` : ""}`;
  await page.goto(reviewUrl, { waitUntil: "networkidle0", timeout: 30000 });
  if (!preloadedResult) {
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
  }

  let previousReadingSnapshot = null;
  for (let index = 0; !preloadedResult && index < witness.selections.length; index += 1) {
    const selection = witness.selections[index];
    const question = questionById.get(selection.question_id);
    assert.ok(question, `${witness.identity_key} missing question ${selection.question_id}`);
    if (selection.refinement) {
      await page.waitForSelector('[data-action="start-result-refinement"]', { visible: true, timeout: 15000 });
      if (witness.verify_return_to_previous_reading) {
        previousReadingSnapshot = await page.evaluate(() => JSON.parse(sessionStorage.getItem("vm_last_result") || "null"));
        assert.ok(previousReadingSnapshot?.evidence_ledger || previousReadingSnapshot?.evidence_trail, "refinement regression could not capture the prior evidence ledger");
      }
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
  let returnToPreviousReadingVerified = false;
  if (witness.verify_return_to_previous_reading) {
    await page.waitForSelector('[data-action="return-to-previous-reading"]', { visible: true, timeout: 15000 });
    await page.$eval('[data-action="return-to-previous-reading"]', (button) => button.click());
    await page.waitForSelector("#result:not(.hidden)", { timeout: 15000 });
    const restored = await page.evaluate(() => JSON.parse(sessionStorage.getItem("vm_last_result") || "null"));
    const comparable = (result) => ({
      faction: result?.faction || null,
      result_state: result?.result_state || null,
      top_matches: result?.top_matches || [],
      evidence_ledger: result?.evidence_ledger || result?.evidence_trail || [],
    });
    assert.deepEqual(comparable(restored), comparable(previousReadingSnapshot), "one-step return did not restore the exact prior reading and evidence ledger");
    assert.equal(await page.$('[data-action="return-to-previous-reading"]'), null, "one-step return retained a history-stack action");
    returnToPreviousReadingVerified = true;
  }
  const cardArtState = await page.$eval("#result-inner", (node) => ({
    state: node.dataset.cardArtState || "not-requested",
    unavailable: [...node.querySelectorAll(".is-unavailable[data-card-art-name]")]
      .map((slot) => slot.getAttribute("data-card-art-name"))
      .filter(Boolean),
  }));
  if (vm558ReviewMode) return reviewVm558CardVoiceSurface(page, witness, cardArtState, consoleErrors);
  let rationaleModalAudit = null;
  let voiceModalAudit = null;
  if (witness.expected_public_contract === "NAMED_DOSSIER") {
    assert.equal(cardArtState.state, "ready", `${witness.identity_key} card-art resolver did not complete`);
    if (reviewMode) assert.deepEqual(cardArtState.unavailable, [], `${witness.identity_key} review card art unresolved`);
    const whyTab = await page.$('[data-dossier-tab="why"]');
    if (whyTab) {
      await whyTab.evaluate((button) => button.click());
      await page.waitForFunction(() => document.querySelector('[data-dossier-panel="why"]')?.hidden === false);
    }
    const rationaleSelector = witness.identity_key === "WU"
      ? '[data-card-rationale-section] .flavor-echo-image-trigger[data-card-name="Grand Arbiter Augustin IV"]'
      : '[data-card-rationale-section] .flavor-echo-image-trigger';
    const rationaleTrigger = await page.$(rationaleSelector);
    assert.ok(rationaleTrigger, `${witness.identity_key} has no rationale-card detail trigger`);
    const rationalePanel = await rationaleTrigger.evaluate((node) => node.closest("[data-dossier-panel]")?.getAttribute("data-dossier-panel") || "");
    if (rationalePanel) {
      const rationaleTab = await page.$(`[data-dossier-tab="${rationalePanel}"]`);
      if (rationaleTab) {
        await rationaleTab.evaluate((button) => button.click());
        await page.waitForFunction((panelId) => document.querySelector(`[data-dossier-panel="${panelId}"]`)?.hidden === false, {}, rationalePanel);
      }
    }
    const tileRationale = await rationaleTrigger.evaluate((node) => node.closest(".flavor-echo-card")?.querySelector(".flavor-echo-why")?.textContent?.trim() || "");
    assert.ok(tileRationale, `${witness.identity_key} rationale tile did not explain why the card fits in play`);
    if (viewportName === "desktop" && !reviewMode) {
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
    const modalDetail = await page.evaluate(() => {
      const dialog = document.querySelector(".archscry-card-dialog[open]");
      return {
        hasImage: Boolean(dialog?.querySelector(".archscry-card-dialog-image")),
        typeLine: dialog?.querySelector(".archscry-card-dialog-type")?.textContent?.trim() || "",
        hasOracleBlock: Boolean(dialog?.querySelector(".archscry-card-dialog-rules")),
        hasScryfallAction: Boolean(dialog?.querySelector('.archscry-card-dialog-external[href^="https://scryfall.com/"]')),
        repeatedRationale: Boolean(dialog?.querySelector(".archscry-card-dialog-why")),
        identityContext: dialog?.querySelector(".archscry-card-dialog-identity-context span")?.textContent?.trim() || "",
        identityContextHeading: dialog?.querySelector(".archscry-card-dialog-identity-context strong")?.textContent?.trim() || "",
        manaText: dialog?.querySelector(".archscry-card-dialog-mana")?.textContent?.trim() || "",
        rect: (() => {
          const box = dialog?.getBoundingClientRect();
          return box ? { left: box.left, top: box.top, right: box.right, bottom: box.bottom } : null;
        })(),
      };
    });
    assert.equal(modalDetail.hasImage, true, `${witness.identity_key} detail modal omitted the canonical full-card image`);
    assert.ok(modalDetail.typeLine, `${witness.identity_key} detail modal omitted the canonical type line`);
    assert.equal(modalDetail.hasOracleBlock, false, `${witness.identity_key} identity-linked modal repeated readable Oracle text`);
    assert.equal(modalDetail.hasScryfallAction, true, `${witness.identity_key} detail modal omitted its Scryfall action`);
    assert.equal(modalDetail.repeatedRationale, false, `${witness.identity_key} detail modal repeated the tile rationale as primary content`);
    assert.ok(modalDetail.identityContext, `${witness.identity_key} identity-linked detail modal omitted its approved identity context`);
    assert.match(modalDetail.identityContextHeading, /^Why .+ helps explain .+ in play$/);
    assert.equal(normalizeCopy(modalDetail.identityContext).includes(normalizeCopy(tileRationale)), false, `${witness.identity_key} modal retained the complete normalized tile rationale`);
    assert.ok(modalDetail.rect && modalDetail.rect.left >= 0 && modalDetail.rect.top >= 0 && modalDetail.rect.right <= viewport.width && modalDetail.rect.bottom <= viewport.height, `${witness.identity_key} modal escaped the viewport`);
    assert.doesNotMatch(modalDetail.manaText, /\{[^}]+\}/, `${witness.identity_key} modal exposed raw mana notation: ${modalDetail.manaText}`);
    rationaleModalAudit = {
      card: await rationaleTrigger.evaluate((node) => node.dataset.cardName || node.dataset.cardPreviewName || ""),
      tile: tileRationale,
      context_heading: modalDetail.identityContextHeading,
      context: modalDetail.identityContext,
    };
    if (rationaleModalAudit.card === "Dina, Essence Brewer") {
      assert.match(rationaleModalAudit.context, /^Dina's sacrifice ability asks which creature's power should become life and counters/);
    }
    if (rationaleModalAudit.card === "Grand Arbiter Augustin IV") {
      assert.match(rationaleModalAudit.context, /^The advantage is procedural rather than explosive/);
    }
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector(".archscry-card-dialog")?.open);
    await delay(50);
    const restored = await page.evaluate(() => document.activeElement?.matches?.('[data-card-rationale-section] .flavor-echo-image-trigger') || false);
    assert.equal(restored, true, `${witness.identity_key} modal did not restore focus`);

    if (["WUBRG", "WITHERBLOOM", "WU"].includes(witness.identity_key)) {
      const voiceTrigger = await page.$('[data-card-voice-section] .flavor-echo-image-trigger');
      assert.ok(voiceTrigger, `${witness.identity_key} has no voice-card detail trigger`);
      const voicePanel = await voiceTrigger.evaluate((node) => node.closest("[data-dossier-panel]")?.getAttribute("data-dossier-panel") || "");
      if (voicePanel) {
        const voiceTab = await page.$(`[data-dossier-tab="${voicePanel}"]`);
        if (voiceTab) await voiceTab.evaluate((button) => button.click());
      }
      const voiceTile = await page.$eval('[data-card-voice-section] .flavor-echo-why', (node) => node.textContent?.trim() || "");
      await voiceTrigger.evaluate((button) => button.click());
      await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 15000 });
      const voiceModal = await page.evaluate(() => ({
        card: document.querySelector(".archscry-card-dialog[open] h2")?.textContent?.trim() || "",
        context: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context span")?.textContent?.trim() || "",
        contextHeading: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context strong")?.textContent?.trim() || "",
        contextKind: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-identity-context")?.getAttribute("data-card-identity-context") || "",
        hasOracleBlock: Boolean(document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-rules")),
        manaText: document.querySelector(".archscry-card-dialog[open] .archscry-card-dialog-mana")?.textContent?.trim() || "",
        manaSymbols: [...document.querySelectorAll(".archscry-card-dialog[open] .archscry-card-dialog-mana .ms")].map((node) => node.className),
      }));
      assert.equal(voiceModal.contextKind, "voice");
      assert.match(voiceModal.contextHeading, /^What this card's voice reveals about .+$/);
      assert.equal(voiceModal.hasOracleBlock, false, `${witness.identity_key} voice modal repeated readable Oracle text`);
      assert.ok(voiceModal.context, `${witness.identity_key} voice modal omitted why-it-echoes context`);
      assert.notEqual(normalizeCopy(voiceModal.context), normalizeCopy(voiceTile));
      assert.ok(copyOverlap(voiceModal.context, voiceTile) < 0.8, `${witness.identity_key} voice modal repeated the exact voice as its explanation`);
      assert.doesNotMatch(voiceModal.manaText, /\{[^}]+\}/, `${witness.identity_key} voice modal exposed raw mana notation`);
      voiceModalAudit = { card: voiceModal.card, tile: voiceTile, context: voiceModal.context };
      if (witness.identity_key === "WITHERBLOOM") {
        assert.equal(voiceModal.card, "Blossoming Bogbeast");
        if (voiceModal.manaText) assert.ok(voiceModal.manaSymbols.length, "Blossoming Bogbeast modal did not use shared mana glyphs");
      }
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.querySelector(".archscry-card-dialog")?.open);
      await delay(50);
      assert.equal(await page.evaluate(() => document.activeElement?.matches?.('[data-card-voice-section] .flavor-echo-image-trigger') || false), true, `${witness.identity_key} voice modal did not restore focus`);
    }
  }
  const ui = await page.evaluate(() => {
    const text = document.getElementById("result-inner")?.innerText || "";
    const allResultText = document.getElementById("result-inner")?.textContent || "";
    const cardName = (node) => (node?.getAttribute("data-card-preview-name") || node?.getAttribute("data-card-name") || node?.textContent || "").trim().toLowerCase();
    const groups = {
      precon: [...document.querySelectorAll(".precon-commander-trigger")].map(cardName),
      rationale: [...document.querySelectorAll("[data-card-rationale-section] [data-card-preview-name]")].map(cardName),
      voice: [...document.querySelectorAll("[data-card-voice-section] [data-card-preview-name]")].map(cardName),
      signals: [...document.querySelectorAll(".staples-section .staple-name")].map(cardName),
    };
    const all = Object.values(groups).flat().filter(Boolean);
    const guildName = document.querySelector(".guild-name")?.textContent?.trim() || "";
    const openingNodes = [
      document.querySelector(".guild-banner"),
      document.querySelector('[data-summary-card="where-this-leads"]'),
      document.querySelector('[data-summary-card="play-pattern"]'),
    ].filter(Boolean);
    const wubrgOpeningText = openingNodes.map((node) => node.textContent || "").join("\n");
    const wubrgOpeningIdentityLabels = wubrgOpeningText.match(/\bWUBRG\b/g) || [];
    const wubrgOpeningBareFiveColorTags = [...document.querySelectorAll('[data-summary-card="where-this-leads"] .dossier-snapshot-tag')]
      .map((node) => node.textContent?.trim() || "")
      .filter((value) => /^Five-Color$/i.test(value));
    const normalizeNarrative = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
    const heroNarrative = normalizeNarrative(document.querySelector(".guild-philosophy")?.textContent);
    const loreSummary = normalizeNarrative(document.querySelector(".guild-lore-summary")?.textContent);
    const narrativeSections = [
      ["hero", document.querySelector(".guild-philosophy")?.textContent],
      ["hero-lore", document.querySelector(".guild-lore-summary")?.textContent],
      ["lore", document.querySelector(".vm-lore-line p")?.textContent],
      ["core-tension", document.querySelector(".vm-core-tension p")?.textContent],
      ["play-pattern", document.querySelector('[data-summary-card="play-pattern"] .dossier-snapshot-copy')?.textContent],
    ].map(([label, value]) => [label, normalizeNarrative(value)]).filter(([, value]) => value);
    const nearDuplicateNarratives = [];
    for (let leftIndex = 0; leftIndex < narrativeSections.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < narrativeSections.length; rightIndex += 1) {
        const [leftLabel, left] = narrativeSections[leftIndex];
        const [rightLabel, right] = narrativeSections[rightIndex];
        const leftWords = new Set(left.split(" ").filter((word) => word.length > 2));
        const rightWords = new Set(right.split(" ").filter((word) => word.length > 2));
        const intersection = [...leftWords].filter((word) => rightWords.has(word)).length;
        const union = new Set([...leftWords, ...rightWords]).size;
        if (left === right || left.includes(right) || right.includes(left) || (union && intersection / union >= 0.82)) {
          nearDuplicateNarratives.push(`${leftLabel}:${rightLabel}`);
        }
      }
    }
    return {
      state: guildName ? "named" : document.querySelector("[data-result-state]")?.getAttribute("data-result-state") || "unknown",
      publicResultState: document.querySelector('[data-summary-card="co-leader"]')
        ? "tied"
        : document.querySelector("[data-result-state]")?.getAttribute("data-result-state") || (guildName ? "primary" : "unknown"),
      storedResultState: (() => {
        try { return JSON.parse(sessionStorage.getItem("vm_last_result") || "null")?.result_state || ""; } catch { return ""; }
      })(),
      guildName,
      whyCount: document.querySelectorAll("[data-public-fit-reasons] .omen-card").length,
      whyFitRefinementAvailable: Boolean(document.querySelector('[data-public-fit-reasons] [data-action="start-result-refinement"]')),
      resultRefinementAvailable: Boolean(document.querySelector('[data-action="start-result-refinement"]')),
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
      glossaryRecordIds: [...document.querySelectorAll(".archscry-term-help[data-gloss-record]")].map((node) => node.getAttribute("data-gloss-record")),
      glossaryOutsideApprovedSurfaces: [...document.querySelectorAll(".archscry-term-help[data-gloss-record]")]
        .filter((node) => !node.closest('[data-education-surface="start-here"], [data-education-surface="why-this-fit"], [data-education-surface="test-the-fit"], [data-education-surface="what-to-look-for"]'))
        .map((node) => node.textContent?.trim() || ""),
      basicLandCards: [...document.querySelectorAll("[data-basic-land-cards] .land-name")].map((node) => node.textContent?.trim() || ""),
      duplicateProviderLabels: [...document.querySelectorAll(".service-copy")].filter((node) => {
        const service = node.querySelector(".service-name")?.textContent?.trim().toLowerCase() || "";
        const action = node.querySelector(".service-label")?.textContent?.trim().toLowerCase() || "";
        return service && service === action;
      }).map((node) => node.textContent?.trim() || ""),
      duplicateCards: [...new Set(all.filter((name, index) => all.indexOf(name) !== index))],
      cardGroups: groups,
      internalLeaks: text.match(/\b(?:SIG_|DG_|MAPPING_|naming qualification|mapping hypothesis|bounded observation)\S*/gi) || [],
      auditLanguageLeaks: text.match(/\b(?:Commander support texture|lore-canon proof|approved relationship|approved card-to-identity explanation|source-backed|source-bound|source-bounded|public-surface|guardrail|evidence-required|mapping|routing|taxonomy|bounded interpretation|support-only|support navigation|manually verified|unverified card claims|placement proof|result proof)\b/gi) || [],
      auditLanguageLeakLines: text.split(/\n+/).map((line) => line.trim()).filter((line) => /\b(?:support-only|support navigation|manually verified|unverified card claims|source-bound(?:ed)?|placement proof|result proof)\b/i.test(line)),
      methodologyPhraseLeaks: [
        /playable pattern, not a personality label/gi,
        /controlled expression/gi,
        /strict separation from official-faction/gi,
        /color-legal starting direction/gi,
        /curated or dossier-supported/gi,
        /recorded answers do not prove a deck preference/gi,
        /without adding certainty to the result/gi,
        /unsupported Commander claims/gi,
      ].flatMap((pattern) => text.match(pattern) || []),
      entityLeaks: text.match(/&(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]+);/gi) || [],
      mojibakeLeaks: text.match(/(?:\u00e2\u20ac|\u00c2[\u0080-\u00bf]|\ufffd)/g) || [],
      knownCopyDefects: [
        /volatility Theater/gi,
        /spell magnitide/gi,
        /No&#x20;/gi,
      ].flatMap((pattern) => text.match(pattern) || []),
      literalColorless: text.includes("{C}"),
      literalColorlessNodes: [...document.querySelectorAll("#result-inner *")]
        .filter((node) => [...node.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.textContent.includes("{C}")))
        .map((node) => ({ className: node.className || node.tagName, text: node.textContent.trim() })),
      wubrgLongIdentityLabels: text.match(/Five-Color \/ WUBRG/g) || [],
      wubrgCapitalizedIdentityRefs: text.match(/\bFive-Color\b/g) || [],
      wubrgCatalogTerms: allResultText.match(/\bFive-color matters \/ Domain\b/g) || [],
      wubrgOpeningText,
      wubrgOpeningIdentityLabels,
      wubrgOpeningBareFiveColorTags,
      heroNarrativeDuplicate: Boolean(heroNarrative && loreSummary && (heroNarrative === loreSummary || heroNarrative.includes(loreSummary) || loreSummary.includes(heroNarrative))),
      nearDuplicateNarratives,
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
    assert.equal(new Set(ui.glossaryRecordIds).size, ui.glossaryRecordIds.length, `${witness.identity_key} decorated a glossary record more than once`);
    assert.deepEqual(ui.glossaryOutsideApprovedSurfaces, [], `${witness.identity_key} decorated glossary help outside the approved teaching surfaces`);
    assert.equal(ui.manaNotesPresent, true, `${witness.identity_key} omitted Mana Notes`);
    assert.ok(ui.basicLandCards.length >= 1 && ui.basicLandCards.length <= 5, `${witness.identity_key} Basics cards were not rendered intentionally`);
    assert.deepEqual(ui.duplicateCards, [], `${witness.identity_key} repeated cards across public page roles: ${JSON.stringify(ui.cardGroups)}`);
    assert.deepEqual(ui.auditLanguageLeaks, [], `${witness.identity_key} leaked reviewer or implementation language: ${JSON.stringify(ui.auditLanguageLeakLines)}`);
    assert.deepEqual(ui.duplicateProviderLabels, [], `${witness.identity_key} repeated a provider name inside one action`);
    assert.equal(ui.heroNarrativeDuplicate, false, `${witness.identity_key} repeated its hero thesis in the adjacent lore summary`);
    assert.deepEqual(ui.nearDuplicateNarratives, [], `${witness.identity_key} repeated a narrative across dossier sections`);
  } else {
    assert.notEqual(ui.state, "named", "Yore must retain a bounded public state");
  }
  if (witness.case_id === "green-witherbloom-tied") assert.equal(ui.resultRefinementAvailable, false, "unsafe Green/Witherbloom refinement remained visible");
  if (witness.case_id === "green-witherbloom-tied") {
    assert.equal(witness.initial_focus_identity_key, "WITHERBLOOM", "review manifest did not identify the requested Witherbloom focus");
    assert.equal(ui.guildName, "Witherbloom College", "Green/Witherbloom tied review did not open on Witherbloom");
    const beforeSwitch = await page.evaluate(() => JSON.parse(sessionStorage.getItem("vm_last_result") || "null"));
    const voiceName = async () => page.$eval('[data-card-voice-section] .flavor-echo-name', (node) => node.textContent?.trim() || "");
    assert.equal(await voiceName(), "Blossoming Bogbeast", "Witherbloom focus lost its approved voice card");
    await page.$eval('[data-action="return-primary-reading"]', (button) => button.click());
    await page.waitForFunction(() => document.querySelector(".guild-name")?.textContent?.trim() === "Green");
    assert.equal(await voiceName(), "Ghalta, Primal Hunger", "Green focus lost its approved voice card");
    const afterGreen = await page.evaluate(() => JSON.parse(sessionStorage.getItem("vm_last_result") || "null"));
    assert.deepEqual(afterGreen, beforeSwitch, "switching tied focus mutated the original placement or evidence ledger");
    await page.$eval('[data-action="switch-adjacent-view"]', (button) => button.click());
    await page.waitForFunction(() => document.querySelector(".guild-name")?.textContent?.trim() === "Witherbloom College");
    assert.equal(await voiceName(), "Blossoming Bogbeast");
    const afterReturn = await page.evaluate(() => JSON.parse(sessionStorage.getItem("vm_last_result") || "null"));
    assert.deepEqual(afterReturn, beforeSwitch, "returning tied focus mutated the original placement or evidence ledger");
  }
  if (witness.expected_state) assert.equal(ui.storedResultState || ui.publicResultState, witness.expected_state, `${witness.case_id || witness.identity_key} result-state drift`);
  assert.deepEqual(ui.internalLeaks, []);
  assert.deepEqual(ui.methodologyPhraseLeaks, [], `${witness.identity_key} retained scoped methodology copy`);
  assert.deepEqual(ui.entityLeaks, [], `${witness.identity_key} leaked encoded entities`);
  assert.deepEqual(ui.mojibakeLeaks, [], `${witness.identity_key} rendered mojibake`);
  assert.deepEqual(ui.knownCopyDefects, [], `${witness.identity_key} retained a known copy defect`);
  if (witness.identity_key === "COLORLESS" && ui.state === "named") assert.equal(ui.literalColorless, false, `literal Colorless token remained in ${JSON.stringify(ui.literalColorlessNodes)}`);
  if (witness.identity_key === "COLORLESS" && ui.state === "named") assert.deepEqual(ui.basicLandCards, ["Wastes"]);
  if (witness.identity_key === "WUBRG" && ui.state === "named") {
    assert.equal(ui.guildName, "WUBRG", "WUBRG public hero retained the internal long identity name");
    assert.deepEqual(ui.wubrgLongIdentityLabels, [], "WUBRG emitted Five-Color / WUBRG as a public identity label");
    assert.ok(ui.wubrgCatalogTerms.length >= 1, "WUBRG normalization rewrote legitimate five-color matters catalog terminology");
    assert.equal(ui.wubrgOpeningIdentityLabels.length, 1, `WUBRG opening repeated the identity label: ${ui.wubrgOpeningText}`);
    assert.deepEqual(ui.wubrgOpeningBareFiveColorTags, [], "WUBRG opening restated its identity as a bare Five-Color tag");
    assert.deepEqual(ui.basicLandCards, ["Plains", "Island", "Swamp", "Mountain", "Forest"]);
  }
  if (witness.identity_key === "G" && ui.state === "named" && ui.guildName === "Green") {
    const normalizedGlossary = ui.glossaryTerms.map((term) => term.toLowerCase());
    for (const term of ["big mana", "landfall", "trample"]) assert.ok(normalizedGlossary.includes(term), `Green omitted ${term} glossary help`);
    assert.ok(!normalizedGlossary.includes("counters"), "Green decorated ordinary bare counters");
  }
  assert.equal(ui.documentOverflow, false);
  assert.deepEqual(consoleErrors.filter((message) => !/favicon|ERR_FAILED|Failed to load resource/i.test(message)), []);
  return { identity_key: witness.identity_key, ...ui, rationaleModalAudit, voiceModalAudit, returnToPreviousReadingVerified, console_errors: consoleErrors.filter((message) => !/favicon|ERR_BLOCKED_BY_CLIENT/i.test(message)) };
}

const server = await startServer();
const address = server.address();
const origin = `http://${host}:${address.port}`;
let chrome;
let browser;
try {
  chrome = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: [...(!reviewMode || reviewCheckMode ? ["--headless=new"] : []), "--no-sandbox", "--disable-gpu"], logLevel: "silent" });
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
      else if (/^https:\/\/api\.scryfall\.com\/cards\/named(?:\?|$)/.test(url) && vm558ReviewMode) {
        const parsed = new URL(url);
        const requestedName = parsed.searchParams.get("exact") || parsed.searchParams.get("fuzzy") || "";
        const card = vm558RawCardByName.get(normalizeCardName(requestedName));
        if (card) request.respond({
          status: 200,
          contentType: "application/json",
          headers: { "access-control-allow-origin": "*" },
          body: Buffer.from(JSON.stringify(card)),
        });
        else request.abort();
      }
      else if (/^https:\/\/api\.scryfall\.com\/cards\/named(?:\?|$)/.test(url) && reviewMode) request.continue();
      else if (/^https:\/\/cards\.scryfall\.io\//.test(url) && vm558ArtFixtureForUrl(url)) request.respond({ status: 200, contentType: "image/jpeg", body: vm558ArtFixtureForUrl(url) });
      else if (/^https:\/\/cards\.scryfall\.io\//.test(url)) reviewMode ? request.continue() : request.respond({ status: 200, contentType: "image/png", body: transparentPng });
      else request.abort();
    });
    try {
      rows.push(await replay(page, origin, witness));
      if (reviewMode && !reviewCheckMode) {
        await page.evaluate(() => document.getElementById("vm-review-preparing")?.remove());
        console.log(`Visual review ready for ${witness.case_id || witness.identity_key}. Press Enter in this terminal to close it.`);
        await new Promise((resolve) => process.stdin.once("data", resolve));
      }
    }
    catch (error) {
      if (!collectFailures) throw error;
      failures.push({ identity_key: witness.identity_key, message: error.message });
      console.error(`${witness.identity_key} failed: ${error.message}`);
    }
    finally { await page.close().catch(() => { /* owner may close the headed browser before terminal handoff */ }); }
  }
  if (!reviewMode && !identityFilter && !caseFilter) {
    const previous = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, "utf8")) : { schema_version: "1.0.0", viewports: {} };
    previous.viewports[viewportName] = { width: viewport.width, height: viewport.height, status: failures.length ? "FAIL" : "PASS", rows, failures };
    fs.writeFileSync(reportPath, `${JSON.stringify(previous, null, 2)}\n`);
  }
  const focusedEvidence = rows.length === 1 && (caseFilter || identityFilter) ? {
    opening: rows[0].wubrgOpeningText || "",
    rationale_modal: rows[0].rationaleModalAudit,
    voice_modal: rows[0].voiceModalAudit,
  } : undefined;
  console.log(JSON.stringify({
    status: failures.length ? "FAIL" : "PASS",
    viewport: viewportName,
    identities: rows.length,
    named: rows.filter((row) => row.state === "named").length,
    ...(focusedEvidence ? { rendered_evidence: focusedEvidence } : {}),
    failures,
  }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  if (browser) await Promise.race([
    browser.close().catch(() => browser.disconnect()),
    delay(3000),
  ]);
  if (chrome) {
    await Promise.race([
      Promise.resolve().then(() => chrome.kill()).catch(() => { /* browser already closed */ }),
      delay(3000),
    ]);
  }
  server.closeIdleConnections?.();
  server.closeAllConnections?.();
  await new Promise((resolve) => server.close(resolve));
}
if (reviewMode) process.exit(process.exitCode || 0);

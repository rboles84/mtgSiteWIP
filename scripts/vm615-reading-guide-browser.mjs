import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

const root = process.cwd();
const witnessDirectory = path.join(root, "outputs", "owner-review", "vm615-reading-dossier");
const failures = [];
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next known local browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for VM-615 validation.");
}

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  }[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

async function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const decodedPath = decodeURIComponent(requestUrl.pathname);
      let filePath = path.resolve(root, `.${decodedPath}`);
      if (!filePath.startsWith(path.resolve(root))) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const fileStats = await stat(filePath).catch(() => null);
      if (fileStats?.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return { server, baseUrl: `http://127.0.0.1:${port}` };
}

async function certifiedCloseResult() {
  const source = JSON.parse(await readFile(
    path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"),
    "utf8"
  ));
  const records = source.records || source.rows || source;
  const record = records.find(row => row.identity_key === "JUND" && row.expected_state === "close");
  if (!record?.result) throw new Error("Certified Jund close-result witness was not found.");
  return record.result;
}

async function readingGuideState(page) {
  return page.evaluate(() => {
    const sectionIds = ["placement-meaning-title", "where-to-start-title", "dossier-map-title", "reading-next-title"];
    const sections = sectionIds.map(id => document.getElementById(id)?.closest("section"));
    return {
      guideCurrent: document.querySelector('.vm-utility-link[data-vm-nav="guide"]')?.getAttribute("aria-current"),
      h1: document.querySelector("h1")?.textContent?.trim(),
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sectionTops: sections.map(section => Math.round(section?.getBoundingClientRect().top ?? -1)),
      anatomyCount: document.querySelectorAll(".reading-dossier-roles > div").length,
      mobileGuideCount: document.querySelectorAll('.vm-menu-nav [data-vm-nav="guide"]').length,
      mainNavGuideCount: document.querySelectorAll('.vm-nav [data-vm-nav="guide"]').length,
    };
  });
}

const { server, baseUrl } = await startServer();
let browser;

try {
  await mkdir(witnessDirectory, { recursive: true });
  browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.url().startsWith(baseUrl)) request.continue();
    else request.abort();
  });

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/guide/reading/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector(".vm-bg__stars")?.dataset.vmRichAtmosphere === "true");
  const desktop = await readingGuideState(page);
  expect(desktop.guideCurrent === "page", "Nested reading Guide should mark Guide current in the utility area");
  expect(desktop.h1 === "Read the result. Choose one next step.", "Reading Guide should retain its outcome-first H1");
  expect(desktop.anatomyCount === 7, "Reading Guide should map all seven existing dossier sections");
  expect(desktop.mainNavGuideCount === 0, "Guide should remain outside desktop primary navigation");
  expect(desktop.mobileGuideCount === 1, "Shared runtime should add Guide exactly once to mobile navigation");
  expect(desktop.horizontalOverflow <= 1, "Desktop reading Guide should not overflow horizontally");
  expect(desktop.sectionTops.every((top, index, tops) => index === 0 || tops[index - 1] < top), "Reading Guide sections should render in I -> II -> III -> IV order");

  const skipLinkNormal = await page.evaluate(() => {
    const link = document.querySelector(".guide-skip-link");
    const rect = link?.getBoundingClientRect();
    return {
      focused: document.activeElement === link,
      bottom: rect?.bottom ?? 0,
      transform: link ? getComputedStyle(link).transform : "missing",
    };
  });
  expect(!skipLinkNormal.focused && skipLinkNormal.bottom < 0, "Skip link should remain visually hidden before keyboard focus");
  expect(skipLinkNormal.transform !== "none", "Skip link should use its accepted hidden transform before focus");

  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement?.classList.contains("guide-skip-link")), "First Tab should focus the reading Guide skip link");
  const skipLinkFocused = await page.evaluate(() => {
    const link = document.querySelector(".guide-skip-link");
    const rect = link?.getBoundingClientRect();
    return {
      top: rect?.top ?? -1,
      bottom: rect?.bottom ?? -1,
      transform: link ? getComputedStyle(link).transform : "missing",
    };
  });
  expect(skipLinkFocused.top >= 0 && skipLinkFocused.bottom > skipLinkFocused.top, "Skip link should become visible when keyboard focused");
  expect(skipLinkFocused.transform === "none" || skipLinkFocused.transform === "matrix(1, 0, 0, 1, 0, 0)", "Focused skip link should clear its hidden transform");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => location.hash === "#reading-guide-main");
  expect(await page.evaluate(() => document.activeElement?.id === "reading-guide-main"), "Skip link should move focus to the reading Guide main region");
  const skipDestination = await page.evaluate(() => {
    const main = document.getElementById("reading-guide-main");
    const topbar = document.querySelector(".vm-topbar");
    return {
      mainTop: main?.getBoundingClientRect().top ?? -1,
      topbarBottom: topbar?.getBoundingClientRect().bottom ?? 0,
    };
  });
  expect(skipDestination.mainTop >= skipDestination.topbarBottom, "Skip-link destination should remain below the sticky topbar");

  await page.goto(`${baseUrl}/guide/reading/?witness=desktop#dossier-map`, { waitUntil: "domcontentloaded" });
  await new Promise(resolve => setTimeout(resolve, 120));
  const deepLink = await page.evaluate(() => ({
    hash: location.hash,
    heading: document.querySelector("#dossier-map-title")?.textContent?.trim(),
  }));
  expect(deepLink.hash === "#dossier-map" && deepLink.heading === "Each section answers a different question.", "Dossier deep link should land on the anatomy map");
  await page.screenshot({ path: path.join(witnessDirectory, "guide-reading-desktop-1440x1000.png"), fullPage: true });

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${baseUrl}/guide/reading/`, { waitUntil: "domcontentloaded" });
  await new Promise(resolve => setTimeout(resolve, 160));
  const mobile = await readingGuideState(page);
  expect(mobile.horizontalOverflow <= 1, "Mobile reading Guide should not overflow horizontally");
  expect(mobile.guideCurrent === "page", "Mobile reading Guide should preserve Guide current-page state");
  expect(mobile.mobileGuideCount === 1, "Mobile navigation should contain Guide exactly once");
  await page.screenshot({ path: path.join(witnessDirectory, "guide-reading-mobile-390x844.png"), fullPage: true });

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.reload({ waitUntil: "domcontentloaded" });
  expect((await readingGuideState(page)).horizontalOverflow <= 1, "Reduced-motion reading Guide should remain laid out correctly");

  await page.setViewport({ width: 720, height: 500 });
  await page.goto(`${baseUrl}/guide/reading/`, { waitUntil: "domcontentloaded" });
  expect((await readingGuideState(page)).horizontalOverflow <= 1, "Reading Guide should reflow without overflow at a 200%-zoom-equivalent CSS viewport");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/archscry/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#landing") && !document.querySelector("#landing")?.classList.contains("hidden"));
  const closeResult = await certifiedCloseResult();
  await page.evaluate(async result => {
    const stateModule = await import("/assets/js/archscry/runtime/state.js");
    const dossierModule = await import("/assets/js/archscry/runtime/dossier-view.js?v=vm615-browser");
    stateModule.APP_STATE.activeResult = result;
    stateModule.APP_STATE.activeViewKey = result.faction;
    stateModule.APP_STATE.resultSource = "vm615-certified-witness";
    dossierModule.renderResult(result.faction);
  }, closeResult);
  await page.waitForSelector(".dossier-orientation");
  const closeDossier = await page.evaluate(() => ({
    heading: document.querySelector(".result-state-banner strong")?.textContent?.trim(),
    orientationHeading: document.querySelector(".dossier-orientation h3")?.textContent?.trim(),
    orientationLinkCount: document.querySelectorAll(".dossier-orientation-guide").length,
    orientationTarget: document.querySelector(".dossier-orientation-guide")?.getAttribute("href"),
    goalCount: document.querySelectorAll(".dossier-orientation-actions button").length,
    activePanel: document.querySelector('[data-dossier-panel]:not([hidden])')?.dataset.dossierPanel,
    hasAlternativeTab: Boolean(document.querySelector('[data-dossier-tab="adjacent"]')),
  }));
  expect(closeDossier.heading === "Close result: Jund, with Gruul Clans also supported", "Certified close result should keep its truthful supported-alternative heading");
  expect(closeDossier.orientationHeading === "What do you want from this result?", "Result dossier should present the decision-oriented directory prompt");
  expect(closeDossier.orientationLinkCount === 1 && closeDossier.orientationTarget === "../guide/reading/index.html#dossier-map", "Result dossier should expose one canonical reading-Guide link");
  expect(closeDossier.goalCount === 4, "Result dossier should expose four bounded goal-to-section choices");
  expect(closeDossier.activePanel === "placement", "Result dossier should remain outcome-first on Placement");
  expect(closeDossier.hasAlternativeTab, "Certified close result should retain its supported-alternative panel");

  await page.focus('.dossier-orientation-actions button[data-panel-id="start"]');
  await page.keyboard.press("Enter");
  expect(await page.evaluate(() => document.querySelector('[data-dossier-panel]:not([hidden])')?.dataset.dossierPanel === "start"), "Goal control should open the existing Start Here panel");
  await page.$eval(".dossier-orientation", element => element.scrollIntoView({ block: "center" }));
  await page.screenshot({ path: path.join(witnessDirectory, "dossier-close-result-desktop-1440x1000.png"), fullPage: false });
  await (await page.$(".dossier-orientation")).screenshot({ path: path.join(witnessDirectory, "dossier-orientation-desktop.png") });

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#landing") && !document.querySelector("#landing")?.classList.contains("hidden"));
  await page.evaluate(async result => {
    const stateModule = await import("/assets/js/archscry/runtime/state.js");
    const dossierModule = await import("/assets/js/archscry/runtime/dossier-view.js?v=vm615-browser-mobile");
    stateModule.APP_STATE.activeResult = result;
    stateModule.APP_STATE.activeViewKey = result.faction;
    dossierModule.renderResult(result.faction);
  }, closeResult);
  await page.waitForSelector(".dossier-orientation");
  const mobileDossier = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    columns: getComputedStyle(document.querySelector(".dossier-orientation-actions")).gridTemplateColumns.split(" ").length,
    guideLinkVisible: document.querySelector(".dossier-orientation-guide")?.getBoundingClientRect().height > 0,
  }));
  expect(mobileDossier.horizontalOverflow <= 1, "Mobile result dossier should not overflow horizontally");
  expect(mobileDossier.columns === 1, "Mobile dossier choices should stack in one column");
  expect(mobileDossier.guideLinkVisible, "Mobile dossier should keep the optional reading Guide link visible");
  await page.$eval(".dossier-orientation", element => element.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: path.join(witnessDirectory, "dossier-close-result-mobile-390x844.png"), fullPage: false });
  await (await page.$(".dossier-orientation")).screenshot({ path: path.join(witnessDirectory, "dossier-orientation-mobile.png") });

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/archscry/?vm-dev-review=1&reviewIdentity=YORE`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-dev-review-render]");
  await page.click("[data-dev-review-render]");
  await page.waitForSelector('[data-dossier-console][data-direct-review="true"]');
  const yoreState = await page.evaluate(() => ({
    identity: document.querySelector("[data-dossier-identity-key]")?.dataset.dossierIdentityKey,
    placementTab: Boolean(document.querySelector('[data-dossier-tab="placement"]')),
    startTab: Boolean(document.querySelector('[data-dossier-tab="start"]')),
  }));
  expect(yoreState.identity === "YORE" && !yoreState.placementTab && yoreState.startTab, "Bounded Yore direct review should retain its existing capability-gated dossier shape");

  expect(pageErrors.length === 0, `Rendered VM-615 routes should not raise page errors: ${pageErrors.join(" | ")}`);
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}

if (failures.length) {
  console.error("VM-615 reading Guide browser checks failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`VM-615 reading Guide browser checks passed. Witnesses: ${witnessDirectory}`);

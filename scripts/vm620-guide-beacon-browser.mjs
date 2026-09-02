import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

const root = process.cwd();
const witnessDirectory = process.env.VM_OWNER_REVIEW_OUTPUT
  ? path.resolve(process.env.VM_OWNER_REVIEW_OUTPUT)
  : path.join(root, "outputs", "vm620-owner-review");
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
      // Try the next local browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for VM-620 validation.");
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
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` };
}

async function configureRequests(page, baseUrl) {
  await page.setRequestInterception(true);
  page.on("request", request => {
    const url = request.url();
    if (url.startsWith("https://api.scryfall.com/cards/search")) {
      request.respond({
        status: 404,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ object: "error", code: "not_found", status: 404, details: "Your query did not match any cards." }),
      });
      return;
    }
    if (url.startsWith(baseUrl)) request.continue();
    else request.abort();
  });
}

async function waitForBeacon(page, selector) {
  await page.waitForSelector(selector, { visible: true });
  await page.waitForFunction(target => {
    const beacon = document.querySelector(target);
    return Boolean(beacon?.getAttribute("data-guide-beacon-state"));
  }, {}, selector);
}

async function scrollBeaconIntoView(page, selector) {
  await page.$eval(selector, element => element.scrollIntoView({ block: "center" }));
  await page.waitForFunction(target => document.querySelector(target)?.classList.contains("is-signaling"), {}, selector);
}

async function finishSignal(page, selector) {
  const timing = await page.$eval(selector, element => {
    const animation = element.getAnimations({ subtree: true }).find(item => item.animationName === "vm-guide-beacon-signal");
    if (!animation) return null;
    const effectTiming = animation.effect.getTiming();
    const keyframes = animation.effect.getKeyframes();
    animation.finish();
    return {
      duration: effectTiming.duration,
      iterations: effectTiming.iterations,
      peakCount: keyframes.filter(frame => [0.06, 0.37, 0.68].includes(Number(frame.offset))).length,
      properties: [...new Set(keyframes.flatMap(frame => Object.keys(frame)))],
    };
  });
  await page.waitForFunction(target => !document.querySelector(target)?.classList.contains("is-signaling"), {}, selector);
  return timing;
}

async function presentWeakMazeSearch(page, input = "Black Lotus with mana value 99 in Commander") {
  await page.waitForSelector("#search-input");
  if (await page.$eval("#mode-ai", element => element.getAttribute("aria-pressed") !== "true")) {
    await page.click("#mode-ai");
  }
  await page.$eval("#search-input", element => { element.value = ""; });
  await page.type("#search-input", input);
  await page.click('[data-action="search"]');
  await waitForBeacon(page, ".qi-guide-link");
  await page.waitForFunction(() => document.querySelector('[data-action="search"]')?.disabled === false);
}

async function renderCertifiedDossier(page, result, cacheKey) {
  await page.evaluate(async ({ certifiedResult, key }) => {
    const stateModule = await import("/assets/js/archscry/runtime/state.js");
    const dossierModule = await import(`/assets/js/archscry/runtime/dossier-view.js?v=${key}`);
    stateModule.APP_STATE.activeResult = certifiedResult;
    stateModule.APP_STATE.activeViewKey = certifiedResult.faction;
    stateModule.APP_STATE.resultSource = "vm620-certified-witness";
    dossierModule.renderResult(certifiedResult.faction);
  }, { certifiedResult: result, key: cacheKey });
  await waitForBeacon(page, ".dossier-orientation-guide");
}

const certifiedSource = JSON.parse(await readFile(
  path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"),
  "utf8",
));
const certifiedRecords = certifiedSource.records || certifiedSource.rows || certifiedSource;
const certifiedCloseResult = certifiedRecords.find(row => row.identity_key === "JUND" && row.expected_state === "close")?.result;
if (!certifiedCloseResult) throw new Error("Certified Jund close-result witness was not found.");

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
  await configureRequests(page, baseUrl);

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await waitForBeacon(page, '.vm-guide-beacon[data-guide-beacon-id="home-guide-entry"]');
  const homeBeforeScroll = await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => ({
    state: element.getAttribute("data-guide-beacon-state"),
    signaling: element.classList.contains("is-signaling"),
    top: element.getBoundingClientRect().top,
    viewportHeight: window.innerHeight,
  }));
  expect(homeBeforeScroll.state === "waiting" && !homeBeforeScroll.signaling && homeBeforeScroll.top >= homeBeforeScroll.viewportHeight, "Home Beacon should wait until it is meaningfully visible");
  await scrollBeaconIntoView(page, '[data-guide-beacon-id="home-guide-entry"]');
  const homeTiming = await finishSignal(page, '[data-guide-beacon-id="home-guide-entry"]');
  expect(homeTiming?.duration === 4800 && homeTiming.iterations === 1 && homeTiming.peakCount === 3, "Home Beacon should use the finite accepted three-beat 4.8-second signal");
  expect(!homeTiming?.properties.some(property => /color|background/i.test(property)), "Beacon signal should not blink text or the primary surface");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => element.scrollIntoView({ block: "center" }));
  await new Promise(resolve => setTimeout(resolve, 180));
  expect(!await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => element.classList.contains("is-signaling")), "Scrolling away and back should not replay the Home signal");
  await page.screenshot({ path: path.join(witnessDirectory, "home-guide-beacon-desktop-1440x1000.png"), fullPage: false });

  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForBeacon(page, '[data-guide-beacon-id="home-guide-entry"]');
  await scrollBeaconIntoView(page, '[data-guide-beacon-id="home-guide-entry"]');
  await page.hover('[data-guide-beacon-id="home-guide-entry"]');
  expect(!await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => element.classList.contains("is-signaling")), "Pointer hover should permanently settle the current Home signal");

  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForBeacon(page, '[data-guide-beacon-id="home-guide-entry"]');
  await scrollBeaconIntoView(page, '[data-guide-beacon-id="home-guide-entry"]');
  await page.focus('[data-guide-beacon-id="home-guide-entry"]');
  const focusedHome = await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => ({
    focused: document.activeElement === element,
    signaling: element.classList.contains("is-signaling"),
    outline: getComputedStyle(element).outlineStyle,
  }));
  expect(focusedHome.focused && !focusedHome.signaling && focusedHome.outline !== "none", "Keyboard focus should settle the signal and keep visible focus");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForBeacon(page, '[data-guide-beacon-id="home-guide-entry"]');
  await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => element.scrollIntoView({ block: "center" }));
  await new Promise(resolve => setTimeout(resolve, 180));
  const reducedHome = await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => ({
    signaling: element.classList.contains("is-signaling"),
    animation: getComputedStyle(element, "::after").animationName,
    height: element.getBoundingClientRect().height,
  }));
  expect(!reducedHome.signaling && reducedHome.animation === "none" && reducedHome.height >= 44, "OS reduced motion should retain a strong static Home affordance without animation");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await waitForBeacon(page, '[data-guide-beacon-id="home-guide-entry"]');
  await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => element.scrollIntoView({ block: "center" }));
  await page.hover('[data-guide-beacon-id="home-guide-entry"]');
  const homeMobile = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    beaconWidth: document.querySelector('[data-guide-beacon-id="home-guide-entry"]')?.getBoundingClientRect().width,
  }));
  expect(homeMobile.overflow <= 1 && homeMobile.beaconWidth <= 390, "Mobile Home Beacon should wrap without horizontal overflow");
  await page.screenshot({ path: path.join(witnessDirectory, "home-guide-beacon-mobile-390x844.png"), fullPage: false });

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/archscry/`, { waitUntil: "networkidle0" });
  await renderCertifiedDossier(page, certifiedCloseResult, "vm620-desktop");
  const dossierBeforeScroll = await page.$eval('[data-guide-beacon-id="dossier-reading-help"]', element => ({
    state: element.getAttribute("data-guide-beacon-state"),
    signaling: element.classList.contains("is-signaling"),
  }));
  expect(!dossierBeforeScroll.signaling, "Dossier Beacon should not burn its signal before meaningful visibility");
  await scrollBeaconIntoView(page, '[data-guide-beacon-id="dossier-reading-help"]');
  await page.hover('[data-guide-beacon-id="dossier-reading-help"]');
  const dossierDesktop = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    guideCount: document.querySelectorAll('[data-guide-beacon-id="dossier-reading-help"]').length,
    decisionCount: document.querySelectorAll(".dossier-orientation-actions button").length,
    beaconWidth: document.querySelector('[data-guide-beacon-id="dossier-reading-help"]')?.getBoundingClientRect().width,
    decisionsWidth: document.querySelector(".dossier-orientation-actions")?.getBoundingClientRect().width,
    href: document.querySelector('[data-guide-beacon-id="dossier-reading-help"]')?.getAttribute("href"),
  }));
  expect(dossierDesktop.guideCount === 1 && dossierDesktop.decisionCount === 4, "Dossier should retain one compact Beacon beside four practical decisions");
  expect(dossierDesktop.beaconWidth < dossierDesktop.decisionsWidth && dossierDesktop.overflow <= 1, "Dossier Beacon should remain visually secondary to the decision grid");
  expect(dossierDesktop.href === "../guide/reading/?guided=dossier-reading", "Dossier Beacon should keep the VM-621 opt-in guided destination");
  await page.screenshot({ path: path.join(witnessDirectory, "dossier-guide-beacon-desktop-1440x1000.png"), fullPage: false });

  await renderCertifiedDossier(page, certifiedCloseResult, "vm620-desktop-rerender");
  expect(await page.$eval('[data-guide-beacon-id="dossier-reading-help"]', element => !element.classList.contains("is-signaling") && element.getAttribute("data-guide-beacon-state") === "quiet"), "Dynamic dossier rerender should not replay the same logical Beacon");
  await page.click('.dossier-orientation-actions button[data-panel-id="start"]');
  expect(!await page.$eval('[data-guide-beacon-id="dossier-reading-help"]', element => element.classList.contains("is-signaling")), "Changing dossier panels should not replay the Beacon");

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.reload({ waitUntil: "networkidle0" });
  await renderCertifiedDossier(page, certifiedCloseResult, "vm620-mobile");
  await page.$eval('[data-guide-beacon-id="dossier-reading-help"]', element => element.scrollIntoView({ block: "center" }));
  await page.hover('[data-guide-beacon-id="dossier-reading-help"]');
  const dossierMobile = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    columns: getComputedStyle(document.querySelector(".dossier-orientation-actions")).gridTemplateColumns.split(" ").length,
    beaconWidth: document.querySelector('[data-guide-beacon-id="dossier-reading-help"]')?.getBoundingClientRect().width,
    orientationWidth: document.querySelector(".dossier-orientation")?.getBoundingClientRect().width,
  }));
  expect(dossierMobile.overflow <= 1 && dossierMobile.columns === 1 && dossierMobile.beaconWidth <= dossierMobile.orientationWidth, "Mobile dossier should stack decisions and contain the compact Beacon");
  await page.screenshot({ path: path.join(witnessDirectory, "dossier-guide-beacon-mobile-390x844.png"), fullPage: false });

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "domcontentloaded" });
  await presentWeakMazeSearch(page);
  await page.$eval('[data-guide-beacon-id="maze-search-help"]', element => element.scrollIntoView({ block: "center" }));
  await page.waitForFunction(() => document.querySelector('[data-guide-beacon-id="maze-search-help"]')?.classList.contains("is-signaling"));
  const mazeTiming = await finishSignal(page, '[data-guide-beacon-id="maze-search-help"]');
  const mazeDesktop = await page.$eval('[data-guide-beacon-id="maze-search-help"]', element => ({
    href: element.getAttribute("href"),
    text: element.innerText.trim(),
    width: element.getBoundingClientRect().width,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  expect(mazeTiming?.duration === 4800 && mazeTiming.peakCount === 3, "Maze should preserve the accepted finite signal through the shared owner");
  expect(mazeDesktop.href === "../guide/maze/?guided=maze-search" && /FIELD GUIDE[\s\S]*Walk me through this search/.test(mazeDesktop.text), "Maze should preserve its exact guided promise and URL");
  expect(mazeDesktop.width <= 400.5 && mazeDesktop.overflow <= 1, "Maze variant should preserve its accepted compact geometry");
  await page.screenshot({ path: path.join(witnessDirectory, "maze-guide-beacon-desktop-1440x1000.png"), fullPage: false });

  await presentWeakMazeSearch(page, "Black Lotus with mana value 99 in Commander");
  expect(await page.$eval('[data-guide-beacon-id="maze-search-help"]', element => !element.classList.contains("is-signaling") && element.getAttribute("data-guide-beacon-state") === "quiet"), "Query Inspector rerender should not replay the same logical Maze Beacon");

  await page.reload({ waitUntil: "domcontentloaded" });
  await presentWeakMazeSearch(page);
  await page.$eval('[data-guide-beacon-id="maze-search-help"]', element => element.scrollIntoView({ block: "center" }));
  await page.waitForFunction(() => document.querySelector('[data-guide-beacon-id="maze-search-help"]')?.classList.contains("is-signaling"));
  await page.evaluate(() => window.vmReduceMotion.set(true));
  const voxReducedMaze = await page.$eval('[data-guide-beacon-id="maze-search-help"]', element => ({
    signaling: element.classList.contains("is-signaling"),
    animation: getComputedStyle(element, "::after").animationName,
  }));
  expect(!voxReducedMaze.signaling && voxReducedMaze.animation === "none", "Vox Mana Reduce Motion should stop an active Beacon and keep it static");

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "domcontentloaded" });
  await presentWeakMazeSearch(page);
  await page.$eval('[data-guide-beacon-id="maze-search-help"]', element => element.scrollIntoView({ block: "center" }));
  await page.hover('[data-guide-beacon-id="maze-search-help"]');
  const mazeMobile = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    beaconWidth: document.querySelector('[data-guide-beacon-id="maze-search-help"]')?.getBoundingClientRect().width,
  }));
  expect(mazeMobile.overflow <= 1 && mazeMobile.beaconWidth <= 390, "Mobile Maze Beacon should remain contained without overflow");
  await page.screenshot({ path: path.join(witnessDirectory, "maze-guide-beacon-mobile-390x844.png"), fullPage: false });

  await page.setViewport({ width: 720, height: 500 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, "Beacon surfaces should reflow at a 200%-zoom-equivalent viewport");

  const fallbackPage = await browser.newPage();
  await fallbackPage.setJavaScriptEnabled(false);
  await fallbackPage.setViewport({ width: 390, height: 844, isMobile: true });
  await fallbackPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  const fallback = await fallbackPage.$eval('[data-guide-beacon-id="home-guide-entry"]', element => ({
    href: element.getAttribute("href"),
    visible: element.getBoundingClientRect().height >= 44,
    text: element.innerText,
  }));
  expect(fallback.href === "./guide/?guided=vox-mana-intro" && fallback.visible && /Start with the Guide/.test(fallback.text), "Without JS the Home Beacon should remain a visible working link to the progressively enhanced Guide route");
  await fallbackPage.close();

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/guide/maze/`, { waitUntil: "domcontentloaded" });
  const directGuide = await page.evaluate(() => ({
    guided: new URL(location.href).searchParams.has("guided"),
    driverActive: Boolean(document.querySelector(".driver-overlay, .driver-popover, .driver-active-element")),
    beaconAssets: [...document.styleSheets].some(sheet => sheet.href?.includes("guide-beacon.css")),
  }));
  expect(!directGuide.guided && !directGuide.driverActive && !directGuide.beaconAssets, "Direct /guide/maze/ should remain static and avoid contextual Beacon assets");

  expect(pageErrors.length === 0, `Rendered VM-620 routes should not raise page errors: ${pageErrors.join(" | ")}`);
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}

if (failures.length) {
  console.error("VM-620 shared Guide Beacon browser checks failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`VM-620 shared Guide Beacon browser checks passed. Witnesses: ${witnessDirectory}`);

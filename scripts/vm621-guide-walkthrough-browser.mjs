import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

const root = process.cwd();
const reviewMode = process.argv.includes("--review");
const witnessDirectory = path.join(root, "outputs", "vm621-owner-review");
const failures = [];
const observations = {};
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

const routes = [
  {
    name: "Home Guide",
    key: "home",
    path: "/guide/",
    guided: "vox-mana-intro",
    main: "#guide-main",
    doneFocus: "guide-title",
    targets: ["guide-archscry", "guide-maze", "guide-strategium", "how-vox-connects"],
    focusTargets: ["guide-archscry-title", "guide-maze-title", "guide-strategium-title", "guide-relationship-title"],
    titles: ["Find your Commander direction", "Find cards", "Learn the table", "See how Vox Mana fits together"],
    interactiveStep: 0,
    interactiveSelector: "#guide-archscry .guide-cta",
    missingId: "guide-strategium",
  },
  {
    name: "Reading Guide",
    key: "reading",
    path: "/guide/reading/",
    guided: "dossier-reading",
    main: "#reading-guide-main",
    doneFocus: "reading-guide-title",
    targets: ["reading-placement-meaning", "reading-where-to-start", "dossier-map", "reading-next"],
    focusTargets: ["placement-meaning-title", "where-to-start-title", "dossier-map-title", "reading-next-title"],
    titles: ["Understand what the result means", "Choose where to start", "Read the dossier by question", "Choose one next step"],
    interactiveStep: 3,
    interactiveSelector: "#reading-next .guide-cta",
    missingId: "dossier-map",
  },
];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Continue through known local Chromium installs.
    }
  }
  throw new Error("No supported local Chromium browser was found for VM-621 validation.");
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
      let body = await readFile(filePath);
      if (requestUrl.searchParams.has("vm621-missing") && filePath.endsWith("index.html")) {
        const missingId = requestUrl.searchParams.get("vm621-missing");
        body = Buffer.from(body.toString("utf8").replace(`id="${missingId}"`, `id="${missingId}-missing"`));
      }
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` };
}

async function newPage(browser, baseUrl, { abortDriver = false } = {}) {
  const page = await browser.newPage();
  const requests = [];
  const errors = [];
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => {
    const url = request.url();
    requests.push(url);
    if (abortDriver && url.endsWith("/assets/vendor/driverjs/1.8.0/driver.js.iife.js")) {
      request.abort();
    } else if (url.startsWith(baseUrl)) {
      request.continue();
    } else {
      request.abort();
    }
  });
  return { page, requests, errors };
}

const settle = () => new Promise(resolve => setTimeout(resolve, 460));

async function waitForTour(page, route, step = 0) {
  await page.waitForSelector(".driver-popover[role=dialog]", { visible: true });
  await page.waitForFunction(expected => document.querySelector(".driver-active-element")?.id === expected, {}, route.targets[step]);
  await settle();
  expect(
    await page.evaluate(() => document.activeElement === document.querySelector(".driver-popover-next-btn")),
    `${route.name}: each step should focus its forward action`,
  );
}

async function moveToStep(page, route, index) {
  for (let step = 0; step < index; step += 1) {
    await page.click(".driver-popover-next-btn");
    await waitForTour(page, route, step + 1);
  }
}

async function gotoStep(page, baseUrl, route, index = 0, suffix = "") {
  await page.goto(`${baseUrl}${route.path}?guided=${route.guided}${suffix}`, { waitUntil: "domcontentloaded" });
  await waitForTour(page, route);
  await moveToStep(page, route, index);
}

async function expectClean(page, route, label) {
  await page.waitForFunction(() => !document.body.classList.contains("driver-active"));
  const clean = await page.evaluate(() => ({
    guided: new URL(location.href).searchParams.has("guided"),
    overlays: document.querySelectorAll(".driver-overlay").length,
    popovers: document.querySelectorAll(".driver-popover").length,
    activeTargets: document.querySelectorAll(".driver-active-element").length,
    staleControls: document.querySelectorAll('[aria-controls^="driver-popover"]').length,
  }));
  expect(!clean.guided, `${route.name} ${label}: guided should be removed`);
  expect(clean.overlays + clean.popovers + clean.activeTargets + clean.staleControls === 0, `${route.name} ${label}: Driver DOM and ARIA state should be removed`);
  expect(await page.$eval(route.interactiveSelector, element => element.getAttribute("tabindex")) === null, `${route.name} ${label}: ordinary action tabindex should be restored`);
}

async function renderCertifiedDossier(page, result, cacheKey) {
  await page.evaluate(async ({ certifiedResult, key }) => {
    const stateModule = await import("/assets/js/archscry/runtime/state.js");
    const dossierModule = await import(`/assets/js/archscry/runtime/dossier-view.js?v=${key}`);
    stateModule.APP_STATE.activeResult = certifiedResult;
    stateModule.APP_STATE.activeViewKey = certifiedResult.faction;
    stateModule.APP_STATE.resultSource = "vm621-certified-witness";
    dossierModule.renderResult(certifiedResult.faction);
  }, { certifiedResult: result, key: cacheKey });
  await page.waitForSelector('[data-guide-beacon-id="dossier-reading-help"]', { visible: true });
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
  if (reviewMode) await mkdir(witnessDirectory, { recursive: true });
  browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  for (const route of routes) {
    const context = await newPage(browser, baseUrl);
    const { page, requests, errors } = context;
    await page.setViewport({ width: 1440, height: 1000 });

    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle0" });
    expect((await page.$$(".driver-popover")).length === 0, `${route.name}: direct route should remain static`);
    expect(!requests.some(url => url.includes("/assets/vendor/driverjs/")), `${route.name}: direct route should not request Driver assets`);
    expect(!requests.some(url => url.endsWith("/assets/js/shared/guide-walkthrough.js")), `${route.name}: direct route should not request the shared lifecycle`);

    await page.goto(`${baseUrl}${route.path}?guided=unsupported`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => !new URL(location.href).searchParams.has("guided"));
    expect((await page.$$(".driver-popover")).length === 0, `${route.name}: unsupported ID should fail to the static Guide`);

    requests.length = 0;
    await gotoStep(page, baseUrl, route);
    const first = await page.evaluate(() => {
      const dialog = document.querySelector(".driver-popover[role=dialog]");
      return {
        title: dialog?.querySelector(".driver-popover-title")?.textContent?.trim(),
        role: dialog?.getAttribute("role"),
        labelledby: dialog?.getAttribute("aria-labelledby"),
        closeName: dialog?.querySelector(".driver-popover-close-btn")?.getAttribute("aria-label"),
        nextName: dialog?.querySelector(".driver-popover-next-btn")?.getAttribute("aria-label"),
        overlays: document.querySelectorAll(".driver-overlay").length,
      };
    });
    expect(first.title === route.titles[0], `${route.name}: exact URL should begin at its first approved step`);
    expect(first.role === "dialog" && first.labelledby === "driver-popover-title", `${route.name}: popover should be a named dialog`);
    expect(first.closeName === "Close guided reading" && first.nextName === "Next guided-reading step", `${route.name}: controls should have clear names`);
    expect(first.overlays === 1, `${route.name}: one guided request should create one overlay`);
    expect(requests.some(url => url.endsWith("/assets/vendor/driverjs/1.8.0/driver.js.iife.js")), `${route.name}: guided mode should load local Driver 1.8.0`);
    expect(requests.some(url => url.endsWith("/assets/css/guide-walkthrough.css")), `${route.name}: guided mode should load the accepted theme`);
    expect(!requests.some(url => !url.startsWith(baseUrl)), `${route.name}: guided mode should make no third-party requests`);

    const tabStops = [];
    for (let index = 0; index < 6; index += 1) {
      await page.keyboard.press("Tab");
      tabStops.push(await page.evaluate(() => document.activeElement.className));
    }
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    tabStops.push(await page.evaluate(() => document.activeElement.className));
    expect(tabStops.every(value => String(value).includes("driver-popover")), `${route.name}: Tab and Shift+Tab should stay within walkthrough controls`);

    await gotoStep(page, baseUrl, route);
    await page.focus(".driver-popover-next-btn");
    await page.keyboard.press(" ");
    await waitForTour(page, route, 1);
    await page.focus(".driver-popover-prev-btn");
    await page.keyboard.press(" ");
    await waitForTour(page, route, 0);
    await page.focus(".driver-popover-next-btn");
    await page.keyboard.press("Enter");
    await waitForTour(page, route, 1);
    expect((await page.$eval(".driver-popover-title", element => element.textContent.trim())) === route.titles[1], `${route.name}: Space/Enter and Previous/Next should move deterministically`);

    if (route.key === "home") {
      const specimen = "#guide-maze-mode-operator";
      const before = await page.$eval(specimen, element => ({ tabindex: element.getAttribute("tabindex"), pointer: getComputedStyle(element).pointerEvents }));
      expect(before.tabindex === "-1" && before.pointer === "none", "Home Guide: the highlighted Maze specimen buttons should be suppressed too");
      const box = await page.$eval(specimen, element => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      });
      await page.mouse.click(box.x, box.y);
      expect(await page.$eval(specimen, element => element.getAttribute("aria-pressed")) === "false", "Home Guide: an underlying specimen click should not change its mode during orientation");
      await page.keyboard.press("Escape");
      await expectClean(page, route, "specimen cleanup");
      expect(await page.$eval(specimen, element => element.getAttribute("tabindex")) === null, "Home Guide: specimen tabindex should be restored after exit");
      await page.click(specimen);
      expect(await page.$eval(specimen, element => element.getAttribute("aria-pressed")) === "true", "Home Guide: the ordinary specimen should work after exit");
    }

    await gotoStep(page, baseUrl, route, route.interactiveStep);
    const suppressed = await page.$eval(route.interactiveSelector, element => ({
      tabindex: element.getAttribute("tabindex"),
      pointerEvents: getComputedStyle(element).pointerEvents,
      href: element.href,
    }));
    expect(suppressed.tabindex === "-1" && suppressed.pointerEvents === "none", `${route.name}: highlighted underlying actions should be inert`);
    const beforeClick = page.url();
    const actionBox = await page.$eval(route.interactiveSelector, element => {
      const box = element.getBoundingClientRect();
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    });
    await page.mouse.click(actionBox.x, actionBox.y);
    expect(page.url() === beforeClick, `${route.name}: clicking a highlighted action should not navigate`);

    await gotoStep(page, baseUrl, route, 2);
    await page.keyboard.press("Escape");
    await expectClean(page, route, "Escape");
    expect((await page.evaluate(() => document.activeElement.id)) === route.focusTargets[2], `${route.name}: Escape should focus the current section heading`);

    await gotoStep(page, baseUrl, route, 1);
    await page.focus(".driver-popover-close-btn");
    await page.keyboard.press(" ");
    await expectClean(page, route, "Close");
    expect((await page.evaluate(() => document.activeElement.id)) === route.focusTargets[1], `${route.name}: Close should focus the current section heading`);

    await gotoStep(page, baseUrl, route, 3);
    expect((await page.$eval(".driver-popover-next-btn", element => element.getAttribute("aria-label"))) === "Finish guided reading", `${route.name}: last step should expose Done`);
    if (reviewMode) await page.screenshot({ path: path.join(witnessDirectory, `${route.key}-desktop-1440x1000.png`), fullPage: false });
    await page.focus(".driver-popover-next-btn");
    await page.keyboard.press(" ");
    await expectClean(page, route, "Done");
    await page.waitForFunction(() => scrollY <= 2);
    const done = await page.evaluate(() => ({
      focus: document.activeElement.id,
      scrollY: Math.round(scrollY),
      outline: getComputedStyle(document.activeElement).outlineStyle,
      outlineWidth: getComputedStyle(document.activeElement).outlineWidth,
    }));
    expect(done.focus === route.doneFocus && done.scrollY <= 2, `${route.name}: Done should return to and focus the static Guide top`);
    expect(done.outline === "none" || done.outlineWidth === "0px", `${route.name}: completion focus should remain visually quiet`);
    await page.reload({ waitUntil: "domcontentloaded" });
    expect((await page.$$(".driver-popover")).length === 0, `${route.name}: refresh after Done should remain static`);

    await gotoStep(page, baseUrl, route);
    await page.reload({ waitUntil: "domcontentloaded" });
    await waitForTour(page, route);
    expect((await page.$eval(".driver-popover-title", element => element.textContent.trim())) === route.titles[0], `${route.name}: valid guided refresh should replay step 1`);

    await page.goto(`${baseUrl}${route.path}?guided=${route.guided}&vm621-missing=${route.missingId}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => !new URL(location.href).searchParams.has("guided"));
    expect((await page.$$(".driver-popover")).length === 0 && Boolean(await page.$(route.main)), `${route.name}: missing target should leave a usable static Guide`);

    const failedAsset = await newPage(browser, baseUrl, { abortDriver: true });
    await failedAsset.page.goto(`${baseUrl}${route.path}?guided=${route.guided}`, { waitUntil: "domcontentloaded" });
    await failedAsset.page.waitForFunction(() => !new URL(location.href).searchParams.has("guided"));
    expect((await failedAsset.page.$$(".driver-popover")).length === 0 && Boolean(await failedAsset.page.$(route.main)), `${route.name}: blocked Driver should fail safely to the static Guide`);
    await failedAsset.page.close();

    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await gotoStep(page, baseUrl, route, 2);
    const mobile = await page.evaluate(() => {
      const box = document.querySelector(".driver-popover").getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        left: box.left,
        right: box.right,
        bottom: box.bottom,
        viewportWidth: innerWidth,
        viewportHeight: innerHeight,
      };
    });
    expect(mobile.overflow <= 1 && mobile.left >= 0 && mobile.right <= mobile.viewportWidth + 1 && mobile.bottom <= mobile.viewportHeight + 1, `${route.name}: mobile popover should fit without horizontal overflow`);
    if (reviewMode) await page.screenshot({ path: path.join(witnessDirectory, `${route.key}-mobile-390x844.png`), fullPage: false });
    await page.setViewport({ width: 720, height: 500 });
    await settle();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, `${route.name}: 200%-zoom-equivalent viewport should reflow without overflow`);
    await page.keyboard.press("Escape");
    await expectClean(page, route, "responsive cleanup");

    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await gotoStep(page, baseUrl, route);
    const reduced = await page.evaluate(() => ({
      simple: document.body.classList.contains("driver-simple"),
      transition: getComputedStyle(document.querySelector(".driver-popover")).transitionDuration,
    }));
    expect(reduced.simple || reduced.transition === "0s", `${route.name}: OS reduced motion should disable Driver animation`);
    await page.evaluate(() => window.dispatchEvent(new CustomEvent("vm:reduce-motion-change", { detail: { reduceMotion: true } })));
    await expectClean(page, route, "Vox motion change");
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

    await page.evaluate(() => window.vmReduceMotion.set(true));
    await gotoStep(page, baseUrl, route);
    expect(await page.evaluate(() => document.body.classList.contains("driver-simple")), `${route.name}: Vox reduced motion should disable animation at startup`);
    await page.evaluate(() => window.vmReduceMotion.set(false));
    await expectClean(page, route, "Vox motion startup cleanup");

    observations[route.key] = {
      steps: route.titles,
      completionFocus: route.doneFocus,
      thirdPartyRequests: requests.filter(url => !url.startsWith(baseUrl)),
    };
    expect(errors.length === 0, `${route.name}: rendered route should not raise page errors: ${errors.join(" | ")}`);
    await page.close();
  }

  const source = await newPage(browser, baseUrl);
  const { page, errors } = source;
  await page.setViewport({ width: 1440, height: 1000 });

  async function launchHome() {
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const href = await page.$eval('[data-guide-beacon-id="home-guide-entry"]', element => element.getAttribute("href"));
    expect(href === "./guide/?guided=vox-mana-intro", "Home Beacon should expose the exact VM-621 guided destination");
    await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click('[data-guide-beacon-id="home-guide-entry"]')]);
    await waitForTour(page, routes[0]);
  }

  async function launchDossier(key) {
    await page.goto(`${baseUrl}/archscry/`, { waitUntil: "networkidle0" });
    await renderCertifiedDossier(page, certifiedCloseResult, key);
    const href = await page.$eval('[data-guide-beacon-id="dossier-reading-help"]', element => element.getAttribute("href"));
    expect(href === "../guide/reading/?guided=dossier-reading", "Dossier Beacon should expose the exact VM-621 guided destination");
    await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click('[data-guide-beacon-id="dossier-reading-help"]')]);
    await waitForTour(page, routes[1]);
  }

  for (const [route, launch] of [
    [routes[0], launchHome],
    [routes[1], () => launchDossier("vm621-source-back")],
  ]) {
    await launch();
    await page.goBack({ waitUntil: "domcontentloaded" });
    expect(new URL(page.url()).pathname === (route.key === "home" ? "/" : "/archscry/"), `${route.name}: Back mid-tour should return to its invoking product route`);
  }

  await launchHome();
  await moveToStep(page, routes[0], 3);
  await page.click(".driver-popover-next-btn");
  await expectClean(page, routes[0], "source Done");
  await page.goBack({ waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname === "/", "Home Guide: Done then Back should return Home without a guided/static loop");

  await launchDossier("vm621-source-done");
  await moveToStep(page, routes[1], 3);
  await page.click(".driver-popover-next-btn");
  await expectClean(page, routes[1], "source Done");
  await page.goBack({ waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname === "/archscry/", "Reading Guide: Done then Back should return Archscry without a guided/static loop");

  expect(errors.length === 0, `Owner click paths should not raise page errors: ${errors.join(" | ")}`);
  await page.close();
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

if (failures.length) {
  console.error(`VM-621 guided-reading browser validation failed (${failures.length}):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("VM-621 Home and dossier guided-reading browser validation passed.");
console.log(JSON.stringify(observations, null, 2));

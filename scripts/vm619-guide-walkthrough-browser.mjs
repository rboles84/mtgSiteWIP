import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

const root = process.cwd();
const reviewMode = process.argv.includes("--review");
const witnessDirectory = process.env.VM_OWNER_REVIEW_OUTPUT
  ? path.resolve(process.env.VM_OWNER_REVIEW_OUTPUT)
  : path.join(root, "outputs", "vm619-owner-review");
const failures = [];
const observations = {};
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
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
      // Continue through known local Chromium installs.
    }
  }
  throw new Error("No supported local Chromium browser was found for VM-619 validation.");
}

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
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
      if (requestUrl.searchParams.has("vm619-missing") && filePath.endsWith(path.join("guide", "maze", "index.html"))) {
        body = Buffer.from(body.toString("utf8").replace('id="context"', 'id="context-missing"'));
      }
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` };
}

async function newPage(browser, baseUrl, { abortDriver = false } = {}) {
  const page = await browser.newPage();
  const requests = [];
  const errors = [];
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    requests.push(request.url());
    if (abortDriver && request.url().endsWith("/assets/vendor/driverjs/1.8.0/driver.js.iife.js")) {
      request.abort();
    } else if (request.url().startsWith(baseUrl)) {
      request.continue();
    } else {
      request.abort();
    }
  });
  return { page, requests, errors };
}

async function waitForTour(page) {
  await page.waitForSelector(".driver-popover[role=dialog]", { visible: true });
  await page.waitForFunction(() => document.body.classList.contains("driver-active"));
  await new Promise((resolve) => setTimeout(resolve, 450));
  expect(
    await page.evaluate(() => document.activeElement === document.querySelector(".driver-popover-next-btn")),
    "Each newly rendered guided-reading step should focus its forward action"
  );
}

async function tourState(page) {
  return page.evaluate(() => {
    const dialog = document.querySelector(".driver-popover[role=dialog]");
    const active = document.querySelector(".driver-active-element");
    const focused = document.activeElement;
    return {
      title: dialog?.querySelector(".driver-popover-title")?.textContent?.trim() || "",
      description: dialog?.querySelector(".driver-popover-description")?.textContent?.trim() || "",
      activeId: active?.id || "",
      focusedClass: focused?.className || "",
      focusedId: focused?.id || "",
      role: dialog?.getAttribute("role"),
      labelledby: dialog?.getAttribute("aria-labelledby"),
      closeName: dialog?.querySelector(".driver-popover-close-btn")?.getAttribute("aria-label"),
      previousName: dialog?.querySelector(".driver-popover-prev-btn")?.getAttribute("aria-label"),
      nextName: dialog?.querySelector(".driver-popover-next-btn")?.getAttribute("aria-label"),
      overlayCount: document.querySelectorAll(".driver-overlay").length,
      popoverCount: document.querySelectorAll(".driver-popover").length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
}

async function expectClean(page, label) {
  await page.waitForFunction(() => !document.body.classList.contains("driver-active"));
  const clean = await page.evaluate(() => ({
    guided: new URL(location.href).searchParams.has("guided"),
    overlays: document.querySelectorAll(".driver-overlay").length,
    popovers: document.querySelectorAll(".driver-popover").length,
    activeTargets: document.querySelectorAll(".driver-active-element").length,
    staleControls: document.querySelectorAll('[aria-controls^="driver-popover"]')?.length || 0,
    sectionLinkTabindex: document.querySelector("#maze-guide-results a")?.getAttribute("tabindex")
  }));
  expect(!clean.guided, `${label}: guided parameter should be removed`);
  expect(clean.overlays === 0 && clean.popovers === 0 && clean.activeTargets === 0, `${label}: Driver DOM and classes should be removed`);
  expect(clean.staleControls === 0, `${label}: Driver ARIA controls should be removed`);
  expect(clean.sectionLinkTabindex === null, `${label}: original Guide-link tabindex should be restored`);
  return clean;
}

async function gotoStep(page, baseUrl, index) {
  const titles = ["Read the translation", "See what affects the search", "Understand why it missed", "Act on a useful result"];
  await page.goto(`${baseUrl}/guide/maze/?guided=maze-search`, { waitUntil: "domcontentloaded" });
  await waitForTour(page);
  for (let step = 0; step < index; step += 1) {
    await page.click(".driver-popover-next-btn");
    await page.waitForFunction(
      (expected) => document.querySelector(".driver-active-element")?.id === expected,
      {},
      ["translation", "context", "recovery", "maze-guide-results"][step + 1]
    );
    await new Promise((resolve) => setTimeout(resolve, 450));
    const state = await tourState(page);
    expect(state.title === titles[step + 1], `Step ${step + 2} should render the approved guided-reading heading`);
    expect(
      await page.evaluate(() => document.activeElement === document.querySelector(".driver-popover-next-btn")),
      `Step ${step + 2} should focus its forward action after Driver renders`
    );
  }
}

const { server, baseUrl } = await startServer();
let browser;

try {
  if (reviewMode) await mkdir(witnessDirectory, { recursive: true });
  browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
  });

  const primary = await newPage(browser, baseUrl);
  const { page, requests, errors } = primary;
  await page.setViewport({ width: 1440, height: 1000 });

  await page.goto(`${baseUrl}/guide/maze/`, { waitUntil: "networkidle0" });
  expect((await page.$$(".driver-popover")).length === 0, "Direct Maze Guide should remain static");
  expect(!requests.some((url) => url.includes("/assets/vendor/driverjs/")), "Static Maze Guide should not request Driver assets");
  expect(!requests.some((url) => url.endsWith("/assets/css/guide-walkthrough.css")), "Static Maze Guide should not request the walkthrough theme");
  expect(!requests.some((url) => url.endsWith("/assets/js/shared/guide-walkthrough.js")), "Static Maze Guide should not request the shared walkthrough lifecycle helper");

  await page.goto(`${baseUrl}/guide/maze/?guided=potato`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !new URL(location.href).searchParams.has("guided"));
  expect((await page.$$(".driver-popover")).length === 0, "Unknown guided ID should remain static");

  requests.length = 0;
  await gotoStep(page, baseUrl, 0);
  const initial = await tourState(page);
  observations.startFocus = `${initial.focusedId || initial.focusedClass}`;
  expect(initial.title === "Read the translation" && initial.activeId === "translation", "Exact guided URL should start at accepted Section I");
  expect(initial.role === "dialog" && initial.labelledby === "driver-popover-title", "Popover should expose a named dialog");
  expect(initial.closeName === "Close guided reading" && initial.nextName === "Next guided-reading step", "Initial controls should expose clear names");
  expect(initial.overlayCount === 1 && initial.popoverCount === 1, "One guided request should create one Driver instance surface");
  expect(requests.some((url) => url.endsWith("/assets/vendor/driverjs/1.8.0/driver.js.iife.js")), "Guided mode should lazy-load local Driver JS");
  expect(requests.some((url) => url.endsWith("/assets/vendor/driverjs/1.8.0/driver.css")), "Guided mode should lazy-load local Driver CSS");
  expect(!requests.some((url) => !url.startsWith(baseUrl)), "Guided mode should make no third-party request");
  observations.vm619ThirdPartyRequests = requests.filter((url) => !url.startsWith(baseUrl));
  if (reviewMode) await page.screenshot({ path: path.join(witnessDirectory, "01-step-1-desktop.png"), fullPage: false });

  const tabPath = [];
  for (const key of ["Tab", "Tab", "Tab", "Tab", "Tab", "Shift+Tab"]) {
    if (key === "Shift+Tab") await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    if (key === "Shift+Tab") await page.keyboard.up("Shift");
    tabPath.push(await page.evaluate(() => ({ tag: document.activeElement.tagName, className: document.activeElement.className })));
  }
  observations.tabPath = tabPath;
  expect(tabPath.every((entry) => String(entry.className).includes("driver-popover")), "Tab and Shift+Tab should remain on walkthrough controls");

  await page.focus(".driver-popover-next-btn");
  await page.keyboard.press(" ");
  await new Promise((resolve) => setTimeout(resolve, 250));
  observations.spaceProbe = await page.evaluate(() => ({
    focusedClass: document.activeElement.className,
    activeId: document.querySelector(".driver-active-element")?.id
  }));
  expect(observations.spaceProbe.activeId === "context", "Space should activate the native Next button");
  if (observations.spaceProbe.activeId !== "context") await page.click(".driver-popover-next-btn");
  await new Promise((resolve) => setTimeout(resolve, 450));
  await page.focus(".driver-popover-prev-btn");
  await page.keyboard.press(" ");
  await page.waitForFunction(() => document.querySelector(".driver-active-element")?.id === "translation");
  await new Promise((resolve) => setTimeout(resolve, 450));
  await page.focus(".driver-popover-next-btn");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelector(".driver-active-element")?.id === "context");
  await new Promise((resolve) => setTimeout(resolve, 450));
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(() => document.querySelector(".driver-active-element")?.id === "recovery");
  await new Promise((resolve) => setTimeout(resolve, 450));
  await page.keyboard.press("ArrowLeft");
  await page.waitForFunction(() => document.querySelector(".driver-active-element")?.id === "context");
  await new Promise((resolve) => setTimeout(resolve, 450));
  observations.keyboard = "Space Next/Previous, Enter Next, and ArrowRight/ArrowLeft passed";

  await page.click(".driver-popover-next-btn");
  await new Promise((resolve) => setTimeout(resolve, 450));
  if (reviewMode) await page.screenshot({ path: path.join(witnessDirectory, "02-step-3-desktop.png"), fullPage: false });
  await page.click(".driver-popover-next-btn");
  await new Promise((resolve) => setTimeout(resolve, 450));
  const finalStep = await tourState(page);
  expect(finalStep.title === "Act on a useful result" && finalStep.nextName === "Finish guided reading", "Fourth step should expose the Done action with a clear accessible name");
  const underlying = await page.$eval("#maze-guide-results a", (element) => ({
    tabindex: element.getAttribute("tabindex"),
    pointerEvents: getComputedStyle(element).pointerEvents,
    href: element.href
  }));
  expect(underlying.tabindex === "-1" && underlying.pointerEvents === "none", "Highlighted ordinary Guide action should not be keyboard or pointer actionable");
  const beforeUnderlyingClick = page.url();
  const linkBox = await page.$eval("#maze-guide-results a", (element) => {
    const box = element.getBoundingClientRect();
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  });
  await page.mouse.click(linkBox.x, linkBox.y);
  expect(page.url() === beforeUnderlyingClick, "Clicking the highlighted Guide action should not navigate during orientation");
  await page.focus(".driver-popover-next-btn");
  await page.keyboard.press(" ");
  await expectClean(page, "Done");
  await page.waitForFunction(() => scrollY <= 2);
  const doneFocus = await page.evaluate(() => ({
    id: document.activeElement.id,
    outlineStyle: getComputedStyle(document.activeElement).outlineStyle,
    outlineWidth: getComputedStyle(document.activeElement).outlineWidth,
    scrollY: Math.round(scrollY),
    pathname: location.pathname
  }));
  observations.doneFocus = doneFocus;
  expect(doneFocus.id === "maze-guide-title" && doneFocus.scrollY <= 2, "Done should focus the Guide title at the static page top");
  expect(doneFocus.outlineStyle === "none" || doneFocus.outlineWidth === "0px", "Done focus should not draw a page-sized decorative outline");
  if (reviewMode) await page.screenshot({ path: path.join(witnessDirectory, "04-static-guide-after-done.png"), fullPage: false });
  await page.reload({ waitUntil: "domcontentloaded" });
  expect((await page.$$(".driver-popover")).length === 0, "Refresh after Done should remain static");

  const focusTargets = ["translation-title", "context-title", "recovery-title", "maze-next-title"];
  for (let index = 0; index < 4; index += 1) {
    await gotoStep(page, baseUrl, index);
    await page.keyboard.press("Escape");
    await expectClean(page, `Escape step ${index + 1}`);
    const focusedId = await page.evaluate(() => document.activeElement.id);
    expect(focusedId === focusTargets[index], `Escape from step ${index + 1} should focus its section heading`);
  }
  observations.escapeFocus = focusTargets;

  await gotoStep(page, baseUrl, 2);
  await page.focus(".driver-popover-close-btn");
  await page.keyboard.press(" ");
  await expectClean(page, "Close");
  observations.closeFocus = await page.evaluate(() => document.activeElement.id);
  expect(observations.closeFocus === "recovery-title", "Close should focus the current section heading");

  await gotoStep(page, baseUrl, 0);
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForTour(page);
  expect((await tourState(page)).activeId === "translation", "Refresh with the exact guided URL should replay from step 1");

  await page.goto(`${baseUrl}/guide/maze/?guided=maze-search&vm619-missing=1`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !new URL(location.href).searchParams.has("guided"));
  expect((await page.$$(".driver-popover")).length === 0 && Boolean(await page.$("#maze-guide-main")), "Missing target should fall back to the usable static Guide");

  const failedAsset = await newPage(browser, baseUrl, { abortDriver: true });
  await failedAsset.page.goto(`${baseUrl}/guide/maze/?guided=maze-search`, { waitUntil: "domcontentloaded" });
  await failedAsset.page.waitForFunction(() => !new URL(location.href).searchParams.has("guided"));
  expect((await failedAsset.page.$$(".driver-popover")).length === 0 && Boolean(await failedAsset.page.$("#maze-guide-main")), "Driver load failure should leave the static Guide usable without an overlay");
  await failedAsset.page.close();

  await page.setViewport({ width: 390, height: 844 });
  await gotoStep(page, baseUrl, 2);
  const mobile = await tourState(page);
  const mobileGeometry = await page.$eval(".driver-popover", (element) => {
    const box = element.getBoundingClientRect();
    return { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width, viewportWidth: innerWidth, viewportHeight: innerHeight };
  });
  expect(mobile.overflow <= 1, "Mobile guided route should not overflow horizontally");
  expect(mobileGeometry.left >= 0 && mobileGeometry.right <= mobileGeometry.viewportWidth + 1 && mobileGeometry.bottom <= mobileGeometry.viewportHeight + 1, "Mobile popover and controls should remain inside the viewport");
  if (reviewMode) await page.screenshot({ path: path.join(witnessDirectory, "03-step-3-mobile-390x844.png"), fullPage: false });
  await page.setViewport({ width: 1440, height: 1000 });
  await new Promise((resolve) => setTimeout(resolve, 600));
  const expanded = await tourState(page);
  expect(expanded.overflow <= 1 && expanded.activeId === "recovery", "Active tour should survive narrow-to-desktop resize without losing its step");
  await page.setViewport({ width: 768, height: 900 });
  await new Promise((resolve) => setTimeout(resolve, 600));
  expect((await tourState(page)).overflow <= 1, "768px guided route should not overflow horizontally");
  await page.keyboard.press("Escape");
  await expectClean(page, "Resize cleanup");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await gotoStep(page, baseUrl, 0);
  const reduced = await page.evaluate(() => ({
    bodyClasses: [...document.body.classList],
    popoverTransition: getComputedStyle(document.querySelector(".driver-popover")).transitionDuration,
    targetTransition: getComputedStyle(document.querySelector(".driver-active-element")).transitionDuration
  }));
  observations.reducedMotion = reduced;
  expect(reduced.bodyClasses.includes("driver-simple") || reduced.popoverTransition === "0s", "OS reduced motion should disable Driver animation");
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("vm:reduce-motion-change", { detail: { reduceMotion: true } })));
  await expectClean(page, "Mid-tour motion change");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "domcontentloaded" });
  await page.evaluate(async () => {
    const { renderQueryInspector } = await import("/assets/js/maze/research-ui.js");
    renderQueryInspector({ query: "c:r type:vampire", inputValue: "red vampires", normalized: true, diagnostics: [{ level: "warning", message: "test" }] });
  });
  const beacon = await page.$eval(".qi-guide-link", (element) => ({ href: element.getAttribute("href"), text: element.textContent.replace(/\s+/g, " ").trim() }));
  expect(beacon.href === "../guide/maze/?guided=maze-search" && beacon.text.includes("Walk me through this search"), "Maze Beacon should expose the exact guided destination and approved wording");
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click(".qi-guide-link")]);
  await waitForTour(page);
  await page.goBack({ waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname === "/maze/" && (await page.$$(".driver-popover")).length === 0, "Back mid-tour should return to Maze without blocking or reopening guided reading");

  async function launchFromMaze() {
    await page.goto(`${baseUrl}/maze/`, { waitUntil: "domcontentloaded" });
    await page.evaluate(async () => {
      const { renderQueryInspector } = await import("/assets/js/maze/research-ui.js");
      renderQueryInspector({ query: "c:r", inputValue: "red", normalized: true, diagnostics: [{ level: "warning", message: "test" }] });
    });
    await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click(".qi-guide-link")]);
    await waitForTour(page);
  }

  await launchFromMaze();
  for (let index = 0; index < 3; index += 1) {
    await page.click(".driver-popover-next-btn");
    await new Promise((resolve) => setTimeout(resolve, 450));
  }
  await page.click(".driver-popover-next-btn");
  await expectClean(page, "Done history");
  await page.goBack({ waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname === "/maze/", "Done then Back should return to Maze without a guided/static loop");

  await launchFromMaze();
  await page.click(".driver-popover-close-btn");
  await expectClean(page, "Close history");
  await page.goBack({ waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname === "/maze/", "Close then Back should return to Maze without a guided/static loop");

  await page.goto(`${baseUrl}/guide/maze/`, { waitUntil: "domcontentloaded" });
  for (const exit of ["done", "close", "escape"]) {
    await page.evaluate(async () => {
      history.replaceState(history.state, "", "/guide/maze/?guided=maze-search");
      const module = await import("/assets/js/guide/maze-walkthrough.js");
      await module.bootMazeWalkthrough();
    });
    await waitForTour(page);
    expect((await tourState(page)).overlayCount === 1, `Replay ${exit} should create only one overlay`);
    if (exit === "done") {
      for (let index = 0; index < 4; index += 1) {
        await page.click(".driver-popover-next-btn");
        if (index < 3) await new Promise((resolve) => setTimeout(resolve, 450));
      }
    } else if (exit === "close") {
      await page.click(".driver-popover-close-btn");
    } else {
      await page.keyboard.press("Escape");
    }
    await expectClean(page, `Replay ${exit}`);
  }

  expect(errors.length === 0, `Rendered guided route should not raise page errors: ${errors.join(" | ")}`);
  observations.preExistingMazeShellThirdPartyRequests = [...new Set(requests.filter((url) => !url.startsWith(baseUrl)))];
  observations.finalUrl = page.url();

  if (failures.length) {
    console.error(`VM-619 guided-reading browser validation failed (${failures.length}):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log("VM-619 guided-reading browser validation passed.");
    console.log(JSON.stringify(observations, null, 2));
  }
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}

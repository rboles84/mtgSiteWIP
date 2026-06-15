import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const routePath = "/apocrypha/index.html";
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const captureConfigs = [
  { name: "hero-desktop", width: 1440, height: 1150, state: "hero" },
  { name: "hero-mobile", width: 390, height: 1300, state: "hero" },
  { name: "references-desktop", width: 1280, height: 1400, state: "references" },
];
const artifactsRoot = path.join(root, "artifacts", "visual-regression", "apocrypha");
const baselineDir = path.join(artifactsRoot, "baseline");
const currentDir = path.join(artifactsRoot, "current");
const diffDir = path.join(artifactsRoot, "diff");
const baselineConsolePath = path.join(baselineDir, "console-baseline.json");
const currentConsolePath = path.join(currentDir, "console-current.json");
const threshold = 0.1;
const maxMismatchedPixels = 400;
const requiredBaselineArtifacts = [
  "console-baseline.json",
  "hero-desktop.png",
  "hero-mobile.png",
  "references-desktop.png",
];
const modeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode = modeArg ? modeArg.slice("--mode=".length) : "compare";

if (!["baseline", "compare"].includes(mode)) {
  throw new Error(`Unsupported mode "${mode}". Use --mode=baseline or --mode=compare.`);
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function resolveBrowserPath() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next candidate or allow auto-detect.
    }
  }

  return null;
}

async function resolveFile(requestPath) {
  const normalized = decodeURIComponent(requestPath.split("?")[0]);
  const relativePath = normalized.endsWith("/")
    ? path.join(normalized, "index.html")
    : normalized;
  const resolvedPath = path.resolve(root, `.${relativePath}`);

  if (!resolvedPath.startsWith(root)) {
    throw new Error("Refusing to serve a path outside the workspace.");
  }

  const fileStat = await stat(resolvedPath);
  if (fileStat.isDirectory()) {
    return path.join(resolvedPath, "index.html");
  }

  return resolvedPath;
}

function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const filePath = await resolveFile(req.url ?? "/");
      const body = await readFile(filePath);
      const contentType =
        mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
      send(res, 200, body, contentType);
    } catch (error) {
      if (error?.code === "ENOENT") {
        send(res, 404, "Not found");
        return;
      }

      send(res, 500, error instanceof Error ? error.message : "Server error");
    }
  });
  const sockets = new Set();

  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });

  server.forceShutdown = () => {
    server.closeIdleConnections?.();
    server.closeAllConnections?.();
    for (const socket of sockets) {
      socket.destroy();
    }
  };

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve(server));
  });
}

async function waitForDevtools(port, retries = 40, delayMs = 500) {
  const endpoint = `http://${host}:${port}/json/version`;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until the browser exposes the debugging endpoint.
    }

    await delay(delayMs);
  }

  throw new Error(`Failed to connect to the browser DevTools endpoint at ${endpoint}.`);
}

async function ensureDirs() {
  await mkdir(baselineDir, { recursive: true });
  await mkdir(currentDir, { recursive: true });
  await mkdir(diffDir, { recursive: true });
}

function normalizeErrors(errors) {
  return [...new Set(errors.map((entry) => JSON.stringify(entry)))]
    .sort()
    .map((entry) => JSON.parse(entry));
}

function isIgnorableConsoleError(entry) {
  const url = entry?.location?.url ?? "";
  const text = entry?.text ?? "";
  return (
    url.endsWith("/favicon.ico") ||
    url.startsWith("https://fonts.googleapis.com/") ||
    url.startsWith("https://fonts.gstatic.com/") ||
    text.includes("fonts.googleapis.com") ||
    text.includes("fonts.gstatic.com")
  );
}

async function verifyCanvasExists(page, selector, label) {
  await page.waitForSelector(selector);
  const present = await page.evaluate((targetSelector) => {
    const canvas = document.querySelector(targetSelector);
    return (
      canvas instanceof HTMLCanvasElement &&
      canvas.width > 0 &&
      canvas.height > 0 &&
      canvas.getBoundingClientRect().width > 0 &&
      canvas.getBoundingClientRect().height > 0
    );
  }, selector);

  if (!present) {
    throw new Error(`${label} was not present and sized before capture.`);
  }
}

async function waitForApocryphaReady(page) {
  await page.waitForFunction(() => {
    const title = document.getElementById("apocrypha-title");
    const libraryGroups = [...document.querySelectorAll(".apoc-library-group")];
    const officialGroup = libraryGroups.find((group) => {
      const kicker = group.querySelector(".vm-card-kicker");
      return kicker?.textContent?.trim() === "Official Wizards / Mark Rosewater";
    });
    const officialLinks = officialGroup?.querySelectorAll(".apoc-reference-links a") ?? [];
    const existingReferenceLinks = libraryGroups
      .filter((group) => group !== officialGroup)
      .reduce((count, group) => count + group.querySelectorAll(".apoc-reference-card a").length, 0);
    const rail = document.querySelector(".apoc-rail");
    const dock = document.getElementById("apocReturnDock");
    const status = document.querySelector(".apoc-hero__status");
    const signalItems = document.querySelectorAll(".apoc-signal-item");

    return Boolean(
      title &&
      title.textContent?.includes("The Apocrypha") &&
      officialLinks.length === 39 &&
      existingReferenceLinks === 10 &&
      rail &&
      dock &&
      status &&
      signalItems.length === 3
    );
  });
  await verifyCanvasExists(page, ".vm-bg__stars", "Background star canvas");
}

async function verifyNoHorizontalOverflow(page, label) {
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
  });

  if (hasOverflow) {
    throw new Error(`${label} introduced horizontal overflow.`);
  }
}

async function disableMotionForCapture(page) {
  await page.addStyleTag({
    content: `
      html {
        scroll-behavior: auto !important;
      }

      .vm-bg__stars {
        visibility: hidden !important;
      }

      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
      }
    `,
  });
}

async function prepareHeroCapture(page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => window.scrollY === 0);
}

async function prepareReferencesCapture(page) {
  await page.evaluate(() => {
    document.getElementById("ledger")?.scrollIntoView({ block: "start" });
  });
  await page.waitForFunction(() => {
    const current = document.querySelector('[data-rail-link="ledger"]');
    return current?.getAttribute("aria-current") === "true" || window.scrollY > 0;
  });
}

async function prepareCaptureState(page, captureConfig) {
  if (captureConfig.state === "references") {
    await prepareReferencesCapture(page);
  } else {
    await prepareHeroCapture(page);
  }

  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
}

async function verifyLibraryAlias(browser, baseUrl) {
  const page = await browser.newPage();

  try {
    await page.goto(`${baseUrl}/library/`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => location.pathname.includes("/apocrypha/"), { timeout: 5000 });
  } finally {
    await page.close();
  }
}

async function verifyBaselineArtifacts() {
  const missingArtifacts = [];

  for (const artifact of requiredBaselineArtifacts) {
    try {
      await stat(path.join(baselineDir, artifact));
    } catch (error) {
      if (error?.code === "ENOENT") {
        missingArtifacts.push(artifact);
        continue;
      }

      throw error;
    }
  }

  if (missingArtifacts.length) {
    throw new Error(
      `Missing baseline artifact(s): ${missingArtifacts.join(", ")}. ` +
      "Run npm.cmd run test:visual:apocrypha:baseline first."
    );
  }
}

async function capturePage(browser, url, captureConfig) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    consoleErrors.push({
      capture: captureConfig.name,
      type: message.type(),
      text: message.text(),
      location: message.location(),
    });
  });

  page.on("pageerror", (error) => {
    pageErrors.push({
      capture: captureConfig.name,
      name: error.name,
      message: error.message,
    });
  });

  await page.setViewport({
    width: captureConfig.width,
    height: captureConfig.height,
    deviceScaleFactor: 1,
  });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.evaluateOnNewDocument((seed) => {
    const seededRandom = (() => {
      let state = seed >>> 0;
      return () => {
        state = (1664525 * state + 1013904223) >>> 0;
        return state / 0x100000000;
      };
    })();

    const originalRandom = Math.random;
    Math.random = () => seededRandom();
    Object.defineProperty(window, "__vmOriginalRandom", {
      configurable: true,
      enumerable: false,
      value: originalRandom,
      writable: false,
    });

    try {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("vm_reduce_motion", "true");
    } catch {
      // Ignore storage access failures.
    }
  }, 134);

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForFunction(() => Boolean(document.fonts));
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await waitForApocryphaReady(page);
  await disableMotionForCapture(page);
  await prepareCaptureState(page, captureConfig);
  await verifyNoHorizontalOverflow(page, captureConfig.name);

  const screenshotPath = path.join(
    mode === "baseline" ? baselineDir : currentDir,
    `${captureConfig.name}.png`
  );
  await page.screenshot({
    path: screenshotPath,
    fullPage: false,
  });

  await page.close();
  return { screenshotPath, consoleErrors, pageErrors };
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function compareScreenshots(captureConfig) {
  const baselinePng = PNG.sync.read(await readFile(path.join(baselineDir, `${captureConfig.name}.png`)));
  const currentPng = PNG.sync.read(await readFile(path.join(currentDir, `${captureConfig.name}.png`)));

  if (baselinePng.width !== currentPng.width || baselinePng.height !== currentPng.height) {
    throw new Error(`${captureConfig.name} screenshot dimensions do not match baseline.`);
  }

  const diffPng = new PNG({ width: baselinePng.width, height: baselinePng.height });
  const mismatchedPixels = pixelmatch(
    baselinePng.data,
    currentPng.data,
    diffPng.data,
    baselinePng.width,
    baselinePng.height,
    { threshold }
  );

  await writeFile(path.join(diffDir, `${captureConfig.name}.png`), PNG.sync.write(diffPng));
  return mismatchedPixels;
}

function collectNewErrors(baseline, current) {
  const baselineSet = new Set(baseline.map((entry) => JSON.stringify(entry)));
  return current.filter((entry) => !baselineSet.has(JSON.stringify(entry)));
}

const server = await startServer();
const address = server.address();

if (!address || typeof address === "string") {
  server.close();
  throw new Error("Could not determine the local visual-regression server port.");
}

const baseUrl = `http://${host}:${address.port}`;
const url = `${baseUrl}${routePath}`;
const chromePath = await resolveBrowserPath();
const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--force-color-profile=srgb",
];
let launchedChrome;
let browser;

try {
  await ensureDirs();
  if (mode === "compare") {
    await verifyBaselineArtifacts();
  }

  launchedChrome = await ChromeLauncher.launch({
    chromeFlags,
    chromePath: chromePath ?? undefined,
    logLevel: "silent",
  });

  await waitForDevtools(launchedChrome.port);
  browser = await puppeteer.connect({
    browserURL: `http://${host}:${launchedChrome.port}`,
  });

  await verifyLibraryAlias(browser, baseUrl);

  const allConsoleErrors = [];
  const allPageErrors = [];

  for (const captureConfig of captureConfigs) {
    const capture = await capturePage(browser, url, captureConfig);
    allConsoleErrors.push(...capture.consoleErrors);
    allPageErrors.push(...capture.pageErrors);
  }

  const normalizedConsoleErrors = normalizeErrors(
    allConsoleErrors.filter((entry) => !isIgnorableConsoleError(entry))
  );
  const normalizedPageErrors = normalizeErrors(allPageErrors);
  const currentConsolePayload = {
    url,
    consoleErrors: normalizedConsoleErrors,
    pageErrors: normalizedPageErrors,
  };

  if (mode === "baseline") {
    await writeJson(baselineConsolePath, currentConsolePayload);
    console.log(`Baseline screenshots written to ${baselineDir}`);
    console.log(`Baseline console contract written to ${baselineConsolePath}`);
  } else {
    let baselineConsolePayload;
    try {
      baselineConsolePayload = JSON.parse(await readFile(baselineConsolePath, "utf8"));
    } catch {
      throw new Error(`Missing baseline console contract at ${baselineConsolePath}. Run baseline mode first.`);
    }

    await writeJson(currentConsolePath, currentConsolePayload);

    let failed = false;
    for (const captureConfig of captureConfigs) {
      const mismatchedPixels = await compareScreenshots(captureConfig);
      console.log(`${captureConfig.name}: ${mismatchedPixels} mismatched pixels`);
      if (mismatchedPixels > maxMismatchedPixels) {
        failed = true;
        console.error(
          `${captureConfig.name} exceeded mismatch budget (${mismatchedPixels} > ${maxMismatchedPixels}).`
        );
      }
    }

    const newConsoleErrors = collectNewErrors(
      baselineConsolePayload.consoleErrors ?? [],
      currentConsolePayload.consoleErrors
    );
    const newPageErrors = collectNewErrors(
      baselineConsolePayload.pageErrors ?? [],
      currentConsolePayload.pageErrors
    );

    if (newConsoleErrors.length || newPageErrors.length) {
      failed = true;
      console.error("New console/page errors were introduced beyond the saved baseline contract.");
      if (newConsoleErrors.length) {
        console.error(`New console errors: ${JSON.stringify(newConsoleErrors, null, 2)}`);
      }
      if (newPageErrors.length) {
        console.error(`New page errors: ${JSON.stringify(newPageErrors, null, 2)}`);
      }
    }

    if (failed) {
      process.exitCode = 1;
    } else {
      console.log(`Visual comparison passed within the ${maxMismatchedPixels}-pixel budget for all captures.`);
    }
  }
} catch (error) {
  process.exitCode = 1;
  console.error("Visual regression run failed.");
  console.error(error instanceof Error ? error.message : String(error));
} finally {
  if (browser) {
    try {
      await Promise.race([browser.close(), delay(2000)]);
    } catch {
      try {
        browser.disconnect();
      } catch {
        // Ignore disconnect failures.
      }
    }
  }

  if (launchedChrome) {
    try {
      await Promise.race([launchedChrome.kill(), delay(2000)]);
    } catch {
      // Ignore browser cleanup failures.
    }
  }

  server.forceShutdown?.();
  await Promise.race([new Promise((resolve) => server.close(resolve)), delay(2000)]);
  process.exit(process.exitCode ?? 0);
}

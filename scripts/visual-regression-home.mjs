import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const viewportConfigs = [
  { name: "mobile", width: 375, height: 2200 },
  { name: "tablet", width: 768, height: 2200 },
  { name: "desktop", width: 1440, height: 2200 },
];
const artifactsRoot = path.join(root, "artifacts", "visual-regression", "home");
const baselineDir = path.join(artifactsRoot, "baseline");
const currentDir = path.join(artifactsRoot, "current");
const diffDir = path.join(artifactsRoot, "diff");
const baselineConsolePath = path.join(baselineDir, "console-baseline.json");
const currentConsolePath = path.join(currentDir, "console-current.json");
const threshold = 0.1;
const maxMismatchedPixels = 300;
const captureHeroIdentityId = "boros";
const requiredBaselineArtifacts = ["console-baseline.json", "mobile.png", "tablet.png", "desktop.png"];
const modeArg = process.argv.find(arg => arg.startsWith("--mode="));
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
  return new Promise(resolve => setTimeout(resolve, ms));
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
      const contentType = mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
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

  server.on("connection", socket => {
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

    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  throw new Error(`Failed to connect to the browser DevTools endpoint at ${endpoint}.`);
}

async function ensureDirs() {
  await mkdir(baselineDir, { recursive: true });
  await mkdir(currentDir, { recursive: true });
  await mkdir(diffDir, { recursive: true });
}

function normalizeErrors(errors) {
  return [...new Set(errors.map(entry => JSON.stringify(entry)))].sort().map(entry => JSON.parse(entry));
}

function isIgnorableConsoleError(entry) {
  const url = entry?.location?.url ?? "";
  const text = entry?.text ?? "";
  return (
    url.endsWith("/favicon.ico") ||
    url.startsWith("https://fonts.googleapis.com/") ||
    text.includes("fonts.googleapis.com")
  );
}

async function verifyCanvasPresent(page, selector, label) {
  await page.waitForSelector(selector);
  const present = await page.evaluate(targetSelector => {
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

async function verifyCanvasRendered(page, selector, label) {
  await page.waitForSelector(selector);
  const rendered = await page.evaluate(targetSelector => {
    const canvas = document.querySelector(targetSelector);
    if (!(canvas instanceof HTMLCanvasElement)) return false;
    if (canvas.width === 0 || canvas.height === 0) return false;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return false;

    const sampleWidth = Math.max(1, Math.min(canvas.width, 24));
    const sampleHeight = Math.max(1, Math.min(canvas.height, 24));
    const xSteps = Math.max(1, Math.min(5, Math.floor(canvas.width / sampleWidth)));
    const ySteps = Math.max(1, Math.min(5, Math.floor(canvas.height / sampleHeight)));

    for (let xIndex = 0; xIndex < xSteps; xIndex += 1) {
      for (let yIndex = 0; yIndex < ySteps; yIndex += 1) {
        const maxX = Math.max(0, canvas.width - sampleWidth);
        const maxY = Math.max(0, canvas.height - sampleHeight);
        const x = xSteps === 1 ? 0 : Math.round((maxX * xIndex) / (xSteps - 1));
        const y = ySteps === 1 ? 0 : Math.round((maxY * yIndex) / (ySteps - 1));
        const image = context.getImageData(x, y, sampleWidth, sampleHeight);
        for (let index = 3; index < image.data.length; index += 4) {
          if (image.data[index] > 0) {
            return true;
          }
        }
      }
    }

    return false;
  }, selector);

  if (!rendered) {
    throw new Error(`${label} did not render visible pixels before capture.`);
  }
}

async function verifyHeroManaCaptureState(page) {
  const state = await page.evaluate(() => ({
    datasetText: document.getElementById("heroManaDatasetPills")?.textContent ?? "",
    title: document.getElementById("heroManaTitle")?.textContent ?? "",
    signalState: document.getElementById("heroManaSignalState")?.textContent ?? "",
    intervalCalls: window.__vmIntervalCallCount ?? 0,
  }));

  for (const expectedText of ["White", "Red", "Boros"]) {
    if (!state.datasetText.includes(expectedText)) {
      throw new Error(`Forced Boros hero capture did not render ${expectedText} in the overlay pills.`);
    }
  }

  if (!state.title.includes("Boros")) {
    throw new Error("Forced Boros hero capture did not resolve the registry alias to Boros.");
  }

  if (state.signalState !== "Still") {
    throw new Error(`Reduced-motion hero capture should report Still, found "${state.signalState}".`);
  }

  if (state.intervalCalls !== 0) {
    throw new Error("Reduced-motion hero capture should not start the Mana Lens interval.");
  }
}

async function verifyHeroManaCycleInteraction(browser, url) {
  const page = await browser.newPage();

  try {
    await page.setViewport({
      width: 1024,
      height: 1000,
      deviceScaleFactor: 1,
    });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await page.evaluateOnNewDocument(identityId => {
      const originalSetInterval = window.setInterval.bind(window);

      window.setInterval = (handler, timeout, ...args) => {
        const tunedTimeout = timeout === 9000 ? 60 : timeout;
        return originalSetInterval(handler, tunedTimeout, ...args);
      };

      Object.defineProperty(window, "__vmVisualRegressionHeroIdentityId", {
        configurable: true,
        enumerable: false,
        value: identityId,
        writable: false,
      });

      try {
        localStorage.removeItem("vm_reduce_motion");
      } catch {
        // Ignore storage access failures.
      }
    }, "W");

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.readyState === "complete");
    await page.waitForSelector("#heroManaTitle");
    await page.waitForFunction(() => document.getElementById("heroManaTitle")?.textContent?.includes("White"));

    const initialTitle = await page.$eval("#heroManaTitle", node => node.textContent);
    await page.waitForFunction(
      title => document.getElementById("heroManaTitle")?.textContent !== title,
      { timeout: 1000 },
      initialTitle
    );

    await page.evaluate(() => {
      const panel = document.querySelector(".vm-hero-mana");
      if (!panel) return;
      panel.dispatchEvent(new PointerEvent("pointerenter"));
      panel.dispatchEvent(new MouseEvent("mouseenter"));
    });

    const pausedTitle = await page.$eval("#heroManaTitle", node => node.textContent);
    await delay(180);
    const titleAfterPause = await page.$eval("#heroManaTitle", node => node.textContent);
    if (titleAfterPause !== pausedTitle) {
      throw new Error("Home Mana Lens changed identities while reader hover pause was active.");
    }

    await page.evaluate(() => {
      const panel = document.querySelector(".vm-hero-mana");
      if (!panel) return;
      panel.dispatchEvent(new PointerEvent("pointerleave"));
      panel.dispatchEvent(new MouseEvent("mouseleave"));
    });

    await page.waitForFunction(
      title => document.getElementById("heroManaTitle")?.textContent !== title,
      { timeout: 1000 },
      pausedTitle
    );
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
      "Run npm.cmd run test:visual:home:baseline first."
    );
  }
}

async function capturePage(browser, url, viewport, screenshotDir) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", message => {
    if (message.type() !== "error") return;
    consoleErrors.push({
      type: message.type(),
      text: message.text(),
      location: message.location(),
    });
  });

  page.on("pageerror", error => {
    pageErrors.push({
      name: error.name,
      message: error.message,
    });
  });

  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
  });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.evaluateOnNewDocument(seed => {
    const seededRandom = (() => {
      let state = seed.randomSeed >>> 0;
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
    Object.defineProperty(window, "__vmVisualRegressionHeroIdentityId", {
      configurable: true,
      enumerable: false,
      value: seed.identityId,
      writable: false,
    });
    Object.defineProperty(window, "__vmIntervalCallCount", {
      configurable: true,
      enumerable: false,
      value: 0,
      writable: true,
    });

    const originalSetInterval = window.setInterval.bind(window);
    window.setInterval = (handler, timeout, ...args) => {
      window.__vmIntervalCallCount += 1;
      return originalSetInterval(handler, timeout, ...args);
    };

    try {
      localStorage.setItem("vm_reduce_motion", "true");
    } catch {
      // Ignore storage access failures.
    }
  }, { randomSeed: 121, identityId: captureHeroIdentityId });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForFunction(() => Boolean(document.fonts));
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForSelector("#vmHeroManaChart");
  await page.waitForFunction(() => {
    const heroCanvas = document.getElementById("vmHeroManaChart");
    const datasetPills = document.getElementById("heroManaDatasetPills");
    return Boolean(
      heroCanvas &&
      heroCanvas.clientWidth > 0 &&
      heroCanvas.clientHeight > 0 &&
      datasetPills &&
      datasetPills.textContent &&
      datasetPills.textContent.trim().length > 0
    );
  });
  await page.waitForFunction(() => Boolean(
    window.Chart &&
    document.getElementById("heroManaTitle")?.textContent?.includes("Boros")
  ));
  await verifyCanvasPresent(page, ".vm-bg__stars", "Background star canvas");
  await verifyCanvasRendered(page, "#vmHeroManaChart", "Hero radar canvas");
  await verifyHeroManaCaptureState(page);
  await page.addStyleTag({
    content: `
      .vm-bg__stars,
      #vmHeroManaChart,
      .vm-radar-glow {
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
  await page.evaluate(() => {
    document.querySelectorAll("svg").forEach(svg => {
      if (typeof svg.pauseAnimations === "function") {
        svg.pauseAnimations();
      }
      if (typeof svg.setCurrentTime === "function") {
        svg.setCurrentTime(0);
      }
    });
  });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));

  const screenshotPath = path.join(screenshotDir, `${viewport.name}.png`);
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

async function compareScreenshots(viewport) {
  const baselinePng = PNG.sync.read(await readFile(path.join(baselineDir, `${viewport.name}.png`)));
  const currentPng = PNG.sync.read(await readFile(path.join(currentDir, `${viewport.name}.png`)));

  if (baselinePng.width !== currentPng.width || baselinePng.height !== currentPng.height) {
    throw new Error(`${viewport.name} screenshot dimensions do not match baseline.`);
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

  await writeFile(path.join(diffDir, `${viewport.name}.png`), PNG.sync.write(diffPng));
  return mismatchedPixels;
}

function collectNewErrors(baseline, current) {
  const baselineSet = new Set(baseline.map(entry => JSON.stringify(entry)));
  return current.filter(entry => !baselineSet.has(JSON.stringify(entry)));
}

const server = await startServer();
const address = server.address();

if (!address || typeof address === "string") {
  server.close();
  throw new Error("Could not determine the local visual-regression server port.");
}

const url = `http://${host}:${address.port}/index.html`;
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

  const captures = [];
  const allConsoleErrors = [];
  const allPageErrors = [];
  const screenshotDir = mode === "baseline" ? baselineDir : currentDir;

  for (const viewport of viewportConfigs) {
    const capture = await capturePage(browser, url, viewport, screenshotDir);
    captures.push({ viewport: viewport.name, screenshotPath: capture.screenshotPath });
    allConsoleErrors.push(...capture.consoleErrors.map(error => ({ viewport: viewport.name, ...error })));
    allPageErrors.push(...capture.pageErrors.map(error => ({ viewport: viewport.name, ...error })));
  }

  await verifyHeroManaCycleInteraction(browser, url);

  const normalizedConsoleErrors = normalizeErrors(allConsoleErrors.filter(error => !isIgnorableConsoleError(error)));
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
    for (const viewport of viewportConfigs) {
      const mismatchedPixels = await compareScreenshots(viewport);
      console.log(`${viewport.name}: ${mismatchedPixels} mismatched pixels`);
      if (mismatchedPixels > maxMismatchedPixels) {
        failed = true;
        console.error(`${viewport.name} exceeded mismatch budget (${mismatchedPixels} > ${maxMismatchedPixels}).`);
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
      console.log(`Visual comparison passed within the ${maxMismatchedPixels}-pixel budget for all viewports.`);
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
      // Ignore profile cleanup failures.
    }
  }

  server.forceShutdown?.();
  await Promise.race([new Promise(resolve => server.close(resolve)), delay(2000)]);
  process.exit(process.exitCode ?? 0);
}

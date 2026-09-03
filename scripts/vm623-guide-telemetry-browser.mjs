import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

const root = process.cwd();
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

async function findBrowser() {
  for (const candidate of browserCandidates) {
    if (await stat(candidate).then(() => true).catch(() => false)) return candidate;
  }
  throw new Error("No supported local Chromium browser was found for VM-623 validation.");
}

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
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
      let filePath = path.resolve(root, `.${decodeURIComponent(requestUrl.pathname)}`);
      if (!filePath.startsWith(path.resolve(root))) return response.writeHead(403).end("Forbidden");
      if ((await stat(filePath)).isDirectory()) filePath = path.join(filePath, "index.html");
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(await readFile(filePath));
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  const port = Number.parseInt(process.env.VM623_BROWSER_PORT || "", 10) || 0;
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return { server, baseUrl: `http://localhost:${server.address().port}` };
}

const { server, baseUrl } = await startServer();
let browser;
try {
  browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  const requests = [];
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("request", (request) => {
    requests.push(request.url());
    if (request.url().startsWith(baseUrl)) request.continue();
    else request.abort();
  });

  await page.goto(`${baseUrl}/guide/reading/?vox_telemetry=mock&guided=dossier-reading`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(() => window.__VOX_TELEMETRY_EVENTS__?.some(
    ({ event, properties }) => event === "guide_walkthrough" &&
      properties.walkthrough_id === "dossier-reading" &&
      properties.state === "started" &&
      properties.step_index === 1,
  ));

  const runtime = await page.evaluate(() => ({
    events: window.__VOX_TELEMETRY_EVENTS__,
    posthogLoaded: Boolean(window.posthog),
  }));
  assert.deepEqual(consoleErrors, [], `Guide runtime errors: ${consoleErrors.join(" | ")}`);
  assert.ok(Array.isArray(runtime.events), "mock mode must expose its page-local event array");
  assert.ok(runtime.events.some(({ event }) => event === "guide_opened"));
  assert.ok(runtime.events.some(({ event, properties }) => event === "guide_walkthrough" &&
    properties.walkthrough_id === "dossier-reading" &&
    properties.state === "started" &&
    properties.step_index === 1));
  assert.equal(runtime.posthogLoaded, false, "mock mode must not load PostHog");
  assert.equal(requests.some((url) => /posthog/i.test(url)), false, "mock mode must not request PostHog");
  console.log("VM-623 Guide telemetry browser import and mock lifecycle test passed.");
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}

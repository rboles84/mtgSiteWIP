import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

import {
  evaluateBeforeGame,
  evaluateDuringGame,
  evaluateFindTable,
  generatePregameStatement,
  lifecycleConfigs,
} from "../assets/js/strategium-lifecycle.js";

const root = process.cwd();
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
  throw new Error("No supported local Chromium browser was found for Strategium lifecycle validation.");
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

function defaultOption(question) {
  return question.options.find(option => option.id === "none") || question.options[0];
}

function optionPath(config, stageIndex, optionId) {
  return config.questions.map((question, index) => {
    if (index === stageIndex) return optionId;
    return defaultOption(question).id;
  }).join("/").replace(/\//g, "/");
}

function collectVisibleText(page) {
  return page.$eval("#strategiumLifecycle", node => node.innerText);
}

async function run() {
  expect(Object.keys(lifecycleConfigs).length === 3, "three new lifecycle route configurations should exist");
  expect(lifecycleConfigs["find-a-table"].questions.length === 5, "Finding a Table should remain compact");
  expect(lifecycleConfigs["before-game"].questions.length === 6, "Before the Game should be the deepest new route");
  expect(lifecycleConfigs["during-game"].questions.length === 2, "During the Game should stay thin");

  const stableFind = evaluateFindTable({ experience: "social", pace: "develop", uncertainty: "predictable", disruption: "light", table: "clear" });
  expect(JSON.stringify(stableFind) === JSON.stringify(evaluateFindTable({ experience: "social", pace: "develop", uncertainty: "predictable", disruption: "light", table: "clear" })), "Finding a Table result logic should be deterministic");
  const emptyStatement = generatePregameStatement({});
  expect(!/undefined|null|\.{2,}|,\s*[.;]/i.test(emptyStatement), "empty pregame fields should not create broken punctuation or missing values");
  const fullStatement = generatePregameStatement({ bracket: "approximate-3", deck: "combo", win: "combo", speed: "early", surprises: ["combo", "proxies"], agreements: ["time"] });
  expect(fullStatement.split(/[.!?]+/).filter(Boolean).length <= 2, "pregame statement should stay within two natural sentences");
  expect(!/Timmy|Tammy|Johnny|Jenny|Spike|Quandrix|Silverquill|Prismari|Lorehold|Witherbloom/i.test(fullStatement), "player-model labels should not leak into pregame output");
  const duringRules = evaluateDuringGame({ moment: "rules", response: "lookup" });
  const duringText = JSON.stringify(duringRules);
  expect(/official rules lookup|does not decide the ruling/i.test(duringText), "rules-dispute output should route to an official or agreed resource");
  expect(!/attack|target|optimal|best line|threat score|percentage|%/i.test(duringText), "During the Game output should not recommend targets or tactical play");
  const allOutputText = JSON.stringify({ stableFind, fullStatement, duringRules, before: evaluateBeforeGame({ bracket: "unsure", deck: "unsure", win: "unsure", speed: "variable", surprises: ["none"], agreements: ["none"] }) });
  expect(!/%|compatibility score|rating/i.test(allOutputText), "lifecycle logic should not present scores, percentages, or ratings as truth");

  const { server, baseUrl } = await startServer();
  const browser = await puppeteer.launch({ executablePath: await findBrowser(), headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"] });
  const page = await browser.newPage();
  const browserErrors = [];
  page.on("pageerror", error => browserErrors.push(error.message));
  page.on("requestfailed", request => {
    const url = request.url();
    if (!url.includes("favicon")) browserErrors.push(`request failed: ${url}`);
  });

  try {
    const routeCases = [
      ["find-a-table", "Finding a Table"],
      ["before-game", "Before the Game"],
      ["during-game", "During the Game"],
    ];
    for (const [route, title] of routeCases) {
      await page.goto(`${baseUrl}/strategium/${route}/`, { waitUntil: "networkidle0" });
      expect(await page.$("#strategiumLifecycle") !== null, `${route} should mount its lifecycle flow`);
      expect((await page.title()).includes(title), `${route} should expose route-specific metadata`);
      expect(await page.$eval("#strategiumLifecycle [data-lifecycle-focus]", node => node.textContent.trim()) !== "", `${route} should have a focused first question`);
    }

    await page.goto(`${baseUrl}/strategium/`, { waitUntil: "networkidle0" });
    const hub = await page.$$eval(".vm-lifecycle-links a", links => links.map(link => ({ text: link.textContent.trim(), href: link.getAttribute("href") })));
    expect(hub.length === 4, "hub should expose four chronological lifecycle moments");
    expect(hub.map(item => item.href).join("|") === "./find-a-table/|./before-game/|./during-game/|./review/", "hub lifecycle links should target the correct routes");
    expect(await page.$(".vm-hub-availability") === null, "hub should not restore the removed Guided Moments section");

    for (const [route, config] of Object.entries(lifecycleConfigs)) {
      for (let stageIndex = 0; stageIndex < config.questions.length; stageIndex += 1) {
        const question = config.questions[stageIndex];
        for (const option of question.options) {
          const pathValue = optionPath(config, stageIndex, option.id);
          await page.goto(`${baseUrl}/strategium/${route}/?path=${encodeURIComponent(pathValue)}`, { waitUntil: "networkidle0" });
          expect(await page.$("[data-result-category]") !== null, `${route} option ${question.id}/${option.id} should reach a result`);
          expect(await page.$(".vm-review-recovery") === null, `${route} option ${question.id}/${option.id} should not recover to an earlier step`);
        }
      }
    }

    await page.goto(`${baseUrl}/strategium/find-a-table/`, { waitUntil: "networkidle0" });
    await page.click('[data-lifecycle-option="memorable"]');
    expect(new URL(page.url()).searchParams.get("path") === "memorable", "selecting an answer should update lifecycle history");
    await page.click('[data-lifecycle-action="back"]');
    expect(new URL(page.url()).searchParams.get("path") === null, "back should remove the latest lifecycle answer");
    await page.click('[data-lifecycle-option="memorable"]');
    await page.click('[data-lifecycle-action="reset"]');
    expect(new URL(page.url()).searchParams.get("path") === null && await page.$eval("[data-lifecycle-focus]", node => node.textContent.includes("What kind of game")), "reset should return to the initial question");

    await page.goto(`${baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle/none/none`, { waitUntil: "networkidle0" });
    const statementText = await page.$eval(".vm-lifecycle-statement p", node => node.textContent);
    expect(statementText && !/undefined|null|\.{2,}/i.test(statementText), "pregame result should render a clean spoken statement");
    expect(await page.$(".vm-lifecycle-copy") !== null, "pregame result should offer a copy action");

    await page.goto(`${baseUrl}/strategium/during-game/?path=rules/lookup`, { waitUntil: "networkidle0" });
    const rulesResult = await collectVisibleText(page);
    expect(/official rule|judge|agreed rules resource/i.test(rulesResult), "rules path should point to a rules resource");
    expect(!/attack|target recommendation|optimal line/i.test(rulesResult), "rules path should not offer tactical advice");

    await page.goto(`${baseUrl}/strategium/review/`, { waitUntil: "networkidle0" });
    expect(await page.$("#strategiumReview") !== null, "After the Game route should remain available");
    await page.goto(`${baseUrl}/strategium/console/`, { waitUntil: "networkidle0" });
    expect(await page.$(".vm-commander-grid") !== null, "Commander Console should remain available");

    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewport({ width, height: width < 500 ? 844 : 900, deviceScaleFactor: 1 });
      await page.goto(`${baseUrl}/strategium/before-game/`, { waitUntil: "networkidle0" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px Before the Game should not overflow horizontally`);
      await page.goto(`${baseUrl}/strategium/during-game/`, { waitUntil: "networkidle0" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px During the Game should not overflow horizontally`);
    }
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }

  expect(browserErrors.length === 0, `browser console/network errors: ${browserErrors.join(" | ")}`);
  if (failures.length) {
    throw new Error(`Strategium lifecycle validation failed:\n- ${failures.join("\n- ")}`);
  }
  console.log("Strategium lifecycle tests passed: route loading, hub links, all option branches, deterministic outputs, statements, rules safety, history/reset, regressions, and mobile overflow.");
}

await run();

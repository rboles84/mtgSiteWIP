import { access, mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

import puppeteer from "puppeteer-core";

import { startCandidateServer } from "./strategium-owner-review-launch.mjs";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const requestedEvidenceDir = process.argv.find((argument, index) => argument === "--evidence-dir" && process.argv[index + 1]) ? process.argv[process.argv.indexOf("--evidence-dir") + 1] : "docs/qa/evidence/owner-remediation-02";
const evidenceDir = path.isAbsolute(requestedEvidenceDir) ? requestedEvidenceDir : path.join(root, requestedEvidenceDir);
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

const stalePattern = /Which moment do you want to review\?|After the Game is ready now|Start the available review|In development/i;
const failures = [];
const assertions = [];

function check(condition, message) {
  assertions.push({ condition: Boolean(condition), message });
  if (!condition) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Continue through local browser candidates.
    }
  }
  throw new Error("No supported local Chromium browser was found.");
}

async function waitForLifecycle(page) {
  await page.waitForSelector("[data-lifecycle-focus], [data-review-focus]");
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function actionSnapshot(page) {
  return page.$$eval(".vm-review-action", nodes => nodes.map(node => {
    const style = getComputedStyle(node);
    return {
      label: node.textContent.trim(),
      tag: node.tagName,
      borderTopWidth: style.borderTopWidth,
      borderTopColor: style.borderTopColor,
      display: style.display,
    };
  }));
}

async function main() {
  await mkdir(evidenceDir, { recursive: true });
  const server = await startCandidateServer();
  const browserPath = await findBrowser();
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--incognito"],
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const consoleErrors = [];
  const requestFailures = [];
  page.on("console", message => {
    if (["error", "warning"].includes(message.type())) consoleErrors.push(message.text());
  });
  page.on("requestfailed", request => requestFailures.push(`${request.url()} :: ${request.failure()?.errorText || "failed"}`));

  const screenshots = [];
  const capture = async (name) => {
    const file = path.join(evidenceDir, name);
    await page.screenshot({ path: file, fullPage: true });
    screenshots.push(file);
    return file;
  };

  try {
    const direct = `${server.baseUrl}/strategium/review/`;
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(direct, { waitUntil: "networkidle0" });
    await waitForLifecycle(page);
    const directText = await page.$eval("#strategiumReview", node => node.innerText);
    check(await page.$eval("[data-review-focus]", node => node.textContent.trim()) === "What best describes the game?", "direct clean review route opens the first meaningful After-the-Game question");
    check(!stalePattern.test(directText), "direct clean review route contains no stale lifecycle selector copy");
    await capture("direct-clean-review.png");

    await page.goto(`${server.baseUrl}/strategium/`, { waitUntil: "networkidle0" });
    check(await page.$$eval(".vm-console-preview", nodes => nodes.length) === 4, "hub renders all four Commander Console preview concepts");
    const hubGap = await page.$eval(".vm-console-path-card", card => {
      const paragraph = card.querySelector("p").getBoundingClientRect();
      const grid = card.querySelector(".vm-console-preview-grid").getBoundingClientRect();
      return grid.top - paragraph.bottom;
    });
    check(hubGap >= 0 && hubGap <= 24, `hub Console preview gap is composed (${Math.round(hubGap)}px)`);
    await capture("hub-desktop.png");
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.goto(`${server.baseUrl}/strategium/`, { waitUntil: "networkidle0" });
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "hub mobile layout has no horizontal overflow");
    await capture("hub-mobile.png");

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(`${server.baseUrl}/strategium/`, { waitUntil: "networkidle0" });
    await page.click('.vm-lifecycle-links a[href="./review/"]');
    await waitForLifecycle(page);
    const hubClickText = await page.$eval("#strategiumReview", node => node.innerText);
    check(new URL(page.url()).pathname === "/strategium/review/", "hub After-the-Game click reaches the canonical review route");
    check(await page.$eval("[data-review-focus]", node => node.textContent.trim()) === "What best describes the game?", "hub After-the-Game click opens the first meaningful question");
    check(!stalePattern.test(hubClickText), "hub After-the-Game click contains no stale selector copy");
    await capture("hub-click-review.png");

    await page.goto(`${server.baseUrl}/strategium/find-a-table/?path=memorable/develop/predictable/light/clear`, { waitUntil: "networkidle0" });
    await waitForLifecycle(page);
    const findingHeadline = await page.$eval("[data-lifecycle-focus]", node => node.textContent.trim());
    const findingText = await page.$eval(".vm-lifecycle-result", node => node.innerText);
    check((findingText.match(new RegExp(findingHeadline.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"), "g")) || []).length === 1, "Finding-a-Table conclusion appears once");
    check((await page.$$eval(".vm-lifecycle-result-card h3", nodes => nodes.map(node => node.textContent.trim()))).join("|") === "Why this read may apply|One question to ask before joining|A possible mismatch to watch for|You can choose another table", "Finding-a-Table result has four non-duplicate cards");
    check((await actionSnapshot(page)).every(action => action.borderTopWidth !== "0px"), "Finding-a-Table result footer actions are visibly boxed");
    await capture("finding-result-footer.png");

    await page.goto(`${server.baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle`, { waitUntil: "networkidle0" });
    await waitForLifecycle(page);
    check(await page.$eval(".vm-lifecycle-continue", node => node.textContent.trim()) === "Continue to final check", "Before-the-Game Step 5 has the explicit final-check action");
    check(await page.$eval(".vm-lifecycle-continue", node => Boolean(node.closest(".vm-review-nav"))), "Step 5 action is inside the shared footer");
    await capture("before-step5-footer.png");

    await page.goto(`${server.baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle/none`, { waitUntil: "networkidle0" });
    await waitForLifecycle(page);
    check(await page.$$eval(".vm-lifecycle-continue", nodes => nodes.length === 1 && nodes[0].textContent.trim() === "Build my pregame statement"), "Before-the-Game Step 6 has one named result action");
    check(await page.$$eval(".vm-lifecycle-continue", nodes => nodes.every(node => node.closest(".vm-review-nav"))), "Step 6 result action is inside the shared footer");
    check((await actionSnapshot(page)).every(action => action.borderTopWidth !== "0px"), "Step 6 footer actions are visibly boxed");
    await capture("before-step6-before-selection.png");
    await page.click('[data-lifecycle-option="time"]');
    check(await page.$eval(".vm-lifecycle-continue", node => !node.disabled), "valid Step 6 selection visibly enables the primary action");
    await capture("before-step6-after-selection.png");

    await page.goto(`${server.baseUrl}/strategium/before-game/?path=${encodeURIComponent("approximate-3/combo/combo/early/fast-mana~tutors~combo~resource-denial~extra-turns~long-turns~chaos~proxies/time~house-rule~proxies")}`, { waitUntil: "networkidle0" });
    await waitForLifecycle(page);
    const richStatement = await page.$eval(".vm-lifecycle-statement p", node => node.textContent);
    check(richStatement.length <= 360, "disclosure-rich spoken statement stays within the hard length maximum");
    check(richStatement.split(/[.!?]+/).filter(Boolean).length <= 3, "disclosure-rich spoken statement uses at most three sentences");
    check(!/please note|confirm house rule|confirm time limit|\band\b[^.!?]*\band\b[^.!?]*\band\b/i.test(richStatement), "disclosure-rich spoken statement avoids compliance and repeated-conjunction copy");
    check(["intentional combo", "resource denial", "repeated extra turns", "unusually long turns", "proxies"].every(value => richStatement.toLowerCase().includes(value)), "disclosure-rich statement retains every high-impact disclosure");
    const beforeCopy = await page.$eval(".vm-lifecycle-copy", node => ({ label: node.textContent.trim(), ariaLabel: node.getAttribute("aria-label") }));
    check(beforeCopy.label === "Copy", "Before-the-Game copy action has the concise visible label");
    check(beforeCopy.ariaLabel === "Copy pregame statement", "Before-the-Game copy action has a descriptive accessible name");
    await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.__strategiumCopied = text; } } }));
    await page.click(".vm-lifecycle-copy");
    check(await page.evaluate(() => window.__strategiumCopied) === richStatement, "Before-the-Game copy output exactly matches visible statement");
    await capture("before-result-rich-copy.png");

    await page.goto(`${server.baseUrl}/strategium/during-game/?path=rules/lookup`, { waitUntil: "networkidle0" });
    await waitForLifecycle(page);
    const duringHeadings = await page.$$eval(".vm-lifecycle-result-card h3", nodes => nodes.map(node => node.textContent.trim()));
    check(duringHeadings.join("|") === "What may be happening|What to clarify with the table|Available paths|A neutral sentence someone can say", "During-the-Game result places the neutral sentence last");
    const duringCopy = await page.$eval(".vm-lifecycle-copy", node => ({ label: node.textContent.trim(), ariaLabel: node.getAttribute("aria-label") }));
    check(duringCopy.label === "Copy", "During-the-Game copy action has the concise visible label");
    check(duringCopy.ariaLabel === "Copy neutral table-reset sentence", "During-the-Game copy action has a descriptive accessible name");
    const duringPathsLayout = await page.$eval(".vm-lifecycle-paths", node => {
      const card = node.getBoundingClientRect();
      const grid = node.parentElement.getBoundingClientRect();
      return { centerDelta: Math.abs((card.left + card.width / 2) - (grid.left + grid.width / 2)), cardWidth: card.width, gridWidth: grid.width };
    });
    check(duringPathsLayout.centerDelta <= 1, `During-the-Game Available paths card is centered (${Math.round(duringPathsLayout.centerDelta)}px delta)`);
    check(duringPathsLayout.cardWidth < duringPathsLayout.gridWidth, "During-the-Game Available paths card uses a balanced content width");
    check((await actionSnapshot(page)).every(action => action.borderTopWidth !== "0px"), "During-the-Game result footer actions are visibly boxed");
    await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.__strategiumCopied = text; } } }));
    const duringStatement = await page.$eval(".vm-lifecycle-copy-target", node => node.textContent);
    await page.click(".vm-lifecycle-copy");
    check(await page.evaluate(() => window.__strategiumCopied) === duringStatement, "During-the-Game copy output exactly matches visible neutral sentence");
    check(Boolean((await page.$eval(".vm-lifecycle-copy-status", node => node.textContent.trim()))), "During-the-Game copy action provides success feedback");
    await capture("during-result-reordered-copy.png");
    await capture("during-result-copy-success.png");

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.goto(`${server.baseUrl}/strategium/during-game/?path=rules/lookup`, { waitUntil: "networkidle0" });
    await waitForLifecycle(page);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "During-the-Game mobile result has no horizontal overflow");
    check(await page.$eval(".vm-lifecycle-paths", node => node.getBoundingClientRect().width <= node.parentElement.getBoundingClientRect().width + 1), "During-the-Game Available paths card stacks within the mobile result width");
    await capture("during-result-mobile.png");
  } finally {
    await page.close();
    await browser.close();
    await server.close();
  }

  const record = {
    candidateHead: execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    server: { ...server, close: undefined },
    browserPath,
    screenshots,
    assertions,
    consoleErrors,
    requestFailures,
  };
  await writeFile(path.join(evidenceDir, "browser-assertions.json"), `${JSON.stringify(record, null, 2)}\n`);
  if (failures.length) throw new Error(`Owner remediation browser checks failed:\n- ${failures.join("\n- ")}`);
  console.log(`Owner remediation browser checks passed: ${assertions.length} assertions, fresh server ${server.baseUrl}, candidate ${record.candidateHead}.`);
}

await main();

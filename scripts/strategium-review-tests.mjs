import { access, readFile, stat } from "node:fs/promises";
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
const failures = [];

const pathCases = [
  ["after-game/won-unclear", "won-unclear", ["threat-reading", "heat-management", "archetype-signal"]],
  ["after-game/one-sided", "one-sided", ["threat-reading", "pod-readiness"]],
  ["after-game/couldnt-follow", "game-flow", ["archetype-signal", "threat-reading"]],
  ["after-game/table-bad", "social-friction", ["pod-readiness", "heat-management"]],
  ["after-game/unsure", "uncertain", ["threat-reading", "readiness-checklist"]],
  ["after-game/lost/opening-hand", "opening-hand", ["pod-readiness", "readiness-checklist"]],
  ["after-game/lost/mana-draw", "mana-development", ["pod-readiness", "readiness-checklist"]],
  ["after-game/lost/wrong-order", "sequencing", ["threat-reading", "command-zone"]],
  ["after-game/lost/never-started/resources-late", "mana-development", ["pod-readiness", "readiness-checklist"]],
  ["after-game/lost/never-started/commander-needed", "commander-dependence", ["command-zone"]],
  ["after-game/lost/never-started/pod-fast", "power-mismatch", ["pod-readiness", "readiness-checklist"]],
  ["after-game/lost/never-started/unsure", "uncertain", ["threat-reading", "readiness-checklist"]],
  ["after-game/lost/stopped/commander-stopped", "commander-dependence", ["command-zone"]],
  ["after-game/lost/stopped/key-spells", "open-mana", ["threat-reading"]],
  ["after-game/lost/stopped/visible-engine", "targeting", ["heat-management", "threat-reading"]],
  ["after-game/lost/stopped/unsure", "uncertain", ["threat-reading", "readiness-checklist"]],
  ["after-game/lost/other-plan/engine-hidden", "other-plan", ["archetype-signal", "threat-reading"]],
  ["after-game/lost/other-plan/wrong-piece", "wrong-target", ["threat-reading", "archetype-signal"]],
  ["after-game/lost/other-plan/artifact-confusion", "beyond-wubrg", ["beyond-wubrg", "archetype-signal"]],
  ["after-game/lost/other-plan/plan-unsure", "game-flow", ["archetype-signal", "threat-reading"]],
  ["after-game/lost/focused", "targeting", ["heat-management", "threat-reading"]],
  ["after-game/lost/stronger", "power-mismatch", ["pod-readiness", "readiness-checklist"]],
  ["after-game/lost/nothing-mattered", "one-sided", ["threat-reading", "pod-readiness"]],
  ["after-game/lost/unsure", "uncertain", ["threat-reading", "readiness-checklist"]],
];

const consoleLessons = new Map([
  ["command-zone", "Command Zone"],
  ["pod-readiness", "Pod Readiness"],
  ["archetype-signal", "Archetype Signal"],
  ["threat-reading", "Threat Reading"],
  ["heat-management", "Heat Management"],
  ["beyond-wubrg", "Beyond WUBRG"],
]);

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    if (!candidate) continue;
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next local browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for Strategium browser validation.");
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

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise(resolve => server.close(resolve))
  };
}

async function waitForReview(page) {
  await page.waitForSelector("#strategiumReview [data-review-focus]");
  await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))));
}

async function getResultState(page) {
  return page.evaluate(() => ({
    resultId: document.querySelector("[data-result-id]")?.getAttribute("data-result-id") || "",
    lessons: Array.from(document.querySelectorAll("[data-lesson]"), button => button.getAttribute("data-lesson")),
    sections: Array.from(document.querySelectorAll(".vm-result-grid > section h3"), heading => heading.textContent.trim()),
    activeTag: document.activeElement?.tagName || "",
    activeText: document.activeElement?.textContent?.trim() || "",
    headingBounds: (() => {
      const heading = document.querySelector("[data-review-focus]");
      const bounds = heading?.getBoundingClientRect();
      return bounds ? { top: bounds.top, bottom: bounds.bottom } : null;
    })(),
  }));
}

async function runStaticChecks() {
  const review = await readFile(path.join(root, "assets/js/strategium-review.js"), "utf8");
  const consoleRuntime = await readFile(path.join(root, "assets/js/strategium.js"), "utf8");
  const styles = await readFile(path.join(root, "assets/css/strategium.css"), "utf8");
  const hubHtml = await readFile(path.join(root, "strategium/index.html"), "utf8");
  const reviewHtml = await readFile(path.join(root, "strategium/review/index.html"), "utf8");
  const consoleHtml = await readFile(path.join(root, "strategium/console/index.html"), "utf8");

  expect(pathCases.length === 24, `Expected 24 workbook path cases, found ${pathCases.length}`);
  expect(new Set(pathCases.map(([, resultId]) => resultId)).size === 15, "Expected 15 result patterns after the wrong-piece repair");
  expect(review.includes('"wrong-target"'), "Wrong-piece path must have a dedicated wrong-target result");
  expect(
    review.includes('{ id: "wrong-piece", label: "I reacted, but I may have answered the wrong piece", result: "wrong-target" }'),
    "Wrong-piece path must not route to open-mana"
  );
  expect(!review.includes("Saved on this page"), "Feedback must not use the old Saved language");
  expect(!review.includes("vmAnalytics.track"), "Local result feedback must not invoke analytics");
  expect(review.includes("Current selection:"), "Feedback should report a transient current selection");
  expect(review.includes("That review state was unavailable or incomplete."), "Invalid URL recovery notice is missing");
  expect(review.includes("Stage ${value} of 4"), "Named four-stage progress model is missing");
  expect(review.includes("showModal()"), "In-page lesson dialog is missing");
  expect(review.includes('event.key !== "Tab"'), "Lesson dialog focus containment is missing");
  expect(review.includes('lessonDialog.addEventListener("cancel"'), "Lesson dialog Escape handling is missing");
  expect(review.includes("lessonOpener.focus()"), "Lesson dialog focus restoration is missing");
  expect(review.includes("strategiumLessonDialogOwned"), "Lesson dialog browser-history ownership is missing");
  expect(consoleRuntime.includes("window.vmStrategiumLessons = strategiumLessonRegistry"), "Shared lesson registry is not exposed");
  expect(consoleRuntime.includes("window.vmStrategiumRenderLesson = renderStrategiumLesson"), "Shared lesson renderer is not exposed");
  expect(!consoleHtml.includes("<base "), "Console must not use a base element");
  expect(consoleHtml.includes('href="#top"') && consoleHtml.includes('href="#strategium"'), "Console-local Top and Strategium anchors are missing");
  expect(consoleHtml.includes("../../assets/js/strategium.js"), "Console nested-route asset paths were not repaired");
  expect(reviewHtml.includes('id="strategiumLessonDialog"'), "Review route is missing the reusable lesson dialog");
  expect(reviewHtml.includes('aria-labelledby="strategiumLessonDialogTitle"'), "Lesson dialog is missing its accessible title relationship");
  expect(!hubHtml.includes("vm-path-number"), "Hub decorative experience numerals should be removed");
  expect(!hubHtml.includes("Two Connected Experiences"), "Hub should not use internal experience taxonomy");
  expect(!hubHtml.includes("Situation Families"), "Hub should not use internal situation-family taxonomy");
  expect(!review.includes('id: "start-unsure"'), "Review must not show a duplicate start-unsure route");
  expect(!styles.includes("circle at var(--mx"), "Strategium viewport lighting should no longer track the pointer");
  expect(!consoleRuntime.includes('document.addEventListener("pointermove"'), "Dense Strategium panels should not run continuous pointer lighting updates");

  for (const heading of [
    "What may have happened",
    "What to look for next time",
    "One thing to try",
    "Learn more",
  ]) {
    expect(review.includes(heading), `Result renderer is missing required section: ${heading}`);
  }

  for (const file of [
    "strategium/index.html",
    "strategium/review/index.html",
    "strategium/console/index.html",
  ]) {
    await access(path.join(root, file));
  }

  async function checkInternalLinks(file, source) {
    const pageDirectory = path.dirname(path.join(root, file));
    const hrefs = [...source.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(match => match[1]);
    for (const href of hrefs) {
      if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
      const cleanHref = href.split(/[?#]/, 1)[0];
      const resolved = path.resolve(pageDirectory, cleanHref);
      const target = path.extname(resolved) ? resolved : path.join(resolved, "index.html");
      try {
        await access(target);
      } catch {
        failures.push(`${file} has a broken internal link: ${href}`);
      }
    }
  }

  await checkInternalLinks("strategium/index.html", hubHtml);
  await checkInternalLinks("strategium/review/index.html", reviewHtml);
  await checkInternalLinks("strategium/console/index.html", consoleHtml);
}

async function runBrowserChecks(baseUrl) {
  const browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--force-color-profile=srgb"]
  });
  const page = await browser.newPage();
  const consoleProblems = [];
  page.on("console", message => {
    if (["warning", "error"].includes(message.type())) consoleProblems.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", error => consoleProblems.push(`pageerror: ${error.message}`));

  try {
    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });

    for (const [reviewPath, expectedResult, expectedLessons] of pathCases) {
      await page.goto(`${baseUrl}/strategium/review/?path=${reviewPath}`, { waitUntil: "networkidle0" });
      await waitForReview(page);
      const state = await getResultState(page);
      expect(state.resultId === expectedResult, `${reviewPath} expected ${expectedResult}, received ${state.resultId}`);
      expect(
        JSON.stringify(state.lessons) === JSON.stringify(expectedLessons),
        `${reviewPath} expected lessons ${expectedLessons.join(", ")}, received ${state.lessons.join(", ")}`
      );
      expect(
        JSON.stringify(state.sections) === JSON.stringify([
          "What may have happened",
          "What to look for next time",
          "One thing to try",
          "Learn more",
        ]),
        `${reviewPath} does not render all four result sections`
      );
      expect(state.activeTag === "H2", `${reviewPath} should focus its result heading`);
      expect(
        state.headingBounds && state.headingBounds.top >= 0 && state.headingBounds.top < 768,
        `${reviewPath} result heading should be visible in the viewport`
      );
    }

    const lessonExamples = [
      ["after-game/lost/wrong-order", "command-zone"],
      ["after-game/lost/opening-hand", "pod-readiness"],
      ["after-game/won-unclear", "archetype-signal"],
      ["after-game/won-unclear", "threat-reading"],
      ["after-game/won-unclear", "heat-management"],
      ["after-game/lost/other-plan/artifact-confusion", "beyond-wubrg"],
      ["after-game/unsure", "readiness-checklist"],
    ];

    for (const [reviewPath, lessonId] of lessonExamples) {
      await page.goto(`${baseUrl}/strategium/review/?path=${reviewPath}`, { waitUntil: "networkidle0" });
      await page.click(`[data-lesson="${lessonId}"]`);
      await page.waitForSelector("#strategiumLessonDialog[open]");
      const dialogState = await page.evaluate(id => {
        const dialog = document.getElementById("strategiumLessonDialog");
        const registry = window.vmStrategiumLessons[id];
        const body = document.getElementById("strategiumLessonDialogBody");
        const link = document.getElementById("strategiumLessonConsoleLink");
        return {
          open: dialog.open,
          title: document.getElementById("strategiumLessonDialogTitle").textContent.trim(),
          registryTitle: registry.label,
          bodyText: body.textContent.replace(/\s+/g, " ").trim(),
          registryText: (() => {
            const template = document.createElement("template");
            template.innerHTML = registry.content;
            return template.content.textContent.replace(/\s+/g, " ").trim();
          })(),
          focusId: document.activeElement?.id || "",
          mainInert: document.querySelector("main").hasAttribute("inert"),
          consoleHref: link.getAttribute("href"),
        };
      }, lessonId);
      expect(dialogState.open, `${lessonId} dialog did not open`);
      expect(dialogState.title === dialogState.registryTitle, `${lessonId} dialog title does not come from the shared registry`);
      expect(dialogState.bodyText.startsWith(dialogState.registryText), `${lessonId} dialog copy does not match the shared registry`);
      expect(dialogState.focusId === "strategiumLessonDialogTitle", `${lessonId} dialog title should receive focus`);
      expect(dialogState.mainInert, `${lessonId} dialog should prevent background interaction`);
      expect(
        dialogState.consoleHref.includes(lessonId),
        `${lessonId} dialog full-Console fallback does not target the selected lesson`
      );

      await page.focus("[data-lesson-dialog-close]:last-of-type").catch(() => {});
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.getElementById("strategiumLessonDialog").open);
      const restoredLesson = await page.evaluate(() => document.activeElement?.getAttribute("data-lesson") || "");
      expect(restoredLesson === lessonId, `${lessonId} dialog should restore focus to its exact opener`);
    }

    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost/stopped/key-spells`, { waitUntil: "networkidle0" });
    await page.click('[data-lesson="threat-reading"]');
    await page.waitForSelector("#strategiumLessonDialog[open]");
    await page.focus(".vm-lesson-dialog-footer [data-lesson-dialog-close]");
    await page.keyboard.press("Tab");
    const wrappedFocus = await page.evaluate(() => document.activeElement?.classList.contains("vm-lesson-dialog-close"));
    expect(wrappedFocus, "Lesson dialog Tab navigation should wrap within the dialog");
    await page.goBack({ waitUntil: "networkidle0" });
    await page.waitForFunction(() => !document.getElementById("strategiumLessonDialog").open);
    expect(!new URL(page.url()).searchParams.has("lesson"), "Browser Back should close the lesson without breaking the result URL");
    await page.goForward({ waitUntil: "networkidle0" });
    await page.waitForSelector("#strategiumLessonDialog[open]");
    await page.click(".vm-lesson-dialog-header [data-lesson-dialog-close]");
    await page.waitForFunction(() => !document.getElementById("strategiumLessonDialog").open);

    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost/stopped/key-spells`, { waitUntil: "networkidle0" });
    await page.click('[data-lesson="threat-reading"]');
    const reducedMotion = await page.evaluate(() => {
      const dialog = document.getElementById("strategiumLessonDialog");
      const progress = document.querySelector(".vm-review-progress span");
      return {
        dialogAnimation: getComputedStyle(dialog).animationName,
        progressTransition: getComputedStyle(progress).transitionDuration,
      };
    });
    expect(reducedMotion.dialogAnimation === "none", "Reduced motion should disable dialog animation");
    expect(parseFloat(reducedMotion.progressTransition) <= 0.0001, "Reduced motion should reduce progress transition to an imperceptible duration");
    await page.keyboard.press("Escape");
    await page.emulateMediaFeatures([]);

    for (const [lessonId, expectedTitle] of consoleLessons) {
      await page.goto(`${baseUrl}/strategium/console/?lesson=${lessonId}`, { waitUntil: "networkidle0" });
      await page.waitForSelector("#basicsReveal h3");
      await page.waitForFunction(() => {
        const heading = document.querySelector("#basicsReveal h3");
        const bounds = heading?.getBoundingClientRect();
        return heading === document.activeElement && bounds && bounds.top >= 0 && bounds.top < window.innerHeight;
      });
      const lessonState = await page.evaluate(id => {
        const heading = document.querySelector("#basicsReveal h3");
        const bounds = heading.getBoundingClientRect();
        return {
          title: heading.textContent.trim(),
          selected: document.querySelector('.vm-tab[aria-selected="true"]')?.dataset.topic || "",
          focusText: document.activeElement?.textContent?.trim() || "",
          visible: bounds.top >= 0 && bounds.top < window.innerHeight,
          path: window.location.pathname,
        };
      }, lessonId);
      expect(lessonState.title === expectedTitle, `${lessonId} direct URL rendered ${lessonState.title}`);
      expect(lessonState.selected === lessonId, `${lessonId} direct URL did not select its tab`);
      expect(lessonState.focusText.includes(expectedTitle), `${lessonId} direct URL did not focus its lesson heading`);
      expect(lessonState.visible, `${lessonId} direct URL did not place its heading in view`);
      expect(lessonState.path === "/strategium/console/", `${lessonId} direct URL left the Console route`);
    }

    await page.goto(`${baseUrl}/strategium/console/?lesson=readiness-checklist#readiness-checklist`, { waitUntil: "networkidle0" });
    await page.waitForSelector("#readinessChecklist .vm-checklist-button");
    await page.waitForFunction(() => document.activeElement?.id === "strategium-readiness-title");
    const readinessState = await page.evaluate(() => {
      const heading = document.getElementById("strategium-readiness-title");
      const section = document.getElementById("readiness-checklist");
      const bounds = section.getBoundingClientRect();
      return {
        path: window.location.pathname,
        focusId: document.activeElement?.id || "",
        top: bounds.top,
        heading: heading.textContent.trim(),
      };
    });
    expect(readinessState.path === "/strategium/console/", "Readiness direct link left the Console");
    expect(readinessState.focusId === "strategium-readiness-title", "Readiness direct link should focus its heading");
    expect(readinessState.top >= 0 && readinessState.top < 180, `Readiness section should land near its beginning, top was ${readinessState.top}`);

    for (const hash of ["#top", "#strategium", "#strategium-console-title", "#strategium-pod-title", "#unknown-console-hash"]) {
      await page.goto(`${baseUrl}/strategium/console/${hash}`, { waitUntil: "networkidle0" });
      expect(new URL(page.url()).pathname === "/strategium/console/", `${hash} unexpectedly navigated away from the Console`);
    }

    await page.goto(`${baseUrl}/strategium/console/?lesson=heat-management`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => window.scrollY > 0);
    await page.click(".vm-backtop");
    await page.waitForFunction(() => window.location.hash === "#top" && window.scrollY === 0);
    expect(new URL(page.url()).pathname === "/strategium/console/", "Console Top action left the Console route");

    await page.goto(`${baseUrl}/strategium/#strategium`, { waitUntil: "networkidle0" });
    expect(new URL(page.url()).pathname === "/strategium/console/", "Historical hub #strategium compatibility did not reach the Console");
    await page.goto(`${baseUrl}/strategium/#unknown-hash`, { waitUntil: "networkidle0" });
    expect(new URL(page.url()).pathname === "/strategium/", "Unknown hub hash should fail safely on the hub");

    await page.goto(`${baseUrl}/strategium/console/?lesson=unknown-lesson`, { waitUntil: "networkidle0" });
    const unknownLesson = await page.$eval('.vm-tab[aria-selected="true"]', tab => tab.dataset.topic);
    expect(unknownLesson === "command-zone", "Unknown Console lesson should fail safely to Command Zone");

    await page.goto(`${baseUrl}/strategium/console/?lesson=command-zone`, { waitUntil: "networkidle0" });
    await page.click('[data-topic="pod-readiness"]');
    await page.waitForFunction(() => new URL(window.location.href).searchParams.get("lesson") === "pod-readiness");
    await page.goBack({ waitUntil: "networkidle0" });
    expect(await page.$eval('.vm-tab[aria-selected="true"]', tab => tab.dataset.topic) === "command-zone", "Console Back did not restore Command Zone");
    await page.goForward({ waitUntil: "networkidle0" });
    expect(await page.$eval('.vm-tab[aria-selected="true"]', tab => tab.dataset.topic) === "pod-readiness", "Console Forward did not restore Pod Readiness");

    const recoveryCases = [
      ["after-game/lost/other-plan/wrong-piece/extra", "after-game/lost/other-plan/wrong-piece"],
      ["after-game/lost/never-started/bogus", "after-game/lost/never-started"],
      ["after-game%252Flost", ""],
      ["after-game/%E0%A4%A", ""],
    ];
    for (const [badPath, expectedPath] of recoveryCases) {
      await page.goto(`${baseUrl}/strategium/review/?path=${badPath}`, { waitUntil: "networkidle0" });
      await waitForReview(page);
      const recovery = await page.evaluate(() => ({
        notice: document.querySelector(".vm-review-recovery")?.textContent.trim() || "",
        path: new URL(window.location.href).searchParams.get("path") || "",
      }));
      expect(recovery.notice.includes("No answer was added."), `${badPath} should announce safe recovery`);
      expect(recovery.path === expectedPath, `${badPath} recovered to ${recovery.path}, expected ${expectedPath}`);
    }

    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost`, { waitUntil: "networkidle0" });
    await waitForReview(page);
    expect(!(await page.$(".vm-review-recovery")), "A valid partial path should remain reproducible without a recovery warning");
    const partialTitle = await page.$eval("[data-review-focus]", heading => heading.textContent.trim());
    expect(partialTitle === "What did the loss look like from your side?", "Valid partial path did not render its question");
    await page.reload({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === partialTitle, "Refresh did not reproduce a valid partial path");

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.goto(`${baseUrl}/strategium/review/?path=after-game/%E0%A4%A`, { waitUntil: "networkidle0" });
    await waitForReview(page);
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
    const mobileRecovery = await page.evaluate(() => {
      const notice = document.querySelector(".vm-review-recovery");
      const heading = document.querySelector("[data-review-focus]");
      const noticeBounds = notice?.getBoundingClientRect();
      const headingBounds = heading?.getBoundingClientRect();
      return {
        headingFocused: document.activeElement === heading,
        headingVisible: Boolean(headingBounds && headingBounds.top >= 0 && headingBounds.top < window.innerHeight),
        noticeVisible: Boolean(noticeBounds && noticeBounds.top >= 0 && noticeBounds.bottom <= window.innerHeight),
      };
    });
    expect(mobileRecovery.noticeVisible, "Mobile recovery notice should remain visibly in the viewport");
    expect(mobileRecovery.headingFocused && mobileRecovery.headingVisible, "Mobile recovery should focus and reveal the returned question");

    await page.goto(`${baseUrl}/strategium/review/`, { waitUntil: "networkidle0" });
    await page.click('[data-option="after-game"]');
    await page.waitForFunction(() => document.activeElement?.matches("[data-review-focus]"));
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
    let focusState = await getResultState(page);
    expect(focusState.activeTag === "H2" && focusState.headingBounds.top >= 0, "Mobile transition should focus and reveal the new question");
    await page.click('[data-option="lost"]');
    await page.click('[data-option="other-plan"]');
    await page.click('[data-option="wrong-piece"]');
    await page.waitForFunction(() => document.activeElement?.matches("[data-review-focus]"));
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
    focusState = await getResultState(page);
    expect(focusState.resultId === "wrong-target", "Mobile wrong-piece flow did not reach wrong-target");
    expect(focusState.activeTag === "H2" && focusState.headingBounds.top >= 0, "Mobile result transition should focus and reveal the heading");
    const resultPath = new URL(page.url()).searchParams.get("path");
    await page.reload({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-result-id]", node => node.dataset.resultId) === "wrong-target", "Refresh did not reproduce a valid result");
    expect(new URL(page.url()).searchParams.get("path") === resultPath, "Refresh changed a valid result URL");

    for (const choice of ["Yes", "Partly", "No", "Something was missing"]) {
      await page.click(`[data-feedback="${choice}"]`);
      const feedbackState = await page.evaluate(value => ({
        status: document.querySelector(".vm-feedback-state").textContent.trim(),
        pressed: document.querySelector(`[data-feedback="${value}"]`).getAttribute("aria-pressed"),
      }), choice);
      expect(feedbackState.status === `Current selection: ${choice}`, `Feedback status did not update for ${choice}`);
      expect(feedbackState.pressed === "true", `Feedback selected state did not update for ${choice}`);
    }
    const feedbackCopy = await page.$eval(".vm-result-feedback", node => node.textContent);
    expect(!/\b(saved|submitted|sent)\b/i.test(feedbackCopy), "Feedback UI must not imply storage or transmission");

    await page.click('[data-review-action="start-over"]');
    expect(!new URL(page.url()).searchParams.has("path"), "Start Over should clear the review path");
    expect(await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === "Which moment do you want to review?", "Start Over should return to Situation");

    await page.click('[data-option="after-game"]');
    await page.click('[data-option="won-unclear"]');
    await page.goBack({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === "What best describes the game?", "Diagnostic Back did not restore the prior question");
    await page.goForward({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-result-id]", node => node.dataset.resultId) === "won-unclear", "Diagnostic Forward did not restore the result");

    const lessonCounts = await page.evaluate(() => {
      const model = window.vmStrategiumReviewModel.results;
      return Object.values(model).reduce((counts, result) => {
        counts[result.lessons.length] = (counts[result.lessons.length] || 0) + 1;
        return counts;
      }, {});
    });
    expect(lessonCounts[1] >= 1 && lessonCounts[2] >= 1 && lessonCounts[3] >= 1, "Results must cover one-, two-, and three-lesson layouts");

    expect(consoleProblems.length === 0, `Strategium browser checks emitted warnings/errors:\n${consoleProblems.join("\n")}`);
  } finally {
    await page.close();
    await browser.close();
  }
}

await runStaticChecks();
const server = await startServer();
try {
  await runBrowserChecks(server.baseUrl);
} finally {
  await server.close();
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log("Strategium remediation checks passed: 24 paths, 15 results, shared lessons, dialog accessibility, Console deep links, URL recovery, history, focus, and transient feedback.");

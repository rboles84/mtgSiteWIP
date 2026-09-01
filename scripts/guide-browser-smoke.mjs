import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

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
  throw new Error("No supported local Chromium browser was found for Guide validation.");
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

async function readSurfaceContract(page) {
  return page.evaluate(() => {
    const pick = (selector, properties) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      return Object.fromEntries(properties.map(property => [property, style[property]]));
    };
    const surfaceProperties = [
      "backgroundImage",
      "border",
      "borderRadius",
      "boxShadow",
      "display",
      "gap",
      "gridTemplateColumns",
      "padding",
    ];
    const bodyStyle = getComputedStyle(document.body);
    const beforeStyle = getComputedStyle(document.body, "::before");
    const afterStyle = getComputedStyle(document.body, "::after");
    const commandDeck = document.querySelector(".maze-command-deck");
    const commandRect = commandDeck?.getBoundingClientRect();
    return {
      afterBackground: afterStyle.backgroundImage,
      atmosphereActive: document.querySelector(".vm-bg__stars")?.dataset.vmRichAtmosphere === "true",
      beforeBackground: beforeStyle.backgroundImage,
      bodyBackground: bodyStyle.backgroundImage,
      command: pick(".maze-command-deck", surfaceProperties),
      commandTop: Math.round(commandRect?.top ?? -1),
      imageFilter: getComputedStyle(document.querySelector(".vm-bg__picture img")).filter,
      main: pick(".r-main", surfaceProperties),
      modeCard: pick(".mode-card:not(.on)", surfaceProperties),
      page: pick(".page", ["display", "gap", "gridTemplateColumns", "padding", "width"]),
      rBody: pick(".r-body", ["display", "gap", "gridTemplateColumns"]),
      sidebar: pick(".r-sidebar", surfaceProperties),
      stylesheets: [...document.styleSheets].map(sheet => new URL(sheet.href).pathname),
    };
  });
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
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.url().startsWith(baseUrl)) request.continue();
    else request.abort();
  });

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector(".vm-bg__stars")?.dataset.vmRichAtmosphere === "true");
  const mazeContract = await readSurfaceContract(page);

  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector(".vm-bg__stars")?.dataset.vmRichAtmosphere === "true");
  const guideContract = await readSurfaceContract(page);
  const guideState = await page.evaluate(() => {
    const ctas = [...document.querySelectorAll("[data-guide-cta]")];
    const sectionSelectors = ["#guide-archscry", "#guide-maze", "#guide-strategium", "#how-vox-connects", "#guide-apocrypha"];
    const hero = document.querySelector(".guide-hero").getBoundingClientRect();
    const heroCopy = document.querySelector(".guide-hero-copy").getBoundingClientRect();
    const heroTitle = document.querySelector("#guide-title");
    const heroTitleRect = heroTitle.getBoundingClientRect();
    const heroTitleStyle = getComputedStyle(heroTitle);
    const heroOrientation = document.querySelector(".guide-hero-orientation");
    const heroOrientationRect = heroOrientation.getBoundingClientRect();
    const heroOrientationStyle = getComputedStyle(heroOrientation);
    const bodyCopy = document.querySelector(".guide-chapter-copy > p");
    const bodyCopyStyle = getComputedStyle(bodyCopy);
    return {
      bodyClasses: [...document.body.classList],
      bodyCopyFontSize: parseFloat(bodyCopyStyle.fontSize),
      bodyCopyLineHeight: parseFloat(bodyCopyStyle.lineHeight),
      ctaKeys: ctas.map(cta => cta.dataset.guideCta),
      ctaTargets: ctas.map(cta => cta.getAttribute("href")),
      heroCopyRatio: heroCopy.width / hero.width,
      heroHeight: hero.height,
      heroOrientationLines: Math.round(heroOrientationRect.height / parseFloat(heroOrientationStyle.lineHeight)),
      heroOrientationMaxWidth: heroOrientationStyle.maxWidth,
      heroTitle: heroTitle?.textContent?.trim(),
      heroTitleLines: Math.round(heroTitleRect.height / parseFloat(heroTitleStyle.lineHeight)),
      heroTitleMaxWidth: heroTitleStyle.maxWidth,
      heroTitleWidthRatio: heroTitleRect.width / heroCopy.width,
      heroTagline: document.querySelector(".guide-brand-line")?.textContent?.trim(),
      mazeButtons: [...document.querySelectorAll("[data-guide-maze-mode]")].map(button => ({
        mode: button.dataset.guideMazeMode,
        pressed: button.getAttribute("aria-pressed"),
      })),
      mazePanels: [...document.querySelectorAll("[data-guide-maze-panel]")].map(panel => ({
        hidden: panel.hidden,
        mode: panel.dataset.guideMazePanel,
      })),
      plainQuery: document.querySelector('[data-guide-maze-panel="plain"] .guide-query--output code')?.textContent?.trim(),
      productKickers: [...document.querySelectorAll("#guide-archscry .guide-kicker, #guide-maze .guide-kicker, #guide-strategium .guide-kicker")].map(element => element.textContent.replace(/\s+/g, " ").trim()),
      relationshipLinkCount: document.querySelectorAll("#how-vox-connects a").length,
      routerCount: document.querySelectorAll(".guide-path-card, .guide-continuation-list").length,
      sectionDomOrder: sectionSelectors.map(selector => document.querySelector(selector)?.id),
      sectionTops: sectionSelectors.map(selector => Math.round(document.querySelector(selector)?.getBoundingClientRect().top ?? -1)),
      specimenLabels: [...document.querySelectorAll(".guide-specimen figcaption > span")].map(element => element.textContent.trim()),
    };
  });

  expect(guideContract.atmosphereActive, "Guide should run the shared rich-atmosphere canvas");
  expect(
    guideContract.stylesheets.includes("/assets/css/maze.css") && guideContract.stylesheets.at(-1) === "/assets/css/guide.css",
    "Guide should load the actual Maze stylesheet before its route-content adapter"
  );
  expect(
    guideState.bodyClasses.includes("vm-maze-route") && guideState.bodyClasses.includes("vm-guide-route"),
    "Guide should inherit the Maze route shell while retaining its Guide identity"
  );
  for (const key of ["bodyBackground", "beforeBackground", "afterBackground", "imageFilter", "page"]) {
    const matches = JSON.stringify(guideContract[key]) === JSON.stringify(mazeContract[key]);
    expect(
      matches,
      `Guide should inherit the rendered Maze ${key} contract without approximating it${matches ? "" : ` (Maze ${JSON.stringify(mazeContract[key])}; Guide ${JSON.stringify(guideContract[key])})`}`
    );
  }
  expect(
    guideContract.commandTop === mazeContract.commandTop && guideContract.commandTop < 170,
    "Guide and Maze command decks should begin at the same desktop route rhythm"
  );
  expect(
    JSON.stringify(guideState.ctaKeys) === JSON.stringify(["archscry", "maze", "strategium", "apocrypha"]) &&
      JSON.stringify(guideState.ctaTargets) === JSON.stringify(["../archscry/index.html", "../maze/index.html", "../strategium/index.html", "../apocrypha/index.html"]),
    "Guide should expose one principal body CTA per major product in teaching order"
  );
  expect(guideState.heroTitle === "A Planeswalker's Guide to Vox Mana", "Guide should restore the Owner-requested semantic H1");
  expect(guideState.heroTagline === "Find your place. Shape your play.", "Guide should keep the tagline subordinate to the H1");
  expect(guideState.heroCopyRatio >= 0.9, "Guide hero copy should use the available route width rather than reading as a narrow card");
  expect(
    guideState.heroTitleMaxWidth === "none" && guideState.heroOrientationMaxWidth === "none" && guideState.heroTitleWidthRatio >= 0.9,
    "Guide-authored hero text should use the full available section width without a narrow measure cap"
  );
  expect(
    guideState.heroTitleLines === 1 && guideState.heroOrientationLines === 1 && guideState.heroHeight < 360,
    "Desktop Guide hero should keep its title and short orientation on one line and remain vertically restrained"
  );
  expect(
    guideState.bodyCopyFontSize >= 16.5 && guideState.bodyCopyLineHeight / guideState.bodyCopyFontSize >= 1.55,
    "Guide-only teaching copy should retain a readable size and line height"
  );
  expect(
    JSON.stringify(guideState.productKickers) === JSON.stringify([
      "I // Archscry · Commander direction",
      "II // The Implicit Maze · Card discovery",
      "III // Strategium · Table literacy",
    ]),
    "The first three teaching chapters should prominently identify their products and purposes"
  );
  expect(guideState.routerCount === 0, "Guide should remove the superseded equal router and Continue structures");
  expect(guideState.plainQuery === "type:vampire type:creature c:r o:sacrifice", "Guide should show the exact current Plain Reading translation");
  expect(
    JSON.stringify(guideState.mazeButtons) === JSON.stringify([
      { mode: "plain", pressed: "true" },
      { mode: "operator", pressed: "false" },
      { mode: "loom", pressed: "false" },
    ]) && JSON.stringify(guideState.mazePanels) === JSON.stringify([
      { hidden: false, mode: "plain" },
      { hidden: true, mode: "operator" },
      { hidden: true, mode: "loom" },
    ]),
    "Plain Reading should be the single initially visible Maze specimen"
  );
  expect(guideState.relationshipLinkCount === 0, "Guide relationship diagram should remain explanatory and non-clickable");
  expect(JSON.stringify(guideState.specimenLabels) === JSON.stringify(["Example", "Example", "Example"]), "Each product specimen should be explicitly labeled Example");
  expect(
    JSON.stringify(guideState.sectionDomOrder) === JSON.stringify(["guide-archscry", "guide-maze", "guide-strategium", "how-vox-connects", "guide-apocrypha"]) &&
      guideState.sectionTops.every((top, index, tops) => index === 0 || tops[index - 1] < top),
    "Guide teaching sections should remain I -> II -> III -> IV -> V in DOM and desktop visual order"
  );

  await page.keyboard.press("Tab");
  const skipFocus = await page.evaluate(() => ({
    className: document.activeElement?.className,
    focusVisible: document.activeElement?.matches(":focus-visible"),
    href: document.activeElement?.getAttribute("href"),
  }));
  expect(skipFocus.className === "guide-skip-link", "First Tab should focus the Guide skip link");
  expect(skipFocus.focusVisible === true, "Keyboard-focused skip link should be visibly focused");

  await page.keyboard.press("Enter");
  await page.waitForFunction(() => window.location.hash === "#guide-main");
  const skipDestination = await page.evaluate(() => ({
    activeId: document.activeElement?.id,
    mainTop: Math.round(document.querySelector("#guide-main").getBoundingClientRect().top),
  }));
  expect(skipDestination.activeId === "guide-main", "Enter on the skip link should focus the main landmark");
  expect(skipDestination.mainTop >= 0, "Skip target should land in the visible viewport");

  await page.keyboard.press("Tab");
  const archscryFocus = await page.evaluate(() => ({
    text: document.activeElement?.textContent?.trim(),
    focusVisible: document.activeElement?.matches(":focus-visible"),
    href: document.activeElement?.getAttribute("href"),
  }));
  expect(archscryFocus.text.includes("Start an Archscry reading"), "Tab after the skip target should reach the Archscry teaching CTA");
  expect(archscryFocus.focusVisible === true && archscryFocus.href === "../archscry/index.html", "Archscry CTA should retain visible keyboard focus and the supported route");

  await page.keyboard.press("Tab");
  let mazeModeFocus = await page.evaluate(() => ({
    mode: document.activeElement?.dataset?.guideMazeMode,
    focusVisible: document.activeElement?.matches(":focus-visible"),
  }));
  expect(mazeModeFocus.mode === "plain" && mazeModeFocus.focusVisible === true, "Keyboard order should enter the Maze specimen at Plain Reading with visible focus");

  await page.keyboard.press("ArrowRight");
  mazeModeFocus = await page.evaluate(() => ({
    mode: document.activeElement?.dataset?.guideMazeMode,
    operatorPressed: document.querySelector('[data-guide-maze-mode="operator"]')?.getAttribute("aria-pressed"),
    operatorHidden: document.querySelector('[data-guide-maze-panel="operator"]')?.hidden,
    query: document.querySelector('[data-guide-maze-panel="operator"] code')?.textContent?.trim(),
  }));
  expect(
    mazeModeFocus.mode === "operator" && mazeModeFocus.operatorPressed === "true" && mazeModeFocus.operatorHidden === false && mazeModeFocus.query === "c:r kw:haste mv<=3 f:modern",
    "ArrowRight should reveal the truthful Operator's Hand specimen and move focus with it"
  );

  await page.keyboard.press("ArrowRight");
  mazeModeFocus = await page.evaluate(() => ({
    mode: document.activeElement?.dataset?.guideMazeMode,
    loomPressed: document.querySelector('[data-guide-maze-mode="loom"]')?.getAttribute("aria-pressed"),
    loomHidden: document.querySelector('[data-guide-maze-panel="loom"]')?.hidden,
    query: document.querySelector('[data-guide-maze-panel="loom"] .guide-query--output code')?.textContent?.trim(),
  }));
  expect(
    mazeModeFocus.mode === "loom" && mazeModeFocus.loomPressed === "true" && mazeModeFocus.loomHidden === false && mazeModeFocus.query === "id<=r t:creature f:commander kw:haste",
    "ArrowRight should reveal the truthful Loom specimen and move focus with it"
  );

  const expectedKeyboardCtas = [
    ["Enter the Implicit Maze", "../maze/index.html"],
    ["Visit Strategium", "../strategium/index.html"],
    ["Consult Apocrypha", "../apocrypha/index.html"],
  ];
  for (const [label, href] of expectedKeyboardCtas) {
    await page.keyboard.press("Tab");
    const focusState = await page.evaluate(() => ({
      text: document.activeElement?.textContent?.trim(),
      focusVisible: document.activeElement?.matches(":focus-visible"),
      href: document.activeElement?.getAttribute("href"),
    }));
    expect(focusState.text.includes(label), `Keyboard order should reach ${label}`);
    expect(focusState.focusVisible === true && focusState.href === href, `${label} should expose visible focus and the supported route`);
  }

  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  await page.click('[data-guide-maze-mode="operator"]');
  const mobileModeState = await page.evaluate(() => ({
    operatorPressed: document.querySelector('[data-guide-maze-mode="operator"]')?.getAttribute("aria-pressed"),
    operatorHidden: document.querySelector('[data-guide-maze-panel="operator"]')?.hidden,
    plainHidden: document.querySelector('[data-guide-maze-panel="plain"]')?.hidden,
  }));
  await page.click("[data-vm-menu-trigger]");
  const mobileState = await page.evaluate(() => ({
    active: document.querySelector('[data-vm-menu-nav] [aria-current="page"]')?.dataset.vmNav,
    clientWidth: document.documentElement.clientWidth,
    order: [...document.querySelectorAll("[data-vm-menu-nav] [data-vm-nav]")].map(link => link.dataset.vmNav),
    panelOpen: document.querySelector("[data-vm-menu-panel]")?.dataset.open,
    chapterColumns: getComputedStyle(document.querySelector(".guide-chapter")).gridTemplateColumns.split(" ").length,
    modeColumns: getComputedStyle(document.querySelector(".guide-mode-strip")).gridTemplateColumns.split(" ").length,
    sourceColumns: getComputedStyle(document.querySelector(".guide-sources")).gridTemplateColumns.split(" ").length,
    sectionTops: ["#guide-archscry", "#guide-maze", "#guide-strategium", "#how-vox-connects", "#guide-apocrypha"].map(selector => Math.round(document.querySelector(selector)?.getBoundingClientRect().top ?? -1)),
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(mobileState.panelOpen === "true", "Mobile menu should open from the shared trigger");
  expect(
    JSON.stringify(mobileState.order) === JSON.stringify(["home", "guide", "archscry", "maze", "strategium", "apocrypha"]),
    "Mobile menu should inherit the accepted navigation order"
  );
  expect(mobileState.active === "guide", "Mobile Guide link should retain active state");
  expect(
    mobileModeState.operatorPressed === "true" && mobileModeState.operatorHidden === false && mobileModeState.plainHidden === true,
    "A mobile pointer/touch-equivalent activation should switch the compact Maze specimen"
  );
  expect(mobileState.chapterColumns === 1, "Guide teaching chapters should stack naturally at 390px");
  expect(mobileState.modeColumns === 1 && mobileState.sourceColumns === 1, "Maze modes and the source continuation should avoid desktop-style compression on mobile");
  expect(mobileState.sectionTops.every((top, index, tops) => index === 0 || tops[index - 1] < top), "Mobile should preserve I -> II -> III -> IV -> V visual order");
  expect(mobileState.scrollWidth === mobileState.clientWidth, "Guide should not overflow horizontally at 390px");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  const reducedMotionState = await page.evaluate(() => ({
    animationDuration: getComputedStyle(document.querySelector(".guide-cta")).animationDuration,
    modeTransitionDuration: getComputedStyle(document.querySelector("[data-guide-maze-mode]")).transitionDuration,
    transitionDuration: getComputedStyle(document.querySelector(".guide-cta")).transitionDuration,
  }));
  expect(
    parseFloat(reducedMotionState.animationDuration) <= 0.001 &&
      parseFloat(reducedMotionState.transitionDuration) <= 0.001 &&
      parseFloat(reducedMotionState.modeTransitionDuration) <= 0.001,
    "Reduced motion should collapse Guide CTA and Maze-mode animation/transition duration"
  );

  await page.setViewport({ width: 720, height: 500 });
  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  const zoomEquivalentState = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(
    zoomEquivalentState.scrollWidth === zoomEquivalentState.clientWidth,
    "Guide should not overflow at the 720px CSS viewport equivalent of 200% zoom on 1440px"
  );
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

if (failures.length) {
  console.error("Guide browser smoke failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Guide browser smoke passed for semantic hierarchy, Maze atmosphere inheritance, readable teaching copy, all three truthful interactive Maze specimens, one CTA per product, non-link relationship flow, mobile nav/touch-equivalent activation, keyboard order, reduced motion, responsive overflow, and 200% zoom equivalence.");

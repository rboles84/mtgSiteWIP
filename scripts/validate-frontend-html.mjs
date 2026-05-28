import { readFile } from "node:fs/promises";

const publicPages = {
  home: "index.html",
  maze: "maze/index.html",
  archscry: "archscry/index.html",
  strategium: "strategium/index.html",
  apocrypha: "apocrypha/index.html",
  library: "library/index.html",
  privacy: "privacy/index.html",
  terms: "terms/index.html",
};

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(publicPages).map(async ([key, file]) => [key, await readFile(file, "utf8")])
  )
);
const scriptSources = {
  topbar: await readFile("assets/js/vm-topbar.js", "utf8"),
  maze: await readFile("research/research-init.js", "utf8"),
};
const livePublicPageKeys = Object.keys(publicPages).filter(key => key !== "library");

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function expectAbsent(source, pattern, label) {
  expect(!pattern.test(source), label);
}

function getExternalScriptTags(source) {
  return [...source.matchAll(/<script\b[^>]*\bsrc="[^"]+"[^>]*>/gi)].map(match => match[0]);
}

function getHeadSource(source) {
  const match = source.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return match ? match[1] : "";
}

function getStylesheetHrefs(source) {
  return [...getHeadSource(source).matchAll(/<link\b[^>]*>/gi)]
    .map(match => match[0])
    .filter(tag => /\brel\s*=\s*["']stylesheet["']/i.test(tag))
    .map(tag => tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? "")
    .filter(Boolean);
}

function getScriptTags(source) {
  return [...source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].map(match => ({
    attrs: match[1] ?? "",
    body: match[2] ?? "",
    tag: match[0],
  }));
}

function getImageTags(source) {
  return [...source.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
}

function scriptIsDeferred(tag) {
  return /\btype\s*=\s*"module"/i.test(tag) || /\bdefer\b/i.test(tag);
}

function inlineScriptIsExecutable(scriptTag) {
  if (/\bsrc\s*=/i.test(scriptTag.attrs)) return false;

  const typeMatch = scriptTag.attrs.match(/\btype\s*=\s*["']([^"']+)["']/i);
  const type = typeMatch ? typeMatch[1].trim().toLowerCase() : "";

  return (
    type === "" ||
    type === "text/javascript" ||
    type === "application/javascript" ||
    type === "text/ecmascript" ||
    type === "application/ecmascript" ||
    type === "module"
  );
}

function imageHasIntrinsicSize(tag) {
  return /\bwidth\s*=\s*"\d+"/i.test(tag) && /\bheight\s*=\s*"\d+"/i.test(tag);
}

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function getSectionTags(source) {
  return [...source.matchAll(/<section\b[^>]*>/gi)].map(match => match[0]);
}

function getAriaLabelledbyValues(tag) {
  const match = tag.match(/\baria-labelledby\s*=\s*"([^"]+)"/i);
  if (!match) return [];
  return match[1].trim().split(/\s+/).filter(Boolean);
}

for (const [key, source] of Object.entries(sources)) {
  for (const tag of getExternalScriptTags(source)) {
    expect(
      scriptIsDeferred(tag),
      `${publicPages[key]} should mark external scripts as type="module" or defer: ${tag}`
    );
  }

  for (const tag of getImageTags(source)) {
    expect(
      imageHasIntrinsicSize(tag),
      `${publicPages[key]} should give every <img> explicit width and height: ${tag}`
    );
  }
}

for (const key of livePublicPageKeys) {
  const source = sources[key];
  const file = publicPages[key];

  expect(
    countMatches(source, /role\s*=\s*"banner"/gi) === 1,
    `${file} should expose exactly one banner landmark`
  );
  expect(
    countMatches(source, /<main\b/gi) === 1,
    `${file} should expose exactly one <main> landmark`
  );
  expect(
    countMatches(source, /<footer\b/gi) === 1,
    `${file} should expose exactly one <footer> landmark`
  );
  expect(
    source.includes('aria-label="Main Navigation"'),
    `${file} should label the shared topbar nav as Main Navigation`
  );
  expect(
    source.includes('class="vm-menu-nav" aria-label="Mobile Navigation" data-vm-menu-nav'),
    `${file} should expose the mirrored mobile links as mobile navigation`
  );
  expectAbsent(
    source,
    /role\s*=\s*"menu(item)?"/i,
    `${file} should not use application menu roles for site navigation`
  );

  for (const sectionTag of getSectionTags(source)) {
    const labelledby = getAriaLabelledbyValues(sectionTag);
    expect(
      labelledby.length > 0,
      `${file} should give every <section> an aria-labelledby name: ${sectionTag}`
    );
    for (const id of labelledby) {
      expect(
        source.includes(`id="${id}"`),
        `${file} section aria-labelledby target should exist: ${id}`
      );
    }
  }
}

expectAbsent(
  scriptSources.topbar,
  /setAttribute\(\s*["']role["']\s*,\s*["']menuitem["']\s*\)/i,
  "assets/js/vm-topbar.js should keep mirrored mobile links as plain links"
);
expect(
  scriptSources.maze.includes('const MODAL_BACKGROUND_SELECTOR = "[data-maze-modal-background]"') &&
    scriptSources.maze.includes("setModalBackgroundInert(true)") &&
    scriptSources.maze.includes("setModalBackgroundInert(false)"),
  "research/research-init.js should toggle inert background content for the Maze modal"
);

expectAbsent(
  sources.maze,
  /\son(?:click|input|change|keydown)=/i,
  "maze/index.html should not ship inline event attributes"
);
expectAbsent(
  sources.archscry,
  /\son(?:click|input|change|keydown)=/i,
  "archscry/index.html should not ship inline event attributes"
);
expect(
  sources.archscry.includes('<link rel="stylesheet" href="../assets/css/archscry.css">'),
  'archscry/index.html should load "../assets/css/archscry.css"'
);
expectAbsent(
  sources.archscry,
  /<style\b[^>]*>/i,
  "archscry/index.html should not ship inline <style> blocks"
);
expect(
  sources.home.includes('<link rel="stylesheet" href="./assets/css/newindex2.css" />'),
  'index.html should load "./assets/css/newindex2.css"'
);
expect(
  sources.home.includes('<script src="./assets/js/newindex2.js" defer></script>'),
  'index.html should load "./assets/js/newindex2.js" as a deferred external script'
);
expectAbsent(
  sources.home,
  /<style\b[^>]*>/i,
  "index.html should not ship inline <style> blocks"
);
expect(
  !getScriptTags(sources.home).some(inlineScriptIsExecutable),
  "index.html should not ship executable inline <script> blocks"
);

expect(
  sources.strategium.includes('<link rel="stylesheet" href="../assets/css/strategium.css" />'),
  'strategium/index.html should load "../assets/css/strategium.css"'
);
expect(
  sources.strategium.includes('<script src="../assets/js/strategium.js" defer></script>'),
  'strategium/index.html should load "../assets/js/strategium.js" as a deferred external script'
);
expectAbsent(
  sources.strategium,
  /<style\b[^>]*>/i,
  "strategium/index.html should not ship inline <style> blocks"
);
expect(
  !getScriptTags(sources.strategium).some(inlineScriptIsExecutable),
  "strategium/index.html should not ship executable inline <script> blocks"
);

const newindexTopbarLinkIndex = sources.home.indexOf('./assets/css/topbar.css');
const newindexRouteCssIndex = sources.home.indexOf('./assets/css/newindex2.css');
expect(
  newindexTopbarLinkIndex !== -1 && newindexRouteCssIndex !== -1 && newindexTopbarLinkIndex < newindexRouteCssIndex,
  "index.html should load topbar.css before newindex2.css"
);

const archscryLastStylesheetTagIndex = sources.archscry.lastIndexOf('<link rel="stylesheet"');
const archscryRouteCssIndex = sources.archscry.lastIndexOf('../assets/css/archscry.css');
expect(
  archscryLastStylesheetTagIndex !== -1 &&
    archscryRouteCssIndex !== -1 &&
    archscryRouteCssIndex > archscryLastStylesheetTagIndex,
  "archscry/index.html should keep archscry.css as the last stylesheet in the head"
);

const strategiumStylesheetHrefs = getStylesheetHrefs(sources.strategium);
expect(
  strategiumStylesheetHrefs[strategiumStylesheetHrefs.length - 1] === "../assets/css/strategium.css",
  "strategium/index.html should keep strategium.css as the last stylesheet in the head"
);

expect(
  sources.maze.includes('src="../research/research-init.js"'),
  "maze/index.html should load the module from a relative file-safe path"
);
expect(
  sources.maze.includes('role="dialog"') &&
    sources.maze.includes('aria-modal="true"') &&
    sources.maze.includes('aria-labelledby="modal-title"'),
  "maze/index.html should expose dialog semantics on the modal wrapper"
);
expect(
  sources.library.includes('content="0; url=../apocrypha/"'),
  "library/index.html should use a relative-safe meta refresh target"
);
expect(
  sources.library.includes('href="../apocrypha/"'),
  "library/index.html should expose a relative-safe noscript fallback link"
);
expectAbsent(
  sources.library,
  /href="\/assets\/|src="\/assets\/|content="0; url=\/apocrypha\/"|window\.location\.replace\("\/apocrypha\/"\)/,
  "library/index.html should avoid root-absolute alias assets and redirects"
);

const legalNavTargets = [
  'href="../index.html"',
  'href="../archscry/index.html"',
  'href="../maze/index.html"',
  'href="../apocrypha/index.html"',
  'href="../strategium/index.html"',
];

for (const key of ["privacy", "terms"]) {
  const file = publicPages[key];
  const stylesheetHrefs = getStylesheetHrefs(sources[key]);

  expect(
    sources[key].includes('<link rel="stylesheet" href="../assets/css/legal.css">'),
    `${file} should load "../assets/css/legal.css"`
  );
  expect(
    stylesheetHrefs[stylesheetHrefs.length - 1] === "../assets/css/legal.css",
    `${file} should keep legal.css as the last stylesheet in the head`
  );
  expectAbsent(
    sources[key],
    /<style\b[^>]*>/i,
    `${file} should not ship inline <style> blocks`
  );
}

for (const href of legalNavTargets) {
  expect(
    sources.privacy.includes(href) && sources.terms.includes(href),
    `privacy/index.html and terms/index.html should keep the current shared-shell nav target ${href}`
  );
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log(
  "Frontend HTML validation passed for public script deferral, intrinsic image sizing, landmarks, navigation semantics, Maze, Archscry, Strategium, Library, Privacy, and Terms."
);

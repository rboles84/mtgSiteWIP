import { readFile } from "node:fs/promises";

const publicPages = {
  home: "index.html",
  homePreview: "newIndex2.html",
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

function getImageTags(source) {
  return [...source.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
}

function scriptIsDeferred(tag) {
  return /\btype\s*=\s*"module"/i.test(tag) || /\bdefer\b/i.test(tag);
}

function imageHasIntrinsicSize(tag) {
  return /\bwidth\s*=\s*"\d+"/i.test(tag) && /\bheight\s*=\s*"\d+"/i.test(tag);
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
  'href="../newIndex2.html"',
  'href="../archscry/index.html"',
  'href="../maze/index.html"',
  'href="../apocrypha/index.html"',
  'href="../strategium/index.html"',
];

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
  "Frontend HTML validation passed for public script deferral, intrinsic image sizing, Maze, Archscry, Library, Privacy, and Terms."
);

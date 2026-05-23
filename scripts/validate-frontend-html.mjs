import { readFile } from "node:fs/promises";

const files = {
  maze: "maze/index.html",
  archscry: "archscry/index.html",
  library: "library/index.html",
  privacy: "privacy/index.html",
  terms: "terms/index.html",
};

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, file]) => [key, await readFile(file, "utf8")])
  )
);

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function expectAbsent(source, pattern, label) {
  expect(!pattern.test(source), label);
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
expect(
  sources.privacy.includes('href="../maze/"') && sources.terms.includes('href="../maze/"'),
  "legal pages should keep their Maze navigation links"
);

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log("Frontend HTML validation passed for Maze, Archscry, Library, Privacy, and Terms.");

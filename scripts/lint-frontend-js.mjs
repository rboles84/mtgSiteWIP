import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const files = [
  "assets/js/gate-b1-runtime-contract.js",
  "assets/js/index.js",
  "assets/js/home.js",
  "assets/js/strategium.js",
  "assets/js/strategium-hub.js",
  "assets/js/strategium-review-paths.js",
  "assets/js/strategium-review.js",
  "research/research-init.js",
  "research/research-ui.js",
];

let failed = false;

for (const file of files) {
  const syntax = spawnSync(process.execPath, ["--check", file], {
    cwd: process.cwd(),
    encoding: "utf8",
  });

  if (syntax.status !== 0) {
    failed = true;
    process.stderr.write(`Syntax check failed for ${file}\n${syntax.stderr || syntax.stdout}\n`);
    continue;
  }

  const source = await readFile(file, "utf8");
  if (/onclick=|oninput=|onchange=|onkeydown=/.test(source)) {
    failed = true;
    process.stderr.write(`Inline handler pattern found in ${file}\n`);
  }
}

const archscrySource = await readFile("assets/js/index.js", "utf8");
if (archscrySource.includes("document.body.innerHTML")) {
  failed = true;
  process.stderr.write("Unsafe body-level HTML injection is still present in assets/js/index.js\n");
}
if (archscrySource.includes("avatar.innerHTML")) {
  failed = true;
  process.stderr.write("Unsafe avatar innerHTML usage is still present in assets/js/index.js\n");
}

if (failed) {
  process.exit(1);
}

console.log(`Frontend JS lint passed for ${files.length} files.`);

import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const routeChecks = [
  { label: "home -> Maze", from: "index.html", href: "./maze/" },
  { label: "home -> Apocrypha", from: "index.html", href: "./apocrypha/" },
  { label: "home -> Privacy", from: "index.html", href: "./privacy/" },
  { label: "home -> Terms", from: "index.html", href: "./terms/" },
  { label: "Archscry -> Maze", from: "archscry/index.html", href: "../maze/" },
  { label: "Maze -> Archscry", from: "maze/index.html", href: "../archscry/" },
  { label: "Library alias -> Apocrypha", from: "library/index.html", href: "../apocrypha/" },
];

const failures = [];

function routeTarget(fromFile, href) {
  return path.resolve(root, path.dirname(fromFile), href, "index.html");
}

for (const check of routeChecks) {
  const source = await readFile(path.resolve(root, check.from), "utf8");
  if (!source.includes(check.href)) {
    failures.push(`${check.label}: expected ${check.from} to include ${check.href}`);
    continue;
  }

  try {
    await access(routeTarget(check.from, check.href));
  } catch {
    failures.push(`${check.label}: target route file is missing`);
  }
}

const mazeSource = await readFile(path.resolve(root, "maze/index.html"), "utf8");
const archscrySource = await readFile(path.resolve(root, "archscry/index.html"), "utf8");

if (!mazeSource.includes('id="modal-wrap" role="dialog"')) {
  failures.push("Maze modal smoke check failed: dialog wrapper semantics are missing");
}
if (!mazeSource.includes('data-action="load-more"')) {
  failures.push("Maze modal smoke check failed: load-more action hook is missing");
}
if (!archscrySource.includes('data-action="start-quick-flow"')) {
  failures.push("Archscry smoke check failed: quick-flow action hook is missing");
}
if (!archscrySource.includes('data-action="submit-interview"')) {
  failures.push("Archscry smoke check failed: interview submit action hook is missing");
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log("Frontend smoke checks passed for home, Maze, Archscry, Library alias, Privacy, and Terms.");

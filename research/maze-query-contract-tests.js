import assert from "node:assert/strict";
import {
  MAZE_DOSSIER_PATH_TYPES,
  MAZE_QUERY_MODES,
  MAZE_QUERY_ORIGINS,
  applyMazeFormatToQuery,
  buildMazePathEntries,
  normalizeMazeQueryApiMetadata,
  normalizeMazeSourceContext,
  prepareRawSyntaxQuery,
  resolveMazeQueryRequest
} from "./maze-query-core.js";

assert.deepEqual(MAZE_QUERY_MODES, ["ai", "raw", "builder"]);
assert.ok(!MAZE_QUERY_MODES.includes("path"));
assert.deepEqual(MAZE_QUERY_ORIGINS, ["maze", "archscry", "path", "placement", "dossier"]);
assert.deepEqual(MAZE_DOSSIER_PATH_TYPES, [
  "commanders-that-fit",
  "support-cards",
  "flavor-echoes",
  "weird-stretch-commanders"
]);

const plain = resolveMazeQueryRequest({
  mode: "ai",
  input: "red vehicles with crew",
  options: { format: "commander", order: "released", unique: "art", dir: "desc" }
});
assert.equal(plain.mode, "ai");
assert.equal(plain.parserMode, "plain_reading");
assert.equal(plain.query, "c:r t:vehicle o:crew f:commander");
assert.equal(plain.plainReadingQuery, "red vehicles with crew");
assert.deepEqual(plain.api, {
  endpoint: "/cards/search",
  unique: "cards",
  order: "name",
  dir: "desc"
});
assert.equal(Object.hasOwn(plain, "adapterDiagnostics"), false);
assert.ok(plain.diagnostics.some((diagnostic) => diagnostic.code === "parser_confidence"));
assert.ok(plain.diagnostics.some((diagnostic) => diagnostic.code === "parser_recognized"));
assert.ok(plain.diagnostics.some((diagnostic) => diagnostic.code === "parser_assumption"));

const exact = resolveMazeQueryRequest({
  mode: "ai",
  input: "! Lightning Bolt"
});
assert.equal(exact.mode, "ai");
assert.equal(exact.parserMode, "exact_name");
assert.equal(exact.query, "Lightning Bolt");
assert.equal(exact.api.endpoint, "/cards/named");
assert.equal(exact.plainReadingQuery, "! Lightning Bolt");

const raw = resolveMazeQueryRequest({
  mode: "raw",
  input: "c:r AND t:creature",
  options: { format: "commander" }
});
assert.equal(raw.mode, "raw");
assert.equal(raw.parserMode, "raw");
assert.equal(raw.query, "c:r t:creature f:commander");
assert.equal(raw.normalized, true);
assert.equal(Object.hasOwn(raw, "adapterDiagnostics"), false);
assert.ok(raw.diagnostics.some((diagnostic) => diagnostic.code === "raw_recognized"));
assert.ok(raw.diagnostics.some((diagnostic) => diagnostic.code === "raw_assumption"));
assert.ok(raw.diagnostics.some((diagnostic) => diagnostic.code === "raw_alternative"));

const builder = resolveMazeQueryRequest({
  mode: "builder",
  builderFilters: {
    colors: ["R", "G"],
    colorOp: "id",
    types: ["Creature"],
    format: "commander",
    keywords: ["haste"],
    cmcMin: "2",
    cmcMax: "5",
    rarities: ["r"]
  }
});
assert.equal(builder.mode, "builder");
assert.equal(builder.parserMode, "builder");
assert.equal(builder.query, "id<=rg t:creature f:commander r:r mv>=2 mv<=5 kw:haste");

const launchSource = normalizeMazeSourceContext({
  origin: "archscry",
  launchContext: {
    from: "archscry",
    urlQ: "ignored",
    operatorQuery: "id=bg is:commander",
    plainReadingQuery: "Witherbloom commander candidates",
    pathType: "commanders-that-fit",
    returnUrl: "../archscry/",
    readingId: "red-reading",
    fit: "WITHERBLOOM",
    factionName: "Witherbloom College"
  }
});
assert.deepEqual(launchSource, {
  origin: "archscry",
  readingId: "red-reading",
  fit: "WITHERBLOOM",
  pathType: "commanders-that-fit",
  returnUrl: "../archscry/",
  plainReadingQuery: "Witherbloom commander candidates",
  operatorQuery: "id=bg is:commander",
  factionName: "Witherbloom College",
  from: "archscry",
  urlQ: "ignored"
});

const paths = buildMazePathEntries({
  identity: "bg",
  factionName: "Witherbloom College",
  oracleTerms: ["sacrifice", "graveyard"],
  flavorTerms: ["death", "growth"]
});
assert.equal(paths.length, 4);
assert.deepEqual(paths.map((path) => path.pathType), MAZE_DOSSIER_PATH_TYPES);
assert.equal(paths[0].query, "id=bg is:commander f:commander (o:sacrifice OR o:graveyard)");
assert.equal(paths[0].plainReadingQuery, "Witherbloom College commanders with exactly black-green identity");

assert.deepEqual(normalizeMazeQueryApiMetadata({
  unique: "prints",
  order: "usd",
  dir: "desc",
  endpoint: "/cards/search"
}), {
  endpoint: "/cards/search",
  unique: "prints",
  order: "usd",
  dir: "desc"
});

assert.deepEqual(normalizeMazeQueryApiMetadata({ endpoint: "/cards/named", order: "usd" }), {
  endpoint: "/cards/named"
});

assert.deepEqual(applyMazeFormatToQuery("c:u f:modern", { format: "commander" }), {
  query: "c:u f:modern",
  changed: false,
  format: ""
});

assert.deepEqual(prepareRawSyntaxQuery("o:draw AND t:creature").query, "o:draw t:creature");

console.log("Maze query contract tests passed.");

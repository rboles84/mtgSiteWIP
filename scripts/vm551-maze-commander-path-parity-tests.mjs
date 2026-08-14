import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildDossierMazePathEntries, validateMazeSemanticParity } from "../assets/js/maze-handoff.js";

const factions = JSON.parse(await readFile(new URL("../data/factions.json", import.meta.url), "utf8")).factions;
const forbiddenInvisibleRestriction = /(?:^|\s)[-+]?(?:o|oracle|t|type|ft|flavor|usd|eur|tix|set|e|rarity|r|legal|format):/i;
const rows = [];

for (const faction of Object.values(factions)) {
  const identity = faction.key === "COLORLESS" ? "C" : (faction.colors || []).join("");
  const paths = buildDossierMazePathEntries({
    identity,
    factionName: faction.name,
    identityHint: faction.key,
    oracleTerms: ["tokens", 'o:"token army"', "aggro", "aggressive"],
    flavorTerms: ["law", "growth"],
  });
  const commanderPath = paths.find((path) => path.pathType === "commanders-that-fit" || path.pathType === "colorless-identity");
  assert.ok(commanderPath, `${faction.key} must expose a basic commander path`);
  assert.doesNotMatch(commanderPath.query, forbiddenInvisibleRestriction, `${faction.key} commander path must not add an invisible mechanic/type/text/price/set restriction`);
  assert.match(commanderPath.query, /^id=[a-z]+ is:commander f:commander$/, `${faction.key} commander path must contain only exact identity, Commander type, and Commander legality`);
  assert.match(commanderPath.plainReadingQuery, /commanders with (?:exactly|strict)/i, `${faction.key} visible intent must state the exact/strict identity scope`);
  for (const mazePath of paths) {
    const parity = validateMazeSemanticParity(mazePath);
    assert.equal(parity.valid, true, `${faction.key}/${mazePath.pathType} hid or misstated constraints: ${JSON.stringify(parity)}`);
    rows.push({ identity: faction.key, path_type: mazePath.pathType, plain: mazePath.plainReadingQuery, operator: mazePath.query, constraints: parity.actual, status: "PASS" });
  }
}

assert.ok(rows.length >= 37 * 3);
assert.equal(new Set(rows.map((row) => row.identity)).size, 37);
const jundSupport = rows.find((row) => row.identity === "JUND" && row.path_type === "support-cards");
assert.ok(jundSupport);
assert.match(jundSupport.plain, /tokens, token army, aggro, or aggressive/i);
assert.doesNotMatch(jundSupport.operator, /control|permission/i, "Jund must not inherit generic control/permission filters");
console.log(JSON.stringify({ status: "PASS", identities: 37, paths: rows.length, hidden_restrictions: 0 }, null, 2));

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildDossierMazePathEntries } from "../assets/js/maze-handoff.js";

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
  rows.push({ identity: faction.key, path_type: commanderPath.pathType, plain: commanderPath.plainReadingQuery, operator: commanderPath.query, status: "PASS" });
}

assert.equal(rows.length, 37);
assert.equal(new Set(rows.map((row) => row.identity)).size, 37);
console.log(JSON.stringify({ status: "PASS", identities: rows.length, path_type: "basic commanders that fit", hidden_restrictions: 0 }, null, 2));

import assert from "node:assert/strict";
import fs from "node:fs";

import { presentationForFaction } from "../../assets/js/archscry/archscry-presentation.js";
import { COMMANDER_FACTION_GUIDANCE } from "../../assets/js/archscry/dossier/foundation.js";
import { buildPublicPreconRationale } from "../../assets/js/archscry/dossier/precons.js";
import { renderPlayerCopy } from "../../assets/js/archscry/runtime/render-utils.js";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const profile = readJson("data/raw-factions/wubrg/wubrg.profile.json");
const claims = readJson("data/raw-factions/wubrg/wubrg.claims.json");
const source = readJson("data/dossier/identity-dossier-content.source.json");
const catalog = readJson("data/dossier/identity-dossier-content.catalog.json");
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const identityLayers = readJson("data/identity-layers.json");
const factions = readJson("data/factions.json");
const runtimeDataSource = fs.readFileSync("assets/js/archscry/runtime/data.js", "utf8");
const runtimeStateSource = fs.readFileSync("assets/js/archscry/runtime/state.js", "utf8");
const readingSource = fs.readFileSync("assets/js/archscry/dossier/reading.js", "utf8");
const wubrgSource = source.records.find((record) => record.identity_key === "WUBRG");
const wubrgCatalog = catalog.records.find((record) => record.identity_key === "WUBRG");
const presentation = presentationForFaction("WUBRG");
const dossier = wubrgCatalog;

assert.equal(claims.claims.length, 8, "the certified WUBRG claim set must remain intact");
assert.equal(profile.semantic_model.hero_anchor, "All five colors are available. What brings them together depends on the deck.");
assert.equal(identityLayers.expressions.WUBRG.display.tagline, profile.semantic_model.hero_anchor);
assert.equal(presentation.thesis, profile.semantic_model.hero_anchor);
assert.match(runtimeDataSource, /=== "WUBRG"\) return "Five-Color"/);
assert.match(runtimeStateSource, /name: "Five-Color"/);
assert.match(readingSource, /name: "Five-Color"/);

assert.equal(wubrgSource.semantic_model.full_spectrum_integrator, "optional_vox_mana_archetype");
assert.equal(wubrgCatalog.semantic_model.full_spectrum_integrator, "optional_vox_mana_archetype");
assert.equal(wubrgCatalog.what_to_look_for[0].source_role, "optional_vox_mana_archetype");
assert.match(wubrgCatalog.what_to_look_for[0].copy, /Optional Vox Mana archetype/);
assert.ok(wubrgCatalog.what_to_look_for.every((item) => item.source_locator.startsWith("data/raw-factions/wubrg/")));
assert.doesNotMatch(JSON.stringify(wubrgSource), /data\/factions\.json/);
const rainbowPayoffs = wubrgCatalog.what_to_look_for.find((item) => item.title === "Rainbow Payoffs");
assert.ok(rainbowPayoffs, "WUBRG What to Look For must expose Rainbow Payoffs alongside Start Here");
assert.match(rainbowPayoffs.copy, /assembling, spending, controlling, or representing several or all five colors/i);
assert.doesNotMatch(rainbowPayoffs.copy, /Domain/i, "Domain must not be presented as inherently Rainbow Payoffs");

assert.deepEqual(
  profile.semantic_model.mechanic_relationships.map((entry) => entry.classification),
  ["direct_defining", "direct_strong", "strongly_associated", "compatible_nonexclusive", "situational", "infrastructure", "supportive_not_defining"]
);
assert.match(dossier.how_this_plays.mechanical_expression, /Direct Five-Color mechanics ask you to assemble or spend all five colors/i);
assert.match(dossier.how_this_plays.mechanical_expression, /color-count payoffs, land-type engines, multicolor systems, typal reach, or toolbox breadth/i);

for (const [label, value] of Object.entries(dossier.how_this_plays)) {
  assert.doesNotMatch(value, /the full-spectrum integrator|the all-five-color expression/i, `${label} must not universalize the optional Integrator lens`);
}
assert.match(wubrgCatalog.test_the_fit.positive_self_check, /materially serves/i);
assert.doesNotMatch(wubrgCatalog.test_the_fit.positive_self_check, /specifically calls for all five colors/i);
assert.match(dossier.how_this_plays.role, /commander determines the deck's engine, tribe, payoff, or tool suite/i);
assert.match(dossier.how_this_plays.emotional_pressure, /uncertainty through breadth/i);
assert.match(dossier.how_this_plays.lore_role, /possible readings rather than universal doctrine/i);
assert.match(dossier.how_this_plays.table_experience, /actual reason for being Five-Color/i);

const expectedWubrgFaceCommanders = new Map([
  ["Painbow", "Jared Carthalion"],
  ["Dance of the Elements", "Ashling, the Limitless"],
  ["Sliver Swarm", "Sliver Gravemother"],
  ["Turtle Power!", "Leonardo, the Balance"],
  ["Draconic Domination", "The Ur-Dragon"],
]);
for (const [deckName, commander] of expectedWubrgFaceCommanders) {
  const sourcePrecon = preconSource.precons.find((precon) => precon.deckName === deckName);
  const catalogPrecon = preconCatalog.precons.find((precon) => precon.deckName === deckName);
  assert.equal(sourcePrecon?.mainCommander, commander, `${deckName} source must retain its verified face commander`);
  assert.equal(catalogPrecon?.mainCommander, commander, `${deckName} generated catalog must retain its verified face commander`);
  assert.equal(catalogPrecon?.colorIdentityKey, "WUBRG", `${deckName} must remain an exact WUBRG color fit`);
}
const turtlePowerSource = preconSource.precons.find((precon) => precon.deckName === "Turtle Power!");
assert.ok(turtlePowerSource?.secondaryCommanders.includes("Heroes in a Half Shell"), "Turtle Power! must retain Heroes in a Half Shell as an alternate commander");
const painbow = preconCatalog.precons.find((precon) => precon.deckName === "Painbow");
const painbowRationale = buildPublicPreconRationale({
  precon: painbow,
  lane: "exact",
  activeIdentity: "WUBRG",
  candidateIdentity: "WUBRG",
});
assert.match(painbowRationale?.text || "", /^Recorded plan:/, "WUBRG precons must explain their distinct recorded plans rather than repeat a generic exact-color sentence");
assert.doesNotMatch(painbowRationale?.text || "", /This deck shares the reading/i);

const explorationDirections = [
  ...COMMANDER_FACTION_GUIDANCE.WUBRG.starterSearchTags,
  ...factions.factions.WUBRG.archetypes.slice(0, 2).map((item) => item.name),
];
assert.deepEqual(explorationDirections, ["Fixing & Ramp", "Rainbow Payoffs", "Full-Spectrum Integrator", "Five-Color Toolbox"]);
assert.equal(new Set(explorationDirections).size, 4, "WUBRG should expose exactly four distinct exploration directions");

const boundedCopy = "Vox Mana may explore Full-Spectrum Integrator as an optional archetype.";
assert.equal(renderPlayerCopy(boundedCopy), boundedCopy, "the renderer must preserve explicit Vox Mana and optionality qualifiers");
assert.doesNotMatch(JSON.stringify({ presentation, dossier }), /every color must|single unified philosophy|universal synthesis/i);

console.log("WUBRG semantic repair tests passed.");

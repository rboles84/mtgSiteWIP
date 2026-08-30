import assert from "node:assert/strict";
import fs from "node:fs";

import { presentationForFaction } from "../../assets/js/archscry/archscry-presentation.js";
import { COMMANDER_FACTION_GUIDANCE } from "../../assets/js/archscry/dossier/foundation.js";
import { buildCommanderStartingLane } from "../../assets/js/archscry/dossier/reading.js";
import { buildPreconRecommendations, selectPreconPreviewRecommendations } from "../../assets/js/archscry/dossier/precons.js";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const source = readJson("data/dossier/identity-dossier-content.source.json");
const catalog = readJson("data/dossier/identity-dossier-content.catalog.json");
const factions = readJson("data/factions.json");
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const loreholdSource = source.records.find((record) => record.identity_key === "LOREHOLD");
const loreholdCatalog = catalog.records.find((record) => record.identity_key === "LOREHOLD");
const loreholdPresentation = presentationForFaction("LOREHOLD");

assert.equal(loreholdSource.semantic_model.history_fighting_back, "vox_mana_play_translation");
assert.equal(loreholdCatalog.semantic_model.historic_term_guard, "magic_rules_term_not_synonym_for_historical");
assert.ok(loreholdCatalog.what_to_look_for.every((item) => item.source_locator.startsWith("data/raw-factions/lorehold/") || item.source_locator.startsWith("data/precons/")));
assert.doesNotMatch(JSON.stringify(loreholdSource), /data\/factions\.json|historic payoffs/i);
assert.equal(loreholdSource.proposed_public_copy.test_the_fit.tension_failure_mode, "Lorehold lives between careful preservation and discovery that can be adventurous, messy, or risky. A deck can lean toward either side, but history should be doing real work.");
assert.equal(loreholdSource.proposed_public_copy.how_this_plays.role, "History in action");
assert.doesNotMatch(loreholdSource.proposed_public_copy.how_this_plays.how_opponents_read_it, /opponents feel/i);
assert.notEqual(loreholdSource.proposed_public_copy.how_this_plays.emotional_pressure, loreholdSource.proposed_public_copy.how_this_plays.table_experience);
assert.match(loreholdPresentation.tableExperience, /history fights back/i);
assert.doesNotMatch(loreholdPresentation.mechanics, /historic payoffs/i);
assert.deepEqual(
  COMMANDER_FACTION_GUIDANCE.LOREHOLD.starterDirections,
  ["Spirit Witnesses / Graveyard-Leaves", "Relic Reconstruction", "History & Spells"]
);
assert.deepEqual(loreholdSource.proposed_public_copy.what_to_look_for.map((item) => item.title), COMMANDER_FACTION_GUIDANCE.LOREHOLD.starterDirections);
const loreholdStartHere = buildCommanderStartingLane({ faction: factions.factions.LOREHOLD });
const possibleDirections = loreholdStartHere.details.find((detail) => detail.label === "Possible directions");
const renderedPrimaryLanes = possibleDirections.copy
  .replace(/^Explore /, "")
  .replace(/\. Compare these lanes.*$/, "")
  .split(", ");
const acceptedLoreholdLanes = ["Spirit Witnesses / Graveyard-Leaves", "Relic Reconstruction", "History & Spells"];
assert.deepEqual([...new Set(renderedPrimaryLanes)].sort(), [...acceptedLoreholdLanes].sort(), "Start Here must render exactly the accepted Lorehold primary taxonomy");
assert.deepEqual([...new Set(loreholdSource.proposed_public_copy.what_to_look_for.map((item) => item.title))].sort(), [...acceptedLoreholdLanes].sort(), "What to Look For must render the same accepted Lorehold primary taxonomy");
assert.ok(!renderedPrimaryLanes.some((lane) => /Spirit Tribal|Boros Artifacts|^Graveyard$/i.test(lane)), "Start Here must not reintroduce rejected generic Lorehold lanes");
assert.match(factions.factions.LOREHOLD.philosophy, /recover, question, and put to use/i);
assert.doesNotMatch(factions.factions.LOREHOLD.philosophy, /predict the future|physically reckless/i);

const nativeSources = new Map(preconSource.precons.filter((precon) => precon.factionRefs?.includes("LOREHOLD")).map((precon) => [precon.deckName, precon]));
assert.equal(nativeSources.get("Lorehold Legacies")?.sourcePage, "https://magic.wizards.com/en/news/announcements/commander-2021-edition-decklists-2021-04-05");
assert.equal(nativeSources.get("Lorehold Legacies")?.mainCommander, "Osgir, the Reconstructor");
assert.equal(nativeSources.get("Lorehold Legacies")?.mainStrategy, "Sacrifice artifacts for value, then use Osgir to turn artifact cards in the graveyard into reconstructed token copies.");
assert.doesNotMatch(JSON.stringify(nativeSources.get("Lorehold Legacies")), /milestone|praised|power upgrade/i);
assert.equal(nativeSources.get("Lorehold Spirit")?.sourcePage, "https://magic.wizards.com/en/news/announcements/secrets-of-strixhaven-commander-decklists");
assert.equal(nativeSources.get("Lorehold Spirit")?.mainCommander, "Quintorius, History Chaser");
const rebellionRising = preconSource.precons.find((precon) => precon.deckName === "Rebellion Rising");
assert.doesNotMatch(`${rebellionRising?.deckDescription} ${rebellionRising?.mainStrategy}`, /Boros/i);

const recommendations = buildPreconRecommendations({
  faction: factions.factions.LOREHOLD,
  dossier: { faction: factions.factions.LOREHOLD },
  preconCatalog,
  preconThemeTaxonomy,
});
assert.deepEqual(recommendations.nativeExact.map((precon) => precon.deckName).sort(), ["Lorehold Legacies", "Lorehold Spirit"]);
assert.ok(recommendations.otherExact.every((precon) => !["Lorehold Legacies", "Lorehold Spirit"].includes(precon.deckName)));
assert.ok(recommendations.otherExact.every((precon) => !/Boros/i.test(`${precon.deckDescription} ${precon.mainStrategy}`)));
assert.ok(selectPreconPreviewRecommendations(recommendations).visible.slice(0, 2).every((precon) => ["Lorehold Legacies", "Lorehold Spirit"].includes(precon.deckName)));

console.log("Lorehold semantic repair tests passed.");

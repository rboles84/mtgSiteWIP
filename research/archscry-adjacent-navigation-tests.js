import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  buildArchscryMazeContext,
  withArchscryMazeContext,
} from "../assets/js/archscry-presentation.js";
import { getDossierRadarProfile } from "../assets/js/dossier-radar.js";

const indexSource = await readFile(new URL("../assets/js/index.js", import.meta.url), "utf8");

const resultStatusIndex = indexSource.indexOf("const resultStatusHtml =");
const placementPanelIndex = indexSource.indexOf("const placementPanelHtml =");
const adjacentPanelIndex = indexSource.indexOf('id: "adjacent", content: `${returnToPrimaryButton}${adjacentSectionHtml}`');

assert.ok(resultStatusIndex >= 0, "expected renderResult to define resultStatusHtml");
assert.ok(placementPanelIndex >= 0, "expected renderResult to define placementPanelHtml");
assert.ok(
  resultStatusIndex < placementPanelIndex,
  "resultStatusHtml should be declared before the placement panel is built"
);
assert.ok(
  adjacentPanelIndex >= 0,
  "expected adjacent dossier panel to retain the Back to Primary control"
);

assert.match(
  indexSource,
  /function returnToPrimaryReading\(\)\s*\{/,
  "expected an explicit return helper for adjacent-fit views"
);
assert.match(
  indexSource,
  /Back to Primary Reading/,
  "expected the adjacent-fit return button label"
);
assert.match(
  indexSource,
  /buildActionAttrs\("return-primary-reading"\)/,
  "expected the return control to expose the delegated action hook"
);

const primaryProfile = getDossierRadarProfile(
  { faction: "R" },
  { key: "R", colors: ["R"], name: "Red" }
);
assert.equal(primaryProfile.key, "R", "primary mono views should keep their direct primary radar profile");
assert.equal(primaryProfile.name, "Red", "primary mono views should keep the primary profile label");

const adjacentProfile = getDossierRadarProfile(
  { faction: "R" },
  { key: "BR", colors: ["B", "R"], name: "Rakdos" }
);
assert.equal(adjacentProfile.key, "BR", "adjacent dossier views should resolve from the active dossier faction");
assert.equal(adjacentProfile.name, "Rakdos", "adjacent dossier views should expose the adjacent faction label");

const placementOnlyProfile = getDossierRadarProfile({ faction: "R" });
assert.equal(placementOnlyProfile.key, "R", "placement-only restores should still resolve the primary radar profile");

const fallbackAdjacentProfile = getDossierRadarProfile(
  { faction: "R" },
  { key: "XBR", colors: ["B", "R"], name: "Cult of Rakdos" }
);
assert.equal(fallbackAdjacentProfile.key, "XBR", "fallback profiles should inherit the viewed dossier faction key");
assert.equal(fallbackAdjacentProfile.name, "Cult of Rakdos", "fallback profiles should inherit the viewed dossier faction label");
assert.deepEqual(
  fallbackAdjacentProfile.components,
  ["B", "R"],
  "fallback profiles should preserve the viewed dossier color components"
);

const adjacentMazeContext = buildArchscryMazeContext({
  result: {
    faction: "R",
    faction_name: "Red",
    taken_at: "2026-05-27T10:00:00.000Z"
  },
  dossier: {
    primaryFactionKey: "R",
    targetFactionKey: "WITHERBLOOM",
    faction: { name: "Witherbloom College" }
  },
  faction: { name: "Witherbloom College" }
});
assert.equal(adjacentMazeContext.guild, "R");
assert.equal(adjacentMazeContext.fit, "WITHERBLOOM");
assert.equal(adjacentMazeContext.factionName, "Witherbloom College");
assert.match(adjacentMazeContext.returnUrl, /view=WITHERBLOOM/);

const [adjacentMazeLink] = withArchscryMazeContext([{
  service: "maze",
  label: "commanders that fit",
  pathType: "commanders-that-fit",
  plainReadingQuery: "Witherbloom College commander candidates in black-green Commander identity",
  operatorQuery: "id<=bg is:commander f:commander (o:sacrifice OR o:graveyard)",
  url: "/maze/?q=id%3C%3Dbg%20is%3Acommander"
}], adjacentMazeContext, "http://localhost/archscry/index.html");
const adjacentMazeUrl = new URL(adjacentMazeLink.url, "http://localhost/archscry/index.html");
assert.equal(adjacentMazeUrl.searchParams.get("fit"), "WITHERBLOOM");
assert.equal(adjacentMazeUrl.searchParams.get("factionName"), "Witherbloom College");
assert.equal(adjacentMazeUrl.searchParams.get("operatorQuery"), "id<=bg is:commander f:commander (o:sacrifice OR o:graveyard)");

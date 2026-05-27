import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildTagExplanationSummaries,
  selectReadingTagRefs,
} from "../assets/js/archscry-presentation.js";
import {
  buildCommanderLandRecommendations,
} from "../assets/js/commander-dossier.js";

const indexSource = await readFile(new URL("../assets/js/index.js", import.meta.url), "utf8");
const radarSource = await readFile(new URL("../assets/js/dossier-radar.js", import.meta.url), "utf8");
const presentationSource = await readFile(new URL("../assets/js/archscry-presentation.js", import.meta.url), "utf8");
const archscryCssSource = await readFile(new URL("../assets/css/archscry.css", import.meta.url), "utf8");
const factionsData = JSON.parse(await readFile(new URL("../data/factions.json", import.meta.url), "utf8"));
const identityLayers = JSON.parse(await readFile(new URL("../data/identity-layers.json", import.meta.url), "utf8"));
const flavorSnippets = JSON.parse(await readFile(new URL("../data/archscry-flavor-snippets.json", import.meta.url), "utf8"));
const commanderFlavorIndex = JSON.parse(await readFile(new URL("../data/scryfall/indexes/commander-index.json", import.meta.url), "utf8"));
const cardFlavorIndex = JSON.parse(await readFile(new URL("../data/scryfall/indexes/card-flavor-index.json", import.meta.url), "utf8"));

const snapshotStart = indexSource.indexOf("function buildPlacementSnapshotHtml");
const snapshotEnd = indexSource.indexOf("function normalizeDossierSegment", snapshotStart);
const snapshotSource = indexSource.slice(snapshotStart, snapshotEnd);
const panelConfigStart = indexSource.indexOf("const DOSSIER_PANEL_CONFIG");
const panelConfigEnd = indexSource.indexOf("];", panelConfigStart);
const panelConfigSource = indexSource.slice(panelConfigStart, panelConfigEnd);
const deckStartsPanelStart = indexSource.indexOf("const deckStartsPanelHtml =");
const deckStartsPanelEnd = indexSource.indexOf("const starterCardsPanelHtml =", deckStartsPanelStart);
const deckStartsPanelSource = indexSource.slice(deckStartsPanelStart, deckStartsPanelEnd);
const preconRendererStart = indexSource.indexOf("function buildPreconLinks");
const preconRendererEnd = indexSource.indexOf("function writeArchscryDossierHandoff", preconRendererStart);
const preconRendererSource = indexSource.slice(preconRendererStart, preconRendererEnd);

assert.match(indexSource, /Open Start Here first/, "expected the placement snapshot to orient new readers toward Start Here first");
assert.match(indexSource, /Belief/, "expected Layered Identity to start with a Belief card");
assert.match(indexSource, /Tension/, "expected Layered Identity to include a Tension card");
assert.match(indexSource, /Self-Check/, "expected Layered Identity to include a Self-Check card");
assert.match(indexSource, /identity-story-card--belief/, "expected Belief to be the weighted primary identity card");
assert.doesNotMatch(indexSource, /identity-expression-glyph|formatPurity|Color focus|Pending color calibration|<div class="starter-title">Color Focus<\/div>/, "expected expression glyph and percentage-style copy to be removed from Layered Identity");
assert.match(indexSource, /What This Looks Like In Cards/, "expected Flavor Echoes to be renamed for new players");
assert.match(indexSource, /How this usually starts/, "expected the snapshot to expose a newcomer-facing commander starting cue");
assert.doesNotMatch(snapshotSource, /commanderLane\.title/, "expected the placement snapshot to stop using commanderLane.title directly");
assert.match(indexSource, /Signals From Your Answers/, "expected Reading Omens to be renamed for new players");
assert.match(indexSource, /Commander Lanes/, "expected Playstyle Archetypes to be renamed Commander Lanes");
assert.match(indexSource, /precons\/vox-mana-precon-catalog\.json/, "expected Archscry to load the generated precon catalog");
assert.match(indexSource, /taxonomy\/vox-mana-precon-themes\.json/, "expected Archscry to load the precon theme taxonomy");
assert.match(indexSource, /Recommended Precon Decks/, "expected Archscry to render a precon recommendation subsection");
assert.match(indexSource, /selectPreconPreviewRecommendations/, "expected Archscry to cap precon presentation through the preview selector");
assert.match(preconRendererSource, /data-precon-card/, "expected compact precon cards to expose a stable test hook");
assert.match(preconRendererSource, /Native fit/, "expected native exact precons to render as Native fit cards");
assert.match(preconRendererSource, /Exact-color fit/, "expected sibling exact precons to render as Exact-color fit cards");
assert.match(preconRendererSource, /Stretch fit/, "expected stretch precons to render as Stretch fit cards");
assert.match(preconRendererSource, /chips\.length >= 3/, "expected compact precon chips to cap at three");
assert.match(preconRendererSource, /preview\.remaining/, "expected compact precon rendering to support revealable remaining cards");
assert.match(preconRendererSource, /Display other \$\{remainingCount\}/, "expected overflow control to invite revealing the hidden recommendation count");
assert.match(preconRendererSource, /Show first \$\{preview\.visible\.length\} precons/, "expected overflow control to swap back to the first visible precons");
assert.match(preconRendererSource, /toggle-precon-preview/, "expected precon reveal controls to use the shared Archscry action handler");
assert.match(preconRendererSource, /data-precon-preview-grid="remaining" hidden/, "expected remaining precons to render as a hidden swappable grid");
assert.match(indexSource, /function togglePreconPreview/, "expected precon reveal to toggle in place without rerendering the dossier");
assert.match(preconRendererSource, /No validated precon recommendations are available for this dossier yet/, "expected compact precon empty state copy");
assert.doesNotMatch(preconRendererSource, /Skip if|precons=1|#precons|Full precon browsing can be added later/, "expected compact precons to avoid bulky skip blocks, Apocrypha routing, and dead-end overflow copy");
assert.doesNotMatch(preconRendererSource, /renderResult\(activeViewKey\)|setPreconPreviewExpanded/, "expected precon reveal toggles to avoid full dossier rerenders and scroll jumps");
assert.match(indexSource, /data-dossier-utility-actions/, "expected focus-mode utility actions to be rendered");
assert.match(indexSource, /window\.confirm\(confirmMessage\)/, "expected retake to require confirmation through the shared handler");
assert.doesNotMatch(indexSource, /signal-technical/, "expected standalone signal-technical copy to be removed from live output");
assert.ok(
  panelConfigSource.indexOf('id: "start"') > panelConfigSource.indexOf('id: "placement"') &&
    panelConfigSource.indexOf('id: "start"') < panelConfigSource.indexOf('id: "why"'),
  "expected Start Here to be the second dossier panel"
);
assert.ok(
  deckStartsPanelSource.indexOf("Recommended Precon Decks") < deckStartsPanelSource.indexOf("Commander Deck Starts") &&
    deckStartsPanelSource.indexOf("Commander Deck Starts") < deckStartsPanelSource.indexOf("Commander Lanes"),
  "expected commander-deck-starts panel order to be Precons, Commander Deck Starts, Commander Lanes"
);

assert.doesNotMatch(radarSource, /dossierRadarCaption/, "expected the lower dossier radar caption to be removed");
assert.doesNotMatch(radarSource, /dossierDatasetPills/, "expected the lower dossier radar dataset pills to be removed");
assert.doesNotMatch(radarSource, /dossierTierLabels|tierLabels/, "expected radar tier labels to be removed from the live dossier chart");
assert.doesNotMatch(radarSource, /vm-faction-signal-panel/, "expected the decorative faction signal companion panel to be removed");
assert.match(radarSource, /Cards That Sound Like This/, "expected the radar companion area to render card flavor voices");
assert.match(radarSource, /data-archscry-card-voices/, "expected card voices to expose a stable data hook");
assert.match(radarSource, /not a raw mana-score ledger/, "expected the matrix note to describe the authored profile source");
assert.match(archscryCssSource, /card-preview-overlay/, "expected starter and land cards to use an unclipped preview overlay");
assert.match(archscryCssSource, /precon-grid\.is-compact/, "expected Archscry CSS to style the compact precon preview grid");
assert.match(archscryCssSource, /precon-grid\.is-compact\[hidden\]\s*\{\s*display:\s*none/, "expected hidden precon preview grids to remain visually hidden despite compact grid display styles");
assert.match(archscryCssSource, /precon-badge\.is-native/, "expected Archscry CSS to distinguish native-fit precon badges");
assert.match(archscryCssSource, /precon-reveal-btn/, "expected Archscry CSS to style the reveal remaining precons control");
assert.doesNotMatch(archscryCssSource, /\.staple-img:hover\{[^}]*transform:scale\(3\)/, "expected starter card hover to stop scaling inside clipped panels");
assert.doesNotMatch(archscryCssSource, /\.land-img:hover\{[^}]*transform:scale\(3\)/, "expected mana-base hover to stop scaling inside clipped panels");
assert.doesNotMatch(archscryCssSource, /vm-faction-signal|vm-signal-node|vm-signal-ring|identity-expression-glyph/, "expected removed expression and faction-signal styles to stay out of Archscry CSS");

const allIndexedFlavor = new Set([
  ...(commanderFlavorIndex.commanders || []).map((card) => card.flavor_excerpt).filter(Boolean),
  ...(cardFlavorIndex.cards || []).map((card) => card.flavor_excerpt).filter(Boolean),
]);

const currentFactionKeys = Object.keys(factionsData.factions || {});
assert.equal(currentFactionKeys.length, 20, "expected the current Archscry faction set to contain 20 keys");
currentFactionKeys.forEach((key) => {
  const faction = factionsData.factions[key];
  const expressionKey = faction.identity?.expression_key || key;
  const expression = identityLayers.expressions?.[expressionKey] || {};
  const color = identityLayers.colors?.[faction.identity?.core_color || expression.core_color] || {};
  const tension = faction.core_tension || expression.core_tension || color.core_tension || "";
  assert.ok(tension.trim(), `expected ${key} to resolve non-empty core_tension`);

  const snippets = flavorSnippets.snippets?.[key] || [];
  assert.ok(snippets.length >= 2 && snippets.length <= 3, `expected ${key} to have 2-3 card voice snippets`);
  snippets.forEach((snippet) => {
    assert.equal(snippet.faction_key, key, `expected ${key} snippet to preserve faction_key`);
    assert.ok(snippet.card_name, `expected ${key} snippet to include card_name`);
    assert.ok(snippet.flavor_excerpt, `expected ${key} snippet to include flavor_excerpt`);
    assert.ok(snippet.scryfall_uri?.startsWith("https://scryfall.com/card/"), `expected ${key} snippet to include Scryfall URI`);
    assert.match(snippet.source_type, /^(native_commander|matched_commander|matched_card)$/, `expected ${key} snippet source_type to be known`);
    assert.ok(allIndexedFlavor.has(snippet.flavor_excerpt), `expected ${key} snippet text to come from committed Scryfall indexes`);
  });
});

[
  ["LOREHOLD", "WR"],
  ["PRISMARI", "UR"],
  ["QUANDRIX", "UG"],
  ["SILVERQUILL", "WB"],
  ["WITHERBLOOM", "BG"],
].forEach(([collegeKey, guildKey]) => {
  assert.ok(identityLayers.expressions[collegeKey]?.core_tension, `expected ${collegeKey} to have expression core_tension`);
  assert.notEqual(
    identityLayers.expressions[collegeKey]?.core_tension,
    factionsData.factions[guildKey]?.core_tension,
    `expected ${collegeKey} tension to stay distinct from ${guildKey}`
  );
});

const whiteLands = buildCommanderLandRecommendations(factionsData.factions.W);
const renderedWhiteLands = [
  ...whiteLands.premium,
  ...whiteLands.midrange,
  ...whiteLands.budget,
  ...whiteLands.utility,
];
const normalizedWhiteLands = renderedWhiteLands.map((name) => name.toLowerCase());
assert.equal(
  normalizedWhiteLands.filter((name) => name.includes("war room")).length,
  1,
  "expected War Room to appear only once across White land tiers"
);
assert.equal(
  normalizedWhiteLands.filter((name) => name.includes("emeria's call") || name.includes("emeria, shattered skyclave")).length,
  1,
  "expected Emeria's Call // Emeria, Shattered Skyclave to collapse to one rendered land"
);
assert.ok(
  whiteLands.suppressedDuplicates.some((entry) => /War Room|Emeria/i.test(entry.original)),
  "expected White land recommendations to record suppressed duplicate lands"
);

const selectStart = presentationSource.indexOf("export function selectReadingTagRefs");
const selectEnd = presentationSource.indexOf("export function buildTagExplanationSummaries", selectStart);
const selectSource = presentationSource.slice(selectStart, selectEnd);
assert.doesNotMatch(selectSource, /decreeCopy|tagline|philosophy/, "expected tag selection to avoid broad lore-only sources");

const taxonomy = {
  tags: [
    {
      category: "mechanical",
      tag: "tokens",
      display_name: "Tokens",
      aliases: ["go wide"],
      canonical_definition: "Creating multiple creature tokens or bodies.",
      vox_mana_interpretation: "Building pressure by widening the board.",
      table_feel: "The board grows through repeated extra bodies.",
      new_player_note: "Tokens are extra permanents created by cards.",
      typical_actions: ["make repeated bodies"],
    },
  ],
};

const loreOnlyRefs = selectReadingTagRefs({
  dossier: {
    commanderPath: { copy: "", spellcraft: "", deckFooting: "", tableCautionText: "" },
    archetypes: [],
  },
  result: { evidence_trail: [] },
  taxonomy,
  modelMechanics: "",
});
assert.deepEqual(loreOnlyRefs, [], "expected empty evidence to avoid filling Why This Fits You with weak tags");

const groundedRefs = selectReadingTagRefs({
  dossier: {
    commanderPath: {
      copy: "Build protection by going wide with token makers.",
      spellcraft: "Token engines help the board stay resilient.",
      deckFooting: "",
      tableCautionText: "",
    },
    archetypes: [{ name: "Tokens", desc: "A go wide token plan that scales under pressure." }],
  },
  result: { evidence_trail: [] },
  taxonomy,
  modelMechanics: "Token engines and go wide payoffs keep the deck visible on board.",
});
assert.deepEqual(
  groundedRefs,
  [{ category: "mechanical", tag: "tokens" }],
  "expected deck-facing sources to retain supported explanation tags"
);

const summaries = buildTagExplanationSummaries({
  tagRefs: groundedRefs,
  faction: { key: "W", name: "White" },
  taxonomy,
  limit: 3,
});
assert.ok(summaries.length >= 1, "expected grounded tag explanations to render at least one summary");
assert.match(summaries[0].copy, /leans toward/i, "expected Why This Fits You copy to use conservative language");

const fallbackSummaries = buildTagExplanationSummaries({
  tagRefs: [],
  faction: { key: "W", name: "White" },
  taxonomy,
  limit: 3,
});
assert.match(
  fallbackSummaries[0].copy,
  /points more clearly/i,
  "expected thin-evidence fallback copy to stay conservative"
);

console.log("PASS archscry dossier follow-up tests");

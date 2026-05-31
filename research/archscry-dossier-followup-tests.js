import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildTagExplanationSummaries,
  presentationForFaction,
  selectReadingTagRefs,
} from "../assets/js/archscry-presentation.js";
import {
  buildCommanderDossier,
  buildCommanderLandRecommendations,
  buildPreconRecommendations,
  collectCommanderPreviewCandidates,
  createArchidektTagCatalog,
  getCommanderFactionGuidance,
  hasRenderableLandTier,
  renderCommanderDossierText,
  selectPreconPreviewRecommendations,
} from "../assets/js/commander-dossier.js";

const indexSource = await readFile(new URL("../assets/js/index.js", import.meta.url), "utf8");
const radarSource = await readFile(new URL("../assets/js/dossier-radar.js", import.meta.url), "utf8");
const presentationSource = await readFile(new URL("../assets/js/archscry-presentation.js", import.meta.url), "utf8");
const archscryCssSource = await readFile(new URL("../assets/css/archscry.css", import.meta.url), "utf8");
const factionsData = JSON.parse(await readFile(new URL("../data/factions.json", import.meta.url), "utf8"));
const placementModel = JSON.parse(await readFile(new URL("../data/placement-model.json", import.meta.url), "utf8"));
const identityLayers = JSON.parse(await readFile(new URL("../data/identity-layers.json", import.meta.url), "utf8"));
const flavorSnippets = JSON.parse(await readFile(new URL("../data/archscry-flavor-snippets.json", import.meta.url), "utf8"));
const commanderFlavorIndex = JSON.parse(await readFile(new URL("../data/scryfall/indexes/commander-index.json", import.meta.url), "utf8"));
const cardFlavorIndex = JSON.parse(await readFile(new URL("../data/scryfall/indexes/card-flavor-index.json", import.meta.url), "utf8"));
const oracleCards = JSON.parse(await readFile(new URL("../data/scryfall/raw/oracle-cards.json", import.meta.url), "utf8"));
const preconCatalog = JSON.parse(await readFile(new URL("../data/precons/vox-mana-precon-catalog.json", import.meta.url), "utf8"));
const preconThemeTaxonomy = JSON.parse(await readFile(new URL("../data/taxonomy/vox-mana-precon-themes.json", import.meta.url), "utf8"));
const deckTagData = JSON.parse(await readFile(new URL("../data/deck-tags_expanded.json", import.meta.url), "utf8"));
const deckTagCatalog = createArchidektTagCatalog(deckTagData);

globalThis.VM_SESSION = { profile: null, username: "" };
globalThis.window = {
  addEventListener() {},
  location: { href: "http://localhost/archscry/" },
  history: { replaceState() {} },
};
globalThis.document = {
  addEventListener() {},
  querySelectorAll() {
    return [];
  },
  querySelector() {
    return null;
  },
  getElementById() {
    return null;
  },
  body: {},
  createElement() {
    return {
      className: "",
      textContent: "",
      append() {},
      classList: {
        add() {},
        remove() {},
        toggle() {},
      },
    };
  },
};
const { buildDossierRenderState } = await import("../assets/js/index.js");

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
const indexedFlavorCards = [
  ...(commanderFlavorIndex.commanders || []),
  ...(cardFlavorIndex.cards || []),
];
const oracleByName = new Map();
(oracleCards || []).forEach((card) => {
  const names = [card.name, ...String(card.name || "").split("//")];
  names.forEach((name) => {
    const normalized = normalizeCardName(name);
    const existing = oracleByName.get(normalized);
    if (
      normalized &&
      (!existing || (existing.legalities?.commander !== "legal" && card.legalities?.commander === "legal"))
    ) {
      oracleByName.set(normalized, card);
    }
  });
});

function normalizeCardName(value) {
  return String(value || "").trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

function identitySubset(cardIdentity = [], allowedIdentity = []) {
  const allowed = new Set((allowedIdentity || []).map((color) => String(color).toUpperCase()));
  return (cardIdentity || []).every((color) => allowed.has(String(color).toUpperCase()));
}

function identityExact(cardIdentity = [], expectedIdentity = []) {
  const actual = [...new Set((cardIdentity || []).map((color) => String(color).toUpperCase()))].sort();
  const expected = [...new Set((expectedIdentity || []).map((color) => String(color).toUpperCase()))].sort();
  return actual.length === expected.length && actual.every((color, index) => color === expected[index]);
}

function resolveOracleCard(name) {
  return oracleByName.get(normalizeCardName(name));
}

function resolveIndexedSnippetCard(snippet) {
  return indexedFlavorCards.find((card) =>
    card.name === snippet.card_name &&
    card.flavor_excerpt === snippet.flavor_excerpt
  );
}

function assertLegalSnippetVoices(key) {
  const faction = factionsData.factions[key];
  const snippets = flavorSnippets.snippets?.[key] || [];
  assert.ok(snippets.length >= 2, `expected ${key} to keep nonempty card voices after color filtering`);
  snippets.forEach((snippet) => {
    const card = resolveIndexedSnippetCard(snippet);
    assert.ok(card, `expected ${key} snippet ${snippet.card_name} to resolve against committed flavor indexes`);
    assert.ok(
      identitySubset(card.color_identity || [], faction.colors || []),
      `expected ${key} snippet ${snippet.card_name} to satisfy Commander id<=${(faction.colors || []).join("").toLowerCase()}`
    );
  });
}

function assertStarterUxCardsResolveWithinIdentity(key) {
  const faction = factionsData.factions[key];
  const expectedIdentity = faction.colors || [];
  const starterCards = [
    ...(faction.staples?.creatures || []),
    ...(faction.staples?.spells || []),
    ...(faction.staples?.permanents || []),
  ];
  assert.ok(starterCards.length >= 6, `expected ${key} to expose starter UX cards`);

  const lands = buildCommanderLandRecommendations(faction);
  ["premium", "midrange", "budget", "utility"].forEach((tier) => {
    assert.ok(hasRenderableLandTier(lands, tier), `expected ${key} ${tier} mana-base tier to render`);
  });

  [
    ...starterCards,
    ...lands.premium,
    ...lands.midrange,
    ...lands.budget,
    ...lands.utility,
  ].forEach((name) => {
    const card = resolveOracleCard(name);
    assert.ok(card, `expected ${key} starter UX card ${name} to resolve against committed Scryfall oracle cards`);
    assert.ok(
      identitySubset(card.color_identity || [], expectedIdentity),
      `expected ${key} starter UX card ${name} to satisfy id<=${expectedIdentity.join("").toLowerCase()}`
    );
  });
}

function assertManaBaseResolvesWithinIdentity(key) {
  const faction = factionsData.factions[key];
  const expectedIdentity = faction.colors || [];
  const lands = buildCommanderLandRecommendations(faction);
  const renderedLands = [
    ...lands.premium,
    ...lands.midrange,
    ...lands.budget,
    ...lands.utility,
  ];

  assert.ok(faction.land_base, `expected ${key} to define placement-fit mana-base metadata`);
  assert.ok(hasRenderableLandTier(lands, "basics"), `expected ${key} Basics guidance to render`);
  assert.ok(renderedLands.length >= 3, `expected ${key} to render nonbasic mana-base recommendations`);

  renderedLands.forEach((name) => {
    const card = resolveOracleCard(name);
    assert.ok(card, `expected ${key} mana-base card ${name} to resolve against committed Scryfall oracle cards`);
    assert.equal(card.legalities?.commander, "legal", `expected ${key} mana-base card ${name} to be Commander legal`);
    assert.ok(
      identitySubset(card.color_identity || [], expectedIdentity),
      `expected ${key} mana-base card ${name} to satisfy id<=${expectedIdentity.join("").toLowerCase()}`
    );
  });
}

const currentFactionKeys = Object.keys(factionsData.factions || {});
const expectedFactionCount = factionsData._meta?.factions;
const shardKeys = ["BANT", "ESPER", "GRIXIS", "JUND", "NAYA"];
const shardColorCodes = ["WUG", "WUB", "UBR", "BRG", "RGW"];
assert.equal(expectedFactionCount, 25, "expected Archscry faction metadata to include the Bant, Esper, Grixis, Jund, and Naya pilots");
assert.equal(currentFactionKeys.length, expectedFactionCount, "expected the current Archscry faction set to match generated metadata");
shardKeys.forEach((key) => {
  assert.ok(currentFactionKeys.includes(key), `expected the current Archscry faction set to include the ${key} pilot key`);
  assert.ok(identityLayers.expressions?.[key], `expected ${key} to exist as the public shard expression key`);
  assert.equal(identityLayers.expressions[key].preview_eligible, false, `expected ${key} to stay outside the Home preview carousel`);
  assert.equal(identityLayers.expressions[key].placement_eligible, true, `expected ${key} to stay live-placement eligible`);
});
shardColorCodes.forEach((code) => {
  assert.ok(!identityLayers.expressions?.[code], `expected ${code} not to be a public expression key`);
  assert.ok(!factionsData.factions?.[code], `expected ${code} not to be a generated faction key`);
  assert.ok(!placementModel.factions?.[code], `expected ${code} not to be a placement-model key`);
});
shardKeys.forEach((key) => {
  const aliases = identityLayers.expressions?.[key]?.aliases || [];
  shardColorCodes.forEach((code) => {
    assert.ok(
      !aliases.some((alias) => String(alias).toUpperCase() === code),
      `expected ${code} not to be a public alias for ${key}`
    );
  });
});
const previewExpressions = Object.values(identityLayers.expressions || {}).filter((expression) => expression.preview_eligible);
assert.equal(previewExpressions.length, 20, "expected Home preview metadata to remain the original 20-expression set");
assert.ok(
  shardKeys.every((key) => !previewExpressions.some((expression) => expression.key === key)),
  "expected the five Alara shards to stay out of the Home preview metadata"
);
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

assertLegalSnippetVoices("BANT");
assertLegalSnippetVoices("ESPER");
assertLegalSnippetVoices("GRIXIS");
assertLegalSnippetVoices("JUND");
assertLegalSnippetVoices("NAYA");
currentFactionKeys.forEach(assertManaBaseResolvesWithinIdentity);
["BANT", "ESPER", "GRIXIS", "JUND", "NAYA"].forEach(assertStarterUxCardsResolveWithinIdentity);
assert.ok(
  !(flavorSnippets.snippets?.GRIXIS || []).some((snippet) => snippet.card_name === "Bant Sureblade"),
  "expected Grixis snippets to exclude off-color Bant Sureblade"
);

const bant = factionsData.factions.BANT;
const bantGuidance = getCommanderFactionGuidance(bant);
assert.ok(bantGuidance, "expected Bant to have a mature Commander guidance override");
assert.deepEqual(
  bantGuidance.starterSearchTags,
  ["Voltron", "Counters Matter", "Enchantments"],
  "expected Bant starter search tags to be explicit display/search-assist metadata"
);
assert.match(bantGuidance.commanderPlan, /one worthy line of action/i);
assert.match(bantGuidance.spellcraftIdentity, /Commander support texture for public trust and refined communal order/i);
assert.doesNotMatch(
  [
    bantGuidance.commanderPlan,
    bantGuidance.spellcraftIdentity,
    bantGuidance.tableCautionText,
  ].join(" "),
  /Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion/i,
  "expected Bant Commander guidance to avoid public WUG labels and unsupported lore claims"
);

const bantCommanderCompass = bant.commander_compass || {};
assert.equal(
  bantCommanderCompass.review_status,
  "support_only_live_pilot_curation",
  "expected Bant Commander Compass to stay support-only"
);
assert.ok(
  (bantCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Bant Commander Compass to expose native fit candidates"
);
assert.ok(
  (bantCommanderCompass.archetype_lanes || []).length >= 3,
  "expected Bant Commander Compass to expose placement-facing archetype lanes"
);
assert.equal(
  bantCommanderCompass.link_targets?.edhrec_commander_index,
  "https://edhrec.com/commanders/bant",
  "expected Bant EDHREC link to use Bant-facing support reference"
);
assert.equal(
  bantCommanderCompass.link_targets?.mtgdecks_color_identity,
  "https://mtgdecks.net/Commander/bant-commanders",
  "expected Bant MTGDecks link to use Bant-facing support reference"
);
assert.equal(
  bantCommanderCompass.link_targets?.scryfall_commander_search,
  "https://scryfall.com/search?q=id%3Dwug+is%3Acommander+f%3Acommander",
  "expected Bant commander discovery to use exact identity"
);
assert.match(
  bantCommanderCompass.link_targets?.archidekt_color_search || "",
  /colors=WUG/,
  "expected Bant Archidekt support reference to keep WUG as query metadata"
);
assert.doesNotMatch(
  JSON.stringify(bantCommanderCompass.link_targets || {}),
  /id%3C%3Dwug\+is%3Acommander|id<=wug\s+is:commander/i,
  "expected Bant commander discovery links not to use subset identity"
);

const bantPresentation = presentationForFaction(bant);
assert.equal(bantPresentation.tableRole, "The supported champion");
assert.match(bantPresentation.thesis, /White sets the public standard, Blue refines the line of action, and Green keeps that line alive/i);
assert.match(bantPresentation.mechanics, /Commander support texture, not new lore-canon claims/i);
assert.doesNotMatch(
  [
    bantPresentation.thesis,
    bantPresentation.tableExperience,
    bantPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUG/i,
  "expected Bant presentation to avoid generic fallback copy"
);

const bantDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "BANT",
    confidence: 0.76,
    decree: "Bant protects one worthy line with public trust.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "BANT",
        faction_name: "Bant",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WU",
        faction_name: "Azorius Senate",
        confidence: 0.58,
      },
    ],
    evidence_trail: [
      {
        faction: "BANT",
        signal: "public trust and supported champion pressure",
        answer_title: "Carry the line together",
        prompt: "What makes strength stay accountable?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const bantDossierText = renderCommanderDossierText(bantDossier);
const bantVisibleText = bantDossierText.replace(/https?:\/\/\S+/g, "");
assert.match(bantDossierText, /Bant Commander decks/);
assert.match(bantDossierText, /protects one worthy line of action/i);
assert.match(bantDossierText, /Commander support texture for public trust and refined communal order/i);
assert.doesNotMatch(
  bantVisibleText,
  /\bWUG\b|Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion|recognizable Commander table role|Commander mechanics that make the faction plan visible|playable pattern|personality label|\/bant\//i,
  "expected rendered Bant visible text to avoid public WUG labels, fallback copy, route-like paths, and unsupported lore claims"
);

const bantPreconRecommendations = buildPreconRecommendations({
  faction: bant,
  dossier: bantDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "voltron" },
    { category: "mechanical", tag: "counters" },
    { category: "mechanical", tag: "enchantments" },
    { category: "mechanical", tag: "clues" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const bantPreconPool = [...bantPreconRecommendations.nativeExact, ...bantPreconRecommendations.otherExact];
const bantPreconsByName = new Map(bantPreconPool.map((precon) => [precon.deckName, precon]));
[
  "Counter Blitz",
  "Peace Offering",
  "Deep Clue Sea",
  "Adaptive Enchantment",
  "Evasive Maneuvers",
  "Aura of Courage",
  "Blast From the Past",
  "Bedecked Brokers",
].forEach((deckName) => {
  const precon = bantPreconsByName.get(deckName);
  assert.ok(precon, `expected ${deckName} to be available as exact local Bant support curation`);
  assert.equal(precon.colorIdentityKey, "WUG", `expected ${deckName} to be exact White/Blue/Green support, not subset-only support`);
  assert.ok(precon.mainCommander, `expected ${deckName} support record to include commander`);
  assert.ok(precon.rawPrimaryTheme, `expected ${deckName} support record to include theme`);
  assert.ok(precon.mainStrategy, `expected ${deckName} support record to include strategy`);
  assert.match(precon.fitSummary, /Bant support fit/i);
  assert.doesNotMatch(
    precon.fitSummary,
    /Exact WUG|lore proof|canon proof|canon evidence/i,
    `expected ${deckName} support summary to avoid public WUG labels and canon-proof language`
  );
});

const esper = factionsData.factions.ESPER;
const esperGuidance = getCommanderFactionGuidance(esper);
assert.ok(esperGuidance, "expected Esper to have a mature Commander guidance override");
assert.deepEqual(
  esperGuidance.starterSearchTags,
  ["Control", "Artifacts", "Enchantments"],
  "expected Esper starter search tags to be explicit display/search-assist metadata"
);
assert.match(esperGuidance.commanderPlan, /turns knowledge into a controlled future/i);
assert.match(esperGuidance.spellcraftIdentity, /planned refinement and controlled change/i);
assert.doesNotMatch(
  [
    esperGuidance.commanderPlan,
    esperGuidance.spellcraftIdentity,
    esperGuidance.tableCautionText,
  ].join(" "),
  /Exact WUB|generic WUB|generic three-color goodstuff|artifact deck as canon|Azorius-only|Dimir-only|Orzhov-only|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri|support-only|evidence floor|metadata|fallback|local catalog|validation|review language/i,
  "expected Esper Commander guidance to avoid public WUB labels, internal caveats, neighbor leakage, and unsupported lore"
);

const esperPresentation = presentationForFaction(esper);
assert.equal(esperPresentation.tableRole, "The system refiner");
assert.match(esperPresentation.thesis, /Blue looks for the pattern, White gives improvement a structure, and Black makes information useful enough to control the outcome/i);
assert.match(esperPresentation.mechanics, /Commander support texture for planned refinement and controlled change/i);
assert.doesNotMatch(
  [
    esperPresentation.thesis,
    esperPresentation.tableExperience,
    esperPresentation.mechanics,
    esperPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri/i,
  "expected Esper presentation to avoid generic fallback copy, implementation caveats, and unsupported lore"
);

const esperCommanderCompass = esper.commander_compass || {};
assert.equal(esperCommanderCompass.review_status, "support_only_live_pilot_curation", "expected Esper Commander Compass to stay support-bounded");
assert.ok(
  (esperCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Esper Commander Compass to expose native fit candidates"
);
assert.ok(
  (esperCommanderCompass.archetype_lanes || []).length >= 3,
  "expected Esper Commander Compass to expose placement-facing archetype lanes"
);
assert.equal(
  esperCommanderCompass.link_targets?.scryfall_commander_search,
  "https://scryfall.com/search?q=id%3Dwub+is%3Acommander+f%3Acommander",
  "expected Esper commander discovery to use exact identity query syntax"
);
assert.match(
  esperCommanderCompass.link_targets?.archidekt_color_search || "",
  /colors=WUB/,
  "expected Esper Archidekt support reference to keep WUB as query metadata"
);
assert.doesNotMatch(
  JSON.stringify(esperCommanderCompass.link_targets || {}),
  /id%3C%3Dwub\+is%3Acommander|id<=wub\s+is:commander/i,
  "expected Esper commander discovery links not to use subset identity"
);
const esperPreviewCandidates = collectCommanderPreviewCandidates(esper, { limit: 3 });
assert.deepEqual(
  esperPreviewCandidates.map((candidate) => candidate.name),
  ["Y'shtola, Night's Blessed", "Aminatou, Veil Piercer", "Oloro, Ageless Ascetic"],
  "expected Esper Commander preview to use source-authored support candidates"
);
esperPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Esper Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identitySubset(card.color_identity || [], ["W", "U", "B"]),
    `expected ${candidate.name} to satisfy id<=wub`
  );
  assert.doesNotMatch(
    [candidate.desc, candidate.whyThisFits, candidate.skipIf].join(" "),
    /Exact WUB|generic WUB|support-only|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri|canon proof|lore proof/i,
    `expected ${candidate.name} copy to stay support-bounded and avoid public WUB or unsupported lore`
  );
});

const esperDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "ESPER",
    confidence: 0.76,
    decree: "Esper makes knowledge into controlled change.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "ESPER",
        faction_name: "Esper",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WU",
        faction_name: "Azorius Senate",
        confidence: 0.58,
      },
    ],
    evidence_trail: [
      {
        faction: "ESPER",
        signal: "planning, information advantage, and designed control",
        answer_title: "Understand, then refine",
        prompt: "What would change if the system became legible enough to redesign?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const esperDossierText = renderCommanderDossierText(esperDossier);
const esperVisibleText = esperDossierText.replace(/https?:\/\/\S+/g, "");
assert.match(esperDossierText, /Esper Commander decks/);
assert.match(esperDossierText, /turns knowledge into a controlled future/i, "expected rendered Esper dossier text to include hardened Commander plan copy");
assert.match(esperDossierText, /planned refinement and controlled change/i);
assert.match(
  esperDossierText,
  /\[Esper Commander decks\]\(https:\/\/archidekt\.com\/search\/decks\?colors=WUB/,
  "expected Esper Archidekt link label to use Esper while preserving WUB as query syntax"
);
assert.doesNotMatch(
  esperVisibleText,
  /\bWUB\b|Exact WUB|generic WUB|generic three-color goodstuff|artifact deck as canon|Azorius-only|Dimir-only|Orzhov-only|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Carmot|Sangrite|Noble Work|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri|\/esper\//i,
  "expected rendered Esper visible text to avoid public WUB labels, implementation caveats, unsupported lore, and route-like paths"
);
assert.ok(
  (esperDossier.links?.scryfall || []).some((link) => /id=wub\s+is:commander\s+f:commander/i.test(decodeURIComponent(link.url || ""))),
  "expected Esper Commander search links to use exact id=wub is:commander f:commander"
);
assert.ok(
  (esperDossier.links?.scryfall || []).some((link) => /id<=wub/i.test(decodeURIComponent(link.url || ""))),
  "expected Esper support texture links to use subset id<=wub queries"
);

const esperPreconRecommendations = buildPreconRecommendations({
  faction: esper,
  dossier: esperDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "control" },
    { category: "mechanical", tag: "artifacts" },
    { category: "mechanical", tag: "enchantments" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const esperPreconPool = [...esperPreconRecommendations.nativeExact, ...esperPreconRecommendations.otherExact];
const esperPreconsByName = new Map(esperPreconPool.map((precon) => [precon.deckName, precon]));
[
  "Scions & Spellcraft",
  "Eternal Might",
  "Miracle Worker",
  "Subjective Reality",
  "Eternal Bargain",
  "Dungeons of Death",
  "Cavalry Charge",
  "Urza's Iron Alliance",
  "Forces of the Imperium",
  "Obscura Operation",
].forEach((deckName) => {
  const precon = esperPreconsByName.get(deckName);
  assert.ok(precon, `expected ${deckName} to be available as exact local Esper support curation`);
  assert.equal(precon.colorIdentityKey, "WUB", `expected ${deckName} to be exact White/Blue/Black support, not subset-only support`);
  assert.ok(precon.mainCommander, `expected ${deckName} support record to include commander`);
  assert.ok(precon.rawPrimaryTheme, `expected ${deckName} support record to include theme`);
  assert.ok(precon.mainStrategy, `expected ${deckName} support record to include strategy`);
  assert.match(precon.fitSummary, /Esper color fit/i);
  assert.doesNotMatch(
    precon.fitSummary,
    /Exact WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|canon proof|lore proof/i,
    `expected ${deckName} support summary to avoid public WUB labels, internal caveats, and canon-proof language`
  );
});

const grixis = factionsData.factions.GRIXIS;
const grixisStarterCards = [
  ...(grixis.staples?.creatures || []),
  ...(grixis.staples?.spells || []),
  ...(grixis.staples?.permanents || []),
];
assert.deepEqual(grixis.staples?.creatures, [
  "Kess, Dissident Mage",
  "Nekusar, the Mindrazer",
  "Jeleva, Nephalia's Scourge",
]);
assert.deepEqual(grixis.staples?.spells, [
  "Terminate",
  "Counterspell",
  "Blasphemous Act",
]);
assert.deepEqual(grixis.staples?.permanents, [
  "Arcane Signet",
  "Talisman of Dominance",
  "Talisman of Indulgence",
]);

const grixisCommanderCompass = grixis.commander_compass || {};
assert.equal(
  grixisCommanderCompass.review_status,
  "support_only_live_pilot_curation",
  "expected Grixis Commander Compass to stay support-only"
);
assert.ok(
  (grixisCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Grixis Commander Compass to expose native fit candidates"
);
assert.match(
  grixisCommanderCompass.recommendation_philosophy || "",
  /do not create Grixis canon|raw claims/i,
  "expected Grixis Commander Compass to preserve support-only boundaries"
);
assert.equal(
  grixisCommanderCompass.link_targets?.scryfall_commander_search,
  "https://scryfall.com/search?q=id%3Dubr+is%3Acommander+f%3Acommander",
  "expected Grixis commander candidate discovery to use exact identity"
);
assert.doesNotMatch(
  JSON.stringify(grixisCommanderCompass.link_targets || {}),
  /id%3C%3Dubr\+is%3Acommander|id<=ubr\s+is:commander/i,
  "expected Grixis commander candidate discovery links not to use subset identity"
);
(grixisCommanderCompass.native_fit_commanders || []).forEach((candidate) => {
  const card = resolveOracleCard(candidate.exact_card_name || candidate.display_name);
  assert.ok(card, `expected Grixis Commander Compass candidate ${candidate.display_name} to resolve locally`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.display_name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["U", "B", "R"]),
    `expected ${candidate.display_name} to satisfy exact id=ubr as Commander-facing curation`
  );
});

const grixisPreviewCandidates = collectCommanderPreviewCandidates(grixis, { limit: 3 });
assert.deepEqual(
  grixisPreviewCandidates.map((candidate) => candidate.name),
  ["Kess, Dissident Mage", "Nekusar, the Mindrazer", "Jeleva, Nephalia's Scourge"],
  "expected Grixis Commander preview to use validated support-only Compass candidates"
);
grixisPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Grixis Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["U", "B", "R"]),
    `expected ${candidate.name} to satisfy exact id=ubr for Commander-facing labels`
  );
  assert.equal(candidate.source, "commander_compass", `expected ${candidate.name} to come from support-only Commander Compass data`);
});

const grixisLands = buildCommanderLandRecommendations(grixis);
["premium", "midrange", "budget", "utility"].forEach((tier) => {
  assert.ok(hasRenderableLandTier(grixisLands, tier), `expected Grixis ${tier} mana-base tier to render`);
});
const grixisStarterUxCards = [
  ...grixisStarterCards,
  ...grixisLands.premium,
  ...grixisLands.midrange,
  ...grixisLands.budget,
  ...grixisLands.utility,
];
grixisStarterUxCards.forEach((name) => {
  const card = resolveOracleCard(name);
  assert.ok(card, `expected Grixis starter UX card ${name} to resolve against committed Scryfall oracle cards`);
  assert.ok(
    identitySubset(card.color_identity || [], ["U", "B", "R"]),
    `expected ${name} to satisfy id<=ubr; subset-color and colorless cards are allowed if they satisfy id<=ubr`
  );
});

const grixisGuidance = getCommanderFactionGuidance(grixis);
assert.ok(grixisGuidance, "expected Grixis to have a mature Commander guidance override");
assert.deepEqual(
  grixisGuidance.starterSearchTags,
  ["Control", "Spellslinger", "Aristocrats"],
  "expected Grixis starter search tags to be explicit display/search-assist metadata"
);
assert.match(grixisGuidance.commanderPlan, /survives first, studies the weakness/i);
assert.match(grixisGuidance.spellcraftIdentity, /Commander support texture/i);
assert.match(grixisGuidance.spellcraftIdentity, /not proof that any one mechanic is the whole Grixis identity/i);
assert.doesNotMatch(
  grixisGuidance.spellcraftIdentity,
  /VM-166|raw claims beyond|manual-review material/i,
  "expected Grixis spellcraft guidance to avoid internal work-card jargon"
);

const grixisPresentation = presentationForFaction(grixis);
assert.match(grixisPresentation.thesis, /Black keeps the self alive, Blue finds the leverage, and Red moves/i);
assert.match(grixisPresentation.loreRole, /source-grounded Black-centered survival/i);
assert.match(grixisPresentation.mechanics, /Commander support texture, not lore-canon proof or the whole identity/i);
assert.doesNotMatch(
  [
    grixisPresentation.thesis,
    grixisPresentation.tableExperience,
    grixisPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i,
  "expected Grixis presentation to avoid generic fallback copy"
);

const grixisDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "GRIXIS",
    confidence: 0.76,
    decree: "Grixis takes the opening before it closes.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "GRIXIS",
        faction_name: "Grixis",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "UB",
        faction_name: "Dimir",
        confidence: 0.58,
      },
    ],
    evidence_trail: [
      {
        faction: "GRIXIS",
        signal: "survival, calculation, and urgent action",
        answer_title: "Take the opening",
        prompt: "What must be taken before the chance closes?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const grixisDossierText = renderCommanderDossierText(grixisDossier);
assert.match(grixisDossierText, /survives first, studies the weakness/i, "expected rendered Grixis dossier text to include hardened Commander plan copy");
assert.match(grixisDossierText, /Commander support texture for survival, calculation, and urgency/i);
assert.match(grixisDossierText, /\[Grixis Commander decks\]\(https:\/\/archidekt\.com\/search\/decks\?colors=UBR/, "expected Grixis Archidekt link label to use Grixis while preserving UBR as query syntax");
assert.doesNotMatch(
  grixisDossierText,
  /VM-166|raw claims beyond|manual-review material|playable pattern|personality label|recognizable Commander table role|UBR Commander decks|Exact UBR|Blue-Black-Red|color identity commander candidates|exactly blue, black, and red commander identity commander candidates|blank Starter Cards|blank Mana Base|\/grixis\/|\/ubr\//i,
  "expected rendered Grixis dossier text to avoid fallback copy, public UBR labels, internal jargon, and route-like Grixis paths"
);

const grixisPreconRecommendations = buildPreconRecommendations({
  faction: grixis,
  dossier: grixisDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "control" },
    { category: "mechanical", tag: "spellslinger" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const visibleGrixisPrecons = selectPreconPreviewRecommendations(grixisPreconRecommendations).visible;
assert.ok(visibleGrixisPrecons.length >= 1, "expected exact-color Grixis precon support summaries to render when support data is available");
assert.equal(grixisPreconRecommendations.otherExactTitle, "Other Grixis Exact Matches");
visibleGrixisPrecons.forEach((precon) => {
  assert.ok(precon.deckName, "expected Grixis precon support record to include deck name");
  assert.ok(precon.mainCommander, `expected ${precon.deckName} support record to include commander`);
  assert.equal(precon.colorIdentityKey, "UBR", `expected ${precon.deckName} to be exact UBR, not subset-only support`);
  assert.ok(precon.rawPrimaryTheme, `expected ${precon.deckName} support record to include theme`);
  assert.ok(precon.mainStrategy, `expected ${precon.deckName} support record to include strategy`);
  assert.match(precon.fitSummary, /Exact Grixis color fit/i);
  assert.match(precon.fitSummary, /Product-support only/i);
});

const jund = factionsData.factions.JUND;
const jundGuidance = getCommanderFactionGuidance(jund);
assert.deepEqual(jund.staples?.creatures, [
  "Prossh, Skyraider of Kher",
  "Korvold, Fae-Cursed King",
  "Mayhem Devil",
]);
assert.deepEqual(jund.staples?.spells, [
  "Terminate",
  "Cultivate",
  "Victimize",
]);
assert.deepEqual(jund.staples?.permanents, [
  "Goblin Bombardment",
  "Moldervine Reclamation",
  "Rhythm of the Wild",
]);
assert.equal(jund.deck_links?.length, 1, "expected Jund to have source-authored Commander deck-link metadata");
assert.match(jund.deck_links?.[0]?.desc || "", /instinctive pressure|appetite engines|feral value/i, "expected Jund deck-link copy to carry Vox Mana lanes");
assert.doesNotMatch(jund.deck_links?.[0]?.desc || "", /Exact BRG|BRG match/i, "expected Jund deck-link copy to avoid public BRG match language");
assert.match(
  jundGuidance?.spellcraftIdentity || "",
  /mechanical echoes of appetite, survival, and consequence/i,
  "expected Jund spellcraft guidance to be player-facing Vox Mana copy"
);
assert.doesNotMatch(
  jundGuidance?.spellcraftIdentity || "",
  /VM-179|raw claims beyond|manual-review material/i,
  "expected Jund visible spellcraft guidance to avoid internal work-card jargon"
);

const jundCommanderCompass = jund.commander_compass || {};
assert.equal(jundCommanderCompass.review_status, "support_only_live_pilot_curation", "expected Jund Commander Compass to stay support-only");
assert.ok(
  (jundCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Jund Commander Compass to expose native fit candidates"
);
assert.ok(
  (jundCommanderCompass.archetype_lanes || []).length >= 3,
  "expected Jund Commander Compass to expose placement-facing archetype lanes"
);
assert.match(
  jundCommanderCompass.recommendation_philosophy || "",
  /not create Jund canon|raw claims/i,
  "expected Jund Commander Compass to preserve support-only boundaries"
);
const jundPreviewCandidates = collectCommanderPreviewCandidates(jund, { limit: 3 });
assert.deepEqual(
  jundPreviewCandidates.map((candidate) => candidate.name),
  ["Prossh, Skyraider of Kher", "Hearthhull, the Worldseed", "Disa the Restless"],
  "expected Jund Commander preview to use source-authored support-only candidates"
);
jundPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Jund Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identitySubset(card.color_identity || [], ["B", "R", "G"]),
    `expected ${candidate.name} to satisfy id<=brg`
  );
  assert.doesNotMatch(
    [candidate.desc, candidate.whyThisFits, candidate.skipIf].join(" "),
    /Exact BRG match|lore proof|canon evidence/i,
    `expected ${candidate.name} copy to stay support-only and avoid public BRG match language`
  );
});

const jundPlacement = placementModel.factions.JUND;
assert.ok(jundPlacement.discriminator_questions.length >= 3, "expected Jund placement to include discriminator questions");
assert.ok(
  jundPlacement.chatbot_guidance.questions_to_ask_when_uncertain.length >= 3,
  "expected Jund placement to include uncertain-match questions"
);
assert.ok(
  jundPlacement.collision_guidance.some((entry) => entry.against === "RG"),
  "expected Jund placement to include Gruul separator guidance"
);
assert.ok(
  jundPlacement.collision_guidance.some((entry) => entry.against === "GRIXIS"),
  "expected Jund placement to include Grixis separator guidance"
);
assert.ok(
  jundPlacement.collision_guidance.some((entry) => entry.against === "WITHERBLOOM"),
  "expected Jund placement to include Witherbloom separator guidance"
);
assert.ok(!jundPlacement.lateral_inhibition_targets.includes("NAYA"), "expected VM-191 not to add Naya as a Jund inhibition target");

const jundDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  placementResult: {
    faction: "JUND",
    confidence: 0.74,
    decree: "Jund treats feeling as a compass and turns pressure into consequence.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "JUND",
        faction_name: "Jund",
        confidence: 0.74,
      },
    ],
    adjacent_matches: [
      {
        faction: "RG",
        faction_name: "Gruul Clans",
        confidence: 0.59,
      },
    ],
    evidence_trail: [
      {
        faction: "JUND",
        signal: "instinct, appetite, pressure, survival, and consequence",
        answer_title: "Pressure under consequence",
        prompt: "What instinct is worth feeding?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const jundDossierText = renderCommanderDossierText(jundDossier);
assert.match(jundDossierText, /mechanical echoes of appetite, survival, and consequence/i, "expected rendered Jund dossier text to include hardened spellcraft copy");
assert.doesNotMatch(
  jundDossierText,
  /VM-179|playable pattern|personality label|recognizable Commander table role|Exact BRG|BRG match|id=ur|id<=ur|\/jund\//i,
  "expected rendered Jund dossier text to avoid internal jargon, fallback copy, public BRG labels, UR leakage, and route-like Jund paths"
);
assert.ok(
  (jundDossier.links?.scryfall || []).some((link) => /id=brg\s+is:commander\s+f:commander/i.test(decodeURIComponent(link.url || ""))),
  "expected Jund Commander search links to use exact id=brg is:commander f:commander"
);
assert.ok(
  (jundDossier.links?.scryfall || []).some((link) => /id<=brg/i.test(decodeURIComponent(link.url || ""))),
  "expected Jund support texture links to use subset id<=brg queries"
);

const naya = factionsData.factions.NAYA;
const nayaGuidance = getCommanderFactionGuidance(naya);
assert.deepEqual(nayaGuidance?.starterSearchTags, ["Ramp", "Big Mana", "Tokens"], "expected Naya Commander guidance to expose mature starter tags");
assert.deepEqual(naya.staples?.creatures, [
  "Pantlaza, Sun-Favored",
  "Marath, Will of the Wild",
  "Shalai and Hallar",
]);
assert.deepEqual(naya.staples?.spells, [
  "Splendid Reclamation",
  "Tempt with Discovery",
  "Heroic Intervention",
]);
assert.deepEqual(naya.staples?.permanents, [
  "Mirari's Wake",
  "Rhythm of the Wild",
  "Uncivil Unrest",
]);
assert.equal(naya.deck_links?.length, 1, "expected Naya to have source-authored Commander deck-link metadata");
assert.match(
  naya.deck_links?.[0]?.desc || "",
  /abundance|protected board growth|creature-forward scale|guarding the living whole/i,
  "expected Naya deck-link copy to carry Vox Mana lanes"
);
assert.doesNotMatch(
  naya.deck_links?.[0]?.desc || "",
  /Exact RGW|RGW match|generic RGW goodstuff|generic big-creature-only/i,
  "expected Naya deck-link copy to avoid public RGW/generic framing"
);

const nayaCommanderCompass = naya.commander_compass || {};
assert.equal(nayaCommanderCompass.review_status, "support_only_live_pilot_curation", "expected Naya Commander Compass to stay support-only");
assert.ok(
  (nayaCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Naya Commander Compass to expose native fit candidates"
);
assert.match(
  nayaCommanderCompass.recommendation_philosophy || "",
  /do not create Naya canon|raw claims/i,
  "expected Naya Commander Compass to preserve support-only boundaries"
);
(nayaCommanderCompass.native_fit_commanders || []).forEach((candidate) => {
  const card = resolveOracleCard(candidate.exact_card_name || candidate.display_name);
  assert.ok(card, `expected Naya Commander Compass candidate ${candidate.display_name} to resolve locally`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.display_name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["R", "G", "W"]),
    `expected ${candidate.display_name} to satisfy exact id=rgw as Commander-facing curation`
  );
});

const nayaPreviewCandidates = collectCommanderPreviewCandidates(naya, { limit: 3 });
assert.deepEqual(
  nayaPreviewCandidates.map((candidate) => candidate.name),
  ["Pantlaza, Sun-Favored", "Marath, Will of the Wild", "Shalai and Hallar"],
  "expected Naya Commander preview to use validated legendary starter support"
);
nayaPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Naya Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["R", "G", "W"]),
    `expected ${candidate.name} to satisfy exact id=rgw for Commander-facing labels`
  );
  assert.match(
    candidate.source,
    /^(commander_compass|staple)$/,
    `expected ${candidate.name} to be labeled as support/starter curation, not unsupported canon`
  );
});

const nayaDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  placementResult: {
    faction: "NAYA",
    confidence: 0.76,
    decree: "Naya grows with the living world and guards the whole through abundance.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "NAYA",
        faction_name: "Naya",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WG",
        faction_name: "Selesnya Conclave",
        confidence: 0.57,
      },
    ],
    evidence_trail: [
      {
        faction: "NAYA",
        signal: "abundance, living world, instinct, belonging, and guarded scale",
        answer_title: "Protect the living whole",
        prompt: "When growth becomes immense, what keeps it faithful to the living whole?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const nayaDossierText = renderCommanderDossierText(nayaDossier);
const nayaPresentation = presentationForFaction(naya);
const nayaVisibleText = [
  nayaDossierText,
  nayaPresentation.tableRole,
  nayaPresentation.opponentRead,
  nayaPresentation.emotionalPressure,
  nayaPresentation.loreRole,
  nayaPresentation.mechanics,
  nayaPresentation.tableExperience,
  nayaPresentation.thesis,
  nayaPresentation.closeReason,
  nayaPresentation.forkQuestion,
  nayaPresentation.direction,
  nayaPresentation.selfCheck,
].join(" ");
[
  "abundance",
  "living world",
  "grow mana",
  "protected board",
  "creature-forward",
  "scale",
  "instinct",
  "belonging",
  "guard the living whole",
].forEach((term) => {
  assert.match(nayaVisibleText, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `expected Naya visible text to include ${term}`);
});
assert.doesNotMatch(
  nayaVisibleText,
  /sacrifice small pieces|drain the table|attrition into a clock|appetite|Exact RGW|generic RGW goodstuff|generic big-creature-only|BRG|Spellslinger|\/naya\/|\/rgw\//i,
  "expected Naya visible text to avoid Jund/Orzhov/generic fallback leakage, public color-code labels, and route-like paths"
);
assert.ok(
  (nayaDossier.links?.scryfall || []).some((link) => /id=rgw\s+is:commander\s+f:commander/i.test(decodeURIComponent(link.url || ""))),
  "expected Naya Commander search links to use exact id=rgw is:commander f:commander"
);
assert.ok(
  (nayaDossier.links?.scryfall || []).some((link) => /id<=rgw/i.test(decodeURIComponent(link.url || ""))),
  "expected Naya support texture links to use subset id<=rgw queries"
);

const nayaPreconRecommendations = buildPreconRecommendations({
  faction: naya,
  dossier: nayaDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "ramp" },
    { category: "mechanical", tag: "tokens" },
    { category: "mechanical", tag: "counters" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const nayaPreconPool = [
  ...(nayaPreconRecommendations.nativeExact || []),
  ...(nayaPreconRecommendations.otherExact || []),
];
const nayaPreconsByName = new Map(nayaPreconPool.map((precon) => [precon.deckName, precon]));
[
  "Limit Break",
  "Desert Bloom",
  "Scrappy Survivors",
  "Deadly Disguise",
  "Primal Genesis",
  "Nature of the Beast",
  "Land's Wrath",
  "Veloci-Ramp-Tor",
  "Call for Backup",
  "Cabaretti Cacophony",
].forEach((deckName) => {
  const precon = nayaPreconsByName.get(deckName);
  assert.ok(precon, `expected ${deckName} to be available as exact Naya support/display curation`);
  assert.equal(precon.colorIdentityKey, "WRG", `expected ${deckName} to be exact White/Red/Green support, not subset-only support`);
  assert.ok(precon.fitSummary, `expected ${deckName} to expose support/display summary copy`);
  assert.doesNotMatch(
    precon.fitSummary,
    /Exact RGW|RGW match|new canon|raw claim|Alara canon source/i,
    `expected ${deckName} summary to avoid public RGW labels and canon expansion`
  );
  const commander = resolveOracleCard(precon.mainCommander);
  assert.ok(commander, `expected ${deckName} face commander ${precon.mainCommander} to resolve locally`);
  assert.equal(commander.legalities?.commander, "legal", `expected ${precon.mainCommander} to be Commander legal`);
  assert.ok(
    identityExact(commander.color_identity || [], ["R", "G", "W"]),
    `expected ${deckName} face commander ${precon.mainCommander} to satisfy exact id=rgw`
  );
});
assert.ok(!nayaPreconPool.some((precon) => /Tifa, Lockhart of AVALANCHE/i.test(precon.mainCommander || "")), "expected unresolved Tifa support to be omitted from Commander-facing recommendations");
const cabarettiSummary = nayaPreconsByName.get("Cabaretti Cacophony")?.fitSummary || "";
assert.match(
  cabarettiSummary,
  /Same-color support\/style comparator only.*not Naya canon, not Alara canon, and not a Naya lore source/i,
  "expected Cabaretti Cacophony to be framed only as same-color support/style comparator"
);

["JUND", "NAYA"].forEach((key) => {
  const lands = buildCommanderLandRecommendations(factionsData.factions[key]);
  ["premium", "midrange", "budget", "utility"].forEach((tier) => {
    assert.ok(hasRenderableLandTier(lands, tier), `expected ${key} ${tier} mana-base tier to render`);
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
assert.equal(hasRenderableLandTier(whiteLands, "basics"), true, "expected Basics guidance to stay renderable for White");
assert.equal(hasRenderableLandTier(whiteLands, "budget"), false, "expected empty White budget tier to be hidden after dedupe");
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

const bantLands = buildCommanderLandRecommendations(factionsData.factions.BANT);
const bantBudgetNames = (bantLands.budget || []).map((name) => name.toLowerCase());
const bantRenderedLands = [
  ...bantLands.premium,
  ...bantLands.midrange,
  ...bantLands.budget,
  ...bantLands.utility,
].map((name) => name.toLowerCase());
assert.equal(hasRenderableLandTier(bantLands, "budget"), true, "expected Bant budget tier to stay renderable");
["bant panorama", "path of ancestry", "evolving wilds"].forEach((name) => {
  assert.ok(bantBudgetNames.includes(name), `expected Bant budget lands to keep ${name}`);
});
["basic", "basics", "basic land", "basic lands"].forEach((placeholder) => {
  assert.ok(!bantRenderedLands.includes(placeholder), `expected Bant land tiers to suppress ${placeholder}`);
});

const selectStart = presentationSource.indexOf("export function selectReadingTagRefs");
const selectEnd = presentationSource.indexOf("export function buildTagExplanationSummaries", selectStart);
const selectSource = presentationSource.slice(selectStart, selectEnd);
assert.doesNotMatch(selectSource, /decreeCopy|tagline|philosophy/, "expected tag selection to avoid broad lore-only sources");
assert.match(indexSource, /buildSegmentControlsHtml\("mana-base",\s*manaBaseSegments/, "expected mana-base tabs to use available segments only");
assert.match(indexSource, /hasRenderableLandTier\(landRecommendations,\s*"budget"\)/, "expected empty Budget land tiers to be skipped at render time");
assert.match(indexSource, /hasStarterCardReferences/, "expected empty starter-card groups to be suppressible at render time");
assert.match(indexSource, /hiddenDossierPanelIds/, "expected empty starter-card panels to be removed from dossier navigation");
assert.match(indexSource, /data-commander-directory-links/, "expected commander directory links to render from one stable Start Here block");
assert.doesNotMatch(indexSource, /const commanderStarterLinksHtml/, "expected Start Here to avoid a second commander directory link block");
assert.doesNotMatch(indexSource, /<div class="land-tier-label">Basics<\/div>/, "expected Basics to appear once through the active mana-base tab, not as a duplicate inner label");

const blankJundRenderState = buildDossierRenderState({
  starterCards: { creatures: [], spells: [" "], permanents: [] },
  colors: factionsData.factions.JUND.colors,
  commanderDirectoryLinks: [
    { service: "edhrec", label: "Jund commanders", url: "https://edhrec.com/commanders/jund" },
    { service: "mtgdecks", label: "Jund Commander decks", url: "https://mtgdecks.net/Commander/jund-commanders" },
  ],
});
assert.equal(blankJundRenderState.hasStarterCardReferences, false, "expected blank Jund starter references to suppress the panel");
assert.deepEqual(blankJundRenderState.starterCardSegments.map((segment) => segment.id), [], "expected no starter-card tabs for empty Jund starter groups");
assert.equal((blankJundRenderState.commanderDirectoryLinksHtml.match(/service-edhrec/g) || []).length, 1, "expected one EDHREC Start Here link");
assert.equal((blankJundRenderState.commanderDirectoryLinksHtml.match(/service-mtgdecks/g) || []).length, 1, "expected one MTGDecks Start Here link");
assert.match(blankJundRenderState.basicLandCopy, /Swamps, Mountains, and Forests/, "expected Jund basics guidance to name all three basics cleanly");
assert.equal(
  (`Basics ${blankJundRenderState.basicLandCopy}`.match(/\bBasics\b/g) || []).length,
  1,
  "expected Jund Mana Base Starting Map to expose one visible Basics label"
);

const actualJundRenderState = buildDossierRenderState({
  starterCards: factionsData.factions.JUND.staples,
  colors: factionsData.factions.JUND.colors,
});
assert.equal(actualJundRenderState.hasStarterCardReferences, true, "expected authored Jund starter references to display");
assert.deepEqual(
  actualJundRenderState.starterCardSegments.map((segment) => segment.id),
  ["creatures", "spells", "permanents"],
  "expected authored Jund starter references to display all three starter groups"
);

const whiteRenderState = buildDossierRenderState({
  starterCards: factionsData.factions.W.staples,
  colors: factionsData.factions.W.colors,
});
assert.equal(whiteRenderState.hasStarterCardReferences, true, "expected authored starter cards to keep the starter panel renderable");
assert.deepEqual(
  whiteRenderState.starterCardSegments.map((segment) => segment.id),
  ["creatures", "spells", "permanents"],
  "expected fully authored starter groups to keep all starter-card segments"
);

const partialStarterRenderState = buildDossierRenderState({
  starterCards: { creatures: ["Sakura-Tribe Elder"], spells: [""], permanents: [] },
  colors: ["B", "R", "G"],
});
assert.deepEqual(
  partialStarterRenderState.starterCardSegments.map((segment) => segment.id),
  ["creatures"],
  "expected partial starter groups to render only non-empty segments"
);

const jundPresentation = presentationForFaction(factionsData.factions.JUND);
assert.match(jundPresentation.thesis, /The blood knows before the mind can bargain/, "expected Jund to use authored Vox Mana reveal copy");
assert.match(jundPresentation.mechanics, /mechanical echoes, not lore-canon examples/, "expected Jund mechanics copy to carry support-only safety language");
assert.doesNotMatch(
  [
    jundPresentation.thesis,
    jundPresentation.tableExperience,
    jundPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i,
  "expected Jund presentation to avoid generic fallback copy"
);

["BANT", "ESPER", "JUND"].forEach((key) => {
  const faction = factionsData.factions[key];
  const dossier = buildCommanderDossier({
    factions: factionsData.factions,
    placementModel,
    deckTagCatalog,
    placementResult: {
      faction: key,
      confidence: 0.72,
      decree: `${faction.name} remains a live presentation regression surface.`,
      starter_profile: {
        budget_band: "mid",
        experience_level: "returning",
      },
      top_matches: [
        {
          faction: key,
          faction_name: faction.name,
          confidence: 0.72,
        },
      ],
      adjacent_matches: [],
      evidence_trail: [],
    },
    starterProfile: {
      budget_band: "mid",
      experience_level: "returning",
    },
  });
  const renderState = buildDossierRenderState({
    starterCards: faction.staples,
    colors: faction.colors,
  });
  const presentation = presentationForFaction(faction);
  assert.ok(dossier.commanderPath?.copy?.trim(), `expected ${key} Commander path copy to remain nonempty`);
  assert.ok(dossier.commanderPath?.spellcraft?.trim(), `expected ${key} spellcraft copy to remain nonempty`);
  assert.ok(dossier.commanderPath?.tableCautionText?.trim(), `expected ${key} table caution copy to remain nonempty`);
  assert.equal(renderState.hasStarterCardReferences, true, `expected ${key} starter-card groups to remain renderable`);
  assert.ok(presentation.thesis?.trim(), `expected ${key} Archscry thesis to remain nonempty`);
  assert.ok(presentation.tableExperience?.trim(), `expected ${key} Archscry table experience to remain nonempty`);
});

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

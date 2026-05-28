import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  MANA_ORDER,
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  likelihoodToDelta,
  needsCrucible,
  rankAdaptiveFactions,
  runAdaptiveGoldenPath,
  selectNextAdaptiveQuestion,
  softmaxScores,
} from "./adaptive-placement.js";
import {
  buildArchidektDeckSearchUrl,
  buildArchidektSearchLinks,
  auditCommanderDossier,
  buildCommanderDossier,
  buildCommanderDirectoryLinks,
  buildMtgDecksCommanderUrl,
  buildCommanderStartingLane,
  buildReadingOmens,
  collectCommanderPreviewCandidates,
  buildCommanderPackageLinks,
  createArchidektTagCatalog,
  explainAdjacentFit,
  getExternalDeckRoutingAlias,
  getCommanderFactionGuidance,
  getColorIdentity,
  renderCommanderDossierText,
  resolveArchidektTagName,
  validateDeckTagData,
} from "./archscry-result.js";

const factionData = JSON.parse(
  await readFile(new URL("../../data/factions.json", import.meta.url), "utf8")
);
const placementModel = JSON.parse(
  await readFile(new URL("../../data/placement-model.json", import.meta.url), "utf8")
);
const placementSchema = JSON.parse(
  await readFile(new URL("../../data/placement-model.schema.json", import.meta.url), "utf8")
);
const identityLayers = JSON.parse(
  await readFile(new URL("../../data/identity-layers.json", import.meta.url), "utf8")
);
const identityLayerSchema = JSON.parse(
  await readFile(new URL("../../data/identity-layers.schema.json", import.meta.url), "utf8")
);
const deckTagData = JSON.parse(
  await readFile(new URL("../../data/deck-tags_expanded.json", import.meta.url), "utf8")
);
const taxonomyData = JSON.parse(
  await readFile(new URL("../../data/taxonomy/vox-mana-tags.json", import.meta.url), "utf8")
);

const factions = factionData.factions;
const factionKeys = Object.keys(factions);
const modelFactionKeys = Object.keys(placementModel.factions);
const deckTagCatalog = createArchidektTagCatalog(deckTagData);
const deckTagNames = new Set(deckTagCatalog.tagNames);
const taxonomyTags = taxonomyData.tags || [];
const MONO_BOUNDARY_TARGETS = Object.freeze({
  W: ["WU", "WB", "WG", "WR"],
  U: ["WU", "UB", "UR", "UG"],
  B: ["UB", "WB", "BG", "BR"],
  R: ["WR", "UR", "BR", "RG"],
  G: ["WG", "UG", "BG", "RG"],
});
const INSTITUTION_TYPES = Object.freeze([
  "guild",
  "college",
  "color",
  "shard",
  "wedge",
  "four_color",
  "five_color",
  "colorless",
]);
const PREVIEW_SCORE_KEYS = Object.freeze(["order", "knowledge", "ambition", "freedom", "growth"]);
const EXPECTED_PREVIEW_ORDER = Object.freeze([
  "W",
  "U",
  "B",
  "R",
  "G",
  "WU",
  "UB",
  "BR",
  "RG",
  "WG",
  "WB",
  "UR",
  "BG",
  "WR",
  "UG",
  "SILVERQUILL",
  "PRISMARI",
  "WITHERBLOOM",
  "LOREHOLD",
  "QUANDRIX",
]);

function normalizeTaxonomyMatchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function taxonomyTextIncludesTag(text, entry) {
  const haystack = normalizeTaxonomyMatchText(text);
  const paddedHaystack = haystack ? ` ${haystack} ` : "";
  return [entry.tag, entry.display_name, ...(entry.aliases || [])]
    .map(normalizeTaxonomyMatchText)
    .filter(Boolean)
    .some((needle) => haystack === needle || paddedHaystack.includes(` ${needle} `));
}

function uniqueTagRefs(refs = []) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = `${ref.category}:${ref.tag}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function taxonomyEntry(category, tag) {
  return taxonomyTags.find((entry) => entry.category === category && entry.tag === tag) || null;
}

function queryTerm(value, field = "o") {
  const cleaned = String(value || "").trim().toLowerCase();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned.replace(/"/g, "")}"` : `${field}:${cleaned}`;
}

function queryTermsForTags(tagRefs = [], field = "o") {
  const terms = [];
  uniqueTagRefs(tagRefs).slice(0, 4).forEach((ref) => {
    const entry = taxonomyEntry(ref.category, ref.tag);
    if (!entry) return;
    terms.push(queryTerm(entry.tag, field));
    (entry.aliases || []).slice(0, 1).forEach((alias) => terms.push(queryTerm(alias, field)));
  });
  return [...new Set(terms)].filter(Boolean);
}

function groupedOr(terms = []) {
  return terms.length ? `(${terms.join(" OR ")})` : "";
}

function sortedStrings(values = []) {
  return [...values].map((value) => String(value || "")).sort();
}

function normalizedAdjacentFamily(keyOrFaction) {
  return getExternalDeckRoutingAlias(
    typeof keyOrFaction === "string" ? (factions[keyOrFaction] || keyOrFaction) : keyOrFaction
  ).colorIdentity;
}

function assertMonoBoundaryState(key, placementResult) {
  const expectedTargets = MONO_BOUNDARY_TARGETS[key];
  assert.ok(expectedTargets, `Missing mono boundary target set for ${key}.`);
  assert.deepEqual(
    sortedStrings(placementModel.factions[key]?.lateral_inhibition_targets || []),
    sortedStrings(expectedTargets),
    `${key} should keep the four mono-adjacent boundary expressions wired into the model.`
  );
  const expectedFamilies = new Set(expectedTargets.map(normalizedAdjacentFamily));
  assert.ok(
    (placementResult?.adjacent_matches || []).every((match) => expectedFamilies.has(normalizedAdjacentFamily(match.faction))),
    `${key} adjacent matches should remain inside the ${expectedTargets.join(", ")} pair families.`
  );
}

function assertMonoCommanderOwnership(key, dossier) {
  const factionGuidance = getCommanderFactionGuidance(factions[key]);
  assert.equal(factionGuidance?.key, key, `${key} should resolve mono guidance ownership.`);
  assert.equal(dossier?.commanderPath?.guidance?.key, key, `${key} dossier should keep mono-owned guidance.`);
  assert.equal(
    dossier?.commanderRecommendationSource,
    "commander_compass (3)",
    `${key} dossier should keep authored mono Commander Compass ownership.`
  );
}

function deriveReadingTagRefsForTest({ dossier, faction, result }) {
  const evidenceText = (result?.evidence_trail || [])
    .flatMap((entry) => [entry.signal, entry.answer_title, entry.prompt])
    .filter(Boolean)
    .join(" ");
  const text = [
    dossier?.decreeCopy,
    dossier?.commanderPath?.copy,
    dossier?.commanderPath?.spellcraft,
    faction?.tagline,
    faction?.philosophy,
    ...(dossier?.archetypes || []).flatMap((item) => [item.name, item.desc]),
    evidenceText,
  ].filter(Boolean).join(" ");

  const categoryOrder = new Map([
    ["mechanical", 0],
    ["playstyle", 1],
    ["identity", 2],
    ["lore-tone", 3],
  ]);

  return uniqueTagRefs((taxonomyTags || [])
    .filter((entry) => taxonomyTextIncludesTag(text, entry))
    .map((entry) => ({ category: entry.category, tag: entry.tag })))
    .sort((left, right) =>
      (categoryOrder.get(left.category) ?? 9) - (categoryOrder.get(right.category) ?? 9) ||
      left.tag.localeCompare(right.tag)
    )
    .slice(0, 9);
}

/**
 * Validates the normalized placement result generated by the adaptive engine.
 *
 * @param {object} placement Adaptive placement result.
 */
function assertValidPlacement(placement) {
  assert.equal(placement.source_mode, "quick");
  assert.equal(placement.model_version, placementModel._meta.model_version);
  assert.ok(factionKeys.includes(placement.faction), `Unknown faction ${placement.faction}`);
  assert.equal(placement.faction_name, factions[placement.faction].name);
  assert.ok(INSTITUTION_TYPES.includes(placement.institution_type), `Unexpected institution type ${placement.institution_type}`);
  assert.ok(placement.world, "Placement should include world.");
  assert.ok(placement.decree.length > 80, "Placement should include a meaningful decree.");
  assert.ok(placement.confidence >= 0 && placement.confidence <= 1);
  assert.ok(placement.confidence_gap >= 0 && placement.confidence_gap <= 1);
  assert.equal(placement.top_matches.length, 3);
  assert.equal(placement.adjacent_matches.length, 2);
  assert.ok(placement.evidence_trail.length >= 2, "Placement should include an evidence trail.");
  assert.ok(placement.stage_history.length >= 2, "Placement should include stage history.");
  assert.ok(placement.identity, "Placement should include layered identity metadata.");
  assert.equal(placement.identity.expression_key, placement.faction);
  assert.equal(placement.identity.expression_name, placement.faction_name);

  MANA_ORDER.forEach((color) => {
    assert.equal(typeof placement.mana_scores[color], "number", `Missing mana score for ${color}`);
    assert.ok(placement.mana_scores[color] >= 1 && placement.mana_scores[color] <= 10);
  });

  placement.top_matches.forEach((match, index) => {
    assert.ok(factionKeys.includes(match.faction), `Unknown top match ${match.faction}`);
    assert.equal(match.rank, index + 1);
    assert.ok(match.identity, `Top match ${match.faction} should include layered identity metadata.`);
    assert.equal(match.identity.expression_key, match.faction);
    assert.ok(match.confidence >= 0 && match.confidence <= 1);
    assert.ok(match.reason.length > 20);
  });

  placement.adjacent_matches.forEach((match) => {
    assert.ok(factionKeys.includes(match.faction), `Unknown adjacent match ${match.faction}`);
    assert.notEqual(match.faction, placement.faction);
  });
}

function assertIdentityPreviewRegistryContract() {
  const expressionSchema = identityLayerSchema.properties.expressions.additionalProperties;
  const institutionEnum = identityLayerSchema.$defs.institutionType.enum;
  const previewScoreSchema = identityLayerSchema.$defs.previewScores;
  const previewThenRequired = expressionSchema.allOf
    .find((entry) => entry.if?.properties?.preview_eligible?.const === true)
    ?.then?.required || [];

  assert.deepEqual(institutionEnum, INSTITUTION_TYPES);
  assert.ok(!institutionEnum.includes("family"), "identity institution enum should not include family yet");
  ["display_code", "aliases", "placement_eligible", "preview_eligible"].forEach((field) => {
    assert.ok(expressionSchema.required.includes(field), `identity expression schema should require ${field}`);
  });
  ["preview_order", "preview_label", "preview_title", "preview_text", "preview_hex", "preview_scores"].forEach((field) => {
    assert.ok(previewThenRequired.includes(field), `preview-eligible expressions should require ${field}`);
  });
  assert.deepEqual(previewScoreSchema.required, PREVIEW_SCORE_KEYS);

  const previewEntries = Object.entries(identityLayers.expressions)
    .filter(([, expression]) => expression.preview_eligible === true)
    .sort((left, right) => left[1].preview_order - right[1].preview_order);
  assert.deepEqual(previewEntries.map(([key]) => key), EXPECTED_PREVIEW_ORDER);

  const seenOrders = new Set();
  previewEntries.forEach(([key, expression], index) => {
    assert.equal(expression.key, key);
    assert.equal(expression.placement_eligible, true, `${key} should stay placement eligible`);
    assert.equal(expression.preview_order, index, `${key} should preserve Home preview order`);
    assert.ok(!seenOrders.has(expression.preview_order), `${key} has duplicate preview order`);
    seenOrders.add(expression.preview_order);
    assert.ok(expression.display_code, `${key} should expose a display code`);
    assert.ok(Array.isArray(expression.aliases) && expression.aliases.length >= 1, `${key} should expose aliases`);
    assert.ok(expression.aliases.includes(key), `${key} aliases should include canonical key`);
    assert.ok(expression.preview_label, `${key} should expose preview label`);
    assert.ok(expression.preview_title, `${key} should expose preview title`);
    assert.ok(expression.preview_text, `${key} should expose preview text`);
    assert.match(expression.preview_hex, /^#[0-9a-fA-F]{6}$/, `${key} should expose a preview hex`);

    PREVIEW_SCORE_KEYS.forEach((scoreKey) => {
      const value = expression.preview_scores?.[scoreKey];
      assert.equal(typeof value, "number", `${key} preview score ${scoreKey} should be numeric`);
      assert.ok(value >= 0 && value <= 100, `${key} preview score ${scoreKey} should stay in radar range`);
    });
    assert.deepEqual(Object.keys(expression.preview_scores), PREVIEW_SCORE_KEYS, `${key} preview scores should follow Home axis order`);
  });

  assert.equal(identityLayers.expressions.WG.display_code, "GW");
  assert.ok(identityLayers.expressions.WG.aliases.includes("GW"));
  assert.equal(identityLayers.expressions.UG.display_code, "GU");
  assert.ok(identityLayers.expressions.UG.aliases.includes("GU"));
  assert.equal(identityLayers.expressions.WR.display_code, "RW");
  assert.ok(identityLayers.expressions.WR.aliases.includes("RW"));
  assert.ok(identityLayers.expressions.WR.aliases.includes("boros"));
}

assert.equal(placementSchema.title, "Vox Mana Adaptive Placement Model");
assert.equal(placementModel._meta.model_version, "vox-mana-adaptive-placement-v1");
assert.equal(placementModel._meta.faction_count, modelFactionKeys.length);
assert.equal(factionKeys.length, modelFactionKeys.length);
assert.deepEqual(modelFactionKeys.sort(), factionKeys.slice().sort());
assertIdentityPreviewRegistryContract();

const tagValidation = validateDeckTagData(deckTagData);
assert.deepEqual(tagValidation.errors, []);
assert.ok(deckTagCatalog.deckFormatCommander === 3);
assert.ok(deckTagCatalog.tagNames.includes("Control"));
assert.ok(deckTagCatalog.validation.warnings.some((warning) => warning.includes("ramp")));
assert.ok(deckTagCatalog.validation.warnings.some((warning) => warning.includes("stax")));

const duplicateTagData = structuredClone(deckTagData);
duplicateTagData.archidekt.tags.push({
  name: "Control",
  aliases: ["duplicate control"],
  category: "archetype",
});
assert.ok(
  validateDeckTagData(duplicateTagData).errors.some((error) => error.includes("Duplicate canonical tag name"))
);

const missingFieldTagData = {
  archidekt: {
    deckFormatCommander: 3,
    tags: [{ name: "", aliases: ["empty"], category: "" }],
  },
};
const missingFieldReport = validateDeckTagData(missingFieldTagData);
assert.ok(missingFieldReport.errors.some((error) => error.includes("non-empty name")));
assert.ok(missingFieldReport.errors.some((error) => error.includes("missing category")));

assert.equal(resolveArchidektTagName(deckTagCatalog, "ramp"), "Ramp");
assert.equal(resolveArchidektTagName(deckTagCatalog, "big mana"), "Big Mana");
assert.equal(resolveArchidektTagName(deckTagCatalog, "stax"), "Stax");
assert.equal(resolveArchidektTagName(deckTagCatalog, "prison"), "Prison");
assert.equal(resolveArchidektTagName(deckTagCatalog, "Spells-Matter"), "Spellslinger");
assert.equal(resolveArchidektTagName(deckTagCatalog, "+1/+1 Counters"), "Counters Matter");

factionKeys.forEach((key) => {
  const faction = factions[key];
  const colors = getColorIdentity(faction.colors);
  const taggedUrl = new URL(buildArchidektDeckSearchUrl({
    colors: faction.colors,
    deckFormatCommander: deckTagCatalog.deckFormatCommander,
    deckTagName: "Control",
  }));

  assert.equal(`${taggedUrl.origin}${taggedUrl.pathname}`, "https://archidekt.com/search/decks");
  assert.equal(taggedUrl.searchParams.get("colors"), colors);
  assert.equal(taggedUrl.searchParams.get("deckFormat"), "3");
  assert.equal(taggedUrl.searchParams.get("deckTagName"), "Control");
  assert.equal(taggedUrl.searchParams.get("orderBy"), "-updatedAt");
  assert.equal(taggedUrl.searchParams.get("page"), "1");
  assert.equal(taggedUrl.searchParams.get("format"), null);

  const links = buildArchidektSearchLinks({
    catalog: deckTagCatalog,
    faction,
    placementResult: {
      evidence_trail: [
        {
          signal: "fairness through process",
          answer_title: "Follow the process",
          prompt: "A community wants one outcome.",
        },
      ],
    },
    starterProfile: { budget_band: "mid" },
    modelFaction: placementModel.factions[key],
  });
  assert.equal(links.filter((link) => link.kind === "archidekt-base").length, 1);
  assert.ok(links.length >= 1 && links.length <= 4);
  links
    .filter((link) => link.kind === "archidekt-tag")
    .forEach((link) => {
      assert.ok(deckTagNames.has(link.tagName), `Unknown Archidekt tag ${link.tagName}`);
      const url = new URL(link.url);
      assert.equal(url.searchParams.get("deckTagName"), link.tagName);
    });
});

assert.equal(
  new URL(buildArchidektDeckSearchUrl({ colors: factions.LOREHOLD.colors })).searchParams.get("colors"),
  "WR"
);

const prismariLinks = buildArchidektSearchLinks({
  catalog: deckTagCatalog,
  faction: factions.PRISMARI,
  placementResult: {
    evidence_trail: [
      {
        signal: "elemental expression",
        answer_title: "The unforgettable expression",
        prompt: "What matters most?",
      },
    ],
  },
  starterProfile: { budget_band: "budget" },
  modelFaction: placementModel.factions.PRISMARI,
});
const prismariTags = prismariLinks.map((link) => link.tagName).filter(Boolean);
assert.ok(prismariTags.includes("Budget"));
assert.ok(prismariTags.includes("Spellslinger"));

const prismariAlias = getExternalDeckRoutingAlias(factions.PRISMARI);
assert.equal(prismariAlias.guild, "izzet");
assert.equal(prismariAlias.colorIdentity, "UR");

const whiteAlias = getExternalDeckRoutingAlias(factions.W);
assert.equal(whiteAlias.guild, "mono-white");
assert.equal(whiteAlias.colorIdentity, "W");

const blueAlias = getExternalDeckRoutingAlias(factions.U);
assert.equal(blueAlias.guild, "mono-blue");
assert.equal(blueAlias.colorIdentity, "U");

const blackAlias = getExternalDeckRoutingAlias(factions.B);
assert.equal(blackAlias.guild, "mono-black");
assert.equal(blackAlias.colorIdentity, "B");

const redAlias = getExternalDeckRoutingAlias(factions.R);
assert.equal(redAlias.guild, "mono-red");
assert.equal(redAlias.colorIdentity, "R");
const greenAlias = getExternalDeckRoutingAlias(factions.G);
assert.equal(greenAlias.guild, "mono-green");
assert.equal(greenAlias.colorIdentity, "G");

const borosStringAliases = ["boros", "RW", "WR"].map((alias) => getExternalDeckRoutingAlias(alias));
borosStringAliases.forEach((alias) => {
  assert.equal(alias.guild, "boros");
  assert.equal(alias.colorIdentity, "WR");
});
const whiteStringAlias = getExternalDeckRoutingAlias("W");
assert.equal(whiteStringAlias.guild, "mono-white");
assert.equal(whiteStringAlias.colorIdentity, "W");

const collegeDirectoryCases = [
  [factions.PRISMARI, "https://edhrec.com/commanders/izzet", "https://mtgdecks.net/Commander/izzet-commanders"],
  [factions.LOREHOLD, "https://edhrec.com/commanders/boros", "https://mtgdecks.net/Commander/boros-commanders"],
  [factions.QUANDRIX, "https://edhrec.com/commanders/simic", "https://mtgdecks.net/Commander/simic-commanders"],
  [factions.SILVERQUILL, "https://edhrec.com/commanders/orzhov", "https://mtgdecks.net/Commander/orzhov-commanders"],
  [factions.WITHERBLOOM, "https://edhrec.com/commanders/golgari", "https://mtgdecks.net/Commander/golgari-commanders"],
];

collegeDirectoryCases.forEach(([faction, edhrecUrl, mtgDecksUrl]) => {
  const links = buildCommanderDirectoryLinks(faction);
  assert.equal(links.find((link) => link.service === "edhrec")?.url, edhrecUrl);
  assert.equal(links.find((link) => link.service === "mtgdecks")?.url, mtgDecksUrl);
});

assert.equal(
  buildMtgDecksCommanderUrl("Veyran, Voice of Duality"),
  "https://mtgdecks.net/Commander/veyran-voice-of-duality"
);
assert.equal(
  buildMtgDecksCommanderUrl("Prismari, the Inspiration"),
  "https://mtgdecks.net/Commander/prismari-the-inspiration"
);

[
  [factions.W, "https://edhrec.com/commanders/mono-white", "https://mtgdecks.net/Commander/mono-white-commanders"],
  [factions.U, "https://edhrec.com/commanders/mono-blue", "https://mtgdecks.net/Commander/mono-blue-commanders"],
  [factions.B, "https://edhrec.com/commanders/mono-black", "https://mtgdecks.net/Commander/mono-black-commanders"],
  [factions.R, "https://edhrec.com/commanders/mono-red", "https://mtgdecks.net/Commander/mono-red-commanders"],
  [factions.G, "https://edhrec.com/commanders/mono-green", "https://mtgdecks.net/Commander/mono-green-commanders"],
  [factions.WU, "https://edhrec.com/commanders/azorius", "https://mtgdecks.net/Commander/azorius-commanders"],
  [factions.BG, "https://edhrec.com/commanders/golgari", "https://mtgdecks.net/Commander/golgari-commanders"],
].forEach(([faction, edhrecUrl, mtgDecksUrl]) => {
  const links = buildCommanderDirectoryLinks(faction);
  assert.equal(links.find((link) => link.service === "edhrec")?.url, edhrecUrl);
  assert.equal(links.find((link) => link.service === "mtgdecks")?.url, mtgDecksUrl);
});

const packageLinks = buildCommanderPackageLinks(factions.WU);
assert.equal(packageLinks.maze.length, 6);
assert.equal(packageLinks.scryfall.length, 6);
assert.ok(packageLinks.maze.every((link) => link.url.startsWith("/maze/?q=")));
assert.ok(packageLinks.scryfall.every((link) => link.url.startsWith("https://scryfall.com/search?q=")));
assert.ok(packageLinks.maze.every((link) => link.service === "maze"));
assert.ok(packageLinks.scryfall.every((link) => link.service === "scryfall"));
assert.deepEqual(
  packageLinks.maze.map((link) => link.pathType),
  ["commanders-that-fit", "ramp", "draw", "interaction", "lands", "win-conditions"]
);
assert.ok(packageLinks.maze.every((link) => link.operatorQuery && link.plainReadingQuery));

const dimirCommanderLane = buildCommanderStartingLane({
  faction: factions.UB,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.UB,
  tagLanes: [{ tagName: "Control" }],
});
const dimirLaneText = [
  dimirCommanderLane.title,
  dimirCommanderLane.copy,
  ...dimirCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
const dimirTableCaution = dimirCommanderLane.details.find((detail) => detail.label === "Table caution");
assert.equal(dimirCommanderLane.title, "Start With This Commander Plan");
assert.match(dimirLaneText, /Commander deck/);
assert.doesNotMatch(dimirLaneText, /placement model|recent evidence|mechanics cue|risk check/i);
assert.ok(dimirTableCaution, "Dimir lane should include a table caution note.");
assert.match(
  dimirTableCaution.copy,
  /^Wait until shields drop, hold interaction, and draw cards before revealing the card that actually wins\.$/
);
assert.doesNotMatch(dimirTableCaution.copy, /;/);
assert.match(dimirTableCaution.copy, /\b(wait|hold|draw)\b/i);

const gruulGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "RG" }).result;
const gruulDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: gruulGolden,
});
const gruulDossierText = renderCommanderDossierText(gruulDossier);
assert.match(gruulDossier.commanderPath.copy, /ramp hard|oversized|trampling/i);
assert.doesNotMatch(gruulDossierText, /turns spell sequencing into spectacle|sculpt the hand|one stack become the story/i);
assert.doesNotMatch(gruulDossierText, /\b[2-9]x\s+|\bx\s*[2-9]\b/i);
assert.ok(
  gruulDossier.archetypes.some((item) => /Ramp/i.test(item.name)),
  "Gruul should keep Commander-credible ramp lanes"
);
assert.ok(
  !gruulDossier.archetypes.some((item) => /Zoo|Ponza|Land Denial/i.test(`${item.name} ${item.desc}`)),
  "Gruul should suppress stale 60-card archetype labels in Commander lanes"
);

const golgariGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "BG" }).result;
const golgariToSimicDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: golgariGolden,
  targetFactionKey: "UG",
});
const golgariToSimicText = renderCommanderDossierText(golgariToSimicDossier);
assert.match(golgariToSimicDossier.commanderPath.copy, /adapts|counters|biological upgrades/i);
assert.doesNotMatch(golgariToSimicText, /uses the discard pile like a second hand|stock the graveyard|buy cards back|make removal feel temporary|graveyard into a second hand/i);

const dimirGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "UB" }).result;
const dimirDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: dimirGolden,
});
const dimirAudit = auditCommanderDossier(dimirDossier);
assert.doesNotMatch(
  dimirAudit.warnings.join(" "),
  /Possible language bleed for Dimir.*spell spectacle/i,
  "Dimir should not warn when spell spectacle only appears in a Prismari adjacent-fit explanation."
);
const dimirBleedDossier = structuredClone(dimirDossier);
dimirBleedDossier.commanderPath.copy += " This path turns spell spectacle into hidden inevitability.";
const dimirBleedAudit = auditCommanderDossier(dimirBleedDossier);
assert.match(
  dimirBleedAudit.warnings.join(" "),
  /Possible language bleed for Dimir.*spell spectacle/i,
  "Dimir should warn when spell spectacle appears in Dimir-owned Commander Path copy."
);

const omens = buildReadingOmens({
  evidenceTrail: [
    {
      stage: "gate",
      signal: "fairness through process",
      answer_title: "Follow the process",
      deltas: [{ faction: "WU", delta: 1.2 }],
    },
    {
      stage: "crucible",
      signal: "graveyard recursion",
      answer_title: "Use the graveyard",
      deltas: [{ faction: "BG", delta: 1.1 }],
    },
  ],
  factions,
  activeFactionKey: "WU",
});
const omenText = omens.map((omen) => `${omen.title} ${omen.answerTitle} ${omen.copy}`).join(" ");
assert.equal(omens[0].title, "Signal 1");
assert.match(omenText, /Follow the process/);
assert.match(omenText, /echoed|answered by/);
assert.doesNotMatch(omenText, /Gate|Hall|Crucible|fairness through process|graveyard recursion|reinforced/i);

const dimirCommanderCandidates = collectCommanderPreviewCandidates(factions.UB);
assert.ok(dimirCommanderCandidates.some((candidate) => candidate.name === "Lazav, Dimir Mastermind"));
assert.ok(dimirCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.ok(!dimirCommanderCandidates.some((candidate) => candidate.name === "Dimir Commanders"));
assert.ok(!dimirCommanderCandidates.some((candidate) => candidate.name === "Snapcaster Mage"));

const loreholdCommanderCandidates = collectCommanderPreviewCandidates(factions.LOREHOLD);
assert.equal(loreholdCommanderCandidates[0].name, "Lorehold, the Historian");
assert.ok(loreholdCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.ok(!loreholdCommanderCandidates.some((candidate) => candidate.name === "Lorehold Spirit"));

const golgariCommanderCandidates = collectCommanderPreviewCandidates(factions.BG);
assert.deepEqual(
  golgariCommanderCandidates.map((candidate) => candidate.name),
  ["Jarad, Golgari Lich Lord", "Meren of Clan Nel Toth", "The Gitrog Monster"]
);
assert.ok(golgariCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.ok(!golgariCommanderCandidates.some((candidate) => /Dina, Soul Steeper/i.test(candidate.name)));

const gruulCommanderCandidates = collectCommanderPreviewCandidates(factions.RG);
assert.deepEqual(
  gruulCommanderCandidates.map((candidate) => candidate.name),
  ["Borborygmos Enraged", "Ruric Thar, the Unbowed", "Nikya of the Old Ways"]
);
assert.ok(gruulCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));

const izzetCommanderCandidates = collectCommanderPreviewCandidates(factions.UR);
assert.deepEqual(
  izzetCommanderCandidates.map((candidate) => candidate.name),
  ["Niv-Mizzet, Parun", "Melek, Izzet Paragon", "Niv-Mizzet, Dracogenius"]
);
assert.ok(izzetCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.doesNotMatch(
  izzetCommanderCandidates.map((candidate) => `${candidate.name} ${candidate.desc}`).join(" "),
  /\b(performance|art as arcana|elemental spectacle|theatrical)\b/i
);

const silverquillCommanderCandidates = collectCommanderPreviewCandidates(factions.SILVERQUILL);
assert.equal(silverquillCommanderCandidates[0].source, "commander_compass");
assert.equal(silverquillCommanderCandidates[1].source, "commander_compass");
assert.doesNotMatch(
  silverquillCommanderCandidates.map((candidate) => `${candidate.name} ${candidate.desc}`).join(" "),
  /\b(contract|debt|tax|obligation|afterlife|payment|ledger)\b/i
);

for (const factionKey of ["BG", "RG", "UR"]) {
  const run = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: factionKey });
  const dossier = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    placementResult: run.result,
    targetFactionKey: factionKey,
  });
  const audit = auditCommanderDossier(dossier);
  assert.equal(dossier.commanderRecommendationSource, "commander_compass (3)");
  assert.doesNotMatch(
    audit.warnings.join(" "),
    /generic commander recommendation fallback|generic starter-reference fallback/i
  );
}

const golgariRun = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "BG" });
const quandrixAdjacentDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: golgariRun.result,
  targetFactionKey: "QUANDRIX",
  adjacentReason: "Regression check: adjacent dossiers should use the target faction's Commander Compass.",
});
assert.match(quandrixAdjacentDossier.commanderRecommendationSource, /^commander_compass \(2\)/);
assert.deepEqual(
  quandrixAdjacentDossier.commanderRecommendations.slice(0, 2).map((candidate) => candidate.name),
  ["Quandrix, the Proof", "Adrix and Nev, Twincasters"]
);
assert.ok(!quandrixAdjacentDossier.commanderRecommendations.some((candidate) => /Jarad|Meren|Gitrog/i.test(candidate.name)));

const adjacentExplanation = explainAdjacentFit({
  match: { faction: "WU" },
  matchFaction: factions.WU,
  primaryFaction: factions.WR,
  placementResult: {
    evidence_trail: [
      {
        signal: "fairness through process",
        deltas: [{ faction: "WU", delta: 1.2 }],
      },
    ],
  },
  modelFaction: placementModel.factions.WU,
});
assert.match(adjacentExplanation, /procedure as protection/);
assert.match(adjacentExplanation, /Through Azorius Senate, that pressure becomes law, control, tempo, taxation/i);
assert.doesNotMatch(adjacentExplanation, /fairness through process/);

const adjacentFallback = explainAdjacentFit({
  match: { faction: "UB" },
  matchFaction: factions.UB,
  primaryFaction: factions.WU,
  placementResult: { evidence_trail: [] },
  modelFaction: placementModel.factions.UB,
});
assert.match(adjacentFallback, /hidden information operator/i);
assert.match(adjacentFallback, /hidden information, control, mill, discard/i);

modelFactionKeys.forEach((key) => {
  const faction = placementModel.factions[key];
  assert.equal(faction.key, key);
  assert.ok(faction.raw_id, `${key} should retain raw provenance id.`);
  assert.ok(faction.biological_expression?.archetype, `${key} missing biological expression archetype.`);
  assert.ok(faction.biological_expression?.inhibitor_trigger, `${key} missing inhibitor trigger.`);
  assert.ok(Array.isArray(faction.good_fit_indicators), `${key} missing good-fit indicators.`);
  assert.ok(Array.isArray(faction.poor_fit_indicators), `${key} missing poor-fit indicators.`);
  assert.ok(Array.isArray(faction.discriminator_questions), `${key} missing discriminator questions.`);
  assert.ok(Array.isArray(faction.lateral_inhibition_targets), `${key} missing lateral inhibition targets.`);
});

assert.equal(placementModel.question_bank.gate.length, 4);
assert.ok(placementModel.question_bank.hall.length >= 15);
assert.ok(placementModel.question_bank.crucible.length >= 9);

assert.equal(likelihoodToDelta(0.95, placementModel.scoring_rules), 1.45);
assert.equal(likelihoodToDelta(0.25, placementModel.scoring_rules), -0.7);

const initialState = createInitialAdaptiveState(placementModel);
const initialProbabilityTotal = Object.values(softmaxScores(initialState)).reduce(
  (sum, value) => sum + value,
  0
);
assert.ok(Math.abs(initialProbabilityTotal - 1) < 0.00001);

const azoriusHall = placementModel.question_bank.hall.find((question) => question.id === "hall_WU_process");
const azoriusAnswer = azoriusHall.answers[0];
const azoriusState = applyAdaptiveAnswer({
  state: initialState,
  model: placementModel,
  question: azoriusHall,
  answer: azoriusAnswer,
  answerIndex: 0,
});
assert.ok(azoriusState.scores.WU > initialState.scores.WU, "Azorius evidence should increase WU.");
assert.ok(azoriusState.scores.WG < initialState.scores.WG, "Azorius evidence should suppress Selesnya.");
assert.ok(azoriusState.scores.WR < initialState.scores.WR, "Azorius evidence should suppress Boros.");

const prunedState = applyAdaptiveAnswer({
  state: initialState,
  model: placementModel,
  question: { id: "test_prune", stage: "hall", prompt: "test" },
  answer: {
    title: "Poison pill",
    signal: "poison pill",
    likelihoods: { WU: 0.03 },
  },
  answerIndex: 0,
});
assert.ok(prunedState.pruned.includes("WU"), "Poison-pill likelihood should prune a faction.");
assert.equal(softmaxScores(prunedState).WU, 0);

const closeState = createInitialAdaptiveState(placementModel);
closeState.stage_counts = { gate: 4, hall: 2, crucible: 0 };
Object.keys(closeState.scores).forEach((key) => {
  closeState.scores[key] = -5;
});
closeState.scores.WU = 2;
closeState.scores.WG = 1.95;
assert.ok(needsCrucible(closeState, placementModel), "Close lateral targets should trigger Crucible.");
assert.equal(
  selectNextAdaptiveQuestion(closeState, placementModel).id,
  "crucible_WU_WG",
  "Crucible should select the pairwise discriminator."
);

const sample = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "WU",
});
assertValidPlacement(sample.result);
assert.doesNotMatch(sample.result.decree, /posterior/i);
assert.match(sample.result.decree, /stronger match|strongest match/i);

const goldenResults = modelFactionKeys.map((targetFaction) => {
  const run = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction });
  assertValidPlacement(run.result);
  assert.equal(
    run.result.faction,
    targetFaction,
    `Golden path for ${targetFaction} should win ${targetFaction}, got ${run.result.faction}`
  );
  return run.result;
});

const selected = new Set(goldenResults.map((result) => result.faction));
["LOREHOLD", "SILVERQUILL", "WB", "WG"].forEach((key) => {
  assert.ok(selected.has(key), `${key} must be reachable by golden-path evidence.`);
});

const ranked = rankAdaptiveFactions(sample.state, placementModel);
assert.equal(ranked[0].faction, "WU");

const whiteGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "W",
}).result;
assertValidPlacement(whiteGolden);
assert.equal(whiteGolden.identity.expression_kind, "color");
assert.equal(whiteGolden.identity.purity, 1);
assert.ok(
  whiteGolden.adjacent_matches.some((match) => ["WU", "WR", "WG"].includes(match.faction)),
  "White should keep at least one white-adjacent pair expression nearby."
);
const whiteDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: whiteGolden,
});
const decayEntry = taxonomyEntry("identity", "decay");
assert.ok(decayEntry, "Decay taxonomy entry should exist.");
assert.equal(
  taxonomyTextIncludesTag("protection", decayEntry),
  false,
  'Decay alias "rot" should not match inside "protection".'
);
assert.equal(
  taxonomyTextIncludesTag("slow rot and reclaimed timber", decayEntry),
  true,
  'Decay alias "rot" should still match when rot appears as a real token.'
);
const whiteFlavorTagRefs = deriveReadingTagRefsForTest({
  dossier: whiteDossier,
  faction: factions.W,
  result: whiteGolden,
});
const whiteFlavorGroup = groupedOr(queryTermsForTags(
  whiteFlavorTagRefs.filter((ref) => ref.category === "identity" || ref.category === "lore-tone"),
  "ft"
));
const whiteFlavorQuery = `ci<=w ${whiteFlavorGroup}`;
assert.equal(whiteFlavorQuery, 'ci<=w (ft:order OR ft:structure OR ft:communal OR ft:shared)');
assert.doesNotMatch(whiteFlavorQuery, /\bdecay\b|\brot\b/i);
assert.match(whiteDossier.resultStatus, /primary color fit/i);
assert.equal(whiteDossier.faction.identity.expression_kind, "color");
assertMonoBoundaryState("W", whiteGolden);
assertMonoCommanderOwnership("W", whiteDossier);
assert.match(whiteDossier.commanderPath.copy, /protect|structure|board|shield/i);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_W_shelter"),
  "White should have authored Hall support for shelter/protection evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_W_duty"),
  "White should have authored Hall support for duty/standards evidence."
);

const blueGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "U",
}).result;
assertValidPlacement(blueGolden);
assert.equal(blueGolden.faction, "U");
assert.equal(factions.U.institution_type, "color");
assert.equal(placementModel.factions.U.institution_type, "color");
assert.ok(placementModel.factions.U.biological_expression?.archetype, "Blue should include biological expression.");
assert.equal(blueGolden.identity.expression_kind, "color");
assert.equal(blueGolden.identity.purity, 1);
assertMonoBoundaryState("U", blueGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_U_understanding"),
  "Blue should have authored Hall support for understanding-first evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_U_possibility"),
  "Blue should have authored Hall support for possibility/optimization evidence."
);
["crucible_U_WU", "crucible_U_UB", "crucible_U_UR", "crucible_U_UG"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Blue should include ${questionId}.`
  );
});
const blueDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: blueGolden,
});
assert.match(blueDossier.resultStatus, /primary color fit/i);
assert.equal(blueDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("U", blueDossier);
assert.match(blueDossier.commanderPath.copy, /knowledge|information|draw|options|control/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.U).map((candidate) => candidate.name),
  ["Talrand, Sky Summoner", "Azami, Lady of Scrolls", "Minn, Wily Illusionist"]
);

const blackGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "B",
}).result;
assertValidPlacement(blackGolden);
assert.equal(blackGolden.faction, "B");
assert.equal(blackGolden.identity.expression_kind, "color");
assert.equal(blackGolden.identity.purity, 1);
assertMonoBoundaryState("B", blackGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_B_cost"),
  "Black should have authored Hall support for cost/payment evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_B_graveyard"),
  "Black should have authored Hall support for graveyard/resource evidence."
);
["crucible_B_UB", "crucible_B_BR", "crucible_B_BG", "crucible_B_WB"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Black should include ${questionId}.`
  );
});
const blackDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: blackGolden,
});
assert.match(blackDossier.resultStatus, /primary color fit/i);
assert.equal(blackDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("B", blackDossier);
assert.match(blackDossier.commanderPath.copy, /life|sacrifice|graveyard|resource|cost|shadow/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.B).map((candidate) => candidate.name),
  ["K'rrik, Son of Yawgmoth", "Ayara, First of Locthwain", "Chainer, Dementia Master"]
);

const redGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "R",
}).result;
assertValidPlacement(redGolden);
assert.equal(redGolden.faction, "R");
assert.equal(factions.R.institution_type, "color");
assert.equal(placementModel.factions.R.institution_type, "color");
assert.ok(placementModel.factions.R.biological_expression?.archetype, "Red should include biological expression.");
assert.equal(redGolden.identity.expression_kind, "color");
assert.equal(redGolden.identity.purity, 1);
assertMonoBoundaryState("R", redGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_R_ignition"),
  "Red should have authored Hall support for ignition/immediacy evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_R_freedom"),
  "Red should have authored Hall support for freedom/direct-action evidence."
);
["crucible_R_WR", "crucible_R_UR", "crucible_R_BR", "crucible_R_RG"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Red should include ${questionId}.`
  );
});
const redDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: redGolden,
});
assert.match(redDossier.resultStatus, /primary color fit/i);
assert.equal(redDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("R", redDossier);
assert.match(redDossier.commanderPath.copy, /damage|burn|haste|impulse|treasure|action|pressure/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.R).map((candidate) => candidate.name),
  ["Torbran, Thane of Red Fell", "Krenko, Mob Boss", "Magda, Brazen Outlaw"]
);

const greenGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "G",
}).result;
assertValidPlacement(greenGolden);
assert.equal(greenGolden.faction, "G");
assert.equal(factions.G.institution_type, "color");
assert.equal(placementModel.factions.G.institution_type, "color");
assert.ok(placementModel.factions.G.biological_expression?.archetype, "Green should include biological expression.");
assert.equal(greenGolden.identity.expression_kind, "color");
assert.equal(greenGolden.identity.purity, 1);
assertMonoBoundaryState("G", greenGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_G_growth"),
  "Green should have authored Hall support for organic growth evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_G_natural_order"),
  "Green should have authored Hall support for natural-order evidence."
);
["crucible_G_WG", "crucible_G_UG", "crucible_G_BG", "crucible_G_RG"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Green should include ${questionId}.`
  );
});
const greenPositiveAnswers = [
  ...placementModel.question_bank.gate,
  ...placementModel.question_bank.hall,
  ...placementModel.question_bank.crucible,
].flatMap((question) =>
  (question.answers || []).filter((answer) => Number(answer?.likelihoods?.G || 0) >= 0.9)
);
const greenCoreEvidenceText = [
  ...(placementModel.factions.G.placement_axes.required_positive_evidence_terms || []),
  ...(placementModel.factions.G.placement_axes.strengthens_when_user_centers || []),
  ...greenPositiveAnswers.flatMap((answer) => [answer.title, answer.copy, answer.signal]),
].join(" ");
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(tokens?|community|communal|collective|convoke|anthem)\b/i,
  "Green core evidence should not absorb Selesnya token/community language."
);
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(optimization|mathematical|math|equation|experiment|prototype|engineered|adaptation)\b/i,
  "Green core evidence should not use Simic/Quandrix optimization or engineered-adaptation language."
);
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(decay|rot|reclamation|graveyard|sacrifice)\b/i,
  "Green core evidence should not rely on Golgari/Witherbloom decay or reclamation economy."
);
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(rage|smash|pressure|wild force|wild refusal|domestication)\b/i,
  "Green core evidence should not default to Gruul rage, smash, or wild-pressure language."
);
const greenDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: greenGolden,
});
assert.match(greenDossier.resultStatus, /primary color fit/i);
assert.equal(greenDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("G", greenDossier);
assert.match(greenDossier.commanderPath.copy, /organic growth|natural scale|ramp|creature/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.G).map((candidate) => candidate.name),
  ["Azusa, Lost but Seeking", "Selvala, Heart of the Wilds", "Goreclaw, Terror of Qal Sisma"]
);

Object.entries({
  W: whiteGolden,
  U: blueGolden,
  B: blackGolden,
  R: redGolden,
  G: greenGolden,
}).forEach(([key, result]) => {
  assert.equal(result.faction, key, `${key} mono golden path should remain preserved in the full rollout sweep.`);
  assert.equal(result.identity?.expression_kind, "color", `${key} should remain a mono color expression.`);
  assert.equal(result.identity?.purity, 1, `${key} should remain a pure mono result.`);
});

const directPlacement = buildAdaptivePlacementResult({
  state: sample.state,
  model: placementModel,
  factions,
});
assertValidPlacement(directPlacement);

console.log(`PASS adaptive placement tests: ${modelFactionKeys.length} factions, ${goldenResults.length} golden paths`);

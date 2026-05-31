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
  runAdaptiveReadingWithStrategy,
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
import {
  buildPersonalizedMazePaths,
  buildHeroNarrative,
  presentationForFaction,
} from "./archscry-presentation.js";

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
const factionContextText = await readFile(
  new URL("../../supabase/functions/guild-recruiter/faction-context.ts", import.meta.url),
  "utf8"
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
  const allowedAdjacentKeys = new Set(expectedTargets);
  if (["W", "U", "G"].includes(key)) {
    allowedAdjacentKeys.add("BANT");
  }
  if (["W", "U", "B"].includes(key)) {
    allowedAdjacentKeys.add("ESPER");
  }
  if (["U", "B", "R"].includes(key)) {
    allowedAdjacentKeys.add("GRIXIS");
  }
  if (["B", "R", "G"].includes(key)) {
    allowedAdjacentKeys.add("JUND");
  }
  if (["W", "R", "G"].includes(key)) {
    allowedAdjacentKeys.add("NAYA");
  }
  assert.ok(
    (placementResult?.adjacent_matches || []).every((match) =>
      allowedAdjacentKeys.has(match.faction) || expectedFamilies.has(normalizedAdjacentFamily(match.faction))
    ),
    `${key} adjacent matches should remain inside the ${expectedTargets.join(", ")} pair families or the live shard pilots.`
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

function runScriptedReading(answerTitlesByQuestionId) {
  return runAdaptiveReadingWithStrategy({
    model: placementModel,
    factions,
    strategy(question) {
      const wantedTitle = answerTitlesByQuestionId[question.id];
      if (!wantedTitle) {
        return 0;
      }
      const index = (question.answers || []).findIndex((answer) => answer.title === wantedTitle);
      assert.notEqual(index, -1, `Missing scripted answer "${wantedTitle}" for ${question.id}.`);
      return index;
    },
  });
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
  assert.equal(previewEntries.length, 20);
  assert.equal(identityLayers.expressions.BANT?.preview_eligible, false);
  assert.equal(identityLayers.expressions.ESPER?.preview_eligible, false);
  assert.equal(identityLayers.expressions.GRIXIS?.preview_eligible, false);
  assert.equal(identityLayers.expressions.JUND?.preview_eligible, false);
  assert.equal(identityLayers.expressions.NAYA?.preview_eligible, false);
  assert.ok(!previewEntries.some(([key]) => key === "BANT"), "BANT should not enter the Home preview carousel in VM-160.");
  assert.ok(!previewEntries.some(([key]) => key === "ESPER"), "ESPER should not enter the Home preview carousel in VM-167.");
  assert.ok(!previewEntries.some(([key]) => key === "GRIXIS"), "GRIXIS should not enter the Home preview carousel in VM-168.");
  assert.ok(!previewEntries.some(([key]) => key === "JUND"), "JUND should not enter the Home preview carousel in VM-186.");
  assert.ok(!previewEntries.some(([key]) => key === "NAYA"), "NAYA should not enter the Home preview carousel in VM-188.");

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
  assert.deepEqual(identityLayers.expressions.BANT.aliases, ["BANT", "bant"]);
  assert.deepEqual(identityLayers.expressions.ESPER.aliases, ["ESPER", "esper"]);
  assert.deepEqual(identityLayers.expressions.GRIXIS.aliases, ["GRIXIS", "grixis"]);
  assert.deepEqual(identityLayers.expressions.JUND.aliases, ["JUND", "jund"]);
  assert.deepEqual(identityLayers.expressions.NAYA.aliases, ["NAYA", "naya"]);
  Object.entries(identityLayers.expressions).forEach(([key, expression]) => {
    assert.ok(!(expression.aliases || []).includes("WUG"), `${key} should not expose WUG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("WUB"), `${key} should not expose WUB as an alias.`);
    assert.ok(!(expression.aliases || []).includes("UBR"), `${key} should not expose UBR as an alias.`);
    assert.ok(!(expression.aliases || []).includes("BRG"), `${key} should not expose BRG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("brg"), `${key} should not expose brg as an alias.`);
    assert.ok(!(expression.aliases || []).includes("RGW"), `${key} should not expose RGW as an alias.`);
    assert.ok(!(expression.aliases || []).includes("GRW"), `${key} should not expose GRW as an alias.`);
    assert.ok(!(expression.aliases || []).includes("WRG"), `${key} should not expose WRG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("rgw"), `${key} should not expose rgw as an alias.`);
    assert.ok(!(expression.aliases || []).includes("grw"), `${key} should not expose grw as an alias.`);
    assert.ok(!(expression.aliases || []).includes("wrg"), `${key} should not expose wrg as an alias.`);
    assert.ok(!(expression.aliases || []).includes("R/G/W"), `${key} should not expose R/G/W as an alias.`);
    assert.ok(!(expression.aliases || []).includes("Red-Green-White"), `${key} should not expose Red-Green-White as an alias.`);
    assert.ok(!Object.hasOwn(expression, "domain"), `${key} should not expose a live domain field.`);
  });
}

assert.equal(placementSchema.title, "Vox Mana Adaptive Placement Model");
assert.equal(placementModel._meta.model_version, "vox-mana-adaptive-placement-v1");
assert.equal(placementModel._meta.faction_count, modelFactionKeys.length);
assert.equal(factionKeys.length, modelFactionKeys.length);
assert.deepEqual(modelFactionKeys.sort(), factionKeys.slice().sort());
assertIdentityPreviewRegistryContract();

assert.ok(factions.BANT, "Generated factions should include BANT.");
assert.ok(placementModel.factions.BANT, "Generated placement model should include BANT.");
assert.match(factionContextText, /"BANT": \{/);
assert.equal(factions.BANT.institution_type, "shard");
assert.equal(placementModel.factions.BANT.institution_type, "shard");
assert.deepEqual(factions.BANT.colors, ["W", "U", "G"]);
assert.deepEqual(placementModel.factions.BANT.colors, ["W", "U", "G"]);
assert.deepEqual(sortedStrings(placementModel.factions.BANT.lateral_inhibition_targets), ["ESPER", "GRIXIS", "UG", "WG", "WU"]);
assert.equal(factions.BANT.identity.expression_key, "BANT");
assert.equal(factions.BANT.identity.expression_kind, "shard");
assert.ok(factions.BANT.commander_compass, "BANT should receive sanitized Commander Compass data after display creation.");
assert.ok(factions.ESPER, "Generated factions should include ESPER.");
assert.ok(placementModel.factions.ESPER, "Generated placement model should include ESPER.");
assert.match(factionContextText, /"ESPER": \{/);
assert.equal(factions.ESPER.institution_type, "shard");
assert.equal(placementModel.factions.ESPER.institution_type, "shard");
assert.deepEqual(factions.ESPER.colors, ["W", "U", "B"]);
assert.deepEqual(placementModel.factions.ESPER.colors, ["W", "U", "B"]);
assert.deepEqual(sortedStrings(placementModel.factions.ESPER.lateral_inhibition_targets), ["BANT", "GRIXIS", "UB", "WB", "WU"]);
assert.equal(factions.ESPER.identity.expression_key, "ESPER");
assert.equal(factions.ESPER.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.ESPER.placement_eligible, true);
assert.equal(identityLayers.expressions.ESPER.preview_eligible, false);
assert.ok(factions.GRIXIS, "Generated factions should include GRIXIS.");
assert.ok(placementModel.factions.GRIXIS, "Generated placement model should include GRIXIS.");
assert.match(factionContextText, /"GRIXIS": \{/);
assert.equal(factions.GRIXIS.institution_type, "shard");
assert.equal(placementModel.factions.GRIXIS.institution_type, "shard");
assert.deepEqual(factions.GRIXIS.colors, ["U", "B", "R"]);
assert.deepEqual(placementModel.factions.GRIXIS.colors, ["U", "B", "R"]);
assert.deepEqual(placementModel.factions.GRIXIS.lateral_inhibition_targets, ["BANT", "BR", "ESPER", "UB", "UR", "JUND"]);
assert.equal(factions.GRIXIS.identity.expression_key, "GRIXIS");
assert.equal(factions.GRIXIS.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.GRIXIS.placement_eligible, true);
assert.equal(identityLayers.expressions.GRIXIS.preview_eligible, false);
assert.ok(factions.JUND, "Generated factions should include JUND.");
assert.ok(placementModel.factions.JUND, "Generated placement model should include JUND.");
assert.match(factionContextText, /"JUND": \{/);
assert.equal(factions.JUND.institution_type, "shard");
assert.equal(placementModel.factions.JUND.institution_type, "shard");
assert.deepEqual(factions.JUND.colors, ["B", "R", "G"]);
assert.deepEqual(placementModel.factions.JUND.colors, ["B", "R", "G"]);
assert.deepEqual(placementModel.factions.JUND.lateral_inhibition_targets, ["BR", "BG", "RG", "GRIXIS", "WITHERBLOOM"]);
["BR", "BG", "RG", "GRIXIS", "WITHERBLOOM"].forEach((key) => {
  assert.ok(
    placementModel.factions[key].lateral_inhibition_targets.includes("JUND"),
    `${key} should reciprocally inhibit JUND`
  );
});
assert.equal(factions.JUND.identity.expression_key, "JUND");
assert.equal(factions.JUND.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.JUND.placement_eligible, true);
assert.equal(identityLayers.expressions.JUND.preview_eligible, false);
assert.ok(factions.NAYA, "Generated factions should include NAYA.");
assert.ok(placementModel.factions.NAYA, "Generated placement model should include NAYA.");
assert.match(factionContextText, /"NAYA": \{/);
assert.equal(factions.NAYA.institution_type, "shard");
assert.equal(placementModel.factions.NAYA.institution_type, "shard");
assert.deepEqual(factions.NAYA.colors, ["R", "G", "W"]);
assert.deepEqual(placementModel.factions.NAYA.colors, ["R", "G", "W"]);
assert.deepEqual(placementModel.factions.NAYA.lateral_inhibition_targets, ["WG", "RG", "WR", "BANT", "JUND"]);
assert.equal(factions.NAYA.identity.expression_key, "NAYA");
assert.equal(factions.NAYA.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.NAYA.placement_eligible, true);
assert.equal(identityLayers.expressions.NAYA.preview_eligible, false);
assert.equal(factions.NAYA.commander_compass?.review_status, "support_only_live_pilot_curation");
assert.ok((factions.NAYA.commander_compass?.native_fit_commanders || []).length >= 3);
assert.ok(!factionKeys.includes("WUB"), "Generated faction keys should not include WUB.");
assert.ok(!modelFactionKeys.includes("WUB"), "Generated model keys should not include WUB.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "WUB"), "Identity registry should not expose WUB as an expression key.");
assert.ok(!factionKeys.includes("WUG"), "Generated faction keys should not include WUG.");
assert.ok(!modelFactionKeys.includes("WUG"), "Generated model keys should not include WUG.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "WUG"), "Identity registry should not expose WUG as an expression key.");
assert.ok(!factionKeys.includes("UBR"), "Generated faction keys should not include UBR.");
assert.ok(!modelFactionKeys.includes("UBR"), "Generated model keys should not include UBR.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "UBR"), "Identity registry should not expose UBR as an expression key.");
assert.ok(!factionKeys.includes("BRG"), "Generated faction keys should not include BRG.");
assert.ok(!modelFactionKeys.includes("BRG"), "Generated model keys should not include BRG.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "BRG"), "Identity registry should not expose BRG as an expression key.");
assert.ok(!factionKeys.includes("RGW"), "Generated faction keys should not include RGW.");
assert.ok(!modelFactionKeys.includes("RGW"), "Generated model keys should not include RGW.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "RGW"), "Identity registry should not expose RGW as an expression key.");
assert.ok(!factionKeys.includes("GRW"), "Generated faction keys should not include GRW.");
assert.ok(!modelFactionKeys.includes("GRW"), "Generated model keys should not include GRW.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "GRW"), "Identity registry should not expose GRW as an expression key.");
assert.ok(!factionKeys.includes("WRG"), "Generated faction keys should not include WRG.");
assert.ok(!modelFactionKeys.includes("WRG"), "Generated model keys should not include WRG.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "WRG"), "Identity registry should not expose WRG as an expression key.");
const runtimeArtifactTextForAliasScan = (JSON.stringify({ factions, placementModel }) + factionContextText)
  .replace(/colors=WUG/g, "colors=");
assert.doesNotMatch(
  runtimeArtifactTextForAliasScan,
  /\bWUG\b/,
  "Generated runtime artifacts should not expose WUG outside explicit query metadata and negative test assertions."
);
const builderSource = await readFile(new URL("../../research/build-faction-artifacts.mjs", import.meta.url), "utf8");
assert.doesNotMatch(builderSource, /bant:\s*["']WUG["']/, "RAW_TO_KEY must not target WUG for Bant.");
assert.match(builderSource, /esper:\s*["']ESPER["']/, "RAW_TO_KEY should target ESPER for Esper.");
assert.doesNotMatch(builderSource, /wub:\s*["']WUB["']/i, "RAW_TO_KEY must not target WUB for Esper.");
assert.match(builderSource, /grixis:\s*["']GRIXIS["']/, "RAW_TO_KEY should target GRIXIS for Grixis.");
assert.doesNotMatch(builderSource, /ubr:\s*["']UBR["']/i, "RAW_TO_KEY must not target UBR for Grixis.");
assert.match(builderSource, /jund:\s*["']JUND["']/, "RAW_TO_KEY should target JUND for Jund.");
assert.doesNotMatch(builderSource, /brg:\s*["']BRG["']/i, "RAW_TO_KEY must not target BRG for Jund.");
assert.match(builderSource, /naya:\s*["']NAYA["']/, "RAW_TO_KEY should target NAYA for Naya.");
assert.doesNotMatch(builderSource, /rgw:\s*["']RGW["']/i, "RAW_TO_KEY must not target RGW for Naya.");

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
  [factions.ESPER, "https://edhrec.com/commanders/esper", "https://mtgdecks.net/Commander/esper-commanders"],
  [factions.GRIXIS, "https://edhrec.com/commanders/grixis", "https://mtgdecks.net/Commander/grixis-commanders"],
  [factions.JUND, "https://edhrec.com/commanders/jund", "https://mtgdecks.net/Commander/jund-commanders"],
  [factions.NAYA, "https://edhrec.com/commanders/naya", "https://mtgdecks.net/Commander/naya-commanders"],
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
assert.match(packageLinks.maze[0].operatorQuery, /^id=wu is:commander f:commander$/);
packageLinks.maze.slice(1).forEach((link) => {
  assert.match(link.operatorQuery, /^id<=wu /, `${link.pathType} should stay within WU support identity`);
});

[
  ["BANT", "wug"],
  ["ESPER", "wub"],
  ["GRIXIS", "ubr"],
  ["JUND", "brg"],
  ["NAYA", "rgw"],
].forEach(([key, identity]) => {
  const shardPackageLinks = buildCommanderPackageLinks(factions[key]);
  assert.match(shardPackageLinks.maze[0].operatorQuery, new RegExp(`^id=${identity} is:commander f:commander$`));
  assert.doesNotMatch(shardPackageLinks.maze[0].operatorQuery, new RegExp(`^id<=${identity}\\b`));
  shardPackageLinks.maze.slice(1).forEach((link) => {
    assert.match(link.operatorQuery, new RegExp(`^id<=${identity} `), `${key} ${link.pathType} should keep id<=${identity} for support and 99 cards`);
  });
});

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

const bantGuidance = getCommanderFactionGuidance(factions.BANT);
assert.ok(bantGuidance, "expected Bant to have a mature Commander guidance override");
assert.deepEqual(
  bantGuidance.starterSearchTags,
  ["Voltron", "Counters Matter", "Enchantments"],
  "expected Bant starter search tags to be explicit support/search-assist metadata"
);
assert.match(bantGuidance.commanderPlan, /one worthy line of action/);
assert.match(bantGuidance.spellcraftIdentity, /Commander support texture for public trust and refined communal order/);
assert.match(bantGuidance.tableCautionReviewRule, /VM-159A\/VM-168 source limits/);
assert.doesNotMatch(
  [
    bantGuidance.commanderPlan,
    bantGuidance.spellcraftIdentity,
    bantGuidance.tableCautionText,
  ].join(" "),
  /Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion/i
);

const bantPresentation = presentationForFaction(factions.BANT);
assert.equal(bantPresentation.tableRole, "The supported champion");
assert.match(bantPresentation.thesis, /strength that wants to stay answerable/);
assert.match(bantPresentation.thesis, /White sets the public standard, Blue refines the line of action, and Green keeps that line alive/);
assert.match(bantPresentation.mechanics, /Commander support texture, not new lore-canon claims/);
assert.match(bantPresentation.selfCheck, /makes excellence feel accountable to the whole/);
assert.doesNotMatch(
  [
    bantPresentation.thesis,
    bantPresentation.tableExperience,
    bantPresentation.mechanics,
    bantPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUG|generic three-color goodstuff/i
);

const bantHeroNarrative = buildHeroNarrative({
  dossier: { isPrimary: true, targetFactionKey: "BANT" },
  faction: factions.BANT,
  result: { faction: "BANT", adjacent_matches: [{ faction: "WU", confidence: 0.4 }] },
  factions,
});
assert.match(bantHeroNarrative, /Azorius Senate stayed close/);
assert.match(bantHeroNarrative, /one protected champion, refined support, living order, and communal trust/i);
assert.doesNotMatch(bantHeroNarrative, /recognizable Commander table role|playable pattern|personality label|Exact WUG/i);

const bantCommanderLane = buildCommanderStartingLane({
  faction: factions.BANT,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.BANT,
  tagLanes: [{ tagName: "Voltron" }],
});
const bantLaneText = [
  bantCommanderLane.copy,
  ...bantCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(bantCommanderLane.copy, /protects one worthy line of action/);
assert.match(bantLaneText, /Voltron, Counters Matter, Enchantments/);
assert.match(bantLaneText, /Commander support texture for public trust and refined communal order/);
assert.match(bantLaneText, /Protect the line that carries the table's trust/);
assert.doesNotMatch(
  bantLaneText,
  /Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion|playable pattern|personality label|recognizable Commander table role/i
);

const bantHardeningDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "BANT",
    confidence: 0.76,
    decree: "Bant carries one worthy line with public support.",
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
    evidence_trail: [],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const bantHardeningText = renderCommanderDossierText(bantHardeningDossier);
const bantVisibleText = bantHardeningText.replace(/https?:\/\/\S+/g, "");
assert.match(bantHardeningText, /Bant Commander decks/);
assert.match(bantHardeningText, /protects one worthy line of action/i);
assert.match(bantHardeningText, /Commander support texture for public trust and refined communal order/i);
assert.doesNotMatch(
  bantVisibleText,
  /\bWUG\b|Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion|recognizable Commander table role|Commander mechanics that make the faction plan visible|playable pattern|personality label|\/bant\//i,
  "expected rendered Bant visible text to avoid public WUG labels, route-like Bant paths, fallback copy, and unsupported lore claims"
);
const bantHardeningAudit = auditCommanderDossier(bantHardeningDossier);
assert.ok(
  !bantHardeningAudit.failures.join(" ").includes("Missing Commander guidance"),
  "expected Bant dossier audit not to report missing Commander guidance"
);

const esperGuidance = getCommanderFactionGuidance(factions.ESPER);
assert.ok(esperGuidance, "expected Esper to have a mature Commander guidance override");
assert.deepEqual(esperGuidance.starterSearchTags, ["Control", "Artifacts", "Enchantments"]);
assert.match(esperGuidance.commanderPlan, /turns knowledge into a controlled future/);
assert.match(esperGuidance.spellcraftIdentity, /planned refinement and controlled change/);
assert.doesNotMatch(
  [
    esperGuidance.commanderPlan,
    esperGuidance.spellcraftIdentity,
    esperGuidance.tableCautionText,
  ].join(" "),
  /Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri/i
);

const esperPresentation = presentationForFaction(factions.ESPER);
assert.equal(esperPresentation.tableRole, "The system refiner");
assert.match(esperPresentation.thesis, /Blue looks for the pattern, White gives improvement a structure, and Black makes information useful enough to control the outcome/);
assert.match(esperPresentation.mechanics, /Commander support texture for planned refinement and controlled change/);
assert.doesNotMatch(
  [
    esperPresentation.thesis,
    esperPresentation.tableExperience,
    esperPresentation.mechanics,
    esperPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri/i
);

const esperCommanderLane = buildCommanderStartingLane({
  faction: factions.ESPER,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.ESPER,
  tagLanes: [{ tagName: "Control" }],
});
const esperLaneText = [
  esperCommanderLane.copy,
  ...esperCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(esperCommanderLane.copy, /turns knowledge into a controlled future/);
assert.match(esperLaneText, /Control, Artifacts, Enchantments/);
assert.match(esperLaneText, /planned refinement and controlled change/);
assert.doesNotMatch(
  esperLaneText,
  /Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Carmot|Sangrite|Noble Work|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri|\/esper\//i
);

const esperHardeningDossier = buildCommanderDossier({
  factions,
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
    evidence_trail: [],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const esperHardeningText = renderCommanderDossierText(esperHardeningDossier);
const esperVisibleText = esperHardeningText.replace(/https?:\/\/\S+/g, "");
assert.match(esperHardeningText, /Esper Commander decks/);
assert.match(esperHardeningText, /turns knowledge into a controlled future/i);
assert.match(esperHardeningText, /planned refinement and controlled change/i);
assert.doesNotMatch(
  esperVisibleText,
  /\bWUB\b|Exact WUB|generic WUB|generic three-color goodstuff|artifact deck as canon|Azorius-only|Dimir-only|Orzhov-only|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Carmot|Sangrite|Noble Work|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri|\/esper\//i,
  "expected rendered Esper visible text to avoid public WUB labels, route-like Esper paths, implementation caveats, and unsupported lore"
);

const grixisPresentation = presentationForFaction(factions.GRIXIS);
assert.match(grixisPresentation.thesis, /Black keeps the self alive, Blue finds the leverage, and Red moves/);
assert.match(grixisPresentation.loreRole, /source-grounded Black-centered survival/);
assert.match(grixisPresentation.mechanics, /Commander support texture, not lore-canon proof or the whole identity/);
assert.doesNotMatch(
  [
    grixisPresentation.thesis,
    grixisPresentation.tableExperience,
    grixisPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i
);
const grixisCommanderLane = buildCommanderStartingLane({
  faction: factions.GRIXIS,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.GRIXIS,
  tagLanes: [{ tagName: "Control" }],
});
const grixisLaneText = [
  grixisCommanderLane.copy,
  ...grixisCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(grixisLaneText, /survives first, studies the weakness/);
assert.match(grixisLaneText, /Control, Spellslinger, Aristocrats/);
assert.match(grixisLaneText, /Commander support texture for survival, calculation, and urgency/);
assert.doesNotMatch(
  grixisLaneText,
  /VM-166|raw claims beyond|manual-review material|playable pattern|personality label|recognizable Commander table role|Exact UBR|UBR Commander decks/i
);

const jundPresentation = presentationForFaction(factions.JUND);
assert.match(jundPresentation.thesis, /The blood knows before the mind can bargain/);
assert.match(jundPresentation.thesis, /Red supplies self-truth and action/);
assert.equal(jundPresentation.forkQuestion, "What instinct is worth feeding?");
assert.match(jundPresentation.tableExperience, /pressure becoming visible/i);
assert.match(jundPresentation.mechanics, /mechanical echoes, not lore-canon examples/i);
assert.doesNotMatch(
  [
    jundPresentation.thesis,
    jundPresentation.tableExperience,
    jundPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i
);
const jundHeroNarrative = buildHeroNarrative({
  dossier: { isPrimary: true, targetFactionKey: "JUND" },
  faction: factions.JUND,
  result: { faction: "JUND", adjacent_matches: [{ faction: "RG", confidence: 0.4 }] },
  factions,
});
assert.match(jundHeroNarrative, /Gruul.*stayed close/);
assert.match(jundHeroNarrative, /pressure becoming visible/);
assert.doesNotMatch(jundHeroNarrative, /recognizable Commander table role|playable pattern|personality label/i);

const jundCommanderLane = buildCommanderStartingLane({
  faction: factions.JUND,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.JUND,
  tagLanes: [{ tagName: "Sacrifice" }],
});
const jundLaneText = [
  jundCommanderLane.copy,
  ...jundCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(jundCommanderLane.copy, /pressure sets the clock, sacrifice pays the cost, attrition narrows the table, and drain turns appetite into consequence/);
assert.match(jundLaneText, /Midrange, Aggro, Counters Matter/);
assert.match(jundLaneText, /mechanical echoes of appetite, survival, and consequence/);
assert.match(jundLaneText, /Commander support texture, not lore-canon proof/);
assert.doesNotMatch(jundLaneText, /VM-179|raw claims beyond|manual-review material/);
assert.match(jundLaneText, /Wait for the table to spend its answers, hold interaction, and rebuild before committing your last engine/);
assert.doesNotMatch(jundLaneText, /Exact BRG|playable pattern|personality label|recognizable Commander table role/i);

const nayaPresentation = presentationForFaction(factions.NAYA);
assert.match(nayaPresentation.thesis, /life becoming relation before it becomes force/i);
assert.match(nayaPresentation.tableExperience, /grow mana, guard the living whole, build a protected board/i);
assert.match(nayaPresentation.mechanics, /support-only ways to show abundance, instinct, and creature-forward scale/i);
assert.doesNotMatch(
  [
    nayaPresentation.thesis,
    nayaPresentation.tableExperience,
    nayaPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|appetite|Exact RGW|generic RGW goodstuff/i
);

const nayaCommanderLane = buildCommanderStartingLane({
  faction: factions.NAYA,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.NAYA,
  tagLanes: [{ tagName: "Ramp" }],
});
const nayaLaneText = [
  nayaCommanderLane.copy,
  ...nayaCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(nayaLaneText, /can grow mana into a protected board/);
assert.match(nayaLaneText, /Ramp, Big Mana, Tokens/);
assert.match(nayaLaneText, /guard the living whole/);
assert.doesNotMatch(
  nayaLaneText,
  /sacrifice small pieces|drain the table|attrition into a clock|appetite|Exact RGW|BRG|Spellslinger|generic RGW goodstuff|generic big-creature-only/i
);

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
["BANT", "ESPER", "GRIXIS", "NAYA", "LOREHOLD", "SILVERQUILL", "WB", "WG"].forEach((key) => {
  assert.ok(selected.has(key), `${key} must be reachable by golden-path evidence.`);
});

const bantGolden = goldenResults.find((result) => result.faction === "BANT");
assert.ok(bantGolden, "BANT golden path should be present.");
assert.equal(bantGolden.identity.expression_key, "BANT");
assert.equal(bantGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[bantGolden.faction].colors, ["W", "U", "G"]);
assert.ok(
  bantGolden.evidence_trail.some((entry) => entry.question_id === "hall_BANT_champion"),
  "BANT golden path should use supported-champion evidence."
);
assert.ok(
  bantGolden.evidence_trail.some((entry) => entry.question_id === "hall_BANT_living_order"),
  "BANT golden path should use living-order evidence."
);

const esperGolden = goldenResults.find((result) => result.faction === "ESPER");
assert.ok(esperGolden, "ESPER golden path should be present.");
assert.equal(esperGolden.identity.expression_key, "ESPER");
assert.equal(esperGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[esperGolden.faction].colors, ["W", "U", "B"]);
assert.ok(
  esperGolden.evidence_trail.some((entry) => entry.question_id === "hall_ESPER_perfectibility"),
  "ESPER golden path should use perfectibility evidence."
);
assert.ok(
  esperGolden.evidence_trail.some((entry) => entry.question_id === "hall_ESPER_designed_control"),
  "ESPER golden path should use designed-control evidence."
);
assert.ok(
  placementModel.factions.ESPER.collision_guidance.every((entry) => entry.against),
  "ESPER collision guidance should not emit null targets."
);

const grixisGolden = goldenResults.find((result) => result.faction === "GRIXIS");
assert.ok(grixisGolden, "GRIXIS golden path should be present.");
assert.equal(grixisGolden.identity.expression_key, "GRIXIS");
assert.equal(grixisGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[grixisGolden.faction].colors, ["U", "B", "R"]);
assert.ok(
  grixisGolden.evidence_trail.some((entry) => entry.question_id === "hall_GRIXIS_survival_opening"),
  "GRIXIS golden path should use survival-opening evidence."
);
assert.ok(
  grixisGolden.evidence_trail.some((entry) => entry.question_id === "hall_GRIXIS_volatile_calculation"),
  "GRIXIS golden path should use volatile-calculation evidence."
);
const jundGolden = goldenResults.find((result) => result.faction === "JUND");
assert.ok(jundGolden, "JUND golden path should be present.");
assert.equal(jundGolden.identity.expression_key, "JUND");
assert.equal(jundGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[jundGolden.faction].colors, ["B", "R", "G"]);
assert.ok(
  jundGolden.evidence_trail.some((entry) => entry.question_id === "hall_JUND_instinct_pressure"),
  "JUND golden path should use instinct-pressure evidence."
);
assert.ok(
  jundGolden.evidence_trail.some((entry) => entry.question_id === "hall_JUND_appetite_consequence"),
  "JUND golden path should use appetite-consequence evidence."
);
const nayaGolden = goldenResults.find((result) => result.faction === "NAYA");
assert.ok(nayaGolden, "NAYA golden path should be present.");
assert.equal(nayaGolden.identity.expression_key, "NAYA");
assert.equal(nayaGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[nayaGolden.faction].colors, ["R", "G", "W"]);
assert.ok(
  nayaGolden.evidence_trail.some((entry) => entry.question_id === "hall_NAYA_living_whole"),
  "NAYA golden path should use living-whole evidence."
);
assert.ok(
  nayaGolden.evidence_trail.some((entry) => entry.question_id === "hall_NAYA_abundance_instinct"),
  "NAYA golden path should use abundance-instinct evidence."
);

const bantOverlap = runScriptedReading({
  gate_pressure_trust: "A process that binds everyone",
  gate_power_shape: "Power that is accountable",
  gate_attention_pattern: "The precedent",
  gate_belonging_cost: "Belonging to something larger",
  hall_BANT_champion: "Public trust and support",
  hall_BANT_living_order: "Duty held by living community",
}).result;
assertValidPlacement(bantOverlap);
assert.equal(bantOverlap.faction, "BANT", "Bant synthesis should beat Azorius/Selesnya/Simic overlap.");
const overlapEvidenceTargets = new Set(
  bantOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WU", "WG", "UG"].some((key) => overlapEvidenceTargets.has(key)), "Overlap path should include live neighbor evidence.");

const esperOverlap = runScriptedReading({
  gate_pressure_trust: "Information advantage",
  gate_power_shape: "Power that transforms",
  gate_attention_pattern: "The leverage",
  gate_belonging_cost: "A durable legacy",
  hall_ESPER_perfectibility: "Understand, then refine",
  hall_ESPER_designed_control: "Make every piece serve the design",
}).result;
assertValidPlacement(esperOverlap);
assert.equal(esperOverlap.faction, "ESPER", "Esper synthesis should beat Azorius/Dimir/Orzhov overlap.");
const esperEvidenceTargets = new Set(
  esperOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WU", "UB", "WB"].some((key) => esperEvidenceTargets.has(key)), "Esper overlap path should include live neighbor evidence.");

const grixisOverlap = runScriptedReading({
  gate_pressure_trust: "The first honest motion",
  gate_power_shape: "Power that ignites action",
  gate_attention_pattern: "The leverage",
  gate_belonging_cost: "A place that uses what others discard",
  hall_GRIXIS_survival_opening: "Find the weakness and take it",
  hall_GRIXIS_volatile_calculation: "Calculation aimed at survival",
}).result;
assertValidPlacement(grixisOverlap);
assert.equal(grixisOverlap.faction, "GRIXIS", "Grixis synthesis should beat Dimir/Rakdos/Izzet/Esper/Bant overlap.");
const grixisEvidenceTargets = new Set(
  grixisOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["UB", "UR", "BR"].some((key) => grixisEvidenceTargets.has(key)), "Grixis overlap path should include live neighbor evidence.");

const jundOverlap = runScriptedReading({
  gate_pressure_trust: "A bold release of force",
  gate_power_shape: "Power that ignites action",
  gate_attention_pattern: "The wound",
  gate_belonging_cost: "A place that uses what others discard",
  hall_JUND_instinct_pressure: "Trust the gut and move",
  hall_JUND_appetite_consequence: "Feed it and own the cost",
}).result;
assertValidPlacement(jundOverlap);
assert.equal(jundOverlap.faction, "JUND", "Jund synthesis should beat Rakdos/Golgari/Gruul/Grixis/Witherbloom overlap.");
const jundEvidenceTargets = new Set(
  jundOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["BR", "BG", "RG"].some((key) => jundEvidenceTargets.has(key)), "Jund overlap path should include live neighbor evidence.");

const nayaOverlap = runScriptedReading({
  gate_pressure_trust: "A living system response",
  gate_power_shape: "Power that grows from roots",
  gate_attention_pattern: "The natural role",
  gate_belonging_cost: "Belonging to something larger",
  hall_NAYA_living_whole: "Protect the living whole",
  hall_NAYA_abundance_instinct: "When growth belongs",
}).result;
assertValidPlacement(nayaOverlap);
assert.equal(nayaOverlap.faction, "NAYA", "Naya synthesis should beat Selesnya/Gruul/Boros/Bant/Jund overlap.");
const nayaEvidenceTargets = new Set(
  nayaOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WG", "RG", "WR"].some((key) => nayaEvidenceTargets.has(key)), "Naya overlap path should include live neighbor evidence.");

const nayaStyleInstinct = runScriptedReading({
  gate_pressure_trust: "A bold release of force",
  gate_power_shape: "Power that grows from roots",
  gate_attention_pattern: "The wound",
  gate_belonging_cost: "A place to grow as you are",
  hall_G_growth: "Break the fence",
  hall_RG_wild: "Stop asking permission",
}).result;
assertValidPlacement(nayaStyleInstinct);
assert.notEqual(nayaStyleInstinct.faction, "BANT", "Bant should not win a Naya-style instinct/aggression path.");
assert.equal(nayaStyleInstinct.faction, "RG");

const azoriusProcedure = runScriptedReading({
  gate_pressure_trust: "A process that binds everyone",
  gate_power_shape: "Power that is accountable",
  gate_attention_pattern: "The precedent",
  gate_belonging_cost: "A durable legacy",
  hall_WU_process: "Follow the process",
}).result;
assertValidPlacement(azoriusProcedure);
assert.notEqual(azoriusProcedure.faction, "ESPER", "Esper should not win an Azorius procedure path.");
assert.ok(["WU", "W"].includes(azoriusProcedure.faction), "Azorius procedure path should stay in White/Azorius space.");

const dimirHiddenLeverage = runScriptedReading({
  gate_pressure_trust: "Information advantage",
  gate_power_shape: "Power that stays unseen",
  gate_attention_pattern: "The leverage",
  hall_UB_information: "Hold it until timing matters",
}).result;
assertValidPlacement(dimirHiddenLeverage);
assert.notEqual(dimirHiddenLeverage.faction, "ESPER", "Esper should not win a Dimir hidden-leverage path.");
assert.ok(["UB", "B"].includes(dimirHiddenLeverage.faction), "Dimir hidden-leverage path should stay in Black/Dimir space.");

const orzhovObligation = runScriptedReading({
  gate_pressure_trust: "Information advantage",
  gate_power_shape: "Power that is earned and owed",
  gate_attention_pattern: "The leverage",
  gate_belonging_cost: "A durable legacy",
  hall_WB_obligation: "A debt that outlasts apology",
}).result;
assertValidPlacement(orzhovObligation);
assert.notEqual(orzhovObligation.faction, "ESPER", "Esper should not win an Orzhov obligation path.");
assert.equal(orzhovObligation.faction, "WB");

const simicStyleAdaptation = runScriptedReading({
  gate_pressure_trust: "A living system response",
  gate_power_shape: "Power that transforms",
  gate_attention_pattern: "The body of the system",
  gate_belonging_cost: "A chance to build and test",
  hall_UG_adaptation: "Adapt the organism",
  hall_WITHERBLOOM_essence: "The improved organism",
}).result;
assertValidPlacement(simicStyleAdaptation);
assert.notEqual(simicStyleAdaptation.faction, "BANT", "Bant should not win Simic adaptation without order, duty, or honor.");
assert.equal(simicStyleAdaptation.faction, "UG");

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
  whiteGolden.adjacent_matches.some((match) => ["WU", "WR", "WG", "LOREHOLD", "BANT"].includes(match.faction)),
  "White should keep at least one white-centered adjacent expression nearby."
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
const whiteMazePaths = buildPersonalizedMazePaths({
  faction: factions.W,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  whiteMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes", "weird-stretch-commanders"]
);
assert.equal(new Set(whiteMazePaths.map((path) => path.operatorQuery)).size, 4);
assert.equal(new Set(whiteMazePaths.map((path) => path.plainReadingQuery)).size, 4);
assert.match(whiteMazePaths[0].operatorQuery, /^id=w is:commander f:commander /);
assert.match(whiteMazePaths[1].operatorQuery, /^id<=w f:commander -is:commander -t:land /);
assert.match(whiteMazePaths[2].operatorQuery, /^id<=w f:commander \(ft:/);
assert.match(whiteMazePaths[3].operatorQuery, /^-id<=w is:commander f:commander /);
assert.ok(whiteMazePaths.every((path) => !/\b(?:id|ci|o|ft|t|is):/i.test(path.plainReadingQuery)));

const grixisMazePaths = buildPersonalizedMazePaths({
  faction: factions.GRIXIS,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  grixisMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(grixisMazePaths[0].operatorQuery, /^id=ubr is:commander f:commander /);
assert.equal(grixisMazePaths[0].plainReadingQuery, "Grixis commanders with exactly blue-black-red identity");
assert.match(grixisMazePaths[1].operatorQuery, /^id<=ubr f:commander -is:commander -t:land /);
assert.match(grixisMazePaths[2].operatorQuery, /^id<=ubr f:commander \(ft:/);
assert.ok(!grixisMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(grixisMazePaths.every((path) => !/commander identity commander candidates/i.test(path.plainReadingQuery)));

const jundMazePaths = buildPersonalizedMazePaths({
  faction: factions.JUND,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  jundMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(jundMazePaths[0].operatorQuery, /^id=brg is:commander f:commander /);
assert.equal(jundMazePaths[0].plainReadingQuery, "Jund commanders with exactly black-red-green identity");
assert.match(jundMazePaths[1].operatorQuery, /^id<=brg f:commander -is:commander -t:land /);
assert.match(jundMazePaths[2].operatorQuery, /^id<=brg f:commander \(ft:/);
assert.ok(!jundMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(jundMazePaths.every((path) => !/id=ur|id<=ur|Exact BRG/i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const nayaMazePaths = buildPersonalizedMazePaths({
  faction: factions.NAYA,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  nayaMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(nayaMazePaths[0].operatorQuery, /^id=rgw is:commander f:commander /);
assert.equal(nayaMazePaths[0].plainReadingQuery, "Naya commanders with exactly red-green-white identity");
assert.match(nayaMazePaths[1].operatorQuery, /^id<=rgw f:commander -is:commander -t:land /);
assert.match(nayaMazePaths[2].operatorQuery, /^id<=rgw f:commander \(ft:/);
assert.ok(!nayaMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(nayaMazePaths.every((path) => !/id=brg|id<=brg|Exact RGW|\/naya\/|\/rgw\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

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

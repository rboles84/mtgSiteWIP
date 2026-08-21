import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildCommanderStarterCards,
  buildPreconRecommendations,
  selectPreconPreviewRecommendations,
} from "../assets/js/archscry/commander-dossier.js";
import { normalizeArchscryMediaKey } from "./archscry-media-projection-core.mjs";

globalThis.VM_SESSION = globalThis.VM_SESSION || {};
const {
  addUsageCards,
  canonicalUsageCardId,
  factionCardRationaleRecords,
  filterPreconRecommendationsForEditorialCards,
  filterStarterCardsForUsage,
  selectApprovedCardRationales,
  selectApprovedCardVoices,
} = await import("../assets/js/archscry/runtime/content.js");
const { APP_STATE } = await import("../assets/js/archscry/runtime/state.js");
const { normalizeCardName } = await import("../assets/js/archscry/runtime/render-utils.js");

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LEDGER_PATH = join(ROOT, "docs", "audits", "vm574-card-signals", "final-ledger.json");
const WRITE_LEDGER = process.argv.includes("--write-ledger");
const EXPECTED_IDENTITIES = 37;
const EXPECTED_GROUPS = ["creatures", "spells", "permanents"];
const EXPECTED_GROUP_COUNT = 3;
const BAD_RAW_LAYOUTS = new Set([
  "art_series",
  "token",
  "emblem",
  "oversized",
  "memorabilia",
  "planar",
  "scheme",
  "vanguard",
]);
const MANA_FIXING_NAMES = /\b(arcane signet|command tower|war room|sol ring|fellwar stone|chromatic lantern|commander's sphere|coalition relic|mind stone|thought vessel|wayfarer's bauble|signet|talisman)\b/i;
const PRIMARY_MANA_TEXT = /\b(add (one |two |three |that much |\{)|create(?:s)? (?:a |two |three |that many )?treasure token|search your library for (?:a|up to|two|three) basic land|put (?:a|up to|two|three).* land card.* battlefield|spells? you cast cost .* less|untap all lands|untap each land)\b/i;

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function normalizedTypeLine(record = {}) {
  return [
    record.type_line,
    ...(record.card_faces || []).map((face) => face.type_line),
  ].filter(Boolean).join(" // ");
}

function playableRawCard(card = {}) {
  if (card.object !== "card") return false;
  if (BAD_RAW_LAYOUTS.has(card.layout)) return false;
  if (card.legalities?.commander === "not_legal") return false;
  return true;
}

function buildRawLookup(rawCards = []) {
  const byKey = new Map();
  const byOracleId = new Map();
  for (const card of rawCards) {
    if (!playableRawCard(card)) continue;
    if (card.oracle_id) byOracleId.set(card.oracle_id, card);
    const names = [card.name, ...(card.card_faces || []).map((face) => face.name)].filter(Boolean);
    for (const name of names) {
      const key = normalizeArchscryMediaKey(name);
      if (!key) continue;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(card);
    }
  }
  return { byKey, byOracleId };
}

function rawFallbackRecord(name, rawLookup) {
  const key = normalizeArchscryMediaKey(name);
  const candidates = rawLookup.byKey.get(key) || [];
  const exactNameCandidates = candidates.filter((card) => normalizeArchscryMediaKey(card.name) === key);
  const oracleCandidates = exactNameCandidates.length ? exactNameCandidates : candidates;
  const oracleIds = [...new Set(oracleCandidates.map((card) => card.oracle_id || card.id))].sort();
  if (oracleIds.length !== 1) {
    return {
      unresolved: true,
      reason: oracleIds.length ? "ambiguous_raw_oracle_identity" : "missing_raw_oracle_identity",
      oracleIds,
    };
  }
  const card = oracleCandidates
    .filter((candidate) => (candidate.oracle_id || candidate.id) === oracleIds[0])
    .sort((left, right) => String(left.id).localeCompare(String(right.id)))[0];
  return {
    resolver_key: key,
    raw_authored_names: [name],
    canonical_name: card.name,
    oracle_id: card.oracle_id || "",
    scryfall_id: card.id || "",
    layout: card.layout || "normal",
    selected_face_name: (card.card_faces || []).find((face) => normalizeArchscryMediaKey(face.name) === key)?.name || "",
    type_line: card.type_line || "",
    mana_cost: card.mana_cost || "",
    oracle_excerpt: String(card.oracle_text || "").replace(/\s+/g, " ").trim().slice(0, 240),
    color_identity: [...(card.color_identity || [])],
    legalities: card.legalities ? { commander: String(card.legalities.commander || "") } : {},
    scryfall_uri: card.scryfall_uri || "",
    image_uris: card.image_uris || {},
    card_faces: (card.card_faces || []).map((face) => ({
      name: face.name || "",
      type_line: face.type_line || "",
      mana_cost: face.mana_cost || "",
      oracle_excerpt: String(face.oracle_text || "").replace(/\s+/g, " ").trim().slice(0, 240),
      image_uris: face.image_uris || {},
    })),
    image_candidates: [],
    occurrence_count: 0,
    fallback_route: "data/scryfall/raw/oracle-cards.json playable fallback",
  };
}

function fullOracleText(record = {}, rawLookup) {
  const raw = record.oracle_id ? rawLookup.byOracleId.get(record.oracle_id) : null;
  return [
    raw?.oracle_text,
    ...(raw?.card_faces || []).map((face) => face.oracle_text),
    record.oracle_excerpt,
    ...(record.card_faces || []).map((face) => face.oracle_excerpt),
  ].filter(Boolean).join(" ");
}

function expectedTypeCheck(group, typeLine) {
  if (group === "creatures") return /\bCreature\b/.test(typeLine);
  if (group === "spells") return /\b(Instant|Sorcery)\b/.test(typeLine);
  if (group === "permanents") return /\b(Artifact|Enchantment)\b/.test(typeLine);
  return false;
}

function teachingDimension(group) {
  if (group === "creatures") return "board role and pilot identity";
  if (group === "spells") return "decision texture and interaction timing";
  return "engine, rule, or table-shape texture";
}

function recordsByName(records = []) {
  const byName = new Map();
  for (const record of records) {
    const names = [
      ...(record.raw_authored_names || []),
      record.canonical_name,
      record.selected_face_name,
      ...(record.card_faces || []).map((face) => face.name),
    ].filter(Boolean);
    for (const name of names) byName.set(normalizeCardName(name), record);
  }
  return byName;
}

function resolveRecord(name, { mediaByResolverKey, rawLookup }) {
  return mediaByResolverKey.get(normalizeArchscryMediaKey(name)) || rawFallbackRecord(name, rawLookup);
}

function indexAppState(mediaIndex, cardRationaleCatalog, cardVoiceCatalog, preconCatalog, factions, mediaByResolverKey, rawLookup) {
  const records = [...(mediaIndex.records || [])];
  for (const faction of Object.values(factions || {})) {
    const starterCards = buildCommanderStarterCards(faction);
    for (const category of EXPECTED_GROUPS) {
      for (const name of starterCards[category] || []) {
        const record = resolveRecord(name, { mediaByResolverKey, rawLookup });
        if (!record.unresolved) records.push(record);
      }
    }
  }
  APP_STATE.cardRationaleCatalog = cardRationaleCatalog;
  APP_STATE.cardVoiceCatalog = cardVoiceCatalog;
  APP_STATE.preconCatalog = preconCatalog;
  APP_STATE.preconThemeTaxonomy = {};
  APP_STATE.scryfallLocalCardByName = recordsByName(records);
}

function pageUsageForFaction(faction, dossierStarterCards) {
  const dossier = {
    faction,
    targetFactionKey: faction.key,
    starterCards: dossierStarterCards,
  };
  const preconRecommendations = buildPreconRecommendations({
    faction,
    dossier,
    readingTagRefs: [],
    starterProfile: {},
    preconCatalog: APP_STATE.preconCatalog,
    preconThemeTaxonomy: APP_STATE.preconThemeTaxonomy,
  });
  const preconCommanderIds = new Set(["nativeExact", "otherExact", "stretch"]
    .flatMap((group) => preconRecommendations[group] || [])
    .map((precon) => canonicalUsageCardId(precon.mainCommander)));
  const editorialCardUsage = new Set();
  const rationaleRecords = factionCardRationaleRecords(faction);
  const nonPreconRationales = rationaleRecords.filter((record) => !preconCommanderIds.has(canonicalUsageCardId(record.card.name)));
  for (const record of nonPreconRationales.length ? nonPreconRationales : rationaleRecords.slice(0, 1)) {
    addUsageCards(editorialCardUsage, [record.card.name]);
  }
  for (const record of (APP_STATE.cardVoiceCatalog?.records || []).filter((entry) => entry.identity_key === faction.key)) {
    addUsageCards(editorialCardUsage, [record.card?.name]);
  }
  const usablePreconRecommendations = filterPreconRecommendationsForEditorialCards(preconRecommendations, editorialCardUsage);
  const preconPreview = selectPreconPreviewRecommendations(usablePreconRecommendations);
  const pageCardUsage = new Set();
  addUsageCards(pageCardUsage, preconPreview.visible.map((precon) => precon.mainCommander));
  const flavorEchoes = selectApprovedCardRationales({ faction, excludedCardIds: pageCardUsage });
  addUsageCards(pageCardUsage, flavorEchoes.map((entry) => entry.card));
  const cardVoices = selectApprovedCardVoices({ faction, excludedCardIds: pageCardUsage });
  addUsageCards(pageCardUsage, cardVoices.map((entry) => entry.card));
  addUsageCards(pageCardUsage, preconPreview.remaining
    .filter((precon) => !pageCardUsage.has(canonicalUsageCardId(precon.mainCommander)))
    .map((precon) => precon.mainCommander));
  return {
    pageCardUsage,
    visibleStarterCards: filterStarterCardsForUsage(dossierStarterCards, pageCardUsage),
  };
}

function collisionStatus(record, pageCardUsage) {
  const id = record.oracle_id || normalizeCardName(record.canonical_name);
  return pageCardUsage.has(id) ? "blocked-by-page-usage" : "clear";
}

function visibleStatus(record, visibleNames) {
  const recordId = record.oracle_id || normalizeCardName(record.canonical_name);
  const visibleIds = new Set(visibleNames.map((name) => {
    const local = APP_STATE.scryfallLocalCardByName.get(normalizeCardName(name));
    return local?.oracle_id || normalizeCardName(name);
  }));
  return visibleIds.has(recordId) ? "visible" : "not-visible";
}

const [
  factionsData,
  mediaIndex,
  rawCards,
  cardRationaleCatalog,
  cardVoiceCatalog,
  preconCatalog,
] = await Promise.all([
  readJson(join(ROOT, "data", "factions.json")),
  readJson(join(ROOT, "data", "scryfall", "indexes", "archscry-media-index.json")),
  readJson(join(ROOT, "data", "scryfall", "raw", "oracle-cards.json")),
  readJson(join(ROOT, "data", "dossier", "card-rationale-catalog.json")),
  readJson(join(ROOT, "data", "dossier", "card-voice-catalog.json")),
  readJson(join(ROOT, "data", "precons", "vox-mana-precon-catalog.json")),
]);

const factions = factionsData.factions || {};
const mediaByResolverKey = new Map((mediaIndex.records || []).map((record) => [record.resolver_key, record]));
const rawLookup = buildRawLookup(rawCards);
indexAppState(mediaIndex, cardRationaleCatalog, cardVoiceCatalog, preconCatalog, factions, mediaByResolverKey, rawLookup);

const ledger = [];
const issues = [];
const aggregate = {
  identities: Object.keys(factions).length,
  categories: Object.fromEntries(EXPECTED_GROUPS.map((group) => [group, 0])),
  visible: Object.fromEntries(EXPECTED_GROUPS.map((group) => [group, 0])),
  unresolved: 0,
  collision_failures: 0,
  wrong_type: 0,
  banned_type: 0,
  color_identity_failures: 0,
  mana_primary: 0,
  duplicate_cards: 0,
  media_missing: 0,
};

for (const identity of Object.keys(factions).sort()) {
  const faction = factions[identity];
  const starterCards = buildCommanderStarterCards(faction);
  const { pageCardUsage, visibleStarterCards } = pageUsageForFaction(faction, starterCards);
  const identitySeen = new Set();

  for (const category of EXPECTED_GROUPS) {
    const names = starterCards[category] || [];
    const cardRows = [];
    const allowedColors = new Set(faction.colors || []);
    aggregate.categories[category] += names.length;
    aggregate.visible[category] += (visibleStarterCards[category] || []).length;
    if (names.length !== EXPECTED_GROUP_COUNT) {
      issues.push(`${identity}/${category} has ${names.length} authored cards`);
    }

    for (const [position, name] of names.entries()) {
      const record = resolveRecord(name, { mediaByResolverKey, rawLookup });
      if (record.unresolved) {
        aggregate.unresolved += 1;
        issues.push(`${identity}/${category}/${position}: ${name} unresolved (${record.reason})`);
        cardRows.push({ name, unresolved: true, reason: record.reason });
        continue;
      }
      const id = record.oracle_id || normalizeCardName(record.canonical_name);
      if (identitySeen.has(id)) {
        aggregate.duplicate_cards += 1;
        issues.push(`${identity}/${category}/${position}: ${name} duplicates another Card Signal in this identity`);
      }
      identitySeen.add(id);
      const typeLine = normalizedTypeLine(record);
      if (!expectedTypeCheck(category, typeLine)) {
        aggregate.wrong_type += 1;
        issues.push(`${identity}/${category}/${position}: ${name} wrong type ${typeLine}`);
      }
      if (/\bLand\b/.test(typeLine)) {
        aggregate.banned_type += 1;
        issues.push(`${identity}/${category}/${position}: ${name} banned type ${typeLine}`);
      }
      const illegalColors = (record.color_identity || []).filter((color) => !allowedColors.has(color));
      if (illegalColors.length) {
        aggregate.color_identity_failures += 1;
        issues.push(`${identity}/${category}/${position}: ${name} has illegal color identity ${record.color_identity.join("")}`);
      }
      if (MANA_FIXING_NAMES.test(name) || PRIMARY_MANA_TEXT.test(fullOracleText(record, rawLookup))) {
        aggregate.mana_primary += 1;
        issues.push(`${identity}/${category}/${position}: ${name} is mana/fixing/ramp primary`);
      }
      if (!record.image_candidates?.length && !record.image_uris?.normal && !record.card_faces?.some((face) => face.image_uris?.normal)) {
        aggregate.media_missing += 1;
        issues.push(`${identity}/${category}/${position}: ${name} has no media candidate`);
      }
      const collision = collisionStatus(record, pageCardUsage);
      const visible = visibleStatus(record, visibleStarterCards[category] || []);
      if (collision !== "clear") {
        aggregate.collision_failures += 1;
        issues.push(`${identity}/${category}/${position}: ${name} collides with earlier page usage`);
      }
      if (visible !== "visible") {
        issues.push(`${identity}/${category}/${position}: ${name} is not visible after usage filtering`);
      }
      cardRows.push({
        name,
        canonical_name: record.canonical_name,
        oracle_id: record.oracle_id,
        scryfall_id: record.scryfall_id,
        type_line: typeLine,
        media_route: record.fallback_route || "data/scryfall/indexes/archscry-media-index.json",
        collision_result: collision,
        visible_result: visible,
      });
    }

    ledger.push({
      identity,
      category,
      final_3_cards: cardRows,
      type: category === "creatures" ? "Creature" : (category === "spells" ? "Instant/Sorcery" : "Artifact/Enchantment"),
      evidence_route: `data/factions.json#/factions/${identity}/staples/${category}`,
      teaching_dimension: teachingDimension(category),
      collision_result: cardRows.every((row) => row.collision_result === "clear") ? "clear" : "blocked",
      visible_result: cardRows.every((row) => row.visible_result === "visible") ? "3/3 visible" : `${cardRows.filter((row) => row.visible_result === "visible").length}/3 visible`,
    });
  }
}

const report = {
  schema_version: "1.0.0",
  task: "VM-574",
  source: "Card Signals coverage, teaching value, mana notes remediation",
  generated_at: new Date().toISOString(),
  aggregate,
  ledger,
  issues,
};

if (WRITE_LEDGER) {
  await mkdir(dirname(LEDGER_PATH), { recursive: true });
  await writeFile(LEDGER_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

assert.equal(aggregate.identities, EXPECTED_IDENTITIES, "must cover all 37 identities");
assert.deepEqual(aggregate.categories, { creatures: 111, spells: 111, permanents: 111 });
assert.deepEqual(aggregate.visible, { creatures: 111, spells: 111, permanents: 111 });
assert.equal(aggregate.unresolved, 0, "all Card Signals must resolve");
assert.equal(aggregate.collision_failures, 0, "Card Signals must not collide with earlier page usage");
assert.equal(aggregate.wrong_type, 0, "Card Signals must match their category type");
assert.equal(aggregate.banned_type, 0, "Card Signals must not be lands");
assert.equal(aggregate.color_identity_failures, 0, "Card Signals must be legal for their identity color set");
assert.equal(aggregate.mana_primary, 0, "Card Signals must not be mana/fixing/ramp primary");
assert.equal(aggregate.duplicate_cards, 0, "Card Signals must not duplicate within an identity");
assert.equal(aggregate.media_missing, 0, "Card Signals must have media");
assert.deepEqual(issues, [], issues.join("\n"));

console.log(`VM-574 Card Signals: PASS (${aggregate.identities} identities, 111/111/111 visible).`);
if (WRITE_LEDGER) console.log(`VM-574 ledger written: ${LEDGER_PATH}`);

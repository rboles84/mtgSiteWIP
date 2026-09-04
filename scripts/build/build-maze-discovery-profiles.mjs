import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, "data", "dossier", "maze-discovery-profiles.source.json");
const DOSSIER_SOURCE_PATH = path.join(ROOT, "data", "dossier", "identity-dossier-content.source.json");
const FACTIONS_PATH = path.join(ROOT, "data", "factions.json");
const CATALOG_PATH = path.join(ROOT, "data", "dossier", "maze-discovery-profiles.catalog.json");
const CHECK = process.argv.includes("--check");

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function canonicalIdentity(colors = []) {
  const symbols = [...new Set(colors.map((color) => String(color).toLowerCase()))];
  if (!symbols.length) return "c";
  const order = ["w", "u", "b", "r", "g"];
  return symbols.sort((left, right) => order.indexOf(left) - order.indexOf(right)).join("");
}

function storyQueryClause(terms = []) {
  const clauses = terms.map((term) => {
    const normalized = String(term).trim();
    return /[^a-z0-9-]/i.test(normalized)
      ? `ft:\"${normalized.replaceAll('"', '')}\"`
      : `ft:${normalized}`;
  });
  return `(${clauses.join(" OR ")})`;
}

function englishList(values = []) {
  if (values.length < 2) return values[0] || "";
  return `${values.slice(0, -1).join(", ")}, or ${values.at(-1)}`;
}

function validateAndProject(source, dossierSource, factionsPayload) {
  invariant(source?.schema_version === "vm547-maze-discovery-profiles-v1", "Unexpected discovery-profile source schema.");
  invariant(source?.status === "OWNER_AUTHORIZED_DISCOVERY_PROJECTION", "Discovery-profile source is not authorized for projection.");
  invariant(Array.isArray(source.records) && source.records.length === 37, "Discovery-profile source must contain exactly 37 records.");

  const dossierByKey = new Map((dossierSource?.records || []).map((record) => [record.identity_key, record]));
  const factionsByKey = new Map(Object.values(factionsPayload?.factions || {}).map((faction) => [faction.key, faction]));
  invariant(dossierByKey.size === 37, "Approved dossier source must contain exactly 37 records.");
  invariant(factionsByKey.size === 37, "Runtime faction registry must contain exactly 37 records.");

  const seenProfiles = new Set();
  const profiles = source.records.map((record) => {
    const key = String(record.identity_key || "").toUpperCase();
    const dossier = dossierByKey.get(key);
    const faction = factionsByKey.get(key);
    invariant(key && !seenProfiles.has(key), `${key || "Unknown"}: duplicate discovery profile.`);
    seenProfiles.add(key);
    invariant(dossier?.disposition === "APPROVED_PUBLIC" && dossier?.validation?.passed === true, `${key}: dossier source is not approved.`);
    invariant(faction, `${key}: missing runtime faction registry entry.`);
    const runtimeIdentity = String(faction.identity?.routing?.color_identity || canonicalIdentity(faction.colors)).toLowerCase();
    invariant(record.color_identity === runtimeIdentity, `${key}: color identity does not match the runtime routing registry.`);
    invariant(Array.isArray(record.mechanical_threads) && record.mechanical_threads.length === 3, `${key}: exactly three mechanical threads are required.`);
    invariant(Array.isArray(record.story_terms) && record.story_terms.length >= 3, `${key}: at least three story terms are required.`);
    invariant(new Set(record.story_terms.map((term) => term.toLowerCase())).size === record.story_terms.length, `${key}: story terms must be unique.`);

    const approvedItems = new Map((dossier.proposed_public_copy?.what_to_look_for || []).map((item) => [item.item_id, item]));
    const seenThreads = new Set();
    const mechanicalThreads = record.mechanical_threads.map((thread) => {
      const queryClause = String(thread.query_clause || "").replace(/\s+AND\s+/gi, " ").replace(/\s+/g, " ").trim();
      invariant(thread.thread_id && !seenThreads.has(thread.thread_id), `${key}: duplicate or empty mechanical thread id.`);
      seenThreads.add(thread.thread_id);
      const approvedItem = approvedItems.get(thread.source_item_id);
      invariant(approvedItem, `${key}/${thread.thread_id}: source item does not resolve in the approved dossier record.`);
      invariant(thread.label && thread.interpretation && queryClause, `${key}/${thread.thread_id}: label, interpretation, and query are required.`);
      invariant(!/\bft:/i.test(queryClause), `${key}/${thread.thread_id}: mechanical threads cannot masquerade as flavor searches.`);
      invariant(/\b(?:o|otag|kw|t|pow|mv|produces):|\b(?:pow|mv)[<>=]/i.test(queryClause), `${key}/${thread.thread_id}: no governed Scryfall concept is present.`);
      const laneOverrides = {};
      for (const lane of ["commander", "support", "stretch"]) {
        const override = thread.lane_overrides?.[lane];
        if (!override) continue;
        invariant(["available", "unavailable"].includes(override.availability), `${key}/${thread.thread_id}/${lane}: invalid lane availability.`);
        const overrideClause = String(override.query_clause || "").replace(/\s+AND\s+/gi, " ").replace(/\s+/g, " ").trim();
        if (override.availability === "unavailable") {
          invariant(override.rationale && !overrideClause, `${key}/${thread.thread_id}/${lane}: unavailable lanes require a rationale and cannot carry a query.`);
        } else {
          invariant(overrideClause, `${key}/${thread.thread_id}/${lane}: available lane overrides require a query.`);
          invariant(!/\bft:/i.test(overrideClause), `${key}/${thread.thread_id}/${lane}: mechanical overrides cannot use flavor text.`);
        }
        laneOverrides[lane] = {
          availability: override.availability,
          ...(overrideClause ? { query_clause: overrideClause } : {}),
          ...(override.label ? { label: override.label } : {}),
          ...(override.interpretation ? { interpretation: override.interpretation } : {}),
          ...(override.rationale ? { rationale: override.rationale } : {}),
        };
      }
      return {
        thread_id: thread.thread_id,
        semantic_kind: "mechanical",
        label: thread.label,
        interpretation: thread.interpretation,
        query_clause: queryClause,
        source_item_id: approvedItem.item_id,
        source_locator: approvedItem.source_locator,
        source_role: approvedItem.source_role,
        ...(Object.keys(laneOverrides).length ? { lane_overrides: laneOverrides } : {}),
      };
    });

    const storyThread = {
      thread_id: "story-vocabulary",
      semantic_kind: "flavor-story",
      label: `Flavor: ${englishList(record.story_terms)}`,
      interpretation: `Search flavor text for ${englishList(record.story_terms)}. This is a story-vocabulary lane, not a mechanical-fit claim.`,
      query_clause: storyQueryClause(record.story_terms),
      source_item_id: "approved-dossier-lore-role",
      source_locator: `data/dossier/identity-dossier-content.source.json#${dossier.record_id}/proposed_public_copy/how_this_plays/lore_role`,
      source_role: "approved_story_vocabulary_projection",
    };
    invariant(/^\(ft:/i.test(storyThread.query_clause) && !/\b(?:o|otag|kw|t):/i.test(storyThread.query_clause), `${key}: flavor thread must use flavor vocabulary only.`);

    const stretchAvailability = record.stretch_availability || "available";
    invariant(["available", "unavailable"].includes(stretchAvailability), `${key}: invalid stretch availability.`);
    invariant(key === "WUBRG" ? stretchAvailability === "unavailable" : stretchAvailability === "available", `${key}: only WUBRG may suppress outside-color stretch.`);
    invariant(key !== "WUBRG" || record.intentional_exception, "WUBRG must explain the unavailable outside-color boundary.");

    return {
      identity_key: key,
      identity_name: dossier.identity_name,
      color_identity: record.color_identity,
      reading_summary: dossier.proposed_public_copy.how_this_plays.mechanical_expression,
      source_record_id: dossier.record_id,
      source_locator: `data/dossier/identity-dossier-content.source.json#${dossier.record_id}`,
      mechanical_threads: mechanicalThreads,
      story_threads: [storyThread],
      stretch: stretchAvailability === "available"
        ? {
            availability: "available",
            interpretation: `These commanders fall outside the original ${dossier.identity_name} color identity but preserve named mechanical parts of the reading.`,
          }
        : {
            availability: "unavailable",
            interpretation: "Five-Color already spans every Commander color identity, so there is no truthful outside-color commander space.",
          },
      ...(record.intentional_exception ? { intentional_exception: record.intentional_exception } : {}),
    };
  });

  invariant(seenProfiles.size === 37, "Discovery profiles must be unique.");
  invariant([...dossierByKey.keys()].every((key) => seenProfiles.has(key)), "Every approved dossier must own a discovery profile.");
  return {
    schema_version: "vm547-maze-discovery-catalog-v1",
    generated_from: "data/dossier/maze-discovery-profiles.source.json",
    authority: {
      meaning_owner: "data/dossier/identity-dossier-content.source.json",
      query_projection_owner: "data/dossier/maze-discovery-profiles.source.json",
      runtime_ai: false,
      ranking: false,
    },
    profiles,
  };
}

const [source, dossierSource, factionsPayload] = await Promise.all([
  readFile(SOURCE_PATH, "utf8").then(JSON.parse),
  readFile(DOSSIER_SOURCE_PATH, "utf8").then(JSON.parse),
  readFile(FACTIONS_PATH, "utf8").then(JSON.parse),
]);
const output = `${JSON.stringify(validateAndProject(source, dossierSource, factionsPayload), null, 2)}\n`;

if (CHECK) {
  const current = await readFile(CATALOG_PATH, "utf8");
  invariant(current.replace(/\r\n/g, "\n") === output, "Maze discovery profile catalog is stale. Run npm run build:maze-discovery-profiles.");
  console.log("Maze discovery profile catalog is current: 37/37 source-valid profiles.");
} else {
  await writeFile(CATALOG_PATH, output, "utf8");
  console.log("Built data/dossier/maze-discovery-profiles.catalog.json from 37 approved discovery profiles.");
}

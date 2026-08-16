import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  buildBasicLandCards,
  buildCommanderLandRecommendations,
  buildCommanderStarterCards,
  collectCommanderPreviewCandidates,
} from "../assets/js/commander-dossier.js";
import { classifyResultArtRecord } from "../assets/js/archscry-presentation.js";

export const ARCHSCRY_MEDIA_SCHEMA_VERSION = "1.0.0";
export const ARCHSCRY_MEDIA_INDEX_FILE = "archscry-media-index.json";
export const ARCHSCRY_MEDIA_MANIFEST_FILE = "archscry-media-manifest.json";
export const ARCHSCRY_MEDIA_UNRESOLVED_FILE = "archscry-media-unresolved.json";

const SURFACE_ORDER = Object.freeze([
  "matrix",
  "sound",
  "play",
  "commander",
  "card-signals",
  "mana-notes",
]);

function compareText(left, right) {
  const a = String(left || "");
  const b = String(right || "");
  return a < b ? -1 : a > b ? 1 : 0;
}

export function normalizeArchscryMediaKey(value = "") {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function stableJsonBytes(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function sha256File(path) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(path);
    stream.on("error", reject);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function pushOccurrence(target, { identityKey, surface, segment, position, rawName, source }) {
  const name = String(rawName || "").trim();
  if (!name) return;
  target.push({
    identity_key: String(identityKey || "").toUpperCase(),
    surface,
    segment,
    position,
    order: position,
    raw_authored_name: name,
    resolver_key: normalizeArchscryMediaKey(name),
    source,
  });
}

function catalogRecordsByIdentity(records = []) {
  const grouped = new Map();
  for (const record of records) {
    const key = String(record?.identity_key || "").toUpperCase();
    if (!key) continue;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(record);
  }
  for (const recordsForIdentity of grouped.values()) {
    recordsForIdentity.sort((left, right) =>
      Number(left.slot || 1) - Number(right.slot || 1) ||
      Number(left.display_priority || 0) - Number(right.display_priority || 0) ||
      compareText(left.card?.name, right.card?.name)
    );
  }
  return grouped;
}

export async function deriveArchscryAuthoredMediaInventory(root) {
  const [factionData, snippets, voiceCatalog, rationaleCatalog, preconCatalog] = await Promise.all([
    readJson(join(root, "data", "factions.json")),
    readJson(join(root, "data", "archscry-flavor-snippets.json")),
    readJson(join(root, "data", "dossier", "card-voice-catalog.json")),
    readJson(join(root, "data", "dossier", "card-rationale-catalog.json")),
    readJson(join(root, "data", "precons", "vox-mana-precon-catalog.json")),
  ]);
  const factions = factionData.factions || {};
  const voicesByIdentity = catalogRecordsByIdentity(voiceCatalog.records);
  const playsByIdentity = catalogRecordsByIdentity(rationaleCatalog.records);
  const occurrences = [];

  for (const identityKey of Object.keys(factions).sort(compareText)) {
    const faction = factions[identityKey];
    const matrix = snippets.snippets?.[identityKey] || [];
    matrix.forEach((snippet, position) => pushOccurrence(occurrences, {
      identityKey,
      surface: "matrix",
      segment: "references",
      position,
      rawName: snippet.card_name,
      source: `data/archscry-flavor-snippets.json#/snippets/${identityKey}/${position}`,
    }));

    (voicesByIdentity.get(identityKey) || []).forEach((record, position) => pushOccurrence(occurrences, {
      identityKey,
      surface: "sound",
      segment: `slot-${record.slot || position + 1}`,
      position,
      rawName: record.card?.name,
      source: `data/dossier/card-voice-catalog.json#${record.relationship_id || position}`,
    }));

    (playsByIdentity.get(identityKey) || []).forEach((record, position) => pushOccurrence(occurrences, {
      identityKey,
      surface: "play",
      segment: "approved",
      position,
      rawName: record.card?.name,
      source: `data/dossier/card-rationale-catalog.json#${record.relationship_id || position}`,
    }));

    collectCommanderPreviewCandidates(faction, { limit: 3 }).forEach((candidate, position) => {
      const classified = classifyResultArtRecord(candidate.name, preconCatalog);
      if (classified.lookupRecordType !== "CARD") return;
      pushOccurrence(occurrences, {
        identityKey,
        surface: "commander",
        segment: "preview",
        position,
        rawName: classified.lookupName,
        source: `data/factions.json#/factions/${identityKey}/commander-preview/${position}`,
      });
    });

    const starterCards = buildCommanderStarterCards(faction);
    for (const segment of ["creatures", "spells", "permanents"]) {
      (starterCards[segment] || []).forEach((name, position) => pushOccurrence(occurrences, {
        identityKey,
        surface: "card-signals",
        segment,
        position,
        rawName: name,
        source: `data/factions.json#/factions/${identityKey}/staples/${segment}/${position}`,
      }));
    }

    const lands = buildCommanderLandRecommendations(faction);
    const manaSegments = {
      basics: buildBasicLandCards(faction.colors || []),
      premium: lands.premium || [],
      midrange: lands.midrange || [],
      budget: lands.budget || [],
      utility: lands.utility || [],
    };
    for (const segment of ["basics", "premium", "midrange", "budget", "utility"]) {
      manaSegments[segment].forEach((name, position) => pushOccurrence(occurrences, {
        identityKey,
        surface: "mana-notes",
        segment,
        position,
        rawName: name,
        source: segment === "basics"
          ? `data/factions.json#/factions/${identityKey}/colors/${position}`
          : `data/factions.json#/factions/${identityKey}/land_base/${segment}/${position}`,
      }));
    }
  }

  occurrences.sort((left, right) =>
    compareText(left.identity_key, right.identity_key) ||
    SURFACE_ORDER.indexOf(left.surface) - SURFACE_ORDER.indexOf(right.surface) ||
    compareText(left.segment, right.segment) ||
    left.position - right.position ||
    compareText(left.raw_authored_name, right.raw_authored_name)
  );

  const checksumRows = occurrences.map(({ identity_key, surface, segment, position, order, raw_authored_name, resolver_key }) => ({
    identity_key,
    surface,
    segment,
    position,
    order,
    raw_authored_name,
    resolver_key,
  }));
  const surfaceCounts = Object.fromEntries(SURFACE_ORDER.map((surface) => [
    surface,
    occurrences.filter((entry) => entry.surface === surface).length,
  ]));
  return {
    occurrences,
    checksum_rows: checksumRows,
    checksum: sha256(JSON.stringify(checksumRows)),
    identity_count: Object.keys(factions).length,
    unique_resolver_key_count: new Set(occurrences.map((entry) => entry.resolver_key)).size,
    surface_counts: surfaceCounts,
  };
}

function selectedImageUris(imageUris = {}) {
  const result = {};
  for (const key of ["small", "normal", "art_crop"]) {
    if (typeof imageUris?.[key] === "string" && /^https:\/\/cards\.scryfall\.io\//i.test(imageUris[key])) {
      result[key] = imageUris[key];
    }
  }
  return result;
}

function selectedFaces(card = {}) {
  return (card.card_faces || []).map((face) => ({
    name: String(face.name || ""),
    type_line: String(face.type_line || ""),
    mana_cost: String(face.mana_cost || ""),
    oracle_excerpt: String(face.oracle_text || "").replace(/\s+/g, " ").trim().slice(0, 240),
    image_uris: selectedImageUris(face.image_uris || {}),
  })).filter((face) => face.name || Object.keys(face.image_uris).length);
}

function candidateList(card, authoredKeys) {
  const faces = selectedFaces(card);
  const matchingFace = faces.find((face) => authoredKeys.has(normalizeArchscryMediaKey(face.name))) || faces[0] || null;
  const ordered = [
    ["card-normal", card.image_uris?.normal, ""],
    ["face-normal", matchingFace?.image_uris?.normal, matchingFace?.name || ""],
    ["card-art-crop", card.image_uris?.art_crop, ""],
    ["face-art-crop", matchingFace?.image_uris?.art_crop, matchingFace?.name || ""],
    ["card-small", card.image_uris?.small, ""],
    ["face-small", matchingFace?.image_uris?.small, matchingFace?.name || ""],
  ];
  const seen = new Set();
  return ordered
    .filter(([, url]) => typeof url === "string" && /^https:\/\/cards\.scryfall\.io\//i.test(url) && !seen.has(url) && seen.add(url))
    .map(([kind, url, faceName]) => ({ kind, url, ...(faceName ? { face_name: faceName } : {}) }));
}

function rawCardsByResolverKey(cards) {
  const byKey = new Map();
  for (const card of cards) {
    if (card.layout === "art_series" || card.legalities?.commander === "not_legal") continue;
    const names = [card.name, ...(card.card_faces || []).map((face) => face.name)].filter(Boolean);
    for (const name of names) {
      const key = normalizeArchscryMediaKey(name);
      if (!key) continue;
      if (!byKey.has(key)) byKey.set(key, new Map());
      byKey.get(key).set(card.oracle_id || card.id, card);
    }
  }
  return byKey;
}

function selectionFingerprint(record) {
  return JSON.stringify({
    oracle_id: record.oracle_id,
    scryfall_id: record.scryfall_id,
    layout: record.layout,
    selected_face_name: record.selected_face_name,
    image_candidates: record.image_candidates,
  });
}

export function buildArchscryMediaArtifacts({
  cards,
  rawManifest,
  rawBulkSha256,
  inventory,
  previousIndex = null,
  acceptSelectionDrift = false,
  ownerAuthorization = "",
} = {}) {
  if (!Array.isArray(cards) || !cards.length) throw new Error("Scryfall oracle card input is empty.");
  if (acceptSelectionDrift && !String(ownerAuthorization || "").trim()) {
    throw new Error("--accept-selection-drift requires explicit --owner-authorization evidence.");
  }
  const byKey = rawCardsByResolverKey(cards);
  const occurrencesByKey = new Map();
  for (const occurrence of inventory.occurrences) {
    if (!occurrencesByKey.has(occurrence.resolver_key)) occurrencesByKey.set(occurrence.resolver_key, []);
    occurrencesByKey.get(occurrence.resolver_key).push(occurrence);
  }

  const records = [];
  const unresolved = [];
  for (const resolverKey of [...occurrencesByKey.keys()].sort(compareText)) {
    const occurrences = occurrencesByKey.get(resolverKey);
    const allCandidates = [...(byKey.get(resolverKey)?.values() || [])];
    const exactNameCandidates = allCandidates.filter((card) => normalizeArchscryMediaKey(card.name) === resolverKey);
    const oracleCandidates = exactNameCandidates.length ? exactNameCandidates : allCandidates;
    const oracleIds = [...new Set(oracleCandidates.map((card) => card.oracle_id || card.id))].sort(compareText);
    if (oracleIds.length !== 1) {
      unresolved.push({
        resolver_key: resolverKey,
        raw_authored_names: [...new Set(occurrences.map((entry) => entry.raw_authored_name))].sort(compareText),
        reason: oracleIds.length ? "ambiguous_oracle_identity" : "missing_oracle_identity",
        oracle_ids: oracleIds,
      });
      continue;
    }
    const card = oracleCandidates
      .filter((candidate) => (candidate.oracle_id || candidate.id) === oracleIds[0])
      .sort((left, right) => compareText(left.id, right.id))[0];
    const authoredKeys = new Set(occurrences.map((entry) => entry.resolver_key));
    const imageCandidates = candidateList(card, authoredKeys);
    if (!imageCandidates.length) {
      unresolved.push({
        resolver_key: resolverKey,
        raw_authored_names: [...new Set(occurrences.map((entry) => entry.raw_authored_name))].sort(compareText),
        reason: "missing_image_candidates",
        oracle_ids: oracleIds,
      });
      continue;
    }
    const faces = selectedFaces(card);
    const selectedFace = faces.find((face) => authoredKeys.has(normalizeArchscryMediaKey(face.name))) || null;
    records.push({
      resolver_key: resolverKey,
      raw_authored_names: [...new Set(occurrences.map((entry) => entry.raw_authored_name))].sort(compareText),
      canonical_name: String(card.name || ""),
      oracle_id: String(card.oracle_id || ""),
      scryfall_id: String(card.id || ""),
      layout: String(card.layout || "normal"),
      selected_face_name: selectedFace?.name || "",
      type_line: String(card.type_line || ""),
      mana_cost: String(card.mana_cost || ""),
      oracle_excerpt: String(card.oracle_text || "").replace(/\s+/g, " ").trim().slice(0, 240),
      color_identity: [...(card.color_identity || [])],
      legalities: card.legalities ? { commander: String(card.legalities.commander || "") } : {},
      scryfall_uri: String(card.scryfall_uri || ""),
      image_uris: selectedImageUris(card.image_uris || {}),
      card_faces: faces,
      image_candidates: imageCandidates,
      occurrence_count: occurrences.length,
    });
  }

  const previousByKey = new Map((previousIndex?.records || []).map((record) => [record.resolver_key, record]));
  const selectionDrift = records.flatMap((record) => {
    const previous = previousByKey.get(record.resolver_key);
    if (!previous || selectionFingerprint(previous) === selectionFingerprint(record)) return [];
    return [{
      resolver_key: record.resolver_key,
      previous: JSON.parse(selectionFingerprint(previous)),
      next: JSON.parse(selectionFingerprint(record)),
    }];
  });
  if (selectionDrift.length && !acceptSelectionDrift) {
    throw new Error(`Unexpected Archscry media selection drift for ${selectionDrift.map((entry) => entry.resolver_key).join(", ")}. Stop for owner review; do not use --accept-selection-drift to clear validation.`);
  }

  const index = {
    schema_version: ARCHSCRY_MEDIA_SCHEMA_VERSION,
    projection_type: "governed-authored-archscry-media",
    records,
  };
  const unresolvedReport = {
    schema_version: ARCHSCRY_MEDIA_SCHEMA_VERSION,
    inventory_sha256: inventory.checksum,
    unresolved_count: unresolved.length,
    records: unresolved,
  };
  const indexBytes = stableJsonBytes(index);
  const manifest = {
    schema_version: ARCHSCRY_MEDIA_SCHEMA_VERSION,
    projection_type: "governed-authored-archscry-media",
    source_bulk: {
      type: String(rawManifest?.type || "oracle_cards"),
      bulk_id: String(rawManifest?.bulk_id || ""),
      updated_at: String(rawManifest?.updated_at || ""),
      sha256: rawBulkSha256,
    },
    inventory: {
      sha256: inventory.checksum,
      identity_count: inventory.identity_count,
      occurrence_count: inventory.occurrences.length,
      unique_resolver_key_count: inventory.unique_resolver_key_count,
      surface_counts: inventory.surface_counts,
    },
    media_index_sha256: sha256(indexBytes),
    resolved_count: records.length,
    unresolved_count: unresolved.length,
    selection_drift_count: selectionDrift.length,
    selection_drift_authorization: selectionDrift.length ? String(ownerAuthorization) : "",
  };
  return {
    index,
    manifest,
    unresolvedReport,
    selectionDrift,
    bytes: {
      [ARCHSCRY_MEDIA_INDEX_FILE]: indexBytes,
      [ARCHSCRY_MEDIA_MANIFEST_FILE]: stableJsonBytes(manifest),
      [ARCHSCRY_MEDIA_UNRESOLVED_FILE]: stableJsonBytes(unresolvedReport),
    },
  };
}

export function validateArchscryMediaArtifacts({ index, manifest, unresolvedReport, inventory, rawBulkSha256 = "", rawManifest = null }) {
  const errors = [];
  if (index?.schema_version !== ARCHSCRY_MEDIA_SCHEMA_VERSION) errors.push("media index schema/version mismatch");
  if (manifest?.schema_version !== ARCHSCRY_MEDIA_SCHEMA_VERSION) errors.push("media manifest schema/version mismatch");
  if (manifest?.inventory?.sha256 !== inventory.checksum) errors.push("authored inventory checksum is stale");
  if (manifest?.inventory?.occurrence_count !== inventory.occurrences.length) errors.push("authored occurrence count mismatch");
  if (manifest?.media_index_sha256 !== sha256(stableJsonBytes(index))) errors.push("media index checksum mismatch");
  if (rawBulkSha256 && manifest?.source_bulk?.sha256 !== rawBulkSha256) errors.push("Scryfall raw bulk checksum mismatch");
  if (rawManifest?.bulk_id && manifest?.source_bulk?.bulk_id !== rawManifest.bulk_id) errors.push("Scryfall bulk identity mismatch");
  if (manifest?.unresolved_count !== 0 || unresolvedReport?.unresolved_count !== 0 || unresolvedReport?.records?.length) errors.push("authored media has unresolved records");
  if (manifest?.resolved_count !== index?.records?.length) errors.push("resolved record count mismatch");
  const recordKeys = (index?.records || []).map((record) => record.resolver_key);
  if (new Set(recordKeys).size !== recordKeys.length) errors.push("duplicate resolver keys");
  if (recordKeys.some((key, indexPosition) => indexPosition && compareText(recordKeys[indexPosition - 1], key) > 0)) errors.push("records are not deterministically sorted");
  const inventoryKeys = new Set(inventory.occurrences.map((entry) => entry.resolver_key));
  for (const key of inventoryKeys) if (!recordKeys.includes(key)) errors.push(`missing governed resolver key ${key}`);
  for (const record of index?.records || []) {
    if (!record.oracle_id || !record.scryfall_id || !record.canonical_name) errors.push(`incomplete canonical identity for ${record.resolver_key}`);
    if (!Array.isArray(record.image_candidates) || !record.image_candidates.length) errors.push(`missing image candidates for ${record.resolver_key}`);
  }
  return errors;
}

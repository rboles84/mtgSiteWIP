import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ARCHSCRY_MEDIA_INDEX_FILE,
  ARCHSCRY_MEDIA_MANIFEST_FILE,
  ARCHSCRY_MEDIA_UNRESOLVED_FILE,
  buildArchscryMediaArtifacts,
  deriveArchscryAuthoredMediaInventory,
  normalizeArchscryMediaKey,
  sha256File,
  stableJsonBytes,
  validateArchscryMediaArtifacts,
} from "./archscry-media-projection-core.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const INDEX_DIR = join(ROOT, "data", "scryfall", "indexes");
const RAW_PATH = join(ROOT, "data", "scryfall", "raw", "oracle-cards.json");
const RAW_MANIFEST_PATH = join(ROOT, "data", "scryfall", "raw", "bulk-manifest.json");

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const [cards, rawManifest, rawBulkSha256, inventory, committedIndex, committedManifest, committedUnresolved] = await Promise.all([
  readJson(RAW_PATH),
  readJson(RAW_MANIFEST_PATH),
  sha256File(RAW_PATH),
  deriveArchscryAuthoredMediaInventory(ROOT),
  readJson(join(INDEX_DIR, ARCHSCRY_MEDIA_INDEX_FILE)),
  readJson(join(INDEX_DIR, ARCHSCRY_MEDIA_MANIFEST_FILE)),
  readJson(join(INDEX_DIR, ARCHSCRY_MEDIA_UNRESOLVED_FILE)),
]);

const first = buildArchscryMediaArtifacts({
  cards,
  rawManifest,
  rawBulkSha256,
  inventory,
  previousIndex: committedIndex,
});
const second = buildArchscryMediaArtifacts({
  cards,
  rawManifest,
  rawBulkSha256,
  inventory,
  previousIndex: committedIndex,
});

assert.deepEqual(first.bytes, second.bytes, "identical inputs must produce byte-identical VM-559 artifacts");
assert.equal(first.bytes[ARCHSCRY_MEDIA_INDEX_FILE], stableJsonBytes(committedIndex), "committed media index is stale");
assert.equal(first.bytes[ARCHSCRY_MEDIA_MANIFEST_FILE], stableJsonBytes(committedManifest), "committed media manifest is stale");
assert.equal(first.bytes[ARCHSCRY_MEDIA_UNRESOLVED_FILE], stableJsonBytes(committedUnresolved), "committed unresolved report is stale");

const errors = validateArchscryMediaArtifacts({
  index: committedIndex,
  manifest: committedManifest,
  unresolvedReport: committedUnresolved,
  inventory,
  rawBulkSha256,
  rawManifest,
});
assert.deepEqual(errors, [], errors.join("\n"));

const byKey = new Map(committedIndex.records.map((record) => [record.resolver_key, record]));
for (const name of ["Swamp", "Glint-Eye Nephilim", "Opulent Palace", "Quintorius Field Historian"]) {
  const record = byKey.get(normalizeArchscryMediaKey(name));
  assert.ok(record, `${name} must resolve from the governed projection`);
  assert.ok(record.oracle_id && record.scryfall_id, `${name} must retain canonical and printing identity`);
  assert.ok(record.image_candidates.length, `${name} must retain ordered image candidates`);
}

const multiface = byKey.get(normalizeArchscryMediaKey("Barkchannel Pathway"));
assert.equal(multiface?.layout, "modal_dfc", "Multiface layout association drifted");
assert.equal(multiface?.selected_face_name, "Barkchannel Pathway", "Multiface authored face association drifted");
assert.equal(multiface?.image_candidates?.[0]?.face_name, "Barkchannel Pathway", "Multiface candidate ordering lost the authored face");

const driftBaseline = structuredClone(committedIndex);
const driftTarget = driftBaseline.records.find((record) => record.resolver_key === normalizeArchscryMediaKey("Swamp"));
driftTarget.scryfall_id = "unexpected-selection-drift";
assert.throws(() => buildArchscryMediaArtifacts({
  cards,
  rawManifest,
  rawBulkSha256,
  inventory,
  previousIndex: driftBaseline,
}), /Unexpected Archscry media selection drift.*Stop for owner review/);
assert.throws(() => buildArchscryMediaArtifacts({
  cards,
  rawManifest,
  rawBulkSha256,
  inventory,
  previousIndex: driftBaseline,
  acceptSelectionDrift: true,
}), /requires explicit --owner-authorization evidence/);

for (const occurrence of inventory.occurrences) {
  const record = byKey.get(occurrence.resolver_key);
  assert.ok(record, `${occurrence.identity_key}/${occurrence.surface}/${occurrence.raw_authored_name} is missing`);
  assert.ok(record.raw_authored_names.includes(occurrence.raw_authored_name), `${occurrence.raw_authored_name} lost its raw authored alias`);
  assert.equal(occurrence.order, occurrence.position, `${occurrence.raw_authored_name} lost deterministic authored order`);
}

assert.equal(inventory.identity_count, 37, "VM-559 must cover all 37 identities");
assert.equal(committedManifest.unresolved_count, 0, "VM-559 must have zero unresolved authored cards");
console.log(`VM-559 media projection: PASS (${inventory.occurrences.length} occurrences, ${committedIndex.records.length} unique resolver keys, 37 identities).`);

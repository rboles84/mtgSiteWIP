import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const INDEX_DIR = join(ROOT, "data", "scryfall", "indexes");
const RAW_CARDS_PATH = join(ROOT, "data", "scryfall", "raw", "oracle-cards.json");
const RAW_MANIFEST_PATH = join(ROOT, "data", "scryfall", "raw", "bulk-manifest.json");
const REQUIRED_INDEXES = [
  "card-flavor-index.json",
  "commander-index.json",
  "color-theme-index.json",
  "mechanic-theme-index.json",
  "scryfall-index-manifest.json"
];

async function readJson(path, label) {
  const text = await readFile(path, "utf8");
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label} is malformed JSON: ${error.message}`);
  }
}

async function fileSize(path) {
  const info = await stat(path);
  return info.size;
}

function addCounts(target, tags = []) {
  tags.forEach((tag) => {
    target.set(tag, (target.get(tag) || 0) + 1);
  });
}

function assertSortedByName(records, label) {
  for (let index = 1; index < records.length; index += 1) {
    if (records[index - 1].name.localeCompare(records[index].name) > 0) {
      throw new Error(`${label} is not sorted deterministically by card name near ${records[index - 1].name} / ${records[index].name}.`);
    }
  }
}

function summarizeTagCategories(cards) {
  const mechanical = new Map();
  const playstyle = new Map();
  const identity = new Map();
  const lore = new Map();
  cards.forEach((card) => {
    addCounts(mechanical, card.detected_tags?.mechanical || []);
    addCounts(playstyle, card.detected_tags?.playstyle || []);
    addCounts(identity, card.detected_tags?.identity || []);
    addCounts(lore, card.lore_tones || []);
  });
  return { mechanical, playstyle, identity, lore };
}

function requireNonEmptyMap(map, label) {
  if (!map.size) throw new Error(`No ${label} tags were emitted in card-flavor-index.json.`);
}

const errors = [];

try {
  const gitignore = await readFile(join(ROOT, ".gitignore"), "utf8");
  if (!gitignore.includes("data/scryfall/raw/*.json") || !gitignore.includes("data/scryfall/raw/*.json.gz")) {
    errors.push(".gitignore is missing Scryfall raw JSON ignore rules.");
  }
} catch (error) {
  errors.push(`Could not inspect .gitignore: ${error.message}`);
}

try {
  const rawCards = await readJson(RAW_CARDS_PATH, "oracle-cards.json");
  const rawManifest = await readJson(RAW_MANIFEST_PATH, "bulk-manifest.json");
  if (!Array.isArray(rawCards) || !rawCards.length) errors.push("Raw oracle-cards.json is empty or not an array.");
  if (rawManifest.type !== "oracle_cards" || !rawManifest.download_uri) errors.push("Raw bulk manifest is missing oracle_cards metadata.");
  console.log(`Raw oracle cards: ${Array.isArray(rawCards) ? rawCards.length.toLocaleString() : "invalid"}`);
} catch (error) {
  errors.push(`Raw Scryfall files are not ready: ${error.message}`);
}

const indexes = {};
for (const file of REQUIRED_INDEXES) {
  try {
    const path = join(INDEX_DIR, file);
    indexes[file] = await readJson(path, file);
    const size = await fileSize(path);
    console.log(`${file}: ${(size / 1024).toFixed(1)} KiB`);
  } catch (error) {
    errors.push(`Could not inspect ${file}: ${error.message}`);
  }
}

try {
  const flavorCards = indexes["card-flavor-index.json"]?.cards || [];
  if (!flavorCards.length) errors.push("card-flavor-index.json has no cards.");
  assertSortedByName(flavorCards, "card-flavor-index.json");
  if (!flavorCards.some((card) => (card.card_faces || []).some((face) => face.flavor_excerpt))) {
    errors.push("No double-faced/card-face flavor excerpts were found in card-flavor-index.json.");
  }
  const counts = summarizeTagCategories(flavorCards);
  requireNonEmptyMap(counts.mechanical, "mechanical");
  requireNonEmptyMap(counts.playstyle, "playstyle");
  requireNonEmptyMap(counts.identity, "identity");
  requireNonEmptyMap(counts.lore, "lore-tone");
  console.log(`Flavor cards: ${flavorCards.length.toLocaleString()}`);
  console.log(`Tag categories: mechanical ${counts.mechanical.size}, playstyle ${counts.playstyle.size}, identity ${counts.identity.size}, lore tones ${counts.lore.size}`);
} catch (error) {
  errors.push(error.message);
}

try {
  const commanders = indexes["commander-index.json"]?.commanders || [];
  if (!commanders.length) errors.push("commander-index.json has no commander candidates.");
  assertSortedByName(commanders, "commander-index.json");
  if (!commanders.some((card) => (card.commander_rule_notes || []).length)) {
    errors.push("Commander candidates are missing commander_rule_notes.");
  }
  console.log(`Commander candidates: ${commanders.length.toLocaleString()}`);
} catch (error) {
  errors.push(error.message);
}

try {
  const manifest = indexes["scryfall-index-manifest.json"];
  if (!manifest?.guardrails || manifest.guardrails.raw_bulk_committed !== false) {
    errors.push("scryfall-index-manifest.json is missing raw bulk guardrail metadata.");
  }
  if (manifest?.guardrails?.full_oracle_text_committed !== false || manifest?.guardrails?.full_flavor_text_committed !== false) {
    errors.push("scryfall-index-manifest.json must record that full oracle/flavor text is not committed.");
  }
} catch (error) {
  errors.push(error.message);
}

if (errors.length) {
  console.error("\nScryfall index inspection failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Scryfall index inspection passed.");

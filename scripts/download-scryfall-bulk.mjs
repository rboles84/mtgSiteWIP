import { gunzipSync } from "node:zlib";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const RAW_DIR = join(ROOT, "data", "scryfall", "raw");
const BULK_ENDPOINT = "https://api.scryfall.com/bulk-data";
const RAW_OUTPUT = join(RAW_DIR, "oracle-cards.json");
const MANIFEST_OUTPUT = join(RAW_DIR, "bulk-manifest.json");
const HEADERS = {
  "Accept": "application/json",
  "User-Agent": "VoxMana/0.1 (https://voxmana.com; local Scryfall indexing)"
};

async function fetchJson(url, label) {
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) {
    throw new Error(`${label} request failed: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  if (!text.trim()) {
    throw new Error(`${label} returned an empty response.`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label} returned malformed JSON: ${error.message}`);
  }
}

async function fetchText(url, label) {
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) {
    throw new Error(`${label} request failed: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const text = /\.gz(?:$|\?)/i.test(url) ? gunzipSync(buffer).toString("utf8") : buffer.toString("utf8");
  if (!text.trim()) {
    throw new Error(`${label} returned an empty response.`);
  }
  return text;
}

function selectOracleBulk(payload) {
  if (!payload || payload.object !== "list" || !Array.isArray(payload.data)) {
    throw new Error("Scryfall bulk-data response did not contain a list payload.");
  }

  const oracleBulk = payload.data.find((entry) => entry?.type === "oracle_cards");
  if (!oracleBulk) {
    throw new Error("Scryfall bulk-data response did not include type === \"oracle_cards\".");
  }
  const downloadUri = oracleBulk.download_uri || oracleBulk.jsonl_download_uri;
  if (!oracleBulk.id || !downloadUri || !oracleBulk.updated_at) {
    throw new Error("Scryfall oracle_cards bulk entry is missing id, download_uri/jsonl_download_uri, or updated_at.");
  }
  return { ...oracleBulk, download_uri: downloadUri };
}

function parseOracleCardsBulk(text, uri) {
  if (/\.jsonl(?:\.gz)?(?:$|\?)/i.test(uri)) {
    return text
      .split(/\r?\n/)
      .filter((line) => line.trim())
      .map((line, index) => {
        try {
          return JSON.parse(line);
        } catch (error) {
          throw new Error(`Scryfall oracle_cards JSONL line ${index + 1} is malformed: ${error.message}`);
        }
      });
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Scryfall oracle_cards bulk file returned malformed JSON: ${error.message}`);
  }
}

function validateOracleCards(cards) {
  if (!Array.isArray(cards)) {
    throw new Error("Downloaded oracle_cards payload was not a JSON array.");
  }
  if (!cards.length) {
    throw new Error("Downloaded oracle_cards payload was empty.");
  }

  const malformed = cards.find((card) => !card?.id || !card?.oracle_id || !card?.name);
  if (malformed) {
    throw new Error(`Downloaded oracle_cards payload contains malformed card data near ${JSON.stringify(malformed).slice(0, 180)}.`);
  }
}

await mkdir(RAW_DIR, { recursive: true });

const bulkPayload = await fetchJson(BULK_ENDPOINT, "Scryfall bulk manifest");
const oracleBulk = selectOracleBulk(bulkPayload);
const cards = parseOracleCardsBulk(
  await fetchText(oracleBulk.download_uri, "Scryfall oracle_cards bulk file"),
  oracleBulk.download_uri
);
validateOracleCards(cards);

const downloadedAt = new Date().toISOString();
const manifest = {
  downloaded_at: downloadedAt,
  source_endpoint: BULK_ENDPOINT,
  bulk_id: oracleBulk.id,
  type: oracleBulk.type,
  name: oracleBulk.name || "Oracle Cards",
  updated_at: oracleBulk.updated_at,
  download_uri: oracleBulk.download_uri,
  content_encoding: oracleBulk.content_encoding || (/\.gz(?:$|\?)/i.test(oracleBulk.download_uri) ? "gzip" : ""),
  content_type: oracleBulk.content_type || (/\.jsonl(?:\.gz)?(?:$|\?)/i.test(oracleBulk.download_uri) ? "application/jsonl" : "application/json"),
  compressed_size: oracleBulk.compressed_size || oracleBulk.size || null,
  raw_file: "data/scryfall/raw/oracle-cards.json",
  card_count: cards.length
};

await writeFile(RAW_OUTPUT, `${JSON.stringify(cards, null, 2)}\n`, "utf8");
await writeFile(MANIFEST_OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Downloaded ${cards.length.toLocaleString()} oracle cards.`);
console.log(`Raw data: ${manifest.raw_file}`);
console.log("Manifest: data/scryfall/raw/bulk-manifest.json");

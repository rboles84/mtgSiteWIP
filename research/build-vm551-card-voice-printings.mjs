import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "data/dossier/card-voice-relationships.source.json");
const outputPath = path.join(root, "data/dossier/card-voice-printings.source.json");
const current = JSON.parse(await readFile(sourcePath, "utf8"));

const WUBRG_PRINTING = Object.freeze({
  identity_key: "WUBRG",
  card_name: "Call the Spirit Dragons",
  oracle_id: "3ceb23f5-abb1-4569-a1e4-1eed9a9babcf",
  scryfall_id: "b1ad91db-5f16-4392-baf1-f8400ec11e0a",
  set: "tdm",
  collector_number: "174",
  expected_flavor_text: "The essence of Tarkir was shaped into draconic embodiments of the re-formed clans.",
});

async function loadPrinting(scryfallId) {
  const response = await fetch(`https://api.scryfall.com/cards/${encodeURIComponent(scryfallId)}`, {
    headers: { "User-Agent": "VoxMana-VM551-VoiceAuthority/1.0" },
  });
  if (!response.ok) throw new Error(`Scryfall printing lookup failed ${response.status}: ${scryfallId}`);
  return response.json();
}

function flavorTextForPrinting(card) {
  if (card.flavor_text) return { text: card.flavor_text, source: "card.flavor_text" };
  const face = (card.card_faces || []).find((entry) => entry.flavor_text);
  if (face) return { text: face.flavor_text, source: `card_faces:${face.name}` };
  throw new Error(`Selected public voice printing has no flavor text: ${card.name} / ${card.id}`);
}

const records = [];
for (const relationship of current.records) {
  const override = relationship.identity_key === "WUBRG" ? WUBRG_PRINTING : null;
  const printing = await loadPrinting(override?.scryfall_id || relationship.scryfall_id);
  const flavor = flavorTextForPrinting(printing);
  if (override) {
    for (const [field, expected] of Object.entries({
      name: override.card_name,
      oracle_id: override.oracle_id,
      id: override.scryfall_id,
      set: override.set,
      collector_number: override.collector_number,
    })) {
      if (String(printing[field]) !== expected) throw new Error(`Pinned WUBRG printing ${field} mismatch: ${printing[field]} != ${expected}`);
    }
    if (flavor.text !== override.expected_flavor_text) throw new Error("Pinned WUBRG printing flavor text changed");
  } else {
    if (printing.name !== relationship.canonical_card_name) throw new Error(`Printing name mismatch for ${relationship.identity_key}`);
    if (printing.oracle_id !== relationship.canonical_card_id) throw new Error(`Printing Oracle ID mismatch for ${relationship.identity_key}`);
  }
  records.push({
    identity_key: relationship.identity_key,
    canonical_card_name: printing.name,
    oracle_id: printing.oracle_id,
    scryfall_id: printing.id,
    set: printing.set,
    collector_number: printing.collector_number,
    exact_flavor_text: flavor.text,
    flavor_text_field: flavor.source,
    scryfall_uri: printing.scryfall_uri,
    source_locator: `https://api.scryfall.com/cards/${printing.id}#${flavor.source}`,
    ...(override ? {
      relationship_override: {
        relationship_class: "CERTIFIED_SEMANTIC_ECHO",
        why_voice_belongs: "The regular Tarkir: Dragonstorm printing names the re-formed clans as distinct draconic embodiments, while the card itself requires all five colors and cares about Dragons of each color.",
        relationship_bridge: "This is a bounded Five-Color voice echo of all five colors and distinct clan embodiments acting within one card. It does not make Tarkir's clans a single official WUBRG faction or establish completion as a Vox Mana identity claim.",
        false_positive_analysis: "The bridge depends on the exact regular-printing flavor text together with the card's five-color canonical facts, not on a generic unity, Dragon, multicolor, or Tarkir theme.",
        adjacent_identity_confusion_risk: "Each Tarkir clan remains a distinct three-color identity, and Yore or artifact decks may also combine parts. The public relationship is limited to Five-Color access across all five colors.",
        limitations: "Public use is limited to this exact regular-printing flavor line and its bounded Five-Color relationship. It does not merge Tarkir's clans into one official faction or turn generic multicolor, Dragon, or unity themes into WUBRG evidence.",
        supporting_official_locators: [
          "https://magic.wizards.com/en/news/feature/tarkir-dragonstorm-release-notes#0174_MTGTDM_Main",
          "https://magic.wizards.com/en/news/feature/tarkir-dragonstorm-mechanics",
        ],
        supersedes_card_name: "Coalition Victory",
        supersession_reason: "The former machine metaphor carried avoidable Yore, artifact, and completion false positives; it remains historical audit evidence but is not the public WUBRG voice.",
      },
    } : {}),
  });
  await new Promise((resolve) => setTimeout(resolve, 75));
}

const output = {
  schema_version: "1.0.0",
  authority: "Exact Scryfall printing facts for selected public card voices. Oracle ID identifies rules identity; printing ID identifies the exact flavor evidence.",
  records,
};
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ status: "PASS", records: records.length, identities: new Set(records.map((row) => row.identity_key)).size }, null, 2));

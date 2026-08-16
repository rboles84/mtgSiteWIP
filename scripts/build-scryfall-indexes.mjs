import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ARCHSCRY_MEDIA_INDEX_FILE,
  ARCHSCRY_MEDIA_MANIFEST_FILE,
  ARCHSCRY_MEDIA_UNRESOLVED_FILE,
  buildArchscryMediaArtifacts,
  deriveArchscryAuthoredMediaInventory,
  sha256File,
} from "./archscry-media-projection-core.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const RAW_DIR = join(ROOT, "data", "scryfall", "raw");
const INDEX_DIR = join(ROOT, "data", "scryfall", "indexes");
const TAXONOMY_PATH = join(ROOT, "data", "taxonomy", "vox-mana-tags.json");
const RAW_CARDS_PATH = join(RAW_DIR, "oracle-cards.json");
const RAW_MANIFEST_PATH = join(RAW_DIR, "bulk-manifest.json");
const MAX_FLAVOR_INDEX_BYTES = 4_500_000;
const MAX_FLAVOR_INDEX_CARDS = 2_600;
const MAX_SAMPLE_CARDS_PER_THEME = 18;
const COLOR_ORDER = ["W", "U", "B", "R", "G"];
const COMMANDER_TEXT_PATTERNS = [
  /can be your commander/i,
  /\bpartner\b/i,
  /\bfriends forever\b/i,
  /\bchoose a background\b/i,
  /\bdoctor's companion\b/i
];

const TAG_RULES = {
  mechanical: [
    ["graveyard", /\bgraveyard\b|\bfrom your graveyard\b|\binto your graveyard\b/i],
    ["recursion", /\breturn target .* from your graveyard\b|\breturn .* from your graveyard\b|\bcast .* from your graveyard\b/i],
    ["reanimator", /\breturn target creature card from your graveyard to the battlefield\b|\breanimate\b|\bput target creature card .* graveyard onto the battlefield\b/i],
    ["self-mill", /\bmill (one|two|three|four|five|six|seven|eight|nine|ten|\d+)\b|\bput .* cards? from (the top of )?your library into your graveyard\b/i],
    ["sacrifice", /\bsacrifice\b|\bsacrificed\b/i],
    ["aristocrats", /\bwhenever .* dies\b|\bwhenever you sacrifice\b|\bdrain\b|\beach opponent loses .* you gain/i],
    ["tokens", /\bcreate .* token\b|\btoken creature\b|\btokens you control\b/i],
    ["go-wide", /\bcreatures you control get\b|\bfor each creature you control\b|\btokens you control\b|\banthem\b/i],
    ["spellslinger", /\binstant or sorcery\b|\binstants and sorceries\b|\bwhenever you cast .* instant\b|\bwhenever you cast .* sorcery\b/i],
    ["storm", /\bstorm\b|\bcopy it for each spell cast before it\b/i],
    ["spell-copy", /\bcopy target instant\b|\bcopy target sorcery\b|\bcopy .* spell\b|\byou may choose new targets\b/i],
    ["lifegain", /\bgain .* life\b|\byou gain life\b|\blifelink\b/i],
    ["lifedrain", /\beach opponent loses .* life\b|\btarget opponent loses .* life\b|\byou gain .* life\b/i],
    ["counters", /\b\+1\/\+1 counter\b|\bcounters? on\b|\bput .* counters?\b/i],
    ["proliferate", /\bproliferate\b/i],
    ["artifacts", /\bartifact\b|\bartifacts you control\b/i],
    ["treasure", /\btreasure token\b|\btreasures\b/i],
    ["clues", /\bclue token\b|\bclues\b|\binvestigate\b/i],
    ["food", /\bfood token\b|\bfoods\b/i],
    ["equipment", /\bequipment\b|\bequip\b|\battached\b/i],
    ["enchantments", /\benchantment\b|\benchantments you control\b|\baura\b/i],
    ["enchantress", /\bwhenever you cast an enchantment\b|\bwhenever an enchantment enters\b|\benchantress\b/i],
    ["ramp", /\bsearch your library for .* land\b|\badd \{[WUBRGC]\}\b|\badd one mana\b|\badd .* mana\b/i],
    ["big-mana", /\badd .* for each\b|\bdouble .* mana\b|\bmana pool\b|\bwhere X is\b/i],
    ["landfall", /\blandfall\b|\bwhenever a land enters\b/i],
    ["lands-matter", /\blands? you control\b|\bplay an additional land\b|\breturn a land\b|\bfrom your graveyard to the battlefield tapped\b/i],
    ["combat", /\battack\b|\battacks\b|\bcombat damage\b|\bblocks\b/i],
    ["extra-combat", /\badditional combat phase\b|\bextra combat\b|\bafter this phase, there is an additional combat\b/i],
    ["voltron", /\bcommander gets\b|\bequipped creature gets\b|\benchanted creature gets\b|\btarget creature gets \+/i],
    ["blink", /\bexile .* return .* battlefield\b|\bflicker\b|\bblink\b|\breturn it to the battlefield\b/i],
    ["etb", /\benters the battlefield\b|\bwhen .* enters\b/i],
    ["mill", /\btarget player mills\b|\beach opponent mills\b|\bmill .* cards?\b/i],
    ["discard", /\bdiscard\b|\bdiscards\b/i],
    ["wheels", /\bdiscard .* hand\b.*\bdraw\b|\beach player discards .* draws\b|\bwheel\b/i],
    ["draw", /\bdraw .* cards?\b|\bwhenever you draw\b/i],
    ["burn", /\bdeals? .* damage to any target\b|\bdeals? .* damage to each opponent\b|\bdamage to target player\b/i],
    ["group-slug", /\beach opponent loses\b|\beach player loses\b|\bwhenever an opponent\b.*\bloses life\b/i],
    ["group-hug", /\beach player draws\b|\beach player may\b|\bplayers can't attack you\b|\bany player may\b/i],
    ["combo", /\buntap .* permanent\b|\bcopy it\b|\bwithout paying its mana cost\b|\binfinite\b/i],
    ["theft", /\bgain control\b|\bsteal\b|\bcast .* from an opponent\b|\bopponent's library\b/i],
    ["exile", /\bexile\b|\bexiled\b/i],
    ["typal", /\bchoose a creature type\b|\bcreatures? you control of the chosen type\b|\bcreatures? you control.*(elf|goblin|zombie|vampire|wizard|dragon|soldier|merfolk|spirit|cleric|sliver|dinosaur|cat|knight)s?\b/i]
  ],
  playstyle: [
    ["aggro", /\bhaste\b|\battack\b|\baggressive\b|\bcan't block\b/i],
    ["control", /\bcounter target\b|\bdestroy all\b|\bexile all\b|\breturn target spell\b|\btap target\b/i],
    ["tempo", /\breturn target .* to its owner's hand\b|\btap target creature\b|\bcan't untap\b|\bflash\b/i],
    ["midrange", /\bvalue\b|\benters the battlefield\b|\bdraw a card\b|\bwhenever .* dies\b/i],
    ["combo", /\bcopy\b|\buntap\b|\bwithout paying its mana cost\b|\bstorm\b/i],
    ["stax", /\bplayers can't\b|\bcan't cast\b|\bspells cost .* more\b|\bskip .* step\b|\btax\b/i],
    ["politics", /\bgoad\b|\bvoting\b|\bwill of the council\b|\beach opponent may\b|\bchoose an opponent\b/i],
    ["chaos", /\brandom\b|\bcoin flip\b|\bdie roll\b|\beach player chooses\b/i],
    ["pillow-fort", /\bcan't attack you\b|\bprevent all combat damage\b|\bunless .* pays\b|\bpropaganda\b/i],
    ["hatebears", /\bcreature\b.*\bplayers can't\b|\bnoncreature spells cost\b|\bopponents can't\b/i],
    ["toolbox", /\bsearch your library for .* card\b|\breveal .* card\b|\btutor\b/i],
    ["goodstuff", /\bdraw a card\b|\bdestroy target\b|\bexile target\b|\badd .* mana\b/i]
  ],
  identity: [
    ["death", /\bdeath\b|\bdies\b|\bdead\b|\bgrave\b/i],
    ["decay", /\bdecay\b|\brot\b|\bwithering\b|\bcorrupt\b/i],
    ["knowledge", /\bknowledge\b|\bsecret\b|\btruth\b|\blearn\b|\bresearch\b/i],
    ["ambition", /\bambition\b|\bpower\b|\bclaim\b|\bascend\b|\bdominion\b/i],
    ["order", /\border\b|\blaw\b|\bjustice\b|\bcontrol\b|\bdecree\b/i],
    ["rebellion", /\brebel\b|\brebellion\b|\bdefy\b|\bresist\b|\buprising\b/i],
    ["invention", /\binvent\b|\bdevice\b|\bengine\b|\bexperiment\b|\bconstruct\b/i],
    ["faith", /\bfaith\b|\bprayer\b|\bdevotion\b|\bsaint\b|\bblessing\b/i],
    ["horror", /\bhorror\b|\bfear\b|\bterror\b|\bnightmare\b|\bdread\b/i],
    ["cosmic", /\bcosmic\b|\beternal\b|\bvoid\b|\bstars?\b|\beldrazi\b/i],
    ["nature", /\bnature\b|\bforest\b|\bwild\b|\bbeast\b|\broot\b/i],
    ["growth", /\bgrowth\b|\bgrow\b|\bbloom\b|\bevolve\b|\badapt\b/i],
    ["instinct", /\binstinct\b|\bhunt\b|\bferal\b|\bprimal\b/i],
    ["rage", /\brage\b|\bfury\b|\bangry\b|\bwrath\b|\briot\b/i],
    ["freedom", /\bfreedom\b|\bfree\b|\bliberty\b|\bunchained\b/i],
    ["law", /\blaw\b|\bverdict\b|\bjudge\b|\bcourt\b|\bsentence\b/i],
    ["secrecy", /\bsecret\b|\bhidden\b|\bshadow\b|\bspy\b|\bwhisper\b/i],
    ["memory", /\bmemory\b|\bremember\b|\bforgotten\b|\bpast\b|\bhistory\b/i],
    ["ruin", /\bruin\b|\bwreckage\b|\bashes\b|\bdestroyed\b|\bfallen\b/i],
    ["restoration", /\brestore\b|\brenew\b|\bheal\b|\brebuild\b|\breturn\b/i],
    ["curiosity", /\bcurious\b|\bdiscover\b|\bwonder\b|\bquestion\b|\bseek\b/i],
    ["manipulation", /\bmanipulate\b|\bpuppet\b|\bscheme\b|\bplot\b|\bcontrol\b/i],
    ["community", /\bcommunity\b|\btogether\b|\bconclave\b|\bfamily\b|\bkin\b/i]
  ],
  "lore-tone": [
    ["patient", /\bpatient\b|\bwait\b|\binevitable\b|\bslow\b/i],
    ["inevitable", /\binevitable\b|\bdestiny\b|\bfate\b|\bdoom\b/i],
    ["hungry", /\bhunger\b|\bhungry\b|\bconsume\b|\bdevour\b/i],
    ["noble", /\bnoble\b|\bhonor\b|\bhero\b|\bvirtue\b/i],
    ["ruthless", /\bruthless\b|\bmerciless\b|\bcruel\b|\bno mercy\b/i],
    ["curious", /\bcurious\b|\bquestion\b|\bdiscover\b|\bseek\b/i],
    ["ancient", /\bancient\b|\bages\b|\bprimordial\b|\bold\b/i],
    ["sacred", /\bsacred\b|\bholy\b|\bblessed\b|\bshrine\b/i],
    ["eerie", /\beerie\b|\bwhisper\b|\bghost\b|\bhaunt\b|\bsilent\b/i],
    ["chaotic", /\bchaos\b|\brandom\b|\bunpredictable\b|\briot\b/i],
    ["disciplined", /\bdiscipline\b|\btrained\b|\border\b|\bprecision\b/i],
    ["communal", /\bcommunal\b|\btogether\b|\bshared\b|\bconclave\b/i],
    ["tragic", /\btragic\b|\bsorrow\b|\bgrief\b|\blament\b|\bloss\b/i],
    ["defiant", /\bdefiant\b|\bdefy\b|\bresist\b|\brebel\b/i],
    ["experimental", /\bexperiment\b|\bprototype\b|\btest\b|\binvention\b/i],
    ["predatory", /\bpredator\b|\bprey\b|\bhunt\b|\bstalk\b/i],
    ["restorative", /\brestore\b|\bheal\b|\brenew\b|\brecover\b/i]
  ]
};

async function readJson(path, label) {
  let text = "";
  try {
    text = await readFile(path, "utf8");
  } catch (error) {
    throw new Error(`Could not read ${label} at ${path}: ${error.message}`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label} contains malformed JSON: ${error.message}`);
  }
}

async function readOptionalJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function writeJson(path, data) {
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function sortColors(colors = []) {
  return [...new Set(colors || [])].sort((left, right) => COLOR_ORDER.indexOf(left) - COLOR_ORDER.indexOf(right));
}

function colorIdentityKey(colors = []) {
  const sorted = sortColors(colors);
  return sorted.length ? sorted.join("") : "C";
}

function excerpt(value, limit = 180) {
  const cleaned = String(value || "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= limit) return cleaned;
  return `${cleaned.slice(0, limit - 3).trim()}...`;
}

function selectedImageUris(imageUris = {}) {
  return {
    small: imageUris.small || "",
    normal: imageUris.normal || "",
    art_crop: imageUris.art_crop || ""
  };
}

function selectedFaces(card) {
  return (card.card_faces || [])
    .map((face) => ({
      name: face.name || "",
      type_line: face.type_line || "",
      oracle_excerpt: excerpt(face.oracle_text, 180),
      flavor_excerpt: excerpt(face.flavor_text, 180),
      image_uris: selectedImageUris(face.image_uris || {})
    }))
    .filter((face) => face.name || face.type_line || face.oracle_excerpt || face.flavor_excerpt || Object.values(face.image_uris).some(Boolean));
}

function allOracleText(card) {
  return [
    card.oracle_text,
    ...(card.card_faces || []).flatMap((face) => [face.oracle_text, face.flavor_text, face.type_line, face.name]),
    card.flavor_text,
    card.type_line,
    card.name,
    ...(card.keywords || [])
  ].filter(Boolean).join("\n");
}

function firstFlavorText(card) {
  return card.flavor_text || (card.card_faces || []).find((face) => face.flavor_text)?.flavor_text || "";
}

function validateTaxonomy(data) {
  if (!data || !Array.isArray(data.tags) || !data.tags.length) {
    throw new Error("Tag taxonomy must contain a non-empty tags array.");
  }

  const map = new Map();
  data.tags.forEach((entry) => {
    if (!entry?.tag || !entry?.category || !entry?.canonical_definition || !entry?.vox_mana_interpretation) {
      throw new Error(`Tag taxonomy entry is incomplete: ${JSON.stringify(entry).slice(0, 160)}`);
    }
    map.set(`${entry.category}:${entry.tag}`, entry);
  });
  return map;
}

function ensureRuleTagsExist(taxonomyMap) {
  const missing = [];
  Object.entries(TAG_RULES).forEach(([category, rules]) => {
    rules.forEach(([tag]) => {
      if (!taxonomyMap.has(`${category}:${tag}`)) missing.push(`${category}:${tag}`);
    });
  });
  if (missing.length) {
    throw new Error(`Tag rules reference missing taxonomy entries: ${missing.join(", ")}`);
  }
}

function detectCardTags(card, taxonomyMap) {
  const text = allOracleText(card);
  const detected = {
    mechanical: [],
    playstyle: [],
    identity: []
  };
  const loreTones = [];

  Object.entries(TAG_RULES).forEach(([category, rules]) => {
    rules.forEach(([tag, pattern]) => {
      if (!taxonomyMap.has(`${category}:${tag}`) || !pattern.test(text)) return;
      if (category === "lore-tone") loreTones.push(tag);
      else detected[category].push(tag);
    });
  });

  return {
    detected_tags: {
      mechanical: [...new Set(detected.mechanical)].sort(),
      playstyle: [...new Set(detected.playstyle)].sort(),
      identity: [...new Set(detected.identity)].sort()
    },
    lore_tones: [...new Set(loreTones)].sort()
  };
}

function commanderRuleNotes(card) {
  const notes = [];
  const text = allOracleText(card);
  const typeLine = card.type_line || "";

  if (/Legendary/i.test(typeLine) && /Creature/i.test(typeLine)) {
    notes.push("legendary creature");
  }
  if (/can be your commander/i.test(text)) notes.push("commander-enabling oracle text");
  if (/\bpartner\b/i.test(text) || (card.keywords || []).some((keyword) => /^partner$/i.test(keyword))) notes.push("partner");
  if (/\bfriends forever\b/i.test(text)) notes.push("friends forever");
  if (/\bchoose a background\b/i.test(text)) notes.push("choose a background");
  if (/\bdoctor's companion\b/i.test(text)) notes.push("doctor's companion");
  return [...new Set(notes)];
}

function isCommanderCandidate(card) {
  return commanderRuleNotes(card).length > 0 &&
    !["not_legal", "banned"].includes(card.legalities?.commander || "");
}

function baseCardRecord(card, taxonomyMap) {
  const detected = detectCardTags(card, taxonomyMap);
  const faces = selectedFaces(card);
  return {
    oracle_id: card.oracle_id || "",
    scryfall_id: card.id || "",
    name: card.name || "",
    colors: sortColors(card.colors || []),
    color_identity: sortColors(card.color_identity || []),
    type_line: card.type_line || "",
    keywords: [...new Set(card.keywords || [])].sort(),
    produced_mana: sortColors(card.produced_mana || []),
    set: card.set || "",
    collector_number: card.collector_number || "",
    released_at: card.released_at || "",
    scryfall_uri: card.scryfall_uri || "",
    image_uris: selectedImageUris(card.image_uris || {}),
    card_faces: faces,
    oracle_excerpt: excerpt(card.oracle_text || faces.map((face) => face.oracle_excerpt).filter(Boolean).join(" // "), 180),
    flavor_excerpt: excerpt(firstFlavorText(card), 180),
    detected_tags: detected.detected_tags,
    lore_tones: detected.lore_tones
  };
}

function compactFlavorRecord(record) {
  return {
    ...record,
    oracle_excerpt: undefined,
    flavor_excerpt: excerpt(record.flavor_excerpt, 120),
    image_uris: {
      normal: record.image_uris.normal || "",
      art_crop: record.image_uris.art_crop || ""
    },
    card_faces: (record.card_faces || []).map((face) => ({
      name: face.name,
      type_line: face.type_line,
      flavor_excerpt: excerpt(face.flavor_excerpt, 120),
      image_uris: {
        normal: face.image_uris.normal || "",
        art_crop: face.image_uris.art_crop || ""
      }
    }))
  };
}

function tagKeysForRecord(record) {
  return [
    ...(record.detected_tags?.mechanical || []).map((tag) => `mechanical:${tag}`),
    ...(record.detected_tags?.playstyle || []).map((tag) => `playstyle:${tag}`),
    ...(record.detected_tags?.identity || []).map((tag) => `identity:${tag}`),
    ...(record.lore_tones || []).map((tag) => `lore-tone:${tag}`)
  ].sort();
}

function addSelectedRecords(selected, records, predicate, limit) {
  let added = 0;
  for (const record of records) {
    if (added >= limit) break;
    if (!predicate(record) || selected.has(record.oracle_id)) continue;
    selected.set(record.oracle_id, record);
    added += 1;
  }
}

function selectFlavorRecordsForGuardrail(records, commanderRecords) {
  const selected = new Map();
  const commanderIds = new Set(commanderRecords.map((record) => record.oracle_id));
  const tagKeys = [...new Set(records.flatMap(tagKeysForRecord))].sort();
  const identities = [...new Set(records.map((record) => colorIdentityKey(record.color_identity)))].sort();

  addSelectedRecords(
    selected,
    records,
    (record) => (record.card_faces || []).some((face) => face.flavor_excerpt),
    160
  );
  addSelectedRecords(
    selected,
    records,
    (record) => commanderIds.has(record.oracle_id),
    420
  );

  identities.forEach((identity) => {
    addSelectedRecords(
      selected,
      records,
      (record) => colorIdentityKey(record.color_identity) === identity,
      36
    );
  });

  tagKeys.forEach((tagKey) => {
    addSelectedRecords(
      selected,
      records,
      (record) => tagKeysForRecord(record).includes(tagKey),
      24
    );
  });

  const bySignalDensity = [...records].sort((left, right) =>
    tagKeysForRecord(right).length - tagKeysForRecord(left).length ||
    left.name.localeCompare(right.name) ||
    left.oracle_id.localeCompare(right.oracle_id)
  );
  addSelectedRecords(selected, bySignalDensity, () => true, MAX_FLAVOR_INDEX_CARDS - selected.size);

  return sortCards([...selected.values()]).slice(0, MAX_FLAVOR_INDEX_CARDS);
}

function sortCards(cards) {
  return cards.sort((left, right) =>
    left.name.localeCompare(right.name) ||
    left.oracle_id.localeCompare(right.oracle_id) ||
    left.scryfall_id.localeCompare(right.scryfall_id)
  );
}

function countTags(records) {
  const counts = {
    mechanical: new Map(),
    playstyle: new Map(),
    identity: new Map(),
    "lore-tone": new Map()
  };

  records.forEach((record) => {
    Object.entries(record.detected_tags || {}).forEach(([category, tags]) => {
      tags.forEach((tag) => counts[category].set(tag, (counts[category].get(tag) || 0) + 1));
    });
    (record.lore_tones || []).forEach((tag) => counts["lore-tone"].set(tag, (counts["lore-tone"].get(tag) || 0) + 1));
  });
  return counts;
}

function sortedCounts(map) {
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((left, right) => right.count - left.count || left.tag.localeCompare(right.tag));
}

function buildColorThemeIndex(records, commanders, taxonomyMap, sourceMeta) {
  const buckets = new Map();
  records.forEach((record) => {
    const key = colorIdentityKey(record.color_identity);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(record);
  });

  const commanderCounts = new Map();
  commanders.forEach((record) => {
    const key = colorIdentityKey(record.color_identity);
    commanderCounts.set(key, (commanderCounts.get(key) || 0) + 1);
  });

  const themes = [...buckets.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([colorIdentity, bucket]) => {
      const counts = countTags(bucket);
      return {
        color_identity: colorIdentity,
        colors: colorIdentity === "C" ? [] : colorIdentity.split(""),
        flavor_card_count: bucket.length,
        commander_candidate_count: commanderCounts.get(colorIdentity) || 0,
        top_tags: {
          mechanical: sortedCounts(counts.mechanical).slice(0, 16),
          playstyle: sortedCounts(counts.playstyle).slice(0, 12),
          identity: sortedCounts(counts.identity).slice(0, 12),
          lore_tones: sortedCounts(counts["lore-tone"]).slice(0, 12)
        },
        sample_cards: bucket.slice(0, MAX_SAMPLE_CARDS_PER_THEME).map(sampleCardRecord)
      };
    });

  return {
    meta: sourceMeta("color-theme-index"),
    themes
  };
}

function sampleCardRecord(card) {
  return {
    oracle_id: card.oracle_id,
    scryfall_id: card.scryfall_id,
    name: card.name,
    color_identity: card.color_identity,
    type_line: card.type_line,
    scryfall_uri: card.scryfall_uri,
    image_uri: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "",
    flavor_excerpt: card.flavor_excerpt || card.card_faces?.find((face) => face.flavor_excerpt)?.flavor_excerpt || ""
  };
}

function buildMechanicThemeIndex(records, commanders, taxonomy, sourceMeta) {
  const commanderIds = new Set(commanders.map((card) => card.oracle_id));
  const themes = taxonomy.tags.map((tagEntry) => {
    const matching = records.filter((record) => {
      if (tagEntry.category === "lore-tone") return (record.lore_tones || []).includes(tagEntry.tag);
      return (record.detected_tags?.[tagEntry.category] || []).includes(tagEntry.tag);
    });
    const colorCounts = new Map();
    matching.forEach((record) => {
      const key = colorIdentityKey(record.color_identity);
      colorCounts.set(key, (colorCounts.get(key) || 0) + 1);
    });

    return {
      category: tagEntry.category,
      tag: tagEntry.tag,
      display_name: tagEntry.display_name,
      aliases: tagEntry.aliases || [],
      canonical_definition: tagEntry.canonical_definition,
      vox_mana_interpretation: tagEntry.vox_mana_interpretation,
      card_count: matching.length,
      commander_candidate_count: matching.filter((record) => commanderIds.has(record.oracle_id)).length,
      color_identities: sortedCounts(colorCounts).slice(0, 12),
      sample_cards: matching.slice(0, MAX_SAMPLE_CARDS_PER_THEME).map(sampleCardRecord)
    };
  }).sort((left, right) => left.category.localeCompare(right.category) || left.tag.localeCompare(right.tag));

  return {
    meta: sourceMeta("mechanic-theme-index"),
    themes
  };
}

function makeSourceMeta(indexType, rawManifest, extra = {}) {
  return {
    index_type: indexType,
    source: "Scryfall oracle_cards bulk data",
    source_endpoint: rawManifest.source_endpoint || "https://api.scryfall.com/bulk-data",
    bulk_id: rawManifest.bulk_id || "",
    bulk_type: rawManifest.type || "oracle_cards",
    bulk_updated_at: rawManifest.updated_at || "",
    downloaded_at: rawManifest.downloaded_at || "",
    text_guardrail: "slim-derived-index: full oracle_text and flavor_text are not committed; only short display excerpts and derived tags are stored.",
    ...extra
  };
}

await mkdir(INDEX_DIR, { recursive: true });

const [cards, rawManifest, taxonomy] = await Promise.all([
  readJson(RAW_CARDS_PATH, "Scryfall oracle cards"),
  readJson(RAW_MANIFEST_PATH, "Scryfall bulk manifest"),
  readJson(TAXONOMY_PATH, "Vox Mana tag taxonomy")
]);

if (!Array.isArray(cards) || !cards.length) {
  throw new Error("Scryfall oracle cards raw file is missing or empty.");
}

const taxonomyMap = validateTaxonomy(taxonomy);
ensureRuleTagsExist(taxonomyMap);

const acceptSelectionDrift = process.argv.includes("--accept-selection-drift");
const checkMode = process.argv.includes("--check");
const ownerAuthorization = process.argv.find((argument) => argument.startsWith("--owner-authorization="))?.split("=").slice(1).join("=") || "";
const selectionDriftReportPath = join(ROOT, "docs", "audits", "vm559-selection-drift-report.json");
const [archscryInventory, rawBulkSha256, previousArchscryIndex] = await Promise.all([
  deriveArchscryAuthoredMediaInventory(ROOT),
  sha256File(RAW_CARDS_PATH),
  readOptionalJson(join(INDEX_DIR, ARCHSCRY_MEDIA_INDEX_FILE)),
]);
const archscryMedia = buildArchscryMediaArtifacts({
  cards,
  rawManifest,
  rawBulkSha256,
  inventory: archscryInventory,
  previousIndex: previousArchscryIndex,
  acceptSelectionDrift,
  ownerAuthorization,
});
if (archscryMedia.unresolvedReport.unresolved_count) {
  throw new Error(`Archscry governed media projection has ${archscryMedia.unresolvedReport.unresolved_count} unresolved authored card(s).`);
}
if (!checkMode && acceptSelectionDrift && archscryMedia.selectionDrift.length) {
  await mkdir(dirname(selectionDriftReportPath), { recursive: true });
  await writeJson(selectionDriftReportPath, {
    schema_version: "1.0.0",
    owner_authorization: ownerAuthorization,
    change_count: archscryMedia.selectionDrift.length,
    changes: archscryMedia.selectionDrift,
  });
}

const allRecords = sortCards(cards.map((card) => baseCardRecord(card, taxonomyMap)));
let flavorRecords = allRecords.filter((record) =>
  record.flavor_excerpt || (record.card_faces || []).some((face) => face.flavor_excerpt)
);
let guardrailApplied = false;
let guardrailMode = "short-excerpts";
const sourceFlavorRecordCount = flavorRecords.length;
let estimatedFlavorBytes = Buffer.byteLength(JSON.stringify({ cards: flavorRecords }, null, 2), "utf8");
if (estimatedFlavorBytes > MAX_FLAVOR_INDEX_BYTES) {
  guardrailApplied = true;
  guardrailMode = "compact-excerpts";
  flavorRecords = flavorRecords.map(compactFlavorRecord);
  estimatedFlavorBytes = Buffer.byteLength(JSON.stringify({ cards: flavorRecords }, null, 2), "utf8");
}

const commanderRecords = sortCards(cards.filter(isCommanderCandidate).map((card) => ({
  ...baseCardRecord(card, taxonomyMap),
  commander_rule_notes: commanderRuleNotes(card)
})));
const themeFlavorRecords = flavorRecords;

if (estimatedFlavorBytes > MAX_FLAVOR_INDEX_BYTES || flavorRecords.length > MAX_FLAVOR_INDEX_CARDS) {
  guardrailApplied = true;
  guardrailMode = "sampled-derived-display-index";
  flavorRecords = selectFlavorRecordsForGuardrail(flavorRecords, commanderRecords);
  estimatedFlavorBytes = Buffer.byteLength(JSON.stringify({ cards: flavorRecords }, null, 2), "utf8");
}

const sourceMeta = (indexType, extra = {}) => makeSourceMeta(indexType, rawManifest, extra);
const flavorIndex = {
  meta: sourceMeta("card-flavor-index", {
    source_card_count: cards.length,
    source_flavor_card_count: sourceFlavorRecordCount,
    card_count: flavorRecords.length,
    guardrail_applied: guardrailApplied,
    guardrail_mode: guardrailMode,
    max_indexed_cards: MAX_FLAVOR_INDEX_CARDS,
    estimated_pretty_bytes: estimatedFlavorBytes
  }),
  cards: flavorRecords
};
const commanderIndex = {
  meta: sourceMeta("commander-index", {
    source_card_count: cards.length,
    candidate_count: commanderRecords.length,
    commander_legality_note: "V1 detects practical commander candidates from legendary creature type lines and commander-enabling text. It does not attempt perfect legality solving."
  }),
  commanders: commanderRecords
};
const colorThemeIndex = buildColorThemeIndex(themeFlavorRecords, commanderRecords, taxonomyMap, sourceMeta);
const mechanicThemeIndex = buildMechanicThemeIndex(themeFlavorRecords, commanderRecords, taxonomy, sourceMeta);
const indexManifest = {
  meta: sourceMeta("scryfall-index-manifest", {
    source_card_count: cards.length
  }),
  files: [
    { path: "data/scryfall/indexes/card-flavor-index.json", records: flavorRecords.length },
    { path: "data/scryfall/indexes/commander-index.json", records: commanderRecords.length },
    { path: "data/scryfall/indexes/color-theme-index.json", records: colorThemeIndex.themes.length },
    { path: "data/scryfall/indexes/mechanic-theme-index.json", records: mechanicThemeIndex.themes.length }
    ,{ path: `data/scryfall/indexes/${ARCHSCRY_MEDIA_INDEX_FILE}`, records: archscryMedia.index.records.length }
    ,{ path: `data/scryfall/indexes/${ARCHSCRY_MEDIA_MANIFEST_FILE}`, records: 1 }
    ,{ path: `data/scryfall/indexes/${ARCHSCRY_MEDIA_UNRESOLVED_FILE}`, records: archscryMedia.unresolvedReport.unresolved_count }
  ],
  taxonomy: {
    path: "data/taxonomy/vox-mana-tags.json",
    tag_count: taxonomy.tags.length,
    categories: [...new Set(taxonomy.tags.map((entry) => entry.category))].sort()
  },
  guardrails: {
    raw_bulk_committed: false,
    full_oracle_text_committed: false,
    full_flavor_text_committed: false,
    flavor_index_size_guardrail_bytes: MAX_FLAVOR_INDEX_BYTES,
    flavor_index_guardrail_applied: guardrailApplied
  }
};

const generatedFiles = new Map([
  ["card-flavor-index.json", `${JSON.stringify(flavorIndex, null, 2)}\n`],
  ["commander-index.json", `${JSON.stringify(commanderIndex, null, 2)}\n`],
  ["color-theme-index.json", `${JSON.stringify(colorThemeIndex, null, 2)}\n`],
  ["mechanic-theme-index.json", `${JSON.stringify(mechanicThemeIndex, null, 2)}\n`],
  ["scryfall-index-manifest.json", `${JSON.stringify(indexManifest, null, 2)}\n`],
  [ARCHSCRY_MEDIA_INDEX_FILE, archscryMedia.bytes[ARCHSCRY_MEDIA_INDEX_FILE]],
  [ARCHSCRY_MEDIA_MANIFEST_FILE, archscryMedia.bytes[ARCHSCRY_MEDIA_MANIFEST_FILE]],
  [ARCHSCRY_MEDIA_UNRESOLVED_FILE, archscryMedia.bytes[ARCHSCRY_MEDIA_UNRESOLVED_FILE]],
]);

if (checkMode) {
  const stale = [];
  for (const [file, expected] of generatedFiles) {
    let actual = "";
    try { actual = await readFile(join(INDEX_DIR, file), "utf8"); }
    catch (error) { if (error?.code !== "ENOENT") throw error; }
    if (actual !== expected) stale.push(file);
  }
  if (stale.length) throw new Error(`Generated Scryfall indexes are stale: ${stale.join(", ")}`);
} else {
  for (const [file, bytes] of generatedFiles) await writeFile(join(INDEX_DIR, file), bytes, "utf8");
}

console.log(`Indexed ${cards.length.toLocaleString()} oracle cards.`);
console.log(`Flavor records: ${flavorRecords.length.toLocaleString()}${guardrailApplied ? " (slim guardrail applied)" : ""}.`);
console.log(`Commander candidates: ${commanderRecords.length.toLocaleString()}.`);
console.log(`Archscry governed media: ${archscryMedia.index.records.length.toLocaleString()} unique cards across ${archscryInventory.occurrences.length.toLocaleString()} authored occurrences.`);
if (checkMode) console.log("Generated Scryfall index check passed with byte-identical committed artifacts.");

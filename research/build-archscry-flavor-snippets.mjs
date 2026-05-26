import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, "data");
const ScryfallIndexDir = path.join(DATA_DIR, "scryfall", "indexes");
const OUTPUT_PATH = path.join(DATA_DIR, "archscry-flavor-snippets.json");

const MANA_ORDER = ["W", "U", "B", "R", "G"];
const COLLEGE_KEYS = ["LOREHOLD", "PRISMARI", "QUANDRIX", "SILVERQUILL", "WITHERBLOOM"];
const UNSET_CODES = new Set(["unh", "ust", "und", "unf", "cmb1", "cmb2"]);
const CROSSOVER_SET_CODES = new Set([
  "acr",
  "bot",
  "fic",
  "fin",
  "ltc",
  "ltr",
  "pip",
  "spm",
  "tla",
  "tlc",
  "tle",
  "tmt",
  "who",
  "40k",
]);
const COMMON_WORDS = new Set([
  "and", "the", "for", "with", "into", "from", "that", "this", "when", "your", "you",
  "are", "not", "but", "can", "all", "its", "their", "through", "where", "while",
  "color", "colors", "commander", "deck", "faction", "college", "guild",
]);

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeName(value) {
  return normalizeText(value).replace(/\s+/g, " ");
}

function identityKey(colors = []) {
  const set = new Set((colors || []).map((color) => String(color || "").toUpperCase()));
  return MANA_ORDER.filter((color) => set.has(color)).join("");
}

function splitWords(value) {
  return normalizeText(value)
    .split(/\s+/)
    .filter((word) => word.length > 3 && !COMMON_WORDS.has(word));
}

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function textValue(value) {
  if (Array.isArray(value)) return value.map(textValue).join(" ");
  if (value && typeof value === "object") return Object.values(value).map(textValue).join(" ");
  return String(value || "");
}

function detectedTagWords(card) {
  const tags = card?.detected_tags || {};
  return splitWords([
    ...(tags.mechanical || []),
    ...(tags.playstyle || []),
    ...(tags.identity || []),
    ...(card?.lore_tones || []),
  ].join(" "));
}

function factionThemeWords(faction) {
  const compass = faction.commander_compass || {};
  const native = compass.native_fit_commanders || [];
  return new Set(splitWords([
    faction.key,
    faction.name,
    faction.tagline,
    faction.philosophy,
    faction.lore_summary,
    faction.core_tension,
    faction.identity_blend,
    compass.recommendation_philosophy,
    ...(faction.archetypes || []).map((item) => `${item.name || ""} ${item.desc || ""}`),
    ...native.map((candidate) => [
      candidate.why_this_fits,
      candidate.gameplay_summary,
      candidate.archetype_tags?.join(" "),
      candidate.faction_identity_terms?.join(" "),
    ].filter(Boolean).join(" ")),
  ].filter(Boolean).join(" ")));
}

function factionSearchTerms(faction) {
  const isCollege = String(faction?.institution_type || faction?.identity?.expression_kind || "").toLowerCase() === "college";
  return unique([
    faction.key,
    faction.name,
    String(faction.name || "").replace(/\s+(College|Senate|Clans|Conclave|Syndicate|League|Swarm|Combine|Legion)$/i, ""),
    isCollege ? "" : faction.research_links?.edhrec_slug,
    isCollege ? "" : faction.identity?.routing?.label,
  ])
    .map(normalizeText)
    .filter((term) => term.length > 1 && !["mono", "white", "blue", "black", "red", "green"].includes(term));
}

function overlapScore(card, themeWords) {
  return detectedTagWords(card).reduce((score, word) => score + (themeWords.has(word) ? 1 : 0), 0);
}

function includesFactionTerm(card, terms) {
  const haystack = normalizeText([
    card.name,
    card.type_line,
    card.flavor_excerpt,
    card.oracle_excerpt,
    textValue(card.detected_tags),
    textValue(card.lore_tones),
  ].join(" "));
  return terms.some((term) => term && haystack.includes(term));
}

function isUsableFlavorCard(card) {
  const flavor = String(card?.flavor_excerpt || "").trim();
  return Boolean(
    flavor &&
    card?.name &&
    card?.scryfall_uri &&
    !UNSET_CODES.has(String(card.set || "").toLowerCase()) &&
    !CROSSOVER_SET_CODES.has(String(card.set || "").toLowerCase())
  );
}

function cardNameMatches(card, name) {
  const cardKey = normalizeName(card?.name || "");
  const target = normalizeName(name || "");
  return Boolean(
    cardKey &&
    target &&
    (cardKey === target ||
      cardKey.split(" ").join("") === target.split(" ").join("") ||
      cardKey.split(" // ").some((part) => normalizeName(part) === target))
  );
}

function candidateFromCard(card, factionKey, sourceType, score) {
  return {
    faction_key: factionKey,
    card_name: card.name,
    flavor_excerpt: String(card.flavor_excerpt || "").trim(),
    scryfall_uri: card.scryfall_uri,
    source_index: sourceType === "matched_card" ? "card-flavor-index" : "commander-index",
    source_type: sourceType,
    score,
  };
}

function addCandidate(candidates, seen, candidate) {
  const key = normalizeName(`${candidate.card_name} ${candidate.flavor_excerpt}`);
  if (!key || seen.has(key)) return;
  seen.add(key);
  candidates.push(candidate);
}

function resolvedCoreTension(faction, identityLayers) {
  const expressionKey = faction?.identity?.expression_key || faction?.key;
  const expression = identityLayers.expressions?.[expressionKey] || {};
  const color = identityLayers.colors?.[faction?.identity?.core_color || expression.core_color] || {};
  return faction?.core_tension || expression.core_tension || color.core_tension || "";
}

function validateCoreTensions(factions, identityLayers) {
  const missing = [];
  const missingCollegeExpression = [];

  Object.values(factions).forEach((faction) => {
    if (!resolvedCoreTension(faction, identityLayers)) {
      missing.push(faction.key);
    }
  });

  COLLEGE_KEYS.forEach((key) => {
    if (!identityLayers.expressions?.[key]?.core_tension) {
      missingCollegeExpression.push(key);
    }
  });

  if (missing.length || missingCollegeExpression.length) {
    throw new Error([
      missing.length ? `Missing resolved core_tension for: ${missing.join(", ")}` : "",
      missingCollegeExpression.length ? `Missing college expression core_tension for: ${missingCollegeExpression.join(", ")}` : "",
    ].filter(Boolean).join("\n"));
  }
}

function buildSnippetsForFaction({ faction, commanderCards, flavorCards }) {
  const candidates = [];
  const seen = new Set();
  const factionIdentity = identityKey(faction.colors || []);
  const themes = factionThemeWords(faction);
  const terms = factionSearchTerms(faction);
  const nativeNames = (faction.commander_compass?.native_fit_commanders || [])
    .map((candidate) => candidate.exact_card_name || candidate.display_name)
    .filter(Boolean);

  nativeNames.forEach((name, index) => {
    const card = commanderCards.find((candidate) => cardNameMatches(candidate, name));
    if (isUsableFlavorCard(card)) {
      addCandidate(candidates, seen, candidateFromCard(card, faction.key, "native_commander", 300 - index));
    }
  });

  commanderCards
    .filter(isUsableFlavorCard)
    .filter((card) => identityKey(card.color_identity || card.colors || []) === factionIdentity)
    .map((card) => ({
      card,
      score: 150 + overlapScore(card, themes) * 12 + (includesFactionTerm(card, terms) ? 35 : 0),
    }))
    .filter((entry) => entry.score > 150 || candidates.length < 2)
    .sort((a, b) => b.score - a.score || a.card.name.localeCompare(b.card.name))
    .forEach((entry) => {
      addCandidate(candidates, seen, candidateFromCard(entry.card, faction.key, "matched_commander", entry.score));
    });

  flavorCards
    .filter(isUsableFlavorCard)
    .map((card) => {
      const cardIdentity = identityKey(card.color_identity || card.colors || []);
      const exactIdentity = cardIdentity === factionIdentity;
      const factionTerm = includesFactionTerm(card, terms);
      const overlap = overlapScore(card, themes);
      return {
        card,
        score: (factionTerm ? 260 : 0) + (exactIdentity ? 35 : 0) + overlap * 10,
      };
    })
    .filter((entry) => entry.score >= 45)
    .sort((a, b) => b.score - a.score || a.card.name.localeCompare(b.card.name))
    .forEach((entry) => {
      addCandidate(candidates, seen, candidateFromCard(entry.card, faction.key, "matched_card", entry.score));
    });

  const snippets = [];
  candidates
    .sort((a, b) => b.score - a.score || a.card_name.localeCompare(b.card_name))
    .forEach((candidate) => {
      if (snippets.length >= 3) return;
      if (candidate.score >= 180 || snippets.length < 2) {
        const { score, ...snippet } = candidate;
        snippets.push(snippet);
      }
    });

  if (snippets.length < 2) {
    throw new Error(`${faction.key} only resolved ${snippets.length} flavor snippet(s).`);
  }

  return snippets;
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(ROOT, relativePath), "utf8"));
}

async function main() {
  const factionsData = await readJson("data/factions.json");
  const identityLayers = await readJson("data/identity-layers.json");
  const commanderIndex = await readJson("data/scryfall/indexes/commander-index.json");
  const flavorIndex = await readJson("data/scryfall/indexes/card-flavor-index.json");
  const factions = factionsData.factions || {};
  const commanderCards = commanderIndex.commanders || [];
  const flavorCards = flavorIndex.cards || [];

  validateCoreTensions(factions, identityLayers);

  const snippets = Object.fromEntries(
    Object.keys(factions)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => [
        key,
        buildSnippetsForFaction({
          faction: factions[key],
          commanderCards,
          flavorCards,
        }),
      ])
  );

  const output = {
    _meta: {
      generated_by: "research/build-archscry-flavor-snippets.mjs",
      source_indexes: [
        "data/scryfall/indexes/commander-index.json",
        "data/scryfall/indexes/card-flavor-index.json",
      ],
      text_policy: "Uses committed short flavor excerpts only; no flavor text is invented or paraphrased.",
      faction_count: Object.keys(snippets).length,
    },
    snippets,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)} for ${Object.keys(snippets).length} factions.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

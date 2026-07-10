import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUTPUT_DIR = join(ROOT, "data", "scryfall", "grounding");
const OUTPUT_PATH = join(OUTPUT_DIR, "scryfall-grounding.json");
const SCRYFALL_API = "https://api.scryfall.com";
const HEADERS = {
  "Accept": "application/json",
  "User-Agent": "VoxMana/0.1 (https://voxmana.com; local Scryfall grounding)"
};

const CATALOG_ENDPOINTS = {
  cardTypes: "/catalog/card-types",
  supertypes: "/catalog/supertypes",
  creatureTypes: "/catalog/creature-types",
  artifactTypes: "/catalog/artifact-types",
  enchantmentTypes: "/catalog/enchantment-types",
  landTypes: "/catalog/land-types",
  planeswalkerTypes: "/catalog/planeswalker-types",
  spellTypes: "/catalog/spell-types",
  keywordAbilities: "/catalog/keyword-abilities",
  keywordActions: "/catalog/keyword-actions",
  abilityWords: "/catalog/ability-words"
};

const MANUAL_SET_FAMILY_OVERRIDES = [
  {
    id: "spm",
    name: "Spider-Man product family",
    mainSetCode: "spm",
    relatedSetCodes: ["spm", "spe", "aspm", "pspm", "tspm"],
    aliases: [
      "spiderman",
      "spider man",
      "spider-man",
      "marvel spiderman",
      "marvel spider man",
      "marvel's spider-man",
      "marvels spider man"
    ],
    reason: "Scryfall set metadata can expose related Spider-Man releases across multiple set types without a single marketing-family field; this override keeps that known product family together while still requiring fetched canonical set records for each code."
  }
];

async function fetchJson(path, label) {
  const url = `${SCRYFALL_API}${path}`;
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

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, "\"")
    .replace(/&/g, " and ")
    .replace(/['`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bmagic the gathering\b/g, " ")
    .replace(/\buniverses beyond\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactAlias(value) {
  return normalizeKey(value).replace(/\s+/g, "");
}

function addAlias(target, alias, candidate) {
  const normalized = normalizeKey(alias);
  if (!normalized) return;
  if (!target[normalized]) target[normalized] = [];
  if (!target[normalized].some((item) => item.kind === candidate.kind && item.id === candidate.id && item.value === candidate.value)) {
    target[normalized].push(candidate);
  }

  const compact = compactAlias(alias);
  if (compact && compact !== normalized) {
    if (!target[compact]) target[compact] = [];
    if (!target[compact].some((item) => item.kind === candidate.kind && item.id === candidate.id && item.value === candidate.value)) {
      target[compact].push(candidate);
    }
  }
}

function sortedStrings(values = []) {
  return [...new Set(values.filter(Boolean).map(String))]
    .sort((left, right) => left.localeCompare(right));
}

function normalizeCatalog(payload, label) {
  if (!payload || payload.object !== "catalog" || !Array.isArray(payload.data)) {
    throw new Error(`${label} did not return a Scryfall catalog payload.`);
  }
  return sortedStrings(payload.data);
}

function normalizeSet(set) {
  return {
    code: String(set.code || "").toLowerCase(),
    mtgoCode: set.mtgo_code || "",
    arenaCode: set.arena_code || "",
    name: set.name || "",
    setType: set.set_type || "",
    parentSetCode: set.parent_set_code ? String(set.parent_set_code).toLowerCase() : "",
    releasedAt: set.released_at || "",
    cardCount: Number.isFinite(set.card_count) ? set.card_count : 0,
    digital: Boolean(set.digital),
    nonfoilOnly: Boolean(set.nonfoil_only),
    foilOnly: Boolean(set.foil_only),
    scryfallUri: set.scryfall_uri || "",
    uri: set.uri || "",
    iconSvgUri: set.icon_svg_uri || ""
  };
}

function validateSets(payload) {
  if (!payload || payload.object !== "list" || !Array.isArray(payload.data)) {
    throw new Error("Scryfall sets endpoint did not return a list payload.");
  }
  const sets = payload.data.map(normalizeSet).filter((set) => set.code && set.name);
  if (!sets.length) {
    throw new Error("Scryfall sets endpoint returned no usable set records.");
  }
  return sets.sort((left, right) => left.code.localeCompare(right.code));
}

function createBaseFamilies(setsByCode) {
  const groups = new Map();
  Object.values(setsByCode).forEach((set) => {
    const id = set.parentSetCode || set.code;
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(set);
  });

  const families = {};
  for (const [id, members] of groups) {
    const main = setsByCode[id] || members.find((set) => !set.parentSetCode) || members[0];
    const memberCodes = members.map((set) => set.code);
    families[id] = {
      id,
      name: `${main.name} product family`,
      displayName: main.name,
      mainSetCode: main.code,
      setCodes: orderFamilyCodes(memberCodes, main.code),
      aliases: buildSetAliases(main, members),
      source: "scryfall-parent-set-code"
    };
  }
  return families;
}

function orderFamilyCodes(codes, mainCode) {
  const uniqueCodes = [...new Set(codes.filter(Boolean).map((code) => code.toLowerCase()))];
  return [
    ...uniqueCodes.filter((code) => code === mainCode),
    ...uniqueCodes.filter((code) => code !== mainCode).sort((left, right) => left.localeCompare(right))
  ];
}

function buildSetAliases(main, members) {
  const aliases = new Set([main.code, main.name, normalizeKey(main.name)]);
  members.forEach((set) => {
    aliases.add(set.code);
    aliases.add(set.name);
    aliases.add(normalizeKey(set.name));
    simplifiedSetNameAliases(set.name).forEach((alias) => aliases.add(alias));
  });
  return sortedStrings([...aliases].map(normalizeKey).filter(Boolean));
}

function simplifiedSetNameAliases(name) {
  const normalized = normalizeKey(name);
  const aliases = new Set([normalized]);
  const withoutPrefixes = normalized
    .replace(/\bmagic the gathering\b/g, " ")
    .replace(/\buniverses beyond\b/g, " ")
    .replace(/\bcommander\b/g, " ")
    .replace(/\bpromos?\b/g, " ")
    .replace(/\btokens?\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (withoutPrefixes) aliases.add(withoutPrefixes);
  if (withoutPrefixes.includes("spider man")) aliases.add(withoutPrefixes.replace(/\bspider man\b/g, "spiderman"));
  return [...aliases].filter(Boolean);
}

function applyManualFamilyOverrides(families, setsByCode) {
  const applied = [];
  MANUAL_SET_FAMILY_OVERRIDES.forEach((override) => {
    const codesPresent = override.relatedSetCodes
      .map((code) => code.toLowerCase())
      .filter((code) => setsByCode[code]);
    const missingCodes = override.relatedSetCodes
      .map((code) => code.toLowerCase())
      .filter((code) => !setsByCode[code]);
    if (!codesPresent.length) {
      applied.push({ ...override, appliedSetCodes: [], missingCodes, skipped: true });
      return;
    }

    const mainCode = setsByCode[override.mainSetCode] ? override.mainSetCode : codesPresent[0];
    families[override.id] = {
      id: override.id,
      name: override.name,
      displayName: setsByCode[mainCode]?.name || override.name,
      mainSetCode: mainCode,
      setCodes: codesPresent,
      aliases: sortedStrings([
        ...(families[override.id]?.aliases || []),
        ...override.aliases,
        ...(codesPresent.map((code) => setsByCode[code]?.name).filter(Boolean)),
        ...codesPresent
      ].map(normalizeKey).filter(Boolean)),
      source: "manual-override"
    };
    applied.push({ ...override, appliedSetCodes: codesPresent, missingCodes, skipped: false });
  });
  return applied;
}

function buildNameIndexes(setsByCode) {
  const byNormalizedName = {};
  Object.values(setsByCode).forEach((set) => {
    const aliases = [set.name, normalizeKey(set.name), ...simplifiedSetNameAliases(set.name)];
    aliases.forEach((alias) => {
      const key = normalizeKey(alias);
      if (!key) return;
      if (!byNormalizedName[key]) byNormalizedName[key] = [];
      if (!byNormalizedName[key].includes(set.code)) byNormalizedName[key].push(set.code);
    });
  });
  Object.keys(byNormalizedName).forEach((key) => {
    byNormalizedName[key] = byNormalizedName[key].sort((left, right) => left.localeCompare(right));
  });
  return byNormalizedName;
}

function buildAliasIndex(catalogs, setsByCode, setFamilies) {
  const aliases = {};
  const typeCatalogs = [
    ["cardType", "cardTypes"],
    ["supertype", "supertypes"],
    ["subtype", "creatureTypes"],
    ["subtype", "artifactTypes"],
    ["subtype", "enchantmentTypes"],
    ["subtype", "landTypes"],
    ["subtype", "planeswalkerTypes"],
    ["subtype", "spellTypes"]
  ];

  typeCatalogs.forEach(([kind, catalogKey]) => {
    (catalogs[catalogKey] || []).forEach((value) => {
      const candidate = { kind: "typeLine", catalog: catalogKey, value };
      addAlias(aliases, value, candidate);
      pluralAliases(value).forEach((alias) => addAlias(aliases, alias, candidate));
    });
  });

  ["keywordAbilities", "keywordActions", "abilityWords"].forEach((catalogKey) => {
    (catalogs[catalogKey] || []).forEach((value) => {
      addAlias(aliases, value, { kind: "keyword", catalog: catalogKey, value });
    });
  });

  Object.values(setsByCode).forEach((set) => {
    addAlias(aliases, set.code, { kind: "set", id: set.code, value: set.name });
    addAlias(aliases, set.name, { kind: "set", id: set.code, value: set.name });
  });

  Object.values(setFamilies).forEach((family) => {
    family.aliases.forEach((alias) => {
      addAlias(aliases, alias, { kind: "setFamily", id: family.id, value: family.name });
    });
    if (normalizeKey(family.displayName).includes("marvel")) {
      addAlias(aliases, "marvel", { kind: "setFamily", id: family.id, value: family.name });
    }
  });

  return sortObject(aliases);
}

function pluralAliases(value) {
  const word = normalizeKey(value);
  if (!word || word.includes(" ")) return [];
  if (word.endsWith("y")) return [`${word.slice(0, -1)}ies`];
  if (word.endsWith("s")) return [word];
  if (/(ch|sh|x|z)$/.test(word)) return [`${word}es`];
  return [`${word}s`];
}

function sortObject(object) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => left.localeCompare(right)));
}

function deepSort(value) {
  if (Array.isArray(value)) return value.map(deepSort);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, deepSort(child)])
  );
}

const catalogEntries = await Promise.all(
  Object.entries(CATALOG_ENDPOINTS).map(async ([key, endpoint]) => {
    const payload = await fetchJson(endpoint, `Scryfall ${key}`);
    return [key, normalizeCatalog(payload, key)];
  })
);
const catalogs = Object.fromEntries(catalogEntries);

const sets = validateSets(await fetchJson("/sets", "Scryfall sets"));
const setsByCode = Object.fromEntries(sets.map((set) => [set.code, set]));
const setFamilies = createBaseFamilies(setsByCode);
const manualOverrides = applyManualFamilyOverrides(setFamilies, setsByCode);

const artifact = deepSort({
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  sources: {
    apiBase: SCRYFALL_API,
    catalogs: CATALOG_ENDPOINTS,
    sets: "/sets"
  },
  catalogs,
  sets: {
    byCode: setsByCode,
    byNormalizedName: buildNameIndexes(setsByCode)
  },
  setFamilies,
  aliases: buildAliasIndex(catalogs, setsByCode, setFamilies),
  manualOverrides: {
    setFamilies: manualOverrides.map((override) => ({
      id: override.id,
      name: override.name,
      mainSetCode: override.mainSetCode,
      relatedSetCodes: override.relatedSetCodes,
      appliedSetCodes: override.appliedSetCodes,
      missingCodes: override.missingCodes,
      skipped: override.skipped,
      reason: override.reason
    }))
  }
});

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");

console.log(`Wrote Scryfall grounding artifact with ${sets.length.toLocaleString()} sets.`);
console.log("Artifact: data/scryfall/grounding/scryfall-grounding.json");

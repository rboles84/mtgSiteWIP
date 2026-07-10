import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = process.env.VOX_MANA_REPO_ROOT || path.resolve(scriptDir, "../../..");
const inputPath = process.env.V3_INPUT_PATH || path.join(repoRoot, "docs/research/archive/Data.xlsx");
const outputDir = path.join(repoRoot, "outputs/mtgdata-v3-enhanced");
const outputPath = process.env.V3_OUTPUT_PATH || path.join(outputDir, "MTGDataV3_Enhanced.xlsx");
const qaDir = path.join(outputDir, "qa");

const sourcePaths = {
  workbook: inputPath,
  strategium: "assets/js/strategium.js",
  tags: "data/taxonomy/vox-mana-tags.json",
  preconThemes: "data/taxonomy/vox-mana-precon-themes.json",
  identityLayers: "data/identity-layers.json",
  precons: "data/precons/vox-mana-precons.source.json",
  grounding: "data/scryfall/grounding/scryfall-grounding.json",
  semantics: "data/scryfall/grounding/plain-reading-semantics.json",
  loomDecision: "docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md"
};

const identityNameProfilePaths = {
  WU: "data/raw-factions/azorius_senate/azorius_senate.profile.json",
  UB: "data/raw-factions/house_dimir/house_dimir.profile.json",
  BR: "data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json",
  RG: "data/raw-factions/gruul_clans/gruul_clans.profile.json",
  WG: "data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json",
  WB: "data/raw-factions/orzhov_syndicate/orzhov_syndicate.profile.json",
  UR: "data/raw-factions/izzet_league/izzet_league.profile.json",
  BG: "data/raw-factions/golgari_swarm/golgari_swarm.profile.json",
  UG: "data/raw-factions/simic_combine/simic_combine.profile.json",
  WR: "data/raw-factions/boros_legion/boros_legion.profile.json",
  LOREHOLD: "data/raw-factions/lorehold/lorehold.profile.json",
  PRISMARI: "data/raw-factions/prismari/prismari.profile.json",
  QUANDRIX: "data/raw-factions/quandrix/quandrix.profile.json",
  SILVERQUILL: "data/raw-factions/silverquill/silverquill.profile.json",
  WITHERBLOOM: "data/raw-factions/witherbloom/witherbloom.profile.json"
};

const readJson = async (relPath) => JSON.parse(await fs.readFile(path.join(repoRoot, relPath), "utf8"));
const join = (value) => Array.isArray(value) ? value.filter(Boolean).join("; ") : value ?? "";
const clean = (value) => {
  if (value == null) return "";
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return join(value);
  if (typeof value === "object") return JSON.stringify(value);
  return value;
};
const normalize = (value) => String(value ?? "")
  .toLowerCase()
  .replace(/[’]/g, "'")
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9+]+/g, " ")
  .trim()
  .replace(/\s+/g, " ");
const slugify = (value) => normalize(value).replace(/[^a-z0-9+]+/g, "-").replace(/^-|-$/g, "");
const esc = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function colName(index) {
  let n = index + 1;
  let out = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    out = String.fromCharCode(65 + r) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

function rangeAddress(startRow, startCol, rowCount, colCount) {
  const endRow = startRow + rowCount;
  const endCol = startCol + colCount - 1;
  return `${colName(startCol)}${startRow + 1}:${colName(endCol)}${endRow}`;
}

function rectangular(rows) {
  const maxCols = Math.max(1, ...rows.map((row) => row.length));
  return rows.map((row) => {
    const normalizedRow = row.map(clean);
    while (normalizedRow.length < maxCols) normalizedRow.push("");
    return normalizedRow;
  });
}

function safeStyle(fn) {
  try {
    fn();
  } catch {
    // Styling should never block data creation.
  }
}

function writeRows(sheet, rows, options = {}) {
  const data = rectangular(rows);
  const rowCount = data.length;
  const colCount = data[0].length;
  const used = sheet.getRangeByIndexes(0, 0, rowCount, colCount);
  used.values = data;
  safeStyle(() => { sheet.showGridLines = false; });
  safeStyle(() => { sheet.freezePanes.freezeRows(options.freezeRows ?? 1); });
  safeStyle(() => {
    sheet.getRangeByIndexes(0, 0, 1, colCount).format = {
      fill: "#243447",
      font: { bold: true, color: "#FFFFFF" },
      wrapText: true
    };
  });
  safeStyle(() => {
    used.format = {
      font: { name: "Aptos", size: 10 },
      wrapText: true,
      borders: { preset: "outside", style: "thin", color: "#D8DEE9" }
    };
  });
  safeStyle(() => used.format.autofitColumns());
  safeStyle(() => used.format.autofitRows());
  if (options.tableName && rowCount > 1) {
    safeStyle(() => {
      const table = sheet.tables.add(rangeAddress(0, 0, rowCount, colCount), true, options.tableName);
      table.style = "TableStyleMedium2";
      table.showFilterButton = true;
    });
  }
}

function appendColumns(workbook, sheetName, startCol, rows, fill = "#44546A") {
  const sheet = workbook.worksheets.getItem(sheetName);
  const data = rectangular(rows);
  const range = sheet.getRangeByIndexes(0, startCol, data.length, data[0].length);
  range.values = data;
  safeStyle(() => { sheet.freezePanes.freezeRows(1); });
  safeStyle(() => {
    sheet.getRangeByIndexes(0, startCol, 1, data[0].length).format = {
      fill,
      font: { bold: true, color: "#FFFFFF" },
      wrapText: true
    };
  });
  safeStyle(() => {
    range.format = {
      font: { name: "Aptos", size: 10 },
      wrapText: true,
      borders: { preset: "outside", style: "thin", color: "#D8DEE9" }
    };
  });
  safeStyle(() => range.format.autofitColumns());
  safeStyle(() => range.format.autofitRows());
}

function getValues(workbook, sheetName) {
  const sheet = workbook.worksheets.getItem(sheetName);
  return sheet.getUsedRange().values.map((row) => row.map((cell) => cell ?? ""));
}

function parseStrategiumEntries(jsText) {
  const start = jsText.indexOf("const archetypeEntries = [");
  if (start < 0) return [];
  const arrayStart = jsText.indexOf("[", start);
  const arrayEnd = jsText.indexOf("\n];", arrayStart);
  const literal = jsText.slice(arrayStart, arrayEnd + 2);
  return vm.runInNewContext(`(${literal})`, {}, { timeout: 1000 });
}

function buildIndexes({ tags, themes, semantics, strategiumEntries }) {
  const tagByNorm = new Map();
  for (const tag of tags) {
    const keys = [tag.tag, tag.display_name, ...(tag.aliases || [])];
    for (const key of keys) tagByNorm.set(normalize(key), tag);
  }

  const themeByNorm = new Map();
  for (const theme of themes) {
    const keys = [theme.key, theme.display_name, ...(theme.aliases || []), ...(theme.match_terms || [])];
    for (const key of keys) themeByNorm.set(normalize(key), theme);
  }

  const semanticByNorm = new Map();
  for (const item of semantics) {
    const keys = [item.id, item.label, ...(item.triggers || [])];
    for (const key of keys) semanticByNorm.set(normalize(key), item);
  }

  const strategiumByNorm = new Map();
  for (const entry of strategiumEntries) {
    const keys = [entry.id, entry.name, ...(entry.aliases || [])];
    for (const key of keys) strategiumByNorm.set(normalize(key), entry);
  }
  return { tagByNorm, themeByNorm, semanticByNorm, strategiumByNorm };
}

function matchMany(index, terms, mapper = (x) => x.display_name || x.label || x.name || x.key || x.id || x.tag) {
  const seen = new Set();
  const matches = [];
  for (const term of terms.filter(Boolean)) {
    const direct = index.get(normalize(term));
    if (direct) {
      const label = mapper(direct);
      if (!seen.has(label)) {
        seen.add(label);
        matches.push(label);
      }
    }
  }
  return matches;
}

function catalogStatus(term, catalog) {
  const normTerm = normalize(term);
  return catalog.some((item) => normalize(item) === normTerm) ? "In Scryfall grounding catalog" : "Workbook-only / review";
}

function catalogKinds(term, catalogs) {
  const normTerm = normalize(term);
  const kinds = [];
  for (const [label, values] of Object.entries(catalogs)) {
    if (values.some((value) => normalize(value) === normTerm)) kinds.push(label);
  }
  return kinds;
}

function cardTypeCatalogGroup(category) {
  const map = {
    "Card Type": "cardTypes",
    "Supertype": "supertypes",
    "Artifact Type": "artifactTypes",
    "Enchantment Type": "enchantmentTypes",
    "Land Type": "landTypes",
    "Spell Type": "spellTypes"
  };
  return map[category] || "";
}

function findSemanticsForTerms(terms, semanticByNorm) {
  return matchMany(semanticByNorm, terms, (x) => x.label);
}

function findTagsForTerms(terms, tagByNorm) {
  return matchMany(tagByNorm, terms, (x) => x.display_name);
}

function findThemesForTerms(terms, themeByNorm) {
  return matchMany(themeByNorm, terms, (x) => x.display_name);
}

function queryFragmentsForTerms(terms, semanticByNorm) {
  const matched = [];
  const seen = new Set();
  for (const term of terms.filter(Boolean)) {
    const item = semanticByNorm.get(normalize(term));
    if (!item) continue;
    const fragments = join(item.fragments || []);
    if (fragments && !seen.has(fragments)) {
      seen.add(fragments);
      matched.push(fragments);
    }
  }
  return matched;
}

function makeSourceMapRows() {
  return [
    ["Source / Sheet", "Kind", "Role In V3 Workbook", "Canonical Status", "Update Rule", "Notes"],
    ["MTGDataV2.xlsx", "Workbook", "Preserved original worksheet data and base taxonomy", "Reference/staging", "Do not overwrite original; use V3 copy for enrichment", sourcePaths.workbook],
    ["data/scryfall/grounding/scryfall-grounding.json", "Generated JSON", "Official catalog grounding crosswalk", "Generated; not hand-authored", "Regenerate via Scryfall grounding pipeline", sourcePaths.grounding],
    ["data/scryfall/grounding/plain-reading-semantics.json", "Curated JSON", "Player-language concepts to deterministic query fragments", "Curated support registry", "Update when supported Commander phrases need mapping", sourcePaths.semantics],
    ["assets/js/strategium.js", "Runtime JS data", "Strategium archetype education and table-read metadata", "Route-local curated product data", "Keep aligned with Strategium route decisions", sourcePaths.strategium],
    ["data/taxonomy/vox-mana-tags.json", "Curated JSON", "Vox Mana interpretation layer for mechanics and play patterns", "Canonical curated taxonomy", "Source-first updates only", sourcePaths.tags],
    ["data/taxonomy/vox-mana-precon-themes.json", "Curated JSON", "Normalized Commander precon theme language", "Canonical curated taxonomy", "Run precon build after source changes", sourcePaths.preconThemes],
    ["data/identity-layers.json", "Curated JSON", "37 active identity expressions and preview metadata", "Canonical identity registry", "Keep 37-expression contract intact", sourcePaths.identityLayers],
    ["data/raw-factions/*.profile.json", "Curated JSON", "Fallback display names for identity rows missing top-level names", "Canonical source profiles", "Use only for display-name fill; do not infer new identity behavior", join(Object.values(identityNameProfilePaths))],
    ["data/precons/vox-mana-precons.source.json", "Curated JSON", "155 source-backed Commander precon rows", "Canonical precon source", "Workbook remains staging/reference, not runtime input", sourcePaths.precons],
    ["docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md", "Decision doc", "Approved first Loom concept seed", "Approved product decision", "Expand after first slice stabilizes", sourcePaths.loomDecision]
  ];
}

async function loadIdentityNameSources() {
  const sources = new Map();
  await Promise.all(Object.entries(identityNameProfilePaths).map(async ([key, relPath]) => {
    const profile = await readJson(relPath);
    if (profile.faction_name) {
      sources.set(key, {
        name: profile.faction_name,
        source: relPath
      });
    }
  }));
  return sources;
}

function resolveIdentityName(item, nameSources) {
  if (item.name) {
    return {
      name: item.name,
      source: "data/identity-layers.json:name"
    };
  }
  if (item.display?.name) {
    return {
      name: item.display.name,
      source: "data/identity-layers.json:display.name"
    };
  }
  const fallback = nameSources.get(item.key);
  if (fallback) return fallback;
  return {
    name: "",
    source: "missing in identity registry and profile fallback"
  };
}

function makeReadmeRows(counts) {
  return [
    ["MTGDataV3 Enhanced Workbook", "", "", ""],
    ["Created", "2026-07-05", "Original Preserved", "Yes: MTGDataV2.xlsx was read only"],
    ["Purpose", "Enrich MTG taxonomy data with Vox Mana Strategium, Scryfall grounding, identity, precon, tag, and Loom crosswalks.", "", ""],
    ["Workbook Counts", "Original sheets", counts.originalSheets, "Enhanced/new sheets are appended after the original workbook data"],
    ["Workbook Counts", "Strategium archetypes", counts.strategium, "50 route-local archetypes"],
    ["Workbook Counts", "Vox Mana tags", counts.tags, "Curated tag interpretation layer"],
    ["Workbook Counts", "Precons", counts.precons, "Canonical source-backed Commander precons"],
    ["Workbook Counts", "Identity expressions", counts.identities, "Active 37-expression registry"],
    ["Workbook Counts", "Plain Reading semantics", counts.semantics, "Player-language query semantics"],
    ["Workbook Counts", "Scryfall catalog rows", counts.scryfallCrosswalk, "Grounding catalog crosswalk rows"],
    ["How To Use", "Start with DeckArchetypes and Strategium_Archetypes for Commander-facing archetype planning.", "", ""],
    ["How To Use", "Use Scryfall_Crosswalk for official catalog facts; use VoxMana_Tags for interpretation.", "", ""],
    ["Guardrail", "Generated Scryfall grounding is not hand-edited from this workbook.", "", ""],
    ["Guardrail", "Workbook enrichments are staging/reference unless promoted through the repo's source-first data flow.", "", ""]
  ];
}

function buildScryfallCrosswalk(catalogs, originalSets) {
  const catalogToSheet = {
    creatureTypes: "CreatureTypes",
    keywordAbilities: "Keywords",
    keywordActions: "KeywordActions",
    abilityWords: "AbilityWords",
    cardTypes: "CardTypes",
    supertypes: "CardTypes",
    artifactTypes: "CardTypes",
    enchantmentTypes: "CardTypes",
    landTypes: "CardTypes",
    planeswalkerTypes: "PlaneswalkerTypes",
    spellTypes: "CardTypes"
  };
  const rows = [["Catalog", "Term", "Normalized Term", "Workbook Sheet", "Workbook Status", "Source", "Notes"]];
  for (const [catalog, terms] of Object.entries(catalogs)) {
    if (!Array.isArray(terms)) continue;
    for (const term of terms) {
      const sheet = catalogToSheet[catalog] || "";
      const originalSet = originalSets[catalog] || new Set();
      rows.push([
        catalog,
        term,
        normalize(term),
        sheet,
        originalSet.has(normalize(term)) ? "Present in MTGDataV2" : "Grounding-only / candidate expansion",
        sourcePaths.grounding,
        "Official Scryfall catalog fact from generated grounding artifact"
      ]);
    }
  }
  return rows;
}

function main() {
  return (async () => {
    await fs.mkdir(outputDir, { recursive: true });
    await fs.mkdir(qaDir, { recursive: true });

    const [
      tagsJson,
      themesJson,
      identityJson,
      preconsJson,
      groundingJson,
      semanticsJson,
      strategiumJs
    ] = await Promise.all([
      readJson(sourcePaths.tags),
      readJson(sourcePaths.preconThemes),
      readJson(sourcePaths.identityLayers),
      readJson(sourcePaths.precons),
      readJson(sourcePaths.grounding),
      readJson(sourcePaths.semantics),
      fs.readFile(path.join(repoRoot, sourcePaths.strategium), "utf8")
    ]);

    const tags = tagsJson.tags || [];
    const themes = themesJson.themes || [];
    const identities = Object.values(identityJson.expressions || {}).filter((x) => x.active);
    const precons = preconsJson.precons || [];
    const catalogs = groundingJson.catalogs || {};
    const semantics = semanticsJson.entries || [];
    const strategiumEntries = parseStrategiumEntries(strategiumJs);
    const indexes = buildIndexes({ tags, themes, semantics, strategiumEntries });
    const identityNameSources = await loadIdentityNameSources();

    const input = await FileBlob.load(inputPath);
    const workbook = await SpreadsheetFile.importXlsx(input);

    const originalValues = {
      CreatureTypes: getValues(workbook, "CreatureTypes"),
      Keywords: getValues(workbook, "Keywords"),
      AbilityWords: getValues(workbook, "AbilityWords"),
      KeywordActions: getValues(workbook, "KeywordActions"),
      CardTypes: getValues(workbook, "CardTypes"),
      PlaneswalkerTypes: getValues(workbook, "PlaneswalkerTypes"),
      ColorPie: getValues(workbook, "ColorPie"),
      DeckArchetypes: getValues(workbook, "DeckArchetypes")
    };

    const originalSets = {
      creatureTypes: new Set(originalValues.CreatureTypes.flat().filter(Boolean).map(normalize)),
      abilityWords: new Set(originalValues.AbilityWords.slice(1).flat().filter(Boolean).map(normalize)),
      keywordActions: new Set(originalValues.KeywordActions.slice(1).map((row) => row[1]).filter(Boolean).map(normalize)),
      planeswalkerTypes: new Set(originalValues.PlaneswalkerTypes.slice(1).flat().filter(Boolean).map(normalize)),
      cardTypes: new Set(originalValues.CardTypes.slice(1).map((row) => row[1]).filter(Boolean).map(normalize)),
      supertypes: new Set(originalValues.CardTypes.slice(1).filter((row) => row[0] === "Supertype").map((row) => normalize(row[1]))),
      artifactTypes: new Set(originalValues.CardTypes.slice(1).filter((row) => row[0] === "Artifact Type").map((row) => normalize(row[1]))),
      enchantmentTypes: new Set(originalValues.CardTypes.slice(1).filter((row) => row[0] === "Enchantment Type").map((row) => normalize(row[1]))),
      landTypes: new Set(originalValues.CardTypes.slice(1).filter((row) => row[0] === "Land Type").map((row) => normalize(row[1]))),
      spellTypes: new Set(originalValues.CardTypes.slice(1).filter((row) => row[0] === "Spell Type").map((row) => normalize(row[1])))
    };

    const deckAppendRows = [[
      "Strategium ID",
      "Strategium Family",
      "Axis",
      "Table Group",
      "Difficulty",
      "Beginner Friendly",
      "Strategium Summary",
      "Aliases",
      "Vox Mana Tag Matches",
      "Precon Theme Match",
      "Plain Reading Semantic Match",
      "Enhancement Notes"
    ]];
    for (const row of originalValues.DeckArchetypes.slice(1)) {
      const archetype = row[1] || "";
      const entry = indexes.strategiumByNorm.get(normalize(archetype));
      const terms = [archetype, entry?.id, entry?.name, ...(entry?.aliases || [])];
      deckAppendRows.push([
        entry?.id || "",
        entry?.family || "workbook-only",
        entry?.axis || "",
        entry?.tableGroup || "",
        entry?.difficulty || "",
        entry?.beginnerFriendly || "",
        entry?.summary || "",
        join(entry?.aliases || []),
        join(findTagsForTerms(terms, indexes.tagByNorm)),
        join(findThemesForTerms(terms, indexes.themeByNorm)),
        join(findSemanticsForTerms(terms, indexes.semanticByNorm)),
        entry ? "Matched to Strategium archetype library" : "Workbook-only archetype; review before promoting to Strategium"
      ]);
    }
    appendColumns(workbook, "DeckArchetypes", 10, deckAppendRows, "#3B5F62");

    const keywordAppendRows = [["Scryfall Catalog Match", "Catalog Kind", "Vox Mana Tag Match", "Plain Reading Semantic Match", "Query Fragment", "Commander / Vox Mana Use"]];
    for (const row of originalValues.Keywords.slice(1)) {
      const keyword = row[1] || "";
      const terms = [keyword];
      const kinds = catalogKinds(keyword, {
        keywordAbilities: catalogs.keywordAbilities || [],
        keywordActions: catalogs.keywordActions || [],
        abilityWords: catalogs.abilityWords || []
      });
      keywordAppendRows.push([
        kinds.length ? "Matched" : "Review",
        join(kinds),
        join(findTagsForTerms(terms, indexes.tagByNorm)),
        join(findSemanticsForTerms(terms, indexes.semanticByNorm)),
        join(queryFragmentsForTerms(terms, indexes.semanticByNorm)),
        kinds.length ? "Use as official term grounding; add Vox Mana interpretation only in crosswalk sheets" : "Potential player-language or non-catalog term; review against Plain Reading semantics"
      ]);
    }
    appendColumns(workbook, "Keywords", 3, keywordAppendRows, "#4F6F52");

    const abilityAppendRows = [["Scryfall Catalog Status", "Plain Reading Semantic Match", "Vox Mana Tag Match", "Notes"]];
    for (const row of originalValues.AbilityWords.slice(1)) {
      const term = row[0] || "";
      abilityAppendRows.push([
        catalogStatus(term, catalogs.abilityWords || []),
        join(findSemanticsForTerms([term], indexes.semanticByNorm)),
        join(findTagsForTerms([term], indexes.tagByNorm)),
        catalogStatus(term, catalogs.abilityWords || []).startsWith("In") ? "Official ability-word grounding" : "Workbook-only / silver-border / variant-style or review term"
      ]);
    }
    appendColumns(workbook, "AbilityWords", 1, abilityAppendRows, "#6D5E89");

    const actionAppendRows = [["Scryfall Catalog Status", "Plain Reading Semantic Match", "Vox Mana Tag Match", "Notes"]];
    for (const row of originalValues.KeywordActions.slice(1)) {
      const term = row[1] || "";
      actionAppendRows.push([
        catalogStatus(term, catalogs.keywordActions || []),
        join(findSemanticsForTerms([term], indexes.semanticByNorm)),
        join(findTagsForTerms([term], indexes.tagByNorm)),
        catalogStatus(term, catalogs.keywordActions || []).startsWith("In") ? "Official keyword-action grounding" : "Workbook-only / review against current Scryfall catalog"
      ]);
    }
    appendColumns(workbook, "KeywordActions", 2, actionAppendRows, "#6F4E37");

    const cardTypeAppendRows = [["Scryfall Catalog Status", "Scryfall Catalog Group", "Commander / Vox Mana Use", "Notes"]];
    for (const row of originalValues.CardTypes.slice(1)) {
      const category = row[0] || "";
      const term = row[1] || "";
      const group = cardTypeCatalogGroup(category);
      const catalog = catalogs[group] || [];
      cardTypeAppendRows.push([
        group ? catalogStatus(term, catalog) : "Review",
        group,
        category.includes("Type") ? "Use for search filters, grounding, and taxonomy crosswalks" : "Use as a rules/category grounding term",
        group ? `Mapped by workbook category "${category}"` : "No direct grounding category mapped"
      ]);
    }
    appendColumns(workbook, "CardTypes", 2, cardTypeAppendRows, "#355C7D");

    const colorPieAppendRows = [["Vox Mana Tag Matches", "Identity Layer Relevance", "Archetype Fit Notes"]];
    for (const row of originalValues.ColorPie.slice(1)) {
      const ability = row[0] || "";
      const primary = row[1] || "";
      const terms = [ability, ...String(ability).split(/[\/,;]+/)];
      colorPieAppendRows.push([
        join(findTagsForTerms(terms, indexes.tagByNorm)),
        primary ? `Primary: ${primary}` : "Review primary color assignment",
        "Candidate bridge into archetype and identity sheets; verify before using as Commander advice"
      ]);
    }
    appendColumns(workbook, "ColorPie", 5, colorPieAppendRows, "#5A6A85");

    const creatureRows = [["Creature Type", "Normalized Name", "Scryfall Catalog Status", "Typal Relevance", "Precon Refs", "Archetype Links", "Vox Mana Notes", "Source"]];
    const preconsByCreature = new Map();
    for (const precon of precons) {
      const focus = precon.creatureTypeFocus;
      if (!focus) continue;
      const key = normalize(focus);
      if (!preconsByCreature.has(key)) preconsByCreature.set(key, []);
      preconsByCreature.get(key).push(precon.deckName);
    }
    for (const row of originalValues.CreatureTypes) {
      const term = row[0] || "";
      const preconRefs = preconsByCreature.get(normalize(term)) || [];
      const archetypeLinks = normalize(term).includes("dragon") ? "Dragons / Typal" : preconRefs.length ? "Typal" : "";
      creatureRows.push([
        term,
        normalize(term),
        catalogStatus(term, catalogs.creatureTypes || []),
        preconRefs.length ? "Validated precon focus appears in Vox Mana source data" : "Candidate typal axis; validate before using as deck guidance",
        join(preconRefs.slice(0, 12)),
        archetypeLinks,
        "Use as creature type fact; Vox Mana interpretation belongs in tags/archetype crosswalks",
        sourcePaths.grounding
      ]);
    }

    const scryfallCrosswalkRows = buildScryfallCrosswalk(catalogs, originalSets);
    const tagRows = [["Tag", "Display Name", "Category", "Aliases", "Canonical Definition", "Vox Mana Interpretation", "Table Feel", "Player Fantasy", "Typical Actions", "New Player Note", "Adjacent Tags", "Source"]];
    for (const tag of tags) {
      tagRows.push([tag.tag, tag.display_name, tag.category, join(tag.aliases), tag.canonical_definition, tag.vox_mana_interpretation, tag.table_feel, tag.player_fantasy, join(tag.typical_actions), tag.new_player_note, join(tag.adjacent_tags), sourcePaths.tags]);
    }

    const strategiumRows = [["ID", "Name", "Subtitle", "Summary", "Likely Colors", "Difficulty", "Table Read", "Table Group", "Axis", "Family", "Beginner Friendly", "Aliases", "Source"]];
    for (const entry of strategiumEntries) {
      strategiumRows.push([entry.id, entry.name, entry.subtitle, entry.summary, entry.colors, entry.difficulty, entry.tableRead, entry.tableGroup, entry.axis, entry.family, entry.beginnerFriendly, join(entry.aliases), sourcePaths.strategium]);
    }

    const archetypeCrosswalkRows = [["Workbook Archetype", "Strategium Status", "Strategium ID", "Strategium Family", "Vox Mana Tags", "Precon Theme", "Plain Reading Semantic", "Query Fragments", "Notes"]];
    for (const row of originalValues.DeckArchetypes.slice(1)) {
      const archetype = row[1] || "";
      const entry = indexes.strategiumByNorm.get(normalize(archetype));
      const terms = [archetype, entry?.id, entry?.name, ...(entry?.aliases || [])];
      archetypeCrosswalkRows.push([
        archetype,
        entry ? "Strategium matched" : "Workbook-only",
        entry?.id || "",
        entry?.family || "",
        join(findTagsForTerms(terms, indexes.tagByNorm)),
        join(findThemesForTerms(terms, indexes.themeByNorm)),
        join(findSemanticsForTerms(terms, indexes.semanticByNorm)),
        join(queryFragmentsForTerms(terms, indexes.semanticByNorm)),
        entry ? "Safe to use as Strategium-backed archetype language" : "Keep as workbook reference until source-reviewed"
      ]);
    }

    const identityRows = [["Key", "Name", "Name Source", "Kind", "Display Code", "Colors", "Core Color", "Secondary Colors", "Aliases", "Placement Eligible", "Preview Eligible", "Preview Label", "Preview Title", "Preview Text", "Preview Scores", "Source"]];
    for (const item of identities) {
      const resolvedName = resolveIdentityName(item, identityNameSources);
      identityRows.push([item.key, resolvedName.name, resolvedName.source, item.kind, item.display_code, join(item.colors), item.core_color, join(item.secondary_colors), join(item.aliases), item.placement_eligible, item.preview_eligible, item.preview_label, item.preview_title, item.preview_text, JSON.stringify(item.preview_scores || {}), sourcePaths.identityLayers]);
    }

    const preconRows = [["Product Section", "Deck Name", "Main Commander", "Secondary Commanders", "Colors", "Faction Refs", "Theme", "Primary Theme", "Secondary Theme", "Main Strategy", "Mechanics", "Creature Type Focus", "Playstyle Tags", "Beginner Friendly", "Complexity", "Recommended For", "Not Recommended For", "Vox Mana Placement Fit", "Source"]];
    for (const precon of precons) {
      preconRows.push([
        precon.productSection,
        precon.deckName,
        precon.mainCommander,
        join(precon.secondaryCommanders),
        join(precon.colors),
        join(precon.factionRefs),
        precon.theme,
        precon.primaryTheme,
        precon.secondaryTheme,
        precon.mainStrategy,
        join(precon.mechanics),
        precon.creatureTypeFocus || "",
        join(precon.playstyleTags),
        precon.scores?.beginnerFriendly ?? "",
        precon.scores?.complexity ?? "",
        precon.recommendationProfile?.recommendedFor || "",
        precon.recommendationProfile?.notRecommendedFor || "",
        precon.recommendationProfile?.voxManaPlacementFit || "",
        sourcePaths.precons
      ]);
    }

    const themeRows = [["Key", "Display Name", "Family", "Aliases", "Match Terms", "Reading Tags", "Table Perception", "Source"]];
    for (const theme of themes) {
      themeRows.push([theme.key, theme.display_name, theme.family, join(theme.aliases), join(theme.match_terms), join(theme.reading_tags), theme.table_perception, sourcePaths.preconThemes]);
    }

    const approvedConcepts = [
      "Flying",
      "Card Draw",
      "Token Generation",
      "Removal",
      "Tempo",
      "Recursion",
      "Control",
      "Storm / Spells Matter",
      "Sacrifice",
      "Aristocrats"
    ];
    const conceptRows = [["Concept", "Status", "Vox Mana Tag Match", "Plain Reading Semantic Match", "Query Fragments", "Related Strategium Archetype", "Notes", "Source"]];
    for (const concept of approvedConcepts) {
      const terms = [concept, ...concept.split("/")];
      conceptRows.push([
        concept,
        "Approved first Loom v1 seed",
        join(findTagsForTerms(terms, indexes.tagByNorm)),
        join(findSemanticsForTerms(terms, indexes.semanticByNorm)),
        join(queryFragmentsForTerms(terms, indexes.semanticByNorm)),
        join(matchMany(indexes.strategiumByNorm, terms, (x) => x.name)),
        "Use for Explorer Mode concept registry seed; do not turn into deckbuilding/ranking advice",
        sourcePaths.loomDecision
      ]);
    }

    const semanticRows = [["ID", "Label", "Kind", "Confidence", "Triggers", "Fragments", "Alternatives", "Notes", "Source"]];
    for (const item of semantics) {
      semanticRows.push([item.id, item.label, item.kind, item.confidence, join(item.triggers), join(item.fragments), join((item.alternatives || []).map((x) => `${x.label}: ${x.query}`)), item.notes, sourcePaths.semantics]);
    }

    const abilityExtras = originalValues.AbilityWords.slice(1)
      .map((row) => row[0])
      .filter((term) => term && !catalogStatus(term, catalogs.abilityWords || []).startsWith("In"));
    const actionExtras = originalValues.KeywordActions.slice(1)
      .map((row) => row[1])
      .filter((term) => term && !catalogStatus(term, catalogs.keywordActions || []).startsWith("In"));
    const deckExtras = originalValues.DeckArchetypes.slice(1)
      .map((row) => row[1])
      .filter((name) => name && !indexes.strategiumByNorm.get(normalize(name)));
    const qualityRows = [
      ["Area", "Finding", "Severity", "Recommended Action", "Source"],
      ["Original workbook", "No formulas or structured Excel tables found in MTGDataV2.", "Info", "V3 adds structured crosswalk sheets and headers without changing the original file.", sourcePaths.workbook],
      ["CreatureTypes", "Original sheet has no explicit header; row 1 is Advisor.", "Medium", "Use CreatureTypes_Enhanced as the normalized header-bearing sheet.", sourcePaths.workbook],
      ["CreatureTypes", "C'tan differs by apostrophe style between workbook and generated grounding.", "Low", "Normalize apostrophe variants in imports and matching.", `${sourcePaths.workbook}; ${sourcePaths.grounding}`],
      ["AbilityWords", `${abilityExtras.length} workbook values are not in current Scryfall ability-word catalog: ${join(abilityExtras.slice(0, 20))}`, "Medium", "Keep as review/workbook-only unless a source decision promotes them.", `${sourcePaths.workbook}; ${sourcePaths.grounding}`],
      ["KeywordActions", `${actionExtras.length} workbook values are not in current Scryfall keyword-action catalog: ${join(actionExtras)}`, "Medium", "Review against rules/source before using as official grounding.", `${sourcePaths.workbook}; ${sourcePaths.grounding}`],
      ["DeckArchetypes", `All 50 Strategium archetypes are present; ${deckExtras.length} workbook-only archetypes remain: ${join(deckExtras)}`, "Info", "Keep workbook-only rows flagged until Strategium/product decision reviews them.", `${sourcePaths.workbook}; ${sourcePaths.strategium}`],
      ["ColorPieMatrix", "Title and legend rows precede the actual matrix header.", "Low", "Treat ColorPie as the canonical tabular source and ColorPieMatrix as a view.", sourcePaths.workbook],
      ["Identity_Layers_37", "Some identity registry rows do not carry top-level names; V3 resolves those display labels from raw faction profile sources.", "Info", "Use the Name Source column to audit whether a label came from identity-layers or a raw profile fallback.", `${sourcePaths.identityLayers}; data/raw-factions/*.profile.json`],
      ["Generated data", "Scryfall grounding is generated and should not be hand-edited from workbook rows.", "High", "Update generator/overrides and rerun grounding pipeline if official catalog data changes.", sourcePaths.grounding]
    ];

    const counts = {
      originalSheets: 11,
      strategium: strategiumEntries.length,
      tags: tags.length,
      precons: precons.length,
      identities: identities.length,
      semantics: semantics.length,
      scryfallCrosswalk: scryfallCrosswalkRows.length - 1
    };

    const sheets = [
      ["V3_ReadMe", makeReadmeRows(counts), "V3ReadMe"],
      ["Source_Map", makeSourceMapRows(), "SourceMap"],
      ["CreatureTypes_Enhanced", creatureRows, "CreatureTypesEnhanced"],
      ["Scryfall_Crosswalk", scryfallCrosswalkRows, "ScryfallCrosswalk"],
      ["VoxMana_Tags", tagRows, "VoxManaTags"],
      ["Strategium_Archetypes", strategiumRows, "StrategiumArchetypes"],
      ["Archetype_Crosswalk", archetypeCrosswalkRows, "ArchetypeCrosswalk"],
      ["Identity_Layers_37", identityRows, "IdentityLayers37"],
      ["Precon_Catalog_155", preconRows, "PreconCatalog155"],
      ["Precon_Themes_37", themeRows, "PreconThemes37"],
      ["Loom_Concept_Seeds", conceptRows, "LoomConceptSeeds"],
      ["PlainReading_Semantics", semanticRows, "PlainReadingSemantics"],
      ["Data_Quality_Audit", qualityRows, "DataQualityAudit"]
    ];

    for (const [name, rows, tableName] of sheets) {
      const sheet = workbook.worksheets.add(name);
      writeRows(sheet, rows, { tableName });
    }

    const summary = await workbook.inspect({
      kind: "sheet,table",
      maxChars: 12000,
      tableMaxRows: 3,
      tableMaxCols: 8,
      tableMaxCellChars: 90
    });
    await fs.writeFile(path.join(qaDir, "workbook-inspect.ndjson"), summary.ndjson, "utf8");

    const errorScan = await workbook.inspect({
      kind: "match",
      searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
      options: { useRegex: true, maxResults: 300 },
      summary: "final formula error scan"
    });
    await fs.writeFile(path.join(qaDir, "formula-error-scan.ndjson"), errorScan.ndjson, "utf8");

    const renderSheets = [
      "CreatureTypes",
      "Keywords",
      "AbilityWords",
      "KeywordActions",
      "EvasionAbilities",
      "CharacteristicDefining",
      "CardTypes",
      "PlaneswalkerTypes",
      "ColorPie",
      "ColorPieMatrix",
      "DeckArchetypes",
      ...sheets.map(([name]) => name)
    ];
    for (const sheetName of renderSheets) {
      const png = await workbook.render({
        sheetName,
        range: "A1:L30",
        scale: 1,
        format: "png"
      });
      await fs.writeFile(
        path.join(qaDir, `${sheetName.replace(/[^A-Za-z0-9_-]/g, "_")}.png`),
        new Uint8Array(await png.arrayBuffer())
      );
    }

    const output = await SpreadsheetFile.exportXlsx(workbook);
    await output.save(outputPath);
    console.log(JSON.stringify({
      outputPath,
      originalPath: inputPath,
      originalPreserved: true,
      newSheets: sheets.map(([name]) => name),
      expandedSheets: ["DeckArchetypes", "Keywords", "AbilityWords", "KeywordActions", "CardTypes", "ColorPie"],
      qaDir
    }, null, 2));
  })();
}

await main();

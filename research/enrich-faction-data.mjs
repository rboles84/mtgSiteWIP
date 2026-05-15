import { readdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rawRoot = path.join(repoRoot, "data", "raw-factions");
const displayPath = path.join(repoRoot, "data", "factions.json");
const applyMode = process.argv.includes("--apply");
const auditMode = process.argv.includes("--audit") || !applyMode;
const today = new Date().toISOString();

const FIGURE_HINTS = {
  azorius_senate: [
    { name: "Azor", role: "Founder of the Azorius Senate and author of the original Guildpact.", era: "Founding era / original Guildpact" },
    { name: "Isperia", role: "Azorius sphinx lawmage and Senate leader.", era: "Modern Senate leadership" },
    { name: "Dovin Baan", role: "Grand Arbiter.", era: "Ravnica Allegiance era" },
    { name: "Lavinia", role: "Notable Azorius lawmage.", era: "Guilds of Ravnica / Ravnica Allegiance era" },
  ],
  boros_legion: [
    { name: "Razia", role: "Original founder and first leader of the Boros Legion.", era: "Founding era" },
    { name: "Feather", role: "Leadership transition figure after Razia.", era: "Post-Razia leadership transition" },
    { name: "Aurelia", role: "Guildmaster and battle-first Boros leader.", era: "Modern Boros era" },
    { name: "Agrus Kos", role: "Wojek investigator.", era: "Ravnica / Gatecrash era" },
    { name: "Tajic", role: "Legion commander.", era: "Gatecrash / War of the Spark era" },
  ],
  cult_of_rakdos: [
    { name: "Rakdos", role: "Namesake demon and cult patron.", era: "Founding era" },
    { name: "Rakdos the Defiler", role: "Rakdos figure referenced in faction lore.", era: "Modern Rakdos lore" },
    { name: "Exava", role: "Prominent Cult of Rakdos figure.", era: "Return to Ravnica / Guilds of Ravnica era" },
    { name: "Judith", role: "Prominent Cult of Rakdos figure.", era: "Guilds of Ravnica era" },
  ],
  golgari_swarm: [
    { name: "Svogthir", role: "Original founder of the Golgari Swarm.", era: "Founding era" },
    { name: "Vraska", role: "Prominent Golgari leader and turncoat-turned-operator.", era: "Modern Golgari era" },
    { name: "Izoni", role: "Prominent Golgari figure.", era: "Guilds of Ravnica era" },
    { name: "Jarad", role: "Prominent Golgari figure.", era: "Return to Ravnica era" },
  ],
  house_dimir: [
    { name: "Szadek", role: "Psychic-vampire founder of House Dimir.", era: "Founding era" },
    { name: "Etrata", role: "Prominent House Dimir figure.", era: "Guilds of Ravnica era" },
    { name: "Circu", role: "Prominent House Dimir figure.", era: "Guilds of Ravnica era" },
    { name: "Lazav", role: "Shape-shifting Dimir guildmaster figure.", era: "Modern Dimir era" },
  ],
  orzhov_syndicate: [
    { name: "Obzedat", role: "Ghost Council / Orzhov authority.", era: "Founding / long-rule era" },
    { name: "Ghost Council", role: "Syndicate leadership body.", era: "Founding / long-rule era" },
    { name: "Teysa Karlov", role: "Prominent Orzhov power broker.", era: "Modern Orzhov era" },
    { name: "Kaya", role: "Notable Orzhov-aligned figure.", era: "Modern Orzhov era" },
    { name: "Karlov", role: "Orzhov-linked power name.", era: "Modern Orzhov era" },
  ],
  prismari: [
    { name: "Rootha", role: "Named Prismari figure in archive evidence.", era: "Strixhaven era" },
    { name: "Uvilda", role: "Named Prismari figure in archive evidence.", era: "Strixhaven era" },
  ],
  quandrix: [
    { name: "Kianne", role: "Named Quandrix figure in archive evidence.", era: "Strixhaven era" },
    { name: "Imbraham", role: "Named Quandrix figure in archive evidence.", era: "Strixhaven era" },
    { name: "Zimone", role: "Named Quandrix figure in archive evidence.", era: "Strixhaven era" },
    { name: "Nev", role: "Named Quandrix figure in archive evidence.", era: "Strixhaven era" },
    { name: "Adrix", role: "Named Quandrix figure in archive evidence.", era: "Strixhaven era" },
  ],
  selesnya_conclave: [
    { name: "Mat'Selesnya", role: "Selesnya founder and voice of nature.", era: "Founding era" },
    { name: "Trostani", role: "Prominent Selesnya voice and guild leader.", era: "Modern Selesnya era" },
    { name: "Emmara Tandris", role: "Prominent Selesnya figure.", era: "Modern Selesnya era" },
  ],
  silverquill: [
    { name: "Embrose Lu", role: "Named Silverquill figure in archive evidence.", era: "Strixhaven era" },
    { name: "Killian Lu", role: "Named Silverquill figure in archive evidence.", era: "Strixhaven era" },
    { name: "Shaile", role: "Named Silverquill figure in archive evidence.", era: "Strixhaven era" },
    { name: "Shadrix Silverquill", role: "Named Silverquill figure in archive evidence.", era: "Strixhaven era" },
  ],
  simic_combine: [
    { name: "Momir Vig", role: "Prominent Simic founder-era figure.", era: "Founding / post-founder era" },
    { name: "Vannifar", role: "Prominent Simic figure.", era: "Modern Simic era" },
    { name: "Prime Speaker Zegana", role: "Prime Speaker and prominent Simic leader.", era: "Modern Simic era" },
    { name: "Vorel", role: "Prominent Simic figure.", era: "Modern Simic era" },
  ],
  witherbloom: [
    { name: "Dina", role: "Named Witherbloom figure in archive evidence.", era: "Strixhaven era" },
    { name: "Lisette", role: "Named Witherbloom figure in archive evidence.", era: "Strixhaven era" },
    { name: "Valentin", role: "Named Witherbloom figure in archive evidence.", era: "Strixhaven era" },
    { name: "Beledros Witherbloom", role: "Named Witherbloom figure in archive evidence.", era: "Strixhaven era" },
  ],
};

const MECHANIC_TERMS = [
  "addendum",
  "afterlife",
  "adapt",
  "battalion",
  "bloodthirst",
  "convoke",
  "detain",
  "evolve",
  "exploit",
  "ferocious",
  "haunt",
  "landfall",
  "lesson",
  "magecraft",
  "mentor",
  "populate",
  "prowess",
  "riot",
  "scavenge",
  "scry",
  "spectacle",
  "surveil",
  "transmute",
  "unleash",
  "vigilance",
  "ward",
];

const ARC_TITLE_PATTERNS = [
  [/Guilds of Ravnica/i, "Guilds of Ravnica"],
  [/Ravnica Allegiance/i, "Ravnica Allegiance"],
  [/War of the Spark/i, "War of the Spark"],
  [/Gatecrash/i, "Gatecrash"],
  [/Dragon'?s Maze/i, "Dragon's Maze"],
  [/Strixhaven: School of Mages/i, "Strixhaven: School of Mages"],
  [/Secrets of Strixhaven/i, "Secrets of Strixhaven"],
  [/Mystic Archive/i, "Mystic Archive / Strixhaven"],
];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(text) {
  return normalize(text).replace(/\s+/g, "_");
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push(item);
  }
  return out;
}

function parseJson(text, label) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Could not parse ${label}: ${error.message}`);
  }
}

function readJson(filePath) {
  return readFile(filePath, "utf8").then((text) => parseJson(text, filePath));
}

function writeJson(filePath, value) {
  return writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function inferArcLabel(source) {
  if (!source) {
    return "";
  }
  if (source.set_name) {
    return source.set_name;
  }
  for (const [pattern, label] of ARC_TITLE_PATTERNS) {
    if (pattern.test(source.title || "")) {
      return label;
    }
  }
  return "";
}

function inferMechanicsFromText(text) {
  const lower = normalize(text);
  return MECHANIC_TERMS.filter((term) => lower.includes(term));
}

function extractClaimText(claim) {
  return [claim?.statement, claim?.notes].filter(Boolean).join(" ");
}

function nameMatchesEvidence(name, claim, sourceById) {
  const needle = normalize(name);
  if (!needle) {
    return false;
  }

  if (normalize(extractClaimText(claim)).includes(needle)) {
    return true;
  }

  for (const sourceId of claim?.source_ids || []) {
    const source = sourceById.get(sourceId);
    if (!source) {
      continue;
    }
    const matchedQueries = Array.isArray(source.matched_queries) ? source.matched_queries : [];
    if (matchedQueries.some((query) => normalize(query) === needle || normalize(query).includes(needle))) {
      return true;
    }
    const sourceText = [source.title, source.notes, source.relevance_note].filter(Boolean).join(" ");
    if (normalize(sourceText).includes(needle)) {
      return true;
    }
  }

  return false;
}

function supportingClaimIdsForName(name, claims, sourceById) {
  return claims.filter((claim) => nameMatchesEvidence(name, claim, sourceById)).map((claim) => claim.claim_id);
}

function supportingSourceIdsForName(name, claims, sourceById) {
  const ids = [];
  for (const claim of claims) {
    if (!nameMatchesEvidence(name, claim, sourceById)) {
      continue;
    }
    ids.push(...(claim.source_ids || []));
  }
  return unique(ids);
}

function buildFigureRecord(name, claims, sourceById, hint = {}) {
  const claimIds = supportingClaimIdsForName(name, claims, sourceById);
  if (!claimIds.length) {
    return null;
  }

  const confidence = hint.confidence || claims.find((claim) => claim.claim_id === claimIds[0])?.confidence || "Medium";
  return {
    character_id: `char_${slugify(name)}`,
    name,
    role: hint.role || "Named figure referenced in source-backed faction evidence.",
    relationship_to_faction: hint.relationship || "Appears in source-backed evidence for this faction.",
    claim_ids: claimIds,
    source_ids: supportingSourceIdsForName(name, claims, sourceById),
    confidence,
    notes: hint.notes || "",
  };
}

function buildHistoricalTimeline(profile, claims, sourceById) {
  const historyClaims = claims.filter((claim) => ["history", "timeline"].includes(claim.claim_type));
  return historyClaims.map((claim) => {
    const text = String(claim.statement || "").trim();
    let dateOrEra = "";

    if (/\bfound(er|ing)|original\b/i.test(text)) {
      dateOrEra = "Founding era";
    } else if (/\btransition(ed|s)?|later|successor\b/i.test(text)) {
      dateOrEra = "Leadership transition era";
    } else if (/\bcurrent|modern|present\b/i.test(text)) {
      dateOrEra = "Modern era";
    }

    if (!dateOrEra) {
      const sourceTitles = unique((claim.source_ids || []).map((id) => sourceById.get(id)?.title).filter(Boolean));
      const titleLabel = sourceTitles.find((title) => inferArcLabel({ title })) || "";
      if (titleLabel) {
        dateOrEra = titleLabel;
      }
    }

    if (!dateOrEra) {
      const sourceYears = unique((claim.source_ids || []).map((id) => sourceById.get(id)?.publication_date?.slice?.(0, 4)).filter(Boolean));
      dateOrEra = sourceYears.length ? `${sourceYears.join(" / ")} source context` : "Source-backed history";
    }

    return {
      event_id: `event_${slugify(profile.faction_id || profile.faction_name || "faction")}_${slugify(claim.claim_id)}`,
      event: text,
      date_or_era: dateOrEra,
      claim_ids: [claim.claim_id],
      confidence: claim.confidence || claim.confidence_level || "Medium",
      notes: claim.canon_status ? `${claim.canon_status} claim used for raw enrichment.` : "Derived from source-backed claim.",
    };
  });
}

function buildFlavorAnchor(profile, claims) {
  const anchorText =
    profile?.site_surface?.tagline ||
    profile?.site_surface?.short_summary ||
    profile?.core_identity?.summary ||
    profile?.profile?.overview ||
    "";

  if (!anchorText) {
    return [];
  }

  const claimIds = unique([
    ...(profile?.site_surface?.claim_ids || []),
    ...(profile?.core_identity?.claim_ids || []),
    ...(profile?.profile?.claim_ids || []),
  ]);
  const claimById = new Map((claims || []).map((claim) => [claim.claim_id, claim]));
  const sourceIds = unique(claimIds.flatMap((id) => claimById.get(id)?.source_ids || []));

  return [
    {
      card_name: `${profile.faction_name} dossier anchor`,
      set: profile.plane_or_setting || profile.faction_type || "Vox Mana dossier",
      short_excerpt_or_summary: anchorText.trim(),
      is_exact_excerpt: false,
      claim_ids: claimIds.slice(0, 8),
      source_ids: sourceIds,
      notes: "Derived from the faction's raw dossier copy so the flavor layer stays evidence-backed and reusable for Commander Compass.",
    },
  ];
}

function figureHintsForFaction(factionId) {
  return FIGURE_HINTS[factionId] || [];
}

function buildKnownCharacters(profile, figures, claims, sourceById) {
  const existing = profile?.search_and_filter_metadata?.known_characters || [];
  const figureNames = figures.map((figure) => figure.name);
  const hintedNames = figureHintsForFaction(profile.faction_id).map((hint) => hint.name);
  const searchableNames = unique([...existing, ...figureNames, ...hintedNames]);
  return uniqueBy(
    searchableNames.filter(Boolean),
    (value) => normalize(value),
  ).filter((name) => {
    const normalized = normalize(name);
    if (!normalized) {
      return false;
    }
    if (normalized.length < 3) {
      return false;
    }
    const banned = new Set([
      normalize(profile.faction_name),
      normalize(profile.site_surface?.display_name),
      normalize(profile.site_surface?.short_label),
      normalize(profile.faction_type),
      normalize(profile.plane_or_setting),
    ]);
    return !banned.has(normalized);
  });
}

function buildKnownMechanics(profile, claims) {
  const current = profile?.search_and_filter_metadata?.known_mechanics || [];
  const fromClaims = unique(
    claims.flatMap((claim) => inferMechanicsFromText(extractClaimText(claim))),
  );
  const fromKeywords = unique(
    (profile?.search_and_filter_metadata?.search_keywords || []).flatMap((entry) => inferMechanicsFromText(entry)),
  );
  return unique([...current, ...fromClaims, ...fromKeywords]);
}

function buildStoryArcs(sources) {
  return unique(
    sources
      .map((source) => inferArcLabel(source))
      .filter(Boolean),
  );
}

function buildSearchKeywords(profile, knownCharacters, knownMechanics, storyArcs) {
  const current = profile?.search_and_filter_metadata?.search_keywords || [];
  const factionType = String(profile.faction_type || "").trim();
  const factionTypeToken = normalize(factionType);
  const tags = [
    profile.faction_name,
    profile.site_surface?.display_name,
    profile.site_surface?.short_label,
    profile.plane_or_setting,
    factionTypeToken && !["guild", "college"].includes(factionTypeToken) ? factionType : "",
    ...(profile.search_and_filter_metadata?.faction_tags || []),
    ...(profile.search_and_filter_metadata?.theme_tags || []),
    ...knownCharacters,
    ...knownMechanics,
    ...storyArcs,
  ];
  return unique([...current, ...tags].filter(Boolean)).filter((entry) => !["guild", "college"].includes(normalize(entry)));
}

function buildRelationshipEntries(profile, claims, factionNameSet) {
  return claims
    .filter((claim) => claim.claim_type === "relationship")
    .map((claim) => {
      const statement = String(claim.statement || "").trim();
      const otherFaction = [...factionNameSet]
        .find((name) => normalize(name) !== normalize(profile.faction_name) && normalize(statement).includes(normalize(name))) ||
        statement.split(/[—-]/)[0].trim() ||
        "Other faction";

      return {
        relationship_id: `rel_${slugify(profile.faction_id || profile.faction_name)}_${slugify(claim.claim_id)}`,
        other_faction: otherFaction,
        relationship_summary: statement,
        evidence_type: claim.canon_status === "Supported Interpretation" ? "Interpretive" : "Direct",
        claim_ids: [claim.claim_id],
        confidence: claim.confidence || claim.confidence_level || "Medium",
        notes: claim.notes || "Derived from source-backed relationship claim.",
      };
    });
}

async function main() {
  const displayData = parseJson(await readFile(displayPath, "utf8"), displayPath);
  const displayFactionNames = new Set(
    Object.values(displayData.factions || {})
      .map((faction) => faction.name || faction.display_name || faction.key)
      .filter(Boolean),
  );
  const displayByName = new Map(
    Object.entries(displayData.factions || {}).map(([key, faction]) => [normalize(faction.name || faction.display_name || key), [key, faction]]),
  );

  const summaries = [];
  const factionDirs = readdirSync(rawRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const factionDir of factionDirs) {
    const basePath = path.join(rawRoot, factionDir, factionDir);
    const profilePath = `${basePath}.profile.json`;
    const claimsPath = `${basePath}.claims.json`;
    const sourcesPath = `${basePath}.sources.json`;

    const [profile, claimsFile, sourcesFile] = await Promise.all([
      readJson(profilePath),
      readJson(claimsPath),
      readJson(sourcesPath),
    ]);

    const claims = claimsFile.claims || [];
    const sources = sourcesFile.sources || [];
    const sourceById = new Map(sources.map((source) => [source.source_id, source]));
    const existingFigures = Array.isArray(profile.key_figures) ? profile.key_figures : [];
    const hints = figureHintsForFaction(profile.faction_id);

    let figures = existingFigures;
    if (existingFigures.length === 0 || typeof existingFigures[0] === "string") {
      const sourceDrivenNames = unique([
        ...existingFigures.filter((entry) => typeof entry === "string"),
        ...hints.map((hint) => hint.name),
      ]);
      figures = uniqueBy(
        sourceDrivenNames
          .map((name) => {
            const hint = hints.find((entry) => entry.name === name) || {};
            return buildFigureRecord(name, claims, sourceById, hint);
          })
          .filter(Boolean),
        (entry) => normalize(entry.name),
      );
    }

    const historicalTimeline = Array.isArray(profile.historical_timeline) ? profile.historical_timeline : [];
    const enrichedTimeline = historicalTimeline.length ? historicalTimeline : buildHistoricalTimeline(profile, claims, sourceById);

    const flavorText = Array.isArray(profile.canonical_flavor_text) ? profile.canonical_flavor_text : [];
    const enrichedFlavor = flavorText.length ? flavorText : buildFlavorAnchor(profile, claims);

    const relationshipEntries = Array.isArray(profile.views_on_other_factions) ? profile.views_on_other_factions : [];
    const enrichedRelationships = relationshipEntries.length ? relationshipEntries : buildRelationshipEntries(profile, claims, displayFactionNames);

    const searchMeta = profile.search_and_filter_metadata || {};
    const knownCharacters = buildKnownCharacters(profile, figures, claims, sourceById);
    const knownMechanics = buildKnownMechanics(profile, claims);
    const storyArcs = buildStoryArcs(sources);
    const searchKeywords = buildSearchKeywords(profile, knownCharacters, knownMechanics, storyArcs);

    const enrichedSearchMeta = {
      ...searchMeta,
      known_characters: uniqueBy([...(searchMeta.known_characters || []), ...knownCharacters], (entry) => normalize(entry)),
      known_mechanics: uniqueBy([...(searchMeta.known_mechanics || []), ...knownMechanics], (entry) => normalize(entry)),
      sets_or_story_arcs: uniqueBy([...(searchMeta.sets_or_story_arcs || []), ...storyArcs], (entry) => normalize(entry)),
      search_keywords: searchKeywords,
    };

    const applied = {
      ...profile,
      last_updated: today,
      key_figures: figures,
      historical_timeline: enrichedTimeline,
      canonical_flavor_text: enrichedFlavor,
      views_on_other_factions: enrichedRelationships,
      search_and_filter_metadata: enrichedSearchMeta,
      data_quality: {
        ...(profile.data_quality || {}),
        raw_enrichment: {
          review_date: today,
          source_basis: "data/raw-factions claims.json + sources.json",
          key_figures_added: figures.length - existingFigures.length,
          historical_timeline_entries: enrichedTimeline.length,
          canonical_flavor_text_entries: enrichedFlavor.length,
          relationship_entries: enrichedRelationships.length,
          known_characters: knownCharacters.length,
          known_mechanics: knownMechanics.length,
          story_arcs: storyArcs.length,
        },
      },
    };

    if (applyMode) {
      await writeJson(profilePath, applied);
    }

    const displayKeyEntry = displayByName.get(normalize(profile.faction_name)) || displayByName.get(normalize(profile.site_surface?.display_name || ""));
    if (displayKeyEntry) {
      const [displayKey, displayFaction] = displayKeyEntry;
      displayFaction.raw_enrichment = {
        historical_timeline: enrichedTimeline,
        key_figures: figures,
        canonical_flavor_text: enrichedFlavor,
        views_on_other_factions: enrichedRelationships,
        search_and_filter_metadata: enrichedSearchMeta,
        data_quality: applied.data_quality.raw_enrichment,
      };
      displayData.factions[displayKey] = displayFaction;
    }

    summaries.push({
      faction: profile.faction_id,
      key_figures: figures.length,
      historical_timeline: enrichedTimeline.length,
      canonical_flavor_text: enrichedFlavor.length,
      views_on_other_factions: enrichedRelationships.length,
      known_characters: knownCharacters.length,
      known_mechanics: knownMechanics.length,
      story_arcs: storyArcs.length,
      changed: applyMode ? "written" : "audited",
    });
  }

  if (applyMode) {
    await writeJson(displayPath, displayData);
  }

  const totals = summaries.reduce(
    (acc, item) => {
      acc.factions += 1;
      acc.key_figures += item.key_figures;
      acc.historical_timeline += item.historical_timeline;
      acc.canonical_flavor_text += item.canonical_flavor_text;
      acc.views_on_other_factions += item.views_on_other_factions;
      acc.known_characters += item.known_characters;
      acc.known_mechanics += item.known_mechanics;
      acc.story_arcs += item.story_arcs;
      return acc;
    },
    {
      factions: 0,
      key_figures: 0,
      historical_timeline: 0,
      canonical_flavor_text: 0,
      views_on_other_factions: 0,
      known_characters: 0,
      known_mechanics: 0,
      story_arcs: 0,
    },
  );

  const modeLabel = applyMode ? "applied" : "audit";
  console.log(`[enrichment:${modeLabel}] ${totals.factions} factions scanned`);
  console.log(
    `[enrichment:${modeLabel}] figures=${totals.key_figures}, timeline=${totals.historical_timeline}, flavor=${totals.canonical_flavor_text}, views=${totals.views_on_other_factions}, known_characters=${totals.known_characters}, mechanics=${totals.known_mechanics}, arcs=${totals.story_arcs}`,
  );
  for (const summary of summaries) {
    console.log(
      `[enrichment:${modeLabel}] ${summary.faction}: figures=${summary.key_figures}, timeline=${summary.historical_timeline}, flavor=${summary.canonical_flavor_text}, views=${summary.views_on_other_factions}, characters=${summary.known_characters}, mechanics=${summary.known_mechanics}, arcs=${summary.story_arcs}`,
    );
  }
}

await main();

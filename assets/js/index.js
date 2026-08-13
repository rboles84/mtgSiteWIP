import {
  DEFAULT_STARTER_PROFILE,
  MANA_ORDER,
  RESULT_VERSION,
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  getStageLabel,
  replayAdaptiveSelections,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
} from "./gate-b1-placement-engine.js";
import { validateGateB1RuntimeModel } from "./gate-b1-runtime-contract.js";
import {
  buildAdaptiveProgress,
  helperTextForQuestion,
} from "./archscry-question-presentation.js";
import {
  buildCommanderDossier,
  buildPreconRecommendations,
  createArchidektTagCatalog,
  getExternalDeckRoutingAlias,
  getColorIdentity,
  getCommanderFactionGuidance,
  getServiceChipMeta,
  hasRenderableLandTier,
  selectPreconPreviewRecommendations,
} from "./commander-dossier.js";
import {
  buildArchscryMazeContext,
  buildContrastCopy,
  buildHeroNarrative,
  MAZE_PATH_LABELS,
  buildPersonalizedMazePaths,
  classifyResultArtRecord,
  closeAlternativeForResult,
  deriveGateAResultState,
  gateAStatePresentation,
  isLegacyGateAResult,
  isResumableGateAQuestion,
  matchForFaction,
  presentationForFaction,
  selectReadingTagRefs,
  withGateAPublicState,
  withArchscryMazeContext,
} from "./archscry-presentation.js";
import {
  getExpressionKindLabel,
  normalizeLayeredIdentity,
} from "./identity-layers.js";
import {
  destroyDossierManaRadar,
  getDossierRadarProfile,
  initDossierManaRadar,
  renderDossierRadarSection,
} from "./dossier-radar.js";
import {
  READING_FIND_SECTION_CONFIG,
  READING_FINDS_STORAGE_KEY,
  getRowsForReading,
  hasRowsForOtherReadings,
} from "../../research/maze-scratchpad-store.js";
import {
  archiveUserDeckLink,
  listUserDeckLinks,
  saveUserDeckLink,
} from "./deck-link-service.js";
import { createScryfallNamedCardLookup } from "./scryfall-card-cache.js";

/*
 * Archscry route runtime ownership map (VM-147B)
 *
 * Keep function order stable in this file. Dossier panel IDs, URL params,
 * storage keys, data-action dispatch, Maze handoff payloads, and card-art
 * ID prefixes are route contracts that should not move during risk-reduction
 * cleanup without a dedicated behavior card.
 *
 * Runtime zones:
 * - Data boot and route state live in APP_STATE plus load* helpers.
 * - Quick reading and the archived terminal flow produce placement results.
 * - Dossier helpers own panel state, URL state, Maze handoff, and render HTML.
 * - Card art and preview helpers decorate an already-rendered dossier.
 * - bindArchscryControls owns delegated data-action and preview events.
 */

const SESSION = VM_SESSION;
const DATA_BASE_URL = new URL("../../data/", import.meta.url);
const CORE_DATA_FETCH_OPTIONS = Object.freeze({ cache: "no-store" });
const APP_STATE = {
  factions: {},
  placementModel: null,
  quickIndex: 0,
  quickAnswers: [],
  quickSelections: [],
  adaptiveState: null,
  currentQuickQuestion: null,
  quickTransition: null,
  refinementMode: false,
  refinementOriginResult: null,
  activeResult: null,
  activeViewKey: null,
  resultSource: "quick",
  returnSection: null,
  interviewState: "idle",
  starterProfile: { ...DEFAULT_STARTER_PROFILE },
  deckTagCatalog: null,
  identityLayers: null,
  tagTaxonomy: null,
  tagTaxonomyByKey: new Map(),
  scryfallFlavorIndex: null,
  archscryFlavorSnippets: null,
  cardRationaleCatalog: null,
  cardVoiceCatalog: null,
  identityDossierCatalog: null,
  publicComparisonCatalog: null,
  discoveryEducationCatalog: null,
  preconCatalog: null,
  preconThemeTaxonomy: null,
  commanderProviderValidation: null,
  scryfallCommanderIndex: null,
  scryfallCommanderByName: new Map(),
  scryfallLocalCardByName: new Map(),
  scryfallColorThemeIndex: null,
  scryfallMechanicThemeIndex: null,
  previousViewKey: null,
  mazeReturnUrl: "",
  mazeReturnAnchor: "",
  activeDossierPanel: "placement",
  dossierLayoutMode: "focus",
  forceDossierPanel: "",
  hiddenDossierPanelIds: new Set(),
  dossierSegments: {
    "starter-cards": "creatures",
    "mana-base": "basics",
  },
  dossierAvailableSegments: {},
  activeDossierRadarFaction: null,
};

const ARCHSCRY_MAZE_HANDOFF_KEY = "vm_archscry_maze_handoff_v1";
const DOSSIER_DEFAULT_PANEL_ID = "placement";
const DOSSIER_DEFAULT_LAYOUT_MODE = "focus";
const DOSSIER_LAYOUT_MODES = new Set(["focus", "all"]);
const ACCOUNT_DECK_LINKS_ENABLED = false;
const DOSSIER_PANEL_CONFIG = [
  { id: "placement", label: "Placement" },
  { id: "start", label: "Start Here" },
  { id: "why", label: "Why This Fits", mobileLabel: "Why It Fits" },
  { id: "adjacent", label: "Close Alternative" },
  { id: "commander-deck-starts", label: "Commander Browsing Starts", mobileLabel: "Commanders" },
  ...(ACCOUNT_DECK_LINKS_ENABLED ? [{ id: "decks-saved", label: "External Deck Links" }] : []),
  { id: "starter-cards", label: "Card Signals" },
  { id: "mana-base", label: "Mana Notes" },
  { id: "maze-discovery", label: "Maze Discovery", mobileLabel: "Maze" },
];
const DOSSIER_PANEL_IDS = new Set(DOSSIER_PANEL_CONFIG.map((panel) => panel.id));
const STARTER_CARD_SEGMENTS = [
  { id: "creatures", label: "Creatures" },
  { id: "spells", label: "Instants and Sorceries" },
  { id: "permanents", label: "Enchantments and Artifacts" },
];
const MANA_BASE_SEGMENTS = [
  { id: "basics", label: "Basics" },
  { id: "premium", label: "Premium" },
  { id: "midrange", label: "Midrange" },
  { id: "budget", label: "Budget" },
  { id: "utility", label: "Utility" },
];
const HELPER_COPY_VARIANTS = {
  flavorLead: [
    "Why it echoes",
    "Where it resonates",
    "What it carries forward",
  ],
  mazeTitle: [
    "Live paths through the Maze",
    "Threads to follow in the Maze",
    "Searchable echoes from this reading",
  ],
};
function systemCopyPattern(words, flags = "gi") {
  return new RegExp(`\\b${words.join("\\s+")}\\b`, flags);
}
const SYSTEM_COPY_REPLACEMENTS = [
  { pattern: systemCopyPattern(["product", "fit"]), replacement: "deck fit" },
  { pattern: systemCopyPattern(["model", "fit"]), replacement: "reading fit" },
  { pattern: systemCopyPattern(["generated", "candidate"]), replacement: "candidate" },
  { pattern: systemCopyPattern(["scored", "result"]), replacement: "reading result" },
  { pattern: systemCopyPattern(["confidence", "signal"]), replacement: "reading signal" },
  { pattern: systemCopyPattern(["specific", "grievance"]), replacement: "specific pressure" },
  { pattern: /\bCI\s+([WUBRG]{1,5})\b/g, replacement: "Color Identity: $1" },
  { pattern: systemCopyPattern(["Read", "In", "Apocrypha"], "g"), replacement: "Read in the source library" },
  { pattern: /\u00e2\u20ac\u201d/g, replacement: "-" },
  { pattern: /\u00e2\u20ac\u0153|\u00e2\u20ac\u009d/g, replacement: '"' },
  { pattern: /\u00e2\u20ac\u2122/g, replacement: "'" },
];
const MANA_SYMBOL_NAMES = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
  C: "Colorless",
};

// Data loading and optional route dependency inventory.

/**
 * Returns true when the Scrying Terminal should be shown and wired up.
 *
 * @returns {boolean} True when the terminal is enabled.
 */
function isScryingTerminalEnabled() {
  return globalThis.VM_SITE_FLAGS?.SCRYING_TERMINAL_ENABLED === true;
}

function resolveDataUrl(path) {
  return new URL(path, DATA_BASE_URL).href;
}

async function loadCoreJson(path, label) {
  const response = await fetch(resolveDataUrl(path), CORE_DATA_FETCH_OPTIONS);
  if (!response.ok) {
    throw new Error(`Could not load ${label}.`);
  }
  return response.json();
}

function validateQuickReadingReachability() {
  const liveExpressions = APP_STATE.identityLayers?.expressions || {};
  const liveFactionKeys = new Set([
    ...Object.keys(APP_STATE.factions || {}),
    ...Object.keys(liveExpressions),
  ]);
  validateGateB1RuntimeModel(APP_STATE.placementModel, liveFactionKeys);
}

/**
 * Applies the feature flag to terminal-only UI already in the DOM.
 */
function applyTerminalVisibility() {
  const enabled = isScryingTerminalEnabled();

  document.querySelectorAll("[data-vm-terminal-only]").forEach((node) => {
    node.hidden = !enabled;
  });

  const interviewSection = document.getElementById("interview");
  if (interviewSection) {
    interviewSection.hidden = !enabled;
  }
}

/**
 * Loads the canonical faction data file used by both quick mode and result rendering.
 *
 * @returns {Promise<object>} Canonical faction map keyed by faction code.
 */
async function loadFactionData() {
  const json = await loadCoreJson("factions.json", "faction data");
  APP_STATE.factions = json.factions || {};
  return APP_STATE.factions;
}

/**
 * Loads the adaptive placement model used by the Gate -> Hall -> Crucible flow.
 *
 * @returns {Promise<object>} Generated placement model.
 */
async function loadPlacementModel() {
  APP_STATE.placementModel = await loadCoreJson("gate-b1-placement-model.json", "Gate B1 placement model");
  return APP_STATE.placementModel;
}

/**
 * Loads the expanded Archidekt tag catalog used to build validated deck searches.
 *
 * @returns {Promise<object>} Resolved tag catalog.
 */
async function loadDeckTagCatalog() {
  const response = await fetch(resolveDataUrl("deck-tags_expanded.json"));
  if (!response.ok) {
    throw new Error("Could not load Commander deck tags.");
  }
  APP_STATE.deckTagCatalog = createArchidektTagCatalog(await response.json());
  return APP_STATE.deckTagCatalog;
}

async function loadIdentityLayerData() {
  APP_STATE.identityLayers = await loadCoreJson("identity-layers.json", "identity layers");
  return APP_STATE.identityLayers;
}

export function validateDossierContentCatalogs({
  placementModel,
  identityDossierCatalog,
  publicComparisonCatalog,
  discoveryEducationCatalog,
} = {}) {
  const modelIdentities = placementModel?.identities || [];
  const identityKeys = new Set(Array.isArray(modelIdentities)
    ? modelIdentities.map((identity) => identity.id)
    : Object.keys(modelIdentities));
  const identityRecords = identityDossierCatalog?.records || [];
  const dossierKeys = new Set(identityRecords.map((record) => record.identity_key));
  const comparisons = publicComparisonCatalog?.records || [];
  const comparisonKeys = new Set();
  const normalizePair = (identities = []) => [...identities].sort().join("::");
  let comparisonsValid = comparisons.length > 0;

  for (const record of comparisons) {
    const normalized = normalizePair([record.identity_a, record.identity_b]);
    if (
      !record.pair_key
      || !identityKeys.has(record.identity_a)
      || !identityKeys.has(record.identity_b)
      || record.identity_a === record.identity_b
      || comparisonKeys.has(normalized)
      || typeof record.a_to_b !== "string"
      || !record.a_to_b.trim()
      || typeof record.b_to_a !== "string"
      || !record.b_to_a.trim()
    ) comparisonsValid = false;
    comparisonKeys.add(normalized);
  }

  const requiredPairsPresent = (placementModel?.confusion_pairs || []).every((pair) => (
    comparisonKeys.has(normalizePair(pair.identities))
  ));
  const glossary = discoveryEducationCatalog?.glossary || [];
  const glossaryIds = new Set(glossary.map((record) => record.record_id));
  const glossaryValid = glossary.length > 0
    && glossaryIds.size === glossary.length
    && glossary.every((record) => typeof record.definition === "string" && record.definition.trim());

  return identityDossierCatalog?.schema_version === "vm551-identity-dossier-catalog-v1"
    && publicComparisonCatalog?.schema_version === "vm551-public-comparison-catalog-v1"
    && discoveryEducationCatalog?.schema_version === "vm551-discovery-education-catalog-v1"
    && identityKeys.size === 37
    && identityRecords.length === identityKeys.size
    && dossierKeys.size === identityKeys.size
    && [...identityKeys].every((identityKey) => dossierKeys.has(identityKey))
    && comparisonsValid
    && requiredPairsPresent
    && glossaryValid;
}

async function loadDossierContentAuthority() {
  const [identityDossierCatalog, publicComparisonCatalog, discoveryEducationCatalog] = await Promise.all([
    loadCoreJson("dossier/identity-dossier-content.catalog.json", "identity dossier content"),
    loadCoreJson("dossier/public-comparisons.catalog.json", "public identity comparisons"),
    loadCoreJson("dossier/discovery-education-catalog.json", "Archscry education content"),
  ]);
  if (!validateDossierContentCatalogs({
    placementModel: APP_STATE.placementModel,
    identityDossierCatalog,
    publicComparisonCatalog,
    discoveryEducationCatalog,
  })) {
    throw new Error("Archscry dossier content is stale or incomplete.");
  }
  APP_STATE.identityDossierCatalog = identityDossierCatalog;
  APP_STATE.publicComparisonCatalog = publicComparisonCatalog;
  APP_STATE.discoveryEducationCatalog = discoveryEducationCatalog;
}

/**
 * Loads optional discovery indexes used to enrich Archscry results.
 *
 * The placement experience should still work when these files are absent.
 *
 * @returns {Promise<void>} Resolves after optional data has been attempted.
 */
async function loadDiscoveryData() {
  const [
    taxonomy,
    archscryFlavorSnippets,
    cardRationaleCatalog,
    cardVoiceCatalog,
    preconCatalog,
    preconThemeTaxonomy,
    commanderProviderValidation,
    flavorIndex,
    commanderIndex,
    colorThemeIndex,
    mechanicThemeIndex,
  ] = await Promise.all([
    loadOptionalJson(resolveDataUrl("taxonomy/vox-mana-tags.json"), "tag taxonomy"),
    loadOptionalJson(resolveDataUrl("archscry-flavor-snippets.json"), "Archscry flavor snippets"),
    loadOptionalJson(resolveDataUrl("dossier/card-rationale-catalog.json"), "card rationale catalog"),
    loadOptionalJson(resolveDataUrl("dossier/card-voice-catalog.json"), "card voice catalog"),
    loadOptionalJson(resolveDataUrl("precons/vox-mana-precon-catalog.json"), "precon catalog"),
    loadOptionalJson(resolveDataUrl("taxonomy/vox-mana-precon-themes.json"), "precon theme taxonomy"),
    loadOptionalJson(resolveDataUrl("placement/commander-provider-validation.json"), "commander provider validation"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/card-flavor-index.json"), "Scryfall flavor index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/commander-index.json"), "Scryfall commander index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/color-theme-index.json"), "Scryfall color theme index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/mechanic-theme-index.json"), "Scryfall mechanic theme index"),
  ]);

  APP_STATE.tagTaxonomy = taxonomy;
  APP_STATE.archscryFlavorSnippets = archscryFlavorSnippets;
  APP_STATE.cardRationaleCatalog = cardRationaleCatalog;
  APP_STATE.cardVoiceCatalog = cardVoiceCatalog;
  APP_STATE.preconCatalog = preconCatalog;
  APP_STATE.preconThemeTaxonomy = preconThemeTaxonomy;
  APP_STATE.commanderProviderValidation = commanderProviderValidation;
  APP_STATE.tagTaxonomyByKey = buildTaxonomyLookup(taxonomy);
  APP_STATE.scryfallFlavorIndex = flavorIndex;
  APP_STATE.scryfallCommanderIndex = commanderIndex;
  APP_STATE.scryfallColorThemeIndex = colorThemeIndex;
  APP_STATE.scryfallMechanicThemeIndex = mechanicThemeIndex;
  APP_STATE.scryfallCommanderByName = new Map(
    (commanderIndex?.commanders || []).map((card) => [normalizeCardName(card.name), card])
  );
  APP_STATE.scryfallLocalCardByName = buildLocalScryfallCardLookup([
    flavorIndex,
    commanderIndex,
    colorThemeIndex,
    mechanicThemeIndex,
  ]);
}

function buildLocalScryfallCardLookup(indexes = []) {
  const byName = new Map();
  const pending = [...indexes.filter(Boolean)];
  while (pending.length) {
    const value = pending.pop();
    if (Array.isArray(value)) {
      pending.push(...value);
      continue;
    }
    if (!value || typeof value !== "object") continue;
    const hasUsableLocator = Boolean(
      value.image_uri ||
      value.image_uris?.normal ||
      value.card_faces?.some?.((face) => face?.image_uris?.normal) ||
      value.scryfall_uri
    );
    if (typeof value.name === "string" && hasUsableLocator) {
      byName.set(normalizeCardName(value.name), value);
    }
    pending.push(...Object.values(value).filter((entry) => entry && typeof entry === "object"));
  }
  return byName;
}

/**
 * Fetches optional JSON without failing the main page boot.
 *
 * @param {string} path Data path.
 * @param {string} label Human-readable label for warnings.
 * @returns {Promise<object|null>} Parsed JSON or null.
 */
async function loadOptionalJson(path, label) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Optional ${label} unavailable.`, error);
    return null;
  }
}

function buildTaxonomyLookup(taxonomy) {
  const map = new Map();
  (taxonomy?.tags || []).forEach((entry) => {
    map.set(`${entry.category}:${entry.tag}`, entry);
  });
  return map;
}

function flavorSnippetsForFaction(faction) {
  const snippets = APP_STATE.archscryFlavorSnippets?.snippets || {};
  const key = faction?.key || faction?.identity?.expression_key || "";
  return Array.isArray(snippets[key]) ? snippets[key] : [];
}

function matrixFlavorSnippetsForFaction(faction) {
  return flavorSnippetsForFaction(faction).map((snippet) => {
    const localCard = APP_STATE.scryfallLocalCardByName.get(normalizeCardName(snippet.card_name || "")) || null;
    const fallbackScryfallUrl = snippet.card_name
      ? `https://scryfall.com/search?q=${encodeURIComponent(`!\"${snippet.card_name}\"`)}`
      : "https://scryfall.com/";
    return {
      ...snippet,
      card_record: localCard,
      image_uri: cardImageUrl(localCard || {}),
      scryfall_id: localCard?.scryfall_id || localCard?.id || "",
      scryfall_uri: localCard?.scryfall_uri || snippet.scryfall_uri || fallbackScryfallUrl,
    };
  });
}

// Identity, copy, and presentation helpers used by result and dossier views.

/**
 * Returns the canonical faction entry for a given key.
 *
 * @param {string} key Faction key.
 * @returns {object|null} Faction record when present.
 */
function getFaction(key) {
  return APP_STATE.factions[key] || null;
}

/**
 * Returns the user-facing label for a faction's institution type.
 *
 * @param {object} faction Faction record.
 * @returns {string} "Guild", "College", or "Color".
 */
function getInstitutionLabel(faction) {
  return getExpressionKindLabel(faction);
}

function colorIdentityNames(colors) {
  const identity = Array.isArray(colors) ? colors : String(colors || "").split("");
  const names = identity
    .filter(Boolean)
    .map((color) => MANA_SYMBOL_NAMES[color.toUpperCase()] || color.toUpperCase());
  return names.length ? names.join(" + ") : "Colorless";
}

function basicLandNamesForColors(colors) {
  const basicNames = {
    W: "Plains",
    U: "Islands",
    B: "Swamps",
    R: "Mountains",
    G: "Forests",
  };
  return (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => basicNames[color.toUpperCase()])
    .filter(Boolean);
}

function formatBasicLandList(names = []) {
  const values = names.filter(Boolean);
  if (values.length <= 2) {
    return values.join(" and ");
  }
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

export function basicLandGuidanceCopy(colors) {
  const colorSymbols = (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => color.toUpperCase())
    .filter((color) => MANA_SYMBOL_NAMES[color]);
  const basics = basicLandNamesForColors(colorSymbols);
  if (!basics.length) {
    return "Start with Wastes, true {C} sources, and mana rocks before utility lands. Generic costs are not colorless mana, effects that ask for a color will not make {C}, Command Tower cannot choose colorless, and Reflecting Pool-style effects need another {C} source before they help.";
  }
  if (basics.length === 1) {
    return `After choosing your nonbasic lands, fill the rest with ${basics[0]} unless your utility lands need more room.`;
  }
  const firstColor = (MANA_SYMBOL_NAMES[colorSymbols[0]] || basics[0]).toLowerCase();
  const secondColor = (MANA_SYMBOL_NAMES[colorSymbols[1]] || basics[1]).toLowerCase();
  return `After choosing your nonbasic lands, fill the rest with ${formatBasicLandList(basics)} based on your early colored mana needs. If most early spells need ${firstColor}, lean ${basics[0]}. If your early interaction needs ${secondColor}, lean ${basics[1]}.`;
}

function landLaneCopyForFaction(faction = {}) {
  if (String(faction?.key || "").toUpperCase() === "COLORLESS") {
    return {
      premium: "Best when you need true {C} early and enough speed to reach colorless finishers before the table stabilizes.",
      midrange: "The practical upgrade lane: Wastes, proven colorless sources, utility lands, and artifact mana that keep the restriction consistent.",
      budget: "Start with Wastes and reliable colorless production first; add utility lands only when they still help cast your actual {C} cards.",
      utility: "Use utility lands as deck machinery, not decoration; Reflecting Pool-style effects need another source that can make {C} before they help the plan.",
    };
  }
  return {
    premium: "Best when you want speed, consistency, and fewer tapped lands.",
    midrange: "Good first upgrade lane: stronger fixing without chasing every premium land.",
    budget: "Playable entry point. Expect more tapped lands, but the deck will still function.",
    utility: "Adds Commander flexibility beyond color fixing.",
  };
}

function normalizeStarterCardNames(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((name) => String(name || "").trim())
    .filter(Boolean);
}

export function normalizeStarterCardGroups(starterCards = {}) {
  return {
    creatures: normalizeStarterCardNames(starterCards.creatures),
    spells: normalizeStarterCardNames(starterCards.spells),
    permanents: normalizeStarterCardNames(starterCards.permanents),
  };
}

function starterCardSegmentsForGroups(starterCards = {}) {
  const groups = normalizeStarterCardGroups(starterCards);
  return STARTER_CARD_SEGMENTS.filter((segment) => groups[segment.id]?.length);
}

function identityColorEntry(code) {
  return APP_STATE.identityLayers?.colors?.[String(code || "").toUpperCase()] || null;
}

function identityExpressionEntry(key) {
  return APP_STATE.identityLayers?.expressions?.[String(key || "").toUpperCase()] || null;
}

function layeredIdentityForDisplay(faction, resultIdentity = null) {
  return normalizeLayeredIdentity(resultIdentity || faction?.identity || {}, {
    key: faction?.key,
    name: faction?.name,
    institution_type: faction?.institution_type,
    colors: faction?.colors || [],
    expression_kind: faction?.identity?.expression_kind || faction?.institution_type,
  });
}

export function identityMetaLabelForDisplay(identity = {}, faction = {}, identityColors = []) {
  const kind = String(identity.expression_kind || faction?.identity?.expression_kind || faction?.institution_type || "").toLowerCase();
  const routingLabel = String(identity.routing?.label || faction?.identity?.routing?.label || "").trim();
  if (routingLabel && ["shard", "wedge"].includes(kind)) {
    return routingLabel;
  }
  return getColorIdentity(identityColors || faction?.key || "");
}

function buildManaPipsHtml(colors = [], className = "") {
  const symbols = (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => String(color || "").toUpperCase())
    .filter((color) => MANA_SYMBOL_NAMES[color]);
  if (!symbols.length) return "";
  const classAttr = ["mana-pips", className].filter(Boolean).join(" ");
  const accessibleLabel = symbols.map((color) => MANA_SYMBOL_NAMES[color]).join(" and ");
  return `
    <span class="${classAttr}" role="img" aria-label="${escapeAttributeValue(`${accessibleLabel} mana identity`)}">
      ${symbols.map((color) => `<i class="ms ms-${color.toLowerCase()} ms-cost" aria-hidden="true"></i>`).join("")}
    </span>`;
}

function firstSentence(text) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  const match = normalized.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : normalized).trim();
}

function commanderStartSnapshotCopy({ commanderLane, dossier }) {
  const sources = [
    commanderLane?.copy,
    ...(commanderLane?.details || []).map((detail) => detail.copy),
    ...(dossier?.archetypes || []).flatMap((item) => [item.desc]),
  ];
  const sentence = sources.map(firstSentence).find(Boolean);
  return sentence || "Open Start Here to turn this placement into a first Commander direction.";
}

function buildResultStateCardHtml({ result }) {
  const state = deriveGateAResultState({
    result,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });
  const [label, copy] = gateAStatePresentation(state);
  return `
    <div class="starter-card result-state-card" data-result-state="${escapeAttributeValue(state)}">
      <div class="starter-title">${escapeHtml(label)}</div>
      <div class="starter-copy">${escapeHtml(copy)}</div>
    </div>`;
}

function buildSummaryTagRowHtml(tags = []) {
  if (!Array.isArray(tags) || !tags.length) {
    return `<div class="dossier-snapshot-tags" data-summary-tags-row hidden></div>`;
  }
  return `
    <div class="dossier-snapshot-tags" data-summary-tags-row>
      ${tags.map((tag) => `<span class="dossier-snapshot-tag">${escapeHtml(tag)}</span>`).join("")}
    </div>`;
}

function shortIdentityTension(text) {
  const sentences = String(text || "")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  if (!sentences.length) return "";
  if (sentences[0].length < 72 && sentences[1]?.endsWith("?")) {
    return `${sentences[0]} ${sentences[1]}`;
  }
  return sentences[0];
}

function resolveIdentityTension(identity, faction) {
  const expressionEntry = identityExpressionEntry(identity?.expression_key || faction?.key);
  const colorEntry = identityColorEntry(identity?.core_color);
  return faction?.core_tension || expressionEntry?.core_tension || colorEntry?.core_tension || "";
}

function dossierContentForFaction(factionOrKey) {
  const key = typeof factionOrKey === "string" ? factionOrKey : factionOrKey?.key;
  return (APP_STATE.identityDossierCatalog?.records || []).find((record) => record.identity_key === key) || null;
}

function approvedComparisonCopy(primaryFaction, adjacentFaction) {
  const primaryKey = primaryFaction?.key;
  const adjacentKey = adjacentFaction?.key;
  const record = (APP_STATE.publicComparisonCatalog?.records || []).find((entry) =>
    (entry.identity_a === primaryKey && entry.identity_b === adjacentKey) ||
    (entry.identity_a === adjacentKey && entry.identity_b === primaryKey)
  );
  if (!record) return "";
  return record.identity_a === primaryKey ? record.a_to_b : record.b_to_a;
}

function buildSelfCheckCopy(faction) {
  return dossierContentForFaction(faction)?.test_the_fit?.positive_self_check || "";
}

function buildIdentityStoryCard({ title, headline, copy, meta = "", className = "" }) {
  return `
    <div class="starter-card identity-story-card${className ? ` ${className}` : ""}">
      <div class="starter-title">${escapeHtml(title)}</div>
      ${headline ? `<div class="identity-story-headline">${renderPlayerCopy(headline)}</div>` : ""}
      <div class="starter-copy">${renderPlayerCopy(copy)}</div>
      ${meta ? `<div class="identity-story-meta">${meta}</div>` : ""}
    </div>`;
}

function buildTestTheFitHtml({ dossier, faction, comparisonFaction = null }) {
  const content = dossierContentForFaction(faction);
  if (!content) return "";
  const selfCheck = content.test_the_fit.positive_self_check;
  const tension = content.test_the_fit.tension_failure_mode;
  const contrast = comparisonFaction
    ? approvedComparisonCopy(faction, comparisonFaction)
    : content.test_the_fit.certified_boundary_self_check;
  const cards = [
    selfCheck ? buildIdentityStoryCard({
      title: "A useful self-check",
      headline: "",
      copy: selfCheck,
      className: "identity-story-card--support",
    }) : "",
    tension ? buildIdentityStoryCard({
      title: "Where it can pull too far",
      headline: "",
      copy: tension,
      className: "identity-story-card--support",
    }) : "",
    contrast ? buildIdentityStoryCard({
      title: comparisonFaction ? `Compare ${comparisonFaction.name}` : "Check the boundary",
      headline: "",
      copy: contrast,
      className: "identity-story-card--support",
    }) : "",
  ].filter(Boolean);
  if (!cards.length) return "";
  return `
    <div class="starter-section" data-test-the-fit>
      <div class="section-label">Test the Fit</div>
      <div class="identity-story-grid public-three-item-grid" data-item-count="${cards.length}">${cards.join("")}</div>
    </div>`;
}

function buildTableIdentityCardHtml(faction) {
  const presentation = dossierContentForFaction(faction)?.how_this_plays;
  if (!presentation) return "";
  return `
    <div class="how-this-plays-block">
      <div class="how-this-plays-label">At the table</div>
      <div class="table-identity-list">
        <div><span>Role</span>${renderPlayerCopy(presentation.role)}</div>
        <div><span>How opponents read it</span>${renderPlayerCopy(presentation.how_opponents_read_it)}</div>
        <div><span>Emotional pressure</span>${renderPlayerCopy(presentation.emotional_pressure)}</div>
      </div>
    </div>`;
}

function buildLoreToMechanicCardHtml(faction) {
  const presentation = dossierContentForFaction(faction)?.how_this_plays;
  if (!presentation) return "";
  return `
    <div class="how-this-plays-block">
      <div class="how-this-plays-label">In play</div>
      <div class="table-identity-list">
        <div><span>Lore role</span>${renderPlayerCopy(presentation.lore_role)}</div>
        <div><span>Mechanical expression</span>${renderPlayerCopy(presentation.mechanical_expression)}</div>
        <div><span>Table experience</span>${renderPlayerCopy(presentation.table_experience)}</div>
      </div>
    </div>`;
}

function buildHowThisPlaysCardHtml(faction) {
  return `
    <div class="starter-card starter-card-wide how-this-plays-card">
      <div class="how-this-plays-grid">
        ${buildTableIdentityCardHtml(faction)}
        ${buildLoreToMechanicCardHtml(faction)}
      </div>
    </div>`;
}

function buildAdjacentContextHtml({ dossier, result }) {
  return "";
}

// Route view state and shared session controls.

/**
 * Shows a single application section and scrolls back to the top of the page.
 *
 * @param {string} id Section id to reveal.
 */
function showSection(id) {
  if (id === "interview" && !isScryingTerminalEnabled()) {
    id = "landing";
  }

  ["landing", "quick", "interview", "result"].forEach((sectionId) => {
    const node = document.getElementById(sectionId);
    if (node) {
      node.classList.toggle("hidden", sectionId !== id);
    }
  });
  window.scrollTo(0, 0);
}

/**
 * Updates the topbar based on the current session and saved-placement state.
 */
function updateTopbar() {
  const bar = document.getElementById("topbar");
  const identity = document.getElementById("tb-identity");
  const signOut = document.getElementById("tb-signout");
  const retake = document.getElementById("tb-retake");
  const avatar = document.getElementById("tb-avatar");
  const name = document.getElementById("tb-name");
  const placement = document.getElementById("tb-placement");
  const profileResult = SESSION.profile?.placementResult || null;
  const activeResult = APP_STATE.activeResult || profileResult;
  const faction = getFaction(activeResult?.faction);

  bar.classList.remove("hidden");

  if (!SESSION.username) {
    identity.classList.add("hidden");
    signOut.classList.add("hidden");
    retake.classList.add("hidden");
    return;
  }

  identity.classList.remove("hidden");
  signOut.classList.remove("hidden");
  retake.classList.toggle("hidden", !activeResult);
  name.textContent = SESSION.username;
  placement.textContent = faction ? `${faction.name}` : "Signed in";

  clearNode(avatar);
  if (SESSION.avatarUrl) {
    const image = document.createElement("img");
    image.src = SESSION.avatarUrl;
    image.alt = SESSION.username || "Signed-in user";
    avatar.appendChild(image);
  } else {
    const fallback = document.createElement("span");
    fallback.className = "tb-avatar-fallback";
    fallback.textContent = (SESSION.username[0] || "?").toUpperCase();
    avatar.appendChild(fallback);
  }
}

/**
 * Opens the research page.
 */
function openResearch() {
  window.location = "../maze/index.html";
}

/**
 * Opens Apocrypha.
 */
function openLibrary() {
  window.location = "../apocrypha/index.html";
}

/**
 * Resets local quick-path state and interview UI back to a neutral state.
 */
function resetLocalFlow() {
  destroyDossierManaRadar();
  APP_STATE.quickIndex = 0;
  APP_STATE.quickAnswers = [];
  APP_STATE.quickSelections = [];
  APP_STATE.adaptiveState = APP_STATE.placementModel
    ? createInitialAdaptiveState(APP_STATE.placementModel)
    : null;
  APP_STATE.currentQuickQuestion = null;
  APP_STATE.quickTransition = null;
  APP_STATE.refinementMode = false;
  APP_STATE.refinementOriginResult = null;
  APP_STATE.activeResult = null;
  APP_STATE.activeViewKey = null;
  APP_STATE.interviewState = "idle";
  vm_resetInterview();
  const output = document.getElementById("terminal-output");
  const decree = document.getElementById("decree-container");
  if (output) {
    output.innerHTML = "";
    output.style.opacity = "1";
  }
  if (decree) {
    decree.classList.remove("visible");
  }
  document.getElementById("terminal-error").textContent = "";
  document.getElementById("terminal-status").textContent = "";
  document.getElementById("terminal-input").value = "";
  updateInterviewControls("idle");
}

/**
 * Clears the saved placement when needed and returns the app to the landing page.
 */
async function handleRetake() {
  const confirmMessage = SESSION.username
    ? "Begin again? This will clear your saved reading and return you to the gate."
    : "Begin again? This will leave this reading and return you to the gate.";
  if (typeof window !== "undefined" && typeof window.confirm === "function" && !window.confirm(confirmMessage)) {
    return;
  }
  if (SESSION.username) {
    await vm_clearPlacement();
  }
  resetLocalFlow();
  updateTopbar();
  showSection("landing");
}

/**
 * Signs the user out and returns to the landing page.
 */
async function handleSignOut() {
  await vm_signOut();
  resetLocalFlow();
  updateTopbar();
  showSection("landing");
}

// Adaptive quick-reading flow.

/**
 * Starts the adaptive Gate -> Hall -> Crucible quick reading flow.
 */
function startQuickFlow() {
  if (!APP_STATE.placementModel) {
    alert("The reading is still loading. Try again in a moment.");
    return;
  }

  APP_STATE.adaptiveState = createInitialAdaptiveState(APP_STATE.placementModel);
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickSelections = [];
  APP_STATE.quickAnswers = [];
  APP_STATE.quickIndex = 0;
  APP_STATE.quickTransition = null;
  APP_STATE.refinementMode = false;
  APP_STATE.refinementOriginResult = null;
  showSection("quick");
  renderQuickQuestion();
  window.setTimeout(() => {
    document.getElementById("quick")?.scrollIntoView({ block: "start", inline: "nearest" });
  }, 0);
}

function placementQuestionById(questionId) {
  if (!questionId || !APP_STATE.placementModel?.question_bank) return null;
  return Object.values(APP_STATE.placementModel.question_bank)
    .flatMap((questions) => Array.isArray(questions) ? questions : [])
    .find((question) => question.id === questionId) || null;
}

function startTargetedRefinement() {
  const refinement = APP_STATE.activeResult?.refinement;
  const question = placementQuestionById(refinement?.question_id);
  if (refinement?.kind !== "ask_targeted_question" || !question || !APP_STATE.adaptiveState) return;
  APP_STATE.refinementOriginResult = APP_STATE.activeResult;
  APP_STATE.refinementMode = "targeted";
  APP_STATE.currentQuickQuestion = question;
  APP_STATE.quickTransition = null;
  showSection("quick");
  renderQuickQuestion();
}

function revisitRefinementAnswer() {
  const revisit = APP_STATE.activeResult?.refinement?.revisit;
  const question = placementQuestionById(revisit?.question_id);
  const selectionIndex = APP_STATE.quickSelections.findIndex((selection) => selection.question?.id === revisit?.question_id);
  if (!question || selectionIndex < 0) return;
  APP_STATE.refinementOriginResult = APP_STATE.activeResult;
  APP_STATE.quickSelections = APP_STATE.quickSelections.slice(0, selectionIndex);
  APP_STATE.quickAnswers = APP_STATE.quickAnswers.slice(0, selectionIndex);
  APP_STATE.adaptiveState = replayAdaptiveSelections(APP_STATE.placementModel, APP_STATE.quickSelections);
  APP_STATE.currentQuickQuestion = question;
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;
  APP_STATE.refinementMode = "revisit";
  APP_STATE.quickTransition = null;
  showSection("quick");
  renderQuickQuestion();
}

/**
 * Starts the deep interview flow using the current starter-profile preferences.
 */
async function startInterviewFlow() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  showSection("interview");
  resetInterviewDossier();
  await beginInterview();
}

/**
 * Returns to the previous quick question when possible.
 */
function goBackQuickQuestion() {
  if (APP_STATE.refinementMode) {
    APP_STATE.refinementMode = false;
    APP_STATE.currentQuickQuestion = null;
    renderResult();
    return;
  }
  if (!APP_STATE.quickSelections.length) {
    showSection("landing");
    return;
  }

  APP_STATE.quickSelections.pop();
  APP_STATE.quickAnswers.pop();
  APP_STATE.adaptiveState = replayAdaptiveSelections(
    APP_STATE.placementModel,
    APP_STATE.quickSelections
  );
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;
  APP_STATE.quickTransition = null;
  renderQuickQuestion();
  window.setTimeout(() => {
    document.getElementById("quick")?.scrollIntoView({ block: "start", inline: "nearest" });
  }, 0);
}

/**
 * Renders the active adaptive question and answer cards.
 */
function renderQuickQuestion() {
  const question = APP_STATE.currentQuickQuestion;
  const progressFill = document.getElementById("progress-fill");
  const progressCopy = document.getElementById("progress-copy");
  const backButton = document.getElementById("quick-back-btn");

  if (!question) {
    showQuickTransition("reading");
    return;
  }

  const stageLabel = APP_STATE.refinementMode ? "Refinement" : getStageLabel(question.stage);
  const stageCounts = APP_STATE.adaptiveState?.stage_counts || {};
  const stageQuestionNumber = (stageCounts[question.stage] || 0) + 1;
  const questionNumber = APP_STATE.quickSelections.length + 1;
  const minimumQuestions = APP_STATE.placementModel?.stages?.min_total_questions || 6;
  const maxQuestions = APP_STATE.placementModel?.stages?.max_total_questions || 8;
  const stageMaximum = APP_STATE.placementModel?.stages?.[question.stage]?.max_questions || stageQuestionNumber;
  const progress = APP_STATE.refinementMode ? {
    label: "Optional refinement · one additional observation",
    percentage: 100,
  } : buildAdaptiveProgress({
    stageLabel,
    stageQuestionNumber,
    stageMaximum,
    questionNumber,
    minimumQuestions,
    maximumQuestions: maxQuestions,
  });
  const questionCard = document.getElementById("question-card");
  const transitionCard = document.getElementById("quick-transition");
  const questionHelp = document.getElementById("question-help");
  const answerGrid = document.getElementById("answer-grid");
  const helperText = helperTextForQuestion(question);

  APP_STATE.quickTransition = null;
  questionCard.classList.remove("hidden");
  transitionCard.classList.add("hidden");

  document.getElementById("question-eyebrow").textContent =
    question.eyebrow || `${stageLabel} ${stageQuestionNumber}`;
  document.getElementById("question-title").textContent = question.prompt;
  questionHelp.textContent = helperText;
  questionHelp.hidden = !helperText;
  answerGrid.dataset.answerCount = String(question.answers.length);
  answerGrid.innerHTML = question.answers
    .map((answer, index) => {
      return `
        <div class="answer-card">
          <button type="button" ${buildActionAttrs("answer-quick-question", { answerIndex: index })}>
            <div class="answer-title">${answer.title}</div>
            <div class="answer-copy">${answer.copy}</div>
          </button>
        </div>`;
    })
    .join("");

  progressCopy.textContent = progress.label;
  progressFill.style.width = `${progress.percentage}%`;
  backButton.textContent = APP_STATE.refinementMode
    ? "Return to reading"
    : APP_STATE.quickSelections.length === 0 ? "Return to landing" : "Back";
}

function showQuickTransition(kind) {
  const questionCard = document.getElementById("question-card");
  const transitionCard = document.getElementById("quick-transition");
  const progressFill = document.getElementById("progress-fill");
  const progressCopy = document.getElementById("progress-copy");
  const transitionEyebrow = document.getElementById("quick-transition-eyebrow");
  const transitionTitle = document.getElementById("quick-transition-title");
  const transitionCopy = document.getElementById("quick-transition-copy");
  const transitionAction = document.getElementById("quick-transition-action");
  const answered = APP_STATE.quickSelections.length;
  const minimumQuestions = APP_STATE.placementModel?.stages?.min_total_questions || 6;
  const maximumQuestions = APP_STATE.placementModel?.stages?.max_total_questions || 8;

  APP_STATE.quickTransition = kind;
  questionCard.classList.add("hidden");
  transitionCard.classList.remove("hidden");
  document.getElementById("quick-back-btn").textContent = "Back";

  if (kind === "hall") {
    transitionEyebrow.textContent = "Gate complete";
    transitionTitle.textContent = "The next question responds to your reading.";
    transitionCopy.textContent = "The four shared Gate moments are complete. The Hall now follows the distinctions still visible in your answers.";
    transitionAction.textContent = "Continue into the Hall";
    progressCopy.textContent = `Gate · 4 of 4 · Reading moment ${answered} of ${minimumQuestions}–${maximumQuestions}`;
    progressFill.style.width = `${Math.min(100, (answered / maximumQuestions) * 100)}%`;
  } else {
    transitionEyebrow.textContent = "Reading complete";
    transitionTitle.textContent = "Building your reading.";
    transitionCopy.textContent = "Your answers are ready. Open the result when you are ready to compare the strongest supported direction and its limits.";
    transitionAction.textContent = "Open my reading";
    progressCopy.textContent = `Reading complete · ${answered} moments`;
    progressFill.style.width = "100%";
  }

  window.setTimeout(() => transitionAction.focus(), 0);
}

function continueQuickTransition() {
  if (APP_STATE.quickTransition === "reading") {
    APP_STATE.quickTransition = null;
    finalizeQuickReading();
    return;
  }
  APP_STATE.quickTransition = null;
  renderQuickQuestion();
}

/**
 * Records the selected answer for the current quick question and advances the flow.
 *
 * @param {number} answerIndex Selected answer index.
 */
function answerQuickQuestion(answerIndex) {
  const question = APP_STATE.currentQuickQuestion;
  const answer = question?.answers?.[answerIndex];
  if (!answer) {
    return;
  }

  APP_STATE.quickSelections.push({ question, answer, answerIndex });
  APP_STATE.quickAnswers.push(answer);
  APP_STATE.adaptiveState = applyAdaptiveAnswer({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    question,
    answer,
    answerIndex,
  });
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;

  if (APP_STATE.refinementMode === "targeted") {
    APP_STATE.refinementMode = false;
    showQuickTransition("reading");
    return;
  }
  if (APP_STATE.refinementMode === "revisit") APP_STATE.refinementMode = false;

  if (shouldFinishAdaptiveReading(APP_STATE.adaptiveState, APP_STATE.placementModel)) {
    showQuickTransition("reading");
    return;
  }

  const nextQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.currentQuickQuestion = nextQuestion;
  if (question.stage === "gate" && nextQuestion?.stage === "hall") {
    showQuickTransition("hall");
    return;
  }
  renderQuickQuestion();
}

/**
 * Creates a normalized starter profile for use in result payloads.
 *
 * @returns {{format_interest:string,budget_band:string,experience_level:string}} Current starter profile.
 */
function getStarterProfile() {
  return {
    format_interest: APP_STATE.starterProfile.format_interest,
    budget_band: APP_STATE.starterProfile.budget_band,
    experience_level: APP_STATE.starterProfile.experience_level,
  };
}

// Result finalization plus archived terminal flow.

/**
 * Finalizes the adaptive quick reading, stores the normalized result locally, and opens the dossier.
 */
function finalizeQuickReading() {
  const rawResult = buildAdaptivePlacementResult({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    factions: APP_STATE.factions,
    starterProfile: getStarterProfile(),
    version: RESULT_VERSION,
  });
  const result = withGateAPublicState({
    result: rawResult,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
  APP_STATE.resultSource = "quick";
  APP_STATE.returnSection = null;
  SESSION.interviewResult = result;
  vm_cachePlacementResult(result);
  renderResult();
}

/**
 * Updates the interview controls to reflect the current terminal state.
 *
 * @param {"idle"|"loading"|"interviewing"|"decided"} state Interview UI state.
 * @param {number=} turn Current turn number when known.
 */
function updateInterviewControls(state, turn) {
  APP_STATE.interviewState = state;
  const input = document.getElementById("terminal-input");
  const submit = document.getElementById("terminal-submit");
  const status = document.getElementById("terminal-status");
  const loading = state === "loading";
  const decided = state === "decided";

  input.disabled = loading || decided;
  submit.disabled = loading || decided || input.value.trim().length < 3;
  status.textContent = turn ? `Interviewing... Turn ${turn} of 5` : "";
}

/**
 * Appends a line to the Scrying Terminal transcript.
 *
 * @param {"recruiter"|"user"} role Speaker role.
 * @param {string} content Text content to append.
 * @param {boolean=} loading True when the line is a loading placeholder.
 * @returns {HTMLElement} Appended message element.
 */
function appendTerminalMessage(role, content, loading) {
  const output = document.getElementById("terminal-output");
  const line = document.createElement("div");
  line.className = `terminal-message ${role}${loading ? " loading" : ""}`;
  line.textContent = content;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
  return line;
}

/**
 * Resets the decree panel before a new interview begins.
 */
function resetInterviewDossier() {
  document.getElementById("terminal-output").innerHTML = "";
  document.getElementById("decree-container").classList.remove("visible");
  document.getElementById("terminal-error").textContent = "";
  document.getElementById("terminal-status").textContent = "";
  document.getElementById("terminal-input").value = "";
  updateInterviewControls("idle");
}

/**
 * Starts the terminal interview and loads the opening recruiter prompt.
 *
 * @returns {Promise<void>} Resolves once the opening prompt is rendered.
 */
async function beginInterview() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  resetInterviewDossier();
  updateInterviewControls("loading", 1);
  const loader = appendTerminalMessage("recruiter", "The scrying glass hums.", true);

  try {
    const data = await vm_startInterview({
      starter_profile: getStarterProfile(),
      current_result: APP_STATE.activeResult || null,
    });
    loader.remove();
    appendTerminalMessage("recruiter", data.response || "Speak, and be weighed.");
    updateInterviewControls("interviewing", data.turn || 1);
    document.getElementById("terminal-input").focus();
  } catch (error) {
    loader.remove();
    document.getElementById("terminal-error").textContent =
      "The Scrying Terminal failed to open cleanly. Wait a breath, then try again.";
    updateInterviewControls("idle");
  }
}

/**
 * Submits the user's next interview reply to the edge function.
 *
 * @returns {Promise<void>} Resolves once the response is rendered.
 */
async function submitInterview() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  const input = document.getElementById("terminal-input");
  const text = input.value.trim();
  if (text.length < 3 || APP_STATE.interviewState === "loading" || APP_STATE.interviewState === "decided") {
    return;
  }

  document.getElementById("terminal-error").textContent = "";
  appendTerminalMessage("user", text);
  input.value = "";
  updateInterviewControls("loading");
  const loader = appendTerminalMessage("recruiter", "Interpreting your answer", true);

  try {
    const data = await vm_conductInterview(text);
    loader.remove();
    appendTerminalMessage("recruiter", data.response || "The glass stills.");

    if (data.decided && data.result) {
      await revealDecree(data.result);
      updateInterviewControls("decided", data.turn || 5);
    } else {
      updateInterviewControls("interviewing", data.turn || undefined);
      input.focus();
    }
  } catch (error) {
    loader.remove();
    document.getElementById("terminal-error").textContent =
      "The terminal lost the thread. Try one concrete answer about what you would do next.";
    updateInterviewControls("interviewing");
    input.focus();
  }
}

/**
 * Renders the interview decree and caches the active result for the dossier page.
 *
 * @param {object} result Normalized interview result.
 * @returns {Promise<void>} Resolves after the reveal animation has completed.
 */
function revealDecree(result) {
  return new Promise((resolve) => {
    const publicResult = withGateAPublicState({
      result,
      placementModel: APP_STATE.placementModel,
      factions: APP_STATE.factions,
    });
    const state = publicResult.result_state;
    const [stateLabel, stateCopy] = gateAStatePresentation(state);
    const suppressNamedIdentity = ["mixed", "contradictory", "insufficient", "invalid", "incomplete"].includes(state);
    const closeAlternative = closeAlternativeForResult(publicResult, APP_STATE.placementModel, APP_STATE.factions);
    const tiedMatch = state === "tied" ? publicResult.top_matches?.[1] : null;
    const decree = document.getElementById("decree-container");
    const rule = document.getElementById("decree-rule");
    const faction = getFaction(publicResult.faction) || {};

    APP_STATE.activeResult = publicResult;
    APP_STATE.activeViewKey = publicResult.faction;
    APP_STATE.resultSource = "interview";
    APP_STATE.returnSection = "interview";
    vm_cachePlacementResult(publicResult);

    setTimeout(() => {
      document.getElementById("terminal-output").style.opacity = "0.4";
      document.getElementById("decree-title").textContent = suppressNamedIdentity
        ? stateLabel
        : state === "tied"
        ? `Tied: ${publicResult.faction_name || publicResult.faction} and ${tiedMatch?.faction_name || tiedMatch?.faction}`
        : `Current best fit: ${publicResult.faction_name || publicResult.faction || "Unbound Order"}`;
      document.getElementById("decree-tagline").textContent = "Archscry reading";
      document.getElementById("decree-text").textContent = suppressNamedIdentity
        ? stateCopy
        : "These answers brought this identity forward. The result is a bounded reading, not a prediction about you or your deck.";
      document.getElementById("decree-runner").textContent = suppressNamedIdentity
        ? ""
        : tiedMatch
        ? "Your answers supported both readings without clearly separating them."
        : closeAlternative
          ? `Close alternative: ${closeAlternative.match.faction_name || closeAlternative.match.faction}. Close is relative within this reading; it is not a certainty claim.`
          : "";
      rule.style.background = faction.accent || "var(--gold-d)";
      decree.classList.add("visible");
      resolve();
    }, 1200);
  });
}

/**
 * Opens the full dossier from an interview result without requiring a save first.
 */
function openInterviewDossier() {
  if (!APP_STATE.activeResult) {
    return;
  }
  APP_STATE.resultSource = "interview";
  APP_STATE.returnSection = "interview";
  if (!history.state?.vmDossier) {
    history.pushState({ vmDossier: true, returnSection: "interview" }, "", "#dossier");
  }
  renderResult();
}

/**
 * Returns from an interview-sourced dossier to the Scrying Terminal context.
 */
function returnToInterviewSource() {
  APP_STATE.returnSection = null;
  showSection("interview");
  updateTopbar();
}

// Save controls, external links, precon previews, and Maze handoff payloads.

/**
 * Saves the current active placement using Google OAuth when needed.
 *
 * @returns {Promise<void>} Resolves when the save flow has been started or completed.
 */
async function handleSavePlacement() {
  const button = document.getElementById("save-placement-btn");
  const result = APP_STATE.activeResult || SESSION.interviewResult;
  if (!result) {
    return;
  }

  button.disabled = true;
  button.textContent = "Saving...";

  try {
    const sb = getSupabase();
    const {
      data: { session },
    } = await sb.auth.getSession();

    if (session?.user) {
      const saved = await vm_savePlacementResult(result);
      APP_STATE.activeResult = saved;
      APP_STATE.activeViewKey = saved.faction;
      button.textContent = "Saved to Google";
      renderResult();
      return;
    }

    await vm_saveWithGoogle(result);
  } catch (error) {
    button.disabled = false;
    button.textContent = "Retry Save";
    document.getElementById("terminal-error").textContent =
      error.message || "Could not save placement.";
  }
}

/**
 * Builds the external deck-link buttons for a deck card.
 *
 * @param {object[]} links Link descriptors.
 * @param {string=} className Additional anchor class.
 * @returns {string} Link button HTML.
 */
function buildLinkButtons(links, className = "") {
  return (links || [])
    .map((link) => {
      const service = getServiceChipMeta(link);
      const classes = ["deck-link", "service-chip", `service-${service.key}`, className].filter(Boolean).join(" ");
      const targetAttrs = service.key === "maze" ? "" : ' target="_blank" rel="noopener"';
      return `
        <a class="${classes}" href="${escapeHtml(link.url)}"${targetAttrs} data-service="${service.key}" style="--service-color:${service.color};--service-glow:${service.glow}">
          <span class="service-mark" aria-hidden="true">${service.mark}</span>
          <span class="service-copy">
            <span class="service-name">${service.label}</span>
            <span class="service-label">${escapeHtml(link.label)}</span>
          </span>
        </a>`;
    })
    .join("");
}

export function buildDossierRenderState({
  starterCards = {},
  colors = [],
} = {}) {
  const normalizedStarterCards = normalizeStarterCardGroups(starterCards);
  const starterCardSegments = starterCardSegmentsForGroups(normalizedStarterCards);
  return {
    starterCards: normalizedStarterCards,
    starterCardSegments,
    hasStarterCardReferences: starterCardSegments.length > 0,
    basicLandCopy: basicLandGuidanceCopy(colors),
  };
}

const IDENTITY_HERO_OVERLAY = "linear-gradient(180deg, rgba(7, 10, 12, 0.38), rgba(7, 10, 12, 0.78))";
const IDENTITY_HERO_SLUG_BY_FACTION_KEY = Object.freeze({
  ABZAN: "abzan",
  BANT: "bant",
  ESPER: "esper",
  GRIXIS: "grixis",
  JESKAI: "jeskai",
  JUND: "jund",
  LOREHOLD: "lorehold",
  MARDU: "mardu",
  NAYA: "naya",
  PRISMARI: "prismari",
  QUANDRIX: "quandrix",
  SILVERQUILL: "silverquill",
  SULTAI: "sultai",
  TEMUR: "temur",
  WITHERBLOOM: "witherbloom",
  DUNE: "dune",
  GLINT: "glint",
  WITCH: "witch",
  YORE: "yore",
  COLORLESS: "colorless",
  WUBRG: "wubrg",
  WU: "azorius",
  UB: "dimir",
  BR: "rakdos",
  RG: "gruul",
  WG: "selesnya",
  WB: "orzhov",
  UR: "izzet",
  BG: "golgari",
  UG: "simic",
  WR: "boros",
  W: "white",
  U: "blue",
  B: "black",
  R: "red",
  G: "green",
});

export function heroBannerImageSlugForFaction(faction = {}) {
  const key = String(faction?.key || "").toUpperCase();
  return IDENTITY_HERO_SLUG_BY_FACTION_KEY[key] || "";
}

export function heroBannerBackgroundForFaction(faction = {}) {
  const slug = heroBannerImageSlugForFaction(faction);
  if (!slug) {
    return faction?.banner || "";
  }

  const image = `url('/assets/img/identity-hero/${slug}.webp') center center / cover no-repeat`;
  return [IDENTITY_HERO_OVERLAY, image, faction?.banner || ""].filter(Boolean).join(", ");
}

function dedupeLinks(links = []) {
  const seen = new Set();
  return (links || []).filter((link) => {
    const service = String(link?.service || "").trim().toLowerCase();
    let url = String(link?.url || "").trim();
    try {
      const parsed = new URL(url, "https://vox-mana.local");
      parsed.hash = "";
      parsed.searchParams.sort();
      url = parsed.pathname + (parsed.search ? parsed.search : "");
    } catch (_) {
      url = url.replace(/#.*$/, "");
    }
    const key = `${service}:${url}`;
    if (!link?.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildDeckDiscoveryGroups({
  faction,
  archidektLinks,
  commanderDirectoryLinks,
  tagRefs,
}) {
  const identity = getColorIdentity(faction?.colors || faction?.key || "");
  const identityLabel = `${identity} Commander`;
  const topTag = uniqueTagRefs(tagRefs)[0];
  const tagEntry = topTag ? taxonomyEntry(topTag.category, topTag.tag) : null;
  const routingAlias = getExternalDeckRoutingAlias(faction);
  return [
    {
      service: "edhrec",
      name: "EDHREC",
      desc: "Browse commanders and theme pages by color identity, then compare common packages before choosing a list.",
      links: dedupeLinks([
        ...commanderDirectoryLinks.filter((link) => getServiceChipMeta(link).key === "edhrec"),
        { service: "edhrec", label: `${routingAlias.label} commanders`, url: routingAlias.edhrecUrl },
      ]).slice(0, 4),
    },
    {
      service: "archidekt",
      name: "Archidekt",
      desc: "Use color and catalog-tag lanes when you want external catalog filtering.",
      links: dedupeLinks(archidektLinks).slice(0, 4),
    },
    {
      service: "mtgdecks",
      name: "MTGDecks",
      desc: "Start with the color lane, then search commander names when you want tournament-adjacent deck examples.",
      links: dedupeLinks([
        ...commanderDirectoryLinks.filter((link) => getServiceChipMeta(link).key === "mtgdecks"),
      ]).slice(0, 4),
    },
  ].filter((group) => group.links.length);
}

function buildDeckDiscoveryHtml(groups = []) {
  return groups.map((group) => `
    <div class="deck-card deck-source-${escapeHtml(group.service)}">
      <div class="deck-format">${escapeHtml(group.name)}</div>
      <div class="deck-name">${escapeHtml(group.name)} starting points</div>
      <div class="deck-desc">${escapeHtml(group.desc)}</div>
      <div class="deck-links">${buildLinkButtons(group.links)}</div>
    </div>`).join("");
}

const VALIDATED_EDHREC_PRECON_URLS = Object.freeze({
  "Abzan Armor": "https://edhrec.com/precon/abzan-armor",
  "Buckle Up": "https://edhrec.com/precon/buckle-up",
  "Eldrazi Unbound": "https://edhrec.com/precon/eldrazi-unbound",
  "First Flight": "https://edhrec.com/precon/first-flight",
  "Phantom Premonition": "https://edhrec.com/precon/phantom-premonition",
  "Spirit Squadron": "https://edhrec.com/precon/spirit-squadron",
  "Stalwart Unity": "https://edhrec.com/precon/stalwart-unity",
});

function validatedEdhrecPreconUrl(deckName) {
  const normalized = String(deckName || "").replace(/\s*\(precon\)\s*$/i, "").trim();
  return VALIDATED_EDHREC_PRECON_URLS[normalized] || "";
}

function verifiedCommanderProviderLinks(commanderName) {
  const record = APP_STATE.commanderProviderValidation?.commanders?.[commanderName];
  return Array.isArray(record?.links)
    ? record.links.filter((link) => link?.verified === true && /^https:\/\//.test(link?.url || ""))
    : [];
}

function buildPreconResearchLinks(precon) {
  return dedupeLinks([
    validatedEdhrecPreconUrl(precon.deckName) ? {
      service: "edhrec",
      label: "View precon",
      url: validatedEdhrecPreconUrl(precon.deckName),
    } : null,
  ]);
}

function buildCommanderProviderDetails(precon) {
  const links = verifiedCommanderProviderLinks(precon.mainCommander);
  if (!links.length) return "";
  return `
    <details class="precon-provider-menu">
      <summary class="precon-provider-trigger"><strong>Decks</strong><span>Browse builds</span></summary>
      <div class="precon-provider-links">${buildLinkButtons(links)}</div>
    </details>`;
}

const PRECON_BADGE_META = {
  nativeExact: {
    label: "Native fit",
    className: "is-native",
    description: "Shares the active faction reference and exact color identity.",
  },
  otherExact: {
    label: "Exact-color fit",
    className: "is-exact",
    description: "Shares the exact color identity without the active native faction reference.",
  },
  stretch: {
    label: "Stretch fit",
    className: "is-stretch",
    description: "Adds one nearby color while staying close to the reading pressure.",
  },
};

function compactPreconChip(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text || /^(null|undefined|n\/a|none|unclear from source)$/i.test(text)) {
    return "";
  }
  return wordExcerpt(text, 5);
}

function preconPreviewChips(precon) {
  const candidates = [
    ...(Array.isArray(precon?.mechanics) ? precon.mechanics : []),
    precon?.normalizedThemes?.primary?.displayName || precon?.rawPrimaryTheme || "",
    precon?.normalizedThemes?.secondary?.displayName || precon?.rawSecondaryTheme || "",
    precon?.creatureTypeFocus || "",
  ];
  const seen = new Set();
  const chips = [];

  candidates.forEach((candidate) => {
    const chip = compactPreconChip(candidate);
    const key = chip.toLowerCase();
    if (!chip || seen.has(key) || chips.length >= 3) {
      return;
    }
    seen.add(key);
    chips.push(chip);
  });

  return chips;
}

function buildPreconCardHtml(precon) {
  const previewGroup = precon?.previewGroup || precon?.group || (precon?.lane === "stretch" ? "stretch" : "otherExact");
  const badge = PRECON_BADGE_META[previewGroup] || PRECON_BADGE_META.otherExact;
  const publicRationale = precon?.publicRationale?.text || "";
  const rationaleProvenance = precon?.publicRationale?.provenance || null;
  const chips = preconPreviewChips(precon);
  const commanderRationale = `This card appears because it is the cataloged main commander of ${precon.deckName}.`;
  const commanderProvenance = `data/precons/vox-mana-precons.source.json#${precon.deckName}.mainCommander`;
  const commanderButtonAttrs = buildActionAttrs("open-card-detail", {
    cardName: precon.mainCommander,
    cardRationale: commanderRationale,
    cardProvenance: commanderProvenance,
    cardTags: chips.join("|"),
  });
  const researchLinks = buildPreconResearchLinks(precon);

  return `
    <div class="precon-card is-compact" data-precon-card data-precon-group="${escapeHtml(previewGroup)}"${rationaleProvenance ? ` data-rationale-provenance="${escapeAttributeValue(JSON.stringify(rationaleProvenance))}"` : ""}>
      <div class="precon-topline">
        <span class="precon-badge ${escapeHtml(badge.className)}" title="${escapeHtml(badge.description)}" aria-label="${escapeHtml(`${badge.label}: ${badge.description}`)}">${escapeHtml(badge.label)}</span>
        <span class="precon-product">${escapeHtml(precon.productSection)}</span>
      </div>
      <div class="precon-title">${escapeHtml(precon.deckName)}</div>
      <div class="precon-commander">Main commander: <button class="precon-commander-trigger" type="button" data-card-preview-name="${escapeAttributeValue(precon.mainCommander)}" ${commanderButtonAttrs}>${escapeHtml(precon.mainCommander)}</button></div>
      ${chips.length ? `<div class="precon-chip-row">${chips.map((chip) => `<span class="precon-chip">${escapeHtml(chip)}</span>`).join("")}</div>` : ""}
      ${publicRationale ? `<div class="precon-copy">${escapeHtml(publicRationale)}</div>` : ""}
      ${researchLinks.length ? `<div class="precon-links">${buildLinkButtons(researchLinks)}</div>` : ""}
      ${buildCommanderProviderDetails(precon)}
    </div>`;
}

function buildPreconSectionHtml(preconRecommendations, excludedCardIds = new Set()) {
  const preview = selectPreconPreviewRecommendations(preconRecommendations);
  if (!preconRecommendations?.hasAny || !preview.visible.length) {
    return `
      <div class="precons-section">
        <div class="section-label">Precon Starting Points</div>
        <div class="precon-empty">No support-pool precon starting points are available for this dossier yet.</div>
      </div>`;
  }

  const remaining = preview.remaining.filter((precon) => !excludedCardIds.has(canonicalUsageCardId(precon.mainCommander)));
  const canExpand = remaining.length > 0;
  const remainingCount = remaining.length;
  const collapsedLabel = `Display other ${remainingCount}`;
  const expandedLabel = `Show first ${preview.visible.length} precons`;
  const toggleAttrs = canExpand
    ? buildActionAttrs("toggle-precon-preview", {
        collapsedLabel,
        expandedLabel,
      })
    : "";

  return `
    <div class="precons-section">
      <div class="section-label">Precon Starting Points</div>
      <div class="precon-intro">Ready-made Commander decks compared through verified color identity and cataloged deck facts.</div>
      <div class="precon-meta">Use the recorded themes and mechanics to decide whether each deck is worth a closer look.</div>
      <div class="precon-grid is-compact" data-precon-preview-grid="primary">${preview.visible.map((precon) => buildPreconCardHtml(precon)).join("")}</div>
      ${canExpand ? `<div class="precon-grid is-compact" data-precon-preview-grid="remaining" hidden>${remaining.map((precon) => buildPreconCardHtml(precon)).join("")}</div>` : ""}
      ${canExpand ? `
        <div class="precon-reveal-row" data-precon-preview-overflow>
          <button class="precon-reveal-btn" type="button" aria-expanded="false" ${toggleAttrs}>
            ${escapeHtml(collapsedLabel)}
          </button>
        </div>` : ""}
    </div>`;
}

function togglePreconPreview(actionNode) {
  const section = actionNode.closest(".precons-section");
  const primaryGrid = section?.querySelector('[data-precon-preview-grid="primary"]');
  const remainingGrid = section?.querySelector('[data-precon-preview-grid="remaining"]');
  if (!primaryGrid || !remainingGrid) {
    return;
  }

  const isExpanded = actionNode.getAttribute("aria-expanded") === "true";
  const nextExpanded = !isExpanded;
  primaryGrid.hidden = nextExpanded;
  remainingGrid.hidden = !nextExpanded;
  actionNode.setAttribute("aria-expanded", nextExpanded ? "true" : "false");
  actionNode.textContent = nextExpanded
    ? actionNode.dataset.expandedLabel || "Show first 4 precons"
    : actionNode.dataset.collapsedLabel || "Display other precons";
}

function writeArchscryDossierHandoff(result, context) {
  try {
    localStorage.setItem(ARCHSCRY_MAZE_HANDOFF_KEY, JSON.stringify({
      ...context,
      placementResult: result,
      updatedAt: new Date().toISOString(),
    }));
  } catch (_) {}
}

function readArchscryDossierHandoff() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ARCHSCRY_MAZE_HANDOFF_KEY) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_) {
    return null;
  }
}

// Dossier panel, layout, URL, and segmented-control state.

function requestedDossierViewKey() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("view") || params.get("fit") || params.get("guild") || "").toUpperCase();
}

function normalizeDossierPanelId(value) {
  const panelId = String(value || "").trim().toLowerCase();
  if (!DOSSIER_PANEL_IDS.has(panelId)) return "";
  if (APP_STATE.hiddenDossierPanelIds?.has(panelId)) return "";
  return panelId;
}

function normalizeDossierLayoutMode(value) {
  const layoutMode = String(value || "").trim().toLowerCase();
  return DOSSIER_LAYOUT_MODES.has(layoutMode) ? layoutMode : "";
}

function resolveDossierConsoleState() {
  const params = new URLSearchParams(window.location.search);
  const forcedPanel = normalizeDossierPanelId(APP_STATE.forceDossierPanel);
  const requestedPanel = normalizeDossierPanelId(params.get("panel"));
  const requestedLayout = normalizeDossierLayoutMode(params.get("layout"));
  const activePanel =
    forcedPanel ||
    requestedPanel ||
    normalizeDossierPanelId(APP_STATE.activeDossierPanel) ||
    DOSSIER_DEFAULT_PANEL_ID;
  const layoutMode =
    requestedLayout ||
    normalizeDossierLayoutMode(APP_STATE.dossierLayoutMode) ||
    DOSSIER_DEFAULT_LAYOUT_MODE;

  APP_STATE.activeDossierPanel = activePanel;
  APP_STATE.dossierLayoutMode = layoutMode;
  APP_STATE.forceDossierPanel = "";
  return { activePanel, layoutMode };
}

function updateDossierUrlState({ panel = APP_STATE.activeDossierPanel, layout = APP_STATE.dossierLayoutMode } = {}) {
  const activePanel = normalizeDossierPanelId(panel) || DOSSIER_DEFAULT_PANEL_ID;
  const layoutMode = normalizeDossierLayoutMode(layout) || DOSSIER_DEFAULT_LAYOUT_MODE;
  const url = new URL(window.location.href);
  url.searchParams.set("panel", activePanel);
  url.searchParams.set("layout", layoutMode);
  window.history.replaceState(window.history.state || {}, "", `${url.pathname}${url.search}${url.hash}`);
}

function captureMazeReturnUrl() {
  const params = new URLSearchParams(window.location.search);
  APP_STATE.mazeReturnUrl = params.get("mazeReturnUrl") || "";
  APP_STATE.mazeReturnAnchor = params.get("from") === "maze" && window.location.hash === "#maze-discovery-paths"
    ? "maze-discovery-paths"
    : "";
}

function clearNode(node) {
  if (!node) return;
  if (typeof node.replaceChildren === "function") {
    node.replaceChildren();
    return;
  }
  if ("innerHTML" in node) {
    node.innerHTML = "";
    return;
  }
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function escapeAttributeValue(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildActionAttrs(action, dataset = {}) {
  const attrs = [`data-action="${escapeAttributeValue(action)}"`];
  Object.entries(dataset).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    const attrKey = `data-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
    attrs.push(`${attrKey}="${escapeAttributeValue(value)}"`);
  });
  return attrs.join(" ");
}

function escapeHtml(value) {
  return sanitizeUserFacingCopy(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function decodeNumericHtmlEntities(value) {
  return String(value ?? "").replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, (match, hex, decimal) => {
    const codePoint = Number.parseInt(hex || decimal, hex ? 16 : 10);
    if (!Number.isSafeInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return match;
    try {
      return String.fromCodePoint(codePoint);
    } catch (_) {
      return match;
    }
  });
}

export function renderPlayerCopy(value) {
  return decodeNumericHtmlEntities(value)
    .split(/(\{C\})/g)
    .map((part) => part === "{C}"
      ? '<span class="vm-inline-mana-symbol" role="img" aria-label="colorless mana"><i class="ms ms-c ms-cost" aria-hidden="true"></i></span>'
      : escapeHtml(part))
    .join("");
}

function sanitizeUserFacingCopy(value) {
  return SYSTEM_COPY_REPLACEMENTS.reduce(
    (copy, rule) => copy.replace(rule.pattern, rule.replacement),
    String(value ?? "")
  );
}

function buildDossierTabsHtml(location, activePanel, layoutMode) {
  const active = normalizeDossierPanelId(activePanel) || DOSSIER_DEFAULT_PANEL_ID;
  const isAllMode = layoutMode === "all";
  return DOSSIER_PANEL_CONFIG.filter((panel) => !APP_STATE.hiddenDossierPanelIds?.has(panel.id)).map((panel, index) => {
    const selected = !isAllMode && panel.id === active;
    const shortLabel = panel.mobileLabel || panel.label;
    return `
      <button
        class="vm-tab dossier-tab${selected ? " is-active" : ""}"
        type="button"
        id="dossier-tab-${location}-${panel.id}"
        role="tab"
        aria-selected="${selected ? "true" : "false"}"
        aria-controls="dossier-panel-${panel.id}"
        tabindex="${selected || (!isAllMode && index === 0) ? "0" : "-1"}"
        data-dossier-tab="${panel.id}"
        aria-label="${escapeAttributeValue(panel.label)}"
        ${buildActionAttrs("set-dossier-panel", { panelId: panel.id })}
      ><span class="dossier-tab-label dossier-tab-label--full">${escapeHtml(panel.label)}</span><span class="dossier-tab-label dossier-tab-label--compact" aria-hidden="true">${escapeHtml(shortLabel)}</span></button>`;
  }).join("");
}

function buildDossierPanelHtml({ id, activePanel, layoutMode, content }) {
  const active = normalizeDossierPanelId(activePanel) || DOSSIER_DEFAULT_PANEL_ID;
  const visible = layoutMode === "all" || id === active;
  return `
    <section
      class="vm-panel dossier-panel${id === active ? " is-active" : ""}"
      id="dossier-panel-${id}"
      role="tabpanel"
      aria-labelledby="dossier-tab-rail-${id}"
      data-dossier-panel="${id}"
      ${visible ? "" : "hidden"}
    >
      ${content}
    </section>`;
}

function buildDossierLayoutToggleHtml(layoutMode) {
  const isAllMode = layoutMode === "all";
  return `
    <button
      class="btn-secondary dossier-view-toggle${isAllMode ? " is-active" : ""}"
      type="button"
      aria-pressed="${isAllMode ? "true" : "false"}"
      ${buildActionAttrs("toggle-dossier-layout", { layout: isAllMode ? "focus" : "all" })}
    >${isAllMode ? "Focus View" : "View All"}</button>`;
}

function buildDossierUtilityActionsHtml({ isPrimary, layoutMode }) {
  const isAllMode = layoutMode === "all";
  return `
    <div class="dossier-utility-actions" data-dossier-utility-actions ${isAllMode ? "hidden" : ""}>
      <button class="btn-secondary dossier-utility-btn" type="button" ${buildActionAttrs("retake")}>Begin Again</button>
    </div>`;
}

function buildAccountDeckLinkPanelHtml({ result }) {
  const faction = getFaction(result?.faction);
  const placementName = result?.faction_name || faction?.name || "this reading";
  const signedInCopy = SESSION.username
    ? `Saved under ${escapeHtml(SESSION.username)} for ${escapeHtml(placementName)}.`
    : "Sign in with Google from this reading before saving private external deck links.";

  return `
    <div class="deck-link-section" data-account-deck-links>
      <div class="deck-link-section-head">
        <div>
          <div class="section-label">External Deck Links</div>
          <h2>External Deck Links Saved For This Reading</h2>
          <p class="deck-link-copy">${signedInCopy}</p>
        </div>
        <button class="btn-secondary" type="button" ${buildActionAttrs("refresh-deck-links")}>Refresh</button>
      </div>
      <div class="deck-link-layout">
        <form class="deck-link-form" data-deck-link-form>
          <label class="deck-link-field">
            <span>Deck URL</span>
            <input name="deck_url" type="url" autocomplete="url" placeholder="https://moxfield.com/decks/..." required>
          </label>
          <div class="deck-link-field-grid">
            <label class="deck-link-field">
              <span>Deck Title</span>
              <input name="deck_title" type="text" maxlength="120" autocomplete="off" placeholder="Table-ready shell">
            </label>
            <label class="deck-link-field">
              <span>Commander</span>
              <input name="commander_name" type="text" maxlength="120" autocomplete="off" placeholder="Commander name">
            </label>
          </div>
          <label class="deck-link-field">
            <span>Private Note</span>
            <textarea name="user_note" rows="4" maxlength="500" placeholder="Why this deck belongs with the reading."></textarea>
          </label>
          <div class="deck-link-actions">
            <button class="btn-primary" type="button" ${buildActionAttrs("save-deck-link")}>Save Deck Link</button>
          </div>
          <p class="deck-link-status" id="deck-link-status" data-tone="muted" role="status" aria-live="polite"></p>
        </form>
        <div class="deck-link-account-list" aria-live="polite">
          <div class="deck-link-list-head">
            <h3>Saved Links</h3>
          </div>
          <div class="deck-link-list" id="deck-link-account-list"></div>
        </div>
      </div>
    </div>`;
}

function setDeckLinkStatus(message, tone = "muted") {
  const status = document.getElementById("deck-link-status");
  if (!status) return;
  status.textContent = message || "";
  status.dataset.tone = tone;
}

function setDeckLinkControlsDisabled(disabled) {
  const root = document.querySelector("[data-account-deck-links]");
  root?.querySelectorAll("input, textarea, button").forEach((control) => {
    control.disabled = disabled;
  });
}

function readDeckLinkFormInput() {
  const form = document.querySelector("[data-deck-link-form]");
  if (!(form instanceof HTMLFormElement)) {
    return {};
  }
  const formData = new FormData(form);
  return {
    deck_url: String(formData.get("deck_url") || "").trim(),
    deck_title: String(formData.get("deck_title") || "").trim(),
    commander_name: String(formData.get("commander_name") || "").trim(),
    user_note: String(formData.get("user_note") || "").trim(),
    visibility: "private",
  };
}

function currentDeckLinkPlacementResult() {
  return APP_STATE.activeResult || SESSION.profile?.placementResult || vm_getCachedPlacementResult();
}

function safeDeckLinkHref(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.href : "";
  } catch (_) {
    return "";
  }
}

function renderAccountDeckLinks(rows = []) {
  const list = document.getElementById("deck-link-account-list");
  if (!list) return;
  clearNode(list);

  if (!SESSION.username) {
    const empty = document.createElement("p");
    empty.className = "deck-link-empty";
    empty.textContent = "Sign in with Google to keep private external deck links with this reading.";
    list.appendChild(empty);
    return;
  }

  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "deck-link-empty";
    empty.textContent = "No private deck links saved yet.";
    list.appendChild(empty);
    return;
  }

  rows.forEach((row) => {
    const card = document.createElement("article");
    card.className = "saved-deck-link-card";

    const head = document.createElement("div");
    head.className = "saved-deck-link-head";

    const provider = document.createElement("span");
    provider.className = "deck-link-provider";
    provider.textContent = String(row.provider || "deck").replace(/[-_]+/g, " ");

    const visibility = document.createElement("span");
    visibility.className = "deck-link-visibility";
    visibility.dataset.visibility = row.visibility || "private";
    visibility.textContent = row.visibility || "private";

    head.append(provider, visibility);

    const title = document.createElement("h4");
    title.textContent = row.deck_title;
    if (!title.textContent) {
      title.textContent = row.commander_name || "Saved deck link";
    }

    const meta = document.createElement("div");
    meta.className = "saved-deck-link-meta";
    [row.placement_name, row.commander_name, row.color_identity_key].filter(Boolean).forEach((value) => {
      const chip = document.createElement("span");
      chip.textContent = value;
      meta.appendChild(chip);
    });

    const note = document.createElement("p");
    note.className = "saved-deck-link-note";
    note.textContent = row.user_note;
    if (!note.textContent) {
      note.textContent = "No private note saved for this deck link.";
    }

    const actions = document.createElement("div");
    actions.className = "saved-deck-link-actions";
    const href = safeDeckLinkHref(row.deck_url);
    if (href) {
      const open = document.createElement("a");
      open.className = "deck-link-open";
      open.href = href;
      open.target = "_blank";
      open.rel = "noopener noreferrer";
      open.textContent = "Open deck";
      actions.appendChild(open);
    }

    const remove = document.createElement("button");
    remove.className = "btn-secondary";
    remove.type = "button";
    remove.dataset.action = "archive-deck-link";
    remove.dataset.deckLinkId = row.id || "";
    remove.textContent = "Remove";
    actions.appendChild(remove);

    card.append(head, title, meta, note, actions);
    list.appendChild(card);
  });
}

async function refreshAccountDeckLinks() {
  if (!document.querySelector("[data-account-deck-links]")) {
    return;
  }
  if (!SESSION.username) {
    renderAccountDeckLinks([]);
    setDeckLinkStatus("Sign in before saving private external deck links.");
    return;
  }

  try {
    setDeckLinkStatus("Loading saved deck links...");
    const rows = await listUserDeckLinks();
    renderAccountDeckLinks(rows);
    setDeckLinkStatus(
      rows.length ? `${rows.length} saved deck link${rows.length === 1 ? "" : "s"} loaded.` : "No saved deck links yet.",
      rows.length ? "ok" : "muted"
    );
  } catch (error) {
    renderAccountDeckLinks([]);
    setDeckLinkStatus(error.message || "Could not load saved deck links.", "error");
  }
}

async function handleSaveDeckLink() {
  const result = currentDeckLinkPlacementResult();
  if (!result) {
    setDeckLinkStatus("Complete or restore a reading first.", "error");
    return;
  }
  if (!SESSION.username) {
    setDeckLinkStatus("Sign in with Google before saving private external deck links.", "error");
    return;
  }

  try {
    setDeckLinkControlsDisabled(true);
    setDeckLinkStatus("Saving deck link...");
    await saveUserDeckLink({
      input: readDeckLinkFormInput(),
      placementResult: result,
    });
    const form = document.querySelector("[data-deck-link-form]");
    if (form instanceof HTMLFormElement) {
      form.reset();
    }
    setDeckLinkStatus("Deck link saved.", "ok");
    await refreshAccountDeckLinks();
  } catch (error) {
    setDeckLinkStatus(error.message || "Could not save deck link.", "error");
  } finally {
    setDeckLinkControlsDisabled(false);
  }
}

async function handleArchiveDeckLink(actionNode) {
  const deckLinkId = actionNode?.dataset?.deckLinkId || "";
  if (!deckLinkId) {
    setDeckLinkStatus("Could not find that deck link.", "error");
    return;
  }

  try {
    setDeckLinkControlsDisabled(true);
    setDeckLinkStatus("Removing deck link...");
    await archiveUserDeckLink({ deckLinkId });
    setDeckLinkStatus("Deck link removed.", "ok");
    await refreshAccountDeckLinks();
  } catch (error) {
    setDeckLinkStatus(error.message || "Could not remove deck link.", "error");
  } finally {
    setDeckLinkControlsDisabled(false);
  }
}

function buildPlacementSnapshotHtml({ dossier, includeAlternative = true, tiedPeerDossier = null }) {
  const summary = dossier?.resultSummaryStrip || {};
  const adjacentFit = summary.adjacentFit || {};
  const whereThisLeads = summary.whereThisLeads || {};
  const playPattern = summary.playPattern || {};
  const activeIdentityName = dossier?.faction?.name || dossier?.targetFactionKey || "This identity";

  const alternativeCard = includeAlternative && summary.adjacentFit ? `
      <div class="dossier-snapshot-card dossier-snapshot-card--adjacent" data-summary-card="adjacent-fit" data-signal-band="${escapeAttributeValue(adjacentFit.signalBand || "close")}">
        <span>${escapeHtml(adjacentFit.label || "Close alternative")}</span>
        <strong>${escapeHtml(adjacentFit.heading || adjacentFit.targetName || "Alternative path")}</strong>
        <div class="dossier-snapshot-signal">${escapeHtml(adjacentFit.signalLabel || "Close is relative within this reading; it is not a certainty claim.")}</div>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(adjacentFit.relationshipCopy || "This path received direct support from the same recorded answers.")}</div>
      </div>` : "";
  const tiedPeerName = tiedPeerDossier?.faction?.name || "";
  const tiedPeerKey = tiedPeerDossier?.targetFactionKey || "";
  const tiedPeerCard = tiedPeerName && tiedPeerKey ? `
      <div class="dossier-snapshot-card dossier-snapshot-card--co-leader" data-summary-card="co-leader" data-tied-identity-container="other" data-identity-key="${escapeAttributeValue(tiedPeerKey)}">
        <span>Also tied with ${escapeHtml(tiedPeerName)}</span>
        <div class="dossier-snapshot-co-leader-title">
          <strong>${escapeHtml(tiedPeerName)}</strong>
          ${buildManaPipsHtml(tiedPeerDossier.faction?.colors || [], "tied-co-leader-pips")}
        </div>
        <div class="dossier-snapshot-copy">Your answers supported both readings without clearly separating them.</div>
        <button class="btn-secondary" type="button" ${buildActionAttrs("switch-adjacent-view", { viewKey: tiedPeerKey })}>Compare this co-leader</button>
      </div>` : "";

  return `
    <div class="dossier-snapshot" aria-label="Result summary strip">
      ${alternativeCard}
      <div class="dossier-snapshot-card dossier-snapshot-card--narrative" data-summary-card="where-this-leads" data-summary-identity-key="${escapeAttributeValue(dossier?.targetFactionKey || "")}">
        <span>${escapeHtml(`${whereThisLeads.label || "Where this leads"} - ${activeIdentityName}`)}</span>
        <strong>${escapeHtml(whereThisLeads.heading || "Commander direction")}</strong>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(whereThisLeads.body || "This reading points toward a Commander plan with a visible, repeatable pressure pattern.")}</div>
        ${buildSummaryTagRowHtml(whereThisLeads.tags || [])}
      </div>
      <div class="dossier-snapshot-card dossier-snapshot-card--play-pattern" data-summary-card="play-pattern" data-summary-identity-key="${escapeAttributeValue(dossier?.targetFactionKey || "")}">
        <span>${escapeHtml(`${playPattern.label || "Play pattern"} - ${activeIdentityName}`)}</span>
        <strong>${escapeHtml(playPattern.heading || "At the table")}</strong>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(playPattern.body || "Opponents usually read this identity through the pressure it keeps visible and the answers it makes them spend.")}</div>
      </div>
      ${tiedPeerCard}
    </div>`;
}

function normalizeDossierSegment(group, segment, segments) {
  const segmentId = String(segment || "").trim().toLowerCase();
  return segments.some((item) => item.id === segmentId) ? segmentId : segments[0]?.id || "";
}

function availableDossierSegments(group) {
  const configured = APP_STATE.dossierAvailableSegments?.[group];
  if (Array.isArray(configured) && configured.length) {
    return configured;
  }
  return group === "mana-base" ? MANA_BASE_SEGMENTS : STARTER_CARD_SEGMENTS;
}

function buildSegmentControlsHtml(group, segments, activeSegment, label) {
  const active = normalizeDossierSegment(group, activeSegment, segments);
  return `
    <div class="dossier-segment-controls" role="group" aria-label="${escapeAttributeValue(label)}">
      ${segments.map((segment) => `
        <button
          class="vm-tab dossier-segment-tab${segment.id === active ? " is-active" : ""}"
          type="button"
          aria-pressed="${segment.id === active ? "true" : "false"}"
          data-dossier-segment="${group}:${segment.id}"
          ${buildActionAttrs("set-dossier-segment", { segmentGroup: group, segment: segment.id })}
        >${escapeHtml(segment.label)}</button>`).join("")}
    </div>`;
}

function buildSegmentPanelHtml(group, segment, activeSegment, content) {
  const visible = segment === activeSegment;
  return `
    <div class="dossier-segment-panel" data-dossier-segment-panel="${group}:${segment}" ${visible ? "" : "hidden"}>
      ${content}
    </div>`;
}

function applyDossierSegmentState(group) {
  const segments = availableDossierSegments(group);
  const active = normalizeDossierSegment(group, APP_STATE.dossierSegments[group], segments);
  APP_STATE.dossierSegments[group] = active;

  document.querySelectorAll(`[data-dossier-segment^="${group}:"]`).forEach((button) => {
    const isActive = button.getAttribute("data-dossier-segment") === `${group}:${active}`;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  document.querySelectorAll(`[data-dossier-segment-panel^="${group}:"]`).forEach((panel) => {
    panel.hidden = panel.getAttribute("data-dossier-segment-panel") !== `${group}:${active}`;
  });
}

function setDossierSegment(group, segment) {
  if (group !== "starter-cards" && group !== "mana-base") {
    return;
  }
  const segments = availableDossierSegments(group);
  APP_STATE.dossierSegments[group] = normalizeDossierSegment(group, segment, segments);
  applyDossierSegmentState(group);
}

function applyDossierConsoleState() {
  const activePanel = normalizeDossierPanelId(APP_STATE.activeDossierPanel) || DOSSIER_DEFAULT_PANEL_ID;
  const layoutMode = normalizeDossierLayoutMode(APP_STATE.dossierLayoutMode) || DOSSIER_DEFAULT_LAYOUT_MODE;
  const isAllMode = layoutMode === "all";
  const consoleNode = document.querySelector("[data-dossier-console]");

  APP_STATE.activeDossierPanel = activePanel;
  APP_STATE.dossierLayoutMode = layoutMode;

  if (consoleNode) {
    consoleNode.setAttribute("data-dossier-layout", layoutMode);
  }

  document.querySelectorAll("[data-dossier-panel]").forEach((panel) => {
    const isActive = panel.getAttribute("data-dossier-panel") === activePanel;
    panel.hidden = !isAllMode && !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll("[data-dossier-tab]").forEach((tab) => {
    const isActive = tab.getAttribute("data-dossier-tab") === activePanel;
    tab.classList.toggle("is-active", isActive && !isAllMode);
    tab.setAttribute("aria-selected", isActive && !isAllMode ? "true" : "false");
    tab.setAttribute("tabindex", isActive || isAllMode ? "0" : "-1");
  });

  document.querySelectorAll(".dossier-view-toggle").forEach((button) => {
    button.classList.toggle("is-active", isAllMode);
    button.setAttribute("aria-pressed", isAllMode ? "true" : "false");
    button.textContent = isAllMode ? "Focus View" : "View All";
    button.dataset.layout = isAllMode ? "focus" : "all";
  });

  document.querySelectorAll("[data-dossier-utility-actions]").forEach((node) => {
    node.hidden = isAllMode;
  });

  applyDossierSegmentState("starter-cards");
  applyDossierSegmentState("mana-base");
  initializeDossierMobileTabs({ revealActive: true });
}

function updateDossierTabOverflow(shell) {
  const tablist = shell?.querySelector("[data-dossier-mobile-tabs]");
  if (!(tablist instanceof HTMLElement)) return;
  const maxScroll = Math.max(0, tablist.scrollWidth - tablist.clientWidth);
  const hasOverflow = maxScroll > 2;
  const canScrollLeft = hasOverflow && tablist.scrollLeft > 2;
  const canScrollRight = hasOverflow && tablist.scrollLeft < maxScroll - 2;
  const leftButton = shell.querySelector('[data-dossier-scroll-direction="left"]');
  const rightButton = shell.querySelector('[data-dossier-scroll-direction="right"]');

  shell.classList.toggle("has-overflow", hasOverflow);
  shell.classList.toggle("can-scroll-left", canScrollLeft);
  shell.classList.toggle("can-scroll-right", canScrollRight);
  if (leftButton instanceof HTMLButtonElement) {
    leftButton.hidden = !canScrollLeft;
    leftButton.disabled = !canScrollLeft;
  }
  if (rightButton instanceof HTMLButtonElement) {
    rightButton.hidden = !canScrollRight;
    rightButton.disabled = !canScrollRight;
  }
}

function scrollDossierTabs(direction) {
  const shell = document.querySelector("[data-dossier-tabs-shell]");
  const tablist = shell?.querySelector("[data-dossier-mobile-tabs]");
  if (!(tablist instanceof HTMLElement)) return;
  const distance = Math.max(180, Math.round(tablist.clientWidth * 0.72));
  if (typeof tablist.scrollBy === "function") {
    tablist.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  } else {
    tablist.scrollLeft += direction === "left" ? -distance : distance;
  }
  globalThis.setTimeout(() => updateDossierTabOverflow(shell), 180);
}

function initializeDossierMobileTabs({ revealActive = false } = {}) {
  document.querySelectorAll("[data-dossier-tabs-shell]").forEach((shell) => {
    const tablist = shell.querySelector("[data-dossier-mobile-tabs]");
    if (!(tablist instanceof HTMLElement)) return;

    if (tablist.dataset.dossierScrollBound !== "true") {
      tablist.dataset.dossierScrollBound = "true";
      tablist.addEventListener("scroll", () => updateDossierTabOverflow(shell), { passive: true });
      tablist.addEventListener("wheel", (event) => {
        if (tablist.scrollWidth <= tablist.clientWidth + 2 || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
        tablist.scrollLeft += event.deltaY;
        event.preventDefault();
      }, { passive: false });

      let dragStartX = 0;
      let dragStartScroll = 0;
      let dragged = false;
      let suppressSyntheticDragClick = false;
      let activeDragPointerId = null;
      tablist.addEventListener("pointerdown", (event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        activeDragPointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartScroll = tablist.scrollLeft;
        dragged = false;
      });
      tablist.addEventListener("pointermove", (event) => {
        if (event.pointerId !== activeDragPointerId || !(event.buttons & 1)) return;
        const delta = event.clientX - dragStartX;
        if (!dragged && Math.abs(delta) > 6) {
          dragged = true;
          tablist.classList.add("is-dragging");
          tablist.setPointerCapture?.(event.pointerId);
        }
        if (!dragged) return;
        tablist.scrollLeft = dragStartScroll - delta;
        event.preventDefault();
      });
      const finishDrag = (event) => {
        if (event.pointerId !== activeDragPointerId) return;
        if (tablist.hasPointerCapture?.(event.pointerId)) tablist.releasePointerCapture?.(event.pointerId);
        tablist.classList.remove("is-dragging");
        activeDragPointerId = null;
        if (dragged) {
          suppressSyntheticDragClick = true;
          // A click synthesized from this pointer sequence is dispatched before
          // the next task. Clear the guard immediately afterward so a later,
          // intentional tab click cannot inherit stale drag state.
          globalThis.setTimeout(() => {
            suppressSyntheticDragClick = false;
            dragged = false;
          }, 0);
        } else {
          dragged = false;
        }
      };
      tablist.addEventListener("pointerup", finishDrag);
      tablist.addEventListener("pointercancel", finishDrag);
      tablist.addEventListener("click", (event) => {
        if (suppressSyntheticDragClick) {
          event.preventDefault();
          event.stopPropagation();
          suppressSyntheticDragClick = false;
          dragged = false;
        }
      }, true);
    }

    const refresh = () => {
      updateDossierTabOverflow(shell);
      if (revealActive) {
        const activeTab = tablist.querySelector('[data-dossier-tab].is-active');
        activeTab?.scrollIntoView?.({ block: "nearest", inline: "center" });
      }
      globalThis.setTimeout(() => updateDossierTabOverflow(shell), 0);
    };
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(refresh);
    else refresh();
  });
}

function setDossierPanel(panelId, { updateUrl = true } = {}) {
  const activePanel = normalizeDossierPanelId(panelId);
  if (!activePanel) {
    return;
  }
  APP_STATE.activeDossierPanel = activePanel;
  APP_STATE.dossierLayoutMode = "focus";
  hideCardPreviewOverlay();
  applyDossierConsoleState();
  if (updateUrl) {
    updateDossierUrlState();
  }
  initializeDossierRadarIfVisible();
}

function setDossierLayoutMode(layoutMode, { updateUrl = true } = {}) {
  const normalized = normalizeDossierLayoutMode(layoutMode) || DOSSIER_DEFAULT_LAYOUT_MODE;
  APP_STATE.dossierLayoutMode = normalized;
  hideCardPreviewOverlay();
  applyDossierConsoleState();
  if (updateUrl) {
    updateDossierUrlState();
  }
  initializeDossierRadarIfVisible();
}

function isDossierRadarMeasurable() {
  const canvas = document.getElementById("dossierManaRadar");
  if (!canvas) return false;
  const panel = canvas.closest("[data-dossier-panel]");
  if (panel?.hidden) return false;
  const parent = canvas.parentElement;
  const rect = parent?.getBoundingClientRect?.() || canvas.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function initializeDossierRadarIfVisible(result = APP_STATE.activeResult, faction = APP_STATE.activeDossierRadarFaction) {
  const radarFaction = faction || getFaction(APP_STATE.activeViewKey) || getFaction(result?.faction);
  if (!result || !radarFaction || !document.getElementById("dossierManaRadar")) {
    return;
  }

  if (!isDossierRadarMeasurable()) {
    window.requestAnimationFrame(() => {
      if (isDossierRadarMeasurable()) {
        initDossierManaRadar({
          result,
          faction: radarFaction,
          identityLayers: APP_STATE.identityLayers,
          profile: getDossierRadarProfile(result, radarFaction, APP_STATE.identityLayers),
        });
      }
    });
    return;
  }

  initDossierManaRadar({
    result,
    faction: radarFaction,
    identityLayers: APP_STATE.identityLayers,
    profile: getDossierRadarProfile(result, radarFaction, APP_STATE.identityLayers),
  });
}

function normalizeCardName(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function taxonomyEntry(category, tag) {
  return APP_STATE.tagTaxonomyByKey.get(`${category}:${tag}`) || null;
}

function tagRefsForRecord(record = {}) {
  return [
    ...(record.detected_tags?.mechanical || []).map((tag) => ({ category: "mechanical", tag })),
    ...(record.detected_tags?.playstyle || []).map((tag) => ({ category: "playstyle", tag })),
    ...(record.detected_tags?.identity || []).map((tag) => ({ category: "identity", tag })),
    ...(record.lore_tones || []).map((tag) => ({ category: "lore-tone", tag })),
  ];
}

function uniqueTagRefs(refs = []) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = `${ref.category}:${ref.tag}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function archscryTermHelp() {
  const map = {};
  for (const record of APP_STATE.discoveryEducationCatalog?.glossary || []) {
    for (const label of [record.term, ...(record.aliases || [])]) map[label] = record.definition;
  }
  return map;
}

let renderedEducationalTerms = new Set();

function renderEducationalText(value) {
  const text = String(value || "");
  const termHelp = archscryTermHelp();
  const terms = Object.keys(termHelp).sort((left, right) => right.length - left.length);
  if (!terms.length) return renderPlayerCopy(text);
  const escapedTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi");
  return text.split(matcher).map((part) => {
    const canonical = terms.find((term) => term.toLowerCase() === part.toLowerCase());
    if (!canonical) return renderPlayerCopy(part);
    const termKey = canonical.toLowerCase();
    if (renderedEducationalTerms.has(termKey)) return renderPlayerCopy(part);
    renderedEducationalTerms.add(termKey);
    const help = termHelp[canonical];
    return `<span class="vm-gloss archscry-term-help" tabindex="0" data-gloss="${escapeAttributeValue(help)}">${escapeHtml(part)}</span>`;
  }).join("");
}

function renderTagChips(tagRefs = [], limit = 6) {
  return uniqueTagRefs(tagRefs)
    .slice(0, limit)
    .map((ref) => {
      const entry = taxonomyEntry(ref.category, ref.tag);
      if (!entry) return "";
      return `<span class="vm-tag-chip" title="${escapeHtml(entry.canonical_definition)}">${escapeHtml(entry.display_name)}</span>`;
    })
    .join("");
}

function renderStaticTagChips(labels = [], limit = 6) {
  return [...new Set(labels.map((label) => String(label || "").trim()).filter(Boolean))]
    .slice(0, limit)
    .map((label) => `<span class="vm-tag-chip">${escapeHtml(label)}</span>`)
    .join("");
}

function colorlessCuratedFlavorTags(cardName, fallbackTags = []) {
  const normalized = normalizeCardName(cardName);
  const byCard = new Map([
    ["all is dust", [
      { category: "identity", tag: "cosmic" },
      { category: "mechanical", tag: "exile" },
      { category: "lore-tone", tag: "inevitable" },
    ]],
    ["adarkar sentinel", [
      { category: "mechanical", tag: "artifacts" },
      { category: "identity", tag: "cosmic" },
      { category: "lore-tone", tag: "ancient" },
    ]],
    ["bane of bala ged", [
      { category: "identity", tag: "cosmic" },
      { category: "mechanical", tag: "big-mana" },
      { category: "lore-tone", tag: "inevitable" },
    ]],
  ]);
  return byCard.get(normalized) || fallbackTags;
}

function renderTagInterpretations(tagRefs = [], limit = 3) {
  return uniqueTagRefs(tagRefs)
    .slice(0, limit)
    .map((ref) => {
      const entry = taxonomyEntry(ref.category, ref.tag);
      if (!entry) return "";
      const note = entry.new_player_note || entry.table_feel || entry.canonical_definition;
      return `
        <div class="tag-interpretation">
          <div class="tag-interpretation-name">${escapeHtml(entry.display_name)}</div>
          <div class="starter-copy">${escapeHtml(entry.vox_mana_interpretation)}</div>
          <div class="tag-helper">${escapeHtml(note)}</div>
        </div>`;
    })
    .join("");
}

function isColorIdentitySubset(cardIdentity = [], factionColors = []) {
  const allowed = new Set(factionColors || []);
  return (cardIdentity || []).every((color) => allowed.has(color));
}

function wordExcerpt(value, maxWords = 18) {
  const words = String(value || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function stablePhrase(kind, key) {
  const variants = HELPER_COPY_VARIANTS[kind] || [];
  if (!variants.length) return "";
  const hash = String(key || kind)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return variants[hash % variants.length];
}

function flavorExcerptForCard(card) {
  return card.flavor_excerpt || (card.card_faces || []).find((face) => face.flavor_excerpt)?.flavor_excerpt || "";
}

function resolveIndexedFlavorCardForSnippet(snippet, cards = []) {
  const snippetName = normalizeCardName(snippet?.card_name || "");
  const snippetExcerpt = String(snippet?.flavor_excerpt || "");
  if (!snippetName || !snippetExcerpt) return null;
  return (cards || []).find((card) =>
    normalizeCardName(card?.name || "") === snippetName &&
    flavorExcerptForCard(card) === snippetExcerpt
  ) || (cards || []).find((card) => normalizeCardName(card?.name || "") === snippetName) || null;
}

function normalizedCardNameSet(cardNames = []) {
  const values = cardNames instanceof Set ? Array.from(cardNames) : cardNames;
  return new Set((values || [])
    .map((name) => normalizeCardName(name || ""))
    .filter(Boolean));
}

export function selectCuratedFlavorEchoesForFaction({
  faction,
  snippets = {},
  flavorCards = [],
  commanderCards = [],
  tagRefs = [],
  excludedCardNames = [],
} = {}) {
  const key = faction?.key || faction?.identity?.expression_key || "";
  const curated = Array.isArray(snippets[key]) ? snippets[key] : [];
  if (curated.length < 2) return [];
  const fallbackTags = uniqueTagRefs(tagRefs).slice(0, 3);
  const excludedNames = normalizedCardNameSet(excludedCardNames);
  return curated.map((snippet) => {
    const indexedCard =
      resolveIndexedFlavorCardForSnippet(snippet, flavorCards) ||
      resolveIndexedFlavorCardForSnippet(snippet, commanderCards) ||
      {};
    const cardName = snippet.card_name || indexedCard.name || "";
    return {
      card: {
        ...indexedCard,
        name: cardName,
        flavor_excerpt: snippet.flavor_excerpt || flavorExcerptForCard(indexedCard),
        scryfall_uri: snippet.scryfall_uri || indexedCard.scryfall_uri || "#",
        image_uris: indexedCard.image_uris || null,
        card_faces: indexedCard.card_faces || [],
        color_identity: indexedCard.color_identity || [],
      },
      refs: tagRefsForRecord(indexedCard),
      tagMatches: String(key).toUpperCase() === "COLORLESS"
        ? colorlessCuratedFlavorTags(cardName, fallbackTags)
        : fallbackTags,
      score: 100,
      identityFits: true,
      curatedSnippet: true,
    };
  }).filter((entry) =>
    entry.card.name &&
    !excludedNames.has(normalizeCardName(entry.card.name)) &&
    flavorExcerptForCard(entry.card)
  ).slice(0, 3);
}

export function selectFlavorEchoes({
  faction,
  tagRefs = [],
  excludedCardNames = [],
  includeCurated = true,
  snippets = APP_STATE.archscryFlavorSnippets?.snippets || {},
  flavorCards = APP_STATE.scryfallFlavorIndex?.cards || [],
  commanderCards = APP_STATE.scryfallCommanderIndex?.commanders || [],
} = {}) {
  const excludedNames = normalizedCardNameSet(excludedCardNames);
  if (includeCurated) {
    const curated = selectCuratedFlavorEchoesForFaction({
      faction,
      snippets,
      flavorCards,
      commanderCards,
      tagRefs,
      excludedCardNames: excludedNames,
    });
    if (curated.length >= 2) return curated;
  }

  const desired = new Set(uniqueTagRefs(tagRefs).map((ref) => `${ref.category}:${ref.tag}`));
  const factionColors = faction?.colors || [];
  const seenCardNames = new Set();
  const cards = [...(flavorCards || []), ...(commanderCards || [])].filter((card) => {
    const cardName = normalizeCardName(card?.name || "");
    if (!cardName || seenCardNames.has(cardName) || excludedNames.has(cardName)) return false;
    seenCardNames.add(cardName);
    return true;
  });

  return cards
    .map((card) => {
      const refs = tagRefsForRecord(card);
      const identityFits = isColorIdentitySubset(card.color_identity || [], factionColors);
      const tagMatches = refs.filter((ref) => desired.has(`${ref.category}:${ref.tag}`));
      const toneMatches = tagMatches.filter((ref) => ref.category === "identity" || ref.category === "lore-tone");
      const score =
        (identityFits ? 5 : 0) +
        tagMatches.length * 3 +
        toneMatches.length * 2 +
        (flavorExcerptForCard(card) ? 1 : 0) +
        ((card.image_uris?.art_crop || card.image_uris?.normal) ? 1 : 0);
      return { card, refs, tagMatches, score, identityFits };
    })
    .filter((item) => item.identityFits && item.tagMatches.length && item.score > 6 && flavorExcerptForCard(item.card))
    .sort((left, right) => right.score - left.score || left.card.name.localeCompare(right.card.name))
    .slice(0, 3);
}

function buildDiscoverySummaryHtml({ dossier, faction, result }) {
  const observations = (dossier?.readingOmens || []).slice(0, 3);
  if (!observations.length) return "";
  const canSharpen = observations.length < 3 && result?.refinement?.kind === "ask_targeted_question" && placementQuestionById(result.refinement.question_id);
  return `
    <div class="starter-section" data-public-fit-reasons>
      <div class="section-label">Why This Fit</div>
      <p class="signals-intro">These are the answer-derived observations that moved this reading toward ${escapeHtml(faction.name)}.</p>
      <div class="starter-grid public-three-item-grid" data-item-count="${observations.length}">
        ${observations.map((observation) => `
          <div class="starter-card omen-card">
            <div class="starter-title">${escapeHtml(observation.answerTitle)}</div>
            <div class="starter-copy">${renderPlayerCopy(observation.copy)}</div>
          </div>`).join("")}
      </div>
      ${canSharpen ? `<div class="why-fit-refinement"><p>A further approved observation may make this explanation more specific without changing the naming standard.</p><button class="btn-secondary" type="button" ${buildActionAttrs("start-result-refinement")}>Sharpen This Reading</button></div>` : ""}
    </div>`;
}

function buildDossierInterpretationHtml({ dossier, faction, result }) {
  const publicMatches = [
    ...(result?.top_matches || []),
    ...(result?.adjacent_matches || []),
  ];
  const comparisonMatch = publicMatches.find((match) =>
    match?.faction && match.faction !== dossier.targetFactionKey
  );
  const comparisonFaction = comparisonMatch?.faction ? getFaction(comparisonMatch.faction) : null;

  return `
    ${buildTestTheFitHtml({ dossier, faction, comparisonFaction })}
    <div class="starter-section">
      <div class="section-label">How This Plays</div>
      <div class="starter-grid">${buildHowThisPlaysCardHtml(faction)}</div>
    </div>`;
}

function factionCardRationaleRecords(faction, catalog = APP_STATE.cardRationaleCatalog) {
  const identityKey = faction?.key || faction?.identity?.expression_key || "";
  return (catalog?.records || [])
    .filter((record) => record?.identity_key === identityKey && record?.rationale && record?.card?.name)
    .sort((left, right) =>
      Number(left.display_priority || 0) - Number(right.display_priority || 0) ||
      String(left.card.name).localeCompare(String(right.card.name))
    )
    .slice(0, 3);
}

export function approvedCardRationaleForFaction(card, faction, catalog = APP_STATE.cardRationaleCatalog) {
  const normalizedName = normalizeCardName(card?.name);
  const record = factionCardRationaleRecords(faction, catalog).find((entry) =>
    normalizeCardName(entry.card.name) === normalizedName
  );
  if (!record) return null;
  return {
    text: record.rationale,
    tags: Array.isArray(record.tags) ? record.tags : [],
    provenance: {
      relationshipId: record.relationship_id,
      relationshipClass: record.relationship_class,
      cardData: record.card.data_locator,
      claimIds: record.provenance?.claim_ids || [],
      sourceIds: record.provenance?.source_ids || [],
      relationshipEvidenceLocator: record.provenance?.relationship_evidence_locator || "",
      evidenceRole: "approved-card-rationale-catalog",
    },
  };
}

export function selectApprovedCardRationales({
  faction,
  catalog = APP_STATE.cardRationaleCatalog,
  cardByName = APP_STATE.scryfallLocalCardByName,
  excludedCardIds = new Set(),
} = {}) {
  return factionCardRationaleRecords(faction, catalog)
    .map((record) => {
      const card = cardByName?.get?.(normalizeCardName(record.card.name)) || null;
      if (!card || (record.card.oracle_id && card.oracle_id !== record.card.oracle_id)) return null;
      if (excludedCardIds.has(card.oracle_id || normalizeCardName(card.name))) return null;
      return {
        card,
        rationale: approvedCardRationaleForFaction(card, faction, catalog),
        relationshipId: record.relationship_id,
      };
    })
    .filter((entry) => entry?.rationale);
}

export function selectApprovedCardVoices({
  faction,
  catalog = APP_STATE.cardVoiceCatalog,
  cardByName = APP_STATE.scryfallLocalCardByName,
  excludedCardIds = new Set(),
} = {}) {
  const key = faction?.key || faction?.identity?.expression_key || "";
  return (catalog?.records || [])
    .filter((record) => record.identity_key === key)
    .sort((left, right) => Number(left.display_priority || 0) - Number(right.display_priority || 0) || String(left.card?.name || "").localeCompare(String(right.card?.name || "")))
    .map((record) => {
      const card = cardByName?.get?.(normalizeCardName(record.card?.name || "")) || null;
      if (!card || (record.card?.oracle_id && card.oracle_id !== record.card.oracle_id)) return null;
      const cardId = card.oracle_id || normalizeCardName(card.name);
      if (excludedCardIds.has(cardId) && record.critical_repeat?.allowed !== true) return null;
      return { card, record };
    })
    .filter(Boolean);
}

function canonicalUsageCardId(cardOrName) {
  const card = typeof cardOrName === "string"
    ? APP_STATE.scryfallLocalCardByName.get(normalizeCardName(cardOrName))
    : cardOrName;
  return card?.oracle_id || normalizeCardName(card?.name || cardOrName || "");
}

function addUsageCards(target, cards = []) {
  for (const card of cards) {
    const id = canonicalUsageCardId(card);
    if (id) target.add(id);
  }
  return target;
}

function filterPreconRecommendationsForEditorialCards(preconRecommendations = {}, excludedCardIds = new Set()) {
  const filtered = { ...preconRecommendations };
  for (const group of ["nativeExact", "otherExact", "stretch"]) {
    filtered[group] = (preconRecommendations[group] || []).filter((precon) => (
      !excludedCardIds.has(canonicalUsageCardId(precon.mainCommander))
    ));
  }
  filtered.hasAny = ["nativeExact", "otherExact", "stretch"].some((group) => filtered[group].length > 0);
  return filtered;
}

function filterStarterCardsForUsage(starterCards = {}, excludedCardIds = new Set()) {
  return Object.fromEntries(["creatures", "spells", "permanents"].map((group) => [
    group,
    (starterCards[group] || []).filter((name) => !excludedCardIds.has(canonicalUsageCardId(name))),
  ]));
}

export function buildCardVoicesHtml(voices = []) {
  if (!voices.length) return "";
  return `
    <div class="starter-section" data-card-voice-section>
      <div class="section-label">Cards That Sound Like This</div>
      <p class="flavor-echo-intro">Exact card voices whose approved relationship echoes this reading without treating flavor alone as identity proof.</p>
      <div class="flavor-echo-grid public-three-item-grid" data-item-count="${voices.length}">
        ${voices.map(({ card, record }) => {
          const image = card.image_uris?.art_crop || card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.art_crop || "";
          const actionAttrs = buildActionAttrs("open-card-detail", { cardName: card.name });
          return `
            <button class="flavor-echo-card vm-card-voice-card" type="button" data-card-preview-name="${escapeAttributeValue(card.name)}" data-card-voice-provenance="${escapeAttributeValue(JSON.stringify(record.provenance || {}))}" ${actionAttrs}>
              ${image ? `<img class="vm-card-voice-image" src="${escapeHtml(image)}" alt="${escapeAttributeValue(`${card.name} card art`)}" loading="lazy">` : `<span class="flavor-echo-image-fallback" aria-label="Card image unavailable">Image unavailable</span>`}
              <span class="flavor-echo-body">
                <span class="flavor-echo-name">${escapeHtml(card.name)}</span>
                <span class="flavor-echo-kicker">Exact card voice</span>
                <span class="flavor-echo-why">“${escapeHtml(record.excerpt)}”</span>
                <span class="flavor-echo-kicker">Why it echoes</span>
                <span class="flavor-echo-why">${escapeHtml(record.why_it_echoes)}</span>
                <span class="flavor-echo-action">View card details</span>
              </span>
            </button>`;
        }).join("")}
      </div>
    </div>`;
}

function cardImageUrl(record = {}) {
  return record.image_uris?.normal ||
    record.image_uris?.art_crop ||
    record.card_faces?.[0]?.image_uris?.normal ||
    record.card_faces?.[0]?.image_uris?.art_crop ||
    record.image_uri ||
    "";
}

function canonicalFlavorLookupName(card = {}) {
  if (card.scryfall_id && card.card_faces?.[0]?.name) return card.card_faces[0].name;
  return card.name || "";
}

export function buildFlavorEchoesHtml(flavorEchoes = [], faction = {}, catalog = APP_STATE.cardRationaleCatalog) {
  if (!flavorEchoes.length) return "";
  const groundedEchoes = flavorEchoes
    .map((entry) => ({
      ...entry,
      rationale: entry.rationale || approvedCardRationaleForFaction(entry.card, faction, catalog),
    }))
    .filter((entry) => entry.rationale);
  if (!groundedEchoes.length) return "";
  return `
    <div class="starter-section" data-card-rationale-section>
      <div class="section-label">Why These Cards Echo This Reading</div>
      <div class="flavor-echo-intro">Each example below has an approved card-to-identity explanation in the repository.</div>
      <div class="flavor-echo-grid public-three-item-grid" data-item-count="${groundedEchoes.length}">
        ${groundedEchoes.map(({ card, rationale }) => {
          const image = card.image_uris?.art_crop || card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.art_crop || "";
          const actionAttrs = buildActionAttrs("open-card-detail", {
            cardName: card.name,
            cardRationale: rationale.text,
            cardProvenance: JSON.stringify(rationale.provenance),
            cardTags: rationale.tags.join("|"),
          });
          return `
            <button class="flavor-echo-card" type="button" data-card-preview-name="${escapeAttributeValue(card.name)}" data-rationale-provenance="${escapeAttributeValue(JSON.stringify(rationale.provenance))}" ${actionAttrs}>
              ${image ? `<img class="vm-card-rationale-image" src="${escapeHtml(image)}" alt="${escapeAttributeValue(`${card.name} card art`)}" loading="lazy">` : `<span class="flavor-echo-image-fallback" aria-label="Card image unavailable">Image unavailable</span>`}
              <span class="flavor-echo-body">
                <span class="flavor-echo-name">${escapeHtml(card.name)}</span>
                <span class="flavor-echo-kicker">Why it appears</span>
                <span class="flavor-echo-why">${escapeHtml(rationale.text)}</span>
                ${rationale.tags.length ? `<span class="vm-tag-row">${renderStaticTagChips(rationale.tags, 3)}</span>` : ""}
                <span class="flavor-echo-action">View card details</span>
              </span>
            </button>`;
        }).join("")}
      </div>
    </div>`;
}

function readLocalReadingFindsDraft() {
  try {
    const raw = localStorage.getItem(READING_FINDS_STORAGE_KEY);
    if (!raw) return { status: "empty", draft: null };
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? { status: "loaded", draft: parsed }
      : { status: "empty", draft: null };
  } catch (_) {
    return { status: "unavailable", draft: null };
  }
}

function humanizeReadingFindLabel(value = "") {
  return String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function readingFindSourceLabels(rows = []) {
  const labels = rows
    .map((row) => row.sourceContext?.pathType || row.sourceContext?.fit || "")
    .filter(Boolean)
    .map((pathType) => MAZE_PATH_LABELS[pathType] || humanizeReadingFindLabel(pathType));
  return [...new Set(labels)].slice(0, 3);
}

function readingFindTagLabels(tagRefs = []) {
  return [...new Set((tagRefs || [])
    .map((ref) => humanizeReadingFindLabel(ref?.tag || ""))
    .filter(Boolean))]
    .slice(0, 3);
}

function buildReadingFindReflectionCopy(rows = [], tagRefs = []) {
  const sources = readingFindSourceLabels(rows);
  const tags = readingFindTagLabels(tagRefs);
  const sourceCopy = sources.length ? ` through ${sources.join(", ")}` : "";
  const tagCopy = tags.length ? ` and line up with ${tags.join(", ")}` : "";
  return `These finds echo this reading${sourceCopy}${tagCopy}. Treat them as local notes from Maze, not as a complete conclusion.`;
}

function buildReadingFindRowsHtml(rows = []) {
  return READING_FIND_SECTION_CONFIG.map((section) => {
    const sectionRows = rows.filter((row) => row.section === section.id);
    if (!sectionRows.length) return "";
    return `
      <div class="maze-finds-group">
        <h4>${escapeHtml(section.label)}</h4>
        <ul>
          ${sectionRows.map((row) => `
            <li>
              <span>${escapeHtml(`${row.quantity || 1} ${row.name || "Unknown card"}`)}</span>
            </li>`).join("")}
        </ul>
      </div>`;
  }).filter(Boolean).join("");
}

function buildReadingFindsHtml({ readingId = "", tagRefs = [] } = {}) {
  const localFinds = readLocalReadingFindsDraft();
  if (localFinds.status === "unavailable") return "";

  const rows = localFinds.draft ? getRowsForReading(localFinds.draft, readingId) : [];
  const hasMismatch = localFinds.draft && !rows.length && hasRowsForOtherReadings(localFinds.draft, readingId);
  const message = hasMismatch
    ? "These finds were saved locally, but they do not appear to belong to this reading."
    : "No Maze finds have been set aside for this reading yet.";

  return `
    <div class="maze-finds-card" data-reading-finds-panel>
      <div class="starter-title">Your Maze Finds</div>
      ${rows.length
        ? `<p class="starter-copy">${escapeHtml(buildReadingFindReflectionCopy(rows, tagRefs))}</p>
          <div class="maze-finds-list">${buildReadingFindRowsHtml(rows)}</div>`
        : `<p class="starter-copy">${escapeHtml(message)}</p>`}
    </div>`;
}

function buildMazeDiscoveryHtml(paths = [], readingFindsHtml = "") {
  if (!paths.length && !readingFindsHtml) return "";
  const title = stablePhrase("mazeTitle", paths.map((path) => path.pathType || path.label).join("|"));
  return `
    <div class="starter-section" id="maze-discovery-paths">
      <div class="section-label">Maze Discovery Paths</div>
      <div class="starter-grid">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${escapeHtml(title)}</div>
          <div class="starter-copy">Open live searchable paths shaped by this dossier. Each thread keeps a way back here, so discoveries can wander through Scryfall without losing the reading that began them.</div>
          <div class="starter-links">${buildLinkButtons(paths)}</div>
        </div>
      </div>
      ${readingFindsHtml}
    </div>`;
}

// Result rendering and adjacent-dossier switching.

function scrollToAnchorOnce(anchor) {
  const hash = anchor || APP_STATE.mazeReturnAnchor;
  if (!hash) return;
  const target = document.getElementById(hash);
  if (!target) return;

  window.requestAnimationFrame(() => {
    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
  });
}

function buildApocryphaHtml(faction) {
  return "";
}

function indexedCommanderForCandidate(candidate) {
  return APP_STATE.scryfallCommanderByName.get(normalizeCardName(candidate?.name || "")) || null;
}

function commanderMetaHtml(indexed) {
  if (!indexed) return "";
  return [
    indexed.type_line ? `<span>${escapeHtml(indexed.type_line)}</span>` : "",
  ].filter(Boolean).join("");
}

/**
 * Returns the active placement result and viewing key for result rendering.
 *
 * @returns {{result:object|null,viewKey:string|null}} Active result context.
 */
function getActiveResultContext() {
  return {
    result: APP_STATE.activeResult || SESSION.profile?.placementResult || vm_getCachedPlacementResult(),
    viewKey: APP_STATE.activeViewKey || APP_STATE.activeResult?.faction || SESSION.profile?.placementResult?.faction || null,
  };
}

function shouldDisableResultCardArt() {
  return globalThis.__vmVisualRegressionDisableCardArt === true;
}

function getResumableQuickQuestion() {
  if (!APP_STATE.placementModel || !APP_STATE.adaptiveState) return null;
  const question = APP_STATE.currentQuickQuestion || selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  if (!isResumableGateAQuestion({
    placementModel: APP_STATE.placementModel,
    adaptiveState: APP_STATE.adaptiveState,
    question,
  })) return null;
  return question;
}

function resumeIncompleteQuickReading() {
  const question = getResumableQuickQuestion();
  if (!question) {
    renderBoundedResultShell(APP_STATE.activeResult, "incomplete");
    return;
  }
  APP_STATE.currentQuickQuestion = question;
  showSection("quick");
  renderQuickQuestion();
  window.setTimeout(() => {
    document.getElementById("quick")?.scrollIntoView({ block: "start", inline: "nearest" });
  }, 0);
}

function renderBoundedResultShell(result, state) {
  const [heading, copy] = gateAStatePresentation(state);
  const isLegacy = isLegacyGateAResult(result);
  const identityName = state === "unknown"
    ? result?.faction_name || getFaction(result?.faction)?.name || result?.faction
    : "";
  const shellCopy = isLegacy && state === "unknown" && identityName
    ? `Legacy reading — ${identityName} was saved, but answer/evidence detail is unavailable.`
    : copy;
  const continueAction = state === "incomplete" && getResumableQuickQuestion()
    ? `<button class="btn-primary" type="button" ${buildActionAttrs("resume-quick-flow")}>Continue</button>`
    : "";
  const refinement = result?.refinement || {};
  const refinementAction = refinement.kind === "ask_targeted_question" && placementQuestionById(refinement.question_id)
    ? `<button class="btn-primary" type="button" ${buildActionAttrs("start-result-refinement")}>Sharpen This Reading</button>`
    : refinement.kind === "revisit_prior_answer" && refinement.revisit?.question_id
      ? `<button class="btn-primary" type="button" ${buildActionAttrs("revisit-result-answer")}>Revisit a Conditional Answer</button>`
      : "";
  const supportedDirections = state === "mixed"
    ? (result?.top_matches || []).filter((match) => match?.faction).slice(0, 3)
    : [];
  const directionActions = supportedDirections.length ? `
    <div class="bounded-direction-actions" aria-label="Supported reading directions">
      ${supportedDirections.map((match) => {
        const faction = getFaction(match.faction);
        return faction ? `<button class="btn-secondary" type="button" ${buildActionAttrs("show-bounded-direction", { viewKey: match.faction })}>Explore ${escapeHtml(faction.name)}</button>` : "";
      }).join("")}
    </div>
    <div class="bounded-direction-detail" data-bounded-direction-detail aria-live="polite"></div>` : "";
  const noDiscriminatorCopy = refinement.kind === "no_approved_discriminator"
    ? `<p>${escapeHtml(refinement.limitation || "The approved instrument cannot responsibly separate the remaining directions with another available question.")}</p>`
    : "";
  document.getElementById("result-inner").innerHTML = `
    <div class="empty-state bounded-result-shell" data-result-state="${escapeAttributeValue(state)}">
      <h2>${escapeHtml(heading)}</h2>
      <p>${escapeHtml(shellCopy)}</p>
      ${state === "mixed" || state === "contradictory"
        ? "<p>Explore more than one Commander path, or retake when you want a fresh reading. No identity-specific recommendation is being inferred here.</p>"
        : ""}
      ${directionActions}
      ${noDiscriminatorCopy}
      <div class="landing-actions" style="justify-content:center;margin-top:1.5rem">
        ${continueAction}
        ${refinementAction}
        <button class="btn-secondary" type="button" ${buildActionAttrs("start-quick-flow")}>Restart</button>
      </div>
    </div>`;
  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result?.faction || null;
  showSection("result");
  updateTopbar();
}

function showBoundedDirection(identityKey) {
  const faction = getFaction(identityKey);
  const content = dossierContentForFaction(identityKey);
  const detail = document.querySelector("[data-bounded-direction-detail]");
  if (!faction || !content || !detail) return;
  detail.innerHTML = `
    <div class="starter-card bounded-direction-card">
      <div class="starter-title">${escapeHtml(faction.name)}</div>
      <div class="starter-copy">${renderPlayerCopy(content.test_the_fit.positive_self_check)}</div>
      <div class="starter-copy">${renderPlayerCopy(content.how_this_plays.table_experience)}</div>
    </div>`;
}

/**
 * Renders the main dossier view for the active placement result.
 *
 * @param {string=} viewKey Optional faction key to view inside the current result.
 */
function renderResult(viewKey) {
  const context = getActiveResultContext();
  const result = withGateAPublicState({
    result: context.result,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });
  const resultState = deriveGateAResultState({
    result,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });
  const closeAlternative = closeAlternativeForResult(result, APP_STATE.placementModel, APP_STATE.factions);
  const tiedAlternative = resultState === "tied" ? result?.top_matches?.[1] : null;
  const explorationAlternatives = resultState === "primary" && result?.alternative_state === "exploration"
    ? (result?.adjacent_matches || []).slice(0, 2)
    : [];
  const requestedKey = viewKey || context.viewKey;
  const allowedAlternativeKeys = new Set([
    result?.faction,
    closeAlternative?.match?.faction,
    tiedAlternative?.faction,
    ...explorationAlternatives.map((match) => match?.faction),
  ].filter(Boolean));
  const activeKey = allowedAlternativeKeys.has(requestedKey) ? requestedKey : result?.faction;
  const terminalEnabled = isScryingTerminalEnabled();
  destroyDossierManaRadar();
  renderedEducationalTerms = new Set();

  if (!result) {
    document.getElementById("result-inner").innerHTML = `
      <div class="empty-state">
        <h2>No reading yet.</h2>
        <p>Start with the quick path, then come back here for the full dossier.</p>
        <div class="landing-actions" style="justify-content:center;margin-top:1.5rem">
          <button class="btn-primary" type="button" ${buildActionAttrs("show-section", { section: "landing" })}>Go to landing</button>
        </div>
      </div>`;
    showSection("result");
    updateTopbar();
    return;
  }

  if (["mixed", "contradictory", "insufficient", "unknown", "invalid", "incomplete"].includes(resultState) && !(resultState === "unknown" && isLegacyGateAResult(result))) {
    renderBoundedResultShell(result, resultState);
    return;
  }

  if (!activeKey) {
    renderBoundedResultShell(result, "invalid");
    return;
  }

  APP_STATE.activeResult = result;
  vm_cachePlacementResult(result);

  const starterProfile = result.starter_profile || getStarterProfile();
  const dossier = buildCommanderDossier({
    factions: APP_STATE.factions,
    placementModel: APP_STATE.placementModel,
    deckTagCatalog: APP_STATE.deckTagCatalog,
    placementResult: result,
    targetFactionKey: activeKey,
    starterProfile,
    summaryPresentationForFaction: presentationForFaction,
    summaryContrastCopyBuilder: approvedComparisonCopy,
  });
  const tiedPeerDossier = resultState === "tied" && activeKey === result.faction && tiedAlternative?.faction
    ? buildCommanderDossier({
        factions: APP_STATE.factions,
        placementModel: APP_STATE.placementModel,
        deckTagCatalog: APP_STATE.deckTagCatalog,
        placementResult: result,
        targetFactionKey: tiedAlternative.faction,
        starterProfile,
        summaryPresentationForFaction: presentationForFaction,
        summaryContrastCopyBuilder: approvedComparisonCopy,
      })
    : null;
  const faction = dossier.faction.record;
  const institutionLabel = getInstitutionLabel(faction);
  const isPrimary = dossier.isPrimary;
  const archidektSearchLinks = dossier.links.archidekt || [];
  const commanderLane = dossier.commanderLane;
  const commanderDirectoryLinks = dossier.links.commanderStart || [];
  const commanderPreviewCandidates = dossier.commanderRecommendations || [];
  const landRecommendations = dossier.landRecommendations || {};
  const modelMechanics = APP_STATE.placementModel?.factions?.[dossier.targetFactionKey]?.identity?.mechanics || "";
  const readingTagRefs = selectReadingTagRefs({
    dossier,
    result,
    taxonomy: APP_STATE.tagTaxonomy,
    modelMechanics,
  });
  const preconRecommendations = buildPreconRecommendations({
    faction,
    dossier,
    readingTagRefs,
    starterProfile,
    preconCatalog: APP_STATE.preconCatalog,
    preconThemeTaxonomy: APP_STATE.preconThemeTaxonomy,
  });
  const preconCommanderIds = new Set(["nativeExact", "otherExact", "stretch"]
    .flatMap((group) => preconRecommendations[group] || [])
    .map((precon) => canonicalUsageCardId(precon.mainCommander)));
  const editorialCardUsage = new Set();
  const rationaleRecords = factionCardRationaleRecords(faction);
  const nonPreconRationales = rationaleRecords.filter((record) => !preconCommanderIds.has(canonicalUsageCardId(record.card.name)));
  for (const record of nonPreconRationales.length ? nonPreconRationales : rationaleRecords.slice(0, 1)) {
    addUsageCards(editorialCardUsage, [record.card.name]);
  }
  for (const record of (APP_STATE.cardVoiceCatalog?.records || []).filter((entry) => entry.identity_key === faction.key)) {
    addUsageCards(editorialCardUsage, [record.card?.name]);
  }
  const usablePreconRecommendations = filterPreconRecommendationsForEditorialCards(preconRecommendations, editorialCardUsage);
  const matrixFlavorSnippets = matrixFlavorSnippetsForFaction(faction);
  const pageCardUsage = new Set();
  const preconPreview = selectPreconPreviewRecommendations(usablePreconRecommendations);
  const visiblePrecons = preconPreview.visible;
  addUsageCards(pageCardUsage, visiblePrecons.map((precon) => precon.mainCommander));
  const flavorEchoes = selectApprovedCardRationales({ faction, excludedCardIds: pageCardUsage });
  addUsageCards(pageCardUsage, flavorEchoes.map((entry) => entry.card));
  const cardVoices = selectApprovedCardVoices({ faction, excludedCardIds: pageCardUsage });
  addUsageCards(pageCardUsage, cardVoices.map((entry) => entry.card));
  addUsageCards(pageCardUsage, preconPreview.remaining
    .filter((precon) => !pageCardUsage.has(canonicalUsageCardId(precon.mainCommander)))
    .map((precon) => precon.mainCommander));
  const starterCardsForUsage = filterStarterCardsForUsage(dossier.starterCards, pageCardUsage);
  const mazeContext = buildArchscryMazeContext({ result, dossier, faction });
  writeArchscryDossierHandoff(result, mazeContext);
  const personalizedMazePaths = withArchscryMazeContext(
    buildPersonalizedMazePaths({ faction, tagRefs: readingTagRefs, taxonomy: APP_STATE.tagTaxonomy }),
    mazeContext,
    window.location.href
  );
  const discoverySummaryHtml = buildDiscoverySummaryHtml({ dossier, faction, result });
  const dossierInterpretationHtml = buildDossierInterpretationHtml({ dossier, faction, result, tagRefs: readingTagRefs });
  const flavorEchoesHtml = buildFlavorEchoesHtml(flavorEchoes, faction);
  const cardVoicesHtml = buildCardVoicesHtml(cardVoices);
  const readingFindsHtml = buildReadingFindsHtml({ readingId: mazeContext.readingId, tagRefs: readingTagRefs });
  const mazeDiscoveryHtml = buildMazeDiscoveryHtml(personalizedMazePaths, readingFindsHtml);
  const apocryphaHtml = buildApocryphaHtml(faction);
  const heroNarrative = buildHeroNarrative({ dossier, faction, result, factions: APP_STATE.factions });
  const adjacentContextHtml = buildAdjacentContextHtml({ dossier, result });
  const activeExpressionEntries = Object.values(APP_STATE.identityLayers?.expressions || {})
    .filter((entry) => entry?.active !== false);
  const activeExpressionCount = activeExpressionEntries.length || Object.keys(APP_STATE.factions || {}).length || 15;
  const atlasFrontierCopy = `The complete ${activeExpressionCount}-identity atlas is available for exploration. This reading is one bounded path through it, not a claim that every identity was equally tested by these answers.`;
  const archetypeItems = dossierContentForFaction(faction)?.what_to_look_for.map((item) => ({
    name: item.title,
    desc: item.copy,
    provenance: {
      record_id: dossierContentForFaction(faction)?.provenance?.record_id,
      item_id: item.item_id,
      source_locator: item.source_locator,
    },
  })) || [];
  const archetypeHtml = archetypeItems
    .map((item) => `<div class="arch-card" data-guidance-provenance="${escapeAttributeValue(JSON.stringify(item.provenance))}"><div class="arch-name">${renderEducationalText(item.name)}</div><div class="arch-desc">${renderEducationalText(item.desc)}</div></div>`)
    .join("");

  function cardSlots(items, prefix, placeholderClass, imageClass) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="staple-wrap"><div class="${placeholderClass}" id="${id}" aria-label="${escapeAttributeValue(`${name} card art`)}"></div><div class="staple-name">${escapeHtml(name)}</div></div>`;
      })
      .join("");
  }

  function landSlots(items, prefix) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="land-wrap"><div class="land-placeholder" id="${id}" aria-label="${escapeAttributeValue(`${name} card art`)}"></div><div class="land-name">${name}</div></div>`;
      })
      .join("");
  }

  function commanderPreviewSlots(items) {
    return (items || [])
      .map((candidate, index) => {
        const id = `cmd_${index}`;
        const indexed = indexedCommanderForCandidate(candidate);
        const meta = commanderMetaHtml(indexed);
        const tagChips = candidate.displayTags?.length
          ? renderStaticTagChips(candidate.displayTags, 3)
          : indexed ? renderTagChips(tagRefsForRecord(indexed), 3) : "";
        return `
          <div class="commander-preview-card" data-commander-card>
            <div class="commander-art-shell">
              <div class="commander-placeholder" id="${id}" aria-label="${escapeAttributeValue(`${candidate.name} card art`)}"></div>
            </div>
            <div class="commander-preview-body">
              <div class="commander-name">${candidate.name}</div>
              ${meta ? `<div class="commander-meta">${meta}</div>` : ""}
              <div class="commander-desc">${candidate.desc}</div>
              ${tagChips ? `<div class="commander-tags">${tagChips}</div>` : ""}
            </div>
          </div>`;
      })
      .join("");
  }

  const renderState = buildDossierRenderState({
    starterCards: starterCardsForUsage,
    colors: faction.colors || [],
  });
  const renderableStarterCards = renderState.starterCards;
  const starterCardSegments = renderState.starterCardSegments;
  const hasStarterCardReferences = renderState.hasStarterCardReferences;
  const basicLandCopy = renderState.basicLandCopy;
  const commanderPreviewHtml = commanderPreviewCandidates.length ? `
    <div class="commander-preview-block" data-commander-preview-block hidden>
      <div class="commander-preview-grid" id="commander-preview-grid">${commanderPreviewSlots(commanderPreviewCandidates)}</div>
    </div>` : "";

  const adjacentMatches = resultState === "tied" ? [] : dossier.adjacentFits || [];
  const adjacentHtml = adjacentMatches.length
    ? adjacentMatches
        .map((fit, index) => {
          return `
            <div class="adjacent-card ${fit.factionKey === activeKey ? "active" : ""}">
              <div class="adjacent-label">${result?.alternative_state === "exploration"
                ? `${index === 0 ? "Also plausible" : "Worth comparing"} · ${fit.world}`
                : fit.world}</div>
              <div class="adjacent-name">${fit.name}</div>
              <div class="adjacent-copy">${fit.reason || fit.tagline}</div>
              <div class="adjacent-copy">${resultState === "tied"
                ? "Your answers supported both readings without clearly separating them."
                : result?.alternative_state === "exploration"
                  ? "This independently supported comparison does not change the clear primary result."
                  : "Close is relative within this reading; it is not a certainty claim."}</div>
              <div class="adjacent-actions">
                <button class="adjacent-btn" type="button" ${buildActionAttrs("switch-adjacent-view", { viewKey: fit.factionKey })}>${resultState === "tied"
                  ? "Compare this co-leader"
                  : result?.alternative_state === "exploration"
                    ? "Compare this direction"
                    : "Compare this alternative"}</button>
              </div>
            </div>`;
        })
        .join("")
    : "";
  const adjacentSectionHtml = adjacentHtml ? `
    <div class="adjacent-section" id="adjacent-fits">
      <div class="section-label">${resultState === "tied"
        ? "Co-leaders"
        : result?.alternative_state === "exploration"
          ? "Other supported directions"
          : "Close alternative"}</div>
      <div class="adjacent-grid">${adjacentHtml}</div>
    </div>` : "";
  const returnToPrimaryButton = !isPrimary
    ? `<div class="footer-button-row"><button class="btn-secondary" type="button" ${buildActionAttrs("return-primary-reading")}>Back to original reading</button></div>`
    : "";

  const saveButtonLabel = SESSION.username ? "Save this reading" : "Save with Google";
  const returnToTerminalButton =
    terminalEnabled && APP_STATE.resultSource === "interview"
      ? `<button class="btn-secondary" type="button" ${buildActionAttrs("return-interview-source")}>Return to the Terminal</button>`
      : "";
  const decreeCopy = dossier.decreeCopy;
  const pipsHtml = buildManaPipsHtml(faction.colors || [], "guild-mana-symbols");
  const decksHtml = buildDeckDiscoveryHtml(buildDeckDiscoveryGroups({
    faction,
    archidektLinks: archidektSearchLinks,
    commanderDirectoryLinks,
    tagRefs: readingTagRefs,
  }));
  const preconSectionHtml = Array.isArray(APP_STATE.preconCatalog?.precons)
    ? buildPreconSectionHtml(usablePreconRecommendations)
    : "";
  const landLaneCopy = landLaneCopyForFaction(faction);
  const isColorlessFaction = String(faction?.key || "").toUpperCase() === "COLORLESS";
  const colorlessManaPrimerHtml = isColorlessFaction ? `
    <div class="starter-grid mana-primer-grid">
      <div class="starter-card">
        <div class="starter-title">Wastes First</div>
        <div class="starter-copy">${renderPlayerCopy("Use Wastes and true {C} producers as the floor before adding utility lands.")}</div>
      </div>
      <div class="starter-card">
        <div class="starter-title">Rocks And Sources</div>
        <div class="starter-copy">Mana rocks help the deck reach expensive colorless spells, but generic costs are not colorless mana.</div>
      </div>
      <div class="starter-card">
        <div class="starter-title">Color-Choice Caution</div>
        <div class="starter-copy">${renderPlayerCopy("Command Tower cannot choose colorless, and Reflecting Pool-style effects need another source that can already make {C}.")}</div>
      </div>
    </div>` : "";
  const manaBaseSegments = MANA_BASE_SEGMENTS.filter((segment) =>
    hasRenderableLandTier(landRecommendations, segment.id)
  );
  const utilityTierHtml = (landRecommendations.utility || []).length
    ? `
        <div class="land-tier tier-utility">
          <div class="land-tier-label">${isColorlessFaction ? "Utility Land Caution" : "Utility"}</div>
          <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.utility)}</div>
          <div class="land-cards-row">${landSlots(landRecommendations.utility, "lu")}</div>
        </div>`
    : "";
  const hiddenDossierPanelIds = [];
  if (!hasStarterCardReferences) {
    hiddenDossierPanelIds.push("starter-cards");
  }
  if (!adjacentSectionHtml) {
    hiddenDossierPanelIds.push("adjacent");
  }
  if (resultState === "unknown") {
    hiddenDossierPanelIds.push("start", "why", "commander-deck-starts", "decks-saved", "starter-cards", "mana-base");
  }
  APP_STATE.hiddenDossierPanelIds = new Set(hiddenDossierPanelIds);
  APP_STATE.dossierAvailableSegments = {
    "starter-cards": starterCardSegments,
    "mana-base": manaBaseSegments,
  };
  const { activePanel, layoutMode } = resolveDossierConsoleState();
  const starterSegment = normalizeDossierSegment(
    "starter-cards",
    APP_STATE.dossierSegments["starter-cards"],
    starterCardSegments
  );
  const manaBaseSegment = normalizeDossierSegment(
    "mana-base",
    APP_STATE.dossierSegments["mana-base"],
    manaBaseSegments
  );
  APP_STATE.dossierSegments["starter-cards"] = starterSegment;
  APP_STATE.dossierSegments["mana-base"] = manaBaseSegment;
  const placementSnapshotHtml = buildPlacementSnapshotHtml({
    dossier,
    includeAlternative: resultState !== "tied",
    tiedPeerDossier: resultState === "tied" && isPrimary ? tiedPeerDossier : null,
  });
  const utilityActionsHtml = buildDossierUtilityActionsHtml({ isPrimary, layoutMode });
  const primaryName = result.faction_name || getFaction(result.faction)?.name || result.faction;
  const alternativeName = (tiedAlternative || closeAlternative?.match)?.faction_name ||
    getFaction((tiedAlternative || closeAlternative?.match)?.faction)?.name ||
    (tiedAlternative || closeAlternative?.match)?.faction;
  const stateHeading = resultState === "tied"
    ? isPrimary
      ? "Original reading"
      : `Other co-leader - ${faction.name}`
    : resultState === "close"
      ? `Close result: ${primaryName}, with ${alternativeName} also supported`
      : resultState === "unknown"
        ? "Legacy reading — evidence detail unavailable"
        : `Current best fit: ${primaryName}`;
  const stateExplanation = resultState === "unknown" && isLegacyGateAResult(result)
    ? "This historical result preserves its saved identity, but it does not contain answer detail for a current fit or strength claim."
    : gateAStatePresentation(resultState)[1];
  const placementPanelHtml = `
    ${adjacentContextHtml}
    ${resultState === "tied" ? "" : `<div class="result-state-banner" data-result-state="${escapeAttributeValue(resultState)}">
      <strong>${escapeHtml(stateHeading)}</strong>
      <span>${escapeHtml(stateExplanation)}</span>
    </div>`}
    ${resultState === "unknown" ? `<div class="result-limitation-notice" role="note">Legacy reading — ${escapeHtml(faction.name)} was saved, but answer/evidence detail is unavailable. Matrix content is identity context, not confirmation of the reading. Retake if you want an answer-grounded result.</div>` : ""}
    ${returnToPrimaryButton}
    ${discoverySummaryHtml}
    ${renderDossierRadarSection({ result, faction, dossier, flavorSnippets: matrixFlavorSnippets, identityLayers: APP_STATE.identityLayers })}`;
  const whyPanelHtml = `
    ${dossierInterpretationHtml}
    ${cardVoicesHtml}
    ${flavorEchoesHtml}`;
  const startPanelHtml = `
    <div class="starter-section">
      <div class="section-label">Start Here</div>
      <p class="signals-intro">These are identity-appropriate Commander exploration paths, not proof that this identity or any particular commander is correct for you.</p>
      <div class="starter-grid starter-grid-start">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${commanderLane.title}</div>
          <div class="starter-copy">${renderEducationalText(commanderLane.copy)}</div>
          <div class="starter-notes">
            ${commanderLane.details.map((detail) => `
              <div class="starter-note">
                <div class="starter-note-label">${renderEducationalText(detail.label)}</div>
                <div class="starter-copy">${renderEducationalText(detail.copy)}</div>
              </div>`).join("")}
          </div>
          ${commanderPreviewHtml}
        </div>
      </div>
    </div>`;
  const deckStartsPanelHtml = `
    ${preconSectionHtml}
    <div class="decks-section">
      <div class="section-label">Commander Browsing Starts</div>
      <div class="decks-grid">${decksHtml}</div>
    </div>
    ${archetypeHtml ? `
      <div class="archetypes-section">
        <div class="section-label">What to Look For</div>
        <div class="archetypes-grid public-three-item-grid" data-item-count="${archetypeItems.length}">${archetypeHtml}</div>
      </div>` : ""}`;
  const accountDeckLinksPanelHtml = ACCOUNT_DECK_LINKS_ENABLED
    ? buildAccountDeckLinkPanelHtml({ result })
    : "";
  const starterCardPanelContent = {
    creatures: `
      <div class="staples-category">
        <div class="staple-cat-label">Creatures</div>
        <div class="staple-row">${cardSlots(renderableStarterCards.creatures, "sc", "staple-placeholder", "staple-img")}</div>
      </div>`,
    spells: `
      <div class="staples-category">
        <div class="staple-cat-label">Instants and Sorceries</div>
        <div class="staple-row">${cardSlots(renderableStarterCards.spells, "ss", "staple-placeholder", "staple-img")}</div>
      </div>`,
    permanents: `
      <div class="staples-category">
        <div class="staple-cat-label">Enchantments and Artifacts</div>
        <div class="staple-row">${cardSlots(renderableStarterCards.permanents, "sp", "staple-placeholder", "staple-img")}</div>
      </div>`,
  };
  const starterCardsPanelHtml = hasStarterCardReferences ? `
    <div class="staples-section">
      <div class="section-label">${institutionLabel} Card Signal References</div>
      ${buildSegmentControlsHtml("starter-cards", starterCardSegments, starterSegment, "Card signal groups")}
      ${starterCardSegments.map((segment) =>
        buildSegmentPanelHtml("starter-cards", segment.id, starterSegment, starterCardPanelContent[segment.id])
      ).join("")}
    </div>` : "";
  const manaBasePanelHtml = `
    <div class="lands-section">
      <div class="section-label">Mana Notes Starting Map</div>
      ${colorlessManaPrimerHtml}
      ${buildSegmentControlsHtml("mana-base", manaBaseSegments, manaBaseSegment, "Mana note tiers")}
      <div class="lands-tiers">
        ${buildSegmentPanelHtml("mana-base", "basics", manaBaseSegment, `
          <div class="land-tier tier-basics">
            ${isColorlessFaction ? `<div class="land-tier-label">Wastes First</div>` : ""}
            <div class="land-tier-copy">${renderPlayerCopy(basicLandCopy)}</div>
          </div>`)}
        ${hasRenderableLandTier(landRecommendations, "premium") ? buildSegmentPanelHtml("mana-base", "premium", manaBaseSegment, `
          <div class="land-tier tier-premium">
            <div class="land-tier-label">${isColorlessFaction ? renderPlayerCopy("Fast {C} Lane") : "Premium"}</div>
            <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.premium)}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.premium, "lp")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "midrange") ? buildSegmentPanelHtml("mana-base", "midrange", manaBaseSegment, `
          <div class="land-tier tier-midrange">
            <div class="land-tier-label">${isColorlessFaction ? "Practical Upgrade Lane" : "Midrange"}</div>
            <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.midrange)}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.midrange, "lm")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "budget") ? buildSegmentPanelHtml("mana-base", "budget", manaBaseSegment, `
          <div class="land-tier tier-budget">
            <div class="land-tier-label">${isColorlessFaction ? renderPlayerCopy("Entry {C} Lane") : "Budget"}</div>
            <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.budget)}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.budget, "lb")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "utility") ? buildSegmentPanelHtml("mana-base", "utility", manaBaseSegment, utilityTierHtml) : ""}
      </div>
    </div>`;
  const footerActionsHtml = `
    <div class="footer-actions">
      <div class="footer-note">Card and land images via Scryfall API. Starter references are curated from faction data; deck links route out to EDHREC, Archidekt, and MTGDecks, while Maze stays inside the reading flow.</div>
      <div class="footer-button-row">
        <button class="btn-primary" type="button" ${buildActionAttrs("save-current-result")}>${saveButtonLabel}</button>
        ${returnToTerminalButton}
        ${terminalEnabled ? `<button class="btn-secondary" type="button" data-vm-terminal-only ${buildActionAttrs("start-interview-flow")}>Try the deeper reading</button>` : ""}
        <button class="btn-secondary" type="button" ${buildActionAttrs("retake")}>Begin Again</button>
      </div>
    </div>`;
  const mazePanelHtml = `
    ${mazeDiscoveryHtml}
    ${apocryphaHtml}
    <p class="decree-footer">
      ${atlasFrontierCopy}
    </p>
    ${footerActionsHtml}`;
  const dossierPanelsHtml = [
    { id: "placement", content: placementPanelHtml },
    { id: "start", content: startPanelHtml },
    { id: "why", content: whyPanelHtml },
    adjacentSectionHtml ? { id: "adjacent", content: adjacentSectionHtml } : null,
    { id: "commander-deck-starts", content: deckStartsPanelHtml },
    ACCOUNT_DECK_LINKS_ENABLED ? { id: "decks-saved", content: accountDeckLinksPanelHtml } : null,
    hasStarterCardReferences ? { id: "starter-cards", content: starterCardsPanelHtml } : null,
    { id: "mana-base", content: manaBasePanelHtml },
    { id: "maze-discovery", content: mazePanelHtml },
  ].filter(Boolean).map((panel) => buildDossierPanelHtml({
    id: panel.id,
    activePanel,
    layoutMode,
    content: panel.content,
  })).join("");

  const publicEyebrow = isLegacyGateAResult(result)
    ? `Historical saved identity - ${institutionLabel}`
    : isPrimary
      ? resultState === "tied" ? "Original reading" : `Placement dossier - ${institutionLabel}`
      : resultState === "tied" ? `Other co-leader - ${institutionLabel}` : `Comparing close alternative - ${institutionLabel}`;

  const identityIntroHtml = `
    <div class="guild-banner" data-faction-key="${escapeHtml(faction.key || "")}" data-hero-background="${heroBannerImageSlugForFaction(faction) ? "identity-image" : "banner"}" style="background:${heroBannerBackgroundForFaction(faction)}">
      <div class="guild-eyebrow">${escapeHtml(publicEyebrow)}</div>
      <div class="guild-name" style="color:${faction.accent}">${faction.name}</div>
      <div class="guild-tagline">${faction.tagline}</div>
      ${pipsHtml}
      <div class="guild-philosophy">${renderPlayerCopy(heroNarrative)}</div>
      <div class="guild-lore-summary">${renderPlayerCopy(faction.philosophy)}</div>
    </div>

    ${placementSnapshotHtml}`;
  const dossierConsoleHtml = `
    <div class="dossier-console" data-dossier-console data-dossier-identity-key="${escapeAttributeValue(dossier.targetFactionKey)}" data-dossier-layout="${layoutMode}">
      <div class="dossier-mobile-nav">
        <div class="dossier-mobile-tabs-shell" data-dossier-tabs-shell>
          <button class="dossier-tabs-scroll dossier-tabs-scroll--left" type="button" data-dossier-scroll-direction="left" ${buildActionAttrs("scroll-dossier-tabs", { direction: "left" })} aria-label="Show earlier dossier sections" hidden><span aria-hidden="true">&#8249;</span></button>
          <div class="vm-tabs dossier-mobile-tabs" role="tablist" aria-label="Archscry dossier sections" data-dossier-mobile-tabs>
            ${buildDossierTabsHtml("mobile", activePanel, layoutMode)}
          </div>
          <button class="dossier-tabs-scroll dossier-tabs-scroll--right" type="button" data-dossier-scroll-direction="right" ${buildActionAttrs("scroll-dossier-tabs", { direction: "right" })} aria-label="Show later dossier sections" hidden><span aria-hidden="true">&#8250;</span></button>
        </div>
        ${buildDossierLayoutToggleHtml(layoutMode)}
        ${utilityActionsHtml}
      </div>
      <div class="dossier-console-grid">
        <aside class="vm-side-rail dossier-rail" aria-label="Archscry dossier directory">
          <div class="dossier-rail-label">Dossier Directory</div>
          <div class="vm-tabs dossier-rail-tabs" role="tablist" aria-label="Archscry dossier sections" aria-orientation="vertical">
            ${buildDossierTabsHtml("rail", activePanel, layoutMode)}
          </div>
          ${buildDossierLayoutToggleHtml(layoutMode)}
          ${utilityActionsHtml}
        </aside>
        <div class="dossier-workspace">
          ${dossierPanelsHtml}
        </div>
      </div>
    </div>`;
  const identityContentHtml = `${identityIntroHtml}${dossierConsoleHtml}`;
  document.getElementById("result-inner").innerHTML = identityContentHtml;
  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = activeKey;
  APP_STATE.activeDossierRadarFaction = faction;
  showSection("result");
  applyDossierConsoleState();
  applyTerminalVisibility();
  updateTopbar();
  void refreshAccountDeckLinks();
  initializeDossierRadarIfVisible(result, faction);
  if (!shouldDisableResultCardArt()) {
    loadResultCardArt(faction, commanderPreviewCandidates, renderableStarterCards, landRecommendations, matrixFlavorSnippets);
  }
}

/**
 * Switches the dossier view to an adjacent faction while keeping the same saved reading.
 *
 * @param {string} factionKey Adjacent faction key to render.
 */
function switchAdjacentView(factionKey) {
  APP_STATE.previousViewKey = APP_STATE.activeResult?.faction || APP_STATE.activeViewKey;
  APP_STATE.activeViewKey = factionKey;
  APP_STATE.activeDossierPanel = "placement";
  APP_STATE.forceDossierPanel = "placement";
  renderResult(factionKey);
}

/**
 * Returns from an adjacent fit to the original primary reading.
 */
function returnToPrimaryReading() {
  const primaryViewKey = APP_STATE.activeResult?.faction || APP_STATE.previousViewKey;
  if (!primaryViewKey) {
    return;
  }

  APP_STATE.activeViewKey = primaryViewKey;
  APP_STATE.activeDossierPanel = "placement";
  APP_STATE.forceDossierPanel = "placement";
  renderResult(primaryViewKey);
}

// Card art loading, Scryfall named-card cache, and desktop preview overlays.

/**
 * Loads Scryfall images for Commander previews, card signals, and lands after the result HTML has rendered.
 *
 * @param {object} faction Canonical faction record being displayed.
 * @param {object[]=} commanderCandidates Commander preview candidates to verify.
 * @param {object=} starterCards Dossier card signal groups.
 * @param {object=} landRecommendations Dossier mana note tiers.
 * @returns {Promise<void>} Resolves after all visible slots have been attempted.
 */
function resultArtCandidate(name, id, imageClass) {
  const classified = classifyResultArtRecord(name, APP_STATE.preconCatalog);
  return {
    id,
    imageClass,
    displayName: classified.displayName,
    name: classified.lookupName,
    recordType: classified.lookupRecordType,
    sourceRecordType: classified.recordType,
  };
}

function renderUnavailableCardArt(slot) {
  if (!slot) return;
  slot.classList.add("is-unavailable");
  slot.setAttribute("aria-label", "Card image unavailable");
  slot.innerHTML = '<span aria-hidden="true">Image unavailable</span>';
}

async function loadResultCardArt(faction, commanderCandidates = [], starterCards = {}, landRecommendations = {}, matrixFlavorSnippets = []) {
  const factionIdentity = new Set(faction?.colors || []);
  let verifiedCommanders = 0;
  const commanderCards = (commanderCandidates || []).map((candidate, index) => ({
    ...candidate,
    displayName: candidate.name,
    recordType: "CARD",
    id: `cmd_${index}`,
    imageClass: "commander-img",
    commanderPreview: true,
  }));
  const matrixVoiceCards = (matrixFlavorSnippets || []).map((snippet, index) => {
    const record = snippet.card_record || { name: snippet.card_name, scryfall_uri: snippet.scryfall_uri };
    return {
      name: canonicalFlavorLookupName(record),
      displayName: snippet.card_name || record.name,
      recordType: "CARD",
      id: `mcv_${index}`,
      nameLinkId: `mcv_name_${index}`,
      imageClass: "vm-card-voice-image",
      matrixCardVoice: true,
      resolvedLocally: Boolean(snippet.image_uri || cardImageUrl(record)),
    };
  });
  const allCards = [
    ...commanderCards,
    ...matrixVoiceCards,
    ...(starterCards.creatures || []).map((name, index) => resultArtCandidate(name, `sc_${index}`, "staple-img")),
    ...(starterCards.spells || []).map((name, index) => resultArtCandidate(name, `ss_${index}`, "staple-img")),
    ...(starterCards.permanents || []).map((name, index) => resultArtCandidate(name, `sp_${index}`, "staple-img")),
    ...(landRecommendations.premium || []).map((name, index) => ({ ...resultArtCandidate(name, `lp_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.midrange || []).map((name, index) => ({ ...resultArtCandidate(name, `lm_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.budget || []).map((name, index) => ({ ...resultArtCandidate(name, `lb_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.utility || []).map((name, index) => ({ ...resultArtCandidate(name, `lu_${index}`, "land-img"), recordType: "CARD", name })),
  ];

  for (const card of allCards) {
    const slot = document.getElementById(card.id);
    if (!slot) {
      continue;
    }

    if (card.matrixCardVoice && card.resolvedLocally) {
      continue;
    }

    if (card.recordType !== "CARD" || !card.name) {
      renderUnavailableCardArt(slot);
      continue;
    }

    try {
      const data = await loadCachedScryfallNamedCard(card.name);
      const imageUrl =
        data.image_uris?.normal ||
        data.card_faces?.[0]?.image_uris?.normal ||
        null;
      const linkUrl = data.scryfall_uri || "#";
      const typeLine = [
        data.type_line || "",
        ...(data.card_faces || []).map((face) => face.type_line || ""),
      ].join(" ");
      const cardIdentity = data.color_identity || [];
      const identityFits = cardIdentity.every((color) => factionIdentity.has(color));
      const isCommanderCreature =
        /legendary/i.test(typeLine) &&
        /creature/i.test(typeLine) &&
        data.legalities?.commander === "legal" &&
        identityFits;

      if (card.commanderPreview && !isCommanderCreature) {
        slot.closest("[data-commander-card]")?.remove();
        continue;
      }

      if (imageUrl) {
        const commanderCard = slot.closest("[data-commander-card]");
        commanderCard?.classList.add("is-verified");
        commanderCard?.closest("[data-commander-preview-block]")?.removeAttribute("hidden");
        const groundedRationale = approvedCardRationaleForFaction(data, faction);
        const rationale = groundedRationale?.rationale || "";
        const provenance = groundedRationale ? JSON.stringify(groundedRationale.provenance) : "";
        const tags = groundedRationale?.tags?.join("|") || "";
        slot.outerHTML = `<button class="card-detail-image-trigger" type="button" aria-label="View ${escapeAttributeValue(card.displayName || data.name)} card details" data-card-preview-name="${escapeAttributeValue(card.displayName || data.name)}" data-action="open-card-detail" data-card-name="${escapeAttributeValue(card.displayName || data.name)}" data-card-rationale="${escapeAttributeValue(rationale)}" data-card-provenance="${escapeAttributeValue(provenance)}" data-card-tags="${escapeAttributeValue(tags)}"><img class="${card.imageClass}" src="${imageUrl}" alt="${escapeAttributeValue(`${data.name} card image`)}" loading="lazy"></button>`;
        const nameLink = card.nameLinkId ? document.getElementById(card.nameLinkId) : null;
        if (nameLink instanceof HTMLAnchorElement) nameLink.href = linkUrl;
        if (card.commanderPreview) {
          verifiedCommanders += 1;
        }
      } else if (card.commanderPreview) {
        slot.closest("[data-commander-card]")?.remove();
      } else {
        renderUnavailableCardArt(slot);
      }
    } catch (_) {
      const fallback = document.getElementById(card.id);
      if (card.commanderPreview) {
        fallback?.closest("[data-commander-card]")?.remove();
      } else if (fallback) {
        renderUnavailableCardArt(fallback);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 90));
  }

  const previewGrid = document.getElementById("commander-preview-grid");
  const fallback = document.getElementById("commander-preview-fallback");
  if (commanderCandidates.length && verifiedCommanders < 1) {
    previewGrid?.closest("[data-commander-preview-block]")?.remove();
    fallback?.classList.add("is-visible");
  }
}

export async function loadCachedScryfallNamedCard(name) {
  const card = await ScryfallNamedCardLookup.lookup(name, { recordType: "CARD" });
  if (!card) throw new Error("Scryfall card art is unavailable for this record.");
  return card;
}

function getScryfallNamedCardStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (_) {
    return null;
  }
}

const ScryfallNamedCardLookup = createScryfallNamedCardLookup({
  storage: getScryfallNamedCardStorage(),
  fetchImpl: (...args) => fetch(...args),
  localResolver: (name) => APP_STATE.scryfallLocalCardByName.get(normalizeCardName(name)) || null,
});

/**
 * Saves the current active result through Google OAuth or a live signed-in session.
 *
 * @returns {Promise<void>} Resolves after the save flow has started or completed.
 */
async function saveCurrentResult() {
  const result = APP_STATE.activeResult;
  if (!result) {
    return;
  }

  try {
    const sb = getSupabase();
    const {
      data: { session },
    } = await sb.auth.getSession();

    if (session?.user) {
      const saved = await vm_savePlacementResult(result);
      APP_STATE.activeResult = saved;
      APP_STATE.activeViewKey = saved.faction;
      renderResult(saved.faction);
      return;
    }

    await vm_saveWithGoogle(result);
  } catch (error) {
    alert(error.message || "Could not save this reading yet.");
  }
}

let cardPreviewOverlay = null;
let cardPreviewRequestId = 0;
let cardDetailDialog = null;
let cardDetailInvoker = null;
let glossaryTooltip = null;
let glossaryTooltipTarget = null;

function canShowCardPreviewOverlay() {
  return typeof window.matchMedia !== "function" ||
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function ensureCardPreviewOverlay() {
  if (cardPreviewOverlay) {
    return cardPreviewOverlay;
  }
  const overlay = document.createElement("div");
  overlay.className = "card-preview-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `<img alt="">`;
  document.body.appendChild(overlay);
  cardPreviewOverlay = overlay;
  return overlay;
}

function positionCardPreviewOverlay(overlay, source, event = null) {
  const rect = source.getBoundingClientRect();
  const preferredWidth = source.classList.contains("land-img") ? 285 : 315;
  const width = Math.min(preferredWidth, Math.max(180, window.innerWidth - 24));
  const height = Math.round(width * 88 / 63);
  const anchorX = event?.clientX || rect.right;
  const anchorY = event?.clientY || rect.top + rect.height / 2;
  const gap = 18;
  const spaceRight = window.innerWidth - anchorX;
  const left = spaceRight > width + gap
    ? anchorX + gap
    : Math.max(12, anchorX - width - gap);
  const top = Math.max(12, Math.min(window.innerHeight - height - 12, anchorY - height / 2));
  overlay.style.width = `${width}px`;
  overlay.style.left = `${left}px`;
  overlay.style.top = `${top}px`;
}

async function showCardPreviewOverlay(trigger, event = null) {
  if (!canShowCardPreviewOverlay() || !trigger?.boundary) {
    return;
  }
  const requestId = ++cardPreviewRequestId;
  let imageUrl = "";
  if (trigger.cardName) {
    try {
      const card = await loadCachedScryfallNamedCard(trigger.cardName);
      imageUrl = cardImageUrl(card);
    } catch (_) {
      return;
    }
  }
  if (!imageUrl && trigger.image instanceof HTMLImageElement) {
    imageUrl = trigger.image.currentSrc || trigger.image.src;
  }
  if (!imageUrl || requestId !== cardPreviewRequestId) return;
  const overlay = ensureCardPreviewOverlay();
  const image = overlay.querySelector("img");
  if (image) {
    image.src = imageUrl;
    image.alt = "";
  }
  positionCardPreviewOverlay(overlay, trigger.boundary, event);
  overlay.classList.add("is-visible");
}

function hideCardPreviewOverlay() {
  cardPreviewRequestId += 1;
  cardPreviewOverlay?.classList.remove("is-visible");
}

const CARD_PREVIEW_IMAGE_SELECTOR = "img.staple-img, img.land-img, img.vm-card-voice-image, img.vm-card-rationale-image";

function cardPreviewTriggerFromEvent(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  if (!(target instanceof Element)) return null;

  if (target.matches(CARD_PREVIEW_IMAGE_SELECTOR)) {
    const imageLink = target.parentElement?.matches("a[href]") ? target.parentElement : null;
    const namedBoundary = target.closest("[data-card-preview-name]");
    return {
      image: target,
      boundary: namedBoundary || imageLink || target,
      cardName: namedBoundary?.dataset.cardPreviewName || "",
    };
  }

  const namedBoundary = target.closest("[data-card-preview-name]");
  if (namedBoundary instanceof HTMLElement) {
    const image = namedBoundary.querySelector(CARD_PREVIEW_IMAGE_SELECTOR);
    return {
      image: image instanceof HTMLImageElement ? image : null,
      boundary: namedBoundary,
      cardName: namedBoundary.dataset.cardPreviewName || "",
    };
  }

  const imageLink = target.closest("a[href]");
  if (!(imageLink instanceof HTMLAnchorElement)) return null;
  const image = imageLink.querySelector(`:scope > ${CARD_PREVIEW_IMAGE_SELECTOR}`);
  return image instanceof HTMLImageElement ? { image, boundary: imageLink } : null;
}

function handleCardPreviewPointerOver(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  if (trigger) {
    void showCardPreviewOverlay(trigger, event);
  }
}

function handleCardPreviewPointerMove(event) {
  if (!cardPreviewOverlay?.classList.contains("is-visible")) {
    return;
  }
  const trigger = cardPreviewTriggerFromEvent(event);
  if (trigger) positionCardPreviewOverlay(cardPreviewOverlay, trigger.boundary, event);
  else hideCardPreviewOverlay();
}

function handleCardPreviewPointerOut(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  const relatedInside = event.relatedTarget instanceof Node && trigger?.boundary.contains(event.relatedTarget);
  if (trigger && !relatedInside) {
    window.requestAnimationFrame(() => {
      const stillHovered = trigger.boundary.matches?.(":hover");
      const stillFocused = trigger.boundary === document.activeElement || trigger.boundary.contains(document.activeElement);
      if (!stillHovered && !stillFocused) hideCardPreviewOverlay();
    });
  }
}

function handleCardPreviewFocusIn(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  if (trigger) {
    void showCardPreviewOverlay(trigger);
  }
}

function cardRulesText(card = {}) {
  if (card.oracle_text) return card.oracle_text;
  return (card.card_faces || [])
    .map((face) => [face.name, face.oracle_text].filter(Boolean).join(" — "))
    .filter(Boolean)
    .join("\n\n");
}

function ensureCardDetailDialog() {
  if (cardDetailDialog) return cardDetailDialog;
  const dialog = document.createElement("dialog");
  dialog.className = "archscry-card-dialog";
  dialog.setAttribute("aria-labelledby", "archscryCardDialogTitle");
  dialog.innerHTML = `
    <div class="archscry-card-dialog-shell">
      <button class="archscry-card-dialog-close" type="button" aria-label="Close card details" ${buildActionAttrs("close-card-detail")}>×</button>
      <div class="archscry-card-dialog-content" data-card-dialog-content></div>
    </div>`;
  dialog.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest('[data-action="close-card-detail"]')) {
      dialog.close();
      return;
    }
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    const invoker = cardDetailInvoker;
    cardDetailInvoker = null;
    if (invoker?.isConnected) invoker.focus();
  });
  document.body.appendChild(dialog);
  cardDetailDialog = dialog;
  return dialog;
}

async function openCardDetail(actionNode) {
  const cardName = String(actionNode?.dataset.cardName || "").trim();
  const rationale = String(actionNode?.dataset.cardRationale || "").trim();
  const provenance = String(actionNode?.dataset.cardProvenance || "").trim();
  if (!cardName) return;
  hideCardPreviewOverlay();
  const dialog = ensureCardDetailDialog();
  const content = dialog.querySelector("[data-card-dialog-content]");
  if (!content) return;
  cardDetailInvoker = actionNode;
  content.innerHTML = `<p class="archscry-card-dialog-status">Loading verified card data…</p>`;
  if (!dialog.open) dialog.showModal();

  try {
    const card = await loadCachedScryfallNamedCard(cardName);
    const image = cardImageUrl(card);
    const manaCost = card.mana_cost || card.card_faces?.map((face) => face.mana_cost).filter(Boolean).join(" // ") || "";
    const typeLine = card.type_line || card.card_faces?.map((face) => face.type_line).filter(Boolean).join(" // ") || "";
    const oracleText = cardRulesText(card);
    const scryfallUrl = /^https:\/\/scryfall\.com\//.test(card.scryfall_uri || "") ? card.scryfall_uri : "";
    const tags = String(actionNode.dataset.cardTags || "").split("|").map((tag) => tag.trim()).filter(Boolean);
    content.innerHTML = `
      <div class="archscry-card-dialog-grid" data-card-dialog-ready>
        ${image ? `<img class="archscry-card-dialog-image" src="${escapeAttributeValue(image)}" alt="${escapeAttributeValue(`${card.name || cardName} card image`)}">` : ""}
        <div class="archscry-card-dialog-copy">
          <div class="section-label">Card Details</div>
          <h2 id="archscryCardDialogTitle">${escapeHtml(card.name || cardName)}</h2>
          ${manaCost ? `<div class="archscry-card-dialog-mana">${escapeHtml(manaCost)}</div>` : ""}
          ${typeLine ? `<div class="archscry-card-dialog-type">${escapeHtml(typeLine)}</div>` : ""}
          ${oracleText ? `<div class="archscry-card-dialog-rules">${escapeHtml(oracleText).replace(/\n/g, "<br>")}</div>` : ""}
          ${rationale && provenance ? `<div class="archscry-card-dialog-why"><strong>Why it appears</strong><span>${escapeHtml(rationale)}</span></div>` : ""}
          ${tags.length ? `<div class="vm-tag-row">${renderStaticTagChips(tags, 4)}</div>` : ""}
          ${scryfallUrl ? `<a class="btn-secondary archscry-card-dialog-external" href="${escapeAttributeValue(scryfallUrl)}" target="_blank" rel="noopener">Open on Scryfall</a>` : ""}
        </div>
      </div>`;
    if (rationale && provenance) content.dataset.rationaleProvenance = provenance;
  } catch (_) {
    content.innerHTML = `<p class="archscry-card-dialog-status">Verified card details are unavailable. No fallback description was generated.</p>`;
  }
}

function handleCardPreviewFocusOut(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  const relatedInside = event.relatedTarget instanceof Node && trigger?.boundary.contains(event.relatedTarget);
  if (trigger && !relatedInside) {
    hideCardPreviewOverlay();
  }
}

function ensureGlossaryTooltip() {
  if (glossaryTooltip) return glossaryTooltip;
  const tooltip = document.createElement("div");
  tooltip.id = "archscryGlossaryTooltip";
  tooltip.className = "archscry-glossary-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.appendChild(tooltip);
  glossaryTooltip = tooltip;
  return tooltip;
}

function positionGlossaryTooltip(target, tooltip) {
  const rect = target.getBoundingClientRect();
  const gap = 10;
  const margin = 12;
  const maxWidth = Math.min(360, window.innerWidth - margin * 2);
  tooltip.style.maxWidth = `${maxWidth}px`;
  tooltip.style.left = `${margin}px`;
  tooltip.style.top = `${margin}px`;
  const tooltipRect = tooltip.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  left = Math.max(margin, Math.min(window.innerWidth - tooltipRect.width - margin, left));
  let top = rect.bottom + gap;
  if (top + tooltipRect.height > window.innerHeight - margin) {
    top = rect.top - tooltipRect.height - gap;
  }
  top = Math.max(margin, Math.min(window.innerHeight - tooltipRect.height - margin, top));
  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.round(top)}px`;
}

function showGlossaryTooltip(target) {
  const copy = String(target?.dataset.gloss || "").trim();
  if (!copy) return;
  const tooltip = ensureGlossaryTooltip();
  glossaryTooltipTarget?.removeAttribute("aria-describedby");
  glossaryTooltipTarget = target;
  tooltip.textContent = copy;
  tooltip.hidden = false;
  target.setAttribute("aria-describedby", tooltip.id);
  positionGlossaryTooltip(target, tooltip);
}

function hideGlossaryTooltip(target = null) {
  if (target && target !== glossaryTooltipTarget) return;
  glossaryTooltipTarget?.removeAttribute("aria-describedby");
  glossaryTooltipTarget = null;
  if (glossaryTooltip) glossaryTooltip.hidden = true;
}

function glossaryTargetFromEvent(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  return target?.closest?.(".archscry-term-help[data-gloss]") || null;
}

function handleGlossaryPointerOver(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) showGlossaryTooltip(target);
}

function handleGlossaryPointerOut(event) {
  const target = glossaryTargetFromEvent(event);
  if (!target) return;
  if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;
  hideGlossaryTooltip(target);
}

function handleGlossaryFocusIn(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) showGlossaryTooltip(target);
}

function handleGlossaryFocusOut(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) hideGlossaryTooltip(target);
}

function handleGlossaryClick(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) {
    event.preventDefault();
    if (target === glossaryTooltipTarget && glossaryTooltip && !glossaryTooltip.hidden) {
      hideGlossaryTooltip(target);
    } else {
      showGlossaryTooltip(target);
    }
    return;
  }
  hideGlossaryTooltip();
}

// Delegated route controls. Keep data-action behavior centralized here.

function bindArchscryControls() {
  const app = document.querySelector(".app");
  app?.addEventListener("click", (event) => {
    handleGlossaryClick(event);
    void handleArchscryActionClick(event);
  });
  app?.addEventListener("keydown", handleArchscryKeydown);
  app?.addEventListener("pointerover", handleCardPreviewPointerOver);
  app?.addEventListener("pointermove", handleCardPreviewPointerMove);
  app?.addEventListener("pointerout", handleCardPreviewPointerOut);
  app?.addEventListener("focusin", handleCardPreviewFocusIn);
  app?.addEventListener("focusout", handleCardPreviewFocusOut);
  app?.addEventListener("pointerover", handleGlossaryPointerOver);
  app?.addEventListener("pointerout", handleGlossaryPointerOut);
  app?.addEventListener("focusin", handleGlossaryFocusIn);
  app?.addEventListener("focusout", handleGlossaryFocusOut);
  window.addEventListener("scroll", () => {
    hideCardPreviewOverlay();
    hideGlossaryTooltip();
  }, { passive: true, capture: true });
  window.addEventListener("resize", () => {
    initializeDossierMobileTabs();
    hideGlossaryTooltip();
  }, { passive: true });
}

async function handleArchscryActionClick(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  const actionNode = target?.closest?.("[data-action]");
  if (!(actionNode instanceof HTMLElement)) return;

  switch (actionNode.dataset.action) {
    case "retake":
      await handleRetake();
      return;
    case "sign-out":
      await handleSignOut();
      return;
    case "start-quick-flow":
      startQuickFlow();
      return;
    case "start-interview-flow":
      await startInterviewFlow();
      return;
    case "resume-quick-flow":
      resumeIncompleteQuickReading();
      return;
    case "start-result-refinement":
      startTargetedRefinement();
      return;
    case "revisit-result-answer":
      revisitRefinementAnswer();
      return;
    case "show-bounded-direction":
      showBoundedDirection(actionNode.dataset.viewKey || "");
      return;
    case "quick-back":
      goBackQuickQuestion();
      return;
    case "show-section":
      showSection(actionNode.dataset.section || "landing");
      return;
    case "submit-interview":
      await submitInterview();
      return;
    case "open-interview-dossier":
      openInterviewDossier();
      return;
    case "save-placement":
      await handleSavePlacement();
      return;
    case "answer-quick-question":
      answerQuickQuestion(Number(actionNode.dataset.answerIndex));
      return;
    case "continue-quick-transition":
      continueQuickTransition();
      return;
    case "switch-adjacent-view":
      switchAdjacentView(actionNode.dataset.viewKey || "");
      return;
    case "return-primary-reading":
      returnToPrimaryReading();
      return;
    case "return-interview-source":
      returnToInterviewSource();
      return;
    case "save-current-result":
      await saveCurrentResult();
      return;
    case "save-deck-link":
      await handleSaveDeckLink();
      return;
    case "archive-deck-link":
      await handleArchiveDeckLink(actionNode);
      return;
    case "refresh-deck-links":
      await refreshAccountDeckLinks();
      return;
    case "set-dossier-panel":
      setDossierPanel(actionNode.dataset.panelId || "");
      return;
    case "scroll-dossier-tabs":
      scrollDossierTabs(actionNode.dataset.direction || "right");
      return;
    case "toggle-dossier-layout":
      setDossierLayoutMode(actionNode.dataset.layout || "focus");
      return;
    case "set-dossier-segment":
      setDossierSegment(actionNode.dataset.segmentGroup || "", actionNode.dataset.segment || "");
      return;
    case "toggle-precon-preview":
      togglePreconPreview(actionNode);
      return;
    case "open-card-detail":
      await openCardDetail(actionNode);
      return;
    case "close-card-detail":
      cardDetailDialog?.close();
      return;
    default:
  }
}

function handleArchscryKeydown(event) {
  if (event.key === "Escape" && glossaryTooltip && !glossaryTooltip.hidden) {
    hideGlossaryTooltip();
    return;
  }
  const tab = event.target.closest("[data-dossier-tab]");
  if (!(tab instanceof HTMLElement)) return;
  const tablist = tab.closest('[role="tablist"]');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll("[data-dossier-tab]"));
  const currentIndex = tabs.indexOf(tab);
  if (currentIndex < 0) return;

  let nextIndex = currentIndex;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      nextIndex = (currentIndex + 1) % tabs.length;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      break;
    case "Home":
      nextIndex = 0;
      break;
    case "End":
      nextIndex = tabs.length - 1;
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      setDossierPanel(tab.dataset.dossierTab || "");
      return;
    default:
      return;
  }

  event.preventDefault();
  const nextTab = tabs[nextIndex];
  if (!(nextTab instanceof HTMLElement)) return;
  setDossierPanel(nextTab.dataset.dossierTab || "");
  nextTab.focus();
}

// Boot, restore, compatibility exports, and session events.

function renderInitializationError(error) {
  clearNode(document.body);
  const section = document.createElement("div");
  section.className = "section";
  const empty = document.createElement("div");
  empty.className = "empty-state";
  const heading = document.createElement("h2");
  heading.textContent = "Placement data missing.";
  const copy = document.createElement("p");
  copy.textContent = error?.message || "The Archscry data bundle could not be loaded.";
  empty.append(heading, copy);
  section.appendChild(empty);
  document.body.appendChild(section);
}

/**
 * Restores the best available placement view after page load.
 *
 * @param {boolean} savedFromOAuth True when the current load just completed an OAuth save.
 */
function restoreInitialView(savedFromOAuth) {
  const profileResult = SESSION.profile?.placementResult || null;
  const cached = vm_getCachedPlacementResult();
  const handoff = readArchscryDossierHandoff();
  const result = profileResult || cached || handoff?.placementResult || null;
  const requestedView = requestedDossierViewKey();
  const viewKey = requestedView && APP_STATE.factions[requestedView] ? requestedView : result?.faction;
  captureMazeReturnUrl();
  const mazeReturnAnchor = APP_STATE.mazeReturnAnchor;
  APP_STATE.mazeReturnAnchor = "";
  if (mazeReturnAnchor) {
    APP_STATE.activeDossierPanel = "maze-discovery";
    APP_STATE.forceDossierPanel = "maze-discovery";
    APP_STATE.dossierLayoutMode = "focus";
  }

  if (savedFromOAuth && result) {
    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = viewKey;
    APP_STATE.resultSource = "saved";
    APP_STATE.returnSection = null;
    renderResult(viewKey);
    if (mazeReturnAnchor) {
      scrollToAnchorOnce(mazeReturnAnchor);
    }
    return;
  }

  if (result) {
    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = viewKey;
    APP_STATE.resultSource = profileResult ? "saved" : "cached";
    APP_STATE.returnSection = null;
    vm_cachePlacementResult(result);
    renderResult(viewKey);
    if (mazeReturnAnchor) {
      scrollToAnchorOnce(mazeReturnAnchor);
    }
    return;
  }

  showSection("landing");
}

document.addEventListener("vm_placementSaved", (event) => {
  const result = event.detail || SESSION.profile?.placementResult || vm_getCachedPlacementResult();
  if (!result) {
    return;
  }
  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
  APP_STATE.resultSource = "saved";
  APP_STATE.returnSection = null;
  renderResult(result.faction);
});

window.addEventListener("popstate", () => {
  const resultVisible = !document.getElementById("result")?.classList.contains("hidden");
  if (resultVisible && APP_STATE.returnSection === "interview") {
    returnToInterviewSource();
  }
});

/**
 * Exposes a small compatibility surface while surrounding runtime hooks move to
 * delegated data-action handlers.
 */
Object.assign(window, {
  answerQuickQuestion,
  goBackQuickQuestion,
  handleRetake,
  handleSavePlacement,
  handleSignOut,
  openInterviewDossier,
  openLibrary,
  openResearch,
  returnToInterviewSource,
  returnToPrimaryReading,
  saveCurrentResult,
  showSection,
  startInterviewFlow,
  startQuickFlow,
  submitInterview,
  switchAdjacentView,
});

document.addEventListener("DOMContentLoaded", async () => {
  bindArchscryControls();
  try {
    await loadFactionData();
    await loadPlacementModel();
    await loadDeckTagCatalog();
    await loadIdentityLayerData();
    await loadDossierContentAuthority();
    validateQuickReadingReachability();
    await loadDiscoveryData();
  } catch (error) {
    renderInitializationError(error);
    return;
  }

  applyTerminalVisibility();

  const input = document.getElementById("terminal-input");
  input.addEventListener("input", () => {
    updateInterviewControls(APP_STATE.interviewState);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitInterview();
    }
  });

  const resumed = await vm_resumeSession();
  const savedFromOAuth = await vm_checkPendingSave();
  if (resumed || savedFromOAuth) {
    updateTopbar();
  }
  restoreInitialView(savedFromOAuth);
});

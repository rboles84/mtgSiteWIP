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
} from "./adaptive-placement.js";
import {
  buildCommanderDossier,
  buildPreconRecommendations,
  createArchidektTagCatalog,
  buildMtgDecksCommanderUrl,
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
  buildPersonalizedMazePaths,
  buildReadingSignalCopy,
  buildTagExplanationSummaries,
  adjacentMatchForSummary,
  confidencePercent,
  matchForFaction,
  presentationForFaction,
  selectReadingTagRefs,
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

const APP_STATE = {
  factions: {},
  placementModel: null,
  quickIndex: 0,
  quickAnswers: [],
  quickSelections: [],
  adaptiveState: null,
  currentQuickQuestion: null,
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
  preconCatalog: null,
  preconThemeTaxonomy: null,
  scryfallCommanderIndex: null,
  scryfallCommanderByName: new Map(),
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
const DOSSIER_PANEL_CONFIG = [
  { id: "placement", label: "Placement" },
  { id: "start", label: "Start Here" },
  { id: "why", label: "Why This Fits" },
  { id: "adjacent", label: "Adjacent Fits" },
  { id: "commander-deck-starts", label: "Commander Deck Starts" },
  { id: "starter-cards", label: "Starter Cards" },
  { id: "mana-base", label: "Mana Base" },
  { id: "maze-discovery", label: "Maze Discovery" },
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
  const response = await fetch(resolveDataUrl("factions.json"));
  if (!response.ok) {
    throw new Error("Could not load faction data.");
  }
  const json = await response.json();
  APP_STATE.factions = json.factions || {};
  return APP_STATE.factions;
}

/**
 * Loads the adaptive placement model used by the Gate -> Hall -> Crucible flow.
 *
 * @returns {Promise<object>} Generated placement model.
 */
async function loadPlacementModel() {
  const response = await fetch(resolveDataUrl("placement-model.json"));
  if (!response.ok) {
    throw new Error("Could not load placement model.");
  }
  APP_STATE.placementModel = await response.json();
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
  const response = await fetch(resolveDataUrl("identity-layers.json"));
  if (!response.ok) {
    throw new Error("Could not load identity layers.");
  }
  APP_STATE.identityLayers = await response.json();
  return APP_STATE.identityLayers;
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
    preconCatalog,
    preconThemeTaxonomy,
    flavorIndex,
    commanderIndex,
    colorThemeIndex,
    mechanicThemeIndex,
  ] = await Promise.all([
    loadOptionalJson(resolveDataUrl("taxonomy/vox-mana-tags.json"), "tag taxonomy"),
    loadOptionalJson(resolveDataUrl("archscry-flavor-snippets.json"), "Archscry flavor snippets"),
    loadOptionalJson(resolveDataUrl("precons/vox-mana-precon-catalog.json"), "precon catalog"),
    loadOptionalJson(resolveDataUrl("taxonomy/vox-mana-precon-themes.json"), "precon theme taxonomy"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/card-flavor-index.json"), "Scryfall flavor index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/commander-index.json"), "Scryfall commander index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/color-theme-index.json"), "Scryfall color theme index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/mechanic-theme-index.json"), "Scryfall mechanic theme index"),
  ]);

  APP_STATE.tagTaxonomy = taxonomy;
  APP_STATE.archscryFlavorSnippets = archscryFlavorSnippets;
  APP_STATE.preconCatalog = preconCatalog;
  APP_STATE.preconThemeTaxonomy = preconThemeTaxonomy;
  APP_STATE.tagTaxonomyByKey = buildTaxonomyLookup(taxonomy);
  APP_STATE.scryfallFlavorIndex = flavorIndex;
  APP_STATE.scryfallCommanderIndex = commanderIndex;
  APP_STATE.scryfallColorThemeIndex = colorThemeIndex;
  APP_STATE.scryfallMechanicThemeIndex = mechanicThemeIndex;
  APP_STATE.scryfallCommanderByName = new Map(
    (commanderIndex?.commanders || []).map((card) => [normalizeCardName(card.name), card])
  );
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
    return "After choosing your nonbasic lands, fill the rest with basics or colorless utility lands based on your early mana needs.";
  }
  if (basics.length === 1) {
    return `After choosing your nonbasic lands, fill the rest with ${basics[0]} unless your utility lands need more room.`;
  }
  const firstColor = (MANA_SYMBOL_NAMES[colorSymbols[0]] || basics[0]).toLowerCase();
  const secondColor = (MANA_SYMBOL_NAMES[colorSymbols[1]] || basics[1]).toLowerCase();
  return `After choosing your nonbasic lands, fill the rest with ${formatBasicLandList(basics)} based on your early colored mana needs. If most early spells need ${firstColor}, lean ${basics[0]}. If your early interaction needs ${secondColor}, lean ${basics[1]}.`;
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

function buildManaPipsHtml(colors = [], className = "") {
  const symbols = (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => String(color || "").toUpperCase())
    .filter((color) => MANA_SYMBOL_NAMES[color]);
  if (!symbols.length) return "";
  const classAttr = ["mana-pips", className].filter(Boolean).join(" ");
  return `
    <div class="${classAttr}" aria-hidden="true">
      ${symbols.map((color) => `<div class="pip pip-${color}"></div>`).join("")}
    </div>`;
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

function readingSignalBand(confidence) {
  const value = Number(confidence || 0);
  if (value >= 0.6) return "strong";
  if (value >= 0.3) return "moderate";
  return "emerging";
}

function readingSignalMeaning({ band, dossier }) {
  if (!dossier?.isPrimary) {
    if (band === "strong") {
      return "This adjacent view still has enough signal to be worth comparing against the primary reading.";
    }
    if (band === "moderate") {
      return "This adjacent view stays close to the primary result and works best as a neighboring expression, not a replacement.";
    }
    return "This adjacent view is a softer branch off the main result. Treat it as a comparison lens while you test the primary path.";
  }

  if (band === "strong") {
    return "This reading landed cleanly. Nearby fits can still matter, but the primary placement had a clear edge.";
  }
  if (band === "moderate") {
    return "This reading led, but a neighboring fit stayed visible. Read the fork language as part of the result.";
  }
  return "This reading is lighter and more exploratory. Use the nearby fits and Start Here panel as orientation while you test what feels natural.";
}

function buildSignalStrengthCardHtml({ dossier, result }) {
  const activeMatch = matchForFaction(result, dossier?.targetFactionKey) || matchForFaction(result, result?.faction) || null;
  const confidence = Number(activeMatch?.confidence || result?.confidence || 0);
  const percent = Math.round(confidence * 100);
  const band = readingSignalBand(confidence);
  const meterWidth = Math.max(10, Math.min(100, percent || 0));
  return `
    <div class="starter-card signal-strength-card" data-signal-band="${escapeAttributeValue(band)}">
      <div class="starter-title">Signal Strength</div>
      <div class="signal-strength-readout">
        <strong>${escapeHtml(band.charAt(0).toUpperCase() + band.slice(1))}</strong>
        <span>${escapeHtml(confidencePercent(confidence))}</span>
      </div>
      <div class="signal-strength-meter" aria-hidden="true">
        <span style="width:${meterWidth}%"></span>
      </div>
      <div class="signal-strength-scale" aria-hidden="true">
        <span class="${band === "emerging" ? "is-active" : ""}">Emerging</span>
        <span class="${band === "moderate" ? "is-active" : ""}">Moderate</span>
        <span class="${band === "strong" ? "is-active" : ""}">Strong</span>
      </div>
      <div class="starter-copy">${escapeHtml(readingSignalMeaning({ band, dossier }))}</div>
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

function buildSelfCheckCopy(faction) {
  const presentation = presentationForFaction(faction);
  if (presentation.selfCheck) {
    return presentation.selfCheck;
  }
  const reason = presentation.closeReason || presentation.tableExperience || faction?.tagline || "";
  if (!reason) {
    return "This may fit if the values in this reading feel like the kind of deck identity you want to explore.";
  }
  return `This may fit if ${reason} feel like values you want a Commander deck to express.`;
}

function buildIdentityStoryCard({ title, headline, copy, meta = "", className = "" }) {
  return `
    <div class="starter-card identity-story-card${className ? ` ${className}` : ""}">
      <div class="starter-title">${escapeHtml(title)}</div>
      <div class="identity-story-headline">${escapeHtml(headline)}</div>
      <div class="starter-copy">${escapeHtml(copy)}</div>
      ${meta ? `<div class="identity-story-meta">${meta}</div>` : ""}
    </div>`;
}

function buildLayeredIdentityHtml({ dossier, faction }) {
  const identity = layeredIdentityForDisplay(faction, dossier?.faction?.identity);
  const coreEntry = identityColorEntry(identity.core_color);
  const expressionName = identity.expression_name || faction?.name || colorIdentityNames(identity.colors || faction?.colors || []);
  const identityColors = (faction?.colors || [identity.core_color, ...(identity.secondary_colors || [])])
    .filter((color) => MANA_SYMBOL_NAMES[String(color || "").toUpperCase()]);
  const beliefCopy = faction?.philosophy || coreEntry?.philosophy || "This reading has not yet been annotated with a belief statement.";
  const tensionCopy = shortIdentityTension(resolveIdentityTension(identity, faction));
  const tensionTitle = identity.secondary_color ? "Tension" : "Undivided";
  const identityMeta = [
    buildManaPipsHtml(identityColors, "mana-pips-inline"),
    `<span>${escapeHtml(getColorIdentity(identityColors || faction?.key || ""))}</span>`,
  ].filter(Boolean).join("");

  const beliefCard = buildIdentityStoryCard({
    title: "Belief",
    headline: expressionName,
    copy: beliefCopy,
    meta: identityMeta,
    className: "identity-story-card--belief",
  });

  const tensionCard = buildIdentityStoryCard({
    title: tensionTitle,
    headline: identity.secondary_color ? "Where it pulls" : "Clear signal",
    copy: tensionCopy || "This identity has a clear center; no unsupported tension is added to the reading.",
    className: "identity-story-card--support",
  });

  const selfCheckCard = buildIdentityStoryCard({
    title: "Self-Check",
    headline: "Notice the pull",
    copy: buildSelfCheckCopy(faction),
    className: "identity-story-card--support",
  });

  return `
    <div class="starter-section">
      <div class="section-label">Layered Identity</div>
      <div class="identity-story-grid">
        ${beliefCard}
        ${tensionCard}
        ${selfCheckCard}
      </div>
    </div>`;
}

function buildTableIdentityCardHtml(faction) {
  const presentation = presentationForFaction(faction);
  return `
    <div class="how-this-plays-block">
      <div class="how-this-plays-label">At the table</div>
      <div class="table-identity-list">
        <div><span>Role</span>${escapeHtml(presentation.tableRole)}</div>
        <div><span>How opponents read it</span>${escapeHtml(presentation.opponentRead)}</div>
        <div><span>Emotional pressure</span>${escapeHtml(presentation.emotionalPressure)}</div>
      </div>
    </div>`;
}

function buildLoreToMechanicCardHtml(faction) {
  const presentation = presentationForFaction(faction);
  return `
    <div class="how-this-plays-block">
      <div class="how-this-plays-label">In play</div>
      <div class="table-identity-list">
        <div><span>Lore role</span>${escapeHtml(presentation.loreRole)}</div>
        <div><span>Mechanical expression</span>${escapeHtml(presentation.mechanics)}</div>
        <div><span>Table experience</span>${escapeHtml(presentation.tableExperience)}</div>
      </div>
    </div>`;
}

function buildHowThisPlaysCardHtml(faction) {
  return `
    <div class="starter-card starter-card-wide how-this-plays-card">
      <div class="starter-copy">This is the table-facing bridge between the placement language and the kind of Commander game it usually becomes.</div>
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
    alert("The placement model is still loading. Try again in a moment.");
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
  showSection("quick");
  renderQuickQuestion();
  window.setTimeout(() => {
    document.getElementById("quick")?.scrollIntoView({ block: "start", inline: "nearest" });
  }, 0);
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
    finalizeQuickReading();
    return;
  }

  const stageLabel = getStageLabel(question.stage);
  const stageCounts = APP_STATE.adaptiveState?.stage_counts || {};
  const stageQuestionNumber = (stageCounts[question.stage] || 0) + 1;
  const questionNumber = APP_STATE.quickSelections.length + 1;
  const maxQuestions = APP_STATE.placementModel?.stages?.max_total_questions || 8;

  document.getElementById("question-eyebrow").textContent =
    question.eyebrow || `${stageLabel} ${stageQuestionNumber}`;
  document.getElementById("question-title").textContent = question.prompt;
  document.getElementById("answer-grid").innerHTML = question.answers
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

  progressCopy.textContent = `${stageLabel} ${stageQuestionNumber} - Question ${questionNumber} of up to ${maxQuestions}`;
  progressFill.style.width = `${Math.min(100, (questionNumber / maxQuestions) * 100)}%`;
  backButton.textContent = APP_STATE.quickSelections.length === 0 ? "Return to landing" : "Back";
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

  if (shouldFinishAdaptiveReading(APP_STATE.adaptiveState, APP_STATE.placementModel)) {
    finalizeQuickReading();
    return;
  }

  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
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
  const result = buildAdaptivePlacementResult({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    factions: APP_STATE.factions,
    starterProfile: getStarterProfile(),
    version: RESULT_VERSION,
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
    const decree = document.getElementById("decree-container");
    const rule = document.getElementById("decree-rule");
    const faction = getFaction(result.faction) || {};

    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = result.faction;
    APP_STATE.resultSource = "interview";
    APP_STATE.returnSection = "interview";
    vm_cachePlacementResult(result);

    setTimeout(() => {
      document.getElementById("terminal-output").style.opacity = "0.4";
      document.getElementById("decree-title").textContent = result.faction_name || result.faction || "Unbound Order";
      document.getElementById("decree-tagline").textContent = faction.tagline || "The scrying glass has spoken.";
      document.getElementById("decree-text").textContent = result.decree || "The decree remains unwritten.";
      document.getElementById("decree-runner").textContent =
        result.adjacent_matches?.[0]?.faction_name
          ? `The reading also noted an affinity for ${result.adjacent_matches[0].faction_name}.`
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

function buildCommanderDirectoryLinksHtml(links = []) {
  const linkButtons = buildLinkButtons(links);
  return linkButtons
    ? `<div class="starter-links" data-commander-directory-links>${linkButtons}</div>`
    : "";
}

export function buildDossierRenderState({
  starterCards = {},
  colors = [],
  commanderDirectoryLinks = [],
} = {}) {
  const normalizedStarterCards = normalizeStarterCardGroups(starterCards);
  const starterCardSegments = starterCardSegmentsForGroups(normalizedStarterCards);
  return {
    starterCards: normalizedStarterCards,
    starterCardSegments,
    hasStarterCardReferences: starterCardSegments.length > 0,
    basicLandCopy: basicLandGuidanceCopy(colors),
    commanderDirectoryLinksHtml: buildCommanderDirectoryLinksHtml(commanderDirectoryLinks),
  };
}

function dedupeLinks(links = []) {
  const seen = new Set();
  return (links || []).filter((link) => {
    const key = `${link?.service || ""}:${link?.url || ""}:${link?.label || ""}`;
    if (!link?.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function searchSlug(value) {
  return normalizeCardName(value).replace(/\s+/g, "-");
}

function siteSearchUrl(service, query) {
  const encoded = encodeURIComponent(query);
  // Source search patterns are intentionally conservative where stable deep links are uncertain.
  if (service === "moxfield") return `https://www.moxfield.com/decks/public/advanced?format=commander&filter=${encoded}`;
  if (service === "mtgdecks") return `https://mtgdecks.net/Commander?search=${encoded}`;
  return `https://www.google.com/search?q=${encoded}`;
}

function buildCommanderSpecificLinks(candidates = [], service) {
  return (candidates || []).slice(0, 2).map((candidate) => {
    const name = candidate?.name || candidate?.display_name || "";
    if (!name) return null;
    if (service === "edhrec" && candidate.edhrec) {
      return { service, label: name, url: candidate.edhrec };
    }
    if (service === "scryfall" && candidate.scryfall) {
      return { service, label: name, url: candidate.scryfall };
    }
    if (service === "edhrec") {
      return { service, label: name, url: `https://edhrec.com/commanders/${searchSlug(name)}` };
    }
    if (service === "mtgdecks") {
      return { service, label: name, url: buildMtgDecksCommanderUrl(name) };
    }
    return { service, label: name, url: siteSearchUrl(service, `${name} Commander`) };
  }).filter(Boolean);
}

function buildDeckDiscoveryGroups({
  faction,
  archidektLinks,
  commanderDirectoryLinks,
  commanderCandidates,
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
        ...buildCommanderSpecificLinks(commanderCandidates, "edhrec"),
      ]).slice(0, 4),
    },
    {
      service: "archidekt",
      name: "Archidekt",
      desc: "Use color and catalog-tag lanes when you want deckbuilder-native filtering.",
      links: dedupeLinks(archidektLinks).slice(0, 4),
    },
    {
      service: "mtgdecks",
      name: "MTGDecks",
      desc: "Start with the color lane, then search commander names when you want tournament-adjacent deck examples.",
      links: dedupeLinks([
        ...commanderDirectoryLinks.filter((link) => getServiceChipMeta(link).key === "mtgdecks"),
        ...buildCommanderSpecificLinks(commanderCandidates, "mtgdecks"),
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

function buildScryfallCommanderUrl(name) {
  return `https://scryfall.com/search?q=${encodeURIComponent(`!"${name}"`)}`;
}

function buildPreconLinks(precon) {
  return dedupeLinks([
    {
      service: "scryfall",
      label: "Research commander",
      url: buildScryfallCommanderUrl(precon.mainCommander),
    },
    {
      service: "mtgdecks",
      label: "Find decklists",
      url: buildMtgDecksCommanderUrl(precon.mainCommander),
    },
  ]);
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
  const fitSummary = wordExcerpt(precon?.fitSummary || precon?.tablePerception || "", 24);
  const bestFor = wordExcerpt(precon?.recommendationProfile?.recommendedFor || "", 18);
  const chips = preconPreviewChips(precon);

  return `
    <div class="precon-card is-compact" data-precon-card data-precon-group="${escapeHtml(previewGroup)}">
      <div class="precon-topline">
        <span class="precon-badge ${escapeHtml(badge.className)}" title="${escapeHtml(badge.description)}" aria-label="${escapeHtml(`${badge.label}: ${badge.description}`)}">${escapeHtml(badge.label)}</span>
        <span class="precon-product">${escapeHtml(precon.productSection)}</span>
      </div>
      <div class="precon-title">${escapeHtml(precon.deckName)}</div>
      <div class="precon-commander">Main commander: ${escapeHtml(precon.mainCommander)}</div>
      ${chips.length ? `<div class="precon-chip-row">${chips.map((chip) => `<span class="precon-chip">${escapeHtml(chip)}</span>`).join("")}</div>` : ""}
      ${fitSummary ? `<div class="precon-copy">${escapeHtml(fitSummary)}</div>` : ""}
      ${bestFor ? `<div class="precon-best-for"><span>Best for:</span> ${escapeHtml(bestFor)}</div>` : ""}
      <div class="precon-links">${buildLinkButtons(buildPreconLinks(precon))}</div>
    </div>`;
}

function buildPreconSectionHtml(preconRecommendations) {
  const preview = selectPreconPreviewRecommendations(preconRecommendations);
  if (!preconRecommendations?.hasAny || !preview.visible.length) {
    return `
      <div class="precons-section">
        <div class="section-label">Recommended Precon Decks</div>
        <div class="precon-empty">No validated precon recommendations are available for this dossier yet.</div>
      </div>`;
  }

  const canExpand = preview.hasOverflow && preview.remaining.length > 0;
  const remainingCount = preview.remaining.length;
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
      <div class="section-label">Recommended Precon Decks</div>
      <div class="precon-intro">Ready-made Commander decks that match this dossier's color identity, faction pressure, and validated mechanics.</div>
      <div class="precon-meta">Showing the strongest starting points from this recommendation pool.</div>
      <div class="precon-grid is-compact" data-precon-preview-grid="primary">${preview.visible.map((precon) => buildPreconCardHtml(precon)).join("")}</div>
      ${canExpand ? `<div class="precon-grid is-compact" data-precon-preview-grid="remaining" hidden>${preview.remaining.map((precon) => buildPreconCardHtml(precon)).join("")}</div>` : ""}
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
        ${buildActionAttrs("set-dossier-panel", { panelId: panel.id })}
      >${escapeHtml(panel.label)}</button>`;
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
      ${isPrimary ? "" : `<button class="btn-secondary dossier-utility-btn" type="button" ${buildActionAttrs("return-primary-reading")}>Back to Primary Reading</button>`}
    </div>`;
}

function buildPlacementSnapshotHtml({ dossier, faction, commanderLane }) {
  const colorCode = getColorIdentity(faction.colors || faction.key);
  const colorNames = colorIdentityNames(faction.colors || colorCode);
  const closestAdjacent = dossier.adjacentFits?.[0]?.name || "No adjacent fit saved";
  const identityMeta = colorCode ? `${colorNames} · ${colorCode}` : colorNames;
  const startCopy = commanderStartSnapshotCopy({ commanderLane, dossier });
  const firstStop = dossier.isPrimary ? "Open Start Here first" : "Open Start Here for this fit";

  return `
    <div class="dossier-snapshot" aria-label="Placement snapshot">
      <div class="dossier-snapshot-card dossier-snapshot-card--placement">
        <span>Current fit</span>
        <strong>${escapeHtml(faction.name)}</strong>
        <div class="dossier-snapshot-meta">
          ${buildManaPipsHtml(faction.colors || [], "mana-pips-inline")}
          <em>Identity | ${escapeHtml(identityMeta)}</em>
        </div>
      </div>
      <div class="dossier-snapshot-card">
        <span>Closest adjacent fit</span>
        <strong>${escapeHtml(closestAdjacent)}</strong>
      </div>
      <div class="dossier-snapshot-card dossier-snapshot-card--narrative">
        <span>How this usually starts</span>
        <div class="dossier-snapshot-copy">${escapeHtml(startCopy)}</div>
      </div>
      <div class="dossier-snapshot-card">
        <span>First stop</span>
        <strong>${escapeHtml(firstStop)}</strong>
      </div>
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
}

function setDossierPanel(panelId, { updateUrl = true } = {}) {
  const activePanel = normalizeDossierPanelId(panelId);
  if (!activePanel) {
    return;
  }
  APP_STATE.activeDossierPanel = activePanel;
  APP_STATE.dossierLayoutMode = "focus";
  applyDossierConsoleState();
  if (updateUrl) {
    updateDossierUrlState();
  }
  initializeDossierRadarIfVisible();
}

function setDossierLayoutMode(layoutMode, { updateUrl = true } = {}) {
  const normalized = normalizeDossierLayoutMode(layoutMode) || DOSSIER_DEFAULT_LAYOUT_MODE;
  APP_STATE.dossierLayoutMode = normalized;
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
        initDossierManaRadar({ result, faction: radarFaction, profile: getDossierRadarProfile(result, radarFaction) });
      }
    });
    return;
  }

  initDossierManaRadar({ result, faction: radarFaction, profile: getDossierRadarProfile(result, radarFaction) });
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

function buildTagExplanationCards(tagRefs = [], faction, limit = 4) {
  return buildTagExplanationSummaries({
    tagRefs,
    faction,
    taxonomy: APP_STATE.tagTaxonomy,
    limit,
  }).map((entry) => {
    return `
      <div class="starter-card tag-explainer-card">
        <div class="starter-title">${escapeHtml(entry.title)}</div>
        <div class="tag-meaning">${escapeHtml(entry.meaning)}</div>
        <div class="starter-copy">${escapeHtml(entry.copy)}</div>
        ${entry.helper ? `<div class="tag-helper">${escapeHtml(entry.helper)}</div>` : ""}
      </div>`;
  }).join("");
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

function selectFlavorEchoes({ faction, tagRefs }) {
  const desired = new Set(uniqueTagRefs(tagRefs).map((ref) => `${ref.category}:${ref.tag}`));
  const cards = APP_STATE.scryfallFlavorIndex?.cards || [];
  const factionColors = faction?.colors || [];

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
  const signalCopy = buildReadingSignalCopy({ dossier, faction, result, factions: APP_STATE.factions });

  return `
    <div class="starter-section">
      <div class="section-label">The Shape of the Reading</div>
      <div class="starter-grid">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${escapeHtml(dossier.isPrimary ? `Why ${faction.name} Rose First` : `${faction.name} As Adjacent Fit`)}</div>
          <div class="starter-copy">${escapeHtml(signalCopy)}</div>
        </div>
        ${buildSignalStrengthCardHtml({ dossier, result })}
      </div>
    </div>`;
}

function buildDossierInterpretationHtml({ dossier, faction, result, tagRefs }) {
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const adjacentFaction = adjacent?.faction ? getFaction(adjacent.faction) : null;
  const contrastCopy = adjacentFaction
    ? buildContrastCopy(dossier.isPrimary ? faction : getFaction(dossier.primaryFactionKey), dossier.isPrimary ? adjacentFaction : faction)
    : "";
  const forkHtml = contrastCopy
    ? `<div class="starter-section">
        <div class="section-label">Faction Fork</div>
        <div class="starter-grid">
          <div class="starter-card starter-card-wide">
            <div class="starter-title">Where This Path Divides</div>
            <div class="starter-copy">${escapeHtml(contrastCopy)}</div>
          </div>
        </div>
      </div>`
    : "";

  return `
    ${forkHtml}
    ${buildLayeredIdentityHtml({ dossier, faction })}
    <div class="starter-section">
      <div class="section-label">How This Plays</div>
      <div class="starter-grid">${buildHowThisPlaysCardHtml(faction)}</div>
    </div>
    <div class="starter-section">
      <div class="section-label">Why This Fits You</div>
      <div class="starter-grid">${buildTagExplanationCards(tagRefs, faction, 3)}</div>
    </div>`;
}

function buildFlavorEchoWhy({ tagMatches, faction }) {
  const presentation = presentationForFaction(faction);
  const bestRef = tagMatches.find((ref) => ref.category === "identity" || ref.category === "lore-tone") || tagMatches[0];
  const entry = bestRef ? taxonomyEntry(bestRef.category, bestRef.tag) : null;
  if (entry) {
    return `This is one example of ${entry.display_name.toLowerCase()} showing up in card form. In this ${presentation.shortName} reading, it points toward ${presentation.tableExperience}.`;
  }
  return "";
}

function buildFlavorEchoesHtml(flavorEchoes = [], faction = {}) {
  if (!flavorEchoes.length) return "";
  const groundedEchoes = flavorEchoes
    .map((entry) => ({
      ...entry,
      why: buildFlavorEchoWhy({ tagMatches: entry.tagMatches, faction }),
    }))
    .filter((entry) => entry.why);
  if (!groundedEchoes.length) return "";
  return `
    <div class="starter-section">
      <div class="section-label">What This Looks Like In Cards</div>
      <div class="flavor-echo-intro">These are examples of the reading's feel in actual cards, not mandatory pickups.</div>
      <div class="flavor-echo-grid">
        ${groundedEchoes.map(({ card, tagMatches, why }) => {
          const excerpt = wordExcerpt(flavorExcerptForCard(card), 18);
          const image = card.image_uris?.art_crop || card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.art_crop || "";
          return `
            <a class="flavor-echo-card" href="${escapeHtml(card.scryfall_uri || "#")}" target="_blank" rel="noopener">
              ${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : ""}
              <span class="flavor-echo-body">
                <span class="flavor-echo-name">${escapeHtml(card.name)}</span>
                <span class="flavor-echo-kicker">Example card moment</span>
                <span class="flavor-echo-text">${escapeHtml(excerpt)}</span>
                <span class="flavor-echo-why">${escapeHtml(why)}</span>
                <span class="vm-tag-row">${renderTagChips(tagMatches, 3)}</span>
              </span>
            </a>`;
        }).join("")}
      </div>
    </div>`;
}

function buildMazeDiscoveryHtml(paths = []) {
  if (!paths.length) return "";
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

/**
 * Renders the main dossier view for the active placement result.
 *
 * @param {string=} viewKey Optional faction key to view inside the current result.
 */
function renderResult(viewKey) {
  const context = getActiveResultContext();
  const result = context.result;
  const activeKey = viewKey || context.viewKey;
  const terminalEnabled = isScryingTerminalEnabled();
  destroyDossierManaRadar();

  if (!result || !activeKey) {
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

  const starterProfile = result.starter_profile || getStarterProfile();
  const dossier = buildCommanderDossier({
    factions: APP_STATE.factions,
    placementModel: APP_STATE.placementModel,
    deckTagCatalog: APP_STATE.deckTagCatalog,
    placementResult: result,
    targetFactionKey: activeKey,
    starterProfile,
  });
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
  const flavorEchoes = selectFlavorEchoes({ faction, tagRefs: readingTagRefs });
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
  const mazeDiscoveryHtml = buildMazeDiscoveryHtml(personalizedMazePaths);
  const apocryphaHtml = buildApocryphaHtml(faction);
  const heroNarrative = buildHeroNarrative({ dossier, faction, result, factions: APP_STATE.factions });
  const adjacentContextHtml = buildAdjacentContextHtml({ dossier, result });
  const activeExpressionEntries = Object.values(APP_STATE.identityLayers?.expressions || {})
    .filter((entry) => entry?.active !== false);
  const activeExpressionCount = activeExpressionEntries.length || Object.keys(APP_STATE.factions || {}).length || 15;
  const activeMonoCount = activeExpressionEntries
    .filter((entry) => String(entry?.kind || "").toLowerCase() === "color")
    .length;
  const atlasFrontierCopy = activeMonoCount === 1
    ? `The atlas is still opening: ${activeExpressionCount} expressions are lit now - ten Ravnican guilds, five Strixhaven colleges, and one mono color path. Wedges, families, and stranger color-shapes wait beyond the next veil.`
    : activeMonoCount > 1
      ? `The atlas is still opening: ${activeExpressionCount} expressions are lit now - ten Ravnican guilds, five Strixhaven colleges, and ${activeMonoCount} mono color paths. Wedges, families, and stranger color-shapes wait beyond the next veil.`
      : `The atlas is still opening: ${activeExpressionCount} expressions are lit now - ten Ravnican guilds and five Strixhaven colleges. Wedges, families, and stranger color-shapes wait beyond the next veil.`;
  const archetypeHtml = (dossier.archetypes || [])
    .map((item) => `<div class="arch-card"><div class="arch-name">${item.name}</div><div class="arch-desc">${item.desc}</div></div>`)
    .join("");

  function cardSlots(items, prefix, placeholderClass, imageClass) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="staple-wrap"><div class="${placeholderClass}" id="${id}">${name}</div><div class="staple-name">${name}</div></div>`;
      })
      .join("");
  }

  function landSlots(items, prefix) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="land-wrap"><div class="land-placeholder" id="${id}">${name}</div><div class="land-name">${name}</div></div>`;
      })
      .join("");
  }

  function commanderPreviewSlots(items) {
    return (items || [])
      .map((candidate, index) => {
        const id = `cmd_${index}`;
        const indexed = indexedCommanderForCandidate(candidate);
        const meta = commanderMetaHtml(indexed);
        const tagChips = indexed ? renderTagChips(tagRefsForRecord(indexed), 3) : "";
        return `
          <div class="commander-preview-card" data-commander-card>
            <div class="commander-art-shell">
              <div class="commander-placeholder" id="${id}">${candidate.name}</div>
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
    starterCards: dossier.starterCards,
    colors: faction.colors || [],
    commanderDirectoryLinks,
  });
  const renderableStarterCards = renderState.starterCards;
  const starterCardSegments = renderState.starterCardSegments;
  const hasStarterCardReferences = renderState.hasStarterCardReferences;
  const basicLandCopy = renderState.basicLandCopy;
  const commanderDirectoryLinksHtml = renderState.commanderDirectoryLinksHtml;
  const commanderPreviewHtml = `
    <div class="commander-preview-block">
      <div class="commander-preview-label">Commander starting points</div>
      ${commanderDirectoryLinksHtml}
      ${commanderPreviewCandidates.length ? `<div class="commander-preview-grid" id="commander-preview-grid">${commanderPreviewSlots(commanderPreviewCandidates)}</div>` : ""}
    </div>`;

  const adjacentMatches = dossier.adjacentFits || [];
  const adjacentHtml = adjacentMatches.length
    ? adjacentMatches
        .map((fit) => {
          return `
            <div class="adjacent-card ${fit.factionKey === activeKey ? "active" : ""}">
              <div class="adjacent-label">${fit.world}</div>
              <div class="adjacent-name">${fit.name}</div>
              <div class="adjacent-copy">${fit.reason || fit.tagline}</div>
              <div class="adjacent-actions">
                <button class="adjacent-btn" type="button" ${buildActionAttrs("switch-adjacent-view", { viewKey: fit.factionKey })}>View this fit</button>
              </div>
            </div>`;
        })
        .join("")
    : terminalEnabled
      ? `<div class="adjacent-card"><div class="adjacent-name">No adjacent fits saved yet.</div><div class="adjacent-copy">Retake or use the Scrying Terminal to generate a fuller read.</div></div>`
      : `<div class="adjacent-card"><div class="adjacent-name">No adjacent fits saved yet.</div><div class="adjacent-copy">Retake the quick reading to generate a fuller read.</div></div>`;
  const adjacentSectionHtml = `
    <div class="adjacent-section" id="adjacent-fits">
      <div class="section-label">Adjacent Fits</div>
      <div class="adjacent-grid">${adjacentHtml}</div>
    </div>`;
  const resultStatus = dossier.resultStatus;
  const resultStatusHtml = `
    <div class="result-status">
      <strong>${escapeHtml(resultStatus)}</strong>
      ${SESSION.username ? ` Saved under ${escapeHtml(SESSION.username)}.` : ""}
    </div>`;
  const returnToPrimaryButton = !isPrimary
    ? `<div class="footer-button-row"><button class="btn-secondary" type="button" ${buildActionAttrs("return-primary-reading")}>Back to Primary Reading</button></div>`
    : "";

  const saveButtonLabel = SESSION.username ? "Save this reading" : "Save with Google";
  const returnToTerminalButton =
    terminalEnabled && APP_STATE.resultSource === "interview"
      ? `<button class="btn-secondary" type="button" ${buildActionAttrs("return-interview-source")}>Return to the Terminal</button>`
      : "";
  const decreeCopy = dossier.decreeCopy;
  const readingOmens = dossier.readingOmens || [];
  const evidenceHtml = readingOmens.length
    ? readingOmens
        .map((omen) => `
          <div class="starter-card omen-card">
            <div class="omen-index">${omen.title}</div>
            <div class="starter-title">${omen.answerTitle}</div>
            <div class="starter-copy">${omen.copy}</div>
          </div>`)
        .join("")
    : "";

  const pipsHtml = (faction.colors || []).map((color) => `<div class="pip pip-${color}"></div>`).join("");
  const decksHtml = buildDeckDiscoveryHtml(buildDeckDiscoveryGroups({
    faction,
    archidektLinks: archidektSearchLinks,
    commanderDirectoryLinks,
    commanderCandidates: commanderPreviewCandidates,
    tagRefs: readingTagRefs,
  }));
  const preconSectionHtml = Array.isArray(APP_STATE.preconCatalog?.precons)
    ? buildPreconSectionHtml(preconRecommendations)
    : "";
  const landLaneCopy = {
    premium: "Best when you want speed, consistency, and fewer tapped lands.",
    midrange: "Good first upgrade lane: stronger fixing without chasing every premium land.",
    budget: "Playable entry point. Expect more tapped lands, but the deck will still function.",
    utility: "Adds Commander flexibility beyond color fixing.",
  };
  const manaBaseSegments = MANA_BASE_SEGMENTS.filter((segment) =>
    hasRenderableLandTier(landRecommendations, segment.id)
  );
  const utilityTierHtml = (landRecommendations.utility || []).length
    ? `
        <div class="land-tier tier-utility">
          <div class="land-tier-label">Utility</div>
          <div class="land-tier-copy">${landLaneCopy.utility}</div>
          <div class="land-cards-row">${landSlots(landRecommendations.utility, "lu")}</div>
        </div>`
    : "";
  APP_STATE.hiddenDossierPanelIds = new Set(hasStarterCardReferences ? [] : ["starter-cards"]);
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
  const placementSnapshotHtml = buildPlacementSnapshotHtml({ dossier, faction, commanderLane });
  const utilityActionsHtml = buildDossierUtilityActionsHtml({ isPrimary, layoutMode });
  const placementPanelHtml = `
    ${adjacentContextHtml}
    ${resultStatusHtml}
    ${returnToPrimaryButton}
    ${renderDossierRadarSection({ result, faction, dossier, flavorSnippets: flavorSnippetsForFaction(faction) })}
    ${discoverySummaryHtml}`;
  const whyPanelHtml = `
    ${dossierInterpretationHtml}
    ${evidenceHtml ? `
      <div class="starter-section">
        <div class="section-label">Signals From Your Answers</div>
        <p class="signals-intro">These are answer patterns that kept nudging this placement forward. Use them as a sanity check: if these signals match the Commander game you want to play, the reading is probably pointing in a useful direction.</p>
        <div class="starter-grid">${evidenceHtml}</div>
      </div>` : ""}
    ${flavorEchoesHtml}`;
  const startPanelHtml = `
    <div class="starter-section">
      <div class="section-label">Start Here</div>
      <div class="starter-grid starter-grid-start">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${commanderLane.title}</div>
          <div class="starter-copy">${commanderLane.copy}</div>
          <div class="starter-notes">
            ${commanderLane.details.map((detail) => `
              <div class="starter-note">
                <div class="starter-note-label">${detail.label}</div>
                <div class="starter-copy">${detail.copy}</div>
              </div>`).join("")}
          </div>
          ${commanderPreviewHtml}
        </div>
      </div>
    </div>`;
  const deckStartsPanelHtml = `
    ${preconSectionHtml}
    <div class="decks-section">
      <div class="section-label">Commander Deck Starts</div>
      <div class="decks-grid">${decksHtml}</div>
    </div>
    ${archetypeHtml ? `
      <div class="archetypes-section">
        <div class="section-label">Commander Lanes</div>
        <div class="archetypes-grid">${archetypeHtml}</div>
      </div>` : ""}`;
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
      <div class="section-label">${institutionLabel} Starter Card References</div>
      ${buildSegmentControlsHtml("starter-cards", starterCardSegments, starterSegment, "Starter card groups")}
      ${starterCardSegments.map((segment) =>
        buildSegmentPanelHtml("starter-cards", segment.id, starterSegment, starterCardPanelContent[segment.id])
      ).join("")}
    </div>` : "";
  const manaBasePanelHtml = `
    <div class="lands-section">
      <div class="section-label">Mana Base Starting Map</div>
      ${buildSegmentControlsHtml("mana-base", manaBaseSegments, manaBaseSegment, "Mana base tiers")}
      <div class="lands-tiers">
        ${buildSegmentPanelHtml("mana-base", "basics", manaBaseSegment, `
          <div class="land-tier tier-basics">
            <div class="land-tier-copy">${basicLandCopy}</div>
          </div>`)}
        ${hasRenderableLandTier(landRecommendations, "premium") ? buildSegmentPanelHtml("mana-base", "premium", manaBaseSegment, `
          <div class="land-tier tier-premium">
            <div class="land-tier-label">Premium</div>
            <div class="land-tier-copy">${landLaneCopy.premium}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.premium, "lp")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "midrange") ? buildSegmentPanelHtml("mana-base", "midrange", manaBaseSegment, `
          <div class="land-tier tier-midrange">
            <div class="land-tier-label">Midrange</div>
            <div class="land-tier-copy">${landLaneCopy.midrange}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.midrange, "lm")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "budget") ? buildSegmentPanelHtml("mana-base", "budget", manaBaseSegment, `
          <div class="land-tier tier-budget">
            <div class="land-tier-label">Budget</div>
            <div class="land-tier-copy">${landLaneCopy.budget}</div>
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
    { id: "adjacent", content: `${returnToPrimaryButton}${adjacentSectionHtml}` },
    { id: "commander-deck-starts", content: deckStartsPanelHtml },
    hasStarterCardReferences ? { id: "starter-cards", content: starterCardsPanelHtml } : null,
    { id: "mana-base", content: manaBasePanelHtml },
    { id: "maze-discovery", content: mazePanelHtml },
  ].filter(Boolean).map((panel) => buildDossierPanelHtml({
    id: panel.id,
    activePanel,
    layoutMode,
    content: panel.content,
  })).join("");

  document.getElementById("result-inner").innerHTML = `
    <div class="guild-banner" style="background:${faction.banner}">
      <div class="guild-eyebrow">${isPrimary ? `Your ${institutionLabel}` : `Adjacent ${institutionLabel} Fit`}</div>
      <div class="guild-name" style="color:${faction.accent}">${faction.name}</div>
      <div class="guild-tagline">${faction.tagline}</div>
      <div class="mana-pips">${pipsHtml}</div>
      <div class="guild-philosophy">${escapeHtml(heroNarrative)}</div>
      <div class="guild-lore-summary">${faction.philosophy}</div>
    </div>

    ${placementSnapshotHtml}

    <div class="dossier-console" data-dossier-console data-dossier-layout="${layoutMode}">
      <div class="dossier-mobile-nav">
        <div class="vm-tabs dossier-mobile-tabs" role="tablist" aria-label="Archscry dossier sections">
          ${buildDossierTabsHtml("mobile", activePanel, layoutMode)}
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

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = activeKey;
  APP_STATE.activeDossierRadarFaction = faction;
  showSection("result");
  applyDossierConsoleState();
  applyTerminalVisibility();
  updateTopbar();
  initializeDossierRadarIfVisible(result, faction);
  if (!shouldDisableResultCardArt()) {
    loadResultCardArt(faction, commanderPreviewCandidates, renderableStarterCards, landRecommendations);
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
  renderResult(primaryViewKey);
}

// Card art loading, Scryfall named-card cache, and desktop preview overlays.

/**
 * Loads Scryfall images for Commander previews, staples, and lands after the result HTML has rendered.
 *
 * @param {object} faction Canonical faction record being displayed.
 * @param {object[]=} commanderCandidates Commander preview candidates to verify.
 * @param {object=} starterCards Dossier starter card groups.
 * @param {object=} landRecommendations Dossier land recommendation tiers.
 * @returns {Promise<void>} Resolves after all visible slots have been attempted.
 */
async function loadResultCardArt(faction, commanderCandidates = [], starterCards = {}, landRecommendations = {}) {
  const factionIdentity = new Set(faction?.colors || []);
  let verifiedCommanders = 0;
  const commanderCards = (commanderCandidates || []).map((candidate, index) => ({
    ...candidate,
    id: `cmd_${index}`,
    imageClass: "commander-img",
    commanderPreview: true,
  }));
  const allCards = [
    ...commanderCards,
    ...(starterCards.creatures || []).map((name, index) => ({ name, id: `sc_${index}`, imageClass: "staple-img" })),
    ...(starterCards.spells || []).map((name, index) => ({ name, id: `ss_${index}`, imageClass: "staple-img" })),
    ...(starterCards.permanents || []).map((name, index) => ({ name, id: `sp_${index}`, imageClass: "staple-img" })),
    ...(landRecommendations.premium || []).map((name, index) => ({ name, id: `lp_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.midrange || []).map((name, index) => ({ name, id: `lm_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.budget || []).map((name, index) => ({ name, id: `lb_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.utility || []).map((name, index) => ({ name, id: `lu_${index}`, imageClass: "land-img" })),
  ];

  for (const card of allCards) {
    const slot = document.getElementById(card.id);
    if (!slot) {
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
        slot.closest("[data-commander-card]")?.classList.add("is-verified");
        slot.outerHTML = `<a href="${linkUrl}" target="_blank" rel="noopener"><img class="${card.imageClass}" src="${imageUrl}" alt="${data.name}" loading="lazy"></a>`;
        if (card.commanderPreview) {
          verifiedCommanders += 1;
        }
      } else if (card.commanderPreview) {
        slot.closest("[data-commander-card]")?.remove();
      } else {
        slot.textContent = card.name;
      }
    } catch (_) {
      const fallback = document.getElementById(card.id);
      if (card.commanderPreview) {
        fallback?.closest("[data-commander-card]")?.remove();
      } else if (fallback) {
        fallback.textContent = card.name;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 90));
  }

  const previewGrid = document.getElementById("commander-preview-grid");
  const fallback = document.getElementById("commander-preview-fallback");
  if (commanderCandidates.length && verifiedCommanders < 1) {
    previewGrid?.remove();
    fallback?.classList.add("is-visible");
  }
}

export async function loadCachedScryfallNamedCard(name) {
  const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`;
  const storage = getScryfallNamedCardStorage();
  if (storage) {
    try {
      const cached = storage.getItem(`vm_scryfall_named_v1:${url}`);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (_) {}
  }

  return await withNamedCardInFlightDedupe(url, async () => {
    const cachedNow = storage ? readScryfallNamedCardCache(storage, url) : null;
    if (cachedNow) return cachedNow;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok && data?.name && storage) {
      try {
        storage.setItem(`vm_scryfall_named_v1:${url}`, JSON.stringify(data));
      } catch (_) {}
    }
    return data;
  });
}

function getScryfallNamedCardStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (_) {
    return null;
  }
}

function readScryfallNamedCardCache(storage, url) {
  try {
    const cached = storage.getItem(`vm_scryfall_named_v1:${url}`);
    return cached ? JSON.parse(cached) : null;
  } catch (_) {
    return null;
  }
}

const ScryfallNamedCardInFlightRequests = new Map();

function withNamedCardInFlightDedupe(cacheKey, fetcher) {
  if (ScryfallNamedCardInFlightRequests.has(cacheKey)) {
    return ScryfallNamedCardInFlightRequests.get(cacheKey);
  }

  const request = Promise.resolve()
    .then(fetcher)
    .finally(() => {
      ScryfallNamedCardInFlightRequests.delete(cacheKey);
    });

  ScryfallNamedCardInFlightRequests.set(cacheKey, request);
  return request;
}

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

function canShowCardPreviewOverlay() {
  const supportsHover = typeof window.matchMedia !== "function" ||
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const allowsMotion = typeof window.matchMedia !== "function" ||
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return supportsHover && allowsMotion;
}

function ensureCardPreviewOverlay() {
  if (cardPreviewOverlay) {
    return cardPreviewOverlay;
  }
  const overlay = document.createElement("div");
  overlay.className = "card-preview-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `<img alt=""><span></span>`;
  document.body.appendChild(overlay);
  cardPreviewOverlay = overlay;
  return overlay;
}

function positionCardPreviewOverlay(overlay, source, event = null) {
  const rect = source.getBoundingClientRect();
  const width = source.classList.contains("land-img") ? 228 : 252;
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

function showCardPreviewOverlay(source, event = null) {
  if (!canShowCardPreviewOverlay() || !(source instanceof HTMLImageElement)) {
    return;
  }
  const overlay = ensureCardPreviewOverlay();
  const image = overlay.querySelector("img");
  const label = overlay.querySelector("span");
  if (image) {
    image.src = source.currentSrc || source.src;
    image.alt = "";
  }
  if (label) {
    label.textContent = source.alt || "Card preview";
  }
  positionCardPreviewOverlay(overlay, source, event);
  overlay.classList.add("is-visible");
}

function hideCardPreviewOverlay() {
  cardPreviewOverlay?.classList.remove("is-visible");
}

function cardPreviewImageFromEvent(event) {
  const wrap = event.target instanceof Element
    ? event.target.closest(".staple-wrap, .land-wrap")
    : null;
  return wrap?.querySelector("img.staple-img, img.land-img") || null;
}

function handleCardPreviewPointerOver(event) {
  const image = cardPreviewImageFromEvent(event);
  if (image) {
    showCardPreviewOverlay(image, event);
  }
}

function handleCardPreviewPointerMove(event) {
  if (!cardPreviewOverlay?.classList.contains("is-visible")) {
    return;
  }
  const image = cardPreviewImageFromEvent(event);
  if (image) {
    positionCardPreviewOverlay(cardPreviewOverlay, image, event);
  }
}

function handleCardPreviewPointerOut(event) {
  const wrap = event.target instanceof Element
    ? event.target.closest(".staple-wrap, .land-wrap")
    : null;
  const relatedInside = event.relatedTarget instanceof Node && wrap?.contains(event.relatedTarget);
  if (wrap && !relatedInside) {
    hideCardPreviewOverlay();
  }
}

function handleCardPreviewFocusIn(event) {
  const image = cardPreviewImageFromEvent(event);
  if (image) {
    showCardPreviewOverlay(image);
  }
}

function handleCardPreviewFocusOut(event) {
  const wrap = event.target instanceof Element
    ? event.target.closest(".staple-wrap, .land-wrap")
    : null;
  const relatedInside = event.relatedTarget instanceof Node && wrap?.contains(event.relatedTarget);
  if (wrap && !relatedInside) {
    hideCardPreviewOverlay();
  }
}

// Delegated route controls. Keep data-action behavior centralized here.

function bindArchscryControls() {
  const app = document.querySelector(".app");
  app?.addEventListener("click", (event) => {
    void handleArchscryActionClick(event);
  });
  app?.addEventListener("keydown", handleArchscryKeydown);
  app?.addEventListener("pointerover", handleCardPreviewPointerOver);
  app?.addEventListener("pointermove", handleCardPreviewPointerMove);
  app?.addEventListener("pointerout", handleCardPreviewPointerOut);
  app?.addEventListener("focusin", handleCardPreviewFocusIn);
  app?.addEventListener("focusout", handleCardPreviewFocusOut);
}

async function handleArchscryActionClick(event) {
  const actionNode = event.target.closest("[data-action]");
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
    case "set-dossier-panel":
      setDossierPanel(actionNode.dataset.panelId || "");
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
    default:
  }
}

function handleArchscryKeydown(event) {
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

import { loadDictionaryFromSeedUrl } from "./scryfall-dictionary.js";
import { normalizeSortDirection, setScryfallDictionary } from "./scryfall-parser.js";
import { buildVisualBuilderQuery, parseKeywordInput } from "./research-builder.js";
import { applyMazeFormatToQuery, resolveMazeQueryRequest } from "./maze-query-core.js";
import { resolveModeInputValue } from "./research-mode.js";
import * as ResearchSearch from "./research-search.js";
import { buildScryfallWebSearchUrl, renderQueryInspector } from "./research-ui.js";
import { buildDossierMazePathEntries, resolveMazeLaunchState } from "../assets/js/maze-handoff.js";

let currentMode = "ai";
let currentQuery = "";
let currentOrder = "name";
let currentUnique = "cards";
let currentDir = undefined;
let currentSearchApi = {};
let lastSmartInput = "";
let lastSmartQuery = "";
let allResults = [];
let displayPage = 0;
let hasMore = false;
let nextPageUrl = null;
let totalCards = 0;
let recentSearches = [];
let toastTimeout;
let selectAutoFilledInputOnFocus = false;
let cardStash = [];
let activeModalCard = null;
let modalReturnFocusEl = null;

const PAGE_SIZE = 24;
const DEFAULT_FORMAT = "commander";
const STASH_KEY = "vm_maze_card_stash_v1";
const ARCHSCRY_MAZE_HANDOFF_KEY = "vm_archscry_maze_handoff_v1";
const MODAL_FOCUS_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
const MODAL_BACKGROUND_SELECTOR = "[data-maze-modal-background]";
const ARCHSCRY_PATH_LABELS = {
  "commanders-that-fit": "Commanders That Fit",
  "support-cards": "Support Cards",
  "flavor-echoes": "Flavor Echoes",
  "weird-stretch-commanders": "Outside-Color Commander Stretch",
  ramp: "Ramp",
  draw: "Draw",
  interaction: "Interaction",
  lands: "Lands",
  "win-conditions": "Win Conditions"
};
const DOSSIER_COLOR_IDENTITIES = new Map([
  ["WHITE", "w"],
  ["BLUE", "u"],
  ["BLACK", "b"],
  ["RED", "r"],
  ["GREEN", "g"],
  ["AZORIUS", "wu"],
  ["DIMIR", "ub"],
  ["RAKDOS", "br"],
  ["GRUUL", "rg"],
  ["SELESNYA", "wg"],
  ["ORZHOV", "wb"],
  ["IZZET", "ur"],
  ["GOLGARI", "bg"],
  ["SIMIC", "ug"],
  ["BOROS", "wr"],
  ["LOREHOLD", "wr"],
  ["PRISMARI", "ur"],
  ["QUANDRIX", "ug"],
  ["SILVERQUILL", "wb"],
  ["WITHERBLOOM", "bg"]
]);
const STASH_SECTIONS = [
  { id: "commander", label: "Commander Ideas", exportHeading: "Commander" },
  { id: "support", label: "Cards That Support This Shape", exportHeading: "Deck" },
  { id: "maybe", label: "Maybe / Curious Finds", exportHeading: "Deck" }
];

const bFilters = {
  colors: [],
  colorOp: "c",
  types: [],
  format: DEFAULT_FORMAT,
  keywords: [],
  cmcMin: "",
  cmcMax: "",
  rarities: []
};

const MODE_CONTENT = {
  ai: {
    label: "Plain reading open",
    copy: "Describe the card you want in human language. Maze will translate the intent into Scryfall syntax before searching."
  },
  raw: {
    label: "Operator syntax active",
    copy: "Write exact Scryfall operators. Maze will preserve the syntax, normalize small glue words when needed, and send the query directly."
  },
  builder: {
    label: "Visual builder active",
    copy: "Build constraints with controls instead of memorizing operators. The generated syntax stays visible as you refine the search."
  }
};

const QUICK_SEARCHES = [
  { label: "Commander staples", hint: "by EDHREC rank", q: "f:commander" },
  { label: "Best counterspells", hint: "instant speed", q: "t:instant o:\"counter target spell\"" },
  { label: "Board wipes", hint: "commander legal", q: "(o:\"destroy all creatures\" OR o:\"exile all creatures\") f:commander" },
  { label: "Efficient removal", hint: "2 mana or less", q: "(t:instant OR t:sorcery) (o:\"destroy target creature\" OR o:\"exile target creature\") mv<=2" },
  { label: "Mana dorks", hint: "1-mana creatures", q: "t:creature o:\"add {\" mv=1 f:commander" },
  { label: "Ramp spells", hint: "land search", q: "t:sorcery o:\"search your library for a basic land\" f:commander mv<=4" },
  { label: "Card draw spells", hint: "instants <= 3", q: "t:instant o:draw -o:\"target player\" mv<=3 f:modern" },
  { label: "Hexproof threats", hint: "hard to remove", q: "kw:hexproof t:creature f:modern" },
  { label: "Free/uncounterable", hint: "without paying", q: "o:\"without paying its mana cost\"" },
  { label: "ETB draw creatures", hint: "value bodies", q: "t:creature o:enters o:draw f:commander" },
  { label: "Indestructible finishers", hint: "hard to kill", q: "kw:indestructible t:creature mv>=4 f:commander" },
  { label: "Budget tutor", hint: "paper price", q: "o:\"search your library\" f:commander usd<=2" }
];

const DISCOVERY_PATHS = [
  { label: "Commander entry points", hint: "legal legends", q: "f:commander t:legendary t:creature" },
  { label: "Flavor-rich cards", hint: "story moments", q: "has:flavor f:commander" },
  { label: "Graveyard engines", hint: "recursion and value", q: "f:commander (o:graveyard OR o:\"return target\" OR o:dies)" },
  { label: "Token pressure", hint: "wide boards", q: "f:commander (o:\"create\" o:\"token\" OR o:\"creatures you control get\")" },
  { label: "Strange legends", hint: "offbeat commanders", q: "f:commander t:legendary t:creature (o:\"at the beginning\" OR o:\"whenever you\")" }
];

const COLOR_LABELS = [
  { c: "W", label: "White", q: "c:w" },
  { c: "U", label: "Blue", q: "c:u" },
  { c: "B", label: "Black", q: "c:b" },
  { c: "R", label: "Red", q: "c:r" },
  { c: "G", label: "Green", q: "c:g" },
  { c: "WU", label: "Azorius", q: "id<=wu" },
  { c: "UB", label: "Dimir", q: "id<=ub" },
  { c: "BR", label: "Rakdos", q: "id<=br" },
  { c: "RG", label: "Gruul", q: "id<=rg" },
  { c: "WG", label: "Selesnya", q: "id<=gw" },
  { c: "WB", label: "Orzhov", q: "id<=wb" },
  { c: "UR", label: "Izzet", q: "id<=ur" },
  { c: "BG", label: "Golgari", q: "id<=bg" },
  { c: "UG", label: "Simic", q: "id<=gu" },
  { c: "WR", label: "Boros", q: "id<=wr" }
];

const LEGACY_KEYWORDS = [
  "cascade", "convoke", "cycling", "deathtouch", "defender", "double strike",
  "equip", "escape", "explore", "first strike", "flash", "flying", "haste",
  "hexproof", "indestructible", "investigate", "kicker", "landfall", "lifelink",
  "menace", "morph", "proliferate", "protection", "prowess", "reach", "scry",
  "shroud", "surveil", "trample", "vigilance", "ward"
].sort();
let keywordVocabulary = [...LEGACY_KEYWORDS];

const TYPES = ["Creature", "Instant", "Sorcery", "Enchantment", "Artifact", "Planeswalker", "Land", "Battle"];
const RARITIES = [{ v: "c", l: "Common" }, { v: "u", l: "Uncommon" }, { v: "r", l: "Rare" }, { v: "m", l: "Mythic" }];
const MODE_IDS = ["ai", "raw", "builder"];

/**
 * Normalizes textarea whitespace into a Scryfall-safe single-line query.
 * @param {string} value - Raw textarea value.
 * @returns {string} Normalized query/input text.
 */
function normalizeSearchInputValue(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
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

function applyDataset(node, dataset = {}) {
  Object.entries(dataset).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    node.dataset[key] = String(value);
  });
  return node;
}

function appendContent(node, ...items) {
  items.forEach((item) => {
    if (item === undefined || item === null) return;
    if (typeof item === "string") {
      if (typeof document.createTextNode === "function") {
        node.appendChild(document.createTextNode(item));
      } else if ("textContent" in node) {
        node.textContent += item;
      }
      return;
    }
    node.appendChild(item);
  });
  return node;
}

function isDomNode(value) {
  return Boolean(value && typeof value === "object" && ("nodeType" in value || "tagName" in value));
}

function createActionButton({
  className = "",
  text = "",
  action = "",
  dataset = {},
  title = "",
  ariaLabel = "",
  type = "button"
} = {}) {
  const button = document.createElement("button");
  button.type = type;
  if (className) button.className = className;
  if (action) button.dataset.action = action;
  applyDataset(button, dataset);
  if (title) button.title = title;
  if (ariaLabel) button.setAttribute("aria-label", ariaLabel);
  button.textContent = text;
  return button;
}

function setAriaPressed(node, active) {
  if (node && typeof node.setAttribute === "function") {
    node.setAttribute("aria-pressed", String(active));
  }
}

function createLink({
  className = "",
  href = "#",
  text = "",
  target = "",
  rel = "",
  title = ""
} = {}) {
  const link = document.createElement("a");
  if (className) link.className = className;
  link.href = href;
  link.textContent = text;
  if (target) link.target = target;
  if (rel) link.rel = rel;
  if (title) link.title = title;
  return link;
}

function createCardPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.style.aspectRatio = "63/88";
  placeholder.style.background = "var(--bg3)";
  placeholder.style.borderRadius = "4.5%";
  return placeholder;
}

function appendTextWithBreaks(node, text) {
  String(text || "").split("\n").forEach((line, index) => {
    if (index > 0) node.appendChild(document.createElement("br"));
    node.appendChild(document.createTextNode(line));
  });
}

function createMetaRow(label, value) {
  const row = document.createElement("div");
  row.className = "m-meta-row";
  const key = document.createElement("span");
  key.className = "m-meta-k";
  key.textContent = label;
  const valueNode = document.createElement("span");
  valueNode.className = "m-meta-v";
  if (isDomNode(value)) valueNode.appendChild(value);
  else valueNode.textContent = String(value ?? "-");
  appendContent(row, key, valueNode);
  return row;
}

function createManaCostNodes(cost) {
  const fragment = document.createDocumentFragment();
  parseManaSymbols(cost).forEach((symbol) => {
    const chip = document.createElement("span");
    chip.className = `mana-symbol ${getManaSymbolClass(symbol)}`;
    const label = getManaSymbolLabel(symbol);
    chip.title = label;
    chip.setAttribute("aria-label", label);
    chip.textContent = symbol;
    fragment.appendChild(chip);
  });
  return fragment;
}

function getModalElements() {
  return {
    backdrop: document.getElementById("modal-bg"),
    wrap: document.getElementById("modal-wrap"),
    inner: document.getElementById("modal-inner"),
    close: document.getElementById("modal-close")
  };
}

function isModalOpen() {
  const { backdrop } = getModalElements();
  return Boolean(backdrop && !backdrop.classList.contains("hidden"));
}

function setModalBackgroundInert(isInert) {
  document.querySelectorAll(MODAL_BACKGROUND_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (isInert) {
      node.setAttribute("inert", "");
      node.setAttribute("aria-hidden", "true");
    } else {
      node.removeAttribute("inert");
      node.removeAttribute("aria-hidden");
    }
  });
}

function getModalFocusableElements() {
  const { wrap } = getModalElements();
  if (!wrap) return [];
  return Array.from(wrap.querySelectorAll(MODAL_FOCUS_SELECTOR)).filter((node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (node.hasAttribute("hidden")) return false;
    return node.offsetParent !== null || node === document.activeElement;
  });
}

function focusModalEntry() {
  const { wrap } = getModalElements();
  const [firstFocusable] = getModalFocusableElements();
  (firstFocusable || wrap)?.focus();
}

function trapModalFocus(event) {
  const focusable = getModalFocusableElements();
  const { wrap } = getModalElements();
  if (!focusable.length) {
    event.preventDefault();
    wrap?.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/**
 * Loads the checked-in parser seed so Smart Search uses the curated ruleset.
 */
async function initializeParserDictionary() {
  try {
    const dictionary = await loadDictionaryFromSeedUrl("research/scryfall-parser-seed-2026.json");
    setScryfallDictionary(dictionary);
    setKeywordVocabulary(dictionary);
  } catch (error) {
    console.warn("Parser seed unavailable; using built-in parser dictionary.", error);
    setKeywordVocabulary();
  }
}

/**
 * Refreshes Loom keyword suggestions from local parser vocabulary while preserving legacy coverage.
 * @param {object} [dictionary] - Seed-expanded parser dictionary.
 */
function setKeywordVocabulary(dictionary) {
  const derivedKeywords = getKeywordVocabularyFromDictionary(dictionary);
  const missingLegacy = dictionary
    ? LEGACY_KEYWORDS.filter((keyword) => !derivedKeywords.includes(keyword))
    : [];
  if (missingLegacy.length) {
    console.warn(`Parser keyword vocabulary missing legacy suggestions: ${missingLegacy.join(", ")}`);
  }
  keywordVocabulary = [...new Set([...derivedKeywords, ...LEGACY_KEYWORDS])].sort((a, b) => a.localeCompare(b));
}

/**
 * Builds Loom keyword suggestions from the loaded parser dictionary.
 * Kept local to avoid making Maze boot depend on a newly added named export
 * when a browser still has an older dictionary module in cache.
 * @param {object} [dictionary] - Seed-expanded parser dictionary.
 * @returns {string[]} Sorted keyword vocabulary.
 */
function getKeywordVocabularyFromDictionary(dictionary) {
  const terms = new Set();
  Object.entries(dictionary?.keywords || {}).forEach(([trigger, output]) => {
    addKeywordVocabularyTerm(terms, trigger);
    extractKeywordVocabularyTerms(output).forEach((term) => addKeywordVocabularyTerm(terms, term));
  });
  return [...terms].sort((a, b) => a.localeCompare(b));
}

/**
 * Adds a normalized keyword suggestion term.
 * @param {Set<string>} terms - Keyword vocabulary being collected.
 * @param {string} value - Raw trigger or Scryfall output term.
 */
function addKeywordVocabularyTerm(terms, value) {
  const clean = String(value || "")
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9+\/ -]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["']|["']$/g, "");
  if (clean) terms.add(clean);
}

/**
 * Extracts canonical keyword names from Scryfall keyword filters.
 * @param {string} output - Scryfall query fragment.
 * @returns {string[]} Keyword terms.
 */
function extractKeywordVocabularyTerms(output) {
  const pattern = /\bkw:(?:"([^"]+)"|'([^']+)'|([^\s()]+))/gi;
  const terms = [];
  let match;
  while ((match = pattern.exec(String(output || "")))) {
    const term = match[1] || match[2] || match[3] || "";
    if (term && !/[<>=]/.test(term)) terms.push(term);
  }
  return terms;
}

/**
 * Boots the Research Archives page after the shell markup is ready.
 */
async function initializeResearchArchives() {
  if (typeof vm_resumeSession !== "undefined") await vm_resumeSession();
  await initializeParserDictionary();

  const username = (typeof VM_SESSION !== "undefined") ? VM_SESSION.username : null;
  const badge = document.getElementById("r-user-badge");
  if (username && badge) {
    badge.textContent = username;
    badge.style.display = "";
  }

  const urlParams = new URLSearchParams(location.search);
  initializeArchscryMazeHandoff(urlParams);
  buildQuickSearches();
  buildDiscoveryPaths();
  buildReadingPaths();
  cardStash = loadStash();
  renderStash();
  buildColorGrid();
  buildTypeChecks();
  buildRarityChecks();
  initializeDefaultFormatControls();
  bindMazeControls();
  bindSearchInputSelectOnFocus();
  setMode("ai");
  updateSearchActions();

  const launch = resolveMazeLaunchState(urlParams, readArchscryMazeHandoff() || {});
  if (launch.from === "archscry" && launch.operatorQuery) {
    const input = document.getElementById("search-input");
    input.value = launch.plainReadingQuery || launch.operatorQuery;
    lastSmartInput = input.value;
    lastSmartQuery = launch.operatorQuery;
    setMode("ai");
    triggerSearch(launch.operatorQuery, {
      order: urlParams.get("order") || currentOrder,
      unique: urlParams.get("unique") || currentUnique,
      dir: normalizeSortDirection(urlParams.get("dir")) || currentDir
    });
  } else if (launch.urlQ) {
    document.getElementById("search-input").value = launch.urlQ;
    setMode("raw");
    triggerSearch(launch.urlQ, {
      order: urlParams.get("order") || currentOrder,
      unique: urlParams.get("unique") || currentUnique,
      dir: normalizeSortDirection(urlParams.get("dir")) || currentDir
    });
  }
}

/**
 * Switches between Smart Search, raw Scryfall syntax, and Visual Builder.
 * @param {string} mode - Search mode id.
 */
function setMode(mode) {
  const previousMode = currentMode;
  currentMode = mode;
  document.body.dataset.mazeMode = mode;
  MODE_IDS.forEach((id) => {
    const btn = document.getElementById(`mode-${id}`);
    if (!btn) return;
    btn.classList.toggle("on", id === mode);
    btn.classList.remove("teal-mode");
    setAriaPressed(btn, id === mode);
  });

  const input = document.getElementById("search-input");
  const icon = document.getElementById("search-icon");
  const builder = document.getElementById("builder-panel");
  if (!input || !icon || !builder) return;
  updateModeContent(mode);
  if (mode === "ai") {
    input.className = "s-input";
    input.placeholder = "e.g. red and black orcs, green haste, blue removal";
    icon.textContent = "*";
    icon.style.color = "";
    builder.classList.add("hidden");
  } else if (mode === "raw") {
    input.className = "s-input mono";
    input.placeholder = "e.g. c:r kw:haste mv<=3 f:modern";
    icon.textContent = ">";
    icon.style.color = "var(--maze-gold-2)";
    document.getElementById("mode-raw").classList.add("teal-mode");
    builder.classList.add("hidden");
  } else {
    input.className = "s-input mono";
    input.placeholder = "Visual filters generate syntax here";
    icon.textContent = "=";
    icon.style.color = "var(--maze-gold-2)";
    document.getElementById("mode-builder").classList.add("teal-mode");
    builder.classList.remove("hidden");
    rebuildFromFilters();
  }

  syncInputForModeSwitch(input, previousMode, mode);
}

function updateModeContent(mode) {
  const content = MODE_CONTENT[mode] || MODE_CONTENT.ai;
  const contextLabel = document.getElementById("maze-mode-context-label");
  const contextCopy = document.getElementById("maze-mode-context-copy");
  if (contextLabel) contextLabel.textContent = content.label;
  if (contextCopy) contextCopy.textContent = content.copy;
}

/**
 * Keeps the search field aligned when switching between human and syntax modes.
 * @param {HTMLInputElement} input - Search input element.
 * @param {string} previousMode - Mode being left.
 * @param {string} nextMode - Mode being entered.
 */
function syncInputForModeSwitch(input, previousMode, nextMode) {
  if (!input) return;
  const resolved = resolveModeInputValue({
    previousMode,
    nextMode,
    currentValue: input.value,
    lastSmartInput,
    lastSmartQuery
  });
  if (!resolved.changed) return;
  const previousValue = input.value.trim();
  input.value = resolved.value;
  if (previousMode === "raw" && nextMode === "ai") {
    lastSmartInput = resolved.value;
    lastSmartQuery = previousValue;
  }
  if (nextMode === "raw") selectAutoFilledInputOnFocus = false;
}

/**
 * Selects quick-search generated text the next time the search input receives focus.
 */
function bindSearchInputSelectOnFocus() {
  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("focus", () => {
    if (!selectAutoFilledInputOnFocus) return;
    requestAnimationFrame(() => input.select());
    selectAutoFilledInputOnFocus = false;
  });

  input.addEventListener("input", () => {
    selectAutoFilledInputOnFocus = false;
  });
}

/**
 * Runs the active search mode through the Maze query contract adapter.
 */
async function doSearch() {
  const rawInput = normalizeSearchInputValue(document.getElementById("search-input")?.value || "");
  if (!rawInput && currentMode !== "builder") return;

  setLoading(true);
  clearError();
  displayPage = 0;
  allResults = [];

  try {
    const queryResult = resolveMazeQueryRequest(buildMazeQueryRequest(rawInput));
    const query = queryResult.query;
    const parserResult = queryResult.adapterDiagnostics || null;
    const reason = currentMode === "builder" ? "" : queryResult.reason || "";

    if (currentMode === "builder" && !query.trim()) {
      showError("Add at least one filter before searching.");
      setLoading(false);
      return;
    }

    if (queryResult.api?.order) currentOrder = queryResult.api.order;
    if (queryResult.api?.unique) currentUnique = queryResult.api.unique;
    if (queryResult.api && Object.hasOwn(queryResult.api, "dir")) {
      currentDir = normalizeSortDirection(queryResult.api.dir);
    }

    if (currentMode === "ai") {
      lastSmartInput = rawInput;
      lastSmartQuery = query;

      if (queryResult.parserMode === "exact_name") {
        currentQuery = query;
        currentSearchApi = queryResult.api || { endpoint: "/cards/search", unique: currentUnique, order: currentOrder };
        updateSearchActions(query, currentSearchApi);
        showQueryInspector(query, reason, parserResult, null, { inputValue: rawInput });
        const card = await ResearchSearch.scryfallExact(query);
        setLoading(false);
        hideState();
        if (card.error || card.object === "error") {
          showError(card.details || "Card not found");
          return;
        }
        openModal(card);
        return;
      }
    } else if (currentMode === "raw") {
      if (queryResult.normalized) document.getElementById("search-input").value = query;
      if (query !== lastSmartQuery) lastSmartQuery = "";
    }

    await triggerSearch(query, {
      reason,
      api: queryResult.api,
      parserResult,
      inputValue: rawInput,
      normalized: currentMode === "raw" && queryResult.normalized
    });
  } catch (error) {
    showError(`Search failed: ${error.message}`);
  }

  setLoading(false);
}

function buildMazeQueryRequest(rawInput) {
  const request = {
    mode: currentMode,
    origin: "maze",
    input: rawInput,
    options: {
      format: getActiveFormatFilter(),
      order: currentOrder,
      unique: currentUnique,
      dir: currentDir
    }
  };
  if (currentMode === "builder") request.builderFilters = bFilters;
  return request;
}

/**
 * Executes a Scryfall search and renders the first page of results.
 * @param {string} query - Scryfall query syntax.
 * @param {object} opts - Search metadata and UI diagnostics.
 */
async function triggerSearch(query, opts = {}) {
  const {
    reason = "",
    order = currentOrder,
    unique = currentUnique,
    dir = currentDir,
    api = null,
    parserResult = null,
    inputValue = "",
    normalized = false
  } = opts;
  const searchOrder = parserResult?.api?.order || api?.order || order || "name";
  const searchUnique = parserResult?.api?.unique || api?.unique || unique || "cards";
  const searchDir = normalizeSortDirection(parserResult?.api?.dir || api?.dir || dir);
  const searchApi = { endpoint: "/cards/search", unique: searchUnique, order: searchOrder };
  if (searchDir) searchApi.dir = searchDir;
  currentQuery = query;
  currentOrder = searchOrder;
  currentUnique = searchUnique;
  currentDir = searchDir;
  currentSearchApi = searchApi;
  updateSearchActions(query, searchApi);
  addRecent(query);
  showQueryInspector(query, reason, parserResult, searchApi, { inputValue, normalized });

  const data = await ResearchSearch.scryfallSearch(query, { order: searchOrder, unique: searchUnique, dir: searchDir });
  if (data.object === "error") {
    if (isNoResultsResponse(data)) {
      await showNoResultsState(query);
      return;
    }
    showError(data.details || data.warnings?.join("; ") || "Scryfall returned an error.");
    return;
  }

  totalCards = data.total_cards || 0;
  allResults = data.data || [];
  hasMore = data.has_more;
  nextPageUrl = data.next_page || null;
  renderResults();
}

/**
 * Loads the next client or Scryfall result page.
 */
async function loadMore() {
  if (displayPage < Math.ceil(allResults.length / PAGE_SIZE) - 1) {
    displayPage++;
    renderResults(true);
    return;
  }

  if (hasMore && displayPage >= Math.ceil(allResults.length / PAGE_SIZE) - 1) {
    const moreButton = document.getElementById("btn-more");
    const previousText = moreButton?.textContent || "Load More";
    let loaded = false;
    try {
      if (moreButton) {
        moreButton.disabled = true;
        moreButton.textContent = "Loading...";
      }
      const data = await ResearchSearch.scryfallSearch(currentQuery, {
        page: nextPageUrl,
        order: currentOrder,
        unique: currentUnique,
        dir: currentDir
      });
      if (data?.object === "error") throw new Error(data.details || "Scryfall returned an error.");
      if (!Array.isArray(data?.data)) throw new Error("Scryfall returned an unexpected page.");
      allResults = [...allResults, ...data.data];
      hasMore = data.has_more;
      nextPageUrl = data.next_page || null;
      displayPage++;
      loaded = true;
      renderResults(true);
    } catch (error) {
      showError(`Could not load more results: ${error.message}`);
      showToast("Load more failed");
    } finally {
      if (!loaded && moreButton) {
        moreButton.disabled = false;
        moreButton.textContent = previousText;
      }
    }
  }
}

/**
 * Renders the visible card grid and footer paging state.
 * @param {boolean} append - Whether to append to current grid content.
 */
function renderResults(append = false) {
  hideState();
  document.getElementById("results-header").classList.remove("hidden");
  document.getElementById("card-grid").classList.remove("hidden");
  document.getElementById("results-footer").classList.remove("hidden");

  const start = displayPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageCards = allResults.slice(start, end);
  const grid = document.getElementById("card-grid");
  if (!append) clearNode(grid);

  const count = document.getElementById("res-count");
  clearNode(count);
  appendContent(count, "Showing ");
  const showingStrong = document.createElement("strong");
  showingStrong.textContent = String(Math.min((displayPage + 1) * PAGE_SIZE, allResults.length));
  count.appendChild(showingStrong);
  appendContent(count, " of ");
  const totalStrong = document.createElement("strong");
  totalStrong.textContent = totalCards.toLocaleString();
  count.appendChild(totalStrong);
  appendContent(count, " cards");

  pageCards.forEach((card) => grid.appendChild(makeCardEl(card)));

  const showing = Math.min((displayPage + 1) * PAGE_SIZE, allResults.length);
  const hasClientMore = allResults.length > showing;
  const canLoad = hasClientMore || hasMore;
  document.getElementById("btn-more").disabled = !canLoad;
  document.getElementById("more-count").textContent = canLoad
    ? `${Math.max(totalCards - showing, 0)} more available`
    : `All ${allResults.length} cards loaded`;
}

/**
 * Builds one clickable card-grid item from Scryfall card data.
 * @param {object} card - Scryfall card object.
 * @returns {HTMLElement} Card grid element.
 */
function makeCardEl(card) {
  const wrap = document.createElement("div");
  wrap.className = "card-item";
  wrap.dataset.action = "open-card";
  wrap.dataset.stashKey = cardStashKey(card);
  wrap.__cardData = card;
  wrap.tabIndex = 0;
  wrap.setAttribute("role", "button");
  wrap.setAttribute("aria-label", `Open details for ${card.name || "this card"}`);
  const img = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;
  if (img) {
    const image = document.createElement("img");
    image.src = img;
    image.alt = card.name || "Card";
    image.loading = "lazy";
    wrap.appendChild(image);
  } else {
    const skeleton = document.createElement("div");
    skeleton.className = "card-skeleton";
    wrap.appendChild(skeleton);
  }

  const name = document.createElement("div");
  name.className = "card-item-name";
  name.textContent = card.name || "Unknown card";
  wrap.appendChild(name);

  const stashed = isCardStashed(card);
  const stashButton = createActionButton({
    className: `card-stash-btn${stashed ? " on" : ""}`,
    text: stashed ? "✓-" : "+",
    action: "toggle-card-stash",
    title: stashed ? "Remove from stash" : "Add to stash",
    ariaLabel: stashed ? "Remove from stash" : "Add to stash"
  });
  stashButton.__cardData = card;
  wrap.appendChild(stashButton);
  wrap.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openModal(card, wrap);
  });
  return wrap;
}

/**
 * Opens the full card detail modal for a Scryfall result.
 * @param {object} card - Scryfall card object.
 */
function openModal(card, opener = document.activeElement) {
  activeModalCard = card;
  modalReturnFocusEl = opener instanceof HTMLElement ? opener : (document.activeElement instanceof HTMLElement ? document.activeElement : null);
  const faces = card.card_faces;
  const oracle = (card.oracle_text || faces?.map((face) => `${face.name}\n${face.oracle_text || ""}`).join("\n\n--------\n\n") || "").trim();
  const flavor = card.flavor_text || faces?.[0]?.flavor_text || "";
  const rarity = (card.rarity || "-").charAt(0).toUpperCase() + (card.rarity || "").slice(1);
  const legalities = card.legalities || {};
  const primaryType = (card.type_line || "").split(" - ")[0].split(" ").pop()?.toLowerCase() || "card";
  const similarQ = `id<=${(card.color_identity || []).join("").toLowerCase() || "c"} t:${primaryType}`;
  const { backdrop, inner } = getModalElements();
  if (!backdrop || !inner) return;

  clearNode(inner);

  const imageCol = document.createElement("div");
  imageCol.className = "modal-img-col";
  imageCol.appendChild(createModalImageContent(card));

  const detailCol = document.createElement("div");
  detailCol.className = "modal-detail-col";

  const name = document.createElement("div");
  name.className = "m-name";
  name.id = "modal-title";
  name.textContent = card.name || "Unknown card";
  detailCol.appendChild(name);

  const manaCost = card.mana_cost || faces?.[0]?.mana_cost || "";
  if (manaCost) {
    const cost = document.createElement("div");
    cost.className = "m-cost";
    cost.setAttribute("aria-label", `Mana cost ${manaCost}`);
    cost.appendChild(createManaCostNodes(manaCost));
    detailCol.appendChild(cost);
  }

  const type = document.createElement("div");
  type.className = "m-type";
  type.textContent = card.type_line || "";
  detailCol.appendChild(type);

  if (oracle) {
    const oracleNode = document.createElement("div");
    oracleNode.className = "m-oracle";
    appendTextWithBreaks(oracleNode, oracle);
    detailCol.appendChild(oracleNode);
  }

  if (flavor) {
    const flavorNode = document.createElement("div");
    flavorNode.className = "m-flavor";
    flavorNode.textContent = flavor;
    detailCol.appendChild(flavorNode);
  }

  const meta = document.createElement("div");
  meta.className = "m-meta";
  meta.appendChild(createMetaRow("Set", `${card.set_name || "-"} (${String(card.set || "").toUpperCase()})`));
  meta.appendChild(createMetaRow("Rarity", rarity));
  meta.appendChild(createMetaRow("Mana Value", card.cmc ?? "-"));
  const priceValue = document.createElement("span");
  if (card.prices?.usd) {
    priceValue.className = "m-price";
    priceValue.textContent = `$${card.prices.usd}`;
  } else {
    priceValue.style.color = "var(--text-muted)";
    priceValue.textContent = "-";
  }
  meta.appendChild(createMetaRow("Paper Price", priceValue));
  detailCol.appendChild(meta);

  const legalFormats = ["commander", "modern", "pioneer", "standard", "legacy", "pauper"]
    .filter((format) => legalities[format] === "legal");
  if (legalFormats.length) {
    const badges = document.createElement("div");
    badges.style.marginBottom = "1rem";
    legalFormats.forEach((format) => {
      const badge = document.createElement("span");
      badge.style.cssText = "font-size:0.72rem;padding:0.15rem 0.5rem;border:1px solid var(--border);color:var(--text-muted);margin-right:3px";
      badge.textContent = format;
      badges.appendChild(badge);
    });
    detailCol.appendChild(badges);
  }

  const actions = document.createElement("div");
  actions.className = "m-actions";
  actions.appendChild(createLink({
    className: "m-btn m-btn-gold",
    href: card.scryfall_uri || "#",
    text: "View on Scryfall",
    target: "_blank",
    rel: "noopener"
  }));
  actions.appendChild(createActionButton({
    className: "m-btn m-btn-teal",
    text: "Find Similar",
    action: "quick-search",
    dataset: { query: similarQ }
  }));
  if (card.prices?.usd) {
    actions.appendChild(createLink({
      className: "m-btn m-btn-gold",
      href: `https://www.tcgplayer.com/search/magic/product?q=${encodeURIComponent(card.name || "")}`,
      text: "TCGPlayer",
      target: "_blank",
      rel: "noopener"
    }));
  }
  detailCol.appendChild(actions);

  const stashActions = document.createElement("div");
  stashActions.className = "m-stash-actions";
  STASH_SECTIONS.forEach((section) => {
    stashActions.appendChild(createActionButton({
      className: "m-btn m-btn-teal",
      text: section.label,
      action: "modal-stash",
      dataset: { section: section.id }
    }));
  });
  detailCol.appendChild(stashActions);

  appendContent(inner, imageCol, detailCol);
  backdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setModalBackgroundInert(true);
  requestAnimationFrame(() => focusModalEntry());
}

function createModalImageContent(card) {
  if (card.card_faces && !card.image_uris) {
    const wrap = document.createElement("div");
    wrap.className = "modal-img-dfc";
    card.card_faces.forEach((face) => {
      if (face.image_uris?.normal) {
        const image = document.createElement("img");
        image.className = "modal-img";
        image.src = face.image_uris.normal;
        image.alt = face.name || card.name || "Card face";
        image.loading = "lazy";
        image.tabIndex = 0;
        wrap.appendChild(image);
      } else {
        wrap.appendChild(createCardPlaceholder());
      }
    });
    return wrap;
  }
  if (card.image_uris?.normal) {
    const image = document.createElement("img");
    image.className = "modal-img";
    image.src = card.image_uris.normal;
    image.alt = card.name || "Card";
    image.loading = "lazy";
    image.tabIndex = 0;
    return image;
  }
  return createCardPlaceholder();
}

/**
 * Extracts mana symbol tokens from Scryfall brace notation.
 * @param {string} cost - Raw mana cost.
 * @returns {string[]} Mana symbols without braces.
 */
function parseManaSymbols(cost) {
  return [...String(cost || "").matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
}

/**
 * Chooses a visual class for a mana symbol.
 * @param {string} symbol - Mana symbol without braces.
 * @returns {string} CSS class name.
 */
function getManaSymbolClass(symbol) {
  const normalized = String(symbol || "").toUpperCase();
  const color = ["W", "U", "B", "R", "G"].find((item) => normalized.includes(item));
  if (color) return `mana-${color}${normalized.includes("/") ? " mana-half" : ""}`;
  if (/^\d+$/.test(normalized)) return "mana-generic";
  if (["X", "Y", "Z", "C", "P", "S"].includes(normalized)) return `mana-${normalized}`;
  return "mana-generic";
}

/**
 * Builds a human-readable label for a mana symbol chip.
 * @param {string} symbol - Mana symbol without braces.
 * @returns {string} Accessible symbol label.
 */
function getManaSymbolLabel(symbol) {
  const names = { W: "white", U: "blue", B: "black", R: "red", G: "green", C: "colorless", X: "X", Y: "Y", Z: "Z", P: "phyrexian", S: "snow" };
  const normalized = String(symbol || "").toUpperCase();
  if (/^\d+$/.test(normalized)) return `${normalized} generic mana`;
  return normalized.split("/").map((part) => names[part] || part).join(" or ") + " mana";
}

/**
 * Closes the card detail modal.
 */
function closeModal() {
  const { backdrop, inner } = getModalElements();
  backdrop?.classList.add("hidden");
  clearNode(inner);
  document.body.style.overflow = "";
  setModalBackgroundInert(false);
  activeModalCard = null;
  const returnFocus = modalReturnFocusEl;
  modalReturnFocusEl = null;
  returnFocus?.focus?.();
}

/**
 * Builds Visual Builder type filter chips.
 */
function buildTypeChecks() {
  const el = document.getElementById("type-checks");
  if (!el) return;
  clearNode(el);
  TYPES.forEach((type) => {
    const value = type.toLowerCase();
    const button = createActionButton({
      className: "cb-label",
      text: type,
      action: "toggle-type",
      dataset: { value }
    });
    button.id = `cb-type-${value}`;
    button.classList.toggle("checked", bFilters.types.includes(value));
    setAriaPressed(button, bFilters.types.includes(value));
    el.appendChild(button);
  });
}

/**
 * Builds Visual Builder rarity filter chips.
 */
function buildRarityChecks() {
  const el = document.getElementById("rarity-checks");
  if (!el) return;
  clearNode(el);
  RARITIES.forEach((rarity) => {
    const button = createActionButton({
      className: "cb-label",
      text: rarity.l,
      action: "toggle-rarity",
      dataset: { value: rarity.v }
    });
    button.id = `cb-rar-${rarity.v}`;
    button.classList.toggle("checked", bFilters.rarities.includes(rarity.v));
    setAriaPressed(button, bFilters.rarities.includes(rarity.v));
    el.appendChild(button);
  });
}

function initializeDefaultFormatControls() {
  bFilters.format = DEFAULT_FORMAT;
  const builderFormat = document.getElementById("bld-format");
  const sidebarFormat = document.getElementById("sb-format");
  if (builderFormat && !builderFormat.value) builderFormat.value = DEFAULT_FORMAT;
  if (sidebarFormat && !sidebarFormat.value) sidebarFormat.value = DEFAULT_FORMAT;
}

function stripFormatFilter(query) {
  return String(query || "")
    .replace(/(^|\s)(?:f|format):[a-z0-9_-]+\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getActiveFormatFilter() {
  return document.getElementById("sb-format")?.value || "";
}

function applySelectedFormatToQuery(query, opts = {}) {
  const useFormatDefault = opts.useFormatDefault !== false;
  const format = opts.format ?? (useFormatDefault ? getActiveFormatFilter() : "");
  return applyMazeFormatToQuery(query, { format, useFormatDefault });
}

function formatLabel(format) {
  if (!format) return "selected";
  return format.charAt(0).toUpperCase() + format.slice(1);
}

/**
 * Toggles one Visual Builder color pip.
 * @param {string} color - Color symbol.
 */
function toggleColor(color) {
  const index = bFilters.colors.indexOf(color);
  if (index >= 0) bFilters.colors.splice(index, 1);
  else bFilters.colors.push(color);
  document.querySelectorAll(".cpip").forEach((pip) => {
    const active = bFilters.colors.includes(pip.dataset.c);
    pip.classList.toggle("on", active);
    setAriaPressed(pip, active);
  });
  rebuildFromFilters();
}

/**
 * Toggles one Visual Builder type chip.
 * @param {string} value - Scryfall type value.
 * @param {HTMLElement} label - Clicked label element.
 */
function toggleType(value, label = document.getElementById(`cb-type-${value}`)) {
  const index = bFilters.types.indexOf(value);
  if (index >= 0) bFilters.types.splice(index, 1);
  else bFilters.types.push(value);
  const active = bFilters.types.includes(value);
  label.classList.toggle("checked", active);
  setAriaPressed(label, active);
  rebuildFromFilters();
}

/**
 * Toggles one Visual Builder rarity chip.
 * @param {string} value - Scryfall rarity value.
 * @param {HTMLElement} label - Clicked label element.
 */
function toggleRarity(value, label = document.getElementById(`cb-rar-${value}`)) {
  const index = bFilters.rarities.indexOf(value);
  if (index >= 0) bFilters.rarities.splice(index, 1);
  else bFilters.rarities.push(value);
  const active = bFilters.rarities.includes(value);
  label.classList.toggle("checked", active);
  setAriaPressed(label, active);
  rebuildFromFilters();
}

/**
 * Rebuilds the raw query field from Visual Builder state.
 */
function rebuildFromFilters() {
  bFilters.colorOp = document.getElementById("color-op")?.value || "c";
  bFilters.format = document.getElementById("bld-format")?.value || "";
  bFilters.cmcMin = document.getElementById("cmc-min")?.value || "";
  bFilters.cmcMax = document.getElementById("cmc-max")?.value || "";
  const query = buildFilterQuery();
  const input = document.getElementById("search-input");
  if (input) input.value = query;
  updateBuilderOutput(query);
}

/**
 * Converts Visual Builder state into Scryfall syntax.
 * @returns {string} Built query.
 */
function buildFilterQuery() {
  return buildVisualBuilderQuery(bFilters);
}

function updateBuilderOutput(query = buildFilterQuery()) {
  const queryEl = document.getElementById("builder-generated-query");
  const summaryEl = document.getElementById("builder-summary");
  if (queryEl) queryEl.textContent = query || "Select filters to build a query.";
  if (summaryEl) summaryEl.textContent = formatBuilderSummary();
}

function resetBuilderFilters() {
  bFilters.colors = [];
  bFilters.colorOp = "c";
  bFilters.types = [];
  bFilters.format = DEFAULT_FORMAT;
  bFilters.keywords = [];
  bFilters.cmcMin = "";
  bFilters.cmcMax = "";
  bFilters.rarities = [];

  const colorOp = document.getElementById("color-op");
  const builderFormat = document.getElementById("bld-format");
  const cmcMin = document.getElementById("cmc-min");
  const cmcMax = document.getElementById("cmc-max");
  const keywordInput = document.getElementById("kw-input");
  if (colorOp) colorOp.value = "c";
  if (builderFormat) builderFormat.value = DEFAULT_FORMAT;
  if (cmcMin) cmcMin.value = "";
  if (cmcMax) cmcMax.value = "";
  if (keywordInput) keywordInput.value = "";

  document.querySelectorAll(".cpip").forEach((pip) => {
    pip.classList.toggle("on", false);
    setAriaPressed(pip, false);
  });
  document.querySelectorAll(".cb-label").forEach((chip) => {
    chip.classList.toggle("checked", false);
    setAriaPressed(chip, false);
  });
  document.getElementById("kw-suggestions")?.classList.add("hidden");
  renderKwChips();
  rebuildFromFilters();
  setMode("builder");
  clearError();
  resetSearchResults();
  document.getElementById("query-inspector")?.classList.add("hidden");
  showToast("Loom reset");
}

function formatBuilderSummary() {
  const parts = [];
  if (bFilters.colors.length) {
    const colorMode = document.getElementById("color-op")?.selectedOptions?.[0]?.textContent || bFilters.colorOp;
    parts.push(`Colors: ${bFilters.colors.join("")} (${colorMode})`);
  }
  if (bFilters.types.length) parts.push(`Types: ${bFilters.types.join(", ")}`);
  if (bFilters.format) parts.push(`Format: ${bFilters.format}`);
  if (bFilters.rarities.length) parts.push(`Rarity: ${bFilters.rarities.join(", ")}`);
  if (bFilters.cmcMin || bFilters.cmcMax) {
    parts.push(`Mana value: ${bFilters.cmcMin || "0"} to ${bFilters.cmcMax || "any"}`);
  }
  if (bFilters.keywords.length) parts.push(`Keywords: ${bFilters.keywords.join(", ")}`);
  return parts.length ? parts.join(" | ") : "No visual filters selected yet.";
}

/**
 * Handles Enter in the keyword suggestion field.
 * @param {KeyboardEvent} event - Keyboard event.
 */
function handleKwKey(event) {
  if (event.key === "Enter" || event.key === ",") {
    event.preventDefault();
    const value = event.target.value.trim().toLowerCase();
    if (value) addKeyword(value);
  }
}

/**
 * Shows keyword autocomplete suggestions for the builder input.
 * @param {string} value - Current keyword input.
 */
function showKwSuggestions(value) {
  const input = String(value || "").trim().toLowerCase();
  const box = document.getElementById("kw-suggestions");
  if (!box) return;

  if (!input) {
    clearNode(box);
    box.classList.add("hidden");
    return;
  }

  const matches = keywordVocabulary
    .filter((keyword) => keyword.includes(input))
    .sort((a, b) => {
      const aPrefix = a.startsWith(input) ? 0 : 1;
      const bPrefix = b.startsWith(input) ? 0 : 1;
      return aPrefix - bPrefix || a.localeCompare(b);
    })
    .slice(0, 8);

  if (!matches.length) {
    clearNode(box);
    box.classList.add("hidden");
    return;
  }

  clearNode(box);
  matches.forEach((keyword) => {
    box.appendChild(createActionButton({
      className: "kw-sug",
      text: keyword,
      action: "add-keyword",
      dataset: { keyword }
    }));
  });
  box.classList.remove("hidden");
}

/**
 * Adds one or more keywords to the Visual Builder filter state.
 * @param {string} keyword - Keyword text to add.
 */
function addKeyword(keyword) {
  parseKeywordInput(keyword, keywordVocabulary).forEach((item) => {
    if (!bFilters.keywords.includes(item)) bFilters.keywords.push(item);
  });
  renderKwChips();
  rebuildFromFilters();
  document.getElementById("kw-input").value = "";
  document.getElementById("kw-suggestions").classList.add("hidden");
}

/**
 * Removes a keyword from the Visual Builder filter state.
 * @param {string} keyword - Keyword to remove.
 */
function removeKeyword(keyword) {
  bFilters.keywords = bFilters.keywords.filter((item) => item !== keyword);
  renderKwChips();
  rebuildFromFilters();
}

/**
 * Renders active keyword chips.
 */
function renderKwChips() {
  const chips = document.getElementById("kw-chips");
  if (!chips) return;
  clearNode(chips);
  bFilters.keywords.forEach((keyword) => {
    chips.appendChild(createActionButton({
      className: "kw-chip",
      text: `${keyword} x`,
      action: "remove-keyword",
      dataset: { keyword },
      ariaLabel: `Remove keyword ${keyword}`
    }));
  });
}

/**
 * Renders quick-search buttons in the sidebar.
 */
function buildQuickSearches() {
  const el = document.getElementById("quick-search-list");
  if (!el) return;
  clearNode(el);
  QUICK_SEARCHES.forEach((quickSearch) => {
    const button = createActionButton({
      className: "sb-btn",
      text: quickSearch.label,
      action: "quick-search",
      dataset: { query: quickSearch.q }
    });
    const hint = document.createElement("span");
    hint.textContent = quickSearch.hint;
    button.appendChild(hint);
    el.appendChild(button);
  });
}

/**
 * Renders general discovery paths for fresh Maze users.
 */
function buildDiscoveryPaths() {
  const el = document.getElementById("discovery-path-list");
  if (!el) return;
  clearNode(el);
  DISCOVERY_PATHS.forEach((path) => {
    const button = createActionButton({
      className: "sb-btn",
      text: path.label,
      action: "quick-search",
      dataset: { query: path.q }
    });
    const hint = document.createElement("span");
    hint.textContent = path.hint;
    button.appendChild(hint);
    el.appendChild(button);
  });
}

function readArchscryMazeHandoff() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ARCHSCRY_MAZE_HANDOFF_KEY) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_) {
    return null;
  }
}

function writeArchscryMazeHandoff(handoff) {
  try {
    localStorage.setItem(ARCHSCRY_MAZE_HANDOFF_KEY, JSON.stringify({
      ...handoff,
      updatedAt: new Date().toISOString()
    }));
  } catch (_) {}
}

function initializeArchscryMazeHandoff(urlParams) {
  if (urlParams.get("from") !== "archscry") {
    const existing = readArchscryMazeHandoff();
    if (existing?.returnUrl && !existing.returnBannerDismissed) {
      renderArchscryReturnBanner(existing);
    }
    return;
  }

  const existing = readArchscryMazeHandoff() || {};
  const readingId = urlParams.get("readingId") || existing.readingId || "";
  const fit = urlParams.get("fit") || existing.fit || "";
  const pathType = urlParams.get("pathType") || existing.pathType || "";
  const previousIdentity = [existing.readingId, existing.fit, existing.pathType].filter(Boolean).join(":");
  const nextIdentity = [readingId, fit, pathType].filter(Boolean).join(":");
  const handoff = {
    ...existing,
    from: "archscry",
    readingId,
    guild: urlParams.get("guild") || existing.guild || "",
    fit,
    factionName: urlParams.get("factionName") || existing.factionName || "",
    readingTitle: urlParams.get("readingTitle") || existing.readingTitle || "your Vox Mana reading",
    pathType,
    plainReadingQuery: urlParams.get("plainReadingQuery") || existing.plainReadingQuery || "",
    operatorQuery: urlParams.get("operatorQuery") || urlParams.get("q") || existing.operatorQuery || "",
    returnBannerDismissed: previousIdentity && previousIdentity === nextIdentity
      ? existing.returnBannerDismissed === true
      : false,
    returnUrl: urlParams.get("returnUrl") || existing.returnUrl || "../archscry/"
  };
  writeArchscryMazeHandoff(handoff);
  if (!handoff.returnBannerDismissed) {
    renderArchscryReturnBanner(handoff);
  }
}

function renderArchscryReturnBanner(handoff) {
  const banner = document.getElementById("maze-return-banner");
  const copy = document.getElementById("maze-return-copy");
  const link = document.getElementById("maze-return-link");
  if (!banner || !copy || !link || !handoff?.returnUrl) return;

  const title = handoff.readingTitle || "your Vox Mana reading";
  const fit = handoff.fit || handoff.guild || "";
  const factionName = handoff.factionName || handoff.guild || "your reading";
  const pathLabel = ARCHSCRY_PATH_LABELS[handoff.pathType] || "";
  const returnUrl = appendReturnUrlParams(handoff.returnUrl, {
    from: "maze",
    view: fit,
    readingId: handoff.readingId || "",
    mazeReturnUrl: `${location.pathname}${location.search}`
  });

  clearNode(copy);
  appendContent(copy, "Following ");
  const strong = document.createElement("strong");
  strong.textContent = factionName;
  copy.appendChild(strong);
  appendContent(copy, ` from ${title}`);
  if (pathLabel) appendContent(copy, ` through ${pathLabel}`);
  appendContent(copy, ".");
  link.href = returnUrl;
  link.textContent = `Return to My ${handoff.factionName || handoff.guild || "Reading"} Dossier`;
  banner.classList.add("is-visible");
}

function dismissArchscryReturnBanner() {
  const handoff = readArchscryMazeHandoff();
  if (handoff) {
    writeArchscryMazeHandoff({
      ...handoff,
      returnBannerDismissed: true
    });
  }
  document.getElementById("maze-return-banner")?.classList.remove("is-visible");
}

function appendReturnUrlParams(url, params) {
  const parsed = new URL(url, location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) parsed.searchParams.set(key, value);
  });
  if (parsed.protocol === "file:") {
    return parsed.toString();
  }
  return parsed.origin === location.origin
    ? `${parsed.pathname}${parsed.search}${parsed.hash}`
    : parsed.toString();
}

/**
 * Renders optional placement-shaped searches when Archscry data exists locally.
 */
function buildReadingPaths() {
  const section = document.getElementById("reading-path-section");
  const list = document.getElementById("reading-path-list");
  if (!section || !list) return;

  const result = getStoredPlacementResult();
  const paths = result ? createReadingPaths(result) : [];
  if (!paths.length) {
    section.style.display = "none";
    clearNode(list);
    return;
  }

  section.style.display = "";
  clearNode(list);
  paths.forEach((path) => {
    const button = createActionButton({
      className: "sb-btn is-reading",
      text: path.label,
      action: "quick-search",
      dataset: {
        query: path.q,
        plainReadingQuery: path.plainReadingQuery
      }
    });
    const hint = document.createElement("span");
    hint.textContent = path.hint;
    button.appendChild(hint);
    list.appendChild(button);
  });
}

function getStoredPlacementResult() {
  const handoff = readArchscryMazeHandoff();
  const activeHandoffResult = activePlacementResultFromArchscryHandoff(handoff);
  if (activeHandoffResult?.faction || activeHandoffResult?.mana_scores) return activeHandoffResult;

  const sessionResult = (typeof VM_SESSION !== "undefined" && VM_SESSION.profile?.placementResult) ||
    (typeof VM_SESSION !== "undefined" && VM_SESSION.interviewResult) ||
    null;
  if (sessionResult?.faction || sessionResult?.mana_scores) return sessionResult;

  if (typeof vm_getCachedPlacementResult === "function") {
    const cached = vm_getCachedPlacementResult();
    if (cached?.faction || cached?.mana_scores) return cached;
  }

  try {
    if (handoff?.placementResult?.faction || handoff?.placementResult?.mana_scores) {
      return handoff.placementResult;
    }

    const raw = localStorage.getItem("vm_last_result") || localStorage.getItem("vm_placement_result");
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.placement_result || parsed;
  } catch (_) {
    return null;
  }
}

function activePlacementResultFromArchscryHandoff(handoff) {
  if (!handoff || typeof handoff !== "object") return null;
  const activeFaction = String(handoff.fit || handoff.guild || "").trim();
  if (!activeFaction) return null;

  const source = handoff.placementResult && typeof handoff.placementResult === "object"
    ? handoff.placementResult
    : {};
  const activeKey = activeFaction.toUpperCase();
  const activeName = String(handoff.factionName || source.faction_name || activeKey).trim() || activeKey;

  return {
    ...source,
    faction: activeKey,
    faction_name: activeName,
    evidence_trail: Array.isArray(source.evidence_trail) ? source.evidence_trail : [],
    decree: source.decree || handoff.readingTitle || ""
  };
}

function createReadingPaths(result) {
  const identity = colorIdentityFromPlacement(result);
  if (!identity) return [];
  const signals = readingSearchSignals(result);
  return buildDossierMazePathEntries({
    identity,
    factionName: result?.faction_name || result?.faction || "this reading",
    oracleTerms: signals.oracle,
    flavorTerms: signals.flavor
  }).map((path) => ({
    label: path.sidebarLabel || path.label,
    hint: path.hint,
    q: path.query,
    plainReadingQuery: path.plainReadingQuery
  }));
}

function colorIdentityFromPlacement(result) {
  const faction = String(result?.faction || "").toUpperCase();
  const keyIdentity = colorIdentityFromDossierKey(faction);
  if (keyIdentity) return keyIdentity;

  const scores = result?.mana_scores || result?.scores || {};
  const ranked = ["W", "U", "B", "R", "G"]
    .map((color) => ({ color, value: Number(scores[color] || 0) }))
    .filter((entry) => entry.value > 0)
    .sort((left, right) => right.value - left.value || sortManaSymbols(left.color, right.color));
  return ranked.slice(0, 2).map((entry) => entry.color).sort(sortManaSymbols).join("").toLowerCase();
}

function colorIdentityFromDossierKey(key) {
  const value = String(key || "").toUpperCase();
  if (!value) return "";
  if (/^[WUBRG]{1,5}$/.test(value)) {
    return [...new Set(value.split(""))].sort(sortManaSymbols).join("").toLowerCase();
  }
  return DOSSIER_COLOR_IDENTITIES.get(value) || "";
}

function sortManaSymbols(left, right) {
  return ["W", "U", "B", "R", "G"].indexOf(left) - ["W", "U", "B", "R", "G"].indexOf(right);
}

function readingSearchSignals(result) {
  const text = [
    result?.decree,
    result?.faction_name,
    ...(result?.evidence_trail || []).flatMap((entry) => [entry.signal, entry.answer_title, entry.prompt])
  ].filter(Boolean).join(" ").toLowerCase();
  const signals = [
    { test: /graveyard|death|reclamation|recursion|rot|return/i, oracle: ["graveyard", "return target", "dies"], flavor: ["death", "grave", "again"] },
    { test: /sacrifice|debt|drain|obligation|aristocrat/i, oracle: ["sacrifice", "each opponent loses", "dies"], flavor: ["debt", "blood", "price"] },
    { test: /spell|experiment|expression|storm|instant|sorcery/i, oracle: ["instant or sorcery", "copy", "draw"], flavor: ["spark", "experiment", "flame"] },
    { test: /community|communal|tokens|wide|harmony/i, oracle: ["create", "token", "creatures you control"], flavor: ["together", "conclave", "home"] },
    { test: /order|law|procedure|control|rules/i, oracle: ["counter target", "exile target", "can't attack"], flavor: ["law", "judgment", "order"] },
    { test: /secret|hidden|information|shadow|memory/i, oracle: ["surveil", "mill", "discard"], flavor: ["secret", "shadow", "memory"] },
    { test: /growth|nature|adapt|counter|land/i, oracle: ["land", "+1/+1 counter", "search your library"], flavor: ["growth", "root", "wild"] }
  ];
  const matched = signals.filter((signal) => signal.test.test(text));
  return {
    oracle: [...new Set(matched.flatMap((signal) => signal.oracle))].slice(0, 5),
    flavor: [...new Set(matched.flatMap((signal) => signal.flavor))].slice(0, 5)
  };
}

/**
 * Renders color identity shortcut buttons in the sidebar.
 */
function buildColorGrid() {
  const el = document.getElementById("color-grid");
  if (!el) return;
  clearNode(el);
  COLOR_LABELS.forEach((color) => {
    el.appendChild(createActionButton({
      className: "color-sb-btn",
      text: color.c,
      action: "quick-search",
      dataset: { query: color.q },
      title: color.label,
      ariaLabel: color.label
    }));
  });
}

/**
 * Runs a prebuilt raw Scryfall query.
 * @param {string} query - Raw query.
 */
function runQuickSearch(query, opts = {}) {
  currentMode = "raw";
  const formatted = applySelectedFormatToQuery(query, {
    useFormatDefault: opts.useFormatDefault !== false
  });
  const finalQuery = formatted.query;
  const plainReadingQuery = normalizeSearchInputValue(opts.plainReadingQuery || "");
  document.getElementById("search-input").value = finalQuery;
  selectAutoFilledInputOnFocus = true;
  lastSmartInput = plainReadingQuery;
  lastSmartQuery = plainReadingQuery ? finalQuery : "";
  setMode("raw");
  currentOrder = opts.order || "name";
  currentUnique = opts.unique || "cards";
  currentDir = normalizeSortDirection(opts.dir);
  displayPage = 0;
  allResults = [];
  setLoading(true);
  clearError();
  triggerSearch(finalQuery, {
    reason: formatted.changed ? `Applied ${formatLabel(formatted.format)} format.` : "",
    order: currentOrder,
    unique: currentUnique,
    dir: currentDir,
    inputValue: query,
    normalized: formatted.changed
  })
    .catch((error) => showError(`Search failed: ${error.message}`))
    .finally(() => setLoading(false));
}

/**
 * Runs a parser alternative, preserving any attached search metadata.
 * @param {string} query - Alternative query.
 * @param {object} api - Optional alternative API metadata.
 */
function runQueryAlternative(query, api = {}) {
  runQuickSearch(query, {
    order: api.order || currentOrder,
    unique: api.unique || currentUnique,
    dir: api.dir || currentDir
  });
}

/**
 * Applies a format filter to the current query.
 * @param {string} format - Scryfall format id.
 */
function applyFormatFilter(format) {
  if (!currentQuery) return;
  const base = stripFormatFilter(currentQuery);
  runQuickSearch((format ? `${base} f:${format}` : base).trim(), {
    order: currentOrder,
    unique: currentUnique,
    dir: currentDir,
    useFormatDefault: false
  });
}

/**
 * Changes the Scryfall result order and reruns the current query.
 * @param {string} order - Scryfall order value.
 */
function changeOrder(order, dir = undefined) {
  currentOrder = order;
  currentDir = normalizeSortDirection(dir);
  if (currentQuery) {
    displayPage = 0;
    allResults = [];
    setLoading(true);
    clearError();
    triggerSearch(currentQuery, {
      reason: "Updated result sorting.",
      order: currentOrder,
      unique: currentUnique,
      dir: currentDir
    }).then(() => setLoading(false));
  }
}

/**
 * Adds a query to the local recent-search list.
 * @param {string} query - Query to remember.
 */
function addRecent(query) {
  recentSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 8);
  const el = document.getElementById("recent-list");
  if (!el) return;
  clearNode(el);
  recentSearches.forEach((recent) => {
    el.appendChild(createActionButton({
      className: "recent-item",
      text: recent.length > 40 ? `${recent.slice(0, 40)}...` : recent,
      action: "quick-search",
      dataset: { query: recent },
      title: recent
    }));
  });
  const recentSection = document.getElementById("recent-section");
  if (recentSection) {
    recentSection.style.display = recentSearches.length ? "" : "none";
    if (recentSearches.length && "open" in recentSection) recentSection.open = true;
  }
}

/**
 * Delegates Query Inspector rendering to the dedicated UI module.
 * @param {string} query - Generated Scryfall query.
 * @param {string} reason - Short explanation.
 * @param {object|null} parserResult - Optional parser diagnostics.
 */
function showQueryInspector(query, reason, parserResult = null, api = null, ui = {}) {
  renderQueryInspector({
    query,
    reason,
    parserResult,
    api,
    inputValue: ui.inputValue || "",
    normalized: Boolean(ui.normalized)
  });
}

/**
 * Keeps universal query actions in the search row synced with the active query.
 * @param {string} query - Current Scryfall query.
 * @param {object} api - Search API/display metadata.
 */
function updateSearchActions(query = currentQuery, api = currentSearchApi) {
  const cleanQuery = String(query || "").trim();
  const hasQuery = Boolean(cleanQuery);
  const copyButton = document.getElementById("search-copy-btn");
  const scryfallLink = document.getElementById("search-scryfall-link");
  const href = hasQuery ? buildScryfallWebSearchUrl(cleanQuery, api || {}) : "#";

  if (copyButton) {
    copyButton.disabled = !hasQuery;
    copyButton.classList.toggle("is-disabled", !hasQuery);
  }

  if (scryfallLink) {
    scryfallLink.href = href;
    scryfallLink.classList.toggle("is-disabled", !hasQuery);
    scryfallLink.setAttribute("aria-disabled", hasQuery ? "false" : "true");
    scryfallLink.tabIndex = hasQuery ? 0 : -1;
  }
}

/**
 * Copies the current query to the clipboard.
 */
function copyQuery() {
  const inputValue = normalizeSearchInputValue(document.getElementById("search-input")?.value || "");
  const copyText = currentQuery || inputValue || lastSmartInput;
  copyTextToClipboard(copyText, "Query copied");
}

/**
 * Runs search on Enter while preserving Shift+Enter newline editing in the textarea.
 * @param {KeyboardEvent} event - Search input key event.
 */
function handleSearchInputKeydown(event) {
  if (event.key !== "Enter" || event.shiftKey || currentMode === "builder") return;
  event.preventDefault();
  doSearch();
}

/**
 * Clears the search surface without changing the active mode.
 */
function clearSearchInput() {
  const input = document.getElementById("search-input");
  if (currentMode === "builder") {
    resetBuilderFilters();
    input?.focus();
    return;
  }

  if (input) {
    input.value = "";
    input.focus();
  }

  selectAutoFilledInputOnFocus = false;
  lastSmartInput = "";
  lastSmartQuery = "";
  setMode(currentMode);
  clearError();
  resetSearchResults();
  document.getElementById("query-inspector")?.classList.add("hidden");
}

/**
 * Resets results, pagination, and empty-state UI after clearing a search.
 */
function resetSearchResults() {
  currentQuery = "";
  currentOrder = "name";
  currentUnique = "cards";
  currentDir = undefined;
  currentSearchApi = {};
  updateSearchActions("", {});
  allResults = [];
  displayPage = 0;
  hasMore = false;
  nextPageUrl = null;
  totalCards = 0;

  clearNode(document.getElementById("card-grid"));
  document.getElementById("card-grid").classList.add("hidden");
  document.getElementById("results-header").classList.add("hidden");
  document.getElementById("results-footer").classList.add("hidden");

  const panel = document.getElementById("state-panel");
  panel.classList.remove("empty-result-active");
  panel.innerHTML = buildInitialStateHtml();
  panel.style.display = "flex";
}

/**
 * Builds the initial Research Archives empty-state panel.
 * @returns {string} Initial state HTML.
 */
function buildInitialStateHtml() {
  return `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style="opacity:.2">
      <circle cx="24" cy="24" r="18" stroke="#c9a84c" stroke-width="0.8" stroke-dasharray="4 3"/>
      <circle cx="24" cy="24" r="10" stroke="#f2c55c" stroke-width="0.6" stroke-dasharray="2 4"/>
      <path d="M18 24 L22 28 L30 18" stroke="#c9a84c" stroke-width="1" stroke-linecap="round"/>
    </svg>
    <div class="state-title">The Archives await</div>
    <div class="state-sub">
      Try <code>c:r kw:shroud</code> for red cards with shroud, or use The Plain Reading with natural language.
      <br><br>Browse the <a href="https://scryfall.com/docs/syntax" target="_blank" style="color:var(--maze-gold-2)">full Scryfall syntax reference &nearr;</a>
    </div>
  `;
}

/**
 * Toggles loading presentation for search execution.
 * @param {boolean} on - Whether loading state is active.
 */
function setLoading(on) {
  const btn = document.getElementById("search-btn");
  btn.disabled = on;
  btn.textContent = on ? "..." : "Search";
  if (on) {
    const panel = document.getElementById("state-panel");
    panel.classList.remove("empty-result-active");
    panel.innerHTML = `
      <svg class="state-spinner" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="16" stroke="#f2c55c" stroke-width="0.8" stroke-dasharray="4 2"/>
      </svg>
      <div class="state-title">Searching the Archives...</div>`;
    panel.style.display = "flex";
    document.getElementById("card-grid").classList.add("hidden");
    document.getElementById("results-header").classList.add("hidden");
    document.getElementById("results-footer").classList.add("hidden");
  }
}

/**
 * Hides the empty/loading state panel.
 */
function hideState() {
  document.getElementById("state-panel").style.display = "none";
}

/**
 * Checks whether a Scryfall error response means the query had zero matches.
 * @param {object} data - Scryfall response payload.
 * @returns {boolean} True when Scryfall found no matching cards.
 */
function isNoResultsResponse(data) {
  return data?.code === "not_found" || data?.status === 404;
}

/**
 * Shows a themed empty-results panel instead of a red error banner.
 * @param {string} query - Query that returned no cards.
 */
async function showNoResultsState(query) {
  clearError();
  allResults = [];
  totalCards = 0;
  hasMore = false;
  nextPageUrl = null;
  document.getElementById("card-grid").classList.add("hidden");
  document.getElementById("results-header").classList.add("hidden");
  document.getElementById("results-footer").classList.add("hidden");

  const panel = document.getElementById("state-panel");
  panel.innerHTML = buildNoResultsHtml();
  document.getElementById("empty-query").textContent = query;
  panel.classList.add("empty-result-active");
  panel.style.display = "flex";

  const card = await ResearchSearch.scryfallRandom("kw:deathtouch");
  if (card?.object === "card") renderNoResultsCard(card);
}

/**
 * Builds the empty-results panel HTML.
 * @returns {string} Empty-results HTML.
 */
function buildNoResultsHtml() {
  return `
    <div class="empty-archive">
      <a class="empty-card-link" id="empty-card-link" href="https://scryfall.com/card/rna/81/pestilent-spirit" target="_blank" rel="noopener">
        <div class="empty-card-frame" id="empty-card-frame">Searching for a strange specimen...</div>
      </a>
      <div>
        <div class="empty-kicker">No match in the archive</div>
        <div class="empty-title">The trail went cold.</div>
        <div class="empty-copy">
          No cards matched this exact spellwork. Try loosening a color, removing one keyword, or switching an AND into an OR.
        </div>
        <div class="empty-query" id="empty-query"></div>
        <div class="empty-card-lore hidden" id="empty-card-lore">
          <div class="empty-card-name" id="empty-card-name"></div>
          <div class="empty-card-flavor hidden" id="empty-card-flavor"></div>
          <div class="empty-card-artist hidden" id="empty-card-artist"></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders a random deathtouch card image in the empty-results panel.
 * @param {object} card - Scryfall card payload.
 */
function renderNoResultsCard(card) {
  const frame = document.getElementById("empty-card-frame");
  const link = document.getElementById("empty-card-link");
  const lore = document.getElementById("empty-card-lore");
  const nameEl = document.getElementById("empty-card-name");
  const flavorEl = document.getElementById("empty-card-flavor");
  const artistEl = document.getElementById("empty-card-artist");
  const image = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;
  if (!frame || !image) return;

  clearNode(frame);
  const imageNode = document.createElement("img");
  imageNode.src = image;
  imageNode.alt = card.name || "Deathtouch specimen";
  imageNode.loading = "lazy";
  frame.appendChild(imageNode);
  if (link && card.scryfall_uri) link.href = card.scryfall_uri;

  const flavor = getCardFlavorText(card);
  const artist = getCardArtist(card);
  if (lore && (card.name || flavor || artist)) lore.classList.remove("hidden");
  if (nameEl) nameEl.textContent = card.name || "Deathtouch specimen";
  if (flavorEl && flavor) {
    flavorEl.textContent = flavor;
    flavorEl.classList.remove("hidden");
  }
  if (artistEl && artist) {
    artistEl.textContent = `Art by ${artist}`;
    artistEl.classList.remove("hidden");
  }
}

function loadStash() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STASH_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item?.name) : [];
  } catch (_) {
    return [];
  }
}

function saveStash() {
  localStorage.setItem(STASH_KEY, JSON.stringify(cardStash));
}

function cardStashKey(card) {
  return card?.oracle_id || card?.oracleId || card?.scryfall_id || card?.id || normalizeStashName(card?.name || "");
}

function normalizeStashName(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isCardStashed(card) {
  const key = cardStashKey(card);
  return Boolean(key && cardStash.some((item) => cardStashKey(item) === key));
}

function normalizeStashCard(card, sectionId) {
  return {
    oracle_id: card.oracle_id || "",
    scryfall_id: card.id || card.scryfall_id || "",
    name: card.name || "",
    set: card.set || "",
    collector_number: card.collector_number || "",
    type_line: card.type_line || card.card_faces?.[0]?.type_line || "",
    color_identity: card.color_identity || [],
    scryfall_uri: card.scryfall_uri || "",
    image_uri: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "",
    stash_section: sectionId,
    source_path: currentQuery ? `maze:${currentQuery}` : "maze"
  };
}

function toggleCardStash(card, sectionId = "maybe") {
  const key = cardStashKey(card);
  if (!key) return;
  const existingIndex = cardStash.findIndex((item) => cardStashKey(item) === key);

  if (!sectionId) {
    if (existingIndex >= 0) cardStash.splice(existingIndex, 1);
    saveStash();
    renderStash();
    refreshStashButtons();
    showToast("Removed from stash");
    return;
  }

  const normalized = normalizeStashCard(card, sectionId);
  if (existingIndex >= 0) cardStash[existingIndex] = normalized;
  else cardStash.push(normalized);
  saveStash();
  renderStash();
  refreshStashButtons();
  showToast(existingIndex >= 0 ? "Moved in stash" : "Added to stash");
}

function toggleCardStashFromModal(sectionId) {
  if (!activeModalCard) return;
  toggleCardStash(activeModalCard, sectionId);
}

function removeStashCard(key) {
  cardStash = cardStash.filter((item) => cardStashKey(item) !== key);
  saveStash();
  renderStash();
  refreshStashButtons();
}

function clearStash() {
  cardStash = [];
  saveStash();
  renderStash();
  refreshStashButtons();
  showToast("Stash cleared");
}

function renderStash() {
  const countEl = document.getElementById("stash-count");
  const body = document.getElementById("stash-body");
  if (!countEl || !body) return;

  countEl.textContent = String(cardStash.length);
  updateStashDrawerCount();
  clearNode(body);
  if (!cardStash.length) {
    const empty = document.createElement("div");
    empty.className = "stash-empty";
    empty.textContent = "No cards saved yet.";
    body.appendChild(empty);
    return;
  }

  const renderedGroups = STASH_SECTIONS.map((section) => {
    const items = cardStash.filter((item) => item.stash_section === section.id);
    if (!items.length) return null;

    const group = document.createElement("div");
    group.className = "stash-group";
    const title = document.createElement("div");
    title.className = "stash-section-title";
    title.textContent = section.label;
    const list = document.createElement("div");
    list.className = "stash-list";

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "stash-item";

      const name = createLink({
        className: "stash-name",
        href: item.scryfall_uri || "#",
        text: item.name || "Unknown card",
        target: "_blank",
        rel: "noopener"
      });
      const remove = createActionButton({
        className: "stash-remove",
        text: "x",
        action: "remove-stash-card",
        dataset: { stashKey: cardStashKey(item) },
        ariaLabel: `Remove ${item.name || "card"} from stash`
      });
      appendContent(row, name, remove);
      list.appendChild(row);
    });

    appendContent(group, title, list);
    return group;
  }).filter(Boolean);

  if (!renderedGroups.length) {
    const empty = document.createElement("div");
    empty.className = "stash-empty";
    empty.textContent = "No cards saved yet.";
    body.appendChild(empty);
    return;
  }

  renderedGroups.forEach((group) => body.appendChild(group));
}

function updateStashDrawerCount() {
  document.querySelectorAll("[data-stash-toggle-count]").forEach((node) => {
    node.textContent = String(cardStash.length);
  });
}

function setStashDrawerOpen(open) {
  document.body.dataset.stashOpen = open ? "true" : "false";
  document.getElementById("stash-drawer-toggle")?.setAttribute("aria-expanded", open ? "true" : "false");
}

function toggleStashDrawer() {
  setStashDrawerOpen(document.body.dataset.stashOpen !== "true");
}

function refreshStashButtons() {
  document.querySelectorAll(".card-item").forEach((node) => {
    const key = node.dataset.stashKey;
    const button = node.querySelector(".card-stash-btn");
    if (!key || !button) return;
    const saved = cardStash.some((item) => cardStashKey(item) === key);
    button.classList.toggle("on", saved);
    button.textContent = saved ? "✓-" : "+";
    button.title = saved ? "Remove from stash" : "Add to stash";
    button.setAttribute("aria-label", button.title);
  });
}

function buildStashExportText() {
  const commanderItems = cardStash.filter((item) => item.stash_section === "commander");
  const deckItems = cardStash.filter((item) => item.stash_section !== "commander");
  const lines = [];
  if (commanderItems.length) {
    lines.push("Commander");
    commanderItems.forEach((item) => lines.push(`1 ${item.name}`));
    lines.push("");
  }
  if (deckItems.length) {
    lines.push("Deck");
    deckItems.forEach((item) => lines.push(`1 ${item.name}`));
  }
  return lines.join("\n").trim();
}

function copyStashExport() {
  const text = buildStashExportText();
  if (!text) {
    showToast("Stash is empty");
    return;
  }
  copyTextToClipboard(text, "Export copied");
}

function copyTextToClipboard(text, successMessage) {
  const value = String(text || "");
  if (!value) {
    showToast("Nothing to copy");
    return;
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value)
      .then(() => showToast(successMessage))
      .catch(() => fallbackCopyText(value, successMessage));
    return;
  }

  fallbackCopyText(value, successMessage);
}

function fallbackCopyText(text, successMessage) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const copied = document.execCommand?.("copy");
    showToast(copied ? successMessage : "Copy unavailable");
  } catch (_) {
    showToast("Copy unavailable");
  } finally {
    textarea.remove();
  }
}

function bindMazeControls() {
  document.querySelector(".page")?.addEventListener("click", handleMazeActionClick);
  document.getElementById("modal-bg")?.addEventListener("click", handleMazeActionClick);
  document.addEventListener("keydown", handleMazeGlobalKeydown);
  document.addEventListener("click", handleMazeDocumentClick);

  document.getElementById("search-input")?.addEventListener("keydown", handleSearchInputKeydown);
  document.getElementById("color-op")?.addEventListener("change", rebuildFromFilters);
  document.getElementById("bld-format")?.addEventListener("change", rebuildFromFilters);
  document.getElementById("cmc-min")?.addEventListener("input", rebuildFromFilters);
  document.getElementById("cmc-max")?.addEventListener("input", rebuildFromFilters);
  document.getElementById("kw-input")?.addEventListener("input", (event) => {
    showKwSuggestions(event.target.value);
  });
  document.getElementById("kw-input")?.addEventListener("keydown", handleKwKey);
  document.getElementById("sb-format")?.addEventListener("change", (event) => {
    applyFormatFilter(event.target.value);
  });
  document.getElementById("res-order")?.addEventListener("change", (event) => {
    changeOrder(event.target.value, event.target.selectedOptions[0]?.dataset.dir);
  });
  document.getElementById("maze-return-dismiss")?.addEventListener("click", dismissArchscryReturnBanner);
  document.getElementById("modal-bg")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeModal();
  });

}

function handleMazeActionClick(event) {
  const actionNode = event.target.closest("[data-action]");
  if (!(actionNode instanceof HTMLElement)) return;

  switch (actionNode.dataset.action) {
    case "set-mode":
      setMode(actionNode.dataset.mode || "ai");
      return;
    case "search":
      doSearch();
      return;
    case "clear-search":
      clearSearchInput();
      return;
    case "reset-builder":
      resetBuilderFilters();
      return;
    case "copy-query":
      copyQuery();
      return;
    case "toggle-stash-drawer":
      toggleStashDrawer();
      return;
    case "close-stash-drawer":
      setStashDrawerOpen(false);
      return;
    case "toggle-color":
      toggleColor(actionNode.dataset.color || "");
      return;
    case "toggle-type":
      toggleType(actionNode.dataset.value || "", actionNode);
      return;
    case "toggle-rarity":
      toggleRarity(actionNode.dataset.value || "", actionNode);
      return;
    case "add-keyword":
      addKeyword(actionNode.dataset.keyword || "");
      return;
    case "remove-keyword":
      removeKeyword(actionNode.dataset.keyword || "");
      return;
    case "quick-search":
      if (actionNode.closest("#modal-wrap")) closeModal();
      runQuickSearch(actionNode.dataset.query || "", {
        order: actionNode.dataset.order || undefined,
        unique: actionNode.dataset.unique || undefined,
        dir: actionNode.dataset.dir || undefined,
        plainReadingQuery: actionNode.dataset.plainReadingQuery || undefined
      });
      return;
    case "load-more":
      loadMore();
      return;
    case "copy-stash-export":
      copyStashExport();
      return;
    case "clear-stash":
      clearStash();
      return;
    case "toggle-card-stash": {
      event.stopPropagation();
      const card = actionNode.__cardData;
      if (!card) return;
      toggleCardStash(card, isCardStashed(card) ? null : "maybe");
      return;
    }
    case "open-card":
      openModal(actionNode.__cardData, actionNode);
      return;
    case "close-modal":
      closeModal();
      return;
    case "modal-stash":
      toggleCardStashFromModal(actionNode.dataset.section || "maybe");
      return;
    case "remove-stash-card":
      removeStashCard(actionNode.dataset.stashKey || "");
      return;
    default:
  }
}

function handleMazeGlobalKeydown(event) {
  if (event.key === "Escape" && document.body.dataset.stashOpen === "true" && !isModalOpen()) {
    event.preventDefault();
    setStashDrawerOpen(false);
    return;
  }
  if (!isModalOpen()) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key === "Tab") {
    trapModalFocus(event);
  }
}

function handleMazeDocumentClick(event) {
  if (!document.getElementById("kw-wrap")?.contains(event.target)) {
    document.getElementById("kw-suggestions")?.classList.add("hidden");
  }
}

/**
 * Gets flavor text from normal or multi-face Scryfall cards.
 * @param {object} card - Scryfall card payload.
 * @returns {string} Flavor text when present.
 */
function getCardFlavorText(card) {
  return card.flavor_text || card.card_faces?.find((face) => face.flavor_text)?.flavor_text || "";
}

/**
 * Gets artist credit from normal or multi-face Scryfall cards.
 * @param {object} card - Scryfall card payload.
 * @returns {string} Artist credit when present.
 */
function getCardArtist(card) {
  if (card.artist) return card.artist;
  const artists = card.card_faces?.map((face) => face.artist).filter(Boolean) || [];
  return [...new Set(artists)].join(" / ");
}

/**
 * Shows a visible error message.
 * @param {string} message - Error text.
 */
function showError(message) {
  const el = document.getElementById("err-msg");
  el.textContent = message;
  el.classList.remove("hidden");
  document.getElementById("state-panel").classList.remove("empty-result-active");
  hideState();
}

/**
 * Clears the visible error message.
 */
function clearError() {
  const el = document.getElementById("err-msg");
  el.classList.add("hidden");
  el.textContent = "";
}

/**
 * Shows a short toast confirmation.
 * @param {string} message - Toast text.
 */
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:var(--bg3);border:1px solid var(--border-s);color:var(--text);padding:0.5rem 1.25rem;font-family:"Cinzel",serif;font-size:0.72rem;letter-spacing:0.1em;z-index:999;transition:opacity 0.25s;pointer-events:none';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1";
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.style.opacity = "0"; }, 2000);
}

/**
 * Exposes a small compatibility surface for tests and Query Inspector fallbacks.
 */
function exposeWindowHandlers() {
  Object.assign(window, {
    setMode,
    doSearch,
    runQuickSearch,
    runQueryAlternative,
    changeOrder,
    copyQuery,
    clearSearchInput,
    handleSearchInputKeydown,
    resetBuilderFilters,
    applyFormatFilter,
    loadMore,
    setStashDrawerOpen,
    toggleStashDrawer,
    openModal,
    closeModal
  });
}

window.addEventListener("load", initializeResearchArchives);
exposeWindowHandlers();

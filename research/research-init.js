import { loadDictionaryFromSeedUrl } from "./scryfall-dictionary.js";
import { normalizeSortDirection, parseScryfallNaturalLanguage, setScryfallDictionary } from "./scryfall-parser.js";
import { buildVisualBuilderQuery, parseKeywordInput } from "./research-builder.js";
import { resolveModeInputValue } from "./research-mode.js";
import * as ResearchSearch from "./research-search.js";
import { renderQueryInspector } from "./research-ui.js";

let currentMode = "ai";
let currentQuery = "";
let currentOrder = "name";
let currentUnique = "cards";
let currentDir = undefined;
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

const PAGE_SIZE = 24;
const STASH_KEY = "vm_maze_card_stash_v1";
const ARCHSCRY_MAZE_HANDOFF_KEY = "vm_archscry_maze_handoff_v1";
const ARCHSCRY_PATH_LABELS = {
  "commanders-that-fit": "Commanders That Fit",
  "support-cards": "Support Cards",
  "flavor-echoes": "Flavor Echoes",
  "weird-stretch-commanders": "Weird Stretch Commanders",
  ramp: "Ramp",
  draw: "Draw",
  interaction: "Interaction",
  lands: "Lands",
  "win-conditions": "Win Conditions"
};
const STASH_SECTIONS = [
  { id: "commander", label: "Commander Ideas", exportHeading: "Commander" },
  { id: "support", label: "Cards That Support This Shape", exportHeading: "Deck" },
  { id: "maybe", label: "Maybe / Curious Finds", exportHeading: "Deck" }
];

const bFilters = {
  colors: [],
  colorOp: "c",
  types: [],
  format: "",
  keywords: [],
  cmcMin: "",
  cmcMax: "",
  rarities: []
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

const KEYWORDS = [
  "cascade", "convoke", "cycling", "deathtouch", "defender", "double strike",
  "equip", "escape", "explore", "first strike", "flash", "flying", "haste",
  "hexproof", "indestructible", "investigate", "kicker", "landfall", "lifelink",
  "menace", "morph", "proliferate", "protection", "prowess", "reach", "scry",
  "shroud", "surveil", "trample", "vigilance", "ward"
].sort();

const TYPES = ["Creature", "Instant", "Sorcery", "Enchantment", "Artifact", "Planeswalker", "Land", "Battle"];
const RARITIES = [{ v: "c", l: "Common" }, { v: "u", l: "Uncommon" }, { v: "r", l: "Rare" }, { v: "m", l: "Mythic" }];

/**
 * Loads the checked-in parser seed so Smart Search uses the curated ruleset.
 */
async function initializeParserDictionary() {
  try {
    const dictionary = await loadDictionaryFromSeedUrl("research/scryfall-parser-seed-2026.json");
    setScryfallDictionary(dictionary);
  } catch (error) {
    console.warn("Parser seed unavailable; using built-in parser dictionary.", error);
  }
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
  bindSearchInputSelectOnFocus();
  setMode("ai");

  const urlQ = urlParams.get("q");
  const operatorQuery = urlParams.get("operatorQuery") || urlQ;
  const plainReadingQuery = urlParams.get("plainReadingQuery") || "";
  if (urlParams.get("from") === "archscry" && operatorQuery) {
    const input = document.getElementById("search-input");
    input.value = plainReadingQuery || operatorQuery;
    lastSmartInput = input.value;
    lastSmartQuery = operatorQuery;
    setMode("ai");
    triggerSearch(operatorQuery, {
      order: urlParams.get("order") || currentOrder,
      unique: urlParams.get("unique") || currentUnique,
      dir: normalizeSortDirection(urlParams.get("dir")) || currentDir
    });
  } else if (urlQ) {
    document.getElementById("search-input").value = urlQ;
    setMode("raw");
    triggerSearch(urlQ, {
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
  ["ai", "raw", "builder"].forEach((id) => {
    const btn = document.getElementById(`mode-${id}`);
    btn.classList.toggle("on", id === mode);
    btn.classList.remove("teal-mode");
  });

  const input = document.getElementById("search-input");
  const icon = document.getElementById("search-icon");
  const builder = document.getElementById("builder-panel");
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
    icon.style.color = "var(--teal)";
    document.getElementById("mode-raw").classList.add("teal-mode");
    builder.classList.add("hidden");
  } else {
    input.className = "s-input mono";
    input.placeholder = "";
    icon.textContent = "=";
    icon.style.color = "var(--teal)";
    document.getElementById("mode-builder").classList.add("teal-mode");
    builder.classList.remove("hidden");
    rebuildFromFilters();
  }

  syncInputForModeSwitch(input, previousMode, mode);
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
 * Runs the active search mode and routes Smart Search through the local parser.
 */
async function doSearch() {
  const rawInput = document.getElementById("search-input").value.trim();
  if (!rawInput && currentMode !== "builder") return;

  setLoading(true);
  clearError();
  displayPage = 0;
  allResults = [];

  let query = rawInput;
  let reason = "";
  let parserResult = null;

  try {
    if (currentMode === "ai") {
      parserResult = parseScryfallNaturalLanguage(rawInput);
      query = parserResult.query;
      lastSmartInput = rawInput;
      lastSmartQuery = query;
      reason = parserResult.reason || "";
      currentOrder = parserResult.api?.order || currentOrder;
      currentUnique = parserResult.api?.unique || currentUnique;
      currentDir = parserResult.api?.dir || currentDir;

      if (parserResult.mode === "exact_name") {
        showQueryInspector(query, reason, parserResult);
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
    } else if (currentMode === "builder") {
      query = buildFilterQuery();
      if (!query.trim()) {
        showError("Add at least one filter before searching.");
        setLoading(false);
        return;
      }
    } else if (currentMode === "raw") {
      const prepared = prepareRawSyntaxQuery(rawInput);
      query = prepared.query;
      reason = prepared.reason;
      parserResult = prepared.diagnostics;
      if (prepared.changed) document.getElementById("search-input").value = query;
      if (query !== lastSmartQuery) lastSmartQuery = "";
    }

    await triggerSearch(query, { reason, order: currentOrder, parserResult });
  } catch (error) {
    showError(`Search failed: ${error.message}`);
  }

  setLoading(false);
}

/**
 * Executes a Scryfall search and renders the first page of results.
 * @param {string} query - Scryfall query syntax.
 * @param {object} opts - Search metadata and UI diagnostics.
 */
async function triggerSearch(query, opts = {}) {
  const { reason = "", order = currentOrder, unique = currentUnique, dir = currentDir, parserResult = null } = opts;
  const searchOrder = parserResult?.api?.order || order || "name";
  const searchUnique = parserResult?.api?.unique || unique || "cards";
  const searchDir = normalizeSortDirection(parserResult?.api?.dir || dir);
  const searchApi = { endpoint: "/cards/search", unique: searchUnique, order: searchOrder };
  if (searchDir) searchApi.dir = searchDir;
  currentQuery = query;
  currentOrder = searchOrder;
  currentUnique = searchUnique;
  currentDir = searchDir;
  addRecent(query);
  showQueryInspector(query, reason, parserResult, searchApi);

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
  if (!hasMore && displayPage < Math.ceil(allResults.length / PAGE_SIZE) - 1) {
    displayPage++;
    renderResults(true);
    return;
  }

  if (hasMore && displayPage >= Math.ceil(allResults.length / PAGE_SIZE) - 1) {
    document.getElementById("btn-more").disabled = true;
    const data = await ResearchSearch.scryfallSearch(currentQuery, {
      page: nextPageUrl,
      order: currentOrder,
      unique: currentUnique,
      dir: currentDir
    });
    if (data.data) {
      allResults = [...allResults, ...data.data];
      hasMore = data.has_more;
      nextPageUrl = data.next_page || null;
      displayPage++;
      renderResults(true);
    }
    document.getElementById("btn-more").disabled = false;
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
  if (!append) grid.innerHTML = "";

  document.getElementById("res-count").innerHTML =
    `Showing <strong>${Math.min((displayPage + 1) * PAGE_SIZE, allResults.length)}</strong> of <strong>${totalCards.toLocaleString()}</strong> cards`;

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
  wrap.dataset.stashKey = cardStashKey(card);
  const img = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;
  wrap.innerHTML = img
    ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(card.name)}" loading="lazy"/>`
    : `<div class="card-skeleton"></div>`;
  wrap.innerHTML += `<div class="card-item-name">${escapeHtml(card.name)}</div>`;
  const stashButton = document.createElement("button");
  stashButton.type = "button";
  stashButton.className = `card-stash-btn${isCardStashed(card) ? " on" : ""}`;
  stashButton.textContent = isCardStashed(card) ? "✓-" : "+";
  stashButton.title = isCardStashed(card) ? "Remove from stash" : "Add to stash";
  stashButton.setAttribute("aria-label", stashButton.title);
  stashButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleCardStash(card, isCardStashed(card) ? null : "maybe");
  });
  wrap.appendChild(stashButton);
  wrap.onclick = () => openModal(card);
  return wrap;
}

/**
 * Opens the full card detail modal for a Scryfall result.
 * @param {object} card - Scryfall card object.
 */
function openModal(card) {
  activeModalCard = card;
  const faces = card.card_faces;
  const imageUris = card.image_uris;
  const imgHtml = buildModalImageHtml(card);
  const manaCostHtml = renderManaCost(card.mana_cost || faces?.[0]?.mana_cost || "");
  const oracle = (card.oracle_text || faces?.map((face) => `${face.name}\n${face.oracle_text || ""}`).join("\n\n--------\n\n") || "").trim();
  const flavor = card.flavor_text || faces?.[0]?.flavor_text || "";
  const priceHtml = card.prices?.usd ? `<span class="m-price">$${card.prices.usd}</span>` : '<span style="color:var(--text-muted)">-</span>';
  const rarity = (card.rarity || "-").charAt(0).toUpperCase() + (card.rarity || "").slice(1);
  const legalities = card.legalities || {};
  const formatBadges = ["commander", "modern", "pioneer", "standard", "legacy", "pauper"]
    .filter((format) => legalities[format] === "legal")
    .map((format) => `<span style="font-size:0.72rem;padding:0.15rem 0.5rem;border:1px solid var(--border);color:var(--text-muted);margin-right:3px">${format}</span>`)
    .join("");
  const primaryType = (card.type_line || "").split(" - ")[0].split(" ").pop()?.toLowerCase() || "card";
  const similarQ = `id<=${(card.color_identity || []).join("").toLowerCase() || "c"} t:${primaryType}`;

  document.getElementById("modal-inner").innerHTML = `
    <div class="modal-img-col">${imgHtml}</div>
    <div class="modal-detail-col">
      <div class="m-name">${escapeHtml(card.name)}</div>
      ${manaCostHtml ? `<div class="m-cost" aria-label="Mana cost ${escapeHtml(card.mana_cost || faces?.[0]?.mana_cost || "")}">${manaCostHtml}</div>` : ""}
      <div class="m-type">${escapeHtml(card.type_line || "")}</div>
      ${oracle ? `<div class="m-oracle">${escapeHtml(oracle).replace(/\n/g, "<br>")}</div>` : ""}
      ${flavor ? `<div class="m-flavor">${escapeHtml(flavor)}</div>` : ""}
      <div class="m-meta">
        <div class="m-meta-row"><span class="m-meta-k">Set</span><span class="m-meta-v">${escapeHtml(card.set_name || "-")} (${escapeHtml(card.set?.toUpperCase() || "")})</span></div>
        <div class="m-meta-row"><span class="m-meta-k">Rarity</span><span class="m-meta-v">${escapeHtml(rarity)}</span></div>
        <div class="m-meta-row"><span class="m-meta-k">Mana Value</span><span class="m-meta-v">${card.cmc ?? "-"}</span></div>
        <div class="m-meta-row"><span class="m-meta-k">Paper Price</span><span class="m-meta-v">${priceHtml}</span></div>
      </div>
      ${formatBadges ? `<div style="margin-bottom:1rem">${formatBadges}</div>` : ""}
      <div class="m-actions">
        <a class="m-btn m-btn-gold" href="${escapeHtml(card.scryfall_uri || "#")}" target="_blank" rel="noopener">View on Scryfall</a>
        <button class="m-btn m-btn-teal" id="find-similar-btn">Find Similar</button>
        ${card.prices?.usd ? `<a class="m-btn m-btn-gold" href="https://www.tcgplayer.com/search/magic/product?q=${encodeURIComponent(card.name)}" target="_blank" rel="noopener">TCGPlayer</a>` : ""}
      </div>
      <div class="m-stash-actions">
        ${STASH_SECTIONS.map((section) => `<button class="m-btn m-btn-teal" onclick="toggleCardStashFromModal('${section.id}')">${section.label}</button>`).join("")}
      </div>
    </div>`;

  document.getElementById("find-similar-btn")?.addEventListener("click", () => {
    closeModal();
    runQuickSearch(similarQ);
  });
  document.getElementById("modal-bg").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

/**
 * Builds modal image markup for normal and double-faced cards.
 * @param {object} card - Scryfall card object.
 * @returns {string} Image HTML.
 */
function buildModalImageHtml(card) {
  if (card.card_faces && !card.image_uris) {
    return `<div class="modal-img-dfc">${card.card_faces.map((face) => face.image_uris?.normal
      ? `<img class="modal-img" src="${escapeHtml(face.image_uris.normal)}" alt="${escapeHtml(face.name)}" loading="lazy" tabindex="0"/>`
      : `<div style="aspect-ratio:63/88;background:var(--bg3);border-radius:4.5%"></div>`
    ).join("")}</div>`;
  }
  if (card.image_uris?.normal) {
    return `<img class="modal-img" src="${escapeHtml(card.image_uris.normal)}" alt="${escapeHtml(card.name)}" loading="lazy" tabindex="0"/>`;
  }
  return `<div style="aspect-ratio:63/88;background:var(--bg3);border-radius:4.5%"></div>`;
}

/**
 * Converts raw Scryfall mana-cost text into styled mana symbol chips.
 * @param {string} cost - Raw Scryfall mana cost, such as {2}{B}.
 * @returns {string} HTML for visual mana symbols.
 */
function renderManaCost(cost) {
  return parseManaSymbols(cost).map((symbol) => {
    const className = getManaSymbolClass(symbol);
    const label = getManaSymbolLabel(symbol);
    return `<span class="mana-symbol ${className}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">${escapeHtml(symbol)}</span>`;
  }).join("");
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
  document.getElementById("modal-bg").classList.add("hidden");
  document.body.style.overflow = "";
}

/**
 * Builds Visual Builder type filter chips.
 */
function buildTypeChecks() {
  const el = document.getElementById("type-checks");
  el.innerHTML = TYPES.map((type) => {
    const value = type.toLowerCase();
    return `<label class="cb-label" id="cb-type-${value}" onclick="toggleType('${value}',this)"><span>${type}</span></label>`;
  }).join("");
}

/**
 * Builds Visual Builder rarity filter chips.
 */
function buildRarityChecks() {
  const el = document.getElementById("rarity-checks");
  el.innerHTML = RARITIES.map((rarity) =>
    `<label class="cb-label" id="cb-rar-${rarity.v}" onclick="toggleRarity('${rarity.v}',this)"><span>${rarity.l}</span></label>`
  ).join("");
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
    pip.classList.toggle("on", bFilters.colors.includes(pip.dataset.c));
  });
  rebuildFromFilters();
}

/**
 * Toggles one Visual Builder type chip.
 * @param {string} value - Scryfall type value.
 * @param {HTMLElement} label - Clicked label element.
 */
function toggleType(value, label) {
  const index = bFilters.types.indexOf(value);
  if (index >= 0) bFilters.types.splice(index, 1);
  else bFilters.types.push(value);
  label.classList.toggle("checked", bFilters.types.includes(value));
  rebuildFromFilters();
}

/**
 * Toggles one Visual Builder rarity chip.
 * @param {string} value - Scryfall rarity value.
 * @param {HTMLElement} label - Clicked label element.
 */
function toggleRarity(value, label) {
  const index = bFilters.rarities.indexOf(value);
  if (index >= 0) bFilters.rarities.splice(index, 1);
  else bFilters.rarities.push(value);
  label.classList.toggle("checked", bFilters.rarities.includes(value));
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
  const input = document.getElementById("search-input");
  if (input) input.value = buildFilterQuery();
}

/**
 * Converts Visual Builder state into Scryfall syntax.
 * @returns {string} Built query.
 */
function buildFilterQuery() {
  return buildVisualBuilderQuery(bFilters);
}

/**
 * Normalizes common plain-English glue accidentally pasted into raw syntax.
 * @param {string} input - Raw Scryfall syntax field value.
 * @returns {object} Prepared query with optional diagnostics.
 */
function prepareRawSyntaxQuery(input) {
  const andParts = splitRawSyntaxOnStandaloneAnd(input);
  if (andParts.length <= 1) {
    return { query: input, reason: "", changed: false, diagnostics: null };
  }

  const query = andParts.join(" ").replace(/\s+/g, " ").trim();
  const alternativeQuery = andParts.map((part) => `(${part})`).join(" OR ");
  return {
    query,
    reason: "Removed plain-language AND from raw syntax; Scryfall combines filters with spaces.",
    changed: query !== input,
    diagnostics: {
      reason: "Raw syntax normalized before searching.",
      recognized: ["raw Scryfall syntax", "plain-language AND"],
      assumptions: [
        "Spaces already mean AND in Scryfall syntax.",
        "This still searches for cards matching every remaining filter."
      ],
      unresolved: [],
      alternatives: [
        {
          label: "Treat pasted snippets as alternatives",
          query: alternativeQuery
        }
      ]
    }
  };
}

/**
 * Splits raw syntax on standalone unquoted AND tokens.
 * @param {string} query - Raw query text.
 * @returns {string[]} Query parts split around plain-language AND.
 */
function splitRawSyntaxOnStandaloneAnd(query) {
  const parts = [];
  let current = "";
  let inQuote = false;
  const value = String(query || "");

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (char === '"') {
      inQuote = !inQuote;
      current += char;
      continue;
    }

    if (!inQuote && isStandaloneWordAt(value, i, "and")) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      i += 2;
      continue;
    }

    current += char;
  }

  if (current.trim()) parts.push(current.trim());
  return parts.length ? parts : [value.trim()].filter(Boolean);
}

/**
 * Checks if a word appears at an index without being part of a larger token.
 * @param {string} value - Full search text.
 * @param {number} index - Candidate start index.
 * @param {string} word - Word to match.
 * @returns {boolean} True when the word is standalone at the index.
 */
function isStandaloneWordAt(value, index, word) {
  const lower = value.toLowerCase();
  if (lower.slice(index, index + word.length) !== word) return false;
  const before = value[index - 1] || "";
  const after = value[index + word.length] || "";
  return !/[a-z0-9_]/i.test(before) && !/[a-z0-9_]/i.test(after);
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
 * Adds one or more keywords to the Visual Builder filter state.
 * @param {string} keyword - Keyword text to add.
 */
function addKeyword(keyword) {
  parseKeywordInput(keyword, KEYWORDS).forEach((item) => {
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
  document.getElementById("kw-chips").innerHTML = bFilters.keywords.map((keyword) =>
    `<span class="kw-chip" onclick="removeKeyword('${keyword}')">${keyword} x</span>`
  ).join("");
}

/**
 * Renders quick-search buttons in the sidebar.
 */
function buildQuickSearches() {
  const el = document.getElementById("quick-search-list");
  el.innerHTML = QUICK_SEARCHES.map((quickSearch) => `
    <button class="sb-btn" onclick="runQuickSearch('${escapeAttribute(quickSearch.q)}')">
      ${quickSearch.label}
      <span>${quickSearch.hint}</span>
    </button>`).join("");
}

/**
 * Renders general discovery paths for fresh Maze users.
 */
function buildDiscoveryPaths() {
  const el = document.getElementById("discovery-path-list");
  if (!el) return;
  el.innerHTML = DISCOVERY_PATHS.map((path) => `
    <button class="sb-btn" onclick="runQuickSearch('${escapeAttribute(path.q)}')">
      ${path.label}
      <span>${path.hint}</span>
    </button>`).join("");
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
    returnUrl: urlParams.get("returnUrl") || existing.returnUrl || "/archscry/"
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
  const dismiss = document.getElementById("maze-return-dismiss");
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

  copy.innerHTML = `Following <strong>${escapeHtml(factionName)}</strong> from ${escapeHtml(title)}${pathLabel ? ` through ${escapeHtml(pathLabel)}` : ""}.`;
  link.href = returnUrl;
  link.textContent = `Return to My ${handoff.factionName || handoff.guild || "Reading"} Dossier`;
  if (dismiss) {
    dismiss.onclick = () => dismissArchscryReturnBanner();
  }
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
  const parsed = new URL(url, location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value) parsed.searchParams.set(key, value);
  });
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
    list.innerHTML = "";
    return;
  }

  section.style.display = "";
  list.innerHTML = paths.map((path) => `
    <button class="sb-btn is-reading" onclick="runQuickSearch('${escapeAttribute(path.q)}')">
      ${path.label}
      <span>${path.hint}</span>
    </button>`).join("");
}

function getStoredPlacementResult() {
  const sessionResult = (typeof VM_SESSION !== "undefined" && VM_SESSION.profile?.placementResult) ||
    (typeof VM_SESSION !== "undefined" && VM_SESSION.interviewResult) ||
    null;
  if (sessionResult?.faction || sessionResult?.mana_scores) return sessionResult;

  if (typeof vm_getCachedPlacementResult === "function") {
    const cached = vm_getCachedPlacementResult();
    if (cached?.faction || cached?.mana_scores) return cached;
  }

  try {
    const handoff = readArchscryMazeHandoff();
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

function createReadingPaths(result) {
  const identity = colorIdentityFromPlacement(result);
  if (!identity) return [];
  const signals = readingSearchSignals(result);
  const oracleGroup = signals.oracle.length
    ? `(${signals.oracle.map((term) => queryTerm(term, "o")).join(" OR ")})`
    : "(o:graveyard OR o:sacrifice OR o:draw OR o:token)";
  const flavorGroup = signals.flavor.length
    ? `(${signals.flavor.map((term) => queryTerm(term, "ft")).join(" OR ")})`
    : "(ft:death OR ft:secret OR ft:growth OR ft:law)";

  return [
    { label: "Commanders that fit this reading", hint: identity.toUpperCase(), q: `ci<=${identity} t:legendary t:creature f:commander ${oracleGroup}` },
    { label: "Cards that support this shape", hint: "nonlegendary support", q: `ci<=${identity} f:commander -t:legendary ${oracleGroup}` },
    { label: "Flavor echoes", hint: "card-story texture", q: `ci<=${identity} ${flavorGroup}` },
    { label: "Same fantasy, different mechanic", hint: "stretch lane", q: `f:commander t:legendary t:creature -ci<=${identity} ${oracleGroup}` }
  ];
}

function colorIdentityFromPlacement(result) {
  const faction = String(result?.faction || "").toUpperCase();
  if (/^[WUBRG]{1,5}$/.test(faction)) {
    return [...new Set(faction.split(""))].sort(sortManaSymbols).join("").toLowerCase();
  }
  const scores = result?.mana_scores || result?.scores || {};
  const ranked = ["W", "U", "B", "R", "G"]
    .map((color) => ({ color, value: Number(scores[color] || 0) }))
    .filter((entry) => entry.value > 0)
    .sort((left, right) => right.value - left.value || sortManaSymbols(left.color, right.color));
  return ranked.slice(0, 2).map((entry) => entry.color).sort(sortManaSymbols).join("").toLowerCase();
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

function queryTerm(value, field) {
  const cleaned = String(value || "").trim().toLowerCase();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned.replace(/"/g, "")}"` : `${field}:${cleaned}`;
}

/**
 * Renders color identity shortcut buttons in the sidebar.
 */
function buildColorGrid() {
  const el = document.getElementById("color-grid");
  el.innerHTML = COLOR_LABELS.map((color) => `
    <button class="color-sb-btn" onclick="runQuickSearch('${escapeAttribute(color.q)}')" title="${escapeHtml(color.label)}">${color.c}</button>
  `).join("");
}

/**
 * Runs a prebuilt raw Scryfall query.
 * @param {string} query - Raw query.
 */
function runQuickSearch(query, opts = {}) {
  currentMode = "raw";
  document.getElementById("search-input").value = query;
  selectAutoFilledInputOnFocus = true;
  lastSmartQuery = "";
  setMode("raw");
  currentOrder = opts.order || "name";
  currentUnique = opts.unique || "cards";
  currentDir = normalizeSortDirection(opts.dir);
  displayPage = 0;
  allResults = [];
  setLoading(true);
  clearError();
  triggerSearch(query, { order: currentOrder, unique: currentUnique, dir: currentDir }).then(() => setLoading(false));
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
  const base = currentQuery.replace(/\s+f:\w+/g, "").trim();
  runQuickSearch((format ? `${base} f:${format}` : base).trim(), {
    order: currentOrder,
    unique: currentUnique,
    dir: currentDir
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
  el.innerHTML = recentSearches.map((recent) => `
    <div class="recent-item" onclick="runQuickSearch('${escapeAttribute(recent)}')">
      ${escapeHtml(recent.length > 40 ? `${recent.slice(0, 40)}...` : recent)}
    </div>`).join("");
  document.getElementById("recent-section").style.display = recentSearches.length ? "" : "none";
}

/**
 * Delegates Query Inspector rendering to the dedicated UI module.
 * @param {string} query - Generated Scryfall query.
 * @param {string} reason - Short explanation.
 * @param {object|null} parserResult - Optional parser diagnostics.
 */
function showQueryInspector(query, reason, parserResult = null, api = null) {
  renderQueryInspector({ query, reason, parserResult, api });
}

/**
 * Copies the current query to the clipboard.
 */
function copyQuery() {
  const inputValue = document.getElementById("search-input")?.value.trim() || "";
  const copyText = currentMode === "ai"
    ? (inputValue || lastSmartInput || currentQuery)
    : currentQuery;
  navigator.clipboard.writeText(copyText).then(() => showToast(currentMode === "ai" ? "Plain reading copied" : "Query copied"));
}

/**
 * Clears the search input and returns the search controls to Smart Search mode.
 */
function clearSearchInput() {
  const input = document.getElementById("search-input");
  if (input) {
    input.value = "";
    input.focus();
  }

  selectAutoFilledInputOnFocus = false;
  lastSmartInput = "";
  lastSmartQuery = "";
  setMode("ai");
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
  allResults = [];
  displayPage = 0;
  hasMore = false;
  nextPageUrl = null;
  totalCards = 0;

  document.getElementById("card-grid").innerHTML = "";
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
      <circle cx="24" cy="24" r="10" stroke="#1aaa96" stroke-width="0.6" stroke-dasharray="2 4"/>
      <path d="M18 24 L22 28 L30 18" stroke="#c9a84c" stroke-width="1" stroke-linecap="round"/>
    </svg>
    <div class="state-title">The Archives await</div>
    <div class="state-sub">
      Try <code>c:r kw:shroud</code> for red cards with shroud, or use Smart Search with natural language.
      <br><br>Browse the <a href="https://scryfall.com/docs/syntax" target="_blank" style="color:var(--teal)">full Scryfall syntax reference &nearr;</a>
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
        <circle cx="20" cy="20" r="16" stroke="#1aaa96" stroke-width="0.8" stroke-dasharray="4 2"/>
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
  panel.innerHTML = buildNoResultsHtml(query);
  panel.classList.add("empty-result-active");
  panel.style.display = "flex";

  const card = await ResearchSearch.scryfallRandom("kw:deathtouch");
  if (card?.object === "card") renderNoResultsCard(card);
}

/**
 * Builds the empty-results panel HTML.
 * @param {string} query - Query that returned no cards.
 * @returns {string} Empty-results HTML.
 */
function buildNoResultsHtml(query) {
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
        <div class="empty-query">${escapeHtml(query)}</div>
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

  frame.innerHTML = `<img src="${escapeHtml(image)}" alt="${escapeHtml(card.name)}" loading="lazy">`;
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
  if (!cardStash.length) {
    body.innerHTML = `<div class="stash-empty">No cards saved yet.</div>`;
    return;
  }

  body.innerHTML = STASH_SECTIONS.map((section) => {
    const items = cardStash.filter((item) => item.stash_section === section.id);
    if (!items.length) return "";
    return `
      <div class="stash-group">
        <div class="stash-section-title">${section.label}</div>
        <div class="stash-list">
          ${items.map((item) => `
            <div class="stash-item">
              <a class="stash-name" href="${escapeHtml(item.scryfall_uri || "#")}" target="_blank" rel="noopener">${escapeHtml(item.name)}</a>
              <button class="stash-remove" type="button" onclick="removeStashCard('${escapeAttribute(cardStashKey(item))}')">x</button>
            </div>`).join("")}
        </div>
      </div>`;
  }).join("") || `<div class="stash-empty">No cards saved yet.</div>`;
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
  navigator.clipboard.writeText(text).then(() => showToast("Export copied"));
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
 * Escapes HTML text for template rendering.
 * @param {string} value - Raw value.
 * @returns {string} Safe HTML text.
 */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Escapes a string for use inside an inline handler attribute.
 * @param {string} value - Raw value.
 * @returns {string} Attribute-safe text.
 */
function escapeAttribute(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "\\'")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Exposes module-scoped handlers for existing inline HTML event attributes.
 */
function exposeWindowHandlers() {
  Object.assign(window, {
    setMode,
    doSearch,
    clearSearchInput,
    loadMore,
    openModal,
    closeModal,
    toggleColor,
    toggleType,
    toggleRarity,
    rebuildFromFilters,
    showKwSuggestions,
    handleKwKey,
    addKeyword,
    removeKeyword,
    runQuickSearch,
    runQueryAlternative,
    applyFormatFilter,
    changeOrder,
    copyQuery,
    toggleCardStashFromModal,
    removeStashCard,
    clearStash,
    copyStashExport
  });
}

document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
document.addEventListener("click", (event) => {
  if (!document.getElementById("kw-wrap")?.contains(event.target)) {
    document.getElementById("kw-suggestions")?.classList.add("hidden");
  }
});
window.addEventListener("load", initializeResearchArchives);
exposeWindowHandlers();

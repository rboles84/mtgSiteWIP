/**
 * Renders the Query Inspector trust panel for raw and parser-backed searches.
 * @param {object} details - Inspector render details.
 * @param {string} details.query - Generated Scryfall query.
 * @param {string} [details.reason] - Short explanation.
 * @param {object} [details.parserResult] - Full parser diagnostics.
 * @param {object} [details.api] - Search API/display metadata.
 * @param {string} [details.inputValue] - Original user input before translation/normalization.
 * @param {boolean} [details.normalized] - Whether the displayed query differs from the input.
 */
export function renderQueryInspector({
  query,
  reason = "",
  parserResult = null,
  api = null,
  inputValue = "",
  normalized = false
}) {
  const inspector = document.getElementById("query-inspector");
  if (!inspector) return;
  const searchApi = parserResult?.api || api || {};
  const mode = document.body?.dataset?.mazeMode || "ai";
  inspector.dataset.mode = mode;
  inspector.classList.toggle("is-compact", mode === "raw" && !normalized);
  inspector.classList.toggle("is-secondary", mode === "builder");

  const labelEl = document.getElementById("qi-label")
    || (typeof inspector.querySelector === "function" ? inspector.querySelector(".qi-label") : null);
  const inputWrap = document.getElementById("qi-input-wrap");
  const inputLabel = document.getElementById("qi-input-label");
  const inputText = document.getElementById("qi-input");
  const queryText = document.getElementById("qi-query");
  const finalReason = parserResult?.reason || reason;
  const scryfallLink = document.getElementById("qi-scryfall");
  if (scryfallLink) scryfallLink.href = buildScryfallWebSearchUrl(query, searchApi);

  const redundantRaw = mode === "raw" && !normalized && !finalReason && !parserResult;
  const redundantBuilder = mode === "builder" && !finalReason && !parserResult;
  if (redundantRaw || redundantBuilder) {
    inputWrap?.classList.add("hidden");
    document.getElementById("qi-reason")?.classList.add("hidden");
    const diagnostics = document.getElementById("qi-diagnostics");
    if (diagnostics) {
      diagnostics.innerHTML = "";
      diagnostics.classList.add("hidden");
    }
    inspector.classList.add("hidden");
    return;
  }

  if (mode === "ai") {
    if (labelEl) labelEl.textContent = "Maze translated";
    if (inputLabel) inputLabel.textContent = "You wrote";
    if (inputText) inputText.textContent = inputValue || "Plain reading input";
    inputWrap?.classList.toggle("hidden", !inputValue);
    if (queryText) queryText.textContent = query;
  } else if (mode === "raw") {
    inputWrap?.classList.add("hidden");
    if (labelEl) labelEl.textContent = normalized ? "Normalized syntax" : "Syntax active";
    if (queryText) queryText.textContent = normalized ? query : "Using the query in the search field.";
  } else {
    inputWrap?.classList.add("hidden");
    if (labelEl) labelEl.textContent = "Visual filters searched";
    if (queryText) queryText.textContent = query;
  }

  const reasonEl = document.getElementById("qi-reason");
  const builderFallback = mode === "builder" ? "Generated from the active Loom filters." : "";
  if (finalReason || builderFallback) {
    reasonEl.textContent = finalReason || builderFallback;
    reasonEl.classList.remove("hidden");
  } else {
    reasonEl.classList.add("hidden");
  }

  renderDiagnostics(inspector, parserResult, searchApi);
  inspector.classList.remove("hidden");
}

/**
 * Builds a Scryfall web search URL from clean query text and API metadata.
 * @param {string} query - Clean Scryfall query.
 * @param {object} [api] - API/display metadata.
 * @returns {string} Scryfall web URL.
 */
export function buildScryfallWebSearchUrl(query, api = {}) {
  const url = new URL("https://scryfall.com/search");
  url.searchParams.set("q", query);
  if (api.unique) url.searchParams.set("unique", api.unique);
  if (api.order) url.searchParams.set("order", api.order);
  if (api.dir) url.searchParams.set("dir", api.dir);
  return url.toString();
}

/**
 * Renders parser diagnostics below the primary query row.
 * @param {HTMLElement} inspector - Query Inspector container.
 * @param {object|null} result - Parser result to display.
 * @param {object} api - Search API/display metadata.
 */
function renderDiagnostics(inspector, result, api = {}) {
  let diagnostics = document.getElementById("qi-diagnostics");
  if (!diagnostics) {
    diagnostics = document.createElement("div");
    diagnostics.id = "qi-diagnostics";
    diagnostics.className = "qi-diagnostics";
    inspector.appendChild(diagnostics);
  }

  const apiItems = formatApiMetadata(api);
  if (!result && !apiItems.length) {
    diagnostics.innerHTML = "";
    diagnostics.classList.add("hidden");
    return;
  }

  diagnostics.innerHTML = `
    ${result ? renderConfidence(result.confidence) : ""}
    ${renderChipGroup("API", apiItems)}
    ${result ? renderChipGroup("Recognized", result.recognized) : ""}
    ${result ? renderChipGroup("Assumptions", result.assumptions) : ""}
    ${result ? renderChipGroup("Warnings", result.warnings, "warn") : ""}
    ${result ? renderChipGroup("Unresolved", result.unresolved, "warn") : ""}
    ${result ? renderAlternatives(result.alternatives) : ""}
  `;
  bindAlternativeButtons();
  diagnostics.classList.remove("hidden");
}

/**
 * Renders confidence as a compact status chip.
 * @param {number} confidence - Confidence score from 0 to 1.
 * @returns {string} HTML string.
 */
function renderConfidence(confidence) {
  if (!Number.isFinite(confidence)) return "";
  const pct = Math.round((confidence || 0) * 100);
  const tone = pct >= 80 ? "high" : pct >= 65 ? "medium" : "low";
  return `<div class="qi-confidence ${tone}">Confidence ${pct}%</div>`;
}

/**
 * Renders a labeled diagnostic chip group.
 * @param {string} label - Group label.
 * @param {string[]} items - Diagnostic values.
 * @param {string} [tone] - Optional tone class.
 * @returns {string} HTML string.
 */
function renderChipGroup(label, items = [], tone = "") {
  if (!items.length) return "";
  return `<div class="qi-group"><span class="qi-group-label">${escapeHtml(label)}</span>${items.map((item) => `<span class="qi-chip ${tone}">${escapeHtml(item)}</span>`).join("")}</div>`;
}

/**
 * Renders alternate parser interpretations.
 * @param {Array<object>} alternatives - Alternative query options.
 * @returns {string} HTML string.
 */
function renderAlternatives(alternatives = []) {
  if (!alternatives.length) return "";
  const rows = alternatives.map((alt) => `
    <button class="qi-alt" type="button" data-query="${escapeHtml(alt.query)}" data-api="${escapeHtml(serializeAlternativeApi(alt.api))}">
      <span>${escapeHtml(alt.label)}</span>
      <code>${escapeHtml(alt.query)}</code>
    </button>
  `).join("");
  return `<div class="qi-group qi-alt-group"><span class="qi-group-label">Alternatives</span>${rows}</div>`;
}

/**
 * Binds alternative query buttons after diagnostics are rendered.
 */
function bindAlternativeButtons() {
  document.querySelectorAll(".qi-alt").forEach((button) => {
    button.addEventListener("click", () => {
      const query = button.dataset.query || "";
      if (!query) return;
      const api = parseAlternativeApi(button.dataset.api || "");
      if (window.runQueryAlternative) {
        window.runQueryAlternative(query, api);
        return;
      }
      window.setMode?.("raw");
      const input = document.getElementById("search-input");
      if (input) input.value = query;
      window.doSearch?.();
    });
  });
}

/**
 * Parses alternative API metadata serialized into a data attribute.
 * @param {string} value - Serialized API metadata.
 * @returns {object} Parsed API metadata.
 */
export function parseAlternativeApi(value) {
  if (!value) return {};
  try {
    const api = JSON.parse(value);
    return normalizeApiMetadata(api);
  } catch {
    return {};
  }
}

/**
 * Serializes alternative API metadata for HTML data attributes.
 * @param {object} api - API metadata.
 * @returns {string} Serialized metadata or empty string.
 */
export function serializeAlternativeApi(api) {
  const normalized = normalizeApiMetadata(api);
  return Object.keys(normalized).length ? JSON.stringify(normalized) : "";
}

/**
 * Formats API metadata as human-readable Query Inspector chips.
 * @param {object} api - API metadata.
 * @returns {string[]} Metadata chips.
 */
function formatApiMetadata(api = {}) {
  const normalized = normalizeApiMetadata(api);
  return Object.entries(normalized).map(([key, value]) => `${key}: ${value}`);
}

/**
 * Keeps only supported Scryfall search metadata.
 * @param {object} api - API metadata.
 * @returns {object} Normalized metadata.
 */
function normalizeApiMetadata(api = {}) {
  const normalized = {};
  if (["cards", "art", "prints"].includes(api.unique)) normalized.unique = api.unique;
  if (api.order) normalized.order = String(api.order).toLowerCase();
  if (["auto", "asc", "desc"].includes(api.dir)) normalized.dir = api.dir;
  return normalized;
}

/**
 * Escapes user-facing diagnostic strings before injecting HTML.
 * @param {string} value - Raw display string.
 * @returns {string} Escaped HTML string.
 */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

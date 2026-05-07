/**
 * Renders the Query Inspector trust panel for raw and parser-backed searches.
 * @param {object} details - Inspector render details.
 * @param {string} details.query - Generated Scryfall query.
 * @param {string} [details.reason] - Short explanation.
 * @param {object} [details.parserResult] - Full parser diagnostics.
 */
export function renderQueryInspector({ query, reason = "", parserResult = null }) {
  const inspector = document.getElementById("query-inspector");
  if (!inspector) return;

  document.getElementById("qi-query").textContent = query;
  const reasonEl = document.getElementById("qi-reason");
  const finalReason = parserResult?.reason || reason;
  if (finalReason) {
    reasonEl.textContent = finalReason;
    reasonEl.classList.remove("hidden");
  } else {
    reasonEl.classList.add("hidden");
  }

  document.getElementById("qi-scryfall").href = `https://scryfall.com/search?q=${encodeURIComponent(query)}`;
  renderDiagnostics(inspector, parserResult);
  inspector.classList.remove("hidden");
}

/**
 * Renders parser diagnostics below the primary query row.
 * @param {HTMLElement} inspector - Query Inspector container.
 * @param {object|null} result - Parser result to display.
 */
function renderDiagnostics(inspector, result) {
  let diagnostics = document.getElementById("qi-diagnostics");
  if (!diagnostics) {
    diagnostics = document.createElement("div");
    diagnostics.id = "qi-diagnostics";
    diagnostics.className = "qi-diagnostics";
    inspector.appendChild(diagnostics);
  }

  if (!result) {
    diagnostics.innerHTML = "";
    diagnostics.classList.add("hidden");
    return;
  }

  diagnostics.innerHTML = `
    ${renderConfidence(result.confidence)}
    ${renderChipGroup("Recognized", result.recognized)}
    ${renderChipGroup("Assumptions", result.assumptions)}
    ${renderChipGroup("Unresolved", result.unresolved, "warn")}
    ${renderAlternatives(result.alternatives)}
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
    <button class="qi-alt" type="button" data-query="${escapeHtml(alt.query)}">
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
    button.onclick = () => {
      const query = button.dataset.query || "";
      if (!query) return;
      window.setMode?.("raw");
      const input = document.getElementById("search-input");
      if (input) input.value = query;
      window.doSearch?.();
    };
  });
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

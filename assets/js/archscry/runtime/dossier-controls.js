import {
  archiveUserDeckLink,
  listUserDeckLinks,
  saveUserDeckLink,
} from "../deck-link-service.js?v=vm547r5";

import {
  getDossierRadarProfile,
  initDossierManaRadar,
} from "../dossier-radar.js?v=vm547r5";

import {
  hideCardPreviewOverlay,
  hydrateVisibleResultCardArt,
} from "./card-media.js?v=vm547r5";

import {
  buildActionAttrs,
  buildManaPipsHtml,
  buildSummaryTagRowHtml,
  clearNode,
  escapeAttributeValue,
  escapeHtml,
  renderPlayerCopy,
} from "./render-utils.js?v=vm547r5";

import {
  APP_STATE,
  SESSION,
  getFaction,
} from "./state.js?v=vm547r5";

export const DOSSIER_DEFAULT_PANEL_ID = "placement";

export const DOSSIER_DEFAULT_LAYOUT_MODE = "focus";

export const DOSSIER_LAYOUT_MODES = new Set(["focus", "all"]);

export const ACCOUNT_DECK_LINKS_ENABLED = false;

export const DOSSIER_PANEL_CONFIG = [
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

export const DOSSIER_PANEL_IDS = new Set(DOSSIER_PANEL_CONFIG.map((panel) => panel.id));

export const STARTER_CARD_SEGMENTS = [
  { id: "creatures", label: "Creatures" },
  { id: "spells", label: "Instants and Sorceries" },
  { id: "permanents", label: "Enchantments and Artifacts" },
];

export const MANA_BASE_SEGMENTS = [
  { id: "basics", label: "Basics" },
  { id: "premium", label: "Premium" },
  { id: "midrange", label: "Midrange" },
  { id: "budget", label: "Budget" },
  { id: "utility", label: "Utility" },
];

export function requestedDossierViewKey() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("view") || params.get("fit") || params.get("guild") || "").toUpperCase();
}

export function normalizeDossierPanelId(value) {
  const panelId = String(value || "").trim().toLowerCase();
  if (!DOSSIER_PANEL_IDS.has(panelId)) return "";
  if (APP_STATE.hiddenDossierPanelIds?.has(panelId)) return "";
  return panelId;
}

export function normalizeDossierLayoutMode(value) {
  const layoutMode = String(value || "").trim().toLowerCase();
  return DOSSIER_LAYOUT_MODES.has(layoutMode) ? layoutMode : "";
}

export function resolveDossierConsoleState() {
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

export function updateDossierUrlState({ panel = APP_STATE.activeDossierPanel, layout = APP_STATE.dossierLayoutMode } = {}) {
  const activePanel = normalizeDossierPanelId(panel) || DOSSIER_DEFAULT_PANEL_ID;
  const layoutMode = normalizeDossierLayoutMode(layout) || DOSSIER_DEFAULT_LAYOUT_MODE;
  const url = new URL(window.location.href);
  url.searchParams.set("panel", activePanel);
  url.searchParams.set("layout", layoutMode);
  window.history.replaceState(window.history.state || {}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function captureMazeReturnUrl() {
  const params = new URLSearchParams(window.location.search);
  APP_STATE.mazeReturnUrl = params.get("mazeReturnUrl") || "";
  APP_STATE.mazeReturnAnchor = params.get("from") === "maze" && window.location.hash === "#maze-discovery-paths"
    ? "maze-discovery-paths"
    : "";
}

export function buildDossierTabsHtml(location, activePanel, layoutMode, labelOverrides = {}) {
  const active = normalizeDossierPanelId(activePanel) || DOSSIER_DEFAULT_PANEL_ID;
  const isAllMode = layoutMode === "all";
  return DOSSIER_PANEL_CONFIG.filter((panel) => !APP_STATE.hiddenDossierPanelIds?.has(panel.id)).map((panel, index) => {
    const selected = !isAllMode && panel.id === active;
    const label = labelOverrides[panel.id]?.label || panel.label;
    const shortLabel = labelOverrides[panel.id]?.mobileLabel || labelOverrides[panel.id]?.label || panel.mobileLabel || panel.label;
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
        aria-label="${escapeAttributeValue(label)}"
        ${buildActionAttrs("set-dossier-panel", { panelId: panel.id })}
      ><span class="dossier-tab-label dossier-tab-label--full">${escapeHtml(label)}</span><span class="dossier-tab-label dossier-tab-label--compact" aria-hidden="true">${escapeHtml(shortLabel)}</span></button>`;
  }).join("");
}

export function buildDossierPanelHtml({ id, activePanel, layoutMode, content }) {
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

export function buildDossierLayoutToggleHtml(layoutMode) {
  const isAllMode = layoutMode === "all";
  return `
    <button
      class="btn-secondary dossier-view-toggle${isAllMode ? " is-active" : ""}"
      type="button"
      aria-pressed="${isAllMode ? "true" : "false"}"
      ${buildActionAttrs("toggle-dossier-layout", { layout: isAllMode ? "focus" : "all" })}
    >${isAllMode ? "Focus View" : "View All"}</button>`;
}

export function buildDossierUtilityActionsHtml({ isPrimary, layoutMode }) {
  const isAllMode = layoutMode === "all";
  return `
    <div class="dossier-utility-actions" data-dossier-utility-actions ${isAllMode ? "hidden" : ""}>
      <button class="btn-secondary dossier-utility-btn" type="button" ${buildActionAttrs("retake")}>Begin Again</button>
    </div>`;
}

export function buildAccountDeckLinkPanelHtml({ result }) {
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

export function setDeckLinkStatus(message, tone = "muted") {
  const status = document.getElementById("deck-link-status");
  if (!status) return;
  status.textContent = message || "";
  status.dataset.tone = tone;
}

export function setDeckLinkControlsDisabled(disabled) {
  const root = document.querySelector("[data-account-deck-links]");
  root?.querySelectorAll("input, textarea, button").forEach((control) => {
    control.disabled = disabled;
  });
}

export function readDeckLinkFormInput() {
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

export function currentDeckLinkPlacementResult() {
  return APP_STATE.activeResult || SESSION.profile?.placementResult || vm_getCachedPlacementResult();
}

export function safeDeckLinkHref(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.href : "";
  } catch (_) {
    return "";
  }
}

export function renderAccountDeckLinks(rows = []) {
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

export async function refreshAccountDeckLinks() {
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

export async function handleSaveDeckLink() {
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

export async function handleArchiveDeckLink(actionNode) {
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

export function buildPlacementSnapshotHtml({ dossier, includeAlternative = true, tiedPeerDossier = null }) {
  const summary = dossier?.resultSummaryStrip || {};
  const adjacentFit = summary.adjacentFit || {};
  const whereThisLeads = summary.whereThisLeads || {};
  const playPattern = summary.playPattern || {};
  const activeIdentityName = dossier?.faction?.name || dossier?.targetFactionKey || "This identity";
  const contextualOpening = String(dossier?.targetFactionKey || "").toUpperCase() === "WUBRG";
  const whereThisLeadsLabel = contextualOpening
    ? (whereThisLeads.label || "Where this leads")
    : `${whereThisLeads.label || "Where this leads"} - ${activeIdentityName}`;
  const playPatternLabel = contextualOpening
    ? (playPattern.label || "Play pattern")
    : `${playPattern.label || "Play pattern"} - ${activeIdentityName}`;

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
        <span>${escapeHtml(whereThisLeadsLabel)}</span>
        <strong>${escapeHtml(whereThisLeads.heading || "Commander direction")}</strong>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(whereThisLeads.body || "This reading points toward a Commander plan with a visible, repeatable pressure pattern.")}</div>
        ${buildSummaryTagRowHtml(whereThisLeads.tags || [])}
      </div>
      <div class="dossier-snapshot-card dossier-snapshot-card--play-pattern" data-summary-card="play-pattern" data-summary-identity-key="${escapeAttributeValue(dossier?.targetFactionKey || "")}">
        <span>${escapeHtml(playPatternLabel)}</span>
        <strong>${escapeHtml(playPattern.heading || "At the table")}</strong>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(playPattern.body || "Opponents usually read this identity through the pressure it keeps visible and the answers it makes them spend.")}</div>
      </div>
      ${tiedPeerCard}
    </div>`;
}

export function normalizeDossierSegment(group, segment, segments) {
  const segmentId = String(segment || "").trim().toLowerCase();
  return segments.some((item) => item.id === segmentId) ? segmentId : segments[0]?.id || "";
}

export function availableDossierSegments(group) {
  const configured = APP_STATE.dossierAvailableSegments?.[group];
  if (Array.isArray(configured) && configured.length) {
    return configured;
  }
  return group === "mana-base" ? MANA_BASE_SEGMENTS : STARTER_CARD_SEGMENTS;
}

export function buildSegmentControlsHtml(group, segments, activeSegment, label) {
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

export function buildSegmentPanelHtml(group, segment, activeSegment, content) {
  const visible = segment === activeSegment;
  return `
    <div class="dossier-segment-panel" data-dossier-segment-panel="${group}:${segment}" ${visible ? "" : "hidden"}>
      ${content}
    </div>`;
}

export function applyDossierSegmentState(group) {
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

export function setDossierSegment(group, segment) {
  if (group !== "starter-cards" && group !== "mana-base") {
    return;
  }
  const segments = availableDossierSegments(group);
  APP_STATE.dossierSegments[group] = normalizeDossierSegment(group, segment, segments);
  applyDossierSegmentState(group);
  void hydrateVisibleResultCardArt();
}

export function applyDossierConsoleState() {
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

export function updateDossierTabOverflow(shell) {
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

export function scrollDossierTabs(direction) {
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

export function initializeDossierMobileTabs({ revealActive = false } = {}) {
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

export function setDossierPanel(panelId, { updateUrl = true } = {}) {
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
  void hydrateVisibleResultCardArt();
}

export function setDossierLayoutMode(layoutMode, { updateUrl = true } = {}) {
  const normalized = normalizeDossierLayoutMode(layoutMode) || DOSSIER_DEFAULT_LAYOUT_MODE;
  APP_STATE.dossierLayoutMode = normalized;
  hideCardPreviewOverlay();
  applyDossierConsoleState();
  if (updateUrl) {
    updateDossierUrlState();
  }
  initializeDossierRadarIfVisible();
  void hydrateVisibleResultCardArt();
}

export function isDossierRadarMeasurable() {
  const canvas = document.getElementById("dossierManaRadar");
  if (!canvas) return false;
  const panel = canvas.closest("[data-dossier-panel]");
  if (panel?.hidden) return false;
  const parent = canvas.parentElement;
  const rect = parent?.getBoundingClientRect?.() || canvas.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

export function initializeDossierRadarIfVisible(result = APP_STATE.activeResult, faction = APP_STATE.activeDossierRadarFaction) {
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

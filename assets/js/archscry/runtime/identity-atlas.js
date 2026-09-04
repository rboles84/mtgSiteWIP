import {
  buildIdentityDirectoryEntries,
  IDENTITY_DIRECTORY_GROUPS,
  resolveIdentityDirectorySlug,
} from "./identity-directory.js";

import {
  renderIdentityExplorationDossier,
  scrollToAnchorOnce,
} from "./dossier-view.js?v=vm625";

import {
  buildManaPipsHtml,
  escapeAttributeValue,
  escapeHtml,
} from "./render-utils.js";

import {
  showSection,
  updateTopbar,
} from "./navigation.js";

import {
  APP_STATE,
  SESSION,
} from "./state.js";

export function resolveIdentityExploreRequest(search, entries = []) {
  const params = new URLSearchParams(search || "");
  if (!params.has("explore")) return null;
  const requestedSlug = String(params.get("explore") || "").trim().toLowerCase();
  if (requestedSlug === "atlas") {
    return { type: "atlas", requestedSlug, invalidSlug: "", entry: null };
  }
  const entry = resolveIdentityDirectorySlug(entries, requestedSlug);
  if (entry) {
    return { type: "identity", requestedSlug, invalidSlug: "", entry };
  }
  return { type: "atlas", requestedSlug, invalidSlug: requestedSlug || "(empty)", entry: null };
}

export function hasSavedArchscryReading() {
  if (SESSION.profile?.placementResult) return true;
  try {
    return typeof globalThis.vm_getCachedPlacementResult === "function" && Boolean(globalThis.vm_getCachedPlacementResult());
  } catch (_) {
    return false;
  }
}

function buildIdentityCardHtml(entry) {
  const accessibleCode = entry.colorCode || "Colorless";
  return `
    <a class="identity-atlas-card idcard" href="?explore=${encodeURIComponent(entry.slug)}" aria-label="Explore the ${escapeAttributeValue(entry.name)} dossier, ${escapeAttributeValue(accessibleCode)}">
      ${buildIdentityAtlasSigilHtml(entry.colors)}
      <span class="identity-atlas-name nm">${escapeHtml(entry.name)}</span>
      <span class="identity-atlas-code sb">${escapeHtml(entry.colorCode)}</span>
      <span class="identity-atlas-card-pips pips" aria-hidden="true">
        ${buildManaPipsHtml(entry.colors, "identity-atlas-inline-pips")}
      </span>
    </a>`;
}

const IDENTITY_SIGIL_POINTS = [
  { color: "W", x: 100, y: 32 },
  { color: "U", x: 164.7, y: 79 },
  { color: "B", x: 140, y: 155 },
  { color: "R", x: 60, y: 155 },
  { color: "G", x: 35.3, y: 79 },
];

function buildIdentitySigilArc(point, nextPoint) {
  return `<path d="M${point.x} ${point.y} A68 68 0 0 1 ${nextPoint.x} ${nextPoint.y}" fill="none" stroke="var(--gold)" stroke-opacity=".72" stroke-width="3" stroke-linecap="round"></path>`;
}

export function buildIdentityAtlasSigilHtml(colors = []) {
  const activeColors = new Set(
    (Array.isArray(colors) ? colors : String(colors || "").split(""))
      .map((color) => String(color || "").toUpperCase())
      .filter((color) => "WUBRG".includes(color))
  );
  const arcs = IDENTITY_SIGIL_POINTS.map((point, index) => {
    const nextPoint = IDENTITY_SIGIL_POINTS[(index + 1) % IDENTITY_SIGIL_POINTS.length];
    return activeColors.has(point.color) && activeColors.has(nextPoint.color)
      ? buildIdentitySigilArc(point, nextPoint)
      : "";
  }).join("");
  const nodes = IDENTITY_SIGIL_POINTS.map((point) => activeColors.has(point.color)
    ? `<circle cx="${point.x}" cy="${point.y}" r="12" fill="var(--atlas-${point.color})" fill-opacity=".9" stroke="rgba(0,0,0,.4)" stroke-width="1"></circle><circle cx="${point.x}" cy="${point.y}" r="16.5" fill="none" stroke="var(--atlas-${point.color})" stroke-opacity=".28" stroke-width="1"></circle>`
    : `<circle cx="${point.x}" cy="${point.y}" r="8" fill="var(--atlas-ink-3)" stroke="var(--atlas-line-2)" stroke-width="1"></circle>`
  ).join("");

  return `
      <span class="identity-atlas-sigil atlas-sigil" aria-hidden="true">
        <svg viewBox="0 0 200 200" focusable="false">
          <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(58,66,86,.55)" stroke-width="1.2"></circle>
          ${arcs}
          <circle cx="100" cy="100" r="27" fill="rgba(201,162,75,.05)" stroke="var(--gold-dim)" stroke-opacity=".7" stroke-width="1"></circle>
          <text class="identity-atlas-sigil-core sigil-core" x="100" y="102">&#xe623;</text>
          ${nodes}
        </svg>
      </span>`;
}

export function buildIdentityAtlasHtml(entries = [], { invalidSlug = "", hasSavedReading = false } = {}) {
  const groups = IDENTITY_DIRECTORY_GROUPS.map((group) => ({
    ...group,
    entries: entries.filter((entry) => entry.kind === group.kind),
  })).filter((group) => group.entries.length);
  const commanderIdentityCount = entries.filter((entry) => !entry.isStrixhavenExpression).length;
  const strixhavenExpressionCount = entries.filter((entry) => entry.isStrixhavenExpression).length;
  const recoveryHtml = invalidSlug ? `
    <p class="identity-atlas-recovery" role="status">
      The requested identity was unavailable. Choose another dossier from the Atlas.
    </p>` : "";
  const savedReadingLink = hasSavedReading ? `
    <a class="btn-secondary identity-atlas-saved-link" href="./index.html">Return to your saved reading</a>` : "";
  const groupHtml = groups.map((group) => `
    <section class="identity-atlas-group" aria-labelledby="identity-atlas-group-${escapeAttributeValue(group.id)}">
      <div class="identity-atlas-group-heading">
        <h2 id="identity-atlas-group-${escapeAttributeValue(group.id)}">${escapeHtml(group.label)}</h2>
        <span>${group.entries.length}</span>
      </div>
      <div class="identity-atlas-grid">
        ${group.entries.map(buildIdentityCardHtml).join("")}
      </div>
    </section>`).join("");

  return `
    <div class="identity-atlas-shell" data-identity-atlas data-destination-count="${entries.length}" data-commander-identity-count="${commanderIdentityCount}" data-strixhaven-expression-count="${strixhavenExpressionCount}">
      <header class="identity-atlas-hero">
        <div class="eyebrow">Identity Atlas</div>
        <h1 id="identity-atlas-heading" tabindex="-1">Explore Vox Mana's Identity Atlas.</h1>
        <p>Browse all 32 Commander color identities plus five Strixhaven expressions. Choose any one to explore its dossier—no reading required.</p>
        ${savedReadingLink}
        ${recoveryHtml}
      </header>
      <nav class="identity-atlas-board" aria-label="Vox Mana identity dossiers">
        ${groupHtml}
      </nav>
    </div>`;
}

export function renderIdentityAtlas(entries, options = {}) {
  const root = document.getElementById("identity-atlas-inner");
  if (!root) throw new Error("Identity Atlas container is unavailable.");
  root.innerHTML = buildIdentityAtlasHtml(entries, options);
  document.title = "Identity Atlas - Vox Mana";
  showSection("atlas");
  updateTopbar();
  requestAnimationFrame(() => root.querySelector("#identity-atlas-heading")?.focus({ preventScroll: true }));
}

export function initializeIdentityExploration() {
  const entries = buildIdentityDirectoryEntries({
    identityLayers: APP_STATE.identityLayers,
    factions: APP_STATE.factions,
  });
  const request = resolveIdentityExploreRequest(window.location.search, entries);
  if (!request) return false;

  const hasSavedReading = hasSavedArchscryReading();
  if (request.type === "atlas") {
    renderIdentityAtlas(entries, { invalidSlug: request.invalidSlug, hasSavedReading });
    return true;
  }

  try {
    renderIdentityExplorationDossier(request.entry.key, {
      exploreSlug: request.entry.slug,
      hasSavedReading,
    });
    document.title = `${request.entry.name} Dossier - Vox Mana`;
    if (window.location.hash === "#maze-discovery-paths") {
      scrollToAnchorOnce("maze-discovery-paths");
    }
  } catch (_) {
    renderIdentityAtlas(entries, { invalidSlug: request.requestedSlug, hasSavedReading });
  }
  return true;
}

const PRODUCTION_SOURCE_URL = new URL("../../../assets/js/index.js", import.meta.url);
const PRODUCTION_DATA_URL = new URL("../../../data/", import.meta.url);

let authorityPromise = null;
let authorityModule = null;

function rewriteModuleImports(source) {
  return source.replace(
    /from\s+(["'])(\.\.?\/[^"']+)\1/g,
    (_match, quote, specifier) => `from ${quote}${new URL(specifier, PRODUCTION_SOURCE_URL).href}${quote}`
  );
}

function buildPreviewAuthoritySource(source) {
  const bootMarker = "// Boot, restore, compatibility exports, and session events.";
  const bootIndex = source.indexOf(bootMarker);
  if (bootIndex < 0) {
    throw new Error("Production Archscry boot boundary was not found.");
  }

  const withoutLiveBoot = source.slice(0, bootIndex);
  const withAbsoluteImports = rewriteModuleImports(withoutLiveBoot).replace(
    'const DATA_BASE_URL = new URL("../../data/", import.meta.url);',
    `const DATA_BASE_URL = new URL(${JSON.stringify(PRODUCTION_DATA_URL.href)});`
  );

  return `${withAbsoluteImports}

let vm551PreviewControls = null;
let vm551OriginalCache = null;
let vm551OriginalProfile = null;
let vm551OriginalCardArtFlag;
let vm551OriginalMazeHandoff = null;

function vm551EnsureTopbarCompatibilityNodes() {
  const bar = document.getElementById("topbar");
  if (!bar) return;
  const ids = ["tb-identity", "tb-signout", "tb-retake", "tb-avatar", "tb-name", "tb-placement"];
  ids.forEach((id) => {
    if (document.getElementById(id)) return;
    const node = document.createElement(id === "tb-signout" || id === "tb-retake" ? "button" : "span");
    node.id = id;
    node.hidden = true;
    node.classList.add("hidden");
    bar.appendChild(node);
  });
}

function vm551DisablePersistence() {
  if (!vm551OriginalCache) vm551OriginalCache = vm_cachePlacementResult;
  vm_cachePlacementResult = () => {};
  if (!vm551OriginalMazeHandoff) vm551OriginalMazeHandoff = writeArchscryDossierHandoff;
  writeArchscryDossierHandoff = () => {};
  if (vm551OriginalProfile === null) vm551OriginalProfile = SESSION._profile;
  vm551OriginalCardArtFlag = globalThis.__vmVisualRegressionDisableCardArt;
  globalThis.__vmVisualRegressionDisableCardArt = true;
}

function vm551RestorePageState() {
  vm551PreviewControls?.abort();
  vm551PreviewControls = null;
  if (vm551OriginalCache) vm_cachePlacementResult = vm551OriginalCache;
  vm551OriginalCache = null;
  if (vm551OriginalMazeHandoff) writeArchscryDossierHandoff = vm551OriginalMazeHandoff;
  vm551OriginalMazeHandoff = null;
  SESSION._profile = vm551OriginalProfile;
  vm551OriginalProfile = null;
  globalThis.__vmVisualRegressionDisableCardArt = vm551OriginalCardArtFlag;
  vm551OriginalCardArtFlag = undefined;
  destroyDossierManaRadar();
  APP_STATE.activeResult = null;
  APP_STATE.activeViewKey = null;
}

function vm551BindSafeControls(onBeginAgain) {
  vm551PreviewControls?.abort();
  vm551PreviewControls = new AbortController();
  const options = { signal: vm551PreviewControls.signal };
  const app = document.querySelector(".app");
  app?.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const actionNode = target?.closest?.("[data-action]");
    if (!(actionNode instanceof HTMLElement)) return;
    const action = actionNode.dataset.action || "";
    if (["save-current-result", "save-placement", "save-deck-link", "archive-deck-link", "refresh-deck-links", "sign-out"].includes(action)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      document.querySelector("[data-preview-persistence-note]")?.removeAttribute("hidden");
      return;
    }
    if (["retake", "start-quick-flow", "resume-quick-flow"].includes(action)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      onBeginAgain();
      return;
    }
    switch (action) {
      case "set-dossier-panel":
        setDossierPanel(actionNode.dataset.panelId || "");
        break;
      case "scroll-dossier-tabs":
        scrollDossierTabs(actionNode.dataset.direction || "right");
        break;
      case "toggle-dossier-layout":
        setDossierLayoutMode(actionNode.dataset.layout || "focus");
        break;
      case "set-dossier-segment":
        setDossierSegment(actionNode.dataset.segmentGroup || "", actionNode.dataset.segment || "");
        break;
      case "toggle-precon-preview":
        togglePreconPreview(actionNode);
        break;
      case "switch-adjacent-view":
        switchAdjacentView(actionNode.dataset.viewKey || "");
        break;
      case "return-primary-reading":
        returnToPrimaryReading();
        break;
      default:
        return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
  }, { ...options, capture: true });
  app?.addEventListener("keydown", handleArchscryKeydown, options);
  app?.addEventListener("pointerover", handleCardPreviewPointerOver, options);
  app?.addEventListener("pointermove", handleCardPreviewPointerMove, options);
  app?.addEventListener("pointerout", handleCardPreviewPointerOut, options);
  app?.addEventListener("focusin", handleCardPreviewFocusIn, options);
  app?.addEventListener("focusout", handleCardPreviewFocusOut, options);
  window.addEventListener("scroll", hideCardPreviewOverlay, { ...options, passive: true, capture: true });
  window.addEventListener("resize", () => initializeDossierMobileTabs(), { ...options, passive: true });
}

export async function vm551RenderProductionDossier({ result, authoredState, onBeginAgain }) {
  vm551EnsureTopbarCompatibilityNodes();
  vm551DisablePersistence();
  SESSION._profile = { placementResult: result };
  if (!APP_STATE.placementModel) {
    await loadFactionData();
    await loadPlacementModel();
    await loadDeckTagCatalog();
    await loadIdentityLayerData();
    await loadDiscoveryData();
  }
  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
  APP_STATE.resultSource = "preview";
  APP_STATE.returnSection = null;
  renderResult(result.faction);
  if (authoredState === "close") {
    const [heading, copy] = gateAStatePresentation("close");
    const banner = document.querySelector(".result-state-banner");
    if (banner) {
      banner.dataset.resultState = "close";
      const strong = banner.querySelector("strong");
      const span = banner.querySelector("span");
      if (strong) strong.textContent = heading;
      if (span) span.textContent = copy;
    }
  }
  vm551BindSafeControls(onBeginAgain);
}

export function vm551DisposeProductionDossier() {
  vm551RestorePageState();
}
`;
}

async function loadAuthorityModule() {
  if (authorityModule) return authorityModule;
  if (!authorityPromise) {
    authorityPromise = (async () => {
      const response = await fetch(PRODUCTION_SOURCE_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not load production dossier authority: ${response.status}`);
      const source = buildPreviewAuthoritySource(await response.text());
      const blobUrl = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
      try {
        authorityModule = await import(blobUrl);
        return authorityModule;
      } finally {
        URL.revokeObjectURL(blobUrl);
      }
    })();
  }
  return authorityPromise;
}

export async function renderProductionDossier(options) {
  const authority = await loadAuthorityModule();
  return authority.vm551RenderProductionDossier(options);
}

export async function disposeProductionDossier() {
  if (!authorityModule) return;
  authorityModule.vm551DisposeProductionDossier();
}

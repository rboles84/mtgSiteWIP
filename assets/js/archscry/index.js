import {
  bindArchscryControls,
} from "./runtime/actions.js";

import {
  renderInitializationError,
  restoreInitialView,
} from "./runtime/boot.js";

import {
  loadDeckTagCatalog,
  loadDiscoveryData,
  loadDossierContentAuthority,
  loadFactionData,
  loadIdentityLayerData,
  loadPlacementModel,
  validateQuickReadingReachability,
} from "./runtime/data.js";

import {
  handleSavePlacement,
  renderResult,
  returnToPrimaryReading,
  saveCurrentResult,
  switchAdjacentView,
} from "./runtime/dossier-view.js";

import {
  openInterviewDossier,
  returnToInterviewSource,
  startInterviewFlow,
  submitInterview,
} from "./runtime/interview.js";

import {
  applyTerminalVisibility,
  handleRetake,
  handleSignOut,
  openLibrary,
  openResearch,
  showSection,
  updateInterviewControls,
  updateTopbar,
} from "./runtime/navigation.js";

import {
  answerQuickQuestion,
  goBackQuickQuestion,
  startQuickFlow,
} from "./runtime/questionnaire.js";

import {
  APP_STATE,
  SESSION,
} from "./runtime/state.js";

import {
  initializeVoxTelemetry,
} from "../shared/vox-telemetry.js";

export {
  validateDossierContentCatalogs,
} from "./runtime/data.js";

export {
  basicLandGuidanceCopy,
  normalizeStarterCardGroups,
  identityMetaLabelForDisplay,
  buildDossierRenderState,
  heroBannerImageSlugForFaction,
  heroBannerArtworkForFaction,
  heroBannerBackgroundForFaction,
  heroBannerArtworkAttributionForFaction,
  selectCuratedFlavorEchoesForFaction,
  selectFlavorEchoes,
} from "./runtime/dossier-view.js";

export {
  renderPlayerCopy,
  renderManaCost,
} from "./runtime/render-utils.js";

export {
  approvedCardRationaleForFaction,
  selectApprovedCardRationales,
  selectApprovedCardVoices,
  cardVoiceAvailabilityForFaction,
  buildCardVoicesHtml,
  buildFlavorEchoesHtml,
} from "./runtime/content.js";

export {
  resolveScryfallNamedCard,
  loadCachedScryfallNamedCard,
} from "./runtime/card-media.js";

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
  initializeVoxTelemetry();
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

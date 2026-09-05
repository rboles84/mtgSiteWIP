import {
  bindArchscryControls,
} from "./runtime/actions.js?v=vm625";

import {
  renderInitializationError,
  restoreInitialView,
} from "./runtime/boot.js?v=vm625";

import {
  loadDeckTagCatalog,
  loadDiscoveryData,
  loadDossierContentAuthority,
  loadFactionData,
  loadIdentityLayerData,
  loadPlacementModel,
  validateQuickReadingReachability,
} from "./runtime/data.js?v=vm547r3";

import {
  renderResult,
  returnToPrimaryReading,
  switchAdjacentView,
} from "./runtime/dossier-view.js?v=vm547r3";

import {
  openInterviewDossier,
  returnToInterviewSource,
  startInterviewFlow,
  submitInterview,
} from "./runtime/interview.js?v=vm625";

import {
  applyTerminalVisibility,
  handleRetake,
  handleSignOut,
  openLibrary,
  openResearch,
  showSection,
  updateInterviewControls,
} from "./runtime/navigation.js";

import {
  answerQuickQuestion,
  goBackQuickQuestion,
  startQuickFlow,
} from "./runtime/questionnaire.js?v=vm625";

import {
  APP_STATE,
  SESSION,
} from "./runtime/state.js";

import {
  initializeVoxTelemetry,
} from "../shared/vox-telemetry.js";

import {
  isArchscryDevReviewLocation,
} from "./runtime/dev-review-gate.js";

import {
  initializeIdentityExploration,
} from "./runtime/identity-atlas.js?v=vm625h";

export {
  validateDossierContentCatalogs,
} from "./runtime/data.js?v=vm547r3";

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
} from "./runtime/dossier-view.js?v=vm547r3";

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
  if (new URLSearchParams(window.location.search).has("explore")) {
    return;
  }
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
  handleSignOut,
  openInterviewDossier,
  openLibrary,
  openResearch,
  returnToInterviewSource,
  returnToPrimaryReading,
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

  if (!initializeIdentityExploration()) {
    restoreInitialView(false);
  }

  if (isArchscryDevReviewLocation(window.location)) {
    const { initializeArchscryDevReview } = await import("./runtime/dev-review.js?v=vm625");
    initializeArchscryDevReview();
  }
});

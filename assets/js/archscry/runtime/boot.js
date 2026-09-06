import {
  captureMazeReturnUrl,
  requestedDossierViewKey,
} from "./dossier-controls.js?v=vm636";

import {
  readArchscryDossierHandoff,
  renderResult,
  scrollToAnchorOnce,
} from "./dossier-view.js?v=vm636";

import {
  showSection,
} from "./navigation.js?v=vm636";

import {
  clearNode,
} from "./render-utils.js?v=vm636";

import {
  APP_STATE,
  SESSION,
} from "./state.js?v=vm636";

export function renderInitializationError(error) {
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

export function restoreInitialView(savedFromOAuth) {
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

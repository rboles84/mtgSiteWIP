import {
  destroyDossierManaRadar,
} from "../dossier-radar.js";

import {
  createInitialAdaptiveState,
} from "../gate-b1-placement-engine.js";

import {
  clearNode,
} from "./render-utils.js";

import {
  APP_STATE,
  SESSION,
  getFaction,
} from "./state.js";

export function isScryingTerminalEnabled() {
  return globalThis.VM_SITE_FLAGS?.SCRYING_TERMINAL_ENABLED === true;
}

export function applyTerminalVisibility() {
  const enabled = isScryingTerminalEnabled();

  document.querySelectorAll("[data-vm-terminal-only]").forEach((node) => {
    node.hidden = !enabled;
  });

  const interviewSection = document.getElementById("interview");
  if (interviewSection) {
    interviewSection.hidden = !enabled;
  }
}

/**
 * Loads the canonical faction data file used by both quick mode and result rendering.
 *
 * @returns {Promise<object>} Canonical faction map keyed by faction code.
 */

export function showSection(id) {
  if (id === "interview" && !isScryingTerminalEnabled()) {
    id = "landing";
  }

  ["landing", "quick", "interview", "result"].forEach((sectionId) => {
    const node = document.getElementById(sectionId);
    if (node) {
      node.classList.toggle("hidden", sectionId !== id);
    }
  });
  window.scrollTo(0, 0);
}

/**
 * Updates the topbar based on the current session and saved-placement state.
 */

export function updateTopbar() {
  const bar = document.getElementById("topbar");
  const identity = document.getElementById("tb-identity");
  const signOut = document.getElementById("tb-signout");
  const retake = document.getElementById("tb-retake");
  const avatar = document.getElementById("tb-avatar");
  const name = document.getElementById("tb-name");
  const placement = document.getElementById("tb-placement");
  const profileResult = SESSION.profile?.placementResult || null;
  const activeResult = APP_STATE.activeResult || profileResult;
  const faction = getFaction(activeResult?.faction);

  bar.classList.remove("hidden");

  if (!SESSION.username) {
    identity.classList.add("hidden");
    signOut.classList.add("hidden");
    retake.classList.add("hidden");
    return;
  }

  identity.classList.remove("hidden");
  signOut.classList.remove("hidden");
  retake.classList.toggle("hidden", !activeResult);
  name.textContent = SESSION.username;
  placement.textContent = faction ? `${faction.name}` : "Signed in";

  clearNode(avatar);
  if (SESSION.avatarUrl) {
    const image = document.createElement("img");
    image.src = SESSION.avatarUrl;
    image.alt = SESSION.username || "Signed-in user";
    avatar.appendChild(image);
  } else {
    const fallback = document.createElement("span");
    fallback.className = "tb-avatar-fallback";
    fallback.textContent = (SESSION.username[0] || "?").toUpperCase();
    avatar.appendChild(fallback);
  }
}

/**
 * Opens the research page.
 */

export function openResearch() {
  window.location = "../maze/index.html";
}

/**
 * Opens Apocrypha.
 */

export function openLibrary() {
  window.location = "../apocrypha/index.html";
}

/**
 * Resets local quick-path state and interview UI back to a neutral state.
 */

export function resetLocalFlow() {
  destroyDossierManaRadar();
  APP_STATE.quickIndex = 0;
  APP_STATE.quickAnswers = [];
  APP_STATE.quickSelections = [];
  APP_STATE.adaptiveState = APP_STATE.placementModel
    ? createInitialAdaptiveState(APP_STATE.placementModel)
    : null;
  APP_STATE.currentQuickQuestion = null;
  APP_STATE.quickTransition = null;
  APP_STATE.refinementMode = false;
  APP_STATE.refinementOriginResult = null;
  APP_STATE.activeResult = null;
  APP_STATE.activeViewKey = null;
  APP_STATE.interviewState = "idle";
  vm_resetInterview();
  const output = document.getElementById("terminal-output");
  const decree = document.getElementById("decree-container");
  if (output) {
    output.innerHTML = "";
    output.style.opacity = "1";
  }
  if (decree) {
    decree.classList.remove("visible");
  }
  document.getElementById("terminal-error").textContent = "";
  document.getElementById("terminal-status").textContent = "";
  document.getElementById("terminal-input").value = "";
  updateInterviewControls("idle");
}

/**
 * Clears the saved placement when needed and returns the app to the landing page.
 */

export async function handleRetake() {
  const confirmMessage = SESSION.username
    ? "Begin again? This will clear your saved reading and return you to the gate."
    : "Begin again? This will leave this reading and return you to the gate.";
  if (typeof window !== "undefined" && typeof window.confirm === "function" && !window.confirm(confirmMessage)) {
    return;
  }
  if (SESSION.username) {
    await vm_clearPlacement();
  }
  resetLocalFlow();
  updateTopbar();
  showSection("landing");
}

/**
 * Signs the user out and returns to the landing page.
 */

export async function handleSignOut() {
  await vm_signOut();
  resetLocalFlow();
  updateTopbar();
  showSection("landing");
}

// Adaptive quick-reading flow.

/**
 * Starts the adaptive Gate -> Hall -> Crucible quick reading flow.
 */

export function updateInterviewControls(state, turn) {
  APP_STATE.interviewState = state;
  const input = document.getElementById("terminal-input");
  const submit = document.getElementById("terminal-submit");
  const status = document.getElementById("terminal-status");
  const loading = state === "loading";
  const decided = state === "decided";

  input.disabled = loading || decided;
  submit.disabled = loading || decided || input.value.trim().length < 3;
  status.textContent = turn ? `Interviewing... Turn ${turn} of 5` : "";
}

/**
 * Appends a line to the Scrying Terminal transcript.
 *
 * @param {"recruiter"|"user"} role Speaker role.
 * @param {string} content Text content to append.
 * @param {boolean=} loading True when the line is a loading placeholder.
 * @returns {HTMLElement} Appended message element.
 */

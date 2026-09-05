import {
  closeAlternativeForResult,
  gateAStatePresentation,
  withGateAPublicState,
} from "../archscry-presentation.js?v=vm547r5";

import {
  renderResult,
} from "./dossier-view.js?v=vm547r5";

import {
  isScryingTerminalEnabled,
  showSection,
  updateInterviewControls,
  updateTopbar,
} from "./navigation.js?v=vm547r5";

import {
  APP_STATE,
  getFaction,
  getStarterProfile,
} from "./state.js?v=vm547r5";

export async function startInterviewFlow() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  showSection("interview");
  resetInterviewDossier();
  await beginInterview();
}

/**
 * Returns to the previous quick question when possible.
 */

export function appendTerminalMessage(role, content, loading) {
  const output = document.getElementById("terminal-output");
  const line = document.createElement("div");
  line.className = `terminal-message ${role}${loading ? " loading" : ""}`;
  line.textContent = content;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
  return line;
}

/**
 * Resets the decree panel before a new interview begins.
 */

export function resetInterviewDossier() {
  document.getElementById("terminal-output").innerHTML = "";
  document.getElementById("decree-container").classList.remove("visible");
  document.getElementById("terminal-error").textContent = "";
  document.getElementById("terminal-status").textContent = "";
  document.getElementById("terminal-input").value = "";
  updateInterviewControls("idle");
}

/**
 * Starts the terminal interview and loads the opening recruiter prompt.
 *
 * @returns {Promise<void>} Resolves once the opening prompt is rendered.
 */

export async function beginInterview() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  resetInterviewDossier();
  updateInterviewControls("loading", 1);
  const loader = appendTerminalMessage("recruiter", "The scrying glass hums.", true);

  try {
    const data = await vm_startInterview({
      starter_profile: getStarterProfile(),
      current_result: APP_STATE.activeResult || null,
    });
    loader.remove();
    appendTerminalMessage("recruiter", data.response || "Speak, and be weighed.");
    updateInterviewControls("interviewing", data.turn || 1);
    document.getElementById("terminal-input").focus();
  } catch (error) {
    loader.remove();
    document.getElementById("terminal-error").textContent =
      "The Scrying Terminal failed to open cleanly. Wait a breath, then try again.";
    updateInterviewControls("idle");
  }
}

/**
 * Submits the user's next interview reply to the edge function.
 *
 * @returns {Promise<void>} Resolves once the response is rendered.
 */

export async function submitInterview() {
  if (!isScryingTerminalEnabled()) {
    showSection("landing");
    return;
  }

  const input = document.getElementById("terminal-input");
  const text = input.value.trim();
  if (text.length < 3 || APP_STATE.interviewState === "loading" || APP_STATE.interviewState === "decided") {
    return;
  }

  document.getElementById("terminal-error").textContent = "";
  appendTerminalMessage("user", text);
  input.value = "";
  updateInterviewControls("loading");
  const loader = appendTerminalMessage("recruiter", "Interpreting your answer", true);

  try {
    const data = await vm_conductInterview(text);
    loader.remove();
    appendTerminalMessage("recruiter", data.response || "The glass stills.");

    if (data.decided && data.result) {
      await revealDecree(data.result);
      updateInterviewControls("decided", data.turn || 5);
    } else {
      updateInterviewControls("interviewing", data.turn || undefined);
      input.focus();
    }
  } catch (error) {
    loader.remove();
    document.getElementById("terminal-error").textContent =
      "The terminal lost the thread. Try one concrete answer about what you would do next.";
    updateInterviewControls("interviewing");
    input.focus();
  }
}

/**
 * Renders the interview decree and caches the active result for the dossier page.
 *
 * @param {object} result Normalized interview result.
 * @returns {Promise<void>} Resolves after the reveal animation has completed.
 */

export function revealDecree(result) {
  return new Promise((resolve) => {
    const publicResult = withGateAPublicState({
      result,
      placementModel: APP_STATE.placementModel,
      factions: APP_STATE.factions,
    });
    const state = publicResult.result_state;
    const [stateLabel, stateCopy] = gateAStatePresentation(state);
    const suppressNamedIdentity = ["mixed", "contradictory", "insufficient", "invalid", "incomplete"].includes(state);
    const closeAlternative = closeAlternativeForResult(publicResult, APP_STATE.placementModel, APP_STATE.factions);
    const tiedMatch = state === "tied" ? publicResult.top_matches?.[1] : null;
    const decree = document.getElementById("decree-container");
    const rule = document.getElementById("decree-rule");
    const faction = getFaction(publicResult.faction) || {};

    APP_STATE.activeResult = publicResult;
    APP_STATE.activeViewKey = publicResult.faction;
    APP_STATE.resultSource = "interview";
    APP_STATE.returnSection = "interview";
    vm_cachePlacementResult(publicResult);

    setTimeout(() => {
      document.getElementById("terminal-output").style.opacity = "0.4";
      document.getElementById("decree-title").textContent = suppressNamedIdentity
        ? stateLabel
        : state === "tied"
        ? `Tied: ${publicResult.faction_name || publicResult.faction} and ${tiedMatch?.faction_name || tiedMatch?.faction}`
        : `Current best fit: ${publicResult.faction_name || publicResult.faction || "Unbound Order"}`;
      document.getElementById("decree-tagline").textContent = "Archscry reading";
      document.getElementById("decree-text").textContent = suppressNamedIdentity
        ? stateCopy
        : "These answers brought this identity forward. The result is a bounded reading, not a prediction about you or your deck.";
      document.getElementById("decree-runner").textContent = suppressNamedIdentity
        ? ""
        : tiedMatch
        ? "Your answers supported both readings without clearly separating them."
        : closeAlternative
          ? `Close alternative: ${closeAlternative.match.faction_name || closeAlternative.match.faction}. Close is relative within this reading; it is not a certainty claim.`
          : "";
      rule.style.background = faction.accent || "var(--gold-d)";
      decree.classList.add("visible");
      resolve();
    }, 1200);
  });
}

/**
 * Opens the full dossier from an interview result without requiring a save first.
 */

export function openInterviewDossier() {
  if (!APP_STATE.activeResult) {
    return;
  }
  APP_STATE.resultSource = "interview";
  APP_STATE.returnSection = "interview";
  if (!history.state?.vmDossier) {
    history.pushState({ vmDossier: true, returnSection: "interview" }, "", "#dossier");
  }
  renderResult();
}

/**
 * Returns from an interview-sourced dossier to the Scrying Terminal context.
 */

export function returnToInterviewSource() {
  APP_STATE.returnSection = null;
  showSection("interview");
  updateTopbar();
}

// Save controls, external links, precon previews, and Maze handoff payloads.

/**
 * Saves the current active placement using Google OAuth when needed.
 *
 * @returns {Promise<void>} Resolves when the save flow has been started or completed.
 */

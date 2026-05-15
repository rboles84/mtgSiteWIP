import {
  DEFAULT_STARTER_PROFILE,
  MANA_ORDER,
  RESULT_VERSION,
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  getStageLabel,
  replayAdaptiveSelections,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
} from "./adaptive-placement.js";
import {
  buildCommanderDossier,
  createArchidektTagCatalog,
  getColorIdentity,
  getServiceChipMeta,
} from "./commander-dossier.js";

const SESSION = VM_SESSION;
const COLOR_META = {
  W: { label: "White", fill: "#ede8d4" },
  U: { label: "Blue", fill: "#2a7ac8" },
  B: { label: "Black", fill: "linear-gradient(90deg,#08060b 0%,#291b3d 48%,#0f0c12 100%)" },
  R: { label: "Red", fill: "#d04030" },
  G: { label: "Green", fill: "#2a8a30" },
};

const APP_STATE = {
  factions: {},
  placementModel: null,
  quickIndex: 0,
  quickAnswers: [],
  quickSelections: [],
  adaptiveState: null,
  currentQuickQuestion: null,
  activeResult: null,
  activeViewKey: null,
  resultSource: "quick",
  returnSection: null,
  interviewState: "idle",
  starterProfile: { ...DEFAULT_STARTER_PROFILE },
  deckTagCatalog: null,
};

/**
 * Returns true when the Scrying Terminal should be shown and wired up.
 *
 * @returns {boolean} True when the terminal is enabled.
 */
function isScryingTerminalEnabled() {
  return globalThis.VM_SITE_FLAGS?.SCRYING_TERMINAL_ENABLED === true;
}

/**
 * Applies the feature flag to terminal-only UI already in the DOM.
 */
function applyTerminalVisibility() {
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
async function loadFactionData() {
  const response = await fetch("/data/factions.json");
  if (!response.ok) {
    throw new Error("Could not load faction data.");
  }
  const json = await response.json();
  APP_STATE.factions = json.factions || {};
  return APP_STATE.factions;
}

/**
 * Loads the adaptive placement model used by the Gate -> Hall -> Crucible flow.
 *
 * @returns {Promise<object>} Generated placement model.
 */
async function loadPlacementModel() {
  const response = await fetch("/data/placement-model.json");
  if (!response.ok) {
    throw new Error("Could not load placement model.");
  }
  APP_STATE.placementModel = await response.json();
  return APP_STATE.placementModel;
}

/**
 * Loads the expanded Archidekt tag catalog used to build validated deck searches.
 *
 * @returns {Promise<object>} Resolved tag catalog.
 */
async function loadDeckTagCatalog() {
  const response = await fetch("/data/deck-tags_expanded.json");
  if (!response.ok) {
    throw new Error("Could not load Commander deck tags.");
  }
  APP_STATE.deckTagCatalog = createArchidektTagCatalog(await response.json());
  return APP_STATE.deckTagCatalog;
}

/**
 * Returns the canonical faction entry for a given key.
 *
 * @param {string} key Faction key.
 * @returns {object|null} Faction record when present.
 */
function getFaction(key) {
  return APP_STATE.factions[key] || null;
}

/**
 * Returns the user-facing label for a faction's institution type.
 *
 * @param {object} faction Faction record.
 * @returns {string} "Guild" or "College".
 */
function getInstitutionLabel(faction) {
  return faction?.institution_type === "college" ? "College" : "Guild";
}

/**
 * Shows a single application section and scrolls back to the top of the page.
 *
 * @param {string} id Section id to reveal.
 */
function showSection(id) {
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
function updateTopbar() {
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

  if (SESSION.avatarUrl) {
    avatar.innerHTML = `<img src="${SESSION.avatarUrl}" alt="${SESSION.username}">`;
  } else {
    avatar.innerHTML = `<span class="tb-avatar-fallback">${(SESSION.username[0] || "?").toUpperCase()}</span>`;
  }
}

/**
 * Opens the research page.
 */
function openResearch() {
  window.location = "/maze.html";
}

/**
 * Opens The Implicit Maze library.
 */
function openLibrary() {
  window.location = "/library/";
}

/**
 * Resets local quick-path state and interview UI back to a neutral state.
 */
function resetLocalFlow() {
  APP_STATE.quickIndex = 0;
  APP_STATE.quickAnswers = [];
  APP_STATE.quickSelections = [];
  APP_STATE.adaptiveState = APP_STATE.placementModel
    ? createInitialAdaptiveState(APP_STATE.placementModel)
    : null;
  APP_STATE.currentQuickQuestion = null;
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
async function handleRetake() {
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
async function handleSignOut() {
  await vm_signOut();
  resetLocalFlow();
  updateTopbar();
  showSection("landing");
}

/**
 * Starts the adaptive Gate -> Hall -> Crucible quick reading flow.
 */
function startQuickFlow() {
  if (!APP_STATE.placementModel) {
    alert("The placement model is still loading. Try again in a moment.");
    return;
  }

  APP_STATE.adaptiveState = createInitialAdaptiveState(APP_STATE.placementModel);
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickSelections = [];
  APP_STATE.quickAnswers = [];
  APP_STATE.quickIndex = 0;
  showSection("quick");
  renderQuickQuestion();
}

/**
 * Starts the deep interview flow using the current starter-profile preferences.
 */
async function startInterviewFlow() {
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
function goBackQuickQuestion() {
  if (!APP_STATE.quickSelections.length) {
    showSection("landing");
    return;
  }

  APP_STATE.quickSelections.pop();
  APP_STATE.quickAnswers.pop();
  APP_STATE.adaptiveState = replayAdaptiveSelections(
    APP_STATE.placementModel,
    APP_STATE.quickSelections
  );
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;
  renderQuickQuestion();
}

/**
 * Renders the active adaptive question and answer cards.
 */
function renderQuickQuestion() {
  const question = APP_STATE.currentQuickQuestion;
  const progressFill = document.getElementById("progress-fill");
  const progressCopy = document.getElementById("progress-copy");
  const backButton = document.getElementById("quick-back-btn");

  if (!question) {
    finalizeQuickReading();
    return;
  }

  const stageLabel = getStageLabel(question.stage);
  const stageCounts = APP_STATE.adaptiveState?.stage_counts || {};
  const stageQuestionNumber = (stageCounts[question.stage] || 0) + 1;
  const questionNumber = APP_STATE.quickSelections.length + 1;
  const maxQuestions = APP_STATE.placementModel?.stages?.max_total_questions || 8;

  document.getElementById("question-eyebrow").textContent =
    question.eyebrow || `${stageLabel} ${stageQuestionNumber}`;
  document.getElementById("question-title").textContent = question.prompt;
  document.getElementById("answer-grid").innerHTML = question.answers
    .map((answer, index) => {
      return `
        <div class="answer-card">
          <button type="button" onclick="answerQuickQuestion(${index})">
            <div class="answer-title">${answer.title}</div>
            <div class="answer-copy">${answer.copy}</div>
          </button>
        </div>`;
    })
    .join("");

  progressCopy.textContent = `${stageLabel} ${stageQuestionNumber} - Question ${questionNumber} of up to ${maxQuestions}`;
  progressFill.style.width = `${Math.min(100, (questionNumber / maxQuestions) * 100)}%`;
  backButton.textContent = APP_STATE.quickSelections.length === 0 ? "Return to landing" : "Back";
}

/**
 * Records the selected answer for the current quick question and advances the flow.
 *
 * @param {number} answerIndex Selected answer index.
 */
function answerQuickQuestion(answerIndex) {
  const question = APP_STATE.currentQuickQuestion;
  const answer = question?.answers?.[answerIndex];
  if (!answer) {
    return;
  }

  APP_STATE.quickSelections.push({ question, answer, answerIndex });
  APP_STATE.quickAnswers.push(answer);
  APP_STATE.adaptiveState = applyAdaptiveAnswer({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    question,
    answer,
    answerIndex,
  });
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;

  if (shouldFinishAdaptiveReading(APP_STATE.adaptiveState, APP_STATE.placementModel)) {
    finalizeQuickReading();
    return;
  }

  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  renderQuickQuestion();
}

/**
 * Creates a normalized starter profile for use in result payloads.
 *
 * @returns {{format_interest:string,budget_band:string,experience_level:string}} Current starter profile.
 */
function getStarterProfile() {
  return {
    format_interest: APP_STATE.starterProfile.format_interest,
    budget_band: APP_STATE.starterProfile.budget_band,
    experience_level: APP_STATE.starterProfile.experience_level,
  };
}

/**
 * Finalizes the adaptive quick reading, stores the normalized result locally, and opens the dossier.
 */
function finalizeQuickReading() {
  const result = buildAdaptivePlacementResult({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    factions: APP_STATE.factions,
    starterProfile: getStarterProfile(),
    version: RESULT_VERSION,
  });

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
  APP_STATE.resultSource = "quick";
  APP_STATE.returnSection = null;
  SESSION.interviewResult = result;
  vm_cachePlacementResult(result);
  renderResult();
}

/**
 * Updates the interview controls to reflect the current terminal state.
 *
 * @param {"idle"|"loading"|"interviewing"|"decided"} state Interview UI state.
 * @param {number=} turn Current turn number when known.
 */
function updateInterviewControls(state, turn) {
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
function appendTerminalMessage(role, content, loading) {
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
function resetInterviewDossier() {
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
async function beginInterview() {
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
async function submitInterview() {
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
function revealDecree(result) {
  return new Promise((resolve) => {
    const decree = document.getElementById("decree-container");
    const rule = document.getElementById("decree-rule");
    const faction = getFaction(result.faction) || {};

    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = result.faction;
    APP_STATE.resultSource = "interview";
    APP_STATE.returnSection = "interview";
    vm_cachePlacementResult(result);

    setTimeout(() => {
      document.getElementById("terminal-output").style.opacity = "0.4";
      document.getElementById("decree-title").textContent = result.faction_name || result.faction || "Unbound Order";
      document.getElementById("decree-tagline").textContent = faction.tagline || "The scrying glass has spoken.";
      document.getElementById("decree-text").textContent = result.decree || "The decree remains unwritten.";
      document.getElementById("decree-runner").textContent =
        result.adjacent_matches?.[0]?.faction_name
          ? `The reading also noted an affinity for ${result.adjacent_matches[0].faction_name}.`
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
function openInterviewDossier() {
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
function returnToInterviewSource() {
  APP_STATE.returnSection = null;
  showSection("interview");
  updateTopbar();
}

/**
 * Saves the current active placement using Google OAuth when needed.
 *
 * @returns {Promise<void>} Resolves when the save flow has been started or completed.
 */
async function handleSavePlacement() {
  const button = document.getElementById("save-placement-btn");
  const result = APP_STATE.activeResult || SESSION.interviewResult;
  if (!result) {
    return;
  }

  button.disabled = true;
  button.textContent = "Saving...";

  try {
    const sb = getSupabase();
    const {
      data: { session },
    } = await sb.auth.getSession();

    if (session?.user) {
      const saved = await vm_savePlacementResult(result);
      APP_STATE.activeResult = saved;
      APP_STATE.activeViewKey = saved.faction;
      button.textContent = "Saved to Google";
      renderResult();
      return;
    }

    await vm_saveWithGoogle(result);
  } catch (error) {
    button.disabled = false;
    button.textContent = "Retry Save";
    document.getElementById("terminal-error").textContent =
      error.message || "Could not save placement.";
  }
}

/**
 * Builds the external deck-link buttons for a deck card.
 *
 * @param {object[]} links Link descriptors.
 * @param {string=} className Additional anchor class.
 * @returns {string} Link button HTML.
 */
function buildLinkButtons(links, className = "") {
  return (links || [])
    .map((link) => {
      const service = getServiceChipMeta(link);
      const classes = ["deck-link", "service-chip", `service-${service.key}`, className].filter(Boolean).join(" ");
      return `
        <a class="${classes}" href="${link.url}" target="_blank" rel="noopener" data-service="${service.key}" style="--service-color:${service.color};--service-glow:${service.glow}">
          <span class="service-mark" aria-hidden="true">${service.mark}</span>
          <span class="service-copy">
            <span class="service-name">${service.label}</span>
            <span class="service-label">${link.label}</span>
          </span>
        </a>`;
    })
    .join("");
}

/**
 * Returns the active placement result and viewing key for result rendering.
 *
 * @returns {{result:object|null,viewKey:string|null}} Active result context.
 */
function getActiveResultContext() {
  return {
    result: APP_STATE.activeResult || SESSION.profile?.placementResult || vm_getCachedPlacementResult(),
    viewKey: APP_STATE.activeViewKey || APP_STATE.activeResult?.faction || SESSION.profile?.placementResult?.faction || null,
  };
}

/**
 * Renders the main dossier view for the active placement result.
 *
 * @param {string=} viewKey Optional faction key to view inside the current result.
 */
function renderResult(viewKey) {
  const context = getActiveResultContext();
  const result = context.result;
  const activeKey = viewKey || context.viewKey;
  const terminalEnabled = isScryingTerminalEnabled();

  if (!result || !activeKey) {
    document.getElementById("result-inner").innerHTML = `
      <div class="empty-state">
        <h2>No reading yet.</h2>
        <p>Start with the quick path, then come back here for the full dossier.</p>
        <div class="landing-actions" style="justify-content:center;margin-top:1.5rem">
          <button class="btn-primary" type="button" onclick="showSection('landing')">Go to landing</button>
        </div>
      </div>`;
    showSection("result");
    updateTopbar();
    return;
  }

  const starterProfile = result.starter_profile || getStarterProfile();
  const dossier = buildCommanderDossier({
    factions: APP_STATE.factions,
    placementModel: APP_STATE.placementModel,
    deckTagCatalog: APP_STATE.deckTagCatalog,
    placementResult: result,
    targetFactionKey: activeKey,
    starterProfile,
  });
  const faction = dossier.faction.record;
  const institutionLabel = getInstitutionLabel(faction);
  const isPrimary = dossier.isPrimary;
  const archidektSearchLinks = dossier.links.archidekt || [];
  const commanderLane = dossier.commanderLane;
  const packageLinks = {
    maze: dossier.links.maze || [],
    scryfall: dossier.links.scryfall || [],
  };
  const commanderDirectoryLinks = dossier.links.commanderStart || [];
  const commanderPreviewCandidates = dossier.commanderRecommendations || [];
  const landRecommendations = dossier.landRecommendations || {};
  const scoreBarsHtml = dossier.manaAlignment.map(({ color, value }) => {
    const target = Math.min(100, value * 10);
    return `<div class="score-row score-row-${color}"><span class="score-label">${COLOR_META[color].label}</span><div class="score-track"><div class="score-fill score-fill-${color}" style="width:0;background:${COLOR_META[color].fill}" data-target="${target}"></div></div><span class="score-val">${value}</span></div>`;
  }).join("");

  const archetypeHtml = (dossier.archetypes || [])
    .map((item) => `<div class="arch-card"><div class="arch-name">${item.name}</div><div class="arch-desc">${item.desc}</div></div>`)
    .join("");

  function cardSlots(items, prefix, placeholderClass, imageClass) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="staple-wrap"><div class="${placeholderClass}" id="${id}">${name}</div><div class="staple-name">${name}</div></div>`;
      })
      .join("");
  }

  function landSlots(items, prefix) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="land-wrap"><div class="land-placeholder" id="${id}">${name}</div><div class="land-name">${name}</div></div>`;
      })
      .join("");
  }

  function commanderPreviewSlots(items) {
    return (items || [])
      .map((candidate, index) => {
        const id = `cmd_${index}`;
        return `
          <div class="commander-preview-card" data-commander-card>
            <div class="commander-art-shell">
              <div class="commander-placeholder" id="${id}">${candidate.name}</div>
            </div>
            <div class="commander-preview-body">
              <div class="commander-name">${candidate.name}</div>
              <div class="commander-desc">${candidate.desc}</div>
            </div>
          </div>`;
      })
      .join("");
  }

  const commanderFallbackClass = commanderPreviewCandidates.length ? "" : " is-visible";
  const commanderPreviewHtml = `
    <div class="commander-preview-block">
      <div class="commander-preview-label">Commander starting points</div>
      ${commanderPreviewCandidates.length ? `<div class="commander-preview-grid" id="commander-preview-grid">${commanderPreviewSlots(commanderPreviewCandidates)}</div>` : ""}
      <div class="commander-preview-fallback${commanderFallbackClass}" id="commander-preview-fallback">
        ${buildLinkButtons(commanderDirectoryLinks)}
      </div>
    </div>`;

  const adjacentMatches = dossier.adjacentFits || [];
  const adjacentHtml = adjacentMatches.length
    ? adjacentMatches
        .map((fit) => {
          return `
            <div class="adjacent-card ${fit.factionKey === activeKey ? "active" : ""}">
              <div class="adjacent-label">${fit.world}</div>
              <div class="adjacent-name">${fit.name}</div>
              <div class="adjacent-copy">${fit.reason || fit.tagline}</div>
              <div class="adjacent-actions">
                <button class="adjacent-btn" type="button" onclick="switchAdjacentView('${fit.factionKey}')">View this fit</button>
              </div>
            </div>`;
        })
        .join("")
    : terminalEnabled
      ? `<div class="adjacent-card"><div class="adjacent-name">No adjacent fits saved yet.</div><div class="adjacent-copy">Retake or use the Scrying Terminal to generate a fuller read.</div></div>`
      : `<div class="adjacent-card"><div class="adjacent-name">No adjacent fits saved yet.</div><div class="adjacent-copy">Retake the quick reading to generate a fuller read.</div></div>`;

  const saveButtonLabel = SESSION.username ? "Save this reading" : "Save with Google";
  const returnToTerminalButton =
    terminalEnabled && APP_STATE.resultSource === "interview"
      ? `<button class="btn-secondary" type="button" onclick="returnToInterviewSource()">Return to the Terminal</button>`
      : "";
  const resultStatus = dossier.resultStatus;
  const decreeCopy = dossier.decreeCopy;
  const readingOmens = dossier.readingOmens || [];
  const manaSectionLabel = isPrimary
    ? "Mana Alignment"
    : `Reading Mana Alignment · Commander Color Identity: ${dossier.faction.colorIdentity || getColorIdentity(faction.colors)}`;
  const evidenceHtml = readingOmens.length
    ? readingOmens
        .map((omen) => `
          <div class="starter-card omen-card">
            <div class="omen-index">${omen.title}</div>
            <div class="starter-title">${omen.answerTitle}</div>
            <div class="starter-copy">${omen.copy}</div>
          </div>`)
        .join("")
    : "";

  const pipsHtml = (faction.colors || []).map((color) => `<div class="pip pip-${color}"></div>`).join("");
  const archidektHtml = archidektSearchLinks.length
    ? `<div class="deck-card"><div class="deck-format">Archidekt</div><div class="deck-name">Validated Searches</div><div class="deck-desc">One color-identity lane plus up to three catalog-matched archetype lanes for your first deck browse.</div><div class="deck-links">${buildLinkButtons(archidektSearchLinks)}</div></div>`
    : "";
  const mazePackageHtml = `<div class="deck-card"><div class="deck-format">Maze</div><div class="deck-name">Package Searches</div><div class="deck-desc">Open the Implicit Maze with starter queries for commanders, ramp, draw, interaction, lands, and win conditions.</div><div class="deck-links">${buildLinkButtons(packageLinks.maze)}</div></div>`;
  const scryfallPackageHtml = `<div class="deck-card"><div class="deck-format">Scryfall</div><div class="deck-name">Direct Card Searches</div><div class="deck-desc">Jump straight to Scryfall for the same Commander package lanes in ${getColorIdentity(faction.colors)} colors.</div><div class="deck-links">${buildLinkButtons(packageLinks.scryfall)}</div></div>`;
  const decksHtml = `${archidektHtml}${mazePackageHtml}${scryfallPackageHtml}`;

  document.getElementById("result-inner").innerHTML = `
    <div class="guild-banner" style="background:${faction.banner}">
      <div class="guild-eyebrow">${isPrimary ? `Your ${institutionLabel}` : `Adjacent ${institutionLabel} Fit`}</div>
      <div class="guild-name" style="color:${faction.accent}">${faction.name}</div>
      <div class="guild-tagline">${faction.tagline}</div>
      <div class="mana-pips">${pipsHtml}</div>
      <div class="guild-philosophy">${decreeCopy}</div>
      <div class="guild-lore-summary">${faction.philosophy}</div>
    </div>

    <div class="result-status">
      <strong>${resultStatus}</strong>
      ${SESSION.username ? ` Saved under ${SESSION.username}.` : " Save it with Google when you want this exact reading back on a later visit."}
    </div>

    <div class="scores-section">
      <div class="section-label">${manaSectionLabel}</div>
      <div class="score-bars">${scoreBarsHtml}</div>
    </div>

    ${evidenceHtml ? `
      <div class="starter-section">
        <div class="section-label">Reading Omens</div>
        <div class="starter-grid">${evidenceHtml}</div>
      </div>` : ""}

    <div class="starter-section">
      <div class="section-label">Start Here</div>
      <div class="starter-grid starter-grid-start">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${commanderLane.title}</div>
          <div class="starter-copy">${commanderLane.copy}</div>
          <div class="starter-notes">
            ${commanderLane.details.map((detail) => `
              <div class="starter-note">
                <div class="starter-note-label">${detail.label}</div>
                <div class="starter-copy">${detail.copy}</div>
              </div>`).join("")}
          </div>
          <div class="starter-links">${buildLinkButtons(commanderDirectoryLinks)}</div>
          ${commanderPreviewHtml}
        </div>
      </div>
    </div>

    <div class="adjacent-section">
      <div class="section-label">Adjacent Fits</div>
      <div class="adjacent-grid">${adjacentHtml}</div>
    </div>

    <div class="archetypes-section">
      <div class="section-label">Playstyle Archetypes</div>
      <div class="archetypes-grid">${archetypeHtml}</div>
    </div>

    <div class="staples-section">
      <div class="section-label">${institutionLabel} Starter Card References</div>
      <div class="staples-category">
        <div class="staple-cat-label">Creatures</div>
        <div class="staple-row">${cardSlots(dossier.starterCards?.creatures, "sc", "staple-placeholder", "staple-img")}</div>
      </div>
      <div class="staples-category">
        <div class="staple-cat-label">Instants and Sorceries</div>
        <div class="staple-row">${cardSlots(dossier.starterCards?.spells, "ss", "staple-placeholder", "staple-img")}</div>
      </div>
      <div class="staples-category">
        <div class="staple-cat-label">Enchantments and Artifacts</div>
        <div class="staple-row">${cardSlots(dossier.starterCards?.permanents, "sp", "staple-placeholder", "staple-img")}</div>
      </div>
    </div>

    <div class="lands-section">
      <div class="section-label">${institutionLabel} Starter Land References</div>
      <div class="lands-tiers">
        <div class="land-tier tier-premium">
          <div class="land-tier-label">Premium</div>
          <div class="land-cards-row">${landSlots(landRecommendations.premium, "lp")}</div>
        </div>
        <div class="land-tier tier-midrange">
          <div class="land-tier-label">Mid-range</div>
          <div class="land-cards-row">${landSlots(landRecommendations.midrange, "lm")}</div>
        </div>
        <div class="land-tier tier-budget">
          <div class="land-tier-label">Budget</div>
          <div class="land-cards-row">${landSlots(landRecommendations.budget, "lb")}</div>
        </div>
        <div class="land-tier tier-utility">
          <div class="land-tier-label">Utility</div>
          <div class="land-cards-row">${landSlots(landRecommendations.utility, "lu")}</div>
        </div>
      </div>
      <div class="lands-guide">
        <div class="guide-row"><span class="guide-tier guide-tier-p">Premium picks</span><span class="guide-text">${(landRecommendations.premium || []).join(" / ")}</span></div>
        <div class="guide-row"><span class="guide-tier guide-tier-m">Midrange picks</span><span class="guide-text">${(landRecommendations.midrange || []).join(" / ")}</span></div>
        <div class="guide-row"><span class="guide-tier guide-tier-b">Budget picks</span><span class="guide-text">${(landRecommendations.budget || []).join(" / ")}</span></div>
        <div class="guide-row"><span class="guide-tier guide-tier-u">Utility picks</span><span class="guide-text">${(landRecommendations.utility || []).join(" / ")}</span></div>
        <div class="guide-row"><span class="guide-tier guide-tier-u">Basic land guidance</span><span class="guide-text">${landRecommendations.basicGuidance || ""}</span></div>
      </div>
    </div>

    <div class="decks-section">
      <div class="section-label">Commander Deck-start Links</div>
      <div class="decks-grid">${decksHtml}</div>
    </div>

    <p class="decree-footer">
      The atlas is still opening: fifteen paths are lit now — ten Ravnican guilds and five Strixhaven colleges. Wedges, families, and stranger color-shapes wait beyond the next veil.
    </p>

    <div class="footer-actions">
      <div class="footer-note">Card and land images via Scryfall API. Starter references are curated from faction data; deck links route out to MTGDecks, Archidekt, EDHREC, Maze, and Scryfall.</div>
      <div class="footer-button-row">
        <button class="btn-primary" type="button" onclick="saveCurrentResult()">${saveButtonLabel}</button>
        ${returnToTerminalButton}
        ${terminalEnabled ? `<button class="btn-secondary" type="button" data-vm-terminal-only onclick="startInterviewFlow()">Try the deeper reading</button>` : ""}
        <button class="btn-secondary" type="button" onclick="handleRetake()">Begin Again</button>
      </div>
    </div>`;

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = activeKey;
  showSection("result");
  applyTerminalVisibility();
  updateTopbar();
  animateScoreBars();
  loadResultCardArt(faction, commanderPreviewCandidates, dossier.starterCards, landRecommendations);
}

/**
 * Switches the dossier view to an adjacent faction while keeping the same saved reading.
 *
 * @param {string} factionKey Adjacent faction key to render.
 */
function switchAdjacentView(factionKey) {
  APP_STATE.activeViewKey = factionKey;
  renderResult(factionKey);
}

/**
 * Animates the mana bars after the result page has been injected.
 */
function animateScoreBars() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".score-fill[data-target]").forEach((node) => {
      setTimeout(() => {
        node.style.width = `${node.getAttribute("data-target")}%`;
      }, 180);
    });
  });
}

/**
 * Loads Scryfall images for Commander previews, staples, and lands after the result HTML has rendered.
 *
 * @param {object} faction Canonical faction record being displayed.
 * @param {object[]=} commanderCandidates Commander preview candidates to verify.
 * @param {object=} starterCards Dossier starter card groups.
 * @param {object=} landRecommendations Dossier land recommendation tiers.
 * @returns {Promise<void>} Resolves after all visible slots have been attempted.
 */
async function loadResultCardArt(faction, commanderCandidates = [], starterCards = {}, landRecommendations = {}) {
  const factionIdentity = new Set(faction?.colors || []);
  let verifiedCommanders = 0;
  const commanderCards = (commanderCandidates || []).map((candidate, index) => ({
    ...candidate,
    id: `cmd_${index}`,
    imageClass: "commander-img",
    commanderPreview: true,
  }));
  const allCards = [
    ...commanderCards,
    ...(starterCards.creatures || []).map((name, index) => ({ name, id: `sc_${index}`, imageClass: "staple-img" })),
    ...(starterCards.spells || []).map((name, index) => ({ name, id: `ss_${index}`, imageClass: "staple-img" })),
    ...(starterCards.permanents || []).map((name, index) => ({ name, id: `sp_${index}`, imageClass: "staple-img" })),
    ...(landRecommendations.premium || []).map((name, index) => ({ name, id: `lp_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.midrange || []).map((name, index) => ({ name, id: `lm_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.budget || []).map((name, index) => ({ name, id: `lb_${index}`, imageClass: "land-img" })),
    ...(landRecommendations.utility || []).map((name, index) => ({ name, id: `lu_${index}`, imageClass: "land-img" })),
  ];

  for (const card of allCards) {
    const slot = document.getElementById(card.id);
    if (!slot) {
      continue;
    }

    try {
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(card.name)}`);
      const data = await response.json();
      const imageUrl =
        data.image_uris?.normal ||
        data.card_faces?.[0]?.image_uris?.normal ||
        null;
      const linkUrl = data.scryfall_uri || "#";
      const typeLine = [
        data.type_line || "",
        ...(data.card_faces || []).map((face) => face.type_line || ""),
      ].join(" ");
      const cardIdentity = data.color_identity || [];
      const identityFits = cardIdentity.every((color) => factionIdentity.has(color));
      const isCommanderCreature =
        /legendary/i.test(typeLine) &&
        /creature/i.test(typeLine) &&
        data.legalities?.commander === "legal" &&
        identityFits;

      if (card.commanderPreview && !isCommanderCreature) {
        slot.closest("[data-commander-card]")?.remove();
        continue;
      }

      if (imageUrl) {
        slot.closest("[data-commander-card]")?.classList.add("is-verified");
        slot.outerHTML = `<a href="${linkUrl}" target="_blank" rel="noopener"><img class="${card.imageClass}" src="${imageUrl}" alt="${data.name}" loading="lazy"></a>`;
        if (card.commanderPreview) {
          verifiedCommanders += 1;
        }
      } else if (card.commanderPreview) {
        slot.closest("[data-commander-card]")?.remove();
      } else {
        slot.textContent = card.name;
      }
    } catch (_) {
      const fallback = document.getElementById(card.id);
      if (card.commanderPreview) {
        fallback?.closest("[data-commander-card]")?.remove();
      } else if (fallback) {
        fallback.textContent = card.name;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 90));
  }

  const previewGrid = document.getElementById("commander-preview-grid");
  const fallback = document.getElementById("commander-preview-fallback");
  if (commanderCandidates.length && verifiedCommanders < 1) {
    previewGrid?.remove();
    fallback?.classList.add("is-visible");
  }
}

/**
 * Saves the current active result through Google OAuth or a live signed-in session.
 *
 * @returns {Promise<void>} Resolves after the save flow has started or completed.
 */
async function saveCurrentResult() {
  const result = APP_STATE.activeResult;
  if (!result) {
    return;
  }

  try {
    const sb = getSupabase();
    const {
      data: { session },
    } = await sb.auth.getSession();

    if (session?.user) {
      const saved = await vm_savePlacementResult(result);
      APP_STATE.activeResult = saved;
      APP_STATE.activeViewKey = saved.faction;
      renderResult(saved.faction);
      return;
    }

    await vm_saveWithGoogle(result);
  } catch (error) {
    alert(error.message || "Could not save this reading yet.");
  }
}

/**
 * Restores the best available placement view after page load.
 *
 * @param {boolean} savedFromOAuth True when the current load just completed an OAuth save.
 */
function restoreInitialView(savedFromOAuth) {
  const profileResult = SESSION.profile?.placementResult || null;
  const cached = vm_getCachedPlacementResult();
  const result = profileResult || cached;

  if (savedFromOAuth && result) {
    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = result.faction;
    APP_STATE.resultSource = "saved";
    APP_STATE.returnSection = null;
    renderResult(result.faction);
    return;
  }

  if (profileResult) {
    APP_STATE.activeResult = profileResult;
    APP_STATE.activeViewKey = profileResult.faction;
    APP_STATE.resultSource = "saved";
    APP_STATE.returnSection = null;
    renderResult(profileResult.faction);
    return;
  }

  showSection("landing");
}

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
 * Exposes page handlers used by existing inline HTML buttons after moving this file
 * to an ES module.
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
  saveCurrentResult,
  showSection,
  startInterviewFlow,
  startQuickFlow,
  submitInterview,
  switchAdjacentView,
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadFactionData();
    await loadPlacementModel();
    await loadDeckTagCatalog();
  } catch (error) {
    document.body.innerHTML = `<div class="section"><div class="empty-state"><h2>Placement data missing.</h2><p>${error.message}</p></div></div>`;
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

import {
  DEFAULT_STARTER_PROFILE,
  MANA_ORDER,
  QUICK_QUESTIONS as QUICK_READING_QUESTIONS,
  RESULT_VERSION,
  buildQuickDecree as buildQuickDecreeCore,
  buildQuickPlacementResult,
  buildQuickReason as buildQuickReasonCore,
  createEmptyManaScores as createEmptyManaScoresCore,
  scoreQuickReading as scoreQuickReadingCore,
} from "./quick-reading.js";

const SESSION = VM_SESSION;
const COLOR_META = {
  W: { label: "White", fill: "#ede8d4" },
  U: { label: "Blue", fill: "#2a7ac8" },
  B: { label: "Black", fill: "#8060a0" },
  R: { label: "Red", fill: "#d04030" },
  G: { label: "Green", fill: "#2a8a30" },
};

const STARTER_OPTIONS = {
  format_interest: [
    { value: "modern", label: "Modern" },
    { value: "pioneer", label: "Pioneer" },
    { value: "commander", label: "Commander" },
  ],
  budget_band: [
    { value: "budget", label: "Budget" },
    { value: "mid", label: "Mid-range" },
    { value: "premium", label: "Premium" },
  ],
  experience_level: [
    { value: "first-deck", label: "First deck" },
    { value: "returning", label: "Returning" },
    { value: "tuned", label: "Already tuned" },
  ],
};

const QUICK_QUESTIONS = QUICK_READING_QUESTIONS;

const APP_STATE = {
  factions: {},
  quickIndex: 0,
  quickAnswers: [],
  activeResult: null,
  activeViewKey: null,
  interviewState: "idle",
  starterProfile: { ...DEFAULT_STARTER_PROFILE },
};

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
  ["landing", "quick", "interview", "result"].forEach((sectionId) => {
    const node = document.getElementById(sectionId);
    if (node) {
      node.classList.toggle("hidden", sectionId !== id);
    }
  });
  window.scrollTo(0, 0);
}

/**
 * Builds the starter-profile chip controls on the landing page.
 */
function renderStarterProfileControls() {
  Object.keys(STARTER_OPTIONS).forEach((field) => {
    const container = document.getElementById(field.replace("_interest", "") + "-chips")
      || document.getElementById(field.replace("_band", "") + "-chips")
      || document.getElementById(field.replace("_level", "") + "-chips");

    if (!container) {
      return;
    }

    container.innerHTML = STARTER_OPTIONS[field]
      .map((option) => {
        const active = APP_STATE.starterProfile[field] === option.value ? "active" : "";
        return `<button class="chip-btn ${active}" type="button" data-field="${field}" data-value="${option.value}">${option.label}</button>`;
      })
      .join("");
  });

  document.querySelectorAll(".chip-btn[data-field]").forEach((button) => {
    button.addEventListener("click", () => {
      const field = button.getAttribute("data-field");
      const value = button.getAttribute("data-value");
      APP_STATE.starterProfile[field] = value;
      renderStarterProfileControls();
    });
  });
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
  window.location = "/research.html";
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
 * Starts the quick reading flow from question one.
 */
function startQuickFlow() {
  APP_STATE.quickIndex = 0;
  APP_STATE.quickAnswers = [];
  showSection("quick");
  renderQuickQuestion();
}

/**
 * Starts the deep interview flow using the current starter-profile preferences.
 */
async function startInterviewFlow() {
  showSection("interview");
  resetInterviewDossier();
  await beginInterview();
}

/**
 * Returns to the previous quick question when possible.
 */
function goBackQuickQuestion() {
  if (APP_STATE.quickIndex === 0) {
    showSection("landing");
    return;
  }
  APP_STATE.quickAnswers.pop();
  APP_STATE.quickIndex -= 1;
  renderQuickQuestion();
}

/**
 * Renders the active quick-path question and answer cards.
 */
function renderQuickQuestion() {
  const question = QUICK_QUESTIONS[APP_STATE.quickIndex];
  const progressFill = document.getElementById("progress-fill");
  const progressCopy = document.getElementById("progress-copy");
  const backButton = document.getElementById("quick-back-btn");

  if (!question) {
    finalizeQuickReading();
    return;
  }

  document.getElementById("question-eyebrow").textContent = question.eyebrow;
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

  progressCopy.textContent = `Question ${APP_STATE.quickIndex + 1} of ${QUICK_QUESTIONS.length}`;
  progressFill.style.width = `${((APP_STATE.quickIndex + 1) / QUICK_QUESTIONS.length) * 100}%`;
  backButton.textContent = APP_STATE.quickIndex === 0 ? "Return to landing" : "Back";
}

/**
 * Records the selected answer for the current quick question and advances the flow.
 *
 * @param {number} answerIndex Selected answer index.
 */
function answerQuickQuestion(answerIndex) {
  const question = QUICK_QUESTIONS[APP_STATE.quickIndex];
  const answer = question?.answers?.[answerIndex];
  if (!answer) {
    return;
  }
  APP_STATE.quickAnswers[APP_STATE.quickIndex] = answer;
  APP_STATE.quickIndex += 1;
  renderQuickQuestion();
}

/**
 * Creates an empty mana-score object in WUBRG order.
 *
 * @returns {{W:number,U:number,B:number,R:number,G:number}} Empty mana score map.
 */
function createEmptyManaScores() {
  return createEmptyManaScoresCore();
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
 * Builds ranked faction matches from quick-path answers and canonical faction colors.
 *
 * @returns {{manaScores:object,topMatches:object[]}} Ranked match output.
 */
function scoreQuickReading() {
  return scoreQuickReadingCore(APP_STATE.quickAnswers, APP_STATE.factions);
}

/**
 * Builds a short reason line for a quick-path match using the selected answer signals.
 *
 * @param {object} faction Canonical faction record.
 * @returns {string} Short explanatory sentence.
 */
function buildQuickReason(faction) {
  return buildQuickReasonCore(APP_STATE.quickAnswers, faction);
}

/**
 * Builds a deterministic quick-path decree using the faction philosophy and chosen signals.
 *
 * @param {object} faction Canonical faction record.
 * @param {string} runnerUpName Name of the next-closest faction.
 * @returns {string} Personalized decree text.
 */
function buildQuickDecree(faction, runnerUpName) {
  return buildQuickDecreeCore(APP_STATE.quickAnswers, faction, runnerUpName, getStarterProfile());
}

/**
 * Finalizes the quick reading, stores the normalized result locally, and opens the dossier.
 */
function finalizeQuickReading() {
  const result = buildQuickPlacementResult({
    answers: APP_STATE.quickAnswers,
    factions: APP_STATE.factions,
    starterProfile: getStarterProfile(),
    version: RESULT_VERSION,
  });

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
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
      error.message || "Interview service unavailable.";
    updateInterviewControls("idle");
  }
}

/**
 * Submits the user's next interview reply to the edge function.
 *
 * @returns {Promise<void>} Resolves once the response is rendered.
 */
async function submitInterview() {
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
      error.message || "The connection wavers. Try again.";
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
  renderResult();
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
 * Formats a starter-profile enum value into readable title case.
 *
 * @param {string} value Raw enum value.
 * @returns {string} Human-readable label.
 */
function formatEnumLabel(value) {
  return String(value || "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Chooses the deck entry that best matches the user's requested starting format.
 *
 * @param {object} faction Canonical faction data.
 * @param {object} starterProfile Normalized starter profile.
 * @returns {object|null} Recommended deck entry.
 */
function pickRecommendedDeck(faction, starterProfile) {
  if (!faction?.deck_links?.length) {
    return null;
  }

  const desired = (starterProfile?.format_interest || "commander").toLowerCase();
  const direct = faction.deck_links.find((deck) => deck.fmt.toLowerCase() === desired);
  return direct || faction.deck_links[0];
}

/**
 * Builds the external deck-link buttons for a deck card.
 *
 * @param {object} deck Deck entry from canonical faction data.
 * @param {string} factionKey Faction key used for filtered searches.
 * @returns {string} Deck-link HTML.
 */
function buildDeckLinks(deck, factionKey) {
  const links = [];
  const formatPath = encodeURIComponent(deck.fmt);
  const archidektUrl =
    deck.fmt === "Commander"
      ? `https://archidekt.com/search/decks?colors=${factionKey}&format=commander`
      : `https://archidekt.com/search/decks?colors=${factionKey}`;

  if (deck.mtgg) {
    links.push(`<a class="deck-link" href="${deck.mtgg}" target="_blank" rel="noopener">MTGGoldfish -></a>`);
  }
  if (deck.edhrec) {
    links.push(`<a class="deck-link" href="${deck.edhrec}" target="_blank" rel="noopener">EDHREC -></a>`);
  }
  links.push(`<a class="deck-link deck-link-mtgd" href="https://mtgdecks.net/${formatPath}?colors=${factionKey}" target="_blank" rel="noopener">MTGDecks -></a>`);
  links.push(`<a class="deck-link deck-link-arch" href="${archidektUrl}" target="_blank" rel="noopener">Archidekt -></a>`);
  return links.join("");
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

  if (!result || !activeKey) {
    document.getElementById("result-inner").innerHTML = `
      <div class="empty-state">
        <h2>No reading yet.</h2>
        <p>Start with the quick path or the Scrying Terminal, then come back here for the full dossier.</p>
        <div class="landing-actions" style="justify-content:center;margin-top:1.5rem">
          <button class="btn-primary" type="button" onclick="showSection('landing')">Go to landing</button>
        </div>
      </div>`;
    showSection("result");
    updateTopbar();
    return;
  }

  const faction = getFaction(activeKey);
  const institutionLabel = getInstitutionLabel(faction);
  const activeMatch =
    result.top_matches.find((match) => match.faction === activeKey) ||
    result.adjacent_matches.find((match) => match.faction === activeKey) ||
    {
      faction: activeKey,
      faction_name: faction.name,
      institution_type: faction.institution_type,
      world: faction.world,
      reason: "",
    };

  const isPrimary = activeKey === result.faction;
  const starterProfile = result.starter_profile || getStarterProfile();
  const recommendedDeck = pickRecommendedDeck(faction, starterProfile);
  const scoreBarsHtml = MANA_ORDER.map((color) => {
    const value = result.mana_scores?.[color] || 1;
    const target = Math.min(100, value * 10);
    return `<div class="score-row"><span class="score-label">${COLOR_META[color].label}</span><div class="score-track"><div class="score-fill" style="width:0;background:${COLOR_META[color].fill}" data-target="${target}"></div></div><span class="score-val">${value}</span></div>`;
  }).join("");

  const archetypeHtml = (faction.archetypes || [])
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

  const starterCardHtml = recommendedDeck
    ? `
      <div class="starter-card">
        <div class="starter-title">Start Here</div>
        <div class="starter-copy">${recommendedDeck.name}</div>
        <div class="starter-copy" style="margin-top:0.4rem">${recommendedDeck.desc}</div>
        <div class="starter-links">${buildDeckLinks(recommendedDeck, faction.key)}</div>
      </div>`
    : "";

  const adjacentMatches = result.adjacent_matches || [];
  const adjacentHtml = adjacentMatches.length
    ? adjacentMatches
        .map((match) => {
          const matchFaction = getFaction(match.faction);
          if (!matchFaction) {
            return "";
          }
          return `
            <div class="adjacent-card ${match.faction === activeKey ? "active" : ""}">
              <div class="adjacent-label">${matchFaction.world}</div>
              <div class="adjacent-name">${matchFaction.name}</div>
              <div class="adjacent-copy">${match.reason || matchFaction.tagline}</div>
              <div class="adjacent-actions">
                <button class="adjacent-btn" type="button" onclick="switchAdjacentView('${match.faction}')">View this fit</button>
              </div>
            </div>`;
        })
        .join("")
    : `<div class="adjacent-card"><div class="adjacent-name">No adjacent fits saved yet.</div><div class="adjacent-copy">Retake or use the Scrying Terminal to generate a fuller read.</div></div>`;

  const saveButtonLabel = SESSION.username ? "Save this reading" : "Save with Google";
  const resultStatus = isPrimary
    ? `This is your primary ${institutionLabel.toLowerCase()} fit.`
    : `You are viewing an adjacent fit built from the same reading.`;
  const decreeCopy = isPrimary
    ? result.decree
    : activeMatch.reason || `${faction.name} stays close to your saved reading and offers a second lane worth exploring.`;

  const pipsHtml = (faction.colors || []).map((color) => `<div class="pip pip-${color}"></div>`).join("");
  const decksHtml = (faction.deck_links || [])
    .map((deck) => `<div class="deck-card"><div class="deck-format">${deck.fmt}</div><div class="deck-name">${deck.name}</div><div class="deck-desc">${deck.desc}</div><div class="deck-links">${buildDeckLinks(deck, faction.key)}</div></div>`)
    .join("");

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
      <div class="section-label">Mana Alignment</div>
      <div class="score-bars">${scoreBarsHtml}</div>
    </div>

    <div class="starter-section">
      <div class="section-label">Where to Start Planning</div>
      <div class="starter-grid">
        <div class="starter-card">
          <div class="starter-title">Your planning lane</div>
          <div class="starter-meta">
            <div class="starter-meta-line"><strong>Format</strong>${formatEnumLabel(starterProfile.format_interest)}</div>
            <div class="starter-meta-line"><strong>Budget</strong>${formatEnumLabel(starterProfile.budget_band)}</div>
            <div class="starter-meta-line"><strong>Experience</strong>${formatEnumLabel(starterProfile.experience_level)}</div>
          </div>
        </div>
        ${starterCardHtml}
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
      <div class="section-label">${institutionLabel} Staple Cards</div>
      <div class="staples-category">
        <div class="staple-cat-label">Creatures</div>
        <div class="staple-row">${cardSlots(faction.staples?.creatures, "sc", "staple-placeholder", "staple-img")}</div>
      </div>
      <div class="staples-category">
        <div class="staple-cat-label">Instants and Sorceries</div>
        <div class="staple-row">${cardSlots(faction.staples?.spells, "ss", "staple-placeholder", "staple-img")}</div>
      </div>
      <div class="staples-category">
        <div class="staple-cat-label">Enchantments and Artifacts</div>
        <div class="staple-row">${cardSlots(faction.staples?.permanents, "sp", "staple-placeholder", "staple-img")}</div>
      </div>
    </div>

    <div class="lands-section">
      <div class="section-label">${institutionLabel} Land Base</div>
      <div class="lands-tiers">
        <div class="land-tier tier-premium">
          <div class="land-tier-label">Premium</div>
          <div class="land-cards-row">${landSlots(faction.land_base?.premium, "lp")}</div>
        </div>
        <div class="land-tier tier-midrange">
          <div class="land-tier-label">Mid-range</div>
          <div class="land-cards-row">${landSlots(faction.land_base?.midrange, "lm")}</div>
        </div>
        <div class="land-tier tier-budget">
          <div class="land-tier-label">Budget</div>
          <div class="land-cards-row">${landSlots(faction.land_base?.budget, "lb")}</div>
        </div>
      </div>
      <div class="lands-guide">
        <div class="guide-row"><span class="guide-tier guide-tier-p">Optimal</span><span class="guide-text">${faction.land_base?.optimal || ""}</span></div>
        <div class="guide-row"><span class="guide-tier guide-tier-m">Mid</span><span class="guide-text">${faction.land_base?.mid || ""}</span></div>
        <div class="guide-row"><span class="guide-tier guide-tier-b">Budget</span><span class="guide-text">${faction.land_base?.budget_line || ""}</span></div>
        <div class="guide-row"><span class="guide-tier guide-tier-u">Utility</span><span class="guide-text">${faction.land_base?.utility || ""}</span></div>
      </div>
    </div>

    <div class="decks-section">
      <div class="section-label">Deck-start Links</div>
      <div class="decks-grid">${decksHtml}</div>
    </div>

    <div class="footer-actions">
      <div class="footer-note">Card and land images via Scryfall API. Deck links route out to MTGGoldfish, MTGDecks, Archidekt, and EDHREC.</div>
      <div class="footer-button-row">
        <button class="btn-primary" type="button" onclick="saveCurrentResult()">${saveButtonLabel}</button>
        <button class="btn-secondary" type="button" onclick="startInterviewFlow()">Try the deeper reading</button>
        <button class="btn-secondary" type="button" onclick="handleRetake()">Begin Again</button>
      </div>
    </div>`;

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = activeKey;
  showSection("result");
  updateTopbar();
  animateScoreBars();
  loadResultCardArt(faction);
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
 * Loads Scryfall images for staples and lands after the result HTML has rendered.
 *
 * @param {object} faction Canonical faction record being displayed.
 * @returns {Promise<void>} Resolves after all visible slots have been attempted.
 */
async function loadResultCardArt(faction) {
  const allCards = [
    ...(faction.staples?.creatures || []).map((name, index) => ({ name, id: `sc_${index}`, imageClass: "staple-img" })),
    ...(faction.staples?.spells || []).map((name, index) => ({ name, id: `ss_${index}`, imageClass: "staple-img" })),
    ...(faction.staples?.permanents || []).map((name, index) => ({ name, id: `sp_${index}`, imageClass: "staple-img" })),
    ...(faction.land_base?.premium || []).map((name, index) => ({ name, id: `lp_${index}`, imageClass: "land-img" })),
    ...(faction.land_base?.midrange || []).map((name, index) => ({ name, id: `lm_${index}`, imageClass: "land-img" })),
    ...(faction.land_base?.budget || []).map((name, index) => ({ name, id: `lb_${index}`, imageClass: "land-img" })),
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

      if (imageUrl) {
        slot.outerHTML = `<a href="${linkUrl}" target="_blank" rel="noopener"><img class="${card.imageClass}" src="${imageUrl}" alt="${data.name}" loading="lazy"></a>`;
      } else {
        slot.textContent = card.name;
      }
    } catch (_) {
      const fallback = document.getElementById(card.id);
      if (fallback) {
        fallback.textContent = card.name;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 90));
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
    renderResult(result.faction);
    return;
  }

  if (profileResult) {
    APP_STATE.activeResult = profileResult;
    APP_STATE.activeViewKey = profileResult.faction;
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
  renderResult(result.faction);
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
  } catch (error) {
    document.body.innerHTML = `<div class="section"><div class="empty-state"><h2>Faction data missing.</h2><p>${error.message}</p></div></div>`;
    return;
  }

  renderStarterProfileControls();

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

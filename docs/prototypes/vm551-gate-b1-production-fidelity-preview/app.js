import { buildCommanderDossier, buildPreconRecommendations } from "../../../assets/js/commander-dossier.js";
import { gateAStatePresentation } from "../../../assets/js/archscry-presentation.js";
import { initDossierManaRadar, renderDossierRadarSection } from "../../../assets/js/dossier-radar.js";

const ROOT = "../../../";
const els = {
  landing: document.querySelector("#landing"), quick: document.querySelector("#quick"), transition: document.querySelector("#transition"), result: document.querySelector("#result"),
  reviewerToggle: document.querySelector("#reviewer-toggle"), journeySelect: document.querySelector("#journey-select"), journeyLabel: document.querySelector(".review-journey"),
  startFree: document.querySelector("#start-free"), startReview: document.querySelector("#start-review-case"), restartTop: document.querySelector("#restart-top"),
  progressCopy: document.querySelector("#progress-copy"), progressFill: document.querySelector("#progress-fill"), eyebrow: document.querySelector("#question-eyebrow"),
  title: document.querySelector("#question-title"), help: document.querySelector("#question-help"), answerGrid: document.querySelector("#answer-grid"),
  back: document.querySelector("#back-btn"), restart: document.querySelector("#restart-btn"), questionReviewer: document.querySelector("#question-reviewer"),
  questionReviewerContent: document.querySelector("#question-reviewer-content"), transitionEyebrow: document.querySelector("#transition-eyebrow"),
  transitionTitle: document.querySelector("#transition-title"), transitionCopy: document.querySelector("#transition-copy"), resultInner: document.querySelector("#result-inner"),
};

const state = {
  data: null, branchMap: null, factions: {}, identityLayers: null, placementModel: null, preconCatalog: null, preconThemes: null,
  reviewer: false, mode: "free", route: null, branch: null, sequence: [], index: 0, answers: new Map(), timer: null,
};

const paths = {
  instrument: "../vm551-gate-b1-owner-experience/prototype-data.json",
  branches: "./branching-map.json",
  factions: `${ROOT}data/factions.json`,
  model: `${ROOT}data/placement-model.json`,
  precons: `${ROOT}data/precons/vox-mana-precon-catalog.json`,
  preconThemes: `${ROOT}data/taxonomy/vox-mana-precon-themes.json`,
};

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const questionById = (id) => state.data.questions.find((question) => question.id === id) || (state.data.lensQuestions || []).find((question) => question.id === id);
const resultById = (id) => state.data.results.find((result) => result.id === id);
const routeById = (id) => state.data.walkthroughs.find((route) => route.id === id);

function showSection(key) {
  ["landing", "quick", "transition", "result"].forEach((name) => els[name].classList.toggle("hidden", name !== key));
  document.querySelector(`#${key}`)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

function suffix(answerId) { return String(answerId || "").split(".").pop(); }

function gateProfile() {
  const ids = state.branchMap.universalGateQuestionIds;
  return {
    initiative: suffix(state.answers.get(ids[0])), visibility: suffix(state.answers.get(ids[1])),
    disruption: suffix(state.answers.get(ids[2])), tempo: suffix(state.answers.get(ids[3])),
  };
}

function chooseBranch() {
  const profile = gateProfile();
  return state.branchMap.branchStates.find((branch) => {
    if (branch.match.fallback) return true;
    return Object.entries(branch.match).every(([axis, accepted]) => accepted.includes(profile[axis]));
  });
}

function begin(mode = "free") {
  clearTimeout(state.timer);
  state.mode = mode;
  state.route = mode === "review" ? routeById(els.journeySelect.value) : null;
  state.branch = null;
  state.answers = new Map();
  state.index = 0;
  state.sequence = state.route ? state.route.steps.map((step) => step.questionId) : [...state.branchMap.universalGateQuestionIds];
  showSection("quick");
  renderQuestion();
}

function restart() {
  clearTimeout(state.timer);
  state.route = null; state.branch = null; state.sequence = []; state.answers = new Map(); state.index = 0;
  els.resultInner.innerHTML = "";
  showSection("landing");
  els.startFree.focus({ preventScroll: true });
}

function questionStage(question) {
  if (question.evidenceClass === "IDENTITY_LENS_SELF_REPORT") return "Optional reflection";
  if (question.stage === "Gate") return "The Gate";
  if (question.stage === "Hall") return "The Hall";
  return "The Crucible";
}

function currentQuestion() { return questionById(state.sequence[state.index]); }

function helpText(question) {
  if (question.help) return question.help;
  const definitions = (question.jargon || []).map((item) => `${item.term}: ${item.definition}`);
  return definitions.join(" ");
}

function renderQuestion() {
  const question = currentQuestion();
  if (!question) return finishQuestions();
  const total = Math.min(8, state.sequence.length);
  const lens = question.evidenceClass === "IDENTITY_LENS_SELF_REPORT";
  els.progressCopy.textContent = `${lens ? "Reflection" : question.stage} · Question ${state.index + 1} of ${total}`;
  els.progressFill.style.width = `${Math.round(((state.index + 1) / total) * 100)}%`;
  els.eyebrow.textContent = questionStage(question);
  els.title.textContent = question.prompt;
  const help = helpText(question);
  els.help.hidden = !help;
  els.help.textContent = help;
  const selectedId = state.answers.get(question.id);
  els.answerGrid.innerHTML = (question.answers || []).map((answer) => `
    <div class="answer-card${selectedId === answer.id ? " is-selected" : ""}${lens ? " is-lens" : ""}">
      <button type="button" data-answer-id="${escapeHtml(answer.id)}" aria-pressed="${selectedId === answer.id}">
        <div class="answer-title">${escapeHtml(answer.title)}</div>
        <div class="answer-copy">${escapeHtml(answer.explanation)}</div>
      </button>
    </div>`).join("");
  if (lens) {
    els.answerGrid.insertAdjacentHTML("beforebegin", `<p class="lens-intro" id="lens-intro">Your Commander answers got us this far. This optional question asks which of two remaining ideas resonates more with you.</p>`);
  } else {
    document.querySelector("#lens-intro")?.remove();
  }
  els.answerGrid.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => selectAnswer(question, button.dataset.answerId)));
  els.back.disabled = state.index === 0;
  renderQuestionReviewer(question);
  requestAnimationFrame(() => els.answerGrid.querySelector("button")?.focus({ preventScroll: true }));
}

function selectAnswer(question, answerId) {
  state.answers.set(question.id, answerId);
  els.answerGrid.querySelectorAll(".answer-card").forEach((card) => {
    const selected = card.querySelector("button")?.dataset.answerId === answerId;
    card.classList.toggle("is-selected", selected);
    card.querySelector("button")?.setAttribute("aria-pressed", String(selected));
  });
  clearTimeout(state.timer);
  state.timer = setTimeout(() => advance(question), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180);
}

function advance(question) {
  if (state.mode === "free" && question.id === state.branchMap.universalGateQuestionIds[3]) {
    state.branch = chooseBranch();
    state.sequence = [...state.branchMap.universalGateQuestionIds, ...state.branch.questionIds].slice(0, 8);
    showHallTransition();
    return;
  }
  if (state.index >= state.sequence.length - 1) return finishQuestions();
  state.index += 1;
  renderQuestion();
}

function showHallTransition() {
  els.transitionEyebrow.textContent = "The Hall opens";
  els.transitionTitle.textContent = "The next question responds to your reading";
  els.transitionCopy.textContent = "Your first four answers now form the shared baseline. The preview is opening a different Commander situation to clarify what remains unresolved.";
  showSection("transition");
  state.timer = setTimeout(() => { state.index = 4; showSection("quick"); renderQuestion(); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 80 : 1050);
}

function finishQuestions() {
  els.transitionEyebrow.textContent = "Quick Reading complete";
  els.transitionTitle.textContent = "Building your reading";
  els.transitionCopy.textContent = "Gathering the Commander observations you chose and opening the Archscry dossier.";
  showSection("transition");
  state.timer = setTimeout(renderResult, matchMedia("(prefers-reduced-motion: reduce)").matches ? 80 : 1250);
}

function goBack() {
  clearTimeout(state.timer);
  if (state.index <= 0) return;
  if (state.mode === "free" && state.index === 4) {
    state.sequence.slice(4).forEach((id) => state.answers.delete(id));
    state.branch = null;
    state.sequence = [...state.branchMap.universalGateQuestionIds];
  }
  state.index -= 1;
  renderQuestion();
}

function renderQuestionReviewer(question) {
  els.questionReviewer.hidden = !state.reviewer;
  if (!state.reviewer) return;
  const answerIds = state.branchMap.universalGateQuestionIds.map((id) => state.answers.get(id)).filter(Boolean);
  const branch = state.branch;
  els.questionReviewerContent.innerHTML = `<dl class="reviewer-grid">
    <div><dt>Question</dt><dd>${escapeHtml(question.id)}</dd></div>
    <div><dt>Construct / evidence class</dt><dd>${escapeHtml(question.construct ? `${question.constructId} · ${question.construct.name}` : question.evidenceClass)}</dd></div>
    <div><dt>Dependency</dt><dd>${escapeHtml(question.dependencyGroup)}</dd></div>
    <div><dt>Preview route</dt><dd>${escapeHtml(state.route?.id || branch?.id || "Gate baseline pending")}</dd></div>
    <div><dt>Gate answers collected</dt><dd>${escapeHtml(answerIds.join(" · ") || "None yet")}</dd></div>
    <div><dt>Unresolved construct</dt><dd>${escapeHtml(branch?.unresolvedConstruct || "Selected only after all four Gate answers")}</dd></div>
    <div><dt>Branch reason</dt><dd>${escapeHtml(branch?.reason || "The universal baseline is still being collected.")}</dd></div>
    <div><dt>Dependency avoided</dt><dd>${escapeHtml(branch?.dependencyAvoided || "No adaptive dependency decision yet.")}</dd></div>
    <div><dt>Preview candidate set</dt><dd>${escapeHtml(branch?.candidateSet?.join(", ") || state.route?.lensEligibility?.candidateSet?.join(", ") || "Not asserted")}</dd></div>
    <div><dt>Status</dt><dd>${escapeHtml(state.branchMap.disclaimer)}</dd></div>
  </dl>`;
}

function selectedAnswerRecords() {
  return state.sequence.map((questionId) => {
    const question = questionById(questionId);
    const answerId = state.answers.get(questionId);
    return { question, answer: question?.answers?.find((answer) => answer.id === answerId) };
  }).filter((entry) => entry.question && entry.answer);
}

function factionKeyForNearby(result) {
  const nearby = state.data.results.find((candidate) => candidate.name === result.nearbyAlternative || candidate.id === result.nearbyAlternative);
  return nearby?.id || "";
}

function heroSlug(key) {
  const guilds = { WU: "azorius", UB: "dimir", BR: "rakdos", RG: "gruul", GW: "selesnya", UR: "izzet", BG: "golgari", WR: "boros", UG: "simic", WB: "orzhov" };
  return guilds[key] || String(key || "").toLowerCase();
}

function manaPips(colors = []) {
  const symbols = colors.length ? colors : ["C"];
  return `<span class="mana-pips guild-mana-symbols" role="img" aria-label="${escapeHtml(symbols.join(" and "))} mana identity">${symbols.map((symbol) => `<i class="ms ms-${symbol.toLowerCase()} ms-cost" aria-hidden="true"></i>`).join("")}</span>`;
}

function gateStateCopy(routeState) {
  const normalized = ({ best: "best-fit", close: "close", tied: "tied", mixed: "mixed", insufficient: "insufficient", contradictory: "contradictory" })[routeState] || routeState || "close";
  try { return gateAStatePresentation(normalized); } catch { return ["Current reading", "This authored preview shows the public result shape without claiming a calculated placement."]; }
}

function renderResult() {
  const resultPackage = state.route?.result || resultById(state.branch?.resultIdentityId) || resultById("UG");
  const faction = state.factions[resultPackage.id];
  if (!faction) throw new Error(`Preview result has no production faction record for ${resultPackage.id}.`);
  const nearbyKey = factionKeyForNearby(resultPackage);
  const routeState = state.route?.state || "close";
  const placementResult = {
    faction: resultPackage.id, faction_name: resultPackage.name, model_version: "vm551-gate-b1-preview",
    top_matches: [{ faction: resultPackage.id, faction_name: resultPackage.name }, ...(nearbyKey ? [{ faction: nearbyKey, faction_name: resultPackage.nearbyAlternative }] : [])],
    public_result_state: routeState, alternative_state: routeState === "close" ? "close" : "", starter_profile: { budget: "mid", experience: "returning" }, answers: [],
  };
  const dossier = buildCommanderDossier({ factions: state.factions, placementModel: state.placementModel, placementResult, targetFactionKey: resultPackage.id });
  const record = dossier.faction.record;
  const selected = selectedAnswerRecords();
  const observations = selected.filter(({ question }) => question.evidenceClass !== "IDENTITY_LENS_SELF_REPORT").slice(-3);
  const lens = selected.find(({ question }) => question.evidenceClass === "IDENTITY_LENS_SELF_REPORT");
  const stateCopy = gateStateCopy(routeState);
  const precons = buildPreconRecommendations({ faction: record, dossier, preconCatalog: state.preconCatalog, preconThemeTaxonomy: state.preconThemes, starterProfile: placementResult.starter_profile });
  const preconItems = [...precons.nativeExact, ...precons.otherExact, ...precons.stretch].slice(0, 3);
  const branchOrRoute = state.route || state.branch;
  const contradiction = state.route?.contradictionStatus && state.route.contradictionStatus !== "NONE";

  els.resultInner.innerHTML = `
    <div class="guild-banner" data-faction-key="${escapeHtml(record.key)}" style="background:linear-gradient(90deg,rgba(7,7,9,.94),rgba(7,7,9,.3),rgba(7,7,9,.78)),url('${ROOT}assets/img/identity-hero/${heroSlug(record.key)}.webp') center/cover no-repeat">
      <div class="guild-eyebrow">${routeState === "close" ? "Placement dossier · close reading" : "Placement dossier · authored preview state"}</div>
      <div class="guild-name" style="color:${escapeHtml(record.accent || "#d4b461")}">${escapeHtml(record.name)}</div>
      <div class="guild-tagline">${escapeHtml(record.tagline || resultPackage.commanderExpression)}</div>
      ${manaPips(record.colors)}
      <div class="guild-philosophy">${escapeHtml(resultPackage.identityContext || record.identity?.summary || record.philosophy)}</div>
      <div class="guild-lore-summary">${escapeHtml(record.philosophy)}</div>
    </div>
    <div class="dossier-snapshot">
      <div class="dossier-snapshot-card"><span>Gate A state</span><strong>${escapeHtml(stateCopy[0] || "Current best fit")}</strong><div class="dossier-snapshot-copy">${escapeHtml(stateCopy[1] || "Authored preview reading")}</div></div>
      <div class="dossier-snapshot-card dossier-snapshot-card--narrative"><span>What your Commander answers showed</span><strong>${escapeHtml(resultPackage.whatAnswersShowed)}</strong><div class="dossier-snapshot-copy">${escapeHtml(state.route?.routeSupportedDistinction || resultPackage.observableDistinction)}</div></div>
      <div class="dossier-snapshot-card dossier-snapshot-card--adjacent"><span>Nearby reading</span><strong>${escapeHtml(resultPackage.nearbyAlternative || "No named alternative")}</strong><div class="dossier-snapshot-copy">${escapeHtml(resultPackage.observableDistinction)}</div></div>
    </div>
    <div class="dossier-console" data-dossier-console data-dossier-identity-key="${escapeHtml(record.key)}" data-dossier-layout="focus">
      <div class="dossier-mobile-nav"><div class="vm-tabs dossier-mobile-tabs preview-dossier-tabs" role="tablist" aria-label="Archscry dossier sections">${dossierTabs("mobile")}</div></div>
      <div class="dossier-console-grid">
        <aside class="vm-side-rail dossier-rail" aria-label="Archscry dossier directory"><div class="dossier-rail-label">Dossier Directory</div><div class="vm-tabs dossier-rail-tabs preview-dossier-tabs" role="tablist" aria-orientation="vertical">${dossierTabs("rail")}</div></aside>
        <div class="dossier-workspace">
          ${dossierPanel("placement", `
            <div class="result-state-banner" data-result-state="${escapeHtml(routeState)}"><strong>${escapeHtml(stateCopy[0] || "Current reading")}</strong><span>${escapeHtml(state.route?.stateNote || "This reading is authored for internal experience review, not calculated.")}</span></div>
            ${renderDossierRadarSection({ result: placementResult, faction: record, dossier, identityLayers: state.identityLayers })}
            <div class="starter-section"><div class="section-label">What your Commander answers showed</div><div class="preview-observation-list">${observations.map(({ question, answer }) => `<div class="preview-observation"><strong>${escapeHtml(answer.title)}</strong>${escapeHtml(answer.observation || answer.explanation)}</div>`).join("")}</div></div>
            ${lens && suffix(lens.answer.id) !== "skip" ? `<div class="starter-section"><div class="section-label">What you said resonates</div><div class="preview-observation preview-lens-card"><strong>${escapeHtml(lens.answer.title)}</strong>${escapeHtml(lens.answer.observation)}</div></div>` : ""}
            ${contradiction ? `<div class="preview-limitation"><strong>Both signals remain visible.</strong> Your Commander behavior and optional resonance point in different directions; the reflection does not replace the behavioral reading.</div>` : ""}
            <div class="preview-limitation">${escapeHtml(state.route?.publicLimitation || resultPackage.limitation)}</div>`)}
          ${dossierPanel("why", `<div class="starter-section"><div class="section-label">Why this reading</div><div class="starter-grid"><div class="starter-card starter-card-wide"><div class="starter-title">Behavior first</div><div class="starter-copy">${escapeHtml(state.route?.routeSupportedDistinction || resultPackage.whatAnswersShowed)}</div></div><div class="starter-card"><div class="starter-title">Identity context</div><div class="starter-copy">${escapeHtml(state.route?.identityContext || resultPackage.identityContext)}</div></div><div class="starter-card"><div class="starter-title">Where it stays bounded</div><div class="starter-copy">${escapeHtml(state.route?.publicLimitation || resultPackage.limitation)}</div></div></div></div>`)}
          ${dossierPanel("start", `<div class="starter-section"><div class="section-label">Commander direction</div><div class="starter-grid"><div class="starter-card starter-card-wide"><div class="starter-title">${escapeHtml(dossier.commanderLane.title)}</div><div class="starter-copy">${escapeHtml(resultPackage.commanderDirection || dossier.commanderLane.copy)}</div><div class="starter-notes">${dossier.commanderLane.details.slice(0, 4).map((detail) => `<div class="starter-note"><div class="starter-note-label">${escapeHtml(detail.label)}</div><div class="starter-copy">${escapeHtml(detail.copy)}</div></div>`).join("")}</div></div></div></div>`)}
          ${dossierPanel("adjacent", `<div class="adjacent-section"><div class="section-label">Close alternative</div><div class="adjacent-grid"><div class="adjacent-card"><div class="adjacent-label">Nearby reading</div><div class="adjacent-name">${escapeHtml(resultPackage.nearbyAlternative)}</div><div class="adjacent-copy">${escapeHtml(resultPackage.observableDistinction)}</div><div class="adjacent-copy">Close is relative within this authored reading; it is not a certainty claim.</div></div></div></div>`)}
          ${dossierPanel("commander", renderCommanderPanel(dossier, preconItems))}
          ${dossierPanel("maze", renderMazePanel(dossier))}
        </div>
      </div>
    </div>
    <details class="reviewer-panel reviewer-result reviewer-only" ${state.reviewer ? "" : "hidden"}><summary>Reviewer information</summary><dl class="reviewer-grid">
      <div><dt>Preview route</dt><dd>${escapeHtml(branchOrRoute?.id)}</dd></div><div><dt>Branch status</dt><dd>${escapeHtml(state.branchMap.status)}</dd></div>
      <div><dt>Content readiness</dt><dd>${escapeHtml(resultPackage.contentReadiness)}</dd></div><div><dt>Instrument observability</dt><dd>${escapeHtml(resultPackage.instrumentObservability)}</dd></div>
      <div><dt>Mapping validation</dt><dd>${escapeHtml(resultPackage.mappingValidation)}</dd></div><div><dt>Unresolved validation need</dt><dd>${escapeHtml(resultPackage.unresolvedValidationNeed)}</dd></div>
      <div><dt>Lens eligibility</dt><dd>${escapeHtml(state.route?.lensEligibility ? JSON.stringify(state.route.lensEligibility) : "Not used")}</dd></div><div><dt>Contradiction state</dt><dd>${escapeHtml(state.route?.contradictionStatus || "NONE")}</dd></div>
      <div><dt>Disclaimer</dt><dd>${escapeHtml(state.branchMap.disclaimer)}</dd></div>
    </dl></details>
    <div class="footer-actions"><div class="footer-button-row"><button class="btn-primary" id="result-restart" type="button">Begin Again</button></div></div>`;

  bindDossierTabs();
  document.querySelector("#result-restart")?.addEventListener("click", restart);
  initDossierManaRadar({ result: placementResult, faction: record, identityLayers: state.identityLayers });
  showSection("result");
}

const panelConfig = [
  ["placement", "Your Reading", "Reading"], ["why", "Why This Fit", "Why"], ["start", "Start Here", "Start"],
  ["adjacent", "Nearby Identity", "Nearby"], ["commander", "Commander Starts", "Commanders"], ["maze", "Maze Discovery", "Maze"],
];

function dossierTabs(surface) {
  return panelConfig.map(([id, full, compact], index) => `<button class="dossier-tab${index === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-panel="${id}" data-surface="${surface}"><span class="dossier-tab-label--full">${full}</span><span class="dossier-tab-label--compact">${compact}</span></button>`).join("");
}

function dossierPanel(id, content) { return `<section class="dossier-panel preview-dossier-panel" data-panel-id="${id}" ${id === "placement" ? "" : "hidden"}>${content}</section>`; }

function bindDossierTabs() {
  document.querySelectorAll(".preview-dossier-tabs .dossier-tab").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.panel;
    document.querySelectorAll(".preview-dossier-tabs .dossier-tab").forEach((tab) => { const active = tab.dataset.panel === id; tab.classList.toggle("is-active", active); tab.setAttribute("aria-selected", String(active)); });
    document.querySelectorAll(".preview-dossier-panel").forEach((panel) => panel.hidden = panel.dataset.panelId !== id);
    if (id === "placement") requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
  }));
}

function renderCommanderPanel(dossier, precons) {
  const commanders = (dossier.commanderRecommendations || []).slice(0, 3);
  const cards = [...(dossier.starterCards?.creatures || []), ...(dossier.starterCards?.spells || []), ...(dossier.starterCards?.permanents || [])].slice(0, 6);
  return `<div class="starter-section"><div class="section-label">Commander browsing starts</div><div class="commander-preview-grid">${commanders.map((item) => `<article class="commander-preview-card"><div class="commander-preview-body"><div class="commander-name">${escapeHtml(item.name)}</div><div class="commander-meta">${escapeHtml(item.recommendationType || "Commander direction")}</div><div class="commander-desc">${escapeHtml(item.desc)}</div><div class="preview-link-row">${item.scryfall ? `<a class="btn-secondary" href="${escapeHtml(item.scryfall)}" target="_blank" rel="noopener">View card</a>` : ""}${item.edhrec ? `<a class="btn-secondary" href="${escapeHtml(item.edhrec)}" target="_blank" rel="noopener">Explore decks</a>` : ""}</div></div></article>`).join("")}</div></div>
    ${precons.length ? `<div class="starter-section"><div class="section-label">Recommended precon directions</div><div class="starter-grid">${precons.map((item) => `<div class="starter-card"><div class="starter-title">${escapeHtml(item.deckName || item.name)}</div><div class="starter-copy">${escapeHtml(item.whyThisFits || item.summary || item.description || "An existing exact-color precon browsing direction.")}</div></div>`).join("")}</div></div>` : ""}
    ${cards.length ? `<div class="starter-section"><div class="section-label">Card signal references</div><div class="starter-grid">${cards.map((name) => `<div class="starter-card"><div class="starter-title">${escapeHtml(name)}</div><div class="starter-copy">A curated faction reference from the current production dossier data.</div></div>`).join("")}</div></div>` : ""}`;
}

function renderMazePanel(dossier) {
  const links = (dossier.links?.maze || []).slice(0, 6);
  return `<div class="starter-section"><div class="section-label">Continue into the Implicit Maze</div><p class="signals-intro">Carry this reading into guided Commander card search. These paths are exploration starts, not additional placement evidence.</p><div class="preview-maze-list">${links.map((link) => {
    const query = String(link.url || "").split("?q=")[1] || "";
    return `<div class="starter-card"><div class="starter-title">${escapeHtml(link.label)}</div><div class="starter-copy">${escapeHtml(link.plainReadingQuery || link.operatorQuery)}</div><div class="preview-link-row"><a class="btn-primary" href="${ROOT}maze/index.html${query ? `?q=${query}` : ""}">Open this Maze path</a></div></div>`;
  }).join("")}</div></div>`;
}

function applyReviewerMode() {
  state.reviewer = els.reviewerToggle.checked;
  els.journeyLabel.hidden = !state.reviewer;
  els.journeyLabel.style.display = state.reviewer ? "flex" : "none";
  els.startReview.hidden = !state.reviewer;
  els.startReview.style.display = state.reviewer ? "inline-flex" : "none";
  document.querySelectorAll(".reviewer-only").forEach((element) => {
    if (element === els.startReview || element === els.journeyLabel) return;
    element.hidden = !state.reviewer;
    element.style.display = state.reviewer ? "" : "none";
  });
  if (!els.quick.classList.contains("hidden")) renderQuestionReviewer(currentQuestion());
}

async function boot() {
  const [data, branchMap, factionPayload, placementModel, preconCatalog, preconThemes] = await Promise.all(Object.values(paths).map((path) => fetch(path).then((response) => {
    if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);
    return response.json();
  })));
  Object.assign(state, { data, branchMap, factions: factionPayload.factions, identityLayers: factionPayload.identity_layers, placementModel, preconCatalog, preconThemes });
  branchMap.reviewJourneys.forEach((journey) => els.journeySelect.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(journey.id)}">${escapeHtml(journey.label)}</option>`));
  els.startFree.addEventListener("click", () => begin("free"));
  els.startReview.addEventListener("click", () => els.journeySelect.value ? begin("review") : begin("free"));
  els.reviewerToggle.addEventListener("change", applyReviewerMode);
  els.back.addEventListener("click", goBack);
  els.restart.addEventListener("click", restart);
  els.restartTop.addEventListener("click", restart);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !els.landing.classList.contains("hidden")) restart(); });
  applyReviewerMode();
}

boot().catch((error) => {
  console.error(error);
  els.landing.querySelector(".landing-note").textContent = `Preview data could not load: ${error.message}`;
});

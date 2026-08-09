import { disposeProductionDossier, renderProductionDossier } from "./production-dossier-bridge.js";

const els = {
  landing: document.querySelector("#landing"),
  quick: document.querySelector("#quick"),
  transition: document.querySelector("#transition"),
  result: document.querySelector("#result"),
  reviewerToggle: document.querySelector("#reviewer-toggle"),
  journeySelect: document.querySelector("#journey-select"),
  journeyLabel: document.querySelector(".review-journey"),
  startFree: document.querySelector("#start-free"),
  startReview: document.querySelector("#start-review-case"),
  restartTop: document.querySelector("#restart-top"),
  progressCopy: document.querySelector("#progress-copy"),
  progressFill: document.querySelector("#progress-fill"),
  eyebrow: document.querySelector("#question-eyebrow"),
  title: document.querySelector("#question-title"),
  help: document.querySelector("#question-help"),
  answerGrid: document.querySelector("#answer-grid"),
  back: document.querySelector("#back-btn"),
  restart: document.querySelector("#restart-btn"),
  questionReviewer: document.querySelector("#question-reviewer"),
  questionReviewerContent: document.querySelector("#question-reviewer-content"),
  transitionEyebrow: document.querySelector("#transition-eyebrow"),
  transitionTitle: document.querySelector("#transition-title"),
  transitionCopy: document.querySelector("#transition-copy"),
  transitionAction: document.querySelector("#transition-action"),
  resultInner: document.querySelector("#result-inner"),
};

const state = {
  data: null,
  branchMap: null,
  reviewer: false,
  mode: "free",
  route: null,
  branch: null,
  sequence: [],
  index: 0,
  answers: new Map(),
  timer: null,
  transitionAction: null,
};

const paths = {
  instrument: "../vm551-gate-b1-owner-experience/prototype-data.json",
  branches: "./branching-map.json",
};

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const suffix = (answerId) => String(answerId || "").split(".").pop();
const questionById = (id) => state.data.questions.find((question) => question.id === id) || (state.data.lensQuestions || []).find((question) => question.id === id);
const resultById = (id) => state.data.results.find((result) => result.id === id);
const routeById = (id) => state.data.walkthroughs.find((route) => route.id === id);

function showSection(key) {
  ["landing", "quick", "transition", "result"].forEach((name) => els[name].classList.toggle("hidden", name !== key));
  document.querySelector(`#${key}`)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

function gateProfile() {
  const ids = state.branchMap.universalGateQuestionIds;
  return {
    initiative: suffix(state.answers.get(ids[0])),
    visibility: suffix(state.answers.get(ids[1])),
    disruption: suffix(state.answers.get(ids[2])),
    tempo: suffix(state.answers.get(ids[3])),
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

async function restart() {
  clearTimeout(state.timer);
  await disposeProductionDossier();
  state.route = null;
  state.branch = null;
  state.sequence = [];
  state.answers = new Map();
  state.index = 0;
  state.transitionAction = null;
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

function currentQuestion() {
  return questionById(state.sequence[state.index]);
}

function helpText(question) {
  if (question.help) return question.help;
  const suppressedTerms = question.id === "b1.gate.disruption.v1" ? new Set(["board wipe"]) : new Set();
  return (question.jargon || [])
    .filter((item) => !suppressedTerms.has(String(item.term || "").toLowerCase()))
    .map((item) => `${item.term}: ${item.definition}`)
    .join(" ");
}

function stageProgress(question) {
  const stage = question.evidenceClass === "IDENTITY_LENS_SELF_REPORT" ? "Reflection" : question.stage;
  const sequenceQuestions = state.sequence.map(questionById).filter(Boolean);
  const inStage = sequenceQuestions.filter((item) => (item.evidenceClass === "IDENTITY_LENS_SELF_REPORT" ? "Reflection" : item.stage) === stage);
  const stageIndex = Math.max(0, inStage.findIndex((item) => item.id === question.id));
  return { stage, current: stageIndex + 1, total: Math.max(1, inStage.length) };
}

function renderQuestion() {
  const question = currentQuestion();
  if (!question) return finishQuestions();
  const lens = question.evidenceClass === "IDENTITY_LENS_SELF_REPORT";
  const progress = stageProgress(question);
  els.progressCopy.textContent = `${progress.stage} · ${progress.current} of ${progress.total}`;
  els.progressFill.style.width = `${Math.round((progress.current / progress.total) * 100)}%`;
  els.eyebrow.textContent = questionStage(question);
  els.title.textContent = question.prompt;
  const help = helpText(question);
  els.help.hidden = !help;
  els.help.textContent = help;
  const selectedId = state.answers.get(question.id);
  els.answerGrid.dataset.answerCount = String((question.answers || []).length);
  els.answerGrid.innerHTML = (question.answers || []).map((answer) => `
    <div class="answer-card${selectedId === answer.id ? " is-selected" : ""}${lens ? " is-lens" : ""}">
      <button type="button" data-answer-id="${escapeHtml(answer.id)}" aria-pressed="${selectedId === answer.id}">
        <div class="answer-title">${escapeHtml(answer.title)}</div>
        <div class="answer-copy">${escapeHtml(answer.explanation)}</div>
      </button>
    </div>`).join("");
  document.querySelector("#lens-intro")?.remove();
  if (lens) {
    els.answerGrid.insertAdjacentHTML("beforebegin", '<p class="lens-intro" id="lens-intro">Your Commander answers got us this far. This optional question asks which of two remaining ideas resonates more with you.</p>');
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
  } else if (state.branchMap.universalGateQuestionIds.every((id) => state.answers.has(id))) {
    state.branch = chooseBranch();
  }
  if (state.index >= state.sequence.length - 1) return finishQuestions();
  const nextQuestion = questionById(state.sequence[state.index + 1]);
  if (question.stage === "Gate" && nextQuestion?.stage === "Hall") {
    showHallTransition();
    return;
  }
  state.index += 1;
  renderQuestion();
}

function showHallTransition() {
  els.transitionEyebrow.textContent = "The Hall opens";
  els.transitionTitle.textContent = "The next question responds to your reading";
  els.transitionCopy.textContent = "Your first four answers now form the shared baseline. The preview is opening a different Commander situation to clarify what remains unresolved.";
  els.transitionAction.textContent = "Continue into the Hall";
  state.transitionAction = () => {
    state.index += 1;
    showSection("quick");
    renderQuestion();
  };
  showSection("transition");
}

function finishQuestions() {
  els.transitionEyebrow.textContent = "Quick Reading complete";
  els.transitionTitle.textContent = "Building your reading";
  els.transitionCopy.textContent = "Gathering the Commander observations you chose and opening the Archscry dossier.";
  els.transitionAction.textContent = "Open my reading";
  state.transitionAction = () => { void renderResult(); };
  showSection("transition");
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
    <div><dt>Composite branch</dt><dd>${escapeHtml(branch?.id || "Selected only after all four Gate answers")}</dd></div>
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

function normalizedResultState(value) {
  return ({ best: "primary", "best-fit": "primary" })[value] || value || "close";
}

function routeSelectionsMatch() {
  if (!state.route) return false;
  return state.route.steps.every((step) => state.answers.get(step.questionId) === step.selectedAnswerId);
}

function b1SummaryHtml(resultPackage) {
  const selected = selectedAnswerRecords();
  const behavioral = selected.filter(({ question }) => question.evidenceClass !== "IDENTITY_LENS_SELF_REPORT");
  const lens = selected.find(({ question }) => question.evidenceClass === "IDENTITY_LENS_SELF_REPORT");
  const routeMatches = routeSelectionsMatch();
  const contradiction = state.route?.contradictionStatus && state.route.contradictionStatus !== "NONE";
  const branchOrRoute = state.route || state.branch;
  const routeContext = state.route
    ? routeMatches
      ? `<div class="preview-limitation"><strong>Authored route context.</strong> ${escapeHtml(state.route.routeSupportedDistinction)}</div>`
      : '<div class="preview-limitation"><strong>This run diverged from the authored review path.</strong> No route-level distinction is claimed from selections the route did not specify.</div>'
    : "";
  return `<section class="preview-b1-summary" data-preview-b1-summary>
    <div class="eyebrow">Gate B1 · authored non-scoring preview</div>
    <h2>What your Commander answers showed</h2>
    <div class="preview-observation-list">${behavioral.map(({ answer }) => `<div class="preview-observation" data-selected-answer="${escapeHtml(answer.id)}"><strong>${escapeHtml(answer.title)}</strong>${escapeHtml(answer.observation || answer.explanation)}</div>`).join("")}</div>
    ${lens && suffix(lens.answer.id) !== "skip" ? `<div class="starter-section"><div class="section-label">What you said resonates</div><div class="preview-observation preview-lens-card"><strong>${escapeHtml(lens.answer.title)}</strong>${escapeHtml(lens.answer.observation || lens.answer.explanation)}</div></div>` : ""}
    ${contradiction ? '<div class="preview-limitation"><strong>Both signals remain visible.</strong> Your Commander behavior and optional resonance point in different directions; the reflection does not replace the behavioral reading.</div>' : ""}
    ${routeContext}
    <div class="preview-limitation">${escapeHtml(state.route?.publicLimitation || resultPackage.limitation)}</div>
    <p class="preview-persistence-note" data-preview-persistence-note hidden>Saving and account changes are disabled in this internal preview.</p>
    <details class="reviewer-panel reviewer-result reviewer-only" ${state.reviewer ? "" : "hidden"}><summary>Reviewer information</summary><dl class="reviewer-grid">
      <div><dt>Preview route</dt><dd>${escapeHtml(branchOrRoute?.id)}</dd></div><div><dt>Selections match authored route</dt><dd>${escapeHtml(state.route ? String(routeMatches) : "Not an authored route")}</dd></div>
      <div><dt>Composite branch</dt><dd>${escapeHtml(state.branch?.id || "Not resolved")}</dd></div><div><dt>Branch status</dt><dd>${escapeHtml(state.branchMap.status)}</dd></div>
      <div><dt>Content readiness</dt><dd>${escapeHtml(resultPackage.contentReadiness)}</dd></div><div><dt>Instrument observability</dt><dd>${escapeHtml(resultPackage.instrumentObservability)}</dd></div>
      <div><dt>Mapping validation</dt><dd>${escapeHtml(resultPackage.mappingValidation)}</dd></div><div><dt>Unresolved validation need</dt><dd>${escapeHtml(resultPackage.unresolvedValidationNeed)}</dd></div>
      <div><dt>Disclaimer</dt><dd>${escapeHtml(state.branchMap.disclaimer)}</dd></div>
    </dl></details>
  </section>`;
}

async function renderResult() {
  const resultPackage = state.route?.result || resultById(state.branch?.resultIdentityId) || resultById("UG");
  const nearbyKey = factionKeyForNearby(resultPackage);
  const resultState = normalizedResultState(state.route?.state || "close");
  const placementResult = {
    version: "vm551-gate-b1-preview-v1",
    source_mode: "preview-authored-non-scoring",
    faction: resultPackage.id,
    faction_name: resultPackage.name,
    model_version: "vm551-gate-b1-preview",
    result_state: resultState,
    top_matches: [{ faction: resultPackage.id, faction_name: resultPackage.name }, ...(nearbyKey ? [{ faction: nearbyKey, faction_name: resultPackage.nearbyAlternative }] : [])],
    starter_profile: { budget: "mid", experience: "returning" },
    limitations: [state.route?.publicLimitation || resultPackage.limitation],
  };
  await renderProductionDossier({ result: placementResult, authoredState: state.route?.state || "close", onBeginAgain: restart });
  const template = document.createElement("template");
  template.innerHTML = b1SummaryHtml(resultPackage);
  const summary = template.content.firstElementChild;
  const anchor = els.resultInner.querySelector(".dossier-snapshot, .dossier-console, .bounded-result-shell");
  if (anchor) els.resultInner.insertBefore(summary, anchor);
  else els.resultInner.prepend(summary);
  els.resultInner.querySelectorAll('[data-action="save-current-result"], [data-action="save-placement"]').forEach((button) => {
    button.setAttribute("aria-disabled", "true");
    button.classList.add("is-preview-disabled");
  });
  showSection("result");
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
  const [data, branchMap] = await Promise.all(Object.values(paths).map((path) => fetch(path).then((response) => {
    if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);
    return response.json();
  })));
  Object.assign(state, { data, branchMap });
  branchMap.reviewJourneys.forEach((journey) => els.journeySelect.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(journey.id)}">${escapeHtml(journey.label)}</option>`));
  els.startFree.addEventListener("click", () => begin("free"));
  els.startReview.addEventListener("click", () => els.journeySelect.value ? begin("review") : begin("free"));
  els.reviewerToggle.addEventListener("change", applyReviewerMode);
  els.back.addEventListener("click", goBack);
  els.restart.addEventListener("click", () => { void restart(); });
  els.restartTop.addEventListener("click", () => { void restart(); });
  els.transitionAction.addEventListener("click", () => state.transitionAction?.());
  applyReviewerMode();
}

boot().catch((error) => {
  console.error(error);
  els.landing.querySelector(".landing-note").textContent = `Preview data could not load: ${error.message}`;
});

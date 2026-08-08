(() => {
  "use strict";

  const app = document.querySelector("#app");
  const reviewerToggle = document.querySelector("#reviewer-toggle");
  const modeCaption = document.querySelector("#mode-caption");
  const modeButtons = [...document.querySelectorAll("[data-mode]")];
  const state = {
    data: null,
    mode: "guided",
    walkthroughId: "simic-quandrix",
    step: 0,
    resultVisible: false,
    selections: {},
    reviewer: false,
    deepen: false
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const byId = (items, id) => items.find((item) => item.id === id);
  const selectedWalkthrough = () => byId(state.data.walkthroughs, state.walkthroughId);
  const allQuestions = () => [...state.data.questions, ...(state.data.lensQuestions || [])];
  const questionForStep = (step) => byId(allQuestions(), step.questionId);
  const selectedAnswerForStep = (step) => state.selections[step.questionId] ?? null;
  const selectedAnswerObjects = (walkthrough) => walkthrough.steps.map((step) => {
    const question = questionForStep(step);
    const answer = question.answers.find((item) => item.id === selectedAnswerForStep(step));
    return answer ? { question, answer } : null;
  }).filter(Boolean);
  const matchesAuthoredRoute = (walkthrough) => walkthrough.steps.every((step) => selectedAnswerForStep(step) === step.selectedAnswerId);
  const observationGroups = [
    { label: "How you tend to develop", constructs: new Set(["C01", "C02", "C04", "C06", "C07", "C09", "C11", "C14", "C16"]) },
    { label: "How you protect, recover, or respond", constructs: new Set(["C03", "C05", "C08", "C12", "C13"]) },
    { label: "What kind of plan or boundary you accept", constructs: new Set(["C10", "C15"]) }
  ];
  const observationClause = (value) => {
    const text = String(value || "").replace(/^(Prefers|Accepts|Reports|Rejects|Uses)\s+/i, "").replace(/[.]$/, "");
    return text ? `${text.charAt(0).toLowerCase()}${text.slice(1)}` : "";
  };
  const groupedObservations = (walkthrough) => {
    const selected = selectedAnswerObjects(walkthrough).filter(({ question }) => question.evidenceClass === "BEHAVIORAL_OBSERVATION");
    return observationGroups.map((group) => ({
      label: group.label,
      clauses: selected.filter(({ question }) => group.constructs.has(question.constructId)).map(({ answer }) => observationClause(answer.observation)).filter(Boolean)
    })).filter((group) => group.clauses.length);
  };
  const observedSummary = (walkthrough) => `<ul class="observation-groups">${groupedObservations(walkthrough).map((group) => `<li><strong>${escapeHtml(group.label)}:</strong> ${group.clauses.map(escapeHtml).join("; ")}.</li>`).join("")}</ul>`;
  const playerJargon = (question) => (question.jargon || []).filter((item) => {
    if (question.id === "b1.gate.disruption.v1" && ["JRG_BOARD_WIPE", "JRG_BOARD"].includes(item.id)) return false;
    const core = String(item.definition || "").replace(/^(?:Here,\s*)?[^.?!]+?\s+means\s+/i, "").replace(/[.!?]+$/, "").trim().toLowerCase();
    return !(core.length >= 24 && question.prompt.toLowerCase().includes(core));
  });

  function setMode(mode) {
    state.mode = mode;
    state.deepen = false;
    modeButtons.forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    modeCaption.textContent = mode === "guided"
      ? "Ten explicitly authored journeys, including the final information-to-plan and guarded lens scenarios. Selections do not calculate a result."
      : mode === "questions"
        ? "All 35 behavioral questions plus one separately labeled lens example. Player copy stays separate from reviewer-only evidence contracts."
      : "All 37 identities are CONTENT_READY while observability and mapping validation remain separate, visible axes.";
    render();
  }

  function walkthroughMenu() {
    return `
      <aside class="journey-menu" aria-label="Authored walkthroughs">
        <p class="menu-heading">Choose a review journey</p>
        ${state.data.walkthroughs.map((item) => `
          <button class="journey-choice ${item.id === state.walkthroughId ? "is-active" : ""}" type="button" data-walkthrough="${escapeHtml(item.id)}">
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(item.subtitle)}</span>
          </button>
        `).join("")}
      </aside>`;
  }

  function reviewerQuestionDetail(question, selectedAnswerId, walkthrough) {
    if (!state.reviewer) return "";
    const answer = question.answers.find((item) => item.id === selectedAnswerId);
    if (question.evidenceClass === "IDENTITY_LENS_SELF_REPORT") return `
      <aside class="reviewer-detail lens-review" aria-label="Reviewer information">
        <dl>
          <dt>Evidence class</dt><dd>${escapeHtml(question.evidenceClass)} · explicitly stated preference, not behavioral observation</dd>
          <dt>Eligibility rule</dt><dd>${escapeHtml(walkthrough.lensEligibility?.reason || question.askWhen)}</dd>
          <dt>Candidate set</dt><dd>${escapeHtml((walkthrough.lensEligibility?.candidateSet || question.candidateSet).join(" / "))}</dd>
          <dt>Independent behavior</dt><dd>${escapeHtml(walkthrough.lensEligibility?.independentBehavioralObservations || 0)} observations before lens eligibility</dd>
          <dt>Do not ask</dt><dd>${escapeHtml(question.doNotAskWhen)}</dd>
          <dt>Source</dt><dd>${escapeHtml(question.sourceRef)}</dd>
        </dl>
        ${answer ? `<div class="reviewer-answer"><strong>Selected self-report contract</strong><p>${escapeHtml(answer.observation)}</p><p>${escapeHtml(answer.status)} · ${escapeHtml(answer.direction)}</p><p>${escapeHtml(answer.limitation)}</p></div>` : ""}
      </aside>`;
    return `
      <aside class="reviewer-detail" aria-label="Reviewer information">
        <dl>
          <dt>Evidence class</dt><dd>${escapeHtml(question.evidenceClass)}</dd>
          <dt>Primary construct</dt><dd>${escapeHtml(question.construct.id)} · ${escapeHtml(question.construct.name)} — ${escapeHtml(question.construct.definition)}</dd>
          <dt>Not an inference of</dt><dd>${escapeHtml(question.construct.doesNotMean)}</dd>
          <dt>Dependency</dt><dd>${escapeHtml(question.dependencyGroup)} · ${escapeHtml(question.construct.dependencyOverlap)}</dd>
          <dt>Disposition</dt><dd>${escapeHtml(question.productFit.disposition)}</dd>
          <dt>Commander situation</dt><dd>${escapeHtml(question.productFit.commanderSituation)}</dd>
          <dt>Evidence / limit</dt><dd>${escapeHtml(question.productFit.support)} ${escapeHtml(question.doNotAskWhen)}</dd>
          <dt>Source</dt><dd>${escapeHtml(question.sourceRef)}; ${escapeHtml(question.productFit.sourceRef)}</dd>
        </dl>
        ${answer ? `
          <div class="reviewer-answer">
            <strong>Selected answer contract</strong>
            <p>${escapeHtml(answer.observation)}</p>
            <p>${escapeHtml(answer.primarySignal)}${answer.secondarySignal ? ` · bounded secondary ${escapeHtml(answer.secondarySignal)}` : ""}</p>
            <p>${escapeHtml(answer.status)} · ${escapeHtml(answer.mappingConfidence)}</p>
            <p>${escapeHtml(answer.limitation)}</p>
          </div>` : ""}
      </aside>`;
  }

  function renderGuidedQuestion(walkthrough) {
    const routeStep = walkthrough.steps[state.step];
    const question = questionForStep(routeStep);
    const selected = selectedAnswerForStep(routeStep);
    const progress = ((state.step + 1) / walkthrough.steps.length) * 100;
    return `
      <section class="question-panel" aria-labelledby="question-title">
        <header class="panel-head">
          <div class="progress-row">
            <span class="stage-chip ${question.evidenceClass === "IDENTITY_LENS_SELF_REPORT" ? "lens-chip" : ""}">${escapeHtml(question.presentationLabel || question.stage)}</span>
            <span class="count-chip">Question ${state.step + 1} of ${walkthrough.steps.length}</span>
          </div>
          <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div>
        </header>
        <div class="question-body">
          <p class="eyebrow">${escapeHtml(walkthrough.label)} review route</p>
          <h2 id="question-title">${escapeHtml(question.prompt)}</h2>
          ${question.help ? `<p class="lens-help">${escapeHtml(question.help)}</p>` : ""}
          ${playerJargon(question).length ? `<p class="jargon-help">${playerJargon(question).map((item) => escapeHtml(item.definition)).join(" ")}</p>` : ""}
          <div class="answer-list" role="radiogroup" aria-label="Answer choices">
            ${question.answers.map((answer) => `
              <label class="answer-option ${selected === answer.id ? "is-selected" : ""}">
                <input type="radio" name="answer" value="${escapeHtml(answer.id)}" ${selected === answer.id ? "checked" : ""}>
                <span class="answer-copy"><strong>${escapeHtml(answer.title)}</strong><span>${escapeHtml(answer.explanation)}</span></span>
              </label>
            `).join("")}
          </div>
          ${reviewerQuestionDetail(question, selected, walkthrough)}
        </div>
        <footer class="panel-actions">
          <button class="text-button" type="button" data-action="restart">Restart journey</button>
          <div class="action-group">
            <button class="secondary-button" type="button" data-action="previous" ${state.step === 0 ? "disabled" : ""}>Previous</button>
            <button class="primary-button" type="button" data-action="next" ${selected ? "" : "disabled"}>${state.step === walkthrough.steps.length - 1 ? "Open authored result" : "Next question"}</button>
          </div>
        </footer>
      </section>`;
  }

  function resultHeading(walkthrough, result) {
    if (walkthrough.state === "insufficient") return "Not enough evidence to distinguish a fit";
    if (walkthrough.state === "contradictory") return "Your behavior and stated resonance point differently";
    if (walkthrough.state === "mixed") return `${result.name} is worth exploring`;
    return result.name;
  }

  function resultSections(walkthrough, result, compact = false) {
    const routeMatched = matchesAuthoredRoute(walkthrough);
    const routeExplanation = routeMatched ? `<p>${escapeHtml(walkthrough.routeSupportedDistinction)}</p>` : "";
    const nearby = result.nearbyAlternative
      ? `<section class="reading-block"><h3>Closest alternative</h3><p>${escapeHtml(result.nearbyAlternative)}</p></section>`
      : "";
    const boundary = result.label && result.summary
      ? `<section class="reading-block boundary-contrast"><span>${escapeHtml(result.label)}</span><p>${escapeHtml(result.summary)}</p></section>`
      : "";
    const lensQuestion = walkthrough.lensEvidence ? byId(state.data.lensQuestions || [], walkthrough.lensEvidence.questionId) : null;
    const lensAnswer = lensQuestion ? byId(lensQuestion.answers, walkthrough.lensEvidence.answerId) : null;
    const lensSection = lensAnswer ? `<section class="reading-block lens-evidence"><h3>What you said resonates</h3><p><strong>${escapeHtml(lensAnswer.title)}.</strong> ${escapeHtml(lensAnswer.explanation)}</p><p class="evidence-note">Explicit self-report only · ${escapeHtml(lensAnswer.status)}</p></section>` : "";
    return `
      <div class="reading-sections ${compact ? "is-compact" : ""}">
        <section class="reading-block"><h3>What your Commander answers showed</h3>${observedSummary(walkthrough)}</section>
        ${lensSection}
        <section class="reading-block"><h3>Why this identity is plausible</h3>${routeExplanation}<p class="identity-context">${escapeHtml(result.identityContext || walkthrough.identityContext)}</p></section>
        ${nearby}
        <section class="reading-block"><h3>What distinguishes the two</h3><p>${escapeHtml(result.observableDistinction)}</p></section>
        ${boundary}
        <section class="reading-block is-limit"><h3>What remains unsettled</h3><p>${escapeHtml(walkthrough.publicLimitation)}</p></section>
        <section class="reading-block"><h3>Explore this in Commander</h3><p>${escapeHtml(result.commanderDirection)}</p></section>
        <section class="reading-block"><h3>Continue through Vox Mana</h3><p>${escapeHtml(result.nextStep)}</p><div class="destination-row"><span>Open dossier</span><span>Compare in Matrix</span><span>Explore in Maze</span><span>See Commander directions</span></div></section>
      </div>`;
  }

  function renderGuidedResult(walkthrough) {
    const result = walkthrough.result;
    const contentClass = result.contentReadiness.replace("CONTENT_", "").toLowerCase();
    return `
      <section class="result-panel" aria-labelledby="result-title">
        <div class="axis-row"><span class="status-chip status-${contentClass}">${escapeHtml(result.contentReadiness)}</span><span class="status-chip">${escapeHtml(result.instrumentObservability)}</span><span class="status-chip">${escapeHtml(result.mappingValidation)}</span></div>
        <p class="result-kicker">${escapeHtml(walkthrough.label)} · ${escapeHtml(walkthrough.state)} review state</p>
        <h2 id="result-title">${escapeHtml(resultHeading(walkthrough, result))}</h2>
        <p class="result-state-note"><strong>Owner review simulation — not a calculated placement.</strong></p>
        ${resultSections(walkthrough, result)}
        <div class="panel-actions">
          <button class="text-button" type="button" data-action="restart">Restart journey</button>
          <div class="action-group">
            <button class="secondary-button" type="button" data-action="previous-result">Previous question</button>
            <button class="primary-button" type="button" data-action="deepen">${state.deepen ? "Hide deeper reading" : "Deepen this reading"}</button>
          </div>
        </div>
        ${state.deepen ? `<aside class="deepen-panel"><strong>Optional reflective layer</strong><p>${escapeHtml(result.profileEnrichment)} This lens may help explain why the observed Commander pattern feels satisfying. It did not determine the authored result.</p></aside>` : ""}
        ${state.reviewer ? `<aside class="reviewer-detail"><p><strong>Content readiness, instrument observability, and mapping validation are independent. No mapping is validated.</strong></p><dl><dt>Gate A state</dt><dd>${escapeHtml(walkthrough.state)} · ${escapeHtml(walkthrough.stateNote)}</dd><dt>Content readiness</dt><dd>${escapeHtml(result.contentReadiness)} · ${escapeHtml(result.contentRationale)}</dd><dt>Instrument observability</dt><dd>${escapeHtml(result.instrumentObservability)} · ${escapeHtml(result.observabilityRationale)}</dd><dt>Mapping validation</dt><dd>${escapeHtml(result.mappingValidation)}</dd><dt>Evidence class</dt><dd>${walkthrough.lensEvidence ? "BEHAVIORAL_OBSERVATION + IDENTITY_LENS_SELF_REPORT (separate ledgers)" : "BEHAVIORAL_OBSERVATION only"}</dd><dt>Eligibility rule</dt><dd>${escapeHtml(walkthrough.lensEligibility?.reason || "No lens question was eligible or needed.")}</dd><dt>Candidate set</dt><dd>${escapeHtml((walkthrough.lensEligibility?.candidateSet || []).join(" / ") || "Not applicable")}</dd><dt>Contradiction status</dt><dd>${escapeHtml(walkthrough.contradictionStatus || "NONE")}</dd><dt>Non-scoring status</dt><dd>Authored simulation; no weights, points, or calculated placement.</dd><dt>Authored-path check</dt><dd>${matchesAuthoredRoute(walkthrough) ? "Selections match the authored review path." : "Selections differ from the authored review path; the preauthored distinction is withheld from player copy."}</dd><dt>Unresolved validation need</dt><dd>${escapeHtml(result.unresolvedValidationNeed)}</dd><dt>Observation sources</dt><dd>${escapeHtml(result.answerObservationSources)}</dd><dt>Identity sources</dt><dd>${escapeHtml(result.certifiedIdentitySources)}</dd><dt>Alternative sources</dt><dd>${escapeHtml(result.nearestAlternativeSources)}</dd><dt>Prototype source</dt><dd>${escapeHtml(walkthrough.sourceRef)}; ${escapeHtml(result.sourceRef)}</dd><dt>Authored route</dt><dd>${walkthrough.steps.map((step) => escapeHtml(step.questionId)).join(" → ")}</dd></dl></aside>` : ""}
      </section>`;
  }

  function renderGuided() {
    const walkthrough = selectedWalkthrough();
    return `<div class="journey-layout">${walkthroughMenu()}${state.resultVisible ? renderGuidedResult(walkthrough) : renderGuidedQuestion(walkthrough)}</div>`;
  }

  function questionCard(question) {
    const isLens = question.evidenceClass === "IDENTITY_LENS_SELF_REPORT";
    return `
      <details class="explorer-card">
        <summary>
          <span class="stage-chip ${isLens ? "lens-chip" : ""}">${escapeHtml(question.presentationLabel || question.stage)} · ${escapeHtml(question.constructId || question.evidenceClass)}</span>
          <span class="card-id">${escapeHtml(question.id)}</span>
          <span class="card-prompt">${escapeHtml(question.prompt)}</span>
        </summary>
        <div class="explorer-content">
          ${question.help ? `<p class="lens-help">${escapeHtml(question.help)}</p>` : ""}
          ${playerJargon(question).length ? `<p class="jargon-help">${playerJargon(question).map((item) => escapeHtml(item.definition)).join(" ")}</p>` : ""}
          ${question.answers.map((answer) => `
            <section class="explorer-answer">
              <strong>${escapeHtml(answer.title)}</strong>
              <p>${escapeHtml(answer.explanation)}</p>
              ${state.reviewer ? `<div class="reviewer-detail"><p><strong>${isLens ? "Explicit self-report" : "Observation"}:</strong> ${escapeHtml(answer.observation)}</p>${isLens ? `<p><strong>Evidence class:</strong> ${escapeHtml(answer.evidenceClass)} · ${escapeHtml(answer.direction)}</p>` : `<p><strong>Provisional signal:</strong> ${escapeHtml(answer.primarySignal)}${answer.secondarySignal ? ` · ${escapeHtml(answer.secondarySignal)}` : ""}</p>`}<p><strong>Evidence / status:</strong> ${escapeHtml(answer.evidence || question.sourceRef)} · ${escapeHtml(answer.status)}</p><p><strong>Limitation:</strong> ${escapeHtml(answer.limitation)}</p></div>` : ""}
            </section>`).join("")}
          ${state.reviewer ? isLens
            ? `<aside class="reviewer-detail lens-review"><dl><dt>Evidence class</dt><dd>${escapeHtml(question.evidenceClass)}</dd><dt>Candidate set</dt><dd>${escapeHtml(question.candidateSet.join(" / "))}</dd><dt>Dependency</dt><dd>${escapeHtml(question.dependencyGroup)}</dd><dt>Ask / do not ask</dt><dd>${escapeHtml(question.askWhen)} ${escapeHtml(question.doNotAskWhen)}</dd><dt>Maximum</dt><dd>One lens self-report per journey</dd><dt>Evidence</dt><dd>${escapeHtml(question.sourceRef)}</dd></dl></aside>`
            : `<aside class="reviewer-detail"><dl><dt>Evidence class</dt><dd>${escapeHtml(question.evidenceClass)}</dd><dt>Construct</dt><dd>${escapeHtml(question.constructId)} · ${escapeHtml(question.construct.name)} — ${escapeHtml(question.construct.definition)}</dd><dt>Dependency</dt><dd>${escapeHtml(question.dependencyGroup)} · ${escapeHtml(question.construct.dependencyOverlap)}</dd><dt>Disposition</dt><dd>${escapeHtml(question.productFit.disposition)}</dd><dt>Situation</dt><dd>${escapeHtml(question.productFit.commanderSituation)}</dd><dt>Ask / do not ask</dt><dd>${escapeHtml(question.askWhen)} ${escapeHtml(question.doNotAskWhen)}</dd><dt>Evidence</dt><dd>${escapeHtml(question.productFit.evidenceRefs)}</dd></dl></aside>` : ""}
        </div>
      </details>`;
  }

  function renderQuestions() {
    return `
      <header class="explorer-head"><div><p class="eyebrow">Question explorer</p><h2>One construct at a time</h2></div><p>Player copy is always visible. Turn on reviewer information to inspect provisional signals, dependencies, evidence, exclusions, and limitations.</p></header>
      ${["Gate", "Hall", "Crucible"].map((stage) => {
        const questions = state.data.questions.filter((item) => item.stage === stage);
        return `<section class="stage-section"><h3>${stage} <span class="count-chip">${questions.length}</span></h3><div class="explorer-grid">${questions.map(questionCard).join("")}</div></section>`;
      }).join("")}
      <section class="stage-section lens-section"><h3>Optional identity lens <span class="count-chip">${(state.data.lensQuestions || []).length}</span></h3><p class="section-note">Separate secondary evidence examples. These are not behavioral constructs or faction selectors.</p><div class="explorer-grid">${(state.data.lensQuestions || []).map(questionCard).join("")}</div></section>`;
  }

  function resultCard(result) {
    const contentClass = result.contentReadiness.replace("CONTENT_", "").toLowerCase();
    return `
      <details class="result-card">
        <summary>
          <span class="result-summary"><strong>${escapeHtml(result.name)}</strong>${result.subtitle ? `<span class="result-subtitle">${escapeHtml(result.subtitle)}</span>` : ""}<span class="status-chip status-${contentClass}">${escapeHtml(result.contentReadiness)}</span></span>
          <span class="card-id">${escapeHtml(result.id)}</span>
        </summary>
        <div class="explorer-content">
          <section class="reading-block"><h3>What your answers could show</h3><p>${escapeHtml(result.whatAnswersShowed)}</p></section>
          <section class="reading-block"><h3>Why this identity is plausible</h3><p class="identity-context">${escapeHtml(result.identityContext)}</p></section>
          <section class="reading-block"><h3>Closest alternative</h3><p>${escapeHtml(result.nearbyAlternative)}</p></section>
          <section class="reading-block"><h3>What distinguishes the two</h3><p>${escapeHtml(result.observableDistinction)}</p></section>
          ${result.label && result.summary ? `<section class="reading-block boundary-contrast"><span>${escapeHtml(result.label)}</span><p>${escapeHtml(result.summary)}</p></section>` : ""}
          <section class="reading-block is-limit"><h3>What remains unsettled</h3><p>${escapeHtml(result.limitation)}</p></section>
          <section class="reading-block"><h3>Explore this in Commander</h3><p>${escapeHtml(result.commanderDirection)}</p></section>
          <section class="reading-block"><h3>Continue through Vox Mana</h3><p>${escapeHtml(result.nextStep)}</p><div class="destination-row"><span>Open dossier</span><span>Compare in Matrix</span><span>Explore in Maze</span><span>See Commander directions</span></div></section>
          ${state.reviewer ? `<aside class="reviewer-detail"><p><strong>Content readiness describes whether the result explanation package is usable. It does not mean placement accuracy or identity mapping has been validated.</strong></p><dl><dt>Content readiness</dt><dd>${escapeHtml(result.contentReadiness)} · ${escapeHtml(result.contentRationale)}</dd><dt>Instrument observability</dt><dd>${escapeHtml(result.instrumentObservability)} · ${escapeHtml(result.observabilityRationale)}</dd><dt>Mapping validation</dt><dd>${escapeHtml(result.mappingValidation)}</dd><dt>Unresolved validation need</dt><dd>${escapeHtml(result.unresolvedValidationNeed)}</dd><dt>Table read</dt><dd>${escapeHtml(result.tableRead)}</dd><dt>Profile boundary</dt><dd>${escapeHtml(result.profileEnrichment)}</dd><dt>Dossier value</dt><dd>${escapeHtml(result.dossierValue)}</dd><dt>Observation sources</dt><dd>${escapeHtml(result.answerObservationSources)}</dd><dt>Identity sources</dt><dd>${escapeHtml(result.certifiedIdentitySources)}</dd><dt>Alternative sources</dt><dd>${escapeHtml(result.nearestAlternativeSources)}</dd><dt>Prototype source</dt><dd>${escapeHtml(result.sourceRef)}</dd></dl></aside>` : ""}
        </div>
      </details>`;
  }

  function renderResults() {
    return `
      <header class="explorer-head"><div><p class="eyebrow">Result explorer</p><h2>Ready to explain. Honest about evidence.</h2></div><p>All 37 result packages are content-ready. Instrument observability and mapping validation remain separate and reviewer-visible.</p></header>
      <div class="result-grid">${state.data.results.map(resultCard).join("")}</div>`;
  }

  function render() {
    if (!state.data) return;
    app.innerHTML = state.mode === "guided" ? renderGuided() : state.mode === "questions" ? renderQuestions() : renderResults();
  }

  function restart() {
    state.step = 0;
    state.resultVisible = false;
    state.selections = {};
    state.deepen = false;
    render();
  }

  modeButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
  reviewerToggle.addEventListener("change", () => {
    state.reviewer = reviewerToggle.checked;
    render();
  });

  app.addEventListener("change", (event) => {
    if (!event.target.matches('input[name="answer"]')) return;
    const walkthrough = selectedWalkthrough();
    const routeStep = walkthrough.steps[state.step];
    state.selections[routeStep.questionId] = event.target.value;
    render();
  });

  app.addEventListener("click", (event) => {
    const walkthroughButton = event.target.closest("[data-walkthrough]");
    if (walkthroughButton) {
      state.walkthroughId = walkthroughButton.dataset.walkthrough;
      restart();
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    const walkthrough = selectedWalkthrough();
    if (action === "restart") restart();
    if (action === "previous" && state.step > 0) { state.step -= 1; render(); }
    if (action === "next") {
      if (!selectedAnswerForStep(walkthrough.steps[state.step])) return;
      if (state.step < walkthrough.steps.length - 1) state.step += 1;
      else state.resultVisible = true;
      render();
    }
    if (action === "previous-result") { state.resultVisible = false; state.step = walkthrough.steps.length - 1; state.deepen = false; render(); }
    if (action === "deepen") { state.deepen = !state.deepen; render(); }
  });

  fetch("prototype-data.json")
    .then((response) => {
      if (!response.ok) throw new Error(`Data request returned ${response.status}`);
      return response.json();
    })
    .then((data) => {
      state.data = data;
      render();
    })
    .catch((error) => {
      app.innerHTML = `<div class="load-error"><strong>The prototype data could not be opened.</strong><p>${escapeHtml(error.message)}</p><p>Open this directory through a simple local static server as described in <code>README.md</code>; no package installation is required.</p></div>`;
    });
})();

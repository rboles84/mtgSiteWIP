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
  const questionForStep = (step) => byId(state.data.questions, step.questionId);
  const selectedAnswerForStep = (step) => state.selections[step.questionId] ?? null;
  const selectedAnswerObjects = (walkthrough) => walkthrough.steps.map((step) => {
    const question = questionForStep(step);
    const answer = question.answers.find((item) => item.id === selectedAnswerForStep(step));
    return answer ? { question, answer } : null;
  }).filter(Boolean);
  const matchesAuthoredRoute = (walkthrough) => walkthrough.steps.every((step) => selectedAnswerForStep(step) === step.selectedAnswerId);
  const observationGroups = [
    { label: "How you tend to develop", constructs: new Set(["C01", "C02", "C04", "C06", "C07", "C09", "C11", "C14"]) },
    { label: "How you protect, recover, or respond", constructs: new Set(["C03", "C05", "C08", "C12", "C13"]) },
    { label: "What kind of plan or boundary you accept", constructs: new Set(["C10", "C15"]) }
  ];
  const observationClause = (value) => {
    const text = String(value || "").replace(/^(Prefers|Accepts|Reports|Rejects|Uses)\s+/i, "").replace(/[.]$/, "");
    return text ? `${text.charAt(0).toLowerCase()}${text.slice(1)}` : "";
  };
  const groupedObservations = (walkthrough) => {
    const selected = selectedAnswerObjects(walkthrough);
    return observationGroups.map((group) => ({
      label: group.label,
      clauses: selected.filter(({ question }) => group.constructs.has(question.constructId)).map(({ answer }) => observationClause(answer.observation)).filter(Boolean)
    })).filter((group) => group.clauses.length);
  };
  const observedSummary = (walkthrough) => `<ul class="observation-groups">${groupedObservations(walkthrough).map((group) => `<li><strong>${escapeHtml(group.label)}:</strong> ${group.clauses.map(escapeHtml).join("; ")}.</li>`).join("")}</ul>`;
  const playerJargon = (question) => question.jargon.filter((item) => {
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
      ? "Five explicitly authored journeys. Your selections are for experience review and do not change the preauthored result."
      : mode === "questions"
        ? "All 34 approved questions. Player-facing answer copy stays separate from reviewer-only constructs, dependencies, signals, evidence, and limitations."
      : "All 37 identities retain a CONTENT READY, CONTENT PARTIAL, or CONTENT GAP explanation status. These labels do not validate placement accuracy.";
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

  function reviewerQuestionDetail(question, selectedAnswerId) {
    if (!state.reviewer) return "";
    const answer = question.answers.find((item) => item.id === selectedAnswerId);
    return `
      <aside class="reviewer-detail" aria-label="Reviewer information">
        <dl>
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
            <span class="stage-chip">${escapeHtml(question.stage)}</span>
            <span class="count-chip">Question ${state.step + 1} of ${walkthrough.steps.length}</span>
          </div>
          <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div>
        </header>
        <div class="question-body">
          <p class="eyebrow">${escapeHtml(walkthrough.label)} review route</p>
          <h2 id="question-title">${escapeHtml(question.prompt)}</h2>
          ${playerJargon(question).length ? `<p class="jargon-help">${playerJargon(question).map((item) => escapeHtml(item.definition)).join(" ")}</p>` : ""}
          <div class="answer-list" role="radiogroup" aria-label="Answer choices">
            ${question.answers.map((answer) => `
              <label class="answer-option ${selected === answer.id ? "is-selected" : ""}">
                <input type="radio" name="answer" value="${escapeHtml(answer.id)}" ${selected === answer.id ? "checked" : ""}>
                <span class="answer-copy"><strong>${escapeHtml(answer.title)}</strong><span>${escapeHtml(answer.explanation)}</span></span>
              </label>
            `).join("")}
          </div>
          ${reviewerQuestionDetail(question, selected)}
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
    return `
      <div class="reading-sections ${compact ? "is-compact" : ""}">
        <section class="reading-block"><h3>What your answers showed</h3>${observedSummary(walkthrough)}</section>
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
    return `
      <section class="result-panel" aria-labelledby="result-title">
        <span class="status-chip status-${result.status.toLowerCase()}">CONTENT ${escapeHtml(result.status)}</span>
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
        ${state.reviewer ? `<aside class="reviewer-detail"><p><strong>Content readiness describes whether the result explanation package is usable. It does not mean placement accuracy or identity mapping has been validated.</strong></p><dl><dt>Gate A state</dt><dd>${escapeHtml(walkthrough.state)} · ${escapeHtml(walkthrough.stateNote)}</dd><dt>Content readiness</dt><dd>${escapeHtml(result.status)} · ${escapeHtml(result.statusRationale)}</dd><dt>Authored-path check</dt><dd>${matchesAuthoredRoute(walkthrough) ? "Selections match the authored review path." : "Selections differ from the authored review path; the preauthored distinction is withheld from player copy."}</dd><dt>Unresolved reviewer evidence</dt><dd>${escapeHtml(result.missingValue)}</dd><dt>Observation sources</dt><dd>${escapeHtml(result.answerObservationSources)}</dd><dt>Identity sources</dt><dd>${escapeHtml(result.certifiedIdentitySources)}</dd><dt>Alternative sources</dt><dd>${escapeHtml(result.nearestAlternativeSources)}</dd><dt>Prototype source</dt><dd>${escapeHtml(walkthrough.sourceRef)}; ${escapeHtml(result.sourceRef)}</dd><dt>Authored route</dt><dd>${walkthrough.steps.map((step) => escapeHtml(step.questionId)).join(" → ")}</dd></dl></aside>` : ""}
      </section>`;
  }

  function renderGuided() {
    const walkthrough = selectedWalkthrough();
    return `<div class="journey-layout">${walkthroughMenu()}${state.resultVisible ? renderGuidedResult(walkthrough) : renderGuidedQuestion(walkthrough)}</div>`;
  }

  function questionCard(question) {
    return `
      <details class="explorer-card">
        <summary>
          <span class="stage-chip">${escapeHtml(question.stage)} · ${escapeHtml(question.constructId)}</span>
          <span class="card-id">${escapeHtml(question.id)}</span>
          <span class="card-prompt">${escapeHtml(question.prompt)}</span>
        </summary>
        <div class="explorer-content">
          ${playerJargon(question).length ? `<p class="jargon-help">${playerJargon(question).map((item) => escapeHtml(item.definition)).join(" ")}</p>` : ""}
          ${question.answers.map((answer) => `
            <section class="explorer-answer">
              <strong>${escapeHtml(answer.title)}</strong>
              <p>${escapeHtml(answer.explanation)}</p>
              ${state.reviewer ? `<div class="reviewer-detail"><p><strong>Observation:</strong> ${escapeHtml(answer.observation)}</p><p><strong>Provisional signal:</strong> ${escapeHtml(answer.primarySignal)}${answer.secondarySignal ? ` · ${escapeHtml(answer.secondarySignal)}` : ""}</p><p><strong>Evidence / status:</strong> ${escapeHtml(answer.evidence)} · ${escapeHtml(answer.status)}</p><p><strong>Limitation:</strong> ${escapeHtml(answer.limitation)}</p></div>` : ""}
            </section>`).join("")}
          ${state.reviewer ? `<aside class="reviewer-detail"><dl><dt>Construct</dt><dd>${escapeHtml(question.constructId)} · ${escapeHtml(question.construct.name)} — ${escapeHtml(question.construct.definition)}</dd><dt>Dependency</dt><dd>${escapeHtml(question.dependencyGroup)} · ${escapeHtml(question.construct.dependencyOverlap)}</dd><dt>Disposition</dt><dd>${escapeHtml(question.productFit.disposition)}</dd><dt>Situation</dt><dd>${escapeHtml(question.productFit.commanderSituation)}</dd><dt>Ask / do not ask</dt><dd>${escapeHtml(question.askWhen)} ${escapeHtml(question.doNotAskWhen)}</dd><dt>Evidence</dt><dd>${escapeHtml(question.productFit.evidenceRefs)}</dd></dl></aside>` : ""}
        </div>
      </details>`;
  }

  function renderQuestions() {
    return `
      <header class="explorer-head"><div><p class="eyebrow">Question explorer</p><h2>One construct at a time</h2></div><p>Player copy is always visible. Turn on reviewer information to inspect provisional signals, dependencies, evidence, exclusions, and limitations.</p></header>
      ${["Gate", "Hall", "Crucible"].map((stage) => {
        const questions = state.data.questions.filter((item) => item.stage === stage);
        return `<section class="stage-section"><h3>${stage} <span class="count-chip">${questions.length}</span></h3><div class="explorer-grid">${questions.map(questionCard).join("")}</div></section>`;
      }).join("")}`;
  }

  function resultCard(result) {
    return `
      <details class="result-card">
        <summary>
          <span class="result-summary"><strong>${escapeHtml(result.name)}</strong>${result.subtitle ? `<span class="result-subtitle">${escapeHtml(result.subtitle)}</span>` : ""}<span class="status-chip status-${result.status.toLowerCase()}">CONTENT ${escapeHtml(result.status)}</span></span>
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
          ${state.reviewer ? `<aside class="reviewer-detail"><p><strong>Content readiness describes whether the result explanation package is usable. It does not mean placement accuracy or identity mapping has been validated.</strong></p><dl><dt>Status rationale</dt><dd>${escapeHtml(result.statusRationale)}</dd><dt>Unresolved reviewer evidence</dt><dd>${escapeHtml(result.missingValue)}</dd><dt>Table read</dt><dd>${escapeHtml(result.tableRead)}</dd><dt>Profile boundary</dt><dd>${escapeHtml(result.profileEnrichment)}</dd><dt>Dossier value</dt><dd>${escapeHtml(result.dossierValue)}</dd><dt>Observation sources</dt><dd>${escapeHtml(result.answerObservationSources)}</dd><dt>Identity sources</dt><dd>${escapeHtml(result.certifiedIdentitySources)}</dd><dt>Alternative sources</dt><dd>${escapeHtml(result.nearestAlternativeSources)}</dd><dt>Prototype source</dt><dd>${escapeHtml(result.sourceRef)}</dd></dl></aside>` : ""}
        </div>
      </details>`;
  }

  function renderResults() {
    return `
      <header class="explorer-head"><div><p class="eyebrow">Result explorer</p><h2>Useful where ready. Explicit where not.</h2></div><p>Content readiness describes whether the result explanation package is usable. It does not mean placement accuracy or identity mapping has been validated.</p></header>
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

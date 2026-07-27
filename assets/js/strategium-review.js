(() => {
  const mount = document.getElementById("strategiumReview");
  if (!mount) return;

  const consoleLessons = {
    command: { label: "Command Zone", lesson: "command-zone" },
    pod: { label: "Pod Readiness", lesson: "pod-readiness" },
    archetype: { label: "Archetype Signal", lesson: "archetype-signal" },
    threat: { label: "Threat Reading", lesson: "threat-reading" },
    heat: { label: "Heat Management", lesson: "heat-management" },
    beyond: { label: "Beyond WUBRG", lesson: "beyond-wubrg" },
    checklist: { label: "Commander Readiness Checklist", href: "../console/#readiness-checklist" }
  };

  const results = {
    "opening-hand": {
      title: "The hand may not have had a workable first chapter",
      happened: "One possibility is that the hand contained castable cards without enough mana, early action, or a path into what the deck actually wants to do.",
      look: "Notice whether the first three turns develop resources, present a plan, or leave you waiting for one exact draw.",
      try: "Before your next keep, name the first useful action and what the hand does if your commander is delayed.",
      lessons: ["pod", "checklist"]
    },
    "mana-development": {
      title: "Resource development may have broken the deck's rhythm",
      happened: "Drawing too many or too few lands may decide a game, but this pattern can also happen when ramp, card draw, and the deck's mana costs do not line up.",
      look: "Track when you first used most of your mana and whether each turn gave you a meaningful choice.",
      try: "For one game, note unused mana and turns where the cards in hand cost more than you could reasonably spend.",
      lessons: ["pod", "checklist"]
    },
    sequencing: {
      title: "The order of plays may have cost information or tempo",
      happened: "You may have had the right tools but used them in an order that exposed a key card, spent interaction too early, or left less mana for the next decision.",
      look: "Watch what changes if you draw first, develop resources first, or wait to reveal the most important part of the turn.",
      try: "At the start of one turn, pause and say the whole sequence to yourself before tapping mana.",
      lessons: ["threat", "command"]
    },
    "commander-dependence": {
      title: "The deck may have been leaning too hard on the command zone",
      happened: "This pattern can happen when the commander is the engine, payoff, and recovery plan at the same time. Repeated removal then interrupts more than one part of the deck.",
      look: "Notice what the deck can still advance when the commander costs more, is answered, or never stays in play.",
      try: "Play one game asking, “What is my best non-commander turn?” before each recast.",
      lessons: ["command"]
    },
    "open-mana": {
      title: "Open mana may have changed which plays were safe",
      happened: "Your important cards might have run into interaction because the table still had mana and cards available. That does not mean casting was always wrong; the window may simply have been contested.",
      look: "Before a key spell, check who can respond, who benefits if it fails, and whether a smaller play can draw out an answer.",
      try: "Ask the table what is currently most dangerous before committing your most important card.",
      lessons: ["threat"]
    },
    "other-plan": {
      title: "Another deck's engine may not have announced itself clearly",
      happened: "One possibility is that you saw individual cards without recognizing the repeatable engine, setup piece, or closing pattern they were assembling.",
      look: "Watch for resources that grow every turn, pieces that make later cards cheaper, and commanders that turn ordinary actions into repeated value.",
      try: "After the next unfamiliar game, ask that pilot for the deck's one-sentence plan and earliest warning sign.",
      lessons: ["archetype", "threat"]
    },
    "beyond-wubrg": {
      title: "Artifacts or colorless pieces may have hidden the deck's real plan",
      happened: "Colorless cards can look interchangeable even when they are ramp, engines, combo pieces, or finishers. The unfamiliar texture may have made the board harder to read.",
      look: "Separate cards that only make resources from cards that repeatedly convert those resources into cards, damage, or a win.",
      try: "Choose one unfamiliar artifact after the game and ask what role it played, rather than trying to learn the whole board at once.",
      lessons: ["beyond", "archetype"]
    },
    targeting: {
      title: "The table may have been responding to more than actual power",
      happened: "Repeated attention might reflect current strength, what your board visibly suggested, what players expected you to do next, what they remembered from earlier games, or how the table conversation formed.",
      look: "Separate the five signals below. They can overlap, but they are not the same evidence.",
      try: "When pressure starts, ask: “What are you most worried this board will do next?” Then answer with your actual position, not only your intent.",
      lessons: ["heat", "threat"],
      signals: [
        ["Actual power", "What your board and hand can really do now."],
        ["Visible power", "What the table can see without knowing your hand."],
        ["Expected future power", "What players think your engine or commander will become."],
        ["Remembered power", "What this commander, deck, or pilot did in an earlier game."],
        ["Social pressure", "How table influence, confidence, deals, or repeated claims shape attention."]
      ]
    },
    "power-mismatch": {
      title: "The decks may have entered with different expectations",
      happened: "A game can feel unwinnable when speed, interaction, resilience, or finish quality differs sharply across the pod. One game cannot prove a stable power ranking, but it can reveal a conversation the table skipped.",
      look: "Compare when each deck first became dangerous, how easily it recovered, and whether the pre-game descriptions matched what happened.",
      try: "Before the next game, describe speed, combos, and sharp edges in plain language instead of relying on one power number.",
      lessons: ["pod", "checklist"]
    },
    "one-sided": {
      title: "The game may have closed before meaningful choices developed",
      happened: "This pattern can happen when one deck starts much faster, an early engine goes unanswered, or several players lose resources while one player keeps theirs.",
      look: "Find the earliest turn when the table still had a real shared decision. That point is often more useful than the final winning play.",
      try: "Review that first turning point and name one question or interaction window the table could have noticed sooner.",
      lessons: ["threat", "pod"]
    },
    "won-unclear": {
      title: "Your deck may have crossed a closing window quietly",
      happened: "You might have won because earlier resource development, opponents exhausting answers, or a low-profile board created a safe final turn. The last play is not always the whole explanation.",
      look: "Notice when opponents stopped holding mana, when your repeatable value survived, and when the table began fighting somewhere else.",
      try: "Reconstruct the two turns before the win and identify the first moment your line became hard to stop.",
      lessons: ["threat", "heat", "archetype"]
    },
    "game-flow": {
      title: "Too many plans may have competed for your attention",
      happened: "This pattern can happen when triggers, unfamiliar archetypes, and several possible threats arrive together. Missing the thread does not mean you missed every correct play.",
      look: "Reduce the board to three questions: who can win soon, who is gaining repeatable resources, and who still has answers.",
      try: "At the next busy table, track only commanders, open mana, and one engine per player for a full turn cycle.",
      lessons: ["archetype", "threat"]
    },
    "social-friction": {
      title: "The table experience may need a conversation, not a gameplay diagnosis",
      happened: "A bad experience might come from mismatched expectations, unclear deals, repeated pressure, pace, communication, or conduct. A short review cannot decide another player's intent.",
      look: "Separate the game action from the table behavior: what happened, what was said, and what boundary or expectation was unclear?",
      try: "Use one neutral sentence next time: “I was expecting a different kind of game; can we reset what this pod wants?”",
      lessons: ["pod", "heat"]
    },
    uncertain: {
      title: "Not knowing yet is still useful information",
      happened: "The game may have turned on several small choices rather than one obvious cause. Memory also gets noisier after a long or emotional game.",
      look: "Choose one observable thread next time: opening hand, unused mana, commander recasts, first major engine, or the first player treated as the threat.",
      try: "Write down one turning point immediately after the game, without trying to explain it yet.",
      lessons: ["threat", "checklist"]
    }
  };

  const questions = {
    family: {
      eyebrow: "Choose a situation",
      title: "What are you trying to understand?",
      intro: "Only After the Game is a complete guided path in this MVP.",
      options: [
        { id: "before-game", label: "Before the Game", note: "In development", disabled: true },
        { id: "during-game", label: "During the Game", note: "In development", disabled: true },
        { id: "after-game", label: "After the Game", note: "Available now", next: "after" },
        { id: "finding-table", label: "Finding a Table", note: "In development", disabled: true },
        { id: "start-unsure", label: "I don't know where to start", note: "Begin with a gentle after-game review", next: "after" }
      ]
    },
    after: {
      eyebrow: "After the Game",
      title: "What best describes the game?",
      options: [
        { id: "lost", label: "I lost", next: "loss" },
        { id: "won-unclear", label: "I won, but I'm not sure why", result: "won-unclear" },
        { id: "couldnt-follow", label: "I couldn't follow what was happening", result: "game-flow" },
        { id: "one-sided", label: "The game felt one-sided or unwinnable", result: "one-sided" },
        { id: "table-bad", label: "The table experience felt bad", result: "social-friction" },
        { id: "takeaway-unsure", label: "I'm not sure what I should take from it", result: "uncertain" }
      ]
    },
    loss: {
      eyebrow: "A closer look at the loss",
      title: "What did the loss feel like from your side?",
      intro: "Choose the closest feeling. It is a clue, not a proven cause.",
      options: [
        { id: "never-started", label: "My deck never got going", next: "never-started" },
        { id: "opening-hand", label: "My opening hand may have been wrong", result: "opening-hand" },
        { id: "mana-draw", label: "I drew too many or too few lands", result: "mana-development" },
        { id: "wrong-order", label: "I think I played things in the wrong order", result: "sequencing" },
        { id: "stopped", label: "My important cards kept getting stopped", next: "stopped" },
        { id: "other-plan", label: "I didn't understand another deck's plan", next: "other-plan" },
        { id: "focused", label: "Everyone seemed to focus on me", result: "targeting" },
        { id: "stronger", label: "The other decks seemed much stronger", result: "power-mismatch" },
        { id: "nothing-mattered", label: "I was doing things, but none of them mattered", result: "one-sided" },
        { id: "loss-unsure", label: "I honestly don't know", result: "uncertain" }
      ]
    },
    "never-started": {
      eyebrow: "Narrow the pattern",
      title: "What seemed to be missing first?",
      options: [
        { id: "commander-needed", label: "The deck needed my commander to function", result: "commander-dependence" },
        { id: "resources-late", label: "I could not develop enough mana or cards", result: "mana-development" },
        { id: "pod-fast", label: "The game moved before my plan was ready", result: "power-mismatch" },
        { id: "start-unknown", label: "I couldn't identify what was missing", result: "uncertain" }
      ]
    },
    stopped: {
      eyebrow: "Narrow the pattern",
      title: "What kept getting stopped?",
      options: [
        { id: "commander-stopped", label: "My commander, repeatedly", result: "commander-dependence" },
        { id: "key-spells", label: "My key spells when opponents had mana open", result: "open-mana" },
        { id: "visible-engine", label: "The same visible engine or payoff", result: "targeting" },
        { id: "stopped-unsure", label: "I couldn't tell why those cards drew answers", result: "uncertain" }
      ]
    },
    "other-plan": {
      eyebrow: "Narrow the pattern",
      title: "What was hardest to read?",
      options: [
        { id: "engine-hidden", label: "I didn't recognize the engine or win pattern", result: "other-plan" },
        { id: "artifact-confusion", label: "Artifacts or colorless cards all blurred together", result: "beyond-wubrg" },
        { id: "wrong-piece", label: "I reacted, but probably to the wrong piece", result: "open-mana" },
        { id: "plan-unsure", label: "I was lost across the whole board", result: "game-flow" }
      ]
    }
  };

  let trail = [];
  let feedback = "";

  function currentState() {
    let questionId = "family";
    let resultId = "";
    const validTrail = [];

    for (const optionId of trail) {
      const question = questions[questionId];
      const option = question && question.options.find(item => item.id === optionId && !item.disabled);
      if (!option) break;
      validTrail.push(optionId);
      if (option.result) {
        resultId = option.result;
        questionId = "";
        break;
      }
      questionId = option.next || questionId;
    }

    trail = validTrail;
    return { questionId, resultId };
  }

  function updateUrl(mode = "push") {
    const url = new URL(window.location.href);
    if (trail.length) url.searchParams.set("path", trail.join("/"));
    else url.searchParams.delete("path");
    window.history[`${mode}State`]({ strategiumPath: trail.slice() }, "", url);
  }

  function lessonLink(key) {
    const lesson = consoleLessons[key];
    const href = lesson.href || `../console/?lesson=${encodeURIComponent(lesson.lesson)}`;
    return `<a class="vm-lesson-link" href="${href}"><span>${lesson.label}</span><strong>Open lesson -&gt;</strong></a>`;
  }

  function renderQuestion(questionId) {
    const question = questions[questionId] || questions.family;
    const progress = questionId === "family" ? 1 : Math.min(3, trail.length + 1);
    mount.innerHTML = `
      <div class="vm-review-toolbar">
        <div class="vm-review-progress" aria-label="Review progress"><span style="--progress:${(progress / 3) * 100}%"></span></div>
        <span>Step ${progress} of up to 3</span>
      </div>
      <div class="vm-review-copy">
        <span class="vm-eyebrow">${question.eyebrow}</span>
        <h2 tabindex="-1" data-review-focus>${question.title}</h2>
        ${question.intro ? `<p>${question.intro}</p>` : ""}
      </div>
      <div class="vm-review-options">
        ${question.options.map(option => `
          <button class="vm-review-option" type="button" data-option="${option.id}" ${option.disabled ? "disabled" : ""} aria-describedby="${option.note ? `note-${option.id}` : ""}">
            <span>${option.label}</span>
            ${option.note ? `<small id="note-${option.id}">${option.note}</small>` : ""}
          </button>`).join("")}
      </div>
      <div class="vm-review-nav">
        ${trail.length ? '<button class="vm-button vm-button-secondary" type="button" data-review-action="back">Back</button>' : ""}
        <button class="vm-button vm-button-quiet" type="button" data-review-action="start-over">Start over</button>
        <a class="vm-button vm-button-quiet" href="../">Return to Strategium</a>
      </div>`;
    focusHeading();
  }

  function renderResult(resultId) {
    const result = results[resultId] || results.uncertain;
    mount.innerHTML = `
      <article class="vm-result-card">
        <div class="vm-review-toolbar"><div class="vm-review-progress" aria-label="Review complete"><span style="--progress:100%"></span></div><span>Possible pattern</span></div>
        <header class="vm-result-header"><span class="vm-eyebrow">A possible read</span><h2 tabindex="-1" data-review-focus>${result.title}</h2><p>This is a place to look, not proof of why the game ended.</p></header>
        <div class="vm-result-grid">
          <section aria-labelledby="result-happened"><h3 id="result-happened">What may have happened</h3><p>${result.happened}</p></section>
          <section aria-labelledby="result-look"><h3 id="result-look">What to look for next time</h3><p>${result.look}</p></section>
          <section aria-labelledby="result-try"><h3 id="result-try">One thing to try</h3><p>${result.try}</p></section>
          <section aria-labelledby="result-learn"><h3 id="result-learn">Learn more</h3><div class="vm-lesson-grid">${result.lessons.map(lessonLink).join("")}</div></section>
        </div>
        ${result.signals ? `<details class="vm-targeting-signals"><summary>See the five signals the table may be reading</summary><div>${result.signals.map(([name, copy]) => `<article><strong>${name}</strong><p>${copy}</p></article>`).join("")}</div></details>` : ""}
        <fieldset class="vm-result-feedback"><legend>Did this match your game?</legend><p>Your choice stays on this page only.</p><div>${["Yes", "Partly", "No", "Something was missing"].map(choice => `<button type="button" class="vm-feedback-choice" data-feedback="${choice}" aria-pressed="${feedback === choice}">${choice}</button>`).join("")}</div><p class="vm-feedback-state" role="status">${feedback ? `Saved on this page: ${feedback}` : "No feedback selected."}</p></fieldset>
        <div class="vm-review-nav">
          <button class="vm-button vm-button-secondary" type="button" data-review-action="back">Back</button>
          <button class="vm-button" type="button" data-review-action="start-over">Start over</button>
          <a class="vm-button vm-button-quiet" href="../">Return to Strategium</a>
        </div>
      </article>`;
    focusHeading();
  }

  function focusHeading() {
    window.setTimeout(() => {
      const heading = mount.querySelector("[data-review-focus]");
      if (heading) heading.focus({ preventScroll: true });
    }, 0);
  }

  function render() {
    const state = currentState();
    if (state.resultId) renderResult(state.resultId);
    else renderQuestion(state.questionId || "family");
  }

  mount.addEventListener("click", event => {
    const option = event.target.closest("[data-option]");
    const action = event.target.closest("[data-review-action]");
    const feedbackButton = event.target.closest("[data-feedback]");

    if (option && !option.disabled) {
      trail.push(option.dataset.option);
      feedback = "";
      updateUrl("push");
      render();
      return;
    }

    if (action && action.dataset.reviewAction === "back") {
      if (trail.length) {
        trail.pop();
        feedback = "";
        updateUrl("push");
        render();
      }
      return;
    }

    if (action && action.dataset.reviewAction === "start-over") {
      trail = [];
      feedback = "";
      updateUrl("push");
      render();
      return;
    }

    if (feedbackButton) {
      feedback = feedbackButton.dataset.feedback;
      mount.querySelectorAll("[data-feedback]").forEach(button => button.setAttribute("aria-pressed", String(button === feedbackButton)));
      const status = mount.querySelector(".vm-feedback-state");
      if (status) status.textContent = `Saved on this page: ${feedback}`;
      if (window.vmAnalytics && typeof window.vmAnalytics.track === "function") {
        window.vmAnalytics.track("strategium_result_feedback", { value: feedback });
      }
    }
  });

  window.addEventListener("popstate", () => {
    trail = (new URLSearchParams(window.location.search).get("path") || "").split("/").filter(Boolean);
    feedback = "";
    render();
  });

  trail = (new URLSearchParams(window.location.search).get("path") || "").split("/").filter(Boolean);
  render();
  updateUrl("replace");
})();

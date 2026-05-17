export const RESULT_VERSION = "2026-05-10";
export const ADAPTIVE_MODEL_VERSION = "vox-mana-adaptive-placement-v1";
export const MANA_ORDER = ["W", "U", "B", "R", "G"];

export const DEFAULT_STARTER_PROFILE = {
  format_interest: "commander",
  budget_band: "mid",
  experience_level: "returning",
};

const STAGE_LABELS = {
  gate: "Gate",
  hall: "Hall",
  crucible: "Crucible",
};

/**
 * Returns a normalized starter profile with defaults filled in.
 *
 * @param {object=} profile Partial starter profile.
 * @returns {{format_interest:string,budget_band:string,experience_level:string}} Normalized starter profile.
 */
export function normalizeStarterProfile(profile = {}) {
  return {
    ...DEFAULT_STARTER_PROFILE,
    ...profile,
  };
}

/**
 * Creates an empty mana-score object in WUBRG order.
 *
 * @returns {{W:number,U:number,B:number,R:number,G:number}} Empty mana score map.
 */
export function createEmptyManaScores() {
  return { W: 0, U: 0, B: 0, R: 0, G: 0 };
}

/**
 * Builds an empty adaptive placement state with equal log priors for every faction.
 *
 * @param {object} model Generated placement model.
 * @returns {object} Mutable adaptive placement state.
 */
export function createInitialAdaptiveState(model) {
  const scores = {};
  const factionKeys = Object.keys(model.factions || {});
  const prior = model.scoring_rules?.prior_log_probability ?? Math.log(1 / Math.max(1, factionKeys.length));

  factionKeys.forEach((key) => {
    scores[key] = prior;
  });

  return {
    model_version: model._meta?.model_version || ADAPTIVE_MODEL_VERSION,
    scores,
    pruned: [],
    asked_question_ids: [],
    stage_counts: { gate: 0, hall: 0, crucible: 0 },
    evidence_trail: [],
    stage_history: [],
  };
}

/**
 * Returns a deep-cloned state safe to mutate.
 *
 * @param {object} state Adaptive placement state.
 * @returns {object} Cloned state.
 */
function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

/**
 * Converts a likelihood value into the configured log-score delta.
 *
 * @param {number} likelihood Answer likelihood.
 * @param {object} rules Scoring rules from the placement model.
 * @returns {number} Log-score delta.
 */
export function likelihoodToDelta(likelihood, rules = {}) {
  const table = rules.likelihood_to_delta || {};
  const exact = Number(likelihood).toFixed(2);
  if (Object.prototype.hasOwnProperty.call(table, exact)) {
    return table[exact];
  }

  const entries = Object.entries(table)
    .map(([key, value]) => [Number(key), value])
    .sort((left, right) => Math.abs(left[0] - likelihood) - Math.abs(right[0] - likelihood));

  return entries.length ? entries[0][1] : 0;
}

/**
 * Applies a score delta and tracks the explanation.
 *
 * @param {object} state Adaptive placement state.
 * @param {string} factionKey Faction key to score.
 * @param {number} delta Score delta.
 * @param {string} reason Evidence reason.
 * @param {object[]} deltas Trail delta collector.
 */
function applyDelta(state, factionKey, delta, reason, deltas) {
  if (!Object.prototype.hasOwnProperty.call(state.scores, factionKey)) {
    return;
  }

  if (state.pruned.includes(factionKey)) {
    return;
  }

  state.scores[factionKey] += delta;
  deltas.push({
    faction: factionKey,
    delta: Number(delta.toFixed(3)),
    reason,
  });
}

/**
 * Applies lateral inhibition for a strongly reinforced faction.
 *
 * @param {object} options Inhibition options.
 */
function applyLateralInhibition({ state, model, question, reinforcedFaction, answer, deltas }) {
  const faction = model.factions?.[reinforcedFaction];
  const targets = faction?.lateral_inhibition_targets || [];
  if (!targets.length) {
    return;
  }

  const rules = model.scoring_rules || {};
  const directLikelihoods = answer.likelihoods || {};
  const baseDelta =
    question.stage === "gate"
      ? (rules.same_color_pair_inhibition_delta || -0.65) / 2
      : rules.lateral_inhibition_delta || -0.95;

  targets.forEach((target) => {
    if (Object.prototype.hasOwnProperty.call(directLikelihoods, target)) {
      return;
    }
    applyDelta(
      state,
      target,
      baseDelta,
      `${faction.name} lateral inhibition from ${answer.signal || answer.title}`,
      deltas
    );
  });
}

/**
 * Applies one selected answer to the adaptive placement state.
 *
 * @param {object} options Answer application options.
 * @param {object} options.state Current adaptive placement state.
 * @param {object} options.model Generated placement model.
 * @param {object} options.question Question that was answered.
 * @param {object} options.answer Selected answer.
 * @param {number=} options.answerIndex Selected answer index.
 * @returns {object} Updated adaptive placement state.
 */
export function applyAdaptiveAnswer({ state, model, question, answer, answerIndex = 0 }) {
  const next = cloneState(state);
  const rules = model.scoring_rules || {};
  const deltas = [];
  const pruned = new Set(next.pruned || []);
  const reinforced = [];

  Object.entries(answer.likelihoods || {}).forEach(([factionKey, likelihood]) => {
    if (Number(likelihood) <= 0.03) {
      pruned.add(factionKey);
      deltas.push({
        faction: factionKey,
        delta: rules.prune_delta || -3.5,
        reason: `Pruned by ${answer.signal || answer.title}`,
      });
      return;
    }

    const delta = likelihoodToDelta(Number(likelihood), rules);
    if (delta > 0) {
      reinforced.push({ factionKey, likelihood: Number(likelihood) });
    }
    applyDelta(next, factionKey, delta, answer.signal || answer.title, deltas);
  });

  Object.entries(answer.suppresses || {}).forEach(([factionKey, strength]) => {
    const magnitude = Math.abs(likelihoodToDelta(Number(strength), rules));
    applyDelta(next, factionKey, -magnitude, `Suppressed by ${answer.signal || answer.title}`, deltas);
  });

  (answer.prunes || []).forEach((factionKey) => {
    pruned.add(factionKey);
    deltas.push({
      faction: factionKey,
      delta: rules.prune_delta || -3.5,
      reason: `Pruned by ${answer.signal || answer.title}`,
    });
  });

  next.pruned = [...pruned];

  reinforced
    .filter((entry) => entry.likelihood >= (question.stage === "gate" ? 0.85 : 0.75))
    .forEach((entry) => {
      applyLateralInhibition({
        state: next,
        model,
        question,
        reinforcedFaction: entry.factionKey,
        answer,
        deltas,
      });
    });

  next.asked_question_ids.push(question.id);
  next.stage_counts[question.stage] = (next.stage_counts[question.stage] || 0) + 1;
  next.stage_history.push({
    stage: question.stage,
    question_id: question.id,
    answer_index: answerIndex,
    answer_title: answer.title,
    signal: answer.signal || answer.title,
  });
  next.evidence_trail.push({
    stage: question.stage,
    question_id: question.id,
    prompt: question.prompt,
    answer_title: answer.title,
    signal: answer.signal || answer.title,
    deltas,
  });

  return next;
}

/**
 * Computes softmax probabilities from the current log scores.
 *
 * @param {object} state Adaptive placement state.
 * @returns {object} Probability map by faction key.
 */
export function softmaxScores(state) {
  const pruned = new Set(state.pruned || []);
  const entries = Object.entries(state.scores || {}).filter(([key]) => !pruned.has(key));
  const maxScore = Math.max(...entries.map(([, score]) => score), 0);
  const expEntries = entries.map(([key, score]) => [key, Math.exp(score - maxScore)]);
  const total = expEntries.reduce((sum, [, value]) => sum + value, 0) || 1;
  const probabilities = {};

  expEntries.forEach(([key, value]) => {
    probabilities[key] = value / total;
  });

  pruned.forEach((key) => {
    probabilities[key] = 0;
  });

  return probabilities;
}

/**
 * Builds ranked faction probabilities from the current adaptive state.
 *
 * @param {object} state Adaptive placement state.
 * @param {object} model Generated placement model.
 * @returns {object[]} Ranked faction entries.
 */
export function rankAdaptiveFactions(state, model) {
  const probabilities = softmaxScores(state);
  return Object.values(model.factions || {})
    .map((faction) => ({
      faction: faction.key,
      faction_name: faction.name,
      institution_type: faction.institution_type,
      world: faction.world,
      score: Number((state.scores[faction.key] || 0).toFixed(3)),
      probability: probabilities[faction.key] || 0,
      confidence: probabilities[faction.key] || 0,
      colors: faction.colors || [],
    }))
    .sort((left, right) => {
      if (right.probability !== left.probability) {
        return right.probability - left.probability;
      }
      return left.faction.localeCompare(right.faction);
    })
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

/**
 * Creates a stable pair id independent of candidate order.
 *
 * @param {string[]} pair Faction pair.
 * @returns {string} Sorted pair id.
 */
function pairId(pair) {
  return pair.slice().sort().join("__");
}

/**
 * Finds an unasked Crucible question for current leading candidates.
 *
 * @param {object[]} ranked Ranked faction entries.
 * @param {object} model Generated placement model.
 * @param {Set<string>} asked Asked question ids.
 * @returns {object|null} Crucible question when available.
 */
function findCrucibleQuestion(ranked, model, asked) {
  const questions = model.question_bank?.crucible || [];
  const questionByPair = new Map(questions.map((question) => [pairId(question.pair || []), question]));
  const candidates = ranked.slice(0, 4);

  for (let left = 0; left < candidates.length; left += 1) {
    for (let right = left + 1; right < candidates.length; right += 1) {
      const question = questionByPair.get(pairId([candidates[left].faction, candidates[right].faction]));
      if (question && !asked.has(question.id)) {
        return question;
      }
    }
  }

  return null;
}

/**
 * Checks whether the top candidates need a Crucible discriminator.
 *
 * @param {object} state Adaptive placement state.
 * @param {object} model Generated placement model.
 * @param {object[]} ranked Ranked faction entries.
 * @returns {boolean} True when a Crucible should be asked.
 */
export function needsCrucible(state, model, ranked = rankAdaptiveFactions(state, model)) {
  if ((state.stage_counts.crucible || 0) >= (model.stages?.crucible?.max_questions || 1)) {
    return false;
  }

  const [top, runnerUp] = ranked;
  if (!top || !runnerUp) {
    return false;
  }

  const gap = top.probability - runnerUp.probability;
  const topFaction = model.factions?.[top.faction];
  const runnerFaction = model.factions?.[runnerUp.faction];
  const collision =
    topFaction?.lateral_inhibition_targets?.includes(runnerUp.faction) ||
    runnerFaction?.lateral_inhibition_targets?.includes(top.faction);

  return gap < (model.scoring_rules?.crucible_probability_gap || 0.12) || Boolean(collision && gap < 0.24);
}

/**
 * Finds the next Hall question for leading candidates.
 *
 * @param {object[]} ranked Ranked faction entries.
 * @param {object} model Generated placement model.
 * @param {Set<string>} asked Asked question ids.
 * @returns {object|null} Hall question when available.
 */
function findHallQuestion(ranked, model, asked) {
  const hallQuestions = model.question_bank?.hall || [];
  for (const candidate of ranked.slice(0, 5)) {
    const question = hallQuestions.find(
      (item) => item.faction === candidate.faction && !asked.has(item.id)
    );
    if (question) {
      return question;
    }
  }

  return hallQuestions.find((item) => !asked.has(item.id)) || null;
}

/**
 * Selects the next adaptive question in Gate -> Hall -> Crucible order.
 *
 * @param {object} state Adaptive placement state.
 * @param {object} model Generated placement model.
 * @returns {object|null} Next question or null when complete.
 */
export function selectNextAdaptiveQuestion(state, model) {
  const asked = new Set(state.asked_question_ids || []);
  const stageCounts = state.stage_counts || {};
  const gateQuestions = model.question_bank?.gate || [];
  const gateMax = model.stages?.gate?.max_questions || gateQuestions.length;

  if ((stageCounts.gate || 0) < gateMax) {
    return gateQuestions[stageCounts.gate] || null;
  }

  const ranked = rankAdaptiveFactions(state, model);
  const hallMin = model.stages?.hall?.min_questions || 2;
  const hallMax = model.stages?.hall?.max_questions || 3;

  if ((stageCounts.hall || 0) < hallMin) {
    return findHallQuestion(ranked, model, asked);
  }

  if (needsCrucible(state, model, ranked)) {
    const crucible = findCrucibleQuestion(ranked, model, asked);
    if (crucible) {
      return crucible;
    }
  }

  if ((stageCounts.hall || 0) < hallMax && !shouldFinishAdaptiveReading(state, model, ranked)) {
    return findHallQuestion(ranked, model, asked);
  }

  return null;
}

/**
 * Checks whether the adaptive reading has enough evidence to finish.
 *
 * @param {object} state Adaptive placement state.
 * @param {object} model Generated placement model.
 * @param {object[]=} ranked Optional ranked candidates.
 * @returns {boolean} True when the reading should finalize.
 */
export function shouldFinishAdaptiveReading(
  state,
  model,
  ranked = rankAdaptiveFactions(state, model)
) {
  const counts = state.stage_counts || {};
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  if ((counts.gate || 0) < (model.stages?.gate?.min_questions || 4)) {
    return false;
  }

  if ((counts.hall || 0) < (model.stages?.hall?.min_questions || 2)) {
    return false;
  }

  if ((counts.crucible || 0) >= 1) {
    return true;
  }

  if (total >= (model.stages?.max_total_questions || 8)) {
    return true;
  }

  const [top, runnerUp] = ranked;
  const gap = top && runnerUp ? top.probability - runnerUp.probability : 0;
  if (gap >= (model.scoring_rules?.decisive_probability_gap || 0.24) && total >= 6) {
    return true;
  }

  const asked = new Set(state.asked_question_ids || []);
  const crucible = needsCrucible(state, model, ranked)
    ? findCrucibleQuestion(ranked, model, asked)
    : null;
  if (!crucible && (counts.hall || 0) >= (model.stages?.hall?.max_questions || 3)) {
    return true;
  }

  return false;
}

/**
 * Replays saved question/answer selections into a fresh adaptive state.
 *
 * @param {object} model Generated placement model.
 * @param {object[]} selections Prior selections.
 * @returns {object} Rebuilt adaptive state.
 */
export function replayAdaptiveSelections(model, selections = []) {
  let state = createInitialAdaptiveState(model);
  selections.forEach((selection) => {
    state = applyAdaptiveAnswer({
      state,
      model,
      question: selection.question,
      answer: selection.answer,
      answerIndex: selection.answerIndex || 0,
    });
  });
  return state;
}

/**
 * Returns the display label for a question stage.
 *
 * @param {string} stage Stage id.
 * @returns {string} Human-readable stage label.
 */
export function getStageLabel(stage) {
  return STAGE_LABELS[stage] || "Reading";
}

/**
 * Builds a compact evidence summary for a faction.
 *
 * @param {string} factionKey Faction key.
 * @param {object} state Adaptive placement state.
 * @returns {string[]} Up to three signals that supported the faction.
 */
function supportingSignalsForFaction(factionKey, state) {
  return (state.evidence_trail || [])
    .filter((entry) => entry.deltas?.some((delta) => delta.faction === factionKey && delta.delta > 0))
    .map((entry) => entry.signal)
    .filter(Boolean)
    .slice(-3);
}

/**
 * Builds a readable reason for a ranked match.
 *
 * @param {object} match Ranked match.
 * @param {object} state Adaptive placement state.
 * @param {object} model Generated placement model.
 * @returns {string} Short reason.
 */
function buildAdaptiveReason(match, state, model) {
  const signals = supportingSignalsForFaction(match.faction, state);
  const expression = model.factions?.[match.faction]?.biological_expression?.archetype;

  if (signals.length) {
    return `${match.faction_name} stayed close through ${signals.join(", ")}.`;
  }

  return expression
    ? `${match.faction_name} remained adjacent as ${expression.toLowerCase()}.`
    : `${match.faction_name} remained adjacent to the evidence trail.`;
}

/**
 * Builds normalized mana scores from ranked faction probabilities.
 *
 * @param {object[]} ranked Ranked faction probabilities.
 * @returns {object} Mana score map.
 */
function buildManaScores(ranked) {
  const rawScores = createEmptyManaScores();
  ranked.forEach((match) => {
    (match.colors || []).forEach((color) => {
      rawScores[color] += match.probability;
    });
  });

  const max = Math.max(...Object.values(rawScores), 0.01);
  const normalized = {};
  MANA_ORDER.forEach((color) => {
    normalized[color] = Math.max(1, Math.min(10, Math.round((rawScores[color] / max) * 10)));
  });
  return normalized;
}

/**
 * Builds an interpretive quick-path decree from the adaptive evidence trail.
 *
 * @param {object} top Top ranked match.
 * @param {object|null} runnerUp Runner-up match.
 * @param {object} state Adaptive placement state.
 * @param {object} model Generated placement model.
 * @param {object} starterProfile Starter profile.
 * @returns {string} Decree text.
 */
function buildAdaptiveDecree(top, runnerUp, state, model, starterProfile) {
  const faction = model.factions[top.faction];
  const signals = supportingSignalsForFaction(top.faction, state);
  const expression = faction?.biological_expression?.archetype || "behavioral expression";
  const signalLine = signals.length
    ? `Your answers repeatedly expressed ${signals.slice(0, 2).join(" and ")}.`
    : "Your answers formed a consistent evidence pattern.";
  const runnerLine = runnerUp
    ? `${runnerUp.faction_name} stayed near the reading, but ${top.faction_name} was the stronger match.`
    : `${top.faction_name} was the strongest match.`;

  return `${top.faction_name} recognizes the shape of your game as ${expression}. ${signalLine} ${runnerLine} This is a Vox Mana interpretive placement for a ${starterProfile.format_interest} start, not an objective diagnosis or official canon.`;
}

/**
 * Builds the full normalized placement result for a completed adaptive reading.
 *
 * @param {object} options Placement build options.
 * @param {object} options.state Adaptive placement state.
 * @param {object} options.model Generated placement model.
 * @param {object} options.factions Display faction map.
 * @param {object=} options.starterProfile Starter profile.
 * @param {string=} options.version Result contract version.
 * @returns {object} Normalized placement result.
 */
export function buildAdaptivePlacementResult({
  state,
  model,
  factions,
  starterProfile = DEFAULT_STARTER_PROFILE,
  version = RESULT_VERSION,
}) {
  const ranked = rankAdaptiveFactions(state, model).map((match) => {
    const display = factions[match.faction] || {};
    return {
      ...match,
      faction_name: display.name || match.faction_name,
      institution_type: display.institution_type || match.institution_type,
      world: display.world || match.world,
      colors: display.colors || match.colors,
      identity: display.identity || model.factions?.[match.faction]?.layered_identity || null,
    };
  });
  const top = ranked[0];
  const runnerUp = ranked[1] || null;
  const starter = normalizeStarterProfile(starterProfile);

  if (!top) {
    throw new Error("Adaptive reading requires at least one faction.");
  }

  const topMatches = ranked.slice(0, 3).map((match, index) => ({
    rank: index + 1,
    faction: match.faction,
    faction_name: match.faction_name,
    institution_type: match.institution_type,
    world: match.world,
    identity: match.identity || null,
    score: match.score,
    confidence: Number(match.confidence.toFixed(3)),
    reason: buildAdaptiveReason(match, state, model),
  }));

  return {
    version,
    model_version: model._meta?.model_version || state.model_version || ADAPTIVE_MODEL_VERSION,
    source_mode: "quick",
    faction: top.faction,
    faction_name: top.faction_name,
    institution_type: top.institution_type,
    world: top.world,
    identity: top.identity || null,
    decree: buildAdaptiveDecree(top, runnerUp, state, model, starter),
    confidence: Number(top.confidence.toFixed(3)),
    confidence_gap: runnerUp ? Number((top.confidence - runnerUp.confidence).toFixed(3)) : 1,
    mana_scores: buildManaScores(ranked),
    top_matches: topMatches,
    adjacent_matches: topMatches.slice(1, 3),
    starter_profile: starter,
    evidence_trail: state.evidence_trail || [],
    stage_history: state.stage_history || [],
  };
}

/**
 * Returns true when an answer directly supports a faction.
 *
 * @param {object} answer Answer object.
 * @param {string} factionKey Faction key.
 * @returns {boolean} True if answer likelihood supports the faction.
 */
export function answerSupportsFaction(answer, factionKey) {
  return Number(answer?.likelihoods?.[factionKey] || 0) >= 0.75;
}

/**
 * Runs an adaptive reading using a strategy callback, useful for tests and bias probes.
 *
 * @param {object} options Simulation options.
 * @returns {{state:object,result:object,selections:object[]}} Simulation output.
 */
export function runAdaptiveReadingWithStrategy({
  model,
  factions,
  starterProfile = DEFAULT_STARTER_PROFILE,
  strategy,
  maxSteps = 8,
}) {
  let state = createInitialAdaptiveState(model);
  const selections = [];

  for (let step = 0; step < maxSteps; step += 1) {
    const question = selectNextAdaptiveQuestion(state, model);
    if (!question) {
      break;
    }

    const ranked = rankAdaptiveFactions(state, model);
    const answerIndex = strategy(question, state, ranked);
    const answer = question.answers[answerIndex] || question.answers[0];
    selections.push({ question, answer, answerIndex });
    state = applyAdaptiveAnswer({ state, model, question, answer, answerIndex });

    if (shouldFinishAdaptiveReading(state, model)) {
      break;
    }
  }

  return {
    state,
    selections,
    result: buildAdaptivePlacementResult({ state, model, factions, starterProfile }),
  };
}

/**
 * Runs a targeted golden-path reading for one faction.
 *
 * @param {object} options Golden path options.
 * @returns {{state:object,result:object,selections:object[]}} Simulation output.
 */
export function runAdaptiveGoldenPath({ model, factions, targetFaction }) {
  return runAdaptiveReadingWithStrategy({
    model,
    factions,
    strategy(question) {
      let bestTargetIndex = -1;
      let bestTargetLikelihood = 0;
      question.answers.forEach((answer, index) => {
        const likelihood = Number(answer?.likelihoods?.[targetFaction] || 0);
        if (likelihood > bestTargetLikelihood) {
          bestTargetLikelihood = likelihood;
          bestTargetIndex = index;
        }
      });
      if (bestTargetIndex >= 0 && bestTargetLikelihood > 0) {
        return bestTargetIndex;
      }

      let leastHarmIndex = 0;
      let leastHarmScore = Number.POSITIVE_INFINITY;
      question.answers.forEach((answer, index) => {
        const suppressesTarget = Object.prototype.hasOwnProperty.call(
          answer.suppresses || {},
          targetFaction
        );
        const competitorBoost = Math.max(
          0,
          ...Object.entries(answer.likelihoods || {})
            .filter(([key]) => key !== targetFaction)
            .map(([, value]) => Number(value))
        );
        const harmScore = (suppressesTarget ? 2 : 0) + competitorBoost;
        if (harmScore < leastHarmScore) {
          leastHarmScore = harmScore;
          leastHarmIndex = index;
        }
      });
      return leastHarmIndex;
    },
  });
}

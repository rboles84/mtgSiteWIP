export const RESULT_VERSION = "2026-08-09-gate-b1-v1";
export const GATE_B1_MODEL_VERSION = "vm551-gate-b1-placement-engine-v1";
export const MANA_ORDER = ["W", "U", "B", "R", "G"];

export const DEFAULT_STARTER_PROFILE = Object.freeze({
  format_interest: "commander",
  budget_band: "mid",
  experience_level: "returning",
});

const STAGE_LABELS = Object.freeze({ gate: "Gate", hall: "Hall", crucible: "Crucible" });
const EPSILON = 1e-9;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function round(value, digits = 6) {
  const factor = 10 ** digits;
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

function unique(values) {
  return [...new Set(values)];
}

function pairId(left, right) {
  return [left, right].sort().join("__");
}

function allQuestions(model) {
  return [
    ...(model.question_bank?.gate || []),
    ...(model.question_bank?.hall || []),
    ...(model.question_bank?.crucible || []),
    ...(model.question_bank?.lens || []),
  ];
}

function identityById(model) {
  return new Map((model.identities || []).map((identity) => [identity.id, identity]));
}

function questionById(model) {
  return new Map(allQuestions(model).map((question) => [question.id, question]));
}

function answerById(model) {
  const result = new Map();
  for (const question of allQuestions(model)) {
    for (const answer of question.answers || []) {
      result.set(answer.id, { question, answer });
    }
  }
  return result;
}

export function normalizeStarterProfile(profile = {}) {
  return { ...DEFAULT_STARTER_PROFILE, ...(profile || {}) };
}

export function createEmptyManaScores() {
  return { W: 0, U: 0, B: 0, R: 0, G: 0 };
}

export function createInitialState(model) {
  return {
    model_version: model?._meta?.model_version || GATE_B1_MODEL_VERSION,
    instrument_version: model?._meta?.instrument_version || null,
    mapping_version: model?._meta?.mapping_version || null,
    asked_question_ids: [],
    answered_question_ids: [],
    stage_counts: { gate: 0, hall: 0, crucible: 0 },
    selections: [],
    evidence_ledger: [],
    lens_ledger: [],
    route_history: [],
  };
}

export const createInitialAdaptiveState = createInitialState;

function neutralAnswer(answer) {
  const signal = String(answer?.signal || answer?.direction || "");
  return (
    !signal ||
    /(?:UNKNOWN|CONDITIONAL|NON_DIRECTIONAL)$/.test(signal)
  );
}

function observationRecord(question, answer) {
  const mapping = answer.identity_mapping || {
    support: [],
    contradict: [],
    affected_identities: [],
    strength: 0,
    naming_evidence: false,
    qualification_eligible: false,
    qualification_support: [],
    naming_support: [],
    naming_rule_ids_by_identity: {},
    role: "observation_only",
    provenance: answer.evidence_provenance || null,
    status: "OBSERVATION_ONLY",
  };
  const neutral = neutralAnswer(answer);
  return {
    question_id: question.id,
    answer_id: answer.id,
    stage: question.stage,
    construct: question.construct_id,
    bounded_observation: answer.observation,
    signal: answer.signal || null,
    dependency_group: answer.dependency_group || question.dependency_group,
    evidence_class: "BEHAVIORAL_OBSERVATION",
    affected_identities: mapping.affected_identities || [],
    positive_support: neutral ? [] : mapping.support || [],
    contradiction: neutral ? [] : mapping.contradict || [],
    neutral,
    mapping_strength: neutral ? 0 : Number(mapping.strength || 0),
    naming_evidence: neutral ? false : mapping.naming_evidence === true,
    qualification_eligible: neutral ? false : mapping.qualification_eligible === true,
    qualification_support: neutral ? [] : [...(mapping.qualification_support || (mapping.qualification_eligible ? mapping.support || [] : []))],
    naming_support: neutral ? [] : [...(mapping.naming_support || (mapping.naming_evidence ? mapping.support || [] : []))],
    naming_rule_ids_by_identity: neutral ? {} : clone(mapping.naming_rule_ids_by_identity || {}),
    mapping_role: mapping.role,
    mapping_status: mapping.status,
    mapping_provenance: mapping.provenance,
    evidence_provenance: answer.evidence_provenance,
    limitation: answer.limitation,
    behavioral_vs_lens: "behavioral",
  };
}

function lensRecord(question, answer, state) {
  const directionIdentity = answer.direction === "YORE_LENS_ONLY"
    ? "YORE"
    : answer.direction === "GLINT_LENS_ONLY"
      ? "GLINT"
      : null;
  const ranked = rankCandidates(state, state.__model || null);
  const behavioralLeader = ranked[0]?.identity || null;
  const contradictionStatus = !directionIdentity
    ? "neutral"
    : behavioralLeader && behavioralLeader !== directionIdentity
      ? "conflicts_with_behavioral_leader"
      : "agrees_or_remains_bounded";
  return {
    evidence_class: "IDENTITY_LENS_SELF_REPORT",
    lens_question_id: question.id,
    lens_answer_id: answer.id,
    candidate_set_before_lens: question.candidate_set || [],
    independent_behavioral_observations: independentBehavioralConstructs(state).length,
    eligibility_reason: "Behavior left the approved Yore/Glint identity-lens boundary unresolved.",
    direction: answer.direction,
    bounded_observation: answer.observation,
    contradiction_status: contradictionStatus,
    scoring_status: answer.source_scoring_status,
    provenance: answer.source_ref,
    behavioral_vs_lens: "identity_lens_self_report",
  };
}

function assertQuestionAndAnswer(model, question, answer) {
  const canonicalQuestion = questionById(model).get(question?.id);
  if (!canonicalQuestion) throw new Error(`Unknown Gate B1 question: ${question?.id || "missing"}`);
  const canonicalAnswer = (canonicalQuestion.answers || []).find((item) => item.id === answer?.id);
  if (!canonicalAnswer) throw new Error(`Answer ${answer?.id || "missing"} does not belong to ${canonicalQuestion.id}`);
  return { question: canonicalQuestion, answer: canonicalAnswer };
}

export function observe({ state, model, question, answer, answerIndex = 0 }) {
  const canonical = assertQuestionAndAnswer(model, question, answer);
  if ((state.answered_question_ids || []).includes(canonical.question.id)) {
    throw new Error(`Question already answered: ${canonical.question.id}`);
  }

  const next = clone(state);
  const isLens = canonical.question.evidence_class === "IDENTITY_LENS_SELF_REPORT";
  if (isLens && lensEligibility(state, model, rankCandidates(state, model), { ignoreMainTargetLimit: true })?.id !== canonical.question.id) {
    throw new Error(`Lens question is not eligible for the current behavioral state: ${canonical.question.id}`);
  }
  next.asked_question_ids.push(canonical.question.id);
  next.answered_question_ids.push(canonical.question.id);
  next.stage_counts[canonical.question.stage] = (next.stage_counts[canonical.question.stage] || 0) + 1;
  next.selections.push({
    question_id: canonical.question.id,
    answer_id: canonical.answer.id,
    answer_index: answerIndex,
    stage: canonical.question.stage,
  });

  if (isLens) {
    const lensState = { ...next, __model: model };
    next.lens_ledger.push(lensRecord(canonical.question, canonical.answer, lensState));
  } else {
    next.evidence_ledger.push(observationRecord(canonical.question, canonical.answer));
  }

  next.route_history.push({
    question_id: canonical.question.id,
    answer_id: canonical.answer.id,
    stage: canonical.question.stage,
    evidence_class: isLens ? "IDENTITY_LENS_SELF_REPORT" : "BEHAVIORAL_OBSERVATION",
  });
  return next;
}

export function applyAdaptiveAnswer({ state, model, question, answer, answerIndex = 0 }) {
  return observe({ state, model, question, answer, answerIndex });
}

function independentBehavioralConstructs(state) {
  return unique(
    (state.evidence_ledger || [])
      .filter((entry) => !entry.neutral && entry.construct)
      .map((entry) => entry.construct)
  ).sort();
}

function strongestDependencyEffects(identityId, ledger, contradictionMultiplier) {
  const groups = new Map();
  for (const entry of ledger) {
    if (entry.neutral || !entry.dependency_group) continue;
    const current = groups.get(entry.dependency_group) || {
      positive: 0,
      contradiction: 0,
      naming: false,
      qualificationPositive: 0,
      namingRuleIds: new Set(),
      constructs: new Set(),
      qualificationConstructs: new Set(),
      answers: [],
    };
    if (entry.positive_support.includes(identityId)) {
      current.positive = Math.max(current.positive, entry.mapping_strength);
      if (entry.qualification_eligible && entry.qualification_support.includes(identityId)) {
        current.qualificationPositive = Math.max(current.qualificationPositive, entry.mapping_strength);
        current.qualificationConstructs.add(entry.construct);
      }
      const namingSupport = entry.naming_support || (entry.naming_evidence ? entry.positive_support : []);
      const authorizesIdentity = namingSupport.includes(identityId);
      current.naming ||= authorizesIdentity;
      if (authorizesIdentity) {
        const ruleIds = entry.naming_rule_ids_by_identity?.[identityId] || [`baseline-answer:${entry.answer_id}:${identityId}`];
        for (const ruleId of ruleIds) current.namingRuleIds.add(ruleId);
      }
      current.constructs.add(entry.construct);
      current.answers.push(entry.answer_id);
    }
    if (entry.contradiction.includes(identityId)) {
      current.contradiction = Math.max(
        current.contradiction,
        entry.mapping_strength * contradictionMultiplier
      );
      current.constructs.add(entry.construct);
      current.answers.push(entry.answer_id);
    }
    if (current.positive || current.contradiction) groups.set(entry.dependency_group, current);
  }
  return groups;
}

function routeAffinity(identity, ledger) {
  const affinities = new Set(identity.route_signal_affinities || []);
  const byDependency = new Map();
  for (const entry of ledger) {
    if (entry.neutral || !entry.construct || !entry.dependency_group) continue;
    const signalKey = `${entry.construct}:${entry.signal}`;
    const aligned = affinities.has(signalKey) ? 1 : 0;
    const relevant = (identity.supporting_constructs || []).includes(entry.construct) ? 0.2 : 0;
    byDependency.set(entry.dependency_group, Math.max(byDependency.get(entry.dependency_group) || 0, aligned + relevant));
  }
  const values = [...byDependency.values()];
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

export function rankCandidates(state, model) {
  if (!model) return [];
  const rules = model.scoring_rules || {};
  const ledger = state.evidence_ledger || [];
  const observedConstructs = new Set(independentBehavioralConstructs(state));
  const contradictionMultiplier = Number(rules.contradiction_multiplier || 0.75);

  return (model.identities || [])
    .map((identity) => {
      const effects = strongestDependencyEffects(identity.id, ledger, contradictionMultiplier);
      const effectValues = [...effects.values()];
      const positiveDependencies = effectValues.filter((effect) => effect.positive > 0).length;
      const qualificationDependencies = effectValues.filter((effect) => effect.qualificationPositive > 0).length;
      const namingDependencies = effectValues.filter((effect) => effect.positive > 0 && effect.naming).length;
      const contradictionDependencies = effectValues.filter((effect) => effect.contradiction > 0).length;
      const positiveConstructs = unique(effectValues
        .filter((effect) => effect.qualificationPositive > 0)
        .flatMap((effect) => [...effect.qualificationConstructs]))
        .sort();
      const namingRuleIds = unique(effectValues
        .filter((effect) => effect.positive > 0 && effect.naming)
        .flatMap((effect) => [...effect.namingRuleIds]))
        .sort();
      const directionalNet = effectValues.length
        ? effectValues.reduce((sum, effect) => sum + effect.positive - effect.contradiction, 0) / effectValues.length
        : 0;
      const observedSupporting = (identity.supporting_constructs || []).filter((construct) => observedConstructs.has(construct));
      const observedBoundary = (identity.boundary_constructs || []).filter((construct) => observedConstructs.has(construct));
      const structuralCoverage = observedSupporting.length / Math.max(1, identity.supporting_constructs?.length || 1);
      const affinity = routeAffinity(identity, ledger);
      const score =
        Number(rules.directional_weight || 0.75) * directionalNet +
        Number(rules.structural_weight || 0.25) * structuralCoverage;
      const contradictionStrength = effectValues.reduce((sum, effect) => sum + effect.contradiction, 0);
      const positiveStrength = effectValues.reduce((sum, effect) => sum + effect.positive, 0);
      return {
        identity: identity.id,
        identity_name: identity.name,
        family: identity.family,
        score: round(score),
        directional_net: round(directionalNet),
        positive_strength: round(positiveStrength),
        contradiction_strength: round(contradictionStrength),
        structural_coverage: round(structuralCoverage),
        route_affinity: round(affinity),
        positive_dependencies: positiveDependencies,
        qualification_dependencies: qualificationDependencies,
        naming_dependencies: namingDependencies,
        contradiction_dependencies: contradictionDependencies,
        positive_constructs: positiveConstructs,
        satisfied_naming_rule_ids: namingRuleIds,
        independent_constructs: observedSupporting.sort(),
        boundary_constructs: observedBoundary.sort(),
        can_name_from_behavior: identity.can_name_from_behavior === true,
        observability: identity.instrument_observability,
        mapping_validation: identity.mapping_validation,
      };
    })
    .sort((left, right) =>
      right.score - left.score ||
      right.naming_dependencies - left.naming_dependencies ||
      right.positive_dependencies - left.positive_dependencies ||
      right.route_affinity - left.route_affinity ||
      right.structural_coverage - left.structural_coverage ||
      left.identity.localeCompare(right.identity)
    )
    .map((candidate, index) => ({ ...candidate, rank: index + 1 }));
}

export const rankAdaptiveFactions = rankCandidates;

function plausibleCandidates(state, model, ranked = rankCandidates(state, model)) {
  const rules = model.scoring_rules || {};
  const hasNamingSupport = ranked.some((candidate) => candidate.naming_dependencies > 0);
  if (!hasNamingSupport) return ranked;
  const topScore = ranked[0]?.score || 0;
  const window = Number(rules.route_candidate_window || 0.3);
  const plausible = ranked.filter(
    (candidate) =>
      candidate.score >= topScore - window &&
      candidate.contradiction_strength < candidate.positive_strength + contradictionAllowance(candidate)
  );
  return (plausible.length >= 2 ? plausible : ranked.slice(0, 2)).slice(0, Number(rules.candidate_limit || 8));
}

function routingCandidates(state, model, ranked = rankCandidates(state, model)) {
  const limit = Number(model.scoring_rules?.candidate_limit || 8);
  const hasDirectionalSupport = ranked.some((candidate) => candidate.positive_strength > 0);
  if (hasDirectionalSupport) {
    const topScore = ranked[0]?.score || 0;
    const window = Number(model.scoring_rules?.route_candidate_window || 0.3);
    const withinWindow = ranked
      .filter((candidate) => candidate.score >= topScore - window)
      .slice(0, limit);
    const included = new Set(withinWindow.map((candidate) => candidate.identity));
    const supportedOutsideWindow = ranked.filter(
      (candidate) =>
        !included.has(candidate.identity) &&
        candidate.positive_strength > 0 &&
        candidate.contradiction_strength < candidate.positive_strength + contradictionAllowance(candidate)
    );
    const frontier = [...withinWindow, ...supportedOutsideWindow].slice(0, limit);
    return frontier.length >= 2 ? frontier : ranked.slice(0, Math.min(limit, 4));
  }
  return [...ranked]
    .sort((left, right) =>
      (right.score + right.route_affinity * 0.2) - (left.score + left.route_affinity * 0.2) ||
      right.route_affinity - left.route_affinity ||
      right.structural_coverage - left.structural_coverage ||
      left.identity.localeCompare(right.identity)
    )
    .slice(0, limit);
}

function contradictionAllowance(candidate) {
  return candidate.positive_strength > 0 ? 0.25 : 0;
}

function answerRoutingEffect(answer, question, identity) {
  const mapping = answer.identity_mapping || {};
  const signalKey = `${question.construct_id}:${answer.signal}`;
  const affinities = new Set(identity.route_signal_affinities || []);
  let effect = 0;
  if ((mapping.support || []).includes(identity.id)) effect += Number(mapping.strength || 0);
  if ((mapping.contradict || []).includes(identity.id)) effect -= Number(mapping.strength || 0) * 0.75;
  if (affinities.has(signalKey)) effect += 0.25;
  if ((identity.supporting_constructs || []).includes(question.construct_id)) effect += 0.03;
  return effect;
}

function directMappingEffect(answer, identityId) {
  const mapping = answer.identity_mapping || {};
  let effect = 0;
  if ((mapping.support || []).includes(identityId)) effect += Number(mapping.strength || 0);
  if ((mapping.contradict || []).includes(identityId)) effect -= Number(mapping.strength || 0) * 0.75;
  return effect;
}

function questionCanImproveBoundary(question, leftId, rightId) {
  return (question.answers || []).some(
    (answer) => !neutralAnswer(answer) && Math.abs(directMappingEffect(answer, leftId) - directMappingEffect(answer, rightId)) > EPSILON
  );
}

function questionQualificationUtility(state, model, question, candidates) {
  const contradictionMultiplier = Number(model.scoring_rules?.contradiction_multiplier || 0.75);
  let utility = 0;
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    const effects = strongestDependencyEffects(candidate.identity, state.evidence_ledger || [], contradictionMultiplier);
    const hasPositiveDependency = (effects.get(question.dependency_group)?.qualificationPositive || 0) > 0;
    const hasConstruct = candidate.positive_constructs.includes(question.construct_id);
    let bestGain = 0;
    for (const answer of question.answers || []) {
      if (neutralAnswer(answer) || !answer.identity_mapping?.support?.includes(candidate.identity)) continue;
      const namingSupport = answer.identity_mapping.naming_support || [];
      const namingGain = candidate.satisfied_naming_rule_ids.length === 0 && namingSupport.includes(candidate.identity) ? 1 : 0;
      if (answer.identity_mapping.qualification_eligible !== true || !answer.identity_mapping.qualification_support?.includes(candidate.identity)) continue;
      const dependencyGain = !hasPositiveDependency
        ? candidate.qualification_dependencies < Number(model.scoring_rules?.naming_minimum_positive_dependencies || 2) ? 0.75 : 0.2
        : 0;
      const constructGain = !hasConstruct
        ? candidate.positive_constructs.length < Number(model.scoring_rules?.naming_minimum_positive_constructs || 2) ? 0.5 : 0.1
        : 0;
      bestGain = Math.max(bestGain, namingGain + dependencyGain + constructGain);
    }
    utility += bestGain / (index + 1);
  }
  return round(utility / Math.max(1, candidates.length));
}

function questionQualificationCompletionUtility(state, model, question, candidates) {
  const contradictionMultiplier = Number(model.scoring_rules?.contradiction_multiplier || 0.75);
  const minimumDependencies = Number(model.scoring_rules?.naming_minimum_positive_dependencies || 2);
  const minimumConstructs = Number(model.scoring_rules?.naming_minimum_positive_constructs || 2);
  let utility = 0;
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    if (!candidate.can_name_from_behavior || conflictForCandidate(candidate)) continue;
    const effects = strongestDependencyEffects(candidate.identity, state.evidence_ledger || [], contradictionMultiplier);
    const hasPositiveDependency = (effects.get(question.dependency_group)?.qualificationPositive || 0) > 0;
    const hasConstruct = candidate.positive_constructs.includes(question.construct_id);
    const canComplete = (question.answers || []).some((answer) => {
      const mapping = answer.identity_mapping || {};
      if (neutralAnswer(answer) || !mapping.qualification_support?.includes(candidate.identity)) return false;
      const dependencies = candidate.qualification_dependencies + (hasPositiveDependency ? 0 : 1);
      const constructs = candidate.positive_constructs.length + (hasConstruct ? 0 : 1);
      const hasNamingRule = candidate.satisfied_naming_rule_ids.length > 0 || mapping.naming_support?.includes(candidate.identity);
      return hasNamingRule && dependencies >= minimumDependencies && constructs >= minimumConstructs;
    });
    if (canComplete) utility += 1 / (index + 1);
  }
  return round(utility / Math.max(1, candidates.length));
}

export function questionDiscriminationTrace(state, model, question, ranked = rankCandidates(state, model)) {
  const identities = identityById(model);
  const candidates = routingCandidates(state, model, ranked);
  if (candidates.length < 2) {
    return {
      question_id: question.id,
      candidate_frontier: candidates.map((candidate) => candidate.identity),
      utility: 0,
      discriminating_pairs: 0,
      metadata_only_pairs: [],
      pair_traces: [],
    };
  }
  let discriminationUtility = 0;
  let discriminatingPairs = 0;
  const metadataOnlyPairs = [];
  const pairTraces = [];
  for (let left = 0; left < candidates.length; left += 1) {
    for (let right = left + 1; right < candidates.length; right += 1) {
      const a = identities.get(candidates[left].identity);
      const b = identities.get(candidates[right].identity);
      let bestDifference = 0;
      const answerDifferences = [];
      for (const answer of question.answers || []) {
        if (neutralAnswer(answer)) continue;
        const leftEffect = answerRoutingEffect(answer, question, a);
        const rightEffect = answerRoutingEffect(answer, question, b);
        const difference = Math.abs(leftEffect - rightEffect);
        bestDifference = Math.max(
          bestDifference,
          difference
        );
        answerDifferences.push({
          answer_id: answer.id,
          left_effect: round(leftEffect),
          right_effect: round(rightEffect),
          difference: round(difference),
        });
      }
      const rankWeight = 1 / (1 + left + right);
      const id = pairId(a.id, b.id);
      const metadataCovered = (question.pair_coverage || []).includes(id);
      if (bestDifference > EPSILON) {
        discriminationUtility += bestDifference * rankWeight;
        discriminatingPairs += 1;
      } else if (metadataCovered) {
        metadataOnlyPairs.push(id);
      }
      pairTraces.push({
        pair_id: id,
        candidates: [a.id, b.id],
        rank_weight: round(rankWeight),
        metadata_covered: metadataCovered,
        best_effect_difference: round(bestDifference),
        contributes_utility: bestDifference > EPSILON,
        answer_differences: answerDifferences,
      });
    }
  }
  const normalizedDiscrimination = round(discriminationUtility / candidates.length);
  const qualificationUtility = questionQualificationUtility(state, model, question, candidates);
  const qualificationCompletionUtility = questionQualificationCompletionUtility(state, model, question, candidates);
  return {
    question_id: question.id,
    candidate_frontier: candidates.map((candidate) => candidate.identity),
    utility: round(normalizedDiscrimination + qualificationUtility + qualificationCompletionUtility * 2),
    discrimination_utility: normalizedDiscrimination,
    qualification_utility: qualificationUtility,
    qualification_completion_utility: qualificationCompletionUtility,
    discriminating_pairs: discriminatingPairs,
    metadata_only_pairs: metadataOnlyPairs.sort(),
    pair_traces: pairTraces,
  };
}

export function questionUsefulness(state, model, question, ranked = rankCandidates(state, model)) {
  return questionDiscriminationTrace(state, model, question, ranked).utility;
}

function usedDependencies(state) {
  return new Set((state.evidence_ledger || []).map((entry) => entry.dependency_group).filter(Boolean));
}

function eligibleHallQuestions(state, model) {
  const asked = new Set(state.answered_question_ids || []);
  const used = usedDependencies(state);
  return (model.question_bank?.hall || []).filter(
    (question) => !asked.has(question.id) && !used.has(question.dependency_group)
  );
}

function eligibleTargetedQuestions(state, model, ranked = rankCandidates(state, model)) {
  const asked = new Set(state.answered_question_ids || []);
  const candidates = new Set(routingCandidates(state, model, ranked).map((candidate) => candidate.identity));
  return (model.question_bank?.crucible || []).filter((question) => {
    if (asked.has(question.id)) return false;
    const affected = new Set(
      (question.answers || []).flatMap((answer) => answer.identity_mapping?.affected_identities || [])
    );
    const overlap = [...affected].filter((identity) => candidates.has(identity));
    if (!overlap.length) return false;
    return questionDiscriminationTrace(state, model, question, ranked).utility > EPSILON;
  });
}

function selectBestQuestion(state, model, questions, ranked) {
  return questions
    .map((question) => ({ question, utility: questionUsefulness(state, model, question, ranked) }))
    .filter((entry) => entry.utility > EPSILON)
    .sort((left, right) => right.utility - left.utility || left.question.order - right.question.order || left.question.id.localeCompare(right.question.id))[0] || null;
}

function selectBestTargetedQuestion(state, model, questions, ranked) {
  return selectBestQuestion(state, model, questions, ranked);
}

function questionRoutingStatus(state, model, question, ranked, eligibleIds) {
  const asked = new Set(state.answered_question_ids || []);
  const used = usedDependencies(state);
  const trace = questionDiscriminationTrace(state, model, question, ranked);
  let exclusionReason = null;
  if (asked.has(question.id)) exclusionReason = "already_answered";
  else if (question.stage === "hall" && used.has(question.dependency_group)) exclusionReason = "dependency_already_observed";
  else if (!eligibleIds.has(question.id)) exclusionReason = "candidate_frontier_not_eligible";
  else if (trace.utility <= EPSILON) exclusionReason = "zero_discrimination_utility";
  return {
    question_id: question.id,
    stage: question.stage,
    eligible: exclusionReason === null,
    exclusion_reason: exclusionReason,
    utility: trace.utility,
    discrimination_utility: trace.discrimination_utility,
    qualification_utility: trace.qualification_utility,
    qualification_completion_utility: trace.qualification_completion_utility,
    discriminating_pairs: trace.discriminating_pairs,
    metadata_only_pairs: trace.metadata_only_pairs,
  };
}

export function getRoutingTrace(state, model, ranked = rankCandidates(state, model)) {
  const hallEligible = eligibleHallQuestions(state, model);
  const targetedEligible = eligibleTargetedQuestions(state, model, ranked);
  const hallIds = new Set(hallEligible.map((question) => question.id));
  const targetedIds = new Set(targetedEligible.map((question) => question.id));
  const selected = nextUsefulQuestion(state, model, ranked);
  return {
    answered_question_ids: [...(state.answered_question_ids || [])],
    candidate_frontier: routingCandidates(state, model, ranked).map((candidate) => candidate.identity),
    selected_question_id: selected?.question.id || null,
    selected_utility: selected?.utility || 0,
    questions: [
      ...(model.question_bank?.hall || []).map((question) => questionRoutingStatus(state, model, question, ranked, hallIds)),
      ...(model.question_bank?.crucible || []).map((question) => questionRoutingStatus(state, model, question, ranked, targetedIds)),
    ],
  };
}

function lensEligibility(state, model, ranked, { ignoreMainTargetLimit = false } = {}) {
  const lens = model.question_bank?.lens?.[0];
  if (!lens || (state.lens_ledger || []).length) return null;
  if (!ignoreMainTargetLimit && (state.stage_counts?.crucible || 0) >= (model.stages?.crucible?.max_questions || 1)) return null;
  const independent = independentBehavioralConstructs(state);
  if (independent.length < 2) return null;
  const candidates = routingCandidates(state, model, ranked);
  const topSet = new Set(candidates.slice(0, 2).map((candidate) => candidate.identity));
  if (topSet.size !== 2 || !topSet.has("YORE") || !topSet.has("GLINT")) return null;
  const yore = ranked.find((candidate) => candidate.identity === "YORE");
  const glint = ranked.find((candidate) => candidate.identity === "GLINT");
  if (!yore || !glint || yore.contradiction_strength > yore.positive_strength || glint.contradiction_strength > glint.positive_strength) return null;
  return lens;
}

function nextUsefulQuestion(state, model, ranked = rankCandidates(state, model)) {
  const total = state.answered_question_ids?.length || 0;
  const hallCount = state.stage_counts?.hall || 0;
  const targetedCount = state.stage_counts?.crucible || 0;
  const hall = selectBestQuestion(state, model, eligibleHallQuestions(state, model), ranked);
  const targeted = targetedCount < (model.stages?.crucible?.max_questions || 1)
    ? selectBestTargetedQuestion(state, model, eligibleTargetedQuestions(state, model, ranked), ranked)
    : null;

  if (hallCount < (model.stages?.hall?.min_questions || 2)) return hall;
  if (hallCount < (model.stages?.hall?.max_questions || 3) && hall) return hall;
  const lens = lensEligibility(state, model, ranked);
  if (lens) return { question: lens, utility: 0.01 };
  if (targeted) return targeted;
  return null;
}

function conflictForCandidate(candidate) {
  return candidate.positive_dependencies > 0 && candidate.contradiction_dependencies > 0 && candidate.contradiction_strength >= 0.5;
}

export function getNamingQualification(candidate, model) {
  const rules = model.scoring_rules || {};
  const minimumDependencies = Number(rules.naming_minimum_positive_dependencies || 2);
  const minimumConstructs = Number(rules.naming_minimum_positive_constructs || 2);
  const requirements = {
    behaviorally_observable: candidate.can_name_from_behavior === true,
    approved_naming_rule: candidate.satisfied_naming_rule_ids.length > 0,
    independent_positive_dependencies: candidate.qualification_dependencies >= minimumDependencies,
    independent_positive_constructs: candidate.positive_constructs.length >= minimumConstructs,
    no_disqualifying_contradiction: !conflictForCandidate(candidate),
  };
  return {
    identity: candidate.identity,
    qualified: Object.values(requirements).every(Boolean),
    satisfied_naming_rule_ids: [...candidate.satisfied_naming_rule_ids],
    requirements,
    minimum_positive_dependencies: minimumDependencies,
    minimum_positive_constructs: minimumConstructs,
    limitation: "Qualification authorizes responsible naming but does not add score or satisfy the primary separation threshold.",
  };
}

export function evaluateStopping(state, model, ranked = rankCandidates(state, model)) {
  const total = state.answered_question_ids?.length || 0;
  const minimum = model.stages?.min_total_questions || 6;
  const maximum = model.stages?.max_total_questions || 8;
  const top = ranked[0];
  const named = ranked.filter((candidate) => getNamingQualification(candidate, model).qualified);
  const publicTop = named[0] || null;
  const publicSecond = named[1] || null;
  const useful = total < maximum ? nextUsefulQuestion(state, model, ranked) : null;
  const gap = publicTop && publicSecond ? round(publicTop.score - publicSecond.score) : 1;
  const clear = Boolean(
    publicTop && top?.identity === publicTop.identity &&
    publicTop.qualification_dependencies >= (model.scoring_rules?.clear_minimum_directional_dependencies || 2) &&
    publicTop.independent_constructs.length >= (model.scoring_rules?.clear_minimum_independent_constructs || 3) &&
    gap >= (model.scoring_rules?.clear_separation || 0.2) &&
    !conflictForCandidate(publicTop)
  );

  if (total < minimum) {
    return { stop: false, state: "incomplete", reason: "minimum_questions", can_improve: true, next_question_id: useful?.question.id || null };
  }
  if (clear) {
    return { stop: true, state: "primary", reason: "clear_separation", can_improve: Boolean(useful), next_question_id: useful?.question.id || null };
  }
  if (
    publicTop && top && top.identity !== publicTop.identity && useful &&
    !questionCanImproveBoundary(useful.question, top.identity, publicTop.identity)
  ) {
    return {
      stop: true,
      state: "close",
      reason: "next_question_cannot_improve_responsible_top_boundary",
      can_improve: false,
      next_question_id: null,
    };
  }
  if (total < maximum && useful) {
    return { stop: false, state: "incomplete", reason: "useful_evidence_remains", can_improve: true, next_question_id: useful.question.id };
  }

  const conflicting = ranked.slice(0, Number(model.scoring_rules?.candidate_limit || 8)).filter(conflictForCandidate);
  if (conflicting.length) {
    return { stop: true, state: "contradictory", reason: "supported_candidate_has_conflicting_dependencies", can_improve: false, next_question_id: null };
  }
  if (!named.length || !top) {
    return { stop: true, state: "insufficient", reason: "no_responsible_named_placement", can_improve: false, next_question_id: null };
  }
  const supportedNearTop = named.filter(
    (candidate) => candidate.score >= publicTop.score - (model.scoring_rules?.meaningful_alternative_window || 0.2)
  );
  if (supportedNearTop.length >= 2 && Math.abs(supportedNearTop[0].score - supportedNearTop[1].score) <= EPSILON) {
    return { stop: true, state: "tied", reason: "equal_supported_leaders", can_improve: false, next_question_id: null };
  }
  if (supportedNearTop.length >= 2 && supportedNearTop.slice(0, 2).every((candidate) => candidate.positive_dependencies > 0)) {
    return { stop: true, state: "mixed", reason: "independent_supported_directions", can_improve: false, next_question_id: null };
  }
  if (top.identity !== publicTop.identity) {
    return { stop: true, state: "close", reason: "highest_responsible_candidate_trails_unqualified_internal_candidate", can_improve: false, next_question_id: null };
  }
  return { stop: true, state: "close", reason: "single_named_direction_with_unresolved_alternatives", can_improve: false, next_question_id: null };
}

export function selectNextQuestion(state, model) {
  const total = state.answered_question_ids?.length || 0;
  if (total >= (model.stages?.max_total_questions || 8)) return null;
  const gate = model.question_bank?.gate || [];
  if ((state.stage_counts?.gate || 0) < gate.length) return gate[state.stage_counts.gate] || null;
  const ranked = rankCandidates(state, model);
  if (total >= (model.stages?.min_total_questions || 6) && evaluateStopping(state, model, ranked).stop) return null;
  return nextUsefulQuestion(state, model, ranked)?.question || null;
}

export const selectNextAdaptiveQuestion = selectNextQuestion;

export function shouldFinishAdaptiveReading(state, model, ranked = rankCandidates(state, model)) {
  return evaluateStopping(state, model, ranked).stop;
}

function sharedAndDistinguishingConstructs(model, leftId, rightId) {
  const identities = identityById(model);
  const left = identities.get(leftId);
  const right = identities.get(rightId);
  const leftSet = new Set(left?.supporting_constructs || []);
  const rightSet = new Set(right?.supporting_constructs || []);
  return {
    shared: [...leftSet].filter((construct) => rightSet.has(construct)).sort(),
    distinguishing: unique([
      ...[...leftSet].filter((construct) => !rightSet.has(construct)),
      ...[...rightSet].filter((construct) => !leftSet.has(construct)),
    ]).sort(),
  };
}

function unresolvedBoundary(model, leftId, rightId) {
  return (model.confusion_pairs || []).find((pair) => pair.id === pairId(leftId, rightId)) || null;
}

function bestSeparatingQuestion(state, model, leftId, rightId) {
  const asked = new Set(state.answered_question_ids || []);
  const boundary = unresolvedBoundary(model, leftId, rightId);
  const candidateIds = boundary?.question_ids || [];
  const lookup = questionById(model);
  return candidateIds
    .map((id) => lookup.get(id))
    .filter((question) => question && !asked.has(question.id))
    .map((question) => ({ question, utility: questionUsefulness(state, model, question) }))
    .sort((a, b) => b.utility - a.utility || a.question.id.localeCompare(b.question.id))[0]?.question || null;
}

export function getAlternatives(state, model, ranked = rankCandidates(state, model)) {
  const primary = ranked.find((candidate) => getNamingQualification(candidate, model).qualified);
  if (!primary) return [];
  const window = model.scoring_rules?.meaningful_alternative_window || 0.2;
  return ranked
    .filter((candidate) =>
      candidate.identity !== primary.identity &&
      candidate.score >= primary.score - window &&
      getNamingQualification(candidate, model).qualified
    )
    .slice(0, 2)
    .map((candidate) => {
      const constructs = sharedAndDistinguishingConstructs(model, primary.identity, candidate.identity);
      const boundary = unresolvedBoundary(model, primary.identity, candidate.identity);
      const question = bestSeparatingQuestion(state, model, primary.identity, candidate.identity);
      return {
        identity: candidate.identity,
        identity_name: candidate.identity_name,
        support_difference_from_primary: round(primary.score - candidate.score),
        shared_constructs: constructs.shared,
        distinguishing_constructs: constructs.distinguishing,
        strongest_unresolved_boundary: boundary?.observable_distinction || "No approved direct boundary is recorded.",
        best_approved_question_id: question?.id || null,
        meaningful_support: true,
        naming_qualification: getNamingQualification(candidate, model),
      };
    });
}

function revisitCandidate(state, model, candidateIds) {
  const answerLookup = answerById(model);
  const uncertain = (state.evidence_ledger || []).filter((entry) => entry.neutral);
  for (const entry of uncertain) {
    const canonical = answerLookup.get(entry.answer_id);
    if (!canonical) continue;
    const usefulAlternative = (canonical.question.answers || []).some((answer) => {
      const affected = answer.identity_mapping?.affected_identities || [];
      return affected.some((identity) => candidateIds.includes(identity));
    });
    if (usefulAlternative) {
      return {
        question_id: entry.question_id,
        answer_id: entry.answer_id,
        reason: "A conditional or unknown response withheld directional evidence for the unresolved candidates.",
      };
    }
  }
  return null;
}

function publicRefinementCandidates(ranked, model, resultState) {
  const qualified = ranked.filter((candidate) => getNamingQualification(candidate, model).qualified);
  const primary = qualified[0];
  if (!primary) return [];
  const window = Number(model.scoring_rules?.meaningful_alternative_window || 0.2);
  const nearby = qualified.filter((candidate) => candidate.score >= primary.score - window);
  if (resultState === "tied") {
    return nearby.filter((candidate) => Math.abs(candidate.score - primary.score) <= EPSILON).slice(0, 3);
  }
  if (resultState === "close") return nearby.slice(0, 2);
  if (resultState === "mixed") return nearby.slice(0, 3);
  return [];
}

function refinementPairUtility(question, leftId, rightId) {
  let bestDifference = 0;
  for (const answer of question.answers || []) {
    if (neutralAnswer(answer)) continue;
    bestDifference = Math.max(
      bestDifference,
      Math.abs(directMappingEffect(answer, leftId) - directMappingEffect(answer, rightId))
    );
  }
  return bestDifference;
}

const REFINEMENT_STATE_ORDER = Object.freeze({ mixed: 0, tied: 1, close: 2, primary: 3 });

function refinementBranchOutcome(state, model, question, answer, answerIndex, originIds, originState) {
  const nextState = observe({ state, model, question, answer, answerIndex });
  const nextRanked = rankCandidates(nextState, model);
  const nextStopping = evaluateStopping(nextState, model, nextRanked);
  const nextResultState = nextStopping.stop ? nextStopping.state : "incomplete";
  const nextIds = publicRefinementCandidates(nextRanked, model, nextResultState).map((candidate) => candidate.identity);
  const originSet = new Set(originIds);
  const introduced = nextIds.filter((identity) => !originSet.has(identity));
  const stateOrder = REFINEMENT_STATE_ORDER[nextResultState];
  const originOrder = REFINEMENT_STATE_ORDER[originState];
  const worsened = stateOrder === undefined || stateOrder < originOrder;
  const broadened = introduced.length > 0 || nextIds.length > originIds.length;
  const improved = !neutralAnswer(answer) && !worsened && !broadened && (
    nextIds.length < originIds.length || stateOrder > originOrder
  );
  return {
    answer_id: answer.id,
    neutral: neutralAnswer(answer),
    result_state: nextResultState,
    public_candidate_ids: nextIds,
    introduced_candidate_ids: introduced,
    broadened,
    worsened,
    improved,
  };
}

function bestApprovedRefinementQuestion(state, model, candidateIds, ranked, resultState) {
  const asked = new Set(state.answered_question_ids || []);
  const boundaries = unresolvedBoundaries(model, candidateIds);
  const boundaryByPair = new Map(boundaries.map((boundary) => [boundary.pair_id, boundary]));
  const targeted = (model.question_bank?.crucible || []).filter((question) => !asked.has(question.id));
  const enforceMonotonicFrontier = ["mixed", "tied", "close"].includes(resultState);
  const scored = targeted.map((question) => {
    const separating = [];
    for (let left = 0; left < candidateIds.length; left += 1) {
      for (let right = left + 1; right < candidateIds.length; right += 1) {
        const identities = [candidateIds[left], candidateIds[right]];
        const utility = refinementPairUtility(question, identities[0], identities[1]);
        if (utility <= EPSILON) continue;
        const id = pairId(identities[0], identities[1]);
        separating.push({
          boundary: boundaryByPair.get(id) || {
            pair_id: id,
            identities,
            distinction: "",
          },
          utility,
        });
      }
    }
    const outcomes = enforceMonotonicFrontier
      ? (question.answers || []).map((answer, answerIndex) => refinementBranchOutcome(
          state,
          model,
          question,
          answer,
          answerIndex,
          candidateIds,
          resultState
        ))
      : [];
    return {
      question,
      separating,
      utility: enforceMonotonicFrontier
        ? Math.max(0, ...separating.map((entry) => entry.utility))
        : questionUsefulness(state, model, question, ranked),
      outcomes,
      narrowing_branches: outcomes.filter((outcome) => outcome.improved).length,
      monotonic_safe: !enforceMonotonicFrontier || (
        outcomes.length > 0 &&
        outcomes.every((outcome) => !outcome.broadened && !outcome.worsened) &&
        outcomes.some((outcome) => outcome.improved)
      ),
    };
  }).filter((entry) => (
    (!enforceMonotonicFrontier || entry.separating.length > 0) &&
    entry.utility > EPSILON &&
    entry.monotonic_safe
  ));
  return scored.sort((left, right) => (
    right.narrowing_branches - left.narrowing_branches ||
    right.utility - left.utility ||
    left.question.order - right.question.order ||
    left.question.id.localeCompare(right.question.id)
  ))[0] || null;
}

export function getRefinementPath(state, model, ranked = rankCandidates(state, model)) {
  const stopping = evaluateStopping(state, model, ranked);
  const resultState = stopping.stop ? stopping.state : "incomplete";
  const publicCandidates = publicRefinementCandidates(ranked, model, resultState);
  const candidates = ["mixed", "tied", "close"].includes(resultState)
    ? publicCandidates
    : routingCandidates(state, model, ranked);
  const candidateIds = candidates.map((candidate) => candidate.identity);
  const boundaries = unresolvedBoundaries(model, candidateIds);
  const nextMeasurement = resultState === "primary" || candidateIds.length < 2
    ? null
    : bestApprovedRefinementQuestion(state, model, candidateIds, ranked, resultState);
  if (nextMeasurement) {
    const separatingBoundaries = nextMeasurement.separating.map((entry) => entry.boundary);
    const primaryBoundary = separatingBoundaries[0] || null;
    const construct = (model.constructs || []).find((entry) => entry.id === nextMeasurement.question.construct_id);
    return {
      kind: "ask_targeted_question",
      can_reduce_ambiguity: true,
      remaining_candidates: candidateIds,
      unresolved_boundaries: boundaries,
      missing_constructs: missingConstructs(model, state, candidateIds),
      question_id: nextMeasurement.question.id,
      question_stage: nextMeasurement.question.stage,
      purpose: resultState === "mixed" ? "refine_supported_directions" : "separate_supported_pair",
      target_identities: primaryBoundary?.identities || candidateIds.slice(0, 3),
      target_pair_ids: separatingBoundaries.map((boundary) => boundary.pair_id),
      distinction: primaryBoundary?.distinction || (construct
        ? `One question about ${construct.name.toLowerCase()} can separate the remaining supported directions.`
        : "One approved behavioral question can separate the remaining supported directions."),
      revisit: null,
      limitation: "This optional refinement asks one unused approved discriminator, then immediately returns to the result. It does not extend the eight-question main journey.",
    };
  }
  const lens = lensEligibility(state, model, ranked, { ignoreMainTargetLimit: true });
  if (lens) {
    return {
      kind: "ask_targeted_question",
      can_reduce_ambiguity: true,
      remaining_candidates: candidateIds,
      unresolved_boundaries: unresolvedBoundaries(model, candidateIds),
      missing_constructs: missingConstructs(model, state, candidateIds),
      question_id: lens.id,
      question_stage: "lens",
      purpose: "refine_supported_directions",
      target_identities: candidateIds.slice(0, 2),
      target_pair_ids: unresolvedBoundaries(model, candidateIds).map((boundary) => boundary.pair_id),
      distinction: "The optional identity lens can clarify the supported Yore and Glint directions without overriding behavior.",
      revisit: null,
      limitation: "This optional identity-lens refinement remains separate from behavioral naming and cannot flip or name Yore.",
    };
  }
  const revisit = revisitCandidate(state, model, candidateIds);
  if (revisit) {
    return {
      kind: "revisit_prior_answer",
      can_reduce_ambiguity: true,
      remaining_candidates: candidateIds,
      unresolved_boundaries: unresolvedBoundaries(model, candidateIds),
      missing_constructs: missingConstructs(model, state, candidateIds),
      question_id: null,
      revisit,
      limitation: "Revisit only if the earlier uncertainty no longer reflects the player's preference.",
    };
  }
  return {
    kind: "no_approved_discriminator",
    can_reduce_ambiguity: false,
    remaining_candidates: candidateIds,
    unresolved_boundaries: unresolvedBoundaries(model, candidateIds),
    missing_constructs: missingConstructs(model, state, candidateIds),
    question_id: null,
    purpose: resultState === "primary" ? "none_for_clean_primary" : "no_approved_discriminator",
    target_identities: candidateIds.slice(0, 3),
    target_pair_ids: boundaries.map((boundary) => boundary.pair_id),
    distinction: "",
    revisit: null,
    limitation: resultState === "primary"
      ? "The named reading is complete; optional questioning is not used merely to add another explanation card."
      : "The approved instrument cannot responsibly distinguish the remaining candidates with another available observation.",
  };
}

function unresolvedBoundaries(model, candidateIds) {
  const set = new Set(candidateIds);
  return (model.confusion_pairs || [])
    .filter((pair) => pair.identities.every((identity) => set.has(identity)))
    .map((pair) => ({
      pair_id: pair.id,
      identities: pair.identities,
      distinction: pair.observable_distinction,
      question_ids: pair.question_ids,
      coverage_status: pair.coverage_status,
    }));
}

function missingConstructs(model, state, candidateIds) {
  const observed = new Set(independentBehavioralConstructs(state));
  const identities = identityById(model);
  return unique(
    candidateIds.flatMap((id) => identities.get(id)?.boundary_constructs || [])
  ).filter((construct) => !observed.has(construct)).sort();
}

function normalizedInternalShare(score, ranked) {
  const nonnegative = ranked.map((candidate) => Math.max(0, candidate.score + 0.75));
  const total = nonnegative.reduce((sum, value) => sum + value, 0) || 1;
  const index = ranked.findIndex((candidate) => candidate.score === score);
  return index >= 0 ? nonnegative[index] / total : 0;
}

function buildManaScores(ranked, factions) {
  const raw = createEmptyManaScores();
  for (const candidate of ranked) {
    const share = normalizedInternalShare(candidate.score, ranked);
    for (const color of factions?.[candidate.identity]?.colors || []) raw[color] += share;
  }
  const max = Math.max(...Object.values(raw), 0.01);
  return Object.fromEntries(MANA_ORDER.map((color) => [color, Math.max(1, Math.min(10, Math.round((raw[color] / max) * 10)))]));
}

function candidateReason(candidate) {
  const constructs = candidate.independent_constructs.length
    ? candidate.independent_constructs.join(", ")
    : "limited structural evidence";
  return `${candidate.identity_name} remained plausible through ${constructs}; identity mapping remains a hypothesis.`;
}

export function finalizeReading({ state, model, factions = {}, starterProfile = DEFAULT_STARTER_PROFILE, version = RESULT_VERSION }) {
  const ranked = rankCandidates(state, model);
  if (!ranked.length) throw new Error("Gate B1 reading requires 37 identity candidates.");
  const stopping = evaluateStopping(state, model, ranked);
  const internalPrimary = ranked[0];
  const qualifiedPrimary = ranked.find((candidate) => getNamingQualification(candidate, model).qualified) || null;
  const alternatives = getAlternatives(state, model, ranked);
  const refinement = getRefinementPath(state, model, ranked);
  const resultState = stopping.stop ? stopping.state : "incomplete";
  const exposesResponsibleName = ["primary", "close", "tied", "mixed"].includes(resultState) && qualifiedPrimary;
  const primary = exposesResponsibleName ? qualifiedPrimary : internalPrimary;
  const candidateLookup = new Map(ranked.map((candidate) => [candidate.identity, candidate]));
  const publicOrder = [primary.identity, ...alternatives.map((alternative) => alternative.identity)];
  const topMatches = publicOrder
    .map((identity) => candidateLookup.get(identity))
    .filter(Boolean)
    .slice(0, 3)
    .map((candidate, index) => {
      const faction = factions?.[candidate.identity] || {};
      return {
        rank: index + 1,
        faction: candidate.identity,
        faction_name: faction.name || candidate.identity_name,
        institution_type: faction.institution_type || null,
        world: faction.world || null,
        identity: faction.identity || null,
        score: candidate.score,
        confidence: round(normalizedInternalShare(candidate.score, ranked), 3),
        reason: candidateReason(candidate),
      };
    });
  const top = topMatches[0];
  const runner = topMatches[1] || null;
  const limitations = [
    "Identity mappings are in-model hypotheses, not empirical player accuracy.",
    "Internal scores are ranking aids and are not public confidence percentages.",
  ];
  if (resultState === "insufficient") limitations.push(refinement.limitation);

  return {
    version,
    model_version: model._meta?.model_version || GATE_B1_MODEL_VERSION,
    instrument_version: model._meta?.instrument_version || null,
    mapping_version: model._meta?.mapping_version || null,
    source_mode: "quick",
    faction: top.faction,
    faction_name: top.faction_name,
    institution_type: top.institution_type,
    world: top.world,
    identity: top.identity,
    decree: resultState === "primary"
      ? `${top.faction_name} is the clearest current fit from the approved observations.`
      : resultState === "close"
        ? `${top.faction_name} is the current best fit, with unresolved nearby alternatives.`
        : "The approved observations do not support a more certain public claim.",
    confidence: top.confidence,
    confidence_gap: runner ? round(top.confidence - runner.confidence, 3) : 1,
    mana_scores: buildManaScores(ranked, factions),
    top_matches: topMatches,
    adjacent_matches: topMatches.slice(1, 3),
    internal_candidate_order: ranked.map((candidate) => ({
      identity: candidate.identity,
      score: candidate.score,
      positive_dependencies: candidate.positive_dependencies,
      qualification_dependencies: candidate.qualification_dependencies,
      naming_dependencies: candidate.naming_dependencies,
      positive_constructs: candidate.positive_constructs,
      satisfied_naming_rule_ids: candidate.satisfied_naming_rule_ids,
      naming_qualification: getNamingQualification(candidate, model),
      contradiction_dependencies: candidate.contradiction_dependencies,
      independent_constructs: candidate.independent_constructs,
    })),
    candidate_set: plausibleCandidates(state, model, ranked).map((candidate) => candidate.identity),
    alternatives,
    refinement,
    stopping,
    starter_profile: normalizeStarterProfile(starterProfile),
    evidence_trail: state.evidence_ledger || [],
    evidence_ledger: state.evidence_ledger || [],
    lens_ledger: state.lens_ledger || [],
    stage_history: state.route_history || [],
    result_state: resultState,
    public_confidence_state: resultState === "primary" ? "current-best-fit" : resultState,
    alternative_state: resultState === "tied" ? "co-leader" : alternatives.length ? "supported" : "none",
    confidence_display_mode: "bounded-state",
    model_kind: "gate-b1-evidence-ranking-v1",
    legacy_result: false,
    limitations,
    compatibility_version: "gate-a-v1",
  };
}

export function buildAdaptivePlacementResult(options) {
  return finalizeReading(options);
}

export function replaySelections(model, selections = []) {
  const lookup = questionById(model);
  let state = createInitialState(model);
  for (const selection of selections) {
    const question = lookup.get(selection.question_id || selection.question?.id);
    const answerId = selection.answer_id || selection.answer?.id;
    const answerIndex = (question?.answers || []).findIndex((answer) => answer.id === answerId);
    if (!question || answerIndex < 0) throw new Error(`Cannot replay ${selection.question_id || selection.question?.id}/${answerId}`);
    state = observe({ state, model, question, answer: question.answers[answerIndex], answerIndex });
  }
  return state;
}

export function replayAdaptiveSelections(model, selections = []) {
  return replaySelections(
    model,
    selections.map((selection) => ({
      question_id: selection.question_id || selection.question?.id,
      answer_id: selection.answer_id || selection.answer?.id,
    }))
  );
}

export function getStageLabel(stage) {
  return STAGE_LABELS[stage] || "Reading";
}

export function runJourney({ model, factions = {}, strategy, maxSteps = 8 }) {
  let state = createInitialState(model);
  const selections = [];
  for (let step = 0; step < maxSteps; step += 1) {
    const question = selectNextQuestion(state, model);
    if (!question) break;
    const ranked = rankCandidates(state, model);
    const answerIndex = strategy(question, state, ranked);
    const answer = question.answers[answerIndex] || question.answers[0];
    selections.push({ question_id: question.id, answer_id: answer.id, answer_index: answerIndex });
    state = observe({ state, model, question, answer, answerIndex });
    if (evaluateStopping(state, model).stop) break;
  }
  return { state, selections, result: finalizeReading({ state, model, factions }) };
}

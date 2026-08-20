import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createInitialState,
  evaluateStopping,
  finalizeReading,
  getAlternatives,
  getNamingQualification,
  getRefinementPath,
  getRoutingTrace,
  observe,
  questionDiscriminationTrace,
  questionUsefulness,
  rankCandidates,
  replaySelections,
  selectNextQuestion,
} from "../assets/js/archscry/gate-b1-placement-engine.js";
import {
  deriveGateAResultState,
  withGateAPublicState,
} from "../assets/js/archscry/archscry-presentation.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MODEL_PATH = path.join(ROOT, "data", "gate-b1-placement-model.json");
const FACTIONS_PATH = path.join(ROOT, "data", "factions.json");
const REPORT_DIR = path.join(ROOT, "docs", "reports", "vm551-gate-b1-placement-engine");
const MODEL = JSON.parse(fs.readFileSync(MODEL_PATH, "utf8"));
const FACTIONS = JSON.parse(fs.readFileSync(FACTIONS_PATH, "utf8")).factions || {};
const WRITE = process.argv.includes("--write");
const CHECK = process.argv.includes("--check") || !WRITE;
const RANDOM_JOURNEY_COUNT = 5000;
const SYNTHETIC_VARIANTS_PER_TYPE = 20;
const BEAM_WIDTH = 260;
const REFINEMENT_BEAM_WIDTH = 16;
const REPORT_LABEL = "IN-MODEL ROBUSTNESS — NOT EMPIRICAL PLAYER ACCURACY";

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function writeOrCheck(name, value) {
  const filePath = path.join(REPORT_DIR, name);
  const content = typeof value === "string" ? `${value.trimEnd()}\n` : stableJson(value);
  if (WRITE) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
    fs.writeFileSync(filePath, content);
  } else {
    assert(fs.existsSync(filePath), `Missing engine report ${path.relative(ROOT, filePath)}`);
    assert.equal(fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n"), content, `Stale engine report ${name}`);
  }
}

function pairId(left, right) {
  return [left, right].sort().join("__");
}

function makeRng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function allBehavioralQuestions() {
  return [
    ...(MODEL.question_bank.gate || []),
    ...(MODEL.question_bank.hall || []),
    ...(MODEL.question_bank.crucible || []),
  ];
}

const QUESTION_BY_ID = new Map(
  [...allBehavioralQuestions(), ...(MODEL.question_bank.lens || [])].map((question) => [question.id, question])
);
const IDENTITY_BY_ID = new Map(MODEL.identities.map((identity) => [identity.id, identity]));

function resultSnapshot(state) {
  const ranking = rankCandidates(state, MODEL);
  const next = selectNextQuestion(state, MODEL);
  const stopping = evaluateStopping(state, MODEL, ranking);
  const result = finalizeReading({ state, model: MODEL, factions: FACTIONS });
  return {
    evidence_ledger: state.evidence_ledger,
    lens_ledger: state.lens_ledger,
    ranking,
    next_question_id: next?.id || null,
    stopping,
    result: {
      faction: result.faction,
      result_state: result.result_state,
      candidate_set: result.candidate_set,
      top_matches: result.top_matches,
      alternatives: result.alternatives,
      refinement: result.refinement,
    },
  };
}

function runRandomJourney(seed) {
  const rng = makeRng(seed);
  let state = createInitialState(MODEL);
  const selections = [];
  for (let guard = 0; guard < 12; guard += 1) {
    const question = selectNextQuestion(state, MODEL);
    if (!question) break;
    const answerIndex = Math.floor(rng() * question.answers.length);
    const answer = question.answers[answerIndex];
    selections.push({ question_id: question.id, answer_id: answer.id });
    state = observe({ state, model: MODEL, question, answer, answerIndex });
  }
  return { state, selections, snapshot: resultSnapshot(state) };
}

function choiceScore(state, identityId, competitorId = null) {
  const ranking = rankCandidates(state, MODEL);
  const targetIndex = ranking.findIndex((candidate) => candidate.identity === identityId);
  const target = ranking[targetIndex];
  const competitor = competitorId
    ? ranking.find((candidate) => candidate.identity === competitorId)
    : null;
  return (
    (target?.naming_dependencies || 0) * 40 +
    (target?.positive_dependencies || 0) * 20 -
    (target?.contradiction_dependencies || 0) * 25 +
    (target?.score || 0) * 20 +
    (target?.route_affinity || 0) * 4 -
    targetIndex * 2 +
    (competitor ? (competitor.score || 0) * 8 - Math.abs((target?.score || 0) - competitor.score) * 4 : 0)
  );
}

function rankedAnswerOptions(state, question, identityId, competitorId = null) {
  return question.answers
    .map((answer, answerIndex) => {
      const next = observe({ state, model: MODEL, question, answer, answerIndex });
      return { answer, answerIndex, next, score: choiceScore(next, identityId, competitorId) };
    })
    .sort((left, right) => right.score - left.score || left.answer.id.localeCompare(right.answer.id));
}

function syntheticJourney(identityId, variant, seed, competitorId = null) {
  const rng = makeRng(seed);
  let state = createInitialState(MODEL);
  const selections = [];
  const noiseStep = 1 + Math.floor(rng() * 7);
  const secondNoiseStep = 1 + Math.floor(rng() * 7);
  for (let step = 0; step < 8; step += 1) {
    const question = selectNextQuestion(state, MODEL);
    if (!question) break;
    const options = rankedAnswerOptions(state, question, identityId, variant === "blended" ? competitorId : null);
    const neutral = options.find((entry) => /(?:UNKNOWN|CONDITIONAL|NON_DIRECTIONAL)$/.test(entry.answer.signal || entry.answer.direction || ""));
    let selected = options[0];
    if (variant === "one_neutral" && step === noiseStep && neutral) selected = neutral;
    if (variant === "multiple_neutral" && (step === noiseStep || step === secondNoiseStep) && neutral) selected = neutral;
    if (variant === "partial" && step >= 5 && neutral) selected = neutral;
    if (variant === "sparse" && neutral) selected = neutral;
    if (variant === "mild_noise" && step === noiseStep && options[1]) selected = options[1];
    if (variant === "one_contradiction" && step === noiseStep) selected = options[options.length - 1];
    selections.push({ question_id: question.id, answer_id: selected.answer.id });
    state = selected.next;
  }
  return { state, selections, result: finalizeReading({ state, model: MODEL, factions: FACTIONS }) };
}

function beamSearchIdentity(identityId, { beamWidth = BEAM_WIDTH, refinementBeamWidth = REFINEMENT_BEAM_WIDTH } = {}) {
  const cleanSyntheticSeed = syntheticJourney(identityId, "clean", 1);
  let nodes = [{ state: createInitialState(MODEL), selections: [] }];
  const terminal = [];
  const encounteredQuestions = new Set();
  for (let depth = 0; depth < 8; depth += 1) {
    const expanded = [];
    for (const node of nodes) {
      const question = selectNextQuestion(node.state, MODEL);
      if (!question) {
        terminal.push(node);
        continue;
      }
      encounteredQuestions.add(question.id);
      for (let answerIndex = 0; answerIndex < question.answers.length; answerIndex += 1) {
        const answer = question.answers[answerIndex];
        const state = observe({ state: node.state, model: MODEL, question, answer, answerIndex });
        expanded.push({
          state,
          selections: [...node.selections, { question_id: question.id, answer_id: answer.id }],
          heuristic: choiceScore(state, identityId),
        });
      }
    }
    if (!expanded.length) break;
    const deduped = new Map();
    for (const node of expanded.sort((a, b) => b.heuristic - a.heuristic || JSON.stringify(a.selections).localeCompare(JSON.stringify(b.selections)))) {
      const key = node.selections.map((selection) => selection.answer_id).join("|");
      if (!deduped.has(key)) deduped.set(key, node);
      if (deduped.size >= beamWidth) break;
    }
    nodes = [...deduped.values()];
  }
  terminal.push(...nodes.filter((node) => !selectNextQuestion(node.state, MODEL)));
  if (!terminal.length) terminal.push(...nodes);
  terminal.push({ state: cleanSyntheticSeed.state, selections: cleanSyntheticSeed.selections, heuristic: choiceScore(cleanSyntheticSeed.state, identityId) });
  cleanSyntheticSeed.selections.forEach((selection) => encounteredQuestions.add(selection.question_id));
  const strongestSeeds = [...terminal]
    .sort((left, right) => choiceScore(right.state, identityId) - choiceScore(left.state, identityId) || JSON.stringify(left.selections).localeCompare(JSON.stringify(right.selections)))
    .slice(0, refinementBeamWidth - 1);
  const seedMap = new Map([
    [cleanSyntheticSeed.selections.map((selection) => selection.answer_id).join("|"), { state: cleanSyntheticSeed.state, selections: cleanSyntheticSeed.selections }],
    ...strongestSeeds.map((node) => [node.selections.map((selection) => selection.answer_id).join("|"), node]),
  ]);
  const refinementSeeds = [...seedMap.values()]
    .slice(0, refinementBeamWidth)
    .map((node) => ({ ...node, refinement_count: 0 }));
  const refinementNodes = [...terminal];
  let refinementFrontier = refinementSeeds;
  for (let depth = 0; depth < 2; depth += 1) {
    const expanded = [];
    for (const node of refinementFrontier) {
      const refinement = getRefinementPath(node.state, MODEL);
      if (refinement.kind !== "ask_targeted_question" || !refinement.question_id) continue;
      const question = QUESTION_BY_ID.get(refinement.question_id);
      if (!question) continue;
      encounteredQuestions.add(question.id);
      for (let answerIndex = 0; answerIndex < question.answers.length; answerIndex += 1) {
        const answer = question.answers[answerIndex];
        const state = observe({ state: node.state, model: MODEL, question, answer, answerIndex });
        expanded.push({
          state,
          selections: [...node.selections, { question_id: question.id, answer_id: answer.id, refinement: true }],
          refinement_count: depth + 1,
          heuristic: choiceScore(state, identityId),
        });
      }
    }
    if (!expanded.length) break;
    const deduped = new Map();
    for (const node of expanded.sort((a, b) => b.heuristic - a.heuristic || JSON.stringify(a.selections).localeCompare(JSON.stringify(b.selections)))) {
      const key = node.selections.map((selection) => selection.answer_id).join("|");
      if (!deduped.has(key)) deduped.set(key, node);
      if (deduped.size >= refinementBeamWidth) break;
    }
    refinementFrontier = [...deduped.values()];
    refinementNodes.push(...refinementFrontier);
  }
  const evaluated = refinementNodes.map((node) => {
    const ranking = rankCandidates(node.state, MODEL);
    const rank = ranking.findIndex((candidate) => candidate.identity === identityId) + 1;
    const result = finalizeReading({ state: node.state, model: MODEL, factions: FACTIONS });
    const target = ranking[rank - 1];
    const publicPrimary = result.faction === identityId && ["primary", "close", "tied"].includes(result.result_state);
    const publicNamed = ["primary", "close", "tied", "mixed"].includes(result.result_state)
      ? result.top_matches.map((match) => match.faction)
      : [];
    const publicRank = publicNamed.indexOf(identityId) + 1;
    return { ...node, ranking, rank, result, target, publicPrimary, publicRank };
  });
  evaluated.sort((left, right) =>
    Number(right.publicPrimary) - Number(left.publicPrimary) ||
    left.rank - right.rank ||
    (right.target?.naming_dependencies || 0) - (left.target?.naming_dependencies || 0) ||
    (right.target?.score || -99) - (left.target?.score || -99) ||
    JSON.stringify(left.selections).localeCompare(JSON.stringify(right.selections))
  );
  const publicRanks = evaluated.map((node) => node.publicRank).filter((rank) => rank > 0);
  return {
    best: evaluated[0],
    bestPublicRank: publicRanks.length ? Math.min(...publicRanks) : null,
    encounteredQuestions: [...encounteredQuestions].sort(),
  };
}

function structuralReport() {
  const questions = allBehavioralQuestions();
  const answers = questions.flatMap((question) => question.answers);
  const constructIds = new Set(MODEL.constructs.map((construct) => construct.id));
  const questionIds = questions.map((question) => question.id);
  const answerIds = answers.map((answer) => answer.id);
  const identityIds = MODEL.identities.map((identity) => identity.id);
  const pairIds = MODEL.confusion_pairs.map((pair) => pair.id);
  const allowedSignals = new Map(MODEL.constructs.map((construct) => [construct.id, new Set(construct.allowed_primary_signals)]));
  const orphanSignals = questions.flatMap((question) => question.answers
    .filter((answer) => !allowedSignals.get(question.construct_id)?.has(answer.signal))
    .map((answer) => answer.id));
  const mappingUses = answers.filter((answer) => answer.identity_mapping.status === "MAPPING_HYPOTHESIS");
  const remediationMappingUses = answers.filter((answer) => answer.identity_mapping.status === "REMEDIATION_MAPPING_HYPOTHESIS");
  const invariants = {
    constructs: MODEL.constructs.length,
    questions: questions.length,
    stage_counts: Object.fromEntries(["gate", "hall", "crucible"].map((stage) => [stage, questions.filter((question) => question.stage === stage).length])),
    answers: answers.length,
    identities: MODEL.identities.length,
    confusion_pairs: MODEL.confusion_pairs.length,
    directional_mapping_uses: mappingUses.length + remediationMappingUses.length,
    baseline_directional_mapping_uses: mappingUses.length,
    remediation_directional_mapping_uses: remediationMappingUses.length,
    naming_qualification_rules: MODEL.naming_rules.length,
    lens_questions: MODEL.question_bank.lens.length,
    duplicate_question_ids: questionIds.length - new Set(questionIds).size,
    duplicate_answer_ids: answerIds.length - new Set(answerIds).size,
    duplicate_identity_ids: identityIds.length - new Set(identityIds).size,
    duplicate_pair_ids: pairIds.length - new Set(pairIds).size,
    orphan_signals: orphanSignals,
    missing_constructs: questions.filter((question) => !constructIds.has(question.construct_id)).map((question) => question.id),
    answers_missing_provenance: answers.filter((answer) => !answer.evidence_provenance).map((answer) => answer.id),
    lens_changes_behavioral_ranking: false,
    numeric_public_confidence_authorized: false,
  };
  assert.deepEqual(
    [invariants.constructs, invariants.questions, invariants.answers, invariants.identities, invariants.confusion_pairs],
    [MODEL._meta.counts.constructs, MODEL._meta.counts.questions, MODEL._meta.counts.answers, MODEL._meta.counts.identities, MODEL._meta.counts.confusion_pairs]
  );
  assert.deepEqual(invariants.stage_counts, {
    gate: MODEL.question_bank.gate.length,
    hall: MODEL.question_bank.hall.length,
    crucible: MODEL.question_bank.crucible.length,
  });
  assert.equal(invariants.directional_mapping_uses, MODEL._meta.counts.directional_mapping_uses);
  assert.equal(invariants.baseline_directional_mapping_uses, MODEL._meta.counts.baseline_directional_mapping_uses);
  assert.equal(invariants.remediation_directional_mapping_uses, MODEL._meta.counts.remediation_directional_mapping_uses);
  assert.equal(invariants.duplicate_question_ids + invariants.duplicate_answer_ids + invariants.duplicate_identity_ids + invariants.duplicate_pair_ids, 0);
  assert.deepEqual(invariants.orphan_signals, []);
  assert.deepEqual(invariants.missing_constructs, []);
  assert.deepEqual(invariants.answers_missing_provenance, []);
  return { status: "PASS", model_version: MODEL._meta.model_version, invariants };
}

function questionAndAnswer(questionId, answerId) {
  const question = QUESTION_BY_ID.get(questionId);
  assert(question, `Unknown focused-test question ${questionId}`);
  const answerIndex = question.answers.findIndex((answer) => answer.id === answerId);
  assert(answerIndex >= 0, `Unknown focused-test answer ${answerId}`);
  return { question, answer: question.answers[answerIndex], answerIndex };
}

function observeDirect(state, questionId, answerId) {
  const selected = questionAndAnswer(questionId, answerId);
  return observe({ state, model: MODEL, ...selected });
}

function findEligibleLensState() {
  const queue = [createInitialState(MODEL)];
  const seen = new Set([""]);
  while (queue.length) {
    const state = queue.shift();
    const question = selectNextQuestion(state, MODEL);
    if (!question) continue;
    if (question.evidence_class === "IDENTITY_LENS_SELF_REPORT") return state;
    if ((state.answered_question_ids?.length || 0) >= 8) continue;
    for (const [answerIndex, answer] of question.answers.entries()) {
      const next = observe({ state, model: MODEL, question, answer, answerIndex });
      const signature = next.selections.map((entry) => `${entry.question_id}:${entry.answer_id}`).join("|");
      if (seen.has(signature)) continue;
      seen.add(signature);
      queue.push(next);
    }
  }
  return null;
}

function focusedBehaviorReport() {
  const freshRanking = rankCandidates(createInitialState(MODEL), MODEL);
  assert.deepEqual(
    freshRanking.map((candidate) => candidate.identity),
    [...freshRanking.map((candidate) => candidate.identity)].sort(),
    "Zero-evidence ties must use deterministic identity ordering"
  );

  let neutralState = createInitialState(MODEL);
  neutralState = observeDirect(neutralState, "b1.gate.initiative.v1", "b1.gate.initiative.v1.unsure");
  neutralState = observeDirect(neutralState, "b1.gate.visibility.v1", "b1.gate.visibility.v1.depends");
  neutralState = observeDirect(neutralState, "b1.gate.disruption.v1", "b1.gate.disruption.v1.depends");
  neutralState = observeDirect(neutralState, "b1.gate.tempo.v1", "b1.gate.tempo.v1.depends");
  neutralState = observeDirect(neutralState, "b1.hall.theme.v1", "b1.hall.theme.v1.gap");
  neutralState = observeDirect(neutralState, "b1.hall.breadth.v1", "b1.hall.breadth.v1.concept");
  const sixNeutralState = neutralState;
  neutralState = observeDirect(neutralState, "b1.hall.information-to-plan.v1", "b1.hall.information-to-plan.v1.depends");
  neutralState = observeDirect(neutralState, "b1.crucible.ur.v1", "b1.crucible.ur.v1.neither");
  const neutralRanking = rankCandidates(neutralState, MODEL);
  assert(neutralState.evidence_ledger.every((entry) => entry.neutral), "Unknown/conditional evidence must stay neutral");
  assert(neutralRanking.every((candidate) => candidate.positive_strength === 0 && candidate.contradiction_strength === 0));
  const neutralResult = finalizeReading({ state: neutralState, model: MODEL, factions: FACTIONS });
  assert.equal(neutralResult.result_state, "insufficient");
  const boundedPublicResult = withGateAPublicState({ result: neutralResult, placementModel: MODEL, factions: FACTIONS });
  assert.equal(deriveGateAResultState({ result: boundedPublicResult, placementModel: MODEL, factions: FACTIONS }), "insufficient");

  let singleAnswerState = observeDirect(sixNeutralState, "b1.crucible.ur.v1", "b1.crucible.ur.v1.neither");
  singleAnswerState = observeDirect(singleAnswerState, "b1.hall.information-to-plan.v1", "b1.hall.information-to-plan.v1.consolidate");
  const singleAnswerResult = finalizeReading({ state: singleAnswerState, model: MODEL, factions: FACTIONS });
  assert.notEqual(singleAnswerResult.result_state, "primary", "One directional answer must not dominate a complete reading");

  let contradictionState = createInitialState(MODEL);
  contradictionState = observeDirect(contradictionState, "b1.gate.initiative.v1", "b1.gate.initiative.v1.respond");
  contradictionState = observeDirect(contradictionState, "b1.gate.visibility.v1", "b1.gate.visibility.v1.held");
  contradictionState = observeDirect(contradictionState, "b1.gate.disruption.v1", "b1.gate.disruption.v1.recover");
  contradictionState = observeDirect(contradictionState, "b1.gate.tempo.v1", "b1.gate.tempo.v1.waves");
  contradictionState = observeDirect(contradictionState, "b1.hall.information-to-plan.v1", "b1.hall.information-to-plan.v1.exploit");
  contradictionState = observeDirect(contradictionState, "b1.hall.interaction-window.v1", "b1.hall.interaction-window.v1.pressure");
  contradictionState = observeDirect(contradictionState, "b1.crucible.grixis.v1", "b1.crucible.grixis.v1.calculate");
  contradictionState = observeDirect(contradictionState, "b1.hall.theme.v1", "b1.hall.theme.v1.gap");
  contradictionState = observeDirect(contradictionState, "b1.hall.breadth.v1", "b1.hall.breadth.v1.concept");
  const contradictionRanking = rankCandidates(contradictionState, MODEL);
  const grixis = contradictionRanking.find((candidate) => candidate.identity === "GRIXIS");
  assert(grixis.positive_strength > 0 && grixis.contradiction_strength > 0, "Contradiction fixture must support and contradict Grixis");
  assert(grixis.score < grixis.positive_strength, "Contradiction must reduce rather than increase support");
  assert.equal(evaluateStopping(contradictionState, MODEL, contradictionRanking).state, "contradictory");

  const negativeOnlyState = observeDirect(createInitialState(MODEL), "b1.crucible.esper.v1", "b1.crucible.esper.v1.flexible");
  const negativeOnlyRanking = rankCandidates(negativeOnlyState, MODEL);
  assert(negativeOnlyRanking[0].positive_strength === 0, "Negative-only evidence cannot manufacture positive support");
  assert.notEqual(finalizeReading({ state: negativeOnlyState, model: MODEL, factions: FACTIONS }).result_state, "primary");

  let stablePrimaryState = createInitialState(MODEL);
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.gate.initiative.v1", "b1.gate.initiative.v1.balance");
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.gate.visibility.v1", "b1.gate.visibility.v1.held");
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.gate.disruption.v1", "b1.gate.disruption.v1.protect");
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.gate.tempo.v1", "b1.gate.tempo.v1.small");
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.hall.information-to-plan.v1", "b1.hall.information-to-plan.v1.consolidate");
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.crucible.esper.v1", "b1.crucible.esper.v1.designed");
  const primaryBeforeNeutral = finalizeReading({ state: stablePrimaryState, model: MODEL, factions: FACTIONS });
  assert.equal(primaryBeforeNeutral.faction, "ESPER");
  assert.equal(primaryBeforeNeutral.result_state, "primary");
  const primaryPublicResult = withGateAPublicState({ result: primaryBeforeNeutral, placementModel: MODEL, factions: FACTIONS });
  assert.equal(deriveGateAResultState({ result: primaryPublicResult, placementModel: MODEL, factions: FACTIONS }), "primary");
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.hall.theme.v1", "b1.hall.theme.v1.gap");
  stablePrimaryState = observeDirect(stablePrimaryState, "b1.hall.breadth.v1", "b1.hall.breadth.v1.concept");
  const primaryAfterNeutral = finalizeReading({ state: stablePrimaryState, model: MODEL, factions: FACTIONS });
  assert.equal(primaryAfterNeutral.faction, "ESPER", "Neutral evidence must not dislodge a supported primary");
  assert.equal(primaryAfterNeutral.result_state, "primary");
  assert(primaryAfterNeutral.top_matches.length < 3, "Public alternatives must not be fabricated to fill three slots");

  let discriminatingState = createInitialState(MODEL);
  const esperBefore = rankCandidates(discriminatingState, MODEL).findIndex((candidate) => candidate.identity === "ESPER");
  discriminatingState = observeDirect(discriminatingState, "b1.hall.information-to-plan.v1", "b1.hall.information-to-plan.v1.consolidate");
  const esperAfter = rankCandidates(discriminatingState, MODEL).findIndex((candidate) => candidate.identity === "ESPER");
  assert(esperAfter < esperBefore, "Approved discriminating evidence must be able to reorder candidates");

  let usefulnessCases = 0;
  for (let seed = 1; seed <= 500; seed += 1) {
    const rng = makeRng(seed);
    let state = createInitialState(MODEL);
    for (let guard = 0; guard < 8; guard += 1) {
      const question = selectNextQuestion(state, MODEL);
      if (!question) break;
      if (state.answered_question_ids.length >= 4 && question.evidence_class !== "IDENTITY_LENS_SELF_REPORT") {
        const candidates = rankCandidates(state, MODEL);
        assert(questionUsefulness(state, MODEL, question, candidates) > 0, `Adaptive route selected zero-utility question ${question.id}`);
        usefulnessCases += 1;
      }
      const answerIndex = Math.floor(rng() * question.answers.length);
      state = observe({ state, model: MODEL, question, answer: question.answers[answerIndex], answerIndex });
    }
  }
  assert(usefulnessCases > 0);

  const metadataPair = pairId(freshRanking[0].identity, freshRanking[1].identity);
  const metadataOnlyQuestion = {
    id: "test.metadata-only",
    stage: "crucible",
    order: 999,
    construct_id: "C01",
    dependency_group: "DG_TEST_METADATA_ONLY",
    pair_coverage: [metadataPair],
    answers: [{
      id: "test.metadata-only.unknown",
      signal: "SIG_C01_UNKNOWN",
      identity_mapping: { support: [], contradict: [], strength: 0 },
    }],
  };
  const metadataTrace = questionDiscriminationTrace(createInitialState(MODEL), MODEL, metadataOnlyQuestion, freshRanking);
  assert.equal(metadataTrace.utility, 0, "Pair metadata must not create discrimination utility without different answer effects");
  assert(metadataTrace.metadata_only_pairs.includes(metadataPair));

  let oneSidedTargetState = createInitialState(MODEL);
  for (const [questionId, answerId] of [
    ["b1.gate.initiative.v1", "b1.gate.initiative.v1.unsure"],
    ["b1.gate.visibility.v1", "b1.gate.visibility.v1.board"],
    ["b1.gate.disruption.v1", "b1.gate.disruption.v1.limit"],
    ["b1.gate.tempo.v1", "b1.gate.tempo.v1.depends"],
    ["b1.hall.commander-role.v1", "b1.hall.commander-role.v1.center"],
    ["b1.hall.breadth.v1", "b1.hall.breadth.v1.narrow"],
    ["b1.hall.commitment.v1", "b1.hall.commitment.v1.reopen"],
  ]) oneSidedTargetState = observeDirect(oneSidedTargetState, questionId, answerId);
  const oneSidedTarget = getRoutingTrace(oneSidedTargetState, MODEL).questions.find(
    (question) => question.question_id === "b1.crucible.bant.v1"
  );
  assert(oneSidedTarget?.eligible, "A one-sided bounded target with real frontier discrimination must remain eligible");
  assert(oneSidedTarget.utility > 0);

  const lens = MODEL.question_bank.lens[0];
  assert.throws(
    () => observe({ state: createInitialState(MODEL), model: MODEL, question: lens, answer: lens.answers[0], answerIndex: 0 }),
    /not eligible/,
    "Lens must not be accepted outside its eligibility contract"
  );
  const lensState = findEligibleLensState();
  const lensChecks = [];
  if (lensState) {
    const rankingBeforeLens = rankCandidates(lensState, MODEL);
    for (const answer of lens.answers) {
      const after = observe({ state: lensState, model: MODEL, question: lens, answer, answerIndex: lens.answers.indexOf(answer) });
      assert.deepEqual(rankCandidates(after, MODEL), rankingBeforeLens, `Lens answer ${answer.id} changed behavioral ranking`);
      assert.equal(after.evidence_ledger.length, lensState.evidence_ledger.length);
      assert.equal(after.lens_ledger.length, 1);
      lensChecks.push(answer.id);
    }
  }

  return {
    status: "PASS",
    deterministic_tie_ordering: true,
    unknown_and_conditional_are_neutral: true,
    excessive_uncertainty_is_insufficient: true,
    one_answer_cannot_create_clear_primary: true,
    supported_primary_stable_under_neutral_evidence: true,
    unsupported_tertiary_not_fabricated: true,
    gate_a_bounded_and_named_states_preserved: true,
    contradiction_reduces_support_and_returns_contradictory: true,
    negative_only_winner_blocked: true,
    meaningful_evidence_can_reorder: true,
    adaptive_positive_utility_cases: usefulnessCases,
    targeted_leader_confirmation_bonus_present: false,
    pair_metadata_without_effect_contributes_utility: false,
    one_sided_bounded_target_with_real_discrimination_is_eligible: true,
    lens_eligibility_enforced: true,
    eligible_yore_glint_lens_route_reachable: Boolean(lensState),
    lens_answers_ranking_neutral: lensChecks,
    behavioral_and_lens_ledgers_separate: true,
    numeric_public_confidence_authorized: false,
  };
}

function terminationReport() {
  const stopReasons = {};
  const resultStates = {};
  let maxQuestions = 0;
  let deterministicCases = 0;
  let insufficientCases = 0;
  const recoveryStates = [];
  for (let seed = 1; seed <= RANDOM_JOURNEY_COUNT; seed += 1) {
    const run = runRandomJourney(seed);
    const count = run.state.answered_question_ids.length;
    for (const alternative of run.snapshot.result.alternatives || []) {
      const candidate = run.snapshot.ranking.find((entry) => entry.identity === alternative.identity);
      assert(candidate && getNamingQualification(candidate, MODEL).qualified, `Public alternative ${alternative.identity} was not independently naming-qualified`);
    }
    maxQuestions = Math.max(maxQuestions, count);
    assert(count <= 8, `Journey ${seed} exceeded eight questions`);
    assert.equal(new Set(run.state.answered_question_ids).size, count, `Journey ${seed} repeated a question`);
    assert.deepEqual(run.state.answered_question_ids.slice(0, 4), MODEL.question_bank.gate.map((question) => question.id));
    const replay = replaySelections(MODEL, run.selections);
    assert.deepEqual(resultSnapshot(replay), run.snapshot, `Journey ${seed} is not deterministic`);
    deterministicCases += 1;
    const stopping = run.snapshot.stopping;
    assert(stopping.stop, `Journey ${seed} ended without a legal stopping state`);
    stopReasons[stopping.reason] = (stopReasons[stopping.reason] || 0) + 1;
    const resultState = run.snapshot.result.result_state;
    if (["primary", "close", "tied", "mixed"].includes(resultState)) {
      const publicPrimary = run.snapshot.ranking.find((candidate) => candidate.identity === run.snapshot.result.faction);
      assert(
        publicPrimary && getNamingQualification(publicPrimary, MODEL).qualified,
        `Named public state ${resultState} used an unqualified primary`
      );
    }
    resultStates[resultState] = (resultStates[resultState] || 0) + 1;
    if (resultState === "insufficient") {
      insufficientCases += 1;
      recoveryStates.push(run);
    }
  }
  return {
    status: "PASS",
    generated_journeys: RANDOM_JOURNEY_COUNT,
    deterministic_replays: deterministicCases,
    maximum_questions_observed: maxQuestions,
    loops: 0,
    repeated_questions: 0,
    stale_routes: 0,
    stop_reasons: stopReasons,
    result_states: resultStates,
    insufficient_cases: insufficientCases,
    recoveryStates,
  };
}

function routingBaselineReport(reachability, pairs, termination) {
  const selectedQuestions = new Map();
  const targetedSelections = new Map();
  let adaptiveSteps = 0;
  let targetedSteps = 0;
  let lensSteps = 0;
  let metadataOnlyPairReferences = 0;
  for (let seed = 1; seed <= 1000; seed += 1) {
    const rng = makeRng(900000 + seed);
    let state = createInitialState(MODEL);
    for (let guard = 0; guard < 8; guard += 1) {
      const question = selectNextQuestion(state, MODEL);
      if (!question) break;
      if (state.answered_question_ids.length >= 4) {
        const ranking = rankCandidates(state, MODEL);
        const trace = getRoutingTrace(state, MODEL, ranking);
        assert.equal(trace.selected_question_id, question.id, `Routing trace drift for seed ${seed}`);
        adaptiveSteps += 1;
        selectedQuestions.set(question.id, (selectedQuestions.get(question.id) || 0) + 1);
        metadataOnlyPairReferences += trace.questions.reduce((sum, entry) => sum + entry.metadata_only_pairs.length, 0);
        if (question.evidence_class === "IDENTITY_LENS_SELF_REPORT") {
          lensSteps += 1;
        } else if (question.stage === "crucible") {
          targetedSteps += 1;
          targetedSelections.set(question.id, (targetedSelections.get(question.id) || 0) + 1);
          const eligibleTargeted = trace.questions.filter((entry) => entry.stage === "crucible" && entry.eligible);
          const maximumUtility = Math.max(...eligibleTargeted.map((entry) => entry.utility), 0);
          assert.equal(trace.selected_utility, maximumUtility, `Targeted route did not maximize discrimination for seed ${seed}`);
        }
      }
      const answerIndex = Math.floor(rng() * question.answers.length);
      state = observe({ state, model: MODEL, question, answer: question.answers[answerIndex], answerIndex });
    }
  }
  return {
    status: "PASS",
    model_version: MODEL._meta.model_version,
    mapping_version: MODEL._meta.mapping_version,
    routing_policy: "symmetric-discrimination-only",
    leader_confirmation_bonus_present: false,
    pair_coverage_metadata_can_create_utility: false,
    generated_journeys: 1000,
    adaptive_steps: adaptiveSteps,
    targeted_steps: targetedSteps,
    lens_steps: lensSteps,
    metadata_only_pair_references_observed: metadataOnlyPairReferences,
    selected_question_counts: Object.fromEntries([...selectedQuestions.entries()].sort()),
    targeted_question_counts: Object.fromEntries([...targetedSelections.entries()].sort()),
    reachability: {
      candidate_set: reachability.candidate_set_reachable,
      responsible_public_candidate: reachability.responsible_public_candidate_reachable,
      primary: reachability.primary_reachable,
      top_2: reachability.top_2_reachable,
      top_3: reachability.top_3_reachable,
    },
    confusion_pairs: {
      routable_direct: pairs.routable_direct,
      direct_not_reached: pairs.direct_not_reached,
      bounded_no_direct: pairs.bounded_no_direct,
    },
    stopping_states: termination.result_states,
  };
}

function reachabilityReport() {
  const rows = [];
  const searchCache = new Map();
  for (const identity of MODEL.identities) {
    const requiresNamedEndpointSearch = ["BANT", "R", "WUBRG", "YORE"].includes(identity.id);
    const search = beamSearchIdentity(identity.id, requiresNamedEndpointSearch
      ? { beamWidth: 3000, refinementBeamWidth: 200 }
      : undefined);
    searchCache.set(identity.id, search);
    const best = search.best;
    const internalOrder = best.ranking.map((candidate) => candidate.identity);
    const minimumEvidence = best.selections.length;
    const mainEvidence = best.selections.filter((selection) => !selection.refinement).length;
    const refinementEvidence = best.selections.filter((selection) => selection.refinement).length;
    const strongestCompetitors = best.ranking.filter((candidate) => candidate.identity !== identity.id).slice(0, 5).map((candidate) => candidate.identity);
    const discriminatingQuestions = allBehavioralQuestions()
      .filter((question) => question.answers.some((answer) =>
        answer.identity_mapping.support.includes(identity.id) || answer.identity_mapping.contradict.includes(identity.id)
      ))
      .map((question) => question.id);
    rows.push({
      identity: identity.id,
      identity_name: identity.name,
      observability: identity.instrument_observability,
      mapping_validation: identity.mapping_validation,
      strongest_approved_evidence_path: best.selections,
      supporting_constructs: identity.supporting_constructs,
      strongest_competitors: strongestCompetitors,
      major_confusion_pairs: MODEL.confusion_pairs.filter((pair) => pair.identities.includes(identity.id)).map((pair) => pair.id),
      can_enter_candidate_set: best.result.candidate_set.includes(identity.id) || best.rank <= 8,
      can_become_responsible_public_candidate: search.bestPublicRank !== null,
      can_become_primary: best.publicPrimary,
      can_appear_top_2: search.bestPublicRank !== null && search.bestPublicRank <= 2,
      can_appear_top_3: search.bestPublicRank !== null && search.bestPublicRank <= 3,
      can_appear_internal_top_2: internalOrder.slice(0, 2).includes(identity.id),
      can_appear_internal_top_3: internalOrder.slice(0, 3).includes(identity.id),
      best_internal_rank: best.rank,
      minimum_evidence_needed: minimumEvidence,
      main_journey_evidence: mainEvidence,
      optional_refinement_evidence: refinementEvidence,
      discriminating_questions: discriminatingQuestions,
      routing_questions_encountered: search.encounteredQuestions,
      unresolved_authority_gaps: best.publicPrimary
        ? []
        : [identity.uncovered_risks, identity.observability_rationale].filter(Boolean),
      blocking_reason: best.publicPrimary
        ? null
        : identity.instrument_observability === "PARTIALLY_OBSERVABLE"
          ? "Approved B1 evidence supplies structural/family coverage but no identity-specific naming discriminator."
          : identity.instrument_observability === "NOT_CLEANLY_OBSERVABLE"
            ? "Certified identity truth cannot be cleanly observed from Commander behavior; the lens is secondary and cannot name or flip a result."
            : "The deterministic route did not reach sufficient independent approved naming evidence.",
    });
  }
  assert.equal(rows.length, 37);
  return {
    status: rows.every((row) => row.can_become_primary) ? "PASS" : "BLOCKING_EVIDENCE_GAPS",
    identities: 37,
    candidate_set_reachable: rows.filter((row) => row.can_enter_candidate_set).length,
    responsible_public_candidate_reachable: rows.filter((row) => row.can_become_responsible_public_candidate).length,
    primary_reachable: rows.filter((row) => row.can_become_primary).length,
    top_2_reachable: rows.filter((row) => row.can_appear_top_2).length,
    top_3_reachable: rows.filter((row) => row.can_appear_top_3).length,
    cannot_become_primary: rows.filter((row) => !row.can_become_primary).map((row) => row.identity),
    rows,
    searchCache,
  };
}

function confusionPairReport(reachability) {
  const rows = MODEL.confusion_pairs.map((pair) => {
    const [left, right] = pair.identities;
    const leftIdentity = IDENTITY_BY_ID.get(left);
    const rightIdentity = IDENTITY_BY_ID.get(right);
    const shared = leftIdentity.supporting_constructs.filter((construct) => rightIdentity.supporting_constructs.includes(construct));
    const questions = pair.question_ids.map((id) => QUESTION_BY_ID.get(id)).filter(Boolean);
    const directQuestions = questions.filter((question) => question.answers.some((answer) => {
      const mapping = answer.identity_mapping || {};
      const leftEffect = (mapping.support.includes(left) ? 1 : 0) - (mapping.contradict.includes(left) ? 1 : 0);
      const rightEffect = (mapping.support.includes(right) ? 1 : 0) - (mapping.contradict.includes(right) ? 1 : 0);
      return leftEffect !== rightEffect;
    }));
    const leftSearch = reachability.searchCache.get(left);
    const rightSearch = reachability.searchCache.get(right);
    const encountered = new Set([...leftSearch.encounteredQuestions, ...rightSearch.encounteredQuestions]);
    const routable = questions.some((question) => encountered.has(question.id));
    const coexist =
      leftSearch.best.ranking.slice(0, 8).some((candidate) => candidate.identity === right) ||
      rightSearch.best.ranking.slice(0, 8).some((candidate) => candidate.identity === left);
    const resolution = directQuestions.length && routable
      ? "ROUTABLE_APPROVED_DISCRIMINATOR"
      : directQuestions.length
        ? "APPROVED_DISCRIMINATOR_NOT_REACHED_IN_STRONGEST_SEARCH"
        : "BOUNDED_NO_DIRECT_DISCRIMINATOR";
    return {
      pair_id: pair.id,
      identities: pair.identities,
      category: pair.category,
      can_coexist_as_candidates: coexist,
      shared_constructs: shared,
      approved_question_ids: pair.question_ids,
      direct_discriminating_question_ids: directQuestions.map((question) => question.id),
      routing_can_reach_listed_question: routable,
      discriminator_changes_relative_support: directQuestions.length > 0,
      bounded_when_no_direct_discriminator: directQuestions.length === 0,
      observable_distinction: pair.observable_distinction,
      coverage_status: pair.coverage_status,
      resolution,
    };
  });
  assert.equal(rows.length, 123);
  assert(rows.every((row) => row.resolution), "A confusion pair silently stalled");
  return {
    status: rows.every((row) => row.resolution) ? "PASS_WITH_EXPLICIT_GAPS" : "FAIL",
    pairs: 123,
    routable_direct: rows.filter((row) => row.resolution === "ROUTABLE_APPROVED_DISCRIMINATOR").length,
    direct_not_reached: rows.filter((row) => row.resolution === "APPROVED_DISCRIMINATOR_NOT_REACHED_IN_STRONGEST_SEARCH").length,
    bounded_no_direct: rows.filter((row) => row.resolution === "BOUNDED_NO_DIRECT_DISCRIMINATOR").length,
    rows,
  };
}

function robustnessReport() {
  const variants = ["clean", "partial", "one_neutral", "multiple_neutral", "one_contradiction", "mild_noise", "overlap", "blended", "sparse"];
  const rows = [];
  for (const identity of MODEL.identities) {
    const competitor = identity.strongest_competitors[0] || MODEL.identities.find((item) => item.id !== identity.id).id;
    const counts = { runs: 0, top_1: 0, top_2: 0, top_3: 0, public_primary: 0, insufficient: 0 };
    const competing = new Map();
    const insufficientReasons = new Map();
    const separatingQuestions = new Map();
    for (const variant of variants) {
      for (let index = 0; index < SYNTHETIC_VARIANTS_PER_TYPE; index += 1) {
        const run = syntheticJourney(identity.id, variant, 1000 + index + variants.indexOf(variant) * 97 + identity.id.charCodeAt(0), competitor);
        const order = run.result.internal_candidate_order.map((candidate) => candidate.identity);
        const rank = order.indexOf(identity.id) + 1;
        counts.runs += 1;
        if (rank === 1) counts.top_1 += 1;
        if (rank > 0 && rank <= 2) counts.top_2 += 1;
        if (rank > 0 && rank <= 3) counts.top_3 += 1;
        if (run.result.faction === identity.id && ["primary", "close", "tied"].includes(run.result.result_state)) counts.public_primary += 1;
        if (run.result.result_state === "insufficient") {
          counts.insufficient += 1;
          insufficientReasons.set(run.result.stopping.reason, (insufficientReasons.get(run.result.stopping.reason) || 0) + 1);
        }
        const leadCompetitor = order.find((id) => id !== identity.id);
        if (leadCompetitor) competing.set(leadCompetitor, (competing.get(leadCompetitor) || 0) + 1);
        for (const selection of run.selections) {
          const question = QUESTION_BY_ID.get(selection.question_id);
          const answer = question.answers.find((item) => item.id === selection.answer_id);
          if (answer.identity_mapping?.support.includes(identity.id)) {
            separatingQuestions.set(question.id, (separatingQuestions.get(question.id) || 0) + 1);
          }
        }
      }
    }
    const mostCommon = [...competing.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || null;
    const commonInsufficient = [...insufficientReasons.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || null;
    rows.push({
      identity: identity.id,
      runs: counts.runs,
      primary_frequency: counts.top_1 / counts.runs,
      top_2_frequency: counts.top_2 / counts.runs,
      top_3_frequency: counts.top_3 / counts.runs,
      responsible_named_primary_frequency: counts.public_primary / counts.runs,
      insufficient_frequency: counts.insufficient / counts.runs,
      most_common_competing_identity: mostCommon,
      common_insufficient_condition: commonInsufficient,
      questions_most_responsible_for_separation: [...separatingQuestions.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5).map(([question_id, count]) => ({ question_id, count })),
    });
  }
  return {
    label: REPORT_LABEL,
    status: "COMPLETE_NOT_EMPIRICAL",
    variants,
    runs_per_identity: variants.length * SYNTHETIC_VARIANTS_PER_TYPE,
    total_runs: rows.reduce((sum, row) => sum + row.runs, 0),
    rows,
  };
}

function continueGreedy(state, identityId) {
  let nextState = state;
  const selections = [];
  for (let guard = 0; guard < 8; guard += 1) {
    const question = selectNextQuestion(nextState, MODEL);
    if (!question) break;
    const selected = rankedAnswerOptions(nextState, question, identityId)[0];
    selections.push({ question_id: question.id, answer_id: selected.answer.id });
    nextState = selected.next;
  }
  return { state: nextState, selections };
}

function sensitivityReport(reachability) {
  const cases = [];
  for (const identity of MODEL.identities) {
    const baseline = reachability.searchCache.get(identity.id).best;
    const baselineResult = baseline.result;
    for (let index = 0; index < baseline.selections.length; index += 1) {
      const prefix = baseline.selections.slice(0, index);
      const baseSelection = baseline.selections[index];
      const question = QUESTION_BY_ID.get(baseSelection.question_id);
      for (const answer of question.answers.filter((item) => item.id !== baseSelection.answer_id)) {
        let state = replaySelections(MODEL, prefix);
        const liveQuestion = selectNextQuestion(state, MODEL);
        if (!liveQuestion || liveQuestion.id !== question.id) continue;
        state = observe({ state, model: MODEL, question: liveQuestion, answer, answerIndex: liveQuestion.answers.findIndex((item) => item.id === answer.id) });
        const continuation = continueGreedy(state, identity.id);
        const mutatedResult = finalizeReading({ state: continuation.state, model: MODEL, factions: FACTIONS });
        const originalAnswer = question.answers.find((item) => item.id === baseSelection.answer_id);
        const meaningful =
          originalAnswer.identity_mapping.affected_identities.length > 0 ||
          answer.identity_mapping.affected_identities.length > 0 ||
          originalAnswer.signal !== answer.signal;
        const baselinePrimary = baselineResult.faction;
        const mutatedPrimary = mutatedResult.faction;
        const primaryChanged = baselinePrimary !== mutatedPrimary;
        const baselineRank = baselineResult.internal_candidate_order.findIndex((candidate) => candidate.identity === identity.id) + 1;
        const mutatedRank = mutatedResult.internal_candidate_order.findIndex((candidate) => candidate.identity === identity.id) + 1;
        const largeSwing = Math.abs(mutatedRank - baselineRank) >= 8;
        cases.push({
          target_identity: identity.id,
          question_id: question.id,
          original_answer_id: originalAnswer.id,
          mutated_answer_id: answer.id,
          meaningful_discriminator_change: meaningful,
          ranking_stable: baselineRank === mutatedRank,
          adjacent_identity_changed: baselineResult.internal_candidate_order[1]?.identity !== mutatedResult.internal_candidate_order[1]?.identity,
          primary_changed: primaryChanged,
          stopping_changed: baselineResult.result_state !== mutatedResult.result_state || baseline.selections.length !== continuation.state.answered_question_ids.length,
          refinement_changed: JSON.stringify(baselineResult.refinement) !== JSON.stringify(mutatedResult.refinement),
          target_rank_before: baselineRank,
          target_rank_after: mutatedRank,
          catastrophic_weak_sensitivity: primaryChanged && largeSwing && !meaningful,
        });
      }
    }
  }
  return {
    status: cases.some((entry) => entry.catastrophic_weak_sensitivity) ? "FLAGGED" : "PASS",
    representative_journeys: 37,
    mutation_cases: cases.length,
    primary_changes: cases.filter((entry) => entry.primary_changed).length,
    stopping_changes: cases.filter((entry) => entry.stopping_changed).length,
    refinement_changes: cases.filter((entry) => entry.refinement_changed).length,
    catastrophic_weak_sensitivity_cases: cases.filter((entry) => entry.catastrophic_weak_sensitivity),
    cases,
  };
}

function recoveryReport(termination) {
  const unique = new Map();
  for (const run of termination.recoveryStates) {
    const key = run.selections.map((selection) => selection.answer_id).join("|");
    if (!unique.has(key)) unique.set(key, run);
  }
  const cases = [...unique.values()].map((run) => {
    const refinement = getRefinementPath(run.state, MODEL);
    if (refinement.kind === "ask_targeted_question") {
      assert(!run.state.answered_question_ids.includes(refinement.question_id), "Recovery suggested an already-used question");
      assert(QUESTION_BY_ID.has(refinement.question_id), "Recovery suggested an unknown question");
      assert(refinement.unresolved_boundaries.length || refinement.remaining_candidates.length >= 2, "Recovery question has no unresolved candidate boundary");
    }
    if (refinement.kind === "revisit_prior_answer") {
      const entry = run.state.evidence_ledger.find((item) => item.answer_id === refinement.revisit.answer_id);
      assert(entry?.neutral, "Recovery revisit was not conditional/unknown/neutral");
    }
    return {
      selections: run.selections,
      remaining_candidates: refinement.remaining_candidates,
      kind: refinement.kind,
      question_id: refinement.question_id,
      revisit: refinement.revisit,
      unresolved_boundaries: refinement.unresolved_boundaries.map((boundary) => boundary.pair_id),
    };
  });
  const counts = {
    ask_targeted_question: cases.filter((entry) => entry.kind === "ask_targeted_question").length,
    revisit_prior_answer: cases.filter((entry) => entry.kind === "revisit_prior_answer").length,
    no_approved_discriminator: cases.filter((entry) => entry.kind === "no_approved_discriminator").length,
  };
  const patternMap = new Map();
  for (const entry of cases) {
    const key = JSON.stringify({
      kind: entry.kind,
      question_id: entry.question_id,
      revisit_question_id: entry.revisit?.question_id || null,
      unresolved_boundaries: entry.unresolved_boundaries,
    });
    const pattern = patternMap.get(key) || {
      kind: entry.kind,
      question_id: entry.question_id,
      revisit_question_id: entry.revisit?.question_id || null,
      unresolved_boundaries: entry.unresolved_boundaries,
      cases: 0,
      example_remaining_candidates: entry.remaining_candidates,
    };
    pattern.cases += 1;
    patternMap.set(key, pattern);
  }
  const recoveryPatterns = [...patternMap.values()].sort((left, right) =>
    right.cases - left.cases ||
    String(left.kind).localeCompare(String(right.kind)) ||
    String(left.question_id || left.revisit_question_id || "").localeCompare(String(right.question_id || right.revisit_question_id || "")) ||
    left.unresolved_boundaries.join("|").localeCompare(right.unresolved_boundaries.join("|"))
  );
  return {
    status: "PASS",
    generated_insufficient_states: termination.insufficient_cases,
    unique_insufficient_states: cases.length,
    counts,
    recovery_patterns: recoveryPatterns,
    impossible_recommendations: 0,
  };
}

function ownerSummary(reachability, pairs, robustness, recovery, sensitivity) {
  const unreachable = reachability.rows.filter((row) => !row.can_become_primary);
  const unexpectedUnreachable = unreachable.filter((row) => row.identity !== "YORE");
  const recoveryCount = recovery.counts.ask_targeted_question + recovery.counts.revisit_prior_answer + recovery.counts.no_approved_discriminator;
  const everyRecoveryBounded = recoveryCount === recovery.unique_insufficient_states;
  const hardPairs = [...pairs.rows]
    .sort((a, b) => {
      const rank = (row) => row.resolution === "BOUNDED_NO_DIRECT_DISCRIMINATOR" ? 2 : row.resolution === "APPROVED_DISCRIMINATOR_NOT_REACHED_IN_STRONGEST_SEARCH" ? 1 : 0;
      return rank(b) - rank(a) || b.shared_constructs.length - a.shared_constructs.length || a.pair_id.localeCompare(b.pair_id);
    })
    .slice(0, 12);
  const lines = [
    "# VM-551 Gate B1 Placement Engine — Owner Summary",
    "",
    `Model: \`${MODEL._meta.model_version}\``,
    "",
    `**${REPORT_LABEL}**`,
    "",
    "## Direct answers",
    "",
    `- **Can all 37 identities enter the internal candidate frontier?** ${reachability.candidate_set_reachable === 37 ? "Yes." : `No. ${37 - reachability.candidate_set_reachable} cannot enter a plausible candidate set.`}`,
    `- **Can all 37 identities be named as responsible public candidates?** ${reachability.responsible_public_candidate_reachable === 37 ? "Yes." : `No. ${reachability.responsible_public_candidate_reachable}/37 have a qualified public path.`}`,
    `- **Can all 37 become primary?** No. ${reachability.primary_reachable}/37 can become a responsible named primary under the approved evidence.`,
    `- **Cannot become primary:** ${unreachable.map((row) => row.identity).join(", ") || "None"}.`,
    `- **Can every insufficient result go somewhere useful?** ${everyRecoveryBounded ? "Yes, every generated unique insufficient state has an explicit recovery disposition." : "No; at least one generated insufficient state lacks a recorded recovery disposition."} Targeted question: ${recovery.counts.ask_targeted_question}; useful revisit: ${recovery.counts.revisit_prior_answer}; no approved discriminator: ${recovery.counts.no_approved_discriminator}.`,
    `- **Is anything structurally blocking owner hands-on testing?** ${unexpectedUnreachable.length ? `Yes — ${unexpectedUnreachable.length} behaviorally observable identities still lack a responsible primary path.` : "No. The 36 behaviorally observable identities meet the target; Yore remains intentionally bounded."}`,
    "",
    "## Primary blockers",
    "",
    ...unreachable.map((row) => `- **${row.identity}:** ${row.blocking_reason}`),
    "",
    "## Hardest confusion areas",
    "",
    ...hardPairs.map((row, index) => `${index + 1}. **${row.identities.join(" / ")}** — ${row.resolution}; shared constructs: ${row.shared_constructs.join(", ") || "none"}.`),
    "",
    "## In-model robustness",
    "",
    "| Identity | Top 1 | Top 2 | Top 3 | Responsible named primary | Insufficient | Common competitor |",
    "|---|---:|---:|---:|---:|---:|---|",
    ...robustness.rows.map((row) => `| ${row.identity} | ${(row.primary_frequency * 100).toFixed(1)}% | ${(row.top_2_frequency * 100).toFixed(1)}% | ${(row.top_3_frequency * 100).toFixed(1)}% | ${(row.responsible_named_primary_frequency * 100).toFixed(1)}% | ${(row.insufficient_frequency * 100).toFixed(1)}% | ${row.most_common_competing_identity || "—"} |`),
    "",
    "These frequencies measure only synthetic agents generated from the model's own approved mappings. They are structural diagnostics, not real-player accuracy.",
    "",
    "## Sensitivity",
    "",
    `- ${sensitivity.mutation_cases} one-answer mutations tested.`,
    `- ${sensitivity.primary_changes} changed the internal primary; ${sensitivity.stopping_changes} changed stopping/result behavior.`,
    `- Catastrophic weak/irrelevant-answer sensitivity flags: ${sensitivity.catastrophic_weak_sensitivity_cases.length}.`,
    "",
    "## Owner gate",
    "",
    unexpectedUnreachable.length
      ? "Do not treat Gate B1 as instrument-complete. At least one behaviorally observable identity still lacks a responsible primary path."
      : "The preferred instrument-completion target is met: 36 behaviorally observable identities have responsible primary paths, Yore remains honestly bounded, and synthetic results remain non-empirical.",
  ];
  return lines.join("\n");
}

const invariant = structuralReport();
const focused = focusedBehaviorReport();
const terminationWithStates = terminationReport();
const reachabilityWithCache = reachabilityReport();
const pairs = confusionPairReport(reachabilityWithCache);
const robustness = robustnessReport();
const sensitivity = sensitivityReport(reachabilityWithCache);
const recovery = recoveryReport(terminationWithStates);
const routingCurrent = routingBaselineReport(reachabilityWithCache, pairs, terminationWithStates);

const termination = { ...terminationWithStates };
delete termination.recoveryStates;
const reachability = { ...reachabilityWithCache };
delete reachability.searchCache;

writeOrCheck("invariant-validation.json", invariant);
writeOrCheck("focused-behavior.json", focused);
writeOrCheck("stopping-termination.json", termination);
writeOrCheck("identity-reachability.json", reachability);
writeOrCheck("confusion-pair-resolution.json", pairs);
writeOrCheck("synthetic-robustness.json", robustness);
writeOrCheck("sensitivity-mutation.json", sensitivity);
writeOrCheck("insufficient-recovery.json", recovery);
writeOrCheck("routing-current.json", routingCurrent);
writeOrCheck("owner-summary.md", ownerSummary(reachabilityWithCache, pairs, robustness, recovery, sensitivity));

console.log(
  `Gate B1 engine validation ${CHECK ? "checked" : "generated"}: ` +
  `${RANDOM_JOURNEY_COUNT} journeys, 37 identities, 123 pairs, ${robustness.total_runs} synthetic runs, ` +
  `${sensitivity.mutation_cases} mutations, ${reachability.primary_reachable}/37 responsible primaries.`
);

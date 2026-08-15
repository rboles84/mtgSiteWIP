import assert from "node:assert/strict";
import fs from "node:fs";

import {
  finalizeReading,
  getRefinementPath,
  getNamingQualification,
  observe,
  rankCandidates,
  replaySelections,
  runJourney,
} from "../assets/js/gate-b1-placement-engine.js";

const model = JSON.parse(fs.readFileSync(new URL("../data/gate-b1-placement-model.json", import.meta.url), "utf8"));
const factions = JSON.parse(fs.readFileSync(new URL("../data/factions.json", import.meta.url), "utf8")).factions;
const runtimeSource = fs.readFileSync(new URL("../assets/js/index.js", import.meta.url), "utf8");
const questions = Object.values(model.question_bank).flatMap((rows) => Array.isArray(rows) ? rows : []);
const questionById = new Map(questions.map((question) => [question.id, question]));

assert.match(runtimeSource, /start-result-refinement/);
assert.match(runtimeSource, /revisit-result-answer/);
assert.match(runtimeSource, /show-bounded-direction/);
assert.match(runtimeSource, /Refine these directions/);
assert.match(runtimeSource, /Try to separate/);
assert.doesNotMatch(runtimeSource, /Sharpen This Reading/);
assert.match(runtimeSource, /if \(APP_STATE\.refinementMode === "targeted"\)[\s\S]*?finalizeQuickReading\(\)/);
assert.match(runtimeSource, /function captureRefinementOrigin\(\)[\s\S]*?refinementOriginResult = \{/);
assert.match(runtimeSource, /function restoreRefinementOriginReading\(\)/);
assert.match(runtimeSource, /return-to-previous-reading/);
assert.doesNotMatch(runtimeSource, /refinementHistory|refinement_history/, "one-step return must not become a generalized history stack");

const STATE_ORDER = Object.freeze({ mixed: 0, tied: 1, close: 2, primary: 3 });

function refinementPublicIds(state) {
  const ranked = rankCandidates(state, model);
  const result = finalizeReading({ state, model, factions });
  const qualified = ranked.filter((candidate) => getNamingQualification(candidate, model).qualified);
  const primary = qualified[0];
  if (!primary) return { state: result.result_state, ids: [] };
  const window = Number(model.scoring_rules.meaningful_alternative_window || 0.2);
  const nearby = qualified.filter((candidate) => candidate.score >= primary.score - window);
  if (result.result_state === "tied") {
    return { state: result.result_state, ids: nearby.filter((candidate) => Math.abs(candidate.score - primary.score) <= 1e-9).slice(0, 3).map((candidate) => candidate.identity) };
  }
  if (result.result_state === "close") return { state: result.result_state, ids: nearby.slice(0, 2).map((candidate) => candidate.identity) };
  if (result.result_state === "mixed") return { state: result.result_state, ids: nearby.slice(0, 3).map((candidate) => candidate.identity) };
  return { state: result.result_state, ids: [] };
}

function assertMonotonicRefinement(state, refinement, label) {
  if (refinement.kind !== "ask_targeted_question") return;
  const origin = refinementPublicIds(state);
  if (!["mixed", "tied", "close"].includes(origin.state)) return;
  assert.deepEqual(refinement.remaining_candidates, origin.ids, `${label} refinement frontier drifted from the public result`);
  const originSet = new Set(origin.ids);
  const question = questionById.get(refinement.question_id);
  let improvedBranches = 0;
  question.answers.forEach((answer, answerIndex) => {
    const nextState = observe({ state, model, question, answer, answerIndex });
    const next = refinementPublicIds(nextState);
    const introduced = next.ids.filter((identity) => !originSet.has(identity));
    assert.deepEqual(introduced, [], `${label}/${answer.id} introduced a new public identity`);
    assert.ok(next.ids.length <= origin.ids.length, `${label}/${answer.id} broadened the public frontier`);
    assert.ok(STATE_ORDER[next.state] >= STATE_ORDER[origin.state], `${label}/${answer.id} worsened ${origin.state} to ${next.state}`);
    if (next.ids.length < origin.ids.length || STATE_ORDER[next.state] > STATE_ORDER[origin.state]) improvedBranches += 1;
  });
  assert.ok(improvedBranches > 0, `${label} refinement has no materially improving answer branch`);
}

function rng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

const counts = {
  journeys: 2000,
  bounded: 0,
  ask_targeted_question: 0,
  revisit_prior_answer: 0,
  no_approved_discriminator: 0,
  mixed: 0,
};

for (let seed = 1; seed <= counts.journeys; seed += 1) {
  const random = rng(seed * 7919);
  const journey = runJourney({
    model,
    factions,
    strategy(question) {
      return Math.floor(random() * question.answers.length);
    },
  });
  const { result, state } = journey;
  if (!["insufficient", "contradictory", "mixed"].includes(result.result_state)) continue;
  counts.bounded += 1;
  const refinement = getRefinementPath(state, model);
  counts[refinement.kind] += 1;
  assert.deepEqual(refinement, result.refinement, `result refinement drift for seed ${seed}`);

  if (result.result_state === "mixed") {
    counts.mixed += 1;
    assert.ok(result.top_matches.length >= 2, `mixed result ${seed} must expose supported directions`);
    assert.ok(result.top_matches.every((match) => match?.faction), `mixed result ${seed} contained an empty direction`);
    if (refinement.kind === "ask_targeted_question") {
      assert.equal(refinement.purpose, "refine_supported_directions");
      assert.ok(refinement.target_identities.length >= 2);
      assertMonotonicRefinement(state, refinement, `mixed seed ${seed}`);
    }
  }

  if (refinement.kind === "ask_targeted_question") {
    const question = questionById.get(refinement.question_id);
    assert.ok(question, `refinement ${seed} names an unknown question`);
    assert.equal(question.stage, "crucible", `refinement ${seed} selected a generic Hall question`);
    assert.ok(!state.answered_question_ids.includes(question.id), `refinement ${seed} repeated a consumed question`);
    const originalLedger = JSON.stringify(result.evidence_ledger);
    const refinedState = observe({ state, model, question, answer: question.answers[0], answerIndex: 0 });
    const refinedResult = finalizeReading({ state: refinedState, model, factions });
    assert.equal(refinedResult.evidence_ledger.length, result.evidence_ledger.length + 1);
    assert.equal(JSON.stringify(result.evidence_ledger), originalLedger, "optional refinement mutated the original evidence ledger");
  } else if (refinement.kind === "revisit_prior_answer") {
    assert.ok(refinement.revisit?.question_id && refinement.revisit?.answer_id);
    assert.ok(state.answered_question_ids.includes(refinement.revisit.question_id));
  } else {
    assert.equal(refinement.kind, "no_approved_discriminator");
    assert.equal(refinement.can_reduce_ambiguity, false);
    assert.ok(refinement.limitation);
  }
}

const jundWitness = runJourney({
  model,
  factions,
  strategy(question) {
    const ids = [
      "b1.gate.initiative.v1.advance",
      "b1.gate.visibility.v1.held",
      "b1.gate.disruption.v1.protect",
      "b1.gate.tempo.v1.depends",
      "b1.hall.commitment.v1.procedure",
      "b1.hall.interaction-window.v1.before",
      "b1.hall.pressure.v1.combat",
      "b1.crucible.disruption-boundary.v1.convert",
    ];
    const answerId = ids.find((id) => id.startsWith(`${question.id}.`));
    const answerIndex = question.answers.findIndex((answer) => answer.id === answerId);
    assert.ok(answerIndex >= 0, `Jund witness drifted at ${question.id}`);
    return answerIndex;
  },
});
assert.equal(jundWitness.result.result_state, "mixed");
assert.deepEqual(jundWitness.result.top_matches.map((match) => match.faction), ["W", "JUND", "RG"]);
assert.equal(jundWitness.result.refinement.kind, "no_approved_discriminator");
assert.equal(jundWitness.result.refinement.can_reduce_ambiguity, false);

const visualReviewManifest = JSON.parse(fs.readFileSync(new URL("../docs/audits/vm551-all-37-dossier-closeout/visual-review-manifest.json", import.meta.url), "utf8"));
const greenWitness = visualReviewManifest.cases.find((row) => row.case_id === "green-witherbloom-tied");
assert.ok(greenWitness?.preload_saved_result, "preserved Green/Witherbloom owner ledger is missing from the review manifest");
assert.equal(greenWitness.initial_focus_identity_key, "WITHERBLOOM", "the tied owner case must open on Witherbloom without changing its result authority");
const greenState = replaySelections(model, greenWitness.selections.map((selection) => ({
  question_id: selection.question_id,
  answer_id: selection.answer_id,
})));
const greenPublic = refinementPublicIds(greenState);
const greenRefinement = getRefinementPath(greenState, model);
assert.equal(greenPublic.state, "tied");
assert.deepEqual(greenPublic.ids, ["G", "WITHERBLOOM"]);
assert.deepEqual(greenRefinement.remaining_candidates, ["G", "WITHERBLOOM"]);
assert.equal(greenRefinement.kind, "no_approved_discriminator");
assert.notEqual(greenRefinement.question_id, "b1.crucible.mono-multi.v1");

let cleanPrimarySeen = false;
for (let seed = 1; seed <= 1000 && !cleanPrimarySeen; seed += 1) {
  const random = rng(seed * 3571);
  const journey = runJourney({ model, factions, strategy: (question) => Math.floor(random() * question.answers.length) });
  if (journey.result.result_state !== "primary") continue;
  cleanPrimarySeen = true;
  assert.equal(journey.result.refinement.kind, "no_approved_discriminator");
  assert.equal(journey.result.refinement.purpose, "none_for_clean_primary");
}
assert.equal(cleanPrimarySeen, true, "generated journeys did not exercise a clean primary refinement boundary");

assert.ok(counts.bounded > 0);
assert.equal(counts.bounded, counts.ask_targeted_question + counts.revisit_prior_answer + counts.no_approved_discriminator);
console.log(JSON.stringify({ status: "PASS", ...counts }, null, 2));

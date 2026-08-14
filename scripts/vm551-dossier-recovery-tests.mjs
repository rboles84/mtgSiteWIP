import assert from "node:assert/strict";
import fs from "node:fs";

import {
  finalizeReading,
  getRefinementPath,
  observe,
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
assert.match(runtimeSource, /refinementOriginResult = APP_STATE\.activeResult/);

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
assert.equal(jundWitness.result.refinement.question_id, "b1.crucible.mono-multi.v1");
assert.equal(jundWitness.result.refinement.purpose, "refine_supported_directions");

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

import assert from "node:assert/strict";
import fs from "node:fs";
import {
  GATE_B1_RUNTIME_ERROR_MESSAGE,
  validateGateB1RuntimeModel,
} from "../assets/js/archscry/gate-b1-runtime-contract.js";
import {
  createInitialAdaptiveState,
  applyAdaptiveAnswer,
  selectNextAdaptiveQuestion,
} from "../assets/js/archscry/gate-b1-placement-engine.js";

const model = JSON.parse(fs.readFileSync(new URL("../data/gate-b1-placement-model.json", import.meta.url), "utf8"));
const factionData = JSON.parse(fs.readFileSync(new URL("../data/factions.json", import.meta.url), "utf8"));
const identityLayers = JSON.parse(fs.readFileSync(new URL("../data/identity-layers.json", import.meta.url), "utf8"));
const runtimeSource = fs.readFileSync(new URL("../assets/js/archscry/index.js", import.meta.url), "utf8");
const liveIdentityKeys = new Set([
  ...Object.keys(factionData.factions || {}),
  ...Object.keys(identityLayers.expressions || {}),
]);

assert.match(
  runtimeSource,
  /import \{ validateGateB1RuntimeModel \} from "\.\/gate-b1-runtime-contract\.js";/,
  "Archscry must import the shared Gate B1 runtime validator"
);
assert.match(
  runtimeSource,
  /validateGateB1RuntimeModel\(APP_STATE\.placementModel, liveFactionKeys\);/,
  "Archscry startup must call the shared Gate B1 runtime validator"
);

const summary = validateGateB1RuntimeModel(model, liveIdentityKeys);
assert.deepEqual(summary, {
  constructs: 16,
  questions: 36,
  answers: 124,
  identities: 37,
  confusionPairs: 123,
  gateQuestions: 4,
  hallQuestions: 13,
  crucibleQuestions: 19,
});

const expectedGateIds = [
  "b1.gate.initiative.v1",
  "b1.gate.visibility.v1",
  "b1.gate.disruption.v1",
  "b1.gate.tempo.v1",
];
let state = createInitialAdaptiveState(model);
for (const expectedQuestionId of expectedGateIds) {
  const question = selectNextAdaptiveQuestion(state, model);
  assert.equal(question?.id, expectedQuestionId, `Expected fixed Gate question ${expectedQuestionId}`);
  state = applyAdaptiveAnswer({ state, model, question, answer: question.answers[0], answerIndex: 0 });
}
assert.equal(state.stage_counts.gate, 4);
assert.equal(state.answered_question_ids.length, 4);
assert.notEqual(selectNextAdaptiveQuestion(state, model)?.stage, "gate", "Question 5 must leave the fixed Gate sequence");

const incompleteModel = structuredClone(model);
incompleteModel.question_bank.crucible.at(-1).answers.pop();
assert.throws(
  () => validateGateB1RuntimeModel(incompleteModel, liveIdentityKeys),
  (error) =>
    error?.name === "GateB1RuntimeContractError" &&
    error?.failedPredicate === "metadata_counts_match_structure" &&
    error?.message === GATE_B1_RUNTIME_ERROR_MESSAGE,
  "A genuinely incomplete generated model must retain the safe startup failure"
);

console.log(
  "PASS Gate B1 runtime integration: completed model accepted, fixed C01-C04 Gate preserved, incomplete model rejected."
);

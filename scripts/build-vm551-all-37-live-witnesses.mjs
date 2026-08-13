import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  createInitialState,
  finalizeReading,
  getRefinementPath,
  observe,
  selectNextQuestion,
} from "../assets/js/gate-b1-placement-engine.js";
import { buildReadingOmens } from "../assets/js/commander-dossier.js";
import { withGateAPublicState } from "../assets/js/archscry-presentation.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = path.join(ROOT, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json");
const CHECK = process.argv.includes("--check");
const model = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "gate-b1-placement-model.json"), "utf8"));
const factions = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "factions.json"), "utf8")).factions;
const reachability = JSON.parse(fs.readFileSync(path.join(ROOT, "docs", "reports", "vm551-gate-b1-placement-engine", "identity-reachability.json"), "utf8"));
const questions = Object.values(model.question_bank).flatMap((rows) => Array.isArray(rows) ? rows : []);
const questionById = new Map(questions.map((question) => [question.id, question]));
const namedStates = new Set(["primary", "close", "tied"]);

function replayWitness(row) {
  let state = createInitialState(model);
  let refinementCount = 0;
  const usedSelections = [];
  const mainSelections = row.strongest_approved_evidence_path.filter((selection) => !selection.refinement);
  const refinementSelections = row.strongest_approved_evidence_path.filter((selection) => selection.refinement);
  for (const selection of mainSelections) {
    const question = selectNextQuestion(state, model);
    assert.equal(question?.id, selection.question_id, `${row.identity} live route drift`);
    const answerIndex = question.answers.findIndex((answer) => answer.id === selection.answer_id);
    assert.ok(answerIndex >= 0, `${row.identity} witness names a missing answer ${selection.answer_id}`);
    state = observe({ state, model, question, answer: question.answers[answerIndex], answerIndex });
    usedSelections.push(selection);
  }

  const currentPublicResult = () => withGateAPublicState({
    result: finalizeReading({ state, model, factions }),
    placementModel: model,
    factions,
  });
  const expectedNamed = row.identity !== "YORE";
  let result = currentPublicResult();
  for (const selection of expectedNamed ? refinementSelections : []) {
    if (expectedNamed && result.faction === row.identity && namedStates.has(result.result_state)) break;
    let question;
    const refinement = getRefinementPath(state, model);
    assert.equal(refinement.kind, "ask_targeted_question", `${row.identity} expected an approved targeted refinement`);
    assert.equal(refinement.question_id, selection.question_id, `${row.identity} refinement route drift`);
    question = questionById.get(refinement.question_id);
    refinementCount += 1;
    const answerIndex = question.answers.findIndex((answer) => answer.id === selection.answer_id);
    assert.ok(answerIndex >= 0, `${row.identity} witness names a missing answer ${selection.answer_id}`);
    state = observe({ state, model, question, answer: question.answers[answerIndex], answerIndex });
    usedSelections.push(selection);
    result = currentPublicResult();
  }
  if (expectedNamed) {
    assert.equal(result.faction, row.identity, `${row.identity} witness ended at ${result.faction || result.result_state}`);
    assert.ok(namedStates.has(result.result_state), `${row.identity} witness ended in non-named ${result.result_state}`);
  } else {
    assert.ok(!namedStates.has(result.result_state) || result.faction !== "YORE", "Yore must retain its intentional non-clean behavioral boundary");
  }
  const observations = expectedNamed ? buildReadingOmens({
    evidenceTrail: result.evidence_trail,
    factions,
    activeFactionKey: row.identity,
    limit: 3,
  }) : [];
  return {
    identity_key: row.identity,
    identity_name: row.identity_name,
    expected_public_contract: expectedNamed ? "NAMED_DOSSIER" : "INTENTIONAL_BOUNDED_STATE",
    expected_state: result.result_state,
    result_faction: result.faction || null,
    main_question_count: mainSelections.length,
    refinement_question_count: refinementCount,
    why_this_fit_observation_count: observations.length,
    why_this_fit_dependencies: observations.map((observation) => observation.dependencyGroup),
    selections: usedSelections,
    result,
  };
}

const witnesses = reachability.rows.map(replayWitness);
assert.equal(witnesses.length, 37);
assert.equal(witnesses.filter((row) => row.expected_public_contract === "NAMED_DOSSIER").length, 36);
assert.equal(witnesses.filter((row) => row.identity_key === "YORE" && row.expected_public_contract === "INTENTIONAL_BOUNDED_STATE").length, 1);
const output = `${JSON.stringify({
  schema_version: "1.0.0",
  generated_from_model_version: model._meta.model_version,
  authority: "Current-engine live route plus existing approved optional refinement; authored preview routes are excluded.",
  named_witnesses: 36,
  intentional_bounded_witnesses: 1,
  rows: witnesses,
}, null, 2)}\n`;

if (CHECK) {
  assert.equal(fs.readFileSync(OUTPUT, "utf8").replace(/\r\n/g, "\n"), output, "stale all-37 live witness artifact");
} else {
  fs.writeFileSync(OUTPUT, output);
}

console.log(JSON.stringify({
  status: "PASS",
  identities: witnesses.length,
  named: witnesses.filter((row) => namedStates.has(row.expected_state) && row.result_faction === row.identity_key).length,
  bounded: witnesses.filter((row) => row.identity_key === "YORE").length,
  refinement_witnesses: witnesses.filter((row) => row.refinement_question_count > 0).length,
  why_this_fit_three: witnesses.filter((row) => row.why_this_fit_observation_count >= 3).length,
  why_this_fit_two: witnesses.filter((row) => row.why_this_fit_observation_count === 2).length,
}, null, 2));

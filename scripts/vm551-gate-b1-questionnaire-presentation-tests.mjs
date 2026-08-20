import assert from "node:assert/strict";
import fs from "node:fs";
import {
  buildAdaptiveProgress,
  helperTextForQuestion,
} from "../assets/js/archscry/archscry-question-presentation.js";

const MODEL = JSON.parse(fs.readFileSync(new URL("../data/gate-b1-placement-model.json", import.meta.url), "utf8"));
const CSS = fs.readFileSync(new URL("../assets/css/archscry.css", import.meta.url), "utf8");
const HTML = fs.readFileSync(new URL("../archscry/index.html", import.meta.url), "utf8");
const CONTROLLER = fs.readFileSync(new URL("../assets/js/archscry/index.js", import.meta.url), "utf8");
const QUESTIONS = Object.values(MODEL.question_bank)
  .flat()
  .filter((question) => question?.id);
const Q3 = QUESTIONS.find((question) => question.id === "b1.gate.disruption.v1");
const NO_HELPER = QUESTIONS.find((question) => question.id === "b1.gate.tempo.v1");
const ORDINARY_HELPER = QUESTIONS.find((question) => question.id === "b1.gate.initiative.v1");

assert(Q3);
assert.equal(helperTextForQuestion(Q3), "A graveyard is a player's discard pile.");
assert(!helperTextForQuestion(Q3).toLowerCase().includes("board wipe"));
assert(!helperTextForQuestion(Q3).toLowerCase().includes("board means"));
assert.equal(helperTextForQuestion(NO_HELPER), "");
assert.equal(helperTextForQuestion(ORDINARY_HELPER), "", "Ordinary threat wording must not create filler help");

assert(!CSS.includes("max-width: 28ch"), "Stale half-card heading constraint must be absent");
assert(CSS.includes("max-width: min(100%, 68ch)"));
assert(CSS.includes('.answer-grid[data-answer-count="3"]'));
assert(CSS.includes("grid-template-columns: repeat(3, minmax(0, 1fr))"));
assert(CSS.includes("grid-column:1 / -1"));
assert(CSS.includes('.answer-grid[data-answer-count]{grid-template-columns:1fr}'));
assert(HTML.includes('id="question-help" hidden'));
assert(HTML.includes('data-action="continue-quick-transition"'));
assert(CONTROLLER.includes("answerGrid.dataset.answerCount = String(question.answers.length)"));
assert(CONTROLLER.includes('questionHelp.hidden = !helperText'));
assert(CONTROLLER.includes("Continue into the Hall"));
assert(CONTROLLER.includes("Open my reading"));

const progress = buildAdaptiveProgress({
  stageLabel: "Gate",
  stageQuestionNumber: 4,
  stageMaximum: 4,
  questionNumber: 4,
  minimumQuestions: 6,
  maximumQuestions: 8,
});
assert.equal(progress.label, "Gate · 4 of 4 · Reading moment 4 of 6–8");
assert.equal(progress.percentage, 50);

const threeAnswer = QUESTIONS.find((question) => question.answers?.length === 3);
const fourAnswer = QUESTIONS.find((question) => question.answers?.length === 4);
assert(threeAnswer, "Instrument requires at least one three-answer presentation case");
assert(fourAnswer, "Instrument requires at least one four-answer presentation case");

console.log("PASS Gate B1 questionnaire presentation: responsive 3/4-answer contracts, selective source-derived help, Q3 graveyard-only help, user-paced transitions, and truthful 6–8 progress.");

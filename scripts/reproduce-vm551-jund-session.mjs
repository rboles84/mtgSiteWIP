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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MODEL = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "gate-b1-placement-model.json"), "utf8"));
const FACTIONS = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "factions.json"), "utf8")).factions;

function makeRng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function runMain(seed) {
  const rng = makeRng(seed);
  let state = createInitialState(MODEL);
  const selections = [];
  for (let guard = 0; guard < 8; guard += 1) {
    const question = selectNextQuestion(state, MODEL);
    if (!question) break;
    const answerIndex = Math.floor(rng() * question.answers.length);
    const answer = question.answers[answerIndex];
    selections.push({ question_id: question.id, answer_id: answer.id });
    state = observe({ state, model: MODEL, question, answer, answerIndex });
  }
  return { state, selections };
}

function resultFor(state) {
  return finalizeReading({ state, model: MODEL, factions: FACTIONS });
}

function publicKeys(result) {
  return [...new Set((result.top_matches || []).map((match) => match.faction).filter(Boolean))];
}

function hasDirections(result, expected) {
  const actual = new Set(publicKeys(result));
  return expected.every((identity) => actual.has(identity));
}

const seed = 5083;
const main = runMain(seed);
const initial = resultFor(main.state);
const refinement = getRefinementPath(main.state, MODEL);

if (initial.result_state !== "mixed" || !hasDirections(initial, ["W", "RG", "JUND"])) {
  throw new Error("The frozen Jund witness no longer reproduces the White / Gruul / Jund mixed reading.");
}
if (refinement.kind !== "no_approved_discriminator") {
  throw new Error(`The frozen Jund reading exposed an unsafe or misleading refinement: ${JSON.stringify(refinement)}`);
}
if (!hasDirections(initial, refinement.remaining_candidates || [])) {
  throw new Error(`The bounded Jund refinement frontier drifted outside its displayed directions: ${JSON.stringify(refinement)}`);
}

console.log(JSON.stringify({
  authority: "Real Gate B1 engine evidence ledger; no authored preview route.",
  owner_session_id: "vm551-gate-b1-placement-engine-v1-quick-jund-4",
  seed,
  main_selections: main.selections,
  initial: {
    state: initial.result_state,
    directions: publicKeys(initial),
    evidence_ledger: main.state.evidence_ledger,
  },
  refinement: {
    ...refinement,
    available_answers: [],
  },
  superseded_behavior: {
    first_generic_hall_question: "b1.hall.sacrifice.v1",
    second_generic_hall_question: "b1.hall.information-to-plan.v1",
    reason: "The old post-result flow selected generic Hall questions and required multiple interactions before returning to the result.",
  },
}, null, 2));

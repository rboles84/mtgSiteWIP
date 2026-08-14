import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import {
  finalizeReading,
  getRefinementPath,
  observe,
  replaySelections,
  runJourney,
} from "../assets/js/gate-b1-placement-engine.js";
import { withGateAPublicState } from "../assets/js/archscry-presentation.js";

const root = process.cwd();
const check = process.argv.includes("--check");
const outputPath = path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "visual-review-manifest.json");
const model = JSON.parse(fs.readFileSync(path.join(root, "data", "gate-b1-placement-model.json"), "utf8"));
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const witnesses = JSON.parse(fs.readFileSync(path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"), "utf8")).rows;

function ledgerHash(result = {}) {
  return createHash("sha256").update(JSON.stringify(result.evidence_ledger || result.evidence_trail || [])).digest("hex");
}

function compactCase(row) {
  return {
    case_id: row.case_id,
    review_label: row.review_label,
    identity_key: row.identity_key,
    identity_name: row.identity_name,
    expected_public_contract: row.expected_public_contract,
    expected_state: row.expected_state,
    result_faction: row.result_faction || null,
    expected_direction_keys: (row.result?.top_matches || []).map((match) => match.faction).filter(Boolean),
    focus_identity_keys: row.focus_identity_keys || [],
    selections: row.selections.map(({ question_id, answer_id, refinement }) => ({ question_id, answer_id, ...(refinement ? { refinement: true } : {}) })),
    evidence_ledger_entries: (row.result?.evidence_ledger || row.result?.evidence_trail || []).length,
    evidence_ledger_sha256: ledgerHash(row.result),
    witness_authority: row.witness_authority,
    seed: row.seed || null,
    preload_saved_result: row.preload_saved_result === true,
    verify_return_to_previous_reading: row.verify_return_to_previous_reading === true,
  };
}

function rng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function generatedStateCase(state, caseId, label) {
  for (let seed = 1; seed <= 50000; seed += 1) {
    const random = rng(seed * 104729);
    const journey = runJourney({ model, factions, strategy: (question) => Math.floor(random() * question.answers.length) });
    if (journey.result.result_state !== state) continue;
    return {
      case_id: caseId,
      review_label: label,
      identity_key: journey.result.faction || state.toUpperCase(),
      identity_name: journey.result.faction_name || label,
      expected_public_contract: ["primary", "close", "tied"].includes(state) ? "NAMED_DOSSIER" : "BOUNDED_STATE",
      expected_state: state,
      result_faction: journey.result.faction || null,
      selections: journey.selections.map(({ question_id, answer_id }) => ({ question_id, answer_id })),
      result: journey.result,
      witness_authority: "Deterministic current-engine journey; no authored preview route.",
      seed,
    };
  }
  throw new Error(`Could not generate a deterministic ${state} visual-review case`);
}

const byIdentity = new Map(witnesses.map((row) => [row.identity_key, row]));
const identityCases = witnesses.map((row) => ({
  ...row,
  case_id: `identity-${row.identity_key.toLowerCase()}`,
  review_label: row.identity_key === "YORE" ? "Yore intentional bounded reading" : `${row.identity_name} named dossier`,
  witness_authority: "Certified current-engine all-37 witness; no authored preview route.",
}));
const frozenJundSelections = [
  ["b1.gate.initiative.v1", "b1.gate.initiative.v1.advance"],
  ["b1.gate.visibility.v1", "b1.gate.visibility.v1.held"],
  ["b1.gate.disruption.v1", "b1.gate.disruption.v1.protect"],
  ["b1.gate.tempo.v1", "b1.gate.tempo.v1.depends"],
  ["b1.hall.commitment.v1", "b1.hall.commitment.v1.procedure"],
  ["b1.hall.interaction-window.v1", "b1.hall.interaction-window.v1.before"],
  ["b1.hall.pressure.v1", "b1.hall.pressure.v1.combat"],
  ["b1.crucible.disruption-boundary.v1", "b1.crucible.disruption-boundary.v1.convert"],
];
const frozenJundState = replaySelections(model, frozenJundSelections.map(([question_id, answer_id]) => ({ question_id, answer_id })));
const frozenJundResult = finalizeReading({ state: frozenJundState, model, factions });
assert.equal(frozenJundResult.result_state, "mixed");
assert.deepEqual(frozenJundResult.top_matches.map((match) => match.faction), ["W", "JUND", "RG"]);
const jundMixed = {
  case_id: "jund-mixed",
  review_label: "Jund / White / Gruul mixed directions",
  identity_key: "JUND_MIXED",
  identity_name: "Jund / White / Gruul mixed directions",
  expected_public_contract: "BOUNDED_STATE",
  expected_state: "mixed",
  result_faction: null,
  selections: frozenJundSelections.map(([question_id, answer_id]) => ({ question_id, answer_id })),
  result: frozenJundResult,
  seed: 5083,
  witness_authority: "Frozen owner Jund evidence ledger vm551-gate-b1-placement-engine-v1-quick-jund-4.",
};

const frozenGreenWitherbloomSelections = [
  ["b1.gate.initiative.v1", "b1.gate.initiative.v1.advance"],
  ["b1.gate.visibility.v1", "b1.gate.visibility.v1.board"],
  ["b1.gate.disruption.v1", "b1.gate.disruption.v1.recover"],
  ["b1.gate.tempo.v1", "b1.gate.tempo.v1.depends"],
  ["b1.hall.pressure.v1", "b1.hall.pressure.v1.abundance"],
  ["b1.hall.setup.v1", "b1.hall.setup.v1.staged"],
  ["b1.hall.commitment.v1", "b1.hall.commitment.v1.reopen"],
  ["b1.crucible.disruption-boundary.v1", "b1.crucible.disruption-boundary.v1.adapt"],
  ["b1.crucible.ug.v1", "b1.crucible.ug.v1.neither"],
  ["b1.crucible.bg.v1", "b1.crucible.bg.v1.exchange"],
];
const frozenGreenWitherbloomState = replaySelections(model, frozenGreenWitherbloomSelections.map(([question_id, answer_id]) => ({ question_id, answer_id })));
const frozenGreenWitherbloomResult = withGateAPublicState({
  result: finalizeReading({ state: frozenGreenWitherbloomState, model, factions }),
  placementModel: model,
  factions,
});
assert.equal(frozenGreenWitherbloomResult.result_state, "tied");
assert.deepEqual(frozenGreenWitherbloomResult.top_matches.map((match) => match.faction), ["G", "WITHERBLOOM"]);
assert.equal(getRefinementPath(frozenGreenWitherbloomState, model).kind, "no_approved_discriminator");
const greenWitherbloomTied = {
  case_id: "green-witherbloom-tied",
  review_label: "Preserved Green / Witherbloom tied reading",
  identity_key: "G",
  identity_name: "Green",
  expected_public_contract: "NAMED_DOSSIER",
  expected_state: "tied",
  result_faction: "G",
  selections: frozenGreenWitherbloomSelections.map(([question_id, answer_id]) => ({ question_id, answer_id })),
  result: frozenGreenWitherbloomResult,
  focus_identity_keys: ["G", "WITHERBLOOM"],
  preload_saved_result: true,
  witness_authority: "Preserved real owner evidence ledger from the accepted pre-remediation session; render-only regression, not current routing reachability proof.",
};

const boundedYore = byIdentity.get("YORE");
const boundedYoreState = replaySelections(model, boundedYore.selections);
const boundedYoreRefinement = getRefinementPath(boundedYoreState, model);
assert.equal(boundedYoreRefinement.kind, "ask_targeted_question");
const boundedYoreQuestion = Object.values(model.question_bank).flatMap((rows) => Array.isArray(rows) ? rows : [])
  .find((question) => question.id === boundedYoreRefinement.question_id);
const boundedYoreAnswerIndex = boundedYoreQuestion.answers.findIndex((answer) => answer.id.endsWith(".neither"));
assert.ok(boundedYoreAnswerIndex >= 0);
const boundedYoreRefinedState = observe({
  state: boundedYoreState,
  model,
  question: boundedYoreQuestion,
  answer: boundedYoreQuestion.answers[boundedYoreAnswerIndex],
  answerIndex: boundedYoreAnswerIndex,
});
const boundedYoreRefinedResult = withGateAPublicState({
  result: finalizeReading({ state: boundedYoreRefinedState, model, factions }),
  placementModel: model,
  factions,
});
const reversibleRefinement = {
  ...boundedYore,
  case_id: "reversible-refinement",
  review_label: "One-step bounded refinement return",
  selections: [
    ...boundedYore.selections,
    { question_id: boundedYoreQuestion.id, answer_id: boundedYoreQuestion.answers[boundedYoreAnswerIndex].id, refinement: true },
  ],
  result: boundedYoreRefinedResult,
  expected_state: boundedYoreRefinedResult.result_state,
  verify_return_to_previous_reading: true,
  witness_authority: "Certified current-engine Yore bounded witness plus one approved optional targeted observation.",
};

const cleanPrimary = witnesses.find((row) => row.expected_state === "primary" && row.expected_public_contract === "NAMED_DOSSIER");
const closeOrTied = witnesses.find((row) => ["close", "tied"].includes(row.expected_state)) || generatedStateCase("tied", "close-or-tied", "Qualified co-leader reading");
const featured = [
  { ...cleanPrimary, case_id: "clean-primary", review_label: `Clean primary: ${cleanPrimary.identity_name}` },
  { ...closeOrTied, case_id: "close-or-tied", review_label: `Close/co-leader: ${closeOrTied.identity_name}`, focus_identity_keys: (closeOrTied.result?.top_matches || []).map((match) => match.faction).filter(Boolean) },
  jundMixed,
  greenWitherbloomTied,
  { ...byIdentity.get("WITHERBLOOM"), case_id: "witherbloom", review_label: "Witherbloom named dossier" },
  generatedStateCase("insufficient", "insufficient", "Insufficient reading with recovery"),
  generatedStateCase("contradictory", "conflicting", "Conflicting reading with recovery"),
  { ...byIdentity.get("YORE"), case_id: "bounded-yore", review_label: "Yore intentional bounded reading" },
  { ...byIdentity.get("COLORLESS"), case_id: "colorless", review_label: "Colorless named dossier" },
  { ...byIdentity.get("WUBRG"), case_id: "wubrg", review_label: "Five-Color named dossier" },
  reversibleRefinement,
];

assert.equal(identityCases.length, 37);
assert.equal(identityCases.filter((row) => row.expected_public_contract === "NAMED_DOSSIER").length, 36);
assert.ok(featured.every((row) => row?.selections?.length));
const cases = [...identityCases, ...featured].map(compactCase);
const output = `${JSON.stringify({
  schema_version: "1.0.0",
  model_version: model._meta.model_version,
  authority: "Real current-engine witness evidence only; authored preview routes are excluded.",
  review_command: "npm run review:vm551 -- --case=<case-id>",
  featured_case_ids: featured.map((row) => row.case_id),
  cases,
}, null, 2)}\n`;

if (check) assert.equal(fs.readFileSync(outputPath, "utf8").replace(/\r\n/g, "\n"), output, "stale visual-review manifest");
else fs.writeFileSync(outputPath, output);

console.log(JSON.stringify({ status: "PASS", identity_cases: identityCases.length, featured_cases: featured.length, total_cases: cases.length }, null, 2));

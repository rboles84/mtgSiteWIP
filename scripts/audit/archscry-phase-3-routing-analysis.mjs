import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  createInitialState,
  evaluateStopping,
  finalizeReading,
  getNamingQualification,
  getRoutingTrace,
  observe,
  rankCandidates,
  selectNextQuestion,
} from "../../assets/js/archscry/gate-b1-placement-engine.js";
import { withGateAPublicState } from "../../assets/js/archscry/archscry-presentation.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODEL_PATH = path.join(ROOT, "data/gate-b1-placement-model.json");
const FACTIONS_PATH = path.join(ROOT, "data/factions.json");
const WITNESSES_PATH = path.join(ROOT, "docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json");
const OUTPUT_PATH = path.join(ROOT, "docs/research/archscry-phase-3-routing-baseline.json");
const CHECK = process.argv.includes("--check");
const EPSILON = 1e-9;

const model = JSON.parse(fs.readFileSync(MODEL_PATH, "utf8"));
const factions = JSON.parse(fs.readFileSync(FACTIONS_PATH, "utf8")).factions;
const witnesses = JSON.parse(fs.readFileSync(WITNESSES_PATH, "utf8"));

function questionLookup() {
  return new Map([
    ...(model.question_bank?.gate || []),
    ...(model.question_bank?.hall || []),
    ...(model.question_bank?.crucible || []),
    ...(model.question_bank?.lens || []),
  ].map((question) => [question.id, question]));
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function histogram(values) {
  return Object.fromEntries(
    [...new Set(values)].sort((left, right) => left - right).map((value) => [value, values.filter((entry) => entry === value).length])
  );
}

function compactResult(result) {
  return {
    result_state: result.result_state,
    public_names: (result.top_matches || []).map((match) => match.faction),
    primary: result.faction,
    cardinality: (result.top_matches || []).length,
  };
}

function terminalSignature(state) {
  const raw = finalizeReading({ state, model, factions });
  const result = withGateAPublicState({ result: raw, placementModel: model, factions });
  return `${result.result_state}|${(result.top_matches || []).map((match) => match.faction).join(",")}`;
}

function reachableTerminalSignatures(origin, forcedQuestion) {
  const signatures = new Set();
  function walk(state) {
    if (evaluateStopping(state, model).stop) {
      signatures.add(terminalSignature(state));
      return;
    }
    const question = selectNextQuestion(state, model);
    if (!question) {
      signatures.add(terminalSignature(state));
      return;
    }
    for (let answerIndex = 0; answerIndex < question.answers.length; answerIndex += 1) {
      walk(observe({ state, model, question, answer: question.answers[answerIndex], answerIndex }));
    }
  }
  for (let answerIndex = 0; answerIndex < forcedQuestion.answers.length; answerIndex += 1) {
    walk(observe({
      state: origin,
      model,
      question: forcedQuestion,
      answer: forcedQuestion.answers[answerIndex],
      answerIndex,
    }));
  }
  return [...signatures].sort();
}

const questions = questionLookup();
const rows = [];
const exactUtilityTies = [];
const floorCandidateCounts = [];
const floorQualifiedCounts = [];

for (const witness of witnesses.rows || []) {
  const mainCount = Number(witness.main_question_count || witness.selections?.length || 0);
  const mainSelections = (witness.selections || []).slice(0, mainCount);
  let state = createInitialState(model);
  let routeMatchesProduction = true;
  let floor = null;

  for (let index = 0; index < mainSelections.length; index += 1) {
    const selection = mainSelections[index];
    const selected = selectNextQuestion(state, model);
    if (selected?.id !== selection.question_id) routeMatchesProduction = false;

    if (index >= 4) {
      const trace = getRoutingTrace(state, model);
      const selectedStatus = trace.questions.find((entry) => entry.question_id === trace.selected_question_id);
      const peers = trace.questions.filter((entry) =>
        entry.eligible &&
        entry.stage === selectedStatus?.stage &&
        Math.abs(entry.utility - trace.selected_utility) <= EPSILON
      );
      if (peers.length > 1) {
        const opportunityOutcomes = Object.fromEntries(peers.map((entry) => [
          entry.question_id,
          reachableTerminalSignatures(state, questions.get(entry.question_id)),
        ]));
        const outcomeSets = Object.values(opportunityOutcomes).map((outcomes) => JSON.stringify(outcomes));
        exactUtilityTies.push({
          identity_key: witness.identity_key,
          before_question_number: index + 1,
          selected_question_id: trace.selected_question_id,
          utility: trace.selected_utility,
          opportunity_ids: peers.map((entry) => entry.question_id).sort(),
          candidate_frontier: trace.candidate_frontier,
          reachable_terminal_signatures_by_opportunity: opportunityOutcomes,
          branch_outcome_sets_equal: new Set(outcomeSets).size === 1,
        });
      }
    }

    const question = questions.get(selection.question_id);
    const answerIndex = question?.answers?.findIndex((answer) => answer.id === selection.answer_id) ?? -1;
    if (!question || answerIndex < 0) throw new Error(`Unresolvable witness selection ${selection.question_id}/${selection.answer_id}`);
    state = observe({ state, model, question, answer: question.answers[answerIndex], answerIndex });

    if (index === 3) {
      const ranked = rankCandidates(state, model);
      const routing = getRoutingTrace(state, model, ranked);
      const nonNeutralConstructs = [...new Set(
        state.evidence_ledger.filter((entry) => !entry.neutral).map((entry) => entry.construct)
      )].sort();
      const qualified = ranked.filter((candidate) => getNamingQualification(candidate, model).qualified);
      floor = {
        observed_constructs: ["C01", "C02", "C03", "C04"],
        directional_constructs: nonNeutralConstructs,
        candidate_frontier_count: routing.candidate_frontier.length,
        candidate_frontier: routing.candidate_frontier,
        qualified_count: qualified.length,
        selected_next_question_id: routing.selected_question_id,
        selected_next_utility: routing.selected_utility,
      };
      floorCandidateCounts.push(floor.candidate_frontier_count);
      floorQualifiedCounts.push(floor.qualified_count);
    }
  }

  const rawResult = witness.result || null;
  const publicResult = rawResult
    ? withGateAPublicState({ result: rawResult, placementModel: model, factions })
    : null;
  const stopping = evaluateStopping(state, model);
  rows.push({
    identity_key: witness.identity_key,
    identity_name: witness.identity_name,
    expected_public_contract: witness.expected_public_contract,
    route_matches_current_selection: routeMatchesProduction,
    fixed_questions: Math.min(4, mainCount),
    adaptive_questions: Math.max(0, mainCount - 4),
    total_questions: mainCount,
    refinement_questions: Number(witness.refinement_question_count || 0),
    floor,
    terminal_stopping: stopping,
    public_result: publicResult ? compactResult(publicResult) : null,
  });
}

const totals = rows.map((row) => row.total_questions);
const adaptive = rows.map((row) => row.adaptive_questions);
const resultStateDistribution = {};
for (const row of rows) {
  const state = row.public_result?.result_state || "missing";
  resultStateDistribution[state] = (resultStateDistribution[state] || 0) + 1;
}
const floorDirectionalCounts = rows.map((row) => row.floor.directional_constructs.length);

const report = {
  schema_version: "1.0.0",
  purpose: "Read-only Archscry Phase 3 current-routing baseline over the accepted deterministic all-37 witness authority.",
  source_paths: {
    model: path.relative(ROOT, MODEL_PATH).replaceAll("\\", "/"),
    factions: path.relative(ROOT, FACTIONS_PATH).replaceAll("\\", "/"),
    witnesses: path.relative(ROOT, WITNESSES_PATH).replaceAll("\\", "/"),
  },
  versions: {
    model_version: model._meta?.model_version,
    instrument_version: model._meta?.instrument_version,
    mapping_version: model._meta?.mapping_version,
    result_version: model._meta?.result_version,
  },
  population: rows.length,
  production_route_match_count: rows.filter((row) => row.route_matches_current_selection).length,
  question_counts: {
    fixed: 4,
    total_minimum: Math.min(...totals),
    total_median: median(totals),
    total_maximum: Math.max(...totals),
    total_distribution: histogram(totals),
    adaptive_minimum: Math.min(...adaptive),
    adaptive_median: median(adaptive),
    adaptive_maximum: Math.max(...adaptive),
    adaptive_distribution: histogram(adaptive),
  },
  result_state_distribution: resultStateDistribution,
  c01_c04_floor: {
    candidate_frontier_minimum: Math.min(...floorCandidateCounts),
    candidate_frontier_median: median(floorCandidateCounts),
    candidate_frontier_maximum: Math.max(...floorCandidateCounts),
    candidate_frontier_distribution: histogram(floorCandidateCounts),
    qualified_identity_minimum: Math.min(...floorQualifiedCounts),
    qualified_identity_median: median(floorQualifiedCounts),
    qualified_identity_maximum: Math.max(...floorQualifiedCounts),
    qualified_identity_distribution: histogram(floorQualifiedCounts),
    directional_construct_minimum: Math.min(...floorDirectionalCounts),
    directional_construct_median: median(floorDirectionalCounts),
    directional_construct_maximum: Math.max(...floorDirectionalCounts),
    directional_construct_distribution: histogram(floorDirectionalCounts),
  },
  exact_same_stage_utility_ties: {
    count: exactUtilityTies.length,
    witness_count: new Set(exactUtilityTies.map((entry) => entry.identity_key)).size,
    branch_equivalent_count: exactUtilityTies.filter((entry) => entry.branch_outcome_sets_equal).length,
    note: "Equal scalar utility is observable, but the current engine does not certify branch-equivalent evidence exposure, stopping, or terminal results.",
    opportunities: exactUtilityTies,
  },
  rows,
};

const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (CHECK) {
  const current = fs.readFileSync(OUTPUT_PATH, "utf8");
  if (current !== serialized) throw new Error(`Phase 3 routing baseline is stale: ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`PASS Archscry Phase 3 routing baseline: ${rows.length} witnesses, ${totals.length} deterministic routes.`);
} else {
  fs.writeFileSync(OUTPUT_PATH, serialized);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)} from ${rows.length} deterministic witnesses.`);
}

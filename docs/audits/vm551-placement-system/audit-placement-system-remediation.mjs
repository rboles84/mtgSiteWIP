import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  rankAdaptiveFactions,
  runAdaptiveGoldenPath,
  runAdaptiveReadingWithStrategy,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
} from "../../../assets/js/adaptive-placement.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const hashFile = (relativePath) => crypto.createHash("sha256").update(fs.readFileSync(path.join(repoRoot, relativePath))).digest("hex");
const placementModel = readJson("data/placement-model.json");
const factions = readJson("data/factions.json").factions;
const existingSummary = readJson("docs/audits/vm551-placement-system/analysis-summary.json");
const copyCorpus = readJson("docs/audits/vm551-placement-system/copy-comparison-corpus.json");
const copyByIdentity = new Map(copyCorpus.map((entry) => [entry.identity, entry]));
const factionKeys = Object.keys(placementModel.factions).sort();
const stages = ["gate", "hall", "crucible"];
const questions = stages.flatMap((stage) => (placementModel.question_bank?.[stage] || []).map((question) => ({ ...question, stage })));
const questionById = new Map(questions.map((question) => [question.id, question]));

function round(value, digits = 6) {
  return Number(Number(value || 0).toFixed(digits));
}

function csvCell(value) {
  const text = Array.isArray(value) || (value && typeof value === "object") ? JSON.stringify(value) : String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filename, rows, columns = Object.keys(rows[0] || {})) {
  const lines = [columns.join(",")];
  for (const row of rows) lines.push(columns.map((column) => csvCell(row[column])).join(","));
  fs.writeFileSync(path.join(scriptDir, filename), `${lines.join("\n")}\n`, "utf8");
}

function writeJson(filename, value) {
  fs.writeFileSync(path.join(scriptDir, filename), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { cell += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { row.push(cell); cell = ""; }
    else if (character === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function tokens(value) {
  return new Set(String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((token) => token.length > 2));
}

function overlap(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  const union = new Set([...a, ...b]);
  return union.size ? [...a].filter((token) => b.has(token)).length / union.size : 0;
}

function answerId(question, answer, index) {
  return answer.id || `${question.id}#answer-${index + 1}`;
}

function family(key) {
  const type = factions[key]?.institution_type || "unknown";
  if (["guild", "college"].includes(type)) return `${type}:${(factions[key]?.colors || []).slice().sort().join("")}`;
  return type;
}

function dimensions(text) {
  const value = String(text || "").toLowerCase();
  const result = [];
  if (/deck|card|commander|combat|spell|mana|graveyard|board|turn|attack|tutor|combo/.test(value)) result.push("gameplay-or-deck-behavior");
  if (/table|group|community|people|belong|duty|social|trust|protect|public|shared/.test(value)) result.push("social-behavior");
  if (/want|desire|fear|feel|appetite|agency|ambition|motivat|satisf|self/.test(value)) result.push("psychographic-or-motivational-inference-risk");
  if (/beaut|aesthetic|spectacle|art|style|voice|story|symbol|myth|ritual|theme/.test(value)) result.push("aesthetic-or-narrative-preference");
  if (/order|freedom|growth|knowledge|principle|meaning|oath|truth|nature|law|covenant/.test(value)) result.push("philosophical-preference");
  if (/history|relic|archive|guild|college|clan|faction|lore|ancestor/.test(value)) result.push("lore-or-setting-proxy");
  return result.length ? result : ["abstract-scenario-preference"];
}

function construct(text) {
  const value = String(text || "").toLowerCase();
  const groups = [
    ["procedure-and-order", /procedure|law|rule|protocol|precedent|order|structure/],
    ["protection-and-duty", /protect|defend|duty|safety|intervene|accountab/],
    ["community-and-belonging", /community|belong|collective|consensus|harmony|shared/],
    ["knowledge-and-deliberation", /knowledge|learn|study|deliber|information|planning|analysis/],
    ["experiment-and-invention", /experiment|prototype|invent|mechanism|build|discovery/],
    ["expression-and-performance", /expression|performance|art|style|spectacle|voice|emotion/],
    ["agency-and-leverage", /agency|leverage|power|opportunity|self-interest|cost/],
    ["decay-and-renewal", /decay|rot|death|renew|reclaim|graveyard|life/],
    ["growth-and-nature", /growth|nature|instinct|ecosystem|land|organism|adapt/],
    ["speed-and-action", /speed|action|immediate|motion|pressure|ignition|impulse/],
    ["history-and-memory", /history|archive|relic|past|memory|ancestor/],
    ["uncertainty-and-ambiguity", /unknown|unsure|uncertain|mixed|depends|neither/],
  ];
  return groups.find(([, pattern]) => pattern.test(value))?.[0] || "uncontrolled-editorial-construct";
}

function answerEffect(answer) {
  const positive = Object.entries(answer.likelihoods || {}).filter(([, value]) => Number(value) > 0.5);
  const strong = positive.filter(([, value]) => Number(value) >= 0.75);
  const negative = Object.entries(answer.suppresses || {}).filter(([, value]) => Number(value) > 0);
  return { positive, strong, negative };
}

function questionRisk(question) {
  const full = `${question.prompt} ${question.answers.map((answer) => `${answer.title} ${answer.copy || ""} ${answer.signal || ""}`).join(" ")}`;
  const dims = [...new Set(dimensions(full))];
  const pairOverlaps = [];
  for (let i = 0; i < question.answers.length; i += 1) for (let j = i + 1; j < question.answers.length; j += 1) {
    pairOverlaps.push(overlap(`${question.answers[i].title} ${question.answers[i].copy || ""}`, `${question.answers[j].title} ${question.answers[j].copy || ""}`));
  }
  const maxOverlap = Math.max(0, ...pairOverlaps);
  const effectCounts = question.answers.map((answer) => {
    const effect = answerEffect(answer);
    return effect.positive.length + effect.negative.length;
  });
  const effectSpread = Math.max(...effectCounts) - Math.min(...effectCounts);
  const abstraction = question.stage === "gate" || /ground shifts|pressure gathers|signal reaches|oath|shape|truth|honest|world asks|become/i.test(full)
    ? "HIGH"
    : /imagine|feels|meaning|identity|memory|beauty|harmony|self/i.test(full) ? "MEDIUM" : "LOW";
  const relevance = /commander|deck|card|game|table|turn|board|combat|spell|mana/i.test(full) ? "HIGH" : abstraction === "HIGH" ? "LOW" : "MEDIUM";
  const doubleBarreled = /\b(and|but|while|or)\b/i.test(question.prompt) && question.prompt.split(/[?]/)[0].length > 85;
  const mood = /feel|emotion|mood|fear|trust|pressure|honest|grief|anger|desire/i.test(full);
  const lore = /guild|college|clan|faction|ancestor|relic|archive|history|lore|worldmind/i.test(full);
  const broad = question.answers.some((answer) => answerEffect(answer).positive.length > 5);
  const steering = question.faction && question.answers.some((answer) => Number(answer.likelihoods?.[question.faction] || 0) >= 0.9);
  let disposition = "NEEDS-EVIDENCE";
  if (question.stage === "gate") disposition = "REPLACE";
  else if (abstraction === "HIGH" || (lore && relevance !== "HIGH")) disposition = "REPLACE";
  else if (broad || doubleBarreled || maxOverlap >= 0.35 || effectSpread >= 5 || steering) disposition = "RETUNE";
  else if (question.prompt.length > 105 || mood) disposition = "KEEP-BUT-REWORD";
  return { dims, maxOverlap, effectSpread, abstraction, relevance, doubleBarreled, mood, lore, broad, steering, disposition };
}

const questionRows = questions.map((question) => {
  const risk = questionRisk(question);
  const signals = question.answers.map((answer) => answer.signal || answer.title);
  const answerIds = question.answers.map((answer, index) => answer.id || `MISSING:${question.id}#answer-${index + 1}`);
  const groups = [...new Set(signals.map(construct))];
  return {
    question_id: question.id,
    phase: question.stage,
    exact_prompt: question.prompt,
    answer_identifiers_or_missing_status: answerIds,
    intended_construct: question.faction ? `Differentiate ${question.faction}; authored signals: ${signals.join(" | ")}` : `Broad Gate routing; authored signals: ${signals.join(" | ")}`,
    actual_dimensions_tested: risk.dims,
    commander_relevance: risk.relevance,
    wording_clarity: risk.abstraction === "HIGH" ? "LOW" : question.prompt.length > 105 ? "MEDIUM" : "MEDIUM-HIGH",
    abstraction_burden: risk.abstraction,
    double_barreled_status: risk.doubleBarreled ? "YES" : "NO",
    desirability_or_steering_risk: risk.steering || risk.broad ? "HIGH" : risk.mood ? "MEDIUM" : "LOW-MEDIUM",
    lore_dependence: risk.lore ? "PRESENT" : "NOT-EXPLICIT",
    mood_dependence: risk.mood ? "PRESENT" : "NOT-EXPLICIT",
    answer_overlap: round(risk.maxOverlap, 3),
    repeated_signal_group: groups,
    correlated_signal_group: groups.length === 1 ? groups[0] : `overlapping:${groups.join("+")}`,
    uncertainty_representation: "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
    false_positive_risk: risk.broad || risk.abstraction === "HIGH" ? "HIGH" : risk.steering ? "MEDIUM-HIGH" : "MEDIUM",
    false_negative_risk: "HIGH when the player is mixed/uncertain; no non-directional state exists",
    scoring_consistency: risk.effectSpread >= 5 ? `INCONSISTENT effect-count spread ${risk.effectSpread}` : `UNVALIDATED effect-count spread ${risk.effectSpread}`,
    explanation_consistency: "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
    evidence_authority: "No answer-level source or claim reference in the live model; editorial interpretation only",
    final_disposition: risk.disposition,
    remediation_implication: risk.disposition === "REPLACE" ? "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option." : risk.disposition === "RETUNE" ? "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities." : risk.disposition === "KEEP-BUT-REWORD" ? "Preserve only the bounded construct; simplify wording and add uncertainty handling before pilot." : "Establish evidence and falsification contracts before deciding whether to retain.",
  };
});

const answerRows = questions.flatMap((question) => question.answers.map((answer, index) => {
  const effect = answerEffect(answer);
  const full = `${question.prompt} ${answer.title} ${answer.copy || ""} ${answer.signal || ""}`;
  let disposition = "NEEDS-EVIDENCE";
  if (question.stage === "gate") disposition = "REPLACE";
  else if (effect.positive.length > 5 || dimensions(full).length > 2) disposition = "RETUNE";
  else if (/feel|truth|self|meaning|destiny|oath/i.test(full)) disposition = "KEEP-BUT-REWORD";
  return {
    question_id: question.id,
    phase: question.stage,
    answer_id: answer.id || "MISSING",
    audit_answer_id: answerId(question, answer, index),
    exact_title: answer.title,
    exact_copy: answer.copy || "",
    authored_signal: answer.signal || "",
    intended_construct: construct(full),
    actual_dimensions_tested: dimensions(full),
    positive_identities: effect.positive.map(([key]) => key),
    strong_positive_identities: effect.strong.map(([key]) => key),
    suppressed_identities: effect.negative.map(([key]) => key),
    uncertainty_representation: /unknown|unsure|uncertain|mixed|depends|neither/i.test(full) ? "PRESENT" : "ABSENT",
    evidence_authority: "No answer-level source or claim reference",
    final_disposition: disposition,
    remediation_implication: "Assign stable ID, evidence/interpretation record, controlled construct, positive/negative effect contract, dependency group, and explanation entailment before production repair.",
  };
}));

const dispositionValues = ["KEEP", "KEEP-BUT-REWORD", "RETUNE", "REPLACE", "REMOVE", "NEEDS-EVIDENCE", "UNCLEAR-AUTHORITY"];
function dispositionSummary(rows) {
  return Object.fromEntries(dispositionValues.map((value) => [value, rows.filter((row) => row.final_disposition === value).length]));
}
const questionDispositionSummary = {
  question_total: questionRows.length,
  answer_total: answerRows.length,
  by_question_disposition: dispositionSummary(questionRows),
  by_answer_disposition: dispositionSummary(answerRows),
  by_phase: Object.fromEntries(stages.map((stage) => [stage, {
    questions: questionRows.filter((row) => row.phase === stage).length,
    answers: answerRows.filter((row) => row.phase === stage).length,
    dispositions: dispositionSummary(questionRows.filter((row) => row.phase === stage)),
  }])),
  major_risk_counts: {
    high_abstraction_questions: questionRows.filter((row) => row.abstraction_burden === "HIGH").length,
    low_commander_relevance_questions: questionRows.filter((row) => row.commander_relevance === "LOW").length,
    double_barreled_questions: questionRows.filter((row) => row.double_barreled_status === "YES").length,
    lore_dependent_questions: questionRows.filter((row) => row.lore_dependence === "PRESENT").length,
    mood_dependent_questions: questionRows.filter((row) => row.mood_dependence === "PRESENT").length,
    questions_without_uncertainty_state: questionRows.filter((row) => row.uncertainty_representation.startsWith("ABSENT")).length,
    answers_missing_stable_id: answerRows.filter((row) => row.answer_id === "MISSING").length,
    answers_without_evidence_authority: answerRows.filter((row) => row.evidence_authority.startsWith("No ")).length,
  },
  method_limit: "Deterministic documentation audit based on committed wording/effects. Dispositions are implementation-planning inputs, not independently reviewed player-response validity findings.",
};

const terminalRecords = [];
const visitQuestion = Object.fromEntries(questions.map((question) => [question.id, 0]));
const visitAnswer = Object.fromEntries(answerRows.map((row) => [row.audit_answer_id, 0]));
const winnerStats = Object.fromEntries(factionKeys.map((key) => [key, {
  wins: 0, rank2: 0, rank3: 0, negativeOnly: 0, belowStrongMin: 0, positiveScoreHitMin: Infinity,
  strongHitMin: Infinity, gatePositive: 0, hallPositive: 0, cruciblePositive: 0, totalPositive: 0,
  targetedHallWins: 0, targetedCrucibleWins: 0,
}]))
const tieComposition = new Map();
const rank2Pairs = new Map();
const rank3Pairs = new Map();
const nonMonotonic = new Map();
let exactTieSample = null;
let weakRankTwoSample = null;

function selectedAnswerFor(entry) {
  return questionById.get(entry.question_id)?.answers?.[entry.answer_index];
}

function recordTerminal(state) {
  const ranked = rankAdaptiveFactions(state, placementModel);
  const result = buildAdaptivePlacementResult({ state, model: placementModel, factions });
  const primary = ranked[0].faction;
  const strongHits = state.stage_history.filter((entry) => Number(selectedAnswerFor(entry)?.likelihoods?.[primary] || 0) >= 0.75).length;
  const positiveEntries = state.evidence_trail.filter((entry) => (entry.deltas || []).some((delta) => delta.faction === primary && Number(delta.delta) > 0));
  const positiveScoreHits = positiveEntries.length;
  const axes = placementModel.factions[primary]?.placement_axes || {};
  const minimum = Number(axes.required_positive_min_hits || 0);
  const mapping = Object.fromEntries(state.stage_history.map((entry) => [entry.question_id, entry.answer_index]));
  const record = {
    mapping,
    primary,
    rank2: ranked[1]?.faction || "",
    rank3: ranked[2]?.faction || "",
    score: ranked[0].score,
    confidence: result.confidence,
    gap: result.confidence_gap,
    strongHits,
    positiveScoreHits,
  };
  terminalRecords.push(record);
  const stats = winnerStats[primary];
  stats.wins += 1;
  if (strongHits === 0 && positiveScoreHits === 0) stats.negativeOnly += 1;
  if (strongHits < minimum) stats.belowStrongMin += 1;
  stats.positiveScoreHitMin = Math.min(stats.positiveScoreHitMin, positiveScoreHits);
  stats.strongHitMin = Math.min(stats.strongHitMin, strongHits);
  for (const entry of positiveEntries) {
    stats[`${entry.stage}Positive`] += 1;
    stats.totalPositive += 1;
  }
  if (state.stage_history.some((entry) => questionById.get(entry.question_id)?.stage === "hall" && questionById.get(entry.question_id)?.faction === primary)) stats.targetedHallWins += 1;
  if (state.stage_history.some((entry) => questionById.get(entry.question_id)?.stage === "crucible" && (questionById.get(entry.question_id)?.pair || []).includes(primary))) stats.targetedCrucibleWins += 1;
  if (ranked[1]) winnerStats[ranked[1].faction].rank2 += 1;
  if (ranked[2]) winnerStats[ranked[2].faction].rank3 += 1;
  const pair2 = `${primary}>${record.rank2}`;
  const pair3 = `${primary}>${record.rank3}`;
  rank2Pairs.set(pair2, (rank2Pairs.get(pair2) || 0) + 1);
  rank3Pairs.set(pair3, (rank3Pairs.get(pair3) || 0) + 1);
  const tied = ranked.filter((entry) => Math.abs(entry.score - ranked[0].score) < 1e-12).map((entry) => entry.faction).sort();
  if (tied.length > 1) {
    const key = tied.join("=");
    tieComposition.set(key, (tieComposition.get(key) || 0) + 1);
    if (!exactTieSample) exactTieSample = { state: JSON.parse(JSON.stringify(state)), ranked: ranked.slice(0, 3), result };
  }
  if (!weakRankTwoSample || Number(ranked[1]?.probability || 1) < Number(weakRankTwoSample.ranked[1]?.probability || 1)) {
    weakRankTwoSample = { state: JSON.parse(JSON.stringify(state)), ranked: ranked.slice(0, 3), result };
  }
  for (const entry of state.stage_history) {
    visitQuestion[entry.question_id] += 1;
    visitAnswer[answerId(questionById.get(entry.question_id), selectedAnswerFor(entry), entry.answer_index)] += 1;
  }
}

function enumerate(state) {
  if (shouldFinishAdaptiveReading(state, placementModel)) {
    recordTerminal(state);
    return;
  }
  const question = selectNextAdaptiveQuestion(state, placementModel);
  if (!question) {
    recordTerminal(state);
    return;
  }
  const beforeRank = new Map(rankAdaptiveFactions(state, placementModel).map((entry) => [entry.faction, entry]));
  question.answers.forEach((answer, answerIndex) => {
    const next = applyAdaptiveAnswer({ state, model: placementModel, question, answer, answerIndex });
    const afterRank = new Map(rankAdaptiveFactions(next, placementModel).map((entry) => [entry.faction, entry]));
    for (const [identity, likelihood] of Object.entries(answer.likelihoods || {})) {
      if (Number(likelihood) < 0.75) continue;
      const key = `${question.id}#${answerIndex}:${identity}`;
      const stats = nonMonotonic.get(key) || { question_id: question.id, answer_index: answerIndex, identity, observations: 0, probability_worsened: 0, rank_worsened: 0 };
      stats.observations += 1;
      if (Number(afterRank.get(identity)?.probability || 0) + 1e-12 < Number(beforeRank.get(identity)?.probability || 0)) stats.probability_worsened += 1;
      if (Number(afterRank.get(identity)?.rank || 99) > Number(beforeRank.get(identity)?.rank || 99)) stats.rank_worsened += 1;
      nonMonotonic.set(key, stats);
    }
    enumerate(next);
  });
}

enumerate(createInitialAdaptiveState(placementModel));

let neighborPairs = 0;
let primaryFlips = 0;
let oldPrimaryBecomesRank2 = 0;
let differentFamilyFlips = 0;
const representativePrimaryFlips = [];
const differentFamilyFlipCategories = new Map();
const flipInvolvement = new Map();
const pathNeighborStats = Array.from({ length: terminalRecords.length }, () => ({ neighbors: 0, flips: 0 }));
const groups = new Map();
terminalRecords.forEach((record, recordIndex) => {
  const ids = Object.keys(record.mapping).sort();
  for (const id of ids) {
    const key = `${id}|${ids.filter((other) => other !== id).map((other) => `${other}=${record.mapping[other]}`).join(";")}`;
    const list = groups.get(key) || [];
    list.push({ recordIndex, answerIndex: record.mapping[id], questionId: id });
    groups.set(key, list);
  }
});
for (const list of groups.values()) {
  for (let i = 0; i < list.length; i += 1) for (let j = i + 1; j < list.length; j += 1) {
    if (list[i].answerIndex === list[j].answerIndex) continue;
    const left = terminalRecords[list[i].recordIndex];
    const right = terminalRecords[list[j].recordIndex];
    neighborPairs += 1;
    pathNeighborStats[list[i].recordIndex].neighbors += 1;
    pathNeighborStats[list[j].recordIndex].neighbors += 1;
    if (left.primary !== right.primary) {
      primaryFlips += 1;
      pathNeighborStats[list[i].recordIndex].flips += 1;
      pathNeighborStats[list[j].recordIndex].flips += 1;
      if (left.primary === right.rank2 || right.primary === left.rank2) oldPrimaryBecomesRank2 += 1;
      const leftFamily = family(left.primary);
      const rightFamily = family(right.primary);
      if (leftFamily !== rightFamily) {
        differentFamilyFlips += 1;
        const familyCategory = [leftFamily, rightFamily].sort().join(" <-> ");
        differentFamilyFlipCategories.set(familyCategory, (differentFamilyFlipCategories.get(familyCategory) || 0) + 1);
      }
      if (representativePrimaryFlips.length < 5) {
        const question = questionById.get(list[i].questionId);
        const leftAnswer = question?.answers?.[list[i].answerIndex];
        const rightAnswer = question?.answers?.[list[j].answerIndex];
        representativePrimaryFlips.push({
          question_id: list[i].questionId,
          left_answer_id: answerId(question, leftAnswer, list[i].answerIndex),
          left_answer_title: leftAnswer?.title || "",
          left_primary: left.primary,
          left_rank_two: left.rank2,
          right_answer_id: answerId(question, rightAnswer, list[j].answerIndex),
          right_answer_title: rightAnswer?.title || "",
          right_primary: right.primary,
          right_rank_two: right.rank2,
          same_question_set: true,
          same_other_answers: true,
          branching_change_included: false,
        });
      }
      for (const item of [list[i], list[j]]) {
        const key = `${item.questionId}#answer-${item.answerIndex + 1}`;
        flipInvolvement.set(key, (flipInvolvement.get(key) || 0) + 1);
      }
    }
  }
}

const matchedInsensitivePaths = pathNeighborStats.filter((stats) => stats.neighbors >= 3 && stats.flips === 0).length;
const deadQuestions = Object.entries(visitQuestion).filter(([, count]) => count === 0).map(([id]) => id);
const deadAnswers = Object.entries(visitAnswer).filter(([, count]) => count === 0).map(([id]) => id);
const observedNoWinnerChangeAnswers = Object.entries(visitAnswer).filter(([id, count]) => count > 0 && !flipInvolvement.has(id)).map(([id]) => id);

const signalGroups = new Map();
for (const question of questions) for (const [index, answer] of question.answers.entries()) {
  const group = construct(`${answer.signal || ""} ${answer.title} ${answer.copy || ""}`);
  if (group === "uncontrolled-editorial-construct") continue;
  const list = signalGroups.get(group) || [];
  list.push({ question, answer, index });
  signalGroups.set(group, list);
}
const repeatedSignalRows = [...signalGroups.entries()].filter(([, items]) => new Set(items.map((item) => item.question.id)).size > 1).map(([group, items]) => {
  const identities = [...new Set(items.flatMap((item) => Object.keys(item.answer.likelihoods || {})))];
  const suppressions = [...new Set(items.flatMap((item) => Object.keys(item.answer.suppresses || {})))];
  const stageSet = [...new Set(items.map((item) => item.question.stage))];
  let maximumContribution = 0;
  for (const record of terminalRecords) {
    let contribution = 0;
    for (const [questionId, index] of Object.entries(record.mapping)) {
      const q = questionById.get(questionId);
      const answer = q?.answers?.[index];
      if (construct(`${answer?.signal || ""} ${answer?.title || ""} ${answer?.copy || ""}`) !== group) continue;
      const likelihood = Number(answer?.likelihoods?.[record.primary] || 0);
      if (likelihood >= 0.75) contribution += 1;
    }
    maximumContribution = Math.max(maximumContribution, contribution);
  }
  return {
    construct_name: group,
    questions_and_answers: items.map((item) => `${item.question.id}:${answerId(item.question, item.answer, item.index)}`),
    stages: stageSet,
    identities_affected: identities,
    positive_effect_count: items.reduce((sum, item) => sum + Object.keys(item.answer.likelihoods || {}).length, 0),
    suppressions,
    maximum_strong_hit_contribution_in_one_valid_path: maximumContribution,
    gate_evidence_counted_again_in_hall_or_crucible: stageSet.includes("gate") && stageSet.some((stage) => stage !== "gate") ? "YES-POTENTIAL" : "NO-GATE-OVERLAP",
    several_answers_can_represent_one_observation: "YES-POTENTIAL; no response data exists to establish statistical correlation",
    repeated_contribution_influences_stopping_or_confidence: "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
    copy_independence_risk: "YES: selected signals are listed as separate reasons even when they express one repeated construct",
    required_cap_grouping_or_disclosure: "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations.",
  };
});

function competitorCounts(identity) {
  const counts = new Map();
  for (const record of terminalRecords) if (record.primary === identity) counts.set(record.rank2, (counts.get(record.rank2) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([key, count]) => ({ identity: key, count }));
}

const termOwners = new Map();
for (const key of factionKeys) for (const term of placementModel.factions[key]?.placement_axes?.required_positive_evidence_terms || []) {
  const normalized = term.toLowerCase();
  const owners = termOwners.get(normalized) || [];
  owners.push(key);
  termOwners.set(normalized, owners);
}

const identityRows = factionKeys.map((key) => {
  const axes = placementModel.factions[key]?.placement_axes || {};
  const terms = axes.required_positive_evidence_terms || [];
  const uniqueTerms = terms.filter((term) => (termOwners.get(term.toLowerCase()) || []).length === 1);
  const detecting = questions.filter((question) => terms.some((term) => overlap(term, `${question.prompt} ${question.answers.map((answer) => `${answer.title} ${answer.copy || ""} ${answer.signal || ""}`).join(" ")}`) > 0)).map((question) => question.id);
  const detectedTerms = terms.filter((term) => questions.some((question) => overlap(term, `${question.prompt} ${question.answers.map((answer) => `${answer.title} ${answer.copy || ""} ${answer.signal || ""}`).join(" ")}`) > 0));
  const missingTerms = terms.filter((term) => !detectedTerms.includes(term));
  const stats = winnerStats[key];
  const support = answerRows.filter((row) => row.positive_identities.includes(key)).length;
  const oppose = answerRows.filter((row) => row.suppressed_identities.includes(key)).length;
  const hallQuestions = questions.filter((question) => question.stage === "hall" && question.faction === key);
  const crucibleQuestions = questions.filter((question) => question.stage === "crucible" && (question.pair || []).includes(key));
  const branchDependency = stats.wins ? Math.min(1, round((stats.targetedHallWins + stats.targetedCrucibleWins) / stats.wins, 3)) : 0;
  let disposition = "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE";
  if (uniqueTerms.length >= 2 && detecting.length >= 2 && stats.belowStrongMin / Math.max(1, stats.wins) < 0.25) disposition = "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED";
  if (missingTerms.length > Math.max(1, terms.length / 2) || stats.belowStrongMin / Math.max(1, stats.wins) > 0.5) disposition = "HIGH-CONFUSION-RISK";
  return {
    identity: key,
    canonical_name: factions[key]?.name || key,
    certified_defining_signals: terms,
    negative_and_boundary_signals: axes.suppress_when_user_centers || [],
    nearest_identity_competitors: competitorCounts(key),
    unique_discriminators: uniqueTerms,
    current_questions_detecting_discriminators: detecting,
    missing_discriminators: missingTerms,
    questions_creating_confusion: questionRows.filter((row) => row.question_id.startsWith("gate_") || (row.correlated_signal_group.includes(construct(terms.join(" "))) && row.final_disposition !== "NEEDS-EVIDENCE")).map((row) => row.question_id),
    support_opportunity: support,
    opposing_opportunity: oppose,
    minimum_hit_contract_status: `NOT-ENFORCED; ${stats.belowStrongMin}/${stats.wins} primary paths below ${axes.required_positive_min_hits || 0} strong authored hits`,
    false_positive_guardrail_status: "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
    gate_dependency: stats.totalPositive ? round(stats.gatePositive / stats.totalPositive, 3) : 0,
    single_question_dependency: hallQuestions.length + crucibleQuestions.length <= 1 ? "YES" : "NO/UNRESOLVED",
    branch_dependency: branchDependency,
    likely_false_positives: `Primary below strong-min proxy: ${stats.belowStrongMin}; negative-only winners: ${stats.negativeOnly}`,
    likely_false_negatives: `Missing discriminator terms: ${missingTerms.join(" | ") || "none by lexical probe"}`,
    primary_copy_consistency: copyByIdentity.get(key)?.decree?.includes(factions[key]?.name || key) ? "NAME-CONSISTENT; claim entailment unvalidated" : "INCONSISTENT",
    adjacent_copy_consistency: "Numeric rank-two/rank-three framing; relationship meaning not independently established",
    commander_expression_consistency: "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
    unresolved_evidence_needs: "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
    distinctiveness_disposition: disposition,
  };
});

function profileScenario(identity) {
  const run = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: identity });
  const ranked = rankAdaptiveFactions(run.state, placementModel);
  const axes = placementModel.factions[identity]?.placement_axes || {};
  const directPositive = run.selections.some(({ answer }) => Number(answer.likelihoods?.[identity] || 0) >= 0.75);
  const strongHits = run.selections.filter(({ answer }) => Number(answer.likelihoods?.[identity] || 0) >= 0.75).length;
  const corpus = copyByIdentity.get(identity);
  const exact = run.result.faction === identity;
  const scoringOutcome = exact ? "EXACT-PRIMARY" : ranked.slice(0, 3).some((entry) => entry.faction === identity) ? "ACCEPTABLE-CLOSE-ALTERNATIVE" : "MATERIAL-MISS";
  return {
    expected_identity: identity,
    scenario_origin: "GOLDEN-PATH-DERIVED",
    scenario_origin_basis: "The remediation generator calls runAdaptiveGoldenPath with targetFaction equal to the expected identity; answers were not selected independently.",
    defining_evidence: axes.required_positive_evidence_terms || [],
    closest_competitor: ranked[1]?.faction || "",
    mixed_or_uncertain_element: `Nearest current numeric competitor ${ranked[1]?.faction || "none"}; no explicit mixed/unknown response state exists.`,
    neighboring_challenge_status: "INCOMPLETE: nearest numeric competitor is recorded, but no independently selected neighboring challenge was introduced.",
    mixed_or_uncertain_challenge_status: "INCOMPLETE: the target-seeking routine selected no mixed/uncertain answer and the questionnaire has no explicit mixed/unknown state.",
    exact_available_answers_selected: run.selections.map(({ question, answer, answerIndex }) => ({ stage: question.stage, question_id: question.id, answer_id: answer.id || `MISSING:${question.id}#answer-${answerIndex + 1}`, title: answer.title })),
    branch_path_reached: run.state.stage_history.map((entry) => `${entry.stage}:${entry.question_id}`),
    final_primary: run.result.faction,
    rank_two: ranked[1]?.faction || "",
    rank_three: ranked[2]?.faction || "",
    softmax_share_displayed_as_confidence: run.result.confidence,
    direct_positive_evidence_present: directPositive,
    minimum_hit_metadata_satisfied_by_strong_authored_hit_proxy: strongHits >= Number(axes.required_positive_min_hits || 0),
    strong_authored_hit_count: strongHits,
    false_positive_guardrail_metadata_satisfied: "UNRESOLVED: guardrail is free text and has no executable predicate",
    explanation_result: run.result.decree,
    adjacent_result: run.result.adjacent_matches.map((match) => ({ identity: match.faction, share: round(match.confidence, 3), reason: match.reason })),
    commander_recommendation_result: (corpus?.commander_recommendations || []).slice(0, 3).map((entry) => entry.name || entry.title || entry.commander || entry),
    acceptable_result_set: [identity],
    unacceptable_false_positives: factionKeys.filter((key) => key !== identity && !(axes.suppress_when_user_centers || []).some((value) => value.includes(key))).slice(0, 5),
    scoring_outcome: scoringOutcome,
    final_disposition: "INCOMPLETE",
    scenario_limit: "Golden-path-derived target-seeking probe. It demonstrates target reachability under the runtime helper only; it is not an independently derived profile, a neighboring challenge, semantic placement accuracy, or empirical player validation.",
  };
}
const profileScenarios = factionKeys.map(profileScenario);

function keywordStrategy(keywords, alternate = false) {
  let step = 0;
  return (question) => {
    const desired = alternate && step++ % 2 ? keywords.slice().reverse() : keywords;
    let best = 0;
    let bestScore = -1;
    question.answers.forEach((answer, index) => {
      const text = `${answer.title} ${answer.copy || ""} ${answer.signal || ""}`.toLowerCase();
      const score = desired.reduce((sum, keyword, rank) => sum + (text.includes(keyword.toLowerCase()) ? desired.length - rank : 0), 0);
      if (score > bestScore) { best = index; bestScore = score; }
    });
    return best;
  };
}

const adversarialDefinitions = [
  { scenario: "gameplay preference conflicts with philosophy", keywords: ["mechanism", "action", "community", "self"], alternate: true, acceptable: "mixed-or-unknown", finalDisposition: "PARTIALLY-REPRESENTABLE-BUT-CONFLATED", coverage: "AVAILABLE-ANSWERS-EXPRESS-ONLY-PART", rationale: "Available answers express gameplay-like and philosophical fragments, but the instrument scores them as interchangeable identity evidence and cannot preserve the conflict as two dimensions." },
  { scenario: "theme preference without low-power preference", keywords: ["art", "spectacle", "power", "mechanism"], alternate: true, acceptable: "theme-only-no-power-inference", finalDisposition: "REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE", coverage: "AVAILABLE-ANSWERS-FORCE-UNSUPPORTED-INFERENCE", rationale: "Aesthetic/theme answers exist, but the output converts them into identity and Commander implications without a separate power-preference observation." },
  { scenario: "tutor use without a competitive assumption", keywords: [], alternate: false, acceptable: "no-stable-identity", finalDisposition: "QUESTIONNAIRE-CANNOT-REPRESENT", coverage: "LITERALLY-NO-AVAILABLE-ANSWER", rationale: "No current prompt or answer records tutor use, frequency, intent, or competitive assumption." },
  { scenario: "combo interest without psychographic inference", keywords: [], alternate: false, acceptable: "no-stable-identity", finalDisposition: "QUESTIONNAIRE-CANNOT-REPRESENT", coverage: "LITERALLY-NO-AVAILABLE-ANSWER", rationale: "No current prompt or answer records combo interest while separating deck behavior from psychographic motivation." },
  { scenario: "color preference without faction preference", keywords: [], alternate: false, acceptable: "no-faction-inference", finalDisposition: "QUESTIONNAIRE-CANNOT-REPRESENT", coverage: "LITERALLY-NO-AVAILABLE-ANSWER", rationale: "No current answer records a bare color preference with an explicit prohibition on faction or behavioral inference." },
  { scenario: "social discomfort without stable identity inference", keywords: ["protect", "group", "pressure"], alternate: false, acceptable: "context-limited-unknown", finalDisposition: "REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE", coverage: "AVAILABLE-ANSWERS-FORCE-UNSUPPORTED-INFERENCE", rationale: "Pressure/protection answers can express the immediate discomfort, but the runtime converts the situational response into stable identity evidence." },
  { scenario: "new-player uncertainty", keywords: [], alternate: false, acceptable: "unknown", finalDisposition: "QUESTIONNAIRE-CANNOT-REPRESENT", coverage: "LITERALLY-NO-AVAILABLE-ANSWER", rationale: "Every current question forces a directional answer; no answer records lack of experience or uncertainty." },
  { scenario: "I do not know or no directional answer", keywords: [], alternate: false, acceptable: "unknown", finalDisposition: "QUESTIONNAIRE-CANNOT-REPRESENT", coverage: "LITERALLY-NO-AVAILABLE-ANSWER", rationale: "No current question offers an unsure, neutral, none, mixed, skip, or no-direction answer." },
  { scenario: "deck behavior differs from personal preference", keywords: ["deck", "self", "mechanism", "feeling"], alternate: true, acceptable: "mixed-layer-result", finalDisposition: "PARTIALLY-REPRESENTABLE-BUT-CONFLATED", coverage: "AVAILABLE-ANSWERS-EXPRESS-ONLY-PART", rationale: "Some answers express deck behavior and others personal/philosophical preference, but the questionnaire does not preserve those layers as distinct observations." },
];
const adversarialRows = adversarialDefinitions.map(({ scenario, keywords, alternate, acceptable, finalDisposition, coverage, rationale }) => {
  const representable = keywords.length > 0;
  if (!representable) return {
    scenario,
    available_answer_coverage: coverage,
    disposition_rationale: rationale,
    exact_available_answers_selected: [],
    branch_path_reached: [],
    final_primary: "NOT-RUN",
    rank_two: "",
    rank_three: "",
    softmax_share_displayed_as_confidence: "",
    direct_positive_evidence_present: false,
    minimum_hit_and_guardrail_metadata_satisfied: "NOT-APPLICABLE",
    explanation_result: "No exact current answer state represents the requested distinction without adding directional evidence.",
    adjacent_result: "NOT-AVAILABLE",
    commander_recommendation_result: "NOT-AVAILABLE",
    acceptable_result_set: acceptable,
    unacceptable_false_positives: "Any fixed identity, confidence percentage, or commander recommendation",
    final_disposition: finalDisposition,
  };
  const run = runAdaptiveReadingWithStrategy({ model: placementModel, factions, strategy: keywordStrategy(keywords, alternate) });
  const ranked = rankAdaptiveFactions(run.state, placementModel);
  return {
    scenario,
    available_answer_coverage: coverage,
    disposition_rationale: rationale,
    exact_available_answers_selected: run.selections.map(({ question, answer, answerIndex }) => ({ question_id: question.id, answer_id: answer.id || `MISSING:${question.id}#answer-${answerIndex + 1}`, title: answer.title })),
    branch_path_reached: run.state.stage_history.map((entry) => `${entry.stage}:${entry.question_id}`),
    final_primary: run.result.faction,
    rank_two: ranked[1]?.faction || "",
    rank_three: ranked[2]?.faction || "",
    softmax_share_displayed_as_confidence: run.result.confidence,
    direct_positive_evidence_present: run.selections.some(({ answer }) => Number(answer.likelihoods?.[run.result.faction] || 0) >= 0.75),
    minimum_hit_and_guardrail_metadata_satisfied: "UNRESOLVED: no executable guardrail; scenario deliberately contains conflicting or bounded evidence",
    explanation_result: run.result.decree,
    adjacent_result: run.result.adjacent_matches.map((match) => `${match.faction}:${round(match.confidence, 3)}`),
    commander_recommendation_result: "Identity-level recommendations would be shown despite the unresolved construct conflict",
    acceptable_result_set: acceptable,
    unacceptable_false_positives: "Any fixed identity presented as strong, diagnostic, or evidence-backed",
    final_disposition: finalDisposition,
  };
});

const collisions = new Map();
for (const scenario of profileScenarios) {
  const signature = scenario.exact_available_answers_selected.map((entry) => `${entry.question_id}=${entry.answer_id}`).join(";");
  const list = collisions.get(signature) || [];
  list.push(scenario.expected_identity);
  collisions.set(signature, list);
}
const profileCollisions = [...collisions.entries()].filter(([, identities]) => identities.length > 1).map(([signature, identities]) => ({ signature, identities }));

const sensitivity = {
  unit_boundaries: {
    combinatorial_terminal_path_frequency: "Count of valid adaptive terminal paths under authored branching; not player prevalence.",
    answer_opportunity: "Count of authored answer effects or matched terminal comparisons; not stage exposure in a player population.",
    stage_opportunity: "Count of valid model branches reaching a stage/question.",
    normalized_sensitivity: "Primary flips divided by matched terminal pairs that differ in exactly one selected answer while retaining the same question set and all other answers.",
    scenario_success: "Synthetic profile/adversarial probe outcome; not empirical accuracy.",
    empirical_player_prevalence: "UNKNOWN: no representative player-response dataset exists.",
  },
  terminal_paths: terminalRecords.length,
  exact_top_ties: [...tieComposition.values()].reduce((sum, count) => sum + count, 0),
  matched_one_answer_terminal_pairs: neighborPairs,
  matched_one_answer_comparison_definition: "An unordered pair of valid terminal paths with the identical complete question-ID set and identical selected answers for every question except one; the remaining shared question has different selected answer indices.",
  denominator_construction: "All such unordered pairs across the 26,891 enumerated valid terminal paths; each qualifying pair contributes once to 44,005.",
  compared_paths_have_same_later_questions: true,
  branching_changes_included: false,
  branching_exclusion_reason: "A branch change changes the complete question-ID set, so that pair cannot enter the matched denominator.",
  one_answer_primary_flips: primaryFlips,
  one_answer_primary_to_rank_two_flips: oldPrimaryBecomesRank2,
  one_answer_primary_to_different_family_flips: differentFamilyFlips,
  representative_primary_flips: representativePrimaryFlips,
  different_family_flip_categories: Object.fromEntries([...differentFamilyFlipCategories.entries()].sort((a, b) => a[0].localeCompare(b[0]))),
  normalized_primary_flip_sensitivity: round(primaryFlips / Math.max(1, neighborPairs)),
  paths_with_at_least_three_matched_changes_and_no_primary_flip: matchedInsensitivePaths,
  negative_only_winners_by_identity: Object.fromEntries(factionKeys.map((key) => [key, winnerStats[key].negativeOnly])),
  negative_only_winner_total: factionKeys.reduce((sum, key) => sum + winnerStats[key].negativeOnly, 0),
  below_strong_minimum_hit_proxy_by_identity: Object.fromEntries(factionKeys.map((key) => [key, winnerStats[key].belowStrongMin])),
  below_strong_minimum_hit_proxy_total: factionKeys.reduce((sum, key) => sum + winnerStats[key].belowStrongMin, 0),
  false_positive_guardrail_violations: "UNRESOLVED: generated guardrails are free text with no executable predicates; lexical guesses are not counted as violations.",
  exact_tie_composition: Object.fromEntries([...tieComposition.entries()].sort((a, b) => b[1] - a[1])),
  common_primary_rank_two: Object.fromEntries([...rank2Pairs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)),
  common_primary_rank_three: Object.fromEntries([...rank3Pairs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)),
  canonical_profile_collisions: profileCollisions,
  dead_questions: deadQuestions,
  dead_answers: deadAnswers,
  visited_answers_with_no_observed_winner_change_in_matched_pairs: observedNoWinnerChangeAnswers,
  branch_rules_preventing_relevant_discriminators: identityRows.filter((row) => row.branch_dependency < 0.25 || row.current_questions_detecting_discriminators.length === 0).map((row) => ({ identity: row.identity, branch_dependency: row.branch_dependency, detected_questions: row.current_questions_detecting_discriminators })),
  non_monotonic_support_observations: [...nonMonotonic.values()].filter((row) => row.probability_worsened || row.rank_worsened),
  interpretation_note: "No empirical statistical correlation, calibration, correctness rate, or population prevalence is inferred from these combinatorial results.",
};

function traceFromRun(traceId, traceType, run, limitation = "") {
  const ranked = rankAdaptiveFactions(run.state, placementModel);
  const primary = ranked[0]?.faction || "";
  const corpus = copyByIdentity.get(primary);
  return {
    trace_id: traceId,
    trace_type: traceType,
    answer_to_observation: run.state.stage_history.map((entry) => ({ answer: `${entry.question_id}:${entry.answer_title}`, observation: entry.signal })),
    controlled_or_missing_signal: run.state.stage_history.map((entry) => ({ signal: entry.signal, status: "Authored free-text signal; no governed placement signal vocabulary" })),
    score_effect_and_suppression: run.state.evidence_trail.map((entry) => ({ question_id: entry.question_id, deltas: entry.deltas })),
    branch_decision: run.state.stage_history.map((entry) => `${entry.stage}:${entry.question_id}`),
    final_rank: ranked.slice(0, 3).map((entry) => ({ identity: entry.faction, score: entry.score, share: round(entry.probability, 3) })),
    current_confidence_output: run.result.confidence,
    public_strength_language: run.result.confidence >= 0.7 ? "high/strong framing possible" : run.result.confidence >= 0.4 ? "moderate framing possible" : "weak/emerging framing possible",
    explanation_claims: run.result.decree,
    adjacent_claims: run.result.adjacent_matches.map((match) => ({ identity: match.faction, share: round(match.confidence, 3), reason: match.reason })),
    commander_recommendation: (corpus?.commander_recommendations || []).slice(0, 3),
    maze_or_other_handoff: (corpus?.dossier?.searches?.maze || corpus?.dossier?.maze_searches || corpus?.maze_searches || []).slice?.(0, 3) || "Identity/color package search; not answer-derived",
    limitation,
  };
}

function runFor(identity) {
  return runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: identity });
}
const traces = [
  traceFromRun("TRACE-MONO", "mono-color", runFor("U")),
  traceFromRun("TRACE-GUILD", "guild", runFor("UR")),
  traceFromRun("TRACE-COLLEGE", "college", runFor("PRISMARI")),
  traceFromRun("TRACE-SHARD", "shard", runFor("BANT")),
  traceFromRun("TRACE-WEDGE", "wedge", runFor("MARDU")),
  traceFromRun("TRACE-FOUR", "four-color", runFor("GLINT")),
  traceFromRun("TRACE-COLORLESS", "Colorless", runFor("COLORLESS")),
  traceFromRun("TRACE-WUBRG", "WUBRG", runFor("WUBRG")),
  traceFromRun("TRACE-GUILD-COLLEGE", "guild/college collision", runFor("WITHERBLOOM"), "Compare same-color Golgari; current rank is numeric, not a validated confusion decision."),
  traceFromRun("TRACE-TIE", "exact tie", exactTieSample, "Exact tied scores are silently ordered lexicographically."),
  traceFromRun("TRACE-WEAK-ADJACENT", "weak rank-two labeled adjacent", weakRankTwoSample, "Rank two is emitted as adjacent even at the minimum observed rank-two softmax share."),
];
traces.push({
  trace_id: "TRACE-NEGATIVE-ONLY",
  trace_type: "negative-only winner",
  disposition: sensitivity.negative_only_winner_total === 0 ? "NOT-INSTANTIABLE" : "AVAILABLE",
  limitation: sensitivity.negative_only_winner_total === 0 ? "Corrected delta-level analysis found zero genuinely negative-only winners. The rejected audit's contrary statement came from inspecting a nonexistent evidence-trail field. A fabricated trace is prohibited." : "See sensitivity sample.",
});

const evidenceFamilies = [
  ["CRIT-001", "DIRECT-AUTHORITY", "Certified identity definitions and reviewed boundaries only; does not by itself validate questionnaire effects or player prevalence."],
  ["Apocrypha", "SUPPORTING-EVIDENCE", "Presents source roles/limitations; presentation is not evidence authority and must not elevate a source."],
  ["CECOS draft.4", "DIRECT-AUTHORITY", "Governs corpus evidence, provenance, ambiguity, claims, and derived-layer separation; does not define Archscry scoring."],
  ["Strategium", "HYPOTHESIS-ONLY", "Downstream guidance may suggest distinctions but cannot serve as corpus evidence or direct scoring authority."],
  ["Magic Math", "SUPPORTING-EVIDENCE", "May support bounded mathematical method review; cannot establish identity semantics or player-response calibration without an applicable study."],
  ["tutor/combo research", "SUPPORTING-EVIDENCE", "Can falsify stereotypes and inform wording boundaries; tutor/combo use cannot directly assign motive, power level, or identity."],
  ["Partner research", "SUPPORTING-EVIDENCE", "May support Commander legality/mechanics or exploration examples; not identity-placement evidence."],
  ["current questionnaire answers", "HYPOTHESIS-ONLY", "Product-authored response options and signals; not player-language evidence and presently lack answer-level provenance."],
  ["runtime-generated model observations", "DIRECT-AUTHORITY", "Direct authority for what the committed implementation does, including counts and defects; not authority for semantic correctness or population behavior."],
  ["future player-pilot evidence", "DIRECT-AUTHORITY", "May support bounded usability, confusion, reliability, and outcome validation under a declared pilot design; not population prevalence absent representative sampling."],
];
const evidenceRoles = ["identity definitions", "question wording", "answer wording", "positive scoring", "negative scoring", "branching", "tie handling", "confidence", "adjacency", "placement explanations", "Commander recommendations", "Strategium routing", "Maze handoffs", "public factual claims"];
const evidenceIntegrationRows = evidenceFamilies.flatMap(([familyName, baseRole, rationale]) => evidenceRoles.map((use) => {
  let role = baseRole;
  if (familyName === "CECOS draft.4" && ["positive scoring", "negative scoring", "branching", "tie handling", "confidence", "adjacency", "Commander recommendations", "Maze handoffs"].includes(use)) role = "SUPPORTING-EVIDENCE";
  if (familyName === "Strategium" && ["positive scoring", "negative scoring", "confidence", "public factual claims"].includes(use)) role = "PROHIBITED-DIRECT-USE";
  if (familyName === "Apocrypha" && ["positive scoring", "negative scoring", "branching", "tie handling", "confidence", "adjacency"].includes(use)) role = "PROHIBITED-DIRECT-USE";
  if (familyName === "runtime-generated model observations" && !["branching", "tie handling", "confidence", "adjacency", "placement explanations", "Commander recommendations", "Maze handoffs"].includes(use)) role = "EXAMPLE-ONLY";
  if (familyName === "current questionnaire answers" && ["public factual claims", "Commander recommendations"].includes(use)) role = "PROHIBITED-DIRECT-USE";
  if (familyName === "Partner research" && !["Commander recommendations", "Maze handoffs", "public factual claims"].includes(use)) role = "NOT-APPLICABLE";
  return { evidence_family: familyName, permitted_use: use, role_classification: role, explanation: `${rationale} For ${use}, the role is ${role}; any derivation must identify inputs, transformation, uncertainty, version, and review state.` };
}));

const conclusionRows = [
  ["CONC-001", "Actual model is adaptive weighted scoring, not Bayesian inference", "IMPLEMENTATION-DERIVED", "Code path and exhaustive outputs are independent of CECOS version."],
  ["CONC-002", "37 identities, 113 questions, and 356 answers are present", "IMPLEMENTATION-DERIVED", "Direct generated-model inventory; byte reproduced."],
  ["CONC-003", "26,891 valid terminal paths and 333 exact top ties", "IMPLEMENTATION-DERIVED", "Direct exhaustive model enumeration; byte reproduced."],
  ["CONC-004", "All 37 primary and rank-two reachable; 36 rank-three reachable", "IMPLEMENTATION-DERIVED", "Direct exhaustive rank inventory; byte reproduced."],
  ["CONC-005", "WITHDRAWN HISTORICAL CLAIM: all identities can win with zero direct positive evidence", "CECOS-REVISED", "The historical claim is withdrawn because the rejected metric inspected nonexistent entry.faction. Correct delta-level analysis reports zero genuinely negative-only winners; 2,901 below-minimum proxy paths remain a separate result."],
  ["CONC-006", "Top softmax share is uncalibrated and must not be presented as probability/confidence", "CECOS-CONFIRMED", "Implementation observation plus draft.4 sections 14.7, 3.6, 1.6, 17.9, and 23.10 support explicit uncertainty and prohibit unsupported numeric probability in corpus classification; product calibration still requires a separate contract."],
  ["CONC-007", "Numeric rank two/three is not meaningful adjacency", "IMPLEMENTATION-DERIVED", "Runtime slices ranks; CECOS confirms derived relationships require a separate auditable derivation but does not define adjacency."],
  ["CONC-008", "No explicit neutral/mixed/unsure state exists", "CECOS-CONFIRMED", "Direct answer inventory; draft.4 requires unknown/mixed handling and preserving ambiguity in evidence-derived instruments."],
  ["CONC-009", "336 answers lack stable IDs and 356 lack answer-level provenance", "CECOS-CONFIRMED", "Direct schema/data inventory; draft.4 provenance/reproducibility rules confirm the traceability requirement."],
  ["CONC-010", "Terminal-path winner share is not player prevalence", "CECOS-CONFIRMED", "Draft.4 sections 3.4, 17.11, 23.2, and 23.8 expressly separate bounded counts from prevalence."],
  ["CONC-011", "Placement explanations infer motivations and behavior beyond selected answers", "CECOS-CONFIRMED", "Direct template trace; draft.4 sections 2.1, 4.3, 4.5, 17.9, and 23.10 require derived interpretation and self-report boundaries."],
  ["CONC-012", "Hearthhull is specifically legal under current official rules", "CECOS-WITHDRAWN", "The rejected audit obtained this via web browsing; no local official source was preserved as VM-551 authority. Specific legality is outside this local-authority audit."],
  ["CONC-013", "Committed legality detector is incomplete for special commander-enabling rules", "IMPLEMENTATION-DERIVED", "Locally demonstrable: Hearthhull is recommended but absent from the committed local index; the detector documents bounded heuristic coverage. No specific legality conclusion is retained."],
  ["CONC-014", "Independent review and later certification are required after implementation", "CECOS-REVISED", "Draft.4 directly governs independent corpus review/release; product implementation review/certification is a project contract informed by, but not falsely claimed as CECOS corpus certification."],
  ["CONC-015", "MVP order must protect unknown states and claim boundaries before polish", "CECOS-CONFIRMED", "Draft.4 supports unknown, ambiguity, provenance, derived-output, and public-claim gates while leaving product sequencing to owner governance."],
].map(([conclusion_id, conclusion, classification, rationale]) => ({ conclusion_id, conclusion, classification, rationale }));

const rejectedDefects = parseCsv(fs.readFileSync(path.join(scriptDir, "defect-register.csv"), "utf8"));
const gateByDefect = {
  "VM551-D001": "Gate B1", "VM551-D002": "Gate A", "VM551-D003": "Gate A", "VM551-D004": "Gate B1",
  "VM551-D005": "Gate A", "VM551-D006": "Gate A", "VM551-D007": "Gate A", "VM551-D008": "Gate B1",
  "VM551-D009": "Gate B1", "VM551-D010": "Gate B1", "VM551-D011": "Gate B1", "VM551-D012": "Gate B2",
  "VM551-D013": "Gate B2", "VM551-D014": "Gate B1", "VM551-D015": "Gate B1", "VM551-D016": "Gate B2",
  "VM551-D017": "Gate A", "VM551-D018": "Gate C", "VM551-D019": "Gate C", "VM551-D020": "Gate A",
  "VM551-D021": "Gate C", "VM551-D022": "Gate C", "VM551-D023": "Gate A", "VM551-D024": "Gate C",
  "VM551-D025": "Gate C", "VM551-D026": "Gate C", "VM551-D027": "Gate C", "VM551-D028": "Gate C",
  "VM551-D029": "Gate B2", "VM551-D030": "Gate B2", "VM551-D031": "Gate C", "VM551-D032": "Gate B2",
  "VM551-D033": "Gate D", "VM551-D034": "Gate D",
};
const cecosDependent = new Set(["VM551-D003", "VM551-D004", "VM551-D005", "VM551-D008", "VM551-D010", "VM551-D017", "VM551-D020", "VM551-D023", "VM551-D029", "VM551-D030", "VM551-D032"]);
const remediatedDefects = rejectedDefects.map((defect) => {
  const revisedD004 = defect.defect_id === "VM551-D004";
  const revisedD031 = defect.defect_id === "VM551-D031";
  const severity = revisedD004 ? "High" : defect.severity;
  const runtimeEvidence = revisedD004
    ? "Corrected delta-level enumeration finds 0 negative-only winners, but 2,901/26,891 primary paths fall below the generated required_positive_min_hits when a strong authored likelihood >=0.75 is used as the explicit proxy. The runtime never enforces the metadata."
    : revisedD031
      ? "Locally demonstrable conflict: Hearthhull is present in curated recommendations but absent from the committed local Commander index; the detector documents incomplete special-rule coverage. Specific legality is unresolved because the rejected audit's web-derived rule source is withdrawn."
      : defect.runtime_evidence;
  return {
    defect_id: defect.defect_id,
    category: defect.category,
    affected_identities_questions_routes: defect.affected_route_or_identity,
    exact_reproduction: revisedD004 ? "Run audit-placement-system-remediation.mjs; inspect below_strong_minimum_hit_proxy_by_identity and negative_only_winner_total." : revisedD031 ? "Compare the Hearthhull recommendation record with the committed local Commander index; do not use the rejected web citation." : defect.reproduction,
    machine_readable_evidence_reference: revisedD004 ? "sensitivity-dependency-collision-analysis.json" : revisedD031 ? "copy-comparison-corpus.json + audit-input-authority.md" : defect.source_file,
    user_facing_impact: revisedD004 ? "A primary can be presented even when the authored strong-hit proxy does not meet the identity's own generated minimum; the earlier stronger negative-only claim is withdrawn." : defect.actual_behavior,
    severity,
    severity_rationale: severity === "Critical" ? "Can invalidate the public placement/confidence claim across the system." : severity === "High" ? "Can materially mislead placement interpretation, evidence authority, or first-pilot correctness." : severity === "Medium" ? "Materially reduces usefulness, reviewability, recommendation safety, or rendering trust." : "Localized polish/maintainability impact.",
    severity_depends_on_cecos: cecosDependent.has(defect.defect_id) ? "PARTLY: implementation evidence establishes the defect; draft.4 confirms evidence/unknown/claim boundary." : "NO: direct implementation, data, rendering, or pipeline evidence.",
    root_cause: defect.implementation_dependency || defect.source_file,
    smallest_viable_correction: defect.recommended_requirement,
    required_evidence_dependency: defect.implementation_dependency,
    requirement_ids: (defect.recommended_requirement.match(/REQ-[A-Z]+-\d+/g) || []).join("|"),
    repair_gate: gateByDefect[defect.defect_id] || "Gate D",
    validation_required: revisedD004 ? "Exhaustive strong-hit/minimum contract test plus all-37 false-positive scenario review." : defect.expected_behavior,
    blocks_trustworthy_placement: defect.blocks_trustworthy_placement,
    reconciliation_note: revisedD004 ? "REVISED: original zero-positive-evidence metric was invalid; severity reduced Critical -> High while the unenforced minimum contract remains material." : revisedD031 ? "REVISED: specific current legality conclusion withdrawn; local detector/recommendation conflict retained." : "PRESERVED after implementation evidence and draft.4 re-adjudication.",
  };
});
const newDefects = [
  ["VM551-D035", "audit-governance", "High", "VM-551 audit authority", "audit-input-authority.md + cecos-conclusion-adjudication.csv", "Compare rejected handoff/full audit references with the exact draft.4 authority record.", "Owner could not reproduce or trust CECOS-dependent findings; a web-derived legality claim exceeded the local audit authority.", "Wrong CECOS draft and unpreserved external rule evidence were treated as governing inputs.", "Use only exact draft.4 Git object; classify every major conclusion; withdraw the specific Hearthhull legality claim.", "Exact CECOS object/checksum and local-only evidence", "REQ-GOV-001", "Audit acceptance gate", "Independent checksum/authority replay and conclusion classification."],
  ["VM551-D036", "logic", "High", "All primary selections", "sensitivity-dependency-collision-analysis.json", "Run remediation generator and inspect matched one-answer pairs.", "14,424/44,005 matched one-answer terminal comparisons flip primary; 32.7781% normalized sensitivity can make near-identical answers change identity without stability disclosure.", "No perturbation-stability contract or threshold informs result strength.", "Define pilot stability thresholds and return close/uncertain when one-answer perturbations are unstable.", "Bounded pilot response/scenario set", "REQ-TEST-009|REQ-CONF-004", "Gate B1", "Re-run matched perturbations; stratify by identity/family and test user-visible uncertainty."],
  ["VM551-D037", "logic", "Medium", "Three Crucible questions / six answers", "sensitivity-dependency-collision-analysis.json", "Inspect dead_questions and dead_answers after exhaustive enumeration.", "Authored discriminators can never affect any valid result, creating false assurance of pair coverage.", "Adaptive top-four/pair branching never reaches three committed Crucible pairs.", "Remove, re-route, or make reachable only after proving the discriminator belongs in the pilot.", "Question/branch contract", "REQ-LOGIC-009", "Gate B2", "Exhaustive path visit count must be nonzero for every active question/answer."],
  ["VM551-D038", "question-design", "High", "113 questions / 356 answers", "question-quality-adjudication.csv + question-disposition-summary.json", "Run remediation generator; reconcile all dispositions.", "67 high-abstraction, 45 low-Commander-relevance, 73 double-barreled, and 113 uncertainty-blind questions make answers hard to interpret as one bounded construct.", "Questions were authored as identity-flavored scenarios without evidence/construct/reliability contracts.", "Use the smallest evidence-derived, Commander-relevant, single-construct question slice for the first pilot; exclude unresolved questions.", "Player-language corpus derivation and owner construct decisions", "REQ-QUESTION-003", "Gate B1", "Cognitive interview, comprehension, neighbor-confusion, and representational-failure checks."],
  ["VM551-D039", "evidence-dependency", "High", "11 repeated-construct groups", "repeated-signal-dependency-audit.csv", "Run remediation generator; inspect cross-stage groups and maximum strong-hit contributions.", "One underlying preference can be counted repeatedly, inflate softmax share, affect stopping, and be narrated as multiple independent reasons.", "No controlled dependency groups, caps, or independence disclosure exist.", "Group/cap repeated constructs and compute confidence/evidence amount from independent evidence units.", "Controlled signal vocabulary and pilot response dependence analysis", "REQ-LOGIC-010|REQ-CONF-005", "Gate B1", "Synthetic duplicate-construct tests plus pilot dependence analysis; do not claim empirical correlation before data."],
  ["VM551-D040", "distinctiveness", "High", "All 37 identities", "identity-distinctiveness-matrix.csv + profile-scenario-matrix.csv", "Compare golden-path-derived probe outcomes with distinctiveness dispositions and same-color/edge-family analysis.", "Golden-path-derived target probes hit all 37, but all 37 lack an independent neighboring/mixed challenge; 4 identities have high confusion risk and 7 lack sufficient current distinctiveness evidence. Targeted reachability does not prove ordinary players can be separated.", "Reachability was used as a proxy for semantic distinctiveness; discriminators and false-positive guards are not validated.", "Pilot the smallest high-risk family contrasts and preserve unknown/close alternatives; defer universal accuracy claims.", "Certified identity definitions plus player-pilot confusion evidence", "REQ-IDENTITY-001", "Gate B1", "Independently derived all-37 profile probes, same-color guild/college, shard/wedge, four-color, Colorless, and WUBRG confusion matrices."],
].map(([defect_id, category, severity, affected, evidence, reproduction, impact, root, correction, dependency, requirements, gate, validation]) => ({
  defect_id, category, affected_identities_questions_routes: affected, exact_reproduction: reproduction, machine_readable_evidence_reference: evidence,
  user_facing_impact: impact, severity, severity_rationale: "Material audit or player-trust impact within the documented MVP boundary.",
  severity_depends_on_cecos: defect_id === "VM551-D035" || defect_id === "VM551-D039" ? "PARTLY: draft.4 confirms authority/dependence boundaries; machine evidence establishes the condition." : "NO: implementation/scenario evidence establishes the condition.",
  root_cause: root, smallest_viable_correction: correction, required_evidence_dependency: dependency, requirement_ids: requirements,
  repair_gate: gate, validation_required: validation, blocks_trustworthy_placement: severity === "High" ? "yes" : "no", reconciliation_note: "NEW IN OWNER-REJECTION REMEDIATION.",
}));
remediatedDefects.push(...newDefects);

const requirementRows = [
  ["REQ-GOV-001", "VM551-D035", "Wrong standard/web authority", "Audit acceptance cannot be reproduced", "Exact draft.4 authority and local-only evidence record", "Checksum replay; conclusion adjudication; no web authority", "Audit acceptance gate"],
  ["REQ-A-001", "VM551-D002", "adaptive-placement.js", "Bayesian/probability wording overclaims the model", "Name current system adaptive weighted scoring everywhere", "Static/runtime terminology scan and owner copy review", "Gate A"],
  ["REQ-A-002", "VM551-D003|VM551-D007|VM551-D023", "26,891 paths + runtime trace; downstream-compatibility-contract.md; result-field-consumer-map.csv", "Numeric shares/fabricated defaults imply calibrated certainty and an unbounded removal could break ranking replay persistence dossier Matrix recommendation adjacent deck-link and Maze consumers", "Remove public numeric confidence, probability, correctness, and strength claims; preserve internal scores, softmax shares, gaps, ranking/stopping inputs, existing serialized field names/shapes, cache/profile/saved/legacy/OAuth/dossier/recommendation/deck-link/adjacent/Maze consumers, authored Matrix values, and the separate placement-derived mana-alignment payload; keep legacy missing confidence unknown; introduce only additive bounded public result states with backward-compatible normalization; prohibit implementation planning until the complete consumer map is independently reviewed and no UNRESOLVED-BLOCKER enters Gate A", "Compatibility validator; field-shape and writer/reader reconciliation; cache/profile/OAuth round trips; saved legacy reading; primary dossier; alternative/adjacent view; recommendation and deck-link rendering; authored Matrix; placement-result mana alignment; Maze handoff; return-to-dossier; legacy missing-confidence unknown; no fabricated numeric fallback; no public numeric confidence output", "Gate A"],
  ["REQ-A-003", "VM551-D005", "333 ties + incomplete/contradictory runtime states", "Hidden tie defaults and unsupported completion fabricate a primary", "Preserve unknown, mixed, contradictory, insufficient, tied, close, invalid, and incomplete result states using existing response/state evidence; do not refit the questionnaire in Gate A", "Decision table, exact/near tie, incomplete, contradictory, invalid, and absent-state scenarios", "Gate A"],
  ["REQ-A-004", "VM551-D006|VM551-D007", "numeric ranks 2/3", "Weak runner-up is mislabeled meaningful adjacency", "Call numeric runners-up close alternatives or omit them; reserve adjacency for reviewed relationship + evidence", "Weak-rank-two, cross-family, guild/college, Colorless/WUBRG tests", "Gate A"],
  ["REQ-A-005", "VM551-D017|VM551-D020", "claim register and traces", "Copy states motivation/deck/table claims beyond answers", "Use only entailed, qualified observation language in first pass", "Trace answer -> claim for every Gate A surface", "Gate A"],
  ["REQ-B1-001", "VM551-D008|VM551-D038", "question quality matrix + 0 uncertainty answers", "Current instrument tests overlapping/abstract constructs and forces directional evidence", "Select the smallest evidence-derived, Commander-relevant, single-construct pilot question slice with explicit unknown/mixed/no-direction handling", "Cognitive review plus 113/356 inclusion/exclusion manifest and uncertainty-state scenarios", "Gate B1"],
  ["REQ-B1-002", "VM551-D009|VM551-D010", "answer matrix", "Effects cannot be stably traced or reviewed", "Stable question/answer/signal IDs and direct/inferred/speculative provenance for every pilot effect", "Schema/reference/hash validation", "Gate B1"],
  ["REQ-B1-003", "VM551-D001|VM551-D004|VM551-D011", "builder + 2,901 below-min paths", "Scoring can ignore identity contracts", "One reviewed scoring authority; executable minimum-hit and false-positive decisions; explicit insufficient state", "Exhaustive all-37 minimum/guardrail tests", "Gate B1"],
  ["REQ-B1-004", "VM551-D039", "11 repeated constructs", "Repeated observations can masquerade as independent evidence", "Controlled dependency groups and contribution caps/disclosure", "Duplicate-construct, order, stopping, and confidence tests", "Gate B1"],
  ["REQ-B1-005", "VM551-D036", "44,005 matched comparisons", "Small answer changes cause unstable primary flips", "Predeclare pilot perturbation thresholds and downgrade unstable results", "All-37/family sensitivity report and scenario trace", "Gate B1"],
  ["REQ-B1-006", "VM551-D040", "distinctiveness matrix + 37 profiles", "Reachability does not prove semantic separation", "Pilot high-risk family contrasts and preserve close/unknown outcomes", "Same-color five pairs; shard/wedge; every four-color; Colorless; WUBRG confusion matrix", "Gate B1"],
  ["REQ-B2-001", "VM551-D012|VM551-D013|VM551-D029|VM551-D032|VM551-D037", "schema/dead branches/manifests", "Coverage and reproducibility remain uneven", "Expand schema, remove dead controls/branches, exact input manifests, and source/generated reconciliation", "Clean-checkout deterministic validation", "Gate B2"],
  ["REQ-C-001", "VM551-D018|VM551-D019|VM551-D021|VM551-D022|VM551-D031", "copy/recommendation corpus", "Interpretation and recommendation quality can mislead", "Claim-specific copy and evidence-typed, unresolved-safe recommendations", "All-37 copy/recommendation review; local legality status", "Gate C"],
  ["REQ-C-002", "VM551-D024|VM551-D025|VM551-D026|VM551-D027|VM551-D028", "runtime rendering observations", "State/route/accessibility presentation reduces trust", "Repair state disclosure, deep-link semantics, headings, and mobile controls", "Desktop/mobile/a11y/state matrix", "Gate C"],
  ["REQ-D-001", "VM551-D030|VM551-D033|VM551-D034", "test baseline limitations", "Long-term regression and calibration remain incomplete", "Self-contained exhaustive automation, reviewed visual baselines, empirical calibration, and later certification tooling", "Independent exact-SHA rerun and separately authorized certification", "Gate D"],
].map(([requirement_id, finding_ids, evidence, risk, requirement, validation, gate]) => ({ requirement_id, finding_ids, evidence, risk, requirement, validation, gate }));

const cecosRepo = "C:\\dev\\Commander_Questions_Corpus";
const cecosCommit = "947bf45bf6a191839b5fb4fa6c65980ed9d5737e";
const cecosPath = "docs/standards/cecos/CECOS-v1.0.0-draft.4.md";
const show = spawnSync("git", ["-C", cecosRepo, "-c", "safe.directory=C:/dev/Commander_Questions_Corpus", "show", `${cecosCommit}:${cecosPath}`], { encoding: null });
if (show.status !== 0) throw new Error(show.stderr.toString("utf8"));
const observedCecosHash = crypto.createHash("sha256").update(show.stdout).digest("hex");
const requiredCecosHash = "dd3c266771f7724589a5d7bd881143a8c0a7372218cd167fccf5f8173da738f3";
if (observedCecosHash !== requiredCecosHash) throw new Error(`CECOS checksum mismatch: ${observedCecosHash}`);

const preservedArtifacts = [
  "docs/audits/vm551-placement-system/analysis-summary.json",
  "docs/audits/vm551-placement-system/question-to-signal-matrix.csv",
  "docs/audits/vm551-placement-system/identity-reachability-opportunity-matrix.csv",
  "docs/audits/vm551-placement-system/copy-comparison-corpus.json",
  "docs/audits/vm551-placement-system/copy-comparison-pairs.csv",
  "docs/audits/vm551-placement-system/claim-evidence-register.csv",
];
const reconciliationStart = "797fb14d08209c310dbc0087a3940e0a74edf21d";
function hashGitArtifact(commit, relativePath) {
  const result = spawnSync("git", ["-c", "safe.directory=C:/dev/voxmana.io-vm551-placement-system-audit", "show", `${commit}:${relativePath}`], { cwd: repoRoot, encoding: null, maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`Cannot hash ${relativePath} at ${commit}: ${result.stderr.toString("utf8")}`);
  return crypto.createHash("sha256").update(result.stdout).digest("hex");
}
const auditInputManifest = {
  generated_at: "2026-08-01",
  audit_base: "2b4058ff4c769f03d52070204b3ce973e51decbd",
  rejected_audit_sha: "c62c7e1b43421359488537457804698a77656952",
  cecos: { repository: cecosRepo, commit: cecosCommit, path: cecosPath, sha256: observedCecosHash, verification: "PASS" },
  runtime_inputs: ["data/placement-model.json", "data/factions.json", "assets/js/adaptive-placement.js", "assets/js/commander-dossier.js", "assets/js/archscry-presentation.js"].map((relativePath) => ({ path: relativePath, sha256: hashFile(relativePath) })),
  preserved_artifacts: preservedArtifacts.map((relativePath) => {
    const startingWorkflowSha256 = hashGitArtifact(reconciliationStart, relativePath);
    const currentSha256 = hashFile(relativePath);
    const intentionallyCorrected = relativePath.endsWith("identity-reachability-opportunity-matrix.csv");
    return {
      path: relativePath,
      sha256: currentSha256,
      starting_workflow_sha256: startingWorkflowSha256,
      byte_reproduction: currentSha256 === startingWorkflowSha256
        ? "PASS: byte-identical to accepted remediation starting point"
        : intentionallyCorrected
          ? "INTENTIONAL RECONCILIATION CORRECTION: only the stale can-win-with-zero-positive-evidence bias indicator was relabeled as a withdrawn historical invalid-counter marker; quantitative fields were not changed"
          : "FAIL: unexplained change",
    };
  }),
  prohibited_inputs: ["web browsing", "uncommitted production data", "working-tree CECOS substitution"],
};

const summary = {
  authority: auditInputManifest.cecos,
  preserved_counts: {
    identities: factionKeys.length,
    questions: questionRows.length,
    answers: answerRows.length,
    terminal_paths: terminalRecords.length,
    exact_top_ties: sensitivity.exact_top_ties,
  },
  question_dispositions: questionDispositionSummary,
  identity_distinctiveness: {
    rows: identityRows.length,
    dispositions: Object.fromEntries([...new Set(identityRows.map((row) => row.distinctiveness_disposition))].map((value) => [value, identityRows.filter((row) => row.distinctiveness_disposition === value).length])),
  },
  scenarios: {
    profiles: profileScenarios.length,
    profile_dispositions: Object.fromEntries([...new Set(profileScenarios.map((row) => row.final_disposition))].map((value) => [value, profileScenarios.filter((row) => row.final_disposition === value).length])),
    profile_scoring_outcomes: Object.fromEntries([...new Set(profileScenarios.map((row) => row.scoring_outcome))].map((value) => [value, profileScenarios.filter((row) => row.scoring_outcome === value).length])),
    profile_origins: Object.fromEntries([...new Set(profileScenarios.map((row) => row.scenario_origin))].map((value) => [value, profileScenarios.filter((row) => row.scenario_origin === value).length])),
    adversarial: adversarialRows.length,
    adversarial_dispositions: Object.fromEntries([...new Set(adversarialRows.map((row) => row.final_disposition))].map((value) => [value, adversarialRows.filter((row) => row.final_disposition === value).length])),
  },
  sensitivity: {
    matched_one_answer_terminal_pairs: neighborPairs,
    primary_flips: primaryFlips,
    normalized_primary_flip_sensitivity: sensitivity.normalized_primary_flip_sensitivity,
    negative_only_winners: sensitivity.negative_only_winner_total,
    below_strong_minimum_hit_proxy: sensitivity.below_strong_minimum_hit_proxy_total,
    dead_questions: deadQuestions.length,
    dead_answers: deadAnswers.length,
    repeated_construct_groups: repeatedSignalRows.length,
  },
  remediated_defects: {
    total: remediatedDefects.length,
    by_severity: Object.fromEntries(["Critical", "High", "Medium", "Low"].map((severity) => [severity, remediatedDefects.filter((row) => row.severity === severity).length])),
    original_ids_preserved: rejectedDefects.length,
    new_ids: newDefects.length,
  },
  correction: {
    rejected_positive_evidence_metric: "WITHDRAWN: inspected nonexistent evidence_trail entry.faction",
    replacement_metrics: ["positive score-hit count from entry.deltas", "strong authored hit count from selected answer likelihood >= 0.75", "negative-only winner count requiring both counts zero"],
  },
  limitations: [
    "No empirical player-response, correctness, calibration, prevalence, or statistical-correlation dataset exists.",
    "Question and distinctiveness dispositions are deterministic audit adjudications requiring owner and later independent review.",
    "Free-text false-positive guardrails cannot be exhaustively counted as passed or violated without executable predicates.",
    "All 37 current profile probes are golden-path-derived and incomplete because they lack an independently selected neighboring and mixed/uncertain challenge; their exact-primary scoring outcomes are reachability evidence only.",
  ],
};

writeCsv("question-quality-adjudication.csv", questionRows);
writeCsv("answer-quality-adjudication.csv", answerRows);
writeJson("question-disposition-summary.json", questionDispositionSummary);
writeCsv("identity-distinctiveness-matrix.csv", identityRows);
writeCsv("profile-scenario-matrix.csv", profileScenarios);
writeJson("profile-scenario-details.json", profileScenarios);
writeCsv("adversarial-scenario-matrix.csv", adversarialRows);
writeJson("sensitivity-dependency-collision-analysis.json", sensitivity);
writeCsv("repeated-signal-dependency-audit.csv", repeatedSignalRows);
writeCsv("evidence-integration-matrix.csv", evidenceIntegrationRows);
writeJson("explanation-trace-audit.json", traces);
writeCsv("cecos-conclusion-adjudication.csv", conclusionRows);
writeCsv("defect-register-remediated.csv", remediatedDefects);
writeCsv("requirements-traceability-matrix.csv", requirementRows);
writeJson("audit-input-manifest.json", auditInputManifest);
writeJson("remediation-analysis-summary.json", summary);

console.log(JSON.stringify(summary, null, 2));

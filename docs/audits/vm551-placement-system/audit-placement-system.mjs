import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  rankAdaptiveFactions,
  runAdaptiveGoldenPath,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
} from "../../../assets/js/adaptive-placement.js";
import {
  auditCommanderDossier,
  buildCommanderDossier,
  buildPreconRecommendations,
  collectCommanderPreviewCandidates,
  createArchidektTagCatalog,
  renderCommanderDossierText,
} from "../../../assets/js/commander-dossier.js";
import {
  buildContrastCopy,
  buildHeroNarrative,
  buildReadingSignalCopy,
  presentationForFaction,
  selectReadingTagRefs,
} from "../../../assets/js/archscry-presentation.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const placementModel = readJson("data/placement-model.json");
const factions = readJson("data/factions.json").factions;
const deckTagCatalog = createArchidektTagCatalog(readJson("data/deck-tags_expanded.json"));
const taxonomy = readJson("data/taxonomy/vox-mana-tags.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const factionKeys = Object.keys(placementModel.factions).sort();

function csvCell(value) {
  const text = Array.isArray(value) || (value && typeof value === "object")
    ? JSON.stringify(value)
    : String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filename, rows, columns) {
  const lines = [columns.join(",")];
  for (const row of rows) lines.push(columns.map((column) => csvCell(row[column])).join(","));
  fs.writeFileSync(path.join(scriptDir, filename), `${lines.join("\n")}\n`, "utf8");
}

function round(value, digits = 6) {
  return Number(Number(value || 0).toFixed(digits));
}

function questionAnswerId(question, answer, answerIndex) {
  return answer.id || `${question.id}#answer-${answerIndex + 1}`;
}

function deltaFor(likelihood) {
  const entries = Object.entries(placementModel.scoring_rules?.likelihood_to_delta || {})
    .map(([key, value]) => [Number(key), Number(value)])
    .sort((a, b) => Math.abs(Number(likelihood) - a[0]) - Math.abs(Number(likelihood) - b[0]));
  return entries[0]?.[1] || 0;
}

function classifyAnswerDimension(question, answer) {
  const text = `${question.prompt} ${answer.title} ${answer.copy} ${answer.signal}`.toLowerCase();
  const dimensions = [];
  if (/commander|deck|card|mana|combat|spell|resource|graveyard|board|turn|attack/.test(text)) dimensions.push("gameplay-or-deck-behavior");
  if (/group|people|community|table|trust|belong|duty|accountab|protect|shared|reputation|public/.test(text)) dimensions.push("social-behavior");
  if (/want|desire|hunger|fear|feel|appetite|risk|agency|motivat|satisf/.test(text)) dimensions.push("psychographic-motivation");
  if (/beaut|aesthetic|spectacle|art|style|voice|story|symbol|myth|ritual/.test(text)) dimensions.push("aesthetic-or-narrative-preference");
  if (/order|freedom|growth|knowledge|ambition|covenant|moral|principle|meaning|oath|truth/.test(text)) dimensions.push("philosophical-preference");
  return dimensions.length ? dimensions : ["abstract-scenario-preference"];
}

const allQuestions = ["gate", "hall", "crucible"].flatMap((stage) =>
  (placementModel.question_bank?.[stage] || []).map((question) => ({ ...question, stage }))
);

const questionRows = [];
for (const question of allQuestions) {
  question.answers.forEach((answer, answerIndex) => {
    const positive = Object.entries(answer.likelihoods || {}).map(([key, likelihood]) => ({
      identity: key,
      likelihood: Number(likelihood),
      delta: deltaFor(likelihood),
    }));
    const negative = Object.entries(answer.suppresses || {}).map(([key, likelihood]) => ({
      identity: key,
      likelihood: Number(likelihood),
      delta: deltaFor(likelihood),
    }));
    questionRows.push({
      stage: question.stage,
      question_id: question.id,
      source_answer_id: answer.id || "",
      audit_answer_id: questionAnswerId(question, answer, answerIndex),
      question_target: question.faction || (question.pair || []).join("|") || "all identities",
      player_facing_prompt: question.prompt,
      player_facing_title: answer.title,
      player_facing_copy: answer.copy,
      intended_meaning: answer.signal || answer.title,
      player_dimension: classifyAnswerDimension(question, answer),
      mapping_method: question.stage === "gate"
        ? "Inferred: authored W/U/B/R/G/outside/integration loadings are propagated to identity deltas by the builder."
        : "Direct editorial assignment: the builder copies hard-coded identity likelihoods and suppressions into the live model.",
      actual_positive_effects: positive,
      actual_negative_effects: negative,
      positive_identity_count: positive.length,
      negative_identity_count: negative.length,
      maximum_positive_delta: Math.max(0, ...positive.map((item) => item.delta)),
      minimum_negative_delta: Math.min(0, ...negative.map((item) => item.delta)),
      confidence_effect: "Indirect: changes arbitrary additive scores; softmax share and top-two gap are recomputed from the entire score vector.",
      neutral_or_mixed_handling: "No explicit neutral, unsure, none, or mixed option is present in this question.",
      evidence_classification: "Editorial interpretation; no answer-level claim or source reference is present in the live model.",
      defect_flags: [
        !answer.id ? "missing-stable-answer-id" : "",
        !answer.signal ? "missing-controlled-signal" : "",
        positive.length > 5 ? "broad-multi-identity-effect" : "",
        positive.length === 0 ? "no-positive-placement-information" : "",
        negative.some((item) => item.delta >= 0) ? "suppression-not-negative" : "",
      ].filter(Boolean).join("|"),
      requirement_implications: "Assign a stable answer ID, controlled signal contract, evidence classification, explicit positive/negative contract, correlation group, and confidence contribution rule.",
    });
  });
}

const identityStats = Object.fromEntries(factionKeys.map((key) => [key, {
  primaryCount: 0,
  adjacent2Count: 0,
  adjacent3Count: 0,
  exactTiePrimaryCount: 0,
  minPrimaryConfidence: Infinity,
  maxPrimaryConfidence: -Infinity,
  minPrimaryGap: Infinity,
  maxPrimaryGap: -Infinity,
  minPositiveEvidence: Infinity,
  maxPositiveEvidence: -Infinity,
}]));

const pathStats = {
  terminalPaths: 0,
  exactTopScoreTies: 0,
  exactTopProbabilityTies: 0,
  confidenceSum: 0,
  gapSum: 0,
  minConfidence: Infinity,
  maxConfidence: -Infinity,
  minGap: Infinity,
  maxGap: -Infinity,
  stagePatternCounts: {},
  questionCountCounts: {},
  topPairCounts: {},
};

function countPositiveEvidence(state, factionKey) {
  return (state.evidence_trail || []).filter((entry) =>
    entry.faction === factionKey && Number(entry.delta) > 0
  ).length;
}

function recordTerminal(state) {
  const ranked = rankAdaptiveFactions(state, placementModel);
  const result = buildAdaptivePlacementResult({ state, model: placementModel, factions });
  const top = ranked[0];
  const second = ranked[1];
  const third = ranked[2];
  const confidence = Number(result.confidence);
  const gap = Number(result.confidence_gap);
  const exactScoreTie = Boolean(second && Math.abs(top.score - second.score) < 1e-12);
  const exactProbabilityTie = Boolean(second && Math.abs(top.probability - second.probability) < 1e-12);
  const totalQuestions = Object.values(state.stage_counts || {}).reduce((sum, count) => sum + count, 0);
  const stagePattern = `G${state.stage_counts?.gate || 0}-H${state.stage_counts?.hall || 0}-C${state.stage_counts?.crucible || 0}`;
  const pairKey = `${top.faction}>${second?.faction || "none"}`;
  const positiveEvidence = countPositiveEvidence(state, top.faction);

  pathStats.terminalPaths += 1;
  pathStats.exactTopScoreTies += exactScoreTie ? 1 : 0;
  pathStats.exactTopProbabilityTies += exactProbabilityTie ? 1 : 0;
  pathStats.confidenceSum += confidence;
  pathStats.gapSum += gap;
  pathStats.minConfidence = Math.min(pathStats.minConfidence, confidence);
  pathStats.maxConfidence = Math.max(pathStats.maxConfidence, confidence);
  pathStats.minGap = Math.min(pathStats.minGap, gap);
  pathStats.maxGap = Math.max(pathStats.maxGap, gap);
  pathStats.stagePatternCounts[stagePattern] = (pathStats.stagePatternCounts[stagePattern] || 0) + 1;
  pathStats.questionCountCounts[totalQuestions] = (pathStats.questionCountCounts[totalQuestions] || 0) + 1;
  pathStats.topPairCounts[pairKey] = (pathStats.topPairCounts[pairKey] || 0) + 1;

  const stats = identityStats[top.faction];
  stats.primaryCount += 1;
  stats.exactTiePrimaryCount += exactScoreTie ? 1 : 0;
  stats.minPrimaryConfidence = Math.min(stats.minPrimaryConfidence, confidence);
  stats.maxPrimaryConfidence = Math.max(stats.maxPrimaryConfidence, confidence);
  stats.minPrimaryGap = Math.min(stats.minPrimaryGap, gap);
  stats.maxPrimaryGap = Math.max(stats.maxPrimaryGap, gap);
  stats.minPositiveEvidence = Math.min(stats.minPositiveEvidence, positiveEvidence);
  stats.maxPositiveEvidence = Math.max(stats.maxPositiveEvidence, positiveEvidence);
  if (second) identityStats[second.faction].adjacent2Count += 1;
  if (third) identityStats[third.faction].adjacent3Count += 1;
}

function enumerate(state) {
  const question = selectNextAdaptiveQuestion(state, placementModel);
  if (!question || shouldFinishAdaptiveReading(state, placementModel)) {
    recordTerminal(state);
    return;
  }
  question.answers.forEach((answer, answerIndex) => {
    const nextState = applyAdaptiveAnswer({ state, model: placementModel, question, answer, answerIndex });
    enumerate(nextState);
  });
}

enumerate(createInitialAdaptiveState(placementModel));

const corpus = [];
const dossierByIdentity = {};
for (const key of factionKeys) {
  const golden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: key });
  const dossier = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    placementResult: golden.result,
    targetFactionKey: key,
    starterProfile: golden.result.starter_profile,
    summaryPresentationForFaction: presentationForFaction,
    summaryContrastCopyBuilder: buildContrastCopy,
  });
  const presentation = presentationForFaction(key);
  const hero = buildHeroNarrative({ dossier, faction: factions[key], result: golden.result, factions });
  const readingSignal = buildReadingSignalCopy({ dossier, faction: factions[key], result: golden.result, factions });
  const readingTagRefs = selectReadingTagRefs({
    dossier,
    result: golden.result,
    taxonomy,
    modelMechanics: placementModel.factions[key]?.identity?.mechanics || "",
  });
  const precons = buildPreconRecommendations({
    faction: factions[key],
    dossier,
    readingTagRefs,
    starterProfile: golden.result.starter_profile,
    preconCatalog,
    preconThemeTaxonomy,
  });
  const commanderCandidates = collectCommanderPreviewCandidates(factions[key], { limit: 10 });
  const dossierAudit = auditCommanderDossier(dossier);
  const entry = {
    identity: key,
    name: factions[key]?.name || key,
    golden_primary: golden.result.faction,
    golden_confidence: golden.result.confidence,
    golden_confidence_gap: golden.result.confidence_gap,
    golden_adjacent: (golden.result.adjacent_matches || []).map((match) => match.faction),
    golden_question_count: golden.selections.length,
    golden_questions: golden.selections.map(({ question, answer, answerIndex }) => ({
      question_id: question.id,
      answer_id: questionAnswerId(question, answer, answerIndex),
      answer_title: answer.title,
    })),
    decree: golden.result.decree,
    result_status: dossier.resultStatus,
    hero,
    reading_signal: readingSignal,
    result_summary_strip: dossier.resultSummaryStrip,
    commander_path: dossier.commanderPath,
    reading_omens: dossier.readingOmens,
    archetypes: dossier.archetypes,
    commander_recommendations: dossier.commanderRecommendations,
    commander_candidate_pool: commanderCandidates,
    precon_recommendations: precons,
    presentation,
    dossier_audit: dossierAudit,
    rendered_text: renderCommanderDossierText(dossier),
  };
  corpus.push(entry);
  dossierByIdentity[key] = entry;
}

function normalizeCopy(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(?:white|blue|black|red|green|azorius|dimir|rakdos|gruul|selesnya|orzhov|izzet|golgari|boros|simic|lorehold|prismari|quandrix|silverquill|witherbloom|bant|esper|grixis|jund|naya|abzan|jeskai|sultai|temur|mardu|dune|glint|ink|witch|yore|colorless|wubrg)\b/g, " identity ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenJaccard(left, right) {
  const a = new Set(normalizeCopy(left).split(" ").filter(Boolean));
  const b = new Set(normalizeCopy(right).split(" ").filter(Boolean));
  const union = new Set([...a, ...b]);
  if (!union.size) return 1;
  return [...a].filter((token) => b.has(token)).length / union.size;
}

const copyPairs = [];
for (let i = 0; i < corpus.length; i += 1) {
  for (let j = i + 1; j < corpus.length; j += 1) {
    const fields = ["decree", "hero", "reading_signal", "rendered_text"];
    for (const field of fields) {
      const left = corpus[i][field];
      const right = corpus[j][field];
      const normalizedExact = normalizeCopy(left) === normalizeCopy(right);
      const similarity = tokenJaccard(left, right);
      if (normalizedExact || similarity >= 0.65) {
        copyPairs.push({
          field,
          left_identity: corpus[i].identity,
          right_identity: corpus[j].identity,
          normalized_exact: normalizedExact,
          token_jaccard: round(similarity),
        });
      }
    }
  }
}

function supportCounts(identity) {
  let supportingAnswers = 0;
  let strongSupportingAnswers = 0;
  let opposingAnswers = 0;
  const byStage = { gate: 0, hall: 0, crucible: 0 };
  for (const question of allQuestions) {
    for (const answer of question.answers) {
      const likelihood = Number(answer.likelihoods?.[identity] || 0);
      const suppression = Number(answer.suppresses?.[identity] || 0);
      if (likelihood > 0) {
        supportingAnswers += 1;
        byStage[question.stage] += 1;
      }
      if (likelihood >= 0.75) strongSupportingAnswers += 1;
      if (suppression > 0 || (answer.prunes || []).includes(identity)) opposingAnswers += 1;
    }
  }
  return { supportingAnswers, strongSupportingAnswers, opposingAnswers, byStage };
}

const identityRows = factionKeys.map((key) => {
  const support = supportCounts(key);
  const stats = identityStats[key];
  const dossierEntry = dossierByIdentity[key];
  const hallQuestions = (placementModel.question_bank?.hall || []).filter((question) => question.faction === key).length;
  const crucibleQuestions = (placementModel.question_bank?.crucible || []).filter((question) => (question.pair || []).includes(key)).length;
  const primaryShare = stats.primaryCount / pathStats.terminalPaths;
  const supportingQuestionIds = allQuestions.filter((question) => question.answers.some((answer) => Number(answer.likelihoods?.[key] || 0) > 0)).map((question) => question.id);
  const opposingQuestionIds = allQuestions.filter((question) => question.answers.some((answer) => Number(answer.suppresses?.[key] || 0) > 0 || (answer.prunes || []).includes(key))).map((question) => question.id);
  const axes = placementModel.factions[key]?.placement_axes || {};
  return {
    identity: key,
    canonical_name: factions[key]?.name || key,
    institution_type: factions[key]?.institution_type || "",
    colors: factions[key]?.colors || [],
    behavioral_definition_used_by_placement_metadata: placementModel.factions[key]?.identity?.summary || "",
    primary_boundary_or_tension: placementModel.factions[key]?.identity?.central_tension || "",
    supporting_question_ids: supportingQuestionIds,
    opposing_question_ids: opposingQuestionIds,
    required_positive_min_hits_in_metadata: axes.required_positive_min_hits ?? "",
    required_positive_min_hits_enforced_by_runtime: false,
    false_positive_guardrail_in_metadata: axes.false_positive_guardrail || "",
    supporting_answer_count: support.supportingAnswers,
    strong_supporting_answer_count: support.strongSupportingAnswers,
    opposing_answer_count: support.opposingAnswers,
    gate_supporting_answer_count: support.byStage.gate,
    hall_supporting_answer_count: support.byStage.hall,
    crucible_supporting_answer_count: support.byStage.crucible,
    targeted_hall_question_count: hallQuestions,
    targeted_crucible_question_count: crucibleQuestions,
    exhaustive_primary_count: stats.primaryCount,
    exhaustive_primary_share: round(primaryShare),
    exhaustive_rank2_count: stats.adjacent2Count,
    exhaustive_rank3_count: stats.adjacent3Count,
    reachability_status: stats.primaryCount > 0 ? "reachable-in-exhaustive-valid-paths" : "unreachable-in-exhaustive-valid-paths",
    minimum_positive_evidence_when_primary: Number.isFinite(stats.minPositiveEvidence) ? stats.minPositiveEvidence : "",
    maximum_positive_evidence_when_primary: Number.isFinite(stats.maxPositiveEvidence) ? stats.maxPositiveEvidence : "",
    minimum_primary_confidence: Number.isFinite(stats.minPrimaryConfidence) ? round(stats.minPrimaryConfidence, 3) : "",
    maximum_primary_confidence: Number.isFinite(stats.maxPrimaryConfidence) ? round(stats.maxPrimaryConfidence, 3) : "",
    exhaustive_maximum_primary_probability: Number.isFinite(stats.maxPrimaryConfidence) ? round(stats.maxPrimaryConfidence, 3) : "",
    minimum_primary_gap: Number.isFinite(stats.minPrimaryGap) ? round(stats.minPrimaryGap, 3) : "",
    maximum_primary_gap: Number.isFinite(stats.maxPrimaryGap) ? round(stats.maxPrimaryGap, 3) : "",
    exact_tie_primary_count: stats.exactTiePrimaryCount,
    golden_path_primary: dossierEntry.golden_primary,
    golden_path_confidence: dossierEntry.golden_confidence,
    copy_complete: dossierEntry.dossier_audit.failures.length === 0,
    copy_audit_status: dossierEntry.dossier_audit.status,
    commander_recommendation_count: dossierEntry.commander_recommendations.length,
    commander_candidate_pool_count: dossierEntry.commander_candidate_pool.length,
    native_exact_precon_count: dossierEntry.precon_recommendations.nativeExact.length,
    other_exact_precon_count: dossierEntry.precon_recommendations.otherExact.length,
    stretch_precon_count: dossierEntry.precon_recommendations.stretch.length,
    copy_source: "data/factions.json + data/placement-model.json + hard-coded assets/js/archscry-presentation.js and assets/js/commander-dossier.js templates",
    recommendation_source: "Curated factions.json commander_compass/deck_links/staples + deck tags + generated precon catalog/taxonomy; not selected from per-answer evidence.",
    known_semantic_risk: "Recovered identity semantics and guardrails are carried as model metadata, but the live Hall/Crucible likelihood bank is hard-coded separately and the minimum-hit contract is not enforced.",
    evidence_strength: "Live question effects have no answer-level provenance; identity records contain reviewed evidence metadata that is not a live scoring contract.",
    bias_indicators: [
      primaryShare > (1 / factionKeys.length) * 2 ? "primary-share-over-2x-uniform" : "",
      stats.primaryCount === 0 ? "unreachable-primary" : "",
      hallQuestions === 0 ? "no-targeted-hall-question" : "",
      stats.minPositiveEvidence === 0 ? "withdrawn-historical-positive-evidence-counter-invalid-see-remediation" : "",
    ].filter(Boolean).join("|"),
  };
});

const claimRows = [];
for (const key of factionKeys) {
  const rawId = placementModel.factions[key]?.raw_id;
  const claimsDoc = readJson(`data/raw-factions/${rawId}/${rawId}.claims.json`);
  const sourcesDoc = readJson(`data/raw-factions/${rawId}/${rawId}.sources.json`);
  const sourceById = new Map((sourcesDoc.sources || []).map((source) => [source.source_id, source]));
  for (const claim of claimsDoc.claims || []) {
    const sources = (claim.source_ids || []).map((id) => sourceById.get(id)).filter(Boolean);
    const sourceTypes = [...new Set(sources.map((source) => source.source_type || source.source_role || "unknown"))];
    const official = sources.length > 0 && sources.every((source) => /official|primary|wizards/i.test(`${source.source_type} ${source.source_role} ${source.publisher}`));
    const classification = official
      ? "Officially supported within the raw identity corpus"
      : sources.length
        ? "Internal synthesis or editorial interpretation grounded in cited sources"
        : "Missing provenance in raw claim record";
    claimRows.push({
      identity: key,
      raw_identity_id: rawId,
      claim_id: claim.claim_id,
      statement: claim.statement,
      semantic_role: claim.semantic_role || "",
      canon_status: claim.canon_status || "",
      confidence: claim.confidence || "",
      source_ids: claim.source_ids || [],
      source_types: sourceTypes,
      evidence_locations: claim.evidence_locations || [],
      evidence_classification: classification,
      public_claim_suitability: official
        ? "Potentially suitable when scope matches the cited evidence"
        : "Requires editorial qualification and an explicit Commander-behavior interpretive bridge",
      live_scoring_link: "None: live answer likelihoods do not reference claim IDs.",
    });
  }
}

for (const row of questionRows) {
  claimRows.push({
    identity: row.question_target,
    raw_identity_id: "",
    claim_id: `live-answer:${row.audit_answer_id}`,
    statement: `${row.player_facing_title}: ${row.player_facing_copy}`,
    semantic_role: "placement-answer-and-signal",
    canon_status: "not-declared",
    confidence: "not-declared",
    source_ids: [],
    source_types: [],
    evidence_locations: [],
    evidence_classification: row.evidence_classification,
    public_claim_suitability: "Useful heuristic only until an answer-to-evidence contract is reviewed.",
    live_scoring_link: JSON.stringify({ positive: row.actual_positive_effects, negative: row.actual_negative_effects }),
  });
}

const summary = {
  audit_date: "2026-08-01",
  model_version: placementModel._meta?.model_version,
  identity_count: factionKeys.length,
  question_count: allQuestions.length,
  answer_count: questionRows.length,
  stage_counts: Object.fromEntries(["gate", "hall", "crucible"].map((stage) => [stage, {
    questions: (placementModel.question_bank?.[stage] || []).length,
    answers: (placementModel.question_bank?.[stage] || []).reduce((sum, question) => sum + question.answers.length, 0),
  }])),
  path_analysis: {
    ...pathStats,
    average_confidence: round(pathStats.confidenceSum / pathStats.terminalPaths),
    average_gap: round(pathStats.gapSum / pathStats.terminalPaths),
    confidenceSum: undefined,
    gapSum: undefined,
  },
  reachability: {
    primary_reachable_count: identityRows.filter((row) => row.exhaustive_primary_count > 0).length,
    primary_unreachable: identityRows.filter((row) => row.exhaustive_primary_count === 0).map((row) => row.identity),
    adjacent_rank2_reachable_count: identityRows.filter((row) => row.exhaustive_rank2_count > 0).length,
    adjacent_rank3_reachable_count: identityRows.filter((row) => row.exhaustive_rank3_count > 0).length,
  },
  answer_contracts: {
    answers_missing_stable_id: questionRows.filter((row) => !row.source_answer_id).length,
    answers_missing_controlled_signal: questionRows.filter((row) => row.defect_flags.includes("missing-controlled-signal")).length,
    answers_with_no_positive_effect: questionRows.filter((row) => row.positive_identity_count === 0).length,
    answers_with_more_than_five_positive_effects: questionRows.filter((row) => row.positive_identity_count > 5).length,
    answer_level_provenance_links: 0,
  },
  copy_analysis: {
    corpus_identity_count: corpus.length,
    normalized_exact_or_near_duplicate_pairs: copyPairs.length,
    normalized_exact_pairs: copyPairs.filter((pair) => pair.normalized_exact).length,
    dossier_failures: corpus.filter((entry) => entry.dossier_audit.failures.length).map((entry) => entry.identity),
    dossier_warnings: corpus.filter((entry) => entry.dossier_audit.warnings.length).map((entry) => entry.identity),
  },
  claim_register: {
    row_count: claimRows.length,
    raw_claim_rows: claimRows.filter((row) => !row.claim_id.startsWith("live-answer:")).length,
    live_answer_rows: questionRows.length,
    live_answer_rows_with_claim_links: 0,
  },
};

writeCsv("question-to-signal-matrix.csv", questionRows, Object.keys(questionRows[0]));
writeCsv("identity-reachability-opportunity-matrix.csv", identityRows, Object.keys(identityRows[0]));
writeCsv("copy-comparison-pairs.csv", copyPairs, Object.keys(copyPairs[0] || { field: "" }));
writeCsv("claim-evidence-register.csv", claimRows, Object.keys(claimRows[0]));
fs.writeFileSync(path.join(scriptDir, "copy-comparison-corpus.json"), `${JSON.stringify(corpus, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(scriptDir, "analysis-summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(JSON.stringify(summary, null, 2));

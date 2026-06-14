import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";

import {
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  rankAdaptiveFactions,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
} from "../assets/js/adaptive-placement.js";
import {
  auditCommanderDossier,
  buildCommanderDossier,
  createArchidektTagCatalog,
  getExternalDeckRoutingAlias,
  renderCommanderDossierText,
} from "../assets/js/commander-dossier.js";
import {
  adjacentMatchForSummary,
  buildArchscryMazeContext,
  buildContrastCopy,
  buildHeroNarrative,
  buildPersonalizedMazePaths,
  buildReadingSignalCopy,
  buildTagExplanationSummaries,
  selectReadingTagRefs,
  technicalSignalCopy,
  withArchscryMazeContext,
} from "../assets/js/archscry-presentation.js";

export const SNAPSHOT_SCHEMA_VERSION = "presentation-snapshot-v1";
export const PRESENTATION_SNAPSHOT_DIR = new URL("../artifacts/presentation-snapshots/", import.meta.url);
export const PRESENTATION_CASES_URL = new URL("./presentation-snapshot-cases.json", import.meta.url);

const CSV_COLUMNS = [
  "case_id",
  "case_name",
  "answers_json",
  "primary_key",
  "primary_name",
  "primary_expression_kind",
  "adjacent_1_key",
  "adjacent_1_name",
  "adjacent_2_key",
  "adjacent_2_name",
  "core_identity",
  "secondary_identity",
  "expression_key",
  "expression_name",
  "purity",
  "signal_strength",
  "edhrec_link",
  "mtgdecks_link",
  "commander_1",
  "commander_2",
  "commander_3",
  "maze_path_count",
  "authored_vs_fallback_summary",
  "warning_count",
];

async function readJson(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

export async function loadPresentationSnapshotInputs() {
  const [factionData, placementModel, deckTagData, taxonomy, fixtureData] = await Promise.all([
    readJson(new URL("../data/factions.json", import.meta.url)),
    readJson(new URL("../data/placement-model.json", import.meta.url)),
    readJson(new URL("../data/deck-tags_expanded.json", import.meta.url)),
    readJson(new URL("../data/taxonomy/vox-mana-tags.json", import.meta.url)),
    readJson(PRESENTATION_CASES_URL),
  ]);

  return {
    factions: factionData.factions || {},
    placementModel,
    deckTagCatalog: createArchidektTagCatalog(deckTagData),
    taxonomy,
    fixtures: fixtureData.cases || [],
    fixtureSchemaVersion: fixtureData.schema_version || "",
  };
}

function assertFixtureStepMatches({ fixture, step, question, answer }) {
  if (!question) {
    throw new Error(`${fixture.case_id}: placement flow ended before fixed answer ${step.question_id}.`);
  }
  const expectedQuestionId = LEGACY_GATE_QUESTION_IDS[step.question_id] || step.question_id;
  if (question.id !== expectedQuestionId) {
    throw new Error(`${fixture.case_id}: expected question ${step.question_id}, got ${question.id}.`);
  }
  if (!answer) {
    throw new Error(`${fixture.case_id}: question ${question.id} has no answer index ${step.answer_index}.`);
  }
  if (isLegacyGateStep(step)) {
    return;
  }
  if (answer.title !== step.answer_title) {
    throw new Error(`${fixture.case_id}: expected answer title "${step.answer_title}", got "${answer.title}".`);
  }
}

const LEGACY_GATE_QUESTION_IDS = Object.freeze({
  gate_pressure_trust: "gate_v2_locus_of_trust",
  gate_power_shape: "gate_v2_pressure_becomes",
  gate_attention_pattern: "gate_v2_first_signal",
  gate_belonging_cost: "gate_v2_cost_of_oath",
});

function isLegacyGateStep(step) {
  return Object.prototype.hasOwnProperty.call(LEGACY_GATE_QUESTION_IDS, step.question_id);
}

function findQuestionById(placementModel, questionId) {
  return [
    ...(placementModel.question_bank?.gate || []),
    ...(placementModel.question_bank?.hall || []),
    ...(placementModel.question_bank?.crucible || []),
  ].find((question) => question.id === questionId);
}

function selectFixtureQuestion({ fixture, step, state, placementModel }) {
  const normalQuestion = selectNextAdaptiveQuestion(state, placementModel);
  if (isLegacyGateStep(step)) {
    return normalQuestion;
  }
  if (!normalQuestion || normalQuestion.id === step.question_id) {
    return normalQuestion;
  }

  const expectedQuestion = findQuestionById(placementModel, step.question_id);
  const asked = new Set(state.asked_question_ids || []);
  if (expectedQuestion && !asked.has(expectedQuestion.id)) {
    return expectedQuestion;
  }

  return normalQuestion;
}

function targetAwareFixtureAnswerIndex({ fixture, state, placementModel, question }) {
  const target = fixture.expected_primary;
  if (!target || !placementModel.factions?.[target]) {
    return 0;
  }

  let bestIndex = 0;
  let bestRank = Number.POSITIVE_INFINITY;
  let bestScore = Number.NEGATIVE_INFINITY;
  let bestProbability = Number.NEGATIVE_INFINITY;
  let bestDirectLikelihood = 0;
  let bestSuppressesTarget = true;

  (question.answers || []).forEach((answer, index) => {
    const nextState = applyAdaptiveAnswer({
      state,
      model: placementModel,
      question,
      answer,
      answerIndex: index,
    });
    const targetEntry = rankAdaptiveFactions(nextState, placementModel).find(
      (entry) => entry.faction === target
    );
    const targetRank = targetEntry?.rank ?? Number.POSITIVE_INFINITY;
    const targetScore = targetEntry?.score ?? Number.NEGATIVE_INFINITY;
    const targetProbability = targetEntry?.probability ?? Number.NEGATIVE_INFINITY;
    const directLikelihood = Number(answer.likelihoods?.[target] || 0);
    const suppressesTarget = Object.prototype.hasOwnProperty.call(answer.suppresses || {}, target);

    if (
      targetRank < bestRank ||
      (targetRank === bestRank && targetScore > bestScore) ||
      (targetRank === bestRank && targetScore === bestScore && targetProbability > bestProbability) ||
      (targetRank === bestRank &&
        targetScore === bestScore &&
        targetProbability === bestProbability &&
        directLikelihood > bestDirectLikelihood) ||
      (targetRank === bestRank &&
        targetScore === bestScore &&
        targetProbability === bestProbability &&
        directLikelihood === bestDirectLikelihood &&
        bestSuppressesTarget &&
        !suppressesTarget)
    ) {
      bestIndex = index;
      bestRank = targetRank;
      bestScore = targetScore;
      bestProbability = targetProbability;
      bestDirectLikelihood = directLikelihood;
      bestSuppressesTarget = suppressesTarget;
    }
  });

  return bestIndex;
}

function selectFixtureAnswer({ fixture, step, state, placementModel, question }) {
  if (!question) {
    return { answer: null, answerIndex: step.answer_index };
  }
  if (isLegacyGateStep(step)) {
    const answerIndex = targetAwareFixtureAnswerIndex({ fixture, state, placementModel, question });
    return {
      answerIndex,
      answer: question.answers?.[answerIndex] || null,
    };
  }
  return {
    answerIndex: step.answer_index,
    answer: question.answers?.[step.answer_index] || null,
  };
}

export function replayFixedAnswers({ fixture, placementModel, factions }) {
  let state = createInitialAdaptiveState(placementModel);
  const answers = [];

  for (const step of fixture.fixed_answers || []) {
    if (shouldFinishAdaptiveReading(state, placementModel)) {
      break;
    }

    const question = selectFixtureQuestion({ fixture, step, state, placementModel });
    const { answer, answerIndex } = selectFixtureAnswer({ fixture, step, state, placementModel, question });
    assertFixtureStepMatches({ fixture, step, question, answer });

    state = applyAdaptiveAnswer({
      state,
      model: placementModel,
      question,
      answer,
      answerIndex,
    });
    answers.push({
      stage: question.stage,
      question_id: question.id,
      prompt: question.prompt,
      answer_index: answerIndex,
      answer_title: answer.title,
      answer_copy: answer.copy || "",
      signal: answer.signal || answer.title,
    });
  }

  if (!shouldFinishAdaptiveReading(state, placementModel)) {
    throw new Error(`${fixture.case_id}: fixed answers did not finish the placement flow.`);
  }

  const result = buildAdaptivePlacementResult({
    state,
    model: placementModel,
    factions,
  });

  if (fixture.expected_primary && result.faction !== fixture.expected_primary) {
    throw new Error(`${fixture.case_id}: expected primary ${fixture.expected_primary}, got ${result.faction}.`);
  }

  return { state, answers, result };
}

function linkForService(links = [], service) {
  return (links || []).find((link) => link.service === service)?.url || "";
}

function adjacentFamilyGrouping(result, factions) {
  return (result.adjacent_matches || []).map((match) => {
    const faction = factions[match.faction] || match.faction;
    const alias = getExternalDeckRoutingAlias(faction);
    return {
      raw_key: match.faction,
      raw_name: match.faction_name,
      family_color_identity: alias.colorIdentity,
      family_label: alias.label,
      edhrec_link: alias.edhrecUrl,
      mtgdecks_link: alias.mtgDecksUrl,
    };
  });
}

function buildPresentationSummary({ result, dossier, factions, taxonomy }) {
  const faction = dossier.faction.record;
  const modelMechanics = "";
  const tagRefs = selectReadingTagRefs({ dossier, result, taxonomy, modelMechanics });
  const tag_explanations = buildTagExplanationSummaries({
    tagRefs,
    faction,
    taxonomy,
  });
  const mazeContext = buildArchscryMazeContext({ result, dossier, faction });
  const maze_paths = withArchscryMazeContext(
    buildPersonalizedMazePaths({ faction, tagRefs, taxonomy }),
    mazeContext
  );
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const adjacentFaction = adjacent?.faction ? factions[adjacent.faction] : null;

  return {
    hero_thesis: buildHeroNarrative({ dossier, faction, result, factions }),
    why_rose_first: {
      title: dossier.isPrimary ? `Why ${faction.name} Rose First` : `${faction.name} As Adjacent Fit`,
      copy: buildReadingSignalCopy({ dossier, faction, result, factions }),
      technical_signal: technicalSignalCopy(result, dossier.targetFactionKey),
    },
    adjacent_or_fork: {
      adjacent_key: adjacent?.faction || "",
      adjacent_name: adjacent?.faction_name || "",
      copy: adjacentFaction
        ? buildContrastCopy(dossier.isPrimary ? faction : factions[dossier.primaryFactionKey], dossier.isPrimary ? adjacentFaction : faction)
        : "",
    },
    tag_refs: tagRefs,
    tag_explanations,
    commander_path_summary: {
      title: dossier.commanderPath?.title || "",
      copy: dossier.commanderPath?.copy || "",
      deck_footing: dossier.commanderPath?.deckFooting || "",
      spellcraft: dossier.commanderPath?.spellcraft || "",
      table_caution: dossier.commanderPath?.tableCautionText || "",
    },
    commander_recommendation_names: (dossier.commanderRecommendations || []).map((candidate) => candidate.name),
    external_routing_links: {
      commander_start: dossier.links?.commanderStart || [],
      archidekt: dossier.links?.archidekt || [],
      maze: dossier.links?.maze || [],
      scryfall: dossier.links?.scryfall || [],
    },
    maze_context: mazeContext,
    maze_paths,
  };
}

function buildCaseSnapshot({ fixture, replay, inputs }) {
  const dossier = buildCommanderDossier({
    factions: inputs.factions,
    placementModel: inputs.placementModel,
    deckTagCatalog: inputs.deckTagCatalog,
    placementResult: replay.result,
    targetFactionKey: replay.result.faction,
  });
  const audit = auditCommanderDossier(dossier);
  const presentation = buildPresentationSummary({
    result: replay.result,
    dossier,
    factions: inputs.factions,
    taxonomy: inputs.taxonomy,
  });

  return {
    case_id: fixture.case_id,
    case_name: fixture.case_name,
    expected_primary: fixture.expected_primary || "",
    answers: replay.answers,
    placement_result: replay.result,
    dossier,
    presentation,
    raw_adjacent_labels: (replay.result.adjacent_matches || []).map((match) => ({
      key: match.faction,
      name: match.faction_name,
      reason: match.reason,
    })),
    adjacent_debug_family_grouping: adjacentFamilyGrouping(replay.result, inputs.factions),
    authored_vs_fallback: {
      commander_recommendation_source: dossier.commanderRecommendationSource || "fallback",
      commander_sources: (dossier.commanderRecommendations || []).map((candidate) => ({
        name: candidate.name,
        source: candidate.source || "fallback",
      })),
      summary: `commander_recommendations: ${dossier.commanderRecommendationSource || "fallback"}`,
    },
    audit: {
      status: audit.status,
      failures: audit.failures || [],
      warnings: audit.warnings || [],
    },
    rendered_markdown: renderCommanderDossierText(dossier),
  };
}

export async function buildPresentationSnapshotPayload(inputs = null) {
  const resolvedInputs = inputs || await loadPresentationSnapshotInputs();
  const cases = resolvedInputs.fixtures.map((fixture) => {
    const replay = replayFixedAnswers({
      fixture,
      placementModel: resolvedInputs.placementModel,
      factions: resolvedInputs.factions,
    });
    return buildCaseSnapshot({ fixture, replay, inputs: resolvedInputs });
  });

  return {
    schema_version: SNAPSHOT_SCHEMA_VERSION,
    generated_at: "deterministic",
    fixture_schema_version: resolvedInputs.fixtureSchemaVersion,
    model_version: resolvedInputs.placementModel?._meta?.model_version || "",
    case_count: cases.length,
    cases,
  };
}

export function flattenSnapshotCase(entry) {
  const result = entry.placement_result || {};
  const dossier = entry.dossier || {};
  const identity = result.identity || dossier.faction?.identity || {};
  const adjacent = result.adjacent_matches || [];
  const commanderNames = entry.presentation?.commander_recommendation_names || [];
  const commanderStartLinks = dossier.links?.commanderStart || [];

  return {
    case_id: entry.case_id,
    case_name: entry.case_name,
    answers_json: JSON.stringify(entry.answers || []),
    primary_key: result.faction || "",
    primary_name: result.faction_name || "",
    primary_expression_kind: identity.expression_kind || result.institution_type || "",
    adjacent_1_key: adjacent[0]?.faction || "",
    adjacent_1_name: adjacent[0]?.faction_name || "",
    adjacent_2_key: adjacent[1]?.faction || "",
    adjacent_2_name: adjacent[1]?.faction_name || "",
    core_identity: identity.core_color || "",
    secondary_identity: identity.secondary_color || "",
    expression_key: identity.expression_key || "",
    expression_name: identity.expression_name || "",
    purity: typeof identity.purity === "number" ? String(identity.purity) : "",
    signal_strength: technicalSignalCopy(result, result.faction),
    edhrec_link: linkForService(commanderStartLinks, "edhrec"),
    mtgdecks_link: linkForService(commanderStartLinks, "mtgdecks"),
    commander_1: commanderNames[0] || "",
    commander_2: commanderNames[1] || "",
    commander_3: commanderNames[2] || "",
    maze_path_count: String(entry.presentation?.maze_paths?.length || 0),
    authored_vs_fallback_summary: entry.authored_vs_fallback?.summary || "",
    warning_count: String(entry.audit?.warnings?.length || 0),
  };
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function renderPresentationSnapshotCsv(payload) {
  const rows = (payload.cases || []).map(flattenSnapshotCase);
  return [
    CSV_COLUMNS.join(","),
    ...rows.map((row) => CSV_COLUMNS.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n");
}

function markdownList(items, empty = "- None") {
  return items?.length ? items.map((item) => `- ${item}`).join("\n") : empty;
}

function renderCaseMarkdown(entry) {
  const result = entry.placement_result;
  const presentation = entry.presentation;
  const links = entry.dossier.links?.commanderStart || [];
  const mazePaths = presentation.maze_paths || [];
  return [
    `## ${entry.case_name}`,
    "",
    `- Case ID: ${entry.case_id}`,
    `- Primary: ${result.faction_name} (${result.faction})`,
    `- Adjacent: ${(entry.raw_adjacent_labels || []).map((item) => `${item.name} (${item.key})`).join(", ") || "None"}`,
    `- Signal: ${presentation.why_rose_first.technical_signal}`,
    `- Commander source: ${entry.authored_vs_fallback.summary}`,
    "",
    "### Fixed Answers",
    markdownList((entry.answers || []).map((answer) => `${answer.question_id} -> ${answer.answer_title}`)),
    "",
    "### Hero Thesis",
    presentation.hero_thesis,
    "",
    `### ${presentation.why_rose_first.title}`,
    presentation.why_rose_first.copy,
    "",
    "### Faction Fork / Adjacent Explanation",
    presentation.adjacent_or_fork.copy || "- No adjacent fork copy.",
    "",
    "### Commander Path",
    presentation.commander_path_summary.copy,
    "",
    "### Commander Recommendations",
    markdownList(presentation.commander_recommendation_names || []),
    "",
    "### External Routing",
    markdownList(links.map((link) => `${link.label}: ${link.url}`)),
    "",
    "### Maze Discovery Paths",
    markdownList(mazePaths.map((path) => `${path.label} | plain: ${path.plainReadingQuery} | operator: ${path.operatorQuery}`)),
  ].join("\n");
}

export function renderPresentationSnapshotMarkdown(payload) {
  return [
    "# Presentation Snapshots",
    "",
    `Schema version: ${payload.schema_version}`,
    `Model version: ${payload.model_version}`,
    `Case count: ${payload.case_count}`,
    "",
    (payload.cases || []).map(renderCaseMarkdown).join("\n\n"),
    "",
  ].join("\n");
}

async function writeGeneratedFile(filename, contents) {
  const target = new URL(filename, PRESENTATION_SNAPSHOT_DIR);
  const temp = new URL(`${filename}.${process.pid}.tmp`, PRESENTATION_SNAPSHOT_DIR);

  try {
    await writeFile(temp, contents, "utf8");
    await rename(temp, target);
  } catch (error) {
    await rm(temp, { force: true });
    throw error;
  }
}

export async function writePresentationSnapshotFiles(payload) {
  await mkdir(PRESENTATION_SNAPSHOT_DIR, { recursive: true });
  await writeGeneratedFile("presentation-snapshots.csv", `${renderPresentationSnapshotCsv(payload)}\n`);
  await writeGeneratedFile("presentation-snapshots.json", `${JSON.stringify(payload, null, 2)}\n`);
  await writeGeneratedFile("presentation-snapshots.md", renderPresentationSnapshotMarkdown(payload));
}

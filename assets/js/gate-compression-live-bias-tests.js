import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyAdaptiveAnswer,
  createInitialAdaptiveState,
  likelihoodToDelta,
  rankAdaptiveFactions,
  selectNextAdaptiveQuestion,
} from "./adaptive-placement.js";

const modulePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(modulePath), "..", "..");
const placementModelPath = path.join(repoRoot, "data", "placement-model.json");
const gateSourcePath = path.join(repoRoot, "data", "placement", "gate-compression.source.json");
const reportDir = path.join(repoRoot, "docs", "audits", "gate-compression");
const reportJsonPath = path.join(reportDir, "live-gate-bias.json");
const reportMdPath = path.join(reportDir, "live-gate-bias.md");
const MANA_ORDER = Object.freeze(["W", "U", "B", "R", "G"]);
const SPECIAL_COLORLESS = "COLORLESS";
const SPECIAL_WUBRG = "WUBRG";
const EXPECTED_GATE_IDS = Object.freeze([
  "gate_v2_locus_of_trust",
  "gate_v2_pressure_becomes",
  "gate_v2_first_signal",
  "gate_v2_cost_of_oath",
]);
const SOURCE_ONLY_FIELDS = Object.freeze([
  "color_loadings",
  "outside_wubrg",
  "all_five_integration",
  "evenness_signal",
  "gate_compression_preview",
  "generated_evidence",
  "preview_evidence",
]);
const THRESHOLDS = Object.freeze({
  path_count: 625,
  min_distinct_rank_one_winners: 20,
  max_single_rank_one_paths: 100,
  max_azorius_rank_one_paths: 25,
});

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function round(value, places = 6) {
  return Number(Number(value).toFixed(places));
}

function sourceAnswerMap(source) {
  return new Map(
    (source.questions || [])
      .flatMap((question) => question.answers || [])
      .map((answer) => [answer.id, answer])
  );
}

function gateAnswerSource(sourceAnswers, answer) {
  const sourceAnswer = sourceAnswers.get(answer.id);
  assert.ok(sourceAnswer, `Generated Gate answer ${answer.id} should have a source answer.`);
  return sourceAnswer;
}

function answerHasBoundary(sourceAnswers, answer) {
  return Number(gateAnswerSource(sourceAnswers, answer).outside_wubrg ?? 0.45) > 0.45;
}

function answerHasIntegration(sourceAnswers, answer) {
  const sourceAnswer = gateAnswerSource(sourceAnswers, answer);
  return Number(sourceAnswer.all_five_integration ?? sourceAnswer.evenness_signal ?? 0.45) > 0.45;
}

function answerHasHighTotalColorNoIntegration(sourceAnswers, answer) {
  const sourceAnswer = gateAnswerSource(sourceAnswers, answer);
  const total = MANA_ORDER.reduce((sum, color) => sum + Number(sourceAnswer.color_loadings?.[color] ?? 0.45), 0);
  return total >= 3.2 && !answerHasIntegration(sourceAnswers, answer);
}

function answerById(question, answerId) {
  const answer = (question.answers || []).find((candidate) => candidate.id === answerId);
  assert.ok(answer, `Expected ${question.id} to include ${answerId}.`);
  return answer;
}

function applyGatePath(model, pathAnswers) {
  return pathAnswers.reduce((state, answer, questionIndex) => {
    const question = model.question_bank.gate[questionIndex];
    return applyAdaptiveAnswer({
      state,
      model,
      question,
      answer,
      answerIndex: question.answers.indexOf(answer),
    });
  }, createInitialAdaptiveState(model));
}

function enumerateGatePaths(model) {
  const paths = [];

  function visit(questionIndex, current) {
    if (questionIndex >= model.question_bank.gate.length) {
      paths.push(current.slice());
      return;
    }
    model.question_bank.gate[questionIndex].answers.forEach((answer) => {
      current.push(answer);
      visit(questionIndex + 1, current);
      current.pop();
    });
  }

  visit(0, []);
  return paths;
}

function groupSameColorDuplicates(model) {
  const groups = new Map();
  Object.entries(model.factions || {}).forEach(([key, faction]) => {
    const colors = (faction.colors || []).filter((color) => MANA_ORDER.includes(color));
    const colorKey = colors
      .slice()
      .sort((left, right) => MANA_ORDER.indexOf(left) - MANA_ORDER.indexOf(right))
      .join("");
    if (!colorKey) {
      return;
    }
    if (!groups.has(colorKey)) {
      groups.set(colorKey, []);
    }
    groups.get(colorKey).push(key);
  });

  return [...groups.entries()]
    .filter(([, keys]) => keys.length > 1)
    .map(([color_identity, keys]) => ({ color_identity, keys: keys.slice().sort() }))
    .sort((left, right) => left.color_identity.localeCompare(right.color_identity));
}

function buildGateBiasReport(model, source) {
  const sourceAnswers = sourceAnswerMap(source);
  const paths = enumerateGatePaths(model);
  const rankOneCounts = {};
  const top3Counts = {};
  const top5Counts = {};
  const specialLeakage = {
    colorless_top5_without_boundary: [],
    wubrg_top5_without_integration: [],
  };

  paths.forEach((answers) => {
    const state = applyGatePath(model, answers);
    const ranked = rankAdaptiveFactions(state, model);
    const rankOne = ranked[0]?.faction;
    rankOneCounts[rankOne] = (rankOneCounts[rankOne] || 0) + 1;
    ranked.slice(0, 3).forEach((entry) => {
      top3Counts[entry.faction] = (top3Counts[entry.faction] || 0) + 1;
    });
    ranked.slice(0, 5).forEach((entry) => {
      top5Counts[entry.faction] = (top5Counts[entry.faction] || 0) + 1;
    });

    const hasBoundary = answers.some((answer) => answerHasBoundary(sourceAnswers, answer));
    const hasIntegration = answers.some((answer) => answerHasIntegration(sourceAnswers, answer));
    if (!hasBoundary && ranked.slice(0, 5).some((entry) => entry.faction === SPECIAL_COLORLESS)) {
      specialLeakage.colorless_top5_without_boundary.push(answers.map((answer) => answer.id));
    }
    if (!hasIntegration && ranked.slice(0, 5).some((entry) => entry.faction === SPECIAL_WUBRG)) {
      specialLeakage.wubrg_top5_without_integration.push(answers.map((answer) => answer.id));
    }
  });

  const sortedRankOneCounts = Object.entries(rankOneCounts)
    .map(([faction, count]) => ({ faction, count }))
    .sort((left, right) => right.count - left.count || left.faction.localeCompare(right.faction));
  const duplicateGroups = groupSameColorDuplicates(model);
  const firstAnswerState = applyGatePath(
    model,
    model.question_bank.gate.map((question) => question.answers[0])
  );
  const duplicateGateTies = duplicateGroups.map((group) => ({
    ...group,
    scores: Object.fromEntries(group.keys.map((key) => [key, round(firstAnswerState.scores[key])])),
    tied_after_first_answer_path: group.keys.every(
      (key) => Math.abs(firstAnswerState.scores[key] - firstAnswerState.scores[group.keys[0]]) < 0.000001
    ),
  }));

  const thresholdFailures = [];
  if (paths.length !== THRESHOLDS.path_count) {
    thresholdFailures.push(`Expected ${THRESHOLDS.path_count} Gate paths; observed ${paths.length}.`);
  }
  if (sortedRankOneCounts.length < THRESHOLDS.min_distinct_rank_one_winners) {
    thresholdFailures.push(
      `Expected at least ${THRESHOLDS.min_distinct_rank_one_winners} distinct rank-one winners; observed ${sortedRankOneCounts.length}.`
    );
  }
  if ((sortedRankOneCounts[0]?.count || 0) > THRESHOLDS.max_single_rank_one_paths) {
    thresholdFailures.push(
      `${sortedRankOneCounts[0].faction} exceeds rank-one cap: ${sortedRankOneCounts[0].count}/${paths.length}.`
    );
  }
  if (Number(rankOneCounts.WU || 0) > THRESHOLDS.max_azorius_rank_one_paths) {
    thresholdFailures.push(`WU/Azorius exceeds rank-one cap: ${rankOneCounts.WU}/${paths.length}.`);
  }
  if (specialLeakage.colorless_top5_without_boundary.length) {
    thresholdFailures.push(
      `COLORLESS reached top 5 without outside_wubrg on ${specialLeakage.colorless_top5_without_boundary.length} Gate paths.`
    );
  }
  if (specialLeakage.wubrg_top5_without_integration.length) {
    thresholdFailures.push(
      `WUBRG reached top 5 without integration/evenness on ${specialLeakage.wubrg_top5_without_integration.length} Gate paths.`
    );
  }
  duplicateGateTies
    .filter((group) => !group.tied_after_first_answer_path)
    .forEach((group) => {
      thresholdFailures.push(`${group.color_identity} duplicate group is not Gate-tied: ${group.keys.join(", ")}.`);
    });

  return {
    generated_at: new Date().toISOString(),
    source: "data/placement/gate-compression.source.json",
    model: "data/placement-model.json",
    thresholds: THRESHOLDS,
    path_count: paths.length,
    distinct_rank_one_winners: sortedRankOneCounts.length,
    max_rank_one: sortedRankOneCounts[0] || null,
    azorius_rank_one_paths: Number(rankOneCounts.WU || 0),
    rank_one_counts: sortedRankOneCounts,
    top_3_counts: top3Counts,
    top_5_counts: top5Counts,
    special_leakage: {
      colorless_top5_without_boundary_count: specialLeakage.colorless_top5_without_boundary.length,
      wubrg_top5_without_integration_count: specialLeakage.wubrg_top5_without_integration.length,
      examples: {
        colorless_top5_without_boundary: specialLeakage.colorless_top5_without_boundary.slice(0, 5),
        wubrg_top5_without_integration: specialLeakage.wubrg_top5_without_integration.slice(0, 5),
      },
    },
    same_color_duplicate_groups: duplicateGateTies,
    pass: thresholdFailures.length === 0,
    failures: thresholdFailures,
  };
}

function renderGateBiasMarkdown(report) {
  const topRows = report.rank_one_counts
    .slice(0, 12)
    .map((entry) => `| ${entry.faction} | ${entry.count} |`)
    .join("\n");
  const duplicateRows = report.same_color_duplicate_groups
    .map((group) => `| ${group.color_identity} | ${group.keys.join(", ")} | ${group.tied_after_first_answer_path ? "yes" : "no"} |`)
    .join("\n");
  const failureLines = report.failures.length
    ? report.failures.map((failure) => `- ${failure}`).join("\n")
    : "- None";

  return `# Live Gate Bias Report

Generated: ${report.generated_at}

Status: ${report.pass ? "PASS" : "FAIL"}

## Gate-Only Skew Caps

- Paths enumerated: ${report.path_count}
- Distinct rank-one winners: ${report.distinct_rank_one_winners}
- Max rank-one faction: ${report.max_rank_one?.faction || "n/a"} (${report.max_rank_one?.count || 0})
- WU/Azorius rank-one paths: ${report.azorius_rank_one_paths}
- COLORLESS top 5 without outside_wubrg: ${report.special_leakage.colorless_top5_without_boundary_count}
- WUBRG top 5 without integration/evenness: ${report.special_leakage.wubrg_top5_without_integration_count}

## Top Rank-One Counts

| Faction | Paths |
| --- | ---: |
${topRows}

## Same-Color Duplicate Groups

| Color identity | Keys | Gate-tied sample |
| --- | --- | --- |
${duplicateRows}

## Failures

${failureLines}
`;
}

async function writeGateBiasReport(report) {
  await mkdir(reportDir, { recursive: true });
  await writeFile(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(reportMdPath, renderGateBiasMarkdown(report));
}

const placementModel = await readJson(placementModelPath);
const gateCompressionSource = await readJson(gateSourcePath);
const sourceAnswers = sourceAnswerMap(gateCompressionSource);

assert.equal(gateCompressionSource._meta?.status, "live-builder-source");
assert.equal(gateCompressionSource.scoring?.gate_broad_match_penalty, 0);
assert.equal(likelihoodToDelta(0.45, placementModel.scoring_rules), 0);
assert.equal(placementModel._meta?.gate_compression?.enabled, true);
assert.equal(placementModel._meta?.gate_compression?.related_card, "VM-384");
assert.equal(placementModel.question_bank.gate.length, 4);
assert.deepEqual(
  placementModel.question_bank.gate.map((question) => question.id),
  EXPECTED_GATE_IDS
);
assert.equal(
  selectNextAdaptiveQuestion(createInitialAdaptiveState(placementModel), placementModel).id,
  "gate_v2_locus_of_trust"
);

gateCompressionSource.questions.forEach((question) => {
  assert.ok(question.answers.length >= 4 && question.answers.length <= 5);
  question.answers.forEach((answer) => {
    assert.ok(answer.color_loadings, `${answer.id} should keep source color_loadings.`);
    assert.ok(!Object.hasOwn(answer, "likelihoods"), `${answer.id} source must not contain generated likelihoods.`);
    assert.ok(!Object.hasOwn(answer, "suppresses"), `${answer.id} source must not contain generated suppresses.`);
  });
});

placementModel.question_bank.gate.forEach((question) => {
  assert.equal(question.stage, "gate");
  assert.equal(question.lateral_inhibition, false);
  assert.ok(question.answers.length >= 4 && question.answers.length <= 5);
  assert.ok(
    !(question.answers || []).some((answer) => answer.title === "The charge before the gap closes"),
    "MARDU must not depend on old 19-answer Gate support."
  );

  question.answers.forEach((answer) => {
    SOURCE_ONLY_FIELDS.forEach((field) => {
      assert.ok(!Object.hasOwn(answer, field), `${answer.id} generated answer should not expose ${field}.`);
    });
    assert.ok(
      Object.keys(answer.likelihoods || {}).length || Object.keys(answer.suppresses || {}).length,
      `${answer.id} should generate faction-compatible score evidence.`
    );
    assert.ok(
      Object.values(answer.likelihoods || {}).every((likelihood) => Number(likelihood) > 0.45),
      `${answer.id} should use suppresses, not low likelihoods, for negative evidence.`
    );

    const sourceAnswer = gateAnswerSource(sourceAnswers, answer);
    const boundary = answerHasBoundary(sourceAnswers, answer);
    const integration = answerHasIntegration(sourceAnswers, answer);
    const highTotalNoIntegration = answerHasHighTotalColorNoIntegration(sourceAnswers, answer);
    assert.equal(
      Number(answer.likelihoods?.COLORLESS || 0) > 0.45,
      boundary,
      `${answer.id} COLORLESS evidence must match outside_wubrg only.`
    );
    assert.equal(
      Number(answer.likelihoods?.WUBRG || 0) > 0.45,
      integration,
      `${answer.id} WUBRG evidence must match integration/evenness only.`
    );
    if (!boundary) {
      assert.ok(Number(answer.suppresses?.COLORLESS || 0) > 0, `${answer.id} should suppress COLORLESS without boundary evidence.`);
    }
    if (!integration) {
      assert.ok(Number(answer.suppresses?.WUBRG || 0) > 0, `${answer.id} should suppress WUBRG without integration evidence.`);
    }
    if (highTotalNoIntegration) {
      assert.equal(answer.likelihoods?.WUBRG, undefined, `${answer.id} high color pressure alone must not reinforce WUBRG.`);
    }
    MANA_ORDER.forEach((color) => {
      assert.equal(typeof sourceAnswer.color_loadings[color], "number");
    });
  });
});

const firstQuestion = placementModel.question_bank.gate[0];
const ordinaryAnswer = answerById(firstQuestion, "gate_v2_trust_self_claim");
const boundaryAnswer = answerById(firstQuestion, "gate_v2_trust_outside_measure");
const integrationAnswer = answerById(firstQuestion, "gate_v2_trust_braided_witness");
assert.equal(ordinaryAnswer.likelihoods.COLORLESS, undefined);
assert.equal(ordinaryAnswer.likelihoods.WUBRG, undefined);
assert.equal(boundaryAnswer.likelihoods.COLORLESS, 0.95);
assert.equal(boundaryAnswer.likelihoods.WUBRG, undefined);
assert.equal(integrationAnswer.likelihoods.WUBRG, 0.95);
assert.equal(integrationAnswer.likelihoods.COLORLESS, undefined);

const ordinaryState = applyGatePath(placementModel, [ordinaryAnswer]);
assert.ok(!ordinaryState.pruned.includes("COLORLESS"), "Ordinary Gate answers should not prune COLORLESS.");
assert.ok(!ordinaryState.pruned.includes("WUBRG"), "Ordinary Gate answers should not prune WUBRG.");
const integrationState = applyGatePath(placementModel, [integrationAnswer]);
assert.ok(
  !integrationState.evidence_trail[0].deltas.some((delta) => /lateral inhibition/i.test(delta.reason || "")),
  "Live compressed Gate should not add lateral-inhibition deltas."
);

const duplicateGroups = groupSameColorDuplicates(placementModel);
assert.ok(duplicateGroups.length >= 1, "Generated model should expose same-color duplicate groups for Hall/Crucible resolution.");
duplicateGroups.forEach((group) => {
  assert.equal(new Set(group.keys).size, group.keys.length, `${group.color_identity} duplicate group contains collapsed keys.`);
  group.keys.forEach((key) => {
    assert.ok(placementModel.factions[key], `${key} should remain a distinct generated faction.`);
  });
});

const report = buildGateBiasReport(placementModel, gateCompressionSource);
await writeGateBiasReport(report);
assert.deepEqual(report.failures, [], `Live Gate bias thresholds failed; inspect ${reportMdPath}.`);

console.log(
  `PASS live Gate bias tests: ${report.path_count} paths, ${report.distinct_rank_one_winners} rank-one winners, report written to ${path.relative(repoRoot, reportMdPath)}`
);

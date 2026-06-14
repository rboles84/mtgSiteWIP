import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();
const MANA_ORDER = Object.freeze(["W", "U", "B", "R", "G"]);
const SPECIAL_COLORLESS = "COLORLESS";
const SPECIAL_WUBRG = "WUBRG";
const WATCH_EXPRESSIONS = Object.freeze(["DUNE", "INK", "WITCH", "WUBRG", "COLORLESS"]);
const FOUR_COLOR_EXPRESSIONS = Object.freeze(["YORE", "GLINT", "DUNE", "INK", "WITCH"]);
const DEFAULT_SOURCE_PATH = path.join(
  REPO_ROOT,
  "data",
  "placement",
  "gate-compression.source.json"
);
const DEFAULT_MODEL_PATH = path.join(REPO_ROOT, "data", "placement-model.json");
const DEFAULT_REPORT_DIR = path.join(REPO_ROOT, "docs", "audits", "gate-compression");
const DEFAULT_REPORT_STEM = "wubrg-first-gate-comparison";

function parseArgs(argv) {
  const options = {
    sourcePath: DEFAULT_SOURCE_PATH,
    modelPath: DEFAULT_MODEL_PATH,
    reportDir: DEFAULT_REPORT_DIR,
    reportStem: DEFAULT_REPORT_STEM,
    write: true,
  };

  argv.forEach((arg) => {
    if (arg.startsWith("--source=")) {
      options.sourcePath = path.resolve(REPO_ROOT, arg.slice("--source=".length));
    } else if (arg.startsWith("--model=")) {
      options.modelPath = path.resolve(REPO_ROOT, arg.slice("--model=".length));
    } else if (arg.startsWith("--out-dir=")) {
      options.reportDir = path.resolve(REPO_ROOT, arg.slice("--out-dir=".length));
    } else if (arg.startsWith("--stem=")) {
      options.reportStem = arg.slice("--stem=".length);
    } else if (arg === "--no-write") {
      options.write = false;
    }
  });

  return options;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function asFixedLikelihood(value) {
  return Number(value).toFixed(2);
}

function buildBucketContract(model) {
  const table = model.scoring_rules?.likelihood_to_delta || {};
  const buckets = Object.entries(table)
    .map(([likelihood, delta]) => ({
      likelihood: Number(likelihood),
      likelihoodKey: Number(likelihood).toFixed(2),
      delta: Number(delta),
    }))
    .sort((left, right) => left.delta - right.delta || left.likelihood - right.likelihood);

  if (!buckets.some((bucket) => bucket.likelihoodKey === "0.45" && bucket.delta === 0)) {
    throw new Error("Gate compression simulator requires 0.45 to map to neutral delta 0.");
  }

  return {
    table,
    buckets,
    neutralLikelihood: 0.45,
    neutralDelta: 0,
  };
}

function deltaForLikelihood(likelihood, contract) {
  const key = asFixedLikelihood(likelihood);
  if (Object.prototype.hasOwnProperty.call(contract.table, key)) {
    return Number(contract.table[key]);
  }

  let nearest = contract.buckets[0];
  let nearestDistance = Number.POSITIVE_INFINITY;
  contract.buckets.forEach((bucket) => {
    const distance = Math.abs(bucket.likelihood - Number(likelihood));
    if (distance < nearestDistance) {
      nearest = bucket;
      nearestDistance = distance;
    }
  });
  return nearest.delta;
}

function nearestBucketForDelta(delta, contract) {
  let nearest = contract.buckets[0];
  let nearestDistance = Number.POSITIVE_INFINITY;
  contract.buckets.forEach((bucket) => {
    const distance = Math.abs(bucket.delta - delta);
    if (
      distance < nearestDistance ||
      (distance === nearestDistance && bucket.likelihood > nearest.likelihood)
    ) {
      nearest = bucket;
      nearestDistance = distance;
    }
  });
  return nearest;
}

function directBucketForLikelihood(likelihood, contract) {
  const key = asFixedLikelihood(likelihood);
  const exact = contract.buckets.find((bucket) => bucket.likelihoodKey === key);
  if (exact) {
    return exact;
  }

  const delta = deltaForLikelihood(likelihood, contract);
  return nearestBucketForDelta(delta, contract);
}

function assertGateSource(source) {
  if (!Array.isArray(source.questions) || source.questions.length !== 4) {
    throw new Error("Gate compression source must contain exactly four questions.");
  }

  source.questions.forEach((question, questionIndex) => {
    if (question.stage !== "gate") {
      throw new Error(`${question.id || `question ${questionIndex + 1}`} must use stage "gate".`);
    }
    if (!Array.isArray(question.answers) || question.answers.length < 4 || question.answers.length > 5) {
      throw new Error(`${question.id} must contain four or five answers.`);
    }
    question.answers.forEach((answer) => {
      const loadings = answer.color_loadings || {};
      MANA_ORDER.forEach((color) => {
        if (typeof loadings[color] !== "number") {
          throw new Error(`${answer.id} is missing numeric color_loadings.${color}.`);
        }
      });
      if (answer.likelihoods || answer.suppresses) {
        throw new Error(`${answer.id} must not use faction beneficiary likelihoods or suppresses.`);
      }
      if (Number(answer.all_five_integration || 0.45) > 0.45) {
        const values = MANA_ORDER.map((color) => loadings[color]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        if (min < 0.55 || max - min > 0.2) {
          throw new Error(`${answer.id} marks all_five_integration without balanced color loadings.`);
        }
      }
    });
  });
}

function colorCountForFaction(faction) {
  return (faction.colors || []).filter((color) => MANA_ORDER.includes(color)).length;
}

function propagatedOrdinaryEvidence({ answer, faction, contract, gateBroadMatchPenalty }) {
  const colors = (faction.colors || []).filter((color) => MANA_ORDER.includes(color));
  if (!colors.length) {
    return {
      source_delta: 0,
      bucketed_likelihood: 0.45,
      bucketed_delta: 0,
      colors,
    };
  }

  const sourceDelta =
    colors.reduce((sum, color) => {
      const likelihood = answer.color_loadings?.[color] ?? contract.neutralLikelihood;
      return sum + deltaForLikelihood(likelihood, contract);
    }, 0) /
      Math.sqrt(colors.length) -
    gateBroadMatchPenalty * Math.max(0, colors.length - 1);
  const bucket = nearestBucketForDelta(sourceDelta, contract);

  return {
    source_delta: round(sourceDelta, 4),
    bucketed_likelihood: bucket.likelihood,
    bucketed_delta: bucket.delta,
    colors,
  };
}

function evidenceForAnswer(answer, faction, contract, source) {
  const neutral = source.scoring?.neutral_likelihood ?? contract.neutralLikelihood;
  const key = faction.key;

  if (key === SPECIAL_COLORLESS) {
    const likelihood = answer.outside_wubrg ?? neutral;
    const bucket = directBucketForLikelihood(likelihood, contract);
    return {
      source_delta: bucket.delta,
      bucketed_likelihood: bucket.likelihood,
      bucketed_delta: bucket.delta,
      colors: [],
      special_channel: "outside_wubrg",
      special_signal: likelihood,
    };
  }

  if (key === SPECIAL_WUBRG) {
    const likelihood = answer.all_five_integration ?? answer.evenness_signal ?? neutral;
    const bucket = directBucketForLikelihood(likelihood, contract);
    return {
      source_delta: bucket.delta,
      bucketed_likelihood: bucket.likelihood,
      bucketed_delta: bucket.delta,
      colors: MANA_ORDER.slice(),
      special_channel: "all_five_integration",
      special_signal: likelihood,
    };
  }

  return propagatedOrdinaryEvidence({
    answer,
    faction,
    contract,
    gateBroadMatchPenalty: source.scoring?.gate_broad_match_penalty ?? 0,
  });
}

function evidenceMapForAnswer(answer, model, contract, source) {
  const map = {};
  Object.values(model.factions || {}).forEach((faction) => {
    map[faction.key] = evidenceForAnswer(answer, faction, contract, source);
  });
  return map;
}

function makeInitialScores(model) {
  const prior = model.scoring_rules?.prior_log_probability ?? Math.log(1 / Object.keys(model.factions || {}).length);
  return Object.fromEntries(Object.keys(model.factions || {}).map((key) => [key, prior]));
}

function rankScores(scores, model) {
  const entries = Object.entries(scores);
  const maxScore = Math.max(...entries.map(([, score]) => score));
  const weighted = entries.map(([key, score]) => [key, Math.exp(score - maxScore)]);
  const total = weighted.reduce((sum, [, value]) => sum + value, 0) || 1;
  return weighted
    .map(([key, value]) => ({
      faction: key,
      faction_name: model.factions[key]?.name || key,
      colors: model.factions[key]?.colors || [],
      score: round(scores[key], 4),
      probability: round(value / total, 6),
    }))
    .sort(
      (left, right) =>
        right.probability - left.probability ||
        right.score - left.score ||
        left.faction.localeCompare(right.faction)
    )
    .map((entry, index) => ({ rank: index + 1, ...entry }));
}

function rankForTarget(ranked, target) {
  return ranked.find((entry) => entry.faction === target)?.rank ?? Number.POSITIVE_INFINITY;
}

function chooseBestAnswerForTarget(question, target, model, contract, source) {
  const faction = model.factions[target];
  let best = null;
  question.answers.forEach((answer, answerIndex) => {
    const evidence = evidenceForAnswer(answer, faction, contract, source);
    const candidate = { answer, answerIndex, evidence };
    if (
      !best ||
      evidence.bucketed_delta > best.evidence.bucketed_delta ||
      (evidence.bucketed_delta === best.evidence.bucketed_delta && answerIndex < best.answerIndex)
    ) {
      best = candidate;
    }
  });
  return best;
}

function topEvidenceEntries(answer, model, contract, source, target) {
  const evidenceMap = evidenceMapForAnswer(answer, model, contract, source);
  const important = new Set([target, ...Object.keys(evidenceMap).slice(0, 0)]);
  Object.entries(evidenceMap)
    .sort(
      ([leftKey, left], [rightKey, right]) =>
        right.bucketed_delta - left.bucketed_delta || leftKey.localeCompare(rightKey)
    )
    .slice(0, 8)
    .forEach(([key]) => important.add(key));

  return Object.fromEntries(
    [...important].sort().map((key) => [
      key,
      {
        likelihood: evidenceMap[key].bucketed_likelihood,
        delta: evidenceMap[key].bucketed_delta,
        source_delta: evidenceMap[key].source_delta,
        special_channel: evidenceMap[key].special_channel || null,
      },
    ])
  );
}

function simulateGoldenPath(target, source, model, contract) {
  const scores = makeInitialScores(model);
  const snapshots = [];
  const selected_answers = [];

  source.questions.forEach((question, questionIndex) => {
    const choice = chooseBestAnswerForTarget(question, target, model, contract, source);
    const answer = choice.answer;
    const evidenceMap = evidenceMapForAnswer(answer, model, contract, source);
    Object.entries(evidenceMap).forEach(([key, evidence]) => {
      scores[key] += evidence.bucketed_delta;
    });

    const ranked = rankScores(scores, model);
    selected_answers.push(answer.id);
    snapshots.push({
      gate_index: questionIndex + 1,
      question_id: question.id,
      axis: question.axis,
      selected_answer_id: answer.id,
      selected_answer_title: answer.title,
      source_vector: answer.color_loadings,
      outside_wubrg: answer.outside_wubrg ?? source.scoring?.neutral_likelihood ?? contract.neutralLikelihood,
      all_five_integration:
        answer.all_five_integration ?? answer.evenness_signal ?? source.scoring?.neutral_likelihood ?? contract.neutralLikelihood,
      generated_evidence: topEvidenceEntries(answer, model, contract, source, target),
      top_candidates: ranked.slice(0, 8),
      hall_routing_pool: ranked.slice(0, 5).map((entry) => entry.faction),
      target_rank: rankForTarget(ranked, target),
    });
  });

  const finalRanked = rankScores(scores, model);
  return {
    target,
    selected_answers,
    final_rank: rankForTarget(finalRanked, target),
    final_top_5: finalRanked.slice(0, 5).map((entry) => entry.faction),
    final_top_8: finalRanked.slice(0, 8),
    reachable_top_5: rankForTarget(finalRanked, target) <= 5,
    snapshots,
  };
}

function enumeratePaths(source) {
  const paths = [];

  function visit(questionIndex, current) {
    if (questionIndex >= source.questions.length) {
      paths.push(current.slice());
      return;
    }
    source.questions[questionIndex].answers.forEach((answer) => {
      current.push(answer);
      visit(questionIndex + 1, current);
      current.pop();
    });
  }

  visit(0, []);
  return paths;
}

function simulateAnswerPath(answers, source, model, contract) {
  const scores = makeInitialScores(model);
  answers.forEach((answer) => {
    const evidenceMap = evidenceMapForAnswer(answer, model, contract, source);
    Object.entries(evidenceMap).forEach(([key, evidence]) => {
      scores[key] += evidence.bucketed_delta;
    });
  });
  return rankScores(scores, model);
}

function hasSpecialSignal(answers, field) {
  return answers.some((answer) => Number(answer[field] ?? 0.45) > 0.45);
}

function buildOvertriggerReport(source, model, contract) {
  const paths = enumeratePaths(source);
  const watched = Object.fromEntries(
    WATCH_EXPRESSIONS.map((key) => [key, { rank_1: 0, top_3: 0, top_5: 0 }])
  );
  const specialLeakage = {
    colorless_top5_without_boundary: [],
    wubrg_top5_without_integration: [],
  };

  paths.forEach((answers) => {
    const ranked = simulateAnswerPath(answers, source, model, contract);
    WATCH_EXPRESSIONS.forEach((key) => {
      const rank = rankForTarget(ranked, key);
      if (rank === 1) watched[key].rank_1 += 1;
      if (rank <= 3) watched[key].top_3 += 1;
      if (rank <= 5) watched[key].top_5 += 1;
    });

    if (!hasSpecialSignal(answers, "outside_wubrg") && rankForTarget(ranked, SPECIAL_COLORLESS) <= 5) {
      specialLeakage.colorless_top5_without_boundary.push(answers.map((answer) => answer.id));
    }
    if (!hasSpecialSignal(answers, "all_five_integration") && rankForTarget(ranked, SPECIAL_WUBRG) <= 5) {
      specialLeakage.wubrg_top5_without_integration.push(answers.map((answer) => answer.id));
    }
  });

  const broadSingleAnswerChecks = [];
  source.questions.forEach((question) => {
    question.answers.forEach((answer) => {
      const positiveColors = MANA_ORDER.filter((color) => Number(answer.color_loadings?.[color] ?? 0.45) > 0.45);
      const isBroad =
        positiveColors.length >= 4 || Number(answer.all_five_integration ?? 0.45) > 0.45;
      if (!isBroad) return;
      const ranked = simulateAnswerPath([answer], source, model, contract);
      const rank1 = ranked[0]?.faction;
      broadSingleAnswerChecks.push({
        question_id: question.id,
        answer_id: answer.id,
        positive_colors: positiveColors,
        all_five_integration: answer.all_five_integration ?? 0.45,
        rank_1: rank1,
        top_5: ranked.slice(0, 5).map((entry) => entry.faction),
        four_color_rank_1: FOUR_COLOR_EXPRESSIONS.includes(rank1),
      });
    });
  });

  return {
    path_count: paths.length,
    watched,
    special_leakage: {
      colorless_top5_without_boundary_count: specialLeakage.colorless_top5_without_boundary.length,
      wubrg_top5_without_integration_count: specialLeakage.wubrg_top5_without_integration.length,
      examples: {
        colorless_top5_without_boundary: specialLeakage.colorless_top5_without_boundary.slice(0, 5),
        wubrg_top5_without_integration: specialLeakage.wubrg_top5_without_integration.slice(0, 5),
      },
    },
    broad_single_answer_checks: broadSingleAnswerChecks,
  };
}

function syntheticQuestion(answer) {
  return {
    id: answer.id,
    stage: "gate",
    axis: "Synthetic Probe",
    answers: [answer],
  };
}

function runValidationProbes(source, model, contract) {
  const neutralAnswer = {
    id: "probe_neutral_045",
    title: "Neutral .45 probe",
    color_loadings: { W: 0.45, U: 0.45, B: 0.45, R: 0.45, G: 0.45 },
    outside_wubrg: 0.45,
    all_five_integration: 0.45,
  };
  const lowColorNoBoundary = {
    id: "probe_low_color_no_boundary",
    title: "Low color, no boundary probe",
    color_loadings: { W: 0.2, U: 0.2, B: 0.2, R: 0.2, G: 0.2 },
    outside_wubrg: 0.03,
    all_five_integration: 0.2,
  };
  const highColorNoIntegration = {
    id: "probe_high_color_no_integration",
    title: "High color, no integration probe",
    color_loadings: { W: 0.95, U: 0.95, B: 0.95, R: 0.95, G: 0.95 },
    outside_wubrg: 0.03,
    all_five_integration: 0.45,
  };

  const syntheticSource = {
    ...source,
    questions: [syntheticQuestion(neutralAnswer)],
  };
  const neutralEvidence = evidenceMapForAnswer(neutralAnswer, model, contract, syntheticSource);
  const neutralNonZero = Object.entries(neutralEvidence).filter(([, evidence]) => evidence.bucketed_delta !== 0);
  const neutralRanked = simulateAnswerPath([neutralAnswer], syntheticSource, model, contract);

  const lowSource = { ...source, questions: [syntheticQuestion(lowColorNoBoundary)] };
  const lowRanked = simulateAnswerPath([lowColorNoBoundary], lowSource, model, contract);

  const highSource = { ...source, questions: [syntheticQuestion(highColorNoIntegration)] };
  const highRanked = simulateAnswerPath(
    [highColorNoIntegration, highColorNoIntegration, highColorNoIntegration, highColorNoIntegration],
    highSource,
    model,
    contract
  );

  return {
    neutral_045: {
      nonzero_delta_count: neutralNonZero.length,
      advanced_expression_count: neutralRanked.filter(
        (entry) => entry.score > round(model.scoring_rules.prior_log_probability, 4)
      ).length,
      top_5: neutralRanked.slice(0, 5).map((entry) => entry.faction),
    },
    colorless_without_boundary: {
      colorless_rank: rankForTarget(lowRanked, SPECIAL_COLORLESS),
      top_5: lowRanked.slice(0, 5).map((entry) => entry.faction),
    },
    wubrg_without_integration: {
      wubrg_rank: rankForTarget(highRanked, SPECIAL_WUBRG),
      top_5: highRanked.slice(0, 5).map((entry) => entry.faction),
    },
  };
}

function sameColorDuplicatePairs(model) {
  const groups = new Map();
  Object.values(model.factions || {}).forEach((faction) => {
    const colors = (faction.colors || []).filter((color) => MANA_ORDER.includes(color));
    if (colors.length !== 2) return;
    const id = colors.slice().sort().join("");
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(faction.key);
  });
  return [...groups.values()].filter((group) => group.length > 1);
}

function pairId(pair) {
  return pair.slice().sort().join("/");
}

function buildSameColorReport(source, model, contract) {
  const paths = enumeratePaths(source);
  const hallFactionSet = new Set((model.question_bank?.hall || []).map((question) => question.faction));
  const cruciblePairs = new Set((model.question_bank?.crucible || []).map((question) => pairId(question.pair || [])));

  return sameColorDuplicatePairs(model).map((group) => {
    const scoreDifferences = [];
    paths.forEach((answers) => {
      const scores = makeInitialScores(model);
      answers.forEach((answer) => {
        const evidenceMap = evidenceMapForAnswer(answer, model, contract, source);
        group.forEach((key) => {
          scores[key] += evidenceMap[key].bucketed_delta;
        });
      });
      const values = group.map((key) => scores[key]);
      scoreDifferences.push(round(Math.max(...values) - Math.min(...values), 8));
    });

    return {
      pair: group,
      gate_score_tied_for_all_paths: scoreDifferences.every((difference) => difference === 0),
      max_score_difference: Math.max(...scoreDifferences),
      hall_questions_present: Object.fromEntries(group.map((key) => [key, hallFactionSet.has(key)])),
      crucible_pair_present: cruciblePairs.has(pairId(group)),
      conclusion: cruciblePairs.has(pairId(group)) ? "Crucible-resolved after Gate" : "Hall-resolved after Gate",
    };
  });
}

function buildReportStatus({ goldenPaths, overtrigger, probes, sameColor }) {
  const failures = [];
  const warnings = [];

  const missed = goldenPaths.filter((entry) => !entry.reachable_top_5).map((entry) => entry.target);
  if (missed.length) failures.push(`Reachability miss: ${missed.join(", ")}`);
  if (probes.neutral_045.nonzero_delta_count !== 0) {
    failures.push("Neutral .45 probe produced nonzero deltas.");
  }
  if (probes.neutral_045.advanced_expression_count !== 0) {
    failures.push("Neutral .45 probe advanced one or more expressions.");
  }
  if (probes.colorless_without_boundary.colorless_rank <= 5) {
    failures.push("COLORLESS entered the top five without outside_wubrg boundary evidence.");
  }
  if (probes.wubrg_without_integration.wubrg_rank <= 5) {
    failures.push("WUBRG entered the top five under high color pressure without integration evidence.");
  }
  if (overtrigger.special_leakage.colorless_top5_without_boundary_count > 0) {
    failures.push("One or more source paths route COLORLESS without boundary evidence.");
  }
  if (overtrigger.special_leakage.wubrg_top5_without_integration_count > 0) {
    failures.push("One or more source paths route WUBRG without integration evidence.");
  }

  const fourColorSingleAnswerRank1 = overtrigger.broad_single_answer_checks.filter(
    (entry) => entry.four_color_rank_1
  );
  if (fourColorSingleAnswerRank1.length) {
    failures.push("A broad single answer ranked a four-color expression first.");
  }

  sameColor.forEach((entry) => {
    if (!entry.gate_score_tied_for_all_paths) {
      failures.push(`${entry.pair.join("/")} did not remain tied under color-only Gate scoring.`);
    }
    const missingHall = Object.entries(entry.hall_questions_present)
      .filter(([, present]) => !present)
      .map(([key]) => key);
    if (missingHall.length) {
      warnings.push(`${entry.pair.join("/")} missing Hall questions for ${missingHall.join(", ")}.`);
    }
  });

  return {
    status: failures.length ? "fail" : "pass",
    failures,
    warnings,
  };
}

function formatTable(headers, rows) {
  const header = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`);
  return [header, divider, ...body].join("\n");
}

function buildMarkdownReport(report) {
  const reachabilityRows = report.golden_paths.map((entry) => [
    entry.target,
    String(entry.final_rank),
    entry.reachable_top_5 ? "yes" : "no",
    entry.final_top_5.join(", "),
  ]);
  const watchedRows = Object.entries(report.overtrigger.watched).map(([key, counts]) => [
    key,
    `${counts.rank_1}/${report.overtrigger.path_count}`,
    `${counts.top_3}/${report.overtrigger.path_count}`,
    `${counts.top_5}/${report.overtrigger.path_count}`,
  ]);
  const sameColorRows = report.same_color_duplicates.map((entry) => [
    entry.pair.join(" / "),
    entry.gate_score_tied_for_all_paths ? "yes" : "no",
    entry.crucible_pair_present ? "yes" : "no",
    entry.conclusion,
  ]);
  const broadRows = report.overtrigger.broad_single_answer_checks.map((entry) => [
    entry.answer_id,
    entry.positive_colors.join("") || "none",
    String(entry.all_five_integration),
    entry.rank_1,
    entry.four_color_rank_1 ? "fail" : "pass",
  ]);

  return `# Gate Compression WUBRG-First Comparison

Generated: ${report.generated_at}

Source fixture: \`${report.inputs.source}\`

Placement model: \`${report.inputs.model}\`

Status: **${report.status.status.toUpperCase()}**

${report.status.failures.length ? `Failures:\n\n${report.status.failures.map((item) => `- ${item}`).join("\n")}\n` : "Failures: none.\n"}
${report.status.warnings.length ? `Warnings:\n\n${report.status.warnings.map((item) => `- ${item}`).join("\n")}\n` : "Warnings: none.\n"}
## Contract

- Expression count: ${report.model.faction_count}
- Propagation mode: ${report.source.scoring.propagation_mode}
- Gate broad-match penalty: ${report.source.scoring.gate_broad_match_penalty}
- Neutral likelihood: ${report.source.scoring.neutral_likelihood}
- Bucket contract: current \`likelihood_to_delta\`, nearest-delta bucketed before scoring.

## Reachability

${formatTable(["target", "final rank", "top-5 reachable", "final Hall pool"], reachabilityRows)}

## Validation Probes

- Neutral \`.45\` nonzero deltas: ${report.probes.neutral_045.nonzero_delta_count}
- Neutral \`.45\` advanced expressions: ${report.probes.neutral_045.advanced_expression_count}
- \`COLORLESS\` rank without boundary evidence: ${report.probes.colorless_without_boundary.colorless_rank}
- \`WUBRG\` rank under high color pressure without integration evidence: ${report.probes.wubrg_without_integration.wubrg_rank}

## Watched Overtrigger Counts

${formatTable(["expression", "rank 1", "top 3", "top 5"], watchedRows)}

Special leakage:

- COLORLESS top-5 paths without boundary: ${report.overtrigger.special_leakage.colorless_top5_without_boundary_count}
- WUBRG top-5 paths without integration: ${report.overtrigger.special_leakage.wubrg_top5_without_integration_count}

## Broad Single-Answer Check

${formatTable(["answer", "positive colors", "integration", "rank 1", "four-color rank 1"], broadRows)}

## Same-Color Duplicate Check

${formatTable(["pair", "Gate tied", "Crucible pair", "resolution"], sameColorRows)}

## Snapshot Detail

Full per-target Gate I-IV snapshots are in \`${path.basename(report.inputs.json_report)}\`. Each snapshot includes source vectors, special signals, generated likelihoods/deltas, top candidates, and the Hall routing pool.
`;
}

function round(value, places = 6) {
  const factor = 10 ** places;
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const [source, model] = await Promise.all([readJson(options.sourcePath), readJson(options.modelPath)]);
  assertGateSource(source);

  const contract = buildBucketContract(model);
  const targetKeys = Object.keys(model.factions || {});
  const goldenPaths = targetKeys.map((target) => simulateGoldenPath(target, source, model, contract));
  const overtrigger = buildOvertriggerReport(source, model, contract);
  const probes = runValidationProbes(source, model, contract);
  const sameColor = buildSameColorReport(source, model, contract);
  const jsonReportPath = path.join(options.reportDir, `${options.reportStem}.json`);
  const markdownReportPath = path.join(options.reportDir, `${options.reportStem}.md`);

  const report = {
    generated_at: new Date().toISOString(),
    inputs: {
      source: path.relative(REPO_ROOT, options.sourcePath).replaceAll("\\", "/"),
      model: path.relative(REPO_ROOT, options.modelPath).replaceAll("\\", "/"),
      json_report: path.relative(REPO_ROOT, jsonReportPath).replaceAll("\\", "/"),
      markdown_report: path.relative(REPO_ROOT, markdownReportPath).replaceAll("\\", "/"),
    },
    model: {
      model_version: model._meta?.model_version,
      faction_count: targetKeys.length,
      active_expression_keys: targetKeys,
    },
    source: {
      id: source._meta?.id,
      status: source._meta?.status,
      scoring: source.scoring,
      question_ids: source.questions.map((question) => question.id),
    },
    golden_paths: goldenPaths,
    probes,
    overtrigger,
    same_color_duplicates: sameColor,
  };

  report.status = buildReportStatus({
    goldenPaths,
    overtrigger,
    probes,
    sameColor,
  });

  if (options.write) {
    await mkdir(options.reportDir, { recursive: true });
    await writeFile(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
    await writeFile(markdownReportPath, buildMarkdownReport(report));
  }

  console.log(
    `Gate compression simulator ${report.status.status}: ${goldenPaths.filter((entry) => entry.reachable_top_5).length}/${goldenPaths.length} reachable.`
  );
  if (options.write) {
    console.log(`Wrote ${path.relative(REPO_ROOT, markdownReportPath)}`);
    console.log(`Wrote ${path.relative(REPO_ROOT, jsonReportPath)}`);
  }
  if (report.status.failures.length) {
    report.status.failures.forEach((failure) => console.error(`FAIL: ${failure}`));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

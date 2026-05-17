import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  runAdaptiveGoldenPath,
  runAdaptiveReadingWithStrategy,
} from "./adaptive-placement.js";

const DEFAULT_RUNS = 100;
const DEFAULT_SEED = "voxmana-adaptive-placement-v1";

/**
 * Parses command-line flags for the adaptive bias report script.
 *
 * @param {string[]} argv CLI arguments.
 * @returns {{golden:boolean,runs:number,seed:string}} Parsed options.
 */
function parseArgs(argv) {
  const options = {
    golden: argv.includes("--golden") || argv.includes("--all"),
    runs: DEFAULT_RUNS,
    seed: DEFAULT_SEED,
  };

  argv.forEach((arg, index) => {
    if (arg === "--runs" && argv[index + 1]) {
      options.runs = Number(argv[index + 1]) || DEFAULT_RUNS;
    }
    if (arg.startsWith("--runs=")) {
      options.runs = Number(arg.split("=")[1]) || DEFAULT_RUNS;
    }
    if (arg === "--seed" && argv[index + 1]) {
      options.seed = argv[index + 1];
    }
    if (arg.startsWith("--seed=")) {
      options.seed = arg.split("=")[1] || DEFAULT_SEED;
    }
  });

  return options;
}

/**
 * Creates a repeatable pseudo-random number generator.
 *
 * @param {number|string} seed Seed value.
 * @returns {() => number} Function returning a number from 0 to less than 1.
 */
function createSeededRandom(seed = DEFAULT_SEED) {
  let state = String(seed)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0) || 1;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Loads display faction data and the generated adaptive placement model.
 *
 * @returns {Promise<{factions:object,model:object}>} Runtime data.
 */
async function loadRuntimeData() {
  const factionData = JSON.parse(
    await readFile(new URL("../../data/factions.json", import.meta.url), "utf8")
  );
  const model = JSON.parse(
    await readFile(new URL("../../data/placement-model.json", import.meta.url), "utf8")
  );
  return {
    factions: factionData.factions || {},
    model,
  };
}

/**
 * Summarizes placement selections by faction.
 *
 * @param {object[]} placements Placement results.
 * @param {object} factions Canonical faction map keyed by faction code.
 * @returns {object} Selection-bias summary.
 */
function summarizePlacements(placements, factions) {
  const total = placements.length;
  const counts = {};
  const expressionKinds = { guild: 0, college: 0, color: 0 };

  Object.keys(factions).forEach((key) => {
    counts[key] = {
      faction: key,
      faction_name: factions[key].name,
      institution_type: factions[key].institution_type,
      count: 0,
      percentage: 0,
    };
  });

  placements.forEach((placement) => {
    counts[placement.faction].count += 1;
    const institutionType = placement.institution_type;
    if (!Object.hasOwn(expressionKinds, institutionType)) {
      expressionKinds[institutionType] = 0;
    }
    expressionKinds[institutionType] += 1;
  });

  Object.values(counts).forEach((entry) => {
    entry.percentage = total ? Number(((entry.count / total) * 100).toFixed(2)) : 0;
  });

  const ordered = Object.values(counts).sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }
    return left.faction.localeCompare(right.faction);
  });

  return {
    total,
    assigned: placements.map((placement) => placement.faction),
    counts,
    ordered,
    most_selected: ordered[0] || null,
    least_selected: ordered[ordered.length - 1] || null,
    never_selected: ordered.filter((entry) => entry.count === 0),
    guild_vs_college: {
      guild: expressionKinds.guild,
      college: expressionKinds.college,
      color: expressionKinds.color,
      guild_percentage: total ? Number(((expressionKinds.guild / total) * 100).toFixed(2)) : 0,
      college_percentage: total ? Number(((expressionKinds.college / total) * 100).toFixed(2)) : 0,
      color_percentage: total ? Number(((expressionKinds.color / total) * 100).toFixed(2)) : 0,
    },
  };
}

/**
 * Runs one golden-path placement per faction.
 *
 * @param {object} model Generated placement model.
 * @param {object} factions Canonical faction map.
 * @returns {object[]} Placement results.
 */
function runGoldenPlacements(model, factions) {
  return Object.keys(model.factions).map((targetFaction) => {
    const run = runAdaptiveGoldenPath({ model, factions, targetFaction });
    return {
      target_faction: targetFaction,
      selections: run.selections.map((selection) => ({
        question_id: selection.question.id,
        stage: selection.question.stage,
        answer_index: selection.answerIndex,
        answer_title: selection.answer.title,
      })),
      ...run.result,
    };
  });
}

/**
 * Runs a seeded random adaptive placement simulation.
 *
 * @param {object} options Simulation options.
 * @returns {object[]} Placement results.
 */
function runSeededPlacements({ model, factions, runs, seed }) {
  const random = createSeededRandom(seed);
  const placements = [];

  for (let index = 0; index < runs; index += 1) {
    const run = runAdaptiveReadingWithStrategy({
      model,
      factions,
      strategy(question) {
        return Math.floor(random() * question.answers.length);
      },
    });
    placements.push({
      run: index + 1,
      selections: run.selections.map((selection) => ({
        question_id: selection.question.id,
        stage: selection.question.stage,
        answer_index: selection.answerIndex,
        answer_title: selection.answer.title,
      })),
      ...run.result,
    });
  }

  return placements;
}

/**
 * Builds the report object written to disk.
 *
 * @param {object[]} placements Placement results.
 * @param {object} factions Canonical faction map.
 * @param {object} options CLI options.
 * @param {string} mode Report mode.
 * @returns {object} Serializable report.
 */
function buildOutput(placements, factions, options, mode) {
  const summary = summarizePlacements(placements, factions);
  return {
    generated_at: new Date().toISOString(),
    mode,
    seed: mode === "seeded-random" ? options.seed : null,
    runs: placements.length,
    assigned: summary.assigned,
    counts: summary.counts,
    ordered: summary.ordered,
    most_selected: summary.most_selected,
    least_selected: summary.least_selected,
    never_selected: summary.never_selected,
    guild_vs_college: summary.guild_vs_college,
    placements: placements.map((placement) => ({
      run: placement.run,
      target_faction: placement.target_faction,
      selections: placement.selections,
      faction: placement.faction,
      faction_name: placement.faction_name,
      institution_type: placement.institution_type,
      confidence: placement.confidence,
      confidence_gap: placement.confidence_gap,
      top_matches: placement.top_matches.map((match) => ({
        rank: match.rank,
        faction: match.faction,
        faction_name: match.faction_name,
        confidence: match.confidence,
      })),
    })),
  };
}

/**
 * Prints a compact terminal summary of the adaptive report.
 *
 * @param {object} output Serializable report.
 */
function printSummary(output) {
  console.log(`Adaptive placement bias report (${output.mode})`);
  console.log(`Runs: ${output.runs}`);
  if (output.seed) {
    console.log(`Seed: ${output.seed}`);
  }
  console.log(`Most selected: ${output.most_selected.faction_name} (${output.most_selected.count})`);
  console.log(`Least selected: ${output.least_selected.faction_name} (${output.least_selected.count})`);
  console.log(`Never selected: ${output.never_selected.map((entry) => entry.faction_name).join(", ") || "none"}`);
  console.log(`Guilds: ${output.guild_vs_college.guild} (${output.guild_vs_college.guild_percentage}%)`);
  console.log(`Colleges: ${output.guild_vs_college.college} (${output.guild_vs_college.college_percentage}%)`);
  console.log(`Colors: ${output.guild_vs_college.color} (${output.guild_vs_college.color_percentage}%)`);
  console.table(output.ordered.map((entry) => ({
    faction: entry.faction,
    name: entry.faction_name,
    type: entry.institution_type,
    count: entry.count,
    percentage: `${entry.percentage}%`,
  })));
}

const options = parseArgs(process.argv.slice(2));
const { factions, model } = await loadRuntimeData();
const placements = options.golden
  ? runGoldenPlacements(model, factions)
  : runSeededPlacements({
      model,
      factions,
      runs: options.runs,
      seed: options.seed,
    });
const mode = options.golden ? "golden-paths" : "seeded-random";
const output = buildOutput(placements, factions, options, mode);
const outputDir = new URL("../../test-results/quick-reading-bias/", import.meta.url);
const reportFile = options.golden ? "golden-paths.json" : "seeded-random.json";
await mkdir(outputDir, { recursive: true });
await writeFile(new URL("latest.json", outputDir), JSON.stringify(output, null, 2));
await writeFile(new URL(reportFile, outputDir), JSON.stringify(output, null, 2));

printSummary(output);
console.log(`Wrote ${new URL("latest.json", outputDir).pathname}`);
console.log(`Wrote ${new URL(reportFile, outputDir).pathname}`);

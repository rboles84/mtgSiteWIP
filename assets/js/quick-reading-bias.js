import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  runQuickReadingBiasSimulation,
  runQuickReadingExhaustiveAnalysis,
} from "./quick-reading.js";

const DEFAULT_RUNS = 100;
const DEFAULT_SEED = "voxmana-selection-bias-v1";

/**
 * Parses a small set of command-line flags for the bias report script.
 *
 * @param {string[]} argv CLI arguments.
 * @returns {{all:boolean,runs:number,seed:string}} Parsed options.
 */
function parseArgs(argv) {
  const options = {
    all: argv.includes("--all"),
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
 * Loads canonical faction data for the quick-reading report.
 *
 * @returns {Promise<object>} Canonical faction map.
 */
async function loadFactions() {
  const data = JSON.parse(await readFile(new URL("../../data/factions.json", import.meta.url), "utf8"));
  return data.factions || {};
}

/**
 * Builds the report object written to disk.
 *
 * @param {object} report Raw quick-reading report.
 * @param {object} options CLI options.
 * @returns {object} Serializable report.
 */
function buildOutput(report, options) {
  return {
    generated_at: new Date().toISOString(),
    mode: report.mode,
    seed: options.all ? null : options.seed,
    runs: report.runs,
    assigned: report.summary.assigned,
    counts: report.summary.counts,
    ordered: report.summary.ordered,
    most_selected: report.summary.most_selected,
    least_selected: report.summary.least_selected,
    never_selected: report.summary.never_selected,
    top_match_counts: report.summary.top_match_counts,
    top_match_ordered: report.summary.top_match_ordered,
    best_ranks: report.summary.best_ranks,
    never_in_top_matches: report.summary.never_in_top_matches,
    guild_vs_college: report.summary.guild_vs_college,
    placements: report.placements.map((placement) => ({
      run: placement.run,
      answer_indexes: placement.answer_indexes,
      faction: placement.faction,
      faction_name: placement.faction_name,
      institution_type: placement.institution_type,
      confidence: placement.confidence,
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
 * Prints a compact terminal summary of the selection-bias report.
 *
 * @param {object} output Serializable report.
 */
function printSummary(output) {
  console.log(`Quick reading bias report (${output.mode})`);
  console.log(`Runs: ${output.runs}`);
  if (output.seed) {
    console.log(`Seed: ${output.seed}`);
  }
  console.log(`Most selected: ${output.most_selected.faction_name} (${output.most_selected.count})`);
  console.log(`Least selected: ${output.least_selected.faction_name} (${output.least_selected.count})`);
  console.log(`Never selected: ${output.never_selected.map((entry) => entry.faction_name).join(", ") || "none"}`);
  console.log(`Never in top 3: ${output.never_in_top_matches.map((entry) => entry.faction_name).join(", ") || "none"}`);
  console.log(`Guilds: ${output.guild_vs_college.guild} (${output.guild_vs_college.guild_percentage}%)`);
  console.log(`Colleges: ${output.guild_vs_college.college} (${output.guild_vs_college.college_percentage}%)`);
  console.table(output.ordered.map((entry) => ({
    faction: entry.faction,
    name: entry.faction_name,
    type: entry.institution_type,
    count: entry.count,
    percentage: `${entry.percentage}%`,
  })));
  console.log("Top-3 exposure:");
  console.table(output.top_match_ordered.map((entry) => ({
    faction: entry.faction,
    name: entry.faction_name,
    type: entry.institution_type,
    count: entry.count,
    percentage: `${entry.percentage}%`,
    best_rank: output.best_ranks[entry.faction] || "none",
  })));
}

const options = parseArgs(process.argv.slice(2));
const factions = await loadFactions();
const report = options.all
  ? runQuickReadingExhaustiveAnalysis({ factions })
  : runQuickReadingBiasSimulation({
      factions,
      runs: options.runs,
      seed: options.seed,
    });
const output = buildOutput(report, options);
const outputDir = new URL("../../test-results/quick-reading-bias/", import.meta.url);
const reportFile = options.all ? "exhaustive.json" : "seeded-random.json";
await mkdir(outputDir, { recursive: true });
await writeFile(new URL("latest.json", outputDir), JSON.stringify(output, null, 2));
await writeFile(new URL(reportFile, outputDir), JSON.stringify(output, null, 2));

printSummary(output);
console.log(`Wrote ${new URL("latest.json", outputDir).pathname}`);
console.log(`Wrote ${new URL(reportFile, outputDir).pathname}`);

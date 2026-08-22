import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveMazeQueryRequest } from "../assets/js/maze/maze-query-core.js";
import {
  setPlainReadingSemanticRegistry,
  setScryfallGrounding,
} from "../assets/js/maze/scryfall-grounded-compiler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outputDir = path.join(repoRoot, "docs", "research", "maze-player-language", "verification", "vm577");

function normalizeQuery(value = "") {
  return String(value).trim().replace(/\s+/g, " ");
}

function extractExpectedQuery(expected) {
  const text = String(expected || "").trim();
  if (!text) return "";
  const fenced = text.match(/`([^`]+)`/);
  if (fenced) return fenced[1].trim();
  if (/[a-z][a-z0-9_]*(=|:|<=|>=|<|>|!=)/i.test(text)) return text;
  return "";
}

const grounding = JSON.parse(await readFile(path.join(repoRoot, "data", "scryfall", "grounding", "scryfall-grounding.json"), "utf8"));
const semantics = JSON.parse(await readFile(path.join(repoRoot, "data", "scryfall", "grounding", "plain-reading-semantics.json"), "utf8"));
setScryfallGrounding(grounding);
setPlainReadingSemanticRegistry(semantics);

const casesPath = path.join(outputDir, "plain-reading-qa-cases.json");
const cases = JSON.parse(await readFile(casesPath, "utf8"));
const results = [];

let exactQueryMatches = 0;
let compilerErrors = 0;
let unscoredOrSemantic = 0;

for (const testCase of cases) {
  const expectedQuery = extractExpectedQuery(testCase.expected);
  try {
    const actual = resolveMazeQueryRequest({
      mode: "ai",
      input: testCase.input,
      options: { format: "", useFormatDefault: false },
    });
    const actualQuery = normalizeQuery(actual.query);
    const expectedNormalized = normalizeQuery(expectedQuery);
    const exactMatch = Boolean(expectedNormalized) && actualQuery === expectedNormalized;
    if (exactMatch) exactQueryMatches += 1;
    if (!expectedNormalized) unscoredOrSemantic += 1;
    results.push({
      ...testCase,
      actual_normalized_input: normalizeQuery(testCase.input).toLowerCase(),
      actual_query: actual.query,
      actual_parser_mode: actual.parserMode,
      actual_api: actual.api || {},
      diagnostics: actual.diagnostics || [],
      confidence: (actual.diagnostics || []).find((item) => item.code === "parser_confidence")?.details?.confidence ?? null,
      unresolved_terms: (actual.diagnostics || [])
        .filter((item) => item.code === "parser_unresolved_term")
        .map((item) => item.details?.term)
        .filter(Boolean),
      alternatives: (actual.diagnostics || [])
        .filter((item) => item.code === "parser_alternative" || item.code === "parser_ambiguity_choice")
        .map((item) => item.details || {}),
      expected_query: expectedQuery,
      disposition: exactMatch ? "EXACT_QUERY_MATCH" : expectedNormalized ? "QUERY_MISMATCH" : "SEMANTIC_BASELINE_ONLY",
      mismatch_explanation: exactMatch
        ? ""
        : expectedNormalized
          ? `Expected ${expectedNormalized} but compiler produced ${actualQuery}.`
          : "Workbook expectation is semantic or not machine-readable as an exact query.",
    });
  } catch (error) {
    compilerErrors += 1;
    results.push({
      ...testCase,
      disposition: "COMPILER_ERROR",
      error: `${error.name}: ${error.message}`,
    });
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  compiler_source: "assets/js/maze/maze-query-core.js resolveMazeQueryRequest(mode=ai)",
  grounding_source: "data/scryfall/grounding/scryfall-grounding.json",
  semantic_registry_source: "data/scryfall/grounding/plain-reading-semantics.json",
  summary: {
    total_cases: cases.length,
    exact_query_matches: exactQueryMatches,
    unscored_or_semantic: unscoredOrSemantic,
    query_mismatches: results.filter((item) => item.disposition === "QUERY_MISMATCH").length,
    compiler_errors: compilerErrors,
  },
  cases: results,
};

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "plain-reading-qa-baseline.json"), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Plain Reading QA baseline: ${cases.length} cases, ${exactQueryMatches} exact query matches, ${compilerErrors} compiler errors.`);


import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveMazeQueryRequest } from "../assets/js/maze/maze-query-core.js";
import {
  setPlainReadingSemanticRegistry,
  setScryfallGrounding,
} from "../assets/js/maze/scryfall-grounded-compiler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const corpusDir = path.join(repoRoot, "docs", "research", "maze-player-language", "corpus", "vm578");
const verificationDir = path.join(repoRoot, "docs", "research", "maze-player-language", "verification", "vm577");
const checkMode = process.argv.includes("--check");
const GENERATED_AT = "2026-08-22T04:00:00Z";

const SOURCE_FILES = {
  corpus: "player-language-100.jsonl",
  sourceLedger: "source-ledger.json",
  breakers: "breaker-cases.json",
  liveAcceptance: "live-acceptance-10.json",
};

const SAFE_VM577_DISPOSITIONS = new Set([
  "VERIFIED_NATIVE",
  "VERIFIED_QUERY",
  "VERIFIED_TAG",
  "VERIFIED_INTERNAL",
]);

const UNSAFE_VM577_DISPOSITIONS = new Set([
  "AMBIGUOUS",
  "SEMANTIC_REVIEW",
  "UNVERIFIED",
  "STALE",
  "SOURCE_ARTIFACT",
  "INVALID",
]);

function csvEscape(value) {
  const text = Array.isArray(value) || (value && typeof value === "object")
    ? JSON.stringify(value)
    : String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(rows, columns) {
  return `${columns.join(",")}\n${rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")).join("\n")}\n`;
}

function normalizeQuery(value = "") {
  return String(value).trim().replace(/\s+/g, " ");
}

function hasComponent(query, component) {
  const normalizedQuery = ` ${normalizeQuery(query).toLowerCase()} `;
  const normalizedComponent = normalizeQuery(component).toLowerCase();
  if (!normalizedComponent) return true;
  if (normalizedQuery.includes(` ${normalizedComponent} `)) return true;
  return normalizedQuery.includes(normalizedComponent);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readJsonl(filePath) {
  const text = await readFile(filePath, "utf8");
  return text.trim().split(/\r?\n/).filter(Boolean).map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`${filePath}:${index + 1} is not valid JSONL: ${error.message}`);
    }
  });
}

function countBy(items, fn) {
  const counts = {};
  for (const item of items) {
    const key = fn(item);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

async function loadSources() {
  return {
    corpus: await readJsonl(path.join(corpusDir, SOURCE_FILES.corpus)),
    sourceLedger: await readJson(path.join(corpusDir, SOURCE_FILES.sourceLedger)),
    breakerCases: await readJson(path.join(corpusDir, SOURCE_FILES.breakers)),
    liveAcceptance: await readJson(path.join(corpusDir, SOURCE_FILES.liveAcceptance)),
  };
}

function validateSourceLedger(sourceLedger) {
  const required = [
    "source_id",
    "source_type",
    "repository_path",
    "title",
    "date",
    "relevant_section",
    "evidence_limitation",
    "derivation_mode",
    "privacy_copyright_note",
  ];
  const problems = [];
  const ids = new Set();
  for (const source of sourceLedger) {
    for (const field of required) {
      if (!source[field]) problems.push(`Source ${source.source_id || "(missing id)"} is missing ${field}.`);
    }
    if (ids.has(source.source_id)) problems.push(`Duplicate source_id ${source.source_id}.`);
    ids.add(source.source_id);
  }
  if (problems.length) throw new Error(problems.join("\n"));
}

function validateCorpus(corpus, sourceLedger) {
  const sourceIds = new Set(sourceLedger.map((item) => item.source_id));
  const problems = [];
  if (corpus.length !== 100) problems.push(`Expected exactly 100 corpus cases, found ${corpus.length}.`);
  const ids = new Set();
  for (const testCase of corpus) {
    if (ids.has(testCase.case_id)) problems.push(`Duplicate case_id ${testCase.case_id}.`);
    ids.add(testCase.case_id);
    if (!/^VM578-\d{3}$/.test(testCase.case_id)) problems.push(`${testCase.case_id} does not match VM578-###.`);
    if (!testCase.utterance) problems.push(`${testCase.case_id} has no utterance.`);
    if (!testCase.normalized_utterance) problems.push(`${testCase.case_id} has no normalized_utterance.`);
    if (!testCase.case_origin) problems.push(`${testCase.case_id} has no case_origin.`);
    if (!testCase.source_ids?.length) problems.push(`${testCase.case_id} has no source_ids.`);
    for (const sourceId of testCase.source_ids || []) {
      if (!sourceIds.has(sourceId)) problems.push(`${testCase.case_id} references unknown source_id ${sourceId}.`);
    }
    if (!testCase.coverage_categories?.length) problems.push(`${testCase.case_id} has no coverage categories.`);
    if (!testCase.difficulty) problems.push(`${testCase.case_id} has no difficulty.`);
    if (!testCase.ambiguity_level) problems.push(`${testCase.case_id} has no ambiguity_level.`);
    if (!testCase.interpretation_rationale) problems.push(`${testCase.case_id} has no interpretation rationale.`);
    for (const expected of testCase.expected_query_components || []) {
      if (!expected.component || !expected.concept) problems.push(`${testCase.case_id} has malformed expected query component.`);
      for (const groundingRef of expected.grounding_refs || []) {
        if (!SAFE_VM577_DISPOSITIONS.has(groundingRef.disposition)) {
          problems.push(`${testCase.case_id} positive component ${expected.component} uses unsafe VM-577 disposition ${groundingRef.disposition}.`);
        }
      }
    }
    for (const forbidden of testCase.forbidden_query_components || []) {
      if (!forbidden.component || !forbidden.concept) problems.push(`${testCase.case_id} has malformed forbidden query component.`);
      for (const groundingRef of forbidden.grounding_refs || []) {
        if (!SAFE_VM577_DISPOSITIONS.has(groundingRef.disposition)) {
          problems.push(`${testCase.case_id} forbidden component ${forbidden.component} uses unsafe VM-577 disposition ${groundingRef.disposition}.`);
        }
      }
    }
    if ((testCase.expected_ambiguities || []).some((item) => UNSAFE_VM577_DISPOSITIONS.has(item.disposition)) && testCase.ambiguity_level === "low") {
      problems.push(`${testCase.case_id} uses unsafe/ambiguous evidence but is marked low ambiguity.`);
    }
    if (testCase.exact_expected_query && ((testCase.expected_ambiguities || []).length || (testCase.expected_unresolved || []).length)) {
      problems.push(`${testCase.case_id} has exact_expected_query despite ambiguity/unresolved annotations.`);
    }
  }
  if (!ids.has("VM578-001")) problems.push("Known Case A is missing.");
  if (!ids.has("VM578-002")) problems.push("Known Case B is missing.");
  const wormCase = corpus.find((item) => item.case_id === "VM578-002");
  if (!JSON.stringify(wormCase).includes("type:worm") || !JSON.stringify(wormCase).includes("type:wurm")) {
    problems.push("Known Case B does not preserve Worm/Wurm distinction.");
  }
  if (problems.length) throw new Error(problems.join("\n"));
}

function validateBreakerCases(breakerCases) {
  const problems = [];
  if (breakerCases.length < 5 || breakerCases.length > 10) problems.push(`Breaker set should contain 5-10 cases, found ${breakerCases.length}.`);
  const ids = new Set();
  for (const breaker of breakerCases) {
    if (!breaker.breaker_id || !breaker.utterance || !breaker.purpose || !breaker.expected_safe_behavior) {
      problems.push(`${breaker.breaker_id || "(missing id)"} is missing required breaker fields.`);
    }
    if (ids.has(breaker.breaker_id)) problems.push(`Duplicate breaker_id ${breaker.breaker_id}.`);
    ids.add(breaker.breaker_id);
  }
  if (problems.length) throw new Error(problems.join("\n"));
}

function validateLiveAcceptance(liveAcceptance, corpus) {
  const cases = new Set(corpus.map((item) => item.case_id));
  const problems = [];
  if (liveAcceptance.length !== 10) problems.push(`Live acceptance set must contain exactly 10 cases, found ${liveAcceptance.length}.`);
  const ids = new Set();
  for (const item of liveAcceptance) {
    if (!cases.has(item.case_id)) problems.push(`Live acceptance references unknown case ${item.case_id}.`);
    if (ids.has(item.case_id)) problems.push(`Duplicate live acceptance case ${item.case_id}.`);
    ids.add(item.case_id);
    if (!item.why_selected || !item.owner_should_inspect || !item.failure_definition) {
      problems.push(`${item.case_id} is missing live acceptance review fields.`);
    }
  }
  if (problems.length) throw new Error(problems.join("\n"));
}

function validateVm577Artifacts(rowRecords, ownerReviewQueue, collisions) {
  const counts = new Map();
  for (const row of rowRecords) counts.set(row.verification_disposition, (counts.get(row.verification_disposition) || 0) + 1);
  const expectedCounts = {
    AMBIGUOUS: 355,
    INVALID: 1,
    SEMANTIC_REVIEW: 259,
    SOURCE_ARTIFACT: 2,
    STALE: 37,
    UNVERIFIED: 266,
    VERIFIED_INTERNAL: 588,
    VERIFIED_NATIVE: 1192,
    VERIFIED_QUERY: 30,
    VERIFIED_TAG: 52,
  };
  const problems = [];
  if (rowRecords.length !== 2782) problems.push(`VM-577 row total expected 2782 but found ${rowRecords.length}.`);
  if (ownerReviewQueue.length !== 920) problems.push(`VM-577 owner review total expected 920 but found ${ownerReviewQueue.length}.`);
  if (collisions.length !== 83) problems.push(`VM-577 collision total expected 83 but found ${collisions.length}.`);
  for (const [disposition, expected] of Object.entries(expectedCounts)) {
    if ((counts.get(disposition) || 0) !== expected) problems.push(`VM-577 ${disposition} expected ${expected} but found ${counts.get(disposition) || 0}.`);
  }
  if (problems.length) throw new Error(problems.join("\n"));
  return {
    total: rowRecords.length,
    ownerReviewTotal: ownerReviewQueue.length,
    collisionTotal: collisions.length,
    dispositionCounts: expectedCounts,
  };
}

async function loadVm577() {
  const rowRecords = await readJsonl(path.join(verificationDir, "row-verification.jsonl"));
  const ownerReviewQueue = await readJson(path.join(verificationDir, "owner-review-queue.json"));
  const collisions = await readJson(path.join(verificationDir, "collisions.json"));
  return validateVm577Artifacts(rowRecords, ownerReviewQueue, collisions);
}

function summarizeDiagnostics(diagnostics) {
  return {
    recognized: diagnostics.filter((item) => item.code === "parser_recognized").map((item) => item.message),
    ignored: diagnostics.filter((item) => item.code === "parser_ignored").map((item) => item.message),
    warnings: diagnostics.filter((item) => item.level === "warning").map((item) => item.message),
    unresolved_terms: diagnostics.filter((item) => item.code === "parser_unresolved_term").map((item) => item.details?.term).filter(Boolean),
    alternatives: diagnostics.filter((item) => item.code === "parser_alternative" || item.code === "parser_ambiguity_choice").map((item) => item.details || {}),
    confidence: diagnostics.find((item) => item.code === "parser_confidence")?.details?.confidence ?? null,
    relaxations: diagnostics.find((item) => item.code === "parser_validation_plan")?.details?.relaxations || [],
  };
}

function classifyResult(testCase, actual) {
  if (actual.compiler_error) {
    return {
      disposition: "FAIL",
      failure_reasons: ["compiler error"],
      matched_components: [],
      missing_components: (testCase.expected_query_components || []).map((item) => item.component),
      forbidden_present: [],
    };
  }
  const query = actual.primary_query || "";
  const required = testCase.expected_query_components || [];
  const forbidden = testCase.forbidden_query_components || [];
  const matched = required.filter((item) => hasComponent(query, item.component)).map((item) => item.component);
  const missing = required.filter((item) => !hasComponent(query, item.component)).map((item) => item.component);
  const forbiddenPresent = forbidden.filter((item) => hasComponent(query, item.component)).map((item) => item.component);
  const failureReasons = [];
  if (testCase.exact_expected_query && normalizeQuery(query) !== normalizeQuery(testCase.exact_expected_query)) failureReasons.push("query serialization or component mismatch");
  if (missing.length) failureReasons.push("required constraint missing");
  if (forbiddenPresent.length) failureReasons.push("forbidden component present");
  if ((testCase.expected_optional_concepts || []).length && required.length && missing.length === 0) failureReasons.push("optionality needs owner review");
  if ((testCase.coverage_categories || []).includes("Commander color / color identity language") && missing.some((item) => item.includes("id") || item.includes("c"))) failureReasons.push("color-vs-identity interpretation");
  if ((testCase.coverage_categories || []).includes("AND / OR / NOT / only / scope language") && (missing.length || forbiddenPresent.length)) failureReasons.push("OR/exclusion/scope handling");
  if ((testCase.coverage_categories || []).includes("Gameplay role / functional-search language") && missing.length === 0 && (testCase.expected_unresolved || []).length) failureReasons.push("functional-language unresolved");
  if ((testCase.coverage_categories || []).includes("Similarity") && !actual.expected_unresolved_acknowledged) failureReasons.push("similarity unsupported");
  if (actual.confidence !== null && actual.confidence >= 0.9 && (missing.length || (testCase.expected_unresolved || []).length || (testCase.expected_ambiguities || []).length)) failureReasons.push("high-confidence bad or incomplete interpretation");
  const exactOk = !testCase.exact_expected_query || normalizeQuery(query) === normalizeQuery(testCase.exact_expected_query);
  let disposition = "PASS";
  if (forbiddenPresent.length || (required.length && matched.length === 0 && missing.length)) disposition = "FAIL";
  else if (missing.length || !exactOk || (testCase.expected_unresolved || []).length || (testCase.expected_ambiguities || []).length || (testCase.expected_optional_concepts || []).length) disposition = matched.length || required.length === 0 ? "PARTIAL" : "REVIEW";
  if (testCase.ambiguity_level === "high" && disposition === "PASS") disposition = "REVIEW";
  if (!failureReasons.length && disposition !== "PASS") failureReasons.push("owner interpretation review");
  return {
    disposition,
    failure_reasons: [...new Set(failureReasons)],
    matched_components: matched,
    missing_components: missing,
    forbidden_present: forbiddenPresent,
  };
}

async function buildBaseline(corpus, vm577Consistency) {
  const grounding = await readJson(path.join(repoRoot, "data", "scryfall", "grounding", "scryfall-grounding.json"));
  const semantics = await readJson(path.join(repoRoot, "data", "scryfall", "grounding", "plain-reading-semantics.json"));
  setScryfallGrounding(grounding);
  setPlainReadingSemanticRegistry(semantics);

  const results = [];
  for (const testCase of corpus) {
    let actual;
    try {
      const compiled = resolveMazeQueryRequest({
        mode: "ai",
        input: testCase.utterance,
        options: { format: "", useFormatDefault: false },
      });
      const diagnostics = summarizeDiagnostics(compiled.diagnostics || []);
      actual = {
        raw_input: testCase.utterance,
        normalized_input: compiled.queryModel?.normalizedInput || testCase.normalized_utterance,
        primary_query: compiled.query,
        parser_mode: compiled.parserMode,
        api: compiled.api || {},
        reason: compiled.reason || "",
        diagnostics: compiled.diagnostics || [],
        query_model: compiled.queryModel || null,
        confidence: diagnostics.confidence,
        recognized: diagnostics.recognized,
        ignored: diagnostics.ignored,
        warnings: diagnostics.warnings,
        unresolved_terms: diagnostics.unresolved_terms,
        alternatives: diagnostics.alternatives,
        relaxations: diagnostics.relaxations,
        compiler_error: null,
        expected_unresolved_acknowledged: (testCase.expected_unresolved || []).some((term) => diagnostics.unresolved_terms.some((actualTerm) => String(term).toLowerCase().includes(String(actualTerm).toLowerCase()) || String(actualTerm).toLowerCase().includes(String(term).toLowerCase()))),
      };
    } catch (error) {
      actual = {
        raw_input: testCase.utterance,
        normalized_input: testCase.normalized_utterance,
        primary_query: "",
        parser_mode: "",
        api: {},
        reason: "",
        diagnostics: [],
        query_model: null,
        confidence: null,
        recognized: [],
        ignored: [],
        warnings: [],
        unresolved_terms: [],
        alternatives: [],
        relaxations: [],
        compiler_error: `${error.name}: ${error.message}`,
        expected_unresolved_acknowledged: false,
      };
    }
    results.push({ ...testCase, actual, comparison: classifyResult(testCase, actual) });
  }
  return { results, summary: summarizeBaseline(corpus, results, vm577Consistency) };
}

function summarizeBaseline(corpus, results, vm577Consistency) {
  const failureClassCases = {};
  for (const result of results) {
    for (const reason of result.comparison.failure_reasons) {
      if (!failureClassCases[reason]) failureClassCases[reason] = [];
      failureClassCases[reason].push(result.case_id);
    }
  }
  const metric = (predicate) => results.filter(predicate).length;
  return {
    generated_at: GENERATED_AT,
    compiler_source: "assets/js/maze/maze-query-core.js resolveMazeQueryRequest(mode=ai)",
    grounding_source: "data/scryfall/grounding/scryfall-grounding.json",
    semantic_registry_source: "data/scryfall/grounding/plain-reading-semantics.json",
    canonical_sources: SOURCE_FILES,
    vm577_consistency: vm577Consistency,
    corpus: {
      total_cases: corpus.length,
      source_origin_counts: countBy(corpus, (item) => item.case_origin),
      difficulty_counts: countBy(corpus, (item) => item.difficulty),
      ambiguity_counts: countBy(corpus, (item) => item.ambiguity_level),
      coverage_counts: countBy(corpus.flatMap((item) => item.coverage_categories), (item) => item),
      vm577_disposition_usage: countBy(corpus.flatMap((item) => item.verification_dispositions_used || []), (item) => item),
    },
    baseline: {
      result_counts: countBy(results, (item) => item.comparison.disposition),
      compiler_errors: metric((item) => item.actual.compiler_error),
      vocabulary_recognition_issues: metric((item) => item.actual.unresolved_terms.length > 0),
      grounding_errors: metric((item) => item.comparison.failure_reasons.includes("required constraint missing")),
      optionality_failures_or_reviews: metric((item) => item.comparison.failure_reasons.includes("optionality needs owner review")),
      or_exclusion_scope_failures: metric((item) => item.comparison.failure_reasons.includes("OR/exclusion/scope handling")),
      color_identity_failures: metric((item) => item.comparison.failure_reasons.includes("color-vs-identity interpretation")),
      functional_language_failures_or_reviews: metric((item) => item.comparison.failure_reasons.includes("functional-language unresolved")),
      scaffold_unresolved_quality_issues: metric((item) => item.actual.unresolved_terms.some((term) => ["show", "me", "i", "want", "cards", "things", "stuff"].includes(String(term).toLowerCase()))),
      unsupported_semantic_invention: metric((item) => item.comparison.forbidden_present.length > 0),
      high_confidence_bad_interpretations: metric((item) => item.comparison.failure_reasons.includes("high-confidence bad or incomplete interpretation")),
      similarity_related_failures_or_reviews: metric((item) => item.comparison.failure_reasons.includes("similarity unsupported")),
      no_query_or_star_query: metric((item) => !item.actual.primary_query || item.actual.primary_query === "*"),
      serialization_only_difference: metric((item) => item.comparison.failure_reasons.length === 1 && item.comparison.failure_reasons[0] === "query serialization or component mismatch"),
    },
    failure_classes: Object.fromEntries(Object.entries(failureClassCases).map(([reason, cases]) => [reason, { count: cases.length, cases }])),
  };
}

function buildArtifacts({ corpus, sourceLedger, liveAcceptance, results, summary }) {
  const corpusCsvRows = corpus.map((item) => ({
    case_id: item.case_id,
    utterance: item.utterance,
    case_origin: item.case_origin,
    sources: item.source_ids.join("; "),
    coverage_categories: item.coverage_categories.join("; "),
    difficulty: item.difficulty,
    ambiguity_level: item.ambiguity_level,
    required_components: (item.expected_query_components || []).map((componentItem) => componentItem.component).join(" "),
    forbidden_components: (item.forbidden_query_components || []).map((componentItem) => componentItem.component).join(" "),
    exact_expected_query: item.exact_expected_query,
    rationale: item.interpretation_rationale,
  }));
  const baselineCsvRows = results.map((item) => ({
    case_id: item.case_id,
    utterance: item.utterance,
    disposition: item.comparison.disposition,
    primary_query: item.actual.primary_query,
    confidence: item.actual.confidence,
    missing_components: item.comparison.missing_components.join(" "),
    forbidden_present: item.comparison.forbidden_present.join(" "),
    failure_reasons: item.comparison.failure_reasons.join("; "),
    unresolved_terms: item.actual.unresolved_terms.join("; "),
    compiler_error: item.actual.compiler_error || "",
  }));
  const resultMap = new Map(results.map((item) => [item.case_id, item]));
  const liveAcceptanceMd = liveAcceptance.map((selection) => {
    const item = resultMap.get(selection.case_id);
    return `## ${item.case_id}: ${item.utterance}\n\n- Why selected: ${selection.why_selected}\n- What owner should inspect: ${selection.owner_should_inspect}\n- Expected interpretation characteristics: ${item.interpretation_rationale}\n- What would constitute failure: ${selection.failure_definition}\n`;
  }).join("\n");
  const ownerReviewRows = results.map((item) => `| ${item.case_id} | ${item.comparison.disposition} | ${item.utterance.replace(/\|/g, "\\|")} | ${item.actual.primary_query.replace(/\|/g, "\\|")} | ${item.comparison.failure_reasons.join("; ").replace(/\|/g, "\\|")} |`).join("\n");

  const baselineSummary = [
    "# VM-578 Player-Language 100-Case Baseline Summary",
    "",
    `Generated: ${summary.generated_at}`,
    "",
    "## Artifact Ownership",
    "",
    "- Canonical corpus: `player-language-100.jsonl`.",
    "- Canonical source ledger: `source-ledger.json`.",
    "- Canonical non-counted breaker set: `breaker-cases.json`.",
    "- Canonical live-acceptance selection: `live-acceptance-10.json`.",
    "- Derived projections/results/reports are regenerated by `npm run baseline:maze-player-language` and checked by `npm run test:maze-player-language-corpus`.",
    "",
    "## Corpus Composition",
    "",
    `- Canonical cases: ${summary.corpus.total_cases}`,
    "- Existing VM-577 QA suite remains separate: 59",
    "- Combined deterministic evaluation inputs after VM-578: 159",
    `- Source origin counts: ${JSON.stringify(summary.corpus.source_origin_counts)}`,
    `- Difficulty counts: ${JSON.stringify(summary.corpus.difficulty_counts)}`,
    `- Ambiguity counts: ${JSON.stringify(summary.corpus.ambiguity_counts)}`,
    `- VM-577 disposition usage: ${JSON.stringify(summary.corpus.vm577_disposition_usage)}`,
    "",
    "## VM-577 Reconciliation",
    "",
    `- Row-level records: ${summary.vm577_consistency.total}`,
    `- Owner-review rows: ${summary.vm577_consistency.ownerReviewTotal}`,
    `- Collision groups: ${summary.vm577_consistency.collisionTotal}`,
    "",
    "## Baseline Outcomes",
    "",
    `- Result counts: ${JSON.stringify(summary.baseline.result_counts)}`,
    `- Compiler errors: ${summary.baseline.compiler_errors}`,
    `- Vocabulary recognition issues: ${summary.baseline.vocabulary_recognition_issues}`,
    `- Grounding/component misses: ${summary.baseline.grounding_errors}`,
    `- Optionality reviews/failures: ${summary.baseline.optionality_failures_or_reviews}`,
    `- OR/exclusion/scope failures: ${summary.baseline.or_exclusion_scope_failures}`,
    `- Color/identity failures: ${summary.baseline.color_identity_failures}`,
    `- Functional-language reviews/failures: ${summary.baseline.functional_language_failures_or_reviews}`,
    `- Unsupported semantic invention: ${summary.baseline.unsupported_semantic_invention}`,
    `- High-confidence bad or incomplete interpretations: ${summary.baseline.high_confidence_bad_interpretations}`,
    `- Similarity-related reviews/failures: ${summary.baseline.similarity_related_failures_or_reviews}`,
    `- No-query/star-query cases: ${summary.baseline.no_query_or_star_query}`,
    "",
    "## Dominant Findings",
    "",
    "- Simple native color/type/keyword cases are the clearest current strengths.",
    "- Commander color and color-identity wording remains high-risk when actual color and deck-fit context both appear.",
    "- Optionality language such as preferably, bonus if, and if possible is usually not represented as a first-class preference.",
    "- Functional ETB, protection, token support, and role language often needs richer semantics than a single Oracle-text fragment.",
    "- OR, exclusion, and contradictory scope cases are important because losing one small English modifier changes the search meaning.",
    "- Similarity requests should remain unresolved or alternative-only until a governed similarity layer exists.",
    "- High confidence on partial interpretations is dangerous when unresolved role or similarity intent is central.",
    "",
    "## Next Recommended VM",
    "",
    "Create the smallest compiler-remediation VM around preference/scope diagnostics and functional-language honesty before adding new semantic mappings. A second VM can then promote a narrow, verified set of functional concepts from this corpus into `plain-reading-semantics.json` with owner review.",
    "",
  ].join("\n");

  return new Map([
    ["player-language-100.csv", writeCsv(corpusCsvRows, ["case_id", "utterance", "case_origin", "sources", "coverage_categories", "difficulty", "ambiguity_level", "required_components", "forbidden_components", "exact_expected_query", "rationale"])],
    ["source-ledger.csv", writeCsv(sourceLedger, ["source_id", "source_type", "repository_path", "title", "date", "relevant_section", "evidence_limitation", "derivation_mode", "privacy_copyright_note"])],
    ["baseline-results.jsonl", `${results.map((item) => JSON.stringify(item)).join("\n")}\n`],
    ["baseline-results.csv", writeCsv(baselineCsvRows, ["case_id", "utterance", "disposition", "primary_query", "confidence", "missing_components", "forbidden_present", "failure_reasons", "unresolved_terms", "compiler_error"])],
    ["failure-classes.json", `${JSON.stringify({
      generated_at: summary.generated_at,
      taxonomy_note: "Failure classes are compact, observed categories derived from component comparison and compiler diagnostics; they are not product success targets.",
      failure_classes: summary.failure_classes,
    }, null, 2)}\n`],
    ["baseline-summary.md", baselineSummary],
    ["live-acceptance-10.md", `# VM-578 Recommended Live Acceptance 10\n\n${liveAcceptanceMd}`],
    ["owner-review-table.md", `# VM-578 Owner Review Table\n\n| Case | Baseline | Input | Current Query | Review reason |\n|---|---|---|---|---|\n${ownerReviewRows}\n`],
  ]);
}

async function writeOrCheckArtifacts(artifacts) {
  await mkdir(corpusDir, { recursive: true });
  if (checkMode) {
    const mismatches = [];
    for (const [fileName, expected] of artifacts) {
      const actual = await readFile(path.join(corpusDir, fileName), "utf8").catch(() => "");
      if (actual !== expected) mismatches.push(fileName);
    }
    if (mismatches.length) throw new Error(`VM-578 derived artifacts are stale: ${mismatches.join(", ")}`);
    return;
  }
  for (const [fileName, contents] of artifacts) {
    await writeFile(path.join(corpusDir, fileName), contents, "utf8");
  }
}

async function main() {
  const { corpus, sourceLedger, breakerCases, liveAcceptance } = await loadSources();
  validateSourceLedger(sourceLedger);
  validateCorpus(corpus, sourceLedger);
  validateBreakerCases(breakerCases);
  validateLiveAcceptance(liveAcceptance, corpus);
  const vm577Consistency = await loadVm577();
  const { results, summary } = await buildBaseline(corpus, vm577Consistency);
  if (results.length !== 100) throw new Error(`Baseline runner processed ${results.length} cases, expected 100.`);
  const artifacts = buildArtifacts({ corpus, sourceLedger, liveAcceptance, results, summary });
  await writeOrCheckArtifacts(artifacts);
  console.log(`VM-578 corpus baseline ${checkMode ? "checked" : "generated"}: ${corpus.length} canonical cases, ${results.length} baseline results, ${summary.baseline.compiler_errors} compiler errors.`);
  console.log(`Baseline result counts: ${JSON.stringify(summary.baseline.result_counts)}`);
}

await main();

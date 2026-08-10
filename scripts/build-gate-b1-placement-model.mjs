import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN_DIR = path.join(ROOT, "docs", "plans", "vm551-gate-b1-placement-instrument");
const PRODUCT_DIR = path.join(ROOT, "docs", "plans", "vm551-gate-b1-product-fit");
const PROTOTYPE_PATH = path.join(
  ROOT,
  "docs",
  "prototypes",
  "vm551-gate-b1-owner-experience",
  "prototype-data.json"
);
const MAPPING_PATH = path.join(ROOT, "data", "placement", "gate-b1-mapping.source.json");
const OUTPUT_PATH = path.join(ROOT, "data", "gate-b1-placement-model.json");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function parseTsv(filePath) {
  const lines = readText(filePath).trimEnd().split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.map((line) => {
    const values = line.split("\t");
    assert.equal(values.length, headers.length, `TSV width mismatch in ${filePath}: ${line}`);
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
}

function splitList(value) {
  return String(value || "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function sha256(filePath) {
  return hash(readText(filePath));
}

function rawSha256(filePath) {
  return hash(fs.readFileSync(filePath));
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function pairId(left, right) {
  return [left, right].sort().join("__");
}

const sourcePaths = {
  constructs: path.join(PLAN_DIR, "construct-map.tsv"),
  questions: path.join(PLAN_DIR, "pilot-question-bank.tsv"),
  answers: path.join(PLAN_DIR, "answer-signal-contracts.tsv"),
  semantic: path.join(PLAN_DIR, "answer-semantic-adjudication.tsv"),
  identities: path.join(PLAN_DIR, "identity-coverage-matrix.tsv"),
  confusionPairs: path.join(PLAN_DIR, "confusion-pair-coverage.tsv"),
  resultContent: path.join(PRODUCT_DIR, "result-usefulness-matrix.tsv"),
  prototype: PROTOTYPE_PATH,
  mapping: MAPPING_PATH,
};

const constructs = parseTsv(sourcePaths.constructs);
const questionRows = parseTsv(sourcePaths.questions);
const answerRows = parseTsv(sourcePaths.answers);
const semanticRows = parseTsv(sourcePaths.semantic);
const identityRows = parseTsv(sourcePaths.identities);
const pairRows = parseTsv(sourcePaths.confusionPairs);
const prototype = JSON.parse(readText(PROTOTYPE_PATH));
const mappingSource = JSON.parse(readText(MAPPING_PATH));
function normalizeMappingRule(rule, authorityLayer) {
  const namingSupport = rule.naming_support || (rule.naming_evidence ? rule.support : []);
  const qualificationEligible = rule.qualification_eligible ?? rule.mapping_role !== "boundary_only_group";
  const qualificationSupport = rule.qualification_support || (qualificationEligible ? rule.support : []);
  return {
    ...rule,
    naming_support: [...namingSupport],
    naming_evidence: namingSupport.length > 0,
    qualification_eligible: qualificationEligible,
    qualification_support: [...qualificationSupport],
    authority_layer: authorityLayer,
  };
}

const baselineMappingRules = mappingSource.mapping_rules.map((rule) => normalizeMappingRule(rule, "baseline_40"));
const remediationMappingRules = (mappingSource.remediation_overlay?.rules || []).map((rule) => normalizeMappingRule(rule, "instrument_completion_overlay"));
const combinedMappingRules = [...baselineMappingRules, ...remediationMappingRules];

const instrumentContract = mappingSource.instrument_contract || {};
assert.equal(constructs.length, Number(instrumentContract.constructs || 16), "Gate B1 construct count drift");
assert.equal(questionRows.length, Number(instrumentContract.questions || 35), "Gate B1 behavioral question count drift");
assert.equal(answerRows.length, Number(instrumentContract.answers || 110), "Gate B1 behavioral answer count drift");
assert.equal(identityRows.length, 37, "Gate B1 must retain 37 identities");
assert.equal(pairRows.length, 123, "Gate B1 must retain 123 confusion pairs");
assert.equal(mappingSource.mapping_rules.length, 40, "All 40 evidence-required directional uses must be adjudicated");

const answerById = new Map(answerRows.map((answer) => [answer.answer_id, answer]));
const semanticById = new Map(semanticRows.map((row) => [row.answer_id, row]));
const mappingByAnswer = new Map(combinedMappingRules.map((rule) => [rule.answer_id, rule]));
const identityIds = new Set(identityRows.map((identity) => identity.identity_id));

assert.equal(answerById.size, answerRows.length, "Answer IDs must be unique");
assert.equal(mappingByAnswer.size, combinedMappingRules.length, "Directional mapping answer IDs must be unique across baseline and overlay");

for (const rule of combinedMappingRules) {
  assert(answerById.has(rule.answer_id), `Mapping references unknown answer ${rule.answer_id}`);
  if (rule.authority_layer === "baseline_40") {
    assert.equal(
      semanticById.get(rule.answer_id)?.review_disposition,
      "EVIDENCE_REQUIRED",
      `${rule.answer_id} is not an approved evidence-required directional use`
    );
  } else {
    assert(rule.adjudication_id, `${rule.answer_id} remediation mapping lacks adjudication_id`);
    assert(rule.provenance, `${rule.answer_id} remediation mapping lacks provenance`);
    assert.equal(
      semanticById.get(rule.answer_id)?.review_disposition,
      "EVIDENCE_REQUIRED",
      `${rule.answer_id} completion mapping lacks evidence-required semantic adjudication`
    );
  }
  for (const identity of [...rule.support, ...rule.contradict]) {
    assert(identityIds.has(identity), `${rule.answer_id} references unknown identity ${identity}`);
  }
  for (const identity of rule.naming_support) {
    assert(rule.support.includes(identity), `${rule.answer_id} naming support must also be positive support for ${identity}`);
  }
  for (const identity of rule.qualification_support) {
    assert(rule.support.includes(identity), `${rule.answer_id} qualification support must also be positive support for ${identity}`);
  }
}

const directionalIds = semanticRows
  .filter((row) => row.review_disposition === "EVIDENCE_REQUIRED")
  .map((row) => row.answer_id)
  .sort();
assert.deepEqual(
  combinedMappingRules.map((rule) => rule.answer_id).sort(),
  directionalIds,
  "Mapping source must cover exactly the evidence-required directional uses across baseline and completion layers"
);

const pairCoverageByQuestion = new Map();
const confusionPairs = pairRows.map((row) => {
  const id = pairId(row.identity_a, row.identity_b);
  const questionIds = splitList(row.pilot_question_ids);
  for (const questionId of questionIds) {
    const covered = pairCoverageByQuestion.get(questionId) || [];
    covered.push(id);
    pairCoverageByQuestion.set(questionId, covered);
  }
  return {
    id,
    identities: [row.identity_a, row.identity_b],
    audit_basis: row.audit_basis,
    audit_marker: row.audit_path_count_or_marker,
    category: row.coverage_category,
    observable_distinction: row.observable_behavioral_distinction,
    question_ids: questionIds,
    why_defensible: row.why_defensible,
    when_not_to_ask: row.when_not_to_ask,
    coverage_status: row.pilot_coverage_status,
    provenance: row.evidence_provenance,
  };
});

const questions = questionRows.map((row) => {
  const answerIds = splitList(row.answer_ids);

  return {
    id: row.question_id,
    stage: row.stage.toLowerCase(),
    order: Number(row.pool_order),
    construct_id: row.primary_construct_id,
    prompt: row.question_prompt,
    eyebrow: row.stage,
    primary_observation: row.primary_observation,
    competitor_family: row.competitor_pair_or_family,
    dependency_group: row.dependency_group,
    ask_when: row.adaptive_ask_when,
    do_not_ask_when: row.do_not_ask_when,
    evidence_provenance: row.evidence_provenance,
    scoring_status: row.scoring_status,
    pair_coverage: (pairCoverageByQuestion.get(row.question_id) || []).sort(),
    answers: answerIds.map((answerId) => {
      const answer = answerById.get(answerId);
      const semantic = semanticById.get(answerId);
      const mapping = mappingByAnswer.get(answerId);
      assert(answer, `Question ${row.question_id} references unknown answer ${answerId}`);
      return {
        id: answer.answer_id,
        title: answer.answer_title,
        copy: answer.explanatory_sentence,
        observation: answer.plain_language_observation,
        signal: answer.primary_signal,
        secondary_signal: answer.optional_bounded_secondary_signal || null,
        dependency_group: answer.dependency_group,
        exclusions: answer.exclusions,
        evidence_provenance: answer.evidence_provenance,
        mapping_confidence: answer.mapping_confidence,
        source_scoring_status: answer.scoring_status,
        limitation: answer.limitation_statement,
        semantic_disposition: semantic?.review_disposition || null,
        evidence_authority: semantic?.evidence_authority || null,
        identity_mapping: mapping
          ? {
              support: [...mapping.support].sort(),
              contradict: [...mapping.contradict].sort(),
              affected_identities: [...new Set([...mapping.support, ...mapping.contradict])].sort(),
              strength: mapping.strength,
              naming_evidence: mapping.naming_evidence,
              qualification_eligible: mapping.qualification_eligible,
              qualification_support: [...mapping.qualification_support].sort(),
              naming_support: [...mapping.naming_support].sort(),
              naming_rule_ids_by_identity: Object.fromEntries(
                mapping.naming_support.map((identity) => [identity, [`${mapping.authority_layer}:${mapping.answer_id}:${identity}`]])
              ),
              role: mapping.mapping_role,
              provenance: mapping.provenance,
              status: mapping.authority_layer === "baseline_40" ? "MAPPING_HYPOTHESIS" : "REMEDIATION_MAPPING_HYPOTHESIS",
              authority_layer: mapping.authority_layer,
            }
          : {
              support: [],
              contradict: [],
              affected_identities: [],
              strength: 0,
              naming_evidence: false,
              qualification_eligible: false,
              qualification_support: [],
              naming_support: [],
              naming_rule_ids_by_identity: {},
              role: "observation_only",
              provenance: answer.evidence_provenance,
              status: "OBSERVATION_ONLY",
            },
      };
    }),
  };
});

const signalAffinities = new Map(identityRows.map((row) => [row.identity_id, new Set()]));
for (const question of questions) {
  for (const answer of question.answers) {
    for (const identity of answer.identity_mapping.support) {
      signalAffinities.get(identity).add(`${question.construct_id}:${answer.signal}`);
    }
  }
}

const identities = identityRows.map((row) => ({
  id: row.identity_id,
  name: row.identity_name,
  family: row.identity_family,
  supporting_constructs: splitList(row.supporting_constructs),
  boundary_constructs: splitList(row.boundary_constructs),
  strongest_competitors: splitList(row.strongest_likely_competitors).map((entry) => entry.split(":")[0]),
  minimum_independent_observations: row.minimum_independent_observations,
  evidence_quality: row.current_evidence_quality,
  pilot_question_ids: splitList(row.pilot_question_ids),
  pilot_coverage: row.pilot_coverage,
  uncovered_risks: row.uncovered_risks,
  instrument_observability: row.instrument_observability,
  observability_rationale: row.observability_rationale,
  mapping_validation: row.mapping_validation,
  evidence_provenance: row.evidence_provenance,
  route_signal_affinities: [...signalAffinities.get(row.identity_id)].sort(),
  can_name_from_behavior: row.instrument_observability === "OBSERVABLE",
}));

const lensQuestions = prototype.lensQuestions.map((question) => ({
  id: question.id,
  stage: "crucible",
  order: 1,
  construct_id: null,
  prompt: question.prompt,
  eyebrow: question.presentationLabel,
  help: question.help,
  evidence_class: question.evidenceClass,
  dependency_group: question.dependencyGroup,
  candidate_set: question.candidateSet,
  ask_when: question.askWhen,
  do_not_ask_when: question.doNotAskWhen,
  max_per_journey: question.maxPerJourney,
  source_ref: question.sourceRef,
  answers: question.answers.map((answer) => ({
    id: answer.id,
    title: answer.title,
    copy: answer.explanation,
    observation: answer.observation,
    direction: answer.direction,
    evidence_class: answer.evidenceClass,
    source_scoring_status: answer.status,
    limitation: answer.limitation,
    source_ref: answer.sourceRef,
  })),
}));

const model = {
  _meta: {
    model_version: "vm551-gate-b1-placement-engine-v1",
    result_version: "2026-08-09-gate-b1-v1",
    instrument_version: mappingSource.instrument_version,
    mapping_version: mappingSource.version,
    source_commit: "a0a517a1aa14c7025b3d7b8f242e55aef35b8670",
    framing: "Deterministic in-model evidence ranking. Mapping hypotheses are not empirical player accuracy or calibrated confidence.",
    counts: {
      constructs: constructs.length,
      questions: questions.length,
      answers: answerRows.length,
      identities: identities.length,
      confusion_pairs: confusionPairs.length,
      directional_mapping_uses: combinedMappingRules.length,
      baseline_directional_mapping_uses: baselineMappingRules.length,
      remediation_directional_mapping_uses: remediationMappingRules.length,
      lens_questions: lensQuestions.length,
    },
    source_sha256: Object.fromEntries(
      Object.entries(sourcePaths).map(([key, filePath]) => [key, sha256(filePath)])
    ),
  },
  scoring_rules: mappingSource.scoring_contract,
  naming_qualification_contract: mappingSource.naming_qualification_contract,
  naming_rules: combinedMappingRules
    .filter((rule) => rule.naming_support.length > 0)
    .flatMap((rule) => rule.naming_support.map((identity) => ({
      id: `${rule.authority_layer}:${rule.answer_id}:${identity}`,
      identity,
      trigger_answer_id: rule.answer_id,
      required_positive_dependencies: mappingSource.naming_qualification_contract.minimum_positive_dependencies,
      required_positive_constructs: mappingSource.naming_qualification_contract.minimum_positive_constructs,
      contradiction_guard: mappingSource.naming_qualification_contract.contradiction_guard,
      provenance: rule.provenance,
      limitation: mappingSource.naming_qualification_contract.limitation,
      authority_layer: rule.authority_layer,
    }))),
  stages: {
    gate: { min_questions: 4, max_questions: 4 },
    hall: {
      min_questions: mappingSource.scoring_contract.minimum_hall_questions,
      max_questions: mappingSource.scoring_contract.maximum_hall_questions,
    },
    crucible: { min_questions: 0, max_questions: mappingSource.scoring_contract.maximum_targeted_questions },
    min_total_questions: mappingSource.scoring_contract.minimum_main_questions,
    max_total_questions: mappingSource.scoring_contract.maximum_main_questions,
  },
  constructs: constructs.map((row) => ({
    id: row.construct_id,
    name: row.name,
    definition: row.plain_definition,
    does_not_mean: row.does_not_mean,
    stage: row.stage.toLowerCase(),
    dependency_overlap: row.dependency_overlap,
    allowed_primary_signals: splitList(row.allowed_primary_signals),
    scoring_boundary: row.scoring_boundary,
  })),
  identities,
  question_bank: {
    gate: questions.filter((question) => question.stage === "gate").sort((a, b) => a.order - b.order),
    hall: questions.filter((question) => question.stage === "hall").sort((a, b) => a.order - b.order),
    crucible: questions.filter((question) => question.stage === "crucible").sort((a, b) => a.order - b.order),
    lens: lensQuestions,
  },
  confusion_pairs: confusionPairs.sort((a, b) => a.id.localeCompare(b.id)),
};

const output = stableJson(model);
if (process.argv.includes("--check")) {
  assert(fs.existsSync(OUTPUT_PATH), `Missing generated model ${path.relative(ROOT, OUTPUT_PATH)}`);
  const committedModel = JSON.parse(readText(OUTPUT_PATH));
  for (const [key, filePath] of Object.entries(sourcePaths)) {
    const committedHash = committedModel?._meta?.source_sha256?.[key];
    assert(
      [sha256(filePath), rawSha256(filePath)].includes(committedHash),
      `Generated Gate B1 placement model source is stale: ${key}`
    );
  }
  const comparisonModel = structuredClone(model);
  comparisonModel._meta.source_sha256 = committedModel._meta.source_sha256;
  assert.equal(readText(OUTPUT_PATH), stableJson(comparisonModel), "Generated Gate B1 placement model is stale");
  console.log(`Gate B1 placement model is current: ${constructs.length} constructs, ${questions.length} questions, ${answerRows.length} answers, 37 identities, 123 pairs, ${combinedMappingRules.length} directional uses.`);
} else {
  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
}

export const GATE_B1_RUNTIME_ERROR_MESSAGE =
  "Archscry placement data is stale or incomplete for Gate B1. Reload the page and try again.";

export const GATE_B1_RUNTIME_CONTRACT = Object.freeze({
  modelVersion: "vm551-gate-b1-placement-engine-v1",
  instrumentVersion: "vm551-gate-b1-instrument-v2",
  mappingVersion: "vm551-gate-b1-mapping-v2-instrument-completion",
  gate: Object.freeze([
    Object.freeze({ id: "b1.gate.initiative.v1", constructId: "C01" }),
    Object.freeze({ id: "b1.gate.visibility.v1", constructId: "C02" }),
    Object.freeze({ id: "b1.gate.disruption.v1", constructId: "C03" }),
    Object.freeze({ id: "b1.gate.tempo.v1", constructId: "C04" }),
  ]),
});

function failRuntimeContract(failedPredicate) {
  const error = new Error(GATE_B1_RUNTIME_ERROR_MESSAGE);
  error.name = "GateB1RuntimeContractError";
  error.failedPredicate = failedPredicate;
  throw error;
}

function uniqueIds(rows) {
  const ids = rows.map((row) => row?.id).filter((id) => typeof id === "string" && id.length > 0);
  return ids.length === rows.length && new Set(ids).size === ids.length;
}

function requirePredicate(value, predicate) {
  if (!value) failRuntimeContract(predicate);
}

/**
 * Validates the generated Gate B1 model against the runtime/engine contract.
 * Bank size is versioned model metadata and must match the loaded structure;
 * it is not independently frozen in the browser runtime.
 *
 * @param {object} model Generated Gate B1 placement model.
 * @param {Iterable<string>} liveIdentityKeys Identity keys available to result rendering.
 * @returns {object} Validated structural counts.
 */
export function validateGateB1RuntimeModel(model, liveIdentityKeys = []) {
  requirePredicate(model && typeof model === "object", "model_object");
  requirePredicate(model._meta?.model_version === GATE_B1_RUNTIME_CONTRACT.modelVersion, "model_version");
  requirePredicate(model._meta?.instrument_version === GATE_B1_RUNTIME_CONTRACT.instrumentVersion, "instrument_version");
  requirePredicate(model._meta?.mapping_version === GATE_B1_RUNTIME_CONTRACT.mappingVersion, "mapping_version");

  const constructs = Array.isArray(model.constructs) ? model.constructs : [];
  const identities = Array.isArray(model.identities) ? model.identities : [];
  const confusionPairs = Array.isArray(model.confusion_pairs) ? model.confusion_pairs : [];
  const gate = Array.isArray(model.question_bank?.gate) ? model.question_bank.gate : [];
  const hall = Array.isArray(model.question_bank?.hall) ? model.question_bank.hall : [];
  const crucible = Array.isArray(model.question_bank?.crucible) ? model.question_bank.crucible : [];
  const lens = Array.isArray(model.question_bank?.lens) ? model.question_bank.lens : [];
  const behavioralQuestions = [...gate, ...hall, ...crucible];
  const allQuestions = [...behavioralQuestions, ...lens];
  const behavioralAnswers = behavioralQuestions.flatMap((question) => Array.isArray(question.answers) ? question.answers : []);
  const allAnswers = allQuestions.flatMap((question) => Array.isArray(question.answers) ? question.answers : []);
  const constructIds = new Set(constructs.map((construct) => construct.id));
  const identityIds = new Set(identities.map((identity) => identity.id));
  const questionIds = new Set(allQuestions.map((question) => question.id));

  requirePredicate(constructs.length > 0 && uniqueIds(constructs), "construct_ids");
  requirePredicate(behavioralQuestions.length > 0 && uniqueIds(allQuestions), "question_ids");
  requirePredicate(allAnswers.length > 0 && uniqueIds(allAnswers), "answer_ids");
  requirePredicate(identities.length > 0 && uniqueIds(identities), "identity_ids");
  requirePredicate(confusionPairs.length > 0 && uniqueIds(confusionPairs), "confusion_pair_ids");

  requirePredicate(
    gate.length === GATE_B1_RUNTIME_CONTRACT.gate.length &&
      gate.every((question, index) =>
        question.id === GATE_B1_RUNTIME_CONTRACT.gate[index].id &&
        question.construct_id === GATE_B1_RUNTIME_CONTRACT.gate[index].constructId &&
        question.stage === "gate" &&
        Array.isArray(question.answers) &&
        question.answers.length === 4
      ),
    "approved_gate_sequence"
  );
  requirePredicate(hall.every((question) => question.stage === "hall"), "hall_stage_structure");
  requirePredicate(crucible.every((question) => question.stage === "crucible"), "crucible_stage_structure");
  requirePredicate(lens.every((question) => question.evidence_class === "IDENTITY_LENS_SELF_REPORT"), "lens_structure");

  requirePredicate(
    behavioralQuestions.every((question) =>
      typeof question.id === "string" &&
      constructIds.has(question.construct_id) &&
      typeof question.dependency_group === "string" &&
      Array.isArray(question.answers) &&
      question.answers.length > 0
    ),
    "behavioral_question_schema"
  );
  requirePredicate(
    behavioralAnswers.every((answer) =>
      typeof answer.id === "string" &&
      typeof answer.signal === "string" &&
      typeof answer.dependency_group === "string" &&
      answer.identity_mapping &&
      Array.isArray(answer.identity_mapping.support) &&
      Array.isArray(answer.identity_mapping.contradict) &&
      Array.isArray(answer.identity_mapping.qualification_support) &&
      Array.isArray(answer.identity_mapping.naming_support)
    ),
    "behavioral_answer_schema"
  );
  requirePredicate(
    behavioralAnswers.every((answer) =>
      [...answer.identity_mapping.support, ...answer.identity_mapping.contradict].every((id) => identityIds.has(id))
    ),
    "answer_identity_references"
  );
  requirePredicate(
    confusionPairs.every((pair) =>
      Array.isArray(pair.identities) &&
      pair.identities.length === 2 &&
      pair.identities.every((id) => identityIds.has(id)) &&
      Array.isArray(pair.question_ids) &&
      pair.question_ids.every((id) => questionIds.has(id))
    ),
    "confusion_pair_references"
  );

  requirePredicate(
    model.stages?.gate?.min_questions === 4 &&
      model.stages?.gate?.max_questions === 4 &&
      model.stages?.min_total_questions === 6 &&
      model.stages?.max_total_questions === 8,
    "journey_stage_contract"
  );

  const counts = model._meta?.counts || {};
  requirePredicate(
    counts.constructs === constructs.length &&
      counts.questions === behavioralQuestions.length &&
      counts.answers === behavioralAnswers.length &&
      counts.identities === identities.length &&
      counts.confusion_pairs === confusionPairs.length &&
      counts.lens_questions === lens.length,
    "metadata_counts_match_structure"
  );

  const sourceHashes = model._meta?.source_sha256 || {};
  requirePredicate(
    ["constructs", "questions", "answers", "semantic", "identities", "confusionPairs", "resultContent", "prototype", "mapping"]
      .every((key) => /^[a-f0-9]{64}$/.test(sourceHashes[key] || "")),
    "generated_source_provenance"
  );

  const liveKeys = new Set(liveIdentityKeys);
  requirePredicate(liveKeys.size > 0 && identities.every((identity) => liveKeys.has(identity.id)), "identity_rendering_coverage");

  return {
    constructs: constructs.length,
    questions: behavioralQuestions.length,
    answers: behavioralAnswers.length,
    identities: identities.length,
    confusionPairs: confusionPairs.length,
    gateQuestions: gate.length,
    hallQuestions: hall.length,
    crucibleQuestions: crucible.length,
  };
}

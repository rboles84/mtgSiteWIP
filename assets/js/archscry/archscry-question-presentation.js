const VALUE_ADDING_JARGON_IDS = new Set([
  "JRG_COLOR_COUNT",
  "JRG_COLOR_ROLES",
  "JRG_ENGINE",
  "JRG_GRAVEYARD",
  "JRG_INTERACTION",
  "JRG_PUBLIC_COMMITMENT",
  "JRG_SETUP",
  "JRG_SPELL_HEAVY",
  "JRG_TABLE_DEAL",
  "JRG_THEME",
]);

function normalizedTermIds(question = {}) {
  return Array.isArray(question.jargon_term_ids)
    ? question.jargon_term_ids.map((term) => String(term || "").trim()).filter(Boolean)
    : [];
}

/**
 * Returns approved helper copy only when the question contains a term whose
 * misunderstanding could materially change the answer. The copy remains
 * canonical-source-owned; this function only decides whether it earns space.
 */
export function helperTextForQuestion(question = {}) {
  const helper = String(question.jargon_help || "").trim();
  if (!helper) return "";
  return normalizedTermIds(question).some((termId) => VALUE_ADDING_JARGON_IDS.has(termId))
    ? helper
    : "";
}

/**
 * Builds truthful adaptive progress without claiming a final question count
 * before the engine has decided whether the reading needs six, seven, or eight.
 */
export function buildAdaptiveProgress({
  stageLabel,
  stageQuestionNumber,
  stageMaximum,
  questionNumber,
  minimumQuestions = 6,
  maximumQuestions = 8,
} = {}) {
  const safeStageNumber = Math.max(1, Number(stageQuestionNumber) || 1);
  const safeStageMaximum = Math.max(safeStageNumber, Number(stageMaximum) || safeStageNumber);
  const safeQuestionNumber = Math.max(1, Number(questionNumber) || 1);
  const safeMinimum = Math.max(1, Number(minimumQuestions) || 6);
  const safeMaximum = Math.max(safeMinimum, Number(maximumQuestions) || 8);
  return {
    label: `${stageLabel} · ${safeStageNumber} of ${safeStageMaximum} · Reading moment ${safeQuestionNumber} of ${safeMinimum}–${safeMaximum}`,
    percentage: Math.min(100, (safeQuestionNumber / safeMaximum) * 100),
  };
}

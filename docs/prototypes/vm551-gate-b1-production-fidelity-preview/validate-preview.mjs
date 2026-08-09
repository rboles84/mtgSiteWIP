import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(here, "../vm551-gate-b1-owner-experience/prototype-data.json"), "utf8"));
const branches = JSON.parse(fs.readFileSync(path.join(here, "branching-map.json"), "utf8"));
const appSource = fs.readFileSync(path.join(here, "app.js"), "utf8");
const bridgeSource = fs.readFileSync(path.join(here, "production-dossier-bridge.js"), "utf8");
const browserSource = fs.readFileSync(path.join(here, "validate-preview-browser.mjs"), "utf8");
const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const stageCounts = Object.fromEntries(["Gate", "Hall", "Crucible"].map((stage) => [stage, data.questions.filter((question) => question.stage === stage).length]));
const answers = data.questions.flatMap((question) => question.answers || []);
const identityCounts = data.results.reduce((counts, result) => {
  counts.content[result.contentReadiness] = (counts.content[result.contentReadiness] || 0) + 1;
  counts.observability[result.instrumentObservability] = (counts.observability[result.instrumentObservability] || 0) + 1;
  counts.mapping[result.mappingValidation] = (counts.mapping[result.mappingValidation] || 0) + 1;
  return counts;
}, { content: {}, observability: {}, mapping: {} });

assert(data.counts.constructs === 16, "Expected 16 constructs.");
assert(data.questions.length === 35, "Expected 35 behavioral questions.");
assert(stageCounts.Gate === 4 && stageCounts.Hall === 13 && stageCounts.Crucible === 18, "Expected Gate/Hall/Crucible counts 4/13/18.");
assert(answers.length === 110, "Expected 110 behavioral answer contracts.");
assert(data.results.length === 37, "Expected 37 identity result packages.");
assert(identityCounts.content.CONTENT_READY === 37, "Expected 37 CONTENT_READY identities.");
assert(identityCounts.observability.OBSERVABLE === 22, "Expected 22 OBSERVABLE identities.");
assert(identityCounts.observability.PARTIALLY_OBSERVABLE === 14, "Expected 14 PARTIALLY_OBSERVABLE identities.");
assert(identityCounts.observability.NOT_CLEANLY_OBSERVABLE === 1, "Expected one NOT_CLEANLY_OBSERVABLE identity.");
assert(identityCounts.mapping.MAPPING_HYPOTHESIS === 37, "Expected 37 MAPPING_HYPOTHESIS identities.");

const questionMap = new Map([...data.questions, ...(data.lensQuestions || [])].map((question) => [question.id, question]));
assert(branches.universalGateQuestionIds.length === 4, "Every free journey must begin with exactly four Gate questions.");
assert(branches.universalGateQuestionIds.every((id) => questionMap.get(id)?.stage === "Gate"), "Universal baseline must contain only approved Gate questions.");
assert(branches.branchStates.length === 8, "Expected eight authored free-answer branch states.");

for (const branch of branches.branchStates) {
  const matchKeys = Object.keys(branch.match);
  assert(branch.match.fallback || ["initiative", "visibility", "disruption", "tempo"].every((key) => matchKeys.includes(key)), `${branch.id} must evaluate the complete Gate baseline.`);
  assert(branch.questionIds.length >= 2 && branch.questionIds.length <= 4, `${branch.id} adaptive portion must keep the journey within 6–8 items.`);
  assert(branches.universalGateQuestionIds.length + branch.questionIds.length <= 8, `${branch.id} exceeds the hard maximum of eight.`);
  assert(questionMap.get(branch.questionIds[0])?.stage === "Hall", `${branch.id} Question 5 must be a Hall question.`);
  assert(branch.questionIds.every((id) => questionMap.has(id)), `${branch.id} has an orphan question reference.`);
  assert(branch.questionIds.every((id) => questionMap.get(id)?.evidenceClass !== "IDENTITY_LENS_SELF_REPORT"), `${branch.id} may not introduce the lens through free branching.`);
  assert(branch.unresolvedConstruct && branch.reason && branch.dependencyAvoided, `${branch.id} lacks reviewer branch metadata.`);
}

const requiredJourneys = ["simic-quandrix", "esper-information-to-plan", "colorless", "wubrg", "white", "yore-no-lens", "yore-lens-skipped", "yore-lens-answered", "yore-lens-contradictory"];
const requiredJourneyStates = { "simic-quandrix": "close", "esper-information-to-plan": "close", colorless: "insufficient", wubrg: "mixed", white: "primary", "yore-no-lens": "insufficient", "yore-lens-skipped": "close", "yore-lens-answered": "close", "yore-lens-contradictory": "contradictory" };
assert(branches.reviewJourneys.length === requiredJourneys.length, "Expected exactly nine production-fidelity review cases.");
assert(new Set(branches.reviewJourneys.map((journey) => journey.id)).size === requiredJourneys.length, "Production-fidelity review case IDs must be unique.");
assert(requiredJourneys.every((id) => branches.reviewJourneys.some((journey) => journey.id === id)), "A required owner-review journey is missing.");
for (const review of branches.reviewJourneys) {
  assert(!review.steps && !review.answerIds && !review.selectedAnswerIds, `${review.id}: branching-map.json must not define authored route semantics.`);
  const route = data.walkthroughs.find((walkthrough) => walkthrough.id === review.id);
  assert(route, `Missing authored walkthrough ${review.id}.`);
  assert(route.state === requiredJourneyStates[review.id], `${review.id} authored result state changed from ${requiredJourneyStates[review.id]}.`);
  assert(new Set(route.steps.map((step) => step.questionId)).size === route.steps.length, `${review.id} repeats an authored question ID.`);
  for (const step of route.steps) {
    const question = questionMap.get(step.questionId);
    assert(question, `${review.id} has orphan authored question ${step.questionId}.`);
    assert(question.answers?.some((answer) => answer.id === step.selectedAnswerId), `${review.id} answer ${step.selectedAnswerId} does not belong to ${step.questionId}.`);
  }
  assert(route.steps.length >= 6 && route.steps.length <= 8, `${review.id} must contain 6–8 questions.`);
  assert(route.steps.slice(0, 4).every((step, index) => step.questionId === branches.universalGateQuestionIds[index]), `${review.id} does not preserve the shared first four questions.`);
  const lensSteps = route.steps.filter((step) => questionMap.get(step.questionId)?.evidenceClass === "IDENTITY_LENS_SELF_REPORT");
  assert(lensSteps.length <= 1, `${review.id} has more than one lens item.`);
  if (lensSteps.length) assert(route.lensEligibility?.eligible === true, `${review.id} asks the lens without recorded eligibility.`);
  if (review.id === "yore-lens-skipped") assert(lensSteps[0]?.selectedAnswerId.endsWith(".skip"), "Yore skip route must use the non-directional lens answer.");
  if (review.id === "yore-lens-contradictory") assert(route.contradictionStatus === "STRONG_BEHAVIORAL_CONTRADICTION", "Contradiction route must preserve its contradiction state.");
}

const requiredFiles = ["index.html", "styles.css", "app.js", "production-dossier-bridge.js", "branching-map.json", "README.md", "validate-preview-browser.mjs"];
for (const file of requiredFiles) assert(fs.existsSync(path.join(here, file)), `Missing preview file ${file}.`);

assert(!appSource.includes("panelConfig") && !appSource.includes("preview-dossier-panel"), "Preview must not independently define production dossier sections.");
assert(appSource.includes("renderProductionDossier") && bridgeSource.includes("assets/js/index.js"), "Preview result must use the production dossier authority bridge.");
assert(bridgeSource.includes("Boot, restore, compatibility exports, and session events"), "Authority bridge must strip the production boot/controller boundary.");
assert(!bridgeSource.includes("vm_resumeSession()") && !bridgeSource.includes("bindArchscryControls()"), "Authority bridge must not initialize live session, questionnaire, or persistence controllers.");
assert(appSource.includes("Continue into the Hall") && appSource.includes("Open my reading"), "Both transitions must be player-paced.");
assert(!appSource.includes("setTimeout(renderResult") && !appSource.includes("setTimeout(() => { state.index = 4"), "Transition auto-advance remains in the preview.");
assert(appSource.includes("stageProgress(question)") && !appSource.includes("Math.min(8"), "Progress must be derived by stage, not a fixed overall total.");
assert(appSource.includes('new Set(["board wipe"])'), "Q3 duplicate board-wipe helper suppression is missing.");
assert(appSource.includes("routeSelectionAudit") && appSource.includes("routeSelectionsMatch") && appSource.includes("data-selected-answer"), "Result summary must derive from an exact route audit and actual selected answers.");
assert(appSource.includes("data-authored-target") && appSource.includes("data-route-match") && appSource.includes("data-route-mismatches"), "Reviewer route cues or diagnostics are missing.");
assert(browserSource.includes("vm_last_result") && browserSource.includes("vm_profile") && browserSource.includes("localStorage"), "Browser validation must protect saved storage state.");
assert(browserSource.includes("dossierContract") && browserSource.includes("productionUrl"), "Browser validation must compare a named preview dossier with production DOM contracts.");
assert(browserSource.includes("runAllAuthoredRouteTruth") && browserSource.includes("runAuthoredRoutePositive") && browserSource.includes("runAuthoredRouteNegative"), "Browser validation must cover every exposed authored route positively and negatively.");

console.log("VM-551 Gate B1 production-fidelity preview validation: PASS");
console.log(`Architecture: ${data.counts.constructs} constructs; ${data.questions.length} questions (${stageCounts.Gate}/${stageCounts.Hall}/${stageCounts.Crucible}); ${answers.length} answers; ${data.results.length} identities.`);
console.log(`Readiness: ${identityCounts.content.CONTENT_READY} content-ready; ${identityCounts.observability.OBSERVABLE}/${identityCounts.observability.PARTIALLY_OBSERVABLE}/${identityCounts.observability.NOT_CLEANLY_OBSERVABLE} observability; ${identityCounts.mapping.MAPPING_HYPOTHESIS} mapping hypotheses.`);
console.log(`Preview: ${branches.branchStates.length} free-answer branch states; ${branches.reviewJourneys.length} required owner-review journeys; shared first four; hard maximum eight; guarded optional lens.`);

import assert from "node:assert/strict";
import fs from "node:fs";
import {
  createInitialState,
  finalizeReading,
  observe,
  replaySelections,
  selectNextQuestion,
} from "../assets/js/gate-b1-placement-engine.js";
import {
  buildReadingSignalCopy,
  closeAlternativeForResult,
  withGateAPublicState,
} from "../assets/js/archscry-presentation.js";
import { buildCommanderDossier } from "../assets/js/commander-dossier.js";

const MODEL = JSON.parse(fs.readFileSync(new URL("../data/gate-b1-placement-model.json", import.meta.url), "utf8"));
const FACTIONS = JSON.parse(fs.readFileSync(new URL("../data/factions.json", import.meta.url), "utf8")).factions;
const RANDOM_JOURNEYS = 5000;

const ROUTES = {
  primary: [
    ["b1.gate.initiative.v1", "b1.gate.initiative.v1.respond"],
    ["b1.gate.visibility.v1", "b1.gate.visibility.v1.board"],
    ["b1.gate.disruption.v1", "b1.gate.disruption.v1.limit"],
    ["b1.gate.tempo.v1", "b1.gate.tempo.v1.depends"],
    ["b1.hall.commitment.v1", "b1.hall.commitment.v1.access"],
    ["b1.hall.setup.v1", "b1.hall.setup.v1.early"],
    ["b1.hall.engine-shape.v1", "b1.hall.engine-shape.v1.purpose"],
  ],
  closeWithoutSecondary: [
    ["b1.gate.initiative.v1", "b1.gate.initiative.v1.respond"],
    ["b1.gate.visibility.v1", "b1.gate.visibility.v1.split"],
    ["b1.gate.disruption.v1", "b1.gate.disruption.v1.protect"],
    ["b1.gate.tempo.v1", "b1.gate.tempo.v1.burst"],
    ["b1.hall.commitment.v1", "b1.hall.commitment.v1.access"],
    ["b1.hall.setup.v1", "b1.hall.setup.v1.change"],
  ],
  closeWithTwoAlternatives: [
    ["b1.gate.initiative.v1", "b1.gate.initiative.v1.advance"],
    ["b1.gate.visibility.v1", "b1.gate.visibility.v1.held"],
    ["b1.gate.disruption.v1", "b1.gate.disruption.v1.protect"],
    ["b1.gate.tempo.v1", "b1.gate.tempo.v1.burst"],
    ["b1.hall.pressure.v1", "b1.hall.pressure.v1.combat"],
    ["b1.hall.commitment.v1", "b1.hall.commitment.v1.short"],
    ["b1.hall.sacrifice.v1", "b1.hall.sacrifice.v1.preserve"],
  ],
  mixedWithTwoAlternatives: [
    ["b1.gate.initiative.v1", "b1.gate.initiative.v1.advance"],
    ["b1.gate.visibility.v1", "b1.gate.visibility.v1.board"],
    ["b1.gate.disruption.v1", "b1.gate.disruption.v1.limit"],
    ["b1.gate.tempo.v1", "b1.gate.tempo.v1.small"],
    ["b1.hall.pressure.v1", "b1.hall.pressure.v1.combat"],
    ["b1.hall.sacrifice.v1", "b1.hall.sacrifice.v1.renew"],
    ["b1.hall.breadth.v1", "b1.hall.breadth.v1.narrow"],
    ["b1.crucible.disruption-boundary.v1", "b1.crucible.disruption-boundary.v1.act"],
  ],
  tiedWithExtraNearbyIdentity: [
    ["b1.gate.initiative.v1", "b1.gate.initiative.v1.balance"],
    ["b1.gate.visibility.v1", "b1.gate.visibility.v1.held"],
    ["b1.gate.disruption.v1", "b1.gate.disruption.v1.protect"],
    ["b1.gate.tempo.v1", "b1.gate.tempo.v1.burst"],
    ["b1.hall.commitment.v1", "b1.hall.commitment.v1.procedure"],
    ["b1.hall.interaction-window.v1", "b1.hall.interaction-window.v1.split"],
    ["b1.hall.information-to-plan.v1", "b1.hall.information-to-plan.v1.open"],
    ["b1.crucible.jeskai.v1", "b1.crucible.jeskai.v1.sequence"],
  ],
};

function selections(route) {
  return route.map(([question_id, answer_id]) => ({ question_id, answer_id }));
}

function calculatedResult(route) {
  const state = replaySelections(MODEL, selections(route));
  const raw = finalizeReading({ state, model: MODEL, factions: FACTIONS });
  const result = withGateAPublicState({ result: raw, placementModel: MODEL, factions: FACTIONS });
  return { state, raw, result };
}

function assertNoUndefined(value, path = "result") {
  assert.notEqual(value, undefined, `${path} must not be undefined`);
  if (typeof value === "string") {
    assert(!/\bundefined\b/i.test(value), `${path} must not render undefined`);
  } else if (Array.isArray(value)) {
    value.forEach((entry, index) => assertNoUndefined(entry, `${path}[${index}]`));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => assertNoUndefined(entry, `${path}.${key}`));
  }
}

function assertPublicResultContract(result) {
  const top = result.top_matches || [];
  const adjacent = result.adjacent_matches || [];
  const alternatives = result.alternatives || [];
  assertNoUndefined(result);
  top.forEach((match, index) => {
    assert.equal(match.rank, index + 1);
    assert(FACTIONS[match.faction], `Unknown public identity ${match.faction}`);
    assert.equal(typeof match.faction_name, "string");
    assert(match.faction_name.length > 0);
    assert.equal(typeof match.score, "number");
  });
  alternatives.forEach((alternative) => {
    assert.equal(alternative.naming_qualification?.qualified, true);
    assert.equal(alternative.meaningful_support, true);
    assert.equal(alternative.identity, alternative.faction);
    assert.equal(alternative.match?.faction, alternative.faction);
    assert(
      result.evidence_trail.some((entry) =>
        entry.deltas?.some((delta) => delta.faction === alternative.faction && Number(delta.delta) > 0)
      ),
      `Public alternative ${alternative.faction} requires direct positive evidence`
    );
  });

  if (result.result_state === "primary") {
    assert(top.length >= 1 && top.length <= 3);
    assert.equal(adjacent.length, alternatives.length);
    assert.equal(top.length, alternatives.length + 1);
    assert.equal(result.alternative_state, alternatives.length ? "exploration" : "none");
  } else if (result.result_state === "close") {
    assert.equal(top.length, 2);
    assert.equal(adjacent.length, 1);
    assert.equal(alternatives.length, 1);
    assert.equal(result.alternative_state, "close");
    assert.equal(top[1].faction, adjacent[0].faction);
    assert.equal(top[1].faction, alternatives[0].faction);
    assert(closeAlternativeForResult(result, MODEL, FACTIONS));
  } else if (result.result_state === "tied") {
    assert.equal(top.length, 2);
    assert.equal(top[0].score, top[1].score);
    assert.equal(adjacent.length, 0);
    assert.equal(alternatives.length, 1);
    assert.equal(result.alternative_state, "co-leader");
  } else if (result.result_state === "mixed") {
    assert(top.length >= 0 && top.length <= 3);
    assert(alternatives.length <= 2);
    assert.equal(adjacent.length, alternatives.length);
    assert.equal(top.length, alternatives.length ? alternatives.length + 1 : 0);
    assert.equal(result.alternative_state, alternatives.length ? "mixed" : "none");
  } else {
    assert.equal(adjacent.length, 0);
    assert.equal(alternatives.length, 0);
    assert.equal(result.alternative_state, "none");
    assert.equal(top.length, 0);
  }
  if (top.length === 3) {
    assert(
      ["primary", "mixed"].includes(result.result_state),
      "Only primary exploration or mixed may expose a tertiary identity"
    );
  }
}

function restrictQualifiedIdentities(rawResult, allowedIdentities) {
  const allowed = new Set(allowedIdentities);
  const result = structuredClone(rawResult);
  result.internal_candidate_order = result.internal_candidate_order.map((candidate) => allowed.has(candidate.identity)
    ? candidate
    : {
        ...candidate,
        naming_qualification: {
          ...(candidate.naming_qualification || {}),
          qualified: false,
        },
      });
  result.alternatives = (result.alternatives || []).filter((alternative) =>
    allowed.has(alternative.identity || alternative.faction)
  );
  return result;
}

const primarySource = calculatedResult(ROUTES.primary).raw;
const primary = withGateAPublicState({
  result: restrictQualifiedIdentities(primarySource, [primarySource.faction]),
  placementModel: MODEL,
  factions: FACTIONS,
});
assert.equal(primary.result_state, "primary");
assert.equal(primary.top_matches.length, 1);
assertPublicResultContract(primary);

const primaryAlternativeSource = calculatedResult(ROUTES.closeWithTwoAlternatives).raw;
assert.equal(primaryAlternativeSource.alternatives.length, 2);
const oneAlternativeIdentity = primaryAlternativeSource.alternatives[0].identity;
const primaryWithOneAlternative = withGateAPublicState({
  result: {
    ...restrictQualifiedIdentities(primaryAlternativeSource, [primaryAlternativeSource.faction, oneAlternativeIdentity]),
    engine_result_state: "primary",
    result_state: "primary",
    alternatives: primaryAlternativeSource.alternatives.slice(0, 1),
  },
  placementModel: MODEL,
  factions: FACTIONS,
});
assert.equal(primaryWithOneAlternative.result_state, "primary");
assert.equal(primaryWithOneAlternative.top_matches.length, 2);
assert.equal(primaryWithOneAlternative.alternative_state, "exploration");
assertPublicResultContract(primaryWithOneAlternative);

const primaryWithTwoAlternatives = withGateAPublicState({
  result: {
    ...structuredClone(primaryAlternativeSource),
    engine_result_state: "primary",
    result_state: "primary",
  },
  placementModel: MODEL,
  factions: FACTIONS,
});
assert.equal(primaryWithTwoAlternatives.result_state, "primary");
assert.equal(primaryWithTwoAlternatives.top_matches.length, 3);
assert.equal(primaryWithTwoAlternatives.alternatives.length, 2);
assert.equal(primaryWithTwoAlternatives.alternative_state, "exploration");
assertPublicResultContract(primaryWithTwoAlternatives);
const explorationDossier = buildCommanderDossier({
  factions: FACTIONS,
  placementModel: MODEL,
  placementResult: primaryWithTwoAlternatives,
  targetFactionKey: primaryWithTwoAlternatives.faction,
});
assert.equal(explorationDossier.mode, "primary");
assert.equal(explorationDossier.adjacentFits.length, 2);
assert(explorationDossier.adjacentFits.every((fit) => !fit.reason.includes("no direct positive answer signal")));
const explorationComparison = buildCommanderDossier({
  factions: FACTIONS,
  placementModel: MODEL,
  placementResult: primaryWithTwoAlternatives,
  targetFactionKey: primaryWithTwoAlternatives.alternatives[0].faction,
});
assert.equal(explorationComparison.mode, "adjacent");
assert(explorationComparison.adjacentLabel.startsWith("Supported comparison:"));

const orphanClose = calculatedResult(ROUTES.closeWithoutSecondary);
assert.equal(orphanClose.raw.result_state, "close");
assert.equal(orphanClose.raw.alternatives.length, 0);
assert.equal(orphanClose.result.result_state, "primary", "Close without a qualified secondary must become primary");
assertPublicResultContract(orphanClose.result);

const close = calculatedResult(ROUTES.closeWithTwoAlternatives);
assert.equal(close.raw.result_state, "close");
assert.equal(close.raw.alternatives.length, 2);
assert.equal(close.result.result_state, "close");
assert.deepEqual(close.result.top_matches.map((match) => match.faction), ["JUND", "R"]);
assertPublicResultContract(close.result);
const closeDossier = buildCommanderDossier({
  factions: FACTIONS,
  placementModel: MODEL,
  placementResult: close.result,
  targetFactionKey: "R",
});
assert.equal(closeDossier.mode, "adjacent");
assert(closeDossier.reasonItStayedClose.includes("Set the pace"));
assert(closeDossier.readingOmens.some((omen) => omen.answerTitle === "Set the pace"));
assert(!closeDossier.reasonItStayedClose.includes("no direct positive answer signal"));

const mixed = calculatedResult(ROUTES.mixedWithTwoAlternatives).result;
assert.equal(mixed.result_state, "mixed");
assert.equal(mixed.alternatives.length, 2);
assert.equal(mixed.top_matches.length, 3);
assertPublicResultContract(mixed);

const tied = calculatedResult(ROUTES.tiedWithExtraNearbyIdentity).result;
assert.equal(tied.result_state, "tied");
assert.deepEqual(tied.top_matches.map((match) => match.faction), ["JESKAI", "WU"]);
assertPublicResultContract(tied);

const injectedUnqualified = structuredClone(primary);
const internalRunner = injectedUnqualified.internal_candidate_order.find(
  (candidate) => candidate.identity !== injectedUnqualified.faction && !candidate.naming_qualification?.qualified
);
assert(internalRunner, "Primary fixture requires an unqualified internal runner-up");
injectedUnqualified.top_matches.push({
  rank: 2,
  faction: internalRunner.identity,
  faction_name: FACTIONS[internalRunner.identity].name,
  score: internalRunner.score,
});
injectedUnqualified.adjacent_matches = injectedUnqualified.top_matches.slice(1);
const guardedPrimary = withGateAPublicState({ result: injectedUnqualified, placementModel: MODEL, factions: FACTIONS });
assert(!guardedPrimary.top_matches.some((match) => match.faction === internalRunner.identity));
assertPublicResultContract(guardedPrimary);

for (const boundedState of ["contradictory", "insufficient", "unknown", "invalid", "incomplete"]) {
  const guardedBounded = withGateAPublicState({
    result: {
      ...structuredClone(primaryAlternativeSource),
      engine_result_state: boundedState,
      result_state: boundedState,
    },
    placementModel: MODEL,
    factions: FACTIONS,
  });
  assert.equal(guardedBounded.result_state, boundedState);
  assertPublicResultContract(guardedBounded);
}

const primarySignalCopy = buildReadingSignalCopy({
  dossier: { targetFactionKey: primary.faction },
  faction: FACTIONS[primary.faction],
  result: primary,
});
assert(!primarySignalCopy.includes("does not include a direct positive answer signal"));
assert(primary.evidence_trail.some((entry) => entry.answer_title && entry.deltas?.some((delta) => delta.faction === primary.faction && delta.delta > 0)));
assert(primary.evidence_ledger.every((entry) => !Object.hasOwn(entry, "deltas")), "Native Gate B1 ledger must remain unchanged");

function makeRng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

const random = makeRng(0x551b1);
const stateCounts = {};
const primaryAlternativeCounts = {};
for (let run = 0; run < RANDOM_JOURNEYS; run += 1) {
  let state = createInitialState(MODEL);
  for (let step = 0; step < 8; step += 1) {
    const question = selectNextQuestion(state, MODEL);
    if (!question) break;
    const answerIndex = Math.floor(random() * question.answers.length);
    state = observe({
      state,
      model: MODEL,
      question,
      answer: question.answers[answerIndex],
      answerIndex,
    });
  }
  const raw = finalizeReading({ state, model: MODEL, factions: FACTIONS });
  const result = withGateAPublicState({ result: raw, placementModel: MODEL, factions: FACTIONS });
  assertPublicResultContract(result);
  stateCounts[result.result_state] = (stateCounts[result.result_state] || 0) + 1;
  if (result.result_state === "primary") {
    const alternativeCount = result.alternatives.length;
    primaryAlternativeCounts[alternativeCount] = (primaryAlternativeCounts[alternativeCount] || 0) + 1;
  }
}

assert(stateCounts.primary > 0);
assert(stateCounts.close > 0);
assert(stateCounts.mixed > 0);
assert(stateCounts.insufficient > 0);
assert(primaryAlternativeCounts[0] > 0, "Generated primary readings must still permit a singular result");
assert(primaryAlternativeCounts[1] > 0, "Generated primary readings must expose a qualified comparison when available");

console.log(
  `PASS Gate B1 qualified-alternatives contract: focused primary 0/1/2 exploration, close/tied/mixed/evidence cases and ${RANDOM_JOURNEYS} deterministic valid journeys; states ${JSON.stringify(stateCounts)}; primary alternatives ${JSON.stringify(primaryAlternativeCounts)}.`
);

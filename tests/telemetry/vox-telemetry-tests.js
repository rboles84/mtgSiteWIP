import assert from "node:assert/strict";

import {
  TELEMETRY_SCHEMA_VERSION,
  VOX_TELEMETRY_EVENTS,
  beginVoxReading,
  beginVoxGuideSession,
  buildPostHogConfig,
  createVoxGuideEngagementTracker,
  derivePlacementVersion,
  filterPostHogEvent,
  initializeVoxTelemetry,
  normalizeVoxEvent,
  resetVoxTelemetryForTests,
  setVoxTelemetryProviderForTests,
  setVoxTelemetryTestSink,
  telemetryModeForLocation,
  trackVoxEvent,
  trackVoxGuideAction,
  trackVoxGuideWalkthrough,
  trackVoxQuestionAnswered,
  trackVoxReadingCompleted,
} from "../../assets/js/shared/vox-telemetry.js";
import { bootGuideTelemetry } from "../../assets/js/guide/guide-telemetry.js";

const model = {
  _meta: {
    model_version: "vm551-gate-b1-placement-engine-v1",
    instrument_version: "vm551-gate-b1-instrument-v2",
    mapping_version: "vm551-gate-b1-mapping-v2-instrument-completion",
    result_version: "2026-08-09-gate-b1-v1",
  },
};

const placementVersion = "m=vm551-gate-b1-placement-engine-v1|i=vm551-gate-b1-instrument-v2|map=vm551-gate-b1-mapping-v2-instrument-completion|r=2026-08-09-gate-b1-v1";
const readingRunId = "33590627-5500-4b95-8971-3cfd4d91f658";
const guideSessionId = "33590627-5500-4b95-8971-3cfd4d91f659";

const schemas = {
  [VOX_TELEMETRY_EVENTS.READING_STARTED]: {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    reading_run_id: readingRunId,
    placement_version: placementVersion,
    entry_mode: "quick",
  },
  [VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED]: {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    reading_run_id: readingRunId,
    placement_version: placementVersion,
    question_id: "Q_G1",
    answer_id: "Q_G1_A2",
    stage: "gate",
    step_index: 1,
  },
  [VOX_TELEMETRY_EVENTS.READING_COMPLETED]: {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    reading_run_id: readingRunId,
    placement_version: placementVersion,
    identity_key: "WUBRG",
    result_state: "primary",
    confidence_band: "current-best-fit",
    question_count: 7,
    stopping_state: "primary",
    stopping_reason: "clear_separation",
  },
  [VOX_TELEMETRY_EVENTS.GUIDE_OPENED]: {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    guide_session_id: guideSessionId,
    guide_surface: "overview",
    guide_mode: "guided",
  },
  [VOX_TELEMETRY_EVENTS.GUIDE_ENGAGED]: {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    guide_session_id: guideSessionId,
    guide_surface: "overview",
    active_seconds_threshold: 30,
  },
  [VOX_TELEMETRY_EVENTS.GUIDE_ACTION]: {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    guide_session_id: guideSessionId,
    guide_surface: "overview",
    action_kind: "product_exit",
    destination: "archscry",
  },
  [VOX_TELEMETRY_EVENTS.GUIDE_WALKTHROUGH]: {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    guide_session_id: guideSessionId,
    guide_surface: "overview",
    walkthrough_id: "vox-mana-intro",
    state: "completed",
    step_index: 4,
  },
};

assert.equal(derivePlacementVersion(model), placementVersion);
assert.equal(derivePlacementVersion({ _meta: { ...model._meta, mapping_version: null } }), null);

for (const [eventName, properties] of Object.entries(schemas)) {
  assert.deepEqual(normalizeVoxEvent(eventName, properties), properties);
}

assert.equal(normalizeVoxEvent("dossier_opened", schemas.reading_started), null);
for (const forbiddenKey of [
  "email",
  "name",
  "user_id",
  "account_id",
  "profile_id",
  "url",
  "query",
  "question_text",
  "answer_text",
  "guide_prose",
]) {
  assert.equal(normalizeVoxEvent(
    VOX_TELEMETRY_EVENTS.READING_STARTED,
    { ...schemas.reading_started, [forbiddenKey]: "forbidden" }
  ), null, `${forbiddenKey} must fail closed`);
}
assert.equal(normalizeVoxEvent(
  VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED,
  { ...schemas.question_answered, question_id: "What kind of game do you enjoy?" }
), null);
assert.equal(normalizeVoxEvent(
  VOX_TELEMETRY_EVENTS.GUIDE_ENGAGED,
  { ...schemas[VOX_TELEMETRY_EVENTS.GUIDE_ENGAGED], active_seconds_threshold: 15 }
), null);
assert.equal(normalizeVoxEvent(
  VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED,
  { ...schemas.question_answered, answer_id: "person@example.com" }
), null);

const providerEvent = filterPostHogEvent({
  event: VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED,
  properties: {
    ...schemas.question_answered,
    token: "public-token",
    distinct_id: "page-local-anonymous-id",
    $insert_id: "provider-event-id",
    $lib: "web",
    $lib_version: "1.2.3",
    $current_url: "https://voxmana.io/archscry/?secret=no",
    $referrer: "https://example.test/private",
    $browser: "Browser Name",
  },
});
assert.deepEqual(providerEvent.properties, {
  token: "public-token",
  distinct_id: "page-local-anonymous-id",
  $insert_id: "provider-event-id",
  $lib: "web",
  $lib_version: "1.2.3",
  ...schemas.question_answered,
  $process_person_profile: false,
  $geoip_disable: true,
});
assert.equal(filterPostHogEvent({ event: "$pageview", properties: {} }), null);
assert.equal(filterPostHogEvent({ event: "$autocapture", properties: {} }), null);
assert.equal(filterPostHogEvent({ event: "dossier_opened", properties: {} }), null);
assert.equal(filterPostHogEvent({
  event: VOX_TELEMETRY_EVENTS.READING_STARTED,
  properties: schemas.reading_started,
  $set: { email: "person@example.com" },
}), null);

const config = buildPostHogConfig();
assert.deepEqual({
  api_host: config.api_host,
  asset_host: config.asset_host,
  defaults: config.defaults,
  person_profiles: config.person_profiles,
  autocapture: config.autocapture,
  capture_pageview: config.capture_pageview,
  capture_pageleave: config.capture_pageleave,
  capture_dead_clicks: config.capture_dead_clicks,
  rageclick: config.rageclick,
  disable_session_recording: config.disable_session_recording,
  disable_surveys: config.disable_surveys,
  capture_performance: config.capture_performance,
  capture_heatmaps: config.capture_heatmaps,
  capture_exceptions: config.capture_exceptions,
  disable_persistence: config.disable_persistence,
  advanced_disable_flags: config.advanced_disable_flags,
}, {
  api_host: "https://us.i.posthog.com",
  asset_host: "https://us-assets.i.posthog.com",
  defaults: "2026-05-30",
  person_profiles: "identified_only",
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: false,
  capture_dead_clicks: false,
  rageclick: false,
  disable_session_recording: true,
  disable_surveys: true,
  capture_performance: false,
  capture_heatmaps: false,
  capture_exceptions: false,
  disable_persistence: true,
  advanced_disable_flags: true,
});
assert.equal(config.before_send, filterPostHogEvent);

assert.equal(telemetryModeForLocation({ hostname: "voxmana.io", search: "" }), "live");
assert.equal(telemetryModeForLocation({ hostname: "www.voxmana.io", search: "" }), "live");
assert.equal(telemetryModeForLocation({ hostname: "localhost", search: "" }), "off");
assert.equal(telemetryModeForLocation({ hostname: "127.0.0.1", search: "" }), "off");
assert.equal(telemetryModeForLocation({ hostname: "localhost", search: "?vox_telemetry=mock" }), "mock");
assert.equal(telemetryModeForLocation({ hostname: "localhost", search: "?vox_telemetry=live" }), "live");

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
try {
  let scriptsCreated = 0;
  globalThis.window = { location: { hostname: "localhost", search: "" } };
  globalThis.document = {
    createElement() {
      scriptsCreated += 1;
      return {};
    },
  };
  resetVoxTelemetryForTests();
  assert.equal(initializeVoxTelemetry(), false);
  assert.equal(scriptsCreated, 0, "ordinary local use must not load PostHog");

  globalThis.window = { location: { hostname: "localhost", search: "?vox_telemetry=live" } };
  globalThis.document = {
    createElement() {
      return {};
    },
    getElementsByTagName() {
      return [];
    },
    head: {
      appendChild() {
        throw new Error("script blocked");
      },
    },
  };
  resetVoxTelemetryForTests();
  assert.doesNotThrow(() => initializeVoxTelemetry());
  assert.equal(initializeVoxTelemetry(), false);
} finally {
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
  if (originalDocument === undefined) delete globalThis.document;
  else globalThis.document = originalDocument;
}

resetVoxTelemetryForTests();
assert.equal(trackVoxEvent(VOX_TELEMETRY_EVENTS.READING_STARTED, schemas.reading_started), false);

resetVoxTelemetryForTests();
setVoxTelemetryProviderForTests({ capture() { throw new Error("provider unavailable"); } });
assert.doesNotThrow(() => trackVoxEvent(VOX_TELEMETRY_EVENTS.READING_STARTED, schemas.reading_started));
assert.equal(trackVoxEvent(VOX_TELEMETRY_EVENTS.READING_STARTED, schemas.reading_started), false);

resetVoxTelemetryForTests();
const emitted = [];
setVoxTelemetryTestSink((event) => emitted.push(event));
const firstReadingRunId = beginVoxReading({ placementModel: model });
assert.equal(trackVoxQuestionAnswered({
  questionId: "Q_G1",
  answerId: "Q_G1_A2",
  stage: "gate",
  stepIndex: 1,
}), true);
assert.equal(trackVoxQuestionAnswered({
  questionId: "Q_H4",
  answerId: "Q_H4_A1",
  stage: "hall",
  stepIndex: 2,
}), true);
assert.equal(trackVoxReadingCompleted({
  result: {
    faction: "wubrg",
    result_state: "primary",
    public_confidence_state: "current-best-fit",
    stopping: { state: "primary", reason: "clear_separation" },
  },
  questionCount: 2,
}), true);
assert.equal(trackVoxReadingCompleted({
  result: {
    faction: "WUBRG",
    result_state: "primary",
    public_confidence_state: "current-best-fit",
    stopping: { state: "primary", reason: "clear_separation" },
  },
  questionCount: 2,
}), false);
assert.equal(trackVoxQuestionAnswered({
  questionId: "Q_C1",
  answerId: "Q_C1_A1",
  stage: "crucible",
  stepIndex: 3,
}), false);
assert.deepEqual(emitted.map(({ event }) => event), [
  VOX_TELEMETRY_EVENTS.READING_STARTED,
  VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED,
  VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED,
  VOX_TELEMETRY_EVENTS.READING_COMPLETED,
]);
assert.ok(emitted.every(({ properties }) => properties.reading_run_id === firstReadingRunId));
assert.ok(emitted.every(({ properties }) => properties.placement_version === placementVersion));

const secondReadingRunId = beginVoxReading({ placementModel: model });
assert.notEqual(secondReadingRunId, firstReadingRunId);
assert.equal(emitted.at(-1).event, VOX_TELEMETRY_EVENTS.READING_STARTED);
assert.equal(emitted.at(-1).properties.reading_run_id, secondReadingRunId);

function createFakeDocument() {
  const listeners = new Map();
  return {
    visibilityState: "visible",
    addEventListener(eventName, listener) {
      listeners.set(eventName, listener);
    },
    removeEventListener(eventName) {
      listeners.delete(eventName);
    },
    setVisibility(nextState) {
      this.visibilityState = nextState;
      listeners.get("visibilitychange")?.();
    },
    fire(eventName, event) {
      listeners.get(eventName)?.(event);
    },
  };
}

resetVoxTelemetryForTests();
const bootEvents = [];
setVoxTelemetryTestSink((event) => bootEvents.push(event));
const bootDocument = createFakeDocument();
const bootedGuide = bootGuideTelemetry({
  guideSurface: "reading",
  walkthroughId: "dossier-reading",
  documentRef: bootDocument,
  windowRef: { location: { href: "https://voxmana.io/guide/reading/?guided=dossier-reading" } },
  engagementOptions: { setIntervalFn: () => null },
});
assert.ok(bootedGuide);
assert.equal(bootEvents.filter(({ event }) => event === VOX_TELEMETRY_EVENTS.GUIDE_OPENED).length, 1);
assert.equal(bootEvents[0].properties.guide_mode, "guided");
bootDocument.fire("click", {
  target: { closest: () => ({ dataset: { guideCta: "archscry" } }) },
});
bootDocument.fire("click", { target: { closest: () => null } });
assert.deepEqual(bootEvents.map(({ event }) => event), [
  VOX_TELEMETRY_EVENTS.GUIDE_OPENED,
  VOX_TELEMETRY_EVENTS.GUIDE_ACTION,
]);
bootedGuide.dispose();

resetVoxTelemetryForTests();
const guideEvents = [];
setVoxTelemetryTestSink((event) => guideEvents.push(event));
const guideDocument = createFakeDocument();
let guideNow = 0;
let guideTick;
const activeGuideSessionId = beginVoxGuideSession({
  guideSurface: "overview",
  guideMode: "guided",
  documentRef: guideDocument,
  engagementOptions: {
    now: () => guideNow,
    setIntervalFn(callback) {
      guideTick = callback;
      return null;
    },
  },
});
assert.equal(guideEvents.filter(({ event }) => event === VOX_TELEMETRY_EVENTS.GUIDE_OPENED).length, 1);
assert.equal(guideEvents[0].properties.guide_session_id, activeGuideSessionId);
guideNow = 10_000;
guideTick();
guideDocument.setVisibility("hidden");
guideNow = 100_000;
guideTick();
guideDocument.setVisibility("visible");
guideNow = 120_000;
guideTick();
guideNow = 150_000;
guideTick();
guideNow = 210_000;
guideTick();
assert.deepEqual(
  guideEvents
    .filter(({ event }) => event === VOX_TELEMETRY_EVENTS.GUIDE_ENGAGED)
    .map(({ properties }) => properties.active_seconds_threshold),
  [10, 30, 60, 120],
);
assert.equal(trackVoxGuideAction({ destination: "archscry" }), true);
assert.equal(trackVoxGuideAction({ destination: "overview" }), true);
assert.equal(trackVoxGuideAction({ destination: "maze", actionKind: "guide_internal" }), true);
assert.equal(trackVoxGuideAction({ destination: "untracked-link" }), false);
assert.deepEqual(
  guideEvents.slice(-3).map(({ properties }) => [properties.action_kind, properties.destination]),
  [["product_exit", "archscry"], ["guide_internal", "overview"], ["guide_internal", "maze"]],
);
assert.equal(trackVoxGuideWalkthrough({
  walkthroughId: "vox-mana-intro",
  state: "started",
  stepIndex: 1,
}), true);
assert.equal(trackVoxGuideWalkthrough({
  walkthroughId: "vox-mana-intro",
  state: "completed",
  stepIndex: 4,
}), true);
assert.equal(trackVoxGuideWalkthrough({
  walkthroughId: "vox-mana-intro",
  state: "closed",
  stepIndex: 2,
}), true);
assert.deepEqual(
  guideEvents
    .filter(({ event }) => event === VOX_TELEMETRY_EVENTS.GUIDE_WALKTHROUGH)
    .map(({ properties }) => [properties.state, properties.step_index]),
  [["started", 1], ["completed", 4], ["closed", 2]],
);

let visibleSeconds = 0;
const directTrackerDocument = createFakeDocument();
const directTracker = createVoxGuideEngagementTracker({
  documentRef: directTrackerDocument,
  now: () => visibleSeconds,
  setIntervalFn: () => null,
});
visibleSeconds = 10_000;
assert.equal(directTracker.check(), 10);
directTracker.stop();

const originalMockWindow = globalThis.window;
const originalMockDocument = globalThis.document;
try {
  globalThis.window = { location: { hostname: "localhost", search: "?vox_telemetry=mock" } };
  globalThis.document = createFakeDocument();
  resetVoxTelemetryForTests();
  assert.equal(initializeVoxTelemetry(), true);
  beginVoxGuideSession({
    guideSurface: "maze",
    documentRef: globalThis.document,
    engagementOptions: { setIntervalFn: () => null },
  });
  assert.equal(globalThis.window.posthog, undefined, "mock mode must not load PostHog");
  assert.equal(globalThis.window.__VOX_TELEMETRY_EVENTS__[0].event, VOX_TELEMETRY_EVENTS.GUIDE_OPENED);
} finally {
  resetVoxTelemetryForTests();
  if (originalMockWindow === undefined) delete globalThis.window;
  else globalThis.window = originalMockWindow;
  if (originalMockDocument === undefined) delete globalThis.document;
  else globalThis.document = originalMockDocument;
}

resetVoxTelemetryForTests();
setVoxTelemetryProviderForTests({ capture() { throw new Error("provider unavailable"); } });
assert.doesNotThrow(() => beginVoxGuideSession({
  guideSurface: "reading",
  documentRef: createFakeDocument(),
  engagementOptions: { setIntervalFn: () => null },
}));
assert.equal(trackVoxGuideAction({ destination: "maze" }), false);

resetVoxTelemetryForTests();
console.log("Vox telemetry tests passed.");

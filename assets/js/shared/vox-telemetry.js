export const TELEMETRY_SCHEMA_VERSION = 1;

export const VOX_TELEMETRY_EVENTS = Object.freeze({
  READING_STARTED: "reading_started",
  QUESTION_ANSWERED: "question_answered",
  READING_COMPLETED: "reading_completed",
  GUIDE_OPENED: "guide_opened",
  GUIDE_ENGAGED: "guide_engaged",
  GUIDE_ACTION: "guide_action",
  GUIDE_WALKTHROUGH: "guide_walkthrough",
});

const POSTHOG_PROJECT_TOKEN = "phc_CQ53z5RmS2DcqJYmAtx6kJBsvPK2WjxCoET8b4tMm7kk";
const POSTHOG_API_HOST = "https://us.i.posthog.com";
const POSTHOG_ASSET_HOST = "https://us-assets.i.posthog.com";
const POSTHOG_SCRIPT_PATH = "/static/1/array.js";
const PRODUCTION_HOSTS = new Set(["voxmana.io", "www.voxmana.io"]);
const ENTRY_MODES = new Set(["quick"]);
const QUESTION_STAGES = new Set(["gate", "hall", "crucible"]);
const RESULT_STATES = new Set([
  "primary",
  "close",
  "tied",
  "mixed",
  "insufficient",
  "contradictory",
  "incomplete",
]);
const CONFIDENCE_BANDS = new Set(["current-best-fit", ...RESULT_STATES]);
const STOPPING_REASONS = new Set([
  "minimum_questions",
  "clear_separation",
  "next_question_cannot_improve_responsible_top_boundary",
  "useful_evidence_remains",
  "supported_candidate_has_conflicting_dependencies",
  "no_responsible_named_placement",
  "equal_supported_leaders",
  "independent_supported_directions",
  "highest_responsible_candidate_trails_unqualified_internal_candidate",
  "single_named_direction_with_unresolved_alternatives",
]);
const GUIDE_SURFACES = new Set(["overview", "reading", "maze"]);
const GUIDE_MODES = new Set(["static", "guided"]);
const GUIDE_ENGAGEMENT_THRESHOLDS = Object.freeze([10, 30, 60, 120]);
const GUIDE_ENGAGEMENT_THRESHOLD_SET = new Set(GUIDE_ENGAGEMENT_THRESHOLDS);
const GUIDE_ACTION_KINDS = new Set(["product_exit", "guide_internal"]);
const GUIDE_DESTINATIONS = new Set([
  "archscry",
  "maze",
  "strategium",
  "apocrypha",
  "overview",
  "reading",
]);
const GUIDE_PRODUCT_DESTINATIONS = new Set(["archscry", "maze", "strategium", "apocrypha"]);
const GUIDE_WALKTHROUGH_IDS = new Set(["vox-mana-intro", "dossier-reading", "maze-search"]);
const GUIDE_WALKTHROUGH_STATES = new Set(["started", "completed", "closed"]);
const SENSITIVE_PROPERTY_KEYS = new Set([
  "account_id",
  "answer_copy",
  "answer_prose",
  "answer_text",
  "answer_title",
  "dossier_prose",
  "email",
  "full_url",
  "guide_prose",
  "guide_text",
  "glossary_prose",
  "href",
  "location",
  "name",
  "profile_id",
  "query",
  "question_prompt",
  "question_prose",
  "question_text",
  "referrer",
  "search_query",
  "url",
  "user_id",
  "walkthrough_description",
  "walkthrough_prose",
]);
const POSTHOG_TRANSPORT_PROPERTIES = new Set([
  "token",
  "distinct_id",
  "$insert_id",
  "$lib",
  "$lib_version",
]);
const POSTHOG_METHODS = (
  "init capture register register_once register_for_session unregister unregister_for_session " +
  "getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags " +
  "updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId " +
  "getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify " +
  "setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags " +
  "setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups " +
  "get_session_id get_session_replay_url alias set_config startSessionRecording " +
  "stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property " +
  "getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing " +
  "has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug"
).split(" ");

const identifier = (maximumLength = 128) => (value) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > maximumLength) return null;
  return /^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(normalized) ? normalized : null;
};

const placementVersion = (value) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > 256) return null;
  return /^[A-Za-z0-9][A-Za-z0-9._:|=-]*$/.test(normalized) ? normalized : null;
};

const oneOf = (values) => (value) => (
  typeof value === "string" && values.has(value.trim()) ? value.trim() : null
);

const oneOfInteger = (values) => (value) => (
  Number.isInteger(value) && values.has(value) ? value : null
);

const integerBetween = (minimum, maximum) => (value) => (
  Number.isInteger(value) && value >= minimum && value <= maximum ? value : null
);

const exactSchemaVersion = (value) => value === TELEMETRY_SCHEMA_VERSION
  ? TELEMETRY_SCHEMA_VERSION
  : null;

const upperIdentifier = (maximumLength = 32) => (value) => {
  const normalized = identifier(maximumLength)(value);
  return normalized ? normalized.toUpperCase() : null;
};

const EVENT_SCHEMAS = Object.freeze({
  [VOX_TELEMETRY_EVENTS.READING_STARTED]: Object.freeze({
    telemetry_schema_version: exactSchemaVersion,
    reading_run_id: identifier(80),
    placement_version: placementVersion,
    entry_mode: oneOf(ENTRY_MODES),
  }),
  [VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED]: Object.freeze({
    telemetry_schema_version: exactSchemaVersion,
    reading_run_id: identifier(80),
    placement_version: placementVersion,
    question_id: identifier(128),
    answer_id: identifier(128),
    stage: oneOf(QUESTION_STAGES),
    step_index: integerBetween(1, 9),
  }),
  [VOX_TELEMETRY_EVENTS.READING_COMPLETED]: Object.freeze({
    telemetry_schema_version: exactSchemaVersion,
    reading_run_id: identifier(80),
    placement_version: placementVersion,
    identity_key: upperIdentifier(32),
    result_state: oneOf(RESULT_STATES),
    confidence_band: oneOf(CONFIDENCE_BANDS),
    question_count: integerBetween(1, 9),
    stopping_state: oneOf(RESULT_STATES),
    stopping_reason: oneOf(STOPPING_REASONS),
  }),
  [VOX_TELEMETRY_EVENTS.GUIDE_OPENED]: Object.freeze({
    telemetry_schema_version: exactSchemaVersion,
    guide_session_id: identifier(80),
    guide_surface: oneOf(GUIDE_SURFACES),
    guide_mode: oneOf(GUIDE_MODES),
  }),
  [VOX_TELEMETRY_EVENTS.GUIDE_ENGAGED]: Object.freeze({
    telemetry_schema_version: exactSchemaVersion,
    guide_session_id: identifier(80),
    guide_surface: oneOf(GUIDE_SURFACES),
    active_seconds_threshold: oneOfInteger(GUIDE_ENGAGEMENT_THRESHOLD_SET),
  }),
  [VOX_TELEMETRY_EVENTS.GUIDE_ACTION]: Object.freeze({
    telemetry_schema_version: exactSchemaVersion,
    guide_session_id: identifier(80),
    guide_surface: oneOf(GUIDE_SURFACES),
    action_kind: oneOf(GUIDE_ACTION_KINDS),
    destination: oneOf(GUIDE_DESTINATIONS),
  }),
  [VOX_TELEMETRY_EVENTS.GUIDE_WALKTHROUGH]: Object.freeze({
    telemetry_schema_version: exactSchemaVersion,
    guide_session_id: identifier(80),
    guide_surface: oneOf(GUIDE_SURFACES),
    walkthrough_id: oneOf(GUIDE_WALKTHROUGH_IDS),
    state: oneOf(GUIDE_WALKTHROUGH_STATES),
    step_index: integerBetween(1, 4),
  }),
});

let providerAdapter = null;
let testSink = null;
let initializationAttempted = false;
let activeReading = null;
let activeGuide = null;

function isPlainRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function normalizeVoxEvent(eventName, properties) {
  const schema = EVENT_SCHEMAS[eventName];
  if (!schema || !isPlainRecord(properties)) return null;

  const receivedKeys = Object.keys(properties);
  if (receivedKeys.some((key) => SENSITIVE_PROPERTY_KEYS.has(key.toLowerCase()))) return null;
  if (receivedKeys.length !== Object.keys(schema).length) return null;
  if (receivedKeys.some((key) => !Object.hasOwn(schema, key))) return null;

  const normalized = {};
  for (const [key, normalize] of Object.entries(schema)) {
    if (!Object.hasOwn(properties, key)) return null;
    const value = normalize(properties[key]);
    if (value === null) return null;
    normalized[key] = value;
  }
  return normalized;
}

/**
 * Creates one analytics-only version projection without becoming placement authority.
 * The ordering is fixed: model, instrument, mapping, then result version.
 */
export function derivePlacementVersion(model) {
  const meta = model?._meta;
  if (!isPlainRecord(meta)) return null;
  const parts = [
    ["m", meta.model_version],
    ["i", meta.instrument_version],
    ["map", meta.mapping_version],
    ["r", meta.result_version],
  ];
  if (parts.some(([, value]) => !identifier(96)(value))) return null;
  return placementVersion(parts.map(([key, value]) => `${key}=${value}`).join("|"));
}

function createEphemeralId(prefix, cryptoSource = globalThis.crypto) {
  try {
    if (typeof cryptoSource?.randomUUID === "function") return cryptoSource.randomUUID();
    if (typeof cryptoSource?.getRandomValues === "function") {
      const bytes = cryptoSource.getRandomValues(new Uint8Array(16));
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0"));
      return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
    }
  } catch {
    // Fall through to a non-identifying, page-local compatibility value.
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
}

export function createReadingRunId(cryptoSource = globalThis.crypto) {
  return createEphemeralId("reading", cryptoSource);
}

export function createGuideSessionId(cryptoSource = globalThis.crypto) {
  return createEphemeralId("guide", cryptoSource);
}

export function filterPostHogEvent(event) {
  try {
    if (!event || !Object.hasOwn(EVENT_SCHEMAS, event.event)) return null;
    if (isPlainRecord(event.$set) && Object.keys(event.$set).length) return null;
    if (isPlainRecord(event.$set_once) && Object.keys(event.$set_once).length) return null;

    const sourceProperties = isPlainRecord(event.properties) ? event.properties : {};
    const schema = EVENT_SCHEMAS[event.event];
    const applicationProperties = {};

    for (const key of Object.keys(sourceProperties)) {
      if (Object.hasOwn(schema, key)) {
        applicationProperties[key] = sourceProperties[key];
        continue;
      }
      if (POSTHOG_TRANSPORT_PROPERTIES.has(key) || key.startsWith("$")) continue;
      return null;
    }

    const normalized = normalizeVoxEvent(event.event, applicationProperties);
    if (!normalized) return null;

    const transportProperties = {};
    for (const key of POSTHOG_TRANSPORT_PROPERTIES) {
      const value = sourceProperties[key];
      if (["string", "number", "boolean"].includes(typeof value)) {
        transportProperties[key] = value;
      }
    }

    const filtered = {
      ...event,
      properties: {
        ...transportProperties,
        ...normalized,
        $process_person_profile: false,
        $geoip_disable: true,
      },
    };
    delete filtered.$set;
    delete filtered.$set_once;
    return filtered;
  } catch {
    return null;
  }
}

export function buildPostHogConfig() {
  return {
    api_host: POSTHOG_API_HOST,
    asset_host: POSTHOG_ASSET_HOST,
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
    cross_subdomain_cookie: false,
    mask_all_text: true,
    mask_all_element_attributes: true,
    property_denylist: [
      "$current_url",
      "$host",
      "$pathname",
      "$raw_user_agent",
      "$referrer",
      "$referring_domain",
      "$initial_current_url",
      "$initial_referrer",
      "$initial_referring_domain",
    ],
    before_send: filterPostHogEvent,
    on_request_error: () => {},
  };
}

export function telemetryModeForLocation(locationLike) {
  try {
    const parameters = new URLSearchParams(locationLike?.search || "");
    const override = parameters.get("vox_telemetry");
    if (override === "mock") return "mock";
    if (override === "live") return "live";
    const hostname = String(locationLike?.hostname || "").toLowerCase();
    return PRODUCTION_HOSTS.has(hostname) ? "live" : "off";
  } catch {
    return "off";
  }
}

function queuePostHogMethod(target, methodName) {
  target[methodName] = function queuePostHogCall(...args) {
    target.push([methodName, ...args]);
  };
}

function installPostHogSnippet(windowRef, documentRef) {
  const posthog = windowRef.posthog || [];
  if (posthog.__SV) return posthog;

  windowRef.posthog = posthog;
  posthog._i = [];
  posthog.init = function initializePostHog(token, config, name) {
    const script = documentRef.createElement("script");
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.src = `${config.asset_host || POSTHOG_ASSET_HOST}${POSTHOG_SCRIPT_PATH}`;
    script.onerror = () => {};
    const firstScript = documentRef.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
    else documentRef.head?.appendChild(script);

    let instance = posthog;
    const instanceName = name || "posthog";
    if (name) instance = posthog[name] = [];
    instance.people = instance.people || [];
    instance.toString = (people) => `${instanceName}${people ? ".people" : " (stub)"}`;
    instance.people.toString = () => instance.toString(true);
    POSTHOG_METHODS.forEach((methodName) => queuePostHogMethod(instance, methodName));
    posthog._i.push([token, config, name]);
  };
  posthog.__SV = 1;
  return posthog;
}

export function initializeVoxTelemetry() {
  if (initializationAttempted) return Boolean(providerAdapter || testSink);
  initializationAttempted = true;

  try {
    if (typeof window === "undefined" || typeof document === "undefined") return false;
    const mode = telemetryModeForLocation(window.location);
    if (mode === "mock") {
      const events = [];
      window.__VOX_TELEMETRY_EVENTS__ = events;
      testSink = (event) => events.push(event);
      return true;
    }
    if (mode !== "live") return false;

    const posthog = installPostHogSnippet(window, document);
    posthog.init(POSTHOG_PROJECT_TOKEN, buildPostHogConfig());
    providerAdapter = {
      capture(eventName, properties) {
        window.posthog?.capture?.(eventName, {
          ...properties,
          $process_person_profile: false,
          $geoip_disable: true,
        });
      },
    };
    return true;
  } catch {
    providerAdapter = null;
    return false;
  }
}

export function trackVoxEvent(eventName, properties) {
  const normalized = normalizeVoxEvent(eventName, properties);
  if (!normalized) return false;

  try {
    if (testSink) {
      testSink({ event: eventName, properties: { ...normalized } });
      return true;
    }
    if (!providerAdapter?.capture) return false;
    providerAdapter.capture(eventName, normalized);
    return true;
  } catch {
    return false;
  }
}

export function beginVoxReading({ placementModel, entryMode = "quick" }) {
  const readingRunId = createReadingRunId();
  const projectedPlacementVersion = derivePlacementVersion(placementModel);
  activeReading = {
    readingRunId,
    placementVersion: projectedPlacementVersion,
    completed: false,
  };
  trackVoxEvent(VOX_TELEMETRY_EVENTS.READING_STARTED, {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    reading_run_id: readingRunId,
    placement_version: projectedPlacementVersion,
    entry_mode: entryMode,
  });
  return readingRunId;
}

export function trackVoxQuestionAnswered({ questionId, answerId, stage, stepIndex }) {
  if (!activeReading || activeReading.completed) return false;
  return trackVoxEvent(VOX_TELEMETRY_EVENTS.QUESTION_ANSWERED, {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    reading_run_id: activeReading.readingRunId,
    placement_version: activeReading.placementVersion,
    question_id: questionId,
    answer_id: answerId,
    stage,
    step_index: stepIndex,
  });
}

export function trackVoxReadingCompleted({ result, questionCount }) {
  if (!activeReading || activeReading.completed) return false;
  activeReading.completed = true;
  return trackVoxEvent(VOX_TELEMETRY_EVENTS.READING_COMPLETED, {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    reading_run_id: activeReading.readingRunId,
    placement_version: activeReading.placementVersion,
    identity_key: result?.faction,
    result_state: result?.result_state,
    confidence_band: result?.public_confidence_state || result?.result_state,
    question_count: questionCount,
    stopping_state: result?.stopping?.state || result?.result_state,
    stopping_reason: result?.stopping?.reason,
  });
}

function isVisible(documentRef) {
  return documentRef?.visibilityState !== "hidden";
}

/**
 * Counts only wall-clock time spent while the document is visible. The tracker exposes `check`
 * for deterministic tests; production uses its short interval only to notice threshold crossings.
 */
export function createVoxGuideEngagementTracker({
  documentRef = globalThis.document,
  now = () => Date.now(),
  setIntervalFn = globalThis.setInterval,
  clearIntervalFn = globalThis.clearInterval,
  onThreshold = () => {},
} = {}) {
  let activeSeconds = 0;
  let lastTimestamp = now();
  let wasVisible = isVisible(documentRef);
  let stopped = false;
  const emittedThresholds = new Set();

  const advance = () => {
    const currentTimestamp = now();
    if (wasVisible) activeSeconds += Math.max(0, currentTimestamp - lastTimestamp) / 1000;
    lastTimestamp = currentTimestamp;
    wasVisible = isVisible(documentRef);
  };

  const check = () => {
    if (stopped) return activeSeconds;
    advance();
    GUIDE_ENGAGEMENT_THRESHOLDS.forEach((threshold) => {
      if (activeSeconds >= threshold && !emittedThresholds.has(threshold)) {
        emittedThresholds.add(threshold);
        onThreshold(threshold);
      }
    });
    return activeSeconds;
  };

  const onVisibilityChange = () => check();
  documentRef?.addEventListener?.("visibilitychange", onVisibilityChange);
  const intervalId = typeof setIntervalFn === "function" ? setIntervalFn(check, 1000) : null;

  return Object.freeze({
    check,
    stop() {
      if (stopped) return;
      stopped = true;
      documentRef?.removeEventListener?.("visibilitychange", onVisibilityChange);
      if (intervalId !== null && typeof clearIntervalFn === "function") clearIntervalFn(intervalId);
    },
  });
}

function stopActiveGuideSession() {
  activeGuide?.engagementTracker?.stop?.();
  activeGuide = null;
}

export function beginVoxGuideSession({
  guideSurface,
  guideMode = "static",
  documentRef = globalThis.document,
  engagementOptions,
} = {}) {
  if (!GUIDE_SURFACES.has(guideSurface) || !GUIDE_MODES.has(guideMode)) return null;

  stopActiveGuideSession();
  const guideSessionId = createGuideSessionId();
  activeGuide = {
    guideSessionId,
    guideSurface,
    guideMode,
    engagementTracker: null,
  };

  trackVoxEvent(VOX_TELEMETRY_EVENTS.GUIDE_OPENED, {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    guide_session_id: guideSessionId,
    guide_surface: guideSurface,
    guide_mode: guideMode,
  });
  activeGuide.engagementTracker = createVoxGuideEngagementTracker({
    ...engagementOptions,
    documentRef,
    onThreshold: (threshold) => {
      trackVoxEvent(VOX_TELEMETRY_EVENTS.GUIDE_ENGAGED, {
        telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
        guide_session_id: guideSessionId,
        guide_surface: guideSurface,
        active_seconds_threshold: threshold,
      });
    },
  });
  return guideSessionId;
}

export function endVoxGuideSession() {
  stopActiveGuideSession();
}

export function trackVoxGuideAction({ destination, actionKind } = {}) {
  if (!activeGuide || !GUIDE_DESTINATIONS.has(destination)) return false;
  return trackVoxEvent(VOX_TELEMETRY_EVENTS.GUIDE_ACTION, {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    guide_session_id: activeGuide.guideSessionId,
    guide_surface: activeGuide.guideSurface,
    action_kind: actionKind || (GUIDE_PRODUCT_DESTINATIONS.has(destination) ? "product_exit" : "guide_internal"),
    destination,
  });
}

export function trackVoxGuideWalkthrough({ walkthroughId, state, stepIndex } = {}) {
  if (!activeGuide) return false;
  return trackVoxEvent(VOX_TELEMETRY_EVENTS.GUIDE_WALKTHROUGH, {
    telemetry_schema_version: TELEMETRY_SCHEMA_VERSION,
    guide_session_id: activeGuide.guideSessionId,
    guide_surface: activeGuide.guideSurface,
    walkthrough_id: walkthroughId,
    state,
    step_index: stepIndex,
  });
}

export function setVoxTelemetryTestSink(nextSink) {
  testSink = typeof nextSink === "function" ? nextSink : null;
  providerAdapter = null;
  initializationAttempted = true;
}

export function setVoxTelemetryProviderForTests(provider) {
  providerAdapter = provider && typeof provider.capture === "function" ? provider : null;
  testSink = null;
  initializationAttempted = true;
}

export function resetVoxTelemetryForTests() {
  providerAdapter = null;
  testSink = null;
  initializationAttempted = false;
  activeReading = null;
  stopActiveGuideSession();
}

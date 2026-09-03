/* ============================================================
   shared.js - Vox Mana
   Supabase session, Google OAuth save flow, and placement state.
   ============================================================ */

const VM_CONFIG = {
  supabaseUrl: "https://lwkjnwscowbqrfqqhgsp.supabase.co",
  supabaseKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3a2pud3Njb3dicXJmcXFoZ3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTExMDcsImV4cCI6MjA5MTAyNzEwN30.mttdOwKCBkON8DOeEAV297rFV-Sj6n-TcLCT28BVlZ8",
};

const VM_RESULT_VERSION = "2026-05-10";
const VM_SAVED_READING_STORAGE_KEY = "vm_archscry_saved_reading_v1";
const VM_LEGACY_RESULT_STORAGE_KEY = "vm_last_result";

let _supabaseClient = null;

/**
 * Returns the shared Supabase client for the current page.
 *
 * @returns {object|null} Supabase client instance when available.
 */
function getSupabase() {
  if (_supabaseClient) {
    return _supabaseClient;
  }

  if (typeof window.supabase === "undefined") {
    console.error("Supabase SDK not loaded.");
    return null;
  }

  try {
    _supabaseClient = window.supabase.createClient(
      VM_CONFIG.supabaseUrl,
      VM_CONFIG.supabaseKey
    );
    return _supabaseClient;
  } catch (error) {
    console.error("Supabase init error:", error);
    return null;
  }
}

/**
 * Reads a JSON value from sessionStorage.
 *
 * @param {string} key Storage key to read.
 * @returns {any|null} Parsed value when present.
 */
function readJsonStorage(key) {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (_) {
    return null;
  }
}

/**
 * Writes or removes a plain string value in sessionStorage.
 *
 * @param {string} key Storage key to write.
 * @param {string|null} value Value to store or null to remove.
 */
function writeStringStorage(key, value) {
  try {
    if (value === null || value === undefined || value === "") {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, value);
    }
  } catch (_) {}
}

/**
 * Writes or removes a JSON value in sessionStorage.
 *
 * @param {string} key Storage key to write.
 * @param {any|null} value Value to store or null to remove.
 */
function writeJsonStorage(key, value) {
  try {
    if (value === null || value === undefined) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (_) {}
}

/**
 * Reads a JSON value from persistent local storage without failing the reading flow.
 *
 * @param {string} key Storage key to read.
 * @returns {any|null} Parsed value when present.
 */
function readJsonLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (_) {
    return null;
  }
}

/**
 * Writes or removes a JSON value from persistent local storage.
 *
 * @param {string} key Storage key to write.
 * @param {any|null} value Value to store or null to remove.
 */
function writeJsonLocalStorage(key, value) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (_) {}
}

/**
 * Creates a deep copy of a placement result payload.
 *
 * @param {object|null} result Placement result to clone.
 * @returns {object|null} Safe copy of the result.
 */
function clonePlacementResult(result) {
  if (!result) {
    return null;
  }
  return JSON.parse(JSON.stringify(result));
}

/**
 * Returns a display name derived from auth metadata or legacy profile data.
 *
 * @param {object|null} authSession Supabase auth session.
 * @param {object|null} profileRow Profile row from the database.
 * @returns {string|null} Preferred user-facing name.
 */
function deriveDisplayName(authSession, profileRow) {
  const user = authSession?.user || null;
  const meta = user?.user_metadata || {};
  const email = user?.email || profileRow?.email || "";

  return (
    profileRow?.display_name ||
    profileRow?.username ||
    meta.full_name ||
    meta.name ||
    meta.user_name ||
    meta.preferred_username ||
    (email ? email.split("@")[0] : null) ||
    null
  );
}

/**
 * Returns the best avatar URL available for the active user.
 *
 * @param {object|null} authSession Supabase auth session.
 * @param {object|null} profileRow Profile row from the database.
 * @returns {string|null} Avatar URL when available.
 */
function deriveAvatarUrl(authSession, profileRow) {
  const user = authSession?.user || null;
  const meta = user?.user_metadata || {};
  return profileRow?.avatar_url || meta.avatar_url || meta.picture || null;
}

/**
 * Normalizes starter-profile values so every saved placement has a complete shape.
 *
 * @param {object|null} starterProfile Raw starter profile data.
 * @returns {{format_interest:string,budget_band:string,experience_level:string}}
 * Normalized starter profile.
 */
function normalizeStarterProfile(starterProfile) {
  const profile = starterProfile || {};
  return {
    format_interest: profile.format_interest || "commander",
    budget_band: profile.budget_band || "mid",
    experience_level: profile.experience_level || "returning",
  };
}

/**
 * Ensures a top-match entry has the fields the UI expects.
 *
 * @param {object} match Raw match object.
 * @param {number} index Rank of this match.
 * @returns {object} Normalized match object.
 */
function normalizeMatch(match, index) {
  return {
    ...(match || {}),
    rank: match?.rank || index + 1,
    faction: match?.faction || null,
    faction_name: match?.faction_name || match?.name || null,
    institution_type: match?.institution_type || null,
    world: match?.world || null,
    identity: match?.identity || null,
    confidence:
      typeof match?.confidence === "number"
        ? match.confidence
        : typeof match?.score === "number"
        ? match.score
        : null,
    score:
      typeof match?.score === "number"
        ? match.score
        : typeof match?.confidence === "number"
        ? match.confidence
        : null,
    reason: match?.reason || "",
  };
}

/**
 * Normalizes a placement result so both quick mode and interview mode render identically.
 *
 * @param {object|null} result Raw placement result.
 * @param {object|null} fallbackProfile Legacy profile row data used as fallback.
 * @returns {object|null} Normalized placement result.
 */
function normalizePlacementResult(result, fallbackProfile) {
  if (!result && !fallbackProfile?.guild) {
    return null;
  }

  const source = clonePlacementResult(result) || {};
  const topMatches = Array.isArray(source.top_matches)
    ? source.top_matches.map(normalizeMatch)
    : [];

  const normalized = {
    ...source,
    version: source.version || VM_RESULT_VERSION,
    model_version: source.model_version || source.placement_model_version || null,
    source_mode: source.source_mode || "legacy",
    faction: source.faction || fallbackProfile?.guild || null,
    faction_name: source.faction_name || source.guild_name || null,
    institution_type: source.institution_type || null,
    world: source.world || null,
    color_weights: source.color_weights ?? null,
    identity: source.identity || topMatches[0]?.identity || null,
    decree: source.decree || "",
    confidence:
      typeof source.confidence === "number" ? source.confidence : null,
    confidence_gap:
      typeof source.confidence_gap === "number" ? source.confidence_gap : null,
    mana_scores: source.mana_scores ?? fallbackProfile?.scores ?? null,
    top_matches: topMatches,
    adjacent_matches: Array.isArray(source.adjacent_matches)
      ? source.adjacent_matches.map(normalizeMatch)
      : [],
    starter_profile: normalizeStarterProfile(source.starter_profile),
    evidence_trail: Array.isArray(source.evidence_trail) ? source.evidence_trail : [],
    stage_history: Array.isArray(source.stage_history) ? source.stage_history : [],
    result_state: typeof source.result_state === "string" ? source.result_state : null,
    public_confidence_state:
      typeof source.public_confidence_state === "string" ? source.public_confidence_state : null,
    alternative_state:
      typeof source.alternative_state === "string" ? source.alternative_state : null,
    confidence_display_mode:
      typeof source.confidence_display_mode === "string" ? source.confidence_display_mode : null,
    model_kind: typeof source.model_kind === "string" ? source.model_kind : null,
    legacy_result: source.legacy_result === true || source.source_mode === "legacy",
    limitations: Array.isArray(source.limitations) ? source.limitations : [],
    compatibility_version:
      typeof source.compatibility_version === "string" ? source.compatibility_version : null,
  };

  if (!normalized.top_matches.length && normalized.faction) {
    normalized.top_matches = [
      normalizeMatch(
        {
          faction: normalized.faction,
          faction_name: normalized.faction_name,
          institution_type: normalized.institution_type,
          world: normalized.world,
          identity: normalized.identity,
          score: normalized.confidence,
          confidence: normalized.confidence,
          reason: "Restored from a saved Vox Mana placement.",
        },
        0
      ),
    ];
  }

  if (!normalized.adjacent_matches.length && normalized.top_matches.length > 1) {
    normalized.adjacent_matches = normalized.top_matches.slice(1, 3);
  }

  return normalized;
}

function isScryingTerminalEnabled() {
  return globalThis.VM_SITE_FLAGS?.SCRYING_TERMINAL_ENABLED === true;
}

/**
 * Builds a compatibility placement result from older guild-plus-scores profile rows.
 *
 * @param {object|null} profileRow Legacy profile row.
 * @returns {object|null} Compatibility placement result when possible.
 */
function makeLegacyPlacementResult(profileRow) {
  if (!profileRow?.guild) {
    return null;
  }

  return normalizePlacementResult(
    {
      version: VM_RESULT_VERSION,
      source_mode: "legacy",
      faction: profileRow.guild,
      faction_name: profileRow.guild_name || null,
      decree:
        profileRow.decree || "This saved placement came from an older Vox Mana record. Retake the reading to restore answer and evidence detail.",
      confidence: typeof profileRow.confidence === "number" ? profileRow.confidence : null,
      result_state: "unknown",
      public_confidence_state: "evidence-detail-unavailable",
      alternative_state: "none",
      confidence_display_mode: "bounded-state",
      model_kind: "adaptive-weighted-scoring",
      legacy_result: true,
      limitations: ["Answer and evidence detail is unavailable for this saved result."],
      compatibility_version: "gate-a-v1",
      mana_scores: profileRow.scores || null,
      starter_profile: normalizeStarterProfile(null),
    },
    profileRow
  );
}

/**
 * Keeps the latest complete reading on this browser and device.
 *
 * @param {object|null} result Placement result to cache.
 */
function vm_cachePlacementResult(result) {
  writeJsonLocalStorage(VM_SAVED_READING_STORAGE_KEY, clonePlacementResult(result));
}

/**
 * Returns the saved placement result from this browser and device.
 *
 * @returns {object|null} Cached placement result when available.
 */
function vm_getCachedPlacementResult() {
  const saved = readJsonLocalStorage(VM_SAVED_READING_STORAGE_KEY);
  if (saved) {
    return normalizePlacementResult(saved, null);
  }

  const legacy = readJsonStorage(VM_LEGACY_RESULT_STORAGE_KEY);
  const normalizedLegacy = normalizePlacementResult(legacy, null);
  if (normalizedLegacy) {
    vm_cachePlacementResult(normalizedLegacy);
    writeJsonStorage(VM_LEGACY_RESULT_STORAGE_KEY, null);
  }
  return normalizedLegacy;
}

/**
 * Removes the complete reading stored on this browser and device.
 */
function vm_forgetSavedReading() {
  writeJsonLocalStorage(VM_SAVED_READING_STORAGE_KEY, null);
  writeJsonStorage(VM_LEGACY_RESULT_STORAGE_KEY, null);
  VM_SESSION.interviewResult = null;
}

/**
 * Synchronizes the in-memory session object with auth and profile data.
 *
 * @param {object|null} authSession Supabase auth session.
 * @param {object|null} profileRow Profile row fetched from the database.
 */
function syncSessionState(authSession, profileRow) {
  const displayName = deriveDisplayName(authSession, profileRow);
  const avatarUrl = deriveAvatarUrl(authSession, profileRow);
  const placementResult =
    normalizePlacementResult(profileRow?.placement_result, profileRow) ||
    makeLegacyPlacementResult(profileRow);

  VM_SESSION.username = displayName;
  VM_SESSION.avatarUrl = avatarUrl;
  VM_SESSION.profile = {
    username: profileRow?.username || null,
    displayName,
    avatarUrl,
    guild: profileRow?.guild || placementResult?.faction || null,
    scores: profileRow?.scores || placementResult?.mana_scores || null,
    takenAt: profileRow?.taken_at || null,
    placementResult,
  };
  VM_SESSION.interviewResult = placementResult;
  vm_cachePlacementResult(placementResult);
}

const VM_SESSION = {
  _username: null,
  _avatarUrl: null,
  _profile: null,
  chatHistory: [],
  interviewActive: false,
  interviewResult: null,
  interviewContext: null,
  pendingSave: false,

  get username() {
    return this._username || sessionStorage.getItem("vm_user") || null;
  },

  set username(value) {
    this._username = value || null;
    writeStringStorage("vm_user", this._username);
  },

  get avatarUrl() {
    return this._avatarUrl || sessionStorage.getItem("vm_avatar_url") || null;
  },

  set avatarUrl(value) {
    this._avatarUrl = value || null;
    writeStringStorage("vm_avatar_url", this._avatarUrl);
  },

  get profile() {
    if (this._profile) {
      return this._profile;
    }
    this._profile = readJsonStorage("vm_profile");
    return this._profile;
  },

  set profile(value) {
    this._profile = value || null;
    writeJsonStorage("vm_profile", this._profile);
  },

  clear() {
    this._username = null;
    this._avatarUrl = null;
    this._profile = null;
    this.chatHistory = [];
    this.interviewActive = false;
    this.interviewResult = null;
    this.interviewContext = null;
    this.pendingSave = false;
    writeStringStorage("vm_user", null);
    writeStringStorage("vm_avatar_url", null);
    writeJsonStorage("vm_profile", null);
    writeJsonStorage("vm_pending_result", null);
    writeJsonStorage("vm_last_result", null);
  },
};

/**
 * Starts a fresh Scrying Terminal session with optional starter context.
 *
 * @param {{starter_profile?:object,current_result?:object,openingMessage?:string}=} context
 * Interview context used by the edge function.
 * @returns {Promise<object>} First interview response payload.
 */
async function vm_startInterview(context = {}) {
  if (!isScryingTerminalEnabled()) {
    throw new Error("Scrying Terminal is temporarily unavailable.");
  }

  VM_SESSION.chatHistory = [];
  VM_SESSION.interviewActive = true;
  VM_SESSION.interviewResult = null;
  VM_SESSION.interviewContext = {
    starter_profile: normalizeStarterProfile(context.starter_profile || null),
    current_result: context.current_result || null,
  };
  return vm_conductInterview(context.openingMessage || "I am ready to be assessed.");
}

/**
 * Sends a user reply to the edge function and updates session interview state.
 *
 * @param {string} userMessage User text entered into the terminal.
 * @returns {Promise<object>} Normalized interview response payload.
 */
async function vm_conductInterview(userMessage) {
  if (!isScryingTerminalEnabled()) {
    throw new Error("Scrying Terminal is temporarily unavailable.");
  }

  const sb = getSupabase();
  if (!sb) {
    throw new Error("Interview service unavailable.");
  }

  const message = String(userMessage || "").trim();
  if (!message) {
    throw new Error("Please enter a response.");
  }

  VM_SESSION.chatHistory.push({ role: "user", content: message });

  const sessionBucket =
    VM_SESSION.username ||
    VM_SESSION.profile?.username ||
    "anonymous-" + Math.random().toString(36).slice(2, 10);

  const { data, error } = await sb.functions.invoke("guild-recruiter", {
    body: {
      message,
      history: VM_SESSION.chatHistory.slice(0, -1),
      session_id: sessionBucket,
      starter_profile: VM_SESSION.interviewContext?.starter_profile || null,
      current_result: VM_SESSION.interviewContext?.current_result || null,
    },
  });

  if (error) {
    VM_SESSION.chatHistory.pop();
    throw new Error(error.message || "Interview service unavailable.");
  }

  VM_SESSION.chatHistory.push({ role: "assistant", content: data.response || "" });

  if (data.decided && data.result) {
    const normalized = normalizePlacementResult(data.result, null);
    VM_SESSION.interviewResult = normalized;
    VM_SESSION.interviewActive = false;
    vm_cachePlacementResult(normalized);
    data.result = normalized;
  }

  return data;
}

/**
 * Clears the active interview transcript and transient result state.
 */
function vm_resetInterview() {
  VM_SESSION.chatHistory = [];
  VM_SESSION.interviewActive = false;
  VM_SESSION.interviewResult = null;
  VM_SESSION.interviewContext = null;
}

/**
 * Saves a placement result to the current signed-in user's profile row.
 *
 * @param {object} result Placement result to persist.
 * @returns {Promise<object>} Saved normalized placement result.
 */
async function vm_savePlacementResult(result) {
  const sb = getSupabase();
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  const normalized = normalizePlacementResult(result, null);
  if (!normalized?.faction) {
    throw new Error("No placement result is ready to save.");
  }

  const {
    data: { session },
  } = await sb.auth.getSession();

  if (!session?.user) {
    throw new Error("Authentication required to save placement.");
  }

  const displayName = deriveDisplayName(session, null);
  const avatarUrl = deriveAvatarUrl(session, null);
  const now = new Date().toISOString();
  const topMatches = normalized.top_matches || [];

  const payload = {
    id: session.user.id,
    email: session.user.email,
    display_name: displayName,
    avatar_url: avatarUrl,
    guild: normalized.faction,
    guild_name: normalized.faction_name,
    runner_up:
      topMatches[1]?.faction ||
      normalized.adjacent_matches?.[0]?.faction ||
      null,
    confidence: normalized.confidence,
    decree: normalized.decree,
    scores: normalized.mana_scores,
    taken_at: now,
    placement_result: normalized,
  };

  const { error } = await sb
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) {
    throw new Error(
      error.message.includes("display_name") ||
        error.message.includes("avatar_url") ||
        error.message.includes("placement_result")
        ? "Profile schema is missing the new placement columns. Run docs/supabase-profile-update.sql first."
        : error.message
    );
  }

  syncSessionState(session, {
    username: VM_SESSION.profile?.username || null,
    display_name: displayName,
    avatar_url: avatarUrl,
    guild: normalized.faction,
    scores: normalized.mana_scores,
    taken_at: now,
    placement_result: normalized,
  });

  return normalized;
}

/**
 * Begins the Google OAuth flow after stashing the current placement locally.
 *
 * @param {object=} result Optional placement result to save after OAuth completes.
 * @returns {Promise<void>} Resolves when the redirect request has been issued.
 */
async function vm_saveWithGoogle(result) {
  const sb = getSupabase();
  if (!sb) {
    throw new Error("Could not connect to Supabase.");
  }

  const normalized = normalizePlacementResult(result || VM_SESSION.interviewResult, null);
  if (!normalized?.faction) {
    throw new Error("No placement is ready to save.");
  }

  VM_SESSION.pendingSave = true;
  VM_SESSION.interviewResult = normalized;
  vm_cachePlacementResult(normalized);
  writeJsonStorage("vm_pending_result", normalized);

  const { error } = await sb.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.href },
  });

  if (error) {
    throw new Error(error.message || "Google sign-in failed.");
  }
}

/**
 * Completes a pending Google save flow after the browser returns from OAuth.
 *
 * @returns {Promise<boolean>} True when a pending save was completed.
 */
async function vm_checkPendingSave() {
  const pending = readJsonStorage("vm_pending_result");
  if (!pending) {
    return false;
  }

  const sb = getSupabase();
  if (!sb) {
    return false;
  }

  const {
    data: { session },
  } = await sb.auth.getSession();

  if (!session?.user) {
    return false;
  }

  const savedResult = await vm_savePlacementResult(pending);
  writeJsonStorage("vm_pending_result", null);
  VM_SESSION.pendingSave = false;
  VM_SESSION.interviewResult = savedResult;
  vm_cachePlacementResult(savedResult);

  document.dispatchEvent(
    new CustomEvent("vm_placementSaved", { detail: clonePlacementResult(savedResult) })
  );

  return true;
}

/**
 * Signs the active user out and clears local placement/session state.
 *
 * @returns {Promise<void>} Resolves after the session has been cleared.
 */
async function vm_signOut() {
  const sb = getSupabase();
  try {
    if (sb) {
      await sb.auth.signOut();
    }
  } catch (_) {}
  VM_SESSION.clear();
}

/**
 * Restores an existing Supabase session and associated profile data on page load.
 *
 * @returns {Promise<boolean>} True when a signed-in session was restored.
 */
async function vm_resumeSession() {
  const sb = getSupabase();
  if (!sb) {
    return false;
  }

  try {
    const {
      data: { session },
    } = await sb.auth.getSession();

    if (!session?.user) {
      return false;
    }

    let row = null;
    let error = null;

    ({ data: row, error } = await sb
      .from("profiles")
      .select(
        "username, email, display_name, avatar_url, guild, guild_name, runner_up, confidence, decree, scores, taken_at, placement_result"
      )
      .eq("id", session.user.id)
      .maybeSingle());

    if (error && error.message) {
      ({ data: row, error } = await sb
        .from("profiles")
        .select("username, email, guild, guild_name, runner_up, confidence, decree, scores, taken_at")
        .eq("id", session.user.id)
        .maybeSingle());
    }

    if (error) {
      console.warn("Profile resume failed:", error.message);
    }

    syncSessionState(session, row || {});
    return true;
  } catch (resumeError) {
    console.warn("Session resume failed:", resumeError.message);
    return false;
  }
}

/**
 * Clears the saved placement from the user's profile while keeping the auth session active.
 *
 * @returns {Promise<boolean>} True when the placement was cleared.
 */
async function vm_clearPlacement() {
  const sb = getSupabase();
  if (!sb) {
    return false;
  }

  const {
    data: { session },
  } = await sb.auth.getSession();

  if (!session?.user) {
    VM_SESSION.interviewResult = null;
    vm_cachePlacementResult(null);
    if (VM_SESSION.profile) {
      VM_SESSION.profile = {
        ...VM_SESSION.profile,
        guild: null,
        scores: null,
        takenAt: null,
        placementResult: null,
      };
    }
    return true;
  }

  const { error } = await sb
    .from("profiles")
    .update({
      guild: null,
      guild_name: null,
      runner_up: null,
      confidence: null,
      decree: null,
      scores: null,
      taken_at: null,
      placement_result: null,
    })
    .eq("id", session.user.id);

  if (error) {
    console.warn("Could not clear placement:", error.message);
    return false;
  }

  VM_SESSION.interviewResult = null;
  vm_cachePlacementResult(null);
  if (VM_SESSION.profile) {
    VM_SESSION.profile = {
      ...VM_SESSION.profile,
      guild: null,
      scores: null,
      takenAt: null,
      placementResult: null,
    };
  }
  return true;
}

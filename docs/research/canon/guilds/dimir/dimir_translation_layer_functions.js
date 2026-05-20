/**
 * Vox Mana — House Dimir translation layer
 * Schema: vox-mana-translation-layer-v1
 *
 * These functions are intentionally small and composable. They do not know about UI,
 * placement scoring, routing, or build/runtime logic. They translate a card/gameplay
 * signal into Dimir-flavored structural metadata that a UI layer may consume.
 */

const DIMIR_DEFAULTS = Object.freeze({
  faction: "House Dimir",
  colorPair: "blue-black",
  tone: "secrecy, surveillance, memory, sabotage, theft, infiltration, hidden leverage",
});

function normalizeSignal(signal = {}) {
  if (typeof signal === "string") {
    return { raw: signal, text: signal, tags: [] };
  }

  return {
    raw: signal.raw ?? signal.text ?? signal.name ?? "",
    name: signal.name ?? signal.cardName ?? signal.text ?? "Unnamed signal",
    text: signal.text ?? signal.oracleText ?? signal.raw ?? "",
    tags: Array.isArray(signal.tags) ? signal.tags : [],
    source: signal.source ?? "unknown",
    weight: Number.isFinite(signal.weight) ? signal.weight : 1,
  };
}

function includesAny(signal, terms) {
  const haystack = [
    signal.raw,
    signal.name,
    signal.text,
    ...(signal.tags || []),
  ].join(" ").toLowerCase();

  return terms.some((term) => haystack.includes(term.toLowerCase()));
}

/**
 * Detain()
 * Silence, freeze, displace, assassinate, or otherwise make a target absent.
 */
export function Detain(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const method = options.method ?? inferRemovalMethod(normalized);

  return {
    ...DIMIR_DEFAULTS,
    functionName: "Detain",
    input: normalized,
    status: "silenced_or_removed",
    method,
    visibilityDelta: -1 * normalized.weight,
    agencyDelta: -1 * normalized.weight,
    coverStory: options.coverStory ?? "unexplained disappearance",
    visualToken: options.visualToken ?? "cipher-thread binding and memory fade",
    narrative: options.narrative ?? "The target is quietly made absent, compromised, frozen, or forgotten before it can act on open terms.",
    tags: [...new Set([...(normalized.tags || []), "detain", "silence", "assassination", "absence"])],
  };
}

/**
 * Override()
 * Rewrite a plan through counterspells, discard, theft, name exile, or identity replacement.
 */
export function Override(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const rewriteVector = options.rewriteVector ?? inferRewriteVector(normalized);

  return {
    ...DIMIR_DEFAULTS,
    functionName: "Override",
    input: normalized,
    status: "rewritten",
    rewriteVector,
    planDelta: -1 * normalized.weight,
    informationDelta: 1 * normalized.weight,
    stolenValue: options.stolenValue ?? includesAny(normalized, ["steal", "thief", "specter", "cast", "copy"]),
    visualToken: options.visualToken ?? "surveillance eye with erased nameplate",
    narrative: options.narrative ?? "The opposing line is countered, stolen, copied, named, or erased before it becomes a public action.",
    tags: [...new Set([...(normalized.tags || []), "override", "counterintelligence", "memory", "theft"])],
  };
}

/**
 * ConstraintField()
 * Create a surveillance, coercion, evasion, or hidden-route environment.
 */
export function ConstraintField(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const watchedZones = options.watchedZones ?? inferWatchedZones(normalized);

  return {
    ...DIMIR_DEFAULTS,
    functionName: "ConstraintField",
    input: normalized,
    status: "compromised",
    watchedZones,
    safeRoutesDelta: -1 * normalized.weight,
    agentAccessDelta: 1 * normalized.weight,
    constraintType: options.constraintType ?? inferConstraintType(normalized),
    visualToken: options.visualToken ?? "black-blue surveillance lattice",
    narrative: options.narrative ?? "A hidden network forms around the game state; opponents still act, but each action becomes observed, exploitable, or unsafe.",
    tags: [...new Set([...(normalized.tags || []), "constraint", "surveillance", "coercion", "infiltration"])],
  };
}

/**
 * AccretionEngine()
 * Compound advantage through surveil, mill, cipher, graveyard setup, and stolen resources.
 */
export function AccretionEngine(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const increment = Number.isFinite(options.increment) ? options.increment : normalized.weight;

  return {
    ...DIMIR_DEFAULTS,
    functionName: "AccretionEngine",
    input: normalized,
    status: "leveraged",
    secretSource: options.secretSource ?? inferSecretSource(normalized),
    increment,
    informationDelta: increment,
    resourceDelta: includesAny(normalized, ["draw", "cast", "mana", "treasure", "token", "reanimate"]) ? increment : 0,
    threatDelta: includesAny(normalized, ["mill", "counter", "+1/+1", "grows", "damage", "life loss"]) ? increment : 0,
    payoff: options.payoff ?? "inevitability through accumulated secrets",
    visualToken: options.visualToken ?? "graveyard archive connected by cipher threads",
    narrative: options.narrative ?? "Each watched, stolen, milled, discarded, or encoded secret becomes stored leverage; enough leverage becomes inevitability.",
    tags: [...new Set([...(normalized.tags || []), "accretion", "surveil", "mill", "secrets", "engine"])],
  };
}

export function routeDimirSignal(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);

  if (includesAny(normalized, ["assassin", "silence", "destroy", "kill", "exile", "bounce", "tap", "freeze", "hit counter", "voidwalk"])) {
    return Detain(normalized, options);
  }

  if (includesAny(normalized, ["counter", "discard", "steal", "thief", "copy", "name", "unmoored", "transmute", "sabotage", "doppelganger"])) {
    return Override(normalized, options);
  }

  if (includesAny(normalized, ["surveillance", "unblockable", "hexproof", "deathtouch", "defender", "top card", "control", "coerce", "ransom", "route"])) {
    return ConstraintField(normalized, options);
  }

  if (includesAny(normalized, ["surveil", "mill", "draw", "cipher", "graveyard", "reanimate", "cast from exile", "pay life", "engine", "locket", "signet"])) {
    return AccretionEngine(normalized, options);
  }

  return ConstraintField(normalized, {
    ...options,
    narrative: options.narrative ?? "Unclassified Dimir signal defaults to hidden-route pressure rather than public law or open aggression.",
  });
}

function inferRemovalMethod(signal) {
  if (includesAny(signal, ["assassin", "silencer", "hit counter"])) return "silent_assassination";
  if (includesAny(signal, ["bounce", "return"])) return "undercity_displacement";
  if (includesAny(signal, ["tap", "freeze", "binding"])) return "encoded_restraint";
  if (includesAny(signal, ["destroy", "kill", "deadly", "price of fame"])) return "contract_removal";
  if (includesAny(signal, ["exile", "void"])) return "record_erasure";
  return "quiet_compromise";
}

function inferRewriteVector(signal) {
  if (includesAny(signal, ["counter", "sabotage", "muddle"])) return "counterintelligence";
  if (includesAny(signal, ["discard", "erasure", "perplex"])) return "intent_deletion";
  if (includesAny(signal, ["steal", "thief", "specter", "cast from exile"])) return "asset_theft";
  if (includesAny(signal, ["copy", "doppelganger", "lazav", "identity"])) return "identity_forgery";
  if (includesAny(signal, ["name", "unmoored", "lobotomist"])) return "name_erasure";
  if (includesAny(signal, ["transmute", "search"])) return "exact_tool_substitution";
  return "plan_rewrite";
}

function inferWatchedZones(signal) {
  const zones = [];
  if (includesAny(signal, ["hand", "discard"])) zones.push("hand");
  if (includesAny(signal, ["library", "surveil", "mill", "top card"])) zones.push("library");
  if (includesAny(signal, ["graveyard", "reanimate", "corpse"])) zones.push("graveyard");
  if (includesAny(signal, ["combat", "unblockable", "cipher", "saboteur"])) zones.push("combat_route");
  if (includesAny(signal, ["permanent", "creature", "control", "ransom"])) zones.push("battlefield");
  return zones.length ? zones : ["hidden_network"];
}

function inferConstraintType(signal) {
  if (includesAny(signal, ["unblockable", "route", "cipher"])) return "hidden_route";
  if (includesAny(signal, ["ransom", "control", "coerce"])) return "coercive_contract";
  if (includesAny(signal, ["hexproof", "deathtouch", "defender"])) return "unsafe_interaction";
  if (includesAny(signal, ["top card", "surveil", "informant"])) return "surveillance_filter";
  return "compromised_field";
}

function inferSecretSource(signal) {
  if (includesAny(signal, ["surveil", "spybug", "campaign", "notion rain"])) return "surveillance_report";
  if (includesAny(signal, ["mill", "psychic", "mind", "aberration"])) return "memory_extraction";
  if (includesAny(signal, ["cipher", "encoded"])) return "encoded_repeat";
  if (includesAny(signal, ["draw", "broker", "consult"])) return "information_brokerage";
  if (includesAny(signal, ["graveyard", "reanimate", "mission briefing"])) return "graveyard_archive";
  if (includesAny(signal, ["steal", "thief", "specter", "cast"])) return "stolen_asset";
  if (includesAny(signal, ["signet", "locket", "aqueduct", "keyrune", "guildgate"])) return "covert_infrastructure";
  return "unattributed_secret";
}

export default {
  Detain,
  Override,
  ConstraintField,
  AccretionEngine,
  routeDimirSignal,
};

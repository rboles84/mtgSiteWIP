/**
 * Vox Mana — Azorius Senate translation layer
 * Schema: vox-mana-translation-layer-v1
 *
 * These functions are intentionally small and composable. They do not know about UI,
 * placement scoring, routing, or build/runtime logic. They translate a card/gameplay
 * signal into Azorius-flavored structural metadata that a UI layer may consume.
 */

const AZORIUS_DEFAULTS = Object.freeze({
  faction: "Azorius Senate",
  colorPair: "white-blue",
  tone: "law, order, bureaucracy, procedure, restraint, judgment",
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
 * Pause, lock, arrest, exile, tap, bounce, or otherwise deny immediate agency.
 */
export function Detain(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const duration = options.duration ?? (
    includesAny(normalized, ["until your next turn", "detain"]) ? "until_next_turn" : "case_defined"
  );

  return {
    ...AZORIUS_DEFAULTS,
    functionName: "Detain",
    input: normalized,
    status: "detained",
    duration,
    agencyDelta: -1 * normalized.weight,
    tempoDelta: 1 * normalized.weight,
    visualToken: options.visualToken ?? "blue-white restraint bars",
    narrative: options.narrative ?? "The target is processed under formal restraint; its action is paused, redirected, or removed from the public field.",
    tags: [...new Set([...(normalized.tags || []), "detain", "injunction", "tempo", "restraint"])],
  };
}

/**
 * Override()
 * Reject, counter, veto, reset, or replace an action with an official ruling.
 */
export function Override(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const appealAllowed = options.appealAllowed ?? !includesAny(normalized, ["uncounterable", "can't be countered", "veto", "supreme verdict"]);

  return {
    ...AZORIUS_DEFAULTS,
    functionName: "Override",
    input: normalized,
    status: "overruled",
    appealAllowed,
    stackDelta: -1 * normalized.weight,
    stabilityDelta: 1 * normalized.weight,
    replacementEffect: options.replacementEffect ?? null,
    visualToken: options.visualToken ?? "gavel flash and denial seal",
    narrative: options.narrative ?? "The attempted action is reviewed against statute and replaced by the official ruling.",
    tags: [...new Set([...(normalized.tags || []), "override", "verdict", "counterspell", "veto"])],
  };
}

/**
 * ConstraintField()
 * Create persistent rules, taxes, bindings, protection, or fair-play restrictions.
 */
export function ConstraintField(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const scope = options.scope ?? (
    includesAny(normalized, ["opponent", "opponents"]) ? "opponents" : "local_board"
  );

  return {
    ...AZORIUS_DEFAULTS,
    functionName: "ConstraintField",
    input: normalized,
    status: "regulated",
    scope,
    constraintType: options.constraintType ?? inferConstraintType(normalized),
    opponentFriction: 1 * normalized.weight,
    optionSpace: "narrowed",
    visualToken: options.visualToken ?? "transparent statute grid",
    narrative: options.narrative ?? "A rule environment forms around the game state; inefficient or unlawful lines become harder to execute.",
    tags: [...new Set([...(normalized.tags || []), "constraint", "tax", "law", "binding", "fair-play"])],
  };
}

/**
 * AccretionEngine()
 * Compound advantage through archives, precedent, draw, life, mana, counters, or tokens.
 */
export function AccretionEngine(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);
  const increment = Number.isFinite(options.increment) ? options.increment : normalized.weight;

  return {
    ...AZORIUS_DEFAULTS,
    functionName: "AccretionEngine",
    input: normalized,
    status: "recorded",
    recordSource: options.recordSource ?? inferRecordSource(normalized),
    increment,
    resourcesDelta: increment,
    precedentDelta: increment,
    threshold: options.threshold ?? null,
    payoff: options.payoff ?? "inevitability through documented advantage",
    visualToken: options.visualToken ?? "stacking archive pages and marble glyphs",
    narrative: options.narrative ?? "Each compliant action becomes a record; enough records become authority, stability, and inevitability.",
    tags: [...new Set([...(normalized.tags || []), "accretion", "archive", "precedent", "draw", "life"])],
  };
}

export function routeAzoriusSignal(signal = {}, options = {}) {
  const normalized = normalizeSignal(signal);

  if (includesAny(normalized, ["detain", "arrest", "warrant", "binding", "injunction", "exile", "bounce", "tap"])) {
    return Detain(normalized, options);
  }

  if (includesAny(normalized, ["counter", "veto", "verdict", "judgment", "overrule", "silence", "reset"])) {
    return Override(normalized, options);
  }

  if (includesAny(normalized, ["tax", "fair", "law", "rule", "protection", "vigilance", "defender", "can't", "cost"])) {
    return ConstraintField(normalized, options);
  }

  if (includesAny(normalized, ["draw", "life", "archive", "forecast", "addendum", "mana", "counter", "token", "precedent", "filibuster"])) {
    return AccretionEngine(normalized, options);
  }

  return ConstraintField(normalized, {
    ...options,
    narrative: options.narrative ?? "Unclassified Azorius signal defaults to a regulatory field rather than raw aggression.",
  });
}

function inferConstraintType(signal) {
  if (includesAny(signal, ["tax", "cost", "pay"])) return "taxation";
  if (includesAny(signal, ["protection", "hexproof", "ward"])) return "protected_jurisdiction";
  if (includesAny(signal, ["can't", "cannot", "binding", "pacifism"])) return "prohibition";
  if (includesAny(signal, ["vigilance", "defender", "formation"])) return "readiness_doctrine";
  return "statutory_friction";
}

function inferRecordSource(signal) {
  if (includesAny(signal, ["draw", "card"])) return "case_file_draw";
  if (includesAny(signal, ["life", "gain"])) return "civic_stability";
  if (includesAny(signal, ["mana", "signet", "locket", "keyrune", "chancery"])) return "infrastructure";
  if (includesAny(signal, ["forecast", "addendum"])) return "proper_timing";
  if (includesAny(signal, ["counter", "filibuster"])) return "procedural_counters";
  return "precedent";
}

export default {
  Detain,
  Override,
  ConstraintField,
  AccretionEngine,
  routeAzoriusSignal,
};

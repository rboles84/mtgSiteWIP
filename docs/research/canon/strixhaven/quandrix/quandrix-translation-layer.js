/**
 * Vox Mana — Quandrix Translation Layer
 * Schema: vox-mana-translation-layer-v1
 *
 * Purpose:
 * These functions adapt shared Vox Mana primitives into a Quandrix-specific reading layer.
 * The function names remain stable across identities so the placement UI can call the
 * same primitives while each college/guild supplies a different semantic adapter.
 *
 * Quandrix core axiom:
 *   "Reality is an equation that can be grown, copied, doubled, and proven by scale."
 *
 * Note:
 * Detain(), Override(), ConstraintField(), and AccretionEngine() are shared engine
 * primitive names, not literal Azorius mechanics. Quandrix maps them to variable
 * binding, theorem override, proof constraints, and growth/copy accretion.
 *
 * No external dependencies.
 */

/**
 * @typedef {Object} Signal
 * @property {string} [id]
 * @property {string} [label]
 * @property {string} [text]
 * @property {string[]} [tags]
 * @property {number} [weight]
 * @property {string} [source]
 */

/**
 * @typedef {Object} TranslationResult
 * @property {string} identity
 * @property {string} functionName
 * @property {Signal[]} signals
 * @property {string[]} tags
 * @property {string[]} notes
 * @property {string[]} warnings
 * @property {Object} meta
 */

export const QUANDRIX_TRANSLATION_VERSION = "vox-mana-quandrix-translation-v1";

export const QUANDRIX_CORE = Object.freeze({
  identity: "quandrix",
  axiom: "Reality is an equation that can be grown, copied, doubled, and proven by scale.",
  primaryMotion: "question-to-proof-to-scale",
  coreTags: [
    "math-as-reality",
    "variable-scale",
    "fractal-token",
    "copy-replication",
    "doubling",
    "counter-accretion",
    "land-threshold",
    "x-spell",
    "theory-substance",
    "proof-materialization"
  ],
  antiDrift: [
    "not-generic-simic-goodstuff",
    "not-only-ramp",
    "not-izzet-spellslinger",
    "not-azorius-law-grid",
    "not-biology-without-math",
    "not-dense-homework-ui"
  ]
});

const DEFAULT_WEIGHTS = Object.freeze({
  "math-as-reality": 1.0,
  "variable-scale": 0.94,
  "fractal-token": 1.0,
  "copy-replication": 0.92,
  doubling: 0.95,
  "counter-accretion": 0.9,
  "land-threshold": 0.82,
  "x-spell": 0.82,
  "theory-substance": 0.78,
  "proof-materialization": 0.96,
  "learn-toolbox": 0.58,
  "spell-to-body": 0.74
});

function normalizeSignal(signal, index = 0) {
  if (typeof signal === "string") {
    return {
      id: `signal-${index + 1}`,
      label: signal,
      text: signal,
      tags: [],
      weight: 1,
      source: "string"
    };
  }

  const safe = signal && typeof signal === "object" ? signal : {};
  const label = safe.label || safe.name || safe.id || `signal-${index + 1}`;

  return {
    id: String(safe.id || `signal-${index + 1}`),
    label: String(label),
    text: String(safe.text || safe.description || label),
    tags: Array.isArray(safe.tags) ? safe.tags.map(String) : [],
    weight: Number.isFinite(safe.weight) ? safe.weight : 1,
    source: String(safe.source || "unknown"),
    ...safe
  };
}

function normalizeSignals(input) {
  const raw = Array.isArray(input) ? input : [input];
  return raw.map(normalizeSignal);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function tagText(signal) {
  return `${signal.label || ""} ${signal.text || ""} ${(signal.tags || []).join(" ")}`.toLowerCase();
}

function inferQuandrixTags(signal) {
  const text = tagText(signal);
  const tags = [];

  if (/math|equation|theorem|proof|geometry|geometric|ratio|curve|sequence|formula|calculate|analysis|analyst/.test(text)) tags.push("math-as-reality");
  if (/variable|x spell|x-|\{x\}|scale|scaling|large|huge|eight lands|threshold|mana value/.test(text)) tags.push("variable-scale");
  if (/fractal|token|manifest|body of research|serpentine|mascot/.test(text)) tags.push("fractal-token", "proof-materialization");
  if (/copy|copies|duplicate|duplication|replicate|replication|clone|twincaster|double major/.test(text)) tags.push("copy-replication");
  if (/double|twice|doubling|two times|twincaster|parallel|copy/.test(text)) tags.push("doubling");
  if (/\+1\/\+1|counter|counters|increment|growth curve|tanazir|ascendancy/.test(text)) tags.push("counter-accretion");
  if (/land|forest|island|campus|eighth|8 lands|ramp|eureka|sequence/.test(text)) tags.push("land-threshold");
  if (/\{x\}|x spell|x-spell|solve for x|mana sink|biomass|hypothesis/.test(text)) tags.push("x-spell");
  if (/theory|substance|kianne|imbraham|abstract|applied|material|matter/.test(text)) tags.push("theory-substance");
  if (/learn|lesson|teach|study|student|professor|apprentice/.test(text)) tags.push("learn-toolbox");
  if (/instant|sorcery|magecraft|cast|spell/.test(text) && /token|fractal|creature|body|manifest/.test(text)) tags.push("spell-to-body", "proof-materialization");

  return unique([...(signal.tags || []), ...tags]);
}

function scoreTags(tags) {
  return tags.reduce((score, tag) => score + (DEFAULT_WEIGHTS[tag] || 0.25), 0);
}

function result(functionName, signals, extra = {}) {
  const normalized = normalizeSignals(signals).map((signal, index) => {
    const tags = inferQuandrixTags(signal);
    return {
      ...signal,
      id: signal.id || `quandrix-${functionName.toLowerCase()}-${index + 1}`,
      tags,
      weight: Number.isFinite(signal.weight) ? signal.weight : Math.max(0.2, scoreTags(tags))
    };
  });

  const tags = unique(normalized.flatMap((signal) => signal.tags || []));
  const warnings = [];

  if (!tags.includes("math-as-reality") && !tags.includes("fractal-token") && !tags.includes("variable-scale")) {
    warnings.push("quandrix-low-proof-signal: add math, Fractal, variable, threshold, copy, or scale language.");
  }

  if (tags.includes("land-threshold") && !tags.includes("variable-scale") && !tags.includes("proof-materialization")) {
    warnings.push("ramp-drift: land/ramp language should unlock a proof, threshold, Fractal, copy, or X payoff.");
  }

  return {
    identity: QUANDRIX_CORE.identity,
    functionName,
    signals: normalized,
    tags,
    notes: extra.notes || [],
    warnings: unique([...(extra.warnings || []), ...warnings]),
    meta: {
      version: QUANDRIX_TRANSLATION_VERSION,
      axiom: QUANDRIX_CORE.axiom,
      primaryMotion: QUANDRIX_CORE.primaryMotion,
      ...extra.meta
    }
  };
}

/**
 * Detain()
 * Quandrix meaning: bind a signal as a variable until it can be evaluated.
 *
 * Use when a raw placement signal is interesting but too broad. Instead of letting
 * "ramp," "tokens," or "spells" drift into generic Simic/Izzet language, Detain()
 * holds it in a scoped proof state and asks what variable it represents.
 */
export function Detain(signals, options = {}) {
  const detained = normalizeSignals(signals).map((signal, index) => ({
    ...signal,
    id: signal.id || `variable-${index + 1}`,
    label: signal.label || `Variable ${index + 1}`,
    tags: unique([...(signal.tags || []), "variable-bound"]),
    text: signal.text || signal.label || "Unresolved Quandrix variable"
  }));

  return result("Detain", detained, {
    notes: [
      "Quandrix Detain binds vague signals as variables instead of treating them as final meaning.",
      "Resolve each variable into proof: Fractal, counter, copy, land threshold, X-spell, or theory/substance."
    ],
    meta: {
      mode: "variable-binding",
      releaseCondition: options.releaseCondition || "signal resolves into a named proof axis"
    }
  });
}

/**
 * Override()
 * Quandrix meaning: replace a generic reading with the strongest theorem-specific read.
 *
 * Example: "tokens" becomes "Fractal materialization" when paired with Quandrix,
 * copy, magecraft, Body of Research, or Adrix/Nev signals.
 */
export function Override(signals, options = {}) {
  const overridden = normalizeSignals(signals).map((signal) => {
    const tags = inferQuandrixTags(signal);
    let override = "proof-materialization";

    if (tags.includes("copy-replication") || tags.includes("doubling")) override = "one-proof-becomes-two";
    else if (tags.includes("counter-accretion")) override = "growth-as-data";
    else if (tags.includes("land-threshold")) override = "land-as-variable";
    else if (tags.includes("x-spell")) override = "solve-for-x";
    else if (tags.includes("theory-substance")) override = "theory-to-substance";
    else if (tags.includes("fractal-token")) override = "theorem-becomes-body";

    return {
      ...signal,
      tags: unique([...tags, "override", override]),
      override,
      text: signal.text || `${signal.label || "Signal"} resolved as ${override}`
    };
  });

  return result("Override", overridden, {
    notes: [
      "Quandrix Override prevents generic green-blue reads by naming the exact proof pattern.",
      "Prefer theorem/body/copy/counter/land/X language over broad value-engine language."
    ],
    meta: {
      mode: "theorem-override",
      prefer: options.prefer || "specific Quandrix proof axis over generic Simic label"
    }
  });
}

/**
 * ConstraintField()
 * Quandrix meaning: enforce the boundaries of the proof so the reading does not drift.
 *
 * Use around generated panels, recommendations, or Maze URLs to ensure a Quandrix
 * result includes at least one material proof axis.
 */
export function ConstraintField(signals, options = {}) {
  const checked = normalizeSignals(signals).map((signal) => {
    const tags = inferQuandrixTags(signal);
    const hasProofAxis = tags.some((tag) => [
      "math-as-reality",
      "fractal-token",
      "copy-replication",
      "doubling",
      "counter-accretion",
      "land-threshold",
      "x-spell",
      "theory-substance",
      "proof-materialization"
    ].includes(tag));

    return {
      ...signal,
      tags: unique([...tags, hasProofAxis ? "proof-axis-present" : "proof-axis-missing"]),
      constraintStatus: hasProofAxis ? "pass" : "needs-quandrix-proof-axis"
    };
  });

  const failures = checked.filter((signal) => signal.constraintStatus !== "pass");

  return result("ConstraintField", checked, {
    warnings: failures.length ? [
      `${failures.length} signal(s) need a Quandrix proof axis before rendering as college-specific content.`
    ] : [],
    notes: [
      "ConstraintField is the anti-drift guard: math/pattern/Fractal/copy/counter/land/X must be visible.",
      "A pure ramp or generic counters result should be rewritten before it reaches the user."
    ],
    meta: {
      mode: "proof-boundary",
      strict: options.strict !== false,
      failureCount: failures.length
    }
  });
}

/**
 * AccretionEngine()
 * Quandrix meaning: compound small signals into a scalable proof.
 *
 * Use when user responses suggest growth over time: counters, land count, tokens,
 * spells cast, cards in hand/library, or X-mana investment.
 */
export function AccretionEngine(signals, options = {}) {
  const normalized = normalizeSignals(signals);
  let scale = Number.isFinite(options.baseScale) ? options.baseScale : 1;

  const accreted = normalized.map((signal, index) => {
    const tags = inferQuandrixTags(signal);
    const multiplier = 1 + Math.min(2, scoreTags(tags) / 4);
    scale = Number((scale * multiplier).toFixed(3));

    return {
      ...signal,
      tags: unique([...tags, "accretion-step"]),
      accretionIndex: index + 1,
      multiplier: Number(multiplier.toFixed(3)),
      cumulativeScale: scale,
      proofState: scale >= 3 ? "scale-break" : scale >= 2 ? "visible-proof" : "forming-variable"
    };
  });

  return result("AccretionEngine", accreted, {
    notes: [
      "AccretionEngine turns repeated small signals into Quandrix scale: counters, copies, lands, X, and Fractals.",
      "Use cumulativeScale for UI intensity, not as game math."
    ],
    meta: {
      mode: "growth-copy-scale-engine",
      finalScale: scale,
      displayHint: scale >= 3 ? "trigger vm-quandrix-scale-break" : "use subtle proof-line growth"
    }
  });
}

export default {
  QUANDRIX_TRANSLATION_VERSION,
  QUANDRIX_CORE,
  Detain,
  Override,
  ConstraintField,
  AccretionEngine
};

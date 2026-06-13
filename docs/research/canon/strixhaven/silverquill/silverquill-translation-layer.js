/**
 * Vox Mana — Silverquill Translation Layer
 * Schema: vox-mana-translation-layer-v1
 *
 * Purpose:
 * These functions adapt shared Vox Mana primitives into a Silverquill-specific reading layer.
 * The function names remain stable across identities so the placement UI can call the
 * same primitives while each college/guild supplies a different semantic adapter.
 *
 * Silverquill core axiom:
 *   "Words are weapons, shields, contracts, applause, and verdicts; the winning line changes status in public."
 *
 * Note:
 * Detain(), Override(), ConstraintField(), and AccretionEngine() are shared engine
 * primitive names, not literal Azorius mechanics. Silverquill maps them to rhetorical
 * delay, status override, social constraint, and ink/status accretion.
 *
 * No external dependencies.
 */

export const SILVERQUILL_TRANSLATION_VERSION = "vox-mana-silverquill-translation-v1";

export const SILVERQUILL_CORE = Object.freeze({
  identity: "silverquill",
  axiom: "Words are weapons, shields, contracts, applause, and verdicts; the winning line changes status in public.",
  primaryMotion: "claim-to-status-to-verdict",
  coreTags: [
    "word-magic",
    "rhetorical-pressure",
    "inkling-token",
    "status-counter",
    "public-verdict",
    "political-combat",
    "aura-goad",
    "drain-and-life",
    "protection-as-speech",
    "humiliation-to-advantage"
  ],
  antiDrift: [
    "not-generic-orzhov-taxes",
    "not-only-aristocrats",
    "not-azorius-law",
    "not-rakdos-performance-chaos",
    "not-monochrome-flat-ui",
    "not-vampire-church-only"
  ]
});

const DEFAULT_WEIGHTS = Object.freeze({
  "word-magic": 1.0,
  "rhetorical-pressure": 0.98,
  "inkling-token": 0.92,
  "status-counter": 0.9,
  "public-verdict": 0.92,
  "political-combat": 0.88,
  "aura-goad": 0.78,
  "drain-and-life": 0.76,
  "protection-as-speech": 0.74,
  "humiliation-to-advantage": 0.86,
  "lesson-toolbox": 0.56,
  "removal-as-cutting-line": 0.82
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
  return `${signal.label} ${signal.text} ${(signal.tags || []).join(" ")}`.toLowerCase();
}

function scoreSignal(signal, extraWeights = {}) {
  const text = tagText(signal);
  const weights = { ...DEFAULT_WEIGHTS, ...extraWeights };
  let score = signal.weight || 1;

  for (const [tag, value] of Object.entries(weights)) {
    const needle = tag.replaceAll("-", " ");
    if (text.includes(tag) || text.includes(needle)) score += value;
  }

  if (text.includes("silverquill")) score += 1.0;
  if (text.includes("inkling")) score += 0.92;
  if (text.includes("counter")) score += 0.78;
  if (text.includes("goad") || text.includes("politic")) score += 0.82;
  if (text.includes("aura") || text.includes("enchantment")) score += 0.58;
  if (text.includes("tax") && !text.includes("rhetoric")) score -= 0.3;

  return Number(score.toFixed(3));
}

function result(functionName, signals, tags, notes = [], warnings = [], meta = {}) {
  return {
    identity: "silverquill",
    functionName,
    signals,
    tags: unique([...(tags || []), ...SILVERQUILL_CORE.coreTags]),
    notes,
    warnings,
    meta: {
      version: SILVERQUILL_TRANSLATION_VERSION,
      axiom: SILVERQUILL_CORE.axiom,
      antiDrift: SILVERQUILL_CORE.antiDrift,
      ...meta
    }
  };
}

/**
 * Detain()
 * Silverquill read: delay, silence, tax, or redirect a threat by making it answer to public language.
 */
export function Detain(input, options = {}) {
  const signals = normalizeSignals(input).map((signal) => ({
    ...signal,
    silverquillScore: scoreSignal(signal, options.weights),
    reading: "Delay the threat by forcing it into a public argument it cannot freely ignore.",
    uiTreatment: "verdict-line + muted spotlight + small silver status mark"
  }));

  return result(
    "Detain",
    signals,
    ["rhetorical-delay", "silence", "tax", "tempo", "public-verdict"],
    [
      "Use when a placement signal points to interruption, delay, naming, goad, attack deterrence, or protection through social cost.",
      "Good UI copy verbs: name, silence, delay, expose, bind, redirect."
    ],
    [],
    { mode: "rhetorical-delay" }
  );
}

/**
 * Override()
 * Silverquill read: replace the table's current status story with a sharper line.
 */
export function Override(input, options = {}) {
  const signals = normalizeSignals(input).map((signal) => ({
    ...signal,
    silverquillScore: scoreSignal(signal, options.weights),
    reading: "Rewrite the status hierarchy: who is protected, who is humiliated, and who gets the final word.",
    uiTreatment: "spotlight snap + signature flourish + contrast inversion"
  }));

  return result(
    "Override",
    signals,
    ["status-override", "humiliation", "promotion", "modal-command", "final-word"],
    [
      "Use for modal spells, counters as rank, chosen-player politics, board resets, and effects that turn loss into public advantage.",
      "Avoid making this feel like Azorius law; the pressure is social and rhetorical, not bureaucratic."
    ],
    [],
    { mode: "status-override" }
  );
}

/**
 * ConstraintField()
 * Silverquill read: a social field of vows, obligations, goads, taxes, auras, and reputation costs.
 */
export function ConstraintField(input, options = {}) {
  const signals = normalizeSignals(input).map((signal) => ({
    ...signal,
    silverquillScore: scoreSignal(signal, options.weights),
    reading: "Create a social constraint field where creatures can still act, but every action has reputational cost.",
    uiTreatment: "thin stage-border grid + oath/vow chips + attack-direction arrows"
  }));

  return result(
    "ConstraintField",
    signals,
    ["obligation", "vow", "goad", "attack-tax", "aura-politics", "deterrence"],
    [
      "Use for Breena, Promise of Loyalty, Nils, Cunning Rhetoric, aura/goad recommendations, and political combat panels.",
      "Keep the language about social pressure rather than prison, law, or hard control."
    ],
    [],
    { mode: "social-constraint-field" }
  );
}

/**
 * AccretionEngine()
 * Silverquill read: ink, counters, applause, tokens, and life swings accumulate into public advantage.
 */
export function AccretionEngine(input, options = {}) {
  const signals = normalizeSignals(input).map((signal) => ({
    ...signal,
    silverquillScore: scoreSignal(signal, options.weights),
    reading: "Accumulate status marks until the speech becomes bodies, cards, drain, or a decisive combat swing.",
    uiTreatment: "inkling particle release + counter/status tally + gold applause pulse"
  }));

  return result(
    "AccretionEngine",
    signals,
    ["ink-accretion", "counter-accretion", "token-conversion", "life-swing", "applause"],
    [
      "Use for Felisa, Inkshield, Dramatic Finale, Tenured Inkcaster, counter-transfer, and death-to-Inkling panels.",
      "The engine should feel like status becoming material, not generic +1/+1 counter math."
    ],
    [],
    { mode: "status-and-ink-accretion" }
  );
}

export default {
  SILVERQUILL_TRANSLATION_VERSION,
  SILVERQUILL_CORE,
  Detain,
  Override,
  ConstraintField,
  AccretionEngine
};

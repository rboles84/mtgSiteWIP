/**
 * Vox Mana — Gruul Translation Layer
 * Schema: vox-mana-translation-layer-v1
 *
 * Purpose:
 * These functions adapt shared Vox Mana primitives into a Gruul-specific reading layer.
 * The function names remain stable across identities so the placement UI can call the
 * same primitives while each guild supplies a different semantic adapter.
 *
 * Gruul core axiom:
 *   "The body knows before the law finishes speaking."
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

export const GRUUL_TRANSLATION_VERSION = "vox-mana-gruul-translation-v1";

export const GRUUL_CORE = Object.freeze({
  identity: "gruul",
  axiom: "The body knows before the law finishes speaking.",
  primaryMotion: "impulse-to-impact",
  coreTags: [
    "impulse",
    "instinct",
    "attack-first",
    "riot-choice",
    "bloodrush-translation",
    "trample",
    "haste",
    "ramp-into-overwhelm",
    "anti-obstacle",
    "terrain-muscle"
  ],
  antiDrift: [
    "not-rakdos-spectacle",
    "not-golgari-rot",
    "not-selesnya-harmony",
    "not-simic-optimization",
    "not-boros-discipline",
    "not-generic-stompy"
  ]
});

const DEFAULT_WEIGHTS = Object.freeze({
  impulse: 0.95,
  instinct: 0.95,
  "attack-first": 1.0,
  "riot-choice": 0.92,
  "bloodrush-translation": 0.9,
  trample: 0.86,
  haste: 0.82,
  fight: 0.76,
  "ramp-into-overwhelm": 0.84,
  "anti-obstacle": 0.8,
  "terrain-muscle": 0.72,
  "noncreature-punishment": 0.62
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

function inferGruulTags(signal) {
  const text = tagText(signal);
  const tags = [];

  if (/impulse|emotion|gut|rage|wild|revel|chaos|anarch/.test(text)) tags.push("impulse");
  if (/instinct|natural|primal|beast|pack|clan|herd|boar|wurm|dinosaur|dragon/.test(text)) tags.push("instinct");
  if (/attack|attacking|combat|blocked|blocker|fight|ferocious|formidable/.test(text)) tags.push("attack-first");
  if (/riot|haste|\+1\/\+1 counter|counter path|speed|size/.test(text)) tags.push("riot-choice");
  if (/bloodrush|discard this card|target attacking creature|combat trick/.test(text)) tags.push("bloodrush-translation");
  if (/trample|can't be blocked|must be blocked|menace|double strike|first strike/.test(text)) tags.push("trample");
  if (/haste|immediate|right away|now/.test(text)) tags.push("haste");
  if (/fight|damage to target creature|prey|hunt|wrestle/.test(text)) tags.push("fight");
  if (/land|mana|ramp|add \{|territory|terrain|stomping ground|turf/.test(text)) tags.push("ramp-into-overwhelm", "terrain-muscle");
  if (/destroy|artifact|enchantment|noncreature|countered|obstacle|law|control|can't/.test(text)) tags.push("anti-obstacle");
  if (/spell|noncreature|activated ability|counterspell/.test(text)) tags.push("noncreature-punishment");

  return unique([...(signal.tags || []), ...tags]);
}

function weightSignal(signal) {
  const tags = inferGruulTags(signal);
  const tagWeight = tags.reduce((sum, tag) => sum + (DEFAULT_WEIGHTS[tag] || 0), 0);
  const density = Math.min(tags.length / 4, 1);
  return Number(((signal.weight || 1) * (1 + tagWeight / 5) * (0.75 + density)).toFixed(3));
}

function baseResult(functionName, signals, notes = [], warnings = [], meta = {}) {
  const normalized = normalizeSignals(signals).map((signal) => {
    const tags = inferGruulTags(signal);
    return { ...signal, tags, gruulWeight: weightSignal({ ...signal, tags }) };
  });

  const tags = unique(normalized.flatMap((signal) => signal.tags));

  return {
    identity: "gruul",
    functionName,
    signals: normalized,
    tags,
    notes,
    warnings,
    meta: {
      version: GRUUL_TRANSLATION_VERSION,
      axiom: GRUUL_CORE.axiom,
      primaryMotion: GRUUL_CORE.primaryMotion,
      ...meta
    }
  };
}

/**
 * Detain()
 *
 * Shared primitive name. For Gruul, "detain" does not mean lawful restraint.
 * It means: identify what is blocking motion so the UI can frame it as an obstacle.
 *
 * Use it when the placement engine detects slowdowns, blockers, rules, defensive posture,
 * analysis paralysis, or control surfaces.
 *
 * @param {Signal|Signal[]} signals
 * @param {Object} [options]
 * @returns {TranslationResult}
 */
export function Detain(signals, options = {}) {
  const result = baseResult(
    "Detain",
    signals,
    [
      "Gruul Detain marks the obstacle, not the legal hold.",
      "Use this to translate restrictions into smashable UI/reading objects."
    ],
    [],
    {
      gruulInterpretation: "obstacle-marker",
      suggestedCopy: options.copy || "Something is in the charge lane.",
      animation: "vm-gruul-ground-crack",
      uiState: "blocked-path"
    }
  );

  const hasNonGruulControl = result.tags.some((tag) => ["law", "secrecy", "debt"].includes(tag));
  if (hasNonGruulControl) {
    result.warnings.push("Possible drift: restriction language may be Azorius/Dimir/Orzhov unless reframed as an obstacle to impact.");
  }

  return result;
}

/**
 * Override()
 *
 * For Gruul, override means the body/instinct route interrupts slow permission systems.
 * It should not sound like Dimir hacking or Azorius exception handling.
 *
 * @param {Signal|Signal[]} signals
 * @param {Object} [options]
 * @returns {TranslationResult}
 */
export function Override(signals, options = {}) {
  const mode = options.mode || "impact";
  const result = baseResult(
    "Override",
    signals,
    [
      "Override converts analysis into action.",
      "Prefer verbs like break, charge, trample, force, hit, throw, and wake."
    ],
    [],
    {
      gruulInterpretation: "permission-bypass-through-force",
      mode,
      suggestedCopy: mode === "haste" ? "Hit now." : mode === "counter" ? "Hit harder." : "Break the quiet part.",
      animation: mode === "haste" ? "vm-gruul-ember-lunge" : "vm-gruul-stomp-in",
      uiState: "impact-route"
    }
  );

  if (!result.tags.includes("attack-first") && !result.tags.includes("anti-obstacle")) {
    result.warnings.push("Gruul Override works best when tied to attack, impact, obstacle-breaking, haste, or trample.");
  }

  return result;
}

/**
 * ConstraintField()
 *
 * For Gruul, a constraint field is terrain: barricade, gate, cliff, cage, leash,
 * blocker, control deck, stalled board, or overbuilt machine. The reading should
 * ask what kind of force breaks the constraint.
 *
 * @param {Signal|Signal[]} signals
 * @param {Object} [options]
 * @returns {TranslationResult}
 */
export function ConstraintField(signals, options = {}) {
  const result = baseResult(
    "ConstraintField",
    signals,
    [
      "Map constraints to physical or instinctive obstacles.",
      "Then offer Gruul routes: haste, trample, fight, ramp, artifact/enchantment break, or bigger body."
    ],
    [],
    {
      gruulInterpretation: "terrain-and-obstacle-map",
      routes: options.routes || ["haste", "trample", "fight", "ramp", "destroy-artifice", "larger-body"],
      animation: "vm-gruul-riot-choice",
      uiState: "route-selection"
    }
  );

  const routes = new Set(result.meta.routes);
  if (result.tags.includes("riot-choice")) {
    routes.add("haste");
    routes.add("+1/+1-counter");
  }
  if (result.tags.includes("bloodrush-translation")) routes.add("combat-trick");
  if (result.tags.includes("terrain-muscle")) routes.add("land-to-impact");
  result.meta.routes = [...routes];

  return result;
}

/**
 * AccretionEngine()
 *
 * Shared primitive name. For Gruul, accretion is not patient sediment like Golgari;
 * it is momentum: ramp, bodies, counters, combat keywords, and repeated attacks
 * becoming an unstoppable aftershock.
 *
 * @param {Signal|Signal[]} signals
 * @param {Object} [options]
 * @returns {TranslationResult}
 */
export function AccretionEngine(signals, options = {}) {
  const result = baseResult(
    "AccretionEngine",
    signals,
    [
      "Gruul accretion is momentum, not bookkeeping.",
      "Track how resources turn into bigger attacks, not how control is maintained."
    ],
    [],
    {
      gruulInterpretation: "momentum-stack",
      sequence: options.sequence || ["spark", "body", "terrain", "impact", "aftershock"],
      animation: "vm-gruul-pack-surge",
      uiState: "momentum-build"
    }
  );

  const score = result.signals.reduce((sum, signal) => sum + (signal.gruulWeight || 0), 0);
  result.meta.momentumScore = Number(score.toFixed(3));
  result.meta.primaryRoute = result.tags.includes("riot-choice")
    ? "riot-choice"
    : result.tags.includes("bloodrush-translation")
      ? "bloodrush-combat"
      : result.tags.includes("ramp-into-overwhelm")
        ? "ramp-to-impact"
        : "attack-first";

  return result;
}

export default {
  GRUUL_TRANSLATION_VERSION,
  GRUUL_CORE,
  Detain,
  Override,
  ConstraintField,
  AccretionEngine
};

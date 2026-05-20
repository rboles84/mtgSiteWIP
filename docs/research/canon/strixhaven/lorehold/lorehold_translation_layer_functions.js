/**
 * Vox Mana — Lorehold Translation Layer Functions
 *
 * Lorehold premise:
 *   The past is not dead material. It is evidence, precedent, relic, witness,
 *   warning, and fuel. White preserves and orders it; red breaks the seal and
 *   lets discovery move.
 *
 * These names are intentionally shared across faction/school layers so the UI can
 * call the same translation hooks while each identity gives them its own behavior.
 */

const DEFAULT_LOREHOLD_CONTEXT = Object.freeze({
  school: "Lorehold",
  colorPair: "Red/White",
  corePattern: "excavation + precedent -> revived action",
  reducedMotion: false,
  intensity: 0.68,
});

function clamp01(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null) return [];
  return [value];
}

/**
 * Detain(signal, context)
 * Lorehold version: conservation hold. This is not Azorius law-detainment;
 * it is the careful pause before a dangerous artifact, graveyard memory, or
 * historical precedent is interpreted and used.
 */
export function Detain(signal, context = {}) {
  const ctx = { ...DEFAULT_LOREHOLD_CONTEXT, ...context };
  const motifs = asArray(signal?.motifs ?? signal?.tags ?? signal?.mechanical_signal);

  return {
    hook: "Detain",
    school: ctx.school,
    input: signal,
    intent: "preserve_and_classify",
    readableTranslation: "Pause the dig, protect the find, cite the precedent, and decide what history is safe to revive.",
    uiTreatment: ctx.reducedMotion
      ? "static parchment hold + relic badge"
      : "archive trace -> dust freeze -> precedent stamp",
    tags: ["preservation", "precedent", "archive", "site-safety", ...motifs],
    nextSuggestedHook: "ConstraintField",
  };
}

/**
 * Override(signal, context)
 * Lorehold version: the red field-scholar breaks a seal when the archive is too
 * still, the route is too safe, or the historical truth has to be experienced.
 */
export function Override(signal, context = {}) {
  const ctx = { ...DEFAULT_LOREHOLD_CONTEXT, ...context };
  const discovery = clamp01(signal?.excavation_signal ?? signal?.discovery ?? ctx.intensity);
  const red = clamp01(signal?.red_signal ?? signal?.risk ?? 0.5);
  const procedure = clamp01(signal?.white_signal ?? signal?.procedure ?? 0.5);
  const overrideLevel = clamp01((discovery * 0.45) + (red * 0.45) + ((1 - procedure) * 0.1));

  return {
    hook: "Override",
    school: ctx.school,
    input: signal,
    intent: "break_seal_for_discovery",
    overrideLevel,
    readableTranslation: overrideLevel > 0.66
      ? "The discovery pressure is high enough to break the seal and let history move."
      : "The find has heat, but it should remain inside the excavation grid for now.",
    uiTreatment: ctx.reducedMotion
      ? "red crack badge"
      : "red seal-break crack -> dust lift -> relic flash",
    tags: ["discovery", "risk", "fieldwork", "seal-break"],
    nextSuggestedHook: overrideLevel > 0.66 ? "AccretionEngine" : "ConstraintField",
  };
}

/**
 * ConstraintField(signal, context)
 * Lorehold version: excavation grid, archive policy, field map, or cited precedent.
 * The constraint does not kill adventure; it makes dangerous history readable.
 */
export function ConstraintField(signal, context = {}) {
  const ctx = { ...DEFAULT_LOREHOLD_CONTEXT, ...context };
  const constraints = asArray(signal?.constraints ?? signal?.modes ?? signal?.site_rules ?? signal?.axes);

  return {
    hook: "ConstraintField",
    school: ctx.school,
    input: signal,
    intent: "establish_excavation_grid",
    field: {
      frame: "ivory excavation grid over parchment",
      allowedRevivals: ["Spirit witness", "artifact copy", "reconstructed spell", "battle precedent"],
      constraints,
    },
    readableTranslation: "Draw the excavation grid first so the dangerous part of the past can return in a legible form.",
    uiTreatment: ctx.reducedMotion
      ? "bordered parchment panel with relic/spirit icons"
      : "grid draw, bronze corner pins, soft spirit-statue rise",
    tags: ["excavation-grid", "archive", "precedent", "legibility"],
    nextSuggestedHook: "AccretionEngine",
  };
}

/**
 * AccretionEngine(signal, context)
 * Lorehold version: every relic, Spirit, graveyard exit, map note, and artifact
 * copy adds historical charge until the past can stand up and act.
 */
export function AccretionEngine(signal, context = {}) {
  const ctx = { ...DEFAULT_LOREHOLD_CONTEXT, ...context };
  const relics = asArray(signal?.relics ?? signal?.artifacts);
  const spirits = asArray(signal?.spirits ?? signal?.witnesses);
  const exits = asArray(signal?.graveyard_exits ?? signal?.events);

  const base = clamp01(ctx.intensity);
  const relicCharge = Math.min(relics.length * 0.1, 0.35);
  const spiritCharge = Math.min(spirits.length * 0.12, 0.36);
  const graveCharge = Math.min(exits.length * 0.08, 0.28);
  const charge = clamp01(base + relicCharge + spiritCharge + graveCharge);

  const threshold = charge >= 0.82 ? "revival" : charge >= 0.55 ? "excavating" : "cataloging";

  return {
    hook: "AccretionEngine",
    school: ctx.school,
    input: signal,
    intent: "revive_history_into_action",
    charge,
    threshold,
    readableTranslation: threshold === "revival"
      ? "Enough evidence, relic matter, and witness energy have gathered: let the past act now."
      : "The site is gaining historical charge; keep cataloging relics and Spirit witnesses before the revival.",
    uiTreatment: ctx.reducedMotion
      ? `static ${threshold} badge`
      : threshold === "revival"
        ? "dust lift -> spirit-statue rise -> relic rebuild finale"
        : "small dust motes, parchment glow, bronze counter ticks",
    tags: ["relic", "Spirit", "gravebreak", "reconstruction", "history-in-action"],
    nextSuggestedHook: threshold === "revival" ? "Override" : "Detain",
  };
}

export const LoreholdTranslationLayer = Object.freeze({
  Detain,
  Override,
  ConstraintField,
  AccretionEngine,
});

export default LoreholdTranslationLayer;

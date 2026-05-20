/**
 * Vox Mana — Prismari Translation Layer Functions
 *
 * Prismari premise:
 *   Blue technique frames the spell. Red emotion breaks the frame.
 *   The result is legible elemental performance, not random chaos.
 *
 * These names are intentionally shared across faction/school layers so the UI can
 * call the same translation hooks while each identity gives them its own behavior.
 */

const DEFAULT_PRISMARI_CONTEXT = Object.freeze({
  school: "Prismari",
  colorPair: "Blue/Red",
  corePattern: "technique + emotion -> elemental spectacle",
  reducedMotion: false,
  intensity: 0.72,
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
 * Prismari version: freeze the motif long enough to study its technique.
 * This is not Azorius law-detainment; it is rehearsal pause, framing, and replay.
 */
export function Detain(signal, context = {}) {
  const ctx = { ...DEFAULT_PRISMARI_CONTEXT, ...context };
  const motifs = asArray(signal?.motifs ?? signal?.tags ?? signal?.mechanical_signal);

  return {
    hook: "Detain",
    school: ctx.school,
    input: signal,
    intent: "hold_for_rehearsal",
    readableTranslation: "Pause the expressive burst, outline its technique, then release it as a cleaner performance.",
    uiTreatment: ctx.reducedMotion
      ? "static blue frame + caption"
      : "blue frame draw -> motif freeze -> soft copy echo",
    tags: ["technique", "rehearsal", "copy-readiness", ...motifs],
    nextSuggestedHook: "ConstraintField",
  };
}

/**
 * Override(signal, context)
 * Prismari version: let emotional truth replace the current plan when the plan
 * has become too sterile to express the user's actual identity.
 */
export function Override(signal, context = {}) {
  const ctx = { ...DEFAULT_PRISMARI_CONTEXT, ...context };
  const emotion = clamp01(signal?.red_signal ?? signal?.emotion ?? ctx.intensity);
  const technique = clamp01(signal?.blue_signal ?? signal?.technique ?? 0.5);
  const overrideLevel = clamp01((emotion * 0.7) + ((1 - technique) * 0.3));

  return {
    hook: "Override",
    school: ctx.school,
    input: signal,
    intent: "emotional_breakthrough",
    overrideLevel,
    readableTranslation: overrideLevel > 0.66
      ? "The emotional reading is strong enough to break the current frame and restage the moment."
      : "The emotional reading adds heat, but should stay inside the current composition.",
    uiTreatment: ctx.reducedMotion
      ? "red accent underline"
      : "red rupture across blue frame, then controlled ember fade",
    tags: ["emotion", "risk", "stage-break", "improvisation"],
    nextSuggestedHook: overrideLevel > 0.66 ? "AccretionEngine" : "ConstraintField",
  };
}

/**
 * ConstraintField(signal, context)
 * Prismari version: a stage boundary. The point is not restriction for its own
 * sake; the boundary makes improvisation readable.
 */
export function ConstraintField(signal, context = {}) {
  const ctx = { ...DEFAULT_PRISMARI_CONTEXT, ...context };
  const constraints = asArray(signal?.constraints ?? signal?.modes ?? signal?.axes);

  return {
    hook: "ConstraintField",
    school: ctx.school,
    input: signal,
    intent: "compose_the_stage",
    field: {
      frame: "blue geometric stage mark",
      allowedRuptures: ["brush burst", "copy echo", "elemental bloom"],
      constraints,
    },
    readableTranslation: "Give the performance a visible frame so the wild part feels intentional.",
    uiTreatment: ctx.reducedMotion
      ? "bordered panel with red-blue badges"
      : "blue outline, red corner sparks, slow spotlight sweep",
    tags: ["composition", "stagecraft", "legibility", "controlled-chaos"],
    nextSuggestedHook: "AccretionEngine",
  };
}

/**
 * AccretionEngine(signal, context)
 * Prismari version: every cast, copy, treasure, or performance beat adds energy
 * until the UI earns a crescendo.
 */
export function AccretionEngine(signal, context = {}) {
  const ctx = { ...DEFAULT_PRISMARI_CONTEXT, ...context };
  const events = asArray(signal?.events ?? signal?.spells ?? signal?.beats);
  const base = clamp01(ctx.intensity);
  const eventCharge = Math.min(events.length * 0.12, 0.6);
  const elemental = clamp01(signal?.elemental_signal ?? signal?.elemental ?? 0.5) * 0.2;
  const charge = clamp01(base + eventCharge + elemental);

  const threshold = charge >= 0.82 ? "crescendo" : charge >= 0.55 ? "building" : "warming";

  return {
    hook: "AccretionEngine",
    school: ctx.school,
    input: signal,
    intent: "build_to_crescendo",
    charge,
    threshold,
    readableTranslation: threshold === "crescendo"
      ? "Enough technique, emotion, and spell residue have accumulated: release the full elemental performance."
      : "The performance is gathering charge; keep adding spell beats before the finale.",
    uiTreatment: ctx.reducedMotion
      ? `static ${threshold} badge`
      : threshold === "crescendo"
        ? "treasure beats -> copy echoes -> elemental bloom finale"
        : "small treasure sparks and low blue-red pulse",
    tags: ["momentum", "big-spell", "treasure", "copy", "elemental"],
    nextSuggestedHook: threshold === "crescendo" ? "Override" : "Detain",
  };
}

export const PrismariTranslationLayer = Object.freeze({
  Detain,
  Override,
  ConstraintField,
  AccretionEngine,
});

export default PrismariTranslationLayer;

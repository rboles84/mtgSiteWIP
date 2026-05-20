/**
 * Vox Mana Rakdos Translation Layer
 *
 * Requested primitive names:
 * - Detain()
 * - Override()
 * - ConstraintField()
 * - AccretionEngine()
 *
 * Rakdos interpretation:
 * - Detain(): hold low-confidence/off-axis signals before UI output.
 * - Override(): allow strong spectacle, life-loss, sacrifice, discard, or damage evidence to outrank generic aggression.
 * - ConstraintField(): prevent drift into generic evil, random chaos, or gore-only framing.
 * - AccretionEngine(): accumulate repeated evidence into stable placement/narrative axes.
 */

export const RAKDOS_SIGNAL_AXES = Object.freeze({
  spectacle: "public performance, attention, showmanship",
  appetite: "desire, indulgence, immediate wants",
  painAsPermission: "damage/life loss unlocks action",
  sacrifice: "resources converted through death or breaking",
  discard: "plans stripped away, improvisation forced",
  momentum: "haste, pressure, cannot-wait action",
  transgression: "social limits crossed for truth or release",
  punishment: "excess, defense, or planning made costly",
  demonicPatronage: "power granted with unstable cost",
  carnival: "theater, crowd, venue, audience participation"
});

export const RAKDOS_ANTI_DRIFT = Object.freeze([
  "Do not reduce Rakdos to generic evil.",
  "Do not reduce Rakdos to random chaos.",
  "Do not make Rakdos only gore/horror.",
  "Do not make Rakdos purely hedonism without cost.",
  "Do not erase the performance/crowd/audience layer.",
  "Do not let Rakdos become mono-red impulse without black cost/accounting.",
  "Do not let Rakdos become mono-black ambition without red immediacy/release."
]);

const DEFAULT_WEIGHTS = Object.freeze({
  spectacle: 1.15,
  appetite: 1.0,
  painAsPermission: 1.2,
  sacrifice: 1.1,
  discard: 1.0,
  momentum: 1.05,
  transgression: 1.0,
  punishment: 1.05,
  demonicPatronage: 0.95,
  carnival: 1.1
});

function clamp(value, min = 0, max = 1) {
  const number = Number(value);
  if (Number.isNaN(number)) return min;
  return Math.min(max, Math.max(min, number));
}

function normalizeSignal(raw) {
  return {
    axis: raw.axis,
    score: clamp(raw.score ?? 0),
    evidence: Array.isArray(raw.evidence) ? raw.evidence : [],
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    source: raw.source ?? "unknown",
    confidence: clamp(raw.confidence ?? raw.score ?? 0),
    held: Boolean(raw.held),
    notes: Array.isArray(raw.notes) ? raw.notes : []
  };
}

export function Detain(signals, options = {}) {
  const threshold = options.threshold ?? 0.42;
  const allowedAxes = new Set(Object.keys(RAKDOS_SIGNAL_AXES));

  return signals.map((raw) => {
    const signal = normalizeSignal(raw);
    const offAxis = !allowedAxes.has(signal.axis);
    const weak = signal.confidence < threshold;
    const shouldHold = offAxis || weak;

    return {
      ...signal,
      held: shouldHold,
      notes: shouldHold
        ? [...signal.notes, offAxis ? "detained:off-axis" : "detained:low-confidence"]
        : signal.notes
    };
  });
}

export function Override(signals, options = {}) {
  const weights = { ...DEFAULT_WEIGHTS, ...(options.weights ?? {}) };
  const hardEvidenceBoost = options.hardEvidenceBoost ?? 0.16;

  return signals.map((raw) => {
    const signal = normalizeSignal(raw);
    const axisWeight = weights[signal.axis] ?? 1;
    const evidenceText = `${signal.evidence.join(" ")} ${signal.tags.join(" ")}`.toLowerCase();

    const hasHardRakdosEvidence =
      evidenceText.includes("spectacle") ||
      evidenceText.includes("unleash") ||
      evidenceText.includes("opponent lost life") ||
      evidenceText.includes("sacrifice") ||
      evidenceText.includes("discard") ||
      evidenceText.includes("life loss") ||
      evidenceText.includes("damage");

    const boosted = clamp(signal.score * axisWeight + (hasHardRakdosEvidence ? hardEvidenceBoost : 0));

    return {
      ...signal,
      score: boosted,
      confidence: Math.max(signal.confidence, boosted),
      held: signal.held && boosted < (options.releaseThreshold ?? 0.55),
      notes: hasHardRakdosEvidence
        ? [...signal.notes, "override:hard-rakdos-evidence"]
        : signal.notes
    };
  });
}

export function ConstraintField(signals, options = {}) {
  const forbiddenTags = new Set(options.forbiddenTags ?? [
    "generic-evil",
    "random-chaos",
    "gore-only",
    "murderhobo",
    "edgelord",
    "horror-only"
  ]);

  return signals.map((raw) => {
    const signal = normalizeSignal(raw);
    const cleanedTags = signal.tags.filter((tag) => !forbiddenTags.has(String(tag).toLowerCase()));

    const hasPerformanceLayer =
      cleanedTags.some((tag) => ["spectacle", "performance", "audience", "stage", "carnival", "riot"].includes(String(tag).toLowerCase())) ||
      signal.axis === "spectacle" ||
      signal.axis === "carnival";

    const notes = [...signal.notes];
    if (!hasPerformanceLayer && signal.score > 0.74) {
      notes.push("constraint:high-score-without-performance-layer");
    }

    return {
      ...signal,
      tags: cleanedTags,
      score: hasPerformanceLayer ? signal.score : clamp(signal.score * 0.92),
      notes
    };
  });
}

export function AccretionEngine(signals, options = {}) {
  const visibleSignals = signals.map(normalizeSignal).filter((signal) => !signal.held);
  const minScore = options.minScore ?? 0.2;
  const axes = {};

  for (const signal of visibleSignals) {
    if (signal.score < minScore) continue;
    if (!axes[signal.axis]) {
      axes[signal.axis] = {
        axis: signal.axis,
        total: 0,
        count: 0,
        evidence: new Set(),
        tags: new Set(),
        notes: []
      };
    }

    axes[signal.axis].total += signal.score;
    axes[signal.axis].count += 1;
    signal.evidence.forEach((item) => axes[signal.axis].evidence.add(item));
    signal.tags.forEach((tag) => axes[signal.axis].tags.add(tag));
    axes[signal.axis].notes.push(...signal.notes);
  }

  const rankedAxes = Object.values(axes)
    .map((axis) => ({
      axis: axis.axis,
      label: RAKDOS_SIGNAL_AXES[axis.axis] ?? axis.axis,
      score: clamp(axis.total / axis.count),
      signal_count: axis.count,
      evidence: Array.from(axis.evidence).slice(0, options.maxEvidence ?? 8),
      tags: Array.from(axis.tags).slice(0, options.maxTags ?? 12),
      notes: Array.from(new Set(axis.notes))
    }))
    .sort((a, b) => b.score - a.score);

  const primary = rankedAxes[0] ?? null;
  const secondary = rankedAxes[1] ?? null;

  return {
    faction: "rakdos",
    primary_axis: primary,
    secondary_axis: secondary,
    ranked_axes: rankedAxes,
    held_signals: signals.map(normalizeSignal).filter((signal) => signal.held),
    guardrails: RAKDOS_ANTI_DRIFT,
    summary: buildRakdosSummary(primary, secondary)
  };
}

function buildRakdosSummary(primary, secondary) {
  if (!primary) {
    return "Rakdos signal is insufficient. Hold output or ask for stronger card/query evidence.";
  }

  const secondaryText = secondary ? ` with ${secondary.axis} underneath` : "";
  return `Rakdos reads as ${primary.axis}${secondaryText}: pressure becomes performance, and cost becomes momentum.`;
}

export function translateRakdosSignals(rawSignals, options = {}) {
  const constrained = ConstraintField(rawSignals, options.constraint);
  const detained = Detain(constrained, options.detain);
  const overridden = Override(detained, options.override);
  return AccretionEngine(overridden, options.accretion);
}

export default {
  RAKDOS_SIGNAL_AXES,
  RAKDOS_ANTI_DRIFT,
  Detain,
  Override,
  ConstraintField,
  AccretionEngine,
  translateRakdosSignals
};

/**
 * Vox Mana — Witherbloom Translation Layer
 *
 * API-compatible names are intentionally preserved:
 *   Detain(), Override(), ConstraintField(), AccretionEngine()
 *
 * These names are NOT meant to make Witherbloom behave like Azorius.
 * They are reusable engine primitives translated into Witherbloom's language:
 * life/death exchange, biology, Pests, brewing, sacrifice, growth, rot, loyalty, and give-and-take.
 */

const WITHERBLOOM_IDENTITY = Object.freeze({
  id: "witherbloom",
  mana: ["B", "G"],
  college: "College of Essence Studies",
  alternateLabel: "College of Life and Death",
  coreAxiom:
    "Life and death are exchange rates inside one living system.",
  avoid:
    "Do not flatten Witherbloom into generic Golgari recursion or generic necromancy."
});

const SIGNAL_WEIGHTS = Object.freeze({
  lifeGain: 1.25,
  drain: 1.2,
  sacrifice: 1.15,
  pest: 1.2,
  food: 0.9,
  countersFromLife: 1.0,
  recursion: 0.75,
  graveyard: 0.65,
  tokenBodies: 0.95,
  biology: 1.15,
  potion: 1.05,
  loyalty: 0.55
});

/**
 * Detain(signal, context)
 *
 * Engine meaning:
 *   Temporarily hold an incoming signal so it can be interpreted through the
 *   identity's constraints before it reaches UI copy, animation, or Maze links.
 *
 * Witherbloom translation:
 *   Place the signal in "bog stasis." Ask what it consumes, what it feeds,
 *   and whether it belongs to life-gain, drain, Pest, sacrifice, or biology.
 */
export function Detain(signal, context = {}) {
  const normalized = normalizeSignal(signal);
  const tags = new Set([...(normalized.tags || []), ...(context.tags || [])]);

  const detained = {
    identity: WITHERBLOOM_IDENTITY.id,
    original: signal,
    normalized,
    holdReason: "witherbloom-biology-pass",
    questions: [
      "What is being consumed?",
      "What grows because something else diminished?",
      "Is this a life-gain event, a drain event, a sacrifice event, or a Pest/body event?",
      "Does this read as Strixhaven field biology rather than generic Golgari?"
    ],
    provisionalTags: Array.from(tags),
    riskFlags: []
  };

  if (tags.has("graveyard") && !hasAny(tags, ["lifeGain", "pest", "biology", "sacrifice"])) {
    detained.riskFlags.push("generic-golgari-graveyard-drift");
  }

  if (tags.has("necromancy") && !hasAny(tags, ["biology", "potion", "lifeDeathExchange"])) {
    detained.riskFlags.push("generic-necromancy-drift");
  }

  if (tags.has("insects") || tags.has("pests") || tags.has("mascot")) {
    detained.provisionalTags.push("small-bodies-matter");
  }

  return detained;
}

/**
 * Override(detainedSignal, overrideSet)
 *
 * Engine meaning:
 *   Replace broad or misleading interpretation with identity-specific copy,
 *   tags, animation cues, and search-routing metadata.
 *
 * Witherbloom translation:
 *   Convert "black-green goodstuff" into Witherbloom's specific grammar:
 *   essence, bog, potion, Pest, sacrifice, life-gain, drain, and loyal give-and-take.
 */
export function Override(detainedSignal, overrideSet = {}) {
  const tags = new Set(detainedSignal?.provisionalTags || []);

  const witherbloomTags = new Set([
    "lifeDeathExchange",
    "biology",
    "potion",
    "bog",
    "pest",
    "sacrificeEconomy",
    "lifeGainDrain"
  ]);

  for (const tag of tags) witherbloomTags.add(tag);
  for (const tag of overrideSet.addTags || []) witherbloomTags.add(tag);
  for (const tag of overrideSet.removeTags || []) witherbloomTags.delete(tag);

  const copyMode = overrideSet.copyMode || inferCopyMode(witherbloomTags);

  return {
    identity: WITHERBLOOM_IDENTITY.id,
    copyMode,
    tags: Array.from(witherbloomTags),
    uiCopy: buildWitherbloomCopy(copyMode, witherbloomTags),
    animationCue: buildAnimationCue(witherbloomTags),
    mazeSearchHints: buildMazeSearchHints(witherbloomTags),
    sourceSignal: detainedSignal
  };
}

/**
 * ConstraintField(candidate, constraints)
 *
 * Engine meaning:
 *   Apply hard boundaries so downstream copy, animation, or deck/search links do
 *   not drift outside the identity.
 *
 * Witherbloom translation:
 *   Let graveyard, tokens, and sacrifice appear only when tied back to biology,
 *   life movement, Pests, brewing, or bodies-as-resources.
 */
export function ConstraintField(candidate, constraints = {}) {
  const tags = new Set(candidate?.tags || []);
  const failures = [];
  const warnings = [];

  const requiredAny = constraints.requiredAny || [
    "lifeDeathExchange",
    "lifeGainDrain",
    "biology",
    "pest",
    "potion",
    "sacrificeEconomy",
    "small-bodies-matter"
  ];

  if (!requiredAny.some((tag) => tags.has(tag))) {
    failures.push("missing-witherbloom-specific-signal");
  }

  if (tags.has("graveyard") && !hasAny(tags, ["biology", "pest", "lifeDeathExchange", "sacrificeEconomy"])) {
    warnings.push("graveyard-present-but-not-witherbloom-framed");
  }

  if (tags.has("pureRamp") && !hasAny(tags, ["lifeGain", "biology", "bigBody", "pest"])) {
    warnings.push("ramp-may-read-as-generic-green");
  }

  if (tags.has("aristocrats") && !hasAny(tags, ["lifeGainDrain", "pest", "small-bodies-matter"])) {
    warnings.push("aristocrats-needs-life-or-pest-framing");
  }

  return {
    identity: WITHERBLOOM_IDENTITY.id,
    pass: failures.length === 0,
    failures,
    warnings,
    candidate,
    constraintsApplied: {
      requiredAny,
      avoid: WITHERBLOOM_IDENTITY.avoid
    }
  };
}

/**
 * AccretionEngine(events, options)
 *
 * Engine meaning:
 *   Accumulate low-level signals into a stable identity reading.
 *
 * Witherbloom translation:
 *   Track life-gain, life-loss, drain, death, sacrifice, Pest, Food, counters,
 *   recursion, and biology signals until the reading has a clear Witherbloom shape.
 */
export function AccretionEngine(events = [], options = {}) {
  const totals = {};
  const traces = [];

  for (const event of events) {
    const normalized = normalizeSignal(event);
    const tags = normalized.tags || [];

    for (const tag of tags) {
      const key = canonicalSignal(tag);
      const weight = SIGNAL_WEIGHTS[key] ?? 0.4;
      totals[key] = round((totals[key] || 0) + weight);
      traces.push({
        input: event,
        tag,
        canonical: key,
        weight
      });
    }
  }

  const score =
    (totals.lifeGain || 0) +
    (totals.drain || 0) +
    (totals.sacrifice || 0) +
    (totals.pest || 0) +
    (totals.biology || 0) +
    (totals.potion || 0) +
    (totals.tokenBodies || 0) * 0.75 +
    (totals.recursion || 0) * 0.45;

  const confidence =
    score >= (options.strongThreshold || 5.25)
      ? "strong"
      : score >= (options.moderateThreshold || 3.25)
        ? "moderate"
        : "light";

  const dominantSignals = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([signal, value]) => ({ signal, value }));

  return {
    identity: WITHERBLOOM_IDENTITY.id,
    confidence,
    score: round(score),
    dominantSignals,
    totals,
    traces,
    recommendedCopyMode: inferCopyMode(new Set(dominantSignals.map((x) => x.signal))),
    recommendedAnimationCue: buildAnimationCue(new Set(dominantSignals.map((x) => x.signal)))
  };
}

function normalizeSignal(signal) {
  if (!signal) return { label: "", tags: [] };
  if (typeof signal === "string") {
    return {
      label: signal,
      tags: signal
        .split(/[^a-zA-Z]+/)
        .map((x) => x.trim())
        .filter(Boolean)
        .map((x) => x[0].toLowerCase() + x.slice(1))
    };
  }
  return {
    ...signal,
    tags: Array.isArray(signal.tags) ? signal.tags : []
  };
}

function canonicalSignal(tag) {
  const t = String(tag).toLowerCase();
  if (["lifegain", "life-gain", "gainlife", "gain-life", "lifelink"].includes(t)) return "lifeGain";
  if (["drain", "bloodartist", "lifedrain", "life-loss"].includes(t)) return "drain";
  if (["sacrifice", "aristocrats", "outlet", "death"].includes(t)) return "sacrifice";
  if (["pest", "pests", "mascot", "small-bodies-matter"].includes(t)) return "pest";
  if (["food", "chef", "cook"].includes(t)) return "food";
  if (["counter", "counters", "+1/+1", "growth"].includes(t)) return "countersFromLife";
  if (["recursion", "graveyard", "return"].includes(t)) return "recursion";
  if (["token", "tokens", "body", "bodies"].includes(t)) return "tokenBodies";
  if (["biology", "essence", "organism", "ecosystem"].includes(t)) return "biology";
  if (["potion", "brew", "cauldron", "alchemy"].includes(t)) return "potion";
  if (["loyalty", "protect", "give-and-take"].includes(t)) return "loyalty";
  return tag;
}

function inferCopyMode(tags) {
  if (hasAny(tags, ["pest", "small-bodies-matter"])) return "pest-economy";
  if (hasAny(tags, ["lifeGain", "drain", "lifeGainDrain"])) return "life-into-death";
  if (hasAny(tags, ["sacrifice", "sacrificeEconomy", "aristocrats"])) return "body-ledger";
  if (hasAny(tags, ["potion", "cauldron", "brew"])) return "witchcraft-lab";
  if (hasAny(tags, ["biology", "ecosystem"])) return "field-biology";
  return "witherbloom-general";
}

function buildWitherbloomCopy(copyMode, tags) {
  const copy = {
    "pest-economy": "Small bodies are not filler here; they are the living currency of the bog.",
    "life-into-death": "This reading turns vitality into pressure: every gain asks what the opponent loses.",
    "body-ledger": "Creatures become entries in a living ledger: sacrifice, return, feed, repeat.",
    "witchcraft-lab": "This line belongs in the cauldron: herbs, essence, cost, cure, and harm in one brew.",
    "field-biology": "Witherbloom treats the battlefield as an ecosystem, not a clean moral map.",
    "witherbloom-general": "This is life and death as one exchange system: messy, loyal, hungry, and alive."
  };

  let result = copy[copyMode] || copy["witherbloom-general"];

  if (tags.has("graveyard")) {
    result += " Keep the graveyard framed as compost and return, not as generic undead horror.";
  }

  return result;
}

function buildAnimationCue(tags) {
  if (hasAny(tags, ["pest", "small-bodies-matter"])) return "pest-mote-swarm";
  if (hasAny(tags, ["lifeGain", "drain", "lifeGainDrain"])) return "drain-pulse";
  if (hasAny(tags, ["sacrifice", "sacrificeEconomy", "aristocrats"])) return "sacrifice-flicker";
  if (hasAny(tags, ["potion", "cauldron", "brew"])) return "cauldron-vapor";
  if (hasAny(tags, ["biology", "ecosystem"])) return "root-lattice";
  return "bog-breathing";
}

function buildMazeSearchHints(tags) {
  const hints = ["ci:bg"];
  if (hasAny(tags, ["pest", "small-bodies-matter"])) hints.push("(t:pest OR o:pest)");
  if (hasAny(tags, ["lifeGain", "drain", "lifeGainDrain"])) hints.push('(o:"gain life" OR o:"each opponent loses")');
  if (hasAny(tags, ["sacrifice", "sacrificeEconomy", "aristocrats"])) hints.push("(o:sacrifice OR o:dies)");
  if (hasAny(tags, ["potion", "cauldron", "brew"])) hints.push("(o:food OR o:cauldron OR o:brew)");
  if (hasAny(tags, ["countersFromLife", "growth"])) hints.push('(o:"+1/+1 counter" OR o:"whenever you gain life")');
  return hints.join(" ");
}

function hasAny(setOrArray, values) {
  const set = setOrArray instanceof Set ? setOrArray : new Set(setOrArray || []);
  return values.some((value) => set.has(value));
}

function round(value) {
  return Math.round(value * 100) / 100;
}

export default {
  identity: WITHERBLOOM_IDENTITY,
  Detain,
  Override,
  ConstraintField,
  AccretionEngine
};

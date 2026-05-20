/**
 * Vox Mana — Golgari Translation Layer
 * Schema: vox-mana-translation-layer-v1
 *
 * Purpose:
 * These functions adapt shared Vox Mana primitives into a Golgari-specific reading layer.
 * The names are intentionally stable so Azorius/Rakdos/Golgari/etc. can share the same
 * calling contract while each identity supplies a different semantic adapter.
 *
 * Golgari core axiom:
 *   "Nothing is wasted; endings are inventory."
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

export const GOLGARI_TRANSLATION_VERSION = "vox-mana-golgari-translation-v1";

export const GOLGARI_CORE = Object.freeze({
  identity: "golgari",
  axiom: "Nothing is wasted; endings are inventory.",
  primaryMotion: "decay-to-resource",
  coreTags: [
    "graveyard-as-resource",
    "recursion",
    "sacrifice",
    "rot-growth",
    "swarm",
    "attrition",
    "inheritance",
    "undercity"
  ],
  antiDrift: [
    "not-generic-zombies",
    "not-selesnya-harmony",
    "not-dimir-secrecy",
    "not-orzhov-debt",
    "not-simic-optimization",
    "not-rakdos-chaos"
  ]
});

const DEFAULT_WEIGHTS = Object.freeze({
  "graveyard-as-resource": 1.0,
  recursion: 0.96,
  sacrifice: 0.9,
  "rot-growth": 0.92,
  swarm: 0.78,
  attrition: 0.86,
  inheritance: 0.82,
  "plus-one-counters": 0.72,
  removal: 0.66,
  ramp: 0.55,
  lifegain: 0.42
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

function inferGolgariTags(signal) {
  const text = tagText(signal);
  const tags = [];

  if (/grave|cemetery|dredge|mill|loam|undergrowth|dead|corpse|tomb|lich/.test(text)) {
    tags.push("graveyard-as-resource");
  }
  if (/return|recur|raise|regrow|findbroker|meren|chant|from the graveyard/.test(text)) {
    tags.push("recursion");
  }
  if (/sacrifice|dies|death trigger|aristocrat|fodder/.test(text)) {
    tags.push("sacrifice");
  }
  if (/rot|mold|fungus|spore|saproling|sprout|germination|growth|compost/.test(text)) {
    tags.push("rot-growth");
  }
  if (/token|insect|swarm|saproling|many|wide/.test(text)) {
    tags.push("swarm");
  }
  if (/destroy|putrefy|decay|wound|trophy|removal|-x\/-x|-1\/-1/.test(text)) {
    tags.push("removal");
  }
  if (/counter|\+1\/\+1|scavenge|corpsejack|inheritance/.test(text)) {
    tags.push("plus-one-counters", "inheritance");
  }
  if (/drain|life|gain|lose life|survival/.test(text)) {
    tags.push("lifegain");
  }
  if (/land|ramp|mana|rot farm|loam|deathsprout/.test(text)) {
    tags.push("ramp");
  }
  if (/attrition|inevitable|repeat|engine|loop|again/.test(text)) {
    tags.push("attrition");
  }

  return unique([...(signal.tags || []), ...tags]);
}

function scoreSignal(signal) {
  const tags = inferGolgariTags(signal);
  const base = Number.isFinite(signal.weight) ? signal.weight : 1;
  const tagScore = tags.reduce((total, tag) => total + (DEFAULT_WEIGHTS[tag] || 0.1), 0);
  return Number((base + tagScore).toFixed(3));
}

/**
 * Detain()
 *
 * Shared primitive meaning:
 *   Hold a signal in place long enough for the identity layer to transform it.
 *
 * Golgari meaning:
 *   Bury the signal, slow it down, and decide whether it becomes compost, recursion,
 *   attrition pressure, or dead matter.
 *
 * Use when:
 *   - a UI panel should not immediately become a flashy action
 *   - a card/theme should be interpreted through lifecycle stages
 *   - a result needs to feel patient, subterranean, and inevitable
 *
 * @param {Signal|Signal[]|string|string[]} input
 * @param {Object} [options]
 * @returns {TranslationResult}
 */
export function Detain(input, options = {}) {
  const signals = normalizeSignals(input).map((signal, index) => {
    const tags = inferGolgariTags(signal);
    const stage =
      tags.includes("graveyard-as-resource") ? "buried-resource" :
      tags.includes("rot-growth") ? "composting" :
      tags.includes("sacrifice") ? "awaiting-conversion" :
      "held-in-soil";

    return {
      ...signal,
      id: signal.id || `golgari-detain-${index + 1}`,
      tags: unique([...tags, "golgari-detained", stage]),
      weight: scoreSignal(signal),
      golgariStage: stage
    };
  });

  return {
    identity: "golgari",
    functionName: "Detain",
    signals,
    tags: unique(signals.flatMap(s => s.tags)),
    notes: [
      "Golgari Detain does not freeze the signal; it buries it until it becomes useful.",
      "Use for slow reveals, delayed payoff panels, graveyard setup, and lifecycle interpretation."
    ],
    warnings: options.allowGenericDeath ? [] : [
      "Avoid reading this as generic death/horror. The held signal must become resource, inheritance, or ecology."
    ],
    meta: {
      version: GOLGARI_TRANSLATION_VERSION,
      axiom: GOLGARI_CORE.axiom,
      recommendedMotion: "vm-golgari-compost-bloom"
    }
  };
}

/**
 * Override()
 *
 * Shared primitive meaning:
 *   Replace a generic or conflicting read with the identity's canonical read.
 *
 * Golgari meaning:
 *   Convert vague "death", "nature", "value", or "growth" into the precise Golgari loop:
 *   death -> compost -> resource -> recurrence -> pressure.
 *
 * @param {Signal|Signal[]|string|string[]} input
 * @param {Object} [options]
 * @returns {TranslationResult}
 */
export function Override(input, options = {}) {
  const signals = normalizeSignals(input).map((signal, index) => {
    const tags = inferGolgariTags(signal);
    const text = tagText(signal);

    let overrideRead = "Convert the signal into a lifecycle economy.";
    if (/death|dead|grave|corpse|tomb|cemetery/.test(text)) {
      overrideRead = "Death is not endpoint; it is the inventory layer.";
    } else if (/growth|nature|life|green/.test(text)) {
      overrideRead = "Growth is fed by rot, scarcity, and what the surface world discards.";
    } else if (/power|black|ambition|control/.test(text)) {
      overrideRead = "Power is survival leverage, not abstract domination.";
    } else if (/token|swarm|many/.test(text)) {
      overrideRead = "Many small bodies become infrastructure, not decoration.";
    } else if (/counter|\+1\/\+1|scavenge/.test(text)) {
      overrideRead = "Strength is inherited from what died before.";
    }

    return {
      ...signal,
      id: signal.id || `golgari-override-${index + 1}`,
      tags: unique([...tags, "golgari-overridden"]),
      weight: scoreSignal(signal) + 0.35,
      overrideRead
    };
  });

  return {
    identity: "golgari",
    functionName: "Override",
    signals,
    tags: unique(signals.flatMap(s => s.tags)),
    notes: [
      "Override generic death/growth/value language into a Golgari lifecycle loop.",
      "Best output shape: death -> compost -> resource -> recurrence -> pressure."
    ],
    warnings: [
      "Do not substitute 'evil death magic' for Golgari. The important axis is usefulness after ending.",
      "Do not substitute Selesnya harmony. Golgari accepts rot, hierarchy, scarcity, and survival."
    ],
    meta: {
      version: GOLGARI_TRANSLATION_VERSION,
      axiom: GOLGARI_CORE.axiom,
      outputPattern: ["death", "compost", "resource", "recurrence", "pressure"],
      strict: Boolean(options.strict)
    }
  };
}

/**
 * ConstraintField()
 *
 * Shared primitive meaning:
 *   Apply boundaries so the generated read cannot drift out of identity.
 *
 * Golgari meaning:
 *   Keep the output anchored in black-green lifecycle materialism:
 *   graveyard, sacrifice, recursion, rot-growth, swarm, attrition, survival.
 *
 * @param {Object} context
 * @returns {TranslationResult & {allowed: string[], blocked: string[]}}
 */
export function ConstraintField(context = {}) {
  const signals = normalizeSignals(context.signals || []);
  const inferred = signals.map(signal => ({
    ...signal,
    tags: inferGolgariTags(signal),
    weight: scoreSignal(signal)
  }));

  const allowed = [
    "graveyard as resource",
    "death-to-growth conversion",
    "recursion and re-use",
    "sacrifice as metabolism",
    "swarm emergence",
    "attrition and inevitability",
    "undercity politics",
    "+1/+1 counter inheritance",
    "fungus, rot, insects, saprolings, liches, shamans, trolls, gorgons"
  ];

  const blocked = [
    "generic zombie horror with no resource loop",
    "pure Selesnya peace/harmony language",
    "pure Dimir secrecy/surveillance language",
    "pure Orzhov debt/contract language",
    "pure Simic lab optimization language",
    "pure Rakdos chaos/spectacle language",
    "clean pastoral nature with no decay",
    "death as nihilism instead of material continuation"
  ];

  const warnings = [];
  const joined = `${context.title || ""} ${context.text || ""} ${signals.map(tagText).join(" ")}`.toLowerCase();

  if (/harmony|peace|pure nature|community without/.test(joined)) {
    warnings.push("Possible Selesnya drift: add rot, scarcity, graveyard, or sacrifice pressure.");
  }
  if (/secret|spy|surveil|hidden knowledge/.test(joined) && !/grave|dead|rot|resource/.test(joined)) {
    warnings.push("Possible Dimir drift: make the graveyard a material resource, not only hidden information.");
  }
  if (/debt|contract|tax|tithe/.test(joined) && !/corpse|compost|growth/.test(joined)) {
    warnings.push("Possible Orzhov drift: convert obligation language into ecological inheritance.");
  }
  if (/chaos|spectacle|riot|thrill/.test(joined) && !/recursion|grave|attrition/.test(joined)) {
    warnings.push("Possible Rakdos drift: replace spectacle with attrition and lifecycle consequence.");
  }
  if (/zombie|death|grave/.test(joined) && !/resource|return|growth|compost|sacrifice|useful/.test(joined)) {
    warnings.push("Generic death detected: clarify how the death becomes useful.");
  }

  return {
    identity: "golgari",
    functionName: "ConstraintField",
    signals: inferred,
    tags: unique(inferred.flatMap(s => s.tags)),
    allowed,
    blocked,
    notes: [
      "Use this before rendering placement copy, lore panels, or Maze outbound labels.",
      "A valid Golgari read must show what the ending becomes useful for."
    ],
    warnings,
    meta: {
      version: GOLGARI_TRANSLATION_VERSION,
      axiom: GOLGARI_CORE.axiom,
      pass: warnings.length === 0
    }
  };
}

/**
 * AccretionEngine()
 *
 * Shared primitive meaning:
 *   Layer signals into a coherent narrative structure.
 *
 * Golgari meaning:
 *   Stack small signs of death, rot, sacrifice, recursion, and swarm behavior until
 *   the final read feels inevitable.
 *
 * @param {Signal|Signal[]|string|string[]} input
 * @param {Object} [options]
 * @returns {TranslationResult & {layers: Object[], reading: Object}}
 */
export function AccretionEngine(input, options = {}) {
  const signals = normalizeSignals(input).map(signal => ({
    ...signal,
    tags: inferGolgariTags(signal),
    weight: scoreSignal(signal)
  })).sort((a, b) => b.weight - a.weight);

  const layers = [
    {
      id: "soil",
      label: "Soil Layer",
      test: tag => ["ramp", "rot-growth"].includes(tag),
      read: "What supports survival below the obvious board state?"
    },
    {
      id: "graveyard",
      label: "Graveyard Layer",
      test: tag => ["graveyard-as-resource", "recursion"].includes(tag),
      read: "What becomes useful after it leaves the surface?"
    },
    {
      id: "sacrifice",
      label: "Sacrifice Layer",
      test: tag => ["sacrifice", "attrition"].includes(tag),
      read: "What can be spent without truly being wasted?"
    },
    {
      id: "inheritance",
      label: "Inheritance Layer",
      test: tag => ["inheritance", "plus-one-counters"].includes(tag),
      read: "What strength transfers from the dead to the living?"
    },
    {
      id: "swarm",
      label: "Swarm Layer",
      test: tag => ["swarm"].includes(tag),
      read: "Where do many small bodies become one large pressure?"
    }
  ].map(layer => {
    const matches = signals.filter(signal => (signal.tags || []).some(layer.test));
    return {
      ...layer,
      count: matches.length,
      weight: Number(matches.reduce((sum, signal) => sum + signal.weight, 0).toFixed(3)),
      signalIds: matches.map(signal => signal.id)
    };
  }).sort((a, b) => b.weight - a.weight);

  const dominantLayer = layers[0] || null;
  const reading = {
    headline: options.headline || "Golgari reads the ending as the next resource layer.",
    coreAxiom: GOLGARI_CORE.axiom,
    dominantLayer: dominantLayer ? dominantLayer.label : "No dominant layer",
    structure: [
      "Bury the weak signal.",
      "Identify what survives as material.",
      "Convert the material into recurrence, counters, tokens, mana, or removal.",
      "Apply pressure until the opponent runs out of clean answers."
    ],
    recommendedPanelOrder: layers.map(layer => layer.id),
    recommendedMotion: "vm-golgari-compost-bloom"
  };

  return {
    identity: "golgari",
    functionName: "AccretionEngine",
    signals,
    layers,
    reading,
    tags: unique(signals.flatMap(s => s.tags)),
    notes: [
      "Accretion should make the final Golgari read feel earned instead of instantly declared.",
      "Use layer weights to decide panel order, chip priority, and outbound Maze search grouping."
    ],
    warnings: layers.every(layer => layer.count === 0)
      ? ["No Golgari layer detected. Add graveyard, recursion, sacrifice, rot-growth, swarm, attrition, or inheritance signals."]
      : [],
    meta: {
      version: GOLGARI_TRANSLATION_VERSION,
      axiom: GOLGARI_CORE.axiom,
      signalCount: signals.length
    }
  };
}

export default {
  version: GOLGARI_TRANSLATION_VERSION,
  core: GOLGARI_CORE,
  Detain,
  Override,
  ConstraintField,
  AccretionEngine
};

# Quandrix Vox Mana Bundle

Generated: 2026-05-18

This bundle contains a repo-friendly Quandrix identity/data pass matching the previous Rakdos/Golgari/Gruul artifact shape.

## Files

| File | Purpose |
|---|---|
| `quandrix-structural-matrix.csv` | Flat card matrix with 56 card anchors and source URLs. |
| `quandrix-structural-matrix.json` | Structured version of the matrix with schema metadata. |
| `quandrix-animation-spec.md` | Human-readable motion/visual spec. |
| `quandrix-animation-spec.json` | Machine-readable animation spec. |
| `quandrix-translation-layer.js` | Reusable JS functions: `Detain()`, `Override()`, `ConstraintField()`, `AccretionEngine()`. |
| `quandrix-narrative-taxonomy.md` | Human-readable narrative taxonomy. |
| `quandrix-narrative-taxonomy.json` | Machine-readable taxonomy. |
| `SOURCES.md` | Grounding/source notes. |
| `manifest.json` | Bundle manifest. |

## Core Axiom

> Reality is an equation that can be grown, copied, doubled, and proven by scale.

## Design Notes

Quandrix is separated into:

- `current-school-core` — current Secrets of Strixhaven Quandrix cards where confidently identified
- `college-core` — original Strixhaven Quandrix school cards
- `commander-core` — Quandrix legends and official Commander identity cards
- `mechanic-core` — learn, magecraft, Fractal, X-spell, counter, and land-threshold cards
- `commander-structural-anchor` — Quantum Quandrix deck support cards
- `simic-structural-anchor` — older blue-green cards that support the Quandrix read without replacing it

The point is to avoid collapsing Quandrix into generic Simic. A card should support the reading through math, variables, Fractals, copies, counters, land thresholds, X-scaling, or theory/substance tension.

## Suggested Repo Locations

```text
data/identity-matrices/quandrix-structural-matrix.json
public/data/identity-matrices/quandrix-structural-matrix.csv
docs/architecture/colors/quandrix/quandrix-animation-spec.md
docs/architecture/colors/quandrix/quandrix-narrative-taxonomy.md
assets/js/identity-translators/quandrix-translation-layer.js
```

## Quick Integration Thought

A placement card can consume the JSON matrix and translation layer like this:

```js
import { ConstraintField, Override, AccretionEngine } from "./identity-translators/quandrix-translation-layer.js";

const constrained = ConstraintField(rawPlacementSignals);
const proofRead = Override(constrained.signals);
const scaled = AccretionEngine(proofRead.signals, { baseScale: 1 });
```

Use the output tags to decide whether the UI should emphasize:

- Fractal/token materialization
- counter accretion
- copy/replication
- land threshold
- X-scaling
- theory/substance tension

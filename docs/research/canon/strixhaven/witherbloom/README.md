# Witherbloom Vox Mana Bundle

Generated: 2026-05-18

This bundle contains a repo-friendly Witherbloom identity package matching the same format as the Rakdos, Golgari, Gruul, Quandrix, and Silverquill bundles.

## Files

| File | Purpose |
|---|---|
| `witherbloom-structural-matrix.csv` | Flat card matrix with 56 card anchors and source links |
| `witherbloom-structural-matrix.json` | Structured matrix version for scripts/build steps |
| `witherbloom-animation-spec.md` | Human-readable animation and UI behavior spec |
| `witherbloom-animation-spec.json` | Machine-readable animation spec |
| `witherbloom-translation-layer.js` | Reusable engine primitives: `Detain()`, `Override()`, `ConstraintField()`, `AccretionEngine()` |
| `witherbloom-narrative-taxonomy.md` | Human-readable narrative taxonomy |
| `witherbloom-narrative-taxonomy.json` | Machine-readable narrative taxonomy |
| `SOURCES.md` | Source list and grounding notes |
| `manifest.json` | Bundle manifest |

## Identity Summary

Witherbloom is Black-Green Strixhaven biology and witchcraft.

Core axiom:

> Life and death are exchange rates inside one living system.

Do not flatten Witherbloom into generic Golgari recursion. This bundle intentionally separates:
- current-school-core
- current-commander-core
- college-core
- lesson-core
- commander-core
- commander structural anchors
- broader structural anchors

## Canonical Signals

- life gain
- opponent drain
- Pest tokens
- sacrifice
- Food and cauldron/brewing
- death as conversion
- graveyard as compost
- counters or bodies from life-total movement
- field biology / essence studies
- loyalty and give-and-take

## Integration Suggestions

1. Load `witherbloom-structural-matrix.json` as the identity/card anchor layer.
2. Use `witherbloom-narrative-taxonomy.json` for placement panel copy, Maze link labels, and dossier flavor.
3. Use `witherbloom-animation-spec.json` for theme tokens and animation states.
4. Import `witherbloom-translation-layer.js` wherever placement output needs to be constrained into Witherbloom language.
5. Keep this separate from generic Golgari identity data. Witherbloom can inherit black-green structure, but it should not be visually or narratively identical to Golgari.

# Golgari Vox Mana Bundle

Generated artifact bundle for Golgari identity support.

## Included files

| File | Purpose |
|---|---|
| `golgari-structural-matrix.csv` | Review-friendly full matrix with 56 card anchors |
| `golgari-structural-matrix.json` | Source-of-truth structured matrix for repo ingestion |
| `golgari-animation-spec.md` | Human-readable Golgari animation and UI motion spec |
| `golgari-animation-spec.json` | Machine-readable animation token/spec summary |
| `golgari-translation-layer.js` | JS translation functions: `Detain()`, `Override()`, `ConstraintField()`, `AccretionEngine()` |
| `golgari-narrative-taxonomy.md` | Human-readable narrative taxonomy |
| `golgari-narrative-taxonomy.json` | Machine-readable taxonomy |
| `SOURCES.md` | Source notes and integration guardrails |

## Core axiom

> Nothing is wasted; endings are inventory.

## Intended repo use

- Put matrix JSON under a data or research folder.
- Keep CSV as QA/review artifact.
- Use animation JSON/MD for design system implementation.
- Use translation layer JS as a starting adapter, then normalize to your actual project module style.
- Use taxonomy JSON to feed placement panels, dossier copy blocks, and Maze search families.

## Integration guardrail

Do not flatten Golgari into generic death, zombies, or slime. The important structure is:

```txt
loss -> burial -> conversion -> recurrence -> pressure
```

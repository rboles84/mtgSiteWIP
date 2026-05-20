# Gruul Vox Mana Bundle

Generated artifact bundle for Gruul identity support.

## Included files

| File | Purpose |
|---|---|
| `gruul-structural-matrix.csv` | Review-friendly full matrix with 56 card anchors |
| `gruul-structural-matrix.json` | Source-of-truth structured matrix for repo ingestion |
| `gruul-animation-spec.md` | Human-readable Gruul animation and UI motion spec |
| `gruul-animation-spec.json` | Machine-readable animation token/spec summary |
| `gruul-translation-layer.js` | JS translation functions: `Detain()`, `Override()`, `ConstraintField()`, `AccretionEngine()` |
| `gruul-narrative-taxonomy.md` | Human-readable narrative taxonomy |
| `gruul-narrative-taxonomy.json` | Machine-readable taxonomy |
| `SOURCES.md` | Source notes and integration guardrails |

## Core axiom

> The body knows before the law finishes speaking.

## Intended repo use

- Put matrix JSON under a data or research folder.
- Keep CSV as QA/review artifact.
- Use animation JSON/MD for design system implementation.
- Use translation layer JS as a starting adapter, then normalize to your actual project module style.
- Use taxonomy JSON to feed placement panels, dossier copy blocks, and Maze search families.

## Integration guardrail

Do not flatten Gruul into generic big creatures, barbarians, or fire.

```txt
impulse -> body -> terrain -> impact -> aftershock
```

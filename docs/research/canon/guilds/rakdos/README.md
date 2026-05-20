# Rakdos Vox Mana Bundle

Generated: 2026-05-18

## Files

- `rakdos-structural-matrix.csv` — spreadsheet-friendly matrix with 56 Rakdos card anchors.
- `rakdos-structural-matrix.json` — same matrix as structured JSON with metadata.
- `rakdos-animation-spec.md` — human-readable Rakdos motion and UI behavior spec.
- `rakdos-animation-spec.json` — machine-readable animation token/hook map.
- `rakdos-translation-layer.js` — starter implementation for `Detain()`, `Override()`, `ConstraintField()`, and `AccretionEngine()` using Rakdos-specific guardrails.
- `rakdos-narrative-taxonomy.md` — narrative taxonomy for placement, dossier, Maze, and deck-start flows.
- `manifest.json` — bundle manifest.

## Notes

The matrix uses `canonicality_tier` so you can separate:
- `guild-canonical` — strict Rakdos/Ravnica-facing cards, named guild cards, locations, leaders, tools.
- `mechanic-canonical` — mono-colored cards that carry Rakdos set mechanics such as spectacle or unleash.
- `black-red staple` / `black-red archetype anchor` — useful commander/deck-discovery anchors that are Rakdos-adjacent but not strict guild canon.

## Suggested Repo Placement

```text
docs/architecture/guilds/rakdos/animation-spec.md
docs/architecture/guilds/rakdos/narrative-taxonomy.md
data/guilds/rakdos/rakdos-structural-matrix.json
assets/js/identity/rakdos-translation-layer.js
```

## Validation Ideas

- Verify every `source_url` resolves to the expected card before treating the row as final.
- Keep mechanic-canonical mono-colored cards separate in UI labels so users do not think they are black-red commanders.
- Use `animation_hook` as a token, not a hard-coded CSS class, until the visual system stabilizes.

# VM-172 - Bant Post-Cleanup Source Path Reconciliation

## Status
Done

## Summary
Restore `docs/research/bant/` as the active Bant research packet path after the `bant_done/` staging drift, without reopening Bant evidence, lore, placement scoring, or runtime behavior.

## Scope
- Restore the active Bant packet files and `source-material/` path from `docs/research/bant_done/` when `docs/research/bant/` is absent.
- Preserve `docs/research/bant_done/` as staging/source-recovery material.
- Normalize stale Bant source-path/status wording only where it conflicts with the live `BANT` state.
- Rebuild generated artifacts only through `npm run build:factions` if authored source metadata changes.

## Acceptance
- `docs/research/bant/` exists and contains `README.md`, `bant-source-ledger.md`, `bant-evidence-ledger.md`, `bant-research-dossier.md`, `bant-reliability-audit.md`, `bant-manual-fill.md`, `bant-lore-source-packet.md`, and `source-material/`.
- Active Bant source references point to `docs/research/bant/`, not `docs/research/bant_done/`.
- `BANT` remains live and `WUG` remains metadata-only.
- Faction and placement model counts remain equal to the pre-VM-172 baseline.
- No Home preview, route, Maze, scoring, Hall prompt, schema, or runtime logic change is introduced.

## Notes
- This card does not delete or archive `docs/research/bant_done/`.
- This card does not add new Bant lore claims, named figures, source tiers, Commander claims, or mechanical interpretations.

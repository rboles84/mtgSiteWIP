ID: VM-136
Title: Archscry Precon Layer In Commander Deck Starts
Status: done
Type: Data / UX / Archscry
Area: Archscry, Commander Compass
Priority: high
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Add a real precon recommendation layer to the Archscry dossier by moving the curated precon catalog into Vox Mana's canonical data domain, validating it with source and generated schemas, building a runtime precon artifact, and rendering recommended precons above `Commander Deck Starts` inside the existing dossier panel.

## Acceptance Criteria

- Precon source data lives under `data/precons/` instead of `docs/research/`.
- A hand-authored source schema and generated runtime schema exist for the precon data flow.
- A committed generated precon catalog is produced from the canonical source and loaded through `APP_STATE`.
- The `commander-deck-starts` dossier panel renders `Recommended Precon Decks` before `Commander Deck Starts`, with `Commander Lanes` remaining below.
- Recommendations use exact-match and stretch-match color identity rules plus theme-aware ranking grounded in the active dossier view.
- Adjacent-fit view switches recompute the precon recommendations.
- Tests, visual baselines, docs, Kanban, and handoff are updated.

## Non-Goals

- No placement scoring changes.
- No saved-result schema or Supabase contract changes.
- No Maze handoff changes.
- No Strategium changes.
- No returning-user commander/precon fit-check flow from VM-015.
- No commerce, pricing, or purchase flow.

## Notes

- Keep the top-level Archscry dossier rail unchanged.
- Follow Vox Mana's raw-plus-generated data architecture and avoid direct runtime reads from research docs.

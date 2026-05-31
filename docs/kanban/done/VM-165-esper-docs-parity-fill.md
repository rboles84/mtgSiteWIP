# VM-165 - Esper Docs Parity Fill

ID: VM-165
Title: Esper Docs Parity Fill
Status: done
Type: Documentation / Architecture
Area: Esper, Shard Architecture Docs
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Bring Esper's two architecture docs up to the practical Bant-style parity layer while keeping Esper non-live.

## Scope

- Update `docs/architecture/colors/esper/identity.md`.
- Update `docs/architecture/colors/esper/metaphysics.md`.
- Use VM-163 promoted evidence and VM-164 source boundaries.
- Use Bant as document shape and caution reference only.

## Non-Goals

- Do not add `ESPER` as a live expression key, placement key, registry key, generated key, or raw-to-key target.
- Do not add runtime/generated `WUB`.
- Do not create `data/raw-factions/esper/`.
- Do not edit data, generated artifacts, schemas, Home, Maze, route files, runtime JS, or Supabase.
- Do not introduce new canon claims beyond VM-163 / VM-164 evidence language.

## Acceptance Criteria

- `identity.md` includes Commander expression, primary tension, pair-overlap sections, shard separators, strong signals, inhibitors, placement guidance, and non-runtime search seed shapes.
- `metaphysics.md` makes the primary tension explicit while preserving Vox Mana modeling / not MTG canon language.
- Manual-fill topics remain deferred gaps only.
- Source-note references use `docs/analysis/canon-inventory-three-color-reference-audit.md`.
- Changed paths are limited to the two Esper architecture docs plus AGENTS-required Kanban and handoff files.

## Closeout Notes

- Added Esper pair-overlap sections for Azorius, Dimir, and Orzhov from Esper's side only.
- Added lightweight shard separator sections for Bant, Grixis, Jund, and Naya without authoring positive doctrine for those shards.
- Added evidence-bound system mapping, Commander expression, primary tension, operator signals, inhibitors, placement guidance, and non-runtime search seed shapes.
- Updated metaphysics with the primary tension that perfectibility can drift into over-control.
- Kept Esper non-live, non-placement-eligible, and outside runtime/generated/raw JSON surfaces.

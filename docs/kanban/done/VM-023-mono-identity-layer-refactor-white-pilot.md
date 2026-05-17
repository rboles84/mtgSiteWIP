# VM-023 - Mono Identity Layer Refactor + White Pilot

ID: VM-023
Title: Mono Identity Layer Refactor + White Pilot
Status: done
Type: architecture / data / UX
Area: Archscry, placement, dossier rendering
Priority: high
Created: 2026-05-17

## Summary

Add a canonical identity-layer catalog so Vox Mana can treat mono colors as first-class expressions, widen placement and dossier contracts to carry layered identity metadata, and ship White as the first live mono pilot without breaking the existing guild and college result flow.

## Source

- `docs/kanban/backlog/VM-013-placement-domains-architecture-post-v1-faction-expansion.md`
- `C:\Users\obake\Downloads\adding mono colors work\COLORS_PLAN.md`
- 2026-05-17 Mono Identity Layer Refactor + White Pilot implementation plan

## Acceptance Criteria

- Add `data/identity-layers.json` and `data/identity-layers.schema.json` as the canonical mono-aware identity layer source.
- Keep generated placement artifacts and dossier runtime aligned to layered identity metadata.
- Preserve legacy compatibility fields such as `faction`, `guild`, `scores`, and `placement_result`.
- Treat `color_weights` as optional in Phase 0 and do not fabricate them when the scoring model cannot derive them accurately.
- Render dossier identity sections for core identity, secondary influence, expression, purity, and fit explanation.
- Ship White as an active mono expression with dossier copy, routing, commander guidance, and placement fixtures.
- Keep Maze return flow, route structure, and Scryfall request dedupe behavior intact.

## Notes

This card covers the structural refactor plus the White pilot only. Blue, Black, Red, and Green remain follow-up mono passes after the shared rails are in place.

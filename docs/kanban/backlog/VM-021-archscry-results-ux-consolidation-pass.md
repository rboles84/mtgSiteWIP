# VM-021 - Archscry Results UX Consolidation Pass

ID: VM-021
Title: Archscry Results UX Consolidation Pass
Status: backlog
Type: UX / reliability
Area: Archscry, Maze
Priority: high
Created: 2026-05-16

## Summary

Consolidate the Archscry result dossier into a clearer guided reading flow by prioritizing Primary Placement and Adjacent Fits, moving Commander Deck Starts ahead of Maze, keeping Maze navigation in the same tab, reducing duplicate Maze/Scryfall entry points, removing fragile Moxfield usage, using deterministic MTGDecks commander slugs where possible, and suppressing empty utility land shells.

## Source

- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md`
- `docs/handoffs/2026-05-15-0640-codex-archscry-result-narrative-ux-polish.md`
- `docs/kanban/done/VM-005-archscry-maze-ux-continuity-link-reliability.md`
- `docs/kanban/done/VM-020-route-architecture-normalization.md`

## Acceptance Criteria

- Primary Placement reads first in the dossier flow.
- Adjacent Fits appears directly beneath the primary read.
- Commander Deck Starts appears before Maze Discovery.
- Maze discovery links stay in the same tab and preserve reading continuity.
- Duplicate Maze and Scryfall entry points are reduced.
- Moxfield is removed or disabled from the active result experience.
- MTGDecks commander links use deterministic `/Commander/<slug>-commanders` paths where possible.
- Empty or incomplete utility land shells do not render.

## Notes

This is a scoped presenter and navigation pass only. Keep routing shape, scoring, and lore systems untouched.

# VM-092 - Homepage Compression + Ambient Signal Polish

ID: VM-092
Title: Homepage Compression + Ambient Signal Polish
Status: done
Type: Frontend / UX Polish
Area: Home Preview, Ambient Signal
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Polished `newIndex2.html` after the VM-090 split so the homepage feels sharper, less tool-like, and lighter to scan.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `newIndex2.html`

## Scope Completed

- Fixed the compact connection strip spacing/rendering by making each item a stacked micro-card.
- Made the homepage identity signal ambient rather than profile-specific.
- Changed homepage composite signal states to show component color layers only.
- Randomized the initial homepage signal identity while preserving reduced-motion behavior.
- Tightened area-card copy and reduced repeated homepage explanation.

## Non-Goals Preserved

- Did not modify `/basics/`.
- Did not reintroduce homepage Color Matrix, `vmRadar`, or picker controls.
- Did not modify root `index.html`, `newIndex.html`, shared CSS/JS, Archscry, Maze, or Apocrypha internals.

## Acceptance Notes

- Homepage connect strip no longer renders joined words.
- Homepage signal visible copy remains ambient/static while the chart cycles.
- Composite homepage signal states render two component datasets, not a third synthesis dataset.
- Homepage signal starts from a randomized existing identity and respects reduced motion.
- Static scans, route checks, browser smoke, and `npm.cmd test` passed.

## Handoff

- `docs/handoffs/2026-05-20-2254-codex-vm092-homepage-compression-ambient-signal-polish.md`

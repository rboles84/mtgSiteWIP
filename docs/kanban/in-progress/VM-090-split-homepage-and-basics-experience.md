# VM-090 - Split Homepage And Basics Experience

ID: VM-090
Title: Split Homepage And Basics Experience
Status: in-progress
Type: Frontend / Routing / Content Split
Area: Home Preview, Basics, Color Matrix
Priority: high
Created: 2026-05-20

## Summary

Split `newIndex2.html` into a focused landing page and move the full Magic Basics + Color Matrix experience to `/basics/`.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `newIndex2.html`

## Scope

- Keep the homepage hero promise, passive identity signal, CTAs, intent selector, compact system explanation, and atmosphere.
- Move Magic Basics tabs, Color Matrix, Mana Lens selector, and `vmRadar` behavior to `/basics/index.html`.
- Keep `assets/js/graph.js` as the local Chart.js runtime.
- Do not touch root `index.html`, `newIndex.html`, shared home CSS/JS, Archscry internals, Maze internals, or Apocrypha internals.

## Acceptance Criteria

- Homepage no longer contains the full Magic Basics, Color Matrix, lower Mana Lens selector, lower `vmRadar`, or full Library Preview grid.
- Homepage has no visible `#basics` link and no hero picker/dropdown controls.
- `/basics/` contains the moved Magic Basics and Color Matrix IDs/behavior.
- Homepage identity signal remains passive, automatic, and reduced-motion aware.
- `/basics/` asset paths work from the nested route.
- Static checks, browser smoke, route checks, and `npm.cmd test` pass.

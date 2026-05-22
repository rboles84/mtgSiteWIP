# VM-090 - Split Homepage And Basics Experience

ID: VM-090
Title: Split Homepage And Basics Experience
Status: done
Type: Frontend / Routing / Content Split
Area: Home Preview, Basics, Color Matrix
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Split `newIndex2.html` into a focused landing page and moved the full Magic Basics + Color Matrix experience to `/basics/`.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `newIndex2.html`

## Scope Completed

- Kept the homepage hero promise, passive identity signal, CTAs, intent selector, compact system explanation, and atmosphere.
- Moved Magic Basics tabs, Color Matrix, Mana Lens selector, and `vmRadar` behavior to `/basics/index.html`.
- Kept `assets/js/graph.js` as the local Chart.js runtime.
- Updated homepage nav/footer links so Basics routes to `/basics/` and Apocrypha replaces the old Library framing.
- Preserved route links for `/archscry/`, `/maze/`, and `/apocrypha/`.

## Acceptance Notes

- Homepage no longer contains the full Magic Basics, Color Matrix, lower Mana Lens selector, lower `vmRadar`, or full Library Preview grid.
- Homepage has no visible `#basics` link and no hero picker/dropdown controls.
- `/basics/` contains the moved Magic Basics and Color Matrix IDs/behavior.
- Homepage identity signal remains passive, automatic, and reduced-motion aware.
- `/basics/` asset paths work from the nested route.
- Static checks, browser smoke, route checks, and `npm.cmd test` passed.

## Not Reused

- `VM-078` was not reused because it already belongs to Archscry Dossier Identity Matrix Radar.

## Handoff

- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`

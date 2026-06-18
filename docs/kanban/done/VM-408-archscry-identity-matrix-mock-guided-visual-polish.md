# VM-408 - Archscry Identity Matrix Mock-Guided Visual Polish

ID: VM-408
Title: Archscry Identity Matrix Mock-Guided Visual Polish
Status: done
Type: Visual Polish / Implementation
Area: Archscry Identity Matrix, Shared Radar Utility
Priority: medium
Created: 2026-06-17
Completed: 2026-06-17
Owner: Codex
Related: VM-407, VM-364

## Summary

Polished the live Archscry Identity Matrix so its atmosphere, synthesis fill, glow, typography, and trait-row rhythm better follow the locked VM-407 mock while preserving the current balanced layout.

The layout remains locked: radar left, selected identity summary under the graph, Lore/Core copy above the right trait panel, trait rows on the right, and Strategium as a hover/focus popover.

## What Changed

- Added opt-in layered synthesis fill support to `assets/js/vm-radar.js`.
- Kept layered fill disabled by default and gated by both chart plugin registration and dataset flag.
- Opted only Archscry into layered fill from `assets/js/dossier-radar.js`.
- Tuned Archscry composite radar styling toward the mock with softer line/glow and smaller warm yellow/gold points.
- Preserved visible dashed component traces while the richer synthesis fill is enabled.
- Tightened Archscry matrix CSS for quieter surfaces, compact trait-row rhythm, and a lighter Strategium popover.
- Grouped trait-row pips and strength into a compact right-side readout wrapper.
- Extended non-UI regressions for Home opt-out, Archscry opt-in, dataset styling, component traces, compact rows, and popover behavior.

## Guardrails Preserved

- `assets/js/graph.js` was not edited.
- Radar score calculation, registry profile values, fallback profile logic, placement results, and axis order were not changed.
- Selected identity summary, Lore/Core copy, trait rows, and Strategium placement were not moved.
- Home visual behavior, preview data, radar options, and cycle/latch behavior were not changed.
- No broad card-wide pulse, page-wide wash, or background bloom was introduced.

## Tests Run

- `node --check assets/js/vm-radar.js`
- `node --check assets/js/dossier-radar.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run lint:js`

## Acceptance Notes

- Archscry now opts into the layered fill plugin and `layeredFill: true`.
- Home remains outside the layered fill path.
- The shared radar default still uses the existing fill behavior unless explicitly opted in.
- Component dashed overlays remain present.
- Composite border, point, hover, and glow styling are retained with layered fill enabled.
- Strategium remains a hidden popover rather than an inline row.

## Follow-Up

Owner manual QA should judge final subjective mock matching for atmosphere, glow intensity, and spacing.

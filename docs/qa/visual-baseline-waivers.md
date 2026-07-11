# Vox Mana Visual Baseline Waiver Ledger

Last updated: 2026-07-10
Related cards: VM-450, VM-462, VM-495, VM-499
Status: VM-499 owner acceptance recorded; Home and Archscry radar canvases are included in current local evidence

## Purpose

This ledger records the route-level visual regression state after owner-directed VM-495 release cleanup and VM-499 radar-evidence repair. VM-499 corrected the Home and Archscry harnesses so their production radar canvases remain visible, added deterministic chart assertions, received explicit owner acceptance, refreshed only those ignored baselines, and reran both compare commands.

## Baseline Rule

- Baseline-refresh commands require explicit owner acceptance of the current route visuals.
- A clean console contract does not make a route visually green; compare mode must also remain inside its pixel budget.
- Baseline PNGs remain under ignored `artifacts/`; they are local QA evidence and are not a remote CI hard gate.

## Current Route Status

| Route | Command | Result | Current Counts | Classification | Evidence | Next Action |
|---|---|---:|---|---|---|---|
| Home | `npm.cmd run test:visual:home` | Pass | mobile `0`, tablet `0`, desktop `0` within `300` budget | Accepted current baseline | VM-499 captures the production-initialized radar canvas and glow, verifies five axes/nodes plus polygon and chart-area pixels, and preserves the VM-495 lazy-Chart/SVG stabilization. | Keep compare coverage; refresh again only after another explicit visual acceptance. |
| Archscry | `npm.cmd run test:visual:archscry` | Pass | all 16 landing/dossier captures `0` within `400` budget | Accepted current baseline | VM-499 includes the production dossier radar in placement/view-all evidence, verifies gold synthesis points and component overlays, and preserves the VM-446 private deck-link suppression. | Keep compare coverage and the VM-446 reactivation gate. |
| Strategium | `npm.cmd run test:visual:strategium` | Pass | all four captures `0` within `400` budget | Accepted current baseline | VM-495 reviewed the current mobile landing and desktop console/library states. | Keep compare coverage. |
| Apocrypha | `npm.cmd run test:visual:apocrypha` | Pass | all three captures `0` within `400` budget | Accepted current baseline | VM-495 reviewed the current mobile hero and desktop reference-library states. | Keep compare coverage. |

## Artifact Roots

- Home: `artifacts/visual-regression/home/current/` and `artifacts/visual-regression/home/diff/`
- Archscry: `artifacts/visual-regression/archscry/current/` and `artifacts/visual-regression/archscry/diff/`
- Strategium: `artifacts/visual-regression/strategium/current/` and `artifacts/visual-regression/strategium/diff/`
- Apocrypha: `artifacts/visual-regression/apocrypha/current/` and `artifacts/visual-regression/apocrypha/diff/`

## Console Contracts

All four current visual harness console contracts recorded no console errors or page errors:

- `artifacts/visual-regression/home/current/console-current.json`
- `artifacts/visual-regression/archscry/current/console-current.json`
- `artifacts/visual-regression/strategium/current/console-current.json`
- `artifacts/visual-regression/apocrypha/current/console-current.json`

## Release Interpretation

VM-499 supersedes the Home/Archscry portion of VM-495 visual evidence: both radar canvases are now included in owner-accepted local baselines, both compare suites are green, and the console contracts remain clean. Strategium and Apocrypha retain their VM-495 baselines. Remote CI still excludes these suites because the large PNG artifacts are intentionally ignored; changing that storage policy requires a separate repository-size/CI decision.

## Follow-Up Notes

- VM-495 owner acceptance supersedes the VM-450/VM-462 pending-review state for the inspected current captures.
- VM-499 owner acceptance supersedes VM-495 Home/Archscry captures only; current evidence includes the production radar canvases and glows.
- Home visual capture must continue waiting for the real lazy Chart.js instance, stabilizing it after initialization, and freezing SVG SMIL effects before screenshotting.
- Archscry radar evidence must continue using the production renderer, datasets, point styling, and reduced-motion path; no test-only renderer or screenshot-only radar CSS is allowed.
- Archscry private deck-link visuals remain out of the accepted baseline until VM-446 live RLS proof succeeds and reactivation is separately authorized.

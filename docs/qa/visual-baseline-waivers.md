# Vox Mana Visual Baseline Waiver Ledger

Last updated: 2026-07-09
Related cards: VM-450, VM-462, VM-495
Status: VM-495 owner acceptance recorded; current local comparisons pass

## Purpose

This ledger records the route-level visual regression state after owner-directed VM-495 release cleanup. VM-495 inspected current desktop/mobile captures, accepted the accumulated copy/content/background changes, refreshed the ignored local baselines, and reran every compare command.

## Baseline Rule

- Baseline-refresh commands require explicit owner acceptance of the current route visuals.
- A clean console contract does not make a route visually green; compare mode must also remain inside its pixel budget.
- Baseline PNGs remain under ignored `artifacts/`; they are local QA evidence and are not a remote CI hard gate.

## Current Route Status

| Route | Command | Result | Current Counts | Classification | Evidence | Next Action |
|---|---|---:|---|---|---|---|
| Home | `npm.cmd run test:visual:home` | Pass | mobile `0`, tablet `0`, desktop `0` within `300` budget on two consecutive runs | Accepted current baseline | VM-495 reviewed desktop/mobile captures and stabilized the harness by waiting for lazy Chart.js readiness and freezing SVG SMIL animation time. | Keep compare coverage; refresh again only after another explicit visual acceptance. |
| Archscry | `npm.cmd run test:visual:archscry` | Pass | all 16 landing/dossier captures `0` within `400` budget | Accepted current baseline | VM-495 reviewed landing and dossier captures and confirmed the unproven private deck-link panel is absent. | Keep compare coverage and the VM-446 reactivation gate. |
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

VM-495 closes the carried stale-baseline waiver for the current workspace: all four compare suites are green against owner-accepted local baselines, and the console contracts remain clean. Remote CI still excludes these suites because the large PNG artifacts are intentionally ignored; changing that storage policy requires a separate repository-size/CI decision.

## Follow-Up Notes

- VM-495 owner acceptance supersedes the VM-450/VM-462 pending-review state for the inspected current captures.
- Home visual capture must continue waiting for the lazy Chart.js runtime and freezing SVG SMIL effects before screenshotting.
- Archscry private deck-link visuals remain out of the accepted baseline until VM-446 live RLS proof succeeds and reactivation is separately authorized.

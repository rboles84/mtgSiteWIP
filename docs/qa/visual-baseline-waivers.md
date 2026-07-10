# Vox Mana Visual Baseline Waiver Ledger

Last updated: 2026-07-03
Related cards: VM-450, VM-462
Status: current compare-only classification; continued waiver / owner decision pending

## Purpose

This ledger records the current route-level visual regression state after VM-440 through VM-462 readiness work. It is not a baseline refresh approval. Treat the compare failures below as release-readiness evidence that needs owner acceptance before any `test:visual:*:baseline` command is run.

## Baseline Rule

- Compare-only commands are allowed for release evidence.
- Baseline-refresh commands require explicit owner acceptance of the current route visuals.
- A clean console contract does not make a route visually green; it only rules out the page-crash class of failure.

## Current Route Status

| Route | Command | Result | Current Counts | Classification | Evidence | Next Action |
|---|---|---:|---|---|---|---|
| Home | `npm.cmd run test:visual:home` | Fail | mobile `248201`, tablet `371757`, desktop `212808` over `300` budget | Continued carried-forward stale drift | VM-424 first-visit positioning and VM-427/VM-450 sweeps already documented comparable Home drift. VM-462 reran compare-only checks without refreshing baselines. | Owner review current/diff PNGs, then either accept and refresh in a dedicated baseline card or keep waiver. |
| Archscry | `npm.cmd run test:visual:archscry` | Fail | landing-mobile `49853`, landing-desktop `98344`; dossier captures `480` through `11326` over `400` budget | Continued owner-review waiver needed | Dossier drift is in the known VM-391/VM-427 family, and landing drift remains large after boundary-copy repairs replaced older deck-start/staples/lands framing. VM-462 reran compare-only checks without refreshing baselines. | Owner should inspect landing current/diff before any baseline refresh. If accepted, refresh Archscry baseline under a dedicated card. |
| Strategium | `npm.cmd run test:visual:strategium` | Fail | landing-desktop `7786`, landing-mobile `2811`, console-pod-readiness `151432`, library-search `41432` over `400` budget | Continued carried-forward stale drift | VM-416 content pass and VM-427/VM-450 sweeps documented comparable Strategium compare failures. VM-462 reran compare-only checks without refreshing baselines. | Owner review current/diff PNGs, then accept/refresh or keep waiver. |
| Apocrypha | `npm.cmd run test:visual:apocrypha` | Fail | hero-desktop `16797`, hero-mobile `1267`, references-desktop `202461` over `400` budget | Continued carried-forward stale drift | VM-414 refreshed Apocrypha baseline, then VM-415 readability/background changes and VM-427/VM-450 sweeps documented comparable drift. VM-462 reran compare-only checks without refreshing baselines. | Owner review current/diff PNGs, then accept/refresh or keep waiver. |

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

These results are acceptable only as documented visual waivers for a clearly scoped public static beta. They are not acceptable as polished-release visual proof because no route is green against its current baseline. CI should continue excluding visual compares until an owner-approved baseline refresh or route-specific visual repair pass makes the visual suite meaningful again.

VM-462 interpretation: no owner acceptance was provided during the pass, so the route state is closed as continued waiver / owner decision pending. No baseline refresh command was run.

## Follow-Up Notes

- Do not refresh any route baseline from VM-450 evidence alone.
- Do not refresh any route baseline from VM-462 evidence alone.
- Archscry needs the most direct owner review because its landing captures are now materially different from the prior release-sweep classification.
- VM-455 repaired the Home Identity Signal subtitle copy from the stale "colors, guilds, and colleges" scope frame to the current live identity-field wording. This was a copy-only fix, not a baseline refresh.

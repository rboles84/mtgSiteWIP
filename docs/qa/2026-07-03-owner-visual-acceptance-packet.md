# Owner Visual Acceptance Packet

Date: 2026-07-03
Related card: VM-462
Status: Continued waiver / owner decision pending

## Rule

Only compare-only visual commands were run. No `test:visual:*:baseline` command was run, because the owner has not accepted the current route visuals.

## Current Results

| Route | Command | Result | Counts | Decision |
|---|---|---:|---|---|
| Home | `npm.cmd run test:visual:home` | Expected fail | mobile `248201`, tablet `371757`, desktop `212808` over `300` | Continued waiver; owner decision pending |
| Archscry | `npm.cmd run test:visual:archscry` | Expected fail | landing-mobile `49853`, landing-desktop `98344`; dossier captures `480` to `11326` over `400` | Continued waiver; owner decision pending |
| Strategium | `npm.cmd run test:visual:strategium` | Expected fail | landing-desktop `7786`, landing-mobile `2811`, console-pod-readiness `151432`, library-search `41432` over `400` | Continued waiver; owner decision pending |
| Apocrypha | `npm.cmd run test:visual:apocrypha` | Expected fail | hero-desktop `16797`, hero-mobile `1267`, references-desktop `202461` over `400` | Continued waiver; owner decision pending |

## Artifact Roots

- Home: `artifacts/visual-regression/home/current/` and `artifacts/visual-regression/home/diff/`
- Archscry: `artifacts/visual-regression/archscry/current/` and `artifacts/visual-regression/archscry/diff/`
- Strategium: `artifacts/visual-regression/strategium/current/` and `artifacts/visual-regression/strategium/diff/`
- Apocrypha: `artifacts/visual-regression/apocrypha/current/` and `artifacts/visual-regression/apocrypha/diff/`

## Interpretation

The current route visuals remain reviewable but not accepted as green visual baselines. Continue non-visual readiness work until the owner either accepts current visuals for a dedicated baseline-refresh card or requests route-specific repairs.

# Mobile And Cross-Browser Readiness Scorecard

Date: 2026-07-03
Related card: VM-463
Status: Passed available-browser route/width matrix; no blocker cards opened

## Environment

Available local browser executable:

- Microsoft Edge: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`

Not available in this workspace:

- Chrome executable
- Firefox executable
- Safari/iOS/Android browsers

The matrix used a local static server and Microsoft Edge headless through the same browser family used by the repo visual and browser-smoke harnesses.

## Matrix

Routes tested:

- Home
- Archscry
- Maze
- Strategium
- Apocrypha
- Privacy
- Terms

Widths tested:

- `320`
- `375`
- `390`
- `412`
- `768`

Checks per route/width:

- `main` visible
- route-specific contract present
- no detected horizontal overflow
- no unfiltered browser/page errors

Result: 35 pass, 0 warn, 0 fail.

## Route Evidence

| Route | 320 | 375 | 390 | 412 | 768 | Notes |
|---|---:|---:|---:|---:|---:|---|
| Home | Pass | Pass | Pass | Pass | Pass | Hero route contract and `Not a deckbuilder` boundary present. |
| Archscry | Pass | Pass | Pass | Pass | Pass | Start quick-flow action present; deck-link surface absent. |
| Maze | Pass | Pass | Pass | Pass | Pass | Search input and search button present. |
| Strategium | Pass | Pass | Pass | Pass | Pass | Console tabs present. |
| Apocrypha | Pass | Pass | Pass | Pass | Pass | Source shelf/details structures present. |
| Privacy | Pass | Pass | Pass | Pass | Pass | Legal content loads with route heading. |
| Terms | Pass | Pass | Pass | Pass | Pass | Legal content loads with route heading. |

## Follow-Up Cards

None opened. No P0/P1 mobile or available-browser blockers were found in this pass.

## Limits

This does not prove Safari, iOS, Android, or Firefox behavior. It also does not replace owner visual acceptance, because the visual baselines remain waived separately.

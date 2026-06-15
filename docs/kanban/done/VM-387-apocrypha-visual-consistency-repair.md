# VM-387 - Apocrypha Visual Consistency Repair

Status: Done
Owner: Codex
Created: 2026-06-14
Completed: 2026-06-14

## Summary

Repaired Apocrypha's lower-page visual drift so lower archive panels use the rounded glass system established by the Apocrypha hero without changing content, routing, data, lore, placement behavior, generated artifacts, dependencies, or shared CSS.

## Scope Completed

- Confirmed VM-387 was unused before creating the card.
- Edited runtime styling only in `assets/css/apocrypha.css`.
- Added route-local Apocrypha radius/surface tokens for major and nested panels.
- Applied the established Apocrypha hero glass treatment to lower major panels.
- Converted reference and redaction nested blocks into subtle rounded nested surfaces.
- Added a manual QA check for lower Apocrypha rounded/glass surfaces.
- Preserved Apocrypha's archive/hero surface language from VM-134 rather than forcing Maze or Strategium no-blur glass behavior onto the route.

## Acceptance Notes

- `.apoc-guide-card`, `.apoc-library-group`, `.apoc-use-card`, and `.apoc-vault-card` now compute to `24px` border radius with Apocrypha glass, border, shadow, blur/saturate, and hidden overflow where internal backgrounds can bleed.
- `.apoc-reference-card` and `.apoc-redaction-grid > div` now compute to `18px` desktop nested radius and `16px` mobile nested radius with low-alpha dark nested surfaces.
- No persistent global opacity was added to text-bearing containers; non-`1` opacity observed in probes came from the existing reveal animation before sections entered view.
- Home, Archscry, Maze, and Strategium runtime files were not changed.

## Testing

- `git diff --check` - PASS; line-ending normalization warnings only.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `npm.cmd run test:visual:home` - FAIL against existing baseline; Home files were untouched. Mismatches: mobile 59348, tablet 101009, desktop 132475.
- `npm.cmd run test:visual:archscry` - FAIL against existing baseline; Archscry files were untouched. Landing captures were 0 mismatch; dossier captures exceeded budget.
- `npm.cmd run test:visual:strategium` - FAIL against existing baseline; Strategium files were untouched. Mismatches: landing-desktop 174876, landing-mobile 66215, console-pod-readiness 185089, library-search 153206.
- `npm.cmd run test:visual:apocrypha` - Initial expected FAIL after visual repair; reviewed Apocrypha diff before refresh.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS; refreshed ignored local Apocrypha baseline after review.
- `npm.cmd run test:visual:apocrypha` - PASS after refresh; all captures 0 mismatches.
- Manual browser QA on `http://127.0.0.1:4177/` for Home, Archscry, Maze, Apocrypha, and Strategium at desktop, tablet-ish, and mobile widths. Apocrypha, Archscry, Maze, and Strategium reported no horizontal overflow; Home reported a pre-existing mobile/tablet overflow signal from existing Home/menu/background behavior and was left untouched.

## Follow-Up

- Create a separate Home/mobile topbar or background overflow repair if that pre-existing overflow becomes in-scope.
- Refresh Home, Archscry dossier, and Strategium visual baselines only under their own reviewed cards; VM-387 intentionally refreshed only the Apocrypha local baseline.

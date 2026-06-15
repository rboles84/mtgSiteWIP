# VM-389 - V1 Home Identity Signal Promotion

Status: Done
Owner: Codex
Created: 2026-06-14
Closed: 2026-06-14

## Summary

Promoted every v1 live placement identity into the Home Identity Signal while keeping the change scoped to the Home preview registry and Home renderer only.

## Problem

Archscry and placement supported 37 live identities, but the Home Identity Signal still exposed only the old 20-entry preview set. That left 17 v1-visible identities absent from the main-page identity signal.

## Promoted Into Home

`BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, `JESKAI`, `YORE`, `GLINT`, `DUNE`, `INK`, `WITCH`, `COLORLESS`, `WUBRG`.

## Scope Completed

- Promoted all 37 live placement identities into the Home Identity Signal only.
- Updated Home preview metadata in `data/identity-layers.json`.
- Hardened `assets/js/home.js` for `COLORLESS`, four-color identities, and `WUBRG` presentation.
- Updated tests and docs that asserted the old 20-entry Home preview behavior.
- Preserved the public-surface boundary: no public routes, lowercase aliases, Maze behavior, directory links, schema/API changes, generated-data hand edits, or placement-model behavior changes.

## Branch Policy Result

The 3 commits behind `origin/main` were inspected:

- `2cae196 Add Scryfall discovery and Archscry dossier polish (#11)`
- `8bc931c Add proposed modern homepage UI mock`
- `efb44c4 Remove proposed UI mock from main`

The add/remove mock pair nets out. The older app import is not compatible with the current release branch as a blind merge target and would remove large portions of current app/data/docs. No old-main changes were preserved into VM-389.

## Release Hygiene Decisions

- VM-387/VM-388 dirty work remains part of release closeout and was not altered by VM-389.
- The two untracked decomposition HTML files remain under `docs/research/` as design-archive prototype candidates only; VM-389 added no runtime imports, links, route exposure, or release dependency for them.
- No staging, commit, push, or tag was performed.

## Remaining V1 Release Blockers / Waivers Needed

- `npm.cmd run test:visual:home` still fails current budgets: mobile `59375`, tablet `101005`, desktop `132490` mismatched pixels against budget `300`.
- VM-387's known Archscry and Strategium visual failures remain unresolved and were not rerun in VM-389.
- Prior VM-365 Lighthouse Home result remains Performance `86` against required `90`; VM-389 did not rerun Lighthouse because the script rewrites tracked `docs/audits/lighthouse-home.html`.
- VM-154 Home horizontal overflow remains unresolved; the VM-389 browser probe re-observed overflow with `scrollWidth: 903` and `clientWidth: 785`.

## Acceptance Results

- 37 placement identities remain live.
- 37 Home Identity Signal identities render from the registry.
- `preview_order` is contiguous `0-36`.
- No placement-eligible v1 identity remains excluded from Home preview visibility.
- `COLORLESS` renders as a valid neutral Profile signal with text `Profile: Colorless` and aria label `Colorless profile dataset`.
- WUBRG renders as a five-component overlay with spread glow stops and aria label `Five-Color / WUBRG overlay dataset`.
- No active VM-389 test/doc target still asserts the old 20-entry Home preview behavior.

## Tests Run

- `node --check assets/js/home.js` - PASS.
- `node --check assets/js/quick-reading-tests.js` - PASS.
- `node --check research/archscry-dossier-followup-tests.js` - PASS.
- `node --check scripts/frontend-smoke.mjs` - PASS.
- Targeted VM-389 count/order probe - PASS, 37 preview identities and contiguous `0-36`.
- `node assets/js/quick-reading-tests.js` - PASS, 37 factions and 37 golden paths.
- `node research/archscry-dossier-followup-tests.js` - PASS.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd run test:parser` - PASS, 115 parser cases.
- `npm.cmd run test:placement` - PASS.
- `npm.cmd run dossier:audit` - PASS, 0 failures and 113 warnings.
- `npm.cmd run test:presentation-snapshots` - PASS, 16 fixed cases.
- `git diff --check` - PASS with line-ending warnings only.
- `npm.cmd run test:visual:home` - FAIL, existing Home visual baseline/overflow blocker remains.
- Puppeteer/Chrome Home runtime probe - PASS for Colorless and WUBRG signal rendering; re-observed Home overflow.

## Not Touched

- Public routes.
- Lowercase aliases.
- Maze behavior.
- Directory links.
- Schema/API surfaces.
- Generated placement output, including `data/placement-model.json`.
- Raw lore, Commander facts, claim ledgers, source ledgers, or generated faction output.
- VM-387/VM-388 runtime changes.
- Git staging, commits, pushes, or tags.

## Follow-Up Recommendations

- Resolve or explicitly waive VM-154 Home overflow before declaring v1 production-ready.
- Resolve or explicitly waive Home, Archscry, and Strategium visual baseline failures before main promotion.
- Resolve or explicitly waive Lighthouse Home Performance `86` vs `90`.
- Classify the two decomposition HTML prototypes during final release cleanup if they should become committed design archive material.

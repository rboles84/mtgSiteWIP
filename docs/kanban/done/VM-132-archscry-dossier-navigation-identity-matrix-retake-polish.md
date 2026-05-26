# VM-132 - Archscry Dossier Navigation, Identity Matrix, And Retake Polish

## Status

Complete

## Owner

Codex

## Requested

Implement the approved Archscry dossier UX follow-up so the live placement result reads as a guided Commander onboarding console, with clearer Start Here flow, safer retake access, cleaner Identity Matrix diagnostics, and unclipped card previews.

## Completed

- Reordered the dossier panel navigation so `Start Here` is second while preserving existing panel IDs and URL state.
- Added focus-mode utility actions for `Begin Again` and contextual `Back to Primary Reading`.
- Added a shared retake confirmation guard.
- Removed redundant Identity Matrix tier/technical diagnostics and added a passive faction signal companion panel.
- Reduced Layered Identity to three cards and folded color-focus messaging into Expression.
- Renamed `Reading Omens` to `Signals From Your Answers`.
- Renamed `Playstyle Archetypes` to `Commander Lanes` and filtered weak/non-Commander entries.
- Added unclipped desktop hover previews for starter and mana-base card art.

## Constraints Preserved

- No placement scoring, saved-result schema, auth, taxonomy schema, or lore-source changes.
- Preserved card-art IDs, dossier panel IDs, Maze return contracts, radar lifecycle, and local-file boot behavior.
- Did not reintroduce `data-bg-clean="true"` on `/archscry/`.

## Verification

- `node --check assets/js/index.js`
- `node --check assets/js/dossier-radar.js`
- `node --check assets/js/commander-dossier.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check scripts/visual-regression-archscry.mjs`
- `node --check research/run-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`
- Browser spot check on `http://127.0.0.1:62659/archscry/`


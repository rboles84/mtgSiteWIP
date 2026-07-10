# Codex Handoff - VM-448 Critical Browser E2E Smoke

## Agent Name

Codex

## Task Requested

Continue the VM-429 Sections 11/12/14 readiness queue by adding the VM-448 critical browser smoke for Home, Archscry, Maze, Reading Finds, and the Archscry/Maze return loop.

## Files Reviewed

- `C:\Users\obake\.codex\attachments\8f9dd8ab-db18-4428-90e7-26d3911a5407\pasted-text-1.txt`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-1421-codex-vm447-minimal-ci.md`
- `docs/handoffs/2026-06-29-0013-codex-vm426-reading-finds.md`
- `docs/qa/vox-mana-test-plan.md`
- `package.json`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-home.mjs`
- `scripts/visual-regression-archscry.mjs`
- `archscry/index.html`
- `maze/index.html`
- `assets/js/index.js`
- `assets/js/archscry-presentation.js`
- `assets/js/shared.js`
- `assets/js/adaptive-placement.js`
- `research/research-init.js`
- `research/maze-scratchpad-store.js`
- `research/research-search.js`

## Files Changed

- `scripts/browser-smoke.mjs`
- `package.json`
- `assets/js/shared.js`
- `docs/qa/vox-mana-test-plan.md`
- `docs/kanban/done/VM-448-critical-browser-e2e-smoke.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-1429-codex-vm448-browser-smoke.md`

## What Changed

- Added `scripts/browser-smoke.mjs`.
- Added `npm.cmd run test:browser-smoke`.
- The smoke launches a local static server and headless Chromium/Edge through existing `chrome-launcher` and `puppeteer-core` dependencies.
- The smoke stubs Supabase and Scryfall browser requests so it does not depend on external network availability.
- The smoke runs desktop and mobile viewport journeys:
  - Home route loads and paints `#vmHeroManaChart`.
  - Archscry starts and completes the quick reading through visible answer buttons.
  - Archscry renders a non-empty dossier and writes a Maze handoff.
  - Maze opens from the dossier, renders deterministic mocked Scryfall results, and saves `Sol Ring` in Reading Finds.
  - Return to Dossier with Finds navigates back to Archscry and confirms the find appears in the Maze Discovery panel.
- Fixed restored placement-result normalization in `assets/js/shared.js` so `model_version`, `confidence_gap`, `evidence_trail`, and `stage_history` survive cache/profile normalization.
- Updated the QA plan command table and suggested commands with `test:browser-smoke`.

## Why It Changed

VM-430 identified that `test:frontend-smoke` was useful but static. VM-447 intentionally left browser/runtime coverage for a later ticket. VM-448 adds the first deterministic browser journey check for the core public loop most likely to regress.

The smoke exposed a real bug in the Reading Finds return loop: the saved find used reading ID `vox-mana-adaptive-placement-v1-quick-esper-73`, but the restored Archscry dossier rebuilt the reading ID as `2026-05-10-quick-esper-73` because `normalizePlacementResult` dropped `model_version`. Preserving the model/evidence fields keeps the same reading stable across Maze return and refresh.

## Decisions Made

- Used the repo's existing Puppeteer/ChromeLauncher pattern instead of adding Playwright in this ticket.
- Kept Scryfall and Supabase mocked inside the browser smoke for deterministic local runs.
- Did not add `test:browser-smoke` to the VM-447 GitHub Actions workflow yet; that is a future CI-hardening decision.
- Treated the reading-ID mismatch as a product bug, not a test waiver.

## Risks / Uncertainties

- The smoke is Chromium/Edge-only and does not replace Firefox/Safari/iOS/Android QA.
- The mocked Scryfall response proves Maze UI/storage behavior, not live Scryfall availability or query quality.
- The smoke is not yet proven in GitHub Actions or Pages deployment.
- VM-446 remains blocked on live Supabase credentials and VM-422 account/RLS proof is still not production-proven.

## Tests Run

- `node --check scripts\browser-smoke.mjs` - passed.
- `node --check assets\js\shared.js` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:maze-finds` - passed.
- `npm.cmd run test:placement` - passed, 37 factions and 37 golden paths.
- `npm.cmd run lint:js` - passed.
- `git diff --check` - passed with line-ending warnings only.

## Not Touched

- Live Supabase/RLS state, Supabase credentials, GitHub Actions workflow, visual baselines, Lighthouse, external Scryfall refresh/index data, generated faction/precon data, account deck-link behavior, git staging, committing, pushing, or branch changes.

## Follow-Up Recommendations

- Decide later whether `test:browser-smoke` should be added to CI after it has been proven stable on the target runner.
- Continue with the next readiness ticket, likely visual baseline acceptance/waiver cleanup or route metadata depending on the owner's priority.
- Keep VM-446 blocked until live Supabase credentials are available.

## Next Suggested Agent

Test Strategist / release-readiness pass for visual acceptance or route metadata.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-448-critical-browser-e2e-smoke.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/kanban/blocked/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/kanban/done/VM-447-minimal-ci-validation-gate.md`

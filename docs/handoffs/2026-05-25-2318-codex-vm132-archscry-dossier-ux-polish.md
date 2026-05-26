# Codex Handoff: VM-132 Archscry Dossier UX Polish

## Agent Name
Codex

## Task Requested
Implement the Archscry Dossier UX Follow-Up for navigation, Identity Matrix cleanup, safer retake behavior, Start Here prioritization, conservative Commander lane handling, and unclipped card previews.

## Files Reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-1719-codex-archscry-dossier-console.md`
- `docs/handoffs/2026-05-25-1838-codex-archscry-dossier-onboarding-trust-pass.md`
- `docs/handoffs/2026-05-25-1858-codex-vm129c-maze-atmosphere-convergence.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-131-archscry-dossier-onboarding-trust-visual-pass.md`
- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/dossier-radar.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `assets/css/archscry.css`
- `assets/css/components.css`
- `research/archscry-dossier-followup-tests.js`
- `scripts/visual-regression-archscry.mjs`

## Files Changed
- `assets/js/index.js`
- `assets/js/dossier-radar.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-132-archscry-dossier-navigation-identity-matrix-retake-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2318-codex-vm132-archscry-dossier-ux-polish.md`

## What Changed
- Reordered the live dossier panel map so `Start Here` follows `Placement`.
- Updated the snapshot next-step cue to point users to `Start Here` instead of `Why This Fits`.
- Added a persistent focus-mode utility action surface with `Begin Again` and adjacent-only `Back to Primary Reading`.
- Added shared `window.confirm()` protection inside `handleRetake()` so every retake entrypoint is guarded.
- Removed the standalone technical signal line from `The Shape of the Reading`.
- Removed radar tier words from the axis list, Chart.js drawing plugin, and tooltips.
- Replaced the dormant radar fallback slot with a visible companion faction signal panel below the radar.
- Reframed the radar explainer as an authored identity matrix rather than a raw mana-score translation.
- Reduced `Layered Identity` to `Core Identity`, `Secondary Influence`, and `Expression`.
- Folded color-focus language into `Expression` and removed the live `Pending color calibration` state.
- Upgraded expression visuals for mono-color and two-color faction readings without importing `newindex2.css`.
- Simplified `How This Plays` into `At the table` and `In play`.
- Renamed `Reading Omens` to `Signals From Your Answers` and changed item labels from `Omen` to `Signal`.
- Renamed `Playstyle Archetypes` to `Commander Lanes`.
- Filtered stale or 60-card-specific archetype entries instead of forcing weak Commander-facing lanes.
- Rewrote deck footing to separate budget/experience from first search lanes and avoid repeating color identity.
- Added a shared desktop card preview overlay for starter-card and mana-base rows.
- Increased segmented tab padding so labels no longer touch button borders.
- Updated VM-132 static/runtime checks and quick-reading expectations.
- Established and compared the refreshed Archscry visual baseline.

## Why It Changed
The dossier console was structurally improved by VM-130 and clarified by VM-131, but first-time Commander users still had to infer where to begin, retake recovery was hidden in a later panel, and several diagnostics read like internal tooling. VM-132 makes the result behave more like guided onboarding while preserving the live route, panel IDs, card-art hooks, saved-result behavior, Maze continuity, and placement data.

## Decisions Made
- `Focus mode` is treated as the existing `APP_STATE.dossierLayoutMode === "focus"` state, not a new mode.
- `Begin Again` stays universally reachable in focus mode but all retake paths now share a confirmation guard.
- `Commander Lanes` is the committed live section name for filtered faction archetypes.
- The radar remains the only quantitative chart; the new faction signal panel is decorative-explanatory only.
- Reduced-motion users get a static illuminated faction signal instead of an empty animation slot.
- Weak or stale archetype entries are suppressed rather than rewritten or replaced.

## Risks / Uncertainties
- The worktree already contained substantial uncommitted VM-129C through VM-131 changes. Those unrelated changes were left intact.
- The card preview overlay is covered by static/runtime checks and browser spot checks for loaded images, but in-app browser pointer-event simulation did not reliably trigger hover preview state.
- Commander lane filtering is intentionally conservative. Some faction archetype lists may become shorter until source data is refreshed with Commander-first alternatives.

## Tests Run
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
- Browser spot check at `http://127.0.0.1:62659/archscry/` for quick reading to dossier, panel order, focus/View All utility visibility, Start Here activation, faction signal rendering, no radar tier words, and card-art loading.

## Not Touched
- Placement scoring
- Adaptive placement logic
- Faction/lore source data
- Commander source data
- Saved-result schema
- Supabase/auth flow
- Maze parser/search/stash/modal behavior
- Archscry `data-bg-clean` shell decision from VM-129C
- Generated artifact data

## Follow-Up Recommendations
- Refresh Commander-first archetype source data where current faction archetypes are too 60-card-specific.
- Add a dedicated Playwright pointer-hover assertion if the test harness grows reliable desktop pointer simulation.
- Consider a later non-native retake confirmation UI if the project wants a branded confirm surface.

## Next Suggested Agent
Test Strategist or Documentation Steward if a deeper manual QA matrix or public-facing docs update is needed.

## Related Kanban Card, Docs, Or Plans
- `docs/kanban/done/VM-132-archscry-dossier-navigation-identity-matrix-retake-polish.md`
- `docs/handoffs/2026-05-25-1719-codex-archscry-dossier-console.md`
- `docs/handoffs/2026-05-25-1838-codex-archscry-dossier-onboarding-trust-pass.md`
- `docs/handoffs/2026-05-25-1858-codex-vm129c-maze-atmosphere-convergence.md`

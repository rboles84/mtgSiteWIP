# 2026-05-29 20:01 - Codex - VM-162 Mana Base Empty Tier Suppression

## Agent Name

Codex

## Task Requested

Respond to manual testing where, after VM-161 suppressed the fake `basics` card tile, the Budget mana-base tab could become completely empty. Determine whether the mana-base logic needed enhancement and implement the shared fix.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-1841-codex-vm161-mana-base-basics-placeholder-suppression.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-26-0021-codex-vm135-archscry-card-voices-identity-story.md`
- `docs/kanban/board.md`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-162-mana-base-empty-tier-suppression.md`
- `docs/handoffs/2026-05-29-2001-codex-vm162-mana-base-empty-tier-suppression.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added `hasRenderableLandTier()` to the Commander dossier land recommendation module.
- Updated Archscry mana-base rendering to build visible tabs from actual available tiers: Basics always renders, while Premium, Midrange, Budget, and Utility only render when the tier has cards.
- Normalized the active mana-base segment against the available segment list for the current faction, so a previously selected empty tier falls back to an available segment.
- Added regression coverage showing mono White Budget remains empty at the data level but is not renderable, while Bant Budget remains renderable.
- Updated manual QA docs to confirm empty non-Basics tiers are not offered as tabs.
- Created and closed the VM-162 Kanban card.

## Why It Changed

VM-161 correctly removed generic basic placeholders from land card tiers. That exposed a separate UX gap: some factions, especially mono White, have all Budget picks removed by cross-tier dedupe. Showing a selectable empty Budget tab is not useful. The fix preserves dedupe and hides empty tiers instead of reintroducing duplicate cards.

## Decisions Made

- Keep shorter deduped rows and empty data arrays as valid internal data.
- Hide empty non-Basics tiers at render time rather than filling them with duplicate or fallback cards.
- Keep Basics always visible because it contains guidance copy, not card slots.

## Risks / Uncertainties

- Manual browser QA should confirm the exact White primary path now omits Budget rather than showing a blank panel.
- If product later wants every tier to show cards, that should be a data-curation or fallback-card card, not a reversal of this empty-tier guard.

## Tests Run

- `node --check assets/js/index.js` - passed.
- `node --check assets/js/commander-dossier.js` - passed.
- Data check through `buildCommanderLandRecommendations` and `hasRenderableLandTier` - White Budget not renderable, Basics renderable, Bant Budget renderable.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd run test:placement` - passed, `21 factions, 21 golden paths`.
- `npm.cmd test` - passed.
- `git diff --check` - passed with line-ending warnings only.

## Not Touched

- Placement scoring.
- Bant identity/source/generated faction data.
- Generated faction artifacts.
- Route CSS.
- Maze controller behavior.
- Home preview behavior.
- Supabase behavior.

## Follow-Up Recommendations

- Browser-check White primary Mana Base Starting Map and confirm Budget is omitted when empty.
- Consider a future land-data curation pass if every faction should have a fuller unique Budget lane.

## Next Suggested Agent

Test Strategist for a browser/manual verification pass on White primary and Bant adjacent mana-base panels.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-162-mana-base-empty-tier-suppression.md`
- `docs/kanban/done/VM-161-mana-base-basics-placeholder-suppression.md`
- `docs/handoffs/2026-05-29-1841-codex-vm161-mana-base-basics-placeholder-suppression.md`
- `docs/reference/manual-test-cases.md`

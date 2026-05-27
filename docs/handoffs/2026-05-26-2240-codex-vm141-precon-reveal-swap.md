# VM-141 Precon Reveal Swap Handoff

## Agent Name

Codex

## Task Requested

Implement VM-141 by adding an in-panel control to Archscry's `Recommended Precon Decks` section so users can view recommendations beyond the first four without adding Apocrypha browsing, changing recommendation ranking, or changing source data.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2220-codex-vm140-premium-precon-section.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-140-premium-recommended-precon-decks-section.md`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/css/archscry.css`
- `research/precon-artifact-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/css/archscry.css`
- `research/precon-artifact-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-141-expand-remaining-precon-recommendations-in-archscry.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2240-codex-vm141-precon-reveal-swap.md`

## What Changed

- Extended `selectPreconPreviewRecommendations` so it returns both `visible` and `remaining` recommendation arrays.
- Replaced the passive overflow note with a `Display other [N]` button.
- Rendered the first-four grid and remaining-recommendations grid in the same section, with the remaining grid hidden by default.
- Made the button swap grids in place: `Display other [N]` shows the remaining cards, and `Show first 4 precons` returns to the initial four.
- Avoided calling `renderResult` from the precon toggle, preventing page scroll-to-top behavior.
- Added an explicit `.precon-grid.is-compact[hidden] { display: none; }` rule so the compact grid display style does not override hidden grid state.
- Preserved VM-140 card markup and safe-copy rules for both grids.
- Added CSS for the reveal button and updated tests/docs.

## Why It Changed

The passive VM-140 overflow note gave users no action. The first VM-141 implementation idea appended remaining cards below, but live interaction showed that full dossier re-rendering caused a scroll jump. The final implementation swaps pre-rendered grids in place so the section stays compact and the page position remains stable. A follow-up click check found the hidden grid was not visually toggling because compact grid CSS overrode the browser's default hidden behavior; the final CSS now explicitly hides hidden precon grids.

## Decisions Made

- The default Archscry precon view still shows at most four cards.
- Revealing recommendations swaps to the remaining set rather than appending below.
- The reveal control is local DOM state only; it does not alter URL state, saved profile state, or placement state.
- Adjacent-fit switching naturally re-renders a fresh collapsed section for the newly active dossier view.

## Risks / Uncertainties

- Visual regression covers the collapsed state. The expanded/swap interaction is covered through static and logic tests, not an interactive screenshot capture.
- `npm.cmd run dossier:audit` still reports 62 warnings and 0 failures; those warnings predate this pass.

## Tests Run

- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `node --check research/precon-artifact-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/precon-artifact-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`
- Re-ran focused tests, `npm.cmd test`, `dossier:audit`, and Archscry visual baseline/compare after the hidden-grid CSS fix.

## Not Touched

- Apocrypha route, shelves, links, tests, and visual baselines.
- Canonical precon source data.
- Generated schema contracts.
- Recommendation grouping and ranking math.
- Placement scoring logic.
- Dossier rail structure.
- Second-commander fields and future v3 schema work.
- Purchase, price, commerce, or availability behavior.

## Follow-Up Recommendations

- If expanded-state screenshots become important, add an interactive visual capture for the reveal button.
- Consider whether the label should eventually become `Display other decks` for identities with non-four remainder counts, but keep the current dynamic count for now.

## Next Suggested Agent

Test Strategist if interactive visual coverage for the expanded state becomes necessary.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-141-expand-remaining-precon-recommendations-in-archscry.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-05-26-2220-codex-vm140-premium-precon-section.md`

# VM-140 Premium Recommended Precon Decks Section Handoff

## Agent Name

Codex

## Task Requested

Implement VM-140 by refining Archscry's `Recommended Precon Decks` section into a compact premium panel that shows at most four precon cards selected from existing VM-137 groups in priority order, without changing Apocrypha, source data, schemas, ranking math, placement logic, dossier rail structure, or second-commander fields.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-0731-codex-vm136-archscry-precon-layer.md`
- `docs/handoffs/2026-05-26-0816-codex-vm137-faction-native-precons.md`
- `docs/handoffs/2026-05-26-1007-codex-vm138-precon-unicode-name-preservation.md`
- `docs/handoffs/2026-05-26-2138-codex-vm139-precon-mechanics-import.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-136-archscry-precon-layer.md`
- `docs/kanban/done/VM-137-faction-native-precons.md`
- `docs/kanban/done/VM-138-precon-unicode-name-preservation.md`
- `docs/kanban/done/VM-139-import-validated-precon-mechanics.md`
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
- `docs/kanban/done/VM-140-premium-recommended-precon-decks-section.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2220-codex-vm140-premium-precon-section.md`

## What Changed

- Added `selectPreconPreviewRecommendations` and `PRECON_PREVIEW_LIMIT` to expose a presentation-only preview selection helper.
- Updated the Archscry precon renderer to show one compact premium section instead of multi-lane catalog output.
- Capped visible precon cards at four while preserving the full grouped recommendation pool internally.
- Selected visible cards in group order: `nativeExact`, then `otherExact`, then `stretch`.
- Added compact fit badges: `Native fit`, `Exact-color fit`, and `Stretch fit`.
- Limited mechanics/focus chips to three safe values and omitted blank, placeholder, null, or undefined chips.
- Removed bulky card content from the Archscry preview, including `Skip if` blocks.
- Added an overflow note only when total grouped recommendations exceed four.
- Added focused tests for preview capping, group priority, overflow behavior, badges, chip caps, empty state copy, and uncapped internal pools.
- Refreshed Archscry visual baselines and compared them successfully.
- Closed the VM-140 Kanban card.

## Why It Changed

Orzhov and other same-color identities could produce a useful but page-flooding list of precon recommendations. VM-140 keeps recommendation confidence while making Archscry feel like a curated placement dossier instead of a full catalog browser.

## Decisions Made

- Presentation capping belongs in the Archscry rendering layer, not in the recommendation engine.
- The full VM-137 grouped output remains available for future browsing or search surfaces.
- The VM-140 preview does not route to Apocrypha and does not add a catalog shelf.
- Card copy is derived from existing safe fields only, such as fit summary, validated mechanics, themes, and `recommendationProfile.recommendedFor`.
- `creatureTypeFocus: null` is omitted from card chips and never rendered as text.

## Risks / Uncertainties

- Full precon browsing is still a future UX question; VM-140 intentionally leaves that destination unresolved.
- The compact preview depends on the existing ranking order within each VM-137 group.
- `npm.cmd run dossier:audit` still reports 62 warnings and 0 failures; those warnings predate this compact presentation pass.

## Tests Run

- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `node --check research/precon-artifact-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/precon-artifact-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run build:precons`
- `npm.cmd run build:factions`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`

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

- Plan a later precon discovery surface only after deciding whether Apocrypha, Maze, or a new Commander browser should own full-pool exploration.
- Consider a future "More like this" handoff once saved profiles or deck import data exists.
- Keep the current four-card cap unless user testing shows the compact panel feels too sparse.

## Next Suggested Agent

Planning Architect for the future full precon browsing destination, if that becomes a priority.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-140-premium-recommended-precon-decks-section.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-05-26-2138-codex-vm139-precon-mechanics-import.md`

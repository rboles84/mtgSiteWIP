# 2026-06-17 23:33 - Codex - VM-409 Archscry Hover Interaction

## Agent Name

Codex

## Task Requested

Implement VM-409 by removing canvas-driven hover behavior from the Archscry Identity Matrix and replacing trait-row hover detail with click-to-pin Strategium interaction.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-17-2305-codex-vm407-radar-branch-push.md`
- `docs/handoffs/2026-06-17-2057-codex-vm408-archscry-matrix-visual-polish.md`
- `docs/kanban/done/VM-407-identity-radar-v2-visual-info-upgrade.md`
- `docs/kanban/done/VM-408-archscry-identity-matrix-mock-guided-visual-polish.md`
- `assets/js/dossier-radar.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `assets/js/dossier-radar.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-409-archscry-matrix-hover-interaction-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-17-2333-codex-vm409-archscry-hover-interaction.md`

## What Changed

- Removed the Chart.js `onHover` handler that activated Strategium detail from the radar canvas.
- Replaced hover/focus-driven row detail population with explicit click and keyboard activation.
- Added `pinDossierAxis()` and `clearDossierPinnedAxis()` interaction paths.
- Added row `click` and `keydown` handlers for click, `Enter`, `Space`, and `Escape`.
- Added focus containment so moving between rows inside `.vm-identity-reading-panel` does not clear pinned detail.
- Added outside-click and document-level Escape clearing through lifecycle-scoped handlers.
- Added cleanup through `dossierAxisInteractionCleanup` so document listeners are removed before rerender/destroy.
- Updated follow-up tests to protect the VM-409 interaction contract.
- Moved VM-409 from in progress to done.

## Why It Changed

Owner manual QA found the current hover behavior unpleasant: the radar canvas could trigger detail changes, and the right-side trait popover felt twitchy. The new model makes Strategium detail intentional and stable.

## Decisions Made

- Canvas hover is no longer part of the interaction model.
- Trait hover/focus remains visual-only.
- Strategium detail appears only after click, `Enter`, or `Space`.
- Row-driven activation may still sync the radar active point.
- Outside click, Escape, and focus leaving the panel clear pinned detail.

## Risks / Uncertainties

- No browser/manual UI test was run per owner direction; subjective interaction feel still needs owner QA.
- Source-level tests verify the interaction contract but do not simulate DOM events.

## Tests Run

- `node --check assets/js/dossier-radar.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run lint:js`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not Touched

- `assets/js/graph.js`
- Home radar behavior, preview data, options, cycle, latch, and layout
- Radar score calculation, registry profile values, fallback profile logic, placement flow, and axis order
- Lore, card facts, commander facts, and placement data
- VM-408 layered radar fill, composite styling, trait-row visual polish, and Strategium popover styling
- No staging, commit, push, reset, or branch rewrite was performed.

## Follow-Up Recommendations

- Owner manual QA should check that click-to-pin feels stable and that Escape/outside-click clearing is intuitive.
- If the popover still feels too intrusive, consider a later card to convert pinned detail into a stable non-popover slot.

## Next Suggested Agent

Manual QA / Product owner review.

## Related Kanban Card, Docs, Or Plans

- VM-409 - `docs/kanban/done/VM-409-archscry-matrix-hover-interaction-repair.md`
- VM-408 - `docs/kanban/done/VM-408-archscry-identity-matrix-mock-guided-visual-polish.md`
- VM-407 - `docs/kanban/done/VM-407-identity-radar-v2-visual-info-upgrade.md`

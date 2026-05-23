# VM-105 - Archscry Doorway Watermark Backout

ID: VM-105
Title: Archscry Doorway Watermark Backout
Status: done
Type: Frontend / Rollback
Area: Home, Archscry Doorway Card
Priority: medium
Created: 2026-05-22
Completed: 2026-05-22

## Summary

Fully remove the live homepage Archscry doorway watermark that was introduced in VM-104, restoring the pre-watermark homepage card presentation while preserving the design-preview files and historical documentation.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-1917-codex-vm104-archscry-doorway-watermark.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-104-archscry-doorway-watermark.md`
- `index.html`
- `assets/css/home.css`

## Problem

The user requested a full backout of the live Archscry doorway watermark experiment.

## Proposed Outcome

- Remove the Archscry watermark wrapper and embedded SVG from `index.html`.
- Remove the scoped watermark positioning rules from `assets/css/home.css`.
- Leave the logo preview source files untouched.
- Preserve task history by recording the rollback as a new completed task instead of deleting prior docs.

## Acceptance Criteria

- The homepage Archscry doorway card no longer contains the watermark wrapper or embedded sigil SVG.
- `home.css` no longer contains the Archscry watermark CSS or responsive watermark overrides.
- The homepage returns to its pre-VM-104 Archscry doorway presentation on desktop, tablet, and mobile.
- No topbar, Identity Signal, dossier/radar, Maze, or preview-file changes are introduced.

## Notes

This rollback targets only the live homepage experiment. It does not delete or alter the local preview logo files that remain the source design reference.

## Completion Notes

- Replaced the Archscry scene container in `index.html` with its original empty decorative slot.
- Removed the watermark CSS block and responsive watermark overrides from `assets/css/home.css`.
- Left VM-104 documentation intact as historical context and added this card to record the rollback explicitly.

## Tests Run

- Static selector scan confirming `vm-card__watermark`, `vm-card__watermark--archscry`, and `vm-card__watermark-svg` are absent from `index.html` and `assets/css/home.css`.
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at desktop size (`1600x1400`)
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at tablet size (`1024x1700`)
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at mobile size (`540x2200`)


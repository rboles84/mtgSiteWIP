# VM-104 - Archscry Doorway Watermark

ID: VM-104
Title: Archscry Doorway Watermark
Status: done
Type: Frontend / Brand Placement
Area: Home, Archscry Doorway Card
Priority: medium
Created: 2026-05-22
Completed: 2026-05-22

## Summary

Place the approved V-plus-spirals sigil from the latest local logo preview into the homepage Archscry doorway card as a decorative watermark, with a fast rollback path if the placement does not hold up.

## Source Evidence

- `docs/design/visual-style-guide.md`
- `docs/handoffs/2026-05-22-1416-codex-vm101-golden-copy-logo-preview-merge.md`
- `docs/handoffs/2026-05-22-1438-codex-vm102-neutral-ash-black-spiral-tuning.md`
- `docs/handoffs/2026-05-22-1634-codex-vm103-grey-glow-no-dot-spiral-variant.md`
- `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals_black-ash_nodots.html`

## Problem

The new sigil direction is too detailed for the current `34px` topbar slot, but the user wants to start using it somewhere live inside Vox Mana without putting it behind Identity Signal surfaces or turning it into an unreadable UI element.

## Proposed Outcome

- Add the sigil only to the homepage Archscry doorway scene slot in `index.html`.
- Keep the sigil decorative and background-only.
- Keep the rollout isolated to one markup block and one scoped CSS block.
- Preserve a trivial backout path by hiding `.vm-card__watermark--archscry` or removing the single wrapper block.

## Acceptance Criteria

- The homepage Archscry doorway card shows the sigil as a low-opacity atmospheric watermark.
- The sigil does not overlap or reduce readability of the Archscry doorway copy.
- Tablet and mobile layouts still crop the watermark cleanly after the side-card reorder.
- No Identity Signal, dossier, radar, topbar, or Maze mandala surface changes are introduced.
- The sigil can be backed out by hiding `.vm-card__watermark--archscry` or removing the one inserted wrapper.

## Notes

This task intentionally uses the latest no-dot black-ash local preview as the art source and keeps the change out of the topbar and all Identity Signal surfaces.

## Completion Notes

- Added a single `.vm-card__watermark vm-card__watermark--archscry` wrapper inside the Archscry scene slot in `index.html`.
- Inlined a static SVG extracted from the no-dot black-ash preview, preserving the V-plus-spirals look while removing editor UI, live-edit wiring, motion layers, and animation.
- Added a scoped `home.css` block to position, crop, and soften the watermark so it reads as atmosphere instead of a badge.
- Added responsive watermark adjustments for the `1180px` and `680px` home breakpoints.
- Left the topbar, Maze mandala, Archscry Identity Signal, dossier/radar surfaces, and Apocrypha doorway untouched.

## Tests Run

- Static diff and selector scan confirming the live sigil placement is isolated to `index.html` and `assets/css/home.css`.
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at desktop size (`1600x1400`) confirming the watermark sits inside the Archscry scene slot and reads as background atmosphere.
- Headless Edge renders at tablet (`1024x1700`) and mobile (`540x2200`) sizes confirming the responsive cropping remains clean after the side-card layout reorder.
- Temporary local hidden-watermark variant confirming the rollback path can suppress the sigil layer without touching shared runtime code.

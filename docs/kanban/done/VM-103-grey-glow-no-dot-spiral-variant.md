# VM-103 - Grey-Glow No-Dot Spiral Variant

ID: VM-103
Title: Grey-Glow No-Dot Spiral Variant
Status: done
Type: Design / Frontend Preview
Area: Logo, Local Preview Files
Priority: medium
Created: 2026-05-22
Completed: 2026-05-22

## Summary

Create a new sibling local preview file from the black-ash spiral variant that slightly increases the black spiral's grey glow while removing the center core dot from all five spirals.

## Source Evidence

- `docs/design/visual-style-guide.md`
- `docs/handoffs/2026-05-22-1416-codex-vm101-golden-copy-logo-preview-merge.md`
- `docs/handoffs/2026-05-22-1438-codex-vm102-neutral-ash-black-spiral-tuning.md`
- `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals_black-ash.html`

## Problem

The black-ash variant fixed the black spiral's purple drift, but the user wants a little more neutral grey glow and wants the visible center dot removed from all five spirals.

## Proposed Outcome

- Add a new sibling self-contained HTML preview file in `C:/Users/obake/Downloads/HTML Work/Friday_5_16/`.
- Keep the current black-ash file intact for comparison.
- Remove the visible spiral core dots and subtly raise the black spiral's grey/ash presence without broad recoloring.

## Acceptance Criteria

- The new file opens locally with no external dependencies.
- No visible `spiral-core` circles remain in any spiral group.
- The black spiral reads slightly more grey/ash than the current black-ash version without drifting back toward purple or silver.
- Default load, reset, motion modes, and live edit behavior remain unchanged.

## Notes

This task targets a local preview artifact in `Downloads`, not a live Vox Mana runtime route.

## Completion Notes

- Created `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals_black-ash_nodots.html` as a new sibling variant of the black-ash preview.
- Slightly increased the visible black spiral's grey glow by raising the black accent stroke opacity from the VM-102 value.
- Removed the visible center core dots from all five spiral groups by removing the `spiral-core` circle instances from the output file.
- Preserved the same `spiralS` path, shared filters, motion behavior, V composition, and live-editor behavior.

## Tests Run

- Static checks confirming the sibling file exists, the stronger black accent override is present, no `spiral-core` circle instances remain, and `elementalFireFilter`, `plasmaCoreGlow`, and `glyphShapes.originalBase` init remain intact.
- Headless Edge render of `file:///C:/Users/obake/Downloads/HTML%20Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals_black-ash_nodots.html` confirming the no-dot variant and the subtle black grey-glow lift.

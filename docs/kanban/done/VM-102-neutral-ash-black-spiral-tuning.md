# VM-102 - Neutral-Ash Black Spiral Tuning

ID: VM-102
Title: Neutral-Ash Black Spiral Tuning
Status: done
Type: Design / Frontend Preview
Area: Logo, Local Preview Files
Priority: medium
Created: 2026-05-22
Completed: 2026-05-22

## Summary

Create a new sibling local preview file that keeps the merged golden-copy spiral/V composition intact while tuning only the black spiral color ramp away from purple and closer to ash/graphite black.

## Source Evidence

- `docs/design/visual-style-guide.md`
- `docs/handoffs/2026-05-22-1416-codex-vm101-golden-copy-logo-preview-merge.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals.html`

## Problem

The current merged golden-copy preview keeps the exact source spiral subsystem, but the black spiral inherits a violet-heavy gradient that reads more purple than black in the local composition.

## Proposed Outcome

- Add a new self-contained sibling HTML file in `C:/Users/obake/Downloads/HTML Work/Friday_5_16/`.
- Preserve every existing behavior and visual subsystem except the `blackStroke` gradient ramp.
- Tune the black spiral toward neutral ash/graphite while keeping it readable on the dark background.

## Acceptance Criteria

- The new file opens locally with no external dependencies.
- Only the black spiral color ramp changes.
- White, blue, red, and green spirals remain unchanged.
- The black spiral reads closer to black than purple at normal viewing size.
- Orbit, Radial Pulse, Drift, Weave, default load, reset, and live edit behavior remain unchanged.

## Notes

This task targets a local preview artifact in `Downloads`, not a live Vox Mana runtime route.

## Completion Notes

- Created `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals_black-ash.html` as a new sibling variant of the merged golden-copy preview.
- Replaced the purple-leaning `blackStroke` gradient with a neutral ash/graphite ramp.
- After the first visual pass, added a small `#spiralBlack` accent/core override so the shared white-hot accent stopped reading too silver on the black spiral.
- Kept the spiral structure, filters, motion behavior, live-editor behavior, and non-black spirals unchanged.

## Tests Run

- Static checks confirming the sibling file exists, the ash gradient stops are present, `elementalFireFilter` and `plasmaCoreGlow` remain present, and default init still uses `glyphShapes.originalBase`.
- Headless Edge render of the first ash-gradient pass.
- Headless Edge render after the darker black accent/core adjustment to confirm the black spiral reads darker without returning to purple.

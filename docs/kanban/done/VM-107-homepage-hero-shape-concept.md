# VM-107 - Homepage Hero Shape Concept

Status: Done

## Summary

Updated the left hero copy block in `newIndex2.html` to the "Your colors have a shape." concept with a refined WUBRG color philosophy strip.

## Scope Completed

- Replaced only the active visible `.vm-hero-copy` content.
- Added scoped inline CSS for `.vm-hero-title`, `.vm-hero-lede`, and `.vm-color-axis`.
- Preserved the right Identity Signal panel, radar chart, IDs, JavaScript behavior, atmosphere, Living Index section, footer, routes, and parent hero grid structure.

## Validation

- Static scan confirmed old visible hero strings were removed from active `.vm-hero-copy` markup.
- Static scan confirmed new headline, lede, WUBRG glyphs, and philosophy labels exist.
- Static scan confirmed Identity Signal IDs are unchanged and not duplicated.
- Inline scripts compiled.
- Browser smoke passed at desktop and mobile widths for hero layout, color-axis fit, Identity Signal rendering, Living Index presence, footer presence, and no console errors.
- Route check returned `200` for `/newIndex2.html`.
- `npm.cmd test` passed.

## Notes

- Existing mobile top nav overflow was observed at 390px viewport, but it predates this pass and was intentionally not touched because VM-107 was limited to the left hero copy block.

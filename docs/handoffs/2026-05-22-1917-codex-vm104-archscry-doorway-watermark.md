# Handoff - VM-104 Archscry Doorway Watermark

Agent name: Codex

Task requested: Place the approved V-plus-spirals sigil from the latest local logo preview into the homepage Archscry doorway card as a decorative watermark with a clear rollback path.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-1416-codex-vm101-golden-copy-logo-preview-merge.md`
- `docs/handoffs/2026-05-22-1438-codex-vm102-neutral-ash-black-spiral-tuning.md`
- `docs/handoffs/2026-05-22-1634-codex-vm103-grey-glow-no-dot-spiral-variant.md`
- `docs/kanban/board.md`
- `docs/design/visual-style-guide.md`
- `index.html`
- `assets/css/home.css`
- `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals_black-ash_nodots.html`

## Files Changed

- `index.html`
- `assets/css/home.css`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-104-archscry-doorway-watermark.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-1917-codex-vm104-archscry-doorway-watermark.md`

## What Changed

- Added a single decorative `.vm-card__watermark vm-card__watermark--archscry` wrapper inside the existing Archscry scene slot in `index.html`.
- Inlined a static SVG built from the latest no-dot black-ash logo preview, preserving the V-plus-spirals composition while removing editor UI, script, motion, and live-edit behavior.
- Added a scoped `home.css` block that positions the sigil as a large cropped background watermark inside the Archscry doorway scene.
- Added responsive watermark sizing tweaks for the home page `1180px` and `680px` breakpoints.
- Added explicit backout notes in both markup and CSS so the sigil can be disabled quickly by hiding the Archscry watermark class or removing the wrapper block.

## Why It Changed

The user wants to start using the new sigil inside Vox Mana, but the mark is too detailed for the current topbar slot. The homepage Archscry doorway scene offered a safe first live placement where the mark could read as atmosphere instead of navigational iconography.

## Decisions Made

- Scoped the first live placement to the homepage Archscry doorway card only.
- Kept the sigil out of the topbar, Maze mandala, Identity Signal surfaces, and Archscry dossier/radar panels for this pass.
- Used a static SVG extract rather than importing the full preview file or adding JavaScript.
- Kept the watermark low-opacity, oversized, and cropped so it supports the scene instead of becoming a centered badge.
- Preserved a rollback path that affects only one wrapper in `index.html` and one CSS block in `home.css`.

## Risks / Uncertainties

- The watermark is intentionally subtle, so future tuning may still be needed if the user wants more or less presence after living with it in the real homepage composition.
- The visual check used headless local file renders rather than a live localhost route, because the current workflow is file-based for this homepage.
- Existing unrelated repo modifications remain in the worktree and were not touched.

## Tests Run

- Static selector scan confirming the new placement is isolated to the homepage Archscry watermark block.
- `git diff -- index.html assets/css/home.css`
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at desktop size (`1600x1400`)
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at tablet size (`1024x1700`)
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at mobile size (`540x2200`)
- Temporary local hidden-watermark variant confirming the rollback path can suppress the sigil layer without touching shared runtime code

## Not Touched

- `assets/css/topbar.css`
- The Maze mandala in `index.html`
- `archscry/index.html`
- Identity Signal, dossier, radar, and selected-card surfaces
- `apocrypha/index.html`
- The local logo preview source file in `Downloads`

## Follow-Up Recommendations

- If this placement feels right after a little time, consider a second pass that gives Apocrypha its own separate watermark treatment rather than reusing the same Archscry art placement.
- If the watermark feels too loud on the live homepage, lower only the wrapper opacity before changing the SVG composition.
- If the user wants a future topbar derivative, build it from this same no-dot black-ash family but simplify it specifically for `34px` to `44px` use.

## Next Suggested Agent

Frontend polish agent for any follow-up opacity/cropping tuning or a second doorway watermark pass.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-104-archscry-doorway-watermark.md`
- `docs/kanban/done/VM-103-grey-glow-no-dot-spiral-variant.md`
- `docs/kanban/done/VM-102-neutral-ash-black-spiral-tuning.md`
- `docs/kanban/done/VM-101-golden-copy-logo-preview-merge.md`
- `docs/design/visual-style-guide.md`

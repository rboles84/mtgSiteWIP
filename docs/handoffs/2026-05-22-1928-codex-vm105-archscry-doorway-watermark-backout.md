# Handoff - VM-105 Archscry Doorway Watermark Backout

Agent name: Codex

Task requested: Fully back out the live homepage Archscry doorway watermark experiment from VM-104.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-1917-codex-vm104-archscry-doorway-watermark.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-104-archscry-doorway-watermark.md`
- `index.html`
- `assets/css/home.css`

## Files Changed

- `index.html`
- `assets/css/home.css`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-105-archscry-doorway-watermark-backout.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-1928-codex-vm105-archscry-doorway-watermark-backout.md`

## What Changed

- Removed the Archscry watermark wrapper and embedded SVG from `index.html`.
- Removed the scoped watermark CSS block and responsive watermark overrides from `assets/css/home.css`.
- Added a new rollback task record and handoff instead of deleting the VM-104 history.

## Why It Changed

The user explicitly requested a full backout of the live watermark experiment.

## Decisions Made

- Limited the rollback to the live homepage implementation only.
- Left the local logo preview source files untouched.
- Preserved VM-104 documentation and recorded the rollback as a separate task to keep the project history accurate.
- Did not touch any Identity Signal, topbar, Maze, Archscry dossier/radar, or Apocrypha surfaces.

## Risks / Uncertainties

- The repo remains dirty with unrelated existing modifications, so the rollback was kept scoped to the two homepage files plus the new tracking docs.
- Visual validation again used local file renders rather than a dev server flow.

## Tests Run

- Static selector scan confirming the watermark-specific selectors are gone from `index.html` and `assets/css/home.css`
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at desktop size (`1600x1400`)
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at tablet size (`1024x1700`)
- Headless Edge render of `file:///C:/dev/mtgSiteWIP/index.html` at mobile size (`540x2200`)

## Not Touched

- `assets/css/topbar.css`
- `archscry/index.html`
- `apocrypha/index.html`
- Identity Signal, dossier, radar, and selected-card surfaces
- `C:/Users/obake/Downloads/HTML Work/Friday_5_16/final_live-mana-glyph-editor_golden-spirals_black-ash_nodots.html`
- The other logo preview files in `Downloads`

## Follow-Up Recommendations

- If the sigil returns later, reintroduce it through a new isolated experiment rather than reopening VM-104 in place.
- If the user still wants to place the mark somewhere live, the next safest target is a more self-contained non-homepage panel or a dormant preview route.

## Next Suggested Agent

Frontend polish agent for any future alternate live placement experiment.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-105-archscry-doorway-watermark-backout.md`
- `docs/kanban/done/VM-104-archscry-doorway-watermark.md`
- `docs/handoffs/2026-05-22-1917-codex-vm104-archscry-doorway-watermark.md`

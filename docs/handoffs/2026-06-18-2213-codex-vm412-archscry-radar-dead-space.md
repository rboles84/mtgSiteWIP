# VM-412 Archscry Radar Dead Space Handoff

## Agent Name

Codex

## Task Requested

Tighten the Archscry radar canvas further after owner feedback requested almost no dead space above and below the width-limited radar drawing.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `assets/css/archscry.css`

## Files Changed

- `assets/css/archscry.css`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-412-archscry-radar-dead-space-tightening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-18-2213-codex-vm412-archscry-radar-dead-space.md`

## What Changed

- Changed `.vm-dossier-matrix-section .vm-radar-wrap` from `height:clamp(348px,37.5vw,382px)` to `height:clamp(300px,32vw,318px)`.
- Created and closed VM-412 as the focused follow-up for minimizing dead space.
- Added this handoff and indexed it.

## Why It Changed

The owner wanted the radar canvas to hug the rendered chart much more tightly. Since the radar itself remains width-limited, reducing the wrapper height is the safest CSS-only way to remove the excess top and bottom band without stretching the chart.

## Decisions Made

- Kept the change CSS-only.
- Did not alter Chart.js options, `graph.js`, dossier JS, Home behavior, grid columns, right rail sizing, controls, scoring, lore, or VM-409 interactions.
- Left the mobile override unchanged.

## Risks / Uncertainties

- At some viewport widths, the tighter 300-318px desktop height may make labels feel close to the canvas edge. Owner manual QA should confirm no clipping.
- If the owner wants a larger radar polygon and almost no dead space at the same time, a later card should change chart fit behavior or available width instead of continuing to tune height.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- assets/css/archscry.css`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- assets/css/archscry.css`

## Not Touched

- `assets/js/graph.js`
- `assets/js/dossier-radar.js`
- `assets/js/vm-radar.js`
- Home radar behavior, preview data, options, cycle, or latch behavior
- Grid columns, card padding, controls, selected identity card, right-side panels, or Chart.js options
- VM-409 click-to-pin Strategium behavior
- Mobile radar-wrap override
- Existing unrelated dirty VM-409 through VM-411 files

## Follow-Up Recommendations

- Owner manual QA should confirm the radar canvas has minimal dead space and no label clipping.
- If the chart now feels too compressed, increase only the max height slightly, likely to 328px or 336px.

## Next Suggested Agent

Owner manual QA.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-412-archscry-radar-dead-space-tightening.md`
- VM-411
- VM-410
- VM-409
- VM-408
- VM-407

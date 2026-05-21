# VM-080 - newIndex2 Ambient Identity Signal Radar

ID: VM-080
Title: newIndex2 Ambient Identity Signal Radar
Status: done
Type: Frontend / Focused Enhancement
Area: Home Preview, Hero Centerpiece
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Replace the static WUBRG signal wheel in `newIndex2.html` with a passive animated Chart.js radar centerpiece using a unique `vmIdentitySignalChart` canvas.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1005-codex-vm077-newindex2-living-index-rearrangement.md`
- `docs/handoffs/2026-05-20-1043-codex-vm079-newindex2-living-index-visual-hierarchy.md`
- `docs/kanban/board.md`
- `newIndex2.html`
- `C:\Users\obake\Downloads\HTML Work\working\candidates\dynamic-radar-showcase.html`

## Scope

- Replace only the existing `.vm-signal-system` center visual block.
- Add minimal CSS for the new chart container and canvas sizing.
- Add isolated JavaScript to initialize and animate `vmIdentitySignalChart`.
- Do not modify the existing `vmRadar` Color Matrix chart or route links.
- Do not modify shared files or root homepage files.

## Acceptance Criteria

- The old static WUBRG orbit is no longer present in the hero HTML.
- `vmIdentitySignalChart` renders as an ambient Chart.js radar.
- The signal drifts slowly with no controls, sliders, stats, or demo terminology.
- The motion respects reduced-motion preferences.
- The animation pauses when the browser tab is hidden and resumes when visible.
- Magic Basics, Color Matrix show/hide, and the existing `vmRadar` still work.
- No duplicate canvas IDs or JavaScript name collisions are introduced.

## Testing Notes

- Local route checks returned 200 for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Static checks confirmed no duplicate IDs and only two canvases: `vmIdentitySignalChart` and `vmRadar`.
- Static checks confirmed no `morphChart`, `fastStream`, `slowStream`, demo controls, sliders, stats, sensor, or stock terminology was copied.
- Browser smoke confirmed the old signal ring/points are absent from the body, `vmIdentitySignalChart` exists and is sized, the chart region changes after the 2-second update interval, and there are no console errors.
- Browser smoke confirmed Magic Basics tabs, Color Matrix show/hide, `vmRadar`, and identity selection still work.
- `npm.cmd test` passed.

# VM-084 - newIndex2 Amoeba Identity Signal Morph

ID: VM-084
Title: newIndex2 Amoeba Identity Signal Morph
Status: done
Type: Frontend / Focused Enhancement
Area: Home Preview, Hero Centerpiece
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Update the chart-only `newIndex2.html` identity signal so both the inner radar data and the outer polygon shape morph slowly, with inline tuning notes for future manual adjustment.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1216-codex-vm083-newindex2-signal-only-fluid-randomizer.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-083-newindex2-signal-only-fluid-randomizer.md`
- `newIndex2.html`
- `C:\Users\obake\Downloads\HTML Work\working\candidates\dynamic-radar-showcase.html`

## Scope

- Keep the hero signal surface chart-only with no visible controls or demo text.
- Add script-level tuning constants for data timing, shape timing, axis counts, and point-label visibility.
- Morph the outer radar polygon by changing axis label counts over time.
- Add subtle glow/pulse treatment to the identity signal without touching `vmRadar`.
- Preserve Magic Basics, Color Matrix, route links, root files, shared files, and route-page internals.

## Acceptance Criteria

- The inner signal data changes slowly instead of twitching at 250ms.
- The outer polygon changes side count over time.
- Axis labels are hidden by default.
- No signal controls, shape buttons, stats, or demo terminology are visible.
- Existing `vmRadar`, Magic Basics tabs, and Color Matrix behavior remain intact.
- `npm.cmd test` passes.

## Completion Notes

- Added script-level tuning constants for data timing, animation timing, polygon side counts, and point-label visibility.
- Changed the identity signal from a fixed 12-axis radar to an amoeba-style signal that morphs through `[6, 7, 8, 10, 12, 9, 7, 5]`.
- Slowed the inner generated-data updates to `1200ms` with a `1600ms` animation.
- Added a separate shape morph interval at `6000ms` with an `1800ms` animation.
- Hid point labels by default through `showPointLabels: false`.
- Added subtle canvas glow/pulse CSS and an isolated Chart.js glow plugin for the identity signal only.

## Tests Run

- Static scan: no duplicate runtime IDs after stripping HTML comments.
- Static scan: required IDs remain present: `vmIdentitySignalChart`, `vmRadar`, `basicsReveal`, `colorMatrixWrap`, `identityGrid`, `lensTabs`, `guildSubtabs`.
- Static scan: no visible signal-control strings or `data-vm-signal-*` hooks remain.
- Static scan: VM-084 tuning constants, data interval, and shape morph interval are present.
- Inline script compile check passed.
- Browser smoke: `http://localhost:8000/newIndex2.html` loaded, `vmIdentitySignalChart` exists, no signal controls are visible, and route links are present.
- Local HTTP checks returned `200` for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- `npm.cmd test` passed.

## Manual Follow-Up

- Verify live `vmIdentitySignalChart` outer polygon morphing, inner pulse, and existing `vmRadar` behavior in a browser session where `https://cdn.jsdelivr.net/npm/chart.js` loads. The in-app browser smoke session still reported `window.Chart` as unavailable, so visual chart rendering could not be confirmed there.

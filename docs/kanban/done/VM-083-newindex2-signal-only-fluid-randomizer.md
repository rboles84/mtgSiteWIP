# VM-083 - newIndex2 Signal-Only Fluid Randomizer

ID: VM-083
Title: newIndex2 Signal-Only Fluid Randomizer
Status: done
Type: Frontend / Focused Enhancement
Area: Home Preview, Hero Centerpiece
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Simplify the `newIndex2.html` hero identity signal back to only the `vmIdentitySignalChart` canvas while using a faster 250ms randomize-style update loop inspired by `dynamic-radar-showcase.html`.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1200-codex-vm081-newindex2-interactive-identity-signal-showcase.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-081-newindex2-interactive-identity-signal-showcase.md`
- `newIndex2.html`
- `C:\Users\obake\Downloads\HTML Work\working\candidates\dynamic-radar-showcase.html`

## Scope

- Remove visible Fast Stream, Randomize Signal, shape buttons, and Dynamic Capabilities UI from the hero signal.
- Keep only the `vmIdentitySignalChart` canvas in the signal block.
- Use a 250ms randomized update loop with unique `vmIdentitySignal*` names.
- Preserve the existing `vmRadar` Color Matrix chart, Magic Basics tabs, route links, shared files, and root homepage files.

## Acceptance Criteria

- Hero center signal shows only `vmIdentitySignalChart`.
- No signal buttons, stream label, shape preset grid, or capabilities label remain visible.
- `vmIdentitySignalChart` updates fluidly on a 250ms loop unless reduced motion is enabled.
- Existing Magic Basics and Color Matrix behavior still works.
- `npm.cmd test` passes.

## Completion Notes

- Removed the visible Fast Stream, Randomize Signal, shape preset, and Dynamic Capabilities controls from `newIndex2.html`.
- Kept the hero signal block to only `canvas#vmIdentitySignalChart`.
- Updated the isolated identity signal script to use a 12-axis generated-data randomizer on a 250ms interval, with reduced-motion and visibility-pause guards preserved.
- Preserved the existing `vmRadar` Color Matrix chart IDs and setup.

## Tests Run

- Static scan: no duplicate runtime IDs after stripping HTML comments.
- Static scan: no remaining visible signal-control strings or `data-vm-signal-*` hooks.
- Static scan: required IDs remain present: `vmIdentitySignalChart`, `vmRadar`, `basicsReveal`, `colorMatrixWrap`, `identityGrid`, `lensTabs`, `guildSubtabs`.
- Inline script compile check passed.
- Local HTTP checks returned `200` for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- `npm.cmd test` passed.

## Manual Follow-Up

- Verify actual Chart.js radar rendering in a browser/session where `https://cdn.jsdelivr.net/npm/chart.js` loads. The in-app browser smoke session loaded the page but reported `window.Chart` as unavailable, so chart rendering and `vmRadar` interaction could not be visually confirmed there.

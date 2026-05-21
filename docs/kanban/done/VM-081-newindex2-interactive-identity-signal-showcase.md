# VM-081 - newIndex2 Interactive Identity Signal Showcase

ID: VM-081
Title: newIndex2 Interactive Identity Signal Showcase
Status: done
Type: Frontend / Focused Enhancement
Area: Home Preview, Hero Centerpiece
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Expand the `newIndex2.html` hero identity signal radar from a passive ambient chart into a faster, interactive Vox Mana signal showcase with shape presets, 500ms stream behavior, and pulse/glow effects.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1151-codex-vm080-newindex2-ambient-identity-signal-radar.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-080-newindex2-ambient-identity-signal-radar.md`
- `newIndex2.html`
- `C:\Users\obake\Downloads\HTML Work\working\candidates\dynamic-radar-showcase.html`

## Scope

- Add Vox Mana-styled shape controls to the existing `vmIdentitySignalChart` hero signal.
- Adapt the showcase randomize/morph/fast-stream mechanics with unique `vmIdentitySignal*` names.
- Add scoped pulse/glow effects around the signal container.
- Preserve the existing `vmRadar` Color Matrix chart, Magic Basics tabs, route links, shared files, and root homepage files.

## Acceptance Criteria

- The hero signal runs as a faster 500ms stream.
- Shape presets are available for triangle, square, pentagon, hexagon, heptagon, octagon, decagon, dodecagon, and higher-axis shapes where appropriate.
- Shape clicks morph the existing `vmIdentitySignalChart` without creating duplicate canvas IDs.
- No demo globals such as `morphChart`, `fastStream`, or `slowStream` are introduced.
- Existing Magic Basics and Color Matrix behavior still works.
- `npm.cmd test` passes.

## Testing Notes

- Static scan confirmed no duplicate IDs and only two canvas IDs: `vmIdentitySignalChart` and `vmRadar`.
- Static scan confirmed shape presets for 3, 4, 5, 6, 7, 8, 10, 12, 16, and 20 axes.
- Static scan confirmed no demo globals such as `morphChart`, `fastStreamChart`, `slowStreamChart`, `fastStreamInterval`, `slowStreamInterval`, or `updateInterval`.
- Local route checks returned 200 for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Browser smoke confirmed the chart region changes within a 650ms window, the 20-axis Full Prism preset activates, Randomize Signal works, and no console errors appear.
- Browser smoke confirmed Magic Basics tabs, Color Matrix visibility, existing `vmRadar`, and identity selector behavior still work.
- `npm.cmd test` passed.

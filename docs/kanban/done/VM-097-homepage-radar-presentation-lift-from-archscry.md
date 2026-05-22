# VM-097 - Homepage Radar Presentation Lift From Archscry

ID: VM-097
Title: Homepage Radar Presentation Lift From Archscry
Status: done
Type: Frontend / Radar Presentation
Area: Home Identity Signal
Priority: high
Created: 2026-05-21

## Summary

Update only the `newIndex2.html` homepage Identity Signal radar presentation so it looks closer to the richer Archscry radar card while preserving the current homepage layout and passive auto-cycling behavior.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `docs/kanban/board.md`
- `newIndex2.html`
- `archscry/index.html`
- `assets/js/dossier-radar.js`

## Scope

- Keep the existing homepage hero/right-panel placement.
- Keep the passive Identity Signal behavior.
- Lift Archscry-style visual presentation into home-scoped markup, CSS, and Chart.js rendering.
- Restore component plus synthesis datasets on the homepage preview.
- Keep the right-side hero panel compact and balanced with the left hero copy on desktop.

## Non-Goals

- Do not modify `/archscry/`, `/basics/`, `/maze/`, `/apocrypha/`, root `index.html`, or `newIndex.html`.
- Do not import or mutate `assets/js/dossier-radar.js`.
- Do not add selector, dropdown, checkbox, or Color Matrix controls to the homepage.
- Do not change identity score arrays, route behavior, or identity meaning/copy.

## Acceptance Criteria

- Homepage Identity Signal panel remains in the hero/right-panel area.
- Homepage radar visually resembles the Archscry radar card more than the old flatter chart.
- Composite previews render component plus synthesis datasets.
- Black uses readable violet `#a46bea` in the homepage radar display.
- Dataset pills, title, and text update together.
- No Archscry dossier IDs or controls are copied.
- Static scans, browser smoke, route checks, and `npm.cmd test` pass.

## Completion Notes

- Replaced the homepage Identity Signal chart shell with an Archscry-style radar card while preserving the existing hero/right-panel placement.
- Restored component plus synthesis datasets on the homepage preview.
- Made Black readable on the homepage radar with the Archscry-style violet display color `#a46bea`.
- Kept the chart compact enough that the right-side hero panel remains visually balanced with the left hero copy on desktop.
- Did not modify `/archscry/`, `/basics/`, `/maze/`, `/apocrypha/`, root `index.html`, `newIndex.html`, or shared route internals.

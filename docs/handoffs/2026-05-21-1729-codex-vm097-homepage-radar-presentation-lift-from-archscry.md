# VM-097 Homepage Radar Presentation Lift From Archscry

Agent name: Codex

Task requested: Update only the `newIndex2.html` homepage Identity Signal radar presentation so it renders more like the richer Archscry radar card while preserving passive homepage behavior and avoiding Archscry behavior imports.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-097-homepage-radar-presentation-lift-from-archscry.md`
- `newIndex2.html`
- `archscry/index.html`
- `assets/js/dossier-radar.js`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-097-homepage-radar-presentation-lift-from-archscry.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-21-1729-codex-vm097-homepage-radar-presentation-lift-from-archscry.md`

## What Changed

- Replaced the homepage Identity Signal chart interior with an Archscry-style radar shell using the existing `vm-radar-card`, `vm-chart-wrap`, `vm-radar-glow`, `vm-radar-wrap`, `vm-radar-caption`, and `vm-dataset-pills` classes plus small home-scoped sizing classes.
- Restored homepage composite previews to component plus synthesis layering, such as `Red`, `Green`, and `Gruul`; `Black`, `Red`, and `Rakdos`; and `Green`, `Blue`, and `Simic`.
- Updated the homepage chart rendering to use stronger glow, halo, white/gold axis labels, tier labels on the synthesized dataset, richer component/synthesis styling, and readable Black as `#a46bea`.
- Tightened home-scoped radar sizing so the right hero panel stays visually balanced with the left hero copy on desktop.
- Moved VM-097 from in progress to done on the file-based Kanban board.

## Why It Changed

The homepage Identity Signal had drifted away from the richer Archscry-style radar presentation. This pass repaired the visual depth and dataset layering without importing Archscry route behavior, controls, or IDs.

## Decisions Made

- Kept the homepage panel passive: no dropdowns, selectors, checkboxes, or toggles were added.
- Used Archscry as a visual/reference pattern only; no Archscry dossier IDs or route modules were copied.
- Let VM-097 supersede the homepage side of VM-096 by restoring synthesis layers on Home, while leaving `/basics/` VM-096 behavior untouched.
- Kept the bottom radar dataset pills visible but compact, while keeping the header overlay pills as the primary readable cue.

## Risks / Uncertainties

- The in-app browser evaluation surface could not call page global functions directly, so forced dataset checks were done in a mocked DOM/Chart execution context, while live browser checks verified layout, visible pills, chart visibility, and no controls.
- Screenshot capture from the in-app browser timed out once, but DOM/layout/browser smoke checks still completed.

## Tests Run

- Static scan: no duplicate runtime IDs in `newIndex2.html`.
- Static scan: no copied Archscry dossier IDs in `newIndex2.html`.
- Static scan: no homepage picker/control IDs in `newIndex2.html`.
- Static scan: `newIndex2.html` still uses `assets/js/graph.js` and does not reference the Chart.js CDN.
- Static compile: one inline script compiled without syntax errors.
- Mocked Chart smoke: `gruul` produced `Red`, `Green`, `Gruul`.
- Mocked Chart smoke: `rakdos` produced `Black`, `Red`, `Rakdos`, with Black rendered as violet `rgba(164, 107, 234, 0.82)`.
- Mocked Chart smoke: `simic` produced `Green`, `Blue`, `Simic`.
- Browser smoke: homepage chart visible, no controls present, no copied dossier IDs present.
- Browser smoke: right hero panel height matched left hero copy height at 1280px desktop viewport.
- Route checks: `/newIndex2.html`, `/archscry/`, `/basics/`, `/maze/`, and `/apocrypha/` returned 200.
- `npm.cmd test` passed.

## Not Touched

- `/archscry/`
- `/basics/`
- `/maze/`
- `/apocrypha/`
- root `index.html`
- `newIndex.html`
- shared home CSS/JS
- `assets/js/dossier-radar.js`
- identity score arrays and meaning/copy

## Follow-Up Recommendations

- Do a human visual pass in the browser to decide whether the compact chart is the ideal final size or should gain a few pixels after the left hero copy changes.
- If future passes need automated browser forcing, consider intentionally exposing a home-scoped debug hook only in development rather than relying on browser-isolated evaluation.

## Next Suggested Agent

Frontend polish agent for any final visual micro-tuning after user review.

Related Kanban card: `docs/kanban/done/VM-097-homepage-radar-presentation-lift-from-archscry.md`

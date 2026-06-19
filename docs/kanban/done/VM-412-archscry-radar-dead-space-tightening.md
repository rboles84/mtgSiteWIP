# VM-412 - Archscry Radar Dead Space Tightening

ID: VM-412
Title: Archscry Radar Dead Space Tightening
Status: done
Type: Visual Polish
Area: Archscry Identity Matrix
Priority: low
Created: 2026-06-18
Completed: 2026-06-18
Owner: Codex
Related: VM-407, VM-408, VM-409, VM-410, VM-411

## Summary

Tighten the Archscry radar canvas wrapper further after owner QA requested almost no dead space around the width-limited radar drawing.

## Scope

- Change only the existing `.vm-dossier-matrix-section .vm-radar-wrap` height value in `assets/css/archscry.css`.
- Keep the canvas non-stretched and let Chart.js render normally inside the tighter box.
- Do not change Home, `graph.js`, Chart.js options, JS behavior, scoring, lore, grid columns, right panel sizing, controls, selected identity card, or VM-409 click-to-pin behavior.
- Keep the mobile override unchanged.

## Acceptance

- The desktop Archscry radar canvas uses a much tighter height range with minimal top/bottom dead space.
- No JS or surrounding layout changes are made.

## Verification

- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- assets/css/archscry.css`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- assets/css/archscry.css`

Note: the full branch diff also shows the pre-existing VM-408 `.vm-radar-card` padding change in `assets/css/archscry.css`; VM-412 changed only the `.vm-dossier-matrix-section .vm-radar-wrap` height value.

## Manual QA

- Owner confirms the radar has almost no dead space above and below.
- Owner confirms labels are not clipped and the radar does not look stretched.

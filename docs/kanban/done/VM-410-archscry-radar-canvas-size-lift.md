# VM-410 - Archscry Radar Canvas Size Lift

ID: VM-410
Title: Archscry Radar Canvas Size Lift
Status: done
Type: Visual Polish
Area: Archscry Identity Matrix
Priority: low
Created: 2026-06-18
Completed: 2026-06-18
Owner: Codex
Related: VM-407, VM-408, VM-409

## Summary

Increase only the Archscry `#dossierManaRadar` display area by lifting the existing `.vm-dossier-matrix-section .vm-radar-wrap` height clamp by 25%.

## Scope

- Change exactly one product-code value in `assets/css/archscry.css`.
- Keep the existing canvas fill rule unchanged.
- Do not change grid structure, right panel sizing, Home behavior, data, JS behavior, `graph.js`, Chart.js options, or VM-409 click-to-pin interaction logic.
- Keep the mobile override unchanged.

## Acceptance

- `.vm-dossier-matrix-section .vm-radar-wrap` changes from `height:clamp(300px,34vw,348px)` to `height:clamp(375px,42.5vw,435px)`.
- No other product-code changes are made for this card.
- Kanban and handoff updates document the change.

## Verification

- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- assets/css/archscry.css`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- assets/css/archscry.css`

## Manual QA

- Owner confirms the radar appears taller/larger in the same card.
- Owner confirms controls, selected identity card, right trait panel, and click-to-pin Strategium behavior are unchanged.
- Owner confirms the taller radar does not push the selected identity summary too far below the fold at common desktop widths.

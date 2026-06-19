# VM-411 - Archscry Radar Square Fit Repair

ID: VM-411
Title: Archscry Radar Square Fit Repair
Status: done
Type: Visual Polish
Area: Archscry Identity Matrix
Priority: low
Created: 2026-06-18
Completed: 2026-06-18
Owner: Codex
Related: VM-407, VM-408, VM-409, VM-410

## Summary

Correct the VM-410 height-only lift by reducing the Archscry radar wrapper's excess vertical space. The radar canvas became taller, but the rendered radar stayed width-limited, creating dead space above and below the chart.

## Scope

- Keep the Archscry radar area closer to square so the chart reads tighter without stretching.
- Change only the existing `.vm-dossier-matrix-section .vm-radar-wrap` height value in `assets/css/archscry.css`.
- Do not change Home, `graph.js`, Chart.js options, JS behavior, scoring, lore, grid columns, right panel sizing, controls, selected identity card, or VM-409 click-to-pin interaction logic.
- Keep the existing mobile override unchanged.

## Acceptance

- The desktop Archscry radar canvas no longer expands to a tall 435px box when its width remains around 382px.
- The change reduces top/bottom dead space without stretching the radar.
- No other product-code changes were made for this card.

## Verification

- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- assets/css/archscry.css`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- assets/css/archscry.css`

Note: the full branch diff also shows the pre-existing VM-408 `.vm-radar-card` padding change in `assets/css/archscry.css`; VM-411 changed only the `.vm-dossier-matrix-section .vm-radar-wrap` height value.

## Manual QA

- Owner confirms the radar block feels tighter with less empty space above and below the graph.
- Owner confirms controls, selected identity card, right trait panel, and click-to-pin Strategium behavior remain unchanged.

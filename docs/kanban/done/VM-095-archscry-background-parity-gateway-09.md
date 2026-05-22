# VM-095 - Archscry Background Parity With Gateway 09

ID: VM-095
Title: Archscry Background Parity With Gateway 09
Status: done
Type: Frontend / Visual Parity
Area: Archscry
Priority: high
Created: 2026-05-20

## Summary

Update `/archscry/` and `/archscry/index2.html` so their background presentation matches the current `newIndex2.html` visual style, using `background-vox-gateway-clean-09.webp` as the shared Archscry background image.

## Source Evidence

- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `newIndex2.html`
- `archscry/index.html`
- `archscry/index2.html`
- `assets/css/archscry.css`

## Acceptance Criteria

- Both Archscry routes use `background-vox-gateway-clean-09.webp`.
- Both Archscry routes adopt the `newIndex2`-style atmosphere stack: painted background feel, overlay glow, nebula structure, and stars canvas.
- Existing Archscry layout, dossier order, saved-result restore, adjacent-fit switching, and Identity Matrix behavior remain unchanged.
- `archscry/index2.html` keeps its atlas composition while adopting the updated background treatment.

## Notes

Keep this scoped to Archscry shell/background presentation only. Do not modify `assets/js/dossier-radar.js`, placement contracts, Maze internals, or root home files.

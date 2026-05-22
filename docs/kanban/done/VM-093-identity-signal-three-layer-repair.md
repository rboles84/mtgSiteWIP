# VM-093 - Identity Signal Three-Layer Repair

ID: VM-093
Title: Identity Signal Three-Layer Repair
Status: done
Type: Frontend / Chart Repair
Area: Home Preview, Identity Signal
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Repaired the `newIndex2.html` homepage Identity Signal by restoring the old working three-layer composite chart behavior while keeping the current passive/random homepage shape.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2254-codex-vm092-homepage-compression-ambient-signal-polish.md`
- `docs/kanban/board.md`
- `C:\Users\obake\Downloads\HTML Work\lift_this_mana_lense.html`
- `newIndex2.html`

## Scope Completed

- Restored composite homepage chart states to component datasets plus synthesized identity dataset.
- Kept ambient/static homepage copy and passive signal cycling.
- Kept local `assets/js/graph.js`; did not restore the Chart.js CDN.

## Non-Goals Preserved

- Did not modify `/basics/`.
- Did not reintroduce homepage `vmRadar`, selector controls, Magic Basics tooling, or Color Matrix behavior.
- Did not modify root `index.html`, `newIndex.html`, shared CSS/JS, Archscry, Maze, or Apocrypha internals.

## Acceptance Notes

- Forcing `updateHeroManaPreview("simic")` renders exactly `Green`, `Blue`, and `Simic` datasets.
- Simic is the final solid synthesized dataset and uses the Simic teal color.
- Homepage visible signal copy remains ambient/static.
- Random start, passive cycle, reduced-motion safety, and route behavior remain intact.

## Handoff

- `docs/handoffs/2026-05-20-2320-codex-vm093-identity-signal-three-layer-repair.md`

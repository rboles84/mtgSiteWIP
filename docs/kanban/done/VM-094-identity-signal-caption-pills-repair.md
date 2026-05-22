# VM-094 - Identity Signal Caption + Pills Repair

ID: VM-094
Title: Identity Signal Caption + Pills Repair
Status: done
Type: Frontend / Signal UI Repair
Area: Home Preview, Identity Signal
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Repaired the `newIndex2.html` homepage Identity Signal display so the active color, guild, or college title, description, and display-only mana/component pills update with the passive chart.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2320-codex-vm093-identity-signal-three-layer-repair.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Scope

- Restored display-only profile/overlay pills near the Identity Signal header.
- Restored active identity title and concise two-sentence description in the caption.
- Preserved VM-093 three-layer chart behavior, random start, passive cycle, and reduced-motion behavior.

## Non-Goals

- Did not modify `/basics/`.
- Did not add picker/dropdown controls.
- Did not reintroduce homepage `vmRadar`, Magic Basics, Color Matrix, or selector tooling.
- Did not modify root `index.html`, `newIndex.html`, shared CSS/JS, Archscry, Maze, or Apocrypha internals.

## Acceptance Notes

- Simic displays `Overlay: Green + Blue -> Simic`, Simic title, and concise Simic text.
- Rakdos displays `Overlay: Black + Red -> Rakdos`.
- White displays `Profile: White`.
- The chart still renders component plus synthesis datasets for composites.
- Static scans, route checks, browser smoke, and `npm.cmd test` passed.

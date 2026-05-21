# VM-079 - newIndex2 Living Index Visual Hierarchy

ID: VM-079
Title: newIndex2 Living Index Visual Hierarchy
Status: done
Type: Frontend / Visual Hierarchy
Area: Home Preview, UX
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Turn the `newIndex2.html` Living Index from a structurally rearranged page into a clearer homepage orientation surface with a stronger hero, intent selector, module panels, system flow, and color philosophy section.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1005-codex-vm077-newindex2-living-index-rearrangement.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-077-newindex2-living-index-rearrangement.md`
- `docs/design/visual-style-guide.md`
- `newIndex2.html`

## Problem

Batch 1 made the page structurally more like a Living Index, but the UI still feels like the same poster-plus-card layout because CSS changes were out of scope.

## Acceptance Criteria

- `newIndex2.html` hero immediately explains Vox Mana as a Magic identity and meaning engine.
- The hero uses a left promise, center visual identity system, and right intent selector on desktop.
- The three main site areas read as modules, not doors.
- The page includes a connected-system flow and color philosophy section.
- Existing Magic Basics, Color Matrix, radar, reveal, atmosphere, route links, and back-to-top behavior remain functional.
- Existing JavaScript logic is not rewritten.

## Testing Notes

- Local route checks returned 200 for `/newIndex2.html`, `/archscry/`, `/maze/`, `/apocrypha/`, `/privacy/`, and `/terms/`.
- Browser smoke confirmed page load, nav anchors, Magic Basics tabs, Color Matrix toggle, radar rendering, identity selector updates, reveal activation, back-to-top behavior, and desktop grid layout.
- Static checks confirmed no duplicate IDs, required behavior IDs remain present, section order is correct, and visible door/gateway framing was not introduced.
- `npm.cmd test` passed.

## Human Review

Yes - this is a homepage visual direction pass and should be skimmed in-browser.

# VM-066 - newIndex2 Self-Contained Wiring

ID: VM-066
Title: newIndex2 Self-Contained Wiring
Status: done
Type: Frontend / Wiring
Area: Home Preview, Routing
Priority: high
Created: 2026-05-19
Completed: 2026-05-19

## Summary

Wire `newIndex2.html` to the canonical Vox Mana destinations while keeping the page fully self-contained and leaving root `index.html` untouched.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-19-2142-codex-newindex-chartjs-preview-repair.md`
- `docs/handoffs/2026-05-19-2223-codex-newindex-chartjs-repair-retry.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-020-route-architecture-normalization.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `docs/kanban/done/VM-065-newindex-chartjs-repair-retry.md`
- `newIndex2.html`

## Problem

`newIndex2.html` had the preferred inline layout and self-contained chart behavior, but it still pointed at old flat-route preview links and lacked the requested placeholder-nav behavior and footer privacy/terms links.

## Acceptance Criteria

- `newIndex2.html` stays self-contained and keeps its current inline HTML, CSS, JS, and comment structure.
- Top-nav `What is this?` and `Magic Basics` remain visible links but do not navigate or scroll.
- Top-nav `Archscry` points to `/archscry/`.
- Top-nav `Implicit Maze` points to `/maze/`.
- The top-nav `Library` item is removed.
- Path cards point to `/archscry/`, `/maze/`, and `/apocrypha/`.
- Library Preview cards point to `/apocrypha/`.
- Footer links include `/privacy/` and `/terms/`.
- The existing Google Font include and Chart.js CDN include remain unchanged.

## Dependencies / Related Work

- `VM-020 - Route Architecture Normalization`
- `VM-064 - newIndex Chart.js Preview Repair`
- `VM-065 - newIndex Chart.js Repair Retry`

## Files Likely Impacted

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- Browser automation was not guaranteed in-session, so final verification may rely on static scans unless a local browser check succeeds.
- Root `index.html` remains a separate surface, so this pass does not change the live home route.
- `assets/js/color-matrix-radar.js` is still only a wrapper around Chart.js and cannot replace the CDN include in this pass.

## Implementation Prompt

Keep `newIndex2.html` visually and structurally intact, rewire its destination links to canonical folder routes, add no-op placeholder behavior for the two future-page top-nav links, and update the project-memory trail without touching root-home files.

## Human Review

Yes - this is a front-door navigation wiring pass, and visual fidelity should be spot-checked after the scoped edits land.

## Notes

This pass is intentionally wiring-only. It does not promote `newIndex2.html` to `/`, does not replace the Chart.js CDN, and does not mix in shared-site CSS or JS.

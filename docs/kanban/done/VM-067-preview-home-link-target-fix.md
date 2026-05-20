# VM-067 - Preview Home Link Target Fix

ID: VM-067
Title: Preview Home Link Target Fix
Status: done
Type: Frontend / Wiring
Area: Routing, Topbar
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Retarget the route-page Vox Mana brand and `Home` links so Archscry, Maze, and Apocrypha return to `newIndex.html` instead of root `index.html`.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/kanban/board.md`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`

## Problem

The route pages still pointed their top-left brand and `Home` nav links at `/`, which resolves to root `index.html` instead of the preview home page the user currently wants as the return target.

## Acceptance Criteria

- `archscry/index.html` brand and `Home` links point to `/newIndex.html`.
- `maze/index.html` brand and `Home` links point to `/newIndex.html`.
- `apocrypha/index.html` brand and `Home` links point to `/newIndex.html`.
- Archscry, Maze, and Apocrypha cross-links remain unchanged.
- Root `index.html` remains untouched.

## Dependencies / Related Work

- `VM-020 - Route Architecture Normalization`
- `VM-066 - newIndex2 Self-Contained Wiring`

## Files Likely Impacted

- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- This is a targeted preview-home redirect, not a full canonical-home decision across the whole site.
- Any future decision to make `newIndex2.html` or root `index.html` canonical will require another pass to realign these links.

## Implementation Prompt

Change only the brand and `Home` links in the route pages so they return to `/newIndex.html`, then document the fix in the board and handoff trail.

## Human Review

Yes - click the top-left brand and `Home` links in Archscry, Maze, and Apocrypha after the change.

## Notes

Keep this scoped to header-link targeting. Do not change route-page content or shared runtime behavior.

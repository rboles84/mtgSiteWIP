# VM-068 - Preview Home Link Retarget To newIndex2

ID: VM-068
Title: Preview Home Link Retarget To newIndex2
Status: done
Type: Frontend / Wiring
Area: Routing, Topbar
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Retarget the Archscry, Maze, and Apocrypha brand and `Home` links from `newIndex.html` to `newIndex2.html` so they return to the page the user is actively using as the preferred home skeleton.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-20-0005-codex-vm067-preview-home-link-target-fix.md`
- `docs/kanban/board.md`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- User reproduction path: `http://localhost:8000/newIndex2.html#top -> /archscry/ -> Home/brand`

## Problem

The prior retargeting pass sent route-page `Home` and brand links to `newIndex.html`, but the user is currently entering the site through `newIndex2.html` and expects those return-home links to land back there.

## Acceptance Criteria

- `archscry/index.html` brand and `Home` links point to `/newIndex2.html`.
- `maze/index.html` brand and `Home` links point to `/newIndex2.html`.
- `apocrypha/index.html` brand and `Home` links point to `/newIndex2.html`.
- Cross-links for Archscry, Maze, and Apocrypha remain unchanged.
- Root `index.html`, `newIndex.html`, and `newIndex2.html` remain otherwise untouched.

## Dependencies / Related Work

- `VM-020 - Route Architecture Normalization`
- `VM-067 - Preview Home Link Target Fix`

## Files Likely Impacted

- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- This remains a preference-driven preview-home target rather than a full canonical-home decision.
- If the preferred home changes again later, these links will need another small retargeting pass.

## Implementation Prompt

Change only the route-page brand and `Home` links from `/newIndex.html` to `/newIndex2.html`, then document the update in the board and handoff trail.

## Human Review

Yes - click the brand and `Home` links from Archscry, Maze, and Apocrypha after the retargeting pass.

## Notes

Keep this surgical. Do not modify route-page body content, shared runtime logic, or the root home files.

# VM-019 - Lightweight Mock Home Sandbox

ID: VM-019
Title: Lightweight Mock Home Sandbox
Status: backed out
Type: UI Sandbox
Area: Home, Visual Direction
Priority: medium
Created: 2026-05-15
Completed: 2026-05-15

## Summary

Create a disposable root-level homepage sandbox that can be opened directly from disk for first-visit gateway review without changing the live homepage route or production home assets.

## Source Evidence

- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md` - keeps the larger homepage gateway direction visible.
- `docs/mockups/homepage-gateway-mockup-set.md` - defines the three-door gateway direction, Maze centrality, and published Apocrypha treatment.
- `index.html` - current live home shell, reviewed read-only for structure.
- `assets/css/home.css` - current home-specific styling, reviewed read-only for visual language.
- `assets/js/home.js` - current home-specific behavior, reviewed read-only for lightweight motion patterns.

## Outcome

- Added, then backed out, `mock_index.html` as the root-level direct-review file.
- Added, then backed out, `mock_home.css` and `mock_home.js` as isolated sandbox assets.
- Keep the mock to the first-visit gateway frame only.
- Reference `C:\dev\projectFiles\vox-mana-logo-flame-orb-final.svg` directly as a read-only brand mark.
- Keep Maze as the central gateway focus and Apocrypha visible as published.

## Backout

The user rejected the first sandbox direction on 2026-05-15. The disposable mock files were deleted:

- `mock_index.html`
- `mock_home.css`
- `mock_home.js`

Production home files remained untouched.

## Acceptance Criteria

- Production `index.html`, `assets/css/home.css`, and `assets/js/home.js` remain unchanged.
- The mock can be backed out by deleting `mock_index.html`, `mock_home.css`, and `mock_home.js`.
- The mock reads as a Vox Mana gateway rather than a dashboard.
- The logo SVG loads by direct local reference without copying or editing the source SVG.
- Apocrypha is visible and active in the mock.

## Non-Goals

- No live homepage route changes.
- No returning-user state.
- No mobile-specific variant beyond basic responsive resilience.
- No generated data, Maze parser, Archscry flow, or Apocrypha content changes.

## Related Work

- VM-017 - Main Index Gateway Mockup Set.
- VM-005 - Archscry / Maze UX Continuity + Link Reliability.

## Testing Notes

- Open `mock_index.html` directly from disk for review.
- Confirm the logo SVG and existing background asset render.
- Confirm git diff contains no edits to production home files.

## Human Review

Yes - this is a local visual review sandbox.

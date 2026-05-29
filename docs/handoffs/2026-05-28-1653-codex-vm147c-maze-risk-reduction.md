# 2026-05-28 16:53 - Codex - VM-147C Maze Risk Reduction

## Agent Name

Codex

## Task Requested

Implement VM-147C as a conservative Maze-only route CSS/JS risk-reduction slice, preserving Maze parser/search, exact-name modal, stash, Archscry handoff, route boot, Scryfall fetch/cache/dedupe, storage, and shared-system contracts.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1452-codex-vm147b-archscry-risk-reduction.md`
- `docs/handoffs/2026-05-28-0849-codex-vm022-final-diagnostics-closeout.md`
- `docs/handoffs/2026-05-27-1022-codex-vm150-dossier-maze-path-differentiation.md`
- `docs/handoffs/2026-05-27-1943-codex-vm151-adjacent-dossier-maze-handoff-refresh.md`
- `docs/handoffs/2026-05-27-0837-codex-vm012-maze-cache-boot-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `package.json`

## Files Changed

- `assets/css/maze.css`
- `research/research-init.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/done/VM-147C-maze-route-css-js-risk-reduction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1653-codex-vm147c-maze-risk-reduction.md`

## What Changed

- Confirmed `maze/index.html` still loads the current Maze CSS and JS asset stack and left route markup unchanged.
- Added route ownership and section comments to `assets/css/maze.css` without moving selectors or changing declarations.
- Scanned for byte-identical duplicate CSS blocks and found no safe removal candidate, so no CSS declarations were removed.
- Added a VM-147C ownership map and section comments to `research/research-init.js` without moving functions or changing executable JavaScript.
- Added a VM-147C Maze manual QA checklist covering boot, modes, Query Inspector, launch URLs, Archscry handoff/return, adjacent-fit paths, modal focus/inert behavior, stash export/clear, reduced motion, and responsive overflow.
- Created the VM-147C done card, updated the board, and updated the VM-147 umbrella while leaving the umbrella open.

## Why It Changed

Maze is a high-coupling route where CSS organization and JS ownership clarity reduce maintenance risk, but runtime behavior is protected by VM-022 query contracts, VM-150/VM-151 handoff continuity, and VM-012 boot regressions. This pass clarified ownership without widening into product logic or shared-system changes.

## Decisions Made

- Treated `research/research-init.js` as comment-only.
- Did not remove CSS unless it was byte-identical and cascade-safe; the duplicate scan found no qualifying blocks.
- Kept `maze/index.html` verification-only.
- Kept `VM-147` open as the route-risk umbrella.
- Did not update `docs/architecture/route-ownership-matrix.md` because no boundary changed.

## Risks / Uncertainties

- Maze still has no dedicated visual regression script in `package.json`.
- Future Maze cleanup should remain behavior-specific and contract-tested before any executable JS or cascade-sensitive CSS changes.

## Tests Run

- `node --check research/research-init.js` - pass.
- `node --check research/maze-search-tests.js` - pass.
- `node research/maze-query-contract-tests.js` - pass.
- `node research/maze-search-tests.js` - pass.
- `npm.cmd run test:parser` - pass; 115 parser cases.
- `npm.cmd run lint:js` - pass.
- `npm.cmd run lint:html` - pass.
- `npm.cmd run test:frontend-smoke` - pass.
- `npm.cmd test` - pass.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - pass; Git reported LF-to-CRLF working-copy normalization warnings only.
- Human manual testing - reported good after implementation.

## Not Touched

- `maze/index.html` route markup and asset stack
- Parser/search behavior
- Exact-name modal behavior
- Stash keys, payload shape, export headings, and drawer behavior
- Archscry handoff key, payload shape, return banner behavior, and dossier path factory
- Scryfall fetch/cache/dedupe behavior
- Route boot sequencing
- `assets/js/maze-handoff.js`
- `research/maze-query-core.js`
- `research/research-search.js`
- `research/research-ui.js`
- Shared CSS/JS systems

## Follow-Up Recommendations

- Keep any future Maze cleanup in small behavior-specific cards with focused regression coverage.
- Consider a dedicated Maze visual regression harness as a future testing improvement if Maze CSS starts changing beyond comments.

## Next Suggested Agent

Test Strategist if a future Maze visual regression harness is prioritized.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-147C-maze-route-css-js-risk-reduction.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/route-ownership-matrix.md`

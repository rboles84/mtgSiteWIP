# 2026-05-26 23:12 - Codex - VM-143 Route Ownership Matrix

## Agent name

Codex as Planning Architect

## Task requested

Implement the frontend state audit plan by creating a route ownership matrix, opening focused follow-up Kanban cards, updating documentation indexes, and recording the required handoff without changing runtime code.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent frontend handoffs from VM-116 through VM-142
- `docs/kanban/board.md`
- `docs/kanban/done/VM-142-maze-strategium-glass-unification.md`
- `docs/handoffs/2026-05-26-2308-codex-vm142-maze-strategium-glass.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/spec-index.md`
- `docs/reference/README.md`
- `docs/reference/manual-test-cases.md`
- `docs/research/webdev/generic-webdev/`
- Public route HTML files
- Shared and route-local frontend CSS/JS entrypoints
- `package.json`
- `scripts/validate-frontend-html.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/frontend-smoke.mjs`

## Files changed

- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/spec-index.md`
- `docs/reference/README.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-143-frontend-route-ownership-matrix.md`
- `docs/kanban/backlog/VM-144-stale-preview-asset-archive-audit.md`
- `docs/kanban/backlog/VM-145-legal-page-css-extraction.md`
- `docs/kanban/backlog/VM-146-cdn-font-dependency-review.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2312-codex-vm143-route-ownership-matrix.md`

## What changed

- Added `docs/architecture/route-ownership-matrix.md` as the working map for public route ownership.
- Documented each route's purpose, entry HTML, CSS stack, JS entrypoints, data dependencies, browser storage keys, external services, generated-file usage, smoke/manual tests, known risks, and do-not-touch boundaries.
- Added the explicit qualifier that generic webdev research should guide selective enhancements, not a repo-wide modernization mandate.
- Linked the matrix from the docs README and spec index, and added a maintenance rule for future route ownership changes.
- Created completed card VM-143 for the matrix work.
- Created backlog cards VM-144 through VM-147 for stale preview asset archival, legal-page CSS extraction, CDN/font dependency review, and large route CSS/JS risk reduction.
- Updated the Kanban board while preserving the concurrent VM-142 completion entry.

## Why it changed

The user wanted the frontend audit plan turned into a durable documentation artifact and coordination trail, with enough route-level ownership detail to prevent future branches from accidentally treating the audit as permission for broad modernization work.

## Decisions made

- Placed the matrix under `docs/architecture/` because it maps route ownership and shared-system boundaries.
- Treated route-contract documentation as delivered by VM-143, with implementation work split into separate backlog cards.
- Kept follow-up cards narrow so stale assets, legal CSS, external dependencies, and large CSS/JS reduction can be reviewed independently.
- Did not modify runtime code, generated JSON, route HTML, visual baselines, Supabase contracts, placement logic, precon ranking, or VM-142 Maze CSS work.
- Preserved the concurrent VM-142 board and handoff changes instead of trying to rewrite or reorder them beyond adding VM-143 above them chronologically.

## Risks / uncertainties

- The matrix is a snapshot of the current working tree and should be updated whenever route ownership changes.
- Some suspected stale preview assets may be intentional archives; VM-144 requires proof before archival.
- Legal CSS extraction should remain presentation-only because policy copy is sensitive.
- CDN/font review can affect privacy, performance, and visuals, so VM-146 should remain analysis-first.
- Large route CSS/JS reduction can easily drift into broad modernization; VM-147 must stay route-scoped.
- The worktree also contains VM-142 changes to `assets/css/maze.css`, `docs/reference/manual-test-cases.md`, and the VM-142 handoff/card, which were not part of this task.

## Tests run

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run dossier:audit`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- Runtime HTML/CSS/JS route behavior
- `assets/css/maze.css` and VM-142 visual changes
- Generated JSON and generated schemas
- Placement scoring and adaptive model behavior
- Precon source data, generated precon catalog, schema, and ranking math
- Supabase schema, edge function behavior, and saved-profile contracts
- Visual baselines and browser screenshots
- MTG lore, card facts, commander facts, and route-facing product decisions

## Follow-up recommendations

- Use `docs/architecture/route-ownership-matrix.md` as the first stop before any public route frontend work.
- Start with VM-144 if the team wants cleanup without runtime behavior changes.
- Keep VM-145, VM-146, and VM-147 as separate cards so presentation extraction, dependency review, and route-size risk reduction do not collapse into one broad refactor.
- Update the matrix in the same branch as any future route ownership change.

## Next suggested agent

Documentation Steward

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-143-frontend-route-ownership-matrix.md`
- `docs/kanban/backlog/VM-144-stale-preview-asset-archive-audit.md`
- `docs/kanban/backlog/VM-145-legal-page-css-extraction.md`
- `docs/kanban/backlog/VM-146-cdn-font-dependency-review.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/research/webdev/generic-webdev/`

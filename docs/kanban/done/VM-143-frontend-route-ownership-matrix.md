# VM-143 - Frontend Route Ownership Matrix

ID: VM-143
Title: Frontend Route Ownership Matrix
Status: done
Type: Documentation / Audit
Area: Frontend Architecture, Documentation
Priority: medium
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Created a route ownership matrix for the public Vox Mana frontend so future branches can see what each route owns, what shared systems it consumes, and what should not be changed without explicit scope.

## Source

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent frontend handoffs from VM-116 through VM-142
- `docs/kanban/board.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/research/webdev/generic-webdev/`

## Acceptance Criteria

- The matrix covers each public route: Home, Preview Home, Archscry, Maze, Strategium, Apocrypha, Library alias, Privacy, and Terms.
- Each route records page purpose, entry HTML, CSS stack, JS entrypoints, data dependencies, browser storage keys, external services, generated files used, smoke/manual tests, known risks, and do-not-touch boundaries.
- The matrix states that generic webdev research is a source for selective enhancements, not a repo-wide modernization mandate.
- The matrix is linked from the docs README and spec index.
- Follow-up Kanban cards exist for stale preview asset archival, legal-page CSS extraction, CDN/font dependency review, and large route CSS/JS risk reduction.
- Runtime code, generated data, route markup, visual baselines, and VM-142 Maze work are not modified by this card.

## Verification

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run dossier:audit`

## Notes

- This is a documentation and coordination card, not an implementation branch.
- The matrix should be updated whenever public route ownership, shared dependencies, storage keys, generated-file usage, external services, or protected boundaries change.

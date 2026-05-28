# VM-150 - Dossier Maze Path Differentiation

ID: VM-150
Title: Dossier Maze Path Differentiation
Status: done
Type: UX / Runtime
Area: Archscry, Maze
Priority: high
Created: 2026-05-27
Updated: 2026-05-27

## Summary

Repair the Archscry-to-Maze dossier path experience so the four Maze paths feel mechanically and textually distinct for any dossier or placement result.

## Source

- User report on 2026-05-27: Dossier Maze paths and Maze "From Your Dossier" paths feel oddly the same.
- VM-005 established the Archscry-to-Maze handoff fields.
- VM-012 closed parser/data/diagnostics and repaired Maze boot, but did not redesign dossier path generation.

## Acceptance Criteria

- Dossier-generated Maze paths have four stable lanes: commander candidates, noncommander support, flavor/story echoes, and outside-color commander stretch.
- The four lanes produce distinct operator queries and distinct authored Plain Reading text.
- Maze "From Your Dossier" sidebar paths seed both raw operator syntax and authored Plain Reading copy.
- Syntax-to-plain translation correctly handles `ci<=` / `id<=`, negated color identity, negated type filters, `-is:commander`, and `ft:` groups.
- Existing handoff fields remain stable: `plainReadingQuery`, `operatorQuery`, `pathType`, and `returnUrl`.

## Guardrails

- Do not start VM-022.
- Do not redesign Maze.
- Do not change stash or modal contracts.
- Do not add network-backed parsing, downloads, or remote validation.
- Do not alter placement scoring.

## Files Impacted

- `assets/js/maze-handoff.js`
- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `research/research-syntax-language.js`
- `assets/js/quick-reading-tests.js`
- `research/maze-search-tests.js`
- `research/research-syntax-language-tests.js`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`

## Tests

- `node --check assets/js/maze-handoff.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/research-init.js`
- `node --check research/research-syntax-language.js`
- `node --check research/research-syntax-language-tests.js`
- `node --check research/maze-search-tests.js`
- `node research/research-syntax-language-tests.js`
- `node assets/js/quick-reading-tests.js`
- `node research/maze-search-tests.js`
- `npm.cmd run test:parser`
- `npm.cmd test`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`

## Human Review

Yes - compare at least one mono-color and one two-color dossier round trip to ensure the paths no longer read as the same search.

## Completion Note

Completed on 2026-05-27. The implementation handoff is `docs/handoffs/2026-05-27-1022-codex-vm150-dossier-maze-path-differentiation.md`.

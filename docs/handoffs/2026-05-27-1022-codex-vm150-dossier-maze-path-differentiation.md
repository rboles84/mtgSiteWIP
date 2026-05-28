# 2026-05-27 10:22 - Codex - VM-150 Dossier Maze Path Differentiation

## Agent Name

Codex

## Task Requested

Repair the Dossier-to-Maze continuity issue where four differently named dossier paths shared the same broad Oracle cluster and where raw syntax translated into misleading Plain Reading text.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md`
- `docs/handoffs/2026-05-25-2318-codex-vm132-archscry-dossier-ux-polish.md`
- `docs/handoffs/2026-05-27-0814-codex-vm012-parser-diagnostics-closeout.md`
- `docs/handoffs/2026-05-27-0837-codex-vm012-maze-cache-boot-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-006-archscry-maze-verification-repeat-visit-polish.md`
- `docs/kanban/backlog/VM-007-commander-dossier-quality-link-follow-up.md`
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

## Files Changed

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
- `docs/kanban/board.md`
- `docs/kanban/done/VM-150-dossier-maze-path-differentiation.md`
- `docs/kanban/in-progress/VM-150-dossier-maze-path-differentiation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-1022-codex-vm150-dossier-maze-path-differentiation.md`

## What Changed

- Added a shared deterministic dossier path factory in `assets/js/maze-handoff.js` that emits four stable lanes: commander candidates, noncommander support, flavor/story echoes, and outside-color commander stretch.
- Rewired Archscry dossier links to use the shared factory while preserving `plainReadingQuery`, `operatorQuery`, `pathType`, and `returnUrl`.
- Rewired Maze "From Your Dossier" sidebar buttons to use the same factory and carry authored Plain Reading copy through mode switching.
- Updated the raw syntax translator for `ci<=` / `id<=`, negated identity, `-t:legendary`, `-is:commander`, `is:commander`, and `ft:` terms.
- Added regression coverage for unique path types, unique operator queries, distinct authored Plain Reading copy, Maze sidebar seed behavior, and syntax translation.
- Updated architecture/manual QA docs and moved VM-150 to done.

## Why It Changed

The old dossier lanes looked different in labels but searched the same broad Oracle term group, which made Maze feel like it was offering one path in four costumes. The new shared factory keeps the existing handoff shape but gives each lane a distinct operator intent and explicit human-readable Plain Reading text.

## Decisions Made

- Kept this as a focused Archscry/Maze continuity repair, not VM-022 or a Maze redesign.
- Used the existing Maze handoff layer as the shared boundary so Archscry and Maze cannot drift into separate path recipes again.
- Authored Plain Reading strings directly for dossier paths instead of relying only on reverse translation from raw syntax.
- Kept deterministic local fallbacks for oracle and flavor signals when a dossier lacks enough tags.

## Risks / Uncertainties

- Human review should still compare one mono-color and one two-color dossier round trip to confirm the new path differentiation feels right in the live UI.
- In-app Browser QA was attempted after the automated checks, but the browser connection failed during setup in this environment. Automated Maze DOM coverage and frontend smoke checks are the verification source for this pass.
- The working tree already contained unrelated VM-012, VM-088, and VM-149 changes. This handoff covers only the VM-150 continuity repair and closeout.

## Tests Run

- `node --check assets/js/maze-handoff.js` - passed.
- `node --check assets/js/archscry-presentation.js` - passed.
- `node --check assets/js/quick-reading-tests.js` - passed.
- `node --check research/research-init.js` - passed.
- `node --check research/research-syntax-language.js` - passed.
- `node --check research/research-syntax-language-tests.js` - passed.
- `node --check research/maze-search-tests.js` - passed.
- `node research/research-syntax-language-tests.js` - passed, 14 syntax language cases.
- `node assets/js/quick-reading-tests.js` - passed, 20 factions and 20 golden paths.
- `node research/maze-search-tests.js` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `npm.cmd test` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- In-app Browser QA - attempted, blocked by local browser setup failure.

## Not Touched

- No VM-022 work.
- No Maze redesign, new panels, new routes, or visual-system changes.
- No stash or modal contract changes.
- No parser architecture extraction.
- No network-backed parsing, Scryfall downloads, or remote validation.
- No placement scoring changes.
- No unrelated VM-012, VM-088, or VM-149 changes were reverted.

## Follow-Up Recommendations

- Use the VM-150 manual QA notes to compare one mono-color and one two-color dossier in browser.
- Keep future dossier path edits inside the shared handoff helper so Archscry and Maze remain aligned.

## Next Suggested Agent

Human review

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-150-dossier-maze-path-differentiation.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`

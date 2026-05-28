# 2026-05-27 08:14 - Codex - VM-012 Parser Diagnostics Closeout

## Agent Name

Codex

## Task Requested

Finish VM-012 as an independent Scryfall parser expansion and diagnostics pass without starting VM-022, redesigning Maze, changing stash/modal contracts, or adding network-backed parsing or validation.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-0021-codex-scryfall-dictionary-robustness-expansion.md`
- `docs/handoffs/2026-05-17-0040-codex-vm012-showkwsuggestions-blocker-fix.md`
- `docs/handoffs/2026-05-17-0043-codex-vm012-shared-maze-query-handoff-helper.md`
- `docs/handoffs/2026-05-17-0121-codex-plain-reading-operator-hand-translation-tests.md`
- `docs/handoffs/2026-05-17-0130-codex-vm012-checkpoint-save-before-vm022.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
- `research/scryfall-parser.js`
- `research/scryfall-dictionary.js`
- `research/scryfall-parser-tests.js`
- `research/research-init.js`
- `research/research-ui.js`
- `research/maze-search-tests.js`

## Files Changed

- `research/scryfall-dictionary.js`
- `research/scryfall-parser.js`
- `research/research-init.js`
- `research/research-ui.js`
- `research/scryfall-parser-tests.js`
- `research/maze-search-tests.js`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/kanban/in-progress/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-0814-codex-vm012-parser-diagnostics-closeout.md`

## What Changed

- Added final VM-012 parser coverage for `crew`, `blood token sacrifice`, dictionary-backed `wizard`/`soldier` subtype lookup, `prowess`, `first strike`, and Commander format combinations.
- Added `getScryfallDictionaryVocabulary()` to expose deterministic local keyword, subtype, card type, and format vocabulary from the checked-in parser dictionary.
- Wired Loom keyword autocomplete to dictionary-derived vocabulary while preserving every legacy keyword suggestion.
- Added warnings for unresolved meaningful terms and ambiguous alternative parses without changing the parser result shape.
- Rendered parser warnings inside the existing Query Inspector diagnostics area.
- Moved VM-012 from in-progress to done and updated architecture/docs to describe local deterministic vocabulary and the completed parser/data/diagnostics scope.

## Why It Changed

VM-012 still carried open acceptance criteria for local validation/autocomplete data and diagnostics even though earlier parser slices were complete. This closeout finishes those criteria without expanding into Maze core extraction, visual redesign, Scryfall bulk/network validation, or interaction-model changes.

## Decisions Made

- Treated `sacrifice` as Oracle text intent (`o:sacrifice`), not keyword/type/subtype/format vocabulary.
- Used the checked-in parser seed plus dictionary as the approved local deterministic data source.
- Kept diagnostics on the existing parser fields: `confidence`, `recognized`, `assumptions`, `unresolved`, `alternatives`, and `warnings`.
- Preserved legacy Loom keyword suggestion coverage through merge/fallback behavior and a parser test parity assertion.

## Risks / Uncertainties

- Confidence scoring remains heuristic; some valid Oracle-only searches can still receive low-confidence warnings until a future scoring pass tunes those weights.
- The in-app Browser QA attempt could not run because the browser runtime repeatedly exited during setup; automated parser, DOM harness, lint, and smoke coverage passed.
- The working tree already contained unrelated active VM-149 and VM-088 changes; this handoff only covers the VM-012 closeout.

## Tests Run

- `node --check research/scryfall-parser.js` - passed.
- `node --check research/scryfall-dictionary.js` - passed.
- `node --check research/research-init.js` - passed.
- `node --check research/research-ui.js` - passed.
- `node --check research/scryfall-parser-tests.js` - passed.
- `node --check research/maze-search-tests.js` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `node research/maze-search-tests.js` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- Browser QA attempted against local Maze server; blocked by in-app browser runtime setup failure.

## Not Touched

- No VM-022 implementation.
- No Maze visual redesign or CSS ownership change.
- No new routes, panels, or interaction models.
- No stash, modal, or Archscry handoff contract changes.
- No Scryfall bulk download logic, runtime fetches, generated remote cache files, or network-backed validation.
- No parser architecture extraction or full query-language rewrite.
- No unrelated VM-149 or VM-088 changes were reverted.

## Follow-Up Recommendations

- If future usage shows too many low-confidence warnings for valid Oracle-only searches, tune confidence scoring as a separate narrow parser-quality card.
- Keep future Maze parser extraction work under VM-022 or a successor card, using VM-012 tests as the regression floor.

## Next Suggested Agent

Human review

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/kanban/board.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/route-ownership-matrix.md`

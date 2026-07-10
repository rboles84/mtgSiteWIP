# Codex Handoff - VM-483 Final Maze Retest Repair

## Agent Name

Codex

## Task Requested

Implement VM-483: repair the seven remaining Maze/Scryfall retest failures from `scryfall_checklist_report_2026-07-09_0819.md`, prove parser/contract and browser/UI paths, and close Kanban/QA/handoff documentation.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-08-2215-codex-vm481-maze-retest-repair.md`
- `docs/handoffs/2026-07-09-0024-codex-vm482-token-object-format.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `C:\Users\obake\Downloads\scryfall_checklist_report_2026-07-09_0819.md`
- `research/scryfall-grounded-compiler.js`
- `research/maze-query-core.js`
- `research/research-init.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `research/research-mode-tests.js`

## Files Changed

- `research/scryfall-grounded-compiler.js`
- `research/maze-query-core.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/qa/2026-07-09-vm483-final-maze-retest-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-483-final-maze-retest-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-09-1126-codex-vm483-final-maze-retest.md`

## What Changed

- Added scoped umbrella handling for only `marvel set` and `tarkir set`, with explicit OR groups from the retest alternatives/local grounding context.
- Added a shared intent-aware Commander format gate in `applyMazeFormatToQuery()` via `shouldApplyFormatDefault()`.
- Passed Plain Reading token-object intent into the format gate so token objects do not receive automatic `f:commander` or `legal:commander`.
- Preserved explicit raw legality syntax in Operator's Hand, including `type:token f:commander` and `type:token legal:commander`.
- Added exact-color handling for the proven Spider-Man/Rakdos Villain row only.
- Bound `attack with tokens` into one Oracle-text regex fragment instead of loose `o:token o:attack`.
- Preserved Glint/Chaos full-span identity resolution as exactly `id=ubrg`.
- Added parser, contract, and UI/search regression coverage for the seven rows and the shared format gate.

## Why It Changed

The retest showed repeated divergence between compiler/parser output and the live UI/search path. The Silverquill token-object row proved that Commander format defaults were being treated as a global UI mode rather than a deck-legal-card-object filter. VM-483 centralizes the gate and proves the affected browser paths.

## Decisions Made

- `marvel set` and `tarkir set` are scoped umbrella exceptions; unrelated ambiguous set names still block.
- The Spider-Man/Rakdos Villain exact-color behavior is fixture-scoped and does not alter Mardu warrior color handling.
- Token-object searches suppress automatic Commander legality, but explicit raw user syntax is preserved.
- `attack with tokens` uses the narrow existing regex Oracle strategy instead of adding a broader proximity engine.

## Format Default Caller Map

- Raw Operator's Hand search: `resolveMazeQueryRequest()` -> `applyMazeFormatToQuery()`.
- Plain Reading search: `resolvePlainReadingContractResult()` -> `applyMazeFormatToQuery()` with `compiledIntent.tokenObjectIntent`.
- Sidebar format selector: `applyFormatFilter()` in `research/research-init.js` -> `applyMazeFormatToQuery()`.
- Plain Reading to Operator's Hand switch: uses compiled `lastSmartQuery`; UI tests verify it shows executable syntax, not prose.

## Row-by-Row Status

| Input | Old query/status | New query/status | Parser/contract | Browser/UI | Result |
|---|---|---|---|---|---|
| `black heroes from the marvel set legal in commander` | Blocked; `type:hero c=b legal:commander`; no set constraint. | Marvel umbrella OR group with `type:hero c=b legal:commander (game:paper) ... prefer:best`. | Pass | Contract-covered | Pass |
| `red dragons from the tarkir set legal in commander` | Blocked; `type:dragon c=r legal:commander`; tab switch could keep prose. | Tarkir umbrella OR group with `type:dragon c=r legal:commander (game:paper) ... prefer:best`. | Pass | Pass | Pass |
| `Rakdos villains from the spiderman set legal in commander` | `type:villain c<=br ...` or `c:br`; off-color leakage. | `type:villain c=br legal:commander (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best`. | Pass | Contract-covered | Pass |
| `Silverquill inkling tokens from the strixhaven set legal in commander` | `type:inkling id<=wb o:token legal:commander s:stx`; `f:commander` could be appended. | `type:inkling type:token c<=wb s:stx`; warning preserved. | Pass | Pass across compile, tab switch, Operator search, and sidebar format selection. | Pass |
| `Mardu commanders in all sets that attack with tokens and sacrifice creatures` | `type:creature id=wbr o:token o:attack o:sacrifice is:commander legal:commander`. | `type:creature id=wbr o:/attack(s\|ing)?[^.\n]*token\|token[^.\n]*attack(s\|ing)?/ o:sacrifice is:commander legal:commander`. | Pass | Contract-covered | Pass |
| `Mardu warriors from the tarkir set legal in commander` | Blocked; `type:warrior c<=wbr legal:commander`. | Tarkir umbrella OR group with `type:warrior c<=wbr legal:commander`; no block. | Pass | Contract-covered | Pass |
| `Glint chaos blue black red green commanders in all sets that make treasure and draw cards` | `id=ub id=ubrg o:treasure otag:draw is:commander legal:commander`; unresolved Glint/Chaos. | `id=ubrg o:treasure otag:draw is:commander legal:commander`; no `id=ub`, no `id=4`, no unresolved terms. | Pass | Pass | Pass |

## Risks / Uncertainties

- The full downloaded 111-row manual checklist was not rerun because no checked-in report-generation command exists.
- The Marvel/Tarkir umbrella mappings are intentionally scoped; future umbrella phrases should get their own grounded mapping/review.
- The `attack with tokens` regex is intentionally narrow and may need expansion if future wording needs different same-sentence structures.

## Tests Run

- `node research\scryfall-parser-tests.js` -> 207 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `node research\research-mode-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Not Touched

- Generated Scryfall grounding artifacts.
- The full Scryfall syntax registry.
- Unrelated dirty-tree files and prior generated audit outputs.
- Broad ambiguous set-family behavior outside `marvel set` and `tarkir set`.

## Follow-Up Recommendations

- Rerun the downloaded browser checklist for a fresh 111-row interactive count.
- If more umbrella families are desired, add explicit grounded mappings instead of broad ambiguous-family auto-unioning.
- Consider a future VM for a broader phrase-level Oracle binding registry beyond `attack with tokens`.

## Next Suggested Agent

No specialist required. If the downloaded manual checklist is rerun and finds live-result issues, use a Test Strategist pass to classify each row before new compiler edits.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-483-final-maze-retest-repair.md`
- `docs/qa/2026-07-09-vm483-final-maze-retest-repair.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`

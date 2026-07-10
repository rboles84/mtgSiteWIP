# Codex Handoff - VM-484 Token Object Regression Hardening

## Agent Name

Codex

## Task Requested

Add new tests around the VM-483 token-object Commander format gate so the `f:commander` / token-object regression cannot resurface.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-09-1126-codex-vm483-final-maze-retest.md`
- `docs/kanban/board.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `research/scryfall-grounded-compiler.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`

## Files Changed

- `research/scryfall-grounded-compiler.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-484-token-object-regression-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-09-1211-codex-vm484-token-object-regression-hardening.md`

## What Changed

- Added parser regression fixtures for `pest tokens`, `treasure tokens`, `cards that create tokens`, `cards that create creature tokens`, and `cards that make tokens`.
- Added contract tests for grouped `type:token`, grouped `t:token`, double-grouped token clauses, negated `-t:token`, `oracle:token`, quoted token values, and Plain Reading token-maker card searches.
- Added UI/search tests proving raw token objects do not get `f:commander`, token-maker raw Oracle text still does, Plain Reading token makers compile to `o:token legal:commander`, and Plain Reading token objects keep the token-object warning.
- Added a narrow token-maker context guard so `create tokens` / `make tokens` is not consumed by token-object subtype detection.

## Why It Changed

The new probes showed a real gap: `cards that create tokens legal in commander` could be misclassified as token objects because the token-object detector read `create tokens` as a subtype-token phrase. The added tests now pin the intended split between token objects and cards that make tokens.

## Decisions Made

- Token-object phrases remain object/subtype-specific: `pest tokens`, `treasure tokens`, `type:token`, `t:token`.
- Token-maker verbs near `tokens` (`create`, `make`, `produce`, `generate`) suppress token-object subtype detection and allow semantic token-making card search.
- No broad object-legality registry was added.
- Explicit raw legality syntax remains preserved by VM-483 behavior.

## Risks / Uncertainties

- The token-maker verb list is intentionally small and may need future expansion for uncommon phrasing.
- Full downloaded manual checklist rerun remains outside this automated test-hardening pass.

## Tests Run

- `node research\scryfall-parser-tests.js` -> 212 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Not Touched

- Generated Scryfall grounding artifacts.
- Broad Commander legality rules beyond token-object/token-maker intent.
- Unrelated dirty-tree files.

## Follow-Up Recommendations

- Add more token-maker verb variants only when a concrete manual fixture needs them.
- Keep future tests paired: one positive token-object case plus one negative token-maker card case.

## Next Suggested Agent

No specialist required.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-484-token-object-regression-hardening.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`

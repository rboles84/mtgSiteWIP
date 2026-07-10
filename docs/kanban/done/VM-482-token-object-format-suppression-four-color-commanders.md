# VM-482 - Token Object Format Suppression And Four-Color Commander Grammar

ID: VM-482
Title: Token Object Format Suppression And Four-Color Commander Grammar
Status: Complete
Area: Maze, Scryfall query core, Plain Reading compiler, tests, docs
Owner: Codex
Created: 2026-07-09
Completed: 2026-07-09

## Summary

Fixed two Maze/Scryfall issues from the July 8 23:37 retest:

- Token-object queries such as `type:inkling type:token c<=wb s:stx` no longer receive automatic Commander format defaults when searched from Operator's Hand.
- Generic four-color Commander phrasing now compiles to Scryfall's identity-count syntax: `id=4 is:commander legal:commander`.

## Completed Scope

- Suppressed automatic format-default append only for exact positive token-object clauses such as `type:token` and `t:token`.
- Preserved normal format default behavior for `o:token`, quoted Oracle text, `st:token`, `include:extras`, plain token words, and negated token clauses.
- Preserved explicit user-provided format syntax in Operator's Hand.
- Reused the shared format helper for sidebar format changes.
- Added generic four-color Commander grammar while keeping named four-color identities such as Glint/Chaos exact.
- Kept generated grounding artifacts untouched.

## Validation

- `node research\scryfall-parser-tests.js` -> passed, 207 parser cases.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `node research\research-mode-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Follow-Up

- Re-run the downloaded browser checklist for a new manual pass/fail/untested count.
- Keep broader object-legality rules out of this VM unless another concrete retest failure proves they are needed.

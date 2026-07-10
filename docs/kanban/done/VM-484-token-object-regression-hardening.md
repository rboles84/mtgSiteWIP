# VM-484 - Token Object Regression Hardening

## Status

Done

## Summary

Added regression coverage around the VM-483 Commander format gate so token-object searches cannot silently regain `f:commander` / `legal:commander`, while token-maker card searches still receive normal Commander legality/default handling.

## Acceptance

- [x] Added contract tests for grouped/shorthand token-object clauses and negative token-maker/oracle controls.
- [x] Added parser tests proving subtype token phrases are token objects but `create/make tokens` card intent is not.
- [x] Added UI/search tests for raw token-object variants and token-maker card queries.
- [x] Kept runtime changes limited to the bug exposed by the new tests.
- [x] Ran focused Maze/Scryfall tests, `npm.cmd test`, and `git diff --check`.

## Tests

- `node research\scryfall-parser-tests.js` -> 212 parser cases passed.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

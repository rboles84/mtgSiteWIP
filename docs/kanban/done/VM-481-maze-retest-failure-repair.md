# VM-481 - Maze Retest Failure Repair

ID: VM-481
Title: Maze Retest Failure Repair
Status: Complete
Area: Maze, Plain Reading compiler, Scryfall parser, tests, docs
Owner: Codex
Created: 2026-07-08
Completed: 2026-07-08

## Summary

Repaired the Maze/Scryfall compiler semantics exposed by `scryfall_checklist_report_2026-07-08_1840.md`.

Retest baseline:

- Tested: 39 / 111
- Passed: 24
- Failed: 15
- Untested: 72

After VM-481, the 15 visible retest failures plus the hidden Glint negative regression are covered by deterministic parser/contract tests. No full browser checklist rerun command exists in the repo, so the manual after-count is recorded as deferred in `docs/qa/2026-07-08-vm481-scryfall-retest-after.md`.

## Completed Scope

- Built a working table of the 15 failed retest rows plus the hidden Glint negative regression before code edits.
- Repaired actual-card color grammar for exact single-color Commander-legal fixtures and named multicolor no-outside-color adjectives.
- Preserved Commander candidate exact identity, explicit mono deck-support exact identity, and non-mono deck-support fit identity.
- Repaired lifegain negation, recursion phrasing, counter-object wording, Glint/Chaos span priority, colorless commander plus colorless-mana intent, and token-object intent.
- Kept ambiguous set-family blocking intentional and classified those rows as expected-block.
- Preserved `legal:commander` as the current compiler legality syntax.

## Validation

- `node research\scryfall-parser-tests.js` -> passed, 202 parser cases.
- `node research\maze-query-contract-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `node research\research-mode-tests.js` -> passed.
- `npm.cmd run test:plain-reading-semantics` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Follow-Up

- Re-run the full downloaded manual checklist harness in a browser when product QA wants a new interactive 111-case count.
- Treat broader live-result quality questions as separate follow-up tickets, especially the five-color no-result and Mardu multi-face caveat cases.

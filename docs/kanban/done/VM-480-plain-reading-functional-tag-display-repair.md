# VM-480 - Plain Reading Functional Tag Display Repair

ID: VM-480
Title: Plain Reading Functional Tag Display Repair
Status: Done
Area: Maze, Plain Reading display translation, tests
Owner: Codex
Created: 2026-07-08

## Summary

Keep functional-tag syntax in executable Operator's Hand queries, but translate functional tags into human wording in Plain Reading. This is a display-only VM-479 follow-up, not a compiler or query-generation change.

## Pre-Flight Notes

- VM-479 repaired raw/display-normalized leakage for current field syntax but intentionally did not create a full Scryfall syntax display registry.
- The current compiler and semantic registry already prefer executable `otag:` fragments for concepts such as card draw, counterspells, ramp, board wipes, and mana rocks.
- The current reverse translator does not parse functional-tag aliases, so `otag:draw` falls through as `otag draw` in Plain Reading.
- Do not change executable query generation, semantic registry fragments, art-tag operators, or generated grounding artifacts.

## Scope

- Translate functional Oracle-tag display aliases into human Plain Reading phrases:
  - `otag:`
  - `function:`
  - `oracletag:`
- Preserve negation across all three aliases.
- Humanize unknown functional tags without leaking raw or display-normalized syntax.
- Extend the existing VM-479 Plain Reading leakage helper to cover these aliases.
- Leave `art:`, `atag:`, and `arttag:` out of VM-480.

## Planned Validation

- `node research\research-syntax-language-tests.js`
- `node research\research-mode-tests.js`
- `npm.cmd test`
- `git diff --check`

## Completion Notes

- Added display-only parsing for functional Oracle-tag aliases: `otag:`, `function:`, and `oracletag:`.
- Kept executable Operator's Hand generation unchanged; Maze still emits `otag:` where it already did.
- Known tags now render as human phrases such as `card draw`, `counterspells`, `ramp`, `board wipes`, `mana rock effects`, `treasure effects`, and `graveyard recursion effects`.
- Unknown functional tags are humanized by removing the field prefix and replacing hyphens/underscores with spaces, with `effects` added when natural.
- Negated functional tags render as exclusions.
- The VM-479 leakage helper now rejects raw and display-normalized functional-tag leakage for all three aliases.

## Validation

- `node --check research\research-syntax-language.js` -> passed.
- `node research\research-syntax-language-tests.js` -> passed, 22 syntax translation cases.
- `node research\research-mode-tests.js` -> passed, 9 mode cases and 12 leakage cases.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

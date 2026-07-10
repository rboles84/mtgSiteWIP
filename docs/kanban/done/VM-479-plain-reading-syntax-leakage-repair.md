# VM-479 - Plain Reading Syntax Leakage Repair

ID: VM-479
Title: Plain Reading Syntax Leakage Repair
Status: Done
Area: Maze, Plain Reading display translation, tests
Owner: Codex
Created: 2026-07-08

## Summary

Repair the Operator's Hand -> Plain Reading display translator so it no longer leaks raw Scryfall/control syntax or display-normalized syntax for the fields Maze currently emits or is likely to emit. This is not a full Scryfall syntax translator.

Executable Operator's Hand query generation must remain unchanged; VM-479 only changes Plain Reading display text.

## Pre-Flight Notes

- VM-477 established that set-family collapsing is UI/display-only while executable Scryfall syntax may remain raw `set:` / `s:` clauses.
- VM-478 restored the full suite after a stale display-copy assertion and reaffirmed that display copy should not drift into the wrong product positioning.
- Current failure is in `research/research-syntax-language.js`, the raw syntax -> Plain Reading translator used when switching from Operator's Hand to Plain Reading.
- Do not change Maze/Scryfall compiler query generation, generated grounding artifacts, or unrelated dirty-tree files.

## Scope

- Translate in-scope field syntax into natural Plain Reading text for current Maze/Operator's Hand output.
- Prevent raw and display-normalized leakage for type, color, identity, set/family, commander/legal/format, and display-control fields.
- Preserve identity operator meaning for `id=`, `id<=`, and `id>=`.
- Resolve known set codes and known set-family code groups to human labels.
- Allow `from set <unknownCode>` only when the set code is not known by the set display lookup.
- Keep Oracle, regex, artist, flavor, watermark, price, language, date/year, rarity, numeric-stat, and full Scryfall registry translation out of scope beyond what the current translator already handles.

## Planned Validation

- `node research\research-mode-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd test`
- `git diff --check`

## Completion Notes

- Added a limited Plain Reading syntax display layer for the Scryfall/control fields Maze currently emits from Operator's Hand.
- Preserved executable Operator's Hand query generation; raw syntax still appears when switching from Plain Reading back to Operator's Hand.
- Known set codes and product-family OR groups now render with human labels, while unknown set codes may use the intentional `from set <code>` fallback.
- Identity operators preserve meaning: exact, within, and including identity phrases are distinct.
- Future work may expand this into a broader Scryfall syntax display registry; VM-479 intentionally stayed scoped to current Maze/Operator's Hand leakage.

## Validation

- `node research\research-mode-tests.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

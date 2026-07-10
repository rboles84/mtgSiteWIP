# VM-477 - Maze Manual Checklist Repair

ID: VM-477
Title: Maze Manual Checklist Repair
Status: Complete
Area: Maze, Plain Reading, Scryfall parser, tests, docs
Owner: Codex
Created: 2026-07-07
Completed: 2026-07-07

## Summary

Repaired Maze/Scryfall manual checklist failures around Commander intent, color identity grammar, semantic negation, alternatives, and set-family explanations.

Manual checklist baseline before repair:

- Tested: 36
- Failed: 26
- Untested: 75

After repair automated regression artifact:

- Parser corpus: 186 tested, 0 failed
- Maze query contract: passed
- Maze search metadata/helper harness: passed
- Full original interactive HTML checklist rerun: intentionally deferred

## Completed Scope

- Bare commander candidate searches compile to `is:commander legal:commander` plus resolved semantic/type/text filters.
- `legendary creatures that can be commanders` preserves legendary creature intent and commander eligibility.
- Named, mono-color, and five-color Commander candidate phrases use exact identity.
- Includes-color Commander identity phrases use `id>=...`.
- Commander deck-support phrases use `id<=... legal:commander` only when an identity is present.
- Actual color adjective searches with Commander legality use card color, not Commander deck identity.
- Alternatives and zero-result relaxations now preserve the full normalized query model.
- Semantic negation targets resolved lifegain, ramp, counterspell, and keyword concepts.
- `counter spells` / `counterspells` and `counters` remain distinct intents.
- Set-family friendly names are UI/explanation only; executable Scryfall syntax may stay raw `set:` / `s:`.

## Validation

Passed:

- `node research\scryfall-parser-tests.js`
- `node research\maze-query-contract-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run test:plain-reading-semantics`
- `npm.cmd run lint:js`
- `git diff --check` with CRLF conversion warnings only

Attempted:

- `npm.cmd test` reached the VM-477 parser, builder, contract, syntax, mode, Maze search, and precon checks, then failed at the pre-existing Archscry Colorless follow-up assertion expecting `Big Mana deckbuilder lane` while actual output was `Colorless Commander decks | Big Mana catalog lane`.

Postscript: VM-478 resolved this stale Archscry assertion by updating the test to require `Big Mana catalog lane` and reject `deckbuilder` copy.

## Follow-Up

- Re-run the full `scryfall_manual_checklist2.html` browser harness and record new interactive pass/fail/untested counts.
- Archscry Colorless follow-up assertion resolved by VM-478.

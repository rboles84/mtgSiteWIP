# VM-475 - Keyword Coverage Parser Tests

Title: Keyword Coverage Parser Tests
Status: Done
Area: Maze, Plain Reading, Scryfall Parser, Tests

## Goal

Expand `research/scryfall-parser-tests.js` with compact keyword coverage for evergreen, newer, multi-word, punctuation, Commander-related, negated, and action/oracle-policy keyword phrases.

## Scope

- Add curated keyword parser fixtures.
- Add small parser fixes needed for multi-word keyword precedence and plural Commander candidate wording.
- Keep Scryfall grounding as canonical for keyword existence.
- Preserve existing Maze/Archscry behavior outside the focused parser surface.

## Acceptance

- `commanders with partner` compiles to `is:commander legal:commander kw:partner`.
- `doctor's companion`, `doctors companion`, `partner with`, and `partner-with` resolve as full keyword phrases.
- Negated keyword phrases serialize with `-kw:` where supported.
- Focused parser checks pass.

## Result

- Added `keywordAbilityCases` to the parser corpus with curated positives, Commander keyword cases, negated keyword cases, edge punctuation cases, and keyword-action/oracle-policy cases.
- Added a fixed catalog-smoke list for current Scryfall keyword abilities including `Mobilize`, `Exhaust`, `Harmonize`, `Ravenous`, `Job select`, `Web-slinging`, and `For Mirrodin!`.
- Updated the compiler to resolve exact keyword spans before type-line spans and fuzzy keyword matches after type-line spans.
- Updated Commander candidate intent to recognize `commanders with ...` and `commanders without ...`.
- Tokenization now uses the normalized alias surface, allowing `doctor's companion` and `doctors companion` to hit the same catalog keyword.

## Validation

- `node research\scryfall-parser-tests.js` - passed, 160 parser cases.
- `node --check research\scryfall-grounded-compiler.js` - passed.
- `node research\maze-query-contract-tests.js` - passed.

## Notes

- This card follows VM-471 through VM-473 and did not regenerate Scryfall grounding or change runtime catalog-fetch behavior.
- Full `npm test` was not run for this focused keyword slice; VM-472 documented an unrelated full-suite Archscry Colorless Big Mana label failure.

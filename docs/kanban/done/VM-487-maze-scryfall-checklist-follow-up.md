# VM-487 - Maze Scryfall Checklist Follow-up

## Status

Done

## Summary

Repair the five reproducible Maze Plain Reading defects from the 2026-07-09 Scryfall checklist review while preserving existing query modes, token-maker behavior, Commander identity rules, set umbrellas, and modal/Reading Finds boundaries.

## Scope

- Replace the fixture-specific Rakdos Villain exact-color rule with scoped named-multicolor actual-card pool semantics: `c<=<colors> -c:c`.
- Route token-object searches from resolved playable parent/product sets to locally grounded token child sets.
- Add a combined zero-result ability relaxation while keeping the strict Glint primary query.
- Correct `without mill` negation and redundant unresolved Commander-legality diagnostics.
- Add parser, contract, UI/search, browser, documentation, and manual QA coverage.

## Acceptance Criteria

- Rakdos Villains includes black, red, and black-red Villains while excluding colorless and outside colors.
- Commander candidates, deck-support searches, identity searches, exact-color wording, and single-color searches preserve their existing operators.
- Silverquill Inkling and Pest token-object searches use `s:tstx`; token-maker card searches remain on playable-card set constraints.
- Glint keeps its strict primary query and exposes `id=ubrg is:commander legal:commander` as the combined zero-result fallback without Partner expansion.
- `without mill` emits `-o:mill`, and redundant `legal in commander` wording does not appear unresolved.
- Targeted and full validation pass before the card moves to Done.

## Completion Notes

- Implemented all five repairs with scoped compiler paths and one curated semantic entry.
- Excluded substitute-card sets from inferred token children while preserving explicit token/substitute-set input.
- Added parser, contract, route UI, mode-switch, desktop/mobile Chromium, QA, contract, and manual coverage.
- Passed the full requested validation gate and live Scryfall sanity checks.
- Preserved the 72 untested report rows as deferred interactive work.

## Not In Scope

- Generated Scryfall grounding or live data changes.
- New parser modes, broad synonym expansion, or global set-family behavior.
- Reading Finds, Archscry handoffs, Maze layout, card modal, or mana-pip presentation.
- Interactive completion of the 72 checklist rows still marked untested.

## Related Work

- VM-483 Final Maze Retest Repair.
- VM-484 Token Object Regression Hardening.
- VM-485 Maze Modal Mana Pips.
- VM-448 Critical Browser E2E Smoke.

# Agent Handoff: Codex - Scryfall Dictionary Robustness Expansion

Date: 2026-05-17 00:21
Related Card: VM-012
Related Plan: Scryfall parser expansion and diagnostics
Status: Complete

## Agent Name

Codex

## Task Requested

Expand the Scryfall dictionary and parser coverage so Vox Mana can handle a much broader set of common variants, Commander shorthand, and corpus-derived query shapes, then extend `research/scryfall-parser-tests.js` to cover the consolidated corpus and include a manual testing plan.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1330-codex-vm021b-cache-scryfall-replies-and-parser-seed.md`
- `docs/handoffs/2026-05-16-1345-codex-vm021c-add-in-flight-request-dedupe-for-scryfall-calls.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/SCRYFALL_DATA_PIPELINE.md`
- `research/scryfall-dictionary.js`
- `research/scryfall-parser.js`
- `research/scryfall-parser-tests.js`
- `research/research-builder.js`
- `research/research-mode.js`
- `research/run-tests.js`
- `research/scryfall-parser-seed-2026.json`
- `C:\\Users\\obake\\Downloads\\vox_mana_scryfall_query_corpus_consolidated_expanded.md`
- `C:\\Users\\obake\\Downloads\\codex_implementation_strategy.md`

## Files Changed

- `research/scryfall-dictionary.js`
- `research/scryfall-parser.js`
- `research/scryfall-parser-tests.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-0021-codex-scryfall-dictionary-robustness-expansion.md`

## What Changed

- Expanded the dictionary with more Commander identity aliases, four-color nickname support, broader format aliases, and more corpus-shaped query phrases.
- Added stronger alias handling in the parser so color-word aliases can resolve before the generic color pass.
- Broadened normalization and stop-word handling so common deck/search noise does not unfairly tank confidence.
- Added corpus-driven parser tests for:
  - Commander shorthand and deck variants
  - Brawl, Pauper Commander, and four-color nickname queries
  - Board wipes, removal, tutor, graveyard hate, ETB creatures, and spellslinger payoffs
  - Counterspell, lifegain, and color-pie break searches
  - common card-intent queries like cantrips and mana dorks
- Updated test expectations to match the richer canonical queries the dictionary now produces.

## Why It Changed

The existing fallback map was too thin for the actual ways users talk about MTG searches. The corpus showed that a lot of high-value traffic comes from shorthand, archetype labels, and natural-language variants that should collapse to the same Scryfall intent.

## Decisions Made

- Kept the expansion conservative and high-signal rather than trying to enumerate every possible synonym.
- Preferred canonical query families and functional tags over one-off phrase guesses when the corpus supported them.
- Preserved parser compatibility by keeping the public parse contract intact while tightening internal alias handling and confidence scoring.
- Left the broader VM-012 diagnostics scope open, since this turn focused on the dictionary/parser/test expansion slice.

## Risks / Uncertainties

- The dictionary is broader now, but some terms may still need future tuning if they create false positives in real UI usage.
- Confidence scoring is still heuristic; it now behaves better for deck/search noise, but it is not a full semantic classifier.
- The full repository test suite still has an unrelated `showKwSuggestions` failure in `research/research-init.js`.

## Tests Run

- `node --check research/scryfall-dictionary.js` - passed.
- `node --check research/scryfall-parser.js` - passed.
- `node --check research/scryfall-parser-tests.js` - passed.
- `npm.cmd run test:parser` - passed, 111 parser cases passed.
- `npm.cmd test` - failed on an unrelated pre-existing `ReferenceError: showKwSuggestions is not defined` in `research/research-init.js` while running `maze-search-tests.js`.

## Not Touched

- No runtime routing or UI layout changes.
- No Scryfall fetch/cache logic changes.
- No bulk-data pipeline refactor.
- No Kanban card lifecycle move beyond keeping VM-012 visible as the parent diagnostics story.
- No unrelated docs outside the handoff index and this handoff record.

## Follow-Up Recommendations

- Add manual browser QA on the corpus-derived queries:
  - Commander shorthand and four-color nickname paths
  - Brawl / Pauper Commander / Duel Commander format phrases
  - Tutor, board wipe, graveyard hate, ETB, and spellslinger queries
  - color-pie break queries like green counterspells and red lifegain
- Revisit confidence scoring if new user searches surface repeated false negatives or overly low confidence on obvious deck intents.
- If the broader VM-012 story continues, finish the diagnostics layer so ambiguous parses produce a user-facing explanation path.

## Next Suggested Agent

Test Strategist

## Related Kanban Card, Docs, or Plans

- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/SCRYFALL_DATA_PIPELINE.md`
- `C:\\Users\\obake\\Downloads\\vox_mana_scryfall_query_corpus_consolidated_expanded.md`

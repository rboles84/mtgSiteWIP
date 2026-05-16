# VM-012 - Scryfall Parser Expansion and Diagnostics

ID: VM-012
Title: Scryfall Parser Expansion and Diagnostics
Status: backlog
Type: Data / Research
Area: Scryfall Data, Maze
Priority: low
Created: 2026-05-15

## Summary

Capture the next parser and indexing work for the Maze: broader Scryfall syntax coverage, local validation data, and diagnostics that explain ambiguous or low-confidence parses.

## Source

- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\03-parser-and-routing-logic\\scryfall-parser-seed-repository.md` - says bulk Oracle cards are for later autocomplete, dictionary validation, subtype lists, and local metadata.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\03-parser-and-routing-logic\\_index.md` - notes that The Loom should reuse the same parser rather than forking it.
- `docs/SCRYFALL_DATA_PIPELINE.md` - documents the current Scryfall indexing and data flow work already in repo.
- `research/scryfall-parser.js`, `research/scryfall-dictionary.js`, and `research/scryfall-parser-tests.js` - show the current parser and test surface that future diagnostics will build on.

## Acceptance Criteria

- Parser coverage expands to handle the next set of useful Scryfall syntax patterns and aliases.
- Bulk Oracle or equivalent local data can support autocomplete, validation, and subtype lookups.
- Low-confidence or ambiguous parses produce a useful diagnostic or explanation path.
- The parser stays local and deterministic rather than turning into a remote dependency.

## Dependencies / Related Work

- Bulk Oracle source or its local equivalent
- Parser tests and dictionary generation
- Maze search UI if diagnostics are surfaced to users

## Files Likely Impacted

- `research/scryfall-parser.js`
- `research/scryfall-dictionary.js`
- `research/scryfall-parser-tests.js`
- `scripts/build-scryfall-indexes.mjs`
- `docs/SCRYFALL_DATA_PIPELINE.md`

## Risks / Uncertainties

- Scryfall syntax breadth can expand quickly and needs a tight definition of done.
- Diagnostics can become noisy if confidence thresholds are not tuned well.
- Parser changes have cross-cutting effects on Maze search behavior.

## Implementation Prompt

Expand the Scryfall parser and local validation data so Maze can explain more queries and surface better diagnostics when parsing is uncertain.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The parser supports the intended syntax set and the tests cover the new cases.
- Diagnostics or fallback explanations are available for the ambiguous paths we care about.

## Human Review

Yes - this is a data and parser story with cross-cutting behavior, so it should be reviewed.

## Notes

Keep the focus on local deterministic parsing and diagnostics, not on turning Maze into a remote search service.

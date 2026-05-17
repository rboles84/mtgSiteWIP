# Agent Handoff: Codex - Plain Reading / Operator's Hand Translation Tests

Date: 2026-05-17 01:21
Related Card: VM-012
Related Plan: Plain Reading / Operator's Hand Translation Tests
Status: Complete

## Agent Name

Codex

## Task Requested

Expand the plain-reading vs Operator's Hand regression coverage so complex syntax-to-English translation cases stay structured, readable, and free of leaked operator syntax or malformed formatting.

## Files Reviewed

- `research/research-syntax-language-tests.js`
- `research/research-mode-tests.js`
- `research/research-syntax-language.js`
- `research/research-mode.js`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/method-reference.md`
- `docs/kanban/backlog/VM-022-maze-core-extraction.md`
- `C:\\Users\\obake\\Downloads\\vox_mana_scryfall_query_corpus_consolidated_expanded.md`

## Files Changed

- `research/research-syntax-language.js`
- `research/research-syntax-language-tests.js`
- `research/research-mode-tests.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-0121-codex-plain-reading-operator-hand-translation-tests.md`

## What Changed

- Added tokenizer support so regex-valued Scryfall terms remain atomic instead of being split on internal spaces.
- Added plain-English descriptions for positive and negated Oracle terms, including:
  - named-card regex
  - search-your-hand/library exclusions
  - draft exclusions
  - meld exclusions
  - deck-construction exceptions
  - graveyard self-name loops
  - named-creature attack/block restrictions
- Reordered translated phrase buckets so the resulting English reads more naturally.
- Expanded `research-syntax-language-tests.js` with:
  - the full corpus Operator's Hand regression fixture
  - a negated Oracle / regex exclusion case
  - a commander identity + format + rarity + mana case
  - explicit leak-safety assertions for syntax punctuation and operator prefixes
- Expanded `research-mode-tests.js` with a raw-to-ai mode-switch case that proves complex raw syntax is translated into clean plain reading.

## Why It Changed

The prior translation coverage only exercised simple examples and did not protect the most failure-prone paths. The corpus showed that the real risk is not just incorrect meaning, but leaking raw regex syntax, operator prefixes, or malformed fragments into the human-readable Plain Reading path.

## Decisions Made

- Kept the existing translation API shape intact.
- Focused on high-signal corpus fixtures rather than broad speculative coverage.
- Chose to improve the translator enough to make the tests meaningful, rather than freezing in tests that would accept broken output.
- Treated the Operator's Hand / Plain Reading split as a translation concern, not a parser rewrite.

## Risks / Uncertainties

- The translation layer is still intentionally heuristic, not a full Scryfall AST renderer.
- Some future regex patterns may need additional aliasing if they introduce new named-card or negation families.
- The tests enforce no leaked syntax punctuation for translated cases, but they do not validate every possible Scryfall operator family.

## Tests Run

- `node --check research/research-syntax-language.js` - passed.
- `node --check research/research-syntax-language-tests.js` - passed.
- `node --check research/research-mode-tests.js` - passed.
- `node research/research-syntax-language-tests.js` - passed.
- `node research/research-mode-tests.js` - passed.
- `npm.cmd test` - passed.

## Not Touched

- No parser seed, Scryfall dictionary, or search-result caching changes in this slice.
- No Maze routing changes.
- No Archscry behavior changes.
- No query-intelligence core extraction beyond the existing shared helper work.

## Follow-Up Recommendations

- If more regex-heavy Corpus rows appear, add them here first so the translator remains honest about what it can explain cleanly.
- When VM-022 resumes, reuse these tests as acceptance coverage for the shared query-intelligence contract.

## Next Suggested Agent

Planning Architect

## Related Kanban Card, Docs, or Plans

- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-022-maze-core-extraction.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`

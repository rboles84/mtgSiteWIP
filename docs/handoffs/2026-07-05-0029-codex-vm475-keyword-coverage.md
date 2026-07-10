# 2026-07-05 00:29 - Codex - VM-475 Keyword Coverage

## Agent Name

Codex

## Task Requested

Implement VM-475: expand `research/scryfall-parser-tests.js` with keyword coverage and apply only the small parser fixes needed for multi-word keyword precedence and plural Commander candidate wording.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-04-0045-codex-vm471-scryfall-grounding.md`
- `docs/handoffs/2026-07-04-0912-codex-vm472-robust-implicit-maze-compiler.md`
- `docs/handoffs/2026-07-04-0958-codex-vm473-mixed-mode-ambiguity-blocking.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `research/scryfall-parser-tests.js`
- `research/scryfall-grounded-compiler.js`
- `data/scryfall/grounding/scryfall-grounding.json`

## Files Changed

- `research/scryfall-parser-tests.js`
- `research/scryfall-grounded-compiler.js`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-475-keyword-coverage-parser-tests.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-05-0029-codex-vm475-keyword-coverage.md`

## What Changed

- Added a dedicated `keywordAbilityCases` suite covering evergreen, combat/evasion, newer/current, Commander-related, negated, punctuation, and action/oracle-policy keyword searches.
- Added a fixed catalog-smoke list that asserts selected current Scryfall keyword abilities exist in the grounding artifact and resolve through the parser.
- Changed keyword resolution to run exact keyword matches before type-line resolution and fuzzy keyword matches after type-line resolution.
- Changed tokenization to use the normalized alias surface so punctuation variants such as `doctor's companion` and `doctors companion` match the same catalog keyword.
- Extended Commander candidate detection to include `commanders with ...` and `commanders without ...`.
- Documented the keyword precedence rule in the Plain Reading deep dive.
- Moved VM-475 from In Progress to Done.

## Why It Changed

VM-472 made the compiler catalog-driven, but keyword behavior needed broader regression coverage. The added exact-before-type/fuzzy-after-type ordering lets long official keyword phrases like `Doctor's companion` and `Partner with` win without letting fuzzy keyword guesses steal real type/subtype terms such as `insect`.

## Decisions Made

- Scryfall grounding remains canonical for keyword existence; no grounding regeneration was performed.
- Keyword abilities serialize as `kw:` unless an existing compiler policy maps the phrase to Oracle text.
- `commanders with partner` and `commanders without partner` are Commander candidate searches, not generic support-card Commander legality.
- Fuzzy keyword matching stays enabled, but only after type-line terms have had first claim.

## Risks / Uncertainties

- The keyword smoke list is intentionally compact, not exhaustive across all Scryfall keyword abilities.
- Some action-like words remain governed by existing Oracle/registry policy rather than forced `kw:` serialization.
- Full `npm test` was not run for this focused slice; VM-472 documented an unrelated full-suite Archscry Colorless Big Mana label failure.

## Tests Run

- `node research\scryfall-parser-tests.js` - passed, 160 parser cases.
- `node --check research\scryfall-grounded-compiler.js` - passed.
- `node research\maze-query-contract-tests.js` - passed.
- `git diff --check` - passed with existing line-ending warnings only.

## Not Touched

- No Scryfall grounding regeneration.
- No runtime browser catalog fetching.
- No LLM fallback.
- No broad Maze UI redesign.
- No Archscry handoff behavior changes.
- No commits.

## Follow-Up Recommendations

- Add a larger invariant-only keyword corpus if manual testing turns up more common phrasings.
- Consider a separate VM for keyword actions vs keyword abilities policy, because Scryfall supports both `kw:` and Oracle-text paths depending on search intent.
- Keep expanding semantic-registry fixtures from real manual Plain Reading searches.

## Next Suggested Agent

Test Strategist or senior full-stack developer for the next parser corpus expansion pass.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-475-keyword-coverage-parser-tests.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`

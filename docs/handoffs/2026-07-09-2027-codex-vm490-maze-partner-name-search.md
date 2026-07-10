# VM-490 Maze Partner And Name Search Repair Handoff

## Agent name

Codex

## Task requested

Repair the manual Maze failure where `cards with partner in all colors` became a dead set/keyword query and gained `f:commander` in Operator's Hand, then repair the follow-up failure where bare card names such as Captain America and A-Alrund compiled to `*` or incidental type syntax.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-483, VM-484, VM-485, and VM-487 handoffs
- `docs/kanban/board.md` and related Maze cards
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/reference/manual-test-cases.md`
- Maze compiler, parser, query-core, mode, UI route, and browser smoke sources/tests

## Files changed

- `research/scryfall-grounded-compiler.js`
- `research/scryfall-parser.js`
- `research/maze-query-core.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/research-mode-tests.js`
- `research/maze-search-tests.js`
- `scripts/browser-smoke.mjs`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/reference/manual-test-cases.md`
- `docs/qa/2026-07-09-vm490-maze-partner-name-search-repair.md`
- `docs/kanban/done/VM-490-maze-partner-name-search-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Consumed `all colors` as an unconstrained color phrase before set resolution could interpret `all` as Alliances.
- Added a scoped generic-card Partner path that emits exactly `o:partner`.
- Prevented only the exact unscoped `o:partner` query from receiving the selected format default.
- Added a conservative bare-name fallback that emits `name:"..."` for unresolved two-word names and punctuation-bearing names otherwise reduced to one incidental type span.
- Kept bare names on `/cards/search` so Operator's Hand receives executable name syntax.
- Suppressed implicit format defaults for standalone/display-only name lookups while preserving normal behavior for mixed filters such as `name:"Token Collector" c:w`.
- Added parser, contract, mode, route UI, desktop/mobile browser, manual QA, and live Scryfall coverage.

## Why it changed

The original query was dead for two independent reasons: fuzzy set resolution treated `all colors` as the Alliances code, and the route-level format gate appended Commander after mode switching. The name failure came from a conservative unresolved-term guard that correctly avoided sending raw prose but had no executable fallback for likely card names.

## Decisions made

- Use Oracle text `o:partner` for generic cards that contain Partner, not Commander-candidate keyword syntax.
- Treat `all colors` as no color restriction, not five-color identity or a set.
- Use `name:"..."` for bare Plain Reading name searches, matching Scryfall's search syntax and preserving an editable Operator query.
- Keep explicit `!Name` and `card named Name` on the existing `/cards/named` modal path.
- Keep the name fallback deliberately narrow so arbitrary prose does not become a guessed name search.

## Risks / uncertainties

- Natural-language card-name detection remains intentionally conservative. Longer names without punctuation can still require explicit `name:"..."`, `!Name`, or `card named Name` syntax rather than risking broad false positives.
- Live Scryfall result membership is mutable; tests verify query construction and mocked execution, not fixed live counts.

## Tests run

- `node --check` for all changed JavaScript entry points and tests: passed.
- `npm.cmd run test:parser`: 226 cases passed.
- `node research\maze-query-contract-tests.js`: passed.
- `npm.cmd run test:mode`: passed.
- `node research\maze-search-tests.js`: passed.
- `npm.cmd run test:browser-smoke`: desktop and mobile passed.
- `npm.cmd run test:plain-reading-semantics`: passed.
- `npm.cmd run lint:js`: passed.
- `npm.cmd run lint:html`: passed.
- `npm.cmd run test:frontend-smoke`: passed.
- `npm.cmd test`: passed.
- Live Scryfall API checks for `o:partner`, `name:"Captain America"`, and `name:"A-Alrund, God of the Cosmos"`: nonzero results.
- `git diff --check`: passed.

## Not touched

- Generated Scryfall grounding and live Scryfall data.
- Reading Finds storage or behavior.
- Archscry handoff contracts.
- Maze layout, card modal presentation, and VM-485 mana pips.
- Unrelated dirty files in the shared worktree.

## Follow-up recommendations

- Keep collecting real card-name misses before broadening the fallback. Add only shapes proven by manual failures, with a non-name control for each new shape.
- Continue testing Plain Reading and the follow-up Operator search as one journey whenever a route-level default can alter compiled syntax.

## Next suggested agent

Test Strategist for the next manual Scryfall checklist batch, or Planning Architect if a broader name-intent grammar is requested.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-490-maze-partner-name-search-repair.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/qa/2026-07-09-vm490-maze-partner-name-search-repair.md`

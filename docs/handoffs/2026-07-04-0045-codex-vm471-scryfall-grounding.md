# VM-471 Scryfall Grounding And Plain Reading Compiler Foundation Handoff

## Agent name

Codex

## Task requested

Begin converting Implicit Maze Plain Reading from shallow raw-prose passthrough into a deterministic, grounded, inspectable natural-language-to-Scryfall compiler foundation.

## Files reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`
- Relevant Maze/Scryfall parser handoffs, including VM-003, VM-012, VM-405, VM-426, VM-448, and VM-449 trails.
- Maze parser/core/UI code under `research/`.

## Files changed

- `package.json`
- `scripts/build-scryfall-grounding.mjs`
- `scripts/validate-scryfall-grounding.mjs`
- `data/scryfall/grounding/scryfall-grounding.json`
- `research/scryfall-grounded-compiler.js`
- `research/scryfall-parser.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-core.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `research/research-init.js`
- `research/research-ui.js`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/contracts/maze-query-contract.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-471-scryfall-grounding-plain-reading-compiler-foundation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-04-0045-codex-vm471-scryfall-grounding.md`

## What changed

- Added a build-time Scryfall grounding generator that fetches catalogs and `/sets`, then writes a deterministic checked-in artifact at `data/scryfall/grounding/scryfall-grounding.json`.
- Added an offline validator for the grounding artifact and package scripts `scryfall:grounding` and `test:scryfall-grounding`.
- Added a grounded compiler module with normalization, explicit syntax preservation, type-line resolution, set/set-family resolution, conservative fuzzy set matching, basic keyword/oracle/color identity/commander intent handling, query serialization, and explanation output.
- Integrated the grounded compiler into Plain Reading before the legacy dictionary parser.
- Loaded the local grounding artifact from Maze boot code without adding browser-time Scryfall catalog calls.
- Extended Query Inspector diagnostics with Ignored and Applied defaults.
- Added parser, contract, and browserless Maze test coverage for Spider-Man villains, Marvel ambiguity, Bloomburrow typo, all-sets insects, dragon commander color/text intent, explicit syntax preservation, and current regression behavior.
- Updated architecture, data-pipeline, contract, Kanban, and handoff docs.

## Why it changed

The motivating failure was `all villains from the spiderman set` becoming raw prose plus an implicit Commander filter. VM-471 establishes a grounded compiler path so catalog-backed MTG types and Scryfall set families can be recognized deterministically instead of relying on shallow hand-maintained vocabulary or raw-string fallback.

## Decisions made

- The artifact is generated from Scryfall metadata at build time and checked in. Runtime Maze consumes the local artifact only.
- LLM fallback remains deferred.
- Spider-Man product-family expansion uses a documented manual override because current Scryfall set metadata does not expose a single marketing-family field for `spm`, `spe`, `aspm`, `pspm`, and `tspm`.
- The manual override only applies to set codes present in fetched Scryfall `/sets` data.
- Product-family matches apply visible `game:paper` and `prefer:best` defaults.
- Grounded type/set-family Plain Reading searches suppress the route-level Commander format default so generic raw type/set searches do not silently become Commander-only.
- Family set groups serialize as `(set:code OR ...)`; exact single set constraints still serialize as `s:<code>` to preserve existing parser conventions.
- The current artifact does not include `Squire`; the parser does not fabricate `type:squire`.

## Risks / uncertainties

- The legacy parser still has high-confidence early-return paths and heuristic dictionary behavior behind the new compiler.
- Set-family grouping from Scryfall `parent_set_code` is useful but not a complete marketing taxonomy; more overrides may be needed for future Universes Beyond families.
- Ambiguous family handling is diagnostic/alternative-based; there is no first-class UI picker yet.
- `counters` is intentionally broad as `o:counter` with alternatives; it is not a full counter-concept grammar.
- The worktree had many unrelated preexisting modified/untracked files before VM-471. This task avoided reverting or normalizing them.

## Tests run

- `node scripts\build-scryfall-grounding.mjs` failed in the sandbox because network access was blocked; reran with approved escalation and generated the artifact.
- `node --check scripts\build-scryfall-grounding.mjs`
- `node --check scripts\validate-scryfall-grounding.mjs`
- `node --check research\scryfall-grounded-compiler.js`
- `node --check research\scryfall-parser.js`
- `node --check research\maze-query-core.js`
- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node --check research\maze-search-tests.js`
- `npm.cmd run test:scryfall-grounding`
- `npm.cmd run test:parser`
- `node research\maze-query-contract-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:js`
- `git diff --check`
- `npm.cmd test` reached and passed the Maze/parser/builder/mode/precon sections, then failed on an unrelated existing Archscry assertion in `research/archscry-dossier-followup-tests.js` expecting `/Big Mana deckbuilder lane/i` but receiving `Colorless Commander decks | Big Mana catalog lane`.

## Not touched

- No LLM fallback, embeddings, backend service, API keys, user accounts, or full local card index.
- No broad Maze UI redesign.
- No Reading Finds storage, modal contract, Supabase/account, faction generated data, or unrelated route styling changes.
- No generated lore/card facts were invented.
- No commit was created.

## Follow-up recommendations

- VM-472: make the remaining Plain Reading parser fully additive by retiring or merging lossy high-confidence early returns.
- Add a compact disambiguation UI for set families such as Marvel.
- Extend grounded resolution to card names, mana cost, numeric stats, rarity, price/budget, artist, flavor text, language, extras/tokens/planes/schemes, and ordering/preference.
- Add post-search result-count validation with 0-result relaxation suggestions.
- Revisit set-family manual override policy as more Universes Beyond products ship.

## Next suggested agent

Senior JavaScript parser/compiler engineer with Test Strategist support.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-471-scryfall-grounding-plain-reading-compiler-foundation.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`

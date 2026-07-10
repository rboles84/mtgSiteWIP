# VM-471 - Scryfall Grounding And Plain Reading Compiler Foundation

ID: VM-471
Title: Scryfall Grounding And Plain Reading Compiler Foundation
Status: done
Type: feature
Area: Maze, Scryfall parser, generated data
Priority: high
Created: 2026-07-04
Completed: 2026-07-04

## Summary

Begin converting Implicit Maze Plain Reading from shallow syntax passthrough into a deterministic, grounded, inspectable natural-language-to-Scryfall compiler.

## Scope

- Add a build-time Scryfall grounding artifact from catalogs and set metadata.
- Add deterministic resolver/query-model foundations that consume the local artifact at runtime.
- Resolve type/subtype terms, set names, set families, glue words, basic color identity, basic oracle/keyword concepts, and commander-candidate intent.
- Improve Plain Reading diagnostics so recognized and ignored terms do not appear as unresolved prose.
- Add fixtures or validator coverage for the Spider-Man, Marvel ambiguity, Bloomburrow typo, all-sets, dragon commander, explicit syntax, and existing-regression cases.
- Update architecture documentation and create a completion handoff.

## Acceptance Criteria

- `all villains from the spiderman set` compiles to a grounded query containing `type:villain` and the Spider-Man family set group without unresolved glue/raw prose.
- `all insects in all sets` compiles to a clean type-line query with no set constraint.
- `all heroes in the marvel set` produces a safe ambiguity/disambiguation state when Marvel maps to multiple set families.
- Explicit Scryfall syntax such as `type:villain set:spm` remains preserved.
- Runtime Maze parser consumes the checked-in artifact and does not fetch Scryfall catalog metadata in the browser.
- New tests or validators cover the required acceptance cases.

## Guardrails

- Do not add LLM fallback, embeddings, local full-card search, backend services, API keys, accounts, or broad UI redesign.
- Do not hardcode only the Spider-Man fix.
- Do not fabricate Scryfall catalog data.
- Do not silently apply Commander filtering without visible diagnostics.
- Do not touch Reading Finds storage, modal contracts, Supabase/account work, faction generated data, or unrelated route styling.

## Notes

- VM-471 was selected after a repo collision scan found no `VM-471` or `VM-472` references.
- The working tree is already dirty with prior docs/readiness changes; preserve unrelated changes.

## Completion Notes

- Added `scripts/build-scryfall-grounding.mjs` and checked in `data/scryfall/grounding/scryfall-grounding.json`.
- Added `research/scryfall-grounded-compiler.js` and integrated it into Plain Reading, Maze query diagnostics, artifact boot loading, and Query Inspector groups.
- Added validator and parser/contract/Maze search coverage for the required Spider-Man, Marvel, Bloomburrow, all-sets, dragon commander, explicit syntax, and regression cases.
- Updated architecture, Scryfall pipeline, query contract, and core-logic docs.

## Validation

- `npm.cmd run test:scryfall-grounding`
- `npm.cmd run test:parser`
- `node research\maze-query-contract-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run lint:js`
- `git diff --check`
- `npm.cmd test` passed the Maze/parser/builder/mode/precon sections, then failed on an unrelated existing Archscry assertion expecting `/Big Mana deckbuilder lane/i` while receiving `Colorless Commander decks | Big Mana catalog lane`.

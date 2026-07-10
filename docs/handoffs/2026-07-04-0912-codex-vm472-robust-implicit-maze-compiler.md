# 2026-07-04 09:12 - Codex - VM-472 Robust Implicit Maze Compiler

## Agent Name

Codex

## Task Requested

Implement VM-472 as the robust deterministic Plain Reading compiler framework: one grounded pipeline for all Maze Plain Reading input, catalog-driven resolution, semantic registry data, morphology, typed spans, color/boolean/negation handling, centralized serialization, response-based validation repair suggestions, tests, docs, and Kanban closeout.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-04-0045-codex-vm471-scryfall-grounding.md`
- `docs/kanban/done/VM-471-scryfall-grounding-plain-reading-compiler-foundation.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/contracts/maze-query-contract.md`
- `research/scryfall-grounded-compiler.js`
- `research/scryfall-parser.js`
- `research/research-init.js`
- `research/maze-query-core.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `data/scryfall/grounding/scryfall-grounding.json`

## Files Changed

- `research/scryfall-grounded-compiler.js`
- `research/scryfall-parser.js`
- `research/research-init.js`
- `research/maze-query-core.js`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `data/scryfall/grounding/plain-reading-semantics.json`
- `scripts/validate-plain-reading-semantics.mjs`
- `package.json`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/contracts/maze-query-contract.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-472-robust-implicit-maze-compiler-framework.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-04-0912-codex-vm472-robust-implicit-maze-compiler.md`

## What Changed

- Removed the normal Plain Reading activation gate so initialized Plain Reading uses the grounded compiler for all input instead of only set/commander/example-shaped phrases.
- Added a curated, versioned Plain Reading semantic registry for non-catalog English concepts such as draw, removal, ramp, blink, dies, enters, aristocrats, sacrifice outlet, tokens, treasure, graveyard recursion, board wipe, counterspell, protection, go-wide, lifegain, stax, goad, mill, tutor, frames, finishes, and related search concepts.
- Added a semantic-registry validator and package script.
- Expanded compiler resolution to consume grounded catalog data for types, supertypes, subtypes, keyword abilities, keyword actions, ability words, sets, set names, set codes, and set families.
- Added deterministic normalization/morphology, 1-6 token span resolution, provenance/confidence, fuzzy catalog/set matching, ignored glue tracking, ambiguity tracking, and unresolved-prose exclusion from final syntax.
- Added color grammar precedence, bounded same-field boolean OR, first-class negation, commander-candidate vs support-card Commander intent, set family resolution, and central query serialization.
- Added response-based validation diagnostics: Maze uses the real Scryfall search response `total_cards`/not-found result to surface ordered relaxation suggestions instead of issuing a normal pre-flight count request.
- Updated Maze diagnostics mapping and contract docs for validation plan/result and ambiguity diagnostics.
- Updated parser, contract, and Maze search tests with VM-472 golden cases and property/invariant checks.
- Moved VM-472 Kanban card to Done and indexed this handoff.

## Why It Changed

VM-471 created a strong generated Scryfall grounding artifact, but the runtime compiler still consumed too little of it and only activated for certain query shapes. VM-472 turns Plain Reading into a consistent deterministic compiler surface so the same user language flows through one grounded, inspectable path whether or not the sentence mentions a set, Commander, or one of the original examples.

## Decisions Made

- Keep VM-471 generated grounding data as canonical Scryfall facts at `data/scryfall/grounding/scryfall-grounding.json`.
- Keep curated semantic English separate from generated Scryfall facts at `data/scryfall/grounding/plain-reading-semantics.json`.
- Use registry `otag:` fragments where they are the best available deterministic semantics, with `o:`, `fo:`, and exact field fragments where safer.
- Preserve explicit Scryfall syntax as explicit user-authored syntax.
- Do not silently append Commander legality to generic Plain Reading searches.
- Preserve Archscry initial Maze launches by executing stored `operatorQuery` as raw syntax; only edited Plain Reading text reruns through the compiler.
- Use the actual Scryfall search response for validation/repair suggestions during normal searches.

## Risks / Uncertainties

- The semantic registry is a strong first slice, not a complete English understanding layer. It must grow through measured corpus failures.
- Boolean support is intentionally bounded. Same-field OR is supported; complex mixed-field OR still needs stronger grouping semantics before broad rollout.
- Some field scopes are still deferred: watermark, layout/face predicates, set type, blocks, collector/year/date, devotion, mana production, exact mana-symbol grammar, even/odd mana value, total power/toughness, relational stat comparisons, and full cosmetic print grammar.
- Full `npm.cmd test` still fails on an unrelated Archscry Colorless label assertion in `research/archscry-dossier-followup-tests.js`; focused VM-472 checks pass.
- The working tree had broad unrelated changes before and during this VM. They were preserved.

## Tests Run

- `node --check research\scryfall-grounded-compiler.js` - passed
- `node scripts\validate-plain-reading-semantics.mjs` - passed
- `node scripts\validate-scryfall-grounding.mjs` - passed
- `node research\scryfall-parser-tests.js` - passed, 125 parser cases
- `node research\maze-query-contract-tests.js` - passed
- `node research\maze-search-tests.js` - passed
- `npm.cmd run lint:js` - passed
- `git diff --check` - passed with line-ending warnings only
- `npm.cmd test` - failed on unrelated `research/archscry-dossier-followup-tests.js` Colorless Big Mana lane label expectation

## Not Touched

- No LLM fallback, embeddings, backend service, API keys, or accounts.
- No broad UI redesign.
- No generated Scryfall grounding hand edits.
- No Reading Finds storage changes.
- No Supabase/account implementation changes.
- No unrelated route styling or faction/generated data edits.
- No commit was made.

## Follow-Up Recommendations

- VM-473 should expand the coverage corpus into a tiered golden/invariant suite with metrics by category and optional live Scryfall sampling.
- Add a dedicated UI pass for inspector chips, ambiguity choices, did-you-mean chips, and editable translated query once the compiler output stabilizes.
- Strengthen mixed-field boolean grouping and nested boolean support only after current bounded grammar has more corpus evidence.
- Add explicit field modules for the deferred Scryfall advanced-search areas.
- Investigate the unrelated Archscry Colorless Big Mana lane label failure before treating full `npm.cmd test` as green again.

## Next Suggested Agent

Test Strategist for VM-473 corpus and metrics, followed by a frontend-focused Maze inspector pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-472-robust-implicit-maze-compiler-framework.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `docs/contracts/maze-query-contract.md`
- `docs/handoffs/2026-07-04-0045-codex-vm471-scryfall-grounding.md`

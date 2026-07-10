# VM-472 - Robust Implicit Maze Compiler Framework

ID: VM-472
Title: Robust Implicit Maze Compiler Framework
Status: done
Type: feature
Area: Maze, Scryfall parser, semantic compiler, tests
Priority: high
Created: 2026-07-04
Completed: 2026-07-04

## Summary

Replace Plain Reading's dual-parser behavior with one deterministic grounded compiler pipeline that consumes the VM-471 Scryfall grounding artifact for all Plain Reading input.

## Scope

- Route every Plain Reading query through the grounded compiler, not only set/commander/example-shaped inputs.
- Consume catalog-backed types, supertypes, subtypes, keyword abilities, keyword actions, ability words, sets, set names, set codes, and set families.
- Add a curated semantic registry as data for non-catalog card-search concepts.
- Add morphology, typed spans with provenance/confidence, color grammar precedence, bounded boolean OR/AND/NOT, first-class negation, central serialization, and response-based validation/repair suggestions.
- Preserve Archscry initial `operatorQuery` execution and existing raw/builder behavior.
- Add curated golden tests, invariant/property tests, Maze contract/search tests, and documentation/handoff updates.

## Acceptance Criteria

- The grounded compiler has no set/commander activation gate for Plain Reading.
- Hardcoded one-off handling for keywords/oracle probes is replaced with catalog/registry iteration.
- `dragons or angels` compiles to `(type:dragon OR type:angel)`.
- `red or blue creatures` compiles to `c<=ur type:creature`.
- `red or blue but not black creatures` compiles to `c<=ur -c:b type:creature`.
- `legendary vampires not red` compiles to `type:legendary type:vampire -c:r`.
- VM-471 acceptance cases remain green.
- Existing Archscry Maze handoff launches still execute stored `operatorQuery` as raw syntax.
- Unresolved prose is never serialized into final Scryfall syntax.
- 0-result Scryfall responses can surface ordered repair suggestions without a normal pre-flight count request.

## Guardrails

- Do not add LLM fallback, embeddings, backend services, API keys, accounts, or broad UI redesign.
- Do not hand-edit generated Scryfall grounding data; update generators or curated semantic registry only.
- Keep curated semantic concepts separate from generated Scryfall catalog facts.
- Do not silently apply Commander filtering to generic type/set searches.
- Do not touch Reading Finds storage, modal contracts, Supabase/account work, faction generated data, or unrelated route styling.

## Notes

- VM-472 was selected after collision scan found references only in VM-471 docs/handoff review notes and no existing VM-472 card.
- The working tree is already dirty with prior VM-471 and readiness/doc changes; preserve unrelated files.
- Completed as the first unified compiler pass: all Plain Reading input now enters the grounded compiler when grounding/registry/dictionary data is available; the legacy parser remains only as a fallback when the grounded runtime cannot be initialized.
- Added the curated Plain Reading semantic registry plus validator and parser/contract/search coverage for catalog-driven keywords, registry concepts, boolean OR, color grammar precedence, negation, response-based repair diagnostics, and Archscry operator-query preservation.
- `npm.cmd test` still has an unrelated failure in `research/archscry-dossier-followup-tests.js` around the Colorless Big Mana lane label; focused Maze/parser checks pass.

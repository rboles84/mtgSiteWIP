# VM-473 - Mixed-Mode Classifier And Ambiguity Blocking

ID: VM-473
Title: Mixed-Mode Classifier And Ambiguity Blocking
Status: done
Type: bugfix
Area: Maze, Scryfall parser, query contract, diagnostics, tests
Priority: high
Created: 2026-07-04
Completed: 2026-07-04

## Summary

Fix the Operator's Hand / Plain Reading boundary so mixed English-plus-operator input routes through the grounded compiler, while pure Scryfall syntax and name-like input remain safe in raw/operator behavior.

## Scope

- Add deterministic raw/operator input classification.
- Preserve pure operator syntax, including quoted/operator-embedded English.
- Route mixed English plus explicit operators through VM-472 Plain Reading while preserving explicit syntax fragments.
- Treat no-operator, multi-word, name-like text with no recognized catalog/registry spans as name-like/exact-name rather than prose compilation.
- Derive execution blocking from VM-472 `queryModel.ambiguous`, especially blocking set-family ambiguity such as `marvel set`.
- Guard all Maze execution paths so blocked ambiguity does not fetch Scryfall, add a recent search, or update stale executable links.
- Preserve Archscry initial `operatorQuery` launches as raw syntax.

## Acceptance Criteria

- Raw `ci<=br t:creature o:sacrifice f:commander` remains raw.
- Raw `o:"all heroes" f:commander`, `o:"draw a card" f:commander`, and `(o:"draw a card" OR t:hero) f:commander` remain raw.
- Raw `Lightning Bolt`, `lightning bolt`, `Sol Ring`, and `Cyclonic Rift` do not compile as Plain Reading prose.
- Raw `all heroes in the marvel set f:commander` routes to Plain Reading, preserves `f:commander`, resolves `type:hero`, blocks on Marvel ambiguity, and leaks no raw prose.
- Raw `red vampires that sacrifice creatures` routes to Plain Reading.
- Raw single token `vampires` remains raw/name-like.
- Plain Reading `all villains from the spiderman set` remains non-blocking and compiles to the Spider-Man family.
- Blocked ambiguity does not fetch, update recent searches, or leave Open in Scryfall pointing at a stale executable query.
- Choosing an ambiguity alternative executes only the chosen compiled query.
- Archscry initial `operatorQuery` launches remain raw and unchanged.

## Guardrails

- VM-472 is a hard prerequisite; keep VM-472 grounding, query model, semantic registry, and explicit-syntax preservation as the source of truth.
- Do not add LLM fallback, runtime catalog fetching, backend services, API keys, accounts, or broad UI redesign.
- Do not create a second ambiguity model; derive contract/UI blocking from `queryModel.ambiguous`.
- Do not hand-edit generated Scryfall grounding data.
- Preserve unrelated dirty-tree changes.

## Completion Notes

- Implemented deterministic Operator's Hand classification for pure syntax, mixed English plus syntax, plain English, and name-like input.
- Added structured blocking set-family ambiguity to the VM-472 query model and derived contract-level `executionBlocked` from that model.
- Added Maze guards so blocked ambiguity renders the inspector and choices without fetching Scryfall, adding recent searches, or enabling stale Open/Copy actions.
- Preserved Archscry initial `operatorQuery` launches with explicit raw execution.
- Focused parser, contract, DOM search, registry validation, JS lint, and diff-check validation passed.

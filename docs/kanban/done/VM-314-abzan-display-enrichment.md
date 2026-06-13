# VM-314 - ABZAN Display Enrichment And Source-Backed Figure Fill

ID: VM-314
Title: ABZAN Display Enrichment And Source-Backed Figure Fill
Status: done
Type: Data / Display Enrichment
Area: Abzan, Display Data, Source-First Faction Quality
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## ID Note

The user-facing plan named VM-308, but pre-flight found VM-308 already occupied by the Colorless source packet. The Colorless handoff also reserves the nearby VM-309 through VM-312 follow-up lane. This ABZAN pass therefore uses VM-314 to avoid corrupting the active card trail.

## Summary

Repair ABZAN's display-quality gap without turning it into a placement rewrite. ABZAN already passes VM-300 source/generated validation, but public display inputs are thin: no `raw_enrichment`, empty `deck_links`, and empty `research_links`. This pass fills source-backed display enrichment from local approved sources and durable deck-link metadata through the existing wedge display convention.

## Scope

- Preserve unrelated dirty worktree drift.
- Add only source-backed ABZAN display enrichment and figure metadata.
- Treat `data/factions.json` as approved display input only for ABZAN `raw_enrichment`.
- Use `data/identity-layers.json` as the durable builder source for ABZAN deck-link and routing metadata.
- Keep ABZAN placement, schema, Maze, routes, flavor snippets, source-generated validator policy, and generated placement outputs out of scope.

## Acceptance Criteria

- [x] Baseline ABZAN display probes record missing `raw_enrichment`, empty `deck_links`, empty `research_links`, empty raw `key_figures`, and empty raw `canonical_flavor_text`.
- [x] VM-300 validation remains green for `LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN`, with only expected model-owned warnings.
- [x] ABZAN `raw_enrichment` is added only as display/source input and is backed by raw profile or approved local evidence rows.
- [x] ABZAN `deck_links` and any `research_links` output trace to `data/identity-layers.json` builder inputs, not hand-filled generated output.
- [x] Raw ABZAN `key_figures` cite promoted local evidence rows and avoid deferred biography/card-fact claims.
- [x] `canonical_flavor_text` remains empty and documented as a manual-fill residual.
- [x] Generated diff acceptance is limited to deterministic ABZAN display output; no ABZAN context output changed.
- [x] Handoff documents exact evidence rows used, generated paths accepted/restored, tests, residuals, and next recommended target.

## Test Plan

- Passed: `node --check research\build-faction-artifacts.mjs`
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`
- Passed: `npm.cmd run test:faction-context-isolation`
- Passed: JSON parse checks for touched raw/display/generated JSON before and after edits
- Passed: baseline and final ABZAN display probes
- Passed with expected warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN`
- Passed: `npm.cmd run build:factions`
- Passed: `npm.cmd run build:factions -- --context-targets=ABZAN`; final context stayed byte-identical
- Passed with expected warnings: `npm.cmd run test:source-generated`
- Passed: `node research\archscry-dossier-followup-tests.js`
- Passed: `node research\maze-search-tests.js`
- Known unrelated residual: `npm.cmd run test:placement`
- Passed with existing LF/CRLF warnings only: scoped `git diff --check`
- Passed: focused trailing-whitespace scan

## Explicit Non-Goals

- No web search.
- No placement axes, discriminator, inhibitor, claim-count, mechanics, schema, Maze, route, flavor-snippet, Home, or public alias changes.
- No raw claim/source/evidence additions.
- No generated placement hand edits.
- No exact card text, commander legality, or modern character biographies beyond approved local guide rows.

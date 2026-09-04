# VM-547 - Post-Reading Commander Shortlist Bridge

ID: VM-547
Title: Post-Reading Commander Shortlist Bridge
Status: Owner Review — revised exact candidate frozen locally; VM-547 RobQA PASS; unrelated VM-616 visual-harness timing disclosed; no push or merge
Type: Enhancement / Product Bridge / Semantic Projection
Area: Archscry, Maze, Commander discovery
Priority: high
Created: 2026-07-25
Started: 2026-09-04

## Summary

Harden the Archscry-to-Maze discovery handoff for all 37 dossiers. Preserve the compact four-choice Archscry entry point while making Maze's continuation materially richer, identity-specific, inspectable, and source-governed without turning Vox Mana into a generic ranked commander database.

## Source

- `docs/kanban/done/VM-546-edhmatch-comparison-review.md` - identified EDHMatch's practical ranked-shortlist clarity as useful, while preserving Vox Mana's identity-first lane.
- `docs/handoffs/2026-07-25-2116-codex-vm546-edhmatch-comparison-review.md` - recommends a clearer post-reading commander shortlist bridge.
- `docs/kanban/backlog/VM-008-commander-compass-v1-5-archetype-guided-recommendations.md` - existing broader Commander Compass recommendation-quality story.
- `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md` - related returning-user fit-check story.
- `archscry/index.html` and `assets/js/index.js` - current Archscry result and dossier surfaces.

## Problem

Vox Mana's dossier explains identity, adjacent fits, card signals, mana notes, and browsing starts well, but a user expecting EDHMatch-style immediacy may still ask: "Which commander do I build next?"

## Proposed Outcome

After a reading, `Maze Discovery Paths` remains a compact handoff. In Maze, the active dossier reading expands into identity-specific mechanical or flavor/story threads, a plain-English interpretation, optional operator-query inspection, and an honest return to the originating dossier. Broad identity browsing remains explicitly broad. Outside-color stretch must preserve named dossier characteristics, and WUBRG must expose an honest unavailable/replacement state instead of manufacturing an impossible outside-color query.

## Acceptance Criteria

- Exactly 37 canonical discovery profiles are owned in one authored source and projected into one runtime catalog used by both Archscry and Maze.
- Archscry renders every dossier's compact top-level paths without exposing operator syntax or becoming a second dossier.
- Maze rehydrates every dossier, identifies the originating reading, distinguishes a broad commander pool from semantic refinement, and exposes identity-specific mechanical and flavor/story threads.
- Each displayed thread label is backed by its actual operator query, plain-English interpretation, governed concept or explicit bounded operator, and certified dossier source locator.
- Outside-color stretch combines exclusion of the original identity with meaningful dossier characteristics. WUBRG has no fabricated outside-color query.
- Automated QA exhaustively covers all 37 profiles, path generation, semantic threads, positive/negative/boundary fixtures, label/query truth, return navigation, responsive browser behavior, accessibility mechanics, and the existing regression suite.
- The Owner receives a generated 37-row review matrix and only a short representative visual/interaction review.
- No popularity order is presented as Vox Mana fit; no runtime AI generates searches; no certified dossier semantics are rewritten for query convenience; Archscry and Maze cannot drift into separate definitions.

## Non-Goals

- Do not rebuild EDHMatch's ranked commander database.
- Do not change placement scoring, placement model data, certified source-governed identity semantics, or generated faction facts.
- Do not add account persistence, deck import, private deck saving, commander ranking, or a new commander-recommendation schema in this card.
- Do not certify commander legality or prices unless a separate source-authority/data pipeline card explicitly covers that.
- Do not redesign Archscry hero, unrelated dossier cards or typography, global navigation, Maze results, unrelated Maze entry modes, backgrounds/atmosphere, or shared hover/focus treatment outside the changed surfaces.

## Dependencies / Related Work

- VM-008 Commander Compass V1.5 Archetype-Guided Recommendations.
- VM-015 Returning User Commander Fit Check.
- Existing Commander dossier and external browsing link helpers.
- Scryfall and precon recommendation enrichment surfaces.

## Files Likely Impacted

- Authored/generated discovery-profile data under `data/dossier/`
- Shared path/query projection under `assets/js/maze/maze-handoff.js`
- Archscry dossier data loading and compact Maze-path presentation
- Maze dossier-context presentation and route-local CSS
- Focused all-37 semantic, query, navigation, browser, responsive, and accessibility tests
- Maze query/data-flow contracts and Owner Review evidence

## Risks / Uncertainties

- Over-indexing on examples could make the result feel like a hard recommendation rather than a direction.
- Current commander examples depend on available source/index quality and should stay conservative.
- This may overlap with VM-008 if implementation scope grows; split if needed.
- The current all-37 dossier catalog is canonical for the reading, but query projections must not strengthen or rewrite that source meaning.
- Legacy handoff URLs and four stable path types are shared contracts.
- Four-color and Colorless identities need explicit boundary treatment; WUBRG has no valid outside-color commander space under the chosen definition.

## Implementation Prompt

Implement the Owner's 2026-09-04 all-37 Archscry-to-Maze discovery brief. Reuse the shared handoff owner, add canonical discovery profiles traced to certified dossier content, keep Archscry compact, place interpretation/thread/query detail primarily in Maze, prove all deterministic semantics exhaustively, and stop at exact-candidate Owner Review without pushing or merging.

## Implementation Plan

1. Add and validate the authored all-37 discovery-profile source, schema, deterministic catalog producer, and generated runtime catalog.
2. Extend the existing shared Maze path factory to consume a canonical profile while preserving legacy fallback behavior and handoff fields.
3. Load the same catalog in Archscry and Maze; keep Archscry top-level links compact and add rich dossier/thread/interpretation/query inspection only in Maze.
4. Preserve context, return URL/anchor, Back/Forward, refresh, and legacy route behavior; add the explicit WUBRG boundary state.
5. Add exhaustive source/catalog/path/thread/fixture/query-truth coverage plus focused desktop, tablet, mobile, accessibility, and return-navigation browser coverage.
6. Generate the all-37 Owner matrix and QA report, update contracts/architecture/handoff records, commit the stable candidate, rerun RobQA against that exact SHA, start the local review server, and stop for Owner Review.

## Delivery / Removal Criteria

This card can be marked delivered when:

- A completed Archscry reading gives a clearer commander-next-step bridge.
- The bridge is validated in desktop/mobile QA and does not regress existing dossier navigation.
- Documentation and manual QA notes explain the boundary between identity fit, external browsing, and actual commander rankings.

## Human Review

Yes - this is a product positioning and player-trust surface.

## Owner Revision — 2026-09-04

The Owner rejected candidate `9bdd4cd2cdbc9371f7f1256c0d8e9dbdcc1ddb93` because its structural fixtures did not prove card-level false-positive, false-negative, boundary, and useful-nonempty behavior for every one of the 367 executable lane projections. The accepted source ownership, shared path factory, compact Archscry handoff, rich Maze continuation, WUBRG boundary, history behavior, and protected surfaces remain frozen.

The replacement candidate must add reviewable projection-level evidence with pinned local-corpus card witnesses, audit broad primitives and composite claims, remediate or honestly mark unavailable every weak projection, cover all stretch projections explicitly, link the compact 37-row matrix to the exhaustive evidence, and rerun exact-candidate RobQA. No executable projection may remain `FAIL` or unexplained `REVIEW` at handoff.

## Owner Review Candidate

- Superseded material candidate: `9bdd4cd2cdbc9371f7f1256c0d8e9dbdcc1ddb93`
- Owner decision: `REVISE`; the prior candidate and RobQA evidence remain superseded.
- Replacement exact material candidate: `b0a3ba8462e3f5fcd1a20a21131cd765e3714fab`.
- RobDev packet: preserve the approved source ownership/shared path factory/compact Archscry/rich Maze architecture; remediate result quality only; protect Placement, parser, ranking, unrelated UI, history, and WUBRG; stop at Owner Review.
- RobQA result: PASS for all VM-547-specific semantic, fixture, query-truth, responsive, accessibility-mechanics, and return-navigation gates. All 367 projections are evidenced: 354 executable/nonempty and 13 explicitly unavailable, with 354 positive, 354 semantic-negative, and 354 boundary fixtures.
- Protected VM-616 visual regression: passed before candidate freeze, then timed out twice at different visual wait points on exact-candidate reruns. No VM-547 assertion failed. The Owner directed further visual-timeout retries to stop and may check this protected interaction manually.
- Skipped tests: None.
- Owner must choose `ACCEPT`, `ACCEPT WITH SMALL FOLLOW-UP`, or `REVISE` before any push, PR, merge, or `main` integration.

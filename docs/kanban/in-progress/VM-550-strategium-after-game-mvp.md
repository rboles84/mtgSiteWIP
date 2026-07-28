# VM-550 - Strategium After-the-Game MVP

ID: VM-550
Title: Strategium After-the-Game MVP
Status: in progress
Type: Frontend / Commander UX / Product Slice
Area: Strategium
Priority: high
Created: 2026-07-27
Completed: pending owner review

## Summary

Turn `/strategium/` into a two-path product hub, preserve the established Commander learning Console at `/strategium/console/`, and implement the first complete `Help Me Understand` diagnostic at `/strategium/review/` for After the Game.

## Human-QA Remediation

Reopened on 2026-07-28 against exact candidate SHA `162beae60a117ff97f35036f236bb2f3c0ea79b1`.

- Authority: `VM-550_Strategium_Human_QA_Workbook_v3_FIXED.xlsx`
- Worktree relocated with `git worktree move` from `C:\tmp\voxmana.io-strategium-after-game-mvp` to `C:\dev\voxmana.io-strategium-after-game-mvp`.
- Scope is limited to the workbook findings and the authorized After-the-Game MVP remediation.
- Required outcomes include Console-local deep links, an in-page shared-registry lesson dialog, complete path/lesson mapping coverage, a dedicated wrong-piece result, bounded Commander-language cleanup, clearer hierarchy and controls, visible URL recovery, correct transient feedback language, restrained Strategium pointer effects, and responsive/accessibility polish.
- The candidate is not accepted, certified, merged, deployed, or production-ready. Completion requires automated validation, the full manual browser matrix, a remediation handoff, and a new owner review of the exact final SHA.

## Pre-Flight Summary

- The user-authorized base is exact SHA `ce406477a83be8529ed4a09602438168463d4b45`, the final head of `codex/vm546-vm549-documentation-checkpoint`.
- Local `main` and `origin/main` are both older at `867608bdda5ef61a6b16d0781ed4f0c1bffb0b0d` and are not valid bases for this ticket.
- The control worktree has a pre-existing untracked `tmp/` directory and must remain untouched.
- VM-122 established the current Commander learning Console; VM-124 through VM-126 expanded and softened its teaching model; VM-128 extracted route-local CSS/JS; VM-416 added Heat Management and retained the six Console lesson lanes; VM-493 added player-confidence guidance without runtime changes.
- Existing decisions require route-local Strategium behavior, preservation of lesson IDs/content, existing topbar/atmosphere/style reuse, no persistence backend, no generated-data or placement changes, and no visual-baseline refresh for incomplete slices.
- No local artifact named CECOS draft.4 exists. The implementation follows the approved request guardrails and reviewed Strategium/corpus work without exposing or inventing internal methodology.

## Scope

- Make `/strategium/` a hub for `Help Me Understand` and `Learn the Commander Table`.
- Keep Before the Game, During the Game, and Finding a Table visible but explicitly in development.
- Move the existing Strategium page intact to `/strategium/console/` and reuse its route-local assets.
- Add lesson query routing to the Console without changing lesson content.
- Add `/strategium/review/` with a shared data-driven question/result renderer.
- Implement six After-the-Game opening paths, the required ten-choice loss branch, bounded deeper questions, qualified result patterns, Console lesson links, local-only feedback, back/start-over/return controls, and URL history/deep-link handling.
- Distinguish actual, visible, expected future, remembered, and social power signals in the targeting result.
- Extend existing validators and add one focused Strategium review test.

## Acceptance Criteria

- Hub, review, and Console routes load without broken links or console errors.
- The existing Console retains Command Zone, Pod Readiness, Archetype Signal, Threat Reading, Heat Management, Beyond WUBRG, color-to-pod expectations, and the Commander Readiness Checklist.
- All six opening choices and all ten loss choices lead to useful states.
- Every result includes `What may have happened`, `What to look for next time`, `One thing to try`, and `Learn more`.
- Result explanations remain qualified and route to valid Console lessons.
- Feedback remains in current-page state and does not imply submission.
- Browser back/forward, refresh, Back, Start over, Return to Strategium, and lesson routing work.
- Native controls, visible focus, aria-live updates, reduced motion, and responsive layouts through 320px are preserved.
- Existing repository tests and new focused tests pass.

## Non-Goals

- Do not implement Before the Game, During the Game, or Finding a Table diagnostics.
- Do not add a backend, authentication, AI runtime, database, framework, or server requirement.
- Do not modify generated/source-governed data, placement/identity logic, Archscry, Maze, Home, Apocrypha, or visual baselines.
- Do not push, merge, or deploy.

## Working Branch

- Branch: `codex/vm550-strategium-after-game-mvp`
- Worktree: `C:\tmp\voxmana.io-strategium-after-game-mvp`
- Base: `ce406477a83be8529ed4a09602438168463d4b45`

## Outcome

- `/strategium/` is now a focused hub with the two connected Strategium experiences and honest development labels for incomplete situation families.
- The original Strategium implementation is preserved at `/strategium/console/`; its HTML moved intact, its CSS/JS are reused, and lesson query routing was added without rewriting the lesson content.
- `/strategium/review/` now implements the full After-the-Game MVP with 6 opening paths, 10 required loss choices, 3 bounded narrowing questions, and 14 shared qualified result patterns.
- Results contain all four required sections, local-only feedback, valid Console routing, and progressive targeting signals.
- URL state supports refresh, direct links, custom Back, Start over, browser back/forward, and safe fallback for invalid paths.
- Existing `/strategium/` Console hashes receive a deterministic compatibility redirect.

## Validation

- `npm.cmd run test:strategium-review` - passed: 6 opening choices, 10 loss choices, 14 qualified result patterns, Console routes, targeting signals, and internal links.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run test:route-metadata` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed after using the existing local `node_modules` and ignored Scryfall fixture in the isolated worktree; no dependency download or source-data change.
- Browser QA passed at 1440, 1024, 768, and 320 pixels for hub, review, and Console routes with no horizontal overflow or console warnings/errors.
- Browser interaction passed for all six opening outcomes, every required loss choice, all four result sections, Console lesson deep links, checklist interaction, targeting disclosure, local feedback reset, refresh, custom Back, Start over, and browser back/forward.
- Keyboard/accessibility review passed through semantic headings, native buttons/links/details, visible control focus, disabled development controls, aria-live result changes, local feedback status, reduced-motion support, and 320px responsive behavior.

## Implementation Commit

- `3a7eac93cc37627a814f6e04e3c2288f785b6678`

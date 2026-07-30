# VM-550 - Strategium After-the-Game MVP Human-QA Remediation

ID: VM-550
Title: Strategium After-the-Game MVP
Status: done - awaiting final owner hand review
Type: Frontend / Commander UX / Product Slice
Area: Strategium
Priority: high
Created: 2026-07-27
Completed: 2026-07-29

## Summary

Turn `/strategium/` into a two-path product hub, preserve the established Commander learning Console at `/strategium/console/`, and implement the first complete `Help Me Understand` diagnostic at `/strategium/review/` for After the Game.

## Human-QA Remediation

Reopened on 2026-07-28 against exact candidate SHA `162beae60a117ff97f35036f236bb2f3c0ea79b1`.

- Authority: `VM-550_Strategium_Human_QA_Workbook_v3_FIXED.xlsx`
- Worktree relocated with `git worktree move` from `C:\tmp\voxmana.io-strategium-after-game-mvp` to `C:\dev\voxmana.io-strategium-after-game-mvp`.
- Scope is limited to the workbook findings and the authorized After-the-Game MVP remediation.
- Required outcomes include Console-local deep links, an in-page shared-registry lesson dialog, complete path/lesson mapping coverage, a dedicated wrong-piece result, bounded Commander-language cleanup, clearer hierarchy and controls, visible URL recovery, correct transient feedback language, restrained Strategium pointer effects, and responsive/accessibility polish.
- Remediation implementation commit: `4858e8c75edb6fe9b136cff51c9e23fe53de9cf6`.
- Automated validation, the full required viewport matrix, the remediation handoff, and clean-worktree proof are complete. The candidate is not accepted, certified, merged, deployed, or production-ready; it now requires a new owner hand review of the exact final remediation HEAD.

## Second Owner-Review Remediation

Reopened on 2026-07-28 from exact clean HEAD `d6c89ecdf70e6bb342f8b3a5f705ff5898930571`.

- Preserve all 15 result patterns, 24 authored leaf mappings, wrong-target semantics, Console lesson queries, recovery notice, transient feedback, and shared lesson registry.
- Refine only hub hierarchy/alignment, review action controls, Learn More row stability, dialog presentation, and validated contextual return from the full Console.
- Validate 1440 x 900, 1024 x 768, 768 x 1024, 390 x 844, and 320 x 568.
- Do not touch unavailable situation-family implementation, unrelated routes, visual baselines, persistence, analytics, generated data, push, merge, deployment, integration, or certification.
- Implementation commit: `a73214826a464727d83a00f2735849b8b1a8bd6c`.
- The hub now has one centered review-versus-study choice axis and a non-competing MVP availability panel.
- Back, Start over, and Return to Strategium share one semantic Vox Mana action component across every question and result.
- Learn More rows use a stable title/action grid on wider screens and one consistent stacked pattern through 480px.
- The lesson dialog is centered, bounded, single-scroll, single-title, and single-close; its full-Console link carries an exact validated review return destination.
- Contextual Console visits expose a sticky `Return to your game review` action that returns to the exact result; malformed, external, and unsupported values are rejected.
- Required automated validation and five-viewport browser QA passed with no horizontal overflow or browser console warnings/errors.
- The diagnostic remains exactly 24 authored leaf paths and 15 result patterns; `wrong-target` and its ordered Threat Reading / Archetype Signal lessons are unchanged.

## Final Owner-Review Polish Remediation

Reopened on 2026-07-29 from exact clean HEAD `a908c12362dc4602af1829a867fa5b62233e0366`.

- Preserve all accepted diagnostic paths, result and lesson mappings, shared-registry lesson dialog behavior, deep links, recovery, feedback, and browser-history behavior.
- Remove only the duplicated Guided Moments hub panel and correct the two primary cards' deterministic alignment.
- Make review action controls stage-aware without changing diagnostic state semantics.
- Normalize Pod Readiness category spacing and stop readiness-checklist cards from stretching to equal visible heights.
- Replace the fixed Console review-return control with an inline contextual link immediately before the active lesson or readiness destination.
- Explicitly reject external, protocol-relative, unrelated local, JavaScript-style, empty, malformed, and absent return values.
- Validate the required desktop and mobile viewports without refreshing visual baselines.
- Implementation commit: `4e87270a2668a118b2bb22b0d7b7eceb9bf1b8c9`.
- The duplicate Guided Moments panel and its unused styles are removed; the hub now ends as a complete, centered two-experience choice.
- Review controls now match the exact Situation, Game, Detail, and Result action matrix.
- Pod Readiness category pills share centered sizing and spacing in both the Console and shared-registry dialog.
- All ten readiness cards size to their own content instead of stretching to the tallest card in a row.
- The validated review return is an inline contextual link before the active lesson or readiness section, never a fixed viewport control.
- Focused/full/lint/copy/metadata/frontend/browser/diff validation and the five-viewport browser matrix passed with no browser warnings or errors.
- The final exact remediation HEAD still requires owner hand review; this card does not claim acceptance, integration, certification, deployment, or production readiness.

## Pre-Flight Summary

- The user-authorized base is exact SHA `ce406477a83be8529ed4a09602438168463d4b45`, the final head of `codex/vm546-vm549-documentation-checkpoint`.
- Local `main` and `origin/main` are both older at `867608bdda5ef61a6b16d0781ed4f0c1bffb0b0d` and are not valid bases for this ticket.
- The control worktree has a pre-existing untracked `tmp/` directory and must remain untouched.
- VM-122 established the current Commander learning Console; VM-124 through VM-126 expanded and softened its teaching model; VM-128 extracted route-local CSS/JS; VM-416 added Heat Management and retained the six Console lesson lanes; VM-493 added player-confidence guidance without runtime changes.
- Existing decisions require route-local Strategium behavior, preservation of lesson IDs/content, existing topbar/atmosphere/style reuse, no persistence backend, no generated-data or placement changes, and no visual-baseline refresh for incomplete slices.
- Copy remediation was governed by the local CECOS production candidate sections on observation before interpretation, ambiguity/unknown handling, claim qualification, interaction versus threat assessment, losing without failure, and targeting without exclusion; the corpus QA report and Gate 2 governance were used to preserve the evidence boundary.
- The Commander Questions Corpus contains no accepted Gate 3 player-language evidence set. Raw Gate 2 candidate phrases were not treated as accepted copy or used as authority. Existing accepted Strategium direction in VM-416, VM-493, and the repository voice audit supplied the product-language layer.

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
- Original worktree: `C:\tmp\voxmana.io-strategium-after-game-mvp`
- Final worktree: `C:\dev\voxmana.io-strategium-after-game-mvp`
- Base: `ce406477a83be8529ed4a09602438168463d4b45`
- Human-QA remediation start: `162beae60a117ff97f35036f236bb2f3c0ea79b1`

## Outcome

- `/strategium/` is a balanced two-experience hub with player-facing hierarchy, no decorative card numerals, and one honest available review start.
- `/strategium/console/` remains the complete lesson library. Its six lesson queries, readiness destination, historical hashes, local `#top` / `#strategium` anchors, and Back/Forward state now behave within the Console.
- One `window.vmStrategiumLessons` registry in `assets/js/strategium.js` owns all six Console lessons plus the Commander Readiness Checklist. `window.vmStrategiumRenderLesson` renders the same content into the Console and the review dialog.
- `/strategium/review/` now has 24 authored leaf paths and 15 qualified result patterns. `wrong-target` is the new fifteenth result for `after-game/lost/other-plan/wrong-piece`.
- Learn More stays on the result in one accessible reusable dialog, preserves ordered per-result mappings, supports one through three lessons without layout artifacts, restores the exact opener, and keeps a full-Console fallback.
- Review progress uses named four-stage state; dynamic transitions focus and reveal the new heading; invalid URLs show an announced and visibly positioned recovery notice.
- Feedback is transient and explicitly not stored or transmitted. Targeting signals are a qualified disclosure rather than a causal verdict.
- Strategium-only hierarchy, language, controls, responsive behavior, and pointer-reactive panel lighting were remediated without changing the unfinished families or unrelated routes.

## Final Path, Result, And Lesson Mappings

The complete authoritative mapping is recorded in `docs/handoffs/2026-07-28-0147-codex-vm550-human-qa-remediation.md`. Summary counts:

- 24 authored leaf paths.
- 15 result identifiers.
- 3 one-lesson paths, 20 two-lesson paths, and 1 three-lesson path.
- Lesson order is authored per leaf and is not normalized to a fixed count.

## CECOS And Player-Language Authority

- `C:\dev\Commander_Questions_Corpus\standard\CECOS_v1.0.0-draft.2_Production_Candidate.md`
- `C:\dev\Commander_Questions_Corpus\standard\CECOS_v1.0.0-draft.2_QA_Report.md`
- Local corpus README, governance, Gate 2 protocol, report, and handoff records
- Accepted repository product evidence: VM-416, VM-493, VM-456, and the Strategium voice audit
- No accepted corpus Gate 3 player-language set existed; Gate 2 candidates and draft slang examples were not promoted into player-facing copy.

## Validation

- `npm.cmd run test:strategium-review` - passed: 24 leaf paths, 15 result identifiers, exact ordered lesson mappings, shared lesson registry/dialog behavior, Console deep links and anchors, URL recovery, history, focus, viewport placement, targeting disclosure, and transient feedback.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run test:route-metadata` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed using existing local dependencies; no dependency download or source-data change.
- Browser QA passed at 1440 x 900, 1024 x 768, 768 x 1024, 390 x 844, and 320 x 568 for all three Strategium routes with no horizontal overflow or console warnings/errors.
- Manual browser interaction covered all 24 leaves/15 result families, all seven lesson destinations, one-/two-/three-lesson layouts, wrong-target, targeting disclosure, invalid recovery, feedback values, direct Console links, readiness, local anchors, and Back/Forward.
- Visual baselines were not refreshed or approved.

## Implementation Commit

- `3a7eac93cc37627a814f6e04e3c2288f785b6678`
- Human-QA remediation implementation: `4858e8c75edb6fe9b136cff51c9e23fe53de9cf6`
- Validation and remediation handoff: this document's final commit

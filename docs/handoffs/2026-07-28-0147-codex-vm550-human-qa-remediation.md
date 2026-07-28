# 2026-07-28 01:47 - Codex - VM-550 Human-QA Remediation

## Agent name

Codex

## Task requested

Resume VM-550 from exact human-QA candidate `162beae60a117ff97f35036f236bb2f3c0ea79b1`, move its registered worktree from the disallowed temporary location to the approved permanent location with Git, read the complete authoritative workbook and local CECOS evidence, remediate the bounded Strategium findings, validate the result, and prepare it for a new owner hand review without push, merge, deployment, certification, or integration.

## Authority and worktree proof

- Control repository: `C:\dev\voxmana.io`
- Original VM-550 base: `ce406477a83be8529ed4a09602438168463d4b45`
- Human-QA remediation start: `162beae60a117ff97f35036f236bb2f3c0ea79b1`
- Branch: `codex/vm550-strategium-after-game-mvp`
- Original registered worktree: `C:\tmp\voxmana.io-strategium-after-game-mvp`
- Final registered worktree: `C:\dev\voxmana.io-strategium-after-game-mvp`
- Before the move, the source was clean, on the required branch, and at the exact candidate SHA; the approved destination did not contain unrelated files.
- The move used `git -C C:\dev\voxmana.io -c safe.directory=C:/dev/voxmana.io worktree move ...`; no manual copy, replacement path, or fallback to `C:\tmp` occurred.
- After the move, Git registered the worktree only at the approved destination with the same branch and SHA.
- Remediation implementation commit: `4858e8c75edb6fe9b136cff51c9e23fe53de9cf6`
- Final remediation HEAD: the commit containing this validation and handoff record; the exact SHA must be taken from Git and used verbatim for owner review.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-550, VM-416, VM-493, VM-456, and related Strategium handoffs/cards
- `docs/kanban/board.md`
- Repository workflow, test, accessibility, copy-governance, voice-audit, and manual-QA references
- Complete VM-550 diff from `ce406477a83be8529ed4a09602438168463d4b45` through `162beae60a117ff97f35036f236bb2f3c0ea79b1`
- Existing Strategium hub, review, Console, CSS, JavaScript, and focused validators
- `C:\Users\obake\Downloads\VM-550_Strategium_Human_QA_Workbook_v3_FIXED.xlsx`, including every row in:
  - QA Dashboard
  - Path Decision Table
  - Result Pattern Review
  - State Transition Matrix
  - Learn More Mapping
  - Finding Log
- Local Commander Questions Corpus authority and evidence records under `C:\dev\Commander_Questions_Corpus`

## Files changed

- `assets/css/strategium.css`
- `assets/js/strategium-review.js`
- `assets/js/strategium.js`
- `strategium/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `scripts/strategium-review-tests.mjs`
- `scripts/frontend-smoke.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- `docs/handoffs/2026-07-27-0120-codex-vm550-strategium-after-game-mvp.md`
- `docs/handoffs/2026-07-28-0147-codex-vm550-human-qa-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Repaired Console-local asset and navigation behavior, lesson queries, readiness landing, historical hashes, unknown values, local anchors, and browser history.
- Added a single accessible in-page lesson dialog to the diagnostic. It supports Escape, close controls, focus containment/restoration, background inertness and scroll control, accessible title/context, reduced motion, Back/Forward, and a full-Console fallback.
- Added one lesson registry and renderer shared by the diagnostic dialog and full Console. Lesson prose is not independently duplicated.
- Audited all 24 workbook leaf paths and preserved authored lesson order and variable lesson counts.
- Added the qualified `wrong-target` result for the wrong-piece path, increasing the honest result-pattern count from 14 to 15.
- Rewrote bounded questions, choices, results, helper text, feedback, and recovery copy in concrete Commander language while preserving uncertainty and avoiding unsupported slang.
- Simplified the hub, removed redundant hierarchy and duplicate After-the-Game start choices, repaired progress/actions, stabilized pointer lighting on dense panels, and completed the bounded responsive polish.
- Made invalid-state recovery both announced and visibly positioned with the returned focused heading on narrow screens.
- Added explicit Console handling so `Top` reaches scroll position zero and `Strategium` aligns the Console section rather than merely changing a hash.

## Final path-to-result and path-to-lesson mapping

Lessons are listed in rendered order.

| Authored leaf path | Result ID | Ordered lesson IDs |
| --- | --- | --- |
| `after-game/won-unclear` | `won-unclear` | `threat-reading`, `heat-management`, `archetype-signal` |
| `after-game/one-sided` | `one-sided` | `threat-reading`, `pod-readiness` |
| `after-game/couldnt-follow` | `game-flow` | `archetype-signal`, `threat-reading` |
| `after-game/table-bad` | `social-friction` | `pod-readiness`, `heat-management` |
| `after-game/unsure` | `uncertain` | `threat-reading`, `readiness-checklist` |
| `after-game/lost/opening-hand` | `opening-hand` | `pod-readiness`, `readiness-checklist` |
| `after-game/lost/mana-draw` | `mana-development` | `pod-readiness`, `readiness-checklist` |
| `after-game/lost/wrong-order` | `sequencing` | `threat-reading`, `command-zone` |
| `after-game/lost/never-started/resources-late` | `mana-development` | `pod-readiness`, `readiness-checklist` |
| `after-game/lost/never-started/commander-needed` | `commander-dependence` | `command-zone` |
| `after-game/lost/never-started/pod-fast` | `power-mismatch` | `pod-readiness`, `readiness-checklist` |
| `after-game/lost/never-started/unsure` | `uncertain` | `threat-reading`, `readiness-checklist` |
| `after-game/lost/stopped/commander-stopped` | `commander-dependence` | `command-zone` |
| `after-game/lost/stopped/key-spells` | `open-mana` | `threat-reading` |
| `after-game/lost/stopped/visible-engine` | `targeting` | `heat-management`, `threat-reading` |
| `after-game/lost/stopped/unsure` | `uncertain` | `threat-reading`, `readiness-checklist` |
| `after-game/lost/other-plan/engine-hidden` | `other-plan` | `archetype-signal`, `threat-reading` |
| `after-game/lost/other-plan/wrong-piece` | `wrong-target` | `threat-reading`, `archetype-signal` |
| `after-game/lost/other-plan/artifact-confusion` | `beyond-wubrg` | `beyond-wubrg`, `archetype-signal` |
| `after-game/lost/other-plan/plan-unsure` | `game-flow` | `archetype-signal`, `threat-reading` |
| `after-game/lost/focused` | `targeting` | `heat-management`, `threat-reading` |
| `after-game/lost/stronger` | `power-mismatch` | `pod-readiness`, `readiness-checklist` |
| `after-game/lost/nothing-mattered` | `one-sided` | `threat-reading`, `pod-readiness` |
| `after-game/lost/unsure` | `uncertain` | `threat-reading`, `readiness-checklist` |

Final result identifiers: `won-unclear`, `one-sided`, `game-flow`, `social-friction`, `uncertain`, `opening-hand`, `mana-development`, `sequencing`, `commander-dependence`, `power-mismatch`, `open-mana`, `targeting`, `other-plan`, `wrong-target`, and `beyond-wubrg`.

## Shared lesson-registry architecture

- `assets/js/strategium.js` owns the authoritative `basics` lesson bodies and readiness content.
- `window.vmStrategiumLessons` exposes the six lesson records plus `readiness-checklist`.
- `window.vmStrategiumRenderLesson(target, lessonId)` is the single rendering path.
- The full Console uses the renderer for tab/query content.
- The review dialog uses the same renderer and registry; it owns only dialog state, not a copy of lesson prose.
- Result records in `assets/js/strategium-review.js` store ordered lesson IDs only.

## CECOS documents and accepted evidence used

- `C:\dev\Commander_Questions_Corpus\standard\CECOS_v1.0.0-draft.2_Production_Candidate.md`
  - Sections 1.5, 2.1-2.6, 3.8, 4.1-4.10
  - Observation topics OT07, OT08, OT10, OT14, OT18, OT23
  - Observed-experience and adversarial examples OE07, OE08, OE16, OE21, OE22, OE30, F8, and F9
- `C:\dev\Commander_Questions_Corpus\standard\CECOS_v1.0.0-draft.2_QA_Report.md`
- Corpus README, governance, Gate 2 review protocol, Gate 2 report, and Gate 2 handoff
- Accepted repository product/language evidence:
  - VM-416 Strategium content pass
  - VM-493 player-confidence guidance
  - VM-456 copy governance
  - repository Strategium voice audit

The CECOS production candidate governed boundaries, not invented slang. Its observation-before-interpretation, ambiguity, unknown-state, evidence, and claim-qualification requirements controlled all result families. OT07/OT08 governed the wrong-target distinction; F9 and OT08 governed targeting; F8 and OT23 governed loss/power mismatch; ambiguity and unknown guidance governed uncertain/game-flow results; social observations did not infer player intent.

No accepted Gate 3 player-language evidence set existed in the local corpus. The 12,109 Gate 2 candidates are explicitly not final/accepted evidence and were not used as automatic copy authority.

## Findings resolved

| Workbook ID | Resolution |
| --- | --- |
| F1 | Removed the nested-route base regression; repaired Console-local assets, `#top`, `#strategium`, historical/unknown hashes, direct lessons, readiness, and history. |
| F2 | Added the dedicated qualified `wrong-target` result and correct ordered lessons. |
| F3 | Focuses and deliberately reveals each dynamic heading; mobile recovery keeps notice and heading visible without timeouts or pixel offsets. |
| F4 | Replaced `Saved` semantics with transient `Current selection` language and removed analytics transmission. |
| F5 | Added concise, announced, visible invalid-state recovery explaining the return point and that no answer was added. |
| F6 | Replaced inaccurate `up to 3` wording with Situation, Game, Detail, and Result stages. |
| F7 | Added responsive hero wrapping/clamping and verified 320px containment. |
| HR001 | Removed the repeated review-hero/first-question promise. |
| HR002 | Removed hub numerals/internal taxonomy and balanced the two primary experiences. |
| HR003 | Increased Console Return to Strategium contrast and readability. |
| HR004 | Styled Back, Start over, and Return to Strategium as a coherent semantic action group. |
| HR005 | Rewrote stiff choices such as `I lost` into natural game statements. |
| HR006 | Replaced unexplained `sharp edges` language with concrete combos, lock pieces, speed, and table-expectation language. |
| HR007 | Replaced outgoing Learn More navigation with the shared in-page lesson experience and repaired all direct lesson queries. |
| HR008 | Removed continuous pointer-position lighting updates from dense reading surfaces. |
| HR009 | Expanded focused coverage to every authored leaf/result/mapping and the required UI/history/accessibility states. |
| HR010 | Explicitly connected targeting outcomes to five possible evidence signals while denying causal proof. |
| HR011 | Removed single-lesson divider/phantom-track presentation. |
| HR012 | Removed the duplicate equivalent After-the-Game start entry. |

## Findings intentionally deferred

No workbook finding within the authorized VM-550 boundary remains intentionally deferred.

Intentional MVP limitations are not workbook deferrals: Before the Game, During the Game, and Finding a Table remain unavailable; feedback is not persisted; there is no account history, analytics, LLM runtime, or separate lesson route; visual baselines were not refreshed; unrelated Vox Mana pages were not redesigned.

## Why it changed

Human QA showed that the original candidate was functionally broad but semantically and interactively weak in several high-value places. The remediation makes the After-the-Game slice honest, accessible, and internally consistent without expanding its product scope.

## Decisions made

- Preserved the workbook's 24 leaf-path authority and variable lesson counts.
- Increased result count to 15 rather than protecting an outdated implementation statistic.
- Kept the complete lesson library at `/strategium/console/` and used one in-page dialog rather than separate lesson routes.
- Used semantic anchors and application history instead of timeouts or fixed pixel scrolling.
- Kept qualified language but removed repetitive legalistic phrasing.
- Did not treat workbook slang examples or raw corpus candidates as accepted player language.
- Did not refresh visual baselines because no repository rule required owner-controlled approval for this bounded remediation.

## Risks / uncertainties

- The final exact remediation SHA has not received the required new owner hand review.
- CECOS is a local production candidate, not an approved final standard, and no accepted Gate 3 player-language set was available.
- The diagnostic remains authored guidance, not proof of causality, rules authority, or a saved game record.
- The three unfinished situation families remain intentionally unavailable.

## Tests run

- `node --check assets/js/strategium.js` - passed.
- `node --check assets/js/strategium-review.js` - passed.
- `node --check assets/js/strategium-hub.js` - passed.
- `npm.cmd run test:strategium-review` - passed: 24 paths, 15 results, exact ordered lesson mappings, shared lessons/dialog, Console deep links/anchors, recovery, history, focus, reduced motion, and feedback.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:copy-boundaries` - passed across 17 live-copy files.
- `npm.cmd run test:route-metadata` - passed for 10 routes.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed with existing local dependencies and no source-data change.
- `git diff --check` - passed with line-ending warnings only.

## Manual browser validation

- Required viewports: 1440 x 900, 1024 x 768, 768 x 1024, 390 x 844, and 320 x 568.
- All three routes were checked at every viewport with zero horizontal overflow.
- All 24 authored leaves and all 15 result identifiers were rendered; every result had four sections, an in-viewport focused heading, and one to three lessons.
- All seven lesson destinations opened in the dialog from an actual result and closed to the exact opener with background state restored.
- Wrong-target, targeting disclosure, one-lesson, two-lesson, three-lesson, long mobile result, all four feedback values, changed feedback, invalid recovery, all Console lesson queries, readiness, Top, Console Strategium anchor, historical/unknown hashes, and Console Back/Forward passed.
- Hub cards remained equal-width and centered at desktop/tablet and stacked cleanly at 390/320.
- The 320px hero heading stayed within the viewport.
- Browser console warnings/errors: none.

## Not touched

- Control worktree tracked files
- Control worktree pre-existing untracked `tmp/`
- Before the Game, During the Game, or Finding a Table implementation
- Feedback persistence, account history, analytics, backend, database, or LLM runtime
- Blog or unrelated routes
- Generated/source-governed data, placement logic, identity logic, Commander facts, or lore
- Dependencies, frameworks, lesson-per-route architecture, visual baselines
- Push, pull request, merge, rebase, deployment, certification, or integration

## Follow-up recommendations

Perform an owner hand review of the exact final remediation HEAD. Do not integrate, merge, push, deploy, or expand another situation family until that review explicitly approves that exact SHA.

## Next suggested agent

Product owner performing the exact-SHA hand review.

## Related Kanban card, docs, or plans

- VM-550
- `docs/kanban/done/VM-550-strategium-after-game-mvp.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-07-27-0120-codex-vm550-strategium-after-game-mvp.md`
- `docs/strategy/2026-07-09-strategium-nervous-precon-pilot-confidence-series.md`
- `docs/strategium-play-sequencing-update-packet.md`

## Second owner-review remediation addendum

The owner did not approve the first human-QA remediation HEAD and requested one additional bounded UI hierarchy, interaction-polish, dialog-presentation, and return-navigation pass from exact clean SHA `d6c89ecdf70e6bb342f8b3a5f705ff5898930571`.

- The accepted diagnostic architecture remains frozen at 24 authored leaf paths and 15 result identifiers. The `wrong-target` result, all ordered path-to-result and path-to-lesson mappings, recovery, feedback, and Console lesson query behavior were preserved.
- The hub now has one deliberate centered axis for the review-versus-study choice. The lower panel explains the transparent one-available/three-unavailable MVP boundary without acting as a second review CTA.
- Back, Start over, and Return to Strategium now share one semantic, keyboard-accessible Vox Mana action component in every question and result state.
- Learn More rows use a flexible title plus stable no-wrap action column at wider widths, then switch every row to one consistent stacked layout through 480px.
- The dialog now uses one centered bounded surface, one rendered lesson title, one header close control, one internal scroll owner, an inert/scroll-locked background, and a connected full-Console footer action. Escape, focus containment/restoration, browser history, and reduced motion remain intact.
- The full-Console link carries an exact local review result path. Console validation rejects external origins, non-review routes, hashes, extra query keys, unsupported paths, control characters, and backslashes. A contextual sticky return action remains visible alongside the focused lesson and returns to the exact result. Direct Console visits show no misleading return action.
- Visual review found and corrected an overflowing availability status chip and the uneven 390px long-title lesson-row breakpoint before final validation.
- Implementation commit: `a73214826a464727d83a00f2735849b8b1a8bd6c`.
- Final automated validation passed: focused Strategium, full `npm test`, JavaScript lint, HTML lint, copy boundaries, route metadata, frontend smoke, browser smoke, and `git diff --check`. One parallel browser-smoke attempt sampled the unrelated Home canvas before it painted; the isolated rerun passed.
- Browser validation passed at 1440 x 900, 1024 x 768, 768 x 1024, 390 x 844, and 320 x 568 across the hub, review, dialog, and Console. All action states, representative one-/two-/three-lesson results, wrong-target, targeting disclosure, invalid recovery, mobile dialog top/bottom, close/focus restoration, full-Console contextual return, overflow, clipping, and browser logs were checked. Browser console warnings/errors: none.
- No result prose, unavailable-family implementation, unrelated route, visual baseline, generated/source data, dependency, persistence, analytics, push, merge, rebase, deployment, integration, or certification work occurred.
- The only authorized next action is an owner hand review of the new exact final remediation SHA.

## Commit record

- Original candidate: `162beae60a117ff97f35036f236bb2f3c0ea79b1`
- Human-QA remediation implementation: `4858e8c75edb6fe9b136cff51c9e23fe53de9cf6`
- Second owner-review remediation start: `d6c89ecdf70e6bb342f8b3a5f705ff5898930571`
- Second owner-review implementation: `a73214826a464727d83a00f2735849b8b1a8bd6c`
- Validation and remediation handoff: this document's final commit

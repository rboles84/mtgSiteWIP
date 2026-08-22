# VM-579 Independent RobQA Handoff

## Work identity

- Agent name: Codex (`/root/vm579_robqa`, independent RobQA)
- Task requested: Independently verify the exact VM-579 candidate without trusting RobDev's summary, then return `PASS — Owner Review Ready`, `FAIL — Return to RobDev`, or `BLOCKED`.
- Exact reviewed candidate: `1c87dc2669a007d7e59e5f71a46d20add5235e3a`
- Branch: `main`
- Related card and gates: `docs/kanban/in-progress/VM-579-archscry-dev-review-placement-validation.md`; `docs/dev/RobDevPass.md`; `docs/qa/RobQAPass.md`; supplied `archscry-dev-review-placement-validation-goal.md`.

## Disposition

**PASS — Owner Review Ready**

RobQAPass readiness verdict: **READY**. No blocking correctness, architecture, state-isolation, telemetry, gating, interaction, responsive, or rendered-product defect remains in the exact reviewed candidate. Final product acceptance still belongs to the owner's bounded review.

## Files reviewed

- `AGENTS.md`, `docs/qa/RobQAPass.md`, the supplied goal, current Kanban board/card, handoff index, and the RobDev handoff as an untrusted claim set.
- Exact diff `1c87dc2^..1c87dc2`, including all changed runtime, CSS, focused test, package/lint, Kanban, and handoff files.
- Existing production owners: Archscry boot, dossier composer/renderer/controls, questionnaire, Gate B1 engine exports, shared persistence and telemetry helpers, identity registry, faction data, dossier content/media interactions, and current all-37 witnesses.
- Untouched parent snapshot `b79a366` in an isolated `git archive` for independent placement-baseline reproduction.

## Files changed

- `docs/handoffs/2026-08-22-1406-codex-vm579-independent-robqa.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No runtime, CSS, test, package, card, board, or implementation-handoff file was modified during RobQA.

## Architecture verification

- Dossier Review is `identity -> renderIdentityDossier(identityKey) -> existing renderResult(..., { mode: "identity-review" }) -> existing buildCommanderDossier({ identityKey })`.
- The direct path passes `placementResult: null`, does not construct a substitute placement object, and suppresses placement-owned summaries, evidence, alternatives, refinement, saved/profile actions, reading-specific Maze handoff/finds, and persistence calls.
- The selector is derived from loaded `APP_STATE.identityLayers.expressions` and current faction records; discovered/selectable/structurally rendered counts are 37/37/37 with 0 missing and 0 unexpected.
- Engine Validation calls production `startQuickFlow()` and reads production `APP_STATE.adaptiveState` through existing `rankCandidates`, `getNamingQualification`, `getRoutingTrace`, `evaluateStopping`, and `getRefinementPath` exports.
- No target-identity control/input/helper, forced winner, score editor, replay editor, duplicate identity list, duplicate questionnaire, second dossier renderer, second placement engine, copied model, generic QA framework, or broad Archscry decomposition was added.
- The production gate is a small side-effect-free host/query predicate. The larger panel module is dynamically imported only after the gate passes.

## Change classification

- QA tier: QA-3, with QA-2/QA-1 rendered interaction and presentation coverage.
- Changed behavior: explicit local/flag-only development harness, identity-only use of the existing dossier renderer, and read-only inspection of a real production questionnaire journey.
- Protected behavior intentionally untouched: placement scoring/model/evidence/qualification/stopping, normal dossier semantics, production/nonlocal boot, saved/profile/cache state, Maze handoff, telemetry schema/provider, generated data, identity meaning, card media, and VM-576 transform behavior.

## Tests selected

- `npm run test:dev-review` — PASS. Independently exercised local/nonlocal gating, authoritative 37-identity discovery, all-37 direct composition/rendering, valid saved-placement restoration, persistence/profile/Maze/owner-state preservation, zero direct-review telemetry, normal journey telemetry retained, invalid identity handling, Jund close behavior, and both mode-isolation directions.
- `npm run lint:js` — PASS, 31 frontend files.
- `npm run lint:html` — PASS.
- `npm run test:gate-b1-runtime` — PASS.
- `npm run test:telemetry` — PASS.
- `npm run test:frontend-smoke` — PASS.
- `npm run test:archscry-transform` — PASS.
- `git diff --check 1c87dc2^ 1c87dc2` — PASS.
- `npm run test:placement` — exits 1 with exactly two failures: Esper visible-copy assertion at `quick-reading-tests.js:1985` and Quandrix starter-legendary whitelist count at `quick-reading-tests.js:2949`.
- Untouched-parent reproduction: ran `tests/placement/quick-reading-tests.js` from an isolated archive of exact parent `b79a366`; it produced the same two failures at the same assertions and no VM-579-only failure. These are inherited baselines, not candidate regressions.

## Tests intentionally skipped

- Exhaustive bias, random-journey, mutation, recovery, and all-37 placement certification suites.
- Why not required: the production engine, model, mappings, evidence, scoring, qualification, stopping, and generated authorities are unchanged. The task-mandated placement suite, focused live journeys, Gate B1 runtime integration, and current all-37 authority give proportionate coverage.
- Last relevant baseline/certification: the current VM-551 all-37 witness/review collection under `docs/audits/vm551-all-37-dossier-closeout/`.

## CPU-heavy validation

`NOT REQUIRED`

The explicitly required placement command was run, but no additional heavy certification suite was justified by the unchanged decision logic.

## Independent rendered evidence

- Desktop, 1440x1000: White, Dimir, Colorless, WUBRG, Grixis, and Yore / Artifice. Each showed the exact review label, correct identity hero, six identity-authored panels, zero placement panels, zero result/evidence/refinement claims, usable tabs, Maze links, cards/media, and no console errors.
- Desktop card interaction: opened a production White card-detail dialog successfully.
- Grixis transform interaction: opened `Nicol Bolas, the Ravager`, verified the production transform control, switched to `Nicol Bolas, the Arisen`, and verified face-specific title/type/oracle content.
- Mobile, 390x844: White, Dimir, Colorless, WUBRG, Grixis, and Yore / Artifice. The development panel stayed in normal flow, hero/panels fit the viewport, no horizontal overflow appeared, tabs remained usable, and journey-derived claims remained absent.
- Mobile interaction: activated an Identity & Play tab, opened and closed a glossary tooltip within viewport bounds, and opened a contained card-detail dialog without horizontal overflow.
- Persistence product check: after reviewing multiple identities, normal reload removed the dev panel and restored the pre-existing Selesnya dossier with its normal placement panel and `Current best fit` banner.
- Normal engine case: six real answers produced ABZAN with `primary / clear_separation`; the inspector visibly advanced evidence from 1 to 6, changed the ranked frontier, changed qualification to true, and exposed final output.
- Boundary case: six real answers produced JUND with `close / next_question_cannot_improve_responsible_top_boundary`; inspector exposed an unqualified numeric leader, qualified Jund/RG candidates, routing selection, and `no_approved_discriminator` refinement.
- Mode isolation: a prior direct Dimir selection did not affect the Jund engine result; switching back and directly rendering Grixis left the inspector's Jund close result intact while the dossier showed zero placement/journey claims.
- Browser console: zero errors throughout the independent rendered pass.

## Manual findings converted to invariants

- Finding: review-mode identity selection must never impersonate placement.
  - Defect class: semantic/state contamination.
  - Regression invariant: all-37 focused checks require no placement panel, result banner, answer/history copy, summary strip, adjacent fits, saved starter preference, persistence change, or telemetry.
- Finding: the dev sidecar must not block production answers or overflow narrow screens.
  - Defect class: development overlay interaction/responsive containment.
  - Regression invariant: the browser-backed focused journey must complete by real pointer controls; rendered desktop/mobile geometry must remain non-overlapping and horizontally contained.
- Finding: Grixis must retain production transform-card behavior through the direct seam.
  - Defect class: shared renderer interaction regression.
  - Regression invariant: existing transform suite plus independent Nicol Bolas front/back rendered check.

## Risks / uncertainties

- The required broad placement suite remains red on two independently proven parent-baseline assertions. They should be reconciled in their owning work, but they do not block this unchanged placement-engine observer seam.
- Raw inspector JSON is dense by design. Whether that density and the desktop/mobile harness placement feel ideal for repeated owner use are product-preference questions, not correctness blockers.

## Remaining owner judgment

- Whether the desktop sidecar and narrow-screen in-flow panel feel comfortable for repeated dossier QA.
- Whether raw JSON is an acceptable inspector presentation for current development use.

## Bounded owner review cases

1. Open normal localhost Archscry and confirm no panel; add `?vm-dev-review=1` and confirm the panel appears.
2. Direct-render Dimir and confirm the exact review label, normal dossier interactions, and no claim that answers selected Dimir.
3. Bounce through White, Colorless, WUBRG, Grixis, and one four-color identity; spot-check one or two at mobile width.
4. Exit review and reload normal Archscry; confirm the owner's real saved placement is unchanged.
5. Run one normal Engine Validation journey and one close/boundary path; confirm evidence/ranking/state evolve and no target-identity control exists.

Machine-verifiable all-37 coverage, persistence bytes, telemetry isolation, host gating, and bidirectional mode isolation do not need owner repetition.

## What changed / why it changed

This handoff and index entry record the independent exact-SHA RobQA evidence required before owner review. No product change was necessary because the candidate passed.

## Decisions made

- Classify the two placement-suite failures as inherited only after reproducing both from untouched parent `b79a366`.
- Accept the implementation as narrow development seams, not new product machinery.
- Advance exact candidate `1c87dc2669a007d7e59e5f71a46d20add5235e3a` to owner review without merging, closing, pushing, or altering the candidate.

## Not touched

- Candidate runtime, CSS, tests, package scripts, card, board, and RobDev handoff.
- Placement model/data/generated authorities, telemetry implementation, persistence implementation, Maze runtime, production deployment, and unrelated source/data work.
- VM-578 Player Language Corpus V1 branch, identity, cards, or artifacts.
- Pre-existing untracked `docs/research/maze-player-language/corpus/vm578.zip`.

## Follow-up recommendations

- Owner performs only the bounded cases above against exact candidate `1c87dc2`.
- Do not broaden this goal into inspector visualization, replay tooling, placement remediation, or Placement Manual replacement.
- Keep VM-579 In Progress and do not merge/close until owner acceptance.

## Next suggested agent

- Owner acceptance on exact candidate `1c87dc2669a007d7e59e5f71a46d20add5235e3a`.

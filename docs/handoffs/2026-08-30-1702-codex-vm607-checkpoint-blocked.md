# VM-607 Post-Wave-07 Checkpoint — Accepted-Contract Stop

- Agent name: Codex
- Task requested: complete the post-Wave-07 all-37 SIRF checkpoint, then continue Waves 08 and 09 only after every checkpoint gate passes.
- Related Kanban: `docs/kanban/in-progress/VM-607-sirf-post-wave-07-periodic-checkpoint.md`
- Baseline: `main == origin/main == 232cd84168bd201f8ea0ed57bfd37f4bcb139896`, divergence `0/0` at checkpoint start.

## Files reviewed

- SIRF plan, README, rollout tracker, VM-595 report/JSON, all twenty-eight accepted contracts, VM-603 checkpoint evidence, Wave 05–07 reports/runs/handoffs, RobDev and RobQA authorities, precon composer/recommender, provider source/catalog, and actual Dossier Review DOM.

## Files changed

- `docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/**`
- `docs/sirf/checkpoints/2026-08-30-post-wave-07-all-37-rendered-checkpoint.json`
- `docs/research/placement-language-trust-audit.json`
- `scripts/audit/placement-language-trust-audit.mjs`
- `tests/archscry/sirf-all-37-checkpoint-tests.js`
- `docs/kanban/in-progress/VM-607-sirf-post-wave-07-periodic-checkpoint.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-30-1702-codex-vm607-checkpoint-blocked.md`
- `docs/handoffs/HANDOFF_INDEX.md`

All changes remain uncommitted. Existing unrelated untracked recovery, corpus, and output paths were not changed or staged.

## What changed and why

- Collected 37 identities at desktop and mobile: 74 views and 74 screenshots, all five scoped sections present, no horizontal-overflow failures, and exact desktop/mobile taxonomy/group parity.
- Produced a fresh governed current-state audit: 37 dossiers, 37 governed screenshots, 36 engine `PASS_MATCH`, bounded Yore `NO_RESULT`, zero mismatch, and zero engine error.
- Parameterized the VM-595 producer with baseline/evidence/corpus flags while preserving its prior defaults, then generated and checked the Wave-07-baseline audit.
- Created a post-Wave-07 checkpoint candidate and advanced the deterministic checkpoint suite from sixteen to twenty-eight accepted contracts.

## Blocking finding

- Severity: P1.
- Classification: `ACCEPTED_CONTRACT_RENDER_REGRESSION`.
- Accepted authority: `docs/sirf/contracts/jund.json` requires six Exact-color products, including `Power Hungry`.
- Actual Owner-facing render: five Exact products; `Power Hungry` is absent.
- Root cause/owner: the `assets/js/archscry/runtime/dossier-view.js` editorial-rationale composition falls back to Prossh when every Jund rationale card is also a precon commander; `assets/js/archscry/runtime/content.js#filterPreconRecommendationsForEditorialCards` then removes `Power Hungry` before rendering.
- The product card adds distinct product, commander, mechanic, and deck-plan information, so the general cross-section card de-duplication rule is not safe for this precon context.
- This is the same shared filter family previously encountered for Temur Native Fit, now proven against an accepted Exact-color contract.

## RobDev packet

- Changed behavior intended: checkpoint evidence only; no product behavior change was authorized after the stop.
- Protected contracts: all twenty-eight SIRF contracts, WUBRG/Temur/Lorehold goldens, Placement, recommendations, and generated freshness.
- Smallest likely repair after Owner direction: change the shared precon composer so a precon product is not removed solely because its commander appears in another semantic section; preserve recommendation ordering and card-detail usage protections; add Jund actual-render coverage and rerun all affected accepted controls.
- Non-goals: no contract weakening, identity-specific workaround, generated-file edit, Placement change, Wave 08 work, broad copy rewrite, amend, or force-push.
- Stop condition met: accepted-contract regression.

## RobQA status

- QA tier: QA-1 rendered composition, high semantic-contract risk.
- PASS: all-37 rendered collection integrity; current-state producer; VM-595 producer/check.
- FAIL: `npm.cmd run test:sirf-all-37-checkpoint` at `JUND must render every required Exact-color product`.
- Not run after the stop: full accepted/golden regression suite, Wave 08, final checkpoint, candidate commit, or push.
- Owner-review readiness: not ready; accepted-contract mismatch is unresolved.

## Risks / uncertainties

- The shared filter may hide other overflow precons whose face commander is already used elsewhere, although Jund is the only currently promoted contract whose required rendered count failed this checkpoint.
- The checkpoint screenshot set uses full-page captures for the first nine identities and viewport captures for the remainder after the Browser encoder rejected a tall full-page image; DOM full-document dimensions and section presence were still collected for all views.

## Not touched

- Placement/scoring/routing/qualification, raw identity/metaphysics, accepted contracts, provider source/catalog, renderer behavior, Wave 08 identities, Wave 09 Colorless, and all preserved unrelated paths.

## Follow-up recommendations

1. Obtain Owner direction to repair the shared precon composer without weakening the Jund contract.
2. Add a rendered regression that proves `Power Hungry` remains in Jund Exact even when Prossh appears in another section.
3. Rerun the all-37 checkpoint and every affected accepted/golden control from the exact baseline.
4. Only after VM-607 passes, complete its independent commit/push and proceed to Wave 08.

- Next suggested agent: implementation agent using RobDev, then RobQA owner-readiness validation.

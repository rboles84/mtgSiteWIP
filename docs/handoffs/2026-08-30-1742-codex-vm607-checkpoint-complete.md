# Codex Handoff — VM-607 Post-Wave-07 Checkpoint Complete

## Agent name

Codex

## Task requested

Apply the Owner-authorized shared precon-composer repair, prove Jund's accepted six-product contract without a special case, finish the VM-607 all-37 checkpoint, commit/push it independently, and continue automatically to SIRF Wave 08.

## Files reviewed

- Owner authorization attachment and VM-607 stopped-state packet.
- `.agents/skills/robdev/` and frozen `docs/dev/RobDevPass.md`.
- `.agents/skills/robqa/` and frozen `docs/qa/RobQAPass.md`.
- SIRF deployment plan, README, rollout tracker, all 28 accepted contracts, Wave 05–07 reports/handoffs, VM-595, precon source/catalog/schema/builder, dossier composer, and all relevant focused tests.
- All 155 generated precon products and all 37 actual dossiers.

## Files changed

The exact 29-file Git candidate is enumerated in `docs/sirf/reports/2026-08-30-sirf-post-wave-07-all-37-checkpoint.md`. Local untracked large evidence lives under `outputs/vm607-sirf-checkpoint/` and is not part of the Git candidate.

## What changed

- Replaced cross-role commander filtering with product-slug de-duplication in Native → Exact → Stretch precedence.
- Kept editorial card de-duplication separate and removed precon commanders from the editorial starter-card usage plan.
- Added systemic face/alternate/duplicate/precedence/contract regressions across 155 products and 28 contracts.
- Advanced VM-551/VM-574 invariants to the corrected semantic-object boundary.
- Added exact declared candidate-diff support to the governed current-state and VM-595 producers.
- Recollected 37 desktop + 37 mobile full-page renders and refreshed current-state / VM-595 evidence.
- Closed VM-607 lifecycle documentation and recorded the final checkpoint.

## Why it changed

The prior composer treated a precon product as a duplicate of an editorial card when they shared a main commander. That erased decision-relevant product information across section roles and violated Jund's accepted contract. Products and cards are different semantic object types, so their uniqueness domains must remain separate.

## Decisions made

- No Jund, Prossh, Power Hungry, WUBRG, or other identity-specific exception was added.
- The stable product identity is the generated catalog-required `slug`; deck/commander display text is not the de-duplication authority.
- Native outranks Exact, which outranks Stretch when the same product appears more than once.
- Main or alternate commander editorial overlap never removes a product.
- The repair required all-37 rendered QA but not CPU-heavy Placement/journey/mutation suites because Placement behavior is untouched.

## RobDev compact packet

- Product outcome: required products and editorial cards coexist when they add different player information.
- Owning authority/producer: final runtime composer over the current governed precon catalog.
- Changed behavior: only cross-role dossier composition and exact candidate declaration in audit tooling.
- Protected behavior: semantics, product facts, classification/ranking, Placement, persistence, telemetry, CRIT-001, generated catalogs, and all accepted controls.
- Consumers: all 37 dossiers, VM-551/VM-574 validators, current-state audit, VM-595, and SIRF checkpoint tests.
- Risks: shared visible composition and audit freshness; controlled by exact-path declarations, 155-product systemic tests, and 74 fresh renders.
- Non-goals: no Wave 08 semantics inside VM-607, no duplicate-count optimization, no product-source rewrite, no broad Placement repair.
- Stop conditions: all cleared; accepted contracts and goldens pass.

## Risks / uncertainties

- The five Wave 08 identities retain unpromoted pre-Wave-08 taxonomy/copy and are intentionally not treated as accepted contracts by VM-607.
- Colorless remains queued after Wave 08.
- Large rendered evidence is local/ignored; the tracked current-state manifest contains governed hashes.

## Tests run

- Shared composer, all-37 checkpoint, all seven accepted SIRF batch suites, WUBRG/Temur/Lorehold goldens.
- Precon builder/artifact, provider 155/155, dossier builder, VM-551 integrity, VM-574 card signals.
- Governed current-state producer: 37/37, 36 PASS_MATCH, bounded Yore NO_RESULT.
- Fresh VM-595 producer/check: PASS, 1,383 prose units / 1,642 sentences.
- Actual 37/74 responsive rendered collection: all sections, no overflow, no duplicate products, desktop/mobile parity.
- Syntax checks and `git diff --check`.

## RobQA readiness

- Risk tier: QA-2 shared visible composition.
- Changed behavior: product visibility under editorial commander overlap.
- Protected contracts: 28 promoted contracts, three goldens, 155 provider/product records, and all unrelated product systems.
- Deterministic validation: PASS.
- Rendered self-QA: PASS; representative Jund, WUBRG, and Dune full-page evidence inspected.
- Residual risk: limited to unpromoted identities' already queued semantic work.
- Owner review needed: none under explicit authorization and exception-based completion.

## Not touched

- Placement/scoring/routing/qualification, CRIT-001 semantic truth, precon source/catalog facts, telemetry, persistence, and unrelated untracked paths.
- Wave 08 semantic owners were not modified before VM-607 publication.

## Follow-up recommendations

Start Wave 08 immediately for Dune, Glint, Ink, Witch, and Yore, reusing the corrected composer and retaining WUBRG/Temur/Lorehold plus all 28 contracts as controls. Colorless remains the final queued identity.

## Next suggested agent

Codex under the existing exception-based SIRF orchestration.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-607-sirf-post-wave-07-periodic-checkpoint.md`
- `docs/sirf/reports/2026-08-30-sirf-post-wave-07-all-37-checkpoint.md`
- `docs/sirf/runs/2026-08-30-sirf-post-wave-07-all-37-checkpoint.md`
- `docs/sirf/checkpoints/2026-08-30-post-wave-07-all-37-rendered-checkpoint.json`
- `docs/sirf/SIRF-v0.2-atlas-wide-deployment-plan.md`
- `docs/sirf/rollout-tracker.md`

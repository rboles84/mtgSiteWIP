# VM-588 — Archscry Phase 2 Product Contract

## Status

In Progress

## Type

Product-contract design / documentation / Phase 3 proof boundary

## Area

Archscry, Gate B1, Commander Compass, dossier-to-Maze/Loom exploration, reading state

## Priority

High

## Created

2026-08-23

## Controlling Scope

The owner-provided `archscry-phase2-product-contract-goal-mode-master-prompt.md` controls this Goal Mode run. Exact accepted starting baseline: `e875c624d2c3463aa6af9b8ab473c7401a4d6d14`.

Phase 1 is accepted and frozen. VM-586, VM-587, Yore research, all-37 evidence, mappings, questionnaire behavior, and dossier remediation remain closed.

## Outcome

Define the smallest durable contract that keeps `self_reported_prior` and `observed_gameplay_fit` separate, explains their relationship without a composite placement result, permits only bounded reason-bearing exploration, preserves reading history, and gives Phase 3 a measurable proof gate.

## Intake Triage

- Verdict: proceed.
- Smallest safe version: three product artifacts only—one normative contract, one 12-case design fixture table, and one Phase 3 proof handoff—plus required Kanban and handoff-index governance.
- Review level: QA-0 RobDev self-review followed by fresh independent RobQA of the exact documentation candidate.
- Stop condition: any need to change runtime, UI, questionnaire, mapping, placement, dossier content, telemetry, persistence implementation, Yore authority, or begin Phase 3.

## Reuse-First Findings

- Gate B1 placement engine owns behavioral evidence, ranking, qualification, stopping, refinement, and current qualified alternatives.
- Gate A presentation owns public `primary`, `close`, `tied`, `mixed`, `contradictory`, `insufficient`, and compatibility states.
- Existing `IDENTITY_LENS_SELF_REPORT` is a separate, bounded post-behavior lens; it is not the new pre-reading prior and must not be silently repurposed.
- Existing normalized `placement_result`, session cache, profile save/resume, and versioning rules own persisted reading behavior; Phase 2 adds semantics, not a storage subsystem.
- Commander Compass, Native Fit / Weird Stretch guidance, dossier paths, Maze, Loom, and Strategium already own downstream exploration or learning roles.
- Current VM-579/VM-586 witnesses, dev-review route, replay tooling, and audit conventions are sufficient for future proof work; Phase 2 needs only design fixtures.

## RobDev Pre-Edit Contract

- Product outcome: a future implementer can represent prior, observed fit, reconciliation, and exploration without allowing prior leakage into placement truth.
- Current behavior: Archscry produces behavior-first readings and qualified alternatives; it has no accepted pre-reading prior/reconciliation contract.
- Locked decisions: this is not `A + B = C`; priors never score, qualify, name, prune, promote, suppress, or change public result state; Yore remains bounded; Phase 3 alone may test experienced-path shortening after a prior-independent evidence floor.
- Owning layer: this card and the normative Phase 2 contract own product semantics; current engine/presentation/persistence/exploration owners retain runtime authority.
- Authoritative producer: authored contract documents only; there is no generated product artifact.
- Existing machinery: reuse current result states, Gate B1 behavioral result, existing exploration owners, normalized saved-result envelope, reading run semantics, VM-579 review seam, VM-586 witnesses, and RobDev/RobQA gates.
- Changed behavior: repository policy for a future Archscry prior/reconciliation experience and the proof required before Phase 3 implementation.
- Protected behavior: all current runtime, placement, mappings, questions, qualification, stopping, dossier truth, Yore, Commander guidance data, telemetry, persistence code/schema, and VM-578.
- Consumers: future Phase 3 experiment design, result/explanation design, state-versioning work, and owner product review.
- Relevant states: no prior, one/multiple priors, agreement, partial/no overlap, non-comparable mechanic context, close/ambiguous/insufficient results, edited prior, and a new reading.
- Smallest complete implementation: the three requested documents and no runtime machinery.
- Non-goals: UI, exact display count, exact shortened question count, recommendation engine, deck import/free text/favorite commander inference, numeric prior confidence, telemetry schema, persistence schema, Phase 3 execution.

## Acceptance

- The contract includes a compact reuse map and clear signal owners.
- Priors and mechanic preferences cannot affect placement truth.
- Reconciliation is relationship/explanation only.
- Exploration is a small prioritized set with an allowed reason and `why this appeared` for every direction.
- All 12 fixtures are coherent without one-off exceptions.
- Reading snapshots prevent prior edits or retakes from rewriting old observations.
- The Phase 3 handoff defines the blind floor, savings, unexpected-identity discoverability, and fallbacks without inventing an arbitrary question count.
- RobDev self-review passes.
- Fresh independent RobQA returns `PASS — Owner Review Ready`.

## Required Deliverables

- `docs/contracts/archscry-product-contract-v1.md`
- `docs/contracts/archscry-phase-2-contract-fixtures.md`
- `docs/handoffs/2026-08-23-1344-codex-archscry-phase-3-proof-handoff.md`

## Not Authorized

No UI, runtime, data, questionnaire, mapping, engine, dossier, telemetry, persistence, migration, deployment, Phase 3 experiment, or VM-578 change.

## Current Gate

`PASS — RobDev Ready`; exact documentation candidate and fresh independent RobQA are next.

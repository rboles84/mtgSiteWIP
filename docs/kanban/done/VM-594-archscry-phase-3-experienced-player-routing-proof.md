# VM-594 — Archscry Phase 3 Experienced-Player Routing Proof

## Status

Done — Owner Accepted

## Type / Area / Priority

Research / current-system analysis / proof design; Archscry question routing and evidence integrity; post-launch enhancement.

## Summary

Determine whether a bounded self-reported prior can reduce redundant Archscry questions while remaining completely outside placement evidence, qualification, candidate membership/order, stopping, naming, and public-result semantics.

## Intake Triage

- Verdict: proceed with current-system analysis; stop before assisted implementation.
- Smallest safe version: one reproducible accepted-witness baseline, one floor/equivalence analysis, and one adversarial paired-proof design.
- Review level: RobDev grounded research plus QA-0 deterministic validation and owner judgment.
- Stop condition: any production routing, question/mapping, placement, telemetry, persistence, VM-593, or VM-578 change.

## Locked Decisions

- `self_reported_prior`, `observed_gameplay_fit`, and `reconciliation` remain separate.
- The prior never becomes placement evidence and may only choose between questions proven behaviorally equivalent, never between results.
- Yore remains behaviorally bounded under VM-587.
- No shortcut runtime, UI, telemetry, persistence, recruitment, or Phase 4 work is authorized.

## Acceptance Criteria

- [x] Current production routing/stopping are traced to current owners, and accepted witnesses produce a reproducible fixed/adaptive/total count baseline.
- [x] C01–C04 and later checkpoints are assessed against frontier, evidence, qualification, stopping, and unexpected-identity requirements, with one explicit floor finding.
- [x] Control/Assisted paths, adversarial cases, contamination checks, fallbacks, and 2–3 measured savings definitions are specified without product behavior changes.
- [x] Phase 3 receives one disposition and launch-priority classification with protected runtime, telemetry, persistence, VM-593, and VM-578 untouched.

## Findings

- Distribution: 6 questions for 6 witnesses, 7 for 4, and 8 for 27; median 8.
- After C01–C04, the frontier is 2–8 (median 4), with zero qualified identities.
- Four exact utility ties occur; only one has equal exhaustive public terminal signatures, and none has an evidence/qualification/stopping equivalence certificate.
- Floor: `NO SAFE PRIOR-ASSISTED FLOOR FOUND`.
- Disposition: `BLOCKED — NO SAFE ROUTING SEAM`.
- Launch priority: `POST-LAUNCH ENHANCEMENT`.

## Owner Acceptance

Owner accepted the bounded negative result on 2026-08-29. Phase 3 investigated whether `self_reported_prior` could safely reduce question count; current routing cannot certify branch-equivalent question opportunities, and changing order can change evidence/result exposure. No shortened experienced-player Placement route is authorized. The existing prior-blind Placement remains authoritative, and the concept is deferred post-launch unless future architecture supplies a safe equivalence contract.

## Deliverables

- [Proof analysis](../../research/archscry-phase-3-experienced-player-routing-proof.md)
- [Routing baseline](../../research/archscry-phase-3-routing-baseline.json)
- `scripts/audit/archscry-phase-3-routing-analysis.mjs`
- [Handoff](../../handoffs/2026-08-29-1741-codex-archscry-phase-3-routing-proof.md)

## Stop

Closed as Owner Accepted. Do not create an implementation story or shortened questionnaire unless separate future authority resolves the branch-equivalence blocker.

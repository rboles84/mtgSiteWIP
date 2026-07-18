# VM-517 — White Semantic Recovery

ID: VM-517
Status: Approved - Awaiting Certification
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: W
Raw packet: `data/raw-factions/white/`
Cohort: mono
Contract: CRIT-001 Contract v1.1

## Objective

Recover White end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [x] Independent review.
- [ ] Certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-517-white-semantic-recovery.md`
- Candidate recovery SHA: `89535e5f73598a5b518e31e11598b05087274a95`
- Independent reviewer: Codex independent review window
- Certification commit: pending

## Drift Preflight State

VM-517 White / W is setup only after VM-516 Simic certification.

Starting branch: `codex/vm-517-white-semantic-recovery`.

Program base after Simic certification: `272337004aa63cfd33da5f1a859c33d211c8ca74`.

Drift preflight record: `docs/incidents/recoveries/VM-517-white-drift-preflight.md`.

Preflight decision: `STOP - WHITE GATE 1+2 NOT AUTHORIZED`.

Reason: Wave 3 monocolor compatibility is not process-ready. The exact candidate-scope probe `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W` exits 1 with a TypeError because the validator assumes raw `collision_guidance` is an array while White stores `collision_guidance` as an object with `pairs`.

The original STOP decision remains preserved and historical.

## Infrastructure Candidate State

Shared infrastructure candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.

Workflow record: `docs/incidents/recoveries/VM-517-monocolor-validator-candidate-workflow.md`.

Drift register entry: `DRIFT-016`.

Candidate status: independently approved by exact-SHA review.

Infrastructure review record: `docs/incidents/recoveries/VM-517-monocolor-validator-independent-review.md`.

Infrastructure review decision: `APPROVE EXACT SHA aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.

Scope: validator/test infrastructure only. The candidate normalizes documented array and object-with-`pairs` collision-guidance shapes for candidate-scope validation and fails closed on unsupported shapes with explicit diagnostics.

The infrastructure approval did not by itself authorize White Gate 1+2, source inspection, semantic audit, remediation, generated rebuild, candidate creation, independent review, certification, VM-518 work, program-base advancement, or external tracker updates.

## Drift Preflight Rerun State

Rerun record: `docs/incidents/recoveries/VM-517-white-drift-preflight-rerun.md`.

Rerun starting HEAD: `af3d8c6c563b3743f65c2dc8478519707f4785c8`.

Rerun decision: `PASS - WHITE GATE 1+2 AUTHORIZED`.

Reason: The independently approved validator candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` remains unchanged in the current tree, and the complete rerun found no `FAIL` or `UNKNOWN` controls. White and Blue object-with-`pairs` candidate-scope probes no longer crash; White reaches deliberate pre-remediation proof-chain findings, while representative array behavior remains intact.

Gate 1+2 has now completed in `docs/incidents/recoveries/VM-517-white-semantic-recovery.md`.

## Gate 1+2 Audit State

Gate 1+2 report: `docs/incidents/recoveries/VM-517-white-semantic-recovery.md`.

Gate 1+2 governance commit: `307b93d56b4314405011f21f7d7616ac4b7ed16f`.

Decision: `REMEDIATION AUTHORIZED`.

Initial claim-role count: 8 total; 0 substantive, 0 discovery, 0 support, 8 unclassified.

Gate 1+2 role disposition for Gate 3+4: `white_claim_0002` through `white_claim_0007` become source-bounded `substantive_claim`; `white_claim_0001` and `white_claim_0008` become `support_record` and must be isolated from canonical profile, placement, public, recruiter, fixture, semantic-readiness, and provenance proof chains.

Primary blockers to remediate: missing claim-level semantic roles, missing bounded evidence locations and `evidence_scope`, support/governance/rules/Scryfall rows in authoritative proof chains, 3 null W provenance canonical IDs, missing White semantic fixture, missing evidence mapping for placement chatbot mismatch guidance, and required-neighbor fixture/collision coverage.

Frozen fields to preserve: object-with-`pairs` collision guidance; lateral targets `WU`, `WB`, `WG`, `WR`; collision targets `B`, `R`; absent explicit `GENERIC_W_OVERFIT`; required terms, minimum hits, broad penalty, strengthen/suppress lists, native IDs, calibration, and preview source-to-embedded equality.

## Gate 5 Candidate State

Superseded candidate: `8d6014950e5ca45ef85a90855cf283d80fd18e0d`.

Supersession reason: post-commit candidate-scope validation rejected added `placement_summary/calibrated_primary_read` and `placement_summary/calibrated_false_positive_guardrail` fields.

Final candidate awaiting independent review: `89535e5f73598a5b518e31e11598b05087274a95`.

Candidate-scope command: `node research/validate-semantic-candidate-scope.mjs --base=307b93d56b4314405011f21f7d7616ac4b7ed16f --target=89535e5f73598a5b518e31e11598b05087274a95 --identity=W`.

Candidate-scope result: PASS.

Final validation passed: `npm.cmd run build:factions`, `node research/audit-semantic-readiness.mjs --targets=W`, `node research/validate-semantic-readiness.mjs --targets=W`, `node research/semantic-candidate-scope-tests.js`, `npm.cmd run test:semantic-readiness`, `npm.cmd run test:placement`, `npm.cmd run test:faction-context-isolation`, `npm.cmd run test:source-generated`, `npm.cmd test`, and `git diff --check`.

White independent review approved exact candidate `89535e5f73598a5b518e31e11598b05087274a95` in `docs/incidents/recoveries/VM-517-white-independent-review.md`.

Review decision: `APPROVE EXACT SHA 89535e5f73598a5b518e31e11598b05087274a95`.

Certification, `semantically_ready`, program-base advancement, VM-518 work, and external tracker updates remain unauthorized/not started.

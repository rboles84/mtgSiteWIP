# VM-518 - Blue Semantic Recovery

ID: VM-518
Status: Done - Certified
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: U
Raw packet: `data/raw-factions/blue/`
Cohort: mono
Contract: CRIT-001 Contract v1.1

## Objective

Recover Blue end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

Final state: certified `semantically_ready` from exact approved candidate `ac774e2eac207cc7fe2d744beac1f11788908159`. No superseded Blue candidate exists. VM-519 Black is setup-only with drift preflight pending.

## Gates

- [x] Drift preflight - Passed; Gate 1+2 authorized.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [x] Independent review of exact candidate SHA.
- [x] Certification of exact approved candidate SHA.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-518-blue-semantic-recovery.md`
- Drift preflight record: `docs/incidents/recoveries/VM-518-blue-drift-preflight.md`
- Independent review record: `docs/incidents/recoveries/VM-518-blue-independent-review.md`
- Approved candidate SHA: `ac774e2eac207cc7fe2d744beac1f11788908159`
- Superseded candidate SHA: none
- Certification commit: `PENDING_VM518_CERTIFICATION_COMMIT_SHA`

## Certification State

Blue / U is certified `semantically_ready` from exact independently approved candidate `ac774e2eac207cc7fe2d744beac1f11788908159`.

Independent review decision: `APPROVE EXACT SHA ac774e2eac207cc7fe2d744beac1f11788908159`.

Certification guard summary:

- Starting branch and HEAD matched the required VM-518 review state: `codex/vm-518-blue-semantic-recovery` at `7a000a6c8919b45238810b0a30020da74e050a7f`.
- Required object and ancestry checks passed from program base `9d250a7a76d219fdb961915cbf989a10a575c757` through approved monocolor validator, Blue preflight, Gate 1+2, exact candidate, candidate workflow, and approval review.
- Exact candidate-scope validation passed for `428128505a194293feb915c929072e23dc9f0ace..ac774e2eac207cc7fe2d744beac1f11788908159`.
- Blue claim counts remain 8 total, 6 `substantive_claim`, 0 `discovery_record`, 2 `support_record`, 0 `unclassified`.
- U provenance remains 25 entries with 0 null canonical IDs, 0 null hashes, 0 unresolved pointers, 0 duplicate canonical entries, and 0 support/discovery-backed authoritative chains.
- Exact fixture/provenance parity passed for `/core_identity` and `/placement_summary`.
- Frozen placement summary text, required terms, minimum hits, broad penalty, strengthen/suppress lists, lateral targets `WU`, `UB`, `UR`, `UG`, collision targets `R`, `G`, native IDs, calibration, absent generic collision target, preview equality, raw object-with-`pairs` collision guidance, and generated collision-array semantics are preserved.
- `npm.cmd run test:source-generated` retains known unrelated JESKAI/MARDU model-owned inhibitor warnings and exits 0.
- `git diff --check` emitted line-ending warnings only and exited 0.

## VM-519 Setup Boundary

VM-519 Black / B may proceed only as setup after this certification. Black drift preflight, Gate 1+2 semantic audit, source inspection, remediation, generated rebuilds, candidate creation, review, certification, external tracker update, push, PR, and merge are not started by this card.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stayed in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning remain excluded.

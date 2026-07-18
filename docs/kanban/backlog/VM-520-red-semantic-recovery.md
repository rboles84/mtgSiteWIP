# VM-520 - Red Semantic Recovery

ID: VM-520
Status: Gate 5 Candidate Created - Awaiting Independent Review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: R
Raw packet: `data/raw-factions/red/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after committed drift preflight

## Objective

Prepare the next CRIT-001 identity slot for Red / R after VM-519 Black certification. The VM-520 drift preflight passed, Gate 1+2 read-only audit completed with `REMEDIATION AUTHORIZED`, and Gate 3+4 remediation produced exact candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`. Independent review, approval, certification, external tracker update, push, PR, and merge are not started.

## Gates

- [x] Drift preflight - passed in `docs/incidents/recoveries/VM-520-red-drift-preflight.md`; commit `PENDING_VM520_DRIFT_PREFLIGHT_SHA`.
- [x] Gate 1 - Packet audit and bounded disposition; completed in `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`; commit `6c2b6dfc3e9e838f9e75801517a81258b675923d`.
- [x] Gate 2 - Sufficient evidence completion; completed in `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`; commit `6c2b6dfc3e9e838f9e75801517a81258b675923d`.
- [x] Gate 3 - Canonical remediation; candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.
- [x] Gate 4 - Generation and validation; full required validation passed with documented DRIFT-015 candidate-scope exception.
- [x] Gate 5 - Candidate creation; exact candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` awaits independent review.
- [ ] Independent review of exact candidate SHA.
- [ ] Certification of exact approved candidate SHA.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- Red semantic data may be inspected only for the next Gate 1+2 read-only audit. No remediation, generation, candidate, review, or certification is authorized by the drift preflight.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- Drift preflight record: `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- Candidate recovery SHA: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`
- Independent reviewer: pending
- Certification commit: pending

## Setup Boundary

VM-520 Red / R was created only as the next active CRIT-001 identity slot after VM-519 Black certification. The separate drift-preflight record applied `docs/incidents/CRIT-001-drift-control-template.md` and returned `PASS - RED GATE 1+2 AUTHORIZED`. Gate 1+2 completed read-only and recorded `REMEDIATION AUTHORIZED`; Gate 3+4 remediation and Gate 5 candidate creation are now complete. Exact candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` awaits independent review and is not approved, not certified, and not `semantically_ready`.

# VM-520 - Red Semantic Recovery

ID: VM-520
Status: Gate 1+2 Authorized - Not Started
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: R
Raw packet: `data/raw-factions/red/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after committed drift preflight

## Objective

Prepare the next CRIT-001 identity slot for Red / R after VM-519 Black certification. The VM-520 drift preflight passed and authorizes only the next Gate 1+2 read-only audit. Red semantic inspection, remediation, candidate creation, independent review, certification, external tracker update, push, PR, and merge are not started.

## Gates

- [x] Drift preflight - passed in `docs/incidents/recoveries/VM-520-red-drift-preflight.md`; commit `PENDING_VM520_DRIFT_PREFLIGHT_SHA`.
- [ ] Gate 1 - Packet audit and bounded disposition; authorized but not started.
- [ ] Gate 2 - Sufficient evidence completion; authorized but not started.
- [ ] Gate 3 - Canonical remediation.
- [ ] Gate 4 - Generation and validation.
- [ ] Gate 5 - Candidate creation.
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
- Audit/recovery report: pending
- Drift preflight record: `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Setup Boundary

VM-520 Red / R was created only as the next active CRIT-001 identity slot after VM-519 Black certification. The separate drift-preflight record applied `docs/incidents/CRIT-001-drift-control-template.md` and returned `PASS - RED GATE 1+2 AUTHORIZED`. Gate 1+2 may begin in a later window as read-only audit only; remediation remains unauthorized until that gate explicitly records its decision.

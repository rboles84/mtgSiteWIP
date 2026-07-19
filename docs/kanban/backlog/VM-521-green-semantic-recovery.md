# VM-521 - Green Semantic Recovery

ID: VM-521
Status: Gate 1+2 Authorized - Not Started
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: G
Raw packet: `data/raw-factions/green/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after committed drift preflight

## Objective

Prepare the next CRIT-001 identity slot for Green / G after VM-520 Red certification. The VM-521 drift preflight passed and authorizes only the next Gate 1+2 read-only audit.

Current state: VM-521 Green / G completed drift preflight with `PASS - GREEN GATE 1+2 AUTHORIZED`. Gate 1+2 is authorized but not started. No remediation, generation, candidate, review, certification, external tracker update, push, PR, or merge has occurred.

## Gates

- [x] Drift preflight - passed in `docs/incidents/recoveries/VM-521-green-drift-preflight.md`; commit `PENDING_VM521_DRIFT_PREFLIGHT_SHA`.
- [ ] Gate 1 - Packet audit and bounded disposition; authorized but not started.
- [ ] Gate 2 - Sufficient evidence completion; authorized but not started.
- [ ] Gate 3 - Canonical remediation; not started.
- [ ] Gate 4 - Generation and validation; not started.
- [ ] Gate 5 - Candidate creation and independent review; not started.
- [ ] Certification of exact approved candidate SHA; not started.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- Green source, claim, profile, placement, generated data, fixtures, provenance, preview, recruiter, and recommendation data may be inspected only for the next Gate 1+2 read-only audit. No remediation, generation, candidate, review, or certification is authorized by the drift preflight.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift preflight record: `docs/incidents/recoveries/VM-521-green-drift-preflight.md`
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Setup Boundary

VM-521 Green / G was created only as the next active CRIT-001 identity slot after VM-520 Red certification. Current program base is the VM-520 Red certification SHA `9f0a076a369cba23dc9bc19231b0efcddd21afe5`. The separate drift-preflight record applied `docs/incidents/CRIT-001-drift-control-template.md` and returned `PASS - GREEN GATE 1+2 AUTHORIZED`. Gate 1+2 may begin in a later window as read-only audit only; remediation remains unauthorized until that gate explicitly records its decision. Candidate creation, review, certification, VM-522 work, original-main modification, and Excel updates remain not started.

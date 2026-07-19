# VM-521 - Green Semantic Recovery

ID: VM-521
Status: Setup Only - Drift Preflight Pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: G
Raw packet: `data/raw-factions/green/`
Cohort: mono
Contract: pending CRIT-001 Contract v1.1 drift preflight

## Objective

Prepare the next CRIT-001 identity slot for Green / G after VM-520 Red certification. This card is setup-only until a separate committed drift-preflight control record applies `docs/incidents/CRIT-001-drift-control-template.md` and returns no `FAIL` or `UNKNOWN` controls.

Current state: VM-521 Green / G is not started beyond governance setup. Drift preflight is pending, Gate 1+2 is not authorized or started, no Green semantic data was inspected in the VM-520 certification window, and no remediation, generation, candidate, review, certification, external tracker update, push, PR, or merge has occurred.

## Gates

- [ ] Drift preflight - pending in a separate control-record task.
- [ ] Gate 1 - Packet audit and bounded disposition; blocked until drift preflight passes.
- [ ] Gate 2 - Sufficient evidence completion; blocked until drift preflight passes.
- [ ] Gate 3 - Canonical remediation; not started.
- [ ] Gate 4 - Generation and validation; not started.
- [ ] Gate 5 - Candidate creation and independent review; not started.
- [ ] Certification of exact approved candidate SHA; not started.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- Green source, claim, profile, placement, generated data, fixtures, provenance, preview, recruiter, and recommendation data must not be inspected until a separate VM-521 drift-preflight task authorizes Gate 1+2.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift preflight record: pending
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Setup Boundary

VM-521 Green / G was created only as the next active CRIT-001 identity slot after VM-520 Red certification. Current program base is the VM-520 Red certification placeholder `PENDING_VM520_CERTIFICATION_COMMIT_SHA` inside tracked governance; the actual SHA is reported in final task output. The next permitted action is a separate VM-521 drift-preflight control record. Gate 1+2, Green semantic inspection, remediation, candidate creation, review, certification, VM-522 work, original-main modification, and Excel updates remain not started.

# VM-519 - Black Semantic Recovery

ID: VM-519
Status: Backlog - Setup Only / Drift Preflight Pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: B
Raw packet: `data/raw-factions/black/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 pending separate drift preflight

## Objective

Recover Black end to end under CRIT-001 after VM-518 Blue certification. This card is setup-only until a separate committed VM-519 drift-preflight control record passes with no `FAIL` or `UNKNOWN` results.

Current state: branch setup only after Blue certification. Black drift preflight, Gate 1+2 semantic audit, source inspection, remediation, generation, candidate creation, independent review, certification, external tracker update, push, PR, and merge are not started.

## Gates

- [ ] Drift preflight - Pending; must be completed in a separate committed record before Gate 1+2.
- [ ] Gate 1 - Packet audit and bounded disposition.
- [ ] Gate 2 - Sufficient evidence completion.
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
- No Black semantic data may be inspected or changed before the separate VM-519 drift preflight is committed.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: pending
- Drift preflight record: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Setup Boundary

VM-519 Black / B is authorized only for branch/card setup from the VM-518 Blue certification program base. Black drift preflight and Gate 1+2 must occur in a later window.

# VM-519 - Black Semantic Recovery

ID: VM-519
Status: Backlog - Drift Preflight Passed / Gate 1+2 Authorized Not Started
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: B
Raw packet: `data/raw-factions/black/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after separate drift preflight

## Objective

Recover Black end to end under CRIT-001 after VM-518 Blue certification. The separate committed VM-519 drift-preflight control record has passed with no `FAIL` or `UNKNOWN` results.

Current state: drift preflight passed and Gate 1+2 is authorized but not started. Remediation, generation, candidate creation, independent review, certification, external tracker update, push, PR, and merge are not started.

## Gates

- [x] Drift preflight - Passed in `docs/incidents/recoveries/VM-519-black-drift-preflight.md`; Gate 1+2 authorized but not started.
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
- No Black semantic data may be changed before a later Gate 1+2 read-only audit authorizes remediation.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: pending; Gate 1+2 not started
- Drift preflight record: `docs/incidents/recoveries/VM-519-black-drift-preflight.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Setup Boundary

VM-519 Black / B passed drift preflight from the VM-518 Blue certification program base. Gate 1+2 may occur only in a later read-only audit window. Remediation remains unauthorized.

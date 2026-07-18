# VM-520 - Red Semantic Recovery

ID: VM-520
Status: Setup Only - Drift Preflight Pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: R
Raw packet: `data/raw-factions/red/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after separate committed drift preflight

## Objective

Prepare the next CRIT-001 identity slot for Red / R after VM-519 Black certification. This card is setup-only: Red drift preflight, Gate 1+2, semantic inspection, remediation, candidate creation, independent review, certification, external tracker update, push, PR, and merge are not started.

## Gates

- [ ] Drift preflight - pending; must be a separate committed control record before Gate 1+2.
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
- No Red semantic data may be inspected or changed before the separate VM-520 drift-preflight window authorizes its next gate.

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

VM-520 Red / R was created only as the next active CRIT-001 identity slot after VM-519 Black certification. A later separate drift-preflight record must apply `docs/incidents/CRIT-001-drift-control-template.md` before any Red Gate 1+2 semantic work begins.

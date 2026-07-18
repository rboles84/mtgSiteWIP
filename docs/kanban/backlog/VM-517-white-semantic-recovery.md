# VM-517 — White Semantic Recovery

ID: VM-517
Status: Setup Only - Drift Preflight Pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: W
Raw packet: `data/raw-factions/white/`
Cohort: mono
Contract: CRIT-001 Contract v1.1

## Objective

Recover White end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [ ] Gate 1 — Packet audit and bounded disposition.
- [ ] Gate 2 — Sufficient evidence completion.
- [ ] Gate 3 — Canonical remediation.
- [ ] Gate 4 — Generation and validation.
- [ ] Gate 5 — Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Setup State

VM-517 White / W is setup only after VM-516 Simic certification.

Starting branch: `codex/vm-517-white-semantic-recovery`.

Program base after Simic certification: `PENDING_VM516_CERTIFICATION_COMMIT_SHA`.

The next allowed VM-517 action is a separate governance-only drift-preflight control record. White Gate 1+2, source inspection, semantic audit, remediation, generation, candidate creation, review, certification, and VM-518 work have not started.

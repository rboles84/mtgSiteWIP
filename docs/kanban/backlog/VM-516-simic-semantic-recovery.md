# VM-516 — Simic Semantic Recovery

ID: VM-516
Status: Setup Only - Gate 1+2 Pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: UG
Raw packet: `data/raw-factions/simic_combine/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Simic end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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

VM-516 is the next CRIT-001 identity after Selesnya certification.

Branch setup only was authorized from the VM-515 certification commit. Gate 1+2 audit is pending. No Simic source inspection, semantic remediation, generated artifact update, candidate creation, independent review, or certification work has started.

Program base: `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`.

The CRIT-001 drift-control baseline must be installed before further progression. After that installation, a separate governance-only VM-516 drift-preflight control record must be created and pass with no `FAIL` or `UNKNOWN` controls before Simic Gate 1+2 can begin. Simic Goal mode remains blocked until that record exists and passes. VM-517 must not start.

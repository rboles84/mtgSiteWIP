# VM-503 — Quandrix Semantic Recovery

ID: VM-503
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: QUANDRIX
Raw packet: `data/raw-factions/quandrix/`
Cohort: college
Contract: v1.1

## Objective

Recover Quandrix end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

Current state: Gate 4 generation/provenance/fixture validation is complete after bounded resolution of the unsupported Esix/generated-display blocker. Quandrix remains uncertified. No recovery candidate, certification commit, or other identity work has started.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 � Canonical remediation.
- [x] Gate 4 ? Generation and validation. Complete after bounded unsupported Esix/generated-display blocker resolution.
- [ ] Gate 5 ? Candidate creation and independent certification. Candidate creation pending.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-503-quandrix-semantic-recovery.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

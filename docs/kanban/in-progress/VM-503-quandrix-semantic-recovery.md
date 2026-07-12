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

Current state: Gate 5 scope-policy cleanup is complete. Candidate recovery SHA `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe` supersedes `805ede66670485e35689a56368e242984a8e17f3` and `a6dd5df19c3333ad8c78b315d5649356f1289977`. Quandrix remains uncertified. No certification commit or other identity work has started.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 � Canonical remediation.
- [x] Gate 4 ? Generation and validation. Complete after bounded unsupported Esix/generated-display blocker resolution.
- [ ] Gate 5 ? Scope-policy-clean candidate recorded; independent review and certification pending.

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
- Candidate recovery SHA: `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe`
- Independent reviewer: pending
- Certification commit: pending

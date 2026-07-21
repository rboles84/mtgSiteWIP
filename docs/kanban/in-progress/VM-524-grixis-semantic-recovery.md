# VM-524 — Grixis Semantic Recovery

ID: VM-524
Status: Active - Gate 1+2 read-only semantic audit complete; Gate 3+4 remediation authorized
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: GRIXIS
Raw packet: `data/raw-factions/grixis/`
Program base: `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`
Preflight record: `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Grixis end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight - complete; Gate 1+2 read-only audit authorized.
- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence contract complete.
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
- Audit/recovery report: `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Preflight Status

PASS - Gate 1+2 read-only semantic audit is complete. Gate 3+4 remediation is authorized in a later separate prompt under `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`. Current semantic and candidate-readiness defects remain unresolved until remediation. No remediation occurred in Gate 1+2. No candidate exists. Program base remains `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`.

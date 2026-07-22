# VM-526 — Naya Semantic Recovery

ID: VM-526
Status: In Progress - preflight complete; Gate 1+2 authorized
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: NAYA
Raw packet: `data/raw-factions/naya/`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Naya end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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
- Drift preflight: `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Current Note

Preflight passed from exact program base `7964b93f531017e579f069e6941463f53eab4bd9`. `NAYA` is the canonical internal key; `WRG` is display/color notation only and is rejected by candidate-scope validation as an unknown identity. Gate 1+2 read-only semantic audit is authorized; remediation, candidate creation, independent review, certification, VM-527 work, Excel, push, PR, and merge remain unauthorized.

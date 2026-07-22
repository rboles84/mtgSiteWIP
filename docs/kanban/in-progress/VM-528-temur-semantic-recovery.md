# VM-528 - Temur Semantic Recovery

ID: VM-528
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: TEMUR
Raw packet: `data/raw-factions/temur/`
Cohort: clan
Contract: Contract v1.1 Gate 3+4 remediation authorized

## Objective

Recover Temur end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current State

Drift preflight is complete from exact VM-527 certification/program base `a1632337ebc91950b37d835ac404fba414f770c7`. Gate 1+2 read-only semantic audit is complete at governance record `PENDING_VM528_GATE12_GOVERNANCE_SHA`.

Gate 3+4 remediation is authorized for `TEMUR` only. No semantic remediation, generated rebuild, fixture creation, candidate, independent review, certification, Excel update, VM-529 work, push, PR, or merge has occurred.

## Gates

- [x] Gate 0 - Drift preflight and branch/worktree control.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [ ] Gate 3 - Canonical remediation.
- [ ] Gate 4 - Generation and validation.
- [ ] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- `TEMUR` is the canonical identity key; `GUR`, `URG`, and `RGU` are metadata/query color-order strings only and must fail closed unless committed authority changes.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift preflight handoff: `docs/handoffs/2026-07-22-1529-codex-vm528-temur-drift-preflight.md`
- Gate 1+2 audit handoff: `docs/handoffs/2026-07-22-1549-codex-vm528-temur-gate1-gate2.md`
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending
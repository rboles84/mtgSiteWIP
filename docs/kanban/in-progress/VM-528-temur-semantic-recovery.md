# VM-528 - Temur Semantic Recovery

ID: VM-528
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: TEMUR
Raw packet: `data/raw-factions/temur/`
Cohort: clan
Contract: Contract v1.1 candidate ready for independent exact-SHA review

## Objective

Recover Temur end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current State

Drift preflight is complete from exact VM-527 certification/program base `a1632337ebc91950b37d835ac404fba414f770c7`. Gate 1+2 read-only semantic audit is complete at governance record `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e`.

Gate 3+4 remediation is complete and exact semantic candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc` is ready for independent review. No independent review, certification, Excel update, VM-529 work, push, PR, or merge has occurred.

## Gates

- [x] Gate 0 - Drift preflight and branch/worktree control.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [ ] Gate 5 - Independent exact-SHA review and certification.

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
- Candidate workflow handoff: `docs/handoffs/2026-07-22-1758-codex-vm528-temur-candidate-workflow.md`
- Audit/recovery report: `docs/handoffs/2026-07-22-1758-codex-vm528-temur-candidate-workflow.md`
- Candidate recovery SHA: `790fca923c504e32911e0be0eb44f7fdbcfb07dc`
- Independent reviewer: pending
- Certification commit: pending

# VM-532 — Yore Semantic Recovery

ID: VM-532
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: YORE
Raw packet: `data/raw-factions/yore/`
Cohort: four-color
Contract: v1.1 drift preflight and Gate 1+2 complete; Gate 3+4 authorized

## Objective

Recover Yore end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current State

VM-532 drift preflight was recorded on branch `codex/vm-532-yore-semantic-recovery` and worktree `C:\dev\mtgSiteWIP-crit001-vm532-yore` from exact program base `4529f8615785743d074e3060e13f990941c1a458`. Official Gate 1+2 read-only audit is complete and authorizes YORE-only Gate 3+4 remediation. No semantic candidate, independent review, certification, program-base advancement, VM-533 work, or Excel update exists.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
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
- Audit/recovery report: `docs/handoffs/2026-07-23-1818-codex-vm532-yore-gate1-gate2.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

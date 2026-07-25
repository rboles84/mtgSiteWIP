# VM-536 â€” Witch Semantic Recovery

ID: VM-536
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WITCH
Raw packet: `data/raw-factions/witch/`
Cohort: four-color
Contract: CRIT-001 Contract v1.1

## Objective

Recover Witch end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [ ] Gate 5 â€” Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-24-1744-codex-vm536-witch-gate1-gate2.md`
- Candidate workflow report: `docs/handoffs/2026-07-24-1801-codex-vm536-witch-candidate-workflow.md`
- Candidate recovery SHA: `acaf51a4f7e11d73b59fcc61397dcab2cb39e490`
- Superseded candidate SHA: `96f8ee3259a5010e96ba92aea35ae271eb692ac8`
- Independent reviewer: pending
- Certification commit: pending

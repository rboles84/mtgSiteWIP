# VM-537 — Colorless Semantic Recovery

ID: VM-537
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: COLORLESS
Raw packet: `data/raw-factions/colorless/`
Cohort: endpoint
Contract: Contract v1.1

## Objective

Recover Colorless end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
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
- Audit/recovery report: `docs/handoffs/2026-07-24-1951-codex-vm537-colorless-gate1-gate2.md`
- Candidate workflow report: `docs/handoffs/2026-07-24-2014-codex-vm537-colorless-candidate-workflow.md`
- Candidate recovery SHA: `ae54c83db22fda6bd48574b3431b64d92e8cf04a`
- Independent reviewer: pending
- Certification commit: pending

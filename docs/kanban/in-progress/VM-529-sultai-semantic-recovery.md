# VM-529 - Sultai Semantic Recovery

ID: VM-529
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: SULTAI
Raw packet: `data/raw-factions/sultai/`
Cohort: clan
Contract: pending Contract v1

## Objective

Recover Sultai end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current State

- Drift preflight: complete, pending commit `PENDING_VM529_DRIFT_PREFLIGHT_COMMIT_SHA`.
- Gate 1+2 audit: complete, pending commit `PENDING_VM529_GATE_1_2_COMMIT_SHA`.
- Semantic candidate: `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.
- Candidate workflow record: pending commit `PENDING_VM529_CANDIDATE_WORKFLOW_SHA`.
- Starting program base: `8e23ef467ec7f60daec746c14493173f96d9261c`.
- Branch: `codex/vm-529-sultai-semantic-recovery`.
- Worktree: `C:\dev\mtgSiteWIP-crit001-vm529-sultai`.
- Next authorized action: independent exact-SHA review of `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.
- Not started: independent review, certification, semantically_ready transition, program-base change, certified-count change, and VM-530.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [ ] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Drift-preflight handoff: `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- Gate 1+2 handoff: `docs/handoffs/2026-07-22-2039-codex-vm529-sultai-gate1-gate2.md`
- Candidate workflow handoff: `docs/handoffs/2026-07-22-2054-codex-vm529-sultai-candidate-workflow.md`
- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-22-2054-codex-vm529-sultai-candidate-workflow.md`
- Candidate recovery SHA: `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`
- Independent reviewer: pending
- Certification commit: pending

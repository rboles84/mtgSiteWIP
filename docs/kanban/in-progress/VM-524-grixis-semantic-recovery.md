# VM-524 - Grixis Semantic Recovery

ID: VM-524
Status: Active - Gate 3+4 semantic remediation complete; Gate 5 candidate creation authorized but not started
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: GRIXIS
Raw packet: `data/raw-factions/grixis/`
Program base: `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`
Preflight record: `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
Gate 1+2 record: `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
Gate 3+4 record: `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Grixis end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight - complete; Gate 1+2 read-only audit authorized.
- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence contract complete.
- [x] Gate 3 - Canonical remediation complete in implementation commits `a6115285e859fbd46f0cd0726429b7e5ddd28e0a` and `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- [x] Gate 4 - Generation and validation complete; Gate 5 candidate creation authorized next.
- [ ] Gate 5 - Independent certification.

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
- Gate 3+4 remediation report: `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
- Implementation HEAD: `64a5bfffd646b292c7481f91c9ccb6def42fb552`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Current Status

PASS - Gate 3+4 semantic remediation is complete. Grixis has 11 substantive claims with bounded evidence, zero null Grixis provenance canonical IDs, semantic fixtures, generated consumer propagation, targeted source/generated validation, semantic readiness validation, exact candidate-scope validation for `9d7ada7a34b52c317708a97009ded2d58b4511e1..64a5bff`, and full exact-tree test/export coverage. Gate 5 candidate creation is authorized for a later separate prompt. No Gate 5 candidate was created or designated here. No independent review, certification, semantically_ready transition, program-base advancement, Excel edit, VM-525 work, CRIT ledger edit, original-main edit, or protected-worktree edit occurred.

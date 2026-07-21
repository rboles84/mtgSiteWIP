# VM-524 - Grixis Semantic Recovery

ID: VM-524
Status: Ready - Exact semantic candidate awaiting independent exact-SHA review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: GRIXIS
Raw packet: `data/raw-factions/grixis/`
Program base: `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`
Preflight record: `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
Gate 1+2 record: `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
Gate 3+4 record: `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
Candidate workflow record: `docs/handoffs/2026-07-21-0753-codex-vm524-grixis-candidate-workflow.md`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Grixis end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight - complete; Gate 1+2 read-only audit authorized.
- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence contract complete.
- [x] Gate 3 - Canonical remediation complete in implementation commits `a6115285e859fbd46f0cd0726429b7e5ddd28e0a` and `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- [x] Gate 4 - Generation and validation complete; exact candidate qualified.
- [x] Gate 5 - Exact candidate workflow recorded for `64a5bfffd646b292c7481f91c9ccb6def42fb552`.
- [ ] Independent exact-SHA review - required next.
- [ ] Certification - prohibited until exact approval.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- The candidate workflow commit must never be substituted for exact semantic candidate SHA `64a5bfffd646b292c7481f91c9ccb6def42fb552`.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- Gate 3+4 remediation report: `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
- Candidate workflow record: `docs/handoffs/2026-07-21-0753-codex-vm524-grixis-candidate-workflow.md`
- Candidate recovery SHA: `64a5bfffd646b292c7481f91c9ccb6def42fb552`
- Independent reviewer: pending; must review exact SHA `64a5bfffd646b292c7481f91c9ccb6def42fb552`
- Certification commit: pending and not authorized

## Current Status

PASS - Grixis exact semantic candidate workflow is recorded for `64a5bfffd646b292c7481f91c9ccb6def42fb552`. The semantic candidate remains the final Gate 3+4 implementation commit, not the Gate 3+4 governance commit `bc2d1ec5f77c88f2afd2e4d0693e3249a172bcc7` and not this workflow-record commit. VM-524 is ready for a fresh independent exact-SHA review in a separate window, branch, and worktree.

Required review decision is exactly one of:

- `APPROVE EXACT SHA 64a5bfffd646b292c7481f91c9ccb6def42fb552`
- `REJECT EXACT SHA 64a5bfffd646b292c7481f91c9ccb6def42fb552`

No independent review, approval, rejection, certification, semantically_ready transition, certified-count increment, Wave 4 count change, program-base advancement, Excel edit, VM-525 work, CRIT ledger edit, original-main edit, protected-worktree edit, DRIFT-017 edit, historical/debug/archive cleanup, or Table Talk change has occurred. Certified count remains 22 of 37; Wave 4 remains 2 of 10; program base remains `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`.

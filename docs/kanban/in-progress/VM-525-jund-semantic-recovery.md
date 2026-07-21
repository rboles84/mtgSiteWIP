# VM-525 - Jund Semantic Recovery

ID: VM-525
Status: Active - Gate 1+2 read-only semantic audit complete; Gate 3+4 remediation authorized
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: JUND
Raw packet: `data/raw-factions/jund/`
Cohort: shard
Contract: CRIT-001 Contract v1.1
Program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`
Branch: `codex/vm-525-jund-semantic-recovery`
Worktree: `C:\dev\mtgSiteWIP-crit001-vm525-jund`
Preflight decision: `PASS - JUND GATE 1+2 AUTHORIZED`
Preflight handoff: `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
Gate 1+2 decision: `PASS - JUND GATE 3+4 REMEDIATION AUTHORIZED`
Gate 1+2 handoff: `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`

## Objective

Recover Jund end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight - complete; Gate 1+2 read-only audit authorized.
- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence completion complete; Gate 3+4 remediation authorized.
- [ ] Gate 3 - Canonical remediation.
- [ ] Gate 4 - Generation and validation.
- [ ] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- No remediation, source acquisition, candidate creation, independent review, certification, program-base advancement, VM-526 work, Excel edit, or original-main edit occurred during preflight or Gate 1+2.
- Gate 3+4 remediation is authorized only by the completed Gate 1+2 audit handoff; candidate creation, independent review, certification, program-base advancement, VM-526 work, Excel edit, and original-main edit remain unauthorized.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Preflight handoff: `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- Audit/recovery report: `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

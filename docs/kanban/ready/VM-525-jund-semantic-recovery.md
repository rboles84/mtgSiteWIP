# VM-525 - Jund Semantic Recovery

ID: VM-525
Status: Ready - DRIFT-020 certified; resume Gate 3+4 only in a separate future window
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: JUND
Raw packet: `data/raw-factions/jund/`
Cohort: shard
Contract: CRIT-001 Contract v1.1
Program base for next continuation: `PENDING_DRIFT020_CERTIFICATION_COMMIT_SHA`
Prior program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`
Branch: `codex/vm-525-jund-semantic-recovery`
Worktree: `C:\dev\mtgSiteWIP-crit001-vm525-jund`
Preflight decision: `PASS - JUND GATE 1+2 AUTHORIZED`
Preflight handoff: `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
Gate 1+2 decision: `PASS - JUND GATE 3+4 REMEDIATION AUTHORIZED`
Gate 1+2 handoff: `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
Gate 3+4 decision: `STOP - JUND GATE 5 CANDIDATE CREATION NOT AUTHORIZED`
Gate 3+4 handoff: `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
DRIFT-020 certification: `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
DRIFT-020 certified candidate: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`

## Objective

Recover Jund end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight - complete; Gate 1+2 read-only audit authorized.
- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence completion complete; Gate 3+4 remediation authorized.
- [ ] Gate 3 - Canonical remediation stopped before semantic edits; DRIFT-020 infrastructure blocker is now certified and cleared.
- [ ] Gate 4 - Generation and validation may resume only in a separate future window from `PENDING_DRIFT020_CERTIFICATION_COMMIT_SHA`.
- [ ] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- No remediation, source acquisition, candidate creation, independent review, certification, program-base advancement, VM-526 work, Excel edit, or original-main edit occurred during preflight or Gate 1+2.
- Gate 3+4 remediation is authorized only by the completed Gate 1+2 audit handoff and a future separate continuation window starting from the DRIFT-020 certification/program-base SHA; candidate creation, independent review, certification, VM-526 work, Excel edit, and original-main edit remain unauthorized until later gates explicitly allow them.
- Gate 3+4 stopped at `460dd7186dc76658797beac74a4330cc699a52d6` because the required authoritative preview edit at `data/identity-layers.json#/expressions/JUND/preview_text` was not candidate-scope-allowed. DRIFT-020 certified exact infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, clearing that shared-infrastructure blocker without performing Jund semantic remediation.
- This certification task did not create a Jund implementation SHA, Jund semantic candidate, generated output, fixture, validation result, independent review, or semantically_ready transition.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Preflight handoff: `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- Audit/recovery report: `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- Gate 3+4 stop handoff: `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- DRIFT-020 certification handoff: `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

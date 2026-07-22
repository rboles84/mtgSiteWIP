# VM-526 - Naya Semantic Recovery

ID: VM-526
Status: Ready - exact semantic candidate recorded; awaiting independent review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: NAYA
Raw packet: `data/raw-factions/naya/`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Naya end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition complete.
- [x] Gate 2 - Sufficient evidence completion complete; Gate 3+4 remediation authorized.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [ ] Gate 5 - Independent exact-SHA review and certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift preflight: `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`
- Gate 1+2 handoff: `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- Audit/recovery report: `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- Candidate workflow handoff: `docs/handoffs/2026-07-22-0007-codex-vm526-naya-candidate-workflow.md`
- Candidate recovery SHA: `f3dda547eb91475cd3d00056463729d98a040e55`
- Superseded candidate: `57ce7161c1ff8736a8b91a6564fa97129fe38383` (unapproved; replaced for null guidance provenance owners)
- Independent reviewer: pending
- Certification commit: pending

## Current Note

Exact Naya replacement candidate `f3dda547eb91475cd3d00056463729d98a040e55` is recorded for independent review. `NAYA` is the canonical internal key; `WRG`, `RGW`, and `GRW` are display/color metadata or invalid validation aliases only. The candidate keeps all 10 claims substantive with 20 bounded evidence locators, adds NAYA-owned semantic guidance evidence, fixtures, and provenance owner repairs, regenerates active NAYA generated consumers, and passes exact candidate scope. Independent review, certification, VM-527 work, Excel, push, PR, merge, and original-main edits remain unauthorized.

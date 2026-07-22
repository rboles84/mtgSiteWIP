# VM-526 — Naya Semantic Recovery

ID: VM-526
Status: In Progress - Gate 1+2 complete; Gate 3+4 authorized
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: NAYA
Raw packet: `data/raw-factions/naya/`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Naya end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition complete.
- [x] Gate 2 — Sufficient evidence completion complete; Gate 3+4 remediation authorized.
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
- Drift preflight: `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`
- Gate 1+2 handoff: `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- Audit/recovery report: `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Current Note

Gate 1+2 passed from exact starting HEAD `813c42c63a56648029c7452d2619cdaf60432b5a`. `NAYA` is the canonical internal key; `WRG`, `RGW`, and `GRW` are display/color metadata or validation terms only. Gate 3+4 remediation is authorized for NAYA only: retain all 10 claims as substantive with bounded evidence locators, add semantic guidance evidence, fixtures, and provenance owner repairs, regenerate NAYA generated consumers, and prove exact candidate scope. Candidate creation is allowed only after Gate 3+4 validation passes; independent review, certification, VM-527 work, Excel, push, PR, merge, and original-main edits remain unauthorized.

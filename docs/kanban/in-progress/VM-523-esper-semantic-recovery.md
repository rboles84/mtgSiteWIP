# VM-523 — Esper Semantic Recovery

ID: VM-523
Status: Active - Pre-Identity Drift Preflight Complete; Gate 1+2 Read-Only Audit Authorized
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: ESPER
Raw packet: `data/raw-factions/esper/`
Cohort: shard
Contract: CRIT-001 Contract v1.1

## Objective

Recover Esper end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Pre-identity drift preflight complete: `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md`.
- [ ] Gate 1 — Packet audit and bounded disposition. Authorized for a later separate read-only audit only.
- [ ] Gate 2 — Sufficient evidence completion. Authorized for a later separate read-only audit only.
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
- Preflight handoff: `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md`
- Audit/recovery report: pending; Gate 1+2 read-only audit authorized but not started
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Preflight Decision

PASS — ESPER GATE 1+2 AUTHORIZED

The preflight created branch `codex/vm-523-esper-semantic-recovery` and dedicated worktree `C:\dev\mtgSiteWIP-crit001-vm523-esper` from exact program base `a7ea41cbf57cc87f1948fdd254f0295816c5919d`. It inventoried the current Esper packet read-only and found no genuine preflight blockers. All semantic-readiness defects remain unresolved obligations for later gates. No remediation, candidate, review, certification, source acquisition, Excel update, program-base advancement, or VM-524 work is authorized.

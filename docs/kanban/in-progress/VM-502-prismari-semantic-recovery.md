# VM-502 — Prismari Semantic Recovery

ID: VM-502
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: PRISMARI
Raw packet: `data/raw-factions/prismari/`
Cohort: college
Contract: v1

## Objective

Recover Prismari end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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
- Audit/recovery report: `docs/incidents/recoveries/VM-502-prismari-semantic-recovery.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Gate 1 Disposition

- Primary disposition: `claim_extraction_and_traceability_repair`
- Required neighbors: `UR`, `BR`, `QUANDRIX`, `SILVERQUILL`
- Active gate: Gate 5 — independent review of immutable candidate

## Candidate Validation

- Semantic validation: passed.
- Source/generated validation: passed with one documented builder-owned prior warning.
- Generated isolation: only `PRISMARI` changed across faction, placement, recruiter, and provenance identity entries.
- Full regression suite and parser suite: passed.

# VM-510 — Rakdos Semantic Recovery

ID: VM-510
Status: Backlog; starts after accepted VM-540 Gate 0 base
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: BR
Raw packet: `data/raw-factions/cult_of_rakdos/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Rakdos end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

Rakdos starts only after VM-540 CRIT-001 Operating Playbook v2 and Gate 0 hardening are accepted into the program base. The first Rakdos task must begin with Gate 1+2 read-only audit/evidence confirmation. Do not edit Rakdos raw data, generated artifacts, fixtures, or runtime behavior until evidence sufficiency and the appropriate gate authorization are recorded.

## Gates

- [ ] Gate 1 — Packet audit and bounded disposition.
- [ ] Gate 2 — Sufficient evidence completion.
- [ ] Gate 3 — Canonical remediation.
- [ ] Gate 4 — Generation and validation.
- [ ] Gate 5 — Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Operating model follows `docs/incidents/CRIT-001-operating-playbook.md`.
- Gate 1+2 are read-only audit/evidence confirmation.
- Gate 3+4 remediation/generation require evidence sufficiency first.
- Gate 5 candidate creation requires a passing candidate-scope dry-run or only explicitly documented BR/Rakdos-scoped display-source exceptions.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Operating playbook: `docs/incidents/CRIT-001-operating-playbook.md`
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Gate 0 Note

- VM-540 must be accepted before Rakdos starts.
- Starting SHA for Rakdos Gate 1 is the accepted VM-540 program-base SHA.
- Rakdos remains `not_started` until an explicit Gate 1+2 audit/evidence-confirmation task begins.

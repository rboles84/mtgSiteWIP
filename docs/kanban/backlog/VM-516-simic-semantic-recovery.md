# VM-516 — Simic Semantic Recovery

ID: VM-516
Status: Gate 1+2 Complete - Gate 3+4 Authorized
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: UG
Raw packet: `data/raw-factions/simic_combine/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Simic end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
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
- Audit/recovery report: `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Setup State

VM-516 is the next CRIT-001 identity after Selesnya certification.

Branch setup only was authorized from the VM-515 certification commit. The drift preflight performed read-only inventory only. Gate 1+2 audit is now complete and authorizes Gate 3+4 remediation; generated artifact update, candidate creation, independent review, certification, semantically_ready transition, and VM-517 work have not started.

Program base: `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`.

The CRIT-001 drift-control baseline is installed. VM-516 drift preflight passed with no `FAIL` or `UNKNOWN` controls.

## Drift Preflight

Record: `docs/incidents/recoveries/VM-516-simic-drift-preflight.md`

Decision: `PASS — SIMIC GATE 1+2 AUTHORIZED`

Scope of authorization: Gate 1+2 read-only audit only. Remediation, generation, candidate creation, independent review, certification, semantically_ready transition, and VM-517 work remain unauthorized and not started.

Program base remains `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`; this drift-preflight governance commit is not the CRIT-001 program base.

## Gate 1+2 Audit

Record: `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`

Decision: `REMEDIATION AUTHORIZED`

Gate 1+2 found sufficient listed/local source authority to proceed, but Simic is not semantically ready: 17 claims, raw explicit roles absent, ledger-derived 10 discovery records, 0 support records, 7 unclassified records, no Contract v1.1 evidence scopes, missing fixtures, 31 null UG provenance canonical IDs, and discovery/unclassified proof-chain contamination.

Scope of authorization: Gate 3+4 canonical remediation, generation, fixtures, provenance cleanup, and validation. Independent review, certification, semantically_ready transition, program-base advancement, and VM-517 work remain unauthorized and not started.

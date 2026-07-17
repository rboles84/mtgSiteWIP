# VM-513 — Dimir Semantic Recovery

ID: VM-513
Status: Gate 3 Authorized
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: UB
Raw packet: `data/raw-factions/house_dimir/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Dimir end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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
- Audit/recovery report: `docs/incidents/recoveries/VM-513-dimir-semantic-recovery.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Gate 1+2 Finding

Read-only audit found 16 Dimir claims, with 0 substantive claims, 10 discovery records, 0 support records, and 6 unclassified claims. All claims lack explicit Contract v1.1 semantic roles; substantive evidence locations and `evidence_scope` are missing because no claims are yet remediated as substantive. Existing profile, placement, generated public copy, recruiter copy, and provenance chains rely on non-certifying discovery/unclassified records. UB fixtures are missing.

Gate 3+4 remediation is authorized using existing local/listed sources only. Discovery-only story-corpus records must be isolated from authoritative proof chains, generated copy must stop presenting generic UB mechanics or stale spy-thriller language as Dimir identity, and fixture/provenance parity must be proven before candidate creation.

# VM-515 — Selesnya Semantic Recovery

ID: VM-515
Status: Gate 3 Authorized - Gate 1+2 Complete
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WG
Raw packet: `data/raw-factions/selesnya_conclave/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Selesnya end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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

## Setup State

VM-515 is the next CRIT-001 identity after Orzhov certification.

Branch setup only was authorized from the VM-514 certification commit. Gate 1+2 audit and bounded evidence confirmation completed on 2026-07-17.

## Gate 1+2 Status

Disposition: `claim_extraction_pass_required`.

Remediation is authorized under CRIT-001 Contract v1.1 using existing listed/local Selesnya sources. The read-only audit found 17 claims: 0 `substantive_claim`, 10 `discovery_record`, 0 `support_record`, and 7 `unclassified`; no substantive evidence locations or `evidence_scope`; missing WG fixtures; 31 null WG generated provenance canonical IDs; 25 discovery-backed generated provenance chains; and authoritative profile/placement/recruiter chains contaminated by discovery or unclassified records.

Gate 3+4 must preserve frozen placement confidence/calibration fields and generated lateral targets, isolate discovery/support records from proof chains, build WG fixtures from generated truth, and stop if source locators cannot support retained Selesnya wording.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-515-selesnya-semantic-recovery.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

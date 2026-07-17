# VM-512 — Gruul Semantic Recovery

ID: VM-512
Status: Review Changes Requested
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: RG
Raw packet: `data/raw-factions/gruul_clans/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Gruul end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [x] Independent review - REQUEST CHANGES.
- [ ] Certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- Candidate recovery SHA: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Independent reviewer: `REQUEST CHANGES`
- Certification commit: pending

## Gate 1+2 Status

- Gate 1+2 completed from base `a7aabe30cb4e9fe65ab01d15fdd41ac4445b86f8`.
- Primary disposition: claim-extraction pass required.
- Existing listed/local evidence is sufficient to authorize bounded Gate 3 remediation.
- Broad online source discovery is not required before Gate 3.
- Gruul candidate exists and independent review returned `REQUEST CHANGES`; Gruul is not certified.
- VM-513 has not started.

## Gate 5 Candidate Status

- Candidate commit: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Candidate subject: `VM-512 remediate Gruul semantic readiness candidate`
- Candidate-scope dry-run: reported only documented target-scoped display-source exceptions for `data/identity-layers.json` and embedded RG preview copy in `data/factions.json`.
- Validation: passed.
- Independent review decision: `REQUEST CHANGES`.
- Required remediation: remove duplicate claim IDs from the RG core/profile/placement provenance chains and make the provenance fixture evidence_claim_ids exactly match the generated `/core_identity` provenance entry before a replacement candidate.
- Current status: changes requested; awaiting remediation/replacement candidate.
- Certification: not performed.
- `semantically_ready`: not set.
- VM-513: not started.

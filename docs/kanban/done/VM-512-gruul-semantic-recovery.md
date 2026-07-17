# VM-512 — Gruul Semantic Recovery

ID: VM-512
Status: Done
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
- [x] Replacement candidate creation.
- [x] Replacement independent review - APPROVE EXACT SHA `16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- [x] Certification.

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
- Candidate recovery SHA: `16b58c3f32d92e6406d368169d91b0b6a86f948d`
- Rejected candidate SHA: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Request-changes review record: `04c0933825c985373336ba9bdbfccbbcf29d8e82`
- Independent reviewer: APPROVE EXACT SHA `16b58c3f32d92e6406d368169d91b0b6a86f948d`
- Replacement workflow-record SHA: `3fa4580e874e457c26b11b36705786863934963a`
- Approval review record: `ff973268c211b08c288b401c8f59b58b910c4d51`
- Certification commit: this VM-512 certification commit; exact SHA reported in final task output

## Gate 1+2 Status

- Gate 1+2 completed from base `a7aabe30cb4e9fe65ab01d15fdd41ac4445b86f8`.
- Primary disposition: claim-extraction pass required.
- Existing listed/local evidence is sufficient to authorize bounded Gate 3 remediation.
- Broad online source discovery is not required before Gate 3.
- Gruul replacement candidate is independently approved by exact SHA and certified semantically_ready.
- VM-513 branch setup only; Gate 1+2 is pending and no Dimir audit or remediation has started.

## Gate 5 Candidate Status

- Candidate commit: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Candidate subject: `VM-512 remediate Gruul semantic readiness candidate`
- Candidate-scope dry-run: reported only documented target-scoped display-source exceptions for `data/identity-layers.json` and embedded RG preview copy in `data/factions.json`.
- Validation: passed.
- Independent review decision: `REQUEST CHANGES`.
- Required remediation: remove duplicate claim IDs from the RG core/profile/placement provenance chains and make the provenance fixture evidence_claim_ids exactly match the generated `/core_identity` provenance entry before a replacement candidate.
- Historical status after original candidate review: changes requested; awaiting remediation/replacement candidate.
- Certification: not performed.
- `semantically_ready`: not set.
- VM-513: not started.

## Replacement Candidate Status

- Rejected original candidate: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`
- Request-changes review record: `04c0933825c985373336ba9bdbfccbbcf29d8e82`
- Replacement candidate: `16b58c3f32d92e6406d368169d91b0b6a86f948d`
- Replacement subject: `VM-512 remediate Gruul review findings candidate`
- Defect remediated: duplicate claim IDs removed from RG `/core_identity`, `/site_surface`, `/placement_summary`, and `gruul_core_identity_provenance` exact-chain fixture.
- Exact-chain result: generated `/core_identity` provenance and fixture both contain the same 25 ordered claim IDs with no duplicates, missing IDs, or extra IDs.
- Candidate-scope result: passed for `04c0933825c985373336ba9bdbfccbbcf29d8e82..16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- Validation: passed.
- Independent replacement review decision: `APPROVE EXACT SHA 16b58c3f32d92e6406d368169d91b0b6a86f948d`
- Current status: certified and semantically_ready.
- Certification: performed as a governance-only commit.
- `semantically_ready`: set.
- VM-513: branch setup only; Gate 1+2 pending and no audit or remediation started.

## Certification and Program Acceptance

- Certified: 2026-07-16.
- Identity: Gruul.
- Target: RG.
- VM: VM-512.
- Contract version: v1.1.
- Independent review decision: `APPROVE EXACT SHA 16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- Final certification state: `semantically_ready`.
- Approved replacement candidate SHA: `16b58c3f32d92e6406d368169d91b0b6a86f948d`.
- Replacement workflow-record SHA: `3fa4580e874e457c26b11b36705786863934963a`.
- Approval review record: `ff973268c211b08c288b401c8f59b58b910c4d51`.
- Rejected original candidate SHA: `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`.
- Request-changes review record: `04c0933825c985373336ba9bdbfccbbcf29d8e82`.
- Remaining findings: none reported at blocker, high, medium, or low severity.
- Validation passed before certification commit.
- Certification commit: this VM-512 certification commit; exact SHA reported in final task output.

Program acceptance:

- Approved replacement candidate and workflow-record commit accepted into the CRIT-001 program base.
- VM-512 closed as Done.
- Certified identity count advanced to 11.
- Next identity set as Dimir / UB for branch setup only.
- No VM-513 Gate 1+2 audit, remediation, candidate, review, or certification work started.

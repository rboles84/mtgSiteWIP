# VM-516 - Simic Semantic Recovery

ID: VM-516
Status: Certified - Semantically Ready
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: UG
Raw packet: `data/raw-factions/simic_combine/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Simic end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Drift preflight - Passed.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 candidate - Candidate created for independent review.
- [x] Gate 5 review - Independent review returned REQUEST CHANGES.
- [x] Review remediation - Replacement candidate created.
- [x] Fresh independent review - Replacement candidate approved.
- [x] Gate 5 certification - Independent certification.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- Drift preflight SHA: `851f4b604459073bd739ec10d3f278f90f4069c3`
- Gate 1+2 governance SHA: `06f140a1e78a24d6c549943d6beb471f4e714302`
- Superseded candidate SHAs: `f4afb9d5d769c72e1c86df189729423a380629af`, `204cf9e6be15f2c3ac59a36c3977efea9a9945ce`
- Review-rejected candidate SHA: `cbca9f596a090e924d532e7cb657c27c79ccb9de`
- Original candidate workflow record: `04510577b7f3e1c4bacc5f2a88018b461760a80a`
- Rejection review record: `4da00dc997162ad609e84a77f6817c2ad0726dbc`
- Approved replacement candidate SHA: `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`
- Replacement workflow record: `4db93dcf9d957ad89e5b5e3bfeedcbd6f564aa46`
- Approval review record: `214ed8182207521bb6750e35f57f67d41325b438`
- Certification commit: `PENDING_VM516_CERTIFICATION_COMMIT_SHA`

## Certification

Simic / UG is certified `semantically_ready` under CRIT-001 Contract v1.1 from exact approved replacement candidate `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`.

Certification date: 2026-07-17.

Candidate-scope validator exit `1` is certified as `PASS - approved documented UG display-source exception` for:

- `data/identity-layers.json#/expressions/UG/preview_text`
- `data/factions.json#/identity_layers/expressions/UG/preview_text`

The superseded candidates `f4afb9d5d769c72e1c86df189729423a380629af` and `204cf9e6be15f2c3ac59a36c3977efea9a9945ce` remain unapproved. Candidate `cbca9f596a090e924d532e7cb657c27c79ccb9de` remains review-rejected.

Wave 2 Ravnica is complete: 10 of 10 guild identities certified. Certified identity count is 15.

VM-517 White / W was created as setup only with drift preflight pending. No White source inspection, drift preflight, Gate 1+2 audit, remediation, candidate, review, certification, or VM-518 work started during VM-516 certification.

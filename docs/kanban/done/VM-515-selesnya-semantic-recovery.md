# VM-515 - Selesnya Semantic Recovery

ID: VM-515
Status: Certified - Semantically Ready
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WG
Raw packet: `data/raw-factions/selesnya_conclave/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Selesnya end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [x] Gate 5 - Independent review.
- [x] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-515-selesnya-semantic-recovery.md`
- Gate 1+2 governance SHA: `99a239dea91039a13511d155f9b652d297baab21`
- Superseded candidate SHA: `5c9f69d752d1abf6b8f7790ddb4cce1206b64ad7`
- Candidate recovery SHA: `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`
- Candidate workflow record: `1f88f03f7b6a582614f13a912024d0c9924926d7`
- Independent reviewer: Codex independent review approved exact candidate `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`
- Independent review record: `6af0a2806dd7c26e71e4596839e25bbc51e1b5af`
- Certification commit: `PENDING_VM515_CERTIFICATION_COMMIT_SHA`

## Certification

Selesnya / WG is certified `semantically_ready` under CRIT-001 Contract v1.1 from exact approved candidate `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`.

Certification date: 2026-07-17.

Reviewed WG provenance count: 70.

Certification commit: `PENDING_VM515_CERTIFICATION_COMMIT_SHA`.

The superseded candidate `5c9f69d752d1abf6b8f7790ddb4cce1206b64ad7` remains unapproved and is not certified.

VM-516 Simic / UG was created as setup only with Gate 1+2 pending. No Simic audit, source inspection, remediation, candidate, review, certification, or VM-517 work started during VM-515 certification.

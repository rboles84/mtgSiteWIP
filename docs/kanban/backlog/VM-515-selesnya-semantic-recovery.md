# VM-515 — Selesnya Semantic Recovery

ID: VM-515
Status: Candidate Created - Awaiting Independent Review
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
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
- [ ] Gate 5 — Independent review and certification.

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

## Gate 3+4 / Gate 5 Candidate Status

Disposition: `candidate_created_awaiting_independent_review`.

Selesnya replacement candidate `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5` supersedes scope-failing candidate `5c9f69d752d1abf6b8f7790ddb4cce1206b64ad7`. The superseded candidate remains preserved and unapproved because exact candidate-scope validation found frozen confidence/native-ID retention and generated proof-chain contamination issues.

The replacement candidate passed the required validation suite and exact candidate-scope validation:

`node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG`

Current workflow state: awaiting independent review. Selesnya is not certified and not semantically_ready. VM-516 has not started.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-515-selesnya-semantic-recovery.md`
- Candidate recovery SHA: `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`
- Independent reviewer: pending
- Certification commit: pending

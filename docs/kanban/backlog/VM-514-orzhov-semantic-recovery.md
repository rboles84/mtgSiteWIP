# VM-514 - Orzhov Semantic Recovery

ID: VM-514
Status: Candidate Created - Awaiting Independent Review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WB
Raw packet: `data/raw-factions/orzhov_syndicate/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Orzhov end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [ ] Gate 5 - Independent review.
- [ ] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-514-orzhov-semantic-recovery.md`
- Gate 1+2 governance SHA: `de5e2e8344dcdfd6feb44e3731a0819f44142bb6`
- Superseded candidate SHA: `5cbd1bd5f3a10cdc84db4d15ad4bb92a16572048`
- Candidate recovery SHA: `8aea3e359c16687948178ad55a927cf758fd9206`
- Independent reviewer: pending
- Certification commit: pending

## Setup State

VM-514 is the next CRIT-001 identity after Dimir certification. Branch setup was authorized only after VM-513 certification.

## Gate 1+2 Finding

Gate 1+2 completed from program base `0a7f52d2469ad4c050570f3b2bbe32dc0d4fea14` on branch `codex/vm-514-orzhov-semantic-recovery`.

Primary disposition: `claim_extraction_pass_required`.

Initial structural findings: 17 claims; 0 substantive, 10 discovery, 0 support, 7 unclassified. Authoritative profile, placement, generated public/recruiter, and provenance chains currently rely on discovery/unclassified records. WB semantic fixtures are missing. Generated WB provenance has 43 entries, 31 null canonical IDs, and 27 discovery-backed chains.

Remediation is authorized using existing listed/local Orzhov sources. Gate 3+4 must preserve frozen placement/calibration fields and must isolate discovery-only story-corpus records from authoritative proof chains. No Orzhov raw data, generated artifacts, fixtures, runtime behavior, builder, validator, schema, contract, Hall, Crucible, scoring, confidence, calibration, scheduling, tie-ordering, or global recruiter files were changed in Gate 1+2.

## Gate 3+4 and Gate 5 Candidate

Canonical remediation, generation, fixture/provenance validation, and Gate 5 candidate creation are complete.

Final candidate: `8aea3e359c16687948178ad55a927cf758fd9206`.

Superseded candidate `5cbd1bd5f3a10cdc84db4d15ad4bb92a16572048` remains in history but is not awaiting review because post-commit candidate-scope validation rejected confidence/native-ID/lateral-target/generic collision-target drift. The final replacement candidate passed:

`node research/validate-semantic-candidate-scope.mjs --base=de5e2e8344dcdfd6feb44e3731a0819f44142bb6 --target=8aea3e359c16687948178ad55a927cf758fd9206 --identity=WB`

Status: awaiting independent review; not certified; not semantically_ready; VM-515 not started.

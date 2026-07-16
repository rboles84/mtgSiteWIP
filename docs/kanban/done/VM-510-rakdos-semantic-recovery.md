# VM-510 — Rakdos Semantic Recovery

ID: VM-510
Status: Done
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

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
- [x] Gate 5 - Independent certification.

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
- Audit/recovery report: `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- Candidate recovery SHA: `c929a12a4f7be15cb563b2a6b050b33c32b39b7a`
- Independent reviewer: APPROVE EXACT SHA c929a12a4f7be15cb563b2a6b050b33c32b39b7a
- Certification commit: this VM-510 certification commit; exact SHA reported in final task output

## Gate 0 Note

- VM-540 must be accepted before Rakdos starts.
- Starting SHA for Rakdos Gate 1 is the accepted VM-540 program-base SHA.
- Rakdos remained `not_started` until this explicit Gate 1+2 audit/evidence-confirmation task began; it is now awaiting explicit Gate 3 authorization.

## Gate 1+2 Audit Result — 2026-07-15

- Gate 1+2 completed from VM-540 base `797bf23750886d43802700ddbfb974f3ce666f5e` on branch `codex/vm-510-rakdos-semantic-recovery`.
- Primary disposition: **Claim-extraction pass required**.
- Gate 3 is required before Rakdos can proceed: add semantic roles, bounded evidence locations, substantive proof chains, required-neighbor collision guidance, recruiter evidence mappings, provenance sourceability, and BR fixtures in later gates.
- No Rakdos raw data, generated artifacts, fixtures, runtime behavior, builder, validator, schema, contract, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie-ordering, or global recruiter files were changed in Gate 1+2.
- Broad online source discovery is not required before Gate 3; Gate 3 must localize evidence against existing listed/local sources and stop if locators or high-heat wording support are unavailable.

## Gate 3+4 Result - 2026-07-15

- Gate 3 canonical remediation is complete in the worktree: all Rakdos claims have semantic roles, substantive claims have bounded evidence locations, discovery records are retained only as metadata/history, and BR collision guidance covers the required neighbor set.
- Gate 4 generation and validation are complete in the worktree: BR generated consumers and provenance were rebuilt, BR fixtures were added, and required validation passed.
- No Gate 5 candidate commit was created.
- No certification occurred.
- No other identity was started.

## Gate 5 Candidate Result - 2026-07-15

- Candidate commit created: `c96ceea602370fd146cdad5393d17e4cf68f8aa3`.
- Rakdos is awaiting independent review.
- Rakdos is not certified.
- Certification SHA: none yet.
- No next identity was started.

## Gate 5 Review-Fix Replacement Result - 2026-07-15

- Independent review decision for candidate `c96ceea602370fd146cdad5393d17e4cf68f8aa3` and workflow record `175414aa8daba7ca6f713b93a2d3d32a9953dfd3`: REQUEST CHANGES.
- Blocker fixed: all 39 substantive Rakdos evidence-location entries now include Contract v1.1 `evidence_scope`.
- Medium finding fixed: Commander Compass `source_basis` support chains no longer carry discovery-only story-corpus claim/source IDs and are explicitly auxiliary/non-authoritative.
- Replacement candidate commit created: `c929a12a4f7be15cb563b2a6b050b33c32b39b7a`.
- Rakdos is awaiting independent review.
- Rakdos is not certified.
- Certification SHA: none yet.
- No next identity was started.

## Certification and Program Acceptance

- Certified: 2026-07-16.
- Identity: Rakdos.
- Target: BR.
- VM: VM-510.
- Contract version: v1.1.
- Independent review decision: `APPROVE EXACT SHA c929a12a4f7be15cb563b2a6b050b33c32b39b7a`.
- Final certification state: `semantically_ready`.
- Approved replacement candidate SHA: `c929a12a4f7be15cb563b2a6b050b33c32b39b7a`.
- Replacement workflow-record SHA: `515103b051ffc7cc1e43b9e2b94b2af404a14103`.
- Rejected candidate SHA: `c96ceea602370fd146cdad5393d17e4cf68f8aa3`.
- Rejected workflow-record SHA: `175414aa8daba7ca6f713b93a2d3d32a9953dfd3`.
- Remaining findings: none reported at blocker, high, medium, or low severity.
- Validation passed before certification commit.
- Certification commit: this VM-510 certification commit; exact SHA reported in final task output.

Program acceptance:

- Approved replacement candidate and workflow-record commit accepted into the CRIT-001 program base.
- VM-510 closed as Done.
- Next identity set as Golgari / BG for branch setup only.
- No Golgari remediation started.

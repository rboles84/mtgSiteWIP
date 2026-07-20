# VM-522 - Bant Semantic Recovery

ID: VM-522
Status: Ready - Awaiting Independent Exact-SHA Review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: BANT
Raw packet: `data/raw-factions/bant/`
Cohort: shard
Contract: CRIT-001 Contract v1.1
Branch: `codex/vm-522-bant-semantic-recovery`
Setup base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`

## Objective

Recover Bant end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current Governance State

Mandatory drift preflight completed setup-only and returned:

`STOP - BANT GATE 1+2 NOT AUTHORIZED`

The 2026-07-19 stop-line resolution rerun also returned:

`STOP - BANT GATE 1+2 NOT AUTHORIZED`

Read-only dependency tracing resolved active-consumer classification for Home, Archscry, recruiter, tests, and CI, and retained DRIFT-019 historical/debug exclusions.

The 2026-07-19 stage-ownership adjudication returned:

`PASS - BANT GATE 1+2 AUTHORIZED`

This superseded only the authorization conclusion of the two preserved STOP records and authorized only the later Gate 1+2 read-only audit.

The 2026-07-19 Gate 1+2 read-only semantic audit returned:

`PASS - BANT GATE 3+4 REMEDIATION AUTHORIZED`

Gate 1+2 is complete. Gate 3+4 remediation completed under the exact bounded contract in `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`.

The 2026-07-19 Gate 3+4 remediation handoff returned:

`PASS - BANT GATE 5 CANDIDATE CREATION AUTHORIZED`

Implementation commits: `765f0a9c154e3c49a9d973e75994a0867eb18652`, `799627ec0d1ebbc927b84f63ce5634c633125e24`, and `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.

Gate 5 candidate workflow is recorded for exact semantic candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`. This workflow-record governance commit is separate from the semantic candidate and must never be substituted for the candidate SHA.

Independent exact-SHA review is required next. No review decision exists. Certification remains prohibited until a separate review returns exactly `APPROVE EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`. Bant is not certified and is not `semantically_ready`. Certified count remains 20 of 37. Program base remains `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Gate 1+2 Audit Disposition

- Final raw state: 21 Bant claims; 16 `substantive_claim`, 5 `support_record`, 0 `discovery_record`, 0 unclassified.
- `bant_claim_0002`, `bant_claim_0010`, and `bant_claim_0019` were rewritten/narrowed under the Gate 1+2 contract.
- `bant_claim_0012`, `bant_claim_0017`, `bant_claim_0018`, `bant_claim_0020`, and `bant_claim_0021` are support records and excluded from semantic proof chains.
- Evidence scopes, evidence locations, fixture assertions, provenance canonical IDs/pointers/hashes, generated consumers, and raw/generated collision reconciliation are complete.
- Required neighbor/collapse-risk coverage is implemented for Selesnya/WG, Simic/UG, Azorius/WU, Green/G, White/W, Blue/U, Naya, Esper, Temur, Abzan, Jeskai, Grixis, Jund, Sultai, Five-color/WUBRG, generic good-stuff, generic balance, and generic overfit.
- Approved validations pass at exact candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`, including candidate-scope, semantic-readiness, fixture validation, provenance freshness, candidate-scope tests, `npm.cmd test`, and `npm.cmd run test:parser`.

## Gates

- [x] Gate 0 - Branch/setup-only drift preflight.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate workflow recorded for exact candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- [ ] Gate 5 - Independent review of exact candidate SHA required next.
- [ ] Certification of exact approved candidate SHA not authorized.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-523 and later identities may remain setup-only before Bant certification, but may not receive semantic work.
- Gate 3+4 may not perform source acquisition, shared infrastructure changes, shared governance changes, independent review, certification, program-base advancement, Excel tracker edits, or VM-523 semantic work.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
- Preflight stop report: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Preflight rerun stop report: `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- Stage-ownership adjudication report: `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`
- Gate 1+2 audit report: `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- Gate 3+4 remediation report: `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- Candidate workflow record: `docs/handoffs/2026-07-19-2119-codex-vm522-bant-candidate-workflow.md`
- Candidate recovery SHA: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- Candidate workflow-record commit: `PENDING_VM522_CANDIDATE_WORKFLOW_RECORD_COMMIT_SHA`
- Independent reviewer: required next, not yet performed
- Review decision: not recorded
- Certification commit: not authorized

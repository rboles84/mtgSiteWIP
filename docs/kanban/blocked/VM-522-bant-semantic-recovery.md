# VM-522 - Bant Semantic Recovery

ID: VM-522
Status: Blocked - Exact Candidate Rejected
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: BANT
Raw packet: `data/raw-factions/bant/`
Cohort: shard
Contract: CRIT-001 Contract v1.1
Branch: `codex/vm-522-bant-semantic-recovery`
Setup base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`

## Objective

Recover Bant end to end under CRIT-001: audit the existing packet, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current Governance State

VM-522 completed drift preflight, stage-ownership adjudication, Gate 1+2 audit, Gate 3+4 remediation, and Gate 5 candidate workflow recording.

Rejected exact candidate:

`b466cddb4618b1e2d7c897c15f7513a6d2db08b0`

Candidate workflow-record commit:

`224d05d9aad242406e076b0e1f5b6d9b288a5977`

Independent review record:

`docs/handoffs/2026-07-19-2157-codex-vm522-bant-independent-review.md`

Independent review decision:

`REJECT EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`

Approval-blocking findings:

- 22 load-bearing Bant substantive evidence locators point to missing local files, so source-authority proof is not independently reproducible.
- 28 required/generated-consumed BANT provenance rows retain `canonical_id: null`, including `/core_identity`, `/site_surface`, `/structure`, `/moral_and_psychological_profile`, and `/views_on_other_factions/*` rows.

Required next state: bounded remediation, later replacement candidate SHA, and fresh independent exact-SHA review. Certification remains prohibited. Bant is not `semantically_ready`. Certified count remains 20 of 37. Program base remains `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Preserved Records

- Preflight stop report: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Preflight rerun stop report: `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- Stage-ownership adjudication report: `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`
- Gate 1+2 audit report: `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- Gate 3+4 remediation report: `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- Candidate workflow record: `docs/handoffs/2026-07-19-2119-codex-vm522-bant-candidate-workflow.md`
- Independent rejection review: `docs/handoffs/2026-07-19-2157-codex-vm522-bant-independent-review.md`

## Gates

- [x] Gate 0 - Branch/setup-only drift preflight.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate workflow recorded for exact candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- [x] Gate 5 - Independent review rejected exact candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- [ ] Replacement remediation candidate required.
- [ ] Fresh independent review of replacement candidate required.
- [ ] Certification of exact approved candidate SHA not authorized.

## Scope Rules

- Reviewer corrections stay in this card.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-523 and later identities may remain setup-only before Bant certification, but may not receive semantic work.
- Remediation must preserve the rejected candidate and create a later replacement candidate; do not amend or rewrite history.

## Required Bounded Remediation

1. Fix Bant source/evidence locator reproducibility by pointing substantive evidence locations and claim-bearing source records at actual stored artifacts and bounded sections.
2. Fix required BANT provenance canonical IDs using established certified-identity conventions, preserving valid hashes, pointers, and substantive-only proof chains.
3. Revalidate candidate scope, readiness, fixtures, provenance, generated surfaces, and active consumers.
4. Record a new replacement candidate workflow and request fresh independent review.

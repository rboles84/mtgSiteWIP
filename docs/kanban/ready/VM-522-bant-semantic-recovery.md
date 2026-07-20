# VM-522 - Bant Semantic Recovery

ID: VM-522
Status: Ready - Awaiting Fresh Replacement Exact-SHA Review
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

VM-522 completed drift preflight, stage-ownership adjudication, Gate 1+2 audit, Gate 3+4 remediation, original Gate 5 candidate workflow recording, independent review rejection, bounded rejection remediation, and replacement-candidate workflow recording.

Rejected exact candidate:

`b466cddb4618b1e2d7c897c15f7513a6d2db08b0`

Original candidate workflow-record commit:

`224d05d9aad242406e076b0e1f5b6d9b288a5977`

Independent rejection review record:

`82b92666ab33904e254c5c3807b8d62f47c53496`

Independent rejection decision:

`REJECT EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`

Rejection blockers:

- 22 load-bearing Bant substantive evidence locators pointed to 12 missing local artifact paths.
- 28 required/generated-consumed BANT provenance rows retained `canonical_id: null`.

Replacement remediation implementation commits:

- `151dc3b0647833207e2e2678da3fa06282fafd7f`
- `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

Exact replacement candidate:

`5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

Replacement candidate result:

`PASS - BANT REPLACEMENT CANDIDATE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

Replacement-candidate workflow record:

`docs/handoffs/2026-07-19-2320-codex-vm522-bant-replacement-candidate-workflow.md`

Fresh independent exact-SHA review is required next. The prior rejection review applies only to rejected candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`; it is evidence for the replacement review, not a review decision on `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.

Certification remains prohibited until a separate review returns exactly `APPROVE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`. Bant is not certified and is not `semantically_ready`. Certified count remains 20 of 37. Program base remains `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Replacement Closure Summary

- Evidence locator closure: 43 substantive evidence locators, 0 missing artifact files; stale paths corrected to existing tracked bounded artifacts.
- Provenance closure: 87 Bant-linked entries, 0 required null canonical IDs, 0 null hashes, 0 unresolved pointers, 0 duplicate canonical/null keys observed, 0 non-substantive authoritative chains.
- Claim counts: 21 total; 16 `substantive_claim`, 5 `support_record`, 0 `discovery_record`, 0 unclassified.
- Candidate-scope: PASS for BANT; invalid WUG alias rejects as expected.
- Semantic readiness, fixture validation, provenance freshness, parser, semantic-readiness tests, faction-context isolation, placement, and source/generated guardrail passed.
- Source/generated guardrail retains only documented unrelated JESKAI/MARDU model-owned warnings.
- Closure scorecard: 20 PASS, 0 FAIL, 0 UNKNOWN, 0 N/A.

## Preserved Records

- Preflight stop report: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Preflight rerun stop report: `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- Stage-ownership adjudication report: `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`
- Gate 1+2 audit report: `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- Gate 3+4 remediation report: `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- Original candidate workflow record: `docs/handoffs/2026-07-19-2119-codex-vm522-bant-candidate-workflow.md`
- Independent rejection review: `docs/handoffs/2026-07-19-2157-codex-vm522-bant-independent-review.md`
- Replacement-candidate workflow record: `docs/handoffs/2026-07-19-2320-codex-vm522-bant-replacement-candidate-workflow.md`

## Gates

- [x] Gate 0 - Branch/setup-only drift preflight.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate workflow recorded for rejected exact candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- [x] Gate 5 - Independent review rejected exact candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- [x] Gate 5 - Replacement candidate workflow recorded for exact candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- [ ] Gate 5 - Fresh independent review of replacement exact candidate SHA required next.
- [ ] Certification of exact approved replacement candidate SHA not authorized.

## Scope Rules

- Reviewer corrections stay in this card.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-523 and later identities may remain setup-only before Bant certification, but may not receive semantic work.
- The rejected candidate and rejection review must remain visibly rejected and preserved; do not amend, squash, replace, or erase them.
- The replacement workflow commit must never be substituted for exact replacement candidate SHA `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.

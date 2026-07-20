# VM-522 - Bant Semantic Recovery

ID: VM-522
Status: Done - Certified Semantically Ready
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

VM-522 completed drift preflight, stage-ownership adjudication, Gate 1+2 audit, Gate 3+4 remediation, original Gate 5 candidate workflow recording, independent review rejection, bounded rejection remediation, replacement-candidate workflow recording, and fresh independent exact-SHA review of the replacement candidate.

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

Replacement independent exact-SHA review record:

`docs/handoffs/2026-07-20-0013-codex-vm522-bant-replacement-independent-review.md`

Replacement independent review decision:

`APPROVE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

The prior rejection review applies only to rejected candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`; it was independently reproduced as evidence for the replacement review, not used as approval for `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.

Bant is certified `semantically_ready` from exact approved replacement candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`. Certified count is 21 of 37. Wave 4 shards are 1 of 10 certified. Program base advances externally to the VM-522 certification commit; tracked self-referential governance uses `PENDING_VM522_CERTIFICATION_COMMIT_SHA`.

## Replacement Closure Summary

- Evidence locator closure: 43 substantive evidence locators, 0 missing artifact files; stale paths corrected to existing tracked bounded artifacts.
- Provenance closure: 87 Bant-linked entries, 0 required null canonical IDs, 0 null hashes, 0 unresolved pointers, 0 duplicate canonical/null keys observed, 0 non-substantive authoritative chains.
- Claim counts: 21 total; 16 `substantive_claim`, 5 `support_record`, 0 `discovery_record`, 0 unclassified.
- Candidate-scope: PASS for BANT; invalid WUG alias rejects as expected.
- Semantic readiness, fixture validation, parser, placement, faction-context isolation, source/generated guardrail, candidate-scope, and exact-export full tests passed.
- Provenance generator output exactly matched the committed Git blob; review-worktree `--check` reported only a CRLF checkout expansion mismatch, classified as informational.
- Source/generated guardrail retains only non-blocking model-owned inhibitor warnings already allowed or independently classified.
- Replacement review matrix: 36 PASS, 0 FAIL, 0 UNKNOWN, 0 N/A; 0 approval-blocking findings.

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
- [x] Gate 5 - Fresh independent review approved replacement exact candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- [x] Certification of exact approved replacement candidate SHA complete.

## Scope Rules

- Reviewer corrections stay in this card.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-523 and later identities may remain setup-only before Bant certification, but may not receive semantic work.
- The rejected candidate and rejection review must remain visibly rejected and preserved; do not amend, squash, replace, or erase them.
- The replacement workflow commit must never be substituted for exact replacement candidate SHA `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Certification may certify only exact approved candidate SHA `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.


## Certification - 2026-07-20

- Decision: `CERTIFIED SEMANTICALLY_READY`.
- Exact approved replacement candidate: `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Replacement workflow record: `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`.
- Independent approval review: `66f0f4bfbde0260910a73b797ede17eaa25d5a76`.
- Exact approval line: `APPROVE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Prior rejected candidate: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`, preserved and rejected.
- Prior rejection review: `82b92666ab33904e254c5c3807b8d62f47c53496`, preserved.
- Contract: CRIT-001 Contract v1.1.
- Certification placeholder: `PENDING_VM522_CERTIFICATION_COMMIT_SHA`.
- Claim counts: 21 total; 16 substantive; 5 support; 0 discovery; 0 unclassified.
- Evidence locators: 43 substantive evidence locators; 0 missing.
- Provenance: 87 BANT entries; 0 required null canonical IDs; 0 null hashes; 0 unresolved pointers; 0 duplicate canonical/null keys; 0 non-substantive authoritative chains.
- Fixture/collision/preview/consumer controls: PASS.
- DRIFT-015, DRIFT-016, DRIFT-017: PASS.
- Frozen-field and non-Bant integrity: PASS.
- Candidate-scope: PASS for BANT; WUG remains invalid and rejected.
- Program status: 21 certified identities; Wave 4 shards 1 of 10 certified.
- VM-523 / Esper: not started.
- External Excel tracker: untouched.

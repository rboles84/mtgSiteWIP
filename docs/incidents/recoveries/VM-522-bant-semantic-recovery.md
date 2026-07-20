# VM-522 - Bant Semantic Recovery

Status: Done - Certified Semantically Ready
Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: Bant / WUG
Internal key: BANT
Contract: CRIT-001 Contract v1.1

## Certification Summary

Bant / WUG is certified `semantically_ready` from exact approved replacement candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`. The certification records review object `66f0f4bfbde0260910a73b797ede17eaa25d5a76`, replacement workflow object `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`, prior rejected candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`, and rejection review `82b92666ab33904e254c5c3807b8d62f47c53496`. The certification commit is self-referential, so tracked governance uses `PENDING_VM522_CERTIFICATION_COMMIT_SHA`; the actual certification SHA is reported externally after commit creation and becomes the new program base.

## Preserved History

- Preflight STOP records: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`, `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`.
- Stage-ownership adjudication: `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`.
- Gate 1+2 audit: `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`.
- Gate 3+4 remediation: `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`.
- Original candidate workflow: `docs/handoffs/2026-07-19-2119-codex-vm522-bant-candidate-workflow.md`.
- Original rejection: `REJECT EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0` at `82b92666ab33904e254c5c3807b8d62f47c53496`.
- Replacement candidate workflow: `docs/handoffs/2026-07-19-2320-codex-vm522-bant-replacement-candidate-workflow.md`.
- Replacement approval review: `docs/handoffs/2026-07-20-0013-codex-vm522-bant-replacement-independent-review.md`.

## Certification Checks

- Exact approval line: `APPROVE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Claim counts: 21 total; 16 substantive; 5 support; 0 discovery; 0 unclassified.
- Evidence locators: 43 substantive locators, 0 missing.
- Provenance: 87 BANT entries; 0 required null canonical IDs; 0 null hashes; 0 unresolved pointers; 0 duplicate canonical/null keys; 0 non-substantive authoritative chains.
- Fixture: 21 cases, PASS.
- Collision and placement: PASS.
- Preview source/embedded equality: PASS.
- Home, Archscry, recruiter, tests, and CI consumers: PASS.
- DRIFT-015, DRIFT-016, DRIFT-017: PASS.
- Frozen-field and non-Bant integrity: PASS.
- Candidate-scope: PASS for BANT; invalid WUG alias exits 1 with `Unknown identity WUG`.

## Program State

- Certified count: 21 of 37.
- Wave 4 shards: 1 of 10 certified.
- Next identity: VM-523 / Esper remains not started.
- External Excel tracker: untouched.
- VM-542/DRIFT-019 residual artifacts and historical/debug/archive exclusions: untouched.

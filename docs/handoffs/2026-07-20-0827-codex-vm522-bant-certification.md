# VM-522 Bant Certification Handoff

Agent name: Codex
Task requested: Certification-only transition for exact approved Bant replacement candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
Program: CRIT-001 - 37-Identity Semantic Recovery Program
Ticket: VM-522
Identity: Bant / WUG
Internal key: BANT
Contract version: v1.1
Certification worktree: `C:\dev\mtgSiteWIP-crit001-vm522-replacement-review`
Certification branch: `codex/vm-522-bant-replacement-independent-review`
Starting HEAD: `66f0f4bfbde0260910a73b797ede17eaa25d5a76`
Prior program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`

## Exact Object Separation

- Rejected candidate: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- Rejection review: `82b92666ab33904e254c5c3807b8d62f47c53496`.
- Exact approved replacement candidate: `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Replacement workflow record: `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`.
- Exact approval review: `66f0f4bfbde0260910a73b797ede17eaa25d5a76`.
- Exact approval line: `APPROVE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Certification commit placeholder: `PENDING_VM522_CERTIFICATION_COMMIT_SHA`.
- New program base after commit: the certification commit created by this window.

## Certification Delta

Changed only governance/certification state: BANT status to `semantically_ready`, exact recovery candidate metadata, exact approval review metadata, certified total to 21 of 37, Wave 4 to 1 of 10, VM-522 card completion, board, CRIT ledgers, drift register, recovery summary, handoff, and handoff index. VM-523 / Esper remains not started.

Generated outputs checked: `npm.cmd run build:factions` ran twice after sandbox escalation, wrote expected generated outputs, and produced no content numstat diff; only Windows LF/CRLF working-tree warnings appeared. Generated files were restored so the certification commit remains governance-only.

## Preservation Checks

- Claim-count preservation: PASS - 21 total, 16 substantive, 5 support, 0 discovery, 0 unclassified.
- Evidence-locator preservation: PASS - 43 substantive evidence locators, 0 missing.
- Provenance preservation/freshness: PASS by normalized Git-blob determinism - 1890 generated entries, 87 BANT entries; worktree `--check` remains CRLF-sensitive, normalized equality true.
- Fixture result: PASS - 21 Bant fixtures.
- Collision result: PASS.
- Preview result: PASS - source and embedded BANT preview equal.
- Home consumer: PASS.
- Archscry consumer: PASS.
- Recruiter consumer: PASS.
- Tests and CI consumer: PASS.
- DRIFT-015: PASS.
- DRIFT-016: PASS.
- DRIFT-017: PASS.
- Frozen-field result: PASS.
- Non-Bant integrity: PASS.

## Validation Commands

- JSON parse checks for governance and Bant candidate JSON - exit 0.
- `node research/audit-semantic-readiness.mjs --targets=BANT` - exit 0.
- `node research/validate-semantic-readiness.mjs --targets=BANT` - exit 0.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=BANT` - exit 0.
- `node research/semantic-candidate-scope-tests.js` - exit 0.
- `node research/validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` - exit 0.
- `node research/validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` - exit 1 as expected: `Unknown identity WUG`.
- `node research/build-semantic-readiness-provenance.mjs --check` - exit 1 in CRLF worktree; normalized equality check exit 0 with 1890 entries, exact_equal false, normalized_equal true.
- Bant reconciliation script - exit 0.
- `npm.cmd run build:factions` - first sandbox attempt exit 1 EPERM, escalated run exit 0; second escalated run exit 0.
- `npm.cmd run test:semantic-readiness` - exit 1 only at the CRLF-sensitive provenance exact check after semantic contract tests, candidate-scope tests, and fixture validation passed; normalized provenance equality was independently proven.
- `npm.cmd run test:parser` - exit 0, 226 parser cases passed.
- `npm.cmd run test:placement` - exit 0, 37 factions and 37 golden paths passed.
- `npm.cmd run test:faction-context-isolation` - exit 0.
- `npm.cmd run test:source-generated -- --targets=BANT` - exit 0 with one non-blocking BANT model-owned inhibitor warning.

## Files Changed

- `docs/incidents/recoveries/VM-522-bant-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-522-bant-semantic-recovery.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md` removed by move
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-20-0827-codex-vm522-bant-certification.md`

## Not Touched

No semantic remediation, claim/source/evidence/provenance/fixture/collision/preview/consumer change, replacement candidate, independent review, VM-523 setup, Excel update, push, PR, merge, amend, rebase, cherry-pick, shared validator/generator/schema/package change, historical/debug/archive cleanup, VM-542/DRIFT-019 residual change, or Table Talk change occurred. Candidate campaign worktree, prior review worktree, original main, and DRIFT-017 prototype remained untouched.

## Final Certification Status

Bant / WUG is certified `semantically_ready` from exact approved replacement candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`. The rejected candidate remains rejected and preserved. VM-523 / Esper remains not started.

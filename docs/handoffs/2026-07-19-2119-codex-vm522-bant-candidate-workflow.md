# VM-522 Bant Candidate Workflow Record

Agent name: Codex
Task requested: Record the governance-only VM-522 candidate workflow for the already-designated exact Bant candidate SHA and prepare VM-522 for separate independent exact-SHA review.

## Program And Identity

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Ticket: VM-522
- Identity: Bant / WUG
- Internal key: BANT
- Branch: `codex/vm-522-bant-semantic-recovery`
- Worktree: `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`
- Status after this workflow: candidate awaiting independent exact-SHA review

## Exact Object Identities

- Program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Exact semantic candidate: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- Current governance parent: `c1601e9cb7883e62b036d78200fd9c770972016c`
- Candidate workflow-record commit: `PENDING_VM522_CANDIDATE_WORKFLOW_RECORD_COMMIT_SHA`
- Review record: not yet created
- Certification commit: not yet created
- Advanced program base: not yet created

The semantic candidate is exactly `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`. This workflow-record commit is governance-only and must never be substituted for the candidate SHA.

## Candidate Lineage

- Original program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Original preflight STOP: `62732685d31ce389e22e82d1331387b49e3e7345`
- Preflight rerun STOP: `ffba9fd181e7f363682fc111b99aaf038babbd04`
- Stage-ownership adjudication: `16a3a33f2d7cf0ec771d1125f3fc1e1582d93d7d`
- Gate 1+2 audit: `d135a7b233e38097857f466f71b1a9fae234553e`
- Gate 3+4 implementation chain:
  - `765f0a9c154e3c49a9d973e75994a0867eb18652`
  - `799627ec0d1ebbc927b84f63ce5634c633125e24`
  - `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- Gate 3+4 governance commit: `c1601e9cb7883e62b036d78200fd9c770972016c`

Ancestry was reconfirmed: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0` descends from `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`, and `c1601e9cb7883e62b036d78200fd9c770972016c` directly descends from `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.

Post-candidate comparison `b466cddb4618b1e2d7c897c15f7513a6d2db08b0..c1601e9cb7883e62b036d78200fd9c770972016c` contains only governance files:

- `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`

No candidate-scope semantic, generated, fixture, provenance, preview, runtime, test, validator, or infrastructure file changed after the candidate.

## Candidate Qualification Summary

Gate 5 read-only qualification designated the exact candidate:

`PASS - BANT CANDIDATE EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`

Qualification scorecard:

- Total: 29
- PASS: 29
- FAIL: 0
- UNKNOWN: 0
- N/A: 0

Reconfirmed in this workflow window:

- Candidate-scope validator: PASS, `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=b466cddb4618b1e2d7c897c15f7513a6d2db08b0` exited 0.
- Invalid alias check: PASS, `--identity=WUG` exited 1 with `Unknown identity WUG`.
- Semantic-readiness validation: PASS for BANT.
- Fixture validation: PASS for BANT.
- Provenance freshness: PASS, `Verified 1890 semantic provenance entries.`
- Audit counts: 21 claims; 16 `substantive_claim`, 5 `support_record`, 0 `discovery_record`, 0 unclassified.
- Evidence scope: PASS, no substantive claim lacks evidence locations and no evidence location lacks `evidence_scope`.
- Collision guidance: PASS, raw/generated collision targets are reconciled and candidate-scope validation passed.
- Required-neighbor coverage: PASS for Selesnya/WG, Simic/UG, Azorius/WU, Green/G, White/W, Blue/U, Naya, Esper, Temur, Abzan, Jeskai, Grixis, Jund, Sultai, Five-color/WUBRG, generic good-stuff, generic balance, and generic overfit.
- Preview result: PASS, `data/identity-layers.json#/expressions/BANT/preview_text` equals generated `data/factions.json#/identity_layers/expressions/BANT/preview_text`.
- Active-consumer result: PASS, Home, Archscry, recruiter, tests, and CI consumers were proven by direct dependency evidence in prior VM-522 records and remain unchanged.
- DRIFT-015: PASS.
- DRIFT-016: PASS.
- DRIFT-017: PASS.
- Frozen-field result: PASS, WUG color identity, placement/scoring fields, generated lateral targets, native-ID retention, and collision shape remained in scope.
- Non-Bant integrity: PASS, candidate-scope validation found no unrelated identity or global data drift.
- Test results: prior exact qualification recorded `npm.cmd test` and `npm.cmd run test:parser` passing against the candidate; this workflow did not rerun write-producing tests in-place.

## Preserved History

All previous VM-522 history remains intact and unmodified:

- Original preflight STOP handoff: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Preflight rerun STOP handoff: `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- Stage-ownership adjudication handoff: `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`
- Gate 1+2 audit handoff: `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- Gate 3+4 remediation handoff: `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- Gate 5 read-only candidate qualification: recorded in the prior final Codex response for exact SHA `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.

The superseded authorization conclusions in the preserved STOP records remain historical evidence. They were not amended, squashed, replaced, deleted, or rewritten.

## Independent Review Contract

Independent review is the next authorized step and must occur in a separate Codex window.

The reviewer must:

- Review exactly `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- Compare against exactly `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.
- Treat later governance commits, including `c1601e9cb7883e62b036d78200fd9c770972016c` and this workflow-record commit, as outside the semantic candidate.
- Inspect the complete candidate diff.
- Revalidate source authority, semantic accuracy, evidence scope, neighbor boundaries, preview alignment, active consumers, provenance, fixtures, collision guidance, frozen fields, and non-Bant integrity.
- Perform no remediation.
- Perform no certification.

The independent review must return exactly one of:

- `APPROVE EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- `REJECT EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`

Certification remains prohibited. Certification requires the exact approval line above. Approval of another SHA is invalid. Silence, partial approval, conditional approval, or approval of a branch name is insufficient.

## Current State

- Candidate exists: yes.
- Exact candidate SHA is fixed: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- Candidate workflow is recorded separately from the candidate.
- Independent review is next.
- No review has occurred.
- No review decision exists.
- No certification is authorized.
- Bant is not yet `semantically_ready`.
- Certified count remains 20 of 37.
- Program base remains `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- Relevant VM-521 candidate, independent review, re-review, and certification precedents.

## Files Changed

- `docs/handoffs/2026-07-19-2119-codex-vm522-bant-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`

## What Changed

- Recorded exact candidate SHA `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`.
- Updated VM-522 governance state from Gate 5 authorized/no candidate to candidate awaiting independent exact-SHA review.
- Preserved the distinction between semantic candidate SHA and workflow-record commit SHA.
- Recorded independent review requirements and exact decision language.

## What Did Not Change

- No candidate file changed.
- No new semantic candidate was created.
- No empty commit was used as a candidate.
- No semantic remediation occurred.
- No source acquisition occurred.
- No generated output, fixture, provenance, preview, runtime, validator, test, or infrastructure file changed.
- No independent review occurred.
- No review decision was recorded.
- No certification occurred.
- Bant was not marked `semantically_ready`.
- Certified count remains 20 of 37.
- Program base was not advanced.
- VM-523 was untouched.
- Original main was untouched.
- Excel tracker was untouched.
- DRIFT-017 prototype was untouched.
- VM-542 / DRIFT-019 residual files were untouched.
- Table Talk baseline was preserved.

## Risks / Uncertainties

- Independent review has not started.
- The workflow-record commit SHA cannot be embedded into the same commit without a self-reference; the placeholder above is resolved by the final task output after commit creation.

## Tests Run

- `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- `node research\validate-semantic-readiness.mjs --targets=BANT`
- `node research\validate-semantic-readiness.mjs --fixtures --targets=BANT`
- `node research\build-semantic-readiness-provenance.mjs --check`
- `node research\audit-semantic-readiness.mjs --targets=BANT`
- `node research\validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=b466cddb4618b1e2d7c897c15f7513a6d2db08b0` exited 1 with `Unknown identity WUG`.
- Candidate JSON spot verification script for role counts, evidence scopes, preview equality, fixtures, required-neighbor tokens, collision targets, and WUG color identity.

No write-producing test command was run in-place.

## Follow-Up Recommendations

Run independent exact-SHA review of `b466cddb4618b1e2d7c897c15f7513a6d2db08b0` against program base `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Next Suggested Agent

Independent Reviewer

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`
- `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-operating-playbook.md`

PASS — BANT CANDIDATE WORKFLOW RECORDED FOR EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0

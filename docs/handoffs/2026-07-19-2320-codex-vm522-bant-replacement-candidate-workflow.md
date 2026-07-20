# VM-522 Bant Replacement-Candidate Workflow Record

Agent name: Codex
Task requested: Record the governance-only replacement-candidate workflow for exact Bant candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` and move VM-522 to the repository-authoritative state awaiting fresh independent review.

## Program And Identity

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Ticket: VM-522
- Identity: Bant / WUG
- Internal key: BANT
- Invalid internal alias: WUG
- Branch: `codex/vm-522-bant-semantic-recovery`
- Worktree: `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`
- Program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Status after this workflow: replacement candidate awaiting fresh independent exact-SHA review

## Exact Object Ledger

- Program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Rejected candidate: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- Original candidate workflow record: `224d05d9aad242406e076b0e1f5b6d9b288a5977`
- Rejection review record: `82b92666ab33904e254c5c3807b8d62f47c53496`
- Rejection-remediation implementation commits:
  - `151dc3b0647833207e2e2678da3fa06282fafd7f`
  - `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`
- Exact replacement semantic candidate: `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`
- Replacement-candidate workflow-record commit: `PENDING_VM522_REPLACEMENT_CANDIDATE_WORKFLOW_RECORD_COMMIT_SHA`
- Replacement independent-review record: not yet created
- Certification commit: not created and not authorized
- Advanced program base: not created

The replacement semantic candidate is exactly `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`. This workflow-record commit is governance-only and must never be substituted for the candidate SHA.

## Rejection History Preserved

The rejected candidate remains visibly rejected and preserved:

`REJECT EXACT SHA b466cddb4618b1e2d7c897c15f7513a6d2db08b0`

The rejection review `82b92666ab33904e254c5c3807b8d62f47c53496` identified two approval blockers:

- Missing bounded evidence artifacts: 22 load-bearing Bant substantive evidence locators pointed to 12 missing local artifact paths.
- Null required Bant provenance canonical IDs: 28 required/generated-consumed BANT provenance rows retained `canonical_id: null`.

That rejection remains valid historical evidence. No rejected candidate commit, original workflow record, rejection review, preflight STOP, stage-ownership adjudication, Gate 1+2 audit, Gate 3+4 record, or prior VM-522 handoff was amended, squashed, deleted, replaced, or rewritten.

## Replacement Remediation Recorded

Replacement remediation descends through the rejection review:

- `151dc3b0647833207e2e2678da3fa06282fafd7f` repaired the bounded evidence locator and provenance canonical-ID blockers.
- `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` disambiguated a Bant source title for candidate scope and is the exact replacement candidate.

Direct Git checks in this workflow confirmed:

- `82b92666ab33904e254c5c3807b8d62f47c53496` is an ancestor of `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- `b466cddb4618b1e2d7c897c15f7513a6d2db08b0` remains in the ancestry of `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- No implementation commit exists after `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`; `git diff --name-status 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8..HEAD` was empty before this governance record.

Replacement remediation recorded stale locator repairs to existing tracked bounded artifacts, provenance canonical-ID repairs, and source-title disambiguation. This workflow did not perform semantic re-adjudication, source invention, external source acquisition, shared infrastructure change, generator execution, remediation, independent review, approval, rejection, or certification.

## Replacement Qualification Reconfirmed

Read-only checks in this workflow and the immediately preceding replacement-candidate qualification reconfirmed:

- Candidate-scope for BANT: PASS, `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` exited 0.
- Invalid WUG alias: expected rejection, `--identity=WUG` exited 1 with `Unknown identity WUG`.
- Semantic readiness: PASS.
- Fixture validation: PASS.
- Audit: PASS; 21 claims, 16 `substantive_claim`, 5 `support_record`, 0 `discovery_record`, 0 unclassified.
- Evidence locators: PASS; 43 substantive evidence locator objects, 43 unique locators, 0 missing artifact files.
- Provenance freshness: PASS; 1890 semantic provenance entries verified.
- BANT provenance closure: 87 Bant-linked entries, 0 required null canonical IDs, 0 null hashes, 0 unresolved pointers, 0 duplicate canonical/null keys observed, 0 non-substantive authoritative chains.
- Parser: PASS; 226 parser cases passed.
- Semantic-readiness tests: PASS.
- Faction-context isolation: PASS.
- Source/generated guardrail: PASS with documented existing model-owned JESKAI/MARDU warnings only.
- Placement/collision: PASS; adaptive placement tests covered 37 factions and 37 golden paths.
- Preview and consumed surface: PASS; `data/identity-layers.json#/expressions/BANT/preview_text` equals `data/factions.json#/identity_layers/expressions/BANT/preview_text`.
- DRIFT-015: PASS; preview ownership, source-to-embedded equality, stale-copy, and consumed-surface controls remain preserved.
- DRIFT-016: PASS; approved candidate-scope validator handled BANT without shared infrastructure change.
- DRIFT-017: PASS; active Home, Archscry, recruiter, tests, and CI consumer classifications remain those proven in VM-522 Gate 1+2 and later records.
- Frozen fields: PASS; no scoring, confidence, calibration, native-ID, lateral-target, collision-target, preview, runtime, or non-Bant drift occurred after the candidate.
- Non-Bant integrity: PASS; no non-Bant semantic or generated candidate-scope path entered this governance workflow.
- Exact exported-candidate full test: PASS in the immediately preceding exact replacement-candidate qualification using export path `C:\Users\obake\AppData\Local\Temp\vm522-exact-filetar-5522e8494a0d-20260719230354`.
- Closure scorecard: 20 PASS, 0 FAIL, 0 UNKNOWN, 0 N/A.

## Fresh Independent Review Contract

The next authorized step is a fresh independent exact-SHA review in a separate Codex window, using a separate independent-review branch and worktree.

The reviewer must:

- Review exactly `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Compare against exactly `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.
- Inspect the bounded repair delta `b466cddb4618b1e2d7c897c15f7513a6d2db08b0..5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Treat the prior rejection as evidence, not as approval or rejection of the replacement candidate.
- Independently verify closure of both original blockers.
- Review every recovered or remapped evidence locator.
- Review all 28 repaired provenance canonical-ID rows.
- Reconfirm all previously passing semantic, neighbor, fixture, collision, preview, consumed-surface, frozen-field, and non-Bant controls.
- Perform no remediation.
- Perform no certification.

The required future review decision must be exactly one of:

- `APPROVE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`
- `REJECT EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

Approval of the rejected SHA is invalid. Approval of the workflow commit is invalid. Approval of the branch or current HEAD is invalid. Conditional approval is invalid. Certification remains prohibited until exact replacement-SHA approval is recorded.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-522-bant-semantic-recovery.md`
- `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`
- `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- `docs/handoffs/2026-07-19-2119-codex-vm522-bant-candidate-workflow.md`
- `docs/handoffs/2026-07-19-2157-codex-vm522-bant-independent-review.md`
- Replacement-candidate precedents for VM-516, VM-519, and VM-520.

## Files Changed

- `docs/handoffs/2026-07-19-2320-codex-vm522-bant-replacement-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-522-bant-semantic-recovery.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`

## What Changed

- Recorded exact replacement candidate SHA `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Preserved rejected candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0` and rejection review `82b92666ab33904e254c5c3807b8d62f47c53496`.
- Moved VM-522 from blocked to review-ready governance state for a fresh replacement exact-SHA review.
- Recorded the review contract and exact future decision language.

## What Did Not Change

- No candidate file changed.
- No new candidate was created.
- No semantic remediation occurred.
- No source locator, claim, evidence, provenance, fixture, collision guidance, preview, active consumer, test, validator, shared generator, schema, raw data, generated data, runtime behavior, or infrastructure file changed in this workflow.
- No generator ran in write mode.
- No independent review occurred.
- No approval or rejection was recorded for the replacement candidate.
- No certification occurred.
- Bant was not marked `semantically_ready`.
- Certified count remains 20 of 37.
- Program base remains `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.
- VM-523 was untouched.
- Original main was inspected only by read-only status and was untouched.
- Excel tracker was untouched.
- Independent-review worktree was inspected only by read-only status and was untouched.
- DRIFT-017 prototype was inspected only by read-only status and was untouched.
- VM-542 / DRIFT-019 residual artifacts were untouched.
- Historical, debug, inspection, archive, and Table Talk files were untouched.

## Risks / Uncertainties

- The replacement candidate has not received independent review.
- This workflow-record commit SHA cannot be embedded into itself; the placeholder above must be resolved by the final task output after commit creation.

## Tests Run

- `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` - exit 0.
- `node research\validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` - exit 1 as expected.
- `node research\validate-semantic-readiness.mjs --targets=BANT` - exit 0.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=BANT` - exit 0.
- `node research\audit-semantic-readiness.mjs --targets=BANT` - exit 0.
- `node research\build-semantic-readiness-provenance.mjs --check` - exit 0.
- Read-only JSON closure script for claims, evidence locators, provenance, and preview equality - exit 0.
- `npm.cmd run test:parser` - exit 0.
- `npm.cmd run test:semantic-readiness` - exit 0.
- `npm.cmd run test:faction-context-isolation` - exit 0.
- `npm.cmd run test:source-generated` - exit 0 with documented unrelated JESKAI/MARDU model-owned warnings.
- `npm.cmd run test:placement` - exit 0.

## Follow-Up Recommendations

Run a fresh independent exact-SHA review of `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` against program base `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Next Suggested Agent

Independent reviewer for exact Bant replacement candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`
- `docs/handoffs/2026-07-19-2157-codex-vm522-bant-independent-review.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-operating-playbook.md`

PASS — BANT REPLACEMENT CANDIDATE WORKFLOW RECORDED FOR EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8

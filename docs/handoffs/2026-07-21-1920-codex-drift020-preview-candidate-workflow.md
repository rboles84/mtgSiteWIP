# DRIFT-020 Preview Candidate-Scope Workflow Record

Agent name: Codex

Task requested: Record the governance-only DRIFT-020 exact-SHA candidate workflow for already-qualified shared-infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.

## Program And Control

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Control: DRIFT-020
- Purpose: Identity-local authoritative-preview candidate scope
- Branch: `codex/drift-020-jund-preview-candidate-scope`
- Worktree: `C:\dev\mtgSiteWIP-crit001-drift020-jund-preview-scope`
- Status after this workflow: exact infrastructure candidate awaiting fresh independent exact-SHA review

## Exact Object Ledger

- Current program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`
- Jund Gate 3+4 feasibility stop: `460dd7186dc76658797beac74a4330cc699a52d6`
- Exact DRIFT-020 infrastructure candidate: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`
- Candidate qualification governance: `8ded0f4ed463e9a82564859d32051ec02dc97754`
- Candidate workflow commit: `PENDING_DRIFT020_CANDIDATE_WORKFLOW_RECORD_COMMIT_SHA`
- Independent review record: not created
- Certification commit: not created and not authorized
- New program base: not created
- Jund semantic candidate: does not exist

The infrastructure candidate is exactly `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`. Neither the qualification governance commit, this workflow commit, current HEAD, the branch, nor "latest changes" may be substituted for the candidate.

## Candidate Lineage And Separation

Complete ancestry verified in this workflow:

- `16528f3a24a7f3d7f4475bdde56fbfee09becd98` - VM-524 Grixis certification / current CRIT-001 program base
- `f189c2f5b6a758e928934fca45a77d879f70a7d4` - VM-525 Jund drift preflight
- `b07dd366617633af49cb6eadb0660735431dbdad` - VM-525 Jund Gate 1+2 semantic audit
- `460dd7186dc76658797beac74a4330cc699a52d6` - VM-525 Jund Gate 3+4 feasibility stop
- `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` - DRIFT-020 identity-local preview candidate-scope implementation
- `8ded0f4ed463e9a82564859d32051ec02dc97754` - DRIFT-020 candidate qualification governance

Implementation commit list:

- `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` - `DRIFT-020: authorize identity-local preview candidate scope`

Candidate file list and classification:

- `research/validate-semantic-candidate-scope.mjs` - candidate-scope validator implementation
- `research/semantic-candidate-scope-tests.js` - candidate-scope regression tests

Post-candidate governance delta `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa..8ded0f4ed463e9a82564859d32051ec02dc97754` contains only:

- `docs/handoffs/2026-07-21-1829-codex-drift020-jund-preview-candidate-scope.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/DRIFT-020-jund-preview-candidate-scope.md`

No validator, test, semantic identity, identity-layer text, generated identity, recruiter, schema, generator, package, CI, runtime, Jund remediation, or unrelated implementation path changed after the candidate. This workflow record is governance outside the exact infrastructure candidate.

Collision checks found no existing DRIFT-020 workflow commit, no independent review, no `APPROVE EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, no `REJECT EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, no certification, no program-base advancement, and no Jund semantic candidate.

## Qualified Design And Validation

Preview ownership decision: DRIFT-020 records the target identity-local authoritative preview source as candidate-owned only at object level. For Jund, the future allowed object is `data/identity-layers.json#/expressions/JUND/preview_text`.

Object-level boundary:

- Target identity preview-only change: PASS.
- Cross-identity preview change: rejected.
- Multiple preview changes: rejected.
- Mixed allowed preview plus disallowed field/other preview change: rejected.
- Non-preview identity-layer change: rejected.
- Structural bypass or whole-expression replacement: rejected.
- Invalid alias `BRG`: rejected as `Unknown identity BRG`.
- Unknown identity `NOTREAL`: rejected as `Unknown identity NOTREAL`.

Historical candidate compatibility:

- `UG` display-source preview candidate: PASS.
- `B` display-source preview candidate: PASS.
- `G` display-source preview candidate: PASS.
- `R` display-source preview candidate: PASS.
- `ESPER` no-preview candidate: PASS.
- `GRIXIS` no-preview candidate: PASS.

Jund STOP range:

- `16528f3a24a7f3d7f4475bdde56fbfee09becd98..460dd7186dc76658797beac74a4330cc699a52d6` with `--identity=JUND` still fails for unclassified Jund proof-chain contamination, as expected. DRIFT-020 does not accidentally convert the Jund STOP governance range into a semantic candidate.

Candidate-scope suite:

- `node research\semantic-candidate-scope-tests.js` - PASS, `Semantic candidate scope tests passed.`

Exact-tree full test:

- Prior DRIFT-020 qualification exported exact tree `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` and recorded `npm.cmd test` PASS with `EXIT_CODE=0`.
- This workflow did not rerun the full suite because it writes reports; the exact-tree PASS remains the recorded qualification fact.

Inherited stale-provenance disclosure:

- `npm.cmd run test:semantic-readiness` continues to encounter inherited stale `semantic-readiness-provenance.json` after readiness subtests pass.
- This predates DRIFT-020, was not caused by DRIFT-020, was not repaired here, and must not be represented as newly passing.
- It does not change the already recorded exact-tree full-test PASS under the qualified export conditions.

## Jund And VM-526 Relationship

- DRIFT-020 does not remediate Jund.
- DRIFT-020 does not change Jund preview text.
- DRIFT-020 does not create a Jund candidate.
- VM-525 remains blocked at Gate 3+4 STOP.
- VM-525 cannot resume until DRIFT-020 is workflow-recorded, independently reviewed, approved by exact SHA, certified, and included in a new program base.
- VM-526 remains untouched and Backlog.

## Independent Review Contract

The next authorized step is a fresh independent exact-SHA review in a separate branch and worktree.

The reviewer must:

- Review exactly `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Compare against exactly `460dd7186dc76658797beac74a4330cc699a52d6`.
- Treat `8ded0f4ed463e9a82564859d32051ec02dc97754` and this workflow commit as governance outside the candidate.
- Inspect the entire candidate diff.
- Independently verify authority and design.
- Verify all positive and negative scope behavior.
- Verify historical candidate compatibility.
- Verify Jund STOP-range rejection.
- Verify invalid-BRG rejection.
- Verify no semantic identity changes.
- Verify exact-tree tests.
- Perform no remediation.
- Perform no certification.
- Leave VM-525 Jund blocked.

The independent review must return exactly one of:

- `APPROVE EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`
- `REJECT EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`

Approval of any other SHA, the branch, current HEAD, the workflow commit, or "latest changes" is invalid. Conditional approval is invalid. Certification remains prohibited until exact approval is recorded.

## Current Campaign State

- Exact candidate exists: yes.
- Exact candidate SHA is fixed: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Candidate workflow is recorded separately from the candidate.
- Independent review is next.
- No independent review has occurred.
- No review decision exists.
- Certification is prohibited.
- Program base remains `16528f3a24a7f3d7f4475bdde56fbfee09becd98`.
- Certified count remains 23 of 37.
- Wave 4 remains 3 certified, 1 blocked, 6 backlog.
- VM-525 remains blocked.
- VM-526 remains untouched.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/DRIFT-020-jund-preview-candidate-scope.md`
- `docs/handoffs/2026-07-21-1829-codex-drift020-jund-preview-candidate-scope.md`
- `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- `docs/handoffs/2026-07-17-2357-codex-monocolor-validator-candidate.md`
- `docs/handoffs/2026-07-18-0037-codex-monocolor-validator-independent-review.md`
- `docs/handoffs/2026-07-19-2320-codex-vm522-bant-replacement-candidate-workflow.md`
- `docs/handoffs/2026-07-20-1641-codex-vm523-esper-candidate-workflow.md`
- `docs/handoffs/2026-07-21-0753-codex-vm524-grixis-candidate-workflow.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

## Files Changed

- `docs/handoffs/2026-07-21-1920-codex-drift020-preview-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/DRIFT-020-jund-preview-candidate-scope.md`
- `docs/kanban/in-progress/DRIFT-020-jund-preview-candidate-scope.md` removed by move

## What Changed

- Recorded exact DRIFT-020 infrastructure candidate SHA `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Moved DRIFT-020 to review-ready governance state for fresh independent exact-SHA review.
- Preserved the distinction between the infrastructure candidate, the qualification governance commit, and this workflow-record commit.
- Recorded independent review requirements and exact decision language.

## What Did Not Change

- No candidate file changed.
- No alternate candidate was created.
- Governance HEAD was not substituted for the candidate.
- No validator or test implementation changed.
- No identity-layer semantic text changed.
- No Jund remediation occurred.
- No Jund candidate or workflow was created.
- No independent review occurred.
- No approval or rejection was recorded.
- No certification occurred.
- Program base was not advanced.
- Certified count remains 23 of 37.
- Wave 4 remains 3 certified, 1 blocked, 6 backlog.
- VM-525 remains blocked.
- VM-526 remains untouched.
- VM-522, VM-523, and VM-524 history remained intact.
- Original main was inspected only by read-only status and was untouched.
- Excel tracker was untouched.
- DRIFT-017 was inspected only by read-only status and was untouched.
- VM-542 / DRIFT-019 residuals were untouched.
- Historical/debug/archive exclusions were untouched.
- Table Talk baseline was preserved.

## Decisions Made

- Use VM-523 and VM-524 workflow precedent for self-referential workflow SHA handling.
- Keep `PENDING_DRIFT020_CANDIDATE_WORKFLOW_RECORD_COMMIT_SHA` in the handoff and resolve the actual workflow commit SHA in the final task output after commit creation.
- Treat `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` as the only infrastructure object eligible for independent review.

## Risks / Uncertainties

- Independent review has not started.
- The workflow-record commit SHA cannot be embedded into itself without amending or creating a second commit; the placeholder above is resolved by final task output.
- The exact-tree full test was not rerun in this workflow because it writes reports; the prior DRIFT-020 qualification full-test result remains the recorded exact-tree result.
- The inherited stale semantic-readiness provenance condition remains unresolved and outside this workflow scope.

## Tests Run

- `node --input-type=module -e <object-boundary assertions>` - exit 0, `object-boundary probes passed`.
- `node research\semantic-candidate-scope-tests.js` - exit 0, `Semantic candidate scope tests passed.`
- `node research\validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e --identity=UG` - exit 0.
- `node research\validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=0bfe8b3d46d163de6e20064f5de9717075ca02c8 --identity=B` - exit 0.
- `node research\validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=45e323cde853ee5058b71c819f080ab4025597ce --identity=G` - exit 0.
- `node research\validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R` - exit 0.
- `node research\validate-semantic-candidate-scope.mjs --identity=ESPER --base=a7ea41cbf57cc87f1948fdd254f0295816c5919d --target=6467f70fa4de13173172e20277e0fd56ebaf0b80` - exit 0.
- `node research\validate-semantic-candidate-scope.mjs --identity=GRIXIS --base=0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a --target=64a5bfffd646b292c7481f91c9ccb6def42fb552` - exit 0.
- `node research\validate-semantic-candidate-scope.mjs --identity=JUND --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=460dd7186dc76658797beac74a4330cc699a52d6` - exit 1 with expected unclassified proof-chain contamination.
- `node research\validate-semantic-candidate-scope.mjs --identity=BRG --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=460dd7186dc76658797beac74a4330cc699a52d6` - exit 1, `Unknown identity BRG`.
- `node research\validate-semantic-candidate-scope.mjs --identity=NOTREAL --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=460dd7186dc76658797beac74a4330cc699a52d6` - exit 1, `Unknown identity NOTREAL`.

No write-producing full test command was run in this workflow.

## Follow-Up Recommendations

Run a fresh independent exact-SHA review of `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` against Jund feasibility-stop base `460dd7186dc76658797beac74a4330cc699a52d6` in a separate review window, branch, and worktree.

## Next Suggested Agent

Independent reviewer for exact DRIFT-020 infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/ready/DRIFT-020-jund-preview-candidate-scope.md`
- `docs/kanban/blocked/VM-525-jund-semantic-recovery.md`
- `docs/handoffs/2026-07-21-1829-codex-drift020-jund-preview-candidate-scope.md`
- `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- `docs/incidents/CRIT-001-drift-register.md`

PASS — DRIFT-020 CANDIDATE WORKFLOW RECORDED FOR EXACT SHA 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa

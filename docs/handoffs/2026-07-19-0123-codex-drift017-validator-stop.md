# CRIT-001 DRIFT-017 Validator Stop-Line Handoff

Agent name: Codex

Task requested: Extend candidate-scope validation for DRIFT-017 active preview consumers in an isolated infrastructure worktree, validate against rejected Green candidate `45e323cde853ee5058b71c819f080ab4025597ce`, failed Green consumed-surface attempt `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`, and certified W/U/B/R regressions, then create a separately reviewable validator candidate only if all controls pass.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-517-monocolor-validator-candidate-workflow.md`
- `docs/handoffs/2026-07-17-2357-codex-monocolor-validator-candidate.md`
- `docs/handoffs/2026-07-18-0037-codex-monocolor-validator-independent-review.md`
- `docs/handoffs/2026-07-18-2147-codex-vm521-green-candidate.md`
- `docs/handoffs/2026-07-18-2221-codex-vm521-green-independent-review.md`
- `docs/handoffs/2026-07-18-2253-codex-vm521-green-replacement-stop.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- Active consumer files as Git objects for Green base/candidate/failed-attempt ranges.

## Files Changed

Uncommitted investigative implementation edits in isolated worktree `C:\dev\mtgSiteWIP-crit001-drift017`:

- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

Stop-line governance record:

- `docs/handoffs/2026-07-19-0123-codex-drift017-validator-stop.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No implementation candidate commit was created.

## What Changed

- Created isolated worktree `C:\dev\mtgSiteWIP-crit001-drift017` on branch `codex/crit001-drift017-consumed-preview-scope` from Gate 1+2 base `332ab81ffcfa461df1109e89709d47907e7c0032`.
- Prototyped a DRIFT-017 active preview consumer registry for:
  - `assets/js/newindex-color-matrix.js`
  - `assets/js/color-matrix-radar.js`
  - `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`
  - `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`
- Added structure-aware JS `colorProfiles` and NDJSON `Identity_Layers_37` checks that permit only exact selected-identity preview propagation and fail closed on stale, mismatch, missing, duplicate, malformed, non-preview, logic, and unrelated changes.
- Added focused tests for exact propagation and negative DRIFT-017 consumer cases.

## Why It Stopped

The mandatory certified W/U/B/R regression check found new actual stale active preview consumers for already-certified Black and Red. The user brief explicitly says that if a new actual stale active consumer is found in a certified identity, stop, record it, and do not suppress it or create a candidate.

Black regression command:

`node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=0bfe8b3d46d163de6e20064f5de9717075ca02c8 --identity=B`

Result: exit 1 with two DRIFT-015 preview diagnostics plus four DRIFT-017 stale active consumer diagnostics in both JS files and both inspect NDJSON artifacts.

Red regression command:

`node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R`

Result: exit 1 with two DRIFT-015 preview diagnostics plus four DRIFT-017 stale active consumer diagnostics in both JS files and both inspect NDJSON artifacts.

White and Blue regressions passed with no unexpected diagnostics:

- `307b93d56b4314405011f21f7d7616ac4b7ed16f..89535e5f73598a5b518e31e11598b05087274a95 --identity=W`
- `428128505a194293feb915c929072e23dc9f0ace..ac774e2eac207cc7fe2d744beac1f11788908159 --identity=U`

## Decisions Made

- No DRIFT-017 validator candidate SHA was created.
- No validator workflow-record SHA was created.
- No implementation files were staged.
- The uncommitted validator/test prototype remains in the isolated worktree for review or follow-up, but it is not a candidate.
- Green remains blocked; failed attempt `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0` remains failed/superseded.
- Program base remains `9f0a076a369cba23dc9bc19231b0efcddd21afe5`; certified count remains 19; Wave 3 remains 4/5; VM-522 remains not started; external Excel remains untouched.

## Risks / Uncertainties

- Black and Red were certified before this stricter active-consumer validator existed. The new findings appear to be real stale active JS/NDJSON preview propagation gaps, not validator false positives.
- Because no candidate was created, the prototype still needs independent design review after the Black/Red policy/data blocker is resolved.
- The required full validation suite was not run after the stop-line because the regression control failed.

## Tests Run

- `node --check research/validate-semantic-candidate-scope.mjs`
- `node --check research/semantic-candidate-scope-tests.js`
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=45e323cde853ee5058b71c819f080ab4025597ce --identity=G`
- `node research/validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=ba2845a6ce6958f11de9c1d4935221c0fdda0ab0 --identity=G`
- `node research/validate-semantic-candidate-scope.mjs --base=307b93d56b4314405011f21f7d7616ac4b7ed16f --target=89535e5f73598a5b518e31e11598b05087274a95 --identity=W`
- `node research/validate-semantic-candidate-scope.mjs --base=428128505a194293feb915c929072e23dc9f0ace --target=ac774e2eac207cc7fe2d744beac1f11788908159 --identity=U`
- `node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=0bfe8b3d46d163de6e20064f5de9717075ca02c8 --identity=B`
- `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R`

## Not Touched

- Active Green worktree `C:\dev\mtgSiteWIP-crit001`
- Green semantic/generated files, identity packets, consumed preview files, `.xlsx` or inspect artifacts
- Candidate commits, candidate histories, review records, certification records, schemas, builders, runtime product logic, scoring, calibration, package dependencies
- External Excel tracker
- VM-522 / Wave 4
- Table Talk dirty baseline files

## Follow-up Recommendations

- Open a separate governance/data remediation question for stale Black and Red active preview consumers before reviving this validator candidate.
- After Black/Red stale active-consumer disposition is resolved, rerun the DRIFT-017 validator work from a fresh exact base and decide whether the current uncommitted prototype should be reused, amended, or discarded.
- Do not designate `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0` as a Green replacement candidate until an approved validator or explicit governance path handles active consumer propagation.

## Next Suggested Agent

CRIT-001 governance owner or Planning Architect for certified Black/Red DRIFT-017 stale active-consumer disposition.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-521-green-independent-review.md`

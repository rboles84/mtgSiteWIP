# VM-517 - Monocolor Validator Infrastructure Independent Review

Status: Approved exact infrastructure candidate. White Gate 1+2 remains not authorized until a separate drift-preflight rerun passes.

Review decision: `APPROVE EXACT SHA aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Review-record SHA: `PENDING_VM517_MONOCOLOR_VALIDATOR_REVIEW_RECORD_SHA`
Program base: `272337004aa63cfd33da5f1a859c33d211c8ca74`
White drift-preflight SHA: `06627929eb0e048a8c0c20612970e779098a982c`
Infrastructure candidate SHA: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Workflow-record SHA: `7c7b1bd5e463447196ece7c7160dd5b3fb4af6a1`
Reviewer: Codex independent review window
Reviewed at: `2026-07-18T00:37:00-06:00`

## Preflight

- Worktree: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-517-white-semantic-recovery`.
- Starting HEAD: `7c7b1bd5e463447196ece7c7160dd5b3fb4af6a1`.
- Required objects verified: program base, White drift preflight, exact candidate, and workflow record all exist as commits.
- Ancestry verified: program base -> White drift preflight -> exact candidate -> workflow record.
- Active worktree baseline: only the allowed Table Talk baseline was dirty before review.
- Original main: read-only status showed only the known docs/workflow baseline; no raw, generated, semantic, fixture, provenance, runtime, schema, validator, builder, scoring, or data changes.

## Candidate Isolation

Implementation diff `06627929eb0e048a8c0c20612970e779098a982c..aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` contains only:

- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

Workflow diff `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..7c7b1bd5e463447196ece7c7160dd5b3fb4af6a1` contains only governance/report files. It was excluded from the infrastructure candidate approval object.

No White raw, generated, semantic fixture, provenance, recruiter, source, placement, schema, builder, runtime, scoring, Hall, Crucible, calibration, certification, or VM-518 file changed in the candidate.

## Original Failure Reproduction

The old pre-candidate validator was run from a temporary copy against the active repository. Both probes reproduced the unhandled crash:

- `node <temp-old-validator> --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W`
- `node <temp-old-validator> --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=06627929eb0e048a8c0c20612970e779098a982c --identity=W`

Both exited 1 with:

`TypeError: (placement.collision_guidance || []).entries is not a function or its return value is not iterable`

Crash site: `validateCollisionGuidancePreservation`, pre-candidate line 324. White raw path: `data/raw-factions/white/white.placement.json#/collision_guidance`, object with ordered `pairs`.

## Shape Inventory

Repository-wide raw placement inspection found only two live shapes:

- Array at `#/collision_guidance`: 25 identities, including recovered guilds, colleges, shards, and clans.
- Object with ordered array at `#/collision_guidance/pairs`: `B`, `U`, `COLORLESS`, `DUNE`, `GLINT`, `G`, `INK`, `R`, `W`, `WITCH`, `WUBRG`, and `YORE`.

No missing, primitive, null, object-without-`pairs`, non-array-`pairs`, or third live shape was found.

## Implementation Review

The candidate adds `normalizeCollisionGuidanceForCandidateScope` and routes collision preservation through it.

Review result:

- PASS - existing array-shaped collision guidance keeps ordered pointer semantics.
- PASS - object-with-`pairs` guidance uses `#/collision_guidance/pairs/<index>` and ignores metadata as pair data.
- PASS - `collision_id` and `against` comparison semantics are preserved.
- PASS - malformed pair elements fail closed with identity, file, JSON path, supported shape, observed type, and reason.
- PASS - missing/null/primitive/object-without-`pairs`/non-array-`pairs` inputs fail closed.
- PASS - no broad `Object.values` flattening or metadata promotion was introduced.
- PASS - no input mutation was observed in a direct object-with-`pairs` normalization check.

## Regression Matrix

- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=06627929eb0e048a8c0c20612970e779098a982c --identity=W`: exit 1, expected pre-remediation unclassified proof-chain failures only; no crash and no collision structural error.
- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W`: exit 1, expected pre-remediation unclassified proof-chain failures only; no crash and no collision structural error.
- `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG`: pass.
- `node research/validate-semantic-candidate-scope.mjs --base=de5e2e8344dcdfd6feb44e3731a0819f44142bb6 --target=8aea3e359c16687948178ad55a927cf758fd9206 --identity=WB`: pass.
- `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e --identity=UG`: exit 1, preserved approved Simic display-source exception behavior only.
- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=U`: exit 1, expected pre-remediation unclassified proof-chain failures only; no object-with-`pairs` crash.

## Validation

- `node research/semantic-candidate-scope-tests.js`: pass.
- `node research/audit-semantic-readiness.mjs --targets=W`: pass; W has 8 unclassified claims and remains pre-remediation.
- `node research/validate-semantic-readiness.mjs --targets=W`: expected exit 1 for White pre-remediation readiness blockers; no infrastructure crash.
- `npm.cmd run build:factions`: pass; no content diff.
- Second `npm.cmd run build:factions`: pass; no content diff.
- `npm.cmd run test:semantic-readiness`: pass.
- `npm.cmd run test:placement`: pass.
- `npm.cmd run test:faction-context-isolation`: pass.
- `npm.cmd run test:source-generated`: pass with unchanged JESKAI/MARDU model-owned inhibitor warnings; the candidate changed no JESKAI or MARDU source/generated guardrail files.
- `npm.cmd test`: pass.
- `git diff --check`: pass with line-ending warnings only.

## Drift Scorecard

- PASS - correct branch and HEAD.
- PASS - correct program base.
- PASS - exact infrastructure candidate isolated.
- PASS - workflow commit separated and governance-only.
- PASS - original crash reproduced.
- PASS - live data shape inventory complete.
- PASS - array behavior preserved.
- PASS - object-with-`pairs` behavior supported.
- PASS - unknown shapes fail closed.
- PASS - diagnostic specificity preserved.
- PASS - White raw/generated/semantic data unchanged.
- PASS - all identity semantic/generated data unchanged.
- PASS - Simic display-source exception remains visible and unchanged.
- PASS - representative array-based candidates unchanged.
- PASS - monocolor object-with-`pairs` no longer causes structural crash.
- PASS - deterministic generation.
- PASS - required tests passed or had documented expected pre-remediation semantic exits.
- PASS - Table Talk baseline excluded.
- PASS - VM-518 not started.
- N/A - Contract v1.1 semantic approval for White; this review approves only shared validator infrastructure and does not authorize White Gate 1+2.

## Findings

No blocker findings.
No high findings.
No medium findings.
No low findings.

Non-blocking observation: the workflow-record governance diff duplicated the same candidate-scope-sensitive shape-inventory sentence twice in `docs/incidents/CRIT-001-drift-control-template.md`. This is documentation noise only; it does not affect the exact implementation candidate, validator behavior, White hold state, or approval decision.

## Decision

APPROVE EXACT SHA aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2

This approval does not authorize White Gate 1+2, remediation, generated rebuilds, White candidate creation, certification, program-base advancement, VM-518 work, or Excel updates. VM-517 must rerun drift preflight in a separate authorized window before Gate 1+2 can be reconsidered.

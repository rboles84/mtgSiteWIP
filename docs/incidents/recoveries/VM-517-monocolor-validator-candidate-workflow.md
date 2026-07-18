# VM-517 - Monocolor Validator Infrastructure Candidate Workflow

Status: Infrastructure candidate independently approved. White Gate 1+2 remains not authorized pending a separate drift-preflight rerun.

Implementation candidate SHA: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Implementation subject: `CRIT-001 support monocolor collision guidance validation`
Workflow-record SHA: `PENDING_VM517_MONOCOLOR_VALIDATOR_WORKFLOW_RECORD_SHA`
Independent review record: `docs/incidents/recoveries/VM-517-monocolor-validator-independent-review.md`
Independent review decision: `APPROVE EXACT SHA aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
White preflight SHA: `06627929eb0e048a8c0c20612970e779098a982c`
Program base: `272337004aa63cfd33da5f1a859c33d211c8ca74`
Certified identity count: 15

## Scope Boundary

This record documents a shared infrastructure candidate only. It does not approve the infrastructure candidate, does not perform independent review, does not authorize White Gate 1+2, does not authorize White remediation, does not create a White candidate, does not certify White, does not advance the CRIT-001 program base, does not start VM-518, and does not modify the external Excel tracker.

## Failure Reproduced

Before the implementation commit, both White candidate-scope probes exited 1 with an unhandled JavaScript TypeError:

- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W`
- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=06627929eb0e048a8c0c20612970e779098a982c --identity=W`

Error:

`TypeError: (placement.collision_guidance || []).entries is not a function or its return value is not iterable`

Crash site: `research/validate-semantic-candidate-scope.mjs`, `validateCollisionGuidancePreservation`, line 324 before the candidate.

White path and type: `data/raw-factions/white/white.placement.json#/collision_guidance`, object with keys `rule`, `review_triggers`, and `pairs`; `pairs` is an ordered array.

The failure occurred before normal candidate file-scope or semantic proof-chain adjudication.

## Shape Inventory

Repository-wide raw placement inspection found only documented shapes:

- Array at `#/collision_guidance`: ABZAN, WU, BANT, WR, BR, ESPER, BG, GRIXIS, RG, UB, UR, JESKAI, JUND, LOREHOLD, MARDU, NAYA, WB, PRISMARI, QUANDRIX, WG, SILVERQUILL, UG, SULTAI, TEMUR, WITHERBLOOM. Current validator support existed and is preserved.
- Object with ordered array at `#/collision_guidance/pairs`: B, U, COLORLESS, DUNE, GLINT, G, INK, R, W, WITCH, WUBRG, YORE. Current validator support was absent; candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` adds support.
- Missing, primitive, null, object without `pairs`, non-array `pairs`, and malformed pair elements: not found in current raw placement files and now fail closed in tests.

Representative explicit inventory:

| Identity | Cohort | File | JSON path | Runtime type | Keys | Pair element shape | Previous support | Candidate treatment |
|---|---|---|---|---|---|---|---|---|
| W | mono | `data/raw-factions/white/white.placement.json` | `#/collision_guidance` / `#/collision_guidance/pairs` | Object with `pairs` array | `rule`, `review_triggers`, `pairs` | `collision_id`, `against`, `separator`, `ask`, `lateral_inhibition`, `claim_ids` | No, crashed | Supported; metadata ignored as pair data |
| B, U, R, G | mono | `data/raw-factions/<color>/<color>.placement.json` | same | Object with `pairs` array | `rule`, `review_triggers`, `pairs` | same as White | No | Supported |
| WG | guild | `data/raw-factions/selesnya_conclave/selesnya_conclave.placement.json` | `#/collision_guidance` | Array | N/A | `collision_id`, `against`, `separator`, `ask`, `suppress_if`, `evidence_claim_ids`, optional `lateral_inhibition` | Yes | Unchanged |
| UG | guild | `data/raw-factions/simic_combine/simic_combine.placement.json` | `#/collision_guidance` | Array | N/A | `collision_id`, `against`, `separator`, `ask`, `suppress_if`, `evidence_claim_ids`, optional `lateral_inhibition` | Yes | Unchanged |
| LOREHOLD | college | `data/raw-factions/lorehold/lorehold.placement.json` | `#/collision_guidance` | Array | N/A | `collision_id`, `against`, `separator`, `ask`, `suppress_if`, `evidence_claim_ids`, optional `lateral_inhibition` | Yes | Unchanged |
| COLORLESS / WUBRG | endpoint | endpoint raw placement files | `#/collision_guidance/pairs` | Object with `pairs` array | object metadata plus `pairs` | includes `canonical_pair_key`, `crucible_candidate`, `placement_confusion_reproduced` on some pairs | No | Supported as ordered pairs only |

## Implementation Summary

Files in implementation candidate:

- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

The validator now normalizes only two schemas into ordered internal comparison entries:

- array entries at `#/collision_guidance/<index>`
- object-with-pairs entries at `#/collision_guidance/pairs/<index>`

The helper preserves source order and existing `collision_id` / `against` semantics. It does not flatten arbitrary objects, does not treat object metadata as collision pairs, and does not mutate parsed raw data.

Unsupported shapes fail closed with diagnostics containing identity, file, JSON path, observed type, supported shapes, and the reason validation cannot continue.

White raw and generated semantic data were not changed because the blocker was validator compatibility, not a White data authorization.

## Regression Matrix

| Command | Exit | Result |
|---|---:|---|
| `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=06627929eb0e048a8c0c20612970e779098a982c --identity=W` | 1 | No crash; deliberate pre-remediation semantic proof-chain errors for unclassified White claims. |
| `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG` | 0 | Existing Selesnya array candidate still passes. |
| `node research/validate-semantic-candidate-scope.mjs --base=de5e2e8344dcdfd6feb44e3731a0819f44142bb6 --target=8aea3e359c16687948178ad55a927cf758fd9206 --identity=WB` | 0 | Existing Orzhov array candidate still passes. |
| `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e --identity=UG` | 1 | Existing Simic display-source exception behavior remains visible: `data/identity-layers.json` non-identity path and unrelated/global `data/factions.json` content changed. |

## Validation

- `node research/semantic-candidate-scope-tests.js`: pass.
- `node research/audit-semantic-readiness.mjs --targets=W`: pass; W recognized, 8 claims remain unclassified.
- `node research/validate-semantic-readiness.mjs --targets=W`: expected exit 1 for pre-remediation White blockers; no candidate-scope crash.
- `npm.cmd run test:semantic-readiness`: pass.
- `npm.cmd run test:placement`: pass.
- `npm.cmd run test:faction-context-isolation`: pass.
- `npm.cmd run test:source-generated`: pass with existing JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test`: pass.
- `git diff --check`: pass with CRLF warnings only.
- Search for direct `collision_guidance` array assumptions: the only direct candidate-scope raw assumption was repaired; builder-owned normalization already supports object-with-pairs and generated collision guidance remains array-shaped.

## Drift Checkpoint

All infrastructure candidate checkpoint rows are PASS or N/A:

- PASS - exact crash reproduced.
- PASS - shape inventory complete.
- PASS - only documented shapes supported.
- PASS - existing array behavior preserved.
- PASS - object-with-pairs behavior supported.
- PASS - unknown shapes fail closed.
- PASS - diagnostics are precise.
- PASS - White data unchanged.
- PASS - all identity semantic/generated data unchanged.
- PASS - Simic display-source exception behavior unchanged.
- PASS - representative array-based candidates unchanged.
- PASS - candidate-scope tests pass.
- PASS - broader tests pass.
- PASS - no unrelated runtime or validator changes.
- PASS - deterministic results.
- PASS - Table Talk excluded from implementation commit.
- PASS - VM-518 untouched.
- N/A - JSON parse checks for changed JSON fixtures; no JSON fixtures changed in the implementation candidate.

## Required Next Step

Rerun the VM-517 White drift preflight in a separate authorized window.

The independent review approved exact infrastructure SHA `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`, but this does not authorize White Gate 1+2. Until the rerun drift preflight records no `FAIL` or `UNKNOWN` controls, White Gate 1+2 remains unauthorized.

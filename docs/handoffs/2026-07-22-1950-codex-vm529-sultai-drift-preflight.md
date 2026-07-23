# VM-529 Sultai Drift Preflight

## Agent Name

Codex

## Task Requested

Create the governance-only VM-529 Sultai drift preflight from exact VM-528 certification/program base `8e23ef467ec7f60daec746c14493173f96d9261c`, create branch/worktree `codex/vm-529-sultai-semantic-recovery` at `C:\dev\mtgSiteWIP-crit001-vm529-sultai`, move VM-529 to In Progress, and stop before Gate 1+2 semantic audit, evidence work, remediation, candidate creation, independent review, certification, VM-530, Excel, push, PR, merge, or original-main work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1433-codex-vm527-abzan-certification.md`
- `docs/handoffs/2026-07-22-1529-codex-vm528-temur-drift-preflight.md`
- `docs/handoffs/2026-07-22-1930-codex-vm528-temur-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-529-sultai-semantic-recovery.md`
- `docs/kanban/backlog/VM-530-mardu-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/reference/semantic-readiness-contract.md`
- `data/identity-layers.json` only as naming/color-order authority
- `data/raw-factions/sultai/sultai.placement.json` only as naming/color-order authority
- `research/semantic-candidate-scope-tests.js`

## Files Changed

- `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/kanban/backlog/VM-529-sultai-semantic-recovery.md` removed by move to in-progress

## What Changed

- Created branch `codex/vm-529-sultai-semantic-recovery`.
- Created worktree `C:\dev\mtgSiteWIP-crit001-vm529-sultai`.
- Verified starting HEAD exactly `8e23ef467ec7f60daec746c14493173f96d9261c`.
- Recorded VM-529 as drift-preflight-complete and Gate 1+2 next-authorized governance only.
- Moved the VM-529 card from Backlog to In Progress.
- Updated the handoff index, board, and CRIT ledger to reflect only the preflight milestone and actual current program base.

## Why It Changed

CRIT-001 drift control requires every new identity to receive a separate committed drift-preflight control record before Gate 1+2 semantic work begins. VM-528 Temur is certified at `8e23ef467ec7f60daec746c14493173f96d9261c`, Sultai is the next identity, and this record establishes exact branch/worktree, object-chain continuity, protected-worktree baselines, and governance state without changing semantic data.

## Pre-Flight Summary

Recent related work: VM-528 Temur is certified `semantically_ready` from exact approved candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc`; drift preflight `20c9413f39273bf76a11c4fdddb2163dd61c8037`, Gate 1+2 governance `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e`, candidate workflow `3e05170dde802a135182c80af641c72962ddcba8`, independent review `fc872d47d43f4338611a68f5dcc8b8293904af26`, and certification/program base `8e23ef467ec7f60daec746c14493173f96d9261c` remain distinct.

Current known risks: Sultai has not received Gate 1+2 semantic adjudication in this task. Existing raw/generated/readiness state is not certified for Sultai. DRIFT-017 has protected uncommitted prototype files. The long-running CRIT worktree has Table Talk baseline changes. Original main has unrelated dirty docs/audit/strategy baseline. Ignored Scryfall corpus and dependency directories exist in protected exact-test worktrees.

Relevant decisions already made: `SULTAI` is the canonical identity key for naming and governance. `BGU` is display/color-order metadata only and not a generated expression key, runtime alias, fixture key, public label, or lookup key. `GUB` and `UBG` are color-order permutations and remain metadata/query-only unless later Gate 1+2 authority changes that. No naming-authority contradiction was found for preflight naming.

Files recently changed: only the governance files listed in this handoff. No semantic/raw/generated/fixture/provenance candidate content changed.

What should not be touched: VM-528 certification content beyond required current-base governance references, VM-530 Mardu, Sultai semantic data, generated files, fixtures, provenance, validators/tests, package/lockfile/CI, parser, placement implementation, faction-context implementation, runtime implementation, schemas, generators, original main, protected worktrees, DRIFT-017 prototype, historical/debug/archive exclusions, VM-542/DRIFT-019 residuals, Table Talk baseline, Excel, push, merge, or PR.

## Setup Collision Results

- Local branch collision for `codex/vm-529-sultai-semantic-recovery`: none before creation.
- Remote branch collision for VM-529/Sultai/BGU terms: none in local remote-tracking refs.
- Worktree collision for `C:\dev\mtgSiteWIP-crit001-vm529-sultai`: path did not exist before creation and no registered worktree used it.
- Existing VM-529 work: no VM-529 drift preflight, Gate 1+2, candidate, review, or certification record found.
- Existing Sultai history: older non-CRIT Sultai VM-209 through VM-214, VM-236, VM-315, VM-333, and VM-336 records are preserved historical work, not VM-529 CRIT-001 candidate/review/certification objects.
- Later program-base supersession: no VM-529 or later certification/program-base commit found before this preflight; VM-530 remained backlog/not started.

## Exact Object and Ancestry Results

- VM-527 Abzan certification: `a1632337ebc91950b37d835ac404fba414f770c7`.
- VM-528 drift preflight: `20c9413f39273bf76a11c4fdddb2163dd61c8037`.
- VM-528 Gate 1+2 governance: `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e`.
- Exact VM-528 Temur candidate: `790fca923c504e32911e0be0eb44f7fdbcfb07dc`.
- VM-528 candidate workflow: `3e05170dde802a135182c80af641c72962ddcba8`.
- VM-528 independent review: `fc872d47d43f4338611a68f5dcc8b8293904af26`.
- VM-528 certification / current program base: `8e23ef467ec7f60daec746c14493173f96d9261c`.
- Direct parent chain verified:
  `a1632337ebc91950b37d835ac404fba414f770c7` -> `20c9413f39273bf76a11c4fdddb2163dd61c8037` -> `cc1eca1ac7ec3895f7d08a280bf9f13f9595356e` -> `790fca923c504e32911e0be0eb44f7fdbcfb07dc` -> `3e05170dde802a135182c80af641c72962ddcba8` -> `fc872d47d43f4338611a68f5dcc8b8293904af26` -> `8e23ef467ec7f60daec746c14493173f96d9261c`.

## Protected Worktree Results

- Original main `C:\dev\mtgSiteWIP`: inspected only; pre-existing unrelated dirty docs/audit/strategy baseline preserved.
- Long-running CRIT `C:\dev\mtgSiteWIP-crit001`: inspected only; Table Talk baseline remains `M docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs.
- VM-528 candidate worktree `C:\dev\mtgSiteWIP-crit001-vm528-temur`: clean and preserved.
- VM-528 independent review worktree `C:\dev\mtgSiteWIP-crit001-vm528-temur-independent-review`: clean and preserved.
- VM-528 certification worktree `C:\dev\mtgSiteWIP-crit001-vm528-temur-certification`: clean and preserved.
- VM-528 exact-test worktrees: preserved with ignored `data/scryfall/raw/oracle-cards.json` and `node_modules/` only.
- VM-527 review worktree: preserved with ignored `data/scryfall/raw/oracle-cards.json` and `node_modules/` only.
- VM-526 certification worktree: preserved; no line-ending mark was present at the checked path during this preflight.
- DRIFT-017 worktree: preserved with uncommitted `research/semantic-candidate-scope-tests.js` and `research/validate-semantic-candidate-scope.mjs`; contents were not read as evidence, executed, staged, reset, cleaned, copied, edited, or deleted.
- Historical/debug/archive exclusions: `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`, `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`, `assets/js/newindex-color-matrix.js`, and `assets/js/color-matrix-radar.js` remained untouched.

## Identity and Naming Authority

- Expected canonical identity: `SULTAI`, subject to later Gate 1+2 verification.
- Expected display color order: `BGU`, subject to later Gate 1+2 verification.
- Naming authority checked only as needed for governance: `data/identity-layers.json` has expression key `SULTAI`, routing color identity `BGU`, display code `SULTAI`, and aliases limited to `SULTAI`; `data/raw-factions/sultai/sultai.placement.json` records `SULTAI` as the live expression key and states BGU/permutations are metadata/query-only.
- Potential display-order permutations `BGU`, `GUB`, and `UBG` remain metadata/query-only for this preflight.
- Naming-authority contradiction: none found for preflight naming.

## Drift Scorecard

| Control | Drift Preflight |
|---|---|
| Correct branch and program base | PASS - branch `codex/vm-529-sultai-semantic-recovery`, starting HEAD `8e23ef467ec7f60daec746c14493173f96d9261c` |
| One identity active | PASS - VM-529 Sultai only; VM-530 remains untouched |
| Source hierarchy explicit | N/A - semantic source hierarchy is Gate 1+2 work; only naming authority was consulted |
| Generic color-pair overfit checked | N/A - no claim audit; BGU/permutations recorded as metadata/query-only |
| Required neighbors checked | N/A - Gate 1+2 not started |
| Claim roles complete | N/A - Gate 1+2 not started |
| Evidence scopes complete | N/A - Gate 1+2 not started |
| Discovery/support isolated | N/A - Gate 1+2 not started |
| Canonical IDs/hashes valid | N/A - Gate 1+2 not started |
| Exact fixture/provenance parity | N/A - Gate 1+2 not started |
| Frozen confidence/calibration intact | PASS - no semantic/generated changes |
| Native IDs intact | PASS - no semantic/generated changes |
| Lateral/collision targets intact | PASS - no semantic/generated changes |
| Public/recruiter copy aligned | N/A - Gate 1+2 not started |
| No unrelated identity drift | PASS |
| Deterministic generation | N/A - no generation run |
| Candidate scope passes exact SHA | N/A - no candidate exists |
| Superseded candidates recorded | N/A - no VM-529 candidate exists |
| Review uses exact candidate SHA | N/A - review not authorized |
| Certification uses exact approved SHA | N/A - certification not authorized |
| Governance-only workflow/review/certification commits | PASS - this preflight is governance-only |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched by Codex |

No `FAIL` or `UNKNOWN` controls were recorded.

## Decisions Made

- VM-529 is now In Progress only for the completed governance preflight.
- Gate 1+2 read-only semantic audit is the next authorized action after this preflight commit.
- No semantic remediation is authorized by this preflight.
- No Sultai candidate exists.
- No independent review or certification occurred.
- Internal self-reference for this preflight commit is `PENDING_VM529_DRIFT_PREFLIGHT_COMMIT_SHA`; do not create a second commit merely to replace it.

## Risks / Uncertainties

- Tracked governance cannot contain its own future commit SHA; the actual preflight commit SHA must be reported externally after commit creation.
- The external Excel tracker was explicitly left untouched.
- Sultai semantic readiness remains unaudited in this task.
- Future Gate 1+2 must not treat naming-authority checks or existing placement text as claim adjudication.

## Tests Run

- `git worktree list --porcelain` - inspected before and after worktree creation.
- `git branch --list '*vm-529*' '*sultai*' '*bgu*' 'codex/vm-529-sultai-semantic-recovery'` - no local collision before creation.
- `git branch -r --list '*vm-529*' '*sultai*' '*bgu*' '*/codex/vm-529-sultai-semantic-recovery'` - no local remote-tracking collision before creation.
- `Test-Path C:\dev\mtgSiteWIP-crit001-vm529-sultai` - false before creation.
- `git show -s --format='%H %P %s'` for VM-527 and VM-528 chain objects - direct parents verified.
- `git merge-base --is-ancestor` across each VM-528 chain edge - PASS.
- Protected-worktree `git status --short --branch` checks - preserved baselines as recorded above.
- `Select-String` naming checks for `SULTAI` / `BGU` / permutations - naming authority only.
- Pre-commit validation is recorded in the final task output and commit proof for this preflight.

## Not Touched

No Gate 1+2 semantic audit, Sultai evidence work, semantic remediation, source, claim, evidence, provenance ownership, fixture, generated semantic data, recruiter, runtime, validator, generator, schema, package, lockfile, CI, parser, placement implementation, faction-context implementation, independent review, certification, program-base advancement, VM-530 work, external Excel tracker, original-main edit, protected-worktree content, DRIFT-017 prototype, historical/debug/archive exclusion, VM-542/DRIFT-019 residual, Table Talk baseline, push, merge, or PR was touched.

## Follow-Up Recommendations

Resume this same branch and worktree for VM-529 Gate 1+2 read-only semantic audit from the preflight commit. The next task must verify Sultai source hierarchy, claim roles, evidence locations, frozen fields, fixture/provenance locators, preview/recruiter/generated consumers, candidate-scope-sensitive shapes, and required neighbor boundaries before any remediation.

## Next Suggested Agent

CRIT-001 semantic recovery agent for VM-529 Sultai Gate 1+2.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-22-1930-codex-vm528-temur-certification.md`

STOP — VM-529 SULTAI CANDIDATE NOT CREATED

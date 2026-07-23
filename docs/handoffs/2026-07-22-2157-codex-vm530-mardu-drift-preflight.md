# VM-530 Mardu Drift Preflight

## Agent Name

Codex

## Task Requested

Create the governance-only VM-530 Mardu drift preflight from exact VM-529 certification/program base `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`, create branch/worktree `codex/vm-530-mardu-semantic-recovery` at `C:\dev\mtgSiteWIP-crit001-vm530-mardu`, move VM-530 to In Progress, and stop before Gate 1+2 semantic audit, evidence work, remediation, candidate creation, independent review, certification, VM-531 Jeskai, Excel, push, PR, merge, or original-main work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1529-codex-vm528-temur-drift-preflight.md`
- `docs/handoffs/2026-07-22-1930-codex-vm528-temur-certification.md`
- `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- `docs/handoffs/2026-07-22-2144-codex-vm529-sultai-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/backlog/VM-531-jeskai-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/reference/semantic-readiness-contract.md`
- `data/identity-layers.json` only as naming/color-order authority
- `data/raw-factions/mardu/mardu.placement.json` only as naming/color-order authority
- `research/semantic-candidate-scope-tests.js`

## Files Changed

- `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/backlog/VM-530-mardu-semantic-recovery.md` removed by move to in-progress

## What Changed

- Created branch `codex/vm-530-mardu-semantic-recovery`.
- Created worktree `C:\dev\mtgSiteWIP-crit001-vm530-mardu`.
- Verified starting HEAD exactly `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`.
- Recorded VM-530 as drift-preflight-complete and Gate 1+2 next-authorized governance only.
- Moved the VM-530 card from Backlog to In Progress.
- Updated the handoff index, board, and CRIT ledger to reflect only the preflight milestone and actual current program base.

## Why It Changed

CRIT-001 drift control requires every new identity to receive a separate committed drift-preflight control record before Gate 1+2 semantic work begins. VM-529 Sultai is certified at `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`, Mardu is the next identity, and this record establishes exact branch/worktree, object-chain continuity, protected-worktree baselines, and governance state without changing semantic data.

## Pre-Flight Summary

Recent related work: VM-529 Sultai is certified `semantically_ready` from exact approved candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`; drift preflight `74b8153c124eb03d95a28ae2aac126c29f3c5db4`, Gate 1+2 governance `5c4e73360d99ed1cf5f3bae5bd9302773ae9e14e`, exact candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`, candidate workflow `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc`, independent review `2b469a61656bd2151f4c7e560421afc7c452887b`, and certification/program base `7970c14822ce006c0d88f95cc6ed01bb3c79b81f` remain distinct.

Current known risks: Mardu has not received Gate 1+2 semantic adjudication in this task. Existing raw/generated/readiness state is not certified for Mardu. DRIFT-017 has protected uncommitted prototype files. The long-running CRIT worktree has Table Talk baseline changes. Original main has unrelated dirty docs/audit/strategy baseline. Ignored Scryfall corpus and dependency directories exist in protected exact-test worktrees.

Relevant decisions already made: `MARDU` is the expected canonical identity key for naming and governance, subject to later Gate 1+2 verification. `RWB` is the committed display/color-order metadata recovered from `data/identity-layers.json`; `WBR` and `BRW` are color-order permutations and remain metadata/query-only unless later Gate 1+2 authority changes that. No naming-authority contradiction was found for preflight naming.

Files recently changed: only the governance files listed in this handoff. No semantic/raw/generated/fixture/provenance candidate content changed.

What should not be touched: VM-529 certification content beyond required current-base governance references, VM-531 Jeskai, Mardu semantic data, generated files, fixtures, provenance, validators/tests, package/lockfile/CI, parser, placement implementation, faction-context implementation, runtime implementation, schemas, generators, original main, protected worktrees, DRIFT-017 prototype, historical/debug/archive exclusions, VM-542/DRIFT-019 residuals, Table Talk baseline, Excel, push, merge, or PR.

## Setup Collision Results

- Local branch collision for `codex/vm-530-mardu-semantic-recovery`: none before creation.
- Remote branch collision for VM-530/Mardu/WBR/BRW/RWB terms: none in local remote-tracking refs.
- Worktree collision for `C:\dev\mtgSiteWIP-crit001-vm530-mardu`: path did not exist before creation and no registered worktree used it.
- Existing VM-530 work: no VM-530 drift preflight, Gate 1+2, candidate, review, or certification record found.
- Existing Mardu history: older non-CRIT Mardu VM-223 through VM-228, VM-235, VM-237, VM-238, VM-296, and VM-299 records are preserved historical work, not VM-530 CRIT-001 candidate/review/certification objects.
- Later program-base supersession: no VM-530 or later certification/program-base commit found before this preflight; VM-531 remained backlog/not started.

## Exact Object and Ancestry Results

- VM-528 Temur certification: `8e23ef467ec7f60daec746c14493173f96d9261c`.
- VM-529 drift preflight: `74b8153c124eb03d95a28ae2aac126c29f3c5db4`.
- VM-529 Gate 1+2 governance: `5c4e73360d99ed1cf5f3bae5bd9302773ae9e14e`.
- Exact VM-529 Sultai candidate: `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.
- VM-529 candidate workflow: `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc`.
- VM-529 independent review: `2b469a61656bd2151f4c7e560421afc7c452887b`.
- VM-529 certification / current program base: `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`.
- Direct parent chain verified:
  `8e23ef467ec7f60daec746c14493173f96d9261c` -> `74b8153c124eb03d95a28ae2aac126c29f3c5db4` -> `5c4e73360d99ed1cf5f3bae5bd9302773ae9e14e` -> `a92fb3f8a0ec4235d5148b20c4040bd717332ad6` -> `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc` -> `2b469a61656bd2151f4c7e560421afc7c452887b` -> `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`.

## Protected Worktree Results

- Original main `C:\dev\mtgSiteWIP`: inspected only; pre-existing unrelated dirty docs/audit/strategy baseline preserved.
- Long-running CRIT `C:\dev\mtgSiteWIP-crit001`: inspected only; Table Talk baseline remains `M docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs.
- VM-529 candidate worktree `C:\dev\mtgSiteWIP-crit001-vm529-sultai`: preserved and not modified.
- VM-529 independent review worktree `C:\dev\mtgSiteWIP-crit001-vm529-sultai-independent-review`: preserved and not modified.
- VM-529 certification worktree `C:\dev\mtgSiteWIP-crit001-vm529-sultai-certification`: preserved and not modified.
- VM-529 exact-test worktrees: preserved; ignored Scryfall corpus and dependency baselines were not staged or committed.
- VM-528 exact-test worktrees: preserved with ignored Scryfall corpus and dependency baselines.
- VM-526 certification line-ending baseline: preserved; no VM-526 content was read as Mardu authority or modified.
- DRIFT-017 worktree: preserved with uncommitted `research/semantic-candidate-scope-tests.js` and `research/validate-semantic-candidate-scope.mjs`; contents were not read as evidence, executed, staged, reset, cleaned, copied, edited, or deleted.
- Historical/debug/archive exclusions: `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`, `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`, `assets/js/newindex-color-matrix.js`, and `assets/js/color-matrix-radar.js` remained untouched.

## Identity and Naming Authority

- Expected canonical identity: `MARDU`, subject to later Gate 1+2 verification.
- Display color order: `RWB`, subject to later Gate 1+2 verification.
- Naming authority checked only as needed for governance: `data/identity-layers.json` has expression key `MARDU`, routing color identity `RWB`, display key `MARDU`, display name `Mardu Horde`, display colors `R`, `W`, `B`, and aliases limited to `MARDU`; `data/raw-factions/mardu/mardu.placement.json` confirms `mardu` / `Mardu Horde` naming.
- Potential display-order permutations `WBR`, `BRW`, and `RWB` remain metadata/query-only for this preflight.
- Naming-authority contradiction: none found for preflight naming.

## Drift Scorecard

| Control | Drift Preflight |
|---|---|
| Correct branch and program base | PASS - branch `codex/vm-530-mardu-semantic-recovery`, starting HEAD `7970c14822ce006c0d88f95cc6ed01bb3c79b81f` |
| One identity active | PASS - VM-530 Mardu only; VM-531 remains untouched |
| Source hierarchy explicit | N/A - semantic source hierarchy is Gate 1+2 work; only naming authority was consulted |
| Generic color-pair overfit checked | N/A - no claim audit; WBR/BRW/RWB permutations recorded as metadata/query-only |
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
| Superseded candidates recorded | N/A - no VM-530 candidate exists |
| Review uses exact candidate SHA | N/A - review not authorized |
| Certification uses exact approved SHA | N/A - certification not authorized |
| Governance-only workflow/review/certification commits | PASS - this preflight is governance-only |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched by Codex |

No `FAIL` or `UNKNOWN` controls were recorded.

## Decisions Made

- VM-530 is now In Progress only for the completed governance preflight.
- Gate 1+2 read-only semantic audit is the next authorized action after this preflight commit.
- No semantic remediation is authorized by this preflight.
- No Mardu candidate exists.
- No independent review or certification occurred.
- Internal self-reference for this preflight commit is `PENDING_VM530_DRIFT_PREFLIGHT_COMMIT_SHA`; do not create a second commit merely to replace it.

## Risks / Uncertainties

- Tracked governance cannot contain its own future commit SHA; the actual preflight commit SHA must be reported externally after commit creation.
- The external Excel tracker was explicitly left untouched.
- Mardu semantic readiness remains unaudited in this task.
- Future Gate 1+2 must not treat naming-authority checks or existing placement text as claim adjudication.

## Tests Run

- `git worktree list --porcelain` - inspected before and after worktree creation.
- `git branch --list '*vm-530*' '*mardu*' '*wbr*' '*brw*' '*rwb*'` - no local collision before creation.
- `git branch -r --list '*vm-530*' '*mardu*' '*wbr*' '*brw*' '*rwb*'` - no local remote-tracking collision before creation.
- `Test-Path C:\dev\mtgSiteWIP-crit001-vm530-mardu` - false before creation.
- `git rev-list --parents -n 1` for VM-529 chain objects - direct parents verified.
- Protected-worktree `git status --short --branch` checks - preserved baselines as recorded above.
- `node` naming checks for `MARDU` / `RWB` - naming authority only.
- Pre-commit validation is recorded in the final task output and commit proof for this preflight.

## Not Touched

No Gate 1+2 semantic audit, Mardu evidence work, semantic remediation, source, claim, evidence, provenance ownership, fixture, generated semantic data, recruiter, runtime, validator, generator, schema, package, lockfile, CI, parser, placement implementation, faction-context implementation, independent review, certification, program-base advancement, VM-531 work, external Excel tracker, original-main edit, protected-worktree content, DRIFT-017 prototype, historical/debug/archive exclusion, VM-542/DRIFT-019 residual, Table Talk baseline, push, merge, or PR was touched.

## Follow-Up Recommendations

Resume this same branch and worktree for VM-530 Gate 1+2 read-only semantic audit from the preflight commit. The next task must verify Mardu source hierarchy, claim roles, evidence locations, frozen fields, fixture/provenance locators, preview/recruiter/generated consumers, candidate-scope-sensitive shapes, and required neighbor boundaries before any remediation.

## Next Suggested Agent

CRIT-001 semantic recovery agent for VM-530 Mardu Gate 1+2.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-22-2144-codex-vm529-sultai-certification.md`

STOP — VM-530 MARDU CANDIDATE NOT CREATED

# VM-527 Abzan Drift Preflight

## Agent Name

Codex

## Task Requested

Start VM-527 Abzan only through the mandatory CRIT-001 pre-identity drift preflight from exact VM-526 Naya certification/program base `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`, create the dedicated branch/worktree, verify collision/protected-worktree controls, and do not begin Gate 1+2 semantic audit, remediation, candidate creation, independent review, certification, VM-528, Excel, push, merge, or PR work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-0007-codex-vm526-naya-candidate-workflow.md`
- `docs/handoffs/2026-07-22-0746-codex-vm526-naya-independent-review.md`
- `docs/handoffs/2026-07-22-0851-codex-vm526-naya-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/backlog/VM-528-temur-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-526-naya-semantic-recovery.md`
- DRIFT-020 handoffs and ledger/register authority
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`

## Files Changed

- `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/backlog/VM-527-abzan-semantic-recovery.md` removed by move to in-progress

## What Changed

- Created branch `codex/vm-527-abzan-semantic-recovery`.
- Created worktree `C:\dev\mtgSiteWIP-crit001-vm527-abzan`.
- Verified starting HEAD exactly `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`.
- Recorded VM-527 as preflight-complete and Gate 1+2-authorized governance only.
- Moved the VM-527 card from Backlog to In Progress.
- Updated the handoff index, board, and CRIT ledger to reflect only the preflight milestone.

## Why It Changed

CRIT-001 drift control requires every new identity to receive a separate committed drift-preflight control record before Gate 1+2 semantic work begins. VM-526 Naya is certified, Abzan is the next identity, and this record establishes the exact branch/worktree, source hierarchy, frozen-field inventory, fixture/provenance locators, alias behavior, and protected-worktree baselines without changing semantic data.

## Pre-Flight Summary

Recent related work: VM-526 Naya is certified `semantically_ready` from exact approved candidate `f3dda547eb91475cd3d00056463729d98a040e55`; superseded Naya candidate `57ce7161c1ff8736a8b91a6564fa97129fe38383`, workflow `cdcd1b408a64dacb63e75865c519ca317ce0e08a`, review `8afaa199d774d56845a305c4f879d275ada94a47`, and certification/program base `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` remain distinct. DRIFT-020 exact infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` remains certified and unchanged in the validator/test files at this base.

Current known risks: Abzan has unremediated Contract v1.1 blockers. Raw claims lack explicit semantic roles, no Abzan semantic fixture exists, generated/provenance proof chains cite unclassified claims, and Abzan-linked provenance has null canonical IDs. These are pre-remediation findings for Gate 1+2, not preflight drift.

Relevant decisions already made: `ABZAN` is the canonical identity key. `WBG` is display/color-order metadata only. `WBG`, `BGW`, and `GWB` are not validator identities and must fail closed. Historical/debug/archive exclusions remain excluded from active Abzan remediation unless future authority changes that classification.

Files recently changed: only the governance files listed in this handoff. No semantic/raw/generated/fixture/provenance candidate content changed.

What should not be touched: VM-526 semantic/certification content, DRIFT-020 implementation/tests, DRIFT-017 uncommitted prototype files, VM-528 Temur, original main, long-running CRIT/Table Talk dirt, historical/debug/archive exclusions, VM-542/DRIFT-019 residuals, Excel, package/lockfile/CI/parser/placement/faction-context/runtime/schema/generator implementation.

## Setup Collision Results

- Local branch collision for `codex/vm-527-abzan-semantic-recovery`: none before creation.
- Remote branch collision for `codex/vm-527-abzan-semantic-recovery`: `git ls-remote --heads origin codex/vm-527-abzan-semantic-recovery` returned no branch.
- Worktree collision for `C:\dev\mtgSiteWIP-crit001-vm527-abzan`: path did not exist before creation.
- Existing VM-527 work: no local or remote VM-527 branch, no worktree, and no VM-527 commit history found before creation.
- Existing Abzan candidate/review/certification: none found by exact VM-527/Abzan commit-log searches.

## Exact Object and Ancestry Results

- VM-525 Jund certification: `7964b93f531017e579f069e6941463f53eab4bd9`.
- VM-526 exact candidate: `f3dda547eb91475cd3d00056463729d98a040e55`.
- VM-526 candidate workflow: `cdcd1b408a64dacb63e75865c519ca317ce0e08a`.
- VM-526 independent review: `8afaa199d774d56845a305c4f879d275ada94a47`.
- VM-526 certification / current program base: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`.
- Ancestry checks passed for `7964b93f531017e579f069e6941463f53eab4bd9 -> f3dda547eb91475cd3d00056463729d98a040e55 -> cdcd1b408a64dacb63e75865c519ca317ce0e08a -> 8afaa199d774d56845a305c4f879d275ada94a47 -> 80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`.
- VM-526 certification directly descends from review `8afaa199d774d56845a305c4f879d275ada94a47`.
- No descendant of `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` exists on local refs, so no later commit supersedes or reverses VM-526 certification.
- Post-candidate VM-526 range `f3dda547eb91475cd3d00056463729d98a040e55..80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` changes governance/docs only.

## Protected Worktree Results

- Original main `C:\dev\mtgSiteWIP`: preserved; pre-existing dirty docs/audit/strategy baseline observed only.
- Long-running CRIT `C:\dev\mtgSiteWIP-crit001`: preserved; pre-existing Table Talk baseline remains `M docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs.
- VM-526 candidate worktree: preserved with existing line-ending/report/runtime modified marks.
- VM-526 certification worktree: registered worktree is clean at status check.
- VM-526 independent review worktree: preserved with existing audit report modified marks.
- DRIFT-017 worktree: preserved; status shows uncommitted `research/semantic-candidate-scope-tests.js` and `research/validate-semantic-candidate-scope.mjs`; contents were not read, copied, or executed.
- DRIFT-020 candidate/review/certification worktrees: preserved and clean by status checks.
- Detached Jund/Naya exact-test worktrees: preserved with their existing generated/provenance/audit modified marks.

## Identity and Alias Authority

- Confirmed canonical identity key: `ABZAN`.
- Confirmed display/color order: `WBG`.
- Repository authority: `data/identity-layers.json` states color-order permutations are metadata only, not expression keys or aliases; Abzan raw placement repeats that WBG and permutations are metadata/query-only.
- Candidate-scope result for `ABZAN` same-SHA probe: exit 1 with expected pre-remediation generated/provenance proof-chain contamination diagnostics because existing generated/provenance surfaces cite unclassified Abzan claims.
- `WBG`: rejected as `Unknown identity WBG`.
- `BGW`: rejected as `Unknown identity BGW`.
- `GWB`: rejected as `Unknown identity GWB`.
- `NOT_A_REAL_IDENTITY`: rejected as unknown identity.
- Candidate-scope regression suite: PASS.

## Abzan Baseline Inventory

- Raw packet files: `abzan.changelog.json`, `abzan.claims.json`, `abzan.placement.json`, `abzan.profile.json`, `abzan.sources.json`.
- Raw claim count: 11.
- Raw-file role fields: all 11 are unclassified by file shape because current raw claims lack Contract v1.1 role fields.
- Ledger structural role counts: 0 substantive, 0 discovery, 1 support, 10 unclassified.
- Sources: 20 total; 9 claim-bearing, 6 shaping-only, 5 support-only.
- Generated/provenance baseline: 39 Abzan-linked provenance entries, 15 null canonical IDs, 0 null content hashes by preflight scan.
- Fixture baseline: no `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`.
- Preview baseline: `data/identity-layers.json#/expressions/ABZAN/preview_text` exists; source preview and generated embedded preview must be checked in Gate 1+2 before any candidate.
- Placement baseline: live-pilot, placement-eligible, array-shaped `collision_guidance` with 2 entries.
- Profile baseline: runtime `live_pilot`, placement `placement_eligible`, preview eligible `false`.
- Recruiter baseline: generated ABZAN context exists and must be treated as a generated consumer in Gate 1+2.
- Generated-consumer inventory: `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, `data/semantic-readiness-provenance.json`, and `supabase/functions/guild-recruiter/faction-context.ts` contain active ABZAN surfaces.
- Historical/debug/archive exclusions: `outputs/mtgdata-v3-enhanced/*.inspect.ndjson`, `assets/js/newindex-color-matrix.js`, and `assets/js/color-matrix-radar.js` remain excluded and untouched.

## Frozen Fields and Required Neighbors for Gate 1+2

Frozen-field baseline to record in Gate 1+2: placement summary, `placement_quality`, `calibration_tuning`, `color_identity`, `collision_guidance` array shape and ordering, live-pilot status, preview eligibility, native IDs, lateral/collision targets, generated placement fields, recruiter context, scoring/ranking/calibration fields, and preview source/embedded equality.

Initial required-neighbor set for audit: `MARDU`, `SULTAI`, `DROMOKA`/Dromoka brood boundary, generic `WBG`, generic graveyard/toughness/defense mechanics, Commander product identity, `ORZHOV`, `GOLGARI`, `SELESNYA`, `BANT`, `JUND`, `NAYA`, and other Tarkir clan boundaries as evidence warrants. Gate 1+2 must narrow the exact discriminator/exclusion set.

## Drift Scorecard

| Control | Gate 1+2 Preflight |
|---|---|
| Correct branch and program base | PASS - branch `codex/vm-527-abzan-semantic-recovery`, HEAD `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` |
| One identity active | PASS - VM-527 Abzan only; VM-528 remains untouched |
| Source hierarchy explicit | PASS - raw packet, local ledgers, official Tarkir/Wizards captures, shaping-only, support-only, and excluded sources inventoried |
| Generic color-pair overfit checked | PASS - WBG and permutations are metadata/query-only and alias probes fail closed |
| Required neighbors checked | PASS - initial neighbor/boundary set declared for Gate 1+2 refinement |
| Claim roles complete | N/A - known pre-remediation Gate 1+2 work; no semantic adjudication in preflight |
| Evidence scopes complete | N/A - Gate 1+2 semantic audit required |
| Discovery/support isolated | N/A - support-only sources and Commander rows inventoried for Gate 1+2 |
| Canonical IDs/hashes valid | N/A - 15 null Abzan-linked provenance canonical IDs identified as Gate 1+2/Gate 3 blocker candidates |
| Exact fixture/provenance parity | N/A - Abzan fixture absent |
| Frozen confidence/calibration intact | PASS - preflight made no semantic/generated changes |
| Native IDs intact | PASS - preflight made no semantic/generated changes |
| Lateral/collision targets intact | PASS - preflight made no semantic/generated changes |
| Public/recruiter copy aligned | N/A - active consumers inventoried for Gate 1+2 |
| No unrelated identity drift | PASS |
| Deterministic generation | N/A - no generation run in preflight |
| Candidate scope passes exact SHA | N/A - no candidate exists; canonical same-SHA probe intentionally exposes pre-remediation unclassified proof-chain diagnostics |
| Superseded candidates recorded | N/A - no VM-527 candidate exists |
| Review uses exact candidate SHA | N/A - review not authorized |
| Certification uses exact approved SHA | N/A - certification not authorized |
| Governance-only workflow/review/certification commits | PASS - this preflight is governance-only |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel external tracker not edited; repository says VM-527 was not started before this preflight |

No `FAIL` or `UNKNOWN` controls were recorded.

## Decisions Made

- Gate 1+2 read-only audit is authorized after this preflight commit.
- No semantic remediation is authorized by this preflight alone.
- `ABZAN` must be used as the candidate-scope identity key.
- `WBG`, `BGW`, and `GWB` must remain invalid aliases unless later committed authority explicitly changes this.
- The Abzan raw-file and ledger role-count mismatch is preserved for Gate 1+2 adjudication.

## Risks / Uncertainties

- Existing Abzan generated/provenance surfaces cite unclassified claims and will fail semantic validation until Gate 3+4 remediation.
- Abzan has no semantic fixture.
- Abzan-linked provenance has null canonical IDs.
- The raw-file role count and ledger structural role count differ because the raw claims lack explicit role fields while the generated ledger structurally classifies one support record.
- The registered VM-526 certification worktree is clean even though the user prompt expected a line-ending-only modified `data/semantic-readiness-provenance.json`; detached Naya exact-test trees do show line-ending/generated modified marks and were preserved.

## Tests Run

- `git worktree list --porcelain` - inspected.
- `git ls-remote --heads origin codex/vm-527-abzan-semantic-recovery` - no remote branch.
- `git merge-base --is-ancestor` ancestry checks across VM-525 certification, VM-526 candidate, workflow, review, and certification - PASS.
- `git diff --name-status f3dda547eb91475cd3d00056463729d98a040e55..80b34dcda7db51d08f77f862f4eafb5cf3cabeaa` - governance/docs only.
- `git log --all --oneline --grep='VM-527'` and Abzan candidate/review/certification searches - no existing VM-527 work found.
- `git diff --name-status 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa..80b34dcda7db51d08f77f862f4eafb5cf3cabeaa -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` - no validator/test drift.
- `node research\validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --identity=ABZAN` - exit 1 with expected pre-remediation unclassified proof-chain diagnostics.
- `node research\validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --identity=WBG` - expected unknown identity.
- `node research\validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --identity=BGW` - expected unknown identity.
- `node research\validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --identity=GWB` - expected unknown identity.
- `node research\validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --identity=NOT_A_REAL_IDENTITY` - expected unknown identity.
- `node research\semantic-candidate-scope-tests.js` - PASS.

## Not Touched

No Gate 1+2 semantic audit, Abzan semantic remediation, raw/source semantic edit, generated output, fixture, provenance candidate content, validator/test implementation, package, lockfile, CI, parser, placement implementation, faction-context implementation, runtime implementation, schema, generator, independent review, certification, program-base advancement, external Excel tracker, original main, protected worktree content, VM-526 content, DRIFT-020 implementation, DRIFT-017 prototype, historical/debug/archive exclusion, VM-542/DRIFT-019 residual, Table Talk baseline, VM-528 Temur, push, merge, or PR was touched.

## Follow-Up Recommendations

Proceed to VM-527 Gate 1+2 read-only semantic audit from this preflight commit. The next audit must adjudicate all 11 claims, verify source support and evidence locations, capture frozen fields, determine exact neighbors, classify preview/recruiter/generated consumers, and end with an explicit Gate 2 disposition before any remediation.

## Next Suggested Agent

CRIT-001 semantic recovery agent for VM-527 Abzan Gate 1+2.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-22-0851-codex-vm526-naya-certification.md`

PASS - ABZAN GATE 1+2 AUTHORIZED

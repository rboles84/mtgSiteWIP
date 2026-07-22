# VM-528 Temur Drift Preflight

## Agent Name

Codex

## Task Requested

Begin VM-528 Temur semantic recovery from exact VM-527 certification/program base `a1632337ebc91950b37d835ac404fba414f770c7`, create branch/worktree `codex/vm-528-temur-semantic-recovery` at `C:\dev\mtgSiteWIP-crit001-vm528-temur`, run the mandatory CRIT-001 drift-preflight controls, and do not begin semantic audit, remediation, candidate creation, independent review, certification, Excel update, VM-529, push, PR, merge, or original-main work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1433-codex-vm527-abzan-certification.md`
- `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- Temur historical handoffs VM-203, VM-204, VM-206, VM-207, and VM-208
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-528-temur-semantic-recovery.md`
- `docs/kanban/backlog/VM-529-sultai-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/raw-factions/temur/temur.sources.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

## Files Changed

- `docs/handoffs/2026-07-22-1529-codex-vm528-temur-drift-preflight.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/kanban/backlog/VM-528-temur-semantic-recovery.md` removed by move to in-progress

## What Changed

- Created branch `codex/vm-528-temur-semantic-recovery`.
- Created worktree `C:\dev\mtgSiteWIP-crit001-vm528-temur`.
- Verified starting HEAD exactly `a1632337ebc91950b37d835ac404fba414f770c7`.
- Recorded VM-528 as drift-preflight-complete and Gate 1+2-authorized governance only.
- Moved the VM-528 card from Backlog to In Progress.
- Updated the handoff index, board, and CRIT ledger to reflect only the preflight milestone.

## Why It Changed

CRIT-001 drift control requires every new identity to receive a separate committed drift-preflight control record before Gate 1+2 semantic work begins. VM-527 Abzan is certified, Temur is the next identity, and this record establishes exact branch/worktree, source hierarchy, frozen-field inventory, fixture/provenance locators, alias behavior, and protected-worktree baselines without changing semantic data.

## Pre-Flight Summary

Recent related work: VM-527 Abzan is certified `semantically_ready` from exact approved candidate `11c099b8beb9f23e23660787f00b97e89914d50b`; Gate 3+4 workflow `a0e37d20edf43412d8e17d02104479a6fc0938c4`, Gate 5 workflow `71bf962c653a7b03b48bb05fca8661cdc3af2daa`, independent review `70193840cf8ef55d98ef63552bcf0cf56d736d07`, and certification/program base `a1632337ebc91950b37d835ac404fba414f770c7` remain distinct. DRIFT-020 exact infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` remains certified and unchanged in validator/test files at this base.

Current known risks: Temur has unremediated Contract v1.1 blockers. Raw claims lack explicit semantic roles, no Temur semantic fixture exists, generated/provenance proof chains cite unclassified claims, recruiter guidance lacks evidence mapping, and Temur-linked provenance has 15 null canonical IDs. These are pre-remediation findings for Gate 1+2, not preflight drift.

Relevant decisions already made: `TEMUR` is the canonical identity key. `GUR` is color-direction/query metadata only. `GUR`, `URG`, and `RGU` are not validator identities and must fail closed. Historical/debug/archive exclusions remain excluded from active Temur remediation unless future authority changes that classification.

Files recently changed: only the governance files listed in this handoff. No semantic/raw/generated/fixture/provenance candidate content changed.

What should not be touched: VM-527 semantic/certification content, DRIFT-020 implementation/tests, DRIFT-017 uncommitted prototype files, VM-529 Sultai, original main, long-running CRIT/Table Talk dirt, historical/debug/archive exclusions, VM-542/DRIFT-019 residuals, Excel, package/lockfile/CI/parser/placement/faction-context/runtime/schema/generator implementation.

## Setup Collision Results

- Local branch collision for `codex/vm-528-temur-semantic-recovery`: none before creation.
- Worktree collision for `C:\dev\mtgSiteWIP-crit001-vm528-temur`: path did not exist before creation.
- Existing VM-528 work: no local VM-528/Temur/GUR branch or worktree found before creation.
- Existing VM-528 candidate/review/certification: none found in tracked governance at the starting base.
- VM-529 Sultai remained backlog/not started and untouched.

## Exact Object and Ancestry Results

- VM-526 Naya certification: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`.
- VM-527 exact candidate: `11c099b8beb9f23e23660787f00b97e89914d50b`.
- VM-527 Gate 3+4 workflow: `a0e37d20edf43412d8e17d02104479a6fc0938c4`.
- VM-527 Gate 5 workflow: `71bf962c653a7b03b48bb05fca8661cdc3af2daa`.
- VM-527 independent review: `70193840cf8ef55d98ef63552bcf0cf56d736d07`.
- VM-527 certification / current program base: `a1632337ebc91950b37d835ac404fba414f770c7`.
- Ancestry checks passed for `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa -> 11c099b8beb9f23e23660787f00b97e89914d50b -> a0e37d20edf43412d8e17d02104479a6fc0938c4 -> 71bf962c653a7b03b48bb05fca8661cdc3af2daa -> 70193840cf8ef55d98ef63552bcf0cf56d736d07 -> a1632337ebc91950b37d835ac404fba414f770c7`.
- VM-527 certification directly descends from review `70193840cf8ef55d98ef63552bcf0cf56d736d07`.
- Post-candidate VM-527 range `11c099b8beb9f23e23660787f00b97e89914d50b..a1632337ebc91950b37d835ac404fba414f770c7` changes governance/docs only.

## Protected Worktree Results

- Original main `C:\dev\mtgSiteWIP`: preserved; pre-existing dirty docs/audit/strategy baseline observed only.
- Long-running CRIT `C:\dev\mtgSiteWIP-crit001`: preserved; pre-existing Table Talk baseline remains `M docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs.
- VM-527 candidate worktree: preserved and clean.
- VM-527 independent review worktree: preserved with ignored Scryfall corpus and `node_modules/` only.
- VM-527 certification worktree: preserved and clean.
- VM-526 certification worktree: preserved and clean at status check.
- DRIFT-017 worktree: preserved with uncommitted `research/semantic-candidate-scope-tests.js` and `research/validate-semantic-candidate-scope.mjs`; contents were not changed.
- DRIFT-020 review/certification worktrees: preserved and clean.
- Detached exact-test worktree `C:\Users\obake\AppData\Local\Temp\a527c`: preserved with existing generated/provenance/audit modified marks and ignored corpus/dependencies.

## Identity and Alias Authority

- Confirmed canonical identity key: `TEMUR`.
- Confirmed display/color order metadata: `GUR`.
- Repository authority: `data/identity-layers.json` states color-order permutations remain metadata only, not expression keys or aliases; Temur raw placement repeats that `GUR` and permutations are metadata/query-only.
- Candidate-scope result for `TEMUR` same-SHA probe: exit 1 with expected pre-remediation generated/provenance proof-chain contamination diagnostics because existing generated/provenance surfaces cite unclassified Temur claims.
- `GUR`: rejected as `Unknown identity GUR`.
- `URG`: rejected as `Unknown identity URG`.
- `RGU`: rejected as `Unknown identity RGU`.
- Candidate-scope regression suite: PASS.

## Temur Baseline Inventory

- Raw packet files: `temur.changelog.json`, `temur.claims.json`, `temur.placement.json`, `temur.profile.json`, `temur.sources.json`.
- Raw claim count: 11.
- Audit role counts: 0 substantive, 0 discovery, 1 support, 10 unclassified.
- Sources: 21 total; 9 claim-bearing, 8 shaping-only, 4 support-only.
- Generated/provenance baseline: 30 Temur-linked provenance entries, 15 null canonical IDs, 0 null content hashes.
- Fixture baseline: no `research/fixtures/semantic-readiness/temur.semantic-fixtures.json`.
- Preview baseline: `data/identity-layers.json#/expressions/TEMUR/preview_text` exists; source preview and generated embedded preview must be checked in Gate 1+2 before any candidate.
- Placement baseline: live-pilot, placement-eligible, array-shaped `collision_guidance` with 3 entries: `SULTAI`, `MARDU`, and `JESKAI`.
- Generated lateral targets: `RG`, `UG`, `UR`, `NAYA`, `BANT`, `GRIXIS`, `JUND`, `ABZAN`, `SULTAI`, `MARDU`, `JESKAI`.
- Recruiter baseline: generated TEMUR context exists and must be treated as a generated consumer in Gate 1+2.
- Historical/debug/archive exclusions: `outputs/mtgdata-v3-enhanced/*.inspect.ndjson`, `assets/js/newindex-color-matrix.js`, and `assets/js/color-matrix-radar.js` remain excluded and untouched.

## Frozen Fields and Required Neighbors for Gate 1+2

Frozen-field baseline to record in Gate 1+2: identity key `TEMUR`, raw slug `temur`, color metadata `GUR`, `placement_eligible: true`, `live_pilot: true`, `manual_review_recommended: true`, `review_gated: false`, preview eligibility, native IDs, placement summary, `placement_quality`, `calibration_tuning.status: vm208_live_pilot`, required positive terms, suppress/strengthen lists, collision guidance shape/order, lateral targets, generated placement fields, recruiter context, scoring/ranking/calibration fields, and preview source/embedded equality.

Initial required-neighbor set for audit: `SULTAI`, `MARDU`, `JESKAI`, `NAYA`, `BANT`, `GRIXIS`, `JUND`, `ABZAN`, `RG`, `UG`, `UR`, generic `GUR`, generic dragon/ramp/copy/energy/artifact/counter/X-spell play, Atarka Clan continuity, Commander product identity, seed files, and Dragonstorm-to-Khans backfill. Gate 1+2 must narrow the exact discriminator/exclusion set.

## Drift Scorecard

| Control | Gate 1+2 Preflight |
|---|---|
| Correct branch and program base | PASS - branch `codex/vm-528-temur-semantic-recovery`, HEAD `a1632337ebc91950b37d835ac404fba414f770c7` |
| One identity active | PASS - VM-528 Temur only; VM-529 remains untouched |
| Source hierarchy explicit | PASS - raw packet, local ledgers, official Tarkir/Wizards captures, shaping-only, support-only, and excluded sources inventoried |
| Generic color-pair overfit checked | PASS - GUR and permutations are metadata/query-only and alias probes fail closed |
| Required neighbors checked | PASS - initial neighbor/boundary set declared for Gate 1+2 refinement |
| Claim roles complete | N/A - known pre-remediation Gate 1+2 work; no semantic adjudication in preflight |
| Evidence scopes complete | N/A - Gate 1+2 semantic audit required |
| Discovery/support isolated | N/A - support-only sources and Commander rows inventoried for Gate 1+2 |
| Canonical IDs/hashes valid | N/A - 15 null Temur-linked provenance canonical IDs identified as Gate 1+2/Gate 3 blocker candidates |
| Exact fixture/provenance parity | N/A - Temur fixture absent |
| Frozen confidence/calibration intact | PASS - preflight made no semantic/generated changes |
| Native IDs intact | PASS - preflight made no semantic/generated changes |
| Lateral/collision targets intact | PASS - preflight made no semantic/generated changes |
| Public/recruiter copy aligned | N/A - active consumers inventoried for Gate 1+2 |
| No unrelated identity drift | PASS |
| Deterministic generation | N/A - no generation run in preflight |
| Candidate scope passes exact SHA | N/A - no candidate exists; canonical same-SHA probe intentionally exposes pre-remediation unclassified proof-chain diagnostics |
| Superseded candidates recorded | N/A - no VM-528 candidate exists |
| Review uses exact candidate SHA | N/A - review not authorized |
| Certification uses exact approved SHA | N/A - certification not authorized |
| Governance-only workflow/review/certification commits | PASS - this preflight is governance-only |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel external tracker not edited; repository says VM-528 was not started before this preflight |

No `FAIL` or `UNKNOWN` controls were recorded.

## Decisions Made

- Gate 1+2 read-only audit is authorized after this preflight commit.
- No semantic remediation is authorized by this preflight alone.
- `TEMUR` must be used as the candidate-scope identity key.
- `GUR`, `URG`, and `RGU` must remain invalid aliases unless later committed authority explicitly changes this.
- The Temur raw-file and ledger role-count mismatch is preserved for Gate 1+2 adjudication.

## Risks / Uncertainties

- Existing Temur generated/provenance surfaces cite unclassified claims and will fail semantic validation until Gate 3+4 remediation.
- Temur has no semantic fixture.
- Temur-linked provenance has 15 null canonical IDs.
- The inherited TEMUR model-owned inhibitor warning remains non-blocking in source/generated guardrails.
- Existing diagnostics are failing by design until remediation occurs; future Gate 1+2 must not treat stale failures as certification evidence.

## Tests Run

- `git worktree list --porcelain` - inspected.
- `git branch --all --list '*vm-528*' '*temur*' '*gur*'` - no branch collision before creation.
- `Test-Path C:\dev\mtgSiteWIP-crit001-vm528-temur` - false before creation.
- `git merge-base --is-ancestor` ancestry checks across VM-526 certification, VM-527 candidate, workflow, review, and certification - PASS.
- `git diff --name-status 11c099b8beb9f23e23660787f00b97e89914d50b..a1632337ebc91950b37d835ac404fba414f770c7` - governance/docs only.
- `git diff --name-status 665d2b128f3aab8daf5d48d4fdab244a9fb33c2e..a1632337ebc91950b37d835ac404fba414f770c7 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` - no validator/test drift.
- `node research\validate-semantic-candidate-scope.mjs --base=a1632337ebc91950b37d835ac404fba414f770c7 --target=a1632337ebc91950b37d835ac404fba414f770c7 --identity=TEMUR` - exit 1 with expected pre-remediation unclassified proof-chain diagnostics.
- Same exact range with `--identity=GUR` - expected unknown identity.
- Same exact range with `--identity=URG` - expected unknown identity.
- Same exact range with `--identity=RGU` - expected unknown identity.
- `node research\semantic-candidate-scope-tests.js` - PASS.
- `node research\audit-semantic-readiness.mjs --targets=TEMUR` - exit 0; reported 11 claims, 0 substantive, 0 discovery, 1 support, 10 unclassified, 21 sources, and no missing references.
- `node research\validate-semantic-readiness.mjs --targets=TEMUR` - exit 1 as expected pre-remediation.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=TEMUR` - exit 1 as expected pre-remediation, including missing fixture.
- `node research\validate-source-generated-guardrails.mjs --targets=TEMUR` - PASS with one non-blocking model-owned inhibitor warning.
- JSON parse/hash/provenance baseline checks - PASS.

## Not Touched

No Gate 1+2 semantic audit, Temur semantic remediation, raw/source semantic edit, generated output, fixture, provenance candidate content, validator/test implementation, package, lockfile, CI, parser, placement implementation, faction-context implementation, runtime implementation, schema, generator, independent review, certification, program-base advancement, external Excel tracker, original main, protected worktree content, VM-527 content, DRIFT-020 implementation, DRIFT-017 prototype, historical/debug/archive exclusion, VM-542/DRIFT-019 residual, Table Talk baseline, VM-529 Sultai, push, merge, or PR was touched.

## Follow-Up Recommendations

Proceed to VM-528 Gate 1+2 read-only semantic audit from this preflight commit. The next audit must adjudicate all 11 claims, verify source support and evidence locations, capture frozen fields, determine exact neighbors, classify preview/recruiter/generated consumers, and end with an explicit Gate 2 disposition before any remediation.

## Next Suggested Agent

CRIT-001 semantic recovery agent for VM-528 Temur Gate 1+2.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-22-1433-codex-vm527-abzan-certification.md`

PASS - TEMUR GATE 1+2 AUTHORIZED
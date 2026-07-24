# VM-534 Dune Gate 1+2 Handoff

## Agent Name

Codex

## Task Requested

Begin official VM-534 Dune semantic recovery from local program base `ab3ece2155d52c0f4283a0c0244c601a0991f970`, create the dedicated branch/worktree, perform read-only Gate 1+2 audit and evidence-bound remediation planning for DUNE only, and commit governance before semantic edits.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-534-dune-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- Recent VM-532 Yore and VM-533 Glint handoffs listed in `docs/handoffs/HANDOFF_INDEX.md`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `data/semantic-readiness-provenance.json`
- `research/semantic-readiness-lib.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/build-semantic-readiness-provenance.mjs`
- `research/fixtures/semantic-readiness/glint.semantic-fixtures.json`
- `research/fixtures/semantic-readiness/yore.semantic-fixtures.json`

## Files Changed

- `docs/handoffs/2026-07-23-2323-codex-vm534-dune-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-534-dune-semantic-recovery.md`
- `docs/kanban/backlog/VM-534-dune-semantic-recovery.md` moved to in-progress

## What Changed

Recorded VM-534 Gate 1+2 governance only. DUNE moved from backlog to in progress for the official CRIT-001 semantic recovery workflow. No Dune raw semantic data, generated data, fixture, provenance source, recruiter context, validator, test, package, preview, identity-layer, VM-535 Ink, VM-536 Witch, VM-537 Colorless, VM-538 WUBRG, Excel, GitHub remote, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation changed.

## Why It Changed

VM-533 Glint is certified at local program-base commit `ab3ece2155d52c0f4283a0c0244c601a0991f970`, and the user authorized VM-534 official candidate workflow work. Gate 1+2 established the current DUNE baseline, defects, frozen fields, fixture/provenance locators, and candidate scope before any semantic edit.

## Program And Worktree Proof

- Control repository: `C:\dev\mtgSiteWIP`
- Program-base branch: `codex/crit001-program-base`
- Program-base proof before worktree creation: `ab3ece2155d52c0f4283a0c0244c601a0991f970`
- Required commit exists locally: PASS
- Canonical program-base branch attached worktree: none
- VM-534 branch collision: none
- VM-534 worktree path collision: none
- Official branch: `codex/vm-534-dune-semantic-recovery`
- Official worktree: `C:\dev\mtgSiteWIP-crit001-vm534-dune`
- Worktree starting HEAD: `ab3ece2155d52c0f4283a0c0244c601a0991f970`
- Protected worktrees: preserved
- Post-base VM-534 commits before Gate creation: none

## Current Dune Baseline

- Ticket: VM-534
- Canonical key: `DUNE`
- Display name: `Dune / Aggression`
- Display color order: `BRGW`
- Accepted alias list: `DUNE` only
- Metadata/query-only permutations: all 24 BRGW same-color permutations, uppercase and lowercase, retained as metadata/query-only and not accepted as candidate identities
- Raw packet: `data/raw-factions/dune/`
- Cohort: four-color
- Missing color: Blue
- Preview: raw profile/search metadata `preview_eligible: false`; generated identity-layer preview exists for `DUNE` and source/embedded generated preview text is equal
- Neighbor and collision records: GLINT and INK in raw collision guidance
- Recruiter context: generated consumer exists for DUNE and is relevant only for isolation/validation

## Source Inventory

- Sources: 14 total
- Claim-bearing: 3
- Shaping-only: 5
- Discovery-only: 1
- Support-only: 5
- Claim-bearing source IDs: `src_vm_dune_evidence_ledger_20260603`, `src_vm_dune_vm252_scope_card_20260603`, `src_vm_four_color_reference_audit_20260603`
- Shaping-only source IDs: `src_vm_dune_source_ledger_20260603`, `src_vm257_dune_runtime_promotion_20260603`, `src_vm_dune_identity_md_20260603`, `src_vm_dune_metaphysics_md_20260603`, `src_vm_dune_manual_fill_20260603`
- Discovery-only source ID: `src_vm_dune_brood_research_packet_html_20260603`
- Support-only source IDs: `src_vm_four_color_identity_dossier_md_20260603`, `src_vm_dune_commander_deck_list_20260603`, `src_vm_commander_recommendations_saskia_20260603`, `src_vm_dune_precons_source_json_20260603`, `src_vm_dune_precon_catalog_json_20260603`

## Initial Semantic State

- Claims: 5 total
- Substantive: 0
- Discovery: 0
- Support: 0
- Unclassified: 5
- Fixture file: missing
- Provenance rows: 9 DUNE rows
- Null canonical IDs: 4
- Missing canonical hashes: 0
- Baseline semantic readiness: FAIL as expected because claims lack semantic roles, recruiter mismatch strings lack evidence mapping, fixtures are missing, and collision chains include non-DUNE neighbor claims from GLINT and INK.
- Baseline provenance check: FAIL as stale before remediation.
- Baseline readiness audit fingerprint: `low-volume-pattern`, `support-heavy-pattern`, `invalid-reference-pattern`.

## Gate 1+2 Findings

- DUNE has enough local evidence for bounded remediation of the existing five-claim floor, but not for broad lore, card-fact, Commander legality, recommendation, or metagame expansion.
- All five claims should become `substantive_claim` with bounded `evidence_locations` and complete source parity.
- VM-257 remains lifecycle/live-state metadata only and must not be used as lore, mechanics, discriminator, placement-axis, or Commander proof.
- Support-only Commander, Saskia, Open Hostility, precon, decklist, and recommendation rows must remain auxiliary support and outside authoritative proof chains.
- Discovery-only unmanaged HTML remains discovery-only and cannot support authoritative claims or fixtures.
- Collision guidance must become DUNE-owned for candidate scope; GLINT is certified and INK is not started, but DUNE-owned authoritative chains must not depend on neighbor claim IDs.
- Missing-Blue boundary must be explicit. Blue/detached contemplation/modeling/distance is the excluded-color boundary, while DUNE positive identity is organized territorial pressure, direct action, common-front force, White line, Black cost, Red ignition, and Green persistence.
- Required boundary checks should include GLINT, INK, Jund, Naya, Mardu, Abzan, the BR/GW/WB/WR/BG/RG pair family, generic BRGW, generic four-color Commander, generic combat, generic tokens/go-wide, Saskia-only, Open Hostility-only, Dune-Brood/Nephilim-only, Commander legality, official-name/alias overclaim, and Blue-present collapse.

## Frozen Placement And Scope Baseline

- Placement confidence/scoring/calibration fields are frozen unless explicitly required by candidate-scope-safe DUNE-local evidence repair.
- `calibration_tuning.status`: `source_authored_live_repair`
- `required_positive_min_hits`: `2`
- `broad_match_penalty`: `0.12`
- Raw collision pairs: `collision_dune_glint_four_color_ring`, `collision_dune_ink_four_color_ring`
- `lateral_inhibition`: `false` on both four-color collision pairs
- No Hall, Crucible, scoring, confidence, schedule, tie-order, package, schema, validator, parser, placement implementation, or runtime behavior change is authorized.

## Candidate Scope Expected

Expected candidate paths are DUNE-local and generated-by-tooling only:

- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/dune.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts` only if repository generation changes the DUNE owned consumer
- `data/identity-layers.json` only if preview-source repair is proven necessary and DUNE-only under DRIFT-020; current Gate 1+2 does not require a preview-source edit

## Drift Scorecard

| Control | Gate 1+2 |
|---|---|
| Correct branch and program base | PASS |
| One identity active | PASS |
| Source hierarchy explicit | PASS |
| Generic color-pair overfit checked | PASS |
| Required neighbors checked | PASS |
| Claim roles complete | PASS for audit disposition; remediation required |
| Evidence scopes complete | PASS for audit disposition; remediation required |
| Discovery/support isolated | PASS for audit disposition; remediation required |
| Canonical IDs/hashes valid | PASS for audit disposition; remediation required for 4 null IDs |
| Exact fixture/provenance parity | PASS for audit disposition; fixture missing and remediation required |
| Frozen confidence/calibration intact | PASS |
| Native IDs intact | PASS |
| Lateral/collision targets intact | PASS |
| Public/recruiter copy aligned | PASS for audit disposition; recruiter evidence mapping remediation required |
| No unrelated identity drift | PASS |
| Deterministic generation | N/A before remediation |
| Candidate scope passes exact SHA | N/A before candidate |
| Superseded candidates recorded | N/A, none |
| Review uses exact candidate SHA | N/A |
| Certification uses exact approved SHA | N/A |
| Governance-only workflow/review/certification commits | PASS |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A; Excel managed outside Codex |

## Decisions Made

- Gate 3+4 remediation is authorized for DUNE only.
- The candidate must keep `DUNE` as the canonical key and only accepted alias.
- `BRGW` and all same-color permutations remain metadata/query-only and must fail closed as candidate identities.
- VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched.
- Excel was not updated by Codex.

## Risks / Uncertainties

- INK is not started. DUNE-owned collision evidence must not depend on unresolved INK claim IDs in authoritative chains.
- Existing generated preview is enabled even though raw profile/search metadata says preview is disabled; this is a known generated/raw distinction to preserve unless a DUNE-only preview repair is explicitly proven necessary.
- Windows CRLF can make generated provenance byte checks noisy; content-equivalent CRLF-only deltas must not be staged as candidate edits unless generated content actually changes.

## Tests Run

- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP rev-parse codex/crit001-program-base` - `ab3ece2155d52c0f4283a0c0244c601a0991f970`.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP cat-file -e "ab3ece2155d52c0f4283a0c0244c601a0991f970^{commit}"` - exit 0.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP worktree list --porcelain` - no canonical program-base worktree attached; protected worktrees preserved.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP show-ref --verify refs/heads/codex/vm-534-dune-semantic-recovery` - exit 1 before branch creation, no branch collision.
- `Test-Path -LiteralPath 'C:\dev\mtgSiteWIP-crit001-vm534-dune'` - `False` before worktree creation.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP worktree add -b codex/vm-534-dune-semantic-recovery C:\dev\mtgSiteWIP-crit001-vm534-dune ab3ece2155d52c0f4283a0c0244c601a0991f970` - exit 0.
- `git -C C:\dev\mtgSiteWIP-crit001-vm534-dune -c safe.directory=C:/dev/mtgSiteWIP-crit001-vm534-dune log --oneline ab3ece2155d52c0f4283a0c0244c601a0991f970..HEAD --` - no output before Gate commit.
- `node research\audit-semantic-readiness.mjs --targets=DUNE` - exit 0, pre-remediation audit shows 5 unclassified claims, 14 sources, 9 reference sites, GLINT/INK missing-reference warnings, and low-volume/support-heavy/invalid-reference fingerprint.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=DUNE` - exit 1 with expected pre-remediation findings.
- `node research\build-semantic-readiness-provenance.mjs --check` - exit 1 stale before remediation.

## Not Touched

No DUNE semantic data, generated data, fixture, provenance source, recruiter context, identity-layer preview source, validator, test, package, lockfile, runtime behavior, VM-535 Ink, VM-536 Witch, VM-537 Colorless, VM-538 WUBRG, Excel, GitHub remote, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation was touched.

## Follow-Up Recommendations

- Proceed with DUNE-only Gate 3+4 remediation in the same official worktree after this governance commit.
- Rebuild generated faction/provenance outputs through repository tooling and run exact candidate-scope validation against the candidate SHA.

## Next Suggested Agent

Codex DUNE Gate 3+4 candidate workflow agent in the current VM-534 worktree.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-534-dune-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/reference/semantic-readiness-contract.md`

READY FOR GATE 3 REMEDIATION

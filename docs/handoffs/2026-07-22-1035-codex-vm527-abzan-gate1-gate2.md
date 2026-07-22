# VM-527 Abzan Gate 1+2 Read-Only Semantic Audit

Agent name: Codex

Task requested: Continue VM-527 as a read-only Gate 1+2 semantic audit for ABZAN / WBG under CRIT-001 Contract v1.1, decide whether Gate 3+4 remediation is authorized, and update only governance records.

Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`, `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`, `docs/incidents/CRIT-001-operating-playbook.md`, `docs/incidents/CRIT-001-contract-v1.1-amendment.md`, `docs/reference/semantic-readiness-contract.md`, `docs/incidents/CRIT-001-drift-control-template.md`, `docs/incidents/templates/identity-semantic-recovery-template.md`.

## Decision

Gate 1+2 decision: PASS - ABZAN GATE 3+4 REMEDIATION AUTHORIZED.

This is not remediation, candidate creation, independent review, certification, program-base advancement, Excel work, VM-528 work, push, PR, merge, original-main work, or protected-worktree work. It is a governance-only semantic audit and exact remediation contract for the authorized Abzan implementation stage.

## Starting State

- Worktree: `C:\dev\mtgSiteWIP-crit001-vm527-abzan`
- Branch: `codex/vm-527-abzan-semantic-recovery`
- Starting HEAD: `6375947ef15ff934b75a3199cde47fe0c1703470`
- Starting HEAD subject: `VM-527: record Abzan drift preflight`
- Program base: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`
- Program base subject: `VM-526: certify Naya semantic recovery`
- Exact identity key: `ABZAN`
- Color metadata/code: `WBG`; `WBG`, `BGW`, and `GWB` remain invalid as identity keys.
- Starting status: clean before this governance update.

Protected worktrees reviewed but not touched: original main, long-running `C:\dev\mtgSiteWIP-crit001`, VM-526 candidate/review/certification worktrees, DRIFT-017, DRIFT-020 worktrees, detached exact-test worktrees, and Table Talk baseline.

## Pre-Flight Review Summary

Recent related work: VM-526 Naya was certified from exact approved candidate `f3dda547eb91475cd3d00056463729d98a040e55`, with candidate workflow `cdcd1b408a64dacb63e75865c519ca317ce0e08a`, approval review `8afaa199d774d56845a305c4f879d275ada94a47`, and certification/program base `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`. VM-527 drift preflight at `6375947ef15ff934b75a3199cde47fe0c1703470` proved branch/worktree isolation, ABZAN key authority, WBG alias rejection, protected-worktree preservation, and missing fixture/provenance risks.

Current known risks: all 11 Abzan claims lack Contract v1.1 semantic roles and evidence locations; canonical recruiter guidance lacks evidence mapping; generated proof chains cite unclassified claims; semantic fixture is missing; provenance is stale; 15 Abzan provenance rows have null canonical IDs; Commander product support is currently referenced by generated proof chains and must be isolated from authoritative semantics.

Relevant decisions already made: `ABZAN` is the only internal identity key. `WBG`, `BGW`, and `GWB` are display/color metadata or query-order terms only. Dromoka's brood is not Abzan Houses. Generic WBG, generic toughness/defense, generic graveyard value, Commander products, seed files, and manual-fill lore are insufficient proof.

Files recently changed before this task: VM-527 drift preflight handoff, board, handoff index, CRIT ledger, and Kanban card at commit `6375947ef15ff934b75a3199cde47fe0c1703470`.

What should not be touched: non-Abzan raw packets, generated semantic data outside ABZAN, shared validators/tests/schemas/package/CI, runtime scoring/calibration/Hall/Crucible behavior, Excel, VM-528, original main, protected worktrees, DRIFT-017 prototypes, DRIFT-020 implementation/tests, historical/debug/archive artifacts, VM-542/DRIFT-019 residual, and Table Talk files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/templates/identity-semantic-recovery-template.md`
- `data/raw-factions/abzan/abzan.changelog.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- `data/semantic-readiness-provenance.json`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-research-dossier.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/research/abzan/abzan-lore-source-packet.md`
- `docs/research/abzan/abzan-seed-source-crosscheck.md`
- Official local Tarkir and Abzan source captures referenced from `abzan.sources.json`
- VM-525 Jund and VM-526 Naya Gate 1+2, candidate workflow, review, and certification precedents

## Files Changed

- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## Raw Inventory And Frozen Locators

Raw packet files are tracked and readable:

| File | SHA-256 |
| --- | --- |
| `data/raw-factions/abzan/abzan.changelog.json` | `53a67e23f840c65bd1766f47d1c785327f42550c19a11369740de347b6664054` |
| `data/raw-factions/abzan/abzan.claims.json` | `69b71505bf3ada122df8b6ce4c7e37cd97c11419b35cfba8291905ae8f82067a` |
| `data/raw-factions/abzan/abzan.placement.json` | `9f43d75cacb4f8a9cd64d4bd4eeb5b05c7eb2e78df617562231fadaa3f246cca` |
| `data/raw-factions/abzan/abzan.profile.json` | `88affbf3082f481bcf0184b0a96d6eee9ecd83e7dd5b884746853a3fe5b3a07b` |
| `data/raw-factions/abzan/abzan.sources.json` | `c9a808457d147ec31959673e6e914e8adfb70abbf613b20f1383bc6b421ebfed` |

Generated artifact fingerprints recorded during audit:

- `data/factions.json`: `04f8ec026b2e2dae16aaa41bc8d1a0df4aab9e9a03a45680bd2c43dea9838485`
- `data/placement-model.json`: `abe20fcc8bc4871d003d4b787fd9e6b2599c89cc33affe593a36e2bf0dc60eee`
- `data/identity-layers.json`: `5ff9b3a3cd13b184bdc332e6e4813b061adc1faf09df3204073aef0f54b9a6e0`
- `data/semantic-readiness-provenance.json`: `38550cfbf54ef956c0ef0af900ba28f7b1a99278291122e51d4d30d2b0eb5992`

Semantic fixture path is absent: `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`.

## Source Audit

Current `abzan.sources.json` has 20 source records: 9 claim-bearing, 6 shaping-only, and 5 support-only.

Claim-bearing current sources: `src_vm_abzan_evidence_ledger_20260531`, `src_wotc_rosewater_abzan_we_will_survive`, `src_wotc_tarkir_khans_pg_part_1`, `src_wotc_tarkir_fate_reforged_pg`, `src_wotc_tarkir_dragons_pg_part_1`, `src_wotc_tarkir_dragons_pg_part_2`, `src_wotc_tarkir_story_khanfall`, `src_wotc_tarkir_dragonstorm_pg_part_1`, and `src_wotc_tarkir_dragonstorm_pg_part_2`.

Shaping-only current sources: `src_vm_abzan_source_ledger_20260531`, `src_vm_abzan_research_dossier_20260531`, `src_vm_abzan_reliability_audit_20260531`, `src_vm_abzan_lore_source_packet_20260531`, `src_vm_abzan_identity_md_20260531`, and `src_vm_abzan_metaphysics_md_20260531`.

Support-only current sources: `src_vm_abzan_manual_fill_20260531`, `src_vm_second_commander_recommendations_wbg`, `src_scryfall_oracle_cards_local`, `src_wotc_color_philosophy_support_abzan`, and `src_wotc_tarkir_dragonstorm_commander_decklists_20250325`.

Source floor is sufficient for the current Abzan claims. Gate 3+4 must not add source records unless a candidate implementation introduces a new exact source use. Support-only Commander, Scryfall, color-philosophy, manual-fill, and operator rows must not carry authoritative generated proof chains.

## Claim Disposition

Final intended Gate 3+4 raw claim count: 11 total, composed of 10 `substantive_claim` records and 1 `support_record`.

All 10 current identity/lore/boundary claims are retained as substantive claims after evidence-scope correction. `abzan_claim_0011` is retained as support-only product/deck navigation and must be isolated from authoritative generated semantics.

| Claim | Disposition | Final role | Required scope |
| --- | --- | --- | --- |
| `abzan_claim_0001` | Retain with scope correction | `substantive_claim` | `identity_fact`: Abzan is the White-centered WBG Tarkir wedge expression. |
| `abzan_claim_0002` | Retain with scope correction | `substantive_claim` | `design_identity`: endurance/survival through proactive defense, active defense, long-game planning, and Green growth after pressure. |
| `abzan_claim_0003` | Retain with scope correction | `substantive_claim` | `khans_family_duty`: family, duty, kin-tree practice, ancestor spirits, and kinship categories. |
| `abzan_claim_0004` | Retain with scope correction | `substantive_claim` | `khans_lore_support_bounded`: era-bound roles, magic, named anchors, family bonds, lineage, dragon-scale armor, and dragon-threat context. |
| `abzan_claim_0005` | Retain with scope correction | `substantive_claim` | `transition_boundary`: Khanfall, Dromoka-era suppression, and Dromoka/Abzan separation. |
| `abzan_claim_0006` | Retain with scope correction | `substantive_claim` | `modern_house_identity`: revived loyal/enduring Abzan under Council of Houses, extended houses, and major houses. |
| `abzan_claim_0007` | Retain with scope correction | `substantive_claim` | `modern_civic_military`: trade, fortified refuge, patient defense, military support, daily trades, and arts. |
| `abzan_claim_0008` | Retain with scope correction | `substantive_claim` | `perennation_metaphysics`: life/death continuity, ancestor guidance, Kin-Tree bonding, earth manipulation, and spirit summoning. |
| `abzan_claim_0009` | Retain with scope correction | `substantive_claim` | `modern_dragonstorm_context`: dragon hunting/capture, house dragons, storm refuge, protective walls, and bounded geography. |
| `abzan_claim_0010` | Retain with scope correction | `substantive_claim` | `metadata_guardrail`: generic WBG/defense/graveyard/Dromoka/Commander/seed/non-live signals are insufficient proof. |
| `abzan_claim_0011` | Retain as support only | `support_record` | `commander_product_support`: official decklist verifies Abzan Armor product facts only; not Tarkir canon, placement evidence, or authoritative identity proof. |

## Evidence Contract

Use existing ABZAN-EVID rows as bounded evidence. Required mapping:

- `abzan_claim_0001`: ABZAN-EVID-001, sources `src_vm_abzan_evidence_ledger_20260531` and `src_wotc_rosewater_abzan_we_will_survive`.
- `abzan_claim_0002`: ABZAN-EVID-002 and ABZAN-EVID-003, same source set as claim 0001.
- `abzan_claim_0003`: ABZAN-EVID-004 through ABZAN-EVID-006, sources `src_vm_abzan_evidence_ledger_20260531` and `src_wotc_tarkir_khans_pg_part_1`.
- `abzan_claim_0004`: ABZAN-EVID-007 through ABZAN-EVID-010, sources `src_vm_abzan_evidence_ledger_20260531`, `src_wotc_tarkir_khans_pg_part_1`, and `src_wotc_tarkir_fate_reforged_pg`.
- `abzan_claim_0005`: ABZAN-EVID-010 through ABZAN-EVID-013, sources `src_wotc_tarkir_fate_reforged_pg`, `src_wotc_tarkir_dragons_pg_part_1`, `src_wotc_tarkir_dragons_pg_part_2`, and `src_wotc_tarkir_story_khanfall`.
- `abzan_claim_0006`: ABZAN-EVID-014, ABZAN-EVID-016 through ABZAN-EVID-019, source `src_wotc_tarkir_dragonstorm_pg_part_1`.
- `abzan_claim_0007`: ABZAN-EVID-015, ABZAN-EVID-020, and ABZAN-EVID-021, source `src_wotc_tarkir_dragonstorm_pg_part_1`.
- `abzan_claim_0008`: ABZAN-EVID-022 and ABZAN-EVID-023, source `src_wotc_tarkir_dragonstorm_pg_part_1`.
- `abzan_claim_0009`: ABZAN-EVID-024 and ABZAN-EVID-025, sources `src_wotc_tarkir_dragonstorm_pg_part_1` and `src_wotc_tarkir_dragonstorm_pg_part_2`.
- `abzan_claim_0010`: ABZAN-EVID-026 and ABZAN-EVID-029, with source hygiene from the source ledger/reliability audit.
- `abzan_claim_0011`: ABZAN-EVID-032 and `src_wotc_tarkir_dragonstorm_commander_decklists_20250325`; support-only proof, never authoritative semantic proof.

Every substantive claim must receive `semantic_role`, `evidence_locations`, `evidence_scope`, and source/locator parity. Support-only records and shaping-only records must not be used as authoritative proof for generated semantic strings, placement guidance, identity layer text, recruiter context, or collision guidance.

## Evidence-Backed Abzan Model

Canonical thesis: Abzan is White-centered endurance through family, duty, ancestor memory, and house continuity. Black preserves the costs, bargains, politics, and death-facing obligation of endurance. Green turns continuity into Kin-Trees, perennation, bodies, roots, and generational survival. Abzan should feel like a living house outlasting pressure for descendants and ancestors, not generic WBG value.

Operational definition: Abzan matches when a player fantasy centers obligation to family/house, survival for the next generation, ancestor-guided continuity, defensive patience, and life/death continuity as duty.

Failure modes: generic WBG color identity, generic graveyard recursion, generic toughness/defenders, counters/tokens, Commander product identity, Dromoka brood continuity, seed-file lore, generic family language, generic survival, pure Orzhov obligation, pure Golgari death/life cycle, pure Selesnya community, Jund survival pressure, Naya abundance, Bant honor, and Sultai resource exploitation.

## Required Neighbor Matrix

- Mardu/WBR: shares Tarkir context and clan duty; Abzan endures through house continuity and defense while Mardu acts through speed, war, and total commitment.
- Sultai/UBG: shares Black/Green and death/resource context; Abzan treats ancestry as obligation and continuity while Sultai converts bodies/secrets/resources into opportunity.
- Dromoka/WG dragon brood: historical successor/suppression context only; Dromoka brood is not Abzan Houses.
- Orzhov/WB: shares obligation, debt, death, and hierarchy; Abzan requires Green house/Kin-Tree continuity and Tarkir family endurance.
- Golgari/BG: shares death/life and graveyard texture; Abzan requires White duty, family, and institution continuity.
- Selesnya/WG: shares community and life; Abzan requires Black cost/death-facing endurance and house obligation.
- Bant/WUG: shares White/Green structure; Abzan is family endurance and ancestor memory, not honor/champion hierarchy.
- Jund/BRG: shares Black/Green survival; Abzan is defensive continuity and obligation, not Red-centered appetite/action under consequence.
- Naya/WRG: shares family/life/Green texture; Abzan is duty/endurance/ancestor memory, not Green-centered abundance and instinctive belonging.
- Temur/GUR: shares Tarkir/Green physicality; Abzan is house continuity and duty, not ferocity/adaptive discovery.
- Jeskai/URW: discipline/principle/training are not Abzan's family-duty endurance.
- Grixis/UBR and Esper/WUB: death-world/control/artifice/cold calculation are not Abzan.
- Generic WBG, Commander WBG, five-color good-stuff, generic graveyard/toughness/defense/counters/tokens, and card-list evidence are insufficient by themselves.

## Provenance Contract

Current semantic-readiness provenance has 29 ABZAN rows, 15 null canonical IDs, 0 missing canonical content hashes, and stale generated status. Null-owner pointers: `/moral_and_psychological_profile`, `/commander_compass/native_fit_commanders/0/source_basis`, `/commander_compass/native_fit_commanders/1/source_basis`, `/core_identity`, `/data_quality`, `/great_tension`, `/key_figures/0` through `/key_figures/4`, `/site_surface`, `/structure`, and `/views_on_other_factions/0` through `/views_on_other_factions/1`.

Gate 3+4 must retain existing non-null owner IDs where objects remain and assign Abzan-local owner IDs for null owners. Suggested owner pattern: `abzan_<surface>_gate3`, `figure_abzan_<name>_gate3`, `rel_abzan_<target>_gate3`, and `support_abzan_commander_product_gate3` for support-only product rows. Final required state: zero null canonical IDs, zero null canonical content hashes, no duplicate owner IDs, no support-only proof-chain contamination, and generated/provenance proof chains using substantive claims only for authoritative semantics.

## Fixture Contract

Create `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json` with positive, negative, neighbor, generic-trap, support-isolation, and provenance coverage.

Required positives: White-centered Abzan Houses; family duty; house continuity; kin-tree practice; ancestor spirits; perennation; defensive patience; Council/house governance; modern Dragonstorm revival; all three colors necessary.

Required negatives: generic WBG, generic defenders/toughness/graveyard recursion, generic counters/tokens, Commander product identity, Dromoka brood, seed files, Orzhov duty without Green continuity, Golgari death/life without White house duty, Selesnya community without Black cost, Sultai resource exploitation, Mardu speed/war, Jund appetite/survival pressure, Naya abundance, Bant honor, Temur ferocity, Jeskai discipline, Grixis/Esper control/death-world, card-list/corpus-only evidence, and unsupported manual-fill lore.

Fixture acceptance requires `node research/validate-semantic-readiness.mjs --fixtures --targets=ABZAN` to pass after remediation.

## Preview, Consumers, And Frozen Fields

Current preview source and embedded generated copy match exactly: `Endure with the house. Remember through the tree. Guard the next generation. Abzan treats survival as a duty carried by family, ancestor memory, and the living house. White keeps obligation centered, Black remembers what endurance costs, and Green lets continuity pass through roots, bodies, and time.`

Preview may be retained if final semantic validation passes. Any preview change must be limited to `data/identity-layers.json#/expressions/ABZAN/preview_text` and generated embedded ABZAN preview parity.

Frozen fields: identity key `ABZAN`; raw slug `abzan`; color identity `W/B/G`; color metadata `WBG`; `placement_eligible: true`; `live_pilot: true`; `manual_review_recommended: true`; `review_gated: false`; calibration tuning status `vm202_live_pilot`; array-shaped collision guidance currently ordered Mardu then Sultai; native IDs and generated placement/recruiter surfaces must be retained unless source-bounded identity-local repair and candidate-scope validation permit change.

Active consumers to validate after remediation: Home/Archscry generated data, `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, `data/semantic-readiness-provenance.json`, and `supabase/functions/guild-recruiter/faction-context.ts`. Excluded consumers remain `outputs/mtgdata-v3-enhanced/*.inspect.ndjson`, `assets/js/newindex-color-matrix.js`, and `assets/js/color-matrix-radar.js`.

## Gate 3+4 Required Remediation Matrix

1. Assign `substantive_claim` roles to claims 0001-0010 and `support_record` to claim 0011.
2. Add bounded `evidence_locations` and `evidence_scope` for every substantive claim, with source ID parity.
3. Keep Commander, Scryfall, color-philosophy, manual-fill, seed, and project-architecture material out of authoritative proof chains unless explicitly support-only.
4. Add evidence mapping for canonical recruiter guidance.
5. Repair all 15 null provenance owner IDs with Abzan-local owner IDs.
6. Add Abzan semantic fixtures with required positives, neighbors, generic traps, support traps, and provenance checks.
7. Regenerate `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json` if preview changes, `data/semantic-readiness-provenance.json`, and `supabase/functions/guild-recruiter/faction-context.ts` from source.
8. Validate source/generated parity, semantic readiness, fixtures, provenance, parser, placement, recruiter isolation, and exact candidate scope.
9. Run invalid alias checks for `WBG`, `BGW`, `GWB`, and a deliberately unknown identity.
10. Record exact generated hashes, provenance counts, fixture counts, claim counts, and candidate SHA in the candidate workflow handoff.
11. Do not perform independent review, certification, semantically_ready transition, certified-count change, program-base advancement, Excel edit, push, PR, merge, original-main edit, or VM-528 work.

## Diagnostics Run

- `node research/audit-semantic-readiness.mjs --targets=ABZAN`: exit 0. Reported 11 claims; 0 substantive, 0 discovery, 1 support, 10 unclassified; 20 sources; 9 claim-bearing sources; 29 reference sites; no missing references; 3 raw questions; neighbor references `mardu`, `sultai`; risks `low-record-volume` and `no-explicit-substantive-role`.
- `node research/validate-semantic-readiness.mjs --targets=ABZAN`: exit 1 as expected pre-remediation. All 11 claims lack semantic roles; recruiter guidance lacks evidence mapping; generated profile/placement references lack substantive claims; fixture is missing.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=ABZAN`: exit 1 as expected pre-remediation for the same class of defects plus missing fixture.
- `node research/build-semantic-readiness-provenance.mjs --check`: exit 1 as expected pre-remediation because provenance is stale.
- `node research/validate-source-generated-guardrails.mjs --targets=ABZAN`: exit 0, with one non-blocking model-owned inhibitor warning.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=6375947 --identity=ABZAN`: exit 1 as expected due pre-remediation unclassified generated/provenance proof-chain contamination.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=6375947 --identity=WBG`: exit 1 with `Unknown identity WBG`, expected and correct.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=6375947 --identity=BGW`: exit 1 with `Unknown identity BGW`, expected and correct.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=6375947 --identity=GWB`: exit 1 with `Unknown identity GWB`, expected and correct.
- `node research/semantic-candidate-scope-tests.js`: exit 0.
- JSON parse and hash extraction for raw/generated/provenance files: exit 0.

Expected diagnostic failures do not block Gate 3+4 authorization because they are exactly the unremediated defects this Gate 1+2 contract assigns to implementation.

## Scorecard

- Drift-control target identity exactness: PASS.
- Starting HEAD and program base exactness: PASS.
- Protected worktree preservation: PASS.
- Source inventory completeness for current records: PASS.
- Source-role classification: PASS.
- Claim role disposition: PASS.
- Evidence sufficiency for current claims: PASS.
- Support-only isolation contract: PASS.
- Required-neighbor matrix: PASS.
- Generic/mechanics/product safeguards: PASS.
- Preview owner/equality assessment: PASS.
- Active consumer trace: PASS.
- Provenance owner assignment contract: PASS.
- Fixture contract: PASS.
- Collision/lateral contract: PASS.
- Frozen fields contract: PASS.
- Candidate-scope expected-failure classification: PASS.
- Invalid alias rejection: PASS.
- Remediation authorization clarity: PASS.

Score: 19 PASS, 0 FAIL, 0 UNKNOWN.

## What Changed

Governance now records the exact semantic decisions, source bounds, claim roles, fixture expectations, proof-chain ownership, preview/consumer controls, and validation gates required for Abzan remediation.

## Why It Changed

Gate 3+4 needs a fixed contract so implementation can repair Abzan without widening the source surface, promoting Commander or Dromoka material, changing shared infrastructure, or confusing WBG metadata with the canonical ABZAN identity key.

## Decisions Made

- Gate 3+4 remediation is authorized for ABZAN only.
- Claims 0001-0010 can be retained as substantive claims after evidence-scope correction.
- Claim 0011 must be retained as support-only and isolated from authoritative generated proof chains.
- No new claims or source records are required in this recovery window.
- Abzan's core is White-centered family/house endurance, ancestor memory, and perennation.
- WBG, BGW, and GWB remain invalid as identity keys.
- Dromoka's brood and Commander products are not Abzan Houses proof.

## Risks / Uncertainties

- Existing generated data may continue to reference support-only Commander product facts until regeneration isolates `abzan_claim_0011`.
- Current source floor is broad but must stay tightly bounded to existing evidence rows; manual-fill topics remain unavailable.
- Candidate-scope may reject any lateral/collision expansion beyond identity-local semantic repairs.
- Existing diagnostics are failing by design until remediation occurs; future Gate 3+4 must not treat stale failures as certification evidence.

## Tests Run

See the Diagnostics Run section for exact command outcomes. No remediation validation passed because no remediation was performed.

## Not Touched

No Abzan raw semantic data, generated data, provenance data, fixtures, runtime code, tests, validators, generators, schemas, package scripts, CI files, Excel files, VM-528 files, original-main files, protected worktrees, DRIFT-017 prototype files, VM-526 history, DRIFT-020 implementation, VM-542/DRIFT-019 residual files, historical/debug/archive artifacts, or Table Talk files were changed.

## Follow-Up Recommendations

Next worker should perform Gate 3+4 semantic remediation exactly from this contract, then create a separate candidate workflow record only after all required validations pass from the exact program base to the exact candidate SHA.

Next suggested agent: Abzan Gate 3+4 implementation agent.

PASS - ABZAN GATE 3+4 REMEDIATION AUTHORIZED

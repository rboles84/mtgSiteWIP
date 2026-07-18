# VM-516 - Simic Semantic Recovery

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: Simic / UG
Contract: CRIT-001 Contract v1.1
Operating playbook: CRIT-001 Operating Playbook v2
Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
Program base: `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`
Starting Gate 1+2 HEAD: `851f4b604459073bd739ec10d3f278f90f4069c3`

## Gate 1+2 Audit - 2026-07-17

Gate 1+2 was a read-only audit and evidence-confirmation pass. No Simic raw packet, generated consumer, provenance, fixture, recruiter, runtime, schema, builder, validator, scoring, confidence, calibration, scheduling, tie-order, Hall, Crucible, global recruiter, VM-517, original main worktree, or Excel tracker file was changed.

### Preflight

- Worktree: `C:\dev\mtgSiteWIP-crit001`
- Branch: `codex/vm-516-simic-semantic-recovery`
- Starting HEAD: `851f4b604459073bd739ec10d3f278f90f4069c3`
- Program base: `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`
- Drift-control governance SHA: `bb424a64787977baa45c67f1459babab64b1d3c7`
- Drift-preflight SHA: `851f4b604459073bd739ec10d3f278f90f4069c3`
- Drift-preflight decision: `PASS — SIMIC GATE 1+2 AUTHORIZED`
- Current HEAD descends from the program base and contains the drift-control governance milestone.
- Active worktree baseline: allowed Table Talk side-scan changes only: modified `docs/handoffs/HANDOFF_INDEX.md` plus untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md` and `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`.
- Original main allowance: `C:\dev\mtgSiteWIP` retained known docs/workflow dirtiness only; no raw/generated/semantic/data/runtime/schema/validator/builder/scoring/test changes were observed or touched.

### Sources Inspected

- `data/raw-factions/simic_combine/simic_combine.sources.json`
- `data/raw-factions/simic_combine/simic_combine.claims.json`
- `data/raw-factions/simic_combine/simic_combine.profile.json`
- `data/raw-factions/simic_combine/simic_combine.placement.json`
- `data/raw-factions/simic_combine/simic_combine.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- Official Wizards source pages listed in the local source matrix for bounded locator confirmation.

Source authority:

| Source | Stored role | Gate 1+2 disposition |
|---|---|---|
| `src_wotc_flavorful_guide_ravnica_allegiance_2019` | claim-bearing | May support substantive identity, philosophy, organization, leadership, public-health, clade, and pressure claims using the Simic section lines 128-140. |
| `src_wotc_ravnica_allegiance_mechanics_2018` | claim-bearing | May support Adapt and bounded improvement/adaptation claims using the Simic mechanics section lines 120-128. |
| `src_wotc_dragons_maze_mechanics_2013` | support-only | May remain as support texture for older Evolve/guild-mechanics context only; it must not prove current identity, placement, public copy, recruiter guidance, or semantic readiness. |
| Ten MTG-Stories archive rows | discovery-only | May remain searchable discovery/history metadata only; they must not prove identity, placement, key figures, public copy, recruiter guidance, fixtures, or provenance chains. |

The official guild guide supports Simic's Ravnican green-blue guild context, Holdfast/Upwelling philosophy, connection to nature plus improvement, reclusive scientists/physicians/surgeons/public-health role, zonots, clades, Momir Vig/Zegana/Vannifar history, and the bounded Vannifar/Adaptionist pressure case. The mechanics article supports Adapt as a Simic mechanic and the source-bounded idea that life can be improved through adaptation. Dragon's Maze support confirms older Evolve context only.

### Reconciled Initial Claim Counts

- Raw explicit-role baseline: 17 total; 0 `substantive_claim`, 0 `discovery_record`, 0 `support_record`, 17 unassigned/unclassified.
- Ledger/source-derived baseline: 17 total; 0 `substantive_claim`, 10 `discovery_record`, 0 `support_record`, 7 `unclassified`.
- Reconciliation: the raw file has no explicit `semantic_role` fields, while the ledger derives 10 discovery records from claims that cite discovery-only story/archive sources and leaves the seven official-source-linked claims as unclassified. Gate 3 must write explicit roles for all claims rather than relying on derived source roles.

Correct Gate 3 role direction:

- Claims `simic_combine_claim_001` through `simic_combine_claim_007` are candidates for `substantive_claim` if narrowed and given bounded evidence locations with `evidence_scope`.
- Claims `simic_combine_claim_0008` through `simic_combine_claim_0017` should be `discovery_record` unless separate future source intake promotes them.
- No current Simic claim should be `support_record` based on the starting packet because no claim cites only the support-only Dragon's Maze source.

### Evidence-Scope Findings

- No claim is explicitly substantive at Gate 1+2.
- No raw Simic claim has Contract v1.1 `evidence_locations`.
- All future substantive Simic claims need bounded `evidence_locations` with `source_id`, `locator_type`, `locator`, `bounded_paraphrase`, `evidence_scope`, and `interpretation_level`.
- Discovery records should not receive authoritative evidence locations unless a contract/template field specifically permits discovery-only metadata.

### Discovery And Support Contamination

- Profile `/core_identity`, `/site_surface`, `/structure`, `/great_tension`, `/mechanics`, `/canonical_flavor_text/0`, `/data_quality/corpus_upgrade`, and all four key-figure chains contain discovery-only story claim IDs.
- Placement `/placement_summary`, `/placement_axes/0`, `/moral_and_psychological_profile`, `/core_values/0` through `/core_values/9`, `/behavioral_signals/0`, and `/inhibitor_traits/0` contain discovery-only story claim IDs.
- Generated public/placement surfaces contain discovery-only claim IDs `simic_combine_claim_0008` through `simic_combine_claim_0015`.
- Recruiter UG currently references official-source-linked claim IDs `001`, `002`, and `003`, but canonical recruiter guidance lacks complete evidence mappings.
- `src_wotc_dragons_maze_mechanics_2013` appears as a support-only source in profile `strongest_source_ids`; it must be retained only as auxiliary support texture and not as authoritative proof.

### ID, Hash, And Provenance Findings

- UG provenance entries: 42.
- Required null canonical IDs: 31.
- Null canonical content hashes: 0.
- Unresolved canonical file/pointer pairs: 0.
- Duplicate canonical file/pointer entries: 0.
- Duplicate non-null canonical IDs: 0.
- Discovery-backed provenance entries: 26.
- Simic source rows do not carry local content hashes; generated provenance content hashes are present for all existing UG entries.

### Public And Recruiter Findings

Generated public and recruiter surfaces currently overextend Simic into high-heat, generic, or mechanic-first wording. Target-specific stale-risk phrases include: `generic UG`, `generic GU`, `Simic ramp`, `ramp`, `counterspell`, `card draw`, `counters`, `+1/+1 counters`, `evolve`, `adapt`, `mutate`, `biomancy`, `bioengineering`, `mutation`, `specimen`, `perfect organism`, `optimization`, `forced improvement`, `crab claws`, `super-soldier`, `mad science`, `body horror`, `what if this organism were better`, `draft not finished`, `improvement`, `adaptation`, `biology`, `experiment`, `evolution`, `progress`, `public health`, `nature as a first draft`, and `everything can be improved`.

These terms are not globally banned. Gate 3+4 may retain them only when source-supported, bounded, and not promoted from discovery/support records or generic Commander mechanics.

### Fixture And Exact-Chain Baseline

No Simic fixture exists at `research/fixtures/semantic-readiness/simic_combine.semantic-fixtures.json`.

| Locator | Generated count | Fixture count | Exact equality | Duplicate IDs | Missing IDs | Extra IDs |
|---|---:|---:|---|---|---|---|
| `data/raw-factions/simic_combine/simic_combine.profile.json#/core_identity` | 8 | N/A | N/A - fixture absent | none | N/A | N/A |
| `data/raw-factions/simic_combine/simic_combine.placement.json#/placement_summary` | 14 | N/A | N/A - fixture absent | none | N/A | N/A |

Generated `/core_identity` currently consists only of discovery-only story claim IDs `simic_combine_claim_0008` through `simic_combine_claim_0015`.

Generated `/placement_summary` currently uses discovery-only story claim IDs `simic_combine_claim_0008` through `simic_combine_claim_0015` plus currently unclassified official-source-linked claims `simic_combine_claim_001` through `simic_combine_claim_006`.

### Frozen Field Result

All committed preflight frozen values were reverified and match:

- `placement_quality.overall_confidence`: `Medium`
- `placement_summary.calibrated_primary_read`: `Requires biological adaptation, improvement, mutation, optimization, or living-system experimentation.`
- `placement_summary.calibrated_false_positive_guardrail`: `Do not award for generic systems thinking without organism/adaptation language.`
- `calibration_tuning.required_positive_evidence_terms`: `adaptation`, `improvement`, `biology`, `evolve`, `specimen`, `mutation`, `progress`, `organism`, `experiment`, `biomancy`
- `calibration_tuning.required_positive_min_hits`: `2`
- `calibration_tuning.broad_match_penalty`: `0.1`
- `calibration_tuning.strengthen_when_user_centers`: `biological adaptation`, `iterative improvement`, `evolution`, `living system optimization`
- `calibration_tuning.suppress_when_user_centers`: `abstract proof`, `life death craft`, `law procedure`, `wild dispossession`, `archive history`
- Generated lateral targets: `QUANDRIX`, `UR`, `WITHERBLOOM`, `TEMUR`, `SULTAI`
- Raw/generated collision guidance: Quandrix and Witherbloom only.
- Generic collision target: absent. Generic-UG boundary work must not add a generated `GENERIC_UG_OVERFIT` collision target unless a later candidate-scope check explicitly permits a documented exception.
- Native IDs: faction ID, four character IDs, four question IDs, one axis ID, and two collision IDs match the preflight baseline.
- No Simic-local golden-path or scoring field was found beyond confidence/calibration-related values; global scoring remains out of scope.

### Required Neighbor Conclusions

Gate 3+4 must build source-bounded, testable guidance for:

`GENERIC_UG_OVERFIT`, `U`, `G`, `UR`, `BG`, `WG`, `RG`, `UB`, `QUANDRIX`, `WITHERBLOOM`, `BANT`, `TEMUR`, `SULTAI`

Working boundaries:

- Simic must be source-bounded to the Ravnican green-blue guild whose official sources connect nature, biological research, public health, clades, Adapt, and the tension between connection to nature and improving on it.
- It is not generic UG ramp, counters, card draw, counterspells, tempo, value, control, or generic systems thinking.
- It is not mono-blue inquiry, planning, control, or abstraction without biological/living-system adaptation.
- It is not mono-green nature, growth, instinct, or preservation without organized Simic experimentation and improvement.
- It is not Izzet invention, mizzium, machinery, spells, or volatile discovery.
- It is not Golgari survival, death, decay, undercity ecology, or life/death reclamation.
- It is not Selesnya communal harmony, preservation, or shared belonging.
- It is not Gruul rage, instinctive revolt, wild dispossession, or anti-civilization.
- It is not Dimir secrecy, hidden information, anonymity, or covert leverage.
- It is not Quandrix mathematical pattern, abstraction, proof, or model-building.
- It is not Witherbloom life/death essence craft, remedies, poisons, or cost exchange.
- It is not Bant honor, sanctioned order, or social virtue at a broader WUG shard.
- It is not Temur survival instinct, elemental memory, or shamanic attunement at a broader GUR clan.
- It is not Sultai ruthless opportunity, necromancy, or calculated resource conversion at a broader BGU clan.

### Semantic-Risk Conclusions

Gate 3+4 must not define Simic through generic UG value, creatures, ramp, draw, counters, tempo, midrange, +1/+1 counters, Adapt/Evolve/Graft/Proliferate/Mutate alone, generic science, generic biology, generic mutation, perfect-lifeform claims, mad-scientist stereotypes, unsupported ethics/body-horror/eugenic claims, Izzet-style invention, Quandrix abstraction, Selesnya harmony, Gruul wildness, Golgari death ecology, Witherbloom life/death craft, Dimir secrecy, or broad Bant/Temur/Sultai language.

Positive Simic semantics must come from listed/local approved sources: Ravnican green-blue guild identity, Holdfast/Upwelling balance, nature plus improvement, scientists and public health, clades and biological research, Adapt as bounded mechanic texture, and Vannifar/Adaptionist pressure only where the official guide supports it.

### Gate 1+2 Drift Scorecard

| Control | Gate 1+2 result | Evidence |
|---|---|---|
| Correct branch and program base | PASS | Branch, HEAD, ancestry, and program base verified. |
| One identity active | PASS | Ledger active identity is `SIMIC`; WIP limit is 1. |
| Source hierarchy explicit | PASS | Two claim-bearing official sources, one support-only official source, ten discovery-only sources recorded. |
| Generic color-pair overfit checked | PASS | Generic UG risks and stale terms recorded. |
| Required neighbors checked | PASS | Minimum required neighbors inspected and bounded. |
| Claim roles complete | N/A - Gate 1+2 records initial incompleteness; Gate 3 must remediate roles before candidate. | Raw roles are absent; derived baseline is 10 discovery and 7 unclassified. |
| Evidence scopes complete | N/A - Gate 1+2 records missing evidence scopes; Gate 3 must add them for substantive claims. | No current substantive evidence locations exist. |
| Discovery/support isolated | N/A - Gate 1+2 records contamination; Gate 3 must isolate it before candidate. | Discovery IDs are in profile, placement, and provenance chains. |
| Canonical IDs/hashes valid | N/A - Gate 1+2 records 31 null canonical IDs; Gate 4 must repair. | Hashes are non-null, but IDs are not candidate-ready. |
| Exact fixture/provenance parity | N/A - fixture is absent at Gate 1+2; Gate 4 must create from generated truth. | Current locators and generated arrays are recorded. |
| Frozen confidence/calibration intact | PASS | Reverified against committed preflight baseline. |
| Native IDs intact | PASS | Reverified against committed preflight baseline. |
| Lateral/collision targets intact | PASS | Lateral targets and absent generic collision target match baseline. |
| Public/recruiter copy aligned | N/A - Gate 1+2 records stale/overfit and mapping risk; Gate 4 must validate. | Generated surfaces contain stale risk and missing recruiter mappings. |
| No unrelated identity drift | PASS | No non-Table-Talk dirty files before Gate 1+2 report edits. |
| Deterministic generation | N/A - generation is not run during read-only Gate 1+2. | Gate 4 must prove determinism. |
| Candidate scope passes exact SHA | N/A - no candidate exists at Gate 1+2. | Gate 5 must run exact candidate-scope validation. |
| Superseded candidates recorded | N/A - no Simic candidate exists. | Future failed candidate must be preserved and recorded. |
| Review uses exact candidate SHA | N/A - review is out of scope. | Independent review is separate. |
| Certification uses exact approved SHA | N/A - certification is out of scope. | Certification is separate. |
| Governance-only workflow/review/certification commits | PASS | Gate 1+2 changes are governance/report-only. |
| Dirty-worktree baseline excluded | PASS | Table Talk baseline remains excluded. |
| External tracker matches repository | N/A - Excel tracker is external and not modified in this window. | Repository state is authoritative for this task. |

No `FAIL` or `UNKNOWN` scorecard result is present.

### Gate 1+2 Decision

REMEDIATION AUTHORIZED

Remediation is authorized under CRIT-001 Contract v1.1 using existing listed/local Simic sources. Gate 3+4 must stop if exact locators cannot support retained wording, if discovery/support contamination cannot be removed without builder/schema changes, if frozen placement/confidence/calibration/lateral-target/generic-collision fields drift, if required provenance IDs/hashes remain null, or if candidate-scope validation fails for non-display-source reasons.

### Gate 1+2 Validation

- `git status --short --branch`: correct branch and allowed Table Talk baseline only.
- Raw Simic JSON parse checks: passed.
- `node research/audit-semantic-readiness.mjs --targets=UG`: completed; reported 17 claims, 0 substantive, 10 discovery, 0 support, 7 unclassified, 42 reference sites, and expected invalid proof-chain risk.
- `node research/validate-semantic-readiness.mjs --targets=UG`: failed as expected for missing semantic roles, missing recruiter evidence mappings, invalid authoritative proof chains, and missing fixtures.
- Custom read-only chain/provenance/frozen-field scan: found no current duplicate claim IDs in audited Simic raw chains; found missing UG fixtures, 31 null UG canonical IDs, 26 discovery-backed generated provenance chains, and the frozen calibration/lateral baseline listed above.

### Gate 3+4 Constraints

- Do not use discovery-only story rows as proof for identity, placement, public copy, recruiter guidance, generated key figures, semantic readiness, or provenance chains.
- Retain native/history IDs only as explicit metadata/history when required.
- Do not add online source intake unless a blocker is reported and separately approved.
- Do not change Contract v1.1, schemas, builders, validators, Hall, Crucible, scoring, confidence behavior, calibration, scheduling, tie-order, or global recruiter behavior.
- Preserve confidence, calibration, lateral targets, and absent generic collision target.
- Preserve the active Table Talk baseline and exclude it from every VM-516 commit.

## Gate 3+4 Remediation And Validation - 2026-07-17

Decision: `REMEDIATION COMPLETE`

Gate 3+4 remediated Simic by making the authoritative packet explicit under Contract v1.1 and then regenerating the consumed surfaces.

Changed implementation files:

- `data/raw-factions/simic_combine/simic_combine.claims.json`
- `data/raw-factions/simic_combine/simic_combine.profile.json`
- `data/raw-factions/simic_combine/simic_combine.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/simic_combine.semantic-fixtures.json`

Final claim-role counts:

- 33 total claims.
- 23 `substantive_claim`.
- 10 `discovery_record`.
- 0 `support_record`.
- 0 unclassified.

Role and evidence changes:

- Claims `simic_combine_claim_001` through `simic_combine_claim_007` were made substantive with bounded evidence locations and `evidence_scope`.
- Claims `simic_combine_claim_0008` through `simic_combine_claim_0017` were isolated as discovery records with no authoritative semantic use.
- New claims `simic_combine_claim_0018` through `simic_combine_claim_0033` cover bounded placement, pressure behavior, required-neighbor boundaries, generic-UG overfit, and Momir Vig history where official local sources support them.
- Discovery IDs are retained only as raw discovery metadata under `profile.data_quality.corpus_upgrade`; they do not prove identity, placement, public copy, recruiter guidance, fixtures, or generated provenance.
- Commander Compass source bases now use substantive official-source claim IDs only and state their auxiliary/non-authoritative boundary.

Generated-consumed changes:

- `data/factions.json` Simic public copy was narrowed away from stale generic UG/mechanic-first/high-heat wording and away from discovery-backed key figures.
- `data/placement-model.json` preserves frozen confidence, calibration, lateral targets, and absent generic collision target while adding source-bounded Simic guidance.
- `supabase/functions/guild-recruiter/faction-context.ts` regenerated with bounded UG recruiter context.
- `data/semantic-readiness-provenance.json` now has 72 UG entries, 0 required null canonical IDs, 0 null canonical content hashes, 0 unresolved pointers, and 0 duplicate canonical entries.

Exact-chain proof:

| Locator | Generated count | Fixture count | Exact ordered equality | Duplicates | Missing IDs | Extra IDs |
|---|---:|---:|---|---|---|---|
| `data/raw-factions/simic_combine/simic_combine.profile.json#/core_identity` | 8 | 8 | PASS | none | none | none |
| `data/raw-factions/simic_combine/simic_combine.placement.json#/placement_summary` | 10 | 10 | PASS | none | none | none |

Frozen-field proof:

- `placement_quality.overall_confidence`: `Medium`, unchanged.
- Required positive terms, minimum hits, broad penalty, strengthen list, suppress list, calibrated primary read, and calibrated false-positive guardrail: unchanged.
- Generated lateral targets remain `QUANDRIX`, `UR`, `WITHERBLOOM`, `TEMUR`, `SULTAI`.
- Generated generic collision target remains absent.
- Native IDs for faction, characters, questions, axis, and pre-existing collision rows were retained.
- Added `lateral_inhibition: false` rows remain non-inhibiting and did not feed generated lateral targets.

Validation evidence:

- JSON parse checks for changed JSON files: PASS.
- Explicit role/evidence-scope check: PASS, no substantive claim lacks `evidence_scope`.
- Discovery/support isolation check: PASS, no non-substantive claim ID appears in authoritative generated proof chains.
- Null ID/hash/unresolved/duplicate provenance checks: PASS.
- Exact fixture/provenance comparison: PASS.
- Stale public/recruiter-copy scan: PASS; remaining high-risk terms appear only in bounded/negative guardrail contexts.
- Frozen-field and native-ID comparisons: PASS.
- Deterministic generation: PASS, repeated `npm.cmd run build:factions` produced stable hashes.
- `node research/audit-semantic-readiness.mjs --targets=UG`: PASS.
- `node research/validate-semantic-readiness.mjs --targets=UG`: PASS.
- `node research/semantic-candidate-scope-tests.js`: PASS.
- `npm.cmd run test:semantic-readiness`: PASS.
- `npm.cmd run test:placement`: PASS.
- `npm.cmd run test:faction-context-isolation`: PASS.
- `npm.cmd run test:source-generated`: PASS with known unrelated JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test`: PASS.
- `git diff --check`: PASS; line-ending warnings only.

## Gate 5 Candidate Workflow - 2026-07-17

Final status: `awaiting independent review`

Gate 5 candidate history:

| Candidate SHA | Status | Reason |
|---|---|---|
| `f4afb9d5d769c72e1c86df189729423a380629af` | superseded | Post-commit candidate-scope validation rejected added confidence fields under behavioral signals and inhibitor traits. |
| `204cf9e6be15f2c3ac59a36c3977efea9a9945ce` | superseded | Post-commit candidate-scope validation rejected core-values confidence drift. |
| `cbca9f596a090e924d532e7cb657c27c79ccb9de` | final candidate awaiting independent review | Exact candidate-scope validation passed. |

Candidate-scope command:

`node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=cbca9f596a090e924d532e7cb657c27c79ccb9de --identity=UG`

Result:

`Semantic candidate scope passed for UG: 06f140a1e78a24d6c549943d6beb471f4e714302..cbca9f596a090e924d532e7cb657c27c79ccb9de`

Candidate scorecard:

| Control | Result |
|---|---|
| Roles complete | PASS |
| Evidence scopes complete | PASS |
| Discovery/support isolated | PASS |
| IDs and hashes valid | PASS |
| Exact fixture/provenance parity | PASS |
| Confidence unchanged | PASS |
| Native IDs unchanged | PASS |
| Required terms/minimum hits/penalty unchanged | PASS |
| Strengthen/suppress unchanged | PASS |
| Lateral targets unchanged | PASS |
| Generic collision target still absent | PASS |
| Calibration unchanged | PASS |
| Canonical-only proof chains | PASS |
| Public/recruiter alignment | PASS |
| No unrelated identity drift | PASS |
| Deterministic generation | PASS |
| Full validation | PASS |
| Table Talk excluded | PASS |

No independent review was performed. No approval decision was issued. Simic is not certified, not semantically_ready, the CRIT-001 program base remains `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`, VM-517 has not started, and the external tracker was not modified.

## Independent Review - 2026-07-17

- Reviewer: Codex independent review window.
- Program base: `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`
- Drift-control governance: `bb424a64787977baa45c67f1459babab64b1d3c7`
- Drift-preflight commit: `851f4b604459073bd739ec10d3f278f90f4069c3`
- Review base: `06f140a1e78a24d6c549943d6beb471f4e714302`
- Superseded candidates: `f4afb9d5d769c72e1c86df189729423a380629af`, `204cf9e6be15f2c3ac59a36c3977efea9a9945ce`
- Exact final candidate reviewed: `cbca9f596a090e924d532e7cb657c27c79ccb9de`
- Workflow-record commit checked: `04510577b7f3e1c4bacc5f2a88018b461760a80a`
- Decision: `REQUEST CHANGES`
- Certification: not performed.
- `semantically_ready`: not set.
- Program base: not advanced.
- VM-517: not started.

### Review Finding

#### BLOCKER - Approval Blocking

Stale preview-eligible Simic public copy remains in the identity-layer display surfaces.

Evidence:

- `data/identity-layers.json#/expressions/UG/preview_text` remains: `Simic blends Green growth with Blue knowledge. It values mutation, research, guided evolution, optimization, and becoming.`
- `data/factions.json#/identity_layers/expressions/UG/preview_text` duplicates the same text.
- The exact candidate did not change `data/identity-layers.json`, and `data/factions.json` preserved the embedded identity-layer preview text even while the main `factions.UG` copy was narrowed.
- Repository precedent treats `data/identity-layers.json` as a runtime/display authority for preview surfaces, and prior CRIT-001 recoveries corrected target-scoped identity-layer stale public copy as display-source exceptions.

Contract and drift-control impact:

- The public/generated Simic preview still overfits generic UG mutation, research, guided evolution, optimization, and becoming language without the source-bounded living-system, clade, medicine, public-health, or adaptation context used in the corrected raw profile, placement model, and recruiter context.
- This fails the drift-control `Public/recruiter copy aligned` checkpoint and the prompt requirement to inspect `data/identity-layers.json`, even if unchanged, to confirm no stale Simic representation remains.
- Automated candidate-scope and semantic-readiness validators passed, but those passes do not override the manual public-surface drift control.

Required remediation:

- Narrow or replace the UG identity-layer preview copy in the display source so it aligns with source-bounded Simic semantics.
- Regenerate or otherwise ensure the embedded `data/factions.json` identity-layer preview matches the corrected display source.
- Record any target-scoped display-source exception if candidate-scope requires it.
- Re-run deterministic generation, exact candidate-scope validation, stale-copy scans, and the required CRIT-001 validation suite in a replacement candidate sequence.

### Review Evidence

- Preflight matched expected worktree, branch, current HEAD, candidate SHA, workflow-record SHA, drift-control SHA, drift-preflight SHA, Gate 1+2 SHA, program base SHA, and ancestry.
- Active worktree contained only the allowed Table Talk baseline before review.
- Candidate file scope was Simic raw/generated/recruiter/fixture only; workflow-record diff was governance-only and excluded from semantic review.
- Superseded candidate 1 reproduced added confidence fields under behavioral signals and inhibitor traits; final candidate removed those fields.
- Superseded candidate 2 reproduced missing core-values confidence fields; final candidate restored the Gate 1+2 confidence path baseline.
- Initial Gate 1+2 raw stored claims: 17 total, all unassigned. Final candidate claims: 33 total, 23 `substantive_claim`, 10 `discovery_record`, 0 `support_record`, 0 unclassified.
- Source hierarchy verified: two claim-bearing official sources, one support-only mechanics source, and ten discovery-only story/archive records.
- Every substantive claim has bounded evidence locations with `evidence_scope`; evidence-location source sets exactly match declared claim `source_ids`.
- Discovery-story IDs appear only in the explicit `/data_quality/corpus_upgrade` `discovery_metadata` row with authoritative-use restriction; no discovery/support records appear in default semantic profile, placement, fixture, generated public-copy, or recruiter proof chains.
- UG provenance verified: 72 entries, zero required null canonical IDs, zero null canonical content hashes, zero unresolved pointers, zero duplicate canonical entries.
- Fixture/provenance exact-chain checks passed for `profile.json#/core_identity` and `placement.json#/placement_summary`.
- Frozen confidence/calibration/native-ID checks passed: confidence remains `Medium`, required terms/minimum hits/broad penalty/strengthen/suppress lists are unchanged, lateral targets remain `QUANDRIX`, `UR`, `WITHERBLOOM`, `TEMUR`, `SULTAI`, and generated generic collision target remains absent.
- Required-neighbor guidance is present and testable for `GENERIC_UG_OVERFIT`, `U`, `G`, `UR`, `BG`, `WG`, `RG`, `UB`, `QUANDRIX`, `WITHERBLOOM`, `BANT`, `TEMUR`, and `SULTAI`.
- Main generated public/recruiter surfaces were narrowed appropriately, but the identity-layer preview surface remains stale and blocks approval.

### Review Validation

- JSON parse checks for changed JSON files - passed.
- Explicit final claim-role count - passed: 33 total, 23 substantive, 10 discovery, 0 support, 0 unclassified.
- Explicit substantive evidence-scope and source-ID equality check - passed.
- Discovery/support isolation check - passed for authoritative/default semantic chains; discovery metadata row is non-authoritative and explicitly marked `discovery_metadata`.
- Null canonical-ID/hash, unresolved-pointer, and duplicate canonical-entry checks - passed for 72 UG provenance entries.
- Exact fixture/provenance comparison - passed for `/core_identity` and `/placement_summary`.
- Stale public/recruiter-copy scan - failed for preview-eligible identity-layer display copy at `data/identity-layers.json#/expressions/UG/preview_text` and embedded `data/factions.json#/identity_layers/expressions/UG/preview_text`.
- Frozen-field comparisons - passed.
- Native-ID review - passed; Vorel remains retained native metadata only, not authoritative key-figure proof.
- `npm.cmd run build:factions` - passed twice with no generated diff.
- `node research/audit-semantic-readiness.mjs --targets=UG` - passed; reported 33 claims, 23 substantive, 10 discovery, 0 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=UG` - passed.
- `node research/semantic-candidate-scope-tests.js` - passed.
- `npm.cmd run test:semantic-readiness` - passed; verified 1787 semantic provenance entries.
- `npm.cmd run test:placement` - passed for 37 factions and 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with unchanged unrelated JESKAI/MARDU model-owned inhibitor warnings only.
- `npm.cmd test` - passed.
- `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=cbca9f596a090e924d532e7cb657c27c79ccb9de --identity=UG` - passed.
- `git diff --check` - passed with line-ending warning for the shared handoff index only.

### Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | `codex/vm-516-simic-semantic-recovery`, `04510577b7f3e1c4bacc5f2a88018b461760a80a` |
| Correct program base | PASS | `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3` |
| Exact candidate isolated | PASS | Reviewed only `cbca9f596a090e924d532e7cb657c27c79ccb9de` |
| Superseded candidates excluded | PASS | Both superseded candidates inspected and not approved |
| Candidate and workflow commits separated | PASS | Candidate-to-workflow diff governance-only |
| Candidate file scope justified | PASS | Simic raw/generated/recruiter/fixture only |
| Source hierarchy verified | PASS | Official claim-bearing, support-only, and discovery-only roles confirmed |
| Claim-role counts verified | PASS | 33 / 23 / 10 / 0 / 0 |
| Evidence scopes verified | PASS | No substantive claim missing `evidence_scope` |
| Discovery/support isolated | PASS | Discovery row limited to `discovery_metadata` data-quality container |
| Canonical IDs and hashes valid | PASS | 72 UG entries, zero null IDs/hashes |
| Proof chains canonical-only | PASS | Default semantic chains use substantive claims only |
| Fixture/provenance exact equality | PASS | `/core_identity` and `/placement_summary` match exactly |
| Confidence unchanged | PASS | Final candidate confidence paths match Gate 1+2 |
| Native IDs unchanged | PASS | Retained native metadata preserved where not authoritative |
| Required terms unchanged | PASS | Required positive terms match Gate 1+2 |
| Minimum hits unchanged | PASS | `2` |
| Penalty unchanged | PASS | `0.1` |
| Strengthen/suppress unchanged | PASS | Lists match Gate 1+2 |
| Lateral targets unchanged | PASS | `QUANDRIX`, `UR`, `WITHERBLOOM`, `TEMUR`, `SULTAI` |
| Generic collision target remains absent | PASS | No generated generic collision target |
| Calibration unchanged | PASS | Calibration tuning matches Gate 1+2 |
| Public/recruiter copy aligned | FAIL | Identity-layer preview public copy remains stale |
| Required neighbors distinguished | PASS | Testable boundaries present |
| Deterministic generation | PASS | Two `build:factions` runs left no diff |
| Candidate-scope command passes | PASS | Exact command passed |
| No unrelated identity drift | PASS | No Jeskai/Mardu candidate changes; warnings unchanged |
| Table Talk baseline excluded | PASS | Baseline preserved and uncommitted |
| Reviewed truth reconciled with implementation summary | FAIL | Implementation stale-copy scan reported PASS, but review found stale identity-layer preview copy |
| No VM-517 work | PASS | Not started |

Because the scorecard contains `FAIL`, approval is blocked.

### Final Review Decision

`REQUEST CHANGES`

Simic is not approved, not certified, not `semantically_ready`, and VM-517 has not started.

## Replacement Candidate Remediation - 2026-07-17

### Scope

This remediation responds only to the independent review blocker for stale preview-eligible Simic public copy.

Rejected candidate: `cbca9f596a090e924d532e7cb657c27c79ccb9de`
Request-changes review record: `4da00dc997162ad609e84a77f6817c2ad0726dbc`
Replacement candidate: `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`
Replacement workflow record: `PENDING_VM516_REPLACEMENT_WORKFLOW_RECORD_COMMIT_SHA`

No independent review, approval, certification, `semantically_ready` transition, program-base advancement, or VM-517 work occurred in this remediation window.

### Preview Ownership

- Authoritative preview source: `data/identity-layers.json#/expressions/UG/preview_text`.
- Generated embedded consumer: `data/factions.json#/identity_layers/expressions/UG/preview_text`.
- Propagation path: `npm.cmd run build:factions` runs `research/build-faction-artifacts.mjs`, reads `data/identity-layers.json`, and embeds active identity-layer expressions into `data/factions.json`.
- `data/identity-layers.json` is a runtime/display registry authority for preview surfaces. It is not a Contract v1.1 canonical claim source and does not enter authoritative proof chains.
- The candidate-scope validator does not allow `data/identity-layers.json` by default and reports the embedded `data/factions.json` identity-layer block as unrelated/global. This is the documented target-scoped display-source exception required to remove stale public copy at its source without changing the shared validator.

### Remediation

Old preview:

`Simic blends Green growth with Blue knowledge. It values mutation, research, guided evolution, optimization, and becoming.`

Replacement preview:

`Simic studies life as living systems to heal, adapt, and improve through biology, clades, and public health.`

The replacement is source-bounded to already approved Simic substantive claims:

- `simic_combine_claim_001`: Simic is associated with biological research, adaptation, medicine, and experimental improvement.
- `simic_combine_claim_003`: Simic members include scientists, physicians, surgeons, and maintainers of public health.
- `simic_combine_claim_004`: Simic organization includes clades handling biological research.
- `simic_combine_claim_0018`: Simic motivation is improving living systems through study, medicine, adaptation, and iterative biological change.
- `simic_combine_claim_0020`: Generic UG value, mechanics, science language, or nature-plus-science aesthetics are not Simic proof without source-bounded living-system adaptation, biological research, medicine, clades, or improvement.

Files changed in the replacement candidate:

- `data/identity-layers.json`: replaces the UG preview source text.
- `data/factions.json`: regenerated embedded identity-layer preview from the corrected source.

No Simic raw claims/profile/placement, fixtures, provenance, placement model, recruiter context, runtime logic, schema, builder, validator, scoring, Hall, Crucible, scheduling, or unrelated identity files changed in the replacement candidate.

### Consumed-Surface Sweep

- Exact rejected text scan over consumed data/runtime surfaces (`data`, `supabase`, `research`) found no remaining matches after the replacement candidate.
- Historical governance records still quote the rejected sentence to preserve the review finding; those records are not consumed runtime/public surfaces.
- Semantic-equivalent preview shortcut scan found no remaining UG preview text using the rejected generic "Green growth with Blue knowledge", mutation, guided evolution, optimization, counters, mechanics, or generic-UG shortcut framing.
- Source-to-consumer equality passed: `data/identity-layers.json#/expressions/UG/preview_text` exactly equals `data/factions.json#/identity_layers/expressions/UG/preview_text`.
- Public/recruiter/generated Simic semantic surfaces remained unchanged from the rejected candidate except for the identity-layer preview fix already described.

### Replacement Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Exact blocker removed from authoritative preview source | PASS | `data/identity-layers.json#/expressions/UG/preview_text` now uses source-bounded living-system/clade/public-health wording |
| Embedded `data/factions.json` preview aligned | PASS | Embedded UG preview exactly matches `data/identity-layers.json` |
| Exact rejected sentence absent from consumed surfaces | PASS | `rg` over `data`, `supabase`, and `research` found no matches |
| Semantic-equivalent stale generic-UG preview absent | PASS | Preview no longer uses mutation/research/guided-evolution/optimization/becoming shortcut framing |
| Preview traceable to approved claims | PASS | Supported by `simic_combine_claim_001`, `003`, `004`, `0018`, and `0020` |
| Public, recruiter, identity-layer, and embedded surfaces agree | PASS | Only preview source/consumer changed; recruiter and core public copy remained aligned from rejected candidate |
| Source ownership documented | PASS | This section records ownership and propagation path |
| Generator-owned files regenerated | PASS | `npm.cmd run build:factions` regenerated the embedded consumer |
| Claim counts unchanged | PASS | 33 total, 23 substantive, 10 discovery, 0 support, 0 unclassified |
| UG provenance unchanged | PASS | 72 entries, zero null IDs/hashes, zero unresolved pointers, zero duplicate canonical entries |
| Discovery/support isolation preserved | PASS | No non-substantive IDs appear in authoritative/default proof chains |
| Fixture/provenance exact chains unchanged | PASS | `/core_identity` 8 IDs and `/placement_summary` 10 IDs remain exact ordered matches |
| Frozen confidence/calibration/native IDs unchanged | PASS | Placement-model and raw Simic semantic files are unchanged from rejected candidate; frozen comparison to Gate 1+2 passed |
| Lateral targets unchanged | PASS | `QUANDRIX`, `UR`, `WITHERBLOOM`, `TEMUR`, `SULTAI` |
| Generic collision target absent | PASS | Remains absent |
| Deterministic generation | PASS | Two `npm.cmd run build:factions` runs after the candidate commit left no generated diff |
| No unrelated identity drift | PASS | Candidate commit changes only UG preview source and embedded identity-layer preview |
| Table Talk excluded | PASS | Existing Table Talk handoff index/untracked baseline preserved and uncommitted |
| Candidate-scope command | PASS with documented display-source exception | Exact command reports only `data/identity-layers.json` and embedded `data/factions.json` identity-layer global-path findings, the expected target-scoped display-source exception |

No automated regression test was added because the existing candidate-scope validator freezes shared `research/` and code/test files for identity candidates. Adding or changing a shared validator/test would itself be non-identity scope drift. Permanent prevention is therefore recorded in the drift register and drift-control template as a mandatory manual consumed-preview control.

### Replacement Validation

- JSON parse checks for `data/identity-layers.json` and `data/factions.json`: passed.
- Source-to-embedded preview equality check: passed.
- Exact rejected-text scan across consumed data/runtime surfaces: passed with no matches.
- Semantic-equivalent stale-preview scan: passed.
- Explicit claim-role count: passed, 33 total / 23 substantive / 10 discovery / 0 support / 0 unclassified.
- Substantive evidence-scope check: passed.
- Discovery/support isolation check: passed for authoritative/default proof chains; discovery metadata remains confined to data-quality history.
- Null canonical-ID/hash, unresolved-pointer, and duplicate canonical-entry scan: passed for 72 UG provenance entries.
- Exact fixture/provenance checks: `/core_identity` 8 IDs exact ordered equality; `/placement_summary` 10 IDs exact ordered equality.
- Frozen confidence/native-ID/term/threshold/penalty/strengthen/suppress/lateral-target/generic-collision/calibration comparisons: passed.
- `npm.cmd run build:factions`: passed before commit and twice after commit; deterministic with no generated diff.
- `node research/audit-semantic-readiness.mjs --targets=UG`: passed.
- `node research/validate-semantic-readiness.mjs --targets=UG`: passed.
- `node research/semantic-candidate-scope-tests.js`: passed.
- `npm.cmd run test:semantic-readiness`: passed; verified 1787 semantic provenance entries.
- `npm.cmd run test:placement`: passed, 37 factions and 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: passed.
- `npm.cmd run test:source-generated`: passed with unchanged unrelated JESKAI/MARDU model-owned inhibitor warnings only.
- `npm.cmd test`: passed.
- `git diff --check`: passed with line-ending warnings only.
- `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e --identity=UG`: returned only the documented target-scoped display-source exception:
  - `identity candidate modified non-identity path data/identity-layers.json`
  - `unrelated or global data/factions.json content changed`

### Status

Replacement candidate `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e` is created and awaits fresh independent review. It is not approved, not certified, and not `semantically_ready`. The program base remains `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`. VM-517 has not started.

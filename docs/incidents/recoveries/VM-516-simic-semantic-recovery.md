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

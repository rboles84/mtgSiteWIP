# VM-517 - White Drift Preflight Control Record

Status: Governance hold. Gate 1+2 not authorized.

Identity: VM-517 - White / W
Contract: CRIT-001 Contract v1.1
Branch: `codex/vm-517-white-semantic-recovery`
Starting branch HEAD: `272337004aa63cfd33da5f1a859c33d211c8ca74`
Current CRIT-001 program base: `272337004aa63cfd33da5f1a859c33d211c8ca74`
Drift-control authority: `docs/incidents/CRIT-001-drift-control-template.md`
Preflight governance SHA: `PENDING_VM517_DRIFT_PREFLIGHT_COMMIT_SHA`

This record is a governance-only pre-identity drift preflight. It inventories current White structure and process readiness before Gate 1+2. It does not perform Gate 1+2 semantic adjudication, does not authorize remediation, and does not change White semantic, raw, generated, fixture, provenance, recruiter, preview, test, schema, validator, builder, scoring, calibration, or runtime files.

## A. Repository And Git State

| Control | Result | Evidence |
|---|---|---|
| Active worktree | PASS | `C:/dev/mtgSiteWIP-crit001` |
| Active branch | PASS | `codex/vm-517-white-semantic-recovery` |
| Starting HEAD | PASS | `272337004aa63cfd33da5f1a859c33d211c8ca74` |
| Program base | PASS | Required base is `272337004aa63cfd33da5f1a859c33d211c8ca74`; the current branch started exactly there. |
| Current HEAD descends from program base | PASS | `git merge-base --is-ancestor 272337004aa63cfd33da5f1a859c33d211c8ca74 HEAD` passed before this preflight commit. |
| Prior identity certified | PASS | Board, handoff, and ledger record VM-516 Simic / UG certified and semantically_ready. |
| Certified identity count | PASS | CRIT JSON ledger records 15 certified identities. |
| Wave 2 complete | PASS | Board and ledgers record Ravnica Wave 2 complete, 10 of 10 guild identities certified. |
| White setup-only before preflight | PASS | VM-517 card, board, and ledger recorded drift preflight pending with no White Gate 1+2, remediation, candidate, review, or certification started. |
| No VM-517 recovery record existed | PASS | `docs/incidents/recoveries/` had no `VM-517*` record before this file. |
| Active worktree baseline | PASS | Only allowed Table Talk baseline was dirty before edits: modified `docs/handoffs/HANDOFF_INDEX.md`, untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md`, and untracked `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`. |
| Original main baseline | PASS | `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` showed docs/workflow-only dirt: handoff index, board, audit/handoff/kanban/strategy docs; no raw, generated, semantic, fixture, provenance, data, test, schema, validator, builder, scoring, calibration, or runtime changes were observed. |
| VM-518 untouched | PASS | Search found only existing VM-518 backlog/ledger references; no VM-518 work was started. |

## B. Wave 3 And White Identity Resolution

| Item | Resolved value | Difference from recent guild pattern |
|---|---|---|
| Internal identity code | `W` | Single-color key rather than guild key such as `WB`, `WG`, or `UG`. Explained and allowed only if tooling supports it. |
| Validation target | `W` | `node research/audit-semantic-readiness.mjs --targets=W` recognizes the target. |
| Raw directory | `data/raw-factions/white/` | Monocolor raw directory uses color name `white`, not guild raw ID. |
| Raw identity/faction ID | `white` | Generated identity key is `W`; raw ID is lowercase color name. |
| Generated faction key | `data/factions.json#/factions/W` | Monocolor key under same generated object. |
| Placement-model key | `data/placement-model.json#/factions/W` | Monocolor key under same generated object. |
| Identity-layer key | `data/identity-layers.json#/expressions/W` | Monocolor key under shared identity-layer registry. |
| Embedded identity-layer consumer | `data/factions.json#/identity_layers/expressions/W` | DRIFT-015 preview consumer exists for W. |
| Provenance identity key | `data/semantic-readiness-provenance.json` entries with `identity_key: "W"` | Supported. |
| Fixture convention | Expected `research/fixtures/semantic-readiness/white.semantic-fixtures.json`; currently absent | Recent guild fixtures use raw IDs such as `simic_combine.semantic-fixtures.json`. |
| Recruiter key | `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/W` | Monocolor recruiter context exists. |
| Candidate-scope argument | `--identity=W` | Target normalization recognizes W, but candidate-scope validation crashes on White collision shape. |

Monocolor compatibility result: FAIL. The repository recognizes `W` for audit, validation, generated data, placement, identity-layer preview, provenance, recruiter context, and placement tests. However, exact candidate-scope validation with `--identity=W` is not process-ready because it throws:

`TypeError: (placement.collision_guidance || []).entries is not a function or its return value is not iterable`

Evidence: `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W` exited 1. The validator path `research/validate-semantic-candidate-scope.mjs` assumes raw `placement.collision_guidance` is an array, while White stores `collision_guidance` as an object with `rule`, `review_triggers`, and `pairs`.

This is an unexplained monocolor workflow incompatibility and stops Gate 1+2 authorization.

## C. White File And Source Inventory

Raw files:

- `data/raw-factions/white/white.claims.json`
- `data/raw-factions/white/white.sources.json`
- `data/raw-factions/white/white.profile.json`
- `data/raw-factions/white/white.placement.json`
- `data/raw-factions/white/white.changelog.json`

Generated and consumed surfaces:

- `data/factions.json#/factions/W`
- `data/placement-model.json#/factions/W`
- `data/identity-layers.json#/expressions/W`
- `data/factions.json#/identity_layers/expressions/W`
- `data/semantic-readiness-provenance.json` entries with `identity_key: "W"`
- `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/W`

Source inventory, as currently stored:

| Source ID | Type / tier | Stored role | Locator | Content hash present |
|---|---|---|---|---|
| `MONO-W-2015` | `gold_official_article` | `philosophy_backbone` | Wizards URL plus `docs/research/mono_upgrade/10_white.md` and local PDF | Yes, `local_pdf_sha256` |
| `MONO-W-2025` | `gold_official_article` | `current_voice_update` | Wizards URL plus `docs/research/mono_upgrade/10_white.md` and local PDF | Yes, `local_pdf_sha256` |
| `MECH-CP-2021` | `gold_official_article_snapshot` | `mechanical_authority` | Wizards URL plus `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md` and local PDF | Yes, `local_pdf_sha256` |
| `GOV-COC-2024` | `gold_official_article` | `governance_process_authority` | Wizards URL plus `docs/research/mono_upgrade/22_council_of_colors.md` and local PDF | Yes, `local_pdf_sha256` |
| `RULES-CR` | `gold_official_living_rules` | `commander_rules_boundary` | Wizards rules URL plus `docs/research/mono_upgrade/30_commander_and_rules.md` | No |
| `VM-377` | `vox_mana_planning_authority` | `project_governance` | Project governance locator only | No |
| `SCRYFALL-W-2026-06-13` | `current_card_database` | `current_card_legality_verification` | Current card database locator | No |

Existing governance records:

- `docs/kanban/backlog/VM-517-white-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## D. As-Is Claim And Evidence Baseline

This section records current stored values only. It does not decide whether any White claim is supported, sufficient, or correctly classified.

- Total claims: 8.
- Raw explicit `semantic_role` fields: none found.
- Raw explicit role counts: 0 `substantive_claim`, 0 `discovery_record`, 0 `support_record`, 8 unclassified/unassigned.
- Current CRIT JSON ledger computed role counts: 0 substantive, 0 discovery, 0 support, 8 unclassified.
- Live audit role counts: 0 substantive, 0 discovery, 0 support, 8 unclassified.
- Live audit source-role counts: 1 each of `philosophy_backbone`, `current_voice_update`, `mechanical_authority`, `governance_process_authority`, `commander_rules_boundary`, `project_governance`, and `current_card_legality_verification`.
- Raw/source-derived role mismatch: no claims have explicit Contract v1.1 semantic roles; claims cite source roles that are not the Contract role labels.
- Substantive evidence locations missing `evidence_scope`: 0 by explicit-role count; all 8 claims lack explicit `semantic_role`, so Gate 1+2 must inspect and later remediate if authorized.
- Claims lacking bounded evidence locations: all 8 claims lack claim-level `evidence_locations`; they use `source_ids`, `evidence_rows`, and `anchor_ids`.
- Discovery IDs in profile chains: none by current source roles.
- Discovery IDs in placement chains: none by current source roles.
- Discovery IDs in public/preview/recruiter mappings: none by current source roles.
- Support IDs in authoritative chains: none with Contract `support_record` role; non-Contract source roles appear in authoritative provenance and must be classified later.
- Required null canonical IDs: 3 White provenance entries have null `canonical_id` (`/core_identity`, `/mechanics`, `/profile`).
- Null content hashes: 0 White provenance entries.
- Unresolved claim/source pointers: 0 unresolved canonical file/pointer pairs found in current provenance.
- Duplicate canonical file/pointer entries: 0.
- Duplicate non-null canonical IDs: 0.
- Existing provenance count: 12 White entries.

## E. Fixture And Provenance Baseline

No White semantic fixture file exists at preflight time. Required fixture/provenance locators inferred from current provenance and recent fixture naming precedent are below.

| Locator | Generated count | Generated unique count | Fixture count | Fixture unique count | Exact ordered equality | Duplicates | Missing IDs | Extra IDs | Condition |
|---|---:|---:|---:|---:|---|---|---|---|---|
| `data/raw-factions/white/white.profile.json#/core_identity` | 8 | 8 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.profile.json#/mechanics` | 1 | 1 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.profile.json#/profile` | 8 | 8 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/placement_axes/0` | 2 | 2 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/placement_axes/1` | 3 | 3 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/placement_axes/2` | 1 | 1 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/0` | 3 | 3 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/1` | 3 | 3 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/2` | 1 | 1 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/3` | 2 | 2 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/collision_guidance/pairs/0` | 1 | 1 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |
| `data/raw-factions/white/white.placement.json#/collision_guidance/pairs/1` | 1 | 1 | N/A | N/A | N/A - fixture absent | none | N/A - fixture absent | N/A - fixture absent | Provenance exists; fixture absent. |

Gate 1+2 must adjudicate all 12 locators above if and only if the monocolor candidate-scope incompatibility is resolved in a separate authorized setup window.

## F. Frozen Placement And Scope Baseline

These values must be compared at candidate creation, independent review, and certification if White later receives authorization to proceed.

| Field path | Current value | Source file | Frozen or scope-sensitive checkpoint |
|---|---|---|---|
| `placement_summary` | `White is a strong fit when a user wants safety, peace, and group flourishing made repeatable through structure, duty, law, defense, and shared standards.` | `data/raw-factions/white/white.placement.json` | Candidate, review, certification |
| `calibration_tuning/required_positive_evidence_terms` | `group needs`, `shared rules`, `duty`, `peace`, `protection`, `law`, `community` | Raw placement and generated placement | Candidate, review, certification |
| `calibration_tuning/required_positive_min_hits` | `2` | Raw placement and generated placement | Candidate, review, certification |
| `calibration_tuning/broad_match_penalty` | `0.13` | Raw placement and generated placement | Candidate, review, certification |
| `calibration_tuning/strengthen_when_user_centers` | `reducing suffering through structure`, `fair process and accountability`, `coordinated small pieces`, `personal sacrifice for group safety` | Raw placement and generated placement | Candidate, review, certification |
| `calibration_tuning/suppress_when_user_centers` | `self-interest above duty`, `impulse above restraint`, `knowledge optimization without group floor`, `natural destiny over taught moral order` | Raw placement and generated placement | Candidate, review, certification |
| `calibration_tuning/false_positive_guardrail` | `Do not place White for generic kindness or safety alone; require structure, duty, or group-first obligation.` | Raw placement | Candidate, review, certification |
| `data/placement-model.json#/factions/W/lateral_inhibition_targets` | `WU`, `WB`, `WG`, `WR` | Generated placement | Candidate, review, certification |
| `collision_guidance` | Object with rule, review triggers, and 2 pairs: `white_vs_black` against `B`, `white_vs_red` against `R`; both have `lateral_inhibition: false`. | Raw and generated placement | Candidate, review, certification |
| Generic collision target | No explicit `GENERIC_W_OVERFIT` collision target currently present. | Raw and generated placement | Candidate, review, certification |
| Known targets | Generated lateral targets are `WU`, `WB`, `WG`, `WR`; raw collision pairs target `B` and `R`. | Raw and generated placement | Candidate, review, certification |
| Golden paths | 37 placement golden paths passed in `npm.cmd run test:placement`; no White-local golden-path field was found in raw placement. | Generated/test surfaces | Candidate, review, certification |
| Scoring/ranking parameters | No White-local scoring/ranking parameter field found beyond calibration fields above. Global scoring remains out of scope. | Raw/generated placement | Candidate, review, certification |

Native-ID baseline:

- `profile#/faction_id`: `white`
- `placement#/faction_id`: `white`
- `placement#/placement_axes/0/axis_id`: `axis_group_order`
- `placement#/placement_axes/1/axis_id`: `axis_care_as_infrastructure`
- `placement#/placement_axes/2/axis_id`: `axis_rigidity_risk`
- `placement#/discriminator_questions/0/question_id`: `white_disc_001`
- `placement#/discriminator_questions/1/question_id`: `white_disc_002`
- `placement#/discriminator_questions/2/question_id`: `white_disc_003`
- `placement#/discriminator_questions/3/question_id`: `white_disc_004`
- `placement#/collision_guidance/pairs/0/collision_id`: `white_vs_black`
- `placement#/collision_guidance/pairs/1/collision_id`: `white_vs_red`

## G. Identity-Layer Preview Baseline

DRIFT-015 preview ownership controls are applied here without rewriting or adjudicating the preview.

- Authoritative preview source: `data/identity-layers.json#/expressions/W/preview_text`.
- Embedded preview consumer: `data/factions.json#/identity_layers/expressions/W/preview_text`.
- Current preview text: `White values structure, protection, community, duty, and shared stability. It asks how life can be made safer through order.`
- Preview source type: display authority / identity-layer source, not canonical evidence.
- Source-to-consumer equality: PASS; the two strings are exactly equal.
- Additional embedded consumer: recruiter context contains White public/recruiter copy under `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/W`.
- Propagation command: `npm.cmd run build:factions` is the repository-supported generation command for later authorized windows.
- Exception requirement: any future change to `data/identity-layers.json#/expressions/W/preview_text` or its embedded `data/factions.json` copy must be documented as a target-scoped display-source exception and checked manually because DRIFT-015 covers this surface.
- Stale-copy validator/manual coverage: planned matrix below retains exact and semantic-equivalent preview searches.

## H. Required Neighbor Declaration

Gate 1+2 must inspect at least the following neighbors after this STOP condition is resolved. This preflight declares scope only and does not write final semantic discriminators.

| Neighbor | Declaration reason |
|---|---|
| `GENERIC_W_OVERFIT` | White must not collapse into generic goodness, safety, order, rules, lifegain, exile, protection, tokens, stax, or broad morality. |
| Azorius / `WU` | White law/order can collapse into white-blue procedure, bureaucracy, or optimization. |
| Boros / `WR` | White duty and protection can collapse into red-white military justice or urgent action. |
| Orzhov / `WB` | White obligation, institutions, and order can collapse into white-black debt, hierarchy, or transactional duty. |
| Selesnya / `WG` | White community and protection can collapse into green-white harmony, belonging, or natural community. |
| Silverquill | White-black school identity can overlap through rhetoric, status, moral framing, and social pressure. |
| Lorehold | White-red school identity can overlap through tradition, history, duty, and spirited action. |
| Bant | Broader WUG order/community/nature can absorb mono-White if the boundary is not explicit. |
| Esper | Broader WUB control, hierarchy, perfection, and structure can absorb mono-White. |
| Mardu | Broader WBR duty, war, honor, and decisive order can absorb mono-White. |
| Naya | Broader WRG community, creatures, and celebratory life can absorb mono-White. |
| Abzan | Broader WBG endurance, family, duty, and institutions can absorb mono-White. |
| Mono-Blue / `U` | White planning/order can be mistaken for blue optimization or knowledge systems. |
| Mono-Black / `B` | White-black opposition is already a collision pair; self-interest versus group obligation must be tested. |
| Mono-Red / `R` | White-red opposition is already a collision pair; restraint versus impulse/action must be tested. |
| Mono-Green / `G` | White community/order can overlap with green interdependence or destiny. |

## I. White Semantic-Risk Declaration

Gate 1+2 must inspect these risks later without this preflight deciding their disposition:

- Generic good, morality, virtue, altruism, heroism, benevolence, or correctness.
- Generic order, law, rules, structure, duty, discipline, peace, fairness, justice, equality, protection, community, civilization, cooperation, or safety.
- Generic religion, faith, purity, angels, soldiers, knights, armies, governments, churches, or institutions.
- Lifegain, tokens, go-wide, vigilance, protection, exile, board wipes, equipment, taxes, stax, or combat mechanics treated as identity.
- White defined solely through collectivism, authority, altruism, oppression, selflessness, conformity, benevolence, or authoritarian control.
- Claims that erase White's internal tension between protection and rigidity.
- Mono-white language collapsing into Azorius procedure, Boros military justice, Orzhov obligation, Selesnya harmony, Silverquill status, Lorehold tradition, Bant/Esper/Mardu/Naya/Abzan broader identity.
- Discovery, support, governance, rules, Scryfall, or mechanical material promoted into authoritative semantic proof without Contract v1.1 role adjudication.
- Null canonical IDs, missing fixture, stale recruiter/public/preview copy, and frozen placement/scope drift.
- Monocolor candidate-scope validation failure caused by raw collision-guidance shape.

## J. Workflow Regression Comparison

Compared against VM-514 Orzhov, VM-515 Selesnya, VM-516 Simic, DRIFT-015 preview precedent, Gruul exact-chain precedent, Dimir/Orzhov frozen-field precedent, and the installed drift register.

| Question | Result | Evidence | Difference and disposition |
|---|---|---|---|
| Did the Gate 1+2 read-only boundary change? | PASS | Playbook and template still require read-only Gate 1+2. | No reduction. |
| Did Gate 1+2 governance separation change? | PASS | Gate 1+2 remains governance/report-only before remediation. | No reduction. |
| Did candidate/workflow/review/certification separation change? | PASS | Template preserves separate candidate, workflow, review, and certification objects. | No reduction. |
| Did exact-SHA discipline change? | PASS | Template requires exact candidate SHA review and exact approved candidate certification. | No reduction. |
| Did validation coverage shrink? | PASS | Planned matrix retains recent commands and adds monocolor compatibility checks. | No reduction. |
| Did exact-chain coverage shrink? | PASS | Preflight records White locators/counts/fixture absence. | No reduction. |
| Did frozen-field checking shrink? | PASS | Preflight records confidence-sensitive placement, calibration, native IDs, lateral targets, collision fields, known targets, and preview fields. | No reduction. |
| Did authoritative proof-chain inspection shrink? | PASS | Preflight records current non-Contract roles, authoritative provenance locators, null IDs, and missing fixture. | No reduction. |
| Did identity-layer preview inspection shrink? | PASS | DRIFT-015 source, consumer, text, equality, and exception rules are recorded. | No reduction. |
| Did consumed-surface stale-copy checking shrink? | PASS | Planned matrix includes public/recruiter/preview exact and semantic-equivalent stale-copy scans. | No reduction. |
| Did candidate-scope validation shrink? | FAIL | The exact `--identity=W` candidate-scope probe crashed on White raw collision-guidance shape. | Monocolor incompatibility is not explained as allowed; Gate 1+2 is not authorized. |
| Did dirty-worktree isolation change? | PASS | Allowed Table Talk baseline remains enumerated and excluded. | No reduction. |
| Did superseded-candidate handling change? | PASS | Template and matrix preserve superseded-candidate handling. | No reduction. |
| Did reviewed/generated truth reconciliation change? | PASS | Template and drift register remain mandatory. | No reduction. |
| Did the meaning of candidate, workflow record, review record, certification, or program base change? | PASS | Program base remains `272337004aa63cfd33da5f1a859c33d211c8ca74`; this preflight commit will not become certification/program base. | No reduction. |
| Does the monocolor model introduce a new path or field not covered by controls? | FAIL | White raw `collision_guidance` uses an object-with-`pairs` shape; candidate-scope validator assumes array iteration at the top level. | Unexplained incompatibility; stop the line. |

## K. Planned Validation Matrix For Later White Work

The later White setup-fix/preflight and any future Gate 1+2/Goal mode or review must run or record repository equivalents of:

- JSON parse checks.
- Explicit claim-role counts.
- Substantive `evidence_scope` checks.
- Discovery isolation.
- Support isolation.
- Null canonical-ID/hash scan.
- Unresolved-pointer scan.
- Duplicate canonical-entry scan.
- Fixture/provenance exact-chain comparison.
- Frozen placement comparison.
- Native-ID comparison.
- Required-term and threshold comparison.
- Penalty comparison.
- Strengthen/suppress comparison.
- Lateral and collision-target comparison, including White object-with-`pairs` raw collision shape.
- Calibration comparison.
- Authoritative proof-chain inspection.
- Public/recruiter stale-copy scan.
- Identity-layer preview ownership check.
- Preview source-to-embedded equality.
- Exact and semantic-equivalent stale-preview searches.
- `npm.cmd run build:factions`.
- `node research/audit-semantic-readiness.mjs --targets=W`.
- `node research/validate-semantic-readiness.mjs --targets=W`.
- `node research/semantic-candidate-scope-tests.js`.
- `node research/validate-semantic-candidate-scope.mjs --base=<VM517_GATE_1_2_SHA> --target=<VM517_CANDIDATE_SHA> --identity=W`.
- `npm.cmd run test:semantic-readiness`.
- `npm.cmd run test:placement`.
- `npm.cmd run test:faction-context-isolation`.
- `npm.cmd run test:source-generated`.
- `npm.cmd test`.
- `git diff --check`.

Candidate-only checks requiring a candidate were not run in this preflight. The no-diff candidate-scope support probe did run and failed with a TypeError, which blocks Gate 1+2 authorization until resolved in a separate authorized setup/governance path.

## L. Pre-Gate 1+2 Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch and starting HEAD match required values. |
| Correct program base | PASS | Program base is `272337004aa63cfd33da5f1a859c33d211c8ca74`; current branch started exactly there. |
| One identity active | PASS | Ledger active identity is `W`; WIP limit is 1. |
| Prior identity certified | PASS | Simic / UG is certified and semantically_ready. |
| Wave 2 complete | PASS | Board and ledgers record 10 of 10 Ravnica guilds certified. |
| White setup-only | PASS | No White semantic audit, remediation, candidate, review, or certification existed before this record. |
| Allowed worktree baseline enumerated | PASS | Table Talk dirty baseline is listed exactly and excluded. |
| White target code resolved | PASS | Target is `W`; raw ID is `white`. |
| Monocolor pipeline support verified | FAIL | Candidate-scope validator crashes for `--identity=W` because White raw collision guidance is object-shaped. |
| Source/file inventory complete | PASS | Raw, generated, provenance, recruiter, fixture, and governance surfaces are inventoried. |
| Current claim-role baseline recorded | PASS | Raw explicit roles and ledger/live audit role counts are recorded. |
| ID/hash/pointer baseline recorded | PASS | Current source hash presence, null provenance IDs, hashes, unresolved pointers, and duplicates are recorded. |
| Fixture/provenance locators recorded | PASS | All 12 current White provenance locators are recorded. |
| Exact-chain as-is state recorded | PASS | Generated counts/unique counts and fixture-absent state are recorded. |
| Frozen fields recorded | PASS | Placement summary, calibration, terms, thresholds, penalties, lists, lateral targets, collision targets, native IDs, and preview fields are recorded. |
| Native IDs recorded | PASS | Current raw native IDs are listed. |
| Lateral and collision fields recorded | PASS | Generated lateral targets and raw/generated collision fields are recorded, including raw object shape. |
| Preview ownership recorded | PASS | Source path and embedded consumer path are recorded. |
| Preview consumers and equality recorded | PASS | `data/identity-layers.json` and `data/factions.json` W preview texts are exactly equal. |
| Required neighbors declared | PASS | Required White-adjacent neighbors are declared. |
| Semantic risks declared | PASS | White semantic-risk declaration is recorded. |
| Validation matrix not reduced | PASS | Later White matrix records required commands and manual controls. |
| Gate boundaries unchanged | PASS | This record confirms Gate 1+2 did not start and remediation is not authorized. |
| Exact-SHA rules unchanged | PASS | Candidate/review/certification exact-SHA discipline is preserved. |
| Commit separation unchanged | PASS | This is a governance-only preflight commit; candidate/review/certification remain separate. |
| Superseded-candidate rules retained | PASS | Template and matrix require preservation of superseded candidates. |
| Reviewed/generated truth reconciliation retained | PASS | Template and drift register remain mandatory. |
| No White semantic edit | PASS | No White semantic/raw/generated/provenance/fixture/runtime files are changed by this preflight. |
| No Gate 1+2 audit | PASS | Only preflight inventory/control checks occurred. |
| No VM-518 work | PASS | VM-518 remains untouched. |
| External tracker untouched | PASS | External Excel tracker was not modified. |
| Candidate-only scope validation | N/A - no candidate exists in this preflight; the required future command template is recorded. | Candidate-scope validation starts after a candidate SHA exists. |
| Generation determinism | N/A - generation is not run in this governance-only preflight because it could modify generated files. | Later authorized work must prove determinism after generation. |

`FAIL` control results are present. White Gate 1+2 is not authorized.

## M. Final Preflight Decision

STOP - WHITE GATE 1+2 NOT AUTHORIZED

Reason: monocolor candidate-scope validation is not process-ready for White. The exact `--identity=W` command crashes on the current raw `collision_guidance` object-with-`pairs` shape. This is a Wave 3 transition control failure and must be resolved by a separately authorized governance/setup window before any White Gate 1+2 semantic audit begins.

## N. Preflight Validation Run

Commands and checks actually run in this preflight:

- `git status --short`: confirmed only the allowed Table Talk baseline before edits.
- `git branch --show-current`: confirmed `codex/vm-517-white-semantic-recovery`.
- `git rev-parse HEAD`: confirmed starting HEAD `272337004aa63cfd33da5f1a859c33d211c8ca74`.
- `git merge-base --is-ancestor 272337004aa63cfd33da5f1a859c33d211c8ca74 HEAD`: PASS.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short`: PASS for original-main docs/workflow-only baseline.
- `node research/audit-semantic-readiness.mjs --targets=W`: PASS; target W recognized.
- `node research/validate-semantic-readiness.mjs --targets=W`: expected FAIL for current pre-remediation blockers, not target-recognition failure.
- `node research/semantic-candidate-scope-tests.js`: PASS.
- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W`: FAIL with TypeError; recorded as the stop-the-line monocolor compatibility finding.
- `npm.cmd run test:source-generated`: PASS with unchanged JESKAI/MARDU warnings.
- `npm.cmd run test:placement`: PASS, 37 factions and 37 golden paths.
- Governance JSON parse check: PASS for `docs/incidents/CRIT-001-identity-recovery-ledger.json`.
- Markdown/path checks: PASS for the VM-517 preflight record, handoff, and canonical drift template paths.
- Search for canonical drift template reference: PASS.
- Search for preview ownership and consumer paths: PASS.
- Scorecard row-result and N/A-explanation script: PASS; rows have `PASS`, `FAIL`, or `N/A - ...`, and the final STOP decision matches the FAIL controls.
- Search for blocked/not-authorized/remediation-not-authorized governance state: PASS.
- Staged-file scope inspection: PASS; staged files are governance-only.
- Handoff-index hunk inspection: PASS; only the VM-517 row is staged, while the Table Talk rows remain unstaged.
- `git diff --check`: PASS with the known CRLF warning for the shared handoff index.
- `git diff --cached --check`: PASS.

## O. Not Performed

- No Gate 1+2 semantic adjudication occurred.
- No claim support decision was made.
- No claim role was changed.
- No evidence scope was added.
- No White raw, generated, fixture, provenance, recruiter, preview, test, schema, validator, builder, scoring, calibration, or runtime file was modified.
- No remediation was authorized.
- No generation was run for committed changes.
- No fixture was created.
- No candidate was created.
- No independent review was performed.
- No certification occurred.
- VM-518 was not started.
- Original main was not modified.
- External Excel tracker was not modified.

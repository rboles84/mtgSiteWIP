# VM-519 Black Drift Preflight

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: VM-519 - Black / B
Cohort: Wave 3 monocolors
Branch: `codex/vm-519-black-semantic-recovery`
Starting HEAD: `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`
Current CRIT-001 program base: `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`
Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
Preflight decision: `PASS - BLACK GATE 1+2 AUTHORIZED`

This is a governance-only pre-identity drift preflight. It records the as-is Black baseline and process readiness only. No Gate 1+2 semantic audit, source-role adjudication, claim adjudication, remediation, generation, fixture creation, candidate, independent review, certification, program-base advancement, VM-520 work, original-main edit, Excel update, or Table Talk commit occurred.

## A. Preflight State

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | Active worktree is `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `git branch --show-current` returned `codex/vm-519-black-semantic-recovery`. |
| Starting HEAD | PASS | `git rev-parse HEAD` returned `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`. |
| Program base | PASS | Required current certification/program base is `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`; this preflight does not advance it. |
| Ancestry | PASS | `git merge-base HEAD 04547ecfc52d1c96537b6375e9d5c4b8f3690a32` returned the same SHA. |
| Certified count | PASS | CRIT ledgers and board record 17 certified identities. |
| Wave 3 status | PASS | Wave 3 monocolors remain 2 of 5 certified. |
| Prior identity certified | PASS | Blue / U is certified `semantically_ready` from approved candidate `ac774e2eac207cc7fe2d744beac1f11788908159`; approval review `7a000a6c8919b45238810b0a30020da74e050a7f`; certification/program-base commit `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`. |
| Black setup-only | PASS | No VM-519 Gate 1+2 report, candidate, review, certification, `semantically_ready`, or prior drift-preflight record existed before this file. |
| Allowed active worktree baseline | PASS | Preserved and excluded: modified `docs/handoffs/HANDOFF_INDEX.md`; untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md`; untracked `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`. |
| Original main allowance | PASS | Read-only `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` showed docs/workflow dirt only; no raw, generated, semantic, fixture, provenance, data, test, schema, validator, builder, scoring, calibration, or runtime changes. |
| VM-520 untouched | PASS | `git diff --name-only 04547... -- data/raw-factions/red data/raw-factions/green docs/kanban/backlog/VM-520-red-semantic-recovery.md` returned no files. |

## B. Approved Validator Integrity

Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Independent approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`

| Control | Result | Evidence |
|---|---|---|
| Exact tree integrity | PASS | `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` exited 0. |
| Later validator modifications | PASS | `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` returned no commits. |
| Regression tests | PASS | `node research/semantic-candidate-scope-tests.js` exited 0: `Semantic candidate scope tests passed.` |
| Array collision guidance | PASS | WG array-shape candidate-scope control exited 0. |
| Object-with-pairs collision guidance | PASS | Black raw placement uses object keys `rule`, `review_triggers`, `pairs`; same-SHA B control reached deliberate proof-chain diagnostics with no structural crash. |
| `collision_id` and `against` semantics | PASS | Black pair order and IDs are preserved as `black_vs_white` against `W`, then `black_vs_green` against `G`; generated placement flattens to the same ordered pair IDs. |
| Fail-closed diagnostics | PASS | Approved tests passed; B same-SHA output is structured line diagnostics, not an unhandled TypeError. |
| Simic display-source exception behavior | PASS | No validator diff exists after approved infrastructure candidate; Simic exception behavior remains unchanged by this window. |

## C. Black Identity Resolution

| Item | Resolved value |
|---|---|
| Internal identity code | `B` |
| Candidate-scope target | `B` |
| Raw directory | `data/raw-factions/black/` |
| Raw files | `black.claims.json`, `black.sources.json`, `black.profile.json`, `black.placement.json`, `black.changelog.json` |
| Generated faction key | `data/factions.json#/factions/B` |
| Placement-model key | `data/placement-model.json#/factions/B` |
| Identity-layer key | `data/identity-layers.json#/expressions/B` |
| Embedded preview consumer | `data/factions.json#/identity_layers/expressions/B` |
| Provenance key | `data/semantic-readiness-provenance.json` entries with `identity_key: "B"` |
| Fixture convention | `research/fixtures/semantic-readiness/black.semantic-fixtures.json` |
| Recruiter/recommendation key | `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/B`; commander support rows in `data/raw-factions/black/black.profile.json#/commander_compass` and generated `data/factions.json#/factions/B/commander_compass` |
| Collision-guidance runtime shape | Raw object with keys `rule`, `review_triggers`, `pairs`; generated placement array with two ordered records. |
| Difference from White/Blue | Same monocolor object-with-`pairs` raw shape and generated array flattening; no new structural model found. |

Repository tooling recognizes `--targets=B`: audit exits 0 and validation exits 1 with expected pre-remediation semantic failures.

## D. Candidate-Scope Structural Compatibility

| Command | Exit | Result |
|---|---:|---|
| `node research/validate-semantic-candidate-scope.mjs --base=04547ecfc52d1c96537b6375e9d5c4b8f3690a32 --target=04547ecfc52d1c96537b6375e9d5c4b8f3690a32 --identity=B` | 1 | PASS as deliberate pre-remediation proof-chain adjudication: unclassified Black claims appear in generated placement, recruiter, and provenance proof chains. No unhandled crash and no collision-guidance structural error. |
| `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG` | 0 | PASS; certified array-shape control returned `Semantic candidate scope passed for WG`. |

Black raw collision-guidance path: `data/raw-factions/black/black.placement.json#/collision_guidance`. Observed runtime type: object. Object keys: `rule`, `review_triggers`, `pairs`. `pairs` is an array in order `black_vs_white` then `black_vs_green`; both records preserve `collision_id`, `against`, `separator`, `ask`, `lateral_inhibition`, and `claim_ids`. The approved validator covers this structure. No unknown structure remains.

## E. Black File and Source Inventory

Raw files:

- `data/raw-factions/black/black.claims.json`
- `data/raw-factions/black/black.sources.json`
- `data/raw-factions/black/black.profile.json`
- `data/raw-factions/black/black.placement.json`
- `data/raw-factions/black/black.changelog.json`

Generated and consumed surfaces:

- `data/factions.json#/factions/B`
- `data/placement-model.json#/factions/B`
- `data/identity-layers.json#/expressions/B`
- `data/factions.json#/identity_layers/expressions/B`
- `data/semantic-readiness-provenance.json#/entries[identity_key=B]`
- `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/B`

Source inventory records currently stored roles only:

| Source ID | Current stored role | Source type / tier | URL or repository locator | Content hash present |
|---|---|---|---|---|
| `MONO-B-2015` | `philosophy_backbone` | `gold_official_article` | WotC URL plus `docs/research/mono_upgrade/12_black.md`; local PDF path present | yes |
| `MONO-B-2025` | `current_voice_update` | `gold_official_article` | WotC URL plus `docs/research/mono_upgrade/12_black.md`; local PDF path present | yes |
| `MECH-CP-2021` | `mechanical_authority` | `gold_official_article_snapshot` | WotC URL plus `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md`; local PDF path present | yes |
| `MECH-CP-2021-CHG` | `mechanical_change_log` | `gold_official_article_snapshot` | WotC URL plus `docs/research/mono_upgrade/21_mechanical_color_pie_2021_changes.md`; local PDF path present | yes |
| `RULES-CR` | `commander_rules_boundary` | `gold_official_living_rules` | `https://magic.wizards.com/en/rules`; `docs/research/mono_upgrade/30_commander_and_rules.md` | no |
| `VM-377` | `project_governance` | `vox_mana_planning_authority` | `docs/kanban/in-progress/VM-377-mono-gold-source-intake-planning.md` | no |
| `SCRYFALL-B-2026-06-13` | `current_card_legality_verification` | `current_card_database` | Verified card URIs inside the source row | no |

Governance records found before this update: VM-519 card, board row, CRIT JSON/Markdown ledgers, Blue certification handoff, and drift register. No VM-519 Gate 1+2, candidate, review, or certification record existed.

Relevant validators/builders/commands: `research/audit-semantic-readiness.mjs`, `research/validate-semantic-readiness.mjs`, `research/validate-semantic-candidate-scope.mjs`, `research/semantic-candidate-scope-tests.js`, `research/build-faction-artifacts.mjs`, `npm.cmd run build:factions`, semantic readiness tests, placement tests, context isolation tests, source-generated tests, and `npm.cmd test`.

## F. As-Is Claim and Evidence Baseline

| Metric | Current value |
|---|---:|
| Total claims | 8 |
| `substantive_claim` | 0 |
| `discovery_record` | 0 |
| `support_record` | 0 |
| Unclassified / unassigned / other | 8 |
| Raw explicit role vs audit-derived role difference | None observed; claims lack Contract `semantic_role`, and audit reports all 8 as unclassified. |
| Substantive evidence locations missing `evidence_scope` | 0 because no claim is currently substantive. |
| Claims lacking bounded `evidence_locations` | 8; current claims use `evidence_rows`, not bounded Contract v1.1 `evidence_locations`. |
| Discovery IDs in profile chains | 0 role-derived discovery IDs; current chains use unclassified claim IDs. |
| Discovery IDs in placement chains | 0 role-derived discovery IDs; current chains use unclassified claim IDs. |
| Discovery IDs in public/preview/recruiter mappings | 0 role-derived discovery IDs; current recruiter and generated proof chains use unclassified claim IDs. |
| Support IDs in authoritative chains | 0 role-derived support IDs; `black_claim_0008` is unclassified but carries rules/governance/Scryfall sources and appears in support/navigation surfaces. |
| Mechanics/governance/rules/legality/process source IDs in philosophical proof chains | Present as as-is risk: profile-wide `/core_identity` and `/profile` provenance rows include all claims and all source IDs, including `MECH-CP-2021`, `MECH-CP-2021-CHG`, `RULES-CR`, `SCRYFALL-B-2026-06-13`, and `VM-377`. Gate 1+2 must adjudicate. |
| Required null canonical IDs | 3 provenance rows: `/core_identity`, `/mechanics`, `/profile`. |
| Required null content hashes | 0 |
| Unresolved claim/source pointers | 0 unresolved canonical file/pointer pairs found. |
| Duplicate canonical provenance entries | 0 |
| Duplicate null canonical-entry keys | 0 |
| Existing provenance count | 12 |

`node research/audit-semantic-readiness.mjs --targets=B` exited 0 and reported 8 claims, all unclassified, 7 sources, and 0 claim-bearing source roles. `node research/validate-semantic-readiness.mjs --targets=B` exited 1 with expected pre-remediation findings: missing semantic roles, missing recruiter evidence mapping, no substantive authoritative references, and missing Black semantic fixtures.

## G. Fixture and Provenance Baseline

Current fixture file: absent at `research/fixtures/semantic-readiness/black.semantic-fixtures.json`.

| Locator | Generated ordered IDs | Generated count / unique | Fixture existence | Fixture ordered IDs | Fixture count | Exact equality | Duplicates | Missing IDs | Extra IDs | Missing fixture/provenance condition |
|---|---|---:|---|---|---:|---|---|---|---|---|
| `data/raw-factions/black/black.placement.json#/collision_guidance/pairs/0` (`black_vs_white`) | `black_claim_0005` | 1 / 1 | missing | N/A | 0 | N/A - no fixture | none | `black_claim_0005` | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/collision_guidance/pairs/1` (`black_vs_green`) | `black_claim_0005` | 1 / 1 | missing | N/A | 0 | N/A - no fixture | none | `black_claim_0005` | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/0` (`black_disc_001`) | `black_claim_0002`, `black_claim_0003`, `black_claim_0004` | 3 / 3 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/1` (`black_disc_002`) | `black_claim_0003`, `black_claim_0006` | 2 / 2 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/2` (`black_disc_003`) | `black_claim_0005`, `black_claim_0006` | 2 / 2 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/3` (`black_disc_004`) | `black_claim_0007`, `black_claim_0008` | 2 / 2 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/placement_axes/0` (`axis_power_as_agency`) | `black_claim_0002`, `black_claim_0003` | 2 / 2 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/placement_axes/1` (`axis_cost_conversion`) | `black_claim_0003`, `black_claim_0006`, `black_claim_0007` | 3 / 3 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing |
| `data/raw-factions/black/black.placement.json#/placement_axes/2` (`axis_self_interest_shadow`) | `black_claim_0006` | 1 / 1 | missing | N/A | 0 | N/A - no fixture | none | `black_claim_0006` | none | fixture missing |
| `data/raw-factions/black/black.profile.json#/core_identity` | `black_claim_0001` through `black_claim_0008` | 8 / 8 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing; canonical ID null |
| `data/raw-factions/black/black.profile.json#/mechanics` | `black_claim_0007` | 1 / 1 | missing | N/A | 0 | N/A - no fixture | none | `black_claim_0007` | none | fixture missing; canonical ID null |
| `data/raw-factions/black/black.profile.json#/profile` | `black_claim_0001` through `black_claim_0008` | 8 / 8 | missing | N/A | 0 | N/A - no fixture | none | all generated IDs | none | fixture missing; canonical ID null |

Additional Gate 1+2 locator families to adjudicate from current structure and monocolor precedent: placement summary, profile-wide proof chains, mechanics/methods chains, axes, discriminator questions, collision pairs, recruiter/chatbot guidance, preview mappings, commander support rows, and any graveyard, sacrifice, ambition, power, resource, mortality, autonomy, or agency-specific proof chain present in the packet.

## H. Frozen Placement and Scope Baseline

| Field | Exact locator | Current value | Frozen | Later checkpoint |
|---|---|---|---|---|
| Placement summary | `data/raw-factions/black/black.placement.json#/placement_summary` | `Black is a strong fit when a user wants agency, ambition, and power through clear-eyed cost accounting, resource conversion, and refusal to let inherited taboos choose for them.` | yes | Candidate, review, certification |
| Placement confidence | top-level raw/generated | N/A - no top-level placement confidence field exists. Discriminator confidences are `High`, `High`, `Medium`, `High`. | N/A - absent with explanation | Candidate, review, certification |
| Native IDs | raw placement/profile | faction `black`; axes `axis_power_as_agency`, `axis_cost_conversion`, `axis_self_interest_shadow`; questions `black_disc_001` through `black_disc_004`; collisions `black_vs_white`, `black_vs_green` | yes | Candidate, review, certification |
| Required positive terms | `#/calibration_tuning/required_positive_evidence_terms` | `power`, `opportunity`, `self-interest`, `agency`, `cost`, `sacrifice`, `leverage` | yes | Candidate, review, certification |
| Minimum-hit threshold | `#/calibration_tuning/required_positive_min_hits` | `2` | yes | Candidate, review, certification |
| Broad penalty | `#/calibration_tuning/broad_match_penalty` | `0.13` | yes | Candidate, review, certification |
| Strengthen list | `#/calibration_tuning/strengthen_when_user_centers` | `power as self-determination`; `calculated risk`; `resource conversion`; `ambition under harsh conditions` | yes | Candidate, review, certification |
| Suppress list | `#/calibration_tuning/suppress_when_user_centers` | `group morality as final authority`; `natural destiny over personal agency`; `impulsive danger`; `generic evil aesthetic` | yes | Candidate, review, certification |
| False-positive guardrail | `#/calibration_tuning/false_positive_guardrail` | `Do not place Black for darkness, villainy, or cruelty alone; require power, agency, self-interest, opportunity, or cost conversion.` | yes | Candidate, review, certification |
| Lateral targets | `data/placement-model.json#/factions/B/lateral_inhibition_targets` | `UB`, `BR`, `BG`, `WB` | yes | Candidate, review, certification |
| Collision targets | raw discriminator/collision fields | question targets: `R,W`; `R`; `W,G`; `WUBRG,COLORLESS`; collision pairs: `W`, `G` | yes | Candidate, review, certification |
| Generic collision target | raw/generated | absent; `GENERIC_B_OVERFIT` must be a manual Gate 1+2 risk/control, not a current stored collision target. | N/A - absent with explanation | Candidate, review, certification |
| Golden paths/scoring | Black-local files | No Black-local golden-path or scoring parameter file identified beyond placement/calibration-sensitive fields. | N/A - absent with explanation | Candidate, review, certification |
| Object-with-pairs metadata/order | `#/collision_guidance` | object keys `rule`, `review_triggers`, `pairs`; pair order `black_vs_white` then `black_vs_green` | yes | Candidate, review, certification |

## I. Identity-Layer Preview Baseline

Permanent DRIFT-015 controls applied.

| Control | Result | Evidence |
|---|---|---|
| Authoritative preview source | PASS | `data/identity-layers.json#/expressions/B/preview_text`. |
| Current preview text | PASS | `Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.` |
| Source type | PASS | Identity-layer display authority; not canonical claim evidence and not generated semantic proof. |
| Embedded consumer | PASS | `data/factions.json#/identity_layers/expressions/B/preview_text`. |
| Source-to-consumer equality | PASS | Text is exactly equal in both paths. |
| Other exact preview copies | PASS | Exact preview-text search found only the two expected preview paths. |
| Related public/recruiter copy | PASS | Related Black taglines appear in `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `supabase/functions/guild-recruiter/faction-context.ts`, and older docs; Gate 1+2 must inspect stale-copy risk without changing them here. |
| Propagation command | PASS | Later authorized generation should use `npm.cmd run build:factions` / `research/build-faction-artifacts.mjs`. |
| Exception requirement | PASS | Any later preview change requires a target-scoped display-source exception process and equality check. |

## J. Required Neighbor Declaration

Gate 1+2 must compare Black against:

| Neighbor | Declared reason for later comparison |
|---|---|
| `GENERIC_B_OVERFIT` | Prevent generic ambition, power, death, villainy, or mechanics from replacing mono-Black source-backed identity. |
| Orzhov / `WB` | Distinguish mono-Black self-advocacy/cost conversion from hierarchy, debt, faith, transaction, obligation, and wealth structures. |
| Dimir / `UB` | Distinguish mono-Black agency/leverage from secrecy, information asymmetry, surveillance, and covert power. |
| Rakdos / `BR` | Distinguish calculated cost and agency from appetite, spectacle, impulse, cruelty, and public transgression. |
| Golgari / `BG` | Distinguish resource conversion and mortality from ecology, decay/reuse cycles, endurance, and underclass/social ecology. |
| Silverquill | Distinguish Black agency from status, rhetoric, reputation, prestige, and social leverage. |
| Witherbloom | Distinguish Black mortality/cost from life/death study, harvesting, decay, and potion craft. |
| Esper | Prevent broader WUB design/control identity from replacing mono-Black. |
| Grixis | Prevent UBR survival/leverage/immediacy from replacing mono-Black. |
| Jund | Prevent BRG appetite/instinct/survival ecology from replacing mono-Black. |
| Mardu | Prevent RWB honor/war/speed/social order from replacing mono-Black. |
| Sultai | Prevent BGU exploitation/decay/ambition ecosystem from replacing mono-Black. |
| Abzan | Prevent WBG family/endurance/obligation from replacing mono-Black. |
| White / `W` | Existing raw collision target; distinguish group morality and shared obligation from self-secured agency. |
| Green / `G` | Existing raw collision target; distinguish natural role/interdependence from self-directed opportunity. |
| Red / `R` | Existing discriminator target; distinguish calculated cost from impulse and reckless danger. |
| Blue / `U` | Existing lateral target `UB`; distinguish planning/knowledge from power-as-agency. |
| WUBRG / COLORLESS | Existing discriminator targets for support/rules/mechanics boundary. |

No final semantic discriminator is written here.

## K. Black Semantic-Risk Declaration

Gate 1+2 must inspect, without assuming disposition:

- Generic ambition, power, self-interest, independence, autonomy, agency, freedom, success, survival, pragmatism, realism, opportunity, control, leverage, ruthlessness, sacrifice, and personal gain.
- Black described as inherently evil, selfish, cruel, corrupt, nihilistic, immoral, amoral, villainous, greedy, treacherous, manipulative, or unconstrained.
- Black described as universally individualistic, power-hungry, death-obsessed, or willing to do anything.
- "Power at any cost" or "ends justify the means" as unsupported universal slogans.
- Death, mortality, decay, suffering, fear, darkness, corruption, disease, demons, zombies, vampires, necromancers, cults, assassins, swamps, or horror treated as the complete identity.
- Graveyard recursion, sacrifice, life payment, discard, removal, tutors, reanimation, drain, theft, treasures, demons, zombies, or aristocrats mechanics treated as philosophy.
- Black defined solely through rejection of morality, laws, limits, community, or altruism.
- Internal tensions among autonomy, dependency, hierarchy, ambition, mortality, and consequence erased.
- Black described as more honest or realistic than other colors without exact source support.
- Collapse into Orzhov, Dimir, Rakdos, Golgari, Silverquill, Witherbloom, Esper, Grixis, Jund, Mardu, Sultai, or Abzan.
- Discovery, mechanics, governance, rules, legality, search, or support material promoted into authoritative philosophy.
- Null IDs or hashes, duplicate null canonical keys, fixture/provenance mismatch, stale recruiter/public/placement/preview copy, and frozen placement/calibration/collision/native-ID/candidate-scope drift.

This declaration is a planning control only.

## L. Workflow Regression Comparison

| Question | Result | Evidence | Difference and allowed explanation |
|---|---|---|---|
| Gate 1+2 read-only boundary changed? | PASS | VM-518, VM-517, VM-516, and playbook keep Gate 1+2 read-only. | No difference. |
| Gate 1+2 governance separation changed? | PASS | This preflight is separate and governance-only. | No difference. |
| Candidate/workflow/review/certification separation changed? | PASS | Exact candidate/review/certification rules remain intact. | No difference. |
| Exact-SHA discipline changed? | PASS | Starting HEAD/program base, validator candidate, validator review, Blue candidate/review/base all recorded exactly. | No difference. |
| Validation coverage shrank? | PASS | Planned matrix retains JSON, role, evidence, isolation, ID/hash, exact-chain, frozen-field, preview, candidate-scope, source-generated, placement, context, npm, and diff checks. | No reduction. |
| Exact-chain coverage shrank? | PASS | All current B provenance rows are listed; missing fixture and missing required locator families are called out for Gate 1+2. | No reduction. |
| Frozen-field checking shrank? | PASS | Placement summary, native IDs, terms, threshold, penalty, lists, lateral/collision fields, preview, and object pair order are recorded. | No reduction. |
| Authoritative proof-chain inspection shrank? | PASS | Current unclassified proof-chain contamination and mechanics/rules/governance source mixing are recorded for later audit. | No reduction. |
| Identity-layer preview inspection shrank? | PASS | DRIFT-015 source, consumer, text, equality, and stale-copy controls are recorded. | No reduction. |
| Consumed-surface stale-copy checking shrank? | PASS | Generated, recruiter, public, preview, and related tagline surfaces are listed for later stale-copy review. | No reduction. |
| Candidate-scope validation shrank? | PASS | Same-SHA B control and WG array control were run. | No reduction. |
| Object-with-pairs structural validation shrank? | PASS | Black object keys and pair order were inspected. | No reduction. |
| Dirty-worktree isolation changed? | PASS | Table Talk baseline remains preserved and excluded. | No difference. |
| Superseded-candidate handling changed? | PASS | No Black candidate exists; future superseded candidates must remain recorded. | No difference. |
| Reviewed/generated truth reconciliation changed? | PASS | DRIFT-015/016 and reviewed/generated truth reconciliation remain mandatory. | No difference. |
| Meaning of candidate/workflow/review/cert/program base changed? | PASS | No candidate/review/certification/program-base advancement occurred. | No difference. |
| New uncovered Black structure? | PASS | Black uses the covered monocolor object-with-`pairs` raw shape and generated collision array; no unsupported structure found. | No incompatibility. |

## M. Planned Validation Matrix

Later Black Goal mode and review must run or record repository-supported equivalents of:

- JSON parse checks.
- Explicit claim-role counts.
- `evidence_scope` checks.
- Discovery, support, mechanics/process, rules/governance/legality, search, product, and support isolation.
- Null canonical-ID/hash scan.
- Unresolved-pointer scan.
- Duplicate canonical-entry scan and duplicate null-key scan.
- Fixture/provenance exact-chain comparisons for every required locator.
- Frozen placement, native-ID, required-term, threshold, penalty, strengthen/suppress, lateral/collision, calibration, object-with-pairs, preview, and golden-path/scoring checks.
- Authoritative proof-chain inspection.
- Public/recruiter stale-copy scan.
- Identity-layer preview ownership check.
- Preview source-to-embedded equality.
- Exact and semantic-equivalent stale-preview searches.
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=B`
- `node research/validate-semantic-readiness.mjs --targets=B`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- Candidate-scope command template: `node research/validate-semantic-candidate-scope.mjs --base=<VM519_GATE_1_2_SHA> --target=<VM519_CANDIDATE_SHA> --identity=B`

Candidate-only checks were not run because no Black candidate exists.

## N. Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-519-black-semantic-recovery`, starting HEAD `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`. |
| Correct program base | PASS | Program base remains `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`. |
| One identity active | PASS | CRIT ledger active identity is `B`; WIP limit 1. |
| Prior identity certified | PASS | Blue / U certified `semantically_ready`. |
| Wave 3 status correct | PASS | 2 of 5 monocolors certified. |
| Black setup-only | PASS | No Black Gate 1+2, candidate, review, or certification existed before this record. |
| Allowed worktree baseline enumerated | PASS | Table Talk modified/untracked baseline listed and excluded. |
| Approved validator present and unchanged | PASS | Exact diff to `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` is empty. |
| Black target code resolved | PASS | `B` resolves across raw, generated, placement, identity-layer, provenance, recruiter, audit, validation, and candidate-scope tooling. |
| Monocolor pipeline support verified | PASS | B same-SHA control reaches deliberate adjudication; WG array control passes. |
| Candidate-scope same-SHA control reaches deliberate adjudication | PASS | Exit 1 only for unclassified proof-chain diagnostics. |
| Candidate-scope validator does not crash | PASS | No TypeError or collision-guidance structural error. |
| Black collision-guidance shape supported | PASS | Object-with-`pairs`; pair order preserved. |
| Source/file inventory complete | PASS | Raw files, source roles, generated consumers, recruiter, provenance, fixture state, governance, builders, and validators recorded. |
| Current claim-role baseline recorded | PASS | 8 total; all unclassified. |
| ID/hash/pointer baseline recorded | PASS | 12 provenance rows; 3 null canonical IDs; 0 null hashes; 0 unresolved pointers. |
| Duplicate canonical-key baseline recorded | PASS | 0 duplicate canonical entries and 0 duplicate null canonical-entry keys. |
| Fixture/provenance locators recorded | PASS | 12 current provenance locators plus required missing locator families recorded. |
| Exact-chain as-is state recorded | PASS | Ordered IDs, counts, unique counts, duplicates, fixture absence, missing IDs, and extra IDs recorded. |
| Frozen fields recorded | PASS | Placement summary, native IDs, terms, threshold, penalty, strengthen/suppress, lateral/collision, guardrail, preview, and object pair order recorded. |
| Native IDs recorded | PASS | Faction, axes, questions, and collisions recorded. |
| Lateral and collision fields recorded | PASS | Lateral targets `UB`, `BR`, `BG`, `WB`; collision fields recorded. |
| Preview ownership recorded | PASS | Source, consumer, text, and equality recorded. |
| Preview consumers and equality recorded | PASS | `identity-layers` source and embedded `factions` consumer exactly equal. |
| Required neighbors declared | PASS | Required Black-adjacent set declared. |
| Semantic risks declared | PASS | Black-specific risk declaration recorded. |
| Validation matrix not reduced | PASS | Required later matrix recorded. |
| Gate boundaries unchanged | PASS | Gate 1+2 authorized only for later read-only audit; not started here. |
| Exact-SHA rules unchanged | PASS | Exact candidate/review/certification discipline retained. |
| Commit separation unchanged | PASS | This is one governance-only preflight commit. |
| Superseded-candidate rules retained | PASS | Future failed candidates must remain recorded. |
| Reviewed/generated truth reconciliation retained | PASS | Required in later review/certification. |
| DRIFT-015 retained | PASS | Preview ownership/equality/stale-copy controls applied. |
| DRIFT-016 retained | PASS | Object-with-`pairs` control applied. |
| No Black semantic edit | PASS | No raw/generated/provenance/fixture/recruiter/preview/source/test/schema/validator/builder/scoring/calibration/runtime files changed. |
| No Gate 1+2 audit | PASS | This record is pre-Gate 1+2 only. |
| No remediation authorization | PASS | Remediation remains unauthorized. |
| No VM-520 work | PASS | VM-520 not started. |
| External tracker untouched | PASS | Excel not modified. |
| Candidate-only validation | N/A - no Black candidate exists; exact future command is recorded. | Candidate-only validation belongs after Gate 5 candidate creation. |
| Generation determinism | N/A - generation was not run in this governance-only preflight because generation may rewrite artifacts. | Later Gate 4 must prove deterministic generation. |
| Top-level placement confidence | N/A - no top-level confidence field exists in current Black raw/generated placement. | Discriminator confidences are recorded. |
| Generic collision target | N/A - no stored `GENERIC_B_OVERFIT` target exists. | It is declared as a manual Gate 1+2 risk/control. |

All controls are PASS or explained N/A. No FAIL or UNKNOWN controls were recorded.

## O. Decision

PASS - BLACK GATE 1+2 AUTHORIZED

Authorization permits only the next window's Gate 1+2 read-only audit. It does not authorize remediation.

## P. Validation Run

Commands and checks actually run:

- `git status --short`
- `git branch --show-current`
- `git rev-parse HEAD`
- `git merge-base HEAD 04547ecfc52d1c96537b6375e9d5c4b8f3690a32`
- `git diff --name-only`
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short`
- `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=04547ecfc52d1c96537b6375e9d5c4b8f3690a32 --target=04547ecfc52d1c96537b6375e9d5c4b8f3690a32 --identity=B`
- `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG`
- `node research/audit-semantic-readiness.mjs --targets=B`
- `node research/validate-semantic-readiness.mjs --targets=B`
- JSON read/parse checks for Black raw/generated/provenance/ledger files.
- Exact preview search and generated/recruiter consumer search.
- Read-only implementation diff from `04547ecfc52d1c96537b6375e9d5c4b8f3690a32` for Black target files: no files.
- Read-only VM-520 target diff: no files.

Post-edit validation and staged-scope checks are recorded by the final response after the governance commit.

## Q. Not Performed

- No Gate 1+2 semantic adjudication occurred.
- No Black claim/source role was changed or adjudicated.
- No remediation was authorized.
- No Black raw, generated, fixture, provenance, preview, recruiter, source, test, schema, validator, builder, scoring, calibration, or runtime file was modified.
- No fixture was created.
- No candidate was created.
- No independent review was performed.
- No certification occurred.
- VM-520 was not started.
- Original main was not modified.
- External Excel tracker was not modified.
- Table Talk baseline remained excluded.

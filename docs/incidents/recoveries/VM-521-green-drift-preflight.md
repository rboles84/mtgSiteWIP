# VM-521 Green Drift Preflight

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: VM-521 - Green / G
Cohort: Wave 3 monocolors
Branch: `codex/vm-521-green-semantic-recovery`
Starting HEAD: `9f0a076a369cba23dc9bc19231b0efcddd21afe5`
Current CRIT-001 program base: `9f0a076a369cba23dc9bc19231b0efcddd21afe5`
Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
Preflight decision: `PASS - GREEN GATE 1+2 AUTHORIZED`

This is a governance-only pre-identity drift preflight. It records the as-is Green baseline and process readiness only. No Gate 1+2 semantic audit, source-role adjudication, claim adjudication, remediation, generation, fixture creation, candidate, independent review, certification, program-base advancement, VM-522 work, original-main edit, Excel update, or Table Talk commit occurred.

## A. Preflight State

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | Active worktree is `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `git branch --show-current` returned `codex/vm-521-green-semantic-recovery`. |
| Starting HEAD | PASS | `git rev-parse HEAD` returned `9f0a076a369cba23dc9bc19231b0efcddd21afe5`. |
| Program base | PASS | Required current certification/program base is VM-520 Red certification SHA `9f0a076a369cba23dc9bc19231b0efcddd21afe5`; this preflight does not advance it. |
| Ancestry | PASS | `git merge-base HEAD 9f0a076a369cba23dc9bc19231b0efcddd21afe5` returned the same SHA. |
| Certified count | PASS | CRIT ledgers and board record 19 certified identities. |
| Wave 3 status | PASS | Wave 3 monocolors remain 4 of 5 certified. |
| Prior identity certified | PASS | Red / R is certified `semantically_ready` from approved replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`; approval review `20f18e0a0a02728f3474c9e8d2b32e36525cbfe9`; rejected candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` remains unapproved; certification/program-base commit `9f0a076a369cba23dc9bc19231b0efcddd21afe5`. |
| Green setup-only | PASS | VM-521 existed only as setup before this record; Green Gate 1+2, remediation, candidate, review, certification, and `semantically_ready` transition have not started. |
| Allowed active worktree baseline | PASS | Preserved and excluded: modified `docs/handoffs/HANDOFF_INDEX.md`; untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md`; untracked `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`. |
| Original main allowance | PASS | Read-only `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` showed docs/workflow dirt only; no raw, generated, semantic, fixture, provenance, data, test, schema, validator, builder, scoring, calibration, or runtime changes. |
| VM-522 untouched | PASS | VM-522 semantic work remains not started. |

## B. Approved Validator Integrity

Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Independent approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`

| Control | Result | Evidence |
|---|---|---|
| Exact tree integrity | PASS | `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` exited 0. |
| Later validator modifications | PASS | `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` returned no commits. |
| Regression tests | PASS | `node research/semantic-candidate-scope-tests.js` exited 0: `Semantic candidate scope tests passed.` |
| Array collision guidance | PASS | WG array-shape candidate-scope control exited 0 for `99a239dea91039a13511d155f9b652d297baab21..02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`. |
| Object-with-pairs collision guidance | PASS | Green raw placement uses object keys `rule`, `review_triggers`, `pairs`; same-SHA G control reached deliberate proof-chain diagnostics with no structural crash. |
| Fail-closed diagnostics | PASS | G same-SHA output is structured unclassified proof-chain diagnostics, not an unhandled TypeError or collision-guidance structural error. |

## C. Green Identity Resolution

| Item | Resolved value |
|---|---|
| Internal identity code | `G` |
| Candidate-scope target | `G` |
| Candidate-scope identity argument | `--identity=G` |
| Raw directory | `data/raw-factions/green/` |
| Raw files | `green.claims.json`, `green.sources.json`, `green.profile.json`, `green.placement.json`, `green.changelog.json` |
| Generated faction key | `data/factions.json#/factions/G` |
| Placement-model key | `data/placement-model.json#/factions/G` |
| Identity-layer keys | `data/identity-layers.json#/expressions/G` and `data/identity-layers.json#/colors/G` |
| Embedded preview consumers | `data/factions.json#/identity_layers/expressions/G`; `assets/js/newindex-color-matrix.js`; `assets/js/color-matrix-radar.js`; exported inspect NDJSON under `outputs/mtgdata-v3-enhanced/` |
| Provenance key | `data/semantic-readiness-provenance.json` entries with `identity_key: "G"` |
| Fixture convention | `research/fixtures/semantic-readiness/green.semantic-fixtures.json` |
| Recruiter/recommendation key | `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/G`; commander support rows in `data/raw-factions/green/green.profile.json#/commander_compass` and generated `data/factions.json#/factions/G/commander_compass` |
| Collision-guidance runtime shape | Raw object with keys `rule`, `review_triggers`, `pairs`; generated placement array with `green_vs_blue`, `green_vs_black`. |

Repository tooling recognizes `--targets=G`: audit exits 0 and validation exits 1 with expected pre-remediation semantic failures.

## D. Candidate-Scope Structural Compatibility

| Command | Exit | Result |
|---|---:|---|
| `node research/validate-semantic-candidate-scope.mjs --base=9f0a076a369cba23dc9bc19231b0efcddd21afe5 --target=9f0a076a369cba23dc9bc19231b0efcddd21afe5 --identity=G` | 1 | PASS as deliberate pre-remediation proof-chain adjudication: unclassified Green claims appear in generated placement, recruiter, and provenance proof chains. No unhandled crash and no collision-guidance structural error. |
| `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG` | 0 | PASS; certified array-shape control returned `Semantic candidate scope passed for WG`. |

Green raw collision-guidance path: `data/raw-factions/green/green.placement.json#/collision_guidance`. Observed runtime type: object. Object keys: `rule`, `review_triggers`, `pairs`. `pairs` order is `green_vs_blue` against `U`, then `green_vs_black` against `B`. Generated placement uses an array with the same two ordered records. The approved validator covers this structure. No unknown structure remains.

## E. Green File and Source Inventory

Generated and consumed surfaces:

- `data/factions.json#/factions/G`
- `data/placement-model.json#/factions/G`
- `data/identity-layers.json#/expressions/G`
- `data/identity-layers.json#/colors/G`
- `data/factions.json#/identity_layers/expressions/G`
- `data/factions.json#/identity_layers/colors/G`
- `data/semantic-readiness-provenance.json#/entries[identity_key=G]`
- `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/G`
- Green preview text also appears in `assets/js/newindex-color-matrix.js`, `assets/js/color-matrix-radar.js`, and current inspect NDJSON exports under `outputs/mtgdata-v3-enhanced/`.

Source inventory records currently stored roles only:

| Source ID | Current stored role | Source type / tier | URL or repository locator | Content hash present |
|---|---|---|---|---|
| `MONO-G-2015` | `philosophy_backbone` | `gold_official_article` | WotC URL plus `docs/research/mono_upgrade/14_green.md`; local PDF path present | yes |
| `MONO-G-2025` | `current_voice_update` | `gold_official_article` | WotC URL plus `docs/research/mono_upgrade/14_green.md`; local PDF path present | yes |
| `MECH-CP-2021` | `mechanical_authority` | `gold_official_article_snapshot` | WotC URL plus `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md`; local PDF path present | yes |
| `MECH-CP-2021-CHG` | `mechanical_change_log` | `gold_official_article_snapshot` | WotC URL plus `docs/research/mono_upgrade/21_mechanical_color_pie_2021_changes.md`; local PDF path present | yes |
| `RULES-CR` | `commander_rules_boundary` | `gold_official_living_rules` | `https://magic.wizards.com/en/rules`; `docs/research/mono_upgrade/30_commander_and_rules.md` | no |
| `VM-377` | `project_governance` | `vox_mana_planning_authority` | `docs/kanban/in-progress/VM-377-mono-gold-source-intake-planning.md` | no |
| `SCRYFALL-G-2026-06-13` | `current_card_legality_verification` | `current_card_database` | verified card URIs inside the source row | no |

Existing VM-521 governance before this record: setup-only card, board/ledger rows, and VM-520 certification handoff. No VM-521 drift preflight, Gate 1+2, candidate, review, or certification record existed.

## F. As-Is Claim and Evidence Baseline

| Metric | Current value |
|---|---:|
| Total claims | 8 |
| `substantive_claim` | 0 |
| `discovery_record` | 0 |
| `support_record` | 0 |
| Unclassified / unassigned / other | 8 |
| Raw explicit role vs audit-derived role difference | None observed; claims lack Contract `semantic_role`, and audit reports all 8 as unclassified. |
| Claims lacking bounded `evidence_locations` | 8; current claims use `evidence_rows`, not bounded Contract v1.1 `evidence_locations`. |
| Required null canonical IDs | 3 current G provenance rows have null canonical IDs: `/core_identity`, `/mechanics`, and `/profile`. |
| Null content hashes | 0 observed across current G provenance rows. |
| Unresolved claim/source pointers | 0 unresolved pointers observed in audit output. |
| Duplicate canonical provenance entries | 0 duplicate canonical entries observed. |
| Duplicate null canonical-entry keys | 0 duplicate null canonical-entry keys observed. |
| Existing provenance count | 12 |
| Existing fixture | Missing at `research/fixtures/semantic-readiness/green.semantic-fixtures.json`. |

`node research/audit-semantic-readiness.mjs --targets=G` exited 0 and reported 8 claims, all unclassified, 7 sources, and 12 reference sites. `node research/validate-semantic-readiness.mjs --targets=G` exited 1 with expected pre-remediation findings: missing semantic roles, missing recruiter evidence mapping, no substantive authoritative references, and missing Green semantic fixtures.

## G. Fixture and Provenance Baseline

Current fixture file: absent at `research/fixtures/semantic-readiness/green.semantic-fixtures.json`.

| Locator | Current ordered IDs | Count / unique | Fixture state | Duplicates | Missing fixture/provenance condition |
|---|---|---:|---|---|---|
| `data/raw-factions/green/green.placement.json#/collision_guidance/pairs/0` (`green_vs_blue`) | `green_claim_0005` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/collision_guidance/pairs/1` (`green_vs_black`) | `green_claim_0005` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/0` (`green_disc_001`) | `green_claim_0002`, `green_claim_0003`, `green_claim_0005` | 3 / 3 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/1` (`green_disc_002`) | `green_claim_0003`, `green_claim_0004`, `green_claim_0007` | 3 / 3 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/2` (`green_disc_003`) | `green_claim_0006` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/3` (`green_disc_004`) | `green_claim_0007`, `green_claim_0008` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/placement_axes/0` (`axis_natural_belonging`) | `green_claim_0002`, `green_claim_0003` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/placement_axes/1` (`axis_instinct_over_artifice`) | `green_claim_0004`, `green_claim_0005` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/green/green.placement.json#/placement_axes/2` (`axis_overreliance_shadow`) | `green_claim_0006` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/green/green.profile.json#/core_identity` | `green_claim_0001` through `green_claim_0008` | 8 / 8 | missing | none | fixture missing; canonical ID null |
| `data/raw-factions/green/green.profile.json#/mechanics` | `green_claim_0007` | 1 / 1 | missing | none | fixture missing; canonical ID null |
| `data/raw-factions/green/green.profile.json#/profile` | `green_claim_0001` through `green_claim_0008` | 8 / 8 | missing | none | fixture missing; canonical ID null |

Gate 1+2 must adjudicate profile core identity, placement summary, mechanics/method chains, profile-wide proof chains, axes, discriminator questions, collision pairs, recruiter/chatbot guidance, preview mappings if claim-backed, and any growth, nature, adaptation, acceptance, interdependence, instinct, tradition, destiny, ecosystem, ancestry, strength, or belonging-specific chains.

## H. Frozen Placement and Scope Baseline

| Field | Exact locator | Current value | Frozen | Later checkpoint |
|---|---|---|---|---|
| Placement summary | `data/raw-factions/green/green.placement.json#/placement_summary` | `Green is a strong fit when a user wants nature, instinct, belonging, growth, tradition, interdependence, and acceptance of an innate role in a larger living system.` | yes | Candidate, review, certification |
| Top-level confidence | raw/generated placement | N/A - no top-level confidence field exists. Discriminator confidences are `High`, `High`, `Medium`, `High`. | N/A - absent with explanation | Candidate, review, certification |
| Native IDs | raw placement/profile | faction `green`; axes `axis_natural_belonging`, `axis_instinct_over_artifice`, `axis_overreliance_shadow`; questions `green_disc_001` through `green_disc_004`; collisions `green_vs_blue`, `green_vs_black` | yes | Candidate, review, certification |
| Required positive terms | `#/calibration_tuning/required_positive_evidence_terms` | `nature`, `acceptance`, `instinct`, `growth`, `interdependence`, `role`, `tradition`, `land` | yes | Candidate, review, certification |
| Minimum-hit threshold | `#/calibration_tuning/required_positive_min_hits` | `2` | yes | Candidate, review, certification |
| Broad penalty | `#/calibration_tuning/broad_match_penalty` | `0.13` | yes | Candidate, review, certification |
| Strengthen list | `#/calibration_tuning/strengthen_when_user_centers` | `discovered role`; `web of life`; `creatures and lands`; `slow purposeful evolution`; `wisdom of nature or ancestry` | yes | Candidate, review, certification |
| Suppress list | `#/calibration_tuning/suppress_when_user_centers` | `blank-slate optimization`; `self-interest over responsibility`; `rules imposed over relationship`; `generic healing or growth without nature` | yes | Candidate, review, certification |
| False-positive guardrail | `#/calibration_tuning/false_positive_guardrail` | `Do not place Green for life, healing, or growth alone; require nature, role, instinct, interdependence, or natural-system trust.` | yes | Candidate, review, certification |
| Lateral targets | `data/placement-model.json#/factions/G/lateral_inhibition_targets` | `WG`, `UG`, `BG`, `RG` | yes | Candidate, review, certification |
| Collision targets | raw discriminator/collision fields | question targets: `U`; `U,W`; `B,U`; `WUBRG,COLORLESS`; collision pairs: `U`, `B` | yes | Candidate, review, certification |
| Generic collision target | raw/generated | absent; `GENERIC_G_OVERFIT` must be a manual Gate 1+2 risk/control, not a current stored collision target. | N/A - absent with explanation | Candidate, review, certification |
| Scoring/golden paths | Green-local files | No Green-local scoring or golden-path parameter file identified beyond placement/calibration-sensitive fields. | N/A - absent with explanation | Candidate, review, certification |
| Object-with-pairs metadata/order | `#/collision_guidance` | object keys `rule`, `review_triggers`, `pairs`; pair order `green_vs_blue`, then `green_vs_black` | yes | Candidate, review, certification |

## I. Identity-Layer Preview Baseline

Permanent DRIFT-015 and DRIFT-017 controls applied.

| Control | Result | Evidence |
|---|---|---|
| Authoritative preview source | PASS | `data/identity-layers.json#/expressions/G/preview_text`. |
| Current preview text | PASS | `Green values nature, instinct, tradition, interdependence, and belonging. It asks what you already are beneath the noise.` |
| Source type | PASS | Identity-layer display authority; not canonical claim evidence and not generated semantic proof. |
| Embedded consumer | PASS | `data/factions.json#/identity_layers/expressions/G/preview_text`. |
| Source-to-consumer equality | PASS | Text is exactly equal in both paths. |
| Other exact preview copies | PASS | Exact search found JS display consumers and current exported inspect NDJSON copies in addition to identity-layer and `data/factions.json` paths. |
| Raw site-surface text | PASS | `data/raw-factions/green/green.profile.json#/site_surface` stores short summary, one-sentence identity, and tagline `Become what you already are.` |
| Related generated public copy | PASS | `data/identity-layers.json`, `data/factions.json`, and recruiter context include Green generated tagline `The seed remembers what it is becoming.` |
| Later semantic alignment mandatory | PASS | Gate 1+2, candidate, independent review, and certification must run semantic-equivalent preview review; equality alone is not sufficient after DRIFT-017. |
| Propagation command | PASS | Later authorized generation should use `npm.cmd run build:factions` / `research/build-faction-artifacts.mjs`. |

## J. Required Neighbor Declaration

Gate 1+2 must compare Green against at least:

| Neighbor | Declared reason for later comparison |
|---|---|
| `GENERIC_G_OVERFIT` | Prevent generic nature, growth, life, harmony, instinct, acceptance, or "natural order" from replacing mono-Green source-backed identity. |
| Selesnya / `WG` | Distinguish mono-Green belonging/interdependence from collective order, harmony, stewardship, spirituality, and shared purpose. |
| Golgari / `BG` | Distinguish Green acceptance/growth from decay, survival, grave-soil, hunger, and Black-Green resource recursion. |
| Simic / `UG` | Distinguish Green natural role and adaptation from Blue-Green guided optimization, experiment, mutation, and design. |
| Gruul / `RG` | Distinguish Green instinct/belonging from Red-Green revolt, embodied freedom, terrain anger, and anti-civilization pressure. |
| Witherbloom | Distinguish Green life/growth from life-death exchange, potion craft, harvesting, decay study, and resource conversion. |
| Quandrix | Distinguish Green pattern/scale from mathematics, proof, theory, and nature-as-equation. |
| Bant | Distinguish Green living community from ordered excellence, public trust, protection, and hierarchy. |
| Jund | Distinguish Green instinct from predation, appetite, survival hierarchy, and Red/Black pressure. |
| Naya | Distinguish Green natural belonging from communal vitality, creature grandeur, reverence, and Red/White bond-care. |
| Temur | Distinguish Green natural instinct from wilderness knowledge, terrain survival, adaptation, and Red/Blue signal/action. |
| Sultai | Distinguish Green growth/death from exploitation, graveyard resources, ambition, and selective planning. |
| Abzan | Distinguish Green ancestry/tradition from family obligation, endurance, inheritance, and house duty. |
| White / `W` | Existing raw discriminator target; distinguish imposed order/law from natural relation. |
| Blue / `U` | Existing collision target; distinguish self-authorship through tools/knowledge from discovered role. |
| Black / `B` | Existing collision target; distinguish self-secured agency/power from responsibility within the web. |
| Red / `R` | Distinguish impulse/felt action from rooted instinct and belonging. |
| WUBRG / COLORLESS | Existing discriminator targets for support/rules/mechanics boundary. |

No final semantic discriminator is written here.

## K. Green Semantic-Risk Declaration

Gate 1+2 must inspect, without assuming disposition:

- Generic nature, growth, life, instinct, strength, harmony, balance, acceptance, belonging, tradition, community, interdependence, adaptation, evolution, authenticity, destiny, purpose, patience, endurance, simplicity, wisdom, ancestry, ecology, cycles, inevitability, or "the natural order."
- Green described as inherently good, peaceful, passive, simple, anti-intellectual, anti-technology, anti-civilization, conservative, traditionalist, fatalistic, collectivist, or primitive.
- Green described as universally opposed to change, planning, artifice, ambition, individuality, cities, machines, or improvement.
- "Be yourself," "accept your nature," "everything has a place," "might makes right," or "nature knows best" used as universal slogans.
- Nature or instinct treated as inherently morally correct.
- Strength, survival, hierarchy, predation, or destiny treated as the complete Green identity.
- Creatures, lands, ramp, mana, counters, trample, fight, tokens, graveyard, recursion, enchantments, beasts, elves, druids, dinosaurs, hydras, or forests treated as philosophy.
- Collapse into Simic, Selesnya, Golgari, Gruul, Witherbloom, Quandrix, Bant, Jund, Naya, Temur, Sultai, Abzan, or generic mono-color overfit.
- Internal tensions among acceptance, adaptation, individual nature, group interdependence, hierarchy, predation, tradition, and change being erased.
- Mechanics, governance, rules, legality, search, support, discovery, generated runtime text, or commander rows promoted into authoritative philosophy.
- Null IDs/hashes, duplicate canonical/null keys, fixture/provenance mismatch, stale preview/recruiter/placement/public copy, and frozen-field/calibration/native-ID/collision-guidance/candidate-scope drift.

This declaration is a planning control only.

## L. Workflow Regression Comparison

| Question | Result | Evidence | Difference and allowed explanation |
|---|---|---|---|
| Gate 1+2 read-only boundary changed? | PASS | Operating Playbook v2, VM-517 through VM-520 records. | No difference. |
| Governance separation changed? | PASS | This preflight is separate and governance-only. | No difference. |
| Candidate/workflow/review/certification separation changed? | PASS | Exact candidate/review/certification rules remain intact; no candidate exists. | No difference. |
| Exact-SHA discipline changed? | PASS | Program base, Red candidate/review/certification, validator candidate/review, and rejected Red candidate are recorded exactly. | No difference. |
| Validation coverage shrank? | PASS | Planned matrix retains JSON, roles, evidence, isolation, IDs, exact-chain, frozen-field, preview, candidate-scope, source-generated, placement, context, npm, and diff checks. | No reduction. |
| Exact-chain coverage shrank? | PASS | All current G provenance/frozen locator families are recorded; missing fixture and required locator families are called out for Gate 1+2. | No reduction. |
| Frozen-field checking shrank? | PASS | Placement summary, native IDs, terms, threshold, penalty, lists, lateral/collision fields, preview, optional absences, and object pair order are recorded. | No reduction. |
| Optional-field absence checking shrank? | PASS | Top-level confidence, generic target, and Green-local scoring/golden path absence are recorded. | No reduction. |
| Authoritative proof-chain inspection shrank? | PASS | Current unclassified proof-chain contamination is recorded for later audit. | No reduction. |
| Identity-layer preview inspection shrank? | PASS | DRIFT-015 source, consumer, text, equality, exact search, and semantic-alignment controls are recorded. | No reduction. |
| Consumed-surface semantic-alignment checking shrank? | PASS | DRIFT-017 equality-alone lesson is retained. | No reduction. |
| Stale-copy checking shrank? | PASS | Generated, recruiter, public, preview, JS, and exported inspect surfaces are listed for later stale-copy review. | No reduction. |
| Candidate-scope validation shrank? | PASS | Same-SHA G control and WG array control were run. | No reduction. |
| Object-with-pairs structural validation shrank? | PASS | Green object keys and pair order were inspected. | No reduction. |
| Dirty-worktree isolation changed? | PASS | Table Talk baseline remains preserved and excluded. | No difference. |
| Rejected/superseded-candidate handling changed? | PASS | Red rejected candidate remains recorded; future failed Green candidates must remain recorded. | No difference. |
| Reviewed/generated truth reconciliation changed? | PASS | Reviewed/generated truth reconciliation remains mandatory. | No difference. |
| Meaning of candidate/workflow/review/cert/program base changed? | PASS | No candidate/review/certification/program-base advancement occurred. | No difference. |
| New uncovered Green structure? | PASS | Green uses the covered monocolor object-with-`pairs` raw shape and generated collision array; no unsupported structure found. | No incompatibility. |

## M. Planned Validation Matrix

Later Green Goal mode and review must run or record repository-supported equivalents of:

- JSON parse checks.
- Explicit claim-role counts.
- `evidence_scope` checks.
- Discovery isolation.
- Support isolation.
- Mechanics/changelog isolation.
- Rules/governance/legality isolation.
- Null canonical-ID and hash scans.
- Unresolved-pointer scan.
- Duplicate canonical-entry scan.
- Duplicate null-key scan.
- Fixture/provenance exact-chain comparisons.
- Frozen-placement comparison.
- Optional-field-absence comparison.
- Native-ID comparison.
- Required-term and threshold comparison.
- Penalty comparison.
- Strengthen/suppress comparison.
- False-positive-guardrail comparison.
- Lateral- and collision-target comparison.
- Calibration comparison.
- Raw object-with-pairs shape/order comparison.
- Generated collision semantic/order comparison.
- Canonical proof-chain inspection.
- Public/recruiter stale-copy scan.
- Preview ownership check.
- Preview source-to-consumer equality.
- Exact and semantic-equivalent stale-preview searches.
- Preview semantic-alignment review.
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=G`
- `node research/validate-semantic-readiness.mjs --targets=G`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- Candidate-scope command template: `node research/validate-semantic-candidate-scope.mjs --base=<VM521_GATE_1_2_SHA> --target=<VM521_CANDIDATE_SHA> --identity=G`

Candidate-only checks were not run because no Green candidate exists.

## N. Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-521-green-semantic-recovery`, starting HEAD `9f0a076a369cba23dc9bc19231b0efcddd21afe5`. |
| Correct program base | PASS | Program base remains VM-520 Red certification SHA `9f0a076a369cba23dc9bc19231b0efcddd21afe5`. |
| One identity active | PASS | CRIT ledger active identity is `G`; WIP limit 1. |
| Prior identity certified | PASS | Red / R certified `semantically_ready`. |
| Wave 3 state correct | PASS | 4 of 5 monocolors certified. |
| Green setup-only | PASS | No Green Gate 1+2, candidate, review, or certification existed before this record. |
| Allowed worktree baseline enumerated | PASS | Table Talk modified/untracked baseline listed and excluded. |
| Approved validator present and unchanged | PASS | Exact diff to `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` is empty. |
| Green target resolved | PASS | `G` resolves across raw, generated, placement, identity-layer, provenance, recruiter, audit, validation, and candidate-scope tooling. |
| Monocolor pipeline support verified | PASS | G same-SHA control reaches deliberate adjudication; WG array control passes. |
| Candidate-scope same-SHA reaches deliberate adjudication | PASS | Exit 1 only for unclassified proof-chain diagnostics. |
| Candidate-scope validator does not crash | PASS | No TypeError or collision-guidance structural error. |
| Green collision structure supported | PASS | Object-with-`pairs`; pair order preserved. |
| Raw/generated collision representations recorded | PASS | Raw object and generated array both recorded with `U`, then `B` order. |
| Source/file inventory complete | PASS | Raw files, source roles, generated consumers, recruiter, provenance, fixture state, governance, builders, and validators recorded. |
| Claim-role baseline recorded | PASS | 8 total; all unclassified. |
| ID/hash/pointer baseline recorded | PASS | 12 provenance rows; 3 null canonical IDs; 0 null hashes; 0 unresolved pointers. |
| Duplicate baseline recorded | PASS | 0 duplicate canonical entries and 0 duplicate null canonical-entry keys. |
| Fixture/provenance locators recorded | PASS | 12 current provenance locators plus required missing locator families recorded. |
| Exact-chain as-is state recorded | PASS | Ordered IDs, counts, unique counts, duplicates, fixture absence, and missing fixture condition recorded. |
| Frozen fields recorded | PASS | Placement summary, native IDs, terms, threshold, penalty, strengthen/suppress, lateral/collision, guardrail, preview, optional absences, and object pair order recorded. |
| Optional-field absences recorded | PASS | Top-level confidence, generic collision target, and Green-local scoring/golden paths are absent and recorded. |
| Native IDs recorded | PASS | Faction, axes, questions, and collisions recorded. |
| Lateral/collision targets recorded | PASS | Lateral targets `WG`, `UG`, `BG`, `RG`; collision fields recorded. |
| Preview ownership recorded | PASS | Source, consumer, text, and related surfaces recorded. |
| Preview consumers/equality recorded | PASS | `identity-layers` source and embedded `factions` consumer exactly equal; JS/exported copies listed. |
| Later preview semantic-alignment review retained | PASS | DRIFT-015/017 semantic review explicitly required; equality alone is not sufficient. |
| Required neighbors declared | PASS | Required Green-adjacent set declared. |
| Semantic risks declared | PASS | Green-specific risk declaration recorded. |
| Validation matrix not reduced | PASS | Required later matrix recorded. |
| Gate boundaries unchanged | PASS | Gate 1+2 authorized only for later read-only audit; not started here. |
| Exact-SHA rules unchanged | PASS | Exact candidate/review/certification discipline retained. |
| Commit separation unchanged | PASS | This is one governance-only preflight commit. |
| Rejected/superseded-candidate controls retained | PASS | Red rejected candidate remains recorded; future failed Green candidates must remain recorded. |
| Reviewed/generated reconciliation retained | PASS | Required in later review/certification. |
| DRIFT-015 retained | PASS | Preview ownership/equality/stale-copy controls applied. |
| DRIFT-016 retained | PASS | Object-with-`pairs` control applied. |
| DRIFT-018 retained | PASS | Prompt-required neighbor coverage lesson carried forward to Green neighbor declaration. |
| No Green semantic edit | PASS | No raw/generated/provenance/fixture/recruiter/preview/source/test/schema/validator/builder/scoring/calibration/runtime files changed. |
| No Gate 1+2 audit | PASS | This record is pre-Gate 1+2 only. |
| No remediation authorization | PASS | Remediation remains unauthorized. |
| No VM-522 work | PASS | VM-522 not started. |
| External tracker untouched | PASS | Excel not modified. |
| Candidate-only validation | N/A - no Green candidate exists; exact future command is recorded. | Candidate-only validation belongs after Gate 5 candidate creation. |
| Generation determinism | N/A - generation was not run in this governance-only preflight because generation may rewrite artifacts. | Later Gate 4 must prove deterministic generation. |

All controls are PASS or explained N/A. No FAIL or UNKNOWN controls were recorded.

## O. Decision

PASS - GREEN GATE 1+2 AUTHORIZED

Authorization permits only the next window's Gate 1+2 read-only audit. It does not authorize remediation.

## P. Validation Run

Commands and checks actually run:

- `git status --short`
- `git branch --show-current`
- `git rev-parse HEAD`
- `git merge-base HEAD 9f0a076a369cba23dc9bc19231b0efcddd21afe5`
- `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short`
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=9f0a076a369cba23dc9bc19231b0efcddd21afe5 --target=9f0a076a369cba23dc9bc19231b0efcddd21afe5 --identity=G`
- `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG`
- `node research/audit-semantic-readiness.mjs --targets=G`
- `node research/validate-semantic-readiness.mjs --targets=G`
- JSON read/parse checks for Green raw/generated/provenance/ledger files.
- Exact preview/public-surface search and generated/recruiter consumer search.

Post-edit validation and staged-scope checks are recorded by the final response after the governance commit.

## Q. Not Performed

- No Gate 1+2 semantic adjudication occurred.
- No Green claim/source role was changed or adjudicated.
- No remediation was authorized.
- No Green raw, generated, fixture, provenance, preview, recruiter, source, test, schema, validator, builder, scoring, calibration, or runtime file was modified.
- No fixture was created.
- No candidate was created.
- No independent review occurred.
- No certification occurred.
- No VM-522 work occurred.
- No original-main write, Excel update, push, PR, or merge occurred.

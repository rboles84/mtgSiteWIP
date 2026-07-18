# VM-518 Blue Drift Preflight

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: VM-518 - Blue / U
Cohort: Wave 3 monocolors
Branch: `codex/vm-518-blue-semantic-recovery`
Starting HEAD/program base: `9d250a7a76d219fdb961915cbf989a10a575c757`
Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
Preflight decision: `PASS - BLUE GATE 1+2 AUTHORIZED`

This is a governance-only pre-identity drift preflight. It records the as-is Blue baseline and process readiness only. No Gate 1+2 semantic audit, claim adjudication, remediation, generation, fixture creation, candidate, review, certification, program-base advancement, VM-519 work, original-main edit, Excel update, or Table Talk commit occurred.

## Repository State

| Control | Result | Evidence |
|---|---:|---|
| Worktree path | PASS | `git rev-parse --show-toplevel` returned `C:/dev/mtgSiteWIP-crit001`. |
| Branch | PASS | `git rev-parse --abbrev-ref HEAD` returned `codex/vm-518-blue-semantic-recovery`. |
| Starting HEAD | PASS | `git rev-parse HEAD` returned `9d250a7a76d219fdb961915cbf989a10a575c757`. |
| Program base | PASS | Current branch starts from White certification/program base `9d250a7a76d219fdb961915cbf989a10a575c757`. |
| Ancestry | PASS | Program base is an ancestor of current HEAD. |
| White certification | PASS | Board and ledger record White / W certified `semantically_ready`; certified count is 16. |
| Wave 3 state | PASS | Wave 3 monocolors are 1 of 5 certified; Blue is setup-only. |
| Active worktree baseline | PASS | Only `docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs were dirty before VM-518 edits. |
| Original main allowance | PASS | `C:\dev\mtgSiteWIP` shows the known docs/workflow dirty baseline only; no raw/generated/semantic/runtime changes were observed. |
| VM-519 state | PASS | VM-519 remains backlog/not started; no VM-519 files were touched. |

## Approved Validator Integrity

Approved monocolor infrastructure candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Independent approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`

| Control | Result | Evidence |
|---|---:|---|
| Approved validator object exists | PASS | `git rev-parse --verify "aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2^{commit}"` returned the exact SHA. |
| Validator files unchanged | PASS | `git diff --exit-code aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` returned no diff. |
| Regression tests | PASS | `node research/semantic-candidate-scope-tests.js` returned `Semantic candidate scope tests passed.` |
| Blue same-SHA scope probe | PASS | `node research/validate-semantic-candidate-scope.mjs --base=9d250a7a76d219fdb961915cbf989a10a575c757 --target=9d250a7a76d219fdb961915cbf989a10a575c757 --identity=U` exited `1` with deliberate unclassified-proof contamination diagnostics and no unhandled crash or collision-guidance type error. |
| Array-shape regression control | PASS | Same-SHA `--identity=WG` candidate-scope control exited `0`. |

Blue raw `collision_guidance` is an object with keys `rule`, `review_triggers`, and ordered `pairs`; generated placement flattens this to an array. The approved validator covers both shapes, preserves source ordering, preserves `collision_id` and `against`, and fails closed for malformed unknown shapes.

## Blue Identity Resolution

| Item | Resolved value |
|---|---|
| Internal identity code | `U` |
| Candidate-scope target | `U` |
| Raw directory | `data/raw-factions/blue/` |
| Raw files | `blue.claims.json`, `blue.sources.json`, `blue.profile.json`, `blue.placement.json`, `blue.changelog.json` |
| Generated faction key | `data/factions.json#/factions/U` |
| Placement-model key | `data/placement-model.json#/factions/U` |
| Identity-layer key | `data/identity-layers.json#/expressions/U` |
| Embedded preview consumer | `data/factions.json#/identity_layers/expressions/U` |
| Provenance identity key | `U` |
| Fixture convention | `research/fixtures/semantic-readiness/blue.semantic-fixtures.json` |
| Recruiter context | `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/U` |

Repository tooling recognizes `--targets=U`: audit exits 0 and validation exits 1 with expected pre-remediation semantic failures.

## Source Inventory

This inventory records stored values only and does not adjudicate source roles.

| Source ID | Stored role | Tier | Locator / URL | Hash present |
|---|---|---|---|---:|
| `MONO-U-2015` | `philosophy_backbone` | `gold_official_article` | `docs/research/mono_upgrade/11_blue.md`; WotC URL present | yes |
| `MONO-U-2025` | `current_voice_update` | `gold_official_article` | `docs/research/mono_upgrade/11_blue.md`; WotC URL present | yes |
| `MECH-CP-2021` | `mechanical_authority` | `gold_official_article_snapshot` | `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md`; WotC URL present | yes |
| `GOV-COC-2024` | `governance_process_authority` | `gold_official_article` | `docs/research/mono_upgrade/22_council_of_colors.md`; WotC URL present | yes |
| `RULES-CR` | `commander_rules_boundary` | `gold_official_living_rules` | `docs/research/mono_upgrade/30_commander_and_rules.md`; WotC rules URL present | no |
| `VM-377` | `project_governance` | `vox_mana_planning_authority` | no URL/locator in source row | no |
| `SCRYFALL-U-2026-06-13` | `current_card_legality_verification` | `current_card_database` | no URL/locator in source row | no |

## As-Is Claim and Evidence Baseline

| Metric | Value |
|---|---:|
| Raw total claims | 8 |
| `substantive_claim` | 0 |
| `discovery_record` | 0 |
| `support_record` | 0 |
| Unclassified/unassigned | 8 |
| Substantive evidence locations missing `evidence_scope` | 0 because no claim is currently substantive |
| Claims lacking bounded `evidence_locations` | 8 |
| U provenance entries | 12 |
| Required null canonical IDs | 3 |
| Null canonical content hashes | 0 |
| Unresolved pointers | 0 |
| Duplicate canonical-entry keys | 2 duplicate null-locator/null-ID keys |

Current authoritative and generated proof chains use unclassified claim IDs. Raw profile references all eight claims in `/core_identity` and `/profile`, and `blue_claim_0007` in `/mechanics`. Raw placement references unclassified claims in three axes, four discriminator questions, and both collision pairs. Generated placement, recruiter context, and provenance also reference unclassified claims. This is a Gate 1+2 inspection target; it is not remediated here.

`node research/audit-semantic-readiness.mjs --targets=U` exits 0 and reports 8 claims, all unclassified, 7 source rows, and no explicit claim-bearing source roles. `node research/validate-semantic-readiness.mjs --targets=U` exits 1 with expected pre-remediation findings: missing semantic roles, missing recruiter evidence mapping, no substantive authoritative references, and missing identity semantic fixtures.

## Fixture and Provenance Baseline

Current fixture file: absent at `research/fixtures/semantic-readiness/blue.semantic-fixtures.json`.

Current U provenance contains 12 entries. The current rows do not expose canonical locator fields; Gate 1+2 must adjudicate required locators from raw/generated structure and later fixture precedent.

| Index / current canonical ID | Generated ordered claim IDs | Count | Unique | Duplicates | Fixture state |
|---|---|---:|---:|---|---|
| `blue_vs_red` | `blue_claim_0005` | 1 | 1 | none | missing |
| `blue_vs_green` | `blue_claim_0005` | 1 | 1 | none | missing |
| `blue_disc_001` | `blue_claim_0002`, `blue_claim_0003` | 2 | 2 | none | missing |
| `blue_disc_002` | `blue_claim_0004`, `blue_claim_0005` | 2 | 2 | none | missing |
| `blue_disc_003` | `blue_claim_0006` | 1 | 1 | none | missing |
| `blue_disc_004` | `blue_claim_0007`, `blue_claim_0008` | 2 | 2 | none | missing |
| `axis_perfection_through_knowledge` | `blue_claim_0002`, `blue_claim_0003` | 2 | 2 | none | missing |
| `axis_deliberation_over_impulse` | `blue_claim_0004`, `blue_claim_0005` | 2 | 2 | none | missing |
| `axis_reactivity_risk` | `blue_claim_0006` | 1 | 1 | none | missing |
| null canonical ID | `blue_claim_0001` through `blue_claim_0008` | 8 | 8 | none | missing |
| null canonical ID | `blue_claim_0007` | 1 | 1 | none | missing |
| null canonical ID | `blue_claim_0001` through `blue_claim_0008` | 8 | 8 | none | missing |

Required Gate 1+2 locator families include profile core identity, mechanics/methods, profile-wide chains, placement summary, axes, discriminator questions, collision pairs, recruiter/chatbot guidance, and preview/display mappings.

## Frozen Scope, Collision, and Preview Baseline

| Field | Current value |
|---|---|
| Raw placement summary | `Blue is a strong fit when a user wants to understand, optimize, control, and improve through knowledge, tools, patience, and deliberate choice.` |
| Top-level placement confidence | N/A - no top-level confidence field exists in current Blue raw or generated placement. |
| Discriminator confidence values | `blue_disc_001: High`; `blue_disc_002: High`; `blue_disc_003: Medium`; `blue_disc_004: High` |
| Native IDs | faction `blue`; axes `axis_perfection_through_knowledge`, `axis_deliberation_over_impulse`, `axis_reactivity_risk`; questions `blue_disc_001` through `blue_disc_004`; collision IDs `blue_vs_red`, `blue_vs_green` |
| Required positive terms | `knowledge`, `learning`, `tools`, `improvement`, `optimization`, `control`, `deliberation` |
| Minimum hits | 2 |
| Broad penalty | 0.13 |
| Strengthen list | `self-authorship through education`; `careful planning before action`; `tools and technology`; `reactive control as preparation` |
| Suppress list | `acting from immediate emotion`; `natural destiny over choice`; `group order above individual path`; `risk-taking without study` |
| Lateral targets | Generated placement: `WU`, `UB`, `UR`, `UG` |
| Raw collision guidance shape | object with `rule`, `review_triggers`, `pairs` |
| Raw collision pair order | `R`, `G` |
| Generated collision guidance shape | array with `blue_vs_red`, `blue_vs_green` |
| Generic collision target | absent |
| Calibration | `required_positive_evidence_terms`, `required_positive_min_hits: 2`, strengthen/suppress lists, false-positive guardrail, `broad_match_penalty: 0.13` |
| Golden paths / scoring | No Blue-local golden-path or scoring fields identified beyond placement/calibration-sensitive fields. |
| Preview source | `data/identity-layers.json#/expressions/U/preview_text` |
| Preview text | `Blue values learning, patience, improvement, planning, and possibility. It asks what life could become with enough understanding.` |
| Embedded consumer | `data/factions.json#/identity_layers/expressions/U/preview_text` |
| Preview equality | source and embedded consumer are exactly equal |

Any later candidate must preserve or explicitly justify target-scoped exceptions for these fields. DRIFT-015 requires preview ownership, source-to-embedded equality, exact stale-copy search, semantic-equivalent stale-copy review, and consumed-surface inspection.

## Required Neighbors and Semantic Risks

Gate 1+2 must declare and inspect at least: `GENERIC_U_OVERFIT`, `WU`, `UR`, `UB`, `UG`, `PRISMARI`, `QUANDRIX`, `ESPER`, `BANT`, `GRIXIS`, `TEMUR`, `SULTAI`, `W`, `B`, `R`, and `G`.

The later Gate 1+2 audit must inspect generic Blue overfit, generic intelligence/knowledge/scholarship/science/control/planning/perfection/progress language, mechanics-first Blue definitions, creature or place stereotypes, collapse into Azorius/Izzet/Dimir/Simic/Prismari/Quandrix and broader shards/wedges, discovery or process material promoted into philosophy, null IDs/hashes, fixture/provenance mismatch, stale recruiter/public/preview copy, and frozen-field drift.

This preflight does not adjudicate those risks; it declares them as mandatory Gate 1+2 controls.

## Workflow Regression Comparison

| Question | Result | Evidence |
|---|---:|---|
| Gate 1+2 read-only boundary changed? | PASS | No change from White, Simic, Selesnya, or drift-control template. |
| Gate 1+2 governance separation changed? | PASS | This preflight remains governance-only; future Gate 1+2 must be separate. |
| Candidate/workflow/review/certification separation changed? | PASS | Exact-SHA and separate governance commit rules remain intact. |
| Validation coverage shrank? | PASS | Planned matrix retains JSON, role, evidence_scope, isolation, ID/hash, fixture/provenance, frozen-field, preview, candidate-scope, source-generated, placement, context, npm, and diff checks. |
| Exact-chain coverage shrank? | PASS | Current fixture absence and all U provenance chains are recorded for later exact parity. |
| Frozen-field checking shrank? | PASS | Native IDs, terms, thresholds, penalty, lateral targets, collision shape/order, calibration, and preview ownership are recorded. |
| Candidate-scope structural validation shrank? | PASS | Approved validator files match exact infrastructure candidate and Blue same-SHA probe reaches deliberate adjudication. |
| Dirty-worktree isolation changed? | PASS | Table Talk baseline is preserved and excluded. |
| Superseded-candidate and exact-SHA rules retained? | PASS | Future workflow matrix requires superseded candidates to remain recorded and only exact candidate SHAs to be reviewed. |
| Reviewed/generated truth reconciliation retained? | PASS | DRIFT-015 and DRIFT-016 controls remain active. |
| Blue introduced uncovered structure? | PASS | Blue uses the monocolor object-with-`pairs` raw shape already covered by the approved validator and White precedent. |

## Planned Validation Matrix

Later Blue Goal mode and review must run or explicitly account for: JSON parse checks; explicit claim-role counts; `evidence_scope` checks; discovery/support/mechanics/process/rules/governance/legality isolation; null canonical-ID/hash scan; unresolved-pointer scan; duplicate canonical-entry scan; fixture/provenance exact-chain comparisons; frozen placement, native-ID, required-term, threshold, penalty, strengthen/suppress, lateral/collision, calibration, object-with-pairs, and preview checks; authoritative proof-chain inspection; public/recruiter stale-copy scans; preview source-to-embedded equality; exact and semantic-equivalent stale-preview searches; `npm.cmd run build:factions`; `node research/audit-semantic-readiness.mjs --targets=U`; `node research/validate-semantic-readiness.mjs --targets=U`; `node research/semantic-candidate-scope-tests.js`; `npm.cmd run test:semantic-readiness`; `npm.cmd run test:placement`; `npm.cmd run test:faction-context-isolation`; `npm.cmd run test:source-generated`; `npm.cmd test`; `git diff --check`; and exact candidate scope:

`node research/validate-semantic-candidate-scope.mjs --base=<VM518_GATE_1_2_SHA> --target=<VM518_CANDIDATE_SHA> --identity=U`

Candidate-only checks are not run in this preflight because no Blue candidate exists.

## Drift Scorecard

| Control | Result | Evidence |
|---|---:|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-518-blue-semantic-recovery`, HEAD `9d250a7a76d219fdb961915cbf989a10a575c757`. |
| Correct program base | PASS | Program base remains White certification SHA `9d250a7a76d219fdb961915cbf989a10a575c757`. |
| One identity active | PASS | Active identity is Blue / U only. |
| Prior identity certified | PASS | White is certified `semantically_ready`; certified count 16. |
| Wave 3 status correct | PASS | 1 of 5 monocolors certified. |
| Blue setup-only | PASS | No Blue Gate 1+2, candidate, review, or certification record exists. |
| Allowed worktree baseline enumerated | PASS | Shared handoff index plus two Table Talk handoffs recorded and excluded. |
| Approved validator present and unchanged | PASS | Exact diff against `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` is empty. |
| Blue target code resolved | PASS | Target `U` is recognized by audit, validation, and candidate-scope tooling. |
| Monocolor pipeline support verified | PASS | Blue same-SHA scope control reaches deliberate adjudication; WG array control passes. |
| Candidate-scope validator does not crash | PASS | U probe exits 1 with semantic proof-chain diagnostics, not infrastructure failure. |
| Blue collision-guidance shape supported | PASS | Object-with-`pairs` raw shape covered; generated array shape also covered. |
| Source/file inventory complete | PASS | Raw files, generated consumers, recruiter context, sources, governance records, and tooling inventoried. |
| Current claim-role baseline recorded | PASS | 8 total; all unclassified. |
| ID/hash/pointer baseline recorded | PASS | 12 provenance entries; 3 null IDs; 0 null hashes; 0 unresolved pointers; 2 duplicate null canonical keys. |
| Fixture/provenance locators recorded | PASS | Current fixture absence and current provenance canonical IDs/claim arrays recorded; missing locator fields called out. |
| Exact-chain as-is state recorded | PASS | Every U provenance chain lists ordered IDs, count, uniqueness, and missing fixture state. |
| Frozen fields recorded | PASS | Native IDs, terms, thresholds, penalty, lists, lateral/collision, calibration, and preview captured. |
| Preview ownership recorded | PASS | Source and embedded preview paths/text/equality recorded. |
| Required neighbors declared | PASS | Required Blue and Blue-adjacent comparison set listed. |
| Semantic risks declared | PASS | Blue overfit, mechanics, neighbor-collapse, preview, proof-chain, and frozen-drift risks declared. |
| Validation matrix not reduced | PASS | Matrix includes all drift-control and Blue-specific controls. |
| Gate boundaries unchanged | PASS | Gate 1+2 is authorized only for the next read-only audit. |
| Exact-SHA rules unchanged | PASS | Future candidate/review/certification exact-SHA discipline retained. |
| Commit separation unchanged | PASS | This is one governance-only preflight commit; future gates remain separate. |
| Superseded-candidate rules retained | PASS | Future failed candidates must remain recorded. |
| Reviewed/generated truth reconciliation retained | PASS | DRIFT-015/016 controls remain mandatory. |
| No Blue semantic edit | PASS | No Blue implementation files changed. |
| No Gate 1+2 audit | PASS | This record is pre-Gate 1+2 only. |
| No remediation authorization | PASS | Remediation remains unauthorized. |
| No VM-519 work | PASS | VM-519 remains untouched. |
| External tracker untouched | PASS | Excel was not modified. |

No `FAIL` or `UNKNOWN` controls were recorded. No N/A scorecard result was needed; N/A appears only in the frozen-field baseline where the current packet has no top-level placement confidence field.

## Decision

PASS - BLUE GATE 1+2 AUTHORIZED

Authorization permits only the next window's Gate 1+2 read-only semantic audit. It does not authorize remediation.

# VM-520 Red Drift Preflight

Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: VM-520 - Red / R
Cohort: Wave 3 monocolors
Branch: `codex/vm-520-red-semantic-recovery`
Starting HEAD: `1116786785dc4c5c8c1447dcad79c89e527657eb`
Current CRIT-001 program base: `1116786785dc4c5c8c1447dcad79c89e527657eb`
Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
Preflight decision: `PASS - RED GATE 1+2 AUTHORIZED`

This is a governance-only pre-identity drift preflight. It records the as-is Red baseline and process readiness only. No Gate 1+2 semantic audit, source-role adjudication, claim adjudication, remediation, generation, fixture creation, candidate, independent review, certification, program-base advancement, VM-521 work, original-main edit, Excel update, or Table Talk commit occurred.

## A. Preflight State

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | Active worktree is `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `git branch --show-current` returned `codex/vm-520-red-semantic-recovery`. |
| Starting HEAD | PASS | `git rev-parse HEAD` returned `1116786785dc4c5c8c1447dcad79c89e527657eb`. |
| Program base | PASS | Required current certification/program base is VM-519 Black certification SHA `1116786785dc4c5c8c1447dcad79c89e527657eb`; this preflight does not advance it. |
| Certified count | PASS | CRIT ledgers and board record 18 certified identities. |
| Wave 3 status | PASS | Wave 3 monocolors remain 3 of 5 certified. |
| Prior identity certified | PASS | Black / B is certified `semantically_ready` from approved replacement candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8`; approval review `8aac2c23ff13986790950a63b093d9787ae7bf1d`; rejected candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` remains unapproved; certification/program-base commit `1116786785dc4c5c8c1447dcad79c89e527657eb`. |
| Red setup-only | PASS | VM-520 existed only as setup before this record; Red Gate 1+2, remediation, candidate, review, certification, and `semantically_ready` transition have not started. |
| Allowed active worktree baseline | PASS | Preserved and excluded: modified `docs/handoffs/HANDOFF_INDEX.md`; untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md`; untracked `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`. |
| Original main allowance | PASS | Read-only `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` showed docs/workflow dirt only; no raw, generated, semantic, fixture, provenance, data, test, schema, validator, builder, scoring, calibration, or runtime changes. |
| VM-521 untouched | PASS | VM-521 semantic work remains not started. |

## B. Approved Validator Integrity

Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Independent approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`

| Control | Result | Evidence |
|---|---|---|
| Exact tree integrity | PASS | `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` exited 0. |
| Later validator modifications | PASS | `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` returned no commits. |
| Regression tests | PASS | `node research/semantic-candidate-scope-tests.js` exited 0: `Semantic candidate scope tests passed.` |
| Array collision guidance | PASS | WG array-shape candidate-scope control exited 0 for `99a239dea91039a13511d155f9b652d297baab21..02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`. |
| Object-with-pairs collision guidance | PASS | Red raw placement uses object keys `rule`, `review_triggers`, `pairs`; same-SHA R control reached deliberate proof-chain diagnostics with no structural crash. |
| Fail-closed diagnostics | PASS | R same-SHA output is structured unclassified proof-chain diagnostics, not an unhandled TypeError or collision-guidance structural error. |

## C. Red Identity Resolution

| Item | Resolved value |
|---|---|
| Internal identity code | `R` |
| Candidate-scope target | `R` |
| Raw directory | `data/raw-factions/red/` |
| Raw files | `red.claims.json`, `red.sources.json`, `red.profile.json`, `red.placement.json`, `red.changelog.json` |
| Generated faction key | `data/factions.json#/factions/R` |
| Placement-model key | `data/placement-model.json#/factions/R` |
| Identity-layer key | `data/identity-layers.json#/colors/R` and `data/factions.json#/identity_layers/colors/R` |
| Provenance key | `data/semantic-readiness-provenance.json` entries with `identity_key: "R"` |
| Fixture convention | `research/fixtures/semantic-readiness/red.semantic-fixtures.json` |
| Recruiter/recommendation key | `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/R`; commander support rows in `data/raw-factions/red/red.profile.json#/commander_compass` and generated `data/factions.json#/factions/R/commander_compass` |
| Collision-guidance runtime shape | Raw object with keys `rule`, `review_triggers`, `pairs`; generated placement array with `red_vs_white`, `red_vs_blue`. |

Repository tooling recognizes `--targets=R`: audit exits 0 and validation exits 1 with expected pre-remediation semantic failures.

## D. Candidate-Scope Structural Compatibility

| Command | Exit | Result |
|---|---:|---|
| `node research/validate-semantic-candidate-scope.mjs --base=1116786785dc4c5c8c1447dcad79c89e527657eb --target=1116786785dc4c5c8c1447dcad79c89e527657eb --identity=R` | 1 | PASS as deliberate pre-remediation proof-chain adjudication: unclassified Red claims appear in generated placement, recruiter, and provenance proof chains. No unhandled crash and no collision-guidance structural error. |
| `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG` | 0 | PASS; certified array-shape control returned `Semantic candidate scope passed for WG`. |

Red raw collision-guidance path: `data/raw-factions/red/red.placement.json#/collision_guidance`. Observed runtime type: object. Object keys: `rule`, `review_triggers`, `pairs`. `pairs` order is `red_vs_white` against `W`, then `red_vs_blue` against `U`. The approved validator covers this structure. No unknown structure remains.

## E. Red File and Source Inventory

Generated and consumed surfaces:

- `data/factions.json#/factions/R`
- `data/placement-model.json#/factions/R`
- `data/identity-layers.json#/colors/R`
- `data/factions.json#/identity_layers/colors/R`
- `data/semantic-readiness-provenance.json#/entries[identity_key=R]`
- `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/R`

Source inventory records currently stored roles only:

| Source ID | Current stored role | Source type / tier | URL or repository locator | Content hash present |
|---|---|---|---|---|
| `MONO-R-2015` | `philosophy_backbone` | `gold_official_article` | WotC URL plus `docs/research/mono_upgrade/13_red.md`; local PDF path present | yes |
| `MONO-R-2025` | `current_voice_update` | `gold_official_article` | WotC URL plus `docs/research/mono_upgrade/13_red.md`; local PDF path present | yes |
| `MECH-CP-2021` | `mechanical_authority` | `gold_official_article_snapshot` | WotC URL plus `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md`; local PDF path present | yes |
| `GOV-COC-2024` | `governance_process_authority` | `gold_official_article` | WotC URL plus `docs/research/mono_upgrade/22_council_of_colors.md`; local PDF path present | yes |
| `RULES-CR` | `commander_rules_boundary` | `gold_official_living_rules` | `https://magic.wizards.com/en/rules`; `docs/research/mono_upgrade/30_commander_and_rules.md` | no |
| `VM-377` | `project_governance` | `vox_mana_planning_authority` | `docs/kanban/in-progress/VM-377-mono-gold-source-intake-planning.md` | no |
| `SCRYFALL-R-2026-06-13` | `current_card_legality_verification` | `current_card_database` | verified card URIs inside the source row | no |

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
| Required null canonical IDs | 12 current R provenance rows expose no canonical ID in the current generated record shape. |
| Required null content hashes | Current R provenance rows expose no canonical content hash in the current generated record shape. |
| Unresolved claim/source pointers | 0 unresolved pointers observed in audit output. |
| Duplicate canonical provenance entries | 0 duplicate canonical entries observed in the current generated record shape. |
| Existing provenance count | 12 |
| Existing fixture | Missing at `research/fixtures/semantic-readiness/red.semantic-fixtures.json`. |

`node research/audit-semantic-readiness.mjs --targets=R` exited 0 and reported 8 claims, all unclassified, 7 sources, and 12 reference sites. `node research/validate-semantic-readiness.mjs --targets=R` exited 1 with expected pre-remediation findings: missing semantic roles, missing recruiter evidence mapping, no substantive authoritative references, and missing Red semantic fixtures.

## G. Fixture and Provenance Baseline

Current fixture file: absent at `research/fixtures/semantic-readiness/red.semantic-fixtures.json`.

| Locator | Current ordered IDs | Count / unique | Fixture state | Duplicates | Missing fixture/provenance condition |
|---|---|---:|---|---|---|
| `data/raw-factions/red/red.placement.json#/collision_guidance/pairs/0` (`red_vs_white`) | `red_claim_0005` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/collision_guidance/pairs/1` (`red_vs_blue`) | `red_claim_0005` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/0` (`red_disc_001`) | `red_claim_0002`, `red_claim_0003`, `red_claim_0004` | 3 / 3 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/1` (`red_disc_002`) | `red_claim_0005`, `red_claim_0006` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/2` (`red_disc_003`) | `red_claim_0005`, `red_claim_0006` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/3` (`red_disc_004`) | `red_claim_0007`, `red_claim_0008` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/placement_axes/0` (`axis_emotion_to_action`) | `red_claim_0002`, `red_claim_0003` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/placement_axes/1` (`axis_freedom_over_constraint`) | `red_claim_0004`, `red_claim_0005` | 2 / 2 | missing | none | fixture missing |
| `data/raw-factions/red/red.placement.json#/placement_axes/2` (`axis_consequence_shadow`) | `red_claim_0006` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/red/red.profile.json#/core_identity` | `red_claim_0001` through `red_claim_0008` | 8 / 8 | missing | none | fixture missing |
| `data/raw-factions/red/red.profile.json#/mechanics` | `red_claim_0007` | 1 / 1 | missing | none | fixture missing |
| `data/raw-factions/red/red.profile.json#/profile` | `red_claim_0001` through `red_claim_0008` | 8 / 8 | missing | none | fixture missing |

Additional Gate 1+2 locator families to adjudicate from current structure and monocolor precedent: placement summary, profile-wide proof chains, mechanics/methods chains, axes, discriminator questions, collision pairs, recruiter/chatbot guidance, preview mappings, commander support rows, and any freedom, emotion, action, damage, speed, impulse, passion, destruction, commander, rules, or legality-specific proof chain present in the packet.

## H. Frozen Placement and Scope Baseline

| Field | Exact locator | Current value | Frozen | Later checkpoint |
|---|---|---|---|---|
| Placement summary | `data/raw-factions/red/red.placement.json#/placement_summary` | `Red is a strong fit when a user wants freedom, emotional truth, immediacy, and action that makes life vivid rather than over-managed.` | yes | Candidate, review, certification |
| Native IDs | raw placement/profile | faction `red`; axes `axis_emotion_to_action`, `axis_freedom_over_constraint`, `axis_consequence_shadow`; questions `red_disc_001` through `red_disc_004`; collisions `red_vs_white`, `red_vs_blue` | yes | Candidate, review, certification |
| Required positive terms | `#/calibration_tuning/required_positive_evidence_terms` | `freedom`, `emotion`, `action`, `passion`, `impulse`, `experience`, `speed` | yes | Candidate, review, certification |
| Minimum-hit threshold | `#/calibration_tuning/required_positive_min_hits` | `2` | yes | Candidate, review, certification |
| Broad penalty | `#/calibration_tuning/broad_match_penalty` | `0.13` | yes | Candidate, review, certification |
| Strengthen list | `#/calibration_tuning/strengthen_when_user_centers` | `acting from feeling`; `learning by doing`; `breaking restrictive stasis`; `loyalty or passion` | yes | Candidate, review, certification |
| Suppress list | `#/calibration_tuning/suppress_when_user_centers` | `rules over desire`; `analysis before every action`; `power calculation without feeling`; `chaos without emotional truth` | yes | Candidate, review, certification |
| False-positive guardrail | `#/calibration_tuning/false_positive_guardrail` | `Do not place Red for chaos, anger, or haste alone; require freedom, emotion, action, or lived experience.` | yes | Candidate, review, certification |
| Lateral targets | generated placement scan | Red-containing generated placement keys include `WR`, `BR`, `RG`, `UR`, `PRISMARI`, `LOREHOLD`, `QUANDRIX`, `SILVERQUILL`, `WITHERBLOOM`, `ESPER`, `GRIXIS`, `MARDU`, `TEMUR`, `WUBRG`, `YORE`, and `COLORLESS`. | yes | Candidate, review, certification |
| Collision targets | raw discriminator/collision fields | question targets: `B,G`; `W,B`; `U`; `WUBRG,COLORLESS`; collision pairs: `W`, `U` | yes | Candidate, review, certification |
| Object-with-pairs metadata/order | `#/collision_guidance` | object keys `rule`, `review_triggers`, `pairs`; pair order `red_vs_white`, then `red_vs_blue` | yes | Candidate, review, certification |

## I. Preview and Consumed-Surface Baseline

Permanent DRIFT-015 controls applied.

| Control | Result | Evidence |
|---|---|---|
| Raw site-surface source captured | PASS | `data/raw-factions/red/red.profile.json#/site_surface` currently stores short summary `Red follows feeling into action, freedom, connection, risk, and vivid experience.`, one-sentence identity `Red is the spark that would rather learn from the blast than spend life behind glass.`, and tagline `Feel it. Do it. Live.` |
| Generated identity-layer/public source captured | PASS | `data/identity-layers.json#/colors/R` and `data/factions.json#/factions/R` contain generated public wording including tagline `The honest spark moves before the cage closes.` |
| Embedded consumer captured | PASS | The same generated public wording appears in `data/factions.json#/identity_layers/colors/R` and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/R`. |
| Exact preview search | PASS | Exact searches found raw site-surface text only in `data/raw-factions/red/red.profile.json`; generated tagline/decree text appears in `data/identity-layers.json`, `data/factions.json`, and recruiter context. |
| Semantic-alignment later mandatory | PASS | Gate 1+2, candidate, independent review, and certification must run DRIFT-015 semantic-equivalent stale-preview review; equality alone is not sufficient after DRIFT-017. |
| Propagation command | PASS | Later authorized generation should use `npm.cmd run build:factions` / `research/build-faction-artifacts.mjs`. |

## J. Required Neighbor Declaration

Gate 1+2 must compare Red against at least: `GENERIC_R_OVERFIT`, White / `W`, Blue / `U`, Black / `B`, Green / `G`, Boros / `WR`, Rakdos / `BR`, Gruul / `RG`, Izzet / `UR`, Prismari, Lorehold, Quandrix, Silverquill, Witherbloom, Esper, Grixis, Mardu, Temur, WUBRG, and COLORLESS.

No final semantic discriminator is written here.

## K. Red Semantic-Risk Declaration

Gate 1+2 must inspect, without assuming disposition:

- Red collapsed into generic chaos, anger, damage, haste, passion, emotion, impulse, fire, violence, spectacle, romance, or spontaneity.
- Red treated as reckless by default, or as morally superior because it is honest or free.
- Damage, haste, temporary mana, impulsive draw, rummaging, Treasure, artifact destruction, spell copying, or extra attacks treated as philosophy.
- Commander rows, Scryfall legality checks, rules, governance, mechanics, or generated runtime text promoted into authoritative identity proof.
- Red collapsed into Boros duty/conviction, Rakdos spectacle/transgression, Gruul wild belonging, Izzet experimentation, or generic mono-color overfit.
- Raw site-surface, generated identity-layer, recruiter, placement, provenance, and public preview surfaces drifting from the final source-bounded semantic disposition.

This declaration is a planning control only.

## L. Workflow Regression Comparison

| Question | Result | Evidence |
|---|---|---|
| Gate 1+2 read-only boundary changed? | PASS | Operating Playbook v2 and prior monocolor records keep Gate 1+2 read-only. |
| Candidate/workflow/review/certification separation changed? | PASS | Exact candidate/review/certification rules remain intact; no candidate exists. |
| Exact-SHA discipline changed? | PASS | Starting HEAD/program base, validator candidate, validator review, Black candidate/review/base, and rejected Black candidate are recorded exactly. |
| Validation coverage shrank? | PASS | Planned matrix retains JSON, role, evidence, isolation, ID/hash, exact-chain, frozen-field, preview, candidate-scope, source-generated, placement, context, npm, and diff checks. |
| Exact-chain coverage shrank? | PASS | All current R provenance/frozen locator families are recorded; missing fixture and required locator families are called out for Gate 1+2. |
| Preview inspection shrank? | PASS | DRIFT-015 source, consumer, text, exact search, and semantic-alignment controls are recorded. |
| Candidate-scope validation shrank? | PASS | Same-SHA R control and WG array control were run. |
| Object-with-pairs structural validation shrank? | PASS | Red object keys and pair order were inspected. |
| Dirty-worktree isolation changed? | PASS | Table Talk baseline remains preserved and excluded. |
| Reviewed/generated truth reconciliation changed? | PASS | DRIFT-015/016/017 and reviewed/generated truth reconciliation remain mandatory. |
| New uncovered Red structure? | PASS | Red uses the covered monocolor object-with-`pairs` raw shape and generated collision array; no unsupported structure found. |

## M. Planned Validation Matrix

Later Red Goal mode and review must run or record repository-supported equivalents of:

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
- Preview source-to-embedded equality where applicable.
- Exact and semantic-equivalent stale-preview searches.
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/validate-semantic-readiness.mjs --targets=R`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- Candidate-scope command template: `node research/validate-semantic-candidate-scope.mjs --base=<VM520_GATE_1_2_SHA> --target=<VM520_CANDIDATE_SHA> --identity=R`

Candidate-only checks were not run because no Red candidate exists.

## N. Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-520-red-semantic-recovery`, starting HEAD `1116786785dc4c5c8c1447dcad79c89e527657eb`. |
| Correct program base | PASS | Program base remains VM-519 Black certification SHA `1116786785dc4c5c8c1447dcad79c89e527657eb`. |
| One identity active | PASS | CRIT ledger active identity is `R`; WIP limit 1. |
| Prior identity certified | PASS | Black / B certified `semantically_ready`. |
| Wave 3 status correct | PASS | 3 of 5 monocolors certified. |
| Red setup-only | PASS | No Red Gate 1+2, candidate, review, or certification existed before this record. |
| Allowed worktree baseline enumerated | PASS | Table Talk modified/untracked baseline listed and excluded. |
| Approved validator present and unchanged | PASS | Exact diff to `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` is empty. |
| Red target code resolved | PASS | `R` resolves across raw, generated, placement, identity-layer, provenance, recruiter, audit, validation, and candidate-scope tooling. |
| Monocolor pipeline support verified | PASS | R same-SHA control reaches deliberate adjudication; WG array control passes. |
| Candidate-scope same-SHA control reaches deliberate adjudication | PASS | Exit 1 only for unclassified proof-chain diagnostics. |
| Candidate-scope validator does not crash | PASS | No TypeError or collision-guidance structural error. |
| Red collision-guidance shape supported | PASS | Object-with-`pairs`; pair order preserved. |
| Source/file inventory complete | PASS | Raw files, source roles, generated consumers, recruiter, provenance, fixture state, governance, builders, and validators recorded. |
| Current claim-role baseline recorded | PASS | 8 total; all unclassified. |
| Fixture/provenance locators recorded | PASS | 12 current provenance families plus required missing locator families recorded. |
| Exact-chain as-is state recorded | PASS | Ordered IDs, counts, unique counts, duplicates, fixture absence, and missing fixture condition recorded. |
| Frozen fields recorded | PASS | Placement summary, native IDs, terms, threshold, penalty, strengthen/suppress, collision, guardrail, preview, and object pair order recorded. |
| Preview ownership recorded | PASS | Raw site surface, generated identity-layer/public, embedded `factions`, and recruiter surfaces recorded. |
| Semantic-alignment later mandatory | PASS | DRIFT-015/017 semantic preview review explicitly required; equality alone is not sufficient. |
| Required neighbors declared | PASS | Required Red-adjacent set declared. |
| Semantic risks declared | PASS | Red-specific risk declaration recorded. |
| Validation matrix not reduced | PASS | Required later matrix recorded. |
| Gate boundaries unchanged | PASS | Gate 1+2 authorized only for later read-only audit; not started here. |
| Exact-SHA rules unchanged | PASS | Exact candidate/review/certification discipline retained. |
| Commit separation unchanged | PASS | This is one governance-only preflight commit. |
| Superseded-candidate rules retained | PASS | Future failed candidates must remain recorded. |
| Reviewed/generated truth reconciliation retained | PASS | Required in later review/certification. |
| DRIFT-015 retained | PASS | Preview ownership/equality/stale-copy controls applied. |
| DRIFT-016 retained | PASS | Object-with-`pairs` control applied. |
| DRIFT-017 retained | PASS | Black preview semantic-equivalence lesson carried forward. |
| No Red semantic edit | PASS | No raw/generated/provenance/fixture/recruiter/preview/source/test/schema/validator/builder/scoring/calibration/runtime files changed. |
| No Gate 1+2 audit | PASS | This record is pre-Gate 1+2 only. |
| No remediation authorization | PASS | Remediation remains unauthorized. |
| No VM-521 work | PASS | VM-521 not started. |
| External tracker untouched | PASS | Excel not modified. |
| Candidate-only validation | N/A - no Red candidate exists; exact future command is recorded. | Candidate-only validation belongs after Gate 5 candidate creation. |
| Generation determinism | N/A - generation was not run in this governance-only preflight because generation may rewrite artifacts. | Later Gate 4 must prove deterministic generation. |
| Top-level placement confidence | N/A - no top-level confidence field exists in current Red raw/generated placement. | Discriminator confidences are recorded by raw placement. |
| Generic collision target | N/A - no stored `GENERIC_R_OVERFIT` target exists. | It is declared as a manual Gate 1+2 risk/control. |

All controls are PASS or explained N/A. No FAIL or UNKNOWN controls were recorded.

## O. Decision

PASS - RED GATE 1+2 AUTHORIZED

Authorization permits only the next window's Gate 1+2 read-only audit. It does not authorize remediation.

## P. Validation Run

Commands and checks actually run:

- `git status --short`
- `git branch --show-current`
- `git rev-parse HEAD`
- `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=1116786785dc4c5c8c1447dcad79c89e527657eb --target=1116786785dc4c5c8c1447dcad79c89e527657eb --identity=R`
- `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG`
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/validate-semantic-readiness.mjs --targets=R`
- JSON read/parse checks for Red raw/generated/provenance/ledger files.
- Exact preview/public-surface search and generated/recruiter consumer search.
- Read-only original main status check.

Post-edit validation and staged-scope checks are recorded by the final response after the governance commit.

## Q. Not Performed

- No Gate 1+2 semantic adjudication occurred.
- No Red claim/source role was changed or adjudicated.
- No remediation was authorized.
- No Red raw, generated, fixture, provenance, preview, recruiter, source, test, schema, validator, builder, scoring, calibration, or runtime file was modified.
- No fixture was created.
- No candidate was created.
- No independent review occurred.
- No certification occurred.
- No VM-521 work occurred.
- No original-main write, Excel update, push, PR, or merge occurred.

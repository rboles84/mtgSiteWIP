# VM-519 Black Semantic Recovery

Status: Gate 1+2 complete. Remediation authorized.

Identity: Black / B
Contract: CRIT-001 semantic-readiness Contract v1.1
Program base: `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`
Drift-control governance: `bb424a64787977baa45c67f1459babab64b1d3c7`
Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Approved validator review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Drift preflight commit: `741ed6a81edb567d51a2699cbe7d0ec70e9b5e61`
Gate 1+2 governance commit: `PENDING_VM519_GATE_1_2_SHA`

This record is the read-only Gate 1+2 audit and evidence confirmation for Black. No Black raw semantic data, generated consumers, provenance, recruiter context, fixtures, tests, validators, builders, schemas, runtime, scoring, calibration, VM-520 files, original-main files, Excel tracker, or Table Talk files were modified by this gate.

## 1. Preflight Reverification

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `codex/vm-519-black-semantic-recovery`. |
| Starting HEAD | PASS | `741ed6a81edb567d51a2699cbe7d0ec70e9b5e61`. |
| Program base | PASS | `04547ecfc52d1c96537b6375e9d5c4b8f3690a32` is an ancestor of HEAD and remains the certification/program base. |
| Approved validator | PASS | `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` exited 0. |
| Black drift preflight | PASS | `docs/incidents/recoveries/VM-519-black-drift-preflight.md` records `PASS - BLACK GATE 1+2 AUTHORIZED`. |
| Certified count | PASS | Board and ledger record 17 certified identities; Wave 3 monocolors are 2 of 5 certified. |
| Allowed dirty baseline | PASS | Only modified `docs/handoffs/HANDOFF_INDEX.md` and the two untracked Table Talk handoffs were dirty before Gate 1+2 edits. |
| Original main allowance | PASS | Read-only status of `C:\dev\mtgSiteWIP` showed known docs/workflow dirt only; no raw/generated/semantic/runtime/test/schema changes were observed. |
| Black semantic edit during audit | PASS | None. Gate 1+2 stayed read-only for Black implementation files. |
| VM-520 | PASS | Not started. |

## 2. Source Authority

| Source ID | Stored role | Gate 1+2 role decision | Permitted use |
|---|---|---|---|
| `MONO-B-2015` | `philosophy_backbone` | Valid claim-bearing official philosophy source. | May support substantive Black identity claims when bounded to local digest/PDF anchors `B2015-*`. |
| `MONO-B-2025` | `current_voice_update` | Valid claim-bearing current voice source with first-person/rhetorical caveat. | May support substantive Black identity claims when bounded to anchors `B2025-*`; do not over-read voice as unrestricted doctrine or moral truth. |
| `MECH-CP-2021` | `mechanical_authority` | Valid claim-bearing mechanical color-pie snapshot. | May support source-bounded mechanic texture only; cannot independently prove Black philosophy or placement identity. |
| `MECH-CP-2021-CHG` | `mechanical_change_log` | Valid mechanics-process/change source. | May support dated mechanic-specific change context only; cannot independently prove philosophy, placement identity, or public copy. |
| `RULES-CR` | `commander_rules_boundary` | Rules-boundary support source. | Support-only for Commander legality and color-identity boundaries; not philosophical proof. |
| `VM-377` | `project_governance` | Project governance support. | Support-only for Vox Mana source-intake and packet boundary; not color philosophy or placement proof. |
| `SCRYFALL-B-2026-06-13` | `current_card_legality_verification` | Current-card support verification. | Support-only for the three Commander Compass rows; not philosophy, popularity, deck quality, public copy, or placement proof. |

The local source hierarchy is sufficient for remediation. No online source intake is required for Gate 3+4 if remediation stays inside the listed/local sources and the recorded locators.

## 3. Claim Role Findings

Initial live audit:

- Total claims: 8.
- `substantive_claim`: 0.
- `discovery_record`: 0.
- `support_record`: 0.
- `unclassified`: 8.
- Explicit claim-level semantic roles: absent.
- Claim-level bounded evidence locations: absent.

Gate 1+2 role disposition:

| Claim ID | Current claim type | Role to assign in Gate 3+4 | Evidence/source disposition |
|---|---|---|---|
| `black_claim_0001` | `source_authority_boundary` | `support_record` | Vox Mana governance/source-intake boundary only. Retain as metadata/history; remove from authoritative profile, placement, public, recruiter, fixture, and provenance proof chains. |
| `black_claim_0002` | `philosophy_goal` | `substantive_claim` | Supported by `MONO-B-2015` anchors `B2015-Q1`, `B2015-Q1b` and `MONO-B-2025` anchors `B2025-a`, `B2025-e`. |
| `black_claim_0003` | `philosophy_means` | `substantive_claim` | Supported by `MONO-B-2015` anchor `B2015-Q2` and `MONO-B-2025` anchors `B2025-b`, `B2025-c`, `B2025-d`. Must keep cost and ruthlessness bounded, not universal. |
| `black_claim_0004` | `cares_and_threats` | `substantive_claim` | Supported by `MONO-B-2015` anchors `B2015-Q3`, `B2015-Q4` and `MONO-B-2025` anchors `B2025-b`, `B2025-d`. High-heat terms must remain thematic texture/boundary, not total identity. |
| `black_claim_0005` | `relationships` | `substantive_claim` | Supported by `MONO-B-2015` anchors `B2015-Q5`, `B2015-Q5b` and `MONO-B-2025` anchors `B2025-f`, `B2025-g`, `B2025-h`, `B2025-i`. Used for mono and required-neighbor boundaries. |
| `black_claim_0006` | `strength_weakness` | `substantive_claim` | Supported by `MONO-B-2015` anchor `B2015-Q6` and `MONO-B-2025` anchor `B2025-j`. Must preserve calculated risk and backfire/consequence pressure. |
| `black_claim_0007` | `mechanical_texture` | `substantive_claim` | Supported by `MECH-CP-2021` anchors `MECH-removal`, `MECH-carddraw`, `MECH-discard-effect` and `MECH-CP-2021-CHG` anchors `CHG-cantblock`, `CHG-discard-cost`. Mechanic-specific only; cannot define Black by mechanics alone. |
| `black_claim_0008` | `commander_boundary` | `support_record` | Rules/project/Scryfall support for Commander Compass/navigation only. Retain as auxiliary support metadata; remove from placement/profile/provenance chains that prove semantic identity. |

Expected post-remediation role count if Gate 3+4 follows this disposition: 6 substantive, 0 discovery, 2 support, 0 unclassified.

## 4. Evidence Scope Findings

Every future substantive Black claim requires bounded `evidence_locations` with Contract v1.1 `evidence_scope`:

- `black_claim_0002`: `docs/research/mono_upgrade/12_black.md#B2015-Q1;B2015-Q1b` and `#B2025-a;B2025-e`; scope should be canonical identity and power/opportunity goal.
- `black_claim_0003`: `docs/research/mono_upgrade/12_black.md#B2015-Q2` and `#B2025-b;B2025-c;B2025-d`; scope should be preferred method and bounded cost logic.
- `black_claim_0004`: `docs/research/mono_upgrade/12_black.md#B2015-Q3;B2015-Q4` and `#B2025-b;B2025-d`; scope should be thematic boundary and risk vocabulary.
- `black_claim_0005`: `docs/research/mono_upgrade/12_black.md#B2015-Q5;B2015-Q5b` and `#B2025-f;B2025-g;B2025-h;B2025-i`; scope should be required-neighbor boundary.
- `black_claim_0006`: `docs/research/mono_upgrade/12_black.md#B2015-Q6` and `#B2025-j`; scope should be pressure behavior and consequence.
- `black_claim_0007`: `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md#MECH-removal;MECH-carddraw;MECH-discard-effect` and `docs/research/mono_upgrade/21_mechanical_color_pie_2021_changes.md#CHG-cantblock;CHG-discard-cost`; scope should be mechanic-specific.

Support records may retain existing evidence rows and native IDs as metadata, but they must not prove profile identity, placement identity, public copy, recruiter guidance, semantic readiness, fixtures, or canonical provenance chains.

## 5. Consumed Surface Findings

Current consumed surfaces are not semantically ready:

- `data/raw-factions/black/black.profile.json#/core_identity` and `#/profile` use all eight claims, including governance and Commander support rows.
- `data/raw-factions/black/black.profile.json#/mechanics` uses `black_claim_0007` but lacks a stable native canonical ID.
- `data/raw-factions/black/black.profile.json#/site_surface` lacks a stable native canonical ID and explicit claim chain.
- `data/raw-factions/black/black.placement.json#/placement_summary` is a string and lacks stable canonical ID/claim chain by current monocolor provenance precedent.
- `data/raw-factions/black/black.placement.json#/discriminator_questions/3` mixes mechanic texture and support-only Commander verification; Gate 3+4 must remove support-only Commander proof from semantic placement guidance.
- `data/raw-factions/black/black.placement.json#/chatbot_guidance/how_to_recognize_mismatch/0..4` lacks explicit evidence mapping.
- `data/semantic-readiness-provenance.json` has 12 B entries, 3 required null canonical IDs, 0 null content hashes, 0 unresolved pointers, 0 duplicate canonical entries, and 0 duplicate null canonical-entry keys.
- The Black semantic fixture file `research/fixtures/semantic-readiness/black.semantic-fixtures.json` is absent.
- `data/identity-layers.json#/expressions/B/preview_text` and embedded `data/factions.json#/identity_layers/expressions/B/preview_text` are equal and read: `Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.`

Gate 3+4 may keep the preview if source-supported and bounded. Any preview change must follow DRIFT-015 source ownership, source-to-consumer equality, exact stale-copy search, semantic-equivalent stale-copy review, and candidate-scope controls.

## 6. Exact-Chain Baseline

Current generated/provenance chains:

| Canonical locator | Canonical ID | Ordered claim IDs | Count | Unique | Duplicate IDs | Fixture state |
|---|---|---|---:|---:|---|---|
| `data/raw-factions/black/black.profile.json#/core_identity` | null | `black_claim_0001`, `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006`, `black_claim_0007`, `black_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/black/black.profile.json#/mechanics` | null | `black_claim_0007` | 1 | 1 | none | absent |
| `data/raw-factions/black/black.profile.json#/profile` | null | `black_claim_0001`, `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006`, `black_claim_0007`, `black_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/black/black.placement.json#/placement_axes/0` | `axis_power_as_agency` | `black_claim_0002`, `black_claim_0003` | 2 | 2 | none | absent |
| `data/raw-factions/black/black.placement.json#/placement_axes/1` | `axis_cost_conversion` | `black_claim_0003`, `black_claim_0006`, `black_claim_0007` | 3 | 3 | none | absent |
| `data/raw-factions/black/black.placement.json#/placement_axes/2` | `axis_self_interest_shadow` | `black_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/0` | `black_disc_001` | `black_claim_0002`, `black_claim_0003`, `black_claim_0004` | 3 | 3 | none | absent |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/1` | `black_disc_002` | `black_claim_0003`, `black_claim_0006` | 2 | 2 | none | absent |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/2` | `black_disc_003` | `black_claim_0005`, `black_claim_0006` | 2 | 2 | none | absent |
| `data/raw-factions/black/black.placement.json#/discriminator_questions/3` | `black_disc_004` | `black_claim_0007`, `black_claim_0008` | 2 | 2 | none | absent |
| `data/raw-factions/black/black.placement.json#/collision_guidance/pairs/0` | `black_vs_white` | `black_claim_0005` | 1 | 1 | none | absent |
| `data/raw-factions/black/black.placement.json#/collision_guidance/pairs/1` | `black_vs_green` | `black_claim_0005` | 1 | 1 | none | absent |

Gate 3+4 must create fixtures from generated canonical truth after remediation. At minimum, the fixture must include core inclusion, mature/pressure behavior, required-neighbor exclusions, nearest-collision ambiguity, and provenance fixtures for `/core_identity` and `/placement_summary`.

## 7. Frozen Field Baseline

Candidate-scope-sensitive fields verified unchanged from the drift preflight:

- Placement summary text: `Black is a strong fit when a user wants agency, ambition, and power through clear-eyed cost accounting, resource conversion, and refusal to let inherited taboos choose for them.`
- Top-level placement confidence: absent.
- Discriminator confidences: `black_disc_001: High`, `black_disc_002: High`, `black_disc_003: Medium`, `black_disc_004: High`.
- Required positive evidence terms: `power`, `opportunity`, `self-interest`, `agency`, `cost`, `sacrifice`, `leverage`.
- Required positive minimum hits: 2.
- Broad match penalty: 0.13.
- Strengthen list: `power as self-determination`; `calculated risk`; `resource conversion`; `ambition under harsh conditions`.
- Suppress list: `group morality as final authority`; `natural destiny over personal agency`; `impulsive danger`; `generic evil aesthetic`.
- False-positive guardrail: `Do not place Black for darkness, villainy, or cruelty alone; require power, agency, self-interest, opportunity, or cost conversion.`
- Lateral targets: `UB`, `BR`, `BG`, `WB`.
- Raw collision shape: object with keys `rule`, `review_triggers`, `pairs`.
- Collision targets and order: `W`, `G`.
- Explicit `GENERIC_B_OVERFIT` collision target: absent.
- Native IDs: `black`, `axis_power_as_agency`, `axis_cost_conversion`, `axis_self_interest_shadow`, `black_disc_001`, `black_disc_002`, `black_disc_003`, `black_disc_004`, `black_vs_white`, `black_vs_green`.
- Preview source and embedded consumer: equal.
- Black-local scoring/golden-path fields: absent.

Gate 3+4 must preserve these fields unless candidate-scope explicitly permits a documented, target-scoped exception. The object-with-`pairs` collision-guidance structure must not be converted to a guild-style array.

## 8. Neighbor Boundaries Required

Gate 3+4 must provide testable Black fixture/collision guidance for:

- `GENERIC_B_OVERFIT`: Black requires source-backed power/opportunity/agency/cost logic, not generic ambition, selfishness, villainy, death aesthetics, or mechanics.
- `WB` / Orzhov: Black's self-secured agency is not Orzhov institutional debt, obligation, religion, hierarchy, transaction, or wealth machinery.
- `UB` / Dimir: Black power and opportunity are not Dimir secrecy, information asymmetry, surveillance, or covert network control.
- `BR` / Rakdos: Black's calculated cost and opportunity logic are not Rakdos appetite, spectacle, indulgence, public cruelty, or impulse.
- `BG` / Golgari: Black's mortality/cost/resource language is not Golgari ecology, rot, underclass endurance, or death-cycle reuse.
- `SILVERQUILL`: Black ambition is not rhetoric, reputation, status, prestige, or social leverage through performance.
- `WITHERBLOOM`: Black cost/life/death mechanics are not Witherbloom life/death study, harvesting, decay, vitality exchange, or potion craft.
- `ESPER`: Black power is not broader white-blue-black engineered hierarchy, perfected control, or artifact-supported social order.
- `GRIXIS`: Black leverage is not blue-black-red destructive ambition, manipulation, cruelty, or knowledge-as-domination.
- `JUND`: Black survival/power is not red-green-black predation, appetite, dominance hierarchy, or strength ecology.
- `MARDU`: Black ambition is not red-white-black martial loyalty, conquest, honor, or clan obligation.
- `SULTAI`: Black resource/opportunity is not blue-green-black inevitability, exploitation, and long-game resource control.
- `ABZAN`: Black self-advocacy is not white-green-black family, ancestry, inheritance, endurance, or social obligation.
- `W`: Black self-interest and agency are not mono-White group-first peace, duty, morality, or shared order.
- `U`: Black planning/alliance is not mono-Blue knowledge, optimization, or improvement for its own sake.
- `R`: Black calculated risk is not mono-Red impulse, freedom, immediacy, or reckless danger.
- `G`: Black opposes destiny/natural order where it constrains opportunity; it is not mono-Green acceptance, interdependence, or natural role.

These boundaries must be represented in allowed semantic or fixture structures without adding a frozen explicit `GENERIC_B_OVERFIT` raw/generated collision target.

## 9. Semantic Risks

Gate 1+2 found the current packet vulnerable to:

- Generic Black overfit: ambition, power, agency, self-interest, independence, autonomy, freedom, success, survival, pragmatism, realism, opportunity, leverage, control, sacrifice, ruthlessness, or personal gain without source-bounded cost/opportunity logic.
- Villain overfit: Black as inherently evil, selfish, cruel, corrupt, nihilistic, immoral, amoral, greedy, villainous, treacherous, manipulative, or unconstrained.
- Unsupported universal slogans: "power at any cost," "ends justify the means," "willing to do anything," or Black as always individualistic/death-obsessed unless bounded to source voice and scope.
- Mechanics overfit: graveyard recursion, sacrifice, life payment, discard, removal, tutors, reanimation, drain, treasures, theft, demons, zombies, aristocrats, or resource conversion cannot independently define Black.
- Aesthetic overfit: death, decay, fear, pain, suffering, darkness, disease, corruption, swamps, demons, vampires, necromancers, assassins, cults, or horror as total identity.
- Positive-language overfit: agency, self-definition, pragmatism, and survival can become transferable to other colors unless tied to Black's source-supported power/opportunity/cost frame.
- Neighbor collapse into Orzhov, Dimir, Rakdos, Golgari, Silverquill, Witherbloom, Esper, Grixis, Jund, Mardu, Sultai, or Abzan.
- Support/provenance leakage from project governance, rules, Scryfall legality, Commander Compass, mechanics/changelog-only material, identity layers, and generated/runtime material.

## 10. Gate 1+2 Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-519-black-semantic-recovery`, HEAD `741ed6a81edb567d51a2699cbe7d0ec70e9b5e61`. |
| Correct program base | PASS | `04547ecfc52d1c96537b6375e9d5c4b8f3690a32` verified as ancestor. |
| Approved validator unchanged | PASS | Exact diff to approved validator candidate is empty. |
| Drift preflight permits Gate 1+2 | PASS | `PASS - BLACK GATE 1+2 AUTHORIZED`. |
| Source hierarchy explicit | PASS | Seven sources classified above. |
| Initial claim role state recorded | PASS | 8 unclassified, 0 substantive, 0 discovery, 0 support. |
| Evidence state recorded | PASS | Claim-level evidence locations absent; required scopes and locators identified. |
| ID/hash/pointer state recorded | PASS | 12 B provenance rows, 3 null canonical IDs, 0 null hashes, 0 unresolved pointers, no duplicate canonical/null-key entries. |
| Fixture/provenance locators recorded | PASS | Twelve current locators listed; fixture absent. |
| Exact-chain state recorded | PASS | Ordered arrays/counts/duplicates recorded. |
| Frozen fields verified | PASS | Placement, calibration, guardrail, targets, object-with-`pairs`, native IDs, optional-field absence, and preview equality verified. |
| Raw object-with-pairs verified | PASS | Object keys and W/G pair order preserved in current raw placement. |
| Generated collision semantics verified | PASS | Generated B placement flattens collision records in W then G order with the same collision IDs. |
| Required neighbors covered | PASS | Required comparisons and discriminators recorded. |
| Generic Black and villain-overfit risks documented | PASS | Risk list recorded. |
| Public/recruiter/preview surfaces inventoried | PASS | Profile, placement, generated consumers, provenance, preview, and Commander support boundary inspected. |
| No semantic edit during audit | PASS | No Black implementation file changed before this report. |
| Table Talk excluded | PASS | Baseline preserved and excluded from Gate 1+2 scope. |
| VM-520 untouched | PASS | Not started. |

No Gate 1+2 control is FAIL or UNKNOWN. N/A controls remain only for absent top-level placement confidence, absent generic collision target, absent Black-local scoring/golden-path fields, and absent fixture file before remediation; each absence is documented as a baseline fact.

## 11. Decision

REMEDIATION AUTHORIZED

Rationale: Black has sufficient local official source evidence to remediate, but it is not Contract v1.1-ready because all claims lack semantic roles and bounded evidence locations, support/governance/rules/Scryfall rows enter canonical proof chains, B provenance has null canonical IDs, chatbot mismatch guidance lacks evidence mapping, and the required Black semantic fixture is absent.

Gate 3+4 must preserve frozen fields, preview equality, optional-field absences, and the object-with-`pairs` collision-guidance shape while assigning roles, adding evidence scopes, isolating support records, rebuilding generated artifacts, creating fixtures from generated truth, validating exact chain/candidate-scope behavior, and avoiding generic/villain/mechanics overfit.

## 12. Gate 3+4 Remediation And Generation

Status: complete.

- Gate 1+2 governance SHA: `604a19696d3dfb0d43d6b96676c0c6605628eb33`.
- Candidate SHA: `5bffc3465786c18950d32dcb6f056504b3b8e668`.
- Final claim roles: 8 total; 6 `substantive_claim`; 0 `discovery_record`; 2 `support_record`; 0 unclassified.
- Substantive evidence scopes: complete for `black_claim_0002` through `black_claim_0007`.
- Support isolation: `black_claim_0001` and `black_claim_0008` retained as support/history only; Commander Compass evidence is explicitly `auxiliary_support`.
- Generated B provenance: 25 entries; 0 required null canonical IDs; 0 required null content hashes; 0 unresolved pointers; 0 duplicate canonical entries.
- Fixture: `research/fixtures/semantic-readiness/black.semantic-fixtures.json` created with all required neighbor exclusions and provenance fixtures.
- Preview: `data/identity-layers.json#/expressions/B/preview_text` and `data/factions.json#/identity_layers/expressions/B/preview_text` remain equal and unchanged: "Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency."
- Stale-copy handling: exact preview scan has no hits. Generated placement/public high-risk terms remain only as source-bounded philosophy/mechanic texture or negative guardrails, not independent Black proof.
- Frozen fields preserved: placement summary text; absent top-level confidence; discriminator confidences; required terms; minimum hits; broad penalty; strengthen/suppress lists; false-positive guardrail; raw object-with-`pairs`; W/G collision pair order; generated lateral targets `UB`, `BR`, `BG`, `WB`; absent explicit `GENERIC_B_OVERFIT`; absent Black-local scoring/golden paths; native IDs.

## 13. Exact-Chain Proof

| Locator | Generated Count | Fixture Count | Exact Ordered Equality | Duplicates | Missing IDs | Extra IDs |
|---|---:|---:|---|---|---|---|
| `data/raw-factions/black/black.profile.json#/core_identity` | 5 | 5 | PASS: `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006` | none | none | none |
| `data/raw-factions/black/black.placement.json#/placement_summary` | 6 | 6 | PASS: `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006`, `black_claim_0007` | none | none | none |

## 14. Validation Evidence

All commands below passed after the candidate commit unless noted:

- `npm.cmd run build:factions` - PASS; run twice before candidate commit; deterministic generated output.
- JSON parse checks for Black raw files, generated JSON, and fixture - PASS.
- Explicit role/evidence/provenance/frozen-field/stale-copy script - PASS; counts and exact chains recorded above.
- `node research/audit-semantic-readiness.mjs --targets=B` - PASS; 6 substantive, 0 discovery, 2 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=B` - PASS.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `npm.cmd run test:semantic-readiness` - PASS; 1826 semantic provenance entries verified.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `npm.cmd run test:source-generated` - PASS with known unrelated JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test` - PASS; full parser, maze, semantic, placement, and snapshot suite.
- `git diff --check` - PASS; line-ending warnings only.
- `node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=5bffc3465786c18950d32dcb6f056504b3b8e668 --identity=B` - PASS.

## 15. Gate 5 Workflow Status

Candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` is the exact Black Gate 5 candidate awaiting independent review.

Black is not certified and is not `semantically_ready`. No approval decision was issued. No independent review was performed in this window. VM-520 was not started. Program base remains `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`.

## 16. Independent Review Result - 2026-07-18

Independent review report: `docs/incidents/recoveries/VM-519-black-independent-review.md`.

Review-record SHA: `PENDING_VM519_BLACK_REVIEW_RECORD_SHA`.

Decision:

REQUEST CHANGES

Exact candidate reviewed:

`5bffc3465786c18950d32dcb6f056504b3b8e668`

The independent review verified that candidate scope, claim roles, evidence scopes, support isolation, provenance IDs/hashes, fixture/provenance exact-chain parity, frozen placement fields, object-with-`pairs` collision guidance, deterministic generation, and required validation passed. The review found one approval-blocking DRIFT-015 consumed-preview issue:

- `data/identity-layers.json#/expressions/B/preview_text`
- `data/factions.json#/identity_layers/expressions/B/preview_text`

Both retain unchanged pre-remediation preview copy:

`Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.`

The review concluded that equality between source and embedded preview is true but insufficient. The line remains a generic Black autonomy/ambition/survival summary and does not include the candidate's source-backed cost, leverage, opportunity, resource-conversion, consequence, or internal-tension boundaries.

Black remains not approved, not certified, and not `semantically_ready`. VM-520 was not started. A later replacement candidate is required.

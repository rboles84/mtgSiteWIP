# VM-518 Blue Semantic Recovery

Status: Certified semantically_ready.

Identity: Blue / U
Contract: CRIT-001 semantic-readiness Contract v1.1
Program base: `9d250a7a76d219fdb961915cbf989a10a575c757`
Drift-control governance: `bb424a64787977baa45c67f1459babab64b1d3c7`
Drift preflight commit: `d1375ef71fe5740453e698596ef772890ac0aa0f`
Gate 1+2 governance commit: `428128505a194293feb915c929072e23dc9f0ace`
Gate 5 candidate commit: `ac774e2eac207cc7fe2d744beac1f11788908159`
Independent review decision: `APPROVE EXACT SHA ac774e2eac207cc7fe2d744beac1f11788908159`
Independent review record: `docs/incidents/recoveries/VM-518-blue-independent-review.md`

This record is the CRIT-001 recovery and certification record for Blue. Certification is governance-only and certifies exact approved candidate `ac774e2eac207cc7fe2d744beac1f11788908159`.

## 1. Preflight Reverification

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `codex/vm-518-blue-semantic-recovery`. |
| Starting HEAD | PASS | `d1375ef71fe5740453e698596ef772890ac0aa0f`. |
| Program base | PASS | `9d250a7a76d219fdb961915cbf989a10a575c757` is an ancestor of HEAD. |
| Drift preflight | PASS | `docs/incidents/recoveries/VM-518-blue-drift-preflight.md` records `PASS - BLUE GATE 1+2 AUTHORIZED`. |
| Certified count | PASS | Board and ledger record 16 certified identities; Wave 3 monocolors are 1 of 5 certified. |
| Allowed dirty baseline | PASS | Only modified `docs/handoffs/HANDOFF_INDEX.md` and the two untracked Table Talk handoffs were dirty before Gate 1+2 edits. |
| Original main allowance | PASS | Read-only status of `C:\dev\mtgSiteWIP` showed known docs/workflow dirt only; no raw/generated/semantic/runtime/test/schema changes were observed. |
| Blue semantic edit during audit | PASS | None. Gate 1+2 stayed read-only for Blue implementation files. |
| VM-519 | PASS | Not started. |

## 2. Source Authority

| Source ID | Stored role | Gate 1+2 role decision | Permitted use |
|---|---|---|---|
| `MONO-U-2015` | `philosophy_backbone` | Valid claim-bearing official philosophy source. | May support substantive Blue identity claims when bounded to local digest/PDF anchors `U2015-*`. |
| `MONO-U-2025` | `current_voice_update` | Valid claim-bearing official current voice source with first-person/rhetorical caveat. | May support substantive Blue identity claims when bounded to anchors `U2025-*`; do not over-read voice as unrestricted doctrine. |
| `MECH-CP-2021` | `mechanical_authority` | Valid claim-bearing mechanical color-pie snapshot. | May support source-bounded mechanic texture only; cannot independently prove Blue philosophy or placement identity. |
| `GOV-COC-2024` | `governance_process_authority` | Valid process authority for color-pie governance. | May support the authority/process boundary around mechanical color-pie claims; cannot independently prove Blue philosophy. |
| `RULES-CR` | `commander_rules_boundary` | Support/rules-boundary source. | Support-only for Commander legality and color-identity boundaries; not philosophical proof. |
| `VM-377` | `project_governance` | Project governance support. | Support-only for Vox Mana source-intake and packet boundary; not color philosophy or placement proof. |
| `SCRYFALL-U-2026-06-13` | `current_card_legality_verification` | Current-card support verification. | Support-only for the three Commander Compass rows; not philosophy, popularity, deck quality, public copy, or placement proof. |

The local source hierarchy is sufficient for remediation. No online source intake is required for Gate 3+4 if the remediation stays inside these listed/local sources.

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
| `blue_claim_0001` | `source_authority_boundary` | `support_record` | Vox Mana governance/source-intake boundary only. Retain as metadata/history; remove from authoritative profile, placement, public, recruiter, fixture, and provenance proof chains. |
| `blue_claim_0002` | `philosophy_goal` | `substantive_claim` | Supported by `MONO-U-2015` anchors `U2015-Q1`, `U2015-Q1b` and `MONO-U-2025` anchors `U2025-a`, `U2025-e`. |
| `blue_claim_0003` | `philosophy_means` | `substantive_claim` | Supported by `MONO-U-2015` anchor `U2015-Q2` and `MONO-U-2025` anchors `U2025-b`, `U2025-c`, `U2025-d`. |
| `blue_claim_0004` | `cares_and_threats` | `substantive_claim` | Supported by `MONO-U-2015` anchors `U2015-Q3`, `U2015-Q4` and `MONO-U-2025` anchors `U2025-h`, `U2025-i`. Must remain bounded and avoid turning Blue into generic science, intellect, or control. |
| `blue_claim_0005` | `relationships` | `substantive_claim` | Supported by `MONO-U-2015` anchors `U2015-Q5`, `U2015-Q5b` and `MONO-U-2025` anchors `U2025-f`, `U2025-g`, `U2025-h`, `U2025-i`. Used for mono and required-neighbor boundaries. |
| `blue_claim_0006` | `strength_weakness` | `substantive_claim` | Supported by `MONO-U-2015` anchor `U2015-Q6` and `MONO-U-2025` anchor `U2025-j`. Must preserve the time/reactivity/passivity pressure. |
| `blue_claim_0007` | `mechanical_texture` | `substantive_claim` | Supported by `MECH-CP-2021` anchors `MECH-carddraw`, `MECH-counters`, `MECH-flying`, `MECH-removal`, `MECH-artifact-friendly` and `GOV-COC-2024` anchor `COC-mandate`. Mechanic-specific only; cannot define Blue by mechanics alone. |
| `blue_claim_0008` | `commander_boundary` | `support_record` | Rules/project/Scryfall support for Commander Compass/navigation only. Retain as auxiliary support metadata; remove from placement/profile/provenance chains that prove semantic identity. |

Expected post-remediation role count if Gate 3+4 follows this disposition: 6 substantive, 0 discovery, 2 support, 0 unclassified.

## 4. Evidence Scope Findings

Every future substantive Blue claim requires bounded `evidence_locations` with Contract v1.1 `evidence_scope`:

- `blue_claim_0002`: `docs/research/mono_upgrade/11_blue.md#U2015-Q1;U2015-Q1b` and `#U2025-a;U2025-e`; scope should be canonical identity and improvement goal.
- `blue_claim_0003`: `docs/research/mono_upgrade/11_blue.md#U2015-Q2` and `#U2025-b;U2025-c;U2025-d`; scope should be preferred method.
- `blue_claim_0004`: `docs/research/mono_upgrade/11_blue.md#U2015-Q3;U2015-Q4` and `#U2025-h;U2025-i`; scope should be thematic boundary.
- `blue_claim_0005`: `docs/research/mono_upgrade/11_blue.md#U2015-Q5;U2015-Q5b` and `#U2025-f;U2025-g;U2025-h;U2025-i`; scope should be required-neighbor boundary.
- `blue_claim_0006`: `docs/research/mono_upgrade/11_blue.md#U2015-Q6` and `#U2025-j`; scope should be pressure behavior.
- `blue_claim_0007`: `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md#MECH-carddraw;MECH-counters;MECH-flying;MECH-removal;MECH-artifact-friendly` and `docs/research/mono_upgrade/22_council_of_colors.md#COC-mandate`; scope should be mechanic-specific.

Support records may retain existing evidence rows and native IDs as metadata, but they must not prove profile identity, placement identity, public copy, recruiter guidance, semantic readiness, fixtures, or canonical provenance chains.

## 5. Consumed Surface Findings

Current consumed surfaces are not semantically ready:

- `data/raw-factions/blue/blue.profile.json#/core_identity` and `#/profile` use all eight claims, including support/governance and Commander support rows.
- `data/raw-factions/blue/blue.profile.json#/mechanics` uses `blue_claim_0007` but lacks a stable native canonical ID.
- `data/raw-factions/blue/blue.profile.json#/site_surface` lacks a stable native canonical ID and explicit claim chain.
- `data/raw-factions/blue/blue.placement.json#/placement_summary` is a string and lacks stable canonical ID/claim chain by current monocolor provenance precedent.
- `data/raw-factions/blue/blue.placement.json#/discriminator_questions/3` mixes mechanic texture and support-only Commander verification; Gate 3+4 must remove support-only Commander proof from semantic placement guidance.
- `data/raw-factions/blue/blue.placement.json#/chatbot_guidance/how_to_recognize_mismatch/0..4` lacks explicit evidence mapping.
- `data/semantic-readiness-provenance.json` has 12 U entries, 3 required null canonical IDs, 0 null content hashes, 0 unresolved pointers, and 2 duplicate null canonical-entry keys.
- The Blue semantic fixture file `research/fixtures/semantic-readiness/blue.semantic-fixtures.json` is absent.
- `data/identity-layers.json#/expressions/U/preview_text` and the embedded `data/factions.json#/identity_layers/expressions/U/preview_text` are equal and currently read: `Blue values learning, patience, improvement, planning, and possibility. It asks what life could become with enough understanding.`

Gate 3+4 may keep the preview if source-supported and bounded. Any preview or display-source change must follow DRIFT-015 source-to-embedded equality, exact stale-copy search, and candidate-scope controls.

## 6. Exact-Chain Baseline

Current generated/provenance chains:

| Canonical locator | Canonical ID | Ordered claim IDs | Count | Unique | Duplicate IDs | Fixture state |
|---|---|---|---:|---:|---|---|
| `data/raw-factions/blue/blue.profile.json#/core_identity` | null | `blue_claim_0001`, `blue_claim_0002`, `blue_claim_0003`, `blue_claim_0004`, `blue_claim_0005`, `blue_claim_0006`, `blue_claim_0007`, `blue_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/blue/blue.profile.json#/mechanics` | null | `blue_claim_0007` | 1 | 1 | none | absent |
| `data/raw-factions/blue/blue.profile.json#/profile` | null | `blue_claim_0001`, `blue_claim_0002`, `blue_claim_0003`, `blue_claim_0004`, `blue_claim_0005`, `blue_claim_0006`, `blue_claim_0007`, `blue_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/placement_axes/0` | `axis_perfection_through_knowledge` | `blue_claim_0002`, `blue_claim_0003` | 2 | 2 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/placement_axes/1` | `axis_deliberation_over_impulse` | `blue_claim_0004`, `blue_claim_0005` | 2 | 2 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/placement_axes/2` | `axis_reactivity_risk` | `blue_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/discriminator_questions/0` | `blue_disc_001` | `blue_claim_0002`, `blue_claim_0003` | 2 | 2 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/discriminator_questions/1` | `blue_disc_002` | `blue_claim_0004`, `blue_claim_0005` | 2 | 2 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/discriminator_questions/2` | `blue_disc_003` | `blue_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/discriminator_questions/3` | `blue_disc_004` | `blue_claim_0007`, `blue_claim_0008` | 2 | 2 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/collision_guidance/pairs/0` | `blue_vs_red` | `blue_claim_0005` | 1 | 1 | none | absent |
| `data/raw-factions/blue/blue.placement.json#/collision_guidance/pairs/1` | `blue_vs_green` | `blue_claim_0005` | 1 | 1 | none | absent |

Gate 3+4 must create fixtures from generated canonical truth after remediation. At minimum, the fixture must include core inclusion, mature/pressure behavior, required-neighbor exclusions, nearest-collision ambiguity, and provenance fixtures for `/core_identity` and `/placement_summary`.

## 7. Frozen Field Baseline

Candidate-scope-sensitive fields verified unchanged from the drift preflight:

- Placement summary text: `Blue is a strong fit when a user wants to understand, optimize, control, and improve through knowledge, tools, patience, and deliberate choice.`
- Top-level placement confidence: absent.
- Discriminator confidences: `blue_disc_001: High`, `blue_disc_002: High`, `blue_disc_003: Medium`, `blue_disc_004: High`.
- Required positive evidence terms: `knowledge`, `learning`, `tools`, `improvement`, `optimization`, `control`, `deliberation`.
- Required positive minimum hits: 2.
- Broad match penalty: 0.13.
- Strengthen list: `self-authorship through education`; `careful planning before action`; `tools and technology`; `reactive control as preparation`.
- Suppress list: `acting from immediate emotion`; `natural destiny over choice`; `group order above individual path`; `risk-taking without study`.
- Lateral targets: `WU`, `UB`, `UR`, `UG`.
- Raw collision shape: object with `pairs`.
- Collision targets and order: `R`, `G`.
- Explicit `GENERIC_U_OVERFIT` collision target: absent.
- Native IDs: `blue`, `axis_perfection_through_knowledge`, `axis_deliberation_over_impulse`, `axis_reactivity_risk`, `blue_disc_001`, `blue_disc_002`, `blue_disc_003`, `blue_disc_004`, `blue_vs_red`, `blue_vs_green`.
- Preview source and embedded consumer: equal.

Gate 3+4 must preserve these fields unless candidate-scope explicitly permits a documented, target-scoped exception. The object-with-`pairs` collision-guidance structure must not be converted to a guild-style array.

## 8. Neighbor Boundaries Required

Gate 3+4 must provide testable Blue fixture/collision guidance for:

- `GENERIC_U_OVERFIT`: Blue requires knowledge, tools, deliberate choice, improvement, and becoming, not generic cleverness, research, patience, or control.
- `WU` / Azorius: Blue understanding and self-directed improvement are not Azorius public procedure, law, bureaucracy, or institutional legitimacy.
- `UR` / Izzet: Blue studies and models before action; Izzet routes discovery through red-blue experiment, invention, volatility, and creative risk.
- `UB` / Dimir: Blue seeks understanding and possibility; Dimir makes information covert leverage and strategic secrecy.
- `UG` / Simic: Blue improvement is not automatically living adaptation, biomancy, or organism optimization.
- `PRISMARI`: Blue intellect/technique is not Prismari expressive performance, elemental art, or emotion-through-mastery.
- `QUANDRIX`: Blue planning is not Quandrix mathematical abstraction, proof, ratio, or theory as identity.
- `ESPER`: Blue perfection/artifice/control is not broader white-blue-black hierarchy, extraction, or engineered social order.
- `BANT`: Blue planning is not noble three-color community order or exalted hierarchy.
- `GRIXIS`: Blue control is not blue-black-red ambition, cruelty, or predatory manipulation.
- `TEMUR`: Blue knowledge is not red-green-blue instinct, wild force, or embodied discovery.
- `SULTAI`: Blue optimization is not black-green-blue exploitation, resource recursion, or long-game domination.
- `W`: Blue individual becoming is not mono-White group-first peace, duty, or shared order.
- `B`: Blue self-improvement is not mono-Black ambition, power, or role maximization.
- `R`: Blue deliberation is not mono-Red emotion, impulse, freedom, or immediate action.
- `G`: Blue rejects destiny-as-final where it blocks learning and choice; it is not mono-Green nature, instinct, or acceptance.

These boundaries must be represented in allowed semantic or fixture structures without adding a frozen explicit `GENERIC_U_OVERFIT` raw/generated collision target.

## 9. Semantic Risks

Gate 1+2 found the current packet vulnerable to:

- Generic Blue overfit: intelligence, knowledge, scholarship, science, research, planning, perfection, progress, possibility, and control without improvement-through-knowledge and deliberate choice.
- Mechanics overfit: card draw, counterspells, bounce, theft, flying, artifacts, tempo, clones, spellslinger, or control decks cannot define Blue.
- Stereotype overfit: wizard, scholar, laboratory, professor, artifact engine, library, water/air, coldness, or "smartest color" language must remain source-bounded.
- Unsupported absolutes: "perfect lifeform", omniscience, objective superiority, permanent passivity, or "never acts" claims exceed the evidence.
- Neighbor collapse into Azorius, Dimir, Izzet, Simic, Prismari, Quandrix, Esper, Bant, Grixis, Temur, or Sultai.
- Support/provenance leakage from project governance, rules, Scryfall legality, Commander Compass, identity layers, and generated/runtime material.

## 10. Gate 1+2 Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-518-blue-semantic-recovery`, HEAD `d1375ef71fe5740453e698596ef772890ac0aa0f`. |
| Correct program base | PASS | `9d250a7a76d219fdb961915cbf989a10a575c757` verified as ancestor. |
| Drift preflight permits Gate 1+2 | PASS | `PASS - BLUE GATE 1+2 AUTHORIZED`. |
| Approved validator unchanged | PASS | No diff from approved monocolor validator candidate for candidate-scope files. |
| Source hierarchy explicit | PASS | Seven sources classified above. |
| Initial claim role state recorded | PASS | 8 unclassified, 0 substantive, 0 discovery, 0 support. |
| Evidence state recorded | PASS | Claim-level evidence locations absent; required scopes and locators identified. |
| ID/hash/pointer state recorded | PASS | 12 U provenance rows, 3 null canonical IDs, 0 null hashes, 0 unresolved pointers, 2 duplicate null canonical-entry keys. |
| Fixture/provenance locators recorded | PASS | Twelve current locators listed; fixture absent. |
| Exact-chain state recorded | PASS | Ordered arrays/counts/duplicates recorded. |
| Frozen fields verified | PASS | Placement, calibration, targets, object-with-`pairs`, native IDs, and preview equality verified. |
| Required neighbors covered | PASS | Required comparisons and discriminators recorded. |
| Generic Blue risks documented | PASS | Risk list recorded. |
| Public/recruiter/preview surfaces inventoried | PASS | Profile, placement, generated consumers, provenance, preview, and Commander support boundary inspected. |
| No semantic edit during audit | PASS | No Blue implementation file changed before this report. |
| Table Talk excluded | PASS | Baseline preserved and excluded from Gate 1+2 scope. |
| VM-519 untouched | PASS | Not started. |

No Gate 1+2 control is FAIL or UNKNOWN. No N/A result is needed beyond noting the current absence of top-level placement confidence and generic collision target as frozen baseline facts.

## 11. Decision

REMEDIATION AUTHORIZED

Rationale: Blue has sufficient local official source evidence to remediate, but it is not Contract v1.1-ready because all claims lack semantic roles and bounded evidence locations, support/governance/rules/Scryfall rows enter canonical proof chains, U provenance has null canonical IDs and duplicate null keys, chatbot mismatch guidance lacks evidence mapping, and the required Blue semantic fixture is absent.

Gate 3+4 must preserve frozen fields and the object-with-`pairs` collision-guidance shape while assigning roles, adding evidence scopes, isolating support records, rebuilding generated artifacts, creating fixtures from generated truth, and validating exact chain/candidate-scope behavior.

## 12. Gate 3+4 Remediation Summary

Gate 3+4 completed on 2026-07-18. The final candidate is `ac774e2eac207cc7fe2d744beac1f11788908159`.

Authoritative changes:

- `blue_claim_0002` through `blue_claim_0007` are now `substantive_claim` with bounded `evidence_locations` and Contract v1.1 `evidence_scope`.
- `blue_claim_0001` and `blue_claim_0008` are now `support_record` with explicit non-authoritative use restrictions.
- `data/raw-factions/blue/blue.profile.json#/core_identity` now uses only source-backed identity claims `blue_claim_0002` through `blue_claim_0006`.
- `#/mechanics` retains `blue_claim_0007` as mechanic-specific texture and receives a stable canonical ID.
- `#/site_surface` receives a stable canonical ID and a bounded substantive claim chain.
- Commander Compass support retains current Scryfall/rules metadata and `blue_claim_0008` only as auxiliary support, not semantic proof.
- `data/raw-factions/blue/blue.placement.json#/placement_summary` is now a canonical object with stable ID, source-backed claim chain, and mechanic-specific evidence claim.
- Discriminator question 4 now uses `blue_claim_0007` only and treats card draw/counters/bounce/artifacts/evasion as Blue texture rather than identity proof.
- Chatbot mismatch guidance receives explicit `semantic_guidance_evidence` mappings.

Generated changes:

- `npm.cmd run build:factions` regenerated `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.
- `data/identity-layers.json` and `data/placement-model.schema.json` did not change.
- Blue semantic fixtures were added at `research/fixtures/semantic-readiness/blue.semantic-fixtures.json`.

No builder, validator, schema, scoring, Hall, Crucible, scheduling, global recruiter behavior, VM-519, original-main, Excel, or Table Talk content changed.

## 13. Final Role, Provenance, and Exact-Chain Proof

Final Blue claim roles:

- Total claims: 8.
- `substantive_claim`: 6.
- `discovery_record`: 0.
- `support_record`: 2.
- `unclassified`: 0.

Final U provenance:

- Total U provenance entries: 25.
- Required null canonical IDs: 0.
- Required null canonical content hashes: 0.
- Unresolved claim/source pointers: 0.
- Duplicate canonical entries: 0.
- Discovery/support records in authoritative chains: 0.

Fixture/provenance parity:

| Locator | Generated count | Fixture count | Exact ordered equality | Duplicates | Missing | Extra |
|---|---:|---:|---|---|---|---|
| `data/raw-factions/blue/blue.profile.json#/core_identity` | 5 | 5 | PASS | none | none | none |
| `data/raw-factions/blue/blue.placement.json#/placement_summary` | 6 | 6 | PASS | none | none | none |

`/core_identity` claim order: `blue_claim_0002`, `blue_claim_0003`, `blue_claim_0004`, `blue_claim_0005`, `blue_claim_0006`.

`/placement_summary` claim order: `blue_claim_0002`, `blue_claim_0003`, `blue_claim_0004`, `blue_claim_0005`, `blue_claim_0006`, `blue_claim_0007`.

## 14. Frozen and Scope Proof

Frozen placement and scope controls passed:

- Placement summary text preserved.
- Required positive terms preserved: `knowledge`, `learning`, `tools`, `improvement`, `optimization`, `control`, `deliberation`.
- Minimum hits preserved: 2.
- Broad penalty preserved: 0.13.
- Strengthen/suppress lists preserved.
- Lateral targets preserved: `WU`, `UB`, `UR`, `UG`.
- Raw collision guidance remains object-with-`pairs`; pair order preserved: `R`, `G`.
- Explicit generic collision target remains absent in raw and generated placement data.
- Native question, axis, collision, profile, and placement IDs remain stable or are added only where required to eliminate null canonical IDs.
- Generated/public/recruiter stale-risk hits were manually classified as bounded Commander gameplay support, mechanics-as-texture prompts, or negative guardrails.
- Candidate-scope validation passed for `428128505a194293feb915c929072e23dc9f0ace..ac774e2eac207cc7fe2d744beac1f11788908159`.

## 15. Validation Evidence

Validation run for the candidate:

- JSON parse checks for Blue raw files, changed generated JSON, and Blue fixture: PASS.
- Explicit role/evidence/provenance/frozen-field control script: PASS after correcting checker assumptions for provenance wrapper/schema fields.
- Blue-only stale generated/public/recruiter scan: PASS after path-aware classification; every hit is bounded support/texture or a negative guardrail.
- `npm.cmd run build:factions`: PASS; repeated generation did not widen the changed file set.
- `node research/audit-semantic-readiness.mjs --targets=U`: PASS; reports 8 claims, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=U`: PASS.
- `node research/semantic-candidate-scope-tests.js`: PASS.
- `npm.cmd run test:semantic-readiness`: PASS; verified 1813 semantic provenance entries.
- `npm.cmd run test:placement`: PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: PASS.
- `npm.cmd run test:source-generated`: PASS with known unrelated JESKAI/MARDU model-owned inhibitor warnings only.
- `npm.cmd test`: PASS; 226 parser cases, 6 builder cases, 22 syntax translation cases, 12 mode cases, 12 leakage cases, and supporting contract/maze/search tests passed.
- `git diff --check`: PASS; line-ending warnings only.
- `git diff --cached --check`: PASS before candidate commit.
- Candidate scope: `node research/validate-semantic-candidate-scope.mjs --base=428128505a194293feb915c929072e23dc9f0ace --target=ac774e2eac207cc7fe2d744beac1f11788908159 --identity=U`: PASS.

Known validation notes:

- Two early ad hoc manual-check scripts failed because they assumed the provenance file was a top-level array and then assumed the wrong placement calibration path. The corrected script used `entries`, `identity_key`, `canonical_pointer`, fixture `fixture_id`, and `calibration_tuning`, then passed.
- An intentionally broad stale-term scan across all factions failed because it included unrelated non-Blue surfaces. The Blue-scoped, path-aware scan passed.
- `npm.cmd run test:source-generated` retains unrelated JESKAI/MARDU warnings already tracked by the guardrail suite.

## 16. Gate 5 Candidate

Candidate commit: `ac774e2eac207cc7fe2d744beac1f11788908159`

Commit subject: `VM-518 remediate Blue semantic readiness candidate`

Candidate files:

- `data/raw-factions/blue/blue.claims.json`
- `data/raw-factions/blue/blue.profile.json`
- `data/raw-factions/blue/blue.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/blue.semantic-fixtures.json`

No superseded Blue candidate exists in this Gate 5 run. This exact SHA is the object awaiting independent review.

## 17. Workflow State

Status: exact candidate approved / awaiting certification.

Blue is not certified and is not semantically_ready. Independent review approved exact candidate `ac774e2eac207cc7fe2d744beac1f11788908159`; no certification occurred, and VM-519 was not started. Program base remains the White certification SHA `9d250a7a76d219fdb961915cbf989a10a575c757`. The allowed Table Talk baseline remains preserved and uncommitted.

## 18. Independent Review Record

Independent review completed on 2026-07-18 in a separate review window.

Decision: `APPROVE EXACT SHA ac774e2eac207cc7fe2d744beac1f11788908159`

Review report: `docs/incidents/recoveries/VM-518-blue-independent-review.md`

Review-record commit: `PENDING_VM518_BLUE_REVIEW_RECORD_SHA`

Review verified:

- Exact candidate ancestry and isolation from workflow-only governance files.
- Candidate scope limited to Blue raw/generated/recruiter/fixture/provenance surfaces.
- Final role counts: 8 total claims, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- All substantive claims include bounded Contract v1.1 `evidence_scope`.
- Support-only governance/rules/Scryfall Commander records are isolated from authoritative proof chains.
- U provenance has 25 entries, 0 required null canonical IDs, 0 null content hashes, 0 unresolved pointers, 0 duplicate canonical entries, and 0 support/discovery-backed authoritative chains.
- Fixture/provenance exact ordered equality for `/core_identity` and `/placement_summary`.
- Public, recruiter, placement, provenance, and identity-layer preview surfaces align with source-bounded Blue semantics.
- Frozen placement, collision, preview, native-ID, and calibration controls remain unchanged.
- Required-neighbor boundaries are testable and source-bounded.
- Deterministic generation, exact candidate-scope validation, semantic-readiness validation, placement tests, faction-context isolation, source-generated tests, and full `npm.cmd test` passed.

No blocker, high, medium, or low findings remain.

## 19. Certification Record

Certification decision: CERTIFY exact approved candidate `ac774e2eac207cc7fe2d744beac1f11788908159`.

Certification commit: `PENDING_VM518_CERTIFICATION_COMMIT_SHA`.

Certified state:

- Blue / U is `semantically_ready`.
- CRIT-001 certified identity count advances from 16 to 17.
- Wave 3 monocolors advance from 1 of 5 to 2 of 5 certified.
- Current program base advances from `9d250a7a76d219fdb961915cbf989a10a575c757` to `PENDING_VM518_CERTIFICATION_COMMIT_SHA`.
- VM-519 Black / B is setup-only on branch `codex/vm-519-black-semantic-recovery`; drift preflight is pending and Gate 1+2 has not started.

Certification guards:

- Current branch before certification: `codex/vm-518-blue-semantic-recovery`.
- Current HEAD before certification: `7a000a6c8919b45238810b0a30020da74e050a7f`.
- Required objects and ancestry passed from program base through approved monocolor validator candidate/review, Blue drift preflight, Gate 1+2, exact candidate, candidate workflow, and independent review/current HEAD.
- Exact review decision confirmed: `APPROVE EXACT SHA ac774e2eac207cc7fe2d744beac1f11788908159`.
- No superseded Blue candidate exists.
- Candidate semantic/generated/fixture/recruiter/provenance/runtime/test/schema/validator/builder/scoring/calibration files have no post-candidate drift.
- Exact candidate-scope command passed: `node research/validate-semantic-candidate-scope.mjs --base=428128505a194293feb915c929072e23dc9f0ace --target=ac774e2eac207cc7fe2d744beac1f11788908159 --identity=U`.
- Certification drift assertions passed for claim roles, evidence scopes, source hierarchy, support isolation, U provenance, exact fixture/provenance parity, frozen fields, public/recruiter/preview alignment, raw object-with-`pairs` collision guidance, generated collision array semantics, and absent explicit generic collision target.
- Deterministic build check passed: `npm.cmd run build:factions` completed and generated files had no content diff.
- Regression commands passed: `node research/audit-semantic-readiness.mjs --targets=U`, `node research/validate-semantic-readiness.mjs --targets=U`, `node research/semantic-candidate-scope-tests.js`, `npm.cmd run test:semantic-readiness`, `npm.cmd run test:placement`, `npm.cmd run test:faction-context-isolation`, `npm.cmd run test:source-generated`, and `npm.cmd test`.

Warnings and limitations:

- `npm.cmd run test:source-generated` retains known unrelated JESKAI/MARDU model-owned inhibitor warnings and exits 0.
- `git diff --check` emitted line-ending warnings only and exited 0.
- The external Excel tracker was not modified.
- VM-519 Black semantic data was not inspected or changed.

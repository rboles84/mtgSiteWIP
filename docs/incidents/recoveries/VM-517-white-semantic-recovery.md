# VM-517 White Semantic Recovery

Status: Candidate created. Awaiting independent review. Not reviewed. Not certified. Not semantically_ready.

Identity: White / W
Contract: CRIT-001 semantic-readiness Contract v1.1
Program base: `272337004aa63cfd33da5f1a859c33d211c8ca74`
Starting HEAD for this Gate 1+2 audit: `2bec073daa70c56a251f9086f034370e4abe22db`
Original STOP preflight: `06627929eb0e048a8c0c20612970e779098a982c`
Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Validator approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Passing preflight rerun: `2bec073daa70c56a251f9086f034370e4abe22db`
Gate 1+2 governance commit: `307b93d56b4314405011f21f7d7616ac4b7ed16f`
Superseded candidate: `8d6014950e5ca45ef85a90855cf283d80fd18e0d`
Final candidate awaiting review: `89535e5f73598a5b518e31e11598b05087274a95`

This record began as the read-only Gate 1+2 audit and evidence confirmation for White, then was extended by the Gate 5 workflow record after candidate creation. It does not perform independent review, does not certify White, does not mark White semantically_ready, does not advance the program base, does not start VM-518, and does not modify the external Excel tracker.

## 1. Preflight Reverification

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `codex/vm-517-white-semantic-recovery`. |
| Starting HEAD | PASS | `2bec073daa70c56a251f9086f034370e4abe22db`. |
| Program base | PASS | `272337004aa63cfd33da5f1a859c33d211c8ca74`; `git merge-base --is-ancestor` passed. |
| Original STOP preserved | PASS | `docs/incidents/recoveries/VM-517-white-drift-preflight.md`; SHA `06627929eb0e048a8c0c20612970e779098a982c`. |
| Validator candidate approved | PASS | `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` exists and later review records `APPROVE EXACT SHA aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`. |
| Passing preflight rerun | PASS | `docs/incidents/recoveries/VM-517-white-drift-preflight-rerun.md` records `PASS - WHITE GATE 1+2 AUTHORIZED`. |
| Certified count | PASS | CRIT ledger records 15 certified identities; Wave 2 Ravnica is complete. |
| Allowed dirty baseline | PASS | Only the Table Talk baseline is dirty: modified `docs/handoffs/HANDOFF_INDEX.md` and two untracked Table Talk handoffs. |
| Original main allowance | PASS | Read-only status of `C:\dev\mtgSiteWIP` shows known docs/workflow dirt only; no raw/generated/semantic/runtime/test/schema changes were observed. |
| White edits during audit | PASS | Gate 1+2 stayed read-only for White raw, generated, fixture, provenance, recruiter, schema, validator, builder, scoring, calibration, and runtime files. |
| VM-518 | PASS | Not started. |

## 2. Source Authority

| Source ID | Stored role | Gate 1+2 role decision | Permitted use |
|---|---|---|---|
| `MONO-W-2015` | `philosophy_backbone` | Valid claim-bearing official philosophy source. | May support substantive White identity claims where bounded to digest/PDF anchors `W2015-*`. |
| `MONO-W-2025` | `current_voice_update` | Valid claim-bearing current official voice source with rhetorical caveat. | May support substantive White identity claims where bounded to digest/PDF anchors `W2025-*`; do not over-read first-person rhetoric as neutral doctrine. |
| `MECH-CP-2021` | `mechanical_authority` | Valid claim-bearing mechanical snapshot source. | May support source-bounded mechanic texture only; cannot independently prove White philosophy or placement identity. |
| `GOV-COC-2024` | `governance_process_authority` | Valid claim-bearing process/mechanical-evolution source. | May support color-pie governance and Commander-driven mechanical evolution only; cannot independently prove White philosophy. |
| `RULES-CR` | `commander_rules_boundary` | Support/rules-boundary source. | Support-only for Commander eligibility and color identity boundaries; not philosophical proof. |
| `VM-377` | `project_governance` | Governance support source. | Support-only for Vox Mana packet/intake boundary; not color philosophy or placement proof. |
| `SCRYFALL-W-2026-06-13` | `current_card_legality_verification` | Support/current-card verification source. | Support-only for the three retained Commander Compass rows; not philosophy, popularity, deck-quality, or placement proof. |

The local source hierarchy is sufficient for remediation without online discovery. Gate 3+4 must localize all substantive claim evidence to the existing listed/local sources and must not promote mechanics, governance, rules, legality, project, or generated/runtime material into broad identity proof.

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
| `white_claim_0001` | `source_authority_boundary` | `support_record` | Vox Mana governance/source-intake boundary only. Retain as metadata/history; remove from authoritative profile/provenance proof chains. |
| `white_claim_0002` | `philosophy_goal` | `substantive_claim` | Supported by `MONO-W-2015` anchors `W2015-Q1`, `W2015-Q1b` and `MONO-W-2025` anchors `W2025-a`, `W2025-b`. |
| `white_claim_0003` | `philosophy_means` | `substantive_claim` | Supported by `MONO-W-2015` anchors `W2015-Q2`, `W2015-Q2b` and `MONO-W-2025` anchors `W2025-d`, `W2025-e`. |
| `white_claim_0004` | `cares_and_threats` | `substantive_claim` | Supported by `MONO-W-2015` anchors `W2015-Q3`, `W2015-Q4` and `MONO-W-2025` anchor `W2025-e`. Must stay bounded and avoid declaring White inherently good or morally superior. |
| `white_claim_0005` | `relationships` | `substantive_claim` | Supported by `MONO-W-2015` anchors `W2015-Q5`, `W2015-Q5b` and `MONO-W-2025` anchors `W2025-f`, `W2025-g`, `W2025-h`, `W2025-i`. Used for mono and neighbor boundaries. |
| `white_claim_0006` | `strength_weakness` | `substantive_claim` | Supported by `MONO-W-2015` anchor `W2015-Q6` and `MONO-W-2025` anchor `W2025-j`. Must preserve the rigidity/adaptation pressure. |
| `white_claim_0007` | `mechanical_texture` | `substantive_claim` | Supported by `MECH-CP-2021` anchors `MECH-carddraw`, `MECH-counters`, `MECH-removal` and `GOV-COC-2024` anchor `COC-shift-commander`. Mechanic-specific only; cannot define White by mechanics alone. |
| `white_claim_0008` | `commander_boundary` | `support_record` | Rules/project/Scryfall support for Commander Compass/navigation only. Retain as auxiliary support metadata; remove from placement/profile/provenance chains that prove semantic identity. |

Expected post-remediation role count if Gate 3+4 follows this disposition: 6 substantive, 0 discovery, 2 support, 0 unclassified.

## 4. Evidence Scope Findings

All six future substantive claims require bounded `evidence_locations` with Contract v1.1 `evidence_scope`. Required scoped locators:

- `white_claim_0002`: `docs/research/mono_upgrade/10_white.md#W2015-Q1`, `#W2015-Q1b`, `#W2025-a`, `#W2025-b`; scope should be White philosophy goal / group-needs framing.
- `white_claim_0003`: `docs/research/mono_upgrade/10_white.md#W2015-Q2`, `#W2015-Q2b`, `#W2025-d`, `#W2025-e`; scope should be White method / law, morality, incentives, institutions.
- `white_claim_0004`: `docs/research/mono_upgrade/10_white.md#W2015-Q3`, `#W2015-Q4`, `#W2025-e`; scope should be thematic center and threat boundary.
- `white_claim_0005`: `docs/research/mono_upgrade/10_white.md#W2015-Q5`, `#W2015-Q5b`, `#W2025-f`, `#W2025-g`, `#W2025-h`, `#W2025-i`; scope should be neighbor/alignment boundary.
- `white_claim_0006`: `docs/research/mono_upgrade/10_white.md#W2015-Q6`, `#W2025-j`; scope should be strength/pressure behavior.
- `white_claim_0007`: `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md#MECH-carddraw`, `#MECH-counters`, `#MECH-removal`, and `docs/research/mono_upgrade/22_council_of_colors.md#COC-shift-commander`; scope should be mechanic-specific texture and color-pie evolution only.

Support records may retain existing evidence-row/native IDs as metadata, but they must not be used independently to prove profile identity, placement identity, recruiter guidance, semantic readiness, public copy, or fixtures.

## 5. Consumed Surface Findings

Current consumed surfaces are not semantically ready:

- `data/raw-factions/white/white.profile.json#/core_identity` and `#/profile` use all eight claims, including support/governance and Commander support rows.
- `data/raw-factions/white/white.profile.json#/mechanics` uses `white_claim_0007` but lacks a native canonical ID.
- `data/raw-factions/white/white.placement.json#/discriminator_questions/3` uses `white_claim_0008`; Gate 3+4 must remove support-only Commander verification from canonical placement proof.
- `data/raw-factions/white/white.placement.json#/chatbot_guidance/how_to_recognize_mismatch/0..4` lacks evidence mapping.
- `data/semantic-readiness-provenance.json` has 12 W entries, 3 required null canonical IDs, 0 null content hashes, 0 unresolved pointers, and 0 duplicate canonical entries.
- The White semantic fixture file `research/fixtures/semantic-readiness/white.semantic-fixtures.json` is absent.
- `data/identity-layers.json#/expressions/W/preview_text` and the embedded `data/factions.json#/identity_layers/expressions/W/preview_text` are equal and currently read: `White values structure, protection, community, duty, and shared stability. It asks how life can be made safer through order.`
- Gate 3+4 may keep the preview if source-supported and bounded; any preview change must follow DRIFT-015 source-to-embedded equality and stale-copy controls.

## 6. Exact-Chain Baseline

Current generated/provenance chains:

| Canonical locator | Canonical ID | Ordered claim IDs | Count | Unique | Duplicate IDs | Fixture state |
|---|---|---|---:|---:|---|---|
| `data/raw-factions/white/white.profile.json#/core_identity` | null | `white_claim_0001`, `white_claim_0002`, `white_claim_0003`, `white_claim_0004`, `white_claim_0005`, `white_claim_0006`, `white_claim_0007`, `white_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/white/white.profile.json#/mechanics` | null | `white_claim_0007` | 1 | 1 | none | absent |
| `data/raw-factions/white/white.profile.json#/profile` | null | `white_claim_0001`, `white_claim_0002`, `white_claim_0003`, `white_claim_0004`, `white_claim_0005`, `white_claim_0006`, `white_claim_0007`, `white_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/white/white.placement.json#/placement_axes/0` | `axis_group_order` | `white_claim_0002`, `white_claim_0003` | 2 | 2 | none | absent |
| `data/raw-factions/white/white.placement.json#/placement_axes/1` | `axis_care_as_infrastructure` | `white_claim_0003`, `white_claim_0004`, `white_claim_0006` | 3 | 3 | none | absent |
| `data/raw-factions/white/white.placement.json#/placement_axes/2` | `axis_rigidity_risk` | `white_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/0` | `white_disc_001` | `white_claim_0002`, `white_claim_0003`, `white_claim_0004` | 3 | 3 | none | absent |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/1` | `white_disc_002` | `white_claim_0003`, `white_claim_0005`, `white_claim_0006` | 3 | 3 | none | absent |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/2` | `white_disc_003` | `white_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/white/white.placement.json#/discriminator_questions/3` | `white_disc_004` | `white_claim_0007`, `white_claim_0008` | 2 | 2 | none | absent |
| `data/raw-factions/white/white.placement.json#/collision_guidance/pairs/0` | `white_vs_black` | `white_claim_0005` | 1 | 1 | none | absent |
| `data/raw-factions/white/white.placement.json#/collision_guidance/pairs/1` | `white_vs_red` | `white_claim_0005` | 1 | 1 | none | absent |

Gate 3+4 must create fixtures from generated canonical truth after remediation. At minimum, the fixture must include core inclusion, mature/pressure behavior, required-neighbor exclusions, and provenance fixtures for `/core_identity` and `/placement_summary` if Gate 3+4 creates a canonical placement summary object by precedent.

## 7. Frozen Field Baseline

Candidate-scope-sensitive fields verified unchanged from the passing preflight:

- Placement summary: `White is a strong fit when a user wants safety, peace, and group flourishing made repeatable through structure, duty, law, defense, and shared standards.`
- Required positive evidence terms: `group needs`, `shared rules`, `duty`, `peace`, `protection`, `law`, `community`.
- Required positive minimum hits: 2.
- Broad match penalty: 0.13.
- Strengthen list: `reducing suffering through structure`; `fair process and accountability`; `coordinated small pieces`; `personal sacrifice for group safety`.
- Suppress list: `self-interest above duty`; `impulse above restraint`; `knowledge optimization without group floor`; `natural destiny over taught moral order`.
- Lateral targets: `WU`, `WB`, `WG`, `WR`.
- Raw collision shape: object with `pairs`.
- Collision targets: `B`, `R`.
- Explicit `GENERIC_W_OVERFIT` collision target: absent.
- Native IDs: `white`, `axis_group_order`, `axis_care_as_infrastructure`, `axis_rigidity_risk`, `white_disc_001`, `white_disc_002`, `white_disc_003`, `white_disc_004`, `white_vs_black`, `white_vs_red`.
- Preview source and embedded consumer: equal.

Gate 3+4 must preserve these fields unless candidate-scope explicitly permits a documented, target-scoped exception. The object-with-`pairs` collision-guidance structure must not be converted to a guild-style array.

## 8. Neighbor Boundaries Required

Gate 3+4 must provide testable White collision/fixture guidance for:

- `GENERIC_W_OVERFIT`: White requires peace/reduced suffering through group-first structure, not generic goodness, kindness, safety, morality, or order.
- `WU` / Azorius: White baseline uses law/structure for group peace; Azorius adds blue bureaucratic procedure, codification, surveillance, and institutional control.
- `WR` / Boros: White baseline includes defense and order; Boros adds red-white militarized justice, action, solidarity, and force.
- `WB` / Orzhov: White baseline includes law/religion/community; Orzhov adds transaction, debt, hierarchy, wealth, and service obligations.
- `WG` / Selesnya: White baseline includes community and cooperation; Selesnya adds green-white communal harmony, spiritual unity, and shared life.
- `SILVERQUILL`: White baseline is not rhetoric, status, reputation, social leverage, or verbal hierarchy.
- `LOREHOLD`: White baseline is not history, archaeology, ancestral memory, or preservation through artifacts.
- `BANT`: White baseline is not three-color ordered hierarchy, noble community, or exalted social order.
- `ESPER`: White baseline is not blue-black-white controlled perfection, artifice, or systemic hierarchy.
- `MARDU`: White baseline is not conquest, raid, martial loyalty, or clan aggression.
- `NAYA`: White baseline is not creature grandeur, nature reverence, or red-green-white communal vitality.
- `ABZAN`: White baseline is not family, ancestry, endurance, or clan obligation at broader color identity.
- `U`: White baseline is not mono-blue knowledge, optimization, planning, or individual perfection.
- `B`: White baseline is not mono-black self-interest, ambition, or power.
- `R`: White baseline is not mono-red freedom, impulse, emotion, or action.
- `G`: White baseline is not mono-green nature, destiny, instinct, or organic acceptance.

These boundaries must be represented in allowed semantic or fixture structures without adding a frozen explicit `GENERIC_W_OVERFIT` raw collision target.

## 9. Semantic Risks

Gate 1+2 found the current packet vulnerable to:

- Generic morality, virtue, goodness, righteousness, altruism, heroism, order, law, rules, peace, fairness, justice, equality, protection, community, safety, civilization, or cooperation.
- Mechanics overfit: lifegain, tokens, go-wide, vigilance, protection, exile, board wipes, equipment, taxes, stax, small creatures, and other mechanics cannot define White.
- Institution stereotype overfit: religion, purity, angels, soldiers, knights, armies, governments, courts, churches, hierarchy, or authoritarianism must remain source-bounded and not become the complete identity.
- Neighbor collapse into Azorius, Boros, Orzhov, Selesnya, Silverquill, Lorehold, Bant, Esper, Mardu, Naya, or Abzan.
- Internal tension erasure: rigidity, over-prescription, and poor adaptation must remain visible.
- Support/provenance leakage from project governance, rules, Scryfall legality, and Commander Compass rows.

## 10. Gate 1+2 Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch and `2bec073daa70c56a251f9086f034370e4abe22db` verified. |
| Correct program base | PASS | `272337004aa63cfd33da5f1a859c33d211c8ca74` verified as ancestor. |
| Approved validator unchanged | PASS | No validator/test diff from approved infrastructure candidate. |
| Passing preflight baseline unchanged | PASS | Preflight-rerun report decision remains `PASS - WHITE GATE 1+2 AUTHORIZED`. |
| Source hierarchy explicit | PASS | Seven sources classified above. |
| Initial claim role state recorded | PASS | 8 unclassified, 0 substantive, 0 discovery, 0 support. |
| Evidence state recorded | PASS | Claim-level evidence locations absent; required evidence scopes identified. |
| ID/hash/pointer state recorded | PASS | 12 W provenance rows, 3 null canonical IDs, 0 null hashes, 0 unresolved pointers, 0 duplicate canonical entries. |
| Fixture/provenance locators recorded | PASS | Twelve current locators listed; fixture absent. |
| Exact-chain state recorded | PASS | Ordered arrays/counts/duplicates recorded. |
| Frozen fields verified | PASS | Placement, calibration, targets, object-with-`pairs`, native IDs, and preview equality verified. |
| Required neighbors covered | PASS | Required comparisons and discriminators recorded. |
| Generic White risks documented | PASS | Risk list recorded. |
| Public/recruiter/preview surfaces inventoried | PASS | Profile, placement, generated preview, provenance, and Commander support boundary inspected. |
| No semantic edit during audit | PASS | No White raw/generated/fixture/provenance/recruiter file changed before this report. |
| Table Talk excluded | PASS | Baseline preserved and excluded from Gate 1+2 scope. |
| VM-518 untouched | PASS | No VM-518 work started. |

No Gate 1+2 control is FAIL or UNKNOWN.

## 11. Decision

REMEDIATION AUTHORIZED

Rationale: White has sufficient local/official source evidence to remediate, but it is not Contract v1.1-ready because all claims lack semantic roles and bounded evidence locations, profile/placement proof chains use non-authoritative support rows, generated provenance has null canonical IDs, guidance lacks evidence mappings, and the required semantic fixture is absent.

Gate 3+4 must preserve frozen fields and the object-with-`pairs` collision-guidance shape while assigning roles, adding evidence scopes, isolating support records, rebuilding generated artifacts, creating fixtures, and validating exact chain/candidate-scope behavior.

## 12. Gate 3+4 Remediation Summary

White remediation assigned `semantic_role` to all 8 claims: 6 `substantive_claim`, 0 `discovery_record`, 2 `support_record`, and 0 `unclassified`. Claims `white_claim_0002` through `white_claim_0007` now carry bounded Contract v1.1 `evidence_locations` with `evidence_scope`; `white_claim_0001` and `white_claim_0008` remain support/history metadata and are excluded from authoritative proof chains.

Authoritative proof chains were narrowed so profile core/site/profile, placement axes, placement summary, discriminator questions, generated public surfaces, recruiter context, semantic-readiness provenance, and fixtures no longer use governance/rules/Scryfall support rows as White semantic proof. `white_claim_0008` remains only in Commander Compass auxiliary support metadata with `evidence_use: auxiliary_support`.

Generated outputs were rebuilt through `npm.cmd run build:factions`. W provenance now has 25 entries, 0 required null canonical IDs, 0 required null canonical content hashes, 0 unresolved pointers, and 0 duplicate canonical locator entries. The new White fixture file covers core inclusion, pressure behavior, required-neighbor exclusions, and exact provenance pairs.

Frozen fields were preserved: placement summary text, required terms, minimum hits, broad penalty, strengthen/suppress lists, lateral targets `WU`, `WB`, `WG`, `WR`, collision targets `B`, `R`, object-with-`pairs` raw collision guidance, absent explicit `GENERIC_W_OVERFIT` generated collision target, native IDs, and preview source-to-embedded equality.

## 13. Exact-Chain Proof

| Canonical locator | Generated count | Fixture count | Exact ordered equality | Duplicate IDs | Missing IDs | Extra IDs |
|---|---:|---:|---|---|---|---|
| `data/raw-factions/white/white.profile.json#/core_identity` | 5 | 5 | PASS | none | none | none |
| `data/raw-factions/white/white.placement.json#/placement_summary` | 6 | 6 | PASS | none | none | none |

Core identity claim order: `white_claim_0002`, `white_claim_0003`, `white_claim_0004`, `white_claim_0005`, `white_claim_0006`.

Placement summary claim order: `white_claim_0002`, `white_claim_0003`, `white_claim_0004`, `white_claim_0005`, `white_claim_0006`, `white_claim_0007`.

## 14. Validation Results

Validation passed for the final candidate:

- JSON parse checks for changed White JSON and fixture files: PASS.
- Manual drift controls: PASS for roles, evidence scopes, support isolation, null ID/hash scan, unresolved-pointer scan, duplicate canonical locator scan, exact fixture/provenance parity, frozen-field comparison, and W public/recruiter stale-copy scan.
- `npm.cmd run build:factions`: PASS; deterministic generation verified by repeated run.
- `node research/audit-semantic-readiness.mjs --targets=W`: PASS; 8 total claims, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=W`: PASS.
- `node research/semantic-candidate-scope-tests.js`: PASS.
- `npm.cmd run test:semantic-readiness`: PASS; verified 1800 semantic provenance entries.
- `npm.cmd run test:placement`: PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: PASS.
- `npm.cmd run test:source-generated`: PASS with known unrelated JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test`: PASS.
- `git diff --check`: PASS with line-ending warnings only.

## 15. Gate 5 Candidate Record

First candidate: `8d6014950e5ca45ef85a90855cf283d80fd18e0d` (`VM-517 remediate White semantic readiness candidate`).

Supersession reason: post-commit candidate-scope validation rejected added `placement_summary/calibrated_primary_read` and `placement_summary/calibrated_false_positive_guardrail` fields. The commit remains preserved and unapproved.

Final candidate awaiting independent review: `89535e5f73598a5b518e31e11598b05087274a95` (`VM-517 remediate White candidate scope replacement`).

Candidate-scope command:

`node research/validate-semantic-candidate-scope.mjs --base=307b93d56b4314405011f21f7d7616ac4b7ed16f --target=89535e5f73598a5b518e31e11598b05087274a95 --identity=W`

Result: PASS, `Semantic candidate scope passed for W: 307b93d56b4314405011f21f7d7616ac4b7ed16f..89535e5f73598a5b518e31e11598b05087274a95`.

White is awaiting independent review. No independent review was performed in this window. No approval decision was issued. White is not certified, not semantically_ready, the program base remains `272337004aa63cfd33da5f1a859c33d211c8ca74`, and VM-518 has not started.

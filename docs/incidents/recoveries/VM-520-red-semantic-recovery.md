# VM-520 Red Semantic Recovery

Status: Replacement candidate approved; awaiting certification.

Identity: Red / R
Contract: CRIT-001 semantic-readiness Contract v1.1
Program base: `1116786785dc4c5c8c1447dcad79c89e527657eb`
Red drift preflight/current starting HEAD: `94a33b70fdac83b350195a3eed7f34118f999e31`
Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Approved validator review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Gate 1+2 governance commit: `6c2b6dfc3e9e838f9e75801517a81258b675923d`
Rejected candidate commit: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`
Replacement candidate commit: `6aefb2090ff20a361f7f3cd80515445036323158`
Replacement independent review decision: `APPROVE EXACT SHA 6aefb2090ff20a361f7f3cd80515445036323158`
Replacement independent review record: `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md`
Workflow-record commit: `70358e1bbb65add714239b0d8621eda0a51e0ed4`
Independent review decision: `REQUEST CHANGES`
Independent review record: `docs/incidents/recoveries/VM-520-red-independent-review.md`

This record is the read-only Gate 1+2 semantic and evidence audit for Red. No Red raw semantic data, generated consumers, provenance, recruiter context, fixtures, tests, validators, builders, schemas, runtime, scoring, calibration, VM-521 files, original-main files, Excel tracker, or Table Talk files were modified by this gate.

## 1. Preflight Reverification

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | Active worktree is `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `codex/vm-520-red-semantic-recovery`. |
| Starting HEAD | PASS | `94a33b70fdac83b350195a3eed7f34118f999e31`. |
| Program base | PASS | `1116786785dc4c5c8c1447dcad79c89e527657eb` exists and is an ancestor of HEAD; it remains the certification/program base. |
| Approved validator | PASS | Diff to `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` is empty for `research/validate-semantic-candidate-scope.mjs` and `research/semantic-candidate-scope-tests.js`; no later validator commits are present. |
| Validator regression | PASS | `node research/semantic-candidate-scope-tests.js` passed. |
| Red drift preflight | PASS | `docs/incidents/recoveries/VM-520-red-drift-preflight.md` records `PASS - RED GATE 1+2 AUTHORIZED`. |
| Certified count | PASS | Board and ledger record 18 certified identities. |
| Wave 3 status | PASS | Wave 3 monocolors remain 3 of 5 certified. |
| Gate 1+2 not previously complete | PASS | VM-520 card, board, ledger, and handoff trail recorded Gate 1+2 authorized but not started before this audit. |
| Red implementation cleanliness | PASS | Pre-audit worktree dirt contained only the allowed Table Talk baseline. |
| Table Talk exclusion | PASS | Preserved and excluded: modified `docs/handoffs/HANDOFF_INDEX.md`; untracked Table Talk handoffs `2026-07-16-2119...` and `2026-07-16-2128...`. |
| Original main allowance | PASS | Read-only `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` showed docs/workflow dirt only plus Git config permission warnings; no raw, generated, semantic, fixture, provenance, data, test, schema, validator, builder, scoring, calibration, or runtime changes were observed. |
| VM-521 untouched | PASS | VM-521 remains not started. |

## 2. Source Authority

| Source ID | Stored role | Gate 1+2 role decision | Permitted use |
|---|---|---|---|
| `MONO-R-2015` | `philosophy_backbone` | Valid claim-bearing official philosophy source. | May support substantive Red identity claims when bounded to local digest/PDF anchors `R2015-*`. |
| `MONO-R-2025` | `current_voice_update` | Valid claim-bearing current voice source with first-person/rhetorical caveat. | May support substantive Red identity claims when bounded to anchors `R2025-*`; must not over-read Red voice as universal moral truth or unbounded license. |
| `MECH-CP-2021` | `mechanical_authority` | Valid claim-bearing mechanical color-pie snapshot. | May support mechanic-specific texture only; cannot independently prove Red philosophy, placement identity, public copy, or recruiter guidance. |
| `GOV-COC-2024` | `governance_process_authority` | Valid color-pie governance and process source. | May support dated process context for Commander-driven red card-draw/gap handling; cannot independently prove Red philosophy or placement identity. |
| `RULES-CR` | `commander_rules_boundary` | Rules-boundary support source. | Support-only for Commander eligibility and color-identity boundaries; not philosophical proof. |
| `VM-377` | `project_governance` | Project governance support. | Support-only for Vox Mana source-intake and packet boundary; not color philosophy or placement proof. |
| `SCRYFALL-R-2026-06-13` | `current_card_legality_verification` | Current-card support verification. | Support-only for the three Commander Compass rows; not philosophy, popularity, deck quality, public copy, or placement proof. |

The local source hierarchy is sufficient for remediation. No online source intake is required for Gate 3+4 if remediation stays inside the listed local official/source-intake records and recorded locators.

## 3. Claim Role Findings

Initial live audit:

- Total claims: 8.
- `substantive_claim`: 0.
- `discovery_record`: 0.
- `support_record`: 0.
- `unclassified`: 8.
- Explicit claim-level semantic roles: absent.
- Claim-level bounded evidence locations: absent; current claims use `evidence_rows`.

Gate 1+2 role disposition:

| Claim ID | Current claim type | Role to assign in Gate 3+4 | Evidence/source disposition |
|---|---|---|---|
| `red_claim_0001` | `source_authority_boundary` | `support_record` | Vox Mana governance/source-intake boundary only. Retain as metadata/history; remove from authoritative profile, placement, public, recruiter, fixture, and provenance proof chains. |
| `red_claim_0002` | `philosophy_goal` | `substantive_claim` | Supported by `MONO-R-2015` anchor `R2015-Q1` and `MONO-R-2025` anchors `R2025-a`, `R2025-b`, `R2025-c`. Must avoid sloganizing "follow your heart" or "live in the moment" without finite-life, desire, connection, and action bounds. |
| `red_claim_0003` | `philosophy_means` | `substantive_claim` | Supported by `MONO-R-2015` anchor `R2015-Q2` and `MONO-R-2025` anchors `R2025-b`, `R2025-c`, `R2025-e`. Must keep action/learning-by-doing bounded and not treat destruction/speed as the whole identity. |
| `red_claim_0004` | `cares_and_threats` | `substantive_claim` | Supported by `MONO-R-2015` anchors `R2015-Q3`, `R2015-Q4` and `MONO-R-2025` anchor `R2025-g`. High-heat terms such as violence, destruction, chaos, passion, romance, and humor are thematic texture, not sufficient Red proof. |
| `red_claim_0005` | `relationships` | `substantive_claim` | Supported by `MONO-R-2015` anchors `R2015-Q5`, `R2015-Q5b` and `MONO-R-2025` anchors `R2025-d`, `R2025-e`, `R2025-f`, `R2025-h`. Used for mono and required-neighbor boundaries, especially W/U/B/G and red guild/college/shard/wedge neighbors. |
| `red_claim_0006` | `strength_weakness` | `substantive_claim` | Supported by `MONO-R-2015` anchor `R2015-Q6` and `MONO-R-2025` anchor `R2025-i`. Must preserve consequence pressure, short-sightedness risk, and internal tension. |
| `red_claim_0007` | `mechanical_texture` | `substantive_claim` | Supported by `MECH-CP-2021` anchors `MECH-removal`, `MECH-carddraw`, `MECH-antiflying`, `MECH-artifact-friendly` and `GOV-COC-2024` anchors `COC-shift-commander`, `COC-gaps`. Mechanic/process-specific only; cannot define Red by burn, haste, treasure, impulse draw, spell copying, creatures, or Commander examples alone. |
| `red_claim_0008` | `commander_boundary` | `support_record` | Rules/project/Scryfall support for Commander Compass/navigation only. Retain as auxiliary support metadata; remove from placement/profile/provenance chains that prove semantic identity. |

Expected post-remediation role count if Gate 3+4 follows this disposition: 6 substantive, 0 discovery, 2 support, 0 unclassified.

## 4. Evidence Scope Findings

Every future substantive Red claim requires bounded `evidence_locations` with Contract v1.1 `evidence_scope`:

- `red_claim_0002`: `docs/research/mono_upgrade/13_red.md#R2015-Q1` and `#R2025-a;R2025-b;R2025-c`; scope should be canonical identity and Red goal.
- `red_claim_0003`: `docs/research/mono_upgrade/13_red.md#R2015-Q2` and `#R2025-b;R2025-c;R2025-e`; scope should be preferred method and learning-by-doing.
- `red_claim_0004`: `docs/research/mono_upgrade/13_red.md#R2015-Q3;R2015-Q4` and `#R2025-g`; scope should be thematic boundary and anger-only correction.
- `red_claim_0005`: `docs/research/mono_upgrade/13_red.md#R2015-Q5;R2015-Q5b` and `#R2025-d;R2025-e;R2025-f;R2025-h`; scope should be required-neighbor boundary.
- `red_claim_0006`: `docs/research/mono_upgrade/13_red.md#R2015-Q6` and `#R2025-i`; scope should be pressure behavior and consequence.
- `red_claim_0007`: `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md#MECH-removal;MECH-carddraw;MECH-antiflying;MECH-artifact-friendly` and `docs/research/mono_upgrade/22_council_of_colors.md#COC-shift-commander;COC-gaps`; scope should be mechanic/process-specific.

Support records may retain existing evidence rows and native IDs as metadata, but they must not prove profile identity, placement identity, public copy, recruiter guidance, semantic readiness, fixtures, or canonical provenance chains.

## 5. Consumed Surface Findings

Current consumed surfaces are not semantically ready:

- `data/raw-factions/red/red.profile.json#/core_identity` and `#/profile` use all eight claims, including governance and Commander support rows.
- `data/raw-factions/red/red.profile.json#/mechanics` uses `red_claim_0007` but lacks a stable native canonical ID.
- `data/raw-factions/red/red.profile.json#/site_surface` lacks a stable native canonical ID and explicit claim chain.
- `data/raw-factions/red/red.placement.json#/placement_summary` is a string and lacks stable canonical ID/claim chain by current monocolor provenance precedent.
- `data/raw-factions/red/red.placement.json#/discriminator_questions/3` mixes mechanic texture and support-only Commander verification; Gate 3+4 must remove support-only Commander proof from semantic placement guidance.
- `data/raw-factions/red/red.placement.json#/chatbot_guidance/how_to_recognize_mismatch/0..4` lacks explicit evidence mapping.
- `data/semantic-readiness-provenance.json` has 12 R entries. Current generated truth has 3 required null canonical IDs (`/core_identity`, `/mechanics`, `/profile`), 0 null content hashes, 0 unresolved pointers, 0 duplicate canonical entries, and 0 duplicate null canonical-entry keys.
- The Red semantic fixture file `research/fixtures/semantic-readiness/red.semantic-fixtures.json` is absent.
- `data/identity-layers.json#/expressions/R/preview_text` and embedded `data/factions.json#/identity_layers/expressions/R/preview_text` are equal and read: `Red values emotion, impulse, authenticity, passion, and expression. It asks what is true when you stop pretending.`

Gate 3+4 must change the preview unless source-supported proof shows the current line remains semantically aligned after remediation. The current preview is a DRIFT-015/017 risk because it leans on generic emotion, impulse, authenticity, passion, and expression while omitting consequence, attachment, loyalty, and neighbor boundaries. Any preview change must follow DRIFT-015 source ownership, source-to-consumer equality, exact stale-copy search, semantic-equivalent stale-copy review, and candidate-scope controls.

## 6. Exact-Chain Baseline

Current generated/provenance chains:

| Canonical locator | Canonical ID | Ordered claim IDs | Count | Unique | Duplicate IDs | Fixture state |
|---|---|---|---:|---:|---|---|
| `data/raw-factions/red/red.profile.json#/core_identity` | null | `red_claim_0001`, `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007`, `red_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/red/red.profile.json#/mechanics` | null | `red_claim_0007` | 1 | 1 | none | absent |
| `data/raw-factions/red/red.profile.json#/profile` | null | `red_claim_0001`, `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007`, `red_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/red/red.placement.json#/placement_axes/0` | `axis_emotion_to_action` | `red_claim_0002`, `red_claim_0003` | 2 | 2 | none | absent |
| `data/raw-factions/red/red.placement.json#/placement_axes/1` | `axis_freedom_over_constraint` | `red_claim_0004`, `red_claim_0005` | 2 | 2 | none | absent |
| `data/raw-factions/red/red.placement.json#/placement_axes/2` | `axis_consequence_shadow` | `red_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/0` | `red_disc_001` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004` | 3 | 3 | none | absent |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/1` | `red_disc_002` | `red_claim_0005`, `red_claim_0006` | 2 | 2 | none | absent |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/2` | `red_disc_003` | `red_claim_0005`, `red_claim_0006` | 2 | 2 | none | absent |
| `data/raw-factions/red/red.placement.json#/discriminator_questions/3` | `red_disc_004` | `red_claim_0007`, `red_claim_0008` | 2 | 2 | none | absent |
| `data/raw-factions/red/red.placement.json#/collision_guidance/pairs/0` | `red_vs_white` | `red_claim_0005` | 1 | 1 | none | absent |
| `data/raw-factions/red/red.placement.json#/collision_guidance/pairs/1` | `red_vs_blue` | `red_claim_0005` | 1 | 1 | none | absent |

Gate 3+4 must create fixtures from generated canonical truth after remediation. At minimum, the fixture must include core inclusion, mature/pressure behavior, nearest-collision ambiguity, required neighbor exclusions, and provenance fixtures for `/core_identity` and `/placement_summary`.

## 7. Frozen Field Baseline

Candidate-scope-sensitive fields verified unchanged from the drift preflight:

- Placement summary text: `Red is a strong fit when a user wants freedom, emotional truth, immediacy, and action that makes life vivid rather than over-managed.`
- Top-level placement confidence: absent.
- Discriminator confidences: `red_disc_001: High`, `red_disc_002: Medium`, `red_disc_003: High`, `red_disc_004: High`.
- Required positive evidence terms: `freedom`, `emotion`, `action`, `passion`, `impulse`, `experience`, `speed`.
- Required positive minimum hits: 2.
- Broad match penalty: 0.13.
- Strengthen list: `acting from feeling`; `learning by doing`; `breaking restrictive stasis`; `loyalty or passion`.
- Suppress list: `rules over desire`; `analysis before every action`; `power calculation without feeling`; `chaos without emotional truth`.
- False-positive guardrail: `Do not place Red for chaos, anger, or haste alone; require freedom, emotion, action, or lived experience.`
- Lateral targets: `WR`, `UR`, `BR`, `RG`.
- Raw collision shape: object with keys `rule`, `review_triggers`, `pairs`.
- Collision targets and order: `W`, then `U`.
- Explicit `GENERIC_R_OVERFIT` collision target: absent.
- Native IDs: `red`, `axis_emotion_to_action`, `axis_freedom_over_constraint`, `axis_consequence_shadow`, `red_disc_001`, `red_disc_002`, `red_disc_003`, `red_disc_004`, `red_vs_white`, `red_vs_blue`.
- Preview source and embedded consumer: equal at Gate 1+2, but semantically risky.
- Red-local scoring/golden-path fields: absent.

Gate 3+4 must preserve these fields unless candidate-scope explicitly permits a documented, target-scoped exception. The object-with-`pairs` collision-guidance structure must not be converted to a guild-style array.

## 8. Neighbor Boundaries Required

Gate 3+4 must provide testable Red fixture/collision guidance for:

- `GENERIC_R_OVERFIT`: Red requires source-backed freedom through emotion and action, with consequence and attachment boundaries, not generic passion, authenticity, chaos, rebellion, spontaneity, anger, or speed.
- `W`: Red freedom and desire are not mono-White peace, law, group safety, duty, or shared restraint.
- `U`: Red learning by doing and felt motion are not mono-Blue planning, optimization, knowledge, or control before action.
- `B`: Red risk and desire are not Black calculated self-interest, leverage, opportunity, or cost accounting.
- `G`: Red impulse/action are not Green instinct, destiny, wild belonging, natural role, or anti-civilization acceptance.
- `WR` / Boros: Red urgency is not protective duty, military solidarity, intervention under justice, or conviction on behalf of others.
- `UR` / Izzet: Red impulse is not experiment, prototype, theory, technique, or spellcraft as the active method.
- `BR` / Rakdos: Red release is not appetite, spectacle, transgression, cruelty, public rupture, or pain-as-performance.
- `RG` / Gruul: Red freedom is not wildness, bodily instinct, clan belonging, terrain, or anti-civilized force as the center.
- `PRISMARI`: Red expression is not artistic or elemental medium, performance craft, spectacle as art, or Prismari school method.
- `LOREHOLD`: Red passion is not history, tradition, archaeology, evidence from the past, or inherited memory.
- `QUANDRIX`: Red action is not abstraction, pattern theory, mathematical modeling, or reality-as-system.
- `SILVERQUILL`: Red expression is not rhetoric, status, reputation, word magic, or public language as method.
- `WITHERBLOOM`: Red appetite/impulse is not life/death craft, pest biology, essence, brew, or vitality exchange.
- `ESPER`: Red immediacy is not controlled white-blue-black hierarchy, perfected system, artifice, or managed order.
- `GRIXIS`: Red destructive action is not blue-black-red manipulation, domination, survival strategy, or cruelty.
- `MARDU`: Red speed is not red-white-black martial duty, conquest, oath, clan obligation, or honor code.
- `TEMUR`: Red immediacy is not blue-red-green terrain attunement, elemental survival, memory, or instinctive ecology.
- `WUBRG`: Red is not five-color deck breadth, all-color access, or Commander color-identity coverage.
- `COLORLESS`: Red mechanics are not artifact/colorless engines, generic mana, or non-color outside-system identity.

These boundaries must be represented in allowed semantic or fixture structures without adding a frozen explicit `GENERIC_R_OVERFIT` raw/generated collision target.

## 9. Semantic Risks

Gate 1+2 found the current packet vulnerable to:

- Generic Red overfit: emotion, passion, desire, freedom, authenticity, individuality, expression, spontaneity, action, impulse, instinct, creativity, excitement, joy, anger, rebellion, honesty, courage, energy, speed, change, chaos, or living in the moment without source-bounded desire/action/consequence logic.
- Slogan overfit: "follow your heart", "act first", "live in the moment", or "freedom at any cost" as universal advice.
- Moral overfit: Red as inherently more truthful, authentic, honest, or morally superior because it is emotional.
- Vice overfit: Red as inherently irrational, reckless, childish, irresponsible, violent, destructive, hedonistic, or chaos-only.
- Mechanics overfit: burn, direct damage, haste, combat, impulsive draw, rummaging, Treasure, land destruction, coin flips, spellslinger, dragons, goblins, phoenixes, or extra combat as philosophy.
- Boundary loss: freedom without attachment, consequence, responsibility, loyalty, cost, or internal tension.
- Neighbor collapse into Boros duty, Izzet experiment, Rakdos spectacle, Gruul wild belonging, Prismari art, Lorehold inherited passion, Mardu/Jeskai/Grixis/Jund/Temur/Naya tri-color theses, WUBRG breadth, or COLORLESS mechanics.
- Support/provenance leakage from project governance, rules, Scryfall legality, Commander Compass, governance/process-only material, identity layers, and generated/runtime material.

## 10. Gate 1+2 Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch, HEAD, and program base | PASS | Branch `codex/vm-520-red-semantic-recovery`, HEAD `94a33b70fdac83b350195a3eed7f34118f999e31`, program base `1116786785dc4c5c8c1447dcad79c89e527657eb`. |
| Approved validator unchanged | PASS | Diff to approved validator candidate is empty; candidate-scope tests passed. |
| Preflight baseline reconciled | PASS | Committed Red preflight values were extracted and checked against live raw/generated truth. |
| Source hierarchy explicit | PASS | Seven sources classified with permitted uses. |
| Initial claim-role state recorded | PASS | 8 unclassified, 0 substantive, 0 discovery, 0 support. |
| Evidence state recorded | PASS | Claim-level evidence locations absent; required scope/locator plan recorded. |
| ID/hash/pointer state recorded | PASS | 12 R provenance rows, 3 null canonical IDs, 0 null hashes, 0 unresolved pointers. |
| Duplicate state recorded | PASS | 0 duplicate canonical entries and 0 duplicate null-key entries observed in current generated truth. |
| Fixture/provenance locators recorded | PASS | Twelve current locators and missing fixture condition recorded. |
| Exact-chain state recorded | PASS | Ordered arrays/counts/duplicates recorded. |
| Frozen and optional fields verified | PASS | Placement summary, confidence absence, calibration, guardrail, target lists, native IDs, object-with-`pairs`, preview equality, and Red-local scoring/golden-path absences recorded. |
| Raw/generated collision structures verified | PASS | Raw object keys and W/U pair order preserved; generated placement flattens to W then U with same collision IDs. |
| Preview ownership and risk recorded | PASS | Source `data/identity-layers.json#/expressions/R/preview_text`; embedded consumer `data/factions.json#/identity_layers/expressions/R/preview_text`; equality true but semantic alignment risky. |
| Required neighbors covered | PASS | Required neighbor set plus local Red-adjacent boundaries recorded. |
| Red semantic risks documented | PASS | Generic, slogan, moral, vice, mechanics, and neighbor-collapse risks recorded. |
| Public/recruiter/preview surfaces inventoried | PASS | Raw site surface, generated display, identity-layer preview, embedded preview, recruiter context, placement, provenance, and Commander support rows inspected. |
| No semantic edit occurred during audit | PASS | Gate 1+2 changed governance records only. |
| Table Talk excluded | PASS | Allowed Table Talk baseline preserved and unstaged for this gate. |
| VM-521 untouched | PASS | VM-521 not started. |

All required Gate 1+2 controls are PASS or concrete N/A. No FAIL or UNKNOWN controls were recorded.

## 11. Decision

REMEDIATION AUTHORIZED

Rationale: Red has sufficient local official source evidence to remediate, but it is not Contract v1.1-ready because all claims lack semantic roles and bounded evidence locations, support/governance/rules/Scryfall rows enter canonical proof chains, R provenance has null canonical IDs, chatbot mismatch guidance lacks evidence mapping, the Red semantic fixture is absent, and the identity-layer preview is semantically generic enough to require DRIFT-015 remediation or source-supported retention proof.

Gate 3+4 must preserve frozen fields, optional-field absences, object-with-`pairs` collision-guidance structure/order, generated lateral targets, and exact SHA discipline while assigning roles, adding evidence scopes, isolating support/process records, rebuilding generated artifacts, creating fixtures from generated truth, validating exact chain/candidate-scope behavior, and avoiding generic Red, mechanics, and adjacent-identity overfit.

## 12. Validation Run

Commands and checks actually run during Gate 1+2:

- `git status --short --branch` - PASS; branch correct, only allowed Table Talk baseline visible.
- `git rev-parse HEAD` - PASS; returned `94a33b70fdac83b350195a3eed7f34118f999e31`.
- `git branch --show-current` - PASS; returned `codex/vm-520-red-semantic-recovery`.
- `git cat-file -e '1116786785dc4c5c8c1447dcad79c89e527657eb^{commit}'` - PASS.
- `git merge-base --is-ancestor 1116786785dc4c5c8c1447dcad79c89e527657eb HEAD` - PASS.
- `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` - PASS.
- `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` - PASS; no output.
- `node research/semantic-candidate-scope-tests.js` - PASS; `Semantic candidate scope tests passed.`
- `node research/audit-semantic-readiness.mjs --targets=R` - PASS; 8 claims, all unclassified, 7 sources, 12 reference sites.
- `node research/validate-semantic-readiness.mjs --targets=R` - exit 1; expected pre-remediation failures for missing semantic roles, missing recruiter evidence mapping, no substantive authoritative references, and missing Red fixtures.
- `node research/validate-semantic-candidate-scope.mjs --base=94a33b70fdac83b350195a3eed7f34118f999e31 --target=94a33b70fdac83b350195a3eed7f34118f999e31 --identity=R` - exit 1; expected same-SHA unclassified proof-chain diagnostics, no validator crash.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` - PASS as read-only original-main allowance; docs/workflow dirt only plus Git config permission warnings.
- JSON read/parse and manual inspection for Red raw, generated, provenance, recruiter, preview, ledger, source digest, mechanical digest, rules digest, and governance docs - PASS.

## 13. Not Performed

- No Red raw, generated, fixture, provenance, preview, recruiter, source, test, schema, validator, builder, scoring, calibration, or runtime file was modified.
- No fixture was created.
- No candidate was created.
- No independent review occurred.
- No approval decision was issued.
- No certification occurred.
- Red was not marked `semantically_ready`.
- No VM-521 work occurred.
- No original-main write, Excel update, push, PR, or merge occurred.

## 14. Gate 3+4 Implementation

Gate 3+4 proceeded only after Gate 1+2 recorded `REMEDIATION AUTHORIZED`.

Authoritative files changed:

- `data/raw-factions/red/red.claims.json`: assigned Contract v1.1 semantic roles; added bounded evidence locations and evidence scopes to six substantive claims; isolated `red_claim_0001` and `red_claim_0008` as support records with evidence-use restrictions.
- `data/raw-factions/red/red.profile.json`: removed support/governance/Commander proof from core profile chains, added stable native IDs for profile surfaces, and made Commander Compass support explicitly auxiliary.
- `data/raw-factions/red/red.placement.json`: converted placement summary into an ID-bearing proof-chain object while preserving the frozen summary text; removed Commander support from semantic discriminator proof; added evidence mapping for chatbot mismatch guidance; preserved frozen calibration, collision, confidence, and optional-field absences.
- `data/identity-layers.json`: updated only `expressions.R.preview_text` under DRIFT-015 because the Gate 1+2 preview was semantically generic Red overfit.

Generated files changed by `npm.cmd run build:factions`:

- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Fixture changed:

- `research/fixtures/semantic-readiness/red.semantic-fixtures.json` was added with core inclusion, pressure behavior, nearest-collision ambiguity, required-neighbor exclusions, and provenance fixtures for `/core_identity` and `/placement_summary`.

No tests, validators, builders, schemas, scoring, calibration, unrelated identity raw packets, VM-521 files, original-main files, Table Talk files, or Excel files were modified.

Final role counts: 8 total claims; 6 substantive, 0 discovery, 2 support, 0 unclassified.

Final provenance count: 25 Red entries; 0 required null canonical IDs; 0 required null content hashes; 0 unresolved claim references; 0 duplicate canonical keys.

Red semantic boundary: the candidate defines Red as source-bounded freedom through feeling, action, lived experience, loyalty/attachment, and consequence pressure. It does not certify Red from generic emotion, authenticity, passion, anger, chaos, speed, fire, mechanics, Commander cards, or adjacent guild/college/shard/wedge patterns.

## 15. Exact-Chain Proof

| Canonical locator | Generated ordered IDs | Fixture ordered IDs | Counts | Exact equality | Duplicates | Missing | Extra |
|---|---|---|---:|---|---|---|---|
| `data/raw-factions/red/red.profile.json#/core_identity` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006` | 5 / 5 | true | none | none | none |
| `data/raw-factions/red/red.placement.json#/placement_summary` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007` | 6 / 6 | true | none | none | none |

Additional generated Red provenance locators were inspected and contain only Red-local canonical rows. Support claim `red_claim_0008` appears only on `/commander_compass/identity_basis` with auxiliary support semantics.

## 16. Frozen, Collision, and Preview Proof

- Placement summary text: unchanged and exact.
- Top-level confidence: absent before and after.
- Discriminator confidences: `red_disc_001:High`, `red_disc_002:Medium`, `red_disc_003:High`, `red_disc_004:High`.
- Required terms: `freedom`, `emotion`, `action`, `passion`, `impulse`, `experience`, `speed`.
- Minimum hits: 2.
- Broad penalty: 0.13.
- Strengthen list: `acting from feeling`; `learning by doing`; `breaking restrictive stasis`; `loyalty or passion`.
- Suppress list: `rules over desire`; `analysis before every action`; `power calculation without feeling`; `chaos without emotional truth`.
- Guardrail: `Do not place Red for chaos, anger, or haste alone; require freedom, emotion, action, or lived experience.`
- Lateral targets: `WR`, `UR`, `BR`, `RG`.
- Native IDs: `red`, `axis_emotion_to_action`, `axis_freedom_over_constraint`, `axis_consequence_shadow`, `red_disc_001`, `red_disc_002`, `red_disc_003`, `red_disc_004`, `red_vs_white`, `red_vs_blue`.
- Optional-field absences: top-level confidence, Red-local scoring, and Red-local golden path remain absent.
- Raw collision structure/order: object keys `rule`, `review_triggers`, `pairs`; pair order `W`, then `U`; IDs `red_vs_white`, `red_vs_blue`.
- Generated collision semantics/order: `W`, then `U`; IDs `red_vs_white`, `red_vs_blue`.
- Explicit `GENERIC_R_OVERFIT` collision target: absent.
- Preview source: `data/identity-layers.json#/expressions/R/preview_text`.
- Preview text: `Red turns feeling into action before life hardens into regret. Its freedom stays vivid, loyal, and answerable for the sparks it throws.`
- Embedded consumer: `data/factions.json#/identity_layers/expressions/R/preview_text`.
- Preview equality: true.
- Exact stale Red preview search: no active exact or Red-preview-fragment hits in changed active data, generated, recruiter, provenance, or fixture surfaces.
- Determinism: `npm.cmd run build:factions` was run after edits and again during validation; generated content remained in the expected Red implementation scope.

## 17. Candidate-Stage Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Source authority corrected | PASS | Philosophy sources support claims 0002-0006; mechanics/governance support claim 0007 only in mechanic/process scope; rules/project/Scryfall are support-only. |
| Claim roles complete | PASS | 6 substantive, 0 discovery, 2 support, 0 unclassified. |
| Evidence scopes complete | PASS | All substantive claims have bounded evidence locations with `evidence_scope`. |
| Non-authoritative records isolated | PASS | Support rows excluded from semantic proof chains except auxiliary Commander Compass support. |
| IDs and hashes valid | PASS | Required generated provenance rows have canonical IDs and content hashes; no required null rows remain. |
| Pointers and duplicates | PASS | 0 unresolved claim refs and 0 duplicate canonical keys. |
| Fixture/provenance parity | PASS | `/core_identity` and `/placement_summary` fixtures exactly match generated ordered IDs. |
| Frozen fields unchanged | PASS | Summary text, confidence absence, terms, threshold, penalty, lists, guardrail, lateral targets, native IDs, collision order, and optional absences preserved. |
| Collision controls preserved | PASS | Raw object-with-`pairs` and generated W/U semantics/order preserved. |
| Preview controls | PASS | Source-owned R preview changed under DRIFT-015; embedded consumer equal; stale exact Red preview absent; semantic alignment improved. |
| Unrelated identity changes | PASS | Implementation commit changed Red raw, Red fixture, generated Red consumers/provenance, and source-owned Red preview surfaces only. |
| Validation | PASS | Required command matrix passed; candidate-scope exited 1 only for documented display-source file diagnostics. |
| Table Talk excluded | PASS | Table Talk baseline remains unstaged/uncommitted. |
| VM-521 untouched | PASS | No VM-521 work started. |

No required candidate-stage control is FAIL or UNKNOWN.

## 18. Validation Run After Remediation

| Command | Exit | Result / important output |
|---|---:|---|
| `node -e "JSON.parse(...red.semantic-fixtures.json...)"` | 0 | Red fixture JSON parse OK. |
| `node research/validate-semantic-readiness.mjs --targets=R` | 0 | Semantic readiness validation passed for R. |
| custom read-only Red controls over raw/generated/fixture/preview/frozen fields | 0 | Role counts 6/0/2/0; support isolation none; mechanics/governance unexpected rows none; null rows none; unresolved refs none; duplicate keys none; exact fixture parity true; frozen summary true; preview equality true; old exact Red preview hits none. |
| `npm.cmd run build:factions` | 0 | Built 37 faction placement records; wrote generated placement, schema, recruiter context, and provenance. |
| `node research/audit-semantic-readiness.mjs --targets=R` | 0 | 8 claims; 6 substantive, 0 discovery, 2 support, 0 unclassified; 7 sources; 20 reference sites; recruiter context size 7451. |
| `node research/validate-semantic-readiness.mjs --targets=R` | 0 | Semantic readiness validation passed for R. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Semantic candidate scope tests passed. |
| `npm.cmd run test:semantic-readiness` | 0 | Semantic readiness contract tests passed; candidate-scope tests passed; contract fixtures passed; 1839 semantic provenance entries verified. |
| `npm.cmd run test:placement` | 0 | PASS adaptive placement tests: 37 factions, 37 golden paths. |
| `npm.cmd run test:faction-context-isolation` | 0 | Faction context isolation helper tests passed. |
| `npm.cmd run test:source-generated` | 0 | Source/generated guardrail validation passed for JESKAI and MARDU with two known unrelated model-owned inhibitor warnings. |
| `npm.cmd test` | 0 | Full suite passed; 226 parser cases, 6 builder cases, semantic readiness, Maze contracts, and presentation snapshots passed. |
| `git diff --check` | 0 | No whitespace errors; line-ending warnings only. |
| `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870 --identity=R` | 1 | Documented DRIFT-015 exception: `data/identity-layers.json` and global `data/factions.json` changed due source-owned R preview and embedded generated consumer. No validator crash and no third diagnostic. |

Environmental notes: Git reported line-ending warnings for touched files. `npm.cmd test` rewrote live gate-bias reports with no content diff. `test:source-generated` warnings were unchanged/unrelated JESKAI and MARDU model-owned inhibitor notes.

## 19. Candidate

Superseded candidates: none.

Final candidate SHA: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`

Candidate subject: `VM-520 remediate Red semantic readiness candidate`

Candidate files:

- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/red/red.claims.json`
- `data/raw-factions/red/red.placement.json`
- `data/raw-factions/red/red.profile.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Candidate-scope result: acceptable pending independent review, with documented DRIFT-015 display-source exception limited to the source-owned Red preview and embedded generated preview consumer. The validator reports the exception at file level as `data/identity-layers.json` and `data/factions.json`; inspection confirms the global `data/factions.json` change outside `factions.R` is the embedded R preview consumer.

Status: exact candidate received `REQUEST CHANGES`. It is not approved, not certified, and not `semantically_ready`.

## 20. Final State Before Workflow Record Commit

- Branch: `codex/vm-520-red-semantic-recovery`.
- Program base: `1116786785dc4c5c8c1447dcad79c89e527657eb`.
- Candidate and workflow-record commits are separate.
- Independent review occurred in `docs/incidents/recoveries/VM-520-red-independent-review.md`.
- Review decision: `REQUEST CHANGES`.
- Certification did not occur.
- Red is not `semantically_ready`.
- Certified count remains 18.
- Wave 3 monocolors remain 3 of 5 certified.
- VM-521 did not start.
- Original main was not modified.
- Excel was not modified.
- Table Talk baseline remains excluded.

## 21. Independent Review

Independent review target: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`

Review record: `docs/incidents/recoveries/VM-520-red-independent-review.md`

Decision: `REQUEST CHANGES`

Blocking finding:

- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`, `data/raw-factions/red/red.placement.json#/collision_guidance`, generated `data/placement-model.json#/factions/R/collision_guidance`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT.R` do not provide Red-local testable boundaries for prompt-required Red-adjacent neighbors `JESKAI`, `JUND`, and `NAYA`.

Controls that remained passing in review:

- Contract v1.1 claim roles, evidence scopes, and support isolation.
- Source authority and non-philosophical source isolation.
- R provenance count 25 with no required null IDs, null hashes, unresolved pointers, duplicate canonical entries, duplicate null keys, support/discovery-backed authoritative chains, or non-philosophical-source-backed broad identity proof.
- Exact fixture/provenance parity for `/core_identity` and `/placement_summary`.
- Frozen placement, native ID, collision-order, optional-field, and calibration controls.
- DRIFT-015 preview source-to-embedded equality and semantic alignment.
- Deterministic generation and validation suite.

Required remediation:

- Create a later replacement Red candidate that adds source-bounded, Red-local neighbor discrimination for `JESKAI`, `JUND`, and `NAYA` without changing frozen placement/scoring/calibration fields or regressing the Contract, provenance, fixture, preview, public, and recruiter surfaces that already passed.

No approval, certification, `semantically_ready` transition, program-base advancement, VM-521 work, original-main modification, Excel update, or Table Talk commit occurred.

## 22. Replacement Candidate For Required Neighbor Boundaries

Replacement candidate SHA: `6aefb2090ff20a361f7f3cd80515445036323158`

Rejected candidate preserved: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`

Replacement candidate subject: `VM-520 add required Red neighbor boundaries candidate`

Blocking finding remediated:

- The rejected candidate lacked prompt-required Red-local boundaries for `JESKAI`, `JUND`, and `NAYA`.

Replacement implementation files:

- `data/raw-factions/red/red.placement.json`
- `data/placement-model.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

What changed:

- Added Red-local collision review triggers for Jeskai technique/discipline/principle overlap, Jund survival/appetite/strength overlap, and Naya communal vitality/nature/creature-reverence overlap without adding raw collision pairs or changing W/U pair order.
- Added Red placement poor-fit and inhibitor guidance that flows into the generated recruiter context.
- Added Red semantic fixtures `red_exclude_jeskai`, `red_exclude_jund`, and `red_exclude_naya`, each backed by substantive Red claims `red_claim_0003`, `red_claim_0005`, and `red_claim_0006` and sources `MONO-R-2015` and `MONO-R-2025`.
- Rebuilt generated placement and recruiter context with `npm.cmd run build:factions`.

Preserved controls:

- Claim counts remain 8 total, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- R provenance remains 25 entries; `data/semantic-readiness-provenance.json` has no diff.
- Exact fixture/provenance chains for `/core_identity` and `/placement_summary` remain unchanged.
- Placement summary text, top-level confidence absence, required terms, minimum hits, broad penalty, strengthen/suppress lists, false-positive guardrail, lateral targets `WR`, `UR`, `BR`, `RG`, raw collision pair order `W`, `U`, generated collision order `W`, `U`, explicit `GENERIC_R_OVERFIT` absence, Red-local scoring/golden-path absence, and native IDs are preserved.
- Preview source and embedded consumer remain equal at `Red turns feeling into action before life hardens into regret. Its freedom stays vivid, loyal, and answerable for the sparks it throws.`
- Table Talk baseline remains excluded.
- VM-521 remains not started.

Validation:

| Command | Exit | Result |
|---|---:|---|
| `node research/validate-semantic-readiness.mjs --targets=R` | 0 | Semantic readiness validation passed for R. |
| `node research/audit-semantic-readiness.mjs --targets=R` | 0 | 8 claims; 6 substantive, 0 discovery, 2 support, 0 unclassified; recruiter context size 8103. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Semantic candidate scope tests passed. |
| custom Red invariant script | 0 | R provenance 25; required neighbors present; fixture chains exact; preview equal; W/U pairs and lateral targets preserved. |
| `npm.cmd run test:semantic-readiness` | 0 | Semantic readiness, candidate-scope, fixture, and provenance checks passed; 1839 semantic provenance entries verified. |
| `npm.cmd run test:placement` | 0 | PASS adaptive placement tests: 37 factions, 37 golden paths. |
| `npm.cmd run test:faction-context-isolation` | 0 | Faction context isolation helper tests passed. |
| `npm.cmd run test:source-generated` | 0 | Source/generated guardrail validation passed for JESKAI and MARDU with unchanged unrelated model-owned inhibitor warnings. |
| `npm.cmd test` | 0 | Full suite passed; 226 parser cases, 6 builder cases, semantic readiness, Maze contracts, and presentation snapshots passed. |
| `git diff --check` | 0 | No whitespace errors; line-ending warnings only. |
| `npm.cmd run build:factions` | 0 | Repeat build completed with expected scoped diff. |
| `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R` | 1 | Accepted pending independent review only for documented DRIFT-015 display-source diagnostics at `data/identity-layers.json` and global `data/factions.json`; no third diagnostic. |

Status:

- Replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158` received fresh independent review decision `APPROVE EXACT SHA 6aefb2090ff20a361f7f3cd80515445036323158`.
- Red is approved for exact replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`.
- Red is not certified.
- Red is not `semantically_ready`.
- Program base remains `1116786785dc4c5c8c1447dcad79c89e527657eb`.
- Certified count remains 18; Wave 3 remains 3 of 5.
- VM-521 has not started.
- Original main and external Excel were not modified.

## 23. Replacement Independent Review

Replacement independent review record: `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md`

Replacement independent review decision:

`APPROVE EXACT SHA 6aefb2090ff20a361f7f3cd80515445036323158`

Review verified:

- Replacement-only diff is limited to `data/raw-factions/red/red.placement.json`, `data/placement-model.json`, `research/fixtures/semantic-readiness/red.semantic-fixtures.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.
- Candidate-to-workflow diff is governance-only.
- The original `REQUEST CHANGES` blocker is remediated: Red-local `JESKAI`, `JUND`, and `NAYA` fixture/collision/recruiter boundaries now exist and are backed by substantive Red claims `red_claim_0003`, `red_claim_0005`, and `red_claim_0006` with sources `MONO-R-2015` and `MONO-R-2025`.
- Final role counts remain 8 total, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- R provenance remains 25 entries with no required null canonical IDs, null hashes, unresolved pointers, duplicate canonical entries, duplicate null keys, or support/discovery-backed authoritative chains.
- Exact fixture/provenance parity remains true for `/core_identity` and `/placement_summary`.
- Frozen placement fields, confidence absence, terms, threshold, broad penalty, strengthen/suppress lists, guardrail, lateral targets, W/U collision order, explicit `GENERIC_R_OVERFIT` absence, native IDs, and Red-local scoring/golden-path absence are preserved from the rejected candidate.
- Preview source and embedded consumer remain equal and unchanged.
- Exact candidate-scope exits 1 only for the already documented R display-source exception inherited from the Gate 1+2-to-candidate range; manual inspection limits it to `data/identity-layers.json#/expressions/R/preview_text` and `data/factions.json#/identity_layers/expressions/R/preview_text`.
- Required validation passed, including two deterministic `npm.cmd run build:factions` runs, Red audit/validator, semantic-candidate-scope tests, semantic-readiness, placement, recruiter isolation, source-generated, full `npm.cmd test`, and `git diff --check` with only known line-ending warnings.

No blocker, high, medium, or low findings remain.

Certification did not occur. Red is not `semantically_ready`. Program base remains `1116786785dc4c5c8c1447dcad79c89e527657eb`; certified count remains 18; Wave 3 remains 3 of 5; VM-521 has not started.

## 24. Certification - 2026-07-18

Decision: `CERTIFIED SEMANTICALLY_READY`

Exact approved replacement candidate certified: `6aefb2090ff20a361f7f3cd80515445036323158`

Rejected candidate preserved and unapproved: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`

Replacement approval review: `20f18e0a0a02728f3474c9e8d2b32e36525cbfe9`

Certification commit placeholder: `PENDING_VM520_CERTIFICATION_COMMIT_SHA`

Certification reconciliation:

- Final claim roles remain 8 total, 6 substantive (`red_claim_0002` through `red_claim_0007`), 0 discovery, 2 support (`red_claim_0001`, `red_claim_0008`), 0 unclassified.
- Source hierarchy remains bounded: `MONO-R-2015` and `MONO-R-2025` are the philosophy proof sources; `MECH-CP-2021` and `GOV-COC-2024` remain bounded to mechanics/process; `RULES-CR`, `VM-377`, and `SCRYFALL-R-2026-06-13` remain support-only or auxiliary.
- R provenance remains 25 entries with no null canonical IDs, null canonical content hashes, unresolved pointers, duplicate canonical entries, support-backed authoritative chains, discovery-backed authoritative chains, or non-philosophical-source-backed broad identity proof.
- Exact-chain fixtures remain equal to generated provenance: `/core_identity` 5/5 exact with `red_claim_0002` through `red_claim_0006`; `/placement_summary` 6/6 exact with `red_claim_0002` through `red_claim_0007`.
- Required `JESKAI`, `JUND`, and `NAYA` coverage is verified across raw Red placement, generated Red placement, Red semantic fixtures, and Red recruiter context. Each fixture is backed by substantive Red claims `red_claim_0003`, `red_claim_0005`, and `red_claim_0006` with sources `MONO-R-2015` and `MONO-R-2025`; no support-only claim serves as philosophical proof.
- Preview remains exactly `Red turns feeling into action before life hardens into regret. Its freedom stays vivid, loyal, and answerable for the sparks it throws.` Source and embedded consumer are equal at `data/identity-layers.json#/expressions/R/preview_text` and `data/factions.json#/identity_layers/expressions/R/preview_text`.
- Frozen placement controls remain preserved: placement-summary text, top-level confidence absence, required terms, minimum hits 2, broad penalty 0.13, strengthen/suppress lists, false-positive guardrail, lateral targets `WR`, `UR`, `BR`, `RG`, W/U collision order, explicit `GENERIC_R_OVERFIT` absence, optional-field absences, native IDs, calibration, and Red-local scoring/golden-path absence.
- Raw `collision_guidance` remains object-with-`pairs`; generated collision guidance remains array-shaped with W then U semantics. `JESKAI`, `JUND`, and `NAYA` were not added as frozen collision targets.
- Candidate-scope certification result is `PASS - approved documented R display-source exception`; exact command exited 1 only for file-level diagnostics `data/identity-layers.json` and `data/factions.json`, manually limited to `data/identity-layers.json#/expressions/R/preview_text` and `data/factions.json#/identity_layers/expressions/R/preview_text`.

Certification guard commands:

| Command | Exit | Result |
|---|---:|---|
| Governance and Red candidate JSON parse checks | 0 | Parsed CRIT ledger and approved Red candidate JSON files. |
| Red reconciliation script | 0 | Verified claim roles, source hierarchy, evidence scopes, R provenance count 25, exact fixture chains, frozen fields, preview equality, and `JESKAI`/`JUND`/`NAYA` coverage. |
| `node research/audit-semantic-readiness.mjs --targets=R` | 0 | 8 claims; 6 substantive, 0 discovery, 2 support, 0 unclassified; 7 sources; recruiter context size 8103. |
| `node research/validate-semantic-readiness.mjs --targets=R` | 0 | Semantic readiness validation passed for R. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Semantic candidate scope tests passed. |
| `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R` | 1 | PASS - approved documented R display-source exception; no validator crash, no third diagnostic, no new Red/Jeskai/Jund/Naya, frozen-field, target, optional-field, runtime, scoring, or unrelated-identity diagnostic. |
| `npm.cmd run build:factions` | 0 | Built 37 faction placement records and left no content diff; line-ending warnings only on generated files during diff inspection. |
| `npm.cmd run test:semantic-readiness` | 0 | Semantic readiness, candidate-scope, fixture, and provenance checks passed; 1839 semantic provenance entries verified. |
| `npm.cmd run test:placement` | 0 | PASS adaptive placement tests: 37 factions, 37 golden paths. |
| `npm.cmd run test:faction-context-isolation` | 0 | Faction context isolation helper tests passed. |
| `npm.cmd run test:source-generated` | 0 | Source/generated guardrail validation passed with known unrelated JESKAI/MARDU model-owned inhibitor warnings only; no R warning. |
| `npm.cmd test` | 0 | Full suite passed; parser, builder, semantic readiness, Maze contract, and presentation snapshot tests passed. |
| `git diff --check` | 0 | No whitespace errors; known line-ending warning only for dirty `docs/handoffs/HANDOFF_INDEX.md`. |

Program status after certification:

- Red is `semantically_ready`.
- Certified count is 19.
- Wave 3 monocolors are 4 of 5 certified.
- Current program base is `PENDING_VM520_CERTIFICATION_COMMIT_SHA` inside tracked governance; actual SHA is reported in final task output.
- VM-521 Green / G is setup-only with drift preflight pending; no Green semantic inspection, drift preflight, Gate 1+2, remediation, candidate, review, or certification occurred.
- Original main and external Excel were not modified.

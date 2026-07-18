# VM-520 Red Semantic Recovery

Status: Gate 1+2 complete. Remediation authorized.

Identity: Red / R
Contract: CRIT-001 semantic-readiness Contract v1.1
Program base: `1116786785dc4c5c8c1447dcad79c89e527657eb`
Red drift preflight/current starting HEAD: `94a33b70fdac83b350195a3eed7f34118f999e31`
Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Approved validator review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Gate 1+2 governance commit: `PENDING_VM520_GATE_1_2_SHA`

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

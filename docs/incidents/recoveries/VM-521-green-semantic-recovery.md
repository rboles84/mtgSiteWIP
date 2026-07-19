# VM-521 Green Semantic Recovery

Status: Done - Certified Semantically Ready.

Identity: Green / G
Contract: CRIT-001 semantic-readiness Contract v1.1
Program base before certification: `9f0a076a369cba23dc9bc19231b0efcddd21afe5`
Certification/program base placeholder: `PENDING_VM521_CERTIFICATION_COMMIT_SHA`
Green drift-preflight/current starting HEAD: `76fd0eb8bf702bf889857537c636b3404c4bdba4`
Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Approved validator review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Gate 1+2 governance commit: `PENDING_VM521_GATE_1_2_SHA`

This record is the read-only Gate 1+2 semantic and evidence audit for Green. No Green raw semantic data, generated consumers, provenance, recruiter context, fixtures, tests, validators, builders, schemas, runtime, scoring, calibration, VM-522 files, original-main files, Excel tracker, or Table Talk files were modified by this gate.

## 1. Preflight Reverification

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | Active worktree is `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `codex/vm-521-green-semantic-recovery`. |
| Starting HEAD | PASS | `76fd0eb8bf702bf889857537c636b3404c4bdba4`. |
| Program base | PASS | `9f0a076a369cba23dc9bc19231b0efcddd21afe5` exists and is an ancestor of HEAD; it remains the certification/program base. |
| Approved validator | PASS | Diff to `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` is empty for `research/validate-semantic-candidate-scope.mjs` and `research/semantic-candidate-scope-tests.js`; no later validator commits are present. |
| Validator regression | PASS | `node research/semantic-candidate-scope-tests.js` passed. |
| Green drift preflight | PASS | `docs/incidents/recoveries/VM-521-green-drift-preflight.md` records `PASS - GREEN GATE 1+2 AUTHORIZED`. |
| Certified count | PASS | Board and ledger record 19 certified identities. |
| Wave 3 status | PASS | Wave 3 monocolors remain 4 of 5 certified. |
| Gate 1+2 not previously complete | PASS | VM-521 card, board, ledger, and handoff trail recorded Gate 1+2 authorized but not started before this audit. |
| Green implementation cleanliness | PASS | Pre-audit worktree dirt contained only the allowed Table Talk baseline in this worktree. |
| Table Talk exclusion | PASS | Preserved and excluded: modified `docs/handoffs/HANDOFF_INDEX.md`; untracked Table Talk handoffs `2026-07-16-2119...` and `2026-07-16-2128...`. |
| Original main allowance | PASS | Read-only `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` showed docs/workflow dirt plus Git config permission warnings; no raw, generated, semantic, fixture, provenance, data, test, schema, validator, builder, scoring, calibration, or runtime changes were observed. |
| VM-522 untouched | PASS | VM-522 remains not started. |

## 2. Source Authority

| Source ID | Stored role | Gate 1+2 role decision | Permitted use |
|---|---|---|---|
| `MONO-G-2015` | `philosophy_backbone` | Valid claim-bearing official philosophy source. | May support substantive Green identity claims when bounded to local digest/PDF anchors `G2015-*`. |
| `MONO-G-2025` | `current_voice_update` | Valid claim-bearing current voice source with first-person/rhetorical caveat. | May support substantive Green identity claims when bounded to anchors `G2025-*`; do not over-read voice as universal moral truth, total stasis, or nature as automatically correct. |
| `MECH-CP-2021` | `mechanical_authority` | Valid claim-bearing mechanical color-pie snapshot. | May support mechanic-specific texture only; cannot independently prove Green philosophy, placement identity, public copy, or recruiter guidance. |
| `MECH-CP-2021-CHG` | `mechanical_change_log` | Valid mechanics-process/change source. | May support dated mechanic-specific change context only; cannot independently prove philosophy, placement identity, or public copy. |
| `RULES-CR` | `commander_rules_boundary` | Rules-boundary support source. | Support-only for Commander eligibility and color-identity boundaries; not philosophical proof. |
| `VM-377` | `project_governance` | Project governance support with stale stored locator. | Support-only for Vox Mana source-intake and packet boundary; not color philosophy or placement proof. Stored path `docs/kanban/in-progress/VM-377...` is stale; current repository locator is `docs/kanban/done/VM-377-mono-gold-source-intake-planning.md`. |
| `SCRYFALL-G-2026-06-13` | `current_card_legality_verification` | Current-card support verification. | Support-only for the three Commander Compass rows; not philosophy, popularity, deck quality, public copy, or placement proof. |

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
| `green_claim_0001` | `source_authority_boundary` | `support_record` | Vox Mana governance/source-intake boundary only. Retain as metadata/history; remove from authoritative profile, placement, public, recruiter, fixture, and provenance proof chains. |
| `green_claim_0002` | `philosophy_goal` | `substantive_claim` | Supported by `MONO-G-2015` anchors `G2015-Q1`, `G2015-Q1b` and `MONO-G-2025` anchors `G2025-a`, `G2025-b`. Must avoid turning acceptance, destiny, or natural order into universal moral correctness or fatalism. |
| `green_claim_0003` | `philosophy_means` | `substantive_claim` | Supported by `MONO-G-2015` anchor `G2015-Q2` and `MONO-G-2025` anchors `G2025-c`, `G2025-d`. Must distinguish source-backed nature/interdependence/slow evolution from mechanics-only creatures, lands, ramp, and growth. |
| `green_claim_0004` | `cares_and_threats` | `substantive_claim` | Supported by `MONO-G-2015` anchors `G2015-Q3`, `G2015-Q4` and `MONO-G-2025` anchor `G2025-c`. Must narrow "despises unnatural change" so Green is not presented as opposed to every change, tool, city, plan, or adaptation. |
| `green_claim_0005` | `relationships` | `substantive_claim` | Supported by `MONO-G-2015` anchors `G2015-Q5`, `G2015-Q5b` and `MONO-G-2025` anchors `G2025-e`, `G2025-f`, `G2025-g`, `G2025-h`. Used for mono and required-neighbor boundaries, especially U, B, W, R and green-adjacent guild/college/shard/wedge neighbors. |
| `green_claim_0006` | `strength_weakness` | `substantive_claim` | Supported by `MONO-G-2015` anchor `G2015-Q6` and `MONO-G-2025` anchor `G2025-i`. Must preserve certainty, interconnection, primal strength, and over-reliance without defining Green as creatures, mana, hierarchy, or survival alone. |
| `green_claim_0007` | `mechanical_texture` | `substantive_claim` | Supported by `MECH-CP-2021` anchors `MECH-removal`, `MECH-carddraw`, `MECH-antiflying` and `MECH-CP-2021-CHG` anchors `CHG-carddraw`, `CHG-cardfilter`, `CHG-counter-ability`. Mechanic-specific only; cannot define Green by ramp, lands, creatures, counters, trample, fight, tokens, forests, or creature size alone. |
| `green_claim_0008` | `commander_boundary` | `support_record` | Rules/project/Scryfall support for Commander Compass/navigation only. Retain as auxiliary support metadata; remove from placement/profile/provenance chains that prove semantic identity. |

Expected post-remediation role count if Gate 3+4 follows this disposition: 6 substantive, 0 discovery, 2 support, 0 unclassified.

## 4. Evidence Scope Findings

Every future substantive Green claim requires bounded `evidence_locations` with Contract v1.1 `evidence_scope`:

- `green_claim_0002`: `docs/research/mono_upgrade/14_green.md#G2015-Q1;G2015-Q1b` and `#G2025-a;G2025-b`; scope should be canonical identity, acceptance, role, and web-of-life goal.
- `green_claim_0003`: `docs/research/mono_upgrade/14_green.md#G2015-Q2` and `#G2025-c;G2025-d`; scope should be means and natural-system method, including slow purposeful evolution.
- `green_claim_0004`: `docs/research/mono_upgrade/14_green.md#G2015-Q3;G2015-Q4` and `#G2025-c`; scope should be cares/threats and anti-unnatural-change boundary.
- `green_claim_0005`: `docs/research/mono_upgrade/14_green.md#G2015-Q5;G2015-Q5b` and `#G2025-e;G2025-f;G2025-g;G2025-h`; scope should be required-neighbor boundary.
- `green_claim_0006`: `docs/research/mono_upgrade/14_green.md#G2015-Q6` and `#G2025-i`; scope should be strength, certainty, and over-reliance pressure.
- `green_claim_0007`: `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md#MECH-removal;MECH-carddraw;MECH-antiflying` and `docs/research/mono_upgrade/21_mechanical_color_pie_2021_changes.md#CHG-carddraw;CHG-cardfilter;CHG-counter-ability`; scope should be mechanic-specific texture.

Support records may retain existing evidence rows and native IDs as metadata, but they must not prove profile identity, placement identity, public copy, recruiter guidance, semantic readiness, fixtures, or canonical provenance chains.

## 5. Consumed Surface Findings

Current consumed surfaces are not semantically ready:

- `data/raw-factions/green/green.profile.json#/core_identity` and `#/profile` use all eight claims, including governance and Commander support rows.
- `data/raw-factions/green/green.profile.json#/mechanics` uses `green_claim_0007` but lacks a stable native canonical ID.
- `data/raw-factions/green/green.profile.json#/site_surface` lacks a stable native canonical ID and explicit claim chain.
- `data/raw-factions/green/green.placement.json#/placement_summary` is a string and lacks stable canonical ID/claim chain by current monocolor provenance precedent.
- `data/raw-factions/green/green.placement.json#/discriminator_questions/1` mixes mechanical claim `green_claim_0007` into generic growth boundary guidance; Gate 3+4 must keep mechanics source-bound and remove mechanics from authoritative philosophical placement proof where not eligible.
- `data/raw-factions/green/green.placement.json#/discriminator_questions/3` mixes mechanic texture and support-only Commander verification; Gate 3+4 must remove support-only Commander proof from semantic placement guidance.
- `data/raw-factions/green/green.placement.json#/chatbot_guidance/how_to_recognize_mismatch/0..4` lacks explicit evidence mapping.
- `data/semantic-readiness-provenance.json` has 12 G entries. Current generated truth has 3 required null canonical IDs (`/core_identity`, `/mechanics`, `/profile`), 0 null content hashes, 0 unresolved pointers, 0 duplicate canonical entries, and 0 duplicate null canonical-entry keys.
- The Green semantic fixture file `research/fixtures/semantic-readiness/green.semantic-fixtures.json` is absent.
- `data/identity-layers.json#/expressions/G/preview_text` and embedded `data/factions.json#/identity_layers/expressions/G/preview_text` are equal and read: `Green values nature, instinct, tradition, interdependence, and belonging. It asks what you already are beneath the noise.`

Gate 3+4 must change the preview unless source-supported proof shows the current line remains semantically aligned after remediation. The current preview is a DRIFT-015/017 risk because it leans on generic nature, instinct, tradition, interdependence, belonging, and self-discovery while omitting Green's source-backed acceptance/role/web-of-life/slow-evolution/over-reliance boundaries. Any preview change must follow DRIFT-015 source ownership, source-to-consumer equality, exact stale-copy search, semantic-equivalent stale-copy review, and candidate-scope controls.

## 6. Exact-Chain Baseline

Current generated/provenance chains:

| Canonical locator | Canonical ID | Ordered claim IDs | Count | Unique | Duplicate IDs | Fixture state |
|---|---|---|---:|---:|---|---|
| `data/raw-factions/green/green.profile.json#/core_identity` | null | `green_claim_0001`, `green_claim_0002`, `green_claim_0003`, `green_claim_0004`, `green_claim_0005`, `green_claim_0006`, `green_claim_0007`, `green_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/green/green.profile.json#/mechanics` | null | `green_claim_0007` | 1 | 1 | none | absent |
| `data/raw-factions/green/green.profile.json#/profile` | null | `green_claim_0001`, `green_claim_0002`, `green_claim_0003`, `green_claim_0004`, `green_claim_0005`, `green_claim_0006`, `green_claim_0007`, `green_claim_0008` | 8 | 8 | none | absent |
| `data/raw-factions/green/green.placement.json#/placement_axes/0` | `axis_natural_belonging` | `green_claim_0002`, `green_claim_0003` | 2 | 2 | none | absent |
| `data/raw-factions/green/green.placement.json#/placement_axes/1` | `axis_instinct_over_artifice` | `green_claim_0004`, `green_claim_0005` | 2 | 2 | none | absent |
| `data/raw-factions/green/green.placement.json#/placement_axes/2` | `axis_overreliance_shadow` | `green_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/0` | `green_disc_001` | `green_claim_0002`, `green_claim_0003`, `green_claim_0005` | 3 | 3 | none | absent |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/1` | `green_disc_002` | `green_claim_0003`, `green_claim_0004`, `green_claim_0007` | 3 | 3 | none | absent |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/2` | `green_disc_003` | `green_claim_0006` | 1 | 1 | none | absent |
| `data/raw-factions/green/green.placement.json#/discriminator_questions/3` | `green_disc_004` | `green_claim_0007`, `green_claim_0008` | 2 | 2 | none | absent |
| `data/raw-factions/green/green.placement.json#/collision_guidance/pairs/0` | `green_vs_blue` | `green_claim_0005` | 1 | 1 | none | absent |
| `data/raw-factions/green/green.placement.json#/collision_guidance/pairs/1` | `green_vs_black` | `green_claim_0005` | 1 | 1 | none | absent |

Gate 3+4 must create fixtures from generated canonical truth after remediation. At minimum, the fixture must include core inclusion, mature/pressure behavior, nearest-collision ambiguity, required-neighbor exclusions, and provenance fixtures for `/core_identity` and `/placement_summary`.

## 7. Frozen Field Baseline

Candidate-scope-sensitive fields verified unchanged from the drift preflight:

- Placement summary text: `Green is a strong fit when a user wants nature, instinct, belonging, growth, tradition, interdependence, and acceptance of an innate role in a larger living system.`
- Top-level placement confidence: absent.
- Discriminator confidences: `green_disc_001: High`, `green_disc_002: High`, `green_disc_003: Medium`, `green_disc_004: High`.
- Required positive evidence terms: `nature`, `acceptance`, `instinct`, `growth`, `interdependence`, `role`, `tradition`, `land`.
- Required positive minimum hits: 2.
- Broad match penalty: 0.13.
- Strengthen list: `discovered role`; `web of life`; `creatures and lands`; `slow purposeful evolution`; `wisdom of nature or ancestry`.
- Suppress list: `blank-slate optimization`; `self-interest over responsibility`; `rules imposed over relationship`; `generic healing or growth without nature`.
- False-positive guardrail: `Do not place Green for life, healing, or growth alone; require nature, role, instinct, interdependence, or natural-system trust.`
- Lateral targets: `WG`, `UG`, `BG`, `RG`.
- Raw collision shape: object with keys `rule`, `review_triggers`, `pairs`.
- Collision targets and order: `U`, then `B`.
- Explicit `GENERIC_G_OVERFIT` collision target: absent.
- Native IDs: `green`, `axis_natural_belonging`, `axis_instinct_over_artifice`, `axis_overreliance_shadow`, `green_disc_001`, `green_disc_002`, `green_disc_003`, `green_disc_004`, `green_vs_blue`, `green_vs_black`.
- Preview source and embedded consumer: equal at Gate 1+2, but semantically risky.
- Green-local scoring/golden-path fields: absent.

Gate 3+4 must preserve these fields unless candidate-scope explicitly permits a documented, target-scoped exception. The object-with-`pairs` collision-guidance structure must not be converted to a guild-style array.

## 8. Required Neighbor Boundaries

Gate 3+4 must provide testable Green fixture/collision/recruiter guidance for:

- `GENERIC_G_OVERFIT`: Green requires source-backed acceptance, innate role, web-of-life responsibility, and slow purposeful evolution, not generic nature, growth, life, harmony, instinct, belonging, authenticity, destiny, or "nature knows best."
- `W`: Green natural relation and unique role are not mono-White law, equality, uniform treatment, morality, imposed order, or group peace.
- `U`: Green discovered role and origins are not mono-Blue blank-slate self-authorship, proof, tools, optimization, or future redesign.
- `B`: Green responsibility within the web is not mono-Black self-interest, opportunity, free-will assertion against limits, or power for the self.
- `R`: Green instinct and wildness are not mono-Red impulse, immediate emotion, carefree action, or moment-first freedom.
- `WG` / Selesnya: Green belonging/interdependence are not ordered community, unity, spiritual harmony, shared purpose, collective obligation, or institutionally organized flourishing.
- `BG` / Golgari: Green life/death and growth are not decay economy, underclass endurance, graveyard resource logic, rot, hunger, or material reuse.
- `UG` / Simic: Green adaptation and evolution are not directed improvement, experimentation, engineered evolution, optimization, or deliberate redesign.
- `RG` / Gruul: Green instinct and wildness are not anti-civilization, destruction, embodied freedom, rage, terrain anger, or revolt against imposed order.
- `WITHERBLOOM`: Green life/growth are not vitality exchange, decay study, harvesting, potions, pest biology, or biological resource conversion.
- `QUANDRIX`: Green pattern and natural scale are not mathematical proof, formal systems, pattern theory, abstraction, or nature-as-equation.
- `BANT`: Green living community is not hierarchical protection, ordered flourishing, public duty, moralized community, or structured natural harmony.
- `JUND`: Green strength and nature are not predation, appetite, dominance, survival hierarchy, or strength as immediate legitimacy.
- `NAYA`: Green creature/nature reverence is not communal vitality, creature grandeur, joy, shared embodied life, or Red/White bond-care.
- `TEMUR`: Green instinct and adaptation are not wilderness knowledge joined to Blue/Red methods, clan tradition, terrain survival, or ancestral survival systems.
- `SULTAI`: Green inevitability/growth/death are not exploitation, graveyard leverage, ambition, controlled growth, or resource inevitability.
- `ABZAN`: Green ancestry/tradition are not family obligation, inheritance, endurance, social tradition, or durable institutions.
- `WUBRG` and `COLORLESS`: Green mechanics, lands, creatures, and Commander support are not all-color deck breadth, Commander color-identity coverage, or colorless/artifact engine identity.

These boundaries must be represented in allowed semantic or fixture structures without adding a frozen explicit `GENERIC_G_OVERFIT` raw/generated collision target.

## 9. Semantic Risks

Gate 1+2 found the current packet vulnerable to:

- Generic Green overfit: nature, life, growth, instinct, strength, harmony, balance, acceptance, belonging, tradition, community, interdependence, adaptation, evolution, authenticity, destiny, purpose, patience, endurance, simplicity, wisdom, ancestry, ecology, cycles, inevitability, or natural order without source-bounded role/web/responsibility logic.
- Slogan overfit: "be yourself," "accept your nature," "everything has a place," "might makes right," or "nature knows best" as universal doctrine.
- Moral overfit: Green as inherently good, peaceful, passive, morally correct, or nature as automatically right.
- Vice overfit: Green as inherently primitive, anti-intellectual, anti-technology, anti-civilization, conservative, fatalistic, collectivist, or incapable of learning/adaptation.
- Mechanics overfit: creatures, lands, ramp, mana, counters, trample, fight, tokens, graveyard, recursion, enchantments, beasts, elves, druids, dinosaurs, hydras, forests, land count, creature size, or mechanical growth cannot independently define Green.
- Boundary loss: acceptance without adaptation, individual role without interdependence, interdependence without unique function, tradition without tension, strength without responsibility, or natural order without the risk of over-reliance.
- Neighbor collapse into Selesnya, Golgari, Simic, Gruul, Witherbloom, Quandrix, Bant, Jund, Naya, Temur, Sultai, Abzan, W/U/B/R, generic mono-color overfit, WUBRG, or COLORLESS.
- Support/provenance leakage from project governance, rules, Scryfall legality, Commander Compass, mechanics/changelog-only material, identity layers, and generated/runtime material.

## 10. Gate 1+2 Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-521-green-semantic-recovery`, HEAD `76fd0eb8bf702bf889857537c636b3404c4bdba4`. |
| Correct program base | PASS | `9f0a076a369cba23dc9bc19231b0efcddd21afe5` verified as ancestor. |
| Approved validator unchanged | PASS | Exact diff to approved validator candidate is empty. |
| Drift preflight permits Gate 1+2 | PASS | `PASS - GREEN GATE 1+2 AUTHORIZED`. |
| Source hierarchy explicit | PASS | Seven sources classified above. |
| Initial eight-unclassified state recorded | PASS | 8 unclassified, 0 substantive, 0 discovery, 0 support. |
| Evidence state recorded | PASS | Claim-level evidence locations absent; required scopes and locators identified. |
| ID/hash/pointer state recorded | PASS | 12 G provenance rows, 3 null canonical IDs, 0 null hashes, 0 unresolved pointers, no duplicate canonical/null-key entries. |
| Fixture/provenance locators recorded | PASS | Twelve current locators listed; fixture absent. |
| Exact-chain state recorded | PASS | Ordered arrays/counts/duplicates recorded. |
| Frozen fields verified | PASS | Placement, calibration, guardrail, targets, object-with-`pairs`, native IDs, optional-field absence, and preview equality verified. |
| Raw object-with-pairs verified | PASS | Object keys and U/B pair order preserved in current raw placement. |
| Generated collision semantics verified | PASS | Generated G placement flattens collision records in U then B order with the same collision IDs and against values. |
| Required neighbors audited | PASS | Required comparisons and discriminators recorded. |
| Preview ownership/equality/semantic risk recorded | PASS | Source `data/identity-layers.json#/expressions/G/preview_text`; embedded consumer equal; semantic generic-overfit risk requires Gate 3+4 disposition. |
| Public/search/export/inspect/recruiter surfaces inventoried | PASS | Raw/generated faction, placement, identity layers, provenance, recruiter context, JS matrix consumers, search/export/inspect outputs, and fixture absence inventoried from preflight and live extraction. |
| No semantic edit during Gate 1+2 | PASS | No Green implementation file was modified. |
| Table Talk excluded | PASS | Allowed baseline preserved and unstaged. |
| VM-522 untouched | PASS | No VM-522 semantic work started. |

No required Gate 1+2 control is FAIL or UNKNOWN.

## 11. Validation Baseline

Commands run during Gate 1+2:

| Command | Exit | Result |
|---|---:|---|
| `git status --short --branch` | 0 | Branch correct; only allowed Table Talk baseline dirty. |
| `git rev-parse HEAD` | 0 | Returned `76fd0eb8bf702bf889857537c636b3404c4bdba4`. |
| `git branch --show-current` | 0 | Returned `codex/vm-521-green-semantic-recovery`. |
| `git merge-base HEAD 9f0a076a369cba23dc9bc19231b0efcddd21afe5` | 0 | Returned program base SHA. |
| `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` | 0 | Approved validator files unchanged. |
| `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` | 0 | No later validator commits. |
| `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short` | 0 | Original main read-only status showed docs/workflow dirt plus Git config permission warnings; no disallowed data/runtime/test/schema changes observed. |
| `node research/audit-semantic-readiness.mjs --targets=G` | 0 | 8 claims, all unclassified; 7 sources; 12 reference sites; recruiter context size 8077. |
| `node research/validate-semantic-readiness.mjs --targets=G` | 1 | Expected pre-remediation failures: missing semantic roles, recruiter evidence mappings, substantive authoritative references, and Green fixture. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Semantic candidate scope tests passed. |
| Structured JSON extraction for G raw/generated/provenance/preview | 0 | Verified 12 provenance rows, 3 null canonical IDs, raw/generated U/B collision order, and preview equality. |

## 12. Decision

REMEDIATION AUTHORIZED

Rationale: Green has sufficient local official source evidence to remediate, but it is not Contract v1.1-ready because all claims lack semantic roles and bounded evidence locations, support/governance/rules/Scryfall rows enter canonical proof chains, G provenance has null canonical IDs, chatbot mismatch guidance lacks evidence mapping, VM-377 stores a stale repository locator, preview copy is semantically generic, mechanics/support material contaminates active proof chains, and the required Green semantic fixture is absent.

Gate 3+4 must preserve frozen fields, optional-field absences, native IDs, raw U/B collision object-with-`pairs` structure/order, generated U/B collision order, lateral targets, calibration, scoring/golden-path absences, and Table Talk exclusion while assigning roles, adding evidence scopes, isolating support records, repairing stable canonical IDs and stale locators, rebuilding generated artifacts, creating fixtures from generated truth, validating exact chain/candidate-scope behavior, and avoiding generic/nature/mechanics/neighbor overfit.

## 13. Gate 3+4 Remediation Record

Status: COMPLETE

Implementation commits:

- Superseded candidate: `83123037f619472a4d2834e124311df691281a53`
- Final candidate: `45e323cde853ee5058b71c819f080ab4025597ce`

What changed:

- Assigned Green semantic roles: `green_claim_0002` through `green_claim_0007` are `substantive_claim`; `green_claim_0001` and `green_claim_0008` are `support_record`.
- Added bounded evidence locations, evidence scopes, local digest anchors, and direct-source paraphrases for all substantive claims.
- Isolated governance, rules, Scryfall, and Commander support so they do not prove Green identity, placement, public copy, recruiter guidance, fixtures, or semantic provenance.
- Repaired the stale VM-377 source locator to `docs/kanban/done/VM-377-mono-gold-source-intake-planning.md`.
- Remediated Green profile, placement, support boundaries, mismatch evidence mappings, and generated artifacts.
- Added `research/fixtures/semantic-readiness/green.semantic-fixtures.json` with core, pressure, nearest-collision, required-neighbor, and provenance fixtures.
- Updated Green preview source and embedded generated consumer to: `Green accepts a role within the web of life and lets inherent nature unfold. Its growth is patient, purposeful, and wary of mistaking every change for wisdom.`

Frozen-field reconciliation:

- Placement summary text, confidence absence, required positive terms, minimum hits, broad match penalty, strengthen/suppress lists, false-positive guardrail, lateral targets, raw object-with-`pairs` collision shape, raw/generated U then B collision order, native IDs, scoring/golden-path absence, and calibration note are preserved.
- First candidate `83123037f619472a4d2834e124311df691281a53` is superseded because candidate-scope correctly flagged `data/raw-factions/green/green.placement.json#/chatbot_guidance/calibration_note` as a forbidden calibration-field change.
- Replacement candidate `45e323cde853ee5058b71c819f080ab4025597ce` restores the frozen calibration note and regenerates the affected consumers.

## 14. Gate 5 Candidate Record

Candidate SHA: `45e323cde853ee5058b71c819f080ab4025597ce`

Candidate parent chain:

- Gate 1+2 governance base: `332ab81ffcfa461df1109e89709d47907e7c0032`
- Superseded candidate: `83123037f619472a4d2834e124311df691281a53`
- Replacement candidate: `45e323cde853ee5058b71c819f080ab4025597ce`

Candidate scope result:

- `node research/validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=HEAD --identity=G` exited 1 with only the documented Green display-source exception:
  - `identity candidate modified non-identity path data/identity-layers.json`
  - `unrelated or global data/factions.json content changed`
- Manual reconciliation confirms the changed source path is `data/identity-layers.json#/expressions/G/preview_text` and the generated embedded consumer is `data/factions.json#/identity_layers/expressions/G/preview_text`; both contain the exact same remediated Green preview text above.

Gate 5 is candidate-created only. No independent review, approval, certification, semantically_ready status, program-base advancement, Excel update, original-main modification, VM-522 work, push, PR, or merge occurred.

## 15. Post-Candidate Validation

Commands run after final candidate creation:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run build:factions` | 0 | Built 37 placement records and regenerated placement model, provenance, and recruiter context. |
| Build idempotence file-hash check after rerun | 0 | `build idempotence ok`. |
| Green drift invariant script | 0 | Role counts, locators, support isolation, frozen calibration, collision order, fixtures, provenance, preview equality, and recruiter context passed. |
| `node research/audit-semantic-readiness.mjs --targets=G` | 0 | 8 claims; 6 substantive, 2 support, 0 unclassified; 20 reference sites; 0 missing references. |
| `node research/validate-semantic-readiness.mjs --targets=G` | 0 | Semantic readiness validation passed for G. |
| `npm.cmd run test:semantic-readiness` | 0 | Contract, candidate-scope unit tests, fixture validation, and provenance check passed. |
| `npm.cmd run test:placement` | 0 | 37 factions, 37 golden paths passed. |
| `npm.cmd run test:faction-context-isolation` | 0 | Faction context isolation helper tests passed. |
| `npm.cmd run test:source-generated` | 0 | Passed with existing JESKAI and MARDU model-owned inhibitor warnings. |
| `npm.cmd test` | 0 | Full project test suite passed; 226 parser cases and supporting suites passed. |
| `git diff --check` | 0 | No whitespace errors. |

## 16. Current Decision

REQUEST CHANGES - REPLACEMENT CANDIDATE REQUIRED

Green / G is not approved, not certified, and not semantically_ready. Exact candidate SHA `45e323cde853ee5058b71c819f080ab4025597ce` received independent review decision `REQUEST CHANGES`.

## 17. Independent Review Record

Review record: `docs/incidents/recoveries/VM-521-green-independent-review.md`
Review-record SHA: `PENDING_VM521_GREEN_REVIEW_RECORD_SHA`
Decision: `REQUEST CHANGES`

Approval blocker:

- Active consumed-surface preview copies still retain the stale Gate 1+2 text `Green values nature, instinct, tradition, interdependence, and belonging. It asks what you already are beneath the noise.` in:
  - `assets/js/newindex-color-matrix.js`
  - `assets/js/color-matrix-radar.js`
  - `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`
  - `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`

The review verified that the final candidate corrected the superseded calibration-note drift, preserved frozen fields, established 6 substantive and 2 support claims, produced 25 G provenance entries with no null IDs/hashes, and kept the two explicit provenance fixtures exact. Approval was blocked at the time by the then-current active-consumer classification. The review remains preserved and is not overwritten.

## 18. Fresh Provenance Re-Review Record

Re-review record: `docs/incidents/recoveries/VM-521-green-provenance-rereview.md`
Re-review-record SHA: `PENDING_VM521_GREEN_PROVENANCE_REREVIEW_SHA`
Decision: `APPROVE EXACT SHA 45e323cde853ee5058b71c819f080ab4025597ce`

The original rejection review at `2f776d8ac488a349db0975094b5948a9c3183674` remains preserved as a valid decision under the evidence available at that time. The later provenance/dependency audit `aa62ac329c53c00016dcce749b5fea73b145d4ac` independently established that the two top-level workbook inspect NDJSON files are `DEBUG_INSPECTION_ARTIFACT` and the two audited matrix JS files are `HISTORICAL_ARCHIVE`, with active runtime/build/test preview defect count 0 for those four files.

Fresh re-review reran Green Contract v1.1, provenance, fixture, frozen-field, calibration, neighbor, preview, active-consumer, candidate-scope, and validation controls. No blocker/high/medium/low findings remain. Green is approved for exact candidate `45e323cde853ee5058b71c819f080ab4025597ce` but is not certified, not `semantically_ready`, program base remains `9f0a076a369cba23dc9bc19231b0efcddd21afe5`, certified count remains 19, Wave 3 remains 4 of 5, VM-522 remains untouched, and Excel remains untouched.

## 19. Certification - 2026-07-19

- Decision: `CERTIFIED SEMANTICALLY_READY`.
- Exact approved Green candidate certified: `45e323cde853ee5058b71c819f080ab4025597ce`.
- Fresh approval review: `ec148486ff2442ff2e3145dd9d45a6d993179766`; decision `APPROVE EXACT SHA 45e323cde853ee5058b71c819f080ab4025597ce`.
- Original rejection review preserved: `2f776d8ac488a349db0975094b5948a9c3183674`; decision `REQUEST CHANGES` under then-current active-consumer evidence.
- Superseded candidate preserved and unapproved: `83123037f619472a4d2834e124311df691281a53`; reason: frozen calibration-note scope finding.
- Failed historical repair attempt preserved and unapproved: `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`; Green stop-line `542015ab4dee8158002eb96dca65ef03fa81904d`.
- Provenance audit: `aa62ac329c53c00016dcce749b5fea73b145d4ac`; decision `PASS - NDJSON PROVENANCE AND DEPENDENCY RESOLVED`.
- Certification commit placeholder: `PENDING_VM521_CERTIFICATION_COMMIT_SHA`.
- Final claim roles: 8 total; 6 substantive (`green_claim_0002` through `green_claim_0007`), 0 discovery, 2 support (`green_claim_0001`, `green_claim_0008`), 0 unclassified.
- G provenance: 25 entries; 0 required null canonical IDs; 0 null canonical content hashes; 0 unresolved pointers; 0 duplicate canonical entries; 0 duplicate null canonical-entry keys; 0 non-substantive authoritative chains.
- Exact-chain fixtures: `/core_identity` 5/5 exact (`green_claim_0002` through `green_claim_0006`) and `/placement_summary` 6/6 exact (`green_claim_0002` through `green_claim_0007`).
- All 12 proof-chain locators were rechecked: `green_vs_blue`, `green_vs_black`, `green_disc_001` through `green_disc_004`, `axis_natural_belonging`, `axis_instinct_over_artifice`, `axis_overreliance_shadow`, `/core_identity`, `/mechanics`, and `/profile`.
- Preview certified: `Green accepts a role within the web of life and lets inherent nature unfold. Its growth is patient, purposeful, and wary of mistaking every change for wisdom.` Source and embedded generated preview remain exactly equal.
- Candidate-scope certification result: `PASS - approved documented G display-source exception`; command exited 1 only for `data/identity-layers.json#/expressions/G/preview_text` and `data/factions.json#/identity_layers/expressions/G/preview_text`; no calibration, frozen-field, target, optional-field, runtime, or unrelated-identity diagnostic appeared.
- Required Green neighbor coverage certified for `GENERIC_G_OVERFIT`, `WG`, `BG`, `UG`, `RG`, `WITHERBLOOM`, `QUANDRIX`, `BANT`, `JUND`, `NAYA`, `TEMUR`, `SULTAI`, `ABZAN`, `W`, `U`, `B`, `R`, `WUBRG`, and `COLORLESS`.
- Historical/debug stale strings remain non-blocking repository-hygiene debt: the two top-level inspect NDJSON files are `DEBUG_INSPECTION_ARTIFACT`; the two matrix JS files are `HISTORICAL_ARCHIVE`; no cleanup occurred.
- Validation passed: JSON parse checks, Green reconciliation script, audit, semantic readiness validation, semantic candidate-scope tests, exact candidate-scope exception check, deterministic `build:factions` with content-empty line-ending/stat warnings only, semantic-readiness tests, placement tests, faction-context isolation tests, source-generated guardrails with known unrelated JESKAI/MARDU warnings only, full `npm.cmd test`, and `git diff --check`.
- Program status after certification: 20 certified identities; Wave 3 monocolors 5 of 5 certified / complete; VM-522 not started; external Excel untouched.

# VM-525 Jund Gate 1+2 Read-Only Semantic Audit

Agent name: Codex

Task requested: Continue VM-525 as a read-only Gate 1+2 semantic audit for JUND under CRIT-001 Contract v1.1, decide whether Gate 3+4 remediation is authorized, and update only governance records.

Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-525-jund-semantic-recovery.md`, `docs/incidents/CRIT-001-operating-playbook.md`, `docs/incidents/CRIT-001-contract-v1.1-amendment.md`, `docs/reference/semantic-readiness-contract.md`, `docs/incidents/CRIT-001-drift-control-template.md`, `docs/incidents/templates/identity-semantic-recovery-template.md`, `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`.

## Decision

Gate 1+2 decision: PASS - JUND GATE 3+4 REMEDIATION AUTHORIZED.

This is not remediation, candidate creation, independent review, certification, program-base advancement, Excel work, VM-526 work, or protected-worktree work. It is a governance-only semantic audit and exact remediation contract for the next authorized identity worker.

## Starting State

- Worktree: `C:\dev\mtgSiteWIP-crit001-vm525-jund`
- Branch: `codex/vm-525-jund-semantic-recovery`
- Starting HEAD: `f189c2f5b6a758e928934fca45a77d879f70a7d4`
- Starting HEAD subject: `VM-525: record Jund pre-identity drift preflight`
- Program base: `16528f3a24a7f3d7f4475bdde56fbfee09becd98`
- Program base subject: `VM-524: certify Grixis semantic recovery`
- Exact identity key: `JUND`
- Color metadata/code: `BRG`
- Invalid alias check: `BRG` is not an identity key and remains invalid for candidate-scope validation.
- Starting status: clean before this governance update.

Protected worktrees reviewed but not touched: original main, long-running `C:\dev\mtgSiteWIP-crit001`, VM-521/522/523/524 review and campaign worktrees, DRIFT-017, baseline, and NDJSON/provenance worktrees. Original main and long-running CRIT worktrees contain unrelated user/task changes and remain untouched.

## Pre-Flight Review Summary

Recent related work: VM-524 Grixis was certified from exact approved candidate `64a5bfffd646b292c7481f91c9ccb6def42fb552`, establishing current program base `16528f3a24a7f3d7f4475bdde56fbfee09becd98`. VM-525 preflight already proved the JUND key, BRG alias rejection, raw corpus shape, missing fixture, null provenance owners, preview ownership, active consumers, historical/debug exclusions, and setup-only scope.

Current known risks: all 10 current Jund claims lack semantic roles; evidence scopes are not final; semantic fixture is missing; 8 provenance rows have null canonical IDs; generated provenance is stale; exact candidate-scope fails because unclassified Jund claims contaminate generated proof chains; Scryfall support source path is missing; local official Alara captures are tracked but not represented as formal source records in `jund.sources.json`; collision guidance does not yet cover all required neighbors; current preview is aligned but incomplete.

Relevant decisions already made: JUND is the only internal identity key; BRG is display/color metadata; Jund must be audited as a Red-centered black-red-green shard, not as generic predator nature, devour, Modern Jund, savage violence, or Alara story flavor alone; support-only and shaping-only sources cannot carry authoritative generated proof chains.

Files recently changed before this task: VM-525 preflight handoff, VM-525 card, board, and handoff index at commit `f189c2f5b6a758e928934fca45a77d879f70a7d4`.

What should not be touched: Jund semantic data, generated data, fixtures, validators, tests, runtime, package/CI, Excel, VM-526, original main, prior identity campaign/review history, DRIFT-017 prototype, VM-542/DRIFT-019 residual, historical/debug/archive artifacts, and Table Talk files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-525-jund-semantic-recovery.md`
- `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/templates/identity-semantic-recovery-template.md`
- `data/raw-factions/jund/jund.changelog.json`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.sources.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- `data/semantic-readiness-provenance.json`
- `docs/research/jund/jund-evidence-ledger.md`
- `docs/research/jund/jund-source-ledger.md`
- `docs/research/jund/jund-research-dossier.md`
- `docs/research/jund/jund-reliability-audit.md`
- `docs/research/jund/jund-manual-fill.md`
- `docs/research/jund/jund-lore-source-packet.md`
- `docs/research/jund/Jund_Following Your Heart Making Magic Magic The Gathering.md`
- `docs/research/jund/story-all-cairns-of-jund.md`
- `docs/research/jund/sarkhan-vol-biography.md`
- `docs/research/jund/alara-plane-overview.md`
- `docs/architecture/colors/jund/identity.md`
- `docs/architecture/colors/jund/metaphysics.md`
- Targeted comparator references for Rakdos, Golgari, Gruul, Grixis, Sultai, Mardu, Temur, Naya, Abzan, Esper, Bant, Jeskai, and WUBRG/generic boundaries.

## Files Changed

- `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-525-jund-semantic-recovery.md`
- `docs/kanban/board.md`

## Raw Inventory And Frozen Locators

Raw packet files are tracked and readable:

| File | Git blob | SHA-256 |
| --- | --- | --- |
| `data/raw-factions/jund/jund.changelog.json` | `84082d41b4fa3f6ecea417f2467dc0d1a9d3eb81` | `c90d07c8e5e6aa88b695c67e8af854d28dfd75932b6a6caccfcdb5b5fbda5a6f` |
| `data/raw-factions/jund/jund.claims.json` | `15d71570252f04d4f6a7e235a4216a1c5f0cb2d2` | `cc8ea67397c10aa5c2e3c76be3bca6845abef5ca6c1ebde6408c924708830d6d` |
| `data/raw-factions/jund/jund.placement.json` | `229e814a0b0f92692d652d6e5fc46d77f3984671` | `f1dfeecb9e5f1bb02ab2b672d14e1ca95799ac8894e6a0623558cfd9f851bf53` |
| `data/raw-factions/jund/jund.profile.json` | `1f8aec40710df6c7210af89110cbbb0fb588eab3` | `236e59786417204e0b71e0a3cc1c1332c6a11b8f5a03a9c36fa41d88bab5f070` |
| `data/raw-factions/jund/jund.sources.json` | `16bcd75a51e7a796f047492d611cd0cb4fd4bffe` | `271aed049694167a0720967d5f1a17a27c5a9e0d7494243c82e8c4b879ae6732` |

Generated artifact fingerprints recorded during audit:

- `data/factions.json`: `30c28e275e6515f0c1e2ffacf6389cdb4f780a3cdc2da001303a98fe92df0bfd`
- `data/placement-model.json`: `e3fe12f5c813fdcca3aa05ddc71ebc3be9429e56233167a2ff58ac4b8ef5382d`
- `data/identity-layers.json`: `8eb2be2cbb2702c6a51f6ad4214e9d0f27221c8ffd9ac32a19ac59bdd5f4023c`
- `data/semantic-readiness-provenance.json`: `1059d7d468fa91b5a0ea4f5a00a16f110f0ea662e8a392a7a82ef88cb24db512`

Semantic fixture path is absent: `research/fixtures/semantic-readiness/jund.semantic-fixtures.json`.

## Source Audit

Current `jund.sources.json` has 15 source records: 3 claim-bearing, 6 shaping-only, and 6 support-only.

Claim-bearing current sources: `src_vm_jund_evidence_ledger_20260530`, `src_wotc_rosewater_jund_following_your_heart`, and `src_vm_canon_inventory_three_color_audit_20260528`.

Shaping-only current sources: `src_vm_jund_source_ledger_20260530`, `src_vm_jund_research_dossier_20260530`, `src_vm_jund_reliability_audit_20260530`, `src_vm_jund_lore_source_packet_20260530`, `src_vm_jund_identity_md_20260530`, and `src_vm_jund_metaphysics_md_20260530`.

Support-only current sources: `src_vm_jund_manual_fill_20260530`, `src_alara_shards_lore_dossier_protocol_rtf`, `src_scryfall_oracle_cards_local`, `src_vm_second_commander_recommendations_brg`, `src_wotc_color_philosophy_support_jund`, and `src_wotc_naya_grixis_comparator_support`.

Source gaps and exact Gate 3+4 disposition:

- `src_scryfall_oracle_cards_local` points to missing `data/scryfall/raw/oracle-cards.json`; it must remain support-only and must not enter substantive generated proof chains unless the local corpus is restored and explicitly bounded.
- The tracked official local captures `docs/research/jund/story-all-cairns-of-jund.md`, `docs/research/jund/sarkhan-vol-biography.md`, and `docs/research/jund/alara-plane-overview.md` are sufficient in-repo evidence for setting/story boundaries, but they are not formal source records yet.
- Gate 3+4 must add source records `src_wotc_story_all_cairns_of_jund_20151105`, `src_wotc_sarkhan_vol_biography_local`, and `src_wotc_alara_plane_overview_local` before those captures are used.
- The Alara captures must be bounded to setting, story, post-Conflux necromancy, Sarkhan/dragon illustration, and comparator context. They must not redefine core Jund identity away from the Rosewater Red-centered design article.

## Claim Disposition

Final intended Gate 3+4 raw claim count: 13 total, composed of 12 `substantive_claim` records and 1 `support_record`.

All 10 current claims are retained as substantive claims after evidence-scope correction. Gate 3+4 must add 3 exact records: 2 bounded setting/boundary substantive claims and 1 support-only story/figure guardrail.

| Claim | Disposition | Final role | Required scope |
| --- | --- | --- | --- |
| `jund_claim_0001` | Retain with scope correction | `substantive_claim` | `identity_fact`: Jund is the official black-red-green Alara shard. |
| `jund_claim_0002` | Retain with scope correction | `substantive_claim` | `identity_metadata_and_center`: JUND key, BRG metadata, Red center. |
| `jund_claim_0003` | Retain with scope correction | `substantive_claim` | `red_center_self_truth`: gut, self-truth, doing what feels right. |
| `jund_claim_0004` | Retain with scope correction | `substantive_claim` | `red_center_emotion_as_signal`: emotion as guide/compass. |
| `jund_claim_0005` | Retain with scope correction | `substantive_claim` | `freedom_with_consequence`: total freedom where action and survival carry cost. |
| `jund_claim_0006` | Retain with scope correction | `substantive_claim` | `black_appetite_self_advocacy`: self-interest, personal need, contentment, refusal of White constraints. |
| `jund_claim_0007` | Rewrite | `substantive_claim` | `green_unrestrained_instinct`: Green makes feeling embodied, unrestrained, feral, and less overthought without becoming generic savage nature. |
| `jund_claim_0008` | Rewrite | `substantive_claim` | `rbg_design_synthesis_bounded_destruction`: Black and Green back Red's destructive/letting-loose side only inside the design-philosophy frame. |
| `jund_claim_0009` | Retain with scope correction | `substantive_claim` | `enemy_pressure_boundary`: White/Blue absence only as design-scope enemy pressure. |
| `jund_claim_0010` | Retain with scope correction | `substantive_claim` | `anti_flattening_boundary`: not generic anger, savage nature, devour, Modern Jund, or mechanics/aesthetic substitution. |
| `jund_claim_0011` | Add | `substantive_claim` | `setting_pressure_boundary`: official Alara captures bind Jund to a hostile, predatory, volcanic/tar-pit/jungle hunting ground only as setting pressure. |
| `jund_claim_0012` | Add | `substantive_claim` | `necromancy_boundary`: necromancy was not native to pre-Conflux Jund and arrived after Conflux; Grixis death magic is a rupture/comparator, not native Jund identity. |
| `jund_claim_0013` | Add | `support_record` | `story_character_guardrail`: Meren, Clan Nel Toth, Dreamfire Draught, Sarkhan, dragons, and named story beats are illustrative support only. |

No current claim is removed, merged, or split. Claim `jund_claim_0002` remains one metadata/center claim because the source chain ties JUND key, BRG color metadata, and Red center into one identity-metadata obligation.

## Evidence Contract

- `jund_claim_0001`: source `src_wotc_rosewater_jund_following_your_heart`, locator opening Jund Week/Alara shard identification; secondary `src_vm_jund_evidence_ledger_20260530` row `JUND-EVID-001`.
- `jund_claim_0002`: sources `src_wotc_rosewater_jund_following_your_heart`, `src_vm_canon_inventory_three_color_audit_20260528`, `src_vm_jund_evidence_ledger_20260530`; locators rows `JUND-EVID-002` and `JUND-EVID-003`.
- `jund_claim_0003`: source `src_wotc_rosewater_jund_following_your_heart`; locator `JUND-EVID-004`.
- `jund_claim_0004`: source `src_wotc_rosewater_jund_following_your_heart`; locator `JUND-EVID-005`.
- `jund_claim_0005`: source `src_wotc_rosewater_jund_following_your_heart`; locator `JUND-EVID-006`.
- `jund_claim_0006`: source `src_wotc_rosewater_jund_following_your_heart`; locator `JUND-EVID-007`.
- `jund_claim_0007`: source `src_wotc_rosewater_jund_following_your_heart`; locator `JUND-EVID-008`.
- `jund_claim_0008`: source `src_wotc_rosewater_jund_following_your_heart`; locator `JUND-EVID-009`.
- `jund_claim_0009`: source `src_wotc_rosewater_jund_following_your_heart`; locator `JUND-EVID-010`.
- `jund_claim_0010`: sources `src_vm_jund_evidence_ledger_20260530`, `src_vm_jund_reliability_audit_20260530`; locators `JUND-EVID-012` and `JUND-EVID-013`.
- `jund_claim_0011`: sources to add `src_wotc_story_all_cairns_of_jund_20151105` and `src_wotc_alara_plane_overview_local`; locators in local captures for dragon-worshiping shard-plane, tar pits/jungles, endless predation, volcanic/primordial hunting ground.
- `jund_claim_0012`: source to add `src_wotc_story_all_cairns_of_jund_20151105`; locator in local capture for necromancy absent pre-Conflux and arriving after Conflux.
- `jund_claim_0013`: sources to add `src_wotc_story_all_cairns_of_jund_20151105` and `src_wotc_sarkhan_vol_biography_local`; locators for Meren/Clan Nel Toth/Dreamfire and Sarkhan/Jund dragons/Bolas as story support only.

Support-only records and shaping-only records must not be used as authoritative proof for generated semantic strings, placement guidance, identity layer text, recruiter context, or collision guidance except where the generated object is explicitly auxiliary and marked support-only.

## Evidence-Backed Jund Model

Canonical thesis: Jund is Red-centered freedom under consequence. Feeling is treated as first truth, Black protects appetite and self-need, and Green turns instinct into embodied force in a hostile living world where survival is earned. Jund is not generic savagery, generic anger, predation alone, might-makes-right, devour, Modern Jund, dragon worship, or story texture by itself.

Operational definition: Jund acts from feeling before permission, honors hunger and self-interest without spectacle, accepts danger and cost, and uses instinctive pressure to remain self-true.

Desired outcome: live fully and true to self, satisfy need, endure and advance through pressure without imposed conformity, public order, sterile control, or detached analysis.

Theory of survival: survival is consequence-bearing action guided by emotion, instinct, and appetite. It is not passive adaptation, cold calculation, or a generic "strong survive" slogan.

Theory of strength: strength is carrying cost and remaining self-true through adversity. It is not hierarchy or domination for its own sake.

Scarcity and danger: allowed as setting pressure when bounded to official local captures; not complete social doctrine.

Competition and predation: allowed as story/setting texture only when pointed back to total freedom and consequence.

Nature and ecology: Green contributes unrestrained instinct and embodied force; local story adds a hostile living world. Do not drift into Naya ecology, Golgari lifecycle, or generic Green nature.

Instinct, appetite, and hunger: instinct is Green embodied motion plus Red feeling; appetite and hunger are Black self-advocacy and need. They are not cruelty, spectacle, or overconsumption by default.

Ambition and self-interest: Black contributes personal need and self-advocacy, not generic chessmaster power, cold opportunism, or Sultai/Grixis calculation.

Violence and destruction: possible tool and shadow when defending what matters, but not the identity center.

Adaptation, resilience, and growth: survival under consequence; not Golgari recursion, Naya growth, or Sultai optimization.

Dominance and hierarchy: do not use as positive definition. If referenced, keep it setting/story pressure.

Freedom and restraint: Jund resists White imposed conformity and Blue detached analysis only at the design-philosophy scope.

Failure modes: generic Red anger, generic savage nature, overconsumption, treating every impulse as truth, cruelty/spectacle, Green-only predator nature, mechanics substitution, and aesthetic substitution.

## Color Contribution Contract

Red is the center: self-truth, emotional honesty, gut instinct, action, and freedom. Red constrains Black from cold opportunism and Green from passive natural acceptance. Red's risk is anger/destruction when unbounded.

Black contributes appetite, self-advocacy, personal need, contentment, and refusal of White constraints. Black constrains Red from self-erasure and Green from diffuse belonging/passive nature. Black's risk is overconsumption or cruelty when unbounded.

Green contributes unrestrained instinct, less overthinking, feral/embodied force, and living-world pressure. Green constrains Black and Red from abstract ego or spectacle. Green's risk is generic savage nature or predator hierarchy when unbounded.

All three colors are necessary: without Black it collapses toward Gruul/Temur/Naya; without Red it collapses toward Golgari/Sultai/Abzan; without Green it collapses toward Rakdos/Grixis/Mardu.

## Required Neighbor Matrix

- Golgari/BG: shares survival, death/life, resources, and underground resilience. Jund discriminator is Red-centered appetite-to-action under consequence, not rot, reclamation, lifecycle, or closed-loop recursion.
- Gruul/RG: shares instinct, force, and freedom. Jund adds Black appetite and self-advocacy, and is not merely civilization-rejection or anti-city grievance.
- Rakdos/BR: shares appetite, emotion, violence, and self-interest. Jund adds Green embodied instinct and hostile living-world pressure, and lacks performance, audience, spectacle, and hedonism as center.
- Black/B: shares self-interest and survival. Jund requires Red feeling/action and Green instinct.
- Red/R: shares emotion, freedom, and action. Jund requires Black appetite and Green unrestrained instinct/consequence.
- Green/G: shares nature/instinct. Jund requires Red self-truth/freedom and Black appetite.
- Grixis/UBR: shares Black/Red danger and post-Conflux death boundary. Jund replaces Blue calculation/death-world with Green instinct and Red center.
- Sultai/UBG: shares Black/Green survival/resources. Sultai adds Blue calculation and necromantic/resource opportunism; Jund is Red-centered immediate action.
- Mardu/WBR: shares Black/Red action. Mardu adds White formation/code and lacks Green embodied instinct/ecology.
- Temur/URG: shares Red/Green instinct. Temur adds Blue/Green embodied knowledge and lacks Black appetite/self-interest.
- Naya/WRG: shares Red/Green and Alara context. Naya is Green-centered abundance/awe/community/behemoth; Jund is Red-centered appetite/survival/consequence.
- Abzan/WBG: shares Black/Green endurance/survival. Abzan adds White family, ancestor, and institution duty; Jund lacks White and moves from feeling/instinct.
- Esper/WUB: control, perfection, artifice, and Blue/White structure are antithetical to Jund's Red-centered instinct.
- Bant/WUG: public honor/community/champion structure is not Jund's consequence-bearing self-truth.
- Jeskai/URW: discipline, training, and principle are not Jund's immediate feeling/appetite/instinct.
- WUBRG/five-color/good-stuff: all-color access is not Jund; require the exact Red-centered BRG mechanism.

Generic terms insufficient by themselves: survival, predation, violence, savagery, nature, ambition, appetite, hunger, strength, dominance, hierarchy, danger, dragons, Alara, devour, midrange, and "strong survive."

## Provenance Contract

Current provenance has 22 Jund rows, 8 null canonical IDs, zero null hashes, and no duplicate non-null canonical IDs.

Retain existing non-null IDs where their objects remain: `signal_jund_0001`, `signal_jund_0002`, `signal_jund_0003`, `collision_jund_gruul`, `collision_jund_grixis`, `collision_jund_witherbloom`, `collision_jund_naya_note_draft`, `value_jund_0001`, `value_jund_0002`, `value_jund_0003`, `q_jund_0001`, `q_jund_0002`, `q_jund_0003`, and `event_jund_0001`.

Assign these exact owners for current null IDs:

| Pointer | Required owner |
| --- | --- |
| `/moral_and_psychological_profile` | `jund_moral_and_psychological_profile_gate3` |
| `/core_identity` | `jund_core_identity_gate3` |
| `/data_quality` | `jund_data_quality_gate3` |
| `/great_tension` | `jund_great_tension_gate3` |
| `/site_surface` | `jund_site_surface_gate3` |
| `/structure` | `jund_structure_gate3` |
| `/views_on_other_factions/0` | `rel_jund_naya_gate3` |
| `/views_on_other_factions/1` | `rel_jund_grixis_gate3` |

If Gate 3+4 adds official Alara capture objects, use owner IDs `jund_setting_pressure_gate3`, `jund_necromancy_boundary_gate3`, `jund_story_support_gate3`, `collision_jund_<target>_gate3`, and `rel_jund_<target>_gate3`.

Final required state: zero null canonical IDs, zero null hashes, no duplicate owner IDs, no support-only proof-chain contamination, and generated/provenance proof chains using substantive claims only for authoritative semantics.

## Fixture Contract

Create `research/fixtures/semantic-readiness/jund.semantic-fixtures.json` with positive, negative, and round-trip coverage.

Required positives: Red-centered self-truth/gut/action; emotion as guide/compass; Black appetite/self-advocacy and personal need; Green embodied/unrestrained instinct; freedom with consequence; hostile setting pressure only as support; three-color necessity.

Required negatives: Golgari rot/reclamation/life-death cycle without Red; Gruul anti-civilization instinct without Black; Rakdos spectacle/audience/hedonism without Green; Grixis necromancy/Blue calculation/death-world; Sultai resource opportunism; Mardu formation/code; Temur embodied knowledge; Naya abundance/awe/community/behemoth; Abzan family/ancestor/institution duty; Esper control/artifice; Bant honor/order; Jeskai discipline; mono-Black/mono-Red/mono-Green partials; WUBRG/good-stuff; generic survival/predation/violence/savagery/nature/ambition/strength; devour, Modern Jund midrange, dragon deck, commander-only recommendation, color pie trivia, and card-list/corpus-only evidence.

Fixture acceptance requires `node research/validate-semantic-readiness.mjs --fixtures --targets=JUND` to pass after remediation.

## Collision And Lateral Contract

Preserve current true lateral targets unless Gate 3+4 candidate-scope validation proves the semantic-only exception: `BR`, `BG`, `RG`, `GRIXIS`, `WITHERBLOOM`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`.

Final raw collision-guidance order:

1. `collision_jund_rakdos` -> `BR`
2. `collision_jund_golgari` -> `BG`
3. `collision_jund_gruul` -> `RG`
4. `collision_jund_grixis` -> `GRIXIS`
5. `collision_jund_sultai` -> `SULTAI`
6. `collision_jund_mardu` -> `MARDU`
7. `collision_jund_temur` -> `TEMUR`
8. `collision_jund_naya` -> `NAYA` as a required non-lateral shard boundary unless candidate scope explicitly approves adding `NAYA` as a true lateral target.
9. `collision_jund_witherbloom` -> `WITHERBLOOM` as school/life-drain false-positive support.
10. `collision_jund_wubrg_generic` -> WUBRG/generic good-stuff as broad-collapse guardrail.

Generated collision guidance must match generator-supported active collision surfaces and must not silently drop required neighbor safeguards. If a target is represented in fixtures/recruiter rather than true lateral inhibition, record that distinction explicitly in provenance.

## Preview, Consumers, And Drift Controls

Current preview source and embedded generated copy match: `Jund treats feeling as a compass. Red supplies self-truth and action, Black honors appetite and self-interest, and Green strips away overthinking until instinct can move.`

Current preview SHA: `62bf73d5d7733faa12f13cf6401af7f2d9fd081b4ff2bcb41e33568dc6268562`.

Preview contract for Gate 3+4: `Jund trusts feeling as the first signal: Red moves from self-truth, Black protects appetite and need, and Green turns instinct into force under real consequence.`

DRIFT-015 status: ownership and equality are established; semantic alignment remains incomplete until Gate 3+4 updates and validates preview/recruiter/generated consumers.

Active consumers to validate after remediation: Home (`index.html`, `assets/js/home.js`, `data/identity-layers.json`, `data/factions.json`), Archscry (`assets/js/index.js`, `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`), recruiter (`supabase/functions/guild-recruiter/index.ts`, `FACTION_CONTEXT`), and tests/CI (`assets/js/quick-reading-tests.js`, `assets/js/quick-reading-bias.js`, semantic/candidate/source-generated scripts, package scripts, `.github/workflows/validation.yml`).

Excluded consumers: `outputs/mtgdata-v3-enhanced/*.inspect.ndjson` is DEBUG_INSPECTION_ARTIFACT; `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js` are HISTORICAL_ARCHIVE.

DRIFT-016 status: final remediation must prove local source-generated parity for active generated consumers.

DRIFT-017 status: approved validator integrity was rechecked against approved control commit `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`; candidate-scope validation currently fails only on pre-remediation Jund semantic contamination.

## Frozen Fields

- Identity key: `JUND`
- Raw slug: `jund`
- Color identity: `B/R/G`
- Color code/metadata: `BRG`
- Placement eligibility: `placement_eligible: true`, `live_pilot: true`, `manual_review_recommended: true`, `review_gated: false`
- Calibration tuning status: `vm186_live_pilot`
- Primary read: medium source-authored confidence for narrow design evidence; low detailed lore confidence.
- Required positive terms: Jund, Alara, BRG, Red-centered, self-truth, gut instinct, emotion as guide, freedom with consequences, Black appetite, Green instinct.
- Generated positive minimum hits: `2`
- Broad match penalty: `0.12`
- Current generated lateral targets: `BR`, `BG`, `RG`, `GRIXIS`, `WITHERBLOOM`, `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`

Do not alter scoring/confidence/calibration/lateral targets/native IDs unless explicitly source-bounded, identity-local, and accepted by candidate-scope validation.

## Gate 3+4 Required Remediation Matrix

1. Assign semantic roles to all 10 current claims and add the 3 exact new records described above.
2. Add formal source records for the 3 tracked official local Alara captures before using them.
3. Keep Scryfall local corpus support-only or quarantine it if the missing path remains unresolved.
4. Rewrite claims `jund_claim_0007` and `jund_claim_0008` to avoid generic savage nature and unbounded destruction.
5. Add bounded evidence locators and evidence scopes for every substantive claim.
6. Isolate `jund_claim_0013` and all story/card/Commander/mechanics material from authoritative generated proof chains.
7. Repair all 8 null provenance owner IDs with the exact owner assignments in this handoff.
8. Regenerate `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, and `data/semantic-readiness-provenance.json` from source.
9. Add Jund semantic fixtures with required positives, negatives, generic traps, mechanics traps, and neighbor traps.
10. Reconcile raw/generated collision guidance and record true lateral versus non-lateral boundary distinctions.
11. Update preview to the exact preview contract or record an equivalent source-bounded rationale.
12. Validate active Home, Archscry, recruiter, tests, and CI consumers.
13. Preserve excluded historical/debug/archive artifacts unless separately authorized.
14. Preserve identity key, color metadata, placement eligibility, calibration, scoring, and native IDs except for explicit source-bounded identity-local repairs.
15. Run exact candidate-scope validation from program base to candidate SHA for `JUND` and invalid alias validation for `BRG`.
16. Run semantic readiness, fixture, provenance, source-generated, parser, and full test/export validation as applicable.
17. Record exact generated hashes, provenance counts, fixture counts, claim counts, and candidate SHA in the Gate 3+4 handoff.
18. Do not advance to Gate 5 without a clean exact candidate SHA and a separate candidate workflow record.

## Diagnostics Run

- `node research/audit-semantic-readiness.mjs --targets=JUND`: exit 0. Reported 10 unclassified claims, 15 sources, 22 reference-site/provenance references, 3 raw questions, neighbor references `grixis`, `gruul_clans`, `naya`, `witherbloom`, recruiter context size 9713, and low-volume/support-heavy risk.
- `node research/validate-semantic-readiness.mjs --targets=JUND`: exit 1 as expected pre-remediation. All 10 claims lack semantic roles; recruiter guidance lacks evidence mapping; generated profile/placement references lack substantive claims; fixture is missing.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=JUND`: exit 1 as expected pre-remediation for the same class of defects plus missing fixture.
- `node research/semantic-candidate-scope-tests.js`: exit 0.
- `node research/validate-semantic-candidate-scope.mjs --identity=JUND --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=f189c2f5b6a758e928934fca45a77d879f70a7d4`: exit 1 as expected pre-remediation due to unclassified Jund proof-chain contamination.
- `node research/validate-semantic-candidate-scope.mjs --identity=BRG --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=f189c2f5b6a758e928934fca45a77d879f70a7d4`: exit 1 with `Unknown identity BRG`, expected and correct.
- `node research/build-semantic-readiness-provenance.mjs --check`: exit 1 as expected pre-remediation because generated provenance is stale.
- `node research/validate-source-generated-guardrails.mjs --targets=JUND`: exit 0, with one non-blocking model-owned inhibitor warning.
- JSON parse check across raw/generated/provenance files: exit 0.
- Fixture path check: missing, expected pre-remediation.
- Approved validator integrity diff against `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`: exit 0.

Expected diagnostic failures do not block Gate 3+4 authorization because they are exactly the unremediated defects this Gate 1+2 contract assigns to the next authorized implementation stage.

## Scorecard

- Drift-control target identity exactness: PASS.
- Starting HEAD and program base exactness: PASS.
- Protected worktree preservation: PASS.
- Source inventory completeness for current records: PASS.
- Tracked local capture source-gap classification: PASS.
- Claim role disposition: PASS.
- Evidence sufficiency for current claims: PASS.
- Evidence sufficiency for added setting/boundary claims: PASS.
- Support-only isolation contract: PASS.
- Required-neighbor matrix: PASS.
- Generic/mechanics/aesthetic safeguards: PASS.
- Preview owner/equality assessment: PASS.
- Active consumer trace: PASS.
- Provenance owner assignment contract: PASS.
- Fixture contract: PASS.
- Collision/lateral contract: PASS.
- Frozen fields contract: PASS.
- Candidate-scope expected-failure classification: PASS.
- Invalid alias rejection: PASS.
- Remediation authorization clarity: PASS.

Score: 20 PASS, 0 FAIL, 0 UNKNOWN.

## Why It Changed

The governance record now captures the exact semantic decisions that Gate 3+4 needs in order to remediate Jund without re-litigating source boundaries, claim roles, fixture targets, proof-chain ownership, collision behavior, preview language, or drift controls.

## Decisions Made

- Gate 3+4 remediation is authorized for JUND only.
- Jund's core is Red-centered freedom under consequence, with Black appetite/self-advocacy and Green embodied instinct.
- All 10 current claims can be retained as substantive claims after scope correction.
- Three additional records are required: two bounded substantive setting/boundary claims and one support-only story/figure guardrail.
- Tracked official Alara captures are sufficient for setting/story boundaries but require formal source records before use.
- Story, card, Commander, mechanics, dragon, Meren, Sarkhan, devour, Modern Jund, and generic survival material cannot carry authoritative semantics.
- Required neighbor coverage must include the pair colors, monocolors, Grixis, Sultai, Mardu, Temur, Naya, Abzan, Esper, Bant, Jeskai, WUBRG, and generic false positives.
- BRG remains invalid as an identity key.

## Risks / Uncertainties

- The exact generated collision representation for non-lateral Naya and WUBRG/generic boundaries depends on generator-supported surfaces; Gate 3+4 must record whether these are represented as raw collision guidance, generated collision guidance, fixture-only traps, recruiter guidance, or a combination.
- Scryfall support remains missing locally and cannot be promoted.
- Candidate-scope may reject lateral-target expansion if Gate 3+4 adds `NAYA` as a true lateral target instead of a non-lateral boundary.
- Existing diagnostics are failing by design until remediation occurs; future Gate 3+4 must not treat these stale failures as certification evidence.

## Tests Run

See the Diagnostics Run section for exact command outcomes. No remediation validation passed because no remediation was performed.

## Not Touched

No Jund raw semantic data, generated data, provenance data, fixtures, runtime code, tests, validators, generators, schemas, package scripts, CI files, Excel files, VM-526 files, original-main files, protected worktrees, DRIFT-017 prototype files, VM-522/VM-523/VM-524 history, VM-542/DRIFT-019 residual files, historical/debug/archive artifacts, or Table Talk files were changed.

## Follow-Up Recommendations

Next worker should perform Gate 3+4 semantic remediation exactly from this contract, then create a separate candidate workflow record only after all required validations pass from the exact program base to the exact candidate SHA.

Next suggested agent: Jund Gate 3+4 implementation agent.

PASS — JUND GATE 3+4 REMEDIATION AUTHORIZED

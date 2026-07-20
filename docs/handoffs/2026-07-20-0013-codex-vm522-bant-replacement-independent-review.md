# VM-522 Bant Replacement Independent Review

Agent name: Codex
Task requested: Fresh independent Contract v1.1 exact-SHA review of Bant replacement candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
Program: CRIT-001 - 37-Identity Semantic Recovery Program
Ticket: VM-522
Identity: Bant / WUG
Internal key: BANT

## Decision

APPROVE EXACT SHA `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

This approves only exact replacement semantic candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`. It does not approve the replacement workflow commit `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`, does not certify Bant, does not mark Bant `semantically_ready`, and does not advance the program base.

## Review Context

- Review worktree: `C:\dev\mtgSiteWIP-crit001-vm522-replacement-review`
- Review branch: `codex/vm-522-bant-replacement-independent-review`
- Review starting HEAD: `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`
- Program base reviewed: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Rejected prior candidate: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- Prior rejection review: `82b92666ab33904e254c5c3807b8d62f47c53496`
- Rejection remediation commits: `151dc3b0647833207e2e2678da3fa06282fafd7f`, `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`
- Exact replacement candidate reviewed: `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`
- Replacement workflow-record commit: `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`
- Current certified count remains 20 of 37.
- Program base remains `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Independence Statement

This was a fresh independent exact-SHA review in a dedicated review worktree and branch created from the replacement workflow record. Implementation and workflow summaries were treated as claims to verify. The prior rejection was independently reconstructed before judging the replacement. No candidate remediation, certification, source addition, provenance regeneration in repository write mode, candidate replacement, VM-523 work, Excel work, original-main worktree modification, prior-review worktree modification, campaign-worktree modification, DRIFT-017 prototype modification, historical/debug/archive modification, or Table Talk modification occurred.

## Governing Authority Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- Candidate-scope validator and tests.
- VM-522 drift preflight, preflight rerun, stage-ownership adjudication, Gate 1+2, Gate 3+4, original candidate workflow, original independent rejection review, and replacement workflow handoffs.
- VM-522 Kanban card and board entry.
- Recent exact-SHA review and replacement-review precedents.

No nested `AGENTS.md` files were present under the review worktree.

## Preflight and Ancestry

Preflight result: PASS.

- Fresh review branch and worktree were created after collision checks from exact workflow commit `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`.
- Required objects existed: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`, `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`, `82b92666ab33904e254c5c3807b8d62f47c53496`, `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`, and `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`.
- Ancestry verified: `fa58e572...` -> `b466cddb...` -> `82b92666...` -> `5522e849...` -> `7618da75...`.
- Candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` is an ancestor of workflow record `7618da75c59034e4fa5e62e696de9a2f8b4d3b56`.
- The diff from `5522e849...` to `7618da75...` contains governance/workflow files only and no `data`, `research`, `supabase`, `assets`, `outputs`, package, CI, validator, generator, runtime, fixture, or semantic candidate files.
- Protected campaign, prior-review, original-main, DRIFT-017, historical/debug/archive, VM-542/DRIFT-019 residual, Excel, and Table Talk scopes were not modified.

## Candidate Isolation

Program-base-to-replacement range reviewed:

`fa58e572b6303ba98b7e3015bcfa20e6d251ee6e..5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

Candidate-range commit list:

- `6273268` VM-522: record Bant pre-identity drift preflight
- `ffba9fd` VM-522: record Bant preflight rerun blockers
- `16a3a33` VM-522: adjudicate Bant preflight stage ownership
- `d135a7b` VM-522: record Bant Gate 1+2 semantic audit
- `765f0a9` VM-522: remediate Bant semantic claims
- `799627e` VM-522: preserve Bant candidate-scope invariants
- `b466cdd` VM-522: normalize added Bant collision rows
- `c1601e9` VM-522: record Bant Gate 3+4 remediation
- `224d05d` VM-522: record Bant candidate workflow
- `82b9266` VM-522: record Bant independent exact-SHA review
- `151dc3b` VM-522: repair Bant replacement candidate blockers
- `5522e84` VM-522: disambiguate Bant source title for candidate scope

Program-base-to-replacement file list:

- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/bant.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- VM-522 governance handoffs, card, board, and handoff index already present in candidate ancestry.

Diff statistics: 20 files, 4,926 insertions, 668 deletions.

Rejected-to-replacement semantic delta reviewed:

`b466cddb4618b1e2d7c897c15f7513a6d2db08b0..5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`

Changed files in that bounded semantic delta:

- `data/factions.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/semantic-readiness-provenance.json`

Field classifications: evidence-locator repair PASS; source-title clarification PASS; canonical provenance ownership input PASS; deterministic Bant-generated output PASS; deterministic provenance output PASS; unrelated semantic change none; shared-infrastructure change none; governance contamination none; historical/debug/archive contamination none; unknown path or field none.

## Original Rejection Reconstruction

The rejected candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0` was independently checked.

Original evidence-locator blocker: reproduced.

- Rejected missing locator instances: 22.
- Rejected unique missing artifact paths: 12.
- Missing paths affected substantive evidence reconstruction and therefore materially blocked Contract v1.1 approval.

Rejected unique missing paths:

- `docs/research/bant/peace-love-understanding-archive.md`
- `docs/research/bant/bant-identity.md`
- `docs/research/bant/bant-metaphysics.md`
- `docs/research/bant/source-extracts/planeswalkers-guide-alara.md`
- `docs/research/bant/Angel_Eye_View_archive.md`
- `docs/research/bant/source-extracts/asha.md`
- `docs/research/bant/source-extracts/elspeth-bant-archive-trap.md`
- `docs/research/bant/source-extracts/elspeth-character-study.md`
- `docs/research/bant/source-extracts/bant.md`
- `docs/research/bant/source-material/lore-reference.docx`
- `docs/research/bant/A_Man_of_Parts_archive.md`
- `docs/research/canon-inventory-three-color-audit.md`

Original provenance blocker: reproduced.

- Rejected Bant-linked provenance entries: 87.
- Rejected required rows with `canonical_id: null`: 28.
- Affected required/generated-consumed paths included `/core_identity`, `/site_surface`, `/structure`, `/moral_and_psychological_profile`, `/canonical_flavor_text/*`, `/mechanics`, `/mechanics/confirmed_mechanics/0`, and `/views_on_other_factions/*`.
- The null canonical IDs violated the review requirement for deterministic required canonical ownership on generated-consumed authoritative rows.

## Evidence-Locator Repair Matrix

Matrix totals:

- Rejected locator rows reviewed: 22.
- Rows passing artifact existence, tracking, bounded source relationship, and source-scope checks: 22.
- Rows with source invention, unsupported substitution, missing artifact, untracked dependency, scope broadening, or unreconstructible support: 0.
- Final Bant substantive evidence locators: 43.
- Final missing locator paths: 0.
- Final missing evidence scopes: 0.

All 22 rejected locator results:

1. `bant_claim_0001` remaps `src_wotc_rosewater_bant_20081006` from missing `docs/research/bant/peace-love-understanding-archive.md#bant-shard-frame` to tracked official capture `docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md#bant-shard-frame`: PASS.
2. `bant_claim_0002` remaps the same Rosewater source from missing `#green-white-blue-bant` path to the same tracked official capture: PASS.
3. `bant_claim_0002` remaps shaping source `src_vm_bant_identity_md_20260529` from missing `docs/research/bant/bant-identity.md#color-identity-boundary` to tracked `docs/architecture/colors/bant/identity.md#color-identity-boundary`: PASS.
4. `bant_claim_0003` remaps Rosewater from missing `#white-centered-utopia` path to tracked official capture: PASS.
5. `bant_claim_0004` remaps Rosewater from missing `#absence-of-black-red` path to tracked official capture: PASS.
6. `bant_claim_0004` remaps shaping source `src_vm_bant_metaphysics_md_20260529` from missing `docs/research/bant/bant-metaphysics.md#absence-boundary` to tracked `docs/architecture/colors/bant/metaphysics.md#absence-boundary`: PASS.
7. `bant_claim_0006` remaps identity source `src_vm_bant_identity_md_20260529` to tracked `docs/architecture/colors/bant/identity.md#public-champion`: PASS.
8. `bant_claim_0006` remaps metaphysics source `src_vm_bant_metaphysics_md_20260529` to tracked `docs/architecture/colors/bant/metaphysics.md#community-backed-excellence`: PASS.
9. `bant_claim_0009` remaps `src_wotc_planeswalkers_guide_alara_2008` from missing source-extract path to tracked `docs/research/bant/bant-lore-source-packet.md#five-nation-frame`: PASS.
10. `bant_claim_0010` remaps the same Planeswalker's Guide source to tracked `docs/research/bant/bant-lore-source-packet.md#nation-language-boundary`: PASS.
11. `bant_claim_0013` remaps support-only `src_wotc_angel_eye_view_bant_20081008` to tracked `docs/research/bant/bant-lore-source-packet.md#asha-angelic-context`: PASS.
12. `bant_claim_0013` remaps support-only `src_mtg_wiki_asha` to tracked `docs/research/bant/bant-lore-source-packet.md#asha-reference-boundary`: PASS.
13. `bant_claim_0014` remaps support-only `src_archive_trap_alara` to tracked `docs/research/bant/bant-lore-source-packet.md#elspeth-bounded-context`: PASS.
14. `bant_claim_0014` remaps support-only `src_card_kingdom_elspeth_story` to tracked `docs/research/bant/bant-lore-source-packet.md#elspeth-character-study`: PASS.
15. `bant_claim_0014` remaps support-only `src_mtg_wiki_bant` to tracked `docs/research/bant/bant-lore-source-packet.md#elspeth-reference-boundary`: PASS.
16. `bant_claim_0016` remaps support-only local reference `src_vm_bant_lore_reference_docx_20260529` to tracked `docs/research/bant/source-material/Bant_Lore_Reference.docx#post-phyrexia-boundary`: PASS.
17. `bant_claim_0016` remaps support-only `src_wotc_a_man_of_parts` to tracked `docs/research/bant/bant-research-dossier.md#bant-memory-context`: PASS.
18. `bant_claim_0016` remaps support-only `src_mtg_wiki_bant` to tracked `docs/research/bant/bant-research-dossier.md#bant-continuity-reference`: PASS.
19. `bant_claim_0019` remaps shaping source `src_vm_bant_identity_md_20260529` to tracked `docs/architecture/colors/bant/identity.md#neighbor-boundary`: PASS.
20. `bant_claim_0019` remaps shaping source `src_vm_bant_metaphysics_md_20260529` to tracked `docs/architecture/colors/bant/metaphysics.md#collapse-risk-boundary`: PASS.
21. `bant_claim_0019` remaps shaping source `src_vm_canon_inventory_three_color_audit_20260528` to tracked `docs/analysis/canon-inventory-three-color-reference-audit.md#three-color-neighbor-audit`: PASS.
22. `bant_claim_0019` remaps Rosewater to tracked official capture `docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md#color-shard-frame`: PASS.

All 12 missing-path dispositions are accounted for by tracked official captures, tracked architecture source records, tracked bounded lore source packets, tracked uppercase DOCX reference, tracked research dossier, or tracked cross-identity analysis. No new external source intake occurred.

## MTG Wiki Source-Title Clarification

Source ID `src_mtg_wiki_bant` changed title from `Bant` to `MTG Wiki page: Bant`. The source ID, source role, reliability classification, URL, notes, and support-only status remain unchanged. The change disambiguates the source record without authority escalation or source substitution. Result: PASS.

## Provenance Repair Matrix

Matrix totals:

- Rejected required null rows reviewed: 28.
- Replacement rows with non-null canonical IDs: 28.
- Final Bant-linked provenance entries: 87.
- Final required null canonical IDs: 0.
- Null hashes: 0.
- Unresolved pointers: 0.
- Duplicate canonical/null keys: 0.
- Non-substantive authoritative-chain count: 0.
- Deterministic generator relationship: PASS at Git-blob level.

All 28 repaired-row results:

- `/moral_and_psychological_profile` -> `bant_moral_profile_gate3`: PASS.
- `/canonical_flavor_text/0` -> `bant_flavor_rafiq_five_nations_gate3`: PASS.
- `/canonical_flavor_text/1` -> `bant_flavor_noble_hierarch_great_conduit_gate3`: PASS.
- `/canonical_flavor_text/2` -> `bant_flavor_akrasan_squire_akrasa_gate3`: PASS.
- `/core_identity` -> `bant_core_identity_gate3`: PASS.
- `/great_tension` -> `bant_great_tension_gate3`: PASS.
- `/mechanics` -> `bant_mechanics_gate3`: PASS.
- `/mechanics/confirmed_mechanics/0` -> `bant_exalted_mechanic_gate3`: PASS.
- `/site_surface` -> `bant_site_surface_gate3`: PASS.
- `/structure` -> `bant_structure_gate3`: PASS.
- `/views_on_other_factions/0` -> `rel_bant_selesnya_wg_gate3`: PASS.
- `/views_on_other_factions/1` -> `rel_bant_simic_ug_gate3`: PASS.
- `/views_on_other_factions/2` -> `rel_bant_azorius_wu_gate3`: PASS.
- `/views_on_other_factions/3` -> `rel_bant_green_g_gate3`: PASS.
- `/views_on_other_factions/4` -> `rel_bant_white_w_gate3`: PASS.
- `/views_on_other_factions/5` -> `rel_bant_blue_u_gate3`: PASS.
- `/views_on_other_factions/6` -> `rel_bant_naya_gate3`: PASS.
- `/views_on_other_factions/7` -> `rel_bant_esper_gate3`: PASS.
- `/views_on_other_factions/8` -> `rel_bant_temur_gate3`: PASS.
- `/views_on_other_factions/9` -> `rel_bant_abzan_gate3`: PASS.
- `/views_on_other_factions/10` -> `rel_bant_jeskai_gate3`: PASS.
- `/views_on_other_factions/11` -> `rel_bant_grixis_gate3`: PASS.
- `/views_on_other_factions/12` -> `rel_bant_jund_gate3`: PASS.
- `/views_on_other_factions/13` -> `rel_bant_sultai_gate3`: PASS.
- `/views_on_other_factions/14` -> `rel_bant_wubrg_gate3`: PASS.
- `/views_on_other_factions/15` -> `rel_bant_generic_good_stuff_gate3`: PASS.
- `/views_on_other_factions/16` -> `rel_bant_generic_balance_gate3`: PASS.
- `/views_on_other_factions/17` -> `rel_bant_generic_overfit_gate3`: PASS.

The aggregate and neighbor-view IDs follow completed-identity provenance-owner precedent, point to the correct semantic owners, and do not promote mechanics or support-only rows into authoritative proof.

## Claim Review

Expected final counts were independently verified:

- Total claims: 21.
- `substantive_claim`: 16.
- `support_record`: 5.
- `discovery_record`: 0.
- Unclassified: 0.

Substantive IDs reviewed and passed: `bant_claim_0001`, `bant_claim_0002`, `bant_claim_0003`, `bant_claim_0004`, `bant_claim_0005`, `bant_claim_0006`, `bant_claim_0007`, `bant_claim_0008`, `bant_claim_0009`, `bant_claim_0010`, `bant_claim_0011`, `bant_claim_0013`, `bant_claim_0014`, `bant_claim_0015`, `bant_claim_0016`, `bant_claim_0019`.

Support IDs reviewed and retained as support-only or auxiliary: `bant_claim_0012`, `bant_claim_0017`, `bant_claim_0018`, `bant_claim_0020`, `bant_claim_0021`.

Claim-by-claim result totals: 21 PASS, 0 FAIL, 0 UNKNOWN. No unsupported or overbroad claim remains approval-blocking.

## Semantic Model

Independently derived Bant thesis: Bant treats excellence, social order, and heroic public action as valid when individual distinction remains answerable to a living community and a white-centered utopian structure. It is not generic WUG balance, generic good-stuff optimization, or aesthetic Alara nobility.

Operational definition: Bant asks whether a player is drawn to disciplined public virtue, community-legible excellence, and a champion model that earns status through service rather than private optimization, raw growth, bureaucratic procedure, or abstract perfection.

White contribution: ordered public trust, moral structure, and peace/utopian aspiration.
Blue contribution: refinement, training, expertise, and deliberate improvement of the public champion.
Green contribution: living community, continuity, and natural-social belonging that prevents Bant from collapsing into procedure or abstract planning.

Why all three colors are necessary: White alone is too procedural; Blue alone is too abstract or privately optimized; Green alone is too instinctive or communal without the refined champion structure. The WUG combination is necessary for accountable excellence inside a living social order.

Failure modes: status worship, brittle hierarchy, champion exceptionalism, protection turning into prison, and community virtue becoming social exclusion.

Falsification tests: reject generic WUG efficiency, simple harmony, generic order, generic growth, good-stuff, mechanic/aesthetic Bant, and two-color neighbor identities when the response lacks the accountable public champion and living-community frame.

Generic-language result: PASS. Mechanical/aesthetic-substitution result: PASS. Exalted, angels, knights, beasts, and Alara aesthetics remain bounded supporting context rather than identity substitutes.

## Required Neighbor Review

All required boundaries retain testable discriminators and source-bounded support.

- Selesnya / WG: PASS. Bant requires refined public champion/excellence, not collective harmony alone.
- Simic / UG: PASS. Bant centers accountable public honor, not biological improvement or living-system optimization.
- Azorius / WU: PASS. Bant is living community plus champion virtue, not law/procedure/surveillance.
- Green / G: PASS. Bant adds white public order and blue refinement beyond instinctive growth or community.
- White / W: PASS. Bant adds blue expertise and green living belonging beyond order/virtue alone.
- Blue / U: PASS. Bant adds moral public order and green continuity beyond private optimization or abstraction.
- Naya: PASS. Bant does not collapse into creature grandeur or reverence.
- Esper: PASS. Bant does not collapse into control, artifice, hierarchy, or perfected systems.
- Temur: PASS. Bant does not collapse into instinct, wilderness, or embodied tradition.
- Abzan: PASS. Bant does not collapse into kinship/endurance or ancestor obligation.
- Jeskai: PASS. Bant does not collapse into discipline, insight, or personal practice absent public champion service.
- Grixis: PASS. Bant does not collapse into ambition, control, or resource extraction.
- Jund: PASS. Bant does not collapse into predation or ruthless natural hierarchy.
- Sultai: PASS. Bant does not collapse into exploitation, ambition, or resource advantage.
- Five-color / WUBRG: PASS. Bant is not complete-system plurality.
- Generic good-stuff: PASS. Bant is not "best cards" optimization.
- Generic balance: PASS. Bant is not balanced color synthesis.
- Generic overfit: PASS. Bant is not "the best of White, Blue, and Green."

## Fixture, Collision, Preview, and Consumers

Fixture path reviewed: `research/fixtures/semantic-readiness/bant.semantic-fixtures.json`.

Fixture result:

- Fixture cases: 21.
- Core inclusion, mature/pressure, nearest ambiguity, neighbor/generic exclusions, stale/generic risk, provenance expectations, preview, collision, and candidate-scope assertions are present and coherent.
- Provenance fixture locator: `data/raw-factions/bant/bant.profile.json#/core_identity`.
- Generated count: 7.
- Fixture count: 7.
- Exact ordered equality: true.
- Duplicate IDs: none.
- Missing IDs: none.
- Extra IDs: none.
- Ordered IDs: `bant_claim_0001`, `bant_claim_0002`, `bant_claim_0003`, `bant_claim_0004`, `bant_claim_0006`, `bant_claim_0015`, `bant_claim_0019`.

Collision and placement:

- Raw collision structure and generated collision output are deterministic and source-bounded.
- Raw dormant Naya/Jund draft IDs remain preserved as native history; active generated collision rows use the Gate 3 owners.
- Generated collision order: `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `NAYA`, `JUND`, `ABZAN`, `TEMUR`, `SULTAI`, `JESKAI`, `W`, `U`, `G`, `WUBRG`.
- Generated lateral targets unchanged from base: `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `ABZAN`, `TEMUR`, `SULTAI`.
- Native faction, question, axis, and retained collision IDs are preserved.

Preview:

- `data/identity-layers.json#/expressions/BANT/preview_text` equals `data/factions.json#/identity_layers/expressions/BANT/preview_text`.
- Preview text: "Bant treats excellence as honorable when it remains answerable to the whole. Its order is not merely procedure; it is public trust, refined discipline, and a living community choosing which champion can carry its hope."
- Semantic alignment: PASS.
- Stale active preview: none found.

Active consumed surfaces:

- Home consumer: PASS. Active Home path reads generated `data/factions.json` / identity-layer data.
- Archscry consumer: PASS. Active Archscry path reads generated placement/faction/identity data.
- Recruiter consumer: PASS. `supabase/functions/guild-recruiter/faction-context.ts` BANT context matches the narrowed public champion and accountable-community framing.
- Tests and CI consumers: PASS. Source-generated and semantic-readiness checks exercise the active surfaces.

Established exclusions retained:

- `outputs/mtgdata-v3-enhanced/*.inspect.ndjson`: DEBUG_INSPECTION_ARTIFACT.
- `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js`: HISTORICAL_ARCHIVE.

DRIFT-015 result: PASS. DRIFT-016 result: PASS. DRIFT-017 result: PASS.

## Frozen-Field and Non-Bant Integrity

- Frozen placement confidence: PASS, remains `Medium` in raw placement; generated confidence remains absent/null as before.
- Placement score, weights, thresholds, confidence/calibration values: PASS, no unauthorized drift found.
- Candidate-scope/native IDs: PASS.
- Axis IDs unchanged: `axis_communal_order_vs_private_excellence`, `axis_champion_focus_vs_go_wide_belonging`, `axis_refined_order_vs_instinctive_growth`, `axis_protection_vs_prison`, `axis_living_community_vs_artificial_perfection`.
- Question IDs unchanged: `q_bant_0001`, `q_bant_0002`, `q_bant_0003`.
- Non-Bant raw claims, generated identities, previews, provenance, schemas, validators, builders, package, CI, Hall, Crucible, scoring, runtime, and scheduling: PASS, no unauthorized semantic or infrastructure change found.

## Validation

Commands and results:

- `git status --short --branch`: exit 0; clean review worktree before governance edits.
- `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`: exit 0; candidate scope passed.
- `node research\validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`: exit 1 as expected; `Unknown identity WUG`.
- `node research\semantic-candidate-scope-tests.js`: exit 0; tests passed.
- `node research\audit-semantic-readiness.mjs --targets=BANT`: exit 0; 21 claims, 16 substantive, 5 support, 0 discovery, 0 unclassified.
- `node research\validate-semantic-readiness.mjs --targets=BANT`: exit 0; validation passed.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=BANT`: exit 0; fixture validation passed.
- `node research\build-semantic-readiness-provenance.mjs --check`: exit 1 in the Windows review worktree because checkout expanded the generated LF blob to CRLF. Follow-up blob comparison proved generator output exactly equals the committed Git blob; normalized worktree content also matches. Classified as informational line-ending limitation, not a candidate defect.
- `npm.cmd run test:semantic-readiness`: exit 1 only through the same worktree CRLF provenance check. The contract, candidate-scope, fixture, and target validation subchecks passed before that line-ending-only failure.
- `npm.cmd run test:parser`: exit 0; 226 parser cases passed.
- `npm.cmd run test:placement`: exit 0; 37 factions, 37 golden paths passed.
- `npm.cmd run test:faction-context-isolation`: exit 0; isolation test passed.
- `npm.cmd run test:source-generated -- --targets=BANT`: exit 0; BANT passed with one model-owned inhibitor warning. The warning is non-blocking because the source-generated validator permits one model-owned inhibitor in non-strict mode and the raw Bant negative patterns independently cover the same risk.
- `npm.cmd run test:source-generated`: exit 0; unrelated existing JESKAI and MARDU model-owned inhibitor warnings observed and unchanged; no BANT failure hidden.
- `git diff --check`: exit 0.
- JSON parse checks for all changed candidate JSON files: exit 0.
- Evidence-locator existence, bounded-evidence, canonical-ID, pointer, fixture-quality, collision, preview equality, consumer alignment, frozen-field, and role/isolation scripts: exit 0 or PASS by explicit inspection.

Exact-candidate export:

- Export path: `C:\Users\obake\AppData\Local\Temp\vm522-exact-export-5522e849-20260720000726`.
- Export source: `git archive` from exact object `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`.
- Supplied dependency: junctioned `node_modules` from `C:\dev\mtgSiteWIP-crit001\node_modules`.
- Supplied test input: copied known untracked `data/scryfall/raw/oracle-cards.json`.
- `npm.cmd test` in exact export: exit 0.
- Provenance line-ending reproducibility: generator output exactly equals committed Git blob; exported/worktree text differs only by CRLF checkout expansion under repository line-ending behavior; normalized equality true.

## Review Matrix

Totals:

- Total controls: 36.
- PASS: 36.
- FAIL: 0.
- UNKNOWN: 0.
- N/A: 0.

Severity totals:

- CRITICAL: 0.
- MAJOR: 0.
- MINOR: 0.
- INFORMATIONAL: 2.

Control results:

- Exact replacement candidate and base verified: PASS.
- Original rejection independently reproduced: PASS.
- All 22 rejected locator instances reviewed: PASS.
- All 12 missing paths accounted for: PASS.
- All 43 final locators resolve to legitimate tracked bounded evidence: PASS.
- No source invention or substitution: PASS.
- MTG Wiki source-title clarification: PASS.
- All 28 provenance repairs reviewed: PASS.
- Zero required null canonical IDs: PASS.
- Provenance ownership valid and deterministic: PASS.
- Substantive claims supported: PASS.
- Support records scoped: PASS.
- Semantic model coherent: PASS.
- Generic and aesthetic overfit rejected: PASS.
- Required neighbors distinguished: PASS.
- Fixture quality and exact chain: PASS.
- Collision structure and ordering: PASS.
- Preview and active consumers: PASS.
- DRIFT-015: PASS.
- DRIFT-016: PASS.
- DRIFT-017: PASS.
- Frozen fields unchanged: PASS.
- Non-Bant integrity: PASS.
- Exact-SHA candidate-scope command: PASS.
- Invalid WUG check: PASS.
- Semantic-readiness target validation: PASS.
- Fixture validation: PASS.
- Parser test: PASS.
- Placement test: PASS.
- Faction-context isolation: PASS.
- Source-generated BANT guardrail: PASS with non-blocking warning.
- Exact-candidate export full test: PASS.
- Git diff whitespace check: PASS.
- Review-worktree provenance check: PASS by Git-blob determinism despite CRLF worktree command exit 1.
- Table Talk exclusion: PASS.
- Protected worktrees untouched: PASS.
- No VM-523 work: PASS.

Informational observations:

- Worktree `build-semantic-readiness-provenance.mjs --check` reports a stale generated file in Windows checkout because `data/semantic-readiness-provenance.json` is checked out CRLF while the committed blob and generator output are LF-exact. The committed candidate object is deterministic.
- `test:source-generated -- --targets=BANT` reports one non-strict model-owned inhibitor warning, but no BANT failure; manual inspection found the guardrail consistent with raw negative patterns.

Approval-blocking findings: none.

## Files Reviewed

Candidate and generated surfaces reviewed:

- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/bant.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Governance/source context reviewed:

- Root `AGENTS.md`
- CRIT-001 playbook, contract, amendment, drift template, drift register, candidate-scope validator/tests.
- VM-522 preflight, Gate 1+2, Gate 3+4, original candidate, rejection, and replacement workflow handoffs.
- VM-522 card and board.
- Relevant source artifacts referenced by repaired locators.

## Files Changed

Governance-only files changed by this review record:

- `docs/handoffs/2026-07-20-0013-codex-vm522-bant-replacement-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`
- `docs/kanban/board.md`

No candidate semantic, generated, fixture, provenance, source, runtime, schema, validator, builder, package, CI, historical/debug/archive, Excel, original-main, campaign-worktree, prior-review-worktree, DRIFT-017, VM-542/DRIFT-019 residual, Table Talk, certification, or VM-523 file was changed.

## Next Suggested Agent

Certification-only agent for VM-522 after this review-record commit, restricted to certifying exact approved candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8` and preserving the prior rejection history.

APPROVE EXACT SHA 5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8

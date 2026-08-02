# Gate A Implementation File Plan

This is implementation-ready design input, not authorization to edit production files. The smallest safe approach centralizes additive public-state derivation and keeps scoring/data paths untouched.

## Production file plan

| Path | Current responsibility | Exact later change / fields | Compatibility risk and required tests | Visual review |
|---|---|---|---|---|
| `archscry/index.html` | Landing/Quick/Terminal/Result mounts and script order. | Change public “adjacent fits”/model promise; add no new data writer. Preserve element/script IDs and route. | Low; landing copy and boot smoke, accessibility heading check. | Yes: landing mobile/desktop. |
| `assets/js/adaptive-placement.js` | Scores answers, suppression/inhibition, selection/stopping, ranks, serializes result/decree/`mana_scores`. | **NO CHANGE EXPECTED.** Do not alter questions, deltas, scores, shares, gaps, stopping, `decree`, matches, versions, or `mana_scores`. Unsafe stored copy is contained at render time. | Critical if touched; numeric golden-path snapshots and 37-identity reachability must remain identical. | No scoring visual change. |
| `assets/js/shared.js` | Normalizes results, cache/profile persistence, legacy synthesis, OAuth save/return. | Preserve every existing field; stop fabricating missing legacy confidence; preserve supplied numeric values; add/preserve approved state fields; unknown/legacy normalization; no schema migration. Reads/writes complete result, legacy columns, cache/pending/profile. | High; session/profile/OAuth/saved/legacy round-trips, field-shape snapshots, missing vs supplied confidence. | Yes: saved/legacy notices. |
| `assets/js/archscry-presentation.js` | Public identity/reason/contrast/signal copy and Maze context/reading ID. | Add pure bounded state/copy helpers; retire public `confidencePercent`/band usage; constrain hero/signal copy to evidence; preserve internal reading-ID numeric behavior and Maze parameters. Reads result/matches/trail; writes no stored score. | High; no public percent/Bayesian/false adjacency; reading ID and Maze URL snapshots unchanged. | Yes: reveal/summary/alternative. |
| `assets/js/index.js` | Quick UI, reveal, dossier HTML, state/navigation, persistence calls, recommendations/links/Maze handoff. | Render additive state banner/card; replace Signal Strength; conditionally render rank-two Close alternative; hide rank three; qualify Why/Signals/recommendations/table text; guard direct alternative URL; keep original result. | High; quiz 7/8/Back/change, all states, dossier tabs, alternative return, deck links, Maze, keyboard, console. | Yes: all affected desktop/mobile panels. |
| `assets/js/commander-dossier.js` | Builds dossier, omens, summary strip, recommendation and alternative structures, text/audit; carries `decreeCopy` without a current browser/text/audit presentation consumer. | Preserve `decreeCopy` structurally; do not add a new decree surface. Make close summary optional; remove public numeric bands/adjacency labels; qualify recommendation/table bridges. Preserve `manaAlignment`, links, candidates. | High; dossier object compatibility, primary/alternative, text/audit outputs, recommendation/deck link snapshots. | Yes: Placement/Why/Start/Alternative. |
| `assets/js/dossier-radar.js` | Renders and initializes authored identity Matrix. | **NO CHANGE EXPECTED** except only if owner-approved note placement cannot be achieved outside it. Never change resolved data. | Critical; all-identity authored array, active alternative, canvas/fallback/component checks. | Yes: Matrix mobile/desktop. |
| `assets/js/vm-radar.js` | Canonical runtime Matrix resolver, axes, authored/component fallback, note. | **NO NUMERIC CHANGE EXPECTED.** Existing note already distinguishes authored profile/raw ledger; wording may be tightened only if required. | Critical; exact axes/data/scoreSource snapshots. | Yes if note changes. |
| `assets/js/graph.js` | Vendored Chart.js runtime. | **PROTECTED — NO CHANGE.** | Any diff blocks Gate A. Existing canvas smoke only. | No. |
| `assets/js/archscry-result.js` | Re-export/compatibility surface. | **NO CHANGE EXPECTED.** Preserve exports. | Import smoke. | No. |
| `assets/js/quick-reading.js` | Older/parallel quick-reading implementation and fixtures. | **NO CHANGE EXPECTED** unless a proven live consumer exists; do not merge legacy model paths in Gate A. | Source/generated/route inventory check. | No. |
| `assets/css/archscry.css` | Result, summary, alternative, Matrix, tabs, mobile/focus styling. | Replace strength-meter styling with state banner/card; close/notice styles; preserve Matrix sizes and focus/tab behavior. | Medium; desktop/mobile overflow, focus visibility, reduced motion. | Yes. |
| `assets/js/deck-links.js`, `assets/js/deck-link-service.js` | Private/external deck-link logic. | **NO CHANGE EXPECTED.** Only surrounding qualification in `index.js` changes. | Deck-link URL/context tests and signed-out behavior. | Spot check only. |
| `assets/js/maze-handoff.js`, `research/maze-*`, `maze/index.html` | Maze query/handoff/return consumers. | **NO CHANGE EXPECTED.** Preserve payload/URL/context; validate round-trip. | Maze handoff and return tests. | Spot check return only. |
| `data/identity-layers.json`, `data/placement-model.json`, `data/factions.json`, `data/raw-factions/**` | Canonical/generated identity/model/data. | **PROTECTED — NO CHANGE.** | Any diff blocks Gate A. | No. |
| `docs/supabase-profile-update.sql` and production schemas | Profile columns/contracts. | **PROTECTED — NO MIGRATION.** | Profile save/load against existing shape. | No. |

## Later test files likely to change

Tests are part of a later implementation slice, not this design commit:

- `assets/js/quick-reading-tests.js`: numeric invariance, state resolver, 7/8/Back/change paths.
- `research/archscry-dossier-followup-tests.js`: public language, state card, dossier/recommendation/Matrix contract.
- `research/archscry-adjacent-navigation-tests.js`: renamed close alternative, eligibility, rank-three suppression, return preservation.
- `research/maze-search-tests.js`: handoff/return and `mana_scores` compatibility.
- `assets/js/deck-links-tests.js`: deck-link context unchanged.
- `scripts/visual-regression-archscry.mjs`: later capture additions for reveal/state/legacy/close at desktop/mobile; do not create/accept baselines without owner review.

## Accepted 37-row consumer-map coverage

Every row from `docs/audits/vm551-placement-system/result-field-consumer-map.csv` is dispositioned below.

| Field/family | Accepted disposition | Gate A design treatment |
|---|---|---|
| `identity_scores` | PRESERVE-INTERNAL-HIDE-PUBLICLY | Keep scoring/ranking/replay values identical; no public ledger/strength claim. |
| `softmax_share_probability` | PRESERVE-INTERNAL-HIDE-PUBLICLY | Keep ranking/stopping/`buildManaScores`; hide percentage/probability interpretation. |
| `confidence` | PRESERVE-INTERNAL-HIDE-PUBLICLY | Preserve supplied field/value/shape; missing legacy is unknown; no public number. |
| `confidence_gap` | PRESERVE-INTERNAL-HIDE-PUBLICLY | Preserve and read only for approved relative display heuristic; never calibrate or render. |
| `mana_scores` | PRESERVE-UNCHANGED | Keep computation, W/U/B/R/G shape, serialization, profile and dossier consumers. |
| `decree` | PRESERVE-UNCHANGED | Keep stored field/text and dossier-carried copy for compatibility; bound only proven public reveal use and do not invent a dossier consumer. |
| `color_weights` | PRESERVE-UNCHANGED | Preserve optional field when supplied; never fabricate or assign public meaning. |
| `authored_preview_scores` | PRESERVE-UNCHANGED | Keep `identity-layers.json` source and authored Matrix values/resolver unchanged. |
| `authored_matrix_component_averages` | PRESERVE-UNCHANGED | Keep fallback profiles/averaging/score source unchanged. |
| `top_matches` | PRESERVE-UNCHANGED | Keep three ranked entries/fields/order; public state chooses bounded subset. |
| `adjacent_matches` | PRESERVE-INTERNAL-HIDE-PUBLICLY | Keep ranks two/three structurally; show only eligible rank two as Close alternative. |
| `primary_identity_id_name` | PRESERVE-UNCHANGED | Keep stored primary; public label varies by state without overwriting identity. |
| `result_status` | ADDITIVE-EXTENSION | Add bounded state fields/version; missing fields normalize safely. |
| `evidence_trail` | PRESERVE-UNCHANGED | Read for answer-grounded copy/direct support; do not rewrite deltas or infer provenance. |
| `stage_trail` | PRESERVE-UNCHANGED | Keep `stage_history`; read completion/Crucible context only. |
| `selected_answers` | VERSIONED-MIGRATION-LATER | Do not add persistence/migrate in Gate A; use current in-memory/trail evidence only. |
| `question_ids` | PRESERVE-UNCHANGED | Preserve current asked IDs; no stable-ID refit. |
| `answer_ids` | VERSIONED-MIGRATION-LATER | No Gate A migration; record explicit missing ID where relevant. |
| `model_version` | PRESERVE-UNCHANGED | Keep exact field/value; additive public `model_kind` must not replace it. |
| `result_schema_version` | PRESERVE-UNCHANGED | Keep `version`; additive compatibility version only. |
| `source_evidence_version` | VERSIONED-MIGRATION-LATER | No Gate A provenance/version migration. |
| `source_mode` | PRESERVE-UNCHANGED | Preserve quick/interview/legacy mode; use to qualify legacy/unknown rendering. |
| `adaptive_stopping_inputs` | PRESERVE-UNCHANGED | No change to stage counts, gaps, collision logic, question count, or finish decision. |
| `session_cache` | PRESERVE-UNCHANGED | Complete-result round-trip plus additive fields; no destructive normalization. |
| `profile_persistence` | PRESERVE-UNCHANGED | Existing legacy columns and `placement_result` remain; no SQL change. |
| `saved_reading` | PRESERVE-UNCHANGED | Same identity/numeric data; public state/notice survives save/load. |
| `legacy_result_normalization` | PRESERVE-INTERNAL-HIDE-PUBLICLY | Stop fabricated public confidence; preserve legacy identity/scores and compatible shape. |
| `oauth_return_state` | PRESERVE-UNCHANGED | Pending result, save, event, and restored state remain complete and deterministic. |
| `recommendation_context` | PRESERVE-UNCHANGED | Keep candidates/tags/colors/links; qualify public recommendation relationship only. |
| `deck_link_context` | PRESERVE-UNCHANGED | Keep private/external link identity/result context and URLs unchanged. |
| `matrix_radar_input` | PRESERVE-UNCHANGED | Keep active identity key, authored profile, axes, component fallback, and rendering. |
| `placement_result_mana_alignment` | PRESERVE-UNCHANGED | Keep `mana_scores` → dossier `manaAlignment` values and consumers unchanged. |
| `maze_placement_context` | PRESERVE-UNCHANGED | Keep full result, reading ID, guild/source/fit/query/return URL contract. |
| `return_to_dossier_context` | PRESERVE-UNCHANGED | Keep active original result and return URL/panel/anchor behavior. |
| `starter_profile` | PRESERVE-UNCHANGED | Keep format/budget/experience shape and recommendation inputs; no new inference. |
| `placement_result_aggregate` | PRESERVE-UNCHANGED | Preserve complete object and unknown extra fields through every writer/reader. |
| `additive_compatibility_fields` | ADDITIVE-EXTENSION | Add only owner-approved states/limitations/version; old readers and missing fields remain safe. |

Coverage invariant: 37 accepted rows, 37 design rows; no `UNRESOLVED-BLOCKER`, removal, rename, or destructive migration enters Gate A.

## Required implementation stop checks

- If any protected production/data/schema file requires a semantic or numeric edit, stop and reclassify scope with the owner.
- If a current writer/reader cannot preserve an additive state without a migration, stop; migration is not Gate A.
- If mixed/contradictory/insufficient needs minimum-hit, dependency, provenance, or questionnaire repair, defer to Gate B1.
- If a requested alternative cannot be justified by the approved close rule, omit it rather than invent adjacency.

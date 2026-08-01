# VM-551 Gate A Downstream Compatibility Contract

Status: documentation-only implementation boundary; no implementation planning or production change is authorized

Authority: this contract supplements and is governed with `bounded-mvp-repair-plan.md` and `requirements-traceability-matrix.csv`. Those three artifacts are the controlling Gate A compatibility boundary. Narrative summaries must agree with them.

## Gate A boundary

Gate A changes public interpretation and rendering only. It removes public claims that an internal number is calibrated confidence, probability of correctness, identity accuracy, or scientifically meaningful strength. It does not authorize removing, renaming, reinterpreting, zeroing, or destructively migrating internal numeric values or serialized placement-result fields.

Unless a later, separately reviewed additive migration authorizes a change, Gate A preserves:

- accumulated identity scores, softmax shares or probability-like internal values, top-two gaps, ranking inputs, and adaptive stopping inputs;
- `confidence`, `confidence_gap`, `mana_scores`, `top_matches`, and `adjacent_matches` field names and shapes;
- primary identity fields, stage and evidence trails, model and result versions, and `source_mode`;
- cached session state, profile storage, saved readings, legacy readings, and OAuth return state;
- dossier payloads, recommendation inputs, deck-link context, adjacent-view state, Maze handoff state, and return-to-dossier state.

Internal scores and softmax values remain available for current ranking, adaptive question selection and stopping, deterministic replay, legacy compatibility, and regression testing. Their continued internal existence does not make them calibrated. Public renderers must not present them as confidence, correctness probability, accuracy, or scientific strength.

Existing serialized field names and shapes remain stable in Gate A. A future schema replacement requires a separately authorized additive versioning and migration contract, a complete writer/reader review, compatibility tests, and owner approval. Existing historical results retain their original model/result version and must not be silently reinterpreted.

Legacy missing confidence remains unknown. A normalizer or fallback must not fabricate a numeric value such as `0.66` or `0.6`. This requirement changes the public/normalized certainty treatment, not the stored shape or historical bytes of the original reading.

## Two separate Matrix numeric paths

### Authored Mana Alignment Matrix

`assets/js/dossier-radar.js:getDossierRadarProfile()` delegates to `assets/js/vm-radar.js:resolveRadarProfile()`. The renderer selects identity-layer `preview_scores` when all five authored axes exist; otherwise it averages the authored component profiles. The five axes are Order, Knowledge, Ambition, Freedom, and Growth. `vm-radar.js` labels the source as `preview_scores` or `component_average` and explicitly describes the result as an authored identity matrix, not a raw mana-score ledger.

This visualization is an authored identity shape. It is not a correctness probability, placement confidence, raw placement-score ledger, or calibration result. Gate A must not remove, zero, or hide these authored values merely because public numeric confidence is removed.

### Placement-result mana alignment payload

`assets/js/adaptive-placement.js:buildManaScores()` derives `placementResult.mana_scores` by accumulating ranked softmax shares over identity colors and normalizing each W/U/B/R/G value to the integer range 1–10. `buildAdaptivePlacementResult()` serializes that placement-derived map. `assets/js/shared.js:normalizePlacementResult()` normalizes/caches it and profile persistence writes it both as `scores` and inside `placement_result`. `assets/js/commander-dossier.js:buildManaAlignment()` converts it to the dossier `manaAlignment` array, which is serialized in the dossier object and consumed by text/export and other dossier surfaces.

This path is placement-derived, normalized, cached, serialized, and rendered downstream. It is separate from the authored Matrix path and must not be treated as interchangeable with `preview_scores` or component averages. Gate A preserves this payload and its consumers while prohibiting any public inference that its numbers are calibrated confidence.

## Additive result states

A later authorized Gate A implementation may add fields such as `result_state`, `public_confidence_state`, `alternative_state`, `confidence_display_mode`, `model_kind`, `legacy_result`, `limitations`, and `compatibility_version`. These names are planning examples, not authorization to add them now.

Allowed public result states are `primary`, `tied`, `close`, `mixed`, `contradictory`, `insufficient`, `unknown`, `invalid`, and `incomplete`.

- Existing numeric fields may continue to exist internally.
- New public state fields must be additive.
- Public renderers must prefer bounded state fields when present.
- Old readings must continue to normalize safely when new fields are absent.
- Missing new fields must not trigger fabricated certainty.
- No field may be removed or renamed during Gate A without a separately approved migration.

## Hard planning prerequisite

Gate A implementation planning is prohibited until `result-field-consumer-map.csv` receives independent review and every material field or field family has one of these dispositions:

- `PRESERVE-UNCHANGED`;
- `PRESERVE-INTERNAL-HIDE-PUBLICLY`;
- `ADDITIVE-EXTENSION`;
- `VERSIONED-MIGRATION-LATER`;
- `UNRESOLVED-BLOCKER`.

No field classified `UNRESOLVED-BLOCKER` may enter Gate A implementation planning. An unresolved dynamic or indirect consumer must be recorded as `UNRESOLVED`; it must not be silently treated as absent. No destructive removal or rename belongs in Gate A.

Independent review must reconcile writers and readers for cache round-trip, profile round-trip, saved legacy reading, OAuth return, primary dossier, alternative/adjacent view, recommendations, deck links, authored Matrix rendering, placement-result mana alignment rendering, Maze handoff, and return-to-dossier state before implementation planning can be authorized.

## Non-authorization

This contract does not authorize implementation, implementation planning, task creation, schema work, migration, integration, merge, push, deployment, or certification.

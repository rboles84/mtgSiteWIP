# Matrix Compatibility Plan

## Two independent numeric paths

### Authored Mana Alignment Matrix

Canonical source: `data/identity-layers.json:expressions.*.preview_scores`
Runtime resolver: `assets/js/vm-radar.js:resolveRadarProfile()`
Archscry renderer: `assets/js/dossier-radar.js`
Chart engine: `assets/js/graph.js`

The fixed axes are Order, Knowledge, Ambition, Freedom, and Growth. When an identity lacks `preview_scores`, `vm-radar.js` uses authored mono component-average fallback. Placement chooses which identity is viewed; placement scores do not supply these axis values.

This path is an authored editorial identity shape. It is not:

- a probability of correctness;
- placement confidence;
- the raw placement score ledger;
- a softmax output;
- an empirical calibration result.

Gate A must not remove, zero, rescale, rename, or hide these values merely because public numeric confidence is removed. Existing Matrix trait words such as “Strong” describe an authored axis tier, not result strength; the Matrix explanation must make that separation visible.

### Placement-derived mana alignment

Source/computation: `assets/js/adaptive-placement.js:buildManaScores()`
Serialized field: `placementResult.mana_scores`
Normalization/persistence: `assets/js/shared.js:normalizePlacementResult()` and profile `scores`/`placement_result`
Dossier normalization: `assets/js/commander-dossier.js:buildManaAlignment()`

This path is derived from ranked placement shares, normalized to the existing W/U/B/R/G 1–10 payload. It is serialized, cached, saved, restored, and exposed in dossier text/audit and other downstream data consumers. It does not set the visible authored Matrix radar axes.

Gate A preserves this field/value path unchanged. It does not relabel it confidence, replace it with authored `preview_scores`, or use it to infer a public result state.

## Required public explanation

Recommended Matrix note:

> This chart is an authored identity profile across Order, Knowledge, Ambition, Freedom, and Growth. It describes the identity currently being viewed; it is not your placement score, a confidence percentage, or a probability of correctness.

When an alternative is viewed:

> The chart now shows the authored shape of the comparison identity. Your original placement scores and result remain unchanged.

## Protected files/data

| Path | Gate A rule |
|---|---|
| `data/identity-layers.json` | No change. Canonical `preview_scores` remain authored authority. |
| `data/placement-model.json` | No change. No weights, gaps, stopping, or identity map changes. |
| `assets/js/adaptive-placement.js:buildManaScores()` | No change. |
| `assets/js/vm-radar.js` | No numeric/resolver change expected; public note may already satisfy contract. |
| `assets/js/dossier-radar.js` | No data-path change expected. |
| `assets/js/graph.js` | No change; vendored chart engine contains no Vox Mana placement data. |
| `assets/js/commander-dossier.js:buildManaAlignment()` | Preserve computation/output; surrounding explanation may change. |
| `assets/js/shared.js` | Preserve `mana_scores` and profile `scores` round-trip. |

## Exact regression checks

1. For every identity with authored `preview_scores`, resolve the five-axis array before and after Gate A and assert equality.
2. For fallback-only fixture, assert component-average data and `scoreSource: component_average` remain unchanged.
3. Assert axes remain exactly `Order / Knowledge / Ambition / Freedom / Growth` in order.
4. Assert the primary dossier’s radar selects the stored primary identity.
5. Assert an eligible alternative view selects only that identity’s authored profile and returning restores the primary profile.
6. Assert hiding public confidence leaves the canvas, fallback, controls, component overlay, axis details, and authored numeric values visible.
7. Run a fixed answer path and assert `mana_scores` before/after Gate A are identical for W/U/B/R/G.
8. Assert `normalizePlacementResult()`, session cache, profile save/load, OAuth pending result, saved reading, and legacy record preserve supplied `mana_scores`.
9. Assert `buildCommanderDossier().manaAlignment` remains five entries with unchanged values.
10. Assert Matrix note contains authored-shape and not-confidence distinctions; it must not call `mana_scores` the authored radar.
11. Assert no result-state function reads Matrix axes as evidence or writes either numeric path.
12. At desktop and mobile, confirm Matrix does not disappear, clip, or become mislabeled when state/limitation UI is added.

No visual baseline is created or accepted during design. Future visual owner QA is required after implementation.

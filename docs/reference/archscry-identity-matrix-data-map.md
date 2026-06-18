# Archscry Identity Matrix Data Map

Date: 2026-06-13
Related card: VM-364
Updated: 2026-06-16 for VM-407

This note maps the Archscry placement-page Identity Matrix radar:

```html
<canvas id="dossierManaRadar" aria-label="Vox Mana placement radar chart"></canvas>
```

## Short Answer

`assets/js/graph.js` does not contain Vox Mana placement data. It is the vendored Chart.js runtime. It provides `globalThis.Chart`, which `assets/js/dossier-radar.js` uses to draw the radar.

As of VM-407, the radar's numbers come from the shared `assets/js/vm-radar.js` resolver reading `data/identity-layers.json` `expressions[activeKey].preview_scores` in fixed axis order. Placement determines which faction/profile is currently being viewed. `dossier-radar.js` passes that active faction key plus the already-loaded `identityLayers` object into `VMRadar.resolveRadarProfile()`.

Fallback averaging still exists, but only for missing `preview_scores`. It averages the shared W/U/B/R/G component profiles in `assets/js/vm-radar.js`. The intended live path is registry-backed `preview_scores` for every previewable/placement identity.

Layer 1 provides the active runtime identity records, placement model, and identity registry context. Layer 2 research does not feed the chart at runtime unless it has already been promoted into Layer 1 source/raw data and rebuilt into runtime artifacts.

## Runtime Path

1. `archscry/index.html` loads `../assets/js/graph.js`, then `../assets/js/vm-radar.js`, then `../assets/js/index.js`.
2. `graph.js` exposes the Chart.js constructor as `globalThis.Chart`.
3. `vm-radar.js` exposes shared radar constants, helpers, plugins, and `VMRadar.resolveRadarProfile()` on `globalThis.VMRadar`.
4. `index.js` loads:
   - `data/factions.json`
   - `data/placement-model.json`
   - `data/identity-layers.json`
   - optional discovery/snippet data
5. The user answers the Archscry questions.
6. `assets/js/adaptive-placement.js` turns those answers plus `placement-model.json` into a placement result.
7. `assets/js/index.js` renders the result, builds the commander dossier, chooses the active viewed faction, and inserts the radar section markup with `identityLayers`.
8. `assets/js/dossier-radar.js` resolves the active faction through `VMRadar.resolveRadarProfile(activeKey, identityLayers, faction)`.
9. `initDossierManaRadar()` creates a Chart.js radar chart on `#dossierManaRadar`.

## What Each Piece Feeds

| UI/data component | Runtime source | What it contributes to the radar |
|---|---|---|
| Canvas mount | `assets/js/dossier-radar.js` via `renderDossierRadarSection()` | Emits `#dossierManaRadar` and fallback container into the placement dossier panel. |
| Chart engine | `assets/js/graph.js` | Provides Chart.js only. No Vox Mana data, no placement logic, no Layer 1 or Layer 2 parsing. |
| Radar axes | `VMRadar.AXIS_LABELS` in `assets/js/vm-radar.js` | The five labels: `Order`, `Knowledge`, `Ambition`, `Freedom`, `Growth`. |
| Active radar identity | `assets/js/index.js` active view state plus `faction.key` from `data/factions.json` | Selects which identity's profile to show. Adjacent dossier tabs switch this key before the radar initializes. |
| Primary placement fallback | `placementResult.faction` from `assets/js/adaptive-placement.js` | Used only if no active viewed faction is passed. It chooses a profile key; it does not provide the radar scores. |
| Direct radar scores | `data/identity-layers.json` `expressions[activeKey].preview_scores` via `VMRadar.resolveRadarProfile()` | Authored composite score arrays for the active identity in fixed axis order. |
| Fallback radar scores | `VMRadar.COMPONENT_PROFILES` plus `faction.colors` from `data/factions.json` | Used only if the active registry expression is missing `preview_scores`; averages W/U/B/R/G component scores axis by axis. |
| Component overlays | `VMRadar.COMPONENT_PROFILES` plus normalized active identity components | Draws optional dashed W/U/B/R/G component lines under the composite. |
| Composite fill/color | Resolved radar profile in `assets/js/vm-radar.js` | Uses `preview_hex` when available, with ash Black display color from the shared component map. |
| Identity Reading panel | Resolved radar profile plus `factions.json` lore/tension | Displays Selected Synthesis/Profile, registry-backed title/text, component dots, lore, core tension, Strategium detail, trait rows, and the authored matrix note. |
| Card voices below matrix | `archscry-flavor-snippets.json` via `index.js`, rendered by `dossier-radar.js` | Supporting card-voice panel only. It does not change chart labels or scores. |
| Dossier record | `buildCommanderDossier()` in `assets/js/commander-dossier.js` | Supplies surrounding dossier context and the active `faction.record`; it does not calculate radar score arrays. |
| Placement `mana_scores` | `buildManaScores()` in `assets/js/adaptive-placement.js` | Used by the broader dossier data model, but not consumed by `dossier-radar.js` for this canvas. |
| Placement ranking fields | `top_matches`, `adjacent_matches`, confidence, evidence trail | Drive placement/dossier context and adjacent choices. They do not directly set radar axis values. |
| Layer 1 identity registry | `data/identity-layers.json` | Runtime identity registry and current radar score authority through `preview_scores`. |
| Layer 1 source/raw packets | `data/raw-factions/<faction>/` | Source material used by the builder for display and placement artifacts. They do not directly feed the chart at runtime. |
| Layer 1 generated runtime surfaces | `data/factions.json`, `data/placement-model.json` | `factions.json` gives active names/colors/keys; `placement-model.json` drives the adaptive placement result. Neither directly stores the final radar datasets for this chart. |
| Layer 2 research/docs | `docs/research/**` and related authored research notes | No direct runtime feed into `#dossierManaRadar`. Research affects the chart only after source-approved promotion into Layer 1 inputs and rebuilds. |

## Registry Profiles And Fallback Profiles

Axis order is always `Order / Knowledge / Ambition / Freedom / Growth`.

The live score path is:

1. Resolve active key from the viewed faction (`faction.key`) or placement result fallback (`placementResult.faction`).
2. Read `identityLayers.expressions[activeKey].preview_scores`.
3. Return `[order, knowledge, ambition, freedom, growth]`.
4. If a score block is missing, average the shared mono component profiles as a last-resort fallback.

Example: `TEMUR.preview_scores` resolves to `45 / 60 / 44 / 63 / 71` for `Order / Knowledge / Ambition / Freedom / Growth`. The VM-407 placement regression asserts this exact array and also asserts that Home and Archscry resolve identical arrays for every preview-eligible registry expression with `preview_scores`.

## Placement Fields That Do Not Set Radar Values

The adaptive placement result includes fields that matter elsewhere in the page, but do not set the radar dataset values:

- `mana_scores`
- `top_matches`
- `adjacent_matches`
- `confidence`
- `confidence_gap`
- `evidence_trail`
- `stage_history`
- `starter_profile`
- `reason`

For the Identity Matrix canvas, these fields are upstream context. The chart scores are resolved from the active faction key and `identity-layers.json` `preview_scores` through `VMRadar.resolveRadarProfile()`.

## Layer 1 And Layer 2 Boundary

Layer 1 is the live product/data layer:

- `data/raw-factions/<faction>/` source packets
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- builder outputs from `research/build-faction-artifacts.mjs`

For this radar, Layer 1 contributes the active identity key, name, colors, preview title/text, `preview_scores`, and placement path that gets the user into a faction result.

Layer 2 is research/authoring context. It should be treated as archival/reference material unless promoted into Layer 1 according to the source/generated guardrails. No `docs/research/**` file is fetched by the Archscry runtime for this chart.

## If The Radar Needs To Change

Current implementation path:

- Change radar scores/title/text in the Layer 1 source that produces or owns `data/identity-layers.json` `preview_scores`, `preview_title`, and `preview_text`.
- Change shared component fallback behavior in `assets/js/vm-radar.js` only if the fallback mono profiles themselves are part of the intended product change.
- Keep `assets/js/dossier-radar.js` focused on rendering the Archscry panel and `assets/js/home.js` focused on the Home visual-only signal.

Do not edit `graph.js` to change Vox Mana data. Do not directly edit `data/factions.json` or `data/placement-model.json` expecting the chart scores to change; those are generated/runtime surfaces and do not own the radar score arrays.

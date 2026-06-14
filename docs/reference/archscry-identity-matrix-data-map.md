# Archscry Identity Matrix Data Map

Date: 2026-06-13
Related card: VM-364

This note maps the Archscry placement-page Identity Matrix radar:

```html
<canvas id="dossierManaRadar" aria-label="Vox Mana placement radar chart"></canvas>
```

## Short Answer

`assets/js/graph.js` does not contain Vox Mana placement data. It is the vendored Chart.js runtime. It provides `globalThis.Chart`, which `assets/js/dossier-radar.js` uses to draw the radar.

The radar's numbers come from `assets/js/dossier-radar.js`, not directly from the adaptive placement `mana_scores` result. Placement determines which faction/profile is currently being viewed. `dossier-radar.js` then resolves that active faction to either:

1. An authored radar profile in `DOSSIER_RADAR_PROFILES`.
2. A fallback average of hardcoded mono-color component profiles in `DOSSIER_COLOR_PROFILES`.

Layer 1 provides the active runtime identity records, placement model, and identity registry context. Layer 2 research does not feed the chart at runtime unless it has already been promoted into Layer 1 source/raw data and rebuilt into runtime artifacts.

## Runtime Path

1. `archscry/index.html` loads `../assets/js/graph.js`, then `../assets/js/index.js`.
2. `graph.js` exposes the Chart.js constructor as `globalThis.Chart`.
3. `index.js` loads:
   - `data/factions.json`
   - `data/placement-model.json`
   - `data/identity-layers.json`
   - optional discovery/snippet data
4. The user answers the Archscry questions.
5. `assets/js/adaptive-placement.js` turns those answers plus `placement-model.json` into a placement result.
6. `assets/js/index.js` renders the result, builds the commander dossier, chooses the active viewed faction, and inserts the radar section markup.
7. `assets/js/dossier-radar.js` resolves the active faction to a radar profile.
8. `initDossierManaRadar()` creates a Chart.js radar chart on `#dossierManaRadar`.

## What Each Piece Feeds

| UI/data component | Runtime source | What it contributes to the radar |
|---|---|---|
| Canvas mount | `assets/js/dossier-radar.js` via `renderDossierRadarSection()` | Emits `#dossierManaRadar` and fallback container into the placement dossier panel. |
| Chart engine | `assets/js/graph.js` | Provides Chart.js only. No Vox Mana data, no placement logic, no Layer 1 or Layer 2 parsing. |
| Radar axes | `DOSSIER_RADAR_AXES` in `assets/js/dossier-radar.js` | The five labels: `Order`, `Knowledge`, `Ambition`, `Freedom`, `Growth`. |
| Active radar identity | `assets/js/index.js` active view state plus `faction.key` from `data/factions.json` | Selects which identity's profile to show. Adjacent dossier tabs switch this key before the radar initializes. |
| Primary placement fallback | `placementResult.faction` from `assets/js/adaptive-placement.js` | Used only if no active viewed faction is passed. It chooses a profile key; it does not provide the radar scores. |
| Direct radar scores | `DOSSIER_RADAR_PROFILES` in `assets/js/dossier-radar.js` | Authored composite score arrays for mono colors, Ravnica guilds, Strixhaven colleges, Yore, and Colorless. |
| Fallback radar scores | `DOSSIER_COLOR_PROFILES` in `assets/js/dossier-radar.js` plus `faction.colors` from `data/factions.json` | For identities without a direct profile, averages the hardcoded W/U/B/R/G component scores axis by axis. |
| Component overlays | `DOSSIER_COLOR_PROFILES` plus normalized `faction.colors` | Draws optional dashed W/U/B/R/G component lines under the composite. |
| Composite fill/color | Resolved radar profile in `assets/js/dossier-radar.js` | Uses the direct profile hex or the first component color for fallback profiles. |
| Left-side axis list | Resolved radar profile data | Displays the same five numeric values outside the chart. |
| Profile title/text/note | Resolved radar profile in `assets/js/dossier-radar.js` | Explains the identity matrix card beside the chart. |
| Card voices below matrix | `archscry-flavor-snippets.json` via `index.js`, rendered by `dossier-radar.js` | Supporting card-voice panel only. It does not change chart labels or scores. |
| Dossier record | `buildCommanderDossier()` in `assets/js/commander-dossier.js` | Supplies surrounding dossier context and the active `faction.record`; it does not calculate radar score arrays. |
| Placement `mana_scores` | `buildManaScores()` in `assets/js/adaptive-placement.js` | Used by the broader dossier data model, but not consumed by `dossier-radar.js` for this canvas. |
| Placement ranking fields | `top_matches`, `adjacent_matches`, confidence, evidence trail | Drive placement/dossier context and adjacent choices. They do not directly set radar axis values. |
| Layer 1 identity registry | `data/identity-layers.json` | Runtime identity registry and build input. Its first 20 `preview_scores` currently match the hardcoded direct profiles, but the radar reads the local constants in `dossier-radar.js`, not this JSON dynamically. |
| Layer 1 source/raw packets | `data/raw-factions/<faction>/` | Source material used by the builder for display and placement artifacts. They do not directly feed the chart at runtime. |
| Layer 1 generated runtime surfaces | `data/factions.json`, `data/placement-model.json` | `factions.json` gives active names/colors/keys; `placement-model.json` drives the adaptive placement result. Neither directly stores the final radar datasets for this chart. |
| Layer 2 research/docs | `docs/research/**` and related authored research notes | No direct runtime feed into `#dossierManaRadar`. Research affects the chart only after source-approved promotion into Layer 1 inputs and rebuilds. |

## Direct Profiles Vs Fallback Profiles

Axis order is always `Order / Knowledge / Ambition / Freedom / Growth`.

| Key | Identity | Components | Radar source | Scores |
|---|---|---:|---|---|
| W | White | W | Authored direct profile | 96 / 42 / 24 / 30 / 58 |
| U | Blue | U | Authored direct profile | 38 / 98 / 36 / 34 / 54 |
| B | Black | B | Authored direct profile | 30 / 56 / 98 / 62 / 42 |
| R | Red | R | Authored direct profile | 36 / 34 / 58 / 98 / 62 |
| G | Green | G | Authored direct profile | 62 / 48 / 38 / 58 / 98 |
| WU | Azorius Senate | WU | Authored direct profile | 82 / 78 / 28 / 26 / 54 |
| UB | House Dimir | UB | Authored direct profile | 34 / 86 / 76 / 48 / 46 |
| BR | Cult of Rakdos | BR | Authored direct profile | 32 / 48 / 84 / 88 / 48 |
| RG | Gruul Clans | RG | Authored direct profile | 44 / 38 / 48 / 86 / 84 |
| WG | Selesnya Conclave | WG | Authored direct profile | 86 / 44 / 30 / 42 / 84 |
| WB | Orzhov Syndicate | WB | Authored direct profile | 78 / 48 / 78 / 42 / 50 |
| UR | Izzet League | UR | Authored direct profile | 36 / 86 / 46 / 82 / 54 |
| BG | Golgari Swarm | BG | Authored direct profile | 42 / 52 / 82 / 58 / 82 |
| UG | Simic Combine | UG | Authored direct profile | 52 / 84 / 38 / 46 / 88 |
| WR | Boros Legion | WR | Authored direct profile | 84 / 38 / 46 / 82 / 62 |
| SILVERQUILL | Silverquill College | WB | Authored direct profile | 82 / 54 / 74 / 52 / 42 |
| PRISMARI | Prismari College | UR | Authored direct profile | 34 / 78 / 42 / 88 / 58 |
| WITHERBLOOM | Witherbloom College | BG | Authored direct profile | 38 / 46 / 78 / 58 / 88 |
| LOREHOLD | Lorehold College | WR | Authored direct profile | 78 / 48 / 42 / 82 / 64 |
| QUANDRIX | Quandrix College | GU | Authored direct profile | 48 / 88 / 34 / 46 / 84 |
| BANT | Bant | WUG | Fallback average of W/U/G components | 65 / 63 / 33 / 41 / 70 |
| ESPER | Esper | WUB | Fallback average of W/U/B components | 55 / 65 / 53 / 42 / 51 |
| GRIXIS | Grixis | UBR | Fallback average of U/B/R components | 35 / 63 / 64 / 65 / 53 |
| JUND | Jund | BRG | Fallback average of B/R/G components | 43 / 46 / 65 / 73 / 67 |
| NAYA | Naya | RGW | Fallback average of R/G/W components | 65 / 41 / 40 / 62 / 73 |
| ABZAN | Abzan Houses | WBG | Fallback average of W/B/G components | 63 / 49 / 53 / 50 / 66 |
| TEMUR | Temur Frontier | GUR | Fallback average of G/U/R components | 45 / 60 / 44 / 63 / 71 |
| SULTAI | Sultai Brood | BGU | Fallback average of B/G/U components | 43 / 67 / 57 / 51 / 65 |
| MARDU | Mardu Horde | RWB | Fallback average of R/W/B components | 54 / 44 / 60 / 63 / 54 |
| JESKAI | Jeskai Way | URW | Fallback average of U/R/W components | 57 / 58 / 39 / 54 / 58 |
| YORE | Yore / Artifice | WUBR | Authored direct profile | 50 / 58 / 54 / 56 / 54 |
| GLINT | Glint / Chaos | UBRG | Fallback average of U/B/R/G components | 42 / 59 / 58 / 63 / 64 |
| DUNE | Dune / Aggression | BRGW | Fallback average of B/R/G/W components | 56 / 45 / 55 / 62 / 65 |
| INK | Ink / Altruism | RGWU | Fallback average of R/G/W/U components | 58 / 56 / 39 / 55 / 68 |
| WITCH | Witch / Growth | GWUB | Fallback average of G/W/U/B components | 57 / 61 / 49 / 46 / 63 |
| COLORLESS | Colorless | none | Authored direct profile | 50 / 54 / 50 / 46 / 48 |

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

For the Identity Matrix canvas, these fields are upstream context. The chart scores are resolved from the active faction key and `dossier-radar.js` profile constants.

## Layer 1 And Layer 2 Boundary

Layer 1 is the live product/data layer:

- `data/raw-factions/<faction>/` source packets
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- builder outputs from `research/build-faction-artifacts.mjs`

For this radar, Layer 1 contributes the active identity key, name, colors, and placement path that gets the user into a faction result. It does not currently provide the final chart score array dynamically, except indirectly because the first 20 hardcoded direct profiles mirror `identity-layers.json` `preview_scores`.

Layer 2 is research/authoring context. It should be treated as archival/reference material unless promoted into Layer 1 according to the source/generated guardrails. No `docs/research/**` file is fetched by the Archscry runtime for this chart.

## If The Radar Needs To Change

Current implementation path:

- Change direct radar scores/title/text in `assets/js/dossier-radar.js`.
- Change fallback component behavior in `DOSSIER_COLOR_PROFILES` or `buildDossierFallbackProfile()`.

Source-first future path:

- Move all identity matrix score authority into `data/identity-layers.json` or another Layer 1 source-backed registry.
- Add preview/profile scores for identities that currently use fallback averages.
- Update `dossier-radar.js` to consume that registry instead of duplicating score constants.
- Add a regression check so direct radar profiles cannot drift from the registry.

Do not edit `graph.js` to change Vox Mana data. Do not directly edit `data/factions.json` or `data/placement-model.json` expecting the chart scores to change; those are generated/runtime surfaces and do not own the current radar score arrays.

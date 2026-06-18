# VM-407 - Identity Radar v2.0 Visual And Informational Upgrade

ID: VM-407
Title: Identity Radar v2.0 Visual And Informational Upgrade
Status: done
Type: Enhancement / Implementation
Area: Home (Identity Signal), Archscry (Identity Matrix), Identity Layers, Strategium bridge, Shared CSS/JS
Priority: medium
Created: 2026-06-15
Ready For: Codex (implementation agent)
Implementation Started: 2026-06-16 by Codex on branch `codex/vm407-radar-v2`
Completed: 2026-06-16 by Codex; owner manual visual QA remains as post-build review.
Planned By: Claude (Planning Architect), 2026-06-15
Plan Handoff: docs/handoffs/2026-06-15-2049-claude-vm407-identity-radar-v2-plan.md

## Summary

Implementation correction from the 2026-06-16 owner review: Archscry `#dossierManaRadar` receives the full final mock experience and Home `#vmHeroManaChart` receives visual-only radar upgrades. Home must keep its compact caption, cycle, pause, and Hold signal behavior; do not add the full Identity Reading panel to Home.

Post-owner spacing correction: the moved Archscry Identity Reading summary remains under the radar canvas, while `Lore` and `Core Tension` live in a right-column copy card above `vm-identity-reading-panel`. The Strategium detail no longer reserves a permanent top slot or inserts inline beneath rows; it starts hidden and appears as a hover/focus popover near the active trait row. Archscry-specific glow was reduced to avoid the broad ambient pulse/wash that drifted from `vox-mana-identity-matrix-v2-mock_Final.html`.

Take both identity radars — the Home "Identity Signal" (`#vmHeroManaChart`) and the Archscry placement-page "Identity Matrix" (`#dossierManaRadar`) — to a "version 2.0" that is richer visually AND informationally, **without changing the base implementation** (Chart.js v4 radar, same five axes `Order / Knowledge / Ambition / Freedom / Growth`, same composite + component dataset model). The upgrade is additive: glow that breathes, a blended multi-color fill, faint dashed component overlays kept as a background trace, a larger frame, and a beginner-friendly information layer that translates raw 0-100 axis scores into plain language, lit pips, lore, and strategium play-style.

This card is the decision-complete plan derived from an interactive mock-iteration session on 2026-06-15. The approved mock is backed up at `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html`.

## Background And Motivation

- New Magic players do not know what "Order 96" means. The current radar shows raw axis numbers with no translation. The owner stated plainly they did not know what the numbers meant either.
- The current component representation (dashed overlay polygons) is hard to read and clutters the composite shape.
- The current radar has a lot of dead space around it.
- The owner wants the Vox Mana aesthetic preserved: dark, mystical, gold-accented, glowing — but glow should **breathe/pulse in the identity color**, NOT spin or wash the background in yellow.
- This plan also resolves the long-open VM-364 follow-up (two-source-of-truth drift between Home and Archscry radar scores).

## Approved Design Direction (locked through live mock iteration)

The following were explicitly accepted or rejected by the owner during iteration. Treat as binding design constraints:

ACCEPTED:
0. Shape = STRAIGHT polygon (owner decision 2026-06-15). Stay on the radar/polar model and the graph.js (Chart.js v4) data contract: 5 labels, 0-100 scores, 5 equal angles, center, radius, `tension: 0` (hard straight edges). A curved "identity membrane" variant (Chart.js dataset `tension` ~0.35-0.45) was prototyped in the mock and REJECTED — the owner prefers the straight polygon. Do not reintroduce the curve. Do NOT replace the geometry/data model or jump to Three.js/custom geometry.
1. Glow lives IN the shape: the composite polygon line, the gradient fill, and the five vertex nodes pulse gently (opacity breathing ~3.6s ease-in-out) in the identity's own color.
2. Draw-in animation on identity change (line `stroke-dashoffset` reveal ~1s, plus a `scale(.85)->1` pop ~0.7s on the shape group).
3. Blended multi-color fill: for multi-color identities the fill is a blend of the component colors (clipped to the composite polygon), so the color mix itself communicates "this is W+U+B". This is the existing `blendGradient()` / `radialFill()` logic from `assets/js/home.js` brought INTO the chart fill. Component overlay traces are straight polygons too.
4. Dashed component overlays KEPT, but only as a faint background trace: ~1px, ~0.3 alpha, no glow, no animation, drawn BEHIND the fill so they show "what is being mixed in" without competing.
5. Beginner information layer in the side panel:
   - Each axis carries a plain-language meaning ("Order = rules, protection, teamwork").
   - Strength shown as WORDS (Defining / Strong / Present / Faint / Absent) plus 5 lit glowing pips; the raw 0-100 number is kept but shrunk to a small footnote.
   - An identity lore line (from `lore_summary`) and a "Core tension" line (from `core_tension`).
   - Tabler outline icons per axis (shield-half, book-2, skull, flame, plant-2).
6. Hover-to-learn, two-way: hovering a radar node highlights the matching trait row and vice versa.
7. Hover detail renders into a fixed panel slot positioned directly under the Core tension line — NOT a floating tooltip over the chart. At rest the slot shows the dominant axis. On hover it shows that axis's strategium play-style line.
8. Hover content must be flavor (lore / strategium "how it plays"), NOT a dictionary definition.
9. Larger radar frame; tighten the chart viewBox / increase radius to remove dead space.

REJECTED (do not reintroduce):
- Yellow / gold concentric "tier aura" rings behind the shape.
- A rotating "scry sweep" wedge / lighthouse-style spinning effect.
- A colored ambient background wash that fills the whole chart area.
- A floating tooltip that appears over the middle of the graph.
- A deck-comparison / baseline-ghost toggle (out of scope for now; this is a placement readout, not a comparison tool). NOTE: the baseline-ghost reference polygon idea is deferred, not killed — see Deferred Ideas.

## The Five Axes (canonical, do not rename)

Axis order is always `Order / Knowledge / Ambition / Freedom / Growth` (the WUBRG color-pie philosophies).

Plain-language meanings (beginner copy, approved in mock):
- Order — "Rules, protection, teamwork" (how much the deck protects, organizes, and plays fair).
- Knowledge — "Planning, card draw, control" (how much it plans ahead, draws cards, and controls the game).
- Ambition — "Power, sacrifice, ruthlessness" (how far it will go for power — sacrifice, removal, ruthlessness).
- Freedom — "Speed, emotion, aggression" (how fast, aggressive, and emotion-driven it plays).
- Growth — "Creatures, ramp, big nature" (how much it leans on creatures, ramp, and raw nature).

Strength tiers (value -> word): >=80 Defining, >=60 Strong, >=40 Present, >=20 Faint, <20 Absent.
Pip count = clamp(round(value / 20), 0, 5).

Per-axis Tabler icons: Order=`ti-shield-half`, Knowledge=`ti-book-2`, Ambition=`ti-skull`, Freedom=`ti-flame`, Growth=`ti-plant-2`.

## Current-State Findings (source-grounded)

- `assets/js/graph.js` is the vendored Chart.js v4.5.1 minified bundle. It is the engine only. DO NOT edit it for data or visuals.
- Two separate, non-shared radar implementations exist today:
  - Home Identity Signal: `assets/js/home.js` -> `initHeroManaPreview()` (canvas `#vmHeroManaChart`, markup `index.html:713-748`). Reads scores DYNAMICALLY from `data/identity-layers.json` `expressions[].preview_scores` for every `preview_eligible` expression (37 today). Has auto-cycle, hover/focus pause, and a "Hold signal" latch that pulls `lore_summary` / `core_tension` from `data/factions.json` via `loadHeroManaLoreIndex()`.
  - Archscry Identity Matrix: `assets/js/dossier-radar.js` (canvas `#dossierManaRadar`), orchestrated by `assets/js/index.js` (imports at ~`index.js:47-50`, init `initializeDossierRadarIfVisible()` at ~`index.js:1966-1982`, section render `renderDossierRadarSection()` at ~`index.js:2653`). Reads scores from HARDCODED constants `DOSSIER_RADAR_PROFILES` + `DOSSIER_COLOR_PROFILES` (36 identities: 22 authored-direct, 14 component-average fallback via `buildDossierFallbackProfile()`).
- Both already implement near-identical helpers and plugins, duplicated verbatim: `hexToRgba`, `blendGradient`, `radialFill`, a `lighter`-blend glow plugin (`heroManaGlowPlugin` / `dossierGlowPlugin`), and a `destination-over` radial halo plugin (`heroManaHaloPlugin` / `dossierHaloPlugin`).
- `assets/js/home.js:311` has a DEAD `heroManaTierLabelPlugin` whose `heroManaTierLabel()` currently returns `""` (the v2.0 on-point value/word label is the finished version of this stub).
- CSS lives separately: `assets/css/home.css` (`.vm-hero-mana*`, `.vm-radar-*`, ~503+, 769+, 1435+) and `assets/css/archscry.css` (`.vm-dossier-matrix-section .vm-radar-*`, ~1731+, 1888+). Shared class names but separate definitions.
- DRIFT RISK (VM-364, still open): Home reads `preview_scores` from the registry; Archscry hardcodes the same numbers. The first 20 match by coincidence, nothing enforces it. Home has 37 preview-eligible identities; the Archscry constant table has 36 (WUBRG/Five-Color was promoted to Home in VM-367+ AFTER the VM-364 map and is fallback-averaged on Archscry). 14 Archscry identities still use runtime-averaged fallback shapes, so the same identity can show a different shape on the two pages.
- VM-404 (in progress) changed the Home Identity Signal cycle from 4800ms to 9000ms — confirm current `heroManaCycleMs` before touching cycle behavior.

## Recommended Approach

Build the v2.0 radar ONCE as a shared module and have both routes consume it, folding in the VM-364 score-authority unification so there is a single source of truth.

1. Create a shared radar module `assets/js/vm-radar.js` (exact name TBD by implementer) that owns:
   - The five axis constants and beginner copy map (meaning, icon, strength-word fn, pip fn).
   - The color helpers (`hexToRgba`, `blendGradient`, `radialFill`) — delete the duplicated copies in `home.js` and `dossier-radar.js`.
   - The Chart.js plugins: breathing glow plugin (animated `shadowBlur`/alpha), the blended-fill scriptable `backgroundColor` (canvas `createConicGradient` or layered radial gradients mirroring `blendGradient`), the faint dashed component-overlay datasets, and an on-point value/word label plugin (the finished `heroManaTierLabelPlugin`).
   - A `resolveRadarProfile(key)` that reads scores from ONE registry (see Data/Schema).
2. Score-authority unification (closes VM-364) — DECISION RESOLVED:
   - The shared resolver reads `data/identity-layers.json` `expressions[key].preview_scores` for ALL identities (Home already does this for 37 preview-eligible expressions, so the authored data already exists). Component averaging is kept ONLY as a last-resort fallback when a `preview_scores` block is missing for a requested key.
   - Remove the hardcoded `DOSSIER_RADAR_PROFILES` / `DOSSIER_COLOR_PROFILES` score constants from `dossier-radar.js`. Archscry now resolves through the shared registry path, same as Home.
   - NO new score authoring is required. Expected/accepted side effect: the ~14 Archscry identities that previously used runtime averaging will adopt the registry's authored shapes, becoming CONSISTENT with Home (this is the desired unification, not a regression). Capture before/after for those identities in the handoff.
   - Only if the registry is missing `preview_scores` for a live identity: add it to the SOURCE that feeds `identity-layers.json` (confirm the builder per Pre-Flight) — do not hand-edit a generated file.
   - Add a regression test asserting Archscry and Home resolve the SAME score array for the same key (no direct radar constants remain in `dossier-radar.js`).
3. Information layer:
   - Wire `lore_summary` and `core_tension` from `data/factions.json` into BOTH radars' side panels (Home already loads this via `loadHeroManaLoreIndex()`; Archscry has it via the dossier/commander data already in `index.js`).
   - Add per-axis plain-language meaning + strength word + pips + icon to the panel.
   - Add the hover->panel-slot strategium reading.
4. Strategium per-axis text — DECISION RESOLVED:
   - Ship the generic per-axis lines now (the 5 identity-agnostic strings used in the mock, captured verbatim in the Implementation Story below). Store them as a small SOURCE map (e.g. a `STRATEGIUM_AXIS` constant in the shared module, or `data/strategium-axis-readings.json`).
   - Structure the lookup as `strategiumReading(axis, identityKey)` so a future identity-specific layer (from the Strategium library, VM-125/126, via the VM-406 bridge) can override the generic line per identity without touching the radar code. Do NOT block this card on identity-specific copy.
5. Visual port: implement the approved direction (breathing glow, blended fill, faint dashed overlays behind, draw-in/pop, larger frame, removed dead space) in the shared module and both route CSS files. Honor `prefers-reduced-motion` (zero/short animation durations) and keep the existing graceful "Chart missing" fallback (Archscry already has it at `dossier-radar.js:566-579`; ADD the same to Home, which currently just returns at `home.js:690`).

## Exact v2.0 Visual Spec (from approved mock; values are starting points, tune in-route)

- Frame: enlarge radar radius ~10-12% and tighten viewBox so the polygon + axis labels fill the column. Mock used viewBox `0 0 380 348`, center `(190,172)`, radius `128`, axis label radius `R+20`, axis label font Cinzel 13/500, label fill `#e6ddc6`.
- Shape: STRAIGHT polygon through the five score points (Chart.js `tension: 0`). The clip path, glow halo, composite line, and component overlay traces are all straight polygons. Nodes sit at the exact score points. (A curved membrane was prototyped and rejected — see ACCEPTED item 0.)
- Grid: faint cool web only — concentric polygons at 25/50/75/100 stroke `rgba(255,255,255,.05)`, angle lines `rgba(255,255,255,.055)`. NO gold rings.
- Dashed component overlays (multi-color only): per component, polygon of that component's mono profile, stroke `rgba(componentHex,.32)`, 1px, `stroke-dasharray 4,4`, drawn BEFORE the composite group, no glow, no animation.
- Blended fill: clip a group to the composite polygon; paint per-component radial gradients (`stop0 = rgba(hex,.6)`, `stop1 = rgba(hex,0)`) positioned around center (n components evenly spaced at distance ~`R*0.5`, single color centered), over a faint `rgba(identityHex,.10)` base. In the real Chart.js build this is a scriptable `backgroundColor(ctx)` returning a canvas gradient (mirror `radialFill()` but multi-stop per component).
- Glow halo: composite polygon duplicated underneath, stroke `identityHex`, width ~10, `feGaussianBlur stdDeviation ~5` (Chart.js: the `lighter`-blend glow plugin with animated `shadowBlur`), opacity breathing 0.4<->0.85 over ~3.6s. Each vertex has a blurred glow circle (r~7, `rgba(hex,.5)`) plus a crisp white dot (r~3.6, stroke identityHex 1.5).
- Composite line: straight polygon, stroke `identityHex`, width ~2.6, `stroke-dasharray` draw-in on change (mock dashoffset 1000 / 1s).
- Deferred/rejected shape alternatives (capture only, not in scope): curved identity membrane (Chart.js `tension`) — REJECTED by owner; faceted crystal/shard fills, five-rune seal overlay, orbital node ring, pressure-star beams — unexplored future style-layer options. The straight polygon is the chosen primary.
- Trait-row emphasis (brightness only, no layout/function change): in the side panel, keep the identity's top-N axis rows at full brightness and dim the rest (mock uses `opacity:.4`), where N = the identity's color-component count clamped to 1-5 (mono=1, two-color=2, three=3, four=4, five=5; colorless/0 components = no dimming). Top-N is by descending axis score. A dimmed row returns to full opacity on hover/focus so nothing is lost. Owner request 2026-06-15: make the defining axes stand out. This is a panel-list change only — do NOT dim the radar polygon itself.
- Hover focus: enlarge the hovered node (dot r->5.6, glow r->12, glow fill alpha->.9), add `.on` to the matching trait row, set the panel detail slot to that axis's strategium and add `.on` border highlight to the slot.
- Identity color note: Home currently maps Black to display hex `#a46bea` (`heroManaBlackDisplayHex`). Owner feedback (2026-06-15): Black reads too purple — pull it toward a neutral ash. The approved mock uses `#7b7287`. Apply a less-purple Black to the real radars (still light enough to read on the dark background); update `heroManaBlackDisplayHex` and any component-black hex accordingly.
- Dashed component overlays readability: owner asked for the faint dashed traces to be a touch more legible. Mock settled on stroke `rgba(componentHex,.5)`, width `1.2`, `stroke-dasharray 5,4` (up from `.32` / `1` / `4,4`). Use these as the starting values.

## Data / Schema Impacts

- `data/identity-layers.json`: becomes the single radar-score authority. May need authored `preview_scores` for identities currently using Archscry fallback averaging. `preview_scores` keys: `order`, `knowledge`, `ambition`, `freedom`, `growth` (0-100). This is a generated file — confirm whether it is written by `research/build-faction-artifacts.mjs` or hand-maintained, and update the correct SOURCE per CLAUDE.md (do not hand-edit generated output if a builder owns it).
- `data/factions.json`: read-only for this card — source of `lore_summary` / `core_tension`. Do not author lore.
- NEW per-axis strategium copy: needs a home. Options: a new small JSON (e.g. `data/strategium-axis-readings.json`), or fields inside the Strategium archetype library. Decide during implementation; keep it a SOURCE file, not generated.
- No placement scoring (`adaptive-placement.js`) changes. `placementResult.mana_scores`, `top_matches`, `adjacent_matches`, `confidence` remain non-feeders of the radar canvas (per VM-364), except confidence is a Deferred Idea below.

## UI / UX Impacts

Implementation correction: Archscry gets the full v2 info panel; Home gets shared visual improvements only and keeps the existing compact signal/hold surface.

- Home hero Identity Signal and Archscry placement Identity Matrix both gain the v2.0 look + info panel.
- Preserve Home behaviors: auto-cycle (current `heroManaCycleMs`, 9000ms after VM-404), pause-on-hover/focus, "Hold signal" latch, reduced-motion stillness.
- Preserve Archscry behaviors: component/synthesis toggles (or fold into the new model), adjacent-tab re-init (`initializeDossierRadarIfVisible` + the `requestAnimationFrame` measurable-size guard from VM-118), Colorless matrix-boundary card-voice panel.
- Accessibility: canvases keep `role="img"` + descriptive `aria-label`; new interactive hover affordances must also work on keyboard focus (extend the existing focus handling); honor `prefers-reduced-motion`.

## Files Likely Impacted

- `assets/js/vm-radar.js` (NEW shared module) — owns axes copy, helpers, plugins, profile resolver.
- `assets/js/home.js` — consume shared module for `#vmHeroManaChart`; remove duplicated helpers/plugins; finish the dead tier-label plugin; add Chart-missing fallback; add v2.0 info panel wiring.
- `assets/js/dossier-radar.js` — consume shared module for `#dossierManaRadar`; remove hardcoded score constants (or reduce to documented fallback); keep render section + toggles + Colorless boundary.
- `assets/js/index.js` — radar init/orchestration glue if signatures change.
- `assets/css/home.css` — `.vm-hero-mana*`, `.vm-radar-*` v2.0 styles + new info-panel/hover classes.
- `assets/css/archscry.css` — `.vm-dossier-matrix-section .vm-radar-*` v2.0 styles + new info-panel/hover classes.
- `index.html` and `archscry/index.html` — markup for the new info panel slots (orbs, lore, tension, detail slot, traits) if not fully JS-injected.
- `data/identity-layers.json` (via its SOURCE/builder) — authored `preview_scores` for fallback identities.
- NEW strategium axis copy source file (path TBD).
- Tests: `quick-reading-tests.js` and/or a new radar regression test; visual baseline harness; `tests` smoke as applicable.
- Docs: update `docs/reference/archscry-identity-matrix-data-map.md` to reflect unified score authority.

## Do-Not-Touch Areas

- `assets/js/graph.js` (vendored Chart.js) — never edit for data/visuals.
- Placement scoring logic in `assets/js/adaptive-placement.js`.
- Generated JSON treated as runtime output (`data/factions.json`, `data/placement-model.json`) — change SOURCE, not generated, per CLAUDE.md.
- MTG lore, card facts, commander facts — do not invent. Lore copy comes from existing `factions.json` fields only.
- Maze handoff behavior, route aliases, Supabase/context exports.
- Known residuals (Temur wording, WITCH flavor verification, VM-295 repair) — out of scope.

## Risks / Uncertainties

- Strategium per-axis copy — RESOLVED: ship the generic 5-line map now (verbatim in the Implementation Story), behind `strategiumReading(axis, key)` so identity-specific copy (VM-125/126 / VM-406) can override later without touching radar code.
- Score-authority migration (VM-364) — RESOLVED to read existing registry `preview_scores` (no new authoring). Residual risk to watch: the ~14 previously-averaged Archscry identities will change shape to match the registry/Home. This is intended unification; capture before/after in the handoff and confirm it reads acceptable (it should, since Home already shows those shapes).
- `identity-layers.json` is read-only for this card (no authoring needed). Only if a live identity is missing `preview_scores`: add it via the SOURCE/builder, not the generated file (VM-300). Confirm the writer in Pre-Flight before any such edit.
- Visual baseline snapshots will change for Home and Archscry — expect baseline refreshes and coordinate with the visual harness (see VM-390/391 waiver precedent).
- Animation/perf: glow + blur + breathing on canvas must stay within the Home Lighthouse performance budget (VM-392 waiver context). Honor reduced-motion and pause-when-hidden.
- Cross-page consistency: once unified, verify the same identity renders the same shape on Home and Archscry.

## Implementation Story (Codex-Ready)

This section is the build contract. Follow it in order. The visual/info reference is the approved mock at `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html` — open it; it is the source of truth for look, copy strings, and constants. The mock renders in SVG to stay dependency-free; the real build stays on Chart.js v4 (`assets/js/graph.js`) and reuses the existing plugin/helper patterns.

### Step 0 — Pre-Flight (mandatory, per CLAUDE.md)

1. Read `AGENTS.md`, `docs/handoffs/HANDOFF_INDEX.md`, `docs/kanban/board.md`, this card, the VM-364 map (`docs/reference/archscry-identity-matrix-data-map.md`), and the plan handoff (`docs/handoffs/2026-06-15-2049-claude-vm407-identity-radar-v2-plan.md`).
2. Open the reference mock HTML and read its `<script>` — it contains the exact axis copy, strategium strings, colors, and geometry constants used below.
3. Confirm `assets/js/home.js` `heroManaCycleMs` (was set to 9000ms by VM-404). Do not change it.
4. Confirm what writes `data/identity-layers.json` (search for a writer in `research/build-faction-artifacts.mjs`). You should NOT need to edit it (read-only path); only relevant if Step 3 finds a missing `preview_scores`.
5. Run the baseline test suite once before changes (`npm test`, `npm run test:placement`, `npm run test:parser`) to capture a clean starting point.

### Resolved decisions (do not re-litigate)

- SHAPE: straight polygon, `tension: 0`. The curved membrane was rejected.
- SCOPE SPLIT (key decision):
  - ARCHSCRY Identity Matrix (`#dossierManaRadar`) gets the FULL v2.0: visual upgrades + the full info panel (component orbs, lore line, core tension, hover detail slot, the five trait rows with icons/pips/strength words and the dim-emphasis) + two-way hover + strategium readings. This is where the user has just taken the quiz and has screen room.
  - HOME Identity Signal (`#vmHeroManaChart`) gets the VISUAL upgrades only: breathing identity-color glow, blended multi-color fill, neutral-ash Black, more-legible dashed overlays, frame/dead-space tidy — all via the shared module. Home KEEPS its existing compact caption + "Hold signal" latch (which already surfaces `lore_summary`/`core_tension` via `loadHeroManaLoreIndex()`). Do NOT graft the full Archscry side panel onto the small cycling hero. Optional nicety (not required): show the plain-language strength word in the existing latch detail. Rationale: the two surfaces have different contexts — Home is ambient/glanceable/auto-cycling; Archscry is focused/interactive.
- SCORE AUTHORITY: shared resolver reads registry `preview_scores` for all keys; averaging is a missing-key fallback only; no new authoring; the ~14 previously-averaged Archscry identities adopt registry shapes (consistent with Home). See Recommended Approach step 2.
- STRATEGIUM COPY: ship the generic 5-line map now (verbatim below); structure as `strategiumReading(axis, identityKey)` for a future per-identity override.

### Build phases

1. PHASE 1 — Shared module `assets/js/vm-radar.js`:
   - Export the canonical axis constants (`AXES`), the beginner copy maps (`AXIS_MEANING`, `AXIS_ICON`, `STRATEGIUM_AXIS`), `strengthWord(v)`, `pipCount(v)`, and `strategiumReading(axis, key)`.
   - Move `hexToRgba`, `blendGradient`, `radialFill` here; delete the duplicates from `home.js` and `dossier-radar.js`.
   - Provide the Chart.js plugins: breathing glow (animated `shadowBlur`/alpha, `lighter` blend), the dashed component-overlay datasets, and the on-point/label plugin (the finished version of the dead `heroManaTierLabelPlugin`).
   - Provide `resolveRadarProfile(key)` reading registry `preview_scores` (averaging fallback only if missing).
   - Provide the scriptable blended `backgroundColor(ctx)` mirroring `blendGradient` for multi-color fills.
2. PHASE 2 — Archscry full v2.0: refactor `dossier-radar.js` to consume the shared module; remove hardcoded score constants; build the full info panel + two-way hover + dim-emphasis + strategium slot; preserve the adjacent-tab re-init guard (`initializeDossierRadarIfVisible` + `requestAnimationFrame` measurable check, VM-118), the component/synthesis toggles, the Colorless boundary panel, and the Chart-missing fallback.
3. PHASE 3 — Home visual-only: refactor `home.js` to consume the shared module for `#vmHeroManaChart`; apply the visual layer (glow/blended fill/ash black/dashed/frame); ADD the Chart-missing fallback Home currently lacks (`home.js:690` just returns); preserve cycle/pause/latch/reduced-motion.
4. PHASE 4 — CSS: add the v2.0 styles + info-panel/hover/dim classes to `assets/css/archscry.css` (`.vm-dossier-matrix-section .vm-radar-*`) and the visual styles to `assets/css/home.css` (`.vm-hero-mana*`, `.vm-radar-*`).
5. PHASE 5 — Markup: add the Archscry info-panel slot markup (orbs, lore, tension, detail slot, traits) in `archscry/index.html` (or inject from `dossier-radar.js`, matching current rendering style).
6. PHASE 6 — Tests + docs: add the score-parity regression test; run the full suite (Tests To Run); refresh + document visual baselines; update `docs/reference/archscry-identity-matrix-data-map.md` to state the unified score authority; write the handoff + update `HANDOFF_INDEX.md`; move this card to done.

### Verbatim copy + constants (source of truth; also in the mock script)

- Axes (order fixed): `["Order","Knowledge","Ambition","Freedom","Growth"]`.
- AXIS_MEANING: Order="Rules, protection, teamwork"; Knowledge="Planning, card draw, control"; Ambition="Power, sacrifice, ruthlessness"; Freedom="Speed, emotion, aggression"; Growth="Creatures, ramp, big nature".
- STRATEGIUM_AXIS (generic, ship now): Order="Plays as protection, taxes and board wipes that keep the game fair."; Knowledge="Plays as card draw, counterspells and the long control game."; Ambition="Plays as sacrifice, removal and grinding the table down."; Freedom="Plays as fast aggression, burn and impulsive swings."; Growth="Plays as ramp, big creatures and value that snowballs.".
- AXIS_ICON (Tabler): Order=`ti-shield-half`, Knowledge=`ti-book-2`, Ambition=`ti-skull`, Freedom=`ti-flame`, Growth=`ti-plant-2`.
- strengthWord(v): >=80 "Defining", >=60 "Strong", >=40 "Present", >=20 "Faint", else "Absent".
- pipCount(v): clamp(round(v/20), 0, 5).
- Dim-emphasis: keep top-N rows bright, dim others to `opacity:.4`; N = identity color-component count clamped 1-5 (colorless/0 = no dimming); top-N chosen by descending score; dimmed row returns to full on hover/focus. Panel list only — never dim the polygon.
- Component colors (display): W `#f7f0d0`, U `#58b8ff`, B `#7b7287` (neutral ash — replaces the purple `#a46bea`/`heroManaBlackDisplayHex`), R `#ff6b55`, G `#63e58d`.
- Dashed overlays: stroke `rgba(componentHex,.5)`, width `1.2`, `stroke-dasharray "5,4"`, behind the fill, no glow/animation.
- Geometry/animation starting values: see the "Exact v2.0 Visual Spec" section above (frame, blended fill stops, glow halo, breathing 3.6s 0.4<->0.85, draw-in/pop, hover node sizes).

### One-paragraph prompt (summary)

Build a shared `assets/js/vm-radar.js` that renders the straight-polygon v2.0 Chart.js radar for both `#vmHeroManaChart` (Home) and `#dossierManaRadar` (Archscry), reading axis scores from `identity-layers.json` `preview_scores` (averaging fallback only) and lore from `factions.json`. Archscry gets the full info panel (orbs, lore, core tension, dim-emphasis trait rows with icons/pips/strength words, two-way hover writing the strategium reading into a fixed slot under core tension — no floating tooltip); Home gets the visual layer only and keeps its caption/latch. Port the approved visual direction exactly (breathing identity-color glow, blended multi-color fill, faint legible dashed overlays behind, neutral-ash Black, draw-in/pop, tidy frame; NO gold rings / spin / background wash / curved membrane). Remove duplicated helpers/plugins from `home.js` and `dossier-radar.js`, finish the dead tier-label plugin, add the Chart-missing fallback to Home, ship the generic strategium copy behind `strategiumReading(axis,key)`, and close VM-364 by making the registry the single score authority with a parity regression test. Reference mock: `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html`.

## Acceptance Criteria

- One shared radar module renders both `#vmHeroManaChart` and `#dossierManaRadar`; duplicated helpers/plugins are removed from `home.js` and `dossier-radar.js`.
- Radar axis scores for both pages come from a single source; a regression test prevents drift (closes VM-364). The same identity renders the same shape on Home and Archscry.
- Visual: identity-color glow breathes (no spin, no gold rings, no background wash); multi-color fill is a blended color mix; component dashed overlays appear only as a faint background trace; the chart fills its column (dead space removed); identity change animates (draw-in + pop); `prefers-reduced-motion` is honored.
- Information: each axis shows a plain-language meaning, a strength word (Defining/Strong/Present/Faint/Absent) with lit pips, and the raw 0-100 as a small footnote; the panel shows the identity lore line and core tension from `factions.json`.
- Hover (mouse AND keyboard focus) on a node or trait row highlights its partner and writes that axis's strategium reading into the fixed panel slot under the core tension — never a floating box over the chart. At rest the slot shows the dominant axis.
- Beginner-legible: a new player can read the panel and understand what the identity does without knowing the numbers.
- Home keeps cycle/pause/latch/reduced-motion behavior; Archscry keeps adjacent-tab re-init, toggles, and the Colorless boundary panel; both keep a graceful Chart-missing fallback.
- No edits to `graph.js`, placement scoring, generated runtime JSON (edit source), or invented lore.
- `npm test`, `npm run test:placement`, and `npm run test:parser` pass; visual baselines refreshed and documented.

## Tests To Run

- `npm test`
- `npm run test:placement` (before AND after any data change, per CLAUDE.md)
- `npm run test:parser`
- `node research/archscry-dossier-followup-tests.js`
- New radar regression test (registry-vs-rendered score parity).
- Node `--check` on touched JS modules.
- Manual: Home cycle/hold/hover/keyboard; Archscry placement result + adjacent-tab radar; reduced-motion; Chart-missing fallback; cross-page same-identity shape parity.

## Deferred Ideas (not in this card; capture only)

- Baseline / "compared to a typical deck" reference polygon with a beginner caption (owner deferred, not killed).
- Confidence arc plugin driven by `placementResult.confidence`.
- Adjacent-identity ghost overlay tied to `adjacent_matches` (the dossier "where this leads" story).
- Axis micro-glossary popovers / on-radar icon legend.
- Tree-shaken Chart.js build for the radar-only footprint (ties to VM-392 perf).

## Human Review

Codex may proceed — the prior open decisions (shape, scope split, score authority, strategium copy) are resolved in the Implementation Story. Owner review is still wanted on two judgment points after build, not before: (1) the ~14 Archscry identities whose shape changes under the unified score authority, and (2) whether Home should later gain more of the Archscry info layer than the visual-only scope decided here. If Codex prefers, Phase 2 (Archscry full) and the cross-page score unification can be committed separately from Phase 3 (Home visual), but they are specified to ship together.

## Related Kanban Cards, Docs, Mock

- VM-364 - Archscry Identity Matrix Data Map (the open drift follow-up this closes) and `docs/reference/archscry-identity-matrix-data-map.md`.
- VM-078 / VM-097 / VM-063 / VM-118 / VM-132 - prior radar work.
- VM-389 / VM-390 / VM-392 - Home Identity Signal promotion, visual readiness, performance waiver.
- VM-404 - Contained UI polish (changed Identity Signal cycle to 9000ms; in progress).
- VM-406 - Archscry->Strategium bridge concepts (strategium copy source).
- VM-125 / VM-126 - Strategium archetype-signal library (richer strategium copy source).
- VM-300 - Source/generated guardrails (respect when authoring `preview_scores`).
- Mock backup: `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html`.

## Notes

This card is the durable record of an interactive mock session. The mock HTML is a DESIGN reference only (it hardcodes sample data, renders in SVG to be dependency-free, and is not the build target). The real build stays on Chart.js v4 and reuses the existing plugin/helper patterns. Keep the base feel; this is a v2.0 of looks and information, not a re-platform.

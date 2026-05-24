# Project Atlas

Vox Mana is an unofficial Magic: The Gathering fan site that combines a themed static frontend, an adaptive faction-placement engine, a Scryfall research workspace, generated lore data, and a feature-flagged Scrying Terminal that is archived by default.

## Route Map

| Route | File | Purpose | Primary runtime |
|---|---|---|---|
| `/` | `index.html` | Home gateway with destination cards and cached-reading resume chip. | `assets/js/home.js`, `assets/js/vm-topbar.js`, `assets/js/atmosphere.js` |
| `/archscry/` | `archscry/index.html` | Placement experience: landing, quick adaptive reading, dossier result, archived Scrying Terminal. | `assets/js/index.js`, `assets/js/shared.js`, `assets/js/adaptive-placement.js` |
| `/maze/` | `maze/index.html` | The Implicit Maze Scryfall query explorer. | `research/research-init.js` and imported research modules |
| `/apocrypha/` | `apocrypha/index.html` | Canonical Apocrypha Archive Console and public provenance page. | Shared topbar, reduce-motion, and Apocrypha archive scripts |
| `/strategium/` | `strategium/index.html` | Commander field guide and color-matrix learning console. | Local `graph.js` runtime and Strategium page scripts |
| `/library/` | `library/index.html` | Legacy compatibility alias that forwards to `/apocrypha/`. | Inline redirect shell |
| `/privacy/` | `privacy/index.html` | Privacy policy with project-specific glossary text. | Shared topbar and atmosphere scripts |
| `/terms/` | `terms/index.html` | Terms of service with project-specific glossary text. | Shared topbar and atmosphere scripts |
| `http://127.0.0.1:4783/` | External tools workspace | Local command and source-review queue panel. | `C:\dev\projectFiles\voxmana-tools` |

## Runtime Layers

| Layer | Files | Responsibility |
|---|---|---|
| Static shells | `index.html`, `archscry/index.html`, `maze/index.html`, `apocrypha/index.html`, `library/index.html`, policy pages | Define route-specific DOM, preload assets, script entrypoints, and inline handler hooks. |
| Shared visual system | `assets/css/tokens.css`, `assets/css/fonts.css`, `assets/css/animations.css`, `assets/css/topbar.css`, `assets/css/atmosphere.css`, `assets/css/components.css` | Site tokens, progressive OKLCH fallbacks, teal-only Display P3 accent overrides, a conservative fluid spacing/type pilot, shared font loading, imported shared keyframes, topbar, atmospheric canvas, and reusable panels/buttons/chips/progress treatments. |
| Home gateway | `assets/js/home.js` | Resume-chip detection and subtle gateway motion. |
| Placement frontend | `assets/js/index.js`, `assets/js/adaptive-placement.js`, `assets/js/shared.js`, `assets/js/identity-layers.js` | Loads data, runs quick adaptive reading, normalizes layered identity metadata, renders narrative dossiers, saves/resumes results, preserves adjacent-fit context, builds alias-routed Commander directory links, and keeps the terminal dormant behind the shared site flag. |
| Site flags | `assets/js/site-flags.js` | Single checked-in switch that hides or reveals the archived terminal UI and browser guards. |
| Research workspace | `research/*.js`, `maze/index.html` | Smart Search, raw syntax, Visual Builder, Scryfall search/rendering, reading-aware paths, Archscry return banners with dismissal persistence, no-results handling, and card modal UI. |
| Scryfall card-expression indexes | `scripts/download-scryfall-bulk.mjs`, `scripts/build-scryfall-indexes.mjs`, `data/scryfall/indexes/*.json`, `data/taxonomy/vox-mana-tags.json` | Ignored local oracle bulk data, lightweight derived indexes, categorized tags, Commander candidates, and flavor echo samples. |
| Identity layer catalog | `data/identity-layers.json`, `data/identity-layers.schema.json` | Canonical mono-aware identity data for colors, expressions, routing aliases, and shared dossier language. |
| External command panel | `C:\dev\projectFiles\voxmana-tools` | Runs allowlisted commands, reads external Apocrypha manifest data, and tracks panel state outside the site repo. |
| Backend interview | `supabase/functions/guild-recruiter/index.ts` | Deno edge function retained for the archived terminal path and future deterministic replacement work. |

## Entrypoints

| Entrypoint | Type | Notes |
|---|---|---|
| `assets/js/index.js` | ES module loaded by `archscry/index.html` | Imports `adaptive-placement.js`, exposes inline HTML handlers onto `window`, then initializes on `DOMContentLoaded`. |
| `assets/js/shared.js` | Classic script loaded before placement modules | Creates global session helpers, Supabase client access, storage helpers, interview calls, save/resume/sign-out flows. |
| `research/research-init.js` | ES module loaded by `maze/index.html` | Imports parser, dictionary, builder, search, mode, and UI modules; exposes inline handlers onto `window`. |
| `supabase/functions/guild-recruiter/index.ts` | Deno edge function | Handles `OPTIONS` and `POST`, enforces request limits, calls Anthropic, and normalizes model output for the archived terminal path. |
| External command panel server | Node CLI in `C:\dev\projectFiles\voxmana-tools` | Serves the command panel, state, run logs, item APIs, and command execution APIs. |
| Faction artifact builder | `research/build-faction-artifacts.mjs` | Regenerates display metadata, adaptive model, schema, and Supabase faction context from raw factions plus identity layers. |
| External asset-source generator | Node CLI in `C:\dev\projectFiles\voxmana-tools` | Regenerates deterministic local-only SVG source assets. |

## Public Surfaces

| Surface | Where | Shape |
|---|---|---|
| Placement result | `docs/reference/data-contracts.md`, `assets/js/adaptive-placement.js`, `assets/js/shared.js`, edge function | Versioned object with legacy faction fields plus layered `identity`, confidence, mana scores, matches, starter profile, evidence, and stage history. |
| Browser globals | `assets/js/shared.js`, `assets/js/index.js`, `research/research-init.js` | Inline handler functions, `VM_SESSION`, `vm_*` helpers, and research handlers. |
| Supabase profile row | `assets/js/shared.js` | Compatibility fields plus richer `placement_result` source of truth. |
| Scryfall API calls | `research/research-search.js`, `assets/js/index.js` | Search/exact/random endpoints for Maze and card-art enrichment. |
| Scryfall bulk indexes | `data/scryfall/indexes/*.json` | Archscry flavor echoes, Commander metadata enrichment, color/theme summaries, and future discovery surfaces. |
| Anthropic API call | `supabase/functions/guild-recruiter/index.ts` | Messages endpoint with prompt built from generated faction context, only when the terminal is explicitly re-enabled. |
| Local command-panel API | External tools workspace | `GET /api/bootstrap`, `/api/items`, `/api/runs`; `POST /api/refresh`, `/api/item`, `/api/bulk`, `/api/select-next`, `/api/run`. |

## Generated And Bulk Artifacts

| Artifact | Source | Consumer |
|---|---|---|
| `data/factions.json` | Generated/enriched from raw factions and display metadata | Dossier rendering and deck/source guidance. |
| `data/placement-model.json` | External faction artifact builder | Quick adaptive placement engine. |
| `data/placement-model.schema.json` | External faction artifact builder | Contract check for generated placement model shape. |
| `supabase/functions/guild-recruiter/faction-context.ts` | External faction artifact builder | Edge function prompt context. |
| `data/identity-layers.json` | Hand-authored identity catalog | Mono-aware routing, shared color language, and generated layered identity metadata. |
| `data/identity-layers.schema.json` | Hand-authored schema | Contract check for the identity catalog. |
| `data/raw-factions/*` | Curated source, profile, placement, claims, changelog files | Placement model and generated context. |
| `data/taxonomy/vox-mana-tags.json` | Hand-authored Vox Mana tag dictionary | Scryfall index builder, Archscry tag explanations, Maze/future discovery copy. |
| `data/scryfall/raw/oracle-cards.json` | `npm run scryfall:download` | Local-only ignored Scryfall oracle bulk source. |
| `data/scryfall/indexes/*.json` | `npm run scryfall:index` | Lightweight committed card-expression, commander, color, and mechanic indexes. |
| `assets/img/**` | Generated or curated visual assets | Static page backgrounds, logo, responsive hero images, and token-referenced overlays/textures. |
| `test-results/**` | Test/command output | Bias reports, command panel state, run logs. |

## Local Scripts

| Script | Command | Effect |
|---|---|---|
| Faction artifacts | `npm run build:factions` from this repo | Rewrites generated faction/model/schema/context artifacts in this repo. |
| Asset sources | `npm run assets:generate:sources` from `C:\dev\projectFiles\voxmana-tools` | Rewrites deterministic local-only SVG sources. |
| Command panel | `npm run panel` from `C:\dev\projectFiles\voxmana-tools` | Starts local server on `127.0.0.1:4783`. |
| Test suite | `npm test` | Runs parser, builder, mode, syntax, and placement checks. |
| Placement tests | `npm run test:placement` | Runs adaptive placement model/golden-path assertions. |
| Bias simulation | `npm run test:bias` / `npm run test:bias:all` | Writes quick-reading bias reports under `test-results/`. |
| Scryfall download | `npm run scryfall:download` | Downloads ignored `oracle_cards` bulk JSON and a raw manifest. |
| Scryfall indexes | `npm run scryfall:index` / `npm run scryfall:inspect` | Builds and verifies derived Scryfall indexes. |

## Architecture Constraints

- Static files are the deployable site surface; no bundler is currently present.
- Runtime modules lean on browser globals where existing inline HTML handlers require it.
- Generated faction artifacts must be treated as outputs; edit raw/display sources first, then regenerate.
- Mono-aware identity metadata originates in `data/identity-layers.json`; do not hand-edit generated `layered_identity` blocks downstream.
- Docs should describe current dirty working-tree behavior, not only `main` or the last committed state.
- External Commander directory links are presenter-layer routes. Strixhaven colleges intentionally map to their guild/color analogs for EDHREC and MTGDecks directories.

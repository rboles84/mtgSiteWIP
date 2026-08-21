# VM-573 - Archscry Runtime Decomposition, Pass 2

ID: VM-573
Title: Archscry Runtime Decomposition, Pass 2
Status: Owner Acceptance
Type: Runtime architecture
Area: Archscry
Priority: High
Created: 2026-08-20

## Summary

Decompose the two large Archscry JavaScript owners into cohesive ES modules without changing product behavior. Execute one task through two internal certification gates: Phase A for the DOM-free Commander dossier domain, then Phase B for the stateful route runtime.

## Governing Boundaries

- Keep `assets/js/archscry/index.js`, `commander-dossier.js`, and `archscry-result.js` as stable compatibility facades.
- Preserve one `APP_STATE` object with identical identity, defaults, and mutation semantics.
- Preserve public exports, browser globals, HTML entry paths, boot order, initialization timing, storage/query/history contracts, and product behavior.
- Extract each implementation once. Facades may re-export or delegate but may not retain duplicate implementations.
- No extracted implementation may depend back through either facade or add import-time initialization or side effects.
- The target tree is guidance, not a quota. Leave blocks in the nearest facade when extraction would require behavioral redesign, awkward dependency injection, or a cycle.
- Phase B is prohibited until the Phase A checkpoint is clean.

## Pre-Extraction Block Map

| Current block | Local/import dependencies | State / side effects | Browser contracts | Planned ownership |
| --- | --- | --- | --- | --- |
| `commander-dossier.js` constants and normalization | `identity-layers.js`; local normalization/deduplication helpers | No `APP_STATE`, DOM, storage, query, or initialization effects | Exported constants | `dossier/shared.js` and `dossier/guidance.js` |
| Land recommendations | Shared normalization and color helpers | Pure transformations | Exported land helpers | `dossier/lands.js` |
| Tag catalog, provider routing, Commander candidates, package links | Shared helpers and guidance | Pure transformations; emits URLs only | Exported URL/catalog/service helpers | `dossier/deck-routing.js` |
| Omens, starting lane, adjacent fit, summaries, dossier composition | Guidance, lands, routing, identity-layer helpers | Pure transformations | Exported reading and dossier builders | `dossier/reading.js` |
| Precon recommendations | Routing/color helpers and normalized dossier inputs | Pure transformations | Exported precon API | `dossier/precons.js` |
| Text projection and dossier audit | All dossier output contracts | Pure read/validation | Exported text/audit API | `dossier/audit.js` |
| `index.js` route state/config | Placement defaults and browser `VM_SESSION` | Owns the single mutable `APP_STATE` object | Session identity and route constants | `runtime/state.js`; no state redesign |
| Runtime data loading | Placement contract, dossier catalog, Scryfall cache | Writes data/catalog fields; fetches only when called | Module-relative `data/` base | `runtime/data.js` |
| Section/session navigation | Shared `vm_*` helpers and state | DOM visibility, auth/session calls | Route URLs, topbar, retake/sign-out | `runtime/navigation.js` where acyclic |
| Quick questionnaire/refinement | Placement engine, presentation helpers, state, result renderer | Writes quick/refinement/result state; DOM rendering when called | Cached placement and action contracts | `runtime/questionnaire.js` |
| Archived interview terminal | Shared interview helpers, state, result renderer | DOM messages, network/session calls when invoked | Feature flag and terminal actions | `runtime/interview.js` |
| Dossier HTML/result rendering | Dossier/presentation domains, state, route helpers | Reads/writes active result/view; renders DOM when called | Panel/action IDs and Maze handoff | `runtime/dossier-view.js` |
| Dossier panels/layout/segments/radar/deck links | State, radar, deck-link service, media hydration | DOM, URL/history, optional account calls | Panel/query/action contracts | `runtime/dossier-controls.js` |
| Card art, Scryfall lookup, preview/dialog/glossary | Scryfall cache, render helpers, state | Async DOM hydration and localStorage cache when called | Preview/dialog selectors and action IDs | `runtime/card-media.js` |
| Delegated actions and lifecycle | All callable controllers | Registers listeners only through explicit bind/boot calls | Existing `data-action`, keyboard, popstate, storage, and global surface | `runtime/actions.js` and `runtime/boot.js` |

## Compatibility Baseline

- Baseline HEAD: `0ba17eac393496be935e9ee956dcd633edeb9e02` on clean synchronized `main` (`0` ahead / `0` behind).
- Static facade surface: 40 named exports from `commander-dossier.js`; `archscry-result.js` star-re-exports that facade; 21 named exports from `index.js`.
- Browser compatibility globals: `answerQuickQuestion`, `goBackQuickQuestion`, `handleRetake`, `handleSavePlacement`, `handleSignOut`, `openInterviewDossier`, `openLibrary`, `openResearch`, `returnToInterviewSource`, `returnToPrimaryReading`, `saveCurrentResult`, `showSection`, `startInterviewFlow`, `startQuickFlow`, `submitInterview`, and `switchAdjacentView`.
- PASS baseline: JS lint; adaptive placement (37 factions / 37 golden paths); presentation snapshots (16 fixed cases); adjacent navigation; source/generated guardrails.
- Pre-existing baseline limitations: dossier integrity stops at its stale glossary source-text assertion; dossier follow-up stops at its stale result-directory source-text assertion; precon artifact tests cannot load the declared but locally absent `xlsx`; dossier audit resolves `scripts/data/factions.json` after the VM-572 move; VM-559 media projection reports the already-stale optional projection; full `npm test` reaches the established local dependency/source-contract limitations.
- Baseline checks produced no tracked product, data, generated, snapshot, audit, or evidence drift.

## Acceptance Criteria

- Phase A facade parity, focused QA, cycle check, zero drift, and `git diff --check` pass before Phase B starts.
- Phase A checkpoint is recorded below before any Phase B edit.
- Phase B preserves the exact boot sequence and compatibility surface with no import-time runtime effects.
- Source-inspection tests follow new ownership without weakening behavioral assertions.
- The deterministic Archscry data-path check resolves canonical `data/factions.json` from the owning module.
- Final focused, full, and rendered certification is no worse than baseline.
- The complete change is staged and uncommitted for owner acceptance.

## Phase A Checkpoint

- Affected implementation files: `assets/js/archscry/commander-dossier.js` plus `dossier/foundation.js`, `dossier/reading.js`, `dossier/precons.js`, and `dossier/audit.js`.
- Direct QA ownership updates: frontend JS lint, copy-boundary scope, and the VM-551 dossier-integrity source locator now inspect the extracted implementations rather than the facade.
- Facade parity: PASS. Static comparison against `HEAD` confirms the same 40 Commander dossier exports, unchanged `archscry-result.js` star facade, unchanged 21 `index.js` exports, and unchanged 16 browser globals without importing the browser route.
- Dependency integrity: PASS. All 20 current Archscry modules resolve; the affected graph is acyclic; extracted implementations have no dependency through `commander-dossier.js` or `index.js`.
- Focused QA: PASS for syntax, JS lint (15 files), copy boundaries (21 files), adaptive placement (37 factions / 37 golden paths), Gate B1 qualified alternatives (5,000 deterministic journeys), presentation snapshots (16 cases), adjacent navigation, and source/generated guardrails.
- Baseline limitations remain no worse: dossier integrity and dossier follow-up stop at the same stale `index.js` source assertions; precon artifacts remain blocked by locally absent `xlsx`; dossier audit retains its VM-572-relative-path failure; VM-559 media projection retains its pre-existing stale optional projection.
- Drift: PASS. No product data, generated output, snapshot, audit, research, or frozen-evidence diff.
- `git diff --check`: PASS. Line-ending conversion notices are Git working-copy warnings only and produce no content diff.
- Gate decision: Phase A is certified clean. Phase B may begin.

## Phase B Checkpoint

- Affected implementation files: the stable `assets/js/archscry/index.js` facade plus 12 cohesive modules under `assets/js/archscry/runtime/`; `scripts/lib/read-archscry-runtime-source.mjs` gives source-inspection tests an explicit ownership map.
- Facade parity: PASS. Static comparison against baseline `HEAD` confirms the same 21 route exports, 16 browser globals, and ordered `DOMContentLoaded` sequence without importing or initializing the browser route.
- State/side-effect integrity: PASS. `runtime/state.js` owns one `APP_STATE` object with the original defaults and mutation semantics. Extracted modules add no import-time browser initialization.
- Dependency integrity: PASS. All 32 Archscry modules resolve, the affected graph is acyclic, and no implementation imports through `index.js` or `commander-dossier.js`.
- Focused QA: PASS for frontend smoke including canonical `data/factions.json` resolution, JS lint (27 files), copy boundaries (30 files), placement (37/37), questionnaire presentation, Gate B1 runtime integration, Gate B1 qualified alternatives (5,000 journeys), deck links, discovery education, dossier recovery (2,000 journeys), presentation snapshots (16 cases), adjacent navigation, Scryfall request deduplication, card-rationale authority (37 identities), provider/Maze parity (155/155 destinations and 147 paths), and source/generated guardrails.
- Source-inspection contracts now read their owning runtime modules. Existing behavioral assertions were not weakened.
- Baseline limitations remain no worse: dossier integrity retains its stale glossary-source assertion; dossier follow-up retains its stale result-directory assertion; Gate A owner QA retains its pre-existing `loadCachedScryfallNamedCard` source assertion; VM-559 media projection and the VM-572-relative dossier audit remain unchanged limitations.
- Drift: PASS. No product data, generated output, snapshots, audits, research evidence, or frozen evidence changed.
- `git diff --check`: PASS.

## Final RobQA Readiness

- Full post-change gate was run once. It passed placement, live bias, 226 parser cases, Maze contracts, scratchpad, syntax, mode, and metadata coverage before stopping at the established local-workspace limitation: declared/locked `xlsx` is absent from `node_modules`.
- `npm run test:browser-smoke -- --archscry-only` and `npm run test:visual:archscry` were attempted once and stopped before route execution because declared/locked `chrome-launcher` is absent locally. No dependency install was performed.
- Fallback rendered sample: PASS for loading the real local Archscry entry, canonical faction data, restored dossier rendering, all six dossier panels, and four Maze paths with no visible placement/faction-load error. The browser control did not complete the retake journey, so owner acceptance retains the representative quick-reading and adjacent/Maze interaction check.
- Owner spot-check: one quick reading through dossier; one adjacent-fit switch where available; one dossier panel/card interaction; one Maze handoff; one mobile-width sanity check.
- Decision: ready for owner acceptance. Keep the complete VM-573 change staged and uncommitted; do not begin another architecture pass.

## Owner-Testing Observation

- Silverquill currently has two authored creature Card Signals and empty spell/permanent groups.
- Existing duplicate suppression reserves Killian for the precon surface, leaving Scriv as the visible Card Signal.
- VM-504 intentionally established this sparse source-bounded state.
- Azorius confirms multi-category Card Signals still render correctly after VM-573.
- Dimir and Witherbloom were also identified as sparse/empty Card Signals candidates for later review.
- This is inherited governed-content behavior, not a VM-573 decomposition regression. Card Signals content-quality work remains deferred to a separate planning-only task after VM-573 closeout.

## Non-Goals

No product, copy, placement, scoring, data, generated output, HTML, CSS, dependency, Node/toolchain, EOL-policy, dead-tooling, framework, Vite, TypeScript, or subsequent architecture-pass work.

# VM-547 canonical browser-runtime revision — Owner Review

Agent name: Codex

Task requested: Apply the Owner's second `REVISE` decision without redesigning the accepted semantic architecture; prove and repair the actual Archscry-to-Maze runtime/provenance chain, add real public-route regressions, freeze a new exact candidate, restart the local review environment, and stop before push or merge.

Related card: `docs/kanban/in-progress/VM-547-post-reading-commander-shortlist-bridge.md`

Exact material candidate: `dd82bc3549b07c074fe0ee55f8c6b192bf55d1fa`

Branch: `codex/vm-547-archscry-maze-discovery`

RobQA status: PASS on the exact material candidate

Owner state: Owner Review; no push, PR, merge, or `main` change

## Files reviewed

- RobDev and RobQA skills, usage guides, and frozen gates
- `docs/handoffs/HANDOFF_INDEX.md` and both prior VM-547 handoffs
- VM-547 Kanban card, Owner QA report, all-37 matrix, all-367 projection evidence, Maze data-flow/query contracts, and the current branch/worktree state
- Archscry HTML entry, route entry module, catalog loader, dossier renderer, presentation/path projection, and runtime state
- Maze HTML entry, initialization/rehydration, shared handoff factory, query core, query UI, search execution, and relevant unit/browser harnesses
- Generated 37-profile catalog, schema, and deterministic producer

## Files changed

- Cache/version ownership: `archscry/index.html`, `maze/index.html`, the Archscry entry/boot/actions/data/dossier/Identity Atlas/interview/questionnaire/presentation graph, and the Maze handoff/init/query graph
- Canonical handoff precedence: `assets/js/maze/maze-handoff.js`, `assets/js/maze/research-init.js`
- Regression coverage: `scripts/validate-frontend-html.mjs`, `scripts/vm547-discovery-browser.mjs`, `tests/maze/maze-search-tests.js`
- Earlier diagnostic commit in the same revision cycle: catalog producer/schema/runtime metadata, Archscry/Maze nonvisual provenance metadata, VM-547 profile tests, card/board state
- Review evidence/lifecycle docs: VM-547 card, QA report, this handoff, and handoff index

## What changed

- Added deterministic catalog runtime revision `vm547-runtime-v5` and SHA-256 fingerprint `e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db` before changing ownership behavior.
- Bound every relative JavaScript import in the Archscry render graph—including alternate Identity Atlas, state, card-media, boot, actions, interview, questionnaire, and their dependencies—and the Maze handoff/query chain to cache revision `vm547r5`. Static validation now scans all Archscry imports generically and fails on a missing or different revision.
- Exposed catalog/profile provenance as nonvisual DOM and URL metadata in Archscry and Maze.
- Made every Archscry route that claims a canonical `fit` fail closed unless Maze resolves that exact profile and path from the loaded catalog.
- Rebuilt canonical Maze handoff state from the loaded profile/path and gave it precedence over stale incoming `q`, `operatorQuery`, and `plainReadingQuery` values.
- Kept the legacy path factory fallback only for callers that do not claim a canonical dossier `fit` route.
- Changed the VM-547 browser harness from internal `vm-dev-review` injection to all 37 public `?explore=<slug>` routes and actual rendered-link clicks.
- Added all-37 equality checks for displayed labels, plain-language payloads, operator queries, profile IDs, runtime versions, and fingerprints; added eight required executed-thread witnesses, stale-payload replacement, and catalog-loss fail-closed coverage.

## Why it changed

The accepted semantic catalog was correct, but the candidate delivery chain was not atomic. Archscry's versioned entry imported the catalog-loading `runtime/data.js` without a version, Maze used the incoming URL query before canonical rehydration, and alternate Archscry paths such as the public Identity Atlas could invoke `dossier-view.js` through the older `vm625` cache key. A later server-log check also caught the provisional r4 graph requesting both versioned and unversioned presentation modules through state/card-media dependencies. These defects exactly reproduce the Owner's mixed new/legacy observation and show why a generic full-graph guard was required.

## RobDev compact packet

- Owning authority: the approved dossier source and reviewed VM-547 projection source remain semantic owners; the generated catalog is the runtime projection; `maze-handoff.js` remains the sole shared path factory.
- Producer/consumers: deterministic profile builder produces one catalog; Archscry loads it for compact links; Maze loads it for rehydration, semantic threads, inspection, and execution.
- Changed behavior: catalog/module provenance, canonical-route fail-closed behavior, canonical handoff precedence, and public-route regression coverage.
- Protected behavior: all 37 meanings/projections/fixtures, compact Archscry layout, rich Maze continuation, WUBRG boundary, result ranking, parser/compiler, Placement, persistence/history, unrelated routes, and visual atmosphere.
- Risks: cached entry, nested-module, and alternate-render-path drift plus URL payload precedence were the concrete risks; all now have deterministic guards. Legacy callers without `fit` retain compatibility.
- Smallest complete implementation: version the full affected render/import graph, rehydrate one authoritative path in Maze, fail canonical claims closed, and test the actual click route.
- Non-goals: no semantic re-authoring, UI redesign, popularity ranking, runtime AI, result-card work, or unrelated cache campaign.
- Stop condition: exact candidate passes focused semantic, public-route, existing regression, static, responsive, accessibility, provenance, stale-payload, and return-history gates, then waits for Owner.

## RobQA readiness and results

- Risk: QA-2 product/runtime ownership defect with semantic-trust consequences; narrow implementation, broad real-route blast radius across 37 dossiers.
- Changed behavior under test: public Archscry catalog lookup, shared path payload, Maze canonical rehydration, stale URL replacement, catalog-loss failure, and query execution.
- Protected contracts under test: 37-profile semantics, 367 projections, WUBRG unavailable boundary, responsive mechanics, accessibility mechanics, and three return/history journeys.
- PASS — 37/37 dossiers discovered, 37/37 canonical profiles, 37/37 public Archscry renders/clicks, 37/37 Maze rehydrations.
- PASS — 148/148 top-level governed states; 147 executable plus one explained WUBRG boundary.
- PASS — 148/148 source semantic threads; 367/367 lane projections; 354 executable/nonempty and 13 explicitly unavailable.
- PASS — 354/354 positive, 354/354 semantic-negative, and 354/354 boundary fixtures.
- PASS — 501/501 query-generation and 501/501 label-truthfulness checks.
- PASS — 74/74 desktop renders, 8/8 narrow flows, 8/8 mobile flows, 48/48 accessibility checks, 3/3 return-navigation journeys, 14/14 unavailable-state UI checks, 2/2 canonical fallback/stale-payload checks, and zero page errors.
- PASS — existing regression suite, 16/16 top-level suites.
- PASS — JS lint, HTML/cache-chain validation, source/generated guardrails, and diff whitespace.
- Skipped — `npm run test:maze-onboarding-browser`; the Owner directed that the previously disclosed moving VM-616 visual timeouts not consume more time. It is not counted as a pass.

Commands run on exact candidate:

- `npm run test:maze-discovery-profiles`
- `npm run test:vm547-browser`
- `npm test`
- `npm run lint:js`
- `npm run lint:html`
- `npm run test:source-generated`
- `git diff --check`

## Actual required browser witnesses

All eight loaded runtime `vm547-runtime-v5` and fingerprint `e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db` from both routes. Exact labels, interpretations, and queries are recorded in `docs/qa/2026-09-04-vm547-owner-review.md`.

- Witherbloom / BG → `WITHERBLOOM` → `Pests moving life into value`; no legacy death/mortality query.
- Azorius / WU → `WU` → `Taxes or visible restrictions`; no identity-only support query.
- Temur / GUR → `TEMUR` → `Power-four payoffs or Ferocious`; no generic support query.
- Green / G → `G` → `Ramp or land acceleration`.
- Colorless / C → `COLORLESS` → `True colorless mana`; no broad standalone artifact primitive.
- Yore / WUBR → `YORE` → `Artifact engines and repeated activation`.
- Five-Color → `WUBRG` → `Five-Color toolbox access`; impossible stretch remains absent and explained.
- Golgari / BG → `BG` → `Trade, then reclaim`.

Witherbloom and Golgari share `bg` identity but resolve different profile IDs, threads, interpretations, and final queries.

## Decisions made

- Treat a claimed `fit` as the canonical-route boundary. Missing catalog/profile/path is an error, never a silent legacy fallback.
- Rehydrate from Maze's own loaded catalog rather than trusting URL semantics; retain URL data only as transport and provenance evidence.
- Keep diagnostics nonvisual and test-visible; do not add production debugging UI.
- Preserve all authored semantic/profile bytes from the accepted-in-principle revision.
- Leave subjective visual judgment to the Owner and stop retrying the unrelated VM-616 visual harness.

## Risks / uncertainties

- The skipped VM-616 visual harness remains explicitly unproven on this candidate; no VM-547 assertion depends on it.
- Legacy/noncanonical Archscry callers without `fit` retain fallback behavior by design. Canonical all-37 routes are proven not to use it.
- No remote Scryfall result ranking is certified; deterministic query/result fixtures remain the trust boundary.

## Not touched

- No semantic profile, governed dossier meaning, projection fixture, or intentional exception was re-authored.
- No Archscry hero, typography, unrelated dossier card, global navigation, Maze result card, unrelated Maze entry mode, background/atmosphere, or outside-scope hover/focus treatment changed.
- No Placement, scoring, parser/compiler semantics, ranking, persistence key, or history contract changed.
- No push, PR, merge, branch deletion, or `main` mutation occurred.

## Follow-up recommendations

- Owner reviews only the short representative click order in the QA report and chooses `ACCEPT`, `ACCEPT WITH SMALL FOLLOW-UP`, or `REVISE`.
- Use the normal canonical Archscry route for Owner Review: `http://127.0.0.1:4177/archscry/?explore=witherbloom&panel=maze-discovery#maze-discovery-paths`.
- Use `http://127.0.0.1:4177/archscry/?explore=witherbloom&panel=maze-discovery&vm547=vm547r5#maze-discovery-paths` only as optional cache/provenance evidence, not as a production requirement.
- If accepted, use `ACCEPT VM-547` so integration remains bound to exact material candidate `dd82bc3549b07c074fe0ee55f8c6b192bf55d1fa`.

Next suggested agent: Owner review; Codex integration only after explicit acceptance.

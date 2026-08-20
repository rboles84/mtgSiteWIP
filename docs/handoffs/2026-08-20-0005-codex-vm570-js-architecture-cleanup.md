# Codex Handoff - VM-570 JavaScript Architecture Cleanup Pass 1

## Agent Name

Codex

## Task Requested

Complete VM-570 Pass 1: convert the organically grown JavaScript layout into product-oriented runtime, test, tooling, data, and vendor ownership while preserving Vox Mana behavior exactly.

## Related Kanban / Governance

- `docs/kanban/done/VM-570-javascript-architecture-cleanup-pass-1.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/architecture/js-architecture-inventory-pass1.json`

## Files Reviewed

- Governance and status: `AGENTS.md`, `CLAUDE.md`, `docs/handoffs/HANDOFF_INDEX.md`, recent VM handoffs, `docs/kanban/board.md`, relevant VM cards, `package.json`, `.github/workflows/*`.
- Architecture/history: `docs/architecture/*`, `docs/contracts/maze-query-contract.md`, `docs/reference/*`, Git history for `research/`, Maze, Archscry, extraction, and source/generated tooling.
- Runtime/test/tooling paths: tracked `.js` and `.mjs` population, HTML script consumers, ES imports/exports, dynamic imports, `require`, package scripts, CI paths, literal path references, tests, validators, and generated-source guardrails.

## Files Changed

- Runtime ownership moved into `assets/js/shared/`, `assets/js/home/`, `assets/js/archscry/`, `assets/js/maze/`, `assets/js/apocrypha/`, `assets/js/strategium/`, and `assets/js/vendor/`.
- Maze seed fixture moved from `research/scryfall-parser-seed-2026.json` to `data/maze/scryfall-parser-seed-2026.json`.
- Durable tests moved into `tests/archscry/`, `tests/maze/`, `tests/placement/`, `tests/deck-links/`, `tests/precons/`, `tests/semantic/`, and `tests/snapshots/`.
- Durable Node tooling moved into `scripts/build/`, `scripts/validate/`, `scripts/audit/`, and `scripts/lib/`.
- Current operational HTML/package/script/docs references updated to the new paths.
- VM-570 inventory, card, board, and this handoff updated.

## What Changed

- Promoted production Maze runtime out of `research/` into `assets/js/maze/`.
- Separated Archscry, home, Apocrypha, Strategium, shared shell behavior, and vendor browser code.
- Moved Chart.js to explicit vendor ownership as `assets/js/vendor/chart.umd.js`.
- Moved permanent tests out of production assets and research.
- Moved permanent build/validate/audit tooling out of research where ownership was established.
- Preserved VM-specific producer/remediation scripts in `research/` when they still had current package/test/registry/authority references or would require lifecycle untangling.
- Deleted only the two already-certified historical archive browser files: `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js`.

## Why It Changed

Repository evidence showed `research/` began as exploration but became live Implicit Maze ownership: `research.html` became `maze.html` in commit `f6a1dd4`, then `maze/index.html` in `0ceee15`; `research/research-init.js` entered in `9299e18`; before VM-570, `maze/index.html` loaded `../research/research-init.js` and Archscry imported `../../research/maze-scratchpad-store.js`. VM-012, VM-022, VM-129-series, and later Maze cards treated these files as Maze contracts, not disposable research.

## Decisions Made

- Path movement stayed structural only; no runtime decomposition, framework migration, module conversion, copy change, or behavioral refactor.
- The corrected inventory was built with a temporary Node utility and records dependency edges plus HTML/package/CI consumers.
- `tests/snapshots/presentation-snapshot-cases.json` moved with its regression test fixture because it was a permanent snapshot fixture, not historical research evidence.
- `scripts/build/build-semantic-readiness-provenance.mjs` kept only relocation-required path/root fixes; newline behavior was not changed because HEAD/index evidence showed the LF render behavior was pre-existing.

## Risks / Uncertainties

- Full `npm test` remains blocked by the established missing `xlsx` package import from `scripts/build/import-precon-mechanics-validation.mjs`; this is no worse than baseline.
- `npm run test:semantic-readiness` still reports stale semantic provenance due CRLF/LF freshness behavior; semantic manifest content remains unchanged and this was recorded as pre-existing/environmental.
- `node tests/archscry/archscry-dossier-followup-tests.js` still fails the established card-rationale surface assertion; path relocation is no longer the failure.
- Rendered browser smoke remains environment-blocked by missing `chrome-launcher`; in-app browser localhost smoke also could not reach the local server from the browser context.

## Tests Run

- PASS: VM-570 static integrity, including JS/MJS imports, HTML scripts, package node targets, moved-test `new URL(..., import.meta.url)` targets, stale dynamic URL prefixes, numeric corruption, and production references into old Maze research runtime.
- PASS: `npm run lint:html`
- PASS: `npm run lint:js`
- PASS: `npm run validate:source-generated`
- PASS: `npm run test:frontend-smoke`
- PASS: `npm run test:parser`
- PASS: `npm run test:placement`
- PASS: `npm run test:mode`
- PASS: `npm run test:builder`
- PASS: `npm run test:maze-finds`
- PASS: `npm run test:deck-links`
- PASS: `node tests/archscry/archscry-adjacent-navigation-tests.js`
- PASS: `node tests/maze/maze-search-tests.js`
- PASS: `node tests/maze/scryfall-request-dedupe-tests.js`
- PASS: `node tests/snapshots/presentation-snapshot-tests.js`
- PASS: `npm run test:gate-compression`
- FAIL, baseline: `node tests/precons/precon-artifact-tests.js` and `npm test` fail on missing `xlsx`.
- FAIL, baseline/content: `node tests/archscry/archscry-dossier-followup-tests.js`.
- FAIL, baseline/environmental: `npm run test:semantic-readiness`.
- FAIL, environment: `npm run test:browser-smoke` missing `chrome-launcher`.

## Not Touched

- Placement semantics, scoring, routing meaning, qualification, identity definitions, recommendation content, faction meaning, dossier content, card selections, Sound/Play content, terminology, copy, visual design, CSS, generated data, and feature behavior.
- Historical cards, historical handoffs, old audits, prototypes, and generated provenance strings were not bulk-rewritten for path cleanliness.
- VM-specific `.mjs` producer/remediation lifecycle cleanup was left for a later pass.

## Follow-Up Recommendations

- Pass 2: decompose large active route files only behind new behavior-preserving cards, especially `assets/js/archscry/index.js`, `assets/js/archscry/commander-dossier.js`, and `assets/js/maze/research-init.js`.
- Separate dead-tooling review for preserved VM-specific `research/*.mjs`.
- Resolve environment dependencies (`xlsx`, `chrome-launcher`) before using full-suite/rendered smoke as hard certification gates.
- Decide a repository line-ending policy for semantic provenance freshness outside VM-570.

## Owner Acceptance Correction

- Owner reproduction established that Archscry requested `/assets/data/factions.json` after the runtime relocation.
- Corrected `DATA_BASE_URL` in `assets/js/archscry/index.js` so canonical data resolves under `/data/`.
- Added a deterministic frontend-smoke assertion that resolves the literal data base against the moved module and verifies canonical `data/factions.json` exists.
- Owner reproduction was evidence of the data-path defect only; the owner subsequently confirmed corrected Archscry data loading.
- That review exposed a side defect where `.table-identity-list span` styled nested glossary terms as full-width labels; scoped the rule to each row's first label span and added a deterministic smoke invariant. The owner confirmed the corrected inline term display, completing final UI acceptance.

## Next Suggested Agent

Owner review, then a focused Pass 2 planning architect only if runtime decomposition is desired.

# Agent Handoff: Codex - Scryfall Discovery Foundation

Date: 2026-05-15 00:38
Related Card: VM-003
Related Plan: User-provided "Vox Mana Scryfall + Discovery Experience Plan"
Status: Complete

## Agent Name

Codex

## Task Requested

Use `AGENTS.md`, run preflight first, then implement the hybrid Scryfall bulk/index foundation, centralized tag taxonomy, Archscry discovery enrichment, Maze discovery paths, and lightweight Maze stash.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-14-2243-codex-cleanup-batch-1-foundation.md`
- `docs/handoffs/2026-05-14-2150-codex-agent-coordination-scaffold.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-001-agent-coordination-scaffold.md`
- `docs/kanban/done/VM-002-cleanup-batch-1-foundation.md`
- `docs/workflow.md`
- `docs/project-atlas.md`
- `docs/data-flow-map.md`
- `docs/core-logic-and-algorithms.md`
- `docs/data-contracts.md`
- `.gitignore`
- `package.json`
- `maze.html`
- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/shared.js`
- `research/research-init.js`
- `research/research-search.js`
- `research/scryfall-parser.js`
- `research/run-tests.js`

## Files Changed

- `.gitignore`
- `package.json`
- `scripts/download-scryfall-bulk.mjs`
- `scripts/build-scryfall-indexes.mjs`
- `scripts/inspect-scryfall-indexes.mjs`
- `data/scryfall/raw/.gitkeep`
- `data/scryfall/indexes/.gitkeep`
- `data/scryfall/indexes/card-flavor-index.json`
- `data/scryfall/indexes/commander-index.json`
- `data/scryfall/indexes/color-theme-index.json`
- `data/scryfall/indexes/mechanic-theme-index.json`
- `data/scryfall/indexes/scryfall-index-manifest.json`
- `data/taxonomy/vox-mana-tags.json`
- `docs/SCRYFALL_DATA_PIPELINE.md`
- `docs/VOX_MANA_TAG_TAXONOMY.md`
- `docs/project-atlas.md`
- `docs/data-flow-map.md`
- `docs/core-logic-and-algorithms.md`
- `archscry/index.html`
- `assets/js/index.js`
- `maze.html`
- `research/research-init.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-003-scryfall-discovery-foundation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-0038-codex-scryfall-discovery-foundation.md`

## What Changed

- Added Scryfall bulk download, index build, and index inspect scripts.
- Added npm scripts for `scryfall:download`, `scryfall:index`, `scryfall:inspect`, and `scryfall:refresh`.
- Downloaded local `oracle_cards` bulk data and kept raw JSON ignored.
- Generated committed lightweight Scryfall indexes for flavor samples, Commander candidates, color themes, mechanic themes, and index manifest metadata.
- Added a centralized Vox Mana tag taxonomy covering mechanical, playstyle, identity, and lore-tone tags.
- Enriched Archscry results with reading summaries, tag interpretations, Commander metadata, short Flavor Echoes, Maze discovery links, and Apocrypha library links.
- Added Maze general Discovery Paths, optional From Your Reading paths, and a local card stash with normalized saved card data and broad-compatible copy export.
- Updated project docs and file-based Kanban.

## Why It Changed

Vox Mana needed a hybrid discovery foundation: bulk data for slow card-expression knowledge, live Scryfall API calls for fresh search, and centralized tag meaning so Commander-first discovery can remain readable for newer players.

## Decisions Made

- Used `oracle_cards` as the v1 bulk source.
- Kept `data/scryfall/raw/*.json` and `*.json.gz` ignored, including the raw manifest required by the downloader/inspector.
- Applied a sampled derived flavor-index guardrail after the full flavor surface produced a broad 22 MiB index. The committed `card-flavor-index.json` is about 3.0 MiB and stores no full oracle or flavor text.
- Left Maze live API search, modes, pagination, recent searches, no-results fallback, and parser behavior intact.
- Implemented Commander candidate detection as practical v1 detection, not perfect Commander legality solving.

## Risks / Uncertainties

- `commander-index.json` is still about 4.8 MiB because practical Commander candidates include metadata and short excerpts for 2,977 candidates.
- Archscry discovery data adds several local JSON fetches on result pages; future optimization may lazy-load these only when opening a result.
- Browser visual verification was not run because no callable in-app browser tool was available in this turn.
- Scryfall query seeds for reading-based discovery are intentionally heuristic and should be refined after real usage.

## Tests Run

- `node --check scripts/download-scryfall-bulk.mjs` - passed.
- `node --check scripts/build-scryfall-indexes.mjs` - passed.
- `node --check scripts/inspect-scryfall-indexes.mjs` - passed.
- `node --check assets/js/index.js` - passed.
- `node --check research/research-init.js` - passed.
- `node --check assets/js/commander-dossier.js` - passed.
- `node -e "JSON.parse(...data/taxonomy/vox-mana-tags.json...)"` - passed.
- `npm.cmd run scryfall:download` - passed after network escalation approval.
- `npm.cmd run scryfall:index` - passed.
- `npm.cmd run scryfall:inspect` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed.
- `git status --short --ignored data/scryfall` - confirmed raw JSON and raw manifest are ignored.

## Not Touched

- No unrelated faction lore was edited.
- No `data/raw-factions/*` files were edited.
- No generated faction artifacts such as `data/factions.json`, `data/placement-model.json`, or Supabase context were edited.
- No deck validation, mana curve, land advice, Moxfield/Archidekt account integration, or account-synced stash storage was added.

## Follow-Up Recommendations

- Add browser/UI verification for Archscry result rendering and Maze stash flows when the in-app browser tool is available.
- Consider lazy-loading Scryfall discovery indexes only when a placement result is opened.
- Add focused tests for stash normalization and reading-path query generation.
- Revisit `commander-index.json` size after real result enrichment needs are clearer.

## Next Suggested Agent

- Test Strategist

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-003-scryfall-discovery-foundation.md`
- `docs/SCRYFALL_DATA_PIPELINE.md`
- `docs/VOX_MANA_TAG_TAXONOMY.md`
- User-provided Vox Mana Scryfall + Discovery Experience Plan

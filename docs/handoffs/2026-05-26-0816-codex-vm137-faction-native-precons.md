# Agent Handoff

- Agent name: Codex
- Task requested: Implement VM-137 by refining the Archscry precon layer so exact-color decks stay visible but faction-native decks render first for the active dossier view across the current 20-expression atlas.
- Related Kanban card, docs, or plans:
  - `VM-137`
  - `docs/reference/data-contracts.md`
  - `docs/architecture/data-flow-map.md`
  - `docs/architecture/project-atlas.md`
  - `docs/reference/manual-test-cases.md`

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-0731-codex-vm136-archscry-precon-layer.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-136-archscry-precon-layer.md`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `research/build-precon-artifacts.mjs`
- `research/precon-artifact-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precons.source.schema.json`
- `data/precons/vox-mana-precon-catalog.json`
- `data/precons/vox-mana-precon-catalog.schema.json`
- `data/factions.json`

## Files changed

- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `research/build-precon-artifacts.mjs`
- `research/precon-artifact-tests.js`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precons.source.schema.json`
- `data/precons/vox-mana-precon-catalog.json`
- `data/precons/vox-mana-precon-catalog.schema.json`
- `docs/reference/data-contracts.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-137-faction-native-precons.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-0816-codex-vm137-faction-native-precons.md`

## What changed

- Added curated `factionRefs` to the canonical precon source catalog and bumped the source and generated precon schema versions to `v2`.
- Updated the precon artifact builder to validate current Vox Mana expression keys, carry `factionRefs` into the generated runtime catalog, and keep the contract deterministic.
- Curated faction-native precon ownership across the current active pair-expression atlas:
  - 10 guild color keys
  - 5 Strixhaven colleges
  - mono colors left untagged in this pass so they fall back to a single exact lane
- Changed `buildPreconRecommendations(...)` so the dossier returns:
  - `nativeExact`
  - `otherExact`
  - `stretch`
- Removed the exact-match truncation, kept stretch capped, and made grouping precedence outrank mechanical score ordering.
- Updated the dossier UI to show faction-native lanes such as `Silverquill Precons` ahead of `Other WB Exact Matches`, while preserving the in-panel order `Recommended Precon Decks -> Commander Deck Starts -> Commander Lanes`.
- Refreshed tests and docs to describe faction-native grouping instead of a single capped exact lane.

## Why it changed

- VM-136 treated same-color sibling expressions as one exact-match pool and capped that pool, which let Silverquill-owned decks disappear behind generic WB decks.
- The follow-up needed to preserve all exact-color options while still telling the user which precons are actually native to the active dossier identity.
- Curating ownership in source data keeps the distinction explicit and avoids runtime guessing from deck names or product titles.

## Decisions made

- Faction-native ownership lives in canonical source data as `factionRefs`, not in inferred runtime heuristics.
- College-owned precons are tagged only to their college keys, not also to the sibling guild key.
- Mono colors participate in the rule globally but remain ungrouped until explicit mono-native source refs exist.
- Exact-color results are no longer capped; stretch remains the smaller exploratory lane.
- When no native exact group exists, the UI falls back to a single `Exact Match` lane.

## Risks / uncertainties

- Guild-native curation is intentionally conservative. Some same-color decks remain in `Other <identity> Exact Matches` because the source text did not make ownership strong enough to tag more aggressively.
- `npm run build:factions` rewrote `data/factions.json` with small generated drift unrelated to VM-137. It was left visible rather than manually editing generated output.
- The in-app browser could open the local Archscry route over a temporary local HTTP server, but its runtime blocked the same storage/event seeding tricks used by the screenshot harness. Visual regression coverage was used as the authoritative rendered check for the dossier panel.

## Tests run

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/index.js`
- `node --check research/precon-artifact-tests.js`
- `npm.cmd run build:precons`
- `node research/precon-artifact-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd test`
- `npm.cmd run build:factions`
- `npm.cmd run dossier:audit`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`

## Not touched

- Placement scoring and `placement_result` shape
- Save/resume and Supabase contracts
- Maze handoff behavior
- Strategium runtime and UI
- Top-level Archscry dossier rail and panel ids

## Follow-up recommendations

- Audit whether more exact-color decks should gain faction-native refs once more product-level or community-grounded ownership evidence is available.
- If mono-color precons ever need a native lane, add explicit curated refs instead of deriving ownership from color identity alone.
- Consider a future dossier audit fixture for each same-color sibling pair so native vs other exact grouping becomes part of regression coverage beyond Silverquill/Orzhov and Simic/Quandrix.

## Next suggested agent

- Test Strategist, if the next follow-up expands native-owner QA coverage across more same-color sibling dossier pairs and sparse mono-color pools.

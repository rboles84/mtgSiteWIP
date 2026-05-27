# Agent Handoff

- Agent name: Codex
- Task requested: Implement VM-136 by moving the curated precon source into Vox Mana's canonical data domain, adding source and generated schemas, generating a runtime precon catalog, rendering `Recommended Precon Decks` inside the Archscry `Commander Deck Starts` panel, updating tests/docs, and doing the work on a fresh branch.
- Related Kanban card, docs, or plans:
  - `VM-136`
  - `docs/reference/data-contracts.md`
  - `docs/architecture/data-flow-map.md`
  - `docs/architecture/project-atlas.md`
  - `docs/reference/manual-test-cases.md`

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-1719-codex-archscry-dossier-console.md`
- `docs/handoffs/2026-05-25-1838-codex-archscry-dossier-onboarding-trust-pass.md`
- `docs/handoffs/2026-05-25-2318-codex-vm132-archscry-dossier-ux-polish.md`
- `docs/handoffs/2026-05-26-0021-codex-vm135-archscry-card-voices-identity-story.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-136-archscry-precon-layer.md`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `research/run-tests.js`
- `scripts/visual-regression-archscry.mjs`
- `package.json`
- `docs/reference/data-contracts.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/research/vox_mana_precons_MASTER.json`
- `docs/research/vox_mana_precons_MASTER.csv`

## Files changed

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/css/archscry.css`
- `package.json`
- `research/run-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/build-precon-artifacts.mjs`
- `research/precon-artifact-tests.js`
- `scripts/visual-regression-archscry.mjs`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precons.source.schema.json`
- `data/precons/reference/vox-mana-precons.reference.csv`
- `data/precons/vox-mana-precon-catalog.json`
- `data/precons/vox-mana-precon-catalog.schema.json`
- `data/taxonomy/vox-mana-precon-themes.json`
- `data/taxonomy/vox-mana-precon-themes.schema.json`
- `docs/research/archive/vox_mana_precons_MASTER.json`
- `docs/research/archive/vox_mana_precons_MASTER.csv`
- `docs/reference/data-contracts.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-136-archscry-precon-layer.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-0731-codex-vm136-archscry-precon-layer.md`

## What changed

- Moved the curated precon dataset into `data/precons/` as the canonical source-of-truth lane and preserved the original `docs/research` files as archival provenance copies under `docs/research/archive/`.
- Wrapped the source JSON in a Vox Mana-style `_meta` + `precons` envelope and added a hand-authored source schema.
- Added a hand-authored precon theme taxonomy plus schema under `data/taxonomy/`.
- Added `research/build-precon-artifacts.mjs` and `npm run build:precons` to validate the source/taxonomy, normalize color identity and theme metadata, and emit `data/precons/vox-mana-precon-catalog.json` plus its generated schema.
- Added a pure `buildPreconRecommendations(...)` helper to `assets/js/commander-dossier.js` for exact-match and stretch-match recommendation ranking.
- Loaded the generated precon catalog and theme taxonomy into `APP_STATE` inside `assets/js/index.js`.
- Added the `Recommended Precon Decks` subsection above `Commander Deck Starts` and ahead of `Commander Lanes` inside the existing `commander-deck-starts` dossier panel.
- Added Archscry styles for precon cards, chips, badges, and lanes while keeping them inside the existing dossier visual system.
- Added new automated coverage for precon source/catalog validation, recommendation behavior, and dossier section ordering.
- Refreshed the Archscry visual regression baseline heights for the taller `commander-deck-starts` panel and the full `view-all` capture.
- Updated architecture, contract, and manual QA docs to describe the new `data/precons` pipeline and dossier behavior.
- Closed the VM-136 Kanban card by moving it from `in-progress` to `done`.

## Why it changed

- Archscry needed to move from identity interpretation alone into a more actionable dossier that can recommend real precon deck starts.
- The dataset needed to follow the same raw-plus-generated architecture as the rest of Vox Mana so runtime code does not depend on ad hoc research-doc paths.
- The schema and build layers reduce drift risk in a large curated source file and keep the runtime catalog deterministic.
- The new in-panel placement keeps the current dossier rail intact while improving the action flow: `Recommended Precon Decks` -> `Commander Deck Starts` -> `Commander Lanes`.

## Decisions made

- Kept the feature inside the existing `commander-deck-starts` panel rather than introducing a new dossier rail item.
- Treated `data/precons/vox-mana-precons.source.json` as the canonical source and the archived `docs/research` copies as provenance only.
- Added both source and generated schemas instead of introducing a new runtime schema-validation dependency.
- Used a theme taxonomy file under `data/taxonomy/` so normalization lives in data rather than being scattered through runtime code.
- Used exact-match and one-color stretch-match rules only; no price-aware ranking, commerce links, or saved-profile fit checks were added.
- Preserved current placement scoring, result shape, save/resume behavior, Maze handoff flow, and Strategium surfaces untouched.
- Backed out unrelated `data/factions.json` drift after running `build:factions` so the branch remains scoped to VM-136.

## Risks / uncertainties

- The archived `docs/research/archive/vox_mana_precons_MASTER.*` copies intentionally duplicate the canonical dataset for provenance. Future edits must happen only in `data/precons/vox-mana-precons.source.json`.
- The recommendation scoring is deterministic but still heuristic. Future tuning may want richer table-feel or difficulty weighting once more real-user feedback exists.
- Visual baselines were refreshed to accommodate the taller precon subsection. Any later Commander Deck Starts layout work should expect new visual diffs there first.
- `npm run dossier:audit` still reports warnings, but it completed with `failures: 0` before closeout.

## Tests run

- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `node --check research/precon-artifact-tests.js`
- `node --check research/build-precon-artifacts.mjs`
- `npm.cmd test`
- `npm.cmd run build:precons`
- `npm.cmd run build:factions`
- `npm.cmd run dossier:audit`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`

## Not touched

- Placement scoring and `placement_result` shape
- Supabase auth/profile contracts
- Maze handoff behavior and Maze runtime modules
- Strategium runtime and UI
- Top-level Archscry dossier rail and panel ids

## Follow-up recommendations

- Add a future QA sweep focused on dossiers with thin or no exact-match precon pools to decide whether fallback copy should become more identity-specific.
- Consider a later doc note or small script to remind contributors that archived `docs/research` copies are non-authoritative.
- If precon ranking expands later, keep the ranking data-driven in the taxonomy/build layer rather than growing more presenter-side string heuristics.

## Next suggested agent

- Test Strategist, if a later follow-up wants broader real-dossier acceptance cases across more identities and sparse-data scenarios.

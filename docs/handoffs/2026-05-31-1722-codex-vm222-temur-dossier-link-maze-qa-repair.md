# 2026-05-31 17:22 - Codex - VM-222 Temur Dossier Link And Maze QA Repair

## Agent Name

Codex

## Task Requested

Use the user's manual QA results to repair Temur dossier link and Maze handoff defects after VM-221.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1652-codex-vm221-temur-live-parity-hardening.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-221-temur-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/maze-handoff.js`
- `assets/js/quick-reading-tests.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`

## Files Changed

- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-222-temur-dossier-link-maze-qa-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1722-codex-vm222-temur-dossier-link-maze-qa-repair.md`

## What Changed

- Changed Temur public Commander directory routing so EDHREC uses `https://edhrec.com/commanders/temur` and MTGDecks uses `https://mtgdecks.net/Commander/temur-commanders`.
- Added Temur color-order slug handling for external deck routing so color-array callers also resolve to the public `temur` slug.
- Added a Layered Identity display helper so shard/wedge identities with routing labels show the public expression label instead of sorted mana-code badges such as `URG`.
- Hardened Maze handoff resolution to prefer active `fit`, `factionName`, or inferred Temur query identity before stale cached placement state.
- Prevented stale cached `WB`/Orzhov placement state from leaking into Temur "From Your Dossier" sidebar labels, terms, or outside-color stretch paths.
- Added regressions for Temur public deck-start URLs, visible identity metadata, and stale-`WB` Maze handoff recovery.

## Why It Changed

Manual QA showed Temur was still leaking implementation color codes into public-facing deck links and identity display, and a Maze handoff could show stale `WB`/generic sidebar paths instead of the active Temur reading. These were post-promotion presentation defects, not raw evidence or generated-data issues.

## Decisions Made

- Keep `GUR` valid as Temur query/color metadata.
- Use public `temur` slugs for external commander directories.
- Keep the repair in runtime display and test files only; do not rebuild generated artifacts.
- Do not edit Temur raw claims/sources, research docs, architecture docs, Home preview, routes, Maze route behavior, schemas, fixtures, builder mappings, or Supabase files.

## Risks / Uncertainties

- The worktree remains broadly dirty with pre-existing Abzan, Temur, Sultai, Jeskai, Mardu, generated, and documentation changes.
- Broad `git diff --name-only` still lists many files outside VM-222 because of that pre-existing baseline. VM-222 relied on scoped diffs, raw hashes, and focused tests.

## Tests Run

- `Get-FileHash data\raw-factions\temur\temur.claims.json -Algorithm SHA256`
- `Get-FileHash data\raw-factions\temur\temur.sources.json -Algorithm SHA256`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\index.js`
- `node --check assets\js\maze-handoff.js`
- `node --check research\research-init.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node --check research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Scoped smoke check for Temur directory links and Layered Identity metadata
- Scoped `git diff --check`

## Raw Hash Preservation

- `data/raw-factions/temur/temur.claims.json`: `C2C7839BE001619C2A5BEA0F2CAC2838FDC94C632AFFC3C7CC5888F79800E029`
- `data/raw-factions/temur/temur.sources.json`: `D2D2C96E40D78BE58E9BB5FA2AC414F6738074E611237C56412E9B551C4C3435`

## Not Touched

- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `docs/research/temur/**`
- `docs/research/temur frontier/**`
- `docs/architecture/colors/temur/**`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- Generated artifacts
- Home preview membership
- Static routes
- Maze files and route behavior
- Schemas and fixtures
- Supabase config, migrations, deployment settings, and generated faction context

## Follow-Up Recommendations

- Human-review the Temur dossier and Maze sidebar again from a fresh browser state and from a stale cached state.
- Keep any future Temur placement tuning or generated-data changes in a separate card.

## Next Suggested Agent

Human reviewer.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-222-temur-dossier-link-maze-qa-repair.md`
- `docs/kanban/done/VM-221-temur-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-1652-codex-vm221-temur-live-parity-hardening.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`

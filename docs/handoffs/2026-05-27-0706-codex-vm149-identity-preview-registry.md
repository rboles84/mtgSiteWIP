# Handoff: VM-149 Identity Preview Registry Canonicalization

## Agent Name
Codex

## Task Requested
Implement VM-149 by moving the Home Identity Signal preview metadata out of `assets/js/newindex2.js` and into the canonical identity registry, then update schema/tests/docs while keeping the existing VM-149 card in backlog and avoiding duplicate cards.

## Files Reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
- `docs/handoffs/2026-05-24-2315-codex-vm121-precommit-hardening.md`
- `docs/handoffs/2026-05-26-0021-codex-vm135-archscry-card-voices-identity-story.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `data/identity-layers.json`
- `data/identity-layers.schema.json`
- `assets/js/newindex2.js`
- `assets/js/commander-dossier.js`
- `assets/js/identity-layers.js`
- `assets/js/quick-reading-tests.js`
- `docs/reference/data-contracts.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`

## Files Changed
- `docs/kanban/backlog/VM-149-identity-preview-registry-canonicalization.md`
- `data/identity-layers.json`
- `data/identity-layers.schema.json`
- `assets/js/newindex2.js`
- `assets/js/commander-dossier.js`
- `assets/js/identity-layers.js`
- `assets/js/quick-reading-tests.js`
- `docs/reference/data-contracts.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`

## What Changed
- Rewrote the existing VM-149 backlog card with the implemented scope, acceptance checks, non-goals, and verification list.
- Migrated all 20 Home preview identities from route-local JavaScript into `data/identity-layers.json`.
- Added expression-level registry fields: `display_code`, `aliases`, `placement_eligible`, `preview_eligible`, and preview-only metadata for preview-eligible expressions.
- Mapped preview scores to the canonical axis object order: `order`, `knowledge`, `ambition`, `freedom`, `growth`.
- Updated the identity-layer schema to require the new registry contract and use only the enum `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, `colorless`.
- Refactored `assets/js/newindex2.js` so the Home Identity Signal fetches `./data/identity-layers.json`, builds preview identities from eligible entries, sorts by `preview_order`, and keeps the existing `./data/factions.json` lore fetch.
- Removed the private Home `identities` and `colorProfiles` data islands from `assets/js/newindex2.js`.
- Routed Home visual-regression identity hooks through registry aliases, so `boros`, `RW`, and `WR` all resolve to canonical `WR`.
- Reduced duplicated dossier alias drift and documented the remaining string-only fallback as temporary.
- Updated quick-reading tests, data-contract docs, route ownership docs, data-flow docs, project atlas, and manual QA notes.

## Why It Changed
Home preview identity data had become route-local even though identity expressions already have a canonical registry. VM-149 makes the registry the source of truth before any shard, wedge, four-color, five-color, or colorless runtime expansion can deepen the drift.

## Decisions Made
- Kept `assets/js/newindex2.js` and `assets/css/newindex2.css` names for this task; the route rename asset cleanup should be handled separately because harnesses, docs, and validators still reference those names.
- Kept VM-149 in backlog as requested and did not create a duplicate card or move the board lane.
- Preserved Home display codes like `GW`, `GU`, and `RW` through `display_code` while routing canonical keys through `WG`, `UG`, and `WR`.
- Used `display_code` to preserve the prior component overlay order and keep the visual regression baseline stable.
- Did not include `family` in schema or data.
- Left dossier routing partly fallback-driven, but made the fallback smaller and explicitly temporary until the dossier can consume the registry alias index directly.

## Risks / Uncertainties
- Dossier external routing still has a string-only fallback map, so future alias additions should finish the registry-driven routing pass instead of expanding the fallback again.
- The Home route asset names still carry `newindex2`; this is intentional scope control, but it remains a cleanup opportunity after VM-149.
- Browser QA in the restricted sandbox blocks Google Fonts network requests; the manual harness filtered that existing external-font error and verified the route-local behavior.

## Tests Run
- `node --check assets/js/newindex2.js`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check assets/js/identity-layers.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:visual:newindex2`
- Temporary browser QA harness: verified 20 preview identities, `boros`/`RW`/`WR` alias routing to Boros, held signal details, and radar scores matching `data/identity-layers.json`.

## Not Touched
- No shard, wedge, four-color, five-color, colorless, or family-like runtime expansions were added.
- No MTG lore, commander facts, or faction philosophy claims were invented.
- No placement scoring algorithm changes were made.
- No precon source, generated precon catalog, ranking, or recommendation behavior was changed.
- No Maze/Scryfall parser, Supabase/profile contract, or route redesign work was touched.
- No `newindex2` asset rename was performed.

## Follow-Up Recommendations
- Open or reuse a separate cleanup card for renaming `assets/js/newindex2.js` and `assets/css/newindex2.css` to route-current `index` asset names.
- Finish dossier identity routing against the registry alias index and remove the temporary fallback map.
- When future non-current institutions are added, define their runtime requirements separately before schema inclusion.

## Next Suggested Agent
Implementation agent for the later asset-name cleanup; JSON Cartographer if future identity-expression families or multicolor expansions are proposed.

## Related Kanban Card, Docs, Or Plans
- `docs/kanban/backlog/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/reference/data-contracts.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`

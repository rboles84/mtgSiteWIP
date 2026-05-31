# Agent Handoff - VM-190 Jund Starter Cards And Mana Base Coverage

## Agent Name

Codex

## Task Requested

Fill Jund Starter Card References instead of suppressing them, and make sure every live placement has placement-fit mana-base recommendations.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2237-codex-vm189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/scryfall/raw/oracle-cards.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `research/archscry-dossier-followup-tests.js`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-190-jund-starter-cards-mana-base-coverage.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-2303-codex-vm190-jund-starter-cards-mana-base-coverage.md`

## What Changed

- Added Jund starter-card references in the identity-layer display metadata:
  - Creatures: `Prossh, Skyraider of Kher`, `Korvold, Fae-Cursed King`, `Mayhem Devil`
  - Instants and sorceries: `Terminate`, `Cultivate`, `Victimize`
  - Enchantments and artifacts: `Goblin Bombardment`, `Moldervine Reclamation`, `Rhythm of the Wild`
- Added Jund land-base metadata for premium, midrange, budget, and utility lanes.
- Added Naya land-base metadata so the post-VM-188 live Naya placement is not basics-only.
- Rebuilt generated faction, placement, schema, and Supabase context outputs through `npm.cmd run build:factions`.
- Extended Archscry dossier tests so:
  - Jund must expose authored starter-card groups.
  - Jund starter cards resolve and satisfy `id<=brg`.
  - Jund and Naya render all nonbasic land tiers.
  - Every live placement has placement-fit mana-base metadata and color-legal rendered land recommendations.

## Why It Changed

The user wanted Jund's Starter Card References to display real starter cards rather than being hidden, and wanted mana-base recommendations to exist and fit the placement every time. VM-189 made empty panels suppress correctly; VM-190 fills the Jund data and closes the remaining live shard mana-base gap.

## Decisions Made

- Starter-card and land-base additions live in `data/identity-layers.json` display metadata, then flow into generated runtime data through the approved builder.
- Jund starter cards are presentation/support picks, not raw claims or lore evidence.
- Naya received land-base metadata only; Naya starter cards remain out of scope for this pass.
- Existing duplicate suppression in the land renderer remains in place, so shared lands such as Command Tower and Exotic Orchard render once.

## Risks / Uncertainties

- The worktree was already dirty with prior shard/runtime changes and untracked shard materials before VM-190. This task preserved that state and did not revert unrelated files.
- The selected Jund cards are Commander-facing starter references from committed local Scryfall data, not new lore/canon evidence.
- `git diff --check` still emits the repo's existing LF-to-CRLF working-copy warnings when run across the dirty tree.

## Tests Run

- `node -e "JSON.parse(require('fs').readFileSync('data/identity-layers.json','utf8')); console.log('identity-layers json ok')"`
- `node --check research/build-faction-artifacts.mjs`
- Local Scryfall resolution check for selected Jund cards and Jund/Naya lands
- `npm.cmd run build:factions`
- `node --check assets/js/index.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`

## Not Touched

- `data/raw-factions/jund/jund.claims.json`
- Jund research docs
- Jund architecture docs
- Home preview files
- Route maps, static pages, Maze routes, route CSS, or route keys
- New lore sources, evidence rows, manual-fill rows, raw claims, or Home entries

## Follow-Up Recommendations

- Manually smoke a Jund result in browser to confirm the starter-card images load and the mana-base tiers feel right in the live layout.
- If Naya starter-card references are desired, open a separate Naya starter UX card rather than expanding this Jund-focused pass.

## Next Suggested Agent

Manual QA / Product Reviewer for live Jund dossier and mana-base acceptance.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-190-jund-starter-cards-mana-base-coverage.md`
- `docs/kanban/done/VM-189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `docs/handoffs/2026-05-30-2237-codex-vm189-jund-dossier-empty-panel-link-dedup-repair.md`

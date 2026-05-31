# VM-197 Alara Shard Gold-Standard Parity Closeout

## Agent name

Codex

## Task requested

Close the Alara shard parity lane against the gold-standard 20-expression baseline plus five live shards: `BANT`, `ESPER`, `GRIXIS`, `JUND`, and `NAYA`. Preserve shard names as public expression keys, keep `WUG`/`WUB`/`UBR`/`BRG`/`RGW` as color-direction/query metadata only, add missing Grixis Commander Compass display/support data, refresh stale placement-domain documentation, conditionally harden identity-layer schema, rebuild generated artifacts only through `npm.cmd run build:factions`, update tests, close VM-197, and update the handoff index.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent shard handoffs: VM-192, VM-193, VM-194, VM-195, VM-196
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-197-alara-shard-gold-standard-parity-closeout.md`
- `docs/architecture/placement-domains.md`
- `data/identity-layers.json`
- `data/identity-layers.schema.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `research/build-faction-artifacts.mjs`
- `research/archscry-dossier-followup-tests.js`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `data/precons/vox-mana-precon-catalog.json`
- `data/scryfall/indexes/commander-index.json`

## Files changed

- `data/raw-factions/grixis/grixis.profile.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/identity-layers.schema.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/architecture/placement-domains.md`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-197-alara-shard-gold-standard-parity-closeout.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0058-codex-vm197-alara-shard-parity-closeout.md`

## What changed

- Added source-side Grixis Commander Compass support curation in the raw Grixis profile, bounded as product/operator support only.
- Added exact Grixis Commander candidate discovery via `id=ubr is:commander f:commander`; retained `UBR` only as query metadata in support links.
- Rebuilt generated faction artifacts through `npm.cmd run build:factions`.
- Updated identity-layer meta notes to describe the current 25-expression live placement set while preserving the original 20-expression Home preview set.
- Hardened `data/identity-layers.schema.json` so all five shard expression keys are required live peers.
- Updated placement-domain architecture docs from stale 20 + Bant / 21 wording to 20 baseline + 5 shards = 25 live placement expressions.
- Documented that raw source coverage remains 20 faction folders and should not be inflated by this card.
- Added/extended regressions for Grixis Commander Compass support boundaries, exact Commander identity, shard color-code non-keys/non-aliases, preview eligibility, and the original 20-expression Home preview.
- Moved VM-197 from in progress to done.

## Why it changed

The shard chain had already promoted Bant, Esper, Grixis, Jund, and Naya to live placement peers, but Grixis lacked Commander Compass display/support data and the architecture/schema/docs still carried stale pre-closeout assumptions. VM-197 aligns the live data, docs, schema, generated artifacts, and regression coverage without making a new shard expansion.

## Decisions made

- Public expression keys remain shard names only: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA`.
- `WUG`, `WUB`, `UBR`, `BRG`, and `RGW` remain color-direction/query metadata only.
- Grixis Commander Compass candidates are support-only display curation, not raw lore evidence.
- Commander candidate searches must use exact identity; support/deck lanes may keep subset searches only where the existing Commander Compass contract treats them as support-card lanes.
- Schema hardening was safe in this slice because tests and generated artifacts already treat all five shards as permanent live peers.
- Raw source folder count remains 20 and should not be inflated to match the 25 live placement expressions.

## Risks / uncertainties

- The worktree remains very dirty from prior shard work; this closeout did not attempt to normalize unrelated modified or untracked files.
- Generated artifact diffs include prior shard parity state already present in the dirty branch, plus the VM-197 Grixis Commander Compass rebuild.
- Grixis Commander Compass uses existing local support sources and local Scryfall commander data; it does not settle deferred raw-lore topics such as geography, named figures, unearth doctrine, or Conflux chronology.

## Tests run

- `node -e "const fs=require('fs'); for (const p of ['data/raw-factions/grixis/grixis.profile.json','data/identity-layers.json','data/identity-layers.schema.json']) JSON.parse(fs.readFileSync(p,'utf8')); console.log('json ok');"` - passed
- `node --check research/archscry-dossier-followup-tests.js` - passed
- `npm.cmd run build:factions` - passed
- `npm.cmd run test:placement` - passed
- `npm.cmd test` - passed
- `npm.cmd run audit:factions` - passed
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed with line-ending warnings only

## Not touched

- Placement scoring
- Question bank
- Home preview expansion
- Maze behavior
- Runtime routes
- Raw lore claim files
- Raw-faction folder additions, deletions, or renames
- Manual edits to generated faction artifacts outside the sanctioned rebuild

## Follow-up recommendations

- Keep any future Alara domain selector or route work behind a separate architecture card.
- If Grixis lore detail is needed later, add evidence to the Grixis source packet before promoting geography, figure, or mechanics claims.
- Before commit/push, review the broader dirty worktree because many shard files predated VM-197 and remain mixed with this closeout.

## Next suggested agent

Release Steward or Test Strategist for a final dirty-worktree/package review before bundling the shard parity branch.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-197-alara-shard-gold-standard-parity-closeout.md`
- `docs/architecture/placement-domains.md`
- `docs/handoffs/2026-05-31-0006-codex-vm193-grixis-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0019-codex-vm194-bant-live-parity-text-hardening.md`
- `docs/handoffs/2026-05-31-0026-codex-vm195-esper-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0022-codex-vm196-naya-live-parity-archscry-text-hardening.md`

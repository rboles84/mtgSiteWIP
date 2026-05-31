# VM-192 Jund Live Parity And Archscry Text Hardening Handoff

Agent name: Codex

Task requested: Execute the attached Jund live parity and Archscry text hardening prompt: scan Jund against mature live identity UX expectations, fill missing presentation/support data as needed, and keep lore/raw-claim boundaries intact.

Related Kanban card: `VM-192 - Jund Live Parity And Archscry Text Hardening`

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`
- `docs/handoffs/2026-05-30-2237-codex-vm189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/handoffs/2026-05-30-2303-codex-vm190-jund-starter-cards-mana-base-coverage.md`
- `docs/handoffs/2026-05-30-2347-codex-vm191-jund-archscry-placement-surface-completeness.md`
- `data/identity-layers.json`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.changelog.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/done/VM-192-jund-live-parity-archscry-text-hardening.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2358-codex-vm192-jund-live-parity-archscry-text-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Replaced the visible Jund Commander spellcraft caveat with player-facing Vox Mana support-texture copy.
- Updated the Jund raw profile mechanics summary so generated placement output no longer exposes the internal VM-179 caveat.
- Updated the Jund Commander support source note from public-style `Exact BRG` wording to `Exact Black/Red/Green Commander rows`.
- Rebuilt generated placement artifacts through `npm.cmd run build:factions`.
- Added rendered Jund dossier tests for fallback copy, public color-code labels, UR leakage, route-like Jund paths, and exact/subset Commander query contracts.

## Why It Changed

VM-191 filled the data surface, but Jund still had one mature-UX gap: some visible/generated spellcraft language could expose internal work-card caveats rather than a polished Vox Mana explanation. VM-192 keeps the same support-only boundary while making the live Archscry surface read like product copy.

## Decisions Made

- Keep `JUND` as the only live identity key.
- Keep `brg` as internal query/color metadata only.
- Keep Commander, Scryfall, precon, starter-card, and mechanics content as support-only display texture.
- Do not add new lore, raw claims, source evidence, routes, Home preview entries, schema fields by hand, or Maze behavior changes.

## Risks / Uncertainties

- Grixis and Naya still have older internal mechanics caveat language in generated placement output. This pass intentionally hardened Jund only.
- The broader worktree contains many pre-existing dirty/untracked shard and runtime files; review scoped diffs before commit.

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/build-faction-artifacts.mjs`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git diff --check`

## Not Touched

- `data/raw-factions/jund/jund.claims.json`
- `docs/research/jund/`
- `docs/architecture/colors/jund/`
- Home preview entries
- Route maps or static routes
- Maze behavior
- Naya source/raw/architecture paths

## Follow-Up Recommendations

- Consider a later shard-wide text hardening pass for Grixis and Naya generated mechanics caveats so all live shards share the same mature presentation standard.

## Next Suggested Agent

Test Strategist for a shard-wide rendered text audit across Bant, Esper, Grixis, Jund, and Naya.

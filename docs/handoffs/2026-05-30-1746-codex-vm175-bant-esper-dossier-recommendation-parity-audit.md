# 2026-05-30 17:46 - Codex - VM-175 Bant Esper Dossier Recommendation Parity Audit

## Agent Name

Codex

## Task Requested

Check Bant and Esper for the same recommendation and Maze sidebar issues found in Grixis: off-color snippets, missing starter UX/mana-base data, commander searches using subset identity, and Maze `From Your Dossier` paths falling back to a narrower stored primary identity.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1715-codex-vm173-grixis-dossier-recommendation-quality-repair.md`
- `docs/handoffs/2026-05-30-1728-codex-vm174-grixis-maze-sidebar-identity-repair.md`
- `docs/kanban/board.md`
- `data/factions.json`
- `data/archscry-flavor-snippets.json`
- `data/scryfall/indexes/card-flavor-index.json`
- `data/scryfall/indexes/commander-index.json`
- `data/scryfall/raw/oracle-cards.json`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`

## Files Changed

- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-175-bant-esper-dossier-recommendation-parity-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1746-codex-vm175-bant-esper-dossier-recommendation-parity-audit.md`

## What Changed

- Added placement regression coverage that verifies `BANT`, `ESPER`, and `GRIXIS` commander package links use exact commander identity for commander searches and subset identity for support/99 searches.
- Expanded Archscry dossier follow-up tests so `BANT`, `ESPER`, and `GRIXIS` starter UX cards and nonbasic mana-base tiers must resolve against committed Scryfall oracle data and satisfy the shard Commander identity.
- Expanded Maze sidebar tests so active `BANT`, `ESPER`, and `GRIXIS` handoffs override a stored WU primary placement result when rebuilding `From Your Dossier`.

## Why It Changed

Manual QA found Grixis-specific defects in card voices and Maze sidebar identity reconstruction. Bant and Esper were already covered partially, but the regression net did not explicitly prove the same surfaces stayed correct for all live shards.

## Decisions Made

- No product data or runtime code changes were needed for Bant/Esper.
- Treated Bant and Esper as parity checks against their current live shard identities: `BANT` = `WUG`, `ESPER` = `WUB`.
- Kept existing Grixis-only outside-color stretch suppression. Bant and Esper still follow the current shared four-path policy.

## Risks / Uncertainties

- The worktree remains dirty from the ongoing VM-164 through VM-175 work; unrelated dirty files were preserved.
- `git diff --check` passed but continued to report existing LF-to-CRLF normalization warnings.

## Tests Run

- `node --check research/maze-search-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node research/maze-search-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git diff --check`

## Not Touched

- No generated artifact rebuild.
- No Home, route, schema, raw-faction, lore source, or Supabase source changes.
- No new live keys or color aliases.

## Follow-Up Recommendations

- Manual QA can spot-check Bant and Esper Maze launches once after refresh, but the audit found no matching Bant/Esper defect.

## Next Suggested Agent

Manual QA / Browser verification if desired.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-175-bant-esper-dossier-recommendation-parity-audit.md`
- `docs/handoffs/2026-05-30-1715-codex-vm173-grixis-dossier-recommendation-quality-repair.md`
- `docs/handoffs/2026-05-30-1728-codex-vm174-grixis-maze-sidebar-identity-repair.md`

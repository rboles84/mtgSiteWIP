# VM-169 - Bant Gold-Standard Parity Cleanup

ID: VM-169
Title: Bant Gold-Standard Parity Cleanup
Status: done
Type: Documentation / Raw Data Status Normalization
Area: Bant, Research Docs, Architecture Docs, Raw Faction Data
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Closed: 2026-05-29

## Summary

Run a status-label normalization pass so Bant can serve as the expansion template without claim drift. This is not lore enrichment. Runtime Bant already follows the implementation plan: `BANT` is live, `WUG` remains metadata-only, Home preview stays off, and placement tests pass.

## Expansion Template Reference

Use Bant as the future shard expansion template; preserve source-bound status labels and metadata-only color-code boundaries. Future shard work, starting with Esper, should cite VM-169 before architecture docs, raw packets, or runtime promotion work. This reference does not promote any shard live; Esper remains source-only/non-live after VM-163.

## Scope Completed

- Updated stale uncertainty/status language only where VM-159A/VM-168 already resolved, bounded, demoted, or superseded it.
- Kept Asha bounded with no founder or angel-creation-architect claim.
- Kept Elspeth bounded with no governance or institution-building claim.
- Kept Jhess, Topa, and Eos source-limited rather than wholly unresolved where the curated packet already bounded their status.
- Kept Mubin within the curated packet's supported role/status.
- Scanned both Bant architecture docs for stale pre-live wording.
- Normalized raw Bant metadata in `data/raw-factions/bant/`.
- Rebuilt generated artifacts only through `npm.cmd run build:factions`.

## Non-Goals Preserved

- No lore enrichment or reinterpretation.
- No broad archival research cleanup.
- No placement scoring, question-bank, Home preview, Maze, route CSS/JS, or broad shard framework work.
- No manual edits to generated artifacts.
- No direct quote/source fetching.

## Acceptance Evidence

- No active Bant architecture docs retain stale pre-live wording in the targeted scan.
- No `bant-source-draft-v0.1` remains in raw or generated Bant artifacts in the targeted scan.
- No structured Bant confidence field uses `Medium-High` in raw Bant data.
- WUG guard passed: no `WUG` alias, generated top-level key, raw-to-key target, or `identity.expression_key`; `WUG` remains allowed only as color-direction metadata/prose.
- `npm.cmd run build:factions` passed and rebuilt generated artifacts through the builder.
- `npm.cmd run test:placement` passed with `21 factions, 21 golden paths`.
- `node research/archscry-dossier-followup-tests.js` passed.
- `npm.cmd test` passed.
- `git diff --check` passed with line-ending warnings only.

# VM-170 - Bant Research Folder Cleanup Before Push

ID: VM-170
Title: Bant Research Folder Cleanup Before Push
Status: done
Type: Documentation Stewardship
Area: Bant, Research Docs, Source Organization
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Closed: 2026-05-29

## Summary

Cleaned up `docs/research/bant/` before the Bant branch bundle is committed and pushed. The approved Bant packet is now easy to scan, Bant-specific support inputs live under source material, and duplicate or unmanaged artifacts are archived without deleting documentation.

## Scope Completed

- Kept approved Bant packet files at the top level of `docs/research/bant/`.
- Moved Bant-specific support inputs into `docs/research/bant/source-material/`.
- Moved duplicate local canon captures and broad unmanaged drafts into `docs/research/archive/bant-pre-push-cleanup/`.
- Updated active Bant references so they point to canonical source paths or the new source-material paths.
- Preserved VM-169's expansion-template reference and `BANT` / `WUG` boundaries.

## Non-Goals Preserved

- No lore enrichment or claim reinterpretation.
- No placement scoring, question bank, Home preview, Maze, route CSS/JS, or broad shard framework changes.
- No permanent deletion of docs.
- No commit or push in this card.

## Acceptance Evidence

- `docs/research/bant/` top level contains only approved packet files plus `source-material/`.
- README distinguishes approved packet files, source material, canonical shared sources, and archived/non-authoritative artifacts.
- Active Bant path scans show no references to moved top-level duplicate files.
- `npm.cmd run build:factions` passed and rebuilt generated source metadata through the normal builder.
- `npm.cmd run test:placement` passed with `21 factions, 21 golden paths`.
- `node research/archscry-dossier-followup-tests.js` passed.
- `npm.cmd test` passed.
- `git diff --check` passed with line-ending warnings only.

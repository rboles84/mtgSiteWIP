# 2026-05-29 22:54 - Codex - VM-170 Bant Research Folder Cleanup

## Agent Name

Codex

## Task Requested

Clean up `docs/research/bant/` and put files where they need to go before the Bant branch bundle is committed and pushed.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent Bant handoffs VM-157 through VM-169
- `docs/kanban/board.md`
- `docs/research/bant/README.md`
- All current files under `docs/research/bant/`
- `docs/research/esper/README.md`
- `docs/research/canon/mark_rosewater_official_three_color/`
- `docs/research/canon/guild_research/`
- `docs/research/canon/misc/`
- `docs/research/bant/bant-source-ledger.md`
- `docs/research/bant/bant-lore-source-packet.md`
- `docs/architecture/colors/bant/identity.md`
- `data/raw-factions/bant/bant.sources.json`

## Files Changed

- `docs/research/bant/README.md`
- `docs/research/bant/bant-source-ledger.md`
- `docs/research/bant/bant-reliability-audit.md`
- `docs/research/bant/bant-lore-source-packet.md`
- `docs/research/bant/source-material/README.md`
- `docs/research/bant/source-material/Bant_Lore_Reference.docx`
- `docs/research/bant/source-material/addtInfoBant.txt`
- `docs/research/archive/bant-pre-push-cleanup/README.md`
- `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/Alara Shards Lore Dossier Protocol.rtf`
- `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md`
- `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/The Metaphysical Ecology of Alara - Interactive Codex.html`
- `docs/research/archive/bant-pre-push-cleanup/unmanaged-drafts/Magic_ The Gathering Bant Lore Research.md`
- `docs/architecture/colors/bant/identity.md`
- `data/raw-factions/bant/bant.sources.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-170-bant-research-folder-cleanup-before-push.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-2254-codex-vm170-bant-research-folder-cleanup.md`

## What Changed

- Kept the active Bant packet root limited to approved packet files plus `source-material/`.
- Moved Bant-specific support inputs into `docs/research/bant/source-material/`.
- Moved duplicate local canon captures into `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/`; canonical copies remain under `docs/research/canon/`.
- Moved the broad unmanaged Bant draft into `docs/research/archive/bant-pre-push-cleanup/unmanaged-drafts/`.
- Rewrote the Bant README to mirror the Esper packet clarity: approved packet files, source material, canonical shared sources, archived artifacts, research standard, and promotion boundary.
- Updated active references to the new source-material paths and canonical shared source paths.
- Rebuilt generated faction artifacts because raw Bant source metadata paths changed.
- Created and closed VM-170 with this handoff.

## Why It Changed

The Bant folder mixed active packet files with duplicate canon captures, support inputs, and unmanaged drafts. Cleaning the root before commit/push makes Bant easier to review and safer to use as the shard expansion template.

## Decisions Made

- Do not delete docs permanently; archive moved duplicates and drafts.
- Do not treat archived drafts as active evidence.
- Use canonical shared source paths under `docs/research/canon/` for MaRo Bant, the Alara protocol, and the interactive Alara codex.
- Keep `BANT` live and `WUG` metadata-only; this cleanup does not change runtime semantics.
- Do not commit or push as part of VM-170.

## Risks / Uncertainties

- Historical handoffs and old done cards still mention the old Bant-local paths as historical records.
- The working tree was already dirty from prior Bant/VM work; VM-170 did not revert unrelated changes.
- Git continues to report line-ending warnings on `git diff --check`, but no whitespace errors remain.

## Tests Run

- `npm.cmd run build:factions` - passed; built 21 placement records.
- `npm.cmd run test:placement` - passed; `21 factions, 21 golden paths`.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd test` - passed.
- Active path scan for moved Bant-local source paths across Bant docs, architecture docs, raw Bant source metadata, generated placement model, and Supabase context - no matches.
- Positive path scan for canonical/source-material/archive references - expected matches only.
- `git diff --check` - passed with line-ending warnings only.

## Not Touched

- Placement scoring.
- Adaptive question bank.
- Home preview / carousel behavior.
- Maze behavior.
- Route CSS or route JS.
- Broad shard framework.
- Lore claim content beyond path/source organization wording.
- Commit, push, or branch operations.

## Follow-Up Recommendations

- Review the final dirty tree before staging the Bant bundle so archived moved files and source-material files are included with their corresponding deletions from the Bant root.
- Keep using VM-169 as the future shard expansion template and VM-170 as the Bant folder layout reference.

## Next Suggested Agent

Release steward or GitHub yeet workflow for final branch bundle review, staging, commit, and push if the user wants to proceed.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-170-bant-research-folder-cleanup-before-push.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/research/bant/README.md`

# 2026-05-31 17:53 - Codex - VM-224 Mardu Identity And Metaphysics

## Agent Name

Codex

## Task Requested

Implement VM-224 as a docs-only Documentation Steward pass: create Mardu Horde identity and metaphysics architecture from the accepted VM-223 packet, close the VM-224 Kanban card, add this handoff, and preserve Mardu as non-live without touching research packet files, raw-faction data, runtime, generated artifacts, Maze, routes, Home, schemas, Supabase, builders, or placement fixtures.

## Pre-Flight Summary

Recent related work:

- VM-223 created the normalized Mardu source/evidence packet and closed the source-packet-only card.
- VM-211 was completed before this pass and left Sultai docs parity in Done.
- VM-224 through VM-228 remained the active Mardu backlog lane before this pass.
- Abzan, Temur, and Sultai identity/metaphysics docs established the docs-only two-file architecture pattern.

Current known risks:

- The worktree was already broadly dirty before VM-224, including modified runtime/generated files and many untracked prior-lane docs, handoffs, Kanban cards, raw packets, and research folders.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` were already modified by earlier work before this pass.
- The VM-223 Mardu packet still marks exact raid, dash, mobilize, detailed figure biographies, Commander legality, card-level product facts, and Dragonstorm story chronology as manual-fill.

Relevant decisions already made:

- `MARDU` is the docs key and future public expression key, but remains non-live in VM-224.
- `RWB` and `WBR` remain metadata/query-only and are not aliases, routes, fixtures, generated keys, Home preview keys, or placement keys.
- Commander/operator rows are support-only.
- Seed copies are discovery-only.
- Khans-era Mardu Horde, Fate Reforged/Alesha bridge, Dragons-era Kolaghan, and modern Dragonstorm-era Mardu must remain timeline-distinct.

Files recently changed before or outside this task:

- Runtime/generated files listed by starting `git status --short`.
- Abzan, Temur, Sultai, Jeskai, and Mardu research/architecture/raw/Kanban/handoff paths from earlier passes.
- VM-223 Mardu packet and handoff.
- VM-211 Sultai docs parity handoff and Kanban closeout.

What should not be touched:

- `docs/research/mardu/**`
- `docs/research/mardu horde/**`
- `data/raw-factions/mardu/**`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route files
- Home preview files
- Supabase files
- Builders
- Placement fixtures
- Abzan files
- Temur files
- Sultai files
- Jeskai files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1729-codex-vm223-mardu-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-reliability-audit.md`
- `docs/research/mardu/mardu-manual-fill.md`
- `docs/research/mardu/mardu-research-dossier.md`
- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `docs/architecture/colors/temur/identity.md`
- `docs/architecture/colors/temur/metaphysics.md`
- `docs/kanban/done/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/kanban/done/VM-204-temur-frontier-identity-and-metaphysics.md`

## Files Changed

- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`
- `docs/kanban/done/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1753-codex-vm224-mardu-identity-metaphysics.md`

## What Changed

- Created docs-only Mardu `identity.md` and `metaphysics.md`.
- Used VM-223 evidence, support-only, guardrail, and manual-fill rows as the only authority.
- Labeled `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query-only`, and `non-live` boundaries inline.
- Kept `MARDU` future/non-live and `RWB`/`WBR` metadata/query-only.
- Preserved Khans-era Mardu Horde, Fate Reforged/Alesha, Kolaghan, and Dragonstorm-era Mardu as separate timeline buckets.
- Closed VM-224 in Kanban and left VM-225 through VM-228 in Backlog.

## Why It Changed

VM-224 needed to turn the VM-223 source/evidence airlock into the first Mardu architecture layer without expanding research, laundering seed prose, using Commander rows as lore, or making Mardu live. The two docs give later VM-225 through VM-228 work a bounded identity/metaphysics spine.

## Decisions Made

- `docs/architecture/colors/mardu/` is allowed only as the parent folder for `identity.md` and `metaphysics.md`.
- VM-224 introduces no new evidence IDs, source IDs, manual-fill rows, raw claim IDs, runtime keys, placement axes, route behavior, Home behavior, Maze behavior, schemas, Supabase changes, fixture updates, or builder outputs.
- Pair-overlap doctrine, wedge separators, placement guidance, and search-planning parity remain VM-225 scope.
- Mardu remains non-live.

## Risks / Uncertainties

- The broad dirty worktree still contains unrelated runtime/generated and prior-lane changes. VM-224 verification used scoped path checks and forbidden-path guards rather than broad diff assumptions.
- Exact raid, dash, mobilize, card facts, Commander legality, product decklist facts, detailed figure biographies, and Dragonstorm chronology remain manual-fill.
- Future VM-225 must add pair-overlap and wedge-separator parity before raw-faction authoring.

## Tests Run

- VM-224 Kanban guard confirmed the card existed in Backlog, was not already In Progress or Done, and matched title `Mardu Horde Identity And Metaphysics`.
- `Test-Path docs\architecture\colors\mardu` before authoring returned `False`.
- Required-term scan over the new docs confirmed `MARDU`, `RWB`, `WBR`, `Red-centered`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query-only`, and `non-live`.
- Direct seed-path scan over the new docs returned no matches for copied source-material paths or copied seed artifact filenames.
- Commander proof-language scan over the new docs returned no matches.
- `rg --files docs\architecture\colors\mardu` returned only `identity.md` and `metaphysics.md`.
- Evidence/manual-fill/Commander ID reference-resolution scan confirmed all `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###` references resolve to VM-223 packet rows.
- `Test-Path data\raw-factions\mardu` returned `False`.
- Scoped VM-224 status showed only the intended Mardu architecture folder, VM-224 done card, board update, handoff, and handoff index entry.
- Broad forbidden-path diff still lists unrelated pre-existing runtime/generated/data changes from the dirty worktree; VM-224 did not edit those paths.
- Scoped `git diff --check` passed for VM-224 architecture, Kanban, board, and handoff/index files.

Skipped:

- `npm test`, because VM-224 is documentation and Kanban-only.
- `npm run test:parser`, because parser behavior did not change.

## Not Touched

- `docs/research/mardu/**`
- `docs/research/mardu horde/**`
- `data/raw-factions/mardu/**`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route files
- Home preview files
- Supabase files
- Builders
- Placement fixtures
- Abzan files
- Temur files
- Sultai files
- Jeskai files

## Follow-Up Recommendations

- Start VM-225 next for Mardu docs parity: pair overlaps, wedge separators, placement guidance, and non-runtime search planning.
- Keep VM-226 blocked until VM-225 is complete.
- Keep VM-228 blocked until VM-227 records `review-approved-for-future-promotion-planning`.

## Next Suggested Agent

Documentation Steward for VM-225 Mardu docs parity fill.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-225-mardu-horde-docs-parity-fill.md`
- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-manual-fill.md`
- `docs/handoffs/2026-05-31-1729-codex-vm223-mardu-source-packet-evidence-ledger.md`

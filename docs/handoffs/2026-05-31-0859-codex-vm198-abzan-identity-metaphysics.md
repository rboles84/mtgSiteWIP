# Abzan VM-198 Identity And Metaphysics Handoff

## Agent Name

Codex

## Task Requested

Implement Abzan VM-198 Identity + Metaphysics by creating `docs/architecture/colors/abzan/identity.md` and `docs/architecture/colors/abzan/metaphysics.md` from the normalized Abzan evidence packet only. Preserve Abzan as non-live, preserve `WBG` and any W/B/G color-order permutations as metadata/query language only and metadata/query-only, and document the duplicate-ID exception because the repository already has an unrelated completed VM-198 shard-cleanup card and handoff.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`
- `docs/research/abzan/README.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/research/abzan/abzan-research-dossier.md`
- `docs/research/abzan/abzan-lore-source-packet.md`
- `docs/architecture/colors/jund/identity.md`
- `docs/architecture/colors/naya/metaphysics.md`
- `docs/kanban/done/VM-198-shard-bundle-worktree-cleanup.md`

## Files Changed

- `docs/architecture/colors/abzan/identity.md`
- `docs/architecture/colors/abzan/metaphysics.md`
- `docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md`

## What Changed

- Created docs-only Abzan identity architecture from normalized Abzan evidence rows.
- Created docs-only Abzan metaphysics architecture from normalized Abzan evidence rows.
- Framed Abzan as a White-centered `WBG` Tarkir wedge expression of endurance, family, house continuity, ancestor obligation, perennation, defensive patience, and long-game resilience.
- Preserved `WBG` and any W/B/G color-order permutations as metadata/query language only and metadata/query-only.
- Preserved Abzan as non-live.
- Added manual-fill, support-only, Dromoka separation, Commander/operator, seed-source, and non-runtime guardrails.
- Created and closed the new user-declared Abzan VM-198 Kanban card.
- Added the Abzan VM-198 board row with an explicit duplicate-ID note.
- Updated the handoff index with this handoff.

## Why It Changed

The Abzan source-packet airlock was complete and ready for the next docs-only phase. This pass gives Abzan the same identity/metaphysics foundation pattern used by Jund and Naya while keeping architecture prose downstream of normalized evidence instead of seed files, Commander rows, or generic WBG assumptions.

## Decisions Made

- Used the normalized Abzan packet recorded as VM-200 as the repo-truth source for the user-declared VM-197 evidence floor.
- Did not cite quarantined seed files directly.
- Treated architecture compression as `Vox Mana synthesis`, not MTG canon doctrine.
- Treated Commander/operator rows as support-only.
- Kept exact card facts, individual biographies, minor-house details, rebellion operations, post-rebellion integration, dragonstorm ecology, wild-dragon protocols, Commander canon, generic WBG, Dromoka continuity, and uncaptured seed-cited pages as `Manual fill required`.
- Did not create raw-faction JSON, generated data, runtime identifiers, routes, Home changes, Maze changes, schemas, Supabase changes, fixtures, or builder output.

## Duplicate-ID Handling

The repository already contains `docs/kanban/done/VM-198-shard-bundle-worktree-cleanup.md` and `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`. Those files were not edited, moved, renamed, reopened, or otherwise altered.

This task created a second VM-198 card only because the user explicitly requested the Abzan VM-197 through VM-202 stack and directed that this work be treated as Abzan VM-198. The duplicate is documented in the new Abzan card, board row, and this handoff.

## Evidence Boundaries

- Identity and metaphysics cite `ABZAN-EVID-001` through `ABZAN-EVID-031`.
- Manual-fill boundaries cite `ABZAN-MF-001` through `ABZAN-MF-011`.
- Commander rows `ABZAN-CMD-001` through `ABZAN-CMD-006` are support-only.
- Dromoka-era material is contrast/suppression context, not Abzan Houses continuity.
- Seed material remains discovery/reference only and was not cited directly.
- `WBG` and any W/B/G color-order permutations remain metadata/query language only and metadata/query-only.
- Abzan remains non-live.

## Dirty Baseline Record

Before editing, `git -c safe.directory=C:/dev/mtgSiteWIP status --short` showed:

```text
 M docs/handoffs/HANDOFF_INDEX.md
 M docs/kanban/board.md
?? docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md
?? docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md
?? docs/handoffs/2026-05-31-0817-codex-vm203-208-temur-planning.md
?? docs/handoffs/2026-05-31-0844-codex-vm203-temur-source-packet.md
?? docs/kanban/backlog/VM-204-temur-frontier-identity-and-metaphysics.md
?? docs/kanban/backlog/VM-205-temur-frontier-docs-parity-fill.md
?? docs/kanban/backlog/VM-206-temur-frontier-raw-faction-source-packet.md
?? docs/kanban/backlog/VM-207-temur-frontier-raw-packet-review-gate.md
?? docs/kanban/backlog/VM-208-temur-frontier-controlled-runtime-promotion.md
?? docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md
?? docs/kanban/done/VM-201-tarkir-clan-source-folder-restore.md
?? docs/kanban/done/VM-203-temur-frontier-source-packet-evidence-ledger.md
?? docs/research/PROMPT_lore-source-packet.md
?? "docs/research/abzan houses/"
?? docs/research/abzan/
?? "docs/research/jeskai way/"
?? "docs/research/mardu horde/"
?? "docs/research/sultai brood/"
?? "docs/research/temur frontier/"
?? docs/research/temur/
```

This task did not stage, format, normalize, move, delete, or rename unrelated dirty/untracked baseline files.

## Tests Run

- `Test-Path docs\architecture\colors\abzan\identity.md; Test-Path docs\architecture\colors\abzan\metaphysics.md; Test-Path data\raw-factions\abzan` returned `True`, `True`, `False`.
- `rg -n "ABZAN-EVID|ABZAN-MF|Vox Mana synthesis|Manual fill required|support-only|metadata/query|metadata/query-only|non-live" docs\architecture\colors\abzan\identity.md docs\architecture\colors\abzan\metaphysics.md` confirmed required boundary labels/phrases appear in the new docs.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/architecture/colors/abzan docs/kanban/board.md docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md` passed with the existing board LF-to-CRLF warning only.
- Final scoped check after handoff/index update: `Test-Path docs\architecture\colors\abzan\identity.md; Test-Path docs\architecture\colors\abzan\metaphysics.md; Test-Path data\raw-factions\abzan` returned `True`, `True`, `False`.
- Final required-label search again confirmed `ABZAN-EVID`, `ABZAN-MF`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query`, `metadata/query-only`, and `non-live` in the new docs.
- Final `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/architecture/colors/abzan docs/kanban/board.md docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md` passed with existing LF-to-CRLF warnings on `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md` only.
- Final `git status --short` comparison against the captured dirty baseline showed only allowed Abzan VM-198 additions beyond baseline: `docs/architecture/colors/abzan/`, `docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md`, and `docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md`. `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` were already modified in the baseline and were allowed-edited by this task.

Skipped:

- `npm test` and `npm run test:parser`, because VM-198 is documentation-only and touches no runtime or parser code.
- Runtime, browser, generated-artifact, schema, Supabase, Maze, route, Home, placement, fixture, and builder tests because VM-198 did not touch those surfaces.

## Not Touched

- Existing shard-cleanup VM-198 card
- Existing shard-cleanup VM-198 handoff
- `docs/research/abzan/`
- `docs/research/abzan houses/`
- `docs/research/jeskai way/`
- `docs/research/mardu horde/`
- `docs/research/sultai brood/`
- `docs/research/temur frontier/`
- `docs/research/temur/`
- `data/raw-factions/abzan/`
- generated artifacts
- runtime identity files
- placement model files
- route files
- Home preview files
- Maze files
- schema files
- Supabase files
- fixtures
- builder output

## Follow-Up Recommendations

- Next user-declared Abzan stack card: VM-199 Docs Parity Fill.
- VM-199 should add pair overlaps, wedge separators, primary tension refinements, Commander/operator support, placement guidance, search seed shapes, and explicit distinction guardrails from these architecture docs and the normalized Abzan packet only.
- Raw-faction authoring should remain blocked until VM-199 is reviewed.

## Next Suggested Agent

Documentation Steward for Abzan VM-199 Docs Parity Fill.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md`
- `docs/architecture/colors/abzan/identity.md`
- `docs/architecture/colors/abzan/metaphysics.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/kanban/done/VM-198-shard-bundle-worktree-cleanup.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`

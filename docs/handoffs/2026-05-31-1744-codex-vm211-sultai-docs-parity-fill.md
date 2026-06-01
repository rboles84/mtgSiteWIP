# VM-211 Sultai Docs Parity Fill Handoff

## Agent Name

Codex

## Task Requested

Implement VM-211 only: add Sultai Brood docs-only parity material for pair overlaps, wedge separators, support-only Commander anchors, placement guidance, and non-runtime search planning shapes, while preserving the VM-209 source packet and leaving VM-212 through VM-214 in Backlog. Also verify the narrow Kanban repairs for Jeskai VM-229 through VM-234 links and VM-223 Mardu location.

## Pre-Flight Summary

Recent related work:

- VM-209 normalized the Sultai source packet under `docs/research/sultai/` and kept Sultai source work docs-only.
- VM-210 created Sultai `identity.md` and `metaphysics.md` from VM-209, preserving `SULTAI` as non-live and `BGU` permutations as metadata/query-only.
- A Jeskai Kanban repair already moved the active Jeskai lane to VM-229 through VM-234 and updated board/index history.
- VM-223 Mardu source packet was already complete and already located under `docs/kanban/done/` at the start of this pass.

Current known risks:

- The worktree was already dirty with unrelated runtime/generated/data/docs changes before this pass.
- `docs/architecture/colors/sultai/` is still untracked in this working tree, so scoped checks must distinguish VM-211-introduced edits from prior untracked VM-210 architecture files.
- Commander rows remain support-only and cannot prove Tarkir lore, commander legality, exact cards, or placement scoring.

Relevant decisions already made:

- `SULTAI` remains docs-only and non-live.
- `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms remain metadata/query-only and must not become aliases, route keys, fixture keys, generated expression keys, Home preview keys, Maze keys, or placement keys.
- VM-211 consumes VM-209 and VM-210; it does not revise the VM-209 source packet or create raw-faction JSON.
- Silumgar clan and Dragonstorm Sultai remain timeline-labeled boundaries, not Khans-era Sultai Brood backfill.

Files recently changed before this pass:

- Prior Sultai handoffs and Kanban cards through VM-210.
- Prior Jeskai Kanban repair handoff and board/index history.
- Pre-existing unrelated runtime/generated/data files remained dirty and were not touched by VM-211.

What should not be touched:

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `data/raw-factions/sultai/**`
- runtime files, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, and Temur files
- VM-212, VM-213, and VM-214 implementation scope

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-1725-codex-vm210-sultai-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1731-codex-jeskai-kanban-id-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-manual-fill.md`
- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `docs/architecture/colors/temur/identity.md`

## Files Changed

- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1744-codex-vm211-sultai-docs-parity-fill.md`

## What Changed

- Added `Pair-Overlap Boundaries` for Dimir, Golgari, and Simic to `identity.md`.
- Added `Wedge Separators` for Abzan, Temur, Jeskai, and Mardu, plus nearby pair false-positive filters.
- Added `Commander And Archetype Anchors` for `SULTAI-CMD-001` through `SULTAI-CMD-006`, all marked support-only.
- Added docs-only `Placement Guidance` and `Non-runtime Search Planning Shapes`.
- Added an explicit generic BGU goodstuff false-positive boundary.
- Updated `metaphysics.md` only for cross-reference consistency so VM-211 parity material is no longer described as missing, while still keeping raw/runtime use review-gated.
- Moved VM-211 from Backlog through In Progress to Done and updated the board.
- Verified the requested Jeskai VM-229 through VM-234 board repair and VM-223 done-location repair were already present before VM-211 edits; no broad Kanban normalization was performed.

## Why It Changed

VM-211 needed to bring Sultai architecture to the same docs-only parity layer established by Abzan and Temur before any raw-faction source packet work can begin in VM-212.

## Decisions Made

- Kept all new parity material in `identity.md`, with a small `metaphysics.md` consistency edit only.
- Did not add new VM-209 source, evidence, Commander, or manual-fill rows.
- Did not touch `docs/research/sultai/**` or `docs/research/sultai brood/**`.
- Treated Commander rows as support-only throughout.
- Kept exploit keyword/mechanic references as `Manual fill required` or boundary material, distinct from resource exploitation as a Sultai theme.
- Left VM-212, VM-213, and VM-214 in Backlog.

## Risks / Uncertainties

- The repo remains broadly dirty from prior work, including unrelated runtime/generated/data paths. VM-211 verification was scoped to the requested docs/Kanban changes.
- Because `docs/architecture/colors/sultai/` is untracked, `git diff --check` does not fully cover those untracked files; a direct content scan was used alongside scoped diff checks.
- Future VM-212 raw JSON must cite claim-bearing `SULTAI-EVID-###` rows for raw claims and treat VM-211 docs as shaping guidance only.

## Tests Run

- Captured starting and ending `git status --short`; ending status still includes the broad pre-existing dirty runtime/generated/data/docs work, plus this pass's VM-211 docs/Kanban/handoff updates.
- Verified board state for Sultai and Jeskai with a scoped PowerShell check: VM-211 is Done, VM-212 through VM-214 are Backlog, no Sultai card is In Progress, and Jeskai VM-229 through VM-234 board links point to existing backlog cards.
- Verified the Jeskai VM-229 through VM-234 backlog cards contain no stale VM-215 through VM-220 self-reference/dependency text with `rg`.
- Verified VM-223 exists under `docs/kanban/done/` and no VM-223 file remains under `docs/kanban/backlog/`. The VM-223 move had already happened before this pass, so no VM-211 content rewrite was performed; current SHA256 was recorded for the done file.
- Ran `rg --files docs/architecture/colors/sultai`; only `identity.md` and `metaphysics.md` exist.
- Ran required-section scans for `Pair-Overlap Boundaries`, `Wedge Separators`, `Commander And Archetype Anchors`, `Placement Guidance`, and `Non-runtime Search Planning Shapes`.
- Ran required-term scans for `SULTAI`, `BGU`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query`, `non-live`, Dimir, Golgari, Simic, Abzan, Temur, Jeskai, Mardu, Silumgar clan, Dragonstorm Sultai, and generic BGU goodstuff.
- Resolved all `SULTAI-EVID-###`, `SULTAI-MF-###`, and `SULTAI-CMD-###` references in the Sultai architecture docs against VM-209 ledgers/source ledger; 47 unique refs resolved.
- Scanned for `exploit`; usages distinguish resource exploitation as a supported theme from the exploit keyword/mechanic as `Manual fill required` or boundary material.
- Ran `git diff --name-only -- docs/research/sultai docs/research/'sultai brood'`; no output.
- Verified `data/raw-factions/sultai` does not exist.
- Ran scoped `git diff --check -- docs/kanban/board.md docs/handoffs/HANDOFF_INDEX.md`; only CRLF normalization warnings appeared, with no whitespace errors.
- Ran trailing-whitespace scan across touched VM-211 docs, Kanban, board, handoff, and handoff index; no matches.
- Skipped `npm test` and `npm run test:parser`; this was docs/Kanban work only.

## Not Touched

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `data/raw-factions/sultai/**`
- runtime files
- generated artifacts
- schema files
- Maze files
- route files
- Home preview files
- Supabase files
- Abzan files
- Temur files
- VM-212, VM-213, and VM-214 implementation

## Follow-Up Recommendations

- Start VM-212 only after accepting VM-211 as complete.
- In VM-212, keep raw claims tied to claim-bearing `SULTAI-EVID-###` rows; use VM-211 architecture docs only as shaping sources.
- Preserve non-live status until VM-213 approval and optional VM-214 promotion.

## Next Suggested Agent

JSON Cartographer for VM-212, after user approval.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-source-ledger.md`

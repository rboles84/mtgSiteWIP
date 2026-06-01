# 2026-05-31 17:25 - Codex - VM-210 Sultai Identity And Metaphysics

## Agent Name

Codex

## Task Requested

Implement VM-210 only: create docs-only Sultai Brood identity and metaphysics architecture from the accepted VM-209 source packet, keep `SULTAI` non-live, preserve `BGU` and permutations as metadata/query-only, move VM-210 through Kanban, and leave VM-211 through VM-214 in Backlog.

## Pre-Flight Summary

Recent related work:

- VM-209 completed the accepted Sultai source packet under `docs/research/sultai/`.
- VM-209 preserved `docs/research/sultai brood/` as unmanaged discovery-only seed material.
- VM-204/VM-198 established the current Temur/Abzan identity-metaphysics architecture pattern.
- VM-208 and VM-222 show Temur runtime and post-promotion repair work is active in the dirty worktree, but VM-210 does not touch those surfaces.

Current known risks:

- The worktree was already dirty at start with modified runtime/generated files, untracked Abzan/Temur/Sultai research and architecture packets, raw-faction folders, and many untracked Kanban/handoff files.
- During VM-210, board/index state also reflected concurrent VM-222 completion and Mardu VM-223 through VM-228 reservation rows. VM-210 preserved that state.
- `git diff --name-only` remains noisy because of pre-existing runtime/generated tracked modifications outside VM-210.

Relevant decisions already made:

- `SULTAI` is docs-only and non-live for VM-210.
- `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms remain metadata/query-only.
- Sultai Brood, Silumgar clan, and Dragonstorm-era Sultai must remain distinct.
- Commander/operator rows are support-only.
- Color-pair philosophy files may support interpretation only and cannot prove Tarkir-specific lore, figures, mechanics, events, or chronology.
- Exact delve and exploit keyword/mechanic details remain `Manual fill required`.

Files recently changed before or outside this task:

- Runtime/generated files already modified in starting status.
- Abzan and Temur research, architecture, raw-faction, Kanban, and handoff paths already untracked.
- VM-222 and Mardu reservation bookkeeping appeared in board/index during this pass and was not reverted.

What should not be touched:

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `data/raw-factions/sultai/**`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route files
- Home preview files
- Supabase files
- Abzan files
- Temur files
- VM-211 through VM-214 card contents

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-0911-codex-vm204-temur-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-reliability-audit.md`
- `docs/research/sultai/sultai-manual-fill.md`
- `docs/research/sultai/sultai-research-dossier.md`
- `docs/architecture/colors/abzan/identity.md`
- `docs/architecture/colors/abzan/metaphysics.md`
- `docs/architecture/colors/temur/identity.md`
- `docs/architecture/colors/temur/metaphysics.md`

## Files Changed

- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `docs/kanban/done/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1725-codex-vm210-sultai-identity-metaphysics.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created docs-only Sultai identity architecture from VM-209 rows.
- Created docs-only Sultai metaphysics architecture from VM-209 rows.
- Framed Sultai as Black-centered `BGU` ruthlessness through resource conversion, Blue calculation, and life/death resource use.
- Labeled `Vox Mana synthesis`, `support-only`, and `Manual fill required` material.
- Distinguished resource exploitation as a supported theme from the exploit keyword/mechanic, which remains `Manual fill required`.
- Preserved Sultai Brood, Silumgar clan, and Dragonstorm-era Sultai timeline boundaries.
- Moved VM-210 to done while leaving VM-211 through VM-214 in Backlog.
- Added this handoff and indexed it.

## Why It Changed

VM-210 is the architecture base pass after VM-209. Its job is to translate reviewed Sultai evidence into docs-only identity and metaphysics language without revising the research packet, creating raw JSON, or promoting any runtime surface.

## Decisions Made

- `SULTAI` remains docs-only and non-live.
- `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms remain metadata/query-only.
- Black-centered identity is explicitly labeled `Vox Mana synthesis` from VM-209.
- Commander rows `SULTAI-CMD-001` through `SULTAI-CMD-006` are support-only operator texture.
- The exploit keyword/mechanic and delve rules remain `Manual fill required`.
- VM-211 owns full pair-overlap boundaries, wedge separators, placement guidance, and search-planning parity.

## Risks / Uncertainties

- Broad `git diff --name-only` still lists pre-existing tracked runtime/generated files. VM-210 verification used scoped checks and status comparison instead of assuming a clean tree.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` carried concurrent non-VM-210 updates. VM-210 preserved them.
- Detailed Sidisi/Tasigur biographies, exact mechanics, exact Dragonstorm chronology, Commander legality, and card-level facts remain unresolved.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured starting status.
- `Test-Path docs\architecture\colors\sultai\identity.md` returned `True`.
- `Test-Path docs\architecture\colors\sultai\metaphysics.md` returned `True`.
- `rg -n "SULTAI|BGU|Black-centered|Vox Mana synthesis|Manual fill required|support-only|metadata/query-only|non-live|SULTAI-EVID|SULTAI-MF|Silumgar|Dragonstorm" docs\architecture\colors\sultai`
- `rg -n "SULTAI-EVID-|SULTAI-MF-|support-only" docs\architecture\colors\sultai`
- `rg -n "exploit" docs\architecture\colors\sultai` verified each use distinguishes resource exploitation from the exploit keyword/mechanic.
- `Get-Content docs\kanban\board.md -TotalCount 65` verified VM-210 in Done, VM-211 through VM-214 in Backlog, and no Sultai card in In Progress.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/architecture/colors/sultai docs/kanban/board.md docs/kanban/done/VM-210-sultai-brood-identity-and-metaphysics.md` passed with an existing LF-to-CRLF warning on `docs/kanban/board.md`.
- `rg -n "[ \t]+$" docs\architecture\colors\sultai docs\kanban\done\VM-210-sultai-brood-identity-and-metaphysics.md docs\kanban\board.md` found no trailing whitespace.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --name-only` reviewed; broad output still contains pre-existing tracked runtime/generated paths, but no VM-210-introduced forbidden paths.

Skipped:

- `npm test`, because VM-210 is docs-only architecture work.
- `npm run test:parser`, because parser behavior did not change.

## Not Touched

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `data/raw-factions/sultai/**`
- Runtime JS/CSS/HTML routes
- Generated artifacts
- Schemas
- Maze behavior
- Home preview entries
- Supabase files
- Abzan files
- Temur files
- VM-211 through VM-214 card contents

## Follow-Up Recommendations

- Start VM-211 next to fill Sultai docs parity: pair overlaps, wedge separators, support-only Commander anchors, placement guidance, and non-runtime search-planning shapes.
- Keep VM-212 blocked until VM-209 through VM-211 are complete.
- Keep VM-214 blocked until VM-213 records `review-approved-for-future-promotion-planning`.

## Next Suggested Agent

Documentation Steward for VM-211 Sultai Brood Docs Parity Fill.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/architecture/colors/sultai/identity.md`
- `docs/architecture/colors/sultai/metaphysics.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-manual-fill.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`

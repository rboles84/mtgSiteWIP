# 2026-05-31 16:19 - Codex - VM-209 Through VM-214 Sultai Kanban Reservation Only

## Agent Name

Codex

## Task Requested

Reserve the Sultai Brood onboarding lane by creating VM-209 through VM-214 backlog cards, updating the Kanban board, and adding a reservation-only handoff/index entry. Do not start VM-209 source-packet implementation.

## Pre-Flight Summary

Recent related work:

- Abzan VM-198 through VM-202 established the most recent completed Tarkir clan lane through controlled runtime promotion.
- Temur VM-203 through VM-207 established the same source-first lane and approved the VM-206 Temur raw packet for future VM-208 promotion planning.
- VM-208 is currently listed as in progress in `docs/kanban/board.md` and has an in-progress card under `docs/kanban/in-progress/`.
- The Sultai prompt was planned as VM-209 through VM-214 after VM-208.

Current known risks:

- The worktree is already dirty with modified runtime/generated files and many untracked Abzan/Temur/docs/research paths.
- `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md` were already modified before this pass.
- `docs/research/sultai brood/` exists as unmanaged/untracked material, but this pass must not audit or normalize it.
- VM-208 has moved to in progress, so the six Sultai backlog links were added at the top of Backlog rather than moving or relisting VM-208.
- During this pass, an unrelated VM-197 Abzan source-packet handoff index row appeared before the Sultai index row was applied; it was preserved.

Relevant decisions already made:

- Reserve VM-209 through VM-214 for Sultai Brood.
- Keep this pass reservation-only.
- Keep Sultai implementation for later VM-209 work.
- Keep `SULTAI` as the future planned live/docs key and keep `BGU`, `BUG`, `UBG`, `GUB`, and lowercase forms metadata/query-only until any later approved runtime phase.

Files recently changed before this pass:

- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Runtime/generated files from VM-202/VM-208-related work.
- Untracked Abzan and Temur research, architecture, raw-faction, Kanban, and handoff files.
- Untracked `docs/research/sultai brood/` source-drop material.

What should not be touched:

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
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

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0817-codex-vm203-208-temur-planning.md`
- `docs/handoffs/2026-05-31-1042-codex-vm207-temur-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1108-codex-vm202-abzan-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-208-temur-frontier-controlled-runtime-promotion.md`
- Starting `git status --short`
- User-approved VM-209 through VM-214 reservation plan

## Files Changed

- `docs/kanban/backlog/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/kanban/backlog/VM-212-sultai-brood-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-213-sultai-brood-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1619-codex-vm209-214-sultai-kanban-reservation-only.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created six Sultai Brood backlog cards:
  - VM-209 source packet / evidence ledger
  - VM-210 identity and metaphysics
  - VM-211 docs parity fill
  - VM-212 raw-faction source packet
  - VM-213 raw packet review gate
  - VM-214 optional controlled runtime promotion
- Added the six Sultai backlog links at the top of the Backlog section in `docs/kanban/board.md`.
- Added this reservation-only handoff.
- Added the handoff index entry.

## Why It Changed

The user asked to reserve VM-209 through VM-214 before future work could take those IDs. This keeps the Sultai Brood onboarding lane explicit, ordered, dependency-gated, and separate from active VM-208 Temur promotion work.

## Decisions Made

- Created all six cards in `docs/kanban/backlog/` only.
- Did not move VM-209 or any Sultai card to in progress or done.
- Preserved the current VM-208 in-progress board state.
- Added Sultai cards at the top of Backlog because VM-208 is no longer in Backlog in current repo truth.
- Kept this pass reservation-only and did not start VM-209 implementation.
- Kept each Sultai card dependency-gated so future work cannot skip the source-first lane.

## Risks / Uncertainties

- The existing dirty worktree means broad `git status --short` and broad `git diff --name-only` contain unrelated modified runtime/generated files and untracked Abzan/Temur materials.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` already had unrelated modifications before this pass.
- VM-208 moved to in progress before this reservation pass; future agents should not assume Sultai cards are visually after VM-208 in Backlog.

## Tests Run

- `Get-Content -Raw AGENTS.md`
- `Get-Content -TotalCount 30 docs/handoffs/HANDOFF_INDEX.md`
- `Get-Content -Raw docs/kanban/board.md`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured starting status.
- `Get-Date -Format "yyyy-MM-dd-HHmm"` returned `2026-05-31-1619`.
- `Get-ChildItem docs/kanban -Recurse -File | Where-Object { $_.Name -match '^VM-20[9]|^VM-21[0-4]' } | Select-Object FullName` found no existing VM-209 through VM-214 cards before editing.
- Reviewed VM-208 in-progress card and recent Abzan/Temur handoffs listed above.
- `Get-ChildItem docs/kanban/backlog -File | Where-Object { $_.Name -match '^VM-20[9]|^VM-21[0-4]' } | Select-Object Name` confirmed all six Sultai backlog cards exist.
- `rg -n "VM-209|VM-210|VM-211|VM-212|VM-213|VM-214|Sultai Brood" docs/kanban/board.md docs/kanban/backlog docs/handoffs/HANDOFF_INDEX.md` confirmed board, card, and handoff-index references.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/kanban/board.md docs/kanban/backlog docs/handoffs/HANDOFF_INDEX.md docs/handoffs` passed with existing LF-to-CRLF warnings on tracked docs.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --name-only` still listed pre-existing non-doc runtime/generated paths from the dirty baseline, so the broad changed-file-only expectation could not be cleanly satisfied in this already-dirty worktree.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --name-only -- docs/kanban docs/handoffs` showed tracked changes only in `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`; new Sultai cards and this handoff are untracked additions under allowed docs paths.
- Ending `git status --short` showed the six Sultai backlog cards and this handoff as the only new Sultai reservation files, with unrelated pre-existing and concurrent Abzan/Temur/runtime dirty paths still present.
- `Test-Path docs/research/sultai; Test-Path 'docs/research/sultai brood'; Test-Path docs/architecture/colors/sultai; Test-Path data/raw-factions/sultai` returned `False`, `True`, `False`, `False`, confirming no normalized Sultai research, Sultai architecture, or Sultai raw-faction paths were created.
- `rg -n "[ \t]+$" ...` over the changed reservation files found no trailing whitespace.

Skipped:

- `npm test`, because this was Kanban/docs bookkeeping only.
- `npm run test:parser`, because no parser behavior changed.

## Not Touched

- `docs/research/sultai/**`
- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
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
- VM-208 in-progress card
- Staging or commits

## Follow-Up Recommendations

- Start VM-209 as the next Sultai execution pass when ready.
- Keep VM-210 blocked until VM-209 is complete.
- Keep VM-212 blocked until VM-209 through VM-211 are complete.
- Keep VM-214 blocked until VM-213 records `review-approved-for-future-promotion-planning`.

## Next Suggested Agent

Documentation Steward for VM-209 Sultai Brood source packet and evidence ledger.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/kanban/backlog/VM-212-sultai-brood-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-213-sultai-brood-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/kanban/in-progress/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-0817-codex-vm203-208-temur-planning.md`

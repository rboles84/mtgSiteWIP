# Codex Handoff - VM-236 Sultai Live Copy Polish Reservation

## Agent Name

Codex

## Task Requested

Reserve VM-236 as a Backlog-only Sultai post-promotion manual-QA repair card without executing runtime, copy, precon, test, generated, raw-data, research, architecture, route, Maze, Home, schema, or Supabase changes.

## Pre-Flight Summary

Recent related work:

- VM-214 promoted `SULTAI` as the only live Sultai key and kept `BGU` plus all color-order permutations metadata/query-only.
- VM-214 recommended post-promotion QA only if manual review found visible copy issues.
- VM-215 is already a preserved duplicate Abzan manual-QA repair and must not be reused for Sultai.
- VM-233 is now Done in current board truth, even though the reservation plan was written while VM-233 was expected to be In Progress.

Current known risks:

- The worktree is already broadly dirty with tracked runtime/generated/data changes and untracked Abzan, Temur, Sultai, Mardu, and Jeskai docs/raw/research/Kanban/handoff paths.
- Current board truth shows VM-228 in In Progress; this pass did not move, start, close, or otherwise normalize that unrelated card.

Relevant decisions already made:

- `SULTAI` is live.
- `BGU`, `BUG`, `GBU`, `GUB`, `UBG`, `UGB`, lowercase forms, and lowercase `sultai` remain metadata/query-only or raw-folder/build input only, never public keys or aliases.
- VM-236 is reservation-only unless separately authorized for execution.

Files recently changed by related work:

- VM-214 changed Sultai raw metadata, identity/runtime support files, generated artifacts, tests, board, and handoff/index files.
- VM-233 changed only Jeskai review-gate Kanban/handoff files while preserving Jeskai raw JSON hashes.

What should not be touched:

- Runtime copy or implementation files.
- Precon source/catalog files.
- Tests.
- Generated artifacts.
- Sultai raw files, research files, or architecture docs.
- Route, Maze, Home, schema, Supabase, fixture, or builder surfaces.
- Abzan, Temur, Mardu, or Jeskai files.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1936-codex-vm233-jeskai-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-215-abzan-dossier-manual-qa-repair.md`
- `docs/kanban/backlog/VM-234-jeskai-way-controlled-runtime-promotion.md`

## Files Changed

- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1956-codex-vm236-sultai-live-copy-polish-reservation.md`

## What Changed

- Created VM-236 as a Backlog card with `Reserved / Not Started` labeling.
- Added VM-236 to the Backlog section of the Kanban board.
- Recorded this reservation-only handoff.
- Updated the handoff index.

## Why It Changed

Manual QA after VM-214 found Sultai visible copy/display polish issues worth tracking, but the user requested a reservation-only pass. The repair itself is intentionally deferred.

## Decisions Made

- Reserved VM-236 instead of reusing VM-215 because VM-215 is already a preserved Abzan duplicate.
- Did not execute runtime or copy repair work during this pass.
- Did not move or edit VM-228 even though it is currently In Progress.

## Risks / Uncertainties

- VM-236 future execution should re-check current board state before starting.
- The planned Sultai display fix must keep `BGU` display-only or metadata-only and must not leak into key, alias, route, Home, Maze, fixture, generated expression, or `RAW_TO_KEY` surfaces.

## Tests Run

- Starting `git status --short` captured.
- `Test-Path docs\kanban\backlog\VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `Test-Path docs\handoffs\2026-05-31-1956-codex-vm236-sultai-live-copy-polish-reservation.md`
- `rg -n "VM-236|VM-228|VM-233|In Progress|Reserved / Not Started" docs\kanban\board.md docs\kanban\backlog\VM-236-sultai-live-copy-polish-identity-display-repair.md docs\handoffs\HANDOFF_INDEX.md docs\handoffs\2026-05-31-1956-codex-vm236-sultai-live-copy-polish-reservation.md`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/kanban/board.md docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-05-31-1956-codex-vm236-sultai-live-copy-polish-reservation.md`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --name-only -- docs/kanban docs/handoffs`
- Ending `git status --short` captured.

## Not Touched

- Runtime files.
- Copy implementation files.
- Precon data.
- Tests.
- Generated artifacts.
- Sultai raw claims/sources/metadata.
- Sultai research packet.
- Sultai architecture docs.
- Routes, Maze, Home preview, schemas, Supabase, fixtures, or builder maps.
- Abzan, Temur, Mardu, or Jeskai lane files.

## Follow-Up Recommendations

- Execute VM-236 only after a fresh pre-flight review and explicit start instruction.
- Future VM-236 execution should hash-guard Sultai raw claims/sources and add visible-copy regressions for `BGU` display-only usage and Sultai copy polish.

## Next Suggested Agent

Kanban Steward or frontend repair agent for future VM-236 execution.

## Related Kanban Card / Docs

- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`

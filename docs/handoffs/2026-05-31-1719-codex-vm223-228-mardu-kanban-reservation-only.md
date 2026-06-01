# 2026-05-31 17:19 - Codex - VM-223 Through VM-228 Mardu Kanban Reservation Only

## Agent Name

Codex

## Task Requested

Reserve the Mardu Horde onboarding lane by creating VM-223 through VM-228 backlog cards, updating the Kanban board, and adding a reservation-only handoff/index entry. Do not start Mardu source-packet implementation.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-215-jeskai-way-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-220-jeskai-way-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-221-temur-live-parity-archscry-text-hardening.md`
- `docs/kanban/in-progress/VM-222-temur-dossier-link-maze-qa-repair.md`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-223-mardu-horde-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-225-mardu-horde-docs-parity-fill.md`
- `docs/kanban/backlog/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-227-mardu-horde-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1719-codex-vm223-228-mardu-kanban-reservation-only.md`

## What Changed

- Reserved VM-223 through VM-228 for the Mardu Horde onboarding lane.
- Added six backlog cards for source packet, identity/metaphysics, docs parity, raw-faction source packet, raw packet review gate, and controlled runtime promotion.
- Added six Mardu links below the Jeskai reservation block in the Backlog section of the Kanban board.
- Added this reservation-only handoff and indexed it.

## Why It Changed

VM-215 through VM-220 are already reserved for Jeskai Way, VM-221 is complete Temur live parity work, and VM-222 is active Temur QA repair work. VM-223 through VM-228 were the next clean contiguous range after pre-edit conflict scans.

## Decisions Made

- Reserve Mardu as VM-223 through VM-228 instead of the stale VM-221 through VM-226 or VM-222 through VM-227 ranges.
- Keep this pass Kanban/documentation reservation only.
- Preserve `docs/research/mardu horde/` as unmanaged seed material.
- Do not create `docs/research/mardu/`, `docs/research/mardu/source-material/`, `docs/architecture/colors/mardu/`, or `data/raw-factions/mardu/`.
- Keep `MARDU` as the future public key and `RWB`/`WBR` as metadata/query-only until an approved future promotion card.
- Require VM-228 to recompute the live runtime baseline at execution time instead of assuming the current Temur or Jeskai baseline.

## Risks / Uncertainties

- The worktree was already broadly dirty/untracked before this reservation pass, including runtime, generated, Abzan, Temur, Sultai, Jeskai, board, and handoff files.
- The Kanban ID space changed during planning: VM-221 and VM-222 were taken by Temur work after earlier Mardu planning drafts.
- VM-223 through VM-228 are reserved but not implemented; Mardu remains non-live and unnormalized.

## Tests Run

- Pre-edit `rg` conflict scans for VM-223 through VM-228 across `docs/kanban` and `docs/handoffs`.
- Pre-edit file-path scan for VM-223 through VM-228 under `docs/kanban` and `docs/handoffs`.
- Forbidden Mardu path guard for `docs/research/mardu/`, `docs/research/mardu/source-material/`, `docs/architecture/colors/mardu/`, and `data/raw-factions/mardu/`.
- Post-edit `rg` scan confirmed VM-223 through VM-228 board links, backlog card content, handoff, and handoff-index entry.
- Post-edit backlog file scan confirmed all six Mardu backlog card files exist.
- Post-edit stale-ID scan confirmed the Mardu card lane is VM-223 through VM-228; the only VM-221/VM-222 references are VM-228 baseline warnings.
- Scoped `git diff --check` passed for the reservation files, with existing LF-to-CRLF warnings on `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`.
- Scoped `git status --short` showed only the intended reservation paths in this pass: board, handoff index, six Mardu backlog cards, and this handoff.
- `npm test` and parser tests intentionally skipped because this was Kanban/documentation reservation only.

## Not Touched

- `docs/research/mardu horde/`
- `docs/research/mardu/`
- `docs/research/mardu/source-material/`
- `docs/architecture/colors/mardu/`
- `data/raw-factions/mardu/`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route files
- Home preview files
- Supabase files
- Builders
- Placement fixtures
- Existing Sultai, Jeskai, Abzan, and Temur cards beyond preserving the current board context

## Follow-Up Recommendations

- Start VM-223 when ready as the Mardu source-packet-only pass.
- Keep VM-224 blocked until VM-223 is complete.
- Keep VM-225 blocked until VM-224 is complete.
- Keep VM-226 blocked until VM-225 is complete.
- Keep VM-227 blocked until VM-226 is complete.
- Keep VM-228 blocked until VM-227 records `review-approved-for-future-promotion-planning`.

## Next Suggested Agent

Documentation Steward for VM-223 Mardu Horde source packet and evidence ledger.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-223-mardu-horde-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-225-mardu-horde-docs-parity-fill.md`
- `docs/kanban/backlog/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-227-mardu-horde-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-228-mardu-horde-controlled-runtime-promotion.md`

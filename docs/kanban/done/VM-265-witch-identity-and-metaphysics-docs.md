# VM-265 - Witch Identity And Metaphysics Docs

ID: VM-265
Title: Witch Identity And Metaphysics Docs
Status: done
Type: Documentation / Identity Architecture
Area: Four-Color, Witch, Architecture
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Create the docs-only Witch identity and metaphysics architecture from the approved VM-264 packet while preserving non-live status, metadata/query-only `GWUB` boundaries, support-source-only `WUBG` ordering, support-only `Growth` / Atraxa / `Breed Lethality` texture, and clean stop gates ahead of VM-266 parity work.

## Scope Completed

- Created `docs/architecture/colors/witch/identity.md` and `metaphysics.md`.
- Based both documents on the approved VM-264 Witch packet and bounded manual-fill decisions only.
- Preserved Witch as non-live during this docs pass.
- Stopped before docs parity, raw packets, review, runtime, generated artifacts, route work, schema work, Maze work, Supabase work, or Home preview work.

## Explicit Non-Goals

- Do not author raw JSON, builder mappings, generated files, or runtime support.
- Do not treat Nephilim as institutions or faction authorities.
- Do not treat `Growth`, Atraxa, or `Breed Lethality` as Witch naming authority.
- Do not bundle later Witch lane work into VM-265.

## Dependencies

- Depends on VM-264 completion.

## Acceptance Criteria

- [x] A future execution pass creates Witch identity and metaphysics docs only.
- [x] The docs stay evidence-bound to the approved Witch packet.
- [x] No raw packet, review gate, or runtime promotion work is bundled into VM-265.

## Files Changed

- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1416-codex-vm265-witch-identity-metaphysics.md`

## Tests Run

- Re-ran AGENTS pre-flight review against handoff index, relevant Witch, Ink, Dune, and Glint handoffs, the Kanban board, VM-265 card, and the approved VM-264 Witch packet.
- Verified `docs/architecture/colors/witch/` did not exist before VM-265 and contains exactly `identity.md` and `metaphysics.md` after the pass.
- Verified `data/raw-factions/witch/` does not exist and was not created.
- Validated all cited `WITCH-EVID-###` references against `docs/research/witch/witch-evidence-ledger.md` and all cited `WITCH-MF-###` references against `docs/research/witch/witch-manual-fill.md`.
- Ran scoped forbidden-scope scans for pair-overlap sections, near-match separator suites, placement guidance, search-planning sections, raw/review/runtime/generated language, route aliases, Maze keys, Home preview, Supabase, and public permutation exposure.
- Ran scoped overclaim scans for official-name, official-faction, Witch-Maw institution, Atraxa naming authority, Commander-support-as-lore, discovery-draft-as-evidence, EDHREC/ranking inheritance, cEDH/Tymna-Thrasios inheritance, and Phyrexia-only collapse.
- Ran scoped trailing-whitespace scans on touched VM-265 files.
- Ran scoped `git diff --check` on tracked VM-265 bookkeeping files; it exited 0 with the repo's existing LF-to-CRLF warnings on touched tracked Markdown files.
- Skipped `npm test` and `npm run test:parser` because VM-265 touched only architecture docs and bookkeeping.

## Not Touched

- `docs/research/witch/**`
- `docs/research/canon/**`
- `data/raw-factions/witch/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, fixture, and identity-hero files
- VM-266 through VM-269 files
- Yore, Glint, Dune, and Ink files

## Follow-Up Recommendations

- Start VM-266 as a separate prompt only after accepting VM-265.
- VM-266 should own parity expansion: pair overlaps, near-match separators, false-positive risks, descriptive placement guidance, and non-runtime search planning.
- Preserve `WITCH` as non-live and keep `GWUB`, `WUBG`, `Growth`, Atraxa, `Breed Lethality`, and every same-color permutation out of public alias/key exposure through VM-266.
- Keep the three unmanaged Witch drafts discovery-only unless a later explicit source pass independently promotes specific claims into approved packet rows.

## Next Suggested Agent

Documentation Steward for VM-266 Witch docs parity fill.

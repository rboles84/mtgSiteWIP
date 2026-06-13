# VM-266 - Witch Docs Parity Fill

ID: VM-266
Title: Witch Docs Parity Fill
Status: done
Reservation State: Complete
Type: Documentation / Parity
Area: Four-Color, Witch, Architecture
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Filled the Witch docs parity layer by expanding the existing architecture docs with pair-overlap boundaries, missing-color and near-match separators, support-only Commander anchors, false-positive risks, docs-only system mapping, editorial identity signals, descriptive placement guidance, editorial search-planning shapes, and metaphysical parity notes.

## Scope Completed

- Updated `docs/architecture/colors/witch/identity.md` only.
- Updated `docs/architecture/colors/witch/metaphysics.md` only.
- Kept VM-266 docs-only and source-bound to the VM-264 packet plus VM-265 core docs.
- Preserved `WITCH` as non-live.
- Preserved `GWUB` as canonical metadata/query order.
- Preserved `WUBG` as support-source order only.
- Preserved `Growth`, Atraxa, and `Breed Lethality` as Commander support/display texture only.
- Stopped before raw packets, review gates, runtime work, generated artifacts, builders, routes, Maze, Home preview, Supabase, schemas, public aliases, or promotion work.

## Explicit Non-Goals

- Do not author raw JSON or runtime mappings.
- Do not treat support commanders as lore proof.
- Do not treat parity prose as raw-claim evidence.
- Do not promote Witch live.
- Do not bundle VM-267 through VM-269 work into VM-266.

## Dependencies

- Depends on VM-264 and VM-265 completion.

## Acceptance Criteria

- [x] A future execution pass fills Witch docs parity only.
- [x] Commander support rows remain support-only.
- [x] No raw packet, review gate, or runtime promotion work is bundled into VM-266.
- [x] Pair overlaps and near-match separators are represented as architecture prose only.
- [x] False-positive risks cover generic Atraxa, proliferate/counters, infect, superfriends, Phyrexia-only, and `GWUB` goodstuff collapse.

## Files Changed

- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-266-witch-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1652-codex-vm266-witch-docs-parity-fill.md`

## Tests Run

- Re-ran AGENTS pre-flight review against the handoff index, VM-264/VM-265 Witch handoffs, VM-260/VM-254 parity precedents, the Kanban board, the VM-266 card, Witch research packet, and Witch architecture docs.
- Confirmed pre-edit state: VM-264 and VM-265 done, VM-266 backlog, `data/raw-factions/witch/` absent, and `docs/architecture/colors/witch/` contained exactly `identity.md` and `metaphysics.md`.
- Validated final `docs/architecture/colors/witch/` contains exactly `identity.md` and `metaphysics.md`.
- Validated `data/raw-factions/witch/` remains absent.
- Validated every cited `WITCH-EVID-###` reference against `docs/research/witch/witch-evidence-ledger.md`.
- Validated every cited `WITCH-MF-###` reference against `docs/research/witch/witch-manual-fill.md`.
- Ran required-heading scans for VM-266 parity additions in both Witch docs.
- Ran scoped overclaim scans for official-name/faction drift, Witch-Maw institution drift, Atraxa naming authority, Commander-support-as-lore drift, discovery-draft evidence drift, EDHREC/ranking inheritance, cEDH/Tymna-Thrasios inheritance, Phyrexia-only collapse, and generic Atraxa/counters/proliferate collapse.
- Ran scoped forbidden implementation-drift scans for raw packet creation, review verdicts, runtime promotion, generated artifacts, route aliases, Maze keys, Home preview, Supabase, public permutation exposure, thresholds, scores, and operational criteria.
- Ran scoped trailing-whitespace scans on touched VM-266 files.
- Ran scoped `git diff --check` on tracked VM-266 bookkeeping files.
- Skipped `npm test` and `npm run test:parser` because VM-266 touched only architecture docs and bookkeeping.

## Not Touched

- `docs/research/witch/**`
- `docs/research/canon/**`
- `data/raw-factions/witch/`
- Raw JSON files
- Runtime files
- Generated artifacts
- Schemas
- Route files
- CSS/JS
- Supabase files
- Maze and Home preview surfaces
- VM-267 through VM-269 cards
- Unrelated dirty files

## Follow-Up Recommendations

- Run VM-267 as a separate non-live raw-packet pass only after VM-266 is accepted.
- VM-267 should select conservative source-bound claims from VM-264 evidence rather than treating every VM-266 separator as raw authority.
- Preserve `WITCH` as non-live until later lifecycle gates explicitly approve otherwise.
- Keep `Growth`, Atraxa, `Breed Lethality`, `GWUB`, `WUBG`, and every same-color permutation out of public naming authority.
- Keep the three unmanaged Witch drafts discovery-only unless a later explicit source pass independently promotes specific claims into approved packet rows.

## Next Suggested Agent

JSON Cartographer for VM-267 Witch non-live raw packet, with Documentation Steward review before raw packet closeout.

# VM-266 Witch Docs Parity Fill Handoff

Agent name: Codex
Task requested: Implement VM-266 as a docs-only Witch parity fill from the approved VM-264 packet and VM-265 architecture docs.
Related Kanban card: `VM-266 - Witch Docs Parity Fill`
Status: Complete

## Pre-Flight Summary

Recent related work:

- VM-264 created the approved Witch source packet, evidence ledger, reliability audit, manual-fill queue, and discovery-draft quarantine.
- VM-265 created the first-pass Witch identity and metaphysics docs while stopping before parity, raw, review, runtime, generated, route, schema, Maze, and Home work.
- VM-260, VM-254, VM-248, and VM-242 established the four-color docs parity pattern for Ink, Dune, Glint, and Yore.
- VM-280, VM-281, and VM-283 hardened shared four-color Maze/handoff behavior, but VM-266 remains docs-only and does not touch those surfaces.
- VM-289 and VM-290 recently changed shared docs/bookkeeping and dossier-warning surfaces outside the Witch lane.

Current known risks:

- Four-color canon remains thinner than shard and wedge lanes.
- The three preserved Witch drafts are polished and contain ranking, EDHREC-style, house-rule Commander, cEDH, and Phyrexia-collapse claims that can create source-laundering risk.
- Commander support rows use `WUBG` ordering while Vox Mana's Witch metadata direction is `GWUB`, so naming and color-order boundaries must stay explicit.
- Atraxa, proliferate/counters, superfriends, infect, and Phyrexian texture can easily swallow Witch if separator language is weak.
- The worktree is already broadly dirty across docs, Kanban, handoff, runtime, and data surfaces.

Relevant decisions already made:

- VM-266 is docs-only and must leave VM-267 raw work untouched.
- `WITCH` remains non-live.
- `GWUB` is the canonical Vox Mana ordering; `WUBG` may appear only when echoing support-source order; all same-color permutations remain metadata/query-only.
- `Growth` may appear only as Commander 2016 support/display framing, not official universal naming authority.
- Witch-Maw Nephilim remains a historical/card anchor, not a faction or institution.
- Atraxa and `Breed Lethality` remain support-only Commander texture.

Files recently changed:

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `docs/kanban/done/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/handoffs/2026-06-04-1416-codex-vm265-witch-identity-metaphysics.md`
- Existing unrelated runtime, data, architecture, and documentation files in the dirty worktree

What should not be touched:

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
- Maze files
- Route CSS/JS
- Supabase files
- Schemas and fixtures
- Identity-hero assets or mapping
- VM-267 through VM-269 files
- Yore, Glint, Dune, and Ink files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1206-codex-vm264-witch-source-packet.md`
- `docs/handoffs/2026-06-04-1416-codex-vm265-witch-identity-metaphysics.md`
- `docs/handoffs/2026-06-04-0705-codex-vm260-ink-docs-parity-fill.md`
- `docs/handoffs/2026-06-03-1226-codex-vm254-dune-docs-parity-fill.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-266-witch-docs-parity-fill.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/research/witch/witch-manual-fill.md`
- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `docs/architecture/colors/ink/identity.md`
- `docs/architecture/colors/ink/metaphysics.md`
- `docs/architecture/colors/dune/identity.md`
- `docs/architecture/colors/glint/identity.md`

## Files Changed

- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-266-witch-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1652-codex-vm266-witch-docs-parity-fill.md`

## What Changed

- Expanded Witch identity docs with pair-overlap boundaries, missing-color and near-match separators, four-color comparator boundaries, support-only Commander anchors, false-positive risks, docs-only system mapping, editorial identity signals, descriptive placement guidance, and editorial search-planning shapes.
- Expanded Witch metaphysics docs with a ludological matrix mapping, matrix implications, parity boundary notes, source boundary, and VM-266 summary update.
- Kept VM-266 docs-only and source-bound.
- Moved VM-266 from backlog to done and updated the board.
- Added this handoff and indexed it.

## Why It Changed

VM-266 is the next Witch card after VM-265. VM-264 created the source floor and VM-265 created the core docs; VM-266 fills the separator/parity layer while stopping before VM-267 raw packet work, VM-268 review work, VM-269 promotion work, and any runtime or generated surfaces.

## Decisions Made

- Used Ink VM-260 and Dune VM-254 as the closest parity templates.
- Updated only the two existing Witch architecture docs; no new files were created under `docs/architecture/colors/witch/`.
- Did not edit, normalize, or relabel VM-264 packet files.
- Kept placement guidance and search-planning shapes descriptive/editorial only.
- Kept Yore, Glint, Dune, and Ink comparisons as architecture separators only.
- Kept `Growth`, Atraxa, `Breed Lethality`, Witch-Maw, and all `GWUB` permutations bounded.

## Risks / Uncertainties

- Four-color canon remains thin, so VM-266 separator language should be treated as architecture prose, not independent authority.
- The three unmanaged Witch drafts remain discovery-only and source-laundering risk remains active.
- Direct official Witch-Maw capture and stronger Atraxa / `Breed Lethality` / `Growth` grounding remain manual-fill topics.
- Worktree remains broadly dirty from unrelated prior work; VM-266 did not clean or repair unrelated changes.

## Tests Run

- Re-ran AGENTS pre-flight review against required handoffs, board, card, Witch packet, current Witch docs, and parity precedents.
- Confirmed VM-266 was in backlog and VM-264 / VM-265 were done before editing.
- Confirmed `docs/architecture/colors/witch/` contained exactly `identity.md` and `metaphysics.md`.
- Confirmed `data/raw-factions/witch/` does not exist.
- Validated final `docs/architecture/colors/witch/` contains exactly `identity.md` and `metaphysics.md`.
- Validated every cited `WITCH-EVID-###` reference against `docs/research/witch/witch-evidence-ledger.md`.
- Validated every cited `WITCH-MF-###` reference against `docs/research/witch/witch-manual-fill.md`.
- Ran required-heading scans for VM-266 parity additions in both Witch docs.
- Ran scoped overclaim scans on the two Witch architecture docs.
- Ran scoped forbidden implementation-drift scans on the two Witch architecture docs.
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
- VM-267 should select conservative source-bound claims rather than treating every VM-266 separator as raw authority.
- Preserve `WITCH` as non-live until later lifecycle gates explicitly approve otherwise.
- Keep `Growth`, Atraxa, `Breed Lethality`, `GWUB`, `WUBG`, and every same-color permutation out of public naming authority.

## Next Suggested Agent

JSON Cartographer for VM-267 Witch non-live raw packet, with Documentation Steward review before raw packet closeout.

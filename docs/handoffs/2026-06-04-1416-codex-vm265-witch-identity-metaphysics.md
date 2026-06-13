# VM-265 Witch Identity And Metaphysics Handoff

Agent name: Codex
Task requested: Implement VM-265 as a docs-only Witch identity and metaphysics architecture pass from the approved VM-264 source packet.
Related Kanban card: `VM-265 - Witch Identity And Metaphysics Docs`
Status: Complete

## Pre-Flight Summary

Recent related work:

- VM-264 created the approved Witch source packet, evidence ledger, reliability audit, manual-fill queue, and discovery-draft quarantine.
- VM-247, VM-253, and VM-259 established the current four-color docs-only identity/metaphysics pattern.
- VM-248, VM-254, and VM-260 show where parity scope begins, so VM-265 needed to stop short of pair-overlap catalogs, near-match separator suites, placement guidance, and search-planning scope.
- VM-280, VM-281, and VM-283 recently hardened shared four-color Maze/handoff behavior, but VM-265 remains docs-only and does not touch those surfaces.
- VM-287 ran a full automated test sweep before this pass and left no need for VM-265 to rerun runtime suites.

Current known risks:

- Four-color canon remains thinner than shard and wedge lanes.
- The three preserved Witch drafts are polished and contain ranking, EDHREC-style, house-rule Commander, cEDH, and Phyrexia-collapse claims that can create source-laundering risk.
- Commander support rows use `WUBG` ordering while Vox Mana's Witch metadata direction is `GWUB`, so naming and color-order boundaries must stay explicit.
- Atraxa and Phyrexian texture can easily swallow Witch if the docs do not keep them support-bound.
- The worktree is already broadly dirty across runtime, data, docs, Kanban, and handoff surfaces.

Relevant decisions already made:

- VM-265 is docs-only and must leave VM-266 parity work untouched.
- `WITCH` remains non-live.
- `GWUB` is the canonical Vox Mana ordering; `WUBG` may appear only when echoing support-source order; all same-color permutations remain non-public.
- `Growth` may appear only as Commander 2016 support/display framing, not as official universal naming authority.
- Witch-Maw Nephilim remains a historical/card anchor, not a faction or institution.
- Atraxa and `Breed Lethality` remain support-only Commander texture.

Files recently changed:

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/handoffs/2026-06-04-1206-codex-vm264-witch-source-packet.md`
- `docs/kanban/done/VM-287-full-automated-test-sweep.md`
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
- VM-266 through VM-269 files
- Yore, Glint, Dune, and Ink files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1206-codex-vm264-witch-source-packet.md`
- `docs/handoffs/2026-06-04-0005-codex-vm259-ink-identity-metaphysics.md`
- `docs/handoffs/2026-06-03-0736-codex-vm253-dune-identity-metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/research/witch/witch-source-ledger.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/research/witch/witch-manual-fill.md`
- `docs/research/witch/witch-research-dossier.md`
- `docs/research/witch/witch-lore-source-packet.md`
- `docs/research/witch/witch-reliability-audit.md`
- `docs/architecture/colors/glint/identity.md`
- `docs/architecture/colors/glint/metaphysics.md`
- `docs/architecture/colors/dune/identity.md`
- `docs/architecture/colors/dune/metaphysics.md`
- User-approved VM-265 implementation plan

## Files Changed

- `docs/architecture/colors/witch/identity.md`
- `docs/architecture/colors/witch/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1416-codex-vm265-witch-identity-metaphysics.md`

## What Changed

- Created the first-pass Witch identity architecture document.
- Created the first-pass Witch metaphysics architecture document.
- Kept `WITCH` non-live and architecture-only.
- Kept `GWUB` as canonical Vox Mana metadata/query order and `WUBG` as support-source order only.
- Framed `Growth` only as Commander 2016 support/display language, not as a co-equal canonical name.
- Treated Witch-Maw Nephilim as a card-history anchor only.
- Treated Atraxa and `Breed Lethality` as support-only Commander texture only.
- Moved only VM-265 from backlog to done and updated the board.
- Added this VM-265 handoff and indexed it.

## Why It Changed

VM-265 is the next Witch card after VM-264. VM-264 created the approved source packet but intentionally stopped before architecture docs. This pass converts the approved packet floor into bounded first-pass identity and metaphysics docs without widening into VM-266 parity, raw packet, review, promotion, runtime, generated, route, schema, Maze, or Home preview work.

## Decisions Made

- Used the approved VM-264 packet as the read-only authority floor.
- Did not edit, normalize, or relabel any VM-264 source/evidence/manual-fill files.
- Used `Witch / Growth` only in display/title framing. Body prose defaults to Witch or `WITCH`, and `Growth` remains support-only Commander 2016 framing.
- Treated Witch-Maw Nephilim as a card-history anchor only.
- Treated Atraxa / `Breed Lethality` as support-only Commander texture only.
- Kept Phyrexian texture bounded and did not collapse Witch into Atraxa, New Phyrexia, or any single commander.
- Avoided VM-266-only sections and left parity expansion to VM-266.

## Risks / Uncertainties

- Four-color canon remains thin, so the docs keep several readings synthesis-labeled and conservative.
- The three unmanaged Witch drafts remain polished enough to create source-laundering risk; they were not used as architecture evidence.
- Direct official Witch-Maw capture, stronger Atraxa / `Breed Lethality` product grounding, and stronger `Growth` naming context remain manual-fill territory.
- Worktree remains broadly dirty from unrelated prior work; this pass did not clean or repair unrelated changes.

## Tests Run

- Confirmed `VM-265` was in backlog and `VM-264` was done before editing.
- Confirmed `docs/architecture/colors/witch/` did not exist before editing.
- Confirmed `data/raw-factions/witch/` does not exist.
- Validated final `docs/architecture/colors/witch/` contains exactly `identity.md` and `metaphysics.md`.
- Validated every cited `WITCH-EVID-###` reference resolves against `docs/research/witch/witch-evidence-ledger.md`.
- Validated every cited `WITCH-MF-###` reference resolves against `docs/research/witch/witch-manual-fill.md`.
- Ran scoped forbidden-scope scans for pair-overlap sections, near-match separator suites, placement guidance, search-planning sections, raw/review/runtime/generated language, route aliases, Maze keys, Home preview, Supabase, and public permutation exposure.
- Ran scoped overclaim scans for official-name, official-faction, Witch-Maw institution, Atraxa naming authority, Commander-support-as-lore, discovery-draft-as-evidence, EDHREC/ranking inheritance, cEDH/Tymna-Thrasios inheritance, and Phyrexia-only collapse.
- Ran scoped trailing-whitespace scans on touched VM-265 files.
- Ran scoped `git diff --check` on tracked VM-265 bookkeeping files; it exited 0 with the repo's existing LF-to-CRLF warnings on touched tracked Markdown files.
- Skipped `npm test` and `npm run test:parser` because VM-265 touched only architecture docs and bookkeeping.

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
- VM-266 through VM-269 cards
- Unrelated dirty files

## Follow-Up Recommendations

- Run VM-266 as a separate docs parity pass only after VM-265 is accepted.
- VM-266 should own pair-overlap boundaries, near-match separators, false-positive risks, descriptive placement guidance, and non-runtime search-planning language.
- Keep `WITCH` non-live until the later review/promotion sequence approves otherwise.
- Keep `Growth`, Atraxa, `Breed Lethality`, `GWUB`, `WUBG`, and every same-color permutation out of public naming authority.
- Keep the three unmanaged Witch drafts discovery-only unless a later explicit source pass independently promotes specific claims into approved packet rows.

## Next Suggested Agent

Documentation Steward for VM-266 Witch docs parity fill.

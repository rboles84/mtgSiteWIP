# VM-199 - Abzan Docs Parity Fill

ID: VM-199
Title: Abzan Docs Parity Fill
Status: done
Type: Documentation / Architecture
Area: Abzan, Architecture Docs, Color Identity
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Duplicate-ID Note

This is the user-declared Abzan stack VM-199. The repository already has an unrelated completed `VM-199 - Shard Branch Merge Hygiene Fix` card and handoff. That existing shard-merge VM-199 was not edited, moved, renamed, reopened, or otherwise altered. This duplicate is intentional for the Abzan VM-197 through VM-202 stack requested by the user.

## Summary

Bring Abzan's docs-only architecture up to the Jund/Naya parity layer after Abzan VM-198. Add practical placement-facing sections to `identity.md` and refine primary tension language in `metaphysics.md`, while preserving Abzan as non-live and `WBG` plus any W/B/G color-order permutations as metadata/query language only and metadata/query-only.

## Scope

- Add Abzan-side `Pair-Overlap Boundaries` to `docs/architecture/colors/abzan/identity.md`.
- Add Abzan-side `Wedge Separators` as false-positive boundaries only.
- Add docs-only `Commander And Archetype Anchors`.
- Add `Placement Guidance` requiring a positive Abzan evidence cluster, not `WBG` alone.
- Add `Non-runtime Search Seed Shapes` for future docs/raw planning only.
- Refine `docs/architecture/colors/abzan/metaphysics.md` primary tension language.
- Update board and handoff tracking only for the Abzan VM-199 duplicate-ID exception.

## Allowed Edits

- `docs/architecture/colors/abzan/identity.md`
- `docs/architecture/colors/abzan/metaphysics.md`
- `docs/kanban/done/VM-199-abzan-docs-parity-fill.md`
- `docs/kanban/board.md`
- new Abzan VM-199 handoff under `docs/handoffs/`
- `docs/handoffs/HANDOFF_INDEX.md`

Do not modify, stage, format, normalize, move, delete, or rename unrelated dirty/untracked baseline files.

## Evidence Boundary

- Evidence rows: `ABZAN-EVID-001` through `ABZAN-EVID-031`.
- Manual-fill rows: `ABZAN-MF-001` through `ABZAN-MF-011`.
- Commander rows: `ABZAN-CMD-001` through `ABZAN-CMD-006`, support-only.
- VM-199 creates no new evidence, manual-fill, source, Commander, or raw claim rows.
- Seed files remain discovery/reference only and are not cited directly.
- Dromoka's brood remains contrast/suppression context, explicitly non-Abzan.
- Commander/operator rows remain support-only and do not prove Tarkir canon, commander legality, or live placement behavior.

## Acceptance Criteria

- Abzan identity and metaphysics docs still exist.
- `identity.md` contains `Pair-Overlap Boundaries`, `Wedge Separators`, `Commander And Archetype Anchors`, `Placement Guidance`, and `Non-runtime Search Seed Shapes`.
- Changed docs contain `ABZAN-EVID`, `ABZAN-MF`, `ABZAN-CMD`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query`, `metadata/query-only`, and `non-live`.
- Cited `ABZAN-EVID-###`, `ABZAN-MF-###`, and `ABZAN-CMD-###` IDs exist in the normalized Abzan packet.
- `data/raw-factions/abzan/` still does not exist.
- No generated/runtime/schema/route/Home/Maze/Supabase files are changed.
- Final `git status --short` comparison confirms only allowed Abzan VM-199 paths were added or changed beyond the captured baseline.

## Out Of Scope

- `docs/research/abzan/` edits
- Raw-faction JSON
- Generated data
- Runtime keys, aliases, or public routes
- Home preview changes
- Maze changes
- Schema or Supabase changes
- Fixtures or builder output
- Card fact validation
- Commander legality validation
- New lore captures or source-tier decisions

## Tests

- Scoped existence, boundary-label, cited-ID, raw-packet absence, disallowed-path, whitespace, and final dirty-baseline comparison checks.
- Runtime/parser tests skipped because this is documentation-only.

## Follow-Up

Next user-declared Abzan stack card: VM-200 Raw-Faction Source Packet planning, only after reviewing the VM-199 docs parity layer.

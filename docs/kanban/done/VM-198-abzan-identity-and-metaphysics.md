# VM-198 - Abzan Identity And Metaphysics

ID: VM-198
Title: Abzan Identity And Metaphysics
Status: done
Type: Documentation / Architecture
Area: Abzan, Architecture Docs, Color Identity
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Duplicate-ID Note

This is the user-declared Abzan stack VM-198. The repository already has an unrelated completed `VM-198 - Shard Bundle Worktree Cleanup` card and handoff. That existing shard-cleanup VM-198 was not edited, moved, renamed, reopened, or otherwise altered. This duplicate is intentional for the Abzan VM-197 through VM-202 stack requested by the user.

## Summary

Create Abzan's docs-only architecture foundation from the normalized Abzan packet, preserving Abzan as non-live and `WBG` as metadata/query-only.

Repo truth records the normalized Abzan source packet as VM-200 because VM-197, VM-198, and VM-199 were already occupied. The VM-200 packet explicitly preserves the requested VM-197 source-packet scope, so this card cites the normalized VM-200 packet as the implementation record for the user-declared VM-197 evidence floor.

## Scope

- Create `docs/architecture/colors/abzan/identity.md`.
- Create `docs/architecture/colors/abzan/metaphysics.md`.
- Use only normalized Abzan packet evidence, manual-fill rows, support-only rows, and labeled `Vox Mana synthesis`.
- Preserve Abzan as non-live.
- Preserve `WBG` and any W/B/G color-order permutations as metadata/query language only and metadata/query-only.
- Document the duplicate-ID exception without altering the existing shard-cleanup VM-198 card or handoff.

## Allowed Edits

- `docs/architecture/colors/abzan/identity.md`
- `docs/architecture/colors/abzan/metaphysics.md`
- `docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md`
- `docs/kanban/board.md`
- new Abzan VM-198 handoff under `docs/handoffs/`
- `docs/handoffs/HANDOFF_INDEX.md`

Do not modify, stage, format, normalize, move, delete, or rename unrelated dirty/untracked baseline files.

## Evidence Boundary

- Evidence rows: `ABZAN-EVID-001` through `ABZAN-EVID-031`.
- Manual-fill rows: `ABZAN-MF-001` through `ABZAN-MF-011`.
- Commander rows: `ABZAN-CMD-001` through `ABZAN-CMD-006`, support-only.
- Seed files are discovery/reference only and must not be cited directly.
- Dromoka's brood is contrast/suppression context, not Abzan Houses.
- Commander/operator rows are support-only and do not prove Tarkir canon or commander legality.

## Acceptance Criteria

- `identity.md` and `metaphysics.md` exist under `docs/architecture/colors/abzan/`.
- Both docs cite normalized Abzan evidence/manual-fill/support rows.
- Both docs include the required boundary labels: `ABZAN-EVID`, `ABZAN-MF`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query`, `metadata/query-only`, and `non-live`.
- `data/raw-factions/abzan/` still does not exist.
- No generated/runtime/schema/route/Home/Maze/Supabase files are changed.
- Final `git status --short` comparison confirms only allowed Abzan VM-198 paths were added or changed beyond the captured baseline.

## Out Of Scope

- Raw-faction JSON
- Generated data
- Runtime keys, aliases, or public routes
- Home preview changes
- Maze changes
- Schema or Supabase changes
- Fixtures or builder output
- Card fact validation
- Commander legality validation
- Abzan docs parity fill beyond identity/metaphysics

## Tests

- Scoped existence, boundary-label, non-live, raw-packet absence, disallowed-path, whitespace, and final dirty-baseline comparison checks.
- Runtime tests skipped because this is documentation-only.

## Follow-Up

Next user-declared Abzan stack card: VM-199 Docs Parity Fill.

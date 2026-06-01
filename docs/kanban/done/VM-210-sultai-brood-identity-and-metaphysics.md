# VM-210 - Sultai Brood Identity And Metaphysics

ID: VM-210
Title: Sultai Brood Identity And Metaphysics
Status: done
Type: Architecture Docs
Area: Sultai Brood, Identity Architecture, Metaphysics
Priority: high
Created: 2026-05-31

## Summary

Create docs-only Sultai Brood identity and metaphysics architecture from the reviewed VM-209 source/evidence packet.

## Dependency

Completed after VM-209 source-packet acceptance.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Create `docs/architecture/colors/sultai/identity.md`.
- Create `docs/architecture/colors/sultai/metaphysics.md`.
- Ground Sultai as Black-centered `BGU`: ruthless opportunity, graveyard/resource conversion, and Blue calculation.
- Make the central metaphysical tension Black-Green life/death/resource use mediated by Blue planning.
- Keep `SULTAI` docs-only and non-live.
- Keep `BGU` and all color-order permutations metadata/query-only.
- Label support-only Commander/operator material and Vox Mana synthesis clearly.

## Non-Goals

- Do not create raw-faction JSON.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, or Temur files.
- Do not promote Sultai into placement eligibility, preview eligibility, routing, fixtures, generated data, or app surfaces.
- Do not treat Commander/operator rows as Tarkir lore proof or Commander legality proof.

## Acceptance Criteria

- [x] `identity.md` and `metaphysics.md` exist under `docs/architecture/colors/sultai/`.
- [x] Sultai is presented as Black-centered `BGU` with `SULTAI` as planned docs expression only.
- [x] `BGU` remains metadata/query-only and is not an alias, route key, fixture key, runtime key, lookup key, or placement key.
- [x] Manual-fill and support-only boundaries from VM-209 are preserved.
- [x] No raw-faction, runtime, generated, schema, Maze, route, Home, Supabase, Abzan, or Temur files are changed by VM-210.

## Completion Notes

- Created docs-only Sultai identity and metaphysics architecture from accepted VM-209 row IDs.
- Labeled `Vox Mana synthesis`, `support-only`, and `Manual fill required` boundaries.
- Kept the exploit keyword/mechanic as `Manual fill required` while allowing source-bound resource exploitation as a theme.
- Left VM-211 through VM-214 in Backlog.

## Suggested Tests

- Path existence checks for both architecture docs.
- Required-term scans for `SULTAI`, `BGU`, `Black`, `Tarkir`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query`, and `non-live`.
- Guard scans proving no raw-faction, generated, runtime, route, Maze, Home, or Supabase files changed.
- Scoped `git diff --check`.

# VM-230 - Jeskai Way Identity And Metaphysics

ID: VM-230
Title: Jeskai Way Identity And Metaphysics
Status: done
Type: Architecture Docs
Area: Jeskai Way, Identity Architecture, Metaphysics
Priority: high
Created: 2026-05-31

## Summary

Create docs-only Jeskai Way identity and metaphysics architecture from the reviewed VM-229 source/evidence packet.

## Dependency

Blocked until VM-229 is complete.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Create `docs/architecture/colors/jeskai/identity.md`.
- Create `docs/architecture/colors/jeskai/metaphysics.md`.
- Ground Jeskai as Blue-centered `URW`: cunning, disciplined study, martial action, and White structure.
- Preserve Narset, Shu Yun, Jeskai Way, Ojutai, and post-Khans timeline boundaries from VM-229.
- Keep `JESKAI` docs-only and non-live.
- Keep `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, and all lowercase forms metadata/query-only.
- Label support-only Commander/operator material and Vox Mana synthesis clearly.

## Non-Goals

- Do not create raw-faction JSON.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, Temur files, Sultai files, or Mardu files.
- Do not promote Jeskai into placement eligibility, preview eligibility, routing, fixtures, generated data, or app surfaces.
- Do not treat Commander/operator rows as Tarkir lore proof or Commander legality proof.
- Do not collapse Jeskai Way into Ojutai.

## Acceptance Criteria

- [x] `identity.md` and `metaphysics.md` exist under `docs/architecture/colors/jeskai/`.
- [x] Jeskai is presented as Blue-centered `URW` with `JESKAI` as planned docs expression only.
- [x] Color-code permutations remain metadata/query-only and are not aliases, route keys, fixture keys, runtime keys, lookup keys, or placement keys.
- [x] Manual-fill and support-only boundaries from VM-229 are preserved.
- [x] No raw-faction, runtime, generated, schema, Maze, route, Home, Supabase, Abzan, Temur, Sultai, or Mardu files are changed.

## Suggested Tests

- Path existence checks for both architecture docs.
- Required-term scans for `JESKAI`, `URW`, `Blue`, `Tarkir`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query`, and `non-live`.
- Evidence-row scans proving cited `JESKAI-EVID-###` rows resolve to VM-229.
- Guard scans proving no raw-faction, generated, runtime, route, Maze, Home, or Supabase files changed.
- Scoped `git diff --check`.

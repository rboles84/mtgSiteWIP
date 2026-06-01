# VM-224 - Mardu Horde Identity And Metaphysics

ID: VM-224
Title: Mardu Horde Identity And Metaphysics
Status: done
Type: Architecture Documentation
Area: Mardu Horde, Identity Architecture, Metaphysics
Priority: high
Created: 2026-05-31

## Summary

Create docs-only Mardu Horde identity and metaphysics architecture from the reviewed VM-223 source/evidence packet.

## Dependency

VM-224 depends on VM-223 completion.

## Shared Reservation Facts

- `docs/research/mardu horde/` is unmanaged seed material.
- `docs/research/mardu/` is future VM-223 source-packet workspace only.
- `MARDU` is the future public key.
- `RWB` and `WBR` remain metadata/query-only.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Use only VM-223 reviewed evidence rows, manual-fill rows, and support-only Commander boundaries.
- Create docs-only identity/metaphysics architecture for Mardu Horde.
- Preserve Red-centered Tarkir wedge framing and `MARDU` public-key planning without making Mardu live.
- Keep `RWB` and `WBR` as metadata/query-only shorthand.

## Non-Goals

- Do not create raw-faction JSON.
- Do not promote runtime keys, aliases, routes, fixtures, generated keys, Home preview entries, or Maze behavior.
- Do not edit VM-223 research packet files except for citation-only corrections explicitly required by review.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, builders, placement fixtures, Abzan files, Temur files, Sultai files, or Jeskai files.

## Acceptance Criteria

- [x] Mardu identity/metaphysics docs are source-bound to VM-223 evidence rows.
- [x] Commander/operator references remain support-only.
- [x] Manual-fill boundaries from VM-223 are preserved.
- [x] `MARDU` remains non-live and future-only.
- [x] `RWB` and `WBR` remain metadata/query-only.
- [x] No raw-faction, runtime, generated, schema, Maze, route, Home, Supabase, builder, or placement fixture files are changed.

## Completion Notes

- Created `docs/architecture/colors/mardu/identity.md`.
- Created `docs/architecture/colors/mardu/metaphysics.md`.
- Kept the VM-223 packet read-only and cited VM-223 evidence, support-only, and manual-fill IDs inline.
- Preserved `MARDU` as non-live and `RWB`/`WBR` as metadata/query-only.
- Left VM-225 through VM-228 in Backlog.

## Suggested Tests

- Evidence-row scans proving cited `MARDU-EVID-###` rows resolve to VM-223.
- Manual-fill scans proving unresolved claims still reference `MARDU-MF-###`.
- Support-only scans for Commander/operator references.
- Forbidden-path diff check for architecture-doc-only scope.
- Scoped `git diff --check`.

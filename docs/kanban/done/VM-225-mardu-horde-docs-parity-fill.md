# VM-225 - Mardu Horde Docs Parity Fill

ID: VM-225
Title: Mardu Horde Docs Parity Fill
Status: done
Type: Architecture Documentation
Area: Mardu Horde, Architecture Docs, Placement Planning
Priority: high
Created: 2026-05-31

## Summary

Fill Mardu Horde docs to the gold-standard clan parity layer, including pair overlaps, wedge separators, placement guidance, and false-positive boundaries without making Mardu live.

## Dependency

VM-225 depends on VM-224 completion.

## Shared Reservation Facts

- `docs/research/mardu horde/` is unmanaged seed material.
- `docs/research/mardu/` is future VM-223 source-packet workspace only.
- `MARDU` is the future public key.
- `RWB` and `WBR` remain metadata/query-only.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Extend VM-224 docs-only architecture to the current Abzan/Temur/Sultai/Jeskai parity shape where applicable.
- Add pair-overlap notes, wedge separators, anti-bleed boundaries, and placement guidance using only VM-223 evidence and VM-224 architecture.
- Keep Commander/operator material support-only.
- Keep `MARDU` future-only and `RWB`/`WBR` metadata/query-only.

## Non-Goals

- Do not create raw-faction JSON.
- Do not edit VM-223 research packet files unless a citation issue blocks parity documentation.
- Do not promote runtime keys, aliases, routes, fixtures, generated keys, Home preview entries, or Maze behavior.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, builders, placement fixtures, Abzan files, Temur files, Sultai files, or Jeskai files.

## Acceptance Criteria

- [x] Docs include Mardu pair overlaps, wedge separators, placement guidance, and false-positive boundaries where source-backed.
- [x] Cited `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###` references resolve to VM-223 packet rows.
- [x] Commander/operator references remain support-only.
- [x] `MARDU` remains non-live and future-only.
- [x] `RWB` and `WBR` remain metadata/query-only.
- [x] Changed paths are limited to Mardu architecture docs plus VM-225 Kanban/handoff bookkeeping.

## Completion Notes

- Added docs-only parity sections to Mardu identity architecture: pair overlaps, wedge separators, Commander/operator anchors, false-positive risks, prose-only placement guidance, and non-runtime search planning shapes.
- Kept metaphysics aligned with VM-225 by clarifying that raw/runtime use of parity material remains future-gated.
- Confirmed all architecture `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###` references resolve to existing VM-223 packet rows.
- Confirmed Mardu remains non-live; no raw-faction data, runtime, generated, Maze, Home, route, schema, Supabase, builder, fixture, shared architecture, or cross-lane files were changed by VM-225.

## Suggested Tests

- Evidence/manual-fill/Commander ID validation against the VM-223 packet.
- Required-term scans for `MARDU`, `RWB`, `WBR`, `Manual fill required`, `support-only`, `metadata/query`, and `non-live`.
- Forbidden-path diff check for docs-only scope.
- Scoped `git diff --check`.

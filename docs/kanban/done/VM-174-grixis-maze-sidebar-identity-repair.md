# VM-174 - Grixis Maze Sidebar Identity Repair

ID: VM-174
Title: Grixis Maze Sidebar Identity Repair
Status: done
Type: Maze / Dossier Handoff Bugfix
Area: Grixis, Maze, Archscry Handoff
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Fix the Maze `From Your Dossier` sidebar so a Grixis dossier builds UBR paths even when the stored primary placement result carries WU or another primary identity.

## Scope

- Add live shard keys to the Maze dossier color identity resolver.
- Preserve exact commander identity for commander paths.
- Preserve subset identity for support and flavor paths.
- Keep the Grixis outside-color stretch path hidden.
- Add regression coverage for a Grixis handoff with a WU primary placement result.

## Non-Goals

- Do not add new live placement keys.
- Do not make `UBR` a route key, alias, or placement key.
- Do not change Home, routes, schema fields, lore sources, raw claims, or Grixis runtime promotion status.

## Acceptance Criteria

- Grixis Maze sidebar commander path uses `id=ubr is:commander f:commander`.
- Grixis Maze sidebar support and flavor paths use `id<=ubr`.
- Grixis Maze sidebar does not show the outside-color commander stretch path.
- A stored WU primary placement result cannot make the active Grixis sidebar show WU.

## Completion Notes

- Added live shard identities to the Maze dossier sidebar resolver: `BANT`, `ESPER`, and `GRIXIS`.
- Verified a Grixis Maze handoff with stored WU primary placement noise renders UBR sidebar paths.
- Confirmed Grixis sidebar uses `id=ubr` for commanders, `id<=ubr` for support/flavor, and hides the outside-color stretch path.

# VM-165 - Grixis Identity And Metaphysics

ID: VM-165
Title: Grixis Identity And Metaphysics
Status: done
Type: Documentation / Architecture
Area: Grixis, Shard Architecture
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Create the docs-only Grixis architecture layer from the approved VM-164 packet by adding `identity.md` and `metaphysics.md`.

## Scope

- Run AGENTS pre-flight before implementation.
- Create `docs/architecture/colors/grixis/identity.md`.
- Create `docs/architecture/colors/grixis/metaphysics.md`.
- Use only VM-164 accepted/evidence-bound rows as identity foundations.
- Keep support-only, discovery-only, comparator-only, and manual-fill rows out of identity foundations.
- Label Vox Mana synthesis and manual-fill boundaries clearly.
- Keep Grixis non-live.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not materially rewrite VM-164 packet files.
- Do not create `data/raw-factions/grixis/`.
- Do not add `GRIXIS` to runtime/generated placement surfaces.
- Do not add `UBR` as a placement alias.
- Do not change runtime, generated, schema, route, Maze, Home, or Supabase files.

## Acceptance Criteria

- [x] `docs/architecture/colors/grixis/identity.md` exists.
- [x] `docs/architecture/colors/grixis/metaphysics.md` exists.
- [x] Required anchors appear: `GRIXIS`, `UBR`, `Black`, `Alara`, `Vox Mana synthesis`, `Manual fill required`, and VM-164 evidence references.
- [x] No new source IDs, claims, or lore assertions appear unless sourced to VM-164, labeled `Vox Mana synthesis`, or labeled `Manual fill required`.
- [x] Forbidden claims appear only as rejected/boundary/manual-fill text.
- [x] VM-164 packet files are not materially rewritten.
- [x] `data/raw-factions/grixis/` remains absent.
- [x] No runtime/data/schema/generated/Maze/route/Supabase files changed for VM-165.

## Closeout Notes

Created Grixis architecture docs from the VM-164 packet only. `identity.md` carries the evidence-backed Black-centered `GRIXIS` identity, while `metaphysics.md` translates that evidence into labeled Vox Mana synthesis and a matrix mapping.

Grixis remains docs-only and non-live. VM-166 raw-faction work remains gated.

## Acceptance Evidence

- `Test-Path docs\architecture\colors\grixis\identity.md` returned `True`.
- `Test-Path docs\architecture\colors\grixis\metaphysics.md` returned `True`.
- `Test-Path data\raw-factions\grixis` returned `False`.
- Required-anchor scan found `GRIXIS`, `UBR`, `Black`, `Alara`, `Vox Mana synthesis`, `Manual fill required`, and VM-164 row/file references.
- New-source-ID scan found no `GRX-SRC`, `BANT-`, `ESPER-`, or out-of-range `GRIXIS-*` IDs.
- Non-ASCII scan returned no hits.
- Trailing-whitespace scan returned no hits.
- Forbidden-claim scan found only rejected/boundary/manual-fill contexts.
- VM-164 packet file timestamps remained from VM-164 closeout, with no VM-165 material rewrite.

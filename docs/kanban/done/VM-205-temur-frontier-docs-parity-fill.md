# VM-205 - Temur Frontier Docs Parity Fill

ID: VM-205
Title: Temur Frontier Docs Parity Fill
Status: done
Type: Documentation / Architecture
Area: Temur Frontier, Tarkir Wedge, Architecture Docs
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Summary

Bring Temur's two architecture docs up to the practical shard/wedge parity layer while keeping Temur non-live.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Require VM-203 and VM-204 to be complete before starting.
- Update `docs/architecture/colors/temur/identity.md`.
- Update `docs/architecture/colors/temur/metaphysics.md`.
- Use only VM-203 evidence rows and VM-204 architecture organization.
- Add additive parity sections only; do not replace VM-204 foundational claims wholesale.
- Add pair-overlap boundaries for RG, GU, and UR.
- Add wedge separators for Naya, Sultai, Jeskai, Mardu, and Abzan where source-backed.
- Add adjacent two-color and Commander/operator boundaries for Gruul, Simic, Izzet, generic GUR goodstuff, and product-only Temur Commander decks.
- Add primary tension, non-runtime search seed shapes, operator anchors, placement guidance, and non-live boundaries.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not add new evidence rows, source IDs, source tiers, manual-fill rows, source claims, or raw claim IDs.
- Do not create `data/raw-factions/temur/`.
- Do not introduce `temur_claim_####` IDs.
- Do not add `TEMUR` or `GUR` to runtime/generated placement surfaces.
- Do not add `GUR` as an alias, route, raw key, fixture key, lookup key, or placement key.
- Do not change generated artifacts, schemas, routes, Maze, Home preview, Supabase, fixtures, route maps, browser bundles, or test fixtures.

## Acceptance Criteria

- [x] `docs/architecture/colors/temur/identity.md` exists.
- [x] `docs/architecture/colors/temur/metaphysics.md` exists.
- [x] `data/raw-factions/temur/` remains absent.
- [x] `identity.md` includes `Pair-Overlap Boundaries`, `Wedge Separators`, `Commander expression`, `Primary tension`, `Main false positives`, `Non-runtime Search Planning Shapes`, Commander/operator anchors, placement guidance, and non-live boundaries.
- [x] `metaphysics.md` includes an explicit `Primary Tension` section and preserves `Vox Mana synthesis`, not canon doctrine.
- [x] Cited `TEMUR-EVID-###` row IDs exist in the VM-203 evidence ledger.
- [x] No new source IDs, evidence rows, manual-fill rows, raw claim IDs, generated-HTML canon claims, seed-heading evidence, or live-promotion language are introduced.
- [x] Temur anti-bleed terms appear for Gruul, Simic, Izzet, Naya, Sultai, Jeskai, Mardu, Abzan, Atarka Clan, Dragonstorm Temur, and generic GUR goodstuff.
- [x] Changed paths are limited to Temur architecture docs plus VM-205 Kanban/handoff bookkeeping.

## Suggested Tests

- Required-anchor scan across Temur architecture docs.
- Evidence-row scan proving every `TEMUR-EVID-###` reference resolves in VM-203.
- Scope guard confirming no data/runtime/generated/Maze/route/Supabase/Home-preview paths changed.

## Completion Notes

- Added Temur `Pair-Overlap Boundaries` for Gruul, Simic, and Izzet.
- Added Temur `Wedge Separators` for Naya, Sultai, Jeskai, Mardu, and Abzan.
- Added support-only `Commander And Archetype Anchors`, `Placement Guidance`, and `Non-runtime Search Planning Shapes`.
- Refined metaphysics `Primary Tension` with preservation/adaptation language while preserving `Vox Mana synthesis` boundaries.
- Corrected architecture-doc references so Commander products as Tarkir canon or commander legality proof cite `TEMUR-MF-008`, using `docs/research/temur/temur-manual-fill.md` as the authoritative manual-fill file.
- No research, raw-faction, runtime, generated, schema, Supabase, Maze, Home, route, or VM-206 through VM-208 card changes were performed.

## Tests Run

- `Test-Path docs\architecture\colors\temur\identity.md`
- `Test-Path docs\architecture\colors\temur\metaphysics.md`
- `Test-Path data\raw-factions\temur`
- Required-section and required-term scans across Temur architecture docs.
- Evidence/manual-fill/Commander ID validation against the VM-203 packet.
- Guard scans for direct `TEMUR-SRC-###`, direct seed artifact citations, `temur_claim_####`, raw-faction paths, and positive live-promotion language.
- `git diff --name-only` promotion-leakage check.
- `git diff --check` on the VM-205 allowed files.

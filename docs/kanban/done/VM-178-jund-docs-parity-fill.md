# VM-178 - Jund Docs Parity Fill

ID: VM-178
Title: Jund Docs Parity Fill
Status: done
Type: Documentation / Architecture
Area: Jund, Shard Architecture Docs
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Bring Jund's two architecture docs up to the practical Bant/Esper parity layer while keeping Jund non-live.

Adjusted Jund sequence:

- VM-176 source/evidence packet
- VM-177 identity/metaphysics
- VM-178 docs parity
- VM-179 raw packet

## Scope

- Run AGENTS pre-flight before implementation.
- Update `docs/architecture/colors/jund/identity.md`.
- Update `docs/architecture/colors/jund/metaphysics.md`.
- Use only VM-176 evidence rows and VM-177 architecture organization.
- Add additive parity sections only; do not replace VM-177 foundational claims wholesale.
- Keep Jund non-live.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not add new evidence rows, source IDs, source tiers, manual-fill rows, source claims, or raw claim IDs.
- Do not create `data/raw-factions/jund/`.
- Do not introduce `jund_claim_####` IDs.
- Do not add `JUND` or `BRG` to runtime/generated placement surfaces.
- Do not add `BRG` as an alias, route, raw key, fixture key, lookup key, or placement key.
- Do not change generated artifacts, schemas, routes, Maze, Home preview, Supabase, fixtures, route maps, browser bundles, or test fixtures.
- Do not touch Naya VM-181 paths.

## Acceptance Criteria

- [x] `docs/architecture/colors/jund/identity.md` exists.
- [x] `docs/architecture/colors/jund/metaphysics.md` exists.
- [x] `data/raw-factions/jund/` remains absent.
- [x] `identity.md` includes `Pair-Overlap Boundaries`, `Shard Separators`, `Commander expression`, `Primary tension`, `Main false positives`, `Non-runtime Search Seed Shapes`, operator anchors, placement guidance, and non-live boundaries.
- [x] `metaphysics.md` includes an explicit `Primary Tension` section and preserves `Vox Mana synthesis`, not canon doctrine.
- [x] Cited `JUND-EVID-###` row IDs exist in the VM-176 evidence ledger.
- [x] No new source IDs, evidence rows, manual-fill rows, raw claim IDs, generated-HTML canon claims, seed-heading evidence, or live-promotion language were introduced.
- [x] Jund anti-bleed terms appear for Rakdos, Golgari, Gruul, Bant, Esper, Grixis, Naya, Witherbloom, Riveteers, and Modern Jund.
- [x] Changed paths are limited to Jund architecture docs plus VM-178 Kanban/handoff bookkeeping.
- [x] No Naya paths were changed.

## Closeout Notes

Added Jund-side pair-overlap boundaries, shard separators, system mapping parity rows, Commander/operator anchors, placement guidance, non-runtime search seed shapes, and an explicit primary tension. All additions are docs-only, evidence-bound, and non-live.

VM-179 raw-packet work remains gated.

## Acceptance Evidence

- `Test-Path docs\architecture\colors\jund\identity.md` returned `True`.
- `Test-Path docs\architecture\colors\jund\metaphysics.md` returned `True`.
- `Test-Path data\raw-factions\jund` returned `False`.
- Required-anchor scan found `Pair-Overlap Boundaries`, `Shard Separators`, `Commander expression`, `Primary tension`, `Main false positives`, `Non-runtime Search Seed Shapes`, `JUND`, `BRG`, `Red`, `Alara`, `Vox Mana synthesis`, and `Manual fill required`.
- Separator scan found Rakdos, Golgari, Gruul, Bant, Esper, Grixis, Naya, Witherbloom, Riveteers, and Modern Jund.
- Evidence-row scan found only `JUND-EVID-###` row IDs present in the VM-176 ledger.
- Scope guard confirmed changed files are limited to Jund architecture docs, VM-178 Kanban/board files, and handoff/index files.
- Naya path guard found no VM-178 diff under Naya paths.

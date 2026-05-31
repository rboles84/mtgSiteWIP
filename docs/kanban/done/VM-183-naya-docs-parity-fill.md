# VM-183 - Naya Docs Parity Fill

ID: VM-183
Title: Naya Docs Parity Fill
Status: done
Type: Documentation / Architecture
Area: Naya, Shard Architecture Docs
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Bring Naya's two architecture docs up to the practical Bant/Esper parity layer while keeping Naya non-live.

Adjusted Naya sequence:

- VM-181 source/evidence packet
- VM-182 identity/metaphysics
- VM-183 docs parity
- future raw JSON packet

## Scope

- Run AGENTS pre-flight before implementation.
- Update `docs/architecture/colors/naya/identity.md`.
- Update `docs/architecture/colors/naya/metaphysics.md`.
- Use only VM-181 evidence rows and VM-182 architecture organization.
- Add additive parity sections only; do not replace VM-182 foundational claims wholesale.
- Keep Naya non-live.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not add new packet identifiers, source tiers, evidence definitions, manual-fill definitions, source claims, or raw packet identifiers.
- Do not create or edit Naya raw JSON.
- Do not add `NAYA` or color-direction codes to runtime/generated placement surfaces.
- Do not promote color-direction codes into public/runtime identifiers, route surfaces, raw keys, fixture keys, lookup keys, placement keys, public labels, or generated labels.
- Do not add packet-shaped tables, structured field lists, scoring fields, readiness lists, or generated prose drafts.
- Do not change generated artifacts, schemas, navigation surfaces, Maze, Home preview, Supabase, fixtures, browser bundles, or test fixtures.

## Acceptance Criteria

- [x] `docs/architecture/colors/naya/identity.md` exists.
- [x] `docs/architecture/colors/naya/metaphysics.md` exists.
- [x] Naya raw JSON remains absent.
- [x] `identity.md` includes `Pair-Overlap Boundaries`, `Shard Separators`, `Commander expression`, `Primary tension`, `Main false positives`, `Placement Guidance`, and `Non-runtime Search Seed Shapes`.
- [x] `metaphysics.md` includes an explicit `Primary Tension` section and preserves `Vox Mana synthesis`, not canon doctrine.
- [x] Cited `NAYA-EVID-###`, `NAYA-MF-###`, `NAY-SRC-###`, and `NAY-CMD-###` row IDs exist in the VM-181 packet files.
- [x] No new packet identifiers, evidence definitions, manual-fill definitions, raw packet identifiers, seed-file evidence, or live-promotion language were introduced.
- [x] Naya comparator terms appear for Selesnya, Gruul, Boros, Bant, Esper, Grixis, Jund, Abzan, Temur, Cabaretti, generic big creatures, and generic tokens.
- [x] Commander search examples use exact `id=rgw`; support/deck texture examples use `id<=rgw`; both remain documentation-only.
- [x] Changed paths are limited to Naya architecture docs plus VM-183 Kanban/handoff bookkeeping.

## Completion Notes

Completed as a docs-only parity fill. Naya remains authored/review-gated, not live, not placement-eligible, and not runtime-visible. VM-183 added Naya-side pair overlaps, shard separators, Commander/operator support texture, placement guidance, search-shape examples, and primary-tension language without creating Naya raw JSON or changing runtime/generated surfaces.

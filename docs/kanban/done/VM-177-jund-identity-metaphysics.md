# VM-177 - Jund Identity And Metaphysics

ID: VM-177
Title: Jund Identity And Metaphysics
Status: done
Type: Documentation / Architecture
Area: Jund, Shard Architecture
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Create the docs-only Jund architecture layer from the approved VM-176 source/evidence packet by adding `identity.md` and `metaphysics.md`.

Adjusted Jund sequence:

- VM-176 source/evidence packet
- VM-177 identity/metaphysics
- VM-178 docs parity
- VM-179 raw packet

## Scope

- Run AGENTS pre-flight before implementation.
- Create `docs/architecture/colors/jund/identity.md`.
- Create `docs/architecture/colors/jund/metaphysics.md`.
- Use only VM-176 evidence rows as architecture foundations.
- Keep support-only, comparator-only, seed-only, generated-structure-only, and manual-fill rows out of identity foundations.
- Label `Vox Mana synthesis` and `Manual fill required` boundaries clearly.
- Keep Jund non-live.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not add new evidence rows, source tiers, source claims, or manual-fill conclusions.
- Do not materially rewrite VM-176 packet files.
- Do not create `data/raw-factions/jund/`.
- Do not introduce `jund_claim_####` IDs.
- Do not add `JUND` or `BRG` to runtime/generated placement surfaces.
- Do not add `BRG` as an alias.
- Do not change generated artifacts, schemas, routes, Maze, Home preview, Supabase, fixtures, route maps, browser bundles, or test fixtures.

## Acceptance Criteria

- [x] `docs/architecture/colors/jund/identity.md` exists.
- [x] `docs/architecture/colors/jund/metaphysics.md` exists.
- [x] Required anchors appear: `JUND`, `BRG`, `Red`, `Alara`, `Vox Mana synthesis`, `Manual fill required`, and VM-176 evidence references.
- [x] Cited `JUND-EVID-###` row IDs exist in the VM-176 evidence ledger.
- [x] No new source IDs, source tiers, evidence rows, manual-fill rows, or raw claim IDs were introduced.
- [x] Generated HTML and seed headings are not used as canon evidence.
- [x] Jund anti-bleed terms appear for Naya, Grixis, Gruul, Rakdos, Golgari, Witherbloom, Riveteers, and Modern Jund.
- [x] `data/raw-factions/jund/` remains absent.
- [x] No runtime/data/schema/generated/Maze/route/Supabase/fixture/Home-preview files changed for VM-177.

## Closeout Notes

Created Jund architecture docs from the VM-176 packet only. `identity.md` carries the Red-centered `JUND` identity, while `metaphysics.md` translates the evidence into labeled Vox Mana synthesis and a matrix mapping.

Jund remains docs-only and non-live. VM-178 docs parity work remains gated.

## Acceptance Evidence

- `Test-Path docs\architecture\colors\jund\identity.md` returned `True`.
- `Test-Path docs\architecture\colors\jund\metaphysics.md` returned `True`.
- `Test-Path data\raw-factions\jund` returned `False`.
- Required-anchor scan found `JUND`, `BRG`, `Red`, `Alara`, `Vox Mana synthesis`, `Manual fill required`, and VM-176 row references.
- Evidence-row scan found only `JUND-EVID-###` row IDs present in the VM-176 ledger.
- Guard scan found no `jund_claim_####` IDs.
- Scope guard confirmed changed files are limited to Jund architecture docs, VM-177 Kanban/board files, and handoff/index files.

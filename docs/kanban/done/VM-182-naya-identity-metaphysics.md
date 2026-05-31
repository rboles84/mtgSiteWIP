# VM-182 - Naya Identity And Metaphysics

ID: VM-182
Title: Naya Identity And Metaphysics
Status: done
Type: Documentation / Architecture
Area: Naya, Shard Architecture
Priority: high
Created: 2026-05-30
Updated: 2026-05-30
Completed: 2026-05-30

## Summary

Create the docs-only Naya architecture layer from the approved VM-181 source/evidence packet by adding `identity.md` and `metaphysics.md`.

## Scope

- Run AGENTS pre-flight before implementation.
- Create Naya architecture docs under `docs/architecture/colors/naya/`.
- Use only VM-181 evidence rows as architecture foundations.
- Keep support-only Commander/operator, card-data, color-philosophy, and comparator rows clearly marked as support-only texture.
- Label `Vox Mana synthesis` and `Manual fill required` boundaries clearly.
- Keep Naya authored/review-gated, not live, not placement-eligible, and not runtime-visible.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not add new evidence rows, source tiers, source claims, or manual-fill conclusions.
- Prefer no VM-181 packet edits.
- Do not create Naya raw JSON.
- Do not introduce Naya raw claim IDs.
- Do not add `NAYA` or `RGW` to runtime/generated placement surfaces.
- Do not add full docs-parity matrices, pair-overlap tables, operator/search seed sections, or raw-packet-facing claim structures.
- Do not change generated artifacts, schemas, routes, Maze, Home preview, Supabase, fixtures, route maps, browser bundles, or test fixtures.

## Acceptance Criteria

- [x] `docs/architecture/colors/naya/identity.md` exists.
- [x] `docs/architecture/colors/naya/metaphysics.md` exists.
- [x] Required anchors appear: `NAYA`, `RGW`, `Green`, `Alara`, `Vox Mana synthesis`, valid `NAYA-EVID-###` references, and `NAYA-MF-###` references where unresolved/thin lore appears.
- [x] Cited `NAYA-EVID-###`, `NAYA-MF-###`, `NAY-SRC-###`, and `NAY-CMD-###` row IDs exist in VM-181 packet files.
- [x] No new source IDs, source tiers, evidence rows, manual-fill rows, or raw claim IDs were introduced.
- [x] Seed files are not used as evidence.
- [x] Naya anti-bleed terms appear for generic big creatures, generic tokens, Cabaretti, Selesnya-with-red, Gruul-with-white, Bant-with-red, and Jund-style consumption.
- [x] Naya raw JSON remains absent.
- [x] No runtime/data/schema/generated/Maze/route/Supabase/fixture/Home-preview files changed for VM-182.

## Completion Notes

Created Naya architecture docs from the VM-181 packet only. `identity.md` carries the Green-centered `NAYA` identity, while `metaphysics.md` translates the evidence into labeled Vox Mana synthesis and a matrix mapping.

Naya remains docs-only and non-live. Docs parity, raw JSON, and runtime promotion remain gated.

## Acceptance Evidence

- `Test-Path docs\architecture\colors\naya\identity.md` returned `True`.
- `Test-Path docs\architecture\colors\naya\metaphysics.md` returned `True`.
- Naya raw JSON directory existence check returned `False`.
- Required-anchor scan found `NAYA`, `RGW`, `Green`, `Alara`, `Vox Mana synthesis`, `NAYA-EVID-###`, and `NAYA-MF-###` references.
- Evidence-row validation confirmed all cited `NAYA-EVID-###`, `NAYA-MF-###`, `NAY-SRC-###`, and `NAY-CMD-###` IDs exist in the VM-181 packet files.
- Guard scan found no raw claim IDs, no raw path language, no affirmative live/placement/runtime claims, and no color-code metadata leaks.
- Non-ASCII and trailing-whitespace scans across new VM-182 files passed.

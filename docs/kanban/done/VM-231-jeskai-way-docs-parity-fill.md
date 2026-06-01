# VM-231 - Jeskai Way Docs Parity Fill

ID: VM-231
Title: Jeskai Way Docs Parity Fill
Status: done
Type: Architecture Docs / Parity Fill
Area: Jeskai Way, Architecture Docs, Placement Planning
Priority: high
Created: 2026-05-31

## Summary

Bring Jeskai's docs-only architecture to the current shard/wedge parity layer while keeping Jeskai non-live.

## Dependency

Blocked until VM-229 and VM-230 are complete.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Update `docs/architecture/colors/jeskai/identity.md`.
- Update `docs/architecture/colors/jeskai/metaphysics.md`.
- Add pair-overlap boundaries for UR, WU, and RW.
- Add wedge separators against Temur, Mardu, Sultai, Abzan, and Naya where source-backed.
- Add adjacent two-color and Commander/operator boundaries for Izzet, Azorius, Boros, generic URW goodstuff, and product-only Jeskai Commander decks.
- Add primary tension, non-runtime search seed shapes, operator anchors, placement guidance, and non-live boundaries.
- Preserve Ojutai and post-Khans material as timeline/contrast material unless VM-229 evidence explicitly bridges it to Jeskai Way.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not add new evidence rows, source IDs, source tiers, manual-fill rows, source claims, or raw claim IDs.
- Do not create `data/raw-factions/jeskai/`.
- Do not add `JESKAI` or color-code permutations to runtime/generated placement surfaces.
- Do not change generated artifacts, schemas, routes, Maze, Home preview, Supabase, fixtures, route maps, browser bundles, or test fixtures.

## Acceptance Criteria

- [x] Jeskai architecture docs include pair-overlap boundaries, wedge separators, Commander/operator anchors, placement guidance, and non-live boundaries.
- [x] `metaphysics.md` includes an explicit primary tension and preserves `Vox Mana synthesis` boundaries.
- [x] Cited `JESKAI-EVID-###` row IDs exist in the VM-229 evidence ledger.
- [x] No new source IDs, evidence rows, manual-fill rows, raw claim IDs, generated-HTML canon claims, seed-heading evidence, or live-promotion language are introduced.
- [x] Jeskai anti-bleed terms appear for Izzet, Azorius, Boros, Temur, Mardu, Sultai, Abzan, Naya, Ojutai, and generic URW goodstuff.
- [x] Changed paths are limited to Jeskai architecture docs plus VM-231 Kanban/handoff bookkeeping.

## Suggested Tests

- Required-section and required-term scans across Jeskai architecture docs.
- Evidence/manual-fill/Commander ID validation against the VM-229 packet.
- Guard scans for direct `JESKAI-SRC-###`, direct seed artifact citations, raw claim IDs, raw-faction paths, and positive live-promotion language.
- Promotion-leakage `git diff --name-only` check.
- Scoped `git diff --check`.

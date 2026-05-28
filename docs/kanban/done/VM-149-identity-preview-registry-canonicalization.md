# VM-149 - Identity Preview Registry Canonicalization

ID: VM-149
Title: Identity Preview Registry Canonicalization
Status: done
Type: Data / Frontend Architecture
Area: Identity Registry, Home Preview, Archscry
Priority: high
Created: 2026-05-26
Updated: 2026-05-27

## Summary

Canonicalize the 20 current Home identity preview records into `data/identity-layers.json` before any shard, wedge, four-color, five-color, or colorless runtime expansion lands.

## Source Evidence

- `data/identity-layers.json`
- `data/identity-layers.schema.json`
- `assets/js/newindex2.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/commander-dossier.js`
- `research/build-faction-artifacts.mjs`
- `docs/reference/data-contracts.md`
- `docs/architecture/route-ownership-matrix.md`

## Scope

- Move the current 20 Home preview identities into canonical expression entries in `data/identity-layers.json`.
- Remove the private Home preview data island from `assets/js/newindex2.js`, including both `identities` and `colorProfiles`.
- Add required expression fields: `display_code`, `aliases`, `placement_eligible`, and `preview_eligible`.
- For `preview_eligible: true`, require `preview_order`, `preview_label`, `preview_title`, `preview_text`, `preview_hex`, and `preview_scores`.
- Define `preview_scores` from the current Home axis order: `order`, `knowledge`, `ambition`, `freedom`, `growth`.
- Use only this institution enum: `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, `colorless`.
- Keep `family` out of the schema until a future New Capenna or family-like grouping receives a separate runtime definition.
- Preserve current Home display codes such as `GW`, `GU`, and `RW` while routing through canonical keys such as `WG`, `UG`, and `WR`.
- Resolve visual-regression hooks and user-facing aliases through registry aliases so values like `boros`, `RW`, and `WR` land on canonical `WR`.
- Clean `assets/js/commander-dossier.js` last by reducing alias drift and documenting any remaining string-only fallback as temporary until dossier routing is fully registry-driven.

## Non-Goals

- Do not add shard, wedge, four-color, five-color, or colorless runtime entries in this card.
- Do not add `family` as an institution type.
- Do not alter placement scoring, precon ranking, MTG facts, commander facts, or Scryfall parser behavior.
- Do not directly edit generated artifacts when source files should own the change.
- Do not redesign Home visuals or change the carousel identity set.

## Implementation Notes

- Migrate all current Home `colorProfiles` W/U/B/R/G title, text, hex, and score arrays into mono-color expression entries.
- Migrate guild and college Home preview metadata from `identities` into matching canonical expression entries.
- Refactor `assets/js/newindex2.js` as a classic browser script that fetches `./data/identity-layers.json`, builds preview identities from `preview_eligible` entries sorted by `preview_order`, and keeps the existing `./data/factions.json` lore fetch.
- Update `data/identity-layers.schema.json` and tests to enforce preview metadata for preview-eligible entries.
- Widen `assets/js/quick-reading-tests.js` institution validation to the underscore enum above.
- Update `docs/reference/data-contracts.md` and route ownership docs so Home preview ownership is canonical registry-owned, not route-local.

## Acceptance Criteria

- Home loads without console errors.
- The carousel still cycles the same 20 identities in the same curated order.
- Held signal details still render.
- Boros visual-regression hook still selects Boros through aliases such as `boros`, `RW`, and `WR`.
- Radar geometry matches the migrated score arrays.
- `assets/js/newindex2.js` no longer contains the private `identities` or `colorProfiles` data island.
- Schema/tests enforce required preview metadata for all preview-eligible entries.
- VM-149 is closed in `done/` and no duplicate card is created.

## Required Verification

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:visual:newindex2`

## Notes

This is the prerequisite foundation for expansion. Treat fixed maps such as `RAW_TO_KEY` and route-local preview arrays as symptoms; the durable goal is registry-driven identity ownership without inventing future expression families before their runtime status is defined.

## Completion Note

Implemented and verified on 2026-05-27. The implementation handoff is `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`; the Kanban-only closeout handoff is `docs/handoffs/2026-05-27-0813-codex-vm149-kanban-closeout.md`.

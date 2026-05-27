# VM-149 - Identity Preview Registry Canonicalization

ID: VM-149
Title: Identity Preview Registry Canonicalization
Status: backlog
Type: Data / Frontend Architecture
Area: Identity Registry, Home Preview, Archscry
Priority: high
Created: 2026-05-26

## Summary

Make the homepage identity preview consume the canonical identity registry before any shard, wedge, or four-color expansion work lands.

## Source Evidence

- `data/identity-layers.json`
- `data/identity-layers.schema.json`
- `assets/js/newindex2.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/commander-dossier.js`
- `research/build-faction-artifacts.mjs`

## Scope

- Extend existing `identity-layers.json` expression records with preview and eligibility metadata such as `displayCode`, `aliases`, `placementEligible`, `previewEligible`, and `preview_scores`.
- Update schema/tests so future expression kinds are not blocked by `guild|college|color` assumptions.
- Make the homepage identity preview consume canonical registry data instead of its private hand-authored identity list.
- Centralize GW/WG, GU/UG, RW/WR, and related identity alias handling.
- Move builder behavior toward registry-driven expression iteration.

## Non-Goals

- Do not add shard, wedge, or four-color identities in this card.
- Do not alter precon ranking, placement scoring, MTG facts, or commander facts beyond the registry plumbing required for canonicalization.
- Do not merge this work into the homepage routing cutover branch.

## Acceptance Criteria

- The base 20 identities still render with equivalent preview data.
- Institution-kind validation no longer hard-blocks future expansion kinds.
- Alias behavior has one canonical source of truth or a documented migration seam.
- Existing placement, dossier, parser, and frontend smoke tests pass.

## Notes

This is the prerequisite foundation for expansion. Treat fixed maps such as `RAW_TO_KEY` as symptoms; the durable goal is registry-driven identity ownership.

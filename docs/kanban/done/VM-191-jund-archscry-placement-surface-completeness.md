# VM-191 - Jund Archscry Placement Surface Completeness

ID: VM-191
Title: Jund Archscry Placement Surface Completeness
Status: done
Type: Runtime Data / Dossier Quality
Area: Jund, Archscry, Commander Dossier, Placement
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Scan Jund's live placement, faction, raw-profile, and dossier-support surfaces after VM-190, then fill missing Archscry placement data so Jund can render complete Commander-facing copy in Vox Mana voice without inventing new lore or raw claims.

## Scope

- Add Jund deck-link metadata so generated Archscry faction output no longer depends only on runtime fallback links.
- Fill Jund Commander Compass support fields with support-only native commanders, archetype lanes, link targets, and operator guidance.
- Fill Jund placement discriminator questions, uncertainty prompts, and collision guidance for generated placement pages.
- Rebuild approved generated faction artifacts through `npm.cmd run build:factions`.
- Add regression coverage for Jund deck links, Commander Compass coverage, support-only boundaries, preview candidates, placement questions, and same-color/near-match collisions.

## Non-Goals

- Do not edit Jund raw claims, evidence rows, manual-fill rows, source ledgers, research docs, or architecture docs.
- Do not add new Jund lore, Commander facts, card facts, sources, route keys, Home preview entries, schema fields by hand, or Naya promotion work.
- Do not expose `BRG` as public copy, route key, alias, generated key, or raw-to-live key.

## Acceptance Criteria

- Jund generated faction output has a single deck-link group with Vox Mana lane copy and no public `Exact BRG` wording.
- Jund Commander Compass has support-only review status, native fit commanders, archetype lanes, and link targets.
- Jund Commander preview candidates resolve from local Scryfall data, are Commander legal, and satisfy `id<=brg`.
- Jund placement output has discriminator questions, uncertain-fit questions, and collision guidance for Gruul, Grixis, and Witherbloom.
- Jund lateral inhibition remains limited to approved live neighbors and does not add Naya.
- Jund raw claims remain byte-for-byte unchanged.

## Completion Notes

- Added Jund deck-link metadata in `data/identity-layers.json`.
- Filled Jund Commander Compass support data in `data/raw-factions/jund/jund.profile.json`.
- Filled Jund placement discriminator, uncertainty, and collision guidance in `data/raw-factions/jund/jund.placement.json`.
- Recorded VM-191 source-only/support-only repair in `data/raw-factions/jund/jund.changelog.json`.
- Rebuilt generated faction, placement, and Supabase context artifacts through the approved builder; schema output was checked by the builder with no direct schema diff in this scoped pass.
- Extended dossier follow-up tests to cover Jund generated deck links, Commander Compass support-only boundaries, local Scryfall candidate resolution, and placement/collision completeness.

## Tests Run

- JSON parse checks for Jund edited raw/profile/placement/changelog files
- `node --check research/build-faction-artifacts.mjs`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `npm.cmd run build:factions`
- Generated Jund sanity check for deck links, Commander Compass fields, placement questions, collisions, and lateral inhibition
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`

## Guard Checks

- `data/raw-factions/jund/jund.claims.json` hash stayed unchanged.
- Jund raw source-role boundaries stayed intact: architecture, Commander/operator, Scryfall, mechanics, seed, generated HTML, color-philosophy, comparator, and support-only sources were not promoted to claim-bearing sources.
- Jund public/generated copy does not use `Exact BRG`, `BRG match`, or `Jund lore proof`.
- Generated Jund collision output includes Gruul, Grixis, and Witherbloom guidance without adding Naya as a Jund inhibition target.

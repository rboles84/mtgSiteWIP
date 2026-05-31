# VM-194 - Bant Live Parity And Archscry Text Hardening

ID: VM-194
Title: Bant Live Parity And Archscry Text Hardening
Status: done
Type: Runtime Copy / Dossier Quality
Area: Bant, Archscry, Commander Dossier
Priority: high
Created: 2026-05-31
Updated: 2026-05-31

## Summary

Harden Bant's live Archscry and Commander dossier presentation so the mature live surface no longer relies on fallback copy, visible color-code shorthand, neighboring-faction language, or unsupported identity compression.

## Scope

- Add Bant Commander guidance and Archscry presentation overrides.
- Add Bant-specific exact-color precon fit summaries from local precon catalog rows only.
- Normalize Bant Commander Compass support metadata and link targets without adding lore or raw claims.
- Rebuild generated faction artifacts only through `npm.cmd run build:factions`.
- Add rendered/support regression coverage for Bant fallback copy, public `WUG` leakage, query contracts, and route-map boundaries.

## Non-Goals

- Do not add new Bant lore, raw claims, evidence rows, source IDs, Home preview entries, routes, schema fields, Maze behavior changes, or unrelated faction retuning.
- Do not treat Commander/operator, Scryfall, precon, mechanics, starter-card, or generated presentation material as canon.

## Acceptance Criteria

- Bant has mature Commander guidance and Archscry presentation overrides.
- Bant exact-color precon summaries use Bant support copy and avoid public `WUG` labels.
- Bant Commander discovery uses `id=wug is:commander f:commander`; support/starter discovery uses `id<=wug`.
- Bant user-facing visible text does not expose `WUG` as a public label or fallback phrase.
- No `/bant/` standalone public route copy or route-map entry is introduced.

## Closeout Notes

- Completed as VM-194 because VM-192 and VM-193 were already occupied by Jund and Grixis hardening work.
- Future Bant lore deepening, if still needed, must use the next open VM ID; VM-195 is already an Esper parity card in this worktree.
- Bant remains a support-only live pilot surface for Commander/precon/deck-search copy; VM-194 does not add lore, raw claims, Home exposure, Maze behavior, routes, schema fields, or broad shard retuning.

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/precon-artifact-tests.js`
- `npm.cmd run build:factions`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/precon-artifact-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- Targeted structural scans for `WUG` alias/key/query boundaries and `/bant/` route-map copy
- `git diff --check`

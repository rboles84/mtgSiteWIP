# VM-195 - Esper Live Parity And Archscry Text Hardening

ID: VM-195
Title: Esper Live Parity And Archscry Text Hardening
Status: done
Type: Runtime Copy / Dossier Quality
Area: Esper, Archscry, Commander Dossier
Priority: high
Created: 2026-05-31
Updated: 2026-05-31

## Summary

Harden Esper's live Archscry and Commander dossier presentation so the mature live surface no longer relies on fallback copy, visible color-code shorthand, neighboring-faction language, or unsupported identity compression.

## Scope

- Add Esper Commander guidance and Archscry presentation overrides.
- Add Esper-specific exact-color precon fit summaries from local precon catalog rows only.
- Normalize Esper Commander Compass support metadata and link targets without adding lore or raw claims.
- Rebuild generated faction artifacts only through `npm.cmd run build:factions` if authored display inputs change.
- Add rendered/support regression coverage for Esper fallback copy, public `WUB` leakage, query contracts, and route-map boundaries.

## Non-Goals

- Do not add new Esper lore, raw claims, evidence rows, source IDs, Home preview entries, routes, schema fields, Maze behavior changes, or unrelated faction retuning.
- Do not treat Commander/operator, Scryfall, precon, mechanics, starter-card, or generated presentation material as canon.

## Acceptance Criteria

- Esper has mature Commander guidance and Archscry presentation overrides.
- Esper exact-color precon summaries use Esper support copy and avoid public `WUB` labels.
- Esper Commander discovery uses `id=wub is:commander f:commander`; support/starter discovery uses `id<=wub`.
- Esper user-facing visible text does not expose `WUB` as a public label or fallback phrase.
- No `/esper/` standalone public route copy or route-map entry is introduced.

## Closeout

- Added Esper Commander guidance and Archscry presentation overrides.
- Added Esper exact-color precon fit summaries from local precon catalog support rows.
- Filled Esper Commander Compass support metadata from local WUB Commander support rows without changing raw claims.
- Rebuilt faction artifacts with `npm.cmd run build:factions`.
- Added Esper rendered dossier, presentation, Commander Compass, precon, and query-boundary regressions.
- Verified `ESPER` remains live, `WUB` remains query/color-direction metadata only, Home preview remains 20, and no `domain` field appears on Esper generated expression data.

## Tests

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `npm.cmd run build:factions`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `node research/presentation-snapshot-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

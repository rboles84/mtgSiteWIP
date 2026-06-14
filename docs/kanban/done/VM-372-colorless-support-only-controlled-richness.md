# VM-372 - Colorless Support-Only Controlled Richness

## Status

Done

## Summary

Exposed Colorless Commander Compass, a single named official precon deck link, and source-context research links as support-only controlled richness.

## Approved Scope Completed

- `commander_compass`
- `deck_links`
- `research_links`

## Implementation Notes

- Added exactly two Colorless Compass rows: `Zhulodok, Void Gorger` and `Omarthis, Ghostfire Initiate`.
- Kept each row on `recommendation_type: "Support-Only Commander Row"` and `confidence: "Support-only"`.
- Kept `commander_legal: null` deliberately because VM-372 does not introduce legality assertions.
- Added exactly one deck row: `Eldrazi Unbound (Precon)`.
- Kept the Colorless deck row with `edhrec: null` and `mtgd: null` to suppress broad browse links.
- Added source-context research links only.
- Reviewed `docs/research/colorless/colorless_Commander_ColorlessStaples_ManaStaples.txt` as context only and did not promote broad staple lists.

## Still Blocked

- Home preview
- Public route
- Aliases beyond `COLORLESS`
- Directory links
- Hero asset
- Schema or API expansion
- Broad recommendation copy
- EDHREC or MTGDecks browse links
- Legality, popularity, metagame, price, or recommendation-quality claims

## Acceptance Results

- `COLORLESS.preview_eligible === false`.
- `COLORLESS.aliases` remains exactly `["COLORLESS"]`.
- No lowercase `c` or `colorless` alias was added.
- `routing.suppress_directory_links === true`.
- Home preview remained unchanged from the VM-372 baseline.
- Maze strict `id=c` / `id<=c` behavior remained unchanged.
- No `heroBannerImageSlugForFaction("COLORLESS")` mapping was added.
- Generated faction diff from the VM-372 baseline changed only `COLORLESS`.
- Generated placement diff from the VM-372 baseline changed no placement keys.

## Tests

- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- JSON parse check for Colorless raw profile and changelog
- `npm.cmd run build:factions`
- `npm.cmd run validate:source-generated -- --targets=COLORLESS`
- `npm.cmd run test:placement`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:parser`
- Targeted VM-372 acceptance probe for Colorless Compass, deck links, research links, Home preview, aliases, routing, Maze queries, raw enrichment, and generated diff scope

## Handoff

See `docs/handoffs/2026-06-13-1149-codex-vm372-colorless-support-richness.md`.

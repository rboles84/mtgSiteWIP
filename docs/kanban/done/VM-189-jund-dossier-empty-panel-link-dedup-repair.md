# VM-189 - Jund Dossier Empty Panel And Link Dedup Repair

ID: VM-189
Title: Jund Dossier Empty Panel And Link Dedup Repair
Status: done
Type: Runtime UI Bugfix
Area: Jund, Archscry, Commander Dossier
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Fix the remaining Jund live dossier defects after VM-187: duplicate EDHREC / MTGDecks Start Here links, empty `Shard Starter Card References` headings, and duplicate `Basics` display in the Mana Base Starting Map.

## Scope

- Render Commander directory links once inside `Commander starting points`.
- Hide Starter Card References completely when no starter-card names are authored.
- Render only non-empty starter-card segment groups for future partial data.
- Keep the Jund basics guidance prose-only, with one visible `Basics` label.
- Add render-state regression coverage for the Jund empty-panel and link-dedup behavior.

## Non-Goals

- Do not edit Jund raw claims, research docs, architecture docs, evidence rows, manual-fill rows, or source roles.
- Do not touch Naya paths.
- Do not touch Home preview, route maps, schemas, generated faction output, Supabase context, or raw-faction metadata.
- Do not run `npm.cmd run build:factions`.

## Acceptance Criteria

- Jund Start Here renders one EDHREC link and one MTGDecks link.
- Jund does not render empty `Shard Starter Card References`, `Creatures`, `Instants and Sorceries`, or `Enchantments and Artifacts` panels when no starter cards are authored.
- Mana Base Starting Map shows one `Basics` label and the requested Swamps, Mountains, and Forests guidance.
- Existing factions with starter cards still keep Starter Card References.
- Partial starter-card data renders only non-empty segments.
- Jund raw claims remain unchanged.

## Completion Notes

- Added a shared dossier render-state helper for starter-card group normalization, starter segment filtering, Commander directory link HTML, and basics copy.
- Updated Start Here rendering so Commander directory links have one stable block under `Commander starting points`.
- Updated starter-card rendering to use normalized non-empty groups and to omit the panel when all groups are empty.
- Kept basics copy in the basics panel body and left the visible `Basics` label to the mana-base segment control.
- Added render-state regression assertions in `research/archscry-dossier-followup-tests.js`.

## Tests Run

- `node --check assets/js/index.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Guard Checks

- `data/raw-factions/jund/jund.claims.json` hash remained `EDA50E0F55756014D80351AC36089474755CA501B73DE5B11A4BFAC8641FDA82`.
- No VM-189 edits were made to Naya paths, Home preview files, route maps, schema files, generated faction output, Supabase context, or raw-faction metadata.

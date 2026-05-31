# VM-173 - Grixis Dossier Recommendation Quality Repair

ID: VM-173
Title: Grixis Dossier Recommendation Quality Repair
Status: done
Type: Dossier UX / Search Quality
Area: Grixis, Archscry, Maze, Card Recommendations
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Repair Grixis dossier recommendation quality after manual QA by filtering off-color card voices, adding starter display data, and making commander candidate searches use exact UBR identity.

## Scope

- Tighten Archscry flavor snippets so cards must fit the faction Commander color identity using the committed card index `color_identity`.
- Add Grixis starter UX card and mana-base display data without creating lore claims.
- Make commander candidate links use `id=ubr`; keep support and 99 links on `id<=ubr`.
- Hide the outside-color commander stretch path for Grixis dossiers unless broader inspection proves a global removal is warranted.
- Improve exact-identity commander search copy.

## Non-Goals

- Do not add new live placement keys.
- Do not make `UBR` a key, alias, route key, or runtime lookup target.
- Do not add routes, Home cards, Maze redesigns, schema domain fields, lore sources, or lore claims.
- Do not hand-edit generated artifacts outside the approved build outputs.

## Acceptance Criteria

- Grixis snippets exclude `Bant Sureblade` and any card whose committed `color_identity` is not a subset of UBR.
- Bant and Esper snippets remain nonempty and color-legal after filtering.
- Grixis starter cards and nonbasic mana-base tiers render nonempty.
- Every Grixis starter UX card resolves against the committed Scryfall index and satisfies `id<=ubr`.
- Grixis commander candidate Maze and dossier package links use `id=ubr is:commander f:commander`.
- Grixis support, flavor, and 99 links keep `id<=ubr`.
- Grixis hides the outside-color commander stretch path.
- Commander search copy avoids duplicated "commander identity commander candidates" phrasing.

## Completion Notes

- Filtered Archscry card voices by committed Scryfall `color_identity`, so Grixis no longer pulls off-color Alara flavor cards such as `Bant Sureblade`.
- Added Grixis starter UX display cards and nonbasic mana-base tiers through `data/identity-layers.json` and the faction build path.
- Updated commander candidate links to use exact identity (`id=... is:commander f:commander`) while keeping support/99 links on `id<=`.
- Hid the outside-color commander stretch path for Grixis dossiers only.
- Improved exact commander-search plain-language copy and added regression coverage for Grixis, Bant, and Esper.

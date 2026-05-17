# VM-005 - Archscry / Maze UX Continuity + Link Reliability

ID: VM-005
Title: Archscry / Maze UX Continuity + Link Reliability
Status: done
Type: reliability / UX polish
Area: Archscry, Maze, Commander discovery links
Priority: high
Created: 2026-05-15

## Summary

Tighten the VM-004 Archscry and Maze experience by improving dossier section order, preserving authored plain/operator Maze handoffs, making return continuity more durable, routing Strixhaven external deck links through reliable guild aliases, removing MTGGoldfish links, and polishing Maze and mana-base layouts.

## Source

User-provided "VM-005 Archscry / Maze UX Continuity Plan" prompt in Codex thread.

## Acceptance Criteria

- Archscry dossiers render Reading Omens immediately after The Shape of the Reading.
- Dossier summary content is split into Faction Fork, Table Identity, Lore To Mechanic, and Why This Fits You sections.
- Strixhaven college external links route through valid guild/color-pair aliases.
- Archscry-to-Maze links preserve `plainReadingQuery`, `operatorQuery`, `pathType`, and return URL.
- Maze opens Archscry-originated links in The Plain Reading while executing the operator query.
- Operator's Hand still exposes raw Scryfall syntax intentionally.
- Copy behavior matches active mode.
- Return banner persists across Maze navigation and can be dismissed without clearing the stored return URL.
- Commander cards no longer show redundant Color Identity labels.
- Active UI no longer contains banned system-language strings.
- No active UI renders MTGGoldfish deck links, and no Commander recommendation helper builds MTGGoldfish URLs.
- Prismari EDHREC resolves to `/commanders/izzet`.
- Prismari MTGDecks resolves to `/Commander/izzet-commanders`.
- Silverquill MTGDecks resolves to `/Commander/orzhov-commanders`.
- Required tests and manual checks pass or blockers are documented.

## Files Likely Impacted

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `research/research-init.js`
- `research/research-mode.js` if needed
- `maze.html`
- `archscry/index.html`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/*.md`

## Risks

- Keep placement scoring, model data, generated faction artifacts, raw lore/source data, Supabase logic, Scryfall index builders, and Commander ranking logic untouched.
- External deck-link behavior should favor reliable directory routes and conservative broad search URLs.
- Maze must continue executing live Scryfall syntax even when the visible input uses authored plain-language copy.
- User-facing copy should stay interpretive and lore-aware rather than exposing system or recommendation internals.

## Implementation Prompt

Implement the VM-005 UX continuity and link reliability pass as a scoped presenter/UI reliability update over Archscry dossier rendering, Archscry-to-Maze handoff payloads, external deck alias routing, Maze return-banner persistence, copy behavior, and responsive layout polish.

## Notes

- Use presenter/render-level copy sanitation; do not edit generated faction JSON for this pass.
- MTGGoldfish is intentionally removed from active UI integrations.
- Completed with scoped presenter/UI changes only; generated faction data, raw lore, placement scoring, Supabase logic, Scryfall index builders, and Commander ranking logic were not touched.


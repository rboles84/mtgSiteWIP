# VM-020 - Route Architecture Normalization

ID: VM-020
Title: Route Architecture Normalization
Status: complete
Type: Tech Debt / Routing
Area: Routing, Navigation
Priority: medium
Created: 2026-05-16

## Summary

Normalize Vox Mana to route folders with `index.html` default documents so the public structure reads consistently across Home, Maze, Archscry, and Apocrypha.

## Source Evidence

- `docs/architecture/project-atlas.md` - current route map and runtime layer definitions describe the canonical folder-based layout.
- `docs/diagrams/route-map.mmd` - route diagram now speaks the canonical folder-based paths.
- `index.html`, `archscry/index.html`, `maze/index.html`, `apocrypha/index.html` - the current public entry points follow the folder-based route model.

## Problem

The site currently mixes root HTML files, route folders, and an Apocrypha folder named `library`, which makes the canonical navigation model harder to reason about and maintain.

## Proposed Outcome

Canonical routes become:

- `/` -> `index.html`
- `/maze/` -> `maze/index.html`
- `/archscry/` -> `archscry/index.html`
- `/apocrypha/` -> `apocrypha/index.html`

## Acceptance Criteria

- Maze is served from a route folder and the runtime links use `/maze/`.
- Apocrypha is served from a route folder and the runtime links use `/apocrypha/`.
- Home and Archscry continue to work without changing their route identities.
- Route documentation, diagrams, and method references match the canonical structure.
- Maze query handoffs still preserve `q`, `operatorQuery`, `plainReadingQuery`, `from`, and `readingId`.

## Dependencies / Related Work

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `maze/index.html`
- `apocrypha/index.html`
- `docs/architecture/project-atlas.md`
- `docs/diagrams/route-map.mmd`

## Risks / Uncertainties

- Maze has a relative module import that must be corrected when the file moves into a subfolder.
- Old bookmarks to `/maze.html` and `/library/` will not match the canonical route names.
- Documentation drift can make the migration look incomplete even if runtime links are updated.

## Implementation Prompt

Normalize the public route structure to route folders with `index.html` default documents, then update all canonical links and route references to match.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The canonical route folders are live.
- Runtime links and query builders point at the new paths.
- Docs, diagrams, and planning references match the new route names.

## Human Review

Yes - this is a structural route migration and should be reviewed before and after implementation.

## Notes

Keep the migration narrow and avoid unrelated presentation cleanup during the route move.


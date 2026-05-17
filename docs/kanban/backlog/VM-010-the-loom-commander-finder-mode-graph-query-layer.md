# VM-010 - The Loom Commander Finder Mode and Graph/Query Layer

ID: VM-010
Title: The Loom Commander Finder Mode and Graph/Query Layer
Status: backlog
Type: Enhancement / Research
Area: Maze
Priority: medium
Created: 2026-05-15

## Summary

Hold the future Loom work as one story: a Commander Finder mode inside Maze, a conceptual graph layer, and a cleaner split between literal query parsing and concept-level explanation.

## Source

- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\05-the-loom\\_index.md` - says The Loom is still TBD and lives inside The Implicit Maze as a search mode.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\05-the-loom\\loom-master-implementation-plan.md` - defines The Loom as an adapter-driven evidence graph across card mechanics, search intent, and identity evidence.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\04-the-implicit-maze\\_index.md` - notes that the shipped Loom tab is only a flat Visual Builder (Loom v0) and the full node-graph Loom is separate future work.
- `docs/architecture/data-flow-map.md` and `docs/architecture/project-atlas.md` - show the current Maze architecture and parser wiring that the Loom would build on.

## Acceptance Criteria

- The Loom exists as a Commander Finder mode inside Maze rather than as a separate mini-app.
- Concept registry, node-map, or graph-style explanation surfaces are planned as part of the feature.
- Literal query parsing and conceptual explanation are treated as distinct layers with a clear handoff.
- Placement evidence can enrich the mode without duplicating the parser or replacing Maze search.

## Dependencies / Related Work

- Maze parser and search modules
- Placement bridge and Commander Compass evidence
- Existing Loom v0 behavior
- VM-006 Maze continuity work if the mode needs stronger return behavior

## Files Likely Impacted

- `maze.html`
- `research/research-init.js`
- `research/research-mode.js`
- `research/research-search.js`
- `assets/js/index.js`
- `docs/architecture/data-flow-map.md`

## Risks / Uncertainties

- This can easily turn into a parallel search engine if the scope is not guarded.
- Reusing parser logic is important, or the feature will fork into an unmaintainable path.
- The concept-graph UI may need more research before it is ready for implementation.

## Implementation Prompt

Plan the Loom as a graph-aware Commander Finder mode inside Maze, with shared parser evidence and a clear conceptual layer on top of current search behavior.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The Loom has a decision-complete implementation direction and no longer reads as TBD.
- The mode split, evidence graph, and placement bridge have a concrete path forward.

## Human Review

Yes - the Loom is a major product and architecture story that should be reviewed before build work.

## Notes

Keep the story focused on query interpretation and evidence layers, not on a cosmetic re-skin of Maze.


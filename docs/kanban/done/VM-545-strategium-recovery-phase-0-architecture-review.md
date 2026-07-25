# VM-545 - Strategium Recovery Phase 0 Architecture Review

Status: Done
Type: Product Architecture Review
Area: Strategium
Owner: Codex
Completed: 2026-07-25

## Summary

Reviewed the current Strategium implementation, navigation, routes, prior Strategium decisions, and adjacent backlog/strategy documents for Phase 0 of the Strategium Recovery Program.

## Pre-Flight Summary

- Recent related work: VM-112B renamed Basics to Strategium with no `/basics/` compatibility shell; VM-122 rebuilt Strategium as a Commander learning console; VM-125 added the route-local archetype library; VM-416 added Heat Management and refreshed route-local content; VM-493 added a strategy-only nervous precon pilot confidence series.
- Current known risks: Strategium can become too broad if product-guide, glossary, card-search, or gear-guide concepts are folded into it without a strict table-literacy lens.
- Relevant decisions: preserve `/strategium/`; keep Strategium data route-local until an explicit architecture decision changes it; preserve Home, Archscry, Maze, Apocrypha, Library alias, Privacy, and Terms route roles.
- Files recently changed by related work: `strategium/index.html`, `assets/js/strategium.js`, `assets/css/strategium.css`, `docs/architecture/project-atlas.md`, `docs/architecture/route-ownership-matrix.md`, and related handoff/kanban docs.
- Do not touch: runtime code, generated data, public copy, visual baselines, placement model, Maze parser/search behavior, Archscry dossier logic, Apocrypha public reference library, or legal copy.

## Scope

- Review existing Strategium pages, navigation, route names, entry points, terminology, missing journeys, duplicate concepts, and simplification opportunities.
- Produce recommendations before a future Phase 1 `strategium-information-architecture.md`.

## Outcome

- Completed a read-only product architecture review.
- Confirmed the governing product vision fits the current route direction: Strategium as a field guide for understanding Commander as a multiplayer social game.
- Identified Phase 1 additions, removals, reorganizations, and route-conflict cautions.

## Tests / Validation

- Repository reads only.
- Targeted static review of current Strategium route, route-local JS, shared topbar, project atlas, route ownership matrix, related Strategium cards, and adjacent strategy/backlog docs.
- `git status --short` showed no pre-existing tracked dirty work.

## Not Touched

- Runtime files
- Public copy
- Generated files
- Visual baselines
- Source/governed MTG data
- Route behavior
- CSS, HTML, or JavaScript implementation

## Follow-Up

- Create Phase 1 `strategium-information-architecture.md` as an architecture document, not as an implementation ticket.
- Promote VM-406-style Archscry-to-Strategium bridge planning into the IA.
- Keep older Basics/resource/product-guide concepts out of Strategium unless reframed as table-literacy journeys.

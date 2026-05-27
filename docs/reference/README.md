# Vox Mana Technical Documentation Atlas

This folder is the developer map for the current Vox Mana working tree. It documents how the static site, research tools, adaptive placement model, generated data, Supabase edge function, and external local tooling fit together.

## Start Here

- [Project Atlas](../architecture/project-atlas.md) - product shape, route map, entrypoints, runtime layers, external services, scripts, and generated artifacts.
- [Route Ownership Matrix](../architecture/route-ownership-matrix.md) - per-route ownership map for page purpose, HTML/CSS/JS, storage, data, services, tests, risks, and scoped-protection boundaries.
- [Core Logic And Algorithms](../architecture/core-logic-and-algorithms.md) - adaptive placement, legacy quick scoring, Scryfall parsing, visual builder, persistence, archived terminal, rate limiting, and build logic.
- [Data Flow Map](../architecture/data-flow-map.md) - raw faction data, generated models, browser storage, Supabase profile storage, Scryfall calls, archived terminal calls, and command-panel state.
- [Method Reference](./method-reference.md) - Javadoc-equivalent inventory of named functions, exported constants, globals, handlers, and endpoint surfaces.
- [Diagrams](../diagrams/diagrams.md) - editable Mermaid sources and static SVG companions.
- [Spec Index](./spec-index.md) - map of existing project specs and how they relate.

## Existing Project Specs

- [Data Contracts](./data-contracts.md)
- [Manual Test Cases](./manual-test-cases.md)
- [Visual Style Guide](../design/visual-style-guide.md)
- [Asset Manifest](../design/asset-manifest.md)
- [Implementation Notes](../design/implementation-notes.md)
- [Move Into Repo](./move-into-repo.md)
- [Workflow](./workflow.md)

## Scope Notes

This atlas is documentation-only. It records the working tree as inspected and does not change runtime behavior, package scripts, Supabase schemas, generated JSON, or site markup.

Bulk/generated artifacts are mapped by role rather than repeated line-by-line. That includes `data/factions.json`, `data/placement-model.json`, `supabase/functions/guild-recruiter/faction-context.ts`, media assets, and `test-results/`.

# Agent Handoff

- Agent name: Codex
- Task requested: Implement the docs-only VM-013 placement-domains prerequisite so future Khans and New Capenna expansion work has a canonical architecture home without changing live runtime behavior.
- Related Kanban card, docs, or plans:
  - `docs/kanban/done/VM-013-placement-domains-architecture-post-v1-faction-expansion.md`
  - `docs/architecture/placement-domains.md`
  - VM-013 implementation plan approved in-thread on 2026-05-28

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-1723-codex-backlog-seeding-repo-obsidian.md`
- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-17-1553-codex-mono-rollout-complete-checkpoint.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-013-placement-domains-architecture-post-v1-faction-expansion.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/reference/data-contracts.md`
- `data/identity-layers.json`
- `data/raw-factions/`
- `C:\dev\projectFiles\obsidianDocs\vox-mana-docs\02-archscry\commander-compass\faction-expansion-khans-capenna.md`
- `C:\dev\projectFiles\obsidianDocs\vox-mana-docs\02-archscry\commander-compass\03-data-architecture.md`
- `C:\dev\projectFiles\obsidianDocs\vox-mana-docs\02-archscry\commander-compass\_index.md`

## Files changed

- `docs/architecture/placement-domains.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-013-placement-domains-architecture-post-v1-faction-expansion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1922-codex-vm013-placement-domains-prerequisite.md`

## What changed

- Added a canonical placement-domains architecture doc that defines `ravnica_strixhaven` as the current live baseline domain and `khans` / `new_capenna` as future post-v1 roadmap domains.
- Updated the living architecture docs so they point to the new spec and state clearly that no runtime or generated artifact currently exposes a live `domain` field.
- Preserved the current repo truth that raw source coverage remains 15 faction folders while mono coverage is represented through the identity-layer model.
- Closed VM-013 on the Kanban board as a docs-only prerequisite and moved its card to `done/`.
- Recorded the work in the handoff index for future planning and implementation passes.

## Why it changed

The repo already supports a live 20-expression placement model, but future Khans and New Capenna work needed a stable architectural home before any schema or runtime expansion begins. This slice documents that direction while protecting the current product from premature taxonomy or contract churn.

## Decisions made

- Treat `ravnica_strixhaven` as the current active baseline domain for the shipped 20-expression model.
- Do not split Ravnica and Strixhaven into separate domains in this slice.
- Keep Khans and New Capenna strictly post-v1 and architecture-only here.
- Do not add, rename, or reclassify any expression, faction, guild, college, wedge, family, or mono identity.
- Keep future domain selection gate-detected rather than adding an upfront domain selector.
- Close VM-013 as satisfied by documentation and architecture alignment rather than by runtime expansion.

## Risks / uncertainties

- No follow-on Khans or New Capenna cards were created in this pass; later implementation planning still needs explicit scoped cards.
- Future Capenna work still requires a separate schema/version decision because `family` is not a current live identity-layer category.
- A future Ravnica/Strixhaven domain split would touch question routing, adjacent-fit behavior, and dossier language and should not be attempted casually.

## Tests run

- `npm.cmd run test:placement`
- `rg -n "Khans|New Capenna|family|domain field|shipped placement support|live placement support" docs/architecture/placement-domains.md docs/architecture/project-atlas.md docs/architecture/data-flow-map.md docs/architecture/core-logic-and-algorithms.md`
- `Get-ChildItem data/raw-factions -Directory | Select-Object Name`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`

## Not touched

- Runtime JavaScript, route CSS, Maze controller files, schemas, generated data, raw faction source packages, and Supabase runtime behavior.
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Current route cleanup work outside this docs-only prerequisite

## Follow-up recommendations

- Open separate follow-on cards before implementing Khans wedges or New Capenna families.
- Treat any future `domain` field addition as a schema and runtime contract change, not a docs-only tweak.
- Reuse `docs/architecture/placement-domains.md` as the decision anchor for any future domain-aware question-bank, dossier, or Apocrypha work.

## Next suggested agent

Planning Architect for scoped Khans/New Capenna follow-on cards, or Documentation Steward if the broader architecture atlas needs additional cross-linking later.

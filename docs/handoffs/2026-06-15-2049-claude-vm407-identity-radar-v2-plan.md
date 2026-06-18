# 2026-06-15 20:49 - Claude (Planning Architect) - VM-407 Identity Radar v2.0 Plan + Mock

## Agent name

Claude (Planning Architect)

## Task requested

Research the identity-signal color system (Home) and identity-matrix radar (Archscry), deep-dive `graph.js` and its consumers, then design a "version 2.0" of the radar — richer visually and informationally — without deviating from the existing implementation. Iterate on an interactive mock with the owner, then: save a memory of the locked aesthetic direction, write a fully-detailed Kanban card using a free VM number, and produce a downloadable standalone HTML backup of the approved mock.

## Files reviewed

- `CLAUDE.md`, `AGENTS.md`, `docs/handoffs/HANDOFF_INDEX.md`, `docs/kanban/board.md`
- `docs/kanban/done/VM-364-archscry-identity-matrix-data-map.md`, `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/kanban/backlog/VM-010-...md`, `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`, `docs/kanban/in-progress/VM-404-contained-ui-polish-repair.md`
- `assets/js/graph.js` (confirmed vendored Chart.js v4.5.1)
- `assets/js/dossier-radar.js`, `assets/js/home.js`, `assets/js/index.js`
- `data/identity-layers.json` (`preview_*` shape, 37 `preview_eligible`)
- `index.html`, `archscry/index.html` (radar markup + `graph.js` script tags)
- `assets/css/home.css`, `assets/css/archscry.css` (radar class locations)

## Files changed

- `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html` (NEW - standalone backup of the approved interactive mock)
- `docs/kanban/backlog/VM-407-identity-radar-v2-visual-info-upgrade.md` (NEW - full plan/card)
- `docs/kanban/board.md` (added VM-407 to Backlog)
- `docs/handoffs/2026-06-15-2049-claude-vm407-identity-radar-v2-plan.md` (this handoff)
- `docs/handoffs/HANDOFF_INDEX.md` (new top row)
- Memory: `~/.claude/projects/C--dev-mtgSiteWIP/memory/radar-v2-aesthetic-direction.md` + `MEMORY.md` index (outside repo)

## What changed

- Confirmed and documented that `graph.js` is Chart.js only; the two radars (Home `#vmHeroManaChart` via `home.js`, Archscry `#dossierManaRadar` via `dossier-radar.js`) are separate, non-shared implementations with duplicated helpers/plugins and divergent score sources (registry vs hardcoded constants — the open VM-364 drift).
- Iterated an interactive radar mock with the owner across several passes, converging on a locked v2.0 direction (breathing identity-color glow, blended multi-color fill, faint dashed component overlays behind, draw-in/pop, larger frame, beginner info panel with plain-language axis meanings + strength words + lit pips + lore + core tension, two-way hover writing a strategium reading into a fixed panel slot — no floating tooltip, no gold rings, no spinning sweep, no background wash).
- Wrote VM-407 as a decision-complete Planning Architect card capturing every design decision, current-state findings, the shared-module approach, the VM-364 score-authority unification, data/schema impacts, UI/UX impacts, exact visual spec, files impacted, do-not-touch areas, risks, acceptance criteria, tests, and deferred ideas.
- Saved a standalone, dependency-free HTML backup of the approved mock.

## Why it changed

The owner wants to elevate the identity radar for new players (who cannot interpret raw axis numbers) while preserving the Vox Mana aesthetic, and wanted the direction durably recorded as an actionable card + a downloadable backup before any build work.

## Decisions made

- No runtime/code/data changes — research + planning + mock only, per the owner's "research only / no code changes" scope, then explicit request to write the card/memory/HTML.
- Build v2.0 once as a shared module consumed by both routes, folding in the VM-364 unification (single radar-score authority = `identity-layers.json` `preview_scores`).
- Mock is a DESIGN reference only: SVG-rendered, dependency-free, sample data hardcoded. Real build stays on Chart.js v4 and reuses existing plugin/helper patterns.
- Free VM number = VM-407 (VM-404 in-progress, VM-405/406 backlog were the prior highest).
- Strategium per-axis copy is a content dependency: ship generic per-axis lines first with a hook for later Strategium-sourced copy (VM-125/126, VM-406).

## Risks / uncertainties

- Score-authority migration changes the visible shape of the 14 Archscry fallback-averaged identities — needs an explicit author-vs-fallback decision.
- `identity-layers.json` may be builder-generated; authoring `preview_scores` must respect source/generated guardrails (VM-300).
- New strategium copy does not exist as structured data yet.
- Visual baselines for Home and Archscry will change; coordinate refresh.
- Perf/reduced-motion must stay within the Home Lighthouse budget (VM-392 context).

## Tests run

- None (no code/data changed). The mock HTML was visually verified in the preview panel. Build-time tests (`npm test`, `npm run test:placement`, `npm run test:parser`, dossier follow-up, new radar regression) are specified in the card for the implementation phase.

## Not touched

- `assets/js/graph.js`, runtime JS/CSS, `index.html`/`archscry/index.html` markup, generated/runtime JSON, placement scoring, raw faction packets, lore/source data, Maze/Supabase behavior, known residuals.

## Follow-up recommendations

- Confirm the writer of `identity-layers.json` `preview_scores` before any authoring.
- Decide author-real-scores vs documented-averaging-fallback for the 14 fallback identities.
- Consider splitting VM-407 into (a) score-authority unification (VM-364 close) and (b) visual/info upgrade if they should ship separately.
- Author the per-axis strategium copy (coordinate with VM-406 / VM-125 / VM-126).

## Next suggested agent

Planning Architect or JSON Cartographer to confirm `identity-layers.json` source ownership and the score-authority migration, then a build agent for the shared `vm-radar.js` module.

## Related Kanban card, docs, or plans

- VM-407 (this plan), VM-364 + `docs/reference/archscry-identity-matrix-data-map.md`, VM-078/097/063/118/132, VM-389/390/392, VM-404, VM-406, VM-125/126, VM-300.
- Mock: `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html`.

# VM-551 Gate A Final Two-Blocker Correction Handoff

- Agent name: Codex
- Task requested: Correct the final mobile Dossier Directory activation and card-preview boundary/caption blockers, plus the bounded compact co-leader pip gap, on the existing Gate A implementation branch.
- Starting candidate: `6fa0d0c2a2441de114d86b9fd9daf29dd211eaa4`
- Branch: `codex/vm551-gate-a-trust-containment-implementation`
- Worktree: `C:\dev\voxmana.io-vm551-gate-a-implementation`
- Candidate: the commit containing this handoff; exact SHA is reported to the owner after commit.

## Files reviewed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `scripts/browser-smoke.mjs`
- `scripts/vm551-gate-a-owner-qa-tests.mjs`
- `docs/qa/2026-08-01-vm551-gate-a-owner-qa.md`
- `docs/plans/vm551-gate-a-trust-containment/implementation-status.md`
- VM-551 Kanban card, board, recent handoff, and handoff index

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `scripts/browser-smoke.mjs`
- `scripts/vm551-gate-a-owner-qa-tests.mjs`
- `docs/qa/2026-08-01-vm551-gate-a-owner-qa.md`
- `docs/plans/vm551-gate-a-trust-containment/implementation-status.md`
- `docs/kanban/in-progress/VM-551-gate-a-trust-containment-design.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What changed and why

The mobile tab defect was not a panel-state defect. The scroll row captured the mouse pointer on every `pointerdown`, including a normal click. That allowed the browser to retarget `pointerup`/`click` to the tablist, so the delegated `[data-action="set-dossier-panel"]` action never ran. The earlier capture-phase fallback also kept drag state until some later click, which could swallow the next intentional selection.

Pointer capture now begins only after movement crosses the six-pixel drag threshold. Ordinary clicks keep their button target and flow through the one existing delegated action. A true drag suppresses only its own synthetic click, then clears in the next task so a later click cannot inherit stale state.

The card preview previously found the nearest entire card wrapper, so the name, flavor copy, and surrounding panel all resolved to the same image. Preview triggers are now limited to a preview image or its immediate image link. The overlay contains only the image; its redundant visible caption and CSS were removed. The preview closes when the pointer/focus leaves the image link, on scrolling, and on dossier panel/layout changes. Source image alt text and link accessible names are unchanged.

The compact co-leader card receives only a scoped `0.32rem` pip gap. Mana Font size, glow, canonical order, accessible label, and every other symbol surface are unchanged.

## Decisions made

- Retain the existing single delegated Archscry action handler as the only tab activation authority.
- Do not add a second preview implementation or caption replacement.
- Treat the co-leader gap as identity-count-independent presentation; the same class covers mono-, two-, three-, five-color, and Colorless pips.

## Tests run

- `node scripts/vm551-gate-a-owner-qa-tests.mjs` — PASS.
- `node scripts/vm551-scryfall-cache-tests.mjs` — PASS.
- `node scripts/browser-smoke.mjs --archscry-only` — PASS at 1440/820/390/320 after one transient fresh-page answer-load timeout passed on immediate rerun. The successful run covers all tabs, View All, drag/wheel/chevron/keyboard paths, image-only preview, caption absence, preview close behavior, overflow, console, card links, Matrix, and Maze continuity.
- `npm.cmd run test:placement` — PASS, 37 factions / 37 golden paths.
- `npm.cmd run test:bias` — PASS, unchanged seeded report.
- `npm.cmd run test:gate-live-bias` — PASS, 625 paths / 29 rank-one winners.
- `npm.cmd run lint:js`, `lint:html`, `test:copy-boundaries`, `test:frontend-smoke`, `test:route-metadata`, `test:deck-links`, `test:maze-scratchpad`, `test:parser` — PASS; parser 226 cases.
- In-app browser at 390px — PASS for all seven tabs and drag-then-click selection.
- `git diff --check` — PASS.

## Risks / uncertainties

- Pointer drag remains a mouse enhancement; touch uses native horizontal scrolling and its normal click synthesis.
- Remote/deployed browser differences remain an owner spot-check concern until this exact local candidate is reviewed.
- One browser-smoke run hit the known environment-sensitive fresh-page readiness timeout at 820px; the unchanged path passed on immediate full rerun.

## Not touched

- Gate A result-state calculation, tie calculation, co-leader identity isolation, comparison, or original-reading restoration
- questions, answers, scores, shares, ranking, branching, stopping, or serialized placement fields
- Matrix data, values, renderers, or numeric paths
- Scryfall cache key, schema, TTLs, backoff, eviction, local-first resolution, or precon/card routing
- precon data/routing, recommendations, deck links, Maze behavior, schemas, or migrations
- Gate B1, merge, push, deployment, certification, or visual baselines

## Follow-up recommendation

Owner performs the four bounded spot checks in the QA record against the exact candidate commit, then decides whether Gate A is accepted. No Gate B1 work should begin from this handoff.

- Next suggested agent: owner visual reviewer
- Related Kanban/docs: VM-551 Gate A card; `docs/qa/2026-08-01-vm551-gate-a-owner-qa.md`; accepted Gate A plan and compatibility contract

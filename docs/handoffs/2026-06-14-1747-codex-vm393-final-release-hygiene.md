# VM-393 Final Release Hygiene Handoff

## Agent Name

Codex

## Task Requested

Complete final v1.0 release hygiene after VM-389 through VM-392, including dirty-tree classification, research prototype disposition, waiver carry-forward, branch divergence, and main-promotion readiness. Do not stage, commit, push, tag, merge, refresh baselines, or promote main without explicit instruction.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`
- `docs/kanban/done/VM-390-home-v1-visual-readiness.md`
- `docs/kanban/done/VM-391-archscry-strategium-visual-readiness.md`
- `docs/kanban/done/VM-392-lighthouse-home-performance-readiness.md`
- `docs/handoffs/2026-06-14-1555-codex-vm389-home-identity-signal.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`
- `docs/handoffs/2026-06-14-1724-codex-vm391-archscry-strategium-visual-waiver.md`
- `docs/handoffs/2026-06-14-1742-codex-vm392-lighthouse-home-performance.md`
- `docs/research/vox-mana-decomposition-in-screen.html`
- `docs/research/vox-mana-decomposition-insight.html`

## Files Changed

- `docs/kanban/in-progress/VM-393-final-release-hygiene-main-promotion-readiness.md`
- `docs/kanban/done/VM-393-final-release-hygiene-main-promotion-readiness.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-14-1747-codex-vm393-final-release-hygiene.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/audits/lighthouse-home.html`

## What Changed

- Created and closed VM-393 as the final release-hygiene card.
- Classified the dirty tree as intentional VM-387 through VM-393 release-train work plus two untracked research prototypes.
- Classified the decomposition prototypes as standalone `docs/research/` design-archive candidates only, with no runtime linkage or release dependency.
- Documented branch divergence after `git fetch origin`: current branch is even with `origin/feature/ui-refactor-exploration`, and `70` ahead / `3` behind `origin/main`.
- Carried forward VM-390, VM-391, and VM-392 waivers into the final release verdict.
- Trimmed two trailing-space lines in the generated Lighthouse HTML report so `git diff --check` passes.

## Why It Changed

The release needed a clean governance answer before any main promotion decision: what is intentionally dirty, which blockers are truly resolved, which failures are waived, whether research prototypes are runtime-linked, and whether upstream/main should be merged. VM-393 records those answers without performing promotion.

## Decisions Made

- Do not merge `origin/main` during VM-393. The inspected `origin/main` commits are older main-line UI/Scryfall-polish commits and require explicit later selection if any part should be preserved.
- Do not stage/commit/push/tag or promote main.
- Treat v1.0 as release-ready only if the documented visual and Lighthouse waivers are accepted.
- Treat the two decomposition HTML files as optional research archive artifacts, not runtime files.

## Risks / Uncertainties

- The tree is still dirty and uncommitted; release is not mechanically promoted.
- Home, Archscry, and Strategium visual tests remain red by documented waiver.
- Home Lighthouse Performance remains `88/90` by documented waiver.
- `origin/main` has three commits not merged into the release source branch; this is documented, not resolved.

## Tests Run

- `git fetch origin` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `node assets/js/quick-reading-tests.js` - passed: 37 factions, 37 golden paths.
- `git diff --check` - passed after generated Lighthouse whitespace cleanup, with LF/CRLF warnings only.
- `rg` prototype linkage check - no runtime imports, public links, or release dependency found for the two decomposition prototypes.

## Not Touched

- No placement, Maze, generated data, schema/API, aliases, public routes, source lore, Commander facts, or visual baselines.
- No staging, commit, push, tag, merge, or main promotion.

## Follow-Up Recommendations

- On explicit instruction, stage the intentional VM-387 through VM-393 bundle and decide whether to include the two `docs/research/vox-mana-decomposition-*.html` prototypes as archive artifacts.
- Keep the VM-390/391/392 waivers visible in the release notes or commit message if promoting v1.0.
- Open a post-v1 Home performance card for font/CSS/LCP strategy with visual-baseline authority.

## Next Suggested Agent

Release/publish agent only after explicit user instruction to stage, commit, push, tag, or promote main.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-393-final-release-hygiene-main-promotion-readiness.md`
- `docs/kanban/done/VM-390-home-v1-visual-readiness.md`
- `docs/kanban/done/VM-391-archscry-strategium-visual-readiness.md`
- `docs/kanban/done/VM-392-lighthouse-home-performance-readiness.md`

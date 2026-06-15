# 2026-06-14 16:47 - Codex - VM-390 Home Visual Readiness

## Agent Name

Codex

## Task Requested

Implement VM-390: promote VM-154 into a focused Home v1 visual-readiness pass, resolve Home horizontal overflow, preserve VM-389's 37-identity Home behavior, avoid baseline churn, classify any remaining `test:visual:home` failure, and close the Kanban/handoff trail without staging, committing, pushing, or tagging.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1555-codex-vm389-home-identity-signal.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/handoffs/2026-05-28-1246-codex-vm154-home-overflow-card.md`
- `docs/handoffs/2026-05-28-1151-codex-vm147a-home-risk-reduction-implementation.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`
- `index.html`
- `assets/css/home.css`
- `scripts/visual-regression-home.mjs`
- `scripts/frontend-smoke.mjs`

## Files Changed

- `assets/css/home.css`
- `scripts/frontend-smoke.mjs`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/kanban/done/VM-390-home-v1-visual-readiness.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`

## What Changed

- Created and closed VM-390 as the focused Home v1 visual-readiness card.
- Moved VM-154 from backlog to done as superseded by VM-390, preserving its original overflow evidence.
- Fixed Home horizontal overflow in `assets/css/home.css` by keeping `.vm-hero-mana::before` horizontally inside the panel and restoring clipping on `.vm-chart-wrap.vm-hero-chart-wrap`.
- Updated `scripts/frontend-smoke.mjs` so the required Kanban file guard follows the VM-154 move from backlog to done.
- Recorded before/after viewport measurements, changed selectors, test results, and visual-failure classification in the VM-390 card.

## Why It Changed

VM-389 made Home's Identity Signal v1-complete with 37 identities, but Home still had a release-blocking horizontal overflow signal and `test:visual:home` remained red. VM-390 resolves the measurable overflow while keeping the remaining Home visual diff classified instead of expanding into baseline refresh, redesign, placement, Maze, generated-data, Archscry, Strategium, or release-promotion work.

## Decisions Made

- Kept the implementation CSS-only and Home-local.
- Did not use broad `overflow-x: hidden` or `overflow-x: clip` on `html`/`body`.
- Did not refresh Home visual baselines.
- Classified remaining `test:visual:home` failure as Home baseline drift from prior/VM-389 intentional Identity Signal changes and unrelated broad baseline drift, not unresolved horizontal overflow.
- Preserved VM-387/VM-388/VM-389 dirty work and the two untracked decomposition research prototypes.

## Risks / Uncertainties

- `test:visual:home` still fails current baseline budgets: mobile `59348`, tablet `100267`, desktop `132498` mismatched pixels against budget `300`.
- The Home baseline needs a reviewed waiver or intentional baseline update in a later release-hygiene/visual-baseline card.
- VM-387's Archscry and Strategium visual failures remain unresolved and were not rerun in VM-390.
- Prior VM-365 Lighthouse Home Performance `86` vs required `90` remains unresolved and was not rerun.
- The working tree remains dirty with VM-387/388/389/390 changes plus the two untracked decomposition HTML prototypes.

## Tests Run

- Browser overflow probe - PASS: no document/body horizontal overflow at `375`, `390`, `430`, `768`, `800`, `1024`, and `1440`.
- Browser behavior probe - PASS: 37 Home preview identities, contiguous `preview_order` `0-36`, forced Boros capture still renders overlay/title, reduced motion reports `Still`.
- Accessibility spot-check - PASS: keyboard focus reaches `#heroManaSignalLatch`; Enter opens held-signal details; details are visible with `aria-expanded="true"`, `aria-pressed="true"`, and populated text.
- `npm.cmd run test:visual:home` - FAIL: mobile `59348`, tablet `100267`, desktop `132498`; classified as remaining Home baseline drift after overflow resolution.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - initial FAIL from stale VM-154 backlog path; PASS after updating the path.
- `node assets/js/quick-reading-tests.js` - PASS, 37 factions and 37 golden paths.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - PASS with line-ending warnings only.

## Not Touched

- Home visual baselines.
- `index.html`
- `assets/js/home.js`
- `assets/js/graph.js`
- Placement model behavior, generated data, raw/source lore, Commander facts, public routes, aliases, Maze behavior, schema/API surfaces, directory links, Apocrypha runtime, Archscry runtime, Strategium runtime, research prototypes, staging, commits, pushes, or tags.

## Follow-Up Recommendations

- VM-391: resolve or formally waive Archscry and Strategium visual failures.
- VM-392: rerun, fix, or formally waive Lighthouse Home Performance `86/90`.
- VM-393: final release hygiene, research prototype classification, intentional staging/commit only after explicit instruction, and main promotion only after explicit instruction.
- Include Home visual baseline drift in the release waiver/baseline decision now that VM-390 has removed measured overflow.

## Next Suggested Agent

Frontend Visual QA for VM-391 Archscry/Strategium visual readiness, then Performance/Release Manager for Lighthouse and final promotion hygiene.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-390-home-v1-visual-readiness.md`
- `docs/kanban/done/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`
- `docs/handoffs/2026-06-14-1555-codex-vm389-home-identity-signal.md`

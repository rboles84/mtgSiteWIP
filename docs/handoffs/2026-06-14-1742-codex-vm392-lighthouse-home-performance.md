# VM-392 Lighthouse Home Performance Readiness Handoff

## Agent Name

Codex

## Task Requested

Rerun, fix, or formally waive the Home Lighthouse release blocker after VM-390 and VM-391. Preserve the current dirty tree, avoid staging/commits/tags/main promotion, and keep any fix Home-local and release-safe.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-390-home-v1-visual-readiness.md`
- `docs/kanban/done/VM-391-archscry-strategium-visual-readiness.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`
- `docs/handoffs/2026-06-14-1724-codex-vm391-archscry-strategium-visual-waiver.md`
- `scripts/lighthouse-home.mjs`
- `scripts/visual-regression-home.mjs`
- `index.html`
- `assets/css/home.css`
- `assets/css/fonts.css`
- `docs/audits/lighthouse-home.html`

## Files Changed

- `scripts/lighthouse-home.mjs`
- `index.html`
- `docs/audits/lighthouse-home.html`
- `docs/kanban/done/VM-392-lighthouse-home-performance-readiness.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-14-1742-codex-vm392-lighthouse-home-performance.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Hardened the Home Lighthouse harness so browser/server cleanup is bounded and does not hang after report write.
- Added a pre-audit paint verification in the launched Edge instance so the harness confirms Home renders before running Lighthouse.
- Added `preconnect` hints for the existing Home Google Fonts origins.
- Reran the official Home Lighthouse command and retained the generated `docs/audits/lighthouse-home.html` report.
- Closed VM-392 with a formal Performance `88/90` waiver and Accessibility `96` pass.

## Why It Changed

The first VM-392 reruns produced a misleading Lighthouse `NO_FCP` result with `0/0` scores even though Puppeteer and visual artifacts showed Home was not blank. The harness needed to distinguish an actual Home paint failure from an Edge/Lighthouse collection issue before making a release decision. After the harness stabilized, the real blocker remained the known near-miss: Performance below `90`.

## Decisions Made

- Treat current official Lighthouse result as meaningful after the pre-audit paint verification: Performance `88`, Accessibility `96`.
- Waive the remaining Performance `88/90` miss for v1.0 instead of widening VM-392 into font delivery, CSS minification, or layout/LCP restructuring.
- Keep the invisible font preconnect hints because they are Home-local, low risk, and consistent with the existing external font request.
- Keep the rewritten `docs/audits/lighthouse-home.html` as current VM-392 evidence.

## Risks / Uncertainties

- Home Lighthouse Performance remains below the `90` gate and is formally waived, not fixed.
- Current diagnostics point mainly at LCP/render-blocking/font/CSS delivery; resolving that cleanly may require visual-baseline authority.
- The harness still uses local Edge on Windows, so scores may vary slightly by machine and browser state.

## Tests Run

- `node --check scripts/lighthouse-home.mjs` - passed.
- `npm.cmd run test:lighthouse:home` - failed with meaningful score: Performance `88`, Accessibility `96`; waived under VM-392.
- Targeted Puppeteer paint probe - passed; Home produced nonblank pixels, FCP, and no horizontal document overflow.
- Targeted Lighthouse diagnostics probe - Performance `87`, Accessibility `96`; FCP about `0.7s`, LCP about `2.3s`, TBT `0ms`, CLS `0.009`.

## Not Touched

- No placement, Maze, Archscry, Strategium, Apocrypha, generated data, schema/API, route/alias, source-lore, Commander-fact, or visual-baseline changes.
- No staging, commit, push, tag, or main promotion.

## Follow-Up Recommendations

- Create a post-v1 Home performance card to evaluate font self-hosting/removal of the external Cinzel request, CSS delivery/minification, and first-viewport/LCP strategy.
- Keep the VM-392 waiver visible in final release readiness notes so the v1.0 promotion decision is explicit.

## Next Suggested Agent

Release steward for VM-393 final hygiene and main-promotion readiness classification.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-392-lighthouse-home-performance-readiness.md`
- `docs/audits/lighthouse-home.html`
- `docs/handoffs/2026-06-12-2347-codex-vm365-full-test-html-report.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`
- `docs/handoffs/2026-06-14-1724-codex-vm391-archscry-strategium-visual-waiver.md`

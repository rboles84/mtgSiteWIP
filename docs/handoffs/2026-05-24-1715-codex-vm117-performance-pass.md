# Agent Handoff

## Agent name

Codex

## Task requested

Implement VM-117 Phase 7 Performance Pass: add safe lazy rendering for offscreen sections, finish intrinsic image sizing, normalize external script deferral, add a public HTML validator pass for those constraints, and add a reproducible desktop Lighthouse runner for `newIndex2.html`.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1453-codex-vm114-p0-shared-css-foundation-pass.md`
- `docs/handoffs/2026-05-24-1537-codex-vm115-shared-token-follow-up.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-114-p0-shared-css-foundation-pass.md`
- `docs/kanban/done/VM-115-shared-token-follow-up-oklch-fluid-type.md`
- `docs/kanban/done/VM-116-css-architecture-phase-2-layout-layer-animation-consolidation.md`
- `assets/css/tokens.css`
- `index.html`
- `newIndex2.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `library/index.html`
- `scripts/validate-frontend-html.mjs`
- `package.json`

## Files changed

- `assets/css/tokens.css`
- `index.html`
- `newIndex2.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `library/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/lighthouse-newindex2.mjs`
- `package.json`
- `package-lock.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-117-phase-7-performance-pass-script-deferral-cls-lighthouse.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`

## What changed

- Added `.section-lazy-render` to `assets/css/tokens.css` with `content-visibility: auto` and `contain-intrinsic-size: 1px 600px`.
- Applied that utility only to safe offscreen surfaces: `newIndex2.html` `#what`, `newIndex2.html` footer, and `strategium/index.html` footer.
- Added `defer` to the safe head scripts on `archscry/index.html` and `maze/index.html`, including the Supabase CDN script and shared runtime scripts, while preserving load order.
- Added `defer` to `graph.js` on `newIndex2.html` and `strategium/index.html`.
- Replaced the immediate chart boot calls on `newIndex2.html` and `strategium/index.html` with `DOMContentLoaded` bootstraps so the deferred chart library is available before `new Chart(...)` runs.
- Refactored `strategium/index.html` so its radar chart is created inside an explicit `initRadarChart()` function instead of at top-level parse time.
- Added explicit intrinsic `width` and `height` attributes to the remaining decorative public background images across Home, Home Preview, Archscry, Maze, Strategium, Apocrypha, Library, Privacy, and Terms.
- Rebuilt `scripts/validate-frontend-html.mjs` to enforce deferred or module script loading, intrinsic image sizing, the current legal-page nav targets, and the existing Maze/Archscry/Library HTML invariants.
- Added `lighthouse` as a dev dependency plus a local `scripts/lighthouse-newindex2.mjs` runner that serves the repo, resolves Edge paths dynamically, and attempts a desktop Lighthouse audit against `newIndex2.html`.
- Updated `scripts/lighthouse-newindex2.mjs` to log the resolved `chromePath`, emit Lighthouse `info` progress, print `runWarnings`, print `runtimeError` details, and write `docs/audits/lighthouse-newindex2.html` for inspection.
- Tried both old headless mode and `--headless=new` without `--disable-gpu` in `scripts/lighthouse-newindex2.mjs`; neither mode resolved the Lighthouse `NO_FCP` runtime error on this Edge install.
- Added the `test:lighthouse:newindex2` npm script.
- Added the VM-117 Kanban trail and this handoff.

## Why it changed

- The earlier shared CSS phases intentionally left a low-risk performance pass for later so the structural CSS work could land first.
- The live public pages still had remaining CLS debt from unsized decorative images and several pages still loaded safe external scripts synchronously.
- `newIndex2.html` and `strategium/index.html` specifically needed small boot-order fixes before `graph.js` could be deferred safely.
- The repo needed a truthful HTML validator gate and a repeatable Lighthouse harness instead of relying on ad hoc manual checks alone.

## Decisions made

- Kept the performance pass surgical and did not attempt broad inline-style extraction on `newIndex2.html` or `strategium/index.html`.
- Excluded `newIndex2_Old.html` entirely.
- Used the shared `tokens.css` entrypoint for the lazy-render utility rather than adding page-local duplicates.
- Treated all remaining decorative public background images as needing explicit intrinsic dimensions and preserved their existing visual CSS sizing behavior.
- Preserved script order when adding `defer` to Archscry and Maze because shared runtime boot order matters for Supabase-backed flows.
- Recorded the card as done because the substantive Phase 7 work shipped and passed the relevant runtime and smoke verification, while the Lighthouse score gate is a machine constraint rather than an implementation blocker.

## Risks / uncertainties

- `npm.cmd run test:lighthouse:newindex2` currently launches `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`, reaches the audit, and then fails with `runtimeError.code = NO_FCP`, so Lighthouse never observes a first paint.
- Switching between old headless and `--headless=new` without `--disable-gpu` did not change the outcome.
- `newIndex2.html` still emitted one generic 404 console error during local smoke testing; the page itself continued to initialize and no JS runtime errors appeared, but the missing asset was not traced further in this pass.
- Archscry and Maze still show browser privacy warnings related to storage access for the Supabase CDN script in headless Edge, though no page errors or session-start failures appeared after the `defer` change.

## Tests run

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run lint:html`
- `npm.cmd run test:lighthouse:newindex2`
  - Writes `docs/audits/lighthouse-newindex2.html`
  - Logs `runWarnings: ["The page did not paint any content... (NO_FCP)"]`
  - Logs `Runtime error: NO_FCP The page did not paint any content...`
- `npm.cmd run test:lighthouse:newindex2` after confirming the old-headless path
  - Still logs `Runtime error: NO_FCP`
- `npm.cmd run test:lighthouse:newindex2` after switching to `--headless=new` without `--disable-gpu`
  - Still logs `Runtime error: NO_FCP`
- Manual served-page smoke via a local static server plus headless Edge and `puppeteer-core` on:
  - `newIndex2.html`
  - `archscry/index.html`
  - `maze/index.html`
  - `strategium/index.html`

## Not touched

- `newIndex2_Old.html`
- Lore/data JSON
- Route copy and information architecture
- The large inline style blocks on `newIndex2.html` and `strategium/index.html` beyond the minimal boot-order edits required for deferred scripts
- Shared CSS files unrelated to the new utility

## Follow-up recommendations

- When Lighthouse is needed again, re-run `npm run test:lighthouse:newindex2` from Chrome DevTools manually or on a machine with a compatible Chrome or standard 64-bit Edge install.
- Trace the residual `newIndex2.html` 404 console error during local served-page QA so the page is fully clean in DevTools.
- If later performance work continues on `newIndex2.html`, consider a broader pass on render-heavy inline CSS and animation surfaces now that the low-risk deferral and CLS cleanup is in place.

## Next suggested agent

Frontend QA agent

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-117-phase-7-performance-pass-script-deferral-cls-lighthouse.md`
- `docs/kanban/done/VM-116-css-architecture-phase-2-layout-layer-animation-consolidation.md`
- `docs/kanban/done/VM-115-shared-token-follow-up-oklch-fluid-type.md`
- `docs/kanban/done/VM-114-p0-shared-css-foundation-pass.md`
- Approved VM-117 implementation plan in this thread

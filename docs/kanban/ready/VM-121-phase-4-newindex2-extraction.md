# VM-121 - Phase 4 newIndex2.html Extraction

ID: VM-121
Title: Phase 4 newIndex2.html Extraction
Status: ready
Type: Frontend / CSS Architecture / JS Extraction
Area: Homepage Preview, Shared Home Assets, Visual Regression QA
Priority: high
Created: 2026-05-24

## Summary

Externalize the inline CSS and JS in `newIndex2.html` into maintained asset files without changing behavior or visual output, and prove the extraction with deterministic before/after screenshots plus the repo's existing smoke coverage.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-24-1453-codex-vm114-p0-shared-css-foundation-pass.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
- `docs/kanban/board.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `package.json`
- `scripts/frontend-smoke.mjs`
- `newIndex2.html`
- `assets/css/home.css`
- `assets/js/home.js`

## Pre-Implementation State

- `newIndex2.html` is about 145 KB and still contains one very large head `<style>` block, two smaller inline `<style>` blocks, and two inline `<script>` blocks.
- `newIndex2.html` already loads `assets/js/graph.js`, `assets/js/reduce-motion.js`, `assets/js/vm-topbar.js`, `assets/css/tokens.css`, `assets/css/fonts.css`, and `assets/css/layout.css`.
- The live `/` route already owns `assets/css/home.css` and `assets/js/home.js`, so extracting `newIndex2.html` directly into those files would couple this refactor to the live homepage immediately.
- `VM-066` intentionally kept `newIndex2.html` self-contained; `VM-114`, `VM-116`, and `VM-117` later identified that inline CSS/JS ownership as the remaining architecture debt.
- The repo currently exposes `npm.cmd run test:frontend-smoke`; there is no `test:smoke` script in `package.json`.
- The repo has smoke and Lighthouse coverage, but it does not have a checked-in pixel-diff screenshot harness yet.
- The repo already contains preview-only asset precedents such as `assets/css/home-preview.css` and `assets/js/home-preview.js`, which suggests route-specific extraction assets are an accepted pattern when shared-file consolidation would be risky.

## Planning Review Recommendation

- Treat VM-121 as a straight extraction and isolation pass first, not a shared asset consolidation pass.
- Land the extracted CSS and JS in dedicated preview-only assets loaded only by `newIndex2.html`, for example `assets/css/newindex2.css` and `assets/js/newindex2.js`, or another explicit preview-only name chosen at implementation time.
- Do not use `assets/css/home.css` or `assets/js/home.js` as the first landing zone unless the extracted rules are already route-scoped and the dedicated-asset approach is proven unnecessary.
- Defer any attempt to merge safe shared subsets into `home.css` or `home.js` to a later follow-up card after parity is proven and route-local ownership is clear.

## Scope

- Create and switch to branch `refactor/newindex-extract` before editing `newIndex2.html` or its extracted assets.
- Capture deterministic "before" screenshots of `newIndex2.html` at fixed viewport sizes from a served local route, not `file://`.
- Extract all inline CSS from `newIndex2.html` into maintained dedicated CSS assets loaded only by `newIndex2.html`.
- Extract all inline JS from `newIndex2.html` into maintained dedicated JS assets loaded only by `newIndex2.html`.
- Preserve the existing inline code behavior as closely as possible during the move; do not combine extraction with selector cleanup, dead-code pruning, or architecture normalization unless parity proof shows it is safe.
- Move the tiny SVG-local `<style>` block and the small spiral-path initializer into the same dedicated asset path as part of the extraction so the document is truly externalized.
- Preserve current load order for `assets/js/graph.js`, extracted page logic, `assets/js/reduce-motion.js`, and `assets/js/vm-topbar.js`.
- Add or adapt deterministic screenshot capture steps so the pass produces before/after evidence under `artifacts/` or another established local output path.
- Re-run repo verification and page-specific chart initialization checks after extraction.

## Acceptance Criteria

- `newIndex2.html` no longer contains inline `<style>` or inline `<script>` blocks, except a minimal boot wrapper only if absolutely required for safe load ordering and documented in the handoff.
- The extracted CSS and JS preserve current behavior, including the hero signal cycle, hold behavior, pointer and background motion, section reveals, back-to-top behavior, topbar behavior, footer behavior, and current CTA or navigation hooks.
- `assets/js/graph.js` still initializes the homepage radar correctly after extraction, with no CDN fallback introduced.
- Deterministic before and after screenshots at fixed viewport sizes match with no intentional visual changes; any unavoidable delta is documented with image evidence and explicit sign-off.
- `npm.cmd run test:frontend-smoke` passes.
- `npm.cmd test` passes.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` passes.
- `index.html` still renders and behaves correctly if shared home assets were touched as part of extraction.
- `newIndex2_Old.html` remains untouched.

## Non-Goals

- Do not redesign `newIndex2.html` or promote it to `/`.
- Do not change copy, route targets, section order, or feature behavior.
- Do not rewrite `assets/js/graph.js`, change Chart.js datasets, or alter radar styling beyond exact extraction parity.
- Do not fold extracted code into shared `/` assets as part of this card unless the implementation proves that doing so carries no extra cross-route risk.
- Do not prune legacy-looking selectors or runtime helpers during the initial extraction pass just because they appear unused; that cleanup can happen later if parity evidence supports it.
- Do not reopen broader Archscry, Maze, Strategium, or legal-page refactors.
- Do not resolve the Lighthouse `NO_FCP` issue in this card unless it blocks the screenshot workflow.
- Do not reconcile stale in-progress cards such as `VM-088` as part of this extraction pass.

## Dependencies / Related Work

- `VM-066 - newIndex2 Self-Contained Wiring`
- `VM-090 - Split Homepage And Basics Experience`
- `VM-114 - P0 Shared CSS Foundation Pass`
- `VM-116 - CSS Architecture Phase 2: Layout Layer + Animation Consolidation`
- `VM-117 - Phase 7 Performance Pass: Script Deferral, CLS Hints, and Lighthouse QA`
- `docs/reference/manual-test-cases.md`

## Files Likely Impacted

- `newIndex2.html`
- Dedicated preview-only CSS asset for `newIndex2.html`
- Dedicated preview-only JS asset for `newIndex2.html`
- Optional screenshot or visual-regression helper under `scripts/`
- `scripts/frontend-smoke.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`

## Risks / Uncertainties

- Shared-file coupling: `/index.html` already consumes `assets/css/home.css` and `assets/js/home.js`, so using those files as the primary extraction landing zone would raise the regression surface immediately.
- Load-order sensitivity: `VM-117` already had to move the `newIndex2.html` chart boot to `DOMContentLoaded` so `graph.js` could stay deferred; extraction must preserve that exact sequencing.
- QA tooling gap: no checked-in pixel-diff harness currently exists, and recent in-app Browser sessions were blocked for local URL visual QA.
- Dirty worktree: unrelated local modifications already exist in docs and route files and must not be normalized or reverted as part of this card.
- Legacy intent unwind: this pass is explicitly reversing the earlier self-contained decision from `VM-066`, so it should be treated as architecture work, not formatting cleanup.
- Mixed selector ownership: the inline CSS currently combines shared-looking selectors, route-local selectors, and likely stale legacy selectors, so the safest first move is a literal extraction into isolated assets rather than selective migration into shared files.

## Recommended Execution Order

1. Create branch `refactor/newindex-extract` and capture a clean baseline:
   - record current `newIndex2.html` smoke status
   - capture deterministic before screenshots at fixed viewport sizes
   - confirm the current Chart.js hero radar renders
2. Create dedicated preview-only CSS and JS asset files and wire them into `newIndex2.html` without changing route behavior or script order.
3. Move the large head `<style>` block into the dedicated CSS file as a mostly literal lift.
4. Move the small SVG-local `<style>` block into the same dedicated CSS file and replace the inline version.
5. Move the small spiral initializer and the main page runtime script into the dedicated JS file, preserving the existing `DOMContentLoaded` bootstrap, chart timing, reveal observers, background motion, and placeholder-link guard.
6. Re-capture screenshots and compare before versus after at the same viewport sizes.
7. Run `npm.cmd run test:frontend-smoke`, `npm.cmd test`, and `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`.
8. Update manual QA docs and Project Atlas only after parity is confirmed.

## Implementation Prompt

Create branch `refactor/newindex-extract`, externalize `newIndex2.html` inline CSS and JS into dedicated preview-only assets, preserve exact rendering and behavior, and prove the result with deterministic before and after screenshots plus the repo's smoke and test suite. Treat the pass as ownership cleanup only: keep feature behavior, route wiring, chart sequencing, and page composition unchanged, and defer shared-file consolidation until after route-local parity is proven.

## Human Review

Yes - this pass changes the largest remaining inline front-door file and should get a human screenshot comparison review before closeout.

## Notes

- The repo script name is `npm.cmd run test:frontend-smoke`, not `test:smoke`.
- If screenshot automation requires a one-off local helper, keep it deterministic, store outputs under a local artifact path, and document the exact command in the handoff.

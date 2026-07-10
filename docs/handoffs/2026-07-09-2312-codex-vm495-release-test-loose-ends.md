# VM-495 Release Test Loose Ends Handoff

## Agent Name

Codex

## Task Requested

Fix the remaining visual, Lighthouse, and live deck-link test loose ends; run every finite test; leave the repository clean; and push the validated result to remote `main`.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- VM-392, VM-450, VM-455, VM-458, and VM-494 handoffs/cards
- `docs/kanban/board.md`
- Home runtime, visual, smoke, and Lighthouse harnesses
- Archscry deck-link runtime, contract tests, SQL evidence, and VM-446 live harness
- Current/baseline/diff captures under ignored `artifacts/visual-regression/`

## Files Changed

- Home/runtime: `index.html`, `assets/js/home.js`
- Archscry security boundary: `assets/js/index.js`, `assets/js/deck-links-tests.js`
- Validation: `scripts/frontend-smoke.mjs`, `scripts/lighthouse-home.mjs`, `scripts/visual-regression-home.mjs`, `research/gate-compression-simulator.mjs`
- Current audit/docs: `docs/audits/lighthouse-home.html`, `docs/qa/visual-baseline-waivers.md`, `docs/architecture/project-atlas.md`, `docs/architecture/route-ownership-matrix.md`, `docs/reference/manual-test-cases.md`
- Governance: VM-495 card, `docs/kanban/board.md`, this handoff, and `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Moved the 208 KB Home Chart.js runtime out of initial HTML parsing and lazy-loaded it after page load/idle readiness.
- Made the Lighthouse local server negotiate gzip for compressible assets, matching production static-host transport more closely without changing score thresholds.
- Corrected the Home color-axis graphic semantics, raising Lighthouse Accessibility from `96` to `100`.
- Tightened Home visual readiness around lazy chart initialization and froze SVG SMIL clocks for deterministic captures.
- Accepted and refreshed reviewed local baselines for Home, Archscry, Strategium, and Apocrypha; all compare suites now report `0` mismatches.
- Added `ACCOUNT_DECK_LINKS_ENABLED = false` and conditionally excluded the Archscry private deck-link tab/panel because VM-446 live RLS proof still lacks credentials.
- Prevented unchanged gate-compression reports from rewriting timestamps, and removed generated Lighthouse trailing whitespace.

## Why It Changed

The prior release sweep had one deterministic contract repair followed by three known loose ends: stale visual baselines, Lighthouse Performance below `90`, and a live Supabase test that could not run without dedicated credentials. The deck-link panel also conflicted with the existing VM-458/VM-470 rule that private saving must not ship before VM-446 live proof.

## Decisions Made

- Treated the user's request to fix the loose ends as owner acceptance of the visually inspected current captures.
- Kept visual baselines as ignored local QA artifacts; no large PNGs were promoted into Git history.
- Kept the live harness strict and credential-gated instead of converting a missing-secret condition into a false pass.
- Disabled only the unproven UI surface; preserved implementation, SQL, contract tests, and live harness for later reactivation.
- Kept VM-495 implementation and governance in separate local commits.

## Risks / Uncertainties

- VM-446 cannot be completed until `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY` are supplied in a secure test environment.
- Visual comparisons remain local because `artifacts/` is ignored and the current CI intentionally excludes large visual baselines.
- GitHub Pages/custom-domain publication still depends on the repository's existing Pages and DNS configuration after `origin/main` updates.

## Tests Run

- Every finite `package.json` lint/validation/test script, including the four visual compare suites, Lighthouse, browser smoke, parser/Maze, placement/bias, source/generated, presentation, deck-link, and full `npm.cmd test` suites: passed.
- All four visual baseline refresh scripts: completed after visual inspection.
- Home visual compare twice after SMIL stabilization: `0` mismatches on mobile, tablet, and desktop both times.
- `npm.cmd run test:lighthouse:home`: Performance `91`, Accessibility `100`, LCP `1.9 s`.
- `npm.cmd run test:gate-compression` twice: passed and left tracked report content unchanged.
- `npm.cmd run test:deck-links:live`: executed; blocked before network access by the five missing required credentials.
- `git diff --check`: passed after generated-output normalization.
- `test:watch` was not run because it is intentionally non-terminating.

## Commit Mapping

- `7598ee4 Stabilize release validation gates` - runtime, test harness, audit, and supporting documentation changes.
- Final VM-495 governance commit - completed card, board state, handoff, and handoff index.

## Not Touched

- No Supabase schema/policy deployment or live data.
- No package upgrades or lockfile regeneration.
- No external Scryfall refresh.
- No visual redesign, placement scoring, lore/card facts, route contracts, force-push, or upstream setup.

## Follow-Up Recommendations

- Run VM-446 only in a secure environment with dedicated owner/non-owner users and the service-role key before reactivating private deck-link UI.
- Make visual artifacts a remote CI gate only after a separate storage/repository-size decision.
- Verify GitHub Pages and `voxmana.io` deployment status after the main push if publication does not update automatically.

## Next Suggested Agent

GitHub Pages deployment verifier, or Supabase security verifier when VM-446 credentials are available.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-495-release-test-loose-ends.md`
- `docs/qa/visual-baseline-waivers.md`
- `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/handoffs/2026-07-09-2203-codex-vm494-dirty-tree-recovery-main-promotion.md`

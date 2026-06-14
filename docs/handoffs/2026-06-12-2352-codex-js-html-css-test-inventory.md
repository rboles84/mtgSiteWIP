# 2026-06-12 23:52 - Codex - VM-366 JS HTML CSS Test Inventory

## Agent Name

Codex

## Task Requested

Answer what kind of unit tests exist for JavaScript, HTML, and CSS files, what they cover, and whether more are needed.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-2347-codex-vm365-full-test-html-report.md`
- `docs/handoffs/2026-06-04-1212-codex-vm287-full-automated-test-sweep.md`
- `docs/handoffs/2026-06-04-0824-codex-vm285-placement-harness-aggregation-contract-repair.md`
- `docs/handoffs/2026-05-17-1655-codex-vm033-presentation-snapshot-harness.md`
- `docs/handoffs/2026-05-17-0121-codex-plain-reading-operator-hand-translation-tests.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-365-full-test-sweep-html-report.md`
- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`
- `package.json`
- `research/run-tests.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/quick-reading-bias.js`
- `research/scryfall-parser-tests.js`
- `research/research-builder-tests.js`
- `research/maze-query-contract-tests.js`
- `research/research-syntax-language-tests.js`
- `research/research-mode-tests.js`
- `research/maze-search-tests.js`
- `research/scryfall-request-dedupe-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `research/precon-artifact-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-tests.js`
- `research/faction-context-isolation-tests.js`
- `scripts/validate-frontend-html.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-home.mjs`
- Visual regression script inventory for Home, Archscry, Strategium, and Apocrypha.

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-366-js-html-css-test-inventory.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-2352-codex-js-html-css-test-inventory.md`

## What Changed

- Added a completed VM-366 Kanban card for the test inventory.
- Added this handoff.
- Updated the handoff index with the VM-366 audit entry.
- No runtime source code, generated data, test harness code, or CSS/HTML assets were changed.

## Why It Changed

The user asked for an audit-style answer about existing unit tests and whether more are needed. The repo workflow requires pre-flight review, Kanban tracking, validation, documentation, and a handoff for non-trivial testing/documentation work.

## Preflight Summary

Recent related work:

- VM-365 is an in-progress full test sweep and HTML report.
- VM-287 previously ran a broad automated sweep and classified `npm test`, parser, lint, visual, dossier audit, and Lighthouse results.
- VM-285 repaired and aggregated placement harness reporting.
- VM-033 established deterministic presentation snapshot coverage.
- VM-012 expanded Scryfall parser and Plain Reading / Operator's Hand tests.

Current known risks:

- VM-365 is still in progress, so this audit should not be treated as replacing the full sweep report.
- Lighthouse has prior instability and was not rerun for this focused inventory.
- Visual regression scripts can write artifacts, so this audit did not run the visual suite.
- The worktree already had board/index/VM-364/VM-365 changes before this inventory.

Relevant decisions already made:

- Do not refresh Scryfall/network data for test audits.
- Do not hand-edit generated artifacts.
- Treat visual and Lighthouse harnesses separately from unit tests.
- Preserve source/generated boundaries.

Files recently changed:

- Pre-existing git status showed `docs/handoffs/HANDOFF_INDEX.md`, `docs/kanban/board.md`, VM-364 movement, VM-365 handoff/card, and an Archscry Identity Matrix data-map doc already dirty before VM-366 edits.

What should not be touched:

- VM-364 implementation/documentation scope.
- VM-365 full-sweep execution/report scope.
- Runtime JS/HTML/CSS, source JSON, generated JSON, visual baselines, Scryfall refresh artifacts, and Lighthouse outputs.

## Decisions Made

- Classified the repo as having no formal Jest/Vitest/Mocha-style unit test framework.
- Classified `research/run-tests.js` and the `node:assert/strict` scripts it imports as the current unit-like JS regression surface.
- Classified HTML coverage as static validation plus smoke checks.
- Classified CSS coverage as indirect visual regression and source-contract assertions, not direct CSS unit tests.
- Recommended targeted future JS unit tests and browser/a11y checks instead of broad CSS/HTML unit testing.

## Risks / Uncertainties

- Some tests are very broad contract scripts rather than small isolated units, especially `assets/js/quick-reading-tests.js` and `research/archscry-dossier-followup-tests.js`.
- Static HTML validation is string/regex based, not a real HTML parser or accessibility engine.
- CSS regressions depend heavily on visual compare scripts and baseline freshness.

## Tests Run

- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.

## Not Touched

- Runtime JS/HTML/CSS.
- Test harness implementation.
- Source JSON.
- Generated JSON.
- Visual baselines and visual current/diff artifacts.
- Scryfall download/index/inspect flows.
- VM-364 and VM-365 work beyond adding this independent VM-366 entry.

## Follow-Up Recommendations

- Add focused unit tests when changing pure JS logic in placement, parser, Maze query, presentation, or dossier helper functions.
- Prefer browser interaction tests for Archscry/Maze workflows that depend on DOM state.
- Prefer accessibility and visual regression checks over direct CSS unit tests for layout and semantics.
- Keep VM-365 as the canonical full-sweep/report task when it is completed.

## Next Suggested Agent

Test Strategist if the team wants a formal test-expansion plan; Codex main agent for focused test additions alongside future implementation work.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-366-js-html-css-test-inventory.md`
- `docs/kanban/in-progress/VM-365-full-test-sweep-html-report.md`
- `docs/kanban/done/VM-287-full-automated-test-sweep.md`
- `docs/kanban/done/VM-285-placement-harness-aggregation-and-contract-drift-repair.md`
- `docs/kanban/done/VM-033-non-ui-presentation-snapshot-harness.md`
- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`

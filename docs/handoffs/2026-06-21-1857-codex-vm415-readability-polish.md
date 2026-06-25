# Codex Handoff - VM-415 Contained Cross-Route Readability Polish

## Agent Name

Codex

## Task Requested

Implement the contained cross-route readability polish requested as VM-413 for Home, Maze, Apocrypha, and Strategium: clearer body copy, cream/parchment headings, stronger text contrast over art, modest Home hero breathing room, CSS-first background differentiation, and unobtrusive nav orientation hints.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-19-1500-claude-vm413-fraunces-spectral-type-system.md`
- `docs/handoffs/2026-06-19-2339-codex-vm413-typography-implementation.md`
- `docs/handoffs/2026-06-20-2131-codex-vm414-apocrypha-visual-alignment.md`
- `docs/kanban/done/VM-413-fraunces-spectral-type-system-unification.md`
- `docs/kanban/done/VM-414-apocrypha-public-route-visual-alignment.md`
- Route HTML/CSS for Home, Archscry, Maze, Apocrypha, Strategium, shared topbar, and manual QA docs.

## Files Changed

- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `strategium/index.html`
- `assets/css/home.css`
- `assets/css/maze.css`
- `assets/css/apocrypha.css`
- `assets/css/strategium.css`
- `assets/css/topbar.css`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-415-contained-cross-route-readability-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-21-1857-codex-vm415-readability-polish.md`

## What Changed

- Used VM-415 for this pass because VM-413 already exists and is complete.
- Created and closed the VM-415 Kanban card.
- Reduced Home hero title scale, removed negative title tracking, corrected the oversized hero-grid gap, and scoped old Home nav CSS away from the shared topbar so mobile Home hides the desktop nav correctly.
- Kept Home, Maze, and Strategium body text on `var(--font-text)` and left display/mono treatments for headings, labels, and nav.
- Shifted Home, Maze, Strategium, and Apocrypha heading/readability treatments toward existing cream/parchment tokens without adding new color tokens.
- Lifted muted text contrast and strengthened text-bearing scrim zones on Maze, Apocrypha, and Strategium.
- Applied CSS-first route background differentiation using existing background assets for Maze, Apocrypha, and Strategium.
- Added shared nav `data-nav-hint` metadata, hidden hint spans, and CSS-only hover/focus hints without nav JS, visible label renames, href changes, or persistent popovers.
- Added VM-415 manual QA coverage.

## Why It Changed

The review identified readable body copy, heading color consistency, text-over-image contrast, Home hero crowding, repeated background feel, and first-time nav orientation as the highest-value polish targets. The implementation keeps the existing visual language and route contracts intact while tightening those readability issues.

## Decisions Made

- Treated the requested VM-413 brief as VM-415 because VM-413 and VM-414 already existed in the board and handoff trail.
- Left Apocrypha typography alone apart from contrast/readability values.
- Kept nav accessible names as the visible labels; hint spans are `aria-hidden` and visual-only.
- Ran visual compares only; no baseline refresh.
- Left pre-existing generated audit whitespace and unrelated dirty work untouched.

## Risks / Uncertainties

- The worktree was already dirty before VM-415, including VM-413/VM-414 files and generated/audit outputs.
- Full `git diff --check` still fails on pre-existing trailing whitespace in `docs/audits/lighthouse-home.html`.
- Home and Apocrypha visual baselines are now expected stale after readability/background/topbar polish; owner should inspect diff artifacts before any future baseline acceptance.
- `npm.cmd test` rewrote the existing gate-compression audit output as part of normal test behavior; left unstaged and reported as generated test output.

## Tests Run

- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed.
- `npm.cmd run test:parser` - passed.
- `git diff --check` - failed only on pre-existing generated `docs/audits/lighthouse-home.html` trailing whitespace.
- Scoped `git diff --check -- <VM-415 files>` - passed.
- `npm.cmd run test:visual:home` - expected stale-baseline diffs: mobile `295074`, tablet `476575`, desktop `182135`.
- `npm.cmd run test:visual:apocrypha` - expected stale-baseline diffs: hero desktop `15853`, hero mobile `696`, references desktop `201503`.
- `npm.cmd run test:visual:strategium` - passed with `0` mismatched pixels.
- `npm.cmd run test:visual:archscry` - passed with `0` mismatched pixels.
- Browser QA with local Edge/Puppeteer - passed for desktop/tablet/mobile overflow, Home hero fit, desktop nav hint hover/focus reveal, and hidden mobile-menu hint spans.

## Not Touched

- Placement/source/generated data.
- Lore or Commander facts.
- Maze parser/search/stash contracts.
- Archscry radar JS.
- Route aliases.
- Visual baseline artifacts.
- Commits or pushes.

## Follow-Up Recommendations

- Owner should inspect Home and Apocrypha diff PNGs and decide later whether to accept the new readability visuals.
- If accepted, refresh baselines under a separate explicit baseline card.
- Consider a future cleanup card for generated audit whitespace and the already-dirty generated outputs, separate from readability polish.

## Next Suggested Agent

Owner visual QA or Codex baseline-acceptance agent only after explicit approval to refresh visual baselines.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-415-contained-cross-route-readability-polish.md`
- `docs/kanban/done/VM-413-fraunces-spectral-type-system-unification.md`
- `docs/kanban/done/VM-414-apocrypha-public-route-visual-alignment.md`
- `docs/reference/manual-test-cases.md`

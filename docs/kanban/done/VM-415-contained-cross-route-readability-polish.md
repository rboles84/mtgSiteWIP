# VM-415 - Contained Cross-Route Readability Polish

## Status

Done

## Summary

Implemented the contained cross-route readability polish originally requested as VM-413, using VM-415 because VM-413 already exists as the completed Fraunces + Spectral type-system card.

## What Changed

- Reduced Home hero title scale, removed negative hero title tracking, corrected the oversized hero-grid gap, and scoped old Home nav CSS away from the shared topbar.
- Kept Home, Maze, and Strategium body copy on `var(--font-text)` while preserving display/mono treatments for headings, labels, and nav.
- Standardized Home/Maze/Strategium/Apocrypha visible heading treatment toward the existing cream/parchment tokens without adding a new color token.
- Lifted muted text contrast and strengthened text-bearing scrim zones for Maze, Apocrypha, and Strategium.
- Added CSS-first route background differentiation for Maze, Apocrypha, and Strategium using existing assets.
- Added shared nav `data-nav-hint` metadata plus hidden hint spans and CSS-only hover/focus affordance; no nav JS, visible label rename, href change, or persistent popover was added.
- Added VM-415 manual QA coverage to `docs/reference/manual-test-cases.md`.

## Verification

- `npm.cmd run lint:html` passed.
- `npm.cmd run lint:js` passed.
- `npm.cmd run test:frontend-smoke` passed.
- `npm.cmd test` passed.
- `npm.cmd run test:parser` passed.
- Scoped `git diff --check` for VM-415 files passed.
- Full `git diff --check` still fails on pre-existing trailing whitespace in generated `docs/audits/lighthouse-home.html`; not touched under VM-415.
- Browser QA passed for desktop/tablet/mobile route overflow, Home hero fit, nav hint hover/focus reveal, and hidden mobile-menu hint spans.

## Visual Compare Classification

- `npm.cmd run test:visual:home` failed expected stale-baseline diffs: mobile `295074`, tablet `476575`, desktop `182135` mismatched pixels after Home hero/topbar readability changes.
- `npm.cmd run test:visual:apocrypha` failed expected stale-baseline diffs: hero desktop `15853`, hero mobile `696`, references desktop `201503` mismatched pixels after scrim/background readability changes.
- `npm.cmd run test:visual:strategium` passed with `0` mismatched pixels across all captures.
- `npm.cmd run test:visual:archscry` passed with `0` mismatched pixels across all captures; run because shared topbar metadata/CSS changed.
- No visual baselines were refreshed.

## Not Touched

- Placement/source/generated data.
- Lore or Commander facts.
- Maze parser/search/stash contracts.
- Archscry radar JS.
- Route aliases.
- Visual baselines.
- Commits or pushes.

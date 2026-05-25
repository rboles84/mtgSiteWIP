# Agent Handoff

## Agent name

Codex

## Task requested

Review and plan `VM-121` in more detail without implementing the extraction, and tighten the card based on the current `newIndex2.html` structure and repo asset layout.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-121-phase-4-newindex2-extraction.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `package.json`
- `package-lock.json`
- `scripts/frontend-smoke.mjs`
- `scripts/lighthouse-newindex2.mjs`
- `newIndex2.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/css/home-preview.css`
- `assets/js/home-preview.js`

## Files changed

- `docs/kanban/ready/VM-121-phase-4-newindex2-extraction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2137-codex-vm121-planning-review.md`

## What changed

- Re-reviewed `VM-121` against the live `newIndex2.html` structure instead of relying only on the high-level idea.
- Updated the ready card to recommend dedicated preview-only extraction assets rather than defaulting to shared `assets/css/home.css` and `assets/js/home.js`.
- Added a concrete execution order to the card covering branch creation, baseline screenshots, literal CSS extraction, SVG-local style extraction, JS extraction, screenshot comparison, and repo verification.
- Added the repo-level precedent that preview-only assets already exist (`home-preview.css` and `home-preview.js`), which supports isolated extraction as a first move.
- Documented the mixed-selector and shared-file-coupling risks more explicitly in the card.

## Why it changed

- A closer review showed that `newIndex2.html` mixes generic selectors such as `.vm-button`, `.vm-shell`, and shared-looking structural rules with route-local behavior and likely legacy carryover.
- Pushing that code directly into the live `/` asset pair would enlarge the regression surface immediately and make VM-121 harder to review honestly as an extraction-only pass.
- The repo already has a preview-only asset pattern, so dedicated extracted assets are both safer and consistent with prior work.

## Decisions made

- Recommended dedicated preview-only CSS and JS assets as the initial extraction landing zone.
- Kept shared-file consolidation explicitly out of scope for the first VM-121 implementation pass.
- Recommended a mostly literal lift of the inline CSS and JS before any cleanup or dead-rule pruning.
- Kept the existing branch requirement and screenshot parity requirement unchanged.
- Noted that the existing Chrome-launcher and `puppeteer-core` footprint from the Lighthouse setup is likely reusable for screenshot capture, so VM-121 should not need an entirely new browser stack.

## Risks / uncertainties

- The exact extracted filenames are still flexible; the card now defines the pattern rather than one final filename.
- The current `newIndex2.html` inline CSS appears to include some stale or superseded rules, but this review intentionally did not try to prove which ones are safe to delete.
- The dirty worktree still contains unrelated route and docs edits that a later implementation pass must avoid touching.

## Tests run

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- `newIndex2.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/css/home-preview.css`
- `assets/js/home-preview.js`
- Runtime route behavior
- `newIndex2_Old.html`
- Existing unrelated dirty worktree changes outside the planning docs

## Follow-up recommendations

- Implement VM-121 as an isolated asset extraction pass first.
- Reuse the local served-page browser pattern from `scripts/lighthouse-newindex2.mjs` when building screenshot capture.
- Consider a later follow-up card for selective shared CSS or JS consolidation only after extracted `newIndex2` assets are stable and parity is proven.

## Next suggested agent

Planning Architect or frontend refactor agent

## Related Kanban card, docs, or plans

- `docs/kanban/ready/VM-121-phase-4-newindex2-extraction.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
- `scripts/lighthouse-newindex2.mjs`

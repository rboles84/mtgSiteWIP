# Handoff - VM-099 Basics Page Field Guide Cleanup

Agent name: Codex

Task requested: Implement the approved VM-099 plan by turning `/basics/index.html` into a compact field-guide / learning-console experience while preserving the existing Basics tabs, Color Matrix, radar, route links, and local chart runtime, then complete the required Kanban and handoff documentation.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-090-split-homepage-and-basics-experience.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/done/VM-097-homepage-radar-presentation-lift-from-archscry.md`
- `docs/handoffs/templates/agent-handoff-template.md`
- `basics/index.html`
- `package.json`

## Files changed

- `basics/index.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-099-basics-page-field-guide-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-0051-codex-vm099-basics-field-guide-cleanup.md`

Ignored QA artifacts were also written for visual review only:

- `artifacts/vm099-basics-desktop-viewport.png`
- `artifacts/vm099-basics-mobile-viewport.png`

## What changed

- Reworked the Basics hero into a smaller field-guide entry panel with the required eyebrow/title/copy and a three-pill status strip.
- Added a new `Start Here` field-guide panel with a short Magic primer plus a right-side `Read the basics -> open the Color Matrix -> start Archscry` usage rail.
- Rebuilt the Basics topic selector as a compact card grid while preserving `.vm-tab`, `data-topic`, and the current `basicsReveal` behavior.
- Rewrote the `const basics = {}` educational copy for clarity without changing the tab-switching logic or the Color Pie reveal button behavior.
- Tightened the Color Matrix heading/note copy and surrounding spacing while leaving `colorMatrixWrap`, `vmRadar`, `identityGrid`, `lensTabs`, `guildSubtabs`, `componentToggle`, and `compositeToggle` intact.
- Added a `Color Philosophy Bridge` section that links mono-color philosophy to deck behavior, lore framing, and Commander identity.
- Tightened the final CTA so it reads as the next action after learning rather than a second hero.
- Added page-scoped responsive CSS for the new guide/bridge/card layout and fixed the mobile nav wrap on `/basics/` so the page no longer shows a horizontal scrollbar at small widths.
- Created the VM-099 Kanban trail, then moved the card from `ready` to `done` after verification.

## Why it changed

The Basics route already held the correct tooling, but it still read more like a loose follow-on homepage than a focused learning surface. VM-099 compresses the presentation into a clearer field guide so new readers can understand the color system faster before stepping into the deeper Commander identity tools.

## Decisions made

- Kept the runtime scope limited to `basics/index.html`; no shared CSS/JS or other routes were modified.
- Reused existing page-local utility classes (`vm-status-strip`, `vm-two-col`, `vm-start-grid`, `vm-philosophy-grid`, `vm-panel`) before adding new page-local selectors.
- Left the commented-out hero CTA block removed from the live experience; the hero remains copy-only.
- Preserved the existing Color Matrix selector, radar, and identity data semantics exactly as-is.
- Treated the mobile nav overflow as part of the page-scoped responsive cleanup because the browser smoke showed it under the new field-guide layout.

## Risks / uncertainties

- `basics/index.html` still carries a large inline CSS/JS payload and some pre-existing smart-quote / encoding oddities in untouched comments and strings; this pass did not normalize those.
- The branch still contains unrelated dirty files (`apocrypha/index.html`, `archscry/index.html`, `newIndex2.html`, `privacy/index.html`, `terms/index.html`, and research notes). They were intentionally not reconciled here.
- The ignored screenshot artifacts are helpful for review but should stay out of any curated commit unless explicitly wanted.

## Tests / checks run

- Static ID uniqueness check for `basicsReveal`, `colorMatrixWrap`, `vmRadar`, `identityGrid`, `lensTabs`, `guildSubtabs`, `componentToggle`, and `compositeToggle`.
- Static asset check confirming `../assets/js/graph.js` remains referenced and no Chart.js CDN was added.
- Extracted the inline script to `%TEMP%\\vm099-basics-inline-check.js` and ran `node --check` on it.
- Route checks returned `200` for:
  - `http://127.0.0.1:8000/basics/`
  - `http://127.0.0.1:8000/newIndex2.html`
  - `http://127.0.0.1:8000/archscry/`
  - `http://127.0.0.1:8000/maze/`
  - `http://127.0.0.1:8000/apocrypha/`
- Browser smoke on `http://127.0.0.1:8000/basics/` confirmed:
  - compact hero, Start Here rail, and Color Philosophy Bridge render
  - tab cards update `basicsReveal`
  - `Show the five colors` opens the Color Matrix and flips to `Hide the five colors`
  - Guilds -> Allied -> Rakdos updates the selected identity and dataset pills
  - component-off leaves only `Rakdos`
  - synthesis-off leaves `Black` and `Red`
  - mobile viewport `390x844` stacks the guide/CTA sections and wraps nav links without overflow
  - no console warnings or errors
- `npm.cmd test`

## Not touched

- `/archscry/`
- `/maze/`
- `/apocrypha/`
- `newIndex2.html`
- root `index.html`
- `newIndex.html`
- shared CSS / JS assets
- Color Matrix identity data semantics
- unrelated dirty worktree files outside the VM-099 coordination/docs updates

## Follow-up recommendations

- If the Basics route keeps evolving, consider a later cleanup pass that extracts repeated page-local patterns without changing shared behavior across other routes.
- Do a human-eye copy pass later if the team wants to normalize punctuation/encoding across the older inline comments and strings in `basics/index.html`.
- If mobile nav wrapping should match across the whole site, apply the same wrap behavior intentionally route-by-route or via a future shared-shell cleanup card.

## Next suggested agent

- Front-End QA / Documentation Steward

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-099-basics-page-field-guide-cleanup.md`
- `docs/kanban/done/VM-090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`

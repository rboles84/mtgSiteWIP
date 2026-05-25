# Agent Handoff

## Agent name

Codex

## Task requested

Use the required AGENTS pre-flight workflow, plan the proposed Phase 4 `newIndex2.html` extraction work, create the appropriate Kanban card, and do not implement runtime changes yet.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
- `docs/handoffs/2026-05-24-1751-codex-vm119-semantic-html-aria-audit-card.md`
- `docs/handoffs/2026-05-24-1936-codex-vm120-container-queries-subgrid.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/done/VM-066-newindex2-self-contained-wiring.md`
- `docs/kanban/done/VM-116-css-architecture-phase-2-layout-layer-animation-consolidation.md`
- `docs/kanban/done/VM-119-semantic-html-aria-audit.md`
- `docs/kanban/done/VM-120-phase-6-container-queries-subgrid.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `package.json`
- `scripts/frontend-smoke.mjs`
- `newIndex2.html`
- `assets/css/home.css`
- `assets/js/home.js`

## Files changed

- `docs/kanban/board.md`
- `docs/kanban/ready/VM-121-phase-4-newindex2-extraction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2023-codex-vm121-newindex2-extraction-card.md`

## What changed

- Completed the required pre-flight review before planning.
- Created the ready card `docs/kanban/ready/VM-121-phase-4-newindex2-extraction.md`.
- Updated the Kanban board so `VM-121` appears under `Ready`.
- Recorded the planning-only handoff and linked it from the handoff index.
- Captured repo-specific execution constraints in the card, including the branch requirement, the actual smoke script name, and the current lack of a checked-in pixel-diff harness.

## Why it changed

- The user asked for planning and the right Kanban card, not implementation.
- Recent CSS architecture and performance work repeatedly identified `newIndex2.html` inline CSS and JS as the remaining shared-front-end debt, so the next step needed a concrete execution card rather than another loose note.
- The card needed to reflect current repo reality, especially that `assets/css/home.css` and `assets/js/home.js` already power `/`, and that the requested smoke script name does not match the actual npm script in `package.json`.

## Decisions made

- Treated this as a `Ready` card, not backlog, because the scope, risks, branch rule, and verification bar are specific enough to execute later.
- Kept the implementation branch creation as future work inside the card instead of creating the branch now, because no runtime implementation was requested.
- Preserved the user's extraction direction, but encoded a safety valve: if folding everything directly into `home.css` creates ownership or regression risk for `/index.html`, the implementation pass may split extracted CSS into dedicated home-route partials.
- Required deterministic before and after screenshots in the card because the user asked for visual regression proof and the repo does not currently ship a committed pixel-diff harness.
- Standardized verification in the card around `npm.cmd run test:frontend-smoke`, `npm.cmd test`, `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`, and explicit Chart.js radar initialization verification.

## Risks / uncertainties

- The future implementation pass will need either a small screenshot helper or a clearly documented manual screenshot workflow because no checked-in pixel-diff harness exists today.
- Extraction into `assets/css/home.css` and `assets/js/home.js` can regress the live `/` route because those files already back the current root homepage.
- The worktree already contains unrelated local modifications in docs and route files, so the later implementation pass will need to stay narrowly scoped.

## Tests run

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- `newIndex2.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `newIndex2_Old.html`
- Runtime HTML, CSS, and JS behavior on any route
- Lore/data JSON and generated artifacts
- Existing unrelated dirty worktree changes outside the planning docs

## Follow-up recommendations

- Execute `VM-121` on its own branch, `refactor/newindex-extract`, before touching `newIndex2.html`.
- Decide the screenshot workflow at the start of implementation so the before state is captured before any extraction edits land.
- Keep the implementation pass extraction-only; defer redesign, promotion to `/`, and unrelated route cleanup.

## Next suggested agent

Planning Architect or implementation-focused frontend refactor agent

## Related Kanban card, docs, or plans

- `docs/kanban/ready/VM-121-phase-4-newindex2-extraction.md`
- `docs/kanban/done/VM-066-newindex2-self-contained-wiring.md`
- `docs/kanban/done/VM-116-css-architecture-phase-2-layout-layer-animation-consolidation.md`
- `docs/kanban/done/VM-117-phase-7-performance-pass-script-deferral-cls-lighthouse.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`

Agent name: Codex

Task requested:
Implement the agreed Vox Mana frontend hardening and low-risk modernization plan for the active Maze and Archscry runtime surfaces, preserving the existing visual identity while applying Phase 1 security, accessibility, and route-safety improvements first.

Files reviewed:
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/kanban/done/VM-005-archscry-maze-ux-continuity-link-reliability.md`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- `docs/reference/manual-test-cases.md`
- `maze/index.html`
- `research/research-init.js`
- `research/research-ui.js`
- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/archscry-index2.js`
- `assets/js/maze-handoff.js`
- `library/index.html`
- `package.json`

Files changed:
- `maze/index.html`
- `research/research-init.js`
- `research/research-ui.js`
- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/archscry-index2.js`
- `library/index.html`
- `package.json`
- `scripts/lint-frontend-js.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `research/maze-search-tests.js`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-106-frontend-hardening-phase-1-security-accessibility.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-2146-codex-vm106-frontend-hardening-phase-1-security-accessibility.md`

What changed:
- Removed inline event attributes from Maze and Archscry static shells and replaced them with delegated `data-action` hooks.
- Replaced unsafe Maze DOM rendering paths for user-entered or API-driven content with safe node creation, including keyword suggestions, active chips, recent searches, result cards, stash rows, no-results card art, and modal content.
- Added Maze modal accessibility behavior: semantic dialog wrapper, opener tracking, Escape close, focus trap, and focus return.
- Converted Archscry runtime action emission from inline `onclick` strings to delegated action attributes in generated result and quick-reading templates.
- Replaced Archscry avatar `innerHTML` and initialization error rendering with safe DOM/text rendering.
- Hardened the `/library/` alias to use relative-safe redirect/assets paths while keeping `/apocrypha/` canonical.
- Added visible `:focus-visible` treatment and reduced-motion refinements for touched Maze and Archscry controls.
- Added lightweight local validation scripts and wired them into `package.json`.
- Updated tests that previously asserted inline handlers so they now assert delegated action hooks instead.

Why it changed:
- The branch targeted the highest-risk issues first: DOM XSS exposure, unsafe third-party rendering, incomplete modal semantics, and broken maintainability patterns around inline handlers.
- Delegated action hooks let the existing pages keep their composition and native HTML/JS structure while removing unsafe runtime patterns.
- The added local checks make the hardening work easier to re-verify without introducing broad formatter/linter churn.

Decisions made:
- Kept the existing Maze overlay modal and improved it instead of migrating to native `<dialog>`.
- Scoped the sweep to active runtime Maze and Archscry surfaces only; unrelated pages were not refactored just because similar patterns exist.
- Left trusted local-data dossier layout templating in place unless an inline handler or untrusted injection path was directly involved.
- Deferred Supabase CDN pinning and risky script-order changes to a later pass.
- Validated route behavior through a local HTTP server because the in-app browser blocks direct `file://` navigation.

Risks / uncertainties:
- Save/sign-out flows were not manually exercised because no authenticated test session was available.
- Pure `file://` Archscry reading flow still depends on served `/data/...` fetches and remains outside this branch's scope.
- `newIndex2.html` already had unrelated local modifications in the worktree and was intentionally not touched.

Tests run:
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser checks via local server at `http://127.0.0.1:4173/`:
  - home route loaded with working nav
  - Maze route loaded, searched, opened modal, closed on Escape, and returned focus to opener
  - Archscry quick-reading start action rendered the first question
  - Privacy and Terms loaded
  - `/library/` redirected to `/apocrypha/`

Not touched:
- `newIndex2.html`
- placement model logic and canonical JSON data
- `shared.js`
- legal-page copy
- VM-014 shell cleanup / redesign work

Follow-up recommendations:
- Run authenticated browser QA for save, restore, retake, and sign-out flows when a test account is available.
- Decide whether full direct-`file://` Archscry dossier support still matters, since current data loading assumes a served `/data/` root.
- Consider a later focused pass to reduce the remaining trusted-template `innerHTML` use in Archscry if the team wants stricter rendering consistency.
- If this branch is split further, VM-006 and VM-014 are the most natural follow-up cards for repeat-visit polish and broader shell cleanup.

Next suggested agent:
Test Strategist or Frontend QA agent for authenticated browser regression coverage.

Related Kanban card, docs, or plans:
- `docs/kanban/done/VM-106-frontend-hardening-phase-1-security-accessibility.md`
- `docs/reference/manual-test-cases.md`
- User-approved Vox Mana frontend hardening / low-risk modernization plan in this Codex thread

# Agent Handoff

Agent name: Codex

Task requested: Implement VM-112B by renaming the live `Basics` route to `Strategium`, moving `basics/` to `strategium/`, updating all active links and route-facing labels, preserving no `/basics/` compatibility shell, and closing the Kanban/docs trail.

Files reviewed:
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1333-codex-vm112a-floating-topbar-redesign.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-112A-floating-topbar-redesign.md`
- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `basics/index.html` before the move
- `assets/js/vm-topbar.js`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`

Files changed:
- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `strategium/index.html`
- `assets/js/vm-topbar.js`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-112B-strategium-rename.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`

What changed:
- Moved the live route folder from `basics/` to `strategium/`.
- Replaced the active shared-nav route label and route target from `Basics` / `/basics/` to `Strategium` / `/strategium/` across the homepage, index gateway, Archscry, Maze, Apocrypha, Privacy, Terms, and the moved page itself.
- Updated the homepage Strategium destination card and footer links to point to the renamed route.
- Renamed the moved page's route-facing identity state, headings, and footer route labels to `Strategium`.
- Updated active route/docs references in `docs/reference/manual-test-cases.md` and `docs/architecture/project-atlas.md`.
- Closed the VM-112B Kanban card and added this handoff entry.

Why it changed:
- VM-112A established the shared floating topbar as the stable baseline.
- VM-112B completes the approved product-language shift so the teaching route is now consistently presented as `Strategium` everywhere in the live experience.
- The route move removes stale live `/basics/` paths instead of preserving a compatibility alias, matching the approved plan.

Decisions made:
- Preserved historical done cards and archived handoffs that mention `Basics` for traceability.
- Limited the rename to live route-facing labels, active docs, and route wiring rather than deep internal educational variable names.
- Kept the Strategium page's core teaching tools and structure intact; this was treated as a route and naming move, not a content redesign.
- Hardened the shared topbar mobile-menu focus timing path during verification, but left the overall shared topbar contract unchanged.

Risks / uncertainties:
- The in-app browser allows localhost smoke but blocks direct `file://` navigation, so the requested local-file route checks were verified through live href/path inspection plus localhost click-through rather than a direct file URL browser run.
- Browser focus introspection in the in-app environment remained conservative during the mobile menu smoke, so a manual browser pass is still the best way to visually confirm the focus-transfer feel after opening the menu.

Tests run:
- `node --check assets/js/vm-topbar.js`
- `node --check assets/js/reduce-motion.js`
- `npm.cmd test`
- `git diff --check`
- Localhost browser smoke at `http://127.0.0.1:4173/newIndex2.html`
- Verified Strategium nav/card/footer clicks resolved to `http://127.0.0.1:4173/strategium/`
- Verified mobile menu mirror contained the Strategium route and closed on `Escape` and outside click
- Verified `strategium/index.html` exists and `basics/index.html` no longer exists
- Verified active runtime files and living route docs no longer target `/basics/`

Not touched:
- Historical done cards under `docs/kanban/done/`
- Archived handoffs under `docs/handoffs/`
- Maze search/runtime logic
- Archscry scoring/runtime behavior
- Legal/body copy outside route/header wiring

Follow-up recommendations:
- Run one manual browser pass outside the in-app `file://` restriction to confirm the local-file Strategium links feel correct end-to-end in a normal browser.
- If the team wants stricter accessibility guarantees, do a dedicated keyboard/focus audit of the shared topbar in Chrome/Edge devtools with real tab traversal.

Next suggested agent:
- Test Strategist

Related Kanban card, docs, or plans:
- `docs/kanban/done/VM-112A-floating-topbar-redesign.md`
- `docs/kanban/done/VM-112B-strategium-rename.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`

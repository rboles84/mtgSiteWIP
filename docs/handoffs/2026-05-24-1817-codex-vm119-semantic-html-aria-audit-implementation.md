# 2026-05-24 18:17 - Codex - VM-119 Semantic HTML + ARIA Audit Implementation

## Agent Name

Codex

## Task Requested

Implement VM-119 after the ready-card planning pass: normalize semantic landmarks, section labels, shared navigation ARIA, Maze modal inert behavior, validators, manual QA docs, Kanban state, and handoff trail.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1751-codex-vm119-semantic-html-aria-audit-card.md`
- `docs/handoffs/2026-05-24-1744-codex-vm118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/handoffs/2026-05-24-1715-codex-vm117-performance-pass.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/handoffs/2026-05-24-1333-codex-vm112a-floating-topbar-redesign.md`
- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-119-semantic-html-aria-audit.md`
- `docs/kanban/done/VM-117-phase-7-performance-pass-script-deferral-cls-lighthouse.md`
- `docs/kanban/done/VM-118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/reference/manual-test-cases.md`
- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `strategium/index.html`
- `assets/js/vm-topbar.js`
- `research/research-init.js`
- `assets/css/topbar.css`
- `assets/css/components.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`

## Files Changed

- `newIndex2.html`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `strategium/index.html`
- `assets/js/vm-topbar.js`
- `research/research-init.js`
- `assets/css/topbar.css`
- `assets/css/components.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-119-semantic-html-aria-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1817-codex-vm119-semantic-html-aria-audit-implementation.md`

## What Changed

- Added or normalized one top-level `header`, one `main`, and one `footer` landmark across the in-scope live public routes.
- Added `aria-labelledby` to major sections on all touched public routes, with visible heading IDs wherever possible and visually hidden headings where a non-copy-changing accessible name was needed.
- Changed shared topbar nav labels from `Primary` to `Main Navigation`.
- Removed shared mobile navigation `role="menu"` and `role="menuitem"` usage so the mobile panel remains plain site navigation.
- Preserved `aria-expanded` behavior in `assets/js/vm-topbar.js`.
- Added explicit Maze modal inert toggling for `[data-maze-modal-background]` targets in `research/research-init.js`.
- Marked Maze topbar, page shell, and footer as modal background regions while keeping the modal outside the inerted content.
- Added visible focus-visible treatment for touched shared controls in `assets/css/topbar.css` and `assets/css/components.css`.
- Updated `scripts/validate-frontend-html.mjs` to enforce landmarks, section naming, nav labels, menu-role removal, and Maze inert hooks.
- Updated `scripts/frontend-smoke.mjs` to assert live-route semantic expectations and explicit local route targets.
- Updated `docs/reference/manual-test-cases.md` with semantic HTML, ARIA, accessibility-tree, Maze inert, and focus QA steps.
- Moved VM-119 to Done in the Kanban board and card file.

## Why It Changed

VM-119 targeted a low-risk accessibility and semantics pass after VM-112A/VM-112B stabilized the shared topbar and VM-106 kept Maze on a custom modal path. The site needed stronger landmark consistency, clearer navigation semantics, named content regions, and explicit inert handling for the custom Maze overlay.

## Decisions Made

- Kept Maze on the existing custom modal rather than migrating to native `<dialog>`.
- Made the mobile navigation role repair unconditional because the app-menu role over-specification was already known from planning.
- Used visible headings for section names wherever possible and visually hidden headings only for result/footer/search regions that needed names without design copy changes.
- Treated `library/index.html` and `newIndex2_Old.html` as out of scope, consistent with the card assumptions.
- Updated validators when stale assumptions conflicted with the current shared-shell contract.

## Risks / Uncertainties

- Browser accessibility-tree QA was run with headless Edge because the in-app Browser plugin did not expose callable tools in this session.
- NVDA was not run; the card allowed NVDA as optional follow-up and required browser accessibility-tree inspection.
- Local static-server QA surfaced existing console errors from page resources or third-party/runtime paths, but the semantic tree and interaction assertions passed.
- The legal pages now expose many named sections, which is intentional but may make the landmark/region list longer in assistive tooling.

## Tests Run

- `node --check assets/js/vm-topbar.js`
- `node --check research/research-init.js`
- `node --check scripts/validate-frontend-html.mjs`
- `node --check scripts/frontend-smoke.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser accessibility-tree inspection via local static server and headless Edge for `newIndex2.html`, `archscry/index.html`, and `maze/index.html`.
- Maze modal runtime QA confirmed modal visibility, focus inside modal, inert on background while open, inert removal on Escape close, and focus return to opener.

## Not Touched

- `newIndex2_Old.html`
- `library/index.html`
- Generated artifacts
- Route names and route targets beyond smoke-validator expectation updates
- Placement logic
- Auth/data behavior
- Broad CSS architecture from VM-116
- Native `<dialog>` migration

## Follow-Up Recommendations

- Run NVDA or another full screen-reader pass before the next accessibility release if time allows.
- Consider a future targeted pass for existing `outline: none` declarations outside VM-119 touched controls.
- If more public routes are added, extend `scripts/validate-frontend-html.mjs` immediately so the semantic contract stays enforced.

## Next Suggested Agent

Human browser QA or release reviewer.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-119-semantic-html-aria-audit.md`
- `docs/handoffs/2026-05-24-1751-codex-vm119-semantic-html-aria-audit-card.md`
- `docs/reference/manual-test-cases.md`

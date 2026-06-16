# VM-404 Contained UI Polish Repair Handoff

## Agent Name

Codex

## Task Requested

Implement VM-404 as a contained UI polish repair branch from `origin/main`: fix the shared topbar active diamond, slow the Home Identity Signal, add SVG favicon metadata, start the Apocrypha Official Wizards / Mark Rosewater group collapsed, and create backlog-only concept cards for Maze deck scratchpad and Archscry-to-Strategium bridge work.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-1558-codex-vm403-pages-deploy-repair.md`
- `docs/handoffs/2026-06-15-1334-codex-vm402-golden-branch-promotion.md`
- `docs/handoffs/2026-06-14-1555-codex-vm389-home-identity-signal.md`
- `docs/handoffs/2026-06-15-0208-codex-vm397-apocrypha-source-compass.md`
- `docs/handoffs/2026-06-14-2255-codex-vm396-apocrypha-reference-shelves.md`
- `docs/handoffs/2026-05-16-1308-codex-vm021b-maze-return-bar-removal-mtgdecks-url-lockdown.md`
- `assets/css/topbar.css`
- `assets/js/home.js`
- `assets/js/apocrypha.js`
- `assets/js/vm-topbar.js`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-home.mjs`
- `docs/reference/manual-test-cases.md`
- `index.html`
- `apocrypha/index.html`
- `archscry/index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `strategium/index.html`
- `terms/index.html`

## Files Changed

- `assets/css/topbar.css`
- `assets/js/home.js`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-home.mjs`
- `docs/reference/manual-test-cases.md`
- `index.html`
- `apocrypha/index.html`
- `archscry/index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `strategium/index.html`
- `terms/index.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-404-contained-ui-polish-repair.md`
- `docs/kanban/backlog/VM-405-deck-scratchpad-redesign-concept.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-2313-codex-vm404-ui-polish-repair.md`

## What Changed

- Created `codex/vm404-ui-polish-repair` from `origin/main`.
- Raised `.vm-nav-link[aria-current="page"]::after` from `bottom: -10px` to `bottom: -3px`.
- Changed Home Identity Signal timing from `4800ms` to `9000ms`.
- Updated frontend smoke, Home visual-regression timer shim, and manual QA references to the new `9000ms` timing.
- Added SVG favicon links to the root page and one-level public entrypoints using the existing `assets/img/vox-mana-header-logo.svg`.
- Removed default `open` from `#apoc-library-official-wizards` and set its initial tome `aria-current="false"`.
- Created VM-405 and VM-406 backlog cards and left them as planning/backlog only.
- Moved VM-404 through Kanban and closed it after verification.

## Why It Changed

The user identified several small visible polish issues after the new `main` build: the topbar active diamond sat too low, the Home Identity Signal cycled too quickly to read, browser tabs lacked a favicon, and Apocrypha began with the large Official Wizards / Mark Rosewater group expanded. Larger Maze scratchpad and Archscry-to-Strategium ideas needed capture without widening this repair branch.

## Decisions Made

- Use the existing Vox Mana header logo SVG for Chromium-family favicon metadata only.
- Treat `scripts/visual-regression-home.mjs` as a timing test harness reference that should follow the `9000ms` constant.
- Leave `assets/js/apocrypha.js` unchanged because it already opens groups only from hash/tome interactions and does not force the first group open on normal load.
- Keep VM-405 and VM-406 backlog/planning only; do not move them to in-progress or done.
- Do not refresh visual baselines for the expected Apocrypha collapsed-state visual difference.

## Risks / Uncertainties

- Apocrypha visual compare may show an expected reference-section diff because the default group state changed from expanded to collapsed.
- Browser cache initially reused stale local assets on port `4177`; fresh-port browser QA on `4178` confirmed the new behavior.
- Git continues to warn about `C:\Users\obake/.config/git/ignore` permission in status output.
- Separate VM-407 planning files appeared in the working tree during VM-404; they were preserved and not treated as VM-404 implementation work.

## Tests Run

- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `git diff --check` - passed with existing LF/CRLF working-copy warnings only.
- `node --check assets/js/home.js` - passed.
- `node --check assets/js/apocrypha.js` - passed.
- `node --check assets/js/vm-topbar.js` - passed.
- Browser QA on `http://127.0.0.1:4178/` - Home active diamond computed `bottom: -3px`; favicon head link present; signal stayed on one visible profile through 5 seconds; hold changed to `Release signal`, `aria-pressed="true"`, and `Held`.
- Browser QA on `http://127.0.0.1:4178/archscry/` - Archscry active diamond computed `bottom: -3px`; favicon head link present.
- Browser QA on `http://127.0.0.1:4178/apocrypha/` - Official Wizards / Mark Rosewater group closed by default; tome `aria-current="false"`; favicon head link present.
- Browser QA on Apocrypha tome click - group opened, URL hash set, tome `aria-current="true"`.
- Browser QA on `http://127.0.0.1:4178/apocrypha/#apoc-library-official-wizards` - group opened and tome became current.
- Local HTTP favicon sweep - all eight public routes included the SVG favicon link; `assets/img/vox-mana-header-logo.svg` returned `200`.

## Not Touched

- `main` or `feature/ui-refactor-exploration` history.
- Schema.
- Generated data.
- Lore or Commander facts.
- Route aliases.
- Maze stash storage contracts or export behavior.
- Placement model.
- Source ledgers.
- Visual baselines.
- Maze scratchpad UI implementation.
- Archscry-to-Strategium linking implementation.

## Follow-Up Recommendations

- Use VM-405 to design a more intentional Maze deck scratchpad card/workspace before changing current storage/export behavior.
- Use VM-406 to map Archscry dossier moments to Strategium anchors and return/context behavior.
- If Apocrypha visual checks are rerun, document the collapsed reference-section diff as expected unless a future card explicitly refreshes baselines.

## Next Suggested Agent

Codex, for PR review or follow-up implementation after VM-405/VM-406 planning is approved.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-404-contained-ui-polish-repair.md`
- `docs/kanban/backlog/VM-405-deck-scratchpad-redesign-concept.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/reference/manual-test-cases.md`

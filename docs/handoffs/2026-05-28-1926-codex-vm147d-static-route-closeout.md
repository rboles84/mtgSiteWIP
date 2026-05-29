# 2026-05-28 19:26 - Codex - VM-147D Static Route Closeout

## Agent Name

Codex

## Task Requested

Execute `VM-147D` as a lightweight verification/docs-first closeout for the static public routes: `/strategium/`, `/apocrypha/`, `/privacy/`, `/terms/`, plus the `/library/` compatibility path. Preserve runtime behavior, visual treatment, asset wiring, legal copy, visual baselines, and the `/library/` compatibility mechanism.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1715-codex-vm147d-static-route-card.md`
- `docs/handoffs/2026-05-28-1653-codex-vm147c-maze-risk-reduction.md`
- `docs/handoffs/2026-05-28-1452-codex-vm147b-archscry-risk-reduction.md`
- `docs/handoffs/2026-05-25-0920-codex-vm128-strategium-index-extraction.md`
- `docs/handoffs/2026-05-25-2340-codex-vm134-apocrypha-hero-unification.md`
- `docs/handoffs/2026-05-27-2118-codex-vm145-legal-page-css-extraction.md`
- `docs/handoffs/2026-05-27-2134-codex-vm153-legal-glass-opacity-match.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-147D-static-public-route-css-js-risk-review.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- `strategium/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `library/index.html`
- `package.json`

## Files Changed

- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-147D-static-public-route-css-js-risk-review.md`
- `docs/kanban/done/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/ready/VM-147D-static-public-route-css-js-risk-review.md` moved to done
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md` moved to done
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1926-codex-vm147d-static-route-closeout.md`

## What Changed

- Added `VM-147D Static public route manual QA` to `docs/reference/manual-test-cases.md`.
- Captured checks for `/strategium/`, `/apocrypha/`, `/privacy/`, `/terms/`, and `/library/`.
- Documented `/library/` as the current Apocrypha compatibility path and explicitly preserved its alias shell, meta refresh, inline JavaScript redirect, and noscript fallback mechanism.
- Moved `VM-147D` from ready to done.
- Moved the `VM-147` umbrella from backlog to done and recorded that the route-by-route risk-reduction umbrella is closed.
- Updated the Kanban board and handoff index.

## Why It Changed

VM-147A, VM-147B, and VM-147C had already closed Home, Archscry, and Maze. VM-147D closes the remaining static public route review by verifying ownership and consolidating manual QA without introducing frontend churn.

## Decisions Made

- No runtime ownership/protected-boundary comments were added because the route ownership matrix and current file structure already make the boundaries clear.
- Kept `/library/` mechanism-specific language in QA docs so future checks verify the live compatibility shell exactly as implemented.
- Did not regenerate visual baselines because VM-147D made no intended visual changes.
- Closed the VM-147 umbrella because no separate follow-up was proven by this pass.

## Risks / Uncertainties

- The worktree already contains unrelated modified and untracked files from other cards; this pass did not revert or normalize them.
- `git diff --check` continues to report existing LF-to-CRLF normalization warnings across several touched and unrelated files, but no whitespace errors.
- Manual QA remains documented rather than fully browser-clicked in this pass; automated lint, smoke, and visual gates covered the static route contracts available to scripts.

## Tests Run

- `Select-String` route-stack verification for Strategium, Apocrypha, Privacy, Terms, and Library.
- `npm.cmd run lint:html` - pass.
- `npm.cmd run lint:js` - pass.
- `npm.cmd run test:frontend-smoke` - pass.
- `npm.cmd run test:visual:strategium` - pass, 0 mismatched pixels for all captures.
- `npm.cmd run test:visual:apocrypha` - pass, 0 mismatched pixels for all captures.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - pass with existing LF-to-CRLF warnings only.

## Not Touched

- Runtime route HTML
- Route CSS/JS
- Shared CSS/JS
- Legal copy
- Asset URLs and query strings
- Visual baselines
- Route behavior
- `/library/` compatibility mechanism
- Strategium tabs, checklist behavior, archetype search, and route-local static data semantics
- Apocrypha public reference content and outward source links
- Privacy/Terms legal wording and `legal.css` runtime behavior

## Follow-Up Recommendations

- Keep future static-route changes on separate cards with explicit route scope.
- If `/library/` is ever retired or changed from its current compatibility shell, open a route-retirement or compatibility-mechanism card rather than treating it as VM-147 follow-up.
- Keep Google Fonts or dependency delivery work on the VM-146 trail.

## Next Suggested Agent

No specialist follow-up required unless a human wants a separate manual browser QA pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-147D-static-public-route-css-js-risk-review.md`
- `docs/kanban/done/VM-147-large-route-css-js-risk-reduction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`

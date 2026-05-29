# 2026-05-28 17:15 - Codex - VM-147D Static Route Card

## Agent Name

Codex as Planning Architect / Kanban Steward

## Task Requested

Create one final lightweight VM-147 card for a static public route CSS/JS risk review covering Strategium, Apocrypha, Privacy, and Terms. Keep it mostly verification/docs, no redesign, confirm route-local CSS/JS ownership, note prior cards, add missing manual QA coverage during implementation if needed, and only add comments if genuinely useful.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- `strategium/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `package.json`

## Files Changed

- `docs/kanban/ready/VM-147D-static-public-route-css-js-risk-review.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1715-codex-vm147d-static-route-card.md`

## What Changed

- Added `VM-147D - Static Public Route CSS JS Risk Review` as a Ready card.
- Updated the Kanban board so `VM-147D` appears under Ready and `VM-147` remains in Backlog as the umbrella.
- Updated `VM-147` to include Static Public Routes as the final planned slice and to name the final-slice closeout path.
- Recorded this handoff and indexed it.

## Why It Changed

The original VM-147 implementation slices covered Home, Archscry, and Maze, but Strategium, Apocrypha, Privacy, and Terms are also public routes with route-local CSS/JS ownership worth verifying before closing the umbrella. The new card keeps that review lightweight and prevents the static routes from turning into an accidental redesign pass.

## Decisions Made

- `VM-147D` should be the final planned VM-147 slice unless implementation proves a separate non-VM-147 follow-up is needed.
- The card is verification/docs-first and should not mutate route behavior.
- Strategium and Apocrypha visual harnesses are named as verification gates.
- Privacy and Terms should preserve legal copy, `legal.css` last-load order, and shared topbar/reduce-motion behavior.
- Comments are allowed only when they clarify route-local ownership or protected contracts and are worth the added noise.

## Risks / Uncertainties

- The main risk is scope creep into visual polish, shared CSS/JS cleanup, or legal copy edits.
- Apocrypha uses versioned route-local asset URLs; changing those should remain out of scope unless breakage is proven.
- Privacy/Terms mention services in legal copy, but VM-146 already determined that policy text is not a runtime dependency.
- The working tree already contains many unrelated VM-147A/B/C, VM-154, VM-024, and Kanban cleanup changes; none were reverted.

## Tests Run

- `Select-String` route-stack checks for Strategium, Apocrypha, Privacy, and Terms asset links/scripts.
- `Select-String` package script check for `lint:html`, `lint:js`, `test:frontend-smoke`, `test:visual:strategium`, and `test:visual:apocrypha`.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` passed with only existing LF-to-CRLF warnings.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` reviewed after edits.

## Not Touched

- No runtime route files were changed.
- No Strategium behavior, tab IDs, checklist state, static data, or archetype search behavior changed.
- No Apocrypha content, versioned asset query strings, public framing, or `/library/` alias behavior changed.
- No Privacy/Terms legal copy, shared topbar, shared reduce-motion, or `legal.css` runtime behavior changed.
- No shared CSS/JS systems were refactored.

## Follow-Up Recommendations

- Implement `VM-147D` as a lightweight verification/docs pass.
- Add manual QA coverage only if the current checklist is missing a concise static-route section.
- Close the VM-147 umbrella after `VM-147D` completes unless the implementation opens a separate, explicitly scoped follow-up.

## Next Suggested Agent

Frontend risk-reduction implementer with Kanban Steward closeout.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/ready/VM-147D-static-public-route-css-js-risk-review.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`

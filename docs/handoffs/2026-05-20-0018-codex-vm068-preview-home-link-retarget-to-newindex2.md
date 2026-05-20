# Handoff - VM-068 Preview Home Link Retarget To newIndex2

Agent name: Codex

Task requested: Update the Archscry, Maze, and Apocrypha top-left Vox Mana brand links and `Home` nav links so they return to `newIndex2.html` instead of `newIndex.html`, then record the retargeting pass in the project-memory trail.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-20-0005-codex-vm067-preview-home-link-target-fix.md`
- `docs/kanban/board.md`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `assets/js/index.js`
- `assets/js/vm-topbar.js`

## Files Changed

- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `docs/kanban/done/VM-068-preview-home-link-retarget-to-newindex2.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0018-codex-vm068-preview-home-link-retarget-to-newindex2.md`

## What Changed

- Changed the Archscry header brand link from `/newIndex.html` to `/newIndex2.html`.
- Changed the Archscry `Home` nav link from `/newIndex.html` to `/newIndex2.html`.
- Changed the Maze header brand link from `/newIndex.html` to `/newIndex2.html`.
- Changed the Maze `Home` nav link from `/newIndex.html` to `/newIndex2.html`.
- Changed the Apocrypha header brand link from `/newIndex.html` to `/newIndex2.html`.
- Changed the Apocrypha `Home` nav link from `/newIndex.html` to `/newIndex2.html`.
- Added the `VM-068` done card, board entry, and handoff index entry for the retargeting trail.

## Why It Changed

The user reproduced the flow from `newIndex2.html` specifically and expects the route pages to return to that page, not to `newIndex.html` and not to root `index.html`. This pass aligns the return-home target with the page currently being used as the preferred skeleton.

## Decisions Made

- Followed the user’s latest concrete reproduction path and used `newIndex2.html` as the return target.
- Scoped the fix to the top-left brand and `Home` links only.
- Left Archscry, Maze, and Apocrypha cross-links untouched.
- Confirmed the static route-page HTML already carried the relevant links and that `vm-topbar.js` does not rewrite them at runtime.

## Risks / Uncertainties

- This is still a preview-home preference rather than a site-wide canonical-home decision.
- If the user later wants `newIndex.html`, `newIndex2.html`, or root `index.html` unified, another targeted routing pass will be needed.

## Tests Run

- Static scan confirming `archscry/index.html` brand and `Home` links now point to `/newIndex2.html`.
- Static scan confirming `maze/index.html` brand and `Home` links now point to `/newIndex2.html`.
- Static scan confirming `apocrypha/index.html` brand and `Home` links now point to `/newIndex2.html`.
- Static review confirming the Archscry, Maze, and Apocrypha cross-links remained on `/archscry/`, `/maze/`, and `/apocrypha/`.
- Static review of `assets/js/vm-topbar.js` confirming it only marks active nav state and manages the menu/reduce-motion toggle, not link rewrites.

## Not Touched

- `index.html`
- `newIndex.html`
- `newIndex2.html`
- Shared home CSS and JS
- Route-page body content and runtime logic
- Privacy and Terms pages

## Follow-Up Recommendations

- Hard-refresh the browser and click the brand and `Home` links from Archscry, Maze, and Apocrypha to confirm they now land on `newIndex2.html`.
- If the preferred home target changes again, consolidate the decision in one canonical-home pass instead of repeated small retargets.

## Next Suggested Agent

Frontend follow-up only if more pages should return to `newIndex2.html` or if the preview home should be promoted more broadly.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-068-preview-home-link-retarget-to-newindex2.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-20-0005-codex-vm067-preview-home-link-target-fix.md`
- `docs/handoffs/HANDOFF_INDEX.md`

# Handoff - VM-067 Preview Home Link Target Fix

Agent name: Codex

Task requested: Update the Archscry, Maze, and Apocrypha top-left Vox Mana brand links and `Home` nav links so they return to `newIndex.html` instead of root `index.html`, then record the fix in the project-memory trail.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/kanban/board.md`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`

## Files Changed

- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `docs/kanban/done/VM-067-preview-home-link-target-fix.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0005-codex-vm067-preview-home-link-target-fix.md`

## What Changed

- Changed the Archscry header brand link from `/` to `/newIndex.html`.
- Changed the Archscry `Home` nav link from `/` to `/newIndex.html`.
- Changed the Maze header brand link from `/` to `/newIndex.html`.
- Changed the Maze `Home` nav link from `/` to `/newIndex.html`.
- Changed the Apocrypha header brand link from `/` to `/newIndex.html`.
- Changed the Apocrypha `Home` nav link from `/` to `/newIndex.html`.
- Added the `VM-067` done card, board entry, and handoff index entry for the fix trail.

## Why It Changed

The user is currently treating `newIndex.html` as the desired return-home surface from the main route pages. The old `/` target still led back to root `index.html`, which broke that expected flow.

## Decisions Made

- Followed the user’s explicit target of `newIndex.html`.
- Scoped the fix to the top-left brand and `Home` links only.
- Left Archscry, Maze, and Apocrypha cross-links untouched.
- Left root `index.html` and `newIndex2.html` untouched.

## Risks / Uncertainties

- This is a targeted routing preference, not a full canonical-home decision across the whole site.
- If the preferred home target changes again later, these three pages will need another small retargeting pass.

## Tests Run

- Static scan confirming `archscry/index.html` brand and `Home` links now point to `/newIndex.html`.
- Static scan confirming `maze/index.html` brand and `Home` links now point to `/newIndex.html`.
- Static scan confirming `apocrypha/index.html` brand and `Home` links now point to `/newIndex.html`.
- Static review confirming the Archscry, Maze, and Apocrypha cross-links remained on `/archscry/`, `/maze/`, and `/apocrypha/`.

## Not Touched

- `index.html`
- `newIndex.html`
- `newIndex2.html`
- Shared home CSS and JS
- Route-page body content and runtime logic
- Privacy and Terms pages

## Follow-Up Recommendations

- Click the brand and `Home` links in Archscry, Maze, and Apocrypha to confirm they now land on `newIndex.html`.
- If `newIndex.html` becomes the canonical home more broadly, do a repo-wide pass later so every remaining home link uses the same target.

## Next Suggested Agent

Frontend follow-up only if more route pages should be aligned to the same preview-home target.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-067-preview-home-link-target-fix.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/HANDOFF_INDEX.md`

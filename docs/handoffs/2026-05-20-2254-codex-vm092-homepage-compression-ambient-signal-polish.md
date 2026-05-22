# 2026-05-20 22:54 - Codex - VM-092 Homepage Compression + Ambient Signal Polish

## Agent Name

Codex

## Task Requested

Implement VM-092 to polish `newIndex2.html`: fix the connect-strip spacing bug, make the homepage signal less tool-like, reduce visible repetition, render only component layers for composite homepage signal states, and randomize the initial signal identity.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-092-homepage-compression-ambient-signal-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2254-codex-vm092-homepage-compression-ambient-signal-polish.md`

## What Changed

- Converted the connect-strip rows into stacked micro-cards so labels and verbs no longer render as joined words.
- Replaced profile-specific homepage signal copy with static ambient copy: `Identity Signal` and `Color philosophies drift across identity, search, lore, and Commander expression.`
- Changed the homepage signal chart builder so mono identities render one component layer and composite identities render only the two component color layers.
- Randomized `heroManaCycleIndex` from the existing 20 identities before the first homepage signal render.
- Kept the homepage signal tags static: `Identity`, `Search`, `Lore`, `Color`, and `Commander`.
- Tightened the four area-card descriptions and removed repeated hero explanation/status-strip copy.
- Reduced homepage section spacing slightly and made the four area cards fit as a desktop navigation row.

## Why It Changed

After VM-090 split the tutorial/tooling content into `/basics/`, the homepage needed restraint: it should invite and orient, not feel like another mini Mana Lens or a teaching page.

## Decisions Made

- Used `VM-092` because `VM-091` is already the safe backup push card.
- Kept full component + synthesis behavior exclusively on `/basics/`; the homepage now shows component layers only.
- Used the existing 20 identities for random start and cycling; no generated/random identity data was introduced.
- Left `/basics/` untouched.

## Risks / Uncertainties

- `VM-088` remains in progress but is now partly superseded by the VM-090/VM-092 homepage direction; it should be reconciled or closed in a follow-up.
- Browser smoke observed the browser's default `/favicon.ico` request returning `404`; no Vox Mana route or required asset returned a failure.
- The worktree contains unrelated drift outside this task, including a deleted `assets/img/vox-mana-logo.png` and modified/untracked research files; those were not touched.

## Tests Run

- Static scan: no duplicate runtime IDs in `newIndex2.html`.
- Static scan: no homepage `href="#basics"` links.
- Static scan: no homepage Color Matrix/Basics tooling IDs or hero picker IDs.
- Static scan: no `Profile:` / `Overlay:` homepage signal UI terms.
- Route checks returned `200` for `/newIndex2.html`, `/basics/`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Headless Edge smoke: composite deterministic start rendered `Blue` + `Black` datasets only, with no synthesis dataset.
- Headless Edge smoke: mono deterministic start rendered one `White` dataset.
- Headless Edge smoke: signal cycled from `Blue` + `Black` to `Black` + `Red` while visible copy stayed ambient/static.
- Headless Edge smoke: reduced-motion deterministic start stayed on `Blue` + `Black` without cycling.
- Headless Edge smoke: connect-strip `strong` and `span` elements both computed as `display: block`.
- `npm.cmd test`

## Not Touched

- `/basics/`
- `index.html`
- `newIndex.html`
- Shared homepage CSS/JS
- `/archscry/` internals
- `/maze/` internals
- `/apocrypha/` internals
- Existing route targets
- Unrelated dirty/untracked files

## Follow-Up Recommendations

- Reconcile `VM-088` with the newer homepage split/polish direction.
- Do a normal-window visual pass for one-screen desktop feel and mobile card density.
- Consider a later cleanup pass to remove unused homepage CSS/JS left over from previous preview iterations after the design settles.

## Next Suggested Agent

Front-End QA / Documentation Steward for VM-088 reconciliation and visual viewport review.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-092-homepage-compression-ambient-signal-polish.md`
- `docs/kanban/done/VM-090-split-homepage-and-basics-experience.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`

# Codex Handoff - VM-096 Black Component Glow Repair

## Agent Name

Codex

## Task Requested

Add a subtle violet/dark-grey glow only to the Black component line when Black appears inside composite guild and college radar identities, applying it to both `newIndex2.html` and `/basics/` while preserving the Home/Basics behavior split.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2335-codex-vm094-identity-signal-caption-pills-repair.md`
- `docs/kanban/board.md`
- `newIndex2.html`
- `basics/index.html`

## Files Changed

- `newIndex2.html`
- `basics/index.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-096-black-component-glow-repair.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a homepage Chart.js plugin, `vmHeroBlackComponentGlow`, that applies canvas shadow only to datasets marked with `_vmBlackComponentGlow`.
- Updated homepage composite dataset rendering so Home composites draw component datasets only, with Black carrying `_vmBlackComponentGlow`, `_vmGlowBlur`, and `_vmGlowColor` when present.
- Updated the `/basics/` glow plugin so `_vmGlowColor` is used only after a dataset qualifies through the existing glow contract.
- Added Black-only glow metadata to `/basics/` component datasets while leaving synthesized identity datasets unmarked.

## Why It Changed

The Black dashed component line was hard to read against the dark glass/background, especially in guild and college overlays. The fix improves readability without changing identity values or turning the whole chart into a brighter/purple visual.

## Decisions Made

- Home remains ambient and component-only for composites.
- `/basics/` remains the teaching/tooling view and can still show component plus synthesis datasets.
- Mono Black does not receive the special composite glow.
- Synthesized identities such as Rakdos, Dimir, Golgari, Silverquill, and Witherbloom do not receive the Black component glow metadata.
- `_vmGlowColor` does not become an independent glow trigger.

## Risks / Uncertainties

- The worktree contains unrelated dirty files from prior/parallel work, including Archscry files, deleted research files, logo research files, and previously untracked handoff/Kanban files. This pass intentionally did not reconcile them.
- Visual intensity of the glow may still need human-eye tuning after a normal browser review.

## Tests Run

- Static scan confirmed local `assets/js/graph.js` / `../assets/js/graph.js` are used and the Chart.js CDN is absent.
- Static scan confirmed inline scripts compile.
- Static scan confirmed no duplicate runtime IDs when matching real `id="..."` attributes.
- Route checks returned `200` for `/newIndex2.html` and `/basics/`.
- Browser smoke on `newIndex2.html` forced `rakdos`, `dimir`, `simic`, and mono `B`.
- Browser smoke confirmed Home `rakdos` datasets are `Black`, `Red` only, with only Black carrying the glow metadata.
- Browser smoke confirmed Home `dimir` datasets are `Blue`, `Black` only, with only Black carrying the glow metadata.
- Browser smoke confirmed Home `simic` has no Black glow flag.
- Browser smoke confirmed Home mono Black has no composite glow flag.
- Browser smoke on `/basics/` confirmed Rakdos can include `Black`, `Red`, `Rakdos` with only Black carrying the Black component glow metadata.
- Browser smoke confirmed Dimir, Orzhov, Golgari, Silverquill, and Witherbloom Black component glow metadata.
- Browser smoke confirmed component-off Rakdos leaves only the synthesis dataset.
- Browser smoke confirmed `_vmGlowColor` alone does not qualify when `_vmGlowBlur` disables glow.
- Browser smoke confirmed both glow plugins restore canvas state after qualifying dataset draws.
- `npm.cmd test` passed.

## Not Touched

- Identity score data
- Routes and nav links
- Selector behavior
- Magic Basics tabs
- Color Matrix localStorage behavior
- `assets/js/graph.js`
- Root `index.html`
- `newIndex.html`
- Archscry, Maze, and Apocrypha internals
- Existing unrelated dirty/untracked worktree files

## Follow-up Recommendations

- Review Black-component glow visually in a normal browser and tune `rgba(164, 107, 234, 0.78)` / blur `20` only if it feels too strong or too faint.
- Clean up unrelated dirty worktree state in a separate coordination pass before staging/committing.

## Next Suggested Agent

Visual QA / release steward.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-096-black-component-glow-repair.md`
- `docs/handoffs/2026-05-20-2335-codex-vm094-identity-signal-caption-pills-repair.md`

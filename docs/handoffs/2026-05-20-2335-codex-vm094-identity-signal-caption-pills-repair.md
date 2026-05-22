# Codex Handoff - VM-094 Identity Signal Caption + Pills Repair

## Agent Name

Codex

## Task Requested

Repair only the `newIndex2.html` homepage Identity Signal panel by restoring real display-only color/guild/college pills and active identity captions while preserving the passive VM-093 chart behavior.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2320-codex-vm093-identity-signal-three-layer-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-094-identity-signal-caption-pills-repair.md`
- `newIndex2.html`
- `basics/index.html` hash only, to confirm it stayed unchanged

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-094-identity-signal-caption-pills-repair.md`
- `docs/handoffs/2026-05-20-2335-codex-vm094-identity-signal-caption-pills-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Moved `heroManaDatasetPills` into the Identity Signal header area below the passive signal intro copy.
- Replaced static ambient tags with display-only identity pills:
  - Mono identities show `Profile: <identity>`.
  - Composite identities show `Overlay: <component> + <component> -> <identity>`.
- Updated the caption so `heroManaTitle` and `heroManaText` follow the current auto-cycled identity.
- Added a small helper that trims existing identity copy to at most two sentences without inventing new lore or new descriptions.
- Preserved homepage chart layering from VM-093: mono identities render one dataset; composite identities render component datasets plus the synthesized identity dataset.

## Why It Changed

The homepage signal had become too abstract after VM-092/VM-093: the chart visual worked, but users could not see which color, guild, or college the passive preview was displaying. This restores the useful mana/context cues without bringing back interactive selector tooling.

## Decisions Made

- Kept the homepage signal passive and auto-cycling.
- Kept `assets/js/graph.js` as the local Chart.js runtime and did not restore a CDN.
- Used existing `identity.title` and `identity.text` as the caption source.
- Kept `/basics/` untouched; the richer teaching/tooling experience remains there.
- Noted the worktree already contains unrelated dirty files from prior batches.

## Risks / Uncertainties

- The worktree contains unrelated dirty files from prior batches, including Archscry files, the `/basics/` split, logo research files, and other untracked docs. This pass intentionally did not clean or reconcile those.

## Tests Run

- Static scan confirmed `newIndex2.html` references `assets/js/graph.js` and not the Chart.js CDN.
- Static scan confirmed no duplicate runtime IDs in `newIndex2.html`.
- Static scan confirmed forbidden homepage tooling IDs are absent: `basicsReveal`, `colorMatrixWrap`, `vmRadar`, `identityGrid`, `lensTabs`, `guildSubtabs`, `componentToggle`, `compositeToggle`, `heroManaPickerToggle`, `heroManaPickerPanel`, and `heroManaPills`.
- Inline script compile check passed.
- Confirmed `basics/index.html` hash stayed unchanged during this pass.
- Route checks returned `200` for `/newIndex2.html`, `/basics/`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Browser smoke forced `updateHeroManaPreview("simic")` and confirmed datasets `Green`, `Blue`, `Simic`, pills `Overlay: Green + Blue -> Simic`, and Simic caption text.
- Browser smoke forced `updateHeroManaPreview("rakdos")` and confirmed `Overlay: Black + Red -> Rakdos`.
- Browser smoke forced `updateHeroManaPreview("W")` and confirmed `Profile: White`.
- Browser smoke confirmed random start and passive cycling update chart, caption, and pills together.
- Browser smoke confirmed reduced-motion renders one random identity and does not cycle.
- `npm.cmd test` passed.

## Not Touched

- `/basics/`
- root `index.html`
- `newIndex.html`
- shared CSS/JS
- `assets/js/graph.js`
- Archscry internals
- Maze internals
- Apocrypha internals
- Existing unrelated dirty/untracked worktree files

## Follow-up Recommendations

- Continue homepage polish only after the current signal repair is visually reviewed in a normal browser.
- If the caption feels too text-heavy after visual review, tune only the existing identity copy summaries rather than adding controls.

## Next Suggested Agent

Visual QA / UX polish agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-094-identity-signal-caption-pills-repair.md`
- `docs/handoffs/2026-05-20-2320-codex-vm093-identity-signal-three-layer-repair.md`

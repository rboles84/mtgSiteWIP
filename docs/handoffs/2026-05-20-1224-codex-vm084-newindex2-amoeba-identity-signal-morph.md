# 2026-05-20 12:24 - Codex - VM-084 newIndex2 Amoeba Identity Signal Morph

## Agent Name

Codex

## Task Requested

Implement VM-084 so the `newIndex2.html` identity signal behaves more like a slow amoeba: both the inner radar result map and the outer polygon shape should morph, labels should stay hidden, glow/pulse should be added, and clear tuning instructions should live near the script.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1216-codex-vm083-newindex2-signal-only-fluid-randomizer.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-083-newindex2-signal-only-fluid-randomizer.md`
- `newIndex2.html`
- `C:\Users\obake\Downloads\HTML Work\working\candidates\dynamic-radar-showcase.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-084-newindex2-amoeba-identity-signal-morph.md`
- `docs/handoffs/2026-05-20-1224-codex-vm084-newindex2-amoeba-identity-signal-morph.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added signal tuning constants for data timing, animation timing, shape timing, polygon side counts, and label visibility.
- Changed the identity signal from a fixed 12-axis radar to a morphing sequence using `[6, 7, 8, 10, 12, 9, 7, 5]`.
- Slowed inner data changes to `1200ms` with `1600ms` animation.
- Added a separate outer polygon morph loop at `6000ms` with `1800ms` animation.
- Hid point labels by default through `showPointLabels: false`.
- Added subtle CSS glow/pulse treatment to the signal canvas area.
- Added an isolated Chart.js glow plugin for `vmIdentitySignalChart`.

## Why It Changed

VM-083 only changed the inner dataset while the radar scaffold stayed fixed. The requested behavior needed the radar label count to change over time so the outer polygon itself also morphs, while keeping the homepage surface free of controls or demo UI.

## Decisions Made

- Kept the surface chart-only: no shape buttons, randomize button, stats, stream labels, or demo language.
- Used script constants rather than visible controls so future tuning is easy without changing the homepage design.
- Kept `showPointLabels: false` as the default to make the motion feel organic rather than chart-like.
- Preserved reduced-motion behavior by initializing once and not starting animation intervals when reduced motion is enabled.

## Risks / Uncertainties

- The in-app browser still reports `window.Chart` as unavailable because the external Chart.js CDN does not load there. The page shell and canvas were smoke-tested, but live radar rendering, polygon morphing, and `vmRadar` rendering need manual verification in a browser/session where Chart.js loads.
- The worktree contains unrelated modified, deleted, and untracked files from other active work. This pass did not revert or normalize them.

## Tests Run

- Static scan: no duplicate runtime IDs after stripping HTML comments.
- Static scan: required IDs remain present: `vmIdentitySignalChart`, `vmRadar`, `basicsReveal`, `colorMatrixWrap`, `identityGrid`, `lensTabs`, `guildSubtabs`.
- Static scan: no visible signal-control strings or `data-vm-signal-*` hooks remain.
- Static scan: VM-084 tuning constants, data interval, and shape morph interval are present.
- Inline script compile check passed.
- Browser smoke: `http://localhost:8000/newIndex2.html` loaded, `vmIdentitySignalChart` exists, no signal controls are visible, and route links are present.
- Local HTTP route checks returned `200` for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- `npm.cmd test` passed.

## Not Touched

- Root `index.html`
- `newIndex.html`
- Shared homepage CSS/JS
- Route-page internals
- Existing Color Matrix data
- Existing `vmRadar` setup and identity selector behavior
- Magic Basics tab content/behavior
- Atmosphere canvas, reveal, pointer glow, placeholder link, localStorage, back-to-top, and footer behavior

## Follow-Up Recommendations

- Manually verify the live amoeba motion in a browser with Chart.js available.
- If CDN loading keeps blocking local QA, create a separate card to decide whether `newIndex2.html` should use a local Chart.js asset or another project-approved fallback.

## Next Suggested Agent

Front-End QA agent with browser/Chart.js access.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-084-newindex2-amoeba-identity-signal-morph.md`
- `docs/kanban/done/VM-083-newindex2-signal-only-fluid-randomizer.md`
- `docs/handoffs/2026-05-20-1216-codex-vm083-newindex2-signal-only-fluid-randomizer.md`

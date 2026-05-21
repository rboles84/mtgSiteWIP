# Handoff - VM-080 newIndex2 Ambient Identity Signal Radar

Agent name: Codex

Task requested: Replace the static WUBRG center signal visual in `newIndex2.html` with a passive animated Chart.js radar centerpiece, using `dynamic-radar-showcase.html` only as an implementation reference.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1005-codex-vm077-newindex2-living-index-rearrangement.md`
- `docs/handoffs/2026-05-20-1043-codex-vm079-newindex2-living-index-visual-hierarchy.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-077-newindex2-living-index-rearrangement.md`
- `docs/kanban/done/VM-079-newindex2-living-index-visual-hierarchy.md`
- `newIndex2.html`
- `C:\Users\obake\Downloads\HTML Work\working\candidates\dynamic-radar-showcase.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-080-newindex2-ambient-identity-signal-radar.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1151-codex-vm080-newindex2-ambient-identity-signal-radar.md`

## What Changed

- Replaced the hero center `.vm-signal-system` WUBRG orbit markup with a `vmIdentitySignalChart` canvas inside a small Living Color System signal header.
- Added minimal CSS for `.vm-signal-system--radar`, `.vm-signal-header`, `.vm-signal-chart-wrap`, and `#vmIdentitySignalChart` sizing/containment.
- Added an isolated IIFE that initializes a Chart.js radar using unique `vmIdentitySignal*` names.
- Added slow 2-second value drift, 16-second axis-set morphing, reduced-motion quiet mode, visibility pause/resume, and unload cleanup.
- Left the existing Color Matrix `vmRadar` chart and `radarChart` logic untouched.
- Tracked the work as VM-080 because VM-077 already exists as a completed card in this repo.

## Why It Changed

The static WUBRG orbit introduced in the visual hierarchy pass still read as a decorative emblem. The user wanted that center area to become a living, ambient identity signal without changing the homepage structure or Color Matrix behavior.

## Decisions Made

- Used the downloaded dynamic radar showcase only for Chart.js radar mechanics and slow morphing ideas.
- Did not copy showcase controls, sliders, stats, shape gallery UI, fast/slow stream panels, or demo terminology.
- Kept the new chart decorative/supportive, with surrounding text carrying the concept for accessibility.
- Kept the new JavaScript inside an IIFE so no global `vmIdentitySignalChart`, interval names, or demo names leak onto `window`.
- Did not remove unused legacy `.vm-signal-ring` CSS because the strict scope was to replace the visible block and add minimal new containment rules.

## Risks / Uncertainties

- Reduced-motion and visibility pause/resume were verified by static code path and browser environment checks, not by forcing a reduced-motion browser profile.
- The old static signal CSS remains in the file as unused styles from the previous pass; the old ring/point DOM is gone.
- Other unrelated working-tree changes existed before this task and were not touched.

## Tests Run

- Static scan: no duplicate IDs.
- Static scan: only two canvas IDs exist: `vmIdentitySignalChart` and `vmRadar`.
- Static scan: old `.vm-signal-ring` and `.vm-signal-point` body DOM are gone.
- Static scan: no `morphChart`, `fastStream`, `slowStream`, `dynamicRadar`, `Axis 1`, sensor, stock, demo, shape gallery, slider, or stats language was copied into `newIndex2.html`.
- Static scan: route links still include `/archscry/`, `/maze/`, and `/apocrypha/`.
- Local route checks returned 200:
  - `/newIndex2.html`
  - `/archscry/`
  - `/maze/`
  - `/apocrypha/`
- Browser smoke check:
  - Page loads with no console errors.
  - `vmIdentitySignalChart` exists and has a stable rendered size.
  - Old signal ring/point DOM is absent.
  - A clipped chart-region screenshot changed after the 2.3-second update interval.
  - Magic Basics tabs still update `basicsReveal`.
  - Color Matrix show/hide still works.
  - Existing `vmRadar` canvas is present and sized.
  - Identity selector updates the selected Blue profile and radar caption.
  - New names are not exposed as globals on `window`.
- `npm.cmd test` - passed.

## Not Touched

- Root `index.html`
- `newIndex.html`
- Shared CSS or JS files
- Route-page internals
- Magic Basics tab data/logic
- Color Matrix data
- Existing `vmRadar` canvas
- Existing `radarChart` setup and update logic
- Reveal observers
- Atmosphere/star/orb canvas behavior
- Pointer glow behavior
- Back-to-top behavior
- Route links
- Unrelated Archscry/assets/manual-test/research-doc working-tree changes

## Follow-Up Recommendations

- Human visual skim the hero at desktop and mobile widths to tune chart density if desired.
- If the legacy static signal CSS bothers future maintainers, remove it in a separate cleanup pass after confirming no other mockup uses it.
- If desired later, add a tiny automated smoke fixture for `vmIdentitySignalChart` existence and duplicate canvas ID prevention.

## Next Suggested Agent

Frontend visual QA agent for responsive hero polish.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-080-newindex2-ambient-identity-signal-radar.md`
- `docs/kanban/done/VM-079-newindex2-living-index-visual-hierarchy.md`
- `docs/kanban/done/VM-077-newindex2-living-index-rearrangement.md`
- `docs/handoffs/HANDOFF_INDEX.md`

# 2026-05-23 00:19 - Codex - VM-110 Identity Signal Hold Note Readability + Cycle Timing

## Agent Name

Codex

## Task Requested

Implement VM-110: make the `newIndex2.html` Identity Signal held lore note readable instead of clipped, and speed the passive cycle by 25%.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-23-0004-codex-vm109-identity-signal-lore-note-no-shift-hold.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-110-identity-signal-hold-note-readability-cycle-timing.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-23-0019-codex-vm110-identity-signal-hold-note-readability-cycle-timing.md`

## What Changed

- Repositioned `.vm-hero-signal-details` as a lower in-panel absolute overlay instead of a below-card popover.
- Replaced the old `max-height: 10.5rem` plus hidden overflow with `max-height: min(18rem, 52vh)`, scrollable overflow, and pointer-enabled note content.
- Added a small mobile max-height adjustment for the held note.
- Changed `heroManaCycleMs` from `6000` to `4800`, with an inline timing comment.

## Why It Changed

The VM-109 field note successfully avoided layout shift, but richer lore notes could be clipped and unreadable. This pass keeps the no-shift behavior while making the held note readable, and tunes the passive cycle to feel more alive.

## Decisions Made

- Interpreted “25% faster” as `6000 / 1.25 = 4800ms`.
- Kept the note absolute to preserve the VM-109 no-shift decision.
- Allowed the held note to scroll when content exceeds the viewport-aware cap.

## Risks / Uncertainties

- The held overlay can cover part of the radar/caption while active. This is intentional reading-mode behavior, but it may be visually tuned later if desired.
- Browser smoke confirmed focus remains on the latch after release, so the existing focus-pause behavior can delay cycling until focus leaves the panel. This behavior was preserved rather than changed.

## Tests Run

- Static scan confirmed preserved Identity Signal IDs and `heroManaCycleMs = 4800`.
- Static scan confirmed the old `10.5rem` cap is gone from `.vm-hero-signal-details`.
- Inline script compile with Node.
- Route checks:
  - `/newIndex2.html` -> `200`
  - `/data/factions.json` -> `200`
- Browser smoke on `http://localhost:8000/newIndex2.html`:
  - Hold note opened without viewport clipping.
  - Held note reported `overflowY: auto` and `pointerEvents: auto`.
  - `.vm-hero-mana` height stayed stable before/after hold/release.
  - Release hid the note.
  - No console errors appeared.
- `npm.cmd test` passed.

## Not Touched

- `/basics/`
- `/archscry/`
- `/maze/`
- `/apocrypha/`
- Root `index.html`
- `newIndex.html`
- Shared CSS/JS assets
- Route destinations
- Chart datasets and identity score values

## Follow-Up Recommendations

- If the overlay feels too dominant visually, tune only `.vm-hero-signal-details` placement/opacity rather than changing the data or hold behavior.
- If release should resume cycling immediately even while the latch still has keyboard focus, handle that as a separate interaction-policy pass.

## Next Suggested Agent

Frontend/UI polish agent for any visual tuning after hands-on review.

## Related Kanban Card

- `docs/kanban/done/VM-110-identity-signal-hold-note-readability-cycle-timing.md`

# Handoff - newIndex Performance Diagnosis

Agent name: Codex

Task requested: Diagnose why `newIndex.html` feels laggy and identify the most likely runtime and rendering bottlenecks without changing the preview implementation yet.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-1956-codex-live-home-css-restoration.md`
- `docs/kanban/board.md`
- `newIndex.html`
- `assets/css/home-preview.css`
- `assets/css/atmosphere.css`
- `assets/js/home-preview.js`
- `assets/js/color-matrix-radar.js`
- `assets/js/atmosphere.js`
- `assets/js/vm-topbar.js`
- `assets/js/reduce-motion.js`
- `assets/img/backgrounds/background-vox-gateway-clean-13.webp`

## Files Changed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2002-codex-newindex-performance-diagnosis.md`

## What Changed

- Reviewed the preview load path and confirmed `newIndex.html` layers the shared atmosphere stack, the preview CSS, a CDN Chart.js load, and the shared radar helper.
- Isolated the biggest constant-cost feature as the animated atmosphere canvas plus the shared atmosphere CSS overlays.
- Isolated the biggest startup/interactivity costs inside the preview as the dual radar mount, Chart.js glow effects, and reveal animations that animate `filter: blur(...)` across many elements.
- Confirmed there is no runaway update loop in `home-preview.js`; the radar updates are event-driven rather than continuous.

## Why It Changed

The user asked why the preview feels laggy. This pass documents the likely causes so a follow-up optimization pass can remove the highest-cost effects first instead of guessing.

## Decisions Made

- Kept the task read-only for runtime files because the user asked for diagnosis rather than an optimization change.
- Treated the lag as two separate problems: first-load/startup cost and continuous frame-rate cost.
- Focused on preview-only files and shared scripts actually loaded by `newIndex.html`.

## Risks / Uncertainties

- No browser profiler trace was captured in-session, so the diagnosis is based on code-path review and cost characteristics rather than a Chrome performance recording.
- Device-specific GPU and browser differences may change which effect feels worst, but the identified hotspots are all real cost centers in the current implementation.

## Tests Run

- Static load-path review of `newIndex.html`
- Selector and effect scans in `assets/css/home-preview.css`
- Script hotspot scans across `assets/js/home-preview.js`, `assets/js/color-matrix-radar.js`, `assets/js/atmosphere.js`, `assets/js/vm-topbar.js`, and `assets/js/reduce-motion.js`
- Background asset size check for `background-vox-gateway-clean-13.webp`

## Not Touched

- `newIndex.html`
- `assets/css/home-preview.css`
- `assets/js/home-preview.js`
- `assets/js/color-matrix-radar.js`
- Live homepage runtime files

## Follow-Up Recommendations

- First optimization pass: remove or gate the shared atmosphere animation on `newIndex.html`.
- Second optimization pass: collapse the secondary radar mount or simplify the glow plugin and chart animation.
- Third optimization pass: replace blur-based reveal transitions with opacity/transform-only reveals and simplify the rotating orbit treatment.

## Next Suggested Agent

Frontend implementation follow-up if the preview should be tuned for smoother motion.

## Related Kanban Card / Docs / Plans

- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/kanban/done/VM-063-homepage-preview-portable-identity-radar.md`
- `docs/handoffs/HANDOFF_INDEX.md`

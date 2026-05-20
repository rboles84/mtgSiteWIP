# VM-064 - newIndex Chart.js Preview Repair

ID: VM-064
Title: newIndex Chart.js Preview Repair
Status: done
Type: Frontend / Bugfix
Area: Home Preview, Shared UI
Priority: high
Created: 2026-05-19
Completed: 2026-05-19

## Summary

Repair the `newIndex.html` Color Matrix radar so it mounts and behaves like the working `newIndex2.html` reference without touching the live homepage.

## Source Evidence

- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`
- `docs/handoffs/2026-05-19-2002-codex-newindex-performance-diagnosis.md`
- `docs/kanban/done/VM-063-homepage-preview-portable-identity-radar.md`
- `newIndex.html`
- `newIndex2.html`
- `assets/js/color-matrix-radar.js`

## Problem

The preview page renders the Color Matrix shell but the Chart.js radar does not behave like the working `newIndex2.html` implementation. The page currently needs a scoped follow-up that restores the interactive radar path without destabilizing live-home files.

## Acceptance Criteria

- `newIndex.html` mounts a visible radar chart when the Color Matrix is shown.
- The selector, synthesis/component toggles, caption, and dataset pills behave like the working `newIndex2.html` reference.
- The fix stays scoped to preview-only files and does not modify `index.html`, `assets/css/home.css`, or `assets/js/home.js`.

## Dependencies / Related Work

- `VM-063 - Homepage Preview + Portable Identity Radar`
- Existing preview-only DOM in `newIndex.html`

## Files Likely Impacted

- `newIndex.html`
- Optional preview-only JS helper if extraction is cleaner than inline repair

## Risks / Uncertainties

- `newIndex.html` hides the Color Matrix until the user opens it, so chart mount timing must account for hidden layout.
- The worktree already contains unrelated doc and content edits that should not be touched.

## Implementation Prompt

Compare `newIndex.html` against the working `newIndex2.html` radar flow and restore the preview's Chart.js behavior with the smallest safe preview-only fix.

## Human Review

Yes - visual behavior should be checked in-browser after the scoped fix lands.

## Notes

Keep the change surgical. Do not rework the live homepage or unrelated preview directions.

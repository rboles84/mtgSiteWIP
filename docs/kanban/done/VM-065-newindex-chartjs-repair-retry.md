# VM-065 - newIndex Chart.js Repair Retry

ID: VM-065
Title: newIndex Chart.js Repair Retry
Status: done
Type: Frontend / Bugfix
Area: Home Preview, Color Matrix
Priority: high
Created: 2026-05-19
Completed: 2026-05-19

## Summary

Retry the `newIndex.html` Color Matrix fix after confirming the current on-disk preview file is missing parts of the prior `VM-064` repair.

## Source Evidence

- `docs/handoffs/2026-05-19-2142-codex-newindex-chartjs-preview-repair.md`
- `docs/kanban/done/VM-064-newindex-chartjs-preview-repair.md`
- `newIndex.html`
- `newIndex2.html`
- `assets/js/newindex-color-matrix.js`

## Problem

The existing `newIndex.html` on disk does not currently load the preview adapter that was created for the radar fix, and it still contains the broader CSS rule that can blank radar/glow surfaces. The intended repair exists in supporting files and docs, but the page wiring regressed.

## Acceptance Criteria

- `newIndex.html` loads the preview radar adapter again.
- The broad radar/glow suppression is narrowed so the chart surface can render.
- The fix remains scoped to preview-only files.

## Dependencies / Related Work

- `VM-064 - newIndex Chart.js Preview Repair`
- `VM-063 - Homepage Preview + Portable Identity Radar`

## Files Likely Impacted

- `newIndex.html`
- `docs/kanban/board.md`
- Retry handoff docs

## Risks / Uncertainties

- The page still depends on the external Chart.js CDN.
- The worktree contains unrelated in-flight content and doc changes that should not be disturbed.

## Implementation Prompt

Restore the missing `newIndex.html` runtime include and any lost preview-only CSS correction so the Color Matrix behaves like the working retry design again.

## Human Review

Yes - this is best confirmed with a live page refresh after the retry lands.

# VM-096 - Black Component Glow Repair

ID: VM-096
Title: Black Component Glow Repair
Status: done
Type: Frontend / Chart Readability
Area: Home Identity Signal, Basics Color Matrix
Priority: medium
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Improved readability for the dashed Black component line in composite guild and college radar charts by adding a subtle violet-grey glow only to Black component overlays.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2335-codex-vm094-identity-signal-caption-pills-repair.md`
- `docs/kanban/board.md`
- `newIndex2.html`
- `basics/index.html`

## Scope

- Added Black-only glow metadata to composite component datasets.
- Applied the repair to both the homepage Identity Signal and `/basics/` Color Matrix.
- Preserved homepage component-only composite rendering.
- Preserved `/basics/` component plus synthesis behavior.

## Non-Goals

- Did not change identity data values.
- Did not change routes, copy, selectors, tabs, or localStorage behavior.
- Did not restore the Chart.js CDN.
- Did not apply the special glow to mono Black or synthesized composite datasets.

## Acceptance Notes

- Homepage Rakdos renders `Black` and `Red` datasets only, with Black carrying the glow flag.
- Homepage Dimir renders `Blue` and `Black` datasets only, with Black carrying the glow flag.
- Homepage Simic has no Black glow flag.
- Homepage mono Black has no composite glow flag.
- `/basics/` composite identities with Black components get Black-only glow metadata while synthesis behavior remains unchanged.
- Static scans, route checks, browser smoke, and `npm.cmd test` passed.

# VM-088 - newIndex2 Auto-Cycling Mana Lens Showcase

ID: VM-088
Title: newIndex2 Auto-Cycling Mana Lens Showcase
Status: in-progress
Type: Frontend / Focused Enhancement
Area: Home Preview, Hero Mana Lens
Priority: high
Created: 2026-05-20

## Summary

Replace the `newIndex2.html` hero Mana Lens picker with a passive auto-cycling showcase that rotates through all existing mono colors, Ravnica guilds, and Strixhaven colleges.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `newIndex2.html`

## Scope

- Update only the hero Mana Lens preview in `newIndex2.html`.
- Remove hero picker controls and manual identity selection.
- Keep composite component-plus-synthesis datasets from VM-086.
- Keep lower Magic Basics, Color Matrix, `vmRadar`, routes, root files, and shared files untouched.

## Acceptance Criteria

- Mana Lens cycles through all 20 existing identities in curated order.
- The default cycle timing is `1500ms`, documented inline for easy tuning.
- Hover/focus pauses cycling; leaving/resolving focus resumes it.
- Hidden tab pauses cycling; visible tab resumes it.
- Reduced motion renders once and does not start the interval.
- Static checks, browser smoke, route checks, and `npm.cmd test` pass.

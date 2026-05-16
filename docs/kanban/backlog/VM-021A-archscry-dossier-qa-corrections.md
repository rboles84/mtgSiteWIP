# VM-021A - Archscry Dossier QA Corrections

ID: VM-021A
Title: Archscry Dossier QA Corrections
Status: backlog
Type: UX / reliability
Area: Archscry, Maze
Priority: high
Created: 2026-05-16

## Summary

Apply the small QA corrections from VM-021: move Adjacent Fits directly under Primary Placement, keep Flavor Echoes and Mana Base in the requested order, make the Maze return action more visible and anchor-aware, and correct MTGDecks commander links to deterministic commander slugs without the misleading `-commanders` suffix.

## Source

- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`

## Acceptance Criteria

- Adjacent Fits sits directly under Primary Placement.
- Why This Fits You follows Adjacent Fits.
- Flavor Echoes sits near the identity/story portion.
- Commander Deck Starts comes before Mana Base.
- Maze Discovery stays later in the dossier.
- Maze return is visually obvious and returns to a section anchor when available.
- Commander-specific MTGDecks links use `/Commander/<slug>` without the `-commanders` suffix.

## Notes

Keep this as a small correction pass only. No redesign, no scoring changes, no QR work, no route changes.

# VM-007 - Commander Dossier Quality and Link Follow-Up

ID: VM-007
Title: Commander Dossier Quality and Link Follow-Up
Status: backlog
Type: Tech Debt / UX
Area: Commander Compass
Priority: medium
Created: 2026-05-15

## Summary

Track the remaining Commander dossier quality work that the current audit still flags, and keep the deck-link routing and commander-facing copy honest as the recommendation surface continues to mature.

## Source

- `docs/handoffs/2026-05-14-2243-codex-cleanup-batch-1-foundation.md` - notes that `npm run dossier:audit` still reported 47 warnings and that the warnings remain a future content-quality review item.
- `docs/reference/commander-faction-guidance.md` - includes copy and bleed warnings that should keep commander-facing language grounded.
- `docs/architecture/project-atlas.md` - states that Commander deck-link routing is presenter-layer logic and that Strixhaven colleges map to guild/color analogs for directory links.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\_index.md` - lists V1.5 archetype-guided recommendations and the 32-Deck Challenge as the next Commander Compass tracks.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\01-project-and-strategy\\business-overview-and-pitch.md` - describes Commander Compass as the bridge from placement to commander directions, with honest fit and exploration language.

## Acceptance Criteria

- Audit warnings are reduced, triaged, or clearly documented as accepted future work.
- Commander recommendation copy stays commander-native and does not leak system or implementation phrasing.
- External commander deck links continue to resolve through the routed directory conventions the project standardizes on.
- Any remaining content-quality issue is linked to backlog work instead of being treated as delivered.

## Dependencies / Related Work

- VM-005 link routing and copy reliability
- Existing dossier audit baseline
- Commander Compass recommendation copy conventions

## Files Likely Impacted

- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `docs/reference/commander-faction-guidance.md`
- `research/audit-dossiers.mjs`
- `docs/handoffs/*.md`

## Risks / Uncertainties

- External directory behavior can drift even when the local route logic is correct.
- Content warnings may require editorial judgment rather than code changes.
- Copy cleanup can accidentally flatten useful nuance if it is treated too mechanically.

## Implementation Prompt

Close the gap between the current Commander dossier audit and the intended Commander-first presentation by tightening copy, link routing, and any unresolved warnings that still matter to users.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The audit is either clean or the remaining warnings are explicitly tracked with rationale.
- Commander-facing links and copy have been reviewed against the current routing and tone conventions.

## Human Review

Yes - the remaining work depends on editorial judgment and live link behavior.

## Notes

This is intentionally broader than a single warning-fix ticket so future dossier cleanup can be grouped instead of scattered.


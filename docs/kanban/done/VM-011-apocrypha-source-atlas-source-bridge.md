# VM-011 - Apocrypha Source Atlas and Source Bridge

ID: VM-011
Title: Apocrypha Source Atlas and Source Bridge
Status: done
Type: Enhancement
Area: Apocrypha
Priority: medium
Created: 2026-05-15
Completed: 2026-05-20
Updated: 2026-05-21

## Summary

Rebuild Apocrypha as a browse-first archive console, then refine it into a calmer source-group-first archive page with public-safe methodology framing, featured dossier previews, and a compatibility route that preserves the legacy `/library/` entrypoint.

## Source Evidence

- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-20-1043-codex-vm079-newindex2-living-index-visual-hierarchy.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/design/visual-style-guide.md`
- `docs/architecture/project-atlas.md`
- `apocrypha/index.html`
- `docs/handoffs/2026-05-21-1356-codex-vm011-apocrypha-source-group-simplification.md`
- User-provided Apocrypha archive-console implementation plan

## Problem

The earlier Apocrypha page was still a compact source list. It exposed valid links, but it did not yet read like the public provenance layer described by Vox Mana's current homepage and dossier direction.

## Acceptance Criteria

- `/apocrypha/` reads as an archive console rather than a plain bookmark page.
- Existing valid public source links are preserved and reorganized into the new wing structure.
- The page includes hero, mission, basics, wing panels, dossier previews, source ledger, method flow, redaction notice, and open-shelf sections.
- No fake search, filter, tab, or unwired radar controls are introduced.
- `/library/` remains usable as a compatibility route and forwards into `/apocrypha/`.
- Public-safe methodology language is present without exposing private scoring, prompts, or raw extraction logic.

## Testing Notes

- Static checks confirmed the required anchors, rail wiring hooks, and absence of Chart.js or fake control copy on the Apocrypha route.
- Browser verification confirmed `/apocrypha/` load, `/library/` forwarding, topbar presence, reduced-motion toggle, reveal behavior, sticky rail behavior, and mobile layout.
- Local route checks confirmed `/apocrypha/` and `/library/` return 200.
- `npm test` passed.
- `git diff --check` passed for authored files in this change set.

## Notes

- `/apocrypha/` remains the canonical public route.
- `/library/` is now a documented compatibility alias, not a missing page.
- Local research files remain summarized rather than exposed as public links until their own routes are intentionally published.
- 2026-05-21 refinement: Source Groups now appear above Public Sources, the archive status block uses `10 public sources`, `5 source groups`, and `2 private method areas`, and the page copy is simplified to read as a research archive instead of a secret-system briefing.
- 2026-05-21 visitor-first retarget: Apocrypha now centers the public reference library, groups all 10 live public links by type with visible `Used for:` notes, and demotes the old internal archive-browser framing in favor of a simpler reference-room flow.

## Human Review

Yes - this page should be skimmed in-browser because it is both a product narrative surface and a route-compatibility change.

# VM-011 - Apocrypha Source Atlas and Source Bridge

ID: VM-011
Title: Apocrypha Source Atlas and Source Bridge
Status: backlog
Type: Enhancement
Area: Apocrypha
Priority: medium
Created: 2026-05-15

## Summary

Track the next Apocrypha step as a browse-first source atlas: a relationship-aware library with source cards, crossings, reading routes, and a deliberate bridge back into current search or placement context.

## Source

- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\06-apocrypha-library\\curated-atlas-recommendation.md` - reframes the library as a browse-first curated knowledge graph with source cards, the relationship layer, Crossings, and reading routes.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\06-apocrypha-library\\interactive-lore-library-framework.md` - explores guild-specific source organization and source-card UX patterns.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\06-apocrypha-library\\_index.md` - describes Apocrypha as the browse-first source library and lore/research reference page.
- `docs/architecture/project-atlas.md` and `docs/design/implementation-notes.md` - identify `/apocrypha/` as the Apocrypha surface and note that the page assets and components are still being finalized.

## Acceptance Criteria

- The library is organized around source cards rather than a plain bookmark list.
- Crossings, routes, or related-source relationships are visible in the information architecture.
- Broken or unfinished source links are hidden, flagged, or otherwise not mistaken for complete content.
- Placement or search context can bridge into source trails without making the library feel disconnected from the rest of Vox Mana.

## Dependencies / Related Work

- Source inventory and metadata model
- Current `library/` shell and shared topbar/theme treatment
- Future import or curation workflow for source notes

## Files Likely Impacted

- `apocrypha/index.html`
- `assets/js/shared.js`
- `assets/css/components.css`
- `assets/img/backgrounds/background-apocrypha-library-clean-01.webp`
- `assets/img/overlays/overlay-library-warm-light-01.svg`
- `docs/architecture/project-atlas.md`
- `docs/design/implementation-notes.md`

## Risks / Uncertainties

- It is easy to overbuild an atlas and lose the browse-first simplicity.
- Source-link health can become a maintenance burden if the library ships without clear curation rules.
- The visual design could drift into mood-board territory if the relationship model is not strong enough.

## Implementation Prompt

Build Apocrypha as a source atlas with explicit relationships and a clear bridge from the rest of Vox Mana into the lore trail.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The library reads as a curated source graph instead of a plain list of links.
- Relationship, route, and source-health rules are documented well enough for future content work.

## Human Review

Yes - this is a product and content-architecture story that should be reviewed before implementation.

## Notes

Keep this broad enough to cover the library structure and the source-trail concept together.


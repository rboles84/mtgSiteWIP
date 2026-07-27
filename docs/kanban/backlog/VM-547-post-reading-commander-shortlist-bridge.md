# VM-547 - Post-Reading Commander Shortlist Bridge

ID: VM-547
Title: Post-Reading Commander Shortlist Bridge
Status: backlog
Type: Enhancement / Product Bridge
Area: Archscry, Commander Compass, Commander discovery
Priority: medium
Created: 2026-07-25

## Summary

Strengthen the Archscry result-to-commander handoff so a user who finishes a placement reading immediately understands which commander shapes, tags, and browsing paths to try next without turning Vox Mana into a generic ranked commander database.

## Source

- `docs/kanban/done/VM-546-edhmatch-comparison-review.md` - identified EDHMatch's practical ranked-shortlist clarity as useful, while preserving Vox Mana's identity-first lane.
- `docs/handoffs/2026-07-25-2116-codex-vm546-edhmatch-comparison-review.md` - recommends a clearer post-reading commander shortlist bridge.
- `docs/kanban/backlog/VM-008-commander-compass-v1-5-archetype-guided-recommendations.md` - existing broader Commander Compass recommendation-quality story.
- `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md` - related returning-user fit-check story.
- `archscry/index.html` and `assets/js/index.js` - current Archscry result and dossier surfaces.

## Problem

Vox Mana's dossier explains identity, adjacent fits, card signals, mana notes, and browsing starts well, but a user expecting EDHMatch-style immediacy may still ask: "Which commander do I build next?"

## Proposed Outcome

After a reading, `Commander Browsing Starts` or an adjacent dossier lane becomes a more explicit shortlist bridge:

- First commander shapes to explore.
- Best-fitting tag clusters and strategy lanes.
- A few curated starter commander examples when safely available.
- "Skip if" or "stretch if" warnings that keep the advice honest.
- Links into existing EDHREC, Archidekt, MTGDecks, Scryfall, and Maze paths without inventing a new commander database.

## Acceptance Criteria

- The bridge preserves Vox Mana's identity-first framing and does not present raw popularity as truth.
- The user sees a practical next-step commander direction immediately after finishing Archscry.
- Recommendation copy includes fit, tension, and next-step exploration language.
- External links remain clearly labeled as browsing paths, not canonical Vox Mana rankings.
- The scope remains distinct from VM-008's broader V1.5 recommendation layer and VM-015's returning-user named-commander fit check.

## Non-Goals

- Do not rebuild EDHMatch's ranked commander database.
- Do not change placement scoring, placement model data, source-governed semantics, or generated faction facts.
- Do not add account persistence, deck import, private deck saving, or a new commander schema in this card.
- Do not certify commander legality or prices unless a separate source-authority/data pipeline card explicitly covers that.

## Dependencies / Related Work

- VM-008 Commander Compass V1.5 Archetype-Guided Recommendations.
- VM-015 Returning User Commander Fit Check.
- Existing Commander dossier and external browsing link helpers.
- Scryfall and precon recommendation enrichment surfaces.

## Files Likely Impacted

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `assets/css/archscry.css`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`

## Risks / Uncertainties

- Over-indexing on examples could make the result feel like a hard recommendation rather than a direction.
- Current commander examples depend on available source/index quality and should stay conservative.
- This may overlap with VM-008 if implementation scope grows; split if needed.

## Implementation Prompt

Design and implement a compact post-reading commander shortlist bridge that turns the Archscry dossier into practical commander exploration while preserving Vox Mana's identity-first voice and avoiding raw ranked-database behavior.

## Delivery / Removal Criteria

This card can be marked delivered when:

- A completed Archscry reading gives a clearer commander-next-step bridge.
- The bridge is validated in desktop/mobile QA and does not regress existing dossier navigation.
- Documentation and manual QA notes explain the boundary between identity fit, external browsing, and actual commander rankings.

## Human Review

Yes - this is a product positioning and player-trust surface.


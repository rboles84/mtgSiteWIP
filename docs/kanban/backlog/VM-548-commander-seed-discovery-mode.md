# VM-548 - Commander Seed Discovery Mode

ID: VM-548
Title: Commander Seed Discovery Mode
Status: backlog
Type: Enhancement / Discovery Mode
Area: Archscry, Commander Compass, Maze / Loom
Priority: medium
Created: 2026-07-25

## Summary

Explore a future discovery path where a user starts from commanders they already like, then Vox Mana translates those commander seeds into identity signals, strategy lanes, and adjacent exploration paths.

## Source

- `docs/kanban/done/VM-546-edhmatch-comparison-review.md` - identified EDHMatch's Commander DNA positioning as a useful adjacent concept.
- `docs/handoffs/2026-07-25-2116-codex-vm546-edhmatch-comparison-review.md` - recommends a future commander-seed / DNA-like discovery path.
- `docs/kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md` - related future graph/query and Commander Finder mode.
- `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md` - related named commander or precon fit-check story.
- `docs/kanban/backlog/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md` - later saved taste/deck history lane.

## Problem

Archscry starts from table instincts. Some players know their taste through commanders they already love instead: "I like Muldrotha, Shorikai, and Alela; what does that say about me, and where should I look next?"

## Proposed Outcome

A future mode accepts a small set of commander names and returns a Vox Mana interpretation:

- Shared strategy and color-identity signals.
- Likely placement or nearby identity expressions.
- Commander lanes that explain why those seeds resonate.
- Adjacent stretches and surprising nearby paths.
- Existing Maze/Commander Compass links for deeper exploration.

## Acceptance Criteria

- The mode is framed as commander-seed interpretation, not a pure similarity engine.
- The feature reuses existing Scryfall/commander indexes, placement language, and Commander Compass guidance where possible.
- Output explains identity, strategy, and play-pattern evidence separately enough to be trustworthy.
- Unknown, illegal, ambiguous, or unavailable commander names fail gracefully.
- The mode stays distinct from the standard Archscry quiz and from the returning-user single-commander fit check in VM-015.

## Non-Goals

- Do not implement a full EDHMatch Commander DNA clone.
- Do not add account-bound deck history, collection ingestion, or decklist import in this card.
- Do not change Archscry placement scoring or certified semantic identity data.
- Do not treat favorite commanders as official color-pie/lore proof without source-aware boundaries.

## Dependencies / Related Work

- VM-010 The Loom Commander Finder Mode and Graph/Query Layer.
- VM-015 Returning User Commander Fit Check.
- VM-008 Commander Compass V1.5 Archetype-Guided Recommendations.
- Scryfall commander index and local tag/theme taxonomy.
- Future source-authority decisions if commander facts need stronger validation.

## Files Likely Impacted

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `research/` Maze or Loom modules if hosted there
- `data/scryfall/indexes/commander-index.json`
- `data/taxonomy/vox-mana-tags.json`
- `docs/architecture/project-atlas.md`
- `docs/reference/data-contracts.md`

## Risks / Uncertainties

- Commander-seed interpretation can overfit to color identity and miss the player's actual reason for liking a commander.
- Scryfall and local tags may not contain enough nuance for a trustworthy explanation without a small curated interpretation layer.
- The feature may belong in Maze/Loom rather than Archscry depending on interaction design.

## Implementation Prompt

Plan and prototype a commander-seed discovery mode that lets players name commanders they already love, then returns a Vox Mana interpretation of shared signals, nearby identities, and next exploration paths without replacing Archscry's quiz.

## Delivery / Removal Criteria

This card can be marked delivered when:

- A user can enter multiple commander seeds and receive a conservative identity/strategy interpretation.
- Ambiguous or missing commander names have clear recovery behavior.
- Documentation explains where this mode lives and how it differs from Archscry, Commander Compass, VM-015, and VM-010.

## Human Review

Yes - this shapes a new discovery path and needs product/voice review before implementation.


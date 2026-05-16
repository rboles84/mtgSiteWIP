# VM-008 - Commander Compass V1.5 Archetype-Guided Recommendations

ID: VM-008
Title: Commander Compass V1.5 Archetype-Guided Recommendations
Status: backlog
Type: Enhancement
Area: Archscry, Commander Compass
Priority: medium
Created: 2026-05-15

## Summary

Track the next Commander Compass step after the current v1 work: archetype-guided recommendations that explain why a commander fits, what the fit means, and where the user should look next without collapsing into raw popularity.

## Source

- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\04-roadmap.md` - explicitly calls out V1.5 archetype-guided recommendations as future work.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\_index.md` - lists the V1.5 recommendation pass alongside the canonical Commander Compass set.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\01-project-and-strategy\\business-overview-and-pitch.md` - frames Commander Compass around Native Fit, Weird Stretch, and exploration language rather than pure popularity.
- `docs/project-atlas.md` - describes Commander recommendations as a presenter-layer surface fed by the placement result and routed commander links.

## Acceptance Criteria

- Recommendation cards use archetype-guided reasoning instead of simple popularity sorting.
- Each recommendation explains fit, tension, and next-step exploration in Commander-first language.
- Confidence or evidence labeling is visible enough that users can tell why the card is present.
- The v1 surface remains honest about its limits and does not pretend to be a full account-bound recommender yet.

## Dependencies / Related Work

- Commander Compass v1 data foundation
- Placement model and taste profile derivation
- VM-007 dossier quality and routing follow-up
- VM-009 account and saved-profile work if persistence is needed later

## Files Likely Impacted

- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `docs/core-logic-and-algorithms.md`
- `docs/data-contracts.md`
- `data/commander-recommendations.json` or the eventual generated equivalent

## Risks / Uncertainties

- Archetype guidance can drift into vague flavor language if it is not anchored to evidence.
- Overconfident recommendations would make the surface feel less trustworthy.
- This card may eventually split into curation, ranking, and copy work.

## Implementation Prompt

Build the next Commander Compass recommendation layer so it can speak in archetypes and evidence, not just in raw placement matches.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- Commander recommendations have archetype-guided explanation lanes and visible confidence/evidence cues.
- The v1 surface still reads as a disciplined bridge from placement to commander discovery.

## Human Review

Yes - this is a product-shaping recommendation story and should be reviewed before implementation.

## Notes

Keep this scoped to V1.5 recommendation quality, not the full account-bound 32-Deck Challenge.

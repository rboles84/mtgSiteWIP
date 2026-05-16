# VM-015 - Returning User Commander Fit Check

ID: VM-015
Title: Returning User Commander Fit Check
Status: backlog
Type: Enhancement
Area: Commander Compass
Priority: medium
Created: 2026-05-15

## Summary

Give returning users who already have a saved Archscry placement a simple question: does this commander or precon fit me? The feature should reuse the saved taste profile and Commander Compass guidance so the answer feels like a continuation of their existing result, not a new onboarding flow.

## Source Evidence

- `docs/project-atlas.md` - saved-return flow already keys off `VM_SESSION.profile.placementResult`, and Commander Compass is the presenter-layer bridge from placement to commander discovery.
- `docs/data-flow-map.md` - `placement_result` is the saved-return source of truth, and `VM_SESSION` carries the auth/session profile state.
- `docs/manual-test-cases.md` - the Returning user and Legacy fallback cases already define the saved-result and no-`placement_result` behavior this story should respect.
- `docs/core-logic-and-algorithms.md` - `vm_resumeSession()` restores the existing profile/result contract and `vm_savePlacementResult()` persists the normalized placement result.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\01-current-state.md` - Commander Compass is already an implemented recommendation layer with Native Fit and Weird Stretch lanes.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\02-v1-product-spec.md` - V1 defines Commander Compass as a commander-direction layer with fit / skip style guidance and explicitly avoids account-required saving or deck import.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\01-project-and-strategy\\business-overview-and-pitch.md` - frames the precon problem, saved taste profiles, and Commander Compass as the bridge from placement to commander exploration.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\_archive\\commander-compass-master-plan.md` - archived background for precon-starting / precon-upgrader thinking.

## Problem

Returning users already have taste data in their saved Archscry result, but the product does not yet have a dedicated Commander Compass question for a specific commander or precon. Without that, fit checks are buried inside broader recommendation flow or require the user to re-run Archscry instead of continuing from their saved profile.

## Proposed Outcome

A returning user can name a commander or precon and get a concise, evidence-backed fit verdict that reuses their saved placement result, explains why it fits or stretches, and gives a clear skip/follow-up path when it is not a good match.

## Acceptance Criteria

- [ ] The story is a standalone Commander Compass backlog enhancement with no schema or runtime implementation changes attached.
- [ ] The fit check uses the saved `placement_result` / resumed profile as the user's taste source when one exists.
- [ ] The response supports a named commander or precon input and returns a short fit verdict plus `why this fits` / `skip if` guidance.
- [ ] The fallback path is explicit when no saved profile exists, directing the user back to Archscry or saved-return setup without failing silently.
- [ ] The story stays distinct from `VM-008` Commander Compass V1.5 recommendations and `VM-009` 32-Deck Challenge persistence work.

## Non-Goals

- This is not full decklist ingestion or deck import.
- This is not account-history or challenge-tracking work.
- This does not add new schema, API, or data-contract fields.
- This does not turn Commander Compass into a popularity-only ranking system.

## Dependencies / Related Work

- `VM-005` Archscry / Maze continuity and link reliability.
- `VM-008` Commander Compass V1.5 archetype-guided recommendations.
- `VM-009` 32-Deck Challenge, saved taste profile, and deck import later.
- Existing session/profile resume and saved-placement contract.

## Testing Notes

- Future implementation should add or extend manual QA coverage for the saved-result returning-user path and the no-profile fallback path in `docs/manual-test-cases.md`.
- Future tests should cover named commander/precon input, short fit verdict output, and graceful fallback when the commander is unknown.
- This backlog card itself should not require runtime tests or schema checks.

## Delivery / Removal Criteria

This enhancement can be marked delivered or removed from the active enhancement list when:
- [ ] Returning users with a saved profile can ask the fit question and get a Commander Compass result without re-running Archscry.
- [ ] Users without a saved profile get a clear fallback path instead of a broken or ambiguous response.
- [ ] The story is either implemented or explicitly split into a more specific follow-up if decklist ingestion or persistence scope expands.

## Human Review

Yes - this is a product-shaping Commander Compass story and needs a human to confirm fit language, fallback behavior, and scope boundaries.

## Notes

Keep this broad and Commander-facing. Use existing placement/profile data rather than inventing a new taste model.

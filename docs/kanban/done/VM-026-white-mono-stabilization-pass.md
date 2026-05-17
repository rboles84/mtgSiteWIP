# VM-026 - White Mono Stabilization Pass

ID: VM-026
Title: White Mono Stabilization Pass
Status: done
Type: data / routing / regression
Area: Archscry, Maze discovery paths, mono White
Priority: high
Created: 2026-05-17

## Summary

Stabilize White as the mono reference implementation by correcting mono-white external directory slugs and fixing the White flavor-echo query defect without widening into cross-identity cleanup.

## Source

- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-16-1308-codex-vm021b-maze-return-bar-removal-mtgdecks-url-lockdown.md`
- User-requested White stabilization constraints on 2026-05-17

## Acceptance Criteria

- White EDHREC mono directory resolves to `/commanders/mono-white`.
- White MTGDecks mono directory resolves to `/Commander/mono-white-commanders`.
- Commander-specific links remain on their current working shapes.
- White flavor-echo discovery no longer picks up `rot` / `decay` from `protection`.
- Legitimate `rot` matches still work when the text actually contains `rot`.
- White golden-path behavior remains White primary fit at 100% purity with no active secondary influence.
- `commanders-that-fit`, `support-cards`, and `weird-stretch-commanders` remain unchanged unless strictly required for White correctness.

## Dependencies / Related Work

- `VM-023` mono identity layer pilot
- `VM-021A` / `VM-021B` Commander routing separation

## Files Likely Impacted

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `research/build-faction-artifacts.mjs`

## Risks / Uncertainties

- White shares matcher rails with other identities, so any shared fix must stay surgical.
- Mono directory routing and commander-specific routing must remain separate.
- Generated outputs must stay aligned with authored source data after the fix.

## Implementation Prompt

Make only the minimum White-focused fixes needed to stabilize White as the mono template, and verify the preserved White golden path before widening into Black.

## Delivery / Removal Criteria

This card can move to done when the White routing and flavor-echo defects are fixed, the preserved White golden path still passes, and the handoff documents the exact before/after queries and slugs.

## Human Review

Yes - this is a regression-sensitive White-only stabilization pass.

## Notes

Do not widen into taxonomy redesign, placement scoring changes, or non-White identity authoring in this pass.

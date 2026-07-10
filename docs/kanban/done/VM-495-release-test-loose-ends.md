# VM-495 - Release Test Loose Ends

## Status

Complete

## Summary

Resolved the remaining release-test loose ends after VM-494: Home Lighthouse is above threshold, reviewed local visual baselines are current and deterministic, repeated validation no longer dirties tracked audit outputs, and the unproven private Archscry deck-link panel is disabled behind an explicit flag.

## Scope Completed

- Lazy-loaded Home Chart.js after initial page load while preserving the full radar interaction.
- Added production-like gzip delivery to the Lighthouse harness and corrected the Home color-axis ARIA role.
- Reviewed Home, Archscry, Strategium, and Apocrypha desktop/mobile captures before refreshing ignored local baselines.
- Stabilized Home visual capture by waiting for the lazy chart and freezing SVG SMIL animation time.
- Preserved deck-link implementation code while preventing its panel/tab from rendering until VM-446 live RLS proof succeeds.
- Stabilized gate-compression report timestamps and normalized generated Lighthouse report whitespace.
- Ran the complete finite local test sweep.

## Acceptance Results

- Lighthouse: Performance `91`, Accessibility `100`, LCP `1.9 s`.
- Home visual compare: mobile/tablet/desktop `0` mismatched pixels on consecutive runs.
- Archscry visual compare: all 16 captures `0` mismatched pixels.
- Strategium visual compare: all four captures `0` mismatched pixels.
- Apocrypha visual compare: all three captures `0` mismatched pixels.
- Full deterministic/package suite passed.
- `test:deck-links:live` was executed and stopped before network access because the five required dedicated test credentials are absent. The private UI remains disabled, so VM-446 stays a conditional reactivation gate rather than a shipped release blocker.

## Guardrails Preserved

- No Lighthouse or visual mismatch threshold was weakened.
- No live Supabase write was attempted.
- No secret value was printed or persisted.
- No dependency, lockfile, external Scryfall data, schema, or visual design change was introduced.
- Visual baseline PNGs remain ignored local QA artifacts and are not presented as remote CI evidence.

## Related Work

- VM-392 Lighthouse Home Performance Readiness.
- VM-450 Visual Baseline Acceptance And Waiver Cleanup.
- VM-458 Deck Saving Deferral And Archscry Surface Suppression.
- VM-494 Dirty Tree Recovery And Main Promotion.
- VM-446 VM-422 Live Private Deck-Link RLS Proof remains backlog/conditional.

# VM-378 - Strixhaven Non-Lorehold UX Richness

ID: VM-378
Title: Strixhaven Non-Lorehold UX Richness
Status: done
Type: source-intake / raw enrichment / dossier support
Area: raw-factions / Strixhaven / Commander support
Priority: high
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Promoted verified, ledgered Strixhaven non-Lorehold enrichment for `PRISMARI`, `QUANDRIX`, `SILVERQUILL`, and `WITHERBLOOM`.

## Completed Scope

- Added official Strixhaven Commander product support rows and local Scryfall flavor-anchor support rows.
- Added support-only Commander Compass, `deck_links`, and `research_links` for all four target colleges.
- Added source-backed public figure/product anchors and per-card flavor summaries.
- Re-enabled generated raw enrichment for the four colleges after readiness-matrix classification.
- Removed stale deferred dean/founder/discovery names from public search metadata.

## Guardrails Preserved

- `docs/research/VM-378-379-380_source-intake.md` remained intake-only.
- Prismari dean claims, Silverquill dean claims, Galazeth founder status, Beledros founder status, and other uncaptured dean/founder names remain deferred.
- Commander/deck rows are support/navigation only.
- No public API, schema, route, Home preview, alias, hero, staging, or commit work was performed.

## Acceptance Criteria

- [x] Source/evidence rows and readiness matrix authorize restored public richness.
- [x] Raw enrichment is source-backed and avoids unsupported story/dean/founder claims.
- [x] Support-only Commander Compass, deck links, and research links surface only after verified product/source rows.
- [x] Generated Strixhaven richness surfaces only when matrix-backed.
- [x] Tests and handoff are recorded.

## Verification

- JSON-parsed target raw packets.
- Ran `npm.cmd run build:factions`.
- Ran target source/generated validation for `PRISMARI,QUANDRIX,SILVERQUILL,WITHERBLOOM`.
- Ran focused deferred-name/source-surface assertion.
- Ran `npm.cmd run test:placement`.
- Ran `npm.cmd run dossier:audit`.
- Ran `npm.cmd test`.
- Ran `npm.cmd run test:parser`.

## Related

- `docs/reference/strixhaven-college-source-readiness-matrix.md`
- `docs/research/VM-378-379-380_source-intake.md`
- Handoff: `docs/handoffs/2026-06-13-1826-codex-vm378-379-380-source-bound-repair.md`

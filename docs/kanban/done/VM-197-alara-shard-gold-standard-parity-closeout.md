# VM-197 - Alara Shard Gold-Standard Parity Closeout

ID: VM-197
Title: Alara Shard Gold-Standard Parity Closeout
Status: done
Type: Parity / Architecture Alignment
Area: Archscry, Identity Layers, Commander Compass, Documentation
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Summary

Close the Alara shard parity lane now that live data has 25 placement expressions: `BANT`, `ESPER`, `GRIXIS`, `JUND`, `NAYA` plus the original 20-expression baseline.

This is a parity closeout and architecture-alignment card, not a new shard expansion.

Keep shard expression keys as shard names only. `WUG`/`WUB`/`UBR`/`BRG`/`RGW` may remain color-direction/query metadata, but must not become expression keys, public aliases, route keys, placement keys, dossier keys, or Home preview identifiers.

## Scope

- Run AGENTS pre-flight before edits, including current board state, recent shard handoffs, placement-domain docs, identity-layer registry/schema, Commander Compass contracts, and generated artifact workflow.
- Fill missing Grixis Commander Compass display/support data from existing local support sources only.
- Update stale placement-domain architecture documentation to the current 25-expression live placement set.
- Update identity-layer meta notes for the current live set while preserving the 20-expression Home preview.
- Conditionally harden identity-layer schema if existing tests and generated artifacts already treat all five shards as permanent live peers.

## Acceptance Criteria

- `GRIXIS.commander_compass` exists in generated faction display data and stays support-only.
- Grixis Commander candidate links use exact `id=ubr is:commander f:commander` boundaries.
- Support/deck/starter-card lanes use subset-color searches only where existing Commander Compass contracts treat them as support-card lanes.
- `WUG`, `WUB`, `UBR`, `BRG`, and `RGW` are not public expression keys, public aliases, route keys, placement keys, dossier keys, or Home preview identifiers.
- All five shards remain `preview_eligible: false`.
- Home preview remains the original 20-expression set.
- `docs/architecture/placement-domains.md` documents 20 baseline + 5 Alara shards = 25 live placement expressions and raw source coverage at 20 faction folders.
- Generated artifact diffs are limited to expected shard parity output from updated local data.

## Out Of Scope

- Placement scoring changes
- Question bank changes
- Home preview expansion
- Maze behavior changes
- Route changes
- Raw lore claim changes
- Raw-faction folder additions, deletions, or renames
- Manual edits to generated faction artifacts

## Tests

- `npm.cmd run build:factions` - passed
- `npm.cmd run test:placement` - passed
- `npm.cmd test` - passed
- `npm.cmd run audit:factions` - passed

## Related

- `docs/handoffs/2026-05-31-0006-codex-vm193-grixis-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0019-codex-vm194-bant-live-parity-text-hardening.md`
- `docs/handoffs/2026-05-31-0026-codex-vm195-esper-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0022-codex-vm196-naya-live-parity-archscry-text-hardening.md`
- `docs/architecture/placement-domains.md`

# VM-379 - Grixis Source Depth Repair

ID: VM-379
Title: Grixis Source Depth Repair
Status: done
Type: source-intake / raw enrichment / evidence repair
Area: raw-factions / Grixis / Alara
Priority: high
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Repaired `GRIXIS` source depth without padding by promoting only source-backed claim dimensions and bounded support anchors.

## Completed Scope

- Added official/source-backed Grixis rows for the Alara plane overview and `All the Cairns of Jund`.
- Added three usable Grixis claim dimensions: undead-infested hellscape, Grixis necromancy entering Jund after Conflux, and post-convergence assaults to maim, enslave, and drain life energy.
- Added source-backed/support-only key figures and canonical flavor-summary anchors.
- Updated Grixis source/evidence/manual-fill ledgers and shard-clan readiness matrix.

## Guardrails Preserved

- Wiki-only and uncaptured intake claims remain `source-intake-needed`.
- Detailed Vithia/Sedraxis, vis economy, Bolas staging, Nefarox cults, and Sedris/Malfegor/Thraximundar biography claims were not padded into canon.
- No placement expansion, public API, schema, route, Home preview, alias, hero, staging, or commit work was performed.

## Acceptance Criteria

- [x] Source/evidence ledgers record newly promoted Grixis rows.
- [x] Raw claims/profile expose at least three usable source-backed dimensions.
- [x] Key figures and flavor anchors are source-backed and carefully bounded.
- [x] Grixis no longer has empty public figure/flavor texture when support exists.
- [x] Tests and handoff are recorded.

## Verification

- JSON-parsed target raw packets.
- Ran `npm.cmd run build:factions`.
- Ran target source/generated validation for `GRIXIS`.
- Ran focused Grixis public figure/flavor assertion.
- Ran `npm.cmd run test:placement`.
- Ran `npm.cmd run dossier:audit`.
- Ran `npm.cmd test`.
- Ran `npm.cmd run test:parser`.

## Related

- `docs/reference/shard-clan-source-readiness-matrix.md`
- `docs/research/grixis/grixis-source-ledger.md`
- `docs/research/grixis/grixis-evidence-ledger.md`
- `docs/research/grixis/grixis-manual-fill.md`
- `docs/research/VM-378-379-380_source-intake.md`
- Handoff: `docs/handoffs/2026-06-13-1826-codex-vm378-379-380-source-bound-repair.md`

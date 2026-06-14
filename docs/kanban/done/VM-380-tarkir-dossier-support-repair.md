# VM-380 - Tarkir Dossier Support Repair

ID: VM-380
Title: Tarkir Dossier Support Repair
Status: done
Type: product-support / dossier navigation
Area: raw-factions / Tarkir clans / Commander support
Priority: high
Created: 2026-06-13
Completed: 2026-06-13

## Summary

Repaired split Tarkir dossier support for `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, and `JESKAI` using verified Tarkir: Dragonstorm Commander product rows.

## Completed Scope

- Added official Tarkir: Dragonstorm Commander decklist source rows with access-date capture.
- Added support-only Commander Compass rows for `ABZAN`, `TEMUR`, and `SULTAI`.
- Added or normalized top-level `deck_links` and `research_links` for all five target clans.
- Preserved existing `MARDU` and `JESKAI` support-only Compass boundaries.
- Updated clan source/evidence ledgers and shard-clan readiness matrix.

## Guardrails Preserved

- Product rows are support/navigation only and not Tarkir canon proof.
- Clan leader and Spirit Dragon anchors remain product/navigation anchors only.
- No public API, schema, route, Home preview, alias, hero, unrelated placement expansion, staging, or commit work was performed.

## Acceptance Criteria

- [x] Official product source rows are captured with access date.
- [x] All five Tarkir identities expose source-backed Compass/deck/research surfaces or explicit blockers.
- [x] Mardu/Jeskai Compass boundaries are preserved.
- [x] Generated diffs are limited to target identities plus expected builder/test/docs outputs.
- [x] Tests and handoff are recorded.

## Verification

- JSON-parsed target raw packets.
- Ran `npm.cmd run build:factions`.
- Ran target source/generated validation for `ABZAN,TEMUR,SULTAI,MARDU,JESKAI`.
- Ran focused Tarkir Compass/deck/research assertion.
- Ran `npm.cmd run test:placement`.
- Ran `npm.cmd run dossier:audit`.
- Ran `npm.cmd test`.
- Ran `npm.cmd run test:parser`.

## Related

- `docs/reference/shard-clan-source-readiness-matrix.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/temur/temur-source-ledger.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/jeskai/jeskai-source-ledger.md`
- `docs/research/VM-378-379-380_source-intake.md`
- Handoff: `docs/handoffs/2026-06-13-1826-codex-vm378-379-380-source-bound-repair.md`

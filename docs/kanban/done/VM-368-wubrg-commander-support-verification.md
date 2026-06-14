# VM-368 - WUBRG Commander Support Verification

ID: VM-368
Title: WUBRG Commander Support Verification
Status: done
Type: Source intake / data repair
Area: WUBRG / Commander support / source ledgers
Priority: high
Created: 2026-06-13

## Summary

Verify `Draconic Domination` and `Painbow` against official/current decklist support, and promote those WUBRG rows only if the local row, commander identity, product name, and official/current deck source agree.

## Scope

- Re-read VM-367 WUBRG source/raw/manual-fill context before editing.
- Capture official/current decklist sources for `Draconic Domination` and `Painbow`.
- Update WUBRG source and evidence ledgers before consuming any new source in raw files.
- Update WUBRG Commander Compass and deck links only through canonical raw/source plus builder flow.
- Preserve existing valid support-only rows unless source agreement fails.

## Out Of Scope

- No popularity, ranking, metagame, price, legality, lore proof, or representative play-pattern inference from deck existence alone.
- No public API, schema, route, Home preview, alias expansion, hero asset, directory-link expansion, staging, or commits.

## Acceptance Criteria

- [x] Official/current source agreement is recorded for `Draconic Domination` and `Painbow`, or the deferral remains explicit.
- [x] Promoted rows remain `support-only`.
- [x] WUBRG source/evidence/manual-fill/raw files agree.
- [x] Generated WUBRG deck links are rebuilt from canonical source.
- [x] Required WUBRG validation and placement/dossier tests pass or failures are reported.

## Completion Notes

- Added official Wizards decklist support rows for `Draconic Domination` and `Painbow`, plus local commander-identity cross-check support.
- Promoted both products only as support-only Commander/product texture. No popularity, ranking, metagame, legality, lore proof, or representative play-pattern claims were inferred.
- Rebuilt generated artifacts through `npm.cmd run build:factions`.

## Validation

- `node research/validate-source-generated-guardrails.mjs WUBRG`
- `npm.cmd run test:placement`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:parser`

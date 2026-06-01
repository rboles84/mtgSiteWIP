# VM-221 - Temur Live Parity And Archscry Text Hardening

ID: VM-221
Title: Temur Live Parity And Archscry Text Hardening
Status: done
Type: Runtime Copy / Dossier Quality
Area: Temur Frontier, Archscry, Commander Dossier
Priority: high
Created: 2026-05-31
Updated: 2026-05-31

## Summary

Harden Temur's live Archscry and Commander dossier presentation after VM-208 so the mature live surface avoids fallback copy, public `GUR` shorthand, route-like language, Atarka continuity leakage, Dragonstorm backfill, Commander-product-as-canon framing, and unsupported mechanics-as-canon compression.

## Final Result

Result: `live-parity-complete`

VM-221 hardened Temur visible Archscry and Commander dossier wording without changing raw claims, raw sources, research docs, architecture docs, placement tuning, builder mappings, generated artifacts, Home preview membership, Maze behavior, routes, schemas, fixtures, or Supabase files.

## Safety Guard

Final result must be one of:

- `live-parity-complete`
- `live-parity-blocked-raw-hash-mismatch`
- `live-parity-blocked-scope-leakage`
- `live-parity-blocked-test-failure`

Use the VM-208 handoff as the source of truth for protected Temur raw hashes:

- `data/raw-factions/temur/temur.claims.json`: `C2C7839BE001619C2A5BEA0F2CAC2838FDC94C632AFFC3C7CC5888F79800E029`
- `data/raw-factions/temur/temur.sources.json`: `D2D2C96E40D78BE58E9BB5FA2AC414F6738074E611237C56412E9B551C4C3435`

Do not retune placement scoring, priors, inhibition, expression counts, generated placement records, or builder mappings.

## Scope

- Keep `TEMUR` live and placement-eligible.
- Keep `GUR` as data-level color metadata/query support only.
- Harden Temur visible Archscry and Commander dossier copy where needed.
- Add or tighten visible-copy regressions for Temur.
- Preserve Home preview at 20 entries.
- Preserve raw claims and raw sources byte-for-byte.

## Non-Goals

- Do not edit Temur raw claims or source rows.
- Do not edit Temur research or architecture docs.
- Do not edit Sultai, Jeskai, Mardu, or Abzan lane files.
- Do not edit `research/build-faction-artifacts.mjs` or `data/identity-layers.json`.
- Do not add routes, aliases, Home preview entries, Maze behavior, schemas, fixtures, Supabase config, migrations, or deployment changes.
- Do not present Commander, dragons, ramp, copying, energy, counters, X-spells, ravenous, or artifacts as Temur/Tarkir canon, card legality proof, placement evidence, or raw-claim evidence.

## Acceptance Criteria

- [x] VM-221 availability and VM-208 raw hash source are verified.
- [x] Protected Temur raw hashes match before and after.
- [x] Temur visible copy avoids public `GUR`, color-order permutations, route-like paths, Atarka continuity, Dragonstorm backfill, Commander canon, generic GUR goodstuff, and mechanics-as-canon language.
- [x] Data-level `GUR` remains limited to existing Temur color metadata/query support.
- [x] Live expression, generated faction, generated placement, and Home preview counts remain unchanged from VM-208.
- [x] No placement scoring, priors, inhibition, `RAW_TO_KEY`, identity-layer counts, generated placement records, or builder mappings are retuned.
- [x] Required tests and guard scans pass.

## Closeout Notes

- Reworded Temur Archscry mechanics/self-check copy so Commander texture reads as player-facing table texture rather than visible internal caveat language.
- Reworded Temur Commander guidance and precon fit summaries to preserve Commander/player texture without presenting products, dragons, ramp, copying, energy, counters, X-spells, ravenous, or artifacts as Temur/Tarkir canon, placement evidence, card legality proof, or raw-claim evidence.
- Added rendered/visible Temur dossier and presentation regressions covering public `GUR`, route-like paths, internal caveats, Atarka continuity, Dragonstorm backfill, and Commander-canon leakage.
- Did not refresh generated artifacts; no build was required.

## Suggested Tests

- Protected raw hash checks for `temur.claims.json` and `temur.sources.json`.
- Count checks for 27 live placement expressions, 27 generated factions, 27 generated placement records, and 20 Home preview entries.
- Visible-copy guard scans for forbidden public Temur leakage.
- Syntax checks for changed JS/test files.
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- `git diff --check`

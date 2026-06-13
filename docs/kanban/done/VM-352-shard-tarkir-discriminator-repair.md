# VM-352 - Shard And Tarkir Discriminator Repair

ID: VM-352
Title: Shard And Tarkir Discriminator Repair
Status: done
Type: placement calibration / source-bound repair
Area: raw-factions / placement / shards / Tarkir
Priority: critical
Created: 2026-06-12

## Summary

Add only source-backed discriminator repairs for thin shard and Tarkir lanes. Discriminators are not automatically Crucibles.

## Guardrails

- Use local claim-bearing or placement-relevant shaping rows only.
- Support-only Commander/deck/operator rows are not placement evidence.
- Do not add a Crucible without a named close-call pair and reproducible/source-backed confusion.
- Do not broaden unrelated scoring if placement tests regress.

## Scope

- Add one discriminator each for Esper, Grixis, Naya, and Abzan where backing supports it.
- Keep Abzan bounded against generic WBG, Dromoka-coded, Commander-product, graveyard, and toughness signals without broadening from product identity alone.
- Skip unsupported Crucibles and record why.

## Acceptance Criteria

- [ ] New discriminators cite valid local claim/source backing.
- [ ] No unsupported Crucible is added.
- [ ] Generated placement output is rebuilt, not hand-edited.

## Test Plan

- JSON parse touched raw placement files.
- Backing probe for new claim IDs.
- `npm.cmd run validate:source-generated -- --targets=ESPER,GRIXIS,NAYA,ABZAN`
- `npm.cmd run test:placement`

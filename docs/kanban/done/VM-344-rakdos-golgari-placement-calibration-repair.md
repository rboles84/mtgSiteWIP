# VM-344 - Rakdos And Golgari Placement Calibration Repair

ID: VM-344
Title: Rakdos And Golgari Placement Calibration Repair
Status: in-progress
Type: placement calibration / source-backed repair
Area: raw-factions / Ravnica guilds / placement
Priority: high
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Repair only the known discriminator softness for `BR` Rakdos and `BG` Golgari by adding exactly one source-backed discriminator to each placement file, if existing claims and sources are sufficient.

## Source

User-requested Ravnica Guild Source Normalization goal, governed by VM-300 and VM-325.

## Acceptance Criteria

- [x] Add exactly one discriminator to `data/raw-factions/cult_of_rakdos/cult_of_rakdos.placement.json` if existing claims/sources support it.
- [x] Add exactly one discriminator to `data/raw-factions/golgari_swarm/golgari_swarm.placement.json` if existing claims/sources support it.
- [x] Rakdos discriminator distinguishes theatrical truth/transgressive spectacle from generic chaos, grief, sacrifice, reckless emotion, or red-black aggression.
- [x] Golgari discriminator distinguishes decay/reclamation/cycle logic from generic resilience, generic nature, Witherbloom study, Abzan endurance, or Jund survival.
- [x] Do not add new canon claims, new sources, lore rewrites, or placement broadening.
- [x] If backing is insufficient, document the blocked finding instead of inventing.

## Files Likely Impacted

- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.placement.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.placement.json`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/kanban/board.md`

## Risks

- Existing placement content already contains calibration hints, so the repair must be additive, narrow, and exactly one discriminator per target.
- Claims sourced only by corpus discovery rows cannot justify broad new lore claims.
- Generated placement output must be rebuilt through scripts only.

## Implementation Prompt

Use existing raw claim IDs and source material only. Prefer discriminator wording that sharpens existing placement evidence rather than expanding the faction model.

## Notes

This card is one phase of the continuous VM-343 through VM-345 Ravnica guild source-normalization goal.

## Outcome

- Added `rakdos_q3`, backed only by existing `cult_of_rakdos_claim_001`, `cult_of_rakdos_claim_002`, `cult_of_rakdos_claim_005`, and `cult_of_rakdos_claim_006`.
- Added `golgari_q3`, backed only by existing `golgari_swarm_claim_001`, `golgari_swarm_claim_002`, `golgari_swarm_claim_003`, `golgari_swarm_claim_006`, and `golgari_swarm_claim_007`.
- Verified all discriminator claim IDs exist and resolve to claim-bearing official source rows.

## Validation

- BR/BG changed raw JSON parse passed.
- Claim/source-role backing probe passed.
- Full validation and generated rebuild results are recorded under VM-345.

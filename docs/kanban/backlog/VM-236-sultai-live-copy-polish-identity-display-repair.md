# VM-236 - Sultai Live Copy Polish And Identity Display Repair

ID: VM-236
Title: Sultai Live Copy Polish And Identity Display Repair
Status: backlog
Reservation State: Reserved / Not Started
Type: Runtime Copy / Dossier Quality
Area: Sultai Brood, Archscry, Commander Dossier, Precon Copy
Priority: high
Created: 2026-05-31

## Summary

Reserve a post-VM-214 manual-QA repair for Sultai's live Archscry and Commander dossier copy. This card is reserved but not started. No repair work has been implemented under VM-236.

Manual QA found that Sultai is live and functional, but several user-facing lines need polish:

- Sultai visible color identity should display the approved direction as `BGU` where public metadata shows the triplet.
- "Why Sultai Brood Rose First" can expose internal false-positive wording and awkward list construction.
- Several Sultai presentation and Commander lines repeat source-bound/resource-conversion phrases too often.
- Sultai Arisen precon copy should avoid framing the deck as generic Sultai goodstuff.
- Dark Deal truncation should be checked and left unchanged if it is the existing controlled excerpt behavior.

## Reservation Rule

This card must remain in Backlog until explicitly started.

Before executing VM-236 repair work, verify either:

- no other card is In Progress, or
- the user explicitly authorized a parallel hotfix while another card remains In Progress.

If neither condition is true, stop after reservation.

## Scope For Future Execution

- Fix Sultai visible identity display to show `Identity | Black + Green + Blue - BGU` or the equivalent existing UI punctuation.
- Remove internal-facing phrases such as `strict same-color false-positive boundaries` from visible Sultai copy.
- Reduce repeated `source-bound Sultai Brood identity` and repeated graveyard/leverage phrasing.
- Replace Sultai Arisen's `classic Sultai goodstuff gameplay` wording with graveyard/resource-conversion copy.
- Check Dark Deal truncation; leave it unchanged if it is the existing controlled excerpt behavior.
- Keep Commander/operator material as table texture, not Tarkir lore proof.

## Non-Goals

- Do not edit Sultai raw claims, raw sources, evidence ledgers, source rows, research packets, or architecture docs.
- Do not retune placement scoring, priors, inhibition, raw-to-live mapping, identity counts, Home preview membership, routes, Maze behavior, schemas, Supabase config, or generated promotion state.
- Do not add lore claims, Commander facts, card facts, evidence rows, or manual-fill conclusions.
- Do not promote `BGU`, `BUG`, `GBU`, `GUB`, `UBG`, `UGB`, lowercase forms, or lowercase `sultai` into public keys, aliases, route keys, fixture keys, Home preview keys, Maze keys, generated expression keys, or `RAW_TO_KEY`.

## Acceptance Criteria For Future Execution

- [ ] Sultai visible identity display uses approved `BGU` direction as display metadata only.
- [ ] `BGU` appears only in approved visible display text or existing routing/color metadata.
- [ ] `BGU`, `BUG`, `GBU`, `GUB`, `UBG`, `UGB`, lowercase forms, and lowercase `sultai` are absent from identity keys, aliases, route maps, fixture keys, Home preview keys, Maze keys, generated expression keys, and `RAW_TO_KEY`.
- [ ] Visible Sultai copy does not expose `strict same-color false-positive boundaries`.
- [ ] Visible Sultai copy avoids excessive repeated `source-bound Sultai Brood identity` and repeated graveyard/leverage phrasing.
- [ ] Sultai Arisen precon copy avoids `classic Sultai goodstuff gameplay`.
- [ ] Dark Deal card-voice truncation is documented as intentional or repaired under controlled excerpt behavior.
- [ ] `data/raw-factions/sultai/sultai.claims.json` and `data/raw-factions/sultai/sultai.sources.json` hashes match pre-repair values.

## Suggested Tests For Future Execution

- `Get-FileHash -Algorithm SHA256 data/raw-factions/sultai/sultai.claims.json,data/raw-factions/sultai/sultai.sources.json`
- `node --check` on changed JS files and changed JS tests.
- `npm.cmd run build:precons` only if precon source data changes.
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Guard scan for `BGU` display-only usage and all permutation/key leakage.
- Scoped `git diff --check`.

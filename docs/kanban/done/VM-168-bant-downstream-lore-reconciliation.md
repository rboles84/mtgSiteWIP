# VM-168 - Bant Downstream Lore Reconciliation

ID: VM-168
Title: Bant Downstream Lore Reconciliation
Status: done
Type: Documentation / Raw Data Reconciliation
Area: Bant, Identity Docs, Metaphysics Docs, Raw Faction Data
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Reconciled the updated Bant lore-source packet into the existing live Bant setup after VM-160, including Great Resolution removal, Asha angel-creation boundaries, confirmed Elspeth beats, and the full Mubin sequence.

## Scope Completed

- Fixed the remaining positive "Great Resolution" proper-noun usage in the Bant source packet.
- Updated Bant identity and metaphysics docs to remove stale manual-fill gates where threads are now closed.
- Updated Bant raw claims/profile/placement/source/changelog files so live generated artifacts carry the revised source boundaries.
- Rebuilt generated faction artifacts through `npm.cmd run build:factions`.
- Preserved `BANT` as the live expression key and kept `WUG` metadata-only.

## Non-Goals Preserved

- No placement scoring, question-bank, lateral inhibition, Home preview, Maze, route CSS/JS, or Supabase source changes.
- No new broad shard framework.
- No unsupported Asha founder claim.
- No Elspeth governance or institution-building claim.
- No invented post-Phyrexia outcome or named angel compleation outcome.

## Acceptance Criteria

- No active Bant file uses `The Great Resolution` as a positive proper noun.
- Identity and metaphysics docs reflect Asha as presider/sacred authority, not founder, with angel creation attributed to archmages.
- Identity and metaphysics docs treat Elspeth's Bant knightly/spiritual arc as confirmed while preserving the non-governance boundary.
- Raw Bant files include the closed Elspeth and Mubin threads and updated Asha boundary.
- Generated `data/placement-model.json`, `data/placement-model.schema.json`, and Supabase faction context rebuilt from source.
- `npm.cmd run build:factions`, `npm.cmd run test:placement`, `npm.cmd test`, and `git diff --check` pass.

## Tests

- `npm.cmd run build:factions`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git diff --check`

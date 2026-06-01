# VM-209 - Sultai Brood Source Packet And Evidence Ledger

ID: VM-209
Title: Sultai Brood Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Sultai Brood, Tarkir, Source Evidence, Manual Fill
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Summary

Normalize unmanaged Sultai Brood source material into an approved `docs/research/sultai/` source packet, evidence ledger, reliability audit, and manual-fill register before any architecture, raw-faction, or runtime work starts.

## Dependency

May start after the VM-209 through VM-214 Sultai kanban reservation pass is complete.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Treat `docs/research/sultai brood/` as unmanaged discovery material until audited.
- Preserve unmanaged seed files unchanged by copying them into source-material or referencing them as discovery-only material.
- Create normalized Sultai source/evidence/manual-fill materials under `docs/research/sultai/`.
- Use row IDs such as `SULTAI-SRC-###`, `SULTAI-EVID-###`, `SULTAI-CMD-###`, and `SULTAI-MF-###`.
- Classify local official Tarkir source captures, the MaRo Sultai article, color-pair/philosophy references, canon inventory, Commander JSONL rows, support references, and seed artifacts by source role.
- Capture boundaries for Sultai Brood, Silumgar clan, and Dragonstorm-era Sultai.
- Mark thin or unsupported topics as `Manual fill required`.

## Non-Goals

- Do not create architecture docs.
- Do not create raw-faction JSON.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, or Temur files.
- Do not treat Commander/operator rows as Tarkir lore proof or Commander legality proof.
- Do not promote `SULTAI`, `BGU`, `BUG`, `UBG`, `GUB`, or lowercase forms into runtime keys, aliases, routes, fixtures, Home preview entries, or generated expression keys.

## Acceptance Criteria

- [x] `docs/research/sultai/` contains a source packet, source ledger, evidence ledger, reliability audit, manual-fill register, README, and source-material index.
- [x] Unmanaged `docs/research/sultai brood/` material is preserved and labeled as discovery-only or source-material seed content.
- [x] Every major Sultai claim is source-bound, support-bound, or explicitly labeled Vox Mana synthesis.
- [x] Sultai Brood, Silumgar clan, and Dragonstorm-era Sultai are distinct in the evidence boundary.
- [x] Commander/operator rows are support-only.
- [x] No architecture, raw-faction, runtime, generated, schema, Maze, route, Home, Supabase, Abzan, or Temur files are changed by VM-209.

## Completion Notes

- Created the approved `docs/research/sultai/` packet.
- Copied the two unmanaged seed files into `docs/research/sultai/source-material/` with original filenames and matching SHA-256 hashes.
- Left `docs/research/sultai brood/` unchanged.
- Created stable `SULTAI-SRC-###`, `SULTAI-EVID-###`, `SULTAI-CMD-###`, and `SULTAI-MF-###` rows.
- Classified official local captures as claim-bearing only where exact rows support the claim.
- Classified Commander rows as support-only and the seed artifacts as discovery-only.
- Kept final identity/metaphysics doctrine for VM-210.
- Kept Sultai non-live: no architecture docs, raw-faction data, runtime routes, generated artifacts, schemas, Supabase files, Maze behavior, or Home preview entries were touched.

## Suggested Tests

- Path existence checks for the normalized Sultai research files.
- Required ID-pattern scans for `SULTAI-SRC-###`, `SULTAI-EVID-###`, `SULTAI-CMD-###`, and `SULTAI-MF-###`.
- Required label scans for `Manual fill required`, `support-only`, `discovery-only`, and `Vox Mana synthesis`.
- Forbidden-path diff check confirming only VM-209-scoped docs/research and bookkeeping files changed.
- Scoped `git diff --check`.

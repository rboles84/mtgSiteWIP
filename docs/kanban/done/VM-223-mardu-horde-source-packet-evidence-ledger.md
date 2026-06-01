# VM-223 - Mardu Horde Source Packet And Evidence Ledger

ID: VM-223
Title: Mardu Horde Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Mardu Horde, Tarkir, Source Evidence, Manual Fill
Priority: high
Created: 2026-05-31

## Summary

Normalize unmanaged Mardu Horde source material into an approved `docs/research/mardu/` source packet, evidence ledger, reliability audit, and manual-fill register before any architecture, raw-faction, or runtime work starts.

## Dependency

May start after the VM-223 through VM-228 Mardu kanban reservation pass is complete.

## Shared Reservation Facts

- `docs/research/mardu horde/` is unmanaged seed material.
- `docs/research/mardu/` is future VM-223 source-packet workspace only.
- `MARDU` is the future public key.
- `RWB` and `WBR` remain metadata/query-only.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Treat `docs/research/mardu horde/` as unmanaged discovery material until audited.
- Preserve `docs/research/mardu horde/` exactly; do not rename, delete, move, format, normalize, or edit it.
- Create the normalized Mardu source packet under `docs/research/mardu/`.
- Copy unmanaged seed artifacts into `docs/research/mardu/source-material/` as preserved inputs only.
- Preserve copied seed artifact filenames unless an existing source-material precedent requires a different naming pattern; record any copy-name change in provenance.
- Files copied into `docs/research/mardu/source-material/` are preserved source material only; they do not count as approved evidence unless referenced through `MARDU-SRC-###` and `MARDU-EVID-###` rows.
- Create stable `MARDU-SRC-###`, `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###` rows.
- Commander/operator rows are support-only and never lore proof, raw-claim proof, Commander legality proof, or canon proof.
- Mark unresolved claims `Manual fill required`.
- Use accepted local official/project precedent sources only; do not browse or perform broad new lore synthesis.

## Non-Goals

- Do not create architecture docs.
- Do not create raw-faction JSON.
- Do not create, move, close, or implement VM-224 through VM-228.
- Do not create `docs/architecture/colors/mardu/` or `data/raw-factions/mardu/`.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, builders, placement fixtures, Abzan files, Temur files, Sultai files, or Jeskai files.
- Do not promote `MARDU`, `RWB`, `WBR`, or lowercase forms into runtime keys, aliases, routes, fixtures, Home preview entries, generated expression keys, or raw-to-live targets.

## Acceptance Criteria

- [x] `docs/research/mardu/` contains the expected approved packet files.
- [x] Unmanaged `docs/research/mardu horde/` material is preserved and labeled discovery-only.
- [x] Seed artifacts under source-material have provenance and hash or equivalence checks.
- [x] Every major Mardu claim is source-bound, support-bound, explicitly labeled Vox Mana synthesis, or marked `Manual fill required`.
- [x] Commander/operator rows are support-only.
- [x] Every `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###` reference used outside its home ledger resolves to a row in the appropriate packet file.
- [x] No architecture, raw-faction, runtime, generated, schema, Maze, route, Home, Supabase, builder, placement fixture, Abzan, Temur, Sultai, or Jeskai files are changed.

## Completion Notes

- Created the normalized VM-223 source packet under `docs/research/mardu/`.
- Copied three unmanaged seed artifacts into `docs/research/mardu/source-material/` with original filenames and matching SHA-256 hashes.
- Classified local official captures, Commander/operator support rows, color-pair support rows, and seed artifacts with stable `MARDU-SRC-###`, `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###` IDs.
- Preserved `docs/research/mardu horde/` unchanged.
- Left Mardu non-live and did not create architecture or raw-faction roots.

## Suggested Tests

- Path existence checks for the normalized Mardu research files.
- Seed artifact count and equivalence checks.
- Required ID-pattern scans for `MARDU-SRC-###`, `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###`.
- Required label scans for `Manual fill required`, `support-only`, `discovery-only`, and `Vox Mana synthesis`.
- Scan packet files for any `MARDU-CMD-###` used as canon, lore, or raw-claim proof and correct to support-only language.
- Scan approved packet files to confirm no claim-bearing row cites source-material seed files directly without a corresponding audited source/evidence classification.
- Forbidden-path diff check confirming only VM-223-scoped docs/research and bookkeeping files changed.
- Scoped `git diff --check`.

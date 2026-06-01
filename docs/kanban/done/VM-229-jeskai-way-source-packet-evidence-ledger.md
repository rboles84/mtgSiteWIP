# VM-229 - Jeskai Way Source Packet And Evidence Ledger

ID: VM-229
Title: Jeskai Way Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Jeskai Way, Tarkir, Source Evidence, Manual Fill
Priority: high
Created: 2026-05-31

## Summary

Normalize unmanaged Jeskai Way source material into an approved `docs/research/jeskai/` source packet, evidence ledger, reliability audit, and manual-fill register before any architecture, raw-faction, or runtime work starts.

## Dependency

May start after the VM-229 through VM-234 Jeskai kanban repair pass is complete.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Treat `docs/research/jeskai way/` as unmanaged discovery material until audited.
- Preserve `docs/research/jeskai way/` exactly; do not rename, delete, or move it.
- Create the normalized Jeskai source packet under `docs/research/jeskai/`.
- Create the expected approved packet files:
  - `docs/research/jeskai/README.md`
  - `docs/research/jeskai/jeskai-source-ledger.md`
  - `docs/research/jeskai/jeskai-evidence-ledger.md`
  - `docs/research/jeskai/jeskai-reliability-audit.md`
  - `docs/research/jeskai/jeskai-manual-fill.md`
  - `docs/research/jeskai/jeskai-seed-crosscheck.md`
  - `docs/research/jeskai/jeskai-research-dossier.md`
  - `docs/research/jeskai/jeskai-lore-source-packet.md`
- Copy exactly three unmanaged seed artifacts into `docs/research/jeskai/source-material/` as preserved inputs.
- Record exact hash equivalence or explicit line-equivalence notes for the seed copies.
- Use row IDs such as `JESKAI-SRC-###`, `JESKAI-EVID-###`, `JESKAI-CMD-###`, and `JESKAI-MF-###`.
- Classify local official Tarkir source captures, the MaRo Jeskai article, color-pair/philosophy references, canon inventory, Commander JSONL rows, support references, and seed artifacts by source role.
- Capture boundaries for Jeskai Way, Ojutai clan, pre- and post-Khans/Ojutai timeline material, and generic URW/Jeskai Commander shorthand.
- Mark thin or unsupported topics as `Manual fill required`.

## Non-Goals

- Do not create architecture docs.
- Do not create raw-faction JSON.
- Do not create VM-230 through VM-234 cards, move them, close them, or implement them in this card.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, Temur files, Sultai files, or Mardu files.
- Do not treat Commander/operator rows as Tarkir lore proof or Commander legality proof.
- Do not treat seed artifacts or generated HTML as approved evidence unless their claims are separately audited and mapped into `jeskai-evidence-ledger.md`.
- Do not collapse Jeskai Way into Ojutai or treat later Ojutai material as direct Jeskai evidence unless the source explicitly supports that bridge.
- Do not promote `JESKAI`, `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, or lowercase forms into runtime keys, aliases, routes, fixtures, Home preview entries, or generated expression keys.

## Acceptance Criteria

- [x] `docs/research/jeskai/` contains the expected approved packet files.
- [x] Exactly three preserved seed artifacts exist under `docs/research/jeskai/source-material/`, matching the three unmanaged seed inputs from `docs/research/jeskai way/`.
- [x] Unmanaged `docs/research/jeskai way/` material is preserved and labeled as discovery-only or source-material seed content.
- [x] Every major Jeskai claim is source-bound, support-bound, explicitly labeled Vox Mana synthesis, or marked `Manual fill required`.
- [x] Jeskai Way, Ojutai, and pre-/post-Khans timeline material are distinct in the evidence boundary.
- [x] Commander/operator rows are support-only.
- [x] No architecture, raw-faction, runtime, generated, schema, Maze, route, Home, Supabase, Abzan, Temur, Sultai, or Mardu files are changed.

## Suggested Tests

- Path existence checks for the normalized Jeskai research files.
- Seed artifact count and equivalence checks.
- Required ID-pattern scans for `JESKAI-SRC-###`, `JESKAI-EVID-###`, `JESKAI-CMD-###`, and `JESKAI-MF-###`.
- Required label scans for `Manual fill required`, `support-only`, `discovery-only`, and `Vox Mana synthesis`.
- Leakage scans proving `JESKAI`, `URW`, `WUR`, `RWU`, `UWR`, `RUW`, and `WRU` were not added outside VM-229-scoped research and bookkeeping files.
- Forbidden-path diff check confirming only VM-229-scoped docs/research and bookkeeping files changed.
- Scoped `git diff --check`.

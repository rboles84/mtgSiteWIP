# VM-203 - Temur Frontier Source Packet And Evidence Ledger

ID: VM-203
Title: Temur Frontier Source Packet And Evidence Ledger
Status: done
Type: Documentation / Research
Area: Temur Frontier, Tarkir Wedge, Source Evidence
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Sequence Note

VM-203 through VM-208 are reserved for the Temur Frontier onboarding sequence. VM-202 is intentionally left outside this Temur lane per user instruction that VM-197 through VM-202 are Abzan Houses card sequence space.

## Summary

Normalize the restored Temur Frontier source drop into a gold-standard source packet and evidence ledger before any architecture, raw-faction, generated, runtime, Maze, route, Home preview, schema, Supabase, or fixture work begins.

## Current Repo Truth

- Restored source drop was renamed from `docs/research/temur fontier/` to `docs/research/temur frontier/` as a source-drop hygiene correction.
- Approved Temur research root exists at `docs/research/temur/`.
- `docs/architecture/colors/temur/` does not yet exist.
- `data/raw-factions/temur/` does not yet exist.
- VM-204 through VM-208 remain reserved for future Temur work and were not edited by VM-203.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Review VM-200 and VM-201 before touching Temur materials.
- Treat `docs/research/temur frontier/` as the unmanaged restored source drop after VM-203 typo correction.
- Create the approved Temur research packet under `docs/research/temur/`.
- Preserve the three restored seed artifacts under `docs/research/temur/source-material/` with original filenames and source-path provenance.
- Use local official and repo-truth sources first:
  - `docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md`
  - `docs/research/canon/source-material/tarkir/`
  - `docs/research/canon/canon-inventory-three-color-reference-audit.md`
  - `docs/analysis/canon-inventory-three-color-reference-audit.md`
  - `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- Create stable `TEMUR-SRC-###`, `TEMUR-EVID-###`, `TEMUR-CMD-###`, and `TEMUR-MF-###` rows.
- Classify GUR Commander/operator rows as support-only, not lore proof.
- Record timeline boundaries across Khans-era Temur, ancient Fate Reforged Temur, Atarka Clan, and reformed Dragonstorm Temur.
- Record manual-fill rows for thin or uncaptured claims.

## Non-Goals

- Do not further rename, normalize, or edit the corrected unmanaged source drop at `docs/research/temur frontier/`.
- Do not create `docs/architecture/colors/temur/`.
- Do not create `data/raw-factions/temur/`.
- Do not add `TEMUR` or `GUR` to runtime/generated placement surfaces.
- Do not treat seed-file wording, generated HTML, Commander rows, community Commander reputation, Atarka Clan material, or generic GUR as Temur Frontier evidence unless the packet binds the claim to approved rows.
- Do not touch generated artifacts, schemas, Maze files, route CSS/JS, runtime code, Home preview behavior, Supabase code, placement fixtures, route maps, browser bundles, or test fixture rewrites.

## Acceptance Criteria

- [x] Approved Temur packet files exist under `docs/research/temur/`.
- [x] Restored seed artifacts are preserved under `docs/research/temur/source-material/` and classified as discovery/reference material.
- [x] Original typo path and copied source-material paths are recorded.
- [x] Major claims are evidence-bound, support-bound, labeled `Vox Mana synthesis`, or marked `Manual fill required`.
- [x] Stable `TEMUR-SRC-###`, `TEMUR-EVID-###`, `TEMUR-CMD-###`, and `TEMUR-MF-###` rows are present.
- [x] Atarka Clan, generic GUR, Commander goodstuff, and Dragonstorm-era details have explicit boundary labels.
- [x] `docs/architecture/colors/temur/` and `data/raw-factions/temur/` remain absent.
- [x] No runtime, generated, route, Maze, Home, schema, Supabase, fixture, builder, placement model, or raw-faction files are changed.

## Completion Notes

- Renamed `docs/research/temur fontier/` to `docs/research/temur frontier/`.
- Created approved packet docs under `docs/research/temur/`.
- Copied the three restored seed artifacts into `docs/research/temur/source-material/` with original filenames and matching SHA-256 hashes.
- Recorded old typo path, corrected source-drop path, copied packet paths, hashes, source classifications, and path guards in `temur-seed-source-crosscheck.md`.
- Kept Temur non-live: no architecture docs, raw-faction data, runtime routes, generated artifacts, schemas, Supabase files, Maze behavior, or Home preview entries were touched.

## Suggested Tests

- Before rename: `Test-Path "docs\research\temur fontier"`
- Before rename: `Test-Path "docs\research\temur frontier"`
- After rename: `Test-Path "docs\research\temur fontier"`
- After rename: `Test-Path "docs\research\temur frontier"`
- After packet creation: `Test-Path docs\research\temur`
- `Test-Path docs\architecture\colors\temur`
- `Test-Path data\raw-factions\temur`
- `rg -n "TEMUR-(SRC|EVID|CMD|MF)-[0-9]{3}|Manual fill required|Support-only|Vox Mana synthesis|Atarka|GUR" docs\research\temur`
- Scoped status guard for `docs/research/temur/**`, VM-203 Kanban files, board, and handoff/index files.

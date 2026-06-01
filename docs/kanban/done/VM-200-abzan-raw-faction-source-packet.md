# VM-200 - Abzan Raw-Faction Source Packet

ID: VM-200
Title: Abzan Raw-Faction Source Packet
Status: done
Type: JSON / Data Source Packet
Area: Abzan, Raw Factions, Source Data
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Duplicate-ID Note

This is the user-declared Abzan stack VM-200 for the authored raw-faction source packet. The repository already has a completed `VM-200 - Abzan Houses Source Packet And Evidence Ledger` card and handoff. That existing source-packet VM-200 was not edited, moved, renamed, reopened, or otherwise altered. This duplicate is intentional for the Abzan VM-197 through VM-202 stack requested by the user.

## Summary

Create Abzan's authored-but-not-live raw-faction source packet under `data/raw-factions/abzan/` from normalized `ABZAN-EVID-###` rows, with VM-198 and VM-199 architecture docs used as shaping-only context.

## Scope Completed

- Created exactly five Abzan raw JSON files:
  - `data/raw-factions/abzan/abzan.sources.json`
  - `data/raw-factions/abzan/abzan.claims.json`
  - `data/raw-factions/abzan/abzan.profile.json`
  - `data/raw-factions/abzan/abzan.placement.json`
  - `data/raw-factions/abzan/abzan.changelog.json`
- Created exactly 10 Abzan raw claims with IDs `abzan_claim_0001` through `abzan_claim_0010`.
- Bound raw claims only to normalized `ABZAN-EVID-###` rows from the Abzan evidence packet.
- Preserved VM-198 and VM-199 architecture docs as shaping-only inputs for profile and placement wording.
- Classified every source as `claim-bearing`, `shaping-only`, or `support-only`.
- Kept support-only Commander/operator rows, manual-fill rows, seed files, architecture prose, and generated material out of raw claims.
- Left `placement_axes` empty and kept Abzan source-only, review-gated, non-live, and not placement-eligible.

## Allowed Edits

- `data/raw-factions/abzan/abzan.sources.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- new duplicate Abzan VM-200 handoff under `docs/handoffs/`
- `docs/handoffs/HANDOFF_INDEX.md`

Do not modify, stage, format, normalize, move, delete, or rename unrelated dirty/untracked baseline files.

## Evidence Boundary

- Raw claims use `ABZAN-EVID-001` through `ABZAN-EVID-026`, plus `ABZAN-EVID-029` and `ABZAN-EVID-031`.
- `ABZAN-EVID-030` appears only as labeled `Vox Mana synthesis` shaping language.
- `ABZAN-EVID-027`, `ABZAN-EVID-028`, and `ABZAN-CMD-001` through `ABZAN-CMD-006` remain support-only.
- `ABZAN-MF-001` through `ABZAN-MF-011` remain manual-fill boundaries.
- Seed files are discovery/reference only and are not cited as raw-claim evidence.
- VM-198 and VM-199 architecture docs are shaping-only and are not raw-claim evidence.

## Non-Goals Preserved

- Did not edit `docs/research/abzan/**`.
- Did not edit existing source-packet VM-200 card or handoff.
- Did not add Abzan to `RAW_TO_KEY`, identity registries, generated placement files, route maps, Commander dossier runtime, Archscry presentation runtime, or live-entry lists.
- Did not create generated artifacts, placement model files, route assets, runtime JS, Home, Maze, Supabase, fixtures, schemas, builder output, or tests.
- Did not make Abzan runtime-live, preview-eligible, or placement-eligible.

## Acceptance Criteria

- [x] Exactly five expected Abzan raw JSON files exist and parse.
- [x] Top-level raw packet shape preserves the established Jund/Naya field conventions.
- [x] `abzan.claims.json` has exactly 10 raw claims.
- [x] Raw claim IDs are `abzan_claim_0001` through `abzan_claim_0010`.
- [x] Raw claims reference only the planned normalized Abzan evidence rows.
- [x] Raw claims reference only claim-bearing sources.
- [x] Profile and placement claim references are subsets of the 10 raw claim IDs.
- [x] `placement_axes` is `[]`.
- [x] No active/live status, preview eligibility, or placement eligibility is introduced.
- [x] Changed paths are limited to allowed duplicate Abzan VM-200 files.

## Tests

- Scoped existence, JSON parse, raw-claim count, source-role, claim-source, evidence-row, top-level shape, blocked-row, placement status, disallowed-path, whitespace, diff-check, and final dirty-baseline comparison checks.
- Runtime/parser tests skipped because this is source-authored raw data only and is not wired into runtime.

## Follow-Up

Next user-declared Abzan stack card: VM-201 Raw Packet Review Gate. Do not promote Abzan to runtime, generated data, placement, Home, Maze, routes, schemas, Supabase, fixtures, or builder maps until that review gate and a later explicit controlled promotion card approve it.

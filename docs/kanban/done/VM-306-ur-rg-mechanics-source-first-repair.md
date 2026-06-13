# VM-306 - UR/RG Mechanics Source-First Repair

ID: VM-306
Title: UR/RG Mechanics Source-First Repair
Status: done
Type: source-first data repair
Area: placement-model mechanics, raw faction profiles
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## Summary

Repair the empty generated `identity.mechanics` fields for `UR` Izzet League and `RG` Gruul Clans from approved local source backing.

This is a narrow mechanics-only pass. It must not use web search, invent lore or card facts, redesign schemas, hand-edit generated placement output as source, or accept unrelated generated drift.

## Scope

- Update only necessary raw mechanics source fields, expected mainly:
  - `data/raw-factions/izzet_league/izzet_league.profile.json`
  - `data/raw-factions/gruul_clans/gruul_clans.profile.json`
  - changelog files if needed
- Preserve all unrelated dirty worktree drift.
- Every added mechanic or mechanics-texture term must cite at least one local approved source ID or prior handoff/card reference.
- If either UR or RG lacks approved backing, keep VM-306 scoped to the backed target and queue the other as VM-307.

## Out Of Scope

- Placement axes, discriminator fields, good/poor fit indicators, claim counts, deck links, flavor snippets, schema shape, Maze behavior, routes, public display data, source-generated validator policy, and broad Supabase context rewrites.

## Acceptance Criteria

- [x] Baseline records the exact empty generated mechanics paths for `UR` and `RG`.
- [x] Raw source changes provide builder-readable mechanics summaries from approved local backing.
- [x] Full regeneration accepts only deterministic `UR`/`RG` generated mechanics changes in `data/placement-model.json`.
- [x] Any non-target generated drift is restored or explicitly rejected.
- [x] VM-305 targeted context mode is used only if Supabase context reconciliation is needed, accepting only `UR` and `RG`.
- [x] YORE/DUNE/GLINT/INK source-generated durability remains green.

## Test Plan

- [x] `node --check research\build-faction-artifacts.mjs`
- [x] `npm.cmd run test:faction-context-isolation`
- [x] JSON parse checks before and after edits
- [x] Baseline and final generated mechanics probes
- [x] `npm.cmd run build:factions`
- [x] `npm.cmd run build:factions -- --context-targets=UR,RG`
- [x] `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK`
- [x] `npm.cmd run test:source-generated`
- [x] `node research\archscry-dossier-followup-tests.js`
- [x] `node research\maze-search-tests.js`
- [x] `npm.cmd run test:placement` known unrelated Temur color-order residual only
- [x] Scoped `git diff --check` and focused trailing-whitespace scan

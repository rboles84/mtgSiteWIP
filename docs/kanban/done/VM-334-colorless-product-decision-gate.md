# VM-334 - Colorless Product Decision Gate

Status: Done
Owner: Codex
Agent role: Planning Architect / Documentation Steward
Area: Colorless, Layer 1, Governance, Documentation
Created: 2026-06-11
Completed: 2026-06-11

## Summary

Ratify `COLORLESS` as a controlled placeable Layer 1 identity rather than reference-only, while preserving the existing runtime/product state.

This card is documentation/governance only. It does not edit raw Colorless JSON, generated artifacts, runtime code, routes, Home preview, public aliases, schemas, Supabase manual context, image files, or staging.

## Pre-Flight Findings

- `VM-333` is occupied and blocked by Sultai Dossier Copy Contract Repair, so this Colorless decision gate uses `VM-334`.
- Recent Colorless work already promoted and repaired `COLORLESS`:
  - VM-326 approved the repaired raw packet for future controlled promotion.
  - VM-327 promoted `COLORLESS` as a controlled generated placement identity.
  - VM-329 repaired dossier, hero mapping, precon, mana-base, and Maze UX.
  - VM-331 repaired Colorless copy seams and stale WU Maze restore leakage.
- VM-325 governs the source-bound distinction between official researched data, generated output, and runtime comparison targets.
- VM-332 is the latest completed runtime/test pass before VM-334.
- The current baseline is 36 identity expressions, 36 generated display entries, 36 placement entries, 36 flavor-snippet entries, and 20 Home preview entries.
- The worktree is broadly dirty, including pre-existing drift in docs, generated data, runtime files, raw packets, and `assets/img/identity-hero/colorless.webp`.

## Decision

`COLORLESS` remains a controlled placeable Layer 1 identity.

Accepted contract:

- `key: "COLORLESS"`
- `kind: "colorless"`
- `colors: []`
- `secondary_colors: []`
- `core_color: "C"`
- `display_code: "C"`
- `aliases: ["COLORLESS"]`
- `placement_eligible: true`
- `preview_eligible: false`
- `routing.suppress_directory_links: true`

## Scope Completed

- Added `docs/architecture/colors/colorless/product-decision-gate.md`.
- Added short supersession/status notes to stale Colorless/Layer 1 docs.
- Updated Kanban and handoff bookkeeping.

## Acceptance Criteria

- [x] Decision record states `COLORLESS` remains controlled placeable.
- [x] Home preview remains disabled by contract.
- [x] Public route, directory alias, and public Colorless URL expansion remain unapproved.
- [x] Generated Supabase context is classified as generated placement/recruiter context, not claim evidence.
- [x] Existing or future approved dossier hero mapping may reference `assets/img/identity-hero/colorless.webp`, but this card does not edit the mapping or image.
- [x] Accepted Maze query contract is documented as `id=c` / `id<=c`; this card does not alter Maze generation.
- [x] Manual browser QA and richer Commander/deck/land advice remain blocked behind follow-up cards.
- [x] No generated artifact diffs are accepted as part of this docs-only card.
- [x] Do not stage files.

## Validation

- Count/contract probe passed: 36 identity expressions, 36 generated display entries, 36 placement entries, 36 flavor-snippet entries, 20 Home preview entries, accepted `COLORLESS` contract, and no controlled `WUBRG`.
- Raw Colorless hashes matched before and after.
- `npm.cmd run validate:source-generated -- --targets=COLORLESS` passed with the known model-owned inhibitor warning.
- `node research\maze-search-tests.js` passed.
- `node research\archscry-dossier-followup-tests.js` passed.
- `node assets\js\quick-reading-tests.js` passed.
- `npm.cmd test` passed.
- Scoped `git diff --check` passed with line-ending warnings only.
- No generated artifact diffs are accepted as part of this card.

## Not Touched

- `data/raw-factions/colorless/*.json`
- generated artifacts
- runtime JavaScript
- routes
- Home preview
- public aliases
- schemas
- Supabase manual context
- image files
- staging or commits

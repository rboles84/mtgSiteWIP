# VM-332 - Ink Maze Exact Commander Activation

Status: Done
Owner: Codex
Agent role: Planning Architect / Implementation
Created: 2026-06-11
Completed: 2026-06-11

## Summary

Activated Ink's Maze/dossier exact commander handoff after VM-330 verified `INK` Layer 1 authority. VM-263's Ink Maze suppression is now superseded historical policy, not current runtime policy.

`RGWU` remains technical/query-only. It may appear in internal query construction and tests, but it is not a public alias, route, Home preview entry, hero mapping, navigation key, color-code directory, or user-facing identity label.

## Pre-Flight Findings

- `VM-332` was unused before card creation.
- VM-330 verified `INK` Layer 1 authority and recorded the remaining VM-263 Maze suppression as the runtime warning to resolve here.
- VM-263 intentionally suppressed Ink Maze links under the policy in force at the time; VM-332 supersedes only that suppression.
- VM-331 is separate Colorless stale WU follow-up repair; no remaining Colorless blocker appeared in VM-332 validation.
- Broad unrelated dirty drift exists across runtime, generated data, raw packets, docs, assets, Kanban, and handoffs. It was preserved.

## What Changed

- `INK` now participates in live four-color Maze label/hint handling and no-stretch behavior.
- Ink Maze commander handoff normalizes to `id=rgwu is:commander f:commander`.
- Ink support-card and flavor-echo Maze paths remain bounded `id<=rgwu` support/flavor queries.
- Stale `WU` handoff state is not carried into Ink inferred exact commander handoffs.
- Raw `RGWU` handoff input normalizes internally to Ink display while staying out of public labels/routes.
- VM-263 received an append-only supersession note.

## Acceptance Criteria

- [x] `INK` Maze/dossier commander handoff emits `id=rgwu is:commander f:commander`.
- [x] Ink does not fall through to `id=wu`, `id<=wu`, stale WU labels, stale stored placement state, or adjacent-fit WU context.
- [x] Public display remains `Ink`.
- [x] `RGWU` remains technical/query-only.
- [x] VM-263 suppression policy is superseded by addendum only.
- [x] Required validations passed.

## Test Results

- `node --check assets\js\archscry-presentation.js` - pass
- `node --check research\research-init.js` - pass
- `node --check research\maze-search-tests.js` - pass
- `node --check research\archscry-dossier-followup-tests.js` - pass
- `node --check assets\js\quick-reading-tests.js` - pass
- `npm.cmd run validate:source-generated -- --targets=INK,YORE,DUNE,GLINT,WITCH` - pass, 0 warnings
- `npm.cmd run test:placement` - pass
- `node research\maze-search-tests.js` - pass
- `node research\archscry-dossier-followup-tests.js` - pass
- `npm.cmd test` - pass

## Probe Results

- Pre-edit and post-edit probes searched touched runtime/test files for `id=wu`, `id<=wu`, `WU`, `RGWU`, `INK`, `MAZE_LINK_DISABLED_KEYS`, and `commanders-that-fit`.
- `MAZE_LINK_DISABLED_KEYS` is no longer present in the touched files.
- Remaining `WU` hits are legitimate Azorius, Colorless stale-state, technical color-code, or negative-test fixtures.
- Remaining `RGWU` hits are technical query metadata or public-interface guard tests, not public labels/routes.

## Not Touched

- No raw Ink JSON changed.
- No generated authority data was hand-edited.
- No Colorless, five-color, Home preview, hero, public route, public alias, navigation, or broad Maze redesign work was performed.
- No files were staged or committed.

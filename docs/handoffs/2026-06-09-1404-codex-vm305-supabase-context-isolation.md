# 2026-06-09 14:04 - Codex - VM-305 Supabase Context Isolation

## Agent Name

Codex

## Task Requested

Implement VM-305 only: add target-scoped Supabase context rebuilds to `research/build-faction-artifacts.mjs`, keep full build behavior unchanged when no targets are supplied, add focused helper tests and a package script, run targeted reconciliation for `YORE`, `DUNE`, `GLINT`, and `INK`, and document the work.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/kanban/done/VM-301-yore-source-first-authoring-pass.md`
- `docs/kanban/done/VM-302-dune-source-first-authoring-pass.md`
- `docs/kanban/done/VM-303-glint-source-first-authoring-pass.md`
- `docs/kanban/done/VM-304-ink-source-first-authoring-pass.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-0820-codex-vm301-yore-source-first-authoring.md`
- `docs/handoffs/2026-06-09-0851-codex-vm302-dune-source-first-authoring.md`
- `docs/handoffs/2026-06-09-1025-codex-vm303-glint-source-first-authoring.md`
- `docs/handoffs/2026-06-09-1218-codex-vm304-ink-source-first-authoring.md`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `package.json`

## Files Changed

- `research/build-faction-artifacts.mjs`
- `research/faction-context-isolation-tests.js`
- `package.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/handoffs/2026-06-09-1404-codex-vm305-supabase-context-isolation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added `--context-targets=KEYS` CLI parsing to `build-faction-artifacts.mjs`.
- Exported pure helper functions for context target parsing, context TS parsing, rendering, non-target drift checks, and targeted entry merging.
- Guarded `main()` so tests can import helper functions without running the builder.
- In targeted mode, the builder now builds fresh full context in memory, parses existing `faction-context.ts`, replaces only requested `FACTION_CONTEXT` entries, preserves non-target entries, preserves existing `PLACEMENT_MODEL_META`, and writes only `supabase/functions/guild-recruiter/faction-context.ts`.
- In full mode, the builder still writes `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, and `supabase/functions/guild-recruiter/faction-context.ts`.
- Added `research/faction-context-isolation-tests.js` and `test:faction-context-isolation`.
- Ran targeted reconciliation for `YORE`, `DUNE`, `GLINT`, and `INK`.

## Why It Changed

VM-301 through VM-304 repeatedly found that `build:factions` could produce correct target-only `data/placement-model.json` drift while also rewriting unrelated Supabase context sections. VM-305 creates a safe targeted context mode so future source-first passes can accept intended context updates without accepting broad generated drift.

## Exact Context Keys Accepted

- `YORE`
- `GLINT`
- `DUNE`
- `INK`

## Generated Files Inspected And Restored

- Inspected and accepted targeted changes only in `supabase/functions/guild-recruiter/faction-context.ts`.
- Verified no VM-305 content drift in `data/placement-model.json`.
- Verified no VM-305 content drift in `data/placement-model.schema.json`.
- Verified no VM-305 content drift in `data/factions.json`.
- Verified no VM-305 content drift in `data/archscry-flavor-snippets.json`.
- Ran a full no-target `npm.cmd run build:factions` smoke to confirm full rebuild behavior still exists, then restored broad generated outputs from accepted pre-smoke snapshots.

## Decisions Made

- Targeted mode does not write broad generated JSON artifacts.
- Targeted mode preserves existing `PLACEMENT_MODEL_META` rather than replacing it from fresh model metadata.
- Targeted mode fails if a requested target is missing from either existing or fresh context.
- Non-target drift is guarded by comparing before/after context values and key order.
- Full mode remains available by omitting `--context-targets`.

## Risks / Uncertainties

- `npm.cmd run test:placement` still fails on the known unrelated Temur color-order assertion.
- `npm.cmd run test:source-generated` still reports existing Jeskai/Mardu model-owned inhibitor warnings from VM-300.
- The worktree remains broadly dirty from unrelated prior work, including tracked and untracked files outside VM-305 scope.

## Tests Run

- Pass: initial `git status --short` review
- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\faction-context-isolation-tests.js`
- Pass: `npm.cmd run test:faction-context-isolation`
- Pass: `npm.cmd run build:factions -- --context-targets=YORE,DUNE,GLINT,INK`
- Pass: context diff verification showing only `YORE`, `GLINT`, `DUNE`, and `INK` changed
- Pass: `PLACEMENT_MODEL_META` preservation check
- Pass: broad generated JSON snapshot comparisons
- Pass: full-mode smoke with `npm.cmd run build:factions`, followed by restore of broad generated outputs
- Pass: `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK`
- Pass with existing default-target warnings: `npm.cmd run test:source-generated`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Known unrelated fail: `npm.cmd run test:placement`
- Pass with LF/CRLF warnings only: scoped `git diff --check`
- Pass: focused trailing-whitespace scan

Known `test:placement` residual:

```text
 actual - expected

+ 'Temur Frontier commanders with exactly green-blue-red identity'
- 'Temur Frontier commanders with exactly blue-red-green identity'
```

## Not Touched

- No raw faction data edits.
- No placement schema shape edits.
- No Maze behavior edits.
- No route edits.
- No flavor snippet authoring.
- No public display data edits.
- No source-generated validator policy changes.
- No hand-editing generated placement output as source.
- No unrelated generated drift accepted.
- No staging, commits, resets, cleanup, or unrelated-file normalization.

## Follow-Up Recommendations

- Use `npm.cmd run build:factions -- --context-targets=KEYS` in future source-first faction passes whenever Supabase context reconciliation is needed.
- Next recommended source-first target after context isolation: the targeted `UR` and `RG` mechanics follow-up, starting with `UR` if split into single-faction passes.
- Consider a future strict pass to raw-back or explicitly classify the remaining Jeskai/Mardu model-owned inhibitor warnings if the team wants warning-free default `test:source-generated`.

## Next Suggested Agent

JSON Cartographer for the next source-first mechanics target, beginning with `UR`.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-305-supabase-context-isolation.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-09-1218-codex-vm304-ink-source-first-authoring.md`

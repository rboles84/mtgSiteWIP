# 2026-06-05 11:26 - Codex - VM-300 Source / Generated Guardrails

## Agent Name

Codex

## Task Requested

Implement VM-300 from the source-first faction quality plan: add guardrails so future faction-quality passes validate raw source durability before accepting generated placement/profile output, without redesigning schemas, hand-editing generated placement output, or treating generated files as source truth.

## Pre-Flight Summary

- Recent related work: VM-297 found source-of-truth contamination in VM-294/VM-295/VM-296; VM-298 repaired Witch public-copy/source durability; VM-299 repaired Jeskai and Mardu source durability.
- Current known risks: the worktree remains broadly dirty with unrelated tracked and untracked changes; `npm run test:placement` still has the known Temur color-order residual.
- Relevant decisions already made: durable placement authoring belongs in `data/raw-factions/**`; `data/placement-model.json`, generated Supabase context, and generated flavor output are not source truth.
- Files recently changed by related work: VM-298/VM-299 touched raw source packets, generated data, builders, snippets, tests, board, and handoffs.
- What should not be touched: no new faction authoring, no Witch repair, no generated output patching, no schema redesign, no Home/Maze/runtime repair, and no Temur residual fix.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-05-0843-codex-vm297-placement-source-of-truth-audit.md`
- `docs/handoffs/2026-06-05-0929-codex-vm298-witch-source-durability-repair.md`
- `docs/handoffs/2026-06-05-1004-codex-vm299-jeskai-mardu-source-durability.md`
- `docs/kanban/done/VM-299-jeskai-mardu-source-durability-repair.md`
- `docs/reference/data-contracts.md`
- `docs/architecture/data-flow-map.md`
- `research/build-faction-artifacts.mjs`
- `data/raw-factions/yore/yore.profile.json`
- `data/raw-factions/yore/yore.placement.json`
- `data/raw-factions/witch/witch.profile.json`
- `data/raw-factions/witch/witch.placement.json`
- `data/raw-factions/jeskai/jeskai.placement.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/placement-model.json`
- `package.json`

## Files Changed

- `research/validate-source-generated-guardrails.mjs`
- `package.json`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/handoffs/2026-06-05-1126-codex-vm300-source-generated-guardrails.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a target-scoped source/generated guardrail validator.
- Added package scripts: `validate:source-generated` and `test:source-generated`.
- Documented approved source/display scope and generated-output exclusions.
- Created and closed the VM-300 Kanban card.
- Added handoff/index bookkeeping.

## Why It Changed

VM-297 proved that direct generated placement edits can look complete while raw source files remain incomplete. VM-300 makes that failure mode executable: if generated placement/profile output is stronger, newer, or more complete than target raw source backing, validation fails with exact field paths.

## Decisions Made

- Default validator target set is `JESKAI,MARDU`, the repaired source-durable regression pair from VM-299.
- Witch is not in the default target set because the user explicitly excluded Witch from new authoring scope; it remains targetable via `--targets=WITCH` for future audit.
- One model-owned biological-prior inhibitor trap is allowed as a warning by default because the builder intentionally emits it from source code constants; `--strict-model-owned` can make that raw-only.
- The exploratory four-color run is classified as an expected audit failure and next-pass stop signal, not a VM-300 implementation failure.

## Risks / Uncertainties

- The validator is intentionally target-scoped; it is not a declaration that every historical faction lane is source-durable.
- `YORE`, `DUNE`, `GLINT`, and `INK` currently fail exploratory validation because generated good/poor fit or inhibitor language is not fully mirrored in raw placement backing.
- The worktree has broad unrelated drift, including pre-existing changes around board/docs/package/runtime files.
- The known Temur color-order residual still fails `npm run test:placement`.

## Tests Run

- Pass: `node -e "require('./package.json'); require('./data/factions.json'); require('./data/placement-model.json'); require('./data/archscry-flavor-snippets.json'); console.log('json parse OK')"`
- Pass: `node --check research\validate-source-generated-guardrails.mjs`
- Pass: `node --check research\build-faction-artifacts.mjs`
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`
- Pass with two model-owned warnings: `npm.cmd run test:source-generated`
- Expected fail / next-pass finding: `node research\validate-source-generated-guardrails.mjs --targets=YORE,DUNE,GLINT,INK`
- Pass: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`
- Fail, known unrelated residual: `npm.cmd run test:placement`
- Pass with LF-to-CRLF warnings only: scoped `git diff --check`

Known `test:placement` residual:

```text
Expected: Temur Frontier commanders with exactly blue-red-green identity
Actual:   Temur Frontier commanders with exactly green-blue-red identity
```

## Not Touched

- No generated placement output was hand-edited.
- No generated schema, generated Supabase context, or generated flavor output was patched.
- No raw faction source files were authored or repaired.
- No Yore, Dune, Glint, Ink, Witch, five-color, colorless, Home, Maze, route, schema, Supabase, or Temur residual work was performed.

## Follow-Up Recommendations

- Start the next source-first faction pass with `YORE`.
- Before continuing to `DUNE`, repair Yore raw source or approved display input, rebuild, and rerun `npm.cmd run validate:source-generated -- --targets=YORE`.
- Use the four-color exploratory failure output as the defect list for Yore/Dune/Glint/Ink source-durability planning.
- Consider a future builder cleanup if model-owned biological prior warnings should become raw-authored rather than model-owned.

## Next Suggested Agent

JSON Cartographer for the Yore source-first authoring pass, using VM-300 validator output as the stop/acceptance gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-300-source-generated-guardrails.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/kanban/done/VM-297-placement-data-source-of-truth-contamination-audit.md`
- `docs/kanban/done/VM-298-witch-public-copy-source-durability-repair.md`
- `docs/kanban/done/VM-299-jeskai-mardu-source-durability-repair.md`

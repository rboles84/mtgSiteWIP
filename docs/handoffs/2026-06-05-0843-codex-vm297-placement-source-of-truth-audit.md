# Handoff: VM-297 Placement Data Source-Of-Truth Contamination Audit

## Agent Name

Codex

## Task Requested

Implement VM-297 as an audit-only source-of-truth contamination review for VM-294 Jeskai, VM-295 Witch, and VM-296 Mardu. Do not repair data. Produce a triage report, supersede the unsafe Claude briefing workflow, update Kanban bookkeeping, and record next repair cards.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-294-jeskai-placement-data-quality-authoring-pass.md`
- `docs/kanban/done/VM-295-witch-placement-data-quality-authoring-pass.md`
- `docs/kanban/done/VM-296-mardu-placement-data-quality-authoring-pass.md`
- `docs/handoffs/2026-06-05-1200-codex-vm294-jeskai-placement-data-quality-authoring-pass.md`
- `docs/handoffs/2026-06-05-1130-codex-vm295-witch-placement-data-quality-authoring-pass.md`
- `docs/handoffs/2026-06-05-1500-codex-vm296-mardu-placement-data-quality-authoring-pass.md`
- `docs/context/2026-06-05-faction-quality-audit-session-briefing.md`
- `docs/reference/data-contracts.md`
- `docs/architecture/data-flow-map.md`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `data/raw-factions/jeskai/*`
- `data/raw-factions/witch/*`
- `data/raw-factions/mardu/*`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `docs/research/jeskai/jeskai-evidence-ledger.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`

## Files Changed

- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/context/2026-06-05-faction-quality-audit-session-briefing-codex-supersession.md`
- `docs/kanban/done/VM-297-placement-data-source-of-truth-contamination-audit.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-05-0843-codex-vm297-placement-source-of-truth-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created the VM-297 audit report with source/generated comparison, builder preservation risk, triage classifications, test results, and repair queue.
- Added a Codex supersession note beside the Claude briefing to prevent future agents from treating generated files as direct authoring authority.
- Added the VM-297 Done card after the triage report existed.
- Updated the Kanban board and handoff index.

## Why It Changed

The recent VM-294, VM-295, and VM-296 faction-quality passes edited generated or generated-adjacent data directly. The audit was needed before any additional faction placement pass could safely proceed.

## Decisions Made

- Treat VM-294, VM-295, and VM-296 as completed but untrusted pending repair.
- Treat `data/placement-model.json` authoring from those passes as not source-durable.
- Treat `data/factions.json` as generated-adjacent display data that may preserve public copy but does not prove placement/evidence authority.
- Do not run `npm.cmd run build:factions` in the dirty worktree during VM-297 because it would mutate generated files and blur audit evidence.
- Prioritize Witch repair first because Witch has a confirmed public flavor contract failure and strict VM-264 through VM-268 evidence boundaries.

## Risks / Uncertainties

- The worktree remains broadly dirty with many unrelated tracked and untracked changes.
- Some display copy from Jeskai, Witch, and Mardu may be worth keeping, but it needs source-durability and evidence-role repair before being trusted.
- Jeskai and Mardu may have fewer evidence-role problems than Witch, but both still have generated-only placement metadata and calibration risk.
- The approved builder was inspected but not executed, so VM-297's build-drift conclusion is static rather than run-generated.

## Tests Run

- `node -e "require('./data/factions.json'); require('./data/placement-model.json'); require('./data/archscry-flavor-snippets.json'); console.log('json parse OK')"` - pass.
- `npm.cmd run test:placement` - fail; Witch flavor contract failure and known unrelated Temur wording residual.
- `node research\archscry-dossier-followup-tests.js` - fail; Jeskai snippet text not found in committed Scryfall indexes.
- `node research\maze-search-tests.js` - pass.

## Not Touched

- No raw packet repair.
- No generated JSON repair.
- No builder, schema, runtime, Maze, Home, route, alias, Supabase, or placement-engine changes.
- No Yore, Dune, Glint, Ink, five-color, colorless, or other faction-quality placement pass.

## Follow-Up Recommendations

- VM-298: Witch repair first.
- VM-299: Jeskai and Mardu source-durability repair.
- VM-300: Generated/source guardrails.
- Do not continue the Claude briefing priority queue until the repair/guardrail cards are created or explicitly scoped.

## Next Suggested Agent

JSON Cartographer for VM-298 Witch repair planning and implementation, followed by Test Strategist for VM-300 guardrails.

## Related Kanban Card, Docs, Or Plans

- VM-297
- VM-294
- VM-295
- VM-296
- `docs/audits/2026-06-05-vm297-placement-source-of-truth-contamination-audit.md`
- `docs/context/2026-06-05-faction-quality-audit-session-briefing-codex-supersession.md`

# Codex Handoff - VM-272 Placement Living-Docs Drift Repair

## Agent Name

Codex acting as Documentation Steward / Kanban Steward.

## Task Requested

Implement VM-272 as a docs-only repair that updates living architecture and reference docs from stale older-count placement wording to the current 30-expression live placement state while preserving the 20-entry Home preview, the no-live-domain runtime contract, and the historical audit trail.

## Pre-Flight Summary

Recent related work:

- VM-197 refreshed the shard-era docs to the then-current shard rollout state.
- VM-202, VM-208, VM-214, VM-228, and VM-234 promoted `ABZAN`, `TEMUR`, `SULTAI`, `MARDU`, and `JESKAI` into the live placement set.
- `data/identity-layers.json` now describes the current live placement set as 30 expressions while keeping the Home preview set at 20 entries.
- `npm.cmd run test:placement` is the current executable proof of live-model reachability and currently reports `30 factions, 30 golden paths`.

Current known risks:

- Living docs could conflate the 30-expression live placement set with the 20-entry Home preview set.
- Living docs could imply that the controlled shard/wedge pilots introduced a live runtime `domain` field when they did not.
- Historical handoffs and done cards contain older counts that were correct at the time and must not be rewritten as part of VM-272.

Relevant decisions already made:

- VM-272 is docs-only and must not mutate runtime/data/schema/generated artifacts.
- `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, and `assets/js/quick-reading-tests.js` are verification inputs only in this slice.
- If those source-of-truth/runtime files had disagreed with the docs repair, the correct VM-272 behavior would have been to stop and report the mismatch instead of changing runtime/data files.

Files recently changed:

- Living architecture/reference docs still contained stale older-count wording from earlier rollout checkpoints.
- The worktree already had one unrelated dirty file before VM-272 began: `assets/img/identity-hero/colorless.webp`.

What should not be touched:

- Runtime/source-of-truth files used for verification only:
  - `data/identity-layers.json`
  - `data/factions.json`
  - `data/placement-model.json`
  - `assets/js/quick-reading-tests.js`
- Placement logic, question bank content, generated artifacts, schemas, routes, Home preview membership, Maze routing, and historical handoff narratives outside the new VM-272 closeout records.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-0058-codex-vm197-alara-shard-parity-closeout.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2043-codex-vm234-jeskai-controlled-runtime-promotion.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `assets/js/quick-reading-tests.js`
- `docs/architecture/placement-domains.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `docs/architecture/placement-domains.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-272-placement-living-docs-drift-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-1036-codex-vm272-placement-living-docs-drift-repair.md`

## What Changed

- Created VM-272 as a docs-only Kanban card and closed it out in `done/`.
- Updated living architecture docs so they now describe the active placement model as a 30-expression live set instead of older rollout checkpoints.
- Preserved the distinction between:
  - 30 live placement expressions
  - 20 Home preview entries
  - no runtime or generated live `domain` field
- Updated `docs/reference/data-contracts.md` so identity preview and placement-result notes no longer describe the live atlas as a single-shard pilot state.
- Updated `docs/reference/manual-test-cases.md` so placement expectations now read `30 factions, 30 golden paths`, and mono-adjacent QA wording matches the current pair-shell plus live shard/wedge analog behavior in the test suite.
- Left runtime/data/source-of-truth files untouched after verification.

## Why It Changed

The runtime and tests already reflected the current 30-expression live model, but several living docs still described earlier rollout-count states. VM-272 closes that documentation drift so future planning, QA, and architecture work start from the actual current repo truth instead of obsolete rollout checkpoints.

## Decisions Made

- Treated `data/identity-layers.json` plus the passing placement suite as the canonical count references for this slice.
- Updated only living architecture/reference docs and the new VM-272 bookkeeping records.
- Preserved historical handoffs and done cards as audit evidence rather than normalizing their older counts.
- Left the unrelated dirty file `assets/img/identity-hero/colorless.webp` untouched.

## Risks / Uncertainties

- Historical docs and handoffs still contain older counts by design; those are preserved evidence, not VM-272 failures.
- Future live-placement expansions will require another docs refresh if counts or domain framing change again.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`
- Stale-count `rg` scan across `docs/architecture` and `docs/reference`
- `npm.cmd run test:placement`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/architecture/placement-domains.md docs/architecture/core-logic-and-algorithms.md docs/architecture/data-flow-map.md docs/architecture/project-atlas.md docs/reference/data-contracts.md docs/reference/manual-test-cases.md docs/kanban/board.md docs/kanban/done/VM-272-placement-living-docs-drift-repair.md`

Not run:

- `git diff --cached --name-status` because VM-272 did not include staging or commit work.

## Not Touched

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `assets/js/quick-reading-tests.js`
- Placement logic
- Question bank content
- Generated artifacts
- Schemas
- Routes and route behavior
- Home preview membership
- Maze routing
- Historical handoff narratives outside this new VM-272 handoff
- The unrelated dirty asset `assets/img/identity-hero/colorless.webp`

## Follow-Up Recommendations

- When future docs refer to live placement counts, verify them against `data/identity-layers.json` and `npm.cmd run test:placement` before editing prose.
- If future cards need broader historical cleanup, handle that as a separate documentation-archive card rather than folding it into living-doc maintenance.

## Next Suggested Agent

Documentation Steward or Release Steward for any later docs-audit bundle or commit/publish pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-272-placement-living-docs-drift-repair.md`
- `docs/architecture/placement-domains.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`

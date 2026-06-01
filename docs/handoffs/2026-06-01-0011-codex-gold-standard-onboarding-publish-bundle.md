# Gold-Standard Onboarding Bundle Publish And Merge-Back

## Agent Name

Codex acting as Release Steward / Documentation Steward.

## Task Requested

Publish the current repo-facing onboarding/runtime/data/docs bundle from `codex/abzan-houses-gold-standard-onboarding`, push it, fast-forward `feature/ui-refactor-exploration` to that payload commit, and then record a truthful closeout handoff update on the target branch.

## Pre-Flight Summary

Recent related work:

- VM-208 promoted Temur Frontier to the live `TEMUR` runtime path.
- VM-214 promoted Sultai Brood to the live `SULTAI` runtime path.
- VM-228 promoted Mardu Horde to the live `MARDU` runtime path.
- VM-234 promoted Jeskai Way to the live `JESKAI` runtime path.
- VM-238 repaired shared Archscry -> Maze query preservation so `operatorQuery` wins and readable prose stays display-only.
- VM-239 removed duplicated Jeskai dossier external deck-service links from Start Here and revalidated the shared Maze precedence contract.
- The board also already contains reservation-only four-color planning cards VM-240 through VM-269 that must publish as documentation state, not as started implementation work.

Current known risks:

- The worktree is a broad mixed bundle across shared runtime files, generated faction data, raw-faction packets, architecture docs, research docs, Kanban cards, and handoffs.
- Shared files such as `assets/js/index.js`, `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js`, `assets/js/maze-handoff.js`, `research/research-init.js`, and `supabase/functions/guild-recruiter/faction-context.ts` affect more than one color lane, so the bundle must be published without accidental partial staging.
- The handoff must stay truthful about timing: validation is complete now, but source push, target fast-forward, target push, and final-clean confirmation are not complete yet in this pre-commit version.

Relevant decisions already made:

- `feature/ui-refactor-exploration` is the authoritative merge-back target for this bundle.
- The publish flow uses two commits total: one payload commit on the source branch and one metadata-only closeout commit on the target branch.
- After the closeout commit, `feature/ui-refactor-exploration` is expected to be one commit ahead of `codex/abzan-houses-gold-standard-onboarding`, and that is intentional.
- The excluded local file named in the plan, `docs/research/bant/Magic_ The Gathering Bant Lore Research.md`, was checked and is absent from the current worktree, so no stash or move action was required.

Files recently changed:

- Shared runtime and dossier surfaces under `assets/js/`
- Generated faction artifacts under `data/`
- Raw-faction source packets under `data/raw-factions/abzan/`, `data/raw-factions/temur/`, `data/raw-factions/sultai/`, `data/raw-factions/mardu/`, and `data/raw-factions/jeskai/`
- Color architecture docs under `docs/architecture/colors/`
- Research sources and normalized packets under `docs/research/`
- Kanban board, backlog, and done cards under `docs/kanban/`
- Prior handoffs for VM-197 through VM-240+ under `docs/handoffs/`

What should not be touched:

- `main`
- Any force-push, reset, or history-rewrite flow
- Any claim that the target branch push has already succeeded
- Any invented MTG facts, source claims, or new feature scope beyond the current dirty bundle

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2043-codex-vm234-jeskai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2128-codex-vm238-mardu-maze-link-query-preservation-repair.md`
- `docs/handoffs/2026-05-31-2203-codex-vm239-jeskai-dossier-deck-start-dedup-qa-closeout.md`
- `docs/kanban/board.md`
- Current worktree status via `git -c safe.directory=C:/dev/mtgSiteWIP status --short`
- Excluded-file existence check for `docs/research/bant/Magic_ The Gathering Bant Lore Research.md`

## Files Changed

- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/maze-handoff.js`
- `assets/js/quick-reading-tests.js`
- `assets/img/identity-hero/`
- `data/archscry-flavor-snippets.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/abzan/`
- `data/raw-factions/jeskai/`
- `data/raw-factions/mardu/`
- `data/raw-factions/sultai/`
- `data/raw-factions/temur/`
- `docs/architecture/colors/abzan/`
- `docs/architecture/colors/jeskai/`
- `docs/architecture/colors/mardu/`
- `docs/architecture/colors/sultai/`
- `docs/architecture/colors/temur/`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-*.md` onboarding and runtime handoffs already present in the bundle
- `docs/handoffs/2026-06-01-0011-codex-gold-standard-onboarding-publish-bundle.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-236-*.md`
- `docs/kanban/backlog/VM-240-*.md` through `docs/kanban/backlog/VM-269-*.md`
- `docs/kanban/done/VM-197-*.md` through `docs/kanban/done/VM-239-*.md`
- `docs/research/4 color/`
- `docs/research/PROMPT_lore-source-packet.md`
- `docs/research/abzan/`
- `docs/research/jeskai/`
- `docs/research/mardu/`
- `docs/research/sultai/`
- `docs/research/temur/`
- `research/archscry-dossier-followup-tests.js`
- `research/build-faction-artifacts.mjs`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `research/research-init.js`
- `supabase/functions/guild-recruiter/faction-context.ts`

## What Changed

- Prepared the current gold-standard onboarding bundle for publication as one repo-facing payload commit on `codex/abzan-houses-gold-standard-onboarding`.
- Recorded the validated pre-push state in this handoff and added the matching index entry.
- Preserved the plan boundary that this pre-commit version must not claim source push success, target fast-forward success, target push success, or final-clean status.

## Why It Changed

The branch contains a large completed bundle spanning Abzan, Temur, Sultai, Mardu, and Jeskai source packets, docs, generated data, runtime promotion, QA repairs, and Kanban/handoff bookkeeping. The publish step needs one truthful coordination artifact before the payload commit so the subsequent merge-back can be documented without inventing results ahead of time.

## Decisions Made

- Use one payload commit for the dirty repo-facing bundle.
- Keep the merge-back fast-forward only.
- Reserve the second commit on `feature/ui-refactor-exploration` for handoff/index closeout only.
- Treat the excluded Bant file as absent rather than manufacturing a stash or parking move for a path that is not present.

## Risks / Uncertainties

- Because the worktree is broad, any missed path during staging would create an incomplete publish.
- Because many handoffs and Kanban files are untracked, the publish depends on staging all intended docs alongside the code/data surfaces.
- If push or fast-forward fails later, this handoff will remain in a truthful pre-push state and will need a follow-up update rather than retroactive rewriting.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- `node --check assets/js/index.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/maze-handoff.js`
- `node --check research/research-init.js`
- `npm.cmd run lint:js`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run audit:factions`
- `npm.cmd test`

## Validation Results

- `git diff --check`: passed without diff-check failures; only working-tree line-ending warnings were emitted.
- Syntax checks: passed for all requested JS entrypoints.
- `npm.cmd run lint:js`: passed.
- `npm.cmd run test:placement`: passed.
- `npm.cmd run test:presentation-snapshots`: passed.
- `npm.cmd run test:frontend-smoke`: passed.
- `npm.cmd run audit:factions`: passed.
- `npm.cmd test`: completed with PASS output across the bundled automated suites and no failure output.

## Not Touched

- `main`
- Remote branch history
- The absent excluded Bant file path
- Any new runtime scope beyond the existing dirty bundle
- Any new research claims outside the already-authored bundle contents

## Follow-Up Recommendations

- After the payload commit is pushed, verify the exact commit contents before switching branches.
- After the target fast-forward, update this same handoff with the merge-back state in a metadata-only commit.
- After the target push, report the actual upstream hash alignment and final clean checkout in the final response rather than backfilling it into this pre-commit version.

## Next Suggested Agent

Release Steward to complete the source push, target fast-forward, closeout commit, and final branch verification.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-202-abzan-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-238-mardu-maze-link-query-preservation-repair.md`
- `docs/kanban/done/VM-239-jeskai-dossier-deck-start-de-dup-and-qa-closeout.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2043-codex-vm234-jeskai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2128-codex-vm238-mardu-maze-link-query-preservation-repair.md`
- `docs/handoffs/2026-05-31-2203-codex-vm239-jeskai-dossier-deck-start-dedup-qa-closeout.md`

# 2026-08-28 06:54 - Codex - Post-VM-589 Repository Hygiene

## Agent Name

Codex

## Task Requested

Perform a bounded repository-hygiene pass after accepted VM-589: make the accepted `main` durable remotely, verify the promoted workbook authority, inventory and conservatively clean branch/worktree state, assess the untracked VM-578 archive and obvious propagation leftovers, and stop before the next product story.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-27-2244-codex-vm589-owner-accepted-closeout.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`
- current Git refs, logs, worktrees, status, reachability, and relevant branch trees

## Files Changed

- `docs/handoffs/2026-08-28-0654-codex-post-vm589-repository-hygiene.md`
- `docs/handoffs/HANDOFF_INDEX.md` (this entry only)

## What Changed

- Fetched `origin` and fast-forward pushed local `main` from remote tip `e875c624` through accepted VM-589 closeout `e4d53909`; no force push was used.
- Proved authority-promotion commit `ecdacdbe` and VM-589 closeout commit `e4d53909` are reachable from `origin/main`.
- Deleted three local branch pointers proven fully reachable from `main`: `codex/vm580-vm583-owner-qa-remediation`, `codex/vm586-archscry-current-state-evidence`, and `vm577-scryfall-maze-master-verification`.
- Retained all 15 branches with commits not reachable from `main`, including the historical `vm578-player-language-corpus-v1` branch.
- Verified the accepted authority workbook SHA-256 remains `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.
- Confirmed no disposable propagation scratch/render/temp artifacts exist. The byte-identical propagation candidate remains governed review provenance named by the authority manifest.
- Left `docs/research/maze-player-language/corpus/vm578.zip` untouched. Its entries correspond to the 12 corpus outputs on the unintegrated VM-578 branch, but no authority explicitly disposes of the owner archive.

## Why It Changed

The accepted VM-589 commits were four commits ahead of `origin/main`. This pass made that accepted state remotely durable and removed only redundant local branch pointers while preserving every unique historical branch, owner artifact, and concurrent worktree change.

## Decisions Made

- The owning authority remains `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`; the accepted workbook itself was not regenerated or modified.
- The VM-578 branch and ZIP are provenance/owner inputs with unresolved disposition, so conservative retention controls.
- Fourteen rejected/recovery/audit branches also retain unique commits and were not deleted.
- Concurrent uncommitted VM-590 Loom-review and STARWEST evidence documents were treated as protected unrelated work and excluded from this commit.
- The worktree currently contains an uncommitted card already using `VM-590`; the next Plain Reading story must not begin under that identifier until Kanban identity is reconciled.

## Risks / Uncertainties

- The repository is remotely durable for VM-589 but the shared worktree is not clean because unrelated concurrent documentation work remains modified/untracked.
- The intended long-term storage policy for `vm578.zip` is still not explicit.
- Fifteen local historical branches contain 25 commits not reachable from `main`; no attempt was made to interpret or integrate them in this bounded pass.

## Tests Run

RobDev and RobQA were applied as a governance-only, QA-0 pass.

- `git fetch origin` — PASS.
- `git push origin main` — PASS, normal fast-forward.
- `git rev-list --left-right --count origin/main...HEAD` — PASS, `0 0` before this handoff commit.
- `git merge-base --is-ancestor ecdacdbe... origin/main` — PASS.
- `git merge-base --is-ancestor e4d53909... origin/main` — PASS.
- `Get-FileHash -Algorithm SHA256` on the accepted authority workbook — PASS, exact owner-accepted hash.
- Worktree/branch reachability inventory — PASS; one worktree, three merged pointers removed, all unique branches retained.
- Scoped leftover scan under the calibration tree — PASS; no disposable artifacts found.
- Runtime/product diff check — PASS; no runtime or product file was changed by this pass.
- CPU-heavy validation — NOT REQUIRED; no product, runtime, parser, workbook, or generated data changed.

## Not Touched

- Accepted authority workbook or predecessor calibration/evidence files
- Propagation producer, candidate, diff, or QA artifacts
- Plain Reading, Operator Hand, Archscry runtime, placement, generated data, or production JavaScript
- VM-589 or VM-578 completed governance
- `docs/research/maze-player-language/corpus/vm578.zip`
- Concurrent VM-590 Loom-review and STARWEST evidence worktree changes
- Remote branches or local branches with unique commits

## Follow-Up Recommendations

- Resolve the existing uncommitted `VM-590` Loom-review identity before assigning the same ID to a Plain Reading semantic-state contract story.
- Decide the owner storage policy for `vm578.zip` in a separately authorized, bounded action; do not infer deletion from duplication.
- Begin the next product story only from a clean or explicitly isolated governed worktree after the concurrent documentation work is committed, moved, or otherwise resolved by its owner.

## Next Suggested Agent

Kanban Steward for ticket-identity reconciliation, then Planning Architect for the future Plain Reading semantic-state contract after the repository is clean.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/handoffs/2026-08-27-2244-codex-vm589-owner-accepted-closeout.md`
- `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`
- RobDev: `.agents/skills/robdev/SKILL.md` and `docs/dev/RobDevPass.md`
- RobQA: `.agents/skills/robqa/SKILL.md` and `docs/qa/RobQAPass.md`

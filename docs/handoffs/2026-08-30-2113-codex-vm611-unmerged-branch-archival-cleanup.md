# 2026-08-30 21:13 - Codex - VM-611 Unmerged Branch Archival Cleanup

## Agent Name

Codex

## Task Requested

Audit every local branch not merged into `main`; preserve every exact tip with one pushed annotated `archive/` tag; redirect safety references to archival tags and SHAs; delete only the local stale pointers; leave `main`, accepted history, runtime, source data, placement, and identity semantics unchanged.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`, `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-24-1943-codex-vm419-post-promotion-branch-cleanup.md`
- `docs/handoffs/2026-08-28-0654-codex-post-vm589-repository-hygiene.md`
- CRIT-001 recovery ledger, recovery records, referenced cards, and affected handoffs
- Git status, worktrees, local refs, tag peel targets, and `origin/main`

## Files Changed

- `docs/kanban/done/VM-611-unmerged-branch-archival-cleanup.md`
- `docs/kanban/board.md`
- CRIT-001 and VM-578 safety-reference records listed in the VM-611 card
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Created and pushed 16 annotated archival tags, each peeling to the exact branch tip recorded in VM-611.
- Deleted the matching 16 local unmerged branch pointers only after remote tag verification.
- Replaced live safety-reference branch names with an archival tag plus full SHA where the document relied on the branch for preservation.
- Preserved all CRIT-001 rejected, failed, and superseded dispositions without recategorizing any historical object.

## Why It Changed

`main` is the only active product branch. The prior hygiene pass deliberately retained these 16 unique unmerged tips; archival tags now make every object remotely durable without retaining ordinary local branch pointers.

## Decisions Made

- `archive/` tags are immutable historical anchors, not approvals, certifications, or candidate substitutions.
- Disposition follows the controlling CRIT-001 ledger/cards: rejected VM-502/504/509 tips remain rejected; failed VM-509/521 tips remain failed; VM-525 tips remain superseded and unapproved; review/provenance records remain audit-only; other retained work is historical.
- No remote branch was deleted. `origin/main` remained `5d4e76af2a9f1cb191af81109a075035e875c82b` throughout local cleanup.

## Risks / Uncertainties

- The local Git client continues to warn that `C:\Users\obake\.config\git\ignore` is inaccessible; this external user-config condition predates the change and did not affect ref or content validation.
- The VM-578 ZIP retention policy remains owner-controlled and untouched; its historical commit is additionally protected by its archive tag.

## Tests Run

RobDev and RobQA applied as QA-0 Git-governance work.

- Exact local tag peel mapping for all 16 archive tags — PASS.
- `git ls-remote --tags origin "archive/*"` — PASS; every pushed tag and `^{}` commit was present and matched the VM-611 inventory.
- `node` JSON parse of `docs/incidents/CRIT-001-identity-recovery-ledger.json` — PASS.
- `git diff --check` — PASS.
- `git worktree list --porcelain` — PASS; only `C:/dev/voxmana.io` on `main` remains.
- `git branch` inventory — PASS; only ordinary local branch is `main`.
- `git rev-parse main` and `git rev-parse origin/main` — PASS; both were `5d4e76af2a9f1cb191af81109a075035e875c82b` before the documentation commit.
- Runtime, placement, rendered-product, and certification suites — intentionally not run: no relevant behavior changed.

## Not Touched

- Runtime code, source/generated data, placement, identity semantics, fixtures, accepted history, or CRIT-001 certification state.
- `main`, remote branches, worktree creation/removal, merge/rebase/force-push operations, and VM-578 owner archive contents.

## Follow-Up Recommendations

- Use the archive tags and full SHAs in VM-611 for future forensic review; do not recreate ordinary product branches merely to inspect them.
- Preserve the owner-controlled VM-578 archive until a separate retention decision is supplied.

## Next Suggested Agent

No follow-up agent is required for this cleanup.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-611-unmerged-branch-archival-cleanup.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/handoffs/2026-08-28-0654-codex-post-vm589-repository-hygiene.md`
- RobDev / RobQA governing gates named above

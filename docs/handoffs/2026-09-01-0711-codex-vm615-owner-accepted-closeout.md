# VM-615 Owner-Accepted Closeout

## Agent name

Codex

## Task requested

Close the explicitly Owner-Accepted VM-615 candidate without changing its product result; preserve the
exact candidate commit, move the card to Done, advance QA to PASS, create a separate lifecycle-only
closeout commit, push the existing task branch, and stop before PR/merge or VM-616/617.

## Files reviewed

- Owner VM-615 acceptance instruction dated 2026-09-01
- Repo-local RobDev/RobQA skills, usage guides, and frozen gates
- `docs/reference/workflow.md`
- Current VM-615 card, board, QA evidence, owner-review handoff, onboarding contract, and handoff index
- VM-614 and VM-618 exact-candidate/two-commit closeout precedents
- Full candidate inventory, branch/worktree state, and synchronized `main`/`origin/main`

## Files changed

Exact Owner-Accepted candidate `8dcd6d2cb4861c3a13af8e9eb01c66253db5f617` contains the complete VM-615
product, focused validation, card, QA evidence, and pre-closeout handoff.

Closeout lifecycle changes only:

- `docs/kanban/done/VM-615-reading-dossier-onboarding.md` (moved from `in-progress/`)
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm615-reading-dossier-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What changed

- Bound Owner acceptance to exact candidate `8dcd6d2cb4861c3a13af8e9eb01c66253db5f617`.
- Advanced VM-615 from Owner Review to **Done — Owner Accepted**.
- Advanced QA to **RobQA PASS — Owner Accepted**.
- Preserved the accepted product and validation files byte-for-byte after the candidate commit.
- Preserved the known fresh-session Archscry browser-smoke gap as an explicit unresolved limitation.

## Why it changed

The Owner explicitly accepted the reviewed VM-615 candidate and authorized the normal exact-SHA
two-commit closeout and task-branch push while withholding PR/merge authorization.

## Decisions made

- Followed VM-614/VM-618 precedent: immutable accepted candidate first, lifecycle-only closeout second.
- Made no product, copy, layout, interaction, semantic, onboarding, or validation-file change after the
  candidate commit.
- Kept the accepted candidate binding in the card, QA evidence, board, and closeout handoff; no unrelated
  architecture or contract document required a lifecycle edit.
- Kept rendered browser witnesses local and uncommitted, consistent with prior Owner Review evidence.

## RobDev compact packet

- **Outcome:** VM-615 is exact-SHA bound, Owner Accepted, Done, and ready for publication from its existing
  branch.
- **Authority/producer:** explicit Owner acceptance; Git owns the immutable candidate; Kanban, QA, and
  handoff records own lifecycle state.
- **Changed behavior:** repository lifecycle metadata only after the accepted candidate commit.
- **Protected behavior:** every accepted product/test file; Archscry/Placement/dossier/Maze semantics and
  state; VM-618 topbar; `/guide/`; persistence, accounts, telemetry, Strategium, and Apocrypha.
- **Smallest complete change:** candidate binding, Done move, QA PASS, closeout handoff/index, narrow
  integrity checks, second commit, and branch push.
- **Non-goals/stop:** no product change, heavy suite, fresh-session repair, PR, merge, VM-616, or VM-617.

## RobQA closeout packet

- **QA tier:** QA-5 Git/lifecycle integration of an already accepted QA-3/QA-1 candidate; lifecycle edits
  are QA-0 documentation metadata.
- **Changed behavior:** commit/push and lifecycle state only.
- **Protected behavior intentionally untouched:** accepted runtime, presentation, interaction, semantics,
  state, focused tests, and downstream product surfaces.
- **Existing evidence reused:** successful focused static/browser validation and accepted desktop/mobile,
  keyboard, deep-link, reduced-motion, zoom, normal/alternative/Yore witnesses.
- **CPU-heavy validation:** `NOT REQUIRED`; no protected product/decision behavior changed after acceptance.
- **Remaining owner judgment:** none for VM-615; only separate PR/merge authorization remains.

## Tests run

- PASS: `npm.cmd run test:reading-guide`
- PASS: `npm.cmd run test:reading-guide-browser`
- PASS: accepted candidate staged inventory and `git diff --cached --check`
- PASS: exact hero and supported-direction semantic corrections remain present
- PASS: skip link remains hidden normally, visible on focus, functional, focus-correct, and clear of topbar
- PASS: `/guide/reading/` exists; `/guide/maze/` and `/guide/reference/` remain absent
- PASS: accepted production file hashes unchanged after candidate binding
- PASS: card/board/QA/handoff lifecycle integrity and lifecycle staged diff check
- SKIP: unrelated CPU-heavy suites and the known fresh-session Archscry harness gap

## Risks / uncertainties

- The known fresh-session Archscry browser-smoke gap remains unresolved and limits complete first-user
  journey claims.
- PR/merge into `rboles84/voxmana.io` remains unperformed pending separate explicit Owner authorization.

## Not touched

Accepted product and test files after the candidate commit; Placement/scoring/evidence/qualification;
identity or dossier truth; SIRF; Maze semantics/state; Reading Finds; persistence; account behavior;
telemetry; Strategium; Apocrypha; VM-618 topbar; `/guide/`; later Guide routes; VM-616; VM-617; `main`;
PR/merge.

## Follow-up recommendations

With separate explicit Owner authorization, open and merge the normal PR from
`codex/vm-615-reading-dossier-onboarding` into `main` while preserving both commits.

## Next suggested agent

PR/integration agent only after explicit Owner destination authorization.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-615-reading-dossier-onboarding.md`
- `docs/qa/2026-08-31-vm615-reading-dossier-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/handoffs/2026-08-31-2359-codex-vm615-reading-dossier-owner-review.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

## Branch / exact state

- Branch: `codex/vm-615-reading-dossier-onboarding`
- Base: `2585a2d1dc80a501fd614ca40cf450fd48540827`
- Exact Owner-Accepted candidate: `8dcd6d2cb4861c3a13af8e9eb01c66253db5f617`
- Closeout lifecycle commit: pending at handoff authoring time
- Push: pending at handoff authoring time
- PR/merge: not authorized in this run

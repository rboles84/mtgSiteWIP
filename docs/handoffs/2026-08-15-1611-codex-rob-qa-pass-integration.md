# Agent Handoff: Codex - RobQAPass Workflow Integration

Date: 2026-08-15 16:11 MDT

Related Card: VM-556

Related Plan: Owner-requested repo-grounded integration plan delivered before editing

Status: Complete; governance integration committed at `b9db45b`

## Task Requested

Add the supplied `RobQAPass.md` as Vox Mana's governing owner-QA gate and invoke it from the existing development workflow without duplicating its policy or replacing project-specific tests and contracts.

## Files Reviewed

- `AGENTS.md`, `CLAUDE.md`, and `.codex/prompts/{preflight,plan,test}.md`
- `docs/handoffs/HANDOFF_INDEX.md`, recent VM-551 owner-QA handoffs, and the handoff template
- `docs/kanban/board.md`, current VM-552 state, and recent card conventions
- `docs/reference/workflow.md`, `docs/reference/manual-test-cases.md`, and token/reasoning guidance
- `docs/qa/vox-mana-test-plan.md`, the VM-462 owner visual-acceptance packet, visual waivers, and current QA inventory
- Owner-supplied `C:\Users\obake\Downloads\RobQAPass.md`

## Files Changed

- Added `docs/qa/RobQAPass.md`.
- Updated `AGENTS.md` and `CLAUDE.md`.
- Updated `.codex/prompts/preflight.md`, `.codex/prompts/plan.md`, and `.codex/prompts/test.md`.
- Updated `docs/reference/workflow.md` and `docs/reference/manual-test-cases.md`.
- Updated `docs/handoffs/templates/agent-handoff-template.md`.
- Updated `docs/qa/vox-mana-test-plan.md` and `docs/qa/2026-07-03-owner-visual-acceptance-packet.md`.
- Added VM-556, held it in Ready until durability, and moved it to Done after commit `b9db45b`.
- Added this handoff and updated `docs/handoffs/HANDOFF_INDEX.md`.

## What Changed

- Established `docs/qa/RobQAPass.md` as the single owner-QA scope-selection and acceptance-preparation authority.
- Required QA-tier/risk classification, changed behavior, and protected contracts before test selection.
- Required the smallest deterministic risk-proportional validation set and concrete justification before CPU-heavy or exhaustive suites.
- Required rendered-product self-QA for visible UI changes.
- Required real manual owner findings to become the narrowest appropriate systemic regression invariant.
- Bounded final owner review to deterministic cases requiring genuine product judgment.
- Reframed broad command lists as catalogs while retaining every project-specific command and stricter gate.

## Why

Recent owner-QA work showed that small presentation fixes were sometimes surrounded by disproportionate certification work. This integration codifies the proven focused approach while preserving the repository's useful feature, accessibility, visual-baseline, exact-SHA, source-authority, and CRIT-001 requirements.

## Decisions Made

- Chose `docs/qa/RobQAPass.md` as the durable location because it is a QA authority, not a root-level duplicate instruction file.
- Kept the supplied document content-equivalent; only repository line-ending normalization occurred.
- Added short pointers and invocation rules rather than reproducing the gate.
- Kept the historical VM-462 visual packet as evidence and labeled its relationship to the new governing gate instead of rewriting history.
- Did not modify broad test scripts or product-specific manual cases; the gate selects among them.
- Verified `CLAUDE.md` is intentionally maintained: it is tracked, has dedicated governance history, and retains Claude-specific data-pipeline, agent-role, and command guidance.
- The 15-file duplication review retained one full authority and surface-specific invocations, while consolidating three avoidable restatements in `CLAUDE.md`, the handoff template, and the workflow command footer.

## Risks / Uncertainties

- No blocking risk remains. Future instruction surfaces should link to the authority rather than restate it.
- Existing stricter protected workflows continue to override any lighter default when applicable.

## Efficiency / Escalation Notes

- Kept the work at QA-0 and deliberately avoided unrelated runtime discovery and heavyweight suites.
- No branch/worktree was created; the owner requested the current worktree and the repository did not require a new one.

## Tests / Checks Run

- Normalized content comparison between the supplied file and repository copy: PASS (`True`).
- Required path/reference presence checks for all integration surfaces: PASS.
- Policy coverage search for tiering, heavy-suite control, rendered self-QA, systemic invariants, deterministic owner review, and project-specific preservation: PASS.
- Duplication guard for unique RobQAPass section headings: PASS; only `docs/qa/RobQAPass.md` contains the full gate.
- Fifteen-file policy-duplication review: PASS after consolidating three avoidable restatements to direct references.
- `CLAUDE.md` maintenance verification through tracking and file history: PASS.
- Changed-path scope review: PASS; documentation/instruction/Kanban/handoff files only.
- `git diff --check`: PASS.

## RobQAPass Readiness

- QA tier: QA-0.
- Changed behavior: documentation and agent workflow instructions for QA selection/owner handoff.
- Protected behavior intentionally untouched: runtime, generated data, product logic, placement/scoring/routing, CRIT-001, exact-SHA gates, feature-specific test contracts, VM-552, and visual baselines.
- Tests selected: content equivalence, path/reference coverage, duplication guard, changed-path scope, and whitespace validation; all passed.
- Tests intentionally skipped: browser, visual, placement, journey, synthetic, mutation, recovery, parser, and full repository suites because no protected runtime behavior changed.
- CPU-heavy validation: `NOT REQUIRED`.
- Self-QA rendered evidence: not applicable to QA-0 documentation-only work.
- Manual findings converted to invariants: not applicable; no new product defect was remediated.
- Remaining owner judgment: none required for product behavior; policy wording remains available for owner review.
- Owner review commands/routes: none; review `docs/qa/RobQAPass.md` and the concise instruction diff if desired.

## Not Touched

- Runtime application code, test implementations, package scripts, generated JSON/data, MTG facts, source ledgers, visual baselines, deployment, active VM-552 files, CRIT-001 records, and git branches/worktrees.

## Follow-Up Recommendations

- Use the VM-556 handoff and template on the next implementation task; do not create a separate QA framework.
- Refine the authority only in response to repeated real owner behavior or a demonstrated gap.

## Next Suggested Agent

- Normal implementation owner; no dedicated follow-up agent is required.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-556-rob-qa-pass-workflow-integration.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`

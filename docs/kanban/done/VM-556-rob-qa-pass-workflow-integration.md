# VM-556 - RobQAPass Workflow Integration

ID: VM-556

Status: Done

Type: Documentation / workflow governance

Area: QA, agent instructions, owner acceptance

Priority: High

Created: 2026-08-15

## Summary

Add the owner-supplied `RobQAPass.md` as the governing owner-QA scope-selection gate and connect it to the repository's existing preflight, planning, testing, handoff, and owner-review surfaces without creating a parallel QA framework.

## Source

- Owner request and supplied `C:\Users\obake\Downloads\RobQAPass.md`.
- Recent VM-551 owner-QA handoffs demonstrating focused rendered review and preservation of unchanged placement certification.

## QA Classification

- QA tier: QA-0 documentation/workflow metadata.
- Changed behavior: agent QA selection and owner-review preparation instructions.
- Protected behavior intentionally untouched: runtime, placement/scoring/routing, generated data, CRIT-001 controls, visual baselines, feature-specific test commands, and active VM-552 work.
- CPU-heavy validation: `NOT REQUIRED`.

## Acceptance Criteria

- The supplied gate lives durably at `docs/qa/RobQAPass.md`.
- Existing instruction surfaces refer to that single authority concisely rather than copying it.
- Preflight and plans require QA-tier/risk classification and named protected contracts before tests are selected.
- Test guidance requires risk-proportional validation and prevents unjustified exhaustive/CPU-heavy suites for small presentation, copy, and ordinary component work.
- Visible UI changes require rendered-product self-QA.
- Manual owner findings become the narrowest appropriate systemic regression invariant.
- Owner review is bounded, deterministic, and reserved for product judgment.
- Existing project-specific commands, contracts, visual-baseline rules, accessibility requirements, CRIT-001 controls, and exact-SHA gates remain authoritative where applicable.
- QA-0 documentation checks pass and no runtime file changes.

## Files Likely Impacted

- `docs/qa/RobQAPass.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/plan.md`
- `.codex/prompts/test.md`
- `docs/reference/workflow.md`
- `docs/handoffs/templates/agent-handoff-template.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/manual-test-cases.md`
- `docs/qa/2026-07-03-owner-visual-acceptance-packet.md`
- Kanban board and handoff records

## Risks

- Duplicating the gate across instruction files would create drift.
- Treating the comprehensive test command catalog as mandatory for every change would preserve unnecessary QA overhead.
- Weakening project-specific protected workflows would create unsafe exceptions.
- Updating historical owner-acceptance evidence as if it were current policy would blur history and governance.

## Implementation Prompt

Install the supplied document as the single QA scope-selection authority. Add only short references and local invocation rules to existing workflow surfaces. Keep feature tests feature-specific, preserve stricter project gates, and validate only the documentation integration.

## Notes

- Continue on the current `main` worktree; do not create a branch or worktree.
- Do not modify VM-552, runtime code, generated data, test implementations, or visual baselines.
- Stop if the integration requires a second QA framework or a change to product behavior.

## Completion

- Added the content-equivalent owner-supplied gate at `docs/qa/RobQAPass.md`.
- Wired concise references into the primary agent instructions, preflight/planning/testing prompts, standard workflow, handoff template, comprehensive test-plan catalog, manual test cases, and historical owner visual-acceptance packet.
- Made QA tier, changed behavior, and protected-contract identification precede test selection.
- Made exhaustive/CPU-heavy validation conditional on concrete changed protected behavior while preserving all stricter project-specific gates and commands.
- Required rendered-product self-QA for visible changes, narrow systemic regressions from manual owner findings, and bounded deterministic owner review.
- Verified `CLAUDE.md` is an intentionally maintained instruction surface with dedicated repository history and Claude-specific guidance.
- Reviewed the 15-file change set for policy duplication and replaced three avoidable restatements with direct references.
- Ran QA-0 documentation checks only; no runtime, browser, placement, journey, synthetic, mutation, recovery, or visual-baseline suite was run.
- The reviewed 15-file governance/documentation integration is durably committed as `b9db45b` (`docs(qa): add risk-proportional owner gate`).

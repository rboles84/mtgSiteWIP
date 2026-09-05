# VM-627 — Owner-Visual Governance Repair

- ID: VM-627
- Status: In Progress — Owner Review (QA-0 candidate checks PASS)
- Type: Documentation / QA governance
- Area: RobQA, RobDev, agent prompts, delivery workflow
- Priority: High
- Created: 2026-09-04

## Summary

Make OWNER-VISUAL MODE the default Vox Mana operating assumption: Codex owns objective engineering verification, while the Owner owns final subjective visual judgment. Browser automation remains available only when it materially verifies changed objective behavior that cannot be protected more cheaply below the browser layer.

## Owner Decisions

- The Owner owns aesthetics, layout, spacing, hierarchy, animation feel, responsive appearance, screenshots, pixel differences, artistic fidelity, and subjective UI quality.
- Codex owns implementation correctness, focused regression protection, and objective static, data, DOM, interaction, state, routing, keyboard, focus, and accessibility verification.
- Visual and screenshot testing is opt-in. Browser testing requires a changed-risk justification.
- An unrelated, pre-existing, flaky, timing-sensitive, infrastructure, timeout, or ambiguous browser failure receives one reasonable causal check. Without evidence of causality, stop, disclose it as known or suspected harness debt, and continue toward Owner Review when directly relevant verification is green.

## Five Acceptance Criteria

1. `docs/qa/RobQAPass.md` contains one clear canonical OWNER-VISUAL MODE definition.
2. Active RobQA and RobDev guidance no longer imposes unconditional agent visual judgment or rendered-product witnessing.
3. `AGENTS.md`, `/plan`, `/test`, and workflow guidance consistently use proportional objective verification and Owner visual review.
4. Governing QA policy contains the strict one-attempt causal stop rule and states that unrelated harness debt does not block Owner Review.
5. Meaningful engineering verification remains required, including focused browser interaction checks when changed objective behavior justifies them.

## RobDev Pre-Edit Contract

- Intended outcome: remove ceremonial browser and visual QA pressure without weakening objective software verification.
- Owning authority: `docs/qa/RobQAPass.md`, with concise downstream references.
- Changed behavior: test selection, readiness evidence, browser invocation, visual responsibility, and ambiguous-failure handling.
- Protected behavior: implementation correctness, deterministic regression protection, accessibility and interaction verification, and risk-proportional browser use.
- Consumers: repository agents, RobDev, RobQA, `/plan`, `/test`, SHIP workflow, and the Owner review handoff.
- Smallest complete change: one canonical policy plus short aligned references in active governance surfaces.
- Non-goals: production UI changes, harness repair, VM-616 repair, historical card/handoff audit, or broad RobQA redesign.
- Stop condition: active governance is internally consistent and lightweight document checks pass without launching browser suites.

## Harness Disposition

- `npm run test:browser-smoke` remains a focused harness with documented fresh-session debt; it is not a general-purpose required gate.
- `npm run test:maze-onboarding-browser` still includes VM-616 screenshots and animation-sensitive waits; it is not a general-purpose required gate.
- Neither harness should run for unrelated work. Splitting or repairing them belongs in a separate future card if the Owner wants that investment.

## Verification Plan

- QA-0 documentation/governance review.
- Targeted assertions for the canonical policy and downstream references.
- Contextual contradiction search across only the active governance surfaces.
- Markdown link-target checks for changed governance documents.
- Git diff and whitespace checks.
- No runtime application tests, browser tests, screenshots, visual QA, or historical harness execution.

## Human Review

Glance at the canonical OWNER-VISUAL MODE section in `docs/qa/RobQAPass.md`, then the concise references in `AGENTS.md`, `docs/dev/RobDevPass.md`, `.agents/skills/robqa/robqa.md`, `.codex/prompts/test.md`, `.codex/prompts/plan.md`, and `docs/reference/workflow.md`.

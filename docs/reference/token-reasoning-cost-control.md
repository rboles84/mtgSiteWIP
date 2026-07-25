# Token And Reasoning Cost Control

Status: Active operational guidance

## Principle

Perform the least amount of reasoning, context retrieval, search, and tool usage necessary to produce a correct result while fully satisfying all applicable governance requirements.

## Default Behavior

- Use the lowest reasoning effort adequate for the task.
- Prefer direct answers for simple questions.
- Stop once the requested outcome is adequately supported.
- Do not reread, resummarize, or reconcile broad prior context unless the current task materially depends on it.
- Treat accepted project decisions as fixed unless new evidence directly conflicts with them.
- Use targeted searches and checks instead of broad exploratory sweeps.
- Use one authoritative source or local source of truth when that is sufficient.

## Context And Tool Discipline

- Prioritize the latest user request and only the prior context needed to answer it.
- Retrieve older context only when it affects the current task, risk, or acceptance criteria.
- Do not browse, search files, inspect connected sources, or call tools unless the task requires it.
- Reuse information already obtained during the current task.
- Do not repeat equivalent searches or validations after sufficient evidence exists.
- For longer work, provide meaningful updates only when there is a finding, decision, blocker, or completed stage.

## Escalation Triggers

Use deeper reasoning, broader context retrieval, or more complete validation only when at least one condition applies:

- The task is high-stakes or protected by project governance.
- Evidence conflicts materially.
- The request asks for a deep audit, comprehensive analysis, high-confidence verification, or adversarial review.
- A mistake would create substantial rework.
- The work touches source authority, MTG factual claims, generated/source boundaries, data migrations, destructive operations, review gates, certification, security, privacy, financial/legal/medical guidance, deployment, or release-critical behavior.

When deeper reasoning is required, keep it targeted to the uncertain or high-risk portion.

## Precedence

This policy governs efficiency only. It does not waive, shorten, replace, or reinterpret any required validation, source-authority rule, protected workflow, review gate, testing requirement, handoff obligation, Kanban control, migration safeguard, or destructive-change restriction. When efficiency guidance conflicts with task-specific governance, the stricter task-specific governance controls.

## Handoff Usage

Record efficiency or escalation notes only when useful, such as when reasoning was deliberately escalated for a protected task or when work intentionally stayed narrower than the project's default workflow.

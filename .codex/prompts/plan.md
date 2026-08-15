# Planning Architect

Spawn a Planning Architect subagent.

## Required Pre-Flight

Before planning:
- Read `AGENTS.md`
- Read `docs/handoffs/HANDOFF_INDEX.md`
- Read recent/relevant handoffs
- Read `docs/kanban/board.md`
- Read related Kanban cards

Do not proceed from a blank slate.

## Task

Create a full implementation plan for the requested Vox Mana enhancement.

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Read relevant repo files before recommending changes.
- Do not modify files except for the required handoff file and `docs/handoffs/HANDOFF_INDEX.md`.
- Identify current state.
- Identify impacted files.
- Identify data/schema impacts.
- Identify UI/UX impacts.
- Identify risks and guardrails.
- Apply `docs/qa/RobQAPass.md`: classify the QA tier, name changed behavior and protected contracts, then identify the smallest risk-proportional tests needed.
- Record expensive suites intentionally skipped and require concrete changed-risk justification for any CPU-heavy or exhaustive suite.
- For visible UI changes, plan rendered-product self-QA and the shortest deterministic owner review.
- Preserve existing architecture and naming.
- Preserve Vox Mana tone and Commander-first direction.
- Do not invent lore or commander facts.

## Output Format

Return Markdown with:

1. Summary
2. Current-state findings
3. Recommended approach
4. Files likely impacted
5. Data/schema impacts
6. UI/UX impacts
7. Risks and guardrails
8. Step-by-step implementation plan
9. Acceptance criteria
10. QA tier, protected contracts, tests to run, and expensive suites intentionally skipped
11. Do-not-touch areas
12. Recommended Kanban card
13. Codex-ready implementation prompt

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-planning-architect-short-task.md`

Update:

`docs/handoffs/HANDOFF_INDEX.md`

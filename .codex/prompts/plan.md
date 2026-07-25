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
- Identify tests needed.
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
10. Tests to run
11. Do-not-touch areas
12. Recommended Kanban card
13. Codex-ready implementation prompt

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-planning-architect-short-task.md`

Update:

`docs/handoffs/HANDOFF_INDEX.md`

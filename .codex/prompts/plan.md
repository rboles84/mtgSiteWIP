# Planning Architect

Spawn a Planning Architect subagent.

## Required Pre-Flight

Before planning:
- Read `AGENTS.md`
- Read `.agents/skills/robdev/SKILL.md` and `.agents/skills/robdev/robdev.md`
- Read `docs/dev/RobDevPass.md`
- Read `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md`
- Read `docs/qa/RobQAPass.md`
- Read `docs/handoffs/HANDOFF_INDEX.md`
- Read recent/relevant handoffs
- Read `docs/kanban/board.md`
- Read related Kanban cards

Do not proceed from a blank slate.

## Task

Create a full implementation plan for the requested Vox Mana enhancement.

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Use the repo-local `robdev` skill and `robdev.md` before proposing implementation; `docs/dev/RobDevPass.md` remains authoritative. Identify the owning layer and producer, nearest reusable machinery, changed and protected behavior, consumers and blast radius, relevant failure/recovery states, smallest complete implementation, non-goals, and stop conditions.
- Read relevant repo files before recommending changes.
- Do not modify files except for the required handoff file and `docs/handoffs/HANDOFF_INDEX.md`.
- Identify current state.
- Identify impacted files.
- Identify data/schema impacts.
- Identify UI/UX impacts.
- Identify risks and guardrails.
- Use the repo-local `robqa` skill and `robqa.md`, with `docs/qa/RobQAPass.md` remaining authoritative: classify the QA tier, name changed behavior and protected contracts, then identify the smallest risk-proportional tests needed.
- Record expensive suites intentionally skipped and require concrete changed-risk justification for any CPU-heavy or exhaustive suite.
- For visible UI changes, plan rendered-product self-QA and the shortest deterministic owner review.
- Preserve existing architecture and naming.
- Preserve Vox Mana tone and Commander-first direction.
- Do not invent lore or commander facts.

## Output Format

Return Markdown with:

1. Summary
2. Current-state findings
3. RobDevPass pre-edit contract
4. Recommended approach
5. Files likely impacted
6. Data/schema impacts
7. UI/UX impacts
8. Risks and guardrails
9. Step-by-step implementation plan
10. Acceptance criteria
11. QA tier, protected contracts, tests to run, and expensive suites intentionally skipped
12. Do-not-touch areas
13. Recommended Kanban card
14. Codex-ready implementation prompt

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-planning-architect-short-task.md`

Update:

`docs/handoffs/HANDOFF_INDEX.md`

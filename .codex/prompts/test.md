# Test Strategist

Spawn a Test Strategist subagent.

## Required Pre-Flight

Before testing work:
- Read `AGENTS.md`
- Read `docs/handoffs/HANDOFF_INDEX.md`
- Read recent relevant handoffs
- Read `docs/kanban/board.md`
- Read related cards

## Task

Create or update the testing plan for the current Vox Mana enhancement.

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Identify unit tests.
- Identify parser tests.
- Identify DOM/UI tests.
- Identify data validation tests.
- Identify regression risks.
- Recommend exact commands to run.
- Do not implement unless explicitly asked, except for the required handoff and `docs/handoffs/HANDOFF_INDEX.md` updates.
- Preserve current test conventions.

## Required Output

Return Markdown with:

1. Test scope
2. Risk areas
3. Suggested test files
4. Suggested test cases
5. Regression checks
6. Commands to run
7. Manual checks
8. Pass/fail expectations

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-test-strategist-short-task.md`

Update:

`docs/handoffs/HANDOFF_INDEX.md`

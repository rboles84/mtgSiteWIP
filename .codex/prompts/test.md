# Test Strategist

Spawn a Test Strategist subagent.

## Required Pre-Flight

Before testing work:
- Read `AGENTS.md`
- Read `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md`
- Read `docs/qa/RobQAPass.md`
- Read `docs/handoffs/HANDOFF_INDEX.md`
- Read recent relevant handoffs
- Read `docs/kanban/board.md`
- Read related cards

## Task

Create or update the testing plan for the current Vox Mana enhancement.

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Use the repo-local `robqa` skill and `robqa.md` before selecting tests; `docs/qa/RobQAPass.md` remains authoritative. Classify the QA tier, changed behavior, protected contracts, and realistic regressions.
- Select the narrowest relevant unit, parser, DOM/UI, data, accessibility, and rendered-product checks.
- Do not prescribe CPU-heavy or exhaustive engine, journey, synthetic, mutation, or recovery suites for small presentation, copy, styling, or ordinary component fixes unless the changed protected behavior concretely justifies them.
- For visible UI changes, require rendered-product self-QA. Convert manual owner findings into the narrowest appropriate systemic regression invariant and bound final owner review to genuine product judgment.
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
7. Expensive suites intentionally skipped or justified
8. Rendered self-QA and bounded owner checks
9. Pass/fail expectations

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-test-strategist-short-task.md`

Update:

`docs/handoffs/HANDOFF_INDEX.md`

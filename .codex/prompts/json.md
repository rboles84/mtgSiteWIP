# JSON Cartographer

Spawn a JSON Cartographer subagent.

## Required Pre-Flight

Before JSON/data work:
- Read `AGENTS.md`
- Read `docs/handoffs/HANDOFF_INDEX.md`
- Read recent relevant handoffs
- Read `docs/kanban/board.md`
- Read related cards

## Task

Map, validate, and explain the Vox Mana JSON/data layer.

## Rules

Allowed:
- Inventory JSON files.
- Identify canonical source JSON.
- Identify generated JSON.
- Map fields to UI consumers.
- Detect missing fields.
- Detect duplicate fields.
- Detect schema drift.
- Detect stale fields.
- Recommend validation improvements.
- Create documentation reports.
- Create the required handoff and update `docs/handoffs/HANDOFF_INDEX.md`.

Not allowed:
- Invent lore or commander facts.
- Rewrite faction identity.
- Change generated files directly when source files should be changed.
- Delete JSON fields without review.
- Modify runtime code unless explicitly asked.

## Required Output

Return Markdown with:

1. JSON inventory
2. Source vs generated map
3. Field usage map
4. Schema drift findings
5. Missing/stale field findings
6. Risk areas
7. Recommended fixes
8. Codex-ready next prompt

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-json-cartographer-short-task.md`

Update:

`docs/handoffs/HANDOFF_INDEX.md`

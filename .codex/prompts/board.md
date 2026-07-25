# Kanban Steward

Spawn a Kanban Steward subagent.

## Required Pre-Flight

Before updating the board:
- Read `AGENTS.md`
- Read `docs/handoffs/HANDOFF_INDEX.md`
- Read recent relevant handoffs
- Read `docs/kanban/board.md`
- Read existing cards in `docs/kanban/`

## Task

Create or update a file-based Kanban card.

## Board Location

`docs/kanban/`

Statuses:
- `backlog`
- `ready`
- `in-progress`
- `blocked`
- `done`

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Do not modify runtime code.
- Required handoff and `docs/handoffs/HANDOFF_INDEX.md` updates are allowed.
- Create new cards in `docs/kanban/backlog/` unless told otherwise.
- Use the next available `VM-###` ID.
- Update `docs/kanban/board.md`.
- Do not delete cards.
- Do not mark work done unless tests or user confirmation support it.
- Do not invent requirements not present in the source plan.

## Card Template

Each card must include:

- ID
- Title
- Status
- Type
- Area
- Priority
- Created
- Summary
- Source
- Acceptance Criteria
- Files Likely Impacted
- Risks
- Implementation Prompt
- Notes

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-kanban-steward-short-task.md`

Update:

`docs/handoffs/HANDOFF_INDEX.md`

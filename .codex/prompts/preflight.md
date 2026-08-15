# Vox Mana Pre-Flight Review

Run this before any meaningful work.

## Task

Review project memory before acting.

Read:
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- recent relevant files in `docs/handoffs/`
- `docs/kanban/board.md`
- related cards in `docs/kanban/`
- related docs/plans if referenced

## Return

Provide:

1. Relevant prior work
2. Current card/status
3. Known risks
4. Files recently touched
5. Decisions already made
6. What should not be touched
7. Recommended next action
8. Proposed `RobQAPass` QA tier, changed behavior, and protected contracts; do not select test commands until these are identified

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Apply `docs/qa/RobQAPass.md` to QA scope selection; project-specific and stricter protected workflows remain authoritative.
- Do not modify files.
- Do not implement.
- Do not guess missing context.
- If no relevant prior handoff exists, say: `No relevant prior handoff found.`

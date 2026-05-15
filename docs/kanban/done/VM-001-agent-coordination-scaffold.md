# VM-001 - Fix Agent Coordination Scaffold

ID: VM-001
Title: Fix Agent Coordination Scaffold
Status: done
Type: documentation
Area: agent workflow
Priority: normal
Created: 2026-05-14

## Summary

Make the agent workflow files internally consistent and usable as the repo coordination layer.

## Source

User-requested implementation plan in Codex thread.

## Acceptance Criteria

- `AGENTS.md` closes the common commands code fence.
- `docs/kanban/board.md` identifies the file-based status folders.
- `docs/workflow.md` treats `docs/kanban/` as the local source of truth.
- `.codex/prompts/` role files allow required handoff and index updates.
- Handoff template references only roles defined in `AGENTS.md`.

## Files Likely Impacted

- `AGENTS.md`
- `docs/workflow.md`
- `docs/kanban/board.md`
- `.codex/prompts/*.md`
- `docs/handoffs/templates/agent-handoff-template.md`

## Risks

- Existing external GitHub Issues or Projects may need manual syncing if they were being used before the local file-based board was introduced.

## Implementation Prompt

Apply the accepted scaffold fixes as documentation-only changes. Do not modify runtime code, JSON data, or generated artifacts.

## Notes

- Completed as documentation-only scaffold cleanup.

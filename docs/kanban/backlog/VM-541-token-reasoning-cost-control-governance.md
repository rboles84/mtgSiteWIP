# VM-541 - Token And Reasoning Cost Control Governance

Status: Backlog
Type: Documentation / Governance
Area: Agent Coordination
Priority: P2
Created: 2026-07-25

## Summary

Add a centralized token and reasoning cost control policy for Vox Mana agent work. The policy should improve operational efficiency without weakening required governance, source authority, validation, Kanban, handoff, testing, migration, review, or destructive-change controls.

## Source

User-approved implementation plan on 2026-07-25.

## Acceptance Criteria

- Canonical policy exists at `docs/reference/token-reasoning-cost-control.md`.
- `AGENTS.md`, `CLAUDE.md`, and `docs/reference/workflow.md` reference the policy without weakening stricter workflows.
- Relevant `.codex/prompts/*` files include a one-line pointer to the policy instead of duplicating it.
- Handoff template includes optional efficiency/escalation notes only.
- Handoff index and Kanban board are updated.
- Final diff scope contains only authorized governance/documentation files.

## Files Likely Impacted

- `docs/reference/token-reasoning-cost-control.md`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/reference/workflow.md`
- `.codex/prompts/*`
- `docs/handoffs/templates/agent-handoff-template.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/YYYY-MM-DD-HHMM-codex-token-reasoning-governance.md`

## Risks

- Policy wording could accidentally imply that required validation or protected workflows may be skipped.
- Repeating the policy too widely could create governance sprawl.
- Future agents may over-apply efficiency rules to CRIT, source-authority, or MTG factual work unless precedence is explicit.

## Implementation Prompt

Implement the canonical token and reasoning cost control policy as lightweight governance. Keep it centralized, add compact pointers from the main instruction surfaces, and explicitly state that stricter task-specific governance always wins.

## Notes

- Do not touch runtime code, source data, generated artifacts, CRIT semantic files, packages, tests, deployment configuration, branches, remotes, or the Excel tracker.

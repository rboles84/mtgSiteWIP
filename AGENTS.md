# AGENTS.md

## Project Identity

Vox Mana is a Commander-first MTG discovery, lore, identity, and search experience.

The repo should be treated as:
- application code
- product brain
- design archive
- documentation system
- agent coordination layer

## Required Workflow

For any non-trivial work, the main agent must follow:

1. Pre-flight review
2. Planning
3. Kanban update
4. Implementation
5. Testing
6. Documentation update
7. Handoff report

Do not work from blank context.

## Mandatory Pre-Flight Review

Before starting any planning, implementation, documentation, JSON/data, or testing task, review:

1. `docs/handoffs/HANDOFF_INDEX.md`
2. Recent relevant handoff files in `docs/handoffs/`
3. `docs/kanban/board.md`
4. Related Kanban cards
5. Related docs/plans

The agent must summarize:
- recent related work
- current known risks
- relevant decisions already made
- files recently changed
- what should not be touched

If no relevant handoffs exist, state:

`No relevant prior handoff found.`

Do not begin implementation until this pre-flight review is complete.

## Required Agent Handoff

Every specialist subagent and every major main-agent task must create or update a handoff file.

Location:

`docs/handoffs/`

Filename format:

`YYYY-MM-DD-HHMM-agent-name-short-task.md`

Every handoff must include:
- Agent name
- Task requested
- Files reviewed
- Files changed
- What changed
- Why it changed
- Decisions made
- Risks / uncertainties
- Tests run
- Not touched
- Follow-up recommendations
- Next suggested agent
- Related Kanban card, docs, or plans

Also update:

`docs/handoffs/HANDOFF_INDEX.md`

## Agent Roles

### Planning Architect

Creates implementation plans. Does not modify files unless explicitly asked.

### Kanban Steward

Creates and updates file-based work cards in `docs/kanban/`.

### Documentation Steward

Organizes, merges, indexes, and archives documentation. Does not touch runtime code.

### JSON Cartographer

Maps and validates JSON/data structure. Does not invent lore or commander facts.

### Test Strategist

Creates test strategy and acceptance checks.

## Hard Rules

- Do not delete docs permanently. Archive instead.
- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Prefer canonical source JSON over generated JSON.
- Do not directly edit generated files when source files should be updated.
- Keep changes scoped.
- Preserve Vox Mana’s tone: mystical, lore-rich, Commander-first, readable.
- Preserve existing project themes unless explicitly told to redesign.
- Always report files changed and tests run.

## CRIT-001 Drift Control

For every CRIT-001 Goal mode, review, remediation, or certification task, first apply the mandatory drift-control baseline at `docs/incidents/CRIT-001-drift-control-template.md`. Every identity must complete the applicable drift checkpoint before advancing gates, and any `FAIL` or `UNKNOWN` scorecard result stops progression.

Gate 1+2 must record frozen fields and fixture/provenance locators. Candidate creation must include exact-chain checks and exact candidate-scope validation. Superseded candidates remain recorded. Independent review must rerun the controls instead of trusting implementation summaries. Certification must reconcile reviewed/generated truth before governance and tracker updates. Only exact candidate SHAs may be reviewed or approved, and only exact approved candidate SHAs may be certified.

The next identity may remain setup-only before current certification, but it may not receive semantic work. Every new identity must receive a separate committed drift-preflight control record before Gate 1+2 semantic work begins. Do not weaken stricter CRIT-001 playbook, contract, or gate rules.

## Common Commands

Use these when applicable:

```bash
npm test
npm run test:parser
```

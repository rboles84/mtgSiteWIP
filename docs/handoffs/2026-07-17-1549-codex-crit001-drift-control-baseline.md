# CRIT-001 Drift Control Baseline Handoff

- Agent name: Codex
- Task requested: Install the permanent drift-control framework from the post-Selesnya certification / Simic setup state.
- Files reviewed: `AGENTS.md`, `docs/incidents/CRIT-001-operating-playbook.md`, `docs/incidents/CRIT-001-identity-recovery-ledger.json`, `docs/incidents/CRIT-001-identity-recovery-ledger.md`, `docs/kanban/board.md`, `docs/kanban/backlog/VM-516-simic-semantic-recovery.md`, relevant Golgari/Gruul/Dimir/Orzhov/Selesnya recovery reports, `docs/handoffs/HANDOFF_INDEX.md`, and the supplied canonical drift-control document.
- Files changed: `docs/incidents/CRIT-001-drift-control-template.md`, `docs/incidents/CRIT-001-drift-register.md`, `AGENTS.md`, `docs/incidents/CRIT-001-operating-playbook.md`, `docs/kanban/backlog/VM-516-simic-semantic-recovery.md`, `docs/kanban/board.md`, `docs/incidents/CRIT-001-identity-recovery-ledger.json`, `docs/incidents/CRIT-001-identity-recovery-ledger.md`, and `docs/handoffs/HANDOFF_INDEX.md`.
- What changed: Added the canonical drift-control template, a seeded drift register, mandatory references in agent/playbook authority, minimal VM-516 setup-hold governance, and this handoff/index record.
- Why it changed: Selesnya certification exposed recurring drift classes that need permanent controls before Simic Gate 1+2 begins.
- Decisions made: The supplied template was preserved substantively and normalized to the current post-Selesnya state; the prior Selesnya-targeted installer prompt is obsolete; VM-516 remains setup-only until a separate committed drift-preflight record passes.
- Risks / uncertainties: The external tracker still needs a manual update with the governance SHA after this commit. The VM-516 drift-preflight record is intentionally not created in this window.
- Tests run: See final task response for exact validation commands and outcomes.
- Not touched: Simic source, claim, profile, placement, fixture, provenance, public, recruiter, generated semantic data; Selesnya certified semantic files; generated artifacts; runtime code; schemas; validators; builders; scoring; Hall/Crucible files; external Excel tracker; original main worktree.
- Follow-up recommendations: Update the external tracker with this governance SHA, then issue a separate VM-516 drift-preflight prompt from this HEAD.
- Next suggested agent: Governance/CRIT-001 operator for VM-516 drift-preflight only.
- Related Kanban card, docs, or plans: `docs/kanban/backlog/VM-516-simic-semantic-recovery.md`, `docs/incidents/CRIT-001-drift-control-template.md`, `docs/incidents/CRIT-001-drift-register.md`.

# Agent Handoff

- Agent name: Codex
- Task requested: Implement VM-032 as a test-normalization fix only.
- Related Kanban card, docs, or plans:
  - `docs/kanban/done/VM-032-white-mono-adjacent-boundary-leak-to-lorehold.md`
  - `docs/handoffs/2026-05-17-1603-codex-vm032-decision-triage-classification.md`
  - `docs/kanban/done/VM-031-mono-rollout-acceptance-sweep.md`

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-1554-codex-vm031-mono-rollout-acceptance-sweep.md`
- `docs/handoffs/2026-05-17-1558-codex-vm032-white-mono-boundary-follow-up-card.md`
- `docs/handoffs/2026-05-17-1603-codex-vm032-decision-triage-classification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-032-white-mono-adjacent-boundary-leak-to-lorehold.md`
- `docs/reference/manual-test-cases.md`
- `assets/js/quick-reading-tests.js`

## Files changed

- `assets/js/quick-reading-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-032-white-mono-adjacent-boundary-leak-to-lorehold.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-1619-codex-vm032-test-normalization-fix.md`

## What changed

- Normalized mono adjacent assertions so they validate allowed pair-family membership instead of exact raw faction keys.
- Kept the exact model-side lateral target assertion unchanged.
- Updated the manual mono sweep wording so it talks about pair families and explicitly calls out `LOREHOLD` as a valid `WR`-family adjacent example.
- Marked `VM-032` complete and moved it to done.

## Why it changed

VM-032 was classified as a test-normalization issue, not a runtime or scoring defect. The codebase already preserves actual adjacent faction identities in results while normalizing family analogs for external routing, so the assertion needed to match that established contract.

## Decisions made

- Used `getExternalDeckRoutingAlias(...).colorIdentity` inside the test to normalize adjacent-family membership.
- Left runtime adjacent output unchanged so `LOREHOLD` remains `LOREHOLD` in raw and displayed identity paths.
- Did not touch scoring, presenter behavior, commander dossier logic, or placement model artifacts.

## Risks / uncertainties

- Future acceptance work should keep the distinction clear between pair-family validation and displayed adjacent identity labels.
- If a later product decision requires collapsing displayed labels to family names, that would be a separate presenter-policy card.

## Tests run

- `npm.cmd run test:placement`
- `npm.cmd test`

Results:

- `test:placement`: passed, `20 factions, 20 golden paths`
- `npm test`: passed
- White still accepts `LOREHOLD` as a valid `WR`-family adjacent without collapsing displayed identity labels

## Not touched

- Runtime adjacent rendering
- Scoring behavior
- `assets/js/commander-dossier.js`
- Placement model artifacts

## Follow-up recommendations

- Re-run the mono sweep when adjacent-family expectations expand again so the pair-family wording stays honest.
- If product wants family-collapsed adjacent labels in the UI later, open a separate presenter-policy card rather than extending this completed test fix.

## Next suggested agent

Test Strategist for future acceptance-rail expansion, or Documentation Steward if QA guidance needs broader cleanup later.

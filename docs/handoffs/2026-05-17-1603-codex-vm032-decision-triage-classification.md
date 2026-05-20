# Agent Handoff

- Agent name: Codex
- Task requested: Treat VM-032 as a decision-and-triage pass first and classify whether the White mono adjacent-family failure is a test issue, presenter policy issue, or real bug.
- Related Kanban card, docs, or plans:
  - `docs/kanban/backlog/VM-032-white-mono-adjacent-boundary-leak-to-lorehold.md`
  - `docs/kanban/done/VM-031-mono-rollout-acceptance-sweep.md`
  - `docs/handoffs/2026-05-17-1554-codex-vm031-mono-rollout-acceptance-sweep.md`
  - `docs/handoffs/2026-05-17-1558-codex-vm032-white-mono-boundary-follow-up-card.md`

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-1554-codex-vm031-mono-rollout-acceptance-sweep.md`
- `docs/handoffs/2026-05-17-1558-codex-vm032-white-mono-boundary-follow-up-card.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-032-white-mono-adjacent-boundary-leak-to-lorehold.md`
- `docs/reference/data-contracts.md`
- `assets/js/quick-reading-tests.js`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/shared.js`
- `assets/js/quick-reading.js`
- `data/factions.json`

## Files changed

- `docs/kanban/backlog/VM-032-white-mono-adjacent-boundary-leak-to-lorehold.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-17-1603-codex-vm032-decision-triage-classification.md`

## What changed

- Classified `VM-032` as a decision outcome of `test normalization fix`.
- Added a decision section to the VM-032 card explaining why `LOREHOLD` should be accepted as a valid `WR`-family adjacent for mono White.
- Recorded the exact next-step implementation surface for the chosen path without changing runtime or scoring behavior.

## Why it changed

The sweep failure needed to be classified before any implementation work. The inspected code paths show a clear split:

- placement results preserve actual faction identities like `LOREHOLD`
- adjacent dossier rendering preserves those actual identities
- external Commander routing already normalizes family analogs like `LOREHOLD -> Boros / WR`

That makes the assertion narrower than the current product behavior, which points to test normalization rather than a proven White placement bug.

## Decisions made

- Recommendation: `test normalization fix`
- Not classified as presenter policy issue because the current runtime appears intentionally willing to display the actual adjacent faction name.
- Not classified as real White adjacency bug because no inspected path showed White leaving the `WR` family when `LOREHOLD` appeared.

## Risks / uncertainties

- There is still a product choice available later about whether adjacent display should prefer pair-family labels like `Boros` over world-specific expressions like `Lorehold College`.
- That policy question is separate from the current acceptance failure and should not be conflated with scoring correctness.

## Tests run

- White golden-path raw result inspection via Node
- Code-path inspection for adjacent rendering and routing alias handling

Results:

- White adjacent raw output: `LOREHOLD`, `WU`
- `LOREHOLD` routing alias maps to `guild: "boros"` and `colorIdentity: "WR"`
- Adjacent-fit explanation and adjacent-fit records use the actual faction name/key rather than collapsing to family labels

## Not touched

- Runtime placement behavior
- Scoring
- Adjacent-fit presenter behavior
- Sweep assertion implementation

## Follow-up recommendations

- Implement the next step as a narrow test normalization change in `assets/js/quick-reading-tests.js`.
- Update QA wording in `docs/reference/manual-test-cases.md` only if needed so the acceptance language says `WR-family` rather than only `WR`.
- Re-run `VM-031` rails after the assertion normalization lands.

## Next suggested agent

Test Strategist for the narrow assertion normalization pass.

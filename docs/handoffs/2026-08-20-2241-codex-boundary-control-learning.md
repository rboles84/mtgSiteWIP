# 2026-08-20 22:41 - Codex Boundary Control Learning

## Agent Name

Codex

## Task Requested

Record the VM-570 through VM-574 boundary-control lessons so future agents do not broaden narrow remediation, weaken existing gates, or reopen accepted product work unnecessarily.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-20-0005-codex-vm570-js-architecture-cleanup.md`
- `docs/handoffs/2026-08-20-2103-codex-vm569-scryfall-refresh-media.md`
- `docs/handoffs/2026-08-20-2231-codex-vm574-final-closeout.md`
- `docs/strategy/2026-07-25-token-reasoning-cost-control-learning.md`
- `docs/strategy/2026-07-11-semantic-readiness-integrity-learning.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

## Files Changed

- `docs/strategy/2026-08-20-boundary-control-lessons-vm570-vm574.md`
- `docs/handoffs/2026-08-20-2241-codex-boundary-control-learning.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a permanent strategy learning note that captures the boundary-control lessons from the recent JavaScript cleanup, Scryfall refresh/media reconciliation, and final Card Signals/UI remediation sequence.
- Indexed this handoff for future pre-flight discovery.

## Why It Changed

The recent sequence proved several recurring delivery boundaries: stay inside the authorized layer, treat generated projections as derived output, reconcile drift gates instead of weakening them, preserve staged product candidates semantically across shared-path commits, convert owner findings into narrow invariants, freeze product work after acceptance, and report deployment and validation as separate signals.

## Decisions Made

- Used `docs/strategy/` because `docs/README.md` identifies that folder as the home for decision and learning notes.
- Made no Kanban state change because VM-570, VM-569, and VM-574 were already Done and this was a docs-only learning capture, not a new product work item.
- Made no product/runtime/data/generated/Scryfall changes.

## Risks / Uncertainties

- The separate GitHub Validation workflow for VM-574 closeout SHA `d91ccea76259bf0f34c4902b710beff5a3c90fb6` was observed failed while Pages deployment succeeded. Raw GitHub log download was denied, so the failure remains unclassified here.

## Tests Run

- `git status --short`
- `git diff --check`

## Not Touched

- Product code.
- Runtime rendering.
- Card Signal selections.
- Mana Notes content.
- Scryfall raw data, indexes, projections, or drift gates.
- VM-570, VM-569, or VM-574 accepted implementation commits.

## Follow-Up Recommendations

- Future agents should read `docs/strategy/2026-08-20-boundary-control-lessons-vm570-vm574.md` during pre-flight for nearby architecture, Scryfall/media, generated projection, owner-remediation, or closeout work.
- Classify the failed non-deployment GitHub Validation workflow only under a separate authorized task if it matters to the next acceptance gate.

## Next Suggested Agent

None unless the owner authorizes a separate validation-failure classification task.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-570-javascript-architecture-cleanup-pass-1.md`
- `docs/kanban/done/VM-569-ink-global-media-projection-reconciliation.md`
- `docs/kanban/done/VM-574-all-37-card-signals-mana-notes-remediation.md`
- `docs/strategy/2026-08-20-boundary-control-lessons-vm570-vm574.md`

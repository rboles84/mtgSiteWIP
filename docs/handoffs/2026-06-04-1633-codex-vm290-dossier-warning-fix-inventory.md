## Agent

Codex

## Task Requested

Create a markdown file output of all current dossier audit warnings, deduped so no exact warning appears more than once, with the exact warning text, what needs to be fixed, and why fixing it is needed.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1437-codex-vm289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `artifacts/dossier-snapshots/dossier-audit-report.md`
- `research/dossier-runner.mjs`

## Files Changed

- `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`
- `artifacts/dossier-snapshots/dossier-audit-report.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-290-dossier-warning-fix-inventory.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1633-codex-vm290-dossier-warning-fix-inventory.md`

## What Changed

- Created a deduped warning fix inventory at `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`.
- Generated the inventory from the same audit case path used by `dossier:audit`.
- Grouped exact warning entries by repair class:
  - optional content gaps
  - Commander path identity specificity
  - Commander recommendation fallback
  - rendered duplicate land suppressions
  - source land normalization warnings
- Listed every exact warning once, with affected generated dossier files.
- Added section-level fix guidance and rationale for each warning class.

## Why It Changed

The current `dossier:audit` command passes with `failures: 0` but still reports warning-bearing generated dossiers. The normal audit report repeats many land and source-cleanup warnings across multiple generated files, so this inventory turns that noisy surface into a deduped repair list.

## Decisions Made

- Deduplication key is exact warning text plus warning category.
- Repeated warnings list all affected generated files under one entry.
- The inventory is stored beside the dossier audit artifacts because it is derived from the audit snapshot surface.
- Generated dossier snapshot markdown was not edited directly.

## Risks / Uncertainties

- The inventory is a point-in-time report. It should be regenerated after warning fixes or future audit-policy changes.
- Many warnings share the same repair class, especially land normalization warnings. The file keeps all exact warning strings because the user asked for a complete deduped inventory.

## Tests Run

- `npm.cmd run dossier:audit` - passed with warnings
  - `Pass: 0; warnings: 104; failures: 0`
- Duplicate exact-warning validation - passed
  - `exactWarningLines: 461`
  - `uniqueExactWarnings: 461`
  - `duplicateExactWarnings: 0`

## Not Touched

- Audit semantics.
- Runtime code.
- Canonical source data.
- Generated dossier snapshots beyond the audit report rewrite from `npm.cmd run dossier:audit`.

## Follow-Up Recommendations

- Use the inventory as the repair queue for future content cleanup cards.
- Start with the small high-leverage groups: starter-card content gaps, Commander recommendation fallbacks, and the two Commander path identity-specificity warnings.
- Treat the land warnings as a separate source-data hygiene pass because they are numerous and mechanical.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-290-dossier-warning-fix-inventory.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `artifacts/dossier-snapshots/dossier-warning-fix-inventory.md`
- `artifacts/dossier-snapshots/dossier-audit-report.md`

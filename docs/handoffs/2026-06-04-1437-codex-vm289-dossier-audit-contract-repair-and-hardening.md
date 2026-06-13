## Agent

Codex

## Task Requested

Execute Track B of the two-track cleanup by repairing the dossier audit root causes, realigning the audit contract to runtime behavior, hardening the report output, validating the result, and closing the Kanban card.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent relevant handoffs:
  - `docs/handoffs/2026-06-04-1212-codex-vm287-full-automated-test-sweep.md`
  - `docs/handoffs/2026-06-04-1428-codex-vm288-canonical-home-naming-migration.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `artifacts/dossier-snapshots/dossier-audit-report.md`
- `assets/js/commander-dossier.js`
- `data/factions.json`
- `research/dossier-runner.mjs`
- `research/audit-dossiers.mjs`
- `research/archscry-dossier-followup-tests.js`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `assets/js/commander-dossier.js`
- `data/factions.json`
- `research/dossier-runner.mjs`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1437-codex-vm289-dossier-audit-contract-repair-and-hardening.md`

## What Changed

- Removed the remaining Sultai banned phrase from canonical faction data by rewriting the `Calculated Ruthlessness` archetype description.
- Added a capability-aware dossier audit contract helper in `assets/js/commander-dossier.js`.
- Changed dossier audit semantics so:
  - starter cards are required only when authored and renderable
  - public Commander directory links are required only when the active target faction does not intentionally suppress them
  - four-color dossiers with suppressed public directory links must still expose an alternative Commander discovery surface
- Added advisory warnings for intentionally unauthored starter-card panels instead of treating them as structural failures.
- Added structured audit buckets so the report now separates:
  - content regressions
  - contract failures
  - optional content gaps / advisory warnings
- Added focused regression tests that cover:
  - a primary dossier with intentionally hidden starter cards
  - a four-color dossier with suppressed public Commander directory links
  - an adjacent dossier whose active viewed target owns the starter-card capability check
  - a tampered Sultai dossier that still fails on the banned phrase
- Broadened the practical action-cue matcher for `tableCautionText` so it recognizes the authored verbs already used by current dossier guidance, including `set up`, `commit`, `develop`, `keep`, `spend`, and `convert`.

## Why It Changed

`dossier:audit` was failing for two different classes of problems that had been flattened into one red bucket:

1. Real content regression
   - A banned Sultai phrase still existed in canonical authored faction copy.

2. Audit contract drift
   - The audit still assumed every dossier must expose starter cards and public Commander directory links.
   - The runtime no longer makes those guarantees:
     - empty starter-card panels are hidden
     - four-color public Commander directory links are intentionally suppressed

The repair needed to remove the genuine banned phrase while teaching the audit to validate what the runtime actually promises to show.

## Decisions Made

- Treat the Sultai phrase as a real authored data defect and fix it in canonical faction data instead of masking it in the audit.
- Keep starter-card sparsity as an advisory content gap, not a structural failure, because the UI intentionally hides empty starter-card panels.
- Keep four-color public Commander directory-link suppression as a valid runtime contract and require an alternative discovery surface instead of forcing public Commander directory links back in.
- Harden reporting by separating content regression from contract failure and advisory content gaps.
- Keep broad wedge/four-color starter-card enrichment out of scope for this card.

## Risks / Uncertainties

- `dossier:audit` now reports `warnings: 104` with `failures: 0`. That is correct contract behavior, but it means the repo still has real optional content sparsity around unauthored starter-card panels.
- The broadened action-cue matcher is more permissive by design. If the table-caution style broadens further, future matcher tuning may still be needed.

## Tests Run

- `node research/archscry-dossier-followup-tests.js` - passed
- `npm.cmd run dossier:audit` - passed with warnings
  - `Pass: 0; warnings: 104; failures: 0`
- `npm.cmd test` - passed

## Not Touched

- Broad starter-card content enrichment for wedges or four-color identities.
- User-facing dossier layout or panel behavior.
- Home naming migration work closed in VM-288.
- Raw packet folders and nonessential source-packet content.

## Follow-Up Recommendations

- Open a separate enrichment card if product wants authored starter-card coverage for wedges and four-color identities instead of relying on intentional hidden-panel behavior.
- Keep the new audit buckets and targeted regression fixtures as the baseline for future dossier audit work so content regressions and contract drift do not collapse into one failure class again.
- If the team wants fewer warnings in `dossier:audit`, treat that as content-enrichment work rather than more audit loosening.

## Next Suggested Agent

Codex

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/done/VM-288-canonical-home-naming-migration.md`
- `docs/handoffs/2026-06-04-1212-codex-vm287-full-automated-test-sweep.md`
- `artifacts/dossier-snapshots/dossier-audit-report.md`

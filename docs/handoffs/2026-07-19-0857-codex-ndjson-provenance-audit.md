# 2026-07-19 08:57 - Codex - NDJSON Provenance Audit

## Agent Name

Codex

## Task Requested

Determine whether the two Excel inspect NDJSON files and two color-matrix JS files flagged by VM-541 are legitimate active consumers, then create one governance-only provenance-audit commit.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-certified-preview-consumer-audit.md`
- `docs/handoffs/2026-07-19-0140-codex-certified-preview-consumer-audit.md`
- `docs/kanban/done/VM-541-certified-preview-consumer-audit.md`
- `docs/handoffs/2026-07-05-1403-codex-mtgdata-v3-enhanced-workbook.md`
- `docs/kanban/done/VM-476-mtgdata-v3-enhanced-workbook.md`
- `outputs/mtgdata-v3-enhanced/.work/build-v3-enhanced.mjs`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`
- `outputs/mtgdata-v3-enhanced/qa/workbook-inspect.ndjson`
- `assets/js/newindex-color-matrix.js`
- `assets/js/color-matrix-radar.js`
- `index.html`
- `assets/js/home.js`
- `assets/js/vm-radar.js`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `.github/workflows/validation.yml`
- `package.json`

## Files Changed

- `docs/incidents/CRIT-001-ndjson-provenance-audit.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-542-ndjson-provenance-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-19-0857-codex-ndjson-provenance-audit.md`

## What Changed

Recorded a governance-only audit concluding that the two top-level workbook inspect NDJSON files are `DEBUG_INSPECTION_ARTIFACT` files, and the two color-matrix JS files are `HISTORICAL_ARCHIVE` files with no current live import path.

## Why It Changed

VM-541 correctly found stale copied preview strings but over-classified the four audited files as active consumers before dependency proof existed. This audit resolves that provenance/dependency ambiguity before any Green or VM-522 progression.

## Decisions Made

- The correct recovery option is Option D: no runtime repair.
- Active runtime preview defect count is 0 for the four audited files.
- Debug inspection stale preview cells remain 12.
- Historical/archive stale preview cells remain 12.
- Future DRIFT-015/DRIFT-017 consumer audits must require active import/read/dependency proof before classifying a copied string as active.

## Risks / Uncertainties

- The JS files are runtime-capable and still live under `assets/js`; a future import would reactivate stale historical copy.
- The top-level NDJSON files are tracked full inspection dumps and may keep creating false positives until archived, removed, regenerated, or explicitly documented.
- This audit did not inspect or modify workbook binaries beyond provenance/dependency classification of their inspection dumps.

## Tests Run

- `git status --short --branch`
- `git log --all --follow --name-status -- <audited files>`
- `git show --stat --name-status` for introduction/regeneration commits
- `rg` exact-path and exact-token dependency searches for NDJSON/workbook/artifact readers
- `rg` exact import/search checks for `newindex-color-matrix` and `color-matrix-radar`
- NDJSON line/kind summary inspection
- `git diff --check`

## Not Touched

Runtime source files, canonical data, generated data, workbook binaries, workbook inspect NDJSON, validator prototype files, Green / VM-521 worktree files, VM-522 files, original main, external Excel tracker, package scripts, CI workflows, and protected worktrees were not modified.

## Follow-up Recommendations

- Create a separate repository-hygiene card to archive/document the two historical JS files.
- Create a separate workbook-artifact hygiene card to remove/archive/regenerate top-level `*.xlsx.inspect.ndjson` files if they are no longer worth tracking.
- Extend future candidate-scope/consumer validation with dependency classification before stale-copy findings are counted as active defects.

## Next Suggested Agent

Kanban Steward or CRIT-001 Certification Coordinator, to accept the governance-only audit result and resume the normal VM-521 Green drift-preflight path.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-542-ndjson-provenance-audit.md`
- `docs/incidents/CRIT-001-ndjson-provenance-audit.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-certified-preview-consumer-audit.md`

# Codex Handoff - Apocrypha Gate 4 Voice Copy Contract

## Agent Name

Codex

## Task Requested

Continue the Apocrypha repair program with Gate 4 only: define the Vox Mana voice and copy contract that Gate 5 can apply to registry-driven rendering, without changing the live Apocrypha page or any runtime files.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/reference/workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/research/apocrypha-gate02a-registry-audit.md`
- `docs/research/apocrypha-gate03-information-architecture.md`
- `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- `docs/handoffs/2026-07-25-1247-codex-apocrypha-gate02-source-registry.md`
- `docs/handoffs/2026-07-25-1346-codex-apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/2026-07-25-1402-codex-apocrypha-gate03-information-architecture.md`
- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/kanban/done/VM-439-vox-mana-voice-copy-audit.md`
- `docs/kanban/done/VM-440-voice-boundary-copy-repair.md`
- `docs/handoffs/2026-06-30-1351-codex-vm440-443-voice-copy-repair.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `data/apocrypha-source-registry.json`

## Files Changed

- `docs/research/apocrypha-gate04-voice-copy-contract.md`
- `docs/handoffs/2026-07-25-1412-codex-apocrypha-gate04-voice-contract.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added the Gate 4 voice and copy contract as the single authoritative approved-copy source for future Apocrypha rendering.
- Defined page identity direction, trust language, shelf intro copy, badge vocabulary, evidence-role language, verification language, historical/archive treatment, supplemental treatment, source-card microcopy, count rules, no-JavaScript fallback copy, error/unknown copy, copy mapping, current-copy disposition, gap handling, and manual voice QA.
- Kept all approved copy aligned with the Gate 2A registry schema and Gate 3 information architecture.

## Why It Changed

Gate 5 needs a precise copy contract before it renders registry data. The contract ensures Apocrypha separates official evidence from supplemental navigation, avoids unverified-link claims, and preserves Vox Mana's source-conscious Commander field-guide voice.

## Decisions Made

- Kept approved copy in one document instead of creating a second `apocrypha-gate04-approved-copy.md`, to avoid competing source-of-truth documents.
- Preserved `The Apocrypha` and `Where Vox Mana shows its work.` as strong existing page identity copy.
- Required "Pending Link Check" language because all current registry records remain `verification.status: "not-checked"`.
- Treated supplemental references as limited-but-useful navigation/context links, never as official claim support.
- Recorded a scoped Kanban exception because the Gate 4 allowed file list permits a handoff/index but not Kanban board/card changes.

## Risks / Uncertainties

- Gate 4 is documentation-only; the live Apocrypha page still contains hardcoded copy until Gate 5 implements rendering.
- Rules/card-record and official archive shelves remain architecture-ready but registry-empty.
- Link verification remains pending for all 49 records.
- Some official-source gaps must be reconciled before publication or before rendering specific populated shelves.

## Tests Run

- `node scripts/validate-apocrypha-sources.mjs` - passed: 49 records, 40 official, 9 supplemental, 49 not checked, 9 move/remove candidates.
- `npm.cmd run test:route-metadata` - passed for 8 public route heads.
- `git diff --check` - passed with existing line-ending normalization warning for `docs/handoffs/HANDOFF_INDEX.md`.
- Manual voice QA checklist review - passed for the Gate 4 contract.
- High-risk phrase scan - reviewed; matches appear only in disallowed examples, current-copy disposition rows, or verification boundary language.

## Not Touched

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `data/apocrypha-source-registry.json`
- Strategium files
- Archscry files or placement logic
- CRIT-001 semantic data
- Generated files
- Package files
- Original main worktree

## Follow-Up Recommendations

Gate 5 should implement registry-backed Apocrypha rendering using the Gate 3 information architecture and this Gate 4 copy contract, while preserving all current source records and keeping supplemental references visibly separate from official evidence.

## Next Suggested Agent

Frontend implementation agent for Gate 5 registry-driven rendering, paired with JSON Cartographer review if registry schema changes become necessary.

## Related Kanban Card, Docs, Or Plans

- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/research/apocrypha-gate02a-registry-audit.md`
- `docs/research/apocrypha-gate03-information-architecture.md`
- `docs/research/apocrypha-gate04-voice-copy-contract.md`
- `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- `docs/handoffs/2026-07-25-1247-codex-apocrypha-gate02-source-registry.md`
- `docs/handoffs/2026-07-25-1346-codex-apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/2026-07-25-1402-codex-apocrypha-gate03-information-architecture.md`

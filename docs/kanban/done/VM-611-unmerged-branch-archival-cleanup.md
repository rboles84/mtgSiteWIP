# VM-611 - Unmerged Branch Archival Cleanup

ID: VM-611
Title: Unmerged Branch Archival Cleanup
Status: Done
Type: Git governance / documentation hygiene
Area: Git, CRIT-001 evidence, Kanban, handoffs
Priority: High
Created: 2026-08-30
Completed: 2026-08-30
Owner: Codex
Related: CRIT-001, VM-501, VM-502, VM-504, VM-509, VM-521, VM-525, VM-541, VM-545, VM-578

## Summary

Treat `main` as the sole active product branch. Archive every local tip not merged into `main` with one pushed annotated `archive/` tag, retain the exact SHA and historical disposition, then remove only the redundant local branch pointers. No historical object is merged, rewritten, or reclassified as accepted work.

## RobDev Contract

- Product outcome: unique historical Git objects remain remotely resolvable after local branch cleanup.
- Owning layer: Git refs and governance documentation; no runtime, source-data, placement, identity, or accepted-history owner is changed.
- Changed behavior: local branch names are replaced by immutable annotated archival tags.
- Protected behavior: CRIT-001 rejected/failed/superseded dispositions, accepted `main` history, source data, runtime, placement, identity semantics, worktree topology, and remote `main`.
- Smallest complete implementation: one tag per exact stale tip, narrowly updated safety references, one Kanban record, and one handoff.
- Non-goals / stop conditions: no merge, rebase, force-push, remote branch deletion, certification, runtime test, or worktree/branch creation. Stop if a tip cannot be remotely tag-protected and resolved exactly.

## Archived Tips

| Former local branch | Exact tip SHA | Subject | Disposition | Pushed archival tag |
|---|---|---|---|---|
| `backup/vm-504-rejected-silverquill-candidate-078310b` | `16127d0fc8960ec78c57c1742bb2c264399042ef` | VM-504 record Silverquill recovery candidate | rejected | `archive/rejected-vm504-silverquill-candidate-16127d0` |
| `backup/vm-509-boros-failed-candidate-abff94b` | `abff94b91e94b99a6b2a77b71806a9d005ecec76` | VM-509 create Boros semantic recovery candidate | failed | `archive/failed-vm509-boros-candidate-abff94b` |
| `backup/vm-509-boros-failed-workflow-25420ba` | `25420bad09715645ba4af37f07cac097b3e7966d` | VM-509 record Boros recovery candidate | failed | `archive/failed-vm509-boros-workflow-25420ba` |
| `backup/vm-509-boros-rejected-candidate-c2f5d06` | `c2f5d064460a007f0dca6be95b7beabb4ca85026` | VM-509 create Boros replacement semantic recovery candidate | rejected | `archive/rejected-vm509-boros-candidate-c2f5d06` |
| `backup/vm-509-boros-rejected-workflow-d7f2523` | `d7f2523d53cfbc6420e75c83b9ab03192158a1a1` | VM-509 record Boros replacement recovery candidate | rejected | `archive/rejected-vm509-boros-workflow-d7f2523` |
| `codex/audit-vm-502-rejected-prismari-85d3c79` | `bee9ec06a413a66e78e4fffd90a9a6d474284ec0` | VM-502 record rejected Prismari review | rejected | `archive/rejected-vm502-prismari-review-bee9ec0` |
| `codex/crit001-drift017-certified-consumer-audit` | `e5a7af86fe912ff45cb8001659d310506377848c` | VM-541 audit certified preview consumers | audit-only | `archive/audit-only-drift017-consumer-audit-e5a7af8` |
| `codex/crit001-drift017-consumed-preview-scope` | `4044d7e31a15acc630678967b6b6b2a5f8a29695` | CRIT-001 record DRIFT-017 validator stop-line | historical stop-line | `archive/historical-drift017-stop-line-4044d7e` |
| `codex/crit001-ndjson-provenance-audit` | `aa62ac329c53c00016dcce749b5fea73b145d4ac` | docs: resolve CRIT-001 NDJSON provenance audit | audit-only | `archive/audit-only-ndjson-provenance-aa62ac3` |
| `codex/vm-501-semantic-readiness-prerequisite-correction` | `4c6d45432594a9feb3c27becbd47d033cbbf96d8` | VM-501 address prerequisite review blockers | historical | `archive/historical-vm501-prerequisite-correction-4c6d454` |
| `codex/vm-521-green-semantic-recovery` | `542015ab4dee8158002eb96dca65ef03fa81904d` | VM-521 record Green replacement candidate stop-line | failed stop-line | `archive/failed-vm521-green-stop-line-542015a` |
| `codex/vm-525-jund-semantic-recovery-post-drift020` | `ba606b702832ce84baf45055562808f9b971e897` | VM-525: recover Jund semantic identity | superseded | `archive/superseded-vm525-jund-ba606b7` |
| `codex/vm-525-jund-semantic-recovery-post-drift020-candidate` | `4a2c6462c4967f661bfa5357805fc155d2d5a746` | VM-525: recover Jund semantic identity | superseded | `archive/superseded-vm525-jund-candidate-4a2c646` |
| `codex/vm545-strategium-phase0-review` | `072b21af410ba33baa03c0ddbfd43efdef68a9f7` | docs(strategium): record VM-545 Phase 0 review | historical | `archive/historical-vm545-strategium-phase0-072b21a` |
| `loom-identity-lens-v0` | `891cf3e19ee72c19050cc0bee992ef61341e9fc3` | research: establish Loom identity expression evidence model | historical | `archive/historical-loom-identity-lens-v0-891cf3e` |
| `vm578-player-language-corpus-v1` | `0204cfa2c402f647dad68585bcd96b59dd4bcd42` | Add VM-578 player-language corpus baseline | historical | `archive/historical-vm578-player-language-corpus-0204cfa` |

## Evidence and Verification

- All 16 tags are annotated, pushed to `origin`, and must peel to the SHA shown above before deleting a matching local branch.
- CRIT-001 references were classified from the recovery ledger, recovery records, Kanban, and handoffs. Rejected, failed, and superseded wording is preserved exactly as historical disposition; archival tags do not confer approval or certification.
- QA classification: QA-0. Validate the exact tag-to-commit mapping, remote tag resolution, documentation references, `git diff --check`, `main`/`origin/main` parity, one-worktree state, and remaining ordinary local branches. Runtime, placement, rendered-product, and certification suites are intentionally not applicable.

## Files Not Touched

- Runtime code, source or generated data, placement logic, identity semantics, fixtures, and accepted product history.
- Remote branches, including `origin/main`.

# Apocrypha Gate 7 Publish Readiness

Date: 2026-07-25

## Authority

| Field | Value |
|---|---|
| Review branch | `codex/apocrypha-gate6-independent-browser-qa` |
| Worktree | `C:\dev\voxmana.io-apocrypha-gate6-review` |
| Starting SHA | `363d68d8ebb132c2cdcba2c431d5261a672a9e60` |
| Starting parent | `36e8cc614714de5af5b292b5070580ef83d9c75d` |
| Approved runtime candidate SHA | `36e8cc614714de5af5b292b5070580ef83d9c75d` |
| Gate 6 review documentation SHA | `363d68d8ebb132c2cdcba2c431d5261a672a9e60` |
| Original Apocrypha base | `606ef686e2d18dd98c60407e15ba91ef3639e1a6` |
| Current local main | `606ef686e2d18dd98c60407e15ba91ef3639e1a6` |
| Current remote-tracking main | `606ef686e2d18dd98c60407e15ba91ef3639e1a6` |
| Merge base between main and Gate 6 review commit | `606ef686e2d18dd98c60407e15ba91ef3639e1a6` |
| Local main vs origin/main | Agree, 0 ahead / 0 behind after `git fetch origin`. |
| Main vs Gate 6 review branch | Main is 0 ahead, review branch is 8 commits ahead. |
| Remote URL | `https://github.com/rboles84/voxmana.io.git` |

Gate 7 is documentation-only. It does not merge, push, publish, or modify runtime/data/validator files.

## History Proof

First-parent history from original base to Gate 6 review commit is exactly the expected controlled sequence:

| Gate | Commit | Subject | Verified |
|---|---|---|---|
| Gate 0/1 | `4ef43d17f817a1a633d897f06dfa603256c8e2c4` | Apocrypha Gate 0 and Gate 1 source inventory | Yes |
| Gate 2 | `b630777243a4c7fdc441c0b70d77c3229e004c34` | Apocrypha Gate 2 source registry | Yes |
| Gate 2A | `dcb3328be42884af177b2ee4376bd4c7b1343bf0` | docs(apocrypha): harden Gate 2 source registry | Yes |
| Gate 3 | `585eb5e0bf588bae13d0ad549c94b3fd7ff46a91` | docs(apocrypha): define Gate 3 information architecture | Yes |
| Gate 4 | `e2e905f662948571f238b16c9d8547f57992cb2b` | docs(apocrypha): define Gate 4 voice contract | Yes |
| Gate 4.5 | `26ea8f41579e513d6dd52e3c106649be60942d7d` | data(apocrypha): resolve pre-render source gaps | Yes |
| Gate 5 | `36e8cc614714de5af5b292b5070580ef83d9c75d` | feat(apocrypha): render source library from registry | Yes |
| Gate 6 | `363d68d8ebb132c2cdcba2c431d5261a672a9e60` | test(apocrypha): approve Gate 6 browser QA | Yes |

No unexpected commit exists inside this first-parent sequence.

Independent runtime approval already issued:

`APPROVE EXACT SHA 36e8cc614714de5af5b292b5070580ef83d9c75d`

## Drift Audit

### Main Commits Since Original Base

No committed main commits exist after `606ef686e2d18dd98c60407e15ba91ef3639e1a6`. Local `main` and freshly fetched `origin/main` both resolve to the original Apocrypha base.

### Main-Changed Paths Since Original Base

None.

### Apocrypha-Changed Paths Through Gate 6

Runtime:

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`

Registry/data:

- `data/apocrypha-source-registry.json`

Validation:

- `scripts/validate-apocrypha-rendering.mjs`
- `scripts/validate-apocrypha-sources.mjs`

Research documentation:

- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/research/apocrypha-gate02a-registry-audit.md`
- `docs/research/apocrypha-gate03-information-architecture.md`
- `docs/research/apocrypha-gate04-voice-copy-contract.md`
- `docs/research/apocrypha-gate045-source-gap-implementation.md`
- `docs/research/apocrypha-gate05-registry-rendering.md`
- `docs/research/apocrypha-gate06-independent-browser-qa.md`

Handoffs:

- `docs/handoffs/2026-07-25-1247-codex-apocrypha-gate02-source-registry.md`
- `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- `docs/handoffs/2026-07-25-1346-codex-apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/2026-07-25-1402-codex-apocrypha-gate03-information-architecture.md`
- `docs/handoffs/2026-07-25-1412-codex-apocrypha-gate04-voice-contract.md`
- `docs/handoffs/2026-07-25-1452-codex-apocrypha-gate045-source-gaps.md`
- `docs/handoffs/2026-07-25-1525-codex-apocrypha-gate05-static-rendering.md`
- `docs/handoffs/2026-07-25-1609-codex-apocrypha-gate06-browser-qa.md`
- `docs/handoffs/HANDOFF_INDEX.md`

Other changed files: none.

### Overlap Classification

| Area | Committed main overlap | Classification |
|---|---|---|
| Apocrypha runtime files | None | No overlap |
| Registry/data | None | No overlap |
| Validation scripts | None | No overlap |
| Research documentation | None | No overlap |
| Handoffs | None committed | No committed overlap |
| Kanban | None committed in Apocrypha range | No committed overlap |
| Strategium | None | No overlap |
| Archscry | None | No overlap |
| CRIT semantic/generated files | None | No overlap |

Conflict-risk result: no committed conflict risk was found because current main has not advanced beyond the Apocrypha base.

### Uncommitted Original-Main Dirt

The original main worktree is not clean and must not be used directly as the integration location until resolved or avoided:

- Modified: `docs/handoffs/HANDOFF_INDEX.md`
- Modified: `docs/kanban/board.md`
- Untracked: `docs/handoffs/2026-07-25-1240-codex-vm545-strategium-phase0-review.md`
- Untracked: `docs/kanban/done/VM-545-strategium-recovery-phase-0-architecture-review.md`

This is uncommitted worktree dirt, not committed main history. It creates an operational blocker for using `C:\dev\voxmana.io` as the integration worktree, especially because `docs/handoffs/HANDOFF_INDEX.md` overlaps the Apocrypha handoff-index updates.

## Final Candidate Inventory

The full Gate 0 through Gate 6 range changes 23 files: 3 runtime files, 1 registry/data file, 2 validation scripts, 8 research reports, and 9 handoff/index files.

Confirmed exclusions:

- No CRIT-001 semantic files changed.
- No Archscry files changed.
- No Strategium runtime files changed.
- No generated semantic files changed.
- No package or build-system rewrite occurred.
- No React, CMS, framework, or second design system was introduced.
- Gate 6 documentation changed no candidate runtime, data, or validator files.

## Final Validation

Validation was run from `C:\dev\voxmana.io-apocrypha-gate6-review` at Gate 6 review commit `363d68d8ebb132c2cdcba2c431d5261a672a9e60` before and after Gate 7 documentation edits.

| Command | Result |
|---|---|
| `node --check assets/js/apocrypha.js` | PASS |
| `node --check scripts/validate-apocrypha-rendering.mjs` | PASS |
| `node --check scripts/validate-apocrypha-sources.mjs` | PASS |
| `node scripts/validate-apocrypha-sources.mjs` | PASS: `Apocrypha source registry validation PASS: 60 records, 51 official, 9 supplemental, 20 not checked, 9 move/remove candidates.` |
| `node scripts/validate-apocrypha-rendering.mjs` | PASS: `Apocrypha rendering validation PASS: 59 authorized records, 45 design, 4 lore, 1 archive, 9 supplemental, 39 verified, 20 pending, 1 suppressed.` |
| `npm.cmd run test:route-metadata` | PASS: `Route metadata check passed for 8 public route heads.` |
| `git diff --check` | PASS |

## Publish-Readiness Disposition

Disposition: ready for controlled main integration, with non-blocking disclosed limitations and required post-integration smoke checks.

Publication blockers found in the approved candidate: none known.

Operational integration blocker: the original main worktree is dirty and should not be used directly for integration.

The candidate provides:

- Registry-backed source rendering.
- Complete no-JavaScript fallback for authorized shelves.
- Honest official-versus-verification treatment.
- Official Design shelf.
- Worldbuilding & Lore shelf.
- Official Archives shelf.
- Supplemental References shelf.
- Suppressed Rules & Card Records shelf.
- 59 rendered authorized records.
- 1 suppressed Rules record.
- 0 missing authorized records.
- 0 duplicate rendered records.
- Approved Gate 4 copy.
- Successful automated validation.
- Exact-SHA independent browser approval.

No known blocker, major, or moderate defect remains.

## Remaining Limitations

| Limitation | Classification | Notes |
|---|---|---|
| 20 rendered sources remain pending network verification | Non-blocking disclosed limitation | Public copy labels them pending and does not claim verified link health. |
| Gatherer remains unresolved | Non-blocking disclosed limitation | Rules & Card Records remains suppressed, so no unsupported card-record claim is made. |
| Rules & Card Records remains suppressed | Non-blocking disclosed limitation | Required until an approved official card-record source is added. |
| Magic Story archive should not be described as complete before 2014 | Non-blocking disclosed limitation | Copy avoids complete-story-archive claims. |
| Exact browser name/version was not captured in Gate 6 | Non-blocking documentation limitation | Human browser QA still passed; capture exact version before publication if release governance requires it. |
| Screen-reader certification was not performed | Follow-up task | Keyboard and structural checks passed; do not call it screen-reader certified. |
| Accessibility-tree inspection was not recorded | Follow-up task | Recommended before publication if accessibility sign-off is required. |
| Malformed-registry browser interception simulations were not performed | Follow-up task | Static validators cover these contracts; browser simulation remains useful. |
| Broad screenshot-baseline visual regression was not approved | Follow-up task | Gate 6 browser evidence is sufficient for candidate approval, not a visual baseline refresh. |
| `APOC-G6-001` tablet Library Rail composition | Minor non-blocking polish | Functional and readable at 768 x 1024; likely CSS-only follow-up. |

## Integration Instructions

Recommended integration target for the approved implementation plus independent browser-QA documentation:

- Exact source branch: `codex/apocrypha-gate6-independent-browser-qa`
- Exact minimum source SHA: `363d68d8ebb132c2cdcba2c431d5261a672a9e60`
- Exact runtime candidate SHA within that history: `36e8cc614714de5af5b292b5070580ef83d9c75d`
- Exact target branch: `main`

The current Gate 7 documentation commit should remain available as the publish-readiness record. If the integrator wants Gate 7 documentation on main as well, integrate the review branch tip after confirming it is still this Gate 7 commit and has no additional changes.

Required preconditions before integration:

1. Do not use the dirty original main worktree as the integration location.
2. Either clear/archive the unrelated original-main dirt in a separate task or create a clean dedicated integration worktree from current `main`.
3. Confirm `main` and `origin/main` still agree or explicitly reconcile any new remote drift.
4. Confirm the source branch still contains `36e8cc614714de5af5b292b5070580ef83d9c75d` and `363d68d8ebb132c2cdcba2c431d5261a672a9e60`.
5. Prefer preserving the controlled first-parent history. Do not cherry-pick individual commits unless a later drift audit proves whole-branch integration unsafe.
6. Push or PR only after explicit user authorization.

Because `main` is currently an ancestor of the Apocrypha review history, the clean integration operation should be a fast-forward or normal branch integration preserving the linear Apocrypha commits. No merge was performed in Gate 7.

## Required Post-Integration Checks

Run after integration and before push/publication:

- `node --check assets/js/apocrypha.js`
- `node --check scripts/validate-apocrypha-rendering.mjs`
- `node --check scripts/validate-apocrypha-sources.mjs`
- `node scripts/validate-apocrypha-sources.mjs`
- `node scripts/validate-apocrypha-rendering.mjs`
- `npm.cmd run test:route-metadata`
- `git diff --check`
- Apocrypha HTTP smoke for route, registry JSON, JS, and CSS assets.
- Confirm 59 authorized records render or appear in fallback.
- Confirm Rules & Card Records shelf remains absent.
- Confirm no unrelated main worktree changes were included.
- Confirm approved runtime candidate files match expected content from `36e8cc614714de5af5b292b5070580ef83d9c75d` unless a separately approved post-Gate-7 fix exists.

## Confirmations

- No runtime files were modified in Gate 7.
- No registry files were modified in Gate 7.
- No validator files were modified in Gate 7.
- No Strategium files were modified in Gate 7.
- No Archscry files were modified in Gate 7.
- No CRIT semantic data was modified in Gate 7.
- No generated files were modified in Gate 7.
- No package files were modified in Gate 7.
- No Kanban files were modified in Gate 7.
- The implementation worktree was not edited.
- The original main worktree was not edited.
- No merge, push, PR, or publication occurred.

## Final Gate 7 Decision

GATE 7 COMPLETE - READY FOR CONTROLLED MAIN INTEGRATION

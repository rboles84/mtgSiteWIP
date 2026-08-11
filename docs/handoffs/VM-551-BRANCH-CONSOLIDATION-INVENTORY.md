# VM-551 Branch Consolidation Inventory

Status: Complete

Purpose: preserve the exact local VM-551 branch/worktree topology and checkpoint lineage before consolidating to one canonical `codex/vm551` branch and `C:\dev\voxmana.io-vm551` worktree.

## Preconditions

- Control repository: `C:\dev\voxmana.io`
- Control `main`: `f44382271f94e9832526bbc10313f0f8c38533b9`
- Latest functional VM-551 worktree: `C:\dev\voxmana.io-vm551-gate-b1-alternatives-repair`
- Latest functional VM-551 tip: `3ece2e83f9fa7ff0f2115ab2dd351a6dbfd2824d`
- `main` is an ancestor of the latest functional tip.
- `codex/vm551` did not exist before consolidation.
- No local or locally tracked remote ref containing `vm551` or `vm-551` existed beyond the seven local branches listed below. A final live `origin` query also found no remote VM-551 branch.
- Every VM-551 worktree was clean under `git status --porcelain=v1 --untracked-files=all`.
- Every older VM-551 branch tip was already an ancestor of the latest functional tip.
- The control `main` worktree contained unrelated owner changes and was deliberately left untouched.

## Branch And Worktree Preservation Table

`Unique commits/files` is measured relative to the latest functional tip before consolidation. Zero means the complete old tip, commits, and tree content are already reachable from that tip.

| Old branch | Worktree | Tip SHA | Clean | Already ancestor | Unique commits/files | Integration action | Final disposition |
|---|---|---|---|---|---|---|---|
| `codex/vm551-gate-b1-product-fit-pass` | `C:\dev\voxmana.io-vm551-gate-b1-product-fit` | `fd5c7576d51bf30798be5fb7957394c3566382fd` | Yes | Yes | 0 commits / 0 files | No merge; history already incorporated | Worktree removed normally; local branch safely deleted; tip preserved in `codex/vm551` |
| `codex/vm551-gate-b1-production-fidelity-preview` | `C:\dev\voxmana.io-vm551-gate-b1-production-preview` | `19c1d3b74a1551c18c800771ebea019e38d159a5` | Yes | Yes | 0 commits / 0 files | No merge; history already incorporated | Worktree removed normally; local branch safely deleted; tip preserved in `codex/vm551` |
| `codex/vm551-gate-b1-real-placement-engine` | `C:\dev\voxmana.io-vm551-gate-b1-engine` | `214a085739ba73a1146d5e09c3882114f7304d9f` | Yes | Yes | 0 commits / 0 files | No merge; history already incorporated | Worktree removed normally; local branch safely deleted; tip preserved in `codex/vm551` |
| `codex/vm551-gate-b1-evidence-routing-remediation` | `C:\dev\voxmana.io-vm551-gate-b1-evidence-remediation` | `a0a517a1aa14c7025b3d7b8f242e55aef35b8670` | Yes | Yes | 0 commits / 0 files | No merge; history already incorporated | Worktree removed normally; local branch safely deleted; tip preserved in `codex/vm551` |
| `codex/vm551-gate-b1-instrument-completion` | `C:\dev\voxmana.io-vm551-gate-b1-instrument-completion` | `a8dd61dcb2175243c801db484d1a9001742a7b0c` | Yes | Yes | 0 commits / 0 files | No merge; history already incorporated | Worktree removed normally; local branch safely deleted; tip preserved in `codex/vm551` |
| `codex/vm551-gate-b1-runtime-integration-repair` | `C:\dev\voxmana.io-vm551-gate-b1-runtime-repair` | `6e262923aebb401fc96711389673c4e1f9a5db2f` | Yes | Yes | 0 commits / 0 files | No merge; history already incorporated | Worktree removed normally; local branch safely deleted; tip preserved in `codex/vm551` |
| `codex/vm551-gate-b1-qualified-alternatives-repair` | `C:\dev\voxmana.io-vm551-gate-b1-alternatives-repair` | `3ece2e83f9fa7ff0f2115ab2dd351a6dbfd2824d` | Yes | Yes (self) | 0 commits / 0 files | Existing branch renamed to `codex/vm551`; no branch created | Existing worktree moved normally to `C:\dev\voxmana.io-vm551`; retained as sole canonical VM-551 branch/worktree |

## Significant VM-551 Checkpoints

Every checkpoint below existed as a commit and was verified as an ancestor of `3ece2e83f9fa7ff0f2115ab2dd351a6dbfd2824d` before consolidation.

| Checkpoint SHA | Preserved significance |
|---|---|
| `471567059c876368329fd7cf9c24eacfcd6d03c1` | Accepted Gate A implementation lineage endpoint before Gate B1 |
| `f44382271f94e9832526bbc10313f0f8c38533b9` | Gate B1 semantic owner approval and current `main` tip |
| `0eb39b915f19e807c337184fe89f45cb391eebc2` | Product-fit and usefulness assessment |
| `5f94031b6ca5f4ba7f485686e7847143d877a52e` | Owner experience prototype |
| `c00e6acd7aa2b0549f9b5ab5beb45227e80f98e5` | Owner experience remediation |
| `79e5b5b56ebf7400961e7b1193d90abfe7acadef` | Final result-usefulness state |
| `f5b030e12871e4a5ca7706d29d25c096a0d51748` | Esper/Yore evidence recovery |
| `dbff4836e43e5fd9b0545677a7d9dcd61c6333a3` | Final Gate B1 architecture decision |
| `fd5c7576d51bf30798be5fb7957394c3566382fd` | Final instrument architecture integration |
| `21ef260b400aca581d1a8f8535baa6d83e0719ff` | Production-fidelity preview implementation |
| `bd5cc61a415703e690ce58577e6760972fabb048` | Production-fidelity experience remediation |
| `5336a5f3573331cef2904f58691a39539340b390` | Authored-route truthfulness remediation |
| `19c1d3b74a1551c18c800771ebea019e38d159a5` | Authored-route owner-review closeout |
| `214a085739ba73a1146d5e09c3882114f7304d9f` | Deterministic real placement engine |
| `48c0f01b333f2262f901bb0a4ca23be9610f44a7` | Discrimination-first routing baseline |
| `bfda0636d5d4d078bde15ce0000ade65d40e8d15` | Responsible evidence-routing enforcement |
| `a0a517a1aa14c7025b3d7b8f242e55aef35b8670` | Evidence-routing owner packet |
| `15d73b706e1b569978de78fb76a4446d7f7c206c` | Instrument-completion authority |
| `f21531ac02adba450f5899ff85a4a6d51f3b573a` | Completed 36-question instrument implementation |
| `a8dd61dcb2175243c801db484d1a9001742a7b0c` | Instrument-completion closeout |
| `6e262923aebb401fc96711389673c4e1f9a5db2f` | Runtime startup integration repair |
| `3ece2e83f9fa7ff0f2115ab2dd351a6dbfd2824d` | Qualified-alternatives result-contract repair and latest pre-consolidation functional tip |

## Reconciliation Decision

The seven VM-551 branches form one linear accepted lineage. No normal merge, ours merge, cherry-pick, rebase, squash, or history rewrite is required. Consolidation preserves history by renaming the latest existing branch, committing this inventory on it, moving that existing worktree with Git tooling, and deleting only obsolete clean worktrees and safely merged local branch names after validation.

## Completed Cleanup And Verification

- Existing latest branch renamed in place to `codex/vm551`; no new branch was created.
- Pre-cleanup preservation commit: `82a4da50488c0247662be68307a20a180e61e6ef`.
- Existing canonical worktree moved through `git worktree move` to `C:\dev\voxmana.io-vm551`.
- A local Python static server rooted at the old path was stopped; the owner then closed a Windows Terminal session holding the same directory before the normal Git move succeeded.
- All six obsolete worktrees were removed with normal `git worktree remove`, without force.
- All six obsolete local branch names were deleted with `git branch -d` only after their exact tips were reverified as canonical ancestors.
- `git worktree prune --dry-run --verbose` reported no stale metadata, so no actual prune was run.
- Live `origin` query reported no VM-551 remote branch; no remote deletion was required.
- Final registered worktrees are the control `main` worktree and `C:\dev\voxmana.io-vm551` only.
- Final local branch matching `vm551` or `vm-551` is `codex/vm551` only.
- The canonical worktree was clean before this final documentation update.

## Canonical Validation

- Gate B1 engine: PASS — 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, 36/37 responsible primaries.
- Qualified-alternatives contract: PASS — focused state/evidence cases and 5,000 deterministic journeys.
- Model: PASS — 16 constructs, 36 behavioral questions, 124 answers, 4 Gate / 13 Hall / 19 targeted, 37 identities, 123 pairs, 76 directional uses.
- Instrument preservation: PASS — all 35 pre-completion behavioral IDs retained, C16 retained, new C03 retained.
- Mapping/routing preservation: PASS — historical 40 mappings plus 36 completion mappings retained; `positiveTestBonus` absent.
- Runtime, legacy placement, source/generated, frontend lint, Node syntax, and Git whitespace checks: PASS.

## Protected Scope

This inventory authorizes repository/history consolidation only. It does not authorize questionnaire, UI, mapping, routing, scoring, stopping, Yore, dossier, Gate A, deployment, migration, certification, or player-validation changes.

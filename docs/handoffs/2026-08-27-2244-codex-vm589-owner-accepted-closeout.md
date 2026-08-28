# VM-589 Owner-Accepted Closeout Handoff

## Agent name

Codex

## Task requested

Record owner acceptance of the exact remediated Calibration V3.2 propagation candidate, promote it as the next governed workbook authority without overwriting history, close VM-589 under normal Kanban governance, commit only the scoped authority/propagation/governance package, and stop before the next semantic-state or runtime story.

## Files reviewed

- `AGENTS.md`, `CLAUDE.md`, `docs/reference/workflow.md`
- repo-local RobDev and RobQA skills, usage guides, and frozen gates
- VM-589 card, initial propagation handoff, row-909 remediation handoff, board, and handoff index
- accepted candidate workbook, propagation Markdown/CSV diff, QA report, deterministic producer
- pre-propagation V3.2 workbook, Evidence Gate CLOSED, syntax reference, query cookbook, and two evidence records
- current branch, HEAD, origin divergence, staged scope, and unrelated untracked VM-578 corpus state

## Files changed

- Promoted and committed the complete scoped V3.2 calibration/provenance package under `docs/research/maze-player-language/calibration/v3.2/`.
- Added `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`.
- Added `docs/research/maze-player-language/calibration/v3.2/authority/Scryfall_Maze_Master_Calibration_V3_2_Propagation_Accepted.xlsx`.
- Updated the propagation diff/QA lifecycle disposition and deterministic producer.
- Moved the VM-589 card from `docs/kanban/in-progress/` to `docs/kanban/done/` and updated it to Done.
- Updated `docs/kanban/board.md`, `docs/handoffs/HANDOFF_INDEX.md`, and this handoff.

## What changed

- Recorded Owner Review ACCEPTED for exact candidate SHA-256 `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.
- Promoted a byte-identical immutable copy as current governed workbook authority.
- Recorded authority lineage and boundaries in a stable current-authority pointer.
- Committed the predecessor V3.2 workbook and evidence package as immutable provenance rather than overwriting them.
- Closed VM-589 as Done after lightweight RobQA and staged-scope validation.

## Why it changed

The owner accepted the complete 24-row candidate and resolved the row-909 blocker. The repository needed a durable authority path, exact accepted hash, preserved predecessor/evidence chain, and normal lifecycle closeout before any later semantic-state or runtime work.

## Decisions made

- The accepted authority copy is byte-identical to the accepted candidate; no post-acceptance workbook bytes were changed.
- `CURRENT_AUTHORITY.md` controls lifecycle status because changing the workbook's embedded candidate-review banner would invalidate the accepted hash.
- The predecessor workbook remains the frozen pre-propagation calibration record; the accepted authority supersedes it only for propagated `Master_Lexicon` state.
- The V3.2 evidence package was committed as required immutable provenance. Unrelated `docs/research/maze-player-language/corpus/vm578.zip` remains unstaged and untouched.
- No runtime, toggle, ranking, generated-data, placement, recommendation, or next-story work was authorized or performed.

## RobDev compact packet

- Outcome: durable owner-accepted workbook authority and VM-589 lifecycle closeout.
- Authority: explicit owner acceptance bound to exact SHA-256, active VM-589 card, accepted QA/remediation records.
- Producer: existing `scripts/propagate-maze-calibration-v3-2.mjs`; promotion is byte-identical copying plus a current-authority pointer.
- Changed behavior: repository governance and workbook-authority lifecycle only.
- Protected behavior: workbook bytes, predecessor/evidence history, raw corpus, runtime, Plain Reading, Operator Hand, toggle semantics, Archscry ranking, production JavaScript, generated data, placement, and recommendations.
- Consumers: future governed planning may read the current-authority manifest; no runtime consumer was changed.
- Smallest complete implementation: authority copy, pointer, exact-hash verification, provenance commit, card/board/handoff closeout.
- Stop condition: VM-589 Done and committed; stop before the next story.

## Risks / uncertainties

- The authority workbook retains its embedded candidate banner to preserve the exact accepted hash; the external current-authority manifest is the lifecycle authority.
- Frozen evidence Markdown contains intentional historical two-space hard line breaks. These were preserved byte-for-byte and excluded only from the authored-file whitespace check.
- Deferred calibration items remain unresolved by design and are listed in the current-authority manifest/card.

## Tests run

- Accepted candidate SHA-256 equals promoted authority SHA-256: PASS (`f1a529c6...35e5`).
- Accepted authority workbook opened through the existing `verify-maze-knowledge.py --stage workbook` path: PASS.
- Predecessor V3.2 workbook hash preserved: PASS (`8cf5c386...f90e`).
- Unrelated VM-578 corpus hash preserved: PASS (`eb572191...a537`).
- Producer JavaScript syntax: PASS.
- Propagation QA remains 89/89 formulas, zero formula errors, 24 changed + 1,111 unchanged eligible rows, and accepted row-909 Review / 0.68 contract.
- Explicit staged-scope audit: PASS; no unexpected path and no corpus/runtime file staged.
- Authored-file `git diff --cached --check` excluding the three immutable provenance Markdown paths: PASS.
- Final Kanban/card/link/hash/Git state checks: PASS.
- CPU-heavy runtime/parser/placement/browser/journey/synthetic/mutation/recovery suites: not run; no protected runtime behavior changed.

## RobQA disposition

- Tier: QA-0 governance/workbook-authority closeout with protected provenance checks.
- Owner judgment: complete; exact candidate accepted.
- Result: **PASS / CLOSED** for VM-589 workbook authority promotion.
- Runtime authority: explicitly not granted.

## Not touched

- Plain Reading runtime
- Operator Hand and Plain Reading ⇄ Operator Hand toggle behavior
- Archscry runtime ranking
- production JavaScript or generated product data
- placement or recommendation runtime
- `docs/research/maze-player-language/corpus/vm578.zip`
- row-909 Production-ready research, mana duration/repeatability, broad relationship/subjective archetypes, or `otag:reanimate` allowlist work

## Follow-up recommendations

Begin the separately scoped shared Plain Reading semantic-state contract story only under a new card and fresh pre-flight. Treat the accepted authority manifest as input, not as runtime implementation authorization.

## Next suggested agent

Planning/RobDev agent for the new semantic-state contract story after explicit owner intake.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/research/maze-player-language/calibration/v3.2/CURRENT_AUTHORITY.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_QA.md`
- `docs/handoffs/2026-08-27-2211-codex-vm589-row909-remediation.md`
- Authority promotion commit `ecdacdbe4920b5edf053cdb9bcb4c5a5688f0bbd`

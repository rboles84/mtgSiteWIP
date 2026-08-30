# SIRF Baseline Reconciliation — 2026-08-30

- Starting branch/SHA: `main` / `fbea856b2a480d722db58401598c9d8a9b704baf`; origin divergence `0/0`.
- Calibration state: WUBRG/VM-596, TEMUR/VM-597, and LOREHOLD/VM-598 accepted for local baseline closeout.
- Generation: `npm.cmd run build:factions` PASS; source/generated validation PASS with two inherited model-owned inhibitor warnings (Jeskai, Mardu).
- Fresh corpus: 37/37 direct Dossier Review records at `docs/audits/archscry-current-state-2026-08-30/`.
- Engine evidence: 36 `PASS_MATCH`; YORE is the explicit intentional bounded `NO_RESULT`, not a missing dossier, alias error, or runtime defect.
- VM-595: fresh-corpus producer and check PASS. Metrics: 37 identities; 1,392 prose units; 1,694 sentences; 26,997 words; 56 exact duplicate groups / 750 occurrences; 17 substitution groups; 40 repeated openings; 287 repeated five-grams; 13 within-dossier candidates.
- Validation: WUBRG, TEMUR, LOREHOLD, precon rationale, semantic readiness, 37/37 placement, Dev Review, lint, and diff check PASS.
- Deferred shared debt: the all-37 ABZAN rationale-preview assertion remains separately owned and is not part of this calibration candidate.

## Baseline Promotion Confirmation

- Trusted baseline commit: `5c38f4d9a2d74e240d736af82c26dfd08b5b08d8`.
- Existing commit pushed to `origin/main` without amend or force.
- Local `main`: `5c38f4d9a2d74e240d736af82c26dfd08b5b08d8`.
- Remote `origin/main`: `5c38f4d9a2d74e240d736af82c26dfd08b5b08d8`.
- Post-push divergence: ahead `0`, behind `0`.
- The baseline commit is immutable; VM-599 diversity work is a separate uncommitted worktree candidate.
- Preserved unrelated untracked paths remain untracked: `docs/incidents/recoveries/VM-596-wubrg-semantic-repair-control.md`, `docs/research/maze-player-language/corpus/`, and `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/`.

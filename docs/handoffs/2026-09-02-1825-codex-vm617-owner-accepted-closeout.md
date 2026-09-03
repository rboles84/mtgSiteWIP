# VM-617 Owner-Accepted Discovery Closeout

- **Agent:** Codex
- **Task requested:** Record the Owner's manual fresh-session Archscry product pass, accept and close VM-617 as a discovery/product-decision card, bind the discovery candidate, create lifecycle-only closeout records, and push the branch without PR or merge.
- **Card:** VM-617
- **Branch / baseline:** `codex/vm-617-discovery`, based on accepted `main` `5b1b7b3bf629cecb412b1a272df72ac9f632d489`.
- **Discovery candidate:** `154183b` — `docs(vm-617): record onboarding red-team discovery`.
- **Gates:** repo-local RobDev / RobQA; QA-0 lifecycle documentation.

## Owner acceptance

The Owner accepted the discovery decision: defer and retain `/guide/reference/`; do not supersede the contract; add zero terminology, local Scryfall syntax reference, recipes, or cross-links; and stop the dedicated Field Guide/onboarding program.

The Owner manually verified the fresh/private-browser Archscry path with empty local storage through first answer, progress, subsequent questions, completed reading, and real result/dossier. The earlier discovery finding remains preserved as historical evidence, but the current disposition is **PRODUCT MANUALLY VERIFIED — AUTOMATED HARNESS STILL FAILING**. The unchanged automated `test:browser-smoke` first-answer/progress timeout is automation/harness debt unless contrary product evidence appears.

## Files reviewed

The VM-617 card/report/discovery handoff, board/index, accepted Field Guide contract and VM-614–621 boundaries, VM-006 backlog card, current branch/main/origin state, and staged candidate file set.

## Files changed

- Moved VM-617 card from `docs/kanban/in-progress/` to `docs/kanban/done/` and recorded Owner acceptance.
- Updated the VM-617 report with the Owner manual-pass and automated-harness-debt disposition while preserving the original discovery observation.
- Updated the board and handoff index; added this lifecycle handoff.

## RobDev compact packet

- **Changed behavior:** documentation/governance lifecycle only.
- **Protected behavior:** every runtime/test route and contract, VM-614–621, Home's four paths, exactly three Beacons, optional/static guided behavior, Driver vendor state, persistence, telemetry, completion tracking, `/guide/reference/` absence, VM-006 backlog scope, and all existing Owner Review outputs.
- **Non-goals:** no product implementation, harness repair, VM-006 start, reference route, cross-link, recipe, telemetry, PR, or merge.

## RobQA closeout

- **Tier:** QA-0.
- **Validation:** verify documentation/card/board/index integrity, candidate staging scope, `/guide/reference/` absence, zero runtime/test file changes, and `git diff --check`.
- **Known limitation:** automated fresh-session browser smoke remains failing and is recorded honestly; the Owner's manual product pass is not rewritten as an automated pass.
- **CPU-heavy validation:** NOT REQUIRED; no protected runtime behavior changed.

## Risks / uncertainties

The exact internal reason for the automated first-answer timeout remains uninvestigated by design. It is not current product uncertainty after Owner manual verification. VM-006 remains independent and unstarted; a future Owner may prioritize automation reliability separately.

## Not touched

All production and test files, `/guide/reference/`, every cross-link and recipe, VM-006, existing output directories, data, persistence, telemetry, branch history outside these two VM-617 commits, `main`, `origin/main`, PRs, and merges.

## Follow-up / next suggested agent

None. The dedicated Field Guide/onboarding program is complete. Future work must identify a concrete product-specific problem.

# VM-526 Naya Candidate Workflow Handoff

## Agent Name

Codex

## Task Requested

Run VM-526 Naya / WRG CRIT-001 semantic recovery from setup preflight through Gate 5 exact candidate creation and candidate-workflow recording only, without independent review, certification, push, merge, PR, external Excel updates, or work on the next identity.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`
- `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-526-naya-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/validate-semantic-readiness.mjs`
- `research/build-semantic-readiness-provenance.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/naya/naya.profile.json`
- `data/raw-factions/naya/naya.placement.json`
- `research/fixtures/semantic-readiness/naya.semantic-fixtures.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`

## Files Changed

Semantic candidate chain:

- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/naya/naya.profile.json`
- `data/raw-factions/naya/naya.placement.json`
- `research/fixtures/semantic-readiness/naya.semantic-fixtures.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`

Workflow governance:

- `docs/handoffs/2026-07-22-0007-codex-vm526-naya-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-526-naya-semantic-recovery.md`
- `docs/kanban/in-progress/VM-526-naya-semantic-recovery.md` moved to ready status

## What Changed

- Created exact VM-526 branch `codex/vm-526-naya-semantic-recovery` and worktree `C:\dev\mtgSiteWIP-crit001-vm526-naya` from exact program base `7964b93f531017e579f069e6941463f53eab4bd9`.
- Recorded drift preflight commit `813c42c63a56648029c7452d2619cdaf60432b5a`.
- Recorded Gate 1+2 governance commit `b03574cc853a4456eabbaeca113260e84f3bda2a`.
- Created superseded candidate `57ce7161c1ff8736a8b91a6564fa97129fe38383`, then preserved it unapproved because the candidate left seven Naya recruiter guidance provenance owners with null canonical IDs.
- Created replacement exact semantic candidate `f3dda547eb91475cd3d00056463729d98a040e55`.
- Converted all 10 Naya claims to `substantive_claim` with 20 bounded evidence locators.
- Added Naya-local provenance owner IDs for site surface, core identity, structure, tension, relationships, data quality, and recruiter guidance.
- Added 13 Naya semantic-readiness fixtures covering core inclusion, mature pressure behavior, nearest collision ambiguity, required-neighbor/generic exclusions, and provenance.
- Regenerated active generated consumers and semantic-readiness provenance, yielding 34 NAYA provenance entries with zero null canonical IDs and zero missing hashes.
- Moved VM-526 from in progress to ready for independent exact-SHA review.

## Why It Changed

Gate 1+2 concluded that Naya was recoverable and required NAYA-only remediation before a valid candidate could be offered for independent review. The replacement candidate is required because candidate governance expects no null provenance-owner holes after remediation.

## Decisions Made

- Canonical identity key: `NAYA`.
- Display color ordering: `WRG`.
- Alias disposition: `WRG`, `RGW`, and `GRW` are invalid validator aliases and must not broaden candidate scope.
- Gate 2 disposition: `PASS - NAYA GATE 3+4 REMEDIATION AUTHORIZED`.
- Exact candidate SHA for independent review: `f3dda547eb91475cd3d00056463729d98a040e55`.
- Superseded candidate `57ce7161c1ff8736a8b91a6564fa97129fe38383` remains recorded, unapproved, and not review-ready.
- Direct chain: `7964b93f531017e579f069e6941463f53eab4bd9 -> 813c42c63a56648029c7452d2619cdaf60432b5a -> b03574cc853a4456eabbaeca113260e84f3bda2a -> 57ce7161c1ff8736a8b91a6564fa97129fe38383 -> f3dda547eb91475cd3d00056463729d98a040e55`.

## Risks / Uncertainties

- `npm.cmd audit` still reports 19 inherited dependency vulnerabilities, 17 moderate and 2 high; no package or lockfile change was made.
- `npm.cmd run test:source-generated` carries the inherited non-blocking warning for the NAYA model-owned inhibitor trap entry; it existed outside this candidate and was not repaired.
- Windows line-ending warnings appear on generated/report paths after tests, but no content diff was staged for those files.
- The ignored Scryfall corpus is required for full local tests and was supplied as a hardlink only, not committed.

## Tests Run

- `npm.cmd ci` in the candidate worktree.
- `npm.cmd test` in the candidate worktree: PASS after documented ignored Scryfall hardlink setup.
- `node research\audit-semantic-readiness.mjs --targets=NAYA`: PASS.
- `node research\validate-semantic-readiness.mjs --targets=NAYA`: PASS.
- `node research\validate-semantic-readiness.mjs --fixtures --targets=NAYA`: PASS.
- `npm.cmd run test:semantic-readiness`: PASS.
- `node research\build-semantic-readiness-provenance.mjs --check`: PASS.
- `node research\validate-source-generated-guardrails.mjs --targets=NAYA`: PASS with inherited non-blocking warning.
- `npm.cmd run test:placement`: PASS.
- `npm.cmd run test:parser`: PASS.
- `npm.cmd run test:faction-context-isolation`: PASS.
- `npm.cmd run test:source-generated`: PASS for default targets with inherited warnings.
- `node research\validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=f3dda547eb91475cd3d00056463729d98a040e55 --identity=NAYA`: PASS.
- Alias checks against the candidate: `WRG`, `RGW`, and `GRW` all fail as unknown identities, as expected.
- Exact detached verifier worktree `C:\Users\obake\AppData\Local\Temp\naya-f3dda54`: `npm.cmd ci`, `npm.cmd test`, exact candidate-scope validation, NAYA fixture validation, and `npm.cmd run test:semantic-readiness` all PASS after verifier-only provenance normalization; `git diff` shows no content delta beyond line-ending warnings.

Scryfall corpus setup:

- Source: `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`.
- Candidate hardlink target: `C:\dev\mtgSiteWIP-crit001-vm526-naya\data\scryfall\raw\oracle-cards.json`.
- Exact verifier hardlink target: `C:\Users\obake\AppData\Local\Temp\naya-f3dda54\data\scryfall\raw\oracle-cards.json`.
- Justification: the corpus is intentionally ignored, required by parser/full-test coverage, and does not alter tracked candidate content.

## Not Touched

- No independent review was performed.
- No certification was performed.
- No program-base advancement was performed.
- No external Excel tracker update was performed.
- No push, merge, or pull request was performed.
- No VM-527 or later-identity semantic work was performed.
- Original main and the long-running CRIT worktree were preserved.
- DRIFT-017 prototype files were not read, copied, executed, staged, reset, cleaned, stashed, edited, or deleted.
- Historical/debug/archive exclusions were not modified.
- VM-542 and DRIFT-019 residuals were not modified.
- No schema, generator implementation, package script, CI, parser, placement implementation, or runtime implementation was changed.
- No dependency artifact or ignored corpus file was staged or committed.

## Follow-Up Recommendations

- Open a separate independent-review task against exact candidate SHA `f3dda547eb91475cd3d00056463729d98a040e55`.
- The reviewer should rerun exact candidate-scope, semantic-readiness, fixture, provenance, source/generated, placement, parser, faction-context, and full test checks against the exact candidate tree.
- Do not certify until a separate independent review returns `APPROVE EXACT SHA f3dda547eb91475cd3d00056463729d98a040e55`.

## Next Suggested Agent

Independent reviewer in a separate Codex window.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/ready/VM-526-naya-semantic-recovery.md`
- `docs/handoffs/2026-07-21-2336-codex-vm526-naya-drift-preflight.md`
- `docs/handoffs/2026-07-21-2346-codex-vm526-naya-gate1-gate2.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`

READY FOR INDEPENDENT REVIEW OF EXACT SHA f3dda547eb91475cd3d00056463729d98a040e55

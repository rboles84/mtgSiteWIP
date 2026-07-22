# DRIFT-020 Jund Preview Candidate-Scope Infrastructure Candidate

## Agent name

Codex

## Task requested

Resolve the VM-525 Jund Gate 3+4 candidate-scope blocker through a separate shared-infrastructure branch/worktree, adjudicate whether `data/identity-layers.json#/expressions/JUND/preview_text` is candidate-owned, create only a narrow validator/test candidate if authorized, qualify the exact candidate SHA, and record governance without touching Jund semantic data.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-525-jund-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- `docs/handoffs/2026-07-17-2357-codex-monocolor-validator-candidate.md`
- `docs/handoffs/2026-07-18-0037-codex-monocolor-validator-independent-review.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

## Files changed

Implementation candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`:

- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

Governance commit pending after this handoff:

- `docs/handoffs/2026-07-21-1829-codex-drift020-jund-preview-candidate-scope.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/DRIFT-020-jund-preview-candidate-scope.md`

## What changed

- Added `data/identity-layers.json` as a candidate path only with object-level validation in `main`.
- Added `validateIdentityLayerPreviewChange`, which permits only `data/identity-layers.json#/expressions/<IDENTITY>/preview_text` for the target identity and fails on any root, sibling, target non-preview, deleted expression, added field, or non-string preview drift.
- Adjusted generated `data/factions.json` isolation so the target embedded `identity_layers.expressions/<IDENTITY>/preview_text` duplicate may change, while unrelated identities and global/non-preview generated content still fail.
- Added focused positive and negative tests for identity-layer source preview scope and generated embedded preview isolation.
- Recorded DRIFT-020 in the board, drift register, handoff index, and a new Kanban card.

## Why it changed

VM-525 Gate 1+2 made the Jund authoritative preview source edit required, but VM-525 Gate 3+4 stopped because the shared candidate-scope validator rejected `data/identity-layers.json`. Authority review found Outcome A: the current validator had an omission. Prior certified UG, B, G, and R candidates already accepted target identity-local preview source repairs as documented display-source exceptions, and the drift template requires preview ownership/source-to-embedded inspection.

## Decisions made

- Outcome A selected: validator defect/omission, not a VM-525 semantic deferral.
- The rule is intentionally object-level, not broad file-level authority.
- VM-525 remains blocked. This infrastructure candidate does not authorize Jund semantic remediation until independent exact-SHA review and certification complete.
- The exact implementation candidate is `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Governance remains separate from the implementation candidate and must not be substituted for the review object.

## Risks / uncertainties

- `npm.cmd run test:semantic-readiness` still exits 1 after its readiness subtests pass because `semantic-readiness-provenance.json` is stale. This was inherited from the Jund STOP baseline and was not remediated because provenance edits are outside DRIFT-020 scope.
- Independent review still must verify the narrow object-level rule, exact historical ranges, and exact-tree test results before certification.
- VM-525 must not resume semantic work until the exact infrastructure candidate is independently reviewed and certified.

## Tests run

- `node research\semantic-candidate-scope-tests.js` - pass.
- `npm.cmd run test:parser` - pass, 226 parser cases.
- `npm.cmd run test:placement` - pass, adaptive placement tests for 37 factions.
- `npm.cmd run test:faction-context-isolation` - pass.
- `npm.cmd run test:source-generated` - pass with known JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test` in DRIFT-020 worktree - pass, `EXIT_CODE=0`, after supplying ignored `node_modules` and local Scryfall corpus inputs.
- Exact-tree export of `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, `npm.cmd test` - pass, `EXIT_CODE=0`.
- Exact-tree export of `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`, `node research\semantic-candidate-scope-tests.js` - pass.
- `git diff --check` and `git diff --cached --check` - pass.
- Historical display-source ranges: `UG`, `B`, `G`, and `R` - pass.
- Historical no-preview ranges: `ESPER` and `GRIXIS` - pass.
- Jund STOP governance range `16528f3a24a7f3d7f4475bdde56fbfee09becd98..460dd7186dc76658797beac74a4330cc699a52d6` - still fails for unclassified proof-chain contamination, as expected.
- Invalid alias `BRG` - still fails as `Unknown identity BRG`, as expected.
- `npm.cmd run test:semantic-readiness` - readiness contract, candidate-scope, and fixture validation subtests pass; final provenance staleness check exits 1, inherited/non-remediated.

## Not touched

- No Jund semantic data or preview text content.
- No generated data, recruiter context, schemas, generators, package metadata, CI, Excel, original main, VM-526, protected worktrees, or DRIFT-017 prototype edits.
- No program-base advancement.
- No VM-525 Gate 3+4 semantic remediation or Gate 5 candidate creation.

## Follow-up recommendations

- Run an independent exact-SHA review of `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- If approved, certify this shared infrastructure candidate before resuming VM-525 Gate 3+4.
- After certification, rerun VM-525 drift preflight controls before semantic remediation continues.

## Next suggested agent

Independent reviewer for DRIFT-020 exact SHA `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/DRIFT-020-jund-preview-candidate-scope.md`
- `docs/kanban/blocked/VM-525-jund-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`

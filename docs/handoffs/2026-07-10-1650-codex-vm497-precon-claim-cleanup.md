# VM-497 Unsupported Precon Claim Cleanup Handoff

## Agent Name

Codex

## Task Requested

Neutralize unsupported precon popularity, strength, consensus, primacy, and six-color claims at the canonical source; rebuild generated output; and prevent recurrence with a semantic validator.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md` and the VM-495/VM-496 handoff trail
- `docs/kanban/board.md` and related precon cards
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`
- `research/build-precon-artifacts.mjs`
- `research/precon-artifact-tests.js`
- Historical files under `data/precons/reference/`

## Files Changed

- Canonical/generated data: `data/precons/vox-mana-precons.source.json`, `data/precons/vox-mana-precon-catalog.json`
- Builder/tests: `research/build-precon-artifacts.mjs`, `research/precon-artifact-tests.js`
- Provenance: `data/precons/reference/README.md`
- Governance: VM-497 card, `docs/kanban/board.md`, this handoff, and `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Replaced unsupported rankings, broad-consensus language, product primacy, and instructional superlatives with observable mechanics and player-fit language.
- Corrected Eldrazi Incursion from a sixth-color framing to five-color identity with colorless-mana requirements.
- Added guarded-field validation for unsupported authority language and a stricter instructional-primacy check for `voxManaBasicsPageUse`.
- Added negative fixtures for each prohibited claim family and positive fixtures proving ordinary terminology and tactical comparisons remain accepted.
- Rebuilt the generated catalog from canonical JSON and documented historical references as non-runtime provenance.

## Why It Changed

VM-496 found that runtime precon copy asserted popularity, power, consensus, and product rank without source support. Those claims created false authority in a product whose governance requires evidence-backed wording.

## Decisions Made

- Used semantic phrase patterns and field scope rather than a blanket word ban.
- Preserved mechanical `best target` comparisons and ordinary phrases such as `Commander deck` and `support package`.
- Preserved reference files unchanged as historical evidence while making canonical JSON editorially authoritative.

## Risks / Uncertainties

- The guard detects known comparative structures, not every possible future paraphrase; editorial review remains necessary.
- Neutral wording intentionally gives up promotional force where the repository has no comparative evidence.

## Tests Run

- `npm.cmd run build:precons` - passed; 155 records generated.
- `node research/precon-artifact-tests.js` - passed.
- Targeted semantic negative scan of canonical and generated catalogs - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed.

## Not Touched

- Historical reference CSV/workbook contents.
- Placement scores, identity coverage, routes, aliases, legality, lore, commander facts, account features, or radar code.
- Pre-existing VM-496 files and governance hunks.

## Follow-Up Recommendations

- Keep comparative product claims out of canonical data unless a dated, traceable source and explicit product need are added.
- Run the precon builder/tests whenever canonical precon editorial fields change.

## Next Suggested Agent

Colorless lifecycle evidence reconciler for VM-498.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-497-unsupported-precon-claim-cleanup.md`
- `data/precons/reference/README.md`
- VM-496 self-snapshot

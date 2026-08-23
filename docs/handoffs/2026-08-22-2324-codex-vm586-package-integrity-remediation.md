# VM-586 Package-Integrity RobDev Remediation

- Agent name: Codex
- Task requested: Remediate the deterministic package blockers returned by independent RobQA for exact candidate `614abfb90f60d9a9e667c2153bd3484d4c3df4e3`, regenerate the evidence package, and prepare a replacement exact candidate without changing product runtime or touching VM-578.
- Related work: VM-586; first independent review handoff `2026-08-22-2315-independent-robqa-vm586-current-state-evidence.md`.
- Branch: `codex/vm586-archscry-current-state-evidence`
- Review state: RobDev remediation and self-QA pass; replacement exact candidate and fresh independent RobQA are next.

## Files Reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, and frozen `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and frozen `docs/qa/RobQAPass.md`
- `docs/handoffs/2026-08-22-2315-independent-robqa-vm586-current-state-evidence.md`
- `scripts/audit/archscry-current-state.mjs`
- `scripts/audit/archscry-red-team-reconciliation.mjs`
- `scripts/audit/build-archscry-current-state-workbooks.mjs`
- `docs/audits/archscry-current-state-2026-08-22/manifest.json`
- `docs/audits/archscry-current-state-2026-08-22/workbook-qa.json`
- Both exported workbook binaries and their rendered previews

## Files Changed

- `scripts/audit/archscry-current-state.mjs`
- `scripts/audit/archscry-red-team-reconciliation.mjs`
- `scripts/audit/build-archscry-current-state-workbooks.mjs`
- `scripts/audit/finalize-archscry-current-state-package.mjs`
- `package.json`
- Regenerated `docs/audits/archscry-current-state-2026-08-22/**` evidence documents
- Regenerated both versioned workbook binaries under the VM-586 output root
- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What Changed

- Replaced obsolete primary manifest workbook filenames with the two canonical generated workbook paths.
- Made red-team and workbook producers mark their own completion fields `COMPLETE`.
- Made workbook generation fail unless all four expected KPI formulas per workbook survive export and artifact-tool re-import exactly.
- Added `workbook-qa.json` formula counts, exact cell/formula inventories, and preservation flags.
- Added a deterministic package finalizer that validates 18 required paths, canonical-path equality, workbook hashes, 37 raw dossiers, 37 screenshots, 37 traces, formula inventories, and phase agreement; it truthfully leaves independent RobQA pending until a pass handoff is supplied.
- Regenerated workbooks, all 84 previews, contact sheets, QA evidence, reconciliation, and manifest.

## Why It Changed

Independent RobQA correctly rejected contradictory package metadata and a verifier that could claim formula QA without proving formula presence. A namespace-aware binary inspection showed that the first-candidate files did contain four formulas each, but the missing enforcement remained a real defect. The remediation converts both findings into deterministic producer invariants.

## RobDev Compact Packet

- Owning authority: task-specific audit producers own manifest and workbook QA truth; the exported workbook binaries own formula survival after serialization.
- Producer: the existing collection, reconciliation, and artifact-tool workbook scripts, plus one task-scoped final package validator.
- Changed behavior: audit package generation and verification only.
- Protected behavior: all Archscry product runtime, placement behavior, questionnaire, mappings, identity/dossier content, telemetry, persistence, source data, generated product data, and VM-578.
- Consumers: owner review and independent RobQA of the VM-586 package.
- Risks addressed: dead manifest links, status contradictions, missing exported formulas, stale workbook hashes, and incomplete local evidence roots.
- Smallest complete implementation: fix fields in their owning producers and add one deterministic cross-artifact final gate.
- Non-goals: product fixes, red-team remediation, empirical player claims, baseline-only test maintenance, and VM-578 work.
- Stop condition: any product-runtime diff, fabricated witness/identity, missing required artifact, formula mismatch, hash mismatch, or phase contradiction.

## Decisions Made

- Formula presence is verified through artifact-tool export/re-import in the producer; a separate namespace-aware XLSX inspection is corroborating evidence only.
- Independent RobQA remains `PENDING` in the replacement candidate because that is the truthful pre-review state.
- The first failed candidate remains recorded and is superseded rather than rewritten.

## Risks / Uncertainties

- The two inherited baseline-only assertions remain outside VM-586 and are documented in the main self-QA.
- External optional Scryfall media remains a bounded environment note, not a product defect.
- Final owner judgment remains bounded to the generated queue after independent pass.

## Tests Run

- Syntax checks for all four audit scripts: PASS.
- Current-state collection with `--allow-candidate`: PASS, 37 dossiers/screenshots and 37 engine witnesses.
- Red-team reconciliation: PASS, 14 sources / 16 findings / 7 owner decisions.
- Workbook generation: PASS, two 42-sheet exports and eight required formula invariants.
- Package finalizer: PASS, 18 required paths plus hashes/status/formula/evidence-count agreement.
- Namespace-aware XLSX binary inspection: PASS, four formula cells in each workbook.
- `npm.cmd run test:placement`: PASS, 37 identities / 37 golden paths.
- `npm.cmd run test:vm551-all-37-witnesses`: PASS, 37 rows / 36 named / one bounded / three refinements.
- `npm.cmd run test:dev-review`: PASS, review gating/taxonomy/transient Maze/isolation/real-engine contracts.
- `npm.cmd run test:vm586-live-ui-samples`: PASS, Green/Jund/Lorehold/Witch/Yore/Colorless/WUBRG.

## Not Touched

- No files under `assets/`, `data/`, Archscry product HTML/CSS/runtime, telemetry, persistence, deployment, or generated product data.
- `docs/research/maze-player-language/corpus/vm578.zip` was not read, moved, staged, modified, or included.

## Follow-Up Recommendations

1. Rerun the narrow RobQA validation set and confirm the product diff from baseline is empty.
2. Commit one replacement exact candidate on the existing branch.
3. Give that exact SHA to a fresh independent RobQA agent with explicit manifest and exported-formula invariants.
4. Advance to owner review only on exact `PASS — Owner Review Ready`.

## Next Suggested Agent

Fresh independent RobQA reviewer on the replacement exact SHA, using the repo-local skill and frozen gate without trusting this handoff.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/audits/archscry-current-state-2026-08-22/manifest.json`
- `docs/audits/archscry-current-state-2026-08-22/workbook-qa.json`
- `docs/audits/archscry-current-state-2026-08-22/robdev-self-qa.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

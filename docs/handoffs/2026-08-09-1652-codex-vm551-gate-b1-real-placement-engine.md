# VM-551 Gate B1 real placement engine

- **Agent:** Codex
- **Task requested:** Implement the actual deterministic Gate B1 placement engine, exhaustive model validation, machine-readable reports, and the smallest Gate A result adapter from exact base `19c1d3b74a1551c18c800771ebea019e38d159a5`.
- **Branch:** `codex/vm551-gate-b1-real-placement-engine`
- **Worktree:** `C:\dev\voxmana.io-vm551-gate-b1-engine`

## Files reviewed

- Accepted Gate B1 construct, question, answer, semantic-adjudication, identity-coverage, confusion-pair, final-architecture, lens, and owner-review authorities under `docs/plans/vm551-gate-b1-placement-instrument/` and `docs/plans/vm551-gate-b1-product-fit/`.
- Certified faction/identity data and the existing Gate A result-state contract.
- Current production quick-reading controller and legacy adaptive-placement interfaces.
- Recent VM-551 handoffs, the Kanban board/cards, and token/reasoning governance.

## Files changed

- `assets/js/gate-b1-placement-engine.js`
- `assets/js/index.js`
- `assets/js/archscry-presentation.js`
- `data/placement/gate-b1-mapping.source.json`
- `data/gate-b1-placement-model.json`
- `scripts/build-gate-b1-placement-model.mjs`
- `scripts/validate-gate-b1-placement-engine.mjs`
- `package.json`
- `docs/reports/vm551-gate-b1-placement-engine/*`
- `docs/kanban/done/VM-551-gate-b1-real-placement-engine.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff.

## What changed

- Generated a versioned runtime model from the exact approved 16 constructs, 35 behavioral questions, 110 answer contracts, 37 identities, 123 confusion pairs, 40 evidence-required directional uses, and one guarded identity/lens question.
- Implemented pure deterministic observation, dependency-capped evidence ranking, candidate ordering, usefulness-based adaptive selection, stopping, alternatives, refinement, replay, and result finalization.
- Kept behavioral and lens evidence separate. Unknown/conditional answers are neutral; lens answers never rank or name identities; contradictions reduce support; public alternatives require positive directional support.
- Repointed only the production quick-reading data/logic adapter to the new model and preserved Gate A explicit result states and the existing dossier/persistence contract.
- Added deterministic model generation plus structural, focused, journey, reachability, confusion-pair, synthetic-robustness, sensitivity, and recovery validation/reporting.

## Why it changed

Gate B1 needed a directly testable placement engine rather than prototype route prose. The implementation uses approved observations as evidence and reports missing identity authority rather than manufacturing all-37 placement success.

## Decisions made

- General Gate/Hall observations inform structural coverage and question routing but do not become identity naming evidence.
- Only the 40 accepted `MAPPING_HYPOTHESIS` directional uses can add support or contradiction; the engine does not treat the hypotheses as empirical calibration.
- The strongest effect in each dependency group is counted once. Directional effects are averaged across affected dependencies, preventing automatic inflation from mapping count.
- Internal scores remain non-public ordering aids. Gate A's bounded state labels remain authoritative and no public numeric confidence percentage was introduced.
- A public alternative needs positive directional support; structural similarity alone remains internal.
- All-37 readiness is blocked rather than forced.

## Results and risks

- Candidate-set reachability: **37/37**.
- Responsible named-primary reachability: **13/37**.
- Blocked primaries: `ABZAN`, `B`, `BANT`, `BR`, `G`, `GRIXIS`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `R`, `RG`, `SILVERQUILL`, `SULTAI`, `TEMUR`, `U`, `UB`, `UG`, `W`, `WB`, `WG`, `WITCH`, `WU`, `YORE`.
- Top-two reachability: **28/37**; top-three reachability: **30/37**.
- Confusion pairs: **41** reachable direct discriminators; **9** approved direct discriminators not reached in strongest searches; **73** bounded with no direct approved discriminator.
- Unique insufficient patterns: **1,943** targeted-question recoveries; **713** material-answer revisits; **689** with no approved discriminator.
- Synthetic results are labeled **IN-MODEL ROBUSTNESS — NOT EMPIRICAL PLAYER ACCURACY**.
- The largest risk is evidence authority, not deterministic execution. The owner should not treat this candidate as all-37 placement-complete.

## Tests run

- Model source generation/check for exact 16/35/110/37/123/40 counts and stable IDs.
- 5,000 generated valid journeys with deterministic replay, no loops/repeats, legal stopping, and eight-question maximum.
- All-37 beam reachability and all-123 confusion-pair audit.
- 6,660 deterministic synthetic in-model journeys across nine variants.
- 767 one-answer sensitivity mutations.
- Focused neutral, contradiction, negative-only, one-answer dominance, stable-primary, top-three, adaptive usefulness, lens eligibility/isolation, and deterministic-tie assertions.
- Syntax, lint, existing placement/Gate A compatibility, source/generated check, and Git whitespace/scope checks are recorded in the final task report.
- `npm test` advanced through its placement, Gate-bias, parser, builder, semantic-readiness, Maze, and search suites, then stopped on the base repository's pre-existing `archscry-adjacent-navigation-tests.js` assertion for the absent `resultStatusHtml` source token. Exact `HEAD` `assets/js/index.js` also lacks that token; this task did not repair the unrelated test drift.
- `npm run test:presentation-snapshots` stopped on the base snapshot's pre-existing `White led with a` copy assertion. This task changed neither the snapshot nor its content authority.
- Browser, Lighthouse, responsive, screenshot, and visual tests were intentionally not run.

## Not touched

- No approved question wording, answer wording, stable ID, certified identity source, Atlas/profile placement evidence, dossier definition, Matrix calculation, Maze behavior, CSS, responsive presentation, or visual baseline changed.
- No player validation, recruitment, shadow testing, migration, deployment, certification, push, or merge occurred.

## Follow-up recommendation

Owner architecture review should decide whether to authorize new/refined directional evidence for the 24 blocked primaries and the 73 bounded confusion pairs. Do not begin natural all-37 owner testing as if this were placement-complete; the current reports identify the exact gaps to resolve first.

## Next suggested agent

Owner or a documentation/evidence-planning agent for a narrowly scoped mapping-authority remediation decision. Do not begin UI work, player validation, or deployment from this handoff.

## Related records

- `docs/kanban/done/VM-551-gate-b1-real-placement-engine.md`
- `docs/reports/vm551-gate-b1-placement-engine/owner-summary.md`
- `docs/reports/vm551-gate-b1-placement-engine/identity-reachability.json`
- `docs/reports/vm551-gate-b1-placement-engine/confusion-pair-resolution.json`
- `docs/plans/vm551-gate-b1-placement-instrument/final-b1-architecture-decision.md`
- `docs/handoffs/2026-08-08-1353-codex-vm551-final-instrument-architecture-integration.md`

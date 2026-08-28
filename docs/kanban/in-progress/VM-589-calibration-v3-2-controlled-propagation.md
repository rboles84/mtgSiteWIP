# VM-589 - Calibration V3.2 Controlled Propagation

ID: VM-589
Title: Calibration V3.2 Controlled Propagation
Status: in-progress
Type: governed data/workbook propagation
Area: Implicit Maze, Plain Reading, player language, Scryfall grounding
Priority: high
Created: 2026-08-27

## Summary

Apply the frozen Calibration V3.2 translation rules to every eligible `Master_Lexicon` row, generate a copy-derived candidate workbook plus complete human- and machine-readable diffs, validate the package, and stop at Owner Review without changing runtime behavior or promoting the candidate to production authority.

## Source

- Owner request for the Calibration V3.2 controlled propagation pass.
- `docs/research/maze-player-language/calibration/v3.2/Scryfall_Maze_Master_Calibration_V3_2.xlsx`
- `docs/research/maze-player-language/calibration/v3.2/Implicit_Maze_Evidence_Gate_CLOSED_V3_2.md`
- `docs/research/maze-player-language/calibration/v3.2/scryfall-syntax-regex-reference.md`
- `docs/research/maze-player-language/calibration/v3.2/scryfall-query-master-list-v3.1.md`

## Acceptance Criteria

1. **AC1 — Governed propagation:** evaluate every eligible `Master_Lexicon` row against Calibration V3.2 with the real population and eligibility counts reconciled; do not assume the 100 VM-578 cases map one-to-one to Master Lexicon rows.
2. **AC2 — Complete reviewable diff:** record every material row change in human- and machine-readable form with old/new values, authority, rule trace, and rationale.
3. **AC3 — Safe candidate:** create a separate candidate workbook without changing the raw corpus, raw provenance sheet, or approved V3.2 authority package; pass workbook and integrity validation.
4. **AC4 — Owner-review stop:** complete RobQA readiness, provide a bounded owner packet, and stop without production promotion, runtime implementation, merge, or Done status.

## Files Likely Impacted

- `docs/research/maze-player-language/calibration/v3.2/propagation/Scryfall_Maze_Master_Propagation_Candidate_V3_2.xlsx`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.csv`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_QA.md`
- one scoped propagation/validation producer under `scripts/`
- `docs/kanban/board.md`
- this card
- `docs/handoffs/HANDOFF_INDEX.md`
- one VM-589 handoff under `docs/handoffs/`

## Risks

- Historical business language says approximately 1,038 rows remain, but the workbook must determine the actual eligible population.
- Later/final V3.2 evidence rules can supersede older learned-rule wording; precedence must remain explicit.
- Tagger and Oracle-text lenses have different false-positive and false-negative families.
- Status promotion pressure could manufacture semantic precision; safe downgrades and unchanged unresolved rows are valid outcomes.
- Workbook style, formulas, historical evidence sheets, and raw provenance must remain intact.
- The V3.2 authority package and VM-578 archive are pre-existing untracked inputs and must not be overwritten or absorbed as newly authored work.

## Implementation Prompt

Use RobDev and the frozen V3.2 authority order. Reuse the existing workbook-verification conventions and the bundled spreadsheet artifact runtime. Compare the V3.2 authority workbook to the VM-577 source workbook to identify already governed Master Lexicon rows, evaluate every remaining row deterministically, change only materially affected rows, attach exact `CAL-*` / `EV-*` traces, generate the requested candidate/diff/QA package, and validate with RobQA. Preserve all runtime, raw corpus, raw sheet, authority workbook, historical evidence, and unrelated work. Stop at Owner Review.

## Notes

- Baseline Master Lexicon population: 1,138 unique rows.
- Already explicitly changed in the V3.2 authority workbook: 3 rows (`Counterspell`, `Reanimator`, `Group Slug`).
- Actual automatic-evaluation population: 1,135 rows.
- Difference from the expected 1,038: +97 eligible rows. The business estimate incorrectly treats 100 request-level calibration cases as 100 row-level propagations; only three changes are row-addressable in `Master_Lexicon`.
- Candidate work is not production authority and must remain in progress until explicit owner acceptance.

## Owner Review Candidate

- Disposition: **OWNER ACCEPTED — CLOSEOUT IN PROGRESS**; authority promotion and governance closeout only.
- Eligible evaluation: 1,135 / 1,135 rows.
- Outcome: 24 changed, 1,111 unchanged, 7 status-rank promotions, 1 downgrade, 12 Multi-Lens conversions.
- Candidate totals: 666 Production-ready, 287 Review, 185 Semantic.
- Candidate workbook SHA-256: `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.
- Validation: 34-sheet export/re-import PASS; 89/89 formulas preserved; zero formula-error cells; an independent all-sheet comparison found zero formula-definition changes and zero undeclared differences; all 24 diff rows have valid traces; raw corpus/source/authority hashes unchanged; all 34 rendered previews reviewed; existing workbook verifier completed successfully.
- Owner decision remains required before any authority promotion, runtime propagation, merge, or card closeout.

## Owner Review Finding — Row 909

- Finding: `ColorPie!A36:E36` / Master Lexicon row 909 incorrectly promoted “Destroy all creatures controlled by one player” to a Production-ready all-opponents / spare-my-board query.
- Defect class: semantic over-propagation of EV-001 across two distinct player-control scopes.
- Required invariant: target-one-opponent wording and all-opponents / spare-my-board wording must remain separately named lanes; save-one/chosen-survivor and tribal-survivor effects remain separate; an unvalidated major branch cannot be Production-ready.
- Smallest remediation: change only the row-909 producer contract, retain it at Review pending targeted-opponent validation, regenerate the same four artifacts, and prove the other 23 accepted rows are byte/logically unchanged at the workbook-cell level.
- Stop condition: return the regenerated candidate to bounded Owner Review without authority promotion, runtime implementation, merge, or card closeout.

### Remediation result

- Row 909 now uses a target-one-opponent primary lane, a separately labeled all-opponents/spare-my-board alternate lane, and separate survivor lanes.
- Row 909 is `Review` at `0.68`; targeted-opponent validation is explicitly deferred rather than implied.
- Relative comparison against candidate `8f0aa041...` found exactly one changed Master source row, four expected Dashboard formula-result changes, zero formula-definition changes, and zero changes to the other 23 accepted rows.
- RobQA regeneration and rendered self-QA passed; the candidate awaits only the bounded row-909 owner re-review.

## Owner Acceptance

- Accepted: 2026-08-27.
- Exact accepted candidate SHA-256: `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.
- Row 909 accepted contract: target-one-opponent primary lane; distinct EV-001 all-opponents/spare-my-board alternate lane; separate save-one/chosen-survivor and tribal/chosen-type survivor lanes; `Review` / `0.68` pending targeted-lane validation.
- The other 23 propagated rows remain accepted without reopening.
- Owner authorized only durable workbook-authority promotion, provenance preservation, normal VM-589 Kanban closeout, scoped commits, and lightweight closeout checks.
- Runtime implementation, Operator Hand, Plain Reading, toggle behavior, Archscry ranking, production JavaScript, generated product data, placement, recommendation behavior, and the next semantic-state story remain explicitly out of scope.

# VM-589 Row 909 Owner-Finding Remediation Handoff

## Agent name

Codex

## Task requested

Remediate the single blocking Owner Review finding for `ColorPie!A36:E36` / Master Lexicon row 909, regenerate the existing 24-row Calibration V3.2 candidate package, prove the other 23 accepted rows are unchanged, rerun RobQA, and return to Owner Review without production promotion or runtime work.

## Repository state

- Branch: `main`
- HEAD / baseline: `fb738da7affdfb1da1f56d05cea2fc55cb69db4b`
- Divergence from `origin/main`: 0 behind / 2 ahead.
- Candidate/change SHA: none; the owner-review package remains uncommitted.
- Prior candidate workbook SHA-256: `8f0aa0411d15509574fd0aab4111a8bbe7e7739d00e0446a604a575cc9361129`.
- Remediated candidate workbook SHA-256: `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.

## Files reviewed

- `AGENTS.md`, `CLAUDE.md`
- repo-local RobDev and RobQA skills, usage guides, and frozen gates
- spreadsheet skill and artifact-tool API reference
- `docs/kanban/in-progress/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/handoffs/2026-08-27-2147-codex-vm589-calibration-v3-2-propagation.md`
- `scripts/propagate-maze-calibration-v3-2.mjs`
- prior candidate workbook, Markdown diff, CSV diff, and QA report
- row 909 values, formulas, authority trace, and rendered output

## Files changed

- `scripts/propagate-maze-calibration-v3-2.mjs`
- `docs/research/maze-player-language/calibration/v3.2/propagation/Scryfall_Maze_Master_Propagation_Candidate_V3_2.xlsx`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.csv`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_QA.md`
- `docs/kanban/in-progress/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/handoffs/2026-08-27-2147-codex-vm589-calibration-v3-2-propagation.md` (supersession pointer only)
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What changed

- Row 909 is now a `Multi-Lens function` using a governed Multi-Lens recipe.
- Primary target-one-opponent lane: `(o:"destroy all creatures target opponent controls" or o:"exile all creatures target opponent controls")`.
- Alternate all-opponents / spare-my-board lane retains the four EV-001 ownership phrasings and remains explicitly separate.
- Save-one/chosen-survivor and tribal/chosen-type survivor effects remain separate lanes.
- Status changed from the first candidate's Production-ready to Review; confidence changed from 0.90 to 0.68.
- Candidate totals are now 666 Production-ready / 287 Review / 185 Semantic, with 12 Multi-Lens conversions.
- The Markdown and CSV diffs were regenerated from the corrected producer.

## Why it changed

The first candidate conflated “creatures controlled by one player” with EV-001's “spare my creatures” / all-opponents wording. The target-one-opponent Oracle family is a major branch of the source concept. Omitting that branch while claiming Production-ready was semantically unsafe.

## Decisions made

- Chose the owner's smallest honest option: keep row 909 at Review pending narrow targeted-opponent validation rather than open a new live research phase.
- Treated the owner finding as a systemic lane-separation invariant, not a one-off string replacement.
- Did not change the V3.2 authority workbook or historical evidence; the owner finding governs this candidate translation.
- Did not reopen any of the other 23 accepted propagation rows.

## RobDev compact packet

- Owning authority: explicit Owner Review finding, then Calibration V3.2 / EV-001 / EV-003.
- Producer: existing `scripts/propagate-maze-calibration-v3-2.mjs`.
- Changed behavior: row-909 candidate classification, lane contract, status, confidence, trace, and generated review artifacts.
- Protected behavior: other 23 candidate rows, all 1,114 other Master rows, formulas, raw corpus, raw provenance, authority/evidence history, runtime, Plain Reading, Operator Hand, Archscry, placement, telemetry, and deployment.
- Consumer: bounded owner re-review only.
- Smallest implementation: one producer row contract plus exact row invariants, then deterministic regeneration.
- Non-goals: exact-name/live Scryfall research, broader calibration, runtime implementation, authority promotion, merge, or Done status.
- Stop condition: regenerated candidate passes RobQA and returns to Owner Review.

## Risks / uncertainties

- The target-one-opponent branch is intentionally not asserted Production-ready; it remains pending narrow validation.
- The lane queries are candidate retrieval contracts, not claims of exhaustive Oracle wording coverage.
- Existing unrelated V3.2 and VM-578 inputs remain untracked and must stay preserved.

## Tests run

- Producer syntax check: PASS.
- Artifact-tool regeneration: PASS, 39 deterministic checks.
- Workbook export/re-import: PASS, 34 sheets.
- Formula inventory/error scan: 89/89 formulas, zero formula errors.
- Relative prior-candidate workbook comparison: PASS; exactly nine non-formula cell changes, all within `ColorPie!A36:E36`; four Dashboard formula values recalculated; zero formula-definition changes; zero unexpected changes; other 23 accepted rows unchanged.
- Relative CSV comparison: PASS; 24 rows before/after and exactly one changed source row, `ColorPie!A36:E36`.
- Existing `scripts/verify-maze-knowledge.py --stage workbook`: completed successfully against the remediated candidate with temporary output.
- Rendered QA: all 34 sheet previews plus focused `Master_Lexicon!A907:O910` reviewed; row 909 lanes/status/confidence are visible without clipping or overlap.
- Raw corpus, source workbook, V3.2 authority workbook, raw sheet, and historical evidence hashes/checks: PASS unchanged.
- Unsupported syntax, invented Tagger, trace resolution, source identity, and population checks: PASS.
- CPU-heavy runtime/parser/placement/browser/journey/synthetic/mutation/recovery suites: not run; protected runtime behavior was untouched.

## RobQA readiness

- QA tier: QA-0 with protected workbook/data-authority checks.
- Manual finding: EV-001 scope conflation at row 909.
- Defect class: semantic scope conflation.
- Regression invariant: target-one-opponent and all-opponents/spare-my-board meanings must remain separately named lanes; survivor lanes remain separate; an unvalidated major branch cannot be Production-ready.
- Deterministic owner case: inspect only row 909 in the regenerated workbook and its corresponding Markdown/CSV diff row.
- Disposition: **READY FOR OWNER RE-REVIEW — not PASS, not production authority**.

## Not touched

- The other 23 accepted propagation rows
- raw corpus and `scryall_data_accumulation`
- V3.2 authority/evidence workbooks and historical sheets
- Plain Reading, Operator Hand, Archscry, production JavaScript, runtime data, placement, telemetry, or deployment
- unrelated VM-578/player-language work

## Follow-up recommendations

Owner re-reviews only row 909's primary lane, alternate lane, survivor-lane separation, Review status, 0.68 confidence, and generated diff entry. On acceptance, VM-589 remains subject to the owner's separate authority-promotion decision; do not infer runtime authorization.

## Next suggested agent

Owner reviewer. If a further row-909 finding is returned, Codex/RobDev should remediate only the named defect class and rerun the same relative-candidate invariant.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-589-calibration-v3-2-controlled-propagation.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_DIFF.md`
- `docs/research/maze-player-language/calibration/v3.2/propagation/V3_2_PROPAGATION_QA.md`
- `docs/handoffs/2026-08-27-2147-codex-vm589-calibration-v3-2-propagation.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
